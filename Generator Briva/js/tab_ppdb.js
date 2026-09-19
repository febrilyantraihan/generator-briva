// ============================================================================
// MODULE: tab_ppdb.js
// Tab 2: Generator Akun Ganda PPDB (Ortu & Siswa), Ekspor Excel & WA Sender
// ============================================================================
let currentGeneratedAccounts = [];
let ppdbRawRows = [];
let ppdbProcessedData = { ortu: [], siswa: [], guru: [] };
let currentPpdbViewMode = 'ortu';
let currentPpdbLayoutMode = 'cards';
      let nisPart = '';

      if (raw.includes('\t')) {
        const parts = raw.split('\t').map(p => p.trim()).filter(Boolean);
        namePart = parts[0] || '';
        for (let i = 1; i < parts.length; i++) {
          if (/^\d+$/.test(parts[i])) {
            nisPart = parts[i];
            break;
          }
        }
      } else if (raw.includes(',')) {
        const parts = raw.split(',').map(p => p.trim()).filter(Boolean);
        namePart = parts[0] || '';
        for (let i = 1; i < parts.length; i++) {
          if (/^\d+$/.test(parts[i])) {
            nisPart = parts[i];
            break;
          }
        }
      }

      let clean = namePart
        .replace(/\b(S\.?Pd|S\.?Ag|Lc|M\.?Pd|H\.|Hj\.|Drs\.)\b/gi, '')
        .replace(/['"\u2019\u0060]/g, '')
        .replace(/[^a-zA-Z\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      return { name: clean, nis: nisPart, original: namePart.trim() };
    }

    // 8 Rotating Distinct Color Schemes for Table Items (Easy Visual Identification)
    const ITEM_THEMES = [
      {
        name: 'blue',
        rowBg: 'hover:bg-blue-50/60 bg-blue-50/15',
        borderLeft: 'border-l-[5px] border-blue-500',
        numBadge: 'bg-blue-600 text-white',
        avatar: 'bg-blue-100 text-blue-800 border-blue-300',
        userBadge: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
        emailBadge: 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
      },
      {
        name: 'emerald',
        rowBg: 'hover:bg-emerald-50/60 bg-emerald-50/15',
        borderLeft: 'border-l-[5px] border-emerald-500',
        numBadge: 'bg-emerald-600 text-white',
        avatar: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        userBadge: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200',
        emailBadge: 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200'
      },
      {
        name: 'purple',
        rowBg: 'hover:bg-purple-50/60 bg-purple-50/15',
        borderLeft: 'border-l-[5px] border-purple-500',
        numBadge: 'bg-purple-600 text-white',
        avatar: 'bg-purple-100 text-purple-800 border-purple-300',
        userBadge: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200',
        emailBadge: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200'
      },
      {
        name: 'amber',
        rowBg: 'hover:bg-amber-50/60 bg-amber-50/15',
        borderLeft: 'border-l-[5px] border-amber-500',
        numBadge: 'bg-amber-600 text-white',
        avatar: 'bg-amber-100 text-amber-850 border-amber-300',
        userBadge: 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200',
        emailBadge: 'bg-orange-50 hover:bg-orange-100 text-orange-800 border-orange-200'
      },
      {
        name: 'rose',
        rowBg: 'hover:bg-rose-50/60 bg-rose-50/15',
        borderLeft: 'border-l-[5px] border-rose-500',
        numBadge: 'bg-rose-600 text-white',
        avatar: 'bg-rose-100 text-rose-800 border-rose-300',
        userBadge: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200',
        emailBadge: 'bg-pink-50 hover:bg-pink-100 text-pink-800 border-pink-200'
      },
      {
        name: 'cyan',
        rowBg: 'hover:bg-cyan-50/60 bg-cyan-50/15',
        borderLeft: 'border-l-[5px] border-cyan-500',
        numBadge: 'bg-cyan-600 text-white',
        avatar: 'bg-cyan-100 text-cyan-800 border-cyan-300',
        userBadge: 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border-cyan-200',
        emailBadge: 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200'
      },
      {
        name: 'indigo',
        rowBg: 'hover:bg-indigo-50/60 bg-indigo-50/15',
        borderLeft: 'border-l-[5px] border-indigo-500',
        numBadge: 'bg-indigo-600 text-white',
        avatar: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        userBadge: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200',
        emailBadge: 'bg-violet-50 hover:bg-violet-100 text-violet-800 border-violet-200'
      },
      {
        name: 'orange',
        rowBg: 'hover:bg-orange-50/60 bg-orange-50/15',
        borderLeft: 'border-l-[5px] border-orange-500',
        numBadge: 'bg-orange-600 text-white',
        avatar: 'bg-orange-100 text-orange-800 border-orange-300',
        userBadge: 'bg-orange-50 hover:bg-orange-100 text-orange-800 border-orange-200',
        emailBadge: 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
      }
    ];

    function highlightSearch(text, query) {
      if (!text) return '';
      if (!query) return escapeHtml(text);
      const escapedText = escapeHtml(text);
      const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${safeQuery})`, 'gi');
      return escapedText.replace(regex, '<mark class="bg-yellow-200 text-slate-900 rounded-xs px-0.5 font-bold shadow-2xs">$1</mark>');
    }

    function runAccountGenerator() {
      const input = document.getElementById('accInput').value;
      const style = document.getElementById('accNameStyle').value;
      const sep = document.getElementById('accSeparator').value;
      const numMode = document.getElementById('accNumberMode').value;
      const staticVal = document.getElementById('accStaticValue').value.trim();
      const incStart = parseInt(document.getElementById('accIncStart').value, 10) || 1;
      const incPadding = parseInt(document.getElementById('accIncPadding').value, 10) || 3;
      let domain = document.getElementById('accDomainInput').value.trim().replace(/^@/, '');
      if (!domain) domain = 'ytpai.sch.id';
      const defaultPassword = document.getElementById('accPasswordInput').value.trim();

      const lines = input.split('\n');
      const filteredLines = lines.map(l => l.trim()).filter(l => l.length > 0);
      document.getElementById('accLineCount').textContent = filteredLines.length + ' nama';

      currentGeneratedAccounts = [];

      filteredLines.forEach((line, idx) => {
        const parsed = cleanStudentName(line);
        if (!parsed.name) return;

        const words = parsed.name.toLowerCase().split(' ').filter(Boolean);
        let baseUsername = '';

        if (words.length === 1) {
          baseUsername = words[0];
        } else {
          const first = words[0];
          const last = words[words.length - 1];

          if (style === 'first_last') {
            baseUsername = `${first}${sep}${last}`;
          } else if (style === 'joined') {
            baseUsername = words.join('');
          } else if (style === 'first_only') {
            baseUsername = first;
          } else if (style === 'initial_last') {
            baseUsername = `${first.charAt(0)}${sep}${last}`;
          } else {
            baseUsername = `${first}${sep}${last}`;
          }
        }

        let numberSuffix = '';
        if (numMode === 'static') {
          numberSuffix = staticVal;
        } else if (numMode === 'increment') {
          const currentNum = incStart + idx;
          numberSuffix = String(currentNum).padStart(incPadding, '0');
        } else if (numMode === 'column') {
          numberSuffix = parsed.nis ? parsed.nis : staticVal;
        } else if (numMode === 'random') {
          numberSuffix = String(Math.floor(100 + Math.random() * 900));
        } else if (numMode === 'none') {
          numberSuffix = '';
        }

        const username = baseUsername + numberSuffix;
        const email = `${username}@${domain}`;

        // Assign a distinct item theme for each student row
        const theme = ITEM_THEMES[idx % ITEM_THEMES.length];
        const initial = parsed.name.charAt(0).toUpperCase() || 'S';

        currentGeneratedAccounts.push({
          index: idx + 1,
          originalName: parsed.original || parsed.name,
          username: username,
          email: email,
          password: defaultPassword,
          initial: initial,
          theme: theme
        });
      });

      renderAccountResults();
    }

    function renderAccountResults() {
      const tbody = document.getElementById('accTableBody');
      const summaryBadge = document.getElementById('accSummaryBadge');
      const patternLabel = document.getElementById('statAccPattern');
      const searchQuery = (document.getElementById('accTableSearch')?.value || '').trim().toLowerCase();
      const clearBtn = document.getElementById('clearAccSearchBtn');
      if (clearBtn) {
        if (searchQuery.length > 0) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
      }

      summaryBadge.textContent = `${currentGeneratedAccounts.length} Akun Siap`;

      if (currentGeneratedAccounts.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="py-16 text-center text-slate-400">
              <i data-lucide="user-plus" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
              <p class="font-medium">Belum ada daftar nama</p>
              <p class="text-[11px] text-slate-400">Tempelkan daftar nama siswa di kotak sebelah kiri/atas.</p>
            </td>
          </tr>
        `;
        patternLabel.textContent = 'ahmad.fikri26@ytpai.sch.id';
        document.getElementById('accFilterCount').textContent = '0';
        lucide.createIcons();
        return;
      }

      patternLabel.textContent = currentGeneratedAccounts[0].email;

      let displayedAccounts = currentGeneratedAccounts;
      if (searchQuery.length > 0) {
        displayedAccounts = currentGeneratedAccounts.filter(item => {
          return item.originalName.toLowerCase().includes(searchQuery) ||
                 item.username.toLowerCase().includes(searchQuery) ||
                 item.email.toLowerCase().includes(searchQuery) ||
                 String(item.index).includes(searchQuery) ||
                 (item.password && item.password.toLowerCase().includes(searchQuery));
        });
      }

      document.getElementById('accFilterCount').textContent = `${displayedAccounts.length} dari ${currentGeneratedAccounts.length}`;

      if (displayedAccounts.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="py-12 text-center text-slate-400">
              <i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
              <p class="font-medium text-slate-600">Santri tidak ditemukan</p>
              <p class="text-[11px] text-slate-400">Tidak ada nama atau username yang cocok dengan "${escapeHtml(searchQuery)}".</p>
            </td>
          </tr>
        `;
        lucide.createIcons();
        return;
      }

      let html = '';
      displayedAccounts.forEach(item => {
        html += `
          <tr class="${item.theme.rowBg} ${item.theme.borderLeft} transition-colors border-b border-slate-100">
            <!-- No Pill -->
            <td class="py-3 px-3.5 text-center">
              <span class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold tabular-nums ${item.theme.numBadge} shadow-2xs">
                ${item.index}
              </span>
            </td>
            
            <!-- Nama Asli with Avatar Circle -->
            <td class="py-3 px-3.5 font-bold text-slate-900 text-[13px]">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border ${item.theme.avatar} shadow-2xs shrink-0">
                  ${item.initial}
                </div>
                <span class="truncate max-w-[180px] sm:max-w-none font-bold text-slate-900">${highlightSearch(item.originalName, searchQuery)}</span>
              </div>
            </td>
            
            <!-- Username (Item Color-Coded Tag) -->
            <td class="py-3 px-3.5 text-[13px]">
              <span 
                onclick="copyToClipboard('${item.username}', 'Username Disalin', '${item.username}')" 
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${item.theme.userBadge} font-bold cursor-pointer transition-all active:scale-95 shadow-2xs text-indigo-950" 
                title="Klik untuk salin username"
              >
                <i data-lucide="user" class="w-3.5 h-3.5 text-indigo-600"></i>
                <span>${highlightSearch(item.username, searchQuery)}</span>
              </span>
            </td>
            
            <!-- Email Institusi (Item Color-Coded Tag) -->
            <td class="py-3 px-3.5 text-[13px]">
              <span 
                onclick="copyToClipboard('${item.email}', 'Email Disalin', '${item.email}')" 
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${item.theme.emailBadge} font-semibold cursor-pointer transition-all active:scale-95 shadow-2xs text-sky-950" 
                title="Klik untuk salin email"
              >
                <i data-lucide="mail" class="w-3.5 h-3.5 text-sky-600"></i>
                <span>${highlightSearch(item.email, searchQuery)}</span>
              </span>
            </td>
            
            <!-- Password Default (Distinct Amber Tag) -->
            <td class="py-3 px-3.5 text-[13px]">
              <span 
                onclick="copyToClipboard('${escapeHtml(item.password || '')}', 'Password Disalin', '${escapeHtml(item.password || '')}')" 
                class="ppdb-credential-pwd inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 font-bold text-xs cursor-pointer transition-all active:scale-95 shadow-2xs font-mono select-none" 
                title="Klik untuk salin password"
              >
                <i data-lucide="key" class="w-3.5 h-3.5 text-amber-600"></i>
                <span class="font-mono font-bold">${escapeHtml(item.password || '-')}</span>
              </span>
            </td>
            
            <!-- Aksi Salin Cepat -->
            <td class="py-3 px-3.5 text-center">
              <button 
                onclick="copyToClipboard('${item.email}', 'Email Disalin', '${item.email}')" 
                class="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all active:scale-90" 
                title="Salin Email Lengkap"
              >
                <i data-lucide="copy" class="w-4 h-4"></i>
              </button>
            </td>
          </tr>
        `;
      });

      tbody.innerHTML = html;
      lucide.createIcons();
    }

    function copyUsernamesOnly() {
      if (currentGeneratedAccounts.length === 0) {
        showToast('Data Kosong', 'Tempelkan nama siswa terlebih dahulu.', true);
        return;
      }
      const text = currentGeneratedAccounts.map(i => i.username).join('\r\n');
      copyToClipboard(text, 'Kolom Username Disalin!', `${currentGeneratedAccounts.length} username siap ditempel ke Excel.`);
    }

    function copyEmailsOnly() {
      if (currentGeneratedAccounts.length === 0) {
        showToast('Data Kosong', 'Tempelkan nama siswa terlebih dahulu.', true);
        return;
      }
      const text = currentGeneratedAccounts.map(i => i.email).join('\r\n');
      copyToClipboard(text, 'Kolom Email Disalin!', `${currentGeneratedAccounts.length} email siap ditempel ke Excel.`);
    }

    function copyFullExcelAccountSheet() {
      if (currentGeneratedAccounts.length === 0) {
        showToast('Data Kosong', 'Tempelkan nama siswa terlebih dahulu.', true);
        return;
      }
      const rows = currentGeneratedAccounts.map(i => `${i.originalName}\t${i.username}\t${i.email}\t${i.password}`);
      const text = rows.join('\r\n');
      copyToClipboard(text, 'Tabel Lengkap Disalin!', `${currentGeneratedAccounts.length} baris tabel lengkap siap ditempel ke Excel (4 Kolom).`);
    }

    function resetAccountGenerator() {
      document.getElementById('accInput').value = '';
      runAccountGenerator();
      soundReset();
      showToast('Data Dibersihkan', 'Generator akun telah di-reset.');
    }

    function insertAccountSample() {
      const sample = [
        'Ahmad Fikri Pratama\t2026101',
        'Siti Fatimah Azzahra\t2026102',
        'Muhammad Wildan Ramadhan\t2026103',
        'Nur Aini Salsabila\t2026104',
        'Budi Santoso\t2026105',
        'Dewi Ratnasari\t2026106',
        'Hafiz Maulana\t2026107',
        'Zahra Syahrina\t2026108'
      ].join('\n');
      document.getElementById('accInput').value = sample;
      runAccountGenerator();
      soundSuccess();
      showToast('Contoh Dimuat', '8 nama simulasi dengan nomor NIS berhasil dimuat.');
    }

    // ==============================================================
    // 9.B. ENGINE ANALISIS EXCEL FORMULIR PPDB & DUAL ACCOUNT GENERATOR
    // ==============================================================
    let currentPpdbRawAoA = null;
    let currentPpdbOrtuList = [];
    let currentPpdbSiswaList = [];
    let currentPpdbGuruList = [];
    let currentPpdbActiveSubtab = 'ortu';

    function switchAccountMode(mode) {
      const viewPpdb = document.getElementById('viewModePpdb');
      const viewManual = document.getElementById('viewModeManual');
      const btnAi = document.getElementById('btnTabModeAi');
      const btnManual = document.getElementById('btnTabModeManual');
      const secExcel = document.getElementById('ppdbInputExcelSection');
      const secAi = document.getElementById('ppdbInputAiSection');

      const activeClass = 'flex-1 sm:flex-initial justify-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-none font-bold transition-all bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 shadow-xs flex items-center gap-1 sm:gap-1.5';
      const inactiveClass = 'flex-1 sm:flex-initial justify-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-none font-semibold transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 sm:gap-1.5';

      if (mode === 'ppdb') {
        if (viewPpdb) viewPpdb.classList.remove('hidden');
        if (viewManual) viewManual.classList.add('hidden');
        if (secExcel) secExcel.classList.remove('hidden');
        if (secAi) secAi.classList.add('hidden');

        if (btnPpdb) btnPpdb.className = activeClass;
        if (btnAi) btnAi.className = inactiveClass;
        if (btnManual) btnManual.className = inactiveClass;
      } else if (mode === 'ai') {
        if (viewPpdb) viewPpdb.classList.remove('hidden');
        if (viewManual) viewManual.classList.add('hidden');
        if (secExcel) secExcel.classList.add('hidden');
        if (secAi) secAi.classList.remove('hidden');

        if (btnPpdb) btnPpdb.className = inactiveClass;
        if (btnAi) btnAi.className = activeClass;
        if (btnManual) btnManual.className = inactiveClass;

        const inputEl = document.getElementById('aiChatRawInput');
        if (inputEl && !inputEl.value.trim()) {
          inputEl.focus();
        }
      } else {
        if (viewPpdb) viewPpdb.classList.add('hidden');
        if (viewManual) viewManual.classList.remove('hidden');

        if (btnPpdb) btnPpdb.className = inactiveClass;
        if (btnAi) btnAi.className = inactiveClass;
        if (btnManual) btnManual.className = activeClass;
      }

      if (window.lucide) lucide.createIcons();
    }

    // ==============================================================
    // 9.B.1. AI SMART CHAT & FORM PARSER (WHATSAPP TO DUAL-ACCOUNT)
    // ==============================================================
    const AI_CHAT_PRESETS = {
      1: `Data murid pindahan X-2
Nama: Najwa Salsabila Aulia
TTL: Lamongan, 21 September 2011
NISN/ NIK: 3112309433/ 3524056109110002
Alamat: Tegalrejo, Babat, Lamongan
Orang tua: Mifta Hussurur/ Inta Awwanah
No telp: 085730303666
Sekolah asal: SMPN 1 Babat`,

      2: `Nama: Azmi Fara Yudha Nabila
TTL : Lamongan, 14 Maret 2009
NIK/ NISN: 3524135403090001/ 3093088495
Alamat: Sukodadi, Lamongan
Nama Ayah: Akhmad Lazim
Nama Ibu: Ita
Profesi Ayah: Wiraswasta
Profesi Ibu: Ibu Rumah Tangga
No HP: 081234567890
Sekolah asal: MTs Sunan Drajat`,

      3: `FORMULIR PENDAFTARAN PESERTA DIDIK BARU TAHUN PELAJARAN 2026-2027
1. NISN : 3091234567
2. NIK : 3524056408090001
3. Nama Lengkap : AISHA NURUL IZZAH
4. Tempat Tanggal Lahir : Lamongan, 24/08/2009
5. Jenis Kelamin : Perempuan
DATA WALI/ORANG TUA:
1. Nama Wali : ZAHID ARIFIN
2. NIK Wali : 3524051205750003
3. Nama Ayah : ZAHID ARIFIN
4. Nama Ibu : SITI AMINAH
5. Profesi Ayah : GURU
6. Profesi Ibu : IBU RUMAH TANGGA
7. No. HP. Wali : 085851214338
8. Alamat : Babat, Lamongan
Mondok atau Tidak Mondok: TIDAK
Sekolah Asal: MTs Negeri 1 Lamongan
Guru Pembawa / Pendamping: Ustadz Ahmad Fauzi, M.Pd`
    };

    function loadAiPreset(num) {
      const text = AI_CHAT_PRESETS[num];
      if (!text) return;
      const el = document.getElementById('aiChatRawInput');
      if (el) {
        el.value = text;
        soundSuccess();
        showToast('Contoh AI Dimuat', `Preset ${num} berhasil dimuat ke editor chat.`);
      }
    }

    function clearAiChatInput() {
      const el = document.getElementById('aiChatRawInput');
      if (el) {
        el.value = '';
        el.focus();
        showToast('Editor Dibersihkan', 'Teks chat WhatsApp telah dikosongkan.');
      }
    }

    async function pasteClipboardToAiChat() {
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          if (text) {
            const el = document.getElementById('aiChatRawInput');
            if (el) {
              el.value = text;
              soundSuccess();
              showToast('Teks Ditempel', 'Berhasil menempelkan teks dari clipboard.');
              return;
            }
          }
        }
        showToast('Info Clipboard', 'Silakan gunakan tombol Ctrl+V langsung di area teks.');
      } catch (err) {
        showToast('Izin Clipboard Dibutuhkan', 'Tekan Ctrl+V langsung di dalam area teks.', true);
      }
    }

    // Heuristic NLP chunk splitter: Memecah pesan chat WhatsApp majemuk menjadi per-santri
    function splitAiChatIntoStudentChunks(rawText) {
      if (!rawText) return [];
      let cleaned = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      // Bersihkan metadata WhatsApp (timestamp, tanda Diteruskan / Forwarded)
      cleaned = cleaned.replace(/^\[\d{1,2}[\.\:]\d{2}[^\]]*\]\s*[^:\n]+:\s*/gm, '');
      cleaned = cleaned.replace(/^\s*(?:[\~\-]\s*)?(?:pesan\s+)?diteruskan\s*$/gim, '');
      cleaned = cleaned.replace(/^\s*(?:[\~\-]\s*)?forwarded(?:\s+message)?\s*$/gim, '');
      cleaned = cleaned.replace(/^\s*\d{1,2}[\.\:]\d{2}\s*$/gm, '');

      const lines = cleaned.split('\n');
      const chunks = [];
      let currentChunk = [];

      const isStudentHeaderLine = (line) => {
        const l = line.trim().toLowerCase();
        if (!l) return false;
        if (l.includes('ayah') || l.includes('ibu') || l.includes('wali') || l.includes('guru') || l.includes('sekolah')) {
          return false;
        }
        if (/^(?:data\s+murid|data\s+santri|data\s+siswa|data\s+calon|formulir\s+pendaftaran)/i.test(l)) {
          return true;
        }
        if (/^(?:\d+[\.\)]\s*)?nama\s*(?:lengkap|murid|santri|siswa|calon)?\s*[:=;]/i.test(l)) {
          const alreadyHasStudentName = currentChunk.some(prevLine => {
            const pl = prevLine.trim().toLowerCase();
            return /^(?:\d+[\.\)]\s*)?nama\s*(?:lengkap|murid|santri|siswa|calon)?\s*[:=;]/i.test(pl) &&
                   !pl.includes('ayah') && !pl.includes('ibu') && !pl.includes('wali') && !pl.includes('guru') && !pl.includes('sekolah');
          });
          return alreadyHasStudentName;
        }
        return false;
      };

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (isStudentHeaderLine(line) && currentChunk.length > 0) {
          chunks.push(currentChunk.join('\n'));
          currentChunk = [line];
        } else {
          currentChunk.push(line);
        }
      }
      if (currentChunk.length > 0 && currentChunk.some(l => l.trim().length > 0)) {
        chunks.push(currentChunk.join('\n'));
      }

      return chunks.length > 0 ? chunks : [cleaned];
    }

    // Heuristic pattern extractor per student chunk
    function parseSingleStudentChunk(chunk) {
      const res = {
        namaSiswa: '',
        kelas: '',
        nisn: '',
        nikSiswa: '',
        nikWali: '',
        ttl: '',
        gender: '',
        alamat: '',
        namaWali: '',
        namaAyah: '',
        namaIbu: '',
        profesiAyah: '',
        profesiIbu: '',
        phone: '',
        mondok: '',
        sekolahAsal: '',
        guru: ''
      };

      const lines = chunk.split('\n').map(l => l.trim()).filter(Boolean);

      // 1. Deteksi Kelas / Murid Pindahan (contoh: X-2, XI-1, Kelas 8, Siswa baru kelas 7)
      const klsMatch = chunk.match(/(?:data\s+murid\s+pindahan|siswa\s*baru\s*kelas|kelas|kls|pindahan)\s*[:=;]?\s*([A-Za-z0-9\-\s]+?)(?=\n|$)/i);
      if (klsMatch && klsMatch[1]) {
        res.kelas = klsMatch[1].trim().replace(/^(?:kelas|kls)\s*/i, '');
      }

      // 2. Deteksi Nama Siswa
      for (const line of lines) {
        const l = line.toLowerCase();
        if (l.includes('ayah') || l.includes('ibu') || l.includes('wali') || l.includes('guru') || l.includes('sekolah')) continue;
        const m = line.match(/^(?:\d+[\.\)]\s*)?nama\s*(?:lengkap|murid|santri|siswa|calon)?\s*[:=]\s*(.+)$/i);
        if (m && m[1]) {
          res.namaSiswa = m[1].trim();
          break;
        }
      }
      if (!res.namaSiswa) {
        for (const line of lines) {
          const l = line.toLowerCase();
          if (l.startsWith('data murid') || l.startsWith('formulir') || l.startsWith('pendaftaran')) continue;
          if (line.includes(':')) {
            const parts = line.split(':');
            const label = parts[0].trim().toLowerCase();
            if (label === 'nama' || label === 'nama lengkap') {
              res.namaSiswa = parts.slice(1).join(':').trim();
              break;
            }
          }
        }
      }

      // 3. Disambiguasi Cerdas NIK (16 digit) vs NISN (10 digit)
      const all16Digits = chunk.match(/\b\d{16}\b/g) || [];
      const all10Digits = chunk.match(/\b\d{10}\b/g) || [];

      if (all10Digits.length > 0) {
        res.nisn = all10Digits[0];
      }

      if (all16Digits.length === 1) {
        const hasWaliNik = /(?:nik\s*wali|ktp\s*wali|nik\s*orang\s*tua)\s*[:=]?\s*\b\d{16}\b/i.test(chunk);
        if (hasWaliNik) {
          res.nikWali = all16Digits[0];
        } else {
          res.nikSiswa = all16Digits[0];
        }
      } else if (all16Digits.length >= 2) {
        lines.forEach(line => {
          const m16 = line.match(/\b\d{16}\b/);
          if (m16) {
            const l = line.toLowerCase();
            if (l.includes('wali') || l.includes('ortu') || l.includes('ayah') || l.includes('ibu') || l.includes('ktp')) {
              res.nikWali = m16[0];
            } else {
              res.nikSiswa = m16[0];
            }
          }
        });
      }

      // 4. Deteksi TTL
      const ttlMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:ttl|tempat\s*,?\s*tanggal\s*lahir|tgl\s*lahir|tanggal\s*lahir)\s*[:=]\s*([^\r\n]+)/i);
      if (ttlMatch && ttlMatch[1]) {
        res.ttl = ttlMatch[1].trim();
      }

      // 5. Deteksi Jenis Kelamin
      const jkMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:jenis\s*kelamin|gender|jk)\s*[:=]\s*([^\r\n]+)/i);
      if (jkMatch && jkMatch[1]) {
        const jkRaw = jkMatch[1].trim().toLowerCase();
        res.gender = (jkRaw.startsWith('p') || jkRaw.includes('putri') || jkRaw.includes('wanita') || jkRaw.includes('perempuan')) ? 'Perempuan' : 'Laki-laki';
      }

      // 6. Deteksi Alamat
      const almtMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:alamat(?:\s*lengkap|\s*rumah|\s*asal)?)\s*[:=]\s*([^\r\n]+)/i);
      if (almtMatch && almtMatch[1]) {
        res.alamat = almtMatch[1].trim();
      }

      // 7. Deteksi No Telepon / WA
      const telpMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:no\.?\s*(?:hp|telp|wa|telepon|ponsel)|kontak|telepon|wa)\s*[:=]\s*([^\r\n]+)/i);
      if (telpMatch && telpMatch[1]) {
        const pMatch = telpMatch[1].match(/(?:\+62|08)\d{8,12}/);
        res.phone = pMatch ? pMatch[0] : telpMatch[1].trim();
      } else {
        const anyPhone = chunk.match(/\b(?:08\d{8,12}|\+62\d{8,12})\b/);
        if (anyPhone) res.phone = anyPhone[0];
      }

      // 8. Deteksi Orang Tua / Wali
      const ortuCombinedMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?orang\s*tua\s*[:=]\s*([^\r\n]+)/i);
      if (ortuCombinedMatch && ortuCombinedMatch[1]) {
        const combined = ortuCombinedMatch[1].trim();
        if (combined.includes('/')) {
          const parts = combined.split('/');
          res.namaAyah = parts[0].trim();
          res.namaIbu = parts[1].trim();
        } else if (combined.includes('&')) {
          const parts = combined.split('&');
          res.namaAyah = parts[0].trim();
          res.namaIbu = parts[1].trim();
        } else {
          res.namaAyah = combined;
        }
      }

      const ayahMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:nama\s*ayah|ayah)\s*[:=]\s*([^\r\n]+)/i);
      if (ayahMatch && ayahMatch[1]) res.namaAyah = ayahMatch[1].trim();

      const ibuMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:nama\s*ibu|ibu)\s*[:=]\s*([^\r\n]+)/i);
      if (ibuMatch && ibuMatch[1]) res.namaIbu = ibuMatch[1].trim();

      const waliMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:nama\s*wali|wali)\s*[:=]\s*([^\r\n]+)/i);
      if (waliMatch && waliMatch[1]) res.namaWali = waliMatch[1].trim();

      const profAyahMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:profesi\s*ayah|pekerjaan\s*ayah)\s*[:=]\s*([^\r\n]+)/i);
      if (profAyahMatch && profAyahMatch[1]) res.profesiAyah = profAyahMatch[1].trim();

      const profIbuMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:profesi\s*ibu|pekerjaan\s*ibu)\s*[:=]\s*([^\r\n]+)/i);
      if (profIbuMatch && profIbuMatch[1]) res.profesiIbu = profIbuMatch[1].trim();

      if (!res.namaWali) {
        res.namaWali = res.namaAyah || res.namaIbu || `Wali ${res.namaSiswa}`;
      }

      // 9. Deteksi Status Mondok (Mukim / Non-Mukim / Asrama)
      const mondokMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:mondok\s*atau\s*tidak\s*mondok|status\s*(?:mondok|mukim|santri)|mondok|asrama)\s*[:=;]?\s*([^\r\n]+)/i);
      if (mondokMatch && mondokMatch[1]) {
        res.mondok = mondokMatch[1].trim();
      } else if (/mondok\s*\((?:mukim|asrama)\)/i.test(chunk)) {
        res.mondok = 'Mukim';
      }

      // 10. Deteksi Sekolah Asal
      const sekMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:sekolah\s*asal|asal\s*sekolah|dari\s*sekolah)\s*[:=]\s*([^\r\n]+)/i);
      if (sekMatch && sekMatch[1]) {
        res.sekolahAsal = sekMatch[1].trim();
      }

      // 11. Deteksi Guru Pendamping / Pembawa
      const guruMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:guru(?:\s*(?:pembawa|pendamping|\/|\-)+)*|rekomendasi\s*guru|pembawa|pendamping)\s*[:=]\s*([^\r\n]+)/i);
      if (guruMatch && guruMatch[1]) {
        res.guru = guruMatch[1].trim();
      }

      // 12. Deteksi Nomor BRIVA / Virtual Account jika ada di chat
      const brivaMatch = chunk.match(/(?:^|\n)\s*(?:\d+[\.\)]\s*)?(?:nomor\s*briva|no\s*briva|briva|nomor\s*va|no\s*va|va|virtual\s*account)\s*[:=]\s*([^\r\n]+)/i);
      if (brivaMatch && brivaMatch[1]) {
        res.briva = brivaMatch[1].trim().replace(/[^0-9]/g, '');
      }

      return res;
    }

    // Engine Utama AI: Memproses input chat menjadi 2 akun per santri (Ortu + Siswa)
    function processAiChatToDualAccounts() {
      const rawText = (document.getElementById('aiChatRawInput')?.value || '').trim();
      if (!rawText) {
        showToast('Pesan Chat Kosong', 'Tempel pesan WhatsApp atau pilih tombol contoh di atas.', true);
        return;
      }

      const chunks = splitAiChatIntoStudentChunks(rawText);
      if (chunks.length === 0) {
        showToast('Gagal Membaca', 'Format teks tidak terdeteksi. Silakan periksa isi chat.', true);
        return;
      }

      const suffix = (document.getElementById('ppdbSuffixInput')?.value || '26').trim();
      const defaultPassword = (document.getElementById('ppdbPasswordInput')?.value || 'P@ssword123').trim();
      let fallbackDomain = (document.getElementById('ppdbDomainInput')?.value || 'gmail.com').trim().replace(/^@/, '');
      if (!fallbackDomain) fallbackDomain = 'gmail.com';

      currentPpdbOrtuList = [];
      currentPpdbSiswaList = [];
      const teacherMap = {};

      let parsedCount = 0;

      for (const chunk of chunks) {
        const parsed = parseSingleStudentChunk(chunk);
        if (!parsed.namaSiswa) continue;

        parsedCount++;

        // 1. GENERATE AKUN ORANG TUA (11 Kolom Template Resmi)
        const usernameOrtu = generateParentUsername(parsed.namaWali, suffix);
        const emailOrtu = `${usernameOrtu}@${fallbackDomain}`;
        const ktpOrtu = parsed.nikWali || parsed.nikSiswa || '';

        currentPpdbOrtuList.push({
          namaWali: parsed.namaWali,
          email: emailOrtu,
          username: usernameOrtu,
          password: defaultPassword,
          ktp: ktpOrtu,
          namaAyah: parsed.namaAyah,
          namaIbu: parsed.namaIbu,
          profesiAyah: parsed.profesiAyah,
          profesiIbu: parsed.profesiIbu,
          telepon: parsed.phone,
          alamat: parsed.alamat,
          siswaTerkait: parsed.namaSiswa,
          briva: parsed.briva || ''
        });

        // 2. GENERATE AKUN SISWA / ANAK
        const usernameSiswa = generateStudentUsername(parsed.namaSiswa, suffix);
        const emailSiswa = `${usernameSiswa}@${fallbackDomain}`;
        const finalStatus = formatPpdbStudentStatus(parsed.mondok, parsed.gender);
        const asalSekolahFinal = parsed.sekolahAsal || (parsed.kelas ? `Pindahan Kelas ${parsed.kelas}` : '');
        const guruFinal = parsed.guru || 'Tanpa Guru Pendamping';

        currentPpdbSiswaList.push({
          namaSiswa: parsed.namaSiswa,
          username: usernameSiswa,
          email: emailSiswa,
          password: defaultPassword,
          gender: parsed.gender,
          hp: parsed.phone,
          alamat: parsed.alamat || '',
          rencanaStatus: finalStatus,
          sekolahAsal: asalSekolahFinal,
          guru: guruFinal,
          namaWali: parsed.namaWali,
          nisn: parsed.nisn,
          nik: parsed.nikSiswa,
          briva: parsed.briva || ''
        });

        // 3. AKUMULASI GURU PENDAMPING
        const teacherClean = guruFinal;
        const teacherKey = normalizeTeacherKey(teacherClean);

        if (!teacherMap[teacherKey]) {
          teacherMap[teacherKey] = {
            displayName: teacherClean,
            count: 0,
            students: []
          };
        }
        teacherMap[teacherKey].count += 1;
        teacherMap[teacherKey].students.push(parsed.namaSiswa);
      }

      if (parsedCount === 0) {
        showToast('Nama Tidak Ditemukan', 'Pastikan chat memuat minimal baris "Nama: [Nama Santri]".', true);
        return;
      }

      currentPpdbGuruList = Object.values(teacherMap).sort((a, b) => b.count - a.count);

      // Render Hasil ke Seluruh Metrik & Tabel
      renderPpdbAll();

      const statusEl = document.getElementById('ppdbFileStatusText');
      if (statusEl) {
        statusEl.textContent = `AI Chat WA Ã¢â‚¬¢ ${parsedCount} Santri Terkonversi (Dual-Account)`;
      }

      soundSuccess();
      showToast(
        'âœï¸¨ Konversi AI Berhasil!', 
        `${parsedCount} Santri berhasil diekstrak menjadi 2 Akun (Akun Ortu 11 Kolom + Akun Siswa).`
      );

      // Scroll halus ke tabel hasil agar user langsung melihat 2 akun yang baru dibuat
      const targetTable = document.getElementById('subtabContentOrtu');
      if (targetTable) {
        targetTable.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    function switchPpdbSubtab(subtab) {
      currentPpdbActiveSubtab = subtab;

      const tabs = ['ortu', 'siswa', 'guru'];
      tabs.forEach(t => {
        const content = document.getElementById(`subtabContent${t.charAt(0).toUpperCase() + t.slice(1)}`);
        const btn = document.getElementById(`btnSubtab${t.charAt(0).toUpperCase() + t.slice(1)}`);
        const badge = document.getElementById(`badgeSubtab${t.charAt(0).toUpperCase() + t.slice(1)}`);

        if (t === subtab) {
          if (content) content.classList.remove('hidden');
          if (btn) {
            btn.className = 'flex-1 sm:flex-initial justify-center whitespace-nowrap px-1.5 sm:px-4 py-1.5 rounded-none font-bold text-[11px] sm:text-xs bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm flex items-center gap-1 sm:gap-1.5 transition-all subtab-active cursor-pointer min-w-0';
          }
          if (badge) {
            badge.className = 'ml-0.5 sm:ml-1 text-[10px] bg-white/25 dark:bg-slate-900/25 text-white dark:text-slate-900 font-bold px-1.5 py-0.2 rounded-none shrink-0';
          }
        } else {
          if (content) content.classList.add('hidden');
          if (btn) {
            btn.className = 'flex-1 sm:flex-initial justify-center whitespace-nowrap px-1.5 sm:px-4 py-1.5 rounded-none font-semibold text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer min-w-0';
          }
          if (badge) {
            badge.className = 'ml-0.5 sm:ml-1 text-[10px] bg-slate-300/60 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold px-1.5 py-0.2 rounded-none shrink-0';
          }
        }
      });

      if (window.lucide) lucide.createIcons();

      if (subtab === 'siswa') {
        setTimeout(() => initDragToScroll('scrollWrapperPpdbSiswa'), 60);
      } else if (subtab === 'ortu') {
        setTimeout(() => initDragToScroll('scrollWrapperPpdbOrtu'), 60);
      }
      togglePpdbViewMode(currentPpdbViewMode);
    }

    function togglePpdbPasteArea() {
      const area = document.getElementById('ppdbPasteAreaWrapper');
      if (area) {
        area.classList.toggle('hidden');
        if (!area.classList.contains('hidden')) {
          const textarea = document.getElementById('ppdbPasteInput');
          if (textarea) textarea.focus();
        }
      }
    }

    function clearPpdbPaste() {
      const textarea = document.getElementById('ppdbPasteInput');
      if (textarea) {
        textarea.value = '';
        textarea.focus();
      }
    }

    function handlePpdbPasteInput() {
      const text = (document.getElementById('ppdbPasteInput')?.value || '').trim();
      if (!text) return;

      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length === 0) return;

      const delimiter = lines[0].includes('\t') ? '\t' : (lines[0].includes(';') ? ';' : ',');
      const rawAoA = lines.map(line => line.split(delimiter).map(cell => cell.trim()));

      processPpdbRows(rawAoA, `Tempel Manual (${lines.length} baris)`);
      soundSuccess();
      showToast('Data Ditempel', `${lines.length} baris berhasil diimpor & diproses.`);
    }

    function handlePpdbFileInput(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      readPpdbSpreadsheetFile(file);
    }

    function handlePpdbDrop(event) {
      event.preventDefault();
      const dropzone = event.currentTarget;
      if (dropzone) {
        dropzone.classList.remove('border-indigo-600', 'bg-indigo-50/40');
      }

      if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        readPpdbSpreadsheetFile(file);
      }
    }

    function readPpdbSpreadsheetFile(file) {
      if (!window.XLSX) {
        showToast('Pustaka Excel Belum Siap', 'Pustaka SheetJS sedang dimuat, coba lagi sebentar.', true);
        return;
      }

      const statusEl = document.getElementById('ppdbFileStatusText');
      if (statusEl) statusEl.textContent = `Membaca: ${file.name}...`;

      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array', cellDates: true });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          const rawAoA = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
          if (!rawAoA || rawAoA.length === 0) {
            showToast('File Kosong', 'Tidak ada data ditemukan dalam sheet pertama.', true);
            if (statusEl) statusEl.textContent = 'File kosong';
            return;
          }

          processPpdbRows(rawAoA, file.name);
          soundSuccess();
          showToast('File Berhasil Diimpor', `${file.name} diproses (${rawAoA.length - 1} data santri).`);
        } catch (err) {
          console.error('Gagal membaca file spreadsheet:', err);
          showToast('Gagal Membaca File', 'Pastikan format file .xlsx, .xls atau .csv valid.', true);
          if (statusEl) statusEl.textContent = 'Gagal memproses file';
        }
      };
      reader.onerror = function() {
        showToast('Gagal Mengunggah', 'Terjadi kesalahan saat membaca file dari komputer.', true);
      };
      reader.readAsArrayBuffer(file);
    }

    // Keyword detector untuk kolom Google Forms PPDB
    function detectPpdbColumnIndices(headerRow) {
      const mapping = {
        timestamp: -1,
        namaSiswa: -1,
        ttl: -1,
        gender: -1,
        emailSiswa: -1,
        hpSiswa: -1,
        alamatSiswa: -1,
        namaWali: -1,
        nikWali: -1,
        namaAyah: -1,
        namaIbu: -1,
        profesiAyah: -1,
        profesiIbu: -1,
        emailWali: -1,
        hpWali: -1,
        alamatWali: -1,
        rencanaStatus: -1,
        guruPendamping: -1,
        sekolahAsal: -1,
        briva: -1
      };

      if (!headerRow || !Array.isArray(headerRow)) return mapping;

      headerRow.forEach((col, idx) => {
        const text = String(col || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
        if (!text) return;

        // Timestamp
        if (mapping.timestamp === -1 && (text.includes('timestamp') || text.includes('waktu') || text.includes('tanggal daftar'))) {
          mapping.timestamp = idx;
        }
        // Nama Siswa / Calon Siswa
        else if (mapping.namaSiswa === -1 && (text.includes('nama lengkap') || text.includes('nama calon') || text.includes('nama siswa') || (text.includes('nama') && !text.includes('wali') && !text.includes('ayah') && !text.includes('ibu') && !text.includes('guru') && !text.includes('sekolah')))) {
          mapping.namaSiswa = idx;
        }
        // TTL
        else if (mapping.ttl === -1 && (text.includes('tempat tanggal lahir') || text.includes('ttl') || text.includes('tempat lahir'))) {
          mapping.ttl = idx;
        }
        // Jenis Kelamin
        else if (mapping.gender === -1 && (text.includes('jenis kelamin') || text.includes('kelamin') || text.includes('gender') || text === 'jk')) {
          mapping.gender = idx;
        }
        // Email Calon Siswa
        else if (mapping.emailSiswa === -1 && text.includes('mail') && (text.includes('siswa') || text.includes('calon') || (!text.includes('wali') && !text.includes('orang tua')))) {
          mapping.emailSiswa = idx;
        }
        // No HP Siswa
        else if (mapping.hpSiswa === -1 && (text.includes('hp') || text.includes('telepon') || text.includes('wa') || text.includes('whatsapp') || text.includes('ponsel')) && (text.includes('siswa') || text.includes('calon') || (!text.includes('wali') && !text.includes('orang tua')))) {
          mapping.hpSiswa = idx;
        }
        // Alamat Siswa
        else if (mapping.alamatSiswa === -1 && text.includes('alamat') && (text.includes('siswa') || text.includes('calon') || (!text.includes('wali') && !text.includes('orang')))) {
          mapping.alamatSiswa = idx;
        }
        // Nama Wali
        else if (mapping.namaWali === -1 && (text.includes('nama wali') || text.includes('nama orangtua') || text.includes('nama orang tua') || text.includes('orangtua wali'))) {
          mapping.namaWali = idx;
        }
        // NIK Wali / KTP
        else if (mapping.nikWali === -1 && (text.includes('nik') || text.includes('ktp') || text.includes('identitas') || text.includes('kependudukan'))) {
          mapping.nikWali = idx;
        }
        // Nama Ayah
        else if (mapping.namaAyah === -1 && text.includes('nama ayah') || (text.includes('ayah') && text.includes('nama'))) {
          mapping.namaAyah = idx;
        }
        // Nama Ibu
        else if (mapping.namaIbu === -1 && text.includes('nama ibu') || (text.includes('ibu') && text.includes('nama'))) {
          mapping.namaIbu = idx;
        }
        // Profesi / Pekerjaan Ayah
        else if (mapping.profesiAyah === -1 && (text.includes('profesi ayah') || text.includes('pekerjaan ayah'))) {
          mapping.profesiAyah = idx;
        }
        // Profesi / Pekerjaan Ibu
        else if (mapping.profesiIbu === -1 && (text.includes('profesi ibu') || text.includes('pekerjaan ibu'))) {
          mapping.profesiIbu = idx;
        }
        // Email Wali
        else if (mapping.emailWali === -1 && text.includes('mail') && (text.includes('wali') || text.includes('orang'))) {
          mapping.emailWali = idx;
        }
        // No HP Wali
        else if (mapping.hpWali === -1 && (text.includes('hp') || text.includes('telepon') || text.includes('wa') || text.includes('whatsapp')) && (text.includes('wali') || text.includes('orang') || text.includes('ortu'))) {
          mapping.hpWali = idx;
        }
        // Alamat Wali
        else if (mapping.alamatWali === -1 && text.includes('alamat') && (text.includes('wali') || text.includes('orang'))) {
          mapping.alamatWali = idx;
        }
        // Rencana Status (Asrama / Non Asrama)
        else if (mapping.rencanaStatus === -1 && (text.includes('rencana status') || text.includes('status calon') || text.includes('status siswa') || text.includes('asrama') || text.includes('mondok'))) {
          mapping.rencanaStatus = idx;
        }
        // Guru Pendamping
        else if (mapping.guruPendamping === -1 && (text.includes('guru pendamping') || text.includes('nama guru') || text.includes('pendamping') || text.includes('pembawa') || text.includes('rekomendasi guru'))) {
          mapping.guruPendamping = idx;
        }
        // Sekolah Asal
        else if (mapping.sekolahAsal === -1 && (text.includes('sekolah asal') || text.includes('asal sekolah') || text.includes('nama sekolah asal'))) {
          mapping.sekolahAsal = idx;
        }
        // Nomor Registrasi / BRIVA
        else if (mapping.briva === -1 && (
          text.includes('registrasi') || text.includes('noreg') || text.includes('no. reg') || text.includes('no reg') ||
          text.includes('pendaftaran') || text.includes('no daftar') || text.includes('no. daftar') ||
          text.includes('briva') || text.includes('virtual account') || text === 'va' || text.includes('no va') || text.includes('nomor va')
        )) {
          mapping.briva = idx;
        }
      });

      return mapping;
    }

    function generateParentUsername(parentName, suffix) {
      if (!parentName) return `wali${suffix}`;
      const clean = parentName.toLowerCase().replace(/[^a-z0-9]/g, '');
      return (clean || 'wali') + suffix;
    }

    function generateStudentUsername(studentName, suffix) {
      if (!studentName) return `siswa${suffix}`;
      const style = document.getElementById('ppdbUsernameStyle')?.value || 'joined_all';
      const words = studentName.toLowerCase().split(/\s+/).map(w => w.replace(/[^a-z0-9]/g, '')).filter(Boolean);
      if (words.length === 0) return `siswa${suffix}`;
      
      if (style === 'joined_all') {
        // Gabung semua kata langsung tanpa titik: Salsa Nabila Yusnia -> salsanabilayusnia26
        return words.join('') + suffix;
      } else if (style === 'joined_if_3') {
        // Jika 3 kata atau lebih digabung semua, jika 2 kata pakai titik
        if (words.length >= 3) {
          return words.join('') + suffix;
        } else if (words.length === 2) {
          return `${words[0]}.${words[1]}${suffix}`;
        } else {
          return words[0] + suffix;
        }
      } else if (style === 'first_second_dot') {
        if (words.length === 1) return words[0] + suffix;
        return `${words[0]}.${words[1]}${suffix}`;
      } else if (style === 'first_only') {
        return words[0] + suffix;
      }
      return words.join('') + suffix;
    }

    // Normalisasi Nama Guru Pendamping agar variasi ketikan (gelar, tanda baca, kapital) menyatu
    function normalizeTeacherKey(rawName) {
      if (!rawName) return 'tanpa guru pendamping';
      let clean = String(rawName).trim();
      if (!clean || clean === '-' || clean === 'Tidak Ada' || clean === 'tdk ada' || clean === 'none') {
        return 'tanpa guru pendamping';
      }

      // Hapus gelar akademik umum untuk perbandingan key
      // Tangani variasi titik, spasi, atau singkatan (cth: s.sos, ssos, sos, s.pd, spd, s.pd.i, spdi, m.pd, mpd, drs, dra, h, hj, ustadz, dll)
      let key = clean.toLowerCase()
        .replace(/[,\.]/g, ' ')
        .replace(/\b(s\s*sos|ssos|sos)\b/g, '')
        .replace(/\b(s\s*pd\s*i|spdi|s\s*pdi)\b/g, '')
        .replace(/\b(s\s*pd|spd)\b/g, '')
        .replace(/\b(m\s*pd\s*i|mpdi|m\s*pdi)\b/g, '')
        .replace(/\b(m\s*pd|mpd)\b/g, '')
        .replace(/\b(s\s*ag|sag)\b/g, '')
        .replace(/\b(s\s*kom|skom)\b/g, '')
        .replace(/\b(s\s*si|ssi)\b/g, '')
        .replace(/\b(s\s*t|st)\b/g, '')
        .replace(/\b(s\s*e|se)\b/g, '')
        .replace(/\b(s\s*hum|shum)\b/g, '')
        .replace(/\b(drs|dra|dr|prof|kh|k\s*h|kyai|h|hj|haji|hajjah|ustadz|ust)\b/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      return key || clean.toLowerCase();
    }

    // Sinkronisasi Input Nomor BRIVA Admin (Quick Input Header & Accordion Input)
    function syncPpdbBrivaInput(val) {
      const v = String(val || '').trim();
      try {
        localStorage.setItem('ppdb_admin_briva', v);
      } catch (e) {}
      const el1 = document.getElementById('ppdbBrivaInput');
      const el2 = document.getElementById('ppdbBrivaQuickInput');
      if (el1 && el1.value !== v) el1.value = v;
      if (el2 && el2.value !== v) el2.value = v;
    }

    // Ambil Nomor Registrasi / BRIVA yang diinputkan custom oleh admin (1600 adalah Kode Sekolah)
    function getAdminBrivaNumber(item) {
      if (item) {
        const val = item.noRegistrasi || item.briva || item.noreg || item.noReg || '';
        if (String(val).trim() !== '' && String(val).trim() !== '1600') {
          return String(val).trim();
        }
      }
      const elQuick = document.getElementById('ppdbBrivaQuickInput');
      if (elQuick && elQuick.value.trim() && elQuick.value.trim() !== '1600') return elQuick.value.trim();
      const elMain = document.getElementById('ppdbBrivaInput');
      if (elMain && elMain.value.trim() && elMain.value.trim() !== '1600') return elMain.value.trim();
      try {
        const saved = localStorage.getItem('ppdb_admin_briva');
        if (saved && saved.trim() && saved.trim() !== '1600') return saved.trim();
      } catch (e) {}
      return '';
    }

    // Update Nomor BRIVA Kustom per Baris Santri / Wali secara Real-time
    function updatePpdbRowBriva(type, idx, val) {
      const cleanVal = String(val || '').trim();
      if (type === 'siswa' && currentPpdbSiswaList[idx]) {
        currentPpdbSiswaList[idx].briva = cleanVal;
        const sName = currentPpdbSiswaList[idx].namaSiswa;
        if (sName) {
          const matchOrtu = currentPpdbOrtuList.find(o => o.siswaTerkait === sName);
          if (matchOrtu) matchOrtu.briva = cleanVal;
        }
      } else if (type === 'ortu' && currentPpdbOrtuList[idx]) {
        currentPpdbOrtuList[idx].briva = cleanVal;
        const sName = currentPpdbOrtuList[idx].siswaTerkait;
        if (sName) {
          const matchSiswa = currentPpdbSiswaList.find(s => s.namaSiswa === sName);
          if (matchSiswa) matchSiswa.briva = cleanVal;
        }
      }
    }

    // Modal Kelola & Tempel Kolom BRIVA Masal
    function openPpdbBulkSetBrivaModal() {
      const modal = document.getElementById('modalPpdbBulkBriva');
      if (!modal) return;
      
      const countEl = document.getElementById('ppdbBulkStudentCount');
      if (countEl) countEl.textContent = `${currentPpdbSiswaList.length} Santri`;
      
      const emptyCount = currentPpdbSiswaList.filter(s => !s.briva || String(s.briva).trim() === '').length;
      const emptyEl = document.getElementById('ppdbBulkEmptyCount');
      if (emptyEl) emptyEl.textContent = `${emptyCount} Belum Ada BRIVA`;

      modal.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }

    function closePpdbBulkSetBrivaModal() {
      const modal = document.getElementById('modalPpdbBulkBriva');
      if (modal) modal.classList.add('hidden');
    }

    function switchPpdbBrivaModalTab(tabName) {
      document.querySelectorAll('.ppdb-briva-modal-pane').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.ppdb-briva-modal-tab-btn').forEach(el => {
        el.classList.remove('bg-indigo-600', 'text-white', 'font-bold');
        el.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });
      
      const pane = document.getElementById(`ppdbBrivaPane-${tabName}`);
      if (pane) pane.classList.remove('hidden');
      
      const btn = document.getElementById(`ppdbBrivaTabBtn-${tabName}`);
      if (btn) {
        btn.classList.add('bg-indigo-600', 'text-white', 'font-bold');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      }

      const radio = document.querySelector(`input[name="ppdbBrivaMethod"][value="${tabName}"]`);
      if (radio) radio.checked = true;
    }

    function onPpdbBulkPasteInput(text) {
      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const countEl = document.getElementById('ppdbBulkPasteLineCount');
      if (countEl) {
        countEl.textContent = `${lines.length} Baris Terdeteksi`;
      }
    }

    function applyPpdbBulkBriva() {
      if (currentPpdbSiswaList.length === 0) {
        showToast('Data Masih Kosong', 'Unggah data siswa terlebih dahulu.', true);
        closePpdbBulkSetBrivaModal();
        return;
      }

      const activeTab = document.querySelector('input[name="ppdbBrivaMethod"]:checked')?.value || 'paste';

      if (activeTab === 'paste') {
        const rawText = (document.getElementById('ppdbBulkPasteTextarea')?.value || '').trim();
        if (!rawText) {
          showToast('Teks Kosong', 'Tempelkan kolom nomor BRIVA terlebih dahulu.', true);
          return;
        }
        let lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        if (lines.length === 0) {
          showToast('Format Tidak Valid', 'Tidak ada baris nomor yang terdeteksi.', true);
          return;
        }

        // Cek jika baris pertama adalah judul kolom seperti "BRIVA" / "No VA"
        const firstLine = lines[0].toLowerCase();
        if (firstLine.includes('briva') || firstLine.includes('nomor') || firstLine.includes('va') || firstLine.includes('virtual')) {
          lines.shift();
        }

        let applied = 0;
        currentPpdbSiswaList.forEach((student, i) => {
          if (i < lines.length) {
            // Ambil hanya angka atau alphanumeric jika ada kode
            const brivaNum = lines[i].replace(/[^0-9A-Za-z]/g, '');
            student.briva = brivaNum;
            const matchOrtu = currentPpdbOrtuList.find(o => o.siswaTerkait === student.namaSiswa);
            if (matchOrtu) matchOrtu.briva = brivaNum;
            applied++;
          }
        });

        showToast('BRIVA Berhasil Diterapkan', `${applied} nomor BRIVA kustom berhasil dipasangkan ke santri!`);
      } else if (activeTab === 'sequence') {
        const prefix = (document.getElementById('ppdbSeqPrefix')?.value || '').trim();
        const startNum = parseInt(document.getElementById('ppdbSeqStart')?.value || '1', 10);
        const digits = parseInt(document.getElementById('ppdbSeqDigits')?.value || '3', 10);

        currentPpdbSiswaList.forEach((student, i) => {
          const numPart = String(startNum + i).padStart(digits, '0');
          const finalBriva = `${prefix}${numPart}`;
          student.briva = finalBriva;
          const matchOrtu = currentPpdbOrtuList.find(o => o.siswaTerkait === student.namaSiswa);
          if (matchOrtu) matchOrtu.briva = finalBriva;
        });

        showToast('BRIVA Urut Diterapkan', `${currentPpdbSiswaList.length} nomor BRIVA berurutan berhasil dibuat!`);
      } else if (activeTab === 'fill_empty') {
        const defaultBriva = (document.getElementById('ppdbBrivaQuickInput')?.value || '1600').trim();
        let filled = 0;
        currentPpdbSiswaList.forEach(student => {
          if (!student.briva || String(student.briva).trim() === '') {
            student.briva = defaultBriva;
            const matchOrtu = currentPpdbOrtuList.find(o => o.siswaTerkait === student.namaSiswa);
            if (matchOrtu) matchOrtu.briva = defaultBriva;
            filled++;
          }
        });
        showToast('BRIVA Diperbarui', `${filled} santri yang kosong berhasil diisi dengan ${defaultBriva}`);
      }

      renderPpdbAll();
      soundSuccess();
      closePpdbBulkSetBrivaModal();
    }

    // Format Status Santri Berdasarkan Hakikat Isi (Mukim / Non Mukim + PA / PI)
    // Sesuai standarisasi pondok pesantren: Mukim Reguler PA/PI, Non Mukim PA/PI, Mukim Vip PA/PI
    // Jika tidak ada data mondok / non-mukim, biarkan kosong sesuai permintaan admin
    function formatPpdbStudentStatus(rawStatus, gender) {
      const s = String(rawStatus || '').trim();
      if (!s || s === '-' || s.toLowerCase() === 'null' || s.toLowerCase() === 'undefined') {
        return '';
      }

      const g = String(gender || '').trim().toLowerCase();

      // Deteksi gender: PA (Putra / Laki-laki) atau PI (Putri / Perempuan)
      const isPi = g.startsWith('p') || g.includes('perempuan') || g.includes('putri') || 
                   s.toLowerCase().includes('pi') || s.toLowerCase().includes('putri');
      const genderCode = isPi ? 'PI' : 'PA';
      const sLower = s.toLowerCase();

      // Kasus Non Mukim / Non Asrama / Laju / Pulang / Tidak Mondok
      if (sLower.includes('non') || sLower.includes('laju') || sLower.includes('pulang') || sLower.includes('tdk') || sLower.includes('tidak')) {
        return `Non Mukim ${genderCode}`;
      }

      // Kasus Mukim VIP
      if (sLower.includes('vip')) {
        return `Mukim Vip ${genderCode}`;
      }

      // Kasus Mukim Mbajak / Khusus
      if (sLower.includes('mbajak')) {
        return `Mukim Mbajak ${genderCode}`;
      }

      // Default untuk Asrama / Mukim / Mondok / Pesantren
      if (sLower.includes('asrama') || sLower.includes('mukim') || sLower.includes('mondok') || sLower.includes('reguler') || sLower.includes('pondok') || sLower.includes('pesantren')) {
        return `Mukim Reguler ${genderCode}`;
      }

      // Jika tidak ada indikasi status mondok/non-mukim, biarkan kosong
      return '';
    }

    function processPpdbRows(rawAoA, sourceName) {
      if (!rawAoA || rawAoA.length === 0) return;
      currentPpdbRawAoA = rawAoA;

      const suffix = (document.getElementById('ppdbSuffixInput')?.value || '26').trim();
      const defaultPassword = (document.getElementById('ppdbPasswordInput')?.value || 'P@ssword123').trim();
      let fallbackDomain = (document.getElementById('ppdbDomainInput')?.value || 'gmail.com').trim().replace(/^@/, '');
      if (!fallbackDomain) fallbackDomain = 'gmail.com';

      // Cek apakah baris 0 adalah header
      let headerRow = rawAoA[0];
      let startIndex = 1;
      let colMap = detectPpdbColumnIndices(headerRow);

      // Jika kolom penting tidak terdeteksi di baris 0, cek apakah baris 0 langsung data
      if (colMap.namaSiswa === -1 && colMap.namaWali === -1) {
        startIndex = 0;
        // Gunakan posisi urutan default formulir Google Form PPDB
        colMap = {
          timestamp: 0,
          namaSiswa: 1,
          ttl: 2,
          gender: 3,
          emailSiswa: 4,
          hpSiswa: 5,
          alamatSiswa: 6,
          namaWali: 7,
          nikWali: 8,
          namaAyah: 9,
          namaIbu: 10,
          profesiAyah: 11,
          profesiIbu: 12,
          emailWali: 13,
          hpWali: 14,
          alamatWali: 15,
          rencanaStatus: 16,
          guruPendamping: 17,
          sekolahAsal: 18,
          briva: -1
        };
      }

      currentPpdbOrtuList = [];
      currentPpdbSiswaList = [];
      const teacherMap = {};

      for (let i = startIndex; i < rawAoA.length; i++) {
        const row = rawAoA[i];
        if (!row || !Array.isArray(row) || row.every(c => String(c || '').trim() === '')) continue;

        const getVal = (idx) => (idx !== -1 && row[idx] !== undefined) ? String(row[idx]).trim() : '';

        const namaSiswa = getVal(colMap.namaSiswa);
        if (!namaSiswa) continue; // Baris kosong tanpa nama santri dilewati

        const ttl = getVal(colMap.ttl);
        const gender = getVal(colMap.gender);
        const rawEmailSiswa = getVal(colMap.emailSiswa);
        const hpSiswa = getVal(colMap.hpSiswa);
        const alamatSiswa = getVal(colMap.alamatSiswa);

        let namaWali = getVal(colMap.namaWali);
        const nikWali = getVal(colMap.nikWali);
        const namaAyah = getVal(colMap.namaAyah);
        const namaIbu = getVal(colMap.namaIbu);
        const profesiAyah = getVal(colMap.profesiAyah);
        const profesiIbu = getVal(colMap.profesiIbu);
        const rawEmailWali = getVal(colMap.emailWali);
        const hpWali = getVal(colMap.hpWali) || hpSiswa;
        const alamatWali = getVal(colMap.alamatWali) || alamatSiswa;
        const alamatFinal = alamatSiswa || alamatWali || '';

        const rencanaStatus = getVal(colMap.rencanaStatus);
        const rawGuru = getVal(colMap.guruPendamping);
        const sekolahAsal = getVal(colMap.sekolahAsal);
        const brivaVal = colMap.briva !== -1 ? getVal(colMap.briva) : '';

        // Jika Nama Wali kosong, fallback ke Nama Ayah, lalu Nama Ibu
        if (!namaWali) {
          namaWali = namaAyah || namaIbu || `Wali ${namaSiswa}`;
        }

        // 1. Akun Orang Tua (11 Kolom Template)
        const usernameOrtu = generateParentUsername(namaWali, suffix);
        const emailOrtu = rawEmailWali ? rawEmailWali : `${usernameOrtu}@${fallbackDomain}`;

        currentPpdbOrtuList.push({
          namaWali: namaWali,
          email: emailOrtu,
          username: usernameOrtu,
          password: defaultPassword,
          ktp: nikWali,
          namaAyah: namaAyah,
          namaIbu: namaIbu,
          profesiAyah: profesiAyah,
          profesiIbu: profesiIbu,
          telepon: hpWali,
          alamat: alamatWali || alamatFinal,
          siswaTerkait: namaSiswa,
          briva: brivaVal || ''
        });

        // 2. Akun Siswa / Anak
        const usernameSiswa = generateStudentUsername(namaSiswa, suffix);
        const emailSiswa = rawEmailSiswa ? rawEmailSiswa : `${usernameSiswa}@${fallbackDomain}`;
        const finalStatus = formatPpdbStudentStatus(rencanaStatus, gender);

        currentPpdbSiswaList.push({
          namaSiswa: namaSiswa,
          username: usernameSiswa,
          email: emailSiswa,
          password: defaultPassword,
          gender: gender,
          hp: hpSiswa,
          alamat: alamatFinal,
          rencanaStatus: finalStatus,
          sekolahAsal: sekolahAsal,
          guru: rawGuru || 'Tanpa Guru Pendamping',
          namaWali: namaWali,
          briva: brivaVal || ''
        });

        // 3. Akumulasi Guru Pendamping
        const teacherClean = rawGuru.trim() || 'Tanpa Guru Pendamping';
        const teacherKey = normalizeTeacherKey(teacherClean);

        if (!teacherMap[teacherKey]) {
          teacherMap[teacherKey] = {
            displayName: teacherClean,
            count: 0,
            students: []
          };
        } else {
          // Pilih nama tampilan terformat paling rapi (memiliki titik/koma gelar lengkap atau lebih panjang)
          const cur = teacherMap[teacherKey].displayName;
          const scoreCur = (cur.includes('.') ? 15 : 0) + (cur.includes(',') ? 10 : 0) + cur.length;
          const scoreNew = (teacherClean.includes('.') ? 15 : 0) + (teacherClean.includes(',') ? 10 : 0) + teacherClean.length;
          if (scoreNew > scoreCur) {
            teacherMap[teacherKey].displayName = teacherClean;
          }
        }

        teacherMap[teacherKey].count += 1;
        teacherMap[teacherKey].students.push(namaSiswa);
      }

      // Konversi Guru Map ke Array & Urutkan Terbanyak
      currentPpdbGuruList = Object.values(teacherMap).sort((a, b) => b.count - a.count);

      // Perbarui UI
      const statusEl = document.getElementById('ppdbFileStatusText');
      if (statusEl && sourceName) {
        statusEl.textContent = `${sourceName} Ã¢â‚¬¢ ${currentPpdbSiswaList.length} Siswa Teranalisis`;
      }

      renderPpdbAll();
    }

    function reprocessCurrentPpdbData() {
      if (currentPpdbRawAoA && currentPpdbRawAoA.length > 0) {
        processPpdbRows(currentPpdbRawAoA, null);
      }
    }

    function resetPpdbAnalysis() {
      currentPpdbRawAoA = null;
      currentPpdbOrtuList = [];
      currentPpdbSiswaList = [];
      currentPpdbGuruList = [];

      const fileInput = document.getElementById('ppdbFileInput');
      if (fileInput) fileInput.value = '';
      const pasteInput = document.getElementById('ppdbPasteInput');
      if (pasteInput) pasteInput.value = '';
      const statusEl = document.getElementById('ppdbFileStatusText');
      if (statusEl) statusEl.textContent = 'Belum ada file dipilih';

      renderPpdbAll();
      soundReset();
      showToast('Data Direset', 'Semua data analisis formulir PPDB telah dibersihkan.');
    }

    function renderPpdbAll() {
      // Update Metrics
      const mOrtu = document.getElementById('metricPpdbOrtu');
      if (mOrtu) mOrtu.textContent = `${currentPpdbOrtuList.length} Akun`;

      const mSiswa = document.getElementById('metricPpdbSiswa');
      if (mSiswa) mSiswa.textContent = `${currentPpdbSiswaList.length} Akun`;

      const mGuru = document.getElementById('metricPpdbGuru');
      if (mGuru) mGuru.textContent = `${currentPpdbGuruList.length} Guru`;

      const mTotal = document.getElementById('metricPpdbTotal');
      if (mTotal) mTotal.textContent = `${currentPpdbSiswaList.length} Siswa`;

      // Update Tab Badges
      const bOrtu = document.getElementById('badgeSubtabOrtu');
      if (bOrtu) bOrtu.textContent = currentPpdbOrtuList.length;

      const bSiswa = document.getElementById('badgeSubtabSiswa');
      if (bSiswa) bSiswa.textContent = currentPpdbSiswaList.length;

      const bGuru = document.getElementById('badgeSubtabGuru');
      if (bGuru) bGuru.textContent = currentPpdbGuruList.length;

      // Update Ontrack Hero Overall Tasks Stat
      const heroTasks = document.getElementById('heroStatOverallTasks');
      if (heroTasks) {
        heroTasks.textContent = currentPpdbOrtuList.length + currentPpdbSiswaList.length + currentPpdbGuruList.length;
      }

      // Update Reference Bento Grid Card Metrics
      const bentoOrtu = document.getElementById('bentoOrtuCount');
      if (bentoOrtu) bentoOrtu.textContent = `${currentPpdbOrtuList.length} Ortu`;

      const bentoSiswa = document.getElementById('bentoSiswaCount');
      if (bentoSiswa) bentoSiswa.textContent = `${currentPpdbSiswaList.length} Siswa`;

      const bentoGuru = document.getElementById('bentoGuruCount');
      if (bentoGuru) bentoGuru.textContent = `${currentPpdbGuruList.length} Guru`;

      // Update Circular Arc Gauge Percentage
      const gaugeEl = document.getElementById('gaugePercentText');
      if (gaugeEl) {
        gaugeEl.textContent = currentPpdbSiswaList.length > 0 ? '98%' : '0%';
      }

      // Render Masing-masing Tabel
      renderPpdbOrtuTable();
      renderPpdbSiswaTable();
      renderPpdbGuruTable();
    }

    // --- PPDB DUAL-VIEW (MOBILE CARDS VS TABLE) STATE & ENGINE ---
    let currentPpdbViewMode = window.innerWidth < 640 ? 'cards' : 'table';

    function togglePpdbViewMode(mode) {
      currentPpdbViewMode = mode;
      const isCards = (mode === 'cards');

      // Containers Ortu
      const ortuCards = document.getElementById('ppdbOrtuCardsContainer');
      const ortuTable = document.getElementById('scrollWrapperPpdbOrtu');
      if (ortuCards) ortuCards.classList.toggle('hidden', !isCards);
      if (ortuTable) ortuTable.classList.toggle('hidden', isCards);

      // Containers Siswa
      const siswaCards = document.getElementById('ppdbSiswaCardsContainer');
      const siswaTable = document.getElementById('scrollWrapperPpdbSiswa');
      if (siswaCards) siswaCards.classList.toggle('hidden', !isCards);
      if (siswaTable) siswaTable.classList.toggle('hidden', isCards);

      // Segmented Toggle Buttons Styling
      const btnCards = document.getElementById('btnPpdbViewCards');
      const btnTable = document.getElementById('btnPpdbViewTable');
      if (btnCards && btnTable) {
        if (isCards) {
          btnCards.className = 'px-2.5 py-1 rounded-none transition-all flex items-center gap-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-none font-bold cursor-pointer';
          btnTable.className = 'px-2.5 py-1 rounded-none text-slate-600 dark:text-slate-400 transition-all flex items-center gap-1 cursor-pointer';
        } else {
          btnTable.className = 'px-2.5 py-1 rounded-none transition-all flex items-center gap-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-none font-bold cursor-pointer';
          btnCards.className = 'px-2.5 py-1 rounded-none text-slate-600 dark:text-slate-400 transition-all flex items-center gap-1 cursor-pointer';
        }
      }

      if (window.lucide) lucide.createIcons();
    }

    // Render Native Mobile Cards for Ortu / Wali
    function renderPpdbOrtuCards(list, searchQuery) {
      const container = document.getElementById('ppdbOrtuCardsContainer');
      if (!container) return;

      if (!list || list.length === 0) {
        container.innerHTML = `
          <div class="py-10 text-center text-slate-400 dark:text-slate-500 bg-white/60 dark:bg-white/5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 p-6">
            <i data-lucide="folder-up" class="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600"></i>
            <p class="font-bold text-slate-600 dark:text-slate-300 text-xs">Belum ada data orang tua</p>
            <p class="text-[11px] text-slate-400 mt-0.5">Unggah file Excel atau klik "Muat Contoh Data" di atas.</p>
          </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
      }

      container.innerHTML = list.map((item, idx) => {
        const origIdx = currentPpdbOrtuList.indexOf(item);
        const effectiveIdx = origIdx >= 0 ? origIdx : idx;

        return `
        <div class="bg-white dark:bg-[#131b2c] p-3 rounded-none border border-slate-200/90 dark:border-white/10 shadow-none space-y-2.5 transition-all">
          <!-- Card Header: No, Nama Wali, Siswa Terkait -->
          <div class="flex items-center justify-between gap-1.5">
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="w-6 h-6 rounded-none bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-[11px] font-black flex items-center justify-center shrink-0 tabular-nums">
                ${idx + 1}
              </span>
              <div class="min-w-0">
                <h4 class="font-extrabold text-[12px] sm:text-xs text-slate-900 dark:text-white truncate leading-tight">${highlightSearch(item.namaWali, searchQuery)}</h4>
                <div class="text-[9.5px] text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                  <i data-lucide="graduation-cap" class="w-3 h-3 text-blue-500 shrink-0"></i>
                  <span class="truncate">${highlightSearch(item.siswaTerkait || 'Santri Baru', searchQuery)}</span>
                </div>
              </div>
            </div>
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'ktp', 'No KTP')" 
              class="text-[9.5px] font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/10 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 px-2 py-0.5 rounded-none shrink-0 flex items-center gap-1 cursor-pointer transition-all" 
              title="Klik untuk menyalin No KTP"
            >
              <i data-lucide="id-card" class="w-2.5 h-2.5 text-slate-400"></i>
              <span>${highlightSearch(item.ktp || 'No NIK', searchQuery)}</span>
            </button>
          </div>

          <!-- Credentials Quick-Copy Pills (Kotak Tegas & Rapi) -->
          <div class="grid grid-cols-2 gap-1.5">
            <button 
              type="button" 
              onclick="copyToClipboard('${escapeHtml(item.username)}', 'Username Wali Disalin!', 'Username: ${escapeHtml(item.username)}')" 
              class="py-1.5 px-2.5 rounded-none bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 text-left hover:bg-indigo-500/20 active:scale-98 transition-all cursor-pointer min-w-0 flex flex-col justify-center"
              title="Klik salin username"
            >
              <div class="text-[8.5px] uppercase tracking-wider font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center justify-between">
                <span>Username</span>
                <i data-lucide="copy" class="w-2.5 h-2.5 opacity-60"></i>
              </div>
              <div class="font-mono font-bold text-[11px] text-indigo-950 dark:text-indigo-100 truncate mt-0.5">
                ${highlightSearch(item.username, searchQuery)}
              </div>
            </button>

            <button 
              type="button" 
              onclick="copyToClipboard('${escapeHtml(item.password)}', 'Kata Sandi Disalin!', 'Kata Sandi: ${escapeHtml(item.password)}')" 
              class="py-1.5 px-2.5 rounded-none bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 text-left hover:bg-amber-500/20 active:scale-98 transition-all cursor-pointer min-w-0 flex flex-col justify-center"
              title="Klik salin password"
            >
              <div class="text-[8.5px] uppercase tracking-wider font-extrabold text-amber-600 dark:text-amber-400 flex items-center justify-between">
                <span>Password</span>
                <i data-lucide="key" class="w-2.5 h-2.5 opacity-60"></i>
              </div>
              <div class="font-mono font-bold text-[11px] text-amber-950 dark:text-amber-100 truncate mt-0.5">
                ${escapeHtml(item.password)}
              </div>
            </button>
          </div>

          <!-- Compact Details: Email, Ortu, Telepon, Alamat -->
          <div class="text-[10px] text-slate-600 dark:text-slate-400 space-y-0.5 bg-slate-50/80 dark:bg-white/5 p-2 rounded-none border border-slate-100 dark:border-white/5">
            <div class="flex items-center justify-between gap-1.5">
              <span class="flex items-center gap-1.5 truncate">
                <i data-lucide="mail" class="w-3 h-3 text-sky-500 shrink-0"></i>
                <span class="truncate">${highlightSearch(item.email, searchQuery)}</span>
              </span>
              <button 
                type="button" 
                onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'email', 'Email Wali')" 
                class="text-[9.5px] font-bold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
              >
                Salin
              </button>
            </div>
            ${(item.namaAyah || item.namaIbu) ? `
            <div class="flex items-center justify-between gap-1.5 pt-0.5 border-t border-slate-100 dark:border-white/5">
              <span class="flex items-center gap-1.5 truncate text-[10px]">
                <i data-lucide="user-check" class="w-3 h-3 text-blue-500 shrink-0"></i>
                <span class="truncate">Ayah: ${escapeHtml(item.namaAyah || '-')}${item.namaIbu ? ' | Ibu: ' + escapeHtml(item.namaIbu) : ''}</span>
              </span>
              <button 
                type="button" 
                onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'namaAyah', 'Nama Ayah')" 
                class="text-[9.5px] font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
              >
                Salin
              </button>
            </div>` : ''}
            ${item.telepon ? `
            <div class="flex items-center justify-between gap-1.5 pt-0.5 border-t border-slate-100 dark:border-white/5">
              <span class="flex items-center gap-1.5 font-mono text-[10px]">
                <i data-lucide="phone" class="w-3 h-3 text-emerald-500 shrink-0"></i>
                <span>${escapeHtml(item.telepon)}</span>
              </span>
              <button 
                type="button" 
                onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'telepon', 'No Telepon')" 
                class="text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
              >
                Salin
              </button>
            </div>` : ''}
            ${item.alamat ? `
            <div class="flex items-center justify-between gap-1.5 pt-0.5 border-t border-slate-100 dark:border-white/5">
              <span class="flex items-center gap-1.5 truncate text-[10px]">
                <i data-lucide="map-pin" class="w-3 h-3 text-rose-500 shrink-0"></i>
                <span class="truncate">${escapeHtml(item.alamat)}</span>
              </span>
              <button 
                type="button" 
                onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'alamat', 'Alamat')" 
                class="text-[9.5px] font-bold text-rose-600 dark:text-rose-400 hover:underline shrink-0"
              >
                Salin
              </button>
            </div>` : ''}
          </div>

          <!-- Action Buttons Ortu: Kotak & Anti-Tabrakan 2 Kolom -->
          <div class="grid grid-cols-2 gap-1.5 pt-0.5">
            <button 
              type="button" 
              onclick="copySingleParentWa(${effectiveIdx})" 
              class="h-8 py-1 px-2 rounded-none bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-[10.5px] sm:text-[11px] flex items-center justify-center gap-1.5 shadow-none transition-all cursor-pointer min-w-0 whitespace-nowrap"
              title="Salin Pesan WA Akun Wali"
            >
              <i data-lucide="message-circle" class="w-3.5 h-3.5 shrink-0"></i>
              <span>WA Wali</span>
            </button>
            <button 
              type="button" 
              onclick="copySingleParentData(${effectiveIdx})" 
              class="h-8 py-1 px-2 rounded-none bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-[10.5px] sm:text-[11px] flex items-center justify-center gap-1.5 shadow-none transition-all cursor-pointer min-w-0 whitespace-nowrap"
              title="Salin Rincian Akun Wali"
            >
              <i data-lucide="key" class="w-3.5 h-3.5 shrink-0"></i>
              <span>Akun</span>
            </button>
            <button 
              type="button" 
              onclick="copySingleParentRow(${effectiveIdx})" 
              class="col-span-2 h-8 py-1 px-2 rounded-none bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 font-bold text-[10.5px] sm:text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer min-w-0 whitespace-nowrap border border-slate-200 dark:border-slate-700"
              title="Salin 1 Baris Format Excel"
            >
              <i data-lucide="sheet" class="w-3.5 h-3.5 shrink-0"></i>
              <span>Salin Baris Excel</span>
            </button>
          </div>
        </div>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();
    }

    // Render Native Mobile Cards for Siswa / Santri (Tampilan Terstruktur Mirip Tabel dengan Data Rinci Real)
    function renderPpdbSiswaCards(list, searchQuery) {
      const container = document.getElementById('ppdbSiswaCardsContainer');
      if (!container) return;

      if (!list || list.length === 0) {
        container.innerHTML = `
          <div class="py-10 text-center text-slate-400 dark:text-slate-500 bg-white/60 dark:bg-white/5 rounded-none border border-dashed border-slate-200 dark:border-white/10 p-6">
            <i data-lucide="folder-up" class="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600"></i>
            <p class="font-bold text-slate-600 dark:text-slate-300 text-xs">Belum ada data siswa</p>
            <p class="text-[11px] text-slate-400 mt-0.5">Silakan unggah file Excel PPDB atau tempel data.</p>
          </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
      }

      container.innerHTML = list.map((item, idx) => {
        const origIdx = currentPpdbSiswaList.indexOf(item);
        const effectiveIdx = origIdx >= 0 ? origIdx : idx;
        const brivaVal = getAdminBrivaNumber(item);

        const hasStatus = Boolean(item.rencanaStatus && item.rencanaStatus.trim());
        const isMukim = hasStatus && !item.rencanaStatus.toLowerCase().includes('non');
        const statusBgStyle = !hasStatus 
          ? 'background-color: #f1f5f9; color: #64748b; border-color: #cbd5e1;' 
          : isMukim 
            ? 'background-color: #d2e7d6; color: #0d4f21; border-color: #a6d5ae;' 
            : 'background-color: #fff59d; color: #5d4037; border-color: #ffe082;';
        const statusText = hasStatus ? escapeHtml(item.rencanaStatus) : '- Kosong -';

        return `
        <div class="bg-white dark:bg-[#131b2c] p-3 sm:p-3.5 rounded-none border border-slate-200/90 dark:border-white/10 shadow-none space-y-2.5 transition-all">
          <!-- 1. Header: No, Nama Siswa, JK, Status Badge -->
          <div class="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-6 h-6 rounded-none bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-black flex items-center justify-center shrink-0 tabular-nums">
                ${idx + 1}
              </span>
              <div class="min-w-0">
                <h4 class="font-extrabold text-[13px] text-slate-900 dark:text-white truncate leading-tight">
                  ${highlightSearch(item.namaSiswa, searchQuery)}
                </h4>
                <div class="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span class="inline-flex items-center gap-1 font-bold ${item.gender && item.gender.toLowerCase().startsWith('l') ? 'text-blue-600 dark:text-blue-400' : 'text-pink-600 dark:text-pink-400'}">
                    <i data-lucide="user" class="w-3 h-3"></i>
                    <span>${escapeHtml(item.gender || '-')}</span>
                  </span>
                  <span class="text-slate-300 dark:text-slate-600">•</span>
                  <span class="truncate">${escapeHtml(item.sekolahAsal || 'Sekolah Asal -')}</span>
                </div>
              </div>
            </div>
            <!-- Status Santri Button (Mukim / Non Mukim / Kosong) -->
            <button 
              type="button" 
              onclick="cyclePpdbStudentStatus(${effectiveIdx})" 
              class="px-2 py-0.5 rounded-none text-[10px] font-extrabold border shadow-none transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0 select-none" 
              style="${statusBgStyle}"
              title="Klik untuk mengubah status santri (Kosong / Mukim / Non Mukim)"
            >
              <span class="truncate max-w-[110px]">${statusText}</span>
              <i data-lucide="refresh-cw" class="w-2.5 h-2.5 opacity-60 shrink-0"></i>
            </button>
          </div>

          <!-- 2. Structured Table-like Grid (Mini-Table Data Rinci Real) -->
          <div class="border border-slate-200 dark:border-slate-800 rounded-none overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 text-[11px] bg-slate-50/50 dark:bg-slate-900/30">
            <!-- Row 1: Nomor BRIVA & Jenis Kelamin -->
            <div class="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800">
              <div class="p-2">
                <span class="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 block">Nomor BRIVA</span>
                <div class="flex items-center gap-1 mt-0.5">
                  <input 
                    type="text" 
                    value="${escapeHtml(item.briva || '')}" 
                    placeholder="${escapeHtml(brivaVal)}" 
                    oninput="updatePpdbRowBriva('siswa', ${effectiveIdx}, this.value)" 
                    class="w-full h-6 px-1.5 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-none font-mono font-bold text-xs text-emerald-950 dark:text-emerald-100 outline-none focus:ring-1 focus:ring-emerald-500" 
                    title="Nomor BRIVA kustom santri ini"
                  />
                  <button type="button" onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'briva', 'Nomor BRIVA')" class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 p-0.5 cursor-pointer shrink-0" title="Salin BRIVA">
                    <i data-lucide="copy" class="w-3 h-3"></i>
                  </button>
                </div>
              </div>
              <div class="p-2">
                <span class="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 block">Jenis Kelamin</span>
                <div class="flex items-center justify-between gap-1 mt-0.5">
                  <span class="font-semibold text-slate-800 dark:text-slate-200 text-xs truncate">${escapeHtml(item.gender || '-')}</span>
                  <button type="button" onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'gender', 'Jenis Kelamin')" class="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer" title="Salin JK">
                    <i data-lucide="copy" class="w-3 h-3"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Row 2: Username & Password -->
            <div class="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 bg-white dark:bg-[#131b2c]">
              <div class="p-2">
                <span class="text-[9px] uppercase tracking-wider font-bold text-indigo-500 dark:text-indigo-400 block">Username</span>
                <div class="flex items-center justify-between gap-1 mt-0.5">
                  <span class="font-mono font-bold text-indigo-950 dark:text-indigo-200 text-xs truncate">${highlightSearch(item.username, searchQuery)}</span>
                  <button type="button" onclick="copyToClipboard('${escapeHtml(item.username)}', 'Username Siswa Disalin!', 'Username: ${escapeHtml(item.username)}')" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 p-0.5 cursor-pointer" title="Salin Username">
                    <i data-lucide="copy" class="w-3 h-3"></i>
                  </button>
                </div>
              </div>
              <div class="p-2">
                <span class="text-[9px] uppercase tracking-wider font-bold text-amber-500 dark:text-amber-400 block">Kata Sandi</span>
                <div class="flex items-center justify-between gap-1 mt-0.5">
                  <span class="font-mono font-bold text-amber-950 dark:text-amber-200 text-xs truncate">${escapeHtml(item.password)}</span>
                  <button type="button" onclick="copyToClipboard('${escapeHtml(item.password)}', 'Kata Sandi Disalin!', 'Kata Sandi: ${escapeHtml(item.password)}')" class="text-amber-600 dark:text-amber-400 hover:text-amber-700 p-0.5 cursor-pointer" title="Salin Password">
                    <i data-lucide="copy" class="w-3 h-3"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Row 3: No HP & Email -->
            <div class="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800">
              <div class="p-2">
                <span class="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 block">No HP Siswa</span>
                <div class="flex items-center justify-between gap-1 mt-0.5">
                  <span class="font-mono font-medium text-slate-800 dark:text-slate-200 text-xs truncate">${escapeHtml(item.hp || '-')}</span>
                  <button type="button" onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'hp', 'No HP Siswa')" class="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer" title="Salin No HP">
                    <i data-lucide="copy" class="w-3 h-3"></i>
                  </button>
                </div>
              </div>
              <div class="p-2">
                <span class="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 block">Email Siswa</span>
                <div class="flex items-center justify-between gap-1 mt-0.5">
                  <span class="text-sky-700 dark:text-sky-300 text-[11px] truncate" title="${escapeHtml(item.email || '-')}">${highlightSearch(item.email || '-', searchQuery)}</span>
                  <button type="button" onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'email', 'Email Siswa')" class="text-sky-600 dark:text-sky-400 hover:text-sky-700 p-0.5 cursor-pointer" title="Salin Email">
                    <i data-lucide="copy" class="w-3 h-3"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Row 4: Alamat Lengkap Siswa (Full Width Real Detail) -->
            <div class="p-2 bg-white dark:bg-[#131b2c]">
              <div class="flex items-center justify-between">
                <span class="text-[9px] uppercase tracking-wider font-bold text-rose-500 dark:text-rose-400 flex items-center gap-1">
                  <i data-lucide="map-pin" class="w-2.5 h-2.5"></i> Alamat Lengkap Siswa
                </span>
                <button type="button" onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'alamat', 'Alamat Siswa')" class="text-rose-600 dark:text-rose-400 hover:underline text-[9.5px] font-bold cursor-pointer">
                  Salin
                </button>
              </div>
              <p class="text-slate-700 dark:text-slate-300 text-[11px] mt-0.5 leading-relaxed font-medium">
                ${highlightSearch(item.alamat || '-', searchQuery)}
              </p>
            </div>

            <!-- Row 5: Sekolah Asal & Guru Pendamping -->
            <div class="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800">
              <div class="p-2">
                <span class="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 block">Sekolah Asal</span>
                <div class="flex items-center justify-between gap-1 mt-0.5">
                  <span class="text-slate-800 dark:text-slate-200 text-[11px] truncate">${escapeHtml(item.sekolahAsal || '-')}</span>
                  <button type="button" onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'sekolahAsal', 'Sekolah Asal')" class="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer" title="Salin Sekolah Asal">
                    <i data-lucide="copy" class="w-3 h-3"></i>
                  </button>
                </div>
              </div>
              <div class="p-2">
                <span class="text-[9px] uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 block">Guru Pendamping</span>
                <div class="flex items-center justify-between gap-1 mt-0.5">
                  <span class="font-semibold text-emerald-900 dark:text-emerald-300 text-[11px] truncate">${escapeHtml(item.guru || '-')}</span>
                  <button type="button" onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'guru', 'Guru Pendamping')" class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 p-0.5 cursor-pointer" title="Salin Guru">
                    <i data-lucide="copy" class="w-3 h-3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Action Buttons (4 Tombol Grid Kotak Anti-Tabrakan) -->
          <div class="grid grid-cols-2 gap-1.5 pt-0.5">
            <button 
              type="button" 
              onclick="copySingleStudentWa(${effectiveIdx})" 
              class="h-8 py-1 px-2 rounded-none bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-[10.5px] flex items-center justify-center gap-1.5 shadow-none transition-all cursor-pointer min-w-0 whitespace-nowrap"
              title="Salin WA Lengkap & Panduan BRIVA"
            >
              <i data-lucide="message-circle" class="w-3.5 h-3.5 shrink-0"></i>
              <span>WA + BRIVA</span>
            </button>
            <button 
              type="button" 
              onclick="copySingleStudentAccountOnly(${effectiveIdx})" 
              class="h-8 py-1 px-2 rounded-none bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-[10.5px] flex items-center justify-center gap-1.5 shadow-none transition-all cursor-pointer min-w-0 whitespace-nowrap"
              title="Salin Khusus Akun Saja"
            >
              <i data-lucide="key" class="w-3.5 h-3.5 shrink-0"></i>
              <span>Akun Saja</span>
            </button>
            <button 
              type="button" 
              onclick="openSingleStudentWhatsApp(${effectiveIdx}, false)" 
              class="h-8 py-1 px-2 rounded-none bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-[10.5px] flex items-center justify-center gap-1.5 shadow-none transition-all cursor-pointer min-w-0 whitespace-nowrap"
              title="Buka WA Otomatis"
            >
              <i data-lucide="send" class="w-3.5 h-3.5 shrink-0"></i>
              <span>Kirim WA</span>
            </button>
            <button 
              type="button" 
              onclick="copySingleStudentRow(${effectiveIdx})" 
              class="h-8 py-1 px-2 rounded-none bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 font-bold text-[10.5px] flex items-center justify-center gap-1.5 transition-all cursor-pointer min-w-0 whitespace-nowrap border border-slate-200 dark:border-slate-700"
              title="Salin 1 Baris Format Excel"
            >
              <i data-lucide="sheet" class="w-3.5 h-3.5 shrink-0"></i>
              <span>Salin Excel</span>
            </button>
          </div>
        </div>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();
    }

    function renderPpdbOrtuTable() {
      const tbody = document.getElementById('tbodyPpdbOrtu');
      if (!tbody) return;

      const searchQuery = (document.getElementById('searchPpdbOrtuInput')?.value || '').trim().toLowerCase();

      if (currentPpdbOrtuList.length === 0) {
        renderPpdbOrtuCards([], searchQuery);
        tbody.innerHTML = `
          <tr>
            <td colspan="14" class="py-12 text-center text-slate-400">
              <i data-lucide="folder-up" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
              <p class="font-medium">Belum ada data</p>
              <p class="text-[11px] text-slate-400">Silakan unggah file Excel PPDB atau klik "Muat Contoh Data" di atas.</p>
            </td>
          </tr>
        `;
        if (window.lucide) lucide.createIcons();
        return;
      }

      let list = currentPpdbOrtuList;
      if (searchQuery) {
        list = list.filter(item => {
          return (item.namaWali && item.namaWali.toLowerCase().includes(searchQuery)) ||
                 (item.username && item.username.toLowerCase().includes(searchQuery)) ||
                 (item.ktp && item.ktp.toLowerCase().includes(searchQuery)) ||
                 (item.email && item.email.toLowerCase().includes(searchQuery)) ||
                 (item.siswaTerkait && item.siswaTerkait.toLowerCase().includes(searchQuery)) ||
                 (item.namaAyah && item.namaAyah.toLowerCase().includes(searchQuery)) ||
                 (item.namaIbu && item.namaIbu.toLowerCase().includes(searchQuery));
        });
      }

      if (list.length === 0) {
        renderPpdbOrtuCards([], searchQuery);
        tbody.innerHTML = `
          <tr>
            <td colspan="14" class="py-10 text-center text-slate-400">
              <i data-lucide="search-x" class="w-7 h-7 mx-auto mb-1.5 text-slate-300"></i>
              <p class="font-medium text-slate-600">Data orang tua tidak ditemukan</p>
              <p class="text-[11px] text-slate-400">Tidak ada nama atau NIK yang cocok dengan "${escapeHtml(searchQuery)}".</p>
            </td>
          </tr>
        `;
        if (window.lucide) lucide.createIcons();
        return;
      }

      renderPpdbOrtuCards(list, searchQuery);
      tbody.innerHTML = list.map((item, idx) => {
        const origIdx = currentPpdbOrtuList.indexOf(item);
        const effectiveIdx = origIdx >= 0 ? origIdx : idx;
        return `
        <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-100 dark:border-slate-800">
          <!-- 1. No (Sticky Left) -->
          <td class="py-1.5 sm:py-2.5 px-1 sm:px-2 w-8 sm:w-10 text-center text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs font-bold tabular-nums sticky left-0 bg-white dark:bg-[#131b2c] z-10 shadow-[1px_0_0_#e2e8f0] dark:shadow-[1px_0_0_#1e293b]">${idx + 1}</td>

          <!-- 2. Nama Orangtua / Wali* (Sticky Left) -->
          <td class="py-1.5 sm:py-2.5 px-1.5 sm:px-3 font-bold text-slate-900 dark:text-white whitespace-nowrap text-xs sm:text-[13px] sticky left-8 sm:left-10 bg-white dark:bg-[#131b2c] z-10 shadow-[3px_0_6px_-2px_rgba(0,0,0,0.08)] dark:shadow-[3px_0_6px_-2px_rgba(0,0,0,0.5)] w-[110px] sm:w-auto min-w-[100px] sm:min-w-[190px] max-w-[120px] sm:max-w-none">
            <div class="flex items-center gap-1.5 sm:gap-2">
              <span class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-[10px] sm:text-xs font-black flex items-center justify-center shrink-0">
                ${item.namaWali ? item.namaWali.charAt(0).toUpperCase() : 'W'}
              </span>
              <button 
                type="button" 
                onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'namaWali', 'Nama Wali')" 
                class="inline-flex items-center gap-1 text-left font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 group cursor-pointer truncate" 
                title="Klik untuk menyalin Nama Wali"
              >
                <span class="truncate">${highlightSearch(item.namaWali, searchQuery)}</span>
                <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"></i>
              </button>
            </div>
          </td>

          <!-- 3. Opsi Salin per Wali (3 Pilihan Cepat) -->
          <td class="py-1 sm:py-2 px-1.5 sm:px-2.5 whitespace-nowrap text-center">
            <div class="inline-flex items-center gap-0.5 sm:gap-1.5 bg-slate-50 dark:bg-slate-800/60 p-0.5 sm:p-1 rounded-none border border-slate-200 dark:border-slate-700 shadow-2xs">
              <button 
                type="button" 
                onclick="copySingleParentData(${effectiveIdx})" 
                class="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-none bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-[9.5px] sm:text-[11px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                title="Salin Rincian Akun Wali ${escapeHtml(item.namaWali)}"
              >
                <i data-lucide="key" class="w-3 h-3 shrink-0"></i>
                <span class="hidden sm:inline">Salin Akun</span>
                <span class="inline sm:hidden">Akun</span>
              </button>
              <button 
                type="button" 
                onclick="copySingleParentWa(${effectiveIdx})" 
                class="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-none bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-[9.5px] sm:text-[11px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                title="Salin Pesan WA Siap Kirim ke Wali Santri"
              >
                <i data-lucide="message-circle" class="w-3 h-3 shrink-0"></i>
                <span>WA</span>
              </button>
              <button 
                type="button" 
                onclick="copySingleParentRow(${effectiveIdx})" 
                class="px-1 sm:px-2 py-0.5 sm:py-1 rounded-none bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-bold text-[9.5px] sm:text-[11px] flex items-center gap-0.5 sm:gap-1 shadow-2xs transition-all cursor-pointer"
                title="Salin 1 Baris Tabel Format Excel"
              >
                <i data-lucide="sheet" class="w-3 h-3 shrink-0"></i>
                <span>Baris</span>
              </button>
            </div>
          </td>

          <!-- 3. Email* -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'email', 'Email Wali')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800 text-sky-950 dark:text-sky-200 font-semibold shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin email"
            >
              <i data-lucide="mail" class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0"></i>
              <span>${highlightSearch(item.email, searchQuery)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 4. Nama Pengguna* -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'username', 'Username Wali')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200 font-bold shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin username"
            >
              <i data-lucide="user" class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0"></i>
              <span>${highlightSearch(item.username, searchQuery)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 5. Kata Sandi* -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'password', 'Kata Sandi')" 
              class="ppdb-credential-pwd inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 font-bold shadow-2xs transition-all cursor-pointer text-left font-mono select-none group" 
              title="Klik untuk menyalin kata sandi"
            >
              <i data-lucide="key" class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0"></i>
              <span class="font-mono font-bold">${escapeHtml(item.password)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 6. KTP Orangtua / Wali (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'ktp', 'No KTP')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 text-slate-900 dark:text-slate-100 font-bold tabular-nums tracking-wide shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin No KTP / NIK"
            >
              <i data-lucide="id-card" class="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-600 shrink-0"></i>
              <span>${highlightSearch(item.ktp || '-', searchQuery)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 7. Nama Ayah (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'namaAyah', 'Nama Ayah')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-700 hover:border-blue-300 text-slate-800 dark:text-slate-100 font-semibold shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin Nama Ayah"
            >
              <i data-lucide="user-check" class="w-3.5 h-3.5 text-blue-500 shrink-0"></i>
              <span>${highlightSearch(item.namaAyah || '-', searchQuery)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 8. Nama Ibu (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'namaIbu', 'Nama Ibu')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-slate-50 dark:bg-slate-800/80 hover:bg-pink-50 dark:hover:bg-pink-950/60 border border-slate-200 dark:border-slate-700 hover:border-pink-300 text-slate-800 dark:text-slate-100 font-semibold shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin Nama Ibu"
            >
              <i data-lucide="heart" class="w-3.5 h-3.5 text-pink-500 shrink-0"></i>
              <span>${highlightSearch(item.namaIbu || '-', searchQuery)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 9. Profesi Ayah (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'profesiAyah', 'Profesi Ayah')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-200 font-medium shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin Profesi Ayah"
            >
              <i data-lucide="briefcase" class="w-3.5 h-3.5 text-slate-500 shrink-0"></i>
              <span>${escapeHtml(item.profesiAyah || '-')}</span>
              <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 10. Profesi Ibu (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'profesiIbu', 'Profesi Ibu')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-200 font-medium shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin Profesi Ibu"
            >
              <i data-lucide="briefcase" class="w-3.5 h-3.5 text-slate-500 shrink-0"></i>
              <span>${escapeHtml(item.profesiIbu || '-')}</span>
              <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 11. Telepon (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'telepon', 'No Telepon')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 text-slate-800 dark:text-slate-100 font-semibold tabular-nums shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin No Telepon / WA"
            >
              <i data-lucide="phone" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
              <span>${escapeHtml(item.telepon || '-')}</span>
              <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 12. Alamat (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 text-xs sm:text-[13px] max-w-xs">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'alamat', 'Alamat')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-200 shadow-2xs transition-all cursor-pointer text-left truncate max-w-full group" 
              title="${escapeHtml(item.alamat || '-')} (Klik untuk salin)"
            >
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-rose-500 shrink-0"></i>
              <span class="truncate">${escapeHtml(item.alamat || '-')}</span>
              <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 13. Siswa Terkait (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap bg-slate-50/80 dark:bg-slate-900/40 text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('ortu', ${effectiveIdx}, 'siswaTerkait', 'Siswa Terkait')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 hover:border-blue-300 text-blue-800 dark:text-sky-300 font-bold shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin Nama Siswa Terkait"
            >
              <i data-lucide="graduation-cap" class="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0"></i>
              <span>${highlightSearch(item.siswaTerkait || '-', searchQuery)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>
        </tr>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();
      initDragToScroll('scrollWrapperPpdbOrtu');
    }

    // --- FITUR SALIN DATA PER WALI / ORANG TUA ---
    // 1. Salin Kartu Akun Lengkap Per Wali
    function copySingleParentData(idx) {
      const item = currentPpdbOrtuList[idx];
      if (!item) return;

      const text = [
        `*AKUN RESMI ORANG TUA / WALI*`,
        `Yayasan Tarbiyatul Aulad Tegalrejo`,
        `-----------------------------------`,
        `Nama Wali Santri: ${item.namaWali}`,
        `Nama Pengguna   : ${item.username}`,
        `Kata Sandi      : ${item.password}`,
        `Email Akun      : ${item.email}`,
        `No KTP / NIK    : ${item.ktp || '-'}`,
        `Nama Ayah       : ${item.namaAyah || '-'}`,
        `Nama Ibu        : ${item.namaIbu || '-'}`,
        `Profesi Ayah    : ${item.profesiAyah || '-'}`,
        `Profesi Ibu     : ${item.profesiIbu || '-'}`,
        `No Telepon / WA : ${item.telepon || '-'}`,
        `Alamat          : ${item.alamat || '-'}`,
        `Santri Terkait  : ${item.siswaTerkait || '-'}`
      ].join('\n');

      copyToClipboard(text, 'Akun Wali Disalin!', `Data login wali ${item.namaWali} siap dibagikan.`);
    }

    // 2. Salin Pesan Format WhatsApp Profesional & Simpel (Username, Password, Kode BRIVA Admin)
    function copySingleParentWa(idx) {
      const item = currentPpdbOrtuList[idx];
      if (!item) return;

      const namaWali = item.namaWali || 'Bapak/Ibu Wali';
      const namaSantri = item.siswaTerkait || 'Santri Baru';
      const username = item.username || item.siswaTerkait || 'santri';
      const password = item.password || 'P@ssword123';
      const kodeSekolah = '1600';
      const noReg = getAdminBrivaNumber(item);

      const text = [
        `*YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN*`,
        ``,
        `Assalamu'alaikum Warahmatullahi Wabarakatuh,`,
        ``,
        `Kepada Yth. Bapak/Ibu Wali dari ananda *${namaSantri}*,`,
        `Berikut rincian informasi akun resmi portal siswa:`,
        ``,
        `👤 *Username:* \`${username}\``,
        `🔑 *Password:* \`${password}\``,
        `🏫 *Kode Sekolah:* \`${kodeSekolah}\``,
        ...(noReg ? [
          ``,
          `────────────────────`,
          `📋 *No. Registrasi:* \`${noReg}\``,
          `────────────────────`
        ] : []),
        ``,
        `📌 *Catatan Penting:*`,
        `• Huruf pertama pada kata sandi wajib menggunakan huruf kapital (*P* besar): \`${password}\`.`,
        `• Mohon simpan data akun ini dengan baik untuk keperluan login dan informasi berkala siswa.`,
        ``,
        `Jazakumullah Khairan Katsiran atas kerja sama dan amanah Bapak/Ibu.`,
        ``,
        `Wassalamu'alaikum Warahmatullahi Wabarakatuh.`,
        `_Admin Junio Smart_`
      ].filter(line => line !== null).join('\n');

      copyToClipboard(text, 'Pesan WA Wali Disalin!', `Format pesan resmi untuk ${namaWali} siap dikirim.`);
    }

    // 3. Salin 1 Baris Data Excel/TSV (11 Kolom Sesuai Format Resmi)
    function copySingleParentRow(idx) {
      const item = currentPpdbOrtuList[idx];
      if (!item) return;

      const row = [
        item.namaWali || '',
        item.email || '',
        item.username || '',
        item.password || '',
        item.ktp ? `'${item.ktp}` : '',
        item.namaAyah || '',
        item.namaIbu || '',
        item.profesiAyah || '',
        item.profesiIbu || '',
        item.telepon ? `'${item.telepon}` : '',
        item.alamat || ''
      ].join('\t');

      copyToClipboard(row, '1 Baris Disalin!', `Baris 11 kolom wali ${item.namaWali} siap ditempel ke Excel.`);
    }

    function renderPpdbSiswaTable() {
      const tbody = document.getElementById('tbodyPpdbSiswa');
      if (!tbody) return;

      const searchQuery = (document.getElementById('searchPpdbSiswaInput')?.value || '').trim().toLowerCase();

      if (currentPpdbSiswaList.length === 0) {
        renderPpdbSiswaCards([], searchQuery);
        tbody.innerHTML = `
          <tr>
            <td colspan="13" class="py-12 text-center text-slate-400">
              <i data-lucide="folder-up" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
              <p class="font-medium">Belum ada data siswa</p>
            </td>
          </tr>
        `;
        if (window.lucide) lucide.createIcons();
        return;
      }

      let list = currentPpdbSiswaList;
      if (searchQuery) {
        list = list.filter(item => {
          const br = item.briva || getAdminBrivaNumber(item);
          return (item.namaSiswa && item.namaSiswa.toLowerCase().includes(searchQuery)) ||
                 (item.username && item.username.toLowerCase().includes(searchQuery)) ||
                 (item.email && item.email.toLowerCase().includes(searchQuery)) ||
                 (item.gender && item.gender.toLowerCase().includes(searchQuery)) ||
                 (item.hp && item.hp.toLowerCase().includes(searchQuery)) ||
                 (item.alamat && item.alamat.toLowerCase().includes(searchQuery)) ||
                 (br && br.toLowerCase().includes(searchQuery)) ||
                 (item.rencanaStatus && item.rencanaStatus.toLowerCase().includes(searchQuery)) ||
                 (item.sekolahAsal && item.sekolahAsal.toLowerCase().includes(searchQuery)) ||
                 (item.guru && item.guru.toLowerCase().includes(searchQuery));
        });
      }

      if (list.length === 0) {
        renderPpdbSiswaCards([], searchQuery);
        tbody.innerHTML = `
          <tr>
            <td colspan="13" class="py-10 text-center text-slate-400">
              <i data-lucide="search-x" class="w-7 h-7 mx-auto mb-1.5 text-slate-300"></i>
              <p class="font-medium text-slate-600">Siswa tidak ditemukan</p>
              <p class="text-[11px] text-slate-400">Tidak ada santri yang cocok dengan "${escapeHtml(searchQuery)}".</p>
            </td>
          </tr>
        `;
        if (window.lucide) lucide.createIcons();
        return;
      }

      renderPpdbSiswaCards(list, searchQuery);
      tbody.innerHTML = list.map((item, idx) => {
        const origIdx = currentPpdbSiswaList.indexOf(item);
        const effectiveIdx = origIdx >= 0 ? origIdx : idx;
        const brivaVal = getAdminBrivaNumber(item);

        const hasStatus = Boolean(item.rencanaStatus && item.rencanaStatus.trim());
        const isMukim = hasStatus && !item.rencanaStatus.toLowerCase().includes('non');
        const statusBgStyle = !hasStatus 
          ? 'background-color: #f1f5f9; color: #64748b; border-color: #cbd5e1;' 
          : isMukim 
            ? 'background-color: #d2e7d6; color: #0d4f21; border-color: #a6d5ae;' 
            : 'background-color: #fff59d; color: #5d4037; border-color: #ffe082;';
        const statusText = hasStatus ? escapeHtml(item.rencanaStatus) : '- Kosong -';

        return `
        <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors border-b border-slate-100 dark:border-slate-800">
          <!-- 1. No (Sticky Left) -->
          <td class="py-1.5 sm:py-2.5 px-1 sm:px-2 w-8 sm:w-10 text-center text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs font-bold tabular-nums sticky left-0 bg-white dark:bg-[#131b2c] z-10 shadow-[1px_0_0_#e2e8f0] dark:shadow-[1px_0_0_#1e293b]">${idx + 1}</td>
          
          <!-- 2. Nama Lengkap Siswa* (Sticky Left) -->
          <td class="py-1.5 sm:py-2.5 px-1.5 sm:px-3 font-bold text-slate-900 dark:text-white whitespace-nowrap text-xs sm:text-[13px] sticky left-8 sm:left-10 bg-white dark:bg-[#131b2c] z-10 shadow-[3px_0_6px_-2px_rgba(0,0,0,0.08)] dark:shadow-[3px_0_6px_-2px_rgba(0,0,0,0.5)] w-[105px] sm:w-auto min-w-[95px] sm:min-w-[180px] max-w-[115px] sm:max-w-none">
            <div class="flex items-center gap-1.5 sm:gap-2">
              <span class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] sm:text-xs font-black flex items-center justify-center shrink-0">
                ${item.namaSiswa ? item.namaSiswa.charAt(0).toUpperCase() : 'S'}
              </span>
              <button 
                type="button" 
                onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'namaSiswa', 'Nama Siswa')" 
                class="inline-flex items-center gap-1 text-left font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 group cursor-pointer truncate" 
                title="Klik untuk menyalin Nama Siswa"
              >
                <span class="truncate">${highlightSearch(item.namaSiswa, searchQuery)}</span>
                <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"></i>
              </button>
            </div>
          </td>

          <!-- 3. Opsi Salin per Anak (WA Lengkap, Khusus Akun, Direct WA, Baris Excel) -->
          <td class="py-1 sm:py-2 px-1.5 sm:px-2.5 whitespace-nowrap text-center">
            <div class="inline-flex items-center gap-0.5 sm:gap-1.5 bg-slate-50 dark:bg-slate-800/60 p-0.5 sm:p-1 rounded-none border border-slate-200 dark:border-slate-700 shadow-2xs">
              <button 
                type="button" 
                onclick="copySingleStudentWa(${effectiveIdx})" 
                class="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-none bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-[9.5px] sm:text-[11px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                title="Salin Pesan WA Lengkap (Akun + Petunjuk BRIVA)"
              >
                <i data-lucide="message-circle" class="w-3 h-3 shrink-0"></i>
                <span class="hidden sm:inline">WA + BRIVA</span>
                <span class="inline sm:hidden">WA</span>
              </button>
              <button 
                type="button" 
                onclick="copySingleStudentAccountOnly(${effectiveIdx})" 
                class="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-none bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-[9.5px] sm:text-[11px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                title="Salin Khusus Akun (Username & Password)"
              >
                <i data-lucide="key" class="w-3 h-3 shrink-0"></i>
                <span class="hidden sm:inline">Akun Saja</span>
                <span class="inline sm:hidden">Akun</span>
              </button>
              <button 
                type="button" 
                onclick="openSingleStudentWhatsApp(${effectiveIdx}, false)" 
                class="px-1 sm:px-2 py-0.5 sm:py-1 rounded-none bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-700/60 active:scale-95 font-bold text-[9.5px] sm:text-[11px] flex items-center gap-0.5 sm:gap-1 shadow-2xs transition-all cursor-pointer"
                title="Buka WhatsApp Otomatis ke Nomor Wali"
              >
                <i data-lucide="external-link" class="w-3 h-3 text-teal-600 dark:text-teal-400 shrink-0"></i>
                <span class="hidden sm:inline">Kirim WA</span>
                <span class="inline sm:hidden">Kirim</span>
              </button>
              <button 
                type="button" 
                onclick="copySingleStudentRow(${effectiveIdx})" 
                class="px-1 sm:px-2 py-0.5 sm:py-1 rounded-none bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-bold text-[9.5px] sm:text-[11px] flex items-center gap-0.5 sm:gap-1 shadow-2xs transition-all cursor-pointer"
                title="Salin 1 Baris Tabel Format Excel"
              >
                <i data-lucide="sheet" class="w-3 h-3 shrink-0"></i>
                <span>Baris</span>
              </button>
            </div>
          </td>

          <!-- 4. Nomor BRIVA (Admin Input / Dinamis & Kustom per Santri) -->
          <td class="py-1.5 sm:py-2 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <div class="inline-flex items-center gap-1 bg-emerald-50/90 dark:bg-emerald-950/40 p-0.5 rounded-none border border-emerald-200 dark:border-emerald-800">
              <i data-lucide="credit-card" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-1"></i>
              <input 
                type="text" 
                value="${escapeHtml(item.briva || '')}" 
                placeholder="${escapeHtml(brivaVal)}" 
                oninput="updatePpdbRowBriva('siswa', ${effectiveIdx}, this.value)" 
                class="w-24 sm:w-28 h-6 px-1.5 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-none font-mono font-bold text-xs text-emerald-950 dark:text-emerald-100 outline-none focus:ring-1 focus:ring-emerald-500 text-left" 
                title="Nomor BRIVA kustom santri ini. Ubah langsung di sini atau kosongkan untuk memakai default (${escapeHtml(brivaVal)})."
              />
              <button 
                type="button" 
                onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'briva', 'Nomor BRIVA')" 
                class="p-1 rounded-none hover:bg-emerald-200 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 transition-all cursor-pointer shrink-0" 
                title="Salin Nomor BRIVA (${escapeHtml(brivaVal)})"
              >
                <i data-lucide="copy" class="w-3 h-3"></i>
              </button>
            </div>
          </td>

          <!-- 5. Nama Pengguna* (Klik untuk salin langsung) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'username', 'Username Siswa')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200 font-bold shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin username"
            >
              <i data-lucide="user" class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0"></i>
              <span>${highlightSearch(item.username, searchQuery)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 6. Email Siswa* (Klik untuk salin langsung) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'email', 'Email Siswa')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800 text-sky-950 dark:text-sky-200 font-semibold shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin email"
            >
              <i data-lucide="mail" class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0"></i>
              <span>${highlightSearch(item.email, searchQuery)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 7. Kata Sandi* (Klik untuk salin langsung) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'password', 'Kata Sandi Siswa')" 
              class="ppdb-credential-pwd inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 font-bold shadow-2xs transition-all cursor-pointer text-left font-mono select-none group" 
              title="Klik untuk menyalin kata sandi"
            >
              <i data-lucide="key" class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0"></i>
              <span class="font-mono font-bold">${escapeHtml(item.password)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 8. JK (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-center text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'gender', 'Jenis Kelamin')" 
              class="px-2 py-0.5 sm:py-1 rounded-none text-[10px] sm:text-xs font-bold cursor-pointer transition-all hover:scale-105 active:scale-95 ${item.gender && item.gender.toLowerCase().startsWith('l') ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60' : 'bg-pink-100 dark:pink-950/70 text-pink-800 dark:text-pink-300 border border-pink-200 dark:border-pink-800/60'}" 
              title="Klik untuk menyalin JK"
            >
              ${escapeHtml(item.gender || '-')}
            </button>
          </td>

          <!-- 9. No HP Siswa (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'hp', 'No HP Siswa')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 text-slate-800 dark:text-slate-100 font-semibold tabular-nums shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin No HP Siswa"
            >
              <i data-lucide="phone" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
              <span>${escapeHtml(item.hp || '-')}</span>
              <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 10. Alamat Siswa (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 text-xs sm:text-[13px] max-w-xs">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'alamat', 'Alamat Siswa')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-slate-50 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 hover:border-rose-300 text-slate-700 dark:text-slate-200 shadow-2xs transition-all cursor-pointer text-left truncate max-w-full group" 
              title="${escapeHtml(item.alamat || '-')} (Klik untuk salin)"
            >
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-rose-500 shrink-0"></i>
              <span class="truncate">${escapeHtml(item.alamat || '-')}</span>
              <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 11. Status Santri (Klik Status Ubah, Klik Ikon Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <div class="inline-flex items-center gap-1">
              <button 
                type="button" 
                onclick="cyclePpdbStudentStatus(${effectiveIdx})" 
                class="px-2.5 sm:px-3 py-1 rounded-none text-[11px] sm:text-xs font-extrabold border shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 select-none" 
                style="${statusBgStyle}" 
                title="Klik untuk beralih status (Kosong / Mukim Reguler / Non Mukim / Mukim Vip)"
              >
                <span>${statusText}</span>
                <i data-lucide="refresh-cw" class="w-3 h-3 opacity-60"></i>
              </button>
              <button 
                type="button" 
                onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'rencanaStatus', 'Status Santri')" 
                class="p-1.5 rounded-none bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer" 
                title="Salin Status Santri"
              >
                <i data-lucide="copy" class="w-3 h-3"></i>
              </button>
            </div>
          </td>

          <!-- 12. Sekolah Asal (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px]">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'sekolahAsal', 'Sekolah Asal')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-800 dark:text-slate-100 font-medium shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin Sekolah Asal"
            >
              <i data-lucide="school" class="w-3.5 h-3.5 text-slate-500 shrink-0"></i>
              <span>${highlightSearch(item.sekolahAsal || '-', searchQuery)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>

          <!-- 13. Guru Pendamping (Klik untuk Salin) -->
          <td class="py-1.5 sm:py-2.5 px-2 sm:px-3 whitespace-nowrap text-xs sm:text-[13px] font-bold text-emerald-700 dark:text-emerald-300">
            <button 
              type="button" 
              onclick="copyPpdbFieldValue('siswa', ${effectiveIdx}, 'guru', 'Guru Pendamping')" 
              class="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-none bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/70 hover:border-emerald-300 text-emerald-800 dark:text-emerald-300 font-bold shadow-2xs transition-all cursor-pointer text-left group" 
              title="Klik untuk menyalin Guru Pendamping"
            >
              <i data-lucide="award" class="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"></i>
              <span>${highlightSearch(item.guru || '-', searchQuery)}</span>
              <i data-lucide="copy" class="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1"></i>
            </button>
          </td>
        </tr>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();
      initDragToScroll('scrollWrapperPpdbSiswa');
    }

    // --- FITUR SALIN DATA PER ANAK ---
    // 1. Salin Kartu Akun Lengkap Per Siswa
    function copySingleStudentData(idx) {
      const item = currentPpdbSiswaList[idx];
      if (!item) return;
      const noReg = getAdminBrivaNumber(item);

      const text = [
        `*AKUN RESMI SANTRI / SISWA*`,
        `YTPAI Raudlatul Muta'allimin Lamongan`,
        `-----------------------------------`,
        `Nama Lengkap    : ${item.namaSiswa}`,
        noReg ? `No. Registrasi  : ${noReg}` : null,
        `Nama Pengguna   : ${item.username}`,
        `Kata Sandi      : ${item.password}`,
        `Kode Sekolah    : 1600`,
        `Email Akun      : ${item.email}`,
        `Jenis Kelamin   : ${item.gender || '-'}`,
        `No HP Siswa     : ${item.hp || '-'}`,
        `Alamat Lengkap  : ${item.alamat || '-'}`,
        `Status Santri   : ${item.rencanaStatus || '-'}`,
        `Sekolah Asal    : ${item.sekolahAsal || '-'}`,
        `Nama Wali       : ${item.namaWali || '-'}`,
        `Guru Pendamping : ${item.guru || '-'}`
      ].filter(Boolean).join('\n');

      copyToClipboard(text, 'Akun Santri Disalin!', `Data login ${item.namaSiswa} siap dibagikan.`);
    }

    // 2. Salin Pesan WA Khusus Rincian Akun & Panduan Pembayaran BRIVA (Nomor Registrasi Dinamis Custom)
    function buildStudentWaMessage(item, includePaymentGuide = true) {
      const username = item.username || '-';
      const password = item.password || 'P@ssword123';
      const namaSiswa = item.namaSiswa || 'Siswa';
      const kodeSekolah = '1600';
      const noReg = getAdminBrivaNumber(item);

      if (!includePaymentGuide) {
        // Mode Khusus: Akun Saja (Format Singkat & Salin Tunggal)
        return [
          `*YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN*`,
          ``,
          `Assalamu'alaikum Warahmatullahi Wabarakatuh,`,
          ``,
          `Kepada Yth. Bapak/Ibu Wali dari ananda *${namaSiswa}*,`,
          `Semoga Bapak/Ibu sekeluarga senantiasa dalam keadaan sehat dan berkah.`,
          ``,
          `Berikut rincian akun resmi portal siswa pada aplikasi *Junio Smart*:`,
          ``,
          `👤 *Username:* \`${username}\``,
          `🔑 *Password:* \`${password}\``,
          `🏫 *Kode Sekolah:* \`${kodeSekolah}\``,
          ...(noReg ? [
            ``,
            `────────────────────`,
            `📋 *No. Registrasi:* \`${noReg}\``,
            `────────────────────`
          ] : []),
          ``,
          `📌 *Catatan Penting:*`,
          `• Huruf pertama pada kata sandi wajib menggunakan huruf kapital (*P* besar): \`${password}\`.`,
          `• Buka aplikasi *Junio Smart* untuk cek rincian tagihan, lalu lihat Nomor BRIVA ananda pada tab *Akun*.`,
          ``,
          `Jazakumullah Khairan Katsiran atas amanah dan kerja sama Bapak/Ibu.`,
          ``,
          `Wassalamu'alaikum Warahmatullahi Wabarakatuh.`,
          `_Admin Junio Smart_`
        ].filter(line => line !== null).join('\n');
      }

      // Mode Lengkap: Akun + Panduan Ringkas Pembayaran BRIVA
      return [
        `*YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN*`,
        ``,
        `Assalamu'alaikum Warahmatullahi Wabarakatuh,`,
        ``,
        `Kepada Yth. Bapak/Ibu Wali dari ananda *${namaSiswa}*,`,
        `Semoga Bapak/Ibu sekeluarga senantiasa dalam lindungan Allah SWT.`,
        ``,
        `Berikut rincian akun resmi portal siswa pada aplikasi *Junio Smart*:`,
        ``,
        `👤 *Username:* \`${username}\``,
        `🔑 *Password:* \`${password}\``,
        `🏫 *Kode Sekolah:* \`${kodeSekolah}\``,
        ...(noReg ? [
          ``,
          `────────────────────`,
          `📋 *No. Registrasi:* \`${noReg}\``,
          `────────────────────`
        ] : []),
        ``,
        `📱 *Panduan Cek Tagihan & Pembayaran:*`,
        `1. Buka aplikasi *Junio Smart*, lalu login menggunakan data akun di atas.`,
        `2. Cek rincian tagihan, lalu buka tab *Akun* untuk melihat *Nomor BRIVA* ananda.`,
        `3. Lakukan pembayaran melalui *BRImo* atau ATM BRI menggunakan Nomor BRIVA tersebut.`,
        ``,
        `📌 *Catatan Penting:*`,
        `• Huruf pertama pada kata sandi wajib menggunakan huruf kapital (*P* besar): \`${password}\`.`,
        `• Mohon simpan data akun ini dengan baik untuk memantau tagihan & informasi siswa.`,
        ``,
        `Jazakumullah Khairan Katsiran atas kerja sama dan kepercayaan Bapak/Ibu.`,
        ``,
        `Wassalamu'alaikum Warahmatullahi Wabarakatuh.`,
        `_Admin Junio Smart_`
      ].filter(line => line !== null).join('\n');
    }

    // 2.A. Salin Pesan Format WA Lengkap (Akun + Cara Bayar BRIVA)
    function copySingleStudentWa(idx) {
      const item = currentPpdbSiswaList[idx];
      if (!item) return;

      const text = buildStudentWaMessage(item, true);
      copyToClipboard(text, 'Format WA Lengkap Disalin!', `Pesan akun & panduan BRIVA untuk ${item.namaSiswa} siap dikirimkan.`);
    }

    // 2.B. Salin Khusus Akun Saja (Jika Wali Hanya Bertanya Akun)
    function copySingleStudentAccountOnly(idx) {
      const item = currentPpdbSiswaList[idx];
      if (!item) return;

      const text = buildStudentWaMessage(item, false);
      copyToClipboard(text, 'Format Akun Saja Disalin!', `Rincian username & password untuk ${item.namaSiswa} siap dikirim.`);
    }

    // 2.C. Buka WhatsApp Langsung (wa.me) ke Nomor Wali/Siswa
    function openSingleStudentWhatsApp(idx, onlyAccount = false) {
      const item = currentPpdbSiswaList[idx];
      if (!item) return;

      let phone = String(item.hp || item.telepon || '').replace(/[^0-9]/g, '');
      if (phone.startsWith('0')) {
        phone = '62' + phone.slice(1);
      }

      const message = buildStudentWaMessage(item, !onlyAccount);

      if (!phone || phone.length < 9) {
        // Jika nomor HP tidak terdata, otomatis salin ke clipboard & berikan instruksi
        copyToClipboard(message, 'Nomor HP Belum Terisi', 'Teks telah disalin ke clipboard! Silakan tempel (Ctrl+V) langsung ke kontak WhatsApp tujuan.');
        return;
      }

      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
      showToast('Membuka WhatsApp...', `Menghubungkan ke nomor ${phone}`);
    }

    // 3. Salin 1 Baris Data Excel/TSV
    function copySingleStudentRow(idx) {
      const item = currentPpdbSiswaList[idx];
      if (!item) return;
      const brivaVal = getAdminBrivaNumber(item);

      const row = [
        idx + 1,
        item.namaSiswa || '',
        brivaVal ? `'${brivaVal}` : '',
        item.username || '',
        item.email || '',
        item.password || '',
        item.gender || '',
        item.hp ? `'${item.hp}` : '',
        item.alamat || '',
        item.rencanaStatus || '',
        item.sekolahAsal || '',
        item.guru || ''
      ].join('\t');

      copyToClipboard(row, '1 Baris Disalin!', `Baris data ${item.namaSiswa} siap ditempel langsung ke Excel.`);
    }

    // 4. Ubah Status Santri Siklikal (Kosong -> Mukim Reguler -> Non Mukim -> Mukim Vip -> Kosong)
    function cyclePpdbStudentStatus(idx) {
      const item = currentPpdbSiswaList[idx];
      if (!item) return;

      const g = String(item.gender || '').trim().toLowerCase();
      const isPi = g.startsWith('p') || g.includes('perempuan') || g.includes('putri');
      const genderCode = isPi ? 'PI' : 'PA';

      const cur = String(item.rencanaStatus || '').trim();
      if (!cur) {
        item.rencanaStatus = `Mukim Reguler ${genderCode}`;
      } else if (cur.includes('Mukim Reguler')) {
        item.rencanaStatus = `Non Mukim ${genderCode}`;
      } else if (cur.includes('Non Mukim')) {
        item.rencanaStatus = `Mukim Vip ${genderCode}`;
      } else if (cur.includes('Mukim Vip')) {
        item.rencanaStatus = ''; // Kembali kosong sesuai aturan
      } else {
        item.rencanaStatus = `Mukim Reguler ${genderCode}`;
      }

      renderPpdbSiswaTable();
      soundSuccess();
      showToast('Status Diperbarui', `${item.namaSiswa} diubah menjadi "${item.rencanaStatus || 'Kosong'}"`);
    }

    // --- FITUR GULIR TABEL (BUTTON & DRAG-TO-SCROLL MOUSE) ---
    // Geser kolom dengan tombol [◀] dan [Ã¢â€“¶]
    function scrollPpdbTable(type, amount) {
      const id = type === 'ortu' ? 'scrollWrapperPpdbOrtu' : 'scrollWrapperPpdbSiswa';
      const el = document.getElementById(id);
      if (el) {
        el.scrollBy({ left: amount, behavior: 'smooth' });
      }
    }

    // Inisialisasi Mouse Drag-to-Scroll Bebas di Area Tabel
    function initDragToScroll(containerId) {
      const slider = document.getElementById(containerId);
      if (!slider || slider.dataset.dragInitialized === 'true') return;
      if (!tbody) return;

      const totalOverallStudents = currentPpdbSiswaList.length || 1;

      // Render Podium Top 3 Guru Pendamping
      if (podiumEl) {
        if (currentPpdbGuruList.length === 0) {
          podiumEl.innerHTML = '';
          podiumEl.classList.add('hidden');
        } else {
          podiumEl.classList.remove('hidden');
          const top3 = currentPpdbGuruList.slice(0, 3);
          const podiumStyles = [
            {
              rank: 1,
              title: 'Peringkat 1 Terbanyak',
              badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
              borderColor: 'border-amber-300 ring-1 ring-amber-400/30',
              bgGradient: 'from-amber-50/90 via-amber-100/30 to-white',
              badgeIcon: '\uD83E\uDD47'
            },
            {
              rank: 2,
              title: 'Peringkat 2',
              badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
              borderColor: 'border-slate-300 ring-1 ring-slate-400/20',
              bgGradient: 'from-slate-50/90 via-slate-100/30 to-white',
              badgeIcon: '\uD83E\uDD48'
            },
            {
              rank: 3,
              title: 'Peringkat 3',
              badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
              borderColor: 'border-orange-300 ring-1 ring-orange-400/20',
              bgGradient: 'from-orange-50/80 via-orange-100/20 to-white',
              badgeIcon: '\uD83E\uDD49'
            }
          ];

          podiumEl.innerHTML = top3.map((guru, pIdx) => {
            const style = podiumStyles[pIdx] || podiumStyles[1];
            const pct = ((guru.count / totalOverallStudents) * 100).toFixed(1);
            return `
              <div class="relative p-3.5 rounded-none border ${style.borderColor} bg-gradient-to-br ${style.bgGradient} shadow-none flex flex-col justify-between overflow-hidden">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span class="text-2xl select-none">${style.badgeIcon}</span>
                    <div class="min-w-0">
                      <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border ${style.badgeColor}">
                        ${style.title}
                      </span>
                      <h4 class="font-black text-slate-900 text-sm mt-1 truncate max-w-[170px] sm:max-w-[190px]" title="${escapeHtml(guru.displayName)}">
                        ${escapeHtml(guru.displayName)}
                      </h4>
                    </div>
                  </div>
                  <div class="text-right shrink-0">
                    <span class="text-xl font-black text-slate-900 tabular-nums">${guru.count}</span>
                    <span class="text-[11px] font-bold text-slate-600 block -mt-0.5">Siswa</span>
                  </div>
                </div>

                <div class="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                  <span class="font-medium">Kontribusi PPDB</span>
                  <span class="font-extrabold text-emerald-800 tabular-nums">${pct}%</span>
                </div>
                <div class="w-full bg-slate-200/70 h-1.5 rounded-none overflow-hidden mt-1">
                  <div class="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-none transition-all duration-500" style="width: ${pct}%;"></div>
                </div>
              </div>
            `;
          }).join('');
        }
      }

      const searchQuery = (document.getElementById('searchPpdbGuruInput')?.value || '').trim().toLowerCase();

      if (currentPpdbGuruList.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="4" class="py-12 text-center text-slate-400">
              <i data-lucide="award" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
              <p class="font-medium">Belum ada data guru</p>
              <p class="text-[11px] text-slate-400">Unggah file formulir PPDB atau klik "Muat Contoh Data" untuk melihat rekapitulasi.</p>
            </td>
          </tr>
        `;
        if (tfootEl) tfootEl.innerHTML = '';
        if (window.lucide) lucide.createIcons();
        return;
      }

      let list = currentPpdbGuruList;
      if (searchQuery) {
        list = list.filter(item => {
          return (item.displayName && item.displayName.toLowerCase().includes(searchQuery)) ||
                 item.students.some(s => s.toLowerCase().includes(searchQuery));
        });
      }

      if (list.length === 0) {
        renderPpdbOrtuCards([], searchQuery);
        tbody.innerHTML = `
          <tr>
            <td colspan="4" class="py-10 text-center text-slate-400">
              <i data-lucide="search-x" class="w-7 h-7 mx-auto mb-1.5 text-slate-300"></i>
              <p class="font-medium text-slate-600">Guru pendamping tidak ditemukan</p>
              <p class="text-[11px] text-slate-400">Tidak ada nama guru atau siswa yang cocok dengan "${escapeHtml(searchQuery)}".</p>
            </td>
          </tr>
        `;
        if (tfootEl) tfootEl.innerHTML = '';
        if (window.lucide) lucide.createIcons();
        return;
      }

      tbody.innerHTML = list.map((item, idx) => {
        let rankBadge = '';
        if (idx === 0) {
          rankBadge = '<span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black text-xs shadow-xs" title="Juara 1">\uD83E\uDD47 1</span>';
        } else if (idx === 1) {
          rankBadge = '<span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 text-slate-900 font-black text-xs shadow-xs" title="Juara 2">\uD83E\uDD48 2</span>';
        } else if (idx === 2) {
          rankBadge = '<span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700/20 text-amber-950 font-black text-xs shadow-xs" title="Juara 3">\uD83E\uDD49 3</span>';
        } else {
          rankBadge = `<span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs tabular-nums">${idx + 1}</span>`;
        }

        const pct = ((item.count / totalOverallStudents) * 100).toFixed(1);

        return `
          <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100">
            <td class="py-3.5 px-3.5 text-center">${rankBadge}</td>
            <td class="py-3.5 px-3.5 font-bold text-slate-900 dark:text-white text-[13.5px] whitespace-nowrap">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <i data-lucide="user-check" class="w-4 h-4 text-emerald-700 dark:text-emerald-400"></i>
                </span>
                <span class="font-extrabold text-slate-900 dark:text-white">${highlightSearch(item.displayName, searchQuery)}</span>
              </div>
            </td>
            <td class="py-3.5 px-3.5 text-center whitespace-nowrap">
              <div class="inline-flex flex-col items-center">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800/60 font-black text-xs shadow-2xs">
                  <span class="text-sm tabular-nums font-black">${item.count}</span>
                  <span class="font-bold text-xs">Siswa</span>
                  <span class="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">(${pct}%)</span>
                </span>
                <div class="w-28 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div class="bg-emerald-600 h-full rounded-full transition-all duration-300" style="width: ${pct}%;"></div>
                </div>
              </div>
            </td>
            <td class="py-3.5 px-3.5">
              <div class="flex flex-wrap gap-1.5">
                ${item.students.map((st, sIdx) => `
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/40 transition-colors">
                    <span class="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-[10px] font-bold flex items-center justify-center shrink-0 tabular-nums">${sIdx + 1}</span>
                    <span>${highlightSearch(st, searchQuery)}</span>
                  </span>
                `).join('')}
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Update TFoot Summary
      if (tfootEl) {
        const totalFilteredStudents = list.reduce((acc, item) => acc + item.count, 0);
        tfootEl.innerHTML = `
          <tr>
            <td class="py-3 px-3.5 text-center text-slate-500 font-bold">Total</td>
            <td class="py-3 px-3.5 text-slate-900 font-black">
              ${list.length} Guru Pendamping
            </td>
            <td class="py-3 px-3.5 text-center whitespace-nowrap">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-white font-black text-xs">
                <span class="text-sm tabular-nums font-black">${totalFilteredStudents}</span>
                <span class="font-bold text-xs">Siswa</span>
              </span>
            </td>
            <td class="py-3 px-3.5 text-slate-600 font-medium text-xs">
              Semua siswa telah dialokasikan ke masing-masing guru pendamping untuk penetapan jam mengajar.
            </td>
          </tr>
        `;
      }

      if (window.lucide) lucide.createIcons();
    }

    // Salin Format Laporan WhatsApp untuk Dewan Guru
    function copyPpdbGuruWaReport() {
      if (currentPpdbGuruList.length === 0) {
        showToast('Data Masih Kosong', 'Unggah file Excel PPDB terlebih dahulu.', true);
        return;
      }

      const totalStudents = currentPpdbSiswaList.length || 0;
      const totalTeachers = currentPpdbGuruList.length || 0;

      let msg = `*REKAPITULASI PEROLEHAN SISWA PPDB*\n`;
      msg += `*YAYASAN TARBIYATUL AULAD*\n`;
      msg += `===================================\n`;
      msg += `\uD83D\uDCCA Total Siswa Terdata: *${totalStudents} Siswa*\n`;
      msg += `\uD83D\uDC65 Guru Pendamping: *${totalTeachers} Guru*\n`;
      msg += `===================================\n\n`;

      const medals = ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'];

      currentPpdbGuruList.forEach((item, idx) => {
        const medal = medals[idx] || '\uD83D\uDD39';
        const pct = ((item.count / totalStudents) * 100).toFixed(1);
        msg += `${medal} *${idx + 1}. ${item.displayName}* (${item.count} Siswa - ${pct}%)\n`;
        item.students.forEach((st, sIdx) => {
          msg += `    ${sIdx + 1}. ${st}\n`;
        });
        msg += `\n`;
      });

      msg += `_Catatan: Akumulasi ini digunakan sebagai acuan penetapan jam mengajar._\n`;
      msg += `_Dibuat otomatis via Sistem Generator Briva & PPDB YTPAI_`;

      copyToClipboard(msg, 'Laporan WA Disalin!', 'Format laporan siap dikirimkan ke grup WhatsApp dewan guru.');
    }

    function filterPpdbOrtuTable() {
      renderPpdbOrtuTable();
    }

    function filterPpdbSiswaTable() {
      renderPpdbSiswaTable();
    }

    function filterPpdbGuruTable() {
      renderPpdbGuruTable();
    }

    // --- HELPER SALIN PER CELL/FIELD NILAI TUNGGAL (1-CLICK ITEM COPY) ---
    function copyPpdbFieldValue(type, index, fieldKey, fieldLabel) {
      const list = type === 'ortu' ? currentPpdbOrtuList : currentPpdbSiswaList;
      const item = list[index];
      if (!item) return;
      let val = item[fieldKey];
      if ((!val || val === '-' || val === '') && fieldKey === 'briva') {
        val = getAdminBrivaNumber(item);
      }
      if (!val || val === '-' || val === '') {
        showToast('Data Kosong', `${fieldLabel} tidak tersedia.`, true);
        return;
      }
      copyToClipboard(String(val).trim(), `${fieldLabel} Disalin!`, `${fieldLabel}: ${val}`);
    }

    // --- FITUR SALIN 1 KOLOM PENUH PER KATEGORI (BULK COLUMN/CATEGORY COPY) ---
    function copyPpdbColumn(type, fieldKey, fieldLabel) {
      let list = [];
      if (type === 'ortu') {
        list = currentPpdbOrtuList;
        const searchQuery = (document.getElementById('searchPpdbOrtuInput')?.value || '').trim().toLowerCase();
        if (searchQuery) {
          list = list.filter(item => {
            return (item.namaWali && item.namaWali.toLowerCase().includes(searchQuery)) ||
                   (item.username && item.username.toLowerCase().includes(searchQuery)) ||
                   (item.ktp && item.ktp.toLowerCase().includes(searchQuery)) ||
                   (item.email && item.email.toLowerCase().includes(searchQuery)) ||
                   (item.siswaTerkait && item.siswaTerkait.toLowerCase().includes(searchQuery)) ||
                   (item.namaAyah && item.namaAyah.toLowerCase().includes(searchQuery)) ||
                   (item.namaIbu && item.namaIbu.toLowerCase().includes(searchQuery));
          });
        }
      } else if (type === 'siswa') {
        list = currentPpdbSiswaList;
        const searchQuery = (document.getElementById('searchPpdbSiswaInput')?.value || '').trim().toLowerCase();
        if (searchQuery) {
          list = list.filter(item => {
            const br = item.briva || getAdminBrivaNumber(item);
            return (item.namaSiswa && item.namaSiswa.toLowerCase().includes(searchQuery)) ||
                   (item.username && item.username.toLowerCase().includes(searchQuery)) ||
                   (item.email && item.email.toLowerCase().includes(searchQuery)) ||
                   (item.gender && item.gender.toLowerCase().includes(searchQuery)) ||
                   (item.hp && item.hp.toLowerCase().includes(searchQuery)) ||
                   (item.alamat && item.alamat.toLowerCase().includes(searchQuery)) ||
                   (br && br.toLowerCase().includes(searchQuery)) ||
                   (item.rencanaStatus && item.rencanaStatus.toLowerCase().includes(searchQuery)) ||
                   (item.sekolahAsal && item.sekolahAsal.toLowerCase().includes(searchQuery)) ||
                   (item.guru && item.guru.toLowerCase().includes(searchQuery));
          });
        }
      }

      if (!list || list.length === 0) {
        showToast('Data Masih Kosong', 'Tidak ada data untuk disalin.', true);
        return;
      }

      // Format nilai tiap baris (tambahkan petik untuk NIK/HP/BRIVA jika ke Excel agar format string terjaga)
      const rows = list.map(item => {
        let val = item[fieldKey];
        if (!val && fieldKey === 'briva') {
          val = getAdminBrivaNumber(item);
        }
        if (val === undefined || val === null || val === '-') val = '';
        val = String(val).trim();
        if (val && (fieldKey === 'ktp' || fieldKey === 'telepon' || fieldKey === 'hp' || fieldKey === 'briva')) {
          return `'${val}`;
        }
        return val;
      });

      const text = rows.join('\r\n');
      copyToClipboard(text, `Kolom ${fieldLabel} Disalin!`, `${rows.length} baris data ${fieldLabel} siap ditempel ke Excel.`);
      closePpdbCategoryMenus();
    }

    // Toggle Dropdown Menu Salin Kategori
    function togglePpdbCategoryMenu(type) {
      const menuId = type === 'ortu' ? 'dropdownPpdbOrtuMenu' : 'dropdownPpdbSiswaMenu';
      const menu = document.getElementById(menuId);
      if (!menu) return;
      const isHidden = menu.classList.contains('hidden');
      closePpdbCategoryMenus();
      if (isHidden) {
        menu.classList.remove('hidden');
      }
    }

    function closePpdbCategoryMenus() {
      const menuOrtu = document.getElementById('dropdownPpdbOrtuMenu');
      const menuSiswa = document.getElementById('dropdownPpdbSiswaMenu');
      if (menuOrtu) menuOrtu.classList.add('hidden');
      if (menuSiswa) menuSiswa.classList.add('hidden');
    }

    // Tutup dropdown otomatis saat klik di luar area
    document.addEventListener('click', function(e) {
      if (!e.target.closest('#dropdownPpdbOrtuWrapper') && !e.target.closest('#dropdownPpdbSiswaWrapper')) {
        closePpdbCategoryMenus();
      }
    });

    // Salin 11 Kolom Ortu ke Clipboard (TSV)
    function copyPpdbOrtuToClipboard() {
      if (currentPpdbOrtuList.length === 0) {
        showToast('Data Masih Kosong', 'Unggah file Excel PPDB terlebih dahulu.', true);
        return;
      }

      const headers = [
        'Nama Orangtua / Wali*',
        'Email*',
        'Nama Pengguna*',
        'Kata Sandi*',
        'KTP Orangtua / Wali',
        'Nama Ayah',
        'Nama Ibu',
        'Profesi Ayah',
        'Profesi Ibu',
        'Telepon',
        'Alamat'
      ];

      const lines = [headers.join('\t')];
      currentPpdbOrtuList.forEach(item => {
        const row = [
          item.namaWali || '',
          item.email || '',
          item.username || '',
          item.password || '',
          item.ktp ? `'${item.ktp}` : '', // Prefiks petik agar Excel mengenali sebagai string NIK
          item.namaAyah || '',
          item.namaIbu || '',
          item.profesiAyah || '',
          item.profesiIbu || '',
          item.telepon ? `'${item.telepon}` : '',
          item.alamat || ''
        ];
        lines.push(row.join('\t'));
      });

      const text = lines.join('\r\n');
      copyToClipboard(text, 'Tabel 11 Kolom Disalin!', `${currentPpdbOrtuList.length} akun orang tua siap ditempel langsung ke Excel.`);
    }

    // Ekspor Native File .xlsx untuk Akun Ortu (Preserve format string KTP)
    function exportPpdbOrtuToExcel() {
      if (currentPpdbOrtuList.length === 0) {
        showToast('Data Masih Kosong', 'Unggah file Excel PPDB terlebih dahulu.', true);
        return;
      }
      if (!window.XLSX) {
        showToast('Pustaka Belum Siap', 'Pustaka SheetJS belum selesai dimuat.', true);
        return;
      }

      const headers = [
        'Nama Orangtua / Wali*',
        'Email*',
        'Nama Pengguna*',
        'Kata Sandi*',
        'KTP Orangtua / Wali',
        'Nama Ayah',
        'Nama Ibu',
        'Profesi Ayah',
        'Profesi Ibu',
        'Telepon',
        'Alamat'
      ];

      const aoa = [headers];
      currentPpdbOrtuList.forEach(item => {
        aoa.push([
          item.namaWali || '',
          item.email || '',
          item.username || '',
          item.password || '',
          item.ktp || '',
          item.namaAyah || '',
          item.namaIbu || '',
          item.profesiAyah || '',
          item.profesiIbu || '',
          item.telepon || '',
          item.alamat || ''
        ]);
      });

      const ws = XLSX.utils.aoa_to_sheet(aoa);

      // Kunci kolom KTP (E) dan Telepon (J) sebagai format teks murni 's' agar tidak jadi angka eksponensial (3.524E+15)
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let R = 1; R <= range.e.r; ++R) {
        // Kolom E (KTP) = 4
        const ktpCellRef = XLSX.utils.encode_cell({ r: R, c: 4 });
        if (ws[ktpCellRef]) {
          ws[ktpCellRef].t = 's';
          ws[ktpCellRef].z = '@';
        }
        // Kolom J (Telepon) = 9
        const telCellRef = XLSX.utils.encode_cell({ r: R, c: 9 });
        if (ws[telCellRef]) {
          ws[telCellRef].t = 's';
          ws[telCellRef].z = '@';
        }
      }

      // Atur lebar kolom ideal
      ws['!cols'] = [
        { wch: 26 }, // Nama Wali
        { wch: 28 }, // Email
        { wch: 18 }, // Username
        { wch: 16 }, // Kata Sandi
        { wch: 22 }, // KTP
        { wch: 22 }, // Nama Ayah
        { wch: 22 }, // Nama Ibu
        { wch: 18 }, // Profesi Ayah
        { wch: 18 }, // Profesi Ibu
        { wch: 16 }, // Telepon
        { wch: 40 }  // Alamat
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Akun Orangtua');
      XLSX.writeFile(wb, 'Akun_Orangtua_Wali_PPDB.xlsx');
      soundSuccess();
      showToast('Excel Terunduh', 'File Akun_Orangtua_Wali_PPDB.xlsx berhasil disimpan.');
    }

    // Salin Format Pesan WhatsApp Semua Santri Sekaligus (Batch / Broadcast)
    function copyAllPpdbStudentsWa(onlyCredentials = false) {
      if (!currentPpdbSiswaList || currentPpdbSiswaList.length === 0) {
        showToast('Data Masih Kosong', 'Unggah file Excel PPDB atau muat contoh data terlebih dahulu.', true);
        return;
      }

      const searchQuery = (document.getElementById('searchPpdbSiswaInput')?.value || '').trim().toLowerCase();
      let list = currentPpdbSiswaList;
      if (searchQuery) {
        list = list.filter(item => {
          return (item.namaSiswa && item.namaSiswa.toLowerCase().includes(searchQuery)) ||
                 (item.username && item.username.toLowerCase().includes(searchQuery)) ||
                 (item.email && item.email.toLowerCase().includes(searchQuery)) ||
                 (item.rencanaStatus && item.rencanaStatus.toLowerCase().includes(searchQuery)) ||
                 (item.sekolahAsal && item.sekolahAsal.toLowerCase().includes(searchQuery)) ||
                 (item.guru && item.guru.toLowerCase().includes(searchQuery));
        });
      }

      if (list.length === 0) {
        showToast('Santri Tidak Ditemukan', 'Tidak ada data yang cocok dengan filter pencarian.', true);
        return;
      }

      const separator = '\n\n' + '━'.repeat(36) + '\n\n';
      const allMessages = list.map((item, idx) => {
        const header = `[ ${idx + 1} / ${list.length} ]`;
        const content = buildStudentWaMessage(item, !onlyCredentials);
        return `${header}\n${content}`;
      }).join(separator);

      const title = onlyCredentials ? 'Format Akun Disalin!' : 'Format WA Massal Disalin!';
      const desc = `${list.length} draf pesan santri siap ditempel ke dokumen / broadcast WhatsApp.`;
      copyToClipboard(allMessages, title, desc);
    }

    function copyPpdbSiswaToClipboard() {
      if (currentPpdbSiswaList.length === 0) {
        showToast('Data Masih Kosong', 'Unggah file Excel PPDB terlebih dahulu.', true);
        return;
      }

      const headers = [
        'No', 
        'Nama Lengkap Siswa*', 
        'Nomor BRIVA', 
        'Nama Pengguna*', 
        'Email Siswa*', 
        'Kata Sandi*', 
        'JK', 
        'No HP Siswa', 
        'Alamat Siswa', 
        'Status Santri', 
        'Sekolah Asal', 
        'Guru Pendamping'
      ];
      const lines = [headers.join('\t')];
      currentPpdbSiswaList.forEach((item, idx) => {
        const brivaVal = getAdminBrivaNumber(item);
        lines.push([
          idx + 1,
          item.namaSiswa || '',
          brivaVal ? `'${brivaVal}` : '',
          item.username || '',
          item.email || '',
          item.password || '',
          item.gender || '',
          item.hp ? `'${item.hp}` : '',
          item.alamat || '',
          item.rencanaStatus || '',
          item.sekolahAsal || '',
          item.guru || ''
        ].join('\t'));
      });

      const text = lines.join('\r\n');
      copyToClipboard(text, 'Tabel Siswa Disalin!', `${currentPpdbSiswaList.length} baris akun siswa siap ditempel ke Excel.`);
    }

    function exportPpdbSiswaToExcel() {
      if (currentPpdbSiswaList.length === 0) {
        showToast('Data Masih Kosong', 'Unggah file Excel PPDB terlebih dahulu.', true);
        return;
      }
      if (!window.XLSX) return;

      const headers = [
        'No', 
        'Nama Lengkap Siswa*', 
        'Nomor BRIVA', 
        'Nama Pengguna*', 
        'Email Siswa*', 
        'Kata Sandi*', 
        'Jenis Kelamin', 
        'No HP Siswa', 
        'Alamat Lengkap Siswa', 
        'Status Santri', 
        'Sekolah Asal', 
        'Guru Pendamping'
      ];
      const aoa = [headers];
      currentPpdbSiswaList.forEach((item, idx) => {
        aoa.push([
          idx + 1,
          item.namaSiswa || '',
          getAdminBrivaNumber(item),
          item.username || '',
          item.email || '',
          item.password || '',
          item.gender || '',
          item.hp || '',
          item.alamat || '',
          item.rencanaStatus || '',
          item.sekolahAsal || '',
          item.guru || ''
        ]);
      });

      const ws = XLSX.utils.aoa_to_sheet(aoa);

      // Kunci kolom BRIVA (C) dan No HP (H) sebagai format string teks murni
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let R = 1; R <= range.e.r; ++R) {
        const brivaRef = XLSX.utils.encode_cell({ r: R, c: 2 });
        if (ws[brivaRef]) {
          ws[brivaRef].t = 's';
          ws[brivaRef].z = '@';
        }
        const hpRef = XLSX.utils.encode_cell({ r: R, c: 7 });
        if (ws[hpRef]) {
          ws[hpRef].t = 's';
          ws[hpRef].z = '@';
        }
      }

      ws['!cols'] = [
        { wch: 6 },  // No
        { wch: 28 }, // Nama
        { wch: 18 }, // BRIVA
        { wch: 20 }, // Username
        { wch: 28 }, // Email
        { wch: 16 }, // Password
        { wch: 14 }, // JK
        { wch: 16 }, // HP
        { wch: 38 }, // Alamat
        { wch: 18 }, // Status
        { wch: 24 }, // Sekolah Asal
        { wch: 26 }  // Guru
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Akun Siswa');
      XLSX.writeFile(wb, 'Akun_Siswa_PPDB.xlsx');
      soundSuccess();
      showToast('Excel Terunduh', 'File Akun_Siswa_PPDB.xlsx berhasil disimpan.');
    }

    function copyPpdbGuruToClipboard() {
      if (currentPpdbGuruList.length === 0) {
        showToast('Data Masih Kosong', 'Belum ada data guru.', true);
        return;
      }

      const headers = ['Peringkat', 'Nama Guru Pendamping', 'Total Siswa Diperoleh', 'Daftar Siswa'];
      const lines = [headers.join('\t')];
      currentPpdbGuruList.forEach((item, idx) => {
        lines.push([
          idx + 1,
          item.displayName,
          item.count,
          item.students.join(', ')
        ].join('\t'));
      });

      const text = lines.join('\r\n');
      copyToClipboard(text, 'Rekap Guru Disalin!', `${currentPpdbGuruList.length} data guru pendamping siap ditempel ke Excel.`);
    }

    function exportPpdbGuruToExcel() {
      if (currentPpdbGuruList.length === 0) {
        showToast('Data Masih Kosong', 'Belum ada data guru.', true);
        return;
      }
      if (!window.XLSX) return;

      const headers = ['Peringkat', 'Nama Guru Pendamping', 'Total Siswa Diperoleh', 'Rincian Siswa yang Dibawa'];
      const aoa = [headers];
      currentPpdbGuruList.forEach((item, idx) => {
        aoa.push([
          idx + 1,
          item.displayName,
          item.count,
          item.students.join(', ')
        ]);
      });

      const ws = XLSX.utils.aoa_to_sheet(aoa);
      ws['!cols'] = [
        { wch: 10 },
        { wch: 30 },
        { wch: 22 },
        { wch: 50 }
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Akumulasi Guru');
      XLSX.writeFile(wb, 'Akumulasi_Siswa_Per_Guru.xlsx');
      soundSuccess();
      showToast('Excel Terunduh', 'File Akumulasi_Siswa_Per_Guru.xlsx berhasil disimpan.');
    }

    // 15 Baris Data Contoh Realistis Sesuai Tangkapan Layar Formulir PPDB
    function loadPpdbSampleData() {
      const sampleAoA = [
        [
          "Timestamp",
          "Nama Lengkap Calon Siswa",
          "Tempat Tanggal Lahir Calon Siswa",
          "Jenis Kelamin Calon Siswa",
          "E-mail Calon Siswa",
          "No HP Calon Siswa",
          "Alamat Lengkap Calon Siswa",
          "Nama Wali Calon Siswa",
          "NIK Wali Calon Siswa",
          "Nama Ayah Calon Siswa",
          "Nama Ibu Calon Siswa",
          "Profesi Ayah Calon Siswa",
          "Profesi Ibu Calon Siswa",
          "E-mail Wali Calon Siswa",
          "No HP Wali Calon Siswa",
          "Alamat Lengkap Wali Calon Siswa",
          "Rencana Status Calon Siswa",
          "Nama Guru Pendamping",
          "Sekolah Asal Calon Siswa"
        ],
        [
          "2026/02/10 08:15:22",
          "Salsa Nabila Yusnia",
          "Lamongan, 14 Mei 2012",
          "Perempuan",
          "",
          "085732145678",
          "Ds. Tegalrejo RT 02 RW 01 Kec. Babat Kab. Lamongan",
          "Suiswanto",
          "3524190807750001",
          "Suiswanto",
          "Suparmi",
          "Swasta",
          "Ibu Rumah Tangga",
          "",
          "081234567801",
          "Ds. Tegalrejo RT 02 RW 01 Kec. Babat Kab. Lamongan",
          "Asrama",
          "Habibatul Abidah, S.Sos",
          "SMP Darul Ulum Babat"
        ],
        [
          "2026/02/10 09:20:11",
          "Bagus Aditya Saputra",
          "Lamongan, 21 Agustus 2011",
          "Laki-laki",
          "bagusaditya@gmail.com",
          "081234567890",
          "Ds. Gembong RT 03 RW 02 Babat",
          "Hariyanto",
          "3524191205730002",
          "Hariyanto",
          "Sri Wahyuni",
          "Wiraswasta",
          "Ibu Rumah Tangga",
          "",
          "081345678902",
          "Ds. Gembong RT 03 RW 02 Babat",
          "Asrama",
          "Moch. Munib, M.Pd",
          "MTs Raudlatul Muta'allimin"
        ],
        [
          "2026/02/10 10:45:00",
          "Ach. Saddam Bayu Fattoni",
          "Lamongan, 03 Januari 2012",
          "Laki-laki",
          "",
          "082198765432",
          "Ds. Moropelang RT 01 RW 01",
          "Slamet Riyadi",
          "3524192004780003",
          "Slamet Riyadi",
          "Nurul Hidayah",
          "Karyawan Swasta",
          "Wiraswasta",
          "",
          "082234567803",
          "Ds. Moropelang RT 01 RW 01",
          "Non Asrama",
          "Habibatul ABidah S.Sos",
          "SMPN 1 Babat"
        ],
        [
          "2026/02/11 11:12:44",
          "Agus Firmansyah",
          "Bojonegoro, 19 Juli 2011",
          "Laki-laki",
          "",
          "087812345678",
          "Ds. Baureno Kec. Baureno Kab. Bojonegoro",
          "Agus",
          "3522191508740004",
          "Agus Waluyo",
          "Siti Masitoh",
          "Petani",
          "Petani",
          "",
          "087890123404",
          "Ds. Baureno Kec. Baureno Kab. Bojonegoro",
          "",
          "Drs. H. Ahmad Khoir",
          "MI Islamiyah Baureno"
        ],
        [
          "2026/02/11 13:05:19",
          "Aisyah Zahira Putri",
          "Lamongan, 29 September 2012",
          "Perempuan",
          "aisyahzahira@gmail.com",
          "085812345679",
          "Ds. Plaosan Babat Lamongan",
          "Muhammad Ridwan",
          "3524190906760005",
          "Muhammad Ridwan",
          "Endang Sulastri",
          "PNS",
          "Guru",
          "ridwan.babat@gmail.com",
          "085890123405",
          "Ds. Plaosan Babat Lamongan",
          "Asrama",
          "Habibatul Abidah, Sos",
          "SDN Plaosan 1"
        ],
        [
          "2026/02/12 08:30:15",
          "Muhammad Fathir Ar-Rayan",
          "Tuban, 11 Maret 2012",
          "Laki-laki",
          "",
          "081298761234",
          "Ds. Widang Kec. Widang Tuban",
          "Fathur Rohman",
          "3523191103770006",
          "Fathur Rohman",
          "Zubaidah",
          "Pedagang",
          "Pedagang",
          "",
          "081234567806",
          "Ds. Widang Kec. Widang Tuban",
          "Asrama",
          "Moch. Munib, M.Pd",
          "SDN Widang 2"
        ],
        [
          "2026/02/12 10:14:52",
          "Zaskia Nur Azizah",
          "Lamongan, 18 Oktober 2011",
          "Perempuan",
          "",
          "085612349876",
          "Ds. Bedahan Babat Lamongan",
          "H. Sholeh",
          "3524191810720007",
          "H. Sholeh",
          "Hj. Maisaroh",
          "Wiraswasta",
          "Ibu Rumah Tangga",
          "",
          "085678901207",
          "Ds. Bedahan Babat Lamongan",
          "Non Asrama",
          "Siti Aminah, S.Pd.I",
          "MI Ma'arif Bedahan"
        ],
        [
          "2026/02/13 09:00:23",
          "Rizky Pratama Ramadhan",
          "Surabaya, 05 Agustus 2011",
          "Laki-laki",
          "",
          "082345678912",
          "Ds. Pucuk Lamongan",
          "Joko Susilo",
          "3524190508710008",
          "Joko Susilo",
          "Sri Mulyani",
          "Karyawan BUMN",
          "Ibu Rumah Tangga",
          "",
          "082345678908",
          "Ds. Pucuk Lamongan",
          "",
          "Moch. Munib, M.Pd",
          "SMPN 1 Pucuk"
        ],
        [
          "2026/02/13 11:25:31",
          "Naila Khairunnisa",
          "Lamongan, 12 Desember 2012",
          "Perempuan",
          "",
          "087712345612",
          "Ds. Tegalrejo Babat Lamongan",
          "Ali Imron",
          "3524191212750009",
          "Ali Imron",
          "Rofi'ah",
          "Swasta",
          "Ibu Rumah Tangga",
          "",
          "087790123409",
          "Ds. Tegalrejo Babat Lamongan",
          "Asrama",
          "Habibatul Abidah, S.Sos",
          "SDN Tegalrejo"
        ],
        [
          "2026/02/14 14:10:05",
          "Dimas Wahyu Tri Pamungkas",
          "Bojonegoro, 25 Februari 2012",
          "Laki-laki",
          "",
          "085234567891",
          "Ds. Kanor Bojonegoro",
          "Bambang Irawan",
          "3522192502730010",
          "Bambang Irawan",
          "Tri Astuti",
          "TNI/Polri",
          "Ibu Rumah Tangga",
          "",
          "085234567810",
          "Ds. Kanor Bojonegoro",
          "Asrama",
          "Drs. H. Ahmad Khoir",
          "SDN Kanor 1"
        ],
        [
          "2026/02/14 15:40:20",
          "Farah Diba Maharani",
          "Lamongan, 17 Mei 2012",
          "Perempuan",
          "",
          "081398765412",
          "Ds. Kuripan Babat",
          "Samsul Hadi",
          "3524191705760011",
          "Samsul Hadi",
          "Umi Kulsum",
          "Wiraswasta",
          "Pedagang",
          "",
          "081398765411",
          "Ds. Kuripan Babat",
          "Non Asrama",
          "Siti Aminah, S.Pd.I",
          "MI Tarbiyatul Islamiyah"
        ],
        [
          "2026/02/15 08:50:11",
          "Ilham Nur Hidayatullah",
          "Lamongan, 09 September 2011",
          "Laki-laki",
          "",
          "082134567812",
          "Ds. Karanglangit Lamongan",
          "Ahmad Zaini",
          "3524190909740012",
          "Ahmad Zaini",
          "Khoirun Nisa",
          "Petani",
          "Ibu Rumah Tangga",
          "",
          "082134567812",
          "Ds. Karanglangit Lamongan",
          "",
          "Habibatul Abidah, S.Sos",
          "MTs Salafiyah"
        ],
        [
          "2026/02/15 10:35:40",
          "Kayla Aurelia Rahma",
          "Tuban, 22 Juni 2012",
          "Perempuan",
          "",
          "085712349012",
          "Ds. Rengel Kab. Tuban",
          "Rahmat Santoso",
          "3523192206770013",
          "Rahmat Santoso",
          "Lestari",
          "Swasta",
          "Wiraswasta",
          "",
          "085712349013",
          "Ds. Rengel Kab. Tuban",
          "Asrama",
          "Drs. H. Ahmad Khoir",
          "SDN Rengel 1"
        ],
        [
          "2026/02/16 09:15:29",
          "Wildan Maulana Yusuf",
          "Lamongan, 30 November 2011",
          "Laki-laki",
          "",
          "087834567812",
          "Ds. Sukodadi Lamongan",
          "Yusuf Mansur",
          "3524193011750014",
          "Yusuf Mansur",
          "Fatimah",
          "Wiraswasta",
          "Ibu Rumah Tangga",
          "",
          "087834567814",
          "Ds. Sukodadi Lamongan",
          "Non Asrama",
          "Moch. Munib, M.Pd",
          "SMPN 1 Sukodadi"
        ],
        [
          "2026/02/16 11:00:55",
          "Annisa Dwi Lestari",
          "Lamongan, 14 April 2012",
          "Perempuan",
          "",
          "081245678912",
          "Ds. Sumuragung Babat",
          "Kusnan",
          "3524191404760015",
          "Kusnan",
          "Sulastri",
          "Buruh",
          "Ibu Rumah Tangga",
          "",
          "081245678915",
          "Ds. Sumuragung Babat",
          "Asrama",
          "Habibatul Abidah, S.Sos",
          "SDN Sumuragung"
        ]
      ];

      processPpdbRows(sampleAoA, 'Contoh Formulir PPDB (15 Siswa)');
      soundSuccess();
      showToast('Data Contoh Dimuat', '15 data santri lengkap dengan wali & guru pendamping berhasil dianalisis.');
    }

    // ============================================================================
    // VOICE ASSISTANT & SMART BILLING GENERATOR UNTUK TAB AKUN PPDB
    // ============================================================================
    let akunSpeechRecognitionInstance = null;
    let isAkunVoiceListening = false;
    let currentVoiceBillingData = null;

    function handleAkunVoiceKeydown(e, val) {
      if (e.key === 'Enter') {
        e.preventDefault();
        processAkunVoiceSmartCommand(val);
      }
    }

    function toggleAkunVoiceAssistant() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        if (typeof showToast === 'function') {
          showToast('Fitur Suara Tidak Didukung', 'Browser Anda belum mendukung Web Speech Recognition. Silakan gunakan Google Chrome di HP/Laptop.', 'warning');
        } else {
          alert('Browser ini belum mendukung Web Speech Recognition. Silakan gunakan Google Chrome.');
        }
        return;
      }

      if (isAkunVoiceListening) {
        stopAkunVoiceAssistant();
      } else {
        startAkunVoiceAssistant(SpeechRecognition);
      }
    }

    function startAkunVoiceAssistant(SpeechRecognition) {
      try {
        akunSpeechRecognitionInstance = new SpeechRecognition();
        akunSpeechRecognitionInstance.lang = 'id-ID';
        akunSpeechRecognitionInstance.continuous = false;
        akunSpeechRecognitionInstance.interimResults = true;

        const banner = document.getElementById('akunVoiceListeningBanner');
        const liveTranscript = document.getElementById('akunVoiceLiveTranscript');
        const btn = document.getElementById('btnAkunVoiceAssistant');

        akunSpeechRecognitionInstance.onstart = function() {
          isAkunVoiceListening = true;
          if (btn) {
            btn.className = 'absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-md font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer transition-all border border-rose-400 animate-pulse ring-2 ring-rose-400';
          }
          if (banner) banner.classList.remove('hidden');
          if (liveTranscript) liveTranscript.textContent = 'Mendengarkan... Ucapkan cth: "Buat tagihan santri baru MA Putri kelas 11" atau "Cari akun Fatih"...';
        };

        akunSpeechRecognitionInstance.onresult = function(event) {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const activeText = finalTranscript || interimTranscript;
          if (liveTranscript && activeText) {
            liveTranscript.textContent = `🗣️ "${activeText}"`;
          }

          if (finalTranscript && finalTranscript.trim().length > 1) {
            processAkunVoiceSmartCommand(finalTranscript.trim());
          }
        };

        akunSpeechRecognitionInstance.onerror = function(event) {
          console.warn('Akun Speech recognition error:', event.error);
          stopAkunVoiceAssistant();
        };

        akunSpeechRecognitionInstance.onend = function() {
          stopAkunVoiceAssistant();
        };

        akunSpeechRecognitionInstance.start();
      } catch (err) {
        console.error('Failed to start akun speech recognition:', err);
        stopAkunVoiceAssistant();
      }
    }

    function stopAkunVoiceAssistant() {
      isAkunVoiceListening = false;
      if (akunSpeechRecognitionInstance) {
        try { akunSpeechRecognitionInstance.stop(); } catch (e) {}
        akunSpeechRecognitionInstance = null;
      }
      const banner = document.getElementById('akunVoiceListeningBanner');
      const btn = document.getElementById('btnAkunVoiceAssistant');
      if (btn) {
        btn.className = 'absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white rounded-md font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all border border-emerald-300/30';
      }
      if (banner) banner.classList.add('hidden');
    }

    function processAkunVoiceSmartCommand(rawText) {
      if (!rawText || !rawText.trim()) return false;
      const originalText = rawText.trim();
      const text = originalText.toLowerCase();

      const input = document.getElementById('akunVoiceCommandInput');
      if (input) input.value = originalText;

      // 1. CEK APAKAH PERINTAH PEMBUATAN TAGIHAN (Voice Smart Billing Generator)
      const isBillingRequest = /\b(buat tagihan|tagihan|biaya|hitung tagihan|tarif|buatkan tagihan|rincian tagihan|biaya masuk|pembayaran)\b/i.test(text);
      if (isBillingRequest) {
        return generateVoiceSmartBilling(text, originalText);
      }

      // 2. CEK APAKAH PENCARIAN AKUN ATAU FORMAT WA
      const isAccountSearch = /\b(cari akun|cari santri|akun|data|format wa|kirim wa|username|password|registrasi|siswa|wali|guru)\b/i.test(text);
      if (isAccountSearch) {
        return handleVoiceAccountSearch(text, originalText);
      }

      // Default fallback: masukkan ke kolom pencarian akun
      const searchInput = document.getElementById('ppdbSearchInput');
      if (searchInput) {
        searchInput.value = originalText;
        if (typeof applyPpdbFilter === 'function') applyPpdbFilter();
        if (typeof showToast === 'function') {
          showToast('🔍 Pencarian Diterapkan', `Mencari data "${originalText}"`);
        }
      }
      return true;
    }

    function generateVoiceSmartBilling(text, originalText) {
      // 1. Parsing Jenjang & Level
      let jenjang = 'MA';
      let level = 'slta';
      if (/\b(mts|tsanawiyah)\b/i.test(text)) {
        jenjang = 'MTs';
        level = 'sltp';
      } else if (/\b(smp)\b/i.test(text)) {
        jenjang = 'SMP';
        level = 'sltp';
      } else if (/\b(sma)\b/i.test(text)) {
        jenjang = 'SMA';
        level = 'slta';
      } else if (/\b(ma|aliyah)\b/i.test(text)) {
        jenjang = 'MA';
        level = 'slta';
      } else if (/\b(mi|ibtidaiyah)\b/i.test(text)) {
        jenjang = 'MI';
        level = 'sltp';
      }

      // 2. Parsing Gender (Putri / Putra)
      let gender = 'PI';
      let genderLabel = 'Putri';
      let genderKey = 'pi';
      if (/\b(putra|laki|pa|santriwan|ikhwan)\b/i.test(text)) {
        gender = 'PA';
        genderLabel = 'Putra';
        genderKey = 'pa';
      } else if (/\b(putri|perempuan|pi|santriwati|akhwat)\b/i.test(text)) {
        gender = 'PI';
        genderLabel = 'Putri';
        genderKey = 'pi';
      }

      // 3. Parsing Kelas
      let kelas = level === 'slta' ? '10' : '7';
      const matchKelas1 = text.match(/\bkelas\s*(\d+)\b/i);
      const matchKelas2 = text.match(/\b(7|8|9|10|11|12)\b/);
      if (matchKelas1 && matchKelas1[1]) {
        kelas = matchKelas1[1];
      } else if (matchKelas2 && matchKelas2[1]) {
        kelas = matchKelas2[1];
      }

      // 4. Parsing Tipe Santri (VIP, Mbajak / Non-Mukim, Reguler)
      let tipe = 'reguler';
      let tipeLabel = 'Reguler';
      if (/\b(vip)\b/i.test(text)) {
        tipe = 'vip';
        tipeLabel = 'VIP';
      } else if (/\b(mbajak|non mukim|non-mukim|pulang pergi)\b/i.test(text)) {
        tipe = 'mbajak';
        tipeLabel = 'Non-Mukim (Mbajak)';
      }

      // 5. Parsing Status
      let statusSantri = 'Santri Baru (Pindahan)';
      if (/\b(baru)\b/i.test(text)) {
        statusSantri = 'Santri Baru';
      } else if (/\b(pindahan)\b/i.test(text)) {
        statusSantri = 'Santri Pindahan';
      } else if (/\b(lama)\b/i.test(text)) {
        statusSantri = 'Siswa Lama';
      }

      // 6. Parsing Bulan Masuk
      let bulanMasuk = 'September';
      const monthMatches = [
        { name: 'Juli', regex: /\bjuli\b/i },
        { name: 'Agustus', regex: /\bagustus\b/i },
        { name: 'September', regex: /\bseptember\b/i },
        { name: 'Oktober', regex: /\boktober\b/i },
        { name: 'November', regex: /\bnovember\b/i },
        { name: 'Desember', regex: /\bdesember\b/i },
        { name: 'Januari', regex: /\bjanuari\b/i },
        { name: 'Februari', regex: /\bfebruari\b/i },
        { name: 'Maret', regex: /\bmaret\b/i },
        { name: 'April', regex: /\bapril\b/i },
        { name: 'Mei', regex: /\bmei\b/i },
        { name: 'Juni', regex: /\bjuni\b/i }
      ];
      for (const m of monthMatches) {
        if (m.regex.test(text)) {
          bulanMasuk = m.name;
          break;
        }
      }

      // Ambil data harga dari PRICING_DB
      const rateAwal = (PRICING_DB.awal_tahun[kelas] && PRICING_DB.awal_tahun[kelas][tipe]) || 0;
      const rateSergSek = (PRICING_DB.seragam_sekolah[level] && PRICING_DB.seragam_sekolah[level][genderKey]) || 0;
      const rateSergPond = (PRICING_DB.seragam_pondok && PRICING_DB.seragam_pondok[genderKey]) || 0;
      const rateSpp = (PRICING_DB.bulanan[kelas] && PRICING_DB.bulanan[kelas][tipe]) || 0;
      const total = rateAwal + rateSergSek + rateSergPond + rateSpp;

      currentVoiceBillingData = {
        jenjang,
        level,
        gender,
        genderLabel,
        kelas,
        tipe,
        tipeLabel,
        statusSantri,
        bulanMasuk,
        rateAwal,
        rateSergSek,
        rateSergPond,
        rateSpp,
        total
      };

      showVoiceBillingResultModal(currentVoiceBillingData);

      const spokenAns = `Tagihan ${statusSantri} ${jenjang} ${genderLabel} Kelas ${kelas} ${tipeLabel} siap. Total tagihan Rp ${total.toLocaleString('id-ID')} meliputi Awal Tahun Rp ${rateAwal.toLocaleString('id-ID')}, Seragam Rp ${(rateSergSek + rateSergPond).toLocaleString('id-ID')}, dan SPP Bulan ${bulanMasuk} Rp ${rateSpp.toLocaleString('id-ID')}.`;
      if (typeof speakHumasAnswer === 'function') {
        speakHumasAnswer(spokenAns);
      }

      if (typeof showToast === 'function') {
        showToast(`💳 Tagihan ${jenjang} ${genderLabel} Kelas ${kelas}`, `Total: Rp ${total.toLocaleString('id-ID')} • Rincian WA siap disalin.`, 'success');
      }
      return true;
    }

    function showVoiceBillingResultModal(d) {
      if (!d) return;

      const modal = document.getElementById('modalVoiceBillingResult');
      if (!modal) return;

      document.getElementById('voiceBillingModalTitle').textContent = `Tagihan ${d.statusSantri} ${d.jenjang} ${d.genderLabel}`;
      document.getElementById('voiceBillingModalSubtitle').textContent = `Kelas ${d.kelas} (${d.tipeLabel}) • Bulan Masuk ${d.bulanMasuk}`;

      document.getElementById('vbBadgeJenjang').textContent = d.jenjang;
      document.getElementById('vbBadgeGender').textContent = d.genderLabel;
      document.getElementById('vbBadgeKelas').textContent = d.kelas;
      document.getElementById('vbBadgeTipe').textContent = d.tipeLabel;

      document.getElementById('vbRateAwal').textContent = 'Rp ' + d.rateAwal.toLocaleString('id-ID');
      document.getElementById('vbLabelSergSek').textContent = `2. Paket Seragam Sekolah (${d.jenjang} ${d.genderLabel})`;
      document.getElementById('vbRateSergSek').textContent = 'Rp ' + d.rateSergSek.toLocaleString('id-ID');

      document.getElementById('vbLabelSergPond').textContent = `3. Paket Seragam Pondok (${d.genderLabel})`;
      document.getElementById('vbRateSergPond').textContent = 'Rp ' + d.rateSergPond.toLocaleString('id-ID');

      document.getElementById('vbLabelSpp').textContent = `4. SPP / Syahriah (Bulan ${d.bulanMasuk})`;
      document.getElementById('vbSubSpp').textContent = `SPP Kelas ${d.kelas} (${d.tipeLabel})`;
      document.getElementById('vbRateSpp').textContent = 'Rp ' + d.rateSpp.toLocaleString('id-ID');

      document.getElementById('vbTotalGrand').textContent = 'Rp ' + d.total.toLocaleString('id-ID');

      const waText = generateVoiceBillingWaText(d);
      const waTextarea = document.getElementById('vbWaPreviewText');
      if (waTextarea) waTextarea.value = waText;

      modal.classList.remove('hidden');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function closeVoiceBillingModal() {
      const modal = document.getElementById('modalVoiceBillingResult');
      if (modal) modal.classList.add('hidden');
    }

    function generateVoiceBillingWaText(d) {
      if (!d) return '';
      return `Assalamu'alaikum Wr. Wb.

Yth. Wali Santri Baru / Pindahan
Pondok Pesantren Raudlatul Muta'allimin

Berikut adalah rincian tagihan pembayaran awal:
────────────────────
• Jenjang: ${d.jenjang} ${d.genderLabel}
• Kelas: ${d.kelas} (${d.tipeLabel})
• Status: ${d.statusSantri}
────────────────────
RINCIAN TAGIHAN:
1. Biaya Awal Tahun: Rp ${d.rateAwal.toLocaleString('id-ID')}
2. Seragam Sekolah (${d.jenjang} ${d.genderLabel}): Rp ${d.rateSergSek.toLocaleString('id-ID')}
3. Seragam Pondok (${d.genderLabel}): Rp ${d.rateSergPond.toLocaleString('id-ID')}
4. SPP Bulan ${d.bulanMasuk}: Rp ${d.rateSpp.toLocaleString('id-ID')}
────────────────────
TOTAL TAGIHAN: Rp ${d.total.toLocaleString('id-ID')}
────────────────────

Pembayaran dapat ditransfer melalui nomor Virtual Account (BRIVA) santri.
Terima kasih.
Wassalamu'alaikum Wr. Wb.`;
    }

    function copyVoiceBillingWaText() {
      if (!currentVoiceBillingData) return;
      const text = generateVoiceBillingWaText(currentVoiceBillingData);
      
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          if (typeof showToast === 'function') {
            showToast('📋 Rincian WA Disalin!', 'Rincian tagihan santri baru berhasil disalin ke clipboard.');
          }
        }).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }

      function fallbackCopy(str) {
        const helper = document.getElementById('hiddenClipboardHelper') || document.createElement('textarea');
        helper.value = str;
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        if (typeof showToast === 'function') {
          showToast('📋 Rincian WA Disalin!', 'Rincian tagihan santri baru berhasil disalin ke clipboard.');
        }
      }
    }

    function insertVoiceBillingToBrivaTable() {
      if (!currentVoiceBillingData) return;
      const d = currentVoiceBillingData;
      
      closeVoiceBillingModal();
      if (typeof switchTab === 'function') {
        switchTab('briva');
      }

      if (typeof showToast === 'function') {
        showToast('💳 Dibuka di Tab BRIVA', `Rincian tagihan ${d.jenjang} ${d.genderLabel} Kelas ${d.kelas} (Total: Rp ${d.total.toLocaleString('id-ID')}) siap dikelola di Tab BRIVA.`);
      }
    }

    function handleVoiceAccountSearch(text, originalText) {
      // Bersihkan kata perintah pencarian
      const queryClean = text
        .replace(/\b(cari akun|cari santri|cari siswa|cari|tolong|carikan|akun|data|format wa|kirim wa|username|password|registrasi|nomor registrasi)\b/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const searchInput = document.getElementById('ppdbSearchInput');
      if (searchInput) {
        searchInput.value = queryClean || originalText;
        if (typeof applyPpdbFilter === 'function') applyPpdbFilter();
      }

      // Cari di data ortu/siswa/guru
      const allAccounts = [
        ...(ppdbProcessedData.siswa || []),
        ...(ppdbProcessedData.ortu || []),
        ...(ppdbProcessedData.guru || [])
      ];

      const match = allAccounts.find(acc => {
        const name = (acc.name || acc.nama || '').toLowerCase();
        const user = (acc.username || '').toLowerCase();
        const reg = (acc.regNo || '').toLowerCase();
        return name.includes(queryClean) || user.includes(queryClean) || reg.includes(queryClean);
      });

      if (match) {
        const spoken = `Ditemukan akun ${match.name || match.nama}, nomor registrasi ${match.regNo || match.nis || '-'}, username ${match.username || '-'}.`;
        if (typeof speakHumasAnswer === 'function') speakHumasAnswer(spoken);
        if (typeof showToast === 'function') {
          showToast(`👤 ${match.name || match.nama}`, `Username: ${match.username} • Reg: ${match.regNo || '-'}`, 'info');
        }
      } else {
        const spoken = `Mencari data ${queryClean || originalText} di tabel akun.`;
        if (typeof speakHumasAnswer === 'function') speakHumasAnswer(spoken);
      }
      return true;
    }
