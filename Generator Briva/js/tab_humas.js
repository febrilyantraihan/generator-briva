// ============================================================================
// MODULE: tab_humas.js
// Tab 10: Humas & Sosmed Engine, Radar H-7, Pamflet, Task Tracker, Supabase & Modal Rincian
// ============================================================================
let humasActiveCalendarMonth = null;
let humasRadarHorizonDays = 7;
let humasProgramsList = [];
let humasTasksList = [];
let humasSelectedProgramForCaption = null;
let humasActiveMetricDetailScope = 'all';
let humasMetricDetailItems = [];
let humasParsedImportData = [];
let humasImportActiveTab = 'paste';

    const EDUCATIONAL_COMMEMORATIVE_DAYS = [
      // --- TAHUN 2026 ---
      {
        id: 'phbi-isra-miraj-2026',
        tgl: '16',
        startDate: '2026-01-16',
        endDate: '2026-01-16',
        bulan: 'Januari',
        tahun: '2026',
        uraian: "Peringatan Isra Mi'raj Nabi Muhammad SAW 1447 H (Edukasi Disiplin Shalat & Akhlakul Karimah)",
        pj: 'Humas & BPMP',
        sasaran: 'Seluruh Asatidz, Santri & Wali Santri',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'PHBI'
      },
      {
        id: 'edu-pendidikan-int-2026',
        tgl: '24',
        startDate: '2026-01-24',
        endDate: '2026-01-24',
        bulan: 'Januari',
        tahun: '2026',
        uraian: 'Hari Pendidikan Internasional (International Day of Education - UNESCO)',
        pj: 'BPMP & Humas',
        sasaran: 'Dewan Guru, Asatidz & Santri',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Edukasi'
      },
      {
        id: 'phbi-nisfu-syaban-2026',
        tgl: '03',
        startDate: '2026-02-03',
        endDate: '2026-02-03',
        bulan: 'Februari',
        tahun: '2026',
        uraian: "Malam Nisfu Sya'ban 1447 H (Doa Bersama, Muhasabah & Persiapan Ramadhan)",
        pj: 'Pengasuh Pondok & Humas',
        sasaran: 'Santri Pondok & Asatidz',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'PHBI'
      },
      {
        id: 'phbi-awal-ramadhan-2026',
        tgl: '18',
        startDate: '2026-02-18',
        endDate: '2026-02-18',
        bulan: 'Februari',
        tahun: '2026',
        uraian: 'Awal Puasa Ramadhan 1447 H (Tarhib Ramadhan, Tadarrus & Pembukaan Pesantren Kilat)',
        pj: 'Pengurus Pondok & Humas',
        sasaran: 'Seluruh Santri, Asatidz & Kaum Muslimin',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'PHBI'
      },
      {
        id: 'edu-bahasa-ibu-2026',
        tgl: '21',
        startDate: '2026-02-21',
        endDate: '2026-02-21',
        bulan: 'Februari',
        tahun: '2026',
        uraian: 'Hari Bahasa Ibu Internasional (Pelestarian Bahasa Daerah & Kearifan Lokal Literasi)',
        pj: 'Waka Kurikulum & Guru Bahasa',
        sasaran: 'Santri & Dewan Guru',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Edukasi'
      },
      {
        id: 'edu-sampah-2026',
        tgl: '21',
        startDate: '2026-02-21',
        endDate: '2026-02-21',
        bulan: 'Februari',
        tahun: '2026',
        uraian: 'Hari Peduli Sampah Nasional (Edukasi Pesantren Asri, Bersih & Cinta Lingkungan)',
        pj: 'Sarpras, UKS & Humas',
        sasaran: 'Seluruh Santri & Warga Pondok',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Edukasi'
      },
      {
        id: 'phbi-nuzulul-quran-2026',
        tgl: '06',
        startDate: '2026-03-06',
        endDate: '2026-03-06',
        bulan: 'Maret',
        tahun: '2026',
        uraian: "Peringatan Nuzulul Qur'an 1447 H (Malam Syiar Al-Qur'an, Tasmi' & Khotmil Qur'an)",
        pj: 'Koord. Tahfidz & Humas',
        sasaran: 'Santri Tahfidz, Asatidz & Wali Santri',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'PHBI'
      },
      {
        id: 'phbi-idul-fitri-2026',
        tgl: '20-21',
        startDate: '2026-03-20',
        endDate: '2026-03-21',
        bulan: 'Maret',
        tahun: '2026',
        uraian: 'Hari Raya Idul Fitri 1447 H (Tahniah Selamat Idul Fitri & Silaturahmi Akbar Yayasan)',
        pj: 'Yayasan & Humas',
        sasaran: 'Keluarga Besar YTPAI RML & Masyarakat Luas',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'PHBI'
      },
      {
        id: 'edu-puisi-2026',
        tgl: '21',
        startDate: '2026-03-21',
        endDate: '2026-03-21',
        bulan: 'Maret',
        tahun: '2026',
        uraian: "Hari Puisi Sedunia (Apresiasi Sastra, Cipta Puisi & Syi'ir Santri)",
        pj: 'Guru Bahasa & Seni',
        sasaran: 'Santri & Pengajar',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Edukasi'
      },
      {
        id: 'phbn-kartini-2026',
        tgl: '21',
        startDate: '2026-04-21',
        endDate: '2026-04-21',
        bulan: 'April',
        tahun: '2026',
        uraian: 'Peringatan Hari Kartini (Keteladanan Semangat Belajar Santriwati & Muslimah Masa Depan)',
        pj: 'Kepala Madrasah & Humas',
        sasaran: 'Santriwati, Asatidzah & Guru',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'nasional',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'PHBN'
      },
      {
        id: 'edu-bumi-2026',
        tgl: '22',
        startDate: '2026-04-22',
        endDate: '2026-04-22',
        bulan: 'April',
        tahun: '2026',
        uraian: 'Hari Bumi Sedunia (Edukasi Pesantren Hijau, Gerakan Hemat Air & Konservasi)',
        pj: 'Sarpras & Humas',
        sasaran: 'Santri & Pengurus Asrama',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Edukasi'
      },
      {
        id: 'edu-buku-sedunia-2026',
        tgl: '23',
        startDate: '2026-04-23',
        endDate: '2026-04-23',
        bulan: 'April',
        tahun: '2026',
        uraian: 'Hari Buku Sedunia & Hak Cipta (Pekan Gemar Membaca & Bedah Kitab Kuning)',
        pj: 'Perpustakaan & Humas',
        sasaran: 'Seluruh Santri & Asatidz',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Edukasi'
      },
      {
        id: 'edu-hardiknas-2026',
        tgl: '02',
        startDate: '2026-05-02',
        endDate: '2026-05-02',
        bulan: 'Mei',
        tahun: '2026',
        uraian: 'Hari Pendidikan Nasional (Hardiknas - Serentak Bergerak Wujudkan Merdeka Belajar)',
        pj: 'Yayasan, Kepala Madrasah & Humas',
        sasaran: 'Seluruh Guru, Karyawan, Asatidz & Santri',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'edukasi',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Hardiknas'
      },
      {
        id: 'edu-buku-nasional-2026',
        tgl: '17',
        startDate: '2026-05-17',
        endDate: '2026-05-17',
        bulan: 'Mei',
        tahun: '2026',
        uraian: 'Hari Buku Nasional (Gebyar Literasi Santri & Apresiasi Duta Baca Perpustakaan)',
        pj: 'Perpustakaan & Humas',
        sasaran: 'Seluruh Santri & Warga YTPAI',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Edukasi'
      },
      {
        id: 'phbn-harkitnas-2026',
        tgl: '20',
        startDate: '2026-05-20',
        endDate: '2026-05-20',
        bulan: 'Mei',
        tahun: '2026',
        uraian: 'Hari Kebangkitan Nasional (Harkitnas - Bangkit Bersama Menuju Generasi Emas Pelajar)',
        pj: 'Waka Kesiswaan & Humas',
        sasaran: 'Santri & Pendidik',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'nasional',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Harkitnas'
      },
      {
        id: 'phbi-arafah-2026',
        tgl: '26',
        startDate: '2026-05-26',
        endDate: '2026-05-26',
        bulan: 'Mei',
        tahun: '2026',
        uraian: 'Hari Arafah 1447 H (Himbauan Puasa Sunnah Arafah & Muhasabah Doa Akbar)',
        pj: 'Pengasuh Pondok & Humas',
        sasaran: 'Seluruh Santri & Wali Santri',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'PHBI'
      },
      {
        id: 'phbi-idul-adha-2026',
        tgl: '27',
        startDate: '2026-05-27',
        endDate: '2026-05-27',
        bulan: 'Mei',
        tahun: '2026',
        uraian: 'Hari Raya Idul Adha 1447 H (Edukasi Qurban, Keteladanan Nabi Ibrahim & Bakti Sosial)',
        pj: 'Panitia Qurban & Humas',
        sasaran: 'Santri, Asatidz, Wali Santri & Masyarakat Babat',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'Idul Adha'
      },
      {
        id: 'phbn-pancasila-2026',
        tgl: '01',
        startDate: '2026-06-01',
        endDate: '2026-06-01',
        bulan: 'Juni',
        tahun: '2026',
        uraian: 'Hari Lahir Pancasila (Peneguhan Karakter Kebangsaan & Profil Pelajar Pancasila Rahmatan Lil Alamin)',
        pj: 'Yayasan, Kepala Sekolah & Humas',
        sasaran: 'Seluruh Asatidz, Santri & Tenaga Kependidikan',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'nasional',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Pancasila'
      },
      {
        id: 'edu-lingkungan-2026',
        tgl: '05',
        startDate: '2026-06-05',
        endDate: '2026-06-05',
        bulan: 'Juni',
        tahun: '2026',
        uraian: "Hari Lingkungan Hidup Sedunia (Aksi Adiwiyata, Ro'an Akbar Kebersihan Madrasah & Asrama)",
        pj: 'Sarpras & Humas',
        sasaran: 'Seluruh Santri & Pengurus',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Edukasi'
      },
      {
        id: 'phbi-muharram-2026',
        tgl: '16',
        startDate: '2026-06-16',
        endDate: '2026-06-16',
        bulan: 'Juni',
        tahun: '2026',
        uraian: "Tahun Baru Islam 1 Muharram 1448 H (Pawai Ta'aruf Hijriah & Refleksi Awal Tahun Santri)",
        pj: 'Yayasan & Humas',
        sasaran: 'Keluarga Besar YTPAI RML',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: '1 Muharram'
      },
      {
        id: 'phbi-asyura-2026',
        tgl: '25',
        startDate: '2026-06-25',
        endDate: '2026-06-25',
        bulan: 'Juni',
        tahun: '2026',
        uraian: 'Hari Asyura 10 Muharram 1448 H (Puasa Sunnah Asyura & Santunan Santri Yatim/Dhuafa)',
        pj: 'Sie Sosial & Humas',
        sasaran: 'Santri Yatim & Kaum Dhuafa',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'Asyura'
      },
      {
        id: 'edu-han-2026',
        tgl: '23',
        startDate: '2026-07-23',
        endDate: '2026-07-23',
        bulan: 'Juli',
        tahun: '2026',
        uraian: 'Hari Anak Nasional (HAN - Wujudkan Madrasah Ramah Anak, Terlindungi & Berprestasi)',
        pj: 'BK, Kesiswaan & Humas',
        sasaran: 'Santri & Orang Tua',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Hari Anak'
      },
      {
        id: 'edu-teknologi-2026',
        tgl: '10',
        startDate: '2026-08-10',
        endDate: '2026-08-10',
        bulan: 'Agustus',
        tahun: '2026',
        uraian: 'Hari Kebangkitan Teknologi Nasional (Pengenalan Coding, AI Positif & Literasi Digital Santri)',
        pj: 'Lab Komputer, IT & Humas',
        sasaran: 'Santri MTs, SMP, MA, SMA',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Teknologi'
      },
      {
        id: 'edu-pramuka-2026',
        tgl: '14',
        startDate: '2026-08-14',
        endDate: '2026-08-14',
        bulan: 'Agustus',
        tahun: '2026',
        uraian: 'Hari Pramuka Nasional (Pendidikan Kepanduan, Kemandirian, Disiplin & Jiwa Dasa Dharma)',
        pj: 'Pembina Pramuka & Humas',
        sasaran: 'Gudep Pramuka YTPAI Babat',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Pramuka'
      },
      {
        id: 'phbn-hut-ri-2026',
        tgl: '17',
        startDate: '2026-08-17',
        endDate: '2026-08-17',
        bulan: 'Agustus',
        tahun: '2026',
        uraian: 'HUT Proklamasi Kemerdekaan RI Ke-81 (Upacara Pengibaran Sang Merah Putih & Gebyar Kemerdekaan)',
        pj: 'Yayasan, Panitia HUT RI & Humas',
        sasaran: 'Seluruh Santri, Asatidz, Karyawan & Tokoh Babat',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'nasional',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'HUT RI'
      },
      {
        id: 'phbi-maulid-2026',
        tgl: '25',
        startDate: '2026-08-25',
        endDate: '2026-08-25',
        bulan: 'Agustus',
        tahun: '2026',
        uraian: 'Peringatan Maulid Nabi Muhammad SAW 1448 H (Meneladani Akhlak Rasulullah & Sholawat Akbar)',
        pj: 'Pengasuh Pondok & Humas',
        sasaran: 'Keluarga Besar YTPAI RML & Alumni',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'Maulid Nabi'
      },
      {
        id: 'edu-aksara-2026',
        tgl: '08',
        startDate: '2026-09-08',
        endDate: '2026-09-08',
        bulan: 'September',
        tahun: '2026',
        uraian: 'Hari Aksara Internasional / Literasi Sedunia (Membangun Daya Kritis Melalui Budaya Membaca)',
        pj: 'Perpustakaan & Humas',
        sasaran: 'Santri & Tenaga Pendidik',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Literasi'
      },
      {
        id: 'phbn-kesaktian-pancasila-2026',
        tgl: '01',
        startDate: '2026-10-01',
        endDate: '2026-10-01',
        bulan: 'Oktober',
        tahun: '2026',
        uraian: 'Hari Kesaktian Pancasila (Upacara Khidmat & Penanaman Nilai-Nilai Luhur Bangsa)',
        pj: 'Kesiswaan & Humas',
        sasaran: 'Dewan Guru & Santri',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'nasional',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Kesaktian Pancasila'
      },
      {
        id: 'phbn-batik-2026',
        tgl: '02',
        startDate: '2026-10-02',
        endDate: '2026-10-02',
        bulan: 'Oktober',
        tahun: '2026',
        uraian: 'Hari Batik Nasional (Bangga Mengenakan Busana Warisan Mahakarya Budaya Indonesia)',
        pj: 'Humas & OSIS',
        sasaran: 'Asatidz, Santri & Karyawan',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'nasional',
        isPeringatan: true,
        badge: 'Batik'
      },
      {
        id: 'edu-guru-sedunia-2026',
        tgl: '05',
        startDate: '2026-10-05',
        endDate: '2026-10-05',
        bulan: 'Oktober',
        tahun: '2026',
        uraian: 'Hari Guru Sedunia (World Teachers Day - Menghargai Dedikasi Pahlawan Tanpa Tanda Jasa)',
        pj: 'OSIS & Humas',
        sasaran: 'Pendidik di Seluruh Dunia & YTPAI',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Guru Sedunia'
      },
      {
        id: 'edu-ctps-2026',
        tgl: '15',
        startDate: '2026-10-15',
        endDate: '2026-10-15',
        bulan: 'Oktober',
        tahun: '2026',
        uraian: 'Hari Cuci Tangan Pakai Sabun Sedunia (Gerakan Santri Bersih, Sehat & Bebas Kuman)',
        pj: 'UKS & Humas',
        sasaran: 'Santri Asrama & Pengurus',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Kesehatan'
      },
      {
        id: 'phbi-hsn-2026',
        tgl: '22',
        startDate: '2026-10-22',
        endDate: '2026-10-22',
        bulan: 'Oktober',
        tahun: '2026',
        uraian: 'Hari Santri Nasional (HSN 2026 - Resolusi Jihad, Apel Akbar Santri & Santri Berdaya Menjaga Martabat Bangsa)',
        pj: 'Yayasan, Seluruh Unit, Pengurus Pondok & Humas',
        sasaran: 'Seluruh Santri, Alumni, Asatidz & Warga Babat',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Hari Santri'
      },
      {
        id: 'phbn-sumpah-pemuda-2026',
        tgl: '28',
        startDate: '2026-10-28',
        endDate: '2026-10-28',
        bulan: 'Oktober',
        tahun: '2026',
        uraian: 'Hari Sumpah Pemuda (Upacara Peringatan, Ikrar Pemuda Santri & Gelora Bersatu Bangun Bangsa)',
        pj: 'Kesiswaan, OSIS & Humas',
        sasaran: 'Santri Generasi Muda Penerus',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'nasional',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Sumpah Pemuda'
      },
      {
        id: 'phbn-pahlawan-2026',
        tgl: '10',
        startDate: '2026-11-10',
        endDate: '2026-11-10',
        bulan: 'November',
        tahun: '2026',
        uraian: 'Hari Pahlawan Nasional (Ziarah & Refleksi Jihad Ulama Mempertahankan Kemerdekaan)',
        pj: 'Yayasan & Humas',
        sasaran: 'Dewan Guru, Santri & Warga',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'nasional',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Hari Pahlawan'
      },
      {
        id: 'edu-ayah-hkn-2026',
        tgl: '12',
        startDate: '2026-11-12',
        endDate: '2026-11-12',
        bulan: 'November',
        tahun: '2026',
        uraian: 'Hari Kesehatan Nasional & Hari Ayah Nasional (Birrul Walidain kepada Ayah & Hidup Bugar)',
        pj: 'BK, UKS & Humas',
        sasaran: 'Santri & Para Ayah Hebat',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Hari Ayah'
      },
      {
        id: 'edu-anak-sedunia-2026',
        tgl: '20',
        startDate: '2026-11-20',
        endDate: '2026-11-20',
        bulan: 'November',
        tahun: '2026',
        uraian: 'Hari Anak Sedunia (World Children Day - Hak Belajar Tanpa Kekerasan & Penuh Kasih)',
        pj: 'BK & Humas',
        sasaran: 'Santri & Guru BK',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Anak Sedunia'
      },
      {
        id: 'edu-hgn-2026',
        tgl: '25',
        startDate: '2026-11-25',
        endDate: '2026-11-25',
        bulan: 'November',
        tahun: '2026',
        uraian: 'Hari Guru Nasional (HGN) & HUT PGRI (Apresiasi Akbar Pengabdian Asatidz & Dewan Guru YTPAI)',
        pj: 'Yayasan, OSIS & Seluruh Santri',
        sasaran: 'Seluruh Asatidz & Dewan Guru',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'edukasi',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Hari Guru'
      },
      {
        id: 'edu-disabilitas-2026',
        tgl: '03',
        startDate: '2026-12-03',
        endDate: '2026-12-03',
        bulan: 'Desember',
        tahun: '2026',
        uraian: 'Hari Disabilitas Internasional (Pendidikan Inklusi, Toleransi & Nilai Empati Sosial)',
        pj: 'BK & Humas',
        sasaran: 'Warga Madrasah & Santri',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Inklusi'
      },
      {
        id: 'edu-antikorupsi-2026',
        tgl: '09',
        startDate: '2026-12-09',
        endDate: '2026-12-09',
        bulan: 'Desember',
        tahun: '2026',
        uraian: 'Hari Antikorupsi Sedunia (Hakordia - Pendidikan Karakter Kejujuran, Integritas & Anti Kecurangan)',
        pj: 'Kurikulum, BPMP & Humas',
        sasaran: 'Seluruh Santri & Pendidik',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Integritas'
      },
      {
        id: 'phbi-bahasa-arab-2026',
        tgl: '18',
        startDate: '2026-12-18',
        endDate: '2026-12-18',
        bulan: 'Desember',
        tahun: '2026',
        uraian: "Hari Bahasa Arab Sedunia (UNESCO - Bahasa Al-Qur'an, Khazanah Keilmuan Islam & Syiar Pesantren)",
        pj: 'LPBA & Humas',
        sasaran: 'Santri Madin, Madrasah & Asatidz',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'Bahasa Arab'
      },
      {
        id: 'phbn-ibu-2026',
        tgl: '22',
        startDate: '2026-12-22',
        endDate: '2026-12-22',
        bulan: 'Desember',
        tahun: '2026',
        uraian: 'Hari Ibu Nasional (Kasih Sayang Ibunda Sepanjang Hayat, Mahabbah & Birrul Walidain)',
        pj: 'Humas & Seluruh Santri',
        sasaran: 'Para Ibu Santri & Ummahat Pesantren',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'nasional',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Hari Ibu'
      },

      // --- TAHUN 2027 ---
      {
        id: 'phbi-isra-miraj-2027',
        tgl: '05',
        startDate: '2027-01-05',
        endDate: '2027-01-05',
        bulan: 'Januari',
        tahun: '2027',
        uraian: "Peringatan Isra Mi'raj Nabi Muhammad SAW 1448 H",
        pj: 'Humas & BPMP',
        sasaran: 'Seluruh Warga YTPAI',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'PHBI'
      },
      {
        id: 'phbi-nisfu-syaban-2027',
        tgl: '23',
        startDate: '2027-01-23',
        endDate: '2027-01-23',
        bulan: 'Januari',
        tahun: '2027',
        uraian: "Malam Nisfu Sya'ban 1448 H (Muhasabah & Doa Bersama)",
        pj: 'Pengasuh Pondok & Humas',
        sasaran: 'Santri & Asatidz',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'PHBI'
      },
      {
        id: 'edu-pendidikan-int-2027',
        tgl: '24',
        startDate: '2027-01-24',
        endDate: '2027-01-24',
        bulan: 'Januari',
        tahun: '2027',
        uraian: 'Hari Pendidikan Internasional 2027 (Transformasi Pendidikan & Literasi Global)',
        pj: 'BPMP & Humas',
        sasaran: 'Dewan Guru & Santri',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Edukasi'
      },
      {
        id: 'phbi-awal-ramadhan-2027',
        tgl: '08',
        startDate: '2027-02-08',
        endDate: '2027-02-08',
        bulan: 'Februari',
        tahun: '2027',
        uraian: 'Awal Puasa Ramadhan 1448 H (Tarhib & Pembukaan Pesantren Kilat)',
        pj: 'Pengurus Pondok & Humas',
        sasaran: 'Seluruh Santri & Warga YTPAI',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'PHBI'
      },
      {
        id: 'edu-bahasa-ibu-2027',
        tgl: '21',
        startDate: '2027-02-21',
        endDate: '2027-02-21',
        bulan: 'Februari',
        tahun: '2027',
        uraian: 'Hari Bahasa Ibu Internasional 2027',
        pj: 'Waka Kurikulum & Guru Bahasa',
        sasaran: 'Santri & Dewan Guru',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Edukasi'
      },
      {
        id: 'phbi-nuzulul-quran-2027',
        tgl: '24',
        startDate: '2027-02-24',
        endDate: '2027-02-24',
        bulan: 'Februari',
        tahun: '2027',
        uraian: "Peringatan Nuzulul Qur'an 1448 H (Syiar Al-Qur'an & Khotmil Qur'an Santri)",
        pj: 'Koord. Tahfidz & Humas',
        sasaran: 'Santri Tahfidz & Wali Santri',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'PHBI'
      },
      {
        id: 'phbi-idul-fitri-2027',
        tgl: '09-10',
        startDate: '2027-03-09',
        endDate: '2027-03-10',
        bulan: 'Maret',
        tahun: '2027',
        uraian: 'Hari Raya Idul Fitri 1448 H (Tahniah Selamat Idul Fitri & Maaf Lahir Batin)',
        pj: 'Yayasan & Humas',
        sasaran: 'Keluarga Besar YTPAI RML & Masyarakat',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'Idul Fitri'
      },
      {
        id: 'phbn-kartini-2027',
        tgl: '21',
        startDate: '2027-04-21',
        endDate: '2027-04-21',
        bulan: 'April',
        tahun: '2027',
        uraian: 'Peringatan Hari Kartini 2027 (Inspirasi Pendidikan Santriwati)',
        pj: 'Kepala Madrasah & Humas',
        sasaran: 'Santriwati & Guru',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'nasional',
        isPeringatan: true,
        badge: 'PHBN'
      },
      {
        id: 'edu-buku-sedunia-2027',
        tgl: '23',
        startDate: '2027-04-23',
        endDate: '2027-04-23',
        bulan: 'April',
        tahun: '2027',
        uraian: 'Hari Buku Sedunia 2027 (Pekan Literasi Pesantren)',
        pj: 'Perpustakaan & Humas',
        sasaran: 'Santri & Pengajar',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Edukasi'
      },
      {
        id: 'edu-hardiknas-2027',
        tgl: '02',
        startDate: '2027-05-02',
        endDate: '2027-05-02',
        bulan: 'Mei',
        tahun: '2027',
        uraian: 'Hari Pendidikan Nasional (Hardiknas 2027 - Semarak Merdeka Belajar)',
        pj: 'Yayasan & Humas',
        sasaran: 'Seluruh Asatidz, Guru & Santri',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'edukasi',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Hardiknas'
      },
      {
        id: 'phbi-idul-adha-2027',
        tgl: '16',
        startDate: '2027-05-16',
        endDate: '2027-05-16',
        bulan: 'Mei',
        tahun: '2027',
        uraian: 'Hari Raya Idul Adha 1448 H (Edukasi Qurban & Kepedulian Sosial Santri)',
        pj: 'Panitia Qurban & Humas',
        sasaran: 'Warga YTPAI & Lingkungan Babat',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'Idul Adha'
      },
      {
        id: 'phbn-harkitnas-2027',
        tgl: '20',
        startDate: '2027-05-20',
        endDate: '2027-05-20',
        bulan: 'Mei',
        tahun: '2027',
        uraian: 'Hari Kebangkitan Nasional (Harkitnas 2027)',
        pj: 'Kesiswaan & Humas',
        sasaran: 'Santri & Guru',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'nasional',
        isPeringatan: true,
        badge: 'Harkitnas'
      },
      {
        id: 'phbn-pancasila-2027',
        tgl: '01',
        startDate: '2027-06-01',
        endDate: '2027-06-01',
        bulan: 'Juni',
        tahun: '2027',
        uraian: 'Hari Lahir Pancasila 2027 (Karakter Kebangsaan Santri Pelajar Indonesia)',
        pj: 'Kepala Madrasah & Humas',
        sasaran: 'Seluruh Santri & Pendidik',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'nasional',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Pancasila'
      },
      {
        id: 'phbi-muharram-2027',
        tgl: '06',
        startDate: '2027-06-06',
        endDate: '2027-06-06',
        bulan: 'Juni',
        tahun: '2027',
        uraian: 'Tahun Baru Islam 1 Muharram 1449 H (Semarak Hijrah Menuju Prestasi Baru)',
        pj: 'Yayasan & Humas',
        sasaran: 'Keluarga Besar YTPAI RML',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: '1 Muharram'
      },
      {
        id: 'edu-han-2027',
        tgl: '23',
        startDate: '2027-07-23',
        endDate: '2027-07-23',
        bulan: 'Juli',
        tahun: '2027',
        uraian: 'Hari Anak Nasional 2027 (Sekolah Ramah Santri & Pelindungan Hak Belajar Anak)',
        pj: 'BK & Humas',
        sasaran: 'Santri & Wali Murid',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'edukasi',
        isPeringatan: true,
        badge: 'Hari Anak'
      },
      {
        id: 'phbn-hut-ri-2027',
        tgl: '17',
        startDate: '2027-08-17',
        endDate: '2027-08-17',
        bulan: 'Agustus',
        tahun: '2027',
        uraian: 'HUT Proklamasi Kemerdekaan RI Ke-82 (Upacara Bendera Akbar & Lomba Kreatif)',
        pj: 'Yayasan & Humas',
        sasaran: 'Seluruh Civitas Akademika YTPAI',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'nasional',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'HUT RI'
      },
      {
        id: 'phbi-maulid-2027',
        tgl: '15',
        startDate: '2027-08-15',
        endDate: '2027-08-15',
        bulan: 'Agustus',
        tahun: '2027',
        uraian: 'Peringatan Maulid Nabi Muhammad SAW 1449 H',
        pj: 'Pengasuh Pondok & Humas',
        sasaran: 'Santri, Alumni & Jamaah',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'Maulid Nabi'
      },
      {
        id: 'phbi-hsn-2027',
        tgl: '22',
        startDate: '2027-10-22',
        endDate: '2027-10-22',
        bulan: 'Oktober',
        tahun: '2027',
        uraian: 'Hari Santri Nasional 2027 (HSN 2027 - Mengawal Peradaban & Nilai Luhur Bangsa)',
        pj: 'Yayasan, Pengurus Pondok & Humas',
        sasaran: 'Seluruh Santri & Warga Lamongan',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'phbi',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Hari Santri'
      },
      {
        id: 'phbn-sumpah-pemuda-2027',
        tgl: '28',
        startDate: '2027-10-28',
        endDate: '2027-10-28',
        bulan: 'Oktober',
        tahun: '2027',
        uraian: 'Hari Sumpah Pemuda 2027 (Ikrar Pemuda Santri Tangguh Berprestasi)',
        pj: 'Kesiswaan & Humas',
        sasaran: 'Santri & Dewan Guru',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'nasional',
        isPeringatan: true,
        badge: 'Sumpah Pemuda'
      },
      {
        id: 'phbn-pahlawan-2027',
        tgl: '10',
        startDate: '2027-11-10',
        endDate: '2027-11-10',
        bulan: 'November',
        tahun: '2027',
        uraian: 'Hari Pahlawan Nasional 2027 (Teladan Kepahlawanan Pejuang & Ulama)',
        pj: 'Humas & Kesiswaan',
        sasaran: 'Santri & Asatidz',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'nasional',
        isPeringatan: true,
        badge: 'Hari Pahlawan'
      },
      {
        id: 'edu-hgn-2027',
        tgl: '25',
        startDate: '2027-11-25',
        endDate: '2027-11-25',
        bulan: 'November',
        tahun: '2027',
        uraian: 'Hari Guru Nasional (HGN) & HUT PGRI 2027 (Terima Kasih Guruku & Apresiasi Pendidik)',
        pj: 'Yayasan, Santri & Humas',
        sasaran: 'Seluruh Dewan Guru & Asatidz',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'edukasi',
        isPeringatan: true,
        isPeringatanNasional: true,
        badge: 'Hari Guru'
      },
      {
        id: 'phbi-bahasa-arab-2027',
        tgl: '18',
        startDate: '2027-12-18',
        endDate: '2027-12-18',
        bulan: 'Desember',
        tahun: '2027',
        uraian: "Hari Bahasa Arab Sedunia 2027 (UNESCO - Bahasa Peradaban & Cinta Al-Qur'an)",
        pj: 'LPBA & Humas',
        sasaran: 'Santri & Pengajar Bahasa',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA',
        kategori: 'phbi',
        isPeringatan: true,
        badge: 'Bahasa Arab'
      },
      {
        id: 'phbn-ibu-2027',
        tgl: '22',
        startDate: '2027-12-22',
        endDate: '2027-12-22',
        bulan: 'Desember',
        tahun: '2027',
        uraian: 'Hari Ibu Nasional 2027 (Mahabbah & Doa Tulus untuk Ibunda Tercinta)',
        pj: 'Humas & Santri',
        sasaran: 'Seluruh Ummahat & Santri',
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA,TT',
        kategori: 'nasional',
        isPeringatan: true,
        badge: 'Hari Ibu'
      }
    ];

// State management Humas
let humasState = {
  programs: [],
  currentMonthFilter: 'September', // Default per bulan (Bulan Ini)
  currentStatusFilter: 'all',
  searchQuery: '',
  refDate: '2026-09-14', // Default mengikuti tanggal kalender saat ini
  selectedCategory: 'resmi',
  outputMode: 'instagram', // 'instagram' | 'facebook' | 'tiktok' | 'wa' | 'story'
  viralTone: 'pro', // 'pro' | 'emotional' | 'dinamis' | 'quotes'
  viralHookIndex: 0
};

