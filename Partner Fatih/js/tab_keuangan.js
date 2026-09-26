// ============================================================================
// MODULE: tab_keuangan.js
// Catatan Keuangan Pintar & Radar Kebocoran Kas (Multi-Dompet)
// AI Scan Struk (Gemini Vision) • Voice Note Parser • Income Hunter
// Designed for Partner Fatih - Generator Briva
// ============================================================================

(function(global) {
  'use strict';

  // 1. Storage Keys (v2: Fresh Clean State for Real User Data)
  const STORAGE_FINANCE_DATA = 'partner_fatih_finance_data_v2';
  const STORAGE_WALLETS = 'partner_fatih_wallets_v2';

  // Auto clean legacy demo v1 cache
  try {
    localStorage.removeItem('partner_fatih_finance_data_v1');
    localStorage.removeItem('partner_fatih_wallets_v1');
  } catch(e) {}
  const STORAGE_GEMINI_KEY = 'partner_fatih_gemini_api_key_v1';
  const STORAGE_INCOME_IDEAS = 'partner_fatih_income_ideas_cache_v1';

  // 2. State
  let financeTransactions = [];
  let currentPeriod = 'month'; // 'day' | 'week' | 'month' | 'year'
  let activeWalletFilter = 'all'; // 'all' | 'pribadi' | 'operasional' | 'tabungan'
  let manualTransactionType = 'keluar';
  let isRecordingVoice = false;
  let voiceMediaRecorder = null;
  let voiceAudioChunks = [];
  let voiceSpeechRecognition = null;
  let lastCapturedVoiceText = '';
  let pendingVoiceTransactions = [];
  let currentScannedImageBase64 = null;
  let walletStartingBalances = {
    pribadi: 0,
    operasional: 0,
    tabungan: 0
  };
  // 3. Helper for Dynamic Relative Date
  function getRelativeDate(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + (offsetDays || 0));
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function generateInitialSampleTransactions() {
    return [
      {
        id: 'tx_sample_01',
        date: getRelativeDate(0),
        time: '07:15',
        type: 'keluar',
        wallet: 'operasional',
        category: 'Bensin & Transportasi',
        amount: 35000,
        note: 'Isi Pertalite Motor di SPBU Babat',
        isLeak: false
      },
      {
        id: 'tx_sample_02',
        date: getRelativeDate(0),
        time: '08:45',
        type: 'keluar',
        wallet: 'pribadi',
        category: 'Jajan & Kopi',
        amount: 18000,
        note: 'Kopi Susu Gula Aren & Gorengan Depan Gerbang',
        isLeak: true
      },
      {
        id: 'tx_sample_03',
        date: getRelativeDate(-1),
        time: '12:30',
        type: 'keluar',
        wallet: 'pribadi',
        category: 'Makanan & Minuman',
        amount: 25000,
        note: 'Makan Siang Nasi Rawon Warung Bu Har',
        isLeak: false
      },
      {
        id: 'tx_sample_04',
        date: getRelativeDate(-1),
        time: '16:10',
        type: 'keluar',
        wallet: 'pribadi',
        category: 'Jajan & Kopi',
        amount: 22000,
        note: 'Beli Boba Brown Sugar & Roti Bakar',
        isLeak: true
      },
      {
        id: 'tx_sample_05',
        date: getRelativeDate(-2),
        time: '14:20',
        type: 'keluar',
        wallet: 'pribadi',
        category: 'Belanja Minimarket',
        amount: 47500,
        note: 'Indomaret: Sabun, Snack Ringan, Minuman Dingin',
        isLeak: true
      },
      {
        id: 'tx_sample_06',
        date: getRelativeDate(-3),
        time: '10:00',
        type: 'masuk',
        wallet: 'tabungan',
        category: 'Gaji & Honor',
        amount: 2500000,
        note: 'Honor Mengajar & Insentif Pembina Tahfidz',
        isLeak: false
      },
      {
        id: 'tx_sample_07',
        date: getRelativeDate(-3),
        time: '11:00',
        type: 'transfer',
        wallet: 'tabungan',
        toWallet: 'operasional',
        category: 'Pindah Dana',
        amount: 750000,
        note: 'Alokasi Operasional Mengajar & Transport Mingguan',
        isLeak: false
      },
      {
        id: 'tx_sample_08',
        date: getRelativeDate(-4),
        time: '11:05',
        type: 'transfer',
        wallet: 'tabungan',
        toWallet: 'pribadi',
        category: 'Pindah Dana',
        amount: 1000000,
        note: 'Alokasi Kebutuhan Living & Makan Sehari-hari',
        isLeak: false
      },
      {
        id: 'tx_sample_09',
        date: getRelativeDate(-5),
        time: '19:40',
        type: 'keluar',
        wallet: 'operasional',
        category: 'Tagihan & Utilitas',
        amount: 105000,
        note: 'Beli Paket Data Internet Bulanan 50GB',
        isLeak: false
      }
    ];
  }

  // 4. Default Curated Income Ideas for Educators & Santri
  const DEFAULT_INCOME_IDEAS = [
    {
      title: 'Jasa Desain Pamflet & Template Kalender Program Pesantren/Madrasah',
      badge: 'Skill Digital • Cepat Cuan',
      potential: 'Rp 500.000 - Rp 1.800.000 / bln',
      capital: 'Rp 0 (Cukup Canva / Canva Pro & Laptop)',
      desc: 'Banyak lembaga, madrasah, TPQ, dan masjid di sekitar Babat/Lamongan membutuhkan pamflet agenda kegiatan, banner PHBI, dan postingan sosmed yang rapi. Anda sudah memiliki bank data 252 Program YTPAI yang bisa dijadikan portofolio!',
      steps: [
        'Kumpulkan 3 contoh flyer terbaik dari agenda YTPAI yang pernah dibuat.',
        'Tawarkan ke grup alumni, komite madrasah, atau pengurus takmir masjid terdekat.',
        'Pasang tarif ramah: Rp 35.000 - Rp 75.000 per desain atau paket bulanan Rp 300.000/lembaga.'
      ]
    },
    {
      title: 'Bimbingan Privat Tahfidz & Tahsin Al-Qur\'an (Offline / Online)',
      badge: 'Barokah & Bernilai Tinggi',
      potential: 'Rp 1.000.000 - Rp 3.000.000 / bln',
      capital: 'Rp 0 (Keahlian Mengaji & Al-Qur\'an)',
      desc: 'Orang tua siswa/santri saat ini sangat menginginkan anak-anaknya lancar tahsin dan menambah hafalan juz 30 di luar jam sekolah formal.',
      steps: [
        'Buka kelas privat maksimal 2-3 santri per sesi (durasi 45-60 menit sore/ba\'da maghrib).',
        'Gunakan metode setoran bertahap yang terstruktur (seperti modul tasmi\' Partner Fatih).',
        'Tarif standar: Rp 50.000 - Rp 85.000 per pertemuan atau paket Rp 400.000/santri/bulan.'
      ]
    },
    {
      title: 'Jasa Olah Data Excel, Raport Digital & Konversi Tagihan BRIVA',
      badge: 'Sangat Dicari Operator Sekolah',
      potential: 'Rp 750.000 - Rp 2.500.000 / proyek',
      capital: 'Rp 0 (Memanfaatkan Generator Briva & Excel)',
      desc: 'Banyak bendahara madrasah, TPQ atau pondok pesantren kecil yang kesulitan memformat data siswa ke dalam 5 kolom BRIVA atau membersihkan duplikasi data Excel.',
      steps: [
        'Tawarkan bantuan konversi formulir PPDB dan pembuatan database akun otomatis ke sekolah tetangga.',
        'Proses data dalam hitungan menit menggunakan alat Partner Fatih ini.',
        'Dapatkan bayaran per proyek per semester / tahun ajaran baru.'
      ]
    },
    {
      title: 'Affiliate & Suplai Perlengkapan Santri / Kitab & Seragam',
      badge: 'Bisnis Musiman Mantap',
      potential: 'Rp 1.200.000 - Rp 4.500.000 / musim',
      capital: 'Minim (Sistem Dropship / Pre-Order)',
      desc: 'Menjelang tahun ajaran baru dan semester baru, kebutuhan sarung, peci, mukena, kitab kuning pegon, dan buku ajar santri meningkat pesat.',
      steps: [
        'Jalin kerjasama dengan agen/penerbit kitab di Babat/Surabaya untuk sistem konsinyasi/PO.',
        'Sebarkan katalog digital ke wali santri via WhatsApp secara terstruktur.',
        'Margin keuntungan berkisar Rp 10.000 - Rp 35.000 per paket perlengkapan.'
      ]
    }
  ];

  // ============================================================================
  // INITIALIZATION & DATA PERSISTENCE
  // ============================================================================
  function initKeuanganModule() {
    loadFinanceData();
    renderAllFinanceViews();
    updateAiKeyBadgeStatus();
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function loadFinanceData() {
    try {
      const storedWallets = localStorage.getItem(STORAGE_WALLETS);
      if (storedWallets) {
        walletStartingBalances = Object.assign({ pribadi: 0, operasional: 0, tabungan: 0 }, JSON.parse(storedWallets));
      } else {
        walletStartingBalances = {
          pribadi: 0,
          operasional: 0,
          tabungan: 0
        };
        localStorage.setItem(STORAGE_WALLETS, JSON.stringify(walletStartingBalances));
      }
    } catch (e) {
      walletStartingBalances = { pribadi: 0, operasional: 0, tabungan: 0 };
    }

    try {
      const stored = localStorage.getItem(STORAGE_FINANCE_DATA);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          financeTransactions = parsed;
        } else {
          financeTransactions = [];
          saveFinanceData();
        }
      } else {
        financeTransactions = [];
        saveFinanceData();
      }
    } catch (e) {
      console.warn('Gagal membaca finance data:', e);
      financeTransactions = [];
    }
  }

  function saveFinanceData() {
    try {
      localStorage.setItem(STORAGE_FINANCE_DATA, JSON.stringify(financeTransactions));
    } catch (e) {
      console.error('Gagal menyimpan finance data:', e);
    }
  }

  // ============================================================================
  // MONEY FORMATTERS & DATE HELPERS
  // ============================================================================
  function formatRupiah(amount) {
    const val = Math.round(Number(amount) || 0);
    return 'Rp ' + val.toLocaleString('id-ID');
  }

  function getTodayString() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function getStartAndEndOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Senin
    const monday = new Date(d.setDate(diff));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return {
      start: monday.toISOString().slice(0, 10),
      end: sunday.toISOString().slice(0, 10)
    };
  }

  // ============================================================================
  // CALCULATIONS & BALANCES
  // ============================================================================
  function calculateWalletBalances() {
    let balPribadi = Number(walletStartingBalances.pribadi) || 0;
    let balOperasional = Number(walletStartingBalances.operasional) || 0;
    let balTabungan = Number(walletStartingBalances.tabungan) || 0;

    let outPribadiThisMonth = 0;
    let outOperasionalThisMonth = 0;
    let inTabunganThisMonth = 0;

    const currentYearMonth = getTodayString().slice(0, 7); // YYYY-MM

    financeTransactions.forEach(tx => {
      const amt = Number(tx.amount) || 0;
      const txMonth = (tx.date || '').slice(0, 7);

      if (tx.type === 'masuk') {
        if (tx.wallet === 'pribadi') balPribadi += amt;
        else if (tx.wallet === 'operasional') balOperasional += amt;
        else if (tx.wallet === 'tabungan') {
          balTabungan += amt;
          if (txMonth === currentYearMonth) inTabunganThisMonth += amt;
        }
      } else if (tx.type === 'keluar') {
        if (tx.wallet === 'pribadi') {
          balPribadi -= amt;
          if (txMonth === currentYearMonth) outPribadiThisMonth += amt;
        } else if (tx.wallet === 'operasional') {
          balOperasional -= amt;
          if (txMonth === currentYearMonth) outOperasionalThisMonth += amt;
        } else if (tx.wallet === 'tabungan') {
          balTabungan -= amt;
        }
      } else if (tx.type === 'transfer') {
        // Debet sumber
        if (tx.wallet === 'pribadi') balPribadi -= amt;
        else if (tx.wallet === 'operasional') balOperasional -= amt;
        else if (tx.wallet === 'tabungan') balTabungan -= amt;

        // Kredit tujuan
        if (tx.toWallet === 'pribadi') balPribadi += amt;
        else if (tx.toWallet === 'operasional') balOperasional += amt;
        else if (tx.toWallet === 'tabungan') balTabungan += amt;
      }
    });

    const netWorth = balPribadi + balOperasional + balTabungan;

    // Monthly cashflow: total pemasukan bulan ini minus total pengeluaran bulan ini
    let monthIncome = 0;
    let monthExpense = 0;
    financeTransactions.forEach(tx => {
      if ((tx.date || '').slice(0, 7) === currentYearMonth) {
        const amt = Number(tx.amount) || 0;
        if (tx.type === 'masuk') monthIncome += amt;
        else if (tx.type === 'keluar') monthExpense += amt;
      }
    });
    const monthlyNet = monthIncome - monthExpense;

    // Savings rate = (pemasukan tabungan / total pemasukan) * 100
    const savingsRate = monthIncome > 0 ? Math.min(100, Math.max(0, Math.round(((monthIncome - monthExpense) / monthIncome) * 100))) : 0;

    return {
      netWorth,
      monthlyNet,
      savingsRate,
      pribadi: { balance: balPribadi, expenseMonth: outPribadiThisMonth },
      operasional: { balance: balOperasional, expenseMonth: outOperasionalThisMonth },
      tabungan: { balance: balTabungan, incomeMonth: inTabunganThisMonth }
    };
  }

  // Filter transactions for currently selected period
  function getFilteredTransactionsByPeriod() {
    const today = getTodayString();
    const curYearMonth = today.slice(0, 7);
    const curYear = today.slice(0, 4);
    const weekRange = getStartAndEndOfWeek(today);

    return financeTransactions.filter(tx => {
      if (!tx.date) return false;
      if (currentPeriod === 'day') return tx.date === today;
      if (currentPeriod === 'week') return tx.date >= weekRange.start && tx.date <= weekRange.end;
      if (currentPeriod === 'month') return tx.date.slice(0, 7) === curYearMonth;
      if (currentPeriod === 'year') return tx.date.slice(0, 4) === curYear;
      return true;
    });
  }

  // ============================================================================
  // RENDER HERO & WALLET CARDS
  // ============================================================================
  function renderHeroAndWallets() {
    const balances = calculateWalletBalances();

    const netWorthEl = document.getElementById('statTotalNetWorth');
    const monthlyCashflowEl = document.getElementById('statMonthlyCashflow');
    const savingsRateEl = document.getElementById('statSavingsRate');
    const savingsRateBar = document.getElementById('statSavingsRateBar');

    if (netWorthEl) netWorthEl.textContent = formatRupiah(balances.netWorth);
    if (monthlyCashflowEl) {
      monthlyCashflowEl.textContent = (balances.monthlyNet >= 0 ? '+' : '') + formatRupiah(balances.monthlyNet);
      monthlyCashflowEl.className = 'font-bold tabular-nums ' + (balances.monthlyNet >= 0 ? 'text-emerald-400' : 'text-rose-400');
    }
    if (savingsRateEl) savingsRateEl.textContent = balances.savingsRate + '%';
    if (savingsRateBar) savingsRateBar.style.width = balances.savingsRate + '%';

    // Wallets
    const balPribadiEl = document.getElementById('walletBalance-pribadi');
    const expPribadiEl = document.getElementById('walletExpense-pribadi');
    if (balPribadiEl) balPribadiEl.textContent = formatRupiah(balances.pribadi.balance);
    if (expPribadiEl) expPribadiEl.textContent = formatRupiah(balances.pribadi.expenseMonth);

    const balOperasionalEl = document.getElementById('walletBalance-operasional');
    const expOperasionalEl = document.getElementById('walletExpense-operasional');
    if (balOperasionalEl) balOperasionalEl.textContent = formatRupiah(balances.operasional.balance);
    if (expOperasionalEl) expOperasionalEl.textContent = formatRupiah(balances.operasional.expenseMonth);

    const balTabunganEl = document.getElementById('walletBalance-tabungan');
    const incTabunganEl = document.getElementById('walletIncome-tabungan');
    if (balTabunganEl) balTabunganEl.textContent = formatRupiah(balances.tabungan.balance);
    if (incTabunganEl) incTabunganEl.textContent = '+' + formatRupiah(balances.tabungan.incomeMonth);

    // Active Card Highlight
    ['pribadi', 'operasional', 'tabungan'].forEach(w => {
      const card = document.getElementById('walletCard-' + w);
      if (card) {
        if (activeWalletFilter === w) {
          card.classList.add('ring-2', 'ring-offset-2', 'ring-blue-500');
        } else {
          card.classList.remove('ring-2', 'ring-offset-2', 'ring-blue-500');
        }
      }
    });
  }

  // ============================================================================
  // RENDER RADAR KEBOCORAN KAS (LATTE FACTOR DETECTOR)
  // ============================================================================
  function renderMoneyLeakRadar() {
    const periodTxs = getFilteredTransactionsByPeriod();

    let totalExpense = 0;
    let totalLeak = 0;
    const leakCategories = {};

    periodTxs.forEach(tx => {
      if (tx.type === 'keluar') {
        const amt = Number(tx.amount) || 0;
        totalExpense += amt;

        const isLeak = tx.isLeak || isLikelyLeakTransaction(tx);
        if (isLeak) {
          totalLeak += amt;
          const cat = tx.category || 'Jajan & Lainnya';
          leakCategories[cat] = (leakCategories[cat] || 0) + amt;
        }
      }
    });

    const leakPercentage = totalExpense > 0 ? Math.round((totalLeak / totalExpense) * 100) : 0;

    const leakAmountEl = document.getElementById('statTotalLeakAmount');
    const leakPercentEl = document.getElementById('statLeakPercentage');
    const leakBadgeEl = document.getElementById('leakLevelBadge');
    const leakTopCatList = document.getElementById('leakTopCategoriesList');
    const leakTipEl = document.getElementById('leakSmartTip');

    if (leakAmountEl) leakAmountEl.textContent = formatRupiah(totalLeak);
    if (leakPercentEl) leakPercentEl.textContent = leakPercentage + '%';

    // Status Level Badge
    if (leakBadgeEl) {
      if (leakPercentage >= 25) {
        leakBadgeEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-white animate-ping mr-1"></span>Bahaya: Bocor ' + leakPercentage + '%';
        leakBadgeEl.className = 'inline-flex items-center px-2 py-0.5 rounded-md text-[9.5px] font-bold tracking-tight bg-rose-600 text-white shadow-2xs whitespace-nowrap';
      } else if (leakPercentage >= 12) {
        leakBadgeEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-900 mr-1"></span>Waspada: Bocor ' + leakPercentage + '%';
        leakBadgeEl.className = 'inline-flex items-center px-2 py-0.5 rounded-md text-[9.5px] font-bold tracking-tight bg-amber-500 text-slate-950 shadow-2xs whitespace-nowrap';
      } else {
        leakBadgeEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-white mr-1"></span>Aman (' + leakPercentage + '%)';
        leakBadgeEl.className = 'inline-flex items-center px-2 py-0.5 rounded-md text-[9.5px] font-bold tracking-tight bg-emerald-600 text-white shadow-2xs whitespace-nowrap';
      }
    }

    if (leakTopCatList) {
      const sortedCats = Object.entries(leakCategories).sort((a, b) => b[1] - a[1]);
      if (sortedCats.length === 0) {
        leakTopCatList.innerHTML = '<span class="text-[11px] text-slate-400 italic">Belum ada kebocoran terdeteksi pada periode ini. Pengelolaan kas Anda sangat hemat!</span>';
      } else {
        leakTopCatList.innerHTML = sortedCats.map(([cat, amt]) => {
          return `
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-[10px] font-bold border border-amber-300 dark:border-amber-800">
              <span>${escapeHtml(cat)}:</span>
              <span class="tabular-nums text-rose-600 dark:text-rose-400 font-extrabold">${formatRupiah(amt)}</span>
            </span>
          `;
        }).join('');
      }
    }

    // Dynamic AI Tips
    if (leakTipEl) {
      if (totalLeak > 100000) {
        const potentialSavings = Math.round(totalLeak * 0.5);
        leakTipEl.textContent = `Tips AI: Jika Anda memangkas 50% dari pengeluaran mikro ini (${formatRupiah(potentialSavings)}), uang tersebut cukup untuk menambah cadangan operasional minggu depan!`;
      } else {
        leakTipEl.textContent = 'Tips AI: Kebocoran kas Anda terkendali. Terus pertahankan pola pencatatan disiplin ini!';
      }
    }
  }

  function isLikelyLeakTransaction(tx) {
    if (tx.isLeak) return true;
    const cat = (tx.category || '').toLowerCase();
    const note = (tx.note || '').toLowerCase();
    const leakKeywords = ['kopi', 'coffee', 'boba', 'jajan', 'snack', 'camilan', 'rokok', 'indomaret jajan', 'es teh', 'gorengan', 'seblak', 'cilok', 'parkir', 'topup game', 'shopeepay'];
    if (cat.includes('jajan') || cat.includes('kopi')) return true;
    for (const kw of leakKeywords) {
      if (note.includes(kw)) return true;
    }
    return false;
  }

  // ============================================================================
  // RENDER PERIOD METRICS & CHARTS
  // ============================================================================
  function renderPeriodMetricsAndCharts() {
    const periodTxs = getFilteredTransactionsByPeriod();

    let inc = 0;
    let exp = 0;
    let leak = 0;
    let incCount = 0;
    let expCount = 0;

    const catExpenseMap = {};

    periodTxs.forEach(tx => {
      const amt = Number(tx.amount) || 0;
      if (tx.type === 'masuk') {
        inc += amt;
        incCount++;
      } else if (tx.type === 'keluar') {
        exp += amt;
        expCount++;
        if (tx.isLeak || isLikelyLeakTransaction(tx)) {
          leak += amt;
        }
        const c = tx.category || 'Lainnya';
        catExpenseMap[c] = (catExpenseMap[c] || 0) + amt;
      }
    });

    const net = inc - exp;

    // Period Range Title Label
    const today = new Date();
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const rangeLabelEl = document.getElementById('currentPeriodRangeLabel');
    if (rangeLabelEl) {
      if (currentPeriod === 'day') {
        rangeLabelEl.textContent = `📅 Hari Ini: ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
      } else if (currentPeriod === 'week') {
        const wr = getStartAndEndOfWeek(getTodayString());
        rangeLabelEl.textContent = `📆 Minggu Ini: ${wr.start} s/d ${wr.end}`;
      } else if (currentPeriod === 'month') {
        rangeLabelEl.textContent = `🗓️ Bulan: ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
      } else if (currentPeriod === 'year') {
        rangeLabelEl.textContent = `📊 Tahun: ${today.getFullYear()}`;
      }
    }

    // Stat Boxes
    const pIncEl = document.getElementById('statPeriodIncome');
    const pIncCountEl = document.getElementById('statPeriodIncomeCount');
    const pExpEl = document.getElementById('statPeriodExpense');
    const pExpCountEl = document.getElementById('statPeriodExpenseCount');
    const pNetEl = document.getElementById('statPeriodNet');
    const pNetStatusEl = document.getElementById('statPeriodNetStatus');
    const pLeakEl = document.getElementById('statPeriodLeak');
    const pLeakPercentEl = document.getElementById('statPeriodLeakPercent');

    if (pIncEl) pIncEl.textContent = formatRupiah(inc);
    if (pIncCountEl) pIncCountEl.textContent = `${incCount} transaksi pemasukan`;
    if (pExpEl) pExpEl.textContent = formatRupiah(exp);
    if (pExpCountEl) pExpCountEl.textContent = `${expCount} transaksi pengeluaran`;

    if (pNetEl) {
      pNetEl.textContent = (net >= 0 ? '+' : '') + formatRupiah(net);
      pNetEl.className = 'text-base sm:text-xl font-extrabold tabular-nums mt-1 ' + (net >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400');
    }
    if (pNetStatusEl) pNetStatusEl.textContent = net >= 0 ? 'Surplus Cashflow' : 'Defisit (Pengeluaran > Pemasukan)';

    if (pLeakEl) pLeakEl.textContent = formatRupiah(leak);
    if (pLeakPercentEl) {
      const pct = exp > 0 ? Math.round((leak / exp) * 100) : 0;
      pLeakPercentEl.textContent = `${pct}% dari total pengeluaran`;
    }

    // Render Trend SVG Chart
    renderTrendSvgChart(periodTxs);

    // Render Category Donut & List
    renderCategoryBreakdown(catExpenseMap, exp);
  }

  // Dynamic SVG Bar Chart for Trend
  function renderTrendSvgChart(periodTxs) {
    const box = document.getElementById('financeTrendChartBox');
    if (!box) return;

    // Generate Days/Slots depending on period
    const slots = [];
    if (currentPeriod === 'week') {
      const dayNames = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Ahd'];
      const wr = getStartAndEndOfWeek(getTodayString());
      for (let i = 0; i < 7; i++) {
        const d = new Date(wr.start);
        d.setDate(d.getDate() + i);
        const dStr = d.toISOString().slice(0, 10);
        slots.push({ label: dayNames[i], date: dStr, inc: 0, exp: 0 });
      }
    } else if (currentPeriod === 'day') {
      slots.push({ label: 'Pagi (06-12)', filter: (t) => t >= '06:00' && t < '12:00', inc: 0, exp: 0 });
      slots.push({ label: 'Siang (12-15)', filter: (t) => t >= '12:00' && t < '15:00', inc: 0, exp: 0 });
      slots.push({ label: 'Sore (15-18)', filter: (t) => t >= '15:00' && t < '18:00', inc: 0, exp: 0 });
      slots.push({ label: 'Malam (18-24)', filter: (t) => t >= '18:00' || t < '06:00', inc: 0, exp: 0 });
    } else if (currentPeriod === 'year') {
      const mNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const curY = getTodayString().slice(0, 4);
      for (let m = 0; m < 12; m++) {
        const mStr = `${curY}-${String(m + 1).padStart(2, '0')}`;
        slots.push({ label: mNames[m], month: mStr, inc: 0, exp: 0 });
      }
    } else {
      // Month: 4 Weeks
      slots.push({ label: 'Mgg 1 (1-7)', filter: (d) => Number(d.slice(8, 10)) <= 7, inc: 0, exp: 0 });
      slots.push({ label: 'Mgg 2 (8-14)', filter: (d) => Number(d.slice(8, 10)) > 7 && Number(d.slice(8, 10)) <= 14, inc: 0, exp: 0 });
      slots.push({ label: 'Mgg 3 (15-21)', filter: (d) => Number(d.slice(8, 10)) > 14 && Number(d.slice(8, 10)) <= 21, inc: 0, exp: 0 });
      slots.push({ label: 'Mgg 4 (22+)', filter: (d) => Number(d.slice(8, 10)) > 21, inc: 0, exp: 0 });
    }

    // Aggregate into slots
    periodTxs.forEach(tx => {
      const amt = Number(tx.amount) || 0;
      slots.forEach(slot => {
        let match = false;
        if (slot.date) match = tx.date === slot.date;
        else if (slot.month) match = (tx.date || '').slice(0, 7) === slot.month;
        else if (slot.filter) match = slot.filter(tx.time || tx.date);

        if (match) {
          if (tx.type === 'masuk') slot.inc += amt;
          else if (tx.type === 'keluar') slot.exp += amt;
        }
      });
    });

    const maxVal = Math.max(1, ...slots.map(s => Math.max(s.inc, s.exp)));

    const barsHtml = slots.map(slot => {
      const incH = Math.max(4, Math.round((slot.inc / maxVal) * 110));
      const expH = Math.max(4, Math.round((slot.exp / maxVal) * 110));

      return `
        <div class="flex-1 flex flex-col items-center justify-end h-full px-1 group">
          <div class="flex items-end gap-1 w-full justify-center h-32 relative">
            <!-- Tooltip -->
            <div class="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap z-20">
              <span class="text-emerald-400 font-bold">+${formatRupiah(slot.inc)}</span> | <span class="text-rose-400 font-bold">-${formatRupiah(slot.exp)}</span>
            </div>
            <!-- Income Bar -->
            <div class="w-3 sm:w-4 rounded-t-md bg-emerald-500/80 hover:bg-emerald-400 transition-all" style="height: ${slot.inc > 0 ? incH : 2}px" title="Pemasukan: ${formatRupiah(slot.inc)}"></div>
            <!-- Expense Bar -->
            <div class="w-3 sm:w-4 rounded-t-md bg-rose-500/80 hover:bg-rose-400 transition-all" style="height: ${slot.exp > 0 ? expH : 2}px" title="Pengeluaran: ${formatRupiah(slot.exp)}"></div>
          </div>
          <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-2 truncate w-full text-center">${escapeHtml(slot.label)}</span>
        </div>
      `;
    }).join('');

    box.innerHTML = `
      <div class="w-full h-full flex items-end justify-between gap-1 pb-1">
        ${barsHtml}
      </div>
    `;
  }

  // Render Category Donut & Progress Bars
  function renderCategoryBreakdown(catMap, totalExp) {
    const box = document.getElementById('financeCategoryDonutBox');
    if (!box) return;

    const entries = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0) {
      box.innerHTML = '<div class="text-center py-10 text-[11px] text-slate-400 italic">Belum ada pengeluaran pada periode ini.</div>';
      return;
    }

    const colors = ['bg-indigo-500', 'bg-rose-500', 'bg-amber-500', 'bg-sky-500', 'bg-purple-500', 'bg-emerald-500', 'bg-slate-500'];

    const itemsHtml = entries.slice(0, 5).map(([cat, amt], idx) => {
      const pct = totalExp > 0 ? Math.round((amt / totalExp) * 100) : 0;
      const color = colors[idx % colors.length];
      return `
        <div class="space-y-1">
          <div class="flex items-center justify-between text-[11px]">
            <span class="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[130px]">${escapeHtml(cat)}</span>
            <span class="font-extrabold text-slate-900 dark:text-white tabular-nums">${pct}% (${formatRupiah(amt)})</span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div class="${color} h-1.5 rounded-full" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');

    box.innerHTML = `<div class="space-y-2.5 w-full">${itemsHtml}</div>`;
  }

  // ============================================================================
  // RENDER TRANSACTION TABLE
  // ============================================================================
  function renderFinanceTable() {
    const tbody = document.getElementById('financeTableBody');
    const emptyState = document.getElementById('financeEmptyState');
    const countEl = document.getElementById('financeRowCount');
    if (!tbody) return;

    const searchKeyword = (document.getElementById('searchFinanceInput')?.value || '').toLowerCase().trim();
    const filterWallet = document.getElementById('filterWalletSelect')?.value || 'all';
    const filterType = document.getElementById('filterTypeSelect')?.value || 'all';

    let filtered = [...financeTransactions];

    // Filter Wallet
    if (activeWalletFilter !== 'all') {
      filtered = filtered.filter(tx => tx.wallet === activeWalletFilter || tx.toWallet === activeWalletFilter);
    } else if (filterWallet !== 'all') {
      filtered = filtered.filter(tx => tx.wallet === filterWallet || tx.toWallet === filterWallet);
    }

    // Filter Type
    if (filterType === 'leak') {
      filtered = filtered.filter(tx => tx.type === 'keluar' && (tx.isLeak || isLikelyLeakTransaction(tx)));
    } else if (filterType !== 'all') {
      filtered = filtered.filter(tx => tx.type === filterType);
    }

    // Search Keyword
    if (searchKeyword) {
      filtered = filtered.filter(tx => {
        const text = `${tx.note || ''} ${tx.category || ''} ${tx.amount || ''} ${tx.wallet || ''}`.toLowerCase();
        return text.includes(searchKeyword);
      });
    }

    // Sort Descending by Date & Time
    filtered.sort((a, b) => {
      const dtA = (a.date || '') + ' ' + (a.time || '00:00');
      const dtB = (b.date || '') + ' ' + (b.time || '00:00');
      return dtB.localeCompare(dtA);
    });

    if (countEl) countEl.textContent = `${filtered.length} transaksi ditampilkan`;

    if (filtered.length === 0) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    const walletLabels = {
      pribadi: { name: 'Pribadi', badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
      operasional: { name: 'Operasional', badge: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800' },
      tabungan: { name: 'Tabungan', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' }
    };

    tbody.innerHTML = filtered.map((tx, idx) => {
      const wInfo = walletLabels[tx.wallet] || { name: tx.wallet, badge: 'bg-slate-100 text-slate-700' };
      const isLeak = tx.isLeak || isLikelyLeakTransaction(tx);

      let amountDisplay = '';
      let amountClass = '';
      if (tx.type === 'masuk') {
        amountDisplay = '+' + formatRupiah(tx.amount);
        amountClass = 'text-emerald-600 dark:text-emerald-400 font-extrabold';
      } else if (tx.type === 'keluar') {
        amountDisplay = '-' + formatRupiah(tx.amount);
        amountClass = 'text-rose-600 dark:text-rose-400 font-extrabold';
      } else {
        const toInfo = walletLabels[tx.toWallet]?.name || tx.toWallet;
        amountDisplay = '⇄ ' + formatRupiah(tx.amount);
        amountClass = 'text-blue-600 dark:text-blue-400 font-extrabold';
      }

      return `
        <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="font-bold text-slate-800 dark:text-slate-200 block">${escapeHtml(tx.date || '-')}</span>
            <span class="text-[10px] text-slate-400">${escapeHtml(tx.time || '00:00')}</span>
          </td>
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md border ${wInfo.badge}">
              ${escapeHtml(wInfo.name)}
            </span>
            ${tx.type === 'transfer' ? `<span class="text-[10px] text-slate-400 font-bold ml-1">→ ${escapeHtml(walletLabels[tx.toWallet]?.name || tx.toWallet)}</span>` : ''}
          </td>
          <td class="py-2.5 px-3 whitespace-nowrap">
            <span class="font-semibold text-slate-700 dark:text-slate-300">${escapeHtml(tx.category || 'Umum')}</span>
          </td>
          <td class="py-2.5 px-3 min-w-[180px]">
            <span class="font-bold text-slate-800 dark:text-slate-100">${escapeHtml(tx.note || '-')}</span>
            ${isLeak ? `<span class="inline-flex items-center gap-0.5 text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 ml-1.5">⚠️ Bocor Halus</span>` : ''}
          </td>
          <td class="py-2.5 px-3 text-right whitespace-nowrap tabular-nums ${amountClass}">
            ${amountDisplay}
          </td>
          <td class="py-2.5 px-3 text-center whitespace-nowrap">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${tx.type === 'masuk' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : (tx.type === 'keluar' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300')}">
              ${tx.type === 'masuk' ? 'Masuk' : (tx.type === 'keluar' ? 'Keluar' : 'Pindah')}
            </span>
          </td>
          <td class="py-2.5 px-3 text-center whitespace-nowrap">
            <button onclick="deleteFinanceTransaction('${tx.id}')" class="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors" title="Hapus Transaksi">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function renderAllFinanceViews() {
    renderHeroAndWallets();
    renderMoneyLeakRadar();
    renderPeriodMetricsAndCharts();
    renderFinanceTable();
  }

  // ============================================================================
  // PERIOD & WALLET FILTER SWITCHERS
  // ============================================================================
  function switchFinancePeriod(period) {
    currentPeriod = period;
    ['day', 'week', 'month', 'year'].forEach(p => {
      const btn = document.getElementById('periodBtn-' + p);
      if (btn) {
        if (p === period) {
          btn.className = 'px-2 sm:px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-emerald-600 text-white shadow-xs cursor-pointer';
        } else {
          btn.className = 'px-2 sm:px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer';
        }
      }
    });

    renderMoneyLeakRadar();
    renderPeriodMetricsAndCharts();
  }

  function filterByWallet(wallet) {
    if (activeWalletFilter === wallet) {
      activeWalletFilter = 'all'; // toggle off
    } else {
      activeWalletFilter = wallet;
    }
    renderHeroAndWallets();
    renderFinanceTable();
  }

  function resetFinanceFilters() {
    activeWalletFilter = 'all';
    if (document.getElementById('searchFinanceInput')) document.getElementById('searchFinanceInput').value = '';
    if (document.getElementById('filterWalletSelect')) document.getElementById('filterWalletSelect').value = 'all';
    if (document.getElementById('filterTypeSelect')) document.getElementById('filterTypeSelect').value = 'all';
    renderHeroAndWallets();
    renderFinanceTable();
  }

  // ============================================================================
  // MANUAL TRANSACTION CRUD
  // ============================================================================
  function openModalTambahTransaksi() {
    const modal = document.getElementById('modalTambahTransaksi');
    if (!modal) return;
    if (modal.parentElement !== document.body) document.body.appendChild(modal);

    document.getElementById('formTransaksiManual').reset();
    document.getElementById('manualDate').value = getTodayString();
    document.getElementById('manualEditIndex').value = '-1';
    setManualType('keluar');

    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    modal.style.display = 'flex';
  }

  function closeModalTambahTransaksi() {
    const modal = document.getElementById('modalTambahTransaksi');
    if (modal) {
      modal.classList.add('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'none';
    }
  }

  function setManualType(type) {
    manualTransactionType = type;
    const btnExp = document.getElementById('btnTypeExpense');
    const btnInc = document.getElementById('btnTypeIncome');

    if (type === 'keluar') {
      if (btnExp) btnExp.className = 'py-2 rounded-md font-extrabold text-xs bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-2 border-rose-500 flex items-center justify-center gap-1.5 cursor-pointer';
      if (btnInc) btnInc.className = 'py-2 rounded-md font-semibold text-xs bg-slate-50 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer';
    } else {
      if (btnInc) btnInc.className = 'py-2 rounded-md font-extrabold text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500 flex items-center justify-center gap-1.5 cursor-pointer';
      if (btnExp) btnExp.className = 'py-2 rounded-md font-semibold text-xs bg-slate-50 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer';
    }
  }

  function handleSaveManualTransaction(event) {
    event.preventDefault();
    const wallet = document.getElementById('manualWallet').value;
    const date = document.getElementById('manualDate').value || getTodayString();
    const amount = Number(document.getElementById('manualAmount').value) || 0;
    const category = document.getElementById('manualCategory').value;
    const note = document.getElementById('manualNote').value.trim();
    const isLeak = document.getElementById('manualIsLeak').checked;

    if (amount <= 0) {
      alert('Mohon masukkan nominal yang valid!');
      return;
    }

    const d = new Date();
    const curTime = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

    const newTx = {
      id: 'tx_' + Date.now(),
      date,
      time: curTime,
      type: manualTransactionType,
      wallet,
      category,
      amount,
      note,
      isLeak: manualTransactionType === 'keluar' && isLeak
    };

    financeTransactions.unshift(newTx);
    saveFinanceData();
    closeModalTambahTransaksi();
    renderAllFinanceViews();
    showToast('Transaksi Berhasil Disimpan', formatRupiah(amount) + ' tercatat di ' + wallet);
  }

  function deleteFinanceTransaction(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus catatan transaksi ini?')) return;
    financeTransactions = financeTransactions.filter(tx => tx.id !== id);
    saveFinanceData();
    renderAllFinanceViews();
    showToast('Transaksi Dihapus', 'Catatan berhasil dihapus dari sistem.');
  }

  // ============================================================================
  // TRANSFER ANTAR KANTONG
  // ============================================================================
  function openModalTransferKantong() {
    const modal = document.getElementById('modalTransferKantong');
    if (!modal) return;
    if (modal.parentElement !== document.body) document.body.appendChild(modal);

    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    modal.style.display = 'flex';
  }

  function closeModalTransferKantong() {
    const modal = document.getElementById('modalTransferKantong');
    if (modal) {
      modal.classList.add('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'none';
    }
  }

  function handleTransferKantong(event) {
    event.preventDefault();
    const fromW = document.getElementById('transferFromWallet').value;
    const toW = document.getElementById('transferToWallet').value;
    const amount = Number(document.getElementById('transferAmount').value) || 0;
    const note = document.getElementById('transferNote').value.trim() || `Pindah saldo dari ${fromW} ke ${toW}`;

    if (fromW === toW) {
      alert('Kantong sumber dan tujuan tidak boleh sama!');
      return;
    }
    if (amount <= 0) {
      alert('Masukkan nominal transfer yang valid!');
      return;
    }

    const d = new Date();
    const newTransfer = {
      id: 'tx_trf_' + Date.now(),
      date: getTodayString(),
      time: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
      type: 'transfer',
      wallet: fromW,
      toWallet: toW,
      category: 'Pindah Dana',
      amount,
      note,
      isLeak: false
    };

    financeTransactions.unshift(newTransfer);
    saveFinanceData();
    closeModalTransferKantong();
    renderAllFinanceViews();
    showToast('Pemindahan Saldo Berhasil', `${formatRupiah(amount)} dipindahkan ke ${toW}`);
  }

  // ============================================================================
  // GOOGLE GEMINI CLOUD AI ENGINE (SCAN STRUK & VOICE & INCOME IDEAS)
  // ============================================================================
  function getGeminiApiKey() {
    try {
      return localStorage.getItem(STORAGE_GEMINI_KEY) || '';
    } catch (e) {
      return '';
    }
  }

  function setGeminiApiKey(key) {
    try {
      localStorage.setItem(STORAGE_GEMINI_KEY, key.trim());
      updateAiKeyBadgeStatus();
    } catch (e) {}
  }

  function updateAiKeyBadgeStatus() {
    const key = getGeminiApiKey();
    const badge = document.getElementById('aiStatusBadge');
    const badgeText = document.getElementById('aiStatusBadgeText');
    if (badge && badgeText) {
      if (key) {
        badgeText.textContent = 'Gemini AI Aktif';
        badge.className = 'text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 uppercase tracking-wider flex items-center gap-1';
      } else {
        badgeText.textContent = 'Kunci AI Belum Diisi';
        badge.className = 'text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 uppercase tracking-wider flex items-center gap-1 cursor-pointer';
        badge.onclick = openModalGeminiKey;
      }
    }
  }

  async function callGeminiApi({ prompt, imageBase64, mimeType = 'image/jpeg' }) {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      openModalGeminiKey();
      throw new Error('API Key Google Gemini belum diatur. Silakan masukkan API Key di menu pengaturan.');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const contentsParts = [];
    if (prompt) {
      contentsParts.push({ text: prompt });
    }
    if (imageBase64) {
      contentsParts.push({
        inline_data: {
          mime_type: mimeType,
          data: imageBase64.replace(/^data:image\/[a-z]+;base64,/, '')
        }
      });
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: contentsParts }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const textOutput = candidate?.content?.parts?.[0]?.text || '';
    return textOutput;
  }

  // ============================================================================
  // SCAN STRUK MODAL & LOGIC
  // ============================================================================
  function openModalScanStruk() {
    const modal = document.getElementById('modalScanStruk');
    if (!modal) return;
    if (modal.parentElement !== document.body) document.body.appendChild(modal);

    currentScannedImageBase64 = null;
    document.getElementById('strukFileInput').value = '';
    document.getElementById('strukUploadPrompt').classList.remove('hidden');
    document.getElementById('strukImagePreviewBox').classList.add('hidden');
    document.getElementById('strukExtractedForm').classList.add('hidden');
    document.getElementById('strukAiLoading').classList.add('hidden');
    document.getElementById('btnProcessStrukAi').classList.remove('hidden');
    document.getElementById('btnSaveScannedStruk').classList.add('hidden');

    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    modal.style.display = 'flex';
  }

  function closeModalScanStruk() {
    const modal = document.getElementById('modalScanStruk');
    if (modal) {
      modal.classList.add('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'none';
    }
  }

  function handleStrukFileSelect(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      currentScannedImageBase64 = e.target.result;
      document.getElementById('strukImagePreview').src = currentScannedImageBase64;
      document.getElementById('strukUploadPrompt').classList.add('hidden');
      document.getElementById('strukImagePreviewBox').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  async function processStrukWithGemini() {
    if (!currentScannedImageBase64) {
      alert('Silakan pilih foto struk / nota belanja terlebih dahulu.');
      return;
    }

    const btn = document.getElementById('btnProcessStrukAi');
    const loading = document.getElementById('strukAiLoading');
    const formBox = document.getElementById('strukExtractedForm');
    const saveBtn = document.getElementById('btnSaveScannedStruk');

    btn.disabled = true;
    loading.classList.remove('hidden');
    formBox.classList.add('hidden');

    try {
      const prompt = `Anda adalah asisten keuangan pribadi Partner Fatih. Baca foto struk/nota pembayaran ini secara teliti.
Ekstrak data berikut dalam format JSON MURNI TANPA MARKDOWN:
{
  "merchant": "Nama toko / kasir / merchant",
  "date": "YYYY-MM-DD",
  "total": 125000,
  "category": "Pilih satu: Makanan & Minuman | Bensin & Transportasi | Jajan & Kopi | Belanja Minimarket | Tagihan & Utilitas | Keluarga & Kebutuhan | Lainnya",
  "suggestedWallet": "Pilih satu: pribadi | operasional | tabungan",
  "isLeak": true atau false (true jika ini pengeluaran jajan, kopi, snack, rokok, barang impulsif di luar kebutuhan pokok),
  "items": "Daftar barang yang dibeli dipisahkan koma"
}`;

      const rawResult = await callGeminiApi({
        prompt,
        imageBase64: currentScannedImageBase64,
        mimeType: 'image/jpeg'
      });

      const cleanJsonStr = rawResult.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJsonStr);

      document.getElementById('scanResultMerchant').value = parsed.merchant || 'Toko / Kasir';
      document.getElementById('scanResultDate').value = parsed.date || getTodayString();
      document.getElementById('scanResultAmount').value = parsed.total || 0;
      document.getElementById('scanResultCategory').value = parsed.category || 'Belanja Minimarket';
      document.getElementById('scanResultWallet').value = parsed.suggestedWallet || 'pribadi';
      document.getElementById('scanResultIsLeak').checked = !!parsed.isLeak;
      document.getElementById('scanResultItems').value = parsed.items || '';

      loading.classList.add('hidden');
      formBox.classList.remove('hidden');
      btn.classList.add('hidden');
      saveBtn.classList.remove('hidden');
    } catch (err) {
      loading.classList.add('hidden');
      btn.disabled = false;
      alert('Gagal memproses struk dengan AI: ' + err.message);
    }
  }

  function saveScannedStrukTransaction() {
    const merchant = document.getElementById('scanResultMerchant').value.trim() || 'Struk Kasir';
    const date = document.getElementById('scanResultDate').value || getTodayString();
    const amount = Number(document.getElementById('scanResultAmount').value) || 0;
    const category = document.getElementById('scanResultCategory').value;
    const wallet = document.getElementById('scanResultWallet').value;
    const isLeak = document.getElementById('scanResultIsLeak').checked;
    const items = document.getElementById('scanResultItems').value.trim();

    if (amount <= 0) {
      alert('Nominal harus lebih dari 0.');
      return;
    }

    const d = new Date();
    const curTime = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

    const newTx = {
      id: 'tx_scan_' + Date.now(),
      date,
      time: curTime,
      type: 'keluar',
      wallet,
      category,
      amount,
      note: merchant + (items ? ' (' + items + ')' : ''),
      isLeak
    };

    financeTransactions.unshift(newTx);
    saveFinanceData();
    closeModalScanStruk();
    renderAllFinanceViews();
    showToast('Struk Berhasil Disimpan', `${formatRupiah(amount)} tercatat di ${wallet}`);
  }

  // ============================================================================
  // VOICE NOTE AI INPUT LOGIC
  // ============================================================================
  function openModalVoiceKeuangan() {
    const modal = document.getElementById('modalVoiceKeuangan');
    if (!modal) return;
    if (modal.parentElement !== document.body) document.body.appendChild(modal);

    document.getElementById('voiceTranscriptBox').classList.add('hidden');
    document.getElementById('voiceParsedResultBox').classList.add('hidden');
    document.getElementById('btnSaveVoiceTransactions').classList.add('hidden');
    document.getElementById('voiceStatusText').textContent = 'Ketuk mikrofon di atas lalu mulai bicara...';

    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    modal.style.display = 'flex';
  }

  function closeModalVoiceKeuangan() {
    if (isRecordingVoice) stopFinanceVoiceRecording();
    const modal = document.getElementById('modalVoiceKeuangan');
    if (modal) {
      modal.classList.add('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'none';
    }
  }

  function toggleFinanceVoiceRecording() {
    if (!isRecordingVoice) {
      startFinanceVoiceRecording();
    } else {
      stopFinanceVoiceRecording();
    }
  }

  function startFinanceVoiceRecording() {
    const wave = document.getElementById('voicePulsingWave');
    const statusText = document.getElementById('voiceStatusText');

    isRecordingVoice = true;
    if (wave) wave.classList.remove('hidden');
    if (statusText) statusText.textContent = 'Mendengarkan suara Anda... Silakan sebutkan transaksi!';

    // Use SpeechRecognition for fast transcription
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      voiceSpeechRecognition = new SpeechRecognition();
      voiceSpeechRecognition.lang = 'id-ID';
      voiceSpeechRecognition.continuous = false;
      voiceSpeechRecognition.interimResults = false;

      voiceSpeechRecognition.onresult = function(event) {
        lastCapturedVoiceText = event.results[0][0].transcript;
        const transBox = document.getElementById('voiceTranscriptBox');
        const transText = document.getElementById('voiceTranscriptText');
        if (transBox && transText) {
          transText.textContent = `"${lastCapturedVoiceText}"`;
          transBox.classList.remove('hidden');
        }
        stopFinanceVoiceRecording();
        parseVoiceTranscriptWithGemini(lastCapturedVoiceText);
      };

      voiceSpeechRecognition.onerror = function(event) {
        console.warn('Speech recognition error:', event.error);
        stopFinanceVoiceRecording();
        if (statusText) statusText.textContent = 'Gagal mendengar suara: ' + event.error;
      };

      voiceSpeechRecognition.start();
    } else {
      // Fallback prompt text if Web Speech not supported
      const manualSpeech = prompt('Browser Anda tidak mendukung Web Speech langsung. Masukkan rekaman suara / teks Anda:');
      if (manualSpeech) {
        parseVoiceTranscriptWithGemini(manualSpeech);
      }
      stopFinanceVoiceRecording();
    }
  }

  function stopFinanceVoiceRecording() {
    isRecordingVoice = false;
    const wave = document.getElementById('voicePulsingWave');
    if (wave) wave.classList.add('hidden');
    if (voiceSpeechRecognition) {
      try { voiceSpeechRecognition.stop(); } catch(e) {}
    }
  }

  async function parseVoiceTranscriptWithGemini(spokenText) {
    const statusText = document.getElementById('voiceStatusText');
    const resultBox = document.getElementById('voiceParsedResultBox');
    const listEl = document.getElementById('voiceParsedItemsList');
    const saveBtn = document.getElementById('btnSaveVoiceTransactions');

    if (statusText) statusText.textContent = 'Gemini AI sedang memahami kalimat Anda...';

    try {
      const prompt = `Pengguna mencatat keuangan dengan suara bebas: "${spokenText}".
Tugas Anda adalah mengekstrak semua transaksi (bisa 1 atau lebih) ke dalam format JSON array murni tanpa markdown:
[
  {
    "type": "keluar atau masuk",
    "amount": 35000,
    "note": "Keterangan pengeluaran/pemasukan",
    "category": "Pilih: Makanan & Minuman | Bensin & Transportasi | Jajan & Kopi | Belanja Minimarket | Tagihan & Utilitas | Gaji & Honor | Usaha & Sampingan | Lainnya",
    "wallet": "pribadi atau operasional atau tabungan",
    "isLeak": true atau false (true jika jajan mikro, kopi, rokok, snack, impulsif)
  }
]`;

      const raw = await callGeminiApi({ prompt });
      const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      pendingVoiceTransactions = JSON.parse(cleanJson);

      if (!Array.isArray(pendingVoiceTransactions) || pendingVoiceTransactions.length === 0) {
        throw new Error('Tidak ada transaksi terdeteksi dari kalimat tersebut.');
      }

      if (statusText) statusText.textContent = `Berhasil mengekstrak ${pendingVoiceTransactions.length} transaksi!`;
      if (resultBox) resultBox.classList.remove('hidden');

      if (listEl) {
        listEl.innerHTML = pendingVoiceTransactions.map(tx => {
          return `
            <div class="p-2.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div>
                <span class="font-bold text-slate-800 dark:text-white block">${escapeHtml(tx.note)}</span>
                <span class="text-[10px] text-slate-400">${escapeHtml(tx.category)} • Kantong ${escapeHtml(tx.wallet)}</span>
              </div>
              <span class="font-extrabold ${tx.type === 'masuk' ? 'text-emerald-500' : 'text-rose-500'}">
                ${tx.type === 'masuk' ? '+' : '-'}${formatRupiah(tx.amount)}
              </span>
            </div>
          `;
        }).join('');
      }

      if (saveBtn) saveBtn.classList.remove('hidden');
    } catch (e) {
      if (statusText) statusText.textContent = 'Gagal memproses AI: ' + e.message;
    }
  }

  function saveVoiceExtractedTransactions() {
    if (!pendingVoiceTransactions || pendingVoiceTransactions.length === 0) return;

    const d = new Date();
    const curDate = getTodayString();
    const curTime = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

    pendingVoiceTransactions.forEach((tx, idx) => {
      financeTransactions.unshift({
        id: 'tx_voice_' + Date.now() + '_' + idx,
        date: curDate,
        time: curTime,
        type: tx.type || 'keluar',
        wallet: tx.wallet || 'pribadi',
        category: tx.category || 'Lainnya',
        amount: Number(tx.amount) || 0,
        note: tx.note || 'Transaksi Suara',
        isLeak: !!tx.isLeak
      });
    });

    saveFinanceData();
    closeModalVoiceKeuangan();
    renderAllFinanceViews();
    showToast('Transaksi Suara Tersimpan', `${pendingVoiceTransactions.length} transaksi berhasil dicatat.`);
  }

  // ============================================================================
  // AI INCOME IDEAS & HUNTER ENGINE
  // ============================================================================
  function openModalIncomeIdeas() {
    const modal = document.getElementById('modalIncomeIdeas');
    if (!modal) return;
    if (modal.parentElement !== document.body) document.body.appendChild(modal);

    renderIncomeIdeasList();

    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    modal.style.display = 'flex';
  }

  function closeModalIncomeIdeas() {
    const modal = document.getElementById('modalIncomeIdeas');
    if (modal) {
      modal.classList.add('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'none';
    }
  }

  function getStoredIncomeIdeas() {
    try {
      const stored = localStorage.getItem(STORAGE_INCOME_IDEAS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return DEFAULT_INCOME_IDEAS;
  }

  function renderIncomeIdeasList(ideas = null) {
    const listContainer = document.getElementById('incomeIdeasContainer');
    if (!listContainer) return;

    const currentIdeas = ideas || getStoredIncomeIdeas();

    listContainer.innerHTML = currentIdeas.map((idea, idx) => {
      return `
        <div class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-amber-400 transition-all">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-700/60">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                ${idx + 1}
              </span>
              <h5 class="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                ${escapeHtml(idea.title)}
              </h5>
            </div>
            <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 whitespace-nowrap self-start sm:self-auto">
              ${escapeHtml(idea.badge || 'Peluang')}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 my-2.5 text-[11px]">
            <div class="p-2 rounded-md bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span class="text-slate-400 block text-[10px] font-bold uppercase">Estimasi Potensi Income</span>
              <span class="font-black text-emerald-600 dark:text-emerald-400 tabular-nums">${escapeHtml(idea.potential)}</span>
            </div>
            <div class="p-2 rounded-md bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span class="text-slate-400 block text-[10px] font-bold uppercase">Modal Diperlukan</span>
              <span class="font-black text-slate-800 dark:text-slate-200">${escapeHtml(idea.capital)}</span>
            </div>
          </div>

          <p class="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            ${escapeHtml(idea.desc)}
          </p>

          ${idea.steps && idea.steps.length ? `
            <div class="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px] space-y-1">
              <span class="font-bold text-slate-800 dark:text-slate-200 block text-[10px] uppercase">Langkah Awal Hari Ini:</span>
              ${idea.steps.map(s => `<p class="text-slate-600 dark:text-slate-300 flex items-start gap-1.5"><span class="text-amber-500 font-bold">✓</span><span>${escapeHtml(s)}</span></p>`).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  async function generateIncomeIdeasWithAI() {
    const btn = document.getElementById('btnGenerateIncomeAi');
    const loading = document.getElementById('incomeAiLoading');
    const container = document.getElementById('incomeIdeasContainer');

    btn.disabled = true;
    loading.classList.remove('hidden');
    container.classList.add('hidden');

    try {
      const balances = calculateWalletBalances();
      const prompt = `Pengguna mengelola sistem administrasi pendidikan dan pencatatan keuangan pesantren/sekolah.
Kondisi kas saat ini: Saldo total ${formatRupiah(balances.netWorth)}, pengeluaran bulan ini ${formatRupiah(balances.pribadi.expenseMonth + balances.operasional.expenseMonth)}.
Pengguna ingin mencari ide-ide nyata untuk menambah penghasilan (side income) yang realistis, minim modal, dan cocok dengan profil tenaga pendidik/staf administrasi/pesantren di Indonesia.

Buatkan 4 ide bisnis sampingan / freelance konkret dalam format JSON murni tanpa markdown:
[
  {
    "title": "Nama Ide Penghasilan",
    "badge": "Kategori / Keunggulan",
    "potential": "Estimasi per bulan (contoh: Rp 800.000 - Rp 2.000.000)",
    "capital": "Modal yang dibutuhkan (misal: Rp 0)",
    "desc": "Penjelasan mengapa ini relevan dan peluang pasarnya",
    "steps": [
      "Langkah 1 yang bisa dilakukan hari ini",
      "Langkah 2 untuk mencari klien pertama",
      "Langkah 3 penetapan tarif"
    ]
  }
]`;

      const raw = await callGeminiApi({ prompt });
      const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const newIdeas = JSON.parse(cleanJson);

      if (Array.isArray(newIdeas) && newIdeas.length > 0) {
        localStorage.setItem(STORAGE_INCOME_IDEAS, JSON.stringify(newIdeas));
        renderIncomeIdeasList(newIdeas);
      } else {
        renderIncomeIdeasList(DEFAULT_INCOME_IDEAS);
      }

      loading.classList.add('hidden');
      container.classList.remove('hidden');
      btn.disabled = false;
      showToast('Ide Income Berhasil Dibuat', '4 strategi peluang baru telah dirancang oleh AI.');
    } catch (e) {
      loading.classList.add('hidden');
      container.classList.remove('hidden');
      btn.disabled = false;
      alert('Gagal menghasilkan ide dengan AI: ' + e.message + '\nMenampilkan ide bawaan kurasi Partner Fatih.');
      renderIncomeIdeasList(DEFAULT_INCOME_IDEAS);
    }
  }

  // ============================================================================
  // GEMINI API KEY MODAL & SETTINGS
  // ============================================================================
  function openModalGeminiKey() {
    const modal = document.getElementById('modalGeminiKey');
    if (!modal) return;
    if (modal.parentElement !== document.body) document.body.appendChild(modal);

    const input = document.getElementById('inputGeminiApiKey');
    if (input) input.value = getGeminiApiKey();

    const feedback = document.getElementById('apiKeyTestFeedback');
    if (feedback) feedback.classList.add('hidden');

    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    modal.style.display = 'flex';
  }

  function closeModalGeminiKey() {
    const modal = document.getElementById('modalGeminiKey');
    if (modal) {
      modal.classList.add('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'none';
    }
  }

  function toggleApiKeyVisibility() {
    const input = document.getElementById('inputGeminiApiKey');
    const icon = document.getElementById('apiKeyEyeIcon');
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      if (icon) icon.setAttribute('data-lucide', 'eye-off');
    } else {
      input.type = 'password';
      if (icon) icon.setAttribute('data-lucide', 'eye');
    }
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  async function testGeminiApiKeyConnection() {
    const input = document.getElementById('inputGeminiApiKey');
    const feedback = document.getElementById('apiKeyTestFeedback');
    const testKey = (input?.value || '').trim();

    if (!testKey) {
      alert('Masukkan API Key terlebih dahulu untuk diuji.');
      return;
    }

    if (feedback) {
      feedback.textContent = 'Menguji koneksi ke Google Gemini AI...';
      feedback.className = 'p-2.5 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
      feedback.classList.remove('hidden');
    }

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${testKey}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Balas kata: OK' }] }],
          generationConfig: { maxOutputTokens: 5 }
        })
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error?.message || `HTTP ${res.status}`);
      }

      if (feedback) {
        feedback.textContent = '✓ Koneksi Berhasil! API Key Google Gemini Valid dan Aktif.';
        feedback.className = 'p-2.5 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
      }
    } catch (e) {
      if (feedback) {
        feedback.textContent = '✗ Gagal terhubung: ' + e.message;
        feedback.className = 'p-2.5 rounded-md text-xs font-semibold bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800';
      }
    }
  }

  function saveGeminiApiKeySettings() {
    const input = document.getElementById('inputGeminiApiKey');
    const key = (input?.value || '').trim();
    setGeminiApiKey(key);
    closeModalGeminiKey();
    showToast('Kunci Gemini AI Disimpan', 'Fitur scan struk & voice note siap digunakan.');
  }

  // ============================================================================
  // EXPORT TO EXCEL (.XLSX)
  // ============================================================================
  function exportFinanceExcel() {
    if (!window.XLSX) {
      alert('Library SheetJS belum siap. Coba muat ulang halaman.');
      return;
    }

    const rows = financeTransactions.map((tx, idx) => ({
      No: idx + 1,
      Tanggal: tx.date || '',
      Waktu: tx.time || '',
      Jenis: tx.type === 'masuk' ? 'Pemasukan' : (tx.type === 'keluar' ? 'Pengeluaran' : 'Pindah Dana'),
      Kantong: tx.wallet || '',
      Kantong_Tujuan: tx.toWallet || '',
      Kategori: tx.category || '',
      Keterangan: tx.note || '',
      Nominal: Number(tx.amount) || 0,
      Status_Bocor_Halus: (tx.isLeak || isLikelyLeakTransaction(tx)) ? 'YA' : 'TIDAK'
    }));

    const ws = window.XLSX.utils.json_to_sheet(rows);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'Catatan_Keuangan');

    const fileName = `Rekap_Keuangan_PartnerFatih_${getTodayString()}.xlsx`;
    window.XLSX.writeFile(wb, fileName);
    showToast('Ekspor Berhasil', `File ${fileName} berhasil diunduh.`);
  }

  // ============================================================================
  // TOAST NOTIFICATION HELPER
  // ============================================================================
  function showToast(title, message) {
    if (typeof global.showToast === 'function') {
      global.showToast(title, message);
      return;
    }
    const t = document.getElementById('toastNotification');
    const titleEl = document.getElementById('toastTitle');
    const msgEl = document.getElementById('toastMessage');
    if (t && titleEl && msgEl) {
      titleEl.textContent = title;
      msgEl.textContent = message;
      t.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-20');
      setTimeout(() => {
        t.classList.add('opacity-0', 'pointer-events-none', 'translate-y-20');
      }, 3500);
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ============================================================================
  // EXPOSE GLOBAL API
  // ============================================================================
  global.initKeuanganModule = initKeuanganModule;
  global.switchFinancePeriod = switchFinancePeriod;
  global.filterByWallet = filterByWallet;
  global.resetFinanceFilters = resetFinanceFilters;
  global.renderFinanceTable = renderFinanceTable;

  global.openModalTambahTransaksi = openModalTambahTransaksi;
  global.closeModalTambahTransaksi = closeModalTambahTransaksi;
  global.setManualType = setManualType;
  global.handleSaveManualTransaction = handleSaveManualTransaction;
  global.deleteFinanceTransaction = deleteFinanceTransaction;


  // ============================================================================
  // ATUR SALDO AWAL SEMUA KANTONG
  // ============================================================================
  function openModalAturSaldo(focusWallet) {
    const balances = calculateWalletBalances();
    const inpPribadi = document.getElementById('inputSaldoPribadi');
    const inpOperasional = document.getElementById('inputSaldoOperasional');
    const inpTabungan = document.getElementById('inputSaldoTabungan');

    if (inpPribadi) inpPribadi.value = Math.max(0, balances.pribadi.balance);
    if (inpOperasional) inpOperasional.value = Math.max(0, balances.operasional.balance);
    if (inpTabungan) inpTabungan.value = Math.max(0, balances.tabungan.balance);

    const modal = document.getElementById('modalAturSaldo');
    if (modal) {
      if (modal.parentElement !== document.body) document.body.appendChild(modal);
      modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'flex';
    }

    setTimeout(() => {
      if (focusWallet === 'pribadi' && inpPribadi) inpPribadi.focus();
      else if (focusWallet === 'operasional' && inpOperasional) inpOperasional.focus();
      else if (focusWallet === 'tabungan' && inpTabungan) inpTabungan.focus();
      else if (inpPribadi) inpPribadi.focus();
    }, 100);
  }

  function closeModalAturSaldo() {
    const modal = document.getElementById('modalAturSaldo');
    if (modal) {
      modal.classList.add('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'none';
    }
  }

  function handleSaveAturSaldo(e) {
    if (e && e.preventDefault) e.preventDefault();
    const valPribadi = Math.round(Number(document.getElementById('inputSaldoPribadi')?.value) || 0);
    const valOperasional = Math.round(Number(document.getElementById('inputSaldoOperasional')?.value) || 0);
    const valTabungan = Math.round(Number(document.getElementById('inputSaldoTabungan')?.value) || 0);

    walletStartingBalances = {
      pribadi: valPribadi,
      operasional: valOperasional,
      tabungan: valTabungan
    };

    try {
      localStorage.setItem(STORAGE_WALLETS, JSON.stringify(walletStartingBalances));
    } catch(err) {
      console.warn('Gagal menyimpan wallet starting balances:', err);
    }

    renderHeroAndWallets();
    renderMoneyLeakRadar();
    renderFinanceTable();
    closeModalAturSaldo();

    if (typeof showToast === 'function') {
      showToast('Saldo berhasil disimpan & diperbarui!', 'success');
    }
  }

  function resetSaldoInputsToZero() {
    const inpPribadi = document.getElementById('inputSaldoPribadi');
    const inpOperasional = document.getElementById('inputSaldoOperasional');
    const inpTabungan = document.getElementById('inputSaldoTabungan');
    if (inpPribadi) inpPribadi.value = 0;
    if (inpOperasional) inpOperasional.value = 0;
    if (inpTabungan) inpTabungan.value = 0;
  }

  function resetSemuaDataKeuangan() {
    if (confirm('Kosongkan semua saldo dan riwayat transaksi menjadi Rp 0 untuk mulai memasukkan data real baru?')) {
      walletStartingBalances = { pribadi: 0, operasional: 0, tabungan: 0 };
      financeTransactions = [];
      try {
        localStorage.setItem(STORAGE_WALLETS, JSON.stringify(walletStartingBalances));
        localStorage.setItem(STORAGE_FINANCE_DATA, JSON.stringify(financeTransactions));
      } catch(e) {}
      renderAllFinanceViews();
      if (typeof showToast === 'function') {
        showToast('Seluruh saldo dan transaksi berhasil direset ke Rp 0!', 'info');
      }
    }
  }

  global.openModalTransferKantong = openModalTransferKantong;
  global.openModalAturSaldo = openModalAturSaldo;
  global.closeModalAturSaldo = closeModalAturSaldo;
  global.handleSaveAturSaldo = handleSaveAturSaldo;
  global.resetSaldoInputsToZero = resetSaldoInputsToZero;
  global.resetSemuaDataKeuangan = resetSemuaDataKeuangan;
  global.closeModalTransferKantong = closeModalTransferKantong;
  global.handleTransferKantong = handleTransferKantong;

  global.openModalScanStruk = openModalScanStruk;
  global.closeModalScanStruk = closeModalScanStruk;
  global.handleStrukFileSelect = handleStrukFileSelect;
  global.processStrukWithGemini = processStrukWithGemini;
  global.saveScannedStrukTransaction = saveScannedStrukTransaction;

  global.openModalVoiceKeuangan = openModalVoiceKeuangan;
  global.closeModalVoiceKeuangan = closeModalVoiceKeuangan;
  global.toggleFinanceVoiceRecording = toggleFinanceVoiceRecording;
  global.saveVoiceExtractedTransactions = saveVoiceExtractedTransactions;

  global.openModalIncomeIdeas = openModalIncomeIdeas;
  global.closeModalIncomeIdeas = closeModalIncomeIdeas;
  global.generateIncomeIdeasWithAI = generateIncomeIdeasWithAI;

  global.openModalGeminiKey = openModalGeminiKey;
  global.closeModalGeminiKey = closeModalGeminiKey;
  global.toggleApiKeyVisibility = toggleApiKeyVisibility;
  global.testGeminiApiKeyConnection = testGeminiApiKeyConnection;
  global.saveGeminiApiKeySettings = saveGeminiApiKeySettings;

  global.exportFinanceExcel = exportFinanceExcel;

})(window);
