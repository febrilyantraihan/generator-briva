// ==============================================================================
// TAB 14: LABORATORIUM IDE & INKUBATOR PELUANG (RUANG TUMBUH)
// Engine pencatatan ide, kalkulator anti-ragu, dan pipeline kemandirian ekonomi guru
// ==============================================================================

(function(window) {
  'use strict';

  const STORAGE_KEY = 'partner_fatih_ide_data_v1';

  // Quotes Penguat Mental & Anti-Ragu
  const ANTI_RAGU_QUOTES = [
    "\"Mereka yang banting harga menjual file mentah tanpa garansi. Anda menjual rasa aman, komunikasi yang tulus, dan pendampingan nyata dari seorang guru untuk guru.\"",
    "\"Jangan bandingkan langkah pertama Anda dengan etalase orang yang sudah 10 tahun di internet. Cukup bantu 1 sekolah atau rekan di sekitar Anda terlebih dahulu.\"",
    "\"Rezeki tidak pernah tertukar karena perang harga. Klien yang tepat mencari orang yang bisa dipercaya dan diajak bicara, bukan yang termurah.\"",
    "\"Gaji honorer Rp 400.000 adalah batas anggaran tempat mengajar, bukan batas nilai keahlian dan rezeki halal yang bisa Anda raih.\"",
    "\"Ide yang dieksekusi 50% jauh lebih menghasilkan daripada ide jenius 100% yang mati di kepala karena rasa ragu.\"",
    "\"Satu sekolah yang puas akan menceritakan kebaikan Anda ke lima sekolah lainnya. Reputasi lokal yang kokoh mengalahkan ribuan iklan media sosial.\"",
    "\"Keahlian Anda memadukan pemahaman kurikulum sekolah dan kemampuan teknologi adalah 'Unfair Advantage' yang sangat langka di pasar.\""
  ];

  // Data Default Awal (Ide Riil yang Sesuai Kemampuan Nyata Pengguna)
  const DEFAULT_SEED_IDEAS = [
    {
      id: 'ide_seed_briva_1',
      title: 'Jasa Digitalisasi Tagihan SPP & Kartu BRIVA Pesantren/Madrasah',
      category: 'jasa_digital',
      targetAudience: 'Pesantren & madrasah swasta sekitar kecamatan / kabupaten',
      problemSolved: 'Bendahara sering pusing rekap manual tagihan SPP dari Excel lama yang berantakan, serta wali santri sering lupa nomor BRIVA atau kehilangan kartu fisik.',
      unfairAdvantage: 'Saya mendampingi langsung staf TU sampai mahir, merapikan data awal dari Excel lama terima beres, dan kartu visual 4-box resmi bisa langsung dikirim via WhatsApp ke wali santri.',
      estRevenue: 1500000,
      status: 'executing',
      scoreEase: 5,
      scoreDemand: 5,
      scoreProfit: 5,
      nextAction: 'Tunjukkan 1 lembar contoh kartu matriks tagihan BRIVA ke bendahara atau yayasan sahabat terdekat.',
      checklist: [
        { id: 'c1', text: 'Siapkan sistem generator kartu visual 4-Box BRIVA (sudah siap di Partner Fatih)', done: true },
        { id: 'c2', text: 'Ambil screenshot / video demo 30 detik cara cetak kartu tagihan', done: false },
        { id: 'c3', text: 'Tawarkan paket pendampingan terima beres ke 1 sekolah sahabat', done: false },
        { id: 'c4', text: 'Lakukan pelatihan singkat 30 menit ke operator TU sampai jalan', done: false }
      ],
      createdAt: Date.now() - 86400000 * 3,
      updatedAt: Date.now() - 86400000 * 1
    },
    {
      id: 'ide_seed_cbt_2',
      title: 'Paket Pembuatan Soal Ujian CBT Word DOCX Standar untuk Guru & MGMP',
      category: 'cbt_soal',
      targetAudience: 'Rekan guru satu sekolah & forum MGMP / KKG',
      problemSolved: 'Banyak guru kerepotan saat menjelang PAS/PAT karena harus membuat naskah soal berformat tabel titik-titik samar dan kunci jawaban terpisah yang memakan waktu berjam-jam.',
      unfairAdvantage: 'Sistem generator soal CBT kita bisa menginjeksi naskah soal menjadi dokumen Word (.docx) berstandar resmi dan otomatis memisahkan matriks kunci jawaban 4 kolom dalam 1 detik.',
      estRevenue: 150000,
      status: 'launched',
      scoreEase: 5,
      scoreDemand: 4,
      scoreProfit: 4,
      nextAction: 'Kirimkan 1 file contoh soal Word hasil generator ke grup guru MGMP sebagai portofolio cuma-cuma.',
      checklist: [
        { id: 'c1', text: 'Generator Word DOCX CBT sudah teruji presisi', done: true },
        { id: 'c2', text: 'Buatkan contoh 1 naskah soal mata pelajaran umum', done: true },
        { id: 'c3', text: 'Tawarkan jasa konversi naskah soal ujian cepat ke 2-3 rekan guru', done: false }
      ],
      createdAt: Date.now() - 86400000 * 2,
      updatedAt: Date.now() - 86400000 * 1
    },
    {
      id: 'ide_seed_twibbon_3',
      title: 'Jasa Generator Twibbon Interaktif & Kartu Santri Milad/Event',
      category: 'desain_event',
      targetAudience: 'Panitia Milad, Wisuda, PHBN, atau PPDB Sekolah/Pesantren',
      problemSolved: 'Sekolah ingin syiar event ramai di medsos, tapi wali santri gaptek kesulitan pasang twibbon di Twibbonize karena banyak iklan pop-up mengganggu.',
      unfairAdvantage: 'Aplikasi web twibbon mandiri buatan sendiri: bersih tanpa iklan asing, langsung pasang foto dan download kualitas tajam di browser HP.',
      estRevenue: 350000,
      status: 'spark',
      scoreEase: 4,
      scoreDemand: 4,
      scoreProfit: 3,
      nextAction: 'Buat 1 frame bingkai bertema Milad / PHBI sekolah terdekat untuk demo.',
      checklist: [
        { id: 'c1', text: 'Siapkan template engine twibbon web interaktif', done: true },
        { id: 'c2', text: 'Rancang 1 bingkai foto acara sekolah', done: false },
        { id: 'c3', text: 'Ajukan ke panitia acara untuk dipakai resmi', done: false }
      ],
      createdAt: Date.now() - 86400000 * 1,
      updatedAt: Date.now()
    }
  ];

  let ideList = [];
  let currentFilter = 'all';
  let searchQuery = '';

  // Inisialisasi Data dari LocalStorage
  function loadIdeData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          ideList = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('Gagal memuat data ide dari storage:', e);
    }
    // Jika kosong, gunakan default seed
    ideList = JSON.parse(JSON.stringify(DEFAULT_SEED_IDEAS));
    saveIdeData();
  }

  function saveIdeData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ideList));
    } catch (e) {
      console.error('Gagal menyimpan data ide ke storage:', e);
    }
  }

  // Helper Format Rupiah
  function formatRupiah(num) {
    if (!num || isNaN(num)) return 'Rp 0';
    return 'Rp ' + Number(num).toLocaleString('id-ID');
  }

  // Label Kategori
  function getCategoryMeta(cat) {
    switch (cat) {
      case 'jasa_digital':
        return { label: 'Jasa Digitalisasi', icon: 'wrench', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' };
      case 'aplikasi_sekolah':
        return { label: 'Aplikasi Sekolah', icon: 'smartphone', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' };
      case 'cbt_soal':
        return { label: 'Bank Soal CBT', icon: 'file-text', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20' };
      case 'desain_event':
        return { label: 'Twibbon & Event', icon: 'palette', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' };
      case 'kebutuhan_wali':
        return { label: 'Kebutuhan Santri', icon: 'users', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' };
      default:
        return { label: 'Peluang Terbuka', icon: 'lightbulb', color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20' };
    }
  }

  // Label Status
  function getStatusMeta(status) {
    switch (status) {
      case 'spark':
        return { label: '💡 Percikan Ide', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700' };
      case 'validating':
        return { label: '🔍 Riset Pasar', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800' };
      case 'executing':
        return { label: '🔨 Sedang Dirakit', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800' };
      case 'launched':
        return { label: '🚀 Siap Ditawarkan', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800' };
      case 'earned':
        return { label: '🏆 Alhamdulillah Cuan', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' };
      default:
        return { label: 'Draft', color: 'bg-slate-100 text-slate-600' };
    }
  }

  // Kalkulasi Skor Kelayakan (Total Max 15)
  function calculateIdeScore(ease, demand, profit) {
    const total = (Number(ease) || 3) + (Number(demand) || 3) + (Number(profit) || 3);
    let grade = '🌱 Rencana Nanti';
    let gradeColor = 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400';
    if (total >= 13) {
      grade = '🔥 Prioritas Emas (Eksekusi Sekarang)';
      gradeColor = 'text-amber-700 bg-amber-100 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-700';
    } else if (total >= 10) {
      grade = '⚡ Quick Win (Cepat & Menghasilkan)';
      gradeColor = 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700';
    }
    return { total, grade, gradeColor };
  }

  // Render Seluruh Kartu Ide
  function renderIdeCards() {
    const grid = document.getElementById('ideCardsGrid');
    const emptyState = document.getElementById('ideEmptyState');
    if (!grid) return;

    // Filter & Search
    let filtered = ideList.filter(item => {
      if (currentFilter !== 'all' && item.status !== currentFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (item.title || '').toLowerCase().includes(q);
        const matchProblem = (item.problemSolved || '').toLowerCase().includes(q);
        const matchTarget = (item.targetAudience || '').toLowerCase().includes(q);
        const matchAdv = (item.unfairAdvantage || '').toLowerCase().includes(q);
        if (!matchTitle && !matchProblem && !matchTarget && !matchAdv) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');

      grid.innerHTML = filtered.map(item => {
        const cat = getCategoryMeta(item.category);
        const st = getStatusMeta(item.status);
        const score = calculateIdeScore(item.scoreEase, item.scoreDemand, item.scoreProfit);
        const revFormatted = formatRupiah(item.estRevenue);

        // Checklist HTML
        const checklist = item.checklist || [];
        const checkedCount = checklist.filter(c => c.done).length;
        const totalCount = checklist.length;

        const checklistItemsHtml = checklist.map((c, idx) => `
          <label class="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300 cursor-pointer select-none group">
            <input 
              type="checkbox" 
              ${c.done ? 'checked' : ''} 
              onchange="toggleIdeChecklist('${item.id}', ${idx})" 
              class="w-3.5 h-3.5 mt-0.5 rounded text-amber-500 focus:ring-0 focus:outline-none cursor-pointer"
            />
            <span class="${c.done ? 'line-through text-slate-400 dark:text-slate-500' : 'group-hover:text-amber-600 dark:group-hover:text-amber-400'} transition-colors leading-tight">
              ${escapeHtml(c.text)}
            </span>
          </label>
        `).join('');

        return `
          <div class="bg-white/95 dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative">
            
            <!-- Top Badges & Actions -->
            <div>
              <div class="flex items-center justify-between gap-2 mb-2.5">
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1 ${cat.color}">
                  <span>${cat.label}</span>
                </span>
                
                <!-- Status Dropdown Quick-Change -->
                <select 
                  onchange="updateIdeStatusQuick('${item.id}', this.value)" 
                  class="text-[10px] font-extrabold px-2 py-0.5 rounded-lg border ${st.color} cursor-pointer focus:outline-none"
                >
                  <option value="spark" ${item.status === 'spark' ? 'selected' : ''}>💡 Percikan Ide</option>
                  <option value="validating" ${item.status === 'validating' ? 'selected' : ''}>🔍 Riset Pasar</option>
                  <option value="executing" ${item.status === 'executing' ? 'selected' : ''}>🔨 Sedang Dirakit</option>
                  <option value="launched" ${item.status === 'launched' ? 'selected' : ''}>🚀 Siap Ditawarkan</option>
                  <option value="earned" ${item.status === 'earned' ? 'selected' : ''}>🏆 Alhamdulillah Cuan</option>
                </select>
              </div>

              <!-- Judul Ide -->
              <h4 class="font-extrabold text-sm sm:text-[15px] text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                ${escapeHtml(item.title)}
              </h4>

              <!-- Target Sasaran -->
              ${item.targetAudience ? `
                <div class="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <i data-lucide="target" class="w-3 h-3 text-amber-500 flex-shrink-0"></i>
                  <span class="truncate">Sasaran: <strong>${escapeHtml(item.targetAudience)}</strong></span>
                </div>
              ` : ''}

              <!-- Masalah yang Dipecahkan -->
              ${item.problemSolved ? `
                <p class="text-[11px] text-slate-600 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 leading-relaxed">
                  <span class="text-rose-600 dark:text-rose-400 font-bold block mb-0.5 text-[10px] uppercase">Masalah Klien:</span>
                  ${escapeHtml(item.problemSolved)}
                </p>
              ` : ''}

              <!-- Nilai Beda (Unfair Advantage) -->
              ${item.unfairAdvantage ? `
                <div class="mt-2 p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 text-[11px] leading-relaxed">
                  <span class="text-amber-700 dark:text-amber-400 font-extrabold block mb-0.5 text-[10px] uppercase flex items-center gap-1">
                    <i data-lucide="shield-check" class="w-3 h-3"></i>
                    <span>Nilai Beda Anda (Anti-Banting Harga):</span>
                  </span>
                  <span class="text-slate-700 dark:text-slate-300 font-medium">
                    ${escapeHtml(item.unfairAdvantage)}
                  </span>
                </div>
              ` : ''}

              <!-- Langkah Mikro Pertama Hari Ini -->
              ${item.nextAction ? `
                <div class="mt-2.5 flex items-start gap-1.5 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-[10.5px] text-emerald-800 dark:text-emerald-300">
                  <i data-lucide="arrow-right-circle" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5"></i>
                  <div>
                    <span class="font-extrabold">Langkah Kecil Pertama:</span>
                    <span class="block">${escapeHtml(item.nextAction)}</span>
                  </div>
                </div>
              ` : ''}

              <!-- Checklist Micro-Tasks -->
              ${totalCount > 0 ? `
                <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                  <div class="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    <span>Langkah Eksekusi (${checkedCount}/${totalCount})</span>
                    <span class="text-amber-600 dark:text-amber-400">${Math.round((checkedCount / totalCount) * 100)}%</span>
                  </div>
                  <div class="space-y-1.5">
                    ${checklistItemsHtml}
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Bottom Card Footer: Score, Revenue, and Action Buttons -->
            <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div class="flex items-center justify-between gap-2 mb-3">
                <!-- Skor Kelayakan -->
                <div class="text-[10px] px-2 py-0.5 rounded-md font-extrabold ${score.gradeColor}">
                  ${score.grade} (${score.total}/15)
                </div>
                <!-- Estimasi Rezeki -->
                <div class="text-xs font-black text-emerald-600 dark:text-emerald-400">
                  ${revFormatted}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center justify-between gap-1.5">
                <button 
                  type="button" 
                  onclick="openIdePitchModal('${item.id}')" 
                  class="flex-1 py-1.5 px-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  title="Susun draf chat penawaran ramah untuk WhatsApp"
                >
                  <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
                  <span>Draf Chat WA</span>
                </button>

                <button 
                  type="button" 
                  onclick="openIdeModal('${item.id}')" 
                  class="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs transition-colors cursor-pointer"
                  title="Edit ide ini"
                >
                  <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                </button>

                <button 
                  type="button" 
                  onclick="deleteIdePrompt('${item.id}')" 
                  class="p-1.5 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs transition-colors cursor-pointer"
                  title="Hapus ide ini"
                >
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>

          </div>
        `;
      }).join('');
    }

    renderIdeStats();
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  // Render Statistik Ringkasan
  function renderIdeStats() {
    const elTotal = document.getElementById('ideStatTotal');
    const elExec = document.getElementById('ideStatExecuting');
    const elLaunched = document.getElementById('ideStatLaunched');
    const elRev = document.getElementById('ideStatRevenue');
    const countAll = document.getElementById('countPillAll');

    const total = ideList.length;
    const executing = ideList.filter(i => i.status === 'executing').length;
    const launched = ideList.filter(i => i.status === 'launched').length;
    const totalRev = ideList.reduce((acc, curr) => acc + (Number(curr.estRevenue) || 0), 0);

    if (elTotal) elTotal.textContent = total;
    if (elExec) elExec.textContent = executing;
    if (elLaunched) elLaunched.textContent = launched;
    if (elRev) elRev.textContent = formatRupiah(totalRev);
    if (countAll) countAll.textContent = total;
  }

  // Ganti Kutipan Anti-Ragu
  function shuffleAntiRaguQuote() {
    const el = document.getElementById('ideAntiRaguText');
    if (!el) return;
    const current = el.textContent;
    let next = ANTI_RAGU_QUOTES[Math.floor(Math.random() * ANTI_RAGU_QUOTES.length)];
    if (next === current && ANTI_RAGU_QUOTES.length > 1) {
      next = ANTI_RAGU_QUOTES[(ANTI_RAGU_QUOTES.indexOf(current) + 1) % ANTI_RAGU_QUOTES.length];
    }
    el.textContent = next;
  }

  // Ganti Filter
  function setIdeFilter(filterKey) {
    currentFilter = filterKey;
    document.querySelectorAll('.ide-filter-pill').forEach(btn => {
      if (btn.getAttribute('data-filter') === filterKey) {
        btn.classList.add('active', 'bg-amber-500', 'text-white');
        btn.classList.remove('text-slate-500');
      } else {
        btn.classList.remove('active', 'bg-amber-500', 'text-white');
        btn.classList.add('text-slate-500');
      }
    });
    renderIdeCards();
  }

  // Handle Search Input
  function handleIdeSearch(val) {
    searchQuery = val || '';
    renderIdeCards();
  }

  // Quick Status Update
  function updateIdeStatusQuick(id, newStatus) {
    const idx = ideList.findIndex(i => i.id === id);
    if (idx !== -1) {
      ideList[idx].status = newStatus;
      ideList[idx].updatedAt = Date.now();
      saveIdeData();
      renderIdeCards();
      showIdeToast('Status ide berhasil diperbarui!');
    }
  }

  // Toggle Checklist
  function toggleIdeChecklist(ideId, itemIndex) {
    const idx = ideList.findIndex(i => i.id === ideId);
    if (idx !== -1 && ideList[idx].checklist && ideList[idx].checklist[itemIndex]) {
      ideList[idx].checklist[itemIndex].done = !ideList[idx].checklist[itemIndex].done;
      ideList[idx].updatedAt = Date.now();
      saveIdeData();
      renderIdeCards();
    }
  }

  // Dynamic Score Preview
  function updateIdeScorePreview() {
    const ease = document.getElementById('ideScoreEase')?.value || 4;
    const demand = document.getElementById('ideScoreDemand')?.value || 4;
    const profit = document.getElementById('ideScoreProfit')?.value || 4;

    const elEaseVal = document.getElementById('ideScoreEaseVal');
    const elDemandVal = document.getElementById('ideScoreDemandVal');
    const elProfitVal = document.getElementById('ideScoreProfitVal');
    const badge = document.getElementById('ideScoreBadgePreview');

    if (elEaseVal) elEaseVal.textContent = ease;
    if (elDemandVal) elDemandVal.textContent = demand;
    if (elProfitVal) elProfitVal.textContent = profit;

    const res = calculateIdeScore(ease, demand, profit);
    if (badge) {
      badge.textContent = `Skor: ${res.total}/15 (${res.grade})`;
    }
  }

  // Open Modal Form
  function openIdeModal(id) {
    const modal = document.getElementById('modalIdeForm');
    const titleEl = document.getElementById('modalIdeFormTitle');
    if (!modal) return;

    if (id) {
      const item = ideList.find(i => i.id === id);
      if (item) {
        if (titleEl) titleEl.textContent = 'Edit Catatan Ide';
        document.getElementById('ideFieldId').value = item.id;
        document.getElementById('ideFieldTitle').value = item.title || '';
        document.getElementById('ideFieldCategory').value = item.category || 'jasa_digital';
        document.getElementById('ideFieldTarget').value = item.targetAudience || '';
        document.getElementById('ideFieldProblem').value = item.problemSolved || '';
        document.getElementById('ideFieldAdvantage').value = item.unfairAdvantage || '';
        document.getElementById('ideFieldRevenue').value = item.estRevenue || '';
        document.getElementById('ideFieldStatus').value = item.status || 'spark';
        document.getElementById('ideScoreEase').value = item.scoreEase || 4;
        document.getElementById('ideScoreDemand').value = item.scoreDemand || 4;
        document.getElementById('ideScoreProfit').value = item.scoreProfit || 4;
        document.getElementById('ideFieldNextAction').value = item.nextAction || '';
      }
    } else {
      if (titleEl) titleEl.textContent = 'Catat Ide / Peluang Baru';
      document.getElementById('formIdeRecord').reset();
      document.getElementById('ideFieldId').value = '';
      document.getElementById('ideScoreEase').value = 4;
      document.getElementById('ideScoreDemand').value = 4;
      document.getElementById('ideScoreProfit').value = 4;
    }

    updateIdeScorePreview();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  function closeIdeModal() {
    const modal = document.getElementById('modalIdeForm');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  // Form Submit
  function handleIdeFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('ideFieldId').value;
    const title = document.getElementById('ideFieldTitle').value.trim();
    const category = document.getElementById('ideFieldCategory').value;
    const targetAudience = document.getElementById('ideFieldTarget').value.trim();
    const problemSolved = document.getElementById('ideFieldProblem').value.trim();
    const unfairAdvantage = document.getElementById('ideFieldAdvantage').value.trim();
    const estRevenue = Number(document.getElementById('ideFieldRevenue').value) || 0;
    const status = document.getElementById('ideFieldStatus').value;
    const scoreEase = Number(document.getElementById('ideScoreEase').value) || 4;
    const scoreDemand = Number(document.getElementById('ideScoreDemand').value) || 4;
    const scoreProfit = Number(document.getElementById('ideScoreProfit').value) || 4;
    const nextAction = document.getElementById('ideFieldNextAction').value.trim();

    if (!title) {
      alert('Judul ide wajib diisi!');
      return;
    }

    if (id) {
      // Update
      const idx = ideList.findIndex(i => i.id === id);
      if (idx !== -1) {
        ideList[idx] = {
          ...ideList[idx],
          title,
          category,
          targetAudience,
          problemSolved,
          unfairAdvantage,
          estRevenue,
          status,
          scoreEase,
          scoreDemand,
          scoreProfit,
          nextAction,
          updatedAt: Date.now()
        };
      }
    } else {
      // Create new
      const newIde = {
        id: 'ide_' + Date.now(),
        title,
        category,
        targetAudience,
        problemSolved,
        unfairAdvantage,
        estRevenue,
        status,
        scoreEase,
        scoreDemand,
        scoreProfit,
        nextAction,
        checklist: [
          { id: 'c1', text: 'Tulis ringkasan ide & solusi jelas', done: true },
          { id: 'c2', text: nextAction || 'Buat demo atau contoh konkret', done: false },
          { id: 'c3', text: 'Tawarkan ke 1 orang calon pengguna pertama', done: false }
        ],
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      ideList.unshift(newIde);
    }

    saveIdeData();
    closeIdeModal();
    renderIdeCards();
    showIdeToast('Catatan ide berhasil disimpan!');
  }

  // Delete Ide
  function deleteIdePrompt(id) {
    const item = ideList.find(i => i.id === id);
    if (!item) return;
    if (confirm(`Apakah Anda yakin ingin menghapus ide "${item.title}"?`)) {
      ideList = ideList.filter(i => i.id !== id);
      saveIdeData();
      renderIdeCards();
      showIdeToast('Ide berhasil dihapus.');
    }
  }

  // Generate & Open WA Pitch Modal
  function openIdePitchModal(id) {
    const item = ideList.find(i => i.id === id);
    if (!item) return;

    const modal = document.getElementById('modalIdePitch');
    const textarea = document.getElementById('idePitchPreviewText');
    if (!modal || !textarea) return;

    // Susun template ramah & santun gaya guru
    const text = `Assalamu'alaikum Warahmatullahi Wabarakatuh,

Semoga Bapak/Ibu dan keluarga senantiasa dalam keadaan sehat dan penuh berkah.

Mohon maaf sebelumnya jika lancang mengganggu waktunya sebentar. Terkait kebutuhan administrasi dan kegiatan di sekolah/madrasah, kami ingin bersilaturahmi sekaligus menawarkan solusi pendampingan:

📌 *Layanan:* ${item.title}
🎯 *Sasaran:* ${item.targetAudience || 'Pengurus Yayasan / Staf TU / Guru'}
💡 *Solusi yang Kami Hadirkan:*
${item.problemSolved || 'Membantu digitalisasi administrasi agar lebih rapi, cepat, dan mudah dipantau.'}

⭐ *Kenapa Menggunakan Layanan Ini?*
${item.unfairAdvantage || 'Kami dampingi langsung sampai staf bisa dan data siap pakai terima beres.'}

Insya Allah biayanya sangat ramah dan terjangkau untuk sekolah/pesantren, serta kami siap mendampingi langsung.

Jika Bapak/Ibu berkenan melihat contoh format atau videonya, dengan senang hati kami kirimkan. Terima kasih banyak atas waktu dan perhatian Bapak/Ibu.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.`;

    textarea.value = text;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  function closeIdePitchModal() {
    const modal = document.getElementById('modalIdePitch');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  function copyIdePitchToClipboard() {
    const textarea = document.getElementById('idePitchPreviewText');
    if (!textarea) return;
    textarea.select();
    try {
      navigator.clipboard.writeText(textarea.value).then(() => {
        showIdeToast('Draf pesan WA berhasil disalin ke clipboard!');
        closeIdePitchModal();
      }).catch(() => {
        document.execCommand('copy');
        showIdeToast('Draf pesan WA disalin!');
        closeIdePitchModal();
      });
    } catch (e) {
      document.execCommand('copy');
      showIdeToast('Draf pesan WA disalin!');
      closeIdePitchModal();
    }
  }

  // Export Data JSON
  function exportIdeDataPrompt() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ideList, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `Partner_Fatih_Ide_Kemandirian_${new Date().toISOString().slice(0,10)}.json`);
    dlAnchorElem.click();
    showIdeToast('File cadangan ide berhasil diunduh!');
  }

  // Toast Notification
  function showIdeToast(msg) {
    if (typeof showToast === 'function') {
      showToast(msg);
      return;
    }
    const t = document.createElement('div');
    t.className = 'fixed bottom-20 right-5 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
  }

  // Helper Escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Inisialisasi Modul
  function initIdeTab() {
    loadIdeData();
    renderIdeCards();
    shuffleAntiRaguQuote();
  }

  // Expose to window
  window.initIdeTab = initIdeTab;
  window.openIdeModal = openIdeModal;
  window.closeIdeModal = closeIdeModal;
  window.handleIdeFormSubmit = handleIdeFormSubmit;
  window.setIdeFilter = setIdeFilter;
  window.handleIdeSearch = handleIdeSearch;
  window.updateIdeStatusQuick = updateIdeStatusQuick;
  window.toggleIdeChecklist = toggleIdeChecklist;
  window.updateIdeScorePreview = updateIdeScorePreview;
  window.deleteIdePrompt = deleteIdePrompt;
  window.openIdePitchModal = openIdePitchModal;
  window.closeIdePitchModal = closeIdePitchModal;
  window.copyIdePitchToClipboard = copyIdePitchToClipboard;
  window.exportIdeDataPrompt = exportIdeDataPrompt;
  window.shuffleAntiRaguQuote = shuffleAntiRaguQuote;

})(window);