function initHumasModule() {
  // 1. Inisialisasi tanggal acuan hari ini
  const todayStr = getTodayIsoDateString();
  humasState.refDate = todayStr;
  const simInput = document.getElementById('humasSimDate');
  if (simInput) simInput.value = humasState.refDate;

  // 2. Muat data dari localStorage atau default
  loadHumasPrograms();
  if (!humasState.programs.some(function(p) { return p.kategori === 'tasmi' || (p.uraian || '').toLowerCase().indexOf('tasmi') !== -1; })) {
    syncTahfidzToHumasAgenda(true);
  }

      // 3. Render antarmuka
      renderHumasMetrics();
      renderHumasH7RadarCards();
      renderHumasTable();

      // 4. Inisialisasi platform dan gaya bahasa sosmed default
      setHumasOutputMode('instagram');
      setViralTone('pro');

      // 5. Inisialisasi caption generator preview bila belum ada isinya
      const judInput = document.getElementById('capInputJudul');
      if (judInput && !judInput.value) {
        // Otomatis isi dengan agenda terdekat dalam H-7
        const nearestH7 = getUpcomingH7Programs(humasState.refDate)[0];
        if (nearestH7) {
          loadProgramIntoCaptionStudio(nearestH7.id, false);
        } else {
          judInput.value = 'Seminar Kesehatan Mental';
          document.getElementById('capInputWaktu').value = 'Jumat, 18 September 2026';
          document.getElementById('capInputPj').value = 'Usth. Khuffah';
          document.getElementById('capInputSasaran').value = 'Seluruh Santri Putri Pondok Pesantren Raudlatul Muta\'allimin';
          document.getElementById('capInputPoin').value = 'Pembekalan kesehatan mental santriwati, ketahanan emosional di pondok, serta tips menjaga kebahagiaan dan motivasi belajar.';
          renderCaptionPreview();
        }
      }

      // 6. Inisialisasi Task Tracker & Checklist Kegiatan
      try {
        initHumasTasks();
      } catch (e) {
        console.warn('Init humas tasks error:', e);
      }

      // 7. Auto-sinkronisasi status Supabase
      if (typeof initHumasSupabaseSync === 'function') {
        initHumasSupabaseSync();
      }
    }

    // =========================================================================
    // --- 10.B. HUMAS & SOSMED TASK TRACKER & CHECKLIST ANTI-LUPA ---
    // =========================================================================
    const DEFAULT_HUMAS_TASKS = [
      { id: 'ht-1', title: 'Menaikkan Kelas', category: 'Akademik', needsPamflet: false, completed: true, date: '2026-09-14' },
      { id: 'ht-2', title: 'Tagihan Pedoman Awal Tahun Kelas Baru', category: 'Administrasi & Tagihan', needsPamflet: false, completed: true, date: '2026-09-14' },
      { id: 'ht-3', title: 'Tagihan Pedoman Awal Tahun, Bulan Juli Siswa Lama', category: 'Administrasi & Tagihan', needsPamflet: false, completed: true, date: '2026-09-15' },
      { id: 'ht-4', title: 'Menerbitkan Tagihan Bimbel', category: 'Administrasi & Tagihan', needsPamflet: false, completed: true, date: '2026-09-15' },
      { id: 'ht-5', title: 'Perubahan Data Bu Zah', category: 'Data & Guru', needsPamflet: false, completed: false, date: '2026-09-16' },
      { id: 'ht-6', title: 'Postingan IG', category: 'Medsos & IG', needsPamflet: true, completed: false, date: '2026-09-17' },
      { id: 'ht-7', title: 'MATSAMA (Masa Ta\'aruf Siswa Madrasah)', category: 'Acara Pesantren', needsPamflet: true, completed: false, date: '2026-09-18' },
      { id: 'ht-8', title: 'Iftitah Dirasah', category: 'Acara Pesantren', needsPamflet: true, completed: false, date: '2026-09-19' },
      { id: 'ht-9', title: 'Class Meeting', category: 'Acara Pesantren', needsPamflet: true, completed: false, date: '2026-09-20' },
      { id: 'ht-10', title: 'Juara Class Meeting (Publikasi Prestasi)', category: 'Publikasi Prestasi', needsPamflet: true, completed: false, date: '2026-09-21' },
      { id: 'ht-11', title: 'Tasmik Borongan (Tasmi\' Akbar)', category: 'Tahfidz Tasmi\'', needsPamflet: true, completed: false, date: '2026-09-22' },
      { id: 'ht-12', title: 'Khutbatul Arsy (Pekan Perkenalan Pondok)', category: 'Acara Pesantren', needsPamflet: true, completed: false, date: '2026-09-23' },
      { id: 'ht-13', title: 'Tasmik Fahri, Zandi', category: 'Tahfidz Tasmi\'', needsPamflet: true, completed: false, date: '2026-09-24' },
      { id: 'ht-14', title: 'Website Bendahara', category: 'IT & Web', needsPamflet: false, completed: false, date: '2026-09-25' },
      { id: 'ht-15', title: 'Website Pesantren', category: 'IT & Web', needsPamflet: false, completed: false, date: '2026-09-26' }
    ];

    let humasTaskState = {
      tasks: [],
      filter: 'all',
      search: ''
    };

    function initHumasTasks() {
      try {
        const saved = localStorage.getItem('humas_tasks_user_v3');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            humasTaskState.tasks = parsed;
          } else {
            humasTaskState.tasks = JSON.parse(JSON.stringify(DEFAULT_HUMAS_TASKS));
          }
        } else {
          humasTaskState.tasks = JSON.parse(JSON.stringify(DEFAULT_HUMAS_TASKS));
        }
      } catch (e) {
        humasTaskState.tasks = JSON.parse(JSON.stringify(DEFAULT_HUMAS_TASKS));
      }
      renderHumasTaskList();
    }

    function saveHumasTasksLocal() {
      try {
        localStorage.setItem('humas_tasks_user_v3', JSON.stringify(humasTaskState.tasks));
      } catch (e) {
        console.warn('Gagal menyimpan task tracker:', e);
      }
    }

    function toggleHumasTaskAddForm() {
      const card = document.getElementById('humasTaskAddFormCard');
      if (!card) return;
      const isHidden = card.classList.contains('hidden');
      if (isHidden) {
        card.classList.remove('hidden');
        setTimeout(() => {
          const input = document.getElementById('inputTaskTitle');
          if (input) input.focus();
        }, 100);
      } else {
        card.classList.add('hidden');
      }
    }

    function submitNewHumasTask() {
      const titleInput = document.getElementById('inputTaskTitle');
      const catSelect = document.getElementById('selectTaskCategory');
      const pamSelect = document.getElementById('selectTaskNeedsPamflet');

      const title = (titleInput?.value || '').trim();
      if (!title) {
        if (titleInput) {
          titleInput.focus();
          titleInput.classList.add('ring-2', 'ring-rose-500');
          setTimeout(() => titleInput.classList.remove('ring-2', 'ring-rose-500'), 1500);
        }
        return;
      }

      const newTask = {
        id: 'ht-' + Date.now(),
        title: title,
        category: catSelect ? catSelect.value : 'Acara Pesantren',
        needsPamflet: pamSelect ? pamSelect.value === 'true' : true,
        completed: false,
        date: getTodayIsoDateString()
      };

      humasTaskState.tasks.unshift(newTask);
      saveHumasTasksLocal();

      if (titleInput) titleInput.value = '';
      toggleHumasTaskAddForm();
      renderHumasTaskList();
      try { triggerHaptic(15); } catch (e) {}
    }

    function toggleHumasTaskCompleted(taskId) {
      const task = humasTaskState.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        saveHumasTasksLocal();
        renderHumasTaskList();
        try { triggerHaptic(10); } catch (e) {}
      }
    }

    function deleteHumasTask(taskId) {
      if (confirm('Hapus kegiatan ini dari daftar checklist?')) {
        humasTaskState.tasks = humasTaskState.tasks.filter(t => t.id !== taskId);
        saveHumasTasksLocal();
        renderHumasTaskList();
        try { triggerHaptic(15); } catch (e) {}
      }
    }

    function filterHumasTasks(filterType) {
      humasTaskState.filter = filterType;
      ['all', 'needsPamflet', 'noPamflet', 'pending', 'completed'].forEach(f => {
        const btn = document.getElementById('taskFilter-' + f);
        if (btn) {
          if (f === filterType) {
            btn.className = 'task-filter-btn active px-2.5 sm:px-3 py-1 rounded-md text-[11px] font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs shrink-0 cursor-pointer transition-all flex items-center gap-1';
          } else {
            btn.className = 'task-filter-btn px-2.5 sm:px-3 py-1 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 shrink-0 cursor-pointer transition-all flex items-center gap-1';
          }
        }
      });
      renderHumasTaskList();
    }

    function searchHumasTasks(query) {
      humasTaskState.search = (query || '').toLowerCase().trim();
      renderHumasTaskList();
    }

    function resetHumasTasksToDefault() {
      if (confirm('Kembalikan daftar checklist ke 12 kegiatan bawaan standar?')) {
        humasTaskState.tasks = JSON.parse(JSON.stringify(DEFAULT_HUMAS_TASKS));
        saveHumasTasksLocal();
        renderHumasTaskList();
        try { triggerHaptic(20); } catch (e) {}
      }
    }

    function loadTaskIntoCaptionStudio(taskId) {
      const task = humasTaskState.tasks.find(t => t.id === taskId);
      if (!task) return;

      const judInput = document.getElementById('capInputJudul');
      if (judInput) judInput.value = task.title;

      const katSelect = document.getElementById('capSelectKategori');
      if (katSelect) {
        if (task.category.indexOf('Tahfidz') !== -1) katSelect.value = 'tahfidz';
        else if (task.category.indexOf('Medsos') !== -1) katSelect.value = 'santri';
        else if (task.category.indexOf('Prestasi') !== -1) katSelect.value = 'prestasi';
        else katSelect.value = 'resmi';
      }

      const waktuInput = document.getElementById('capInputWaktu');
      if (waktuInput && !waktuInput.value) {
        waktuInput.value = 'Dalam Waktu Dekat';
      }

      if (typeof renderCaptionPreview === 'function') {
        renderCaptionPreview();
      }

      const studioElem = document.getElementById('humasCaptionSection') || document.getElementById('capInputJudul');
      if (studioElem) {
        studioElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      try { triggerHaptic(15); } catch (e) {}
    }

    function renderHumasTaskList() {
      const total = humasTaskState.tasks.length;
      const completed = humasTaskState.tasks.filter(t => t.completed).length;
      const pending = total - completed;
      const needsPamflet = humasTaskState.tasks.filter(t => t.needsPamflet).length;
      const noPamflet = total - needsPamflet;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

      const progText = document.getElementById('humasTaskProgressText');
      if (progText) progText.textContent = `${completed} / ${total} Selesai`;

      const progPercent = document.getElementById('humasTaskProgressPercent');
      if (progPercent) progPercent.textContent = `${percent}%`;

      const progBar = document.getElementById('humasTaskProgressBar');
      if (progBar) progBar.style.width = `${percent}%`;

      const elAll = document.getElementById('countTaskFilter-all');
      if (elAll) elAll.textContent = total;
      const elPam = document.getElementById('countTaskFilter-needsPamflet');
      if (elPam) elPam.textContent = needsPamflet;
      const elNoPam = document.getElementById('countTaskFilter-noPamflet');
      if (elNoPam) elNoPam.textContent = noPamflet;
      const elPend = document.getElementById('countTaskFilter-pending');
      if (elPend) elPend.textContent = pending;
      const elComp = document.getElementById('countTaskFilter-completed');
      if (elComp) elComp.textContent = completed;

      const filtered = humasTaskState.tasks.filter(t => {
        if (humasTaskState.filter === 'needsPamflet' && !t.needsPamflet) return false;
        if (humasTaskState.filter === 'noPamflet' && t.needsPamflet) return false;
        if (humasTaskState.filter === 'pending' && t.completed) return false;
        if (humasTaskState.filter === 'completed' && !t.completed) return false;

        if (humasTaskState.search) {
          const matchTitle = (t.title || '').toLowerCase().indexOf(humasTaskState.search) !== -1;
          const matchCat = (t.category || '').toLowerCase().indexOf(humasTaskState.search) !== -1;
          if (!matchTitle && !matchCat) return false;
        }
        return true;
      });

      const container = document.getElementById('humasTaskListContainer');
      const emptyState = document.getElementById('humasTaskEmptyState');
      if (!container) return;

      if (filtered.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
      }

      if (emptyState) emptyState.classList.add('hidden');

      let html = '';
      filtered.forEach(t => {
        const isDone = !!t.completed;
        html += `
          <div class="group flex items-center justify-between gap-2.5 p-2 sm:p-2.5 rounded-lg border ${isDone ? 'bg-slate-50/80 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/80 opacity-75' : 'bg-white dark:bg-slate-850 border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-2xs'} transition-all">
            <!-- Left: Interactive Checkbox & Details -->
            <div class="flex items-start gap-2.5 min-w-0 flex-1 cursor-pointer" onclick="toggleHumasTaskCompleted('${t.id}')">
              <div class="w-5 h-5 rounded-md mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500 text-white shadow-2xs' : 'border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-indigo-500'}">
                ${isDone ? '<i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>' : ''}
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-xs sm:text-[13px] font-semibold leading-snug ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'} break-words">
                  ${t.title}
                </p>
                <div class="flex items-center gap-1.5 flex-wrap mt-1">
                  <span class="text-[9.5px] px-1.5 py-0.2 rounded font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                    ${t.category || 'Umum'}
                  </span>
                  ${t.needsPamflet ? 
                    `<span class="text-[9.5px] px-1.5 py-0.2 rounded font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 flex items-center gap-1">
                      <i data-lucide="palette" class="w-2.5 h-2.5 text-amber-600 dark:text-amber-400"></i>
                      <span>Butuh Pamflet</span>
                    </span>` : 
                    `<span class="text-[9.5px] px-1.5 py-0.2 rounded font-medium bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1">
                      <i data-lucide="zap" class="w-2.5 h-2.5 text-slate-400"></i>
                      <span>Tanpa Pamflet</span>
                    </span>`
                  }
                </div>
              </div>
            </div>

            <!-- Right: Action Buttons -->
            <div class="flex items-center gap-1 flex-shrink-0">
              ${t.needsPamflet ? `
                <button type="button" onclick="loadTaskIntoCaptionStudio('${t.id}')" title="Buat Pamflet & Caption di Studio" class="px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 text-[10.5px] font-bold border border-indigo-200 dark:border-indigo-800/60 flex items-center gap-1 cursor-pointer transition-all active:scale-95">
                  <i data-lucide="sparkles" class="w-3 h-3 text-indigo-500"></i>
                  <span class="hidden sm:inline">Studio</span>
                </button>
              ` : ''}
              <button type="button" onclick="deleteHumasTask('${t.id}')" title="Hapus Kegiatan" class="p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer transition-all">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
      if (typeof safeCreateIcons === 'function') {
        safeCreateIcons();
      }
    }

    function getTodayIsoDateString() {
      try {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      } catch (e) {
        return '2026-09-14';
      }
    }

    function onHumasSimDateChange() {
      const val = document.getElementById('humasSimDate')?.value;
      if (val) {
        humasState.refDate = val;
        const dateObj = new Date(val);
        const formatted = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        const label = document.getElementById('humasRadarDateLabel');
        if (label) label.textContent = 'Tanggal Acuan: ' + formatted;

        renderHumasMetrics();
        renderHumasH7RadarCards();
        renderHumasTable();
        triggerHaptic(10);
      }
    }

    function resetHumasSimDate() {
      humasState.refDate = getTodayIsoDateString();
      const simInput = document.getElementById('humasSimDate');
      if (simInput) simInput.value = humasState.refDate;
      onHumasSimDateChange();
    }

    function neutralizeTasmiStudentsCache() {
      try {
        const stored = localStorage.getItem('tahfidz_master_students_v1');
        if (stored) {
          const list = JSON.parse(stored);
          if (Array.isArray(list)) {
            let modified = false;
            list.forEach(s => {
              if (s.statusPamflet || s.tanggalTasmi || s.isTasmi || s.statusTasmi) {
                delete s.statusPamflet;
                delete s.tanggalTasmi;
                delete s.isTasmi;
                delete s.statusTasmi;
                modified = true;
              }
            });
            if (modified) {
              localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(list));
            }
          }
        }
      } catch (e) {}
    }

    function deduplicateHumasPrograms(programs) {
      if (!Array.isArray(programs)) return [];
      const seenIds = new Set();
      const seenKeys = new Set();
      const unique = [];

      programs.forEach(p => {
        if (!p) return;
        const id = String(p.id || '').trim();
        const contentKey = `${(p.startDate || '').trim()}|${(p.uraian || '').trim().toLowerCase()}`;

        if (id && seenIds.has(id)) return;
        if (contentKey && seenKeys.has(contentKey)) return;

        if (id) seenIds.add(id);
        if (contentKey) seenKeys.add(contentKey);
        unique.push(p);
      });

      unique.forEach((p, idx) => {
        p.no = idx + 1;
      });

      return unique;
    }

    function loadHumasPrograms() {
      neutralizeTasmiStudentsCache();
      try {
        localStorage.removeItem('humas_programs_master_v1');
        localStorage.removeItem('humas_programs_master_v2');
        const saved = localStorage.getItem('humas_programs_master_v3');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= 200) {
            // Bersihkan duplikasi yang mungkin tersimpan di cache lokal
            humasState.programs = deduplicateHumasPrograms(parsed);
            // Normalisasi: agenda rutin prota bulanan bukan kategori tasmi santri
            humasState.programs.forEach(p => {
              if (p.kategori === 'tasmi' && (!p.id || !p.id.startsWith('prog-tasmi-'))) {
                p.kategori = 'umum';
              }
            });
            saveHumasProgramsLocal();
            return;
          }
        }
      } catch (e) {
        console.warn('Gagal membaca cache lokal humas:', e);
      }
      // Fallback ke master data resmi YTPAI 2026-2027 (252 Agenda Lengkap)
      humasState.programs = deduplicateHumasPrograms(JSON.parse(JSON.stringify(YTPAI_ANNUAL_PROGRAMS)));
      humasState.programs.forEach(p => {
        if (p.kategori === 'tasmi' && (!p.id || !p.id.startsWith('prog-tasmi-'))) {
          p.kategori = 'umum';
        }
      });
      saveHumasProgramsLocal();
    }

    function getUpcomingProgramsByHorizon(refDate, horizon = 'all') {
      const rawList = humasState.programs.map(p => {
        const diff = calculateDaysDiff(p.startDate, refDate);
        return { ...p, diffDays: diff };
      }).filter(p => {
        if (p.diffDays < 0) return false;
        if (horizon === 'h7') return p.diffDays <= 7;
        if (horizon === 'h14') return p.diffDays >= 8 && p.diffDays <= 14;
        if (horizon === 'h21') return p.diffDays >= 15 && p.diffDays <= 21;
        if (horizon === 'h30') return p.diffDays >= 22 && p.diffDays <= 30;
        return p.diffDays <= 30; // 'all' (1 bulan penuh)
      }).sort((a, b) => a.diffDays - b.diffDays);

      return deduplicateHumasPrograms(rawList);
    }

    function getUpcomingH7Programs(refDate) {
      return getUpcomingProgramsByHorizon(refDate, 'h7');
    }

    function setHumasRadarHorizon(horizon) {
      humasState.currentRadarHorizon = horizon;
      ['all', 'h7', 'h14', 'h21', 'h30'].forEach(h => {
        const btn = document.getElementById('radarHorizon-' + h);
        if (btn) {
          if (h === horizon) {
            btn.className = 'radar-horizon-btn active px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs flex-shrink-0 active:scale-95';
          } else {
            const colorClass = h === 'h7' ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60 hover:bg-rose-100' :
                               h === 'h14' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60 hover:bg-amber-100' :
                               h === 'h21' ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100' :
                               h === 'h30' ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60 hover:bg-purple-100' :
                               'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200';
            btn.className = `radar-horizon-btn px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${colorClass} border shadow-2xs flex-shrink-0 active:scale-95`;
          }
        }
      });
      renderHumasH7RadarCards();
      safeCreateIcons();
      triggerHaptic(10);
    }

    function saveHumasProgramsLocal() {
      try {
        localStorage.setItem('humas_programs_master_v3', JSON.stringify(humasState.programs));
      } catch (e) {
        console.warn('Gagal menyimpan cache lokal humas:', e);
      }
    }

    function saveHumasMasterToLocal() { saveHumasProgramsLocal(); }
    window.saveHumasMasterToLocal = saveHumasMasterToLocal;
    window.saveHumasProgramsLocal = saveHumasProgramsLocal;

    function calculateDaysDiff(startDateStr, refDateStr) {
      if (!startDateStr) return 999;
      try {
        const dEvent = new Date(startDateStr + 'T00:00:00');
        const dRef = new Date(refDateStr + 'T00:00:00');
        const diffTime = dEvent.getTime() - dRef.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      } catch (e) {
        return 999;
      }
    }

    function renderHumasMetrics() {
      const refDateStr = humasState.refDate || new Date().toISOString().split('T')[0];

      // Hitung jumlah agenda per horizon radar (Semua, H-7, H-14, H-21, H-30)
      const countAll = getUpcomingProgramsByHorizon(refDateStr, 'all').length;
      const countH7 = getUpcomingProgramsByHorizon(refDateStr, 'h7').length;
      const countH14 = getUpcomingProgramsByHorizon(refDateStr, 'h14').length;
      const countH21 = getUpcomingProgramsByHorizon(refDateStr, 'h21').length;
      const countH30 = getUpcomingProgramsByHorizon(refDateStr, 'h30').length;

      const badgeAll = document.getElementById('radarCountBadge-all');
      const badgeH7 = document.getElementById('radarCountBadge-h7');
      const badgeH14 = document.getElementById('radarCountBadge-h14');
      const badgeH21 = document.getElementById('radarCountBadge-h21');
      const badgeH30 = document.getElementById('radarCountBadge-h30');

      if (badgeAll) badgeAll.textContent = countAll;
      if (badgeH7) badgeH7.textContent = countH7;
      if (badgeH14) badgeH14.textContent = countH14;
      if (badgeH21) badgeH21.textContent = countH21;
      if (badgeH30) badgeH30.textContent = countH30;

      let umumNeed = 0;
      let umumDesign = 0;
      let umumPub = 0;

      humasState.programs.forEach(p => {
        if (p.kategori === 'tasmi' || (p.uraian || '').toLowerCase().includes('tasmi')) return;

        const sp = (p.statusPamflet || 'belum').toLowerCase();
        const diff = calculateDaysDiff(p.endDate || p.startDate, refDateStr);
        const isPassed = diff < 0;

        if (sp === 'selesai' || sp === 'siap') {
          umumPub++;
        } else if (sp === 'proses') {
          if (!isPassed) umumDesign++;
        } else {
          // Hanya hitung kegiatan yang BELUM terlewat (hari ini atau masa depan)
          if (!isPassed) umumNeed++;
        }
      });

      // 2. METRIK PAMFLET TAHFIDZ TASMI' BIL GHOIB (DARI DATABASE SANTRI SEKALI DUDUK)
      const allStudents = typeof getTahfidzMasterStudents === 'function' ? getTahfidzMasterStudents() : [];
      // Santri tasmi' sekali duduk (31 santri riil master data)
      const tasmiStudents = allStudents.filter(s => s.isTasmi !== false);

      let tasmiNeed = 0;
      let tasmiDesign = 0;
      let tasmiPub = 0;
      let tasmiH7 = 0;

      tasmiStudents.forEach(s => {
        const sp = (s.statusPamflet || 'pending').toLowerCase();
        if (sp === 'selesai' || sp === 'siap') {
          tasmiPub++;
        } else if (sp === 'proses') {
          tasmiDesign++;
        } else {
          tasmiNeed++;
        }

        if (s.tanggalTasmi) {
          const diff = calculateDaysDiff(s.tanggalTasmi, refDateStr);
          if (diff >= -7 && diff <= 7) {
            tasmiH7++;
          }
        }
      });

      // 1. UPDATE BARIS 1: PAMFLET UMUM & PROGRAM KERJA (Desktop Banner & Mobile Humas Tab)
      document.querySelectorAll('#bentoUmumH7Count').forEach(el => { el.textContent = countH7; });
      document.querySelectorAll('#bentoUmumNeedPamflet').forEach(el => { el.textContent = umumNeed; });
      document.querySelectorAll('#bentoUmumInDesign').forEach(el => { el.textContent = umumDesign; });
      document.querySelectorAll('#bentoUmumPublished').forEach(el => { el.textContent = umumPub; });

      // 2. UPDATE BARIS 2: PAMFLET TAHFIDZ TASMI' BIL GHOIB (SANTRI RIIL) (Desktop Banner & Mobile Humas Tab)
      document.querySelectorAll('#bentoTasmiH7Count').forEach(el => { el.textContent = tasmiH7; });
      document.querySelectorAll('#bentoTasmiNeedPamflet').forEach(el => { el.textContent = tasmiNeed; });
      document.querySelectorAll('#bentoTasmiInDesign').forEach(el => { el.textContent = tasmiDesign; });
      document.querySelectorAll('#bentoTasmiPublished').forEach(el => { el.textContent = tasmiPub; });

      // Metrik Gabungan
      const h7Count = countH7 + tasmiH7;
      const needPamflet = umumNeed + tasmiNeed;
      const inDesign = umumDesign + tasmiDesign;
      const published = umumPub + tasmiPub;

      // Update Bento Metrics Lama (jika ada widget lain yang merujuk)
      const elH7 = document.getElementById('humasStatH7Count');
      if (elH7) elH7.textContent = h7Count;
      const elNeed = document.getElementById('humasStatNeedPamflet');
      if (elNeed) elNeed.textContent = needPamflet;
      const elDesign = document.getElementById('humasStatInDesign');
      if (elDesign) elDesign.textContent = inDesign;
      const elPub = document.getElementById('humasStatPublished');
      if (elPub) elPub.textContent = published;

      // Badge count tasmi belum
      const bTasmiCount = document.getElementById('badgeTasmiBelumCount');
      if (bTasmiCount) bTasmiCount.textContent = tasmiNeed;

      // Backward compatibility ID gabungan
      const bH7 = document.getElementById('bentoTopH7Count');
      if (bH7) bH7.textContent = h7Count;
      const bNeed = document.getElementById('bentoTopNeedPamflet');
      if (bNeed) bNeed.textContent = needPamflet;
      const bDesign = document.getElementById('bentoTopInDesign');
      if (bDesign) bDesign.textContent = inDesign;
      const bPub = document.getElementById('bentoTopPublished');
      if (bPub) bPub.textContent = published;

      // Update Bento Gauge when in Humas tab
      if (activeTab === 'humas') {
        const total = (humasState.programs.length + allStudents.length) || 1;
        const pct = Math.min(100, Math.round((published / total) * 100));
        const arc = document.getElementById('bentoGaugeArc');
        const pctText = document.getElementById('gaugePercentText');
        const pctLabel = document.getElementById('gaugePercentLabel');
        if (pctText) pctText.textContent = pct + '%';
        if (pctLabel) pctLabel.textContent = 'Tayang';
        if (arc) {
          const offset = 251.2 - (251.2 * pct / 100);
          arc.style.strokeDashoffset = offset;
        }
        const bH7Badge = document.getElementById('bentoHumasH7Badge');
        if (bH7Badge) bH7Badge.textContent = h7Count > 0 ? (h7Count + ' Butuh Tindakan') : 'Aman';
        const bH7Count = document.getElementById('bentoHumasH7Count');
        if (bH7Count) bH7Count.textContent = h7Count + ' Butuh Tindakan';

        const bSelesai = document.getElementById('bentoGaugeSelesaiCount');
        if (bSelesai) bSelesai.textContent = published + ' Item';
        const bSiap = document.getElementById('bentoGaugeSiapCount');
        if (bSiap) {
          const siapCount = humasState.programs.filter(p => (p.statusPamflet || '').toLowerCase() === 'siap').length;
          bSiap.textContent = siapCount + ' Item';
        }
        const bProses = document.getElementById('bentoGaugeProsesCount');
        if (bProses) bProses.textContent = inDesign + ' Item';
        const bBelum = document.getElementById('bentoGaugeBelumCount');
        if (bBelum) bBelum.textContent = needPamflet + ' Item';
      }

      // Update Navigation Pill Badges
      const roomBadge = document.getElementById('humasRoomH7Badge');
      const drawerBadge = document.getElementById('humasDrawerH7Badge');
      const dockBadge = document.getElementById('humasDockH7Badge');

      if (countH7 > 0) {
        if (roomBadge) {
          roomBadge.textContent = `H-7 (${countH7})`;
          roomBadge.classList.remove('hidden');
        }
        if (drawerBadge) {
          drawerBadge.textContent = `H-7 (${countH7})`;
          drawerBadge.classList.remove('hidden');
        }
        if (dockBadge) {
          dockBadge.classList.remove('hidden');
        }
      } else {
        if (roomBadge) roomBadge.classList.add('hidden');
        if (drawerBadge) drawerBadge.classList.add('hidden');
        if (dockBadge) dockBadge.classList.add('hidden');
      }
    }

    function getIndonesianDayName(dateStr) {
      if (!dateStr || typeof dateStr !== 'string' || dateStr.length < 10) return '';
      try {
        const parts = dateStr.split('-');
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
      if (!container) return;

      const activeHorizon = humasState.currentRadarHorizon || 'all';
      const items = getUpcomingProgramsByHorizon(humasState.refDate, activeHorizon);

      if (items.length === 0) {
        container.innerHTML = '';
        if (emptyState) {
          emptyState.classList.remove('hidden');
          const titleEl = document.getElementById('humasRadarEmptyTitle');
          const descEl = document.getElementById('humasRadarEmptyDesc');
          const horizonNames = {
            'all': 'dalam 1 Bulan (0-30 Hari)',
            'h7': 'dalam H-1 Minggu (H-7)',
            'h14': 'dalam H-2 Minggu (H-14)',
            'h21': 'dalam H-3 Minggu (H-21)',
            'h30': 'dalam H-1 Bulan (H-30)'
          };
          if (titleEl) titleEl.textContent = `Radar Bersih: Tidak Ada Agenda ${horizonNames[activeHorizon] || 'pada jangkauan ini'}`;
          if (descEl) descEl.textContent = 'Semua agenda pada periode ini telah terjadwal aman atau Anda dapat memilih tab jangkauan lain.';
        }
        return;
      }

      if (emptyState) emptyState.classList.add('hidden');

      container.innerHTML = items.map(item => {
        const dayLabel = getHumasDayRangeLabel(item);
        let badgeColor = 'bg-rose-500 text-white';
        let countdownText = `H-${item.diffDays} (${item.diffDays} Hari Lagi)`;
        let borderGlow = 'border-rose-300 dark:border-rose-700/80 shadow-rose-500/10';

        if (item.diffDays === 0) {
          badgeColor = 'bg-red-600 text-white animate-pulse';
          countdownText = '<span class="inline-flex items-center gap-1"><i data-lucide="alert-circle" class="w-3 h-3"></i> Hari Ini (Hari-H)</span>';
          borderGlow = 'border-red-400 dark:border-red-600 shadow-red-500/20';
        } else if (item.diffDays === 1) {
          badgeColor = 'bg-rose-600 text-white animate-pulse';
          countdownText = '<span class="inline-flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> H-1 (Besok)</span>';
          borderGlow = 'border-rose-400 dark:border-rose-600 shadow-rose-500/20';
        } else if (item.diffDays <= 7) {
          badgeColor = 'bg-rose-500 text-white';
          countdownText = `<span class="inline-flex items-center gap-1"><i data-lucide="flame" class="w-3 h-3"></i> H-${item.diffDays} (${item.diffDays} Hari Lagi)</span>`;
          borderGlow = 'border-rose-300 dark:border-rose-800 shadow-rose-500/10';
        } else if (item.diffDays <= 14) {
          badgeColor = 'bg-amber-600 text-white';
          countdownText = `<span class="inline-flex items-center gap-1"><i data-lucide="zap" class="w-3 h-3"></i> H-${item.diffDays} (2 Minggu Lagi)</span>`;
          borderGlow = 'border-amber-300 dark:border-amber-800 shadow-amber-500/10';
        } else if (item.diffDays <= 21) {
          badgeColor = 'bg-indigo-600 text-white';
          countdownText = `<span class="inline-flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> H-${item.diffDays} (3 Minggu Lagi)</span>`;
          borderGlow = 'border-indigo-300 dark:border-indigo-800 shadow-indigo-500/10';
        } else {
          badgeColor = 'bg-purple-600 text-white';
          countdownText = `<span class="inline-flex items-center gap-1"><i data-lucide="target" class="w-3 h-3"></i> H-${item.diffDays} (1 Bulan Lagi)</span>`;
          borderGlow = 'border-purple-300 dark:border-purple-800 shadow-purple-500/10';
        }

        const sp = item.statusPamflet || 'belum';
        let pamfletBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200">Belum Dibuat</span>`;
        if (sp === 'proses') {
          pamfletBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200">Sedang Desain</span>`;
        } else if (sp === 'siap') {
          pamfletBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200">Pamflet Siap</span>`;
        } else if (sp === 'selesai') {
          pamfletBadge = `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200">Sudah Tayang</span>`;
        }

        // Channels checklist
        const kanals = (item.kanal || '').split(',').map(s => s.trim().toUpperCase());
        const hasIg = kanals.includes('IG');
        const hasFb = kanals.includes('FB');
        const hasWa = kanals.includes('WA');
        const hasTt = kanals.includes('TT');

        const isTasmi = item.kategori === 'tasmi' || (item.uraian || '').toLowerCase().includes('tasmi');

        return `
          <div class="bg-white/95 dark:bg-slate-900/95 rounded-2xl p-4 border ${borderGlow} shadow-md flex flex-col justify-between space-y-3 relative group transition-all hover:scale-[1.01]">
            <div class="space-y-2">
              <div class="flex items-center justify-between gap-2">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${badgeColor} shadow-2xs">
                  ${countdownText}
                </span>
                ${pamfletBadge}
              </div>

              <div>
                <h5 class="text-xs sm:text-sm font-black text-slate-900 dark:text-white line-clamp-2 leading-snug cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onclick="openModalEditProgram('${item.id}')" title="Klik untuk lihat detail & edit">
                  ${isTasmi ? '<span class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 mr-1 align-middle"><i data-lucide="book-open" class="w-3 h-3"></i> Tasmi\'</span>' : ''}${escapeHtml(item.uraian)}
                </h5>
                <p class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 flex items-center gap-1">
                  <i data-lucide="calendar" class="w-3 h-3"></i>
                  <span>Tanggal: ${escapeHtml(item.tgl)} ${escapeHtml(item.bulan)} ${escapeHtml(item.tahun)} ${dayLabel ? '(' + dayLabel + ')' : ''}</span>
                </p>
              </div>

              <div class="space-y-1 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
                <p class="truncate"><span class="font-bold text-slate-700 dark:text-slate-300">PJ:</span> ${escapeHtml(item.pj || '-')}</p>
                <p class="line-clamp-1"><span class="font-bold text-slate-700 dark:text-slate-300">Sasaran:</span> ${escapeHtml(item.sasaran || '-')}</p>
                ${item.catatan ? `<p class="line-clamp-1 text-amber-600 dark:text-amber-400 italic text-[10px]"><span class="font-bold">Catatan:</span> ${escapeHtml(item.catatan)}</p>` : ''}
              </div>

              <!-- Multi-Channel Checklist -->
              <div class="flex flex-wrap items-center gap-1.5 pt-1">
                <span class="text-[10px] font-bold text-slate-400 mr-1">Kanal:</span>
                <button type="button" onclick="toggleHumasChannel('${item.id}', 'IG')" class="px-2 py-0.5 rounded text-[10px] font-extrabold transition-all ${hasIg ? 'channel-tag-ig' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}">
                  IG
                </button>
                <button type="button" onclick="toggleHumasChannel('${item.id}', 'FB')" class="px-2 py-0.5 rounded text-[10px] font-extrabold transition-all ${hasFb ? 'channel-tag-fb' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}">
                  FB
                </button>
                <button type="button" onclick="toggleHumasChannel('${item.id}', 'WA')" class="px-2 py-0.5 rounded text-[10px] font-extrabold transition-all ${hasWa ? 'channel-tag-wa' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}">
                  WA
                </button>
                <button type="button" onclick="toggleHumasChannel('${item.id}', 'TT')" class="px-2 py-0.5 rounded text-[10px] font-extrabold transition-all ${hasTt ? 'channel-tag-tt' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}">
                  TT
                </button>
              </div>
            </div>

            <!-- Action buttons: Detail & Edit, Caption, Status Changer -->
            <div class="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div class="grid grid-cols-2 gap-1.5">
                <button 
                  type="button" 
                  onclick="openModalEditProgram('${item.id}')" 
                  class="py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border border-slate-200 dark:border-slate-700 min-w-0"
                  title="Lihat Detail & Edit Keterangan Acara"
                >
                  <i data-lucide="file-edit" class="w-3.5 h-3.5 text-amber-500 flex-shrink-0"></i>
                  <span class="truncate">Detail & Edit</span>
                </button>
                <button 
                  type="button" 
                  onclick="loadProgramIntoCaptionStudio('${item.id}')" 
                  class="py-1.5 px-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 min-w-0"
                  title="Buka data acara ini di Studio Caption Generator"
                >
                  <i data-lucide="sparkles" class="w-3.5 h-3.5 flex-shrink-0"></i>
                  <span class="truncate">Buat Caption</span>
                </button>
              </div>

              <div class="grid grid-cols-2 gap-1.5">
                <button 
                  type="button" 
                  onclick="quickToggleHumasPamfletStatus('${item.id}', 'proses')" 
                  class="py-1 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[10px] transition-all flex items-center justify-center gap-1 min-w-0"
                >
                  <i data-lucide="palette" class="w-3 h-3 text-blue-500 flex-shrink-0"></i>
                  <span class="truncate">Proses Desain</span>
                </button>
                <button 
                  type="button" 
                  onclick="quickToggleHumasPamfletStatus('${item.id}', 'selesai')" 
                  class="py-1 px-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] border border-emerald-200 dark:border-emerald-800/60 transition-all flex items-center justify-center gap-1 min-w-0"
                >
                  <i data-lucide="check-circle-2" class="w-3 h-3 text-emerald-500 flex-shrink-0"></i>
                  <span class="truncate">Tandai Tayang</span>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      safeCreateIcons();
    }

    function toggleHumasChannel(progId, chCode) {
      const item = humasState.programs.find(p => p.id === progId);
      if (!item) return;

      let list = (item.kanal || '').split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
      if (list.includes(chCode)) {
        list = list.filter(c => c !== chCode);
      } else {
        list.push(chCode);
      }
      item.kanal = list.join(',');
      saveHumasProgramsLocal();
      renderHumasH7RadarCards();
      renderHumasTable();
      triggerHaptic(5);
    }

    function quickToggleHumasPamfletStatus(progId, newStatus) {
      const item = humasState.programs.find(p => p.id === progId);
      if (!item) return;

      item.statusPamflet = newStatus;
      if (newStatus === 'selesai') {
        item.statusPost = 'published';
      }
      saveHumasProgramsLocal();
      renderHumasMetrics();
      renderHumasH7RadarCards();
      renderHumasTable();

      const labelMap = {
        belum: 'Belum Dibuat',
        proses: 'Sedang Proses Desain',
        siap: 'Pamflet Siap Publish',
        selesai: 'Selesai / Tayang di Sosmed'
      };

      if (typeof showToast === 'function') {
        showToast('Status Diperbarui', `Agenda "${item.uraian}" ditandai: ${labelMap[newStatus] || newStatus}`);
      }
      triggerHaptic(10);
    }

    function loadProgramIntoCaptionStudio(progId, doScroll = true) {
      const item = humasState.programs.find(p => p.id === progId);
      if (!item) return;

      const judulEl = document.getElementById('capInputJudul');
      const waktuEl = document.getElementById('capInputWaktu');
      const pjEl = document.getElementById('capInputPj');
      const sasaranEl = document.getElementById('capInputSasaran');
      const poinEl = document.getElementById('capInputPoin');

      if (judulEl) judulEl.value = item.uraian || '';
      if (waktuEl) {
        if ((item.bulan || '').includes('-') && (item.tgl || '').includes('-')) {
          const tParts = item.tgl.split('-');
          const bParts = item.bulan.split('-');
          waktuEl.value = `${tParts[0]} ${bParts[0]} - ${tParts[1]} ${bParts[1]} ${item.tahun || '2026'}`;
        } else {
          waktuEl.value = `${item.tgl} ${item.bulan} ${item.tahun || '2026'}`;
        }
      }
      if (pjEl) pjEl.value = item.pj || '';
      if (sasaranEl) sasaranEl.value = item.sasaran || '';
      if (poinEl) {
        poinEl.value = `Pelaksanaan kegiatan ${item.uraian} di lingkungan YTPAI Raudlatul Muta'allimin Lamongan dalam rangka menyukseskan program tahunan madrasah dan pondok pesantren.`;
      }

      // Deteksi kategori otomatis
      const textLower = (item.uraian || '').toLowerCase();
      if (textLower.includes('maulid') || textLower.includes('phbi') || textLower.includes('tasyakuran') || textLower.includes('istighotsah')) {
        setCaptionCategory('phbi');
      } else if (textLower.includes('tahfidz') || textLower.includes('tasmi') || textLower.includes('lomba') || textLower.includes('prestasi')) {
        setCaptionCategory('prestasi');
      } else if (textLower.includes('kalam') || textLower.includes('dawuh') || textLower.includes('muassis') || textLower.includes('ziarah')) {
        setCaptionCategory('kalam');
      } else {
        setCaptionCategory('resmi');
      }

      renderCaptionPreview();

      if (doScroll) {
        const target = document.getElementById('humasCaptionStudioCard');
        const cont = document.getElementById('mainContentContainer');
        if (target && cont) {
          cont.scrollTo({ top: Math.max(0, target.offsetTop - 80), behavior: 'smooth' });
        }
        if (typeof showToast === 'function') {
          showToast('Data Dimuat ke Studio', `Informasi "${item.uraian}" telah dimasukkan ke draf caption.`);
        }
      }
      triggerHaptic(10);
    }

    function setCaptionCategory(cat) {
      humasState.selectedCategory = cat;
      ['resmi', 'prestasi', 'phbi', 'kalam'].forEach(c => {
        const btn = document.getElementById('capCat-' + c);
        if (btn) {
          if (c === cat) {
            btn.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white transition-all shadow-xs';
          } else {
            btn.className = 'px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-all';
          }
        }
      });
      renderCaptionPreview();
    }

    function setHumasOutputMode(mode) {
      if (mode === 'viral') mode = 'instagram';
      humasState.outputMode = mode || 'instagram';
      
      const modes = ['instagram', 'facebook', 'tiktok', 'wa', 'story'];
      modes.forEach(m => {
        let btnId = '';
        if (m === 'instagram') btnId = 'btnOutputModeIg';
        else if (m === 'facebook') btnId = 'btnOutputModeFb';
        else if (m === 'tiktok') btnId = 'btnOutputModeTt';
        else if (m === 'wa') btnId = 'btnOutputModeWa';
        else if (m === 'story') btnId = 'btnOutputModeStory';

        const btn = document.getElementById(btnId);
        if (btn) {
          if (m === humasState.outputMode) {
            btn.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer ring-1 ring-slate-200 dark:ring-slate-700';
          } else {
            btn.className = 'px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-all flex items-center gap-1.5 cursor-pointer';
          }
        }
      });

      // Synchronize checkboxes
      const chkIg = document.getElementById('capKanalIg');
      const chkFb = document.getElementById('capKanalFb');
      const chkWa = document.getElementById('capKanalWa');
      const chkTt = document.getElementById('capKanalTt');
      if (mode === 'instagram' && chkIg) chkIg.checked = true;
      if (mode === 'facebook' && chkFb) chkFb.checked = true;
      if (mode === 'wa' && chkWa) chkWa.checked = true;
      if (mode === 'tiktok' && chkTt) chkTt.checked = true;

      const regBtn = document.getElementById('btnRegenerateHook');
      const metricsBadge = document.getElementById('viralMetricsBadge');

      if (regBtn) {
        if (humasState.outputMode !== 'wa') {
          regBtn.classList.remove('hidden');
        } else {
          regBtn.classList.add('hidden');
        }
      }

      if (metricsBadge) {
        if (humasState.outputMode !== 'wa') {
          metricsBadge.classList.remove('hidden');
        } else {
          metricsBadge.classList.add('hidden');
        }
      }

      renderCaptionPreview();
      triggerHaptic(10);
    }

    function setViralTone(tone) {
      if (tone === 'fun') tone = 'dinamis';
      humasState.viralTone = tone || 'pro';
      
      const tones = ['pro', 'emotional', 'dinamis', 'quotes'];
      tones.forEach(t => {
        const btn = document.getElementById('toneBtn-' + t);
        if (btn) {
          if (t === humasState.viralTone) {
            btn.className = 'px-2 py-0.5 rounded-md text-[10px] font-bold bg-white dark:bg-slate-800 shadow-xs text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 cursor-pointer';
          } else {
            btn.className = 'px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 cursor-pointer';
          }
        }
      });

      renderCaptionPreview();
      triggerHaptic(10);
    }

    function regenerateViralHook() {
      humasState.viralHookIndex = (humasState.viralHookIndex + 1) % 5;
      renderCaptionPreview();
      
      const box = document.getElementById('humasCaptionPreviewBox');
      if (box) {
        box.classList.add('ring-2', 'ring-indigo-400');
        setTimeout(() => box.classList.remove('ring-2', 'ring-indigo-400'), 300);
      }
      triggerHaptic(15);
    }

    function detectHumasTopic(judul, poin, cat) {
      const text = `${judul || ''} ${poin || ''} ${cat || ''}`.toLowerCase();
      return {
        isTasmi: text.includes('tasmi') || text.includes('tahfidz') || text.includes('qur') || text.includes('juz') || text.includes('ghoib') || cat === 'prestasi',
        isKesehatan: text.includes('kesehatan') || text.includes('mental') || text.includes('psikologi') || text.includes('seminar') || text.includes('konseling') || text.includes('parenting'),
        isPhbi: text.includes('maulid') || text.includes('isra') || text.includes('ramadhan') || text.includes('santri') || text.includes('muharram') || text.includes('idul') || cat === 'phbi',
        isAkademik: text.includes('ujian') || text.includes('sas') || text.includes('sts') || text.includes('rapor') || text.includes('mpls') || text.includes('matsama') || text.includes('rapat') || text.includes('evaluasi'),
        isEvent: text.includes('karnaval') || text.includes('lomba') || text.includes('kemah') || text.includes('outbound') || text.includes('seni') || text.includes('olahraga') || text.includes('pospenas'),
        isKalam: text.includes('kalam') || text.includes('dawuh') || text.includes('mutiara') || text.includes('adab') || cat === 'kalam'
      };
    }

    function getProfessionalSocialMediaHooks(topic, tone, hookIdx) {
      let hooks = [];

      if (topic.isKesehatan) {
        if (tone === 'emotional') {
          hooks = [
            "Di balik senyum teduh dan kesibukan santri mengaji, ada ruang batin yang senantiasa perlu didengarkan dan dirangkul dengan penuh kehangatan... 🫂🤍",
            "Menjadi santri yang tangguh berawal dari hati yang damai dan pikiran yang terawat sehat... 🌿✨",
            "Bukan hanya hafalan dan kecakapan ilmu yang kami jaga, melainkan kesehatan jiwa dan ketenangan hati setiap ananda... 🌸🤍",
            "Terkadang, bentuk kasih sayang terbaik adalah menyediakan ruang aman bagi anak-anak kita untuk bercerita tanpa takut dihakimi... 🤲🕊️",
            "Ketenangan batin adalah bekal terindah santri dalam menyerap berkahnya ilmu di pesantren... ✨"
          ];
        } else if (tone === 'dinamis') {
          hooks = [
            "Santri berprestasi itu bukan cuma yang rajin muthala'ah, tapi juga yang cerdas mengelola emosi dan kesehatan mentalnya! 💡🧠✨",
            "Siapa bilang obrolan seputar kesehatan mental tabu di pesantren? Justru di sinilah tempat terbaik belajar merawat hati dan pikiran! 🌿💪",
            "Kunci santri produktif dan bahagia: ilmu bertambah, ibadah istiqomah, dan mental tetap sehat terjaga! ⚡🎯",
            "Yuk normalisasi saling peduli dan peka terhadap teman sekamar di asrama. Karena santri hebat saling menguatkan! 🤝✨",
            "Edukasi penting yang bikin santri makin percaya diri, tangguh hadapi ujian, dan bahagia jalani hari-hari di pondok! 🔥🌱"
          ];
        } else if (tone === 'quotes') {
          hooks = [
            "\"Hati yang tenang adalah pangkal ketajaman akal, dan jiwa yang sehat adalah tempat bersemayamnya hikmah.\" 🍃📖",
            "Menjaga kesehatan mental hakikatnya adalah bagian dari tazkiyatun nafs: merawat anugerah fitrah agar senantiasa dekat dengan ketenangan Ilahi... 🌙",
            "\"Tidak ada kebaikan pada raga yang letih jika batinnya terabaikan. Rawatlah jiwamu sebagaimana engkau memelihara fisikmu.\" 🕊️",
            "Keseimbangan antara ikhtiar lahiriah dan kedamaian batiniah adalah pondasi utama adab seorang penuntut ilmu... 🤲",
            "Di balik ketenangan wajah-wajah para pencari ilmu, ada proses panjang menata hati dan menumbuhkan ketahanan jiwa... ✨"
          ];
        } else {
          // Default: Profesional & Edukatif
          hooks = [
            "Menjaga kesehatan mental dan kesejahteraan emosional merupakan bagian tak terpisahkan dari ikhtiar mencetak generasi santri yang utuh lahir dan batin... 🌿✨",
            "Pendidikan karakter di pesantren senantiasa memadukan kecerdasan intelektual, kematangan spiritual, dan ketangguhan psikologis santri... 💡🏛️",
            "Menumbuhkan kesadaran kesehatan mental di lingkungan madrasah dan asrama: langkah strategis mewujudkan ekosistem belajar yang sehat dan suportif... 🌱📚",
            "Kesiapan santri menghadapi dinamika zaman berakar pada kemampuan mengenali diri, mengelola stres, dan membangun resiliensi positif... 🎯🕊️",
            "Komitmen nyata YTPAI Raudlatul Muta'allimin dalam mendampingi tumbuh kembang santri secara holistik dan berkelanjutan... 🏛️✨"
          ];
        }
      } else if (topic.isTasmi) {
        if (tone === 'emotional') {
          hooks = [
            "Duduk berjam-jam melantunkan kalam Ilahi tanpa mushaf di tangan, hanya bermodal hafalan di dada dan doa tulus orang tua di rumah... 😭🤍📖",
            "Momen penuh haru yang selalu menggetarkan hati: air mata syukur mengiringi tuntasnya bait-bait Al-Qur'an sekali duduk... 🤲✨",
            "Ibu dan Ayah, peluh lelah ananda di pondok kelak kami persembahkan sebagai mahkota kemuliaan di akhirat kelak... 🕊️👑",
            "Tidak ada kebanggaan yang lebih indah bagi seorang santri selain mempersembahkan kelancaran hafalan Al-Qur'an untuk kedua orang tua... 🌸🤍",
            "Menyaksikan generasi muda memilih jalan cinta bersama Al-Qur'an di tengah godaan zaman selalu menghadirkan haru yang mendalam... 🥹✨"
          ];
        } else if (tone === 'dinamis') {
          hooks = [
            "Dedikasi tanpa batas! Inilah potret nyata perjuangan santri milenial menuntaskan tasmi' bil ghoib sekali duduk! 🔥📖✨",
            "Fokus tingkat tinggi, hafalan terjaga rapi! Bukti nyata generasi Qur'ani siap jadi teladan masa depan! ⚡👏",
            "Bukan sekadar hafal ayat, tapi tentang komitmen menjaga amanah kalamullah di setiap helaan nafas! 💯🌿",
            "Masya Allah! Semangat muraja'ah santri kita beneran bikin merinding sekaligus memotivasi siapa pun yang mendengar! 🌟🤲",
            "Inspirasi dari bilik asrama: bukti nyata bahwa konsistensi dan doa mampu menaklukkan target hafalan tertinggi! 🎯🔥"
          ];
        } else if (tone === 'quotes') {
          hooks = [
            "\"Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya.\" (HR. Bukhari) 🍃📖",
            "Al-Qur'an di dalam dada adalah perisai hidup di dunia dan syafaat yang membela pemiliknya di yaumil akhir... 🌙🕊️",
            "Setiap huruf yang diulang dengan penuh ketulusan adalah simpanan cahaya yang tak akan pernah padam... ✨",
            "\"Bacalah Al-Qur'an, naiklah derajatmu, dan tartilkanlah sebagaimana engkau mentartilkannya di dunia.\" 🤲",
            "Keberkahan hidup bermula dari seberapa dekat hati dan lisan kita berinteraksi dengan kalam-Nya... 🌿"
          ];
        } else {
          hooks = [
            "Apresiasi keteguhan para penjaga Al-Qur'an: ikhtiar melahirkan generasi huffazh yang kokoh hafalan dan berakhlak mulia... 📖🏛️",
            "Ujian Tasmi' Bil Ghoib Sekali Duduk merupakan tolak ukur mutu dan komitmen mutqin dalam program tahfidz pesantren... 🌟✨",
            "Menjaga kemurnian hafalan kalamullah: sinergi ketelatenan dewan asatidz dan keistiqomahan santri YTPAI Raudlatul Muta'allimin... 🌿🤲",
            "Pencapaian berharga dalam perjalanan spiritual santri: menguji hafalan dengan penuh disiplin, adab, dan ketulusan... 🕊️📚",
            "Investasi peradaban terbaik adalah mencetak generasi yang menjadikan Al-Qur'an sebagai pedoman pikir dan laku kehidupan... 🏛️✨"
          ];
        }
      } else if (topic.isPhbi) {
        if (tone === 'emotional') {
          hooks = [
            "Gema shalawat dan rasa rindu kepada Baginda Nabi SAW menyatu dalam kehangatan majelis santri malam ini... 🌸🕊️",
            "Meneladani keagungan akhlak Rasulullah SAW adalah cahaya penuntun di setiap langkah perjuangan santri di pesantren... 🤲✨",
            "Momentum penuh berkah yang senantiasa menautkan hati kita dalam ukhuwah dan kecintaan kepada syiar Islam... 🤍🌿",
            "Di majelis inilah kita merajut doa bersama, memohon syafaat dan keberkahan untuk keluarga besar pondok dan umat... 🌙",
            "Rasa syukur tak terhingga bisa berkumpul dalam suasana yang penuh dengan zikir, shalawat, dan untaian nasihat bijak... ✨"
          ];
        } else if (tone === 'dinamis') {
          hooks = [
            "Kompak dan berenergi! Suasana peringatan hari besar Islam di pondok selalu punya kehangatan yang tak tergantikan! 🔥🎉",
            "Antusiasme luar biasa dari seluruh santri dan asatidz menyemarakkan syiar Islam dengan penuh kegembiraan dan adab! ⚡👏",
            "Pesantren hidup dengan gema syiar! Bukti bahwa perayaan islami selalu meriah, bermakna, dan penuh inspirasi! 🌟🌙",
            "Momen kebersamaan yang selalu dirindukan: tertawa bersama, belajar bersama, dan berkhidmah bersama untuk agama! 🙌✨",
            "Vibes kebersamaan santri yang selalu menghangatkan hati dan membakar semangat juang generasi penerus! 🔥🌱"
          ];
        } else if (tone === 'quotes') {
          hooks = [
            "\"Sesungguhnya telah ada pada diri Rasulullah itu suri teladan yang baik bagimu.\" (QS. Al-Ahzab: 21) 🍃📖",
            "Peringatan hari besar Islam adalah momentum muhasabah diri untuk menakar sejauh mana kita meneladani Baginda Nabi SAW... 🌙",
            "Menghidupkan syiar adalah tanda hidupnya ketakwaan di dalam hati sanubari seorang mukmin... 🕊️🤲",
            "\"Barang siapa mengagungkan syiar-syiar Allah, maka sesungguhnya itu timbul dari ketakwaan hati.\" ✨",
            "Merawat tradisi kebaikan para pendahulu adalah jembatan menuju peradaban Islam yang rahmatan lil 'alamin... 🌿"
          ];
        } else {
          hooks = [
            "Menyemarakkan syiar Islam sebagai media penguatan ukhuwah dan penanaman nilai-nilai keteladanan kenabian... 🕌✨",
            "Peringatan Hari Besar Islam di lingkungan YTPAI Raudlatul Muta'allimin: momentum pengokohan adab, spiritualitas, dan wawasan santri... 🏛️📚",
            "Meneladani jejak dakwah Rasulullah SAW dalam membangun peradaban umat yang berilmu, bertakwa, dan berakhlak mulia... 🌟🌿",
            "Refleksi historis dan spiritual yang senantiasa mengokohkan komitmen pengabdian civitas akademika pesantren... 🕊️🎯",
            "Sinergi kebaikan seluruh unsur pesantren dalam menghidupkan syiar dakwah yang mendidik dan mencerahkan... 🤲✨"
          ];
        }
      } else {
        if (tone === 'emotional') {
          hooks = [
            "Setiap proses di pesantren adalah tentang ketulusan berjuang bersama: merawat harapan, menumbuhkan adab, dan menempa masa depan... 🥺🤍",
            "Di balik langkah tenang para santri, ada ikhtiar panjang para guru dan doa malam orang tua yang tak pernah putus... 🤲✨",
            "Momen berharga yang selalu menghadirkan rasa syukur dan bangga menjadi bagian dari keluarga besar ini... 🌸🌿",
            "Menuntut ilmu memang penuh liku, namun setiap tetes peluh kelak menjadi saksi pengorbanan yang bernilai ibadah... 🕊️",
            "Satu langkah kecil yang kita bina hari ini adalah fondasi kejayaan anak-anak kita di masa depan... ✨"
          ];
        } else if (tone === 'dinamis') {
          hooks = [
            "Energi positif dan semangat kebersamaan selalu menjadi warna terindah di setiap kegiatan santri kami! ⚡🔥",
            "Siapa bilang kegiatan edukatif itu kaku? Intip keseruan dan kekompakan santri dalam agenda berbobot yang satu ini! 👏✨",
            "Kombinasi sempurna antara kedisiplinan, kreativitas, dan ukhuwah yang solid di lingkungan pesantren! 💯🎯",
            "Langkah aktif santri berdaya: belajar dengan sungguh-sungguh, berproses dengan gembira, dan berprestasi tanpa henti! 🚀🌱",
            "Potret antusiasme santri yang selalu menghadirkan inspirasi bagi kita semua untuk terus belajar dan berkarya! 🔥🙌"
          ];
        } else if (tone === 'quotes') {
          hooks = [
            "\"Adab diletakkan sebelum ilmu. Karena kepintaran tanpa keluhuran akhlak hanyalah kesia-siaan.\" 🍃📖",
            "Menuntut ilmu di pesantren adalah perjalanan menata hati, membersihkan jiwa, dan menyalakan lentera pemahaman... 🌙",
            "Setiap ikhtiar kebaikan yang dirintis bersama akan membuahkan keberkahan yang mengalir abadi... 🕊️🤲",
            "\"Barang siapa menempuh jalan untuk mencari ilmu, niscaya Allah mudahkan baginya jalan menuju surga.\" ✨",
            "Kebaikan yang terorganisir dan diiringi keikhlasan adalah benih peradaban yang tak akan pernah lekang oleh waktu... 🌿"
          ];
        } else {
          hooks = [
            "Komitmen berkelanjutan dalam menghadirkan ekosistem pendidikan yang holistik, berkarakter, dan berdaya saing... 🏛️✨",
            "Pendidikan di lingkungan YTPAI Raudlatul Muta'allimin senantiasa memadukan penguatan tradisi keilmuan dan kecakapan masa depan... 📚💡",
            "Sinergi terpadu dewan asatidz, santri, dan wali santri dalam menyukseskan agenda strategis pengembangan potensi ananda... 🎯🌿",
            "Menanamkan nilai kedisiplinan, integritas, dan ukhuwah melalui serangkaian program pembinaan yang terarah... 🌟🕊️",
            "Langkah nyata dan terencana demi memastikan setiap santri bertumbuh optimal dalam ranah kognitif, afektif, dan spiritual... 🏛️🤲"
          ];
        }
      }

      const idx = Math.abs(hookIdx || 0) % hooks.length;
      return hooks[idx];
    }

    function buildNarrativeBody(topic, judul, poin, waktu, pj, sasaran, tone) {
      let contextNarrative = "";

      if (topic.isKesehatan) {
        contextNarrative = `Kesehatan mental, kejernihan batin, dan ketenangan hati adalah pondasi esensial bagi santri dalam menyerap keberkahan ilmu. Melalui agenda "${judul}", para peserta diajak untuk lebih peka terhadap dinamika emosional diri, membangun mekanisme koping yang sehat, serta menumbuhkan empati dan ukhuwah di lingkungan asrama maupun madrasah.\n\nFokus utama dalam agenda ini meliputi:\n"${poin}"`;
      } else if (topic.isTasmi) {
        contextNarrative = `Melantunkan ayat demi ayat Al-Qur'an secara bil ghoib (tanpa melihat mushaf) merupakan puncak dari ketekunan muraja'ah dan ketulusan hati para santri. Agenda "${judul}" ini menjadi sarana menguji kelancaran hafalan sekaligus memupuk ketakwaan mendalam kepada kalamullah.\n\nCatatan inti pelaksanaan:\n"${poin}"`;
      } else if (topic.isPhbi) {
        contextNarrative = `Peringatan hari besar Islam bukan sekadar rutinitas penanggalan, melainkan momentum berharga untuk mempertebal mahabbah kepada Baginda Nabi SAW dan memperkokoh syiar dakwah Ahlussunnah wal Jama'ah di kalangan generasi muda.\n\nPesan dan hikmah utama kegiatan:\n"${poin}"`;
      } else if (topic.isAkademik) {
        contextNarrative = `Proses evaluasi dan pembelajaran berkala merupakan ikhtiar nyata dalam menjaga mutu akademik serta membentuk integritas dan kejujuran santri. Melalui agenda "${judul}", seluruh civitas akademika berkomitmen mewujudkan iklim belajar yang bermutu dan berdaya saing.\n\nPoin penting pelaksanaan:\n"${poin}"`;
      } else if (topic.isEvent) {
        contextNarrative = `Kekompakan, kreativitas, dan semangat sportivitas berpadu indah dalam agenda "${judul}". Kegiatan ini menjadi wadah aktualisasi diri santri untuk mengekspresikan bakat dan mempererat tali persaudaraan di luar jam belajar formal.\n\nUraian kegiatan:\n"${poin}"`;
      } else {
        contextNarrative = `Penyelenggaraan agenda "${judul}" ini merupakan bagian integral dari rangkaian pembinaan berkelanjutan di lingkungan pondok pesantren dan madrasah, yang berorientasi pada kematangan adab, kedalaman ilmu, serta kemandirian santri.\n\nPesan dan intisari agenda:\n"${poin}"`;
      }

      return contextNarrative;
    }

    function generateInstagramCaption(params) {
      const { judul, waktu, pj, sasaran, poin, topic, tone, hookIdx } = params;
      const hook = getProfessionalSocialMediaHooks(topic, tone, hookIdx);
      const narrative = buildNarrativeBody(topic, judul, poin, waktu, pj, sasaran, tone);

      let cta = "Bagaimana pandangan Ayah, Bunda, dan Sahabat sekalian mengenai pentingnya agenda ini bagi perkembangan generasi santri? Mari saling berbagi sudut pandang dan doa terbaik di kolom komentar. 🌿✨";
      if (tone === 'emotional') {
        cta = "Titipkan satu kalimat doa tulus untuk anak-anak santri di kolom komentar, semoga Allah SWT senantiasa meridhai dan membalas kebaikan Ayah dan Bunda sekalian. Aamiin ya Rabbal 'Alamin. 🤲🤍";
      } else if (tone === 'dinamis') {
        cta = "Paling suka bagian mana dari agenda ini? Yuk drop tanggapan dan apresiasi terbaikmu buat santri-santri hebat ini di kolom komentar! 👇🔥";
      }

      const hashtags = topic.isTasmi
        ? "#RaudlatulMutaallimin #TasmiBilGhoib #TahfidzQuran #SantriPenjagaQuran #GenerasiQurani #PesantrenLamongan #SantriBabat #AyoMondok"
        : topic.isKesehatan
        ? "#RaudlatulMutaallimin #KesehatanMentalSantri #SantriSehat #PendidikanKarakter #SantriTangguh #PesantrenSehat #LamonganMegilan #AyoMondok"
        : topic.isPhbi
        ? "#RaudlatulMutaallimin #SyiarIslam #PHBIPesantren #SantriNusantara #PesantrenLamongan #BerkahSantri #AyoMondok"
        : "#RaudlatulMutaallimin #PesantrenLamongan #SantriIndonesia #PendidikanIslam #MadrasahHebat #SantriBabat #AyoMondok";

      return `${hook}

✨ *${judul.toUpperCase()}* ✨
Lembaga: *YTPAI Raudlatul Muta'allimin Lamongan*

${narrative}

━━━━━━━━━━━━━━━━━━━━━
🗓️ *Waktu Pelaksanaan:* ${waktu}
👥 *Sasaran Peserta:* ${sasaran}
👤 *Pendamping / Koordinator:* ${pj}
━━━━━━━━━━━━━━━━━━━━━

Semoga ikhtiar ini melahirkan kemanfaatan yang berlipat, menguatkan karakter ananda, serta membawa keberkahan bagi keluarga besar pondok pesantren dan madrasah.

${cta}

📍 *Pondok Pesantren Raudlatul Muta'allimin*
Datinawong, Babat, Lamongan - Jawa Timur
Official Instagram: @raudlatul_mutaallimin

${hashtags}`;
    }

    function generateFacebookCaption(params) {
      const { judul, waktu, pj, sasaran, poin, topic, tone, hookIdx } = params;
      const hook = getProfessionalSocialMediaHooks(topic, tone, hookIdx);
      const narrative = buildNarrativeBody(topic, judul, poin, waktu, pj, sasaran, tone);

      const hashtags = topic.isTasmi
        ? "#YTPAIRaudlatulMutaallimin #TasmiBilGhoib #TahfidzPesantren #WaliSantri #GenerasiQurani"
        : topic.isKesehatan
        ? "#YTPAIRaudlatulMutaallimin #KesehatanMentalSantri #PendidikanSantri #WaliSantriPeduli"
        : "#YTPAIRaudlatulMutaallimin #PondokPesantrenLamongan #WaliSantri #MadrasahBerkualitas";

      return `Bismillahirrohmanirrohim.
Assalamu'alaikum Warahmatullahi Wabarakatuh.

Salam silaturahmi untuk Bapak/Ibu wali santri, dewan asatidz, para alumni, serta segenap sahabat keluarga besar YTPAI Raudlatul Muta'allimin Lamongan di mana pun berada.

${hook}

Alhamdulillah, telah dan sedang dipersiapkan agenda:
📢 *${judul.toUpperCase()}*

${narrative}

📌 *Rincian Agenda Kegiatan:*
🗓️ *Hari & Tanggal:* ${waktu}
👥 *Peserta / Sasaran:* ${sasaran}
👤 *Penanggung Jawab:* ${pj}

Mari bersama-sama kita iringi setiap proses pembinaan ananda tercinta dengan doa yang tak pernah putus dari rumah. Semoga putra-putri kita senantiasa dianugerahi kesehatan, kelapangan hati, serta pemahaman ilmu yang barakah dan bermanfaat luas bagi umat.

Bagi Bapak/Ibu wali santri atau alumni, silakan sampaikan pesan motivasi serta doa terbaik untuk anak-anak kita di kolom komentar di bawah ini ya. InsyaAllah menjadi penyejuk semangat bagi mereka dalam berproses di pesantren. 🤲🤍

Wassalamu'alaikum Warahmatullahi Wabarakatuh.

━━━━━━━━━━━━━━━━━━━━━
📍 *Kantor Humas & Publikasi Media YTPAI*
Pondok Pesantren Raudlatul Muta'allimin
Desa Datinawong, Kec. Babat, Kab. Lamongan, Jawa Timur
Layanan Informasi: https://bit.ly/humas-raudlatulmutaallimin

${hashtags}`;
    }

    function generateTikTokCaption(params) {
      const { judul, waktu, pj, sasaran, poin, topic, tone, hookIdx } = params;
      
      let hook = "Hal terpenting yang sering kita lupakan saat santri fokus menuntut ilmu: bukan cuma soal nilai, tapi juga tentang kesehatan mental dan ketenangan batin! 🧠🤍✨";
      if (topic.isTasmi) {
        hook = "Duduk berjam-jam tanpa lihat mushaf, cuma modal hafalan di dada dan doa orang tua... Masya Allah, beginilah momen haru Tasmi' Qur'an santri kita! 😭📖🤍";
      } else if (topic.isPhbi) {
        hook = "Vibes pesantren kalau lagi ada peringatan hari besar Islam beneran sehangat dan sekompak ini! Suasana yang selalu dirindukan santri & alumni! 🌙✨";
      } else if (topic.isEvent) {
        hook = "Siapa bilang santri cuma jago ngaji kitab? Liat nih kekompakan dan energi positif mereka pas kegiatan bareng! 🔥👏";
      }

      const hashtags = topic.isTasmi
        ? "#SantriViral #TasmiBilGhoib #TahfidzSantri #RaudlatulMutaallimin #FYP #TrendingSantri #AyoMondok"
        : topic.isKesehatan
        ? "#KesehatanMentalSantri #SantriKeren #RaudlatulMutaallimin #EdukasiSantri #MentalHealth #FYP #Lamongan"
        : "#SantriHits #RaudlatulMutaallimin #PesantrenLife #AyoMondok #FYP #TikTokViral";

      return `${hook}

✨ *${judul}*
📍 PP. Raudlatul Muta'allimin Lamongan
🗓️ ${waktu} | 👥 ${sasaran}

"${poin}"

Menurut kamu, apa kunci utama biar santri tetap semangat dan enjoy selama mondok? Drop pandanganmu di kolom komentar yuk! 👇💬

Double tap ❤️ kalau kamu bangga sama perjuangan para santri!

${hashtags}`;
    }

    function generateWhatsAppBroadcast(params) {
      const { judul, waktu, pj, sasaran, poin, cat } = params;

      return `📢 *INFORMASI & WARTA KEGIATAN HUMAS* 📢
*YTPAI Raudlatul Muta'allimin Lamongan*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
Assalamu'alaikum Warahmatullahi Wabarakatuh,

Diberitahukan dengan hormat kepada seluruh bapak/ibu wali santri, dewan guru/asatidz, dan civitas akademika YTPAI Raudlatul Muta'allimin Lamongan mengenai pelaksanaan agenda:

📌 *Nama Acara:* ${judul}
🗓️ *Hari/Tanggal:* ${waktu}
👥 *Sasaran/Peserta:* ${sasaran}
👤 *Penanggung Jawab:* ${pj}

💡 *Poin Inti & Keterangan:*
${poin}

Kami memohon doa restu dan dukungan bapak/ibu sekalian, semoga agenda ini berjalan lancar, aman, dan membawa manfaat serta keberkahan bagi seluruh santri dan lembaga.

Atas perhatian dan kerja sama yang baik, kami haturkan terima kasih (Jazakumullah Khairan Katsiran).

Wassalamu'alaikum Warahmatullahi Wabarakatuh.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Humas & Media Publikasi
*YTPAI Raudlatul Muta'allimin Lamongan*
Datinawong, Babat, Lamongan - Jawa Timur`;
    }

    function generateStoryReelsCaption(params) {
      const { judul, waktu, sasaran, poin, topic } = params;
      
      let quote = "Setiap langkah kecil dalam menuntut ilmu adalah doa besar yang sedang dipersiapkan semesta.";
      if (topic.isTasmi) {
        quote = "Menjaga kalam-Nya di dada, memuliakan orang tua di surga.";
      } else if (topic.isKesehatan) {
        quote = "Hati yang damai dan jiwa yang tangguh adalah awal dari kecemerlangan ilmu.";
      }

      return `✨ *${judul}* ✨
📍 *PP. Raudlatul Muta'allimin Lamongan*

"${quote}" 🤲🤍

🗓️ ${waktu}
👥 ${sasaran}
💡 ${poin}

Kirim doa dan dukungan terbaikmu untuk anak-anak santri di balasan cerita ini ya! 👇
#RaudlatulMutaallimin #StorySantri #AyoMondok`;
    }

    function renderCaptionPreview() {
      const judul = document.getElementById('capInputJudul')?.value.trim() || 'Agenda Kegiatan YTPAI';
      const waktu = document.getElementById('capInputWaktu')?.value.trim() || '-';
      const pj = document.getElementById('capInputPj')?.value.trim() || 'Humas YTPAI';
      const sasaran = document.getElementById('capInputSasaran')?.value.trim() || 'Seluruh Civitas Akademika';
      const poin = document.getElementById('capInputPoin')?.value.trim() || 'Pelaksanaan kegiatan dalam rangka menyukseskan program tahunan madrasah dan pondok pesantren.';

      const cat = humasState.selectedCategory || 'resmi';
      let mode = humasState.outputMode || 'instagram';
      if (mode === 'viral') mode = 'instagram';
      const tone = humasState.viralTone || 'pro';
      const hookIdx = humasState.viralHookIndex || 0;

      const topic = detectHumasTopic(judul, poin, cat);
      const params = { judul, waktu, pj, sasaran, poin, cat, topic, tone, hookIdx };

      let caption = '';
      if (mode === 'facebook') {
        caption = generateFacebookCaption(params);
      } else if (mode === 'tiktok') {
        caption = generateTikTokCaption(params);
      } else if (mode === 'wa') {
        caption = generateWhatsAppBroadcast(params);
      } else if (mode === 'story') {
        caption = generateStoryReelsCaption(params);
      } else {
        // Default: Instagram / Sosmed Profesional
        caption = generateInstagramCaption(params);
      }

      const box = document.getElementById('humasCaptionPreviewBox');
      if (box) {
        box.textContent = caption;
      }
    }


    function copyHumasCaption() {
      const box = document.getElementById('humasCaptionPreviewBox');
      const text = box ? box.textContent : '';
      if (!text) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showCopyCaptionSuccess();
        }).catch(() => {
          fallbackCopyText(text);
          showCopyCaptionSuccess();
        });
      } else {
        fallbackCopyText(text);
        showCopyCaptionSuccess();
      }
    }

    function fallbackCopyText(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch(e) {}
      document.body.removeChild(ta);
    }

    function showCopyCaptionSuccess() {
      const btnText = document.getElementById('btnCopyHumasCapText');
      if (btnText) {
        const orig = btnText.textContent;
        btnText.textContent = (humasState.outputMode === 'viral') ? '✅ Caption AI Viral (86%) Disalin!' : '✅ Berhasil Disalin!';
        setTimeout(() => { btnText.textContent = orig; }, 2200);
      }
      if (typeof showToast === 'function') {
        const title = (humasState.outputMode === 'viral') ? 'Caption AI Viral Disalin (86%+)!' : 'Caption Humas Disalin!';
        const msg = (humasState.outputMode === 'viral')
          ? 'Format teks viral telah tersalin ke clipboard. Siap diposting di Instagram, TikTok, Reels, atau Facebook.'
          : 'Teks warta telah tersalin ke clipboard. Siap diunggah ke grup WhatsApp atau media madrasah.';
        showToast(title, msg);
      }
      triggerHaptic(15);
    }

    function openHumasWhatsAppDirect() {
      const box = document.getElementById('humasCaptionPreviewBox');
      const text = box ? box.textContent : '';
      copyHumasCaption();

      const encoded = encodeURIComponent(text);
      const waUrl = `https://api.whatsapp.com/send?text=${encoded}`;
      window.open(waUrl, '_blank');
    }

    // --- INTEGRASI AGENDA TASMI' BIL GHOIB KE KALENDER & RADAR HUMAS ---
    function syncTahfidzToHumasAgenda(isSilent = false) {
      const students = typeof getTahfidzMasterStudents === 'function' 
        ? getTahfidzMasterStudents() 
        : (typeof TAHFIDZ_DEFAULT_STUDENTS !== 'undefined' ? TAHFIDZ_DEFAULT_STUDENTS : []);

      if (!humasState.programs) humasState.programs = [];
      let addedCount = 0;

      // 1. Agenda Tasmi' Institusional Gelombang 1 (September 2026)
      const tasmiG1Id = 'prog-tasmi-gel1';
      if (!humasState.programs.some(p => p.id === tasmiG1Id)) {
        humasState.programs.push({
          id: tasmiG1Id,
          no: humasState.programs.length + 1,
          tgl: '18-24',
          startDate: '2026-09-18',
          endDate: '2026-09-24',
          bulan: 'September',
          tahun: '2026',
          uraian: "Ujian Tasmi' Al-Qur'an (Bil Ghoib) Sekali Duduk - Gelombang I (31 Santri: MI, MTs, SMP, MA, SMA)",
          pj: 'Koordinator Tahfidz YTPAI & Dewan Asatidz',
          sasaran: '31 Santri Terpilih, Wali Santri & Dewan Penguji',
          kategori: 'tasmi',
          statusPamflet: 'belum',
          statusPost: 'draft',
          kanal: 'IG,FB,WA,TT'
        });
        addedCount++;
      }

      // 2. Jadwal Tasmi' Per Unit Pendidikan (MI, MTs, SMP, MA, SMA)
      const unitSchedule = {
        'MI': { tgl: '18', start: '2026-09-18', end: '2026-09-18', bulan: 'September', tahun: '2026' },
        'MTs': { tgl: '19', start: '2026-09-19', end: '2026-09-19', bulan: 'September', tahun: '2026' },
        'SMP': { tgl: '20', start: '2026-09-20', end: '2026-09-20', bulan: 'September', tahun: '2026' },
        'MA': { tgl: '21', start: '2026-09-21', end: '2026-09-21', bulan: 'September', tahun: '2026' },
        'SMA': { tgl: '22', start: '2026-09-22', end: '2026-09-22', bulan: 'September', tahun: '2026' }
      };

      Object.keys(unitSchedule).forEach(unit => {
        const uId = 'prog-tasmi-' + unit.toLowerCase();
        if (!humasState.programs.some(p => p.id === uId)) {
          const uStudents = students.filter(s => s.unit === unit);
          const studentSample = uStudents.map(s => s.nama).slice(0, 3).join(', ') + (uStudents.length > 3 ? (' (+' + (uStudents.length - 3) + ' santri)') : '');
          const info = unitSchedule[unit];

          humasState.programs.push({
            id: uId,
            no: humasState.programs.length + 1,
            tgl: info.tgl,
            startDate: info.start,
            endDate: info.end,
            bulan: info.bulan,
            tahun: info.tahun,
            uraian: "Tasmi' Bil Ghoib Unit " + unit + " (" + uStudents.length + " Santri): " + studentSample,
            pj: 'Koord. Tahfidz Unit ' + unit,
            sasaran: 'Santri Tahfidz ' + unit + ' & Wali Santri',
            kategori: 'tasmi',
            unit: unit,
            statusPamflet: 'belum',
            statusPost: 'draft',
            kanal: 'IG,FB,WA'
          });
          addedCount++;
        }
      });

      // 3. Tasmi' Gelombang 2 Semester Genap (Februari 2027)
      const tasmiG2Id = 'prog-tasmi-gel2';
      if (!humasState.programs.some(p => p.id === tasmiG2Id)) {
        humasState.programs.push({
          id: tasmiG2Id,
          no: humasState.programs.length + 1,
          tgl: '15-18',
          startDate: '2027-02-15',
          endDate: '2027-02-18',
          bulan: 'Februari',
          tahun: '2027',
          uraian: "Ujian Tasmi' Al-Qur'an Bil Ghoib Semester Genap (MI, MTs, SMP, MA, SMA)",
          pj: 'Koordinator Tahfidz & Penguji Yayasan',
          sasaran: 'Santri Tahfidz 5 Unit Pendidikan',
          kategori: 'tasmi',
          statusPamflet: 'belum',
          statusPost: 'draft',
          kanal: 'IG,FB,WA,TT'
        });
        addedCount++;
      }

      // 4. Wisuda & Apresiasi Syahadah Tahfidz (Mei 2027)
      const tasmiWisudaId = 'prog-tasmi-wisuda';
      if (!humasState.programs.some(p => p.id === tasmiWisudaId)) {
        humasState.programs.push({
          id: tasmiWisudaId,
          no: humasState.programs.length + 1,
          tgl: '22',
          startDate: '2027-05-22',
          endDate: '2027-05-22',
          bulan: 'Mei',
          tahun: '2027',
          uraian: "Wisuda & Apresiasi Syahadah Tahfidz Tasmi' Bil Ghoib 30 Juz Santri YTPAI",
          pj: 'Pengurus Yayasan & Panitia Wisuda',
          sasaran: 'Hafidz / Hafidzah, Wali Santri & Seluruh Warga YTPAI RML',
          kategori: 'tasmi',
          statusPamflet: 'belum',
          statusPost: 'draft',
          kanal: 'IG,FB,WA,TT'
        });
        addedCount++;
      }

      // Re-urutkan nomor urut
      humasState.programs.forEach((p, idx) => { p.no = idx + 1; });
      saveHumasMasterToLocal();
      if (typeof renderHumasAll === 'function') renderHumasAll();
      if (typeof renderHumasMetrics === 'function') renderHumasMetrics();

      if (!isSilent) {
        if (typeof showToast === 'function') {
          showToast('Agenda Tasmi Bil Ghoib (' + addedCount + ' kegiatan & 31 santri) berhasil disinkronkan ke Kalender Humas!', 'success');
        } else {
          alert('Agenda Tasmi Bil Ghoib berhasil disinkronkan ke Kalender Humas!');
        }
      }
    }

    // --- Filter & Tabel Program Tahunan ---
    function filterHumasTable(type, value) {
      if (type === 'tasmi_belum') {
        if (humasState.currentSpecialFilter === 'tasmi_belum') {
          humasState.currentSpecialFilter = null;
          const btn = document.getElementById('btnFilterTasmiBelum');
          if (btn) btn.className = 'w-full sm:w-auto h-7 px-2.5 text-[11px] font-bold rounded-none bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-300/70 dark:border-amber-700/70 transition-all flex items-center justify-between sm:justify-center gap-1.5 cursor-pointer shadow-2xs shrink-0';
        } else {
          humasState.currentSpecialFilter = 'tasmi_belum';
          const btn = document.getElementById('btnFilterTasmiBelum');
          if (btn) btn.className = 'w-full sm:w-auto h-7 px-2.5 text-[11px] font-bold rounded-none bg-amber-600 text-white border border-amber-500 shadow-sm transition-all flex items-center justify-between sm:justify-center gap-1.5 cursor-pointer ring-1 ring-amber-400 shrink-0';
        }
      } else if (type === 'bulan') {
        humasState.currentMonthFilter = value;
        const btns = document.querySelectorAll('.humas-month-btn');
        btns.forEach(b => {
          if (b.getAttribute('data-month') === value) {
            b.className = 'humas-month-btn active h-6 sm:h-7 px-2 rounded-none text-xs font-bold bg-indigo-600 text-white border border-indigo-500 shadow-2xs transition-all flex-shrink-0';
            const mContainer = b.parentElement;
            if (mContainer) {
              try { mContainer.scrollTo({ left: Math.max(0, b.offsetLeft - mContainer.offsetWidth / 2 + b.offsetWidth / 2), behavior: 'smooth' }); } catch (e) {}
            }
          } else {
            b.className = 'humas-month-btn h-6 sm:h-7 px-2 rounded-none text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex-shrink-0';
          }
        });
        const sel = document.getElementById('humasMonthSelect');
        if (sel) sel.value = value;
        const banner = document.getElementById('humasActiveMonthBanner');
        if (banner) {
          banner.textContent = value === 'all' ? 'Menampilkan Agenda Setahun Penuh' : `Menampilkan Kegiatan Bulan ${value}`;
        }
      } else if (type === 'status') {
        humasState.currentStatusFilter = value;
      } else if (type === 'kategori') {
        humasState.currentKategoriFilter = value;
        const btnAll = document.getElementById('btnFilterAllHumas');
        const btnTasmi = document.getElementById('btnFilterTasmiHumas');
        if (value === 'tasmi') {
          if (btnAll) btnAll.className = 'humas-kat-btn h-7 px-2 text-xs font-semibold rounded-none bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300/60 dark:border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-1 truncate text-center';
          if (btnTasmi) btnTasmi.className = 'humas-kat-btn active h-7 px-2 text-xs font-bold rounded-none bg-emerald-600 text-white border border-emerald-500 shadow-2xs transition-all flex items-center justify-center gap-1 cursor-pointer truncate text-center';
        } else {
          if (btnAll) btnAll.className = 'humas-kat-btn active h-7 px-2 text-xs font-bold rounded-none bg-indigo-600 text-white border border-indigo-500 shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1 truncate text-center';
          if (btnTasmi) btnTasmi.className = 'humas-kat-btn h-7 px-2 text-xs font-bold rounded-none bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs truncate text-center';
        }
      }
      renderHumasTable();
      triggerHaptic(5);
    }

    function navHumasMonth(direction) {
      const months = ['Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember', 'Januari', 'Februari', 'Maret', 'April', 'Mei'];
      let cur = humasState.currentMonthFilter;
      let idx = months.indexOf(cur);
      if (idx === -1) idx = 3; // September
      let nextIdx = idx + direction;
      if (nextIdx < 0) nextIdx = 0;
      if (nextIdx >= months.length) nextIdx = months.length - 1;
      filterHumasTable('bulan', months[nextIdx]);
    }

    function onHumasSearchInput(val) {
      humasState.searchQuery = (val || '').toLowerCase().trim();
      const topInput = document.getElementById('humasTopSearchInput');
      if (topInput && topInput.value !== val) topInput.value = val;
      renderHumasTable();
    }

    function onHumasTopSearchInput(val) {
      humasState.searchQuery = (val || '').toLowerCase().trim();
      const bottomInput = document.getElementById('humasSearchInput');
      if (bottomInput && bottomInput.value !== val) bottomInput.value = val;
      renderHumasTable();
    }

    function handleHumasTopSearchKeydown(e, val) {
      if (e.key === 'Enter') {
        e.preventDefault();
        processHumasVoiceSmartCommand(val);
      }
    }

    // ==============================================================
    // VOICE SEARCH & SMART COMMAND UNTUK TAB HUMAS & SOSMED
    // ==============================================================
    let humasSpeechRecognitionInstance = null;
    let isHumasVoiceListening = false;

    function toggleHumasVoiceSearch() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        if (typeof showToast === 'function') {
          showToast('Fitur Suara Tidak Didukung', 'Browser Anda belum mendukung Web Speech Recognition. Silakan gunakan Google Chrome di HP/Laptop.', 'warning');
        } else {
          alert('Browser ini belum mendukung Web Speech Recognition. Silakan gunakan Google Chrome.');
        }
        return;
      }

      if (isHumasVoiceListening) {
        stopHumasVoiceSearch();
      } else {
        startHumasVoiceSearch(SpeechRecognition);
      }
    }

    function startHumasVoiceSearch(SpeechRecognition) {
      try {
        humasSpeechRecognitionInstance = new SpeechRecognition();
        humasSpeechRecognitionInstance.lang = 'id-ID';
        humasSpeechRecognitionInstance.continuous = false;
        humasSpeechRecognitionInstance.interimResults = true;

        const voiceBtn = document.getElementById('btnHumasVoiceSearch');
        const voiceLabel = document.getElementById('labelHumasVoice');
        const listeningBanner = document.getElementById('humasVoiceListeningBanner');
        const liveTranscript = document.getElementById('humasVoiceLiveTranscript');

        const topVoiceBtn = document.getElementById('btnHumasTopVoiceSearch');
        const topVoiceLabel = document.getElementById('labelHumasTopVoice');
        const topListeningBanner = document.getElementById('humasTopVoiceListeningBanner');
        const topLiveTranscript = document.getElementById('humasTopVoiceLiveTranscript');

        humasSpeechRecognitionInstance.onstart = function() {
          isHumasVoiceListening = true;
          if (voiceBtn) {
            voiceBtn.className = 'absolute right-0.5 top-1/2 -translate-y-1/2 h-6 px-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-none text-[10.5px] font-bold flex items-center gap-1 shadow-md cursor-pointer transition-all border border-rose-500 animate-pulse ring-2 ring-rose-400';
          }
          if (voiceLabel) voiceLabel.textContent = 'Mendengarkan...';
          if (listeningBanner) listeningBanner.classList.remove('hidden');
          if (liveTranscript) liveTranscript.textContent = 'Silakan sebutkan pencarian atau filter (cth: "Acara Oktober butuh pamflet")...';

          if (topVoiceBtn) {
            topVoiceBtn.className = 'absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer transition-all border border-rose-400 animate-pulse ring-2 ring-rose-400';
          }
          if (topVoiceLabel) topVoiceLabel.textContent = 'Mendengarkan...';
          if (topListeningBanner) topListeningBanner.classList.remove('hidden');
          if (topLiveTranscript) topLiveTranscript.textContent = 'Silakan sebutkan pencarian atau filter (cth: "Acara Oktober butuh pamflet")...';
        };

        humasSpeechRecognitionInstance.onresult = function(event) {
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
          if (topLiveTranscript && currentText) {
            topLiveTranscript.textContent = `"${currentText}"`;
          }

          if (finalTranscript) {
            processHumasVoiceSmartCommand(finalTranscript);
            stopHumasVoiceSearch();
          }
        };

        humasSpeechRecognitionInstance.onerror = function(event) {
          console.warn('Humas Voice Recognition Error:', event.error);
          stopHumasVoiceSearch();
          if (event.error !== 'no-speech' && typeof showToast === 'function') {
            showToast('Suara Tidak Terdeteksi', 'Coba ulangi berbicara lebih dekat ke mikrofon.', 'warning');
          }
        };

        humasSpeechRecognitionInstance.onend = function() {
          stopHumasVoiceSearch();
        };

        humasSpeechRecognitionInstance.start();
      } catch (e) {
        console.error('Start Humas Voice Recognition Failed:', e);
        stopHumasVoiceSearch();
      }
    }

    function stopHumasVoiceSearch() {
      isHumasVoiceListening = false;
      if (humasSpeechRecognitionInstance) {
        try {
          humasSpeechRecognitionInstance.stop();
        } catch (e) {}
        humasSpeechRecognitionInstance = null;
      }

      const voiceBtn = document.getElementById('btnHumasVoiceSearch');
      const voiceLabel = document.getElementById('labelHumasVoice');
      const listeningBanner = document.getElementById('humasVoiceListeningBanner');

      const topVoiceBtn = document.getElementById('btnHumasTopVoiceSearch');
      const topVoiceLabel = document.getElementById('labelHumasTopVoice');
      const topListeningBanner = document.getElementById('humasTopVoiceListeningBanner');

      if (voiceBtn) {
        voiceBtn.className = 'absolute right-0.5 top-1/2 -translate-y-1/2 h-6 px-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-none text-[10.5px] font-bold flex items-center gap-1 shadow-2xs cursor-pointer transition-all border border-indigo-500';
      }
      if (voiceLabel) voiceLabel.textContent = 'Suara';
      if (listeningBanner) listeningBanner.classList.add('hidden');

      if (topVoiceBtn) {
        topVoiceBtn.className = 'absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 text-white rounded font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all border border-indigo-300/30';
      }
      if (topVoiceLabel) topVoiceLabel.textContent = 'Bicara';
      if (topListeningBanner) topListeningBanner.classList.add('hidden');
    }

    function handleHumasSearchKeydown(e, val) {
      if (e.key === 'Enter') {
        e.preventDefault();
        processHumasVoiceSmartCommand(val);
      }
    }

    let lastSpokenHumasAnswer = '';
    function speakHumasAnswer(textToSpeak) {
      if (!('speechSynthesis' in window) || !textToSpeak) return;
      try {
        lastSpokenHumasAnswer = textToSpeak;
        window.speechSynthesis.cancel();

        // Normalisasi untuk lafal Bahasa Indonesia yang natural, lancar, dan fasih
        let cleanSpeech = textToSpeak
          .replace(/[\*\#\_]/g, '')
          .replace(/\bS\.H\.\b/gi, 'Sarjana Hukum')
          .replace(/\bS\.Pd\.\b|\bS\.Pd\b/gi, 'Sarjana Pendidikan')
          .replace(/\bM\.Pd\.\b|\bM\.Pd\b/gi, 'Magister Pendidikan')
          .replace(/\bS\.Ag\.\b|\bS\.Ag\b/gi, 'Sarjana Agama')
          .replace(/\bS\.Kom\.\b|\bS\.Kom\b/gi, 'Sarjana Komputer')
          .replace(/\bS\.T\.\b/gi, 'Sarjana Teknik')
          .replace(/\bYTPAI\b/gi, 'Yayasan Tarbiyatul Islamiyah')
          .replace(/\bRML\b/gi, 'R M L')
          .replace(/\bPJ\b/gi, 'Penanggung Jawab')
          .replace(/\bPIC\b/gi, 'Penanggung Jawab')
          .replace(/\bBPMP\b/gi, 'B P M P')
          .replace(/\bLBA\b/gi, 'L B A')
          .replace(/\bLPBA\b/gi, 'L P B A')
          .replace(/\bLBB\b/gi, 'L B B')
          .replace(/\bSAS\b/gi, 'Sumatif Akhir Semester')
          .replace(/\bSTS\b/gi, 'Sumatif Tengah Semester')
          .replace(/\bMPLS\b/gi, 'M P L S')
          .replace(/\bKB-TK\b/gi, 'K B dan T K')
          .replace(/\bH-7\b/gi, 'H minus 7')
          .replace(/\bH-14\b/gi, 'H minus 14')
          .replace(/\bH-30\b/gi, 'H minus 30');

        const utterance = new SpeechSynthesisUtterance(cleanSpeech);
        utterance.lang = 'id-ID';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        // Pilih suara Bahasa Indonesia jika didukung peramban
        const voices = window.speechSynthesis.getVoices();
        const idVoice = voices.find(v => v.lang === 'id-ID' || (v.lang && v.lang.startsWith('id')));
        if (idVoice) utterance.voice = idVoice;

        const speakingBadge = document.getElementById('humasVoiceSpeakingBadge');
        utterance.onstart = function() {
          if (speakingBadge) speakingBadge.classList.remove('hidden');
        };
        utterance.onend = function() {
          if (speakingBadge) speakingBadge.classList.add('hidden');
        };
        utterance.onerror = function() {
          if (speakingBadge) speakingBadge.classList.add('hidden');
        };

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Speech synthesis error:', e);
      }
    }

    window.repeatHumasVoiceAnswer = function() {
      if (lastSpokenHumasAnswer) {
        speakHumasAnswer(lastSpokenHumasAnswer);
      }
    };

    window.closeHumasVoiceAnswerCard = function() {
      const card = document.getElementById('humasVoiceAnswerCard');
      if (card) card.classList.add('hidden');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      const speakingBadge = document.getElementById('humasVoiceSpeakingBadge');
      if (speakingBadge) speakingBadge.classList.add('hidden');
    };

    function renderHumasVoiceAnswerCard(query, bestMatch, spokenAns) {
      const card = document.getElementById('humasVoiceAnswerCard');
      if (!card || !bestMatch) return;

      const qEl = document.getElementById('humasVoiceAnswerQuery');
      const speechEl = document.getElementById('humasVoiceAnswerSpeechText');
      const pjEl = document.getElementById('humasVoiceAnswerPJ');
      const dateEl = document.getElementById('humasVoiceAnswerDate');
      const targetEl = document.getElementById('humasVoiceAnswerTarget');
      const pamfletEl = document.getElementById('humasVoiceAnswerPamflet');

      if (qEl) qEl.textContent = `"${query}"`;
      if (speechEl) speechEl.textContent = spokenAns;
      if (pjEl) pjEl.textContent = bestMatch.pj || 'Humas YTPAI';
      
      const tglStr = bestMatch.tanggal || bestMatch.waktu || 'Kondisional';
      const blnStr = bestMatch.bulan ? `Bulan ${bestMatch.bulan}` : '';
      const thnStr = bestMatch.tahun || '2026';
      if (dateEl) dateEl.textContent = `${tglStr} ${blnStr} ${thnStr}`;
      
      if (targetEl) targetEl.textContent = bestMatch.sasaran || 'Seluruh Warga YTPAI';
      
      const pamfletStatus = bestMatch.statusPamflet === 'siap' ? 'Sudah Siap ✅' : 'Belum Siap ⏳';
      const kanalStr = bestMatch.kanal || 'IG, FB, WA';
      if (pamfletEl) pamfletEl.textContent = `${pamfletStatus} • Kanal: ${kanalStr}`;

      card.classList.remove('hidden');
      if (typeof safeCreateIcons === 'function') safeCreateIcons();
    }

    function scrollHumasToTable() {
      const section = document.getElementById('humasProgramTableSection');
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    }

    // -------------------------------------------------------------
    // SEMANTIC SYNONYM & CANONICAL MAPPING FOR HUMAS NLP SEARCH
    // -------------------------------------------------------------
    function normalizeHumasSemanticQuery(str) {
      if (!str) return '';
      let s = str.toLowerCase();

      // Normalisasi Angka Lisan & Jawa ke Angka / Istilah
      s = s.replace(/\b(songo|sanga|sembilan)\b/gi, '9')
           .replace(/\b(delapan|wolu)\b/gi, '8')
           .replace(/\b(tujuh|pitu)\b/gi, '7')
           .replace(/\b(enam|enem)\b/gi, '6')
           .replace(/\b(lima|limo)\b/gi, '5')
           .replace(/\b(empat|papat)\b/gi, '4')
           .replace(/\b(tiga|telu)\b/gi, '3')
           .replace(/\b(dua|loro)\b/gi, '2')
           .replace(/\b(satu|siji)\b/gi, '1')
           .replace(/\b(sepuluh|sedasa)\b/gi, '10')
           .replace(/\b(tiga puluh|tigapuluh)\b/gi, '30');

      // Normalisasi Istilah & Sinonim Pesantren
      // 1. Wali Songo / Wali 9
      s = s.replace(/\b(wali\s*9|walisongo|wali\s*songo|wali\s*sanga|ziarah\s*wali)\b/gi, 'wali songo');

      // 2. Haflah Akhirussanah / Wisuda
      s = s.replace(/\b(wisuda|pelepasan|kelulusan|haflatut\s*takhrij|haflah\s*imtihan)\b/gi, 'haflah akhirussanah');

      // 3. Matsama / MOS / Orientasi
      s = s.replace(/\b(mos|mpls|masa\s*orientasi|orientasi\s*santri|santri\s*baru|taaruf)\b/gi, 'matsama');

      // 4. Tasmi' & Tahfidz
      s = s.replace(/\b(tasmik|setoran\s*juz|ujian\s*juz|tasmi\s*akbar|tasmi\s*borongan)\b/gi, 'tasmi');

      // 5. Class Meeting & Lomba
      s = s.replace(/\b(classmeeting|lomba\s*santri|porseni|pekan\s*olahraga)\b/gi, 'class meeting');

      // 6. Iftitah Dirasah / Masuk Pondok / KBM Awal
      s = s.replace(/\b(awal\s*masuk|masuk\s*pondok|pembukaan\s*ajaran|kuliah\s*umum|masuk\s*madrasah|masuk\s*sekolah|kbm\s*awal)\b/gi, 'iftitah dirasah');

      // 7. KBM & Pembelajaran
      s = s.replace(/\b(kegiatan\s*belajar|pembelajaran|belajar\s*mengajar)\b/gi, 'kbm');

      // 8. Madin / Madrasah Diniyah
      s = s.replace(/\b(madrasah\s*diniyah|diniyah|madin\s*ula|madin\s*wustho|madin\s*ulya)\b/gi, 'madin');

      // 9. LBB & Bimbingan Belajar
      s = s.replace(/\b(bimbingan\s*belajar|bimbel|les)\b/gi, 'lbb');

      // 10. LBA & Bahasa Asing
      s = s.replace(/\b(lembaga\s*bahasa|bahasa\s*asing|bahasa\s*arab|bahasa\s*inggris)\b/gi, 'lba');

      // 11. Khutbatul Arsy
      s = s.replace(/\b(khutbah\s*arsy|pekan\s*perkenalan|orientasi\s*pondok)\b/gi, 'khutbatul arsy');

      // 12. PHBI & Peringatan Hari Besar
      s = s.replace(/\b(hari\s*besar|peringatan\s*maulid|isra\s*miraj|tahun\s*baru\s*islam)\b/gi, 'phbi');

      // 13. Rapat
      s = s.replace(/\b(musyawarah|pleno|pertemuan)\b/gi, 'rapat');

      // 14. Tagihan / SPP / Administrasi
      s = s.replace(/\b(spp|syahriah|iuran|bayaran)\b/gi, 'tagihan');

      return s;
    }

    function onHumasSearchInput(val) {
      humasState.matchedProgramIds = null;
      humasState.searchQuery = (val || '').toLowerCase().trim();
      const topInput = document.getElementById('humasTopSearchInput');
      if (topInput && topInput.value !== val) topInput.value = val;
      renderHumasTable();
    }

    function onHumasTopSearchInput(val) {
      humasState.matchedProgramIds = null;
      humasState.searchQuery = (val || '').toLowerCase().trim();
      const bottomInput = document.getElementById('humasSearchInput');
      if (bottomInput && bottomInput.value !== val) bottomInput.value = val;
      renderHumasTable();
    }

    function handleHumasTopSearchKeydown(e, val) {
      if (e.key === 'Enter') {
        e.preventDefault();
        processHumasVoiceSmartCommand(val);
      }
    }

    function processHumasVoiceSmartCommand(rawText) {
      if (!rawText || !rawText.trim()) return false;
      const originalText = rawText.trim();
      let text = originalText.toLowerCase();

      const allProgs = humasState.programs || [];

      // ==============================================================
      // A.1. PERTANYAAN PENANGGUNG JAWAB (PJ / PIC) EKSPLISIT
      // Contoh: "Siapa penanggung jawab karnaval?", "Penanggung jawab karnaval siapa",
      //         "Siapa PIC Hari Santri?", "Karnaval penanggung jawabnya siapa?"
      // ==============================================================
      const isPJQuestion = /\b(siapa\s*(penanggung\s*jawab|pj|pic|koordinator|ketua|panitia)|(penanggung\s*jawab|pj|pic|koordinator|ketua|panitia).*siapa|siapa\s*yang\s*(mengurus|pegang|menangani|bertanggung\s*jawab)|siapa\s*pj|siapa\s*pic)\b/i.test(text) ||
        (/\b(penanggung\s*jawab|pj|pic)\b/i.test(text) && /\b(siapa|mana|kah)\b/i.test(text));

      if (isPJQuestion) {
        // Bersihkan seluruh stopwords untuk mengambil nama kegiatan/acara
        let eventKeyword = text
          .replace(/\b(siapa|penanggung\s*jawab|penanggung|jawabnya|jawab|pjnya|pj|picnya|pic|koordinator|ketua|panitia|yang|mengurus|pegang|menangani|bertanggung|acara|kegiatan|program|kerja|itu|sih|ya|tolong|tahu|kah|untuk|tentang|mengenai|pada|di|ke|dari|buat|adalah|adakah|ada|mohon|carikan|lihat|tampilkan|buka)\b/gi, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        const normEvent = normalizeHumasSemanticQuery(eventKeyword);
        const queryTokens = (normEvent || eventKeyword).split(' ').filter(t => t.length > 1);

        if (eventKeyword.length >= 2 || normEvent.length >= 2) {
          const matchedItems = [];
          for (const prog of allProgs) {
            const rawProgText = `${prog.uraian || ''} ${prog.kategori || ''} ${prog.sasaran || ''}`.toLowerCase();
            const normProgText = normalizeHumasSemanticQuery(rawProgText);

            let score = 0;
            // Kecocokan frasa langsung
            if (rawProgText.includes(eventKeyword) || normProgText.includes(normEvent)) {
              score += 60;
            }
            // Token match
            for (const token of queryTokens) {
              if (rawProgText.includes(token) || normProgText.includes(token)) score += 18;
            }

            if (score >= 15) {
              matchedItems.push({ prog, score });
            }
          }

          matchedItems.sort((a, b) => b.score - a.score);

          if (matchedItems.length > 0) {
            const bestMatch = matchedItems[0].prog;
            const pjClean = bestMatch.pj || 'Humas YTPAI';

            // Kunci ID agar tampil pasti di tabel
            humasState.matchedProgramIds = [bestMatch.id];
            humasState.searchQuery = '';

            const topInput = document.getElementById('humasTopSearchInput');
            const btmInput = document.getElementById('humasSearchInput');
            if (topInput) topInput.value = bestMatch.uraian;
            if (btmInput) btmInput.value = bestMatch.uraian;

            if (bestMatch.bulan) {
              filterHumasTable('bulan', bestMatch.bulan);
            } else {
              filterHumasTable('bulan', 'all');
            }

            renderHumasTable();
            scrollHumasToTable();

            const tglStr = bestMatch.tanggal || bestMatch.waktu || 'Kondisional';
            const blnStr = bestMatch.bulan ? `Bulan ${bestMatch.bulan}` : '';

            // Format jawaban suara ramah & lengkap sesuai permintaan pengguna
            const spokenAns = `Penanggung jawab kegiatan ${bestMatch.uraian} adalah ${pjClean}. Pelaksanaan dijadwalkan pada ${blnStr} ${tglStr} dengan sasaran ${bestMatch.sasaran || 'seluruh warga yayasan'}.`;

            renderHumasVoiceAnswerCard(originalText, bestMatch, spokenAns);
            speakHumasAnswer(spokenAns);

            if (typeof showToast === 'function') {
              showToast(`👤 Penanggung Jawab Ditemukan`, `${bestMatch.uraian}: ${pjClean}`, 'info');
            }
            return true;
          }
        }
      }

      // ==============================================================
      // A.2. PERTANYAAN AGENDA MILIK PENANGGUNG JAWAB (REVERSE QUERY)
      // Contoh: "Agenda Mokamat Syafii apa saja?", "Kegiatan apa saja yang dipegang Humas?", "Tugas BPMP"
      // ==============================================================
      const isReversePJ = /\b(agenda|kegiatan|acara|tugas|program)\s+(milik|dari|oleh|bagian|bpmp|humas|lba|lbb|lpba|yayasan|syafi|syafii|mokamat)\b/i.test(text) ||
        /\b(syafi|syafii|mokamat|bpmp|lpba|lba|lbb|yayasan)\s+(pegang|mengurus|bertanggung\s*jawab|agendanya|kegiatannya)\b/i.test(text);

      if (isReversePJ) {
        let pjKeyword = '';
        if (/syafi|syafii|mokamat/i.test(text)) pjKeyword = 'syafi';
        else if (/bpmp/i.test(text)) pjKeyword = 'bpmp';
        else if (/humas/i.test(text)) pjKeyword = 'humas';
        else if (/lba/i.test(text)) pjKeyword = 'lba';
        else if (/lbb/i.test(text)) pjKeyword = 'lbb';
        else if (/lpba/i.test(text)) pjKeyword = 'lpba';
        else if (/yayasan/i.test(text)) pjKeyword = 'yayasan';

        if (pjKeyword) {
          const matchedItems = allProgs.filter(p => (p.pj || '').toLowerCase().includes(pjKeyword));
          if (matchedItems.length > 0) {
            humasState.matchedProgramIds = matchedItems.map(m => m.id);
            humasState.searchQuery = '';
            filterHumasTable('bulan', 'all');
            renderHumasTable();
            scrollHumasToTable();

            const firstThree = matchedItems.slice(0, 3).map(p => `${p.uraian} (${p.bulan || ''})`).join(', ');
            const pjNameDisplay = matchedItems[0].pj;
            const spokenAns = `Ditemukan ${matchedItems.length} agenda kegiatan yang dikoordinatori oleh ${pjNameDisplay}, diantaranya: ${firstThree}. Seluruh daftar telah ditampilkan pada tabel.`;

            renderHumasVoiceAnswerCard(originalText, matchedItems[0], spokenAns);
            speakHumasAnswer(spokenAns);

            if (typeof showToast === 'function') {
              showToast(`📋 Agenda ${pjNameDisplay}`, `${matchedItems.length} kegiatan ditemukan`, 'info');
            }
            return true;
          }
        }
      }

      // ==============================================================
      // A.3. PERTANYAAN JADWAL UMUM (Q&A: "KAPAN HAFLAH AKHIRUSSANAH?", "DATA ZIARAH WALI 9", "KAPAN KARNAVAL")
      // ==============================================================
      const isQuestion = /\b(kapan|hari apa|tanggal berapa|kapan pelaksanaan|kapan waktu|jadwal|kapan acara|kapan kegiatan|data|info|informasi|jadwalnya|pelaksanaan|tentang|agenda)\b/i.test(text);
      if (isQuestion) {
        // Ekstraksi subjek pertanyaan & bersihkan seluruh stopwords
        let questionSubject = text
          .replace(/\b(kapan|hari apa|tanggal berapa|kapan pelaksanaan|kapan waktu|jadwal|jadwalnya|data|info|informasi|acara|kegiatan|program|kerja|pesantren|pondok|madrasah|sekolah|dilaksanakan|diadakan|dimulai|berlangsung|jatuh|itu|sih|ya|tolong|tahu|kah|untuk|tentang|mengenai|pada|di|ke|dari|buat|adakah|ada|mohon|carikan|lihat|tampilkan|buka)\b/gi, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        const normSubject = normalizeHumasSemanticQuery(questionSubject);

        if (questionSubject.length >= 2 || normSubject.length >= 2) {
          const queryTokens = (normSubject || questionSubject).split(' ').filter(t => t.length > 1);

          // Cari semua program yang cocok (Mendukung kumpulan agenda multi-tanggal / berseri)
          const matchedItems = [];
          for (const prog of allProgs) {
            const rawProgText = `${prog.uraian || ''} ${prog.kategori || ''} ${prog.pj || ''} ${prog.sasaran || ''}`.toLowerCase();
            const normProgText = normalizeHumasSemanticQuery(rawProgText);

            let score = 0;
            for (const token of queryTokens) {
              if (rawProgText.includes(token) || normProgText.includes(token)) score += 12;
            }
            if (rawProgText.includes(questionSubject) || normProgText.includes(normSubject)) score += 40;

            if (score >= 10) {
              matchedItems.push({ prog, score });
            }
          }

          matchedItems.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return (a.prog.startDate || '').localeCompare(b.prog.startDate || '');
          });

          if (matchedItems.length > 0) {
            const bestMatch = matchedItems[0].prog;

            // Kunci ID agenda yang cocok agar 100% PASTI TAMPIL di tabel tanpa terblokir filter
            humasState.matchedProgramIds = matchedItems.map(m => m.prog.id);
            humasState.searchQuery = ''; // Kosongkan search query filter teks agar tidak memfilter balik

            if (matchedItems.length === 1) {
              // Jika hanya 1 agenda spesifik tunggal
              if (bestMatch.bulan) {
                filterHumasTable('bulan', bestMatch.bulan);
              } else {
                filterHumasTable('bulan', 'all');
              }

              const topInput = document.getElementById('humasTopSearchInput');
              const btmInput = document.getElementById('humasSearchInput');
              if (topInput) topInput.value = bestMatch.uraian;
              if (btmInput) btmInput.value = bestMatch.uraian;

              renderHumasTable();
              scrollHumasToTable();

              const tglStr = bestMatch.tanggal || bestMatch.waktu || 'jadwal menyusul';
              const blnStr = bestMatch.bulan ? `Bulan ${bestMatch.bulan}` : '';
              const pjStr = bestMatch.pj ? `Penanggung jawab: ${bestMatch.pj}.` : '';
              const spokenAns = `Acara ${bestMatch.uraian} dijadwalkan pada tanggal ${tglStr}, ${blnStr}. ${pjStr}`;
              const toastDetail = `📅 Tanggal: ${tglStr} (${blnStr}) • PJ: ${bestMatch.pj || '-'}`;

              renderHumasVoiceAnswerCard(originalText, bestMatch, spokenAns);
              if (typeof showToast === 'function') {
                showToast(`📅 ${bestMatch.uraian}`, toastDetail, 'info');
              }
              speakHumasAnswer(spokenAns);
              return true;
            } else {
              // JIKA BANYAK / KUMPULAN AGENDA BERSERI
              filterHumasTable('bulan', 'all');

              const topInput = document.getElementById('humasTopSearchInput');
              const btmInput = document.getElementById('humasSearchInput');
              if (topInput) topInput.value = questionSubject;
              if (btmInput) btmInput.value = questionSubject;

              renderHumasTable();
              scrollHumasToTable();

              // Susun ringkasan suara dan notifikasi
              const firstTwo = matchedItems.slice(0, 2).map(m => `${m.prog.uraian} (${m.prog.tanggal || m.prog.waktu || ''} ${m.prog.bulan || ''})`).join(', dan ');
              const spokenAns = `Ditemukan ${matchedItems.length} agenda terkait ${questionSubject}: ${firstTwo}. Seluruh data lengkap tampil di tabel.`;
              const toastDetail = `📋 Ditemukan ${matchedItems.length} agenda pada tanggal berbeda di tabel.`;

              renderHumasVoiceAnswerCard(originalText, matchedItems[0].prog, spokenAns);
              if (typeof showToast === 'function') {
                showToast(`📅 ${matchedItems.length} Jadwal Terkait "${questionSubject}"`, toastDetail, 'info');
              }
              speakHumasAnswer(spokenAns);
              return true;
            }
          }
        }
      }

      // ==============================================================
      // B. PENANGANAN FILTER & PENCARIAN BIASA
      // ==============================================================
      humasState.matchedProgramIds = null;
      let appliedMessages = [];
      let spokenSummary = '';

      // 1. Deteksi Perintah Reset
      if (/\b(reset|tampilkan semua|semua agenda|seluruh agenda|awal)\b/i.test(text)) {
        humasState.searchQuery = '';
        humasState.matchedProgramIds = null;
        const topInput = document.getElementById('humasTopSearchInput');
        const searchInput = document.getElementById('humasSearchInput');
        if (topInput) topInput.value = '';
        if (searchInput) searchInput.value = '';
        filterHumasTable('kategori', 'all');
        filterHumasTable('status', 'all');
        filterHumasTable('bulan', 'all');
        if (typeof showToast === 'function') {
          showToast('🔄 Filter Direset', 'Menampilkan semua agenda tahun ajaran.');
        }
        speakHumasAnswer('Menampilkan semua agenda.');
        scrollHumasToTable();
        return true;
      }

      // 2. Deteksi Filter Bulan (Bicara "Tampilkan agenda bulan Desember", dll)
      const monthsList = [
        { name: 'Juni', regex: /\b(juni|jun)\b/i },
        { name: 'Juli', regex: /\b(juli|jul)\b/i },
        { name: 'Agustus', regex: /\b(agustus|agu|agust)\b/i },
        { name: 'September', regex: /\b(september|sep|sept)\b/i },
        { name: 'Oktober', regex: /\b(oktober|okt)\b/i },
        { name: 'November', regex: /\b(november|nov)\b/i },
        { name: 'Desember', regex: /\b(desember|des)\b/i },
        { name: 'Januari', regex: /\b(januari|jan)\b/i },
        { name: 'Februari', regex: /\b(februari|feb)\b/i },
        { name: 'Maret', regex: /\b(maret|mar)\b/i },
        { name: 'April', regex: /\b(april|apr)\b/i },
        { name: 'Mei', regex: /\b(mei)\b/i }
      ];

      for (const m of monthsList) {
        if (m.regex.test(text)) {
          filterHumasTable('bulan', m.name);
          appliedMessages.push(`Bulan ${m.name}`);
          spokenSummary += `agenda bulan ${m.name} `;
          break;
        }
      }

      // 3. Deteksi Filter Status Pamflet & Radar
      if (/\b(h-7|h minus 7|h - 7|mendesak|radar|butuh tindakan|jatuh tempo)\b/i.test(text)) {
        filterHumasTable('status', 'h7');
        appliedMessages.push('Radar H-7 (Mendesak)');
        spokenSummary += 'radar H minus 7 ';
      } else if (/\b(butuh pamflet|belum dibuat|belum pamflet|tanpa pamflet|belum ada pamflet|belum selesai|belum)\b/i.test(text)) {
        filterHumasTable('status', 'belum');
        appliedMessages.push('Status: Butuh Pamflet');
        spokenSummary += 'yang butuh pamflet ';
      } else if (/\b(sedang desain|proses desain|proses|tahap desain)\b/i.test(text)) {
        filterHumasTable('status', 'proses');
        appliedMessages.push('Status: Sedang Desain');
      } else if (/\b(siap publish|siap tayang|siap)\b/i.test(text)) {
        filterHumasTable('status', 'siap');
        appliedMessages.push('Status: Siap Publish');
      } else if (/\b(selesai|sudah tayang|sudah selesai|arsip)\b/i.test(text)) {
        filterHumasTable('status', 'selesai');
        appliedMessages.push('Status: Selesai');
      }

      // 4. Deteksi Kategori Tasmi'
      if (/\b(tasmi|tasmik|tahfidz|hafalan quran)\b/i.test(text)) {
        filterHumasTable('kategori', 'tasmi');
        appliedMessages.push('Kategori: Agenda Tasmi');
        spokenSummary += 'kategori tasmi ';
      }

      // 5. Ekstraksi Kata Kunci Pencarian Acara Spesifik
      let queryClean = text
        .replace(/\b(tampilkan|buka|cari|tolong|carikan|lihat|filter|agenda|acara|kegiatan|program|kerja|bulan|status|pamflet|yang|pada|di|ke|untuk|juni|juli|agustus|september|oktober|november|desember|januari|februari|maret|april|mei|h-7|h minus 7|mendesak|radar|butuh tindakan|butuh|belum|selesai|siap|proses|desain|tasmi|tasmik|tahfidz)\b/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (queryClean.length >= 2) {
        humasState.searchQuery = queryClean;
        const topInput = document.getElementById('humasTopSearchInput');
        const searchInput = document.getElementById('humasSearchInput');
        if (topInput) topInput.value = queryClean;
        if (searchInput) searchInput.value = queryClean;
        appliedMessages.push(`Cari: "${queryClean}"`);
        spokenSummary += `pencarian ${queryClean} `;
      } else if (appliedMessages.length > 0 && queryClean.length === 0) {
        humasState.searchQuery = '';
        const topInput = document.getElementById('humasTopSearchInput');
        const searchInput = document.getElementById('humasSearchInput');
        if (topInput) topInput.value = '';
        if (searchInput) searchInput.value = '';
      }

      renderHumasTable();
      scrollHumasToTable();

      const summary = appliedMessages.length > 0 ? appliedMessages.join(' • ') : `Cari: "${originalText}"`;
      if (typeof showToast === 'function') {
        showToast('🎙️ Filter Suara Diterapkan!', summary);
      }

      if (spokenSummary) {
        speakHumasAnswer(`Menampilkan ${spokenSummary}`);
      } else if (queryClean) {
        speakHumasAnswer(`Mencari acara ${queryClean}`);
      }
      return true;
    }

    function renderHumasTable() {
      const tbody = document.getElementById('humasTableBody');
      const emptyState = document.getElementById('humasTableEmptyState');
      const countLabel = document.getElementById('humasTableCountLabel');
      if (!tbody) return;

      const refDateStr = humasState.refDate || getTodayIsoDateString();

      const filtered = humasState.programs.filter(p => {
        // -1. JIKA ADA PROGRAM YANG DIKUNCI HASIL VOICE MATCHING (100% PASTI TAMPIL)
        if (humasState.matchedProgramIds && humasState.matchedProgramIds.length > 0) {
          return humasState.matchedProgramIds.includes(p.id);
        }

        // 0. Filter Khusus: Tasmi' Belum Dibuatkan Pamflet
        if (humasState.currentSpecialFilter === 'tasmi_belum' || humasState.currentStatusFilter === 'tasmi_belum') {
          const isTasmi = p.kategori === 'tasmi' || (p.uraian || '').toLowerCase().includes('tasmi');
          const isBelum = (p.statusPamflet || 'belum').toLowerCase() === 'belum';
          if (!isTasmi || !isBelum) return false;
        }

        // 1. Filter Bulan
        // JIKA SEDANG ADA PENCARIAN (searchQuery), PENCARIAN AKAN MENYISIR SELURUH BULAN SECARA OTOMATIS!
        if (humasState.currentMonthFilter !== 'all' && !humasState.searchQuery) {
          const filterBLower = humasState.currentMonthFilter.toLowerCase();
          const pBLower = (p.bulan || '').toLowerCase();
          // Cek kecocokan langsung atau apakah salah satu bulan rentang cocok
          const matchDirect = pBLower === filterBLower;
          const matchSub = pBLower.includes(filterBLower.slice(0, 3));
          if (!matchDirect && !matchSub) {
            return false;
          }
        } else if (!humasState.searchQuery) {
          // BILA PILIH 'SEMUA BULAN' DAN TIDAK SEDANG PENCARIAN: Tampilkan mulai dari tanggal yang sedang waktunya / terdekat ke depan
          const diff = calculateDaysDiff(p.endDate || p.startDate, refDateStr);
          if (diff < 0) return false;
        }

        // 1b. Filter Kategori Tasmi'
        if (humasState.currentKategoriFilter === 'tasmi') {
          const isTasmi = p.kategori === 'tasmi' || (p.uraian || '').toLowerCase().includes('tasmi');
          if (!isTasmi) return false;
        }

        // 2. Filter Status
        if (humasState.currentStatusFilter !== 'all' && humasState.currentStatusFilter !== 'tasmi_belum') {
          if (humasState.currentStatusFilter === 'h7') {
            const diff = calculateDaysDiff(p.startDate, refDateStr);
            if (diff < 0 || diff > 7) return false;
          } else {
            if ((p.statusPamflet || 'belum').toLowerCase() !== humasState.currentStatusFilter.toLowerCase()) {
              return false;
            }
          }
        }

        // 3. Search Query dengan Semantic Synonym & Flexible Multi-Token Matching
        if (humasState.searchQuery) {
          const rawHaystack = `${p.uraian || ''} ${p.pj || ''} ${p.sasaran || ''} ${p.bulan || ''} ${p.kategori || ''}`.toLowerCase();
          const normHaystack = normalizeHumasSemanticQuery(rawHaystack);
          const normQuery = normalizeHumasSemanticQuery(humasState.searchQuery);
          
          const matchDirect = rawHaystack.includes(humasState.searchQuery) || normHaystack.includes(normQuery);
          if (matchDirect) return true;

          const cleanTokens = normQuery
            .replace(/\b(untuk|tentang|mengenai|pada|di|ke|dari|buat|adakah|ada|yang|dan|atau|ini|itu|kapan|jadwal|data|acara|kegiatan)\b/gi, ' ')
            .split(' ')
            .map(t => t.trim())
            .filter(t => t.length > 1);

          if (cleanTokens.length === 0) return false;

          const matchedTokenCount = cleanTokens.filter(t => rawHaystack.includes(t) || normHaystack.includes(t)).length;
          const minRequired = cleanTokens.length <= 2 ? 1 : Math.ceil(cleanTokens.length * 0.5);
          if (matchedTokenCount < minRequired) {
            return false;
          }
        }

        return true;
      }).sort((a, b) => {

        return true;
      }).sort((a, b) => {
        const dateA = a.startDate || '';
        const dateB = b.startDate || '';
        if (dateA !== dateB) return dateA.localeCompare(dateB);
        return (a.no || 0) - (b.no || 0);
      });

      const uniqueFiltered = deduplicateHumasPrograms(filtered);

      if (countLabel) {
        countLabel.textContent = `Menampilkan ${uniqueFiltered.length} dari ${humasState.programs.length} agenda kegiatan`;
      }

      if (uniqueFiltered.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
      }

      if (emptyState) emptyState.classList.add('hidden');

      tbody.innerHTML = uniqueFiltered.map((item, idx) => {
        const dayLabel = getHumasDayRangeLabel(item);
        const diff = calculateDaysDiff(item.startDate, humasState.refDate);
        let h7Pill = '';
        if (diff === 0) {
          h7Pill = `<span class="block mt-1 text-[10px] font-black text-red-600 dark:text-red-400 animate-pulse flex items-center justify-center gap-0.5"><i data-lucide="alarm-clock" class="w-3 h-3"></i> HARI INI</span>`;
        } else if (diff === 1) {
          h7Pill = `<span class="block mt-1 text-[10px] font-black text-orange-600 dark:text-orange-400 flex items-center justify-center gap-0.5"><i data-lucide="flame" class="w-3 h-3"></i> H-1 (Besok)</span>`;
        } else if (diff > 1 && diff <= 3) {
          h7Pill = `<span class="block mt-1 text-[10px] font-extrabold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-0.5"><i data-lucide="zap" class="w-3 h-3"></i> H-${diff}</span>`;
        } else if (diff > 3 && diff <= 7) {
          h7Pill = `<span class="block mt-1 text-[10px] font-extrabold text-rose-600 dark:text-rose-400 flex items-center justify-center gap-0.5"><i data-lucide="calendar-clock" class="w-3 h-3"></i> H-${diff}</span>`;
        } else if (diff > 7 && diff <= 30) {
          h7Pill = `<span class="block mt-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-0.5"><i data-lucide="calendar" class="w-2.5 h-2.5"></i> H-${diff}</span>`;
        } else if (diff > 30) {
          h7Pill = `<span class="block mt-1 text-[9.5px] font-medium text-slate-500 dark:text-slate-400 flex items-center justify-center gap-0.5"><i data-lucide="clock" class="w-2.5 h-2.5"></i> H-${diff}</span>`;
        } else if (diff < 0) {
          h7Pill = `<span class="block mt-1 text-[9px] font-medium text-slate-400 dark:text-slate-500 flex items-center justify-center">Lewat</span>`;
        }

        const sp = item.statusPamflet || 'belum';

        // Channels with stylish dark-theme pills
        const kanalBadgeMap = { 
          'IG': 'channel-pill-ig', 
          'FB': 'channel-pill-fb', 
          'WA': 'channel-pill-wa', 
          'TT': 'channel-pill-tt' 
        };
        const kanals = (item.kanal || '').split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
        const kanalHtml = kanals.length > 0 
          ? kanals.map(k => `<span class="channel-pill ${kanalBadgeMap[k] || 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}">${k}</span>`).join(' ')
          : `<span class="text-slate-400 dark:text-slate-600 text-[10px]">-</span>`;

        const noteSnippet = item.catatan || item.keterangan ? `
          <div class="mt-1 text-[10px] text-amber-700 dark:text-amber-300/90 font-medium flex items-center gap-1">
            <i data-lucide="sticky-note" class="w-3 h-3 text-amber-500 flex-shrink-0"></i>
            <span class="line-clamp-1 italic">${escapeHtml(item.catatan || item.keterangan)}</span>
          </div>
        ` : '';

        return `
          <tr class="hover:bg-slate-50/70 dark:hover:bg-slate-800/60 transition-colors group">
            <td class="py-2.5 px-3 text-center font-bold text-slate-400 dark:text-slate-500 text-xs">${item.no || (idx + 1)}</td>
            <td class="py-2.5 px-3 text-center whitespace-nowrap">
              <span class="font-extrabold text-slate-800 dark:text-slate-100 text-xs">${escapeHtml(item.tgl)}</span>
              <span class="block text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                ${escapeHtml(item.bulan)} 
                <span class="inline-block px-1.5 py-0.2 rounded text-[9.5px] font-black ${item.tahun === '2026' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'}">${escapeHtml(item.tahun)}</span>
              </span>
              ${h7Pill}
            </td>
            <td class="py-2.5 px-4 font-semibold text-slate-900 dark:text-slate-100 leading-relaxed cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onclick="openModalEditProgram('${item.id}')" title="Klik untuk melihat detail lengkap & ubah keterangan">
              <div class="line-clamp-2">
                ${(item.kategori === 'tasmi' || (item.uraian || '').toLowerCase().includes('tasmi')) ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 mr-1.5 align-middle shadow-2xs"><i data-lucide="book-open" class="w-3 h-3 text-emerald-600 dark:text-emerald-400"></i> Tasmi\' Bil Ghoib</span>' : ''}${escapeHtml(item.uraian)}
              </div>
              ${noteSnippet}
            </td>
            <td class="py-2.5 px-3 text-slate-600 dark:text-slate-300">
              <div class="line-clamp-1 font-medium" title="${escapeHtml(item.pj || '-')}">
                ${escapeHtml(item.pj || '-')}
              </div>
            </td>
            <td class="py-2.5 px-3 text-slate-500 dark:text-slate-400 text-[11px]">
              <div class="line-clamp-1" title="${escapeHtml(item.sasaran || '-')}">
                ${escapeHtml(item.sasaran || '-')}
              </div>
            </td>
            <td class="py-2.5 px-3 text-center whitespace-nowrap">
              <select 
                onchange="quickToggleHumasPamfletStatus('${item.id}', this.value)" 
                class="humas-status-select status-${sp} focus:outline-none cursor-pointer"
                title="Klik untuk mengubah status pamflet sosmed"
              >
                <option value="belum" ${sp === 'belum' ? 'selected' : ''}>Belum Dibuat</option>
                <option value="proses" ${sp === 'proses' ? 'selected' : ''}>Sedang Desain</option>
                <option value="siap" ${sp === 'siap' ? 'selected' : ''}>Siap Publish</option>
                <option value="selesai" ${sp === 'selesai' ? 'selected' : ''}>Sudah Tayang</option>
              </select>
            </td>
            <td class="py-2.5 px-3 text-center whitespace-nowrap">
              ${kanalHtml}
            </td>
            <td class="py-2.5 px-3 text-center whitespace-nowrap">
              <div class="inline-flex items-center justify-center gap-1.5">
                <button 
                  type="button" 
                  onclick="openModalEditProgram('${item.id}')" 
                  class="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700 transition-all font-bold text-xs inline-flex items-center gap-1 cursor-pointer shadow-2xs active:scale-95"
                  title="Lihat Detail & Edit Keterangan Acara"
                >
                  <i data-lucide="file-edit" class="w-3.5 h-3.5 text-amber-500"></i>
                  <span class="text-[11px]">Detail & Edit</span>
                </button>
                <button 
                  type="button" 
                  onclick="loadProgramIntoCaptionStudio('${item.id}')" 
                  class="px-2 py-1 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 border border-indigo-500/25 hover:border-indigo-500/50 transition-all font-bold text-xs inline-flex items-center gap-1 cursor-pointer shadow-2xs active:scale-95"
                  title="Buka data acara ini di Studio Caption Generator"
                >
                  <i data-lucide="sparkles" class="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400"></i>
                  <span class="text-[11px]">Caption</span>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      safeCreateIcons();
    }

    // --- MODAL DETAIL & EDIT PROGRAM HUMAS & TASMI' ---
    function openModalEditProgram(progId) {
      const item = humasState.programs.find(p => p.id === progId);
      if (!item) return;

      const modal = document.getElementById('modalHumasEditProgram');
      if (!modal) return;

      document.getElementById('modalEditProgId').value = item.id;
      document.getElementById('modalEditUraian').value = item.uraian || '';
      document.getElementById('modalEditTgl').value = item.tgl || '';
      document.getElementById('modalEditBulan').value = item.bulan || 'September';
      document.getElementById('modalEditTahun').value = item.tahun || '2026';
      document.getElementById('modalEditPj').value = item.pj || '';
      document.getElementById('modalEditSasaran').value = item.sasaran || '';
      document.getElementById('modalEditCatatan').value = item.catatan || item.keterangan || '';

      // Set status pamflet radio
      const sp = (item.statusPamflet || 'belum').toLowerCase();
      const radios = document.getElementsByName('modalEditStatus');
      radios.forEach(r => {
        r.checked = (r.value === sp);
      });

      // Set kanal checkboxes
      const kanals = (item.kanal || 'IG,FB,WA').toUpperCase();
      const chkIg = document.getElementById('modalEditKanalIg');
      const chkFb = document.getElementById('modalEditKanalFb');
      const chkWa = document.getElementById('modalEditKanalWa');
      const chkTt = document.getElementById('modalEditKanalTt');
      if (chkIg) chkIg.checked = kanals.includes('IG');
      if (chkFb) chkFb.checked = kanals.includes('FB');
      if (chkWa) chkWa.checked = kanals.includes('WA');
      if (chkTt) chkTt.checked = kanals.includes('TT');

      // Khusus Agenda Tasmi' Bil Ghoib
      const isTasmi = item.kategori === 'tasmi' || (item.uraian || '').toLowerCase().includes('tasmi');
      const tasmiBox = document.getElementById('modalEditTasmiBox');
      const catBadge = document.getElementById('modalEditCategoryBadge');

      if (isTasmi) {
        if (catBadge) catBadge.classList.remove('hidden');
        if (tasmiBox) {
          tasmiBox.classList.remove('hidden');
          const students = typeof getTahfidzMasterStudents === 'function' 
            ? getTahfidzMasterStudents() 
            : (typeof TAHFIDZ_DEFAULT_STUDENTS !== 'undefined' ? TAHFIDZ_DEFAULT_STUDENTS : []);
          
          let relevantStudents = [];
          if (item.unit) {
            relevantStudents = students.filter(s => (s.unit || '').toUpperCase() === item.unit.toUpperCase());
            const unitLabel = document.getElementById('modalEditTasmiUnitLabel');
            if (unitLabel) unitLabel.textContent = `Daftar Santri Tasmi' Unit ${item.unit} (${relevantStudents.length} Santri)`;
          } else {
            relevantStudents = students;
            const unitLabel = document.getElementById('modalEditTasmiUnitLabel');
            if (unitLabel) unitLabel.textContent = `Daftar Seluruh Santri Tasmi' Gelombang 1 (${students.length} Santri)`;
          }

          const countBadge = document.getElementById('modalEditTasmiCountBadge');
          if (countBadge) countBadge.textContent = `${relevantStudents.length} Santri Terdaftar`;

          const listEl = document.getElementById('modalEditTasmiStudentList');
          if (listEl) {
            if (relevantStudents.length > 0) {
              listEl.innerHTML = `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  ${relevantStudents.map((s, idx) => `
                    <div class="flex items-center gap-1.5 py-0.5 px-1.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800/40">
                      <span class="w-4 text-center font-black text-emerald-700 dark:text-emerald-300 text-[10px]">${idx + 1}.</span>
                      <span class="font-bold text-slate-800 dark:text-slate-100 text-xs">${escapeHtml(s.nama)}</span>
                      <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold ml-auto">(${escapeHtml(s.unit || '')} - ${escapeHtml(s.juz || '30 Juz')})</span>
                    </div>
                  `).join('')}
                </div>
              `;
            } else {
              listEl.innerHTML = `<span class="italic text-slate-400">Data nama santri peserta dapat dituliskan pada kolom uraian / catatan pamflet.</span>`;
            }
          }
        }
      } else {
        if (catBadge) catBadge.classList.add('hidden');
        if (tasmiBox) tasmiBox.classList.add('hidden');
      }

      // Hitung H-Berapa Countdown Acara
      const countdownBadgeEl = document.getElementById('modalEditCountdownBadge');
      if (countdownBadgeEl) {
        const diff = calculateDaysDiff(item.startDate, humasState.refDate);
        if (diff === 0) {
          countdownBadgeEl.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black bg-red-600 text-white animate-pulse shadow-sm"><i data-lucide="alarm-clock" class="w-3.5 h-3.5"></i> HARI INI</span>`;
          countdownBadgeEl.classList.remove('hidden');
        } else if (diff === 1) {
          countdownBadgeEl.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black bg-orange-500 text-white shadow-sm"><i data-lucide="flame" class="w-3.5 h-3.5"></i> H-1 (Besok)</span>`;
          countdownBadgeEl.classList.remove('hidden');
        } else if (diff > 1 && diff <= 3) {
          countdownBadgeEl.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black bg-amber-500 text-white shadow-sm"><i data-lucide="zap" class="w-3.5 h-3.5"></i> H-${diff} (${diff} Hari Lagi)</span>`;
          countdownBadgeEl.classList.remove('hidden');
        } else if (diff > 3 && diff <= 7) {
          countdownBadgeEl.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black bg-rose-500 text-white shadow-sm"><i data-lucide="calendar-clock" class="w-3.5 h-3.5"></i> H-${diff} (${diff} Hari Lagi)</span>`;
          countdownBadgeEl.classList.remove('hidden');
        } else if (diff > 7 && diff <= 14) {
          countdownBadgeEl.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black bg-indigo-600 text-white shadow-sm"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> H-${diff} (~2 Minggu Lagi)</span>`;
          countdownBadgeEl.classList.remove('hidden');
        } else if (diff > 14 && diff <= 30) {
          countdownBadgeEl.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black bg-sky-600 text-white shadow-sm"><i data-lucide="calendar-days" class="w-3.5 h-3.5"></i> H-${diff} (${diff} Hari Lagi)</span>`;
          countdownBadgeEl.classList.remove('hidden');
        } else if (diff > 30) {
          const months = Math.round(diff / 30);
          const approx = months > 1 ? `~${months} Bulan Lagi` : '~1 Bulan Lagi';
          countdownBadgeEl.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-black bg-slate-700 text-white shadow-sm"><i data-lucide="clock" class="w-3.5 h-3.5"></i> H-${diff} (${approx})</span>`;
          countdownBadgeEl.classList.remove('hidden');
        } else if (diff < 0) {
          countdownBadgeEl.innerHTML = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Lewat (${Math.abs(diff)} hari lalu)</span>`;
          countdownBadgeEl.classList.remove('hidden');
        } else {
          countdownBadgeEl.classList.add('hidden');
        }
      }

      if (modal && modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      triggerHaptic(5);
      safeCreateIcons();
    }

    function closeModalEditProgram() {
      const modal = document.getElementById('modalHumasEditProgram');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    // --- MODAL RINCIAN METRIC HUMAS (RADAR H-7, BUTUH PAMFLET, PROSES DESAIN, SUDAH PUBLISH) ---
    let currentMetricDetailType = 'h7';
    let currentMetricDetailScope = 'all'; // 'all' | 'umum' | 'tasmi'
    let currentMetricDetailSearch = '';

    function openHumasMetricDetailModal(type, scope) {
      currentMetricDetailType = type || 'h7';
      currentMetricDetailScope = scope || 'all';
      currentMetricDetailSearch = '';
      const searchInput = document.getElementById('metricDetailSearchInput');
      if (searchInput) searchInput.value = '';

      const modal = document.getElementById('modalHumasMetricDetail');
      if (!modal) return;

      if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }

      updateMetricDetailScopeButtons();
      renderMetricDetailContent();

      modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      triggerHaptic(8);
      safeCreateIcons();
    }

    function setMetricDetailScope(scope) {
      currentMetricDetailScope = scope || 'all';
      updateMetricDetailScopeButtons();
      renderMetricDetailContent();
      triggerHaptic(4);
      safeCreateIcons();
    }

    function updateMetricDetailScopeButtons() {
      const btnAll = document.getElementById('scopeBtn-all');
      const btnUmum = document.getElementById('scopeBtn-umum');
      const btnTasmi = document.getElementById('scopeBtn-tasmi');

      const activeClass = 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold';
      const inactiveClass = 'font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white';

      if (btnAll) {
        btnAll.className = `flex-1 py-1.5 px-2.5 rounded-xl transition-all cursor-pointer text-center text-xs ${currentMetricDetailScope === 'all' ? activeClass : inactiveClass}`;
      }
      if (btnUmum) {
        btnUmum.className = `flex-1 py-1.5 px-2.5 rounded-xl transition-all cursor-pointer text-center text-xs flex items-center justify-center gap-1.5 ${currentMetricDetailScope === 'umum' ? activeClass + ' text-indigo-600 dark:text-indigo-400' : inactiveClass}`;
      }
      if (btnTasmi) {
        btnTasmi.className = `flex-1 py-1.5 px-2.5 rounded-xl transition-all cursor-pointer text-center text-xs flex items-center justify-center gap-1.5 ${currentMetricDetailScope === 'tasmi' ? activeClass + ' text-emerald-600 dark:text-emerald-400' : inactiveClass}`;
      }
    }

    window.openHumasMetricDetailModal = openHumasMetricDetailModal;
    window.setMetricDetailScope = setMetricDetailScope;
    window.filterMetricDetailList = filterMetricDetailList;
    window.closeHumasMetricDetailModal = closeHumasMetricDetailModal;

    function closeHumasMetricDetailModal() {
      const modal = document.getElementById('modalHumasMetricDetail');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
      document.body.style.overflow = '';
    }

    function filterMetricDetailList(query) {
      currentMetricDetailSearch = (query || '').trim();
      renderMetricDetailContent();
      safeCreateIcons();
    }

    function renderMetricDetailContent() {
      const type = currentMetricDetailType;
      const scope = currentMetricDetailScope;
      const titleEl = document.getElementById('metricDetailTitle');
      const subtitleEl = document.getElementById('metricDetailSubtitle');
      const countBadgeEl = document.getElementById('metricDetailCountBadge');
      const iconBoxEl = document.getElementById('metricDetailHeaderIconBox');
      const container = document.getElementById('metricDetailListContainer');
      if (!container) return;

      // KHUSUS SCOPE TASMI: TAMPILKAN SANTRI TASMI BIL GHOIB SEKALI DUDUK
      if (scope === 'tasmi') {
        renderMetricDetailTasmiSantriContent(type);
        return;
      }

      let allItems = [];
      let meta = {
        title: 'Rincian Agenda Humas',
        subtitle: 'Daftar rincian kegiatan',
        icon: 'calendar',
        iconBoxClass: 'w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center flex-shrink-0',
        badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/40',
        emptyMsg: 'Tidak ada data kegiatan.'
      };

      if (type === 'h7') {
        allItems = getUpcomingH7Programs(humasState.refDate);
        if (scope === 'tasmi') {
          meta = {
            title: "Radar H-7: Ujian Tasmi' Bil Ghoib",
            subtitle: "Jadwal ujian hafalan Al-Qur'an santri yang jatuh tempo dalam 7 hari ke depan",
            icon: 'book-open',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center flex-shrink-0 animate-pulse',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40',
            emptyMsg: 'Alhamdulillah! Tidak ada jadwal tasmi dalam 7 hari ke depan.'
          };
        } else if (scope === 'umum') {
          meta = {
            title: 'Radar H-7: Agenda Umum Mendesak',
            subtitle: 'Daftar kegiatan umum madrasah/pondok yang jatuh tempo dalam 7 hari ke depan',
            icon: 'radio',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 flex items-center justify-center flex-shrink-0 animate-pulse',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40',
            emptyMsg: 'Alhamdulillah! Tidak ada agenda umum yang jatuh tempo dalam 7 hari ke depan.'
          };
        } else {
          meta = {
            title: 'Radar H-7: Seluruh Event Mendesak',
            subtitle: 'Daftar seluruh agenda yang jatuh tempo dalam 7 hari ke depan (Umum & Tasmi)',
            icon: 'radio',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 flex items-center justify-center flex-shrink-0 animate-pulse',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40',
            emptyMsg: 'Alhamdulillah! Tidak ada agenda yang jatuh tempo dalam 7 hari ke depan.'
          };
        }
      } else if (type === 'belum') {
        const refDateStr = humasState.refDate || new Date().toISOString().split('T')[0];
        // Tampilkan seluruh kegiatan yang belum selesai/belum tayang
        allItems = humasState.programs.filter(p => {
          const sp = (p.statusPamflet || 'belum').toLowerCase();
          if (sp === 'selesai' || sp === 'siap' || sp === 'proses') return false;
          const diff = calculateDaysDiff(p.endDate || p.startDate, refDateStr);
          return diff >= 0;
        }).sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));

        if (scope === 'tasmi') {
          meta = {
            title: "Pamflet Tasmi': Butuh Dibuat",
            subtitle: "Jadwal/santri tasmi' bil ghoib yang belum dibuatkan pamflet ucapan & syahadah",
            icon: 'file-plus-2',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center flex-shrink-0',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40',
            emptyMsg: 'Bagus sekali! Semua agenda tasmi sudah dibuatkan pamflet atau dalam proses.'
          };
        } else if (scope === 'umum') {
          meta = {
            title: 'Pamflet Umum: Butuh Dibuat',
            subtitle: 'Daftar kegiatan umum aktif mendatang yang belum dibuatkan flyer / pamflet',
            icon: 'clock',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center flex-shrink-0',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40',
            emptyMsg: 'Bagus sekali! Semua agenda umum mendatang telah dibuatkan pamflet.'
          };
        } else {
          meta = {
            title: 'Seluruh Agenda Butuh Pamflet',
            subtitle: 'Daftar agenda aktif mendatang yang belum dibuatkan materi publikasi / flyer sosmed',
            icon: 'clock',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center flex-shrink-0',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40',
            emptyMsg: 'Bagus sekali! Semua agenda mendatang telah dibuatkan pamflet atau dalam pengerjaan.'
          };
        }
      } else if (type === 'proses') {
        const refDateStr = humasState.refDate || new Date().toISOString().split('T')[0];
        allItems = humasState.programs.filter(p => {
          const sp = (p.statusPamflet || '').toLowerCase();
          if (sp !== 'proses') return false;
          const diff = calculateDaysDiff(p.endDate || p.startDate, refDateStr);
          return diff >= 0;
        }).sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
        if (scope === 'tasmi') {
          meta = {
            title: "Pamflet Tasmi': Sedang Didesain",
            subtitle: "Flyer ucapan tasmi' santri yang sedang dikerjakan desainer di Canva/Corel",
            icon: 'palette',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30 flex items-center justify-center flex-shrink-0',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-500/40',
            emptyMsg: 'Saat ini tidak ada pamflet tasmi yang berstatus sedang dikerjakan.'
          };
        } else if (scope === 'umum') {
          meta = {
            title: 'Pamflet Umum: Sedang Didesain',
            subtitle: 'Flyer kegiatan umum yang saat ini sedang diproses desainer di Canva/Corel',
            icon: 'palette',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center flex-shrink-0',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/40',
            emptyMsg: 'Saat ini tidak ada pamflet umum yang berstatus sedang dikerjakan.'
          };
        } else {
          meta = {
            title: 'Pamflet Sedang Desain',
            subtitle: 'Daftar pamflet & flyer yang saat ini sedang diproses desainer di Canva/Corel',
            icon: 'palette',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center flex-shrink-0',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/40',
            emptyMsg: 'Saat ini tidak ada pamflet yang berstatus sedang dikerjakan.'
          };
        }
      } else if (type === 'selesai') {
        allItems = humasState.programs.filter(p => {
          const sp = (p.statusPamflet || '').toLowerCase();
          return sp === 'selesai' || sp === 'siap';
        }).sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
        if (scope === 'tasmi') {
          meta = {
            title: "Pamflet Tasmi': Siap & Sudah Tayang",
            subtitle: "Flyer ucapan tasmi' santri yang telah siap edar atau sudah publish di medsos",
            icon: 'award',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center flex-shrink-0',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40',
            emptyMsg: 'Belum ada pamflet tasmi yang ditandai siap publish atau selesai tayang.'
          };
        } else if (scope === 'umum') {
          meta = {
            title: 'Pamflet Umum: Siap & Sudah Tayang',
            subtitle: 'Daftar pamflet kegiatan umum yang telah siap edar atau sudah publish di medsos',
            icon: 'check-circle-2',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center flex-shrink-0',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/40',
            emptyMsg: 'Belum ada agenda umum yang ditandai siap publish atau selesai tayang.'
          };
        } else {
          meta = {
            title: 'Agenda Siap & Sudah Publish',
            subtitle: 'Daftar konten pamflet yang telah siap edar atau sudah tayang di media sosial',
            icon: 'check-circle-2',
            iconBoxClass: 'w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center flex-shrink-0',
            badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40',
            emptyMsg: 'Belum ada agenda yang ditandai siap publish atau selesai tayang.'
          };
        }
      }

      // Filter by scope
      if (scope === 'umum') {
        allItems = allItems.filter(p => !(p.kategori === 'tasmi' || (p.uraian || '').toLowerCase().includes('tasmi')));
      } else if (scope === 'tasmi') {
        allItems = allItems.filter(p => (p.kategori === 'tasmi' || (p.uraian || '').toLowerCase().includes('tasmi')));
      }

      // Pastikan selalu unik dan bersih dari duplikasi
      allItems = deduplicateHumasPrograms(allItems);

      if (titleEl) titleEl.textContent = meta.title;
      if (subtitleEl) subtitleEl.textContent = meta.subtitle;
      if (countBadgeEl) {
        countBadgeEl.textContent = `${allItems.length} Kegiatan`;
        countBadgeEl.className = meta.badgeClass;
      }
      if (iconBoxEl) {
        iconBoxEl.className = meta.iconBoxClass;
        iconBoxEl.innerHTML = `<i data-lucide="${meta.icon}" class="w-5 h-5"></i>`;
      }

      // Filter by search query if any
      let filtered = allItems;
      if (currentMetricDetailSearch) {
        const q = currentMetricDetailSearch.toLowerCase();
        filtered = allItems.filter(p => {
          const haystack = `${p.uraian || ''} ${p.pj || ''} ${p.sasaran || ''} ${p.bulan || ''} ${p.kategori || ''} ${p.catatan || ''}`.toLowerCase();
          return haystack.includes(q);
        });
      }

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="py-10 text-center space-y-2 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-900/40">
            <i data-lucide="${currentMetricDetailSearch ? 'search-x' : 'check-circle'}" class="w-10 h-10 mx-auto text-slate-400"></i>
            <p class="font-bold text-sm text-slate-700 dark:text-slate-300">
              ${currentMetricDetailSearch ? 'Tidak ada kegiatan yang sesuai pencarian "' + escapeHtml(currentMetricDetailSearch) + '"' : meta.emptyMsg}
            </p>
            <p class="text-xs text-slate-400">
              ${currentMetricDetailSearch ? 'Coba gunakan kata kunci pencarian yang lain.' : 'Status kegiatan terpantau dengan baik.'}
            </p>
          </div>
        `;
        if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
        return;
      }

      container.innerHTML = filtered.map((item, idx) => {
        const itemNumber = idx + 1;
        const diff = calculateDaysDiff(item.startDate, humasState.refDate);
        const dayLabel = getHumasDayRangeLabel(item);

        let countdownBadge = '';
        if (diff === 0) {
          countdownBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white shadow-md shadow-red-600/30 border border-red-400 animate-pulse"><span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span><i data-lucide="alarm-clock" class="w-3.5 h-3.5"></i> HARI INI</span>`;
        } else if (diff === 1) {
          countdownBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 border border-orange-400"><i data-lucide="flame" class="w-3.5 h-3.5"></i> H-1 (Besok)</span>`;
        } else if (diff > 1 && diff <= 3) {
          countdownBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 shadow-2xs"><i data-lucide="zap" class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400"></i> H-${diff} (${diff} Hari Lagi)</span>`;
        } else if (diff > 3 && diff <= 7) {
          countdownBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40 shadow-2xs"><i data-lucide="calendar-clock" class="w-3.5 h-3.5 text-rose-600 dark:text-rose-400"></i> H-${diff} (${diff} Hari Lagi)</span>`;
        } else if (diff > 7 && diff <= 14) {
          countdownBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/40 shadow-2xs"><i data-lucide="calendar" class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400"></i> H-${diff} (~2 Minggu Lagi)</span>`;
        } else if (diff > 14 && diff <= 30) {
          countdownBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-500/40 shadow-2xs"><i data-lucide="calendar-days" class="w-3.5 h-3.5 text-sky-600 dark:text-sky-400"></i> H-${diff} (${diff} Hari Lagi)</span>`;
        } else if (diff > 30) {
          const months = Math.round(diff / 30);
          const approx = months > 1 ? `~${months} Bulan Lagi` : '~1 Bulan Lagi';
          countdownBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 shadow-2xs"><i data-lucide="clock" class="w-3.5 h-3.5 text-slate-500"></i> H-${diff} (${approx})</span>`;
        } else if (diff < 0) {
          countdownBadge = `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">Lewat (${Math.abs(diff)} hari lalu)</span>`;
        }

        const is2026 = item.tahun === '2026';
        const yearBadge = is2026
          ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-500/25 dark:text-rose-300 dark:border-rose-500/40"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>2026</span>`
          : `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/25 dark:text-emerald-300 dark:border-emerald-500/40"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>2027</span>`;

        const sp = (item.statusPamflet || 'belum').toLowerCase();
        let statusBadge = '';
        if (sp === 'belum') {
          statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40"><i data-lucide="clock" class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400"></i> Butuh Pamflet</span>`;
        } else if (sp === 'proses') {
          statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/40"><i data-lucide="palette" class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400"></i> Proses Desain</span>`;
        } else if (sp === 'siap') {
          statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-500/40"><i data-lucide="check" class="w-3.5 h-3.5 text-teal-600 dark:text-teal-400"></i> Siap Tayang</span>`;
        } else {
          statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"></i> Sudah Publish</span>`;
        }

        const isTasmi = item.kategori === 'tasmi' || (item.uraian || '').toLowerCase().includes('tasmi');
        const catBadge = isTasmi 
          ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-extrabold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40"><i data-lucide="book-open" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"></i> Tasmi' 31 Santri</span>`
          : (item.kategori ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700 uppercase">${escapeHtml(item.kategori)}</span>` : '');

        const kanals = (item.kanal || '').split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
        const kanalHtml = kanals.length > 0 
          ? `<div class="flex items-center gap-1 mt-1"><span class="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Kanal:</span> ${kanals.map(k => `<span class="px-1.5 py-0.2 rounded text-[9.5px] font-extrabold bg-slate-200/90 dark:bg-slate-700 text-slate-800 dark:text-slate-200">${k}</span>`).join(' ')}</div>`
          : '';

        const noteSnippet = (item.catatan || item.keterangan) 
          ? `<div class="mt-1.5 p-2 rounded-xl bg-amber-50/70 dark:bg-slate-800/50 text-[11px] text-amber-900/90 dark:text-slate-400 italic flex items-start gap-1.5 border border-amber-200/60 dark:border-slate-700/50">
               <i data-lucide="info" class="w-3.5 h-3.5 text-amber-600 dark:text-indigo-400 flex-shrink-0 mt-0.5"></i>
               <span>${escapeHtml(item.catatan || item.keterangan)}</span>
             </div>`
          : '';

        return `
          <div class="bg-slate-50/80 hover:bg-slate-100/70 dark:bg-[#151c30] dark:hover:bg-[#182138] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 transition-all hover:border-indigo-400/60 shadow-xs">
            <!-- Top bar -->
            <div class="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 mb-2.5 border-b border-slate-200/70 dark:border-slate-800/80">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="inline-flex items-center justify-center min-w-[30px] h-7 px-2 rounded-xl text-xs font-black bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 flex-shrink-0 shadow-2xs" title="Nomor Urut #${itemNumber}">
                  #${itemNumber}
                </span>

                <!-- Tanggal & Hari Maximized Pill -->
                <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-300/80 dark:border-slate-700/80 shadow-2xs">
                  <div class="w-5 h-5 rounded-md bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                    <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                  </div>
                  ${dayLabel ? `
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-black uppercase tracking-wide bg-indigo-600 text-white dark:bg-indigo-500/30 dark:text-indigo-200">
                      <i data-lucide="clock" class="w-2.5 h-2.5"></i>
                      ${escapeHtml(dayLabel)}
                    </span>
                  ` : ''}
                  <span class="text-xs font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    ${escapeHtml(item.tgl ? item.tgl + ' ' : '')}${escapeHtml(item.bulan || '')}
                  </span>
                  ${yearBadge}
                </div>

                ${countdownBadge}
              </div>
              <div class="flex items-center gap-1.5 flex-wrap">
                ${catBadge}
                ${statusBadge}
              </div>
            </div>

            <!-- Title & Info -->
            <div class="space-y-2">
              <h5 class="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" onclick="openProgramFromMetricModal('${item.id}')" title="Klik untuk lihat detail & edit">
                <span class="text-indigo-600 dark:text-indigo-400 font-black mr-1">${itemNumber}.</span>${escapeHtml(item.uraian)}
              </h5>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                <div class="flex items-center gap-1.5">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Penanggung Jawab:</span>
                  <span class="font-bold text-slate-800 dark:text-slate-200">${escapeHtml(item.pj || '-')}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Sasaran:</span>
                  <span class="font-bold text-slate-800 dark:text-slate-200">${escapeHtml(item.sasaran || '-')}</span>
                </div>
              </div>
              ${kanalHtml}
              ${noteSnippet}
            </div>

            <!-- Actions Footer -->
            <div class="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              <!-- Quick Status Switch -->
              <div class="flex items-center gap-1 text-xs">
                <span class="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 mr-1">Status:</span>
                <button type="button" onclick="metricModalQuickStatus('${item.id}', 'belum')" class="px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${sp === 'belum' ? 'bg-amber-500 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-amber-50 hover:text-amber-800 dark:hover:bg-amber-950/60'}">Belum</button>
                <button type="button" onclick="metricModalQuickStatus('${item.id}', 'proses')" class="px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${sp === 'proses' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 hover:text-indigo-800 dark:hover:bg-indigo-950/60'}">Proses</button>
                <button type="button" onclick="metricModalQuickStatus('${item.id}', 'selesai')" class="px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${sp === 'selesai' || sp === 'siap' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-emerald-950/60'}">Publish</button>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-1.5 ml-auto">
                <button type="button" onclick="openCaptionFromMetricModal('${item.id}')" class="px-2.5 py-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-[11px] shadow-xs transition-all flex items-center gap-1 cursor-pointer">
                  <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                  <span>Caption AI</span>
                </button>
                <button type="button" onclick="openProgramFromMetricModal('${item.id}')" class="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer shadow-2xs">
                  <i data-lucide="file-edit" class="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400"></i>
                  <span>Detail & Edit</span>
                </button>
                <button type="button" onclick="copyAgendaQuickText('${item.id}')" class="p-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs" title="Salin Info Ringkas">
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // --- RENDER DAFTAR SANTRI TASMI' BIL GHOIB SEKALI DUDUK DI MODAL HUMAS ---
    function renderMetricDetailTasmiSantriContent(type) {
      const titleEl = document.getElementById('metricDetailTitle');
      const subtitleEl = document.getElementById('metricDetailSubtitle');
      const countBadgeEl = document.getElementById('metricDetailCountBadge');
      const iconBoxEl = document.getElementById('metricDetailHeaderIconBox');
      const container = document.getElementById('metricDetailListContainer');
      if (!container) return;

      const allStudents = typeof getTahfidzMasterStudents === 'function' ? getTahfidzMasterStudents() : [];
      // Hanya santri yang aktif meminta / telah menyelesaikan ujian tasmi'
      const tasmiStudents = allStudents.filter(s => s.isTasmi === true || Boolean(s.statusTasmi) || Boolean(s.tanggalTasmi) || (s.statusPamflet && s.statusPamflet !== 'none' && s.statusPamflet !== ''));

      let filteredStudents = [];
      let meta = {
        title: "Pamflet Tasmi' Sekali Duduk",
        subtitle: "Apresiasi santri yang telah menyelesaikan tasmi' bil ghoib sekali duduk",
        icon: 'book-open',
        iconBoxClass: 'w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center flex-shrink-0',
        badgeClass: 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40',
        emptyMsg: "Belum ada santri yang meminta atau menyelesaikan tasmi' bil ghoib sekali duduk saat ini."
      };

      const refDateStr = humasState.refDate || new Date().toISOString().split('T')[0];

      if (type === 'h7') {
        meta.title = "Radar Ujian Tasmi' Sekali Duduk";
        meta.subtitle = "Santri yang baru saja menyelesaikan ujian tasmi' sekali duduk (7 hari terakhir)";
        meta.icon = 'radio';
        meta.iconBoxClass = 'w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center flex-shrink-0 animate-pulse';
        meta.emptyMsg = "Alhamdulillah! Belum ada ujian tasmi' baru dalam radar 7 hari terakhir.";

        filteredStudents = tasmiStudents.filter(s => {
          if (!s.tanggalTasmi) return false;
          const diff = calculateDaysDiff(s.tanggalTasmi, refDateStr);
          return diff >= -7 && diff <= 7;
        });
      } else if (type === 'belum') {
        meta.title = "Pamflet Tasmi' Sekali Duduk: Butuh Dibuat";
        meta.subtitle = "Santri yang telah selesai ujian tasmi' namun belum dibuatkan materi flyer ucapan & syahadah";
        meta.icon = 'file-plus-2';
        meta.iconBoxClass = 'w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center flex-shrink-0';
        meta.badgeClass = 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40';
        meta.emptyMsg = "Alhamdulillah! Belum ada permintaan pamflet tasmi' tertunda (semua beres atau belum ada yang meminta tasmi').";

        filteredStudents = tasmiStudents.filter(s => {
          const sp = (s.statusPamflet || '').toLowerCase();
          return sp === 'pending' || sp === 'belum';
        });
      } else if (type === 'proses') {
        meta.title = "Pamflet Tasmi' Sekali Duduk: Sedang Didesain";
        meta.subtitle = "Flyer ucapan tasmi' santri yang saat ini sedang dikerjakan desainer di Canva/Corel";
        meta.icon = 'palette';
        meta.iconBoxClass = 'w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30 flex items-center justify-center flex-shrink-0';
        meta.badgeClass = 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-500/40';
        meta.emptyMsg = 'Saat ini tidak ada pamflet tasmi yang sedang dikerjakan desainer.';

        filteredStudents = tasmiStudents.filter(s => (s.statusPamflet || '').toLowerCase() === 'proses');
      } else if (type === 'selesai') {
        meta.title = "Pamflet Tasmi' Sekali Duduk: Siap & Sudah Tayang";
        meta.subtitle = "Flyer ucapan tasmi' santri yang telah siap edar atau sudah publish di media sosial";
        meta.icon = 'award';
        meta.iconBoxClass = 'w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center flex-shrink-0';
        meta.badgeClass = 'px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40';
        meta.emptyMsg = 'Belum ada pamflet tasmi yang ditandai sudah tayang di media sosial.';

        filteredStudents = tasmiStudents.filter(s => {
          const sp = (s.statusPamflet || '').toLowerCase();
          return sp === 'selesai' || sp === 'siap';
        });
      } else {
        filteredStudents = tasmiStudents.slice();
      }

      if (titleEl) titleEl.textContent = meta.title;
      if (subtitleEl) subtitleEl.textContent = meta.subtitle;
      if (countBadgeEl) {
        countBadgeEl.textContent = `${filteredStudents.length} Santri`;
        countBadgeEl.className = meta.badgeClass;
      }
      if (iconBoxEl) {
        iconBoxEl.className = meta.iconBoxClass;
        iconBoxEl.innerHTML = `<i data-lucide="${meta.icon}" class="w-5 h-5"></i>`;
      }

      // Filter pencarian
      if (currentMetricDetailSearch) {
        const q = currentMetricDetailSearch.toLowerCase();
        filteredStudents = filteredStudents.filter(s => {
          const haystack = `${s.nama || ''} ${s.unit || ''} ${s.kelas || ''} ${s.bapak || ''} ${s.ibu || ''} ${s.defaultKategori || ''} ${s.defaultJuz || ''}`.toLowerCase();
          return haystack.includes(q);
        });
      }

      if (filteredStudents.length === 0) {
        container.innerHTML = `
          <div class="py-10 text-center space-y-3 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-900/40">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-500/30 shadow-2xs">
              <i data-lucide="${currentMetricDetailSearch ? 'search-x' : 'award'}" class="w-6 h-6"></i>
            </div>
            <div>
              <p class="font-bold text-sm text-slate-800 dark:text-slate-200">
                ${currentMetricDetailSearch ? 'Tidak ada santri yang sesuai pencarian "' + escapeHtml(currentMetricDetailSearch) + '"' : meta.emptyMsg}
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                ${currentMetricDetailSearch ? 'Coba gunakan kata kunci nama atau unit lain.' : 'Ujian tasmi\' bil ghoib sekali duduk dimulai kapan saja saat santri sudah siap. Begitu ananda selesai ujian, catat di sini untuk otomatis masuk ke antrean pamflet & sertifikat.'}
              </p>
            </div>
            <div class="pt-1 flex flex-wrap items-center justify-center gap-2">
              <button type="button" onclick="promptAddNewTasmiStudent()" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs">
                <i data-lucide="user-plus" class="w-4 h-4"></i>
                <span>+ Catat Santri Baru Lulus Tasmi'</span>
              </button>
            </div>
          </div>
        `;
        if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
        return;
      }

      const unitColors = {
        'MI': { bg: 'bg-teal-50 dark:bg-teal-950/60', text: 'text-teal-800 dark:text-teal-300', border: 'border-teal-300 dark:border-teal-800/60', dot: 'bg-teal-500' },
        'MTs': { bg: 'bg-emerald-50 dark:bg-emerald-950/60', text: 'text-emerald-800 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-800/60', dot: 'bg-emerald-500' },
        'SMP': { bg: 'bg-sky-50 dark:bg-sky-950/60', text: 'text-sky-800 dark:text-sky-300', border: 'border-sky-300 dark:border-sky-800/60', dot: 'bg-sky-500' },
        'MA': { bg: 'bg-purple-50 dark:bg-purple-950/60', text: 'text-purple-800 dark:text-purple-300', border: 'border-purple-300 dark:border-purple-800/60', dot: 'bg-purple-500' },
        'SMA': { bg: 'bg-rose-50 dark:bg-rose-950/60', text: 'text-rose-800 dark:text-rose-300', border: 'border-rose-300 dark:border-rose-800/60', dot: 'bg-rose-500' }
      };

      container.innerHTML = `
        <!-- Bar Tambah Santri Cepat di Atas List -->
        <div class="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="font-bold text-emerald-800 dark:text-emerald-300">Tasmi' Bil Ghoib Sekali Duduk (5 Unit)</span>
            <span class="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:inline">• Waktu kondisional sesuai kesiapan ananda</span>
          </div>
          <button type="button" onclick="promptAddNewTasmiStudent()" class="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer shadow-xs">
            <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
            <span>+ Santri Baru Selesai</span>
          </button>
        </div>
      ` + filteredStudents.map((s, idx) => {
        const itemNumber = idx + 1;
        const uStyle = unitColors[s.unit] || unitColors['MTs'];
        const sp = (s.statusPamflet || 'pending').toLowerCase();

        let statusBadge = '';
        if (sp === 'pending' || sp === 'belum') {
          statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40"><i data-lucide="clock" class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400"></i> Butuh Pamflet</span>`;
        } else if (sp === 'proses') {
          statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-teal-100 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-500/40"><i data-lucide="palette" class="w-3.5 h-3.5 text-teal-600 dark:text-teal-400"></i> Sedang Desain</span>`;
        } else {
          statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"></i> Sudah Publish</span>`;
        }

        const juzDisplay = s.defaultJuz ? `(Juz ${s.defaultJuz})` : '';
        const kategoriDisplay = s.defaultKategori || 'Tasmi Sekali Duduk';

        return `
          <div class="bg-slate-50/80 hover:bg-slate-100/70 dark:bg-[#151c30] dark:hover:bg-[#182138] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 transition-all hover:border-emerald-500/60 shadow-xs">
            <!-- Top bar -->
            <div class="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-200/70 dark:border-slate-800/80">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="inline-flex items-center justify-center min-w-[30px] h-7 px-2 rounded-xl text-xs font-black bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 shadow-2xs">
                  #${itemNumber}
                </span>
                
                <!-- Unit & Gender Badge -->
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black border ${uStyle.bg} ${uStyle.text} ${uStyle.border} shadow-2xs">
                  <span class="w-1.5 h-1.5 rounded-full ${uStyle.dot}"></span>
                  <span>${s.unit} • ${escapeHtml(s.kelas || '')}</span>
                </span>

                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700">
                  ${escapeHtml(s.gender || 'Santri')}
                </span>
              </div>

              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-black bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  <i data-lucide="award" class="w-3.5 h-3.5 text-emerald-500"></i>
                  <span>Sekali Duduk</span>
                </span>
                ${statusBadge}
              </div>
            </div>

            <!-- Student Profile & Hafalan Details -->
            <div class="space-y-2">
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h5 class="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" onclick="openTahfidzFromHumas('${s.id}')" title="Klik untuk langsung buka Generator Teks">
                  ${escapeHtml(s.nama)}
                </h5>
                <span class="text-xs font-black px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60">
                  ${escapeHtml(kategoriDisplay)} ${escapeHtml(juzDisplay)}
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                <div class="flex items-center gap-1.5">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Ayah (Bapak):</span>
                  <span class="font-bold text-slate-800 dark:text-slate-200">${escapeHtml(s.bapak || '-')}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="text-slate-500 dark:text-slate-400 font-medium">Ibu:</span>
                  <span class="font-bold text-slate-800 dark:text-slate-200">${escapeHtml(s.ibu || '-')}</span>
                </div>
              </div>

              <!-- Input Tanggal Fleksibel (Kapan Anak Siap & Selesai) -->
              <div class="mt-2 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-2 text-xs">
                  <span class="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <i data-lucide="calendar" class="w-3.5 h-3.5 text-emerald-500"></i>
                    <span>Tanggal Selesai:</span>
                  </span>
                  <input 
                    type="date" 
                    value="${s.tanggalTasmi || ''}" 
                    onchange="updateStudentTanggalTasmi('${s.id}', this.value)" 
                    class="text-xs px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold focus:outline-none focus:border-emerald-500 cursor-pointer shadow-2xs"
                    title="Ubah tanggal kapan ananda selesai ujian tasmi' sekali duduk"
                  />
                  <span class="text-[10px] text-slate-400 italic hidden sm:inline">(Fleksibel / sesuai siapnya ananda)</span>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              <!-- Status Switcher -->
              <div class="flex items-center gap-1 text-xs">
                <span class="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 mr-1">Pamflet:</span>
                <button type="button" onclick="updateStudentPamfletStatus('${s.id}', 'pending')" class="px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${sp === 'pending' || sp === 'belum' ? 'bg-amber-500 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-amber-50 hover:text-amber-800 dark:hover:bg-amber-950/60'}">Belum</button>
                <button type="button" onclick="updateStudentPamfletStatus('${s.id}', 'proses')" class="px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${sp === 'proses' ? 'bg-teal-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-teal-50 hover:text-teal-800 dark:hover:bg-teal-950/60'}">Proses</button>
                <button type="button" onclick="updateStudentPamfletStatus('${s.id}', 'selesai')" class="px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${sp === 'selesai' || sp === 'siap' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-emerald-950/60'}">Publish</button>
              </div>

              <!-- Action Button: Open Tahfidz Generator directly -->
              <div class="flex items-center gap-1.5 ml-auto">
                <button type="button" onclick="openTahfidzFromHumas('${s.id}')" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-[11px] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
                  <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                  <span>Buat Caption AI & Flyer</span>
                </button>
                <button type="button" onclick="copySantriTasmiQuickText('${s.id}')" class="p-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs" title="Salin Data Ananda">
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }

    // --- HELPER UNTUK ACTIONS SANTRI TASMI' DI MODAL HUMAS ---
    function updateStudentPamfletStatus(studentId, newStatus) {
      let master = getTahfidzMasterStudents();
      const idx = master.findIndex(s => s.id === studentId);
      if (idx !== -1) {
        master[idx].statusPamflet = newStatus;
        try {
          localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(master));
          if (typeof syncTahfidzToSupabase === 'function') syncTahfidzToSupabase(false);
        } catch (e) {
          console.warn('Gagal simpan status santri tasmi:', e);
        }
        renderHumasMetrics();
        renderMetricDetailContent();
        if (typeof updateTahfidzPamfletBadgeCount === 'function') updateTahfidzPamfletBadgeCount();
        renderTahfidzMasterTable();
        const nama = master[idx].nama;
        const label = newStatus === 'selesai' ? 'Sudah Publish' : (newStatus === 'proses' ? 'Sedang Desain' : 'Butuh Pamflet');
        showToast('Status Pamflet Disimpan', `Ananda ${nama} diperbarui menjadi: ${label}`);
      }
    }

    function updateStudentTanggalTasmi(studentId, newDate) {
      let master = getTahfidzMasterStudents();
      const idx = master.findIndex(s => s.id === studentId);
      if (idx !== -1) {
        master[idx].tanggalTasmi = newDate;
        try {
          localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(master));
          if (typeof syncTahfidzToSupabase === 'function') syncTahfidzToSupabase(false);
        } catch (e) {
          console.warn('Gagal simpan tanggal santri tasmi:', e);
        }
        renderHumasMetrics();
        showToast('Tanggal Disimpan', `Tanggal selesai ujian ananda ${master[idx].nama} berhasil dicatat.`);
      }
    }

    function openTahfidzFromHumas(studentId) {
      closeHumasMetricDetailModal();
      if (typeof switchTab === 'function') switchTab('tahfidz');
      if (typeof switchTahfidzSubView === 'function') switchTahfidzSubView('generator');
      if (typeof selectTahfidzStudent === 'function') selectTahfidzStudent(studentId);
      showToast('Generator Siap ✨', 'Profil santri tasmi siap dibuatkan materi ucapan & syahadah.');
    }

    function copySantriTasmiQuickText(studentId) {
      const master = getTahfidzMasterStudents();
      const s = master.find(st => st.id === studentId);
      if (!s) return;
      const text = `*YTPAI Raudlatul Muta'allimin Lamongan*\n\n🌟 *Ujian Tasmi' Bil Ghoib Sekali Duduk*\n👤 Nama: ${s.nama}\n🏫 Unit: ${s.unit} (${s.kelas || '-'})\n📖 Hafalan: ${s.defaultKategori || '-'} (Juz ${s.defaultJuz || '-'})\n👨‍👩‍👦 Orang Tua: Bpk. ${s.bapak || '-'} & Ibu ${s.ibu || '-'}\n📅 Selesai: ${s.tanggalTasmi || 'Sesuai kesiapan'}\n\n_Barakallahu fiik, semoga istiqomah menjaga hafalan Al-Qur'an._`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('Tersalin!', 'Data santri berhasil disalin ke clipboard.');
        });
      }
      triggerHaptic(5);
    }

    function promptAddNewTasmiStudent() {
      closeHumasMetricDetailModal();
      if (typeof switchTab === 'function') switchTab('tahfidz');
      if (typeof switchTahfidzSubView === 'function') switchTahfidzSubView('generator');
      if (typeof resetTahfidzForm === 'function') resetTahfidzForm();
      showToast('Catat Santri Baru 📝', 'Silakan masukkan nama, unit, dan kategori juz ananda yang baru selesai tasmi sekali duduk.');
    }

    window.renderMetricDetailTasmiSantriContent = renderMetricDetailTasmiSantriContent;
    window.updateStudentPamfletStatus = updateStudentPamfletStatus;
    window.updateStudentTanggalTasmi = updateStudentTanggalTasmi;
    window.openTahfidzFromHumas = openTahfidzFromHumas;
    window.copySantriTasmiQuickText = copySantriTasmiQuickText;
    window.promptAddNewTasmiStudent = promptAddNewTasmiStudent;

    function openProgramFromMetricModal(progId) {
      closeHumasMetricDetailModal();
      openModalEditProgram(progId);
    }

    function openCaptionFromMetricModal(progId) {
      closeHumasMetricDetailModal();
      if (typeof switchTab === 'function') {
        switchTab('humas');
      }
      setTimeout(() => {
        loadProgramIntoCaptionStudio(progId, true);
      }, 100);
    }

    function metricModalQuickStatus(progId, newStatus) {
      quickToggleHumasPamfletStatus(progId, newStatus);
      renderMetricDetailContent();
      safeCreateIcons();
    }

    function copyAgendaQuickText(progId) {
      const item = humasState.programs.find(p => p.id === progId);
      if (!item) return;
      const text = `*YTPAI Raudlatul Muta'allimin Lamongan*\n\n📌 *${item.uraian}*\n📅 Tanggal: ${item.tgl ? item.tgl + ' ' : ''}${item.bulan || ''} ${item.tahun || '2026'}\n👤 PJ: ${item.pj || '-'}\n🎯 Sasaran: ${item.sasaran || '-'}${item.catatan ? '\n📝 Catatan: ' + item.catatan : ''}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          if (typeof showToast === 'function') {
            showToast('Tersalin!', 'Info agenda berhasil disalin ke clipboard.');
          }
        });
      }
      triggerHaptic(5);
    }

    function applyFilterToHumasTableFromModal() {
      const type = currentMetricDetailType;
      const scope = currentMetricDetailScope;
      closeHumasMetricDetailModal();
      if (scope === 'tasmi') {
        if (typeof switchTab === 'function') switchTab('tahfidz');
        if (typeof switchTahfidzSubView === 'function') switchTahfidzSubView('rekap');
        return;
      }
      if (typeof switchTab === 'function') {
        switchTab('humas');
      }
      filterHumasTable('status', type);
      setTimeout(() => {
        const tableEl = document.getElementById('humasTableWrapper') || document.getElementById('humasTableBody');
        const cont = document.getElementById('mainContentContainer');
        if (tableEl && cont) cont.scrollTo({ top: Math.max(0, tableEl.offsetTop - 80), behavior: 'smooth' });
      }, 150);
    }

    function saveProgramFromEditModal() {
      const progId = document.getElementById('modalEditProgId').value;
      const item = humasState.programs.find(p => p.id === progId);
      if (!item) return;

      const uraian = document.getElementById('modalEditUraian').value.trim();
      const tgl = document.getElementById('modalEditTgl').value.trim();
      const bulan = document.getElementById('modalEditBulan').value;
      const tahun = document.getElementById('modalEditTahun').value.trim() || '2026';
      const pj = document.getElementById('modalEditPj').value.trim();
      const sasaran = document.getElementById('modalEditSasaran').value.trim();
      const catatan = document.getElementById('modalEditCatatan').value.trim();

      if (!uraian || !tgl) {
        alert('Mohon lengkapi Uraian Acara dan Tanggal.');
        return;
      }

      // Ambil status terpilih
      let selectedStatus = 'belum';
      const radios = document.getElementsByName('modalEditStatus');
      for (let r of radios) {
        if (r.checked) {
          selectedStatus = r.value;
          break;
        }
      }

      // Ambil kanal terpilih
      const kanals = [];
      if (document.getElementById('modalEditKanalIg')?.checked) kanals.push('IG');
      if (document.getElementById('modalEditKanalFb')?.checked) kanals.push('FB');
      if (document.getElementById('modalEditKanalWa')?.checked) kanals.push('WA');
      if (document.getElementById('modalEditKanalTt')?.checked) kanals.push('TT');

      // Hitung tanggal mulai
      const monthMap = {
        'Juni': '06', 'Juli': '07', 'Agustus': '08', 'September': '09',
        'Oktober': '10', 'November': '11', 'Desember': '12',
        'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04', 'Mei': '05'
      };
      const mStr = monthMap[bulan] || '09';
      const firstDay = tgl.split('-')[0].replace(/\D/g, '').padStart(2, '0') || '01';
      const startDate = `${tahun}-${mStr}-${firstDay}`;

      // Simpan perubahan ke objek
      item.uraian = uraian;
      item.tgl = tgl;
      item.bulan = bulan;
      item.tahun = tahun;
      item.startDate = startDate;
      item.endDate = startDate;
      item.pj = pj;
      item.sasaran = sasaran;
      item.statusPamflet = selectedStatus;
      item.kanal = kanals.join(',');
      item.catatan = catatan;
      item.keterangan = catatan;

      saveHumasProgramsLocal();
      closeModalEditProgram();

      renderHumasMetrics();
      renderHumasH7RadarCards();
      renderHumasTable();

      if (typeof showToast === 'function') {
        showToast('Agenda Diperbarui', `Perubahan agenda "${uraian.slice(0, 32)}..." berhasil disimpan.`);
      }
      triggerHaptic(10);
    }

    function loadProgramFromModalToCaption() {
      const progId = document.getElementById('modalEditProgId').value;
      closeModalEditProgram();
      loadProgramIntoCaptionStudio(progId, true);
    }

    // Modal Add Custom Program
    function openModalAddProgram() {
      const modal = document.getElementById('modalHumasAddProgram');
      if (modal) {
        if (modal.parentElement !== document.body) {
          document.body.appendChild(modal);
        }
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
      triggerHaptic(5);
      safeCreateIcons();
    }

    function closeModalAddProgram() {
      const modal = document.getElementById('modalHumasAddProgram');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    function saveNewProgramFromModal() {
      const uraian = document.getElementById('modalProgUraian')?.value.trim();
      const tgl = document.getElementById('modalProgTgl')?.value.trim();
      const bulan = document.getElementById('modalProgBulan')?.value || 'September';
      const pj = document.getElementById('modalProgPj')?.value.trim() || 'Humas YTPAI';
      const sasaran = document.getElementById('modalProgSasaran')?.value.trim() || 'Seluruh Warga YTPAI RML';

      if (!uraian || !tgl) {
        alert('Mohon isi uraian kegiatan dan tanggal.');
        return;
      }

      // Format start date
      const monthMap = {
        'Juni': '06', 'Juli': '07', 'Agustus': '08', 'September': '09',
        'Oktober': '10', 'November': '11', 'Desember': '12',
        'Januari': '01', 'Februari': '02', 'Maret': '03', 'April': '04', 'Mei': '05'
      };
      const year = (bulan === 'Januari' || bulan === 'Februari' || bulan === 'Maret' || bulan === 'April' || bulan === 'Mei') ? '2027' : '2026';
      const mStr = monthMap[bulan] || '09';
      const firstDay = tgl.split('-')[0].replace(/\D/g, '').padStart(2, '0') || '01';
      const startDate = `${year}-${mStr}-${firstDay}`;

      const newId = 'prog-' + (humasState.programs.length + 1);
      const newProgram = {
        id: newId,
        no: humasState.programs.length + 1,
        tgl: tgl,
        startDate: startDate,
        endDate: startDate,
        bulan: bulan,
        tahun: year,
        uraian: uraian,
        pj: pj,
        sasaran: sasaran,
        statusPamflet: 'belum',
        statusPost: 'draft',
        kanal: 'IG,FB,WA'
      };

      humasState.programs.push(newProgram);
      saveHumasProgramsLocal();
      closeModalAddProgram();

      // Clear input fields
      document.getElementById('modalProgUraian').value = '';
      document.getElementById('modalProgTgl').value = '';

      renderHumasMetrics();
      renderHumasH7RadarCards();
      renderHumasTable();

      if (typeof showToast === 'function') {
        showToast('Agenda Ditambahkan!', `Kegiatan "${uraian}" telah disimpan ke kalender.`);
      }
      triggerHaptic(15);
    }

    // Google Sheets Cloud Sync
    function saveHumasToCloud() {
      const btn = document.getElementById('btnHumasSaveCloud');
      const origText = btn ? btn.innerHTML : '';
      if (btn) {
        btn.innerHTML = `<i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i><span>Menyimpan...</span>`;
      }

      saveHumasProgramsLocal();

      if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
          .withSuccessHandler(res => {
            if (btn) btn.innerHTML = origText;
            if (res && res.success) {
              if (typeof showToast === 'function') {
                showToast('Tersimpan di Cloud!', `Berhasil menyinkronkan ${res.count} kegiatan ke sheet "Kalender_Humas_Sosmed".`);
              } else {
                alert(`Data berhasil disimpan ke sheet Kalender_Humas_Sosmed!`);
              }
            } else {
              if (typeof showToast === 'function') {
                showToast('Catatan Cloud', res.message || 'Data telah tersimpan di memori perangkat.');
              }
            }
            safeCreateIcons();
          })
          .withFailureHandler(err => {
            if (btn) btn.innerHTML = origText;
            if (typeof showToast === 'function') {
              showToast('Tersimpan di Perangkat', 'Data disimpan di penyimpanan lokal perangkat.');
            }
            safeCreateIcons();
          })
          .saveHumasPlannerToSheet(humasState.programs);
      } else {
        setTimeout(() => {
          if (btn) btn.innerHTML = origText;
          if (typeof showToast === 'function') {
            showToast('Tersimpan di Perangkat', 'Data tersimpan di penyimpanan perangkat ini (offline-first).');
          }
          safeCreateIcons();
        }, 400);
      }
    }

    function syncHumasFromCloud() {
      const btn = document.getElementById('btnHumasSyncCloud');
      const origText = btn ? btn.innerHTML : '';
      if (btn) {
        btn.innerHTML = `<i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i><span>Menarik...</span>`;
      }

      if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
          .withSuccessHandler(res => {
            if (btn) btn.innerHTML = origText;
            if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
              humasState.programs = res.data;
              saveHumasProgramsLocal();
              renderHumasMetrics();
              renderHumasH7RadarCards();
              renderHumasTable();
              if (typeof showToast === 'function') {
                showToast('Sinkronisasi Selesai', `Memuat ${res.count} kegiatan dari sheet "Kalender_Humas_Sosmed".`);
              }
            } else {
              if (typeof showToast === 'function') {
                showToast('Info Cloud', 'Sheet Kalender_Humas_Sosmed kosong, menggunakan data master lokal.');
              }
            }
            safeCreateIcons();
          })
          .withFailureHandler(err => {
            if (btn) btn.innerHTML = origText;
            if (typeof showToast === 'function') {
              showToast('Mode Offline', 'Menggunakan jadwal kegiatan dari penyimpanan lokal.');
            }
            safeCreateIcons();
          })
          .getHumasPlannerFromSheet();
      } else {
        setTimeout(() => {
          if (btn) btn.innerHTML = origText;
          loadHumasPrograms();
          renderHumasMetrics();
          renderHumasH7RadarCards();
          renderHumasTable();
          if (typeof showToast === 'function') {
            showToast('Data Dimuat', 'Memuat data kalender tahunan dari penyimpanan lokal.');
          }
          safeCreateIcons();
        }, 350);
      }
    }

    function exportHumasToCsv() {
      if (!humasState.programs || humasState.programs.length === 0) {
        alert('Tidak ada data program kegiatan untuk diekspor.');
        return;
      }

      let csv = 'No,Tanggal,Bulan,Tahun,Uraian Acara,Penanggung Jawab,Sasaran,Status Pamflet,Kanal Tayang\n';
      humasState.programs.forEach((p, idx) => {
        const row = [
          p.no || (idx + 1),
          `"${(p.tgl || '').replace(/"/g, '""')}"`,
          `"${(p.bulan || '').replace(/"/g, '""')}"`,
          `"${(p.tahun || '2026').replace(/"/g, '""')}"`,
          `"${(p.uraian || '').replace(/"/g, '""')}"`,
          `"${(p.pj || '').replace(/"/g, '""')}"`,
          `"${(p.sasaran || '').replace(/"/g, '""')}"`,
          `"${(p.statusPamflet || 'belum').replace(/"/g, '""')}"`,
          `"${(p.kanal || '').replace(/"/g, '""')}"`
        ];
        csv += row.join(',') + '\n';
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Kalender_Program_Tahunan_YTPAI_${humasState.refDate}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (typeof showToast === 'function') {
        showToast('Ekspor Selesai', 'File CSV jadwal program kerja telah diunduh.');
      }
    }


        // ==========================================================================
    // HUMAS BULK IMPORT & SUPABASE VERCEL ENGINE
    // ==========================================================================

    let humasParsedImportData = [];
    let humasImportActiveTab = 'paste'; // 'paste' or 'file'

    function openModalHumasBulkImport() {
      const modal = document.getElementById('modalHumasBulkImport');
      if (modal) modal.classList.remove('hidden');
      switchHumasImportTab('paste');
      humasParsedImportData = [];
      updateHumasBulkPreview();
      triggerHaptic(5);
    }

    function closeModalHumasBulkImport() {
      const modal = document.getElementById('modalHumasBulkImport');
      if (modal) modal.classList.add('hidden');
    }

    function switchHumasImportTab(tab) {
      humasImportActiveTab = tab;
      const tabPasteBtn = document.getElementById('btnTabHumasImportPaste');
      const tabFileBtn = document.getElementById('btnTabHumasImportFile');
      const panePaste = document.getElementById('paneHumasImportPaste');
      const paneFile = document.getElementById('paneHumasImportFile');

      if (tab === 'paste') {
        if (tabPasteBtn) tabPasteBtn.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs transition-all';
        if (tabFileBtn) tabFileBtn.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-all';
        if (panePaste) panePaste.classList.remove('hidden');
        if (paneFile) paneFile.classList.add('hidden');
      } else {
        if (tabFileBtn) tabFileBtn.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs transition-all';
        if (tabPasteBtn) tabPasteBtn.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-all';
        if (paneFile) paneFile.classList.remove('hidden');
        if (panePaste) panePaste.classList.add('hidden');
      }
    }

    function onHumasPasteInputChange() {
      const raw = document.getElementById('humasBulkPasteInput')?.value || '';
      humasParsedImportData = parseSpreadsheetToHumasPrograms(raw);
      updateHumasBulkPreview();
    }

    function parseSpreadsheetToHumasPrograms(rawText) {
      if (!rawText || !rawText.trim()) return [];

      const lines = rawText.trim().split(/\r?\n/);
      const results = [];

      // Kamus Bulan Lengkap & Singkatan Indonesia/Inggris
      const monthMap = {
        'jan': '01', 'januari': '01', 'january': '01',
        'feb': '02', 'februari': '02', 'february': '02',
        'mar': '03', 'maret': '03', 'march': '03',
        'apr': '04', 'april': '04',
        'mei': '05', 'may': '05',
        'jun': '06', 'juni': '06', 'june': '06',
        'jul': '07', 'juli': '07', 'july': '07',
        'agu': '08', 'agt': '08', 'agustus': '08', 'aug': '08', 'august': '08',
        'sep': '09', 'sept': '09', 'september': '09',
        'okt': '10', 'oktober': '10', 'oct': '10', 'october': '10',
        'nov': '11', 'november': '11',
        'des': '12', 'desember': '12', 'dec': '12', 'december': '12'
      };

      const monthNamesIndo = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];

      function resolveMonthNum(str) {
        if (!str) return null;
        const clean = str.toLowerCase().replace(/[^a-z]/g, '');
        if (monthMap[clean]) return monthMap[clean];
        for (const k in monthMap) {
          if (clean.startsWith(k) || k.startsWith(clean)) return monthMap[k];
        }
        return null;
      }

      // Stateful Memory untuk Menangani Sel Excel yang Di-Merge Vertikal
      let lastSeenMonth = 'Juli';
      let lastSeenYear = '2026';
      let lastMonthNum = 7;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Mendeteksi delimiter (Tab atau Titik Koma atau Koma)
        let cols = [];
        if (line.includes('\t')) {
          cols = line.split('\t').map(c => c.trim().replace(/^["']|["']$/g, ''));
        } else if (line.includes(';')) {
          cols = line.split(';').map(c => c.trim().replace(/^["']|["']$/g, ''));
        } else if (line.includes(',')) {
          // Tangani CSV dengan quotes
          cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.trim().replace(/^["']|["']$/g, ''));
        } else {
          cols = [line];
        }

        // Abaikan baris header atau judul banner
        const lineJoined = cols.join(' ').toLowerCase();
        if (lineJoined.includes('program kegiatan') || lineJoined.includes('raudlatul muta') || 
            (lineJoined.includes('uraian') && lineJoined.includes('penanggung jawab'))) {
          continue;
        }

        // Abaikan catatan kaki / footnote / keterangan kesepakatan / pengesahan di bawah tabel (Baris 256+)
        if (lineJoined.includes('telah disepakati') ||
            lineJoined.includes('rapat kerja (raker)') ||
            lineJoined.includes('struktur kepanitiaan') ||
            lineJoined.includes('kewenangan penuh kepada pengurus') ||
            lineJoined.includes('mengesahkan ketua yayasan') ||
            lineJoined.includes('dewan pembina') ||
            (cols.length <= 3 && lineJoined.includes('ketua yayasan'))) {
          continue;
        }

        const c0Lower = (cols[0] || '').toLowerCase();
        const c1Lower = (cols[1] || '').toLowerCase();
        if ((c0Lower === 'no' || c0Lower === 'nomor') && (c1Lower.includes('tgl') || c1Lower.includes('tanggal') || c1Lower.includes('hari'))) {
          continue;
        }

        // Mapping Kolom Berdasarkan Struktur Tabel
        // Skenario 1 (Format 7 Kolom Sesuai Excel YTPAI):
        // [0] NO, [1] TGL, [2] BULAN, [3] TH, [4] URAIAN, [5] PENANGGUNG JAWAB, [6] SASARAN
        let no = results.length + 1;
        let tglRaw = '';
        let bulanRaw = '';
        let tahunRaw = '';
        let uraian = '';
        let pj = 'Humas YTPAI';
        let sasaran = 'Warga Pesantren & Madrasah';
        let statusPamflet = 'belum';
        let kanal = 'IG,FB,WA';

        if (cols.length >= 6) {
          // Kolom 0 = NO
          const parsedNo = parseInt(cols[0]);
          if (!isNaN(parsedNo)) no = parsedNo;
          tglRaw = cols[1] || '';
          bulanRaw = cols[2] || '';
          tahunRaw = cols[3] || '';
          uraian = cols[4] || '';
          pj = cols[5] || pj;
          sasaran = cols[6] || sasaran;
          if (cols[7]) statusPamflet = cols[7];
          if (cols[8]) kanal = cols[8];
        } else if (cols.length >= 4) {
          // Format ringkas: [0] Tgl, [1] Bulan/Uraian...
          tglRaw = cols[0] || '';
          uraian = cols[1] || '';
          pj = cols[2] || pj;
          sasaran = cols[3] || sasaran;
        } else if (cols.length >= 2) {
          tglRaw = cols[0] || '';
          uraian = cols[1] || '';
        } else if (cols.length === 1 && cols[0]) {
          uraian = cols[0];
          tglRaw = '1';
        }

        if (!uraian || uraian.length < 2) continue;

        // --- AI LOGIKA 1: PENYESUAIAN MERGED CELLS BULAN & TAHUN ---
        // Jika kolom Bulan kosong (karena merged vertikal di Excel), warisi dari baris sebelumnya
        if (bulanRaw && bulanRaw.trim()) {
          lastSeenMonth = bulanRaw.trim();
        } else {
          bulanRaw = lastSeenMonth;
        }

        // --- ATURAN WARNA & TAHUN AJARAN YTPAI:
        // Warna Merah = Semester Ganjil (Bulan 7 s.d 12: Juli - Desember) => Tahun 2026
        // Warna Hijau = Semester Genap  (Bulan 1 s.d 6:  Januari - Juni)   => Tahun 2027
        const thClean = (tahunRaw || '').trim().toLowerCase();
        if (/\b2026\b/.test(thClean) || thClean.includes('merah') || thClean.includes('red')) {
          lastSeenYear = '2026';
        } else if (/\b2027\b/.test(thClean) || thClean.includes('hijau') || thClean.includes('green')) {
          lastSeenYear = '2027';
        } else if (/^\d{4}$/.test(thClean)) {
          lastSeenYear = thClean;
        } else {
          // Jika kolom tahun di-merge / kosong, deteksi otomatis dari semester/bulan
          const bNumStr = resolveMonthNum(bulanRaw);
          if (bNumStr) {
            const bNum = parseInt(bNumStr);
            if (bNum >= 7 && bNum <= 12) {
              lastSeenYear = '2026';
            } else if (bNum >= 1 && bNum <= 6) {
              lastSeenYear = '2027';
            }
          }
        }
        let displayTahun = lastSeenYear;

        // --- AI LOGIKA 2: DETEKSI & ADAPTASI ACARA LINTAS BULAN (CROSS-MONTH SPAN) ---
        // Contoh kasus:
        // A) TGL: "28-15", BULAN: "Nov-Des"  -> Mulai: 28 Nov 2026, Selesai: 15 Des 2026
        // B) TGL: "30-14", BULAN: "Nov-Des"  -> Mulai: 30 Nov 2026, Selesai: 14 Des 2026
        // C) TGL: "28-5",  BULAN: "Des-Jan"  -> Mulai: 28 Des 2026, Selesai: 5 Jan 2027 (Roll-over tahun!)
        // D) TGL: "17-13", BULAN: "April"    -> Mulai: 17 April 2027, Selesai: 13 Mei 2027 (Lintas bulan berikutnya!)
        // E) TGL: "22 - 30", BULAN: "Maret"  -> Mulai: 22 Maret 2027, Selesai: 30 Maret 2027
        // F) TGL: "Kondisional" / "Tentatif" -> Acara fleksibel
        let startDate = '';
        let endDate = '';
        let displayTgl = tglRaw.trim();
        let displayBulan = bulanRaw.trim();
        let isKondisional = false;

        const tglClean = tglRaw.trim().toLowerCase();
        if (tglClean.includes('kondisi') || tglClean.includes('tentatif') || tglClean.includes('fleksibel') || isNaN(parseInt(tglClean))) {
          // Tangani Kasus Tanggal Kondisional
          isKondisional = true;
          displayTgl = tglRaw.trim() || 'Kondisional';
          const mNumStr = resolveMonthNum(bulanRaw) || '08';
          // Fallback tanggal tengah bulan untuk penempatan kalender
          startDate = `${displayTahun}-${mNumStr}-15`;
          endDate = `${displayTahun}-${mNumStr}-20`;
        } else {
          // Deteksi apakah Bulan mengandung dua bulan (e.g. "Nov-Des", "November - Desember", "Des/Jan")
          const monthSplit = bulanRaw.split(/[-–/]/).map(s => s.trim()).filter(Boolean);
          // Deteksi apakah Tanggal mengandung rentang (e.g. "28-15", "13-19", "22 - 30", "17-13")
          const dayMatch = tglRaw.match(/(\d+)\s*[-–]\s*(\d+)/);

          if (monthSplit.length >= 2 && dayMatch) {
            // KASUS UTAMA: LINTAS BULAN DENGAN DUA BULAN & DUA TANGGAL (misal 28-15 Nov-Des)
            const dStart = parseInt(dayMatch[1]);
            const dEnd = parseInt(dayMatch[2]);
            const m1Str = resolveMonthNum(monthSplit[0]) || '11';
            const m2Str = resolveMonthNum(monthSplit[1]) || '12';

            const m1Num = parseInt(m1Str);
            const m2Num = parseInt(m2Str);

            let yStart = parseInt(displayTahun);
            let yEnd = yStart;
            // Jika transisi dari Desember (12) ke Januari (01), tahun bertambah 1
            if (m2Num < m1Num) {
              yEnd = yStart + 1;
            }

            startDate = `${yStart}-${m1Str}-${String(dStart).padStart(2, '0')}`;
            endDate = `${yEnd}-${m2Str}-${String(dEnd).padStart(2, '0')}`;
            displayTgl = `${dStart}-${dEnd}`;
            displayBulan = bulanRaw;
          } else if (dayMatch) {
            // Rentang tanggal dalam satu bulan yang sama atau rollover ke bulan berikutnya (misal 13-19 Juli, 17-13 April)
            const dStart = parseInt(dayMatch[1]);
            const dEnd = parseInt(dayMatch[2]);
            const mStr = resolveMonthNum(bulanRaw) || '07';
            const mNum = parseInt(mStr);
            const y = parseInt(displayTahun);

            // Jika dStart > dEnd (misal 28-5 atau 17-13) tapi bulannya hanya tertulis satu (misal "April" atau "November")
            if (dStart > dEnd) {
              // AI cerdas mendeteksi otomatis rollover ke bulan berikutnya!
              const nextMNum = mNum === 12 ? 1 : mNum + 1;
              const nextMStr = String(nextMNum).padStart(2, '0');
              const yEnd = mNum === 12 ? y + 1 : y;
              startDate = `${y}-${mStr}-${String(dStart).padStart(2, '0')}`;
              endDate = `${yEnd}-${nextMStr}-${String(dEnd).padStart(2, '0')}`;
              displayBulan = `${bulanRaw}-${monthNamesIndo[nextMNum - 1]}`;
            } else {
              startDate = `${y}-${mStr}-${String(dStart).padStart(2, '0')}`;
              endDate = `${y}-${mStr}-${String(dEnd).padStart(2, '0')}`;
            }
          } else {
            // Tanggal tunggal (misal "27", "4", "11", "29")
            const dMatch = tglRaw.match(/\d+/);
            const dSingle = dMatch ? parseInt(dMatch[0]) : 1;
            const mStr = resolveMonthNum(bulanRaw) || '07';
            const y = parseInt(displayTahun);

            startDate = `${y}-${mStr}-${String(dSingle).padStart(2, '0')}`;
            endDate = startDate;
          }
        }

        // Simpan lastMonthNum untuk referensi baris berikutnya
        const currentMNum = resolveMonthNum(bulanRaw);
        if (currentMNum) lastMonthNum = parseInt(currentMNum);

        // Normalisasi Status Pamflet
        let sp = 'belum';
        const stLower = (statusPamflet || '').toLowerCase();
        if (stLower.includes('tayang') || stLower.includes('selesai') || stLower.includes('done') || stLower.includes('publish')) {
          sp = 'selesai';
        } else if (stLower.includes('siap') || stLower.includes('ready')) {
          sp = 'siap';
        } else if (stLower.includes('proses') || stLower.includes('desain') || stLower.includes('draft')) {
          sp = 'proses';
        }

        // Deteksi Kategori Khusus (Tasmi' / Tahfidz / Umum)
        const isTasmi = uraian.toLowerCase().includes('tasmi') || uraian.toLowerCase().includes('tahfidz');

        results.push({
          id: 'prog-import-' + Date.now() + '-' + i,
          no: no,
          tgl: displayTgl,
          startDate: startDate,
          endDate: endDate,
          bulan: displayBulan,
          tahun: displayTahun,
          uraian: uraian,
          pj: pj || 'Humas YTPAI',
          sasaran: sasaran || 'Warga Pesantren & Madrasah',
          statusPamflet: sp,
          statusPost: sp === 'selesai' ? 'published' : 'draft',
          kanal: kanal || 'IG,FB,WA',
          kategori: isTasmi ? 'tasmi' : 'umum',
          isKondisional: isKondisional
        });
      }

      return results;
    }

    function handleHumasExcelFile(e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const data = new Uint8Array(evt.target.result);
          if (typeof XLSX === 'undefined') {
            alert('Library Excel (SheetJS) belum dimuat. Silakan gunakan tab Tempel Teks.');
            return;
          }
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Konversi worksheet ke array of rows dengan preserve cell values
          const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '', raw: false });
          
          // Unpack merged cells di Excel agar setiap baris di bawah sel ter-merge memiliki nilai yang sama persis
          if (worksheet && worksheet['!merges']) {
            worksheet['!merges'].forEach(range => {
              const val = (rawRows[range.s.r] && rawRows[range.s.r][range.s.c] !== undefined) ? rawRows[range.s.r][range.s.c] : '';
              if (val !== undefined && val !== '') {
                for (let r = range.s.r; r <= range.e.r; r++) {
                  if (!rawRows[r]) rawRows[r] = [];
                  for (let c = range.s.c; c <= range.e.c; c++) {
                    if (rawRows[r][c] === '' || rawRows[r][c] === undefined) {
                      rawRows[r][c] = val;
                    }
                  }
                }
              }
            });
          }

          // Ubah array of rows menjadi teks TSV (Tab Separated Values) untuk diproses oleh parser cerdas
          const tsvText = rawRows
            .filter(r => r && r.length > 0 && r.some(cell => String(cell).trim() !== ''))
            .map(r => r.map(c => String(c).replace(/[\t\r\n]/g, ' ').trim()).join('\t'))
            .join('\n');

          humasParsedImportData = parseSpreadsheetToHumasPrograms(tsvText);
          updateHumasBulkPreview();
          if (typeof showToast === 'function') {
            showToast('Berkas Excel Terbaca', `AI berhasil menyesuaikan ${humasParsedImportData.length} agenda kegiatan, termasuk penyesuaian Tahun 2026 (Merah) & 2027 (Hijau).`);
          }
        } catch (err) {
          console.error(err);
          alert('Gagal membaca file Excel: ' + err.message);
        }
      };
      reader.readAsArrayBuffer(file);
    }

    function updateHumasBulkPreview() {
      const badge = document.getElementById('humasBulkCountBadge');
      const tbody = document.getElementById('humasBulkPreviewTbody');
      const empty = document.getElementById('humasBulkPreviewEmpty');
      const tableWrapper = document.getElementById('humasBulkPreviewTableWrapper');
      const submitBtn = document.getElementById('btnSubmitHumasBulk');

      const count = humasParsedImportData.length;
      if (badge) badge.textContent = `${count} Baris Siap Diimpor`;

      if (count === 0) {
        if (empty) empty.classList.remove('hidden');
        if (tableWrapper) tableWrapper.classList.add('hidden');
        if (submitBtn) submitBtn.disabled = true;
        return;
      }

      if (empty) empty.classList.add('hidden');
      if (tableWrapper) tableWrapper.classList.remove('hidden');
      if (submitBtn) submitBtn.disabled = false;

      if (tbody) {
        tbody.innerHTML = humasParsedImportData.slice(0, 60).map((row, idx) => {
          const is2026 = row.tahun === '2026';
          const badgeTahun = is2026 
            ? '<span class="px-1.5 py-0.5 rounded text-[9px] font-black bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 ml-1">2026 (Merah)</span>'
            : '<span class="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 ml-1">2027 (Hijau)</span>';
          
          const badgeTasmi = row.kategori === 'tasmi'
            ? '<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 ml-1">Tasmi\'</span>'
            : '';

          return `
          <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[11px]">
            <td class="py-1.5 px-2 text-center text-slate-400 font-bold">${idx + 1}</td>
            <td class="py-1.5 px-2 font-bold whitespace-nowrap text-slate-800 dark:text-slate-200">
              ${escapeHtml(row.tgl)} ${escapeHtml(row.bulan)} ${badgeTahun}
            </td>
            <td class="py-1.5 px-3 font-semibold text-slate-900 dark:text-white line-clamp-1 max-w-[220px]" title="${escapeHtml(row.uraian)}">
              ${escapeHtml(row.uraian)} ${badgeTasmi}
            </td>
            <td class="py-1.5 px-2 text-slate-600 dark:text-slate-300 truncate max-w-[120px]">${escapeHtml(row.pj)}</td>
            <td class="py-1.5 px-2 text-center whitespace-nowrap">
              <span class="px-1.5 py-0.5 rounded text-[9px] font-bold ${row.statusPamflet === 'selesai' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'}">
                ${row.statusPamflet === 'selesai' ? 'Tayang' : 'Belum'}
              </span>
            </td>
          </tr>
        `;
        }).join('') + (count > 60 ? `<tr><td colspan="5" class="text-center py-2 text-slate-400 font-bold text-xs bg-slate-50 dark:bg-slate-900">... dan ${count - 60} agenda lainnya ...</td></tr>` : '');
      }
    }

    function executeHumasBulkImport() {
      if (!humasParsedImportData || humasParsedImportData.length === 0) {
        alert('Belum ada data agenda yang siap diimpor. Silakan tempel teks atau pilih file Excel terlebih dahulu.');
        return;
      }

      const modeOverwrite = document.getElementById('radioHumasModeOverwrite')?.checked;

      if (modeOverwrite) {
        humasState.programs = [...humasParsedImportData];
      } else {
        // Mode Append: perbarui nomor urut
        const existingCount = humasState.programs.length;
        const normalized = humasParsedImportData.map((item, idx) => ({
          ...item,
          no: existingCount + idx + 1,
          id: 'prog-' + (existingCount + idx + 1)
        }));
        humasState.programs = deduplicateHumasPrograms(humasState.programs.concat(normalized));
      }

      saveHumasProgramsLocal();
      renderHumasMetrics();
      renderHumasH7RadarCards();
      renderHumasTable();
      closeModalHumasBulkImport();

      // Trigger automatic cloud sync to Supabase if configured (bersihkan cloud jika mode overwrite)
      syncHumasToSupabase(false, !!modeOverwrite);

      if (typeof showToast === 'function') {
        showToast('Impor Massal Berhasil!', `Telah berhasil mengimpor ${humasParsedImportData.length} agenda kegiatan ke kalender tahunan.`);
      }
      triggerHaptic(20);
    }

    function fillHumasBulkPasteSample() {
      const sample = 
`NO	TGL	BULAN	TH	URAIAN	PENANGGUNG JAWAB	SASARAN
1	27	Juni	2026	Penetapan Tutor Sebaya Penyusunan Bahan Ajar	BPMP	Dewan Guru
2	28			Rapat Koordinasi LBB, LBA, LPBA, BPMP, Kepala Madin & Yayasan	Yayasan	Peserta Rapat
16	13-19	Juli		Tahsin Bacaan Al-Qur'an (Sore)	Lembaga Bimbingan Al-Qur'an (LBA)	Santri Baru
18	13-16			MPLS KB-TK	Guru KB & TK	Seluruh Murid KB-TK
55	Kondisional	Agustus		Karnaval Desa Datinawong	Humas (Mokamat Syafi'i, S.H.)	Seluruh Warga YTPAI RML
108	28-15	Nov-Des		Ngaji Bandongan	Struktural Madin	Seluruh Santri
109	30-14	Nov-Des		Sumatif Akhir Semester Ganjil (SAS Ganjil)	Struktural Unit	Seluruh Murid
113	10	Desember		Persiapan Pengerjaan RDM & E-raport	Operator Yayasan	Operator Unit
120	17			Tasmi' Perbulan Sesuai Target Beasiswa Tahfidz	LBA	Santri Program Tahfidz`;

      const input = document.getElementById('humasBulkPasteInput');
      if (input) {
        input.value = sample;
        onHumasPasteInputChange();
      }
    }

    function downloadHumasExcelTemplate() {
      const csv = 
`No,Tanggal,Bulan,Tahun,Uraian Acara,Penanggung Jawab,Sasaran,Status Pamflet,Kanal
1,15,September,2026,Seminar Literasi Digital Santri,Tim Humas,Seluruh Santri,belum,"IG,FB,WA"
2,22,Oktober,2026,Apel Akbar Hari Santri Nasional 2026,Panitia HSN,Warga Pesantren,siap,"IG,FB,WA,TT"
3,25,November,2026,Peringatan Hari Guru Nasional,Yayasan,Dewan Guru,belum,"IG,FB,WA"`;

      const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Template_Program_Tahunan_Humas_YTPAI.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    // ==========================================================================
    // SUPABASE & VERCEL CLOUD DATABASE SYNC ENGINE
    // ==========================================================================

    const DEFAULT_SUPABASE_CONFIG = {
      url: 'https://maziyyookpafeenuiirl.supabase.co',
      anonKey: 'sb_publishable_bC64CatZmPbb5t6G2RFLPg__fNccr9r'
    };

    function getSupabaseConfig() {
      try {
        const raw = localStorage.getItem('supabase_config_v1');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.url && parsed.anonKey) return parsed;
        }
      } catch (e) {}
      return DEFAULT_SUPABASE_CONFIG;
    }

    function openModalSupabaseConfig() {
      const modal = document.getElementById('modalSupabaseConfig');
      if (modal) modal.classList.remove('hidden');

      const cfg = getSupabaseConfig();
      const inputUrl = document.getElementById('supabaseInputUrl');
      const inputKey = document.getElementById('supabaseInputKey');
      if (inputUrl) inputUrl.value = cfg.url || '';
      if (inputKey) inputKey.value = cfg.anonKey || '';

      updateSupabaseConnectionStatusBadge();
      triggerHaptic(5);
    }

    function closeModalSupabaseConfig() {
      const modal = document.getElementById('modalSupabaseConfig');
      if (modal) modal.classList.add('hidden');
    }

    function saveSupabaseConfig() {
      const url = (document.getElementById('supabaseInputUrl')?.value || '').trim().replace(/\/$/, '');
      const anonKey = (document.getElementById('supabaseInputKey')?.value || '').trim();

      localStorage.setItem('supabase_config_v1', JSON.stringify({ url, anonKey }));
      updateSupabaseConnectionStatusBadge();

      if (url && anonKey) {
        // Uji koneksi dan sinkronisasi
        syncHumasToSupabase(true);
      } else {
        if (typeof showToast === 'function') {
          showToast('Kredensial Direset', 'Aplikasi kembali menggunakan penyimpanan lokal perangkat.');
        }
      }
    }

    function updateSupabaseConnectionStatusBadge() {
      const cfg = getSupabaseConfig();
      const statusPill = document.getElementById('supabaseStatusPill');
      const bentoStatus = document.getElementById('bentoSupabaseStatus');
      const bentoLabel = document.getElementById('bentoDbBackendLabel');

      const isConnected = !!(cfg.url && cfg.anonKey);
      if (statusPill) {
        statusPill.className = isConnected 
          ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 flex items-center gap-1.5'
          : 'px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5';
        statusPill.innerHTML = isConnected 
          ? '<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span>Terhubung ke Supabase</span>'
          : '<span class="w-2 h-2 rounded-full bg-slate-400"></span><span>Penyimpanan Lokal / GAS</span>';
      }

      if (bentoStatus) {
        bentoStatus.textContent = isConnected ? 'Supabase Online' : 'Penyimpanan Lokal';
        bentoStatus.className = isConnected 
          ? 'text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg'
          : 'text-xs font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded-lg';
      }
      if (bentoLabel) {
        bentoLabel.textContent = isConnected ? 'PostgreSQL Supabase' : 'LocalStorage / Sheets';
      }
    }

    async function syncHumasToSupabase(isManualTest = false, isOverwrite = false) {
      const cfg = getSupabaseConfig();
      if (!cfg.url || !cfg.anonKey) {
        if (isManualTest && typeof showToast === 'function') {
          showToast('Koneksi Supabase', 'Mohon lengkapi Project URL dan Anon Public Key Supabase Anda.');
        }
        return false;
      }

      try {
        // Jika mode timpa total, bersihkan data lama di cloud terlebih dahulu agar tidak tercampur data uji coba lama
        if (isOverwrite) {
          try {
            await fetch(`${cfg.url}/rest/v1/humas_programs?id=neq.__keep_nothing__`, {
              method: 'DELETE',
              headers: {
                'apikey': cfg.anonKey,
                'Authorization': `Bearer ${cfg.anonKey}`
              }
            });
          } catch (delErr) {
            console.warn('Hapus data lama di Supabase error:', delErr);
          }
        }
        const payload = humasState.programs.map(p => ({
          id: p.id,
          no: p.no,
          tgl: p.tgl,
          start_date: p.startDate,
          end_date: p.endDate,
          bulan: p.bulan,
          tahun: p.tahun,
          uraian: p.uraian,
          pj: p.pj,
          sasaran: p.sasaran,
          status_pamflet: p.statusPamflet,
          status_post: p.statusPost,
          kanal: p.kanal,
          updated_at: new Date().toISOString()
        }));

        // Upsert ke tabel humas_programs melalui Supabase PostgREST API
        const endpoint = `${cfg.url}/rest/v1/humas_programs?on_conflict=id`;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': cfg.anonKey,
            'Authorization': `Bearer ${cfg.anonKey}`,
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`HTTP ${res.status}: ${errText}`);
        }

        if (isManualTest) {
          if (typeof showToast === 'function') {
            showToast('✅ Supabase Terhubung!', `Berhasil mengunggah ${payload.length} agenda ke tabel humas_programs.`);
          }
          closeModalSupabaseConfig();
        }
        return true;
      } catch (err) {
        console.warn('Supabase sync error:', err);
        if (isManualTest) {
          alert('Gagal menyinkronkan ke Supabase: ' + err.message + '\n\nPastikan Anda telah menjalankan SQL Schema di SQL Editor Supabase.');
        }
        return false;
      }
    }

    async function syncTahfidzToSupabase(isManualTest = false) {
      const cfg = getSupabaseConfig();
      if (!cfg.url || !cfg.anonKey) return false;

      try {
        const students = typeof getTahfidzMasterStudents === 'function' ? getTahfidzMasterStudents() : [];
        if (!students || students.length === 0) return false;

        const payload = students.map(s => ({
          id: s.id,
          nama: s.nama,
          unit: s.unit || '',
          kelas: s.kelas || '',
          gender: s.gender || 'Putra',
          bapak: s.bapak || '',
          ibu: s.ibu || '',
          default_kategori: s.defaultKategori || s.kategori || '',
          default_juz: s.defaultJuz || s.juz || '',
          predikat: s.predikat || 'Jayyid',
          status_pamflet: s.statusPamflet || 'pending',
          tanggal_tasmi: s.tanggalTasmi || null,
          catatan: s.catatan || '',
          updated_at: new Date().toISOString()
        }));

        const endpoint = `${cfg.url}/rest/v1/tahfidz_students?on_conflict=id`;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': cfg.anonKey,
            'Authorization': `Bearer ${cfg.anonKey}`,
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errText = await res.text();
          console.warn('Tahfidz Supabase error response:', errText);
          return false;
        }

        if (isManualTest && typeof showToast === 'function') {
          showToast('✅ Santri Terunggah!', `Berhasil menyinkronkan ${payload.length} data santri ke Supabase.`);
        }
        return true;
      } catch (err) {
        console.warn('Tahfidz Supabase sync error:', err);
        return false;
      }
    }

    async function pullTahfidzFromSupabase() {
      const cfg = getSupabaseConfig();
      if (!cfg.url || !cfg.anonKey) return false;

      try {
        const endpoint = `${cfg.url}/rest/v1/tahfidz_students?select=*&order=nama.asc`;
        const res = await fetch(endpoint, {
          headers: {
            'apikey': cfg.anonKey,
            'Authorization': `Bearer ${cfg.anonKey}`
          }
        });

        if (!res.ok) return false;
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(item => ({
            id: item.id,
            nama: item.nama,
            unit: item.unit || '',
            kelas: item.kelas || '',
            gender: item.gender || 'Putra',
            bapak: item.bapak || '',
            ibu: item.ibu || '',
            defaultKategori: item.default_kategori || '',
            defaultJuz: item.default_juz || '',
            predikat: item.predikat || 'Jayyid',
            statusPamflet: item.status_pamflet || 'pending',
            tanggalTasmi: item.tanggal_tasmi || null,
            catatan: item.catatan || ''
          }));

          localStorage.setItem('tahfidz_master_students_v1', JSON.stringify(mapped));
          if (typeof updateTahfidzPamfletBadgeCount === 'function') updateTahfidzPamfletBadgeCount();
        renderTahfidzMasterTable();
          if (typeof renderHumasMetrics === 'function') renderHumasMetrics();
          return true;
        }
      } catch (e) {
        console.warn('Gagal membaca data santri dari Supabase:', e);
      }
      return false;
    }

    async function pullHumasFromSupabase() {
      const cfg = getSupabaseConfig();
      if (!cfg.url || !cfg.anonKey) return false;

      try {
        const endpoint = `${cfg.url}/rest/v1/humas_programs?select=*&order=start_date.asc`;
        const res = await fetch(endpoint, {
          headers: {
            'apikey': cfg.anonKey,
            'Authorization': `Bearer ${cfg.anonKey}`
          }
        });

        if (!res.ok) return false;
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          humasState.programs = data.map(item => ({
            id: item.id,
            no: item.no,
            tgl: item.tgl,
            startDate: item.start_date,
            endDate: item.end_date,
            bulan: item.bulan,
            tahun: item.tahun,
            uraian: item.uraian,
            pj: item.pj,
            sasaran: item.sasaran,
            statusPamflet: item.status_pamflet || 'belum',
            statusPost: item.status_post || 'draft',
            kanal: item.kanal || 'IG,FB,WA'
          }));
          saveHumasProgramsLocal();
          renderHumasMetrics();
          renderHumasH7RadarCards();
          renderHumasTable();
          return true;
        }
      } catch (e) {
        console.warn('Gagal membaca dari Supabase:', e);
      }
      return false;
    }

    function copySupabaseSqlSchema() {
      const sql = 
`-- ==========================================================
-- SKEMA TABEL DATABASE HUMAS & TAHFIDZ CLOUD (YTPAI)
-- Jalankan kode SQL ini di: Dashboard Supabase -> SQL Editor -> New Query
-- ==========================================================

-- 1. TABEL PROGRAM HUMAS & SOSMED
CREATE TABLE IF NOT EXISTS humas_programs (
  id TEXT PRIMARY KEY,
  no INTEGER,
  tgl TEXT,
  start_date DATE,
  end_date DATE,
  bulan TEXT,
  tahun TEXT,
  uraian TEXT NOT NULL,
  pj TEXT,
  sasaran TEXT,
  status_pamflet TEXT DEFAULT 'belum',
  status_post TEXT DEFAULT 'draft',
  kanal TEXT DEFAULT 'IG,FB,WA',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk mempercepat query radar tanggal dan filter
CREATE INDEX IF NOT EXISTS idx_humas_start_date ON humas_programs(start_date);
CREATE INDEX IF NOT EXISTS idx_humas_status_pamflet ON humas_programs(status_pamflet);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE humas_programs ENABLE ROW LEVEL SECURITY;

-- Buat Kebijakan Akses Publik (Read & Write dari Frontend Vercel / Web)
CREATE POLICY "Public Read All" ON humas_programs 
  FOR SELECT USING (true);

CREATE POLICY "Public Insert & Update" ON humas_programs 
  FOR ALL USING (true) WITH CHECK (true);

-- 2. TABEL DATA SANTRI TAHFIDZ & TASMI' (KENAIKAN JUZ)
CREATE TABLE IF NOT EXISTS tahfidz_students (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  unit TEXT,
  kelas TEXT,
  gender TEXT DEFAULT 'Putra',
  bapak TEXT,
  ibu TEXT,
  default_kategori TEXT,
  default_juz TEXT,
  predikat TEXT DEFAULT 'Jayyid',
  status_pamflet TEXT DEFAULT 'pending',
  tanggal_tasmi DATE,
  catatan TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tahfidz_unit ON tahfidz_students(unit);
CREATE INDEX IF NOT EXISTS idx_tahfidz_status_pamflet ON tahfidz_students(status_pamflet);

ALTER TABLE tahfidz_students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Tahfidz" ON tahfidz_students 
  FOR SELECT USING (true);

CREATE POLICY "Public Insert & Update Tahfidz" ON tahfidz_students 
  FOR ALL USING (true) WITH CHECK (true);
`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(sql).then(() => {
          alert('✅ Kode SQL Supabase berhasil disalin ke clipboard! Silakan paste di SQL Editor Supabase Anda.');
        }).catch(() => {
          fallbackCopyText(sql);
          alert('✅ Kode SQL Supabase berhasil disalin ke clipboard!');
        });
      } else {
        fallbackCopyText(sql);
        alert('✅ Kode SQL Supabase berhasil disalin ke clipboard!');
      }
    }

    async function syncHumasFromCloud() {
      const cfg = getSupabaseConfig();
      if (!cfg.url || !cfg.anonKey) {
        if (typeof showToast === 'function') {
          showToast('Koneksi Supabase', 'Kredensial database Supabase belum terpasang.');
        }
        return;
      }
      
      const btn = document.getElementById('btnHumasSyncCloud');
      if (btn) btn.classList.add('opacity-50', 'pointer-events-none');
      
      try {
        const pulledHumas = await pullHumasFromSupabase();
        const pulledTahfidz = await pullTahfidzFromSupabase();

        if (pulledHumas || pulledTahfidz) {
          if (typeof showToast === 'function') {
            showToast('✅ Sinkron Sukses', 'Data agenda & santri berhasil diperbarui dari Supabase.');
          }
        } else {
          // Jika di cloud masih kosong, unggah data awal ke cloud
          const pushed = await syncHumasToSupabase(false);
          if (pushed && typeof showToast === 'function') {
            showToast('✅ Sinkron Sukses', 'Data agenda lokal berhasil diunggah ke database Supabase.');
          }
        }
      } catch (err) {
        console.warn('Sync error:', err);
      } finally {
        if (btn) btn.classList.remove('opacity-50', 'pointer-events-none');
      }
    }

    function initHumasSupabaseSync() {
      updateSupabaseConnectionStatusBadge();
      // Auto-sinkronkan dari Supabase atau unggah data awal jika Supabase masih kosong
      setTimeout(async () => {
        try {
          const cfg = getSupabaseConfig();
          if (cfg.url && cfg.anonKey) {
            const pulledHumas = await pullHumasFromSupabase();
            if (!pulledHumas && humasState.programs && humasState.programs.length > 0) {
              await syncHumasToSupabase(false);
            }
          }
        } catch (e) {
          console.warn('Auto cloud sync error:', e);
        }
      }, 1000);
    }

    // ==========================================================================
    // NOTIFIKASI HP & RADAR PENGINGAT ACARA H-7 (PWA WEB NOTIFICATION)
    // ==========================================================================

    function updateHumasNotifButtonUI() {
      const btn = document.getElementById('btnHumasMobileNotif');
      const icon = document.getElementById('iconHumasNotif');
      const label = document.getElementById('labelHumasNotif');
      if (!btn || !label) return;

      if (!('Notification' in window)) {
        btn.classList.add('opacity-40');
        btn.title = 'Browser tidak mendukung Web Notification';
        label.textContent = 'Notif N/A';
        return;
      }

      if (Notification.permission === 'granted') {
        btn.className = 'justify-center px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] sm:text-xs border border-emerald-300 dark:border-emerald-800/60 transition-all flex items-center gap-1.5 cursor-pointer min-h-[34px] shadow-2xs';
        if (icon) {
          icon.className = 'w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400';
          icon.setAttribute('data-lucide', 'bell-ring');
        }
        label.textContent = '🔔 Notif Aktif';
        btn.title = 'Notifikasi HP aktif. Klik untuk uji kirim pengingat acara H-7.';
      } else if (Notification.permission === 'denied') {
        btn.className = 'justify-center px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold text-[11px] sm:text-xs border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer min-h-[34px] shadow-2xs';
        if (icon) {
          icon.className = 'w-3.5 h-3.5 text-slate-400';
          icon.setAttribute('data-lucide', 'bell-off');
        }
        label.textContent = '🔕 Notif Blokir';
        btn.title = 'Izin notifikasi diblokir di browser ini. Klik untuk petunjuk aktivasi.';
      } else {
        btn.className = 'justify-center px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-bold text-[11px] sm:text-xs border border-rose-200 dark:border-rose-800/60 transition-all flex items-center gap-1.5 cursor-pointer min-h-[34px] shadow-2xs';
        if (icon) {
          icon.className = 'w-3.5 h-3.5 text-rose-500';
          icon.setAttribute('data-lucide', 'bell');
        }
        label.textContent = 'Notif HP (H-7)';
        btn.title = 'Klik untuk mengaktifkan notifikasi pengingat acara H-7 di HP Anda';
      }
      safeCreateIcons();
    }

    async function toggleHumasMobileNotification() {
      if (!('Notification' in window)) {
        alert('Perangkat atau browser Anda belum mendukung fitur Notifikasi Web / PWA. Pastikan membuka di Chrome, Edge, atau tambahkan aplikasi ini ke Layar Utama (PWA).');
        return;
      }

      if (Notification.permission === 'denied') {
        alert('Izin notifikasi saat ini DIBLOKIR di pengaturan browser Anda.\n\nCara mengaktifkannya di HP:\n1. Ketuk ikon gembok / setelan situs di samping alamat web (URL bar).\n2. Pilih "Izin Situs" / "Permissions".\n3. Ubah "Notifikasi" menjadi "Izinkan" / "Allow".\n4. Muat ulang halaman.');
        return;
      }

      if (Notification.permission === 'default') {
        try {
          const perm = await Notification.requestPermission();
          updateHumasNotifButtonUI();
          if (perm === 'granted') {
            await sendNativeNotification(
              '🔔 Pengingat Acara H-7 Aktif!',
              'Aplikasi akan otomatis memunculkan notifikasi di HP untuk setiap agenda yang mendekati H-7.',
              'welcome'
            );
            checkHumasH7MobileNotifications(true);
            showToast('Notifikasi Diaktifkan ✨', 'Pengingat acara H-7 telah siap di HP Anda.');
          } else {
            showToast('Izin Ditolak', 'Notifikasi pengingat tidak dapat ditampilkan tanpa izin.');
          }
        } catch (e) {
          console.warn('Error request permission:', e);
        }
      } else if (Notification.permission === 'granted') {
        // Uji coba & scan notifikasi langsung
        const sent = await checkHumasH7MobileNotifications(true);
        if (!sent) {
          await sendNativeNotification(
            '✅ Radar Acara Humas Aktif',
            'Saat ini belum ada agenda acara yang berada di rentang H-0 s/d H-7.',
            'test'
          );
          showToast('Notifikasi Aktif', 'Pengingat HP siap bekerja saat ada acara mendekati H-7.');
        }
      }
    }

    async function sendNativeNotification(title, body, tag = 'radar', targetUrl = './index.html') {
      try {
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.ready;
          if (reg && reg.showNotification) {
            return reg.showNotification(title, {
              body: body,
              icon: './icon-192.png',
              badge: './favicon.png',
              tag: tag,
              renotify: true,
              vibrate: [200, 100, 200],
              data: { url: targetUrl }
            });
          }
        }
        // Fallback jika serviceWorker belum siap
        // Fallback jika serviceWorker belum siap (hanya desktop)
        if (window.Notification && Notification.permission === 'granted') {
          try {
            return new Notification(title, {
              body: body,
              icon: './icon-192.png',
              tag: tag
            });
          } catch (notifErr) {
            console.warn('[PWA] Direct Notification constructor blocked (Android standard):', notifErr);
          }
        }
      } catch (err) {
        console.warn('Gagal kirim notifikasi native:', err);
      }
    }

    async function checkHumasH7MobileNotifications(forceShow = false) {
      if (!('Notification' in window) || Notification.permission !== 'granted') {
        updateHumasNotifButtonUI();
        return false;
      }

      updateHumasNotifButtonUI();

      if (!humasState.programs || humasState.programs.length === 0) return false;

      // Ambil tanggal hari ini dalam format YYYY-MM-DD
      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

      // Filter program yang masuk radar H-7 (diff 0 sampai 7)
      const h7Items = [];
      humasState.programs.forEach(item => {
        if (!item.startDate) return;
        const diff = calculateDaysDiff(item.startDate, humasState.refDate);
        if (diff >= 0 && diff <= 7) {
          h7Items.push({ item, diff });
        }
      });

      if (h7Items.length === 0) return false;

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
    window.processHumasVoiceSmartCommand = processHumasVoiceSmartCommand;
    window.toggleHumasVoiceSearch = toggleHumasVoiceSearch;
    window.stopHumasVoiceSearch = stopHumasVoiceSearch;

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
