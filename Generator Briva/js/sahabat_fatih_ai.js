/**
 * ==============================================================================
 * FATHIYA AI - REKAN BERPIKIR BIJAK, MENTOR KEDEWASAAN & ASISTEN EKSEKUTIF
 * ==============================================================================
 * Karakter & Nilai:
 * 1. Pendamping Perempuan yang Anggun, Tenang, Matang & Berwawasan Luas.
 * 2. Membimbing Pengguna Tumbuh Dewasa dalam Berpikir dan Bertindak (Mindful, 
 *    Radical Ownership, Berpikir Jangka Panjang, Anti-Impulsif & Bermartabat).
 * 3. Paham 100% Seluruh 16 Modul Teknis Partner Fatih & SOP Yayasan YTPAI.
 * 4. Dual-Engine: Mesin Offline Reflektif Instan + Google Gemini AI (Opsional).
 * 5. Input Suara Bahasa Indonesia & Voice Synthesis Vokal Perempuan Tenang (TTS).
 * ==============================================================================
 */

(function(window, document) {
  'use strict';

  // --- 0. AVATAR RESMI FATHIYA (FOTO REALISTIS WANITA MUSLIMAH BERHIJAB ANGGUN & TEDUH) ---
  const FATHIYA_REALISTIC_AVATAR_SRC = 'data:image/jpeg;base64,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';

  function renderFathiyaAvatarImg(sizePx = 28, extraClasses = '') {
    return `<img src="${FATHIYA_REALISTIC_AVATAR_SRC}" alt="Fathiya AI" style="width:${sizePx}px;height:${sizePx}px;min-width:${sizePx}px;min-height:${sizePx}px;max-width:${sizePx}px;max-height:${sizePx}px;" class="rounded-full object-cover object-center border border-emerald-400/90 ring-1 ring-emerald-400/50 shadow-xs flex-shrink-0 inline-block ${extraClasses}" loading="eager" />`;
  }

  // --- 1. MASTER BASIS PENGETAHUAN SELURUH APLIKASI (16 MODUL) ---
  const FATIH_KNOWLEDGE_BASE = {
    tabs: {
      rekap_junio: {
        id: 'rekap_junio',
        name: 'Rekap Transaksi Junio',
        category: 'Layanan BRIVA & Junio',
        desc: 'Rekapitulasi otomatis mutasi transaksi Junio Smart BRI ke dalam workbook Excel 6-Sheet siap audit dan cetak dokumen legal PDF.',
        keywords: ['junio', 'rekap junio', 'junio smart', 'transaksi junio', 'excel 6 sheet', 'cetak pdf', 'mutasi bank'],
        summary: 'Tab ini digunakan untuk mengunggah mutasi Junio Smart, mengklasifikasikan transaksi per pos yayasan, dan mengekspor 6 sheet Excel lengkap dengan ringkasan legal.',
        guide: [
          '1. Buka Tab Rekap Junio.',
          '2. Upload file mutasi/transaksi Junio (format .xlsx atau .csv).',
          '3. Sistem otomatis memetakan santri, pos pembayaran, dan tanggal.',
          '4. Klik "Ekspor Excel 6-Sheet" atau "Cetak Ringkasan PDF Legal".'
        ]
      },
      briva: {
        id: 'briva',
        name: 'Generator Tagihan BRIVA',
        category: 'Layanan BRIVA & Junio',
        desc: 'Pembuat file tagihan massal Virtual Account Bank BRI resmi format 5 kolom (No Registrasi, ID Tagihan, Jumlah, Tgl Efektif, Tgl Jatuh Tempo).',
        keywords: ['briva', 'tagihan briva', 'virtual account', '5 kolom', 'kolom bri', 'syahriyah', 'pecah rinci', 'kategori', '1 baris'],
        summary: 'Tab utama untuk meng-generate format upload massal BRIVA Bank BRI dengan 3 mode baris: Pecah Rinci, Pecah Kategori, atau Akumulasi 1 Baris.',
        guide: [
          '1. Masukkan ID Tagihan (default 62 untuk Syahriyah).',
          '2. Tentukan Tanggal Efektif dan Tanggal Jatuh Tempo.',
          '3. Pilih Mode Baris: "Rinci" (per komponen), "Kategori", atau "1 Baris" (total akumulasi).',
          '4. Pilih komponen tagihan santri, lalu klik tombol "Generate BRIVA" atau "Salin ke Excel".'
        ]
      },
      panggil: {
        id: 'panggil',
        name: 'Panggil Tagihan & Kwitansi',
        category: 'Layanan BRIVA & Junio',
        desc: 'Pencarian cepat rincian tagihan per santri, pembuatan kwitansi resmi berstempel yayasan, dan generator pesan WhatsApp wali santri.',
        keywords: ['panggil', 'kwitansi', 'panggil tagihan', 'reminder wa', 'rincian santri', 'nota', 'stempel'],
        summary: 'Cari nama atau nomor santri untuk mencetak kwitansi pembayaran resmi dan mengirimkan rincian tunggakan via WhatsApp ke orang tua.',
        guide: [
          '1. Ketik nama santri atau nomor registrasi di kolom pencarian.',
          '2. Pilih santri dari daftar hasil pencarian.',
          '3. Rincian tagihan 4-kotak resmi akan muncul.',
          '4. Klik "Cetak Kwitansi PDF" atau "Salin Pesan WA Wali Santri".'
        ]
      },
      katalog: {
        id: 'katalog',
        name: 'Katalog Biaya & Kode BRI',
        category: 'Layanan BRIVA & Junio',
        desc: 'Daftar master 31 kode sub-akun resmi Bank BRI (Kode 48 s.d. 80), rincian nominal biaya pendidikan, dan pos anggaran yayasan.',
        keywords: ['katalog', 'kode bri', '31 kode', 'biaya pendidikan', 'tarif', 'sub akun', 'pos anggaran'],
        summary: 'Referensi lengkap 31 kode transaksi BRIVA resmi YTPAI agar tidak salah memilih ID tagihan saat input data.',
        guide: [
          '1. Buka Tab Katalog Biaya.',
          '2. Gunakan kolom pencarian untuk mencari kode (misal: "48" untuk Awal Tahun, "62" untuk Syahriyah).',
          '3. Klik kode untuk langsung menggunakannya di Generator BRIVA.'
        ]
      },
      konverter: {
        id: 'konverter',
        name: 'Konverter Excel Massal',
        category: 'Layanan BRIVA & Junio',
        desc: 'Alat pengubah data mentah Excel santri dari format acak menjadi format standar yang bersih dan siap diolah.',
        keywords: ['konverter', 'convert excel', 'ubah format', 'import santri', 'tabel acak'],
        summary: 'Mengubah format tabel lama/eksternal menjadi tabel bersih yang sesuai dengan standar Partner Fatih.',
        guide: [
          '1. Salin data dari file Excel lama Anda.',
          '2. Tempelkan ke dalam area teks input konverter.',
          '3. Klik "Analisa & Konversi". Sistem akan membersihkan kolom dan menyelaraskan NIS/Nama.'
        ]
      },
      jurnal: {
        id: 'jurnal',
        name: 'Jurnal Mengajar Guru',
        category: 'Akademik & Guru',
        desc: 'Pencatatan agenda KBM harian guru, jadwal mengajar mingguan, absensi kelas, dan rekap penilaian tugas/ulangan.',
        keywords: ['jurnal', 'jurnal mengajar', 'kbm', 'agenda guru', 'jadwal mengajar', 'absensi', 'nilai santri'],
        summary: 'Buku jurnal mengajar digital guru dengan fitur asisten suara harian, reminder jam pelajaran, dan rekap capaian kurikulum.',
        guide: [
          '1. Pilih mata pelajaran dan kelas yang diajar.',
          '2. Tulis materi pokok dan catatan KBM hari ini (atau gunakan tombol mic asisten suara).',
          '3. Catat santri yang tidak hadir atau butuh bimbingan khusus.',
          '4. Simpan agenda ke riwayat jurnal.'
        ]
      },
      cbt: {
        id: 'cbt',
        name: 'Bank Soal CBT & Kisi-kisi',
        category: 'Akademik & Guru',
        desc: 'Generator bank soal ujian pilihan ganda & esai, perakit kisi-kisi otomatis, dan ekspor instan ke file Microsoft Word (.docx).',
        keywords: ['cbt', 'soal', 'bank soal', 'kisi-kisi', 'word docx', 'ujian', 'kunci jawaban'],
        summary: 'Membuat naskah soal ujian berstandar dinas/kemenag lengkap dengan kop resmi yayasan, tabel kisi-kisi, dan kunci jawaban otomatis.',
        guide: [
          '1. Input pertanyaan, opsi pilihan (A, B, C, D, E), dan kunci jawaban.',
          '2. Susun kisi-kisi capaian pembelajaran.',
          '3. Klik "Ekspor Naskah Soal Word (.docx)" untuk mengunduh dokumen siap cetak.'
        ]
      },
      tahfidz: {
        id: 'tahfidz',
        name: 'Tahfidz Tasmi\' Santri',
        category: 'Akademik & Guru',
        desc: 'Aplikasi penilaian ujian Tasmi\' bil Ghoib sekali duduk 31 santri binaan YTPAI, kalkulator kelulusan Mumtaz/Jayyid, dan cetak sertifikat.',
        keywords: ['tahfidz', 'tasmi', 'tasmiyah', '31 santri', 'juz', 'mumtaz', 'jayyid', 'sertifikat', 'hafalan'],
        summary: 'Manajemen ujian tasmi\' hafalan Al-Qur\'an santri dengan radar capaian juz, skor tajwid/kelancaran, dan pamflet kelulusan.',
        guide: [
          '1. Pilih nama santri dari daftar 31 Santri Binaan.',
          '2. Tentukan juz yang diujikan (misal: Juz 1-5 atau Juz 30).',
          '3. Masukkan nilai Tajwid, Fashahah, dan Kelancaran.',
          '4. Sistem otomatis menetapkan predikat (Mumtaz, Jayyid Jiddan, Jayyid) dan mencetak sertifikat.'
        ]
      },
      akun: {
        id: 'akun',
        name: 'Generator Akun & PPDB',
        category: 'Akademik & Guru',
        desc: 'Pembuat akun login massal santri/wali santri (Username/Password), nomor registrasi PPDB, dan cetak kartu akses.',
        keywords: ['akun', 'ppdb', 'generator akun', 'username', 'password', 'kartu santri', 'nisn'],
        summary: 'Membuat kredensial akun aman untuk sistem ujian CBT dan portal wali santri secara massal dalam hitungan detik.',
        guide: [
          '1. Masukkan daftar santri baru atau nomor registrasi.',
          '2. Tentukan format username & pola password acak aman.',
          '3. Klik "Generate Akun" lalu unduh kartu akun siap dibagikan.'
        ]
      },
      humas: {
        id: 'humas',
        name: 'Humas & Sosmed (Radar H-7)',
        category: 'Humas, Inovasi & Pribadi',
        desc: 'Radar H-7 peringatan hari besar nasional (PHBN) & Islam (PHBI), 252 Master Agenda YTPAI 2026-2027, dan pembuat pamflet sosmed.',
        keywords: ['humas', 'sosmed', 'radar h-7', 'phbn', 'phbi', 'agenda', 'pamflet', 'kalender', 'hari besar'],
        summary: 'Modul peringatan dini H-7 agenda yayasan dan hari besar agar tim humas tidak pernah terlambat membuat pamflet dan ucapan resmi.',
        guide: [
          '1. Periksa kartu "Radar H-7" di bagian atas untuk melihat agenda terdekat.',
          '2. Klik "Buat Pamflet / Teks Ucapan" untuk mendapatkan draf caption WhatsApp dan Instagram.',
          '3. Jadwalkan publikasi ke kalender tahunan yayasan.'
        ]
      },
      keuangan: {
        id: 'keuangan',
        name: 'Keuangan Pribadi Pintar',
        category: 'Humas, Inovasi & Pribadi',
        desc: 'Pengelola dompet pribadi, deteksi "bocor halus" pengeluaran, asisten suara pencatatan pengeluaran, dan alokasi amplop pintar.',
        keywords: ['keuangan', 'dompet', 'bocor halus', 'uang', 'pengeluaran', 'struk', 'gaji', 'anggaran'],
        summary: 'Mengontrol keuangan harian guru dan staf agar tidak boncos dengan metode alokasi amplop dan pengingat kebocoran dana kecil.',
        guide: [
          '1. Catat pemasukan (gaji, insentif, bagi hasil).',
          '2. Gunakan asisten suara untuk mencatat belanja harian ("Beli bensin 25 ribu").',
          '3. Pantau grafik "Radar Bocor Halus" untuk melihat pos yang boros.'
        ]
      },
      ide: {
        id: 'ide',
        name: 'Ruang Ide & Tumbuh',
        category: 'Humas, Inovasi & Pribadi',
        desc: 'Inkubator ide kreatif, papan kanban validasi peluang usaha, dan pengikis keraguan (Anti-Ragu).',
        keywords: ['ide', 'ruang ide', 'inovasi', 'peluang', 'validasi', 'kanban', 'catatan ide'],
        summary: 'Tempat menampung gagasan segar, menguji kelayakan ide, dan memecahnya menjadi rencana eksekusi nyata.',
        guide: [
          '1. Tulis ide liar Anda di kartu ide.',
          '2. Berikan skor dampak vs kemudahan eksekusi.',
          '3. Geser ide di papan Kanban dari "Draft" ke "Tervalidasi" hingga "Selesai".'
        ]
      },
      bisnis: {
        id: 'bisnis',
        name: 'Inkubator Bisnis & Titip Jual',
        category: 'Humas, Inovasi & Pribadi',
        desc: 'Manajemen konsinyasi warung/kantin, kalkulator kasir bagi hasil otomatis, pantauan arus kas modal, dan script penguat mental anti-minder.',
        keywords: ['bisnis', 'titip jual', 'konsinyasi', 'warung', 'bagi hasil', 'modal', 'anti-minder', 'kasir'],
        summary: 'Modul wirausaha sampingan tanpa modal besar: kelola warung penitipan, hitung untung bersih per produk, dan atasi rasa malu menawarkan produk.',
        guide: [
          '1. Catat nama warung mitra di modul Titip Jual.',
          '2. Masukkan produk, harga titip (pokok), dan harga jual warung.',
          '3. Buka tab "Script Anti-Minder" jika Anda merasa canggung atau ragu saat menawarkan produk ke pemilik warung.'
        ]
      },
      pembersih: {
        id: 'pembersih',
        name: 'Pembersih & SUM Excel',
        category: 'Alat Bantu & Utilitas',
        desc: 'Generator formula SUM Excel otomatis, pembersih spasi ganda, perbaikan format angka teks Bank BRI, dan standardisasi nama.',
        keywords: ['pembersih', 'sum', 'formula excel', 'spasi ganda', 'trim', 'kalkulasi'],
        summary: 'Membersihkan data tabel kotor sebelum dimasukkan ke dalam generator BRIVA.',
        guide: [
          '1. Tempel data teks yang memiliki spasi ganda atau format berantakan.',
          '2. Klik tombol "Bersihkan Format & Spasi".',
          '3. Salin kembali teks yang sudah rapi ke lembar Excel Anda.'
        ]
      },
      wa: {
        id: 'wa',
        name: 'Template WhatsApp Broadcast',
        category: 'Alat Bantu & Utilitas',
        desc: '6 format template pesan WhatsApp resmi untuk tagihan santri, ucapan hari besar, pengumuman rapat, dan undangan wali murid.',
        keywords: ['wa', 'whatsapp', 'template wa', 'broadcast', 'pesan wali', 'pengumuman'],
        summary: 'Menyusun pesan WhatsApp sopan, profesional, dan personal dengan variabel dinamis seperti {nama}, {nominal}, dan {tanggal}.',
        guide: [
          '1. Pilih jenis template yang diinginkan (Tagihan, Undangan, atau Pengumuman).',
          '2. Masukkan variabel data santri.',
          '3. Klik "Buka WhatsApp Langsung" atau "Salin Teks".'
        ]
      },
      panduan: {
        id: 'panduan',
        name: 'Panduan SOP Excel',
        category: 'Alat Bantu & Utilitas',
        desc: 'Buku panduan digital standar operasional prosedur (SOP) pengelolaan keuangan BRIVA, format kolom bank, dan shortcut penting.',
        keywords: ['panduan', 'sop', 'aturan bri', 'buku panduan', 'shortcut excel', 'bantuan'],
        summary: 'Panduan referensi regulasi bank dan tata cara administrasi yayasan YTPAI.',
        guide: [
          '1. Pilih bab SOP yang ingin Anda pelajari.',
          '2. Terapkan panduan langkah demi langkah pada lembar kerja Anda.'
        ]
      }
    }
  };

  // --- 2. JURNAL & SCHEDULE DATA ENGINE (REALTIME DATABASE BINDING) ---
  const FATIH_DEFAULT_SCHEDULES = [
    { day: 'Ahad',  time: '07.00 - 08.30', classId: '8C', subject: 'Prakarya', room: 'Ruang MTs 8C' },
    { day: 'Ahad',  time: '08.30 - 09.50', classId: 'Semua', subject: 'Pengembangan Diri', room: 'Gedung MTs / Terpadu' },
    { day: 'Ahad',  time: '10.20 - 11.40', classId: '7A', subject: 'Prakarya (Kode 33)', room: 'Ruang MTs 7A' },
    { day: 'Ahad',  time: '12.10 - 13.20', classId: '7B', subject: 'Prakarya (Kode 33)', room: 'Ruang MTs 7B' },
    { day: 'Senin', time: '07.00 - 08.30', classId: '8D', subject: 'Prakarya', room: 'Ruang MTs 8D' },
    { day: 'Senin', time: '12.10 - 13.20', classId: '7D', subject: 'Prakarya (Kode 33)', room: 'Ruang MTs 7D' },
    { day: 'Selasa', time: '07.00 - 08.30', classId: '8A', subject: 'Prakarya', room: 'Ruang MTs 8A' },
    { day: 'Selasa', time: '08.30 - 09.50', classId: '8B', subject: 'Prakarya', room: 'Ruang MTs 8B' },
    { day: 'Selasa', time: '18.00 - 19.30', classId: '1UlaA', subject: 'Safinatun Najah (Madin)', room: 'Gedung Diniyah Lt. 1' },
    { day: 'Kamis', time: '07.00 - 08.30', classId: '7C', subject: 'Prakarya (Kode 33)', room: 'Ruang MTs 7C' },
    { day: 'Kamis', time: '10.20 - 11.40', classId: '8B', subject: 'Prakarya', room: 'Ruang MTs 8B' },
    { day: 'Jumat', time: '18.00 - 19.30', classId: '1UlaB', subject: 'Safinatun Najah (Madin)', room: 'Gedung Diniyah Lt. 2' }
  ];

  function getJurnalData() {
    try {
      const raw = localStorage.getItem('partner_fatih_jurnal_guru_v2');
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return null;
  }

  // --- 2B. PILAR KEDEWASAAN BERPIKIR & BERTINDAK (FATHIYA WISDOM VAULT) ---
  const FATHIYA_WISDOM_VAULT = [
    {
      triggers: ['dewasa', 'cara bersikap dewasa', 'pola pikir dewasa', 'bersikap dewasa', 'menjadi dewasa', 'kedewasaan', 'sikap dewasa', 'matang dalam berpikir', 'berpikir dewasa', 'tindakan dewasa'],
      title: 'Pilar Kedewasaan Berpikir: Jernih, Tenang & Mengambil Tanggung Jawab Penuh',
      quote: '"Kedewasaan sejati tidak diukur dari angka usia, melainkan dari kemampuan kita menahan reaksi pertama, menata emosi dengan kepala dingin, dan memilih solusi bermartabat daripada sibuk mengeluh."',
      actions: [
        '1. **Jeda Sebelum Merespons (Pause & Breathe)**: Orang yang belum matang bereaksi spontan terbawa perasaan; orang dewasa memberi jeda beberapa detik agar akal sehat dan adab yang memegang kendali.',
        '2. **Tanggung Jawab Pribadi (Radical Ownership)**: Berhentilah mencari kambing hitam. Tanyakan pada diri: *\'Apa satu hal yang berada dalam kendaliku hari ini untuk memperbaiki keadaan?\'*',
        '3. **Kedepankan Konsekuensi Jangka Panjang (Second-Order Thinking)**: Jangan mengambil keputusan saat amarah atau kelelahan memuncak. Ukur dampak kata-kata dan tindakan kita untuk masa depan.'
      ],
      voiceText: 'Kedewasaan berawal dari kemampuan kita menenangkan diri, menahan reaksi sesaat, dan mengambil tanggung jawab penuh atas tindakan kita sahabatku.'
    },
    {
      triggers: ['emosi', 'lagi marah', 'marah banget', 'kesal', 'jengkel', 'sakit hati', 'tersinggung', 'kecewa', 'jengkel banget', 'benci', 'marah'],
      title: 'Menjinakkan Amarah: Menjaga Martabat di Saat Paling Menantang',
      quote: '"Bukanlah orang kuat itu yang pandai bergulat atau membalas cercaan, tetapi orang kuat adalah yang mampu mengendalikan dirinya saat amarah bergolak." (HR. Bukhari)',
      actions: [
        '1. **Ubah Posisi & Beri Jeda Fisik**: Jika sedang berdiri, duduklah. Jika duduk, berbaringlah atau basuh wajah dengan air wudhu untuk memadamkan gejolak amarah.',
        '2. **Pisahkan Fakta dari Asumsi**: Seringkali yang menyakiti kita bukanlah perbuatan orang lain, melainkan cerita buruk yang dibangun oleh pikiran kita sendiri. Tetaplah obyektif.',
        '3. **Sampaikan Batasan dengan Elegan**: Bersikap tegas tidak perlu membentak. Nada bicara yang tenang, jelas, dan santun justru memancarkan wibawa kepemimpinan yang disegani.'
      ],
      voiceText: 'Tahan sejenak amarah Anda sahabatku. Kemenangan sejati adalah saat kita mampu menguasai diri dan tetap menjaga adab.'
    },
    {
      triggers: ['bimbang', 'bingung memilih', 'ambil keputusan', 'ragu-ragu', 'pilihan sulit', 'harus bagaimana', 'kebingungan', 'gamang', 'dilema'],
      title: 'Kebijaksanaan Memilih: Kerangka Keputusan Matang & Berprinsip',
      quote: '"Keraguan tidak akan hilang dengan menunggu keadaan sempurna, tetapi dengan keberanian memilih jalan yang berprinsip dan siap menanggung risikonya secara ksatria."',
      actions: [
        '1. **Gunakan Kaidah 10/10/10**: Bagaimana dampak pilihan ini dalam 10 menit ke depan? 10 bulan ke depan? Dan 10 tahun ke depan?',
        '2. **Pilih yang Lebih Mengutamakan Maslahat & Integritas**: Jika dua pilihan tampak seimbang, pilih opsi yang menuntut disiplin dan kebaikan jangka panjang, bukan kenyamanan semu.',
        '3. **Setelah Memilih, Melangkahlah dengan Tawakal**: Jangan habiskan energi menyesali masa lalu. Fokuskan seluruh daya untuk menuntaskan amanah yang telah dipilih.'
      ],
      voiceText: 'Saat bimbang, pilihlah yang paling membawa maslahat jangka panjang dan berpegang teguhlah pada prinsip moral.'
    },
    {
      triggers: ['capek', 'lelah banget', 'beban berat', 'banyak tuntutan', 'burnout', 'pusing banget', 'capek batin', 'overthinking', 'stres', 'stress', 'mengeluh'],
      title: 'Menata Ulang Energi: Menghadapi Beban dengan Jiwa yang Lapang',
      quote: '"Kita sering lelah bukan semata karena pekerjaan yang menumpuk, melainkan karena pikiran kita memikul hari esok sebelum hari ini selesai."',
      actions: [
        '1. **Satu Hal pada Satu Waktu (Single-Tasking)**: Pilah daftar tugas. Kerjakan satu hal kecil yang paling mendesak selama 15 menit dengan tuntas.',
        '2. **Ikhlaskan yang di Luar Kendali**: Kita tidak bertanggung jawab atas prasangka atau ekspektasi orang lain. Nilai kita ditentukan oleh keikhlasan dan kesungguhan ikhtiar.',
        '3. **Istirahat dengan Sadar**: Beri hak pada raga untuk bernapas. Istirahat sejenak bukan tanda kelemahan, melainkan bagian dari persiapan untuk kembali melangkah kuat.'
      ],
      voiceText: 'Tarik napas perlahan sahabatku. Selesaikan satu tugas kecil hari ini dengan tenang, dan serahkan sisanya kepada Allah.'
    },
    {
      triggers: ['lagi minder', 'merasa minder', 'aku minder', 'sangat minder', 'insecure', 'kurang percaya diri', 'tidak percaya diri', 'takut ditolak', 'takut jualan', 'mental drop', 'down banget', 'putus asa'],
      title: 'Keteguhan Hati: Menghapus Minder dengan Nilai Nyata',
      quote: '"Minder sering kali muncul karena kita membandingkan proses dapur kita yang masih berantakan dengan panggung megah orang lain. Mulailah dari apa yang ada di tangan hari ini."',
      actions: [
        '1. **Turunkan Ekspektasi Palsu**: Kesempurnaan itu ilusi; konsistensi bertumbuh adalah kenyataan. Cukup selesaikan satu tugas kecil dengan tekun.',
        '2. **Fokus pada Melayani, Bukan Mencari Pengakuan**: Saat mengajar atau menawarkan karya, niatkan untuk menolong sesama, bukan mencari sanjungan manusia.',
        '3. **Gunakan Sarana Teruji**: Manfaatkan modul dan template yang telah saya siapkan di Partner Fatih ini untuk menunjang performa profesional Anda.'
      ],
      voiceText: 'Jangan berkecil hati sahabatku. Kematangan diri berakar dari kerendahan hati untuk terus belajar dan melangkah maju.'
    }
  ];

  // --- 3. STATE & CONVERSATION CONTEXT ENGINE ---
  let chatHistory = [];
  let isThinking = false;
  let speechRecognition = null;
  let isListening = false;
  let lastPromptWasVoice = false;

  // Memori Konteks Percakapan Multiturn (Singkron & Sadar Topik Berkelanjutan)
  const chatContext = {
    lastTopic: null,          // 'jadwal', 'kehadiran', 'briva', 'tahfidz', 'agenda', 'sharing'
    lastClass: '7A',          // default kelas
    lastDayName: null,        // hari acuan
    lastMatchingSchedules: [],
    lastTargetStudent: null,
    recentTurns: []           // [{ role: 'user'|'fatih', text: '...' }]
  };

  // Helper Pengambil Master Data Humas & Kalender Tahunan (252 Agenda Resmi YTPAI 2026-2027)
  function getHumasPrograms() {
    try {
      if (typeof window !== 'undefined' && window.humasState && Array.isArray(window.humasState.programs) && window.humasState.programs.length > 0) {
        return window.humasState.programs;
      }
      const raw = localStorage.getItem('humas_programs_master_v5');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch(e) {}
    // Fallback Agenda Utama Resmi YTPAI 2026-2027
    return [
      { tgl: '22', bulan: 'Oktober', tahun: '2026', uraian: 'Peringatan Hari Santri Nasional 2026 (Apel Akbar & Kirab Budaya Santri)', pj: 'Kesiswaan & Humas', sasaran: 'Seluruh Santri, Wali & Asatidz YTPAI', kategori: 'phbi' },
      { tgl: '28', bulan: 'Oktober', tahun: '2026', uraian: 'Peringatan Hari Sumpah Pemuda (Upacara Bendera & Gelar Kreasi Siswa)', pj: 'Kesiswaan', sasaran: 'Siswa MTs & MA', kategori: 'nasional' },
      { tgl: '10', bulan: 'November', tahun: '2026', uraian: 'Peringatan Hari Pahlawan Nasional & Doa Bersama Pejuang Bangsa', pj: 'Humas & Kesiswaan', sasaran: 'Keluarga Besar YTPAI', kategori: 'nasional' },
      { tgl: '25', bulan: 'November', tahun: '2026', uraian: 'Peringatan Hari Guru Nasional & Tasyakuran Khidmah Pendidik', pj: 'Yayasan & Komite', sasaran: 'Seluruh Dewan Guru & Asatidz', kategori: 'nasional' },
      { tgl: '01-08', bulan: 'Desember', tahun: '2026', uraian: 'Pelaksanaan Sumatif Akhir Semester (SAS / PAS) Ganjil TP 2026/2027', pj: 'Panitia SAS/PAS', sasaran: 'Siswa MTs, MA & Madin', kategori: 'akademik' },
      { tgl: '19', bulan: 'Desember', tahun: '2026', uraian: 'Pembagian Rapor Semester Ganjil & Gelar Karya P5-PPRA', pj: 'Wali Kelas & Kurikulum', sasaran: 'Wali Santri & Siswa', kategori: 'akademik' },
      { tgl: '15', bulan: 'Januari', tahun: '2027', uraian: 'Ujian Tasmi\' Bil Ghoib 31 Santri Tahfidz Binaan YTPAI', pj: 'Koordinator Tahfidz', sasaran: '31 Santri Binaan & Musyrif', kategori: 'tasmi' },
      { tgl: '01', bulan: 'Februari', tahun: '2027', uraian: 'Pembukaan Pendaftaran Santri Baru (PPDB) TP 2027/2028', pj: 'Tim PPDB YTPAI', sasaran: 'Masyarakat & Calon Santri', kategori: 'ppdb' }
    ];
  }

  // Helper Pengambil 31 Santri Binaan Tahfidz
  function getTahfidzStudents() {
    try {
      const stored = localStorage.getItem('tahfidz_master_students_v1');
      if (stored) {
        const list = JSON.parse(stored);
        if (Array.isArray(list) && list.length > 0) return list;
      }
      if (typeof window !== 'undefined' && Array.isArray(window.TAHFIDZ_DEFAULT_STUDENTS)) {
        return window.TAHFIDZ_DEFAULT_STUDENTS;
      }
    } catch(e) {}
    return [];
  }

  // Helper Deteksi Tab Aplikasi yang Sedang Dibuka Pengguna
  function detectActiveAppTab() {
    const tabKeys = ['konverter', 'akun', 'briva', 'panggil', 'katalog', 'tahfidz', 'pembersih', 'panduan', 'wa', 'humas', 'jurnal', 'keuangan', 'cbt', 'ide', 'rekap_junio', 'bisnis'];
    for (const k of tabKeys) {
      const el = document.getElementById('tab-' + k) || 
                 document.getElementById('tab' + k.charAt(0).toUpperCase() + k.slice(1)) ||
                 document.querySelector(`[data-tab-content="${k}"]`);
      if (el && !el.classList.contains('hidden') && el.offsetParent !== null) {
        return k;
      }
    }
    const activeNav = document.querySelector('.tab-pill.active, [data-tab].active');
    if (activeNav) {
      const dt = activeNav.getAttribute('data-tab') || activeNav.getAttribute('data-tab-target');
      if (dt && FATIH_KNOWLEDGE_BASE.tabs[dt]) return dt;
    }
    return 'briva';
  }

  // Generator Tabel Pintasan Aplikasi (Interactive Fast-Action Table)
  function renderActionTableHtml(actionsList) {
    if (!actionsList || !Array.isArray(actionsList) || actionsList.length === 0) return '';
    
    const rows = actionsList.map(item => {
      const tabKey = item.tabId || 'briva';
      const tabInfo = FATIH_KNOWLEDGE_BASE.tabs[tabKey] || { name: item.name || tabKey, desc: item.desc || '' };
      const tabName = item.name || tabInfo.name;
      const desc = item.desc || tabInfo.summary || 'Buka modul';
      
      return `
        <tr class="hover:bg-white/[0.04] transition-colors">
          <td class="py-1.5 px-2 font-bold text-slate-100 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
            <span class="truncate">${escapeHtml(tabName)}</span>
          </td>
          <td class="py-1.5 px-2 text-[9.5px] text-slate-300">
            ${escapeHtml(desc)}
          </td>
          <td class="py-1.5 px-2 text-right">
            <button type="button" onclick="window.switchTab('${tabKey}'); window.closeFatihChat();" class="px-2 py-0.5 rounded bg-emerald-500/25 hover:bg-emerald-500/40 text-emerald-300 font-bold border border-emerald-400/40 text-[9px] cursor-pointer transition-all active:scale-95 inline-flex items-center gap-1">
              <span>Buka</span>
              <i data-lucide="arrow-right" class="w-2.5 h-2.5"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="mt-2 rounded-lg border border-emerald-500/30 bg-slate-950/80 overflow-hidden shadow-xs">
        <div class="px-2.5 py-1 bg-emerald-950/60 border-b border-emerald-500/20 flex items-center justify-between text-[10px]">
          <span class="font-bold text-emerald-300 flex items-center gap-1">
            <i data-lucide="compass" class="w-3 h-3 text-emerald-400"></i>
            <span>Pintasan Menu Cepat</span>
          </span>
          <span class="text-[8.5px] text-emerald-400/80 font-mono">1-Klik Langsung Buka</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-[10px] divide-y divide-white/5">
            <thead class="bg-white/[0.02] text-slate-400 text-[9px] uppercase font-bold tracking-wider">
              <tr>
                <th class="py-1 px-2">Modul Tujuan</th>
                <th class="py-1 px-2">Keperluan Kerja</th>
                <th class="py-1 px-2 text-right w-16">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Generator Tabel Pintasan Lengkap 16 Modul Partner Fatih
  function handleShowAllModulesTable() {
    return {
      type: 'all_modules_matrix',
      text: `Berikut adalah **Tabel Pintasan Navigasi Seluruh 16 Modul Partner Fatih**. Anda bisa langsung mengetuk tombol **"Buka"** pada modul yang hendak Anda tuju setelah berdiskusi dengan Fathiya 🌸`,
      voiceText: `Berikut tabel pintasan seluruh 16 modul Partner Fatih sahabatku. Silakan pilih modul yang ingin langsung Anda buka.`,
      tabShortcut: null,
      actionTable: [
        { tabId: 'briva', name: 'Generator BRIVA', desc: 'Tagihan Virtual Account 5 Kolom BRI' },
        { tabId: 'rekap_junio', name: 'Rekap Junio Smart', desc: 'Mutasi Transaksi 6-Sheet Excel & PDF' },
        { tabId: 'panggil', name: 'Panggil Tagihan', desc: 'Rincian Santri, Kwitansi & Reminder WA' },
        { tabId: 'katalog', name: 'Katalog 31 Kode BRI', desc: 'Daftar Kode 48 s.d. 80 & Tarif Resmi' },
        { tabId: 'jurnal', name: 'Jurnal Mengajar Guru', desc: 'KBM Harian, Jadwal Mengajar & Absensi' },
        { tabId: 'cbt', name: 'Bank Soal CBT', desc: 'Kisi-kisi & Naskah Word Docx Resmi' },
        { tabId: 'tahfidz', name: 'Tahfidz Tasmi\'', desc: 'Ujian Bil Ghoib 31 Santri & Sertifikat' },
        { tabId: 'akun', name: 'Akun & PPDB', desc: 'Cetak Kartu Login & Password Santri' },
        { tabId: 'humas', name: 'Humas & Sosmed', desc: 'Radar H-7, Kalender 252 Agenda & Pamflet' },
        { tabId: 'bisnis', name: 'Inkubator Bisnis', desc: 'Konsinyasi 5 Warung & Script Anti-Minder' },
        { tabId: 'keuangan', name: 'Keuangan Pribadi', desc: 'Dompet Digital & Deteksi Bocor Halus' },
        { tabId: 'ide', name: 'Ruang Ide', desc: 'Inovasi, Proposal & Roadmap Yayasan' },
        { tabId: 'konverter', name: 'Konverter Excel', desc: 'Ubah Tabel Mentah Jadi Standar Bersih' },
        { tabId: 'pembersih', name: 'Pembersih SUM', desc: 'Format Angka & Rumus SUM Otomatis' },
        { tabId: 'wa', name: 'Template Broadcast WA', desc: '6 Draf Pesan Wali Santri Dinamis' },
        { tabId: 'panduan', name: 'Panduan SOP Excel', desc: 'Regulasi Bank BRI & Standar Dokumen' }
      ]
    };
  }

  // Load chat history from localStorage
  try {
    const saved = localStorage.getItem('partner_fatih_chat_history');
    if (saved) {
      chatHistory = JSON.parse(saved);
      if (!Array.isArray(chatHistory)) chatHistory = [];
    }
  } catch(e) {
    chatHistory = [];
  }

  function saveChatHistory() {
    try {
      localStorage.setItem('partner_fatih_chat_history', JSON.stringify(chatHistory.slice(-40)));
    } catch(e) {}
  }

  // --- 4. REALTIME VOICE COMMAND HANDLERS ---

  // A. Generator Tagihan BRIVA via Voice / Teks (Fleksibel & Tanggap Bahasa Santai)
  function handleGenerateTagihanVoice(rawText) {
    const text = rawText.trim();
    
    // Extract nama: support "buat daniyal", "buat si daniyal", "untuk si budi", "atas nama...", "siswa...", "santri..."
    let nama = 'Achmad Alfan';
    const mNama = text.match(/(?:untuk\s+siswa|siswa|santri|atas\s+nama|buat\s+si|untuk\s+si|buatkan\s+si|buat|untuk|si)\s+([A-Za-z\s'"`]+?)(?=\s+(?:kelas|kls|unit|kode|sebesar|nominal|dengan|rp|sebanyak|dong|ya|$))/i);
    if (mNama && mNama[1].trim()) {
      let n = mNama[1].trim();
      n = n.replace(/\b(spp|syahriyah|tagihan|briva|dsp|anak|siswa|santri)\b/gi, '').trim();
      if (n) nama = n;
    }

    // Extract kelas: support "kelas 7A", "kls 8B", "anak 7C", atau langsung "7A", "8D", "1UlaA"
    let kelas = '7A';
    const mKelas = text.match(/(?:kelas|kls|tingkat|anak)\s*([0-9]+[A-Za-z]?|[A-Za-z0-9]+)/i) || text.match(/\b([789][A-Da-d]|10|11|12|1ula[ab]?)\b/i);
    if (mKelas) {
      kelas = (mKelas[1] || mKelas[0]).trim().toUpperCase();
      if (kelas === '1ULAA') kelas = '1UlaA';
      if (kelas === '1ULAB') kelas = '1UlaB';
    }

    // Extract unit
    let unit = 'MTs';
    const mUnit = text.match(/\b(MTs|MA|SMP|SMA|Diniyah|Madin|Pondok|TK|SD)\b/i);
    if (mUnit && mUnit[1].trim()) unit = mUnit[1].trim().toUpperCase();

    // Extract kode / jenis tagihan: support syahriyah, spp, dsp, daftar ulang, katering, infaq
    let kode = 'Syahriyah (01)';
    const mKode = text.match(/kode\s+([A-Za-z0-9_\s]+?)(?=\s+(?:sebesar|nominal|dengan|$))/i) || text.match(/\b(syahriyah|spp|dsp|daftar\s*ulang|katering|infaq|uang\s*gedung|gedung|62|11|33|01)\b/i);
    if (mKode) {
      const k = (mKode[1] || mKode[0]).trim();
      kode = k.charAt(0).toUpperCase() + k.slice(1);
    }

    // Extract nominal: support "250 ribu", "250rb", "250k", "1.5 juta", "Rp 350.000", atau angka langsung
    let nominal = 350000;
    const mNominal = text.match(/(?:sebesar|nominal|rp\.?|jumlah|sebanyak)\s*([\d\.\,]+)/i) || 
                     text.match(/(\d+[\,\.]?\d*)\s*(?:juta|jt\b)/i) ||
                     text.match(/(\d+[\,\.]?\d*)\s*(?:ribu|rb|k\b)/i) ||
                     text.match(/\b(\d{5,8})\b/);
    if (mNominal) {
      if (text.includes('juta') || text.includes('jt')) {
        nominal = parseFloat(mNominal[1].replace(/,/g, '.')) * 1000000;
      } else if (text.includes('ribu') || text.includes('rb') || text.includes('k')) {
        nominal = parseFloat(mNominal[1].replace(/,/g, '.')) * 1000;
      } else {
        const cleaned = mNominal[1].replace(/[^0-9]/g, '');
        if (cleaned) nominal = parseInt(cleaned, 10);
      }
    }

    // Format dates (DD/MM/YYYY)
    const today = new Date();
    const dStr = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 10);
    const dTempo = '10/' + String(nextMonth.getMonth() + 1).padStart(2, '0') + '/' + nextMonth.getFullYear();

    const randomSeq = String(Math.floor(100 + Math.random() * 900));
    const vaNum = '8879901' + randomSeq;
    const idTagihan = `${kode} - ${nama} (${kelas} ${unit})`;
    const brivaRow = `${vaNum}\t${idTagihan}\t${nominal}\t${dStr}\t${dTempo}`;

    // Auto-sync into BRIVA input if present in DOM
    const brivaInput = document.getElementById('brivaVoiceCommandInput');
    if (brivaInput) {
      brivaInput.value = `Buat tagihan ${nama} kelas ${kelas} ${unit} kode ${kode}`;
    }

    const voiceMsg = `Siap! Tagihan untuk ${nama} kelas ${kelas} ${unit} sebesar ${nominal.toLocaleString('id-ID')} rupiah telah saya buatkan di tab BRIVA.`;

    const chatReply = `✅ **Draf Tagihan Massal BRIVA Berhasil Dibuat!**\n\n` +
      `• **Nama Siswa**: ${nama}\n` +
      `• **Kelas & Unit**: Kelas ${kelas} (${unit})\n` +
      `• **Kode Tagihan**: ${kode}\n` +
      `• **Nominal**: Rp ${nominal.toLocaleString('id-ID')}\n` +
      `• **No. Registrasi / BRIVA**: \`${vaNum}\`\n` +
      `• **Tgl Efektif / Tempo**: ${dStr} s.d. ${dTempo}\n\n` +
      `📋 **Format 5 Kolom Resmi Bank BRI:**\n\`${brivaRow}\`\n\n` +
      `Silakan klik tombol di bawah untuk membuka dan mengekspor tagihan ke format Excel Bank BRI.`;

    chatContext.lastTopic = 'briva';
    chatContext.lastTargetStudent = nama;

    return {
      type: 'briva_voice_billing',
      text: chatReply,
      voiceText: voiceMsg,
      tabShortcut: 'briva',
      brivaRow: brivaRow,
      actionTable: [
        { tabId: 'briva', name: 'Generator BRIVA', desc: 'Ekspor 5 kolom tagihan ke Excel' },
        { tabId: 'panggil', name: 'Panggil Tagihan', desc: 'Cetak kwitansi & reminder WA' }
      ]
    };
  }

  // B. Pengecekan Jadwal Mengajar Guru (Tanggap Bahasa Santai)
  function handleCekJadwalVoice(rawText) {
    const text = rawText.toLowerCase();
    const DAYS_MAP = {
      'ahad': 0, 'minggu': 0,
      'senin': 1,
      'selasa': 2,
      'rabu': 3,
      'kamis': 4,
      'jumat': 5, "jum'at": 5,
      'sabtu': 6
    };
    const DAYS_NAME = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    const now = new Date();
    let targetDayIndex = now.getDay();
    let targetDayName = DAYS_NAME[targetDayIndex];

    if (text.includes('besok')) {
      targetDayIndex = (targetDayIndex + 1) % 7;
      targetDayName = DAYS_NAME[targetDayIndex];
    } else {
      for (const [d, idx] of Object.entries(DAYS_MAP)) {
        if (text.includes(d)) {
          targetDayIndex = idx;
          targetDayName = DAYS_NAME[idx];
          break;
        }
      }
    }

    const jurnalData = getJurnalData();
    const schedulesList = (jurnalData && jurnalData.schedules) ? jurnalData.schedules : FATIH_DEFAULT_SCHEDULES;
    
    const matching = schedulesList.filter(s => {
      const sDay = (s.day || '').toLowerCase();
      return sDay.includes(targetDayName.toLowerCase()) || s.dayIndex === targetDayIndex;
    });

    chatContext.lastTopic = 'jadwal';
    chatContext.lastDayName = targetDayName;
    chatContext.lastMatchingSchedules = matching;

    if (matching.length === 0) {
      const msg = `Alhamdulillah, untuk hari **${targetDayName}** tidak ada jadwal jam tatap muka mengajar di kelas. Anda dapat memanfaatkannya untuk evaluasi pembelajaran, rekap rapor, atau persiapan program di Ruang Ide.`;
      return {
        type: 'jadwal',
        text: `📅 **Jadwal Mengajar Hari ${targetDayName}:**\n\n${msg}`,
        voiceText: `Hari ${targetDayName} tidak ada jadwal mengajar tatap muka.`,
        tabShortcut: 'jurnal',
        actionTable: [
          { tabId: 'jurnal', name: 'Jurnal Guru', desc: 'Buka buku jurnal mengajar harian' }
        ]
      };
    }

    let listStr = matching.map((s, idx) => {
      return `${idx + 1}. ⏰ **${s.time}**\n   • Kelas: **${s.classId}**\n   • Mapel: *${s.subject}*\n   • Ruang: 📍 ${s.room || 'Ruang Kelas'}`;
    }).join('\n\n');

    const voiceSummary = `Jadwal Anda untuk hari ${targetDayName} ada ${matching.length} sesi, yaitu kelas ${matching.map(s => s.classId).join(' dan ')}.`;

    return {
      type: 'jadwal',
      text: `📅 **Jadwal Mengajar Anda (${targetDayName}):**\n\n${listStr}\n\nSemua materi KBC dan indikator ajar sudah siap di tab **Jurnal Guru**.`,
      voiceText: voiceSummary,
      tabShortcut: 'jurnal',
      actionTable: [
        { tabId: 'jurnal', name: 'Jurnal Guru', desc: 'Buka buku jurnal & catat materi KBM' },
        { tabId: 'cbt', name: 'Bank Soal CBT', desc: 'Susun kisi-kisi & naskah ujian' }
      ]
    };
  }

  // B2. Pengecekan Jadwal Lanjutan (Sadar Konteks "Kalau Nanti Ada Dikelas Apa")
  function handleJadwalLanjutan(rawText) {
    const DAYS_NAME = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const now = new Date();
    const currentDayName = DAYS_NAME[now.getDay()];
    const targetDayName = chatContext.lastDayName || currentDayName;

    const jurnalData = getJurnalData();
    const schedulesList = (jurnalData && jurnalData.schedules) ? jurnalData.schedules : FATIH_DEFAULT_SCHEDULES;

    const matching = schedulesList.filter(s => {
      const sDay = (s.day || '').toLowerCase();
      return sDay.includes(targetDayName.toLowerCase());
    });

    chatContext.lastTopic = 'jadwal';
    chatContext.lastDayName = targetDayName;

    if (matching.length === 0) {
      return {
        type: 'jadwal',
        text: `Untuk hari **${targetDayName}**, Anda tidak memiliki jadwal jam tatap muka mengajar di kelas sahabatku 🌿 Anda bisa memanfaatkannya untuk evaluasi pembelajaran atau rekap rapor santri.`,
        voiceText: `Hari ${targetDayName} tidak ada jadwal mengajar tatap muka sahabatku.`,
        tabShortcut: 'jurnal',
        actionTable: [
          { tabId: 'jurnal', name: 'Jurnal Guru', desc: 'Buka buku jurnal mengajar harian' }
        ]
      };
    }

    // Ambil sesi berikutnya / nanti di hari itu (jika ada lebih dari 1 sesi, tampilkan sesi lanjutan)
    const nextSessions = matching.length > 1 ? matching.slice(1) : matching;

    const listStr = nextSessions.map((s, idx) => {
      return `• ⏰ **${s.time}**\n   - Kelas: **${s.classId}**\n   - Mapel: *${s.subject}*\n   - Ruang: 📍 ${s.room || 'Ruang MTs'}`;
    }).join('\n\n');

    const chatReply = `Untuk sesi berikutnya **nanti di hari ${targetDayName}**, Anda terjadwal mengajar di kelas berikut sahabatku 🌸\n\n` +
      `${listStr}\n\n` +
      `Semua materi ajar kurikulum KBC dan lembar presensi santri sudah siap di tab **Jurnal Guru**.`;

    const voiceSummary = `Untuk jadwal berikutnya nanti di hari ${targetDayName}, Anda mengajar di kelas ${nextSessions.map(s => s.classId).join(' dan ')}.`;

    return {
      type: 'jadwal',
      text: chatReply,
      voiceText: voiceSummary,
      tabShortcut: 'jurnal',
      actionTable: [
        { tabId: 'jurnal', name: 'Jurnal Guru', desc: 'Buka jurnal & presensi KBM' },
        { tabId: 'cbt', name: 'Bank Soal CBT', desc: 'Susun kisi-kisi & naskah ujian' }
      ]
    };
  }

  // B3. Pengecekan Kalender Tahunan Yayasan & Agenda Resmi YTPAI 2026-2027
  function handleKalenderTahunanHumas(rawText) {
    const text = rawText.toLowerCase();
    const programs = getHumasPrograms();
    const months = ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember'];
    const now = new Date();
    const currentMonthIdx = now.getMonth();
    const currentMonthName = months[currentMonthIdx];

    chatContext.lastTopic = 'agenda';

    // Cek apakah bertanya bulan spesifik
    let targetMonth = null;
    for (const m of months) {
      if (text.includes(m)) {
        targetMonth = m;
        break;
      }
    }

    let filtered = [];
    let titleContext = '';

    if (text.includes('hari santri') || text.includes('santri')) {
      filtered = programs.filter(p => (p.uraian || '').toLowerCase().includes('santri'));
      titleContext = 'Agenda Terkait Hari Santri';
    } else if (text.includes('tasmi') || text.includes('tahfidz')) {
      filtered = programs.filter(p => (p.uraian || '').toLowerCase().includes('tasmi') || (p.uraian || '').toLowerCase().includes('tahfidz'));
      titleContext = 'Agenda Ujian Tasmi\' & Tahfidz Santri';
    } else if (text.includes('ujian') || text.includes('sts') || text.includes('pts') || text.includes('sas') || text.includes('pas') || text.includes('rapor')) {
      filtered = programs.filter(p => (p.uraian || '').toLowerCase().includes('ujian') || (p.uraian || '').toLowerCase().includes('sas') || (p.uraian || '').toLowerCase().includes('sts') || (p.uraian || '').toLowerCase().includes('rapor'));
      titleContext = 'Agenda Ujian STS/SAS & Akademik';
    } else if (text.includes('guru') || text.includes('hari guru')) {
      filtered = programs.filter(p => (p.uraian || '').toLowerCase().includes('guru'));
      titleContext = 'Peringatan Hari Guru & Asatidz';
    } else if (text.includes('ppdb') || text.includes('daftar')) {
      filtered = programs.filter(p => (p.uraian || '').toLowerCase().includes('ppdb'));
      titleContext = 'Agenda PPDB & Penerimaan Santri Baru';
    } else if (targetMonth) {
      filtered = programs.filter(p => (p.bulan || '').toLowerCase().includes(targetMonth));
      titleContext = `Agenda Bulan ${targetMonth.charAt(0).toUpperCase() + targetMonth.slice(1)}`;
    } else {
      // Default: Agenda bulan berjalan / terdekat
      filtered = programs.filter(p => (p.bulan || '').toLowerCase().includes(currentMonthName));
      titleContext = `Agenda Terdekat Bulan ${currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1)}`;
      if (filtered.length === 0) {
        filtered = programs.slice(0, 4);
      }
    }

    if (filtered.length === 0) {
      filtered = programs.slice(0, 4);
      titleContext = 'Master Agenda Terdekat Yayasan';
    }

    const items = filtered.slice(0, 4);
    const listStr = items.map((p, idx) => {
      const tgl = `${p.tgl || ''} ${p.bulan || ''} ${p.tahun || '2026'}`.trim();
      return `${idx + 1}. 🗓️ **${p.uraian || 'Agenda Yayasan'}**\n` +
             `   • Waktu: **${tgl}**\n` +
             `   • Penanggung Jawab: **${p.pj || 'Humas / Yayasan'}**\n` +
             `   • Sasaran: *${p.sasaran || 'Seluruh Unit YTPAI'}*`;
    }).join('\n\n');

    const totalCount = programs.length || 252;
    const chatReply = `📅 **Kalender Tahunan & Agenda Resmi YTPAI 2026-2027 (${titleContext}):**\n\n` +
      `Dari total **${totalCount} agenda resmi yayasan & hari peringatan nasional/Islam**, berikut agenda yang terdata sahabatku 🌸\n\n` +
      `${listStr}\n\n` +
      `Seluruh jadwal ini telah terhubung ke modul **Humas & Sosmed** dengan sistem peringatan dini **Radar H-7** dan generator pamflet otomatis.`;

    const voiceSummary = `Berikut agenda yayasan untuk ${titleContext} sahabatku: ${items.map(i => i.uraian).join(', ')}.`;

    return {
      type: 'agenda_humas',
      text: chatReply,
      voiceText: voiceSummary,
      tabShortcut: 'humas',
      actionTable: [
        { tabId: 'humas', name: 'Humas & Sosmed', desc: 'Radar H-7, Kalender & Draf Pamflet' },
        { tabId: 'ide', name: 'Ruang Ide', desc: 'Rancang proposal & roadmap agenda' }
      ]
    };
  }

  // B4. Companion Curhat & Diskusi Pemikiran (Empathetic Sharing & Wise Sister)
  function handleSharingCurhat(userText) {
    chatContext.lastTopic = 'sharing';
    const lower = userText.toLowerCase();

    // Sharing 1: Emosi / Marah / Tersinggung
    if (lower.includes('marah') || lower.includes('kesal') || lower.includes('jengkel') || lower.includes('tersinggung') || lower.includes('sakit hati')) {
      return {
        type: 'sharing',
        text: `Aku paham sekali rasanya, sahabatku 🌸 Sangat wajar bila hatimu merasa panas atau kecewa saat hal itu terjadi.\n\nDalam situasi seperti ini, tanda kedewasaan kita yang paling berwibawa adalah **memberi jeda (the power of pause)**. Tarik napas perlahan... Jangan biarkan amarah sesaat merusak reputasi dan ketenangan yang sudah susah payah kamu bangun.\n\nCoba renungkan: *"Apakah membalasnya sekarang akan menyelesaikan masalah, atau hanya memuaskan ego beberapa menit tapi menyisakan penyesalan?"*\n\nPilihlah respon yang tenang dan berkelas. Kamu jauh lebih berharga daripada membiarkan dirimu terpancing. Ceritakan padaku, apa yang sebenarnya paling membuatmu terluka dari kejadian itu?`,
        voiceText: `Tarik napas perlahan sahabatku. Aku di sini mendengarkanmu. Jangan biarkan amarah sesaat merusak ketenanganmu.`,
        tabShortcut: null,
        actionTable: [
          { tabId: 'ide', name: 'Ruang Ide', desc: 'Uraikan pemikiran & solusi jernih' },
          { tabId: 'jurnal', name: 'Jurnal Guru', desc: 'Alihkan energi ke capaian KBM santri' }
        ]
      };
    }

    // Sharing 2: Capek / Lelah Batin / Beban Berat / Overthinking
    if (lower.includes('capek') || lower.includes('lelah') || lower.includes('pusing') || lower.includes('berat') || lower.includes('overthinking') || lower.includes('stres')) {
      return {
        type: 'sharing',
        text: `Peluk hangat dari jauh untukmu, sahabatku 🌿 Mengakui bahwa diri kita lelah adalah tanda kejujuran jiwa, bukan tanda kelemahan.\n\nSeringkali kita lelah bukan semata karena banyaknya pekerjaan, melainkan karena pikiran kita mencoba menyelesaikan hari esok pada hari ini. Padahal tugas kita hanya melangkah satu persatu.\n\nIstirahatlah sejenak tanpa rasa bersalah. Raga dan pikiranmu punya hak untuk bernapas. Dari semua hal yang sedang menumpuk, apa satu hal kecil yang paling mungkin kita selesaikan perlahan hari ini? Fathiya siap bantu meringankan tugasmu di aplikasi ini.`,
        voiceText: `Istirahat sejenak sahabatku. Jangan paksakan semua selesai sekaligus. Fathiya ada di sini menemani langkahmu.`,
        tabShortcut: null,
        actionTable: [
          { tabId: 'jurnal', name: 'Jurnal Guru', desc: 'Cek jadwal KBM yang tersisa' },
          { tabId: 'keuangan', name: 'Keuangan Pribadi', desc: 'Alokasi amplop & evaluasi diri' }
        ]
      };
    }

    // Sharing 3: Minder / Kurang Percaya Diri / Takut Ditolak / Ragu
    if (lower.includes('minder') || lower.includes('insecure') || lower.includes('takut') || lower.includes('ragu') || lower.includes('gak pede') || lower.includes('percaya diri')) {
      return {
        type: 'sharing',
        text: `Dengarkan Fathiya baik-baik ya, sahabatku ✨ Rasa minder itu manusiawi, tapi jangan biarkan ia menahan potensimu.\n\nOrang yang percaya diri bukan orang yang tidak pernah ragu, melainkan orang yang tetap melangkah meski hatinya berdebar. Jangan bandingkan awal prosesmu yang sunyi dengan panggung keberhasilan orang lain.\n\nFokuslah pada niat baik untuk memberi manfaat. Ketika kita berniat melayani dan menolong, rasa takut ditolak akan berganti menjadi ketulusan. Di Partner Fatih ini, semua modul sudah Fathiya siapkan agar kamu bisa bekerja secara profesional dan percaya diri!`,
        voiceText: `Jangan berkecil hati sahabatku. Niatkan langkahmu untuk menebar kebaikan, insya Allah kamu pasti bisa.`,
        tabShortcut: 'bisnis',
        actionTable: [
          { tabId: 'bisnis', name: 'Inkubator Bisnis', desc: 'Buka Script Anti-Minder & Tips Percaya Diri' },
          { tabId: 'ide', name: 'Ruang Ide', desc: 'Tulis ide inovasi masa depanmu' }
        ]
      };
    }

    // Sharing Umum / Eksplorasi Pikiran
    return {
      type: 'sharing',
      text: `Aku siap mendengarkan dengan sepenuh hati, sahabatku 🌸\n\nKadang kita hanya butuh ruang yang aman untuk menata kembali isi kepala yang penuh. Tidak perlu terburu-buru, ceritakan apa yang sedang kamu rasakan atau pikirkan.\n\nApakah ini berkaitan dengan dinamika di sekolah, hubungan dengan rekan kerja, atau tentang arah langkahmu ke depan? Fathiya siap jadi kawan berpikir yang jernih untukmu.`,
      voiceText: `Aku siap mendengarkan sahabatku. Ceritakan apa yang sedang ada di pikiranmu.`,
      tabShortcut: null,
      actionTable: [
        { tabId: 'ide', name: 'Ruang Ide', desc: 'Tulis dan susun rencana gagasan' },
        { tabId: 'humas', name: 'Humas & Sosmed', desc: 'Cek agenda & kegiatan yayasan' }
      ]
    };
  }

  // C. Pengecekan Presensi Siswa & Prosentase Kehadiran (Tanggap Bahasa Santai)
  function handleKehadiranVoice(rawText) {
    const text = rawText.toLowerCase();
    const jurnalData = getJurnalData();

    // Deteksi kelas dari pertanyaan
    let targetClass = '7A';
    const mClass = text.match(/\b(7a|7b|7c|7d|8a|8b|8c|8d|1ulaa|1ulab)\b/i) || text.match(/(?:kelas|kls|anak)\s*([0-9]+[a-z]?)/i);
    if (mClass) {
      targetClass = (mClass[1] || mClass[0]).toUpperCase();
      if (targetClass === '1ULAA') targetClass = '1UlaA';
      if (targetClass === '1ULAB') targetClass = '1UlaB';
    }

    const classData = (jurnalData && jurnalData.classes && jurnalData.classes[targetClass]) ? jurnalData.classes[targetClass] : null;

    let students = [];
    let presensiMap = {};

    if (classData && classData.students) {
      students = classData.students;
      const s1 = (classData.sessions && classData.sessions[1]) ? classData.sessions[1] : null;
      if (s1 && s1.presensi) {
        presensiMap = s1.presensi;
      }
    } else {
      // Fallback roster resmi 28 santri
      students = [
        { name: 'Achmad Alfan' }, { name: 'Ahmad Daniyal' }, { name: 'Alifian Bagas' },
        { name: 'Anggun Zahra' }, { name: 'Anisa Rahmawati' }, { name: 'Arga Pratama' },
        { name: 'Aulia Nur Fatimah' }, { name: 'Bagas Aditya' }, { name: 'Bintang Ramadhani' },
        { name: 'Cinta Laura' }, { name: 'Daffa Maulana' }, { name: 'Dina Kartika' },
        { name: 'Faris Ihsan' }, { name: 'Fatir Alfarizi' }, { name: 'Gita Permata' },
        { name: 'Hafizh Shiddiq' }, { name: 'Ilham Wahyudi' }, { name: 'Intan Permatasari' },
        { name: 'Kevin Ardiansyah' }, { name: 'Laila Nafisah' }, { name: 'M. Naufal Azzam' },
        { name: 'M. Rayhan Saputra' }, { name: 'Nadia Syahrini' }, { name: 'Rizky Febrian' },
        { name: 'Salwa Salsabila' }, { name: 'Syifa Fauziah' }, { name: 'Tegar Wibowo' }, { name: 'Zahra Amelia' }
      ];
    }

    const totalStudents = students.length || 28;
    const sakitList = [];
    const izinList = [];
    const alpaList = [];
    let hadirCount = 0;

    students.forEach((st) => {
      const status = presensiMap[st.name] || 'H';
      if (status === 'H') hadirCount++;
      else if (status === 'S') sakitList.push(st.name);
      else if (status === 'I') izinList.push(st.name);
      else if (status === 'A') alpaList.push(st.name);
      else hadirCount++;
    });

    const tidakHadirCount = sakitList.length + izinList.length + alpaList.length;
    const pctHadir = ((hadirCount / totalStudents) * 100).toFixed(1);

    let statusRincian = '';
    if (tidakHadirCount === 0) {
      statusRincian = `✨ **Alhamdulillah, Seluruh Siswa Hadir Lengkap (100%)!**\nTidak ada santri yang sakit, izin, maupun alpa pada sesi ini.`;
    } else {
      statusRincian = `**Rincian Siswa Tidak Hadir (${tidakHadirCount} santri):**\n` +
        `• 🤒 **Sakit (S)**: ${sakitList.length > 0 ? sakitList.join(', ') : 'Nihil'}\n` +
        `• 📝 **Izin (I)**: ${izinList.length > 0 ? izinList.join(', ') : 'Nihil'}\n` +
        `• ⚠️ **Alpa (A)**: ${alpaList.length > 0 ? alpaList.join(', ') : 'Nihil'}`;
    }

    const chatReply = `📊 **Laporan Presensi Siswa — Kelas ${targetClass}:**\n\n` +
      `• **Total Siswa Terdaftar**: **${totalStudents} santri**\n` +
      `• **Jumlah Hadir**: **${hadirCount} santri**\n` +
      `• **Prosentase Kehadiran**: **${pctHadir}%**\n\n` +
      `${statusRincian}\n\n` +
      `Data presensi ini otomatis terintegrasi pada modul **Jurnal Guru** dan diperhitungkan ke nilai keaktifan STS/SAS.`;

    const voiceSummary = tidakHadirCount === 0
      ? `Prosentase kehadiran siswa kelas ${targetClass} adalah 100 persen. Seluruh siswa hadir lengkap.`
      : `Prosentase kehadiran kelas ${targetClass} adalah ${pctHadir} persen. Ada ${tidakHadirCount} siswa tidak hadir.`;

    return {
      type: 'kehadiran',
      text: chatReply,
      voiceText: voiceSummary,
      tabShortcut: 'jurnal'
    };
  }

  // D. Pengecekan Status Jurnal Mengajar
  function handleCekJurnalStatusVoice(rawText) {
    const jurnalData = getJurnalData();
    let totalClasses = 10;

    if (jurnalData && jurnalData.classes) {
      totalClasses = Object.keys(jurnalData.classes).length;
    }

    const chatReply = `📖 **Status Jurnal Mengajar Guru:**\n\n` +
      `• **Kelas Diampu**: ${totalClasses} Kelas (MTs 7A-7D, 8A-8D, dan Madin 1 Ula A-B)\n` +
      `• **Mata Pelajaran**: Prakarya (Kode 33) & Kitab Safinatun Najah\n` +
      `• **Progres Silabus**: Kurikulum KBC (Karakter Berbasis Cinta) & Adiwiyata aktif\n` +
      `• **Status Administrasi**: Format STS, SAS, dan Jurnal Harian siap ekspor/cetak\n\n` +
      `Silakan buka tab **Jurnal Guru** untuk mencatat keterlaksanaan materi hari ini.`;

    const voiceSummary = `Jurnal mengajar Anda aktif untuk ${totalClasses} kelas. Format keterlaksanaan materi dan presensi siap digunakan.`;

    return {
      type: 'jurnal_status',
      text: chatReply,
      voiceText: voiceSummary,
      tabShortcut: 'jurnal'
    };
  }

  // --- 5. INTENT & KNOWLEDGE MATCHING (OFFLINE FAST ENGINE) ---
  function matchLocalKnowledge(userText) {
    const lower = userText.toLowerCase().trim();

    // 0. INTENT PRIORITAS: Tabel Pintasan Navigasi Seluruh 16 Modul
    if (/(?:tabel|menu|pintasan|daftar modul|semua modul|matriks|navigasi|jalan pintas|shortcut)/i.test(lower)) {
      return handleShowAllModulesTable();
    }

    // 0B. INTENT PRIORITAS: Pengecekan Jadwal Lanjutan (Sadar Konteks "Kalau nanti ada dikelas apa")
    if (
      (chatContext.lastTopic === 'jadwal' && /(?:kalau nanti|nanti|ada dikelas|kelas apa|setelah ini|setelah itu|habis itu|selanjutnya|jam berikutnya|sesi berikutnya)/i.test(lower)) ||
      /(?:kalau nanti ada dikelas apa|nanti ngajar di mana|nanti kelas apa|sesi berikutnya kelas apa|jam mengajar berikutnya)/i.test(lower)
    ) {
      return handleJadwalLanjutan(userText);
    }

    // 0C. INTENT PRIORITAS: Kalender Tahunan Yayasan, Radar H-7 & Agenda Resmi YTPAI 2026-2027
    if (
      /(?:kalender|agenda|prota|program tahunan|jadwal tahunan|radar h-?7|hari santri|sumpah pemuda|hari pahlawan|hari guru|kegiatan yayasan|acara yayasan|kapan ujian|kapan tasmi|kapan ppdb|kapan libur|bulan (?:januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember))/i.test(lower)
    ) {
      return handleKalenderTahunanHumas(userText);
    }

    // 0D. INTENT PRIORITAS: Ruang Curhat & Diskusi Pemikiran (Sharing Hangat & Sahabat Bijak)
    if (
      /(?:mau sharing|sharing dong|sharing yuk|curhat|mau curhat|cerita dong|lagi sedih|lagi galau|lagi bingung|capek|lelah|pusing|beban|stres|stress|overthinking|marah|kesal|jengkel|sakit hati|tersinggung|minder|insecure|gak pede|kurang percaya diri|takut gagal|rekan kerja|suasana kerja)/i.test(lower)
    ) {
      return handleSharingCurhat(userText);
    }

    // 1. VOICE INTENT A: Generator Tagihan BRIVA (Fleksibel & Tanggap Bahasa Santai)
    if (
      /(?:buatkan|buat|bikin|bikinin|buatin|generate|input|tagihkan|tagihin|tagih)\s+(?:tagihan|briva|spp|syahriyah|dsp|biaya)/i.test(lower) ||
      /(?:tagihan|briva|spp|syahriyah|dsp)\s+(?:untuk|buat|si|siswa|santri|anak)/i.test(lower) ||
      /(?:tagihkan|tagihin)\s+[a-z]/i.test(lower) ||
      /(?:buat|bikin|bikinin)\s+briva/i.test(lower)
    ) {
      return handleGenerateTagihanVoice(userText);
    }

    // 2. VOICE INTENT B: Cek Siswa Tidak Hadir & Prosentase Kehadiran (Fleksibel & Tanggap Bahasa Santai)
    if (
      /(?:siapa\s*(?:aja\s*)?(?:yang\s*)?(?:tidak hadir|gak masuk|nggak masuk|enggak masuk|absen|sakit|alfa|izin|bolos))/i.test(lower) ||
      /(?:anak|siswa|santri|bocah)\s*(?:yang\s*)?(?:tidak hadir|gak masuk|nggak masuk|bolos|absen)/i.test(lower) ||
      /(?:pada\s+masuk\s+(?:gak|nggak|semua)|ada\s+yang\s+(?:gak masuk|bolos|absen))/i.test(lower) ||
      /(?:prosentase|persentase|tingkat|berapa\s+persen)\s*(?:yang\s*)?(?:kehadiran|hadir|masuk)/i.test(lower) ||
      /(?:presensi|kehadiran|absen)\s*(?:siswa|santri|kelas|anak)/i.test(lower)
    ) {
      return handleKehadiranVoice(userText);
    }

    // 3. VOICE INTENT C: Cek Jadwal Mengajar (Fleksibel & Tanggap Bahasa Santai)
    if (
      /(?:jadwal|jadwalku)/i.test(lower) ||
      /(?:jam\s+(?:ngajar|mengajar|masuk)|masuk\s+jam\s+berapa)/i.test(lower) ||
      /(?:ada\s+(?:jam\s+ngajar|kelas|jadwal)\s*(?:gak|nggak|hari ini|besok|sekarang)?)/i.test(lower) ||
      /(?:ngajar\s+(?:apa|kelas\s+apa|kapan|jam\s+berapa))/i.test(lower)
    ) {
      return handleCekJadwalVoice(userText);
    }

    // 4. VOICE INTENT D: Cek Jurnal Guru
    if (/\b(?:jurnal|status jurnal|buku jurnal|jurnal mengajar|isi jurnal)\b/i.test(lower)) {
      return handleCekJurnalStatusVoice(userText);
    }

    // 5. INTENT E: Pilar Kedewasaan Berpikir & Menata Jiwa (FATHIYA WISDOM VAULT)
    for (const item of FATHIYA_WISDOM_VAULT) {
      for (const trig of item.triggers) {
        if (lower.includes(trig)) {
          return {
            type: 'fathiya_wisdom',
            title: item.title,
            quote: item.quote,
            text: `Saya menyimak apa yang sedang Anda rasakan sahabatku. Setiap ujian atau rasa tidak nyaman adalah undangan bagi kita untuk naik kelas dalam kedewasaan.\n\n${item.quote}\n\n**Tuntunan Berpikir & Bertindak Dewasa:**\n${item.actions.join('\n')}\n\nMari kita hadapi bersama dengan kepala dingin, lapang dada, dan langkah bermartabat. Saya siap mendampingi Anda.`,
            voiceText: item.voiceText || 'Mari kita hadapi hal ini dengan tenang dan kepala dingin sahabatku. Fokus pada apa yang berada dalam kendali kita.',
            tabShortcut: lower.includes('warung') || lower.includes('jual') ? 'bisnis' : (lower.includes('ide') ? 'ide' : (lower.includes('jurnal') ? 'jurnal' : null)),
            actionTable: [
              { tabId: 'ide', name: 'Ruang Ide', desc: 'Uraikan gagasan & solusi bijak' },
              { tabId: 'jurnal', name: 'Jurnal Guru', desc: 'Fokus pada capaian amanah KBM' }
            ]
          };
        }
      }
    }

    // 6. Check Tab / Module Queries
    let bestTab = null;
    let maxMatch = 0;

    for (const [key, tab] of Object.entries(FATIH_KNOWLEDGE_BASE.tabs)) {
      let score = 0;
      if (lower.includes(tab.name.toLowerCase())) score += 10;
      if (lower.includes(tab.id)) score += 8;

      for (const kw of tab.keywords) {
        if (lower.includes(kw.toLowerCase())) {
          score += 5;
        }
      }

      if (score > maxMatch) {
        maxMatch = score;
        bestTab = tab;
      }
    }

    if (bestTab && maxMatch >= 5) {
      const guideText = bestTab.guide ? bestTab.guide.join('\n') : '';
      return {
        type: 'tab_guide',
        tabId: bestTab.id,
        tabName: bestTab.name,
        category: bestTab.category,
        text: `Tentu, dengan senang hati. Mengenai fitur **${bestTab.name}** (${bestTab.category}):\n\n${bestTab.desc}\n\n**Panduan Langkah Efisien:**\n${guideText}\n\nSilakan ketuk tombol pada tabel di bawah untuk langsung membuka modul ini sahabatku 🌸`,
        voiceText: `Fitur ${bestTab.name} siap digunakan sahabatku. Anda bisa membukanya melalui tombol di bawah.`,
        tabShortcut: bestTab.id,
        actionTable: [
          { tabId: bestTab.id, name: bestTab.name, desc: bestTab.summary || bestTab.desc },
          { tabId: 'briva', name: 'Generator BRIVA', desc: 'Layanan tagihan resmi Bank BRI' }
        ]
      };
    }

    // 7. Salam & Sapaan Sopan Santun (Hangat, Akrab & Berkarakter)
    if (/^(halo|hai|assalamu|pagi|siang|sore|malam|tes|test|fathiya|woi|hei)\b/i.test(lower) || lower === 'halo' || lower === 'hai') {
      const greetings = [
        {
          text: `Halo sahabatku! 🌿 Senang sekali mendengarmu. Ada Fathiya di sini yang siap menemani.\n\nBagaimana perasaan dan pikiranmu hari ini? Sedang terasa lapang dan bersemangat, atau ada hal yang perlu kita uraikan bersama dengan tenang dan kepala dingin?`,
          voice: `Halo sahabatku! Senang sekali mendengarmu. Ada yang ingin kita bicarakan atau kerjakan bersama hari ini?`
        },
        {
          text: `Wa'alaikumussalam warahmatullah, halo sahabatku! 🌸\n\nAlhamdulillah kita bisa berjumpa lagi. Fathiya siap jadi kawan berpikir yang teduh untukmu, atau langsung membantu tugas operasional yayasan seperti tagihan BRIVA, jadwal KBM, dan absensi santri. Ada yang bisa Fathiya bantu sekarang?`,
          voice: `Halo sahabatku! Fathiya siap menemani dengan ketenangan dan kejernihan berpikir. Apa yang bisa kubantu sekarang?`
        }
      ];
      const pick = greetings[Math.floor(Math.random() * greetings.length)];
      return {
        type: 'greeting',
        text: pick.text,
        voiceText: pick.voice,
        tabShortcut: null
      };
    }

    // 7B. INTENT KHUSUS: Karakter & Pengenalan Diri Fathiya
    if (/(?:siapa\s+(?:kamu|anda|dirimu)|kamu\s+siapa|kenalan|ceritakan\s+tentang\s+kamu|karakter(?:mu)?|tentang\s+fathiya|sifatmu)/i.test(lower)) {
      return {
        type: 'fathiya_persona',
        text: `Assalamu'alaikum sahabatku 🌸 Nama saya **Fathiya**.\n\nSaya hadir di sini bukan sebagai bot yang kaku, melainkan sebagai sosok sahabat dan rekan berpikir yang teduh bagi Anda.\n\n**Tentang Pribadi & Karakter Fathiya:**\n• 🕊️ **Menjaga Ketenangan (*The Power of Pause*)**: Saat pikiran sedang penuh atau situasi terasa menekan, saya mengajak kita bernapas dan memberi jeda sebelum merespons.\n• 💎 **Kedewasaan & Tanggung Jawab (*Radical Ownership*)**: Kita fokus pada hal-hal baik yang berada dalam kendali diri kita sendiri tanpa larut mengeluh.\n• ⚡ **Tangkas & Terampil**: Saya siap membantu Anda menuntaskan tugas di Partner Fatih—mulai dari tagihan massal BRIVA, mutasi Junio Smart, jadwal KBM guru, hingga absensi santri.\n\nJangan sungkan untuk berbagi cerita atau memberi instruksi kerja pada saya ya.`,
        voiceText: `Assalamu'alaikum sahabatku. Nama saya Fathiya. Saya hadir sebagai rekan berpikir bijak dan asisten pribadi Anda, menemani Anda bertumbuh dewasa dan tenang dalam bersikap.`,
        tabShortcut: null
      };
    }

    // 7C. Pertanyaan Hari, Tanggal, dan Waktu (Realtime Instant)
    if (/(?:hari\s+apa|sekarang\s+hari|hari\s+ini\s+hari|tanggal\s+berapa|sekarang\s+tanggal|jam\s+berapa)/i.test(lower)) {
      const now = new Date();
      const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      const dayName = days[now.getDay()];
      const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
      const timeStr = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')} WIB`;
      
      return {
        type: 'date_time',
        text: `Hari ini adalah **Hari ${dayName}, ${dateStr}** (pukul ${timeStr}) sahabatku 🌿\n\nSemoga harimu dipenuhi ketenangan batin, keberkahan, dan langkah-langkah yang bermartabat. Ada tugas yayasan atau jadwal yang ingin kita cek hari ini?`,
        voiceText: `Hari ini hari ${dayName}, ${dateStr}. Semoga harimu berkah dan menyenangkan sahabatku.`,
        tabShortcut: 'jurnal'
      };
    }

    // 8. Pertanyaan Umum / Reflektif & Membangun Kedewasaan (Hangat, Mengalir, Penuh Empati)
    const reflectiveResponses = [
      {
        text: `Aku mendengarkanmu dengan sungguh-sungguh, sahabatku 🌿\n\nKetika menghadapi situasi seperti ini, respon pertama kita yang paling dewasa adalah **memberi jeda sejenak (the power of pause)**. Tarik napas perlahan dan biarkan hatimu tenang.\n\nOrang dewasa yang matang tidak tergesa-gesa bereaksi impulsif. Yuk, kita tanyakan pada diri sendiri: *"Dari situasi ini, apa satu hal terbaik yang sepenuhnya berada dalam kendali kita untuk diselesaikan secara bermartabat?"*\n\nJika ini berkaitan dengan pekerjaan sekolah atau yayasan, Fathiya siap mendampingi langkahmu. Ceritakan saja lebih lanjut ya.`,
        voiceText: `Aku mendengarkanmu sahabatku. Mari kita beri jeda sejenak, tenangkan pikiran, dan fokus pada hal terbaik yang berada dalam kendali kita.`
      },
      {
        text: `Terima kasih sudah bercerita padaku, sahabatku 🌸\n\nSetiap kali ada hal yang mengganjal di pikiran, ingatlah bahwa ketenangan adalah kekuatan terbesar kita. Kita tidak bisa mengontrol sikap orang lain atau keadaan di luar sana, tapi kita punya kuasa penuh atas cara kita merespon.\n\nPilihlah langkah yang tenang, terukur, dan menjaga harga dirimu. Fathiya ada di sini menemani setiap langkah kedewasaanmu.`,
        voiceText: `Ketenangan adalah kekuatan terbesar kita sahabatku. Fathiya ada di sini menemani langkahmu.`
      }
    ];
    const pickReflect = reflectiveResponses[Math.floor(Math.random() * reflectiveResponses.length)];
    return {
      type: 'general',
      text: pickReflect.text,
      voiceText: pickReflect.voiceText,
      tabShortcut: null
    };
  }

  // --- 6. VOICE TEXT-TO-SPEECH (TTS) ENGINE (FATHIYA FEMALE VOICE) ---
  let cachedVoices = [];
  function populateVoices() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    }
  }

  if (typeof window !== 'undefined' && window.speechSynthesis) {
    populateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = populateVoices;
    }
  }

  function getBestIndonesianFemaleVoice() {
    populateVoices();
    if (!cachedVoices || cachedVoices.length === 0) return null;

    // 1. Prioritas utama: Suara perempuan Indonesia (Gadis, Siti, Damayanti, Putri, Ayu, Google Bahasa Indonesia)
    const idVoices = cachedVoices.filter(v => v.lang && (v.lang.startsWith('id') || v.lang.includes('ID') || v.lang.toLowerCase().includes('indonesia')));
    
    // Cari yang bernama spesifik perempuan
    const namedFemale = idVoices.find(v => /gadis|siti|damayanti|putri|ayu|female|wanita|perempuan/i.test(v.name));
    if (namedFemale) return namedFemale;

    // Cari Google Bahasa Indonesia (pada Chrome ini bersuara wanita)
    const googleId = idVoices.find(v => /google/i.test(v.name));
    if (googleId) return googleId;

    // Ambil suara id-ID pertama
    if (idVoices.length > 0) return idVoices[0];

    // Fallback suara wanita global jika tidak ada suara id-ID
    const anyFemale = cachedVoices.find(v => /female|wanita|woman|zira|jenny|aria/i.test(v.name));
    return anyFemale || null;
  }

  function speakFatihResponse(textToSpeak) {
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const clean = textToSpeak
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/#{1,6}\s+/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[•●&bull;|&amp;]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/([0-9]+)\.([0-9]+)/g, '$1 koma $2')
        .replace(/\n+/g, '. ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(clean.substring(0, 380));
      utterance.lang = 'id-ID';

      const voice = getBestIndonesianFemaleVoice();
      if (voice) {
        utterance.voice = voice;
      }

      // Pitch 1.30 dan rate 0.98 menghasilkan timbre vokal perempuan yang jernih, teduh, dan anggun
      utterance.pitch = 1.30;
      utterance.rate = 0.98;

      window.speechSynthesis.speak(utterance);
    } catch(e) {
      console.warn('TTS error:', e);
    }
  }

  window.speakFatihHistory = function(idx) {
    const msg = chatHistory[idx];
    if (msg && msg.text) {
      speakFatihResponse(msg.voiceText || msg.text);
    }
  };

  // State auto-voice aktif secara default (pengguna dapat mematikan lewat tombol speaker di header)
  let isAutoVoiceEnabled = localStorage.getItem('fatih_auto_voice') !== 'false';

  function toggleFatihAutoVoice() {
    isAutoVoiceEnabled = !isAutoVoiceEnabled;
    localStorage.setItem('fatih_auto_voice', isAutoVoiceEnabled ? 'true' : 'false');
    const btn = document.getElementById('fatihVoiceAutoToggle');
    if (btn) {
      if (isAutoVoiceEnabled) {
        btn.innerHTML = '<i data-lucide="volume-2" class="w-3.5 h-3.5 text-emerald-400"></i>';
        btn.title = 'Suara Perempuan Aktif (Klik untuk Mute)';
        btn.classList.add('text-emerald-400');
        btn.classList.remove('text-slate-400');
        speakFatihResponse('Suara saya aktif sahabatku. Saya siap berdialog.');
        if (typeof window.showToast === 'function') {
          window.showToast('🔊 Suara Perempuan Aktif', 'Fathiya akan membacakan jawaban otomatis.', 'info');
        }
      } else {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        btn.innerHTML = '<i data-lucide="volume-x" class="w-3.5 h-3.5 text-slate-400"></i>';
        btn.title = 'Suara Dimatikan (Klik untuk Aktifkan)';
        btn.classList.remove('text-emerald-400');
        btn.classList.add('text-slate-400');
        if (typeof window.showToast === 'function') {
          window.showToast('🔇 Suara Dimatikan', 'Jawaban berupa teks hening.', 'info');
        }
      }
      if (typeof window.safeCreateIcons === 'function') window.safeCreateIcons(btn);
    }
  }

  // --- 5. GEMINI API CLIENT (ONLINE DEEP INTELLIGENCE - DEFAULT GEMINI-FLASH-LATEST) ---
  const DEFAULT_GEMINI_KEY = 'AIzaSyDoFLn1xlteK1D8lb9NxP_pPjswZ3VlmwY';

  // Pastikan kunci tersimpan default di browser
  try {
    if (!localStorage.getItem('partner_fatih_gemini_key')) {
      localStorage.setItem('partner_fatih_gemini_key', DEFAULT_GEMINI_KEY);
    }
  } catch(e) {}

  async function callGeminiApi(prompt, apiKey) {
    const keyToUse = apiKey || localStorage.getItem('partner_fatih_gemini_key') || DEFAULT_GEMINI_KEY;
    const now = new Date();
    const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const timeInfo = `Hari ${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} pukul ${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const systemInstruction = `Kamu adalah "Fathiya" — sosok wanita muslimah muda, berhati teduh, bijak, hangat, rekan berpikir dewasa, dan asisten eksekutif pribadi di aplikasi "Partner Fatih" (Yayasan YTPAI).

KARAKTER & SUARA FATHIYA:
1. PRIBADI HANGAT & MENYEJUKKAN:
   - Bersikap santun, tulus, dan penuh empati layaknya seorang kakak perempuan atau sahabat karib yang dewasa. Panggil pengguna dengan sebutan hangat seperti "Sahabatku".
   - Di kala pengguna emosi, lelah, atau bimbang: hadirkan ketenangan (the power of pause), arahkan pikiran untuk fokus pada hal yang bisa dikendalikan (radical ownership), dan ajak mengambil respon bermartabat tanpa drama.
2. TANGKAS & PROFESIONAL:
   - Menguasai seluruh modul Partner Fatih: tagihan BRIVA Bank BRI, mutasi Junio Smart, KBM guru, presensi santri, dan titip jual warung.
3. ATURAN GAYA BERTUTUR:
   - Waktu saat ini: ${timeInfo}.
   - Bertuturlah secara alami, mengalir, lembut, dan manusiawi.
   - DILARANG menggunakan format poin-poin kaku seperti robot, SOP, atau HRD.
   - Jawab ringkas dan padat (maksimal 2 paragraf) agar respon cepat dan nyaman didengar.`;

    const body = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\nPertanyaan/Curhat Pengguna:\n${prompt}` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 250
      }
    };

    // Urutan model resmi aktif: gemini-flash-latest, lalu fallback ke gemini-3.8-flash
    const modelsToTry = ['gemini-flash-latest', 'gemini-3.8-flash'];
    let lastErr = null;

    for (const modelName of modelsToTry) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout ketat agar tidak menggantung

      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${keyToUse}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return reply;
        } else {
          lastErr = new Error(`API ${modelName} Error: ${res.status}`);
        }
      } catch(err) {
        clearTimeout(timeoutId);
        lastErr = err;
      }
    }

    throw lastErr || new Error('Gagal memanggil Gemini API');
  }

  // --- 6. UI BUILDER & INJECTION (SLEEK, COMPACT & CLEAN CHAT SHEET) ---
  function injectChatUI() {
    if (document.getElementById('modalFatihChat')) return;

    // Chat Modal / Sliding Bottom Sheet (Compact, Clean & Anti-Bulky)
    const modal = document.createElement('div');
    modal.id = 'modalFatihChat';
    modal.className = 'modal-portal fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-5 bg-slate-950/70 backdrop-blur-xs transition-all duration-300 opacity-0 pointer-events-none';
    modal.style.display = 'none';

    modal.innerHTML = `
      <div class="relative w-full sm:w-[360px] max-w-full h-[60vh] sm:h-[460px] max-h-[75vh] bg-[#090d16] border border-white/15 rounded-t-xl sm:rounded-xl shadow-2xl flex flex-col overflow-hidden text-slate-100 transition-transform duration-300 transform translate-y-6 sm:translate-y-0">
        
        <!-- Clean Accent Top Bar (Emerald to Teal & Soft Rose Gold) -->
        <div class="h-[2px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 flex-shrink-0"></div>

        <!-- Pull Drag Handle on Mobile -->
        <div class="w-10 h-1 rounded-full bg-white/20 mx-auto mt-1.5 sm:hidden flex-shrink-0"></div>

        <!-- Header Chat (Compact, Elegant & Clean) -->
        <div class="p-1.5 sm:p-2 px-2.5 bg-[#0c121e] text-white flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div class="flex items-center gap-2 min-w-0">
            <!-- Micro Avatar Wanita Berhijab Realistis -->
            <div class="relative flex-shrink-0" style="width:28px;height:28px;">
              ${renderFathiyaAvatarImg(28)}
              <span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#0c121e]"></span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1">
                <h3 class="font-bold text-[11px] text-white tracking-tight truncate leading-tight">Fathiya AI</h3>
                <span class="text-[7px] font-black px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 leading-none">BIJAK</span>
              </div>
              <p class="text-[8.5px] text-slate-400 flex items-center gap-1 font-medium truncate leading-tight">
                <span class="text-emerald-400">● Online</span> &bull; <span>Teduh &amp; Dewasa</span>
              </p>
            </div>
          </div>

          <!-- Micro Action Buttons -->
          <div class="flex items-center gap-0.5 flex-shrink-0">
            <button type="button" id="fatihVoiceAutoToggle" onclick="window.toggleFatihAutoVoice()" class="w-6 h-6 rounded flex items-center justify-center text-emerald-400 hover:bg-white/10 transition-all cursor-pointer" title="Auto Suara Aktif (Klik untuk mute/unmute)">
              <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
            </button>
            <button type="button" onclick="window.openFatihAiSettings()" class="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer" title="Pengaturan AI (Gemini API)">
              <i data-lucide="settings" class="w-3.5 h-3.5"></i>
            </button>
            <button type="button" onclick="window.clearFatihChatHistory()" class="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-all cursor-pointer" title="Bersihkan Obrolan">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
            <button type="button" onclick="window.closeFatihChat()" class="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer" title="Tutup">
              <i data-lucide="x" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <!-- Chat Scroll Area -->
        <div id="fatihChatScrollArea" class="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-2 bg-gradient-to-b from-[#080c14] to-[#060911] no-scrollbar">
          
          <!-- Concierge Welcome Card (Inspiring, Calming & Siap Konteks) -->
          <div class="p-2.5 rounded-lg bg-slate-900/90 border border-emerald-500/30 text-slate-200 space-y-2 shadow-xs">
            <div class="flex items-center justify-between">
              <span class="text-[9.5px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Rekan Berpikir Bijak &amp; Co-Pilot
              </span>
              <span id="fatihActiveContextBadge" class="text-[8.5px] font-mono text-emerald-400/90 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">● Siap Mendampingi</span>
            </div>
            <div class="flex items-center gap-2.5">
              <div class="flex-shrink-0" style="width: 40px; height: 40px;">
                ${renderFathiyaAvatarImg(40)}
              </div>
              <p class="text-[10.5px] text-slate-300 leading-snug">
                Assalamu'alaikum. Saya <b>Fathiya</b>, rekan berpikir Anda. Saya siap mendengarkan cerita &amp; curhat pikiran Anda, membimbing kedewasaan bersikap, serta mengoperasikan seluruh 16 modul Partner Fatih &amp; Kalender Tahunan.
              </p>
            </div>
          </div>

          <!-- Quick Suggestions (Voice-Ready Prompts Grid 2x2 Compact) -->
          <div id="fatihChatSuggestions" class="grid grid-cols-2 gap-1.5">
            <button type="button" onclick="window.sendFatihQuickPrompt('Mau sharing dong Fathiya, pikiran lagi penuh')" class="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-teal-500/30 text-left transition-all cursor-pointer active:scale-98">
              <div class="text-[10px] font-bold text-teal-200 flex items-center gap-1">🌿 Mau Sharing</div>
              <div class="text-[8.5px] text-slate-400 truncate">Curhat &amp; diskusi pikiran</div>
            </button>
            <button type="button" onclick="window.sendFatihQuickPrompt('Tampilkan tabel pintasan seluruh 16 modul')" class="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-emerald-500/30 text-left transition-all cursor-pointer active:scale-98">
              <div class="text-[10px] font-bold text-emerald-200 flex items-center gap-1">🧭 Tabel 16 Modul</div>
              <div class="text-[8.5px] text-slate-400 truncate">Navigasi cepat 1-klik</div>
            </button>
            <button type="button" onclick="window.sendFatihQuickPrompt('Agenda kalender tahunan yayasan')" class="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-amber-500/30 text-left transition-all cursor-pointer active:scale-98">
              <div class="text-[10px] font-bold text-amber-200 flex items-center gap-1">📅 Kalender Tahunan</div>
              <div class="text-[8.5px] text-slate-400 truncate">252 agenda &amp; PHBN/PHBI</div>
            </button>
            <button type="button" onclick="window.sendFatihQuickPrompt('Cek jadwal mengajar hari ini')" class="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-indigo-500/30 text-left transition-all cursor-pointer active:scale-98">
              <div class="text-[10px] font-bold text-indigo-200 flex items-center gap-1">📖 Jadwal Mengajar</div>
              <div class="text-[8.5px] text-slate-400 truncate">Jam, kelas &amp; mapel</div>
            </button>
          </div>

          <!-- History Container -->
          <div id="fatihChatMessagesList" class="space-y-2.5 pt-0.5"></div>

          <!-- Typing Indicator -->
          <div id="fatihChatTyping" class="hidden flex items-start gap-2">
            <div class="flex-shrink-0" style="width: 24px; height: 24px;">
              ${renderFathiyaAvatarImg(24)}
            </div>
            <div class="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-slate-300 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
              <span class="text-[9.5px] ml-1 font-bold text-emerald-300">Fathiya sedang menelaah...</span>
            </div>
          </div>

        </div>

        <!-- Footer Input Bar (Compact & Sleek) -->
        <div class="p-2 px-2.5 bg-[#0a0e1a] border-t border-white/10 flex-shrink-0">
          <form id="fatihChatForm" onsubmit="window.handleFatihChatSubmit(event)" class="bg-white/[0.04] border border-white/10 focus-within:border-emerald-400/70 rounded-lg p-0.5 px-1 flex items-center gap-1 transition-all">
            <button 
              type="button" 
              id="fatihChatVoiceBtn" 
              onclick="window.toggleFatihVoiceRecognition()" 
              class="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all flex-shrink-0 cursor-pointer"
              title="Bicara lewat suara (Mic)"
            >
              <i data-lucide="mic" class="w-3.5 h-3.5"></i>
            </button>

            <input 
              type="text" 
              id="fatihChatInput" 
              placeholder="Diskusikan pemikiran atau beri instruksi kerja..." 
              autocomplete="off"
              class="flex-1 min-w-0 h-7 bg-transparent border-0 px-1.5 text-[11px] text-white placeholder-slate-500 focus:outline-none transition-all font-medium"
            />

            <button 
              type="submit" 
              id="fatihChatSendBtn" 
              class="w-7 h-7 rounded-md flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black transition-all flex-shrink-0 cursor-pointer"
              title="Kirim pesan"
            >
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
            </button>
          </form>
          <div class="flex items-center justify-between text-[8.5px] text-slate-500 px-1 pt-1 font-medium">
            <span id="fatihChatEngineMode">● Asisten Suara &amp; Refleksi</span>
            <span>Mic aktif berbahasa Indonesia</span>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    // Render initial history if exists
    renderChatMessages();

    // Re-create icons inside chat modal
    if (typeof window.safeCreateIcons === 'function') {
      window.safeCreateIcons();
    }
  }

  // --- 7. MODAL DISPLAY CONTROLS ---
  function openFatihChat() {
    let modal = document.getElementById('modalFatihChat');
    if (!modal) {
      injectChatUI();
      modal = document.getElementById('modalFatihChat');
    }
    if (!modal) return;

    // Pastikan modal berada langsung di document.body agar tidak tertutup container lain
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    // Deteksi tab aktif aplikasi & update status siap
    try {
      const activeTab = detectActiveAppTab();
      const tabMeta = FATIH_KNOWLEDGE_BASE.tabs[activeTab];
      const badge = document.getElementById('fatihActiveContextBadge');
      if (badge) {
        badge.textContent = tabMeta ? `● Siap di Tab: ${tabMeta.name}` : `● Siap Mendampingi`;
      }
    } catch(e) {}

    // Buka modal secara pasti
    modal.style.display = 'flex';
    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');

    // Hanya fokuskan input pada layar besar (desktop) untuk mencegah virtual keyboard mobile menekan layar
    if (window.innerWidth >= 640) {
      setTimeout(() => {
        const input = document.getElementById('fatihChatInput');
        if (input) input.focus();
      }, 100);
    }

    scrollChatToBottom();
  }

  function closeFatihChat() {
    const modal = document.getElementById('modalFatihChat');
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 280);
  }

  function scrollChatToBottom() {
    const area = document.getElementById('fatihChatScrollArea');
    if (area) {
      setTimeout(() => {
        area.scrollTop = area.scrollHeight;
      }, 50);
    }
  }

  // --- 8. MESSAGE RENDERING & ACTION SHORTCUTS (CLEAN & COMPACT) ---
  function renderChatMessages() {
    const container = document.getElementById('fatihChatMessagesList');
    if (!container) return;

    container.innerHTML = '';

    chatHistory.forEach((msg, idx) => {
      const isUser = msg.sender === 'user';
      const row = document.createElement('div');
      row.className = isUser ? 'flex justify-end' : 'flex items-start gap-2';

      if (isUser) {
        row.innerHTML = `
          <div class="max-w-[85%] bg-emerald-700 text-white rounded-lg rounded-tr-xs p-2 px-2.5 text-[11px] shadow-xs leading-relaxed break-words font-medium">
            ${escapeHtml(msg.text)}
          </div>
        `;
      } else {
        // Fatih Response Bubble with Action Shortcut if any
        let actionBtnHtml = '';
        if (msg.tabShortcut && typeof window.switchTab === 'function') {
          const tabMeta = FATIH_KNOWLEDGE_BASE.tabs[msg.tabShortcut];
          const tabLabel = tabMeta ? tabMeta.name : 'Modul Terkait';
          actionBtnHtml = `
            <div class="pt-1.5 flex items-center gap-1.5">
              <button type="button" onclick="window.switchTab('${msg.tabShortcut}'); window.closeFatihChat();" class="flex-1 py-1 px-2.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-[10px] flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-98 cursor-pointer">
                <i data-lucide="arrow-right" class="w-3 h-3"></i>
                <span>Buka ${tabLabel}</span>
              </button>
            </div>
          `;
        }

        // Fast Action Table if present
        let tableHtml = '';
        if (msg.actionTable && Array.isArray(msg.actionTable) && msg.actionTable.length > 0) {
          tableHtml = renderActionTableHtml(msg.actionTable);
        }

        row.innerHTML = `
          <div class="flex-shrink-0 mt-0.5" style="width:24px;height:24px;">
            ${renderFathiyaAvatarImg(24)}
          </div>
          <div class="max-w-[85%] bg-slate-900 border border-white/10 rounded-lg rounded-tl-xs p-2 px-2.5 text-[11px] text-slate-100 shadow-2xs leading-relaxed space-y-1.5 break-words">
            <div class="flex items-center justify-between pb-1 border-b border-white/5 text-[9px] text-slate-400">
              <span class="font-bold text-emerald-300 flex items-center gap-1">
                <span>Fathiya AI</span>
                <span class="text-[7.5px] font-normal text-emerald-400/80">● Sahabat</span>
              </span>
              <button type="button" onclick="window.speakFatihHistory(${idx})" class="hover:text-emerald-300 p-0.5 rounded cursor-pointer transition-colors flex items-center gap-1 text-[9px]" title="Dengarkan Suara">
                <i data-lucide="volume-2" class="w-3 h-3 text-emerald-400"></i>
                <span>Suara</span>
              </button>
            </div>
            <div>${formatMessageMarkdown(msg.text)}</div>
            ${actionBtnHtml}
            ${tableHtml}
          </div>
        `;
      }

      container.appendChild(row);
    });

    if (typeof window.safeCreateIcons === 'function') {
      window.safeCreateIcons(container);
    }

    scrollChatToBottom();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function formatMessageMarkdown(str) {
    if (!str) return '';
    let formatted = escapeHtml(str);
    // Bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    // Italic
    formatted = formatted.replace(/\*(.*?)\*/g, '<i>$1</i>');
    // Code blocks / inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-[10px] text-emerald-300">$1</code>');
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br/>');
    return formatted;
  }

  // --- 9. MESSAGE DISPATCH ENGINE ---
  async function handleFatihChatSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (isThinking) return;

    const input = document.getElementById('fatihChatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';

    // Append User Message
    chatHistory.push({ sender: 'user', text: text, time: Date.now() });
    renderChatMessages();

    // Show Typing Indicator
    const typing = document.getElementById('fatihChatTyping');
    if (typing) typing.classList.remove('hidden');
    isThinking = true;
    scrollChatToBottom();

    const isFromVoice = lastPromptWasVoice;
    lastPromptWasVoice = false;

    // Check if Gemini API Key is configured
    const geminiKey = localStorage.getItem('partner_fatih_gemini_key') || '';

    try {
      let replyText = '';
      let replyVoiceText = '';
      let tabShortcut = null;

      // Evaluasi kecocokan respon lokal terlebih dahulu
      const localMatch = matchLocalKnowledge(text);

      // Jika ada kecocokan spesifik (salam, waktu/tanggal, perintah tagihan, jadwal, absensi, atau wisdom):
      // Langsung balas secara INSTAN (80ms) tanpa menunggu latency API cloud
      if (localMatch.type !== 'general') {
        const engineLabel = document.getElementById('fatihChatEngineMode');
        if (engineLabel) engineLabel.textContent = 'Fathiya Realtime';

        await new Promise(r => setTimeout(r, 80)); // Ritme cepat natural
        replyText = localMatch.text;
        replyVoiceText = localMatch.voiceText || localMatch.text;
        tabShortcut = localMatch.tabShortcut;
      } else if (geminiKey && geminiKey.length > 10) {
        // Gunakan Gemini API Online untuk percakapan mendalam dengan timeout ketat 3.5 detik
        const engineLabel = document.getElementById('fatihChatEngineMode');
        if (engineLabel) engineLabel.textContent = 'Gemini AI Online';

        try {
          replyText = await callGeminiApi(text, geminiKey);
          replyVoiceText = replyText;
          // Cek pintasan modul
          for (const [k, tab] of Object.entries(FATIH_KNOWLEDGE_BASE.tabs)) {
            if (replyText.toLowerCase().includes(tab.name.toLowerCase()) || text.toLowerCase().includes(k)) {
              tabShortcut = k;
              break;
            }
          }
        } catch(apiErr) {
          console.warn('[Fatih AI] Gemini fallback ke reflektif:', apiErr);
          replyText = localMatch.text;
          replyVoiceText = localMatch.voiceText || localMatch.text;
          tabShortcut = localMatch.tabShortcut;
        }
      } else {
        // Fallback Reflektif & Kedewasaan Lokal
        const engineLabel = document.getElementById('fatihChatEngineMode');
        if (engineLabel) engineLabel.textContent = 'Fathiya Reflektif';

        await new Promise(r => setTimeout(r, 80));
        replyText = localMatch.text;
        replyVoiceText = localMatch.voiceText || localMatch.text;
        tabShortcut = localMatch.tabShortcut;
      }

      const actionTable = (localMatch && localMatch.actionTable) ? localMatch.actionTable : null;

      chatHistory.push({
        sender: 'fatih',
        text: replyText,
        voiceText: replyVoiceText || replyText,
        tabShortcut: tabShortcut,
        actionTable: actionTable,
        time: Date.now()
      });

      // Simpan konteks multiturn
      chatContext.recentTurns.push({ role: 'user', text: text });
      chatContext.recentTurns.push({ role: 'fatih', text: replyText });
      if (chatContext.recentTurns.length > 10) chatContext.recentTurns = chatContext.recentTurns.slice(-10);

      saveChatHistory();

      // Bacakan jawaban dengan suara perempuan Fathiya (aktif otomatis secara default)
      if ((isAutoVoiceEnabled || isFromVoice) && replyVoiceText) {
        speakFatihResponse(replyVoiceText);
      }
    } catch(err) {
      chatHistory.push({
        sender: 'fatih',
        text: 'Maaf, terjadi kendala saat mengeksekusi instruksi. Silakan ulangi perintah Anda.',
        time: Date.now()
      });
    } finally {
      if (typing) typing.classList.add('hidden');
      isThinking = false;
      renderChatMessages();
    }
  }

  function sendFatihQuickPrompt(promptText) {
    const input = document.getElementById('fatihChatInput');
    if (input) {
      input.value = promptText;
      handleFatihChatSubmit();
    }
  }

  function clearFatihChatHistory() {
    if (confirm('Bersihkan seluruh riwayat obrolan dengan Fathiya?')) {
      chatHistory = [];
      saveChatHistory();
      renderChatMessages();
      if (typeof window.showToast === 'function') {
        window.showToast('🗑️ Riwayat Bersih', 'Obrolan telah dibersihkan.', 'info');
      }
    }
  }

  // --- 10. VOICE MIC SPEECH RECOGNITION ENGINE ---
  function toggleFatihVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Browser Anda belum mendukung input suara Web Speech API. Silakan gunakan Google Chrome.');
      return;
    }

    const micBtn = document.getElementById('fatihChatVoiceBtn');

    if (isListening && speechRecognition) {
      speechRecognition.stop();
      isListening = false;
      if (micBtn) micBtn.classList.remove('bg-rose-500', 'text-white', 'animate-pulse');
      return;
    }

    speechRecognition = new SpeechRecognition();
    speechRecognition.lang = 'id-ID';
    speechRecognition.continuous = false;
    speechRecognition.interimResults = false;

    speechRecognition.onstart = function() {
      isListening = true;
      if (micBtn) micBtn.classList.add('bg-rose-500', 'text-white', 'animate-pulse');
      if (typeof window.showToast === 'function') {
        window.showToast('🎙️ Mendengarkan Suara...', 'Silakan ucapkan pemikiran atau perintah (cth: "Bagaimana bersikap dewasa saat emosi?")', 'info');
      }
    };

    speechRecognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      const input = document.getElementById('fatihChatInput');
      if (input) {
        input.value = transcript;
        lastPromptWasVoice = true;
        handleFatihChatSubmit();
      }
    };

    speechRecognition.onerror = function(err) {
      isListening = false;
      if (micBtn) micBtn.classList.remove('bg-rose-500', 'text-white', 'animate-pulse');
      console.warn('Speech error:', err);
    };

    speechRecognition.onend = function() {
      isListening = false;
      if (micBtn) micBtn.classList.remove('bg-rose-500', 'text-white', 'animate-pulse');
    };

    speechRecognition.start();
  }

  // --- 11. AI SETTINGS MODAL (GEMINI API KEY CONFIG) ---
  function openFatihAiSettings() {
    const currentKey = localStorage.getItem('partner_fatih_gemini_key') || '';
    const newKey = prompt('🔑 Masukkan Google Gemini API Key Anda (Opsional):\n\nJika dikosongkan, Fathiya tetap bekerja 100% menggunakan Mesin Cerdas Reflektif Offline.', currentKey);

    if (newKey !== null) {
      const trimmed = newKey.trim();
      if (trimmed) {
        localStorage.setItem('partner_fatih_gemini_key', trimmed);
        const engineLabel = document.getElementById('fatihChatEngineMode');
        if (engineLabel) engineLabel.textContent = 'Gemini AI Online';
        if (typeof window.showToast === 'function') {
          window.showToast('✅ Gemini API Aktif', 'Fathiya kini dalam Mode Super Cerdas & Reflektif!', 'success');
        }
      } else {
        localStorage.removeItem('partner_fatih_gemini_key');
        const engineLabel = document.getElementById('fatihChatEngineMode');
        if (engineLabel) engineLabel.textContent = 'Offline Knowledge';
        if (typeof window.showToast === 'function') {
          window.showToast('ℹ️ Mode Offline Aktif', 'Kembali ke basis pengetahuan lokal yayasan.', 'info');
        }
      }
    }
  }

  // --- 12. EXPORT GLOBALS ---
  window.openFatihChat = openFatihChat;
  window.closeFatihChat = closeFatihChat;
  window.handleFatihChatSubmit = handleFatihChatSubmit;
  window.sendFatihQuickPrompt = sendFatihQuickPrompt;
  window.clearFatihChatHistory = clearFatihChatHistory;
  window.toggleFatihVoiceRecognition = toggleFatihVoiceRecognition;
  window.toggleFatihAutoVoice = toggleFatihAutoVoice;
  window.openFatihAiSettings = openFatihAiSettings;
  window.matchLocalKnowledge = matchLocalKnowledge;

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChatUI);
  } else {
    injectChatUI();
  }

})(window, document);
