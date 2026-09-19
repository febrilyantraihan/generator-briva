// ============================================================================
// MODULE: app.js
// Tab Router (switchTab), Mobile Drawer, Live Clock, Bento Hub & App Lifecycle
// ============================================================================
let currentActiveTab = 'konverter';
let isDrawerOpen = false;
let deferredPwaPrompt = null;
      if (typeof forceState === 'boolean') {
        isDrawerOpen = forceState;
      } else {
        isDrawerOpen = !isDrawerOpen;
      }

      if (sidebar) {
        if (isDrawerOpen) {
          sidebar.classList.remove('-translate-x-full');
          sidebar.classList.add('translate-x-0');
        } else {
          sidebar.classList.add('-translate-x-full');
          sidebar.classList.remove('translate-x-0');
        }
      }

      if (backdrop) {
        if (isDrawerOpen) {
          backdrop.classList.add('drawer-active');
          backdrop.style.display = 'block';
          backdrop.style.pointerEvents = 'auto';
          backdrop.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
          backdrop.classList.add('opacity-100', 'pointer-events-auto');
        } else {
          backdrop.classList.remove('drawer-active', 'opacity-100', 'pointer-events-auto');
          backdrop.classList.add('hidden', 'opacity-0', 'pointer-events-none');
          backdrop.style.display = 'none';
          backdrop.style.pointerEvents = 'none';
        }
      }
    }

    // --- 2. AUDIO SYNTHESIZER ---
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function playTone(freq, duration = 0.12, type = 'sine') {
      if (!isSoundEnabled || !AudioContextClass) return;
      try {
      }
      activeTab = tabId;
      try { localStorage.setItem('partner_fatih_last_tab', tabId); } catch(e) {}

      // Update Mobile Header Immediately
      const tabMetaShort = {
        humas: { name: 'Humas & Sosmed', badge: 'Radar H-7', dot: 'bg-rose-500' },
        tahfidz: { name: 'Tahfidz Tasmi\'', badge: '31 Santri', dot: 'bg-emerald-500' },
        briva: { name: 'Generator BRIVA', badge: 'Format BRI', dot: 'bg-orange-500' },
        akun: { name: 'Generator Akun', badge: 'PPDB & CBT', dot: 'bg-indigo-500' },
        konverter: { name: 'Konverter Excel', badge: 'Massal', dot: 'bg-blue-500' },
        panggil: { name: 'Panggil Tagihan', badge: 'Kwitansi', dot: 'bg-emerald-500' },
        katalog: { name: 'Katalog Biaya', badge: '31 BRI', dot: 'bg-amber-500' },
        pembersih: { name: 'Pembersih & SUM', badge: 'Alias & SUM', dot: 'bg-cyan-500' },
        panduan: { name: 'Panduan Excel', badge: 'SOP', dot: 'bg-rose-500' },
        wa: { name: 'Template WhatsApp', badge: '6 Format', dot: 'bg-emerald-500' }
      };
      const curShort = tabMetaShort[tabId] || { name: 'Generator Briva', badge: 'YTPAI', dot: 'bg-blue-500' };
      const mobTitleEl = document.getElementById('mobileHeaderTitle');
      const mobBadgeEl = document.getElementById('mobileHeaderBadge');
      const mobDotEl = document.getElementById('mobileHeaderDot');
      if (mobTitleEl) mobTitleEl.textContent = curShort.name;
      if (mobBadgeEl) mobBadgeEl.textContent = curShort.badge;
      if (mobDotEl) mobDotEl.className = `w-2 h-2 rounded-full ${curShort.dot} animate-pulse flex-shrink-0`;

      const tabs = ['konverter', 'briva', 'panggil', 'akun', 'katalog', 'tahfidz', 'pembersih', 'panduan', 'wa', 'humas'];
      tabs.forEach(t => {
        const el = document.getElementById('tab-' + t);
        const nav = document.getElementById('nav-' + t);
        const dock = document.getElementById('dock-' + t);
        const room = document.getElementById('room-' + t);

        if (t === tabId) {
          if (el) el.classList.remove('hidden');
          if (nav) nav.className = 'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-[#1e293b] shadow-xs border border-slate-200/80 dark:border-indigo-500/40 transition-all sidebar-active group';
          if (dock) {
            dock.className = 'dock-item dock-item-active w-10 h-10 lg:w-11 lg:h-11 rounded-2xl flex items-center justify-center text-white bg-white/20 shadow-inner border border-white/25 transition-all group relative cursor-pointer';
          }
          if (room) {
            room.className = 'room-pill-active inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex-shrink-0';
            if (!room.querySelector('.active-dot')) {
              const dot = document.createElement('span');
              dot.className = 'active-dot w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse flex-shrink-0';
              room.prepend(dot);
            }
            const pillBox = document.getElementById('roomPillContainer');
            if (pillBox && room) {
              pillBox.scrollTo({ left: Math.max(0, room.offsetLeft - 30), behavior: 'smooth' });
            }
          }
          const mc = document.getElementById('mainCanvas');
          if (mc) mc.scrollTop = 0;
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          if (t === 'tahfidz' && typeof initTahfidzModule === 'function') {
            initTahfidzModule();
          }
          if (t === 'humas' && typeof initHumasModule === 'function') {
            initHumasModule();
          }
        } else {
          if (el) el.classList.add('hidden');
          if (nav) nav.className = 'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/70 transition-all group';
          if (dock) {
            dock.className = 'dock-item w-10 h-10 lg:w-11 lg:h-11 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all group relative cursor-pointer';
          }
          if (room) {
            room.className = 'room-pill-inactive inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex-shrink-0';
            const dot = room.querySelector('.active-dot');
            if (dot) dot.remove();
          }
        }
      });

      // Bento Hub: Menyesuaikan seluruh tampilan Bento Dashboard Hub mengikuti tab yang aktif
      const bentoSec = document.getElementById('bentoSection');
      if (bentoSec) {
        if (window.innerWidth >= 640) {
          bentoSec.classList.remove('hidden');
        } else {
          bentoSec.classList.add('hidden');
        }
      }
      if (typeof updateBentoDashboard === 'function') {
        updateBentoDashboard(tabId);
      }

      // Sync Mobile Bottom Navigation State
      const mobileNavTabs = ['humas', 'tahfidz', 'briva', 'akun'];
      const colorMap = {
        humas: { 
          text: 'text-rose-600 dark:text-rose-400', 
          pillBg: 'bg-rose-500/15 dark:bg-rose-500/25', 
          pillText: 'text-rose-600 dark:text-rose-400 shadow-xs shadow-rose-500/20' 
        },
        tahfidz: { 
          text: 'text-emerald-600 dark:text-emerald-400', 
          pillBg: 'bg-emerald-500/15 dark:bg-emerald-500/25', 
          pillText: 'text-emerald-600 dark:text-emerald-400 shadow-xs shadow-emerald-500/20' 
        },
        briva: { 
          text: 'text-orange-600 dark:text-orange-400', 
          pillBg: 'bg-orange-500/15 dark:bg-orange-500/25', 
          pillText: 'text-orange-600 dark:text-orange-400 shadow-xs shadow-orange-500/20' 
        },
        akun: { 
          text: 'text-indigo-600 dark:text-indigo-400', 
          pillBg: 'bg-indigo-500/15 dark:bg-indigo-500/25', 
          pillText: 'text-indigo-600 dark:text-indigo-400 shadow-xs shadow-indigo-500/20' 
        }
      };

      mobileNavTabs.forEach(t => {
        const bnav = document.getElementById('bnav-' + t);
        if (!bnav) return;
        const iconBox = bnav.querySelector('.bnav-icon-box');
        const label = bnav.querySelector('.bnav-label');
        if (t === tabId) {
          bnav.className = 'flex flex-col items-center justify-center flex-1 py-1 group transition-all relative font-bold active:scale-95 cursor-pointer h-full';
          if (iconBox) {
            iconBox.className = `bnav-icon-box px-3 py-0.5 rounded-full flex items-center justify-center ${colorMap[t].pillBg} ${colorMap[t].pillText} transition-all duration-200 relative`;
          }
          if (label) {
            label.className = `bnav-label text-[10px] font-bold leading-none tracking-tight ${colorMap[t].text} mt-1 transition-colors`;
          }
        } else {
          bnav.className = 'flex flex-col items-center justify-center flex-1 py-1 group transition-all relative font-medium active:scale-95 cursor-pointer h-full';
          if (iconBox) {
            iconBox.className = 'bnav-icon-box px-3 py-0.5 rounded-full flex items-center justify-center bg-transparent text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-all duration-200 relative';
          }
          if (label) {
            label.className = 'bnav-label text-[10px] font-semibold leading-none tracking-tight text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 mt-1 transition-colors';
          }
        }
      });

      // Highlight Menu (Lainnya) if secondary tab is selected
      const bnavLainnya = document.getElementById('bnav-lainnya');
      if (bnavLainnya) {
        const isSecondary = !mobileNavTabs.includes(tabId);
        const iconBox = bnavLainnya.querySelector('.bnav-icon-box');
        const label = bnavLainnya.querySelector('.bnav-label');
        if (isSecondary) {
          bnavLainnya.className = 'flex flex-col items-center justify-center flex-1 py-1 group transition-all relative font-bold active:scale-95 cursor-pointer h-full';
          if (iconBox) {
            iconBox.className = 'bnav-icon-box px-3 py-0.5 rounded-full flex items-center justify-center bg-purple-500/15 dark:bg-purple-500/25 text-purple-600 dark:text-purple-400 transition-all duration-200 relative';
          }
          if (label) {
            label.className = 'bnav-label text-[10px] font-bold leading-none tracking-tight text-purple-600 dark:text-purple-400 mt-1 transition-colors';
          }
        } else {
          bnavLainnya.className = 'flex flex-col items-center justify-center flex-1 py-1 group transition-all relative font-medium active:scale-95 cursor-pointer h-full';
          if (iconBox) {
            iconBox.className = 'bnav-icon-box px-3 py-0.5 rounded-full flex items-center justify-center bg-transparent text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-all duration-200 relative';
          }
          if (label) {
            label.className = 'bnav-label text-[10px] font-semibold leading-none tracking-tight text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 mt-1 transition-colors';
          }
        }
      }

      const tabMeta = {
        konverter: {
          title: 'Konverter Massal Excel',
          subtitle: 'Konversi otomatis data status & nominal spreadsheet ke format tagihan resmi.',
          breadcrumb: 'Konverter Massal',
          icon: 'table',
          gradient: 'from-blue-600 to-indigo-600',
          ring: 'ring-blue-50',
          badge: 'Mode Cepat'
        },
        briva: {
          title: 'Tagihan Massal BRIVA (Standar Bank BRI 5 Kolom)',
          subtitle: 'Format resmi Bank BRI CMS dengan generator Massal & Multi-Santri Manual.',
          breadcrumb: 'Generator BRIVA',
          icon: 'layers',
          gradient: 'from-orange-500 via-amber-500 to-orange-600',
          ring: 'ring-orange-50',
          badge: 'Standar BRI CMS'
        },
        panggil: {
          title: 'Panggil Data Tagihan Santri',
          subtitle: 'Pencarian tagihan per siswa & pencetakan slip kwitansi resmi santri.',
          breadcrumb: 'Panggil Data',
          icon: 'receipt',
          gradient: 'from-emerald-600 to-teal-600',
          ring: 'ring-emerald-50',
          badge: 'Slip Kwitansi'
        },
        akun: {
          title: 'Analisis Formulir PPDB & Generator Akun',
          subtitle: 'Pemisah otomatis Akun Orang Tua (11 Kolom), Akun Siswa & Akumulasi Siswa per Guru Pendamping.',
          breadcrumb: 'Generator Akun & PPDB',
          icon: 'user-check',
          gradient: 'from-indigo-600 via-purple-600 to-indigo-700',
          ring: 'ring-indigo-50',
          badge: 'PPDB & CBT'
        },
        tahfidz: {
          title: 'Tahfidz Caption Generator & Rekap Data',
          subtitle: 'Apresiasi Ujian Tasmi\' Bil Ghoib Sekali Duduk — 5 Unit Pendidikan (MI, MTs, SMP, MA, SMA).',
          breadcrumb: 'Tahfidz Tasmi\'',
          icon: 'book-open',
          gradient: 'from-emerald-600 via-teal-600 to-emerald-700',
          ring: 'ring-emerald-50',
          badge: '31 Santri Resmi'
        },
        katalog: {
          title: 'Katalog Database Biaya',
          subtitle: 'Database tarif resmi YTPAI Lamongan dan 31 Kode ID Tagihan resmi Bank BRI.',
          breadcrumb: 'Katalog Biaya',
          icon: 'folder-kanban',
          gradient: 'from-amber-500 to-yellow-600',
          ring: 'ring-amber-50',
          badge: '31 Kode BRI'
        },
        pembersih: {
          title: 'Pembersih Angka & Teks',
          subtitle: 'Pembersih format mata uang Rupiah, kalkulasi SUM otomatis & penyeragam status.',
          breadcrumb: 'Pembersih & SUM',
          icon: 'sparkles',
          gradient: 'from-cyan-500 to-blue-600',
          ring: 'ring-cyan-50',
          badge: 'SUM & Alias'
        },
        panduan: {
          title: 'Panduan Sinkronisasi Excel',
          subtitle: 'Tata cara integrasi copy-paste sel Excel ke sistem tanpa error.',
          breadcrumb: 'Panduan Sistem',
          icon: 'book-open-check',
          gradient: 'from-rose-500 to-pink-600',
          ring: 'ring-rose-50',
          badge: 'Dokumentasi'
        },
        humas: {
          title: 'Pusat Publikasi & Radar Agenda Tahunan YTPAI',
          subtitle: 'Monitoring terpadu program kerja 2026-2027, radar pengingat publikasi H-7, generator draf caption instan & database Supabase.',
          breadcrumb: 'Humas & Sosmed',
          icon: 'megaphone',
          gradient: 'from-indigo-600 via-purple-600 to-rose-600',
          ring: 'ring-rose-50',
          badge: 'Radar H-7'
        },
        wa: {
          title: 'Pusat Template WhatsApp & Undangan Rapat',
          subtitle: 'Format komunikasi resmi Bendahara Unit & Undangan Rapat Yayasan RM Tegalrejo.',
          breadcrumb: 'Template WhatsApp',
          icon: 'message-square-text',
          gradient: 'from-emerald-600 via-teal-600 to-emerald-700',
          ring: 'ring-emerald-50',
          badge: '6 Format WA'
        }
      };

      const meta = tabMeta[tabId] || tabMeta.konverter;
      
      // Update Top Breadcrumb
      const topBreadcrumb = document.getElementById('topHeaderBreadcrumb');
      if (topBreadcrumb) topBreadcrumb.textContent = meta.breadcrumb;

      // Update Project Timeline Titles
      const projectTimelineTitle = document.getElementById('projectTimelineTitle');
      const projectTimelineSubtitle = document.getElementById('projectTimelineSubtitle');
      if (projectTimelineTitle) projectTimelineTitle.textContent = meta.title;
      if (projectTimelineSubtitle) projectTimelineSubtitle.textContent = meta.subtitle.replace(/&mdash;/g, '—');

      // Update Contextual Action Button in Timeline Header
      const actionBtn = document.getElementById('timelineHeaderActionBtn');
      const actionLabel = document.getElementById('timelineHeaderActionLabel');
      const actionIcon = document.getElementById('timelineHeaderActionIcon');
      if (actionBtn && actionLabel && actionIcon) {
        if (tabId === 'humas') {
          actionLabel.textContent = 'Impor Massal';
          actionIcon.setAttribute('data-lucide', 'file-spreadsheet');
          actionBtn.onclick = () => { if (typeof openModalHumasBulkImport === 'function') openModalHumasBulkImport(); };
        } else if (tabId === 'tahfidz') {
          actionLabel.textContent = 'Cari Santri';
          actionIcon.setAttribute('data-lucide', 'search');
          actionBtn.onclick = () => { document.getElementById('tahfidzSearchInput')?.focus(); };
        } else if (tabId === 'akun') {
          actionLabel.textContent = 'Salin WA Akun';
          actionIcon.setAttribute('data-lucide', 'message-square');
          actionBtn.onclick = () => { if (typeof copyAllPpdbStudentsWa === 'function') copyAllPpdbStudentsWa(); };
        } else if (tabId === 'briva') {
          actionLabel.textContent = 'Generate BRIVA';
          actionIcon.setAttribute('data-lucide', 'credit-card');
          actionBtn.onclick = () => { if (typeof generateBrivaFromPpdb === 'function') generateBrivaFromPpdb(); };
        } else if (tabId === 'wa') {
          actionLabel.textContent = 'Template Akun';
          actionIcon.setAttribute('data-lucide', 'key');
          actionBtn.onclick = () => { if (typeof selectWaTemplate === 'function') selectWaTemplate('akun_santri'); };
        } else {
          actionLabel.textContent = 'Impor Data';
          actionIcon.setAttribute('data-lucide', 'plus');
          actionBtn.onclick = () => { document.getElementById('bulkInput')?.focus(); };
        }
      }

      // Update Mobile Header Active Tab Display
      const mobTitle = document.getElementById('mobileHeaderTitle');
      const mobBadge = document.getElementById('mobileHeaderBadge');
      const mobDesc = document.getElementById('mobileHeaderSubtitle');
      const mobDot = document.getElementById('mobileHeaderDot');
      if (mobTitle) mobTitle.textContent = meta.breadcrumb;
      if (mobBadge) mobBadge.textContent = meta.badge;
      if (mobDesc) mobDesc.textContent = meta.subtitle;
      if (mobDot) {
        const dotColors = {
          akun: 'bg-emerald-400',
          konverter: 'bg-blue-500',
          briva: 'bg-orange-500',
          panggil: 'bg-emerald-500',
          tahfidz: 'bg-emerald-500',
          katalog: 'bg-amber-500',
          pembersih: 'bg-cyan-500',
          panduan: 'bg-rose-500',
          wa: 'bg-emerald-500',
          humas: 'bg-rose-500'
        };
        mobDot.className = `w-2 h-2 rounded-full ${dotColors[tabId] || 'bg-blue-500'} animate-pulse flex-shrink-0`;
      }

      // Fallback Legacy Title Elements (if present)
      const titleEl = document.getElementById('sectionTitle');
      const subEl = document.getElementById('sectionSubtitle');
      const breadcrumbEl = document.getElementById('sectionBreadcrumb');
      const iconWrapper = document.getElementById('sectionIconWrapper');
      const iconEl = document.getElementById('sectionIcon');
      const badgeText = document.getElementById('sectionBadgeText');

      if (titleEl) titleEl.textContent = meta.title;
      if (subEl) subEl.textContent = meta.subtitle;
      if (breadcrumbEl) breadcrumbEl.textContent = meta.breadcrumb;
      if (badgeText) badgeText.textContent = meta.badge;
      if (iconWrapper) {
        iconWrapper.className = `w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${meta.gradient} text-white flex items-center justify-center flex-shrink-0 shadow-md ring-4 ${meta.ring} transition-all duration-300`;
      }
      if (iconEl) {
        iconEl.setAttribute('data-lucide', meta.icon);
      }

      // Toggle Quick Access Cards & Shortcut Bar (if present)
      const quickCards = document.getElementById('quickAccessCardsRow');
      const quickShortcuts = document.getElementById('quickAccessShortcutBar');
      if (quickCards) {
        if (tabId === 'konverter') {
          quickCards.classList.remove('hidden');
          if (quickShortcuts) quickShortcuts.classList.remove('hidden');
        } else {
          quickCards.classList.add('hidden');
          if (quickShortcuts) quickShortcuts.classList.add('hidden');
        }
      }

      // Manage mobile sticky action bar visibility based on active tab
      if (tabId === 'briva' && typeof currentBrivaResults !== 'undefined' && currentBrivaResults.length > 0) {
        updateMobileStickyBar('briva', `${currentBrivaResults.length} baris BRIVA`, 'copyBriva5Columns()', 'Salin 5 Kolom');
      } else if (tabId === 'konverter' && typeof currentBulkResults !== 'undefined' && currentBulkResults.length > 0) {
        updateMobileStickyBar('konverter', `${currentBulkResults.length} baris hasil`, 'copySafeExcelColumn()', 'Salin Hasil');
      } else {
        hideMobileStickyBar();
      }

      const container = document.getElementById('mainContentContainer');
      if (container) container.scrollTop = 0;
      const mc = document.getElementById('mainCanvas');
      if (mc) mc.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      if (document.documentElement) document.documentElement.scrollTop = 0;
      safeCreateIcons();
    }

    /**
     * =========================================================================
     * DYNAMIC BENTO DASHBOARD HUB CONTROLLER (updateBentoDashboard)
     * Menyesuaikan seluruh tampilan Bento Dashboard Hub (Hero Card, Cards 3, 4, 5
     * dan Circular Arc Gauge) secara dinamis & adaptif di seluruh tab aplikasi.
     * =========================================================================
     */
    function updateBentoDashboard(tabId) {
      const bentoSec = document.getElementById('bentoSection');
      if (!bentoSec) return;

      const humasPriorityHub = document.getElementById('humasPriorityReminderHub');
      const bentoContentGrid = document.getElementById('bentoContentGrid');
      const mobileHubToggle = document.getElementById('btnToggleMobileBento')?.parentElement;

      if (tabId === 'humas') {
        // Pada tab Humas: sembunyikan bentoSection duplikat agar seluruh workspace Tab Humas mengalir terpadu dalam satu alur
        bentoSec.classList.add('hidden');
        bentoSec.style.display = 'none';
        if (humasPriorityHub) humasPriorityHub.style.display = 'none';
        if (typeof initHumasModule === 'function') initHumasModule();
        else if (typeof renderHumasMetrics === 'function') renderHumasMetrics();
        safeCreateIcons();
        return;
      } else {
        // Tab lain: kembalikan Bento Hub standar di desktop
        if (window.innerWidth >= 640) {
          bentoSec.classList.remove('hidden');
          bentoSec.style.display = '';
        } else {
          bentoSec.classList.add('hidden');
          bentoSec.style.display = 'none';
        }
        if (humasPriorityHub) humasPriorityHub.style.display = 'none';
        if (bentoContentGrid) bentoContentGrid.style.display = '';
        if (mobileHubToggle) mobileHubToggle.style.display = '';
      }

      const mobileHubBadge = document.getElementById('bentoMobileHubBadge');
      const heroBadgeText = document.getElementById('bentoHeroBadgeText');
      const heroSubBadgeText = document.getElementById('bentoHeroSubBadgeText');
      const heroTitle = document.getElementById('bentoHeroTitle');
      const heroDesc = document.getElementById('bentoHeroDesc');
      const heroActions = document.getElementById('bentoHeroActions');
      const clockFooterText = document.getElementById('bentoClockFooterText');
      const card3 = document.getElementById('bentoCard3');
      const card4 = document.getElementById('bentoCard4');
      const card5 = document.getElementById('bentoCard5');
      const gaugeTitle = document.getElementById('bentoGaugeTitle');
      const gaugeSubtitle = document.getElementById('bentoGaugeSubtitle');
      const gaugeArc = document.getElementById('bentoGaugeArc');
      const gaugePercentText = document.getElementById('gaugePercentText');
      const gaugePercentLabel = document.getElementById('gaugePercentLabel');
      const gaugeLegend = document.getElementById('bentoGaugeLegend');
      const gaugeActions = document.getElementById('bentoGaugeActions');

      const bentoConfigs = {
        humas: {
          mobileBadge: 'Studio Humas & Sosmed',
          badge: 'HUMAS &amp; SOSMED COMMAND CENTER &bull; 2026-2027',
          subBadge: '<i data-lucide="radio" class="w-4 h-4 text-rose-400 animate-pulse"></i><span class="font-bold text-rose-300">Radar H-7 Aktif</span>',
          title: 'Pusat Publikasi & Radar Agenda Tahunan YTPAI',
          desc: 'Monitoring agenda program kerja 2026-2027, radar pengingat publikasi H-7, generator draf caption instan, dan integrasi database Supabase / Vercel.',
          actions: `
            <button type="button" onclick="openModalHumasBulkImport()" class="bg-gradient-to-r from-rose-600 via-indigo-600 to-purple-600 hover:from-rose-500 hover:to-indigo-500 active:scale-95 text-white font-black text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="file-spreadsheet" class="w-4 h-4"></i><span>📥 Impor Massal (Excel / Tempel)</span>
            </button>
            <button type="button" onclick="openModalAddProgram()" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="plus-circle" class="w-4 h-4 text-emerald-400"></i><span>+ Tambah Agenda</span>
            </button>
            <button type="button" onclick="openModalSupabaseConfig()" class="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]" title="Konfigurasi Database Supabase & Vercel">
              <i data-lucide="database" class="w-3.5 h-3.5 text-cyan-400"></i><span>Database Supabase</span>
            </button>
          `,
          clockFooter: 'Humas Command Ready',
          card3: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                    <i data-lucide="bell-ring" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Radar H-7 Publikasi</p>
                    <p class="text-[10px] text-slate-400">Peringatan Tindakan Cepat</p>
                  </div>
                </div>
                <span class="text-[10.5px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse" id="bentoHumasH7Badge">Aktif</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Mendeteksi otomatis agenda yang akan berlangsung 7 hari ke depan agar pamflet disiapkan tepat waktu.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full" id="bentoHumasH7Count">0 Butuh Desain</span>
              <button onclick="filterHumasTable('status', 'h7')" class="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer">Lihat Radar &rsaquo;</button>
            </div>
          `,
          card4: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <i data-lucide="share-2" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Multi-Kanal Sosmed</p>
                    <p class="text-[10px] text-slate-400">IG, FB, WA, TikTok</p>
                  </div>
                </div>
                <span class="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">4 Kanal</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Distribusi konten serentak dengan generator caption otomatis berbasis template resmi YTPAI.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Studio Caption AI</span>
              <button onclick="const el=document.getElementById('humasCaptionStudioCard'); const cont=document.getElementById('mainContentContainer'); if(el&&cont) cont.scrollTo({top:Math.max(0, el.offsetTop-80), behavior:'smooth'});" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">Buka Studio &rsaquo;</button>
            </div>
          `,
          card5: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                    <i data-lucide="database" class="w-4 h-4"></i>
                  </div>
                  <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Supabase & Cloud Sync</p>
                </div>
                <span class="text-xs font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded-lg" id="bentoSupabaseStatus">Siap Deploy</span>
              </div>
              <div class="mt-2 space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Database Engine:</span>
                  <code class="font-bold text-emerald-700 dark:text-emerald-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded" id="bentoDbBackendLabel">Supabase / Sheets</code>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Target Hosting:</span>
                  <span class="font-semibold text-slate-700 dark:text-slate-300">Vercel Production</span>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Sinkronisasi Instan</span>
              <button onclick="saveHumasToCloud()" class="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer">Simpan Cloud &rsaquo;</button>
            </div>
          `,
          gaugeTitle: 'Kesiapan Pamflet Sosmed',
          gaugeSubtitle: 'Status Desain & Publikasi Agenda',
          percent: '100%',
          label: 'Tayang',
          arcOffset: 62.8,
          legend: `
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white" onclick="filterHumasTable('status', 'selesai')">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span class="font-medium">Sudah Tayang / Selesai</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums" id="bentoGaugeSelesaiCount">0</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white" onclick="filterHumasTable('status', 'siap')">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span><span class="font-medium">Pamflet Siap Publish</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums" id="bentoGaugeSiapCount">0</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white" onclick="filterHumasTable('status', 'proses')">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span class="font-medium">Sedang Proses Desain</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums" id="bentoGaugeProsesCount">0</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white" onclick="filterHumasTable('status', 'belum')">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span class="font-medium">Belum Dibuat</span></span>
              <span class="font-extrabold text-rose-600 dark:text-rose-400 tabular-nums" id="bentoGaugeBelumCount">0</span>
            </div>
          `,
          gaugeActions: `
            <button onclick="exportHumasTableCsv()" class="flex-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="download" class="w-3.5 h-3.5"></i><span>Unduh CSV</span>
            </button>
            <button onclick="saveHumasToCloud()" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="cloud" class="w-3.5 h-3.5"></i><span>Simpan Cloud</span>
            </button>
          `
        },
        akun: {
          mobileBadge: 'Studio PPDB',
          badge: 'PPDB STUDIO SUITE &bull; 2026-2027',
          subBadge: '<i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i><span class="font-medium">11 Kolom Standar</span>',
          title: 'Studio Generator Akun & Analisis PPDB',
          desc: 'Otomasi pemisahan Akun Orang Tua (11 Kolom), Akun Siswa Baru & Akumulasi Siswa per Guru Pendamping &mdash; YTPAI Tegalrejo.',
          actions: `
            <button type="button" onclick="document.getElementById('ppdbFileInput').click()" class="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="file-up" class="w-4 h-4"></i><span>Pilih File Excel</span>
            </button>
            <button type="button" onclick="loadPpdbSampleData()" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="sparkles" class="w-4 h-4 text-amber-400"></i><span>Muat Contoh Data (15 Siswa)</span>
            </button>
            <button type="button" onclick="togglePpdbPasteArea()" class="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="clipboard" class="w-3.5 h-3.5"></i><span>Tempel Baris</span>
            </button>
          `,
          clockFooter: 'Spreadsheet Ready',
          card3: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <i data-lucide="file-spreadsheet" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Google Sheets YTPAI</p>
                    <p class="text-[10px] text-slate-400">Database Pendaftaran</p>
                  </div>
                </div>
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Tersambung"></span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Format kolom PPDB terstandar 11 atribut (Ortu, Siswa, Guru, Rekening BRIVA).</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">Status: Sinkron</span>
              <button onclick="switchAccountMode('ppdb'); document.getElementById('ppdbFileInput').click();" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">Unggah File &rsaquo;</button>
            </div>
          `,
          card4: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                    <i data-lucide="layers" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">BRIVA CMS Gateway</p>
                    <p class="text-[10px] text-slate-400">Standar Bank BRI 5-Kolom</p>
                  </div>
                </div>
                <span class="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">77992</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Format: Nomor Briva, Nama, Tagihan, Keterangan, Expired Date.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Prefix: 77992 + ID Siswa</span>
              <button onclick="switchTab('briva')" class="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer">Buka BRIVA &rsaquo;</button>
            </div>
          `,
          card5: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    <i data-lucide="sliders" class="w-4 h-4"></i>
                  </div>
                  <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Parameter Angkatan</p>
                </div>
                <span class="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-lg">2026</span>
              </div>
              <div class="mt-2 space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Suffix Username:</span>
                  <code class="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">26</code>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Kata Sandi Default:</span>
                  <code class="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">P@ssword123</code>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Otomatisasi Username</span>
              <button onclick="document.getElementById('ppdbSuffixInput')?.focus()" class="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">Edit Parameter &rsaquo;</button>
            </div>
          `,
          gaugeTitle: 'Target Verifikasi',
          gaugeSubtitle: 'Kelengkapan Akun & Tagihan',
          percent: '98%',
          label: 'Verifikasi',
          arcOffset: 75,
          legend: `
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white" onclick="switchTab('akun'); switchPpdbSubtab('ortu');">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span class="font-medium">Akun Orang Tua</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums" id="bentoOrtuCount">93 Ortu</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white" onclick="switchTab('akun'); switchPpdbSubtab('siswa');">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span class="font-medium">Akun Siswa PPDB</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums" id="bentoSiswaCount">93 Siswa</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white" onclick="switchTab('akun'); switchPpdbSubtab('guru');">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span class="font-medium">Guru Pendamping</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums" id="bentoGuruCount">13 Guru</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white" onclick="switchTab('briva');">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span class="font-medium">Tagihan BRIVA</span></span>
              <span class="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">Siap CMS</span>
            </div>
          `,
          gaugeActions: `
            <button onclick="copyCurrentPpdbTableExcel()" class="flex-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Salin Excel</span>
            </button>
            <button onclick="exportCurrentPpdbToNativeXlsx()" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="download" class="w-3.5 h-3.5"></i><span>Unduh .xlsx</span>
            </button>
          `
        },
        panggil: {
          mobileBadge: 'Studio Panggil Tagihan',
          badge: 'PANGGIL TAGIHAN SUITE &bull; KWITANSI RESMI',
          subBadge: '<i data-lucide="receipt" class="w-4 h-4 text-emerald-400"></i><span class="font-medium">Slip Kwitansi Santri</span>',
          title: 'Studio Panggil Tagihan & Kwitansi Santri',
          desc: 'Pencarian instan data tagihan per siswa, rekap tunggakan & cetak slip kwitansi resmi santri Raudlatul Muta\'allimin.',
          actions: `
            <button type="button" onclick="document.getElementById('singleNama')?.focus()" class="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="user-search" class="w-4 h-4"></i><span>Ketik Nama Siswa</span>
            </button>
            <button type="button" onclick="copyFullReceiptText()" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="copy" class="w-4 h-4 text-emerald-400"></i><span>Salin Rincian Kwitansi</span>
            </button>
            <button type="button" onclick="window.print()" class="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i><span>Cetak Slip Kwitansi</span>
            </button>
          `,
          clockFooter: 'Panggil Santri Ready',
          card3: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <i data-lucide="receipt" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Format Slip Resmi</p>
                    <p class="text-[10px] text-slate-400">Nota Bendahara YTPAI</p>
                  </div>
                </div>
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Format nota #BRV-2026 dengan rincian pos tagihan, kelas, dan status mukim reguler.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">Format: Valid</span>
              <button onclick="copyFullReceiptText()" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">Salin Rincian &rsaquo;</button>
            </div>
          `,
          card4: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <i data-lucide="calendar-range" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">4 Pilihan Kategori</p>
                    <p class="text-[10px] text-slate-400">Fleksibilitas Tagihan</p>
                  </div>
                </div>
                <span class="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">4 Mode</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Beralih cepat: Per Bulan, Awal Tahun, Akhir Tahun, atau 1 Tahun Penuh.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Kalkulasi Otomatis</span>
              <button onclick="switchSingleCategory('bulanan')" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Ganti Mode &rsaquo;</button>
            </div>
          `,
          card5: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    <i data-lucide="wallet" class="w-4 h-4"></i>
                  </div>
                  <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Pembayaran BRIVA</p>
                </div>
                <span class="text-xs font-extrabold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-lg">77992</span>
              </div>
              <div class="mt-2 space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Total Akumulasi:</span>
                  <code class="font-bold text-emerald-700 dark:text-emerald-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded" id="bentoPanggilTotal">Rp 330.000</code>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Channel Bayar:</span>
                  <span class="font-semibold text-slate-700 dark:text-slate-300">ATM/BRImo/Agen</span>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Kwitansi Siap Cetak</span>
              <button onclick="window.print()" class="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">Cetak Nota &rsaquo;</button>
            </div>
          `,
          gaugeTitle: 'Status Kwitansi & Santri',
          gaugeSubtitle: 'Kesiapan Dokumen Pembayaran',
          percent: '100%',
          label: 'Siap Cetak',
          arcOffset: 62.8,
          legend: `
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white" onclick="switchSingleCategory('bulanan')">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span class="font-medium">Tagihan Per Bulan</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Aktif</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white" onclick="switchSingleCategory('awal_tahun')">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span class="font-medium">Tagihan Awal Tahun</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Tersedia</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white" onclick="switchSingleCategory('akhir_tahun')">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span class="font-medium">Tagihan Akhir Tahun</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Tersedia</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span class="font-medium">Slip Kwitansi</span></span>
              <span class="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">Resmi</span>
            </div>
          `,
          gaugeActions: `
            <button onclick="copyFullReceiptText()" class="flex-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Salin Rincian</span>
            </button>
            <button onclick="window.print()" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i><span>Cetak Slip</span>
            </button>
          `
        },
        briva: {
          mobileBadge: 'Studio Tagihan BRIVA',
          badge: 'BRIVA CMS GATEWAY &bull; 5-KOLOM STANDAR',
          subBadge: '<i data-lucide="layers" class="w-4 h-4 text-orange-400"></i><span class="font-medium">Format Bank BRI</span>',
          title: 'Studio Tagihan BRIVA 5-Kolom CMS',
          desc: 'Generator format massal upload CMS Bank BRI: Nomor Registrasi (A), ID Tagihan (B), Jumlah (C), Tgl Efektif (D) & Expired Date (E).',
          actions: `
            <button type="button" onclick="setBrivaRowMode('split_full')" class="bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="layers-3" class="w-4 h-4"></i><span>Pecah Rinci ke Bawah</span>
            </button>
            <button type="button" onclick="setBrivaRowMode('split_category')" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="folder-tree" class="w-4 h-4 text-amber-400"></i><span>Pecah Kategori</span>
            </button>
            <button type="button" onclick="setBrivaRowMode('accumulate')" class="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="combine" class="w-3.5 h-3.5"></i><span>Akumulasi 1 Baris</span>
            </button>
          `,
          clockFooter: 'BRIVA Gateway Ready',
          card3: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <i data-lucide="hash" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">ID Tagihan (Kolom B)</p>
                    <p class="text-[10px] text-slate-400">Aturan Kode Tagihan</p>
                  </div>
                </div>
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Format deskripsi tagihan otomatis disesuaikan dengan jenis komponen dan bulan.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">Standar CMS BRI</span>
              <button onclick="document.getElementById('brivaIdTagihanSelect')?.focus()" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Pilih ID &rsaquo;</button>
            </div>
          `,
          card4: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <i data-lucide="calendar" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Jadwal Expired Date</p>
                    <p class="text-[10px] text-slate-400">Kolom D & Kolom E</p>
                  </div>
                </div>
                <span class="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">Auto Date</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Tgl Efektif awal bulan & Tgl Jatuh Tempo tgl 20 / akhir bulan otomatis.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Format: DD/MM/YYYY</span>
              <button onclick="document.getElementById('brivaDueDateOption')?.focus()" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">Atur Tanggal &rsaquo;</button>
            </div>
          `,
          card5: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <i data-lucide="lock" class="w-4 h-4"></i>
                  </div>
                  <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Kunci Nol Awalan ('0)</p>
                </div>
                <span class="text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-lg">Kunci Aktif</span>
              </div>
              <div class="mt-2 space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Format Jumlah (C):</span>
                  <code class="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">281,000</code>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Prefix BRIVA:</span>
                  <code class="font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/50 px-1.5 py-0.5 rounded">77992</code>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Excel Safe Guard</span>
              <button onclick="document.getElementById('brivaFormatSelect')?.focus()" class="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer">Format C &rsaquo;</button>
            </div>
          `,
          gaugeTitle: 'Validitas CMS BRIVA',
          gaugeSubtitle: 'Kepatuhan Format Template BRI',
          percent: '100%',
          label: 'CMS Valid',
          arcOffset: 62.8,
          legend: `
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-orange-500"></span><span class="font-medium">No. Registrasi (A)</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">77992 + ID</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span class="font-medium">ID Tagihan (B)</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Terformat</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span class="font-medium">Jumlah Tagihan (C)</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Koma/Safe</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span class="font-medium">Efektif & Exp (D, E)</span></span>
              <span class="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">Valid</span>
            </div>
          `,
          gaugeActions: `
            <button onclick="copyBriva5Columns()" class="flex-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Salin Tabel</span>
            </button>
            <button onclick="downloadBrivaCsv()" class="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="download" class="w-3.5 h-3.5"></i><span>Unduh CSV</span>
            </button>
          `
        },
        tahfidz: {
          mobileBadge: 'Studio Tahfidz Tasmi\'',
          badge: 'TAHFIDZ TASMI\' SUITE &bull; BIL GHOIB',
          subBadge: '<i data-lucide="book-open" class="w-4 h-4 text-emerald-400"></i><span class="font-medium">31 Santri Resmi</span>',
          title: 'Studio Caption & Rekapitulasi Tahfidz Tasmi\'',
          desc: 'Apresiasi Ujian Tasmi\' Bil Ghoib Sekali Duduk — Generator caption medsos Instagram/WA berpredikat resmi & hashtag viral.',
          actions: `
            <button type="button" onclick="document.getElementById('tahfidzSearchInput')?.focus()" class="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="search" class="w-4 h-4"></i><span>Cari Santri / Wali</span>
            </button>
            <button type="button" onclick="copyTahfidzCaption()" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="copy" class="w-4 h-4 text-emerald-400"></i><span>Salin Caption Medsos</span>
            </button>
            <button type="button" onclick="shareTahfidzWA()" class="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="share-2" class="w-3.5 h-3.5"></i><span>Bagikan WhatsApp</span>
            </button>
          `,
          clockFooter: '31 Santri Terdata',
          card3: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-500/30 flex items-center justify-center font-bold">
                    <i data-lucide="database" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Master 31 Santri Resmi</p>
                    <p class="text-[10px] text-slate-400">5 Unit Pendidikan</p>
                  </div>
                </div>
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">SMA: 6, MA: 5, MTs: 9, SMP: 3, MI: 8. Lengkap data wali dan kategori juz.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">31 Santri Valid</span>
              <button onclick="switchTahfidzSubView('rekap')" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">Buka Rekap &rsaquo;</button>
            </div>
          `,
          card4: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-200/50 dark:border-amber-500/30 flex items-center justify-center font-bold">
                    <i data-lucide="award" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">3 Predikat Resmi</p>
                    <p class="text-[10px] text-slate-400">Standar Ujian Tasmi'</p>
                  </div>
                </div>
                <span class="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">FTH</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">🌟 Mumtaz (Istimewa), Jayyid Jiddan (Sangat Baik), dan Jayyid (Baik).</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Tanpa Maqbul</span>
              <button onclick="setTahfidzPredikat('MUMTAZ')" class="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer">Pilih Mumtaz &rsaquo;</button>
            </div>
          `,
          card5: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-200/50 dark:border-purple-500/30 flex items-center justify-center font-bold">
                    <i data-lucide="hash" class="w-4 h-4"></i>
                  </div>
                  <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Hashtag Viral Sosmed</p>
                </div>
                <span class="text-xs font-extrabold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-lg">Trending</span>
              </div>
              <div class="mt-2 space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Hashtag Utama:</span>
                  <code class="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">#fyp #viral #tahfidz</code>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Jangkauan:</span>
                  <span class="font-semibold text-purple-600 dark:text-purple-400">Reels & Explore</span>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Optimasi Algoritma</span>
              <button onclick="copyTahfidzCaption()" class="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">Salin Caption &rsaquo;</button>
            </div>
          `,
          gaugeTitle: 'Database Santri Tasmi\'',
          gaugeSubtitle: 'Kelengkapan Profil & Kategori Juz',
          percent: '31',
          label: 'Santri',
          arcOffset: 62.8,
          legend: `
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span class="font-medium">SMA Raudlatul Muta'allimin</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">6 Santri</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span class="font-medium">MA Raudlatul Muta'allimin</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">5 Santri</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span class="font-medium">MTs Raudlatul Muta'allimin</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">9 Santri</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span class="font-medium">SMP & MI Raudlatul Muta'allimin</span></span>
              <span class="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">11 Santri</span>
            </div>
          `,
          gaugeActions: `
            <button onclick="copyTahfidzCaption()" class="flex-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Salin Caption</span>
            </button>
            <button onclick="shareTahfidzWA()" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="share-2" class="w-3.5 h-3.5"></i><span>Kirim ke WA</span>
            </button>
          `
        },
        konverter: {
          mobileBadge: 'Studio Konverter Massal',
          badge: 'MASS CONVERTER ENGINE &bull; MULTI-FORMAT',
          subBadge: '<i data-lucide="table" class="w-4 h-4 text-blue-400"></i><span class="font-medium">XLSX / CSV / TXT</span>',
          title: 'Studio Konverter Massal Spreadsheet',
          desc: 'Transformasi format data mentah berbagai format menjadi tabel terstruktur standar YTPAI secara otomatis dan cepat.',
          actions: `
            <button type="button" onclick="insertBulkSample()" class="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="sparkles" class="w-4 h-4"></i><span>Muat Contoh Data</span>
            </button>
            <button type="button" onclick="document.getElementById('bulkInput')?.focus()" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="clipboard" class="w-4 h-4 text-cyan-400"></i><span>Tempel Teks Mentah</span>
            </button>
            <button type="button" onclick="runBulkConversion()" class="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="play" class="w-3.5 h-3.5"></i><span>Proses Konversi</span>
            </button>
          `,
          clockFooter: 'Converter Engine Ready',
          card3: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <i data-lucide="binary" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Multi-Delimiter Parsing</p>
                    <p class="text-[10px] text-slate-400">Deteksi Pembatas Otomatis</p>
                  </div>
                </div>
                <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Mendukung Tab, Koma, Titik Koma, Garis Vertikal (Pipe), dan Spasi Rapi.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">Auto-Detect</span>
              <button onclick="document.getElementById('bulkInput')?.focus()" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Tempel Data &rsaquo;</button>
            </div>
          `,
          card4: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <i data-lucide="check-check" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Sanitasi Header</p>
                    <p class="text-[10px] text-slate-400">Pembersihan Otomatis</p>
                  </div>
                </div>
                <span class="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">Clean Header</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Menyingkirkan spasi tak tampak, baris judul kosong, dan simbol rusak.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Filter Baris Kosong</span>
              <button onclick="runBulkConversion()" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">Mulai Filter &rsaquo;</button>
            </div>
          `,
          card5: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    <i data-lucide="file-output" class="w-4 h-4"></i>
                  </div>
                  <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Ekspor Spreadsheet</p>
                </div>
                <span class="text-xs font-extrabold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-lg">XLSX</span>
              </div>
              <div class="mt-2 space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Output Standar:</span>
                  <code class="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Tabel Matriks</code>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Kompatibilitas:</span>
                  <span class="font-semibold text-purple-600 dark:text-purple-400">Excel / Sheets</span>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Siap Tempel</span>
              <button onclick="copySafeExcelColumn()" class="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">Salin Tabel &rsaquo;</button>
            </div>
          `,
          gaugeTitle: 'Akurasi Normalisasi Data',
          gaugeSubtitle: 'Kesesuaian Format Output',
          percent: '100%',
          label: 'Terpetakan',
          arcOffset: 62.8,
          legend: `
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span class="font-medium">Baris Data Terbaca</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Akurat</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span class="font-medium">Kolom Teridentifikasi</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Sesuai</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span class="font-medium">Normalisasi Teks</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Rapi</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span class="font-medium">Integritas Nilai</span></span>
              <span class="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">100% Aman</span>
            </div>
          `,
          gaugeActions: `
            <button onclick="copySafeExcelColumn()" class="flex-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Salin Hasil</span>
            </button>
            <button onclick="copySafeExcelColumn()" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="check" class="w-3.5 h-3.5"></i><span>Validasi Hasil</span>
            </button>
          `
        },
        katalog: {
          mobileBadge: 'Studio Katalog Biaya',
          badge: 'KATALOG DATABASE TARIF &bull; YTPAI',
          subBadge: '<i data-lucide="folder-kanban" class="w-4 h-4 text-amber-400"></i><span class="font-medium">31 Komponen Biaya</span>',
          title: 'Studio Katalog Tarif & Master Biaya',
          desc: 'Katalog referensi lengkap tarif pendidikan 31 kode transaksi: SPP Bulanan, Biaya Awal Tahun, Akhir Tahun & Asrama seluruh unit.',
          actions: `
            <button type="button" onclick="document.getElementById('catalogSearchInput')?.focus()" class="bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="search" class="w-4 h-4"></i><span>Cari Kode / Nama Tarif</span>
            </button>
            <button type="button" onclick="copyKatalogTable()" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="copy" class="w-4 h-4 text-amber-400"></i><span>Salin Tabel Tarif</span>
            </button>
            <button type="button" onclick="window.print()" class="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i><span>Cetak Katalog</span>
            </button>
          `,
          clockFooter: '31 Kode Aktif',
          card3: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <i data-lucide="tag" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">31 Kode Transaksi</p>
                    <p class="text-[10px] text-slate-400">Standarisasi Pos Kas</p>
                  </div>
                </div>
                <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Kode 01 s.d. 31 mencakup seluruh pos penerimaan kas santri terstandar.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">Resmi YTPAI</span>
              <button onclick="document.getElementById('catalogSearchInput')?.focus()" class="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer">Lihat Kode &rsaquo;</button>
            </div>
          `,
          card4: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <i data-lucide="layers" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">5 Unit Lembaga</p>
                    <p class="text-[10px] text-slate-400">Struktur Biaya Bertingkat</p>
                  </div>
                </div>
                <span class="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">5 Unit</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Terbagi atas unit MI, MTs, SMP, MA, dan SMA Raudlatul Muta'allimin.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Filter per Jenjang</span>
              <button onclick="filterCatalogClass('all')" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Semua Unit &rsaquo;</button>
            </div>
          `,
          card5: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <i data-lucide="shield-check" class="w-4 h-4"></i>
                  </div>
                  <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Validitas Nominal</p>
                </div>
                <span class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg">Sinkron</span>
              </div>
              <div class="mt-2 space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Integrasi BRIVA:</span>
                  <code class="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Tersambung</code>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Total Komponen:</span>
                  <span class="font-semibold text-emerald-600 dark:text-emerald-400">31 Tarif Aktif</span>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Siap Panggil</span>
              <button onclick="switchTab('panggil')" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">Buka Panggil &rsaquo;</button>
            </div>
          `,
          gaugeTitle: 'Kelengkapan Master Tarif',
          gaugeSubtitle: 'Integritas Data Master Biaya',
          percent: '100%',
          label: 'Sinkron',
          arcOffset: 62.8,
          legend: `
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span class="font-medium">Tarif SPP Bulanan</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">12 Bulan</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span class="font-medium">Tarif Awal Tahun</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Lengkap</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span class="font-medium">Tarif Akhir Tahun</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Lengkap</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span class="font-medium">Asrama & Mukim</span></span>
              <span class="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">Terdaftar</span>
            </div>
          `,
          gaugeActions: `
            <button onclick="copyKatalogTable()" class="flex-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Salin Tabel</span>
            </button>
            <button onclick="window.print()" class="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i><span>Cetak Katalog</span>
            </button>
          `
        },
        pembersih: {
          mobileBadge: 'Studio Pembersih & SUM',
          badge: 'DATA CLEANSER & SUM SUITE',
          subBadge: '<i data-lucide="sparkles" class="w-4 h-4 text-cyan-400"></i><span class="font-medium">Auto Clean & SUM</span>',
          title: 'Studio Pembersih Spasi & Formula SUM Otomatis',
          desc: 'Bersihkan karakter non-breaking space (NBSP), spasi berlebih tak kasat mata, dan hitung total akumulasi angka otomatis.',
          actions: `
            <button type="button" onclick="document.getElementById('cleanInput')?.focus()" class="bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="clipboard" class="w-4 h-4"></i><span>Tempel Teks / Angka</span>
            </button>
            <button type="button" onclick="processCleanTool()" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="sparkles" class="w-4 h-4 text-cyan-400"></i><span>Bersihkan Spasi</span>
            </button>
            <button type="button" onclick="copyCleanResult()" class="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Salin Hasil</span>
            </button>
          `,
          clockFooter: 'Cleanser Ready',
          card3: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                    <i data-lucide="scissors" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Sanitasi NBSP & Unicode</p>
                    <p class="text-[10px] text-slate-400">Pembersih Spasi Halus</p>
                  </div>
                </div>
                <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Menghilangkan kode &nbsp; dan karakter spasi tersembunyi yang membuat rumus Excel #VALUE!.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded-full">Anti Error #VALUE</span>
              <button onclick="processCleanTool()" class="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer">Bersihkan &rsaquo;</button>
            </div>
          `,
          card4: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <i data-lucide="calculator" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Akumulasi Total SUM</p>
                    <p class="text-[10px] text-slate-400">Penjumlahan Instan</p>
                  </div>
                </div>
                <span class="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">Auto SUM</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Otomatis mengekstrak nilai numerik dari teks baris dan menjumlahkannya.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Total Akurat</span>
              <button onclick="processCleanTool()" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">Hitung Total &rsaquo;</button>
            </div>
          `,
          card5: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                  </div>
                  <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Format Standar Rupiah</p>
                </div>
                <span class="text-xs font-extrabold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-lg">IDR</span>
              </div>
              <div class="mt-2 space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Pemisah Ribuan:</span>
                  <code class="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Titik (.)</code>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Format Angka:</span>
                  <span class="font-semibold text-purple-600 dark:text-purple-400">Bersih & Standar</span>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Format Rapi</span>
              <button onclick="copyCleanResult()" class="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">Salin Bersih &rsaquo;</button>
            </div>
          `,
          gaugeTitle: 'Efektivitas Pembersihan',
          gaugeSubtitle: 'Kualitas Sanitasi Data',
          percent: '100%',
          label: 'Bersih',
          arcOffset: 62.8,
          legend: `
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-cyan-500"></span><span class="font-medium">Karakter Tersembunyi</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">0 Error</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span class="font-medium">Spasi Ganda & Tab</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Dibersihkan</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span class="font-medium">Ekstraksi Numerik</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Akurat</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span class="font-medium">Total Penjumlahan</span></span>
              <span class="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">Terverifikasi</span>
            </div>
          `,
          gaugeActions: `
            <button onclick="copyCleanResult()" class="flex-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Salin Hasil</span>
            </button>
            <button onclick="clearCleanTool()" class="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i><span>Reset Teks</span>
            </button>
          `
        },
        panduan: {
          mobileBadge: 'Studio Panduan Excel',
          badge: 'EXCEL KNOWLEDGE BASE &bull; FORMULA GUIDE',
          subBadge: '<i data-lucide="book-open-check" class="w-4 h-4 text-rose-400"></i><span class="font-medium">Rumus & Shortcut</span>',
          title: 'Pusat Panduan Formula & Shortcut Excel Terpadu',
          desc: 'Koleksi rumus esensial bendahara (VLOOKUP, TEXT, CONCAT, TRIM) dan tombol pintas keyboard untuk percepatan entri data.',
          actions: `
            <button type="button" onclick="document.getElementById('searchPanduan')?.focus()" class="bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="search" class="w-4 h-4"></i><span>Cari Rumus / Topik</span>
            </button>
            <button type="button" onclick="copyExcelTemplateFormula()" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="copy" class="w-4 h-4 text-rose-400"></i><span>Salin Rumus BRIVA</span>
            </button>
            <button type="button" onclick="window.print()" class="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i><span>Cetak Panduan</span>
            </button>
          `,
          clockFooter: 'Panduan Standar',
          card3: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                    <i data-lucide="function-square" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Rumus Pembuatan BRIVA</p>
                    <p class="text-[10px] text-slate-400">TEXT & CONCATENATE</p>
                  </div>
                </div>
                <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Contoh: ="77992"&TEXT(A2,"000000") menghasilkan nomor BRIVA 11 digit resmi.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full">Rumus Resmi</span>
              <button onclick="copyExcelTemplateFormula()" class="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer">Salin Rumus &rsaquo;</button>
            </div>
          `,
          card4: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <i data-lucide="keyboard" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Shortcut Produktivitas</p>
                    <p class="text-[10px] text-slate-400">Pintas Keyboard</p>
                  </div>
                </div>
                <span class="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">Pintas</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Ctrl+D (Duplikat bawah), Ctrl+Shift+L (Filter), F4 (Kunci Absolut $).</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">+300% Kecepatan</span>
              <button onclick="document.getElementById('searchPanduan')?.focus()" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Lihat Shortcut &rsaquo;</button>
            </div>
          `,
          card5: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                  </div>
                  <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Solusi Awalan '0 Hilang</p>
                </div>
                <span class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg">Tips</span>
              </div>
              <div class="mt-2 space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Metode Petik:</span>
                  <code class="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">'08123456</code>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Format Cell:</span>
                  <span class="font-semibold text-emerald-600 dark:text-emerald-400">Text (@)</span>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Pasti Berhasil</span>
              <button onclick="document.getElementById('searchPanduan')?.focus()" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">Buka Panduan &rsaquo;</button>
            </div>
          `,
          gaugeTitle: 'Cakupan Referensi Excel',
          gaugeSubtitle: 'Modul & Studi Kasus Kasir',
          percent: '100%',
          label: 'Lengkap',
          arcOffset: 62.8,
          legend: `
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span><span class="font-medium">Rumus Dasar Bendahara</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Tersedia</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span class="font-medium">Shortcut Keyboard</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">20+ Pintasan</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span class="font-medium">Studi Kasus BRIVA</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Lengkap</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span class="font-medium">Template Praktik</span></span>
              <span class="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">Siap Pakai</span>
            </div>
          `,
          gaugeActions: `
            <button onclick="copyExcelTemplateFormula()" class="flex-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Salin Rumus</span>
            </button>
            <button onclick="window.print()" class="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i><span>Cetak Panduan</span>
            </button>
          `
        },
        wa: {
          mobileBadge: 'Studio Broadcast WA',
          badge: 'WHATSAPP BROADCAST SUITE &bull; WALI SANTRI',
          subBadge: '<i data-lucide="message-square-text" class="w-4 h-4 text-emerald-400"></i><span class="font-medium">Format Personal</span>',
          title: 'Studio Template Broadcast WhatsApp Santri',
          desc: 'Generator pesan WhatsApp instan dengan variabel otomatis (Nama Santri, Tagihan, BRIVA, Jatuh Tempo) untuk komunikasi wali.',
          actions: `
            <button type="button" onclick="selectWaTemplate('syahriyah')" class="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="message-square" class="w-4 h-4"></i><span>Template Tagihan SPP</span>
            </button>
            <button type="button" onclick="selectWaTemplate('santri_baru')" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i><span>Template Santri Baru</span>
            </button>
            <button type="button" onclick="copyWaMessage()" class="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs px-3.5 py-2.5 rounded-2xl border border-white/10 flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Salin Draft Pesan</span>
            </button>
          `,
          clockFooter: 'Broadcast Ready',
          card3: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <i data-lucide="variable" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Variabel Dinamis</p>
                    <p class="text-[10px] text-slate-400">Otomatisasi Nama & Tagihan</p>
                  </div>
                </div>
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Mendukung variabel {nama}, {kelas}, {nominal}, {briva}, dan {jatuh_tempo}.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">6 Variabel</span>
              <button onclick="selectWaTemplate('syahriyah')" class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">Pilih Tagihan &rsaquo;</button>
            </div>
          `,
          card4: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <i data-lucide="smartphone" class="w-4 h-4"></i>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Direct Send API</p>
                    <p class="text-[10px] text-slate-400">Kirim Tanpa Simpan Nomor</p>
                  </div>
                </div>
                <span class="text-[10.5px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">WA Web</span>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">Tautan wa.me/62... siap digunakan untuk membuka chat WhatsApp resmi secara cepat.</p>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">1-Klik Kirim</span>
              <button onclick="openBulkWhatsApp()" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Kirim Pesan &rsaquo;</button>
            </div>
          `,
          card5: `
            <div>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                  </div>
                  <p class="text-xs font-bold text-slate-900 dark:text-white leading-tight">Format Ramah Wali</p>
                </div>
                <span class="text-xs font-extrabold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-lg">Santun</span>
              </div>
              <div class="mt-2 space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Format Salam:</span>
                  <code class="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">Islami Resmi</code>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Gaya Bahasa:</span>
                  <span class="font-semibold text-purple-600 dark:text-purple-400">Transparan & Jelas</span>
                </div>
              </div>
            </div>
            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-slate-400">Teruji Ramah</span>
              <button onclick="copyWaMessage()" class="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">Salin Pesan &rsaquo;</button>
            </div>
          `,
          gaugeTitle: 'Kesiapan Broadcast WA',
          gaugeSubtitle: 'Kelengkapan Variabel Pesan',
          percent: '100%',
          label: 'Siap Kirim',
          arcOffset: 62.8,
          legend: `
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span class="font-medium">Salam & Identitas Santri</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Lengkap</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span class="font-medium">Rincian Pos Tagihan</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">Transparan</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span class="font-medium">Nomor Rekening BRIVA</span></span>
              <span class="font-extrabold text-slate-800 dark:text-slate-100 tabular-nums">77992</span>
            </div>
            <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span class="font-medium">Konfirmasi Otomatis</span></span>
              <span class="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">Siap Kirim</span>
            </div>
          `,
          gaugeActions: `
            <button onclick="copyWaMessage()" class="flex-1 bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i><span>Salin Draft</span>
            </button>
            <button onclick="openBulkWhatsApp()" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i><span>Buka WA Web</span>
            </button>
          `
        }
      };

      const cfg = bentoConfigs[tabId] || bentoConfigs['akun'];

      if (mobileHubBadge) mobileHubBadge.textContent = cfg.mobileBadge;
      if (heroBadgeText) heroBadgeText.innerHTML = cfg.badge;
      if (heroSubBadgeText && heroSubBadgeText.parentElement) {
        heroSubBadgeText.parentElement.innerHTML = cfg.subBadge;
      }
      if (heroTitle) heroTitle.textContent = cfg.title;
      if (heroDesc) heroDesc.innerHTML = cfg.desc;
      if (heroActions) heroActions.innerHTML = cfg.actions;
      if (clockFooterText) clockFooterText.textContent = cfg.clockFooter;
      if (card3) card3.innerHTML = cfg.card3;
      if (card4) card4.innerHTML = cfg.card4;
      if (card5) card5.innerHTML = cfg.card5;
      if (gaugeTitle) gaugeTitle.textContent = cfg.gaugeTitle;
      if (gaugeSubtitle) gaugeSubtitle.textContent = cfg.gaugeSubtitle;
      if (gaugePercentText) gaugePercentText.textContent = cfg.percent;
      if (gaugePercentLabel) gaugePercentLabel.textContent = cfg.label;
      if (gaugeArc) gaugeArc.setAttribute('stroke-dashoffset', cfg.arcOffset);
      if (gaugeLegend) gaugeLegend.innerHTML = cfg.legend;
      if (gaugeActions) gaugeActions.innerHTML = cfg.gaugeActions;

      // Update Gauge Card Icon dynamically
      const gaugeIcon = document.getElementById('bentoGaugeIcon');
      if (gaugeIcon) {
        if (tabId === 'humas') {
          gaugeIcon.className = "w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-200/50 dark:border-rose-500/30 flex items-center justify-center font-bold shadow-xs";
          gaugeIcon.innerHTML = '<i data-lucide="megaphone" class="w-4 h-4"></i>';
        } else if (tabId === 'tahfidz') {
          gaugeIcon.className = "w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-500/30 flex items-center justify-center font-bold shadow-xs";
          gaugeIcon.innerHTML = '<i data-lucide="book-open" class="w-4 h-4"></i>';
        } else if (tabId === 'akun') {
          gaugeIcon.className = "w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-500/30 flex items-center justify-center font-bold shadow-xs";
          gaugeIcon.innerHTML = '<i data-lucide="user-check" class="w-4 h-4"></i>';
        } else if (tabId === 'briva') {
          gaugeIcon.className = "w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-300 border border-orange-200/50 dark:border-orange-500/30 flex items-center justify-center font-bold shadow-xs";
          gaugeIcon.innerHTML = '<i data-lucide="credit-card" class="w-4 h-4"></i>';
        } else {
          gaugeIcon.className = "w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-300 border border-orange-200/50 dark:border-orange-500/30 flex items-center justify-center font-bold shadow-xs";
          gaugeIcon.innerHTML = '<i data-lucide="gauge" class="w-4 h-4"></i>';
        }
      }

      // Re-render Lucide icons safely
      safeCreateIcons();
    }

    // Helper functions for Bento actions
    function copyExcelTemplateFormula() {
      const formula = '="77992"&TEXT(A2,"000000")';
      navigator.clipboard.writeText(formula).then(() => {
      const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const day = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const monthShort = monthsShort[now.getMonth()];
      const year = now.getFullYear();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      
      const dateEl = document.getElementById('liveHeaderDate');
      const clockEl = document.getElementById('liveHeaderClock');
      if (dateEl) dateEl.textContent = `${day}, ${date} ${monthShort} ${year}`;
      if (clockEl) clockEl.textContent = `${hh}.${mm} WIB`;

      const bentoClock = document.getElementById('bentoClockTime');
      const bentoDate = document.getElementById('bentoClockDate');
      if (bentoClock) bentoClock.innerHTML = `${hh}:${mm}:${ss} <span class="text-xs text-orange-600 dark:text-orange-400 font-bold">WIB</span>`;
      if (bentoDate) bentoDate.textContent = `${day}, ${date} ${month} ${year}`;

      const timelineDate = document.getElementById('projectTimelineDate');
      if (timelineDate) {
        const dd = String(date).padStart(2, '0');
        const mmNum = String(now.getMonth() + 1).padStart(2, '0');
        timelineDate.textContent = `${dd}/${mmNum}/${year}`;
      }
    }

    // Global Keydown Shortcut (Ctrl+K for search)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('globalSearchInput');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    });



    // Standalone Embedded SVG Icon Engine (Guarantees icons appear 100% offline or if CDN is blocked)
    const LUCIDE_FALLBACK_ICONS = {
      'home': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
      'layers': '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
      'layers-3': '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 12.5-9.17 4.16a2 2 0 0 1-1.66 0L2 12.5"/><path d="m22 17.5-9.17 4.16a2 2 0 0 1-1.66 0L2 17.5"/>',
      'bar-chart-2': '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
      'table': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/>',
      'compass': '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
      'receipt': '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M16 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/>',
      'layout-grid': '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
      'sliders': '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/>',
      'sliders-horizontal': '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
      'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
      'search-x': '<path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
      'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
      'user-check': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
      'user-plus': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
      'user-x': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/>',
      'graduation-cap': '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
      'award': '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
      'moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
      'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
      'volume-2': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
      'volume-x': '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/>',
      'copy': '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
      'copy-check': '<path d="m12 15 2 2 4-4"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
      'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
      'refresh-cw': '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
      'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
      'sparkles': '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/>',
      'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
      'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      'calendar': '<rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
      'calendar-check': '<rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/>',
      'calendar-range': '<rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M17 14h-6"/><path d="M13 18H7"/><path d="M7 14h.01"/><path d="M17 18h.01"/>',
      'file-up': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/>',
      'clipboard': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
      'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
      'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
      'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
      'menu': '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
      'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
      'check': '<polyline points="20 6 9 17 4 12"/>',
      'check-circle-2': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
      'badge-check': '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
      'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
      'book-open-check': '<path d="M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z"/><path d="m16 12 2 2 4-4"/><path d="M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2"/>',
      'message-square-text': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7"/><path d="M17 12H7"/>',
      'folder-kanban': '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/>',
      'folder-tree': '<path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.53l-.42-.85a1 1 0 0 0-.9-.62H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M3 5v14a2 2 0 0 0 2 2h7"/><path d="M3 10h9"/>',
      'combine': '<rect width="8" height="8" x="2" y="2" rx="2"/><path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"/><path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"/><path d="M10 18H5c-1.7 0-3-1.3-3-3v-1"/><polyline points="7 21 10 18 7 15"/><rect width="8" height="8" x="14" y="14" rx="2"/>',
      'calculator': '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
      'replace': '<path d="M14 4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2Z"/><path d="m3 7 3 3 3-3"/><path d="M6 10V5a2 2 0 0 1 2-2h4"/><rect width="8" height="8" x="2" y="14" rx="2"/><path d="m21 17-3-3-3 3"/><path d="M18 14v5a2 2 0 0 1-2 2h-4"/>',
      'edit-3': '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
      'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
      'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
      'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
      'hand': '<path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>'
    };

    // Helper pemanggil ikon aman (dengan fallback standalone jika CDN lambat terunduh di Apps Script / offline)
    function safeCreateIcons() {
      try {
        if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function' && lucide.createIcons.toString().length > 30) {

      let ticking = false;
      let lastState = false;

      function onMainScroll() {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const isVisible = container.scrollTop > 250;
            if (btnBackToTop && isVisible !== lastState) {
              lastState = isVisible;
              btnBackToTop.classList.toggle('btn-visible', isVisible);
            }
            ticking = false;
          });
          ticking = true;
        }
      }

      container.addEventListener('scroll', onMainScroll, { passive: true });
    }

    // Scroll to Top Smooth Helper
    function scrollToMainTop() {
      const container = document.getElementById('mainContentContainer');
      if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // --- 14c. DOCK & PILLS DEDICATED WHEEL INTERACTIONS ---
    // 1. Rolling mouse wheel over floating dock switches menu tabs smoothly
    function initDockWheelInteraction() {
      const dock = document.getElementById('floatingDockNav');
      if (!dock) return;

      let lastDockScroll = 0;
      dock.addEventListener('wheel', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const now = Date.now();
        if (now - lastDockScroll < 180) return; // Debounce 180ms
        lastDockScroll = now;

        const tabs = ['akun', 'konverter', 'briva', 'panggil', 'katalog', 'pembersih', 'panduan', 'wa'];
        const curIdx = tabs.indexOf(activeTab);
        if (e.deltaY > 0) {
          // Scroll Down -> Next Tab
          const nextTab = tabs[(curIdx + 1) % tabs.length];
          switchTab(nextTab);
          soundClick();
        } else if (e.deltaY < 0) {
          // Scroll Up -> Previous Tab
          const prevTab = tabs[(curIdx - 1 + tabs.length) % tabs.length];
          switchTab(prevTab);
          soundClick();
        }
      }, { passive: false });
    }

    // 2. Rolling mouse wheel over category room pills scrolls horizontally
    function initRoomPillsWheelInteraction() {
      const pills = document.getElementById('roomPillContainer');
      if (!pills) return;

      pills.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          pills.scrollLeft += e.deltaY;
        }
      }, { passive: false });
    }

    // 3. Native & Universal Browser Scroll Engine (Ultra-Responsive, Smooth, Keyboard & Wheel Assisted)
    function initUniversalWheelScroll() {
      const container = document.getElementById('mainContentContainer');
      if (!container) return;

      // 1. Wheel Listener Universal pada window agar pergerakan mouse wheel selalu menggulirkan mainContentContainer
      window.addEventListener('wheel', function(e) {
        // Modal popup yang sedang aktif
        const activeModal = document.querySelector('.fixed.inset-0:not(.hidden)');
        if (activeModal && activeModal.contains(e.target)) return;

        // Jangan interupsi textarea atau select khusus
        if (e.target.closest('textarea, select')) return;

        // Jika user sedang scroll box internal yang memiliki overflow-y (misal preview caption box)
        const innerScroll = e.target.closest('.overflow-y-auto:not(#mainContentContainer), [class*="overflow-y-auto"]:not(#mainContentContainer)');
        if (innerScroll && innerScroll.scrollHeight > innerScroll.clientHeight) {
          const atTop = innerScroll.scrollTop <= 0 && e.deltaY < 0;
          const atBottom = (innerScroll.scrollTop + innerScroll.clientHeight >= innerScroll.scrollHeight - 1) && e.deltaY > 0;
          if (!atTop && !atBottom) return;
        }

        // Gulirkan mainContentContainer secara konsisten
        if (Math.abs(e.deltaY) > 0) {
          container.scrollTop += e.deltaY;
        }
      }, { passive: true });

      // 2. Keyboard Navigation Assist (Arrow Keys, PageUp, PageDown, Space, Home, End)
      window.addEventListener('keydown', function(e) {
        if (e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
        const activeModal = document.querySelector('.fixed.inset-0:not(.hidden)');
        if (activeModal && !activeModal.classList.contains('hidden')) return;

        if (e.key === 'ArrowDown') {
          container.scrollBy({ top: 90, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp') {
          container.scrollBy({ top: -90, behavior: 'smooth' });
        } else if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
          e.preventDefault();
          container.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
        } else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
          e.preventDefault();
          container.scrollBy({ top: -window.innerHeight * 0.75, behavior: 'smooth' });
        } else if (e.key === 'Home') {
          container.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (e.key === 'End') {
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }
      });
    }

    // --- 14b. MOBILE OPTIMIZATIONS (BENTO COLLAPSE & TOUCH GESTURES) ---
    function toggleMobileBento(forceState) {
      const bentoGrid = document.getElementById('bentoContentGrid');
      const icon = document.getElementById('iconToggleMobileBento');
      const label = document.getElementById('labelToggleMobileBento');
      if (!bentoGrid) return;

      const isHidden = bentoGrid.classList.contains('hidden');
      const shouldShow = typeof forceState === 'boolean' ? forceState : isHidden;

      if (shouldShow) {
        bentoGrid.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
        if (label) label.textContent = 'Tutup Hub';
      } else {
        bentoGrid.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
        if (label) label.textContent = 'Buka Hub (6 Widget)';
      }
      if (window.lucide) lucide.createIcons();
    }

    function initMobileSwipeGestures() {
      let touchStartX = 0;
      let touchStartY = 0;
      let isEdgeSwipe = false;

      document.addEventListener('touchstart', function(e) {
        if (!e.touches || e.touches.length !== 1) return;
        // Jangan picu gestur jika user sedang menyentuh input teks, textarea, tombol, atau tabel yang sedang digeser
        if (e.target && e.target.closest && e.target.closest('input, select, textarea, button, .drag-scroll-container, .overflow-x-auto')) {
          isEdgeSwipe = false;
          return;
        }
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        // Deteksi usap tepi kiri (25px dari kiri)
        isEdgeSwipe = touchStartX < 25;
      }, { passive: true });

      document.addEventListener('touchend', function(e) {
        if (!e.changedTouches || e.changedTouches.length !== 1) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Gestur horizontal harus lebih dominan daripada vertikal
        if (Math.abs(diffY) > 50) return;

        // Usap ke kanan dari tepi kiri -> Buka Drawer
        if (isEdgeSwipe && diffX > 70 && !isDrawerOpen) {
          toggleMobileDrawer(true);
        }
        // Usap ke kiri saat drawer terbuka -> Tutup Drawer
        else if (isDrawerOpen && diffX < -60) {
          toggleMobileDrawer(false);
        }
      }, { passive: true });
    }

    // ==============================================================
    // 14.5 TAHFIDZ CAPTION GENERATOR & REKAP DATA ENGINE (FTH STUDIO)
    // ==============================================================


    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPwaPrompt = e;
      const installBtn = document.getElementById('pwaInstallBtn');
      if (installBtn) installBtn.classList.remove('hidden');
    });

    window.addEventListener('appinstalled', () => {
      deferredPwaPrompt = null;
      const installBtn = document.getElementById('pwaInstallBtn');
      if (installBtn) installBtn.classList.add('hidden');
      if (typeof showToast === 'function') {
        showToast('Aplikasi Terpasang!', 'Partner Fatih YTPAI telah berhasil dipasang di layar utama perangkat Anda.');
      }
    });

    function triggerPwaInstall() {
      if (deferredPwaPrompt) {
        deferredPwaPrompt.prompt();
        deferredPwaPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            if (typeof showToast === 'function') {
              showToast('Memasang Aplikasi...', 'Partner Fatih sedang ditambahkan ke layar utama perangkat Anda.');
            }
          }
          deferredPwaPrompt = null;
        });
      } else {
        if (typeof showToast === 'function') {
          showToast('Pasang Aplikasi', 'Tekan menu browser (titik tiga) lalu pilih "Tambahkan ke Layar Utama" / "Install App".');
        } else {
          alert('Untuk memasang di HP atau desktop, buka menu browser (titik tiga) lalu pilih "Tambahkan ke Layar Utama" / "Install App".');
        }
      }
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => {
          console.log('PWA ServiceWorker active:', reg.scope);
        }).catch(err => {
          console.warn('PWA ServiceWorker note (safe):', err);
        });
      });
    }


    // ==========================================================================
    // 14. MODUL STUDIO HUMAS & SOSMED: KALENDER TAHUNAN & RADAR PENGINGAT H-7
    // ==========================================================================

      // Urutkan dari yang paling dekat (H-0, H-1, dst)
      h7Items.sort((a, b) => a.diff - b.diff);

      let sentCount = 0;
      for (const { item, diff } of h7Items) {
        const notifKey = `humas_notif_sent_${item.id}_${todayStr}`;
        const alreadySentToday = localStorage.getItem(notifKey);

        if (alreadySentToday && !forceShow) {
          continue; // Lewati jika hari ini sudah dikirim
        }

        let prefix = '';
        if (diff === 0) prefix = '🚨 [HARI INI]';
        else if (diff === 1) prefix = '⚡ [BESOK H-1]';
        else if (diff <= 3) prefix = `⏳ [H-${diff} SEGERA]`;
        else prefix = `📅 [H-${diff} RADAR ACARA]`;

        const title = `${prefix} ${item.uraian}`;
        const statusPamfletText = (item.statusPamflet === 'selesai' || item.statusPamflet === 'siap')
          ? 'Pamflet: Sudah Publish ✅'
          : 'Pamflet: BUTUH DIBUAT ⚠️ Segera publikasikan!';

        const body = `🗓️ ${item.tgl} ${item.bulan} ${item.tahun} • ${statusPamfletText}\n👤 PJ: ${item.pj || '-'}`;

        await sendNativeNotification(title, body, `radar-event-${item.id}`, './index.html');
        localStorage.setItem(notifKey, 'sent_' + new Date().toISOString());
        sentCount++;

        // Jika forceShow (manual test), kirim 1 acara terdekat
        if (forceShow && sentCount >= 1) break;
      }

      return sentCount > 0;
    }

    window.toggleHumasMobileNotification = toggleHumasMobileNotification;
    window.checkHumasH7MobileNotifications = checkHumasH7MobileNotifications;

    // Periksa saat user membuka kembali layar HP atau kembali ke tab
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        try { checkHumasH7MobileNotifications(); } catch (e) {}
      }
    });

    // Pengecekan otomatis setiap 30 menit
    try {
      setInterval(() => {
        checkHumasH7MobileNotifications();
      }, 30 * 60 * 1000);
    } catch (e) {}


    // --- 14. MODAL PORTAL CONTROLLER (MEMINDAHKAN MODAL TAB KE ROOT BODY) ---
    function portalAllModalsToBody() {
      try {
        const modals = document.querySelectorAll('[id^="modal"], .modal-portal, [class*="fixed inset-0"]');
        modals.forEach(m => {
          if (m && m.parentElement && m.parentElement !== document.body && m.classList.contains('fixed')) {
            document.body.appendChild(m);
          }
        });
      } catch (e) {
        console.warn('Portal modals error:', e);
      }
    }
    window.portalAllModalsToBody = portalAllModalsToBody;

    // --- 15. INITIALIZATION ON LOAD (DENGAN ISOLASI TRY-CATCH PER MODUL) ---
    function initializeApp() {
      // Pastikan iframe window tidak tergeser ke bawah (mencegah bagian atas terpotong di Apps Script)
      try {
        if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
        const mc = document.getElementById('mainCanvas');
        if (mc) mc.scrollTop = 0;
      } catch (e) {}

      try { portalAllModalsToBody(); } catch (e) { console.warn('Modal portal init error:', e); }
      try { applySavedTheme(); } catch (e) { console.warn('Theme init error:', e); }
      try { safeCreateIcons(); } catch (e) { console.warn('Icon init error:', e); }
      try { initScrollInteraction(); } catch (e) { console.warn('Scroll interaction init error:', e); }
      try { initDockWheelInteraction(); } catch (e) { console.warn('Dock wheel error:', e); }
      try { initRoomPillsWheelInteraction(); } catch (e) { console.warn('Room pills wheel error:', e); }
      try { initUniversalWheelScroll(); } catch (e) { console.warn('Universal wheel scroll error:', e); }
      try { initMobileSwipeGestures(); } catch (e) { console.warn('Mobile swipe error:', e); }
      try { calculateSingleReceipt(); } catch (e) { console.warn('Receipt init error:', e); }
      try { runAccountGenerator(); } catch (e) { console.warn('Account init error:', e); }
      try { renderBrivaMonthPills(); } catch (e) { console.warn('Pills init error:', e); }
      try { runBrivaGenerator(); } catch (e) { console.warn('BRIVA init error:', e); }
      const urlParams = new URLSearchParams(window.location.search);
      const initialTab = urlParams.get('tab') || 'humas';
      try { switchTab(initialTab); } catch (e) { console.warn('Tab init error:', e); }
      if (urlParams.get('sample') === '1') {
        try { loadPpdbSampleData(); } catch(e) {}
      }
      const initialSubtab = urlParams.get('subtab');
      if (initialSubtab && typeof switchPpdbSubtab === 'function') {
        try { switchPpdbSubtab(initialSubtab); } catch(e) {}
      }
      try { initTahfidzModule(); } catch (e) { console.warn('Tahfidz init error:', e); }
      try { initHumasModule(); } catch (e) { console.warn('Humas init error:', e); }
      try { updateHumasNotifButtonUI(); } catch (e) { console.warn('Notif UI init error:', e); }
      try { checkHumasH7MobileNotifications(); } catch (e) { console.warn('Notif check error:', e); }
      try { renderPpdbAll(); } catch (e) { console.warn('PPDB init error:', e); }
      try { togglePpdbViewMode(window.innerWidth < 640 ? 'cards' : 'table'); } catch (e) { console.warn('PPDB view mode error:', e); }
      try { updateLiveClock(); } catch (e) { console.warn('Clock init error:', e); }
      
      try { setInterval(updateLiveClock, 1000); } catch (e) {}

      // Portal modal sekali lagi setelah seluruh DOM sub-tab terinisialisasi
      setTimeout(portalAllModalsToBody, 100);
      setTimeout(portalAllModalsToBody, 500);

      // Retry ikon bertahap khusus lingkungan Google Apps Script iframe
      setTimeout(safeCreateIcons, 250);
      setTimeout(safeCreateIcons, 800);
      setTimeout(safeCreateIcons, 2000);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
      initializeApp();
    }
    window.addEventListener('load', safeCreateIcons);
  </script>
</body>
