// ============================================================================
// MODULE: tab_rekap_santri.js
// Rekap Data Santri Real, Tren Bulanan & Generator Tagihan Junio Smart BRI
// ============================================================================

(function(window) {
  'use strict';

  // --- 1. STATE & STORAGE KEY ---
  const SANTRI_STORAGE_KEY = 'partner_fatih_santri_db_v1';
  const SANTRI_MONTHLY_STORE_KEY = 'partner_fatih_santri_monthly_db_v8';
  const SANTRI_HISTORY_STORAGE_KEY = 'partner_fatih_santri_history_v1';
  const SANTRI_MUTATIONS_STORAGE_KEY = 'partner_fatih_santri_mutations_v1';



  let currentPeriodKey = '10-2026';
  let comparisonPeriodKey = '10-2026';
  let monthlySantriStore = {};
  let santriDataList = [];
  let santriHistory = null;
  let santriMutations = [];
  let currentMutationFilter = 'ALL';
  let currentMutasiType = 'MASUK';
  let currentCompChangeFilter = 'ALL';
  let latestComparisonResult = null;
  let selectedMutasiReg = null;
  let currentStudentChartMode = 'TOTAL'; // 'TOTAL', 'PCT', 'UNITS'

  let santriCurrentPage = 1;
  let santriPageSize = 50; // 50, 100, or 'ALL'
  let currentUnitMeetingTab = 'ALL';
  let currentKelasMeetingTab = 'ALL';
  let currentSortMode = 'NAMA'; // Default 'NAMA' (Alfabetis A-Z per kelas sesuai instruksi), atau 'REG' (No. Registrasi)

  // Helper: Pengurutan Baku (Unit -> Kelas -> Nama Alfabetis A-Z atau No. Registrasi)
  function sortSantriHierarchy(list) {
    if (!list || !Array.isArray(list)) return [];
    const unitOrder = { 'MTs': 1, 'SMP': 2, 'MA': 3, 'SMA': 4 };
    return list.slice().sort((a, b) => {
      // 1. Urut Unit (MTs -> SMP -> MA -> SMA)
      const uA = unitOrder[a.unit] || 99;
      const uB = unitOrder[b.unit] || 99;
      if (uA !== uB) return uA - uB;

      // 2. Urut Kelas (7 -> 8 -> 9 atau 10 -> 11 -> 12)
      const kA = Number(a.kelas) || 0;
      const kB = Number(b.kelas) || 0;
      if (kA !== kB) return kA - kB;

      // 3. Sesuai Permintaan Bendahara: Di dalam masing-masing kelas, urut alfabetis A-Z nama santri
      if (currentSortMode === 'NAMA') {
        const nameComp = (a.nama || '').localeCompare(b.nama || '', 'id', { sensitivity: 'base' });
        if (nameComp !== 0) return nameComp;

        // Fallback jika nama persis sama: urut registrasi buku induk
        const regA = Number(String(a.reg).replace(/\D/g, '')) || 0;
        const regB = Number(String(b.reg).replace(/\D/g, '')) || 0;
        return regA - regB;
      } else {
        // Mode REG: urut no registrasi buku induk
        const regA = Number(String(a.reg).replace(/\D/g, '')) || 0;
        const regB = Number(String(b.reg).replace(/\D/g, '')) || 0;
        if (regA !== regB) return regA - regB;

        return (a.nama || '').localeCompare(b.nama || '', 'id', { sensitivity: 'base' });
      }
    });
  }

  function toggleSantriSortMode() {
    currentSortMode = (currentSortMode === 'NAMA') ? 'REG' : 'NAMA';
    updateSortButtonUI();
    santriCurrentPage = 1;
    renderSantriTable();
    showToast(
      'Urutan Santri Diubah',
      currentSortMode === 'NAMA' 
        ? 'Data per kelas kini diurutkan berdasarkan Nama Alfabetis (A-Z).' 
        : 'Data per kelas kini diurutkan berdasarkan No. Registrasi Buku Induk.'
    );
  }

  function updateSortButtonUI() {
    const btn = document.getElementById('btnToggleSantriSort');
    if (!btn) return;
    if (currentSortMode === 'NAMA') {
      btn.innerHTML = `<i data-lucide="arrow-down-a-z" class="w-3.5 h-3.5 text-teal-600 dark:text-teal-400"></i><span>Urut: Nama (A-Z)</span>`;
      btn.className = "px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-700 hover:bg-teal-100 flex items-center gap-1.5 cursor-pointer shadow-2xs";
      btn.title = "Mode aktif: Alfabet A-Z. Klik untuk beralih ke urutan No. Registrasi";
    } else {
      btn.innerHTML = `<i data-lucide="arrow-down-1-0" class="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"></i><span>Urut: No. Reg</span>`;
      btn.className = "px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700 hover:bg-blue-100 flex items-center gap-1.5 cursor-pointer shadow-2xs";
      btn.title = "Mode aktif: No. Registrasi. Klik untuk beralih ke urutan Nama Alfabetis (A-Z)";
    }
    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  }

  function selectUnitMeetingTab(unit) {
    currentUnitMeetingTab = unit;
    const filterSelect = document.getElementById('santriFilterUnit');
    if (filterSelect) {
      filterSelect.value = unit;
    }
    
    // Validasi apakah currentKelasMeetingTab masih relevan dengan unit baru
    if (currentKelasMeetingTab !== 'ALL') {
      const kNum = Number(currentKelasMeetingTab);
      if ((unit === 'MTs' || unit === 'SMP') && (kNum < 7 || kNum > 9)) {
        currentKelasMeetingTab = 'ALL';
      } else if ((unit === 'MA' || unit === 'SMA') && (kNum < 10 || kNum > 12)) {
        currentKelasMeetingTab = 'ALL';
      }
    }

    const filterKelasSelect = document.getElementById('santriFilterKelas');
    if (filterKelasSelect) {
      filterKelasSelect.value = currentKelasMeetingTab;
    }

    updateUnitMeetingTabButtons();
    santriCurrentPage = 1;
    renderSantriTable();
  }

  function selectKelasMeetingTab(kelas) {
    currentKelasMeetingTab = String(kelas);

    // Jika user memilih kelas tertentu saat unit aktif tidak cocok, sesuaikan unit secara cerdas
    if (currentKelasMeetingTab !== 'ALL') {
      const kNum = Number(currentKelasMeetingTab);
      if (kNum >= 7 && kNum <= 9) {
        if (currentUnitMeetingTab === 'MA' || currentUnitMeetingTab === 'SMA') {
          currentUnitMeetingTab = 'ALL';
          const filterUnitSelect = document.getElementById('santriFilterUnit');
          if (filterUnitSelect) filterUnitSelect.value = 'ALL';
          updateUnitMeetingTabButtons();
        }
      } else if (kNum >= 10 && kNum <= 12) {
        if (currentUnitMeetingTab === 'MTs' || currentUnitMeetingTab === 'SMP') {
          currentUnitMeetingTab = 'ALL';
          const filterUnitSelect = document.getElementById('santriFilterUnit');
          if (filterUnitSelect) filterUnitSelect.value = 'ALL';
          updateUnitMeetingTabButtons();
        }
      }
    }

    const filterKelasSelect = document.getElementById('santriFilterKelas');
    if (filterKelasSelect) {
      filterKelasSelect.value = currentKelasMeetingTab;
    }
    updateKelasMeetingSubTabs();
    santriCurrentPage = 1;
    renderSantriTable();
  }

  function onSelectFilterUnitDropdown(unitVal) {
    selectUnitMeetingTab(unitVal);
  }

  function onSelectFilterKelasDropdown(kelasVal) {
    selectKelasMeetingTab(kelasVal);
  }

  function changeSantriPageSize(val) {
    santriPageSize = (val === 'ALL') ? 'ALL' : (Number(val) || 50);
    santriCurrentPage = 1;
    renderSantriTable();
  }

  function updateUnitMeetingTabButtons() {
    const tabs = ['ALL', 'MTs', 'SMP', 'MA', 'SMA'];
    tabs.forEach(u => {
      const btn = document.getElementById(`tabBtnUnit${u}`);
      if (!btn) return;
      if (u === currentUnitMeetingTab) {
        btn.className = 'unit-meeting-tab px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-teal-600 text-white shadow-xs flex items-center gap-1 cursor-pointer';
      } else {
        btn.className = 'unit-meeting-tab px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 cursor-pointer';
      }
    });

    if (santriDataList && santriDataList.length > 0) {
      const active = santriDataList.filter(s => s.status !== 'Boyong');
      const countAll = active.length;
      const countMTs = active.filter(s => s.unit === 'MTs').length;
      const countSMP = active.filter(s => s.unit === 'SMP').length;
      const countMA = active.filter(s => s.unit === 'MA').length;
      const countSMA = active.filter(s => s.unit === 'SMA').length;

      const bAll = document.getElementById('badgeCountALL');
      const bMTs = document.getElementById('badgeCountMTs');
      const bSMP = document.getElementById('badgeCountSMP');
      const bMA = document.getElementById('badgeCountMA');
      const bSMA = document.getElementById('badgeCountSMA');

      if (bAll) bAll.textContent = countAll;
      if (bMTs) bMTs.textContent = countMTs;
      if (bSMP) bSMP.textContent = countSMP;
      if (bMA) bMA.textContent = countMA;
      if (bSMA) bSMA.textContent = countSMA;
    }

    updateKelasMeetingSubTabs();
  }

  function updateKelasMeetingSubTabs() {
    const container = document.getElementById('kelasMeetingSubTabs');
    if (!container) return;

    // Tentukan daftar kelas turunan berdasarkan unit aktif:
    // MTs & SMP: Kelas 7, 8, 9
    // MA & SMA: Kelas 10, 11, 12
    // ALL: Semua Kelas 7-12
    let classList = [];
    let unitLabel = '';
    let themeColor = 'teal';

    if (currentUnitMeetingTab === 'MTs') {
      classList = [7, 8, 9];
      unitLabel = 'MTs';
      themeColor = 'emerald';
    } else if (currentUnitMeetingTab === 'SMP') {
      classList = [7, 8, 9];
      unitLabel = 'SMP';
      themeColor = 'blue';
    } else if (currentUnitMeetingTab === 'MA') {
      classList = [10, 11, 12];
      unitLabel = 'MA';
      themeColor = 'lime';
    } else if (currentUnitMeetingTab === 'SMA') {
      classList = [10, 11, 12];
      unitLabel = 'SMA';
      themeColor = 'amber';
    } else {
      classList = [7, 8, 9, 10, 11, 12];
      unitLabel = 'Semua Unit';
      themeColor = 'teal';
    }

    const activeSantri = santriDataList ? santriDataList.filter(s => s.status !== 'Boyong') : [];
    const unitSantri = currentUnitMeetingTab === 'ALL' 
      ? activeSantri 
      : activeSantri.filter(s => s.unit === currentUnitMeetingTab);
    
    const totalUnitCount = unitSantri.length;

    let html = `
      <div class="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold mr-1">
        <i data-lucide="corner-down-right" class="w-3.5 h-3.5 text-teal-600 dark:text-teal-400"></i>
        <span class="text-[11px] uppercase tracking-wider font-extrabold text-slate-700 dark:text-slate-300">Turunan Kelas:</span>
      </div>
    `;

    // Tombol "Semua Kelas"
    const isAllActive = currentKelasMeetingTab === 'ALL';
    let allBtnClass = '';
    if (isAllActive) {
      if (themeColor === 'emerald') allBtnClass = 'bg-emerald-600 text-white font-black shadow-xs';
      else if (themeColor === 'blue') allBtnClass = 'bg-blue-600 text-white font-black shadow-xs';
      else if (themeColor === 'lime') allBtnClass = 'bg-lime-600 text-white font-black shadow-xs';
      else if (themeColor === 'amber') allBtnClass = 'bg-amber-600 text-white font-black shadow-xs';
      else allBtnClass = 'bg-teal-600 text-white font-black shadow-xs';
    } else {
      allBtnClass = 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-700 font-bold border border-slate-200 dark:border-slate-700/60';
    }

    html += `
      <button 
        type="button" 
        onclick="selectKelasMeetingTab('ALL')" 
        class="px-2.5 py-1 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer ${allBtnClass}"
      >
        <span>Semua ${unitLabel !== 'Semua Unit' ? unitLabel : 'Kelas'}</span>
        <span class="px-1.5 py-0.2 rounded-full text-[10px] ${isAllActive ? 'bg-white/20 text-white font-black' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-black'}">${totalUnitCount}</span>
      </button>
    `;

    // Tombol Masing-masing Kelas Turunan
    classList.forEach(cls => {
      const clsCount = unitSantri.filter(s => Number(s.kelas) === Number(cls)).length;
      const isClsActive = String(currentKelasMeetingTab) === String(cls);

      let activeStyles = '';
      if (themeColor === 'emerald') {
        activeStyles = isClsActive 
          ? 'bg-emerald-600 text-white font-black shadow-xs' 
          : 'bg-emerald-50/70 hover:bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60 font-bold border border-emerald-200/60 dark:border-emerald-800/50';
      } else if (themeColor === 'blue') {
        activeStyles = isClsActive 
          ? 'bg-blue-600 text-white font-black shadow-xs' 
          : 'bg-blue-50/70 hover:bg-blue-100/90 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/60 font-bold border border-blue-200/60 dark:border-blue-800/50';
      } else if (themeColor === 'lime') {
        activeStyles = isClsActive 
          ? 'bg-lime-600 text-white font-black shadow-xs' 
          : 'bg-lime-50/70 hover:bg-lime-100/90 text-lime-900 dark:bg-lime-950/40 dark:text-lime-300 dark:hover:bg-lime-900/60 font-bold border border-lime-200/60 dark:border-lime-800/50';
      } else if (themeColor === 'amber') {
        activeStyles = isClsActive 
          ? 'bg-amber-600 text-white font-black shadow-xs' 
          : 'bg-amber-50/70 hover:bg-amber-100/90 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/60 font-bold border border-amber-200/60 dark:border-amber-800/50';
      } else {
        activeStyles = isClsActive 
          ? 'bg-teal-600 text-white font-black shadow-xs' 
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700 font-bold border border-slate-200 dark:border-slate-700';
      }

      const badgeStyles = isClsActive 
        ? 'bg-white/20 text-white font-black' 
        : 'bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-black';

      html += `
        <button 
          type="button" 
          onclick="selectKelasMeetingTab('${cls}')" 
          class="px-2.5 py-1 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${activeStyles}"
        >
          <span>Kelas ${cls}</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] ${badgeStyles}">${clsCount}</span>
        </button>
      `;
    });

    container.innerHTML = html;
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({ root: container });
    }
  }


  // Standar Tarif Syahriyah Bulanan Resmi YTPAI
  const TARIFF_CATALOG = {
    '7': { 'Mukim VIP': 301000, 'Mukim Reguler': 281000, 'Non Mukim': 73000 },
    '8': { 'Mukim VIP': 301000, 'Mukim Reguler': 281000, 'Non Mukim': 73000 },
    '9': { 'Mukim VIP': 297000, 'Mukim Reguler': 277000, 'Non Mukim': 69000 },
    '10': { 'Mukim VIP': 350000, 'Mukim Reguler': 330000, 'Non Mukim': 122000 },
    '11': { 'Mukim VIP': 350000, 'Mukim Reguler': 330000, 'Non Mukim': 122000 },
    '12': { 'Mukim VIP': 345000, 'Mukim Reguler': 325000, 'Non Mukim': 117000 }
  };

  // Helper Format Nama Bulan Bahasa Indonesia
  function formatPeriodMonthLabel(periodKey) {
    if (!periodKey) return '';
    const parts = periodKey.split('-');
    if (parts.length !== 2) return periodKey;
    const [mm, yyyy] = parts;
    const monthNames = {
      '01': 'Januari', '02': 'Februari', '03': 'Maret', '04': 'April',
      '05': 'Mei', '06': 'Juni', '07': 'Juli', '08': 'Agustus',
      '09': 'September', '10': 'Oktober', '11': 'November', '12': 'Desember'
    };
    return `${monthNames[mm] || mm} ${yyyy}`;
  }

  // --- 2. INITIALIZATION ---
  function initSantriModule() {
    loadSantriData();
    calculateAndRenderAll();
    setTimeout(() => {
      const panel = document.getElementById('panelRapatRekonsiliasi');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 250);
    updateSortButtonUI();
    initMatrixZoomControls();
  }

  function loadSantriData() {
    // 1. Muat Store Multi-Bulan (Monthly DB v2)
    try {
      const storedStore = localStorage.getItem(SANTRI_MONTHLY_STORE_KEY);
      if (storedStore) {
        monthlySantriStore = JSON.parse(storedStore);
      }
    } catch (e) {
      console.warn('Gagal memuat monthly store dari localStorage:', e);
    }

    // 2. Siapkan Data Master Historis Seluruh Periode (Mulai Awal Tahun s/d November)
    function mapRawSantri(rawList) {
      if (!rawList || !Array.isArray(rawList)) return [];
      return rawList.map(item => ({
        reg: String(item[0] || '').padStart(6, '0'),
        nama: String(item[1] || '').trim(),
        jk: String(item[2] || '').trim(),
        unit: String(item[3] || '').trim(),
        kelas: Number(item[4]) || 0,
        status: String(item[5] || '').trim(),
        bulanan: Number(item[6]) || 0,
        alamat: String(item[7] || '').trim()
      }));
    }

    const rawAwal = (typeof window.MASTER_SANTRI_AWAL_TAHUN_754 !== 'undefined' && Array.isArray(window.MASTER_SANTRI_AWAL_TAHUN_754))
      ? window.MASTER_SANTRI_AWAL_TAHUN_754
      : ((typeof window.MASTER_SANTRI_AWAL_TAHUN_757 !== 'undefined' && Array.isArray(window.MASTER_SANTRI_AWAL_TAHUN_757)) ? window.MASTER_SANTRI_AWAL_TAHUN_757 : []);
    const awalStudents = mapRawSantri(rawAwal);

    const rawJuli = (typeof window.MASTER_SANTRI_JULI_752 !== 'undefined' && Array.isArray(window.MASTER_SANTRI_JULI_752))
      ? window.MASTER_SANTRI_JULI_752
      : ((typeof window.MASTER_SANTRI_JULI_755 !== 'undefined' && Array.isArray(window.MASTER_SANTRI_JULI_755)) ? window.MASTER_SANTRI_JULI_755 : []);
    const juliStudents = mapRawSantri(rawJuli);

    const rawAgustus = (typeof window.MASTER_SANTRI_AGUSTUS_754 !== 'undefined' && Array.isArray(window.MASTER_SANTRI_AGUSTUS_754))
      ? window.MASTER_SANTRI_AGUSTUS_754
      : ((typeof window.MASTER_SANTRI_AGUSTUS_757 !== 'undefined' && Array.isArray(window.MASTER_SANTRI_AGUSTUS_757)) ? window.MASTER_SANTRI_AGUSTUS_757 : []);
    const agustusStudents = mapRawSantri(rawAgustus);

    const rawSeptember = (typeof window.MASTER_DEFAULT_SANTRI_SEPTEMBER_754 !== 'undefined' && Array.isArray(window.MASTER_DEFAULT_SANTRI_SEPTEMBER_754))
      ? window.MASTER_DEFAULT_SANTRI_SEPTEMBER_754 : [];
    const septemberStudents = mapRawSantri(rawSeptember);

    let defaultStudents = [];
    const sourceMaster = (typeof window.MASTER_DEFAULT_SANTRI_746 !== 'undefined' && Array.isArray(window.MASTER_DEFAULT_SANTRI_746))
      ? window.MASTER_DEFAULT_SANTRI_746
      : ((typeof window.MASTER_DEFAULT_SANTRI_749 !== 'undefined' && Array.isArray(window.MASTER_DEFAULT_SANTRI_749)) ? window.MASTER_DEFAULT_SANTRI_749 : []);
    if (sourceMaster.length > 0) {
      defaultStudents = mapRawSantri(sourceMaster);
    }

    // 2B. KALIBRASI DATA HISTORIS RESMI (Mondok vs Bajak): Mencegah lonjakan semu / glitch
    const officialStatusMap = new Map();
    septemberStudents.concat(defaultStudents).forEach(s => {
      if (s.reg && String(s.reg).trim()) officialStatusMap.set(String(s.reg).trim(), s.status);
      if (s.nama && String(s.nama).trim()) officialStatusMap.set(String(s.nama).trim().toLowerCase(), s.status);
    });

    function calibrateHistoricalList(list) {
      if (!list || !Array.isArray(list)) return;
      list.forEach(s => {
        const regKey = String(s.reg || '').trim();
        const nameKey = String(s.nama || '').trim().toLowerCase();
        let st = null;
        if (regKey && officialStatusMap.has(regKey)) st = officialStatusMap.get(regKey);
        else if (nameKey && officialStatusMap.has(nameKey)) st = officialStatusMap.get(nameKey);
        if (st && st.includes('Non Mukim')) {
          s.status = 'Non Mukim';
        }
      });
    }

    calibrateHistoricalList(awalStudents);
    calibrateHistoricalList(juliStudents);
    calibrateHistoricalList(agustusStudents);

    // Auto-heal cache lama di browser jika Non Mukim di Awal/Juli/Agustus masih belum terkalibrasi (<50)
    if (monthlySantriStore && monthlySantriStore['00-2026'] && monthlySantriStore['00-2026'].students) {
      const nonMukimCount = monthlySantriStore['00-2026'].students.filter(s => s.status === 'Non Mukim').length;
      if (nonMukimCount < 50) {
        calibrateHistoricalList(monthlySantriStore['00-2026'].students);
        if (monthlySantriStore['07-2026']) calibrateHistoricalList(monthlySantriStore['07-2026'].students);
        if (monthlySantriStore['08-2026']) calibrateHistoricalList(monthlySantriStore['08-2026'].students);
        saveMonthlySantriStore();
      }
    }

    if (!monthlySantriStore || Object.keys(monthlySantriStore).length === 0) {
      monthlySantriStore = {};

      // 1. Awal Tahun Ajaran 2026/2027 (754 Santri Real)
      if (awalStudents.length > 0) {
        monthlySantriStore['00-2026'] = {
          label: 'Awal Tahun 2026',
          status: 'LOCKED',
          isPedoman: false,
          lockedAt: '2026-07-01T00:00:00.000Z',
          students: JSON.parse(JSON.stringify(awalStudents))
        };
      }

      // 2. Bulan Juli 2026 (752 Santri Real)
      if (juliStudents.length > 0) {
        monthlySantriStore['07-2026'] = {
          label: 'Juli 2026',
          status: 'LOCKED',
          isPedoman: false,
          lockedAt: '2026-07-10T00:00:00.000Z',
          students: JSON.parse(JSON.stringify(juliStudents))
        };
      }

      // 3. Bulan Agustus 2026 (754 Santri Real)
      if (agustusStudents.length > 0) {
        monthlySantriStore['08-2026'] = {
          label: 'Agustus 2026',
          status: 'LOCKED',
          isPedoman: false,
          lockedAt: '2026-08-10T00:00:00.000Z',
          students: JSON.parse(JSON.stringify(agustusStudents))
        };
      }

      // 4. Bulan September 2026 (754 Siswa Real)
      if (septemberStudents.length > 0) {
        monthlySantriStore['09-2026'] = {
          label: 'September 2026',
          status: 'LOCKED',
          isPedoman: false,
          lockedAt: '2026-09-10T00:00:00.000Z',
          students: JSON.parse(JSON.stringify(septemberStudents))
        };
      }
      
      // 5. Bulan Oktober 2026 sebagai Master Pedoman Resmi (746 Siswa Fiks)
      monthlySantriStore['10-2026'] = {
        label: 'Oktober 2026',
        status: 'LOCKED',
        isPedoman: true,
        lockedAt: '2026-10-10T00:00:00.000Z',
        students: JSON.parse(JSON.stringify(defaultStudents))
      };

      // 6. Bulan November 2026 sebagai Draf Rapat Berjalan (Menyalin santri aktif Oktober)
      monthlySantriStore['11-2026'] = {
        label: 'November 2026',
        status: 'DRAFT',
        isPedoman: false,
        lockedAt: null,
        students: JSON.parse(JSON.stringify(defaultStudents.filter(s => s.status !== 'Boyong')))
      };

      saveMonthlySantriStore();
    } else {
      let changed = false;
      // Pastikan seluruh 6 periode historis terisi lengkap jika belum ada
      if (!monthlySantriStore['00-2026'] && awalStudents.length > 0) {
        monthlySantriStore['00-2026'] = {
          label: 'Awal Tahun 2026',
          status: 'LOCKED',
          isPedoman: false,
          lockedAt: '2026-07-01T00:00:00.000Z',
          students: JSON.parse(JSON.stringify(awalStudents))
        };
        changed = true;
      }
      if (!monthlySantriStore['07-2026'] && juliStudents.length > 0) {
        monthlySantriStore['07-2026'] = {
          label: 'Juli 2026',
          status: 'LOCKED',
          isPedoman: false,
          lockedAt: '2026-07-10T00:00:00.000Z',
          students: JSON.parse(JSON.stringify(juliStudents))
        };
        changed = true;
      }
      if (!monthlySantriStore['08-2026'] && agustusStudents.length > 0) {
        monthlySantriStore['08-2026'] = {
          label: 'Agustus 2026',
          status: 'LOCKED',
          isPedoman: false,
          lockedAt: '2026-08-10T00:00:00.000Z',
          students: JSON.parse(JSON.stringify(agustusStudents))
        };
        changed = true;
      }
      if (!monthlySantriStore['09-2026'] && septemberStudents.length > 0) {
        monthlySantriStore['09-2026'] = {
          label: 'September 2026',
          status: 'LOCKED',
          isPedoman: false,
          lockedAt: '2026-09-10T00:00:00.000Z',
          students: JSON.parse(JSON.stringify(septemberStudents))
        };
        changed = true;
      }
      if (!monthlySantriStore['10-2026'] && defaultStudents.length > 0) {
        monthlySantriStore['10-2026'] = {
          label: 'Oktober 2026',
          status: 'LOCKED',
          isPedoman: true,
          lockedAt: '2026-10-10T00:00:00.000Z',
          students: JSON.parse(JSON.stringify(defaultStudents))
        };
        changed = true;
      }
      if (!monthlySantriStore['11-2026'] && defaultStudents.length > 0) {
        monthlySantriStore['11-2026'] = {
          label: 'November 2026',
          status: 'DRAFT',
          isPedoman: false,
          lockedAt: null,
          students: JSON.parse(JSON.stringify(defaultStudents.filter(s => s.status !== 'Boyong')))
        };
        changed = true;
      }
      if (changed) saveMonthlySantriStore();
    }

    // Tentukan periode aktif (Default Oktober 2026, dengan pembanding September 2026)
    if (!monthlySantriStore[currentPeriodKey]) {
      currentPeriodKey = '10-2026';
    }
    comparisonPeriodKey = (currentPeriodKey === '10-2026' && monthlySantriStore['09-2026']) 
      ? '09-2026' 
      : ((currentPeriodKey !== '10-2026' && monthlySantriStore['10-2026']) ? '10-2026' : currentPeriodKey);

    santriDataList = monthlySantriStore[currentPeriodKey].students;
    saveSantriDataList();

    // 3. Muat Log Mutasi
    try {
      const storedMut = localStorage.getItem(SANTRI_MUTATIONS_STORAGE_KEY);
      if (storedMut) {
        santriMutations = JSON.parse(storedMut);
      }
    } catch (e) {
      console.warn('Gagal memuat mutasi santri:', e);
    }
    if (Array.isArray(santriMutations)) {
      santriMutations = santriMutations.filter(m => m.id && !m.id.startsWith('mut_100') && !m.id.startsWith('mut_090'));
    } else {
      santriMutations = [];
    }
    saveSantriMutations();
  }

  function saveMonthlySantriStore() {
    try {
      localStorage.setItem(SANTRI_MONTHLY_STORE_KEY, JSON.stringify(monthlySantriStore));
    } catch (e) {
      console.warn('Gagal menyimpan monthly store santri ke localStorage:', e);
    }
  }

  function saveSantriDataList() {
    if (monthlySantriStore[currentPeriodKey]) {
      monthlySantriStore[currentPeriodKey].students = santriDataList;
      saveMonthlySantriStore();
    }
    try {
      localStorage.setItem(SANTRI_STORAGE_KEY, JSON.stringify(santriDataList));
    } catch (e) {
      console.warn('Gagal menyimpan santri ke localStorage:', e);
    }
  }

  function saveSantriMutations() {
    try {
      localStorage.setItem(SANTRI_MUTATIONS_STORAGE_KEY, JSON.stringify(santriMutations));
    } catch (e) {
      console.warn('Gagal menyimpan mutasi santri ke localStorage:', e);
    }
  }

  function resetSantriToMasterDefault() {
    if (!confirm('Apakah Anda yakin ingin memuat ulang 749 data santri master resmi Bulan Oktober 2026 (Pedoman)? Data riil pedoman resmi akan dipulihkan secara bersih.')) {
      return;
    }
    let defaultStudents = [];
    if (typeof window.MASTER_DEFAULT_SANTRI_749 !== 'undefined' && Array.isArray(window.MASTER_DEFAULT_SANTRI_749)) {
      defaultStudents = window.MASTER_DEFAULT_SANTRI_749.map(item => ({
        reg: String(item[0]).padStart(6, '0'),
        nama: String(item[1]),
        jk: String(item[2]),
        unit: String(item[3]),
        kelas: Number(item[4]),
        status: String(item[5]),
        bulanan: Number(item[6]),
        alamat: String(item[7] || '')
      }));
    } else if (typeof window.MASTER_DEFAULT_SANTRI_746 !== 'undefined' && Array.isArray(window.MASTER_DEFAULT_SANTRI_746)) {
      defaultStudents = window.MASTER_DEFAULT_SANTRI_746.map(item => ({
        reg: String(item[0]).padStart(6, '0'),
        nama: String(item[1]),
        jk: String(item[2]),
        unit: String(item[3]),
        kelas: Number(item[4]),
        status: String(item[5]),
        bulanan: Number(item[6]),
        alamat: String(item[7] || '')
      }));
    }
    if (monthlySantriStore['10-2026']) {
      monthlySantriStore['10-2026'].students = JSON.parse(JSON.stringify(defaultStudents));
      monthlySantriStore['10-2026'].status = 'LOCKED';
      saveMonthlySantriStore();
    }
    currentPeriodKey = '10-2026';
    santriDataList = monthlySantriStore['10-2026'].students;
    saveSantriDataList();
    calculateAndRenderAll();
    showToast('Pedoman Resmi Dipulihkan', '749 Santri real resmi Oktober 2026 berhasil dipulihkan.');
  }




  // --- 3. REKAPITULASI & KALKULASI METRICS LENGKAP DENGAN PROSENTASE ---
  function calculateSantriMetrics() {
    const activeStudents = santriDataList.filter(s => s.status !== 'Boyong');
    const total = activeStudents.length;

    let mukim = 0, nonMukim = 0;
    let mukimPa = 0, mukimPi = 0;
    let nonMukimPa = 0, nonMukimPi = 0;

    const units = {
      MTs: { name: 'MTS', color: '#a6e3a1', total: 0, mukim: 0, nonMukim: 0, gradesList: [7, 8, 9], grades: {} },
      SMP: { name: 'SMP', color: '#89b4fa', total: 0, mukim: 0, nonMukim: 0, gradesList: [7, 8, 9], grades: {} },
      MA:  { name: 'MA',  color: '#a6d189', total: 0, mukim: 0, nonMukim: 0, gradesList: [10, 11, 12], grades: {} },
      SMA: { name: 'SMA', color: '#fab387', total: 0, mukim: 0, nonMukim: 0, gradesList: [10, 11, 12], grades: {} }
    };

    // Inisialisasi struktur kelas
    Object.keys(units).forEach(uKey => {
      units[uKey].gradesList.forEach(g => {
        units[uKey].grades[g] = {
          mukimPa: 0,
          mukimPi: 0,
          vip: 0,
          nonPa: 0,
          nonPi: 0,
          total: 0,
          mukim: 0,
          non: 0,
          mukimPct: '0,0%',
          nonPct: '0,0%'
        };
      });
    });

    activeStudents.forEach(s => {
      const isVip = s.status === 'Mukim VIP';
      const isMukimReg = s.status === 'Mukim Reguler';
      const isMukim = isVip || isMukimReg;
      const isPa = s.jk === 'PA' || s.jk === 'L';

      if (isMukim) {
        mukim++;
        if (isPa) mukimPa++; else mukimPi++;
      } else {
        nonMukim++;
        if (isPa) nonMukimPa++; else nonMukimPi++;
      }

      const u = units[s.unit];
      if (u) {
        u.total++;
        if (isMukim) u.mukim++; else u.nonMukim++;

        const g = u.grades[s.kelas];
        if (g) {
          if (isVip) {
            g.vip++;
            g.mukim++;
          } else if (isMukimReg) {
            g.mukim++;
            if (isPa) g.mukimPa++; else g.mukimPi++;
          } else {
            g.non++;
            if (isPa) g.nonPa++; else g.nonPi++;
          }
          g.total++;
        }
      }
    });

    // Kalkulasi persentase dengan 1 desimal
    Object.keys(units).forEach(uKey => {
      const u = units[uKey];
      u.mukimPct = u.total > 0 ? ((u.mukim / u.total) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%';
      u.nonMukimPct = u.total > 0 ? ((u.nonMukim / u.total) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%';
      u.pctTotal = total > 0 ? ((u.total / total) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%';

      u.gradesList.forEach(gKey => {
        const g = u.grades[gKey];
        g.mukimPct = g.total > 0 ? ((g.mukim / g.total) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%';
        g.nonPct = g.total > 0 ? ((g.non / g.total) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%';
      });
    });

    return {
      total,
      mukim,
      nonMukim,
      mukimPct: total > 0 ? ((mukim / total) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%',
      nonMukimPct: total > 0 ? ((nonMukim / total) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%',
      mukimPa,
      mukimPi,
      mukimPaPct: mukim > 0 ? ((mukimPa / mukim) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%',
      mukimPiPct: mukim > 0 ? ((mukimPi / mukim) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%',
      nonMukimPa,
      nonMukimPi,
      nonMukimPaPct: nonMukim > 0 ? ((nonMukimPa / nonMukim) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%',
      nonMukimPiPct: nonMukim > 0 ? ((nonMukimPi / nonMukim) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%',
      totalPa: mukimPa + nonMukimPa,
      totalPi: mukimPi + nonMukimPi,
      totalPaPct: total > 0 ? (((mukimPa + nonMukimPa) / total) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%',
      totalPiPct: total > 0 ? (((mukimPi + nonMukimPi) / total) * 100).toFixed(1).replace('.', ',') + '%' : '0,0%',
      units
    };
  }

  // --- 4. RENDER KE TAMPILAN DOM & MATRIKS TABEL RESMI ---
  function calculateAndRenderAll() {
    updatePeriodHeaderUI();
    const m = calculateSantriMetrics();

    // 1. Header Badges
    const elBadge = document.getElementById('santriTotalBadge');
    if (elBadge) elBadge.textContent = `${m.total} Santri`;

    // 2. Render 4 Unit Matriks Tabel Resmi
    renderMatrixUnitDOM('Mts', m.units.MTs);
    renderMatrixUnitDOM('Smp', m.units.SMP);
    renderMatrixUnitDOM('Ma',  m.units.MA);
    renderMatrixUnitDOM('Sma', m.units.SMA);

    // 3. Render Grand Total Box & Demografi Keseluruhan
    const elGrandTotal = document.getElementById('grandMatrixTotal');
    if (elGrandTotal) elGrandTotal.textContent = m.total;

    const elGmMukim = document.getElementById('grandMatrixMukim');
    const elGmMukimPct = document.getElementById('grandMatrixMukimPct');
    if (elGmMukim) elGmMukim.textContent = m.mukim;
    if (elGmMukimPct) elGmMukimPct.textContent = `(${m.mukimPct})`;

    const elGmNon = document.getElementById('grandMatrixNon');
    const elGmNonPct = document.getElementById('grandMatrixNonPct');
    if (elGmNon) elGmNon.textContent = m.nonMukim;
    if (elGmNonPct) elGmNonPct.textContent = `(${m.nonMukimPct})`;

    const elGmMukimPa = document.getElementById('grandMatrixMukimPa');
    const elGmMukimPaPct = document.getElementById('grandMatrixMukimPaPct');
    if (elGmMukimPa) elGmMukimPa.textContent = m.mukimPa;
    if (elGmMukimPaPct) elGmMukimPaPct.textContent = m.mukimPaPct;

    const elGmMukimPi = document.getElementById('grandMatrixMukimPi');
    const elGmMukimPiPct = document.getElementById('grandMatrixMukimPiPct');
    if (elGmMukimPi) elGmMukimPi.textContent = m.mukimPi;
    if (elGmMukimPiPct) elGmMukimPiPct.textContent = m.mukimPiPct;

    const elGmNonPa = document.getElementById('grandMatrixNonPa');
    const elGmNonPaPct = document.getElementById('grandMatrixNonPaPct');
    if (elGmNonPa) elGmNonPa.textContent = m.nonMukimPa;
    if (elGmNonPaPct) elGmNonPaPct.textContent = m.nonMukimPaPct;

    const elGmNonPi = document.getElementById('grandMatrixNonPi');
    const elGmNonPiPct = document.getElementById('grandMatrixNonPiPct');
    if (elGmNonPi) elGmNonPi.textContent = m.nonMukimPi;
    if (elGmNonPiPct) elGmNonPiPct.textContent = m.nonMukimPiPct;

    // Demografi Gender Yayasan
    const elTotalPa = document.getElementById('matrixTotalPa');
    const elTotalPaPct = document.getElementById('matrixTotalPaPct');
    if (elTotalPa) elTotalPa.textContent = m.totalPa;
    if (elTotalPaPct) elTotalPaPct.textContent = `(${m.totalPaPct})`;

    const elTotalPi = document.getElementById('matrixTotalPi');
    const elTotalPiPct = document.getElementById('matrixTotalPiPct');
    if (elTotalPi) elTotalPi.textContent = m.totalPi;
    if (elTotalPiPct) elTotalPiPct.textContent = `(${m.totalPiPct})`;

    const elRasioMukim = document.getElementById('matrixRasioMukim');
    const elRasioMukimPct = document.getElementById('matrixRasioMukimPct');
    if (elRasioMukim) elRasioMukim.textContent = m.mukim;
    if (elRasioMukimPct) elRasioMukimPct.textContent = `(${m.mukimPct})`;

    const elRasioNon = document.getElementById('matrixRasioNon');
    const elRasioNonPct = document.getElementById('matrixRasioNonPct');
    if (elRasioNon) elRasioNon.textContent = m.nonMukim;
    if (elRasioNonPct) elRasioNonPct.textContent = `(${m.nonMukimPct})`;

    // 4. Render Santri Table
    renderSantriTable();

    // 5. Render Trend Bulanan & Mutasi (MoM)
    renderSantriTrendAnalytics();
    renderReconciliationUI();

    // 6. Sinkronisasi Skala & Dimensi Viewport Matriks
    if (typeof applyMatrixScale === 'function') {
      requestAnimationFrame(() => {
        applyMatrixScale(currentMatrixScale, isMatrixFitMode);
      });
    }
  }

  function renderMatrixUnitDOM(prefix, uData) {
    const rowsEl = document.getElementById(`matrixRows${prefix}`);
    const summaryEl = document.getElementById(`matrixSummary${prefix}`);
    const bigTotalEl = document.getElementById(`bigTotal${prefix}`);
    const bigPctEl = document.getElementById(`bigPct${prefix}`);

    if (bigTotalEl) bigTotalEl.textContent = uData.total;
    if (bigPctEl) bigPctEl.textContent = `${uData.pctTotal} Total`;

    if (rowsEl) {
      let rowsHtml = '';
      uData.gradesList.forEach(gKey => {
        const g = uData.grades[gKey];
        rowsHtml += `
          <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
            <td class="py-2 px-2 border-r border-slate-200 dark:border-slate-700 font-black text-sm text-slate-900 dark:text-white">${gKey}</td>
            <td class="py-2 px-2 border-r border-slate-200 dark:border-slate-700 font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">${g.mukimPa}</td>
            <td class="py-2 px-2 border-r border-slate-200 dark:border-slate-700 font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">${g.mukimPi}</td>
            <td class="py-2 px-2 border-r border-slate-200 dark:border-slate-700 font-black text-sm sm:text-base ${g.vip > 0 ? 'text-amber-600 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-950/30' : 'text-slate-800 dark:text-slate-100'}">${g.vip}</td>
            <td class="py-2 px-2 border-r border-slate-200 dark:border-slate-700 font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">${g.nonPa}</td>
            <td class="py-2 px-2 font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">${g.nonPi}</td>
          </tr>
        `;
      });
      rowsEl.innerHTML = rowsHtml;
    }

    if (summaryEl) {
      let summaryHtml = '';
      const gradesCount = uData.gradesList.length;
      uData.gradesList.forEach((gKey, idx) => {
        const g = uData.grades[gKey];
        const rowspanAttr = idx === 0 ? `rowspan="${gradesCount + 1}"` : '';
        const bigTotalCell = idx === 0 ? `
          <td ${rowspanAttr} class="py-3 px-2 text-center align-middle bg-slate-50/50 dark:bg-slate-900/30">
            <span id="bigTotal${prefix}" class="block text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">${uData.total}</span>
            <span id="bigPct${prefix}" class="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-xs mt-1.5 shadow-2xs">${uData.pctTotal} Total</span>
          </td>
        ` : '';

        summaryHtml += `
          <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
            <td class="py-2 px-2 border-r border-slate-200 dark:border-slate-700 font-black text-sm sm:text-base text-slate-900 dark:text-white">${g.total}</td>
            <td class="py-2 px-2 border-r border-slate-200 dark:border-slate-700 font-bold text-sm sm:text-base text-teal-800 dark:text-teal-200">
              <span>${g.mukim}</span>
              <span class="text-[11px] text-teal-600 dark:text-teal-400 font-bold ml-1">(${g.mukimPct})</span>
            </td>
            <td class="py-2 px-2 border-r border-slate-200 dark:border-slate-700 font-bold text-sm sm:text-base text-slate-700 dark:text-slate-300">
              <span>${g.non}</span>
              <span class="text-[11px] text-slate-500 font-bold ml-1">(${g.nonPct})</span>
            </td>
            ${bigTotalCell}
          </tr>
        `;
      });

      // Footer Row
      summaryHtml += `
        <tr class="bg-slate-100/90 dark:bg-slate-800 font-black text-slate-900 dark:text-white border-t border-slate-300 dark:border-slate-700">
          <td class="py-1.5 px-2 border-r border-slate-200 dark:border-slate-700 text-xs uppercase">JUMLAH PER KATEGORI</td>
          <td class="py-1.5 px-2 border-r border-slate-200 dark:border-slate-700 text-teal-700 dark:text-teal-300 text-sm sm:text-base">${uData.mukim} <span class="text-xs font-bold">(${uData.mukimPct})</span></td>
          <td class="py-1.5 px-2 border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm sm:text-base">${uData.nonMukim} <span class="text-xs font-bold">(${uData.nonMukimPct})</span></td>
        </tr>
      `;
      summaryEl.innerHTML = summaryHtml;
    }
  }

  // --- 5. TABEL SANTRI INTERAKTIF DENGAN URUTAN UNIT & PEMISAH KELAS (RAPAT BENDAHARA) ---
  function getFilteredSantri() {
    const searchVal = (document.getElementById('santriSearchInput')?.value || '').toLowerCase().trim();
    const unitVal = document.getElementById('santriFilterUnit')?.value || currentUnitMeetingTab || 'ALL';
    const kelasVal = currentKelasMeetingTab || document.getElementById('santriFilterKelas')?.value || 'ALL';
    const statusVal = document.getElementById('santriFilterStatus')?.value || 'ALL';

    const rawFiltered = santriDataList.filter(s => {
      if (unitVal !== 'ALL' && s.unit !== unitVal) return false;
      if (kelasVal !== 'ALL' && String(s.kelas) !== String(kelasVal)) return false;
      if (statusVal !== 'ALL') {
        if (statusVal === 'Boyong' && s.status !== 'Boyong') return false;
        if (statusVal !== 'Boyong' && s.status !== statusVal) return false;
      }
      if (searchVal) {
        const matchNama = (s.nama || '').toLowerCase().includes(searchVal);
        const matchReg = (s.reg || '').toLowerCase().includes(searchVal);
        const matchKelas = String(s.kelas || '').includes(searchVal);
        const matchAlamat = (s.alamat || '').toLowerCase().includes(searchVal);
        if (!matchNama && !matchReg && !matchKelas && !matchAlamat) return false;
      }
      return true;
    });

    // Otomatis diurutkan berjenjang per Unit (MTs -> SMP -> MA -> SMA) -> Kelas -> Status -> Nama A-Z
    return sortSantriHierarchy(rawFiltered);
  }


  function renderSantriTable() {
    const tbody = document.getElementById('santriTableBody');
    if (!tbody) return;

    updateUnitMeetingTabButtons();

    const filtered = getFilteredSantri();
    const totalFiltered = filtered.length;

    const pageSize = santriPageSize === 'ALL' ? (totalFiltered || 1) : (Number(santriPageSize) || 50);
    const totalPages = Math.ceil(totalFiltered / pageSize) || 1;
    if (santriCurrentPage > totalPages) santriCurrentPage = totalPages;
    if (santriCurrentPage < 1) santriCurrentPage = 1;

    const startIdx = (santriCurrentPage - 1) * pageSize;
    const pageItems = filtered.slice(startIdx, startIdx + pageSize);

    if (pageItems.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-8 text-slate-400">
            Tidak ada data santri yang cocok dengan filter pencarian.
          </td>
        </tr>
      `;
    } else {
      let rowsHtml = '';
      let lastGroupKey = null;

      pageItems.forEach((s, idx) => {
        const rowNum = startIdx + idx + 1;
        const isBoyong = s.status === 'Boyong';
        const bulananFmt = Number(s.bulanan || 0).toLocaleString('id-ID');

        // Subheader Pemisah Kelas untuk Memudahkan Rapat Pencocokan dengan Bendahara Unit
        const currentGroupKey = `${s.unit} - Kelas ${s.kelas}`;
        if (currentGroupKey !== lastGroupKey) {
          lastGroupKey = currentGroupKey;
          const classStudents = filtered.filter(st => st.unit === s.unit && st.kelas === s.kelas);
          const classTotal = classStudents.length;
          const classMukim = classStudents.filter(st => st.status && st.status.includes('Mukim')).length;
          const classNon = classStudents.filter(st => st.status === 'Non Mukim').length;
          const classBoyong = classStudents.filter(st => st.status === 'Boyong').length;

          let unitTheme = 'border-teal-500 bg-teal-50/70 dark:bg-slate-800/90 text-teal-900 dark:text-teal-200';
          let unitBadge = 'bg-teal-600 text-white';
          if (s.unit === 'MTs') {
            unitTheme = 'border-emerald-500/60 bg-emerald-50/80 dark:bg-slate-800/90 text-emerald-950 dark:text-emerald-200';
            unitBadge = 'bg-emerald-600 text-white';
          } else if (s.unit === 'SMP') {
            unitTheme = 'border-blue-500/60 bg-blue-50/80 dark:bg-slate-800/90 text-blue-950 dark:text-blue-200';
            unitBadge = 'bg-blue-600 text-white';
          } else if (s.unit === 'MA') {
            unitTheme = 'border-lime-500/60 bg-lime-50/80 dark:bg-slate-800/90 text-lime-950 dark:text-lime-200';
            unitBadge = 'bg-lime-600 text-white';
          } else if (s.unit === 'SMA') {
            unitTheme = 'border-amber-500/60 bg-amber-50/80 dark:bg-slate-800/90 text-amber-950 dark:text-amber-200';
            unitBadge = 'bg-amber-600 text-white';
          }

          rowsHtml += `
            <tr class="${unitTheme} border-y-2 font-black transition-colors">
              <td colspan="8" class="py-2.5 px-3">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-[11px] font-black ${unitBadge}">${s.unit}</span>
                    <span class="text-xs sm:text-sm font-black tracking-wide uppercase">KELAS ${s.kelas}</span>
                    <span class="text-[11px] font-normal text-slate-500 dark:text-slate-400">• Siap Dicocokkan</span>
                  </div>
                  <div class="flex items-center gap-2 text-[11px]">
                    <span class="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-black text-slate-800 dark:text-slate-100 shadow-2xs">
                      Total: <span class="text-teal-700 dark:text-teal-400 font-black">${classTotal}</span> Santri
                    </span>
                    <span class="font-bold text-teal-700 dark:text-teal-300">${classMukim} Mukim</span>
                    <span class="text-slate-400">•</span>
                    <span class="font-bold text-slate-600 dark:text-slate-300">${classNon} Non-Mukim</span>
                    ${classBoyong > 0 ? `<span class="text-slate-400">•</span><span class="font-bold text-rose-600 dark:text-rose-400">${classBoyong} Boyong</span>` : ''}
                  </div>
                </div>
              </td>
            </tr>
          `;
        }

        let statusBadge = '';
        if (s.status === 'Mukim VIP') {
          statusBadge = '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300">VIP</span>';
        } else if (s.status === 'Mukim Reguler') {
          statusBadge = '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-300">Mukim Reguler</span>';
        } else if (s.status === 'Non Mukim') {
          statusBadge = '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300">Non Mukim</span>';
        } else {
          statusBadge = '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300">Boyong</span>';
        }

        const isPa = s.jk === 'PA' || s.jk === 'L';
        const currentJkText = isPa ? 'L' : 'P';
        const currentJkFull = isPa ? 'Laki-laki (Putra)' : 'Perempuan (Putri)';

        const jkBadge = `
          <button 
            type="button" 
            onclick="openSantriGenderModal('${s.reg}')"
            title="Klik untuk memilih Gender Santri (${currentJkFull})"
            class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] text-[10.5px] font-bold cursor-pointer transition-all active:scale-95 hover:shadow-2xs border ${isPa ? 'bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-700' : 'bg-rose-100 hover:bg-rose-200 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-700'}"
          >
            <span>${isPa ? 'L (Putra)' : 'P (Putri)'}</span>
            <i data-lucide="chevron-down" class="w-2.5 h-2.5 opacity-60"></i>
          </button>
        `;

        let statusBtnStyle = 'bg-teal-100 hover:bg-teal-200 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-300';
        if (s.status === 'Mukim VIP') {
          statusBtnStyle = 'bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300';
        } else if (s.status === 'Non Mukim') {
          statusBtnStyle = 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
        } else if (s.status === 'Boyong') {
          statusBtnStyle = 'bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300';
        }

        const statusDisplay = `
          <button 
            type="button" 
            onclick="openSantriStatusModal('${s.reg}')"
            title="Klik untuk memilih Status Tempat Tinggal (${s.status})"
            class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] text-[10.5px] font-bold cursor-pointer transition-all active:scale-95 hover:shadow-2xs border ${statusBtnStyle}"
          >
            <span>${s.status}</span>
            <i data-lucide="chevron-down" class="w-2.5 h-2.5 opacity-60"></i>
          </button>
        `;

        const regFmt = String(s.reg).padStart(6, '0');

        rowsHtml += `
          <tr class="${isBoyong ? 'opacity-40 bg-rose-50/20' : 'hover:bg-slate-50 dark:hover:bg-white/[0.02]'} transition-colors">
            <td class="py-2.5 px-3 text-center text-slate-400">${rowNum}</td>
            <td class="py-2.5 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">${regFmt}</td>
            <td class="py-2.5 px-3">
              <div class="font-bold text-slate-900 dark:text-white">${s.nama}</div>
              <div class="text-[10px] text-slate-400 truncate max-w-[200px]">${s.alamat || '-'}</div>
            </td>
            <td class="py-2.5 px-3 text-center">${jkBadge}</td>
            <td class="py-2.5 px-3">
              <span class="font-bold text-slate-800 dark:text-slate-200">${s.unit}</span>
              <span class="text-slate-400 ml-1">Kls ${s.kelas}</span>
            </td>
            <td class="py-2.5 px-3">
              ${statusDisplay}
            </td>
            <td class="py-2.5 px-3 text-right font-mono font-bold text-teal-700 dark:text-teal-300">
              Rp ${bulananFmt}
            </td>
            <td class="py-2.5 px-3 text-center">
              <div class="flex items-center justify-center gap-1">
                <button 
                  type="button" 
                  onclick="openEditSantriModal('${s.reg}')"
                  class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 transition-colors"
                  title="Edit data santri"
                >
                  Edit
                </button>
                <button 
                  type="button" 
                  onclick="toggleSantriBoyong('${s.reg}')"
                  class="px-2 py-1 rounded-lg ${isBoyong ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60' : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60'} text-[11px] font-bold transition-colors"
                  title="${isBoyong ? 'Aktifkan kembali' : 'Tandai Boyong/Keluar'}"
                >
                  ${isBoyong ? 'Aktifkan' : 'Boyong'}
                </button>
              </div>
            </td>
          </tr>
        `;
      });
      tbody.innerHTML = rowsHtml;
    }

    // Update Pagination Footer
    const infoEl = document.getElementById('santriTablePaginationInfo');
    if (infoEl) {
      const endIdx = santriPageSize === 'ALL' ? totalFiltered : Math.min(startIdx + pageSize, totalFiltered);
      infoEl.textContent = `Menampilkan ${totalFiltered > 0 ? startIdx + 1 : 0}-${endIdx} dari ${totalFiltered} santri terfilter (${santriDataList.length} total) • Urut per Unit & Kelas`;
    }

    renderPaginationButtons(totalPages);
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  function renderPaginationButtons(totalPages) {
    const container = document.getElementById('santriPaginationButtons');
    if (!container) return;

    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let btns = '';
    btns += `<button onclick="goToSantriPage(${santriCurrentPage - 1})" ${santriCurrentPage === 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="hover:bg-slate-200 dark:hover:bg-slate-700"'} class="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold">&laquo;</button>`;
    
    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || (p >= santriCurrentPage - 1 && p <= santriCurrentPage + 1)) {
        const isActive = p === santriCurrentPage;
        btns += `
          <button 
            onclick="goToSantriPage(${p})" 
            class="px-2.5 py-1 rounded-lg text-xs font-bold ${isActive ? 'bg-teal-600 text-white shadow-xs' : 'border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}"
          >${p}</button>
        `;
      } else if (p === santriCurrentPage - 2 || p === santriCurrentPage + 2) {
        btns += `<span class="px-1 text-slate-400">...</span>`;
      }
    }

    btns += `<button onclick="goToSantriPage(${santriCurrentPage + 1})" ${santriCurrentPage === totalPages ? 'disabled class="opacity-40 cursor-not-allowed"' : 'class="hover:bg-slate-200 dark:hover:bg-slate-700"'} class="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold">&raquo;</button>`;
    container.innerHTML = btns;
  }

  function goToSantriPage(page) {
    santriCurrentPage = page;
    renderSantriTable();
  }

  // --- 5B. ANALISIS TREN (MoM) & MUTASI SANTRI ENGINE ---
  function recordSantriMutation(type, studentData, note, prevStatus) {
    const periodSelect = document.getElementById('santriPeriodeSelect');
    const currentPeriod = periodSelect ? periodSelect.value : '10-2026';
    const nowStr = new Date().toISOString().slice(0, 10);

    const newMut = {
      id: 'mut_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      date: nowStr,
      period: currentPeriod,
      type: type, // 'MASUK', 'BOYONG', 'PINDAH_STATUS'
      reg: String(studentData.reg || ''),
      nama: String(studentData.nama || ''),
      unit: String(studentData.unit || ''),
      kelas: Number(studentData.kelas || 7),
      status: String(studentData.status || ''),
      prevStatus: prevStatus ? String(prevStatus) : '',
      note: note || ''
    };

    santriMutations.unshift(newMut);
    saveSantriMutations();
  }

  // --- 5B. ENGINE REKONSILIASI RAPAT BULANAN & KOMPARASI ANTAR-BULAN (MoM) ---
  function updatePeriodHeaderUI() {
    const select = document.getElementById('santriPeriodeSelect');
    const badge = document.getElementById('periodStatusBadge');
    const btnLock = document.getElementById('btnLockPeriod');
    const compSelect = document.getElementById('comparisonBasePeriodSelect');
    const newSourceSelect = document.getElementById('newPeriodSourceSelect');

    if (!monthlySantriStore) return;
    const periodKeys = Object.keys(monthlySantriStore).sort((a, b) => {
      const [mA, yA] = a.split('-').map(Number);
      const [mB, yB] = b.split('-').map(Number);
      if (yA !== yB) return yA - yB;
      return mA - mB;
    });

    // 1. Populasi santriPeriodeSelect
    if (select) {
      const currentVal = currentPeriodKey;
      select.innerHTML = '';
      periodKeys.forEach(key => {
        const pObj = monthlySantriStore[key];
        const opt = document.createElement('option');
        opt.value = key;
        const tag = pObj.isPedoman ? ' (PEDOMAN RESMI)' : (pObj.status === 'LOCKED' ? ' (FIKS)' : ' (DRAF)');
        const displayLabel = pObj.label.toLowerCase().includes('awal') ? pObj.label : `Bulan ${pObj.label}`;
        opt.textContent = `${displayLabel}${tag}`;
        if (key === currentVal) opt.selected = true;
        select.appendChild(opt);
      });
    }

    const curObj = monthlySantriStore[currentPeriodKey] || { status: 'DRAFT', isPedoman: false, label: currentPeriodKey };

    // 2. Update Status Badge Periode
    if (badge) {
      if (curObj.isPedoman) {
        badge.className = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold border bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800';
        badge.innerHTML = '<i data-lucide="shield-check" class="w-3.5 h-3.5 text-teal-600"></i><span>Pedoman Master (Fiks)</span>';
      } else if (curObj.status === 'LOCKED') {
        badge.className = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold border bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
        badge.innerHTML = '<i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-600"></i><span>Tervalidasi / Fiks</span>';
      } else {
        badge.className = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold border bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
        badge.innerHTML = '<i data-lucide="edit-3" class="w-3.5 h-3.5 text-amber-600"></i><span>Draf Rapat Berjalan</span>';
      }
    }

    // 3. Update Tombol Kunci / Buka Draf
    if (btnLock) {
      if (curObj.isPedoman) {
        btnLock.disabled = true;
        btnLock.className = 'px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700';
        btnLock.innerHTML = '<i data-lucide="lock" class="w-3.5 h-3.5"></i><span>Master Pedoman</span>';
      } else if (curObj.status === 'LOCKED') {
        btnLock.disabled = false;
        btnLock.className = 'px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600';
        btnLock.innerHTML = '<i data-lucide="unlock" class="w-3.5 h-3.5 text-slate-500"></i><span>Buka Draf</span>';
      } else {
        btnLock.disabled = false;
        btnLock.className = 'px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600';
        btnLock.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i><span>Kunci &amp; Fikskan</span>';
      }
    }

    // 4. Update Dropdown comparisonBasePeriodSelect
    if (compSelect) {
      compSelect.innerHTML = '';
      periodKeys.forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        const pObj = monthlySantriStore[key];
        const displayLabel = pObj.label.toLowerCase().includes('awal') ? pObj.label : `Bulan ${pObj.label}`;
        opt.textContent = `${displayLabel}${pObj.isPedoman ? ' (Pedoman)' : ''}`;
        if (key === comparisonPeriodKey) opt.selected = true;
        compSelect.appendChild(opt);
      });
    }

    // 5. Update Dropdown Sumber Salinan di Modal Buka Bulan Baru
    if (newSourceSelect) {
      newSourceSelect.innerHTML = '';
      periodKeys.forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        const pObj = monthlySantriStore[key];
        const activeCount = pObj.students.filter(s => s.status !== 'Boyong').length;
        const displayLabel = pObj.label.toLowerCase().includes('awal') ? pObj.label : `Bulan ${pObj.label}`;
        opt.textContent = `${displayLabel} (${activeCount} Santri Aktif)`;
        if (key === currentPeriodKey) opt.selected = true;
        newSourceSelect.appendChild(opt);
      });
    }

    // 6. Header Titles & Subtitles
    const matrixMonthTitle = document.getElementById('matrixMonthTitle');
    if (matrixMonthTitle) {
      matrixMonthTitle.textContent = curObj.label;
    }
    const infographicPeriodLabel = document.getElementById('infographicPeriodLabel');
    if (infographicPeriodLabel) {
      infographicPeriodLabel.textContent = `Laporan Data Siswa - ${curObj.label}`;
    }

    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  }

  function onSantriPeriodChange(newKey) {
    if (!newKey || !monthlySantriStore || !monthlySantriStore[newKey]) return;
    currentPeriodKey = newKey;
    santriDataList = monthlySantriStore[newKey].students;
    santriCurrentPage = 1;

    // Tentukan bulan pembanding otomatis (bulan sebelumnya bila ada, atau fallback ke '10-2026')
    const keys = Object.keys(monthlySantriStore);
    const idx = keys.indexOf(newKey);
    if (idx > 0) {
      comparisonPeriodKey = keys[idx - 1];
    } else if (keys.length > 1 && keys[0] !== newKey) {
      comparisonPeriodKey = keys[0];
    } else {
      comparisonPeriodKey = '10-2026';
    }

    calculateAndRenderAll();
    showToast('Periode Aktif Dialihkan', `Menampilkan data real Bulan ${monthlySantriStore[newKey].label}.`);
  }

  function onComparisonBasePeriodChange(val) {
    if (!val || !monthlySantriStore || !monthlySantriStore[val]) return;
    comparisonPeriodKey = val;
    renderSantriTrendAnalytics();
  }

  function toggleLockCurrentPeriod() {
    const curObj = monthlySantriStore[currentPeriodKey];
    if (!curObj) return;

    if (curObj.isPedoman) {
      alert('Bulan Oktober 2026 adalah Master Pedoman Resmi Yayasan dan selalu berstatus Fiks / Terkunci.');
      return;
    }

    if (curObj.status === 'LOCKED') {
      if (confirm(`Buka kembali status Bulan ${curObj.label} menjadi Draf? Anda dapat mengedit status santri dan mencatat mutasi kembali.`)) {
        curObj.status = 'DRAFT';
        curObj.lockedAt = null;
        saveMonthlySantriStore();
        updatePeriodHeaderUI();
        showToast('Status Draf Dibuka', `Bulan ${curObj.label} kini dapat diedit kembali.`);
      }
    } else {
      const activeCount = curObj.students.filter(s => s.status !== 'Boyong').length;
      if (confirm(`Kunci dan finalkan data Bulan ${curObj.label} (${activeCount} santri aktif)?\n\nSetelah dikunci, data santri bulan ini dianggap fiks hasil rapat bersama bendahara unit dan siap untuk pembuatan tagihan Junio.`)) {
        curObj.status = 'LOCKED';
        curObj.lockedAt = new Date().toISOString();
        saveMonthlySantriStore();
        updatePeriodHeaderUI();
        showToast('Data Bulan Dikunci & Fiks', `Bulan ${curObj.label} resmi difinalkan (${activeCount} santri aktif).`);
      }
    }
  }

  // --- MODAL BUKA BULAN BARU HANDLERS ---
  function openModalTambahPeriode() {
    const modal = document.getElementById('modalTambahPeriode');
    if (!modal) return;

    // Kalkulasi tebakan bulan berikutnya
    const curParts = currentPeriodKey.split('-');
    let nextMonth = Number(curParts[0]) + 1;
    let nextYear = Number(curParts[1]) || 2026;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    const nextMonthStr = String(nextMonth).padStart(2, '0');

    const mSelect = document.getElementById('newPeriodMonth');
    const yInput = document.getElementById('newPeriodYear');
    if (mSelect) mSelect.value = nextMonthStr;
    if (yInput) yInput.value = nextYear;

    updatePeriodHeaderUI();
    modal.classList.remove('hidden');
    if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
  }

  function closeModalTambahPeriode() {
    const modal = document.getElementById('modalTambahPeriode');
    if (modal) modal.classList.add('hidden');
  }

  function confirmTambahPeriodeBaru() {
    const mSelect = document.getElementById('newPeriodMonth');
    const yInput = document.getElementById('newPeriodYear');
    const sSelect = document.getElementById('newPeriodSourceSelect');

    const mm = mSelect ? mSelect.value : '11';
    const yyyy = yInput ? yInput.value.trim() : '2026';
    const sourceKey = sSelect ? sSelect.value : '10-2026';

    const newKey = `${mm}-${yyyy}`;
    if (monthlySantriStore[newKey]) {
      alert(`Periode Bulan ${formatPeriodMonthLabel(newKey)} sudah ada di sistem. Silakan pilih periode tersebut langsung dari dropdown Periode Bulan.`);
      return;
    }

    const sourceObj = monthlySantriStore[sourceKey];
    if (!sourceObj) {
      alert('Bulan sumber salinan tidak ditemukan.');
      return;
    }

    // KUNCI: Salin santri aktif (non-boyong) dari bulan sumber ke bulan baru (Preservasi Data Bulan Lalu)
    const clonedStudents = JSON.parse(JSON.stringify(sourceObj.students.filter(s => s.status !== 'Boyong')));

    monthlySantriStore[newKey] = {
      label: formatPeriodMonthLabel(newKey),
      status: 'DRAFT',
      isPedoman: false,
      lockedAt: null,
      students: clonedStudents
    };

    saveMonthlySantriStore();

    comparisonPeriodKey = sourceKey;
    currentPeriodKey = newKey;
    santriDataList = clonedStudents;
    santriCurrentPage = 1;

    closeModalTambahPeriode();
    calculateAndRenderAll();

    showToast('Bulan Baru Dibuka', `Bulan ${monthlySantriStore[newKey].label} berhasil dibuka dengan mewarisi ${clonedStudents.length} santri aktif dari ${sourceObj.label}. Data bulan sebelumnya tetap utuh!`);
  }

  // --- ENGINE KALKULASI KOMPARASI & PERUBAHAN ANTAR BULAN ---
  function calculateMonthComparison(baseKey, targetKey) {
    const baseObj = monthlySantriStore[baseKey] || { label: baseKey, students: [] };
    const targetObj = monthlySantriStore[targetKey] || { label: targetKey, students: [] };

    const baseStudents = baseObj.students || [];
    const targetStudents = targetObj.students || [];

    const baseActiveMap = new Map();
    baseStudents.forEach(s => {
      if (s.status !== 'Boyong') baseActiveMap.set(String(s.reg), s);
    });

    const targetActiveMap = new Map();
    const targetAllMap = new Map();
    targetStudents.forEach(s => {
      targetAllMap.set(String(s.reg), s);
      if (s.status !== 'Boyong') targetActiveMap.set(String(s.reg), s);
    });

    const diffList = [];
    let masukCount = 0;
    let boyongCount = 0;
    let pindahCount = 0;
    let netTariffDiff = 0;

    // 1. Santri Masuk (Ada di target aktif, tapi tidak ada di base aktif)
    targetStudents.forEach(t => {
      if (t.status === 'Boyong') return;
      const b = baseActiveMap.get(String(t.reg));
      if (!b) {
        masukCount++;
        const tariff = Number(t.bulanan) || 0;
        netTariffDiff += tariff;
        diffList.push({
          type: 'MASUK',
          reg: t.reg,
          nama: t.nama,
          jk: t.jk,
          unit: t.unit,
          kelas: t.kelas,
          oldStatus: '-',
          newStatus: t.status,
          oldTariff: 0,
          newTariff: tariff,
          tariffDiff: tariff,
          note: 'Santri Baru Masuk'
        });
      }
    });

    // 2. Santri Boyong (Ada di base aktif, tapi di target status 'Boyong' atau dihapus)
    baseStudents.forEach(b => {
      if (b.status === 'Boyong') return;
      const t = targetAllMap.get(String(b.reg));
      if (!t || t.status === 'Boyong') {
        boyongCount++;
        const tariff = Number(b.bulanan) || 0;
        netTariffDiff -= tariff;
        diffList.push({
          type: 'BOYONG',
          reg: b.reg,
          nama: b.nama,
          jk: b.jk,
          unit: b.unit,
          kelas: b.kelas,
          oldStatus: b.status,
          newStatus: 'Boyong',
          oldTariff: tariff,
          newTariff: 0,
          tariffDiff: -tariff,
          note: 'Boyong / Keluar'
        });
      }
    });

    // 3. Pindah Status (Ada di kedua bulan sebagai aktif, namun status atau tarif berubah)
    targetStudents.forEach(t => {
      if (t.status === 'Boyong') return;
      const b = baseActiveMap.get(String(t.reg));
      if (b) {
        const statusChanged = b.status !== t.status;
        const tariffChanged = Number(b.bulanan) !== Number(t.bulanan);

        const wasMukim = b.status === 'Mukim VIP' || b.status === 'Mukim Reguler';
        const isNonMukim = t.status === 'Non Mukim';
        const isMondokToNon = wasMukim && isNonMukim;
        const wasNonMukim = b.status === 'Non Mukim';
        const isMukim = t.status === 'Mukim VIP' || t.status === 'Mukim Reguler';
        const isNonToMondok = wasNonMukim && isMukim;

        if (statusChanged || tariffChanged) {
          pindahCount++;
          const oldTariff = Number(b.bulanan) || 0;
          const newTariff = Number(t.bulanan) || 0;
          const deltaTariff = newTariff - oldTariff;
          netTariffDiff += deltaTariff;

          let noteText = 'Penyesuaian Tarif';
          if (isMondokToNon) {
            noteText = 'Alih Mondok ➔ Bajak Mukim (Bajak)';
          } else if (isNonToMondok) {
            noteText = 'Alih Non Mukim ➔ Mondok';
          } else if (statusChanged) {
            noteText = `Status: ${b.status} ➔ ${t.status}`;
          }

          diffList.push({
            type: statusChanged ? 'PINDAH_STATUS' : 'PENYESUAIAN_TARIF',
            isMondokToNon: isMondokToNon,
            isNonToMondok: isNonToMondok,
            reg: t.reg,
            nama: t.nama,
            jk: t.jk,
            unit: t.unit,
            kelas: t.kelas,
            oldStatus: b.status,
            newStatus: t.status,
            oldTariff: oldTariff,
            newTariff: newTariff,
            tariffDiff: deltaTariff,
            note: noteText
          });
        }
      }
    });

    const mondokToNonCount = diffList.filter(d => d.isMondokToNon).length;

    // Kalkulasi statistik & prosentase per 4 Unit (MTs, SMP, MA, SMA)
    const unitList = ['MTs', 'SMP', 'MA', 'SMA'];
    const unitComparison = {};
    let totalBaseStudents = 0;
    let totalTargetStudents = 0;
    let totalBaseBilling = 0;
    let totalTargetBilling = 0;

    unitList.forEach(u => {
      const bStudents = baseStudents.filter(s => s.unit === u && s.status !== 'Boyong');
      const tStudents = targetStudents.filter(s => s.unit === u && s.status !== 'Boyong');

      const bCount = bStudents.length;
      const tCount = tStudents.length;
      const deltaCount = tCount - bCount;
      const pctMoM = bCount > 0 ? ((deltaCount / bCount) * 100).toFixed(1) : '0.0';

      // Mukim vs Non di target month
      const tMukim = tStudents.filter(s => s.status === 'Mukim Reguler' || s.status === 'Mukim VIP').length;
      const tNon = tStudents.filter(s => s.status === 'Non Mukim').length;
      const mukimPct = tCount > 0 ? ((tMukim / tCount) * 100).toFixed(1) : '0.0';
      const nonPct = tCount > 0 ? ((tNon / tCount) * 100).toFixed(1) : '0.0';

      // Santri mukim bulan dasar
      const bMukim = bStudents.filter(s => s.status === 'Mukim Reguler' || s.status === 'Mukim VIP').length;

      // Santri mondok yang alih status ke non-mukim
      const uMondokToNon = diffList.filter(d => d.unit === u && d.isMondokToNon).length;
      const mondokToNonPct = bMukim > 0 ? ((uMondokToNon / bMukim) * 100).toFixed(1) : '0.0';

      // Santri boyong per unit
      const uBoyong = diffList.filter(d => d.unit === u && d.type === 'BOYONG').length;
      const retensiPct = bCount > 0 ? (((bCount - uBoyong) / bCount) * 100).toFixed(1) : '100.0';

      const bBilling = bStudents.reduce((sum, s) => sum + (Number(s.bulanan) || 0), 0);
      const tBilling = tStudents.reduce((sum, s) => sum + (Number(s.bulanan) || 0), 0);
      const deltaBilling = tBilling - bBilling;

      totalBaseStudents += bCount;
      totalTargetStudents += tCount;
      totalBaseBilling += bBilling;
      totalTargetBilling += tBilling;

      unitComparison[u] = {
        unit: u,
        baseCount: bCount,
        targetCount: tCount,
        deltaCount: deltaCount,
        pctMoM: pctMoM,
        tMukim: tMukim,
        mukimPct: mukimPct,
        tNon: tNon,
        nonPct: nonPct,
        bMukim: bMukim,
        uMondokToNon: uMondokToNon,
        mondokToNonPct: mondokToNonPct,
        retensiPct: retensiPct,
        baseBilling: bBilling,
        targetBilling: tBilling,
        deltaBilling: deltaBilling
      };
    });

    return {
      baseKey,
      baseLabel: baseObj.label,
      targetKey,
      targetLabel: targetObj.label,
      masukCount,
      boyongCount,
      pindahCount,
      mondokToNonCount,
      netTariffDiff,
      totalBaseStudents,
      totalTargetStudents,
      netStudentDiff: totalTargetStudents - totalBaseStudents,
      totalBaseBilling,
      totalTargetBilling,
      totalBillingDiff: totalTargetBilling - totalBaseBilling,
      unitComparison,
      diffList: sortSantriHierarchy(diffList)
    };
  }

  function renderSantriTrendAnalytics() {
    latestComparisonResult = calculateMonthComparison(comparisonPeriodKey, currentPeriodKey);
    const comp = latestComparisonResult;

    // 1. KPI 1: Total Pelajar
    const kpiTotal = document.getElementById('compKpiTotal');
    const kpiTotalBadge = document.getElementById('compKpiTotalBadge');
    const kpiTotalSubtext = document.getElementById('compKpiTotalSubtext');

    if (kpiTotal) {
      kpiTotal.textContent = `${comp.totalBaseStudents} ➔ ${comp.totalTargetStudents}`;
    }
    if (kpiTotalBadge) {
      const netSign = comp.netStudentDiff > 0 ? '+' : '';
      kpiTotalBadge.textContent = `${netSign}${comp.netStudentDiff} Netto`;
      if (comp.netStudentDiff > 0) {
        kpiTotalBadge.className = 'inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      } else if (comp.netStudentDiff < 0) {
        kpiTotalBadge.className = 'inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      } else {
        kpiTotalBadge.className = 'inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      }
    }
    if (kpiTotalSubtext) {
      kpiTotalSubtext.textContent = `${comp.baseLabel} vs ${comp.targetLabel}`;
    }

    // 2. KPI 2: Santri Masuk
    const kpiMasuk = document.getElementById('compKpiMasuk');
    if (kpiMasuk) kpiMasuk.textContent = `+${comp.masukCount}`;

    // 3. KPI 3: Santri Boyong
    const kpiBoyong = document.getElementById('compKpiBoyong');
    if (kpiBoyong) kpiBoyong.textContent = `-${comp.boyongCount}`;

    // 4. KPI 4: Pindah Status & Delta Tagihan
    const kpiPindah = document.getElementById('compKpiPindah');
    const kpiTariffDiff = document.getElementById('compKpiTariffDiff');
    if (kpiPindah) kpiPindah.textContent = comp.pindahCount;
    if (kpiTariffDiff) {
      const sign = comp.totalBillingDiff >= 0 ? '+' : '-';
      kpiTariffDiff.textContent = `Δ ${sign}Rp ${Math.abs(comp.totalBillingDiff).toLocaleString('id-ID')}`;
      if (comp.totalBillingDiff > 0) {
        kpiTariffDiff.className = 'inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-mono';
      } else if (comp.totalBillingDiff < 0) {
        kpiTariffDiff.className = 'inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800 font-mono';
      } else {
        kpiTariffDiff.className = 'inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded border whitespace-nowrap bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800 font-mono';
      }
    }

    // 5. Update Table Headers
    const thBase = document.getElementById('thCompBaseName');
    const thTarget = document.getElementById('thCompTargetName');
    if (thBase) thBase.textContent = comp.baseLabel.replace(' 2026', '').replace(' 2027', '');
    if (thTarget) thTarget.textContent = comp.targetLabel.replace(' 2026', '').replace(' 2027', '');

    // 6. Render Unit Comparison Table Body (6 Kolom: Unit, Bln Lalu, Bln Ini, Selisih (%), Mondok➔Non, Tagihan)
    const tbodyUnit = document.getElementById('unitComparisonTableBody');
    if (tbodyUnit) {
      let unitRowsHtml = '';
      const unitConfigs = [
        { key: 'MTs', dot: 'bg-emerald-500 shadow-2xs', text: 'text-emerald-700 dark:text-emerald-300' },
        { key: 'SMP', dot: 'bg-sky-500 shadow-2xs', text: 'text-sky-700 dark:text-sky-300' },
        { key: 'MA',  dot: 'bg-amber-500 shadow-2xs', text: 'text-amber-700 dark:text-amber-300' },
        { key: 'SMA', dot: 'bg-orange-500 shadow-2xs', text: 'text-orange-700 dark:text-orange-300' }
      ];
      unitConfigs.forEach(uCfg => {
        const u = comp.unitComparison[uCfg.key];
        const diffSign = u.deltaCount > 0 ? '+' : '';
        const badgeColor = u.deltaCount > 0 
          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
          : (u.deltaCount < 0 ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400');
        
        const mondokNonBadge = u.uMondokToNon > 0
          ? `<button type="button" onclick="filterCompChanges('PINDAH_NON')" class="px-1.5 py-0.5 rounded-[4px] bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 font-bold text-[10px] cursor-pointer" title="Klik untuk lihat santri mondok yang alih ke bajak">${u.uMondokToNon} (${u.mondokToNonPct}%)</button>`
          : `<span class="text-slate-400 text-[10px]">0</span>`;

        unitRowsHtml += `
          <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <td class="py-2 px-2 text-left font-black text-slate-800 dark:text-slate-100">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full ${uCfg.dot} shrink-0"></span>
                <span class="${uCfg.text}">${u.unit}</span>
              </div>
            </td>
            <td class="py-2 px-1 text-slate-500 font-semibold">${u.baseCount}</td>
            <td class="py-2 px-1 font-bold text-teal-700 dark:text-teal-300">${u.targetCount}</td>
            <td class="py-2 px-1 whitespace-nowrap">
              <span class="inline-block px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold ${badgeColor}">
                ${diffSign}${u.deltaCount} (${u.pctMoM}%)
              </span>
            </td>
            <td class="py-2 px-1 text-center whitespace-nowrap">
              ${mondokNonBadge}
            </td>
            <td class="py-2 px-2 text-right font-mono font-bold text-[11px] text-slate-800 dark:text-slate-200">
              Rp ${u.targetBilling.toLocaleString('id-ID')}
            </td>
          </tr>
        `;
      });

      // Total Row
      // Total Row
      const totDelta = comp.netStudentDiff;
      const totPct = comp.totalBaseStudents > 0 ? ((totDelta / comp.totalBaseStudents) * 100).toFixed(1) : '0.0';
      const totMondokNon = comp.mondokToNonCount || 0;
      const totBadgeColor = totDelta > 0 
        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/60' 
        : (totDelta < 0 
          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300/40 dark:border-rose-700/60' 
          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700/60');

      const totMondokNonBadge = totMondokNon > 0
        ? `<button type="button" onclick="filterCompChanges('PINDAH_NON')" class="px-1.5 py-0.5 rounded-[4px] bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-[10px] font-black cursor-pointer shadow-2xs" title="Total santri mondok alih ke bajak">${totMondokNon}</button>`
        : `<span class="text-slate-400 text-[10px]">0</span>`;

      unitRowsHtml += `
        <tr class="bg-slate-100/90 dark:bg-slate-800/90 font-black text-slate-900 dark:text-white border-t border-slate-300 dark:border-slate-700">
          <td class="py-2 px-2 text-left">TOTAL</td>
          <td class="py-2 px-1 text-slate-500 dark:text-slate-400">${comp.totalBaseStudents}</td>
          <td class="py-2 px-1 text-teal-600 dark:text-teal-400">${comp.totalTargetStudents}</td>
          <td class="py-2 px-1 whitespace-nowrap">
            <span class="inline-block px-1.5 py-0.5 rounded-[4px] text-[10px] font-black ${totBadgeColor}">
              ${totDelta > 0 ? '+' : ''}${totDelta} (${totPct}%)
            </span>
          </td>
          <td class="py-2 px-1 text-center whitespace-nowrap">
            ${totMondokNonBadge}
          </td>
          <td class="py-2 px-2 text-right font-mono text-[11px] text-teal-700 dark:text-teal-300">
            Rp ${comp.totalTargetBilling.toLocaleString('id-ID')}
          </td>
        </tr>
      `;
      tbodyUnit.innerHTML = unitRowsHtml;
    }

    // 6B. Render Unit Breakdown & Rasio Cards (MTs, SMP, MA, SMA)
    const breakdownContainer = document.getElementById('unitBreakdownCardsContainer');
    if (breakdownContainer) {
      let cardsHtml = '';
      const unitKeys = ['MTs', 'SMP', 'MA', 'SMA'];
      unitKeys.forEach(uKey => {
        const u = comp.unitComparison[uKey];
        const hasMondokNon = u.uMondokToNon > 0;
        cardsHtml += `
          <div class="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5 shadow-2xs">
            <div class="flex items-center justify-between">
              <span class="font-extrabold text-[11px] text-slate-900 dark:text-slate-100 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full ${u.deltaCount >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}"></span>
                <span>${u.unit}</span>
              </span>
              <span class="text-[10px] font-mono font-bold text-slate-500">${u.targetCount} Santri</span>
            </div>
            
            <!-- Rasio Mukim vs Non -->
            <div class="space-y-0.5">
              <div class="flex items-center justify-between text-[9.5px]">
                <span class="text-teal-700 dark:text-teal-300 font-bold">Mondok ${u.mukimPct}% <span class="text-slate-400 font-normal">(${u.tMukim})</span></span>
                <span class="text-slate-600 dark:text-slate-400 font-bold">Bajak ${u.nonPct}% <span class="text-slate-400 font-normal">(${u.tNon})</span></span>
              </div>
              <div class="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                <div class="bg-teal-600 h-full" style="width: ${u.mukimPct}%"></div>
                <div class="bg-slate-400 h-full" style="width: ${u.nonPct}%"></div>
              </div>
            </div>

            <!-- Mondok ke Non Mukim & Retensi -->
            <div class="pt-1 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[9.5px]">
              <span class="flex items-center gap-1 ${hasMondokNon ? 'text-amber-700 dark:text-amber-300 font-bold' : 'text-slate-400'}">
                <i data-lucide="arrow-right-left" class="w-2.5 h-2.5"></i>
                <span>Alih Bajak: <b>${u.uMondokToNon}</b> (${u.mondokToNonPct}%)</span>
              </span>
              <span class="text-slate-500 font-medium" title="Tingkat santri tetap bertahan (non-boyong)">
                Retensi: <b class="text-emerald-600 dark:text-emerald-400">${u.retensiPct}%</b>
              </span>
            </div>
          </div>
        `;
      });
      breakdownContainer.innerHTML = cardsHtml;
    }

    // 7. Update Filter Counts on Diff Table Pills
    const cntAll = document.getElementById('cntCompAll');
    const cntMasuk = document.getElementById('cntCompMasuk');
    const cntBoyong = document.getElementById('cntCompBoyong');
    const cntPindah = document.getElementById('cntCompPindah');
    const cntPindahNon = document.getElementById('cntCompPindahNon');

    if (cntAll) cntAll.textContent = comp.diffList.length;
    if (cntMasuk) cntMasuk.textContent = comp.masukCount;
    if (cntBoyong) cntBoyong.textContent = comp.boyongCount;
    if (cntPindah) cntPindah.textContent = comp.pindahCount;
    if (cntPindahNon) cntPindahNon.textContent = comp.mondokToNonCount || 0;

    // 8. Render Detailed Student Diff Table
    renderStudentDiffTable();

    // 9. Render Interactive Monthly Line Chart (Tren Bulanan & Prosentase)
    renderMonthlyStudentLineChart();
  }

  function filterCompChanges(type) {
    currentCompChangeFilter = type;
    const btns = ['All', 'Masuk', 'Boyong', 'Pindah', 'PindahNon'];
    const typeMap = { 
      'ALL': 'All', 
      'MASUK': 'Masuk', 
      'BOYONG': 'Boyong', 
      'PINDAH_STATUS': 'Pindah',
      'PINDAH_NON': 'PindahNon'
    };

    btns.forEach(b => {
      const el = document.getElementById(`filterComp${b}`);
      if (el) {
        if (typeMap[type] === b) {
          el.className = b === 'PindahNon'
            ? 'px-2 py-1 rounded-md bg-amber-600 text-white transition-all cursor-pointer font-bold'
            : 'px-2 py-1 rounded-md bg-teal-600 text-white transition-all cursor-pointer font-bold';
        } else {
          el.className = b === 'PindahNon'
            ? 'px-2 py-1 rounded-md text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-all cursor-pointer font-bold whitespace-nowrap'
            : 'px-2 py-1 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer font-medium';
        }
      }
    });

    renderStudentDiffTable();
  }

  function renderStudentDiffTable() {
    const tbody = document.getElementById('studentDiffTableBody');
    if (!tbody) return;

    if (!latestComparisonResult || !latestComparisonResult.diffList) {
      tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-slate-400">Memuat data komparasi...</td></tr>';
      return;
    }

    let list = latestComparisonResult.diffList;
    if (currentCompChangeFilter !== 'ALL') {
      if (currentCompChangeFilter === 'PINDAH_NON') {
        list = list.filter(item => item.isMondokToNon === true);
      } else if (currentCompChangeFilter === 'PINDAH_STATUS') {
        list = list.filter(item => item.type === 'PINDAH_STATUS' || item.type === 'PENYESUAIAN_TARIF');
      } else {
        list = list.filter(item => item.type === currentCompChangeFilter);
      }
    }

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="py-8 px-4 text-center text-slate-400 dark:text-slate-500">
            <div class="flex flex-col items-center justify-center">
              <i data-lucide="check-check" class="w-7 h-7 text-teal-600 mb-1 opacity-70"></i>
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300">Tidak ada perubahan santri (${currentCompChangeFilter})</span>
              <span class="text-[11px] text-slate-500 mt-0.5">Data santri pada filter ini tidak memiliki riwayat mutasi.</span>
            </div>
          </td>
        </tr>
      `;
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
      return;
    }

    let rowsHtml = '';
    list.forEach(item => {
      let badge = '';
      let tariffColor = 'text-slate-700 dark:text-slate-300';
      const tariffSign = item.tariffDiff > 0 ? '+' : (item.tariffDiff < 0 ? '-' : '');

      if (item.isMondokToNon) {
        badge = '<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] text-[9.5px] font-bold tracking-tight bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700"><i data-lucide="arrow-right-left" class="w-2.5 h-2.5"></i> Mondok ➔ Bajak</span>';
        tariffColor = 'text-rose-600 dark:text-rose-400 font-bold';
      } else if (item.isNonToMondok) {
        badge = '<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] text-[9.5px] font-bold tracking-tight bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-700"><i data-lucide="arrow-right-left" class="w-2.5 h-2.5"></i> Non ➔ Mondok</span>';
        tariffColor = 'text-emerald-600 dark:text-emerald-400 font-bold';
      } else if (item.type === 'MASUK') {
        badge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold tracking-tight bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"><i data-lucide="user-plus" class="w-2.5 h-2.5"></i> Masuk</span>';
        tariffColor = 'text-emerald-600 dark:text-emerald-400 font-bold';
      } else if (item.type === 'BOYONG') {
        badge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold tracking-tight bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"><i data-lucide="user-minus" class="w-2.5 h-2.5"></i> Boyong</span>';
        tariffColor = 'text-rose-600 dark:text-rose-400 font-bold';
      } else if (item.type === 'PINDAH_STATUS') {
        badge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold tracking-tight bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"><i data-lucide="refresh-cw" class="w-2.5 h-2.5"></i> Pindah Status</span>';
        if (item.tariffDiff > 0) tariffColor = 'text-emerald-600 dark:text-emerald-400 font-bold';
        else if (item.tariffDiff < 0) tariffColor = 'text-rose-600 dark:text-rose-400 font-bold';
      } else {
        badge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold tracking-tight bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800"><i data-lucide="sliders-horizontal" class="w-2.5 h-2.5"></i> Tarif</span>';
        if (item.tariffDiff > 0) tariffColor = 'text-emerald-600 dark:text-emerald-400 font-bold';
        else if (item.tariffDiff < 0) tariffColor = 'text-rose-600 dark:text-rose-400 font-bold';
      }

      rowsHtml += `
        <tr class="hover:bg-teal-50/40 dark:hover:bg-slate-800/60 transition-colors">
          <td class="py-2 px-2.5">
            <span class="block font-bold text-slate-900 dark:text-white text-xs">${item.nama}</span>
            <span class="block text-[10px] text-slate-400 font-mono">#${item.reg} • ${item.jk}</span>
          </td>
          <td class="py-2 px-2 whitespace-nowrap">
            <span class="font-bold text-teal-700 dark:text-teal-300 text-xs">${item.unit}</span>
            <span class="text-slate-500 text-[11px]">Kelas ${item.kelas}</span>
          </td>
          <td class="py-2 px-2 whitespace-nowrap">
            <div class="flex items-center gap-1.5 flex-wrap">
              ${badge}
              <span class="text-[11px] text-slate-700 dark:text-slate-300 font-medium">${item.newStatus}</span>
            </div>
          </td>
          <td class="py-2 px-2 text-right whitespace-nowrap font-mono text-xs ${tariffColor}">
            ${item.tariffDiff !== 0 ? `${tariffSign}Rp ${Math.abs(item.tariffDiff).toLocaleString('id-ID')}` : 'Rp 0'}
          </td>
          <td class="py-2 px-2 text-[11px] text-slate-500 dark:text-slate-400 italic">
            ${item.note || '-'}
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHtml;
    if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
  }

  // --- 5C. GRAFIK GARIS TREN BULANAN & PROSENTASE SISWA INTERAKTIF (SVG ENGINE) ---
  let computedPeriodsCache = null;
  let activeUnitChartFocus = 'ALL'; // 'ALL', 'MTs', 'SMP', 'MA', 'SMA'
  let selectedPeriodTabKey = null; // Key periode aktif pada Tab Pemisah Rincian
  let periodsDataCache = [];
  let getXCache = (idx) => 0;

  function setUnitChartFocus(unitKey) {
    activeUnitChartFocus = (activeUnitChartFocus === unitKey) ? 'ALL' : unitKey;
    renderMonthlyStudentLineChart();
  }

  function switchStudentChartMode(mode) {
    currentStudentChartMode = mode;
    const modes = ['TOTAL', 'MUKIM_LAJU', 'UNITS', 'MUTASI_UNITS', 'PCT'];
    modes.forEach(m => {
      const btn = document.getElementById(`chartModeBtn${m}`);
      if (btn) {
        if (m === mode) {
          btn.className = m === 'MUKIM_LAJU'
            ? 'px-2.5 py-1 rounded-md bg-amber-600 text-white shadow-xs transition-all cursor-pointer font-bold whitespace-nowrap'
            : (m === 'MUTASI_UNITS'
                ? 'px-2.5 py-1 rounded-md bg-rose-600 text-white shadow-xs transition-all cursor-pointer font-bold whitespace-nowrap'
                : 'px-2.5 py-1 rounded-md bg-teal-600 text-white shadow-xs transition-all cursor-pointer font-bold whitespace-nowrap');
        } else {
          btn.className = m === 'MUKIM_LAJU'
            ? 'px-2.5 py-1 rounded-md text-amber-700 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer font-bold whitespace-nowrap'
            : (m === 'MUTASI_UNITS'
                ? 'px-2.5 py-1 rounded-md text-rose-700 dark:text-rose-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer font-bold whitespace-nowrap'
                : 'px-2.5 py-1 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer font-medium whitespace-nowrap');
        }
      }
    });
    renderMonthlyStudentLineChart();
  }

  // --- SELECTION TAB HANDLER (TAB PEMISAH RINCIAN DATA) ---
  function selectChartPeriodTab(key) {
    selectedPeriodTabKey = key;
    renderPeriodTabsUI();
    renderSelectedPeriodDetail(key);

    // Update highlight garis panduan di grafik
    document.querySelectorAll('[id^="studentChartGuide_"]').forEach(el => {
      if (el.id === `studentChartGuide_${key}`) {
        el.setAttribute('opacity', '1');
        el.setAttribute('stroke', '#0d9488');
        el.setAttribute('stroke-width', '2');
      } else {
        el.setAttribute('opacity', '0');
      }
    });
  }

  function renderPeriodTabsUI() {
    const tabsContainer = document.getElementById('chartPeriodTabsContainer');
    const badge = document.getElementById('selectedPeriodNameBadge');
    if (!tabsContainer || !periodsDataCache || periodsDataCache.length === 0) return;

    if (!selectedPeriodTabKey || !periodsDataCache.some(d => d.key === selectedPeriodTabKey)) {
      selectedPeriodTabKey = currentPeriodKey || periodsDataCache[periodsDataCache.length - 1].key;
    }

    const currentObj = periodsDataCache.find(d => d.key === selectedPeriodTabKey) || periodsDataCache[0];
    if (badge) {
      badge.textContent = currentObj.label || selectedPeriodTabKey;
    }

    let tabsHtml = '';
    periodsDataCache.forEach(d => {
      const isSelected = d.key === selectedPeriodTabKey;
      const isCurrentMaster = d.key === currentPeriodKey;
      tabsHtml += `
        <button 
          type="button" 
          onclick="selectChartPeriodTab('${d.key}')" 
          class="px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${isSelected 
            ? 'bg-teal-600 text-white shadow-xs scale-102' 
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}"
        >
          <span>${d.shortLabel}</span>
          ${isCurrentMaster ? '<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>' : ''}
        </button>
      `;
    });
    tabsContainer.innerHTML = tabsHtml;
  }

  function renderSelectedPeriodDetail(key) {
    const detailContainer = document.getElementById('selectedPeriodDetailCard');
    if (!detailContainer) return;

    let pData = computedPeriodsCache && computedPeriodsCache[key];
    if (!pData && monthlySantriStore && monthlySantriStore[key]) {
      const pObj = monthlySantriStore[key];
      const active = (pObj.students || []).filter(s => s.status !== 'Boyong');
      const total = active.length;
      const mukim = active.filter(s => s.status === 'Mukim Reguler' || s.status === 'Mukim VIP').length;
      const nonMukim = active.filter(s => s.status === 'Non Mukim').length;
      pData = {
        label: pObj.label || key,
        total,
        totalDelta: 0,
        mukim,
        nonMukim,
        mukimPct: total > 0 ? Number(((mukim / total) * 100).toFixed(1)) : 0,
        nonMukimPct: total > 0 ? Number(((nonMukim / total) * 100).toFixed(1)) : 0,
        mukimDelta: 0,
        nonMukimDelta: 0,
        mukimDeltaPct: '0.0',
        alihMondokToNon: 0,
        alihPct: '0.0',
        mts: active.filter(s => s.unit === 'MTs').length,
        smp: active.filter(s => s.unit === 'SMP').length,
        ma: active.filter(s => s.unit === 'MA').length,
        sma: active.filter(s => s.unit === 'SMA').length,
        mtsDelta: 0, smpDelta: 0, maDelta: 0, smaDelta: 0
      };
    }

    if (!pData) {
      detailContainer.innerHTML = '<div class="p-4 text-center text-xs text-slate-400">Pilih salah satu tab bulan untuk melihat rincian data.</div>';
      return;
    }

    const mukimSign = pData.mukimDelta > 0 ? '▲+' : (pData.mukimDelta < 0 ? '▼' : '');
    const nonSign = pData.nonMukimDelta > 0 ? '▲+' : (pData.nonMukimDelta < 0 ? '▼' : '');
    const totalSign = pData.totalDelta > 0 ? '▲+' : (pData.totalDelta < 0 ? '▼' : '');

    const getUnitBadge = (delta) => {
      if (delta < 0) return `<span class="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700 font-mono font-bold text-[10px]">▼${Math.abs(delta)} Boyong</span>`;
      if (delta > 0) return `<span class="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-mono font-bold text-[10px]">▲+${delta} Masuk</span>`;
      return `<span class="text-slate-400 font-mono text-[10px] font-medium">0 Stabil</span>`;
    };

    detailContainer.innerHTML = `
      <!-- 4 KARTU METRIK UTAMA BULAN INI -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <!-- 1. Total Siswa -->
        <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[10.5px] font-bold mb-1">
            <span>Total Pelajar</span>
            <i data-lucide="users" class="w-3.5 h-3.5 text-teal-600"></i>
          </div>
          <div class="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono">
            ${pData.total} <span class="text-xs font-normal text-slate-500">Siswa</span>
          </div>
          <div class="text-[10px] font-semibold mt-1 flex items-center gap-1">
            ${pData.totalDelta !== 0 
              ? `<span class="${pData.totalDelta < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'} font-bold">${totalSign}${pData.totalDelta} Netto</span> <span class="text-slate-400">vs bulan lalu</span>` 
              : '<span class="text-slate-400 font-normal">Kondisi Stabil (Tetap)</span>'}
          </div>
        </div>

        <!-- 2. Santri Mondok (Mukim) -->
        <div class="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 shadow-2xs">
          <div class="flex items-center justify-between text-emerald-800 dark:text-emerald-300 text-[10.5px] font-bold mb-1">
            <span>Santri Mondok (Mukim)</span>
            <i data-lucide="home" class="w-3.5 h-3.5 text-emerald-600"></i>
          </div>
          <div class="text-lg sm:text-xl font-black text-emerald-900 dark:text-emerald-100 font-mono">
            ${pData.mukim} <span class="text-xs font-normal text-emerald-700 dark:text-emerald-300">(${pData.mukimPct}%)</span>
          </div>
          <div class="text-[10px] font-semibold mt-1">
            ${pData.mukimDelta !== 0 
              ? `<span class="${pData.mukimDelta < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'} font-bold">${mukimSign}${pData.mukimDelta} Santri (${pData.mukimDeltaPct}%)</span>` 
              : '<span class="text-slate-400 font-normal">Stabil (Tetap)</span>'}
          </div>
        </div>

        <!-- 3. Santri Bajak (Non-Mukim) -->
        <div class="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 shadow-2xs">
          <div class="flex items-center justify-between text-amber-800 dark:text-amber-300 text-[10.5px] font-bold mb-1">
            <span>Santri Bajak (Non-Mukim)</span>
            <i data-lucide="bus" class="w-3.5 h-3.5 text-amber-600"></i>
          </div>
          <div class="text-lg sm:text-xl font-black text-amber-900 dark:text-amber-100 font-mono">
            ${pData.nonMukim} <span class="text-xs font-normal text-amber-700 dark:text-amber-300">(${pData.nonMukimPct}%)</span>
          </div>
          <div class="text-[10px] font-semibold mt-1">
            ${pData.nonMukimDelta !== 0 
              ? `<span class="${pData.nonMukimDelta > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} font-bold">${nonSign}${pData.nonMukimDelta} Santri</span>` 
              : '<span class="text-slate-400 font-normal">Stabil (Tetap)</span>'}
          </div>
        </div>

        <!-- 4. Dinamika Mutasi & Alih Status -->
        <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
          <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[10.5px] font-bold mb-1">
            <span>Dinamika Santri</span>
            <i data-lucide="arrow-right-left" class="w-3.5 h-3.5 text-rose-500"></i>
          </div>
          <div class="text-sm font-black text-slate-800 dark:text-slate-200">
            ${pData.alihMondokToNon > 0 
              ? `<span class="text-amber-600 dark:text-amber-400 font-bold">${pData.alihMondokToNon} Alih Mondok ➔ Bajak</span>` 
              : (pData.totalDelta < 0 ? `<span class="text-rose-600 dark:text-rose-400 font-bold">${Math.abs(pData.totalDelta)} Santri Boyong</span>` : '<span class="text-slate-400 font-medium">Tidak ada mutasi besar</span>')}
          </div>
          <div class="text-[10px] text-slate-400 mt-1">
            ${pData.key === '10-2026' ? 'Validasi Resmi Rapat Pedoman 746 Siswa' : 'Data Terverifikasi'}
          </div>
        </div>
      </div>

      <!-- RINCIAN LENGKAP PER UNIT (MTS, SMP, MA, SMA) DENGAN WARNA RESMI -->
      <div class="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-2">
        <div class="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>Persebaran &amp; Mutasi 4 Unit Pendidikan:</span>
          <span class="text-[10px] text-slate-400 font-normal">Sesuai Warna Identitas</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <!-- MTs -->
          <div class="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-300/80 dark:border-emerald-800/60">
            <div class="flex items-center justify-between text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-0.5">
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>MTs</span>
              </span>
              ${getUnitBadge(pData.mtsDelta)}
            </div>
            <div class="text-base font-black text-slate-900 dark:text-white font-mono">
              ${pData.mts} <span class="text-[10px] font-normal text-slate-500">(${pData.mtsPct}%)</span>
            </div>
          </div>

          <!-- SMP -->
          <div class="p-2.5 rounded-lg bg-sky-50/50 dark:bg-sky-950/20 border border-sky-300/80 dark:border-sky-800/60">
            <div class="flex items-center justify-between text-[11px] font-bold text-sky-800 dark:text-sky-300 mb-0.5">
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span>SMP</span>
              </span>
              ${getUnitBadge(pData.smpDelta)}
            </div>
            <div class="text-base font-black text-slate-900 dark:text-white font-mono">
              ${pData.smp} <span class="text-[10px] font-normal text-slate-500">(${pData.smpPct}%)</span>
            </div>
          </div>

          <!-- MA -->
          <div class="p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-300/80 dark:border-amber-800/60">
            <div class="flex items-center justify-between text-[11px] font-bold text-amber-800 dark:text-amber-300 mb-0.5">
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>MA</span>
              </span>
              ${getUnitBadge(pData.maDelta)}
            </div>
            <div class="text-base font-black text-slate-900 dark:text-white font-mono">
              ${pData.ma} <span class="text-[10px] font-normal text-slate-500">(${pData.maPct}%)</span>
            </div>
          </div>

          <!-- SMA -->
          <div class="p-2.5 rounded-lg bg-orange-50/50 dark:bg-orange-950/20 border border-orange-300/80 dark:border-orange-800/60">
            <div class="flex items-center justify-between text-[11px] font-bold text-orange-800 dark:text-orange-300 mb-0.5">
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                <span>SMA</span>
              </span>
              ${getUnitBadge(pData.smaDelta)}
            </div>
            <div class="text-base font-black text-slate-900 dark:text-white font-mono">
              ${pData.sma} <span class="text-[10px] font-normal text-slate-500">(${pData.smaPct}%)</span>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  }

  function renderMonthlyStudentLineChart() {
    const container = document.getElementById('studentLineChartContainer');
    const legend = document.getElementById('studentChartLegend');
    if (!container || !monthlySantriStore) return;

    // 1. Ekstrak dan Urutkan Periode secara Kronologis (Bulan & Tahun)
    const rawKeys = Object.keys(monthlySantriStore);
    if (rawKeys.length === 0) {
      container.innerHTML = '<div class="py-12 text-center text-xs text-slate-400">Belum ada data periode untuk ditampilkan grafik.</div>';
      return;
    }

    const sortedKeys = rawKeys.slice().sort((a, b) => {
      const [mA, yA] = a.split('-').map(Number);
      const [mB, yB] = b.split('-').map(Number);
      if (yA !== yB) return yA - yB;
      return mA - mB;
    });

    const periodsData = sortedKeys.map((k, idx) => {
      const pObj = monthlySantriStore[k];
      const active = (pObj.students || []).filter(s => s.status !== 'Boyong');
      const total = active.length;
      const mts = active.filter(s => s.unit === 'MTs').length;
      const smp = active.filter(s => s.unit === 'SMP').length;
      const ma = active.filter(s => s.unit === 'MA').length;
      const sma = active.filter(s => s.unit === 'SMA').length;

      const mukim = active.filter(s => s.status === 'Mukim Reguler' || s.status === 'Mukim VIP').length;
      const nonMukim = active.filter(s => s.status === 'Non Mukim').length;

      const mukimPct = total > 0 ? Number(((mukim / total) * 100).toFixed(1)) : 0;
      const nonMukimPct = total > 0 ? Number(((nonMukim / total) * 100).toFixed(1)) : 0;

      // Alih status mondok ke bajak & mutasi per unit
      let alihMondokToNon = 0;
      let prevTotal = total;
      let prevMukim = mukim;
      let prevNon = nonMukim;
      let prevMts = mts, prevSmp = smp, prevMa = ma, prevSma = sma;
      let mtsBoyong = 0, smpBoyong = 0, maBoyong = 0, smaBoyong = 0;
      let mtsMasuk = 0, smpMasuk = 0, maMasuk = 0, smaMasuk = 0;

      if (idx > 0) {
        const prevK = sortedKeys[idx - 1];
        const prevObj = monthlySantriStore[prevK];
        if (prevObj && prevObj.students) {
          const prevActive = prevObj.students.filter(s => s.status !== 'Boyong');
          prevTotal = prevActive.length;
          prevMukim = prevActive.filter(s => s.status === 'Mukim Reguler' || s.status === 'Mukim VIP').length;
          prevNon = prevActive.filter(s => s.status === 'Non Mukim').length;
          prevMts = prevActive.filter(s => s.unit === 'MTs').length;
          prevSmp = prevActive.filter(s => s.unit === 'SMP').length;
          prevMa  = prevActive.filter(s => s.unit === 'MA').length;
          prevSma = prevActive.filter(s => s.unit === 'SMA').length;

          if (prevActive.some(s => s.reg && String(s.reg).trim() !== '')) {
            const prevActiveMap = new Map();
            prevActive.forEach(s => {
              if (s.reg && String(s.reg).trim() !== '') {
                prevActiveMap.set(String(s.reg).trim(), s);
              }
            });

            const currActiveMap = new Map();
            active.forEach(s => {
              if (s.reg && String(s.reg).trim() !== '') {
                currActiveMap.set(String(s.reg).trim(), s);
              }
            });

            active.forEach(s => {
              if (s.reg && String(s.reg).trim() !== '' && s.status === 'Non Mukim') {
                const prevS = prevActiveMap.get(String(s.reg).trim());
                if (prevS && (prevS.status === 'Mukim Reguler' || prevS.status === 'Mukim VIP')) {
                  alihMondokToNon++;
                }
              }
            });

            prevActive.forEach(s => {
              const regStr = s.reg ? String(s.reg).trim() : '';
              if (regStr && !currActiveMap.has(regStr)) {
                if (s.unit === 'MTs') mtsBoyong++;
                else if (s.unit === 'SMP') smpBoyong++;
                else if (s.unit === 'MA') maBoyong++;
                else if (s.unit === 'SMA') smaBoyong++;
              }
            });

            active.forEach(s => {
              const regStr = s.reg ? String(s.reg).trim() : '';
              if (regStr && !prevActiveMap.has(regStr)) {
                if (s.unit === 'MTs') mtsMasuk++;
                else if (s.unit === 'SMP') smpMasuk++;
                else if (s.unit === 'MA') maMasuk++;
                else if (s.unit === 'SMA') smaMasuk++;
              }
            });
          }
        }
      }

      const mukimDelta = idx === 0 ? 0 : mukim - prevMukim;
      const nonMukimDelta = idx === 0 ? 0 : nonMukim - prevNon;
      const totalDelta = idx === 0 ? 0 : total - prevTotal;

      const mtsDelta = idx === 0 ? 0 : mts - prevMts;
      const smpDelta = idx === 0 ? 0 : smp - prevSmp;
      const maDelta  = idx === 0 ? 0 : ma - prevMa;
      const smaDelta = idx === 0 ? 0 : sma - prevSma;

      if (mtsBoyong === 0 && mtsDelta < 0) mtsBoyong = Math.abs(mtsDelta);
      if (smpBoyong === 0 && smpDelta < 0) smpBoyong = Math.abs(smpDelta);
      if (maBoyong === 0 && maDelta < 0) maBoyong = Math.abs(maDelta);
      if (smaBoyong === 0 && smaDelta < 0) smaBoyong = Math.abs(smaDelta);

      if (mtsMasuk === 0 && mtsDelta > 0) mtsMasuk = mtsDelta;
      if (smpMasuk === 0 && smpDelta > 0) smpMasuk = smpDelta;
      if (maMasuk === 0 && maDelta > 0) maMasuk = maDelta;
      if (smaMasuk === 0 && smaDelta > 0) smaMasuk = smaDelta;

      const mukimDeltaPct = prevMukim > 0 ? ((mukimDelta / prevMukim) * 100).toFixed(1) : '0.0';
      const alihPct = prevMukim > 0 ? ((alihMondokToNon / prevMukim) * 100).toFixed(1) : '0.0';

      return {
        key: k,
        label: pObj.label || k,
        shortLabel: formatShortPeriodLabel(k),
        total,
        totalDelta,
        mts, smp, ma, sma,
        mtsDelta, smpDelta, maDelta, smaDelta,
        mtsBoyong, smpBoyong, maBoyong, smaBoyong,
        mtsMasuk, smpMasuk, maMasuk, smaMasuk,
        mukim, nonMukim,
        mukimPct, nonMukimPct,
        mukimDelta, nonMukimDelta, mukimDeltaPct,
        alihMondokToNon, alihPct,
        mtsPct: total > 0 ? Number(((mts / total) * 100).toFixed(1)) : 0,
        smpPct: total > 0 ? Number(((smp / total) * 100).toFixed(1)) : 0,
        maPct: total > 0 ? Number(((ma / total) * 100).toFixed(1)) : 0,
        smaPct: total > 0 ? Number(((sma / total) * 100).toFixed(1)) : 0
      };
    });

    computedPeriodsCache = {};
    periodsData.forEach(d => { computedPeriodsCache[d.key] = d; });
    periodsDataCache = periodsData;

    // 2. Render Legend Pills Ringkas & Bersih
    if (legend) {
      const latest = periodsData[periodsData.length - 1] || {};

      if (currentStudentChartMode === 'TOTAL') {
        legend.innerHTML = `
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 font-bold text-[11px]">
            <span class="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-xs"></span>
            <span>Total: ${latest.total || 0} Siswa</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold text-[11px]">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Mondok: ${latest.mukim || 0} (${latest.mukimPct || 0}%)</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 font-bold text-[11px]">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Bajak: ${latest.nonMukim || 0} (${latest.nonMukimPct || 0}%)</span>
          </div>
          <span class="text-xs text-slate-400 hidden sm:inline">• Klik titik bulan pada grafik atau tab di bawah untuk melihat rincian</span>
        `;
      } else if (currentStudentChartMode === 'MUKIM_LAJU') {
        legend.innerHTML = `
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-700 text-teal-800 dark:text-teal-200 font-black text-[11px]">
            <span class="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-xs"></span>
            <span>Mondok (Mukim): ${latest.mukim || 0} (${latest.mukimPct || 0}%)</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 font-black text-[11px]">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs"></span>
            <span>Bajak (Non-Mukim): ${latest.nonMukim || 0} (${latest.nonMukimPct || 0}%)</span>
          </div>
        `;
      } else if (currentStudentChartMode === 'UNITS') {
        const isAll = activeUnitChartFocus === 'ALL';
        legend.innerHTML = `
          <button type="button" onclick="setUnitChartFocus('ALL')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold cursor-pointer transition-all ${isAll ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}">
            <span>Semua Unit</span>
          </button>
          <button type="button" onclick="setUnitChartFocus('MTs')" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold cursor-pointer transition-all ${activeUnitChartFocus === 'MTs' ? 'ring-2 ring-emerald-500 shadow-xs scale-105' : ''} bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>MTs: ${latest.mts || 0}</span>
          </button>
          <button type="button" onclick="setUnitChartFocus('SMP')" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold cursor-pointer transition-all ${activeUnitChartFocus === 'SMP' ? 'ring-2 ring-sky-500 shadow-xs scale-105' : ''} bg-sky-50 dark:bg-sky-950/70 border border-sky-300 dark:border-sky-700 text-sky-800 dark:text-sky-200">
            <span class="w-2 h-2 rounded-full bg-sky-500"></span>
            <span>SMP: ${latest.smp || 0}</span>
          </button>
          <button type="button" onclick="setUnitChartFocus('MA')" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold cursor-pointer transition-all ${activeUnitChartFocus === 'MA' ? 'ring-2 ring-amber-500 shadow-xs scale-105' : ''} bg-amber-50 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>MA: ${latest.ma || 0}</span>
          </button>
          <button type="button" onclick="setUnitChartFocus('SMA')" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold cursor-pointer transition-all ${activeUnitChartFocus === 'SMA' ? 'ring-2 ring-orange-500 shadow-xs scale-105' : ''} bg-orange-50 dark:bg-orange-950/70 border border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-200">
            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>SMA: ${latest.sma || 0}</span>
          </button>
        `;
      } else if (currentStudentChartMode === 'MUTASI_UNITS') {
        const isAll = activeUnitChartFocus === 'ALL';
        legend.innerHTML = `
          <button type="button" onclick="setUnitChartFocus('ALL')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold cursor-pointer transition-all ${isAll ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}">
            <span>Semua Unit</span>
          </button>
          <span class="text-xs text-slate-400 hidden lg:inline">• Garis di atas 0 = Masuk, garis di bawah 0 = Keluar / Boyong</span>
        `;
      } else {
        legend.innerHTML = `
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-[10.5px] font-bold">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>MTs: ${latest.mtsPct || 0}%</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-200 text-[10.5px] font-bold">
            <span class="w-2 h-2 rounded-full bg-sky-500"></span>
            <span>SMP: ${latest.smpPct || 0}%</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-[10.5px] font-bold">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>MA: ${latest.maPct || 0}%</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200 text-[10.5px] font-bold">
            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>SMA: ${latest.smaPct || 0}%</span>
          </div>
        `;
      }
    }

    // 3. Setup SVG Canvas: Luas, Bersih, dan Sederhana
    const padL = 80;
    const padR = 60;
    const padT = 28;
    const padB = 30;
    const svgW = 780;
    const svgH = 226;
    const plotW = svgW - padL - padR; // 640px
    const plotH = svgH - padT - padB; // 168px

    const count = periodsData.length;
    const getX = (idx) => count === 1 ? padL + plotW / 2 : padL + (idx / (count - 1)) * plotW;
    getXCache = getX;

    let svgInner = '';

    // Defs for Gradients & Filters
    svgInner += `
      <defs>
        <linearGradient id="gradAreaTeal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0d9488" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#0d9488" stop-opacity="0.0" />
        </linearGradient>
        <linearGradient id="gradAreaEmerald" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.14" />
          <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
        </linearGradient>
        <filter id="glowTeal" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0d9488" flood-opacity="0.30" />
        </filter>
        <filter id="glowEmerald" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#10b981" flood-opacity="0.30" />
        </filter>
        <filter id="glowAmber" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#f59e0b" flood-opacity="0.30" />
        </filter>
        <filter id="glowSky" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#0284c7" flood-opacity="0.30" />
        </filter>
        <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#f97316" flood-opacity="0.30" />
        </filter>
      </defs>
    `;

    // Visual Elements Layer (Wrapped with pointer-events="none" to prevent micro-jitter)
    svgInner += '<g pointer-events="none">';

    if (currentStudentChartMode === 'TOTAL') {
      // MODE UTAMA (TOTAL & MONDOK): KURVA BERSIH & SEDERHANA TANPA KEBINGUNGAN
      const yMin = 120;
      const yMax = 830;
      const getY = (val) => padT + (1 - (val - yMin) / (yMax - yMin)) * plotH;

      for (let val = 200; val <= 800; val += 200) {
        const yPos = getY(val);
        svgInner += `
          <line x1="${padL}" y1="${yPos}" x2="${svgW - padR}" y2="${yPos}" stroke="currentColor" class="text-slate-200 dark:text-slate-800" stroke-width="1" stroke-dasharray="3,3" />
          <text x="${padL - 10}" y="${yPos + 3.5}" text-anchor="end" class="fill-slate-400 dark:fill-slate-500 font-mono text-[10px] font-bold">${val}</text>
        `;
      }

      const totalPoints = periodsData.map((d, idx) => ({ x: getX(idx), y: getY(d.total), val: d.total, d }));
      const totalLineD = totalPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
      const totalAreaD = `${totalLineD} L ${totalPoints[totalPoints.length - 1].x.toFixed(1)} ${padT + plotH} L ${totalPoints[0].x.toFixed(1)} ${padT + plotH} Z`;

      const mukimPoints = periodsData.map((d, idx) => ({ x: getX(idx), y: getY(d.mukim), val: d.mukim, d }));
      const mukimLineD = mukimPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
      const mukimAreaD = `${mukimLineD} L ${mukimPoints[mukimPoints.length - 1].x.toFixed(1)} ${padT + plotH} L ${mukimPoints[0].x.toFixed(1)} ${padT + plotH} Z`;

      const bajakPoints = periodsData.map((d, idx) => ({ x: getX(idx), y: getY(d.nonMukim), val: d.nonMukim, d }));
      const bajakLineD = bajakPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

      // Render Area Fills
      svgInner += `<path d="${totalAreaD}" fill="url(#gradAreaTeal)" />`;
      svgInner += `<path d="${mukimAreaD}" fill="url(#gradAreaEmerald)" />`;

      // Render Clean Lines
      svgInner += `<path d="${totalLineD}" fill="none" stroke="#0d9488" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowTeal)" />`;
      svgInner += `<path d="${mukimLineD}" fill="none" stroke="#10b981" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowEmerald)" />`;
      svgInner += `<path d="${bajakLineD}" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowAmber)" stroke-dasharray="4,3" />`;

      // 1. Bajak Points & Tags (Simpel & Rapi)
      bajakPoints.forEach((p) => {
        svgInner += `
          <circle cx="${p.x}" cy="${p.y}" r="4" fill="#ffffff" stroke="#f59e0b" stroke-width="2.2" />
          <rect x="${p.x - 30}" y="${p.y - 19}" width="60" height="15" rx="3" class="fill-amber-900/90 dark:fill-amber-950/95" />
          <text x="${p.x}" y="${p.y - 8.5}" text-anchor="middle" class="fill-amber-200 font-mono font-bold text-[9px]">${p.val} Bajak</text>
        `;
      });

      // 2. Mondok Points & Tags (Simpel & Rapi)
      mukimPoints.forEach((p) => {
        svgInner += `
          <circle cx="${p.x}" cy="${p.y}" r="4.2" fill="#ffffff" stroke="#10b981" stroke-width="2.4" />
          <rect x="${p.x - 34}" y="${p.y - 21}" width="68" height="16" rx="3.5" class="fill-emerald-800/90 dark:fill-emerald-950/95" />
          <text x="${p.x}" y="${p.y - 9.5}" text-anchor="middle" class="fill-emerald-100 font-mono font-bold text-[9.5px]">${p.val} Mondok</text>
        `;
      });

      // 3. Total Siswa Points & Tags (Simpel & Rapi)
      totalPoints.forEach((p) => {
        svgInner += `
          <circle cx="${p.x}" cy="${p.y}" r="4.8" fill="#ffffff" stroke="#0d9488" stroke-width="2.6" />
          <rect x="${p.x - 32}" y="${p.y - 23}" width="64" height="16" rx="3.5" class="fill-slate-900/90 dark:fill-slate-100/95 shadow-xs" />
          <text x="${p.x}" y="${p.y - 11}" text-anchor="middle" class="fill-white dark:fill-slate-900 font-mono font-bold text-[9.5px]">${p.val} Siswa</text>
        `;
      });

      // 4. Render X-Axis Month Labels
      periodsData.forEach((d, idx) => {
        const cx = getX(idx);
        const isSelected = d.key === selectedPeriodTabKey;
        svgInner += `
          <g>
            <rect x="${cx - 26}" y="${padT + plotH + 8}" width="52" height="18" rx="4" fill="${isSelected ? '#0d9488' : '#f1f5f9'}" class="${isSelected ? '' : 'dark:fill-slate-800/90'} shadow-2xs" />
            <text x="${cx}" y="${padT + plotH + 20.5}" text-anchor="middle" fill="${isSelected ? '#ffffff' : 'currentColor'}" class="${isSelected ? 'font-black text-[10px]' : 'fill-slate-700 dark:fill-slate-200 font-bold text-[10px]'}">${d.shortLabel}</text>
          </g>
        `;
      });

    } else if (currentStudentChartMode === 'MUKIM_LAJU') {
      // MODE MONDOK VS BAJAK: 2 GARIS SIMPEL
      const yMin = 150;
      const yMax = 630;
      const getY = (val) => padT + (1 - (val - yMin) / (yMax - yMin)) * plotH;

      for (let val = 200; val <= 600; val += 100) {
        const yPos = getY(val);
        svgInner += `
          <line x1="${padL}" y1="${yPos}" x2="${svgW - padR}" y2="${yPos}" stroke="currentColor" class="text-slate-200 dark:text-slate-800" stroke-width="1" stroke-dasharray="3,3" />
          <text x="${padL - 10}" y="${yPos + 3.5}" text-anchor="end" class="fill-slate-400 dark:fill-slate-500 font-mono text-[10px] font-bold">${val}</text>
        `;
      }

      const mukimPoints = periodsData.map((d, idx) => ({ x: getX(idx), y: getY(d.mukim), val: d.mukim, d }));
      const nonPoints = periodsData.map((d, idx) => ({ x: getX(idx), y: getY(d.nonMukim), val: d.nonMukim, d }));

      const mukimLineD = mukimPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
      const mukimAreaD = `${mukimLineD} L ${mukimPoints[mukimPoints.length - 1].x.toFixed(1)} ${padT + plotH} L ${mukimPoints[0].x.toFixed(1)} ${padT + plotH} Z`;
      const nonLineD = nonPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

      svgInner += `<path d="${mukimAreaD}" fill="url(#gradAreaTeal)" />`;
      svgInner += `<path d="${mukimLineD}" fill="none" stroke="#0d9488" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowTeal)" />`;
      svgInner += `<path d="${nonLineD}" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowAmber)" />`;

      mukimPoints.forEach((p) => {
        svgInner += `
          <circle cx="${p.x}" cy="${p.y}" r="4.2" fill="#ffffff" stroke="#0d9488" stroke-width="2.4" />
          <rect x="${p.x - 34}" y="${p.y - 21}" width="68" height="16" rx="3" class="fill-teal-900/90 dark:fill-teal-950/95" />
          <text x="${p.x}" y="${p.y - 9.5}" text-anchor="middle" class="fill-teal-100 font-mono font-bold text-[9px]">${p.val} Mondok</text>
        `;
      });

      nonPoints.forEach((p) => {
        svgInner += `
          <circle cx="${p.x}" cy="${p.y}" r="4" fill="#ffffff" stroke="#f59e0b" stroke-width="2.2" />
          <rect x="${p.x - 30}" y="${p.y - 19}" width="60" height="15" rx="3" class="fill-amber-900/85 dark:fill-amber-950/95" />
          <text x="${p.x}" y="${p.y - 8.5}" text-anchor="middle" class="fill-amber-200 font-mono font-bold text-[8.5px]">${p.val} Bajak</text>
        `;
      });

      periodsData.forEach((d, idx) => {
        const cx = getX(idx);
        const isSelected = d.key === selectedPeriodTabKey;
        svgInner += `
          <g>
            <rect x="${cx - 26}" y="${padT + plotH + 8}" width="52" height="18" rx="4" fill="${isSelected ? '#0d9488' : '#f1f5f9'}" class="${isSelected ? '' : 'dark:fill-slate-800/90'} shadow-2xs" />
            <text x="${cx}" y="${padT + plotH + 20.5}" text-anchor="middle" fill="${isSelected ? '#ffffff' : 'currentColor'}" class="${isSelected ? 'font-black text-[10px]' : 'fill-slate-700 dark:fill-slate-200 font-bold text-[10px]'}">${d.shortLabel}</text>
          </g>
        `;
      });

    } else if (currentStudentChartMode === 'UNITS') {
      // MODE KURVA 4 UNIT (SEDERHANA DENGAN WARNA UNIT RESMI)
      const allCounts = periodsData.flatMap(d => [d.mts, d.smp, d.ma, d.sma]);
      const minCount = Math.min(...allCounts);
      const maxCount = Math.max(...allCounts);
      
      const yMin = Math.max(80, Math.floor((minCount - 20) / 40) * 40);
      const yMax = Math.ceil((maxCount + 20) / 40) * 40;
      const getY = (val) => padT + (1 - (val - yMin) / (yMax - yMin)) * plotH;

      const step = (yMax - yMin) <= 160 ? 40 : 50;
      for (let val = yMin; val <= yMax; val += step) {
        const yPos = getY(val);
        svgInner += `
          <line x1="${padL}" y1="${yPos}" x2="${svgW - padR}" y2="${yPos}" stroke="currentColor" class="text-slate-200 dark:text-slate-800" stroke-width="1" stroke-dasharray="${val === yMin ? '' : '3,3'}" />
          <text x="${padL - 10}" y="${yPos + 3.5}" text-anchor="end" class="fill-slate-400 dark:fill-slate-500 font-mono text-[10px] font-bold">${val}</text>
        `;
      }

      const units = [
        { key: 'mts', name: 'MTs', color: '#10b981', glow: 'glowEmerald' },
        { key: 'smp', name: 'SMP', color: '#0284c7', glow: 'glowSky' },
        { key: 'ma',  name: 'MA',  color: '#f59e0b', glow: 'glowAmber' },
        { key: 'sma', name: 'SMA', color: '#f97316', glow: 'glowOrange' }
      ];

      units.forEach(u => {
        const isFocused = activeUnitChartFocus === 'ALL' || activeUnitChartFocus === u.name;
        const opacity = isFocused ? '1' : '0.18';
        const strokeW = isFocused ? (activeUnitChartFocus === u.name ? '3.5' : '2.6') : '1.5';
        const filterStr = isFocused ? `filter="url(#${u.glow})"` : '';

        const points = periodsData.map((d, idx) => ({ 
          x: getX(idx), 
          y: getY(d[u.key]), 
          val: d[u.key], 
          d 
        }));
        const lineD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

        svgInner += `<path d="${lineD}" fill="none" stroke="${u.color}" stroke-width="${strokeW}" opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round" ${filterStr} class="transition-all duration-300" />`;

        points.forEach((p) => {
          const isAbove = u.key === 'mts' || u.key === 'smp';
          const rectY = isAbove ? p.y - 19 : p.y + 6;
          const textY = isAbove ? p.y - 9.5 : p.y + 16;

          svgInner += `
            <circle cx="${p.x}" cy="${p.y}" r="${isFocused ? (activeUnitChartFocus === u.name ? 4.5 : 3.5) : 2.5}" fill="#ffffff" stroke="${u.color}" stroke-width="${isFocused ? 2.5 : 1.5}" opacity="${opacity}" />
            <g opacity="${opacity}">
              <rect x="${p.x - 20}" y="${rectY}" width="40" height="14" rx="3" fill="${u.color}" fill-opacity="0.92" />
              <text x="${p.x}" y="${textY}" text-anchor="middle" fill="#ffffff" class="font-mono font-black text-[8.5px]">${p.val} ${u.name}</text>
            </g>
          `;
        });
      });

      periodsData.forEach((d, idx) => {
        const cx = getX(idx);
        const isSelected = d.key === selectedPeriodTabKey;
        svgInner += `
          <g>
            <rect x="${cx - 26}" y="${padT + plotH + 8}" width="52" height="18" rx="4" fill="${isSelected ? '#0d9488' : '#f1f5f9'}" class="${isSelected ? '' : 'dark:fill-slate-800/90'} shadow-2xs" />
            <text x="${cx}" y="${padT + plotH + 20.5}" text-anchor="middle" fill="${isSelected ? '#ffffff' : 'currentColor'}" class="${isSelected ? 'font-black text-[10px]' : 'fill-slate-700 dark:fill-slate-200 font-bold text-[10px]'}">${d.shortLabel}</text>
          </g>
        `;
      });

    } else if (currentStudentChartMode === 'MUTASI_UNITS') {
      // MODE ARUS MUTASI KELUAR / MASUK 4 UNIT
      const allDeltas = periodsData.flatMap(d => [d.mtsDelta, d.smpDelta, d.maDelta, d.smaDelta]);
      const minDelta = Math.min(...allDeltas, -6);
      const maxDelta = Math.max(...allDeltas, 3);
      
      const yMin = Math.floor(minDelta - 1);
      const yMax = Math.ceil(maxDelta + 1);
      const getY = (val) => padT + (1 - (val - yMin) / (yMax - yMin)) * plotH;
      const yZero = getY(0);

      svgInner += `
        <rect x="${padL}" y="${padT}" width="${plotW}" height="${yZero - padT}" fill="#10b981" fill-opacity="0.04" />
        <rect x="${padL}" y="${yZero}" width="${plotW}" height="${padT + plotH - yZero}" fill="#e11d48" fill-opacity="0.04" />
        <text x="${padL + 8}" y="${padT + 12}" class="fill-emerald-600/70 dark:fill-emerald-400/70 font-bold text-[9px] uppercase tracking-wider">▲ Zona Masuk (Penambahan)</text>
        <text x="${padL + 8}" y="${padT + plotH - 6}" class="fill-rose-600/70 dark:fill-rose-400/70 font-bold text-[9px] uppercase tracking-wider">▼ Zona Boyong (Pengurangan)</text>
      `;

      // Garis Netral Nol
      svgInner += `
        <line x1="${padL}" y1="${yZero}" x2="${svgW - padR}" y2="${yZero}" stroke="currentColor" class="text-slate-400 dark:text-slate-500" stroke-width="1.8" />
        <text x="${padL - 10}" y="${yZero + 3.5}" text-anchor="end" class="fill-slate-600 dark:fill-slate-300 font-mono font-black text-[10px]">0 Tetap</text>
      `;

      const units = [
        { key: 'mts', name: 'MTs', color: '#10b981', glow: 'glowEmerald' },
        { key: 'smp', name: 'SMP', color: '#0284c7', glow: 'glowSky' },
        { key: 'ma',  name: 'MA',  color: '#f59e0b', glow: 'glowAmber' },
        { key: 'sma', name: 'SMA', color: '#f97316', glow: 'glowOrange' }
      ];

      units.forEach(u => {
        const isFocused = activeUnitChartFocus === 'ALL' || activeUnitChartFocus === u.name;
        const opacity = isFocused ? '1' : '0.18';
        const strokeW = isFocused ? (activeUnitChartFocus === u.name ? '3.5' : '2.6') : '1.5';
        const filterStr = isFocused ? `filter="url(#${u.glow})"` : '';

        const points = periodsData.map((d, idx) => ({ 
          x: getX(idx), 
          y: getY(d[u.key + 'Delta']), 
          val: d[u.key + 'Delta'], 
          d 
        }));
        const lineD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

        svgInner += `<path d="${lineD}" fill="none" stroke="${u.color}" stroke-width="${strokeW}" opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round" ${filterStr} class="transition-all duration-300" />`;

        points.forEach((p) => {
          const isAbove = u.key === 'mts' || u.key === 'smp';
          const rectY = isAbove ? p.y - 19 : p.y + 6;
          const textY = isAbove ? p.y - 9.5 : p.y + 16;
          const badgeBg = p.val < 0 ? '#e11d48' : (p.val > 0 ? '#059669' : u.color);
          const badgeText = p.val < 0 ? `▼${p.val}` : (p.val > 0 ? `▲+${p.val}` : '0');

          svgInner += `
            <circle cx="${p.x}" cy="${p.y}" r="${isFocused ? 4 : 2.5}" fill="#ffffff" stroke="${u.color}" stroke-width="${isFocused ? 2.5 : 1.5}" opacity="${opacity}" />
            <g opacity="${opacity}">
              <rect x="${p.x - 20}" y="${rectY}" width="40" height="14" rx="3" fill="${badgeBg}" fill-opacity="0.95" />
              <text x="${p.x}" y="${textY}" text-anchor="middle" fill="#ffffff" class="font-mono font-black text-[8.5px]">${u.name} ${badgeText}</text>
            </g>
          `;
        });
      });

      periodsData.forEach((d, idx) => {
        const cx = getX(idx);
        const isSelected = d.key === selectedPeriodTabKey;
        svgInner += `
          <g>
            <rect x="${cx - 26}" y="${padT + plotH + 8}" width="52" height="18" rx="4" fill="${isSelected ? '#0d9488' : '#f1f5f9'}" class="${isSelected ? '' : 'dark:fill-slate-800/90'} shadow-2xs" />
            <text x="${cx}" y="${padT + plotH + 20.5}" text-anchor="middle" fill="${isSelected ? '#ffffff' : 'currentColor'}" class="${isSelected ? 'font-black text-[10px]' : 'fill-slate-700 dark:fill-slate-200 font-bold text-[10px]'}">${d.shortLabel}</text>
          </g>
        `;
      });

    } else {
      // MODE PERSENTASE (%)
      const yMin = 0;
      const yMax = 50;
      const getY = (val) => padT + (1 - (val - yMin) / (yMax - yMin)) * plotH;

      for (let val = 0; val <= 50; val += 10) {
        const yPos = getY(val);
        svgInner += `
          <line x1="${padL}" y1="${yPos}" x2="${svgW - padR}" y2="${yPos}" stroke="currentColor" class="text-slate-200 dark:text-slate-800" stroke-width="1" stroke-dasharray="${val === 0 ? '' : '3,3'}" />
          <text x="${padL - 10}" y="${yPos + 3.5}" text-anchor="end" class="fill-slate-400 dark:fill-slate-500 font-mono text-[10px] font-bold">${val}%</text>
        `;
      }

      const units = [
        { key: 'mtsPct', name: 'MTs', color: '#10b981' },
        { key: 'smpPct', name: 'SMP', color: '#0284c7' },
        { key: 'maPct', name: 'MA', color: '#f59e0b' },
        { key: 'smaPct', name: 'SMA', color: '#f97316' }
      ];

      units.forEach(u => {
        const points = periodsData.map((d, idx) => ({ x: getX(idx), y: getY(d[u.key]), val: d[u.key], d }));
        const lineD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

        svgInner += `<path d="${lineD}" fill="none" stroke="${u.color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />`;

        points.forEach((p, idx) => {
          svgInner += `
            <circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#ffffff" stroke="${u.color}" stroke-width="2" />
            <text x="${p.x + (idx === points.length - 1 ? -6 : 6)}" y="${p.y - 6}" text-anchor="${idx === points.length - 1 ? 'end' : 'start'}" fill="${u.color}" class="font-mono font-bold text-[9px]">${p.val}%</text>
          `;
        });
      });

      periodsData.forEach((d, idx) => {
        const cx = getX(idx);
        const isSelected = d.key === selectedPeriodTabKey;
        svgInner += `
          <g>
            <rect x="${cx - 26}" y="${padT + plotH + 8}" width="52" height="18" rx="4" fill="${isSelected ? '#0d9488' : '#f1f5f9'}" class="${isSelected ? '' : 'dark:fill-slate-800/90'} shadow-2xs" />
            <text x="${cx}" y="${padT + plotH + 20.5}" text-anchor="middle" fill="${isSelected ? '#ffffff' : 'currentColor'}" class="${isSelected ? 'font-black text-[10px]' : 'fill-slate-700 dark:fill-slate-200 font-bold text-[10px]'}">${d.shortLabel}</text>
          </g>
        `;
      });
    }

    svgInner += '</g>';

    // 4. OVERLAY HITBOX INTERAKTIF (KLIK TITIK BULAN LANGSUNG MENGAKTIFKAN TAB PEMISAH RINCIAN)
    svgInner += '<g class="chart-hitboxes-layer">';
    periodsData.forEach((d, idx) => {
      const cx = getX(idx);
      const colLeft = idx === 0 ? padL : (getX(idx - 1) + cx) / 2;
      const colRight = idx === count - 1 ? (svgW - padR) : (cx + getX(idx + 1)) / 2;
      const colW = colRight - colLeft;
      const isSelected = d.key === selectedPeriodTabKey;

      svgInner += `
        <g class="cursor-pointer" 
           onclick="selectChartPeriodTab('${d.key}')"
           title="Klik untuk buka rincian ${d.label}"
        >
          <!-- Hitbox transparan kolom penuh -->
          <rect x="${colLeft}" y="${padT - 14}" width="${colW}" height="${plotH + 42}" fill="transparent" />
          <!-- Garis panduan vertikal pada bulan yang aktif -->
          <line id="studentChartGuide_${d.key}" x1="${cx}" y1="${padT - 8}" x2="${cx}" y2="${padT + plotH + 6}" 
            stroke="#0d9488" 
            stroke-width="2" 
            stroke-dasharray="3,3" 
            opacity="${isSelected ? '1' : '0'}" 
            pointer-events="none" 
            class="transition-opacity duration-150" 
          />
        </g>
      `;
    });
    svgInner += '</g>';

    container.innerHTML = `
      <svg viewBox="0 0 ${svgW} ${svgH}" class="w-full h-auto overflow-visible select-none max-h-[250px]" preserveAspectRatio="xMidYMid meet">
        ${svgInner}
      </svg>
    `;

    // 5. RENDER TAB PEMISAH BULAN & KARTU RINCIAN DATA LENGKAP
    renderPeriodTabsUI();
    if (!selectedPeriodTabKey || !periodsData.some(d => d.key === selectedPeriodTabKey)) {
      selectedPeriodTabKey = currentPeriodKey || periodsData[periodsData.length - 1].key;
    }
    renderSelectedPeriodDetail(selectedPeriodTabKey);

    // 6. RENDER TABEL MATRIKS TREN BULANAN
    const trendTbody = document.getElementById('monthlyTrendTableBody');
    if (trendTbody) {
      let tRows = '';
      periodsData.forEach((d, idx) => {
        const mukimSign = d.mukimDelta > 0 ? '+' : (d.mukimDelta < 0 ? '-' : '');
        const mukimFluktuasi = idx === 0 
          ? '<span class="text-slate-400 font-normal">Awal</span>' 
          : (d.mukimDelta !== 0 
            ? `<span class="${d.mukimDelta > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} font-bold">(${mukimSign}${Math.abs(d.mukimDelta)} / ${d.mukimDeltaPct}%)</span>` 
            : '<span class="text-slate-400 font-normal">(Tetap)</span>');

        const nonSign = d.nonMukimDelta > 0 ? '+' : (d.nonMukimDelta < 0 ? '-' : '');
        const nonFluktuasi = idx === 0
          ? '<span class="text-slate-400 font-normal">Awal</span>'
          : (d.nonMukimDelta !== 0
            ? `<span class="${d.nonMukimDelta > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} font-bold">(${nonSign}${Math.abs(d.nonMukimDelta)})</span>`
            : '<span class="text-slate-400 font-normal">(Tetap)</span>');

        const alihBadge = d.alihMondokToNon > 0
          ? `<button type="button" onclick="filterCompChanges('PINDAH_NON')" class="px-2 py-0.5 rounded-[4px] bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700 font-black text-[10.5px] cursor-pointer inline-flex items-center gap-1 shadow-2xs" title="Klik untuk lihat santri yang pindah mondok ke bajak"><i data-lucide="arrow-right-left" class="w-2.5 h-2.5"></i> ${d.alihMondokToNon} Santri (${d.alihPct}%)</button>`
          : '<span class="text-slate-400 text-[10.5px]">-</span>';

        let keterangan = '<span class="text-slate-500">Master Data Awal</span>';
        if (d.key === '10-2026') keterangan = '<span class="text-rose-600 dark:text-rose-400 font-bold">8 Santri Boyong • 1 Alih Mondok ➔ Bajak (Fiks Pedoman)</span>';
        else if (d.key === '09-2026') keterangan = '<span class="text-slate-600 dark:text-slate-300">Validasi Data Santri (754 Siswa)</span>';
        else if (d.key === '11-2026') keterangan = '<span class="text-teal-600 dark:text-teal-400 font-bold">Draf Rapat Lanjutan</span>';
        else if (d.totalDelta !== 0) keterangan = `<span class="text-slate-500 font-normal">${d.totalDelta > 0 ? 'Kenaikan +' : 'Penurunan '}${d.totalDelta} siswa</span>`;

        const isCurrent = d.key === currentPeriodKey;
        tRows += `
          <tr class="${isCurrent ? 'bg-teal-50/50 dark:bg-teal-950/30 font-bold' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'} transition-colors cursor-pointer" onclick="selectChartPeriodTab('${d.key}')">
            <td class="py-2.5 px-2.5 text-left font-bold text-slate-800 dark:text-slate-200">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full ${isCurrent ? 'bg-teal-500 animate-pulse' : 'bg-slate-300'}"></span>
                <span>${d.label}</span>
                ${isCurrent ? '<span class="text-[9px] px-1.5 py-0.2 rounded bg-teal-600 text-white font-bold ml-1">Aktif</span>' : ''}
              </div>
            </td>
            <td class="py-2.5 px-2 font-black text-slate-900 dark:text-white font-mono">${d.total}</td>
            <td class="py-2.5 px-2 font-mono text-teal-700 dark:text-teal-300 font-bold">
              ${d.mukim} <span class="text-[10px] text-slate-500 font-normal">(${d.mukimPct}%)</span> ${mukimFluktuasi}
            </td>
            <td class="py-2.5 px-2 font-mono text-amber-700 dark:text-amber-300 font-bold">
              ${d.nonMukim} <span class="text-[10px] text-slate-500 font-normal">(${d.nonMukimPct}%)</span> ${nonFluktuasi}
            </td>
            <td class="py-2.5 px-2">
              ${alihBadge}
            </td>
            <td class="py-2.5 px-2.5 text-left text-[11px]">
              ${keterangan}
            </td>
          </tr>
        `;
      });
      trendTbody.innerHTML = tRows;
    }

    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  }

  function formatShortPeriodLabel(key) {
    if (key === '00-2026' || key.startsWith('00-')) return 'Awal Thn';
    const parts = key.split('-');
    const m = Number(parts[0]);
    const y = parts[1] ? parts[1].slice(2) : '26';
    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${monthNames[m] || 'Bln'} '${y}`;
  }

  // Fallback no-op for legacy tooltips
  function showStudentChartTooltip(key, svgX, isClick) {
    if (key) selectChartPeriodTab(key);
  }

  function hideStudentChartTooltip() {
    // No-op to avoid flickering
  }

  function unpinStudentChartTooltip() {
    // No-op
  }

  function downloadBeritaAcaraRapatExcel() {
    if (typeof XLSX === 'undefined') {
      alert('Pustaka SheetJS (XLSX) sedang dimuat, silakan coba beberapa saat lagi.');
      return;
    }

    const comp = latestComparisonResult || calculateMonthComparison(comparisonPeriodKey, currentPeriodKey);
    const wb = XLSX.utils.book_new();

    // Sheet 1: Berita Acara Rekonsiliasi Rapat
    const dateFormatted = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const baRows = [
      ['BERITA ACARA REKONSILIASI DATA REAL SANTRI'],
      ['YAYASAN TARBIYATUL PENDIDIKAN AGAMA ISLAM (YTPAI) RAUDLATUL MUTA\'ALLIMIN'],
      [`Periode Pencocokan: Bulan ${comp.targetLabel} (Dibandingkan: Bulan ${comp.baseLabel})`],
      [`Tanggal Rekonsiliasi Rapat: ${dateFormatted}`],
      [],
      ['RINGKASAN REKAPITULASI DATA PER UNIT'],
      ['No', 'Unit Pendidikan', `Siswa ${comp.baseLabel}`, `Siswa ${comp.targetLabel}`, 'Selisih (Net)', `Tagihan ${comp.targetLabel}`, 'Keterangan'],
    ];

    const unitKeys = ['MTs', 'SMP', 'MA', 'SMA'];
    unitKeys.forEach((uKey, idx) => {
      const u = comp.unitComparison[uKey];
      baRows.push([
        idx + 1,
        u.unit,
        u.baseCount,
        u.targetCount,
        u.deltaCount,
        u.targetBilling,
        u.deltaCount >= 0 ? `Bertambah ${u.deltaCount} santri` : `Berkurang ${Math.abs(u.deltaCount)} santri`
      ]);
    });

    baRows.push([
      '',
      'TOTAL YAYASAN',
      comp.totalBaseStudents,
      comp.totalTargetStudents,
      comp.netStudentDiff,
      comp.totalTargetBilling,
      `Netto: ${comp.netStudentDiff >= 0 ? '+' : ''}${comp.netStudentDiff} Siswa`
    ]);

    baRows.push([]);
    baRows.push(['MUTASI & PERUBAHAN SISWA HASIL RAPAT']);
    baRows.push(['Total Santri Baru Masuk (+)', comp.masukCount, 'Siswa']);
    baRows.push(['Total Santri Boyong / Keluar (-)', comp.boyongCount, 'Siswa']);
    baRows.push(['Total Pindah Status / Tarif', comp.pindahCount, 'Siswa']);
    baRows.push(['Dampak Perubahan Tagihan Junio', comp.totalBillingDiff, `(Netto Rp ${comp.totalBillingDiff.toLocaleString('id-ID')})`]);

    baRows.push([]);
    baRows.push(['PENGESAHAN & PERSETUJUAN BENDAHARA UNIT']);
    baRows.push(['Bendahara MTs', 'Bendahara SMP', 'Bendahara MA', 'Bendahara SMA', 'Bendahara Yayasan YTPAI']);
    baRows.push(['', '', '', '', '']);
    baRows.push(['', '', '', '', '']);
    baRows.push(['( ........................ )', '( ........................ )', '( ........................ )', '( ........................ )', '( ........................ )']);

    const wsBA = XLSX.utils.aoa_to_sheet(baRows);
    wsBA['!cols'] = [
      { wch: 6 },
      { wch: 22 },
      { wch: 18 },
      { wch: 18 },
      { wch: 16 },
      { wch: 20 },
      { wch: 30 }
    ];
    XLSX.utils.book_append_sheet(wb, wsBA, 'Berita Acara Rapat');

    // Sheet 2: Santri Masuk
    const masukRows = [
      ['DAFTAR SANTRI BARU MASUK'],
      [`Periode: Bulan ${comp.targetLabel}`],
      [],
      ['No', 'No. Registrasi', 'Nama Santri', 'Jenis Kelamin', 'Unit', 'Kelas', 'Status Mukim', 'Tagihan Bulanan', 'Keterangan']
    ];
    const masukList = comp.diffList.filter(d => d.type === 'MASUK');
    masukList.forEach((s, idx) => {
      masukRows.push([
        idx + 1,
        s.reg,
        s.nama,
        s.jk,
        s.unit,
        s.kelas,
        s.newStatus,
        s.newTariff,
        s.note
      ]);
    });
    const wsMasuk = XLSX.utils.aoa_to_sheet(masukRows);
    XLSX.utils.book_append_sheet(wb, wsMasuk, 'Santri Masuk');

    // Sheet 3: Santri Boyong
    const boyongRows = [
      ['DAFTAR SANTRI BOYONG / KELUAR'],
      [`Periode: Bulan ${comp.targetLabel}`],
      [],
      ['No', 'No. Registrasi', 'Nama Santri', 'Jenis Kelamin', 'Unit', 'Kelas', 'Status Terakhir', 'Tagihan Terakhir', 'Keterangan']
    ];
    const boyongList = comp.diffList.filter(d => d.type === 'BOYONG');
    boyongList.forEach((s, idx) => {
      boyongRows.push([
        idx + 1,
        s.reg,
        s.nama,
        s.jk,
        s.unit,
        s.kelas,
        s.oldStatus,
        s.oldTariff,
        s.note
      ]);
    });
    const wsBoyong = XLSX.utils.aoa_to_sheet(boyongRows);
    XLSX.utils.book_append_sheet(wb, wsBoyong, 'Santri Boyong');

    // Sheet 4: Pindah Status & Tarif
    const pindahRows = [
      ['DAFTAR PINDAH STATUS MUKIM & PERUBAHAN TARIF'],
      [`Periode: Bulan ${comp.targetLabel}`],
      [],
      ['No', 'No. Registrasi', 'Nama Santri', 'Unit', 'Kelas', 'Status Lama', 'Tarif Lama', 'Status Baru', 'Tarif Baru', 'Selisih Tarif', 'Keterangan']
    ];
    const pindahList = comp.diffList.filter(d => d.type === 'PINDAH_STATUS');
    pindahList.forEach((s, idx) => {
      pindahRows.push([
        idx + 1,
        s.reg,
        s.nama,
        s.unit,
        s.kelas,
        s.oldStatus,
        s.oldTariff,
        s.newStatus,
        s.newTariff,
        s.tariffDiff,
        s.note
      ]);
    });
    const wsPindah = XLSX.utils.aoa_to_sheet(pindahRows);
    XLSX.utils.book_append_sheet(wb, wsPindah, 'Pindah Status & Tarif');

    // Sheet 5-8: Data Santri Lengkap per Unit (Urut Kelas & Nama untuk Masing-masing Bendahara)
    const activeTargetStudents = sortSantriHierarchy(monthlySantriStore[currentPeriodKey]?.students || santriDataList);
    
    unitKeys.forEach(uKey => {
      const uStudents = activeTargetStudents.filter(s => s.unit === uKey);
      const uRows = [
        [`DAFTAR SANTRI REAL UNIT ${uKey}`],
        [`YAYASAN TARBIYATUL PENDIDIKAN AGAMA ISLAM (YTPAI) RAUDLATUL MUTA'ALLIMIN`],
        [`Periode Bulan: ${comp.targetLabel} | Total Santri Terdaftar: ${uStudents.length} Santri`],
        [`Format Resmi Rapat Rekonsiliasi Bendahara Unit ${uKey}`],
        [],
        ['No', 'No. Registrasi', 'Nama Lengkap Santri', 'Jenis Kelamin', 'Kelas', 'Status Mukim', 'Tagihan Bulanan (Rp)', 'Status Keaktifan', 'Alamat Lengkap']
      ];

      uStudents.forEach((s, idx) => {
        uRows.push([
          idx + 1,
          s.reg,
          s.nama,
          s.jk,
          s.kelas,
          s.status,
          s.bulanan || 0,
          s.status === 'Boyong' ? 'Non-Aktif (Boyong)' : 'Aktif',
          s.alamat || ''
        ]);
      });

      const wsUnit = XLSX.utils.aoa_to_sheet(uRows);
      wsUnit['!cols'] = [
        { wch: 6 },
        { wch: 16 },
        { wch: 32 },
        { wch: 14 },
        { wch: 8 },
        { wch: 18 },
        { wch: 20 },
        { wch: 18 },
        { wch: 35 }
      ];
      XLSX.utils.book_append_sheet(wb, wsUnit, `Siswa ${uKey}`);
    });

    const fileName = `Berita_Acara_Rekonsiliasi_Santri_${comp.targetKey}.xlsx`;
    XLSX.writeFile(wb, fileName);
    showToast('Berita Acara Diunduh', `Berkas ${fileName} berhasil diekspor (8 Sheet: Berita Acara, Mutasi, dan 4 Unit).`);
  }

  // --- MODAL CATAT MUTASI HANDLERS ---
  function openCatatMutasiModal() {
    const modal = document.getElementById('modalCatatMutasi');
    if (!modal) return;

    // Set tanggal default hari ini
    const dateInput = document.getElementById('mutasiTanggalInput');
    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);

    // Set periode default sesuai periode aktif
    const selPeriod = document.getElementById('santriPeriodeSelect');
    const mutPeriod = document.getElementById('mutasiPeriodeSelect');
    if (selPeriod && mutPeriod) mutPeriod.value = selPeriod.value;

    setMutasiType('MASUK');
    modal.classList.remove('hidden');
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
  }

  function closeCatatMutasiModal() {
    const modal = document.getElementById('modalCatatMutasi');
    if (modal) modal.classList.add('hidden');
    clearSelectedMutasiStudent();
  }

  function setMutasiType(type) {
    currentMutasiType = type;

    const btnMasuk = document.getElementById('btnMutTypeMasuk');
    const btnBoyong = document.getElementById('btnMutTypeBoyong');
    const btnPindah = document.getElementById('btnMutTypePindah');

    const secNew = document.getElementById('sectionMutasiNewStudent');
    const secSearch = document.getElementById('sectionMutasiSearchStudent');
    const secStatus = document.getElementById('sectionMutasiStatusSelect');

    // Reset button styles
    if (btnMasuk) btnMasuk.className = 'py-2 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex flex-col items-center gap-1 cursor-pointer transition-all hover:border-emerald-400';
    if (btnBoyong) btnBoyong.className = 'py-2 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex flex-col items-center gap-1 cursor-pointer transition-all hover:border-rose-400';
    if (btnPindah) btnPindah.className = 'py-2 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex flex-col items-center gap-1 cursor-pointer transition-all hover:border-amber-400';

    if (type === 'MASUK') {
      if (btnMasuk) btnMasuk.className = 'py-2 px-2 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-extrabold flex flex-col items-center gap-1 cursor-pointer transition-all';
      if (secNew) secNew.classList.remove('hidden');
      if (secSearch) secSearch.classList.add('hidden');
      if (secStatus) secStatus.classList.add('hidden');
    } else if (type === 'BOYONG') {
      if (btnBoyong) btnBoyong.className = 'py-2 px-2 rounded-xl border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-extrabold flex flex-col items-center gap-1 cursor-pointer transition-all';
      if (secNew) secNew.classList.add('hidden');
      if (secSearch) secSearch.classList.remove('hidden');
      if (secStatus) secStatus.classList.add('hidden');
    } else if (type === 'PINDAH_STATUS') {
      if (btnPindah) btnPindah.className = 'py-2 px-2 rounded-xl border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-extrabold flex flex-col items-center gap-1 cursor-pointer transition-all';
      if (secNew) secNew.classList.add('hidden');
      if (secSearch) secSearch.classList.remove('hidden');
      if (secStatus) secStatus.classList.remove('hidden');
    }
  }

  function searchMutasiStudent(q) {
    const resBox = document.getElementById('mutasiStudentSearchResults');
    if (!resBox) return;

    const term = (q || '').trim().toLowerCase();
    if (!term || term.length < 2) {
      resBox.classList.add('hidden');
      return;
    }

    const matches = santriDataList
      .filter(s => s.nama.toLowerCase().includes(term) || s.reg.includes(term))
      .slice(0, 10);

    if (matches.length === 0) {
      resBox.innerHTML = `<div class="p-2 text-center text-slate-400 text-xs">Santri tidak ditemukan</div>`;
      resBox.classList.remove('hidden');
      return;
    }

    let html = '';
    matches.forEach(s => {
      html += `
        <div 
          onclick="selectMutasiStudent('${s.reg}')"
          class="p-2 hover:bg-teal-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer flex items-center justify-between text-xs"
        >
          <div>
            <span class="font-bold text-slate-900 dark:text-white">${s.nama}</span>
            <span class="block text-[10px] text-slate-500">Reg: ${s.reg} • ${s.unit} Kelas ${s.kelas}</span>
          </div>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${s.status === 'Boyong' ? 'bg-rose-100 text-rose-800' : 'bg-teal-100 text-teal-800'}">
            ${s.status}
          </span>
        </div>
      `;
    });

    resBox.innerHTML = html;
    resBox.classList.remove('hidden');
  }

  function selectMutasiStudent(reg) {
    const student = santriDataList.find(s => s.reg === reg);
    if (!student) return;

    selectedMutasiReg = reg;
    const nameEl = document.getElementById('mutasiSelectedName');
    const metaEl = document.getElementById('mutasiSelectedMeta');
    const boxEl = document.getElementById('mutasiSelectedStudentBox');
    const resEl = document.getElementById('mutasiStudentSearchResults');
    const inputSearch = document.getElementById('mutasiStudentSearch');

    if (nameEl) nameEl.textContent = student.nama;
    if (metaEl) metaEl.textContent = `Reg: ${student.reg} • ${student.unit} Kelas ${student.kelas} • ${student.status}`;
    if (boxEl) boxEl.classList.remove('hidden');
    if (resEl) resEl.classList.add('hidden');
    if (inputSearch) inputSearch.value = student.nama;
  }

  function clearSelectedMutasiStudent() {
    selectedMutasiReg = null;
    const boxEl = document.getElementById('mutasiSelectedStudentBox');
    const inputSearch = document.getElementById('mutasiStudentSearch');
    if (boxEl) boxEl.classList.add('hidden');
    if (inputSearch) inputSearch.value = '';
  }

  function autoUpdateMutasiTariff() {
    const unit = document.getElementById('mutasiNewUnit')?.value;
    const kelas = document.getElementById('mutasiNewKelas')?.value;
    const status = document.getElementById('mutasiNewStatus')?.value;
    const inputBulanan = document.getElementById('mutasiNewBulanan');

    if (TARIFF_CATALOG[kelas] && TARIFF_CATALOG[kelas][status] && inputBulanan) {
      inputBulanan.value = TARIFF_CATALOG[kelas][status];
    }
  }

  function saveCatatMutasi() {
    const period = document.getElementById('mutasiPeriodeSelect')?.value || '10-2026';
    const date = document.getElementById('mutasiTanggalInput')?.value || new Date().toISOString().slice(0, 10);
    const note = document.getElementById('mutasiCatatanInput')?.value.trim();

    if (currentMutasiType === 'MASUK') {
      const nama = document.getElementById('mutasiNewNama')?.value.trim();
      const jk = document.getElementById('mutasiNewJk')?.value || 'PA';
      const unit = document.getElementById('mutasiNewUnit')?.value || 'MTs';
      const kelas = Number(document.getElementById('mutasiNewKelas')?.value || 7);
      const status = document.getElementById('mutasiNewStatus')?.value || 'Mukim Reguler';
      const bulanan = Number(document.getElementById('mutasiNewBulanan')?.value || 281000);

      if (!nama) {
        alert('Harap isi Nama Santri Baru.');
        return;
      }

      // Generate nomor registrasi baru
      const newReg = String(Date.now()).slice(-5);
      const newStudent = {
        reg: newReg,
        nama,
        jk,
        unit,
        kelas,
        status,
        bulanan,
        alamat: 'Mutasi Masuk'
      };

      santriDataList.unshift(newStudent);
      saveSantriDataList();

      recordSantriMutation('MASUK', newStudent, note || 'Santri baru susulan', '');
      showToast('Santri Masuk Berhasil Dicatat', `${nama} (${unit} Kelas ${kelas}) berhasil ditambahkan.`);

    } else if (currentMutasiType === 'BOYONG') {
      if (!selectedMutasiReg) {
        alert('Harap pilih santri yang boyong terlebih dahulu.');
        return;
      }
      const student = santriDataList.find(s => s.reg === selectedMutasiReg);
      if (!student) return;

      const prevStatus = student.status;
      student.status = 'Boyong';
      saveSantriDataList();

      recordSantriMutation('BOYONG', student, note || 'Santri boyong/keluar', prevStatus);
      showToast('Santri Boyong Berhasil Dicatat', `${student.nama} resmi ditandai boyong.`);

    } else if (currentMutasiType === 'PINDAH_STATUS') {
      if (!selectedMutasiReg) {
        alert('Harap pilih santri yang pindah status terlebih dahulu.');
        return;
      }
      const student = santriDataList.find(s => s.reg === selectedMutasiReg);
      if (!student) return;

      const newStatus = document.getElementById('mutasiNewStatusSelect')?.value || 'Mukim Reguler';
      const prevStatus = student.status;
      student.status = newStatus;

      // Update tariff otomatis
      const gradeCat = String(student.kelas);
      if (TARIFF_CATALOG[gradeCat] && TARIFF_CATALOG[gradeCat][newStatus]) {
        student.bulanan = TARIFF_CATALOG[gradeCat][newStatus];
      }
      saveSantriDataList();

      recordSantriMutation('PINDAH_STATUS', student, note || `Alih status dari ${prevStatus} ke ${newStatus}`, prevStatus);
      showToast('Pindah Status Berhasil Dicatat', `${student.nama} beralih ke ${newStatus}.`);
    }

    closeCatatMutasiModal();
    calculateAndRenderAll();
  }

  // --- 6. FAST EDITOR & STATUS/GENDER SWITCHER ---
  let activeGenderModalReg = null;
  let activeStatusModalReg = null;

  function openSantriGenderModal(reg) {
    activeGenderModalReg = reg;
    const student = (santriDataList || []).find(s => String(s.reg) === String(reg));
    if (!student) return;

    const modal = document.getElementById('modalPilihGenderSantri');
    if (!modal) return;

    const nameEl = document.getElementById('genderModalStudentName');
    const metaEl = document.getElementById('genderModalStudentMeta');
    if (nameEl) nameEl.textContent = student.nama;
    if (metaEl) metaEl.textContent = `No. Reg: ${String(student.reg).padStart(6, '0')} • ${student.unit} Kelas ${student.kelas} • ${student.alamat || '-'}`;

    const isPa = student.jk === 'PA' || student.jk === 'L';
    const currentBadge = document.getElementById('genderModalCurrentBadge');
    if (currentBadge) {
      currentBadge.className = `px-2 py-0.5 rounded text-[10px] font-black uppercase ${isPa ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200'}`;
      currentBadge.textContent = isPa ? 'Saat Ini: L (Putra)' : 'Saat Ini: P (Putri)';
    }

    const paCard = document.getElementById('genderOptionPaCard');
    const piCard = document.getElementById('genderOptionPiCard');
    const paTag = document.getElementById('genderPaActiveTag');
    const piTag = document.getElementById('genderPiActiveTag');

    if (isPa) {
      if (paCard) paCard.className = "p-2.5 rounded-lg border-2 border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 cursor-pointer transition-all shadow-xs ring-2 ring-blue-300 dark:ring-blue-700 flex items-start gap-3 relative";
      if (piCard) piCard.className = "p-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-rose-400 bg-white dark:bg-slate-800 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] flex items-start gap-3 relative";
      if (paTag) paTag.classList.remove('hidden');
      if (piTag) piTag.classList.add('hidden');
    } else {
      if (paCard) paCard.className = "p-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 bg-white dark:bg-slate-800 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] flex items-start gap-3 relative";
      if (piCard) piCard.className = "p-2.5 rounded-lg border-2 border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 cursor-pointer transition-all shadow-xs ring-2 ring-rose-300 dark:ring-rose-700 flex items-start gap-3 relative";
      if (paTag) paTag.classList.add('hidden');
      if (piTag) piTag.classList.remove('hidden');
    }

    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    modal.style.display = 'flex';
    if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
  }

  function closeSantriGenderModal() {
    const modal = document.getElementById('modalPilihGenderSantri');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
    activeGenderModalReg = null;
  }

  function selectSantriGenderFromModal(newJk) {
    if (!activeGenderModalReg) return;
    const student = (santriDataList || []).find(s => String(s.reg) === String(activeGenderModalReg));
    if (!student) return;

    student.jk = newJk;

    saveSantriDataList();
    calculateAndRenderAll();
    closeSantriGenderModal();

    const labelFull = newJk === 'PA' ? 'Laki-laki (Putra)' : 'Perempuan (Putri)';
    showToast(
      'Gender Santri Berhasil Diubah', 
      `${student.nama} kini berstatus ${labelFull}. Seluruh matriks rekapitulasi langsung terupdate otomatis.`
    );
  }

  function openSantriStatusModal(reg) {
    activeStatusModalReg = reg;
    const student = (santriDataList || []).find(s => String(s.reg) === String(reg));
    if (!student) return;

    const modal = document.getElementById('modalPilihStatusSantri');
    if (!modal) return;

    const nameEl = document.getElementById('statusModalStudentName');
    const metaEl = document.getElementById('statusModalStudentMeta');
    if (nameEl) nameEl.textContent = student.nama;
    if (metaEl) metaEl.textContent = `No. Reg: ${String(student.reg).padStart(6, '0')} • ${student.unit} Kelas ${student.kelas}`;

    const currentBadge = document.getElementById('statusModalCurrentBadge');
    if (currentBadge) {
      currentBadge.textContent = `Saat Ini: ${student.status}`;
    }

    // Set preview tariff for student's grade
    const gradeCat = String(student.kelas);
    const tariffs = TARIFF_CATALOG[gradeCat] || { 'Mukim VIP': 301000, 'Mukim Reguler': 281000, 'Non Mukim': 73000 };
    const regTariffEl = document.getElementById('statusRegulerTariff');
    const vipTariffEl = document.getElementById('statusVipTariff');
    const nonTariffEl = document.getElementById('statusNonTariff');
    if (regTariffEl) regTariffEl.textContent = `Rp ${Number(tariffs['Mukim Reguler'] || 281000).toLocaleString('id-ID')}`;
    if (vipTariffEl) vipTariffEl.textContent = `Rp ${Number(tariffs['Mukim VIP'] || 301000).toLocaleString('id-ID')}`;
    if (nonTariffEl) nonTariffEl.textContent = `Rp ${Number(tariffs['Non Mukim'] || 73000).toLocaleString('id-ID')}`;

    const regCard = document.getElementById('statusOptRegulerCard');
    const vipCard = document.getElementById('statusOptVipCard');
    const nonCard = document.getElementById('statusOptNonCard');
    const regTag = document.getElementById('statusRegulerTag');
    const vipTag = document.getElementById('statusVipTag');
    const nonTag = document.getElementById('statusNonTag');

    const st = student.status;
    if (regTag) regTag.classList.toggle('hidden', st !== 'Mukim Reguler');
    if (vipTag) vipTag.classList.toggle('hidden', st !== 'Mukim VIP');
    if (nonTag) nonTag.classList.toggle('hidden', st !== 'Non Mukim');

    if (regCard) {
      regCard.className = st === 'Mukim Reguler'
        ? "p-2.5 rounded-lg border-2 border-teal-500 bg-teal-50/80 dark:bg-teal-950/40 cursor-pointer transition-all shadow-xs ring-2 ring-teal-300 dark:ring-teal-700 flex items-start gap-3"
        : "p-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-teal-400 bg-white dark:bg-slate-800 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] flex items-start gap-3";
    }

    if (vipCard) {
      vipCard.className = st === 'Mukim VIP'
        ? "p-2.5 rounded-lg border-2 border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 cursor-pointer transition-all shadow-xs ring-2 ring-amber-300 dark:ring-amber-700 flex items-start gap-3"
        : "p-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-white dark:bg-slate-800 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] flex items-start gap-3";
    }

    if (nonCard) {
      nonCard.className = st === 'Non Mukim'
        ? "p-2.5 rounded-lg border-2 border-slate-500 bg-slate-100 dark:bg-slate-800 cursor-pointer transition-all shadow-xs ring-2 ring-slate-300 dark:ring-slate-600 flex items-start gap-3"
        : "p-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-slate-400 bg-white dark:bg-slate-800 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] flex items-start gap-3";
    }

    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    modal.style.display = 'flex';
    if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
  }

  function closeSantriStatusModal() {
    const modal = document.getElementById('modalPilihStatusSantri');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
    activeStatusModalReg = null;
  }

  function selectSantriStatusFromModal(newStatus) {
    if (!activeStatusModalReg) return;
    const student = (santriDataList || []).find(s => String(s.reg) === String(activeStatusModalReg));
    if (!student) return;

    const prevStatus = student.status;
    student.status = newStatus;

    // Auto-update tarif sesuai grade
    const gradeCat = String(student.kelas);
    if (TARIFF_CATALOG[gradeCat] && TARIFF_CATALOG[gradeCat][newStatus]) {
      student.bulanan = TARIFF_CATALOG[gradeCat][newStatus];
    }

    saveSantriDataList();
    recordSantriMutation('PINDAH_STATUS', student, `Pindah status santri dari ${prevStatus} ke ${newStatus}`, prevStatus);
    calculateAndRenderAll();
    closeSantriStatusModal();

    showToast(
      'Status Santri Berhasil Diperbarui', 
      `${student.nama} beralih ke ${newStatus} (Tarif Syahriyah: Rp ${student.bulanan.toLocaleString('id-ID')}). Rekap bulanan langsung terupdate.`
    );
  }

  function quickToggleSantriGender(reg) {
    openSantriGenderModal(reg);
  }

  function quickToggleSantriStatus(reg) {
    const student = santriDataList.find(s => s.reg === reg);
    if (!student) return;

    const prevStatus = student.status;

    // Cycle: Mukim Reguler -> Mukim VIP -> Non Mukim -> Mukim Reguler
    if (student.status === 'Mukim Reguler') {
      student.status = 'Mukim VIP';
    } else if (student.status === 'Mukim VIP') {
      student.status = 'Non Mukim';
    } else {
      student.status = 'Mukim Reguler';
    }

    // Auto-update tariff
    const gradeCat = String(student.kelas);
    if (TARIFF_CATALOG[gradeCat] && TARIFF_CATALOG[gradeCat][student.status]) {
      student.bulanan = TARIFF_CATALOG[gradeCat][student.status];
    }

    saveSantriDataList();
    recordSantriMutation('PINDAH_STATUS', student, `Pindah status cepat dari ${prevStatus} ke ${student.status}`, prevStatus);
    calculateAndRenderAll();
    showToast('Status Santri Diperbarui', `${student.nama} beralih ke ${student.status} (Tarif: Rp ${student.bulanan.toLocaleString('id-ID')}).`);
  }

  function toggleSantriBoyong(reg) {
    const student = santriDataList.find(s => s.reg === reg);
    if (!student) return;

    if (student.status === 'Boyong') {
      student.status = 'Mukim Reguler';
      const gradeCat = String(student.kelas);
      if (TARIFF_CATALOG[gradeCat]) student.bulanan = TARIFF_CATALOG[gradeCat]['Mukim Reguler'];
      saveSantriDataList();
      recordSantriMutation('MASUK', student, 'Diaktifkan kembali dari boyong', 'Boyong');
      showToast('Santri Diaktifkan Kembali', `${student.nama} aktif kembali sebagai Mukim Reguler.`);
    } else {
      if (confirm(`Tandai santri ${student.nama} sebagai Boyong/Keluar? Data tetap tersimpan tetapi tidak dihitung di tagihan dan rekapitulasi.`)) {
        const prevStatus = student.status;
        student.status = 'Boyong';
        saveSantriDataList();
        recordSantriMutation('BOYONG', student, 'Ditandai boyong dari aksi cepat', prevStatus);
        showToast('Santri Ditandai Boyong', `${student.nama} dinonaktifkan dari tagihan.`);
      }
    }

    calculateAndRenderAll();
  }

  function openEditSantriModal(reg) {
    const student = santriDataList.find(s => s.reg === reg);
    if (!student) return;

    document.getElementById('editSantriModalTitle').innerHTML = '<i data-lucide="user-check" class="w-4 h-4"></i><span>Edit Data Santri</span>';
    document.getElementById('editSantriRegHidden').value = student.reg;
    document.getElementById('editSantriReg').value = student.reg;
    document.getElementById('editSantriNama').value = student.nama;
    document.getElementById('editSantriJk').value = (student.jk === 'PI' || student.jk === 'P') ? 'PI' : 'PA';
    document.getElementById('editSantriUnit').value = student.unit;
    document.getElementById('editSantriKelas').value = student.kelas;
    document.getElementById('editSantriStatus').value = student.status;
    document.getElementById('editSantriBulanan').value = student.bulanan;

    const modal = document.getElementById('modalEditSantri');
    if (modal) {
      modal.classList.remove('hidden');
      if (modal.parentElement !== document.body) document.body.appendChild(modal);
    }
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
  }

  function openAddSantriModal() {
    document.getElementById('editSantriModalTitle').innerHTML = '<i data-lucide="user-plus" class="w-4 h-4"></i><span>Tambah Santri Baru</span>';
    document.getElementById('editSantriRegHidden').value = '';
    document.getElementById('editSantriReg').value = '';
    document.getElementById('editSantriNama').value = '';
    document.getElementById('editSantriJk').value = 'PA';
    document.getElementById('editSantriUnit').value = 'MTs';
    document.getElementById('editSantriKelas').value = '7';
    document.getElementById('editSantriStatus').value = 'Mukim Reguler';
    document.getElementById('editSantriBulanan').value = '281000';

    const modal = document.getElementById('modalEditSantri');
    if (modal) {
      modal.classList.remove('hidden');
      if (modal.parentElement !== document.body) document.body.appendChild(modal);
    }
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
  }

  function closeEditSantriModal() {
    const modal = document.getElementById('modalEditSantri');
    if (modal) modal.classList.add('hidden');
  }

  function autoUpdateSantriTariff() {
    const kelas = document.getElementById('editSantriKelas')?.value;
    const status = document.getElementById('editSantriStatus')?.value;
    const inputBulanan = document.getElementById('editSantriBulanan');

    if (kelas && status && inputBulanan && TARIFF_CATALOG[kelas] && TARIFF_CATALOG[kelas][status]) {
      inputBulanan.value = TARIFF_CATALOG[kelas][status];
    }
  }

  function saveSantriData() {
    const regHidden = document.getElementById('editSantriRegHidden')?.value;
    const reg = document.getElementById('editSantriReg')?.value.trim();
    const nama = document.getElementById('editSantriNama')?.value.trim();
    const rawJk = document.getElementById('editSantriJk')?.value;
    const jk = (rawJk === 'PI' || rawJk === 'P') ? 'PI' : 'PA';
    const unit = document.getElementById('editSantriUnit')?.value;
    const kelas = Number(document.getElementById('editSantriKelas')?.value);
    const status = document.getElementById('editSantriStatus')?.value;
    const bulanan = Number(document.getElementById('editSantriBulanan')?.value);

    if (!reg || !nama) {
      alert('Harap isi No. Registrasi dan Nama Santri.');
      return;
    }

    if (regHidden) {
      // Edit existing
      const student = santriDataList.find(s => s.reg === regHidden);
      if (student) {
        const prevStatus = student.status;
        student.reg = reg;
        student.nama = nama;
        student.jk = jk;
        student.unit = unit;
        student.kelas = kelas;
        student.status = status;
        student.bulanan = bulanan;

        if (prevStatus !== status) {
          if (status === 'Boyong') {
            recordSantriMutation('BOYONG', student, 'Diubah menjadi boyong melalui form edit', prevStatus);
          } else if (prevStatus === 'Boyong') {
            recordSantriMutation('MASUK', student, 'Diaktifkan kembali dari boyong melalui form edit', 'Boyong');
          } else {
            recordSantriMutation('PINDAH_STATUS', student, `Alih status dari ${prevStatus} ke ${status} via edit`, prevStatus);
          }
        }
      }
    } else {
      // New student
      const newObj = {
        reg,
        nama,
        jk,
        unit,
        kelas,
        status,
        bulanan,
        alamat: 'Santri Baru'
      };
      santriDataList.unshift(newObj);
      recordSantriMutation('MASUK', newObj, 'Santri baru ditambahkan via formulir', '');
    }

    saveSantriDataList();
    closeEditSantriModal();
    calculateAndRenderAll();
    showToast('Data Santri Berhasil Disimpan', `${nama} (${unit} Kelas ${kelas}) berhasil diperbarui.`);
  }

  // --- 7. EXPORT DATA JADI JUNIO SMART BRI (5 KOLOM RESMI) ---
  function openTagihanJunioModal() {
    const curObj = monthlySantriStore[currentPeriodKey] || { label: currentPeriodKey, status: 'DRAFT', isPedoman: false };
    const subtitle = document.getElementById('junioModalPeriodSubtitle');
    if (subtitle) {
      const isOk = curObj.status === 'LOCKED' || curObj.isPedoman;
      const statusText = curObj.isPedoman ? 'Pedoman Master (Tervalidasi)' : (curObj.status === 'LOCKED' ? 'Tervalidasi / Fiks' : 'Draf Rapat Berjalan (Belum Dikunci)');
      const colorClass = isOk ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-600 dark:text-amber-400 font-bold';
      subtitle.innerHTML = `Periode Tagihan: <span class="font-bold text-slate-800 dark:text-slate-200">Bulan ${curObj.label}</span> • Status: <span class="${colorClass}">${statusText}</span>`;
    }

    // Set tanggal efektif (01-MM-YYYY) & jatuh tempo (10-MM-YYYY) sesuai periode bulan aktif
    const tglEfektifInput = document.getElementById('junioTglEfektifInput');
    const tglTempoInput = document.getElementById('junioTglTempoInput');
    const parts = (currentPeriodKey || '10-2026').split('-');
    const mm = parts[0] || '10';
    const yyyy = parts[1] || '2026';
    if (tglEfektifInput) tglEfektifInput.value = `01-${mm}-${yyyy}`;
    if (tglTempoInput) tglTempoInput.value = `10-${mm}-${yyyy}`;

    const modal = document.getElementById('modalTagihanJunio');
    if (modal) {
      modal.classList.remove('hidden');
      if (modal.parentElement !== document.body) document.body.appendChild(modal);
    }
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
  }

  function closeTagihanJunioModal() {
    const modal = document.getElementById('modalTagihanJunio');
    if (modal) modal.classList.add('hidden');
  }

  function exportDataJadiJunioExcel() {
    if (typeof XLSX === 'undefined') {
      alert('Pustaka SheetJS (XLSX) sedang dimuat, silakan coba beberapa saat lagi.');
      return;
    }

    const curObj = monthlySantriStore[currentPeriodKey] || { label: currentPeriodKey, status: 'DRAFT', isPedoman: false };
    if (curObj.status === 'DRAFT' && !curObj.isPedoman) {
      const proceed = confirm(`Perhatian: Data Bulan ${curObj.label} masih berstatus DRAF dan belum dikunci / divalidasi bersama bendahara unit.\n\nApakah Anda yakin ingin tetap mengekspor tagihan Junio sekarang?`);
      if (!proceed) return;
    }

    const idTagihan = document.getElementById('junioIdTagihanInput')?.value || '63';
    const tglEfektif = document.getElementById('junioTglEfektifInput')?.value || `01-${currentPeriodKey}`;
    const tglTempo = document.getElementById('junioTglTempoInput')?.value || `10-${currentPeriodKey}`;
    const targetUnit = document.getElementById('junioTargetUnitSelect')?.value || 'ALL';

    const activeList = santriDataList.filter(s => {
      if (s.status === 'Boyong') return false;
      if (targetUnit !== 'ALL' && s.unit !== targetUnit) return false;
      return true;
    });

    if (activeList.length === 0) {
      alert('Tidak ada data santri aktif untuk diekspor.');
      return;
    }

    // 5 Kolom Resmi Junio Smart BRI: No. Registrasi, ID Tagihan, Jumlah, Tanggal Efektif, Tanggal Jatuh Tempo
    const rows = [
      ['No. Registrasi', 'ID Tagihan', 'Jumlah', 'Tanggal Efektif', 'Tanggal Jatuh Tempo']
    ];

    activeList.forEach(s => {
      rows.push([
        s.reg,
        Number(idTagihan),
        Number(s.bulanan),
        tglEfektif,
        tglTempo
      ]);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);

    // Set column widths
    ws['!cols'] = [
      { wch: 18 },
      { wch: 14 },
      { wch: 16 },
      { wch: 18 },
      { wch: 22 }
    ];

    const sheetName = targetUnit === 'ALL' ? 'Tagihan Junio' : `Tagihan ${targetUnit}`;
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    const filename = `Tagihan_Junio_${targetUnit}_${currentPeriodKey}_${tglEfektif.replace(/-/g, '')}.xlsx`;
    XLSX.writeFile(wb, filename);

    closeTagihanJunioModal();
    showToast('Tagihan Junio Berhasil Diunduh', `${activeList.length} baris data tagihan Bulan ${curObj.label} berhasil diekspor ke ${filename}.`);
  }

  // --- 8. EXPORT REKAP MATRIKS EXCEL (SESUAI SHEET REFERENSI) ---
  function downloadSantriExcelMatrix() {
    if (typeof XLSX === 'undefined') {
      alert('Pustaka SheetJS (XLSX) sedang dimuat, coba lagi sebentar.');
      return;
    }

    const m = calculateSantriMetrics();
    const activeList = santriDataList.filter(s => s.status !== 'Boyong');

    const wb = XLSX.utils.book_new();

    // Sheet 1: Matriks Rekap 4 Unit
    const matrixRows = [
      ['DATA PELAJAR YTPAI RAUDLATUL MUTA\'ALLIMIN LAMONGAN'],
      ['Laporan Rekapitulasi Data Siswa Real - Bulan Oktober 2026'],
      [],
      ['MTS', '', '', '', '', '', 'SMP', '', '', '', '', ''],
      ['Kelas', 'MUKIM PA', 'MUKIM PI', 'MUKIM VIP', 'NON PA', 'NON PI', 'Kelas', 'MUKIM PA', 'MUKIM PI', 'MUKIM VIP', 'NON PA', 'NON PI'],
    ];

    // Helper calculate per grade
    function getGradeDetails(unit, grade) {
      const gList = activeList.filter(s => s.unit === unit && s.kelas === grade);
      const mPa = gList.filter(s => s.status === 'Mukim Reguler' && s.jk === 'PA').length;
      const mPi = gList.filter(s => s.status === 'Mukim Reguler' && s.jk === 'PI').length;
      const mVip = gList.filter(s => s.status === 'Mukim VIP').length;
      const nPa = gList.filter(s => s.status === 'Non Mukim' && s.jk === 'PA').length;
      const nPi = gList.filter(s => s.status === 'Non Mukim' && s.jk === 'PI').length;
      return [mPa, mPi, mVip, nPa, nPi];
    }

    const mts7 = getGradeDetails('MTs', 7);
    const smp7 = getGradeDetails('SMP', 7);
    matrixRows.push(['7', ...mts7, '7', ...smp7]);

    const mts8 = getGradeDetails('MTs', 8);
    const smp8 = getGradeDetails('SMP', 8);
    matrixRows.push(['8', ...mts8, '8', ...smp8]);

    const mts9 = getGradeDetails('MTs', 9);
    const smp9 = getGradeDetails('SMP', 9);
    matrixRows.push(['9', ...mts9, '9', ...smp9]);

    matrixRows.push([]);
    matrixRows.push(['MA', '', '', '', '', '', 'SMA', '', '', '', '', '']);
    matrixRows.push(['Kelas', 'MUKIM PA', 'MUKIM PI', 'MUKIM VIP', 'NON PA', 'NON PI', 'Kelas', 'MUKIM PA', 'MUKIM PI', 'MUKIM VIP', 'NON PA', 'NON PI']);

    const ma10 = getGradeDetails('MA', 10);
    const sma10 = getGradeDetails('SMA', 10);
    matrixRows.push(['10', ...ma10, '10', ...sma10]);

    const ma11 = getGradeDetails('MA', 11);
    const sma11 = getGradeDetails('SMA', 11);
    matrixRows.push(['11', ...ma11, '11', ...sma11]);

    const ma12 = getGradeDetails('MA', 12);
    const sma12 = getGradeDetails('SMA', 12);
    matrixRows.push(['12', ...ma12, '12', ...sma12]);

    matrixRows.push([]);
    matrixRows.push(['RINGKASAN TOTAL']);
    matrixRows.push(['TOTAL SISWA', m.total]);
    matrixRows.push(['MUKIM', m.mukim, `(${m.mukimPct}%)`]);
    matrixRows.push(['- Putra (PA)', m.mukimPa]);
    matrixRows.push(['- Putri (PI)', m.mukimPi]);
    matrixRows.push(['NON MUKIM', m.nonMukim, `(${m.nonMukimPct}%)`]);
    matrixRows.push(['- Putra (PA)', m.nonMukimPa]);
    matrixRows.push(['- Putri (PI)', m.nonMukimPi]);

    const wsMatrix = XLSX.utils.aoa_to_sheet(matrixRows);
    XLSX.utils.book_append_sheet(wb, wsMatrix, 'Matriks Rekap');

    // Sheet 2: Data Seluruh Santri
    const dataSantriRows = [
      ['No', 'No. Registrasi', 'Nama Santri', 'Jenis Kelamin', 'Unit', 'Kelas', 'Status', 'Tagihan Bulanan', 'Alamat']
    ];
    activeList.forEach((s, idx) => {
      dataSantriRows.push([
        idx + 1,
        s.reg,
        s.nama,
        s.jk,
        s.unit,
        s.kelas,
        s.status,
        s.bulanan,
        s.alamat || ''
      ]);
    });
    const wsData = XLSX.utils.aoa_to_sheet(dataSantriRows);
    XLSX.utils.book_append_sheet(wb, wsData, 'Data Santri Real');

    XLSX.writeFile(wb, 'Rekap_Data_Santri_YTPAI_Oktober_2026.xlsx');
    showToast('Excel Matriks Berhasil Diunduh', 'Berkas Rekap_Data_Santri_YTPAI_Oktober_2026.xlsx siap dibuka.');
  }

  // --- 9. CANVAS ENGINE: HD MATRIX SPREADSHEET (RASIO 3:4 LANDSCAPE / 4:3 RESMI & PROSENTASE) ---
  function downloadSantriInfographicHd() {
    const canvas = document.getElementById('santriHdExportCanvas');
    if (!canvas) {
      alert('Canvas ekspor tidak ditemukan.');
      return;
    }

    const ctx = canvas.getContext('2d');
    const W = 1600;
    const H = 1200;
    canvas.width = W;
    canvas.height = H;

    const m = calculateSantriMetrics();
    const curObj = (monthlySantriStore && monthlySantriStore[currentPeriodKey]) ? monthlySantriStore[currentPeriodKey] : { label: 'Oktober 2026' };

    // 1. Latar Belakang Putih Bersih Khas Spreadsheet
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Helper: Menggambar sel dengan border garis, background warna, dan penataan teks anti-tumpang tindih
    function drawCell(x, y, w, h, text, options = {}) {
      const {
        bg = '#ffffff',
        border = '#000000',
        borderWidth = 1,
        textColor = '#000000',
        font = 'bold 18px "Segoe UI", Arial, sans-serif',
        align = 'center',
        valign = 'middle',
        subText = '',
        subFont = 'bold 12px "Segoe UI", Arial, sans-serif',
        subColor = '#475569',
        subBadge = false,
        subBadgeBg = '#ecfdf5',
        subBadgeColor = '#047857',
        mainOffset = null,
        subOffset = null
      } = options;

      // Fill background
      ctx.fillStyle = bg;
      ctx.fillRect(x, y, w, h);

      // Stroke border sel
      if (borderWidth > 0) {
        ctx.strokeStyle = border;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(x, y, w, h);
      }

      // Render text
      if (text !== undefined && text !== null && text !== '') {
        ctx.fillStyle = textColor;
        ctx.font = font;
        ctx.textAlign = align;

        let tx = x + w / 2;
        if (align === 'left') tx = x + 12;
        else if (align === 'right') tx = x + w - 12;

        if (subText) {
          ctx.textBaseline = 'middle';
          let ty, subY;

          if (mainOffset !== null && subOffset !== null) {
            ty = y + mainOffset;
            subY = y + subOffset;
          } else if (h >= 90) {
            // Kotak Raksasa Unit Total (Merged 4 baris, h ~ 134px) - Separasi vertikal 44px
            ty = y + (h / 2) - 18;
            subY = y + (h / 2) + 26;
          } else {
            // Sel 2-baris standar (h ~ 36px - 48px) - Posisi terkalibrasi anti-tabrakan
            ty = y + (h * 0.35);
            subY = y + (h * 0.77);
          }

          ctx.fillText(String(text), tx, ty);

          if (subBadge) {
            // Gambar pill badge rapi untuk prosentase total unit
            ctx.font = subFont;
            const textMetrics = ctx.measureText(String(subText));
            const pillW = textMetrics.width + 16;
            const pillH = 22;
            const pillX = tx - pillW / 2;
            const pillY = subY - pillH / 2;

            ctx.fillStyle = subBadgeBg;
            ctx.beginPath();
            ctx.roundRect(pillX, pillY, pillW, pillH, 4);
            ctx.fill();

            ctx.strokeStyle = subBadgeColor + '55';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = subBadgeColor;
            ctx.fillText(String(subText), tx, subY);
          } else {
            ctx.fillStyle = subColor;
            ctx.font = subFont;
            ctx.fillText(String(subText), tx, subY);
          }
        } else {
          ctx.textBaseline = valign;
          let ty = y + h / 2;
          ctx.fillText(String(text), tx, ty);
        }
      }
    }

    // --- 2. HEADER BANNER UTAMA (KUNING CERAH KHAS SPREADSHEET REFERENSI) ---
    const bannerX = 40;
    const bannerY = 18;
    const bannerW = 1520;
    const bannerH = 46;
    drawCell(bannerX, bannerY, bannerW, bannerH, "DATA PELAJAR YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN", {
      bg: '#ffff00',
      border: '#000000',
      borderWidth: 2,
      textColor: '#000000',
      font: '900 24px "Segoe UI", Arial, sans-serif'
    });

    // --- 3. 4 BLOK UNIT DENGAN TABEL GANDA BERDAMPINGAN ---
    const unitConfigs = [
      { key: 'MTs', name: 'MTS', color: '#a6e3a1', y: 72, grades: [7, 8, 9] },
      { key: 'SMP', name: 'SMP', color: '#89b4fa', y: 288, grades: [7, 8, 9] },
      { key: 'MA',  name: 'MA',  color: '#a6d189', y: 504, grades: [10, 11, 12] },
      { key: 'SMA', name: 'SMA', color: '#fab387', y: 720, grades: [10, 11, 12] }
    ];

    const leftTableX = 40;
    const leftTableW = 820; // Kolom: Kelas (90), Mukim PA (145), PI (145), VIP (140), Non PA (150), Non PI (150) = 820
    const rightTableX = 890;
    const rightTableW = 670; // Kolom: Jml Per Kelas (150), Mukim (180), Non Mukim (180), Total Unit (160) = 670

    unitConfigs.forEach(uCfg => {
      const uData = m.units[uCfg.key];
      const topY = uCfg.y;

      // ================= A. TABEL KIRI (KOMPOSISI PER KELAS & GENDER) =================
      // 1. Unit Title Header
      drawCell(leftTableX, topY, leftTableW, 26, uCfg.name, {
        bg: uCfg.color,
        border: '#000000',
        borderWidth: 1.5,
        textColor: '#000000',
        font: '900 17px "Segoe UI", Arial, sans-serif'
      });

      // 2. Subheaders
      const subH1 = 24;
      const subH2 = 22;
      const dataRowH = 36;

      // Kolom Kelas (Rowspan 2)
      drawCell(leftTableX, topY + 26, 90, subH1 + subH2, "Kelas", {
        bg: '#e2e8f0',
        border: '#000000',
        font: 'bold 15px "Segoe UI", Arial, sans-serif'
      });

      // Kolom MUKIM (Colspan 3: PA, PI, VIP)
      drawCell(leftTableX + 90, topY + 26, 430, subH1, "MUKIM", {
        bg: '#cbd5e1',
        border: '#000000',
        font: '900 14px "Segoe UI", Arial, sans-serif'
      });
      drawCell(leftTableX + 90, topY + 26 + subH1, 145, subH2, "PA", { bg: '#f1f5f9', border: '#000000', font: 'bold 13px "Segoe UI", Arial' });
      drawCell(leftTableX + 235, topY + 26 + subH1, 145, subH2, "PI", { bg: '#f1f5f9', border: '#000000', font: 'bold 13px "Segoe UI", Arial' });
      drawCell(leftTableX + 380, topY + 26 + subH1, 140, subH2, "VIP", { bg: '#fef08a', border: '#000000', textColor: '#b45309', font: '900 13px "Segoe UI", Arial' });

      // Kolom NON MUKIM (Colspan 2: PA, PI)
      drawCell(leftTableX + 520, topY + 26, 300, subH1, "NON MUKIM", {
        bg: '#cbd5e1',
        border: '#000000',
        font: '900 14px "Segoe UI", Arial, sans-serif'
      });
      drawCell(leftTableX + 520, topY + 26 + subH1, 150, subH2, "PA", { bg: '#f1f5f9', border: '#000000', font: 'bold 13px "Segoe UI", Arial' });
      drawCell(leftTableX + 670, topY + 26 + subH1, 150, subH2, "PI", { bg: '#f1f5f9', border: '#000000', font: 'bold 13px "Segoe UI", Arial' });

      // Baris Kelas (Data Rows) - Angka Diperbesar & Tajam (21px)
      uCfg.grades.forEach((gKey, idx) => {
        const rowY = topY + 26 + subH1 + subH2 + (idx * dataRowH);
        const gData = uData.grades[gKey];

        drawCell(leftTableX, rowY, 90, dataRowH, String(gKey), { font: '900 19px "Segoe UI", Arial', border: '#000000' });
        drawCell(leftTableX + 90, rowY, 145, dataRowH, String(gData.mukimPa), { font: 'bold 21px "Segoe UI", Arial', border: '#000000' });
        drawCell(leftTableX + 235, rowY, 145, dataRowH, String(gData.mukimPi), { font: 'bold 21px "Segoe UI", Arial', border: '#000000' });
        drawCell(leftTableX + 380, rowY, 140, dataRowH, String(gData.vip), { 
          font: '900 21px "Segoe UI", Arial', 
          textColor: gData.vip > 0 ? '#b45309' : '#000000', 
          bg: gData.vip > 0 ? '#fefce8' : '#ffffff', 
          border: '#000000' 
        });
        drawCell(leftTableX + 520, rowY, 150, dataRowH, String(gData.nonPa), { font: 'bold 21px "Segoe UI", Arial', border: '#000000' });
        drawCell(leftTableX + 670, rowY, 150, dataRowH, String(gData.nonPi), { font: 'bold 21px "Segoe UI", Arial', border: '#000000' });
      });

      // Baris Penutup Bawah Kiri
      const leftFooterY = topY + 26 + subH1 + subH2 + (3 * dataRowH);
      drawCell(leftTableX, leftFooterY, leftTableW, 26, "", { bg: '#f8fafc', border: '#000000' });


      // ================= B. TABEL KANAN (KATEGORI, PROSENTASE & BOX UNIT TOTAL) =================
      // 1. Unit Header Kanan
      drawCell(rightTableX, topY, rightTableW, 26, uCfg.name, {
        bg: uCfg.color,
        border: '#000000',
        borderWidth: 1.5,
        textColor: '#000000',
        font: '900 17px "Segoe UI", Arial, sans-serif'
      });

      // 2. Subheaders Kanan
      drawCell(rightTableX, topY + 26, 150, subH1 + subH2, uCfg.key === 'MTs' ? "JUMLAH PER\nKELAS" : "JUMLAH", {
        bg: '#cbd5e1',
        border: '#000000',
        font: '900 13px "Segoe UI", Arial, sans-serif'
      });

      drawCell(rightTableX + 150, topY + 26, 360, subH1, "KATEGORI", {
        bg: '#cbd5e1',
        border: '#000000',
        font: '900 14px "Segoe UI", Arial, sans-serif'
      });
      drawCell(rightTableX + 150, topY + 26 + subH1, 180, subH2, "MUKIM", { bg: '#f1f5f9', border: '#000000', font: 'bold 13px "Segoe UI", Arial' });
      drawCell(rightTableX + 330, topY + 26 + subH1, 180, subH2, "NON MUKIM", { bg: '#f1f5f9', border: '#000000', font: 'bold 13px "Segoe UI", Arial' });

      // Kolom JUMLAH SELURUH SISWA (Header)
      drawCell(rightTableX + 510, topY + 26, 160, subH1 + subH2, "JUMLAH SELURUH\nSISWA", {
        bg: '#cbd5e1',
        border: '#000000',
        font: '900 12px "Segoe UI", Arial, sans-serif'
      });

      // Baris Data Kanan - Angka Diperbesar & Jarak Vertikal Presisi Anti-Bertumpuk
      uCfg.grades.forEach((gKey, idx) => {
        const rowY = topY + 26 + subH1 + subH2 + (idx * dataRowH);
        const gData = uData.grades[gKey];

        // Total per kelas
        drawCell(rightTableX, rowY, 150, dataRowH, String(gData.total), { font: '900 22px "Segoe UI", Arial', border: '#000000' });

        // Mukim + Prosentase (Posisi terpisah: Angka di atas, % di bawah dengan jarak lega)
        drawCell(rightTableX + 150, rowY, 180, dataRowH, `${gData.mukim}`, {
          subText: `(${gData.mukimPct})`,
          subFont: 'bold 12px "Segoe UI", Arial',
          subColor: '#0f766e',
          font: 'bold 20px "Segoe UI", Arial',
          border: '#000000'
        });

        // Non Mukim + Prosentase
        drawCell(rightTableX + 330, rowY, 180, dataRowH, `${gData.non}`, {
          subText: `(${gData.nonPct})`,
          subFont: 'bold 12px "Segoe UI", Arial',
          subColor: '#64748b',
          font: 'bold 20px "Segoe UI", Arial',
          border: '#000000'
        });
      });

      // Box Raksasa Total Unit di Kanan (Merged 4 Baris) - Zero Overlap dengan SubBadge Pill
      const bigBoxY = topY + 26 + subH1 + subH2;
      const bigBoxH = (3 * dataRowH) + 26;
      drawCell(rightTableX + 510, bigBoxY, 160, bigBoxH, String(uData.total), {
        font: '900 58px "Segoe UI", Arial, sans-serif',
        subText: `(${uData.pctTotal} Total)`,
        subFont: '900 13.5px "Segoe UI", Arial',
        subBadge: true,
        subBadgeBg: '#ecfdf5',
        subBadgeColor: '#047857',
        border: '#000000',
        bg: '#ffffff'
      });

      // Baris Footer: JUMLAH PER KATEGORI
      drawCell(rightTableX, leftFooterY, 150, 26, "JUMLAH PER\nKATEGORI", {
        font: '900 11.5px "Segoe UI", Arial',
        bg: '#e2e8f0',
        border: '#000000'
      });
      drawCell(rightTableX + 150, leftFooterY, 180, 26, `${uData.mukim} (${uData.mukimPct})`, {
        font: '900 15px "Segoe UI", Arial',
        textColor: '#0f766e',
        border: '#000000',
        bg: '#ffffff'
      });
      drawCell(rightTableX + 330, leftFooterY, 180, 26, `${uData.nonMukim} (${uData.nonMukimPct})`, {
        font: '900 15px "Segoe UI", Arial',
        textColor: '#475569',
        border: '#000000',
        bg: '#ffffff'
      });
    });

    // ================= 4. BAGIAN BAWAH: PERIODE BULAN & GRAND TOTAL MATRIX =================
    const botY = 938;

    // Kiri Bawah: Teks Bulan Dinamis & Demografi Gender Lengkap
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#000000';
    ctx.font = '900 46px "Segoe UI", Arial, sans-serif';
    ctx.fillText(curObj.label, leftTableX, botY + 8);

    ctx.font = 'bold 15px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText("DATA PELAJAR & SANTRI RESMI YTPAI", leftTableX, botY + 68);

    // Box Demografi Putra & Putri (Font Besar, Jelas & Transparan: Rincian Mukim vs Bajak)
    const demoBoxY = botY + 98;
    const demoBoxH = 104;
    const demoBoxW = 402;
    const demoGap = 16;
    const paX = leftTableX;
    const piX = leftTableX + demoBoxW + demoGap;

    // 1. Box Demografi Putra
    ctx.fillStyle = '#f0f9ff';
    ctx.fillRect(paX, demoBoxY, demoBoxW, demoBoxH);
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(paX, demoBoxY, demoBoxW, demoBoxH);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#0369a1';
    ctx.font = '900 13px "Segoe UI", Arial, sans-serif';
    ctx.fillText("TOTAL SISWA / PELAJAR PUTRA", paX + demoBoxW / 2, demoBoxY + 22);

    ctx.fillStyle = '#0284c7';
    ctx.font = '900 24px "Segoe UI", Arial, sans-serif';
    ctx.fillText(`${m.totalPa} Siswa (${m.totalPaPct})`, paX + demoBoxW / 2, demoBoxY + 50);

    const paSubText = `${m.mukimPa} Mukim (Mondok)  •  ${m.nonMukimPa} Bajak (Laju)`;
    ctx.font = 'bold 12px "Segoe UI", Arial, sans-serif';
    const paMetrics = ctx.measureText(paSubText);
    const paPillW = paMetrics.width + 18;
    const paPillH = 22;
    const paPillX = paX + (demoBoxW - paPillW) / 2;
    const paPillY = demoBoxY + 70;

    ctx.fillStyle = '#e0f2fe';
    ctx.beginPath();
    ctx.roundRect(paPillX, paPillY, paPillW, paPillH, 4);
    ctx.fill();
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#0369a1';
    ctx.fillText(paSubText, paX + demoBoxW / 2, demoBoxY + 81);

    // 2. Box Demografi Putri
    ctx.fillStyle = '#fdf2f8';
    ctx.fillRect(piX, demoBoxY, demoBoxW, demoBoxH);
    ctx.strokeStyle = '#db2777';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(piX, demoBoxY, demoBoxW, demoBoxH);

    ctx.fillStyle = '#be185d';
    ctx.font = '900 13px "Segoe UI", Arial, sans-serif';
    ctx.fillText("TOTAL SISWA / PELAJAR PUTRI", piX + demoBoxW / 2, demoBoxY + 22);

    ctx.fillStyle = '#db2777';
    ctx.font = '900 24px "Segoe UI", Arial, sans-serif';
    ctx.fillText(`${m.totalPi} Siswi (${m.totalPiPct})`, piX + demoBoxW / 2, demoBoxY + 50);

    const piSubText = `${m.mukimPi} Mukim (Mondok)  •  ${m.nonMukimPi} Bajak (Laju)`;
    ctx.font = 'bold 12px "Segoe UI", Arial, sans-serif';
    const piMetrics = ctx.measureText(piSubText);
    const piPillW = piMetrics.width + 18;
    const piPillH = 22;
    const piPillX = piX + (demoBoxW - piPillW) / 2;
    const piPillY = demoBoxY + 70;

    ctx.fillStyle = '#fce7f3';
    ctx.beginPath();
    ctx.roundRect(piPillX, piPillY, piPillW, piPillH, 4);
    ctx.fill();
    ctx.strokeStyle = '#fbcfe8';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#9d174d';
    ctx.fillText(piSubText, piX + demoBoxW / 2, demoBoxY + 81);

    // Kanan Bawah: Tabel Grand Total Matriks Persis Gambar Referensi (Lebar 670)
    const gtX = rightTableX;
    const gtW = rightTableW;

    // Baris 1: Header JUMLAH SELURUH SISWA
    drawCell(gtX, botY, gtW, 28, "JUMLAH SELURUH SISWA", {
      bg: '#cbd5e1',
      border: '#000000',
      font: '900 14.5px "Segoe UI", Arial'
    });

    // Baris 2: Nilai Raksasa 746 (Font 58px)
    drawCell(gtX, botY + 28, gtW, 58, String(m.total), {
      font: '900 58px "Segoe UI", Arial, sans-serif',
      border: '#000000',
      bg: '#ffffff'
    });

    // Baris 3: Subheader MUKIM & NON MUKIM
    const halfGtW = gtW / 2; // 335
    drawCell(gtX, botY + 86, halfGtW, 26, "MUKIM", {
      bg: '#cbd5e1',
      border: '#000000',
      font: '900 14px "Segoe UI", Arial'
    });
    drawCell(gtX + halfGtW, botY + 86, halfGtW, 26, "NON MUKIM", {
      bg: '#cbd5e1',
      border: '#000000',
      font: '900 14px "Segoe UI", Arial'
    });

    // Baris 4: Angka Mukim & Non Mukim + Prosentase (Diperbesar & Anti-Bertumpuk)
    drawCell(gtX, botY + 112, halfGtW, 46, `${m.mukim}`, {
      subText: `(${m.mukimPct})`,
      subFont: 'bold 13.5px "Segoe UI", Arial',
      subColor: '#0f766e',
      font: '900 28px "Segoe UI", Arial',
      border: '#000000',
      mainOffset: 16,
      subOffset: 35
    });
    drawCell(gtX + halfGtW, botY + 112, halfGtW, 46, `${m.nonMukim}`, {
      subText: `(${m.nonMukimPct})`,
      subFont: 'bold 13.5px "Segoe UI", Arial',
      subColor: '#64748b',
      font: '900 28px "Segoe UI", Arial',
      border: '#000000',
      mainOffset: 16,
      subOffset: 35
    });

    // Baris 5: Subheaders Gender: PUTRA | PUTRI | PUTRA | PUTRI
    const qGtW = gtW / 4; // 167.5
    drawCell(gtX, botY + 158, qGtW, 24, "PUTRA", { bg: '#f1f5f9', border: '#000000', font: 'bold 12.5px "Segoe UI", Arial' });
    drawCell(gtX + qGtW, botY + 158, qGtW, 24, "PUTRI", { bg: '#f1f5f9', border: '#000000', font: 'bold 12.5px "Segoe UI", Arial' });
    drawCell(gtX + qGtW * 2, botY + 158, qGtW, 24, "PUTRA", { bg: '#f1f5f9', border: '#000000', font: 'bold 12.5px "Segoe UI", Arial' });
    drawCell(gtX + qGtW * 3, botY + 158, qGtW, 24, "PUTRI", { bg: '#f1f5f9', border: '#000000', font: 'bold 12.5px "Segoe UI", Arial' });

    // Baris 6: Nilai Gender Mukim & Non Mukim + Prosentase (Diperbesar 22px & Rapi)
    drawCell(gtX, botY + 182, qGtW, 44, `${m.mukimPa}`, {
      subText: `(${m.mukimPaPct})`,
      subFont: 'bold 12px "Segoe UI", Arial',
      subColor: '#64748b',
      font: '900 22px "Segoe UI", Arial',
      border: '#000000',
      mainOffset: 15,
      subOffset: 33
    });
    drawCell(gtX + qGtW, botY + 182, qGtW, 44, `${m.mukimPi}`, {
      subText: `(${m.mukimPiPct})`,
      subFont: 'bold 12px "Segoe UI", Arial',
      subColor: '#64748b',
      font: '900 22px "Segoe UI", Arial',
      border: '#000000',
      mainOffset: 15,
      subOffset: 33
    });
    drawCell(gtX + qGtW * 2, botY + 182, qGtW, 44, `${m.nonMukimPa}`, {
      subText: `(${m.nonMukimPaPct})`,
      subFont: 'bold 12px "Segoe UI", Arial',
      subColor: '#64748b',
      font: '900 22px "Segoe UI", Arial',
      border: '#000000',
      mainOffset: 15,
      subOffset: 33
    });
    drawCell(gtX + qGtW * 3, botY + 182, qGtW, 44, `${m.nonMukimPi}`, {
      subText: `(${m.nonMukimPiPct})`,
      subFont: 'bold 12px "Segoe UI", Arial',
      subColor: '#64748b',
      font: '900 22px "Segoe UI", Arial',
      border: '#000000',
      mainOffset: 15,
      subOffset: 33
    });

    // --- 5. EKSPOR KE FILE GAMBAR PNG HD KUALITAS TINGGI ---
    canvas.toBlob(blob => {
      if (!blob) {
        alert('Gagal menghasilkan file gambar.');
        return;
      }
      const safeLabel = curObj.label.replace(/\s+/g, '_');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Laporan_Data_Pelajar_YTPAI_${safeLabel}_Matriks.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Infografis Matriks HD Berhasil Diunduh', `Berkas gambar Laporan_Data_Pelajar_YTPAI_${safeLabel}_Matriks.png (Rasio 4:3 Landscape) dengan angka besar & prosentase presisi siap dibagikan.`);
    }, 'image/png');
  }

  // --- 10. IMPORT EXCEL BULANAN (DRAG & DROP / FILE INPUT) ---
  function openImportSantriModal() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    input.multiple = true;
    input.onchange = e => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;
      processImportedExcelFiles(files);
    };
    input.click();
  }

  function processImportedExcelFiles(files) {
    if (typeof XLSX === 'undefined') {
      alert('Pustaka SheetJS belum selesai dimuat.');
      return;
    }

    let filesRead = 0;
    let newStudentsCount = 0;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const data = new Uint8Array(evt.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonRows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

          // Detect header row
          let headerIdx = -1;
          let regCol = -1, namaCol = -1, jkCol = -1, statusCol = -1, bulananCol = -1;

          for (let r = 0; r < Math.min(10, jsonRows.length); r++) {
            const row = jsonRows[r] || [];
            const rowStr = row.join(' ').toLowerCase();
            if (rowStr.includes('nama') || rowStr.includes('registrasi')) {
              headerIdx = r;
              row.forEach((cell, cIdx) => {
                const s = String(cell || '').toLowerCase();
                if (s.includes('registrasi') || s.includes('nis')) regCol = cIdx;
                else if (s.includes('nama')) namaCol = cIdx;
                else if (s.includes('kelamin') || s === 'l/p' || s.includes('jk')) jkCol = cIdx;
                else if (s.includes('status') || s.includes('kamar')) statusCol = cIdx;
                else if (s.includes('bulanan') || s.includes('syahriyah')) bulananCol = cIdx;
              });
              break;
            }
          }

          // Extract unit and grade from file name
          let fileUnit = 'MTs', fileGrade = 7;
          const match = file.name.match(/(MTs|SMP|MA|SMA)\s*(\d+)/i);
          if (match) {
            fileUnit = match[1].toUpperCase() === 'MTS' ? 'MTs' : match[1].toUpperCase();
            fileGrade = parseInt(match[2], 10);
          }

          if (headerIdx >= 0 && namaCol >= 0) {
            for (let r = headerIdx + 1; r < jsonRows.length; r++) {
              const row = jsonRows[r] || [];
              const rawNama = String(row[namaCol] || '').trim();
              const rawReg = regCol >= 0 ? String(row[regCol] || '').trim() : '';

              if (!rawNama || rawNama.toLowerCase().includes('jumlah') || rawNama.toLowerCase().includes('keterangan')) continue;

              const rawJk = jkCol >= 0 ? String(row[jkCol] || '').trim().toUpperCase() : 'PA';
              const jk = (rawJk.includes('P') || rawJk === 'PI') ? 'PI' : 'PA';
              const rawStatus = statusCol >= 0 ? String(row[statusCol] || '').trim().toLowerCase() : '';
              
              let status = 'Mukim Reguler';
              if (rawStatus.includes('vip')) status = 'Mukim VIP';
              else if (rawStatus.includes('non')) status = 'Non Mukim';

              let bulanan = 281000;
              if (bulananCol >= 0 && row[bulananCol]) {
                const num = parseInt(String(row[bulananCol]).replace(/[^\d]/g, ''), 10);
                if (!isNaN(num) && num > 0) bulanan = num;
              } else {
                const gStr = String(fileGrade);
                if (TARIFF_CATALOG[gStr] && TARIFF_CATALOG[gStr][status]) {
                  bulanan = TARIFF_CATALOG[gStr][status];
                }
              }

              // Update existing or add new
              const existingIdx = santriDataList.findIndex(s => s.reg === rawReg && rawReg !== '');
              if (existingIdx >= 0) {
                santriDataList[existingIdx].nama = rawNama;
                santriDataList[existingIdx].jk = jk;
                santriDataList[existingIdx].unit = fileUnit;
                santriDataList[existingIdx].kelas = fileGrade;
                santriDataList[existingIdx].status = status;
                santriDataList[existingIdx].bulanan = bulanan;
              } else {
                santriDataList.push({
                  reg: rawReg || String(Date.now()).slice(-5),
                  nama: rawNama,
                  jk,
                  unit: fileUnit,
                  kelas: fileGrade,
                  status,
                  bulanan,
                  alamat: 'Impor Excel'
                });
                newStudentsCount++;
              }
            }
          }

          filesRead++;
          if (filesRead === files.length) {
            saveSantriDataList();
            calculateAndRenderAll();
            showToast('Impor Selesai', `${files.length} berkas diproses. ${newStudentsCount} santri baru ditambahkan.`);
          }
        } catch (err) {
          console.error('Error importing file:', err);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  // --- 10. MATRIX INTERACTIVE ZOOM & FIT ENGINE (DUAL-PLATFORM PRIMA) ---
  let currentMatrixScale = 1;
  let isMatrixFitMode = true;
  let zoomListenersInitialized = false;
  const MATRIX_BASE_WIDTH = 960;

  function calculateMatrixFitScale() {
    const viewport = document.getElementById('matrixZoomViewport');
    if (!viewport) return 1;
    // Available width inside viewport minus padding
    const availWidth = Math.max(260, viewport.clientWidth - 16);
    // Scale proportionally so 960px fits completely within viewport
    return Math.min(1, Math.round((availWidth / MATRIX_BASE_WIDTH) * 1000) / 1000);
  }

  function applyMatrixScale(scale, isFit = false) {
    const canvas = document.getElementById('santriInfographicCanvas');
    const stage = document.getElementById('matrixZoomStage');
    const badge = document.getElementById('matrixZoomLevelBadge');
    const btnFit = document.getElementById('btnMatrixZoomFit');
    const btn100 = document.getElementById('btnMatrixZoom100');

    if (!canvas || !stage) return;

    // Clamp scale between 0.25 (ultra fit) and 2.5 (deep zoom)
    scale = Math.max(0.25, Math.min(2.5, scale));
    currentMatrixScale = scale;
    isMatrixFitMode = isFit;

    // Apply CSS scale transform
    canvas.style.transform = `scale(${scale})`;
    canvas.style.transformOrigin = 'top left';

    // Measure unscaled height
    const unscaledHeight = canvas.offsetHeight || 980;

    // Set stage dimensions to tightly fit the scaled element
    const scaledWidth = Math.round(MATRIX_BASE_WIDTH * scale);
    const scaledHeight = Math.round(unscaledHeight * scale);

    stage.style.width = `${scaledWidth}px`;
    stage.style.height = `${scaledHeight}px`;

    // Update level badge
    if (badge) {
      if (isFit) {
        badge.textContent = `Fit (${Math.round(scale * 100)}%)`;
      } else {
        badge.textContent = `${Math.round(scale * 100)}%`;
      }
    }

    // Update active button indicators
    if (btnFit && btn100) {
      if (isFit) {
        btnFit.className = 'px-2 py-1 rounded-md text-[11px] font-bold bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs transition-all flex items-center gap-1 cursor-pointer';
        btn100.className = 'px-2 py-1 rounded-md text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer';
      } else if (Math.abs(scale - 1) < 0.05) {
        btnFit.className = 'px-2 py-1 rounded-md text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-1 cursor-pointer';
        btn100.className = 'px-2 py-1 rounded-md text-[11px] font-bold bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs transition-all cursor-pointer';
      } else {
        btnFit.className = 'px-2 py-1 rounded-md text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-1 cursor-pointer';
        btn100.className = 'px-2 py-1 rounded-md text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer';
      }
    }
  }

  function setMatrixScale(modeOrScale) {
    if (modeOrScale === 'fit') {
      const fitScale = calculateMatrixFitScale();
      applyMatrixScale(fitScale, true);
    } else {
      const numScale = Number(modeOrScale) || 1;
      applyMatrixScale(numScale, false);
    }
  }

  function adjustMatrixScale(delta) {
    const newScale = Math.round((currentMatrixScale + delta) * 100) / 100;
    applyMatrixScale(newScale, false);
  }

  function initMatrixZoomControls() {
    const viewport = document.getElementById('matrixZoomViewport');
    if (!viewport) return;

    // Apply initial fit scale on mobile (< 1024px) or full scale on desktop
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (window.innerWidth < 1024) {
          setMatrixScale('fit');
        } else {
          setMatrixScale(1);
        }
        if (window.lucide && typeof lucide.createIcons === 'function') {
          lucide.createIcons();
        }
      }, 50);
    });

    if (zoomListenersInitialized) return;
    zoomListenersInitialized = true;

    // 1. Debounced resize listener
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isMatrixFitMode) {
          setMatrixScale('fit');
        } else {
          applyMatrixScale(currentMatrixScale, false);
        }
      }, 100);
    });

    // 2. Double-tap to toggle between Fit and 100%
    let lastTap = 0;
    viewport.addEventListener('touchend', (e) => {
      if (e.touches.length > 0) return;
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 350 && tapLength > 0) {
        e.preventDefault();
        if (isMatrixFitMode || currentMatrixScale < 0.8) {
          setMatrixScale(1);
        } else {
          setMatrixScale('fit');
        }
      }
      lastTap = currentTime;
    });

    // 3. Pinch-to-zoom touch gestures (2 fingers)
    let initialDistance = 0;
    let initialScale = 1;
    let isPinching = false;

    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        isPinching = true;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialDistance = Math.hypot(dx, dy);
        initialScale = currentMatrixScale;
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (isPinching && e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.hypot(dx, dy);
        if (initialDistance > 0) {
          const factor = currentDistance / initialDistance;
          const targetScale = Math.round(initialScale * factor * 100) / 100;
          applyMatrixScale(targetScale, false);
        }
      }
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) {
        isPinching = false;
      }
    }, { passive: true });
  }

  // --- EXPOSE TO GLOBAL WINDOW ---
  window.initSantriModule = initSantriModule;
  window.resetSantriToMasterDefault = resetSantriToMasterDefault;
  window.renderSantriTable = renderSantriTable;
  window.goToSantriPage = goToSantriPage;
  window.quickToggleSantriStatus = quickToggleSantriStatus;
  window.toggleSantriBoyong = toggleSantriBoyong;
  window.openEditSantriModal = openEditSantriModal;
  window.openAddSantriModal = openAddSantriModal;
  window.closeEditSantriModal = closeEditSantriModal;
  window.autoUpdateSantriTariff = autoUpdateSantriTariff;
  window.saveSantriData = saveSantriData;
  window.openTagihanJunioModal = openTagihanJunioModal;
  window.closeTagihanJunioModal = closeTagihanJunioModal;
  window.exportDataJadiJunioExcel = exportDataJadiJunioExcel;
  window.downloadSantriExcelMatrix = downloadSantriExcelMatrix;
  window.downloadSantriInfographicHd = downloadSantriInfographicHd;
  window.openImportSantriModal = openImportSantriModal;
  window.onSantriPeriodChange = onSantriPeriodChange;

  // Fitur Zoom & Fit Layar Matriks
  window.setMatrixScale = setMatrixScale;
  window.adjustMatrixScale = adjustMatrixScale;
  window.applyMatrixScale = applyMatrixScale;
  window.initMatrixZoomControls = initMatrixZoomControls;


  // =========================================================================
  // --- 8. ENGINE ALUR RAPAT REKONSILIASI & AUTO-EXPORT FOLDER BERJENJANG ---
  // =========================================================================

  const RECONCILIATION_CLASSES = [
    { unit: 'MTs', kelas: 7, label: 'MTs 7', fileName: 'MTs 7.xlsx' },
    { unit: 'MTs', kelas: 8, label: 'MTs 8', fileName: 'MTs 8.xlsx' },
    { unit: 'MTs', kelas: 9, label: 'MTS 9', fileName: 'MTS 9.xlsx' },
    { unit: 'SMP', kelas: 7, label: 'SMP 7', fileName: 'SMP 7.xlsx' },
    { unit: 'SMP', kelas: 8, label: 'SMP 8', fileName: 'SMP 8.xlsx' },
    { unit: 'SMP', kelas: 9, label: 'SMP 9', fileName: 'SMP 9.xlsx' },
    { unit: 'MA', kelas: 10, label: 'MA 10', fileName: 'MA 10.xlsx' },
    { unit: 'MA', kelas: 11, label: 'MA 11', fileName: 'MA 11.xlsx' },
    { unit: 'MA', kelas: 12, label: 'MA 12', fileName: 'MA 12.xlsx' },
    { unit: 'SMA', kelas: 10, label: 'SMA 10', fileName: 'SMA 10.xlsx' },
    { unit: 'SMA', kelas: 11, label: 'SMA 11', fileName: 'SMA 11.xlsx' },
    { unit: 'SMA', kelas: 12, label: 'SMA 12', fileName: 'SMA 12.xlsx' }
  ];

  function getReconciliationFolderName(periodKey) {
    const parts = (periodKey || '11-2026').split('-');
    const mm = Number(parts[0]) || 11;
    const yyyy = Number(parts[1]) || 2026;
    const monthNames = [
      '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    let orderNum = 1;
    if (mm >= 7 && mm <= 12) {
      orderNum = mm - 5; // Juli(7)->02, Agu(8)->03, Sep(9)->04, Okt(10)->05, Nov(11)->06, Des(12)->07
    } else if (mm >= 1 && mm <= 6) {
      orderNum = mm + 7; // Jan(1)->08, Feb(2)->09, Mar(3)->10, Apr(4)->11, Mei(5)->12, Jun(6)->13
    }
    const prefix = String(orderNum).padStart(2, '0');
    const mName = monthNames[mm] || 'Bulan';
    return `${prefix}. Bulan ${mName} tagihan`;
  }

  function getPeriodReconcileState() {
    if (!monthlySantriStore || !monthlySantriStore[currentPeriodKey]) return null;
    const curObj = monthlySantriStore[currentPeriodKey];
    if (!curObj.reconciliation) {
      curObj.reconciliation = {
        verifiedClasses: {},
        activeClassKey: 'MTs-7'
      };
    }
    return curObj.reconciliation;
  }

  function renderReconciliationUI() {
    const panel = document.getElementById('panelRapatRekonsiliasi');
    if (!panel) return;

    const curObj = monthlySantriStore[currentPeriodKey];
    if (!curObj) return;

    const recState = getPeriodReconcileState();
    if (!recState) return;

    // 1. Header Badges
    const periodBadge = document.getElementById('reconcilePeriodBadge');
    if (periodBadge) {
      periodBadge.textContent = `Bulan ${curObj.label}`;
    }

    const statusBadge = document.getElementById('reconcileGlobalStatusBadge');
    if (statusBadge) {
      if (curObj.isPedoman) {
        statusBadge.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 dark:border-teal-800';
        statusBadge.textContent = 'Pedoman Master (Fiks)';
      } else if (curObj.status === 'LOCKED') {
        statusBadge.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800';
        statusBadge.textContent = 'Rapat Fiks & Disahkan';
      } else {
        statusBadge.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-700';
        statusBadge.textContent = 'Draf Rapat Sedang Berjalan';
      }
    }

    // 2. Kalkulasi Progress ACC 12 Kelas
    const verifiedKeys = Object.keys(recState.verifiedClasses || {}).filter(k => recState.verifiedClasses[k]);
    const verifiedCount = verifiedKeys.length;
    const totalClasses = RECONCILIATION_CLASSES.length; // 12
    const pct = Math.min(100, Math.round((verifiedCount / totalClasses) * 100));

    const progressText = document.getElementById('reconcileProgressText');
    if (progressText) {
      progressText.textContent = `${verifiedCount} dari ${totalClasses} Kelas Di-ACC (${pct}%)`;
    }

    const progressBar = document.getElementById('reconcileProgressBar');
    if (progressBar) {
      progressBar.style.width = `${pct}%`;
    }

    // 3. Grid 12 Kelas (4 Unit)
    const gridEl = document.getElementById('reconcileClassesGrid');
    if (gridEl) {
      const units = [
        { key: 'MTs', name: 'MTs', color: 'emerald', border: 'border-emerald-500/30 dark:border-emerald-500/20', bg: 'bg-emerald-50/50 dark:bg-emerald-950/20' },
        { key: 'SMP', name: 'SMP', color: 'blue', border: 'border-blue-500/30 dark:border-blue-500/20', bg: 'bg-blue-50/50 dark:bg-blue-950/20' },
        { key: 'MA', name: 'MA', color: 'lime', border: 'border-lime-500/30 dark:border-lime-500/20', bg: 'bg-lime-50/50 dark:bg-lime-950/20' },
        { key: 'SMA', name: 'SMA', color: 'amber', border: 'border-amber-500/30 dark:border-amber-500/20', bg: 'bg-amber-50/50 dark:bg-amber-950/20' }
      ];

      let gridHtml = '';
      units.forEach(u => {
        const uClasses = RECONCILIATION_CLASSES.filter(c => c.unit === u.key);
        const uVerified = uClasses.filter(c => recState.verifiedClasses[`${c.unit}-${c.kelas}`]).length;
        const isUnitAllAcc = uVerified === uClasses.length;

        gridHtml += `
          <div class="rounded-xl border ${u.border} ${u.bg} p-2.5 sm:p-3 space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-black text-xs text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-${u.color}-500"></span>
                <span>Unit ${u.name}</span>
              </span>
              <span class="text-[10px] font-black px-1.5 py-0.2 rounded ${isUnitAllAcc ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}">
                ${isUnitAllAcc ? '✓ Unit Fiks' : `${uVerified}/${uClasses.length} ACC`}
              </span>
            </div>

            <div class="space-y-1.5">
        `;

        uClasses.forEach(c => {
          const classKey = `${c.unit}-${c.kelas}`;
          const isVerified = Boolean(recState.verifiedClasses[classKey]);
          const isActive = recState.activeClassKey === classKey;

          // Hitung santri aktif di kelas ini
          const count = curObj.students.filter(s => s.unit === c.unit && String(s.kelas) === String(c.kelas) && s.status !== 'Boyong').length;

          let btnClass = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400';
          if (isActive) {
            btnClass = 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200 ring-2 ring-amber-400/50 font-black shadow-xs';
          } else if (isVerified) {
            btnClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/60 text-emerald-900 dark:text-emerald-200 font-bold';
          }

          gridHtml += `
            <button 
              type="button" 
              onclick="selectReconciliationClass('${c.unit}', ${c.kelas})"
              class="w-full px-2.5 py-1.5 rounded-lg border text-xs flex items-center justify-between transition-all cursor-pointer ${btnClass}"
            >
              <div class="flex items-center gap-1.5">
                ${isVerified 
                  ? '<span class="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">✓</span>' 
                  : (isActive 
                      ? '<span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>' 
                      : '<span class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>')}
                <span class="font-bold">Kelas ${c.kelas}</span>
              </div>
              <span class="text-[11px] font-mono font-bold opacity-80">${count} Santri</span>
            </button>
          `;
        });

        gridHtml += `
            </div>
          </div>
        `;
      });

      gridEl.innerHTML = gridHtml;
    }

    // 4. Update Active Class Banner
    const activeItem = RECONCILIATION_CLASSES.find(c => `${c.unit}-${c.kelas}` === recState.activeClassKey) || RECONCILIATION_CLASSES[0];
    const activeKey = `${activeItem.unit}-${activeItem.kelas}`;
    const isActVerified = Boolean(recState.verifiedClasses[activeKey]);

    const activeBadge = document.getElementById('activeClassUnitBadge');
    if (activeBadge) activeBadge.textContent = activeItem.unit;

    const activeTitle = document.getElementById('activeClassTitle');
    if (activeTitle) activeTitle.textContent = `${activeItem.unit} - KELAS ${activeItem.kelas} • SIAP DICOCOKKAN`;

    const activeAccBadge = document.getElementById('activeClassAccStatusBadge');
    if (activeAccBadge) {
      if (isActVerified) {
        activeAccBadge.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300';
        activeAccBadge.textContent = '✓ SUDAH DI-ACC';
      } else {
        activeAccBadge.className = 'px-2 py-0.5 rounded text-[10px] font-black bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-300 dark:border-slate-700';
        activeAccBadge.textContent = 'BELUM DI-ACC';
      }
    }

    // Hitung rincian kelas aktif
    const classStudents = curObj.students.filter(s => s.unit === activeItem.unit && String(s.kelas) === String(activeItem.kelas));
    const actTotal = classStudents.filter(s => s.status !== 'Boyong').length;
    const actMukim = classStudents.filter(s => s.status && s.status.includes('Mukim')).length;
    const actNon = classStudents.filter(s => s.status === 'Non Mukim').length;
    const actBoyong = classStudents.filter(s => s.status === 'Boyong').length;

    const summaryStats = document.getElementById('activeClassSummaryStats');
    if (summaryStats) {
      summaryStats.innerHTML = `
        <span class="font-extrabold text-slate-800 dark:text-slate-100">${actTotal} Santri Aktif</span>
        <span>•</span>
        <span class="font-bold text-teal-700 dark:text-teal-300">${actMukim} Mukim</span>
        <span>•</span>
        <span class="font-bold text-slate-600 dark:text-slate-300">${actNon} Non-Mukim</span>
        ${actBoyong > 0 ? `<span>•</span><span class="font-black text-rose-600 dark:text-rose-400">${actBoyong} Boyong</span>` : ''}
      `;
    }

    const btnAccText = document.getElementById('btnAccActiveClassText');
    if (btnAccText) {
      btnAccText.textContent = isActVerified 
        ? `✓ ${activeItem.label} Sudah Di-ACC (Lanjut ➔)` 
        : `✓ ACC & Fikskan Kelas ${activeItem.label} (Lanjut ➔)`;
    }

    const focusName = document.getElementById('reconcileActiveClassName');
    if (focusName) {
      focusName.textContent = `Fokus: ${activeItem.unit} Kelas ${activeItem.kelas}`;
    }

    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  }

  function selectReconciliationClass(unit, kelas) {
    const recState = getPeriodReconcileState();
    if (!recState) return;

    recState.activeClassKey = `${unit}-${kelas}`;
    saveMonthlySantriStore();

    // Otomatis sinkronkan filter unit dan filter kelas tabel santri
    selectUnitMeetingTab(unit);
    selectKelasMeetingTab(String(kelas));

    renderReconciliationUI();
  }

  function stepReconciliationClass(direction) {
    const recState = getPeriodReconcileState();
    if (!recState) return;

    const curIdx = RECONCILIATION_CLASSES.findIndex(c => `${c.unit}-${c.kelas}` === recState.activeClassKey);
    let nextIdx = curIdx + direction;

    if (nextIdx < 0) nextIdx = 0;
    if (nextIdx >= RECONCILIATION_CLASSES.length) {
      // Sudah sampai kelas terakhir: Buka modal pengesahan final!
      openModalPengesahanRapat();
      return;
    }

    const target = RECONCILIATION_CLASSES[nextIdx];
    selectReconciliationClass(target.unit, target.kelas);
  }

  function accCurrentReconciliationClass() {
    const recState = getPeriodReconcileState();
    if (!recState) return;

    const activeKey = recState.activeClassKey;
    const activeItem = RECONCILIATION_CLASSES.find(c => `${c.unit}-${c.kelas}` === activeKey);

    recState.verifiedClasses[activeKey] = true;
    saveMonthlySantriStore();

    showToast('Kelas Berhasil Di-ACC', `Data santri ${activeItem ? activeItem.label : activeKey} tervalidasi fiks.`);

    // Periksa apakah semua kelas sudah di-ACC
    const verifiedKeys = Object.keys(recState.verifiedClasses || {}).filter(k => recState.verifiedClasses[k]);
    if (verifiedKeys.length === RECONCILIATION_CLASSES.length) {
      renderReconciliationUI();
      openModalPengesahanRapat();
    } else {
      stepReconciliationClass(1);
    }
  }

  // --- MODAL PENGESAHAN & AUTO-EXPORT FOLDER HANDLERS ---
  function openModalPengesahanRapat() {
    const curObj = monthlySantriStore[currentPeriodKey];
    if (!curObj) return;

    const modal = document.getElementById('modalPengesahanRapatRekonsiliasi');
    if (!modal) return;

    const subtitle = document.getElementById('pengesahanPeriodSubtitle');
    if (subtitle) subtitle.textContent = `Periode Tagihan: Bulan ${curObj.label}`;

    const folderName = getReconciliationFolderName(currentPeriodKey);
    const folderBadge = document.getElementById('pengesahanFolderNameBadge');
    if (folderBadge) folderBadge.textContent = folderName;

    const zipText = document.getElementById('pengesahanZipNameText');
    if (zipText) zipText.textContent = `[${folderName}.zip]`;

    // Kalkulasi ringkasan santri
    const activeList = curObj.students.filter(s => s.status !== 'Boyong');
    const mukimCount = activeList.filter(s => s.status && s.status.includes('Mukim')).length;
    const nonCount = activeList.filter(s => s.status === 'Non Mukim').length;
    const boyongCount = curObj.students.filter(s => s.status === 'Boyong').length;

    const statsGrid = document.getElementById('pengesahanStatsGrid');
    if (statsGrid) {
      statsGrid.innerHTML = `
        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div class="text-[10px] uppercase font-bold text-slate-500">Total Santri</div>
          <div class="text-base sm:text-lg font-black text-slate-900 dark:text-white">${activeList.length}</div>
        </div>
        <div class="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800">
          <div class="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-300">Santri Mukim</div>
          <div class="text-base sm:text-lg font-black text-teal-800 dark:text-teal-200">${mukimCount}</div>
        </div>
        <div class="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
          <div class="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300">Non Mukim</div>
          <div class="text-base sm:text-lg font-black text-amber-800 dark:text-amber-200">${nonCount}</div>
        </div>
        <div class="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800">
          <div class="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300">Santri Boyong</div>
          <div class="text-base sm:text-lg font-black text-rose-800 dark:text-rose-200">${boyongCount}</div>
        </div>
      `;
    }

    modal.classList.remove('hidden');
    if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
  }

  function closeModalPengesahanRapat() {
    const modal = document.getElementById('modalPengesahanRapatRekonsiliasi');
    if (modal) modal.classList.add('hidden');
  }

  function confirmSahDanKunciRapat() {
    const curObj = monthlySantriStore[currentPeriodKey];
    if (!curObj) return;

    curObj.status = 'LOCKED';
    curObj.lockedAt = new Date().toISOString();
    saveMonthlySantriStore();

    closeModalPengesahanRapat();
    calculateAndRenderAll();
    showToast('Hasil Rapat Disahkan', `Bulan ${curObj.label} resmi difinalkan & terkunci untuk pembuatan tagihan Junio.`);
  }

  // Helper Pembuat File Excel 5 Kolom Resmi per Kelas
  function buildClassExcelArrayBuffer(unit, kelas, periodKey) {
    if (typeof XLSX === 'undefined') return null;

    const curObj = monthlySantriStore[periodKey];
    if (!curObj) return null;

    const parts = (periodKey || '11-2026').split('-');
    const mm = parts[0] || '11';
    const yyyy = parts[1] || '2026';
    const tglEfektif = `01-${mm}-${yyyy}`;
    const tglTempo = `10-${mm}-${yyyy}`;

    const students = curObj.students.filter(s => s.unit === unit && String(s.kelas) === String(kelas) && s.status !== 'Boyong');

    const rows = [
      ['No. Registrasi', 'ID Tagihan', 'Jumlah', 'Tanggal Efektif', 'Tanggal Jatuh Tempo']
    ];

    students.forEach(s => {
      rows.push([
        String(s.reg).padStart(6, '0'),
        '63',
        Number(s.bulanan) || 281000,
        tglEfektif,
        tglTempo
      ]);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, 'Import Tagihan');
    return XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  }

  // Helper Pembuat File Tagihan Junio Lengkap 4 Unit
  function buildAllJunioExcelArrayBuffer(periodKey) {
    if (typeof XLSX === 'undefined') return null;
    const curObj = monthlySantriStore[periodKey];
    if (!curObj) return null;

    const parts = (periodKey || '11-2026').split('-');
    const mm = parts[0] || '11';
    const yyyy = parts[1] || '2026';
    const tglEfektif = `01-${mm}-${yyyy}`;
    const tglTempo = `10-${mm}-${yyyy}`;

    const students = curObj.students.filter(s => s.status !== 'Boyong');
    const rows = [
      ['No. Registrasi', 'ID Tagihan', 'Jumlah', 'Tanggal Efektif', 'Tanggal Jatuh Tempo']
    ];

    students.forEach(s => {
      rows.push([
        String(s.reg).padStart(6, '0'),
        '63',
        Number(s.bulanan) || 281000,
        tglEfektif,
        tglTempo
      ]);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, 'Tagihan Junio Smart');
    return XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  }

  // --- EKSPOR 1: SIMPAN KE FOLDER KOMPUTER (WEB FILE SYSTEM API) ---
  async function exportReconciliationToFilesystem() {
    if (typeof window.showDirectoryPicker !== 'function') {
      alert('Peramban Anda tidak mendukung akses folder langsung (Web File System API). Silakan gunakan tombol Opsi 2 (Unduh Paket ZIP) untuk mendapatkan seluruh berkas lengkap.');
      return;
    }

    const folderName = getReconciliationFolderName(currentPeriodKey);

    try {
      showToast('Pilih Folder Induk', 'Pilih folder "Data Santri" di komputer Anda.');
      const parentDirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
      
      // Buat subfolder baru sesuai urutan: misal "06. Bulan November tagihan"
      const subDirHandle = await parentDirHandle.getDirectoryHandle(folderName, { create: true });

      // 1. Tulis 12 File Excel Kelas
      for (const item of RECONCILIATION_CLASSES) {
        const fileBuf = buildClassExcelArrayBuffer(item.unit, item.kelas, currentPeriodKey);
        if (fileBuf) {
          const fileHandle = await subDirHandle.getFileHandle(item.fileName, { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(fileBuf);
          await writable.close();
        }
      }

      // 2. Tulis File Tagihan Junio Smart Lengkap
      const junioBuf = buildAllJunioExcelArrayBuffer(currentPeriodKey);
      if (junioBuf) {
        const junioFileName = `Tagihan_Junio_Smart_${currentPeriodKey}.xlsx`;
        const fileHandle = await subDirHandle.getFileHandle(junioFileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(junioBuf);
        await writable.close();
      }

      confirmSahDanKunciRapat();
      alert(`Alhamdulillah! Folder "${folderName}" berhasil dibuat di dalam folder Data Santri Anda, dan seluruh 13 berkas Excel kelas resmi telah tersimpan rapi!`);

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('File system export error:', err);
        alert('Gagal menyimpan ke folder: ' + err.message + '. Silakan gunakan Opsi 2 (Unduh Paket ZIP).');
      }
    }
  }

  // --- EKSPOR 2: UNDUH BUNDLE ZIP LENGKAP (JSZip) ---
  async function exportReconciliationToZip() {
    if (typeof JSZip === 'undefined') {
      alert('Pustaka JSZip sedang dimuat, silakan coba sesaat lagi.');
      return;
    }

    const folderName = getReconciliationFolderName(currentPeriodKey);
    const zip = new JSZip();
    const folder = zip.folder(folderName);

    // 1. Masukkan 12 File Excel Kelas
    for (const item of RECONCILIATION_CLASSES) {
      const fileBuf = buildClassExcelArrayBuffer(item.unit, item.kelas, currentPeriodKey);
      if (fileBuf) {
        folder.file(item.fileName, fileBuf);
      }
    }

    // 2. Masukkan File Tagihan Junio Lengkap
    const junioBuf = buildAllJunioExcelArrayBuffer(currentPeriodKey);
    if (junioBuf) {
      folder.file(`Tagihan_Junio_Smart_${currentPeriodKey}.xlsx`, junioBuf);
    }

    showToast('Menyiapkan ZIP...', 'Mengemas seluruh 13 berkas Excel kelas ke dalam ZIP...');
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Download via link
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${folderName}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    confirmSahDanKunciRapat();
    showToast('Paket ZIP Terunduh', `Berkas ${folderName}.zip berhasil disimpan.`);
  }

  // Fitur Analisis Tren MoM, Grafik Garis & Mutasi Santri
  window.renderSantriTrendAnalytics = renderSantriTrendAnalytics;
  window.renderMonthlyStudentLineChart = renderMonthlyStudentLineChart;
  window.switchStudentChartMode = switchStudentChartMode;
  window.setUnitChartFocus = setUnitChartFocus;
  window.selectChartPeriodTab = selectChartPeriodTab;
  window.renderSelectedPeriodDetail = renderSelectedPeriodDetail;
  window.renderReconciliationUI = renderReconciliationUI;
  window.selectReconciliationClass = selectReconciliationClass;
  window.stepReconciliationClass = stepReconciliationClass;
  window.accCurrentReconciliationClass = accCurrentReconciliationClass;
  window.openModalPengesahanRapat = openModalPengesahanRapat;
  window.closeModalPengesahanRapat = closeModalPengesahanRapat;
  window.confirmSahDanKunciRapat = confirmSahDanKunciRapat;
  window.exportReconciliationToFilesystem = exportReconciliationToFilesystem;
  window.exportReconciliationToZip = exportReconciliationToZip;
  window.getReconciliationFolderName = getReconciliationFolderName;
  window.showStudentChartTooltip = showStudentChartTooltip;
  window.hideStudentChartTooltip = hideStudentChartTooltip;
  window.unpinStudentChartTooltip = unpinStudentChartTooltip;
  window.updatePeriodHeaderUI = updatePeriodHeaderUI;
  window.onComparisonBasePeriodChange = onComparisonBasePeriodChange;
  window.toggleLockCurrentPeriod = toggleLockCurrentPeriod;
  window.openModalTambahPeriode = openModalTambahPeriode;
  window.closeModalTambahPeriode = closeModalTambahPeriode;
  window.confirmTambahPeriodeBaru = confirmTambahPeriodeBaru;
  window.calculateMonthComparison = calculateMonthComparison;
  window.filterCompChanges = filterCompChanges;
  window.renderStudentDiffTable = renderStudentDiffTable;
  window.downloadBeritaAcaraRapatExcel = downloadBeritaAcaraRapatExcel;
  window.openCatatMutasiModal = openCatatMutasiModal;
  window.closeCatatMutasiModal = closeCatatMutasiModal;
  window.setMutasiType = setMutasiType;
  window.searchMutasiStudent = searchMutasiStudent;
  window.selectMutasiStudent = selectMutasiStudent;
  window.clearSelectedMutasiStudent = clearSelectedMutasiStudent;
  window.autoUpdateMutasiTariff = autoUpdateMutasiTariff;
  window.saveCatatMutasi = saveCatatMutasi;

  // Fitur Mode Rapat Unit & Paginasi Dinamis
  window.selectUnitMeetingTab = selectUnitMeetingTab;
  window.selectKelasMeetingTab = selectKelasMeetingTab;
  window.onSelectFilterUnitDropdown = onSelectFilterUnitDropdown;
  window.onSelectFilterKelasDropdown = onSelectFilterKelasDropdown;
  window.updateKelasMeetingSubTabs = updateKelasMeetingSubTabs;
  window.changeSantriPageSize = changeSantriPageSize;
  window.updateUnitMeetingTabButtons = updateUnitMeetingTabButtons;
  window.sortSantriHierarchy = sortSantriHierarchy;
  window.toggleSantriSortMode = toggleSantriSortMode;
  window.updateSortButtonUI = updateSortButtonUI;
  window.quickToggleSantriGender = quickToggleSantriGender;
  window.openSantriGenderModal = openSantriGenderModal;
  window.closeSantriGenderModal = closeSantriGenderModal;
  window.selectSantriGenderFromModal = selectSantriGenderFromModal;
  window.openSantriStatusModal = openSantriStatusModal;
  window.closeSantriStatusModal = closeSantriStatusModal;
  window.selectSantriStatusFromModal = selectSantriStatusFromModal;

})(typeof window !== 'undefined' ? window : this);
// END MODULE: tab_rekap_santri.js