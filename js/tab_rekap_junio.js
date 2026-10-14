// ==============================================================================
// MODULE: tab_rekap_junio.js
// REKAP TRANSAKSI JUNIO TERPADU (YTPAI RAUDLATUL MUTA'ALLIMIN)
// Ekspor Excel 6 Sheet, PDF Legal Landscape Kop Hal 1, & Ringkasan WhatsApp
// ==============================================================================

(function(window) {
  'use strict';

  // --- STATE MANAGEMENT ---
  const state = {
    transactions: [],
    filteredTransactions: [],
    summary: {
      MTs: { count: 0, sudah: 0, belum: 0, total: 0 },
      SMP: { count: 0, sudah: 0, belum: 0, total: 0 },
      MA:  { count: 0, sudah: 0, belum: 0, total: 0 },
      SMA: { count: 0, sudah: 0, belum: 0, total: 0 }
    },
    totals: { count: 0, sudah: 0, belum: 0, total: 0 },
    tglAwalRaw: '',
    tglAkhirRaw: '',
    periodeIndo: '',
    activeSheetTab: 'ALL', // 'ALL', 'MTs', 'SMP', 'MA', 'SMA', 'REKAP'
    searchQuery: '',
    statusFilter: 'ALL',
    currentPage: 1,
    pageSize: 25,
    fileName: '',
    fileUpdateDateStr: '',
    fileUpdateTimeStr: ''
  };

  // --- HELPER FORMATTING FUNCTIONS ---
  function formatRupiah(num) {
    if (num === null || num === undefined || isNaN(num)) return 'Rp 0';
    return 'Rp ' + Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function formatExcelNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return '0';
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function formatCommaNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return '0';
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function getRekapDateParts(str, defaultDay, defaultMY) {
    if (!str) return { labelDay: defaultDay || '01', monthYear: defaultMY || 'Aug-26' };
    const parts = str.trim().split(/\s+/);
    if (parts.length >= 3) {
      const day = parts[0];
      const month = parts[1].substring(0, 3);
      const yr = parts[2].slice(-2);
      return { labelDay: day, monthYear: month + '-' + yr };
    }
    return { labelDay: str, monthYear: '' };
  }

  function getKelasSortKey(kelasStr) {
    if (!kelasStr) return 999;
    const str = String(kelasStr).toUpperCase().trim();
    const num = str.match(/\d+/);
    if (num) return parseInt(num[0], 10);
    if (str.includes('VII') && !str.includes('VIII')) return 7;
    if (str.includes('VIII')) return 8;
    if (str.includes('IX')) return 9;
    if (str.includes('XII')) return 12;
    if (str.includes('XI')) return 11;
    if (str.includes('X')) return 10;
    return 99;
  }

  function compareTransactions(a, b) {
    // 1. Lembaga urut (MTs -> SMP -> MA -> SMA)
    const lemOrder = { 'MTS': 1, 'SMP': 2, 'MA': 3, 'SMA': 4 };
    const orderA = lemOrder[(a.lembaga || '').toUpperCase()] || 99;
    const orderB = lemOrder[(b.lembaga || '').toUpperCase()] || 99;
    if (orderA !== orderB) return orderA - orderB;

    // 2. Tingkat / Angka Kelas (7 -> 8 -> 9 -> 10 -> 11 -> 12)
    const gradeA = getKelasSortKey(a.kelas);
    const gradeB = getKelasSortKey(b.kelas);
    if (gradeA !== gradeB) return gradeA - gradeB;

    const cmpKelas = (a.kelas || '').localeCompare(b.kelas || '', undefined, { numeric: true, sensitivity: 'base' });
    if (cmpKelas !== 0) return cmpKelas;

    // 3. Sub-Kelas / Rombel (A -> B -> C -> D)
    const cmpSub = (a.subKelas || '').localeCompare(b.subKelas || '', undefined, { numeric: true, sensitivity: 'base' });
    if (cmpSub !== 0) return cmpSub;

    // 4. Nama Santri (Abjad A - Z)
    const cmpNama = (a.nama || '').localeCompare(b.nama || '', undefined, { sensitivity: 'base' });
    if (cmpNama !== 0) return cmpNama;

    // 5. Tanggal Pembuatan / Periode Tagihan jika nama santri sama
    const d1 = new Date(a.tglBuat);
    const d2 = new Date(b.tglBuat);
    if (!isNaN(d1) && !isNaN(d2) && d1.getTime() !== d2.getTime()) {
      return d1.getTime() - d2.getTime();
    }
    return (a.jenisTagihan || '').localeCompare(b.jenisTagihan || '', undefined, { numeric: true });
  }

  function parseIndoDateRange(awal, akhir) {
    const toIndo = (str) => {
      if (!str) return '';
      return str
        .replace(/Jan(?:uari)?/gi, 'Januari')
        .replace(/Feb(?:ruari)?/gi, 'Februari')
        .replace(/Mar(?:et)?/gi, 'Maret')
        .replace(/Apr(?:il)?/gi, 'April')
        .replace(/May|Mei/gi, 'Mei')
        .replace(/Jun(?:i)?/gi, 'Juni')
        .replace(/Jul(?:i)?/gi, 'Juli')
        .replace(/Aug|Agu(?:stus)?/gi, 'Agustus')
        .replace(/Sep(?:tember)?/gi, 'September')
        .replace(/Oct|Okt(?:ober)?/gi, 'Oktober')
        .replace(/Nov(?:ember)?/gi, 'November')
        .replace(/Dec|Des(?:ember)?/gi, 'Desember');
    };
    const sAwal = toIndo(awal).trim();
    const sAkhir = toIndo(akhir).trim();
    const mYearAwal = sAwal.match(/(\d{4})$/);
    const mYearAkhir = sAkhir.match(/(\d{4})$/);
    if (mYearAwal && mYearAkhir && mYearAwal[1] === mYearAkhir[1]) {
      const cleanAwal = sAwal.replace(/\s*\d{4}$/, '');
      return cleanAwal + ' - ' + sAkhir;
    }
    return sAwal + ' - ' + sAkhir;
  }

  // Toast Helper fallback
  function notify(msg, type) {
    type = type || 'success';
    if (typeof window.showToast === 'function') {
      window.showToast(msg);
    } else if (typeof window.showNotification === 'function') {
      window.showNotification(msg, type);
    } else if (typeof Swal !== 'undefined') {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: type === 'error' ? 'error' : 'success',
        title: msg,
        showConfirmButton: false,
        timer: 3000
      });
    } else {
      console.log('[' + type.toUpperCase() + '] ' + msg);
    }
  }

  // --- PARSE TRANSACTION ROWS ENGINE ---
  function parseTransactionRows(rawRows) {
    if (!rawRows || rawRows.length === 0) return;

    let headerRowIdx = -1;
    let colMap = {};

    for (let i = 0; i < Math.min(20, rawRows.length); i++) {
      const row = rawRows[i] || [];
      const strRow = row.map(c => String(c || '').trim().toLowerCase());
      const hasNama = strRow.some(c => c === 'nama' || c.includes('nama siswa') || c.includes('nama peserta'));
      const hasKelas = strRow.some(c => c === 'kelas' || c.includes('kelas'));
      const hasStatus = strRow.some(c => c === 'status');
      const hasReg = strRow.some(c => c.includes('registrasi') || c.includes('noreg') || c === 'nis' || c.includes('nisn') || /\bnis\b/.test(c));

      if ((hasNama && hasKelas) || (hasNama && hasStatus) || (hasNama && hasReg)) {
        headerRowIdx = i;
        colMap = {};
        strRow.forEach((colName, idx) => {
          if (colName === '#' || colName === 'no' || colName === 'no.') {
            colMap.no = idx;
          } else if (colName.includes('pembuatan') || colName.includes('tgl buat')) {
            colMap.tglBuat = idx;
          } else if (colName.includes('jatuh tempo') || colName.includes('efektif') || colName.includes('tempo')) {
            if (colMap.tglTempo === undefined) colMap.tglTempo = idx;
          } else if (colName === 'nama' || colName.includes('nama siswa') || colName.includes('nama peserta')) {
            colMap.nama = idx;
          } else if (colName.includes('registrasi') || colName.includes('noreg') || colName === 'nis' || colName.includes('nisn') || /\bnis\b/.test(colName)) {
            colMap.noReg = idx;
          } else if (colName.includes('sub-kelas') || colName === 'sub kelas' || colName === 'subkelas' || colName === 'rombel') {
            colMap.subKelas = idx;
          } else if (colName === 'kelas' || colName.includes('tingkat') || colName.includes('grade')) {
            colMap.kelas = idx;
          } else if (colName.includes('jumlah') || colName.includes('nominal')) {
            colMap.nominal = idx;
          } else if (colName.includes('jenis') || colName.includes('pos tagihan') || (colName.includes('tagihan') && !colName.includes('jumlah') && !colName.includes('nominal'))) {
            colMap.jenisTagihan = idx;
          } else if (colName.includes('status')) {
            colMap.status = idx;
          }
        });
        break;
      }
    }

    if (headerRowIdx === -1) {
      headerRowIdx = 4;
      colMap = {
        no: 0, tglBuat: 1, tglTempo: 2, nama: 3, noReg: 4, kelas: 5, subKelas: 6, jenisTagihan: 7, nominal: 8, status: 9
      };
    }

    if (colMap.nama === undefined) colMap.nama = 3;
    if (colMap.kelas === undefined) colMap.kelas = colMap.nama + 2;
    if (colMap.subKelas === undefined) colMap.subKelas = colMap.kelas + 1;
    if (colMap.noReg === undefined) colMap.noReg = colMap.nama + 1;
    if (colMap.nominal === undefined) colMap.nominal = colMap.subKelas + 2;
    if (colMap.jenisTagihan === undefined) colMap.jenisTagihan = colMap.subKelas + 1;
    if (colMap.status === undefined) colMap.status = colMap.nominal + 1;
    if (colMap.no === undefined) colMap.no = 0;
    if (colMap.tglBuat === undefined) colMap.tglBuat = 1;
    if (colMap.tglTempo === undefined) colMap.tglTempo = 2;

    let awal = '01 Sep 2026';
    let akhir = '10 Oct 2026';

    for (let i = 0; i <= headerRowIdx; i++) {
      const row = rawRows[i] || [];
      for (const item of row) {
        if (typeof item === 'string') {
          if (item.includes('Tanggal Awal') || item.includes('Tanggal Mulai')) {
            const m = item.match(/Tanggal (?:Awal|Mulai)\s*:\s*(.*)/i);
            if (m) awal = m[1].trim();
          }
          if (item.includes('Tanggal Akhir') || item.includes('Tanggal Selesai')) {
            const m = item.match(/Tanggal (?:Akhir|Selesai)\s*:\s*(.*)/i);
            if (m) akhir = m[1].trim();
          }
        }
      }
    }

    state.tglAwalRaw = awal;
    state.tglAkhirRaw = akhir;
    state.periodeIndo = parseIndoDateRange(awal, akhir);

    // Deteksi jika berkas yang diunggah memiliki timestamp Update di dalam selnya
    for (let r = 0; r < rawRows.length; r++) {
      const row = rawRows[r] || [];
      for (let c = 0; c < row.length; c++) {
        const val = String(row[c] || '').trim();
        if (val.toLowerCase().includes('update:') || val.toLowerCase() === 'update') {
          const combined = val + ' ' + (row[c + 1] || '') + ' ' + (rawRows[r + 1] ? (rawRows[r + 1][c] || '') + ' ' + (rawRows[r + 1][c + 1] || '') : '');
          const mDate = combined.match(/(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/);
          if (mDate) state.fileUpdateDateStr = mDate[1].replace(/-/g, '/');
          const mTime = combined.match(/(\d{1,2}[:.]\d{2}(?:\s*WIB)?)/i);
          if (mTime) {
            let t = mTime[1].replace('.', ':');
            if (!t.toUpperCase().includes('WIB')) t += ' WIB';
            state.fileUpdateTimeStr = t;
          }
        }
      }
    }

    const txList = [];
    const rekapCalc = {
      MTs: { count: 0, sudah: 0, belum: 0, total: 0 },
      SMP: { count: 0, sudah: 0, belum: 0, total: 0 },
      MA:  { count: 0, sudah: 0, belum: 0, total: 0 },
      SMA: { count: 0, sudah: 0, belum: 0, total: 0 }
    };

    for (let i = headerRowIdx + 1; i < rawRows.length; i++) {
      const r = rawRows[i];
      if (!r || r.length === 0) continue;

      const firstCell = String(r[0] || '').toLowerCase();
      const fourthCell = String(r[3] || '').toLowerCase();
      if (firstCell.includes('total') || fourthCell.includes('total')) {
        continue;
      }

      const nama = (r[colMap.nama] || '').toString().trim();
      if (!nama) continue;

      const no = r[colMap.no] !== undefined && r[colMap.no] !== '' ? r[colMap.no] : (txList.length + 1);
      const tglBuat = r[colMap.tglBuat] || '';
      const tglTempo = r[colMap.tglTempo] || '';
      const noReg = (r[colMap.noReg] || '').toString().trim();
      const kelas = (r[colMap.kelas] || '').toString().trim();
      const subKelas = (r[colMap.subKelas] || '').toString().trim();
      const jenisTagihan = (r[colMap.jenisTagihan] || '').toString().trim();
      
      let nominalRaw = r[colMap.nominal];
      let nominal = 0;
      if (typeof nominalRaw === 'number') {
        nominal = nominalRaw;
      } else {
        nominal = parseFloat(String(nominalRaw || 0).replace(/[^\d.-]/g, '')) || 0;
      }

      let status = (r[colMap.status] || '').toString().trim();
      if (status.toLowerCase().includes('sudah') || status.toLowerCase().includes('lunas')) {
        status = 'Sudah Dibayar';
      } else {
        status = 'Belum Dibayar';
      }

      let lembaga = '';
      const upperKelas = kelas.toUpperCase();
      const upperSubKelas = subKelas.toUpperCase();
      const upperTagihan = jenisTagihan.toUpperCase();

      if (upperKelas.includes('MTS') || upperSubKelas.includes('MTS') || upperTagihan.includes('MTS')) lembaga = 'MTs';
      else if (upperKelas.includes('SMP') || upperSubKelas.includes('SMP') || upperTagihan.includes('SMP')) lembaga = 'SMP';
      else if (upperKelas.includes('SMA') || upperSubKelas.includes('SMA') || upperTagihan.includes('SMA')) lembaga = 'SMA';
      else if ((upperKelas.includes('MA') && !upperKelas.includes('SMA')) || (upperSubKelas.includes('MA') && !upperSubKelas.includes('SMA')) || (upperTagihan.includes('MA') && !upperTagihan.includes('SMA'))) lembaga = 'MA';

      if (!lembaga) {
        // Fallback: check entire row string if still undetected
        const rowStr = r.join(' ').toUpperCase();
        if (rowStr.includes('MTS')) lembaga = 'MTs';
        else if (rowStr.includes('SMP')) lembaga = 'SMP';
        else if (rowStr.includes('SMA')) lembaga = 'SMA';
        else if (rowStr.includes('MA')) lembaga = 'MA';
      }

      if (!lembaga) continue;

      txList.push({
        no: no,
        tglBuat: tglBuat,
        tglTempo: tglTempo,
        nama: nama,
        noReg: noReg,
        kelas: kelas,
        subKelas: subKelas,
        jenisTagihan: jenisTagihan,
        nominal: nominal,
        status: status,
        lembaga: lembaga
      });

      rekapCalc[lembaga].count++;
      if (status === 'Sudah Dibayar') {
        rekapCalc[lembaga].sudah += nominal;
      } else {
        rekapCalc[lembaga].belum += nominal;
      }
      rekapCalc[lembaga].total += nominal;
    }

    let totCount = 0, totSudah = 0, totBelum = 0, totAll = 0;
    ['MTs', 'SMP', 'MA', 'SMA'].forEach(l => {
      const d = rekapCalc[l];
      totCount += d.count;
      totSudah += d.sudah;
      totBelum += d.belum;
      totAll += d.total;
    });

    state.transactions = txList;
    state.summary = rekapCalc;
    state.totals = {
      count: totCount,
      sudah: totSudah,
      belum: totBelum,
      total: totAll
    };
  }

  // --- FILTER & PAGINATION LOGIC ---
  function applyFilters() {
    let list = [...state.transactions];

    if (state.activeSheetTab !== 'ALL' && state.activeSheetTab !== 'REKAP') {
      list = list.filter(t => t.lembaga === state.activeSheetTab);
    }

    if (state.statusFilter !== 'ALL') {
      list = list.filter(t => t.status === state.statusFilter);
    }

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      list = list.filter(t => 
        (t.nama || '').toLowerCase().includes(q) ||
        (t.noReg || '').toLowerCase().includes(q) ||
        (t.kelas || '').toLowerCase().includes(q) ||
        (t.jenisTagihan || '').toLowerCase().includes(q)
      );
    }

    list.sort(compareTransactions);
    state.filteredTransactions = list;
    state.currentPage = 1;
  }

  // --- UI RENDER ENGINE ---
  function updateRekapJunioUI() {
    const hasData = state.transactions.length > 0;

    // Enable/Disable buttons
    const btnExcel = document.getElementById('rjExportExcelBtn');
    const btnPdf = document.getElementById('rjExportPdfBtn');
    const btnWa = document.getElementById('rjPreviewWaBtn');

    if (btnExcel) btnExcel.disabled = !hasData;
    if (btnPdf) btnPdf.disabled = !hasData;
    if (btnWa) btnWa.disabled = !hasData;

    // File banner & Dropzone toggle
    const banner = document.getElementById('rjFileBanner');
    const dropZone = document.getElementById('rjDropZone');
    if (banner) {
      if (hasData) {
        banner.classList.remove('hidden');
        if (dropZone) dropZone.classList.add('hidden');
        document.getElementById('rjFileNameDisplay').textContent = state.fileName;
        document.getElementById('rjFileMetaDisplay').textContent = 
          state.totals.count + ' Transaksi • Periode: ' + state.periodeIndo + ' (' + state.tglAwalRaw + ' - ' + state.tglAkhirRaw + ')';
      } else {
        banner.classList.add('hidden');
        if (dropZone) dropZone.classList.remove('hidden');
      }
    }

    // KPI Cards
    const kpiTotalNom = document.getElementById('rjKpiTotalNominal');
    const kpiTotalCnt = document.getElementById('rjKpiTotalCount');
    if (kpiTotalNom) kpiTotalNom.textContent = formatRupiah(state.totals.total);
    if (kpiTotalCnt) kpiTotalCnt.textContent = state.totals.count.toLocaleString('id-ID');

    ['MTs', 'SMP', 'MA', 'SMA'].forEach(lem => {
      const pascal = lem.charAt(0).toUpperCase() + lem.slice(1).toLowerCase();
      const nomEl = document.getElementById('rjKpi' + lem + 'Nominal') || document.getElementById('rjKpi' + pascal + 'Nominal');
      const cntEl = document.getElementById('rjKpi' + lem + 'Count') || document.getElementById('rjKpi' + pascal + 'Count');
      const badgeEl = document.getElementById('rjBadge' + lem) || document.getElementById('rjBadge' + pascal);
      const pdfMetaEl = document.getElementById('rjPdfMeta' + lem) || document.getElementById('rjPdfMeta' + pascal);
      const d = state.summary[lem];
      if (nomEl) nomEl.textContent = formatRupiah(d.total);
      if (cntEl) cntEl.textContent = d.count + ' santri (' + formatRupiah(d.sudah) + ' lunas)';
      if (badgeEl) badgeEl.textContent = d.count;
      if (pdfMetaEl) pdfMetaEl.textContent = d.count + ' santri • ' + formatRupiah(d.total);
    });

    // Date banners
    const tglAwalEl = document.getElementById('rjTglAwalBanner');
    const tglAkhirEl = document.getElementById('rjTglAkhirBanner');
    const startParts = getRekapDateParts(state.tglAwalRaw, '01', 'Aug-26');
    const endParts = getRekapDateParts(state.tglAkhirRaw, '10', 'Sep-26');

    if (tglAwalEl) {
      if (state.activeSheetTab === 'REKAP') {
        tglAwalEl.textContent = 'Tanggal Mulai : ' + (startParts.labelDay ? (startParts.labelDay + ' ' + startParts.monthYear) : state.tglAwalRaw);
      } else {
        tglAwalEl.textContent = 'Tanggal Awal : ' + (state.tglAwalRaw || '-');
      }
    }
    if (tglAkhirEl) {
      if (state.activeSheetTab === 'REKAP') {
        tglAkhirEl.textContent = 'Tanggal Berakhir : ' + (endParts.labelDay ? (endParts.labelDay + ' ' + endParts.monthYear) : state.tglAkhirRaw);
      } else {
        tglAkhirEl.textContent = 'Tanggal Akhir : ' + (state.tglAkhirRaw || '-');
      }
    }

    // Title banner
    const titleEl = document.getElementById('rjTableTitleBanner');
    if (titleEl) {
      if (state.activeSheetTab === 'REKAP' || state.activeSheetTab === 'ALL') {
        titleEl.textContent = 'Laporan Untuk - List Semua Transaksi';
      } else {
        titleEl.textContent = 'Laporan Untuk - List Transaksi Jenjang ' + state.activeSheetTab;
      }
    }

    // Sheet Tabs active state
    ['ALL', 'MTs', 'SMP', 'MA', 'SMA', 'REKAP'].forEach(t => {
      const btn = document.getElementById('rjTab-' + t);
      if (btn) {
        if (t === state.activeSheetTab) {
          btn.className = 'rj-sheet-tab active-sheet-tab px-2 py-1.5 rounded-xs text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer';
        } else {
          btn.className = 'rj-sheet-tab inactive-sheet-tab px-2 py-1.5 rounded-xs text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer';
        }
      }
    });

    // Render Table Content
    renderTable();

    // Re-create lucide icons for dynamic elements
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function renderTable() {
    const thead = document.getElementById('rjTableHead');
    const tbody = document.getElementById('rjTableBody');
    const tfoot = document.getElementById('rjTableFoot');
    if (!thead || !tbody || !tfoot) return;

    if (!state.transactions.length) {
      thead.innerHTML = '';
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="py-12 text-center text-slate-400">
            <div class="flex flex-col items-center justify-center gap-2">
              <i data-lucide="file-spreadsheet" class="w-8 h-8 text-slate-300 dark:text-slate-600"></i>
              <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">Belum ada berkas transaksi yang diunggah</p>
              <button 
                type="button" 
                onclick="document.getElementById('rjFileInput').click()" 
                class="mt-1 text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
              >
                Unggah transactionreport.xlsx
              </button>
            </div>
          </td>
        </tr>
      `;
      tfoot.innerHTML = '';
      document.getElementById('rjPaginationInfo').textContent = 'Menampilkan 0 dari 0 transaksi';
      document.getElementById('rjPaginationControls').innerHTML = '';
      return;
    }

    // IF TAB IS REKAP (SUMMARY DUAL MATRIX SHEET - MATCHING CONTOH & SHEET 6)
    if (state.activeSheetTab === 'REKAP') {
      const pctMTsSudah = state.summary.MTs.total > 0 ? Math.round((state.summary.MTs.sudah / state.summary.MTs.total) * 100) : 0;
      const pctMTsBelum = 100 - pctMTsSudah;

      const pctSMPSudah = state.summary.SMP.total > 0 ? Math.round((state.summary.SMP.sudah / state.summary.SMP.total) * 100) : 0;
      const pctSMPBelum = 100 - pctSMPSudah;

      const pctMASudah = state.summary.MA.total > 0 ? Math.round((state.summary.MA.sudah / state.summary.MA.total) * 100) : 0;
      const pctMABelum = 100 - pctMASudah;

      const pctSMASudah = state.summary.SMA.total > 0 ? Math.round((state.summary.SMA.sudah / state.summary.SMA.total) * 100) : 0;
      const pctSMABelum = 100 - pctSMASudah;

      const pctTotSudah = state.totals.total > 0 ? Math.round((state.totals.sudah / state.totals.total) * 100) : 0;
      const pctTotBelum = 100 - pctTotSudah;

      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      const dateNowStr = state.fileUpdateDateStr || (pad(now.getDate()) + '/' + pad(now.getMonth() + 1) + '/' + now.getFullYear());
      const timeNowStr = state.fileUpdateTimeStr || (pad(now.getHours()) + ':' + pad(now.getMinutes()) + ' WIB');

      thead.innerHTML = `
        <tr>
          <th colspan="6" style="text-align: center; font-size: 13px; font-weight: 800; padding: 8px 6px; background: #ffffff; color: #000000; border: 1px solid #000000;">
            NOMINAL (Rp.)
          </th>
        </tr>
        <tr style="background: #D9D9D9;">
          <th style="width: 20%; text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">Status</th>
          <th style="width: 16%; text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">MTs</th>
          <th style="width: 16%; text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">SMP</th>
          <th style="width: 16%; text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">MA</th>
          <th style="width: 16%; text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">SMA</th>
          <th style="width: 16%; text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">TOTAL</th>
        </tr>
      `;

      tbody.innerHTML = `
        <tr style="background-color: #D8E4BC; font-weight: 700; color: #000000;">
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">Sudah Dibayar</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">` + formatExcelNumber(state.summary.MTs.sudah) + `</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">` + formatExcelNumber(state.summary.SMP.sudah) + `</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">` + formatExcelNumber(state.summary.MA.sudah) + `</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">` + formatExcelNumber(state.summary.SMA.sudah) + `</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">` + formatExcelNumber(state.totals.sudah) + `</td>
        </tr>
        <tr style="background-color: #E6B8B7; font-weight: 700; color: #000000;">
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">Belum Dibayar</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">` + formatExcelNumber(state.summary.MTs.belum) + `</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">` + formatExcelNumber(state.summary.SMP.belum) + `</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">` + formatExcelNumber(state.summary.MA.belum) + `</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">` + formatExcelNumber(state.summary.SMA.belum) + `</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">` + formatExcelNumber(state.totals.belum) + `</td>
        </tr>
        <tr style="height: 16px; border: none; background: #ffffff;">
          <td colspan="6" style="border: none; padding: 4px;"></td>
        </tr>
        <tr>
          <th colspan="6" style="text-align: center; font-size: 13px; font-weight: 800; padding: 8px 6px; background: #ffffff; color: #000000; border: 1px solid #000000;">
            PERSENTASE (%)
          </th>
        </tr>
        <tr style="background: #D9D9D9;">
          <th style="text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">Status</th>
          <th style="text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">MTs</th>
          <th style="text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">SMP</th>
          <th style="text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">MA</th>
          <th style="text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">SMA</th>
          <th style="text-align: center; font-weight: 700; border: 1px solid #000000; background: #D9D9D9; color: #000000;">TOTAL</th>
        </tr>
        <tr style="background-color: #D8E4BC; font-weight: 700; color: #000000;">
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">Sudah Dibayar</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">` + pctMTsSudah + `%</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">` + pctSMPSudah + `%</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">` + pctMASudah + `%</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">` + pctSMASudah + `%</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #D8E4BC;">` + pctTotSudah + `%</td>
        </tr>
        <tr style="background-color: #E6B8B7; font-weight: 700; color: #000000;">
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">Belum Dibayar</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">` + pctMTsBelum + `%</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">` + pctSMPBelum + `%</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">` + pctMABelum + `%</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">` + pctSMABelum + `%</td>
          <td style="text-align: center; border: 1px solid #000000; background-color: #E6B8B7;">` + pctTotBelum + `%</td>
        </tr>
      `;

      tfoot.innerHTML = `
        <tr>
          <td colspan="6" style="border: none; text-align: right; padding-top: 14px; font-style: italic; font-weight: 800; font-size: 12px; color: #0f172a;">
            <div>Update: ` + dateNowStr + `</div>
            <div>` + timeNowStr + `</div>
          </td>
        </tr>
      `;

      document.getElementById('rjPaginationInfo').textContent = 'Menampilkan Dual Matrix Rekapitulasi (Nominal & Persentase)';
      document.getElementById('rjPaginationControls').innerHTML = `
        <button 
          type="button" 
          onclick="downloadRekapJunioWaImage()" 
          class="px-3 py-1.5 rounded-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
          title="Unduh tabel Rekapitulasi dalam format gambar resolusi tinggi (HD PNG 1600px)"
        >
          <i data-lucide="image-down" class="w-3.5 h-3.5"></i>
          <span>Unduh Gambar Rekap (HD)</span>
        </button>
      `;
      const tableEl = document.getElementById('rjDataTable');
      if (tableEl) {
        tableEl.style.maxWidth = '880px';
        tableEl.style.margin = '0 auto';
      }
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
      return;
    }

    const tableEl = document.getElementById('rjDataTable');
    if (tableEl) {
      tableEl.style.maxWidth = '100%';
      tableEl.style.margin = '0';
    }

    // STANDARD TRANSACTION SHEET (ALL or SPECIFIC JENJANG)
    const labelTgl = (state.activeSheetTab === 'MTs' || state.activeSheetTab === 'SMP') ? 'Tanggal Efektif Tagihan' : 'Tanggal Jatuh Tempo';

    thead.innerHTML = `
      <tr>
        <th style="width: 38px;">#</th>
        <th style="width: 100px;">Tanggal Pembuatan</th>
        <th style="width: 100px;">` + labelTgl + `</th>
        <th style="min-width: 180px; text-align: left;">Nama</th>
        <th style="width: 80px;">No. Registrasi</th>
        <th style="width: 55px;">Kelas</th>
        <th style="width: 55px;">Sub-Kelas</th>
        <th style="min-width: 130px; text-align: left;">Jenis Tagihan</th>
        <th style="width: 110px; text-align: center;">Jumlah Tagihan</th>
        <th style="width: 95px;">Status</th>
      </tr>
    `;

    const totalItems = state.filteredTransactions.length;
    const startIndex = (state.currentPage - 1) * state.pageSize;
    const endIndex = Math.min(startIndex + state.pageSize, totalItems);
    const pageItems = state.filteredTransactions.slice(startIndex, endIndex);

    let rowsHtml = '';
    pageItems.forEach((t, i) => {
      const isLunas = t.status === 'Sudah Dibayar';
      const rowStyle = !isLunas ? 'background-color: #E6B8B7; color: #000000;' : '';
      rowsHtml += `
        <tr class="` + (isLunas ? 'row-sudah' : 'row-belum') + `" style="` + rowStyle + `">
          <td style="text-align: center;` + (!isLunas ? ' background-color: #E6B8B7;' : '') + `">` + (startIndex + i + 1) + `</td>
          <td style="text-align: center;` + (!isLunas ? ' background-color: #E6B8B7;' : '') + `">` + t.tglBuat + `</td>
          <td style="text-align: center;` + (!isLunas ? ' background-color: #E6B8B7;' : '') + `">` + t.tglTempo + `</td>
          <td style="text-align: left; font-weight: 600;` + (!isLunas ? ' background-color: #E6B8B7;' : '') + `">` + t.nama + `</td>
          <td style="text-align: center;` + (!isLunas ? ' background-color: #E6B8B7;' : '') + `">` + t.noReg + `</td>
          <td style="text-align: center;` + (!isLunas ? ' background-color: #E6B8B7;' : '') + `">` + t.kelas + `</td>
          <td style="text-align: center;` + (!isLunas ? ' background-color: #E6B8B7;' : '') + `">` + t.subKelas + `</td>
          <td style="text-align: left;` + (!isLunas ? ' background-color: #E6B8B7;' : '') + `">` + t.jenisTagihan + `</td>
          <td style="text-align: center; font-weight: 700;` + (!isLunas ? ' background-color: #E6B8B7;' : '') + `">` + formatRupiah(t.nominal) + `</td>
          <td style="text-align: center; background-color: ` + (isLunas ? '#D8E4BC' : '#E6B8B7') + `; color: #000000; font-weight: 700; font-size: 11px;">
            ` + t.status + `
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHtml;

    // Subtotal Footer Calculation
    let subtotalSudah = 0;
    let subtotalBelum = 0;
    if (state.activeSheetTab === 'ALL') {
      subtotalSudah = state.totals.sudah;
      subtotalBelum = state.totals.belum;
    } else {
      const d = state.summary[state.activeSheetTab];
      subtotalSudah = d.sudah;
      subtotalBelum = d.belum;
    }

    tfoot.innerHTML = `
      <tr class="subtotal-sudah">
        <td colspan="8" style="text-align: right; font-weight: 800; padding-right: 12px;">Sudah Dibayar</td>
        <td style="text-align: center; font-weight: 800;">` + formatRupiah(subtotalSudah) + `</td>
        <td></td>
      </tr>
      <tr class="subtotal-belum">
        <td colspan="8" style="text-align: right; font-weight: 800; padding-right: 12px;">Belum Dibayar</td>
        <td style="text-align: center; font-weight: 800;">` + formatRupiah(subtotalBelum) + `</td>
        <td></td>
      </tr>
    `;

    // Pagination Info
    document.getElementById('rjPaginationInfo').textContent = 
      'Menampilkan ' + (totalItems > 0 ? startIndex + 1 : 0) + ' - ' + endIndex + ' dari ' + totalItems + ' transaksi';

    renderPaginationControls(totalItems);
  }

  function renderPaginationControls(totalItems) {
    const controls = document.getElementById('rjPaginationControls');
    if (!controls) return;

    const totalPages = Math.ceil(totalItems / state.pageSize);
    if (totalPages <= 1) {
      controls.innerHTML = '';
      return;
    }

    let html = `
      <button 
        type="button" 
        ` + (state.currentPage === 1 ? 'disabled' : '') + ` 
        onclick="rekapJunioGoPage(` + (state.currentPage - 1) + `)"
        class="px-2 py-1 rounded-sm text-xs border border-slate-300 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
      >
        &lsaquo; Prev
      </button>
      <span class="px-2 py-1 text-xs font-bold">` + state.currentPage + ` / ` + totalPages + `</span>
      <button 
        type="button" 
        ` + (state.currentPage === totalPages ? 'disabled' : '') + ` 
        onclick="rekapJunioGoPage(` + (state.currentPage + 1) + `)"
        class="px-2 py-1 rounded-sm text-xs border border-slate-300 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
      >
        Next &rsaquo;
      </button>
    `;
    controls.innerHTML = html;
  }

  // --- ACTIONS & EVENT HANDLERS ---
  window.rekapJunioGoPage = function(page) {
    state.currentPage = page;
    renderTable();
  };

  window.setRekapJunioSheetTab = function(tabName) {
    state.activeSheetTab = tabName;
    applyFilters();
    updateRekapJunioUI();
  };

  window.handleRekapJunioSearch = function(event) {
    state.searchQuery = event.target.value || '';
    applyFilters();
    renderTable();
  };

  window.handleRekapJunioStatusFilter = function(event) {
    state.statusFilter = event.target.value || 'ALL';
    applyFilters();
    renderTable();
  };

  window.handleRekapJunioFileSelect = function(event) {
    const file = event.target.files && event.target.files[0];
    if (file) processRekapJunioFile(file);
  };

  function processRekapJunioFile(file) {
    if (!file) return;
    state.fileName = file.name;

    // Ambil tanggal & waktu sesuai berkas yang diunggah (file.lastModified)
    const fileDate = (file && file.lastModified) ? new Date(file.lastModified) : new Date();
    const pad = n => String(n).padStart(2, '0');
    state.fileUpdateDateStr = pad(fileDate.getDate()) + '/' + pad(fileDate.getMonth() + 1) + '/' + fileDate.getFullYear();
    state.fileUpdateTimeStr = pad(fileDate.getHours()) + ':' + pad(fileDate.getMinutes()) + ' WIB';

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

        parseTransactionRows(rawRows);
        applyFilters();
        updateRekapJunioUI();
        notify('Berhasil memproses ' + state.transactions.length + ' transaksi dari ' + file.name);
      } catch (err) {
        console.error('Error parsing file:', err);
        notify('Gagal membaca berkas Excel. Pastikan format valid.', 'error');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  window.resetRekapJunioData = function() {
    state.transactions = [];
    state.filteredTransactions = [];
    state.summary = {
      MTs: { count: 0, sudah: 0, belum: 0, total: 0 },
      SMP: { count: 0, sudah: 0, belum: 0, total: 0 },
      MA:  { count: 0, sudah: 0, belum: 0, total: 0 },
      SMA: { count: 0, sudah: 0, belum: 0, total: 0 }
    };
    state.totals = { count: 0, sudah: 0, belum: 0, total: 0 };
    state.fileName = '';
    state.fileUpdateDateStr = '';
    state.fileUpdateTimeStr = '';
    state.searchQuery = '';
    state.statusFilter = 'ALL';
    state.currentPage = 1;
    
    const fileInput = document.getElementById('rjFileInput');
    if (fileInput) fileInput.value = '';
    const searchInput = document.getElementById('rjSearchInput');
    if (searchInput) searchInput.value = '';

    applyFilters();
    updateRekapJunioUI();
    notify('Data transaksi berhasil direset.');
  };

  // --- EXCELJS 6-SHEET EXPORT ENGINE ---
  window.exportRekapJunioExcel = async function() {
    if (!state.transactions.length) {
      notify('Tidak ada data transaksi untuk diekspor.', 'error');
      return;
    }

    if (typeof ExcelJS === 'undefined') {
      notify('Library ExcelJS belum siap. Tunggu beberapa detik.', 'error');
      return;
    }

    try {
      const wb = new ExcelJS.Workbook();
      wb.creator = 'YTPAI Raudlatul Mutaallimin';

      const lembagaList = ['MTs', 'SMP', 'MA', 'SMA'];
      const fontHeader = { name: 'Arial Narrow', size: 14, bold: true, color: { argb: 'FF000000' } };
      const fontTitleMain = { name: 'Arial Narrow', size: 26, bold: true, color: { argb: 'FF000000' } };
      const fontSubTitle = { name: 'Arial Narrow', size: 14, bold: false, color: { argb: 'FF000000' } };
      const fontSectionTitle = { name: 'Arial Narrow', size: 18, bold: true, color: { argb: 'FF000000' } };
      const fontNormal = { name: 'Calibri', size: 11, color: { argb: 'FF000000' } };
      const fontBold = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF000000' } };
      const fontUpdate = { name: 'Calibri', size: 14, bold: true, italic: true, color: { argb: 'FF000000' } };

      const fillSudah = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD8E4BC' } };
      const fillBelum = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE6B8B7' } };
      const fillGray = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };

      const borderThin = {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } }
      };

      const sheetColWidths = {
        Worksheet: [
          { width: 7.4 }, { width: 16.7 }, { width: 15.1 }, { width: 38 },
          { width: 13.8 }, { width: 8.8 }, { width: 9.6 }, { width: 21.2 },
          { width: 14.1 }, { width: 25.3 }
        ],
        MTs: [
          { width: 7.4 }, { width: 16.7 }, { width: 15.1 }, { width: 38 },
          { width: 13.8 }, { width: 8.8 }, { width: 9.6 }, { width: 21.2 },
          { width: 14.1 }, { width: 25.3 }
        ],
        SMP: [
          { width: 7.4 }, { width: 16.7 }, { width: 15.1 }, { width: 38 },
          { width: 13.8 }, { width: 8.8 }, { width: 9.6 }, { width: 21.2 },
          { width: 14.1 }, { width: 25.3 }
        ],
        MA: [
          { width: 7.4 }, { width: 16.7 }, { width: 15.1 }, { width: 38 },
          { width: 13.8 }, { width: 8.8 }, { width: 9.6 }, { width: 21.2 },
          { width: 14.1 }, { width: 25.3 }
        ],
        SMA: [
          { width: 7.4 }, { width: 16.7 }, { width: 15.1 }, { width: 38 },
          { width: 13.8 }, { width: 8.8 }, { width: 9.6 }, { width: 21.2 },
          { width: 14.1 }, { width: 25.3 }
        ]
      };

      function setupHeaderKop(ws) {
        ws.mergeCells('A1:J1');
        ws.getCell('A1').value = "YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN";
        ws.getCell('A1').font = fontHeader;
        ws.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };

        ws.mergeCells('A2:J2');
        ws.getCell('A2').value = "Tegalrejo Datinawong Babat Lamongan";
        ws.getCell('A2').font = fontSubTitle;
        ws.getCell('A2').alignment = { horizontal: 'center', vertical: 'middle' };

        ws.mergeCells('A3:J3');
        ws.getCell('A3').value = "Laporan Untuk - List Semua Transaksi";
        ws.getCell('A3').font = fontTitleMain;
        ws.getCell('A3').alignment = { horizontal: 'center', vertical: 'middle' };

        ws.getCell('A4').value = "Tanggal Awal : " + state.tglAwalRaw;
        ws.getCell('A4').font = fontNormal;
        ws.getCell('A4').alignment = { horizontal: 'left', vertical: 'middle' };

        ws.getCell('J4').value = "Tanggal Akhir : " + state.tglAkhirRaw;
        ws.getCell('J4').font = fontNormal;
        ws.getCell('J4').alignment = { horizontal: 'right', vertical: 'middle' };

        ws.getRow(1).height = 20;
        ws.getRow(2).height = 20;
        ws.getRow(3).height = 35;
        ws.getRow(4).height = 18;
        ws.getRow(5).height = 28;
      }

      function setupTableHeaders(ws, labelTgl) {
        labelTgl = labelTgl || 'Tanggal Jatuh Tempo';
        const headers = [
          '#', 'Tanggal Pembuatan', labelTgl, 'Nama', 'No. Registrasi',
          'Kelas', 'Sub-Kelas', 'Jenis Tagihan', 'Jumlah Tagihan', 'Status'
        ];
        const row5 = ws.getRow(5);
        headers.forEach((h, idx) => {
          const cell = row5.getCell(idx + 1);
          cell.value = h;
          cell.font = fontBold;
          cell.fill = fillSudah;
          cell.border = borderThin;
          cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        });
      }

      // --- SHEET 1: Worksheet (Semua Transaksi) ---
      const wsAll = wb.addWorksheet('Worksheet', { views: [{ showGridLines: true }] });
      wsAll.pageSetup = { paperSize: 5, orientation: 'landscape' };
      wsAll.columns = sheetColWidths.Worksheet;
      setupHeaderKop(wsAll);
      setupTableHeaders(wsAll, 'Tanggal Efektif Tagihan');

      const allSorted = [...state.transactions].sort(compareTransactions);
      let rowAllIdx = 6;
      allSorted.forEach((item, i) => {
        const row = wsAll.getRow(rowAllIdx);
        row.height = 18;
        row.values = [
          i + 1, item.tglBuat, item.tglTempo, item.nama, item.noReg,
          item.kelas, item.subKelas, item.jenisTagihan, item.nominal, item.status
        ];

        const isBelum = item.status !== 'Sudah Dibayar';

        for (let c = 1; c <= 10; c++) {
          const cell = row.getCell(c);
          cell.font = fontNormal;
          cell.border = borderThin;

          // Jika Belum Dibayar, blok warna merah muda dibuat dari kolom # (c=1) sampai status (c=10)
          if (isBelum) {
            cell.fill = fillBelum;
          }

          if (c === 1 || c === 2 || c === 3 || c === 5 || c === 6 || c === 7 || c === 9) {
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            if (c === 9) cell.numFmt = '#,##0';
          } else if (c === 4 || c === 8) {
            cell.alignment = { horizontal: 'left', vertical: 'middle' };
          } else if (c === 10) {
            cell.alignment = { horizontal: 'center', vertical: 'middle' };
            cell.font = fontBold;
            if (!isBelum) {
              cell.fill = fillSudah;
            }
          }
        }
        rowAllIdx++;
      });

      // Bottom Row Total Keseluruhan(IDR) matching contoh Worksheet (sheet1)
      const rAllTotal = wsAll.getRow(rowAllIdx);
      rAllTotal.getCell(1).value = 'Total Keseluruhan(IDR)';
      rAllTotal.getCell(1).font = fontBold;
      rAllTotal.getCell(9).value = { formula: 'SUM(I6:I' + (rowAllIdx - 1) + ')' };
      rAllTotal.getCell(9).font = fontBold;
      rAllTotal.getCell(9).numFmt = '#,##0';
      rAllTotal.getCell(9).alignment = { horizontal: 'center', vertical: 'middle' };

      // --- SHEETS 2 s.d. 5: MTs, SMP, MA, SMA ---
      lembagaList.forEach(lem => {
        const ws = wb.addWorksheet(lem, { views: [{ showGridLines: true }] });
        ws.pageSetup = { paperSize: 5, orientation: 'landscape' };
        ws.columns = sheetColWidths[lem];
        setupHeaderKop(ws);
        const labelTgl = (lem === 'MTs' || lem === 'SMP') ? 'Tanggal Efektif Tagihan' : 'Tanggal Jatuh Tempo';
        setupTableHeaders(ws, labelTgl);

        const items = state.transactions.filter(t => t.lembaga === lem);
        items.sort(compareTransactions);

        let rowIdx = 6;
        items.forEach((item, i) => {
          const row = ws.getRow(rowIdx);
          row.height = 18;
          row.values = [
            i + 1, item.tglBuat, item.tglTempo, item.nama, item.noReg,
            item.kelas, item.subKelas, item.jenisTagihan, item.nominal, item.status
          ];

          const isBelum = item.status !== 'Sudah Dibayar';

          for (let c = 1; c <= 10; c++) {
            const cell = row.getCell(c);
            cell.font = fontNormal;
            cell.border = borderThin;

            // Jika Belum Dibayar, blok warna merah muda dibuat dari kolom # (c=1) sampai status (c=10)
            if (isBelum) {
              cell.fill = fillBelum;
            }

            if (c === 1 || c === 2 || c === 3 || c === 5 || c === 6 || c === 7 || c === 9) {
              cell.alignment = { horizontal: 'center', vertical: 'middle' };
              if (c === 9) cell.numFmt = '#,##0';
            } else if (c === 4 || c === 8) {
              cell.alignment = { horizontal: 'left', vertical: 'middle' };
            } else if (c === 10) {
              cell.alignment = { horizontal: 'center', vertical: 'middle' };
              cell.font = fontBold;
              if (!isBelum) {
                cell.fill = fillSudah;
              }
            }
          }
          rowIdx++;
        });

        // 1 empty row, then Subtotals on Column I & J
        rowIdx++;
        const r1 = ws.getRow(rowIdx);
        r1.getCell(9).value = 'Sudah Dibayar';
        r1.getCell(9).font = fontBold;
        r1.getCell(9).fill = fillSudah;
        r1.getCell(9).border = borderThin;
        r1.getCell(9).alignment = { horizontal: 'center', vertical: 'middle' };

        r1.getCell(10).value = { formula: 'SUMIF(J6:J' + (rowIdx - 2) + ',"Sudah Dibayar",I6:I' + (rowIdx - 2) + ')' };
        r1.getCell(10).font = fontBold;
        r1.getCell(10).fill = fillSudah;
        r1.getCell(10).border = borderThin;
        r1.getCell(10).numFmt = '#,##0';
        r1.getCell(10).alignment = { horizontal: 'center', vertical: 'middle' };

        rowIdx++;
        const r2 = ws.getRow(rowIdx);
        r2.getCell(9).value = 'Belum Dibayar';
        r2.getCell(9).font = fontBold;
        r2.getCell(9).fill = fillBelum;
        r2.getCell(9).border = borderThin;
        r2.getCell(9).alignment = { horizontal: 'center', vertical: 'middle' };

        r2.getCell(10).value = { formula: 'SUMIF(J6:J' + (rowIdx - 3) + ',"Belum Dibayar",I6:I' + (rowIdx - 3) + ')' };
        r2.getCell(10).font = fontBold;
        r2.getCell(10).fill = fillBelum;
        r2.getCell(10).border = borderThin;
        r2.getCell(10).numFmt = '#,##0';
        r2.getCell(10).alignment = { horizontal: 'center', vertical: 'middle' };
      });

      // --- SHEET 6: REKAP (Dual Matrix NOMINAL & PERSENTASE 100% Persis Contoh) ---
      const wsRekap = wb.addWorksheet('REKAP', { views: [{ showGridLines: true }] });
      wsRekap.pageSetup = { paperSize: 5, orientation: 'portrait' };
      wsRekap.columns = [
        { width: 20.66 }, // Col A (Status)
        { width: 16.55 }, // Col B (MTs)
        { width: 16.55 }, // Col C (SMP)
        { width: 16.55 }, // Col D (MA)
        { width: 16.55 }, // Col E (SMA)
        { width: 16.66 }  // Col F (TOTAL)
      ];

      // Row 1: Merged A1:F1
      wsRekap.mergeCells('A1:F1');
      wsRekap.getCell('A1').value = "YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN";
      wsRekap.getCell('A1').font = fontHeader;
      wsRekap.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };
      wsRekap.getRow(1).height = 16.2;

      // Row 2: Merged A2:F2
      wsRekap.mergeCells('A2:F2');
      wsRekap.getCell('A2').value = "Tegalrejo Datinawong Babat Lamongan";
      wsRekap.getCell('A2').font = fontSubTitle;
      wsRekap.getCell('A2').alignment = { horizontal: 'center', vertical: 'middle' };
      wsRekap.getRow(2).height = 18;

      // Row 3: Merged A3:F3
      wsRekap.mergeCells('A3:F3');
      wsRekap.getCell('A3').value = "Laporan Untuk - List Semua Transaksi";
      wsRekap.getCell('A3').font = fontTitleMain;
      wsRekap.getCell('A3').alignment = { horizontal: 'center', vertical: 'middle' };
      wsRekap.getRow(3).height = 32.4;

      // Row 4: Merged A4:F4 (empty)
      wsRekap.mergeCells('A4:F4');
      wsRekap.getRow(4).height = 23.55;

      // Date parsing
      const startParts = getRekapDateParts(state.tglAwalRaw, '01', 'Aug-26');
      const endParts = getRekapDateParts(state.tglAkhirRaw, '10', 'Sep-26');
      const fontDateRekap = { name: 'Arial Narrow', size: 14, bold: true, color: { argb: 'FF000000' } };

      // Row 5: Tanggal Mulai
      wsRekap.getRow(5).height = 22;
      wsRekap.getCell('A5').value = "Tanggal Mulai      : " + startParts.labelDay + " ";
      wsRekap.getCell('A5').font = fontDateRekap;
      wsRekap.getCell('A5').alignment = { horizontal: 'left', vertical: 'middle' };
      wsRekap.getCell('B5').value = startParts.monthYear;
      wsRekap.getCell('B5').font = fontDateRekap;
      wsRekap.getCell('B5').alignment = { horizontal: 'left', vertical: 'middle' };

      // Row 6: Tanggal Berakhir
      wsRekap.getRow(6).height = 22;
      wsRekap.getCell('A6').value = "Tanggal Berakhir : " + endParts.labelDay + " ";
      wsRekap.getCell('A6').font = fontDateRekap;
      wsRekap.getCell('A6').alignment = { horizontal: 'left', vertical: 'middle' };
      wsRekap.getCell('B6').value = endParts.monthYear;
      wsRekap.getCell('B6').font = fontDateRekap;
      wsRekap.getCell('B6').alignment = { horizontal: 'left', vertical: 'middle' };

      // Row 7: empty
      wsRekap.getRow(7).height = 6.6;

      // Row 8: Merged A8:F8 -> NOMINAL (Rp.)
      wsRekap.mergeCells('A8:F8');
      wsRekap.getCell('A8').value = "NOMINAL (Rp.)";
      wsRekap.getCell('A8').font = fontSectionTitle;
      wsRekap.getCell('A8').alignment = { horizontal: 'center', vertical: 'middle' };
      wsRekap.getRow(8).height = 26.55;

      // Row 9: Headers: Status | MTs | SMP | MA | SMA | TOTAL
      wsRekap.getRow(9).height = 20.1;
      const rekapColHeaders = ['Status', 'MTs', 'SMP', 'MA', 'SMA', 'TOTAL'];
      rekapColHeaders.forEach((h, idx) => {
        const cell = wsRekap.getRow(9).getCell(idx + 1);
        cell.value = h;
        cell.font = fontBold;
        cell.fill = fillGray;
        cell.border = borderThin;
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });

      // Row 10: Sudah Dibayar (Nominal)
      wsRekap.getRow(10).height = 30;
      wsRekap.getCell('A10').value = 'Sudah Dibayar';
      wsRekap.getCell('A10').font = fontBold;
      wsRekap.getCell('A10').fill = fillSudah;
      wsRekap.getCell('A10').border = borderThin;
      wsRekap.getCell('A10').alignment = { horizontal: 'center', vertical: 'middle' };

      wsRekap.getCell('B10').value = state.summary.MTs.sudah;
      wsRekap.getCell('C10').value = state.summary.SMP.sudah;
      wsRekap.getCell('D10').value = state.summary.MA.sudah;
      wsRekap.getCell('E10').value = state.summary.SMA.sudah;
      wsRekap.getCell('F10').value = { formula: 'SUM(B10:E10)' };

      for (let c = 2; c <= 6; c++) {
        const cell = wsRekap.getRow(10).getCell(c);
        cell.font = fontBold;
        cell.fill = fillSudah;
        cell.border = borderThin;
        cell.numFmt = '#,##0';
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }

      // Row 11: Belum Dibayar (Nominal)
      wsRekap.getRow(11).height = 30;
      wsRekap.getCell('A11').value = 'Belum Dibayar';
      wsRekap.getCell('A11').font = fontBold;
      wsRekap.getCell('A11').fill = fillBelum;
      wsRekap.getCell('A11').border = borderThin;
      wsRekap.getCell('A11').alignment = { horizontal: 'center', vertical: 'middle' };

      wsRekap.getCell('B11').value = state.summary.MTs.belum;
      wsRekap.getCell('C11').value = state.summary.SMP.belum;
      wsRekap.getCell('D11').value = state.summary.MA.belum;
      wsRekap.getCell('E11').value = state.summary.SMA.belum;
      wsRekap.getCell('F11').value = { formula: 'SUM(B11:E11)' };

      for (let c = 2; c <= 6; c++) {
        const cell = wsRekap.getRow(11).getCell(c);
        cell.font = fontBold;
        cell.fill = fillBelum;
        cell.border = borderThin;
        cell.numFmt = '#,##0';
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }

      // Row 12: Blank separator row (Tabel standard YTPAI tanpa baris Jumlah)
      wsRekap.getRow(12).height = 15;

      // Row 13: Merged A13:F13 -> PERSENTASE (%)
      wsRekap.mergeCells('A13:F13');
      wsRekap.getCell('A13').value = "PERSENTASE (%)";
      wsRekap.getCell('A13').font = fontSectionTitle;
      wsRekap.getCell('A13').alignment = { horizontal: 'center', vertical: 'middle' };
      wsRekap.getRow(13).height = 25.5;

      // Row 14: Headers: Status | MTs | SMP | MA | SMA | TOTAL
      wsRekap.getRow(14).height = 20.1;
      rekapColHeaders.forEach((h, idx) => {
        const cell = wsRekap.getRow(14).getCell(idx + 1);
        cell.value = h;
        cell.font = fontBold;
        cell.fill = fillGray;
        cell.border = borderThin;
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });

      // Row 15: Sudah Dibayar (Persentase)
      wsRekap.getRow(15).height = 30;
      wsRekap.getCell('A15').value = 'Sudah Dibayar';
      wsRekap.getCell('A15').font = fontBold;
      wsRekap.getCell('A15').fill = fillSudah;
      wsRekap.getCell('A15').border = borderThin;
      wsRekap.getCell('A15').alignment = { horizontal: 'center', vertical: 'middle' };

      wsRekap.getCell('B15').value = { formula: 'IFERROR(B10/(B10+B11),0)' };
      wsRekap.getCell('C15').value = { formula: 'IFERROR(C10/(C10+C11),0)' };
      wsRekap.getCell('D15').value = { formula: 'IFERROR(D10/(D10+D11),0)' };
      wsRekap.getCell('E15').value = { formula: 'IFERROR(E10/(E10+E11),0)' };
      wsRekap.getCell('F15').value = { formula: 'IFERROR(F10/(F10+F11),0)' };

      for (let c = 2; c <= 6; c++) {
        const cell = wsRekap.getRow(15).getCell(c);
        cell.font = fontBold;
        cell.fill = fillSudah;
        cell.border = borderThin;
        cell.numFmt = '0%';
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }

      // Row 16: Belum Dibayar (Persentase)
      wsRekap.getRow(16).height = 30;
      wsRekap.getCell('A16').value = 'Belum Dibayar';
      wsRekap.getCell('A16').font = fontBold;
      wsRekap.getCell('A16').fill = fillBelum;
      wsRekap.getCell('A16').border = borderThin;
      wsRekap.getCell('A16').alignment = { horizontal: 'center', vertical: 'middle' };

      wsRekap.getCell('B16').value = { formula: 'IFERROR(B11/(B10+B11),0)' };
      wsRekap.getCell('C16').value = { formula: 'IFERROR(C11/(C10+C11),0)' };
      wsRekap.getCell('D16').value = { formula: 'IFERROR(D11/(D10+D11),0)' };
      wsRekap.getCell('E16').value = { formula: 'IFERROR(E11/(E10+E11),0)' };
      wsRekap.getCell('F16').value = { formula: 'IFERROR(F11/(F10+F11),0)' };

      for (let c = 2; c <= 6; c++) {
        const cell = wsRekap.getRow(16).getCell(c);
        cell.font = fontBold;
        cell.fill = fillBelum;
        cell.border = borderThin;
        cell.numFmt = '0%';
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }

      // Row 17: empty
      wsRekap.getRow(17).height = 15;

      // Row 18 & 19: Timestamp (Menyesuaikan tanggal & waktu file yang diunggah)
      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      const dateNowStr = state.fileUpdateDateStr || (pad(now.getDate()) + '/' + pad(now.getMonth() + 1) + '/' + now.getFullYear());
      const timeNowStr = state.fileUpdateTimeStr || (pad(now.getHours()) + ':' + pad(now.getMinutes()) + ' WIB');

      wsRekap.getRow(18).height = 18;
      wsRekap.getCell('E18').value = 'Update:';
      wsRekap.getCell('E18').font = fontUpdate;
      wsRekap.getCell('E18').alignment = { horizontal: 'right', vertical: 'middle' };
      wsRekap.getCell('F18').value = dateNowStr;
      wsRekap.getCell('F18').font = fontUpdate;
      wsRekap.getCell('F18').alignment = { horizontal: 'right', vertical: 'middle' };

      wsRekap.getRow(19).height = 18;
      wsRekap.getCell('F19').value = timeNowStr;
      wsRekap.getCell('F19').font = fontUpdate;
      wsRekap.getCell('F19').alignment = { horizontal: 'right', vertical: 'middle' };

      // Generate Buffer and Trigger Download
      const buffer = await wb.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const filename = 'Laporan Transaksi ' + state.periodeIndo + '.xlsx';

      if (typeof window.saveAs === 'function') {
        window.saveAs(blob, filename);
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
      }

      notify('Excel ' + filename + ' berhasil diunduh!');
    } catch (err) {
      console.error('Error generating Excel:', err);
      notify('Gagal membuat berkas Excel.', 'error');
    }
  };

  // --- PDF EXPORT ENGINE (LEGAL LANDSCAPE WITH KOP PAGE 1 & CENTERED FOOTER) ---
  window.openRekapJunioPdfMenu = function() {
    const modal = document.getElementById('modalJunioPdf');
    if (!modal) return;
    if (modal.parentElement !== document.body) document.body.appendChild(modal);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  };

  window.closeRekapJunioPdfMenu = function() {
    const modal = document.getElementById('modalJunioPdf');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  function generateSinglePdfDoc(lem, returnBlobOnly) {
    returnBlobOnly = returnBlobOnly || false;
    if (!window.jspdf || !window.jspdf.jsPDF) {
      notify('Library jsPDF belum siap. Tunggu beberapa detik.', 'error');
      return null;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [612, 1008] // Legal Landscape
    });

    const items = state.transactions.filter(t => t.lembaga === lem);
    items.sort(compareTransactions);

    const labelTgl = (lem === 'MTs' || lem === 'SMP') ? 'Tanggal Efektif Tagihan' : 'Tanggal Jatuh Tempo';
    const tableHeaders = [['#', 'Tanggal Pembuatan', labelTgl, 'Nama', 'No. Registrasi', 'Kelas', 'Sub-Kelas', 'Jenis Tagihan', 'Jumlah Tagihan', 'Status']];

    const tableRows = items.map((t, idx) => [
      idx + 1,
      t.tglBuat,
      t.tglTempo,
      t.nama,
      t.noReg,
      t.kelas,
      t.subKelas,
      t.jenisTagihan,
      formatRupiah(t.nominal),
      t.status
    ]);

    const subtotal = state.summary[lem];
    tableRows.push(['', '', '', '', '', '', '', '', '', '']);
    tableRows.push(['', '', '', '', '', '', '', '', 'Sudah Dibayar', formatRupiah(subtotal.sudah)]);
    tableRows.push(['', '', '', '', '', '', '', '', 'Belum Dibayar', formatRupiah(subtotal.belum)]);

    doc.autoTable({
      head: tableHeaders,
      body: tableRows,
      startY: 95,
      margin: { top: 35, left: 26, right: 23, bottom: 25 },
      theme: 'plain',
      styles: {
        font: 'helvetica',
        fontSize: 9,
        textColor: [0, 0, 0],
        cellPadding: 4,
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      headStyles: {
        fillColor: [216, 228, 188], // Pastel Green matching contoh
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        lineWidth: 0.5,
        lineColor: [0, 0, 0]
      },
      columnStyles: {
        0: { cellWidth: 36, halign: 'center' },
        1: { cellWidth: 85, halign: 'center' },
        2: { cellWidth: 85, halign: 'center' },
        3: { cellWidth: 245, halign: 'left' },
        4: { cellWidth: 80, halign: 'center' },
        5: { cellWidth: 55, halign: 'center' },
        6: { cellWidth: 55, halign: 'center' },
        7: { cellWidth: 138, halign: 'left' },
        8: { cellWidth: 90, halign: 'center' },
        9: { cellWidth: 90, halign: 'center' }
      },
      didParseCell: function(data) {
        if (data.section === 'body') {
          const rowRaw = data.row.raw || [];
          const isSubtotalSudah = rowRaw[8] === 'Sudah Dibayar';
          const isSubtotalBelum = rowRaw[8] === 'Belum Dibayar';
          const isSpacer = rowRaw.every(c => c === '' || c === null || c === undefined);

          if (isSpacer) {
            data.cell.styles.lineWidth = 0;
            data.cell.styles.fillColor = [255, 255, 255];
          } else if (isSubtotalSudah) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.lineWidth = 0.5;
            data.cell.styles.lineColor = [0, 0, 0];
            if (data.column.index === 8 || data.column.index === 9) {
              data.cell.styles.fillColor = [216, 228, 188]; // Pastel Green
              data.cell.styles.halign = 'center';
            }
          } else if (isSubtotalBelum) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.lineWidth = 0.5;
            data.cell.styles.lineColor = [0, 0, 0];
            if (data.column.index === 8 || data.column.index === 9) {
              data.cell.styles.fillColor = [230, 184, 183]; // Pastel Red
              data.cell.styles.halign = 'center';
            }
          } else if (rowRaw[9] === 'Belum Dibayar') {
            // Blok warna merah muda membentang dari kolom nomor (#) sampai status
            data.cell.styles.fillColor = [230, 184, 183]; // Pastel Red (#E6B8B7)
            if (data.column.index === 9) {
              data.cell.styles.fontStyle = 'bold';
            }
          } else if (data.column.index === 9 && rowRaw[9] === 'Sudah Dibayar') {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [216, 228, 188]; // Pastel Green
          }
        }
      },
      didDrawPage: function(data) {
        // Kop Header HANYA pada Halaman 1
        if (data.pageNumber === 1) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(13);
          doc.text("YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN", 504, 30, { align: 'center' });

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.text("Tegalrejo Datinawong Babat Lamongan", 504, 45, { align: 'center' });

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(18);
          doc.text("Laporan Untuk - List Semua Transaksi", 504, 65, { align: 'center' });

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.text("Tanggal Awal : " + state.tglAwalRaw, 36, 85);
          doc.text("Tanggal Akhir : " + state.tglAkhirRaw, 972, 85, { align: 'right' });
        }
      }
    });

    // Centered Footer Page Number: "- X of Y -"
    const totalPages = doc.internal.getNumberOfPages();
    const pageWidth = doc.internal.pageSize.width || 1008;
    const centerX = pageWidth / 2;

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      const pageNumStr = '- ' + i + ' of ' + totalPages + ' -';
      doc.text(pageNumStr, centerX, 595, { align: 'center' });
    }

    if (returnBlobOnly) {
      return doc.output('blob');
    }

    const filename = lem + ' Laporan ' + state.periodeIndo + '.pdf';
    doc.save(filename);
    notify('PDF ' + lem + ' berhasil diunduh!');
    return doc;
  }

  window.downloadRekapJunioPdf = function(lem) {
    generateSinglePdfDoc(lem, false);
    closeRekapJunioPdfMenu();
  };

  window.downloadRekapJunioZipBundle = async function() {
    if (typeof JSZip === 'undefined') {
      notify('Library JSZip belum siap. Tunggu beberapa detik.', 'error');
      return;
    }

    try {
      const zip = new JSZip();
      const lembagaList = ['MTs', 'SMP', 'MA', 'SMA'];

      for (const lem of lembagaList) {
        const blob = generateSinglePdfDoc(lem, true);
        if (blob) {
          zip.file(lem + ' Laporan ' + state.periodeIndo + '.pdf', blob);
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipFilename = 'Laporan PDF Lengkap ' + state.periodeIndo + '.zip';

      if (typeof window.saveAs === 'function') {
        window.saveAs(zipBlob, zipFilename);
      } else {
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = zipFilename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
      }

      notify('Paket ZIP semua PDF berhasil diunduh!');
      closeRekapJunioPdfMenu();
    } catch (err) {
      console.error('Error generating ZIP:', err);
      notify('Gagal membuat berkas ZIP.', 'error');
    }
  };

  // --- WHATSAPP SUMMARY & HD CANVAS IMAGE ENGINE ---
  window.openRekapJunioWaModal = function() {
    const modal = document.getElementById('modalJunioWa');
    if (!modal) return;
    if (modal.parentElement !== document.body) document.body.appendChild(modal);
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    renderRekapJunioCanvas();
    generateRekapJunioWaText();

    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  };

  window.closeRekapJunioWaModal = function() {
    const modal = document.getElementById('modalJunioWa');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };

  function renderRekapJunioCanvas() {
    const canvas = document.getElementById('rjWaCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Canvas HD resolution (Crisp, sharp, proportional, not overly wide)
    const width = 1600;
    const height = 1180;
    canvas.width = width;
    canvas.height = height;

    // 1. Fill background white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // 2. Faint subtle Excel gridlines background
    ctx.strokeStyle = '#F0F0F0';
    ctx.lineWidth = 1;
    const gridRowStep = 32;
    for (let y = gridRowStep; y < height; y += gridRowStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    const gridColStep = 60;
    for (let x = gridColStep; x < width; x += gridColStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Colors matching contoh/Rekap.png & Sheet 6
    const fillGray = '#D9D9D9';
    const fillSudah = '#D8E4BC';
    const fillBelum = '#E6B8B7';

    // 3. Compact & Centered Table Boundaries (No empty columns, strictly 6 columns!)
    // Columns: [Status, MTs, SMP, MA, SMA, TOTAL]
    const colWidths = [290, 214, 214, 214, 214, 214]; // Sum = 1360px
    const tableLeft = Math.round((width - 1360) / 2); // (1600 - 1360) / 2 = 120px
    const colX = [tableLeft];
    for (let i = 0; i < colWidths.length; i++) {
      colX.push(colX[i] + colWidths[i]);
    }
    const tableRight = colX[colX.length - 1]; // 1480px
    const tableWidth = tableRight - tableLeft; // 1360px
    const tableCenterX = tableLeft + (tableWidth / 2); // 800px (exact canvas center)

    // Clear Kop area background for crisp text
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(tableLeft, 10, tableWidth, 310);

    // 1. Kop Header (Centered exactly across the table width)
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Row 1: YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN
    ctx.font = 'bold 28px "Arial Narrow", Arial, sans-serif';
    ctx.fillText("YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN", tableCenterX, 42);

    // Row 2: Tegalrejo Datinawong Babat Lamongan
    ctx.font = '24px "Arial Narrow", Arial, sans-serif';
    ctx.fillText("Tegalrejo Datinawong Babat Lamongan", tableCenterX, 78);

    // Row 3: Laporan Untuk - List Semua Transaksi
    ctx.font = 'bold 50px "Arial Narrow", Arial, sans-serif';
    ctx.fillText("Laporan Untuk - List Semua Transaksi", tableCenterX, 146);

    // Row 5 & 6: Dates (Format Besar & Tebal Presisi, aligned to tableLeft)
    const startParts = getRekapDateParts(state.tglAwalRaw, '01', 'Aug-26');
    const endParts = getRekapDateParts(state.tglAkhirRaw, '10', 'Sep-26');

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 36px "Arial Narrow", Arial, sans-serif';
    ctx.fillStyle = '#000000';

    const dateLabelX = tableLeft;
    const colonX = tableLeft + 265;
    const dayX = tableLeft + 295;
    const monthX = tableLeft + 375;

    ctx.fillText("Tanggal Mulai", dateLabelX, 240);
    ctx.fillText(":", colonX, 240);
    ctx.fillText(startParts.labelDay, dayX, 240);
    ctx.fillText(startParts.monthYear, monthX, 240);

    ctx.fillText("Tanggal Berakhir", dateLabelX, 292);
    ctx.fillText(":", colonX, 292);
    ctx.fillText(endParts.labelDay, dayX, 292);
    ctx.fillText(endParts.monthYear, monthX, 292);

    // Helper to draw a matrix grid table (Strict 6-column layout with crisp borders)
    function drawMatrixTable(startY, title, isPercentage) {
      // Title Row (Merged A:F)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(tableLeft, startY, tableWidth, 46);
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 32px "Arial Narrow", Arial, sans-serif';
      ctx.fillText(title, tableCenterX, startY + 23);

      // Header Row (Status | MTs | SMP | MA | SMA | TOTAL)
      const hY = startY + 48;
      const hH = 56;
      ctx.fillStyle = fillGray;
      ctx.fillRect(tableLeft, hY, tableWidth, hH);

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(tableLeft, hY, tableWidth, hH);

      for (let i = 1; i < colX.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(colX[i], hY);
        ctx.lineTo(colX[i], hY + hH);
        ctx.stroke();
      }

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 28px "Arial Narrow", Arial, sans-serif';
      const headers = ['Status', 'MTs', 'SMP', 'MA', 'SMA', 'TOTAL'];
      headers.forEach((h, idx) => {
        ctx.fillText(h, (colX[idx] + colX[idx + 1]) / 2, hY + hH / 2);
      });

      // Row 1: Sudah Dibayar
      const r1Y = hY + hH;
      const rH = 78;
      ctx.fillStyle = fillSudah;
      ctx.fillRect(tableLeft, r1Y, tableWidth, rH);
      ctx.strokeRect(tableLeft, r1Y, tableWidth, rH);

      for (let i = 1; i < colX.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(colX[i], r1Y);
        ctx.lineTo(colX[i], r1Y + rH);
        ctx.stroke();
      }

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 28px "Arial Narrow", Arial, sans-serif';
      ctx.fillText('Sudah Dibayar', (colX[0] + colX[1]) / 2, r1Y + rH / 2);

      const sudahValues = isPercentage ? [
        (state.summary.MTs.total > 0 ? Math.round((state.summary.MTs.sudah / state.summary.MTs.total) * 100) : 0) + '%',
        (state.summary.SMP.total > 0 ? Math.round((state.summary.SMP.sudah / state.summary.SMP.total) * 100) : 0) + '%',
        (state.summary.MA.total > 0 ? Math.round((state.summary.MA.sudah / state.summary.MA.total) * 100) : 0) + '%',
        (state.summary.SMA.total > 0 ? Math.round((state.summary.SMA.sudah / state.summary.SMA.total) * 100) : 0) + '%',
        (state.totals.total > 0 ? Math.round((state.totals.sudah / state.totals.total) * 100) : 0) + '%'
      ] : [
        formatCommaNumber(state.summary.MTs.sudah),
        formatCommaNumber(state.summary.SMP.sudah),
        formatCommaNumber(state.summary.MA.sudah),
        formatCommaNumber(state.summary.SMA.sudah),
        formatCommaNumber(state.totals.sudah)
      ];

      sudahValues.forEach((val, idx) => {
        ctx.fillText(val, (colX[idx + 1] + colX[idx + 2]) / 2, r1Y + rH / 2);
      });

      // Row 2: Belum Dibayar
      const r2Y = r1Y + rH;
      ctx.fillStyle = fillBelum;
      ctx.fillRect(tableLeft, r2Y, tableWidth, rH);
      ctx.strokeRect(tableLeft, r2Y, tableWidth, rH);

      for (let i = 1; i < colX.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(colX[i], r2Y);
        ctx.lineTo(colX[i], r2Y + rH);
        ctx.stroke();
      }

      ctx.fillStyle = '#000000';
      ctx.fillText('Belum Dibayar', (colX[0] + colX[1]) / 2, r2Y + rH / 2);

      const belumValues = isPercentage ? [
        (state.summary.MTs.total > 0 ? (100 - Math.round((state.summary.MTs.sudah / state.summary.MTs.total) * 100)) : 0) + '%',
        (state.summary.SMP.total > 0 ? (100 - Math.round((state.summary.SMP.sudah / state.summary.SMP.total) * 100)) : 0) + '%',
        (state.summary.MA.total > 0 ? (100 - Math.round((state.summary.MA.sudah / state.summary.MA.total) * 100)) : 0) + '%',
        (state.summary.SMA.total > 0 ? (100 - Math.round((state.summary.SMA.sudah / state.summary.SMA.total) * 100)) : 0) + '%',
        (state.totals.total > 0 ? (100 - Math.round((state.totals.sudah / state.totals.total) * 100)) : 0) + '%'
      ] : [
        formatCommaNumber(state.summary.MTs.belum),
        formatCommaNumber(state.summary.SMP.belum),
        formatCommaNumber(state.summary.MA.belum),
        formatCommaNumber(state.summary.SMA.belum),
        formatCommaNumber(state.totals.belum)
      ];

      belumValues.forEach((val, idx) => {
        ctx.fillText(val, (colX[idx + 1] + colX[idx + 2]) / 2, r2Y + rH / 2);
      });

      return r2Y + rH;
    }

    // 2. Draw Table 1: NOMINAL (Rp.)
    const table1EndY = drawMatrixTable(348, "NOMINAL (Rp.)", false);

    // 3. Draw Table 2: PERSENTASE (%)
    const table2EndY = drawMatrixTable(table1EndY + 40, "PERSENTASE (%)", true);

    // 4. Timestamp on Bottom Right (Menyesuaikan file yang diunggah)
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const dateNowStr = state.fileUpdateDateStr || (pad(now.getDate()) + '/' + pad(now.getMonth() + 1) + '/' + now.getFullYear());
    const timeNowStr = state.fileUpdateTimeStr || (pad(now.getHours()) + ':' + pad(now.getMinutes()) + ' WIB');

    ctx.textAlign = 'right';
    ctx.font = 'italic bold 28px "Calibri", Arial, sans-serif';
    ctx.fillStyle = '#000000';
    ctx.fillText("Update:  " + dateNowStr, tableRight, table2EndY + 65);
    ctx.fillText(timeNowStr, tableRight, table2EndY + 105);
  }

  function generateRekapJunioWaText() {
    const totPct = state.totals.total > 0 ? Math.round((state.totals.sudah / state.totals.total) * 100) : 0;
    const totBelumPct = 100 - totPct;

    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const dateNowStr = state.fileUpdateDateStr || (pad(now.getDate()) + '/' + pad(now.getMonth() + 1) + '/' + now.getFullYear());
    const timeNowStr = state.fileUpdateTimeStr || (pad(now.getHours()) + ':' + pad(now.getMinutes()) + ' WIB');

    let text = '*REKAPITULASI PEMBAYARAN SISWA (JUNIO)*\n';
    text += "*YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN*\n";
    text += 'Tegalrejo Datinawong Babat Lamongan\n';
    text += 'Periode: ' + state.periodeIndo + '\n\n';

    text += '━━━━━━━━━━━━━━━━━━━━━━\n';
    text += '📊 *NOMINAL (Rp.):*\n';
    text += '━━━━━━━━━━━━━━━━━━━━━━\n';
    ['MTs', 'SMP', 'MA', 'SMA'].forEach(lem => {
      const d = state.summary[lem];
      text += '• *' + lem + '*: Sudah ' + formatRupiah(d.sudah) + ' | Belum ' + formatRupiah(d.belum) + ' (Total ' + formatRupiah(d.total) + ')\n';
    });
    text += '--------------------------------------\n';
    text += '💰 *TOTAL:* Sudah ' + formatRupiah(state.totals.sudah) + ' | Belum ' + formatRupiah(state.totals.belum) + ' (Total ' + formatRupiah(state.totals.total) + ')\n\n';

    text += '━━━━━━━━━━━━━━━━━━━━━━\n';
    text += '📈 *PERSENTASE (%):*\n';
    text += '━━━━━━━━━━━━━━━━━━━━━━\n';
    ['MTs', 'SMP', 'MA', 'SMA'].forEach(lem => {
      const d = state.summary[lem];
      const pSudah = d.total > 0 ? Math.round((d.sudah / d.total) * 100) : 0;
      const pBelum = 100 - pSudah;
      text += '• *' + lem + '*: Sudah ' + pSudah + '% | Belum ' + pBelum + '%\n';
    });
    text += '--------------------------------------\n';
    text += '📊 *TOTAL CAPAIAN:* Sudah ' + totPct + '% | Belum ' + totBelumPct + '%\n\n';

    text += 'Update: ' + dateNowStr + ', ' + timeNowStr + '\n';
    text += '_Dibuat otomatis melalui Partner Fatih (Sistem Informasi Terpadu YTPAI)_\n';

    const txtArea = document.getElementById('rjWaTextarea');
    if (txtArea) txtArea.value = text;
  }

  window.copyRekapJunioWaText = function() {
    const txtArea = document.getElementById('rjWaTextarea');
    if (!txtArea || !txtArea.value) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txtArea.value).then(() => {
        notify('Format teks WhatsApp berhasil disalin ke clipboard!');
      }).catch(() => {
        txtArea.select();
        document.execCommand('copy');
        notify('Format teks WhatsApp berhasil disalin!');
      });
    } else {
      txtArea.select();
      document.execCommand('copy');
      notify('Format teks WhatsApp berhasil disalin!');
    }
  };

  window.downloadRekapJunioWaImage = function() {
    renderRekapJunioCanvas();
    const canvas = document.getElementById('rjWaCanvas');
    if (!canvas) return;

    canvas.toBlob(blob => {
      const filename = 'Rekapitulasi Transaksi HD ' + state.periodeIndo + '.png';
      if (typeof window.saveAs === 'function') {
        window.saveAs(blob, filename);
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
      }
      notify('Gambar Rekapitulasi HD berhasil diunduh!');
    }, 'image/png');
  };

  window.downloadRekapJunioHdImage = window.downloadRekapJunioWaImage;

  // --- TAB INITIALIZATION HOOK ---
  window.initRekapJunioTab = function() {
    const dropZone = document.getElementById('rjDropZone');
    if (dropZone && !dropZone.dataset.initialized) {
      dropZone.dataset.initialized = 'true';

      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('border-emerald-500', 'bg-emerald-500/10');
      });

      dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('border-emerald-500', 'bg-emerald-500/10');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('border-emerald-500', 'bg-emerald-500/10');
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
          processRekapJunioFile(files[0]);
        }
      });
    }

    updateRekapJunioUI();
  };

})(window);

// END MODULE: tab_rekap_junio.js
