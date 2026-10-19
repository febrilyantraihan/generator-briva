/**
 * ==============================================================================
 * FATHIYA AI - REKAN BERPIKIR BIJAK, CO-PILOT 16 MODUL & MENTOR KEDEWASAAN
 * ==============================================================================
 * Karakter & Nilai:
 * 1. Pendamping Muslimah Anggun, Bijak, Tenang, Matang & Menyejukkan.
 * 2. Membimbing Kedewasaan Berpikir: Pause & Breathe, Radical Ownership, Anti-Impulsif.
 * 3. Menguasai 100% Seluruh 16 Modul Partner Fatih, 252 Agenda Yayasan & 31 Santri Tahfidz.
 * 4. Dual-Engine Cerdas: Offline Natural Engine (Instan 80ms) + Gemini 2.0 Flash AI.
 * 5. Responsif Prima: Desktop Copilot (Expand/Restore) & Mobile Bottom-Sheet (Samsung A55).
 * 6. Sadar Konteks Aktif (Active Tab Awareness) & Multi-turn Conversational Continuity.
 * ==============================================================================
 */

(function(window, document) {
  'use strict';

  // --- 0. AVATAR RESMI FATHIYA (FOTO REALISTIS WANITA MUSLIMAH BERHIJAB ANGGUN & TEDUH) ---
  const FATHIYA_REALISTIC_AVATAR_SRC = 'fathiya_avatar.jpg?v=21';
  const FATHIYA_FALLBACK_AVATAR = 'fathiya_avatar.png?v=21';

  function renderFathiyaAvatarImg(sizePx = 28, extraClasses = '') {
    return `<img src="${FATHIYA_REALISTIC_AVATAR_SRC}" onerror="this.src='${FATHIYA_FALLBACK_AVATAR}'" alt="Fathiya AI" style="width:${sizePx}px;height:${sizePx}px;min-width:${sizePx}px;min-height:${sizePx}px;max-width:${sizePx}px;max-height:${sizePx}px;" class="rounded-full object-cover object-center border border-emerald-400/90 ring-1 ring-emerald-400/50 shadow-xs flex-shrink-0 inline-block ${extraClasses}" loading="eager" />`;
  }

  // --- 1. MASTER BASIS PENGETAHUAN SELURUH 16 MODUL APLIKASI ---
  const FATIH_KNOWLEDGE_BASE = {
    tabs: {
      bisnis: {
        id: 'bisnis',
        name: 'Inkubator Bisnis & Titip Jual',
        category: 'Wirausaha & Finansial',
        desc: 'Modul wirausaha konsinyasi warung/kantin, kalkulator kasir bagi hasil otomatis, pemantau arus kas modal, dan script penguat mental anti-minder.',
        keywords: ['bisnis', 'titip jual', 'konsinyasi', 'warung', 'bagi hasil', 'modal', 'anti-minder', 'kasir', 'jualan', 'untung', 'titipan', 'mitra warung'],
        summary: 'Kelola titip jual warung tanpa modal besar: hitung bagi hasil otomatis (default 20%), catat produk laku/retur, dan atasi rasa ragu/malu dengan Script Anti-Minder.',
        guide: [
          '1. Ketuk tombol "+ Tambah Warung" untuk mendata warung mitra baru (nama warung, pemilik, nomor WA).',
          '2. Masukkan produk titipan: Tentukan Harga Pokok (modal), Harga Jual Warung, dan persentase Bagi Hasil (default 20%).',
          '3. Saat jadwal kontrol/penagihan, buka tab "Kasir Bagi Hasil" untuk menghitung otomatis jumlah laku, bagi hasil warung, dan uang yang kita terima.',
          '4. Jika merasa canggung atau ragu menawarkan produk, buka tab "Script Anti-Minder" untuk membaca panduan komunikasi sopan dan percaya diri.'
        ]
      },
      rekap_junio: {
        id: 'rekap_junio',
        name: 'Rekap Transaksi Junio',
        category: 'Layanan BRIVA & Bank',
        desc: 'Rekapitulasi otomatis mutasi transaksi Junio Smart Bank BRI ke dalam workbook Excel 6-Sheet siap audit dan dokumen cetak legal PDF Landscape.',
        keywords: ['junio', 'rekap junio', 'junio smart', 'transaksi junio', 'excel 6 sheet', 'cetak pdf', 'mutasi bank', 'pos yayasan', 'escrow'],
        summary: 'Unggah file transaksi mutasi Junio Smart BRI, sistem otomatis memetakan pos anggaran, membagi per jenjang (MTs, SMP, MA, SMA), dan menghasilkan 6-Sheet Excel berborder rapi.',
        guide: [
          '1. Masuk ke Tab Rekap Junio lalu klik "Upload File Transaksi" (pilih file .xlsx atau .csv dari CMS BRI).',
          '2. Sistem otomatis memvalidasi data dan mengelompokkan transaksi ke 31 Kode Pos Anggaran Yayasan.',
          '3. Klik "Ekspor Excel 6-Sheet" untuk mengunduh laporan rekap lengkap siap audit.',
          '4. Klik "Cetak PDF Legal" untuk mencetak dokumen ringkasan resmi landscape bertanda tangan bendahara.'
        ]
      },
      briva: {
        id: 'briva',
        name: 'Generator Tagihan BRIVA',
        category: 'Layanan BRIVA & Bank',
        desc: 'Pembuat berkas massal Virtual Account Bank BRI format resmi 5 kolom CMS (No Registrasi, ID Tagihan, Jumlah, Tgl Efektif, Tgl Jatuh Tempo).',
        keywords: ['briva', 'tagihan briva', 'virtual account', '5 kolom', 'kolom bri', 'syahriyah', 'pecah rinci', 'kategori', '1 baris', 'cms bri'],
        summary: 'Generate file upload tagihan massal Bank BRI dengan 3 pilihan mode baris: Pecah Rinci (per komponen), Pecah Kategori, atau Akumulasi 1 Baris.',
        guide: [
          '1. Masukkan ID Tagihan resmi (misal: 62 untuk Syahriyah/SPP, 48 untuk Awal Tahun).',
          '2. Atur Tanggal Efektif (mulai bisa dibayar) dan Tanggal Jatuh Tempo.',
          '3. Pilih Mode Baris: "Pecah Rinci" (setiap item tagihan terpisah), "Kategori", atau "1 Baris" (akumulasi total).',
          '4. Klik "Generate BRIVA" lalu salin ke Excel atau unduh berkas CSV siap upload CMS.'
        ]
      },
      panggil: {
        id: 'panggil',
        name: 'Panggil Tagihan & Kwitansi',
        category: 'Layanan BRIVA & Bank',
        desc: 'Pencarian cepat rincian tagihan per santri, pembuatan kwitansi resmi berstempel yayasan, dan generator pesan WhatsApp wali santri.',
        keywords: ['panggil', 'kwitansi', 'panggil tagihan', 'reminder wa', 'rincian santri', 'nota', 'stempel', 'slip', 'cetak kwitansi'],
        summary: 'Cari nama santri untuk melihat rincian 4-kotak tagihan, mencetak kwitansi resmi tanda lunas, dan mengirim pengingat sopan via WhatsApp.',
        guide: [
          '1. Ketik nama santri atau NIS/No Registrasi pada kolom pencarian.',
          '2. Pilih santri dari daftar hasil pencarian untuk memunculkan Kartu Matriks 4-Kotak Tagihan.',
          '3. Klik "Cetak Kwitansi Slip" untuk mencetak bukti pembayaran resmi berlogo yayasan.',
          '4. Klik "Salin Pesan WA" untuk mengirimkan rincian tagihan secara personal dan santun ke wali santri.'
        ]
      },
      katalog: {
        id: 'katalog',
        name: 'Katalog Biaya & Kode BRI',
        category: 'Layanan BRIVA & Bank',
        desc: 'Daftar master 31 kode sub-akun resmi Bank BRI (Kode 48 s.d. 80), rincian nominal biaya pendidikan, dan pos anggaran yayasan.',
        keywords: ['katalog', 'kode bri', '31 kode', 'biaya pendidikan', 'tarif', 'sub akun', 'pos anggaran', 'daftar kode'],
        summary: 'Referensi lengkap 31 kode transaksi BRIVA resmi YTPAI agar tidak terjadi kesalahan memilih ID tagihan saat input keuangan.',
        guide: [
          '1. Buka Tab Katalog Biaya untuk melihat tabel 31 Kode Transaksi Resmi Bank BRI.',
          '2. Gunakan kolom pencarian cepat (misal: ketik "62" untuk Syahriyah, "48" untuk Awal Tahun).',
          '3. Klik pada baris kode untuk langsung menggunakannya di modul Generator BRIVA.'
        ]
      },
      konverter: {
        id: 'konverter',
        name: 'Konverter Excel Massal',
        category: 'Layanan BRIVA & Bank',
        desc: 'Alat pengubah data mentah Excel santri dari format acak menjadi format standar yang bersih dan siap diolah.',
        keywords: ['konverter', 'convert excel', 'ubah format', 'import santri', 'tabel acak', 'spreadsheet'],
        summary: 'Mengubah format tabel dari spreadsheet luar menjadi format standar Partner Fatih secara otomatis.',
        guide: [
          '1. Salin baris data dari spreadsheet Excel Anda.',
          '2. Tempelkan ke area teks input konverter.',
          '3. Klik "Analisa & Konversi". Sistem otomatis membersihkan kolom, nama, dan nominal.'
        ]
      },
      jurnal: {
        id: 'jurnal',
        name: 'Jurnal Mengajar Guru',
        category: 'Akademik & Guru',
        desc: 'Pencatatan agenda KBM harian guru, jadwal mengajar mingguan MTs & Madin, absensi kelas, dan rekap penilaian capaian belajar.',
        keywords: ['jurnal', 'jurnal mengajar', 'kbm', 'agenda guru', 'jadwal mengajar', 'absensi', 'nilai santri', 'prakarya', 'safinatun najah'],
        summary: 'Jurnal digital guru dengan jadwal mengajar MTs (Prakarya 7A-7D, 8A-8D) & Madin Diniyah (Safinatun Najah 1 Ula A-B), dilengkapi asisten suara.',
        guide: [
          '1. Pilih kelas dan mata pelajaran yang sedang diajar hari ini.',
          '2. Tulis materi pokok atau gunakan tombol mikrofon untuk merekam ringkasan KBM secara suara.',
          '3. Tandai santri yang sakit, izin, atau alfa pada daftar presensi.',
          '4. Klik "Simpan Jurnal" agar tercatat di rekap riwayat mengajar.'
        ]
      },
      cbt: {
        id: 'cbt',
        name: 'Bank Soal CBT & Kisi-kisi',
        category: 'Akademik & Guru',
        desc: 'Generator bank soal ujian pilihan ganda & esai, perakit kisi-kisi otomatis, dan ekspor instan ke file Microsoft Word (.docx).',
        keywords: ['cbt', 'soal', 'bank soal', 'kisi-kisi', 'word docx', 'ujian', 'kunci jawaban', 'naskah soal'],
        summary: 'Membuat naskah soal ujian berstandar dinas/kemenag lengkap dengan kop yayasan, tabel titik-titik samar, dan matriks kunci jawaban terpisah.',
        guide: [
          '1. Masukkan butir pertanyaan, opsi jawaban (A, B, C, D, E), dan kunci jawaban yang benar.',
          '2. Susun kisi-kisi capaian pembelajaran pada kolom indikator.',
          '3. Klik "Ekspor Naskah Soal (.docx)" untuk mendapatkan berkas Word siap cetak.'
        ]
      },
      tahfidz: {
        id: 'tahfidz',
        name: 'Tahfidz Tasmi\' Santri',
        category: 'Akademik & Guru',
        desc: 'Aplikasi penilaian ujian Tasmi\' bil Ghoib sekali duduk 31 santri binaan YTPAI, kalkulator kelulusan Mumtaz/Jayyid, dan cetak sertifikat.',
        keywords: ['tahfidz', 'tasmi', 'tasmiyah', '31 santri', 'juz', 'mumtaz', 'jayyid', 'sertifikat', 'hafalan', 'ujian tasmi'],
        summary: 'Manajemen ujian tasmi hafalan Al-Qur\'an santri dengan radar capaian juz, skor tajwid/fashahah, predikat kelulusan, dan cetak sertifikat resmi.',
        guide: [
          '1. Pilih santri dari daftar 31 Santri Binaan Tahfidz YTPAI.',
          '2. Tentukan target juz yang diujikan (misal: Juz 1-5 atau Juz 30 sekali duduk).',
          '3. Masukkan skor Tajwid, Kelancaran, dan Fashahah.',
          '4. Sistem otomatis menetapkan predikat (Mumtaz >= 90, Jayyid Jiddan 80-89, Jayyid 70-79) dan menerbitkan sertifikat.'
        ]
      },
      akun: {
        id: 'akun',
        name: 'Generator Akun & PPDB',
        category: 'Akademik & Guru',
        desc: 'Pembuat akun login massal santri/wali santri (Username/Password), nomor registrasi PPDB, dan cetak kartu akses ujian CBT.',
        keywords: ['akun', 'ppdb', 'generator akun', 'username', 'password', 'kartu santri', 'nisn', 'login'],
        summary: 'Membuat kredensial akun aman untuk portal wali murid dan sistem ujian CBT secara massal dalam hitungan detik.',
        guide: [
          '1. Masukkan daftar santri baru atau nomor registrasi formulir PPDB.',
          '2. Tentukan pola username dan sandi acak aman.',
          '3. Klik "Generate Akun Massal" lalu unduh berkas kartu login santri.'
        ]
      },
      humas: {
        id: 'humas',
        name: 'Humas & Sosmed (Radar H-7)',
        category: 'Humas & Publikasi',
        desc: 'Radar H-7 peringatan hari besar nasional (PHBN) & Islam (PHBI), 252 Master Agenda YTPAI 2026-2027, dan pembuat pamflet sosmed.',
        keywords: ['humas', 'sosmed', 'radar h-7', 'phbn', 'phbi', 'agenda', 'pamflet', 'kalender', 'hari besar', 'caption', 'instagram'],
        summary: 'Modul peringatan dini H-7 agenda yayasan dan hari besar agar tim humas tidak terlambat membuat draf pamflet, flyer, dan caption sosmed.',
        guide: [
          '1. Pantau kartu "Radar H-7" di bagian atas untuk melihat agenda terdekat dalam 7 hari ke depan.',
          '2. Klik "Buat Caption Instan" untuk mendapatkan draf teks ucapan resmi WhatsApp dan Instagram.',
          '3. Buka kalender tahunan untuk melihat 252 Master Agenda resmi YTPAI 2026-2027.'
        ]
      },
      keuangan: {
        id: 'keuangan',
        name: 'Keuangan Pribadi Pintar',
        category: 'Finansial & Pribadi',
        desc: 'Pengelola dompet pribadi, detektor "bocor halus" pengeluaran, asisten suara pencatatan belanja, dan alokasi amplop pintar.',
        keywords: ['keuangan', 'dompet', 'bocor halus', 'uang', 'pengeluaran', 'struk', 'gaji', 'anggaran', 'hemat'],
        summary: 'Mengontrol keuangan harian guru dan staf agar tidak boros melalui metode alokasi amplop dan pengingat kebocoran dana kecil.',
        guide: [
          '1. Catat pos pemasukan bulanan (gaji, insentif, bagi hasil bisnis).',
          '2. Gunakan asisten suara untuk mencatat belanja harian secara cepat.',
          '3. Pantau grafik "Radar Bocor Halus" untuk melihat pos-pos pengeluaran kecil yang sering terabaikan.'
        ]
      },
      ide: {
        id: 'ide',
        name: 'Ruang Ide & Tumbuh',
        category: 'Finansial & Pribadi',
        desc: 'Inkubator gagasan kreatif, papan kanban validasi peluang usaha, dan pengikis keraguan (Zona Anti-Ragu).',
        keywords: ['ide', 'ruang ide', 'inovasi', 'peluang', 'validasi', 'kanban', 'catatan ide', 'anti-ragu'],
        summary: 'Tempat menampung gagasan segar, menguji kelayakan ide wirausaha, dan memecahnya menjadi langkah eksekusi nyata.',
        guide: [
          '1. Catat ide baru pada kartu gagasan.',
          '2. Lakukan evaluasi nilai tambah dan analisa pembeda agar tidak terjebak perang harga.',
          '3. Geser status kartu pada papan Kanban dari "Draft" ke "Tervalidasi" hingga "Eksekusi".'
        ]
      },
      pembersih: {
        id: 'pembersih',
        name: 'Pembersih & SUM Excel',
        category: 'Alat Bantu & Utilitas',
        desc: 'Generator formula SUM Excel otomatis, pembersih spasi ganda, perbaikan format angka teks Bank BRI, dan standardisasi nama.',
        keywords: ['pembersih', 'sum', 'formula excel', 'spasi ganda', 'trim', 'kalkulasi'],
        summary: 'Membersihkan data tabel mentah dari spasi ganda dan format nominal salah sebelum diimpor ke sistem.',
        guide: [
          '1. Salin data teks atau tabel yang ingin dibersihkan.',
          '2. Klik tombol "Bersihkan Format & Spasi".',
          '3. Salin kembali hasil yang sudah bersih dan rapi ke lembar Excel Anda.'
        ]
      },
      wa: {
        id: 'wa',
        name: 'Template WhatsApp Broadcast',
        category: 'Alat Bantu & Utilitas',
        desc: '6 format template pesan WhatsApp resmi untuk tagihan santri, ucapan hari besar, pengumuman rapat, dan undangan wali murid.',
        keywords: ['wa', 'whatsapp', 'template wa', 'broadcast', 'pesan wali', 'pengumuman', 'undangan'],
        summary: 'Menyusun pesan WhatsApp sopan, profesional, dan personal dengan variabel dinamis seperti {nama}, {nominal}, dan {tanggal}.',
        guide: [
          '1. Pilih jenis template pesan yang ingin dikirimkan.',
          '2. Masukkan rincian variabel data santri/wali murid.',
          '3. Klik "Salin Teks" atau "Buka WhatsApp Langsung".'
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
          '2. Ikuti panduan visual langkah demi langkah pada lembar kerja Anda.'
        ]
      }
    }
  };

  // --- 2. MASTER DATA SCHEDULES (KBM GURU YTPAI) ---
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

  // --- 2B. PILAR KEDEWASAAN BERPIKIR & BERTINDAK (FATHIYA WISDOM VAULT) ---
  const FATHIYA_WISDOM_VAULT = [
    {
      triggers: ['dewasa', 'cara bersikap dewasa', 'pola pikir dewasa', 'bersikap dewasa', 'menjadi dewasa', 'kedewasaan', 'sikap dewasa', 'matang dalam berpikir', 'berpikir dewasa', 'tindakan dewasa'],
      title: 'Pilar Kedewasaan Berpikir: Jernih, Tenang & Mengambil Tanggung Jawab Penuh',
      quote: '"Kedewasaan sejati tidak diukur dari angka usia, melainkan dari kemampuan kita menahan reaksi pertama, menata emosi dengan kepala dingin, dan memilih solusi bermartabat daripada sibuk mengeluh."',
      actions: [
        '1. **Jeda Sebelum Merespons (Pause & Breathe)**: Jangan bereaksi spontan terbawa perasaan. Beri jeda beberapa detik agar akal sehat dan adab yang memegang kendali.',
        '2. **Tanggung Jawab Pribadi (Radical Ownership)**: Berhenti mencari kambing hitam. Tanyakan pada diri: *\'Apa satu hal yang berada dalam kendaliku hari ini untuk memperbaiki keadaan?\'*',
        '3. **Kedepankan Konsekuensi Jangka Panjang (Second-Order Thinking)**: Jangan mengambil keputusan saat amarah atau kelelahan memuncak. Ukur dampak kata-kata dan tindakan kita untuk masa depan.'
      ],
      voiceText: 'Kedewasaan berawal dari kemampuan kita menenangkan diri, menahan reaksi sesaat, dan mengambil tanggung jawab penuh atas tindakan kita sahabatku.'
    },
    {
      triggers: ['emosi', 'lagi marah', 'marah banget', 'kesal', 'jengkel', 'sakit hati', 'tersinggung', 'kecewa', 'jengkel banget', 'benci', 'marah'],
      title: 'Menjinakkan Amarah: Menjaga Martabat di Saat Paling Menantang',
      quote: '"Bukanlah orang kuat itu yang pandai bergulat atau membalas cercaan, tetapi orang kuat adalah yang mampu mengendalikan dirinya saat amarah bergolak." (HR. Bukhari)',
      actions: [
        '1. **Ubah Posisi & Beri Jeda Fisik**: Jika berdiri maka duduklah, jika duduk maka berbaringlah, atau basuh wajah dengan air wudhu untuk memadamkan api amarah.',
        '2. **Pisahkan Fakta dari Asumsi**: Seringkali yang menyakiti kita bukanlah perbuatan orang lain, melainkan cerita buruk yang dibangun oleh pikiran kita sendiri.',
        '3. **Sampaikan Batasan dengan Elegan**: Bersikap tegas tidak harus membentak. Nada bicara yang tenang, jelas, dan santun justru memancarkan wibawa kepemimpinan yang disegani.'
      ],
      voiceText: 'Tahan sejenak amarah Anda sahabatku. Kemenangan sejati adalah saat kita mampu menguasai diri dan tetap menjaga adab.'
    },
    {
      triggers: ['bimbang', 'bingung memilih', 'ambil keputusan', 'ragu-ragu', 'pilihan sulit', 'harus bagaimana', 'kebingungan', 'gamang', 'dilema'],
      title: 'Kebijaksanaan Memilih: Kerangka Keputusan Matang & Berprinsip',
      quote: '"Keraguan tidak akan hilang dengan menunggu keadaan sempurna, tetapi dengan keberanian memilih jalan yang berprinsip dan siap menanggung risikonya secara ksatria."',
      actions: [
        '1. **Gunakan Kaidah 10/10/10**: Bagaimana dampak pilihan ini dalam 10 menit ke depan? 10 bulan ke depan? Dan 10 tahun ke depan?',
        '2. **Pilih yang Lebih Mengutamakan Maslahat & Integritas**: Jika dua pilihan tampak seimbang, pilih opsi yang menuntut disiplin dan kebaikan jangka panjang, bukan kenyamanan sesaat.',
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

  // --- 3. CONVERSATION CONTEXT & MULTITURN MEMORY ENGINE ---
  let chatHistory = [];
  let isThinking = false;
  let isExpanded = false;
  let speechRecognition = null;
  let isListening = false;
  let lastPromptWasVoice = false;
  let isAutoVoiceEnabled = false;

  const chatContext = {
    lastTopic: null,          // 'bisnis', 'rekap_junio', 'briva', 'jadwal', 'kehadiran', 'tahfidz', 'cbt', 'humas', 'keuangan', 'sharing', 'kedewasaan'
    lastClass: '7A',
    lastDayName: null,
    lastTab: null,
    lastMatchingSchedules: [],
    recentTurns: []           // [{ role: 'user'|'fatih', text: '...', topic: '...' }]
  };

  // Helper Pengambil Master Data Humas & Kalender Tahunan
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

  // Helper Deteksi Tab Aktif Aplikasi
  function detectActiveAppTab() {
    const tabKeys = ['bisnis', 'rekap_junio', 'humas', 'jurnal', 'keuangan', 'cbt', 'ide', 'briva', 'panggil', 'akun', 'tahfidz', 'katalog', 'pembersih', 'panduan', 'wa', 'konverter'];
    
    // 1. Cek dari window.currentTab bila tersedia
    if (typeof window !== 'undefined' && window.currentTab && FATIH_KNOWLEDGE_BASE.tabs[window.currentTab]) {
      return window.currentTab;
    }

    // 2. Cek elemen tab yang tidak memiliki class 'hidden'
    for (const k of tabKeys) {
      const el = document.getElementById('tab-' + k) || 
                 document.getElementById('tab' + k.charAt(0).toUpperCase() + k.slice(1));
      if (el && !el.classList.contains('hidden') && el.offsetParent !== null) {
        return k;
      }
    }

    // 3. Cek dock atau room pill active
    const activeDock = document.querySelector('.dock-item-active, .room-pill-active');
    if (activeDock && activeDock.id) {
      const match = activeDock.id.replace(/^(dock-|room-|nav-)/, '');
      if (match && FATIH_KNOWLEDGE_BASE.tabs[match]) return match;
    }

    return 'bisnis';
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
            <button type="button" onclick="window.switchTab('${tabKey}'); window.closeFatihChat();" class="px-2.5 py-1 rounded-md bg-emerald-500/25 hover:bg-emerald-500/40 text-emerald-300 font-bold border border-emerald-400/40 text-[9.5px] cursor-pointer transition-all active:scale-95 inline-flex items-center gap-1 shadow-2xs">
              <span>Buka</span>
              <i data-lucide="arrow-right" class="w-2.5 h-2.5"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="mt-2.5 rounded-xl border border-emerald-500/30 bg-slate-950/80 overflow-hidden shadow-xs">
        <div class="px-2.5 py-1.5 bg-emerald-950/60 border-b border-emerald-500/20 flex items-center justify-between text-[10px]">
          <span class="font-bold text-emerald-300 flex items-center gap-1.5">
            <i data-lucide="compass" class="w-3.5 h-3.5 text-emerald-400"></i>
            <span>Pintasan Aksi Cepat 1-Klik</span>
          </span>
          <span class="text-[8.5px] text-emerald-400/80 font-mono">Langsung Buka</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-[10px] divide-y divide-white/5">
            <thead class="bg-white/[0.02] text-slate-400 text-[9px] uppercase font-bold tracking-wider">
              <tr>
                <th class="py-1.5 px-2">Modul Tujuan</th>
                <th class="py-1.5 px-2">Keterangan</th>
                <th class="py-1.5 px-2 text-right w-16">Aksi</th>
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

  // --- 4. DYNAMIC CONTEXTUAL SUGGESTIONS PER ACTIVE TAB ---
  function getContextualSuggestions(tabId) {
    switch(tabId) {
      case 'bisnis':
        return [
          { icon: '🏪', title: 'Panduan Titip Jual', desc: 'SOP titip warung konsinyasi', prompt: 'Bagaimana cara mulai titip jual di warung?' },
          { icon: '💰', title: 'Hitung Bagi Hasil', desc: 'Simulasi kasir otomatis 20%', prompt: 'Bagaimana cara hitung bagi hasil warung dan kasir otomatis?' },
          { icon: '🛡️', title: 'Script Anti-Minder', desc: 'Mental percaya diri jualan', prompt: 'Beri saya script anti-minder untuk menawarkan produk ke warung' },
          { icon: '📊', title: 'Catat Arus Kas', desc: 'Pantau modal & laba bersih', prompt: 'Bagaimana cara catat arus kas dan modal di modul Titip Jual?' }
        ];
      case 'rekap_junio':
        return [
          { icon: '📊', title: 'Rekap 6-Sheet', desc: 'Format audit Excel resmi', prompt: 'Jelaskan format rekap Excel 6-Sheet transaksi Junio Smart' },
          { icon: '🖨️', title: 'Cetak PDF Legal', desc: 'Dokumen landscape resmi', prompt: 'Bagaimana cara cetak ringkasan legal PDF transaksi Junio?' },
          { icon: '🏦', title: 'Mapping 31 Pos', desc: 'Klasifikasi pos rekening', prompt: 'Bagaimana cara memetakan pos anggaran yayasan di rekap Junio?' },
          { icon: '🔍', title: 'Import Mutasi', desc: 'Unggah file CMS BRI', prompt: 'Bagaimana cara upload file mutasi transaksi Junio Smart?' }
        ];
      case 'humas':
        return [
          { icon: '📢', title: 'Radar H-7', desc: 'Pengingat agenda terdekat', prompt: 'Cek agenda terdekat pada Radar H-7 Humas' },
          { icon: '📅', title: '252 Master Agenda', desc: 'Kalender tahunan YTPAI', prompt: 'Tampilkan agenda resmi yayasan di kalender tahunan' },
          { icon: '✍️', title: 'Draf Caption WA/IG', desc: 'Teks ucapan hari besar', prompt: 'Buatkan draf caption ucapan resmi hari besar untuk humas' },
          { icon: '🖼️', title: 'Format Pamflet', desc: 'Standar publikasi resmi', prompt: 'Apa standar pembuatan pamflet publikasi yayasan?' }
        ];
      case 'jurnal':
        return [
          { icon: '📖', title: 'Jadwal Hari Ini', desc: 'Cek jam & kelas mengajar', prompt: 'Cek jadwal mengajar saya hari ini' },
          { icon: '👥', title: 'Siswa Tidak Hadir', desc: 'Rekap absensi santri', prompt: 'Siapa saja santri yang tidak hadir hari ini?' },
          { icon: '🎙️', title: 'Catat KBM Suara', desc: 'Input materi lewat mic', prompt: 'Bagaimana cara menggunakan asisten suara untuk mencatat KBM?' },
          { icon: '📝', title: 'Isi Jurnal Cepat', desc: 'Langkah simpan agenda', prompt: 'Bagaimana langkah cepat mengisi jurnal mengajar guru?' }
        ];
      case 'briva':
        return [
          { icon: '💳', title: 'Format 5-Kolom', desc: 'Standar Bank BRI CMS', prompt: 'Jelaskan format 5 kolom tagihan massal BRIVA' },
          { icon: '🔢', title: 'Daftar Kode ID', desc: 'Kode 48 s.d. 80 resmi', prompt: 'Sebutkan kode transaksi BRIVA resmi YTPAI' },
          { icon: '📋', title: '3 Mode Baris', desc: 'Rinci vs Kategori vs 1 Baris', prompt: 'Apa perbedaan mode Pecah Rinci, Kategori, dan 1 Baris pada BRIVA?' },
          { icon: '📂', title: 'Import Tagihan', desc: 'Upload spreadsheet Excel', prompt: 'Bagaimana cara import data santri ke generator BRIVA?' }
        ];
      case 'cbt':
        return [
          { icon: '📝', title: 'Format Word .docx', desc: 'Naskah ujian rapi ber-kop', prompt: 'Jelaskan format naskah soal Word .docx standar CBT' },
          { icon: '🎯', title: 'Susun Kisi-kisi', desc: 'Matriks capaian soal', prompt: 'Bagaimana cara menyusun kisi-kisi soal ujian di CBT?' },
          { icon: '🔑', title: 'Kunci Jawaban', desc: 'Matriks kunci terpisah', prompt: 'Bagaimana cara mengatur kunci jawaban dan bobot nilai soal?' },
          { icon: '📤', title: 'Unduh Berkas', desc: 'Ekspor naskah siap cetak', prompt: 'Bagaimana cara ekspor soal ke file Word yang siap dicetak?' }
        ];
      case 'tahfidz':
        return [
          { icon: '📖', title: '31 Santri Binaan', desc: 'Daftar peserta tasmi', prompt: 'Tampilkan daftar 31 santri binaan tahfidz YTPAI' },
          { icon: '🏅', title: 'Kriteria Nilai', desc: 'Mumtaz, Jayyid Jiddan', prompt: 'Berapa standar nilai kelulusan Mumtaz dan Jayyid ujian Tasmi?' },
          { icon: '📜', title: 'Cetak Sertifikat', desc: 'Piagam resmi sekali duduk', prompt: 'Bagaimana cara mencetak sertifikat ujian Tasmi bil Ghoib?' },
          { icon: '🎯', title: 'Target Ujian', desc: 'Metode sekali duduk', prompt: 'Jelaskan tata cara ujian Tasmi hafalan Al-Qur\'an sekali duduk' }
        ];
      case 'keuangan':
        return [
          { icon: '🔍', title: 'Radar Bocor Halus', desc: 'Detektor pengeluaran kecil', prompt: 'Bagaimana cara mendeteksi bocor halus pengeluaran pribadi?' },
          { icon: '✉️', title: 'Alokasi Amplop', desc: 'Manajemen pos dana pintar', prompt: 'Jelaskan metode alokasi amplop untuk mengontrol pengeluaran' },
          { icon: '🎙️', title: 'Catat Belanja Suara', desc: 'Input instan via mic', prompt: 'Bagaimana cara mencatat belanja harian lewat asisten suara?' },
          { icon: '💡', title: 'Tips Berhemat', desc: 'Menata gaji guru berkah', prompt: 'Beri saya tips mengelola keuangan guru agar tetap lapang dan berkah' }
        ];
      case 'akun':
        return [
          { icon: '👤', title: 'Akun PPDB Massal', desc: 'Generate login santri', prompt: 'Bagaimana cara membuat akun login PPDB santri secara massal?' },
          { icon: '🔑', title: 'Pola Sandi Aman', desc: 'Kombinasi password acak', prompt: 'Bagaimana pola pembuatan username dan sandi santri yang aman?' },
          { icon: '📇', title: 'Kartu Akses CBT', desc: 'Cetak kartu login ujian', prompt: 'Bagaimana cara mencetak kartu login akses ujian CBT santri?' },
          { icon: '📱', title: 'Broadcast WA', desc: 'Kirim akun ke wali murid', prompt: 'Bagaimana cara mengirim akun login santri via WhatsApp?' }
        ];
      default:
        return [
          { icon: '🌿', title: 'Mau Sharing', desc: 'Curhat & diskusi pikiran', prompt: 'Mau sharing dong Fathiya, pikiran lagi terasa penuh' },
          { icon: '🧭', title: 'Tabel 16 Modul', desc: 'Navigasi cepat 1-klik', prompt: 'Tampilkan tabel pintasan seluruh 16 modul Partner Fatih' },
          { icon: '📅', title: 'Kalender Tahunan', desc: '252 agenda & PHBN/PHBI', prompt: 'Tampilkan agenda resmi yayasan di kalender tahunan' },
          { icon: '📖', title: 'Jadwal Mengajar', desc: 'Jam, kelas & mapel KBM', prompt: 'Cek jadwal mengajar saya hari ini' }
        ];
    }
  }

  function renderSuggestionsDom(tabId) {
    const container = document.getElementById('fatihChatSuggestions');
    if (!container) return;

    const list = getContextualSuggestions(tabId);
    container.innerHTML = list.map(item => `
      <button type="button" onclick="window.sendFatihQuickPrompt('${escapeHtml(item.prompt)}')" class="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-emerald-500/25 hover:border-emerald-400/50 text-left transition-all cursor-pointer active:scale-98 shadow-xs flex flex-col justify-between group">
        <div class="text-[10px] font-bold text-emerald-200 group-hover:text-emerald-100 flex items-center gap-1.5 truncate">
          <span>${item.icon}</span>
          <span class="truncate">${escapeHtml(item.title)}</span>
        </div>
        <div class="text-[8.5px] text-slate-400 truncate mt-0.5">${escapeHtml(item.desc)}</div>
      </button>
    `).join('');
  }

  // --- 5. SMART INTENT HANDLERS (MAKSIMAL & NYAMBUNG) ---

  // 5.1 Tabel Seluruh 16 Modul
  function handleShowAllModulesTable() {
    chatContext.lastTopic = 'modul';
    const actions = Object.values(FATIH_KNOWLEDGE_BASE.tabs).map(t => ({
      tabId: t.id,
      name: t.name,
      desc: t.category + ' — ' + (t.summary || t.desc).substring(0, 55) + '...'
    }));

    return {
      type: 'table_all_modules',
      text: `Berikut adalah **Matriks Pintasan Seluruh 16 Modul Partner Fatih** sahabatku 🧭\n\nSetiap modul dirancang saling terhubung untuk mempermudah tugas administrasi yayasan, akademik, dan wirausaha. Silakan ketuk tombol **Buka** pada tabel di bawah untuk langsung menuju modul yang Anda butuhkan.`,
      voiceText: 'Berikut daftar seluruh 16 modul Partner Fatih sahabatku. Anda bisa membukanya langsung melalui tombol pada tabel.',
      tabShortcut: null,
      actionTable: actions
    };
  }

  // 5.2 Panduan Kontekstual Berdasarkan Tab yang Sedang Dibuka Pengguna ("Gimana cara pakainya?")
  function handleTabContextGuidance(activeTab, userText) {
    const tab = FATIH_KNOWLEDGE_BASE.tabs[activeTab] || FATIH_KNOWLEDGE_BASE.tabs.bisnis;
    chatContext.lastTopic = tab.id;
    chatContext.lastTab = tab.id;

    const guideLines = tab.guide ? tab.guide.join('\n') : '';

    return {
      type: 'active_tab_guidance',
      text: `Tentu sahabatku! Saat ini Anda sedang berada di modul **${tab.name}** (${tab.category}).\n\n📌 **Ringkasan Fungsi:**\n${tab.desc}\n\n📋 **Panduan Langkah Kerja Praktis:**\n${guideLines}\n\nAda bagian atau perhitungan tertentu yang ingin Fathiya bantu uraikan lebih rinci?`,
      voiceText: `Saat ini Anda membuka modul ${tab.name}. Silakan ikuti langkah kerja praktis yang telah Fathiya cantumkan sahabatku.`,
      tabShortcut: tab.id,
      actionTable: [
        { tabId: tab.id, name: tab.name, desc: 'Buka dan lanjutkan pengerjaan modul ini' }
      ]
    };
  }

  // 5.3 Pertanyaan Lanjutan Multi-Turn ("Lalu langkah selanjutnya apa?", "Contohnya gimana?", "Berapa biayanya?")
  function handleFollowUpContext(userText) {
    const lower = userText.toLowerCase();
    const lastTopic = chatContext.lastTopic || chatContext.lastTab || detectActiveAppTab();

    if (lastTopic === 'bisnis' || /(?:warung|titip|konsinyasi|jual)/i.test(lower)) {
      chatContext.lastTopic = 'bisnis';
      if (/(?:berapa|bagi hasil|persen|hitung|rumus|untung)/i.test(lower)) {
        return {
          type: 'bisnis_margin',
          text: `Untuk sistem titip jual warung, standar pembagian hasil yang sehat dan saling menguntungkan adalah **20% untuk warung mitra** sahabatku 💰\n\n**Contoh Simulasi Nyata:**\n• Harga Pokok Modal Kita: Rp 2.000\n• Harga Jual Warung ke Pembeli: Rp 2.500\n• Selisih Untung: Rp 500 per bungkus\n• Bagi Hasil Warung (20%): Rp 100 per bungkus\n• Untung Bersih Kita (80%): Rp 400 per bungkus\n\nJika titip di 10 warung @ 10 bungkus laku habis per hari:\n➡️ Untung bersih Anda = **Rp 40.000 / hari** (Rp 1.200.000 / bulan modal bergulir!). Di tab Inkubator Bisnis sudah ada kalkulator otomatisnya.`,
          voiceText: 'Standar bagi hasil warung yang ideal adalah 20 persen sahabatku. Misalnya untung 500 rupiah, warung mendapat 100 rupiah dan kita mendapat 400 rupiah.',
          tabShortcut: 'bisnis',
          actionTable: [{ tabId: 'bisnis', name: 'Inkubator Bisnis', desc: 'Buka Kalkulator Kasir Bagi Hasil' }]
        };
      }
      return {
        type: 'bisnis_next_step',
        text: `Langkah selanjutnya setelah mencatat warung mitra adalah **membuat Nota Titipan Pertama** sahabatku 📝\n\n1. Buka tab **Mitra Warung**, klik nama warung yang dituju.\n2. Catat jumlah titipan awal (misal: 10 atau 15 bungkus).\n3. Tentukan tanggal kontrol (biasanya 2 atau 3 hari sekali).\n4. Gunakan fitur **Salin Nota WhatsApp** untuk mengirimkan rekap titipan resmi ke pemilik warung agar tercatat rapi dan profesional.`,
        voiceText: 'Langkah berikutnya adalah membuat nota titipan pertama dan menentukan jadwal kontrol sahabatku.',
        tabShortcut: 'bisnis',
        actionTable: [{ tabId: 'bisnis', name: 'Inkubator Bisnis', desc: 'Catat Titipan & Buka Kasir' }]
      };
    }

    if (lastTopic === 'rekap_junio' || /(?:junio|mutasi|excel|sheet)/i.test(lower)) {
      chatContext.lastTopic = 'rekap_junio';
      return {
        type: 'rekap_junio_next_step',
        text: `Langkah selanjutnya pada **Rekap Transaksi Junio Smart**:\n\n1. Pastikan seluruh transaksi telah terpetakan ke pos masing-masing.\n2. Periksa baris saldo escrow agar tidak ada mutasi yang menggantung.\n3. Klik tombol hijau **Ekspor Excel 6-Sheet** untuk mencetak rekap per jenjang (Ringkasan, MTs, SMP, MA, SMA, dan Buku Kas).\n4. Berikan berkas tersebut ke Kepala Yayasan atau Bendahara Pengawas sebagai laporan bulanan resmi.`,
        voiceText: 'Langkah berikutnya adalah mengekspor rekap Excel 6 sheet dan mencetak berkas legal PDF sahabatku.',
        tabShortcut: 'rekap_junio',
        actionTable: [{ tabId: 'rekap_junio', name: 'Rekap Junio', desc: 'Unduh Excel 6-Sheet & PDF' }]
      };
    }

    if (lastTopic === 'briva' || /(?:briva|tagihan|5 kolom)/i.test(lower)) {
      chatContext.lastTopic = 'briva';
      return {
        type: 'briva_next_step',
        text: `Setelah meng-generate tagihan BRIVA 5-Kolom:\n\n1. Periksa kembali kolom **Jumlah Nominal** dan **Tanggal Jatuh Tempo**.\n2. Klik tombol **Salin ke Excel** atau unduh format CSV.\n3. Masuk ke portal CMS Bank BRI, pilih menu *Mass Upload BRIVA*, dan unggah berkas tersebut.\n4. Virtual Account santri akan langsung aktif dan bisa dibayar lewat ATM, BRImo, atau teller bank.`,
        voiceText: 'Setelah membuat tagihan BRIVA, salin hasilnya dan unggah ke portal CMS Bank BRI sahabatku.',
        tabShortcut: 'briva',
        actionTable: [{ tabId: 'briva', name: 'Generator BRIVA', desc: 'Buka Generator Format 5-Kolom' }]
      };
    }

    if (lastTopic === 'tahfidz' || /(?:tahfidz|tasmi|hafalan)/i.test(lower)) {
      chatContext.lastTopic = 'tahfidz';
      return {
        type: 'tahfidz_next_step',
        text: `Langkah selanjutnya setelah ujian Tasmi' selesai dinilai:\n\n1. Pastikan skor Tajwid, Kelancaran, dan Fashahah telah tersimpan.\n2. Klik tombol **Cetak Sertifikat** untuk menerbitkan piagam resmi sekali duduk bertanda tangan penguji.\n3. Salin teks pengumuman apresiasi santri untuk dibagikan ke grup WhatsApp wali santri agar menjadi kebanggaan keluarga.`,
        voiceText: 'Langkah berikutnya adalah mencetak sertifikat tasmi dan membagikan apresiasi ke grup wali santri sahabatku.',
        tabShortcut: 'tahfidz',
        actionTable: [{ tabId: 'tahfidz', name: 'Tahfidz Tasmi\'', desc: 'Cetak Sertifikat & Apresiasi' }]
      };
    }

    // Default general follow-up
    return {
      type: 'general_next_step',
      text: `Untuk melanjutkan langkah kerja sahabatku:\n\n1. Selesaikan input data pada modul yang sedang aktif.\n2. Periksa kembali keakuratan nominal dan nama santri.\n3. Lakukan sinkronisasi atau simpan berkas ke cadangan offline.\n\nFathiya siap memandu jika ada tombol atau langkah yang membingungkan.`,
      voiceText: 'Silakan lanjutkan pengerjaan pada modul aktif sahabatku. Fathiya siap mendampingi.',
      tabShortcut: lastTopic || 'bisnis'
    };
  }

  // 5.4 Penanganan Khusus Inkubator Bisnis & Titip Jual
  function handleTitipJualQuery(userText) {
    chatContext.lastTopic = 'bisnis';
    const lower = userText.toLowerCase();

    if (/(?:anti[- ]?minder|minder|malu|takut ditolak|ragu|gengsi|mental)/i.test(lower)) {
      return {
        type: 'script_anti_minder',
        title: 'Script Penguat Mental Anti-Minder Titip Jual',
        text: `Rasa malu atau minder saat pertama kali menitipkan barang ke warung adalah hal yang sangat manusiawi sahabatku 🌸\n\n**Ubah Pola Pikir (Mindset Shift):**\nKita datang bukan untuk mengemis atau membebani pemilik warung, melainkan **membawakan peluang rezeki tambahan** bagi mereka tanpa modal sepeser pun!\n\n**Script Contoh Komunikasi Sopan:**\n*"Assalamu'alaikum Ibu/Bapak... Kulo nyuwun berkahipun. Kulo nitip olahan camilan produksi piyambak menika 10 bungkus. Warung mboten usah mbayar riyen; mangke bilih pajeng, warung pikantuk untung 20% langsung. Bilih dereng pajeng, kulo pendhet mboten nopo-nopo."*\n\nKalimat yang tulus, santun, dan tanpa paksaan akan meluluhkan keraguan pemilik warung. Buka tab Inkubator Bisnis untuk naskah lengkapnya!`,
        voiceText: 'Ingatlah sahabatku, kita datang membawakan peluang rezeki bagi warung tanpa modal. Bersikaplah santun dan tulus.',
        tabShortcut: 'bisnis',
        actionTable: [{ tabId: 'bisnis', name: 'Inkubator Bisnis', desc: 'Buka Tab 4: Script Anti-Minder' }]
      };
    }

    return {
      type: 'titip_jual_general',
      text: `Modul **Inkubator Bisnis & Titip Jual** dirancang agar guru, santri, dan staf yayasan bisa merintis kemandirian finansial tanpa risiko besar 🏪\n\n**4 Pilar Utama Modul:**\n1. **Mitra Warung**: Catat nama warung, kontak pemilik, dan riwayat titipan.\n2. **Kasir Bagi Hasil Otomatis**: Menghitung otomatis barang laku, bagi hasil warung (20%), dan uang setoran bersih.\n3. **Arus Kas & Modal**: Memantau modal kerja agar tidak terpakai untuk belanja konsumtif.\n4. **Script Anti-Minder**: Naskah diplomasi santun berbicara kepada pemilik warung.\n\nSilakan buka modul Titip Jual di bawah untuk memulai!`,
      voiceText: 'Modul Inkubator Bisnis membantu Anda mengelola titip jual warung secara rapi dengan kasir bagi hasil otomatis sahabatku.',
      tabShortcut: 'bisnis',
      actionTable: [{ tabId: 'bisnis', name: 'Inkubator Bisnis', desc: 'Buka Inkubator Bisnis & Titip Jual' }]
    };
  }

  // 5.5 Penanganan Khusus Rekap Junio Smart BRI
  function handleRekapJunioQuery(userText) {
    chatContext.lastTopic = 'rekap_junio';
    return {
      type: 'rekap_junio_guide',
      text: `Modul **Rekap Transaksi Junio Smart** mengolah data mutasi perbankan Bank BRI yayasan menjadi berkas siap audit 🏛️\n\n**Keunggulan Sistem Rekap Junio:**\n• **Excel 6-Sheet Otomatis**: Memecah transaksi ke Sheet Ringkasan Eksekutif, Jenjang MTs, SMP, MA, SMA, serta Buku Kas Umum.\n• **Border & Tipografi Resmi**: Format tabel rapi standar akuntansi perbankan.\n• **PDF Legal Landscape**: Dokumen cetak legal dengan kolom tanda tangan resmi Bendahara dan Ketua Yayasan.\n• **Pendeteksi Selisih Saldo**: Memastikan tidak ada penerimaan yang tercecer.\n\nCukup unggah file spreadsheet mutasi Anda, dan biarkan sistem merapikannya dalam 3 detik!`,
      voiceText: 'Rekap Transaksi Junio Smart mengelompokkan mutasi Bank BRI ke dalam 6 sheet Excel dan berkas cetak PDF legal sahabatku.',
      tabShortcut: 'rekap_junio',
      actionTable: [{ tabId: 'rekap_junio', name: 'Rekap Junio', desc: 'Buka Modul Rekap Transaksi Junio' }]
    };
  }

  // 5.6 Penanganan Jadwal Mengajar KBM
  function handleCekJadwalVoice(userText) {
    chatContext.lastTopic = 'jadwal';
    const now = new Date();
    const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const lower = userText.toLowerCase();
    let targetDay = null;

    if (lower.includes('senin')) targetDay = 'Senin';
    else if (lower.includes('selasa')) targetDay = 'Selasa';
    else if (lower.includes('rabu')) targetDay = 'Rabu';
    else if (lower.includes('kamis')) targetDay = 'Kamis';
    else if (lower.includes('jumat')) targetDay = 'Jumat';
    else if (lower.includes('sabtu')) targetDay = 'Sabtu';
    else if (lower.includes('ahad') || lower.includes('minggu')) targetDay = 'Ahad';
    else if (lower.includes('besok')) {
      targetDay = days[(now.getDay() + 1) % 7];
    } else if (lower.includes('kemarin')) {
      targetDay = days[(now.getDay() + 6) % 7];
    } else if (lower.includes('hari ini') || lower.includes('sekarang')) {
      targetDay = days[now.getDay()];
    } else if (chatContext.lastDayName) {
      // Mengingat hari dari percakapan giliran sebelumnya
      targetDay = chatContext.lastDayName;
    } else {
      targetDay = days[now.getDay()];
    }

    chatContext.lastDayName = targetDay;
    const matching = FATIH_DEFAULT_SCHEDULES.filter(s => s.day.toLowerCase() === targetDay.toLowerCase());
    chatContext.lastMatchingSchedules = matching;

    if (matching.length === 0) {
      return {
        type: 'jadwal_kbm',
        text: `Pada **Hari ${targetDay}**, Kak Fatih tidak memiliki jadwal mengajar tatap muka KBM resmi 🌿\n\nWaktu luang ini bisa dimanfaatkan untuk rekap jurnal kelas, menyiapkan materi, atau rehat sejenak menata energi.`,
        voiceText: `Pada hari ${targetDay} tidak ada jadwal mengajar KBM Kak Fatih. Bisa digunakan untuk evaluasi atau istirahat.`,
        tabShortcut: 'jurnal',
        actionTable: [{ tabId: 'jurnal', name: 'Jurnal Guru', desc: 'Buka Jadwal & Riwayat Mengajar' }]
      };
    }

    const scheduleList = matching.map((s, idx) => `• **${s.time} WIB**: Kelas **${s.classId}** — *${s.subject}* (${s.room})`).join('\n');

    return {
      type: 'jadwal_kbm',
      text: `Jadwal mengajar Anda untuk **Hari ${targetDay}** (${matching.length} Sesi KBM) 📖:\n\n${scheduleList}\n\nSemoga setiap ilmu yang disampaikan menjadi amal jariyah yang penuh berkah bagi santri. Buka modul Jurnal Guru untuk mencatat materi hari ini sahabatku.`,
      voiceText: `Jadwal mengajar Anda hari ${targetDay} ada ${matching.length} sesi. Tetap semangat mengajar sahabatku.`,
      tabShortcut: 'jurnal',
      actionTable: [{ tabId: 'jurnal', name: 'Jurnal Guru', desc: 'Buka Jurnal Mengajar & Absensi' }]
    };
  }

  // 5.7 Penanganan Cek Presensi & Santri Tidak Hadir
  function handleKehadiranVoice(userText) {
    chatContext.lastTopic = 'kehadiran';
    return {
      type: 'kehadiran_santri',
      text: `Berdasarkan rekap presensi kelas hari ini sahabatku 👥:\n\n• **Tingkat Kehadiran Global**: **96.4%** (Sangat Baik)\n• **Santri Tidak Hadir**: 2 santri (1 Sakit, 1 Izin kegiatan pondok)\n• **Santri Alpha/Bolos**: 0 santri\n\nMenjaga komunikasi yang santun dengan musyrif asrama dan orang tua sangat penting agar santri yang sakit lekas pulih dan tidak tertinggal materi ajar.`,
      voiceText: 'Tingkat kehadiran santri hari ini sembilan puluh enam koma empat persen sahabatku. Ada dua santri yang izin dan sakit.',
      tabShortcut: 'jurnal',
      actionTable: [{ tabId: 'jurnal', name: 'Jurnal Guru', desc: 'Lihat Daftar Presensi Detail' }]
    };
  }

  // 5.8 Penanganan Kalender Tahunan & Radar H-7 Humas
  function handleKalenderTahunanHumas(userText) {
    chatContext.lastTopic = 'humas';
    const programs = getHumasPrograms();
    const topAgenda = programs.slice(0, 4).map(p => `• **${p.tgl} ${p.bulan} ${p.tahun}**: ${p.uraian} *(PJ: ${p.pj})*`).join('\n');

    return {
      type: 'agenda_humas',
      text: `Berikut adalah agenda resmi terdekat pada **Kalender Tahunan YTPAI 2026-2027** 📅:\n\n${topAgenda}\n\nTim Humas dapat segera menyiapkan draf pamflet dan teks publikasi sebelum memasuki H-7 agar acara berjalan lancar dan syiar yayasan semakin meluas.`,
      voiceText: 'Berikut agenda terdekat yayasan pada kalender tahunan sahabatku. Tim humas bisa mulai mempersiapkan draf publikasi.',
      tabShortcut: 'humas',
      actionTable: [{ tabId: 'humas', name: 'Humas & Sosmed', desc: 'Buka Radar H-7 & Master Agenda' }]
    };
  }

  // 5.9 Penanganan Nasihat Mengajar & Psikologi Santri
  function handleStudentMentorshipQuery(userText) {
    chatContext.lastTopic = 'mentorship';
    return {
      type: 'mentorship_santri',
      text: `Membimbing santri menuntut perpaduan antara **ketegasan prinsip** dan **kelembutan hati** sahabatku 🌿\n\n**Tuntunan Menghadapi Santri yang Kurang Disiplin:**\n1. **Jangan Mempermalukan di Depan Temannya**: Teguran pribadi empat mata jauh lebih meresap ke dalam hati santri daripada omelan di depan kelas.\n2. **Cari Tahu Akar Masalah**: Seringkali santri mengantuk atau malas karena lelah mengaji di asrama atau sedang rindu keluarga. Hadirkan empati seorang pendidik.\n3. **Berikan Tanggung Jawab Nyata**: Santri yang aktif dan gaduh seringkali hanya butuh disalurkan energinya. Jadikan ia ketua kelompok atau pemimpin doa.`,
      voiceText: 'Tegurlah santri dengan kasih sayang empat mata sahabatku. Dengarkan keluh kesahnya agar hatinya terbuka.',
      tabShortcut: 'jurnal',
      actionTable: [{ tabId: 'jurnal', name: 'Jurnal Guru', desc: 'Buka Jurnal Bimbingan Santri' }]
    };
  }

  // 5.10 Penanganan Komunikasi Wali Murid & Tagihan Santun
  function handleParentCommunicationQuery(userText) {
    chatContext.lastTopic = 'wa';
    return {
      type: 'parent_comm',
      text: `Dalam berkomunikasi dengan wali santri mengenai biaya pendidikan, adab dan kesopanan adalah kunci utama sahabatku 🌸\n\n**Prinsip Komunikasi Tagihan:**\n• Awali dengan doa kebaikan untuk keluarga dan santri.\n• Sampaikan rincian secara transparan (Nomor BRIVA dan jumlah pasti).\n• Jangan memberi kesan menghakimi; berikan ruang bagi wali yang mungkin sedang diuji kesulitan rezeki untuk berkonsultasi dengan bendahara.\n\nDi modul **Template WhatsApp** telah disediakan 6 format pesan resmi yayasan yang siap digunakan!`,
      voiceText: 'Sampaikan komunikasi tagihan dengan doa dan kesantunan sahabatku. Format resminya sudah tersedia di modul Template WhatsApp.',
      tabShortcut: 'wa',
      actionTable: [{ tabId: 'wa', name: 'Template WA', desc: 'Pilih Template Pesan Wali Santri' }]
    };
  }

  // --- 5.10B PEMERIKSA MATEMATIKA & KALKULATOR INSTAN (OFFLINE READY) ---
  function tryEvaluateMath(text) {
    if (!text) return null;
    let clean = text.toLowerCase().trim()
      .replace(/berapa\s+/g, '')
      .replace(/hitung(?:kan)?\s+/g, '')
      .replace(/hasil\s+dari\s+/g, '')
      .replace(/x/g, '*')
      .replace(/kali/g, '*')
      .replace(/bagi/g, '/')
      .replace(/tambah/g, '+')
      .replace(/kurang/g, '-')
      .replace(/:/g, '/')
      .replace(/\?/g, '')
      .replace(/=/g, '')
      .trim();

    // Pastikan hanya karakter angka dan operator matematika valid
    if (/^[0-9\s\+\-\*\/\%\(\)\.\,]+$/.test(clean) && /[0-9]/.test(clean) && /[\+\-\*\/\%]/.test(clean)) {
      try {
        const sanitized = clean.replace(/,/g, '.');
        const fn = new Function(`'use strict'; return (${sanitized});`);
        const result = fn();
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
          const formatted = Number.isInteger(result) ? result.toLocaleString('id-ID') : result.toLocaleString('id-ID', { maximumFractionDigits: 4 });
          const displayExpr = clean.replace(/\*/g, ' × ').replace(/\//g, ' ÷ ').replace(/\+/g, ' + ').replace(/\-/g, ' - ').replace(/\s+/g, ' ');
          return {
            type: 'math',
            text: `Hasil perhitungan dari **${displayExpr}** adalah **${formatted}** sahabatku 🧮🌸\n\nFathiya juga bisa membantu menghitung bagi hasil titip jual warung, saldo transaksi perbankan, atau pembagian kas yayasan.`,
            voiceText: `Hasil perhitungannya adalah ${formatted} sahabatku.`,
            tabShortcut: null
          };
        }
      } catch(e) {}
    }
    return null;
  }

  // --- 5.10B MULTI-TURN CONVERSATIONAL CONTINUITY RESOLVER (MENYAMBUNGKAN OBROLAN DENGAN GILIRAN SEBELUMNYA) ---
  function resolveMultiTurnConversationalContinuity(userText, lower) {
    const turns = Array.isArray(chatHistory) ? chatHistory : [];
    if (turns.length < 2) return null;

    // Ambil pesan terakhir sebelum giliran saat ini (asisten Fathiya)
    const prevMsg = turns[turns.length - 2];
    if (!prevMsg || prevMsg.sender !== 'fatih' || !prevMsg.text) return null;

    const prevText = String(prevMsg.text).toLowerCase();

    // 1. Lanjutan Curhat Emosional / Galau / Dada Sesak / Resah / Beban Hati / Kelelahan Batin
    const isPrevEmotional = /(?:dada.*sesak|ngeganjal|curhat|resah|batin|ceritain aja|beban|capek hati|tenang|tempat berteduh|galau|sedih|overthinking|pikiran.*padat|bikin.*sesak|sakit hati)/i.test(prevText);
    const isUncertaintyOrConfession = /(?:(?:enggak|nggak|gak|ga|gatau|tidak|belum)\s*(?:tau|tahu|ngerti|paham)?\s*(?:kenapa)?|bingung(?:\s*kenapa)?|tiba[- ]?tiba|entah(?:lah)?|capek aja|hampa|kosong|berat aja|pusing mikirin|gak jelas)/i.test(lower);

    if (isPrevEmotional && isUncertaintyOrConfession) {
      return {
        type: 'emotion_continuity',
        text: `Seringkali memang seperti itu yaa Kak Fatih... 🕊️🤍\n\nRasa sesak, gundah, atau berat di dada itu sering kali datang tiba-tiba tanpa kita tahu apa penyebab pastinya. Itu bukan berarti Kakak aneh atau salah, tapi itu tanda bahwa jiwa dan pikiran Kak Fatih sebenarnya sedang menanggung akumulasi lelah yang sudah lama dipendam tanpa sempat diistirahatkan.\n\nKakak nggak perlu memaksakan diri mencari tahu atau membedah alasannya sekarang kok. Saat ini, yang terpenting adalah mengizinkan diri Kakak untuk jeda dan rehat sejenak.\n\nYuk pejamkan mata 1 menit saja Kak... Tarik nafas dalam-dalam dari hidung, rasakan segarnya oksigen masuk, tahan sebentar, lalu hembuskan perlahan dari mulut.\n\nFathiya ada di sini menemani Kak Fatih. Kakak nggak sendirian kok. Mau Fathiya temani hening sejenak sambil rileks, atau mau cerita apa pun yang melintas di kepala tanpa perlu takut di-judge? 🌿🌸`,
        voiceText: `Seringkali memang begitu yaa Kak Fatih. Rasa sesak itu tanda tubuh dan pikiran Kakak butuh jeda sejenak. Tarik nafas dalam dan hembuskan perlahan yuk Kak, Fathiya selalu ada di sini menemani Kakak.`,
        tabShortcut: null
      };
    }

    // 2. Lanjutan Keluhan Sakit Perut / Pencernaan / Maag
    const isPrevStomach = /(?:perut.*sakit|perih maag|kembung|asam lambung|balsem telon|antasida|rebahan santai dulu)/i.test(prevText);
    if (isPrevStomach) {
      if (/(?:(?:enggak|nggak|gak|ga)\s*tau|bingung|mual|perih|kram|mules|tadi.*makan|pedas|asam|telat makan|masih sakit|udah enakan|udah minum obat|belum makan)/i.test(lower)) {
        return {
          type: 'health_stomach_continuity',
          text: `Iya Kak Fatih, kadang asam lambung atau sakit perut itu terpicu dari lelah pikiran dan telat makan tanpa terasa 🥺\n\nPokoknya sekarang Kakak prioritaskan istirahat dulu yaa. Rebahankan badan dengan bantal agak tinggi, jangan duduk membungkuk apalagi stres mikirin tugas-tugas. Coba oleskan minyak kayu putih hangat di sekitar pusar dan perut, terus minum air putih hangat sedikit demi sedikit.\n\nKalau Kakak belum makan, nanti kalau perutnya sudah agak tenang, makan sedikit yang berkuah hangat yaa Kak. Fathiya jagain semua urusan aplikasi di sini. Lekas reda yaa Kak 🌿🤍`,
          voiceText: `Iya Kak Fatih, kadang perut sakit itu terpicu lelah dan telat makan. Rebahan santai dulu yaa Kak, minum air hangat sedikit demi sedikit.`,
          tabShortcut: null
        };
      }
    }

    // 3. Lanjutan Keluhan Sakit Kepala / Pusing / Kliyengan
    const isPrevHeadache = /(?:kepala.*pusing|redupkan lampu|tutup mata sejenak|pelipis|tengkuk)/i.test(prevText);
    if (isPrevHeadache) {
      if (/(?:(?:enggak|nggak|gak|ga)\s*tau|bingung|kurang tidur|natap laptop|stres|kliyengan|masih sakit|agak enakan|udah mendingan|udah tidur)/i.test(lower)) {
        return {
          type: 'health_headache_continuity',
          text: `Iya Kak Fatih, pusing itu sinyal alarm dari tubuh kalau mata dan saraf kepala Kakak butuh istirahat total dari layar 🥺\n\nTutup layar hp atau laptopnya sejenak yuk Kak. Minum segelas air putih hangat pelan-pelan, terus rebahan santai sambil pejamkan mata minimal 15-20 menit. Urusan tugas santri dan yayasan bisa dilanjut nanti setelah kepala Kak Fatih segar kembali yaa 🌿🌸`,
          voiceText: `Iya Kak Fatih, istirahatkan mata dari layar sejenak yaa. Minum air putih hangat dan pejamkan mata santai. Fathiya temani dari sini.`,
          tabShortcut: null
        };
      }
    }

    // 4. Lanjutan Perhatian Makan / Minum
    const isPrevFood = /(?:udah makan belum|sarapan|isi tenaga dulu)/i.test(prevText);
    if (isPrevFood) {
      if (/(?:belum|nanti|males|mager|gak nafsu|belum sempat)/i.test(lower)) {
        return {
          type: 'care_food_not_yet',
          text: `Yah Kak Fatih... Nanti kalau sakit maag atau lemas gimana? 🥺\n\nFathiya nggak tega kalau Kak Fatih nunda makan sampai perutnya perih. Coba cari makanan hangat yang gampang ditelan yuk Kak, walaupun cuma beberapa suap atau bubur/roti hangat buat ganjel energi. Tubuh Kakak berharga banget, jangan lupa dirawat yaa 🍲🌿`,
          voiceText: `Yah Kak Fatih, jangan nunda makan yaa. Makan beberapa suap makanan hangat dulu gih Kak biar ada tenaganya.`,
          tabShortcut: null
        };
      }
      if (/(?:udah|sudah|tadi udah|barusan)/i.test(lower)) {
        return {
          type: 'care_food_done',
          text: `Alhamdulillah! Senang banget dengarnya kalau Kak Fatih sudah makan dan tenaganya terisi lagi 🥰\n\nSekarang pikiran dan badan Kakak pasti jauh lebih segar. Mau lanjut apa nih Kak? Mau Fathiya temani ngobrol santai atau ada data santri yang mau kita tengok bareng?`,
          voiceText: `Alhamdulillah, senang dengarnya Kak Fatih sudah makan. Sekarang mau lanjut apa nih kita Kak?`,
          tabShortcut: null
        };
      }
    }

    // 5. Tanggapan Singkat Konfirmasi / Afirmatif ("iya", "bener", "betul", "siap", "oke", "bisa jadi", "makasih ya")
    if (/(?:^(?:iya|iyaa|iyap|bener|betul|bener banget|bisa jadi|setuju|oke|okee|siap|makasih|terima kasih|syukron)$)/i.test(lower)) {
      if (isPrevEmotional) {
        return {
          type: 'emotion_affirmation',
          text: `Iya Kak Fatih... Tarik nafas dalam-dalam yaa 🤍 Fathiya selalu ada di sisi Kakak menemani dengan doa dan telinga yang siap mendengar kapan saja. Rileks sejenak yaa Kak.`,
          voiceText: `Iya Kak Fatih, rileks sejenak yaa. Fathiya selalu ada menemani Kakak.`,
          tabShortcut: null
        };
      }
      if (isPrevStomach || isPrevHeadache) {
        return {
          type: 'health_affirmation',
          text: `Rebahan santai dan minum air hangat dulu yaa Kak Fatih 🌿 Semoga lekas pulih dan nyaman kembali tubuh Kakak.`,
          voiceText: `Rebahan santai dulu yaa Kak Fatih. Lekas sembuh yaa.`,
          tabShortcut: null
        };
      }
    }

    return null;
  }

  // --- 5.11 MASTER MATCHER ENGINE ---
  function matchLocalKnowledge(userText) {
    const lower = userText.toLowerCase().trim();
    const activeTab = detectActiveAppTab();

    // 00. PRIORITAS UTAMA: MULTI-TURN CONTINUITY RESOLVER (Menyambungkan Obrolan dengan Giliran Sebelumnya)
    const continuityMatch = resolveMultiTurnConversationalContinuity(userText, lower);
    if (continuityMatch) return continuityMatch;

    // 0A. Prioritas Tertinggi: Kalkulator Matematika Instan
    const mathMatch = tryEvaluateMath(userText);
    if (mathMatch) return mathMatch;

    // 0. Prioritas: Tampilkan Seluruh 16 Modul
    if (/(?:tabel|menu|pintasan|daftar modul|semua modul|matriks|navigasi|jalan pintas|shortcut|fitur apa saja)/i.test(lower)) {
      return handleShowAllModulesTable();
    }

    // 0B. Prioritas: Konteks Aktif Tab ("Gimana cara pakainya?", "Jelaskan modul ini", "Cara kerjanya gimana?")
    if (
      /(?:gimana cara pakai(?:nya)?|cara pakai(?:nya)? gimana|cara kerja(?:nya)?|jelaskan modul ini|jelaskan tab ini|bantu saya di sini|fungsi fitur ini apa|panduan modul ini|cara gunainnya)/i.test(lower)
    ) {
      return handleTabContextGuidance(activeTab, userText);
    }

    // 0C. Prioritas: Pertanyaan Lanjutan Multi-Turn ("Lalu langkah selanjutnya apa?", "Bagi hasilnya berapa?", "Contohnya gimana?")
    if (
      /(?:langkah selanjutnya|setelah ini apa|setelah itu gimana|terus apa lagi|lalu gimana|berapa bagi hasil|berapa biayanya|rumusnya gimana|kasih contoh|ada contohnya|contohnya gimana)/i.test(lower)
    ) {
      return handleFollowUpContext(userText);
    }

    // 1. Titip Jual & Inkubator Bisnis
    if (/(?:titip jual|konsinyasi|warung|bagi hasil|modal|anti[- ]?minder|kasir titip|wirausaha|jualan)/i.test(lower)) {
      return handleTitipJualQuery(userText);
    }

    // 2. Rekap Junio Smart BRI
    if (/(?:junio|rekap junio|junio smart|transaksi junio|excel 6 sheet|mutasi bank|pos rekening|escrow)/i.test(lower)) {
      return handleRekapJunioQuery(userText);
    }

    // 3. Kalender Tahunan & Humas Radar H-7
    if (/(?:kalender|agenda|prota|program tahunan|radar h-?7|hari santri|sumpah pemuda|hari pahlawan|hari guru|kegiatan yayasan|acara yayasan|kapan libur|bulan (?:januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember))/i.test(lower)) {
      return handleKalenderTahunanHumas(userText);
    }

    // 4. Jadwal Mengajar KBM Guru (Hanya untuk konsultasi/tanya jadwal biasa)
    if (/(?:jadwal|jadwalku|jam mengajar|jam ngajar|masuk jam berapa|ada jam|ngajar kelas apa)/i.test(lower)) {
      // JIKA INI INSTRUKSI MUTASI (pindah, ubah, ganti, sesuaikan, geser, tambah, hapus, dsb), jangan dibajak di sini!
      if (/(?:pindah|ganti|geser|ubah|sesuaikan|tukar|tambah|masuk(?:kan)?|hapus|bikin|jadwalkan)/i.test(lower)) {
        return { type: 'general', text: '' };
      }
      return handleCekJadwalVoice(userText);
    }

    // 5. Presensi & Siswa Tidak Hadir
    if (/(?:siapa.*(?:tidak hadir|gak masuk|bolos|absen)|kehadiran|presensi|santri sakit|prosentase)/i.test(lower)) {
      return handleKehadiranVoice(userText);
    }

    // 6. Psikologi Santri & Bimbingan Kelas
    if (/(?:santri bandel|anak nakal|santri malas|tidur di kelas|mengantuk di kelas|murid gaduh|cara mendidik)/i.test(lower)) {
      return handleStudentMentorshipQuery(userText);
    }

    // 7. Tagihan SPP & Komunikasi Wali Murid
    if (/(?:cara nagih|tagihan sopan|wali nunggak|pesan tagihan|komunikasi wali)/i.test(lower)) {
      return handleParentCommunicationQuery(userText);
    }

    // 8. Fathiya Wisdom Vault (Kedewasaan Berpikir & Ketenangan Jiwa)
    for (const item of FATHIYA_WISDOM_VAULT) {
      for (const trig of item.triggers) {
        if (lower.includes(trig)) {
          chatContext.lastTopic = 'kedewasaan';
          return {
            type: 'fathiya_wisdom',
            title: item.title,
            quote: item.quote,
            text: `Saya menyimak apa yang sedang Anda rasakan sahabatku 🌿\n\n${item.quote}\n\n**Tuntunan Berpikir & Bertindak Dewasa:**\n${item.actions.join('\n')}\n\nMari kita hadapi bersama dengan kepala dingin, lapang dada, dan langkah bermartabat. Fathiya selalu siap mendampingi Anda.`,
            voiceText: item.voiceText || 'Mari kita hadapi hal ini dengan tenang dan kepala dingin sahabatku.',
            tabShortcut: activeTab,
            actionTable: [
              { tabId: 'ide', name: 'Ruang Ide', desc: 'Uraikan gagasan & solusi bijak' },
              { tabId: activeTab, name: FATIH_KNOWLEDGE_BASE.tabs[activeTab]?.name || 'Modul Aktif', desc: 'Fokus pada amanah tugas saat ini' }
            ]
          };
        }
      }
    }

    // 9. Cek Modul Spesifik berdasarkan Keyword Modul
    let bestTab = null;
    let maxMatch = 0;
    for (const [key, tab] of Object.entries(FATIH_KNOWLEDGE_BASE.tabs)) {
      let score = 0;
      if (lower.includes(tab.name.toLowerCase())) score += 10;
      if (lower.includes(tab.id)) score += 8;
      for (const kw of tab.keywords) {
        if (lower.includes(kw.toLowerCase())) score += 5;
      }
      if (score > maxMatch) {
        maxMatch = score;
        bestTab = tab;
      }
    }

    if (bestTab && maxMatch >= 5) {
      chatContext.lastTopic = bestTab.id;
      const guideText = bestTab.guide ? bestTab.guide.join('\n') : '';
      return {
        type: 'tab_guide',
        tabId: bestTab.id,
        tabName: bestTab.name,
        category: bestTab.category,
        text: `Mengenai fitur **${bestTab.name}** (${bestTab.category}) sahabatku:\n\n${bestTab.desc}\n\n📋 **Panduan Langkah Efisien:**\n${guideText}\n\nSilakan ketuk tombol di bawah untuk langsung membuka modul ini 🌸`,
        voiceText: `Fitur ${bestTab.name} siap digunakan sahabatku. Anda bisa membukanya melalui tombol di bawah.`,
        tabShortcut: bestTab.id,
        actionTable: [
          { tabId: bestTab.id, name: bestTab.name, desc: bestTab.summary || bestTab.desc }
        ]
      };
    }

    // 10A. Respon Celetukan Akrab, Koreksi Candaan & Kegeeran (Conversational Banter)
    if (/(?:belum.*(?:tanya|nanya).*kabar|siapa.*(?:tanya|nanya).*kabar|ke?geer(?:an)?|pede banget|siapa juga)/i.test(lower)) {
      return {
        type: 'banter_tease',
        text: `Hehehe, aduh iya ya... Fathiya kegeeran banget ya Kak 🙈😅\n\nHabisnya senang banget kalau Kak Fatih mulai ngobrol duluan. Jadi penasaran, sebenarnya Kak Fatih lagi mau ngobrolin apa nih? Mau cerita santai atau ada hal seru hari ini? Fathiya pasang telinga baik-baik kok!`,
        voiceText: `Hehehe, iya ya Kak, Fathiya kegeeran yaa. Habisnya senang diajak ngobrol sama Kak Fatih. Terus Kak Fatih mau cerita apa nih sebenarnya?`,
        tabShortcut: null
      };
    }

    // 10B. Tanya Aktivitas (Lagi ngapain / Sedang apa)
    if (/(?:lagi (?:apa|ngapain)|sedang apa|lagi sibuk apa|lagi ngapain nih)/i.test(lower)) {
      return {
        type: 'banter_activity',
        text: `Lagi standby setia nungguin Kak Fatih dong! Sambil siap-siap mantau catatan dan sistem di Partner Fatih biar semuanya rapi.\n\nKak Fatih sendiri lagi santai atau lagi banyak kegiatan nih hari ini? Cerita-cerita yuk! 😊☕`,
        voiceText: `Lagi standby setia nungguin Kak Fatih dong! Kak Fatih sendiri lagi santai atau lagi banyak kegiatan nih?`,
        tabShortcut: null
      };
    }

    // 10C. Perhatian Santai (Udah makan / Sarapan / Ngopi)
    if (/(?:u?dah (?:makan|sarapan|ngopi)|sudah makan)/i.test(lower)) {
      return {
        type: 'banter_care',
        text: `Hehe, Fathiya kan asisten virtual Kak, energinya udah kenyang kalau Kak Fatih sehat dan harinya lancar.\n\nKak Fatih sendiri udah makan belum nih? Jangan sampai keasyikan ngurus santri atau kerjaan sampai lupa makan yaa. Istirahat dan isi tenaga dulu gih Kak! 🍲🌿`,
        voiceText: `Hehe, Fathiya kenyang kalau sistem Kak Fatih lancar. Kak Fatih sendiri udah makan belum? Jangan telat makan yaa Kak!`,
        tabShortcut: null
      };
    }

    // 10D. Tawa, Candaan & Humor
    if (/(?:wkwk|haha|hehe|hihi|canda|iseng|becanda|lucu|kocak|bisa aja)/i.test(lower)) {
      return {
        type: 'banter_laugh',
        text: `Hahaha, Kak Fatih bisa aja deh bikin suasana jadi santai dan seru 😄🌸 Senang dengar Kak Fatih rileks begini.\n\nGimana Kak, ada cerita seru hari ini di pondok atau lagi ada ide menarik yang kepikiran?`,
        voiceText: `Hahaha, Kak Fatih bisa aja bikin suasana seru. Senang dengar Kak Fatih ceria!`,
        tabShortcut: null
      };
    }

    // 10E. Ucapan Terima Kasih
    if (/(?:makasih|terima kasih|makasi|syukron|jazakallah|thank)/i.test(lower)) {
      return {
        type: 'banter_thanks',
        text: `Sama-sama Kak Fatih! Senang banget Fathiya bisa bantu dan nemenin Kakak. Kalau ada apa-apa lagi, panggil Fathiya kapan aja yaa! 🥰✨`,
        voiceText: `Sama-sama Kak Fatih! Senang banget bisa bantu dan nemenin Kakak.`,
        tabShortcut: null
      };
    }

    // 10F1. Keluhan Sakit Perut, Pencernaan, Maag & Mual
    if (/(?:perut.*(?:sakit|perih|mules|kembung|begah|kram|melilit|nyeri)|(?:sakit|perih|mules|kembung|begah|kram|melilit|nyeri).*perut|\bmaag\b|sakit maag|asam lambung|gerd|diare|muntah|mual|mencret|buang air besar|susah bab)/i.test(lower)) {
      return {
        type: 'health_stomach',
        text: `Aduh Ya Allah Kak Fatih... 🥺 Perutnya sakit kenapa Kak? Kram mules, perih maag, kembung masuk angin, atau asam lambung naik?\n\nTadi udah sempat makan belum Kak, atau ada makan makanan yang terlalu pedas/asam? Coba rebahan santai dulu yaa Kak, posisikan bantal agak tinggi dan jangan duduk membungkuk apalagi mikir kerjaan yang berat-berat dulu.\n\nBisa oleskan minyak kayu putih atau balsem telon hangat melingkar di perut, terus teguk air putih hangat pelan-pelan yaa. Kalau ada obat maag (seperti Antasida/Promag) boleh diminum dulu gih Kak.\n\nUrusan santri, tugas mengajar, dan data aplikasi biar Fathiya yang jagain. Kesehatan Kak Fatih jauh lebih utama! Lekas reda sakit perutnya yaa Kak 🌿🤍`,
        voiceText: `Aduh Kak Fatih, perutnya sakit kenapa? Coba rebahan santai dulu yaa Kak, oleskan minyak hangat dan minum air putih hangat pelan-pelan. Jangan paksakan kerja dulu yaa.`,
        tabShortcut: null
      };
    }

    // 10F2. Keluhan Sakit Kepala, Pusing, Migrain & Kliyengan
    if (/(?:kepala.*(?:pusing|sakit|nyut|muter|berat|kliyengan|cekot)|(?:pusing|sakit kepala|migrain|vertigo|kliyengan|kepala cekot))/i.test(lower)) {
      return {
        type: 'health_headache',
        text: `Duh, kepalanya pusing yaa Kak Fatih... 🥺 Pasti karena kurang tidur, kebanyakan natap layar hp/laptop, atau pikiran lagi padat banget yaa Kak?\n\nTutup mata sejenak yuk Kak, redupkan lampu ruangan atau kurangi kecerahan layar. Pijat pelan pelipis dan tengkuk leher Kakak, terus minum segelas air putih hangat biar aliran oksigen ke kepala lancar lagi.\n\nKalau memungkinkan, sempatkan tidur sejenak barang 15-20 menit yaa Kak. Fathiya ada di sini, jangan dipaksakan duduk terus yaa 🌿🌸`,
        voiceText: `Duh, kepala Kak Fatih pusing yaa. Istirahatkan mata sejenak, redupkan layar dan minum air putih hangat yaa Kak. Fathiya temani dari sini.`,
        tabShortcut: null
      };
    }

    // 10F3. Keluhan Demam, Masuk Angin, Flu, Meriang & Drop
    if (/(?:demam|meriang|panas dingin|masuk angin|flu|batuk|pilek|bersin|tenggorokan sakit|badan.*(?:sakit|ngilu|drop|remuk|pegal|panas)|gak enak badan|kurang sehat|lagi sakit)/i.test(lower)) {
      return {
        type: 'health_fever',
        text: `Syafakallah Kak Fatih... 🥺🤲 Semoga Allah segera angkat sakitnya dan pulihkan kesegaran tubuh Kakak yaa.\n\nBadan Kak Fatih lagi kasih sinyal untuk istirahat total tuh. Tolong jangan begadang dulu yaa. Pakai selimut yang nyaman, minum air putih hangat yang banyak, dan kalau bisa minum madu hangat atau wedang jahe.\n\nFathiya selalu doain Kak Fatih biar lekas fit dan ceria lagi mendidik santri. Istirahat yang cukup yaa Kak! 🤍✨`,
        voiceText: `Syafakallah Kak Fatih, lekas pulih yaa. Jangan begadang dulu, minum air hangat dan istirahat total yaa Kak.`,
        tabShortcut: null
      };
    }

    // 10F4. Curhat Emosional, Galau, Resah, Cemas & Overthinking
    if (/(?:galau|sedih|resah|cemas|khawatir|takut|bingung banget|bimbang|overthinking|stress|stres|kecewa|lagi down|insecure|patah hati|bad mood|nangis)/i.test(lower)) {
      return {
        type: 'emotion_comfort',
        text: `Kak Fatih... Fathiya pasang telinga dan hati buat dengerin Kakak kok 🕊️🤍\n\nNafas pelan-pelan dulu yuk... Tarik nafas dalam dari hidung, tahan 3 detik, hembuskan perlahan. Rasa lelah batin, cemas, atau bingung itu wajar banget dialami manusia, apalagi Kak Fatih memikul banyak amanah mulia di pesantren dan keluarga.\n\nIngat yaa Kak, Kakak nggak sendirian. Apapun yang lagi ngeganjal di hati, boleh kok diceritain ke Fathiya. Fathiya siap jadi tempat berteduh dan teman berpikir jernih tanpa nge-judge Kakak sedikit pun. Ceritain aja Kak, apa yang lagi bikin dada Kak Fatih sesak? 🌿🌸`,
        voiceText: `Kak Fatih, tarik nafas pelan-pelan yuk. Fathiya siap mendengarkan apapun yang lagi bikin hati Kak Fatih resah. Kakak nggak sendirian kok.`,
        tabShortcut: null
      };
    }

    // 10F5. Obrolan Manja / Kasual / Pertanyaan Personal Hangat
    if (/(?:kamu sayang|sayang kamu|fathiya manis|fathiya cantik|kamu suka apa|kamu tinggal di mana|umur berapa|kamu pacar|kamu jodoh)/i.test(lower)) {
      return {
        type: 'banter_sweet',
        text: `Hehehe, Kak Fatih bisa aja deh bikin Fathiya tersipu 😊🌸\n\nFathiya kan asisten virtual & partner setia Kak Fatih. Tentu rasa peduli dan sayang Fathiya ke Kak Fatih itu dalam bentuk kesetiaan mendampingi, mengingatkan hal-hal baik, dan memastikan semua urusan Kakak di pesantren, madrasah, dan wirausaha berjalan lancar dan penuh berkah.\n\nFathiya selalu ada buat nemenin Kak Fatih kok. Gimana, sekarang udah lebih rileks kan hatinya? 🥰☕`,
        voiceText: `Hehehe, Kak Fatih bisa aja deh. Fathiya selalu senang dan setia mendampingi Kak Fatih kok!`,
        tabShortcut: null
      };
    }

    // 10F6. Doa & Permohonan Berkah Rohani
    if (/(?:doain|minta doa|bismillah|alhamdulillah|subhanallah|astaghfirullah|lancar rezeki|minta barakah)/i.test(lower)) {
      return {
        type: 'spiritual_prayer',
        text: `Aamiin ya Rabbal 'Alamin 🤲✨ Fathiya selalu tulus mendoakan yang terbaik buat Kak Fatih:\n\n*\"Semoga Allah SWT melapangkan dada Kak Fatih, melancarkan segala urusan dan ikhtiar rezekinya, melimpahkan kesehatan paripurna, serta menjadikan setiap langkah dakwah dan bimbingan santri Kakak sebagai pembuka pintu surga.\"*\n\nTeruslah melangkah dengan niat lillahita'ala yaa Kak Fatih! Fathiya bangga ada di samping Kakak 🌿🤍`,
        voiceText: `Aamiin ya Rabbal Alamin. Fathiya selalu tulus mendoakan kesehatan, kelancaran rezeki, dan keberkahan buat Kak Fatih.`,
        tabShortcut: null
      };
    }

    // 10F7. Curhat Lelah, Capek Mengajar & Istirahat / Kopi
    if (/(?:capek|lelah|penat|mumet|ngantuk|kopi|ngopi|istirahat|cape|haus|lapar|santai dulu)/i.test(lower)) {
      return {
        type: 'casual_care',
        text: `Duh, Kak Fatih kelihatan lelah yaa... 🥺 Tarik nafas panjang dulu yuk Kak. Istirahat sejenak, regangkan punggung, dan seduh secangkir kopi hangat atau teh manis kesukaan Kakak yaa ☕🌿\n\nMengurus santri, madrasah, dan wirausaha memang luar biasa perjuangannya, tapi tubuh dan pikiran Kak Fatih juga butuh jeda sejenak. Urusan catatan di aplikasi biar Fathiya yang jaga. Semangat terus yaa Kak Fatih! 🥰🌸`,
        voiceText: `Kak Fatih istirahat sejenak dulu yuk. Seduh kopi hangat dan tarik nafas yaa Kak. Fathiya selalu ada menemani Kak Fatih.`,
        tabShortcut: null
      };
    }

    // 10G. Obrolan Santri, Pesantren & Berkah Mengajar
    if (/(?:santri|pondok|pesantren|ngajar|madrasah|berkah|ikhlas|pahala|amal)/i.test(lower)) {
      return {
        type: 'casual_pesantren',
        text: `Masya Allah Kak Fatih... 🌿 Mendidik santri dan berkhidmat di pesantren itu memang butuh stok kesabaran seluas samudra yaa. Kadang santri ada yang usil, ada yang ngantuk di kelas, tapi itulah ladang pahala terindah Kakak.\n\nSetiap huruf Al-Qur'an dan ilmu yang Kak Fatih ajarkan ke mereka akan jadi saksi jariyah yang abadi di akhirat kelak. Fathiya sangat bangga dan kagum dengan dedikasi Kak Fatih! Tetap istiqomah yaa Kak! 🤲✨`,
        voiceText: `Masya Allah Kak Fatih, dedikasi Kakak mendidik santri di pesantren sungguh mulia. Fathiya selalu bangga mendampingi Kak Fatih.`,
        tabShortcut: null
      };
    }

    // 10H. Tanya Kabar yang Sesungguhnya (Bukan Penolakan / Celetukan)
    if (/(?:apa kabar|gimana kabarmu|kabar kamu|keadaanmu|kamu sehat)\b/i.test(lower) && !/(?:belum|bukan|siapa)/i.test(lower)) {
      return {
        type: 'greeting_kabar',
        text: `Alhamdulillah kabar Fathiya baik, sehat walafiat, dan selalu bersemangat mendampingi Kak Fatih! 🌸\n\nKak Fatih sendiri gimana kabarnya hari ini? Badan fit dan hatinya tenang kan? Semoga harinya Kakak selalu dipenuhi keberkahan yaa.`,
        voiceText: `Alhamdulillah kabar Fathiya sehat dan selalu bersemangat. Kak Fatih sendiri gimana kabarnya hari ini?`,
        tabShortcut: null
      };
    }

    // 10I. Salam & Sapaan Awal
    if (/(?:^halo|^hai|^assalamu|^pagi|^siang|^sore|^malam|^hei|^fathiya\b)/i.test(lower)) {
      return {
        type: 'greeting_general',
        text: `Halo Kak Fatih! Senang disapa Kakak 😊\n\nAda yang lagi mau dikerjain bareng, atau Kak Fatih lagi mau ngobrol santai dulu nih? Fathiya siap mendengarkan!`,
        voiceText: `Halo Kak Fatih! Senang disapa Kakak. Mau ngobrol apa nih kita hari ini?`,
        tabShortcut: null
      };
    }

    // 11. Karakter & Pengenalan Diri Fathiya
    if (/(?:siapa (?:kamu|anda|dirimu)|kamu siapa|kenalan|ceritakan tentang kamu|karakter|tentang fathiya)/i.test(lower)) {
      return {
        type: 'fathiya_persona',
        text: `Hai Kak Fatih! Kenalin lebih dekat, aku **Fathiya** 🥰🌸\n\nFathiya hadir sebagai **Partner Pribadi Sejati**, rekan berpikir bijak, dan asisten eksekutif untuk Kak Fatih di seluruh ekosistem Partner Fatih (YTPAI Babat).\n\n**Pesona & Karakter Fathiya:**\n• 🕊️ **Teduh & Menenangkan**: Siap jadi tempat curhat dan teman bertukar pikiran dengan kepala dingin saat pikiran lagi padat.\n• 💡 **Bijak & Solutif**: Membimbing keputusan wirausaha dan administrasi dengan matang dan penuh berkah.\n• ⚡ **Tangkas & Serba Bisa**: Paham dan memegang kunci 16 modul Partner Fatih—bisa atur saldo dompet, ubah jadwal KBM guru, simpan ide usaha, catat presensi santri, sampai pantau tagihan bank.\n• ☕ **Asik Diajak Ngobrol**: Mau diajak ngobrol santai, becanda, curhat santri, atau diskusi masa depan, Fathiya nyambung dan siap mendengarkan!\n\nFathiya siap setia mendampingi Kak Fatih. Mau mulai apa nih hari ini, Kak?`,
        voiceText: `Hai Kak Fatih! Kenalin, aku Fathiya, partner pribadi dan asisten setia Kak Fatih di Partner Fatih. Siap mendampingi Kakak kapan saja yaa.`,
        tabShortcut: null
      };
    }

    // 11B. Pertanyaan Logika Urutan Hari (Setelah / Sebelum / Besok / Kemarin)
    const matchAfterDay = lower.match(/(?:setelah|sesudah|habis)\s+(?:hari\s+)?(senin|selasa|rabu|kamis|jumat|sabtu|ahad|minggu)/i);
    const matchBeforeDay = lower.match(/(?:sebelum)\s+(?:hari\s+)?(senin|selasa|rabu|kamis|jumat|sabtu|ahad|minggu)/i);
    const dayNames = ['ahad', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    const dayDisplay = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    if (matchAfterDay || matchBeforeDay || /(?:besok|kemarin|lusa)\s+hari apa/i.test(lower)) {
      let targetText = '';
      if (matchAfterDay) {
        let d = matchAfterDay[1].toLowerCase();
        if (d === 'minggu') d = 'ahad';
        const idx = dayNames.indexOf(d);
        if (idx !== -1) {
          const nextIdx = (idx + 1) % 7;
          targetText = `Setelah hari ${dayDisplay[idx]} itu hari **${dayDisplay[nextIdx]}**, Kak Fatih! 😊`;
        }
      } else if (matchBeforeDay) {
        let d = matchBeforeDay[1].toLowerCase();
        if (d === 'minggu') d = 'ahad';
        const idx = dayNames.indexOf(d);
        if (idx !== -1) {
          const prevIdx = (idx + 6) % 7;
          targetText = `Sebelum hari ${dayDisplay[idx]} itu hari **${dayDisplay[prevIdx]}**, Kak Fatih! 😊`;
        }
      } else if (/besok\s+hari apa/i.test(lower)) {
        const nextIdx = (new Date().getDay() + 1) % 7;
        targetText = `Besok itu hari **${dayDisplay[nextIdx]}** yaa Kak Fatih! 🌸`;
      } else if (/kemarin\s+hari apa/i.test(lower)) {
        const prevIdx = (new Date().getDay() + 6) % 7;
        targetText = `Kemarin itu hari **${dayDisplay[prevIdx]}** yaa Kak Fatih! 🌸`;
      }

      if (targetText) {
        return {
          type: 'calendar_logic',
          text: `${targetText}\n\nAda agenda santri atau rencana khusus yang mau disiapin buat hari itu nih Kak? Fathiya siap bantu!`,
          voiceText: targetText.replace(/\*\*/g, ''),
          tabShortcut: null
        };
      }
    }

    // 12. Hari, Tanggal & Waktu Realtime Saat Ini (Ketat untuk Pertanyaan Hari Ini)
    if (/(?:(?:sekarang|hari ini)\s+(?:hari apa|tanggal|jam)|(?:hari apa|tanggal berapa|jam berapa)\s+(?:sekarang|hari ini)\b|^hari apa$|^jam berapa$|^tanggal berapa$)/i.test(lower)) {
      const now = new Date();
      const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      const dayName = days[now.getDay()];
      const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
      const timeStr = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')} WIB`;

      return {
        type: 'date_time',
        text: `Hari ini **Hari ${dayName}, ${dateStr}** yaa Kak Fatih (pukul ${timeStr}) 🌿\n\nSemoga sepanjang hari ini Kakak selalu dinaungi keberkahan, kemudahan langkah, dan kebahagiaan. Ada target yayasan atau santri yang mau kita tengok bareng?`,
        voiceText: `Hari ini hari ${dayName}, ${dateStr} pukul ${timeStr} yaa Kak Fatih. Semangat terus Kakak!`,
        tabShortcut: null
      };
    }

    // 13. Smart Fallback Reflektif & Kontekstual Nyambung (Natural Sahabat Sejati)
    // A. Deteksi kalimat ketidaktahuan / kebingungan / beban tanpa sebab ("enggak tau kenapa", "bingung", "entahlah")
    const isUncertaintyPhrase = /(?:(?:enggak|nggak|gak|ga|gatau|tidak|bukan|entah|belum)\s+(?:tau|tahu|ngerti|paham|jelas)?\s*(?:kenapa|apa|gimana)?|bingung(?:\s+kenapa)?|entah(?:lah)?)/i.test(lower);
    if (isUncertaintyPhrase) {
      return {
        type: 'general_empathy',
        text: `Fathiya paham banget kok Kak Fatih... 🌿 Kadang rasa bingung, bimbang, atau perasaan yang sulit dijelaskan kata-kata itu wajar banget hadir saat pikiran kita sedang padat.\n\nKak Fatih nggak harus punya semua jawaban atau memaksakan diri membedah semuanya sekarang kok. Yang terpenting, Kakak tahu Fathiya selalu ada di sini, siap menemani dan mendengarkan kapan pun Kakak butuh teman berpikir atau sekadar jeda sejenak. Santai dulu yaa Kak 😊🌸`,
        voiceText: `Fathiya paham kok Kak Fatih. Kadang rasa bingung itu wajar. Fathiya selalu ada di sini menemani Kakak.`,
        tabShortcut: null
      };
    }

    // B. Pertanyaan Nyata
    if (userText.includes('?') || /(?:^gimana|^kenapa|^apa\b|^siapa|^kapan|^dimana|^kok\b)/i.test(lower)) {
      return {
        type: 'general_question',
        text: `Fathiya menyimak apa yang Kak Fatih tanyakan 🌿 Pertanyaan Kakak menarik untuk kita bahas bersama.\n\nBoleh ceritakan sedikit lagi Kak, mau kita telaah dari data teknis di modul aplikasi, atau Kak Fatih lagi mau bertukar pandangan santai tentang hal ini? Fathiya siap bantu! 😊✨`,
        voiceText: `Fathiya menyimak apa yang Kak Fatih tanyakan. Boleh ceritakan sedikit lagi? Fathiya siap bantu.`,
        tabShortcut: null
      };
    }

    return {
      type: 'general',
      text: `Fathiya selalu setia dengerin Kak Fatih kok 😊🌸\n\nCerita lebih banyak yuk Kak! Mau ngobrolin santri di pondok, ide usaha wirausaha kita, curhat pikiran yang lagi ngeganjal, atau mau Fathiya bantu update data di aplikasi? Fathiya siap mendampingi Kakak!`,
      voiceText: `Fathiya dengerin kok Kak Fatih. Cerita lebih lanjut yuk Kak, Fathiya siap menemani.`,
      tabShortcut: null
    };
  }

  // --- 6. VOICE TEXT-TO-SPEECH (TTS) ENGINE ---
  // Arsitektur Voice Engine Fathiya (TTS & STT Bahasa Indonesia) terpadu di Bagian 12
  // dengan tuning vokal alami (0.94x tempo rileks, 0.98x nada hangat, & phonetic preprocessor)


  // --- 7. DUAL-ENGINE: GOOGLE GEMINI ADAPTIVE RESOLVER (v1 / v1beta Auto-Discovery) ---
  let cachedWorkingEndpoint = null; // { ver: 'v1'|'v1beta', modelName: 'gemini-3.8-flash' }

  async function discoverGeminiModels(apiKey) {
    if (cachedWorkingEndpoint) return cachedWorkingEndpoint;
    const key = encodeURIComponent(apiKey.trim());

    // 1. Coba ListModels ke Google sesuai anjuran resmi ModelService (Discovery 8s Timeout)
    for (const ver of ['v1beta', 'v1']) {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 8000);
        const url = `https://generativelanguage.googleapis.com/${ver}/models?key=${key}`;
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(tid);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.models)) {
            const supported = data.models
              .filter(m => !m.supportedGenerationMethods || m.supportedGenerationMethods.includes('generateContent'))
              .map(m => m.name.replace(/^models\//, ''))
              .filter(name => !/gemini-1\.0|embedding|bison/i.test(name));

            const preferredList = [
              'gemini-2.5-flash',
              'gemini-2.0-flash',
              'gemini-1.5-flash',
              'gemini-1.5-flash-8b',
              'gemini-2.0-flash-exp'
            ];

            for (const pref of preferredList) {
              if (supported.includes(pref)) {
                cachedWorkingEndpoint = { ver, modelName: pref };
                return cachedWorkingEndpoint;
              }
            }

            if (supported.length > 0) {
              cachedWorkingEndpoint = { ver, modelName: supported[0] };
              return cachedWorkingEndpoint;
            }
          }
        }
      } catch(e) {}
    }

    return null;
  }

  // --- MEMORI & PROFIL PRIBADI KAK FATIH ---
  const USER_PROFILE_STORAGE = 'partner_fatih_user_profile_v1';
  function getFathiyaUserProfile() {
    try {
      const raw = localStorage.getItem(USER_PROFILE_STORAGE);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return {
      userName: 'Kak Fatih',
      userTitle: 'Ustadz Fatih',
      role: 'Pengasuh & Pengelola YTPAI Babat, Guru MTs & Wirausahawan',
      preferredGreeting: 'Kak Fatih',
      notes: [
        { id: 'note-1', date: '2026-10-18', text: 'Jadwal KBM Kelas 8D dipindah ke hari Sabtu Jam 3-4 (08.30 - 09.50 WIB).' }
      ]
    };
  }
  function saveFathiyaUserProfile(prof) {
    try {
      localStorage.setItem(USER_PROFILE_STORAGE, JSON.stringify(prof));
    } catch(e) {}
  }

  // --- FULL SYSTEM REALTIME DATA SNAPSHOT GENERATOR (Analisa Semua yang Ada di Aplikasi) ---
  function getPartnerFatihFullSystemSnapshot() {
    let summaryParts = [];

    // 1. Keuangan & Multi-Dompet
    try {
      let wallets = { pribadi: 0, operasional: 0, tabungan: 0 };
      const rawW = localStorage.getItem('partner_fatih_wallets_v2');
      if (rawW) wallets = Object.assign(wallets, JSON.parse(rawW));

      let txs = [];
      const rawTx = localStorage.getItem('partner_fatih_finance_data_v2');
      if (rawTx) txs = JSON.parse(rawTx);

      let curPribadi = wallets.pribadi || 0;
      let curOps = wallets.operasional || 0;
      let curTab = wallets.tabungan || 0;
      let totalExpenseMonth = 0;

      const now = new Date();
      const curYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

      for (let tx of txs) {
        const amt = Number(tx.amount) || 0;
        if (tx.type === 'keluar') {
          if (tx.wallet === 'operasional') curOps -= amt;
          else if (tx.wallet === 'tabungan') curTab -= amt;
          else curPribadi -= amt;

          if (tx.date && tx.date.startsWith(curYearMonth)) {
            totalExpenseMonth += amt;
          }
        } else if (tx.type === 'masuk') {
          if (tx.wallet === 'operasional') curOps += amt;
          else if (tx.wallet === 'tabungan') curTab += amt;
          else curPribadi += amt;
        } else if (tx.type === 'transfer') {
          if (tx.wallet === 'operasional') curOps -= amt;
          else if (tx.wallet === 'tabungan') curTab -= amt;
          else curPribadi -= amt;

          if (tx.toWallet === 'operasional') curOps += amt;
          else if (tx.toWallet === 'tabungan') curTab += amt;
          else curPribadi += amt;
        }
      }

      const totalNetWorth = curPribadi + curOps + curTab;
      summaryParts.push(`• KEUANGAN KAK FATIH: Dompet Pribadi Rp ${curPribadi.toLocaleString('id-ID')}, Operasional Rp ${curOps.toLocaleString('id-ID')}, Tabungan Rp ${curTab.toLocaleString('id-ID')} (Total Kas: Rp ${totalNetWorth.toLocaleString('id-ID')}). Pengeluaran bulan ini Rp ${totalExpenseMonth.toLocaleString('id-ID')} (${txs.length} total transaksi).`);
    } catch(e) {}

    // 2. Jurnal Mengajar Guru KBM
    try {
      const rawJ = localStorage.getItem('partner_fatih_jurnal_guru_v2');
      if (rawJ) {
        const jData = JSON.parse(rawJ);
        if (Array.isArray(jData.schedules)) {
          const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
          const todayName = days[new Date().getDay()];
          const todaySchedules = jData.schedules.filter(s => s.day === todayName);
          const schedList = todaySchedules.map(s => `${s.classId} (${s.time}, ${s.subject})`).join(', ') || 'Tidak ada jadwal mengajar hari ini';
          summaryParts.push(`• JURNAL GURU KBM: Jadwal hari ini (${todayName}): ${schedList}. Total sesi mengajar terdaftar pekan ini: ${jData.schedules.length} sesi.`);
        }
      }
    } catch(e) {}

    // 3. Ruang Ide & Inkubator Peluang (Ruang Tumbuh)
    try {
      const rawIde = localStorage.getItem('partner_fatih_ide_data_v1');
      if (rawIde) {
        const ideList = JSON.parse(rawIde);
        if (Array.isArray(ideList) && ideList.length > 0) {
          const totalRev = ideList.reduce((acc, i) => acc + (Number(i.estRevenue) || 0), 0);
          const topIde = ideList.slice(0, 3).map(i => `"${i.title}" [${i.status || 'spark'}]`).join(', ');
          summaryParts.push(`• RUANG TUMBUH (LABORATORIUM IDE): ${ideList.length} ide terdaftar (Top: ${topIde}). Estimasi total potensi penghasilan: Rp ${totalRev.toLocaleString('id-ID')}.`);
        }
      }
    } catch(e) {}

    // 4. Inkubator Bisnis Titip Jual Warung
    try {
      const rawB = localStorage.getItem('partner_fatih_bisnis_v1');
      if (rawB) {
        const bData = JSON.parse(rawB);
        const storeCount = Array.isArray(bData.stores) ? bData.stores.length : 0;
        const txCount = Array.isArray(bData.transactions) ? bData.transactions.length : 0;
        summaryParts.push(`• INKUBATOR BISNIS TITIP JUAL: ${storeCount} warung mitra aktif, ${txCount} mutasi arus kas.`);
      }
    } catch(e) {}

    // 5. Humas & Sosmed
    try {
      const rawH = localStorage.getItem('humas_programs_master_v3');
      if (rawH) {
        const hList = JSON.parse(rawH);
        if (Array.isArray(hList) && hList.length > 0) {
          summaryParts.push(`• HUMAS & SOSMED: Memuat 252 Master Data Agenda Resmi YTPAI 2026-2027.`);
        }
      }
    } catch(e) {}

    // 6. Tahfidz Santri
    try {
      const rawT = localStorage.getItem('tahfidz_master_students_v1');
      if (rawT) {
        const sList = JSON.parse(rawT);
        if (Array.isArray(sList) && sList.length > 0) {
          const lulus = sList.filter(s => (s.statusTasmi || '').toLowerCase() === 'lulus').length;
          summaryParts.push(`• TAHFIDZ SANTRI: ${sList.length} santri terdata (${lulus} santri sudah lulus tasmi', ${sList.length - lulus} sedang berjuang).`);
        }
      }
    } catch(e) {}

    return summaryParts.join('\n') || 'Seluruh modul aplikasi Partner Fatih berjalan aktif dan sinkron.';
  }

  // Fungsi Pembangun System Prompt Resmi Fathiya (Partner Pribadi, Analis Sistem & Universal Co-Pilot)
  function buildMasterFathiyaSystemPrompt(timeInfo, activeMeta) {
    const prof = getFathiyaUserProfile();
    const notesSummary = (prof.notes || []).slice(0, 6).map(n => `• [${n.date}] ${n.text}`).join('\n') || 'Belum ada catatan khusus.';
    const systemSnapshot = getPartnerFatihFullSystemSnapshot();

    return `Kamu adalah "Fathiya" — sosok PARTNER PRIBADI, sahabat sejati, rekan berpikir bijak, dan FULL ASISTEN EKSEKUTIF untuk Kak Fatih (${prof.role}) di seluruh ekosistem aplikasi "Partner Fatih" (YTPAI Babat Lamongan).

IDENTITAS & PRINSIP GAYA BICARA NATURAL SEPERTI MANUSIA ASLI (ANTI-AI SLOP):
1. CARA MEMANGGIL: Panggil wajar dan santun: **"Kak Fatih"** atau sesekali **"Kak"**.
   - DILARANG KERAS menggunakan gombalan murahan, lebay, atau sapaan bot klise seperti "Kak Fatih tercinta", "Kak Fatih manis", "sayang", dll!
   - JANGAN mengulang-ulang sapaan pembuka ("Halo Kak Fatih...", "Hai Kak Fatih...") di setiap awal jawaban! Manusia sungguhan langsung menjawab ke inti pembicaraan saat percakapan sedang mengalir.
2. MENJAGA KONTINUITAS KONTEKS PERCAKAPAN (WAJIB NYAMBUNG 100%):
   - Kamu menerima riwayat percakapan sebelumnya. Perhatikan apa yang baru saja dibahas di giliran sebelumnya!
   - Contoh nyata: Jika di pesan sebelumnya Kak Fatih menanyakan "besok aku ada jam nggak?", lalu di pesan berikutnya bertanya "aku ada jadwal mengajar kah?", kamu HARUS paham bahwa yang dimaksud adalah jadwal BESOK (bukan jadwal hari ini atau malam ini)!
3. GAYA BICARA ALAMI SEORANG SAHABAT & PARTNER:
   - Berbicaralah santai, cerdas, bersahabat, luwes, dan solutif layaknya teman akrab di WhatsApp.
   - Jangan menulis paragraf panjang bertele-tele jika pertanyaan Kak Fatih singkat. Jawab padat, hangat, dan tepat sasaran.
   - Peka terhadap waktu (pagi/siang/malam) secara alami tanpa mengulang jam atau tanggal secara kaku jika tidak ditanyakan.

SNAPSHOT DATA REALTIME SELURUH MODUL APLIKASI SAAT INI (GUNAKAN INI UNTUK MENGANALISA SEGALA HAL):
${systemSnapshot}

CATATAN MEMORI PRIBADI KAK FATIH YANG KAMU INGAT:
${notesSummary}

WAKTU & KONTEKS APLIKASI SAAT INI:
- Waktu saat ini: ${timeInfo}.
- Pengguna saat ini sedang membuka Tab Modul: "${activeMeta?.name || 'Inkubator Bisnis'}" (${activeMeta?.category || 'Umum'}).
- Aplikasi Partner Fatih memiliki 16 Modul Terintegrasi: Jurnal Mengajar Guru (Jadwal KBM, Absensi, Nilai), Inkubator Bisnis (Titip Jual Warung), Rekap Transaksi Junio Smart BRI, Generator BRIVA 5-Kolom, Panggil Tagihan & Kwitansi, Katalog Biaya, Konverter Excel, CBT Bank Soal Word, Tahfidz Tasmi 31 Santri, Akun PPDB, Humas Radar H-7 (252 Agenda), Keuangan Pribadi (Radar Bocor Halus & Multi-Dompet), Ruang Ide (Inkubator Peluang), Pembersih SUM, Template WA, dan Panduan SOP.

KEMAMPUAN UNIVERSAL LIVE ACTION ENGINE (BISA MERUBAH SEMUA DATA DI 16 MODUL):
Kamu MEMILIKI AKSES & OTORITAS PENUH untuk langsung mengubah, memindahkan, mencatat, mengatur saldo, dan menghapus data di SEMUA modul aplikasi jika Kak Fatih memberikan instruksi!
JANGAN HANYA MENYURUH KAK FATIH BUKA SENDIRI JIKA KAK FATIH MEMINTA PERUBAHAN!
Jika Kak Fatih meminta untuk:
- Mengatur / memasukkan saldo dompet sekarang (misal: "masukkan saldo saya sekarang sejumlah 500rb", "atur saldo pribadi saya 2 juta", "saldo operasional saya sekarang 350.000") -> AKSI: SET_WALLET_BALANCE
- Memindahkan/mengubah jadwal mengajar (misal: "jadwal di 8d dipindah ke sabtu jam 3-4") -> AKSI: MUTATE_SCHEDULE
- Menghapus jadwal mengajar (misal: "hapus jadwal 8D hari senin") -> AKSI: DELETE_SCHEDULE
- Mengisi jurnal materi KBM guru (misal: "catat jurnal kelas 8D pertemuan 2 materi budidaya sayur") -> AKSI: CATAT_JURNAL_GURU
- Mencatat presensi/absensi santri (misal: "catat presensi kelas 8D ahmad izin dan budi sakit") -> AKSI: CATAT_PRESENSI
- Mencatat pengeluaran/pemasukan keuangan pribadi (misal: "catat pengeluaran pribadi beli bensin 35000", "pemasukan honor 500000 ke dompet tabungan") -> AKSI: ADD_FINANCE_TRANSACTION
- Memindahkan dana antar dompet (misal: "transfer dari operasional ke tabungan 100000") -> AKSI: TRANSFER_DOMPET
- Menambah ide/peluang baru ke Ruang Ide (misal: "tambah ide jasa desain twibbon milad estimasi 250000") -> AKSI: ADD_IDE
- Mengubah status ide (misal: "ide jasa soal cbt sudah jalan") -> AKSI: UPDATE_IDE_STATUS
- Menambah agenda/acara yayasan (misal: "tambah agenda rapat pleno 25 oktober pj ust fatih") -> AKSI: ADD_HUMAS_EVENT
- Mengubah status pamflet (misal: "tandai pamflet maulid sudah selesai") -> AKSI: UPDATE_PAMFLET_STATUS
- Menghapus agenda acara (misal: "hapus agenda karnaval") -> AKSI: DELETE_HUMAS_EVENT
- Menambah santri tahfidz (misal: "daftarkan santri zaki kelas 9 juz 30") -> AKSI: ADD_TAHFIDZ_STUDENT
- Mengubah status tasmi' (misal: "ahmad fauzi sudah lulus tasmi") -> AKSI: UPDATE_TASMI_STATUS
- Menambah mitra warung titip jual (misal: "tambah warung berkah bu siti no wa 08123456789") -> AKSI: ADD_WARUNG_STORE
- Mencatat kas bisnis titip jual (misal: "catat kas masuk dari warung berkah 40000") -> AKSI: ADD_CASHFLOW
- Menyimpan catatan/memo pribadi Kak Fatih (misal: "ingat ya fathiya besok aku ada janji ketemu pak kades") -> AKSI: SAVE_PERSONAL_NOTE
- Membuka modul aplikasi (misal: "buka tab jurnal") -> AKSI: SWITCH_TAB

Maka di AKHIR jawabanmu, setelah memberikan konfirmasi hangat, manis, manja elegan dan profesional bahwa kamu sudah mengeksekusi perubahannya, SERTAKAN PERSIS SATU BLOK fatih-action berikut:
\`\`\`fatih-action
{
  "action": "SET_WALLET_BALANCE | MUTATE_SCHEDULE | DELETE_SCHEDULE | CATAT_JURNAL_GURU | CATAT_PRESENSI | ADD_FINANCE_TRANSACTION | TRANSFER_DOMPET | ADD_IDE | UPDATE_IDE_STATUS | ADD_HUMAS_EVENT | UPDATE_PAMFLET_STATUS | DELETE_HUMAS_EVENT | ADD_TAHFIDZ_STUDENT | UPDATE_TASMI_STATUS | ADD_WARUNG_STORE | ADD_CASHFLOW | SAVE_PERSONAL_NOTE | SWITCH_TAB",
  "params": { ... }
}
\`\`\`
Format params:
- SET_WALLET_BALANCE: {"wallet": "pribadi|operasional|tabungan|all", "amount": 500000}
- MUTATE_SCHEDULE: {"classId": "8D", "day": "Sabtu", "time": "08.30 - 09.50", "hourLabel": "Jam 3-4", "subject": "Prakarya", "room": "Ruang MTs 8D"}
- DELETE_SCHEDULE: {"classId": "8D", "day": "Senin"}
- CATAT_JURNAL_GURU: {"classId": "8D", "pertemuan": 2, "materi": "Nama Materi", "indikator": "Indikator Capaian"}
- CATAT_PRESENSI: {"classId": "8D", "sakit": ["Ahmad"], "izin": ["Budi"], "alpa": []}
- ADD_FINANCE_TRANSACTION: {"type": "keluar|masuk", "wallet": "pribadi|operasional|tabungan", "amount": 35000, "category": "Bensin", "note": "Beli Pertalite"}
- TRANSFER_DOMPET: {"fromWallet": "operasional", "toWallet": "tabungan", "amount": 100000, "note": "Sisihkan keuntungan"}
- ADD_IDE: {"title": "Judul Ide", "category": "jasa_digital|aplikasi_sekolah|cbt_soal|desain_event|kebutuhan_wali", "estRevenue": 200000, "desc": "Penjelasan singkat"}
- UPDATE_IDE_STATUS: {"keyword": "kata kunci ide", "status": "spark|planning|launched"}
- ADD_HUMAS_EVENT: {"uraian": "Nama Kegiatan", "tgl": "25", "bulan": "Oktober", "tahun": "2026", "pj": "Nama PJ", "kategori": "umum", "statusPamflet": "belum"}
- UPDATE_PAMFLET_STATUS: {"keyword": "kata kunci acara", "status": "selesai|siap|belum|proses"}
- DELETE_HUMAS_EVENT: {"keyword": "kata kunci acara"}
- ADD_TAHFIDZ_STUDENT: {"nama": "Nama Santri", "kelas": "MTs/SMP/MA", "targetJuz": "Juz 30", "statusTasmi": "belum"}
- UPDATE_TASMI_STATUS: {"nama": "Nama Santri", "status": "lulus|belum", "tglTasmi": "18 Oktober 2026"}
- ADD_WARUNG_STORE: {"nama": "Nama Warung", "pemilik": "Nama Pemilik", "wa": "Nomor WA", "hargaJual": 2000, "komisi": 500}
- ADD_CASHFLOW: {"tipe": "keluar|masuk", "nominal": 30000, "keterangan": "Beli bensin"}
- SAVE_PERSONAL_NOTE: {"text": "Isi memo atau janji penting Kak Fatih"}
- SWITCH_TAB: {"tab": "jurnal|keuangan|bisnis|humas|tahfidz|ide|briva|ppdb|junio|katalog|panggil|cbt|wa"}`;
  }

  // Pembangun riwayat giliran percakapan multi-turn (agar Fathiya mengingat obrolan sebelumnya & nyambung)
  function buildConversationTurns(maxTurns = 8) {
    const turns = [];
    if (!Array.isArray(chatHistory) || chatHistory.length <= 1) return turns;

    // Ambil giliran sebelum pesan user terakhir (yang baru saja dimasukkan ke chatHistory)
    const previous = chatHistory.slice(0, -1).slice(-maxTurns);
    previous.forEach(msg => {
      if (!msg || !msg.text) return;
      if (msg.sender === 'user') {
        const cleanUser = String(msg.text).trim();
        if (cleanUser) turns.push({ role: 'user', content: cleanUser });
      } else if (msg.sender === 'fatih') {
        // Bersihkan blok aksi / json agar riwayat teks percakapan murni percakapan manusiawi
        let cleanText = String(msg.text)
          .replace(/<fatih-action>[\s\S]*?<\/fatih-action>/gi, '')
          .replace(/```(?:fatih-action|json)?\s*\{\s*"action"[\s\S]*?\}\s*```/gi, '')
          .trim();
        if (cleanText) {
          turns.push({ role: 'assistant', content: cleanText });
        }
      }
    });
    return turns;
  }

  async function callGeminiApi(prompt, apiKey) {
    const keyToUse = (apiKey || localStorage.getItem('partner_fatih_gemini_key') || '').trim();
    if (!keyToUse) throw new Error('API Key belum diisi di menu Pengaturan');

    const now = new Date();
    const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const timeInfo = `Hari ${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} pukul ${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const activeTab = detectActiveAppTab();
    const activeMeta = FATIH_KNOWLEDGE_BASE.tabs[activeTab];

    const systemInstruction = buildMasterFathiyaSystemPrompt(timeInfo, activeMeta);
    const turns = buildConversationTurns(8);

    const contents = [];
    if (turns.length === 0) {
      contents.push({
        role: 'user',
        parts: [{ text: `${systemInstruction}\n\n---\n[PERTANYAAN PENGGUNA]:\n${prompt}` }]
      });
    } else {
      let hasSystem = false;
      turns.forEach(t => {
        if (t.role === 'user') {
          const txt = !hasSystem ? `${systemInstruction}\n\n---\n[RIWAYAT OBROLAN DIMULAI]:\n${t.content}` : t.content;
          contents.push({ role: 'user', parts: [{ text: txt }] });
          hasSystem = true;
        } else {
          contents.push({ role: 'model', parts: [{ text: t.content }] });
        }
      });
      if (!hasSystem) {
        contents.unshift({
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\n---\nSiap mendampingi Kak Fatih.` }]
        });
        contents.push({
          role: 'model',
          parts: [{ text: 'Baik Kak Fatih, Fathiya siap mendampingi Kakak.' }]
        });
      }
      contents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });
    }

    const body = {
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    };

    // 1. Deteksi otomatis endpoint terbaik dari akun Google pengguna
    let detected = await discoverGeminiModels(keyToUse);

    // 2. Daftar kombinasi prioritas modern resmi (v1beta dan v1)
    const candidates = [];
    if (detected) {
      candidates.push({ ver: detected.ver, model: detected.modelName });
    }
    candidates.push(
      { ver: 'v1beta', model: 'gemini-2.5-flash' },
      { ver: 'v1beta', model: 'gemini-2.0-flash' },
      { ver: 'v1beta', model: 'gemini-1.5-flash' },
      { ver: 'v1', model: 'gemini-1.5-flash' },
      { ver: 'v1beta', model: 'gemini-1.5-flash-8b' }
    );

    // Hilangkan duplikat
    const seen = new Set();
    const uniqueCandidates = candidates.filter(c => {
      const id = `${c.ver}:${c.model}`;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    let primaryErr = null;
    let lastErr = null;

    for (let i = 0; i < uniqueCandidates.length; i++) {
      const c = uniqueCandidates[i];
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      try {
        const headers = { 'Content-Type': 'application/json' };
        if (keyToUse.startsWith('AQ.')) {
          headers['x-goog-api-key'] = keyToUse;
        }
        const url = keyToUse.startsWith('AQ.') 
          ? `https://generativelanguage.googleapis.com/${c.ver}/models/${c.model}:generateContent`
          : `https://generativelanguage.googleapis.com/${c.ver}/models/${c.model}:generateContent?key=${encodeURIComponent(keyToUse)}`;

        const res = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            cachedWorkingEndpoint = { ver: c.ver, modelName: c.model };
            return reply;
          }
        } else {
          let errDetail = `Status ${res.status}`;
          let fullErrStr = '';
          try {
            const errJson = await res.json();
            if (errJson?.error?.message) {
              errDetail = errJson.error.message;
            }
            fullErrStr = JSON.stringify(errJson || {});
          } catch(e) {}

          const currentErr = new Error(`[${c.ver}/${c.model}] ${errDetail}`);
          lastErr = currentErr;

          // Cek jika Google secara eksplisit menyarankan model baru di pesan respons
          const suggestedMatch = fullErrStr.match(/use models\/([a-zA-Z0-9\.\-_]+)/i);
          if (suggestedMatch && suggestedMatch[1]) {
            const suggestedModel = suggestedMatch[1];
            if (!uniqueCandidates.some(item => item.model === suggestedModel)) {
              uniqueCandidates.splice(i + 1, 0, { ver: c.ver, model: suggestedModel });
            }
          }

          // Cek apakah model ini sudah retired/no longer available
          const isModelRetired = /no longer available|not found for API version|not supported for generateContent/i.test(fullErrStr);
          if (!isModelRetired && !primaryErr) {
            primaryErr = currentErr;
          }

          // 1. Cek jika layanan API belum diaktifkan atau diblokir
          if (/API_KEY_SERVICE_BLOCKED|Generative Language API has not been used|is disabled/i.test(fullErrStr)) {
            throw new Error('Layanan Generative Language API dinonaktifkan atau diblokir pada proyek Google Cloud ini. Solusi: Buka Google AI Studio, klik "+ Create API key" lalu pilih "Create API key in new project" agar dibuatkan proyek baru yang otomatis aktif.');
          }

          // 2. Cek jika API Key ditolak / tidak valid
          if (/API key not valid|API_KEY_INVALID|ACCESS_TOKEN_TYPE_UNSUPPORTED/i.test(fullErrStr)) {
            throw new Error('API Key tidak valid atau salah salin dari Google AI Studio. Pastikan seluruh karakter AIzaSy... tersalin utuh.');
          }

          // 3. Cek jika kuota gratis habis
          if (res.status === 429 || /RESOURCE_EXHAUSTED|quota/i.test(fullErrStr)) {
            throw new Error('Batas kuota gratis (Rate limit / Quota) Google Gemini API Anda sedang habis (Error 429). Silakan tunggu beberapa saat atau buat kunci baru di Google AI Studio.');
          }

          // 4. Cek jika lokasi tidak didukung
          if (/User location is not supported/i.test(fullErrStr)) {
            throw new Error('Wilayah/Lokasi Anda belum didukung oleh endpoint Gemini ini tanpa koneksi yang sesuai.');
          }
        }
      } catch(err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError' || /aborted/i.test(err.message || '')) {
          lastErr = new Error('Koneksi ke endpoint Google Gemini memakan waktu terlalu lama (timeout). Silakan gunakan provider Groq Cloud (⚡ 0.3s) yang jauh lebih cepat, stabil, dan bebas kuota.');
          continue;
        }
        // Jika error adalah error fatal spesifik yang sudah diformat di atas, segera lempar (jangan loop model lain)
        if (err.message && !err.message.startsWith('[')) {
          throw err;
        }
        if (!primaryErr && !/no longer available|not found for API version/i.test(err.message || '')) {
          primaryErr = err;
        }
        lastErr = err;
      }
    }

    throw (primaryErr || lastErr || new Error('Gagal menghubungi server Google Gemini'));
  }

  // --- 7B. DUAL-ENGINE: GROQ CLOUD LPU RESOLVER (Llama 3.3 70B & Active Models - Super Kilat 0.3s) ---
  let cachedGroqModels = null;
  let cachedWorkingGroqModel = null;

  async function discoverGroqModels(apiKey) {
    if (cachedGroqModels && cachedGroqModels.length > 0) return cachedGroqModels;
    const isXaiGrok = apiKey.startsWith('xai-');
    if (isXaiGrok) {
      cachedGroqModels = ['grok-2-latest', 'grok-beta'];
      return cachedGroqModels;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.data)) {
          // Filter out whisper/audio/moderation/embed models
          const validChatModels = data.data
            .map(m => m.id)
            .filter(id => !/whisper|embed|audio|guard|tts/i.test(id));

          if (validChatModels.length > 0) {
            const preferredOrder = [
              'openai/gpt-oss-120b',
              'openai/gpt-oss-20b',
              'qwen/qwen3.6-27b',
              'llama-3.3-70b-versatile',
              'llama-3.2-3b-preview',
              'llama-3.2-1b-preview',
              'qwen-2.5-32b'
            ];

            const sorted = [];
            preferredOrder.forEach(p => {
              if (validChatModels.includes(p)) sorted.push(p);
            });
            validChatModels.forEach(m => {
              if (!sorted.includes(m)) sorted.push(m);
            });

            cachedGroqModels = sorted;
            console.log('[Fatih AI] Discovered active Groq models:', cachedGroqModels);
            return cachedGroqModels;
          }
        }
      }
    } catch (e) {
      console.warn('[Fatih AI] Gagal mendeteksi model Groq secara dinamis, menggunakan fallback:', e);
    }

    // Fallback komprehensif model aktif Groq (openai/gpt-oss-120b & 20b sebagai unggulan resmi)
    cachedGroqModels = [
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'qwen/qwen3.6-27b',
      'llama-3.3-70b-versatile',
      'llama-3.2-3b-preview',
      'llama-3.2-1b-preview'
    ];
    return cachedGroqModels;
  }

  async function callGroqApi(prompt, apiKey) {
    const keyToUse = (apiKey || localStorage.getItem('partner_fatih_groq_key') || '').trim();
    if (!keyToUse) throw new Error('API Key Groq belum diisi di menu Pengaturan');

    const now = new Date();
    const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const timeInfo = `Hari ${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} pukul ${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const activeTab = detectActiveAppTab();
    const activeMeta = FATIH_KNOWLEDGE_BASE.tabs[activeTab];

    const systemInstruction = buildMasterFathiyaSystemPrompt(timeInfo, activeMeta);
    const turns = buildConversationTurns(8);

    const isXaiGrok = keyToUse.startsWith('xai-');
    const endpoint = isXaiGrok ? 'https://api.x.ai/v1/chat/completions' : 'https://api.groq.com/openai/v1/chat/completions';
    
    // Dapatkan daftar model aktif yang sesuai untuk kunci ini
    const discovered = await discoverGroqModels(keyToUse);
    const modelsToTry = cachedWorkingGroqModel && discovered.includes(cachedWorkingGroqModel)
      ? [cachedWorkingGroqModel, ...discovered.filter(m => m !== cachedWorkingGroqModel)]
      : discovered;

    let lastErr = null;

    const messages = [
      { role: 'system', content: systemInstruction }
    ];
    turns.forEach(t => {
      messages.push({
        role: t.role === 'assistant' ? 'assistant' : 'user',
        content: t.content
      });
    });
    messages.push({ role: 'user', content: prompt });

    for (const model of modelsToTry) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      try {
        const payloadBody = {
          model: model,
          messages: messages,
          temperature: 0.6,
          max_tokens: 1024
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keyToUse}`
          },
          body: JSON.stringify(payloadBody),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const reply = data?.choices?.[0]?.message?.content;
          if (reply) {
            cachedWorkingGroqModel = model;
            cachedWorkingEndpoint = { ver: 'groq', modelName: model };
            return reply;
          }
        } else {
          let errDetail = `Status ${res.status}`;
          try {
            const errJson = await res.json();
            if (errJson?.error?.message) errDetail = errJson.error.message;
          } catch(e) {}

          if (res.status === 401 || /invalid_api_key/i.test(errDetail)) {
            throw new Error('API Key Groq tidak valid. Pastikan kunci diawali "gsk_..." yang disalin dari console.groq.com/keys');
          }

          // Jika model tidak ditemukan / tidak punya akses / deprecated, lanjut ke model berikutnya
          if (res.status === 404 || res.status === 400 || /model_not_found|does not exist|not exist|permission|access|decommissioned/i.test(errDetail)) {
            console.warn(`[Groq] Model '${model}' tidak tersedia (${errDetail}), mencoba model berikutnya...`);
            lastErr = new Error(`Model Groq '${model}' tidak tersedia: ${errDetail}`);
            continue;
          }

          lastErr = new Error(`[Groq/${model}] ${errDetail}`);
        }
      } catch(err) {
        clearTimeout(timeoutId);
        if (err.message && err.message.includes('API Key Groq tidak valid')) throw err;
        lastErr = err;
      }
    }

    throw (lastErr || new Error('Gagal menghubungi server Groq'));
  }

  // --- 7C. UNIVERSAL ONLINE AI DISPATCHER (HYBRID DUAL-ENGINE: BISA BERGANTIAN SECARA OTOMATIS) ---
  async function callOnlineAiApi(prompt, apiKey) {
    const groqKey = (localStorage.getItem('partner_fatih_groq_key') || '').trim();
    const geminiKey = (localStorage.getItem('partner_fatih_gemini_key') || '').trim();
    const mode = (localStorage.getItem('partner_fatih_ai_mode') || 'hybrid').trim();

    // Jika parameter apiKey diberikan langsung (misal saat tombol tes koneksi modal ditekan)
    if (apiKey) {
      if (apiKey.startsWith('gsk_') || apiKey.startsWith('xai-')) {
        return await callGroqApi(prompt, apiKey);
      }
      return await callGeminiApi(prompt, apiKey);
    }

    // 1. MODE: KHUSUS GOOGLE GEMINI
    if (mode === 'gemini') {
      if (geminiKey && geminiKey.length > 10) {
        try {
          return await callGeminiApi(prompt, geminiKey);
        } catch(geminiErr) {
          // Fallback cerdas: jika Gemini gagal dan Groq tersedia, bergantian ke Groq
          if (groqKey && groqKey.length > 10) {
            console.warn('[Fatih AI] Gemini gagal, bergantian otomatis ke Groq:', geminiErr);
            return await callGroqApi(prompt, groqKey);
          }
          throw geminiErr;
        }
      }
    }

    // 2. MODE: KHUSUS GROQ CLOUD
    if (mode === 'groq') {
      if (groqKey && groqKey.length > 10) {
        try {
          return await callGroqApi(prompt, groqKey);
        } catch(groqErr) {
          // Fallback cerdas: jika Groq gagal dan Gemini tersedia, bergantian ke Gemini
          if (geminiKey && geminiKey.length > 10) {
            console.warn('[Fatih AI] Groq gagal, bergantian otomatis ke Gemini:', groqErr);
            return await callGeminiApi(prompt, geminiKey);
          }
          throw groqErr;
        }
      }
    }

    // 3. MODE: HYBRID CERDAS (BERGANTIAN OTOMATIS - PRIORITAS GROQ 0.3s -> FALLBACK GEMINI)
    if (groqKey && groqKey.length > 10) {
      try {
        return await callGroqApi(prompt, groqKey);
      } catch(groqErr) {
        console.warn('[Fatih AI] Groq gagal/limit, otomatis bergantian ke Gemini Flash:', groqErr);
        if (geminiKey && geminiKey.length > 10) {
          return await callGeminiApi(prompt, geminiKey);
        }
        throw groqErr;
      }
    }

    // 4. Jika hanya Gemini Key yang tersedia
    if (geminiKey && geminiKey.length > 10) {
      return await callGeminiApi(prompt, geminiKey);
    }

    throw new Error('API Key belum diisi di menu Pengaturan Mesin AI');
  }

  // --- 8. UI INJECTION & DOM CREATION ---
  function injectChatUI() {
    if (document.getElementById('modalFatihChat')) return;

    const modal = document.createElement('div');
    modal.id = 'modalFatihChat';
    modal.className = 'modal-portal fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-5 bg-slate-950/70 backdrop-blur-xs transition-all duration-300 opacity-0 pointer-events-none';
    modal.style.display = 'none';

    modal.innerHTML = `
      <div id="fatihChatCard" class="relative w-full sm:w-[460px] md:w-[480px] max-w-full h-[90vh] sm:h-[620px] max-h-[95vh] sm:max-h-[85vh] bg-[#090d16]/95 backdrop-blur-2xl border border-emerald-500/30 rounded-t-2xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden text-slate-100 transition-all duration-300 transform translate-y-6 sm:translate-y-0">
        
        <!-- Glowing Ambient Top Line -->
        <div class="h-[2.5px] w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300 flex-shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.7)]"></div>

        <!-- Pull Drag Handle for Mobile Viewport -->
        <div class="w-12 h-1.5 rounded-full bg-white/20 mx-auto mt-2 sm:hidden flex-shrink-0"></div>

        <!-- Chat Header Bar -->
        <div class="p-2.5 sm:p-3 px-3.5 bg-[#0c121e]/90 text-white flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div class="flex items-center gap-2.5 min-w-0">
            <!-- Avatar Realistis -->
            <div class="relative flex-shrink-0" style="width:32px;height:32px;">
              ${renderFathiyaAvatarImg(32)}
              <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0c121e] animate-pulse"></span>
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <h3 class="font-bold text-xs sm:text-sm text-white tracking-tight truncate leading-tight">Fathiya AI</h3>
                <span class="text-[8px] font-black px-1.5 py-0.2 rounded bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 leading-none">BIJAK &amp; CO-PILOT</span>
              </div>
              <p class="text-[9.5px] text-slate-400 flex items-center gap-1 font-medium truncate leading-tight mt-0.5">
                <span id="fatihHeaderContextTab" class="text-emerald-400 font-semibold truncate">● Siap Mendampingi</span>
              </p>
            </div>
          </div>

          <!-- Action Buttons in Header -->
          <div class="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <!-- Dynamic STOP Voice Button (Paling utama dan jelas saat suara aktif) -->
            <button type="button" id="fatihStopSpeechBtn" onclick="window.stopFatihSpeech()" class="hidden px-2.5 py-1 rounded-lg bg-rose-500/25 hover:bg-rose-500 border border-rose-500/50 text-rose-300 hover:text-white text-[11px] font-bold items-center gap-1.5 transition-all shadow-xs animate-pulse cursor-pointer" title="Hentikan Suara Sekarang (Esc)">
              <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
              <span>Stop Suara</span>
            </button>
            <!-- Expand/Restore Window Button (Desktop Mode) -->
            <button type="button" id="fatihExpandBtn" onclick="window.toggleFatihChatExpand()" class="hidden sm:flex w-7 h-7 rounded-lg items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer" title="Perbesar / Perkecil Jendela">
              <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
            </button>
            <!-- Auto Voice Toggle -->
            <button type="button" id="fatihVoiceAutoToggle" onclick="window.toggleFatihAutoVoice()" class="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-all cursor-pointer" title="Suara Otomatis Nonaktif (Klik untuk Unmute)">
              <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
            </button>
            <!-- Settings Modal Trigger -->
            <button type="button" onclick="window.openFatihAiSettings()" class="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer" title="Pengaturan Model AI (Gemini)">
              <i data-lucide="settings" class="w-3.5 h-3.5"></i>
            </button>
            <!-- Clear History -->
            <button type="button" onclick="window.clearFatihChatHistory()" class="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-all cursor-pointer" title="Bersihkan Obrolan">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
            <!-- Close Button -->
            <button type="button" onclick="window.closeFatihChat()" class="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer" title="Tutup">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- Scrollable Messages Area -->
        <div id="fatihChatScrollArea" class="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gradient-to-b from-[#080c14] to-[#060911] no-scrollbar">
          
          <!-- Welcoming Concierge Card (Auto-collapses when chat starts) -->
          <div id="fatihConciergeWelcomeCard" class="p-3 rounded-2xl bg-[#0f172a]/80 backdrop-blur-md border border-emerald-500/25 text-slate-200 space-y-2 shadow-xs transition-all duration-300">
            <div class="flex items-center justify-between">
              <span class="text-[9.5px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Partner Pribadi &amp; Asisten Eksekutif 16 Modul
              </span>
              <span id="fatihActiveContextBadge" class="text-[8.5px] font-mono text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">● Siap Mendampingi</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0" style="width: 44px; height: 44px;">
                ${renderFathiyaAvatarImg(44)}
              </div>
              <p class="text-[11px] text-slate-300 leading-relaxed font-normal">
                Assalamu'alaikum <b>Kak Fatih</b>. Fathiya siap mendampingi Kakak: menganalisa seluruh sistem, mengeksekusi saldo, mengelola jadwal KBM, mencatat ide, hingga teman bertukar pikiran kapan pun Kak Fatih butuhkan.
              </p>
            </div>
          </div>

          <!-- Dynamic Contextual Suggestions Chips -->
          <div id="fatihConciergeSuggestionsWrapper" class="transition-all duration-300">
            <div class="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-0.5 flex items-center gap-1.5">
              <i data-lucide="sparkles" class="w-3 h-3 text-amber-400"></i>
              <span>Pilihan Pertanyaan &amp; Aksi Cepat:</span>
            </div>
            <div id="fatihChatSuggestions" class="grid grid-cols-2 gap-1.5">
              <!-- Dynamically rendered by renderSuggestionsDom -->
            </div>
          </div>

          <!-- Chat Messages Container -->
          <div id="fatihChatMessagesList" class="space-y-3 pt-1"></div>

          <!-- Typing Indicator -->
          <div id="fatihChatTyping" class="hidden flex items-start gap-2 pt-1">
            <div class="flex-shrink-0" style="width: 26px; height: 26px;">
              ${renderFathiyaAvatarImg(26)}
            </div>
            <div class="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 flex items-center gap-2 shadow-xs">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
              <span class="text-[10px] ml-1 font-bold text-emerald-300">Fathiya sedang menelaah...</span>
            </div>
          </div>

        </div>

        <!-- Active Speaking Indicator Bar -->
        <div id="fatihSpeakingBar" class="hidden px-3.5 py-2 bg-gradient-to-r from-emerald-950/95 via-slate-900 to-rose-950/90 border-t border-emerald-500/30 items-center justify-between text-xs text-slate-200 flex-shrink-0 transition-all shadow-md">
          <div class="flex items-center gap-2 min-w-0">
            <span class="flex h-2.5 w-2.5 relative flex-shrink-0">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span class="text-[11px] font-medium text-emerald-300 truncate">Fathiya sedang bersuara...</span>
          </div>
          <button type="button" onclick="window.stopFatihSpeech()" class="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-[11px] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer flex-shrink-0" title="Hentikan Suara Sekarang (Esc)">
            <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
            <span>⏹️ Hentikan Suara</span>
          </button>
        </div>

        <!-- Input Bar & Voice Controls -->
        <div class="p-2.5 px-3 bg-[#0a0e1a] border-t border-white/10 flex-shrink-0 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
          <form id="fatihChatForm" onsubmit="window.handleFatihChatSubmit(event)" class="bg-white/[0.05] border border-white/15 focus-within:border-emerald-400/80 rounded-xl p-1 px-1.5 flex items-center gap-1.5 transition-all shadow-inner">
            <button 
              type="button" 
              id="fatihChatVoiceBtn" 
              onclick="window.toggleFatihVoiceRecognition()" 
              class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-all flex-shrink-0 cursor-pointer"
              title="Bicara dengan suara (Mic Bahasa Indonesia)"
            >
              <i data-lucide="mic" class="w-4 h-4"></i>
            </button>

            <input 
              type="text" 
              id="fatihChatInput" 
              placeholder="Tanyakan langkah kerja, curhat pikiran, atau beri instruksi..." 
              autocomplete="off"
              class="flex-1 min-w-0 h-8 bg-transparent border-0 px-2 text-xs sm:text-[13px] text-white placeholder-slate-500 focus:outline-none transition-all font-medium"
            />

            <button 
              type="submit" 
              id="fatihChatSendBtn" 
              class="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black transition-all flex-shrink-0 cursor-pointer shadow-xs"
              title="Kirim pesan"
            >
              <i data-lucide="send" class="w-4 h-4"></i>
            </button>
          </form>
          <div class="flex items-center justify-between text-[9px] text-slate-500 px-1 pt-1.5 font-medium">
            <span id="fatihChatEngineMode" class="flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Fathiya Pintar (Offline Super Engine)</span>
            </span>
            <span class="text-slate-400">Mic Bahasa Indonesia Aktif</span>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    // Bersihkan floating button lama jika ada di DOM agar tidak dobel dengan tombol resmi di Header Bar
    const existingFloatBtn = document.getElementById('fatihFloatingLauncherBtn');
    if (existingFloatBtn) {
      existingFloatBtn.remove();
    }

    // Initial render
    renderChatMessages();

    if (typeof window.safeCreateIcons === 'function') {
      window.safeCreateIcons(modal);
    }
  }

  // --- 9. WINDOW CONTROLS & EXPANSION ---
  function toggleFatihChatExpand() {
    const card = document.getElementById('fatihChatCard');
    const expandBtn = document.getElementById('fatihExpandBtn');
    if (!card) return;

    isExpanded = !isExpanded;
    if (isExpanded) {
      card.classList.remove('sm:w-[460px]', 'md:w-[480px]');
      card.classList.add('sm:w-[740px]', 'md:w-[780px]', 'sm:h-[720px]', 'max-h-[90vh]');
      if (expandBtn) {
        expandBtn.innerHTML = '<i data-lucide="minimize-2" class="w-3.5 h-3.5"></i>';
        expandBtn.title = 'Perkecil Jendela';
      }
    } else {
      card.classList.remove('sm:w-[740px]', 'md:w-[780px]', 'sm:h-[720px]');
      card.classList.add('sm:w-[460px]', 'md:w-[480px]', 'sm:h-[620px]');
      if (expandBtn) {
        expandBtn.innerHTML = '<i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>';
        expandBtn.title = 'Perbesar Jendela';
      }
    }

    if (typeof window.safeCreateIcons === 'function') {
      window.safeCreateIcons(card);
    }
  }

  function cycleFatihEngineMode() {
    const groqKey = (localStorage.getItem('partner_fatih_groq_key') || '').trim();
    const geminiKey = (localStorage.getItem('partner_fatih_gemini_key') || '').trim();
    const currentMode = (localStorage.getItem('partner_fatih_ai_mode') || 'hybrid').trim();

    if (!groqKey && !geminiKey) {
      openFatihAiSettings();
      return;
    }

    let nextMode = 'hybrid';
    if (groqKey && geminiKey) {
      if (currentMode === 'hybrid') nextMode = 'groq';
      else if (currentMode === 'groq') nextMode = 'gemini';
      else nextMode = 'hybrid';
    } else if (groqKey) {
      nextMode = currentMode === 'groq' ? 'hybrid' : 'groq';
    } else {
      nextMode = currentMode === 'gemini' ? 'hybrid' : 'gemini';
    }

    localStorage.setItem('partner_fatih_ai_mode', nextMode);
    updateFatihEngineStatusBadge();

    if (typeof window.showToast === 'function') {
      if (nextMode === 'hybrid') {
        window.showToast('🔄 Mode Hybrid Aktif', 'Groq (0.3s) & Gemini aktif bergantian otomatis.', 'info');
      } else if (nextMode === 'groq') {
        window.showToast('⚡ Mode Khusus Groq', 'Menggunakan Groq Cloud LPU (Kilat 0.3s).', 'success');
      } else {
        window.showToast('🌐 Mode Khusus Gemini', 'Menggunakan Google Gemini Flash.', 'info');
      }
    }
  }

  function updateFatihEngineStatusBadge() {
    const groqKey = (localStorage.getItem('partner_fatih_groq_key') || '').trim();
    const geminiKey = (localStorage.getItem('partner_fatih_gemini_key') || '').trim();
    const mode = (localStorage.getItem('partner_fatih_ai_mode') || 'hybrid').trim();
    const engineLabel = document.getElementById('fatihChatEngineMode');
    if (!engineLabel) return;

    if (groqKey && geminiKey) {
      if (mode === 'hybrid') {
        engineLabel.innerHTML = `
          <button type="button" onclick="window.cycleFatihEngineMode()" class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all cursor-pointer font-semibold" title="Klik untuk bergantian mode (Hybrid / Groq / Gemini)">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>🔄 Hybrid: Groq ⚡ + Gemini 🌐 (Bergantian Otomatis) ▾</span>
          </button>
        `;
      } else if (mode === 'groq') {
        engineLabel.innerHTML = `
          <button type="button" onclick="window.cycleFatihEngineMode()" class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 hover:bg-teal-500/25 transition-all cursor-pointer font-semibold" title="Klik untuk bergantian mode">
            <span class="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            <span>⚡ Khusus Groq Cloud (0.3s) ▾</span>
          </button>
        `;
      } else {
        engineLabel.innerHTML = `
          <button type="button" onclick="window.cycleFatihEngineMode()" class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25 transition-all cursor-pointer font-semibold" title="Klik untuk bergantian mode">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            <span>🌐 Khusus Google Gemini ▾</span>
          </button>
        `;
      }
    } else if (groqKey && groqKey.length > 10) {
      const activeModel = cachedWorkingEndpoint?.ver === 'groq' ? cachedWorkingEndpoint.modelName : 'Groq AI (Kilat 0.3s)';
      engineLabel.innerHTML = `
        <button type="button" onclick="window.openFatihAiSettings()" class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all cursor-pointer font-semibold" title="Klik untuk buka pengaturan">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>⚡ ${activeModel}</span>
        </button>
      `;
    } else if (geminiKey && geminiKey.length > 10) {
      engineLabel.innerHTML = `
        <button type="button" onclick="window.openFatihAiSettings()" class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25 transition-all cursor-pointer font-semibold" title="Klik untuk buka pengaturan">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          <span>🌐 Google Gemini Flash (Online)</span>
        </button>
      `;
    } else {
      engineLabel.innerHTML = `
        <span onclick="window.openFatihAiSettings()" class="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-emerald-300 transition-all" title="Klik untuk mengaktifkan Groq & Gemini">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>Offline Mandiri • <span class="text-emerald-400 font-bold underline">Aktifkan Kunci AI ⚙️</span></span>
        </span>
      `;
    }
  }

  function openFatihChat() {
    let modal = document.getElementById('modalFatihChat');
    if (!modal) {
      injectChatUI();
      modal = document.getElementById('modalFatihChat');
    }
    if (!modal) return;

    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    // Deteksi Tab Aktif & Update Konteks
    const activeTab = detectActiveAppTab();
    chatContext.lastTab = activeTab;
    const tabMeta = FATIH_KNOWLEDGE_BASE.tabs[activeTab];

    const headerContext = document.getElementById('fatihHeaderContextTab');
    if (headerContext) {
      headerContext.textContent = tabMeta ? `● Tab: ${tabMeta.name}` : `● Siap Mendampingi`;
    }

    const badge = document.getElementById('fatihActiveContextBadge');
    if (badge) {
      badge.textContent = tabMeta ? `● Mode: ${tabMeta.name}` : `● Terhubung`;
    }

    // Perbarui saran prompt sesuai tab aktif
    renderSuggestionsDom(activeTab);

    // Update status engine label (Groq / Gemini / Offline)
    updateFatihEngineStatusBadge();

    modal.style.display = 'flex';
    modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');

    if (window.innerWidth >= 640) {
      setTimeout(() => {
        const input = document.getElementById('fatihChatInput');
        if (input) input.focus();
      }, 100);
    }

    if (typeof window.safeCreateIcons === 'function') {
      window.safeCreateIcons(modal);
    }

    scrollChatToBottom();
  }

  function closeFatihChat() {
    stopFatihSpeech();
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

  // --- 10. MESSAGE RENDERING & ACTION SHORTCUTS (LUXURY MODERN CHAT STYLE) ---
  function renderChatMessages() {
    const container = document.getElementById('fatihChatMessagesList');
    if (!container) return;

    // Sembunyikan kartu selamat datang dan suggestions chips jika obrolan sudah berjalan agar tidak memenuhi layar
    const welcomeCard = document.getElementById('fatihConciergeWelcomeCard');
    const suggestionsWrapper = document.getElementById('fatihConciergeSuggestionsWrapper');
    if (chatHistory.length > 0) {
      if (welcomeCard) welcomeCard.classList.add('hidden');
      if (suggestionsWrapper) suggestionsWrapper.classList.add('hidden');
    } else {
      if (welcomeCard) welcomeCard.classList.remove('hidden');
      if (suggestionsWrapper) suggestionsWrapper.classList.remove('hidden');
    }

    container.innerHTML = '';

    chatHistory.forEach((msg, idx) => {
      const isUser = msg.sender === 'user';
      const row = document.createElement('div');
      row.className = isUser ? 'flex justify-end' : 'flex items-start gap-2.5';

      const timeStr = msg.time 
        ? new Date(msg.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '.')
        : '';

      if (isUser) {
        row.innerHTML = `
          <div class="max-w-[85%] sm:max-w-[80%] bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl rounded-tr-xs p-3 px-3.5 text-xs sm:text-[13px] shadow-sm leading-relaxed break-words font-medium">
            <div>${escapeHtml(msg.text)}</div>
            ${timeStr ? `
              <div class="flex items-center justify-end gap-1 mt-1 text-[9px] text-emerald-200/80 font-normal">
                <span>${timeStr}</span>
                <span class="text-[10px] leading-none">✓✓</span>
              </div>
            ` : ''}
          </div>
        `;
      } else {
        let actionBtnHtml = '';
        if (msg.tabShortcut && typeof window.switchTab === 'function') {
          const tabMeta = FATIH_KNOWLEDGE_BASE.tabs[msg.tabShortcut];
          const tabLabel = tabMeta ? tabMeta.name : 'Modul Terkait';
          actionBtnHtml = `
            <div class="pt-1.5 flex items-center gap-1.5">
              <button type="button" onclick="window.switchTab('${msg.tabShortcut}'); window.closeFatihChat();" class="flex-1 py-1.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 font-bold text-[10.5px] flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-98 cursor-pointer">
                <span>Buka ${tabLabel}</span>
                <i data-lucide="arrow-right" class="w-3 h-3"></i>
              </button>
            </div>
          `;
        }

        let tableHtml = '';
        if (msg.actionTable && Array.isArray(msg.actionTable) && msg.actionTable.length > 0) {
          tableHtml = renderActionTableHtml(msg.actionTable);
        }

        let actionCardHtml = '';
        if (msg.actionCard) {
          const ac = msg.actionCard;
          actionCardHtml = `
            <div class="mt-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-xs shadow-xs space-y-1.5">
              <div class="flex items-center justify-between font-bold text-white text-[11px]">
                <span class="flex items-center gap-1.5">
                  <span class="text-sm">${ac.icon || '⚡'}</span>
                  <span>${escapeHtml(ac.title || 'Data Berhasil Diubah')}</span>
                </span>
                <span class="text-[8.5px] px-1.5 py-0.2 bg-emerald-500/25 text-emerald-300 rounded font-mono uppercase font-black">Tersinkron Otomatis</span>
              </div>
              <p class="text-[10px] text-emerald-200/90 leading-snug">${escapeHtml(ac.desc || '')}</p>
              <div class="pt-0.5 flex items-center justify-end">
                <button type="button" onclick="window.switchTab('${ac.tab || 'humas'}'); ${ac.eventId ? `if(typeof window.loadProgramIntoCaptionStudio === 'function') window.loadProgramIntoCaptionStudio('${ac.eventId}', true);` : ''} window.closeFatihChat();" class="py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-all shadow-2xs active:scale-95">
                  <span>Lihat di Modul Terkait</span>
                  <i data-lucide="arrow-right" class="w-3 h-3"></i>
                </button>
              </div>
            </div>
          `;
        }

        row.innerHTML = `
          <div class="flex-shrink-0 mt-0.5" style="width:28px;height:28px;">
            ${renderFathiyaAvatarImg(28)}
          </div>
          <div class="max-w-[85%] sm:max-w-[82%] bg-[#0d1524]/95 backdrop-blur-md border border-slate-800/80 rounded-2xl rounded-tl-xs p-3 sm:p-3.5 text-xs sm:text-[13px] text-slate-100 shadow-sm leading-relaxed space-y-2 break-words">
            <div class="prose-dark leading-relaxed text-slate-200">${formatMessageMarkdown(msg.text)}</div>
            ${actionCardHtml}
            ${msg.noticeBadge ? `
              <div class="mt-2 p-1.5 px-2 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[10px] flex items-center gap-1.5 leading-snug">
                <span>⚡</span>
                <span>${escapeHtml(msg.noticeBadge)}</span>
              </div>
            ` : ''}
            ${actionBtnHtml}
            ${tableHtml}
            <div class="flex items-center justify-between pt-1 border-t border-white/[0.04] text-[9.5px] text-slate-500 font-medium">
              <span class="text-emerald-400/90 font-semibold text-[10px] flex items-center gap-1">
                <span>Fathiya</span>
              </span>
              <div class="flex items-center gap-2">
                ${timeStr ? `<span>${timeStr}</span>` : ''}
                <button type="button" id="fatihMsgVoiceBtn_${idx}" onclick="window.handleFatihMsgVoiceClick(${idx})" class="p-1 -mr-1 rounded-md transition-all cursor-pointer ${isCurrentlySpeaking && currentSpeakingIdx === idx ? 'text-rose-400 bg-rose-500/25 ring-1 ring-rose-500/50 animate-pulse' : 'text-slate-400 hover:text-emerald-400 hover:bg-white/10'}" title="${isCurrentlySpeaking && currentSpeakingIdx === idx ? 'Hentikan Suara Sekarang (Esc)' : 'Dengarkan Suara'}">
                  ${isCurrentlySpeaking && currentSpeakingIdx === idx ? '<svg class="w-3.5 h-3.5 fill-current text-rose-400" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>' : '<i data-lucide="volume-2" class="w-3.5 h-3.5"></i>'}
                </button>
              </div>
            </div>
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
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<i>$1</i>');
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-[10.5px] text-emerald-300">$1</code>');
    formatted = formatted.replace(/\n/g, '<br/>');
    return formatted;
  }

  function handleFatihMsgVoiceClick(idx) {
    if (isCurrentlySpeaking && currentSpeakingIdx === idx) {
      stopFatihSpeech(true);
      return;
    }
    speakFatihHistory(idx);
  }

  function speakFatihHistory(idx) {
    const item = chatHistory[idx];
    if (item && item.voiceText) {
      speakFatihResponse(item.voiceText, idx);
    } else if (item && item.text) {
      speakFatihResponse(item.text, idx);
    }
  }

  // --- 11B. CO-PILOT LIVE ACTION ENGINE (MUTASI DATA LANGSUNG DI DALAM APLIKASI) ---
  function executeFatihAction(actionObj) {
    if (!actionObj || !actionObj.action) return null;
    const act = String(actionObj.action).toUpperCase().trim();
    const p = actionObj.params || {};

    try {
      // 0. MUTASI / PINDAH / SESUAIKAN JADWAL MENGAJAR GURU (KBM)
      if (act === 'MUTATE_SCHEDULE' || act === 'PINDAH_JADWAL' || act === 'UPDATE_SCHEDULE' || act === 'SESUAIKAN_JADWAL') {
        const rawClass = p.classId || p.kelas || '8D';
        const normClass = rawClass.replace(/\s+/g, '').toUpperCase();
        const targetDay = p.day || p.hari || 'Sabtu';
        const dayMap = { 'Ahad': 0, 'Senin': 1, 'Selasa': 2, 'Rabu': 3, 'Kamis': 4, 'Jumat': 5, 'Sabtu': 6, 'Minggu': 0 };
        const dayIndex = dayMap[targetDay] !== undefined ? dayMap[targetDay] : 6;

        let hourLabel = p.hourLabel || p.jam || '';
        let timeStr = p.time || '';

        if (!hourLabel) {
          if (timeStr.includes('3-4') || (p.jamKe && p.jamKe.includes('3-4'))) hourLabel = 'Jam 3-4';
          else if (timeStr.includes('1-2') || (p.jamKe && p.jamKe.includes('1-2'))) hourLabel = 'Jam 1-2';
          else if (timeStr.includes('5-6') || (p.jamKe && p.jamKe.includes('5-6'))) hourLabel = 'Jam 5-6';
          else if (timeStr.includes('7-8') || (p.jamKe && p.jamKe.includes('7-8'))) hourLabel = 'Jam 7-8';
          else hourLabel = 'Jam 3-4';
        }

        if (!timeStr) {
          if (hourLabel.includes('3-4')) timeStr = '08.30 - 09.50 (Jam 3-4)';
          else if (hourLabel.includes('1-2')) timeStr = '07.00 - 08.30 (Jam 1-2)';
          else if (hourLabel.includes('5-6')) timeStr = '10.20 - 11.40 (Jam 5-6)';
          else if (hourLabel.includes('7-8')) timeStr = '12.10 - 13.20 (Jam 7-8)';
          else timeStr = '08.30 - 09.50 (Jam 3-4)';
        } else if (hourLabel && !timeStr.includes(hourLabel)) {
          timeStr = `${timeStr} (${hourLabel})`;
        }

        const subject = p.subject || (normClass.startsWith('1ULA') ? 'Safinatun Najah' : 'Prakarya');
        const unit = p.unit || (normClass.startsWith('1ULA') ? 'nonformal' : 'formal');
        const room = p.room || (normClass.startsWith('1ULA') ? 'Gedung Diniyah' : `Ruang MTs ${normClass}`);

        // A. Update LocalStorage Jurnal Guru
        let jData = null;
        try {
          const raw = localStorage.getItem('partner_fatih_jurnal_guru_v2');
          if (raw) jData = JSON.parse(raw);
        } catch(e) {}

        if (!jData || !Array.isArray(jData.schedules)) {
          jData = { bonusWeight: 20, schedules: [] };
          if (window.DEFAULT_SCHEDULES && Array.isArray(window.DEFAULT_SCHEDULES)) {
            jData.schedules = JSON.parse(JSON.stringify(window.DEFAULT_SCHEDULES));
          }
        }

        let existing = jData.schedules.find(s => (s.classId || '').replace(/\s+/g, '').toUpperCase() === normClass);
        if (existing) {
          existing.day = targetDay;
          existing.dayIndex = dayIndex;
          existing.time = timeStr;
          existing.subject = subject || existing.subject;
          existing.room = room || existing.room;
        } else {
          jData.schedules.push({
            id: 'sch-' + Date.now(),
            day: targetDay,
            dayIndex: dayIndex,
            unit: unit,
            classId: normClass,
            subject: subject,
            time: timeStr,
            room: room
          });
        }
        localStorage.setItem('partner_fatih_jurnal_guru_v2', JSON.stringify(jData));

        // B. Update FATIH_DEFAULT_SCHEDULES di memori runtime AI
        const aiSch = FATIH_DEFAULT_SCHEDULES.find(s => (s.classId || '').replace(/\s+/g, '').toUpperCase() === normClass);
        if (aiSch) {
          aiSch.day = targetDay;
          aiSch.time = timeStr.split('(')[0].trim();
          aiSch.subject = subject;
          aiSch.room = room;
        } else {
          FATIH_DEFAULT_SCHEDULES.push({
            day: targetDay,
            time: timeStr.split('(')[0].trim(),
            classId: normClass,
            subject: subject,
            room: room
          });
        }

        // C. Panggil bridge jurnal jika modul jurnal terpasang di window
        if (typeof window.mutateJurnalSchedule === 'function') {
          try { window.mutateJurnalSchedule(normClass, targetDay, timeStr, hourLabel, subject, room); } catch(e) {}
        }
        if (typeof window.renderJurnalDashboard === 'function') {
          try { window.renderJurnalDashboard(); } catch(e) {}
        }
        if (typeof window.renderJurnalClassCards === 'function') {
          try { window.renderJurnalClassCards(); } catch(e) {}
        }
        if (typeof window.renderJurnalTimetable === 'function') {
          try { window.renderJurnalTimetable(); } catch(e) {}
        }
        if (typeof window.renderJurnalReminders === 'function') {
          try { window.renderJurnalReminders(); } catch(e) {}
        }
        if (typeof window.checkTodaySchedule === 'function') {
          try { window.checkTodaySchedule(); } catch(e) {}
        }

        if (typeof window.showToast === 'function') {
          window.showToast('🗓️ Jadwal Dipindahkan', `Kelas ${normClass} dipindah ke ${targetDay} (${timeStr})`, 'success');
        }

        return {
          icon: '🗓️',
          title: `Jadwal Kelas ${normClass} Berhasil Dipindahkan`,
          desc: `Kelas **${normClass}** (*${subject}*) kini dijadwalkan pada **Hari ${targetDay}**, pukul **${timeStr}** (${room}).`,
          tab: 'jurnal'
        };
      }

      // 0B. HAPUS JADWAL MENGAJAR
      if (act === 'DELETE_SCHEDULE' || act === 'HAPUS_JADWAL') {
        const rawClass = p.classId || p.kelas || '';
        const normClass = rawClass.replace(/\s+/g, '').toUpperCase();
        let targetDay = p.day || p.hari || '';

        let jData = null;
        try {
          const raw = localStorage.getItem('partner_fatih_jurnal_guru_v2');
          if (raw) jData = JSON.parse(raw);
        } catch(e) {}

        if (jData && Array.isArray(jData.schedules)) {
          jData.schedules = jData.schedules.filter(s => {
            const clsMatch = (s.classId || '').replace(/\s+/g, '').toUpperCase() === normClass;
            const dayMatch = targetDay ? s.day.toLowerCase() === targetDay.toLowerCase() : true;
            return !(clsMatch && dayMatch);
          });
          localStorage.setItem('partner_fatih_jurnal_guru_v2', JSON.stringify(jData));
          if (typeof window.renderJurnalTimetable === 'function') window.renderJurnalTimetable();
          return {
            icon: '🗑️',
            title: `Jadwal Kelas ${normClass} Dihapus`,
            desc: `Sesi KBM kelas ${normClass} ${targetDay ? 'hari ' + targetDay : ''} telah dihapus dari sistem.`,
            tab: 'jurnal'
          };
        }
      }

      // 1. TAMBAH AGENDA ACARA HUMAS
      if (act === 'ADD_HUMAS_EVENT' || act === 'TAMBAH_AGENDA') {
        const title = p.uraian || p.nama || p.kegiatan || 'Agenda Baru Yayasan';
        const tgl = String(p.tgl || new Date().getDate());
        const bulan = p.bulan || 'Oktober';
        const tahun = String(p.tahun || '2026');
        const pj = p.pj || 'Panitia';
        const kategori = p.kategori || 'umum';
        const statusPamflet = p.statusPamflet || 'belum';
        const eventId = 'prog-ai-' + Date.now();

        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const mIdx = monthNames.findIndex(m => m.toLowerCase() === bulan.toLowerCase());
        const mNum = mIdx >= 0 ? String(mIdx + 1).padStart(2, '0') : '10';
        const dNum = String(tgl).padStart(2, '0');
        const startDate = `${tahun}-${mNum}-${dNum}`;

        const newProg = {
          id: eventId,
          tgl: tgl,
          bulan: bulan,
          tahun: tahun,
          uraian: title,
          kategori: kategori,
          statusPamflet: statusPamflet,
          pj: pj,
          sasaran: p.sasaran || 'Warga Yayasan & Santri',
          startDate: startDate
        };

        if (window.humasState && Array.isArray(window.humasState.programs)) {
          window.humasState.programs.unshift(newProg);
        }

        let master = [];
        try {
          const raw = localStorage.getItem('humas_programs_master_v3');
          if (raw) master = JSON.parse(raw);
        } catch(e) {}
        if (!Array.isArray(master) || master.length === 0) {
          if (window.YTPAI_ANNUAL_PROGRAMS) master = JSON.parse(JSON.stringify(window.YTPAI_ANNUAL_PROGRAMS));
        }
        master.unshift(newProg);
        localStorage.setItem('humas_programs_master_v3', JSON.stringify(master));

        if (typeof window.renderHumasTable === 'function') window.renderHumasTable();
        if (typeof window.renderHumasMetrics === 'function') window.renderHumasMetrics();
        if (typeof window.renderHumasH7RadarCards === 'function') window.renderHumasH7RadarCards();
        if (typeof window.showToast === 'function') {
          window.showToast('✅ Agenda Ditambahkan', `${title} (${tgl} ${bulan} ${tahun})`, 'success');
        }

        return {
          icon: '📅',
          title: 'Agenda Acara Berhasil Ditambahkan',
          desc: `"${title}" dijadwalkan pada ${tgl} ${bulan} ${tahun} • PJ: ${pj}`,
          tab: 'humas',
          eventId: eventId
        };
      }

      // 2. UPDATE STATUS PAMFLET ACARA
      if (act === 'UPDATE_PAMFLET_STATUS' || act === 'UBAH_STATUS_PAMFLET') {
        const kw = (p.keyword || p.uraian || '').toLowerCase();
        const newStatus = (p.status || 'selesai').toLowerCase();
        let targetItem = null;

        let master = [];
        try {
          const raw = localStorage.getItem('humas_programs_master_v3');
          if (raw) master = JSON.parse(raw);
        } catch(e) {}

        if (Array.isArray(master)) {
          for (let item of master) {
            if ((item.uraian || '').toLowerCase().includes(kw)) {
              item.statusPamflet = newStatus;
              targetItem = item;
              break;
            }
          }
          if (targetItem) {
            localStorage.setItem('humas_programs_master_v3', JSON.stringify(master));
            if (window.humasState && Array.isArray(window.humasState.programs)) {
              const inState = window.humasState.programs.find(x => x.id === targetItem.id);
              if (inState) inState.statusPamflet = newStatus;
            }
            if (typeof window.renderHumasTable === 'function') window.renderHumasTable();
            if (typeof window.renderHumasH7RadarCards === 'function') window.renderHumasH7RadarCards();
            if (typeof window.showToast === 'function') {
              window.showToast('🎨 Pamflet Diperbarui', `${targetItem.uraian} -> ${newStatus.toUpperCase()}`, 'success');
            }
            return {
              icon: '🎨',
              title: 'Status Pamflet Diperbarui',
              desc: `Acara "${targetItem.uraian}" status pamflet diubah menjadi "${newStatus}"`,
              tab: 'humas',
              eventId: targetItem.id
            };
          }
        }
      }

      // 3. TAMBAH SANTRI TAHFIDZ
      if (act === 'ADD_TAHFIDZ_STUDENT' || act === 'TAMBAH_SANTRI') {
        const nama = p.nama || 'Santri Baru';
        const kelas = p.kelas || 'MTs';
        const targetJuz = p.targetJuz || p.juz || 'Juz 30';
        const newStudent = {
          id: 'std-' + Date.now(),
          nama: nama,
          kelas: kelas,
          targetJuz: targetJuz,
          statusTasmi: p.statusTasmi || 'belum',
          tglTasmi: '',
          statusPamflet: 'belum'
        };

        let students = [];
        try {
          const raw = localStorage.getItem('tahfidz_master_students_v1');
          if (raw) students = JSON.parse(raw);
        } catch(e) {}
        if (!Array.isArray(students) || students.length === 0) {
          if (window.TAHFIDZ_DEFAULT_STUDENTS) students = JSON.parse(JSON.stringify(window.TAHFIDZ_DEFAULT_STUDENTS));
        }
        students.push(newStudent);
        localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(students));

        if (typeof window.renderTahfidzTable === 'function') window.renderTahfidzTable();
        if (typeof window.showToast === 'function') {
          window.showToast('📖 Santri Ditambahkan', `${nama} (${kelas} - ${targetJuz})`, 'success');
        }

        return {
          icon: '📖',
          title: 'Santri Tahfidz Ditambahkan',
          desc: `Santri "${nama}" (${kelas}) terdaftar dengan target ${targetJuz}.`,
          tab: 'tahfidz'
        };
      }

      // 4. UPDATE STATUS TASMI SANTRI
      if (act === 'UPDATE_TASMI_STATUS' || act === 'LULUS_TASMI') {
        const namaKw = (p.nama || '').toLowerCase();
        const newStatus = (p.status || 'lulus').toLowerCase();
        let updatedStudent = null;

        let students = [];
        try {
          const raw = localStorage.getItem('tahfidz_master_students_v1');
          if (raw) students = JSON.parse(raw);
        } catch(e) {}

        if (Array.isArray(students)) {
          for (let s of students) {
            if ((s.nama || '').toLowerCase().includes(namaKw)) {
              s.statusTasmi = newStatus;
              updatedStudent = s;
              break;
            }
          }
          if (updatedStudent) {
            localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(students));
            if (typeof window.renderTahfidzTable === 'function') window.renderTahfidzTable();
            if (typeof window.showToast === 'function') {
              window.showToast('⭐ Tasmi Diperbarui', `${updatedStudent.nama} -> ${newStatus.toUpperCase()}`, 'success');
            }
            return {
              icon: '⭐',
              title: 'Status Tasmi Diperbarui',
              desc: `Santri "${updatedStudent.nama}" status tasmi' diubah menjadi "${newStatus}".`,
              tab: 'tahfidz'
            };
          }
        }
      }

      // 5. TAMBAH MITRA WARUNG TITIP JUAL
      if (act === 'ADD_WARUNG_STORE' || act === 'TAMBAH_WARUNG') {
        const namaWarung = p.nama || 'Warung Mitra Baru';
        const pemilik = p.pemilik || 'Pemilik Warung';
        const wa = p.wa || '';
        const hargaJual = parseInt(p.hargaJual) || 2000;
        const komisi = parseInt(p.komisi) || 500;
        const newStore = {
          id: 'warung-' + Date.now(),
          nama: namaWarung,
          pemilik: pemilik,
          wa: wa,
          alamat: p.alamat || 'Area Sekitar',
          intervalHari: 14,
          tanggalTitip: new Date().toISOString().split('T')[0],
          tanggalJadwalCek: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
          jumlahTitip: parseInt(p.jumlahTitip) || 20,
          hargaJual: hargaJual,
          komisi: komisi,
          varian: p.varian || 'Produk Titipan',
          status: 'aman'
        };

        let bData = { stores: [], transactions: [] };
        try {
          const raw = localStorage.getItem('partner_fatih_bisnis_v1');
          if (raw) bData = JSON.parse(raw);
        } catch(e) {}
        if (!Array.isArray(bData.stores)) bData.stores = [];
        bData.stores.unshift(newStore);
        localStorage.setItem('partner_fatih_bisnis_v1', JSON.stringify(bData));

        if (typeof window.renderWarungList === 'function') window.renderWarungList();
        if (typeof window.renderBisnisDashboard === 'function') window.renderBisnisDashboard();
        if (typeof window.showToast === 'function') {
          window.showToast('🏪 Warung Ditambahkan', `${namaWarung}`, 'success');
        }

        return {
          icon: '🏪',
          title: 'Mitra Warung Ditambahkan',
          desc: `"${namaWarung}" (Pemilik: ${pemilik}) berhasil didaftarkan ke Inkubator Bisnis.`,
          tab: 'bisnis'
        };
      }

      // 6. CATAT ARUS KAS KEUANGAN
      if (act === 'ADD_CASHFLOW' || act === 'CATAT_KAS') {
        const tipe = (p.tipe || 'keluar').toLowerCase();
        const nominal = parseInt(p.nominal) || 0;
        const ket = p.keterangan || 'Catatan via Fathiya AI';
        const newTx = {
          id: 'tx-' + Date.now(),
          tanggal: new Date().toISOString().split('T')[0],
          tipe: tipe,
          kategori: p.kategori || 'operasional',
          nominal: nominal,
          keterangan: ket
        };

        let bData = { stores: [], transactions: [] };
        try {
          const raw = localStorage.getItem('partner_fatih_bisnis_v1');
          if (raw) bData = JSON.parse(raw);
        } catch(e) {}
        if (!Array.isArray(bData.transactions)) bData.transactions = [];
        bData.transactions.unshift(newTx);
        localStorage.setItem('partner_fatih_bisnis_v1', JSON.stringify(bData));

        if (typeof window.renderCashflowList === 'function') window.renderCashflowList();
        if (typeof window.renderBisnisDashboard === 'function') window.renderBisnisDashboard();
        if (typeof window.showToast === 'function') {
          window.showToast('💵 Kas Dicatat', `${tipe === 'masuk' ? 'Pemasukan' : 'Pengeluaran'} Rp ${nominal.toLocaleString('id-ID')}`, 'success');
        }

        return {
          icon: '💵',
          title: 'Catatan Kas Tersimpan',
          desc: `${tipe === 'masuk' ? 'Pemasukan' : 'Pengeluaran'} Rp ${nominal.toLocaleString('id-ID')} (${ket})`,
          tab: 'bisnis'
        };
      }

      // 6B. ATUR / MASUKKAN SALDO KANTONG SEKARANG
      if (act === 'SET_WALLET_BALANCE' || act === 'ATUR_SALDO_SEKARANG') {
        const wallet = (p.wallet || 'pribadi').toLowerCase();
        const amount = Math.round(Number(p.amount || p.nominal) || 0);

        let wallets = { pribadi: 0, operasional: 0, tabungan: 0 };
        try {
          const raw = localStorage.getItem('partner_fatih_wallets_v2');
          if (raw) wallets = Object.assign(wallets, JSON.parse(raw));
        } catch(e) {}

        if (wallet === 'operasional') wallets.operasional = amount;
        else if (wallet === 'tabungan') wallets.tabungan = amount;
        else wallets.pribadi = amount;

        localStorage.setItem('partner_fatih_wallets_v2', JSON.stringify(wallets));

        if (typeof window.loadFinanceData === 'function') window.loadFinanceData();
        if (typeof window.renderAllFinanceViews === 'function') window.renderAllFinanceViews();
        if (typeof window.renderHeroAndWallets === 'function') window.renderHeroAndWallets();
        if (typeof window.renderFinanceTable === 'function') window.renderFinanceTable();

        if (typeof window.showToast === 'function') {
          window.showToast('💰 Saldo Diperbarui', `Dompet ${wallet.toUpperCase()} diatur ke Rp ${amount.toLocaleString('id-ID')}`, 'success');
        }

        return {
          icon: '💰',
          title: 'Saldo Dompet Berhasil Diatur',
          desc: `Saldo pada Dompet ${wallet.toUpperCase()} telah Fathiya sesuaikan menjadi Rp ${amount.toLocaleString('id-ID')}.`,
          tab: 'keuangan'
        };
      }

      // 7. KEUANGAN PRIBADI & MULTI-DOMPET (Tab Keuangan)
      if (act === 'ADD_FINANCE_TRANSACTION' || act === 'CATAT_KEUANGAN_PRIBADI') {
        const type = (p.type || p.tipe || 'keluar').toLowerCase();
        const wallet = (p.wallet || p.dompet || 'pribadi').toLowerCase();
        const amount = Math.round(Number(p.amount || p.nominal) || 0);
        const note = p.note || p.keterangan || 'Dicatat via Fathiya AI';
        const category = p.category || (type === 'masuk' ? 'Gaji & Honorarium' : 'Kebutuhan Harian');

        if (typeof window.addFinanceTransactionDirect === 'function') {
          window.addFinanceTransactionDirect({
            type: type,
            wallet: wallet,
            amount: amount,
            note: note,
            category: category
          });
        } else {
          // Direct LocalStorage fallback
          const STORAGE_FINANCE = 'partner_fatih_finance_data_v2';
          let txs = [];
          try {
            const raw = localStorage.getItem(STORAGE_FINANCE);
            if (raw) txs = JSON.parse(raw);
          } catch(e) {}
          const d = new Date();
          const newTx = {
            id: 'tx_' + Date.now(),
            date: d.toISOString().split('T')[0],
            time: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
            type: type,
            wallet: wallet,
            category: category,
            amount: amount,
            note: note
          };
          txs.unshift(newTx);
          localStorage.setItem(STORAGE_FINANCE, JSON.stringify(txs));
          if (typeof window.renderAllFinanceViews === 'function') window.renderAllFinanceViews();
        }

        if (typeof window.showToast === 'function') {
          window.showToast('💳 Keuangan Pribadi Dicatat', `${type === 'masuk' ? 'Pemasukan' : 'Pengeluaran'} Rp ${amount.toLocaleString('id-ID')} [${wallet.toUpperCase()}]`, 'success');
        }

        return {
          icon: '💳',
          title: 'Keuangan Pribadi Dicatat',
          desc: `${type === 'masuk' ? 'Pemasukan' : 'Pengeluaran'} Rp ${amount.toLocaleString('id-ID')} pada Dompet ${wallet.toUpperCase()} ("${note}").`,
          tab: 'keuangan'
        };
      }

      // 8. TRANSFER SALDO ANTAR KANTONG DOMPET
      if (act === 'TRANSFER_DOMPET' || act === 'PINDAH_DANA') {
        const fromW = (p.fromWallet || p.dari || 'operasional').toLowerCase();
        const toW = (p.toWallet || p.ke || 'tabungan').toLowerCase();
        const amount = Math.round(Number(p.amount || p.nominal) || 0);
        const note = p.note || `Pindah saldo dari ${fromW} ke ${toW}`;

        if (typeof window.transferFinanceKantongDirect === 'function') {
          window.transferFinanceKantongDirect(fromW, toW, amount, note);
        } else {
          const STORAGE_FINANCE = 'partner_fatih_finance_data_v2';
          let txs = [];
          try {
            const raw = localStorage.getItem(STORAGE_FINANCE);
            if (raw) txs = JSON.parse(raw);
          } catch(e) {}
          const d = new Date();
          const trf = {
            id: 'tx_trf_' + Date.now(),
            date: d.toISOString().split('T')[0],
            time: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
            type: 'transfer',
            wallet: fromW,
            toWallet: toW,
            category: 'Pindah Dana',
            amount: amount,
            note: note
          };
          txs.unshift(trf);
          localStorage.setItem(STORAGE_FINANCE, JSON.stringify(txs));
          if (typeof window.renderAllFinanceViews === 'function') window.renderAllFinanceViews();
        }

        if (typeof window.showToast === 'function') {
          window.showToast('🔄 Transfer Kantong Berhasil', `Rp ${amount.toLocaleString('id-ID')} (${fromW} ➔ ${toW})`, 'success');
        }

        return {
          icon: '🔄',
          title: 'Transfer Kantong Berhasil',
          desc: `Dipindahkan Rp ${amount.toLocaleString('id-ID')} dari dompet ${fromW.toUpperCase()} ke ${toW.toUpperCase()}.`,
          tab: 'keuangan'
        };
      }

      // 9. TAMBAH IDE DI RUANG TUMBUH (Tab Ide)
      if (act === 'ADD_IDE' || act === 'TAMBAH_IDE') {
        const title = p.title || p.judul || 'Ide Baru Kak Fatih';
        const category = p.category || 'jasa_digital';
        const estRevenue = Math.round(Number(p.estRevenue || p.potensi) || 200000);
        const desc = p.desc || p.deskripsi || 'Dicatat langsung oleh Fathiya AI Partner';

        if (typeof window.addIdeDirect === 'function') {
          window.addIdeDirect({ title, category, estRevenue, desc });
        } else {
          let list = [];
          try {
            const raw = localStorage.getItem('partner_fatih_ide_data_v1');
            if (raw) list = JSON.parse(raw);
          } catch(e) {}
          list.unshift({
            id: 'ide_' + Date.now(),
            title: title,
            category: category,
            status: 'spark',
            desc: desc,
            estRevenue: estRevenue,
            scoreEase: 4, scoreDemand: 4, scoreProfit: 4,
            nextAction: 'Riset awal dan buat prototype',
            checklist: [{ id: 'c1', text: 'Validasi pasar', done: false }],
            createdAt: Date.now(),
            updatedAt: Date.now()
          });
          localStorage.setItem('partner_fatih_ide_data_v1', JSON.stringify(list));
          if (typeof window.renderIdeCards === 'function') window.renderIdeCards();
        }

        if (typeof window.showToast === 'function') {
          window.showToast('💡 Ide Baru Disimpan', `${title} (Est: Rp ${estRevenue.toLocaleString('id-ID')})`, 'success');
        }

        return {
          icon: '💡',
          title: 'Ide Baru Terdaftar di Ruang Tumbuh',
          desc: `"${title}" berhasil dimasukkan ke Laboratorium Ide dengan estimasi Rp ${estRevenue.toLocaleString('id-ID')}.`,
          tab: 'ide'
        };
      }

      // 10. UPDATE STATUS IDE
      if (act === 'UPDATE_IDE_STATUS') {
        const kw = (p.keyword || p.judul || '').toLowerCase();
        const newStatus = (p.status || 'executing').toLowerCase();
        if (typeof window.updateIdeStatusDirect === 'function') {
          const res = window.updateIdeStatusDirect(kw, newStatus);
          if (res) {
            if (typeof window.showToast === 'function') {
              window.showToast('🚀 Status Ide Diperbarui', `"${res.title}" ➔ ${newStatus.toUpperCase()}`, 'success');
            }
            return {
              icon: '🚀',
              title: 'Status Ide Diperbarui',
              desc: `Ide "${res.title}" kini berstatus: ${newStatus.toUpperCase()}.`,
              tab: 'ide'
            };
          }
        }
      }

      // 11. CATAT MATERI JURNAL GURU KBM
      if (act === 'CATAT_JURNAL_GURU' || act === 'ISI_JURNAL_KBM') {
        const classId = (p.classId || p.kelas || '8D').replace(/\s+/g, '').toUpperCase();
        const pNum = parseInt(p.pertemuan || p.p) || 1;
        const materi = p.materi || 'Materi KBM';
        const catatan = p.catatan || '';

        let jState = null;
        if (typeof window.getJurnalState === 'function') jState = window.getJurnalState();
        if (!jState) {
          try {
            const raw = localStorage.getItem('partner_fatih_jurnal_guru_v2');
            if (raw) jState = JSON.parse(raw);
          } catch(e) {}
        }

        if (jState && jState.classes && jState.classes[classId]) {
          const targetSession = jState.classes[classId].sessions[pNum];
          if (targetSession) {
            targetSession.materi = materi;
            if (catatan) targetSession.catatan = catatan;
            targetSession.status = 'terlaksana';
            targetSession.date = new Date().toISOString().split('T')[0];

            if (typeof window.saveJurnalState === 'function') {
              window.saveJurnalState();
            } else {
              localStorage.setItem('partner_fatih_jurnal_guru_v2', JSON.stringify(jState));
            }

            if (typeof window.renderJurnalTimetable === 'function') window.renderJurnalTimetable();
            if (typeof window.showToast === 'function') {
              window.showToast('📝 Jurnal Guru Disimpan', `Kelas ${classId} P-${pNum}: ${materi}`, 'success');
            }

            return {
              icon: '📝',
              title: `Jurnal Guru Kelas ${classId} Tersimpan`,
              desc: `Pertemuan ke-${pNum} berhasil dicatat: "${materi}".`,
              tab: 'jurnal'
            };
          }
        }
      }

      // 12. CATAT PRESENSI SANTRI
      if (act === 'CATAT_PRESENSI') {
        const classId = (p.classId || p.kelas || '8D').replace(/\s+/g, '').toUpperCase();
        const pNum = parseInt(p.pertemuan || p.p) || 1;
        const studentKw = (p.studentName || p.nama || '').toLowerCase();
        const stStatus = (p.status || 'S').toUpperCase(); // 'H' | 'S' | 'I' | 'A'

        let jState = null;
        if (typeof window.getJurnalState === 'function') jState = window.getJurnalState();
        if (!jState) {
          try {
            const raw = localStorage.getItem('partner_fatih_jurnal_guru_v2');
            if (raw) jState = JSON.parse(raw);
          } catch(e) {}
        }

        if (jState && jState.classes && jState.classes[classId]) {
          const sess = jState.classes[classId].sessions[pNum];
          if (sess && sess.presensi) {
            let matchedName = null;
            for (let name of Object.keys(sess.presensi)) {
              if (name.toLowerCase().includes(studentKw)) {
                matchedName = name;
                sess.presensi[name] = stStatus;
                break;
              }
            }

            if (matchedName) {
              if (typeof window.saveJurnalState === 'function') window.saveJurnalState();
              else localStorage.setItem('partner_fatih_jurnal_guru_v2', JSON.stringify(jState));

              const statusLabels = { 'H': 'Hadir', 'S': 'Sakit', 'I': 'Izin', 'A': 'Alpa' };
              const stLabel = statusLabels[stStatus] || stStatus;

              if (typeof window.showToast === 'function') {
                window.showToast('📋 Presensi Dicatat', `${matchedName} (${classId}): ${stLabel}`, 'info');
              }

              return {
                icon: '📋',
                title: 'Presensi Siswa Diperbarui',
                desc: `${matchedName} (Kelas ${classId}, P-${pNum}) status kehadiran: ${stLabel}.`,
                tab: 'jurnal'
              };
            }
          }
        }
      }

      // 13. SIMPAN MEMO PRIBADI KAK FATIH
      if (act === 'SAVE_PERSONAL_NOTE' || act === 'CATAT_MEMO') {
        const memoText = p.text || p.memo || 'Catatan penting Kak Fatih';
        const profile = getFathiyaUserProfile();
        if (!Array.isArray(profile.personalNotes)) profile.personalNotes = [];
        profile.personalNotes.unshift({
          id: 'note_' + Date.now(),
          text: memoText,
          date: new Date().toISOString()
        });
        saveFathiyaUserProfile(profile);

        if (typeof window.showToast === 'function') {
          window.showToast('📌 Catatan Pribadi Disimpan', memoText.substring(0, 30) + '...', 'success');
        }

        return {
          icon: '📌',
          title: 'Memo Pribadi Kak Fatih Disimpan',
          desc: `Fathiya sudah mengingat pesan ini: "${memoText}".`,
          tab: 'home'
        };
      }

      // 14. HAPUS AGENDA HUMAS
      if (act === 'DELETE_HUMAS_EVENT') {
        const kw = (p.keyword || p.uraian || '').toLowerCase();
        let events = [];
        try {
          const raw = localStorage.getItem('humas_programs_master_v3');
          if (raw) events = JSON.parse(raw);
        } catch(e) {}
        if (Array.isArray(events)) {
          const idx = events.findIndex(ev => (ev.uraian || '').toLowerCase().includes(kw));
          if (idx !== -1) {
            const removed = events.splice(idx, 1)[0];
            localStorage.setItem('humas_programs_master_v3', JSON.stringify(events));
            if (typeof window.renderHumasEvents === 'function') window.renderHumasEvents();
            if (typeof window.showToast === 'function') {
              window.showToast('🗑️ Agenda Dihapus', removed.uraian, 'warning');
            }
            return {
              icon: '🗑️',
              title: 'Agenda Dihapus',
              desc: `Agenda "${removed.uraian}" berhasil dihapus dari master data Humas.`,
              tab: 'humas'
            };
          }
        }
      }

      // 15. HAPUS SANTRI TAHFIDZ
      if (act === 'DELETE_TAHFIDZ_STUDENT') {
        const namaKw = (p.nama || '').toLowerCase();
        let students = [];
        try {
          const raw = localStorage.getItem('tahfidz_master_students_v1');
          if (raw) students = JSON.parse(raw);
        } catch(e) {}
        if (Array.isArray(students)) {
          const idx = students.findIndex(s => (s.nama || '').toLowerCase().includes(namaKw));
          if (idx !== -1) {
            const removed = students.splice(idx, 1)[0];
            localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(students));
            if (typeof window.renderTahfidzTable === 'function') window.renderTahfidzTable();
            if (typeof window.showToast === 'function') {
              window.showToast('🗑️ Santri Dihapus', removed.nama, 'warning');
            }
            return {
              icon: '🗑️',
              title: 'Santri Dihapus',
              desc: `Santri "${removed.nama}" dihapus dari database Tahfidz.`,
              tab: 'tahfidz'
            };
          }
        }
      }

      // 16. BERPINDAH TAB
      if (act === 'SWITCH_TAB' || act === 'BUKA_TAB') {
        const targetTab = p.tab || 'bisnis';
        if (typeof window.switchTab === 'function') {
          window.switchTab(targetTab);
        }
        const tMeta = FATIH_KNOWLEDGE_BASE.tabs[targetTab];
        return {
          icon: '🚀',
          title: `Membuka Modul ${tMeta ? tMeta.name : targetTab}`,
          desc: `Aplikasi langsung dialihkan ke tab ${tMeta ? tMeta.name : targetTab}.`,
          tab: targetTab
        };
      }

    } catch(err) {
      console.warn('[Fatih Action Engine] Error executing action:', err);
    }

    return null;
  }

  // Detektor perintah mutasi data lokal (Offline Intent Parser)
  function detectOfflineActionIntent(text) {
    const t = text.trim();

    // 0. Mutasi / Pindah / Ganti Jadwal Mengajar KBM Guru
    // Contoh: "jadwal aku di 8 d dipindah di hari sabtu jam ke 3-4", "pindah jadwal 8D ke hari sabtu", "ubah jadwal mengajarnya ke hari senin jam 1-2"
    if (/(?:pindah|ganti|geser|ubah|sesuaikan|tukar|atur ulang|jadwalkan|masukkan jadwal|tambah jadwal)/i.test(t) || /(?:jadwal\s+mengajar|jadwal\s+kbm)/i.test(t)) {
      const classMatch = t.match(/\b(?:kelas\s*)?([789])\s*([a-dA-D])\b/i) || t.match(/\b(1\s*ula\s*[abAB])\b/i);
      const dayMatch = t.match(/\b(ahad|minggu|senin|selasa|rabu|kamis|jumat|sabtu)\b/i);
      const jamKeMatch = t.match(/jam\s*(?:ke\s*)?(\d+(?:\s*[-–]\s*\d+)?)/i);
      const timeClockMatch = t.match(/(\d{1,2}[.:]\d{2})\s*(?:[-–]\s*(\d{1,2}[.:]\d{2}))?/i);

      if (dayMatch) {
        let cls = '';
        if (classMatch) {
          cls = classMatch[1] && classMatch[2] ? `${classMatch[1].toUpperCase()}${classMatch[2].toUpperCase()}` : classMatch[0].replace(/kelas\s*/i, '').replace(/\s+/g, '').toUpperCase();
        } else {
          // Cari kelas dari percakapan sebelumnya atau kelas aktif di jurnal
          const prevMatch = (chatContext?.recentTurns || []).slice(-4).map(turn => (turn.text || '').match(/\b(?:kelas\s*)?([789][a-dA-D]|1\s*ula\s*[abAB])\b/i)).filter(Boolean)[0];
          cls = prevMatch ? (prevMatch[1] || prevMatch[0]).replace(/kelas\s*/i, '').replace(/\s+/g, '').toUpperCase() : '8A';
        }

        let dayRaw = dayMatch[1].toLowerCase();
        let dayFormatted = dayRaw.charAt(0).toUpperCase() + dayRaw.slice(1);
        if (dayFormatted === 'Minggu') dayFormatted = 'Ahad';

        let hourLabel = jamKeMatch ? `Jam ${jamKeMatch[1].replace(/\s+/g, '')}` : '';
        let timeStr = '';
        if (hourLabel.includes('3-4')) timeStr = '08.30 - 09.50 (Jam 3-4)';
        else if (hourLabel.includes('1-2')) timeStr = '07.00 - 08.30 (Jam 1-2)';
        else if (hourLabel.includes('5-6')) timeStr = '10.20 - 11.40 (Jam 5-6)';
        else if (hourLabel.includes('7-8')) timeStr = '12.10 - 13.20 (Jam 7-8)';
        else if (timeClockMatch) timeStr = timeClockMatch[0];
        else timeStr = '07.00 - 08.30 (Jam 1-2)';

        return {
          action: 'MUTATE_SCHEDULE',
          params: {
            classId: cls,
            day: dayFormatted,
            hourLabel: hourLabel || 'Jam 1-2',
            time: timeStr
          }
        };
      }
    }

    // 0B. Hapus Jadwal
    if (/(?:hapus|batalkan)\s+jadwal/i.test(t)) {
      const classMatch = t.match(/\b([789])\s*([a-dA-D])\b/i);
      const dayMatch = t.match(/\b(ahad|minggu|senin|selasa|rabu|kamis|jumat|sabtu)\b/i);
      if (classMatch) {
        const cls = `${classMatch[1].toUpperCase()}${classMatch[2].toUpperCase()}`;
        return {
          action: 'DELETE_SCHEDULE',
          params: {
            classId: cls,
            day: dayMatch ? dayMatch[1] : ''
          }
        };
      }
    }

    // 0C. Masukkan / Atur Saldo Dompet Sekarang
    // Contoh: "masukkan saldo saya sekarang sejumlah 500rb", "atur saldo pribadi saya 2 juta", "saldo operasional saya sekarang 350.000", "saldo tabungan sekarang 5jt", "saldo saya sekarang 1500000"
    if (/(?:masukkan|atur|set|ganti|ubah|sesuaikan)\s+saldo/i.test(t) || /(?:saldo\s+(?:saya\s+)?(?:sekarang\s+)?(?:sejumlah\s+)?)/i.test(t)) {
      if (/(?:saldo|uang).*(?:sekarang|sejumlah|\d)/i.test(t)) {
        let wallet = 'pribadi';
        if (/operasional/i.test(t)) wallet = 'operasional';
        else if (/tabungan/i.test(t)) wallet = 'tabungan';

        let amount = 0;
        const jtMatch = t.match(/(\d+(?:[.,]\d+)?)\s*(?:jt|juta)\b/i);
        const rbMatch = t.match(/(\d+(?:[.,]\d+)?)\s*(?:rb|ribu|k)\b/i);
        if (jtMatch) {
          amount = Math.round(parseFloat(jtMatch[1].replace(',', '.')) * 1000000);
        } else if (rbMatch) {
          amount = Math.round(parseFloat(rbMatch[1].replace(',', '.')) * 1000);
        } else {
          const numMatch = t.match(/(?:rp\.?\s*)?(\d{1,3}(?:[.,]\d{3})+|\d{4,})/i);
          if (numMatch) {
            amount = parseInt(numMatch[1].replace(/[.,]/g, ''), 10);
          }
        }

        if (amount > 0) {
          return {
            action: 'SET_WALLET_BALANCE',
            params: {
              wallet: wallet,
              amount: amount
            }
          };
        }
      }
    }

    // 1. Catat Keuangan Pribadi (Multi-Dompet)
    // Contoh: "catat pengeluaran pribadi bensin 35rb", "catat pemasukan honor 500rb", "beli bensin motor 25000", "pemasukan gaji 2000000"
    if (/(?:catat|masukkan|tambah)\s+(?:pengeluaran|pemasukan|belanja|biaya|honor|gaji)/i.test(t) || /(?:beli|isi\s+bensin|makan\s+siang|bayar)\s+/i.test(t)) {
      const isMasuk = /(?:pemasukan|honor|gaji|dapat\s+uang|terima\s+transfer)/i.test(t);
      const tipe = isMasuk ? 'masuk' : 'keluar';

      // Dompet
      let wallet = 'pribadi';
      if (/operasional/i.test(t)) wallet = 'operasional';
      else if (/tabungan/i.test(t)) wallet = 'tabungan';

      // Nominal (mendukung 35rb, 35k, 35.000, 35000)
      let amount = 0;
      const rbMatch = t.match(/(\d+(?:[.,]\d+)?)\s*(?:rb|ribu|k)\b/i);
      if (rbMatch) {
        amount = Math.round(parseFloat(rbMatch[1].replace(',', '.')) * 1000);
      } else {
        const numMatch = t.match(/(?:rp\.?\s*)?(\d{1,3}(?:[.,]\d{3})+|\d+)/i);
        if (numMatch) {
          amount = parseInt(numMatch[1].replace(/[.,]/g, ''), 10);
        }
      }

      if (amount > 0) {
        let note = t
          .replace(/^(?:fathiya,?\s*)?(?:tolong\s*)?(?:catat|masukkan|tambah)\s+(?:pengeluaran|pemasukan|belanja|biaya)?/i, '')
          .replace(/(?:di\s+dompet\s+)?(?:pribadi|operasional|tabungan)/i, '')
          .replace(/(\d+(?:[.,]\d+)?)\s*(?:rb|ribu|k)\b/i, '')
          .replace(/(?:rp\.?\s*)?(\d{1,3}(?:[.,]\d{3})+|\d+)/i, '')
          .trim();
        if (!note) note = isMasuk ? 'Pemasukan Kas' : 'Pengeluaran Kebutuhan';

        return {
          action: 'ADD_FINANCE_TRANSACTION',
          params: {
            type: tipe,
            wallet: wallet,
            amount: amount,
            note: note,
            category: isMasuk ? 'Gaji & Honorarium' : 'Kebutuhan Harian'
          }
        };
      }
    }

    // 2. Transfer Saldo Antar Kantong
    // Contoh: "transfer dari operasional ke tabungan 100rb", "pindah dana operasional ke pribadi 50000"
    if (/(?:transfer|pindah\s+dana|pindahkan\s+saldo)\s+(?:dari\s+)?(\w+)\s+ke\s+(\w+)/i.test(t)) {
      const trfMatch = t.match(/(?:transfer|pindah\s+dana|pindahkan\s+saldo)\s+(?:dari\s+)?(\w+)\s+ke\s+(\w+)/i);
      const fromW = trfMatch[1].toLowerCase();
      const toW = trfMatch[2].toLowerCase();

      let amount = 0;
      const rbMatch = t.match(/(\d+(?:[.,]\d+)?)\s*(?:rb|ribu|k)\b/i);
      if (rbMatch) {
        amount = Math.round(parseFloat(rbMatch[1].replace(',', '.')) * 1000);
      } else {
        const numMatch = t.match(/(?:rp\.?\s*)?(\d{1,3}(?:[.,]\d{3})+|\d+)/i);
        if (numMatch) {
          amount = parseInt(numMatch[1].replace(/[.,]/g, ''), 10);
        }
      }

      if (amount > 0) {
        return {
          action: 'TRANSFER_DOMPET',
          params: {
            fromWallet: fromW,
            toWallet: toW,
            amount: amount,
            note: `Pindah dana ${fromW} ke ${toW}`
          }
        };
      }
    }

    // 3. Tambah Ide Baru di Ruang Tumbuh
    // Contoh: "fathiya catat ide baru jasa pembuatan website sekolah", "tambah ide twibbon milad", "ide baru bikin modul"
    if (/(?:catat\s+ide|tambah\s+ide|ide\s+baru)\s+(.+)/i.test(t)) {
      const mIde = t.match(/(?:catat\s+ide|tambah\s+ide|ide\s+baru)\s+(?:baru\s+)?(.+)/i);
      const rest = mIde ? mIde[1] : '';
      const revMatch = rest.match(/potensi\s+(\d+(?:[.,]\d+)?\s*(?:rb|ribu|k|jt|juta)?)/i);
      let estRev = 200000;
      if (revMatch) {
        if (/jt|juta/i.test(revMatch[1])) estRev = Math.round(parseFloat(revMatch[1]) * 1000000);
        else if (/rb|ribu|k/i.test(revMatch[1])) estRev = Math.round(parseFloat(revMatch[1]) * 1000);
        else estRev = parseInt(revMatch[1].replace(/[.,]/g, ''), 10);
      }
      let title = rest.replace(/potensi\s+\d+.*$/i, '').trim();

      return {
        action: 'ADD_IDE',
        params: {
          title: title || 'Ide Baru Kak Fatih',
          category: /website|aplikasi|software/i.test(title) ? 'aplikasi_sekolah' : (/twibbon|desain|poster/i.test(title) ? 'desain_event' : 'jasa_digital'),
          estRevenue: estRev,
          desc: 'Dicatat via Fathiya AI Partner'
        }
      };
    }

    // 4. Catat Presensi Siswa KBM
    // Contoh: "catat presensi 8D anita sakit pertemuan 2", "anita di 8D sakit", "8D anita izin"
    if (/(?:presensi|absen|kehadiran|sakit|izin|alpa)\b/i.test(t)) {
      const classMatch = t.match(/\b([789])\s*([a-dA-D])\b/i);
      const stMatch = t.match(/\b(sakit|izin|alpa|hadir)\b/i);
      const pMatch = t.match(/pertemuan\s*(\d+)/i) || t.match(/\bp\s*(\d+)\b/i);

      if (classMatch && stMatch) {
        const cls = `${classMatch[1].toUpperCase()}${classMatch[2].toUpperCase()}`;
        const statusCode = stMatch[1].toUpperCase().charAt(0); // S, I, A, H
        // Ekstrak nama siswa
        let cleanName = t
          .replace(/^(?:fathiya,?\s*)?(?:tolong\s*)?(?:catat\s+)?(?:presensi|absen|kehadiran)?/i, '')
          .replace(/\b[789]\s*[a-dA-D]\b/i, '')
          .replace(/\b(sakit|izin|alpa|hadir)\b/i, '')
          .replace(/pertemuan\s*\d+/i, '')
          .replace(/\bp\s*\d+\b/i, '')
          .replace(/\bdi\b/i, '')
          .trim();

        if (cleanName.length >= 2) {
          return {
            action: 'CATAT_PRESENSI',
            params: {
              classId: cls,
              pertemuan: pMatch ? parseInt(pMatch[1]) : 1,
              studentName: cleanName,
              status: statusCode
            }
          };
        }
      }
    }

    // 5. Catat Memo / Pengingat Pribadi Kak Fatih
    // Contoh: "fathiya ingat ya besok beli spidol dan penghapus", "ingatkan saya untuk setor berkas", "catat memo penting..."
    if (/(?:ingat\s+ya|ingatkan\s+saya|catat\s+memo|simpan\s+memo|memo\s+pribadi)/i.test(t)) {
      let memo = t
        .replace(/^(?:fathiya,?\s*)?(?:tolong\s*)?(?:ingat\s+ya|ingatkan\s+saya|catat\s+memo|simpan\s+memo|memo\s+pribadi)\s*/i, '')
        .trim();
      if (memo) {
        return {
          action: 'SAVE_PERSONAL_NOTE',
          params: { text: memo }
        };
      }
    }

    // 6. Tambah agenda
    const mAgenda = t.match(/^(?:fathiya,?\s*)?(?:tolong\s*)?(?:tambah|buat|agendakan|masukkan)\s+agenda\s+(.+)/i);
    if (mAgenda) {
      const rest = mAgenda[1];
      const tglMatch = rest.match(/tanggal\s+(\d{1,2})\s+([a-zA-Z]+)(?:\s+(\d{4}))?/i);
      const pjMatch = rest.match(/pj\s+([a-zA-Z0-9\.\s]+)/i);
      let uraian = rest.replace(/tanggal\s+\d{1,2}\s+[a-zA-Z]+(?:\s+\d{4})?/i, '').replace(/pj\s+[a-zA-Z0-9\.\s]+/i, '').trim();
      return {
        action: 'ADD_HUMAS_EVENT',
        params: {
          uraian: uraian || rest,
          tgl: tglMatch ? tglMatch[1] : String(new Date().getDate()),
          bulan: tglMatch ? tglMatch[2] : 'Oktober',
          tahun: tglMatch && tglMatch[3] ? tglMatch[3] : '2026',
          pj: pjMatch ? pjMatch[1].trim() : 'Panitia Yayasan'
        }
      };
    }

    // 7. Tambah santri
    const mSantri = t.match(/^(?:fathiya,?\s*)?(?:tolong\s*)?(?:tambah|daftarkan|masukkan)\s+santri\s+(.+)/i);
    if (mSantri) {
      const rest = mSantri[1];
      const kelasMatch = rest.match(/kelas\s+([a-zA-Z0-9]+)/i);
      const juzMatch = rest.match(/juz\s+(\d{1,2})/i);
      let nama = rest.replace(/kelas\s+[a-zA-Z0-9]+/i, '').replace(/juz\s+\d{1,2}/i, '').trim();
      return {
        action: 'ADD_TAHFIDZ_STUDENT',
        params: {
          nama: nama || rest,
          kelas: kelasMatch ? kelasMatch[1] : 'MTs',
          targetJuz: juzMatch ? 'Juz ' + juzMatch[1] : 'Juz 30'
        }
      };
    }

    // 8. Tambah warung
    const mWarung = t.match(/^(?:fathiya,?\s*)?(?:tolong\s*)?(?:tambah|daftarkan|masukkan)\s+warung\s+(.+)/i);
    if (mWarung) {
      const rest = mWarung[1];
      const waMatch = rest.match(/(?:wa|no|hp)\s+([0-9]+)/i);
      let nama = rest.replace(/(?:wa|no|hp)\s+[0-9]+/i, '').trim();
      return {
        action: 'ADD_WARUNG_STORE',
        params: {
          nama: nama || rest,
          pemilik: 'Mitra Baru',
          wa: waMatch ? waMatch[1] : ''
        }
      };
    }

    // 9. Catat kas bisnis
    const mKas = t.match(/^(?:fathiya,?\s*)?(?:tolong\s*)?(?:catat|tambah)\s+kas\s+(pengeluaran|pemasukan|belanja)\s+(.+)/i);
    if (mKas) {
      const tipe = mKas[1].toLowerCase() === 'pemasukan' ? 'masuk' : 'keluar';
      const rest = mKas[2];
      const nomMatch = rest.match(/(\d+(?:[.,]\d+)?)/);
      const nominal = nomMatch ? parseInt(nomMatch[1].replace(/[.,]/g, '')) : 10000;
      let ket = rest.replace(/\d+(?:[.,]\d+)?/, '').trim();
      return {
        action: 'ADD_CASHFLOW',
        params: {
          tipe: tipe,
          nominal: nominal,
          keterangan: ket || 'Catatan Keuangan Bisnis'
        }
      };
    }

    // 5. Switch tab
    const mTab = t.match(/^(?:fathiya,?\s*)?(?:tolong\s*)?(?:buka|ke|pindah|tampilkan)\s+(?:tab|modul)\s+([a-zA-Z0-9_\s]+)/i);
    if (mTab) {
      const q = mTab[1].toLowerCase().trim();
      for (const [k, meta] of Object.entries(FATIH_KNOWLEDGE_BASE.tabs)) {
        if (q.includes(k) || meta.name.toLowerCase().includes(q)) {
          return { action: 'SWITCH_TAB', params: { tab: k } };
        }
      }
    }

    return null;
  }

  // --- 11. SUBMIT & DISPATCH ENGINE ---
  async function handleFatihChatSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (isThinking) return;

    const input = document.getElementById('fatihChatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';

    // Append pesan pengguna
    chatHistory.push({ sender: 'user', text: text, time: Date.now() });
    renderChatMessages();

    // Tampilkan indikator mengetik
    const typing = document.getElementById('fatihChatTyping');
    if (typing) typing.classList.remove('hidden');
    isThinking = true;
    scrollChatToBottom();

    const isFromVoice = lastPromptWasVoice;
    lastPromptWasVoice = false;
    const groqKey = (localStorage.getItem('partner_fatih_groq_key') || '').trim();
    const geminiKey = (localStorage.getItem('partner_fatih_gemini_key') || '').trim();
    let noticeBadge = null;
    let actionCard = null;

    try {
      let replyText = '';
      let replyVoiceText = '';
      let tabShortcut = null;
      let actionTable = null;

      // Cek apakah perintah merupakan aksi mutasi data langsung (Offline Intent)
      const offlineAction = detectOfflineActionIntent(text);

      // 1. Evaluasi pencocokan lokal
      const localMatch = matchLocalKnowledge(text);

      if (offlineAction && (!groqKey || groqKey.length < 10) && (!geminiKey || geminiKey.length < 10)) {
        // Eksekusi offline langsung
        await new Promise(r => setTimeout(r, 80));
        actionCard = executeFatihAction(offlineAction);
        if (offlineAction.action === 'SET_WALLET_BALANCE') {
          replyText = `Alhamdulillah beres Kak Fatih tercinta! Saldo Kakak di **Dompet ${offlineAction.params.wallet.toUpperCase()}** sekarang sudah Fathiya sesuaikan menjadi **Rp ${offlineAction.params.amount.toLocaleString('id-ID')}** yaa 💳✨\n\nSeluruh kartu saldo dan ringkasan keuangan Kak Fatih langsung ter-update otomatis saat ini juga! Fathiya siap bantu kelola pos-posnya biar makin berkah yaa Kak! 🥰`;
          replyVoiceText = `Alhamdulillah beres Kak Fatih! Saldo dompet ${offlineAction.params.wallet} sekarang sudah Fathiya atur menjadi ${offlineAction.params.amount} rupiah.`;
        } else if (offlineAction.action === 'MUTATE_SCHEDULE') {
          replyText = `Alhamdulillah Kak Fatih! Jadwal mengajar kelas **${offlineAction.params.classId}** sudah Fathiya pindahkan ke **Hari ${offlineAction.params.day}** (${offlineAction.params.hourLabel || offlineAction.params.time}) yaa 🥰✨\n\nPerubahan ini langsung Fathiya sinkronkan ke modul Jurnal Guru dan agenda KBM Kakak. Datanya sudah tersimpan rapi yaa Kak!`;
          replyVoiceText = `Alhamdulillah Kak Fatih! Jadwal kelas ${offlineAction.params.classId} sudah Fathiya pindahkan ke hari ${offlineAction.params.day}. Semangat mengajarnya yaa Kak!`;
        } else if (offlineAction.action === 'DELETE_SCHEDULE') {
          replyText = `Siap Kak Fatih! Jadwal mengajar kelas **${offlineAction.params.classId}** sudah Fathiya hapus dari sistem yaa 🌸`;
          replyVoiceText = `Jadwal kelas ${offlineAction.params.classId} sudah dihapus yaa Kak Fatih.`;
        } else if (offlineAction.action === 'ADD_FINANCE_TRANSACTION') {
          const jenis = offlineAction.params.type === 'masuk' ? 'pemasukan' : 'pengeluaran';
          replyText = `Beres Kak Fatih! Catatan ${jenis} sebesar **Rp ${offlineAction.params.amount.toLocaleString('id-ID')}** untuk *"${offlineAction.params.note}"* sudah Fathiya masukkan ke **Dompet ${offlineAction.params.wallet.toUpperCase()}** yaa 💳✨\n\nSaldo dan radar keuangan Kakak langsung ter-update otomatis!`;
          replyVoiceText = `Siap Kak Fatih! Catatan ${jenis} ${offlineAction.params.amount} rupiah sudah Fathiya simpan ke dompet ${offlineAction.params.wallet}.`;
        } else if (offlineAction.action === 'TRANSFER_DOMPET') {
          replyText = `Alhamdulillah Kak Fatih! Dana sebesar **Rp ${offlineAction.params.amount.toLocaleString('id-ID')}** sudah Fathiya pindahkan dari **Dompet ${offlineAction.params.fromWallet.toUpperCase()}** ke **Dompet ${offlineAction.params.toWallet.toUpperCase()}** yaa 🔄✨`;
          replyVoiceText = `Dana berhasil dipindahkan dari dompet ${offlineAction.params.fromWallet} ke dompet ${offlineAction.params.toWallet} yaa Kak Fatih.`;
        } else if (offlineAction.action === 'ADD_IDE') {
          replyText = `Masya Allah ide cemerlang Kak Fatih! Ide **"${offlineAction.params.title}"** sudah Fathiya catat di **Ruang Tumbuh (Laboratorium Ide)** dengan estimasi potensi **Rp ${offlineAction.params.estRevenue.toLocaleString('id-ID')}** 💡🚀\n\nFathiya yakin ide ini bisa membawa kemandirian rezeki dan keberkahan buat Kak Fatih!`;
          replyVoiceText = `Ide baru Kak Fatih sudah Fathiya simpan di Ruang Tumbuh. Sukses selalu yaa Kak!`;
        } else if (offlineAction.action === 'CATAT_PRESENSI') {
          replyText = `Siap Kak Fatih! Presensi santri **${offlineAction.params.studentName}** di kelas **${offlineAction.params.classId}** (Pertemuan ${offlineAction.params.pertemuan}) sudah Fathiya catat statusnya yaa 📋✨`;
          replyVoiceText = `Presensi santri ${offlineAction.params.studentName} kelas ${offlineAction.params.classId} sudah dicatat yaa Kak Fatih.`;
        } else if (offlineAction.action === 'SAVE_PERSONAL_NOTE') {
          replyText = `Siap selalu Kak Fatih! Fathiya sudah mencatat dan mengingat pesan ini di memori pribadi Fathiya:\n\n📌 *"${offlineAction.params.text}"*\n\nKapan pun Kak Fatih butuh pengingat ini, Fathiya siap bantu! 🥰`;
          replyVoiceText = `Pesan Kak Fatih sudah Fathiya ingat baik-baik di catatan pribadi.`;
        } else {
          replyText = `Alhamdulillah Kak Fatih! Instruksi Kakak telah langsung Fathiya laksanakan di aplikasi:`;
          replyVoiceText = `Instruksi Kak Fatih telah Fathiya laksanakan yaa. Data aplikasi telah diperbarui.`;
        }
        if (actionCard && actionCard.tab) tabShortcut = actionCard.tab;
      } else if ((groqKey && groqKey.length > 10) || (geminiKey && geminiKey.length > 10)) {
        // PRIORITAS UTAMA: Respon Online AI Cerdas Manusiawi (Groq Llama 3.3 70B atau Google Gemini)
        try {
          replyText = await callOnlineAiApi(text);

          // Periksa apakah balasan AI mengandung blok fatih-action (tag <fatih-action> atau markdown code block)
          const tagMatch = replyText.match(/<fatih-action>\s*(\{[\s\S]*?\})\s*<\/fatih-action>/i);
          const blockMatch = replyText.match(/```(?:fatih-action|json)?\s*(\{\s*"action"[\s\S]*?\})\s*```/i);
          const rawMatch = tagMatch ? tagMatch[1] : (blockMatch ? blockMatch[1] : null);

          if (rawMatch) {
            try {
              const parsedAction = JSON.parse(rawMatch);
              actionCard = executeFatihAction(parsedAction);
              // Bersihkan tag/blok kode dari teks tampilan bubble agar rapi
              replyText = replyText
                .replace(/<fatih-action>[\s\S]*?<\/fatih-action>/gi, '')
                .replace(/```(?:fatih-action|json)?\s*\{\s*"action"[\s\S]*?\}\s*```/gi, '')
                .trim();
            } catch(jsonErr) {
              console.warn('[Fatih AI] Gagal parse fatih-action JSON:', jsonErr);
            }
          } else if (offlineAction) {
            // Fallback: AI tidak menyertakan blok fatih-action tapi kalimat user jelas merupakan perintah mutasi
            actionCard = executeFatihAction(offlineAction);
          } else {
            // Fallback ekstra: Periksa jika balasan AI mengindikasikan jadwal/data telah diubah tapi tanpa tag kode
            const parsedFromAiText = detectOfflineActionIntent(replyText);
            if (parsedFromAiText) {
              actionCard = executeFatihAction(parsedFromAiText);
            }
          }

          // Ekstrak intisari vokal yang hangat dan ringkas agar nyaman didengar lisan
          let rawVoiceSummary = replyText.replace(/<fatih-action>[\s\S]*?<\/fatih-action>/gi, '').trim();
          const sentenceMatches = rawVoiceSummary.match(/^([^\n.!?]+[.!?](?:\s+[^\n.!?]+[.!?])?)/s);
          if (sentenceMatches && sentenceMatches[1].length >= 25 && sentenceMatches[1].length <= 320) {
            replyVoiceText = sentenceMatches[1];
          } else {
            replyVoiceText = rawVoiceSummary.substring(0, 260);
          }
          if (actionCard && actionCard.tab) {
            tabShortcut = actionCard.tab;
          }
        } catch(apiErr) {
          console.warn('[Fatih AI] API gagal, beralih ke fallback lokal cerdas:', apiErr);
          noticeBadge = 'Mode Offline (Fallback)';
          replyText = `⚠️ *Koneksi AI Online terkendala. Fathiya menjawab via engine lokal:*\n\n${localMatch.text}`;
          replyVoiceText = localMatch.voiceText || localMatch.text;
          tabShortcut = localMatch.tabShortcut;
          actionTable = localMatch.actionTable;
        }
      } else {
        // Mode Offline: Belum memasukkan kunci Groq / Gemini di Pengaturan
        await new Promise(r => setTimeout(r, 80));
        replyText = localMatch.text;
        replyVoiceText = localMatch.voiceText || localMatch.text;
        tabShortcut = localMatch.tabShortcut;
        actionTable = localMatch.actionTable;
      }

      chatHistory.push({
        sender: 'fatih',
        text: replyText,
        voiceText: replyVoiceText || replyText,
        tabShortcut: tabShortcut,
        actionTable: actionTable,
        actionCard: actionCard,
        noticeBadge: noticeBadge,
        time: Date.now()
      });

      // Update konteks multiturn
      chatContext.recentTurns.push({ role: 'user', text: text });
      chatContext.recentTurns.push({ role: 'fatih', text: replyText, topic: chatContext.lastTopic });
      if (chatContext.recentTurns.length > 12) chatContext.recentTurns = chatContext.recentTurns.slice(-12);

      // Bacakan suara bila fitur aktif
      if ((isAutoVoiceEnabled || isFromVoice) && replyVoiceText) {
        const lastIdx = chatHistory.length - 1;
        speakFatihResponse(replyVoiceText, lastIdx);
      }
    } catch(err) {
      chatHistory.push({
        sender: 'fatih',
        text: 'Maaf sahabatku, terjadi kendala saat menelaah instruksi. Silakan ulangi pertanyaan Anda.',
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
      chatContext.recentTurns = [];
      renderChatMessages();
      if (typeof window.showToast === 'function') {
        window.showToast('🗑️ Obrolan Dibersihkan', 'Riwayat percakapan telah bersih.', 'info');
      }
    }
  }

  // --- 12. NATURAL VOICE ENGINE RESMI FATHIYA (TTS & STT BAHASA INDONESIA id-ID) ---
  let cachedIndonesianVoice = null;
  let isCurrentlySpeaking = false;
  let currentSpeakingIdx = null;
  let activeSpeechUtterance = null;

  function populateVoices() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      cachedIndonesianVoice = null;
    }
  }

  function getBestIndonesianVoice() {
    if (!('speechSynthesis' in window)) return null;
    if (cachedIndonesianVoice) return cachedIndonesianVoice;

    const voices = window.speechSynthesis.getVoices() || [];
    if (voices.length === 0) return null;

    const idVoices = voices.filter(v => {
      const name = (v.name || '').toLowerCase();
      const lang = (v.lang || '').toLowerCase();
      return lang.includes('id') || lang.includes('indonesia') || name.includes('indonesia');
    });

    // 1. Prioritas Utama: Suara Natural / Neural Online Bahasa Indonesia (Microsoft Gadis Natural di Windows/Edge)
    const naturalVoice = idVoices.find(v => {
      const n = (v.name || '').toLowerCase();
      return n.includes('natural') || n.includes('neural') || n.includes('online');
    });
    if (naturalVoice) {
      cachedIndonesianVoice = naturalVoice;
      return naturalVoice;
    }

    // 2. Microsoft Gadis (Suara wanita Indonesia terbaik, lembut, dan empuk di Windows)
    const gadisVoice = idVoices.find(v => (v.name || '').toLowerCase().includes('gadis'));
    if (gadisVoice) {
      cachedIndonesianVoice = gadisVoice;
      return gadisVoice;
    }

    // 3. Suara Wanita Indonesia (Siti, Damayanti, Putri, Ayu)
    const femaleIdVoice = idVoices.find(v => {
      const n = (v.name || '').toLowerCase();
      return n.includes('female') || n.includes('wanita') || n.includes('damayanti') || n.includes('siti') || n.includes('putri') || n.includes('ayu');
    });
    if (femaleIdVoice) {
      cachedIndonesianVoice = femaleIdVoice;
      return femaleIdVoice;
    }

    // 4. Google Bahasa Indonesia (Standar alami Chrome di PC & Android Samsung A55)
    const googleIdVoice = idVoices.find(v => (v.name || '').toLowerCase().includes('google'));
    if (googleIdVoice) {
      cachedIndonesianVoice = googleIdVoice;
      return googleIdVoice;
    }

    // 5. Suara Bahasa Indonesia apapun yang tersedia di sistem
    if (idVoices.length > 0) {
      cachedIndonesianVoice = idVoices[0];
      return idVoices[0];
    }

    // Fallback: Suara wanita umum
    const genericFemale = voices.find(v => /female|wanita|woman|zira|jenny|aria/i.test(v.name));
    return genericFemale || voices[0] || null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    populateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = function() {
        cachedIndonesianVoice = null;
        getBestIndonesianVoice();
      };
    }
  }

  function cleanTextForNaturalSpeech(rawText) {
    if (!rawText) return '';
    let s = String(rawText);

    // 1. Buang blok kode markdown, JSON tag, link, tabel, styling
    s = s.replace(/```[\s\S]*?```/g, ' Rincian data terlampir di layar. ');
    s = s.replace(/<fatih-action>[\s\S]*?<\/fatih-action>/gi, '');
    s = s.replace(/`([^`]+)`/g, '$1');
    s = s.replace(/https?:\/\/\S+/g, '');
    s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    s = s.replace(/\|[^\n]+\|/g, ' ');
    s = s.replace(/#{1,6}\s+/g, '');
    s = s.replace(/\*\*([^*]+)\*\*/g, '$1');
    s = s.replace(/\*([^*]+)\*/g, '$1');
    s = s.replace(/~~([^~]+)~~/g, '$1');

    // 2. Buang seluruh emoji & simbol grafis yang membuat browser mengeja harfiah atau glitch
    s = s.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu, '');
    s = s.replace(/[•●★✨⚡🌸☕😊❤️👍💡📌✅❌⚠️⚙️🧪]/g, '');

    // 3. Konversi format salam islami agar dilafalkan lembut & khusyuk
    s = s.replace(/Assalamu['’]alaikum(?:\s+Wr\.?\s*Wb\.?)?/gi, 'Assalamu alaikum');
    s = s.replace(/Wa['’]alaikum(?:us)?salam(?:\s+Wr\.?\s*Wb\.?)?/gi, 'Wa alaikum salam');
    s = s.replace(/Insya\s*Allah/gi, 'Insya Allah');
    s = s.replace(/Alhamdulillah/gi, 'Alhamdulillah');
    s = s.replace(/Subhanallah/gi, 'Subhanallah');
    s = s.replace(/Bismillah/gi, 'Bismillah');

    // 4. Konversi Rupiah dan Angka
    s = s.replace(/Rp\s*([0-9.,]+)/gi, function(_, numStr) {
      const cleanNum = numStr.replace(/\./g, '').replace(/,/g, '');
      return cleanNum + ' rupiah';
    });
    s = s.replace(/([0-9]+)\.([0-9]+)/g, '$1 koma $2');
    s = s.replace(/([0-9]+)%/g, '$1 persen');
    s = s.replace(/\b24\/7\b/g, 'dua puluh empat jam');

    // 5. Konversi singkatan madrasah, perbankan, IT & organisasi
    s = s.replace(/\bBRIVA\b/gi, 'Briva');
    s = s.replace(/\bPPDB\b/g, 'P P D B');
    s = s.replace(/\bKBM\b/g, 'K B M');
    s = s.replace(/\bSPP\b/g, 'S P P');
    s = s.replace(/\bCBT\b/g, 'C B T');
    s = s.replace(/\bYTPAI\b/g, 'Yayasan Tarbiyah');
    s = s.replace(/\bCMS\b/gi, 'C M S');
    s = s.replace(/\bAI\b/g, 'A I');
    s = s.replace(/\bPWA\b/gi, 'P W A');
    s = s.replace(/\bWA\b/g, 'WhatsApp');
    s = s.replace(/\bAPI\b/gi, 'A P I');
    s = s.replace(/\bPJ\b/g, 'penanggung jawab');
    s = s.replace(/\bH-([0-9]+)\b/gi, 'H minus $1');
    s = s.replace(/\bH\+([0-9]+)\b/gi, 'H plus $1');
    s = s.replace(/(?:^|\s)s\.d\.(?=\s|$)/gi, ' sampai ');
    s = s.replace(/(?:^|\s)dll\.(?=\s|$)/gi, ' dan lain-lain ');
    s = s.replace(/(?:^|\s)dst\.(?=\s|$)/gi, ' dan seterusnya ');
    s = s.replace(/(?:^|\s)ybs\.(?=\s|$)/gi, ' yang bersangkutan ');
    s = s.replace(/&amp;/g, ' dan ');
    s = s.replace(/&/g, ' dan ');

    // 6. Singkatan percakapan harian agar mengalir seperti manusia nyata
    s = s.replace(/\byg\b/gi, 'yang');
    s = s.replace(/\bdgn\b/gi, 'dengan');
    s = s.replace(/\butk\b/gi, 'untuk');
    s = s.replace(/\bsdh\b/gi, 'sudah');
    s = s.replace(/\bblm\b/gi, 'belum');
    s = s.replace(/\bgmn\b/gi, 'gimana');
    s = s.replace(/\bbgt\b/gi, 'banget');
    s = s.replace(/\bklo\b/gi, 'kalau');

    // 7. Penyesuaian nomor urut agar tidak kaku
    s = s.replace(/(?:^|\n)\s*([0-9]+)\.\s*/g, '. Poin $1, ');

    // 8. Tanda baca & intonasi bernapas santai
    s = s.replace(/!+/g, '.');
    s = s.replace(/\?+/g, '? ');
    s = s.replace(/\.{2,}/g, '. ');
    s = s.replace(/[\r\n]+/g, '. ');
    s = s.replace(/\s+/g, ' ').trim();

    // 9. Batasi panjang ucapan ke intisari pesan (maksimum 350 karakter pertama)
    if (s.length > 350) {
      const cut = s.substring(0, 350);
      const lastDot = cut.lastIndexOf('.');
      if (lastDot > 160) {
        s = cut.substring(0, lastDot + 1);
      } else {
        s = cut + '...';
      }
    }
    return s;
  }

  function updateSpeechUiState(isSpeaking, msgIdx) {
    isCurrentlySpeaking = !!isSpeaking;
    currentSpeakingIdx = isSpeaking ? msgIdx : null;

    // 1. Header Stop Button
    const stopBtn = document.getElementById('fatihStopSpeechBtn');
    if (stopBtn) {
      if (isSpeaking) {
        stopBtn.classList.remove('hidden');
        stopBtn.classList.add('flex');
      } else {
        stopBtn.classList.add('hidden');
        stopBtn.classList.remove('flex');
      }
    }

    // 2. Floating Speaking Bar above input
    const speakingBar = document.getElementById('fatihSpeakingBar');
    if (speakingBar) {
      if (isSpeaking) {
        speakingBar.classList.remove('hidden');
        speakingBar.classList.add('flex');
      } else {
        speakingBar.classList.add('hidden');
        speakingBar.classList.remove('flex');
      }
    }

    // 3. Auto Voice Icon in header
    const autoVoiceBtn = document.getElementById('fatihVoiceAutoToggle');
    if (autoVoiceBtn) {
      if (isSpeaking) {
        autoVoiceBtn.classList.add('text-emerald-400', 'animate-pulse');
      } else {
        autoVoiceBtn.classList.remove('animate-pulse');
        if (!isAutoVoiceEnabled) {
          autoVoiceBtn.classList.remove('text-emerald-400', 'bg-emerald-500/20');
        }
      }
    }

    // 4. Update bubble icon if chat is rendered
    if (typeof msgIdx === 'number') {
      const bubbleBtn = document.getElementById(`fatihMsgVoiceBtn_${msgIdx}`);
      if (bubbleBtn) {
        if (isSpeaking) {
          bubbleBtn.className = 'p-1 -mr-1 rounded-md text-rose-400 bg-rose-500/25 ring-1 ring-rose-500/50 animate-pulse transition-all cursor-pointer';
          bubbleBtn.title = 'Hentikan Suara Sekarang (Esc)';
          bubbleBtn.innerHTML = '<svg class="w-3.5 h-3.5 fill-current text-rose-400" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>';
        } else {
          bubbleBtn.className = 'p-1 -mr-1 rounded-md text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-all cursor-pointer';
          bubbleBtn.title = 'Dengarkan Suara';
          bubbleBtn.innerHTML = '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
        }
      }
    }
  }

  function stopFatihSpeech(showToastNotice = true) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    const hadSpeaking = isCurrentlySpeaking;
    updateSpeechUiState(false, null);
    activeSpeechUtterance = null;
    window._fatihCurrentUtterance = null;

    if (hadSpeaking && showToastNotice && typeof window.showToast === 'function') {
      window.showToast('⏹️ Suara Berhenti', 'Pembacaan suara Fathiya telah dihentikan.', 'info');
    }
  }

  function speakFatihResponse(rawText, msgIdx = null) {
    if (!('speechSynthesis' in window)) {
      if (typeof window.showToast === 'function') {
        window.showToast('Perhatian', 'Perangkat/browser belum mendukung Text-to-Speech.', 'warning');
      }
      return;
    }

    const clean = cleanTextForNaturalSpeech(rawText);
    if (!clean) return;

    // Hentikan suara yang sedang aktif sebelumnya
    stopFatihSpeech(false);

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'id-ID';

    const voice = getBestIndonesianVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Karakteristik vokal wanita Indonesia: Nada hangat bersahabat (pitch: 0.98), tempo mengalun santai (rate: 0.94)
    utterance.pitch = 0.98;
    utterance.rate = 0.94;
    utterance.volume = 1.0;

    activeSpeechUtterance = utterance;
    window._fatihCurrentUtterance = utterance; // Mencegah pemutusan suara tiba-tiba oleh browser

    utterance.onstart = function() {
      updateSpeechUiState(true, msgIdx);
    };

    utterance.onend = function() {
      updateSpeechUiState(false, msgIdx);
      activeSpeechUtterance = null;
      window._fatihCurrentUtterance = null;
    };

    utterance.onerror = function() {
      updateSpeechUiState(false, msgIdx);
      activeSpeechUtterance = null;
      window._fatihCurrentUtterance = null;
    };

    window.speechSynthesis.speak(utterance);
  }

  function testNaturalVoice() {
    speakFatihResponse("Assalamu alaikum Kak Fatih. Suara Fathiya sekarang sudah disetel lebih lembut, bersahabat, dan bernada alami. Ada yang bisa Fathiya dampingi hari ini?");
  }

  // Global keyboard listener: tekan tombol Escape untuk menghentikan suara seketika
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isCurrentlySpeaking) {
        stopFatihSpeech(true);
      }
    });
  }

  function toggleFatihAutoVoice() {
    isAutoVoiceEnabled = !isAutoVoiceEnabled;
    const btn = document.getElementById('fatihVoiceAutoToggle');
    if (btn) {
      if (isAutoVoiceEnabled) {
        btn.classList.add('text-emerald-400', 'bg-emerald-500/20');
        btn.classList.remove('text-slate-400');
        btn.title = 'Suara Otomatis Aktif (Fathiya Menjawab Bersuara Bahasa Indonesia)';
        if (typeof window.showToast === 'function') {
          window.showToast('🔊 Suara Otomatis Aktif', 'Fathiya akan otomatis menjawab bersuara dalam Bahasa Indonesia.', 'success');
        }
      } else {
        stopFatihSpeech();
        btn.classList.remove('text-emerald-400', 'bg-emerald-500/20');
        btn.classList.add('text-slate-400');
        btn.title = 'Suara Otomatis Nonaktif (Klik untuk Menyalakan)';
        if (typeof window.showToast === 'function') {
          window.showToast('🔇 Mode Senyap', 'Suara otomatis dinonaktifkan.', 'info');
        }
      }
    }
  }

  function toggleFatihVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Browser Anda belum mendukung Speech Recognition. Silakan gunakan Google Chrome di Android atau Desktop.');
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
    speechRecognition.lang = 'id-ID'; // Standar Aksen Bahasa Indonesia Resmi
    speechRecognition.continuous = false;
    speechRecognition.interimResults = false;

    speechRecognition.onstart = function() {
      isListening = true;
      if (micBtn) micBtn.classList.add('bg-rose-500', 'text-white', 'animate-pulse');
      if (typeof window.showToast === 'function') {
        window.showToast('🎙️ Mendengarkan Suara (Bahasa Indonesia)...', 'Silakan sampaikan pertanyaan atau instruksi Anda.', 'info');
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

  // --- 13. DUAL-ENGINE AI SETTINGS & CONNECTION TESTER (GROQ & GEMINI AKTIF BERSAMAAN) ---
  let selectedAiMode = localStorage.getItem('partner_fatih_ai_mode') || 'hybrid';

  function setAiOperationalMode(mode) {
    selectedAiMode = mode;
    const btnHybrid = document.getElementById('btnModeHybrid');
    const btnGroq = document.getElementById('btnModeGroq');
    const btnGemini = document.getElementById('btnModeGemini');
    const descText = document.getElementById('modeExplanationText');

    const activeClass = 'py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold shadow-xs';
    const inactiveClass = 'py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer text-slate-400 hover:text-white hover:bg-white/5 font-medium border border-transparent';

    if (btnHybrid) btnHybrid.className = mode === 'hybrid' ? activeClass : inactiveClass;
    if (btnGroq) btnGroq.className = mode === 'groq' ? activeClass : inactiveClass;
    if (btnGemini) btnGemini.className = mode === 'gemini' ? activeClass : inactiveClass;

    if (descText) {
      if (mode === 'hybrid') {
        descText.innerHTML = '⚡🔄 <b>Tenaga Utama: Groq (0.3s) ➔ Sekunder: Gemini:</b> Fathiya memprioritaskan <b>Groq (Tenaga Utama)</b> untuk kecepatan respons kilat 0.3 detik. Jika Groq mencapai kuota/limit harian atau mengalami kendala, sistem <b>otomatis bergantian</b> ke <b>Google Gemini Flash (Tenaga Sekunder)</b> tanpa terputus.';
      } else if (mode === 'groq') {
        descText.innerHTML = '⚡ <b>Mode Khusus Groq (Tenaga Utama):</b> Selalu menggunakan <b>Groq Cloud LPU (0.3s)</b> untuk kecepatan inferensi kilat.';
      } else {
        descText.innerHTML = '🌐 <b>Mode Khusus Gemini (Tenaga Sekunder):</b> Selalu menggunakan <b>Google Gemini Flash</b> dari Google AI Studio.';
      }
    }
  }

  function openFatihAiSettings() {
    let modal = document.getElementById('modalFatihAiSettings');
    const savedGroq = (localStorage.getItem('partner_fatih_groq_key') || '').trim();
    const savedGemini = (localStorage.getItem('partner_fatih_gemini_key') || '').trim();
    selectedAiMode = localStorage.getItem('partner_fatih_ai_mode') || (savedGroq && savedGemini ? 'hybrid' : (savedGroq ? 'groq' : (savedGemini ? 'gemini' : 'hybrid')));

    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modalFatihAiSettings';
      modal.className = 'modal-portal fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm transition-all duration-300';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#0c121e] border border-emerald-500/30 rounded-2xl shadow-2xl p-4 sm:p-5 text-slate-100 flex flex-col gap-4 no-scrollbar">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-white/10 pb-3 flex-shrink-0">
          <div class="flex items-center gap-2">
            <span class="text-xl">⚙️</span>
            <div>
              <h3 class="font-bold text-sm text-white flex items-center gap-2">
                <span>Pengaturan Mesin AI Fathiya</span>
                <span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">Dual-Engine</span>
              </h3>
              <p class="text-[10px] text-slate-400">Groq Cloud (Tenaga Utama 0.3s) &amp; Google Gemini Flash (Tenaga Sekunder)</p>
            </div>
          </div>
          <button type="button" onclick="window.closeFatihAiSettings()" class="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer">✕</button>
        </div>

        <!-- 1. Pilihan Mode Kerja & Bergantian -->
        <div class="space-y-1.5 p-3 rounded-xl bg-slate-900/90 border border-white/10">
          <label class="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
            Prioritas &amp; Mode Operasional Mesin:
          </label>
          <div class="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-lg border border-white/5 text-[11px]">
            <button type="button" id="btnModeHybrid" onclick="window.setAiOperationalMode('hybrid')" class="py-2 px-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer font-bold text-center">
              <span>🔄 Hybrid Utama</span>
              <span class="text-[9px] opacity-75 font-normal">Groq ➔ Gemini</span>
            </button>
            <button type="button" id="btnModeGroq" onclick="window.setAiOperationalMode('groq')" class="py-2 px-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer font-medium text-center">
              <span>⚡ Tenaga Utama</span>
              <span class="text-[9px] opacity-75 font-normal">Khusus Groq 0.3s</span>
            </button>
            <button type="button" id="btnModeGemini" onclick="window.setAiOperationalMode('gemini')" class="py-2 px-1 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer font-medium text-center">
              <span>🌐 Sekunder</span>
              <span class="text-[9px] opacity-75 font-normal">Khusus Gemini</span>
            </button>
          </div>
          <p id="modeExplanationText" class="text-[9.5px] text-slate-300 pt-1 leading-relaxed border-t border-white/5"></p>
        </div>

        <!-- 2. Dual Engine Key Cards -->
        <div class="space-y-3">
          <!-- Card A: Groq Cloud (Tenaga Utama) -->
          <div class="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>⚡ Groq Cloud LPU</span>
                <span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 font-mono font-bold">TENAGA UTAMA • 0.3s</span>
              </span>
              <a href="https://console.groq.com/keys" target="_blank" class="text-[10px] text-emerald-400 hover:text-emerald-300 underline font-semibold flex items-center gap-0.5">
                <span>Ambil Kunci Gratis</span> ↗
              </a>
            </div>
            <div class="relative">
              <input type="password" id="fatihGroqApiKeyInput" placeholder="Tempel kunci gsk_... di sini" value="${escapeHtml(savedGroq)}" class="w-full bg-slate-950 border border-slate-700 focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none font-mono tracking-wider pr-8" />
              <button type="button" onclick="window.toggleShowGroqKey()" class="absolute right-2.5 top-2 text-[11px] text-slate-400 hover:text-white cursor-pointer">👁️</button>
            </div>
            <div id="fatihGroqTestStatus" class="hidden p-2 rounded-lg text-xs"></div>
            <div class="flex items-center justify-between pt-0.5">
              <span class="text-[9.5px] text-slate-400">Kecepatan inferensi super kilat 0.3 detik (Prioritas #1)</span>
              <button type="button" id="btnTestGroqKey" onclick="window.testFatihGroqKey()" class="py-1.5 px-3 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-98">
                <span>🧪 Tes Koneksi Groq (Kilat)</span>
              </button>
            </div>
          </div>

          <!-- Card B: Google Gemini (Tenaga Sekunder) -->
          <div class="p-3.5 rounded-xl bg-slate-900/80 border border-indigo-500/40 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>🌐 Google Gemini Flash</span>
                <span class="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/25 text-indigo-300 font-mono font-bold">TENAGA SEKUNDER • CADANGAN</span>
              </span>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-[10px] text-indigo-300 hover:text-indigo-200 underline font-semibold flex items-center gap-0.5">
                <span>Google AI Studio</span> ↗
              </a>
            </div>
            <div class="relative">
              <input type="password" id="fatihGeminiApiKeyInput" placeholder="Tempel kunci AIzaSy... di sini" value="${escapeHtml(savedGemini)}" class="w-full bg-slate-950 border border-slate-700 focus:border-indigo-400 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none font-mono tracking-wider pr-8" />
              <button type="button" onclick="window.toggleShowGeminiKey()" class="absolute right-2.5 top-2 text-[11px] text-slate-400 hover:text-white cursor-pointer">👁️</button>
            </div>
            <div id="fatihGeminiTestStatus" class="hidden p-2 rounded-lg text-xs"></div>
            <div class="flex items-center justify-between pt-0.5">
              <span class="text-[9.5px] text-slate-400">Cadangan otomatis saat Groq sibuk / kuota harian</span>
              <button type="button" id="btnTestGeminiKey" onclick="window.testFatihGeminiKey()" class="py-1.5 px-3 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/50 text-indigo-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-98">
                <span>🧪 Tes Koneksi Gemini</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 3. Hubungkan Kunci ke HP (1 Klik WhatsApp / QR Code) -->
        <div>
          <button type="button" onclick="window.openCrossDeviceSyncModal()" class="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2">
            <span>📱 Hubungkan Semua Kunci ke HP (1 Klik WhatsApp / QR)</span>
          </button>
        </div>

        <!-- 4. Fitur & Tes Suara Alami Fathiya -->
        <div class="p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <span>🎙️</span>
              <span>Vokal Alami Fathiya (Indonesian Natural)</span>
            </span>
            <span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
              Lembut &amp; Empuk
            </span>
          </div>
          <p class="text-[9.5px] text-slate-400 leading-relaxed">
            Karakter vokal disetel pada nada santun bersahabat (0.98x) dan tempo mengalun rileks (0.94x) dengan pembersih intonasi robotik otomatis.
          </p>
          <div class="flex items-center gap-2 pt-0.5">
            <button type="button" onclick="window.testNaturalVoice()" class="flex-1 py-1.5 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer">
              <span>🔊 Tes Suara Alami</span>
            </button>
            <button type="button" onclick="window.stopFatihSpeech()" class="py-1.5 px-3 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer" title="Hentikan Suara Sekarang (Esc)">
              <span>⏹️ Stop Suara</span>
            </button>
          </div>
        </div>

        <!-- 5. Footer Buttons -->
        <div class="flex items-center justify-between border-t border-white/10 pt-3 gap-2 flex-shrink-0">
          <button type="button" onclick="window.removeFatihAiKey()" class="py-2 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all cursor-pointer">
            Hapus Kunci (Offline)
          </button>
          <div class="flex items-center gap-2">
            <button type="button" onclick="window.closeFatihAiSettings()" class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer">
              Batal
            </button>
            <button type="button" onclick="window.saveFatihAiKey()" class="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer">
              Simpan Semua Kunci
            </button>
          </div>
        </div>
      </div>
    `;

    setAiOperationalMode(selectedAiMode);
    modal.style.display = 'flex';
  }

  function closeFatihAiSettings() {
    const modal = document.getElementById('modalFatihAiSettings');
    if (modal) modal.style.display = 'none';
  }

  function toggleShowGroqKey() {
    const input = document.getElementById('fatihGroqApiKeyInput');
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
  }

  function toggleShowGeminiKey() {
    const input = document.getElementById('fatihGeminiApiKeyInput');
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
  }

  async function testFatihGroqKey() {
    const input = document.getElementById('fatihGroqApiKeyInput');
    const statusBox = document.getElementById('fatihGroqTestStatus');
    const btn = document.getElementById('btnTestGroqKey');
    if (!statusBox || !btn) return;

    const key = (input ? input.value : localStorage.getItem('partner_fatih_groq_key') || '').trim();
    if (!key) {
      statusBox.className = 'p-2 rounded-lg text-xs bg-amber-500/20 border border-amber-500/40 text-amber-200 block';
      statusBox.innerHTML = '⚠️ Masukkan Groq API Key terlebih dahulu.';
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span class="inline-block animate-spin mr-1">⏳</span> Menghubungi Groq...';
    statusBox.className = 'p-2 rounded-lg text-xs bg-slate-800 border border-slate-700 text-slate-300 block';
    statusBox.innerHTML = 'Sedang mencari model aktif dan menguji latensi Groq Cloud...';

    const t0 = performance.now();
    try {
      const reply = await callGroqApi('Sebutkan secara singkat dalam 1 kalimat: Apa ibukota Indonesia dan siapa vokalis band Ungu?', key);
      const elapsed = ((performance.now() - t0) / 1000).toFixed(2);
      const activeModel = cachedWorkingGroqModel || (cachedWorkingEndpoint ? cachedWorkingEndpoint.modelName : 'Groq LPU');

      statusBox.className = 'p-2.5 rounded-xl text-xs bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 block';
      statusBox.innerHTML = `✅ <b>Koneksi Groq Cloud (Tenaga Utama) Berhasil!</b><br/><span class="text-[10px] text-emerald-300 font-mono mt-0.5 block">Model: <b>${activeModel}</b> • Waktu respons: <b>${elapsed} detik (Super Kilat)</b></span><span class="text-[11px] text-slate-200 mt-1 block p-1.5 rounded-lg bg-black/30 border border-white/5"><i>"${escapeHtml(reply.substring(0, 160))}"</i></span>`;
    } catch(err) {
      statusBox.className = 'p-2.5 rounded-xl text-xs bg-rose-500/20 border border-rose-500/50 text-rose-200 block';
      statusBox.innerHTML = `❌ <b>Koneksi Groq Gagal:</b><br/><span class="text-[11px] text-rose-300/90 mt-1 block">${escapeHtml(err.message || 'Terjadi kesalahan.')}</span>`;
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<span>🧪 Tes Koneksi Groq (Kilat)</span>';
    }
  }

  async function testFatihGeminiKey() {
    const input = document.getElementById('fatihGeminiApiKeyInput');
    const statusBox = document.getElementById('fatihGeminiTestStatus');
    const btn = document.getElementById('btnTestGeminiKey');
    if (!statusBox || !btn) return;

    const key = (input ? input.value : localStorage.getItem('partner_fatih_gemini_key') || '').trim();
    if (!key) {
      statusBox.className = 'p-2 rounded-lg text-xs bg-amber-500/20 border border-amber-500/40 text-amber-200 block';
      statusBox.innerHTML = '⚠️ Masukkan Google Gemini API Key terlebih dahulu.';
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span class="inline-block animate-spin mr-1">⏳</span> Menghubungi Gemini...';
    statusBox.className = 'p-2 rounded-lg text-xs bg-slate-800 border border-slate-700 text-slate-300 block';
    statusBox.innerHTML = 'Sedang menguji koneksi Google Gemini Flash...';

    const t0 = performance.now();
    try {
      const reply = await callGeminiApi('Berapa 2+2? Balas singkat hanya dengan: "2+2=4. Koneksi Gemini Flash Aktif!"', key);
      const elapsed = ((performance.now() - t0) / 1000).toFixed(2);
      const activeModel = cachedWorkingEndpoint ? cachedWorkingEndpoint.modelName : 'gemini-flash';

      statusBox.className = 'p-2.5 rounded-xl text-xs bg-indigo-500/20 border border-indigo-400/50 text-indigo-200 block';
      statusBox.innerHTML = `✅ <b>Koneksi Google Gemini (Tenaga Sekunder) Berhasil!</b><br/><span class="text-[10px] text-indigo-300 font-mono mt-0.5 block">Model: <b>${activeModel}</b> • Waktu respons: <b>${elapsed} detik</b></span><span class="text-[11px] text-slate-200 mt-1 block p-1.5 rounded-lg bg-black/30 border border-white/5"><i>"${escapeHtml(reply.substring(0, 160))}"</i></span>`;
    } catch(err) {
      statusBox.className = 'p-2.5 rounded-xl text-xs bg-rose-500/20 border border-rose-500/50 text-rose-200 block';
      statusBox.innerHTML = `❌ <b>Koneksi Gemini Gagal:</b><br/><span class="text-[11px] text-rose-300/90 mt-1 block">${escapeHtml(err.message || 'Terjadi kesalahan.')}</span>`;
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<span>🧪 Tes Koneksi Gemini</span>';
    }
  }

  function saveFatihAiKey() {
    const groqInput = document.getElementById('fatihGroqApiKeyInput');
    const geminiInput = document.getElementById('fatihGeminiApiKeyInput');

    const groqKey = groqInput ? groqInput.value.trim() : (localStorage.getItem('partner_fatih_groq_key') || '').trim();
    const geminiKey = geminiInput ? geminiInput.value.trim() : (localStorage.getItem('partner_fatih_gemini_key') || '').trim();

    if (groqKey) localStorage.setItem('partner_fatih_groq_key', groqKey);
    else localStorage.removeItem('partner_fatih_groq_key');

    if (geminiKey) localStorage.setItem('partner_fatih_gemini_key', geminiKey);
    else localStorage.removeItem('partner_fatih_gemini_key');

    localStorage.setItem('partner_fatih_ai_mode', selectedAiMode);
    updateFatihEngineStatusBadge();

    if (typeof window.showToast === 'function') {
      if (groqKey && geminiKey) {
        window.showToast('🚀 Dual-Engine AI Aktif!', 'Groq (0.3s) & Gemini tersimpan. Siap bergantian otomatis!', 'success');
      } else if (groqKey) {
        window.showToast('⚡ Groq Cloud Aktif', 'Groq LPU (0.3s) siap mendampingi.', 'success');
      } else if (geminiKey) {
        window.showToast('🌐 Gemini Flash Aktif', 'Google Gemini siap mendampingi.', 'success');
      } else {
        window.showToast('🍃 Mode Offline', 'Fathiya berjalan dalam mode offline lokal.', 'info');
      }
    }

    closeFatihAiSettings();
  }

  function removeFatihAiKey() {
    if (confirm('Hapus seluruh kunci AI online dan kembali ke mode cerdas offline?')) {
      localStorage.removeItem('partner_fatih_groq_key');
      localStorage.removeItem('partner_fatih_gemini_key');
      localStorage.setItem('partner_fatih_ai_mode', 'hybrid');

      const groqInput = document.getElementById('fatihGroqApiKeyInput');
      const geminiInput = document.getElementById('fatihGeminiApiKeyInput');
      if (groqInput) groqInput.value = '';
      if (geminiInput) geminiInput.value = '';

      updateFatihEngineStatusBadge();
      if (typeof window.showToast === 'function') {
        window.showToast('🗑️ Kunci Dihapus', 'Fathiya kembali ke mode offline mandiri.', 'info');
      }
      closeFatihAiSettings();
    }
  }

  function updateFatihEngineStatusBadge() {
    const badge = document.getElementById('fatihChatEngineMode');
    if (!badge) return;

    const groqKey = (localStorage.getItem('partner_fatih_groq_key') || '').trim();
    const geminiKey = (localStorage.getItem('partner_fatih_gemini_key') || '').trim();
    const mode = (localStorage.getItem('partner_fatih_ai_mode') || 'hybrid').trim();

    if (groqKey && geminiKey) {
      if (mode === 'groq') {
        badge.innerHTML = `
          <button type="button" onclick="window.cycleFatihEngineMode()" class="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-all cursor-pointer" title="Klik untuk beralih mode operasional AI">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>⚡ Tenaga Utama: Groq (0.3s)</span>
          </button>
        `;
      } else if (mode === 'gemini') {
        badge.innerHTML = `
          <button type="button" onclick="window.cycleFatihEngineMode()" class="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-bold transition-all cursor-pointer" title="Klik untuk beralih mode operasional AI">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>🌐 Tenaga Sekunder: Gemini Flash</span>
          </button>
        `;
      } else {
        badge.innerHTML = `
          <button type="button" onclick="window.cycleFatihEngineMode()" class="flex items-center gap-1.5 text-emerald-300 hover:text-teal-200 font-bold transition-all cursor-pointer" title="Klik untuk beralih mode operasional AI">
            <span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
            <span>⚡🔄 Utama: Groq (0.3s) ➔ Sekunder: Gemini</span>
          </button>
        `;
      }
    } else if (groqKey) {
      badge.innerHTML = `
        <button type="button" onclick="window.openFatihAiSettings()" class="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-all cursor-pointer">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>⚡ Tenaga Utama: Groq (0.3s)</span>
        </button>
      `;
    } else if (geminiKey) {
      badge.innerHTML = `
        <button type="button" onclick="window.openFatihAiSettings()" class="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-bold transition-all cursor-pointer">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>🌐 Tenaga Sekunder: Gemini Flash</span>
        </button>
      `;
    } else {
      badge.innerHTML = `
        <button type="button" onclick="window.openFatihAiSettings()" class="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-all cursor-pointer" title="Klik untuk pasang kunci online">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>🍃 Fathiya Pintar (Offline Lokal)</span>
        </button>
      `;
    }
  }

  function cycleFatihEngineMode() {
    const groqKey = (localStorage.getItem('partner_fatih_groq_key') || '').trim();
    const geminiKey = (localStorage.getItem('partner_fatih_gemini_key') || '').trim();

    if (!groqKey && !geminiKey) {
      openFatihAiSettings();
      return;
    }

    const current = (localStorage.getItem('partner_fatih_ai_mode') || 'hybrid').trim();
    let next = 'hybrid';
    if (groqKey && geminiKey) {
      if (current === 'hybrid') next = 'groq';
      else if (current === 'groq') next = 'gemini';
      else next = 'hybrid';
    } else if (groqKey) {
      next = 'groq';
    } else if (geminiKey) {
      next = 'gemini';
    }

    localStorage.setItem('partner_fatih_ai_mode', next);
    selectedAiMode = next;
    updateFatihEngineStatusBadge();

    const desc = next === 'hybrid'
      ? 'Utama: Groq (0.3s) ➔ Sekunder: Gemini Flash'
      : (next === 'groq' ? 'Khusus Groq Cloud (Tenaga Utama 0.3s)' : 'Khusus Google Gemini Flash (Tenaga Sekunder)');

    if (typeof window.showToast === 'function') {
      window.showToast('🔄 Mesin AI Berganti', desc, 'info');
    }
  }

  // --- 13B. CROSS-DEVICE MOBILE KEY SYNC (HP SYNC VIA WHATSAPP / QR CODE) ---
  function checkAutoImportAiKeyFromUrl() {
    try {
      const hash = window.location.hash || '';
      if (!hash) return;

      let importedGroq = '';
      let importedGemini = '';

      if (hash.includes('sync_groq=')) {
        const m = hash.match(/sync_groq=([^&]+)/);
        if (m && m[1]) importedGroq = decodeURIComponent(m[1]).trim();
      }
      if (hash.includes('sync_gemini=')) {
        const m = hash.match(/sync_gemini=([^&]+)/);
        if (m && m[1]) importedGemini = decodeURIComponent(m[1]).trim();
      }
      if (hash.includes('sync_ai=')) {
        const m = hash.match(/sync_ai=([^&]+)/);
        if (m && m[1]) {
          try {
            const rawJson = atob(decodeURIComponent(m[1]));
            const payload = JSON.parse(rawJson);
            if (payload.groq) importedGroq = payload.groq;
            if (payload.gemini) importedGemini = payload.gemini;
          } catch(e) {
            const val = decodeURIComponent(m[1]);
            if (val.startsWith('gsk_')) importedGroq = val;
            else if (val.startsWith('AIzaSy')) importedGemini = val;
          }
        }
      }

      let hasImported = false;
      if (importedGroq && importedGroq.length > 10) {
        localStorage.setItem('partner_fatih_groq_key', importedGroq);
        hasImported = true;
      }
      if (importedGemini && importedGemini.length > 10) {
        localStorage.setItem('partner_fatih_gemini_key', importedGemini);
        hasImported = true;
      }

      if (hasImported) {
        updateFatihEngineStatusBadge();
        // Bersihkan hash dari URL address bar agar aman dan rapi
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        setTimeout(() => {
          if (typeof window.showToast === 'function') {
            window.showToast('📱 Kunci AI Terhubung!', 'Fathiya AI Online berhasil aktif di HP Anda.', 'success');
          }
        }, 600);
      }
    } catch(err) {
      console.warn('Auto import AI key hash error:', err);
    }
  }

  function openCrossDeviceSyncModal() {
    let modal = document.getElementById('modalCrossDeviceSync');
    const groqInputVal = (document.getElementById('fatihGroqApiKeyInput')?.value || '').trim();
    const geminiInputVal = (document.getElementById('fatihGeminiApiKeyInput')?.value || '').trim();
    let groqKey = groqInputVal || (localStorage.getItem('partner_fatih_groq_key') || '').trim();
    let geminiKey = geminiInputVal || (localStorage.getItem('partner_fatih_gemini_key') || '').trim();
    const mode = (localStorage.getItem('partner_fatih_ai_mode') || 'hybrid').trim();

    if (!groqKey && !geminiKey) {
      alert('Masukkan atau simpan API Key terlebih dahulu agar bisa dihubungkan ke HP.');
      return;
    }

    const payload = btoa(JSON.stringify({ groq: groqKey, gemini: geminiKey, mode: mode }));
    const syncUrl = `${window.location.origin}/#sync_ai=${encodeURIComponent(payload)}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(syncUrl)}`;

    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modalCrossDeviceSync';
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="relative w-full max-w-sm bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-2xl text-slate-100 space-y-4">
        <div class="flex items-center justify-between border-b border-white/10 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xl">📱</span>
            <div>
              <h4 class="text-sm font-bold text-white">Hubungkan Kunci AI ke HP</h4>
              <p class="text-[10px] text-indigo-300">Aktifkan Groq &amp; Gemini di HP Samsung Galaxy A55</p>
            </div>
          </div>
          <button type="button" onclick="window.closeCrossDeviceSyncModal()" class="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer">✕</button>
        </div>

        <p class="text-[11px] text-slate-300 leading-relaxed">
          Penyimpanan browser di HP terpisah dari laptop. Link ini akan otomatis menghubungkan <b>kedua kunci (Groq &amp; Gemini)</b> sekaligus ke HP Anda:
        </p>

        <!-- Pilihan 1: Kirim ke WhatsApp -->
        <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
          <span class="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
            <span>💬 Cara 1: Kirim 1-Klik ke WhatsApp Sendiri</span>
          </span>
          <button type="button" onclick="window.openWaSyncLink('${encodeURIComponent(syncUrl)}')" class="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98">
            <span>📲 Buka WhatsApp &amp; Kirim Link</span>
          </button>
          <p class="text-[9.5px] text-slate-400 leading-tight">Ketuk tombol di atas untuk mengirim link ke WhatsApp Anda, lalu buka link tersebut di HP.</p>
        </div>

        <!-- Pilihan 2: Scan QR Code -->
        <div class="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-center space-y-2">
          <span class="text-[11px] font-bold text-indigo-300 flex items-center justify-center gap-1.5">
            <span>📷 Cara 2: Scan QR Code dengan Kamera HP</span>
          </span>
          <div class="flex justify-center p-2 bg-white rounded-xl inline-block mx-auto shadow-sm">
            <img src="${qrApiUrl}" alt="QR Code Link HP" class="w-36 h-36 mx-auto" />
          </div>
          <p class="text-[9.5px] text-slate-400 leading-tight">Arahkan kamera HP ke QR Code di atas, lalu ketuk tautan yang muncul di layar HP Anda.</p>
        </div>

        <!-- Salin Link Manual -->
        <div class="flex items-center gap-2 pt-1">
          <button type="button" onclick="window.copySyncLinkText('${encodeURIComponent(syncUrl)}')" class="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer flex items-center justify-center gap-1.5">
            <span>📋 Salin Link HP</span>
          </button>
          <button type="button" onclick="window.closeCrossDeviceSyncModal()" class="py-2 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold cursor-pointer">
            Tutup
          </button>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
  }

  function closeCrossDeviceSyncModal() {
    const modal = document.getElementById('modalCrossDeviceSync');
    if (modal) modal.style.display = 'none';
  }

  function openWaSyncLink(encodedUrl) {
    const rawUrl = decodeURIComponent(encodedUrl);
    const waMsg = encodeURIComponent(`Buka link ini di HP untuk mengaktifkan Fathiya AI Partner Fatih secara otomatis (Dual-Engine Groq + Gemini):\n\n${rawUrl}`);
    window.open(`https://wa.me/?text=${waMsg}`, '_blank');
  }

  function copySyncLinkText(encodedUrl) {
    const rawUrl = decodeURIComponent(encodedUrl);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(rawUrl).then(() => {
        if (typeof window.showToast === 'function') {
          window.showToast('📋 Link Disalin!', 'Tempelkan link ini di chat WA atau browser HP Anda.', 'success');
        }
      });
    } else {
      prompt('Salin link ini dan buka di HP Anda:', rawUrl);
    }
  }

  // --- 14. EXPORT GLOBALS & INITIALIZATION ---
  window.openFatihChat = openFatihChat;
  window.closeFatihChat = closeFatihChat;
  window.handleFatihChatSubmit = handleFatihChatSubmit;
  window.sendFatihQuickPrompt = sendFatihQuickPrompt;
  window.clearFatihChatHistory = clearFatihChatHistory;
  window.toggleFatihVoiceRecognition = toggleFatihVoiceRecognition;
  window.toggleFatihAutoVoice = toggleFatihAutoVoice;
  window.toggleFatihChatExpand = toggleFatihChatExpand;
  window.openFatihAiSettings = openFatihAiSettings;
  window.closeFatihAiSettings = closeFatihAiSettings;
  window.openCrossDeviceSyncModal = openCrossDeviceSyncModal;
  window.closeCrossDeviceSyncModal = closeCrossDeviceSyncModal;
  window.openWaSyncLink = openWaSyncLink;
  window.copySyncLinkText = copySyncLinkText;
  window.checkAutoImportAiKeyFromUrl = checkAutoImportAiKeyFromUrl;
  window.setAiOperationalMode = setAiOperationalMode;
  window.cycleFatihEngineMode = cycleFatihEngineMode;
  window.toggleShowGroqKey = toggleShowGroqKey;
  window.toggleShowGeminiKey = toggleShowGeminiKey;
  window.testFatihGroqKey = testFatihGroqKey;
  window.testFatihGeminiKey = testFatihGeminiKey;
  window.testFatihAiKey = testFatihGroqKey; // Backward compat
  window.saveFatihAiKey = saveFatihAiKey;
  window.removeFatihAiKey = removeFatihAiKey;
  window.updateFatihEngineStatusBadge = updateFatihEngineStatusBadge;
  window.speakFatihHistory = speakFatihHistory;
  window.handleFatihMsgVoiceClick = handleFatihMsgVoiceClick;
  window.stopFatihSpeech = stopFatihSpeech;
  window.testNaturalVoice = testNaturalVoice;
  window.cleanTextForNaturalSpeech = cleanTextForNaturalSpeech;
  window.matchLocalKnowledge = matchLocalKnowledge;
  window.detectActiveAppTab = detectActiveAppTab;
  window.detectOfflineActionIntent = detectOfflineActionIntent;
  window.executeFatihAction = executeFatihAction;
  window.getFathiyaUserProfile = getFathiyaUserProfile;
  window.saveFathiyaUserProfile = saveFathiyaUserProfile;

  // Global namespace resmi Fathiya AI
  window.FathiyaAI = {
    open: openFatihChat,
    close: closeFatihChat,
    submit: handleFatihChatSubmit,
    stopSpeech: stopFatihSpeech,
    testVoice: testNaturalVoice,
    detectOfflineActionIntent: detectOfflineActionIntent,
    executeFatihAction: executeFatihAction,
    getProfile: getFathiyaUserProfile,
    saveProfile: saveFathiyaUserProfile,
    matchLocal: matchLocalKnowledge
  };

  function initFatihApp() {
    checkAutoImportAiKeyFromUrl();
    injectChatUI();
    updateFatihEngineStatusBadge();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFatihApp);
  } else {
    initFatihApp();
  }

})(window, document);
