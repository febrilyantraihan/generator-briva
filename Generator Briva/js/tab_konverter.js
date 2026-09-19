// ============================================================================
// MODULE: tab_konverter.js
// Tab 1: Konverter Formulir & Data Rekap Tagihan Excel
// ============================================================================
let currentBulkResults = [];
          showFeedbackToast('Rumus BRIVA berhasil disalin ke clipboard!', 'success');
        } else {
          alert('Rumus BRIVA berhasil disalin: ' + formula);
        }
      });
    }

    function openBulkWhatsApp() {
      window.open('https://web.whatsapp.com', '_blank');
    }

    function copyKatalogTable() {
      const tbl = document.getElementById('katalogTable') || document.querySelector('#tab-katalog table');
      const text = tbl ? tbl.innerText : 'Data Katalog Biaya YTPAI';
      navigator.clipboard.writeText(text).then(() => {
        if (typeof showFeedbackToast === 'function') {
          showFeedbackToast('Tabel Katalog Biaya berhasil disalin ke clipboard!', 'success');
        } else {
          alert('Tabel Katalog Biaya berhasil disalin!');
        }
      });
    }

    // --- 5B. SIDEBAR FILTER HELPERS ---
    function filterSidebarMenus(query) {
      const q = (query || '').toLowerCase().trim();
      const nav = document.getElementById('sidebarMenuNav');
      if (!nav) return;
      const buttons = nav.querySelectorAll('button');
      buttons.forEach(btn => {
        const txt = btn.textContent.toLowerCase();
        if (!q || txt.includes(q)) {
          btn.style.display = '';
        } else {
          btn.style.display = 'none';
        }
      });
    }

    // --- 6. PARSER LOGIC FOR BULK CONVERTER ---
    function parseStatusCriteria(text) {
      if (!text) return null;
      const lower = text.toLowerCase().trim();

      if (lower.includes('vip')) {
        return { status: 'vip', gender: 'PI', label: 'Mukim VIP (Putri)', colorClass: 'bg-purple-100 text-purple-800 border-purple-300' };
      }

      if (lower.includes('mbajak') || lower.includes('non') || lower.includes('laju') || lower.includes('nduduk')) {
        const gender = (lower.includes('pa') || lower.includes('putra')) ? 'PA' : 'PI';
        return { status: 'mbajak', gender: gender, label: 'Non-Mukim (Mbajak)', colorClass: 'bg-amber-100 text-amber-850 border-amber-300' };
      }

      if (lower.includes('pa') || lower.includes('putra') || lower.includes('pria') || lower.includes('ikhwan')) {
        return { status: 'reguler', gender: 'PA', label: 'Mukim Reguler PA', colorClass: 'bg-blue-100 text-blue-800 border-blue-300' };
      }
      if (lower.includes('pi') || lower.includes('putri') || lower.includes('wanita') || lower.includes('akhwat')) {
        return { status: 'reguler', gender: 'PI', label: 'Mukim Reguler PI', colorClass: 'bg-pink-100 text-pink-800 border-pink-300' };
      }

      if (lower.includes('reguler') || lower.includes('mukim') || lower.includes('pondok') || lower.includes('santri')) {
        return { status: 'reguler', gender: 'PA', label: 'Mukim Reguler', colorClass: 'bg-blue-100 text-blue-800 border-blue-300' };
      }

      return null;
    }

    function calculateRate(kelas, jenisTagihan, criteria) {
      if (!criteria) return 0;
      const kelasStr = String(kelas);

      if (jenisTagihan === 'bulanan') {
        const table = PRICING_DB.bulanan[kelasStr];
        if (!table) return 0;
        return table[criteria.status] || 0;
      }

      if (jenisTagihan === 'bulanan_setahun') {
        const table = PRICING_DB.bulanan[kelasStr];
        if (!table) return 0;
        return (table[criteria.status] || 0) * 12;
      }

      if (jenisTagihan === 'awal_tahun') {
        const table = PRICING_DB.awal_tahun[kelasStr];
        if (!table) return 0;
        return table[criteria.status] || 0;
      }

      if (jenisTagihan === 'akhir_tahun') {
        return PRICING_DB.akhir_tahun[kelasStr] || 0;
      }

      if (jenisTagihan === 'seragam_sekolah') {
        const isMts = ['7', '8', '9'].includes(kelasStr);
        const level = isMts ? 'sltp' : 'slta';
        const gKey = (criteria.gender === 'PI') ? 'pi' : 'pa';
        return PRICING_DB.seragam_sekolah[level][gKey] || 0;
      }

      if (jenisTagihan === 'seragam_pondok') {
        return (criteria.gender === 'PI') ? PRICING_DB.seragam_pondok.pi : PRICING_DB.seragam_pondok.pa;
      }

      return 0;
    }

    function formatNumberOutput(num, format) {
      if (!num || isNaN(num)) return '0';
      const intVal = Math.round(num);

      if (format === 'safe') return "'" + intVal.toLocaleString('en-US');
      if (format === 'comma') return intVal.toLocaleString('en-US');
      if (format === 'dot') return intVal.toLocaleString('id-ID');
      if (format === 'raw') return String(intVal);
      return String(intVal);
    }

    function formatNumberDisplay(num) {
      if (!num || isNaN(num)) return '0';
      return Math.round(Number(num)).toLocaleString('id-ID');
    }

    // --- 7. RUN BULK CONVERSION ---
    function runBulkConversion() {
      const input = document.getElementById('bulkInput').value;
      const kelas = document.getElementById('bulkKelasSelect').value;
      const jenisTagihan = document.getElementById('bulkJenisTagihan').value;
      const parserMode = document.querySelector('input[name="parserMode"]:checked').value;

      const lines = input.split('\n');
      const filteredLines = lines.map(l => l.trim()).filter(l => l.length > 0);
      document.getElementById('bulkLineCount').textContent = filteredLines.length + ' baris';

      currentBulkResults = [];
      let successCount = 0;
      let failedCount = 0;
      let totalSum = 0;

      filteredLines.forEach((line, idx) => {
        let criteria = null;
        let effectiveKelas = kelas;
        let effectiveTagihan = jenisTagihan;

        if (parserMode === 'multi') {
          const parts = line.split(/[\t,;]+/).map(p => p.trim());
          parts.forEach(p => {
            const m = p.match(/\b(7|8|9|10|11|12)\b/);
            if (m) effectiveKelas = m[1];
            const parsed = parseStatusCriteria(p);
            if (parsed) criteria = parsed;
          });
          if (!criteria && parts.length > 0) {
            criteria = parseStatusCriteria(line);
          }
        } else {
          criteria = parseStatusCriteria(line);
        }

        const rate = criteria ? calculateRate(effectiveKelas, effectiveTagihan, criteria) : 0;
        const isSuccess = rate > 0;

        if (isSuccess) {
          successCount++;
          totalSum += rate;
        } else {
          failedCount++;
        }

        currentBulkResults.push({
          index: idx + 1,
          raw: line,
          criteria: criteria,
          kelas: effectiveKelas,
          rate: rate,
          isSuccess: isSuccess
        });
      });

      document.getElementById('statSuccess').textContent = successCount;
      document.getElementById('statFailed').textContent = failedCount;
      document.getElementById('summaryBadge').textContent = 'Total: Rp ' + totalSum.toLocaleString('id-ID');
      const avg = successCount > 0 ? Math.round(totalSum / successCount) : 0;
      document.getElementById('statAverage').textContent = 'Rp ' + avg.toLocaleString('id-ID');

      renderBulkResults();
    }

    function renderBulkResults() {
      const format = document.getElementById('bulkFormatSelect').value;
      const tbody = document.getElementById('bulkTableBody');
      const searchQuery = (document.getElementById('bulkTableSearch')?.value || '').trim().toLowerCase();
      const clearBtn = document.getElementById('clearBulkSearchBtn');
      if (clearBtn) {
        if (searchQuery.length > 0) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
      }

      if (currentBulkResults.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="py-16 text-center text-slate-400">
              <i data-lucide="inbox" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
              <p class="font-medium">Belum ada data input</p>
              <p class="text-[11px] text-slate-400">Tempelkan kolom status dari Excel di kotak sebelah kiri/atas.</p>
            </td>
          </tr>
        `;
        document.getElementById('bulkFilterCount').textContent = '0';
        lucide.createIcons();
        return;
      }

      let displayedItems = currentBulkResults;
      if (searchQuery.length > 0) {
        displayedItems = currentBulkResults.filter(item => {
          const rawMatch = item.raw.toLowerCase().includes(searchQuery);
          const critMatch = item.criteria && item.criteria.label.toLowerCase().includes(searchQuery);
          const kelasMatch = String(item.kelas).includes(searchQuery);
          const rateMatch = String(item.rate).includes(searchQuery);
          return rawMatch || critMatch || kelasMatch || rateMatch;
        });
      }

      document.getElementById('bulkFilterCount').textContent = `${displayedItems.length} dari ${currentBulkResults.length}`;

      if (displayedItems.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="py-12 text-center text-slate-400">
              <i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
              <p class="font-medium text-slate-600">Tidak ada item yang cocok</p>
              <p class="text-[11px] text-slate-400">Kata kunci "${escapeHtml(searchQuery)}" tidak ditemukan dalam tabel.</p>
            </td>
          </tr>
        `;
        lucide.createIcons();
        return;
      }

      let html = '';
      displayedItems.forEach((item, idx) => {
        const formatted = item.isSuccess ? formatNumberOutput(item.rate, format) : '-';
        const badge = item.isSuccess 
          ? `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
               <i data-lucide="check" class="w-3 h-3"></i> Valid
             </span>`
          : `<span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
               <i data-lucide="x" class="w-3 h-3"></i> Galat
             </span>`;

        // Color coding border and background according to status category
        let rowBorder = 'border-l-[5px] border-slate-300';
        let rowBg = 'hover:bg-slate-50/60';
        if (item.criteria) {
          if (item.criteria.status === 'vip') {
            rowBorder = 'border-l-[5px] border-purple-500';
            rowBg = 'hover:bg-purple-50/40 bg-purple-50/15';
          } else if (item.criteria.status === 'mbajak') {
            rowBorder = 'border-l-[5px] border-amber-500';
            rowBg = 'hover:bg-amber-50/40 bg-amber-50/15';
          } else if (item.criteria.gender === 'PI') {
            rowBorder = 'border-l-[5px] border-pink-500';
            rowBg = 'hover:bg-pink-50/40 bg-pink-50/15';
          } else {
            rowBorder = 'border-l-[5px] border-blue-500';
            rowBg = 'hover:bg-blue-50/40 bg-blue-50/15';
          }
        } else {
          rowBorder = 'border-l-[5px] border-rose-500';
          rowBg = 'hover:bg-rose-50/40 bg-rose-50/15';
        }

        const critBadge = item.criteria 
          ? `<span class="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${item.criteria.colorClass}">${item.criteria.label}</span>`
          : `<span class="text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-[11px] font-medium border border-rose-200">Tidak dikenal</span>`;

        html += `
          <tr class="${rowBorder} ${rowBg} transition-colors border-b border-slate-100">
            <td class="py-2.5 px-3 text-center text-slate-400 tabular-nums font-bold">${item.index}</td>
            <td class="py-2.5 px-3 tabular-nums font-semibold text-slate-800">${highlightSearch(item.raw, searchQuery)}</td>
            <td class="py-2.5 px-3">${critBadge}</td>
            <td class="py-2.5 px-3 text-slate-700 font-semibold">Kelas ${item.kelas}</td>
            <td class="py-2.5 px-3 text-right tabular-nums font-bold ${item.isSuccess ? 'text-blue-700' : 'text-slate-400'}">${formatted}</td>
            <td class="py-2.5 px-3 text-center">${badge}</td>
          </tr>
        `;
      });

      tbody.innerHTML = html;
      lucide.createIcons();
    }

    function escapeHtml(text) {
      return text.replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
      }[m]));
      }
      const format = document.getElementById('bulkFormatSelect').value;
      const text = currentBulkResults.map(i => i.isSuccess ? formatNumberOutput(i.rate, format) : '').join('\r\n');
      copyToClipboard(text, 'Kolom Siap Tempel!', `${currentBulkResults.length} baris telah disalin. Langsung Ctrl+V di Excel.`);
    }

    function copyRawNumberColumn() {
      if (currentBulkResults.length === 0) return;
      const text = currentBulkResults.map(i => i.isSuccess ? String(i.rate) : '0').join('\r\n');
      copyToClipboard(text, 'Nominal Polos Disalin', 'Siap digunakan untuk rumus matematis =SUM().');
    }

    function resetBulkConverter() {
      document.getElementById('bulkInput').value = '';
      runBulkConversion();
      soundReset();
      showToast('Data Dibersihkan', 'Kotak konverter massal telah di-reset.');
    }

    function insertBulkSample() {
      const sample = [
        'Mukim Reguler PI',
        'VIP',
        'Mukim Reguler PA',
        'Non Mukim Mbajak',
        'VIP Putri',
        'Reguler',
        'Mukim Reguler PI',
        'Mbajak PA',
        'Mukim Reguler PA',
        'VIP'
      ].join('\n');
      document.getElementById('bulkInput').value = sample;
      runBulkConversion();
      soundSuccess();
      showToast('Contoh Dimuat', '10 baris data simulasi berhasil dimuat.');
    }

    function presetConverter(jenis, kelas) {
      switchTab('konverter');
      document.getElementById('bulkJenisTagihan').value = jenis;
