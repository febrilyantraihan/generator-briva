// ============================================================================
// MODULE: tab_tahfidz.js
// Tab 6: Modul Tahfidz Tasmi' Bil Ghoib 30 Juz, Rekap Nilai & Studio Caption
// ============================================================================
let tahfidzMasterData = [];
let tahfidzRekapData = [];
let tahfidzCurrentUnitFilter = 'all';
let tahfidzActiveStudent = null;
let isTahfidzMasterTableVisible = false;
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map(s => {
              if (!s.statusPamflet) s.statusPamflet = 'none';
              return s;
            });
          }
        }
      } catch (e) {
        console.warn('Gagal membaca tahfidz_master_students_v1:', e);
      }
      return TAHFIDZ_DEFAULT_STUDENTS.slice();
    }

    // Status Pamflet Selector & Badge Handler
    function setTahfidzPamfletStatus(status, silent = false) {
      const valEl = document.getElementById('tahfidzPamfletStatusVal');
      if (valEl) valEl.value = status;

      const btnPending = document.getElementById('btnPamflet_pending');
      const btnSelesai = document.getElementById('btnPamflet_selesai');
      const badge = document.getElementById('tahfidzPamfletStatusBadge');
      const quickBtnText = document.getElementById('btnQuickMarkPamfletDoneText');
      const quickBtn = document.getElementById('btnQuickMarkPamfletDone');

      if (status === 'pending') {
        if (btnPending) btnPending.className = 'py-1.5 px-2 rounded-none border text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 bg-amber-500 text-white border-amber-500 shadow-2xs cursor-pointer';
        if (btnSelesai) btnSelesai.className = 'py-1.5 px-2 rounded-none border text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 cursor-pointer';
        if (badge) {
          badge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-none bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 flex items-center gap-1';
          badge.innerHTML = '<i data-lucide="clock" class="w-3 h-3 text-amber-600"></i><span>Butuh Pamflet</span>';
        }
        if (quickBtnText) quickBtnText.textContent = 'Tandai Pamflet Selesai Dibuat';
        if (quickBtn) quickBtn.className = 'w-full py-1.5 px-2.5 rounded-none bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-bold text-xs border border-amber-300 dark:border-amber-700/60 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs';
      } else {
        if (btnPending) btnPending.className = 'py-1.5 px-2 rounded-none border text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 cursor-pointer';
        if (btnSelesai) btnSelesai.className = 'py-1.5 px-2 rounded-none border text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 bg-emerald-600 text-white border-emerald-600 shadow-2xs cursor-pointer';
        if (badge) {
          badge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-none bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60 flex items-center gap-1';
          badge.innerHTML = '<i data-lucide="check-circle-2" class="w-3 h-3 text-emerald-600"></i><span>Pamflet Selesai</span>';
        }
        if (quickBtnText) quickBtnText.textContent = 'Pamflet Selesai (Klik untuk Ubah)';
        if (quickBtn) quickBtn.className = 'w-full py-1.5 px-2.5 rounded-none bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-300 dark:border-emerald-700/60 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs';
      }

      if (!silent) {
        saveTahfidzMasterStudent({ silent: true });
        updateTahfidzPamfletBadgeCount();
        renderTahfidzMasterTable();
      }
      safeCreateIcons();
    }

    function quickTogglePamfletDone() {
      const currentVal = document.getElementById('tahfidzPamfletStatusVal')?.value || 'pending';
      const newVal = currentVal === 'pending' ? 'selesai' : 'pending';
      setTahfidzPamfletStatus(newVal, false);
      const nama = document.getElementById('tahfidzNama')?.value || 'Santri';
      if (newVal === 'selesai') {
        showToast('Pamflet Selesai!', `Status ananda ${nama} ditandai: Pamflet Sudah Dibuat & Disinkronkan.`);
      } else {
        showToast('Status Diubah', `Ananda ${nama} dimasukkan kembali ke antrean butuh pamflet.`);
      }
    }

    function updateTahfidzPamfletBadgeCount() {
      const master = getTahfidzMasterStudents();
      const count = master.filter(s => s.statusPamflet === 'pending').length;
      const badge = document.getElementById('tahfidzPendingPamfletCountBadge');
      if (badge) {
        badge.textContent = count;
      }
    }

    // Google Sheets Cloud Multi-Device Sync Indicator
    function updateTahfidzCloudSyncStatus(status, detail) {
      const icon = document.getElementById('tahfidzCloudSyncIcon');
      const text = document.getElementById('tahfidzCloudSyncText');
      const btn = document.getElementById('tahfidzCloudSyncBtn');
      if (!btn) return;

      if (status === 'syncing') {
        if (text) text.textContent = 'Menyimpan ke Cloud...';
        if (icon) {
          icon.setAttribute('data-lucide', 'loader-2');
          icon.classList.add('animate-spin');
        }
        btn.className = 'px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/70 text-blue-800 dark:text-sky-300 border border-blue-300 dark:border-blue-700/60 shadow-2xs cursor-pointer';
      } else if (status === 'synced') {
        if (text) text.textContent = 'Spreadsheet Tersinkron';
        if (icon) {
          icon.setAttribute('data-lucide', 'check-circle');
          icon.classList.remove('animate-spin');
        }
        btn.className = 'px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 shadow-2xs cursor-pointer';
      } else if (status === 'error') {
        if (text) text.textContent = 'Tersimpan Lokal (Offline)';
        if (icon) {
          icon.setAttribute('data-lucide', 'cloud-off');
          icon.classList.remove('animate-spin');
        }
        btn.className = 'px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 shadow-2xs cursor-pointer';
      }
      safeCreateIcons();
    }

    function syncTahfidzWithGoogleSheets(isSilent = false) {
      if (typeof google !== 'undefined' && google.script && google.script.run) {
        updateTahfidzCloudSyncStatus('syncing');
        const master = getTahfidzMasterStudents();
        google.script.run
          .withSuccessHandler(function(res) {
            updateTahfidzCloudSyncStatus('synced', res.timestamp);
            if (!isSilent) showToast('Cloud Tersinkron!', `Berhasil menyinkronkan ${res.count || master.length} data santri ke tab Data_Tahfidz_Master di Google Sheets.`);
          })
          .withFailureHandler(function(err) {
            updateTahfidzCloudSyncStatus('error', err);
            if (!isSilent) showToast('Mode Lokal', 'Aplikasi berjalan dalam mode lokal atau spreadsheet belum dibuka.');
          })
          .saveTahfidzMasterToSheet(master);
      } else {
        updateTahfidzCloudSyncStatus('error');
        if (!isSilent) showToast('Penyimpanan Lokal Aktif', 'Data tersimpan otomatis di memori browser ini (LocalStorage). Untuk sinkronisasi cloud multi-perangkat, jalankan lewat Google Apps Script.');
      }
    }

    // Simpan / Perbarui Profil Santri ke Master Database (LocalStorage)
    function saveTahfidzMasterStudent(options = {}) {
      const nama = document.getElementById('tahfidzNama')?.value?.trim();
      if (!nama || nama === '.......................') {
        if (!options.silent) {
          alert('Mohon masukkan nama santri terlebih dahulu sebelum menyimpan!');
        }
        return false;
      }

      const unit = document.getElementById('tahfidzUnit')?.value || 'MI';
      const kelas = document.getElementById('tahfidzKelas')?.value?.trim() || 'Kelas 1';
      const bapak = document.getElementById('tahfidzBapak')?.value?.trim() || '-';
      const ibu = document.getElementById('tahfidzIbu')?.value?.trim() || '-';
      const kategori = document.getElementById('tahfidzKategori')?.value?.trim() || '1 Juz';
      const juz = document.getElementById('tahfidzJuz')?.value?.trim() || 'Juz 30';
      const gender = currentTahfidzGender || 'Putra';
      const statusPamflet = document.getElementById('tahfidzPamfletStatusVal')?.value || 'pending';

      let master = getTahfidzMasterStudents();
      
      // Cari apakah santri sudah ada (berdasarkan ID aktif atau kecocokan nama)
      let existingIndex = -1;
      if (currentTahfidzStudentId) {
        existingIndex = master.findIndex(s => s.id === currentTahfidzStudentId);
      }
      if (existingIndex === -1) {
        existingIndex = master.findIndex(s => s.nama.toLowerCase().trim() === nama.toLowerCase().trim() && s.unit === unit);
      }
      if (existingIndex === -1) {
        existingIndex = master.findIndex(s => s.nama.toLowerCase().trim() === nama.toLowerCase().trim());
      }

      let savedId = currentTahfidzStudentId;
      if (existingIndex !== -1) {
        // Perbarui profil santri yang ada
        master[existingIndex].nama = nama;
        master[existingIndex].unit = unit;
        master[existingIndex].kelas = kelas;
        master[existingIndex].gender = gender;
        master[existingIndex].bapak = bapak;
        master[existingIndex].ibu = ibu;
        master[existingIndex].defaultKategori = kategori;
        master[existingIndex].defaultJuz = juz;
        master[existingIndex].statusPamflet = statusPamflet;
        savedId = master[existingIndex].id;
      } else {
        // Tambahkan santri baru ke master database
        savedId = 'santri-' + Date.now();
        const newStudent = {
          id: savedId,
          nama: nama,
          unit: unit,
          kelas: kelas,
          gender: gender,
          bapak: bapak,
          ibu: ibu,
          defaultKategori: kategori,
          defaultJuz: juz,
          statusPamflet: statusPamflet
        };
        master.unshift(newStudent);
      }

      currentTahfidzStudentId = savedId;
      isTahfidzDataDirty = false;

      try {
        localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(master));
      } catch (e) {
        console.error('Error saving tahfidz master:', e);
        if (!options.silent) alert('Gagal menyimpan ke penyimpanan lokal: ' + e.message);
        return false;
      }

      updateTahfidzPamfletBadgeCount();
        renderTahfidzMasterTable();
      syncTahfidzWithGoogleSheets(true);
      if (typeof syncTahfidzToSupabase === 'function') {
        syncTahfidzToSupabase(false);
      }

      // Update status visual badge
      const statusBadge = document.getElementById('tahfidzMasterStatusBadge');
      if (statusBadge) {
        statusBadge.className = 'inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60';
        statusBadge.innerHTML = '<i data-lucide="check-check" class="w-3 h-3"></i><span>Tersimpan Permanen & Cloud</span>';
      }

      const activeBadge = document.getElementById('tahfidzActiveStudentBadge');
      if (activeBadge) {
        activeBadge.innerText = `${nama} (${unit}) • Tersimpan`;
      }

      const btnSaveText = document.getElementById('btnSaveTahfidzMasterText');
      if (btnSaveText) {
        const originalText = 'Simpan Perubahan ke Database Santri';
        btnSaveText.innerText = '✓ Data Tersimpan!';
        setTimeout(() => {
          if (btnSaveText) btnSaveText.innerText = originalText;
        }, 2500);
      }

      if (!options.silent) {
        if (typeof showToast === 'function') {
          showToast(`Data santri ${nama} (Wali: ${bapak} & ${ibu}, Juz: ${juz}) berhasil disimpan & disinkronkan!`);
        } else if (typeof showModernNotification === 'function') {
          showModernNotification('success', `Data santri ${nama} berhasil disimpan ke database.`);
        }
      }

      safeCreateIcons();
      return true;
    }

    // Kembalikan Database Santri ke 31 Data Standar Awal
    function resetTahfidzMasterToDefault() {
      if (!confirm('Kembalikan data santri ke 31 data bawaan resmi YTPAI? Semua pembenahan manual akan direset ke awal.')) return;
      try {
        localStorage.removeItem('tahfidz_master_students_v1');
        selectTahfidzStudent('mi-5');
        updateTahfidzPamfletBadgeCount();
        renderTahfidzMasterTable();
        renderTahfidzMasterTable();
        syncTahfidzWithGoogleSheets(true);
        if (typeof showToast === 'function') {
          showToast('Database santri berhasil direset ke 31 data bawaan.');
        } else if (typeof showModernNotification === 'function') {
          showModernNotification('info', 'Database santri direset ke default.');
        }
      } catch (e) {
        console.error('Error resetting master:', e);
      }
    }

    let currentTahfidzMasterFilter = 'ALL';

    // Toggle Tampilkan / Sembunyikan Panel Master Data Santri
    function toggleTahfidzMasterTable(forceState) {
      const panel = document.getElementById('tahfidzMasterPreviewPanel');
      const icon = document.getElementById('iconToggleTahfidzMaster');
      const label = document.getElementById('labelToggleTahfidzMaster');
      if (!panel) return;

      const isHidden = panel.classList.contains('hidden');
      const shouldShow = typeof forceState === 'boolean' ? forceState : isHidden;

      if (shouldShow) {
        panel.classList.remove('hidden');
        if (icon) icon.setAttribute('data-lucide', 'eye-off');
        if (label) label.textContent = 'Tutup Database';
        renderTahfidzMasterTable();
      } else {
        panel.classList.add('hidden');
        if (icon) icon.setAttribute('data-lucide', 'eye');
        if (label) label.textContent = 'Buka Database';
      }
      safeCreateIcons();
    }

    // Filter Unit dalam Tabel Master Data
    function filterTahfidzMasterTable(unit) {
      currentTahfidzMasterFilter = unit;
      const units = ['ALL', 'MI', 'MTs', 'SMP', 'MA', 'SMA'];
      units.forEach(u => {
        const btn = document.getElementById('masterTblFilter_' + u);
        if (!btn) return;
        if (u === unit) {
          btn.className = 'master-tbl-filter-btn px-2 py-0.5 rounded-none text-[11px] font-bold bg-blue-600 text-white border border-blue-600 cursor-pointer shadow-2xs';
        } else {
          btn.className = 'master-tbl-filter-btn px-2 py-0.5 rounded-none text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 cursor-pointer';
        }
      });
      renderTahfidzMasterTable();
    }

    // Render Tabel Master Data Santri (Lengkap dengan Wali, Juz, Unit & Quick Actions)
    function renderTahfidzMasterTable() {
      const tbody = document.getElementById('tahfidzMasterTableBody');
      const infoEl = document.getElementById('tahfidzMasterTableInfo');
      const totalBadge = document.getElementById('tahfidzMasterTotalCountBadge');
      if (!tbody) return;

      const master = getTahfidzMasterStudents();
      if (totalBadge) totalBadge.textContent = `${master.length} Santri`;

      const searchVal = (document.getElementById('tahfidzMasterTableSearch')?.value || '').toLowerCase().trim();
      
      let filtered = master.filter(s => {
        if (currentTahfidzMasterFilter !== 'ALL' && s.unit !== currentTahfidzMasterFilter) return false;
        if (searchVal) {
          const matchNama = (s.nama || '').toLowerCase().includes(searchVal);
          const matchUnit = (s.unit || '').toLowerCase().includes(searchVal);
          const matchBapak = (s.bapak || '').toLowerCase().includes(searchVal);
          const matchIbu = (s.ibu || '').toLowerCase().includes(searchVal);
          const matchJuz = (s.defaultJuz || '').toLowerCase().includes(searchVal) || (s.defaultKategori || '').toLowerCase().includes(searchVal);
          if (!matchNama && !matchUnit && !matchBapak && !matchIbu && !matchJuz) return false;
        }
        return true;
      });

      if (infoEl) {
        infoEl.textContent = `Menampilkan ${filtered.length} dari total ${master.length} santri terdaftar`;
      }

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="7" class="p-6 text-center text-slate-400 dark:text-slate-500 font-medium">
              Tidak ada data santri yang cocok dengan pencarian atau filter unit ini.
            </td>
          </tr>
        `;
        return;
      }

      const unitColorMap = {
        'MI': 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60',
        'MTs': 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-sky-300 border-blue-300 dark:border-blue-800/60',
        'SMP': 'bg-pink-100 dark:bg-pink-950/70 text-pink-800 dark:text-pink-300 border-pink-300 dark:border-pink-800/60',
        'MA': 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800/60',
        'SMA': 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60'
      };

      tbody.innerHTML = filtered.map((s, idx) => {
        const isCurrentActive = currentTahfidzStudentId === s.id;
        const uColor = unitColorMap[s.unit] || 'bg-slate-100 text-slate-800';
        const genderBadge = s.gender === 'Putri' 
          ? '<span class="text-[9.5px] font-bold px-1 py-0.2 bg-pink-50 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300 border border-pink-200 dark:border-pink-800 rounded-none">Putri</span>'
          : '<span class="text-[9.5px] font-bold px-1 py-0.2 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-none">Putra</span>';

        let pamfletBadge = '';
        if (s.statusPamflet === 'pending') {
          pamfletBadge = `<button type="button" onclick="toggleStudentPamfletInTable('${s.id}')" class="px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700 rounded-none font-bold text-[10px] cursor-pointer shadow-2xs flex items-center justify-center gap-1 mx-auto" title="Klik untuk ubah status"><span class="w-1.5 h-1.5 rounded-none bg-amber-500 animate-pulse"></span><span>Butuh Pamflet</span></button>`;
        } else if (s.statusPamflet === 'selesai') {
          pamfletBadge = `<button type="button" onclick="toggleStudentPamfletInTable('${s.id}')" class="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-none font-bold text-[10px] cursor-pointer shadow-2xs flex items-center justify-center gap-1 mx-auto" title="Klik untuk ubah status">✓ Selesai</button>`;
        } else {
          pamfletBadge = `<button type="button" onclick="toggleStudentPamfletInTable('${s.id}')" class="px-1.5 py-0.5 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-300 dark:border-slate-700 rounded-none font-semibold text-[10px] cursor-pointer mx-auto" title="Klik untuk tandai butuh pamflet">- Normal</button>`;
        }

        const activeRowClass = isCurrentActive ? 'bg-emerald-50/60 dark:bg-emerald-950/20 font-medium' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50';

        return `
          <tr class="${activeRowClass} transition-all">
            <td class="p-2 text-center text-slate-400 font-bold">${idx + 1}</td>
            <td class="p-2 font-bold text-slate-900 dark:text-white">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span>${escapeHtml(s.nama)}</span>
                ${genderBadge}
                ${isCurrentActive ? '<span class="text-[9px] font-black px-1 bg-emerald-600 text-white rounded-none">AKTIF</span>' : ''}
              </div>
            </td>
            <td class="p-2">
              <div class="flex items-center gap-1">
                <span class="px-1.5 py-0.2 rounded-none font-bold text-[10px] border ${uColor}">${s.unit}</span>
                <span class="text-slate-500 dark:text-slate-400 text-[10.5px]">${escapeHtml(s.kelas || '-')}</span>
              </div>
            </td>
            <td class="p-2 text-slate-600 dark:text-slate-300">
              <div class="leading-tight">
                <div><span class="text-slate-400 text-[10px]">Ayah:</span> <b>${escapeHtml(s.bapak || '-')}</b></div>
                <div><span class="text-slate-400 text-[10px]">Ibu:</span> <b>${escapeHtml(s.ibu || '-')}</b></div>
              </div>
            </td>
            <td class="p-2 text-slate-700 dark:text-slate-200">
              <div class="leading-tight">
                <span class="font-bold text-emerald-600 dark:text-emerald-400">${escapeHtml(s.defaultKategori || '-')}</span>
                <div class="text-[10px] text-slate-500">${escapeHtml(s.defaultJuz || '-')}</div>
              </div>
            </td>
            <td class="p-2 text-center">
              ${pamfletBadge}
            </td>
            <td class="p-2 text-center">
              <div class="flex items-center justify-center gap-1">
                <button 
                  type="button" 
                  onclick="selectTahfidzStudent('${s.id}'); if (typeof scrollToElement === 'function') scrollToElement('tahfidzViewGenerator');" 
                  class="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-none font-bold text-[10.5px] cursor-pointer shadow-2xs flex items-center gap-1 whitespace-nowrap"
                  title="Muat data ananda ke form generator utama"
                >
                  <i data-lucide="zap" class="w-3 h-3"></i>
                  <span>Muat Form</span>
                </button>
                <button 
                  type="button" 
                  onclick="openTahfidzEditModal('${s.id}')" 
                  class="p-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-none cursor-pointer"
                  title="Edit Cepat Data Santri"
                >
                  <i data-lucide="edit-2" class="w-3.5 h-3.5"></i>
                </button>
                <button 
                  type="button" 
                  onclick="deleteTahfidzStudent('${s.id}')" 
                  class="p-1 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-none cursor-pointer"
                  title="Hapus Santri dari Database"
                >
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      safeCreateIcons();
    }

    // Modal Edit / Tambah Santri
    function openTahfidzNewStudentModal() {
      const titleEl = document.getElementById('tahfidzModalTitle');
      if (titleEl) titleEl.textContent = '+ Tambah Santri Baru ke Database';
      
      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
      setVal('modalStudentId', '');
      setVal('modalStudentNama', '');
      setVal('modalStudentUnit', 'MI');
      setVal('modalStudentKelas', 'Kelas 4');
      setVal('modalStudentGender', 'Putra');
      setVal('modalStudentPamflet', 'none');
      setVal('modalStudentBapak', '');
      setVal('modalStudentIbu', '');
      setVal('modalStudentKategori', '1 Juz');
      setVal('modalStudentJuz', 'Juz 30');

      const modal = document.getElementById('tahfidzStudentEditModal');
      if (modal) modal.classList.remove('hidden');
      safeCreateIcons();
    }

    function openTahfidzEditModal(studentId) {
      const master = getTahfidzMasterStudents();
      const s = master.find(item => item.id === studentId);
      if (!s) return;

      const titleEl = document.getElementById('tahfidzModalTitle');
      if (titleEl) titleEl.textContent = `Edit Data Santri: ${s.nama}`;
      
      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
      setVal('modalStudentId', s.id);
      setVal('modalStudentNama', s.nama || '');
      setVal('modalStudentUnit', s.unit || 'MI');
      setVal('modalStudentKelas', s.kelas || '');
      setVal('modalStudentGender', s.gender || 'Putra');
      setVal('modalStudentPamflet', s.statusPamflet || 'none');
      setVal('modalStudentBapak', s.bapak || '');
      setVal('modalStudentIbu', s.ibu || '');
      setVal('modalStudentKategori', s.defaultKategori || '');
      setVal('modalStudentJuz', s.defaultJuz || '');

      const modal = document.getElementById('tahfidzStudentEditModal');
      if (modal) modal.classList.remove('hidden');
      safeCreateIcons();
    }

    function closeTahfidzStudentModal() {
      const modal = document.getElementById('tahfidzStudentEditModal');
      if (modal) modal.classList.add('hidden');
    }

    function saveTahfidzStudentFromModal() {
      const id = document.getElementById('modalStudentId')?.value;
      const nama = document.getElementById('modalStudentNama')?.value?.trim();
      if (!nama) {
        alert('Nama lengkap santri tidak boleh kosong!');
        return;
      }

      const unit = document.getElementById('modalStudentUnit')?.value || 'MI';
      const kelas = document.getElementById('modalStudentKelas')?.value?.trim() || '-';
      const gender = document.getElementById('modalStudentGender')?.value || 'Putra';
      const statusPamflet = document.getElementById('modalStudentPamflet')?.value || 'none';
      const bapak = document.getElementById('modalStudentBapak')?.value?.trim() || '-';
      const ibu = document.getElementById('modalStudentIbu')?.value?.trim() || '-';
      const kategori = document.getElementById('modalStudentKategori')?.value?.trim() || '1 Juz';
      const juz = document.getElementById('modalStudentJuz')?.value?.trim() || 'Juz 30';

      let master = getTahfidzMasterStudents();
      if (id) {
        const idx = master.findIndex(s => s.id === id);
        if (idx !== -1) {
          master[idx].nama = nama;
          master[idx].unit = unit;
          master[idx].kelas = kelas;
          master[idx].gender = gender;
          master[idx].statusPamflet = statusPamflet;
          master[idx].bapak = bapak;
          master[idx].ibu = ibu;
          master[idx].defaultKategori = kategori;
          master[idx].defaultJuz = juz;
        }
      } else {
        const newId = 'santri-' + Date.now();
        master.unshift({
          id: newId,
          nama: nama,
          unit: unit,
          kelas: kelas,
          gender: gender,
          statusPamflet: statusPamflet,
          bapak: bapak,
          ibu: ibu,
          defaultKategori: kategori,
          defaultJuz: juz
        });
      }

      try {
        localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(master));
      } catch (e) {
        console.error('Save modal error:', e);
      }

      closeTahfidzStudentModal();
      renderTahfidzMasterTable();
      updateTahfidzPamfletBadgeCount();
        renderTahfidzMasterTable();
      syncTahfidzWithGoogleSheets(true);

      if (id && currentTahfidzStudentId === id) {
        selectTahfidzStudent(id);
      }

      if (typeof showToast === 'function') {
        showToast('Berhasil Disimpan!', `Data santri ${nama} berhasil disimpan ke database.`);
      }
    }

    function deleteTahfidzStudent(studentId) {
      let master = getTahfidzMasterStudents();
      const s = master.find(item => item.id === studentId);
      if (!s) return;

      if (!confirm(`Hapus data santri "${s.nama}" dari database?`)) return;

      master = master.filter(item => item.id !== studentId);
      try {
        localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(master));
      } catch (e) {
        console.error('Delete student error:', e);
      }

      renderTahfidzMasterTable();
      updateTahfidzPamfletBadgeCount();
        renderTahfidzMasterTable();
      syncTahfidzWithGoogleSheets(true);

      if (typeof showToast === 'function') {
        showToast('Data Dihapus', `Santri ${s.nama} telah dihapus.`);
      }
    }

    function toggleStudentPamfletInTable(studentId) {
      let master = getTahfidzMasterStudents();
      const s = master.find(item => item.id === studentId);
      if (!s) return;

      if (s.statusPamflet === 'pending') {
        s.statusPamflet = 'selesai';
      } else if (s.statusPamflet === 'selesai') {
        s.statusPamflet = 'none';
      } else {
        s.statusPamflet = 'pending';
      }

      try {
        localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(master));
      } catch (e) {
        console.error('Toggle pamflet error:', e);
      }

      renderTahfidzMasterTable();
      updateTahfidzPamfletBadgeCount();
        renderTahfidzMasterTable();
      syncTahfidzWithGoogleSheets(true);

      if (currentTahfidzStudentId === studentId) {
        setTahfidzPamfletStatus(s.statusPamflet, true);
      }
    }

    // Inisialisasi Modul Tahfidz
    function initTahfidzModule() {
      try {
        updateTahfidzRekapBadgeCount();
        updateTahfidzPamfletBadgeCount();
        renderTahfidzMasterTable();
        renderTahfidzRecommendations();

        // Default awal jika form masih kosong
        const namaInput = document.getElementById('tahfidzNama');
        if (namaInput && !namaInput.value) {
          selectTahfidzStudent('mi-5');
        } else {
          updateTahfidzCaptionPreview();
        }

        // Cek Google Sheets untuk sinkronisasi cloud antar perangkat
        if (typeof google !== 'undefined' && google.script && google.script.run) {
          updateTahfidzCloudSyncStatus('syncing');
          google.script.run
            .withSuccessHandler(function(res) {
              if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
                localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(res.data));
                updateTahfidzCloudSyncStatus('synced');
                updateTahfidzPamfletBadgeCount();
        renderTahfidzMasterTable();
              } else {
                updateTahfidzCloudSyncStatus('synced');
              }
            })
            .withFailureHandler(function(err) {
              updateTahfidzCloudSyncStatus('error', err);
            })
            .getTahfidzMasterFromSheet();
        }

        // Close dropdown when clicked outside
        document.addEventListener('click', function(e) {
          const wrapper = document.getElementById('tahfidzSearchWrapper');
          const dropdown = document.getElementById('tahfidzSearchDropdown');
          if (wrapper && dropdown && !wrapper.contains(e.target)) {
            dropdown.classList.add('hidden');
          }
        });
      } catch (err) {
        console.warn('initTahfidzModule error:', err);
      }
    }

    // Switch Sub-View: Generator vs Rekap
    function switchTahfidzSubView(view) {
      currentTahfidzSubView = view;
      const genView = document.getElementById('tahfidzViewGenerator');
      const rekapView = document.getElementById('tahfidzViewRekap');
      const btnGen = document.getElementById('tahfidzSubBtnGen');
      const btnRekap = document.getElementById('tahfidzSubBtnRekap');

      if (view === 'generator') {
        if (genView) genView.classList.remove('hidden');
        if (rekapView) rekapView.classList.add('hidden');
        if (btnGen) {
          btnGen.className = 'flex-1 sm:flex-initial px-3 py-1.5 rounded-none text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-2xs cursor-pointer whitespace-nowrap';
        }
        if (btnRekap) {
          btnRekap.className = 'flex-1 sm:flex-initial px-3 py-1.5 rounded-none text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer whitespace-nowrap';
        }
      } else {
        if (genView) genView.classList.add('hidden');
        if (rekapView) rekapView.classList.remove('hidden');
        if (btnGen) {
          btnGen.className = 'flex-1 sm:flex-initial px-3 py-1.5 rounded-none text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer whitespace-nowrap';
        }
        if (btnRekap) {
          btnRekap.className = 'flex-1 sm:flex-initial px-3 py-1.5 rounded-none text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-2xs cursor-pointer whitespace-nowrap';
        }
        renderTahfidzRekapTable();
      }
      safeCreateIcons();
    }

    // Filter Chips: ALL, MI, MTs, SMP, MA, SMA, PENDING_PAMFLET
    function setTahfidzUnitFilter(unit) {
      currentTahfidzUnitFilter = unit;
      const chips = ['ALL', 'MI', 'MTs', 'SMP', 'MA', 'SMA'];
      chips.forEach(c => {
        const btn = document.getElementById('tahfidzChip_' + c);
        if (!btn) return;
        if (c === unit) {
          btn.className = 'tahfidz-unit-chip py-1 px-0.5 rounded-none text-center font-bold transition-all bg-emerald-600 text-white shadow-2xs border border-emerald-600 cursor-pointer flex flex-col items-center justify-center';
        } else {
          btn.className = 'tahfidz-unit-chip py-1 px-0.5 rounded-none text-center font-semibold transition-all bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 cursor-pointer flex flex-col items-center justify-center';
        }
      });

      const pendingChip = document.getElementById('tahfidzChip_PENDING_PAMFLET');
      if (pendingChip) {
        if (unit === 'PENDING_PAMFLET') {
          pendingChip.className = 'tahfidz-unit-chip px-2.5 py-1 rounded-none text-[10.5px] font-extrabold transition-all bg-amber-500 text-white border border-amber-600 shadow-md cursor-pointer flex items-center gap-1.5 ring-2 ring-amber-400/40 flex-shrink-0';
        } else {
          pendingChip.className = 'tahfidz-unit-chip px-2.5 py-1 rounded-none text-[10.5px] font-bold transition-all bg-amber-100 dark:bg-amber-950/70 hover:bg-amber-200 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700/60 cursor-pointer flex items-center gap-1.5 shadow-2xs flex-shrink-0';
        }
      }

      // 1. Render Rekomendasi Cepat khusus unit yang dipilih
      renderTahfidzRecommendations();

      // 2. Otomatis pilih santri pertama yang ada di unit tersebut
      const masterStudents = getTahfidzMasterStudents();
      let matched = [];
      if (unit === 'PENDING_PAMFLET') {
        matched = masterStudents.filter(s => s.statusPamflet === 'pending');
      } else if (unit !== 'ALL') {
        matched = masterStudents.filter(s => s.unit === unit);
      }
      if (matched.length > 0) {
        const cur = masterStudents.find(s => s.id === currentTahfidzStudentId);
        if (!cur || (unit !== 'ALL' && unit !== 'PENDING_PAMFLET' && cur.unit !== unit) || (unit === 'PENDING_PAMFLET' && cur.statusPamflet !== 'pending')) {
          selectTahfidzStudent(matched[0].id);
        }
      }

      // 3. Update active search input placeholder & dropdown
      const searchInput = document.getElementById('tahfidzSearchInput');
      if (searchInput) {
        if (unit === 'PENDING_PAMFLET') {
          searchInput.placeholder = 'Menampilkan santri yang butuh pamflet...';
        } else if (unit !== 'ALL') {
          searchInput.placeholder = `Cari santri unit ${unit}...`;
        } else {
          searchInput.placeholder = 'Ketik nama santri atau pilih unit...';
        }
        handleTahfidzSearchInput(searchInput.value);
      }

      // 4. Update tabel database jika sedang terbuka
      renderTahfidzMasterTable();
    }

    // Render Tombol Rekomendasi Cepat Dinamis Sesuai Unit yang Dipilih
    function renderTahfidzRecommendations() {
      const container = document.getElementById('tahfidzRecList');
      const titleEl = document.getElementById('tahfidzRecTitle');
      if (!container) return;

      const masterStudents = getTahfidzMasterStudents();
      let students = [];
      
      if (currentTahfidzUnitFilter === 'PENDING_PAMFLET') {
        students = masterStudents.filter(s => s.statusPamflet === 'pending');
        if (titleEl) titleEl.textContent = `Butuh Pamflet (${students.length}):`;
      } else if (currentTahfidzUnitFilter !== 'ALL') {
        students = masterStudents.filter(s => s.unit === currentTahfidzUnitFilter);
        if (titleEl) titleEl.textContent = `Santri ${currentTahfidzUnitFilter} (${students.length}):`;
      } else {
        students = masterStudents;
        if (titleEl) titleEl.textContent = 'Rekomendasi Cepat:';
      }

      if (students.length === 0) {
        container.innerHTML = `<span class="text-[10.5px] text-slate-400 italic">Tidak ada santri di unit ini</span>`;
        return;
      }

      const unitColorMap = {
        'MI': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 border-emerald-300 dark:border-emerald-800/60',
        'MTs': 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-sky-300 hover:bg-blue-100 border-blue-300 dark:border-blue-800/60',
        'SMP': 'bg-pink-50 dark:bg-pink-950/40 text-pink-800 dark:text-pink-300 hover:bg-pink-100 border-pink-300 dark:border-pink-800/60',
        'MA': 'bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 hover:bg-purple-100 border-purple-300 dark:border-purple-800/60',
        'SMA': 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 border-amber-300 dark:border-amber-800/60'
      };

      container.innerHTML = students.map(s => {
        const colorClass = unitColorMap[s.unit] || 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
        const isSelected = currentTahfidzStudentId === s.id;
        const activeClass = isSelected ? 'ring-2 ring-emerald-500 font-extrabold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-100 shadow-2xs' : 'font-semibold';
        return `<button type="button" onclick="selectTahfidzStudent('${s.id}')" class="px-2 py-0.5 rounded-none border text-[10.5px] cursor-pointer transition-all flex-shrink-0 whitespace-nowrap active:scale-95 ${colorClass} ${activeClass}">
          ${s.nama} (${s.unit})
        </button>`;
      }).join('');
    }

    // Autocomplete & Smart Recommendation Handler
    function handleTahfidzSearchInput(val) {
      const q = (val || '').toLowerCase().trim();
      const clearBtn = document.getElementById('tahfidzSearchClearBtn');
      const dropdown = document.getElementById('tahfidzSearchDropdown');
      if (!dropdown) return;

      if (clearBtn) {
        if (q.length > 0) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
      }

      // Filter data santri dari database master dinamis
      const masterStudents = getTahfidzMasterStudents();
      let filtered = masterStudents;
      if (currentTahfidzUnitFilter === 'PENDING_PAMFLET') {
        filtered = filtered.filter(s => s.statusPamflet === 'pending');
      } else if (currentTahfidzUnitFilter !== 'ALL') {
        filtered = filtered.filter(s => s.unit === currentTahfidzUnitFilter);
      }
      if (q.length > 0) {
        filtered = filtered.filter(s => 
          (s.nama && s.nama.toLowerCase().includes(q)) ||
          (s.bapak && s.bapak.toLowerCase().includes(q)) ||
          (s.ibu && s.ibu.toLowerCase().includes(q)) ||
          (s.unit && s.unit.toLowerCase().includes(q)) ||
          (s.kelas && s.kelas.toLowerCase().includes(q)) ||
          (s.defaultKategori && s.defaultKategori.toLowerCase().includes(q)) ||
          (s.defaultJuz && s.defaultJuz.toLowerCase().includes(q))
        );
      }

      if (filtered.length === 0) {
        dropdown.innerHTML = `
          <div class="p-4 text-center text-xs text-slate-400 dark:text-slate-500">
            <p class="font-bold text-slate-600 dark:text-slate-300">${currentTahfidzUnitFilter === 'PENDING_PAMFLET' ? 'Tidak ada santri yang butuh pamflet' : 'Tidak ada santri atau orang tua ditemukan'}</p>
            <p class="text-[11px] mt-0.5">${currentTahfidzUnitFilter === 'PENDING_PAMFLET' ? 'Semua pamflet santri sudah selesai dibuat!' : 'Coba cari dengan kata kunci nama anak, bapak, ibu, atau unit lain'}</p>
          </div>
        `;
        dropdown.classList.remove('hidden');
        return;
      }

      // Tampilkan judul rekomendasi cerdas di bagian atas dropdown
      const isSearchMode = q.length > 0;
      let html = `
        <div class="px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span class="font-bold flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
            <span>${currentTahfidzUnitFilter === 'PENDING_PAMFLET' ? `Antrean Pamflet: ${filtered.length} Santri` : (isSearchMode ? `Hasil Pencarian: ${filtered.length} Santri` : `💡 Database Santri & Orang Tua (${filtered.length})`)}</span>
          </span>
          <span class="text-[10px]">Klik untuk mengisi otomatis</span>
        </div>
      `;

      // Limit results to 25 for optimal performance
      const listToShow = filtered.slice(0, 25);
      listToShow.forEach(s => {
        const isPutri = s.gender === 'Putri';
        const isPending = s.statusPamflet === 'pending';

        // Highlight matching text if query present
        const highlight = (text) => {
          if (!q) return text || '';
          const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
          return String(text || '').replace(regex, '<mark class="bg-amber-200 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200 rounded px-0.5">$1</mark>');
        };

        html += `
          <div 
            onclick="selectTahfidzStudent('${s.id}')"
            class="p-3 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-colors cursor-pointer flex items-center justify-between gap-3 group border-b border-slate-100/60 dark:border-slate-800/40 last:border-b-0"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-9 h-9 rounded-xl ${isPutri ? 'bg-pink-500/15 text-pink-600 dark:text-pink-400' : 'bg-blue-500/15 text-blue-600 dark:text-sky-400'} flex items-center justify-center font-black text-xs flex-shrink-0">
                ${(s.nama || '?').charAt(0)}
              </div>
              <div class="min-w-0 text-left">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <p class="text-xs font-bold text-slate-800 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    ${highlight(s.nama)}
                  </p>
                  <span class="text-[9.5px] font-extrabold px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    ${s.unit} • ${s.kelas}
                  </span>
                  ${isPending ? '<span class="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300">⏳ Butuh Pamflet</span>' : '<span class="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">✓ Selesai</span>'}
                </div>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 flex items-center gap-1">
                  <span>👨‍👩‍👧 Orang Tua:</span>
                  <b class="text-slate-700 dark:text-slate-200 font-semibold">Bpk. ${highlight(s.bapak)} & Ibu ${highlight(s.ibu)}</b>
                </p>
              </div>
            </div>
            <div class="flex-shrink-0 text-right">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 block">
                Juz ${s.defaultJuz}
              </span>
              <span class="text-[9px] text-slate-400 block mt-0.5">${s.defaultKategori || '1 Juz'}</span>
            </div>
          </div>
        `;
      });

      dropdown.innerHTML = html;
      dropdown.classList.remove('hidden');
      safeCreateIcons();
    }

    // Bersihkan Search Input
    function clearTahfidzSearch() {
      const input = document.getElementById('tahfidzSearchInput');
      const clearBtn = document.getElementById('tahfidzSearchClearBtn');
      const dropdown = document.getElementById('tahfidzSearchDropdown');
      if (input) input.value = '';
      if (clearBtn) clearBtn.classList.add('hidden');
      if (dropdown) dropdown.classList.add('hidden');
    }

    // ==============================================================
    // PERINTAH SUARA (VOICE COMMAND) & SMART QUICK COMMAND
    // ==============================================================
    let tahfidzSpeechRecognitionInstance = null;
    let isTahfidzVoiceListening = false;

    // Toggle Perintah Suara
    function toggleTahfidzVoiceRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        if (typeof showToast === 'function') {
          showToast('Fitur Suara Tidak Didukung', 'Browser Anda belum mendukung Web Speech Recognition. Silakan gunakan Google Chrome di HP/Laptop atau ketik langsung di kotak pencarian.', 'warning');
        } else {
          alert('Browser ini belum mendukung Web Speech Recognition. Silakan gunakan Google Chrome.');
        }
        return;
      }

      if (isTahfidzVoiceListening) {
        stopTahfidzVoiceRecognition();
      } else {
        startTahfidzVoiceRecognition(SpeechRecognition);
      }
    }

    function startTahfidzVoiceRecognition(SpeechRecognition) {
      try {
        tahfidzSpeechRecognitionInstance = new SpeechRecognition();
        tahfidzSpeechRecognitionInstance.lang = 'id-ID';
        tahfidzSpeechRecognitionInstance.continuous = false;
        tahfidzSpeechRecognitionInstance.interimResults = true;

        const voiceBtn = document.getElementById('tahfidzVoiceBtn');
        const voiceIcon = document.getElementById('tahfidzVoiceIcon');
        const voiceLabel = document.getElementById('tahfidzVoiceBtnLabel');
        const listeningBanner = document.getElementById('tahfidzVoiceListeningBanner');
        const liveTranscript = document.getElementById('tahfidzVoiceLiveTranscript');

        tahfidzSpeechRecognitionInstance.onstart = function() {
          isTahfidzVoiceListening = true;
          if (voiceBtn) {
            voiceBtn.className = 'px-2 py-1 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-none text-[11px] font-bold flex items-center gap-1 shadow-md cursor-pointer transition-all border border-red-500 animate-pulse ring-2 ring-red-400';
          }
          if (voiceLabel) voiceLabel.textContent = 'Mendengarkan...';
          if (listeningBanner) listeningBanner.classList.remove('hidden');
          if (liveTranscript) liveTranscript.textContent = 'Silakan sebutkan nama santri, juz, & predikat (cth: "Fahri juz 30 mumtaz")...';
        };

        tahfidzSpeechRecognitionInstance.onresult = function(event) {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const currentText = finalTranscript || interimTranscript;
          if (liveTranscript && currentText) {
            liveTranscript.textContent = `"${currentText}"`;
          }

          if (finalTranscript) {
            processTahfidzSmartCommand(finalTranscript);
            stopTahfidzVoiceRecognition();
          }
        };

        tahfidzSpeechRecognitionInstance.onerror = function(event) {
          console.warn('Voice Recognition Error:', event.error);
          stopTahfidzVoiceRecognition();
          if (event.error !== 'no-speech' && typeof showToast === 'function') {
            showToast('Suara Tidak Terdeteksi', 'Coba ulangi berbicara lebih dekat ke mikrofon.', 'warning');
          }
        };

        tahfidzSpeechRecognitionInstance.onend = function() {
          stopTahfidzVoiceRecognition();
        };

        tahfidzSpeechRecognitionInstance.start();
      } catch (e) {
        console.error('Start Voice Recognition Failed:', e);
        stopTahfidzVoiceRecognition();
      }
    }

    function stopTahfidzVoiceRecognition() {
      isTahfidzVoiceListening = false;
      if (tahfidzSpeechRecognitionInstance) {
        try {
          tahfidzSpeechRecognitionInstance.stop();
        } catch (e) {}
        tahfidzSpeechRecognitionInstance = null;
      }

      const voiceBtn = document.getElementById('tahfidzVoiceBtn');
      const voiceLabel = document.getElementById('tahfidzVoiceBtnLabel');
      const listeningBanner = document.getElementById('tahfidzVoiceListeningBanner');

      if (voiceBtn) {
        voiceBtn.className = 'px-2 py-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-none text-[11px] font-bold flex items-center gap-1 shadow-2xs cursor-pointer transition-all border border-emerald-500';
      }
      if (voiceLabel) voiceLabel.textContent = 'Suara';
      if (listeningBanner) listeningBanner.classList.add('hidden');
    }

    // Handler saat tombol Enter ditekan pada Search Box
    function handleTahfidzSearchKeydown(e, val) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const dropdown = document.getElementById('tahfidzSearchDropdown');
        if (dropdown) dropdown.classList.add('hidden');
        processTahfidzSmartCommand(val);
      }
    }

    // Pemroses Perintah Cerdas (Voice & Text Command Parser Berbasis Natural Language)
    function processTahfidzSmartCommand(rawText) {
      if (!rawText || !rawText.trim()) return false;
      const originalText = rawText.trim();
      let text = originalText.toLowerCase();

      // Normalisasi kata angka lisan bahasa Indonesia (misal: "tiga puluh" -> "30")
      const wordToNumMap = {
        'tiga puluh': '30', 'dua puluh sembilan': '29', 'dua puluh delapan': '28', 'dua puluh tujuh': '27',
        'dua puluh enam': '26', 'dua puluh lima': '25', 'dua puluh empat': '24', 'dua puluh tiga': '23',
        'dua puluh dua': '22', 'dua puluh satu': '21', 'dua puluh': '20', 'sembilan belas': '19',
        'delapan belas': '18', 'tujuh belas': '17', 'enam belas': '16', 'lima belas': '15',
        'empat belas': '14', 'tiga belas': '13', 'dua belas': '12', 'sebelas': '11', 'sepuluh': '10',
        'sembilan': '9', 'delapan': '8', 'tujuh': '7', 'enam': '6', 'lima': '5', 'empat': '4',
        'tiga': '3', 'dua': '2', 'satu': '1'
      };
      for (const [w, n] of Object.entries(wordToNumMap)) {
        text = text.replace(new RegExp('\\b' + w + '\\b', 'g'), n);
      }

      // 1. Deteksi Predikat (Mumtaz, Jayyid Jiddan, Jayyid) dengan berbagai variasi bahasa
      let detectedPredikat = null;
      if (/\b(mumtaz|istimewa|sempurna|cumlaude|terbaik|sangat\s*memuaskan)\b/i.test(text)) {
        detectedPredikat = 'Mumtaz';
      } else if (/\b(jayyid\s*jiddan|jayyid\s*ziddan|sangat\s*baik|bagus\s*banget|bagus\s*sekali|memuaskan)\b/i.test(text)) {
        detectedPredikat = 'Jayyid Jiddan';
      } else if (/\b(jayyid|jayid|baik|bagus|lancar|cukup\s*baik)\b/i.test(text)) {
        detectedPredikat = 'Jayyid';
      }

      // 2. Deteksi Juz & Kategori
      let detectedJuz = null;
      let detectedKategori = null;
      
      // Format rentang: "juz 1-3" atau "juz 1 sampai 3"
      const rangeMatch = text.match(/(?:juz|jus)\s*(\d{1,2})\s*(?:-|sampai|sd|s\/d)\s*(\d{1,2})/i);
      if (rangeMatch) {
        const startJuz = parseInt(rangeMatch[1], 10);
        const endJuz = parseInt(rangeMatch[2], 10);
        detectedJuz = `${startJuz}-${endJuz}`;
        const totalJuz = Math.abs(endJuz - startJuz) + 1;
        detectedKategori = `${totalJuz} Juz`;
      } else {
        // Angka tunggal dengan awalan/akhiran juz (misal: "juz 30", "jus 30", "30 juz")
        const singleJuzMatch = text.match(/(?:juz|jus)\s*(\d{1,2})/i) || text.match(/(\d{1,2})\s*(?:juz|jus)/i);
        if (singleJuzMatch) {
          detectedJuz = singleJuzMatch[1];
          detectedKategori = '1 Juz';
        } else {
          // Angka independen 1-30 di kalimat
          const numMatch = text.match(/\b([1-9]|[12]\d|30)\b/);
          if (numMatch) {
            detectedJuz = numMatch[1];
            detectedKategori = '1 Juz';
          }
        }
      }

      // 3. Ekstraksi Nama Santri dari Teks (Membersihkan seluruh kata percakapan alami)
      let cleanQuery = text
        .replace(/\b(juz|jus|predikat|predikatnya|nilai|nilainya|hasil|hasilnya|dapat|mendapatkan|alhamdulillah|bismillah|lulus|selesai|telah|ujian|ujiannya|atas|nama|untuk|caption|pamflet|berhasil|tasmi|tasmiyah|hafalan|bil|ghoib|sekali|duduk|dengan|mumtaz|jayyid|jiddan|ziddan|istimewa|sempurna|baik|bagus|sekali|banget|sampai|ananda|santri|siswa|siswi|dari|bapak|ibu|unit|kelas|mi|mts|smp|ma|sma|tolong|buatkan|panggil|tampilkan|cari|tolongkan)\b/gi, ' ')
        .replace(/[\d\-\.\,]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const masterStudents = getTahfidzMasterStudents();
      let matchedStudent = null;
      let bestScore = 0;

      if (cleanQuery.length > 0) {
        const queryWords = cleanQuery.split(' ').filter(w => w.length >= 2);

        masterStudents.forEach(s => {
          let score = 0;
          const sName = s.nama.toLowerCase();
          const sWords = sName.split(' ');

          // Exact query match dalam nama
          if (sName.includes(cleanQuery)) {
            score += 100;
          }

          // Pencocokan kata per kata
          queryWords.forEach(qw => {
            if (sName.includes(qw)) score += 40;
            sWords.forEach(sw => {
              if (sw === qw) score += 60; // kata persis
              else if (sw.startsWith(qw) || qw.startsWith(sw)) score += 30;
            });
          });

          if (score > bestScore) {
            bestScore = score;
            matchedStudent = s;
          }
        });
      }

      // Fallback jika nama tidak teridentifikasi kata
      if (!matchedStudent && bestScore === 0) {
        matchedStudent = masterStudents.find(s => s.id === currentTahfidzStudentId) || masterStudents[0];
      }

      if (matchedStudent) {
        // 1. Pilih santri dan isi form
        selectTahfidzStudent(matchedStudent.id);

        // 2. Set Juz & Kategori jika terdeteksi
        if (detectedJuz) {
          const juzEl = document.getElementById('tahfidzJuz');
          if (juzEl) juzEl.value = detectedJuz;
        }
        if (detectedKategori) {
          const katEl = document.getElementById('tahfidzKategori');
          if (katEl) katEl.value = detectedKategori;
        }

        // 3. Set Predikat jika terdeteksi
        if (detectedPredikat) {
          setTahfidzPredikat(detectedPredikat);
        }

        // 4. Update preview caption
        updateTahfidzCaptionPreview();

        // 5. Feedback visual ke user
        const finalJuz = detectedJuz || matchedStudent.defaultJuz || '30';
        const finalPredikat = detectedPredikat || currentTahfidzPredikat || 'Mumtaz';

        const searchInput = document.getElementById('tahfidzSearchInput');
        if (searchInput) {
          searchInput.value = `${matchedStudent.nama} (${matchedStudent.unit}) - Juz ${finalJuz} - ${finalPredikat}`;
        }

        if (typeof showToast === 'function') {
          showToast('🎙️ Perintah Berhasil Diproses!', `Santri: ${matchedStudent.nama} (${matchedStudent.unit}) • Juz: ${finalJuz} • Predikat: ${finalPredikat}`);
        }
        return true;
      }
      return false;
    }

    // Pilih Santri dari Autocomplete / Rekomendasi
    function selectTahfidzStudent(studentId) {
      const masterStudents = getTahfidzMasterStudents();
      const student = masterStudents.find(s => s.id === studentId) || masterStudents[0];
      if (!student) return;

      currentTahfidzStudentId = student.id;
      isTahfidzDataDirty = false;

      const namaEl = document.getElementById('tahfidzNama');
      const unitEl = document.getElementById('tahfidzUnit');
      const kelasEl = document.getElementById('tahfidzKelas');
      const bapakEl = document.getElementById('tahfidzBapak');
      const ibuEl = document.getElementById('tahfidzIbu');
      const katEl = document.getElementById('tahfidzKategori');
      const juzEl = document.getElementById('tahfidzJuz');
      const searchInput = document.getElementById('tahfidzSearchInput');
      const dropdown = document.getElementById('tahfidzSearchDropdown');
      const badge = document.getElementById('tahfidzActiveStudentBadge');
      const statusBadge = document.getElementById('tahfidzMasterStatusBadge');

      if (namaEl) namaEl.value = student.nama;
      if (unitEl) unitEl.value = student.unit;
      if (kelasEl) kelasEl.value = student.kelas;
      if (bapakEl) bapakEl.value = student.bapak;
      if (ibuEl) ibuEl.value = student.ibu;

      if (katEl) {
        let katVal = (student.defaultKategori || ('Juz ' + student.defaultJuz) || '1 Juz').trim();
        if (/^\d+$/.test(katVal)) katVal = `${katVal} Juz`;
        katEl.value = katVal;
      }
      if (juzEl) {
        let juzVal = (student.defaultJuz || '30').trim();
        juzEl.value = juzVal;
      }

      setTahfidzGender(student.gender);
      setTahfidzPamfletStatus(student.statusPamflet || 'pending', true);
      if (searchInput) searchInput.value = student.nama;
      if (dropdown) dropdown.classList.add('hidden');
      if (badge) badge.innerText = `${student.nama} (${student.unit})`;

      if (statusBadge) {
        statusBadge.className = 'hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full';
        statusBadge.innerHTML = '<i data-lucide="database" class="w-3 h-3 text-emerald-500"></i><span>Master DB Terhubung</span>';
      }

      // Re-render recommendations agar tombol aktif ter-highlight
      renderTahfidzRecommendations();
      updateTahfidzCaptionPreview();

      if (typeof showToast === 'function') {
        showToast(`Data ananda ${student.nama} & orang tua otomatis terisi!`);
      } else if (typeof showModernNotification === 'function') {
        showModernNotification('success', `Data ${student.nama} terpilih.`);
      }
    }

    // Auto-Format Blur Handlers
    function handleTahfidzKategoriBlur(el) {
      if (!el) return;
      const val = (el.value || '').trim();
      if (/^\d+$/.test(val)) {
        el.value = `${val} Juz`;
      }
      updateTahfidzCaptionPreview(true);
    }

    function handleTahfidzJuzBlur(el) {
      if (!el) return;
      updateTahfidzCaptionPreview(true);
    }

    // Set Gender Santri
    function setTahfidzGender(gender) {
      currentTahfidzGender = gender;
      const btnPa = document.getElementById('tahfidzGenderPutra');
      const btnPi = document.getElementById('tahfidzGenderPutri');

      if (gender === 'Putra') {
        if (btnPa) btnPa.className = 'px-2.5 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1 bg-blue-600 text-white shadow-2xs cursor-pointer';
        if (btnPi) btnPi.className = 'px-2.5 py-1 rounded-lg font-semibold text-xs transition-all flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 cursor-pointer';
      } else {
        if (btnPa) btnPa.className = 'px-2.5 py-1 rounded-lg font-semibold text-xs transition-all flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer';
        if (btnPi) btnPi.className = 'px-2.5 py-1 rounded-lg font-bold text-xs transition-all flex items-center gap-1 bg-pink-600 text-white shadow-2xs cursor-pointer';
      }

      updateTahfidzCaptionPreview();
    }

    // Set Predikat Tasmi' (Hanya Mumtaz, Jayyid Jiddan, Jayyid)
    function setTahfidzPredikat(pred) {
      currentTahfidzPredikat = pred;
      const valEl = document.getElementById('tahfidzPredikatVal');
      if (valEl) valEl.value = pred;

      const predikats = ['Mumtaz', 'Jayyid Jiddan', 'Jayyid'];
      predikats.forEach(p => {
        const btn = document.getElementById('predikat_' + p);
        if (!btn) return;
        if (p === pred) {
          if (p === 'Mumtaz') {
            btn.className = 'tahfidz-pred-btn py-1.5 px-1 rounded-none border text-[11px] font-bold transition-all flex items-center justify-center gap-1 bg-amber-500 text-white border-amber-500 shadow-2xs cursor-pointer';
          } else if (p === 'Jayyid Jiddan') {
            btn.className = 'tahfidz-pred-btn py-1.5 px-1 rounded-none border text-[11px] font-bold transition-all flex items-center justify-center gap-1 bg-blue-600 text-white border-blue-600 shadow-2xs cursor-pointer';
          } else if (p === 'Jayyid') {
            btn.className = 'tahfidz-pred-btn py-1.5 px-1 rounded-none border text-[11px] font-bold transition-all flex items-center justify-center gap-1 bg-emerald-600 text-white border-emerald-600 shadow-2xs cursor-pointer';
          }
        } else {
          btn.className = 'tahfidz-pred-btn py-1.5 px-1 rounded-none border text-[11px] font-semibold transition-all flex items-center justify-center gap-1 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 cursor-pointer';
        }
      });

      updateTahfidzCaptionPreview();
    }

    // Update Live Caption Preview
    function updateTahfidzCaptionPreview(isUserEditing = false) {
      if (isUserEditing) {
        isTahfidzDataDirty = true;
        const statusBadge = document.getElementById('tahfidzMasterStatusBadge');
        if (statusBadge) {
          statusBadge.className = 'inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60';
          statusBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span><span>Ada perubahan (Belum disimpan)</span>';
        }
      }

      const nama = document.getElementById('tahfidzNama')?.value?.trim() || '.......................';
      const unit = document.getElementById('tahfidzUnit')?.value || 'MI';
      const rawKelas = document.getElementById('tahfidzKelas')?.value?.trim() || '4';
      const bapak = document.getElementById('tahfidzBapak')?.value?.trim() || '.......................';
      const ibu = document.getElementById('tahfidzIbu')?.value?.trim() || '.......................';
      const rawKategori = document.getElementById('tahfidzKategori')?.value?.trim() || '';
      const rawJuz = document.getElementById('tahfidzJuz')?.value?.trim() || '';
      const predikat = (currentTahfidzPredikat || 'JAYYID').toUpperCase();
      const isPutri = currentTahfidzGender === 'Putri';

      // Auto format kategori: jika user hanya mengisi angka (cth: "1", "2", "30"), otomatis tambahkan " Juz"
      let kategori = rawKategori || '1 Juz';
      if (/^\d+$/.test(kategori.trim())) {
        kategori = `${kategori.trim()} Juz`;
      }

      // Bersihkan teks kelas (jika user mengetik "Kelas 4" atau "4", hasilkan "4")
      const cleanKelas = rawKelas.replace(/^kelas\s*/i, '') || '...';

      // Bersihkan teks juz (jika user mengetik "Juz 5" atau "5", hasilkan "5")
      let cleanJuz = rawJuz.replace(/^juz\s*/i, '').trim() || '...';

      // Nama panjang unit
      const unitLongNames = {
        'MI': 'Madrasah Ibtidaiyah',
        'MTs': 'Madrasah Tsanawiyah',
        'SMP': 'Sekolah Menengah Pertama',
        'MA': 'Madrasah Aliyah',
        'SMA': 'Sekolah Menengah Atas'
      };
      const unitLongName = unitLongNames[unit] || unit;

      const siswaLabel = isPutri ? 'Siswi' : 'Siswa';
      const putraLabel = isPutri ? 'Putri' : 'Putra';
      const namaDisplay = nama !== '.......................' ? nama.toUpperCase() : nama;

      // Format template resmi YTPAI Raudlatul Muta'allimin Lamongan
      const caption = `Tasmi' Al-Qur'an ${siswaLabel}
YTPAI Raudlatul Muta'allimin Lamongan

Tasmi' Hafalan Al-Qur'an (Bil Ghoib) Sekali Duduk 📖✨

Ananda: ${namaDisplay}
${putraLabel} dari Bapak ${bapak} & Ibu ${ibu}
${siswaLabel} Kelas ${cleanKelas} - ${unit} (${unitLongName})
Pondok Pesantren Raudlatul Muta'allimin Lamongan

Dengan Kategori: ${kategori}
Juz: ${cleanJuz}

Alhamdulillah mendapatkan predikat "${predikat}" 🌟

Semoga Allah menjaga dan memberkahi hafalannya serta Allah mudahkan Ananda dalam mengamalkannya dalam kehidupan sehari-hari. Barokallahufiikum.. 🤲 Syukron Jazakumullah Khairan.

Lembaga Pendidikan Formal YTPAI:
🎓 MI • MTs • SMP • MA • SMA Raudlatul Muta'allimin

Informasi SPMB Tahun Ajaran 2026-2027 👇👇
https://linktr.ee/YTPAI_Raudlatul_Mutaallimin_LA

#${unit} #MI #MTs #SMP #MA #SMA #MIRaudlatulMutaallimin #MTsRaudlatulMutaallimin #SMPRaudlatulMutaallimin #MARaudlatulMutaallimin #SMARaudlatulMutaallimin #ytpai #SantriRMOfficial #TahfidzQuran #TasmiQuran #GenerasiQurani #RaudlatulMutaallimin #PesantrenBabat #BabatLamongan #Lamongan #JawaTimur #Kemenag #KemenagJatim #KemenagLamongan #Kemendikbud #DinasPendidikan`;

      const previewArea = document.getElementById('tahfidzCaptionPreview');
      if (previewArea) {
        previewArea.value = caption;
      }
    }

    // Salin Caption ke Clipboard
    function copyTahfidzCaption() {
      const previewArea = document.getElementById('tahfidzCaptionPreview');
      if (!previewArea || !previewArea.value) return;

      const text = previewArea.value;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess, fallback);
      } else {
        fallback();
      }

      function onSuccess() {
        triggerHaptic(15);
        const btnText = document.getElementById('btnCopyTahfidzCaptionText');
        if (btnText) {
          const orig = btnText.innerText;
          btnText.innerText = 'Tersalin!';
          setTimeout(() => { btnText.innerText = orig; }, 2000);
        }
        if (typeof showToast === 'function') {
          showToast('Caption Tahfidz berhasil disalin ke clipboard!');
        } else if (typeof showModernNotification === 'function') {
          showModernNotification('success', 'Caption Tahfidz disalin.');
        }
      }

      function fallback() {
        previewArea.select();
        document.execCommand('copy');
        onSuccess();
      }
    }

    // Buka WhatsApp Web
    function shareTahfidzToWhatsApp() {
      const previewArea = document.getElementById('tahfidzCaptionPreview');
      if (!previewArea || !previewArea.value) return;
      const url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(previewArea.value);
      window.open(url, '_blank');
    }

    // Simpan ke Rekapitulasi Data (LocalStorage) & Sekaligus Simpan Profil Santri ke Master
    function saveTahfidzToRekap() {
      const nama = document.getElementById('tahfidzNama')?.value?.trim();
      if (!nama || nama === '.......................') {
        alert('Mohon isi nama santri terlebih dahulu sebelum menyimpan rekap!');
        return;
      }

      const unit = document.getElementById('tahfidzUnit')?.value || 'MA';
      const kelas = document.getElementById('tahfidzKelas')?.value?.trim() || '-';
      const bapak = document.getElementById('tahfidzBapak')?.value?.trim() || '-';
      const ibu = document.getElementById('tahfidzIbu')?.value?.trim() || '-';
      const kategori = document.getElementById('tahfidzKategori')?.value?.trim() || 'Juz 30';
      const juz = document.getElementById('tahfidzJuz')?.value?.trim() || 'Juz 30';
      const predikat = currentTahfidzPredikat || 'Mumtaz';
      const gender = currentTahfidzGender || 'Putra';

      // 1. Simpan pembaruan profil santri ke Master Database secara otomatis
      saveTahfidzMasterStudent({ silent: true });

      // 2. Simpan catatan ujian ke Rekapitulasi
      const entry = {
        id: 'TH-' + Date.now(),
        nama: nama,
        unit: unit,
        kelas: kelas,
        gender: gender,
        bapak: bapak,
        ibu: ibu,
        kategori: kategori,
        juz: juz,
        predikat: predikat,
        savedAt: new Date().toISOString()
      };

      try {
        const stored = JSON.parse(localStorage.getItem('tahfidz_rekap_db') || '[]');
        stored.unshift(entry);
        localStorage.setItem('tahfidz_rekap_db', JSON.stringify(stored));

        updateTahfidzRekapBadgeCount();

        if (typeof showToast === 'function') {
          showToast(`Data tasmi' ${nama} & database master santri berhasil diperbarui!`);
        } else if (typeof showModernNotification === 'function') {
          showModernNotification('success', `Data tasmi' ${nama} tersimpan.`);
        }

        // Jika tab rekap sedang dibuka, re-render
        if (currentTahfidzSubView === 'rekap') {
          renderTahfidzRekapTable();
        }
      } catch (e) {
        console.error('Error saving rekap:', e);
        alert('Gagal menyimpan rekap: ' + e.message);
      }
    }

    // Muat Riwayat Rekap Kembali ke Formulir Generator
    function loadRekapToTahfidzForm(rekapId) {
      try {
        const stored = JSON.parse(localStorage.getItem('tahfidz_rekap_db') || '[]');
        const item = stored.find(r => r.id === rekapId);
        if (!item) return;

        const namaEl = document.getElementById('tahfidzNama');
        const unitEl = document.getElementById('tahfidzUnit');
        const kelasEl = document.getElementById('tahfidzKelas');
        const bapakEl = document.getElementById('tahfidzBapak');
        const ibuEl = document.getElementById('tahfidzIbu');
        const katEl = document.getElementById('tahfidzKategori');
        const juzEl = document.getElementById('tahfidzJuz');

        if (namaEl) namaEl.value = item.nama;
        if (unitEl) unitEl.value = item.unit;
        if (kelasEl) kelasEl.value = item.kelas;
        if (bapakEl) bapakEl.value = item.bapak;
        if (ibuEl) ibuEl.value = item.ibu;
        if (katEl) katEl.value = item.kategori;
        if (juzEl) juzEl.value = item.juz;

        setTahfidzGender(item.gender);
        setTahfidzPredikat(item.predikat || 'Mumtaz');
        switchTahfidzSubView('generator');
        updateTahfidzCaptionPreview();

        if (typeof showToast === 'function') {
          showToast(`Data riwayat ${item.nama} dimuat ke formulir!`);
        } else if (typeof showModernNotification === 'function') {
          showModernNotification('info', `Data ${item.nama} dimuat.`);
        }
      } catch (e) {
        console.error('Gagal memuat rekap:', e);
      }
    }

    // Update Counter Badge
    function updateTahfidzRekapBadgeCount() {
      try {
        const stored = JSON.parse(localStorage.getItem('tahfidz_rekap_db') || '[]');
        const badge = document.getElementById('tahfidzRekapCountBadge');
        if (badge) badge.innerText = stored.length;
      } catch (e) {}
    }

    // Render Tabel & Analitik Rekapitulasi Data
    function renderTahfidzRekapTable() {
      let data = [];
      try {
        data = JSON.parse(localStorage.getItem('tahfidz_rekap_db') || '[]');
      } catch (e) {
        data = [];
      }

      const totalStat = document.getElementById('tahfidzStatTotal');
      const mumtazStat = document.getElementById('tahfidzStatMumtaz');
      const topUnitStat = document.getElementById('tahfidzStatTopUnit');
      const tbody = document.getElementById('tahfidzRekapTableBody');
      const emptyState = document.getElementById('tahfidzRekapEmptyState');

      // Update Analytics
      if (totalStat) totalStat.innerText = `${data.length} Santri`;

      const mumtazCount = data.filter(d => d.predikat === 'Mumtaz').length;
      if (mumtazStat) mumtazStat.innerText = `${mumtazCount} Santri`;

      if (topUnitStat) {
        if (data.length === 0) {
          topUnitStat.innerText = '-';
        } else {
          const unitCounts = {};
          data.forEach(d => {
            unitCounts[d.unit] = (unitCounts[d.unit] || 0) + 1;
          });
          let maxUnit = '-';
          let maxCount = 0;
          for (const u in unitCounts) {
            if (unitCounts[u] > maxCount) {
              maxCount = unitCounts[u];
              maxUnit = `${u} (${maxCount})`;
            }
          }
          topUnitStat.innerText = maxUnit;
        }
      }

      // Render Table Rows
      if (!tbody) return;

      if (data.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
      }

      if (emptyState) emptyState.classList.add('hidden');

      let rowsHtml = '';
      data.forEach((item, idx) => {
        const dateObj = new Date(item.savedAt || Date.now());
        const dateStr = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' +
                        dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        const isPutri = item.gender === 'Putri';
        const genderBadgeClass = isPutri 
          ? 'bg-pink-100 dark:bg-pink-950/70 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800/60' 
          : 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-sky-300 border-blue-200 dark:border-blue-800/60';

        let predikatBadge = '';
        if (item.predikat === 'Mumtaz') {
          predikatBadge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60">🌟 Mumtaz</span>';
        } else if (item.predikat === 'Jayyid Jiddan') {
          predikatBadge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-sky-300 border border-blue-300 dark:border-blue-800/60">Jayyid Jiddan</span>';
        } else if (item.predikat === 'Jayyid') {
          predikatBadge = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60">Jayyid</span>';
        } else {
          predikatBadge = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">${item.predikat || 'Jayyid'}</span>`;
        }

        rowsHtml += `
          <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
            <td class="py-2.5 px-3 text-center font-bold text-slate-400">${idx + 1}</td>
            <td class="py-2.5 px-3 text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">${dateStr}</td>
            <td class="py-2.5 px-3">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-bold text-slate-800 dark:text-white">${item.nama}</span>
                <span class="text-[9px] font-bold px-1.5 py-0.2 rounded border ${genderBadgeClass}">${item.gender}</span>
              </div>
            </td>
            <td class="py-2.5 px-3 text-center">
              <span class="font-bold text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                ${item.unit}
              </span>
              <div class="text-[10px] text-slate-400 mt-0.5">${item.kelas || ''}</div>
            </td>
            <td class="py-2.5 px-3 text-[11px]">
              <div>Bpk: <b>${item.bapak}</b></div>
              <div>Ibu: <b>${item.ibu}</b></div>
            </td>
            <td class="py-2.5 px-3">
              <span class="font-bold text-emerald-700 dark:text-emerald-400 text-xs">${item.juz}</span>
              <div class="text-[10px] text-slate-400">${item.kategori}</div>
            </td>
            <td class="py-2.5 px-3 text-center whitespace-nowrap">${predikatBadge}</td>
            <td class="py-2.5 px-3 text-center">
              <div class="flex items-center justify-center gap-1">
                <button 
                  type="button" 
                  onclick="loadRekapToTahfidzForm('${item.id}')" 
                  class="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer" 
                  title="Muat data santri ini kembali ke formulir"
                >
                  <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                </button>
                <button 
                  type="button" 
                  onclick="deleteTahfidzRekapItem('${item.id}')" 
                  class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer" 
                  title="Hapus baris ini"
                >
                  <i data-lucide="trash" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      });

      tbody.innerHTML = rowsHtml;
      safeCreateIcons();
    }

    // Hapus Baris Rekap
    function deleteTahfidzRekapItem(id) {
      if (!confirm('Hapus data rekap santri ini?')) return;
      try {
        let stored = JSON.parse(localStorage.getItem('tahfidz_rekap_db') || '[]');
        stored = stored.filter(item => item.id !== id);
        localStorage.setItem('tahfidz_rekap_db', JSON.stringify(stored));
        updateTahfidzRekapBadgeCount();
        renderTahfidzRekapTable();
        if (typeof showToast === 'function') {
          showToast('Data rekap berhasil dihapus.');
        }
      } catch (e) {
        console.error('Error deleting rekap item:', e);
      }
    }

    // Bersihkan Semua Rekap
    function clearAllTahfidzRekap() {
      if (!confirm('Apakah Anda yakin ingin menghapus SEMUA riwayat rekap data tahfidz? Tindakan ini tidak dapat dibatalkan.')) return;
      try {
        localStorage.removeItem('tahfidz_rekap_db');
        updateTahfidzRekapBadgeCount();
        renderTahfidzRekapTable();
        if (typeof showToast === 'function') {
          showToast('Semua riwayat rekap data tahfidz telah dibersihkan.');
        }
      } catch (e) {
        console.error('Error clearing rekap:', e);
      }
    }

    // Ekspor ke CSV
    function exportTahfidzToCsv() {
      let data = [];
      try {
        data = JSON.parse(localStorage.getItem('tahfidz_rekap_db') || '[]');
      } catch (e) {
        data = [];
      }

      if (data.length === 0) {
        alert('Tidak ada data rekap untuk diekspor!');
        return;
      }

      const headers = ['No', 'Waktu Simpan', 'Nama Santri', 'Gender', 'Unit', 'Kelas', 'Nama Bapak', 'Nama Ibu', 'Kategori', 'Juz Diujikan', 'Predikat'];
      const rows = [headers.join(',')];

      data.forEach((d, idx) => {
        const dateObj = new Date(d.savedAt || Date.now());
        const dateStr = dateObj.toLocaleDateString('id-ID') + ' ' + dateObj.toLocaleTimeString('id-ID');
        const escapeCsv = (str) => `"${String(str || '').replace(/"/g, '""')}"`;

        const row = [
          idx + 1,
          escapeCsv(dateStr),
          escapeCsv(d.nama),
          escapeCsv(d.gender),
          escapeCsv(d.unit),
          escapeCsv(d.kelas),
          escapeCsv(d.bapak),
          escapeCsv(d.ibu),
          escapeCsv(d.kategori),
          escapeCsv(d.juz),
          escapeCsv(d.predikat)
        ];
        rows.push(row.join(','));
      });

      // Prepend UTF-8 BOM for MS Excel compatibility
      const csvContent = '\uFEFF' + rows.join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const now = new Date();
      const filename = `Rekap_Tahfidz_Tasmi_YTPAI_${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}.csv`;

      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (typeof showToast === 'function') {
        showToast('File CSV berhasil diunduh!');
      }
    }

    // Reset Form Input
    function resetTahfidzForm() {
      const inputs = ['tahfidzNama', 'tahfidzKelas', 'tahfidzBapak', 'tahfidzIbu', 'tahfidzKategori', 'tahfidzJuz', 'tahfidzSearchInput'];
      inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      const unitEl = document.getElementById('tahfidzUnit');
      if (unitEl) unitEl.value = 'MA';

      const activeBadge = document.getElementById('tahfidzActiveStudentBadge');
      if (activeBadge) activeBadge.innerText = 'Belum Ada Santri';

      setTahfidzGender('Putra');
      setTahfidzPredikat('Mumtaz');
      clearTahfidzSearch();
      updateTahfidzCaptionPreview();

      if (typeof showToast === 'function') {
        showToast('Formulir berhasil dikosongkan.');
      }
    }

    // ==============================================================
    // 14.6 PROGRESSIVE WEB APP (PWA) INSTALLATION & WORKER ENGINE
    // ==============================================================
