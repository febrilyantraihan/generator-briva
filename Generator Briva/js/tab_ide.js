// ==============================================================================
// TAB 14: LABORATORIUM IDE & INKUBATOR PELUANG (RUANG TUMBUH)
// Engine pencatatan ide, kalkulator anti-ragu, dan pipeline kemandirian ekonomi guru
// Fitur: Dynamic Non-Repeating Affirmation Engine (Auto Cloud Sync & Anti-Minder)
// ==============================================================================

(function(window) {
  'use strict';

  const STORAGE_KEY = 'partner_fatih_ide_data_v1';
  const STORAGE_SEEN_QUOTES = 'partner_fatih_seen_affirmations_v2';
  const STORAGE_CLOUD_QUOTES = 'partner_fatih_cloud_affirmations_v2';
  const STORAGE_LAST_QUOTE = 'partner_fatih_current_quote_v2';

  // ============================================================================
  // MASTER AFFIRMATION REPOSITORY (72 KUTIPAN PENGUAT MENTAL & ANTI-MINDER GURU)
  // ============================================================================
  const MASTER_AFFIRMATIONS = [
    // --- KELOMPOK 1: MENGATASI RASA MINDER & IMPOSTOR SYNDROME ---
    {
      category: "Anti-Minder",
      text: "Minder muncul karena Anda membandingkan dapur Anda yang berantakan dengan panggung megah orang lain. Mulailah dari apa yang ada di tangan Anda hari ini."
    },
    {
      category: "Anti-Minder",
      text: "Anda tidak perlu gelar teknologi dari luar negeri untuk membantu merapikan SPP madrasah. Pemahaman Anda tentang santri dan bendahara adalah modal terbaik."
    },
    {
      category: "Anti-Minder",
      text: "Rasa minder adalah tanda Anda memiliki hati yang rendah dan takut mengecewakan orang. Ubah rasa itu menjadi komitmen melayani dengan tulus."
    },
    {
      category: "Anti-Minder",
      text: "Orang yang percaya diri bukan orang yang tidak punya kekurangan, tapi orang yang tahu kekurangannya dan tetap memilih untuk melangkah."
    },
    {
      category: "Anti-Minder",
      text: "Jangan merasa kecil di hadapan mereka yang bersuara lantang di internet. Kebaikan yang nyata di madrasah sekitar jauh lebih berkah daripada seribu teori."
    },
    {
      category: "Anti-Minder",
      text: "Keahlian Anda yang terasa biasa bagi diri sendiri sering kali merupakan solusi luar biasa bagi rekan guru yang kesulitan dengan komputer."
    },
    {
      category: "Anti-Minder",
      text: "Bukan tugas Anda untuk menjadi serba bisa. Cukup kuasai satu solusi: buat tagihan rapi, kartu tercetak indah, dan dampingi operatornya sampai tersenyum."
    },
    {
      category: "Anti-Minder",
      text: "Ketika suara di kepala berbisik 'siapa kamu berani menawarkan jasa?', jawab dengan tenang: 'Saya seorang guru yang ingin meringankan beban sesama.'"
    },
    {
      category: "Anti-Minder",
      text: "Setiap ahli yang Anda kagumi hari ini dulunya adalah pemula yang tangannya gemetar saat pertama kali menawarkan karyanya."
    },
    {
      category: "Anti-Minder",
      text: "Percayalah pada proses Anda. Benih yang tumbuh di bawah tanah tidak pernah memamerkan daunnya sampai akarnya benar-benar kokoh."
    },
    {
      category: "Anti-Minder",
      text: "Kelemahan terbesar bukanlah kekurangan ilmu, melainkan keyakinan palsu bahwa diri kita tidak pantas mendapatkan kemandirian rezeki."
    },
    {
      category: "Anti-Minder",
      text: "Anda tidak sedang bersaing dengan siapa pun. Lomba ini hanya antara Anda hari ini melawan rasa ragu Anda kemarin."
    },
    {
      category: "Anti-Minder",
      text: "Minder tidak menyelesaikan masalah dapur. Satu langkah kecil membereskan data jauh lebih menenangkan jiwa daripada mengurung diri dalam keraguan."
    },

    // --- KELOMPOK 2: MEMULAI LANGKAH PERTAMA (MENGATASI SULIT MEMULAI & OVERTHINKING) ---
    {
      category: "Langkah Pertama",
      text: "Sulit memulai adalah jebakan perfeksionisme. Karya yang selesai 50% jauh lebih menghasilkan daripada rencana jenius 100% yang terkubur di angan-angan."
    },
    {
      category: "Langkah Pertama",
      text: "Satu tindakan nyata sekecil apa pun hari ini akan membunuh seribu kecemasan yang telah menyiksa pikiran Anda selama berminggu-minggu."
    },
    {
      category: "Langkah Pertama",
      text: "Jangan menunggu waktu yang tepat, karena waktu yang tepat tidak pernah datang sendiri. Mulailah saat canggung, perbaiki di tengah perjalanan."
    },
    {
      category: "Langkah Pertama",
      text: "Bila terasa berat melangkah sejauh 1 kilometer, melangkahlah 1 meter. Cukup buka satu file, rancang 1 kartu contoh, dan kirim ke sahabat terdekat."
    },
    {
      category: "Langkah Pertama",
      text: "Ketakutan akan sirna begitu tangan mulai bergerak. Jangan biarkan otak menganalisis kegagalan yang belum tentu terjadi."
    },
    {
      category: "Langkah Pertama",
      text: "Dua puluh menit fokus mengeksekusi hari ini bernilai lebih tinggi daripada 20 jam membaca tips bisnis tanpa pernah praktik."
    },
    {
      category: "Langkah Pertama",
      text: "Langkah pertama selalu terasa paling berat karena gesekan awal. Begitu roda berputar sekali saja, momentum akan membawa Anda maju."
    },
    {
      category: "Langkah Pertama",
      text: "Tutup tab media sosial yang membuat Anda minder. Buka catatan ide, pilih satu checklist yang paling mudah, dan selesaikan sebelum azan berikutnya."
    },
    {
      category: "Langkah Pertama",
      text: "Tidak ada kegagalan pada langkah pertama, yang ada hanyalah data dan pelajaran baru untuk menyempurnakan langkah kedua."
    },
    {
      category: "Langkah Pertama",
      text: "Jangan menunda sampai 'merasa siap'. Rasa siap itu buah dari keberanian mencoba, bukan syarat untuk memulai."
    },
    {
      category: "Langkah Pertama",
      text: "Hari ini adalah 'suatu hari nanti' yang Anda janjikan minggu lalu. Ambil napas dalam-dalam, baca basmalah, dan eksekusi sekarang."
    },
    {
      category: "Langkah Pertama",
      text: "Keberanian bukanlah ketiadaan rasa cemas, melainkan keputusan bulat bahwa masa depan keluarga Anda lebih penting daripada rasa cemas itu."
    },
    {
      category: "Langkah Pertama",
      text: "Mulailah dari yang gratis dan ada di tangan Anda: laptop sekolah, kuota data, dan niat silaturahmi yang bersih. Hasil besar selalu berawal dari hal sederhana."
    },

    // --- KELOMPOK 3: ANTI-PERANG HARGA & MENILAI DIRI TINGGI ---
    {
      category: "Nilai Diri & Harga",
      text: "Mereka yang banting harga menjual file mentah tanpa garansi. Anda menjual rasa aman, komunikasi yang tulus, dan pendampingan nyata dari seorang guru."
    },
    {
      category: "Nilai Diri & Harga",
      text: "Perang harga adalah perlombaan menuju dasar jurang. Berdirilah di tempat yang tinggi dengan mengutamakan adab, kejujuran, dan ketelatenan melayani."
    },
    {
      category: "Nilai Diri & Harga",
      text: "Klien yang mencari harga termurah biasanya yang paling banyak menuntut dan paling cepat mengeluh. Klien yang baik menghargai waktu dan jerih payah Anda."
    },
    {
      category: "Nilai Diri & Harga",
      text: "Yang Anda jual bukan sekadar deretan angka atau template Excel, melainkan waktu luang dan ketenangan batin bendahara yang tidak lagi pusing."
    },
    {
      category: "Nilai Diri & Harga",
      text: "Ketika Anda menetapkan tarif yang layak, Anda sedang menghargai waktu belajar, keringat, dan komitmen pendampingan yang Anda berikan."
    },
    {
      category: "Nilai Diri & Harga",
      text: "Rezeki tidak pernah tertukar karena perang harga. Pembeli yang tepat akan datang kepada orang yang bisa diajak musyawarah dengan santun."
    },
    {
      category: "Nilai Diri & Harga",
      text: "Jangan takut ditolak karena harga. Penolakan sering kali berarti mereka memang bukan target yang membutuhkan kualitas pelayanan Anda."
    },
    {
      category: "Nilai Diri & Harga",
      text: "Layanan purna jual dan keramahan silaturahmi adalah kemewahan yang tidak bisa diberikan oleh penjual template murahan di marketplace."
    },
    {
      category: "Nilai Diri & Harga",
      text: "Harga Anda bukan dinilai dari berapa menit Anda mengetik, tapi dari berapa tahun pengalaman dan dedikasi yang membuat Anda mampu menyelesaikannya."
    },
    {
      category: "Nilai Diri & Harga",
      text: "Keberkahan rezeki tidak diukur dari banting harga demi volume, melainkan dari ridha antara penjual dan pembeli atas manfaat yang nyata."
    },
    {
      category: "Nilai Diri & Harga",
      text: "Kualitas komunikasi Anda yang santun mencerminkan kemuliaan akhlak guru. Orang rela membayar lebih mahal untuk bermitra dengan orang jujur."
    },

    // --- KELOMPOK 4: GAJI HONORER VS KEMANDIRIAN REZEKI HALAL ---
    {
      category: "Kemandirian Rezeki",
      text: "Gaji honorer Rp 400.000 adalah batas anggaran tempat mengajar, bukan batas takaran rezeki halal yang Allah sediakan untuk ikhtiar Anda."
    },
    {
      category: "Kemandirian Rezeki",
      text: "Tetaplah mengabdi dengan ikhlas di kelas, tapi jangan biarkan keluarga Anda kekurangan karena Anda malu berikhtiar mencari rezeki tambahan."
    },
    {
      category: "Kemandirian Rezeki",
      text: "Menjadi mandiri secara ekonomi tidak akan mengurangi pahala mengajar Anda; justru membuat Anda mengajar dengan kepala tegak tanpa terhimpit utang."
    },
    {
      category: "Kemandirian Rezeki",
      text: "Pintu rezeki Allah ada ribuan. Jangan batasi harapan Anda hanya pada satu pintu slip gaji yang datang sebulan sekali."
    },
    {
      category: "Kemandirian Rezeki",
      text: "Ikhtiar mandiri Anda adalah teladan nyata bagi santri dan murid: bahwa seorang guru berilmu mampu berdaya dan mandiri dengan karyanya sendiri."
    },
    {
      category: "Kemandirian Rezeki",
      text: "Keluarga Anda berhak mendapatkan nafkah terbaik dari keringat halal Anda. Berjuanglah dengan penuh kehormatan."
    },
    {
      category: "Kemandirian Rezeki",
      text: "Uang dari jasa digital yang Anda peroleh adalah pengganti keringat lelah Anda di depan laptop. Terimalah dengan rasa syukur dan bangga."
    },
    {
      category: "Kemandirian Rezeki",
      text: "Rezeki itu mencari alamat kita lebih gigih daripada kita mencarinya. Tugas kita hanyalah membuka pintu rumah ikhtiar dengan hati yang lapang."
    },
    {
      category: "Kemandirian Rezeki",
      text: "Setiap lembar rupiah halal yang Anda hasilkan dari keahlian sendiri membawa rasa manis kemandirian yang tidak bisa dibeli dengan apa pun."
    },

    // --- KELOMPOK 5: KEUNGGULAN SEORANG GURU (UNFAIR ADVANTAGE) ---
    {
      category: "Keunggulan Guru",
      text: "Keahlian Anda memadukan pemahaman budaya sekolah dan keterampilan teknologi adalah 'Unfair Advantage' yang sangat langka di pasar."
    },
    {
      category: "Keunggulan Guru",
      text: "Programmer luar tidak mengerti susahnya mencocokkan iuran syahriyah dengan santri yatim. Anda mengerti detail itu luar dalam. Itulah nilai mahal Anda."
    },
    {
      category: "Keunggulan Guru",
      text: "Kemampuan Anda mendengarkan dan menjelaskan dengan bahasa guru yang sabar adalah magnet kepercayaan yang paling kuat bagi kepala madrasah."
    },
    {
      category: "Keunggulan Guru",
      text: "Satu sekolah yang puas dengan pendampingan Anda akan menceritakan kebaikan Anda ke sekolah lain. Rekomendasi getok tular mengalahkan iklan ratusan ribu."
    },
    {
      category: "Keunggulan Guru",
      text: "Anda bukan orang asing yang datang menjual barang lalu hilang. Anda adalah rekan seperjuangan yang hadir membersamai sampai tuntas."
    },
    {
      category: "Keunggulan Guru",
      text: "Dunia pendidikan membutuhkan solusi dari orang dalam yang berjiwa pendidik, bukan dari korporasi kaku yang hanya memikirkan laba."
    },
    {
      category: "Keunggulan Guru",
      text: "Wali santri menaruh hormat pada guru mereka. Ketika Anda menawarkan kemudahan kartu digital, mereka menerimanya dengan penuh rasa takzim."
    },

    // --- KELOMPOK 6: KETENANGAN SPIRITUAL & TAWAKKAL ---
    {
      category: "Ketenangan Batin",
      text: "Tenangkan hatimu. Setiap burung yang terbang di pagi hari selalu pulang dalam keadaan kenyang, padahal ia tidak punya laptop dan kalkulator."
    },
    {
      category: "Ketenangan Batin",
      text: "Luruskan niat: berniatlah menolong meringankan pekerjaan orang lain. Ketika niat Anda menolong, Allah sendiri yang akan mengurus rezeki Anda."
    },
    {
      category: "Ketenangan Batin",
      text: "Jangan mencemaskan hasil yang ada di tangan Tuhan. Cukup fokus pada kualitas ikhtiar yang ada di tangan Anda saat ini."
    },
    {
      category: "Ketenangan Batin",
      text: "Jika pintu ini tertutup, jangan berlama-lama meratap di depannya. Pintu yang lebih luas sedang dibuka di lorong sebelah."
    },
    {
      category: "Ketenangan Batin",
      text: "Doa orang tua, ridha guru, dan ketulusan niat Anda adalah pelindung tak kasat mata di setiap langkah ikhtiar kemandirian Anda."
    },
    {
      category: "Ketenangan Batin",
      text: "Setiap lelah yang Anda rasakan saat merapikan data malam hari adalah tasbih yang bernilai ibadah jika diniatkan untuk nafkah keluarga."
    },
    {
      category: "Ketenangan Batin",
      text: "Tersenyumlah. Allah tidak pernah menyia-nyiakan hamba-Nya yang bersungguh-sungguh ingin memperbaiki taraf hidup keluarganya secara halal."
    },
    {
      category: "Ketenangan Batin",
      text: "Keberhasilan sejati bukanlah menjadi kaya dalam semalam, melainkan tidur nyenyak setiap malam dengan hati tenang dan rezeki berkah."
    }
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
    triggerCloudSyncIde();
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
  function getStatusMeta(st) {
    switch (st) {
      case 'spark':
        return { label: 'Percikan Ide', icon: 'lightbulb', badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30' };
      case 'validating':
        return { label: 'Riset Pasar', icon: 'search', badge: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30' };
      case 'executing':
        return { label: 'Sedang Dirakit', icon: 'hammer', badge: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30' };
      case 'launched':
        return { label: 'Siap Tawar', icon: 'send', badge: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30' };
      case 'earned':
        return { label: 'Alhamdulillah Cuan', icon: 'check-circle-2', badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' };
      default:
        return { label: 'Draf', icon: 'clock', badge: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30' };
    }
  }

  // Kalkulasi Skor Anti-Ragu
  function calculateIdeScore(ease, demand, profit) {
    const e = Number(ease) || 3;
    const d = Number(demand) || 3;
    const p = Number(profit) || 3;
    const total = e + d + p;

    let grade = 'Layak Dicoba';
    let color = 'text-amber-500 bg-amber-500/10 border-amber-500/20';

    if (total >= 13) {
      grade = '🔥 Prioritas Sangat Tinggi';
      color = 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    } else if (total >= 10) {
      grade = '⭐  Prioritas Menengah (Bagus)';
      color = 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20';
    } else {
      grade = '🌱 Butuh Pematangan';
      color = 'text-slate-600 dark:text-slate-400 bg-slate-500/10 border-slate-500/20';
    }

    return { total, grade, color };
  }

  // Render Seluruh Kartu Ide
  function renderIdeCards() {
    const container = document.getElementById('ideCardsContainer');
    const emptyState = document.getElementById('ideEmptyState');
    if (!container) return;

    let filtered = ideList;

    // Filter Status
    if (currentFilter !== 'all') {
      filtered = filtered.filter(item => item.status === currentFilter);
    }

    // Filter Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.problemSolved && item.problemSolved.toLowerCase().includes(q)) ||
        (item.targetAudience && item.targetAudience.toLowerCase().includes(q)) ||
        (item.unfairAdvantage && item.unfairAdvantage.toLowerCase().includes(q))
      );
    }

    // Update Counts & Summary Statistics
    updateIdeMetrics();

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    container.innerHTML = filtered.map(item => {
      const catMeta = getCategoryMeta(item.category);
      const stMeta = getStatusMeta(item.status);
      const score = calculateIdeScore(item.scoreEase, item.scoreDemand, item.scoreProfit);

      const checklistHtml = (item.checklist || []).map(chk => `
        <label class="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300 cursor-pointer select-none group">
          <input 
            type="checkbox" 
            ${chk.done ? 'checked' : ''} 
            onchange="toggleIdeChecklist('${item.id}', '${chk.id}')"
            class="mt-0.5 rounded text-amber-600 focus:ring-amber-500 dark:bg-slate-800 dark:border-slate-700 cursor-pointer"
          />
          <span class="${chk.done ? 'line-through text-slate-400 dark:text-slate-500' : 'group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors'} leading-tight">
            ${escapeHtml(chk.text)}
          </span>
        </label>
      `).join('');

      return `
        <div class="bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
          
          <!-- Top Card: Header & Badges -->
          <div>
            <div class="flex items-center justify-between gap-2 mb-2.5">
              <!-- Category Badge -->
              <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${catMeta.color} flex items-center gap-1">
                <i data-lucide="${catMeta.icon}" class="w-3 h-3"></i>
                <span>${catMeta.label}</span>
              </span>

              <!-- Status Dropdown Quick Change -->
              <div class="relative">
                <select 
                  onchange="updateIdeStatusQuick('${item.id}', this.value)"
                  class="text-[10px] font-bold px-2 py-0.5 rounded-lg border appearance-none pr-5 cursor-pointer bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-amber-500 transition-colors"
                >
                  <option value="spark" ${item.status === 'spark' ? 'selected' : ''}>💡 Percikan Ide</option>
                  <option value="validating" ${item.status === 'validating' ? 'selected' : ''}>🔍 Riset Pasar</option>
                  <option value="executing" ${item.status === 'executing' ? 'selected' : ''}>🔨 Sedang Dirakit</option>
                  <option value="launched" ${item.status === 'launched' ? 'selected' : ''}>🚀 Siap Tawar</option>
                  <option value="earned" ${item.status === 'earned' ? 'selected' : ''}>🏆 Alhamdulillah Cuan</option>
                </select>
                <i data-lucide="chevron-down" class="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none"></i>
              </div>
            </div>

            <!-- Title -->
            <h4 class="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              ${escapeHtml(item.title)}
            </h4>

            <!-- Sasaran & Masalah -->
            <div class="mt-2.5 space-y-1.5 text-xs">
              <div class="flex items-start gap-1.5 text-slate-600 dark:text-slate-300">
                <i data-lucide="target" class="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5"></i>
                <span class="text-[11px]"><b class="font-bold">Sasaran:</b> ${escapeHtml(item.targetAudience || 'Sekolah / Rekan Guru')}</span>
              </div>
              <div class="flex items-start gap-1.5 text-slate-600 dark:text-slate-300">
                <i data-lucide="help-circle" class="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5"></i>
                <span class="text-[11px] leading-relaxed"><b class="font-bold">Masalah Diatasi:</b> ${escapeHtml(item.problemSolved || '-')}</span>
              </div>
            </div>

            <!-- Unfair Advantage Box (Anti Perang Harga) -->
            ${item.unfairAdvantage ? `
              <div class="mt-3 p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 text-xs">
                <div class="flex items-center gap-1 text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-0.5">
                  <i data-lucide="shield-alert" class="w-3 h-3"></i>
                  <span>Nilai Unik Anda (Anti-Perang Harga):</span>
                </div>
                <p class="text-[11px] text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "${escapeHtml(item.unfairAdvantage)}"
                </p>
              </div>
            ` : ''}

            <!-- Checklist Langkah Mikro -->
            <div class="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <div class="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-2 flex items-center justify-between">
                <span>Checklist Eksekusi Kecil:</span>
                <span class="text-amber-600 dark:text-amber-400">${(item.checklist || []).filter(c => c.done).length}/${(item.checklist || []).length} selesai</span>
              </div>
              <div class="space-y-1.5">
                ${checklistHtml}
              </div>
            </div>
          </div>

          <!-- Bottom Card: Score, Revenue, & Action Buttons -->
          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div class="flex items-center justify-between mb-3">
              <div>
                <span class="text-[10px] text-slate-400 block font-medium">Potensi Rezeki</span>
                <span class="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  ${formatRupiah(item.estRevenue)}
                </span>
              </div>
              <div class="text-right">
                <span class="text-[10px] text-slate-400 block font-medium">Skor Anti-Ragu</span>
                <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${score.color}">
                  ${score.total}/15 (${score.grade.split(' ')[0]})
                </span>
              </div>
            </div>

            <!-- Action Buttons: Pitch WA, Edit, Delete -->
            <div class="flex items-center gap-1.5">
              <!-- WA Pitching Assistant -->
              <button 
                type="button" 
                onclick="openIdePitchModal('${item.id}')"
                class="flex-1 py-1.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                title="Buka draf pesan penawaran santun via WA"
              >
                <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
                <span>Draf WA</span>
              </button>

              <!-- Edit Button -->
              <button 
                type="button" 
                onclick="openIdeModal('${item.id}')" 
                class="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                title="Edit ide ini"
              >
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              </button>

              <!-- Delete Button -->
              <button 
                type="button" 
                onclick="deleteIdePrompt('${item.id}')" 
                class="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 text-slate-400 transition-colors cursor-pointer"
                title="Hapus ide ini"
              >
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

        </div>
      `;
    }).join('');

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  // Update Summary Metrics
  function updateIdeMetrics() {
    const total = ideList.length;
    const executing = ideList.filter(i => i.status === 'executing').length;
    const launched = ideList.filter(i => i.status === 'launched' || i.status === 'earned').length;
    const totalRev = ideList.reduce((acc, cur) => acc + (Number(cur.estRevenue) || 0), 0);

    const elTotal = document.getElementById('ideStatTotal');
    const elExec = document.getElementById('ideStatExecuting');
    const elLaunched = document.getElementById('ideStatLaunched');
    const elRev = document.getElementById('ideStatRevenue');
    const countAll = document.getElementById('ideCountAll');

    if (elTotal) elTotal.textContent = total;
    if (elExec) elExec.textContent = executing;
    if (elLaunched) elLaunched.textContent = launched;
    if (elRev) elRev.textContent = formatRupiah(totalRev);
    if (countAll) countAll.textContent = total;
  }

  // ============================================================================
  // AFFIRMATION ENGINE (NON-REPEATING CYCLE & CLOUD DYNAMIC SYNC)
  // ============================================================================

  // Ambil gabungan seluruh kutipan master + cloud
  function getAllAvailableQuotes() {
    let cloudQuotes = [];
    try {
      const raw = localStorage.getItem(STORAGE_CLOUD_QUOTES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) cloudQuotes = parsed;
      }
    } catch (e) {}

    // Satukan dengan master tanpa duplikasi teks
    const map = new Map();
    MASTER_AFFIRMATIONS.forEach(q => {
      if (q && q.text) map.set(q.text.trim(), q);
    });
    cloudQuotes.forEach(q => {
      if (q && q.text) map.set(q.text.trim(), q);
    });

    return Array.from(map.values());
  }

  // Algoritma Exhaustive Non-Repeating Deck: jaminan 100% tidak ada yang berulang
  function getNextUniqueAffirmation() {
    const all = getAllAvailableQuotes();
    if (all.length === 0) return { category: "Anti-Ragu", text: "Bismillah, mulailah dengan satu langkah kecil hari ini." };

    let seen = [];
    try {
      const raw = localStorage.getItem(STORAGE_SEEN_QUOTES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) seen = parsed;
      }
    } catch (e) {}

    // Saring kutipan yang belum pernah ditampilkan
    let unvisited = all.filter(q => !seen.includes(q.text.trim()));

    // Jika seluruh kutipan sudah pernah muncul, reset putaran baru (kecuali yang barusan muncul)
    if (unvisited.length === 0) {
      let lastSeenText = '';
      try {
        lastSeenText = localStorage.getItem(STORAGE_LAST_QUOTE) || (seen.length > 0 ? seen[seen.length - 1] : '');
      } catch (e) {}

      seen = lastSeenText ? [lastSeenText] : [];
      try {
        localStorage.setItem(STORAGE_SEEN_QUOTES, JSON.stringify(seen));
      } catch (e) {}
      unvisited = all.filter(q => !seen.includes(q.text.trim()));
    }

    // Ambil acak dari sisa unvisited
    const picked = unvisited[Math.floor(Math.random() * unvisited.length)] || all[0];
    seen.push(picked.text.trim());

    try {
      localStorage.setItem(STORAGE_SEEN_QUOTES, JSON.stringify(seen));
      localStorage.setItem(STORAGE_LAST_QUOTE, picked.text.trim());
    } catch (e) {}

    return picked;
  }

  // Ganti Kutipan Anti-Ragu dengan Transisi Halus
  function shuffleAntiRaguQuote(isUserClick = false) {
    const el = document.getElementById('ideAntiRaguText');
    const badgeEl = document.getElementById('ideQuoteBadge');
    const iconBtn = document.getElementById('iconShuffleAffirmation');
    if (!el) return;

    // Animasi putar ikon
    if (iconBtn) {
      iconBtn.classList.add('rotate-180');
      setTimeout(() => iconBtn.classList.remove('rotate-180'), 350);
    }

    const nextObj = getNextUniqueAffirmation();

    // Animasi fade & slide halus
    el.style.opacity = '0';
    el.style.transform = 'translateY(4px)';

    setTimeout(() => {
      el.textContent = `"${nextObj.text}"`;
      if (badgeEl && nextObj.category) {
        badgeEl.textContent = nextObj.category;
      }
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150);

    // Jika user klik, trigger background sync online jika terhubung
    if (isUserClick && navigator.onLine) {
      syncAffirmationsOnline(false);
    pullIdeFromCloud(false);
    }
  }

  // Helper Supabase Headers
  const DEFAULT_SB_URL = 'https://maziyyookpafeenuiirl.supabase.co';
  const DEFAULT_SB_KEY = 'sb_publishable_bC64CatZmPbb5t6G2RFLPg__fNccr9r';

  function getSupabaseHeadersSafe() {
    let cfg = { url: DEFAULT_SB_URL, anonKey: DEFAULT_SB_KEY };
    try {
      const raw = localStorage.getItem('supabase_config_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.url && parsed.anonKey) cfg = parsed;
      }
    } catch (e) {}
    return {
      url: cfg.url,
      headers: {
        'apikey': cfg.anonKey,
        'Authorization': 'Bearer ' + cfg.anonKey,
        'Content-Type': 'application/json'
      }
    };
  }

  // Update Status Badge Cloud di Banner
  function updateQuoteCloudBadge(isOnline, customText) {
    const badge = document.getElementById('ideQuoteCloudBadge');
    const textEl = document.getElementById('ideQuoteCloudText');
    if (!badge || !textEl) return;

    if (isOnline) {
      badge.className = 'inline-flex items-center gap-1 text-[9px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20';
      textEl.textContent = customText || 'Cloud Aktif';
    } else {
      badge.className = 'inline-flex items-center gap-1 text-[9px] font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20';
      textEl.textContent = 'Mode Offline (72 Master)';
    }
  }

  // Penggabung Kutipan Cloud Baru
  function mergeCloudAffirmations(newQuotes) {
    if (!Array.isArray(newQuotes) || newQuotes.length === 0) return 0;
    let existing = [];
    try {
      const raw = localStorage.getItem(STORAGE_CLOUD_QUOTES);
      if (raw) existing = JSON.parse(raw) || [];
    } catch (e) {}

    const textSet = new Set(existing.map(q => (q.text || '').trim()));
    let addedCount = 0;

    newQuotes.forEach(q => {
      const t = (q.text || '').trim();
      if (t && !textSet.has(t)) {
        existing.push({
          category: q.category || 'Inspirasi Cloud',
          text: t,
          source: 'cloud'
        });
        textSet.add(t);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      try {
        localStorage.setItem(STORAGE_CLOUD_QUOTES, JSON.stringify(existing));
      } catch (e) {}
    }
    return addedCount;
  }

  // Auto-Sync Data Afirmasi Baru Saat Konek ke Internet / Buka Aplikasi
  async function syncAffirmationsOnline(autoShuffle = false) {
    if (!navigator.onLine) {
      updateQuoteCloudBadge(false);
      return;
    }

    updateQuoteCloudBadge(true, 'Menghubungkan...');

    let cloudQuotes = [];
    const { url, headers } = getSupabaseHeadersSafe();

    // 1. Coba ambil dari Supabase
    if (url && headers.apikey) {
      try {
        const res = await fetch(`${url}/rest/v1/humas_programs?id=eq.sync_ide_affirmations&select=*`, {
          method: 'GET',
          headers: headers,
          signal: AbortSignal.timeout(3500)
        });
        if (res.ok) {
          const rows = await res.json();
          if (rows && rows.length > 0 && rows[0].uraian) {
            const parsed = JSON.parse(rows[0].uraian);
            if (Array.isArray(parsed) && parsed.length > 0) {
              cloudQuotes = parsed;
            }
          }
        }
      } catch (err) {
        // Fallback hening
      }
    }

    // 2. Jika di cloud Supabase belum ada data, inisialisasi cloud dengan koleksi master resmi
    if (cloudQuotes.length === 0 && url && headers.apikey) {
      try {
        const seedPayload = {
          id: 'sync_ide_affirmations',
          kategori: 'Ruang Ide',
          uraian: JSON.stringify(MASTER_AFFIRMATIONS),
          status: 'synced',
          created_at: new Date().toISOString()
        };
        await fetch(`${url}/rest/v1/humas_programs`, {
          method: 'POST',
          headers: { ...headers, 'Prefer': 'resolution=merge-duplicates' },
          body: JSON.stringify(seedPayload),
          signal: AbortSignal.timeout(3000)
        });
        updateQuoteCloudBadge(true, 'Tersinkron Cloud');
      } catch (err) {
        // Fallback hening
      }
    }

    if (cloudQuotes.length > 0) {
      const added = mergeCloudAffirmations(cloudQuotes);
      updateQuoteCloudBadge(true, added > 0 ? `+${added} Baru dari Cloud` : 'Cloud Terbaru');
      if (autoShuffle) {
        shuffleAntiRaguQuote(false);
      }
    } else {
      updateQuoteCloudBadge(true, 'Cloud Terhubung');
    }
  }


  // Salin Kutipan Afirmasi Saat Ini
  function copyCurrentAffirmationText() {
    const el = document.getElementById('ideAntiRaguText');
    if (!el) return;
    const text = el.textContent.replace(/^"|"$/g, '').trim();
    if (!text) return;
    const fullText = `*Afirmasi Guru Pejuang:*\n"${text}"\n\n— Partner Fatih (Ruang Ide)`;
    try {
      navigator.clipboard.writeText(fullText).then(() => {
        showIdeToast('Kutipan berhasil disalin ke clipboard!');
      }).catch(() => {
        showIdeToast('Kutipan disalin!');
      });
    } catch (e) {
      showIdeToast('Kutipan disalin!');
    }
  }

  // Quick Preset Injeksi Form
  function setIdePreset(presetKey) {
    const presets = {
      briva: {
        title: 'Jasa Digitalisasi Tagihan SPP & Kartu BRIVA Pesantren',
        cat: 'jasa_digital',
        target: 'Pesantren & madrasah tetangga',
        problem: 'Bendahara pusing rekap manual dari Excel lama dan kartu fisik sering hilang.',
        adv: 'Saya dampingi langsung staf TU sampai jalan dan data awal saya rapikan terima beres.',
        rev: 1500000,
        action: 'Bawakan 1 contoh kartu cetak ke bendahara sekolah sahabat.'
      },
      cbt: {
        title: 'Paket Pembuatan Soal CBT Word DOCX Presisi & Kunci Jawaban',
        cat: 'cbt_soal',
        target: 'Rekan guru satu sekolah & MGMP / KKG',
        problem: 'Guru kerepotan membuat naskah soal tabel titik-titik dan kunci jawaban terpisah saat ujian.',
        adv: 'Format dokumen Word resmi rapi dalam 1 detik dengan matriks kunci jawaban terpisah.',
        rev: 200000,
        action: 'Kirim 1 contoh naskah soal Word ke grup guru sebagai contoh cuma-cuma.'
      },
      twibbon: {
        title: 'Jasa Generator Twibbon Web Interaktif Bebas Iklan untuk Acara Sekolah',
        cat: 'desain_event',
        target: 'Panitia Milad, Wisuda, PHBI, atau PPDB',
        problem: 'Wali murid gaptek kesulitan pasang twibbon di web asing karena banyak iklan judi/pop-up.',
        adv: 'Aplikasi web mandiri buatan sendiri, bersih tanpa iklan, mudah diakses lewat HP.',
        rev: 350000,
        action: 'Rancang 1 bingkai bertema acara sekolah terdekat untuk demo.'
      },
      excel: {
        title: 'Jasa Otomasi & Pembersihan Data Raport / Database Santri',
        cat: 'aplikasi_sekolah',
        target: 'Madrasah Diniyah / TPQ / Sekolah Swasta',
        problem: 'Data nama, NIS, dan status masih berantakan di puluhan sheet Excel berbeda.',
        adv: 'Saya rapikan formula, gabungkan data, dan beri panduan penggunaan sederhana.',
        rev: 500000,
        action: 'Tawarkan bantuan rapikan 1 file contoh ke operator yang sedang lembur.'
      }
    };

    const p = presets[presetKey];
    if (!p) return;

    const elTitle = document.getElementById('ideFieldTitle');
    const elCat = document.getElementById('ideFieldCategory');
    const elTarget = document.getElementById('ideFieldTarget');
    const elProb = document.getElementById('ideFieldProblem');
    const elAdv = document.getElementById('ideFieldAdvantage');
    const elRev = document.getElementById('ideFieldRevenue');
    const elAct = document.getElementById('ideFieldNextAction');

    if (elTitle) elTitle.value = p.title;
    if (elCat) elCat.value = p.cat;
    if (elTarget) elTarget.value = p.target;
    if (elProb) elProb.value = p.problem;
    if (elAdv) elAdv.value = p.adv;
    if (elRev) elRev.value = p.rev;
    if (elAct) elAct.value = p.action;

    updateIdeScorePreview();
    showIdeToast(`Preset diterapkan: ${p.title.split(' ')[0]} ${p.title.split(' ')[1]}`);
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

  // Quick Update Status dari Dropdown Kartu
  function updateIdeStatusQuick(id, newStatus) {
    const item = ideList.find(i => i.id === id);
    if (!item) return;
    item.status = newStatus;
    item.updatedAt = Date.now();
    saveIdeData();
    renderIdeCards();
    showIdeToast(`Status diperbarui ke: ${getStatusMeta(newStatus).label}`);
  }

  // Toggle Checklist Langkah Mikro
  function toggleIdeChecklist(ideId, chkId) {
    const item = ideList.find(i => i.id === ideId);
    if (!item || !item.checklist) return;
    const target = item.checklist.find(c => c.id === chkId);
    if (target) {
      target.done = !target.done;
      item.updatedAt = Date.now();
      saveIdeData();
      renderIdeCards();
    }
  }

  // Preview Score Sliders di Form
  function updateIdeScorePreview() {
    const ease = Number(document.getElementById('ideScoreEase')?.value) || 4;
    const demand = Number(document.getElementById('ideScoreDemand')?.value) || 4;
    const profit = Number(document.getElementById('ideScoreProfit')?.value) || 4;

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
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

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
    modal.style.display = 'flex';
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  function closeIdeModal() {
    const modal = document.getElementById('modalIdeForm');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modal.style.display = 'none';
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
      alert('Judul ide tidak boleh kosong!');
      return;
    }

    if (id) {
      // Edit mode
      const idx = ideList.findIndex(i => i.id === id);
      if (idx !== -1) {
        ideList[idx] = Object.assign({}, ideList[idx], {
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
        });
        showIdeToast('Ide berhasil diperbarui!');
      }
    } else {
      // Create mode
      const newChecklist = [];
      if (nextAction) {
        newChecklist.push({ id: 'c_init_1', text: nextAction, done: false });
      }
      newChecklist.push(
        { id: 'c_init_2', text: 'Tunjukkan 1 hasil contoh ke rekan terdekat untuk minta masukan', done: false },
        { id: 'c_init_3', text: 'Tawarkan paket pendampingan terima beres tanpa canggung', done: false }
      );

      const newItem = {
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
        checklist: newChecklist,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      ideList.unshift(newItem);
      showIdeToast('Ide baru berhasil disimpan ke laptop!');
    }

    saveIdeData();
    closeIdeModal();
    renderIdeCards();
  }

  // Delete Idea Prompt
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
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    // Susun template ramah & santun gaya guru
    const text = `Assalamu'alaikum Warahmatullahi Wabarakatuh,

Semoga Bapak/Ibu dan keluarga senantiasa dalam keadaan sehat dan penuh berkah.

Mohon maaf sebelumnya jika lancang mengganggu waktunya sebentar. Terkait kebutuhan administrasi dan kegiatan di sekolah/madrasah, kami ingin bersilaturahmi sekaligus menawarkan solusi pendampingan:

📌 *Layanan:* ${item.title}
🎯 *Sasaran:* ${item.targetAudience || 'Pengurus Yayasan / Staf TU / Guru'}
💡 *Solusi yang Kami Hadirkan:*
${item.problemSolved || 'Membantu digitalisasi administrasi agar lebih rapi, cepat, dan mudah dipantau.'}

⭐  *Kenapa Menggunakan Layanan Ini?*
${item.unfairAdvantage || 'Kami dampingi langsung sampai staf bisa dan data siap pakai terima beres.'}

Insya Allah biayanya sangat ramah dan terjangkau untuk sekolah/pesantren, serta kami siap mendampingi langsung.

Jika Bapak/Ibu berkenan melihat contoh format atau videonya, dengan senang hati kami kirimkan. Terima kasih banyak atas waktu dan perhatian Bapak/Ibu.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.`;

    textarea.value = text;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.style.display = 'flex';
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  function closeIdePitchModal() {
    const modal = document.getElementById('modalIdePitch');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modal.style.display = 'none';
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
  
  // ============================================================================
  // MULTI-DEVICE CLOUD SYNC ENGINE (SUPABASE POSTGRESQL REAL-TIME AUTO-SYNC)
  // Menjaga sinkronisasi data ide otomatis antara Laptop & HP secara real-time
  // ============================================================================
  const CLOUD_SYNC_ID = 'sync_ide_state';

  function getIdeSupabaseHeaders() {
    let cfg = { url: DEFAULT_SB_URL, anonKey: DEFAULT_SB_KEY };
    try {
      const raw = localStorage.getItem('supabase_config_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.url && parsed.anonKey) cfg = parsed;
      }
    } catch (e) {}
    return {
      url: cfg.url,
      headers: {
        'apikey': cfg.anonKey,
        'Authorization': 'Bearer ' + cfg.anonKey,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      }
    };
  }

  let cloudSyncTimer = null;
  function triggerCloudSyncIde() {
    clearTimeout(cloudSyncTimer);
    cloudSyncTimer = setTimeout(() => {
      syncIdeToCloud(false);
    }, 700);
  }

  async function syncIdeToCloud(isManual = false) {
    const { url, headers } = getIdeSupabaseHeaders();
    if (!url || !headers.apikey) return false;

    const cloudText = document.getElementById('ideQuoteCloudText');
    if (cloudText) cloudText.textContent = 'Menyimpan...';

    const payload = [{
      id: CLOUD_SYNC_ID,
      no: 99997,
      uraian: JSON.stringify({
        ideList: ideList,
        updatedAt: new Date().toISOString()
      }),
      pj: 'Ruang Ide AutoSync',
      updated_at: new Date().toISOString()
    }];

    try {
      const res = await fetch(`${url}/rest/v1/humas_programs?on_conflict=id`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('HTTP ' + res.status);

      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
      localStorage.setItem('partner_fatih_ide_last_cloud_sync', timeStr);
      if (cloudText) cloudText.textContent = 'Cloud Aktif (' + timeStr + ')';

      if (isManual) {
        if (typeof showToast === 'function') {
          showToast('✅ Cloud Sync Berhasil', 'Seluruh ide & peluang tersimpan di Cloud! Terbuka sama di HP & Laptop.');
        } else {
          showIdeToast('✅ Ide berhasil disinkronkan ke Cloud!');
        }
      }
      return true;
    } catch (err) {
      console.warn('[Ruang Ide Cloud] Gagal sync ke cloud:', err);
      if (cloudText) cloudText.textContent = 'Mode Offline';
      if (isManual) {
        if (typeof showToast === 'function') {
          showToast('⚠️ Gagal Sync', 'Periksa koneksi internet Anda.');
        } else {
          showIdeToast('⚠️ Gagal sinkron ke Cloud, periksa koneksi.');
        }
      }
      return false;
    }
  }

  async function pullIdeFromCloud(isManual = false) {
    const { url, headers } = getIdeSupabaseHeaders();
    if (!url || !headers.apikey) return false;

    const cloudText = document.getElementById('ideQuoteCloudText');
    if (cloudText && isManual) cloudText.textContent = 'Memeriksa...';

    try {
      const res = await fetch(`${url}/rest/v1/humas_programs?id=eq.${CLOUD_SYNC_ID}&select=*`, {
        method: 'GET',
        headers: headers
      });

      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if (data && data.length > 0 && data[0].uraian) {
        const cloudData = JSON.parse(data[0].uraian);
        if (cloudData && Array.isArray(cloudData.ideList) && cloudData.ideList.length > 0) {
          const currentStr = JSON.stringify(ideList);
          const cloudStr = JSON.stringify(cloudData.ideList);

          if (currentStr !== cloudStr) {
            const isLocalOnlySeeds = ideList.every(item => item.id && item.id.startsWith('ide_seed_'));
            if (isLocalOnlySeeds || cloudData.ideList.length >= ideList.length) {
              ideList = cloudData.ideList;
            } else {
              const cloudIds = new Set(cloudData.ideList.map(i => i.id));
              const localUnique = ideList.filter(i => !cloudIds.has(i.id));
              ideList = [...cloudData.ideList, ...localUnique];
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(ideList));
            renderIdeCards();
          }

          const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
          localStorage.setItem('partner_fatih_ide_last_cloud_sync', timeStr);
          if (cloudText) cloudText.textContent = 'Cloud Aktif (' + timeStr + ')';

          if (isManual) {
            if (typeof showToast === 'function') {
              showToast('✅ Data Cloud Diambil', 'Seluruh ide dari perangkat lain berhasil diselaraskan!');
            } else {
              showIdeToast('✅ Ide terbaru dari perangkat lain diterapkan!');
            }
          }
        }
      }
      return true;
    } catch (err) {
      console.warn('[Ruang Ide Cloud] Gagal pull data:', err);
      if (cloudText) cloudText.textContent = 'Mode Offline';
      return false;
    }
  }

  async function syncIdeCloudManual() {
    const cloudText = document.getElementById('ideQuoteCloudText');
    if (cloudText) cloudText.textContent = 'Sinkronisasi...';
    await pullIdeFromCloud(false);
    await syncIdeToCloud(true);
  }

  function initIdeTab() {
    loadIdeData();
    renderIdeCards();
    shuffleAntiRaguQuote(false);
    syncAffirmationsOnline(false);
  }

  // Auto trigger sync saat device terkoneksi ke internet
  
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      pullIdeFromCloud(false);
    }
  });

  window.addEventListener('online', () => {
    syncAffirmationsOnline(true);
  });

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
  window.setIdePreset = setIdePreset;
  window.copyCurrentAffirmationText = copyCurrentAffirmationText;
  window.syncAffirmationsOnline = syncAffirmationsOnline;
  window.syncIdeToCloud = syncIdeToCloud;
  window.pullIdeFromCloud = pullIdeFromCloud;
  window.syncIdeCloudManual = syncIdeCloudManual;

  // Global Bridge untuk Co-Pilot Malih AI
  window.loadIdeData = loadIdeData;
  window.saveIdeData = saveIdeData;
  window.renderIdeCards = renderIdeCards;
  window.getIdeList = function() { return ideList; };
  window.addIdeDirect = function(item) {
    if (!item) return false;
    loadIdeData();
    const newIde = {
      id: 'ide_' + Date.now(),
      title: item.title || 'Ide Baru',
      category: item.category || 'jasa_digital',
      status: item.status || 'spark',
      desc: item.desc || 'Dicatat via Malih AI Partner',
      estRevenue: parseInt(item.estRevenue) || 150000,
      scoreEase: parseInt(item.scoreEase) || 4,
      scoreDemand: parseInt(item.scoreDemand) || 4,
      scoreProfit: parseInt(item.scoreProfit) || 4,
      nextAction: item.nextAction || 'Diskusikan dengan calon pemesan atau uji coba prototype.',
      checklist: [
        { id: 'c1', text: 'Validasi kebutuhan dengan calon pengguna', done: false },
        { id: 'c2', text: 'Siapkan draf atau portofolio contoh', done: false }
      ],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    ideList.unshift(newIde);
    saveIdeData();
    renderIdeCards();
    return newIde;
  };
  window.updateIdeStatusDirect = function(kw, newStatus) {
    loadIdeData();
    const q = (kw || '').toLowerCase();
    const found = ideList.find(i => (i.title || '').toLowerCase().includes(q));
    if (found) {
      found.status = newStatus || 'executing';
      found.updatedAt = Date.now();
      saveIdeData();
      renderIdeCards();
      return found;
    }
    return null;
  };

})(window);