// ============================================================================
// MODULE: utils.js
// Utility Functions: Haptics, Toasts, Clipboard, Formatting, Audio & Theme
// ============================================================================
        if (audioCtx.state === 'suspended') {
          audioCtx.resume().catch(() => {});
        }
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {
        // Audio error silently ignored to avoid breaking UI clicks
      }
    }

    function soundSuccess() {
      playTone(587.33, 0.15, 'sine');
    }

    function soundReset() {
      playTone(349.23, 0.18, 'triangle');
    }

    function soundPop() {
      playTone(440, 0.08, 'triangle');
    }

    function soundClick() {
      soundPop();
    }

    const soundToggleEl = document.getElementById('soundToggleBtn');
    if (soundToggleEl) {
      soundToggleEl.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;
        if (isSoundEnabled) {
          soundToggleEl.innerHTML = `<svg id="soundIcon" data-lucide="volume-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-orange-600 dark:text-orange-400 pointer-events-none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
          showToast('Suara Diaktifkan', 'Umpan balik audio sintetis menyala.');
          soundSuccess();
        } else {
          soundToggleEl.innerHTML = `<svg id="soundIcon" data-lucide="volume-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-slate-400 pointer-events-none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`;
          showToast('Suara Dimatikan', 'Umpan balik audio disenyapkan.');
        }
      });
    }

    // --- 2B. SAFE STORAGE & THEME ENGINE (BEBAS ERROR SANDBOX APPS SCRIPT) ---
    const memoryStorage = {};
    const safeStorage = {
      getItem: function(key) {
        try {
          return localStorage.getItem(key);
        } catch (e) {
          return memoryStorage[key] || null;
        }
      },
      setItem: function(key, val) {
        try {
          localStorage.setItem(key, val);
        } catch (e) {
          memoryStorage[key] = val;
        }
      }
    };

    function toggleTheme() {
      const isDark = document.documentElement.classList.toggle('dark');
      safeStorage.setItem('theme_preference', isDark ? 'dark' : 'light');
      updateThemeUI(isDark);
      try { soundClick(); } catch (e) {}
      try {
        showToast(
          isDark ? 'Tema Malam Aktif \uD83C\uDF19' : 'Tema Siang Aktif \u2600\uFE0F',
          isDark ? 'Antarmuka beralih ke tema malam elegan (Obsidian Dark).' : 'Antarmuka beralih ke tema siang bersih (Ontrack Light).'
        );
      } catch (e) {}
    }

    function updateThemeUI(isDark) {
      const btn = document.getElementById('themeToggleBtn');
      if (btn) {
        if (isDark) {
          btn.title = 'Beralih ke Tema Siang (Light Mode)';
          btn.classList.add('bg-slate-800', 'border-slate-700', 'hover:bg-slate-700');
          btn.classList.remove('bg-slate-100/90', 'border-slate-200/60', 'hover:bg-amber-50');
          btn.innerHTML = `<svg id="themeIcon" data-lucide="sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 rotate-180 transition-transform duration-300 pointer-events-none"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
        } else {
          btn.title = 'Beralih ke Tema Malam (Dark Mode)';
          btn.classList.remove('bg-slate-800', 'border-slate-700', 'hover:bg-slate-700');
          btn.classList.add('bg-slate-100/90', 'border-slate-200/60', 'hover:bg-amber-50');
          btn.innerHTML = `<svg id="themeIcon" data-lucide="moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 rotate-0 transition-transform duration-300 pointer-events-none"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
        }
      }
    }

    function applySavedTheme() {
      let isDark = false;
      try {
        const saved = safeStorage.getItem('theme_preference');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (saved === 'dark') {
          isDark = true;
        } else if (saved === 'light') {
          isDark = false;
        } else {
          isDark = Boolean(prefersDark);
        }
      } catch (e) {
        isDark = document.documentElement.classList.contains('dark');
      }

      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      updateThemeUI(isDark);
    }

    // --- 3. ULTRA-ROBUST CLIPBOARD ENGINE ---
    async function copyToClipboard(text, successTitle = 'Berhasil Disalin!', successMsg = 'Teks telah disalin ke clipboard.') {
      let copied = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch (err) {
          console.warn('navigator.clipboard fallback to execCommand:', err);
        }
      }

      if (!copied) {
        try {
          const helper = document.getElementById('hiddenClipboardHelper');
          helper.value = text;
          helper.removeAttribute('aria-hidden');
          helper.select();
          helper.setSelectionRange(0, 999999);
          copied = document.execCommand('copy');
          helper.setAttribute('aria-hidden', 'true');
        } catch (err) {
          console.error('Fallback execCommand failed:', err);
        }
      }

      if (copied) {
        soundSuccess();
        showToast(successTitle, successMsg);
      } else {
        showToast('Gagal Menyalin', 'Silakan pilih teks secara manual.');
      }
      return copied;
    }

    // --- 4. TOAST NOTIFICATION UTILITY ---
    let toastTimer = null;
    function showToast(title, message, isError = false) {
      const toast = document.getElementById('toastNotification');
      const toastTitle = document.getElementById('toastTitle');
      const toastMsg = document.getElementById('toastMessage');
      const iconWrapper = document.getElementById('toastIconWrapper');

      toastTitle.textContent = title;
      toastMsg.textContent = message;

      if (isError) {
        iconWrapper.className = 'w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0';
        iconWrapper.innerHTML = '<i data-lucide="alert-circle" class="w-4 h-4"></i>';
      } else {
        iconWrapper.className = 'w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0';
        iconWrapper.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
      }
      lucide.createIcons();

      toast.classList.remove('translate-y-20', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 2500);
    }

    // --- 5. TAB SWITCHING LOGIC (REFERENCE BENTO WORKSPACE) ---
    let activeTab = 'humas';
    function switchTab(tabId) {
      // Auto close mobile drawer on phone when a tab is selected
      if (typeof isDrawerOpen !== 'undefined' && isDrawerOpen) {
    }

    function copySafeExcelColumn() {
      if (currentBulkResults.length === 0) {
        showToast('Data Kosong', 'Tempelkan kolom data terlebih dahulu.', true);
      slider.dataset.dragInitialized = 'true';
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;
      let hasDragged = false;

      slider.addEventListener('mousedown', (e) => {
        // Jangan aktifkan drag jika user mengklik tombol, input teks, link, atau select
        if (e.target.closest('button, input, select, textarea, a')) {
          return;
        }
        isDown = true;
        hasDragged = false;
        slider.classList.add('is-dragging');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener('mouseleave', () => {
        if (isDown) {
          isDown = false;
          slider.classList.remove('is-dragging');
        }
      });

      slider.addEventListener('mouseup', () => {
        if (isDown) {
          isDown = false;
          slider.classList.remove('is-dragging');
        }
      });

      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.6; // Pengali sensitivitas responsif
        if (Math.abs(walk) > 4) {
          hasDragged = true;
        }
        slider.scrollLeft = scrollLeft - walk;
      });

      // Mencegah klik tidak sengaja setelah selesai drag
      slider.addEventListener('click', (e) => {
        if (hasDragged) {
          e.preventDefault();
          e.stopPropagation();
          hasDragged = false;
        }
      }, true);

      // Dukungan scroll roda mouse saat kursor berada di atas tabel
      slider.addEventListener('wheel', (e) => {
        // Jika menekan Shift atau gerakan horizontal, gulirkan tabel secara horizontal
        if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          slider.scrollLeft += (e.deltaX || e.deltaY);
          return;
        }

        // Cek apakah tabel bisa digulir secara vertikal
        const maxScrollY = slider.scrollHeight - slider.clientHeight;
        if (maxScrollY > 2) {
          const atTop = slider.scrollTop <= 0 && e.deltaY < 0;
          const atBottom = slider.scrollTop >= maxScrollY - 2 && e.deltaY > 0;
          if (!atTop && !atBottom) {
            // Biarkan tabel scroll vertikal internalnya
            return;
          }
        }

        // Jika tabel sudah mentok atas/bawah atau tidak punya scroll vertikal, alihkan scroll ke workspace utama
        const main = document.getElementById('mainContentContainer');
        if (main) {
          main.scrollTop += e.deltaY;
        }
      }, { passive: false });
    }

    function renderPpdbGuruTable() {
      const tbody = document.getElementById('tbodyPpdbGuru');
      const podiumEl = document.getElementById('ppdbGuruPodiumWrapper');
        }
      } catch (e) {}
    }

    // Direct clipboard paste helper for mobile phone users
    async function pasteFromClipboardToInput(elementId, callbackName) {
      triggerHaptic(18);
      const el = document.getElementById(elementId);
      if (!el) return;
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          if (text && text.trim()) {
            el.value = text;
            soundPop();
            const lines = text.split('\n').filter(l => l.trim().length > 0).length;
            showToast('Berhasil Ditempel!', `${lines} baris teks berhasil ditempel dari clipboard.`);
            if (callbackName && typeof window[callbackName] === 'function') {
              window[callbackName]();
            }
            return;
          }
        }
      } catch (err) {
        // Fallback jika browser membatasi izin clipboard readText otomatis
      }
      el.focus();
      showToast('Tempel Manual', 'Tekan tahan pada kotak teks lalu pilih Tempel (Paste).');
    }

    // Mobile View Mode State: 'cards' on phones (<640px) or 'table' on desktop
    let brivaViewMode = (typeof window !== 'undefined' && window.innerWidth < 640) ? 'cards' : 'table';

    function setBrivaViewMode(mode) {
      triggerHaptic(10);
      brivaViewMode = mode;
        if (formatMode === 'raw') return String(num);
        return num.toLocaleString('en-US');
      }

      // === MODE SANTRI MANUAL (PER-NOMOR BRIVA) ===
      if (brivaInputMode === 'manual') {
        const lockZero = document.getElementById('brivaLockLeadingZero')?.checked ?? true;
      if (parts.length === 3) {
        // Jika format YYYY-MM-DD
        if (parts[0].length === 4) {
          const y = parts[0];
          const m = parts[1].padStart(2, '0');
          const d = parts[2].padStart(2, '0');
          return `${d}-${m}-${y}`;
        }
        // Jika format D-M-YYYY atau DD-MM-YYYY
        const d = parts[0].padStart(2, '0');
        const m = parts[1].padStart(2, '0');
        const y = parts[2];
        return `${d}-${m}-${y}`;
      }
      return s;
    }

    // EXPORT KE EXCEL (.xlsx) RESMI DENGAN FORMAT TANGGAL HYPHEN (-) & NO REGISTRASI AMAN
    function exportBrivaToExcel() {
      if (!currentBrivaResults || currentBrivaResults.length === 0) {
        showToast('Data Masih Kosong', 'Tempelkan daftar nomor registrasi terlebih dahulu.', true);
        }
      } catch (e) {}

      // Fallback Engine: pastikan semua [data-lucide] memiliki SVG resmi dan tidak pernah kosong
      try {
        const iconNodes = document.querySelectorAll('[data-lucide]');
        iconNodes.forEach(el => {
          if (el.tagName.toLowerCase() === 'svg') return;
          const name = el.getAttribute('data-lucide');
          const path = LUCIDE_FALLBACK_ICONS[name];
          if (path) {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '2');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');
            svg.className.baseVal = el.className || 'w-4 h-4';
            if (el.id) svg.id = el.id;
            svg.setAttribute('data-lucide-rendered', name);
            svg.innerHTML = path;
            el.replaceWith(svg);
          }
        });
      } catch (err) {
        console.warn('Fallback icon render warning:', err);
      }
    }

    // --- 14b. LIGHTWEIGHT SCROLL INTERACTION (0% DOM Overload) ---
    function initScrollInteraction() {
      const container = document.getElementById('mainContentContainer');
      const btnBackToTop = document.getElementById('btnBackToTop');
        const dRef = new Date(refDateStr + 'T00:00:00');
        const diffTime = dEvent.getTime() - dRef.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      } catch (e) {
        return 999;
      }
    }

    function renderHumasMetrics() {
      const refDateStr = humasState.refDate || new Date().toISOString().split('T')[0];

        if (parts.length === 3) {
          const y = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10) - 1;
          const d = parseInt(parts[2], 10);
          if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            const dt = new Date(y, m, d);
            const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            return dayNames[dt.getDay()] || '';
          }
        }
      } catch (e) {}
      return '';
    }

    function getHumasDayRangeLabel(item) {
      if (!item) return '';
      if (item.isKondisional || (item.tgl && String(item.tgl).toLowerCase().includes('kondisi'))) {
        return 'Kondisional';
      }
      const day1 = getIndonesianDayName(item.startDate);
      if (!item.endDate || item.endDate === item.startDate) {
        return day1 || '';
      }
      const day2 = getIndonesianDayName(item.endDate);
      if (day1 && day2 && day1 !== day2) {
        return `${day1} - ${day2}`;
      }
      return day1 || day2 || '';
    }

    function renderHumasH7RadarCards() {
      const container = document.getElementById('humasH7RadarCards');
      const emptyState = document.getElementById('humasH7EmptyState');
