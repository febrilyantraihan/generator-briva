// ============================================================================
// MODULE: tab_wa.js
// Tab 9: Template Pesan WhatsApp Resmi (Tagihan, Rekening, Pengumuman, PPDB)
// ============================================================================
let currentWaTemplateId = 'tagihan_lengkap';
let isWaCustomEditMode = false;
        title: 'Tagihan Santri Baru (Flagging)',
        chatTitle: 'Grup Bendahara & Admin YTPAI',
        defaultTujuan: 'Ibu Bendahara Unit MTs-SMP-MA-SMA RM Tegalrejo',
        defaultPeriode: 'Tahun Ajaran Baru',
        defaultNominal: 'Daftar Ulang, Seragam & Tagihan Awal',
        builder: (p) => {
          return `Assalamualaikum Wr. Wb.\n${p.tujuan}\n\nNgapunten \uD83D\uDE4F\nMohon maaf mengganggu waktunya.\nMenginformasikan bahwa tagihan *Santri Baru* (${p.nominal}) sudah selesai kami munculkan pada aplikasi *Junio Smart BRI*.\n\nMohon untuk dicek kembali pada akun masing-masing unit.\nApabila terdapat data santri baru yang belum masuk atau terdapat kendala nominal, mohon segera konfirmasi agar dapat segera kami sesuaikan.\n\nMatur nuwun sanget atas kerjasamanya \uD83D\uDE4F\nWassalamualaikum Wr. Wb.`;
        }
      },
      bimbel: {
        id: 'bimbel',
        title: 'Bimbel Kelas Akhir',
        chatTitle: 'Grup Bendahara & Admin YTPAI',
        defaultTujuan: 'Ibu Bendahara Unit MTs-SMP-MA-SMA RM Tegalrejo',
        defaultPeriode: 'Kelas Akhir Tahun 2026',
        defaultNominal: 'Rp 310.000',
        builder: (p) => {
          return `Assalamualaikum Wr. Wb.\n${p.tujuan}\n\nNgapunten \uD83D\uDE4F\nTagihan *Bimbel Kelas Akhir* dengan nominal akumulasi sejumlah *${p.nominal}* sudah kami munculkan pada sistem *Junio Smart BRI*.\n\nMohon bantuannya untuk menginformasikan kepada wali santri dan melakukan pengecekan berkala pada portal tagihan masing-masing unit.\n\nMatur nuwun sanget atas kerjasamanya \uD83D\uDE4F\nWassalamualaikum Wr. Wb.`;
        }
      },
      syahriyah: {
        id: 'syahriyah',
        title: 'Syahriyah Bulanan Rutin',
        chatTitle: 'Grup Bendahara & Admin YTPAI',
        defaultTujuan: 'Ibu Bendahara Unit MTs-SMP-MA-SMA RM Tegalrejo',
        defaultPeriode: 'Bulan September Tahun 2026',
        defaultNominal: 'Syahriyah & Operasional Rutin',
        builder: (p) => {
          return `Assalamualaikum Wr. Wb.\nKepada Yth.\n${p.tujuan}\n\nNgapunten \uD83D\uDE4F\nMenginformasikan bahwa Tagihan Syahriyah dan Operasional untuk *${p.periode}* sudah berhasil kami generate dan dimunculkan pada aplikasi *Junio Smart BRI*.\n\nRincian tagihan dapat dicek langsung melalui akun bendahara unit masing-masing atau diunduh pada rekapitulasi BRIVA.\nApabila ada santri mutasi, izin khusus, atau dispensasi mohon dapat segera dikoordinasikan.\n\nTerima kasih banyak atas kerjasamanya \uD83D\uDE4F\nWassalamualaikum Wr. Wb.`;
        }
      },
      rekap: {
        id: 'rekap',
        title: 'Rekap Transaksi Junio Smart',
        chatTitle: 'Grup Bendahara & Admin YTPAI',
        defaultTujuan: 'Ibu Bendahara Unit MTs-SMP-MA-SMA RM Tegalrejo',
        defaultPeriode: '1 Agustus s.d. 10 September 2026',
        defaultNominal: 'Rekap Transaksi Pembayaran Masuk',
        builder: (p) => {
          return `Assalamualaikum Wr. Wb.\nKepada Yth.\n${p.tujuan}\n\nNgapunten \uD83D\uDE4F\nBerikut kami sampaikan Rekapitulasi Laporan Transaksi Pembayaran Santri melalui BRIVA / Junio Smart masing-masing Unit untuk periode *${p.periode}*:\n\n\uD83D\uDCCA *Ringkasan Transaksi Pembayaran Masuk:*\n- Unit MTs : [Laporan Masuk / Terlampir]\n- Unit SMP : [Laporan Masuk / Terlampir]\n- Unit MA  : [Laporan Masuk / Terlampir]\n- Unit SMA : [Laporan Masuk / Terlampir]\n\nData transaksi harian dan mutasi rekening dapat dicek secara berkala pada dashboard Junio Smart atau spreadsheet rekapitulasi keuangan yayasan.\n\nMatur nuwun sanget atas kerjasamanya \uD83D\uDE4F\nWassalamualaikum Wr. Wb.`;
        }
      },
      undangan: {
        id: 'undangan',
        title: 'Undangan Rapat Yayasan',
        chatTitle: 'Grup Koordinasi Yayasan RM Tegalrejo',
        defaultTujuan: "1. Admin Junio Smart\n2. Bendahara Unit MTs, SMP, MA, SMA\nRaudlatul Muta'allimin Tegalrejo",
        defaultHari: 'Kamis, 27 Agustus 2026',
        defaultWaktu: 'Pukul 09.00 WIB s/d Selesai',
        defaultTempat: "Kantor Yayasan Raudlatul Muta'allimin Tegalrejo (Lantai 2)",
        defaultAgenda: "1. Flagging Manual & Sinkronisasi BRIVA\n2. Validasi data untuk tagihan & Flaging Bulan September 2026\n3. Evaluasi kendala pembayaran Junio Smart",
        defaultKeterangan: 'Mohon hadir tepat waktu dengan membawa Laptop dan Rekapitulasi Data Santri per Unit.',
        defaultTtd: "Ketua Yayasan YTPAI\n\n*Abdus Shomad, M.Pd.*",
        builder: (p) => {
          const agendaFormatted = (p.agenda || '')
            .split('\n')
            .filter(line => line.trim().length > 0)
            .map(line => '  ' + line.trim())
            .join('\n');

          return `Assalamualaikum Wr. Wb.\n\nKepada Yth.\n${p.tujuan}\n\nMengharap kehadiran Bapak/Ibu pada Rapat Koordinasi Teknis yang insyaAllah akan dilaksanakan pada:\n\n\uD83D\uDDD3 *Hari/Tanggal* : ${p.hari}\n\u23F0 *Waktu* : ${p.waktu}\n\uD83D\uDCCD *Tempat* : ${p.tempat}\n\uD83D\uDCCB *Agenda* :\n${agendaFormatted}\n\n\uD83D\uDCCC *Keterangan* :\n${p.keterangan}\n\nDemikian undangan ini kami sampaikan. Mengingat pentingnya koordinasi teknis penagihan santri, mohon hadir tepat waktu.\nAtas perhatian dan kehadirannya diucapkan terima kasih.\n\nWassalamualaikum Wr. Wb.\n\nMengetahui,\n${p.ttd}`;
        }
      },
      akun_santri: {
        id: 'akun_santri',
        title: 'Pemberitahuan Akun & Password (3 Pesan)',
        chatTitle: 'Notifikasi Akun Santri',
        defaultTujuan: 'santri.ahmad',
        defaultPeriode: '1600',
        defaultNominal: 'P@ssword123',
        buildMsg1: (p) => {
          const pass = (p.nominal || '').trim() || 'P@ssword123';
          const kode = (p.periode || '').trim() || '1600';
          return `*YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN*\n\nAssalamu'alaikum Warahmatullahi Wabarakatuh,\n\nBerikut rincian informasi akun resmi portal santri.\n*Kode Sekolah :* \`${kode}\`\n\n📌 *Catatan Penting:*\nHuruf pertama pada kata sandi wajib menggunakan huruf kapital (*P* besar): \`${pass}\`.\n\nUsername dan password terkirim pada 2 pesan terpisah di bawah ini agar mudah disalin langsung 👇`;
        },
        buildMsg2: (p) => {
          return (p.tujuan || '').trim() || 'santri.ahmad';
        },
        buildMsg3: (p) => {
          return (p.nominal || '').trim() || 'P@ssword123';
        },
        builder: (p) => {
          const u = (p.tujuan || '').trim() || 'santri.ahmad';
          const pass = (p.nominal || '').trim() || 'P@ssword123';
          const kode = (p.periode || '').trim() || '1600';
          return `*YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN*\n\nAssalamu'alaikum Warahmatullahi Wabarakatuh,\n\nBerikut rincian informasi data akun resmi portal santri:\n\n👤 *Username Santri:* \`${u}\`\n🔑 *Password:* \`${pass}\`\n🏫 *Kode Sekolah:* \`${kode}\`\n\n📌 *Catatan Penting:*\nHuruf pertama pada kata sandi wajib menggunakan huruf kapital (*P* besar): \`${pass}\`.\n\nJazakumullah Khairan Katsiran atas perhatian dan kerja samanya.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh.\n_Admin Junio Smart_`;
        }
      }
    };

    let currentWaTemplateId = 'santri_baru';
    let isWaDirectEdit = false;

    function selectWaTemplate(templateId) {
      if (!WA_TEMPLATES[templateId]) templateId = 'santri_baru';
      currentWaTemplateId = templateId;

      const templateIds = ['santri_baru', 'bimbel', 'syahriyah', 'rekap', 'undangan', 'akun_santri'];
      templateIds.forEach(id => {
        const btn = document.getElementById('waBtn_' + id);
        if (!btn) return;
        if (id === templateId) {
          btn.className = 'wa-template-btn w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 bg-emerald-50/90 border-emerald-500 text-emerald-900 shadow-xs ring-1 ring-emerald-500/20';
          const iconBox = btn.querySelector('div:first-child');
          if (iconBox) iconBox.className = 'w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs';
        } else {
          btn.className = 'wa-template-btn w-full text-left p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-all flex items-start gap-3';
          const iconBox = btn.querySelector('div:first-child');
          if (iconBox) iconBox.className = 'w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5';
        }
      });

      const config = WA_TEMPLATES[templateId];

      // Update fields visibility
      const fieldPeriode = document.getElementById('waField_periode');
      const fieldNominal = document.getElementById('waField_nominal');
      const fieldsUndangan = document.getElementById('waFields_undangan');

      if (templateId === 'undangan') {
        if (fieldPeriode) fieldPeriode.classList.add('hidden');
        if (fieldNominal) fieldNominal.classList.add('hidden');
        if (fieldsUndangan) fieldsUndangan.classList.remove('hidden');
      } else {
        if (fieldPeriode) fieldPeriode.classList.remove('hidden');
        if (fieldNominal) fieldNominal.classList.remove('hidden');
        if (fieldsUndangan) fieldsUndangan.classList.add('hidden');
      }

      // Dynamic field labels and placeholders for account notification vs standard bills
      const inputTujuan = document.getElementById('waInput_tujuan');
      const inputPeriode = document.getElementById('waInput_periode');
      const inputNominal = document.getElementById('waInput_nominal');
      const labelTujuan = inputTujuan ? inputTujuan.parentElement.querySelector('label') : null;
      const labelPeriode = document.querySelector('#waField_periode label');
      const labelNominal = document.querySelector('#waField_nominal label');

      if (templateId === 'akun_santri') {
        if (labelTujuan) labelTujuan.textContent = 'Username (dari Anda):';
        if (labelPeriode) labelPeriode.textContent = 'Kode Sekolah:';
        if (labelNominal) labelNominal.textContent = 'Password Default:';
        if (inputTujuan) inputTujuan.placeholder = 'Ketik username santri di sini...';
        if (inputPeriode) inputPeriode.placeholder = '1600';
        if (inputNominal) inputNominal.placeholder = 'P@ssword123';
      } else {
        if (labelTujuan) labelTujuan.textContent = 'Tujuan / Penerima Pesan:';
        if (labelPeriode) labelPeriode.textContent = 'Periode / Bulan Tagihan:';
        if (labelNominal) labelNominal.textContent = 'Nominal / Keterangan Tagihan:';
        if (inputTujuan) inputTujuan.placeholder = 'Ibu Bendahara Unit MTs-SMP-MA-SMA RM Tegalrejo';
        if (inputPeriode) inputPeriode.placeholder = 'Bulan September Tahun 2026';
        if (inputNominal) inputNominal.placeholder = 'Rp 310.000';
      }

      // Populate default values
      const inputHari = document.getElementById('waInput_hari');
      const inputWaktu = document.getElementById('waInput_waktu');
      const inputTempat = document.getElementById('waInput_tempat');
      const inputAgenda = document.getElementById('waInput_agenda');
      const inputKeterangan = document.getElementById('waInput_keterangan');
      const inputTtd = document.getElementById('waInput_ttd');

      if (inputTujuan) inputTujuan.value = config.defaultTujuan || '';
      if (inputPeriode) inputPeriode.value = config.defaultPeriode || '';
      if (inputNominal) inputNominal.value = config.defaultNominal || '';
      if (inputHari) inputHari.value = config.defaultHari || '';
      if (inputWaktu) inputWaktu.value = config.defaultWaktu || '';
      if (inputTempat) inputTempat.value = config.defaultTempat || '';
      if (inputAgenda) inputAgenda.value = config.defaultAgenda || '';
      if (inputKeterangan) inputKeterangan.value = config.defaultKeterangan || '';
      if (inputTtd) inputTtd.value = config.defaultTtd || '';

      // Update chat title
      const chatTitleEl = document.getElementById('waPreviewChatTitle');
      if (chatTitleEl) chatTitleEl.textContent = config.chatTitle || 'Grup Bendahara & Admin YTPAI';

      // Reset direct edit mode if template is switched
      if (isWaDirectEdit) {
        toggleWaDirectEdit(false);
      } else {
        renderWaLivePreview();
      }

      // Toggle quick single-copy buttons for account template
      const groupIndiv = document.getElementById('waIndividualButtonsGroup');
      const btnCopyMain = document.getElementById('waCopyBtn');
      const spanLabel = document.getElementById('waCopyBtnLabel') || (btnCopyMain ? btnCopyMain.querySelector('span') : null);

      if (templateId === 'akun_santri') {
        if (groupIndiv) groupIndiv.classList.remove('hidden');
        if (spanLabel) spanLabel.textContent = 'Salin 1 Pesan Utuh';
      } else {
        if (groupIndiv) groupIndiv.classList.add('hidden');
        if (spanLabel) spanLabel.textContent = 'Salin Pesan WA';
      }

      if (window.lucide) lucide.createIcons();
    }

    function toggleWaIndividualButtons() {
      const group = document.getElementById('waIndividualButtonsGroup');
      if (!group) return;
      group.classList.toggle('hidden');
    }

    function copyWaMessagePart(partNum) {
      const config = WA_TEMPLATES.akun_santri;
      const params = {
        tujuan: (document.getElementById('waInput_tujuan')?.value || config.defaultTujuan || '').trim(),
        periode: (document.getElementById('waInput_periode')?.value || config.defaultPeriode || '').trim(),
        nominal: (document.getElementById('waInput_nominal')?.value || config.defaultNominal || '').trim()
      };

      // Reset any active button highlights
      ['waCopyMsg1Btn', 'waCopyMsg2Btn', 'waCopyMsg3Btn'].forEach(id => {
        const b = document.getElementById(id);
        if (b) b.classList.remove('ring-4', 'ring-amber-400', 'animate-pulse');
      });

      if (partNum === 1) {
        const text = config.buildMsg1(params);
        copyToClipboard(text, 'Pesan 1 Disalin!', 'Intro & Himbauan siap ditempel ke WA. Selanjutnya klik "2. Username Saja".');
        const nextBtn = document.getElementById('waCopyMsg2Btn');
        if (nextBtn) nextBtn.classList.add('ring-4', 'ring-amber-400', 'animate-pulse');
      } else if (partNum === 2) {
        const text = config.buildMsg2(params);
        copyToClipboard(text, 'Pesan 2 Disalin!', `Username "${text}" berhasil disalin murni. Selanjutnya klik "3. Password Saja".`);
        const nextBtn = document.getElementById('waCopyMsg3Btn');
        if (nextBtn) nextBtn.classList.add('ring-4', 'ring-amber-400', 'animate-pulse');
      } else if (partNum === 3) {
        const text = config.buildMsg3(params);
        copyToClipboard(text, 'Pesan 3 Disalin!', `Password "${text}" berhasil disalin (P Kapital). Semua pesan selesai!`);
      }
    }

    function copySingleWaUsername() {
      const u = (document.getElementById('waInput_tujuan')?.value || 'santri.ahmad').trim();
      copyToClipboard(u, 'Username Disalin!', `Username santri: ${u}`);
    }

    function copySingleWaPassword() {
      const pass = (document.getElementById('waInput_nominal')?.value || 'P@ssword123').trim();
      copyToClipboard(pass, 'Password Disalin!', `Kata sandi: ${pass} (Huruf P Kapital)`);
    }

    function getWaCurrentRawMessage() {
      if (isWaDirectEdit) {
        const textarea = document.getElementById('waCustomMessageTextarea');
        return textarea ? textarea.value : '';
      }

      const config = WA_TEMPLATES[currentWaTemplateId] || WA_TEMPLATES.santri_baru;
      const params = {
        tujuan: (document.getElementById('waInput_tujuan')?.value || config.defaultTujuan || '').trim(),
        periode: (document.getElementById('waInput_periode')?.value || config.defaultPeriode || '').trim(),
        nominal: (document.getElementById('waInput_nominal')?.value || config.defaultNominal || '').trim(),
        hari: (document.getElementById('waInput_hari')?.value || config.defaultHari || '').trim(),
        waktu: (document.getElementById('waInput_waktu')?.value || config.defaultWaktu || '').trim(),
        tempat: (document.getElementById('waInput_tempat')?.value || config.defaultTempat || '').trim(),
        agenda: (document.getElementById('waInput_agenda')?.value || config.defaultAgenda || '').trim(),
        keterangan: (document.getElementById('waInput_keterangan')?.value || config.defaultKeterangan || '').trim(),
        ttd: (document.getElementById('waInput_ttd')?.value || config.defaultTtd || '').trim()
      };

      return config.builder(params);
    }

    function formatWaTextToHtml(rawText) {
      if (!rawText) return '';
      // Escape basic HTML entities
      let safe = rawText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Convert > blockquote lines
      safe = safe.replace(/(?:^|\n)&gt;\s?([^\n]+)/g, '\n<div class="border-l-4 border-emerald-500/80 bg-emerald-100/40 dark:bg-emerald-950/60 pl-3 py-1.5 my-1.5 rounded-r-lg text-slate-900 dark:text-emerald-100 font-sans text-xs">$1</div>');

      // Convert `code` to single-copyable badge
      safe = safe.replace(/`([^`\n]+)`/g, '<code class="bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-mono font-bold px-2 py-0.5 rounded text-[11.5px] border border-emerald-300 dark:border-emerald-700/60 select-all cursor-pointer hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors inline-block my-0.5 shadow-2xs" title="Klik untuk salin tunggal" onclick="copyToClipboard(\'$1\', \'Disalin!\', \'Teks $1 berhasil disalin.\')">$1</code>');

      // Convert *bold* to <strong>
      safe = safe.replace(/\*([^*\n]+)\*/g, '<strong class="font-bold text-slate-950 dark:text-white">$1</strong>');
      
      // Convert _italic_ to <em>
      safe = safe.replace(/_([^_\n]+)_/g, '<em class="italic text-slate-800 dark:text-slate-200">$1</em>');

      return safe;
    }

    function renderWaLivePreview() {
      const raw = getWaCurrentRawMessage();
      
      // Keep custom textarea in sync if not currently in direct edit mode
      if (!isWaDirectEdit) {
        const textarea = document.getElementById('waCustomMessageTextarea');
        if (textarea) textarea.value = raw;
      }

      const container = document.getElementById('waLiveBubbleContent');
      if (container) {
        if (currentWaTemplateId === 'akun_santri' && !isWaDirectEdit) {
          const config = WA_TEMPLATES.akun_santri;
          const params = {
            tujuan: (document.getElementById('waInput_tujuan')?.value || config.defaultTujuan || '').trim(),
            periode: (document.getElementById('waInput_periode')?.value || config.defaultPeriode || '').trim(),
            nominal: (document.getElementById('waInput_nominal')?.value || config.defaultNominal || '').trim()
          };
          const msg1 = config.buildMsg1(params);
          const msg2 = config.buildMsg2(params);
          const msg3 = config.buildMsg3(params);

          const now = new Date();
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          const timeStr = `${hh}.${mm}`;

          container.innerHTML = `
            <!-- BUBBLE 1: PESAN 1 (INTRO & HIMBAUAN) -->
            <div class="flex justify-end">
              <div class="max-w-[95%] sm:max-w-[88%] bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-sm border border-emerald-300/60 dark:border-[#025143] relative">
                <!-- Top action header inside bubble -->
                <div class="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-emerald-300/50 dark:border-emerald-600/30">
                  <span class="text-[10.5px] font-black uppercase tracking-wide text-emerald-800 dark:text-emerald-200 flex items-center gap-1.5">
                    <i data-lucide="message-square" class="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300"></i>
                    <span>Pesan 1 : Intro & Himbauan</span>
                  </span>
                  <button 
                    type="button" 
                    onclick="copyWaMessagePart(1)" 
                    class="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 active:scale-95 text-white font-bold text-[10.5px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                    title="Salin Pesan 1 (Intro & Himbauan)"
                  >
                    <i data-lucide="copy" class="w-3 h-3"></i>
                    <span>Salin Pesan 1</span>
                  </button>
                </div>

                <!-- Message Content -->
                <div class="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap font-sans select-text">${formatWaTextToHtml(msg1)}</div>

                <!-- Timestamp & Double Blue Ticks -->
                <div class="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-500 dark:text-emerald-200/70 font-medium select-none font-mono">
                  <span>${timeStr}</span>
                  <span class="text-sky-500 font-bold text-xs tracking-tighter" title="Terkirim & Terbaca">✓✓</span>
                </div>
              </div>
            </div>

            <!-- BUBBLE 2: PESAN 2 (USERNAME SANTRI MURNI) -->
            <div class="flex justify-end">
              <div class="max-w-[95%] sm:max-w-[88%] bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-sm border border-emerald-300/60 dark:border-[#025143] relative">
                <!-- Top action header inside bubble -->
                <div class="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-emerald-300/50 dark:border-emerald-600/30">
                  <span class="text-[10.5px] font-black uppercase tracking-wide text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                    <i data-lucide="user" class="w-3.5 h-3.5 text-indigo-700 dark:text-indigo-400"></i>
                    <span>Pesan 2 : Username Santri (Murni)</span>
                  </span>
                  <button 
                    type="button" 
                    onclick="copyWaMessagePart(2)" 
                    class="px-2.5 py-1 rounded-lg bg-indigo-700 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 active:scale-95 text-white font-bold text-[10.5px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                    title="Salin Pesan 2 (Username Saja)"
                  >
                    <i data-lucide="copy" class="w-3 h-3"></i>
                    <span>Salin Pesan 2</span>
                  </button>
                </div>

                <!-- Message Content (Pure Single Value in Monospace Style) -->
                <div class="text-xs sm:text-[14px] font-mono font-bold text-slate-950 dark:text-white bg-emerald-100/60 dark:bg-[#064e3b]/80 px-3.5 py-2.5 rounded-xl border border-emerald-300/70 dark:border-emerald-700/60 select-all cursor-pointer hover:bg-emerald-200/70 transition-colors" onclick="copyWaMessagePart(2)" title="Klik untuk salin username">${formatWaTextToHtml(msg2)}</div>

                <!-- Timestamp & Double Blue Ticks -->
                <div class="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-500 dark:text-emerald-200/70 font-medium select-none font-mono">
                  <span>${timeStr}</span>
                  <span class="text-sky-500 font-bold text-xs tracking-tighter" title="Terkirim & Terbaca">✓✓</span>
                </div>
              </div>
            </div>

            <!-- BUBBLE 3: PESAN 3 (PASSWORD MURNI) -->
            <div class="flex justify-end">
              <div class="max-w-[95%] sm:max-w-[88%] bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-sm border border-emerald-300/60 dark:border-[#025143] relative">
                <!-- Top action header inside bubble -->
                <div class="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-emerald-300/50 dark:border-emerald-600/30">
                  <span class="text-[10.5px] font-black uppercase tracking-wide text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <i data-lucide="key" class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400"></i>
                    <span>Pesan 3 : Password (P Kapital)</span>
                  </span>
                  <button 
                    type="button" 
                    onclick="copyWaMessagePart(3)" 
                    class="px-2.5 py-1 rounded-lg bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 active:scale-95 text-white font-bold text-[10.5px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                    title="Salin Pesan 3 (Password Saja)"
                  >
                    <i data-lucide="copy" class="w-3 h-3"></i>
                    <span>Salin Pesan 3</span>
                  </button>
                </div>

                <!-- Message Content (Pure Single Value in Monospace Style) -->
                <div class="text-xs sm:text-[14px] font-mono font-bold text-slate-950 dark:text-white bg-emerald-100/60 dark:bg-[#064e3b]/80 px-3.5 py-2.5 rounded-xl border border-emerald-300/70 dark:border-emerald-700/60 select-all cursor-pointer hover:bg-emerald-200/70 transition-colors" onclick="copyWaMessagePart(3)" title="Klik untuk salin password">${formatWaTextToHtml(msg3)}</div>

                <!-- Timestamp & Double Blue Ticks -->
                <div class="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-500 dark:text-emerald-200/70 font-medium select-none font-mono">
                  <span>${timeStr}</span>
                  <span class="text-sky-500 font-bold text-xs tracking-tighter" title="Terkirim & Terbaca">✓✓</span>
                </div>
              </div>
            </div>
          `;
          if (window.lucide) lucide.createIcons();
        } else {
          const now = new Date();
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          const timeStr = `${hh}.${mm}`;

          container.innerHTML = `
            <div class="flex justify-end">
              <div class="max-w-[95%] sm:max-w-[88%] bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-sm border border-emerald-300/60 dark:border-[#025143] relative">
                <div class="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap font-sans select-text">${formatWaTextToHtml(raw)}</div>
                <div class="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-500 dark:text-emerald-200/70 font-medium select-none font-mono">
                  <span>${timeStr}</span>
                  <span class="text-sky-500 font-bold text-xs tracking-tighter" title="Terkirim & Terbaca">✓✓</span>
                </div>
              </div>
            </div>
          `;
        }
      }

      // Update current time on bubble
      const timeEl = document.getElementById('waBubbleTimestamp');
      if (timeEl) {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        timeEl.textContent = `${hh}.${mm}`;
      }
    }

    function toggleWaDirectEdit(forceState) {
      if (typeof forceState === 'boolean') {
        isWaDirectEdit = forceState;
      } else {
        isWaDirectEdit = !isWaDirectEdit;
      }

      const container = document.getElementById('waDirectEditContainer');
      const toggleText = document.getElementById('waToggleDirectEditText');
      const textarea = document.getElementById('waCustomMessageTextarea');

      if (isWaDirectEdit) {
        if (container) container.classList.remove('hidden');
        if (toggleText) toggleText.textContent = 'Kembali ke Mode Form Otomatis';
        if (textarea) {
          textarea.focus();
        }
      } else {
        if (container) container.classList.add('hidden');
        if (toggleText) toggleText.textContent = 'Edit Teks Bebas Secara Manual';
        renderWaLivePreview();
      }
    }

    function handleWaCustomTextareaInput() {
      if (!isWaDirectEdit) return;
      const textarea = document.getElementById('waCustomMessageTextarea');
      const raw = textarea ? textarea.value : '';
      const container = document.getElementById('waLiveBubbleContent');
      if (container) {
        container.innerHTML = formatWaTextToHtml(raw);
      }
    }

    function copyWaMessage() {
      const raw = getWaCurrentRawMessage();
      if (!raw) return;

      const title = currentWaTemplateId === 'akun_santri' 
        ? '3 Pesan Sekaligus Disalin!' 
        : 'Pesan WhatsApp Disalin!';
      const desc = currentWaTemplateId === 'akun_santri'
        ? 'Format 3 pesan otomatis tersusun rapi saat ditempel (Ctrl+V) di WhatsApp.'
        : 'Format tebal (*bold*) siap ditempel langsung ke grup WhatsApp.';

      copyToClipboard(raw, title, desc);
    }

    function fallbackCopyWa(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        soundSuccess();
        showToast('Pesan WhatsApp Disalin!', 'Format tebal (*bold*) siap ditempel langsung ke WhatsApp.');
      } catch (err) {
        alert('Gagal menyalin otomatis. Silakan salin manual.');
      }
      document.body.removeChild(ta);
    }

    function openWhatsAppDirect() {
      const raw = getWaCurrentRawMessage();
      if (!raw) return;
      const encoded = encodeURIComponent(raw);
      const waUrl = 'https://api.whatsapp.com/send?text=' + encoded;
      window.open(waUrl, '_blank');
      showToast('Membuka WhatsApp', 'Menuju WhatsApp Web atau aplikasi seluler...');
    }

    function resetWaTemplate() {
      const config = WA_TEMPLATES[currentWaTemplateId];
      if (!config) return;
      
      toggleWaDirectEdit(false);
      selectWaTemplate(currentWaTemplateId);
      soundPop();
      showToast('Template Direset', 'Format pesan ' + (config.title || '') + ' dikembalikan ke teks standar.');
    }

    function syncWaWithCurrentBriva() {
      // Analyze current BRIVA data
      let billCount = brivaCurrentRows ? brivaCurrentRows.length : 0;
      let totalAmount = 0;
      let uniqueBills = new Set();
      let hasBimbel = false;
      let hasSantriBaru = false;

      if (brivaInputMode === 'manual') {
        manualSantriList.forEach(s => {
          (s.bills || []).forEach(b => {
            totalAmount += (Number(b.amount) || 0);
            uniqueBills.add(b.type);
            const low = (b.type || '').toLowerCase();
            if (low.includes('bimbel')) hasBimbel = true;
            if (low.includes('baru') || low.includes('daftar') || low.includes('seragam')) hasSantriBaru = true;
          });
        });
      } else {
        (brivaCurrentRows || []).forEach(r => {
          totalAmount += (Number(r.amount) || 0);
          uniqueBills.add(r.desc);
          const low = (r.desc || '').toLowerCase();
          if (low.includes('bimbel')) hasBimbel = true;
          if (low.includes('baru') || low.includes('daftar') || low.includes('seragam')) hasSantriBaru = true;
        });
      }

      // Decide best template
      if (hasBimbel) {
        selectWaTemplate('bimbel');
        const inputNominal = document.getElementById('waInput_nominal');
        if (inputNominal) {
          inputNominal.value = totalAmount > 0 ? `Rp ${formatNumberDisplay(totalAmount)}` : 'Rp 310.000';
        }
      } else if (hasSantriBaru || (brivaInputMode === 'manual' && manualSantriList.length <= 5)) {
        selectWaTemplate('santri_baru');
        const inputNominal = document.getElementById('waInput_nominal');
        if (inputNominal) {
          const listBills = Array.from(uniqueBills).slice(0, 3).join(', ');
          inputNominal.value = listBills || 'Daftar Ulang, Seragam & Syahriyah Awal';
        }
      } else {
        selectWaTemplate('syahriyah');
        const inputPeriode = document.getElementById('waInput_periode');
        const activeMonthPill = document.querySelector('.briva-month-pill.active');
        if (inputPeriode && activeMonthPill) {
          inputPeriode.value = `Bulan ${activeMonthPill.textContent.trim()} Tahun 2026`;
        }
      }

      renderWaLivePreview();
      soundSuccess();
      showToast('Data BRIVA Sinkron!', `Data tagihan aktif (${billCount} item, Rp ${formatNumberDisplay(totalAmount)}) disinkronkan ke WhatsApp.`);
    }

    function openWaFromBriva() {
      switchTab('wa');
      syncWaWithCurrentBriva();
    }

    // Live Clock Updater
    function updateLiveClock() {
      const now = new Date();
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
