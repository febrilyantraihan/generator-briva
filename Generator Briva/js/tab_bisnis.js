// ==============================================================================
// MODULE: tab_bisnis.js
// INKUBATOR BISNIS & KONSINYASI WARUNG (PARTNER FATIH)
// Manajemen Titip Jual, Kasir Otomatis, Arus Kas & Zona Anti-Minder
// ==============================================================================

(function(window) {
  'use strict';

  const STORAGE_KEY = 'partner_fatih_bisnis_v1';

  // State Utama
  let state = {
    stores: [],
    transactions: [],
    activeSubTab: 'warung',
    statusFilter: 'all',
    searchQuery: '',
    growthTarget: 150000
  };

  // --- INITIAL DATA CONTOH (JIKA BELUM ADA DATA) ---
  const DEFAULT_SAMPLE_STORES = [
    {
      id: 'warung-1',
      nama: 'Warung Bu Siti (Dekat SDN 1)',
      pemilik: 'Bu Siti Rohmah',
      wa: '081234567890',
      alamat: 'Jl. Melati No. 12, depan gerbang SDN 1',
      intervalHari: 14,
      tanggalTitip: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 11 hari lalu (H-3 cek)
      tanggalJadwalCek: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      jumlahTitip: 20,
      hargaJual: 2000,
      komisi: 500,
      varian: '10 Stiker Anime + 10 Kata Motivasi Lucu',
      status: 'aman'
    },
    {
      id: 'warung-2',
      nama: 'Toko Kelontong Berkah (Pos Ronda)',
      pemilik: 'Pak Haji Rohman',
      wa: '085712345678',
      alamat: 'Perempatan Pos Ronda RT 03',
      intervalHari: 14,
      tanggalTitip: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 hari lalu (lewat 1 hari)
      tanggalJadwalCek: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      jumlahTitip: 25,
      hargaJual: 2000,
      komisi: 500,
      varian: '15 Stiker Motor Hologram + 10 Kartun',
      status: 'perlu_cek'
    }
  ];

  const DEFAULT_SAMPLE_TRANSACTIONS = [
    {
      id: 'tx-1',
      tanggal: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tipe: 'keluar',
      kategori: 'modal_cetak',
      nominal: 35000,
      keterangan: 'Cetak 5 lembar stiker vinyl A3+ di percetakan'
    },
    {
      id: 'tx-2',
      tanggal: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tipe: 'keluar',
      kategori: 'plastik_kemasan',
      nominal: 12000,
      keterangan: 'Beli plastik klip kecil 1 pack & karton gantungan'
    },
    {
      id: 'tx-3',
      tanggal: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tipe: 'masuk',
      kategori: 'setoran_warung',
      nominal: 27000,
      keterangan: 'Setoran laku 18 stiker dari Warung Bu Siti (Kunjungan perdana)'
    }
  ];

  // Helper Format Rupiah
  function formatRupiah(val) {
    const num = Math.round(Number(val) || 0);
    return 'Rp ' + num.toLocaleString('id-ID');
  }

  // Load State from LocalStorage
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state.stores = Array.isArray(parsed.stores) ? parsed.stores : [];
        state.transactions = Array.isArray(parsed.transactions) ? parsed.transactions : [];
        state.growthTarget = Number(parsed.growthTarget) || 150000;
      } else {
        // Berikan data percontohan agar modul langsung hidup & ramah pengguna
        state.stores = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_STORES));
        state.transactions = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_TRANSACTIONS));
        saveState();
      }
    } catch (e) {
      console.warn('[Bisnis] Gagal memuat data lokal:', e);
      state.stores = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_STORES));
      state.transactions = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_TRANSACTIONS));
    }
  }

  // Save State
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        stores: state.stores,
        transactions: state.transactions,
        growthTarget: state.growthTarget
      }));
    } catch (e) {
      console.error('[Bisnis] Gagal menyimpan data:', e);
    }
  }

  // Init Tab
  function initBisnisTab() {
    loadState();
    renderBisnisDashboard();
    renderWarungList();
    renderCashflowList();
    hitungSimulasiBisnis();
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // Switch Sub-Tab
  function setBisnisSubTab(subTabId) {
    state.activeSubTab = subTabId;
    
    // Update Button Classes
    const btns = {
      warung: document.getElementById('btnBisnisSubWarung'),
      cashflow: document.getElementById('btnBisnisSubCashflow'),
      tren: document.getElementById('btnBisnisSubTren'),
      mental: document.getElementById('btnBisnisSubMental')
    };

    const sections = {
      warung: document.getElementById('bisnisSectionWarung'),
      cashflow: document.getElementById('bisnisSectionCashflow'),
      tren: document.getElementById('bisnisSectionTren'),
      mental: document.getElementById('bisnisSectionMental')
    };

    Object.keys(btns).forEach(key => {
      const btn = btns[key];
      const sec = sections[key];
      if (key === subTabId) {
        if (btn) {
          btn.className = 'bisnis-subtab-pill active flex-shrink-0 px-2.5 py-1.5 rounded-md font-semibold bg-emerald-600 text-white transition-all cursor-pointer whitespace-nowrap shadow-xs flex items-center justify-center gap-1.5 text-xs';
        }
        if (sec) sec.classList.remove('hidden');
      } else {
        if (btn) {
          btn.className = 'bisnis-subtab-pill flex-shrink-0 px-2.5 py-1.5 rounded-md font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 text-xs';
        }
        if (sec) sec.classList.add('hidden');
      }
    });

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // Render Top KPI Metrics & Dashboard
  function renderBisnisDashboard() {
    const totalWarung = state.stores.length;
    const badgeCount = document.getElementById('badgeCountWarung');
    if (badgeCount) badgeCount.textContent = totalWarung;

    // Hitung Titipan
    let totalTitipanPcs = 0;
    let totalNilaiTitipan = 0;
    let perluCekCount = 0;
    const now = new Date();

    state.stores.forEach(s => {
      const pcs = Number(s.jumlahTitip) || 0;
      const harga = Number(s.hargaJual) || 2000;
      totalTitipanPcs += pcs;
      totalNilaiTitipan += (pcs * harga);

      // Cek jadwal kontrol
      if (s.tanggalJadwalCek) {
        const targetDate = new Date(s.tanggalJadwalCek);
        const diffDays = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));
        if (diffDays <= 3) {
          perluCekCount++;
        }
      }
    });

    // Hitung Keuangan (Cashflow)
    let totalMasuk = 0;
    let totalKeluar = 0;
    state.transactions.forEach(t => {
      const nom = Number(t.nominal) || 0;
      if (t.tipe === 'masuk') totalMasuk += nom;
      else totalKeluar += nom;
    });
    const saldoKas = totalMasuk - totalKeluar;
    const labaBersih = totalMasuk - totalKeluar;

    // Update Elements
    const elWarung = document.getElementById('bisnisStatTotalWarung');
    const elWarungSub = document.getElementById('bisnisStatWarungSub');
    const elTitipan = document.getElementById('bisnisStatTotalTitipan');
    const elNilaiTitipan = document.getElementById('bisnisStatNilaiTitipan');
    const elSaldoKas = document.getElementById('bisnisStatSaldoKas');
    const elLabaBersih = document.getElementById('bisnisStatLabaBersih');
    const elPerluCek = document.getElementById('bisnisStatPerluKunjungan');
    const elKunjunganSub = document.getElementById('bisnisStatKunjunganSub');

    if (elWarung) elWarung.textContent = totalWarung + ' Warung';
    if (elWarungSub) elWarungSub.textContent = totalWarung > 0 ? `${totalWarung} warung aktif mitra` : 'Belum ada warung';
    if (elTitipan) elTitipan.textContent = totalTitipanPcs.toLocaleString('id-ID') + ' Pcs';
    if (elNilaiTitipan) elNilaiTitipan.textContent = formatRupiah(totalNilaiTitipan) + ' nilai jual';
    
    if (elSaldoKas) {
      elSaldoKas.textContent = formatRupiah(saldoKas);
      elSaldoKas.className = saldoKas >= 0 
        ? 'text-sm sm:text-xl font-black text-sky-600 dark:text-sky-400 font-mono truncate'
        : 'text-sm sm:text-xl font-black text-rose-600 dark:text-rose-400 font-mono truncate';
    }
    if (elLabaBersih) {
      elLabaBersih.textContent = (labaBersih >= 0 ? '+' : '') + formatRupiah(labaBersih) + ' Laba';
      elLabaBersih.className = labaBersih >= 0 ? 'text-[9.5px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-bold truncate' : 'text-[9.5px] sm:text-[10px] text-rose-500 mt-0.5 font-bold truncate';
    }

    if (elPerluCek) elPerluCek.textContent = perluCekCount + ' Warung';
    if (elKunjunganSub) {
      elKunjunganSub.textContent = perluCekCount > 0 ? `${perluCekCount} jadwal kunjungan minggu ini` : 'Semua stok terkontrol';
    }

    // Alokasi 50-30-20
    const basisKas = Math.max(0, saldoKas);
    const alokModal = document.getElementById('alokasiModalPutar');
    const alokLaba = document.getElementById('alokasiLaba');
    const alokInov = document.getElementById('alokasiInovasi');
    if (alokModal) alokModal.textContent = formatRupiah(basisKas * 0.5);
    if (alokLaba) alokLaba.textContent = formatRupiah(basisKas * 0.3);
    if (alokInov) alokInov.textContent = formatRupiah(basisKas * 0.2);

    // Gamification Level Progress
    updateGrowthLevelProgress(basisKas);
  }

  // Update Growth Level Progress Bar
  function updateGrowthLevelProgress(currentCapital) {
    const levels = [
      { level: 1, name: 'Level 1: Langkah Perdana', target: 150000, desc: 'Target Modal: Rp 150.000 (1-3 Warung)' },
      { level: 2, name: 'Level 2: Jaringan Warung', target: 500000, desc: 'Target Modal: Rp 500.000 (5-10 Warung)' },
      { level: 3, name: 'Level 3: Juragan Titip Jual', target: 1500000, desc: 'Target Modal: Rp 1.500.000 (15+ Warung)' },
      { level: 4, name: 'Level 4: Brand Mandiri', target: 5000000, desc: 'Target Modal: Rp 5.000.000 (Ekspansi Produk)' }
    ];

    let currentLevel = levels[0];
    for (let i = 0; i < levels.length; i++) {
      if (currentCapital < levels[i].target || i === levels.length - 1) {
        currentLevel = levels[i];
        break;
      }
    }

    const prevTarget = currentLevel.level > 1 ? levels[currentLevel.level - 2].target : 0;
    const progressRange = currentLevel.target - prevTarget;
    const progressValue = Math.max(0, currentCapital - prevTarget);
    const pct = Math.min(100, Math.round((progressValue / progressRange) * 100));

    const titleEl = document.getElementById('growthLevelTitle');
    const subEl = document.getElementById('growthLevelSub');
    const textEl = document.getElementById('growthLevelProgressText');
    const barEl = document.getElementById('growthLevelProgressBar');

    if (titleEl) titleEl.textContent = currentLevel.name;
    if (subEl) subEl.textContent = currentLevel.desc;
    if (textEl) textEl.textContent = `${pct}% (${formatRupiah(currentCapital)} / ${formatRupiah(currentLevel.target)})`;
    if (barEl) barEl.style.width = `${pct}%`;
  }

  // Render Daftar Mitra Warung
  function renderWarungList() {
    const container = document.getElementById('warungCardsContainer');
    const emptyState = document.getElementById('warungEmptyState');
    if (!container) return;

    const query = (state.searchQuery || '').toLowerCase();
    const now = new Date();

    const filtered = state.stores.filter(s => {
      // Filter Status
      if (s.tanggalJadwalCek) {
        const targetDate = new Date(s.tanggalJadwalCek);
        const diffDays = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));
        const isPerluCek = diffDays <= 3;
        if (state.statusFilter === 'perlu_cek' && !isPerluCek) return false;
        if (state.statusFilter === 'aman' && isPerluCek) return false;
      }

      // Filter Search
      if (query) {
        const str = `${s.nama} ${s.pemilik} ${s.alamat} ${s.varian}`.toLowerCase();
        if (!str.includes(query)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    container.innerHTML = filtered.map(s => {
      const now = new Date();
      let diffDays = 14;
      let statusBadge = '';
      if (s.tanggalJadwalCek) {
        const targetDate = new Date(s.tanggalJadwalCek);
        diffDays = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) {
          statusBadge = `<span class="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-700 dark:text-rose-300 font-extrabold text-[9.5px] border border-rose-500/30">Lewat ${Math.abs(diffDays)} Hari!</span>`;
        } else if (diffDays === 0) {
          statusBadge = `<span class="px-2 py-0.5 rounded-md bg-rose-500 text-white font-extrabold text-[9.5px] animate-pulse">Waktunya Cek Hari Ini!</span>`;
        } else if (diffDays <= 3) {
          statusBadge = `<span class="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold text-[9.5px] border border-amber-500/30">Cek ${diffDays} Hari Lagi</span>`;
        } else {
          statusBadge = `<span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-[9.5px]">Aman (${diffDays} hari lagi)</span>`;
        }
      }

      const waClean = (s.wa || '').replace(/[^0-9]/g, '');
      const waLink = waClean ? (waClean.startsWith('0') ? '62' + waClean.substring(1) : waClean) : '';

      return `
        <div class="bg-white/90 dark:bg-slate-900/90 rounded-xl border border-slate-200/80 dark:border-slate-800 p-3 shadow-xs flex flex-col justify-between gap-2.5 transition-all hover:shadow-md">
          <!-- Header Warung -->
          <div>
            <div class="flex items-start justify-between gap-2 mb-1">
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                  <i data-lucide="store" class="w-3.5 h-3.5"></i>
                </div>
                <div class="min-w-0">
                  <h4 class="font-bold text-xs sm:text-[13px] text-slate-900 dark:text-white truncate">${s.nama}</h4>
                  <p class="text-[9.5px] text-slate-400 dark:text-slate-500 truncate">${s.pemilik || 'Pemilik Warung'}</p>
                </div>
              </div>
              <div class="flex-shrink-0">
                ${statusBadge}
              </div>
            </div>

            <!-- Detail Titipan -->
            <div class="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1 my-1.5">
              <div class="flex justify-between items-center">
                <span class="text-slate-500 text-[10.5px]">Stok Dititip:</span>
                <strong class="font-mono text-slate-800 dark:text-slate-200">${s.jumlahTitip} Pcs (@ ${formatRupiah(s.hargaJual)})</strong>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-500 text-[10.5px]">Bagi Hasil Warung:</span>
                <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">${formatRupiah(s.komisi)} / pcs</span>
              </div>
              <div class="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                <span>Varian:</span>
                <span class="truncate max-w-[170px] text-right font-medium text-slate-600 dark:text-slate-300">${s.varian || 'Stiker Campur'}</span>
              </div>
            </div>

            <div class="text-[9.5px] text-slate-400 dark:text-slate-500 truncate flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3 h-3 text-slate-400 flex-shrink-0"></i>
              <span>${s.alamat || 'Alamat belum diisi'}</span>
            </div>
          </div>

          <!-- Action Buttons Footer -->
          <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 flex-wrap">
            <button 
              type="button" 
              onclick="openKunjunganModal('${s.id}')" 
              class="flex-1 py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1 shadow-2xs active:scale-95 cursor-pointer"
              title="Hitung sisa fisik dan bagi hasil kunjungan"
            >
              <i data-lucide="calculator" class="w-3.5 h-3.5"></i>
              <span>Cek Kasir</span>
            </button>
            <button 
              type="button" 
              onclick="sendNotaWhatsApp('${s.id}')" 
              class="py-1.5 px-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer active:scale-95"
              title="Kirim bukti nota titip jual ke WhatsApp pemilik"
            >
              <i data-lucide="message-circle" class="w-3.5 h-3.5 text-emerald-600"></i>
              <span>Nota WA</span>
            </button>
            <button 
              type="button" 
              onclick="openEditWarungModal('${s.id}')" 
              class="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer active:scale-90"
              title="Edit data warung"
            >
              <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
            </button>
            <button 
              type="button" 
              onclick="deleteWarungPrompt('${s.id}')" 
              class="w-7 h-7 rounded-lg border border-rose-200 dark:border-rose-900/40 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center justify-center cursor-pointer active:scale-90"
              title="Hapus warung"
            >
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // Filter Status Warung
  function filterWarungStatus(status) {
    state.statusFilter = status;
    const btns = {
      all: document.getElementById('filterWarungAll'),
      perlu_cek: document.getElementById('filterWarungPerluCek'),
      aman: document.getElementById('filterWarungAman')
    };
    Object.keys(btns).forEach(k => {
      const b = btns[k];
      if (!b) return;
      if (k === status) {
        b.className = 'warung-filter-btn active px-2.5 py-1.5 rounded-lg font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 transition-all text-[11px]';
      } else {
        b.className = 'warung-filter-btn px-2.5 py-1.5 rounded-lg font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-[11px]';
      }
    });
    renderWarungList();
  }

  function handleSearchWarung(query) {
    state.searchQuery = query;
    renderWarungList();
  }

  // Modal Tambah Warung
  function openAddWarungModal() {
    const modal = document.getElementById('modalAddWarung');
    const form = document.getElementById('formWarung');
    const title = document.getElementById('modalWarungTitle');
    const editId = document.getElementById('editWarungId');
    if (form) form.reset();
    if (editId) editId.value = '';
    if (title) title.textContent = 'Tambah Mitra Warung Baru';
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function openEditWarungModal(id) {
    const w = state.stores.find(x => x.id === id);
    if (!w) return;

    const modal = document.getElementById('modalAddWarung');
    const title = document.getElementById('modalWarungTitle');
    const editId = document.getElementById('editWarungId');

    if (editId) editId.value = w.id;
    if (title) title.textContent = 'Edit Data Warung: ' + w.nama;

    document.getElementById('warungNama').value = w.nama || '';
    document.getElementById('warungPemilik').value = w.pemilik || '';
    document.getElementById('warungWa').value = w.wa || '';
    document.getElementById('warungIntervalCek').value = w.intervalHari || 14;
    document.getElementById('warungAlamat').value = w.alamat || '';
    document.getElementById('warungJumlahTitip').value = w.jumlahTitip || 20;
    document.getElementById('warungHargaJual').value = w.hargaJual || 2000;
    document.getElementById('warungKomisi').value = w.komisi || 500;
    document.getElementById('warungVarian').value = w.varian || '';

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function closeAddWarungModal() {
    const modal = document.getElementById('modalAddWarung');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function handleSaveWarung(event) {
    event.preventDefault();
    const editId = document.getElementById('editWarungId').value;
    const nama = document.getElementById('warungNama').value.trim();
    const pemilik = document.getElementById('warungPemilik').value.trim();
    const wa = document.getElementById('warungWa').value.trim();
    const intervalHari = Number(document.getElementById('warungIntervalCek').value) || 14;
    const alamat = document.getElementById('warungAlamat').value.trim();
    const jumlahTitip = Number(document.getElementById('warungJumlahTitip').value) || 20;
    const hargaJual = Number(document.getElementById('warungHargaJual').value) || 2000;
    const komisi = Number(document.getElementById('warungKomisi').value) || 500;
    const varian = document.getElementById('warungVarian').value.trim();

    const todayStr = new Date().toISOString().split('T')[0];
    const targetDate = new Date(Date.now() + intervalHari * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (editId) {
      // Update
      const idx = state.stores.findIndex(x => x.id === editId);
      if (idx !== -1) {
        state.stores[idx].nama = nama;
        state.stores[idx].pemilik = pemilik;
        state.stores[idx].wa = wa;
        state.stores[idx].intervalHari = intervalHari;
        state.stores[idx].alamat = alamat;
        state.stores[idx].jumlahTitip = jumlahTitip;
        state.stores[idx].hargaJual = hargaJual;
        state.stores[idx].komisi = komisi;
        state.stores[idx].varian = varian;
      }
    } else {
      // Create New
      const newWarung = {
        id: 'warung-' + Date.now(),
        nama,
        pemilik,
        wa,
        intervalHari,
        alamat,
        jumlahTitip,
        hargaJual,
        komisi,
        varian,
        tanggalTitip: todayStr,
        tanggalJadwalCek: targetDate,
        status: 'aman'
      };
      state.stores.unshift(newWarung);
    }

    saveState();
    closeAddWarungModal();
    renderBisnisDashboard();
    renderWarungList();
  }

  function deleteWarungPrompt(id) {
    const w = state.stores.find(x => x.id === id);
    if (!w) return;
    if (confirm(`Yakin ingin menghapus data warung "${w.nama}"?`)) {
      state.stores = state.stores.filter(x => x.id !== id);
      saveState();
      renderBisnisDashboard();
      renderWarungList();
    }
  }

  // --- KALKULATOR KUNJUNGAN KASIR ---
  let activeKunjunganWarung = null;

  function openKunjunganModal(id) {
    const w = state.stores.find(x => x.id === id);
    if (!w) return;
    activeKunjunganWarung = w;

    const modal = document.getElementById('modalKunjungan');
    document.getElementById('kunjunganWarungId').value = w.id;
    document.getElementById('kunjunganWarungTitle').textContent = 'Kunjungan: ' + w.nama;
    document.getElementById('kunjunganStokAwal').textContent = (w.jumlahTitip || 20) + ' Pcs';
    document.getElementById('kunjunganTarifPcs').textContent = `${formatRupiah(w.hargaJual)} / ${formatRupiah(w.komisi)}`;

    // Default sisa fisik: 5 pcs
    const defaultSisa = Math.max(0, Math.floor((w.jumlahTitip || 20) / 4));
    document.getElementById('kunjunganSisaFisik').value = defaultSisa;
    document.getElementById('kunjunganRestockBaru').value = w.jumlahTitip || 20;

    recalculateKunjunganKasir();

    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function closeKunjunganModal() {
    const modal = document.getElementById('modalKunjungan');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    activeKunjunganWarung = null;
  }

  function recalculateKunjunganKasir() {
    if (!activeKunjunganWarung) return;
    const stokAwal = Number(activeKunjunganWarung.jumlahTitip) || 20;
    const hargaJual = Number(activeKunjunganWarung.hargaJual) || 2000;
    const komisi = Number(activeKunjunganWarung.komisi) || 500;
    const sisaFisik = Math.max(0, Number(document.getElementById('kunjunganSisaFisik').value) || 0);

    const terjual = Math.max(0, stokAwal - sisaFisik);
    const omzet = terjual * hargaJual;
    const totalKomisi = terjual * komisi;
    const uangBersih = omzet - totalKomisi;

    document.getElementById('kunjunganTerjualText').textContent = terjual + ' Pcs';
    document.getElementById('kunjunganOmzetText').textContent = formatRupiah(omzet);
    document.getElementById('kunjunganKomisiWarungText').textContent = formatRupiah(totalKomisi);
    document.getElementById('kunjunganUangBersihText').textContent = formatRupiah(uangBersih);
  }

  function handleSaveKunjungan(event) {
    event.preventDefault();
    if (!activeKunjunganWarung) return;

    const w = activeKunjunganWarung;
    const stokAwal = Number(w.jumlahTitip) || 20;
    const hargaJual = Number(w.hargaJual) || 2000;
    const komisi = Number(w.komisi) || 500;
    const sisaFisik = Math.max(0, Number(document.getElementById('kunjunganSisaFisik').value) || 0);
    const restockBaru = Math.max(0, Number(document.getElementById('kunjunganRestockBaru').value) || 20);

    const terjual = Math.max(0, stokAwal - sisaFisik);
    const omzet = terjual * hargaJual;
    const totalKomisi = terjual * komisi;
    const uangBersih = omzet - totalKomisi;

    // 1. Update Warung Stok & Jadwal Cek Berikutnya
    const intervalHari = w.intervalHari || 14;
    const todayStr = new Date().toISOString().split('T')[0];
    const nextCheckDate = new Date(Date.now() + intervalHari * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const idx = state.stores.findIndex(x => x.id === w.id);
    if (idx !== -1) {
      state.stores[idx].jumlahTitip = restockBaru;
      state.stores[idx].tanggalTitip = todayStr;
      state.stores[idx].tanggalJadwalCek = nextCheckDate;
    }

    // 2. Catat Transaksi Masuk ke Arus Kas
    if (uangBersih > 0) {
      const newTx = {
        id: 'tx-' + Date.now(),
        tanggal: todayStr,
        tipe: 'masuk',
        kategori: 'setoran_warung',
        nominal: uangBersih,
        keterangan: `Setoran warung ${w.nama} (Laku ${terjual} pcs stiker)`
      };
      state.transactions.unshift(newTx);
    }

    saveState();
    closeKunjunganModal();
    renderBisnisDashboard();
    renderWarungList();
    renderCashflowList();

    alert(`Alhamdulillah! Berhasil mencatat setoran dari ${w.nama}.\n\n• Terjual: ${terjual} pcs\n• Bagian Warung: ${formatRupiah(totalKomisi)}\n• Uang Anda Terima: ${formatRupiah(uangBersih)}\n• Stok Baru Dititip: ${restockBaru} pcs\n\nData setoran otomatis dicatat ke Buku Kas!`);
  }

  // --- KIRIM NOTA DIGITAL VIA WHATSAPP ---
  function sendNotaWhatsApp(id) {
    const w = state.stores.find(x => x.id === id);
    if (!w) return;

    const todayFormatted = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date());
    const textNota = 
`*NOTA TITIP JUAL STIKER - PARTNER FATIH*
Kepada Yth: ${w.pemilik || 'Pemilik'} (${w.nama})
Tanggal: ${todayFormatted}

Rincian Titipan Produk:
• Jenis Produk: ${w.varian || 'Stiker Anti-Air'}
• Jumlah Dititip: *${w.jumlahTitip} Pcs*
• Harga Jual Konsumen: ${formatRupiah(w.hargaJual)} / pcs
• Bagi Hasil untuk Warung: *${formatRupiah(w.komisi)} / pcs laku*

Jadwal Kunjungan & Pengecekan Rutin:
• Tiap ${w.intervalHari || 14} Hari Sekali
• Rencana Cek Berikutnya: ${w.tanggalJadwalCek || '-'}

Catatan:
Sistem titip jual tanpa modal bagi warung. Barang yang belum laku bebas dikembalikan tanpa biaya.

Terima kasih banyak atas kerjasamanya Bu/Pak. Semoga warungnya semakin laris dan berkah! 🙏✨`;

    const waClean = (w.wa || '').replace(/[^0-9]/g, '');
    if (waClean) {
      const phone = waClean.startsWith('0') ? '62' + waClean.substring(1) : waClean;
      const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(textNota)}`;
      window.open(url, '_blank');
    } else {
      // Jika no WA belum diisi, salin ke clipboard
      navigator.clipboard.writeText(textNota).then(() => {
        alert('Nomor WhatsApp warung ini belum diisi, namun teks Nota Titip Jual berhasil disalin ke clipboard! Anda bisa langsung menempelkannya (paste) ke WhatsApp.');
      }).catch(() => {
        prompt('Salin teks nota titip jual ini:', textNota);
      });
    }
  }

  // --- CASHFLOW MANAGEMENT ---
  function renderCashflowList() {
    const tbody = document.getElementById('cashflowTableBody');
    const emptyState = document.getElementById('cashflowEmptyState');
    if (!tbody) return;

    if (state.transactions.length === 0) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    tbody.innerHTML = state.transactions.map(t => {
      const isMasuk = t.tipe === 'masuk';
      const badgeTipe = isMasuk 
        ? `<span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">Masuk</span>`
        : `<span class="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold text-[10px]">Keluar</span>`;
      
      const nominalFormatted = (isMasuk ? '+ ' : '- ') + formatRupiah(t.nominal);
      const nominalClass = isMasuk ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-600 dark:text-rose-400 font-bold';

      return `
        <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
          <td class="py-2.5 px-2.5 text-slate-500 font-mono text-[10.5px]">${t.tanggal || '-'}</td>
          <td class="py-2.5 px-2.5 font-medium text-slate-800 dark:text-slate-100 max-w-[200px] truncate">${t.keterangan || '-'}</td>
          <td class="py-2.5 px-2.5">${badgeTipe}</td>
          <td class="py-2.5 px-2.5 text-right font-mono ${nominalClass}">${nominalFormatted}</td>
          <td class="py-2.5 px-2.5 text-center">
            <button onclick="deleteCashflowPrompt('${t.id}')" class="text-slate-400 hover:text-rose-500 p-1 cursor-pointer">
              <i data-lucide="trash" class="w-3.5 h-3.5"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  function openAddCashflowModal() {
    const modal = document.getElementById('modalCashflow');
    const form = document.getElementById('formCashflow');
    if (form) form.reset();
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function closeAddCashflowModal() {
    const modal = document.getElementById('modalCashflow');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function handleSaveCashflow(event) {
    event.preventDefault();
    const tipeRadio = document.querySelector('input[name="cashflowType"]:checked');
    const tipe = tipeRadio ? tipeRadio.value : 'masuk';
    const nominal = Number(document.getElementById('cashflowNominal').value) || 0;
    const kategori = document.getElementById('cashflowKategori').value;
    const keterangan = document.getElementById('cashflowKeterangan').value.trim();
    const todayStr = new Date().toISOString().split('T')[0];

    const newTx = {
      id: 'tx-' + Date.now(),
      tanggal: todayStr,
      tipe,
      kategori,
      nominal,
      keterangan
    };

    state.transactions.unshift(newTx);
    saveState();
    closeAddCashflowModal();
    renderBisnisDashboard();
    renderCashflowList();
  }

  function deleteCashflowPrompt(id) {
    if (confirm('Hapus catatan kas ini?')) {
      state.transactions = state.transactions.filter(x => x.id !== id);
      saveState();
      renderBisnisDashboard();
      renderCashflowList();
    }
  }

  // --- SIMULASI KALKULATOR TREN BISNIS ---
  function hitungSimulasiBisnis() {
    const modalPcs = Number(document.getElementById('simModalPcs')?.value) || 500;
    const hargaJual = Number(document.getElementById('simHargaJual')?.value) || 2000;
    const komisiWarung = Number(document.getElementById('simKomisiWarung')?.value) || 500;
    const jumlahWarung = Number(document.getElementById('simJumlahWarung')?.value) || 5;

    const labaBersihPcs = Math.max(0, hargaJual - modalPcs - komisiWarung);
    // Asumsi per warung laku 20 pcs per minggu = 80 pcs per bulan
    const lakuPerBulanPerWarung = 80;
    const totalPcsSebulan = jumlahWarung * lakuPerBulanPerWarung;
    const totalLabaBulan = totalPcsSebulan * labaBersihPcs;

    const elLabaPcs = document.getElementById('simLabaPcs');
    const elPotensiBulan = document.getElementById('simPotensiBulan');
    if (elLabaPcs) elLabaPcs.textContent = `${formatRupiah(labaBersihPcs)} / pcs`;
    if (elPotensiBulan) elPotensiBulan.textContent = `${formatRupiah(totalLabaBulan)} / Bulan Bersih (${totalPcsSebulan} pcs)`;
  }

  // --- SCRIPT COPY TOOL ---
  function copyBisnisScript(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
      alert('Teks script berhasil disalin ke clipboard! Silakan dibaca atau dihafalkan intinya.');
    }).catch(() => {
      prompt('Salin script ini:', text);
    });
  }

  // --- DATA BACKUP & DEMO ---
  function exportBisnisData() {
    const jsonStr = JSON.stringify({
      appName: 'Partner Fatih - Inkubator Bisnis Titip Jual',
      exportDate: new Date().toISOString(),
      stores: state.stores,
      transactions: state.transactions
    }, null, 2);

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Backup_Titip_Jual_Warung_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function loadBisnisDemoDataPrompt() {
    if (confirm('Muat contoh data mitra warung & catatan kas untuk latihan dan simulasi?')) {
      state.stores = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_STORES));
      state.transactions = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_TRANSACTIONS));
      saveState();
      renderBisnisDashboard();
      renderWarungList();
      renderCashflowList();
      alert('Contoh data berhasil dimuat! Anda kini dapat mencoba fitur Cek Kasir dan simulasi perhitungan.');
    }
  }

  // Expose ke Window Global
  window.initBisnisTab = initBisnisTab;
  window.setBisnisSubTab = setBisnisSubTab;
  window.filterWarungStatus = filterWarungStatus;
  window.handleSearchWarung = handleSearchWarung;
  window.openAddWarungModal = openAddWarungModal;
  window.openEditWarungModal = openEditWarungModal;
  window.closeAddWarungModal = closeAddWarungModal;
  window.handleSaveWarung = handleSaveWarung;
  window.deleteWarungPrompt = deleteWarungPrompt;
  window.openKunjunganModal = openKunjunganModal;
  window.closeKunjunganModal = closeKunjunganModal;
  window.recalculateKunjunganKasir = recalculateKunjunganKasir;
  window.handleSaveKunjungan = handleSaveKunjungan;
  window.sendNotaWhatsApp = sendNotaWhatsApp;
  window.openAddCashflowModal = openAddCashflowModal;
  window.closeAddCashflowModal = closeAddCashflowModal;
  window.handleSaveCashflow = handleSaveCashflow;
  window.deleteCashflowPrompt = deleteCashflowPrompt;
  window.hitungSimulasiBisnis = hitungSimulasiBisnis;
  window.copyBisnisScript = copyBisnisScript;
  window.exportBisnisData = exportBisnisData;
  window.loadBisnisDemoDataPrompt = loadBisnisDemoDataPrompt;

})(window);

// END MODULE: tab_bisnis.js
