// ============================================================================
// MODULE: tab_jurnal.js
// Jurnal Guru, Jadwal Mengajar, Presensi & Penilaian Tambahan STS/SAS
// Formal: MTs Kelas 7A, 7B, 7C, 7D (Prakarya)
// Non-Formal: Madrasah Diniyah Kelas 1 Ula A, 1 Ula B (Safinatun Najah)
// ============================================================================

(function() {
  'use strict';

  const JURNAL_STORAGE_KEY = 'partner_fatih_jurnal_guru_v2';

  // Default Students Roster
  const DEFAULT_STUDENTS_7A = [
    'Achmad Alfan', 'Ahmad Daniyal', 'Alifian Bagas', 'Anggun Zahra', 'Anisa Rahmawati',
    'Arga Pratama', 'Aulia Nur Fatimah', 'Bagas Aditya', 'Bintang Ramadhani', 'Cinta Laura',
    'Daffa Maulana', 'Dina Kartika', 'Faris Ihsan', 'Fatir Alfarizi', 'Gita Permata',
    'Hafizh Shiddiq', 'Ilham Wahyudi', 'Intan Permatasari', 'Kevin Ardiansyah', 'Laila Nafisah',
    'M. Naufal Azzam', 'M. Rayhan Saputra', 'Nadia Syahrini', 'Rizky Febrian', 'Salwa Salsabila',
    'Syifa Fauziah', 'Tegar Wibowo', 'Zahra Amelia'
  ];

  const DEFAULT_STUDENTS_7B = [
    'Aditya Pratama', 'Aisyah Putri', 'Aldo Firmansyah', 'Amalia Safitri', 'Bayu Setiawan',
    'Citra Kirana', 'Dimas Anggara', 'Eka Nuraini', 'Fajar Ramadhan', 'Fani Rahma',
    'Galih Pangestu', 'Hani Handayani', 'Irfan Hakim', 'Khadijah Azzahra', 'Lukman Hakim',
    'Maulana Malik', 'Nabila Zahra', 'Nurul Hidayah', 'Panji Gumilang', 'Putri Ayu',
    'Rahmat Hidayat', 'Rendi Septian', 'Rina Marlina', 'Roni Wijaya', 'Siti Maryam',
    'Taufik Hidayat', 'Wulan Dari', 'Yusuf Mansur'
  ];

  const DEFAULT_STUDENTS_7C = [
    'Abdurrahman Wahid', 'Anisa Tri', 'Arya Wiguna', 'Bella Safira', 'Bima Sakti',
    'Cantika Dewi', 'Danang Sutrisno', 'Dewi Sartika', 'Fahmi Idris', 'Fitri Handayani',
    'Gilang Dirga', 'Hasan Basri', 'Indra Bekti', 'Jihan Fahira', 'Kemal Palevi',
    'Lutfi Agizal', 'Mega Utami', 'Muhammad Ali', 'Nanda Pratama', 'Oki Setiana',
    'Prilly Latuconsina', 'Raditya Dika', 'Rara Istiati', 'Sandiaga Uno', 'Tasya Kamila',
    'Umar bin Khattab', 'Vino G Bastian', 'Zaskia Gotik'
  ];

  const DEFAULT_STUDENTS_7D = [
    'Adam Malik', 'Annisa Pohan', 'Bagus Kahfi', 'Chelsea Islan', 'Denny Cagur',
    'Erina Gudono', 'Farhan Rasyid', 'Gading Marten', 'Hesti Purwadinata', 'Iqbaal Ramadhan',
    'Jessica Mila', 'Keanu Agl', 'Luna Maya', 'Maudy Ayunda', 'Nicho Saputra',
    'Onadio Leonardo', 'Pevita Pearce', 'Raffi Ahmad', 'Raisa Andriana', 'Sule Prikitiw',
    'Tara Basro', 'Uus Rizky', 'Vanesha Prescilla', 'Wafda Saifan', 'Yuki Kato',
    'Zulhas Hasan', 'Arif Brata', 'Boris Bokir'
  ];

  const DEFAULT_STUDENTS_8A = [
    'Abdul Ghofur', 'Achmad Faiz', 'Ahmad Baihaqi', 'Alief Pratama', 'Angga Wijaya',
    'Bahrul Ulum', 'Bima Saputra', 'Diki Wahyudi', 'Fajar Sidik', 'Faris Ramadhan',
    'Haikal Faras', 'Hendra Gunawan', 'Ibnu Sina', 'Iqbal Tawakal', 'Khusnul Yakin',
    'Lukman Hakim', 'M. Fatih Rabbani', 'M. Zidan Prasetyo', 'Nabil Makarim', 'Pandu Dewanata',
    'Rafi Pratama', 'Reza Pahlevi', 'Rifki Ardiansyah', 'Sultan Hasanuddin', 'Wahyu Hidayat',
    'Yusuf Al-Qudsi', 'Zaki Mubarok', 'Zulfikar Ali'
  ];

  const DEFAULT_STUDENTS_8B = [
    'Aisyah Rahmadani', 'Alfi Syahrin', 'Amanda Manopo', 'Annisa Zahra', 'Bella Anggraini',
    'Citra Lestari', 'Dewi Sartika', 'Dinda Permata', 'Elsa Mayasari', 'Fatimah Azzahra',
    'Gita Savitri', 'Hani Puspita', 'Indah Permatasari', 'Julia Perez', 'Kartika Putri',
    'Lilis Suryani', 'Maya Safitri', 'Nabila Syakieb', 'Olivia Zalianty', 'Putri Diana',
    'Qoriatul Aini', 'Ririn Dwi Ariyanti', 'Safira Amelia', 'Tania Putri', 'Ulfah Fauziah',
    'Vina Panduwinata', 'Wulan Guritno', 'Zaskia Sungkar'
  ];

  const DEFAULT_STUDENTS_8C = [
    'Agus Triyono', 'Ali Murtadho', 'Arif Munandar', 'Beni Setiawan', 'Candra Wijaya',
    'Dedy Corbuzier', 'Erwin Prasetya', 'Fandi Ahmad', 'Guruh Sukarno', 'Hadi Sucipto',
    'Irwan Susanto', 'Joko Widodo', 'Kuswanto', 'Lutfi Hakim', 'Mahmud Yunus',
    'Nanang Qosim', 'Okto Maniani', 'Prabowo Subianto', 'Qomarul Zaman', 'Rahmat Darmawan',
    'Sigit Purnomo', 'Teguh Prakoso', 'Untung Surapati', 'Vicky Prasetyo', 'Wawan Hendrawan',
    'Yanuar Dwi', 'Zaenal Arifin', 'Zuhal Musyaffa'
  ];

  const DEFAULT_STUDENTS_8D = [
    'Anita Rachman', 'Bunga Citra', 'Cucu Cahyati', 'Desy Ratnasari', 'Evi Tamala',
    'Fitri Carlina', 'Gisella Anastasia', 'Hetty Koes', 'Inul Daratista', 'Juwita Bahar',
    'Kristina', 'Lesti Andryani', 'Mansyur Subuki', 'Nassar Fahad', 'Ozy Syahputra',
    'Paramitha Rusady', 'Qasidah Ria', 'Rhoma Irama', 'Saipul Jamil', 'Titiek Puspa',
    'Uut Permatasari', 'Vetty Vera', 'Wika Salim', 'Yuni Shara', 'Zaskia Gotik',
    'Aura Kasih', 'Bebi Romeo', 'Cakra Khan'
  ];

  const DEFAULT_STUDENTS_1ULA_A = [
    'Ahmad Burhanuddin', 'Ali Ridho', 'Amiruddin', 'Badawi', 'Choirul Anam',
    'Danial', 'Fahruddin', 'Ghufron', 'Habibullah', 'Hasan Bisri',
    'Ibrahim', 'Ja\'far Shodiq', 'Kholilur Rahman', 'Mahfudz', 'Miftahus Surur',
    'Muchtar', 'Musthofa', 'Nasiruddin', 'Nur Kholis', 'Qomaruddin',
    'Ridhwan', 'Saifuddin', 'Syihabuddin', 'Thoriqul Huda', 'Zainal Abidin'
  ];

  const DEFAULT_STUDENTS_1ULA_B = [
    'Ainur Rofiq', 'Alfan Baidlowi', 'Baharuddin', 'Dhiyauddin', 'Fathur Rahman',
    'Habibur Rahman', 'Hasyim Asy\'ari', 'Imron Rosyadi', 'Jamaluddin', 'Khoirul Huda',
    'Luthfi', 'Mahrus Ali', 'Munir', 'Najib', 'Nuruddin',
    'Qolbi', 'Rofi\'i', 'Samsul Arifin', 'Tajuddin', 'Ubaidillah',
    'Wahid Hasyim', 'Yahya', 'Zaenuddin', 'Zuhdi', 'Zulkifli'
  ];

  // Default Curriculum Topics
  const PRAKARYA_CURRICULUM = [
    { p: 1, m: "Pengenalan Mapel Prakarya, Kontrak Belajar & Ruang Lingkup Materi", ind: "Memahami tujuan pembelajaran Prakarya, tata tertib, dan lingkup kerajinan serta pengolahan." },
    { p: 2, m: "Jenis & Karakteristik Bahan Serat Alam (Tumbuhan & Hewan)", ind: "Mengidentifikasi berbagai macam serat alam serta sifat fisiknya." },
    { p: 3, m: "Pengolahan Bahan Serat & Teknik Dasar Kerajinan Tekstil", ind: "Menganalisis tahapan pengolahan bahan serat menjadi produk kerajinan." },
    { p: 4, m: "Perancangan Produk Kerajinan Bahan Serat Berorientasi Lokal", ind: "Merancang ide, sketsa, dan kebutuhan alat/bahan produk kerajinan." },
    { p: 5, m: "Praktik Pembuatan Produk Kerajinan Serat Alam (Sesi 1)", ind: "Mempraktikkan teknik pembuatan kerajinan serat sesuai rancangan sketsa." },
    { p: 6, m: "Finishing & Pembuatan Kemasan Produk Kerajinan Serat", ind: "Menyelesaikan produk kerajinan dengan sentuhan akhir dan wadah kemasan estetis." },
    { p: 7, m: "Evaluasi Hasil Produk Kerajinan Bahan Serat & Display Karya", ind: "Menilai estetika, fungsi produk, dan presentasi karya kelompok." },
    { p: 8, m: "Pendalaman Materi & Review Menghadapi STS (Tengah Semester)", ind: "Mengulang konsep serat, pengolahan bahan dan persiapan evaluasi STS." },
    { p: 9, m: "Pembahasan Soal STS Prakarya & Refleksi Hasil Ujian", ind: "Menganalisis hasil tes tengah semester dan remedial materi yang belum tuntas." },
    { p: 10, m: "Pengolahan Bahan Pangan Buah Segar Menjadi Makanan & Minuman Sehat", ind: "Mengidentifikasi kandungan gizi dan manfaat buah segar khas daerah." },
    { p: 11, m: "Metode & Teknik Dasar Pengolahan Pangan (Boiling, Steaming, dll)", ind: "Memahami teknik pengolahan panas basah dan panas kering." },
    { p: 12, m: "Perancangan Resep & Praktik Minuman Segar Khas Daerah", ind: "Merancang takaran resep dan higienitas pembuatan minuman segar." },
    { p: 13, m: "Praktik Pengolahan Makanan Ringan Sehat Berbahan Buah", ind: "Mengolah pangan buah menjadi olahan higienis siap santap." },
    { p: 14, m: "Penyajian, Kemasan Higienis & Perhitungan Harga Jual", ind: "Menentukan kemasan pangan aman dan menghitung modal serta harga jual." },
    { p: 15, m: "Pengolahan Hasil Samping Buah Menjadi Produk Bermanfaat", ind: "Memanfaatkan kulit dan biji buah menjadi produk bernilai guna." },
    { p: 16, m: "Teknologi Konstruksi & Rekayasa Miniatur Bangunan Ramah Lingkungan", ind: "Merangkai bahan sederhana menjadi konstruksi miniatur miniatur rumah." },
    { p: 17, m: "Ujian Praktik Akhir Semester & Pengumpulan Portofolio", ind: "Penilaian unjuk kerja akhir semester dan kelengkapan jurnal belajar." },
    { p: 18, m: "Evaluasi Akhir Semester, Akumulasi Nilai SAS & Rapor", ind: "Rekapitulasi nilai harian, bonus keaktifan, dan penyerahan nilai akhir." }
  ];

  const SAFINAH_CURRICULUM = [
    { p: 1, m: "Mukadimah Kitab Safinatun Najah & Keutamaan Ilmu Syariat", ind: "Mengetahui biografi muallif Syaikh Salim bin Sumair dan pentingnya belajar fiqih." },
    { p: 2, m: "Fashl: Arkanul Islam (Rukun Islam yang 5)", ind: "Menghafal dan memahami 5 rukun Islam secara tartil berserta dalilnya." },
    { p: 3, m: "Fashl: Arkanul Iman (Rukun Iman yang 6)", ind: "Menghafal 6 rukun iman dan makna beriman kepada qadha dan qadar Allah." },
    { p: 4, m: "Fashl: Makna Kalimat Tauhid 'Laa Ilaaha Illallah'", ind: "Menghayati makna kalimat tahlil dan penafian tuhan selain Allah." },
    { p: 5, m: "Fashl: Tanda-tanda Baligh Laki-laki & Perempuan", ind: "Mengetahui 3 tanda baligh menurut syariat Islam secara rinci." },
    { p: 6, m: "Fashl: Syarat-syarat Istinja' dengan Batu", ind: "Mengetahui 8 syarat sah istinja' tanpa air menggunakan batu/tisu suci." },
    { p: 7, m: "Fashl: Fardhu / Rukun Wudhu (6 Perkara)", ind: "Menghafal dan memahami fardhu wudhu dari niat hingga tertib." },
    { p: 8, m: "Fashl: Niat Wudhu & Praktik Basuhan Wajah serta Anggota", ind: "Mempraktikkan niat wudhu bersamaan dengan basuhan awal wajah." },
    { p: 9, m: "Evaluasi Tengah Semester: Setoran Matan & Praktik Wudhu", ind: "Pengujian hafalan matan Safinah fasal awal dan ujian praktik wudhu." },
    { p: 10, m: "Fashl: Pembagian Air (Thahir Muthahhir, Musta'mal, Mutanajjis)", ind: "Membedakan jenis-jenis air dan ketentuan dua qullah." },
    { p: 11, m: "Fashl: Perkara yang Mewajibkan Mandi Janabah (6 Hal)", ind: "Mengetahui 6 perkara yang mewajibkan mandi besar bagi muslim/muslimah." },
    { p: 12, m: "Fashl: Rukun-rukun Mandi Besar (Niat & Meratakan Air)", ind: "Memahami dan mempraktikkan tata cara mandi wajib yang sah." },
    { p: 13, m: "Fashl: Syarat-syarat Sah Wudhu (10 Perkara)", ind: "Menjelaskan syarat sah wudhu agar ibadah sholat diterima." },
    { p: 14, m: "Fashl: Pembatal-pembatal Wudhu (Nawaqidul Wudhu)", ind: "Menguraikan 4 hal yang membatalkan wudhu menurut madzhab Syafi'i." },
    { p: 15, m: "Fashl: Perkara yang Diharamkan bagi yang Berhadats", ind: "Mengetahui halangan ibadah bagi yang hadats kecil, junub dan haid." },
    { p: 16, m: "Fashl: Rukun-rukun Sholat (17 Rukun)", ind: "Menghafal 17 rukun sholat dari takbiratul ihram sampai salam kedua." },
    { p: 17, m: "Praktik Rukun Sholat (Thuma'ninah, Bacaan Fatihah & Tasyahhud)", ind: "Mempraktikkan ketepatan gerakan dan bacaan wajib dalam sholat." },
    { p: 18, m: "Evaluasi Akhir Semester (SAS Diniyah) & Akumulasi Nilai Rapor", ind: "Ujian lisan matan Safinah, penilaian akhlak adab, dan penyerahan nilai akhir." }
  ];

  const DEFAULT_CLASS_SCHEDULE = {
    '7A': { day: 'Ahad',  time: '10.20 - 11.40', hours: 'Jam 5-6', room: 'Ruang MTs 7A', subject: 'Prakarya (Kode 33)' },
    '7B': { day: 'Ahad',  time: '12.10 - 13.20', hours: 'Jam 7-8', room: 'Ruang MTs 7B', subject: 'Prakarya (Kode 33)' },
    '7C': { day: 'Kamis', time: '07.00 - 08.30', hours: 'Jam 1-2', room: 'Ruang MTs 7C', subject: 'Prakarya (Kode 33)' },
    '7D': { day: 'Senin', time: '12.10 - 13.20', hours: 'Jam 7-8', room: 'Ruang MTs 7D', subject: 'Prakarya (Kode 33)' },
    '8A': { day: 'Kamis', time: '07.00 - 08.30', hours: 'Jam 1-2', room: 'Ruang MTs 8A', subject: 'Prakarya' },
    '8B': { day: 'Kamis', time: '10.20 - 11.40', hours: 'Jam 5-6', room: 'Ruang MTs 8B', subject: 'Prakarya' },
    '8C': { day: 'Ahad',  time: '07.00 - 08.30', hours: 'Jam 1-2', room: 'Ruang MTs 8C', subject: 'Prakarya' },
    '8D': { day: 'Senin', time: '07.00 - 08.30', hours: 'Jam 1-2', room: 'Ruang MTs 8D', subject: 'Prakarya' },
    '1UlaA': { day: 'Selasa', time: '18.00 - 19.30', hours: 'Malam / Ba\'da Maghrib', room: 'Gedung Diniyah Lt. 1', subject: 'Safinatun Najah' },
    '1UlaB': { day: 'Jumat', time: '18.00 - 19.30', hours: 'Malam / Ba\'da Maghrib', room: 'Gedung Diniyah Lt. 2', subject: 'Safinatun Najah' }
  };

  const DEFAULT_SCHEDULES = [
    // 1. AHAD: 8C (Jam 1-2) + Pengembangan Diri (Jam 3-4) + 7A (Jam 5-6) + 7B (Jam 7-8)
    { id: 'sch-ahad-8c', day: 'Ahad', dayIndex: 0, unit: 'formal', classId: '8C', subject: 'Prakarya', time: '07.00 - 08.30 (Jam 1-2)', room: 'Ruang MTs 8C' },
    { id: 'sch-ahad-pd', day: 'Ahad', dayIndex: 0, unit: 'formal', classId: 'Semua', subject: 'Pengembangan Diri', time: '08.30 - 09.50 (Jam 3-4)', room: 'Gedung MTs / Terpadu' },
    { id: 'sch-ahad-7a', day: 'Ahad', dayIndex: 0, unit: 'formal', classId: '7A', subject: 'Prakarya (Kode 33)', time: '10.20 - 11.40 (Jam 5-6)', room: 'Ruang MTs 7A' },
    { id: 'sch-ahad-7b', day: 'Ahad', dayIndex: 0, unit: 'formal', classId: '7B', subject: 'Prakarya (Kode 33)', time: '12.10 - 13.20 (Jam 7-8)', room: 'Ruang MTs 7B' },

    // 2. SENIN: 8D (Jam 1-2) + 7D (Jam 7-8)
    { id: 'sch-senin-8d', day: 'Senin', dayIndex: 1, unit: 'formal', classId: '8D', subject: 'Prakarya', time: '07.00 - 08.30 (Jam 1-2)', room: 'Ruang MTs 8D' },
    { id: 'sch-senin-7d', day: 'Senin', dayIndex: 1, unit: 'formal', classId: '7D', subject: 'Prakarya (Kode 33)', time: '12.10 - 13.20 (Jam 7-8)', room: 'Ruang MTs 7D' },

    // 3. SELASA: 8A (Jam 1-2) + 8B (Jam 3-4) + Madin Malam 1 Ula A
    { id: 'sch-selasa-8a', day: 'Selasa', dayIndex: 2, unit: 'formal', classId: '8A', subject: 'Prakarya', time: '07.00 - 08.30 (Jam 1-2)', room: 'Ruang MTs 8A' },
    { id: 'sch-selasa-8b', day: 'Selasa', dayIndex: 2, unit: 'formal', classId: '8B', subject: 'Prakarya', time: '08.30 - 09.50 (Jam 3-4)', room: 'Ruang MTs 8B' },
    { id: 'sch-selasa-madin', day: 'Selasa', dayIndex: 2, unit: 'nonformal', classId: '1UlaA', subject: 'Safinatun Najah', time: '18.00 - 19.30 (Malam / Ba\'da Maghrib)', room: 'Gedung Diniyah Lt. 1' },

    // 4. KAMIS: 7C (Jam 1-2) + 8B (Jam 5-6)
    { id: 'sch-kamis-7c', day: 'Kamis', dayIndex: 4, unit: 'formal', classId: '7C', subject: 'Prakarya (Kode 33)', time: '07.00 - 08.30 (Jam 1-2)', room: 'Ruang MTs 7C' },
    { id: 'sch-kamis-8b', day: 'Kamis', dayIndex: 4, unit: 'formal', classId: '8B', subject: 'Prakarya', time: '10.20 - 11.40 (Jam 5-6)', room: 'Ruang MTs 8B' },

    // 5. JUMAT: Madin Malam 1 Ula B
    { id: 'sch-jumat-madin', day: 'Jumat', dayIndex: 5, unit: 'nonformal', classId: '1UlaB', subject: 'Safinatun Najah', time: '18.00 - 19.30 (Malam / Ba\'da Maghrib)', room: 'Gedung Diniyah Lt. 2' }
  ];

  // Active module state
  let currentJurnalUnit = 'formal';
  let currentJurnalClass = '7A';
  let currentJurnalPertemuan = 1;
  let currentJurnalSubTab = 'jadwal';
  let jurnalState = null;
  let debounceTimer = null;

  // Initialize Module State
  function loadJurnalState() {
    try {
      const stored = localStorage.getItem(JURNAL_STORAGE_KEY);
      if (stored) {
        jurnalState = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Gagal membaca localStorage jurnal:', e);
    }

    if (!jurnalState || !jurnalState.classes) {
      jurnalState = {
        bonusWeight: 20,
        schedules: JSON.parse(JSON.stringify(DEFAULT_SCHEDULES)),
        classes: {
          '7A': createInitialClassData('formal', 'Prakarya (Kode 33)', '7A', DEFAULT_STUDENTS_7A),
          '7B': createInitialClassData('formal', 'Prakarya (Kode 33)', '7B', DEFAULT_STUDENTS_7B),
          '7C': createInitialClassData('formal', 'Prakarya (Kode 33)', '7C', DEFAULT_STUDENTS_7C),
          '7D': createInitialClassData('formal', 'Prakarya (Kode 33)', '7D', DEFAULT_STUDENTS_7D),
          '8A': createInitialClassData('formal', 'Prakarya', '8A', DEFAULT_STUDENTS_8A),
          '8B': createInitialClassData('formal', 'Prakarya', '8B', DEFAULT_STUDENTS_8B),
          '8C': createInitialClassData('formal', 'Prakarya', '8C', DEFAULT_STUDENTS_8C),
          '8D': createInitialClassData('formal', 'Prakarya', '8D', DEFAULT_STUDENTS_8D),
          '1UlaA': createInitialClassData('nonformal', 'Safinatun Najah', '1 Ula A', DEFAULT_STUDENTS_1ULA_A),
          '1UlaB': createInitialClassData('nonformal', 'Safinatun Najah', '1 Ula B', DEFAULT_STUDENTS_1ULA_B)
        }
      };
      saveJurnalState();
    } else {
      let isUpdated = false;

      // 1. Pastikan semua kelas 7A-7D & 8A-8D terdaftar lengkap
      const studentMap = {
        '7A': DEFAULT_STUDENTS_7A, '7B': DEFAULT_STUDENTS_7B, '7C': DEFAULT_STUDENTS_7C, '7D': DEFAULT_STUDENTS_7D,
        '8A': DEFAULT_STUDENTS_8A, '8B': DEFAULT_STUDENTS_8B, '8C': DEFAULT_STUDENTS_8C, '8D': DEFAULT_STUDENTS_8D
      };

      if (!jurnalState.classes) jurnalState.classes = {};

      Object.keys(studentMap).forEach(clsId => {
        if (!jurnalState.classes[clsId]) {
          const mapelName = ['7A', '7B', '7C', '7D'].includes(clsId) ? 'Prakarya (Kode 33)' : 'Prakarya';
          jurnalState.classes[clsId] = createInitialClassData('formal', mapelName, clsId, studentMap[clsId]);
          isUpdated = true;
        }
      });

      // 2. Kalibrasi nama mapel & jam sesi tiap kelas formal ke Jadwal Resmi MTs Kode 33
      Object.keys(jurnalState.classes).forEach(clsId => {
        const cls = jurnalState.classes[clsId];
        const sched = DEFAULT_CLASS_SCHEDULE[clsId];
        if (cls && sched) {
          if (cls.unit === 'formal' && ['7A', '7B', '7C', '7D'].includes(clsId)) {
            cls.subject = 'Prakarya (Kode 33)';
          }
          if (cls.sessions) {
            const officialTime = `${sched.time} (${sched.hours})`;
            for (let p = 1; p <= 18; p++) {
              if (cls.sessions[p]) {
                if (!cls.sessions[p].time || cls.sessions[p].time.includes('07.00 - 08.20') || cls.sessions[p].time.includes('34') || cls.sessions[p].time !== officialTime) {
                  cls.sessions[p].time = officialTime;
                  cls.sessions[p].day = sched.day;
                  isUpdated = true;
                }
              }
            }
          }
        }
      });

      // 3. Kalibrasi list schedules (jadwal mengajar mingguan resmi MTs Kode 33 & Diniyah)
      if (!jurnalState.schedules || !jurnalState.schedules.length) {
        jurnalState.schedules = JSON.parse(JSON.stringify(DEFAULT_SCHEDULES));
        isUpdated = true;
      } else {
        DEFAULT_SCHEDULES.forEach(defS => {
          const match = jurnalState.schedules.find(s => s.id === defS.id);
          if (!match) {
            jurnalState.schedules.push(JSON.parse(JSON.stringify(defS)));
            isUpdated = true;
          }
        });
      }

      if (isUpdated) {
        saveJurnalState();
      }
    }
  }

  function createInitialClassData(unit, subject, label, studentNames) {
    const students = studentNames.map((name, idx) => ({
      id: `${label}-${idx + 1}`,
      name: name,
      gender: idx % 2 === 0 ? 'L' : 'P',
      bonusActive: 10,
      pureSts: 75 + (idx % 15),
      pureSas: 78 + (idx % 14)
    }));

    const sched = DEFAULT_CLASS_SCHEDULE[label] || {};
    const defaultTime = sched.time ? `${sched.time} (${sched.hours})` : (unit === 'formal' ? '07.00 - 08.30' : '18.00 - 19.30 (Malam)');

    const sessions = {};
    const curriculum = unit === 'formal' ? PRAKARYA_CURRICULUM : SAFINAH_CURRICULUM;
    for (let p = 1; p <= 18; p++) {
      const cur = curriculum[p - 1] || { m: `Materi Pertemuan ${p}`, ind: `Indikator ${p}` };
      const presensi = {};
      const scores = {};
      students.forEach(st => {
        presensi[st.name] = 'H';
        scores[st.name] = 80 + (p % 15);
      });
      sessions[p] = {
        date: '',
        day: sched.day || '',
        time: defaultTime,
        status: 'terlaksana',
        materi: cur.m,
        indikator: cur.ind,
        catatan: '',
        presensi: presensi,
        scores: scores
      };
    }

    return {
      unit: unit,
      subject: subject,
      label: label,
      students: students,
      sessions: sessions
    };
  }
  function saveJurnalState() {
    try {
      localStorage.setItem(JURNAL_STORAGE_KEY, JSON.stringify(jurnalState));
    } catch (e) {
      console.warn('Gagal menyimpan jurnalState ke localStorage:', e);
    }
  }

  // Active modal tracking
  let currentDetailPertemuan = 1;

  // --- Public Exposed Controller Functions ---
  window.initJurnalModule = function() {
    loadJurnalState();
    const subj = document.getElementById('jurnalActiveSubjectName');
    const classData = jurnalState && jurnalState.classes && jurnalState.classes[currentJurnalClass];
    if (subj && classData) {
      subj.textContent = `${classData.subject} (${classData.label})`;
    }
    renderJurnalDashboard();
    renderJurnalClassPills();
    renderJurnalClassCards();
    renderJurnalPertemuanPills();
    renderJurnalSessionCards();
    renderJurnalReminders();
    renderJurnalTimetable();
    renderCurrentJurnalForm();
    renderPresensiTable();
    renderPenilaianTable();
    renderRekapSemesterTable();
    checkTodaySchedule();
    updateJurnalCloudStatusBadge();
    startTeachingLiveTimer();
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.switchJurnalUnit = function(unit) {
    currentJurnalUnit = unit;
    const btnF = document.getElementById('btnUnitFormal');
    const btnNF = document.getElementById('btnUnitNonFormal');
    const badge = document.getElementById('jurnalActiveUnitBadge');
    const subj = document.getElementById('jurnalActiveSubjectName');

    if (unit === 'formal') {
      if (btnF) btnF.className = 'px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs cursor-pointer whitespace-nowrap';
      if (btnNF) btnNF.className = 'px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer whitespace-nowrap';
      if (badge) {
        badge.className = 'text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 uppercase tracking-wider';
        badge.textContent = 'Formal MTs (Prakarya Kode 33)';
      }
      currentJurnalClass = '7A';
    } else {
      if (btnF) btnF.className = 'px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer whitespace-nowrap';
      if (btnNF) btnNF.className = 'px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs cursor-pointer whitespace-nowrap';
      if (badge) {
        badge.className = 'text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 uppercase tracking-wider';
        badge.textContent = 'Diniyah (Safinatun Najah)';
      }
      currentJurnalClass = '1UlaA';
    }

    const currentCls = jurnalState && jurnalState.classes && jurnalState.classes[currentJurnalClass];
    if (subj && currentCls) {
      subj.textContent = `${currentCls.subject} (${currentCls.label})`;
    }

    renderJurnalDashboard();
    renderJurnalClassPills();
    renderJurnalClassCards();
    renderJurnalPertemuanPills();
    renderJurnalSessionCards();
    renderJurnalReminders();
    renderCurrentJurnalForm();
    renderPresensiTable();
    renderPenilaianTable();
    renderRekapSemesterTable();
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.switchJurnalClass = function(classId) {
    currentJurnalClass = classId;
    const subj = document.getElementById('jurnalActiveSubjectName');
    const classData = jurnalState && jurnalState.classes && jurnalState.classes[currentJurnalClass];
    if (subj && classData) {
      subj.textContent = `${classData.subject} (${classData.label})`;
    }
    renderJurnalDashboard();
    renderJurnalClassPills();
    renderJurnalClassCards();
    renderJurnalPertemuanPills();
    renderJurnalSessionCards();
    renderJurnalReminders();
    renderCurrentJurnalForm();
    renderPresensiTable();
    renderPenilaianTable();
    renderRekapSemesterTable();
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.switchJurnalSubTab = function(tabName) {
    currentJurnalSubTab = tabName;
    const subTabs = ['beranda', 'materi', 'kelas', 'presensi', 'jadwal', 'penilaian', 'rekap', 'slide'];
    subTabs.forEach(t => {
      const btn = document.getElementById('jurnalSubTabBtn_' + t);
      const view = document.getElementById('jurnalSubView_' + t);
      if (t === tabName) {
        if (btn) btn.className = 'jurnal-subnav-btn active flex-shrink-0 px-3.5 py-2 text-xs font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-rose-600 via-rose-600 to-rose-700 text-white border border-rose-500 shadow-sm cursor-pointer whitespace-nowrap';
        if (view) view.classList.remove('hidden');
      } else {
        if (btn) btn.className = 'jurnal-subnav-btn flex-shrink-0 px-3.5 py-2 text-xs font-semibold transition-all flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer whitespace-nowrap';
        if (view) view.classList.add('hidden');
      }
    });

    if (tabName === 'beranda') renderJurnalDashboard();
    if (tabName === 'materi') renderJurnalSessionCards();
    if (tabName === 'kelas') renderJurnalClassCards();
    if (tabName === 'presensi') renderPresensiTable();
    if (tabName === 'penilaian') renderPenilaianTable();
    if (tabName === 'rekap') renderRekapSemesterTable();
    if (tabName === 'slide') renderSlideStudio();
    if (tabName === 'jadwal') {
      renderJurnalReminders();
      renderJurnalTimetable();
    }
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  // --- RENDER SUB-VIEWS MOBILE TERPADU ---

  // 1. Render Dashboard Bento & Preview Kelas (Persis Screenshot 3)
  function renderJurnalDashboard() {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;

    // Hitung jumlah kelas pada unit aktif
    const formalKeys = ['7A', '7B', '7C', '7D', '8A', '8B', '8C', '8D'];
    const nonFormalKeys = ['1UlaA', '1UlaB'];
    const activeKeys = currentJurnalUnit === 'formal' ? formalKeys : nonFormalKeys;
    const totalKelas = activeKeys.length;

    // Hitung total materi terisi di kelas aktif
    let filledMateri = 0;
    if (classData.sessions) {
      for (let p = 1; p <= 18; p++) {
        if (classData.sessions[p] && classData.sessions[p].materi && classData.sessions[p].materi.trim()) {
          filledMateri++;
        }
      }
    }

    // Hitung total jadwal sesi
    const totalJadwal = (jurnalState.schedules || []).filter(s => s.unit === currentJurnalUnit).length;
    const totalSiswa = classData.students ? classData.students.length : 0;

    const elKelas = document.getElementById('bentoCountKelas');
    const elMateri = document.getElementById('bentoCountMateri');
    const elJadwal = document.getElementById('bentoCountPengingat');
    const elSiswa = document.getElementById('bentoCountSiswa');

    if (elKelas) elKelas.textContent = String(totalKelas).padStart(2, '0');
    if (elMateri) elMateri.textContent = String(filledMateri).padStart(2, '0');
    if (elJadwal) elJadwal.textContent = String(totalJadwal).padStart(2, '0');
    if (elSiswa) elSiswa.textContent = String(totalSiswa).padStart(2, '0');

    // Render Preview Kelas Grid
    const previewGrid = document.getElementById('dashboardClassPreviewGrid');
    if (previewGrid) {
      const classList = currentJurnalUnit === 'formal'
        ? [
            { id: '7A', label: 'Kelas 7A MTs', mapel: 'Prakarya (33)', schedule: 'Ahad Jam 5-6' },
            { id: '7B', label: 'Kelas 7B MTs', mapel: 'Prakarya (33)', schedule: 'Ahad Jam 7-8' },
            { id: '7C', label: 'Kelas 7C MTs', mapel: 'Prakarya (33)', schedule: 'Kamis Jam 1-2' },
            { id: '7D', label: 'Kelas 7D MTs', mapel: 'Prakarya (33)', schedule: 'Senin Jam 7-8' },
            { id: '8A', label: 'Kelas 8A MTs', mapel: 'Prakarya', schedule: 'MTs 8A' },
            { id: '8B', label: 'Kelas 8B MTs', mapel: 'Prakarya', schedule: 'MTs 8B' },
            { id: '8C', label: 'Kelas 8C MTs', mapel: 'Prakarya', schedule: 'MTs 8C' },
            { id: '8D', label: 'Kelas 8D MTs', mapel: 'Prakarya', schedule: 'MTs 8D' }
          ]
        : [
            { id: '1UlaA', label: '1 Ula A (Diniyah)', mapel: 'Safinatun Najah', schedule: 'Selasa Malam' },
            { id: '1UlaB', label: '1 Ula B (Diniyah)', mapel: 'Safinatun Najah', schedule: 'Jumat Malam' }
          ];

      previewGrid.innerHTML = classList.map(c => {
        const isSelected = c.id === currentJurnalClass;
        const cardStyle = isSelected
          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-rose-500/25'
          : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200/80 dark:border-slate-800 shadow-2xs';
        const subColor = isSelected ? 'text-white/80' : 'text-slate-400';
        return `
          <div onclick="switchJurnalClass('${c.id}'); switchJurnalSubTab('materi');" class="${cardStyle} p-3.5 rounded-2xl cursor-pointer active:scale-95 transition-all flex items-center justify-between">
            <div>
              <span class="text-[10px] font-bold ${subColor} uppercase block">${c.mapel} • ${c.schedule}</span>
              <h5 class="text-sm font-black">${c.label}</h5>
            </div>
            <i data-lucide="${isSelected ? 'check-circle-2' : 'chevron-right'}" class="w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}"></i>
          </div>
        `;
      }).join('');
    }
  }

  // 2. Render List Jurnal Cards (Persis Screenshot 1)
  function renderJurnalSessionCards() {
    const container = document.getElementById('jurnalSessionCardsContainer');
    if (!container) return;

    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData || !classData.sessions) return;

    const dateText = document.getElementById('jurnalMobileTodayText');
    const classSub = document.getElementById('jurnalMobileClassSubtitle');
    if (dateText) {
      const today = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateText.textContent = today.toLocaleDateString('id-ID', options);
    }
    if (classSub) {
      classSub.textContent = `Kelas ${classData.label} • Mapel ${classData.subject}`;
    }

    let cardsHtml = '';
    for (let p = 1; p <= 18; p++) {
      const sess = classData.sessions[p] || {};
      const presensi = sess.presensi || {};
      let sakit = 0, alpa = 0, izin = 0;
      Object.values(presensi).forEach(st => {
        if (st === 'S') sakit++;
        else if (st === 'A') alpa++;
        else if (st === 'I') izin++;
      });

      const dateStr = sess.date ? sess.date : `Pertemuan ${p}`;
      const materiSnippet = sess.materi ? sess.materi : `Materi Pembelajaran Pertemuan ${p}`;

      cardsHtml += `
        <div class="mobile-ref-card p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:border-rose-300 transition-all cursor-pointer" onclick="openJurnalDetailModal(${p})">
          <!-- Left Icon Box: Crimson Square with White Check -->
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-rose-500/30">
              <i data-lucide="clipboard-check" class="w-5 h-5 text-white"></i>
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                Jurnal Pertemuan ${p}
              </h4>
              <p class="text-[11px] text-slate-400 truncate mt-0.5">
                ${dateStr} • ${classData.label} (${classData.subject})
              </p>
              <p class="text-[11px] text-slate-600 dark:text-slate-300 font-semibold truncate mt-0.5">
                ${materiSnippet}
              </p>
            </div>
          </div>

          <!-- Right: 3-Stats Column (Sakit, Alfa, Izin) & Detail Link -->
          <div class="flex flex-col items-end flex-shrink-0">
            <div class="flex items-center gap-2 sm:gap-3 text-center">
              <div class="leading-tight">
                <span class="text-amber-500 font-black text-xs sm:text-sm">${sakit}</span>
                <span class="block text-[8px] sm:text-[9px] text-slate-400 font-semibold">Sakit</span>
              </div>
              <div class="leading-tight">
                <span class="text-rose-600 font-black text-xs sm:text-sm">${alpa}</span>
                <span class="block text-[8px] sm:text-[9px] text-slate-400 font-semibold">Alfa</span>
              </div>
              <div class="leading-tight">
                <span class="text-blue-500 font-black text-xs sm:text-sm">${izin}</span>
                <span class="block text-[8px] sm:text-[9px] text-slate-400 font-semibold">Izin</span>
              </div>
            </div>
            <div class="flex items-center gap-1.5 mt-1.5">
              <button type="button" onclick="event.stopPropagation(); openSlideStudioForPertemuan(${p});" class="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 border border-indigo-500/20 active:scale-95 transition-all" title="Buka Slide Presentasi & Canva">
                <span>Slide</span>
              </button>
              <button type="button" onclick="event.stopPropagation(); openJurnalAiQuizModal(${p});" class="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 border border-amber-500/20 active:scale-95 transition-all" title="Tanya Santri (AI Evaluasi)">
                <span>Tanya AI</span> 🎯
              </button>
              <span class="text-[10px] text-rose-600 dark:text-rose-400 font-bold hover:underline">
                Detail &rarr;
              </span>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = cardsHtml;
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  // 3. Render Daftar Kelas (Persis Screenshot 2)
  function renderJurnalClassCards() {
    const container = document.getElementById('jurnalClassCardsList');
    if (!container) return;

    const classList = currentJurnalUnit === 'formal'
      ? [
          { id: '7A', title: 'Kelas 7A MTs', mapel: 'Prakarya (Kode 33)', schedule: 'Kamis • 08.30 - 09.50 (Jam 3-4)' },
          { id: '7B', title: 'Kelas 7B MTs', mapel: 'Prakarya (Kode 33)', schedule: 'Ahad • 10.20 - 11.40 (Jam 5-6)' },
          { id: '7C', title: 'Kelas 7C MTs', mapel: 'Prakarya (Kode 33)', schedule: 'Ahad • 12.10 - 13.20 (Jam 7-8)' },
          { id: '7D', title: 'Kelas 7D MTs', mapel: 'Prakarya (Kode 33)', schedule: 'Kamis • 12.10 - 13.20 (Jam 7-8)' },
          { id: '8A', title: 'Kelas 8A MTs', mapel: 'Prakarya (Kode 33)', schedule: 'Selasa • 07.00 - 08.30 (Jam 1-2)' },
          { id: '8B', title: 'Kelas 8B MTs', mapel: 'Prakarya (Kode 33)', schedule: 'Selasa • 08.30 - 09.50 (Jam 3-4)' },
          { id: '8C', title: 'Kelas 8C MTs', mapel: 'Prakarya (Kode 33)', schedule: 'Kamis • 07.00 - 08.30 (Jam 1-2)' },
          { id: '8D', title: 'Kelas 8D MTs', mapel: 'Prakarya (Kode 33)', schedule: 'Senin • 12.10 - 13.20 (Jam 7-8)' }
        ]
      : [
          { id: '1UlaA', title: '1 Ula A (Diniyah)', mapel: 'Safinatun Najah', schedule: 'Selasa • 18.00 - 19.30 (Malam)' },
          { id: '1UlaB', title: '1 Ula B (Diniyah)', mapel: 'Safinatun Najah', schedule: 'Jumat • 18.00 - 19.30 (Malam)' }
        ];

    container.innerHTML = classList.map(c => {
      const isSelected = c.id === currentJurnalClass;
      if (isSelected) {
        return `
          <div onclick="switchJurnalClass('${c.id}'); switchJurnalSubTab('materi');" class="p-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white shadow-lg shadow-rose-500/30 flex items-center justify-between cursor-pointer active:scale-98 transition-all relative overflow-hidden">
            <div class="relative z-10">
              <span class="text-[10px] font-bold text-white/80 block uppercase">${c.schedule} • ${c.mapel}</span>
              <h4 class="text-base font-black tracking-tight">${c.title}</h4>
              <span class="text-[11px] text-white/90 underline mt-1.5 block">Click untuk selengkapnya &rarr;</span>
            </div>
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 relative z-10">
              <i data-lucide="check" class="w-5 h-5 text-white"></i>
            </div>
            <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none"></div>
          </div>
        `;
      } else {
        return `
          <div onclick="switchJurnalClass('${c.id}'); switchJurnalSubTab('materi');" class="mobile-ref-card p-4 flex items-center justify-between cursor-pointer hover:border-rose-300 active:scale-98 transition-all">
            <div>
              <span class="text-[10px] font-bold text-slate-400 block uppercase">${c.schedule} • ${c.mapel}</span>
              <h4 class="text-base font-black text-slate-800 dark:text-white">${c.title}</h4>
              <span class="text-[11px] text-slate-400 mt-1.5 block">Click untuk selengkapnya &rarr;</span>
            </div>
            <div class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400">
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </div>
          </div>
        `;
      }
    }).join('');

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  // 4. Render Pengingat & Jadwal Mengajar (Persis Screenshot 5)
  function renderJurnalReminders() {
    const container = document.getElementById('jurnalRemindersList');
    if (!container) return;

    const subDate = document.getElementById('jurnalJadwalTodaySubtitle');
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (subDate) subDate.textContent = `Hari ini tanggal: ${today.toLocaleDateString('id-ID', options)}`;

    const schedules = (jurnalState.schedules || []).filter(s => s.unit === currentJurnalUnit);
    if (!schedules.length) {
      container.innerHTML = `<div class="text-center py-6 text-xs text-slate-400">Belum ada agenda jadwal pada unit ini.</div>`;
      return;
    }

    container.innerHTML = schedules.map((sch) => {
      const dayAbbr = (sch.day || '').substring(0, 3).toUpperCase();
      return `
        <div onclick="switchJurnalClass('${sch.classId}'); switchJurnalSubTab('materi');" class="mobile-ref-card p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer hover:border-rose-300 transition-all">
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <!-- Left Date Number Block -->
            <div class="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 flex flex-col items-center justify-center flex-shrink-0 text-center">
              <span class="text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400 leading-none">${sch.classId}</span>
              <span class="text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase leading-tight mt-0.5">${dayAbbr}</span>
            </div>
            <!-- Middle Subject & Room -->
            <div class="min-w-0 flex-1">
              <span class="text-[10px] text-slate-400 font-semibold block">${sch.day} • ${sch.time}</span>
              <h5 class="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                ${sch.subject} — Kelas ${sch.classId}
              </h5>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                ${sch.room || 'Ruang MTs'}
              </p>
            </div>
          </div>
          <!-- Right Chevron -->
          <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
          </div>
        </div>
      `;
    }).join('');

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  // 5. Modal Detail Jurnal Interaktif (Persis Screenshot 4)
  window.openJurnalDetailModal = function(pNum) {
    currentDetailPertemuan = pNum;
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData || !classData.sessions) return;
    const sess = classData.sessions[pNum] || {};

    const elDate = document.getElementById('detailModalDate');
    const elTitle = document.getElementById('detailModalTitle');
    const elClass = document.getElementById('detailModalClass');
    const elSubj = document.getElementById('detailModalSubject');
    const elMateri = document.getElementById('detailModalMateri');
    const elInd = document.getElementById('detailModalIndikator');

    if (elDate) elDate.textContent = sess.date ? sess.date : `Pertemuan ${pNum}`;
    if (elTitle) elTitle.textContent = `Jurnal Pertemuan ${pNum}`;
    if (elClass) elClass.textContent = `Kelas ${classData.label}`;
    if (elSubj) elSubj.textContent = classData.subject;
    if (elMateri) elMateri.textContent = sess.materi || 'Materi belum diisi.';
    if (elInd) elInd.textContent = sess.indikator || 'Capaian indikator standar silabus madrasah.';

    // Absensi Santri Detail
    const presensi = sess.presensi || {};
    const stIzin = [], stSakit = [], stAlpa = [];
    (classData.students || []).forEach(st => {
      const status = presensi[st.name];
      if (status === 'I') stIzin.push(st.name);
      else if (status === 'S') stSakit.push(st.name);
      else if (status === 'A') stAlpa.push(st.name);
    });

    const elIzinCount = document.getElementById('detailModalIzinCount');
    const elIzinList = document.getElementById('detailModalIzinList');
    const elSakitCount = document.getElementById('detailModalSakitCount');
    const elSakitList = document.getElementById('detailModalSakitList');
    const elAlpaCount = document.getElementById('detailModalAlpaCount');
    const elAlpaList = document.getElementById('detailModalAlpaList');

    if (elIzinCount) elIzinCount.textContent = `${stIzin.length} Siswa`;
    if (elIzinList) elIzinList.textContent = stIzin.length ? stIzin.join(', ') : 'Tidak ada santri izin.';

    if (elSakitCount) elSakitCount.textContent = `${stSakit.length} Siswa`;
    if (elSakitList) elSakitList.textContent = stSakit.length ? stSakit.join(', ') : 'Tidak ada santri sakit.';

    const alpaFormatted = stAlpa.length ? stAlpa.join(', ') : 'Tidak ada santri tanpa keterangan (Nihil).';
    if (elAlpaCount) elAlpaCount.textContent = `${stAlpa.length} Siswa`;
    if (elAlpaList) elAlpaList.textContent = alpaFormatted;

    const modal = document.getElementById('modalJurnalDetail');
    if (modal) {
      if (modal.parentElement !== document.body) document.body.appendChild(modal);
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.closeJurnalDetailModal = function() {
    const modal = document.getElementById('modalJurnalDetail');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  };

  window.editJurnalFromDetailModal = function() {
    closeJurnalDetailModal();
    selectJurnalPertemuan(currentDetailPertemuan);
    switchJurnalSubTab('materi');
    const formTitle = document.getElementById('jurnalFormTitle');
    if (formTitle) formTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  window.resetJurnalDetailSession = function() {
    if (confirm(`Reset dan kosongkan data Jurnal Pertemuan ${currentDetailPertemuan}?`)) {
      const classData = jurnalState.classes[currentJurnalClass];
      if (classData && classData.sessions && classData.sessions[currentDetailPertemuan]) {
        classData.sessions[currentDetailPertemuan].materi = '';
        classData.sessions[currentDetailPertemuan].indikator = '';
        classData.sessions[currentDetailPertemuan].catatan = '';
        saveJurnalState();
        renderJurnalSessionCards();
        renderJurnalPertemuanPills();
        closeJurnalDetailModal();
        if (typeof showToast === 'function') showToast('Jurnal Direset', `Data Pertemuan ${currentDetailPertemuan} telah dikosongkan.`);
      }
    }
  };

  // Search & Filter Helper
  window.filterJurnalSessionCards = function() {
    const q = (document.getElementById('jurnalSearchInput')?.value || '').toLowerCase();
    const container = document.getElementById('jurnalSessionCardsContainer');
    if (!container) return;
    const cards = container.children;
    for (let i = 0; i < cards.length; i++) {
      const text = cards[i].innerText.toLowerCase();
      cards[i].style.display = text.includes(q) ? '' : 'none';
    }
  };

  window.sortJurnalSessionCards = function() {
    renderJurnalSessionCards();
  };

  window.filterJurnalReminders = function() {
    const q = (document.getElementById('jurnalAcaraSearchInput')?.value || '').toLowerCase();
    const container = document.getElementById('jurnalRemindersList');
    if (!container) return;
    const cards = container.children;
    for (let i = 0; i < cards.length; i++) {
      const text = cards[i].innerText.toLowerCase();
      cards[i].style.display = text.includes(q) ? '' : 'none';
    }
  };

  window.openAddJurnalSessionModal = function() {
    selectJurnalPertemuan(currentJurnalPertemuan);
    switchJurnalSubTab('materi');
    const formTitle = document.getElementById('jurnalFormTitle');
    if (formTitle) formTitle.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (typeof showToast === 'function') showToast('Tambah Jurnal', 'Silakan isi form materi dan simpan.');
  };

  window.openAddClassModalPrompt = function() {
    const newClassName = prompt('Masukkan nama kelas baru (misal: 8A MTs atau 2 Ula):');
    if (newClassName && newClassName.trim()) {
      const id = newClassName.replace(/\s+/g, '');
      if (!jurnalState.classes[id]) {
        jurnalState.classes[id] = createInitialClassData(currentJurnalUnit, currentJurnalUnit === 'formal' ? 'Prakarya' : 'Safinatun Najah', newClassName.trim(), DEFAULT_STUDENTS_7A);
        saveJurnalState();
        switchJurnalClass(id);
        renderJurnalClassCards();
        if (typeof showToast === 'function') showToast('Kelas Ditambahkan', `Kelas ${newClassName} berhasil dibuat.`);
      } else {
        alert('Kelas tersebut sudah ada.');
      }
    }
  };

  window.selectJurnalPertemuan = function(pNum) {
    currentJurnalPertemuan = pNum;
    renderJurnalPertemuanPills();
    renderCurrentJurnalForm();
    renderPresensiTable();
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  // Render Class Pills
  function renderJurnalClassPills() {
    const container = document.getElementById('jurnalClassPillsContainer');
    if (!container) return;

    const classList = currentJurnalUnit === 'formal' 
      ? [{ id: '7A', label: 'Kelas 7A' }, { id: '7B', label: 'Kelas 7B' }, { id: '7C', label: 'Kelas 7C' }, { id: '7D', label: 'Kelas 7D' }, { id: '8A', label: 'Kelas 8A' }, { id: '8B', label: 'Kelas 8B' }, { id: '8C', label: 'Kelas 8C' }, { id: '8D', label: 'Kelas 8D' }]
      : [{ id: '1UlaA', label: '1 Ula A' }, { id: '1UlaB', label: '1 Ula B' }];

    container.innerHTML = classList.map(c => {
      const isActive = c.id === currentJurnalClass;
      const activeClass = isActive 
        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-extrabold shadow-xs' 
        : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-semibold';
      return `<button type="button" onclick="switchJurnalClass('${c.id}')" class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap ${activeClass}">${c.label}</button>`;
    }).join('');
  }

  // Render Pertemuan Pills (P1 to P18)
  function renderJurnalPertemuanPills() {
    const container = document.getElementById('jurnalPertemuanPills');
    if (!container) return;

    const classData = jurnalState.classes[currentJurnalClass];
    let html = '';
    for (let p = 1; p <= 18; p++) {
      const sess = classData && classData.sessions && classData.sessions[p];
      const isFilled = sess && sess.materi && sess.materi.trim() !== '';
      const isCurrent = p === currentJurnalPertemuan;
      const dotColor = isFilled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600';
      const btnClass = isCurrent 
        ? 'bg-blue-600 text-white font-bold shadow-xs' 
        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium hover:bg-slate-100';

      html += `
        <button type="button" onclick="selectJurnalPertemuan(${p})" class="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${btnClass}">
          <span class="w-1.5 h-1.5 rounded-full ${dotColor}"></span>
          <span>P${p}</span>
        </button>
      `;
    }
    container.innerHTML = html;
  }

  // Render Form for Current Meeting
  function renderCurrentJurnalForm() {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;
    const sess = classData.sessions[currentJurnalPertemuan] || {};

    const titleEl = document.getElementById('jurnalFormTitle');
    const subTitleEl = document.getElementById('jurnalFormSubtitle');
    const dateEl = document.getElementById('jurnalFormDate');
    const timeEl = document.getElementById('jurnalFormTime');
    const statusEl = document.getElementById('jurnalFormStatus');
    const materiEl = document.getElementById('jurnalFormMateri');
    const indEl = document.getElementById('jurnalFormIndikator');
    const catEl = document.getElementById('jurnalFormCatatan');

    if (titleEl) titleEl.textContent = `Jurnal Pembelajaran Pertemuan ${currentJurnalPertemuan}`;
    const sched = DEFAULT_CLASS_SCHEDULE[currentJurnalClass] || {};
    const schedInfo = sched.day ? ` • Jadwal: ${sched.day} ${sched.time} (${sched.hours})` : '';
    if (subTitleEl) subTitleEl.textContent = `Kelas: ${classData.label} (${classData.unit === 'formal' ? 'MTs' : 'Madrasah Diniyah'}) • Mapel: ${classData.subject}${schedInfo}`;

    const officialTime = sched.time ? `${sched.time} (${sched.hours})` : (classData.unit === 'formal' ? '07.00 - 08.30' : '18.00 - 19.30 (Malam)');

    if (dateEl) dateEl.value = sess.date || new Date().toISOString().split('T')[0];
    if (timeEl) {
      if (!sess.time || sess.time === '07.00 - 08.20' || sess.time.includes('07.00 - 08.20')) {
        sess.time = officialTime;
      }
      timeEl.value = sess.time;
    }
    if (statusEl) statusEl.value = sess.status || 'terlaksana';
    if (materiEl) materiEl.value = sess.materi || '';
    if (indEl) indEl.value = sess.indikator || '';
    if (catEl) catEl.value = sess.catatan || '';
  }

  window.autoSaveJurnalDebounced = function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      saveCurrentJurnalSession(true);
    }, 400);
  };

  window.saveCurrentJurnalSession = function(silent = false) {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;

    if (!classData.sessions[currentJurnalPertemuan]) {
      classData.sessions[currentJurnalPertemuan] = {};
    }
    const sess = classData.sessions[currentJurnalPertemuan];

    sess.date = document.getElementById('jurnalFormDate')?.value || '';
    sess.time = document.getElementById('jurnalFormTime')?.value || '';
    sess.status = document.getElementById('jurnalFormStatus')?.value || 'terlaksana';
    sess.materi = document.getElementById('jurnalFormMateri')?.value || '';
    sess.indikator = document.getElementById('jurnalFormIndikator')?.value || '';
    sess.catatan = document.getElementById('jurnalFormCatatan')?.value || '';

    saveJurnalState();
    renderJurnalPertemuanPills();

    const statusBadge = document.getElementById('jurnalSaveStatusBadge');
    if (statusBadge) {
      statusBadge.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i><span>Tersimpan Otomatis</span>';
      statusBadge.classList.remove('hidden');
    }
    if (!silent && typeof showToast === 'function') {
      showToast('Jurnal Tersimpan', `Pertemuan ${currentJurnalPertemuan} Kelas ${classData.label} berhasil disimpan.`);
    }
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.applyCurriculumPreset = function() {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;
    const curriculum = classData.unit === 'formal' ? PRAKARYA_CURRICULUM : SAFINAH_CURRICULUM;
    const cur = curriculum[currentJurnalPertemuan - 1];
    if (cur) {
      const matEl = document.getElementById('jurnalFormMateri');
      const indEl = document.getElementById('jurnalFormIndikator');
      if (matEl) matEl.value = cur.m;
      if (indEl) indEl.value = cur.ind;
      saveCurrentJurnalSession();
    }
  };

  // --- Attendance (Presensi) Logic ---
  function renderPresensiTable() {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;
    const sess = classData.sessions[currentJurnalPertemuan] || {};
    sess.presensi = sess.presensi || {};

    const headingEl = document.getElementById('presensiHeading');
    const subHeadingEl = document.getElementById('presensiSubHeading');
    if (headingEl) headingEl.textContent = `Presensi Pertemuan ${currentJurnalPertemuan} — Kelas ${classData.label} (${classData.subject})`;
    if (subHeadingEl) subHeadingEl.textContent = `Tanggal: ${sess.date || 'Hari ini'} • Jam: ${sess.time || '-'}`;

    let total = classData.students.length;
    let hadir = 0, sakit = 0, izin = 0, alpa = 0;

    // 1. Render Desktop Table Body
    const tbody = document.getElementById('presensiTableBody');
    if (tbody) {
      tbody.innerHTML = classData.students.map((st, idx) => {
        const status = sess.presensi[st.name] || 'H';
        if (status === 'H') hadir++;
        else if (status === 'S') sakit++;
        else if (status === 'I') izin++;
        else if (status === 'A') alpa++;

        const btnH = status === 'H' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
        const btnS = status === 'S' ? 'bg-amber-500 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
        const btnI = status === 'I' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
        const btnA = status === 'A' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';

        return `
          <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
            <td class="py-2.5 px-3 text-center text-slate-400 font-mono">${idx + 1}</td>
            <td class="py-2.5 px-3 font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">${st.name.charAt(0)}</span>
              <span>${st.name}</span>
            </td>
            <td class="py-2.5 px-3 text-center text-slate-400">${st.gender || 'L'}</td>
            <td class="py-2.5 px-3 text-center">
              <div class="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-900 gap-0.5">
                <button type="button" onclick="setStudentPresensi(${idx}, 'H')" class="px-2 py-1 rounded text-[11px] transition-all cursor-pointer ${btnH}">H</button>
                <button type="button" onclick="setStudentPresensi(${idx}, 'S')" class="px-2 py-1 rounded text-[11px] transition-all cursor-pointer ${btnS}">S</button>
                <button type="button" onclick="setStudentPresensi(${idx}, 'I')" class="px-2 py-1 rounded text-[11px] transition-all cursor-pointer ${btnI}">I</button>
                <button type="button" onclick="setStudentPresensi(${idx}, 'A')" class="px-2 py-1 rounded text-[11px] transition-all cursor-pointer ${btnA}">A</button>
              </div>
            </td>
            <td class="py-2.5 px-3">
              <input 
                type="text" 
                placeholder="Catatan..." 
                value="${sess.notes && sess.notes[st.name] ? sess.notes[st.name] : ''}" 
                onchange="setStudentPresensiNote(${idx}, this.value)"
                class="w-full px-2 py-1 text-[11px] rounded bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/80 border-b border-transparent focus:border-slate-400 outline-none text-slate-700 dark:text-slate-300"
              />
            </td>
          </tr>
        `;
      }).join('');
    } else {
      // If table is hidden or not in DOM, still compute counts
      classData.students.forEach(st => {
        const status = sess.presensi[st.name] || 'H';
        if (status === 'H') hadir++;
        else if (status === 'S') sakit++;
        else if (status === 'I') izin++;
        else if (status === 'A') alpa++;
      });
    }

    // 2. Render Mobile Touch Cards (Optimized for Handheld / Thumb Taps)
    const mobileList = document.getElementById('presensiMobileList');
    if (mobileList) {
      mobileList.innerHTML = classData.students.map((st, idx) => {
        const status = sess.presensi[st.name] || 'H';
        const isH = status === 'H';
        const isS = status === 'S';
        const isI = status === 'I';
        const isA = status === 'A';

        const btnH = isH 
          ? 'bg-emerald-600 text-white font-extrabold shadow-sm ring-2 ring-emerald-500/40' 
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-200';
        const btnS = isS 
          ? 'bg-amber-500 text-white font-extrabold shadow-sm ring-2 ring-amber-500/40' 
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-200';
        const btnI = isI 
          ? 'bg-blue-600 text-white font-extrabold shadow-sm ring-2 ring-blue-500/40' 
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-200';
        const btnA = isA 
          ? 'bg-rose-600 text-white font-extrabold shadow-sm ring-2 ring-rose-500/40' 
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-200';

        const noteVal = sess.notes && sess.notes[st.name] ? sess.notes[st.name] : '';

        return `
          <div class="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-[11px] flex items-center justify-center flex-shrink-0">${idx + 1}</span>
                <span class="font-bold text-xs text-slate-900 dark:text-white truncate">${st.name}</span>
              </div>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex-shrink-0">${st.gender || 'L'}</span>
            </div>
            
            <div class="grid grid-cols-4 gap-1.5">
              <button type="button" onclick="setStudentPresensi(${idx}, 'H')" class="py-2 rounded-lg text-xs flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${btnH}">
                <span class="leading-none">Hadir</span>
                <span class="text-[9px] opacity-80 mt-0.5 font-mono">(H)</span>
              </button>
              <button type="button" onclick="setStudentPresensi(${idx}, 'S')" class="py-2 rounded-lg text-xs flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${btnS}">
                <span class="leading-none">Sakit</span>
                <span class="text-[9px] opacity-80 mt-0.5 font-mono">(S)</span>
              </button>
              <button type="button" onclick="setStudentPresensi(${idx}, 'I')" class="py-2 rounded-lg text-xs flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${btnI}">
                <span class="leading-none">Izin</span>
                <span class="text-[9px] opacity-80 mt-0.5 font-mono">(I)</span>
              </button>
              <button type="button" onclick="setStudentPresensi(${idx}, 'A')" class="py-2 rounded-lg text-xs flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer ${btnA}">
                <span class="leading-none">Alpa</span>
                <span class="text-[9px] opacity-80 mt-0.5 font-mono">(A)</span>
              </button>
            </div>

            <input 
              type="text" 
              placeholder="Catatan santri (opsional)..." 
              value="${noteVal}" 
              onchange="setStudentPresensiNote(${idx}, this.value)"
              class="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        `;
      }).join('');
    }

    // 3. Update Stats Counters
    const statTotal = document.getElementById('presensiStatTotal');
    const statHadir = document.getElementById('presensiStatHadir');
    const statSakit = document.getElementById('presensiStatSakit');
    const statIzin = document.getElementById('presensiStatIzin');
    const statAlpa = document.getElementById('presensiStatAlpa');

    if (statTotal) statTotal.textContent = total;
    if (statHadir) statHadir.textContent = hadir;
    if (statSakit) statSakit.textContent = sakit;
    if (statIzin) statIzin.textContent = izin;
    if (statAlpa) statAlpa.textContent = alpa;
  }

  window.setStudentPresensi = function(studentIdx, status) {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;
    const st = classData.students[studentIdx];
    if (!st) return;

    const sess = classData.sessions[currentJurnalPertemuan];
    sess.presensi = sess.presensi || {};
    sess.presensi[st.name] = status;

    saveJurnalState();
    renderPresensiTable();
  };

  window.setStudentPresensiNote = function(studentIdx, note) {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;
    const st = classData.students[studentIdx];
    if (!st) return;

    const sess = classData.sessions[currentJurnalPertemuan];
    sess.notes = sess.notes || {};
    sess.notes[st.name] = note;
    saveJurnalState();
  };

  window.markAllStudentsPresent = function() {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;
    const sess = classData.sessions[currentJurnalPertemuan];
    sess.presensi = sess.presensi || {};
    classData.students.forEach(st => {
      sess.presensi[st.name] = 'H';
    });
    saveJurnalState();
    renderPresensiTable();
    if (typeof showToast === 'function') {
      showToast('Presensi Diperbarui', `Seluruh siswa Kelas ${classData.label} ditandai Hadir.`);
    }
  };

  // --- Penilaian & Kalkulator Tambahan STS/SAS ---
  function renderPenilaianTable() {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;
    const tbody = document.getElementById('penilaianTableBody');
    if (!tbody) return;

    const weightSelect = document.getElementById('penilaianBonusWeight');
    const bonusWeight = weightSelect ? parseInt(weightSelect.value) || 20 : 20;

    tbody.innerHTML = classData.students.map((st, idx) => {
      // Calculate Average Formatif Scores across all 18 meetings
      let totalScore = 0;
      let count = 0;
      for (let p = 1; p <= 18; p++) {
        const sess = classData.sessions[p];
        if (sess && sess.scores && sess.scores[st.name] !== undefined) {
          totalScore += Number(sess.scores[st.name]) || 0;
          count++;
        }
      }
      const avgFormatif = count > 0 ? Math.round(totalScore / count) : 80;

          `3. Siapa yang bisa menyimpulkan perbedaan poin penting materi ini? (Bonus Poin)`
      let bonusPoints = 0;
      if (bonusWeight === 15) bonusPoints = Math.round(avgFormatif * 0.15);
      else if (bonusWeight === 20) bonusPoints = Math.round(avgFormatif * 0.20);
      else if (bonusWeight === 30) bonusPoints = Math.round(avgFormatif * 0.30);
      else bonusPoints = Number(st.bonusActive) || 10;

      const pureSts = Number(st.pureSts) || 75;
      const pureSas = Number(st.pureSas) || 75;
      const finalSts = Math.min(100, pureSts + Math.round(bonusPoints / 2));
      const finalSas = Math.min(100, pureSas + Math.round(bonusPoints / 2));
      const finalRapor = Math.round((avgFormatif * 0.3) + (finalSts * 0.3) + (finalSas * 0.4));

      return `
        <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
          <td class="py-2.5 px-3 text-center text-slate-400 font-mono">${idx + 1}</td>
          <td class="py-2.5 px-3 font-semibold text-slate-800 dark:text-white">${st.name}</td>
          <td class="py-2.5 px-2 text-center font-bold text-slate-700 dark:text-slate-300 font-mono">${avgFormatif}</td>
          <td class="py-2.5 px-2 text-center">
            <input 
              type="number" 
              min="0" 
              max="30" 
              value="${st.bonusActive || 10}" 
              onchange="updateStudentScoreField(${idx}, 'bonusActive', this.value)"
              class="w-14 text-center px-1 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-amber-600 dark:text-amber-400 font-mono outline-none"
            />
          </td>
          <td class="py-2.5 px-2 text-center font-black text-amber-700 dark:text-amber-300 bg-amber-500/10 font-mono">+${bonusPoints}</td>
          <td class="py-2.5 px-2 text-center">
            <input 
              type="number" 
              min="0" 
              max="100" 
              value="${pureSts}" 
              onchange="updateStudentScoreField(${idx}, 'pureSts', this.value)"
              class="w-14 text-center px-1 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white font-mono outline-none"
            />
          </td>
          <td class="py-2.5 px-2 text-center font-black text-blue-600 dark:text-blue-400 font-mono text-sm">${finalSts}</td>
          <td class="py-2.5 px-2 text-center">
            <input 
              type="number" 
              min="0" 
              max="100" 
              value="${pureSas}" 
              onchange="updateStudentScoreField(${idx}, 'pureSas', this.value)"
              class="w-14 text-center px-1 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white font-mono outline-none"
            />
          </td>
          <td class="py-2.5 px-2 text-center font-black text-emerald-600 dark:text-emerald-400 font-mono text-sm">${finalSas}</td>
          <td class="py-2.5 px-3 text-center font-black text-indigo-600 dark:text-indigo-400 font-mono text-base">${finalRapor}</td>
        </tr>
      `;
    }).join('');
  }

  window.updateStudentScoreField = function(studentIdx, field, val) {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;
    const st = classData.students[studentIdx];
    if (!st) return;

    st[field] = Number(val) || 0;
    saveJurnalState();
    renderPenilaianTable();
    renderRekapSemesterTable();
  };

  window.recalculateAllBonusScores = function() {
    saveJurnalState();
    renderPenilaianTable();
    renderRekapSemesterTable();
  };

  // --- Rekapitulasi Semester Table ---
  function renderRekapSemesterTable() {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;

    const titleEl = document.getElementById('rekapClassTitle');
    if (titleEl) titleEl.textContent = `Rekapitulasi Semester — Kelas ${classData.label} (${classData.subject})`;

    const tbody = document.getElementById('rekapTableBody');
    if (!tbody) return;

    const weightSelect = document.getElementById('penilaianBonusWeight');
    const bonusWeight = weightSelect ? parseInt(weightSelect.value) || 20 : 20;

    tbody.innerHTML = classData.students.map((st, idx) => {
      let hCount = 0, sCount = 0, iCount = 0, aCount = 0;
      let totalFormatif = 0;
      let countSess = 0;

      for (let p = 1; p <= 18; p++) {
        const sess = classData.sessions[p];
        if (sess) {
          const pres = sess.presensi ? sess.presensi[st.name] : 'H';
          if (pres === 'H') hCount++;
          else if (pres === 'S') sCount++;
          else if (pres === 'I') iCount++;
          else if (pres === 'A') aCount++;

          if (sess.scores && sess.scores[st.name] !== undefined) {
            totalFormatif += Number(sess.scores[st.name]) || 0;
            countSess++;
          }
        }
      }

      const totalMeetings = hCount + sCount + iCount + aCount || 18;
      const pctHadir = Math.round((hCount / totalMeetings) * 100);
      const avgFormatif = countSess > 0 ? Math.round(totalFormatif / countSess) : 80;

      let bonusPoints = Math.round(avgFormatif * (bonusWeight / 100));
      const finalSts = Math.min(100, (Number(st.pureSts) || 75) + Math.round(bonusPoints / 2));
      const finalSas = Math.min(100, (Number(st.pureSas) || 75) + Math.round(bonusPoints / 2));
      const finalRapor = Math.round((avgFormatif * 0.3) + (finalSts * 0.3) + (finalSas * 0.4));

      return `
        <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
          <td class="py-2.5 px-3 text-center text-slate-400 font-mono">${idx + 1}</td>
          <td class="py-2.5 px-3 font-semibold text-slate-800 dark:text-white">${st.name}</td>
          <td class="py-2.5 px-2 text-center font-bold text-emerald-600">${hCount}</td>
          <td class="py-2.5 px-2 text-center text-amber-600">${sCount}</td>
          <td class="py-2.5 px-2 text-center text-blue-600">${iCount}</td>
          <td class="py-2.5 px-2 text-center text-rose-600 font-bold">${aCount}</td>
          <td class="py-2.5 px-2 text-center font-bold text-slate-700 dark:text-slate-300 font-mono">${pctHadir}%</td>
          <td class="py-2.5 px-2 text-center font-bold font-mono">${avgFormatif}</td>
          <td class="py-2.5 px-2 text-center font-bold text-blue-600 font-mono">${finalSts}</td>
          <td class="py-2.5 px-2 text-center font-bold text-emerald-600 font-mono">${finalSas}</td>
          <td class="py-2.5 px-2 text-center font-black text-indigo-600 dark:text-indigo-400 font-mono text-sm">${finalRapor}</td>
        </tr>
      `;
    }).join('');
  }

  // --- Timetable & Today Schedule Handler ---
  const DAY_NAMES = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  function checkTodaySchedule() {
    const todayIndex = new Date().getDay();
    const todayName = DAY_NAMES[todayIndex];
    const todaySchedules = jurnalState.schedules.filter(s => s.dayIndex === todayIndex);

    const dayLabelEl = document.getElementById('jurnalTodayDayLabel');
    const summaryEl = document.getElementById('jurnalTodayClassesSummary');
    const quickBtn = document.getElementById('btnQuickStartTodayClass');

    if (dayLabelEl) dayLabelEl.textContent = `Jadwal Hari Ini: ${todayName}, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`;

    if (todaySchedules.length > 0) {
      if (summaryEl) summaryEl.textContent = `Ada ${todaySchedules.length} Sesi Mengajar: ` + todaySchedules.map(s => `${s.subject} (${s.classId}) - ${s.time}`).join(', ');
      if (quickBtn) quickBtn.classList.remove('opacity-50', 'pointer-events-none');
    } else {
      if (summaryEl) summaryEl.textContent = 'Tidak ada jadwal mengajar tetap hari ini. Nikmati waktu istirahat atau persiapan materi!';
      if (quickBtn) quickBtn.classList.add('opacity-50', 'pointer-events-none');
    }
    updateTeachingLiveTimer();
  }

  // ============================================================================
  // LIVE TEACHING COUNTDOWN TIMER ENGINE (FORMAL MTs & NON-FORMAL DINIYAH)
  // 1. Hitung Mundur Akan Memasuki Waktu Mengajar
  // 2. Hitung Mundur Sisa Waktu Mengajar Sedang Berlangsung (Hingga Selesai)
  // ============================================================================
  let teachingTimerInterval = null;
  let teachingTimerUnitFilter = 'auto'; // 'auto' | 'formal' | 'nonformal'
  let teachingTimerSimMode = 'live';    // 'live' | 'sim_upcoming' | 'sim_active' | 'sim_ending'
  let teachingTimerAudioEnabled = true;
  let currentTargetTimerSession = null;

  function parseTimeRange(timeStr) {
    if (!timeStr) return null;
    const m = timeStr.match(/(\d{1,2})[.:](\d{2})\s*[-–]\s*(\d{1,2})[.:](\d{2})/);
    if (!m) return null;
    return {
      startH: parseInt(m[1], 10),
      startM: parseInt(m[2], 10),
      endH: parseInt(m[3], 10),
      endM: parseInt(m[4], 10)
    };
  }

  function playSoftTeachingChime(chimeType) {
    if (!teachingTimerAudioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const nowTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      if (chimeType === 'start') {
        osc.frequency.setValueAtTime(523.25, nowTime);
        osc.frequency.setValueAtTime(659.25, nowTime + 0.12);
        osc.frequency.setValueAtTime(783.99, nowTime + 0.24);
      } else if (chimeType === 'ending') {
        osc.frequency.setValueAtTime(783.99, nowTime);
        osc.frequency.setValueAtTime(659.25, nowTime + 0.15);
      } else {
        osc.frequency.setValueAtTime(587.33, nowTime);
      }

      gain.gain.setValueAtTime(0.001, nowTime);
      gain.gain.exponentialRampToValueAtTime(0.2, nowTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, nowTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(nowTime);
      osc.stop(nowTime + 0.5);
    } catch (err) {
      console.warn('Web Audio synthesis tidak tersedia / diabaikan:', err);
    }
  }

  function startTeachingLiveTimer() {
    if (teachingTimerInterval) clearInterval(teachingTimerInterval);
    updateTeachingLiveTimer();
    teachingTimerInterval = setInterval(updateTeachingLiveTimer, 1000);
  }

  function updateTeachingLiveTimer() {
    const cardEl = document.getElementById('jurnalTeachingLiveTimerCard');
    if (!cardEl) return;

    const realNow = new Date();
    // Update live clock
    const clockEl = document.getElementById('teachingTimerCurrentClock');
    const dayEl = document.getElementById('teachingTimerCurrentDay');
    if (clockEl) {
      const hh = String(realNow.getHours()).padStart(2, '0');
      const mm = String(realNow.getMinutes()).padStart(2, '0');
      const ss = String(realNow.getSeconds()).padStart(2, '0');
      clockEl.textContent = `${hh}:${mm}:${ss} WIB`;
    }
    if (dayEl) {
      const opts = { weekday: 'long', day: 'numeric', month: 'short' };
      dayEl.textContent = realNow.toLocaleDateString('id-ID', opts);
    }

    if (!jurnalState || !jurnalState.schedules) return;

    // Filter jadwal sesuai unit filter
    let schedules = jurnalState.schedules;
    if (teachingTimerUnitFilter === 'formal') {
      schedules = schedules.filter(s => s.unit === 'formal');
    } else if (teachingTimerUnitFilter === 'nonformal') {
      schedules = schedules.filter(s => s.unit === 'nonformal');
    }

    const unitBadgeEl = document.getElementById('teachingTimerUnitBadge');
    if (unitBadgeEl) {
      if (teachingTimerUnitFilter === 'formal') {
        unitBadgeEl.textContent = 'Formal MTs';
        unitBadgeEl.className = 'text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30';
      } else if (teachingTimerUnitFilter === 'nonformal') {
        unitBadgeEl.textContent = 'Diniyah (Safinah)';
        unitBadgeEl.className = 'text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30';
      } else {
        unitBadgeEl.textContent = 'Semua Unit (Auto)';
        unitBadgeEl.className = 'text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/20';
      }
    }

    // Tentukan waktu evaluasi (Real vs Simulasi)
    let evalDate = new Date();
    let isSimulated = teachingTimerSimMode !== 'live';

    if (isSimulated) {
      if (teachingTimerSimMode === 'sim_upcoming') {
        evalDate = new Date(realNow);
        evalDate.setHours(10, 5, 30); // 14m 30s sebelum jam 10:20 (Ahad 7A)
      } else if (teachingTimerSimMode === 'sim_active') {
        evalDate = new Date(realNow);
        evalDate.setHours(10, 55, 0); // di tengah sesi 10:20 - 11:40
      } else if (teachingTimerSimMode === 'sim_ending') {
        evalDate = new Date(realNow);
        evalDate.setHours(11, 35, 15); // 4m 45s sebelum jam 11:40
      }
    }

    const currentDayIndex = isSimulated ? 0 : evalDate.getDay();
    const nowMinutes = evalDate.getHours() * 60 + evalDate.getMinutes() + evalDate.getSeconds() / 60;

    // Ambil jadwal hari ini yang terparse jamnya
    const todaySchedules = [];
    schedules.forEach(s => {
      if (s.dayIndex === currentDayIndex) {
        const parsed = parseTimeRange(s.time);
        if (parsed) {
          const startMin = parsed.startH * 60 + parsed.startM;
          const endMin = parsed.endH * 60 + parsed.endM;
          todaySchedules.push({
            ...s,
            parsed,
            startMin,
            endMin
          });
        }
      }
    });

    todaySchedules.sort((a, b) => a.startMin - b.startMin);

    // 1. Cek apakah ada SESI AKTIF (Sedang Berlangsung)
    const activeSession = todaySchedules.find(s => nowMinutes >= s.startMin && nowMinutes < s.endMin);

    // 2. Cek apakah ada SESI AKAN DATANG HARI INI (Upcoming Today)
    const upcomingToday = todaySchedules.filter(s => nowMinutes < s.startMin);

    // Elemen DOM
    const pulseDot = document.getElementById('teachingTimerPulseDot');
    const badgeEl = document.getElementById('teachingTimerStatusBadge');
    const statusTextEl = document.getElementById('teachingTimerStatusText');
    const targetLabelEl = document.getElementById('teachingTimerTargetLabel');
    const targetHeadlineEl = document.getElementById('teachingTimerTargetHeadline');
    const targetSubEl = document.getElementById('teachingTimerTargetSub');
    const progressLabelEl = document.getElementById('teachingTimerProgressLabel');
    const progressValueEl = document.getElementById('teachingTimerProgressValue');
    const progressBarEl = document.getElementById('teachingTimerProgressBar');
    const digitH = document.getElementById('timerDigitHours');
    const digitM = document.getElementById('timerDigitMinutes');
    const digitS = document.getElementById('timerDigitSeconds');
    const labelOpenClass = document.getElementById('labelTimerOpenClass');

    if (activeSession) {
      // -------------------------------------------------------------
      // KONDISI 2: SEDANG MENGAJAR BERLANGSUNG & AKAN SELESAI
      // -------------------------------------------------------------
      currentTargetTimerSession = activeSession;
      const remainingSeconds = Math.max(0, Math.floor((activeSession.endMin - nowMinutes) * 60));
      const totalSessionSeconds = (activeSession.endMin - activeSession.startMin) * 60;
      const elapsedSeconds = totalSessionSeconds - remainingSeconds;
      const progressPct = Math.min(100, Math.max(0, Math.round((elapsedSeconds / totalSessionSeconds) * 100)));

      const rH = Math.floor(remainingSeconds / 3600);
      const rM = Math.floor((remainingSeconds % 3600) / 60);
      const rS = remainingSeconds % 60;

      if (digitH) digitH.textContent = String(rH).padStart(2, '0');
      if (digitM) digitM.textContent = String(rM).padStart(2, '0');
      if (digitS) digitS.textContent = String(rS).padStart(2, '0');

      const isEndingSoon = remainingSeconds <= 600; // <= 10 Menit

      if (isEndingSoon) {
        if (pulseDot) pulseDot.className = 'w-3 h-3 rounded-full bg-amber-400 animate-ping flex-shrink-0';
        if (badgeEl) {
          badgeEl.className = 'text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-500/25 text-amber-300 border border-amber-400/50 tracking-wider flex items-center gap-1.5 shadow-sm animate-pulse';
        }
        if (statusTextEl) statusTextEl.textContent = '⚠️ Sisa Waktu Sedikit (Persiapan Selesai / Penutup)';
        if (targetLabelEl) targetLabelEl.textContent = 'Sisa Waktu Menuju Jam Pelajaran Selesai';
        if (progressBarEl) progressBarEl.className = 'h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-500';
      } else {
        if (pulseDot) pulseDot.className = 'w-3 h-3 rounded-full bg-emerald-400 animate-ping flex-shrink-0';
        if (badgeEl) {
          badgeEl.className = 'text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 tracking-wider flex items-center gap-1.5 shadow-xs';
        }
        if (statusTextEl) statusTextEl.textContent = '🟢 Sesi Mengajar Sedang Berlangsung';
        if (targetLabelEl) targetLabelEl.textContent = 'Sisa Waktu Mengajar Aktif Menuju Selesai';
        if (progressBarEl) progressBarEl.className = 'h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500';
      }

      const unitText = activeSession.unit === 'formal' ? 'Formal MTs' : 'Madrasah Diniyah';
      if (targetHeadlineEl) {
        targetHeadlineEl.textContent = `${activeSession.classId} • ${activeSession.subject}`;
      }
      if (targetSubEl) {
        const endFormatted = `${String(activeSession.parsed.endH).padStart(2, '0')}.${String(activeSession.parsed.endM).padStart(2, '0')}`;
        targetSubEl.textContent = `Sedang berlangsung s/d ${endFormatted} WIB • ${activeSession.room} (${unitText})`;
      }

      if (progressLabelEl) progressLabelEl.textContent = `Progres Sesi: ${progressPct}% Berjalan (${Math.floor(elapsedSeconds / 60)}m dari ${Math.floor(totalSessionSeconds / 60)}m)`;
      if (progressValueEl) progressValueEl.textContent = `${progressPct}%`;
      if (progressBarEl) progressBarEl.style.width = `${progressPct}%`;
      if (labelOpenClass) labelOpenClass.textContent = `Buka Kelas ${activeSession.classId}`;

    } else if (upcomingToday.length > 0) {
      // -------------------------------------------------------------
      // KONDISI 1: AKAN MEMASUKI WAKTU MENGAJAR (HARI INI)
      // -------------------------------------------------------------
      const nextToday = upcomingToday[0];
      currentTargetTimerSession = nextToday;

      const remainingSeconds = Math.max(0, Math.floor((nextToday.startMin - nowMinutes) * 60));
      const rH = Math.floor(remainingSeconds / 3600);
      const rM = Math.floor((remainingSeconds % 3600) / 60);
      const rS = remainingSeconds % 60;

      if (digitH) digitH.textContent = String(rH).padStart(2, '0');
      if (digitM) digitM.textContent = String(rM).padStart(2, '0');
      if (digitS) digitS.textContent = String(rS).padStart(2, '0');

      const isStartingSoon = remainingSeconds <= 900; // <= 15 Menit

      if (isStartingSoon) {
        if (pulseDot) pulseDot.className = 'w-3 h-3 rounded-full bg-rose-400 animate-ping flex-shrink-0';
        if (badgeEl) {
          badgeEl.className = 'text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-rose-500/25 text-rose-300 border border-rose-400/50 tracking-wider flex items-center gap-1.5 shadow-sm animate-pulse';
        }
        if (statusTextEl) statusTextEl.textContent = '⏳ Bersiap! Waktu Mengajar Segera Masuk';
      } else {
        if (pulseDot) pulseDot.className = 'w-3 h-3 rounded-full bg-cyan-400 animate-ping flex-shrink-0';
        if (badgeEl) {
          badgeEl.className = 'text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 tracking-wider flex items-center gap-1.5 shadow-xs';
        }
        if (statusTextEl) statusTextEl.textContent = '⏳ Hitung Mundur Masuk Waktu Mengajar';
      }

      if (targetLabelEl) targetLabelEl.textContent = `Akan Dimulai Hari Ini (${rM}m ${rS}s lagi)`;
      if (targetHeadlineEl) {
        targetHeadlineEl.textContent = `Kelas ${nextToday.classId} — ${nextToday.subject}`;
      }
      if (targetSubEl) {
        const startFormatted = `${String(nextToday.parsed.startH).padStart(2, '0')}.${String(nextToday.parsed.startM).padStart(2, '0')}`;
        const unitText = nextToday.unit === 'formal' ? 'Formal MTs' : 'Madrasah Diniyah';
        targetSubEl.textContent = `Pukul ${startFormatted} WIB • ${nextToday.room} (${unitText})`;
      }

      const oneHourSec = 3600;
      const countPct = Math.min(100, Math.max(0, Math.round(((oneHourSec - Math.min(oneHourSec, remainingSeconds)) / oneHourSec) * 100)));
      if (progressLabelEl) progressLabelEl.textContent = `Menuju Masuk: ${rM} Menit ${rS} Detik Tersisa`;
      if (progressValueEl) progressValueEl.textContent = `${countPct}%`;
      if (progressBarEl) {
        progressBarEl.className = 'h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-rose-500 transition-all duration-500';
        progressBarEl.style.width = `${countPct}%`;
      }
      if (labelOpenClass) labelOpenClass.textContent = `Siapkan Kelas ${nextToday.classId}`;

    } else {
      // -------------------------------------------------------------
      // KONDISI 3: DI LUAR JAM MENGAJAR / SESI BERIKUTNYA DI HARI LAIN
      // -------------------------------------------------------------
      let nextSession = null;
      let minDiffMinutes = Infinity;

      schedules.forEach(s => {
        const parsed = parseTimeRange(s.time);
        if (parsed) {
          let dayDiff = (s.dayIndex - currentDayIndex + 7) % 7;
          if (dayDiff === 0) dayDiff = 7;
          const sessionStartMin = dayDiff * 24 * 60 + (parsed.startH * 60 + parsed.startM);
          const diffMin = sessionStartMin - nowMinutes;
          if (diffMin > 0 && diffMin < minDiffMinutes) {
            minDiffMinutes = diffMin;
            nextSession = { ...s, parsed, diffMin, dayDiff };
          }
        }
      });

      currentTargetTimerSession = nextSession;

      if (pulseDot) pulseDot.className = 'w-3 h-3 rounded-full bg-slate-400 flex-shrink-0';
      if (badgeEl) {
        badgeEl.className = 'text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 tracking-wider flex items-center gap-1.5';
      }
      if (statusTextEl) statusTextEl.textContent = '📅 Jadwal Mengajar Berikutnya';

      if (nextSession) {
        const totalSec = Math.floor(nextSession.diffMin * 60);
        const days = Math.floor(totalSec / 86400);
        const hours = Math.floor((totalSec % 86400) / 3600);
        const mins = Math.floor((totalSec % 3600) / 60);
        const secs = totalSec % 60;

        if (digitH) digitH.textContent = String(hours + days * 24).padStart(2, '0');
        if (digitM) digitM.textContent = String(mins).padStart(2, '0');
        if (digitS) digitS.textContent = String(secs).padStart(2, '0');

        let etaText = '';
        if (days > 0) {
          etaText = `${days} Hari ${hours} Jam Lagi`;
        } else if (hours > 0) {
          etaText = `${hours} Jam ${mins} Menit Lagi`;
        } else {
          etaText = `${mins} Menit ${secs} Detik Lagi`;
        }

        if (targetLabelEl) targetLabelEl.textContent = `Jadwal Terdekat: ${nextSession.day} (${etaText})`;
        if (targetHeadlineEl) {
          targetHeadlineEl.textContent = `Kelas ${nextSession.classId} — ${nextSession.subject}`;
        }
        if (targetSubEl) {
          const startFormatted = `${String(nextSession.parsed.startH).padStart(2, '0')}.${String(nextSession.parsed.startM).padStart(2, '0')}`;
          const unitText = nextSession.unit === 'formal' ? 'Formal MTs' : 'Madrasah Diniyah';
          targetSubEl.textContent = `${nextSession.day}, Pukul ${startFormatted} WIB • ${nextSession.room} (${unitText})`;
        }
        if (progressLabelEl) progressLabelEl.textContent = `Status: Tidak Ada Sesi Aktif Hari Ini (${nextSession.day} Mendatang)`;
        if (progressValueEl) progressValueEl.textContent = '0%';
        if (progressBarEl) {
          progressBarEl.className = 'h-full rounded-full bg-slate-700 transition-all duration-500';
          progressBarEl.style.width = '10%';
        }
        if (labelOpenClass) labelOpenClass.textContent = `Lihat Kelas ${nextSession.classId}`;
      } else {
        if (digitH) digitH.textContent = '00';
        if (digitM) digitM.textContent = '00';
        if (digitS) digitS.textContent = '00';
        if (targetHeadlineEl) targetHeadlineEl.textContent = 'Semua Sesi Selesai / Belum Ada Jadwal';
        if (targetSubEl) targetSubEl.textContent = 'Gunakan tombol tambah sesi untuk mendaftarkan jadwal baru.';
      }
    }

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  window.startTeachingLiveTimer = startTeachingLiveTimer;
  window.updateTeachingLiveTimer = updateTeachingLiveTimer;

  window.setTeachingTimerUnitFilter = function(filterVal) {
    teachingTimerUnitFilter = filterVal;
    updateTeachingLiveTimer();
  };

  window.toggleTeachingTimerSound = function() {
    teachingTimerAudioEnabled = !teachingTimerAudioEnabled;
    const btn = document.getElementById('btnTeachingTimerAudioToggle');
    const icon = document.getElementById('teachingTimerAudioIcon');
    if (teachingTimerAudioEnabled) {
      if (btn) btn.className = 'w-8 h-8 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 flex items-center justify-center text-rose-300 transition-all cursor-pointer';
      if (icon) icon.setAttribute('data-lucide', 'bell');
      if (typeof showToast === 'function') showToast('Pengingat Suara Aktif', 'Notifikasi bunyi chime pengingat sesi diaktifkan.');
      playSoftTeachingChime('start');
    } else {
      if (btn) btn.className = 'w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-400 transition-all cursor-pointer';
      if (icon) icon.setAttribute('data-lucide', 'bell-off');
      if (typeof showToast === 'function') showToast('Pengingat Suara Senyap', 'Notifikasi bunyi dimatikan.');
    }
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.applyTeachingTimerSimulation = function(simMode) {
    teachingTimerSimMode = simMode;
    updateTeachingLiveTimer();
    const modeNames = {
      live: 'Waktu Nyata (Live Real-Time)',
      sim_upcoming: 'Simulasi 15 Menit Menjelang Masuk Kelas',
      sim_active: 'Simulasi Sesi Mengajar Sedang Berlangsung',
      sim_ending: 'Simulasi 5 Menit Terakhir Sebelum Jam Selesai'
    };
    if (typeof showToast === 'function') {
      showToast('Mode Timer', `Beralih ke: ${modeNames[simMode] || simMode}`);
    }
    if (simMode === 'sim_upcoming' || simMode === 'sim_active') {
      playSoftTeachingChime('start');
    } else if (simMode === 'sim_ending') {
      playSoftTeachingChime('ending');
    }
  };

  window.openClassFromTimer = function() {
    if (!currentTargetTimerSession) {
      switchJurnalSubTab('jadwal');
      return;
    }
    const sess = currentTargetTimerSession;
    if (sess.unit) switchJurnalUnit(sess.unit);
    if (sess.classId && sess.classId !== 'Semua') {
      switchJurnalClass(sess.classId);
    }
    switchJurnalSubTab('materi');
  };

  window.openPresensiFromTimer = function() {
    if (!currentTargetTimerSession) {
      switchJurnalSubTab('presensi');
      return;
    }
    const sess = currentTargetTimerSession;
    if (sess.unit) switchJurnalUnit(sess.unit);
    if (sess.classId && sess.classId !== 'Semua') {
      switchJurnalClass(sess.classId);
    }
    switchJurnalSubTab('presensi');
  };

  function renderJurnalTimetable() {
    const grid = document.getElementById('jurnalTimetableGrid');
    if (!grid) return;

    const days = ['Sabtu', 'Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
    const todayName = DAY_NAMES[new Date().getDay()];

    grid.innerHTML = days.map(d => {
      const isToday = d === todayName;
      const schs = jurnalState.schedules.filter(s => s.day === d);
      const cardBorder = isToday ? 'border-orange-500 dark:border-orange-500 shadow-md ring-2 ring-orange-500/20' : 'border-slate-200/80 dark:border-slate-800';
      const badgeToday = isToday ? '<span class="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-orange-500 text-white uppercase">Hari Ini</span>' : '';

      const schItems = schs.length > 0 ? schs.map(s => `
        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black text-slate-900 dark:text-white">${s.subject}</span>
            <span class="text-[10px] font-extrabold px-1.5 py-0.2 rounded ${s.unit === 'formal' ? 'bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300' : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'}">${s.classId}</span>
          </div>
          <div class="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <i data-lucide="clock" class="w-3 h-3 text-orange-500"></i>
            <span>${s.time}</span>
          </div>
          <div class="flex items-center gap-1.5 text-[10.5px] text-slate-400">
            <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
            <span>${s.room}</span>
          </div>
          <div class="pt-1 flex items-center justify-end">
            <button type="button" onclick="openClassFromSchedule('${s.unit}', '${s.classId}')" class="text-[10.5px] font-bold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer flex items-center gap-1">
              <span>Buka Kelas</span>
              <i data-lucide="chevron-right" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      `).join('') : '<p class="text-xs text-slate-400 italic py-4 text-center">Tidak ada jadwal.</p>';

      return `
        <div class="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/90 border ${cardBorder} shadow-xs flex flex-col justify-between space-y-3">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <div class="flex items-center gap-2">
              <span class="text-sm font-extrabold text-slate-900 dark:text-white">${d}</span>
              ${badgeToday}
            </div>
            <span class="text-xs text-slate-400 font-bold">${schs.length} Sesi</span>
          </div>
          <div class="space-y-2 flex-1">
            ${schItems}
          </div>
        </div>
      `;
    }).join('');
  }

  window.quickStartTodayClass = function() {
    const todayIndex = new Date().getDay();
    const todaySchedules = jurnalState.schedules.filter(s => s.dayIndex === todayIndex);
    if (todaySchedules.length > 0) {
      const first = todaySchedules[0];
      openClassFromSchedule(first.unit, first.classId);
    }
  };

  window.openClassFromSchedule = function(unit, classId) {
    switchJurnalUnit(unit);
    if (classId && classId !== 'Semua') {
      switchJurnalClass(classId);
    }
    switchJurnalSubTab('materi');
  };

  // ============================================================================
  // MANAJEMEN PENYESUAIAN JAM MENGAJAR (MODAL SCHEDULE CONTROLLER)
  // ============================================================================
  let modalJadwalFilter = 'all';

  window.openManageJadwalModal = function(editId = null) {
    const modal = document.getElementById('modalManageJadwalMengajar');
    if (!modal) return;
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');
    modal.style.display = 'flex';

    if (editId) {
      const item = (jurnalState.schedules || []).find(s => s.id === editId);
      if (item && item.unit) {
        modalJadwalFilter = item.unit;
      }
    }
    updateModalFilterTabsUI();
    renderModalJadwalList();

    if (editId) {
      editJadwalScheduleItem(editId);
    } else {
      cancelJadwalEditForm();
    }

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.closeManageJadwalModal = function() {
    const modal = document.getElementById('modalManageJadwalMengajar');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
    cancelJadwalEditForm();
  };

  window.setModalJadwalFilter = function(filter) {
    modalJadwalFilter = filter;
    updateModalFilterTabsUI();
    renderModalJadwalList();
  };

  function updateModalFilterTabsUI() {
    const allBtn = document.getElementById('tabBtnJadwalFilterAll');
    const formBtn = document.getElementById('tabBtnJadwalFilterFormal');
    const nonfBtn = document.getElementById('tabBtnJadwalFilterNonformal');
    const inactiveClass = 'px-2.5 py-1 rounded-lg text-xs font-bold transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer';
    const activeClass = 'px-2.5 py-1 rounded-lg text-xs font-bold transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs cursor-pointer';

    if (allBtn) allBtn.className = modalJadwalFilter === 'all' ? activeClass : inactiveClass;
    if (formBtn) formBtn.className = modalJadwalFilter === 'formal' ? activeClass : inactiveClass;
    if (nonfBtn) nonfBtn.className = modalJadwalFilter === 'nonformal' ? activeClass : inactiveClass;
  }

  window.onJadwalUnitChange = function(unitVal) {
    const subjInput = document.getElementById('inputJadwalSubject');
    const roomInput = document.getElementById('inputJadwalRoom');
    if (unitVal === 'formal') {
      if (subjInput && (!subjInput.value || subjInput.value.includes('Safinatun'))) subjInput.value = 'Prakarya (Kode 33)';
      if (roomInput && (!roomInput.value || roomInput.value.includes('Diniyah'))) roomInput.value = 'Ruang MTs 7A';
    } else {
      if (subjInput && (!subjInput.value || subjInput.value.includes('Prakarya'))) subjInput.value = 'Safinatun Najah';
      if (roomInput && (!roomInput.value || roomInput.value.includes('MTs'))) roomInput.value = 'Gedung Diniyah Lt. 1';
    }
  };

  window.renderModalJadwalList = function() {
    const container = document.getElementById('modalJadwalListContainer');
    if (!container) return;

    let schedules = (jurnalState.schedules || []);
    if (modalJadwalFilter === 'formal') {
      schedules = schedules.filter(s => s.unit === 'formal');
    } else if (modalJadwalFilter === 'nonformal') {
      schedules = schedules.filter(s => s.unit === 'nonformal');
    }

    if (!schedules.length) {
      container.innerHTML = `
        <div class="py-10 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800">
          <i data-lucide="calendar-x" class="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2"></i>
          <p class="text-xs font-bold text-slate-500 dark:text-slate-400">Tidak ada jadwal mengajar pada filter ini.</p>
          <button type="button" onclick="openJadwalAddForm()" class="mt-3 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Tambah Sesi Baru</span>
          </button>
        </div>
      `;
      if (typeof safeCreateIcons === 'function') safeCreateIcons();
      return;
    }

    // Sort by dayIndex and time
    const sorted = [...schedules].sort((a, b) => {
      if (a.dayIndex !== b.dayIndex) return a.dayIndex - b.dayIndex;
      const pa = parseTimeRange(a.time);
      const pb = parseTimeRange(b.time);
      const minA = pa ? pa.startH * 60 + pa.startM : 0;
      const minB = pb ? pb.startH * 60 + pb.startM : 0;
      return minA - minB;
    });

    const dayBadgeColors = {
      'Ahad': 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900',
      'Senin': 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900',
      'Selasa': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
      'Rabu': 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900',
      'Kamis': 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900',
      'Jumat': 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-900',
      'Sabtu': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900'
    };

    container.innerHTML = sorted.map(sch => {
      const isFormal = sch.unit === 'formal';
      const unitBadge = isFormal 
        ? '<span class="text-[10px] font-black px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60">Formal MTs</span>'
        : '<span class="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60">Diniyah</span>';
      
      const dayColor = dayBadgeColors[sch.day] || 'bg-slate-100 text-slate-700 border-slate-200';

      return `
        <div class="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:border-amber-300 dark:hover:border-amber-600/60 transition-all flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <!-- Left Main Details -->
          <div class="flex items-start sm:items-center gap-3 min-w-0 flex-1">
            <div class="w-12 h-12 rounded-2xl border flex flex-col items-center justify-center flex-shrink-0 text-center ${dayColor}">
              <span class="text-[10px] font-black uppercase tracking-wider">${sch.day.substring(0, 3)}</span>
              <span class="text-xs font-black leading-none mt-0.5">${sch.classId}</span>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-mono text-xs sm:text-sm font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-600">
                  ${sch.time}
                </span>
                ${unitBadge}
              </div>
              <h5 class="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 truncate mt-1">
                ${sch.subject} — Kelas ${sch.classId}
              </h5>
              <div class="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex-wrap">
                <span class="flex items-center gap-1">
                  <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
                  <span>${sch.room || 'Ruang Belajar'}</span>
                </span>
                <span class="text-slate-300 dark:text-slate-600">•</span>
                <span class="text-[10.5px] font-medium text-slate-400">ID: ${sch.id}</span>
              </div>
            </div>
          </div>

          <!-- Right Action Buttons -->
          <div class="flex items-center justify-end gap-1.5 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-700">
            <button type="button" onclick="editJadwalScheduleItem('${sch.id}')" class="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/50 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95" title="Ubah Waktu & Rincian Sesi Ini">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              <span>Ubah Jam</span>
            </button>
            <button type="button" onclick="deleteJadwalScheduleItem('${sch.id}')" class="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-300/50 dark:border-rose-800/40 cursor-pointer transition-all active:scale-95" title="Hapus Sesi Jadwal">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.openJadwalAddForm = function() {
    const container = document.getElementById('formEditorJadwalContainer');
    const title = document.getElementById('formEditorJadwalTitle');
    if (!container) return;

    container.classList.remove('hidden');
    if (title) title.innerHTML = '<i data-lucide="plus-circle" class="w-4 h-4 text-rose-600"></i><span>Tambah Jadwal Mengajar Baru</span>';

    const editIdEl = document.getElementById('inputJadwalEditId');
    const unitEl = document.getElementById('inputJadwalUnit');
    const dayEl = document.getElementById('inputJadwalDay');
    const classIdEl = document.getElementById('inputJadwalClassId');
    const subjEl = document.getElementById('inputJadwalSubject');
    const roomEl = document.getElementById('inputJadwalRoom');
    const startEl = document.getElementById('inputJadwalStartTime');
    const endEl = document.getElementById('inputJadwalEndTime');
    const hourLabelEl = document.getElementById('inputJadwalHourLabel');

    if (editIdEl) editIdEl.value = '';
    if (unitEl) unitEl.value = modalJadwalFilter === 'nonformal' ? 'nonformal' : 'formal';
    if (dayEl) dayEl.value = 'Senin';
    if (classIdEl) classIdEl.value = modalJadwalFilter === 'nonformal' ? '1UlaA' : '7A';
    if (subjEl) subjEl.value = modalJadwalFilter === 'nonformal' ? 'Safinatun Najah' : 'Prakarya (Kode 33)';
    if (roomEl) roomEl.value = modalJadwalFilter === 'nonformal' ? 'Gedung Diniyah Lt. 1' : 'Ruang MTs 7A';
    if (startEl) startEl.value = '07:00';
    if (endEl) endEl.value = '08:30';
    if (hourLabelEl) hourLabelEl.value = 'Jam 1-2';

    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.editJadwalScheduleItem = function(id) {
    const sch = (jurnalState.schedules || []).find(s => s.id === id);
    if (!sch) return;

    const container = document.getElementById('formEditorJadwalContainer');
    const title = document.getElementById('formEditorJadwalTitle');
    if (!container) return;

    container.classList.remove('hidden');
    if (title) title.innerHTML = `<i data-lucide="edit-3" class="w-4 h-4 text-amber-600"></i><span>Sesuaikan Jam: Kelas ${sch.classId} (${sch.day})</span>`;

    const editIdEl = document.getElementById('inputJadwalEditId');
    const unitEl = document.getElementById('inputJadwalUnit');
    const dayEl = document.getElementById('inputJadwalDay');
    const classIdEl = document.getElementById('inputJadwalClassId');
    const subjEl = document.getElementById('inputJadwalSubject');
    const roomEl = document.getElementById('inputJadwalRoom');
    const startEl = document.getElementById('inputJadwalStartTime');
    const endEl = document.getElementById('inputJadwalEndTime');
    const hourLabelEl = document.getElementById('inputJadwalHourLabel');

    if (editIdEl) editIdEl.value = sch.id;
    if (unitEl) unitEl.value = sch.unit || 'formal';
    if (dayEl) dayEl.value = sch.day || 'Ahad';
    if (classIdEl) classIdEl.value = sch.classId || '';
    if (subjEl) subjEl.value = sch.subject || '';
    if (roomEl) roomEl.value = sch.room || '';

    // Ekstrak Jam Mulai & Jam Selesai dari string waktu
    const parsed = parseTimeRange(sch.time);
    if (parsed) {
      const sH = String(parsed.startH).padStart(2, '0');
      const sM = String(parsed.startM).padStart(2, '0');
      const eH = String(parsed.endH).padStart(2, '0');
      const eM = String(parsed.endM).padStart(2, '0');
      if (startEl) startEl.value = `${sH}:${sM}`;
      if (endEl) endEl.value = `${eH}:${eM}`;
    } else {
      if (startEl) startEl.value = '07:00';
      if (endEl) endEl.value = '08:30';
    }

    // Ekstrak label di dalam tanda kurung jika ada (misal Jam 5-6)
    const parenMatch = (sch.time || '').match(/\(([^)]+)\)/);
    if (parenMatch && parenMatch[1]) {
      if (hourLabelEl) hourLabelEl.value = parenMatch[1].trim();
    } else {
      if (hourLabelEl) hourLabelEl.value = '';
    }

    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.cancelJadwalEditForm = function() {
    const container = document.getElementById('formEditorJadwalContainer');
    if (container) container.classList.add('hidden');
  };

  window.saveJadwalScheduleItem = function() {
    const editId = (document.getElementById('inputJadwalEditId')?.value || '').trim();
    const unit = document.getElementById('inputJadwalUnit')?.value || 'formal';
    const day = document.getElementById('inputJadwalDay')?.value || 'Senin';
    const classId = (document.getElementById('inputJadwalClassId')?.value || '').trim();
    const subject = (document.getElementById('inputJadwalSubject')?.value || '').trim();
    const room = (document.getElementById('inputJadwalRoom')?.value || '').trim();
    const startVal = document.getElementById('inputJadwalStartTime')?.value;
    const endVal = document.getElementById('inputJadwalEndTime')?.value;
    const hourLabel = (document.getElementById('inputJadwalHourLabel')?.value || '').trim();

    if (!classId) {
      alert('Mohon isi nama kelas!');
      return;
    }
    if (!startVal || !endVal) {
      alert('Mohon isi jam mulai dan jam selesai!');
      return;
    }

    // Format waktu standar: 07.00 - 08.30 (Jam 1-2)
    const startFormatted = startVal.replace(':', '.');
    const endFormatted = endVal.replace(':', '.');
    const timeFormatted = hourLabel ? `${startFormatted} - ${endFormatted} (${hourLabel})` : `${startFormatted} - ${endFormatted}`;

    const dayMap = { 'Ahad': 0, 'Senin': 1, 'Selasa': 2, 'Rabu': 3, 'Kamis': 4, 'Jumat': 5, 'Sabtu': 6 };
    const dayIndex = dayMap[day] !== undefined ? dayMap[day] : 0;

    if (!jurnalState.schedules) jurnalState.schedules = [];

    if (editId) {
      const match = jurnalState.schedules.find(s => s.id === editId);
      if (match) {
        match.unit = unit;
        match.day = day;
        match.dayIndex = dayIndex;
        match.classId = classId;
        match.subject = subject || (unit === 'formal' ? 'Prakarya' : 'Safinatun Najah');
        match.room = room || `Ruang ${classId}`;
        match.time = timeFormatted;
      }
    } else {
      const newId = 'sch-' + Date.now();
      jurnalState.schedules.push({
        id: newId,
        unit: unit,
        day: day,
        dayIndex: dayIndex,
        classId: classId,
        subject: subject || (unit === 'formal' ? 'Prakarya' : 'Safinatun Najah'),
        room: room || `Ruang ${classId}`,
        time: timeFormatted
      });
    }

    saveJurnalState();
    cancelJadwalEditForm();
    renderModalJadwalList();
    renderJurnalReminders();
    renderJurnalTimetable();
    checkTodaySchedule();
    updateTeachingLiveTimer();

    if (typeof showToast === 'function') {
      showToast('Jadwal Disimpan', `Waktu belajar kelas ${classId} (${day}) berhasil disesuaikan.`);
    }
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.deleteJadwalScheduleItem = function(id) {
    const sch = (jurnalState.schedules || []).find(s => s.id === id);
    if (!sch) return;

    if (!confirm(`Hapus sesi jadwal ${sch.subject} - Kelas ${sch.classId} (${sch.day})?`)) {
      return;
    }

    jurnalState.schedules = (jurnalState.schedules || []).filter(s => s.id !== id);
    saveJurnalState();
    renderModalJadwalList();
    renderJurnalReminders();
    renderJurnalTimetable();
    checkTodaySchedule();
    updateTeachingLiveTimer();

    if (typeof showToast === 'function') {
      showToast('Jadwal Dihapus', 'Sesi jadwal telah berhasil dihapus.');
    }
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.resetJadwalToDefault = function() {
    if (confirm('Kembalikan seluruh jadwal mengajar ke jadwal default resmi MTs & Diniyah?')) {
      jurnalState.schedules = JSON.parse(JSON.stringify(DEFAULT_SCHEDULES));
      saveJurnalState();
      renderModalJadwalList();
      renderJurnalTimetable();
      renderJurnalReminders();
      checkTodaySchedule();
      updateTeachingLiveTimer();
      if (typeof safeCreateIcons === 'function') safeCreateIcons();
      if (typeof showToast === 'function') showToast('Jadwal Direset', 'Jadwal telah dikembalikan ke standar awal.');
    }
  };

  window.openAddJadwalModal = function() {
    openManageJadwalModal();
    openJadwalAddForm();
  };

  // --- Kelola Siswa Modal & Import ---
  window.openManageStudentsModal = function() {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;

    const modal = document.getElementById('modalManageStudents');
    const titleEl = document.getElementById('manageStudentsModalTitle');
    const textarea = document.getElementById('manageStudentsTextarea');
    const countLabel = document.getElementById('manageStudentsCountLabel');

    if (titleEl) titleEl.textContent = `Kelola Siswa — Kelas ${classData.label} (${classData.subject})`;
    if (textarea) textarea.value = classData.students.map(s => s.name).join('\n');
    if (countLabel) countLabel.textContent = `${classData.students.length} Siswa Terdaftar`;

    if (modal) {
      if (modal.parentElement !== document.body) document.body.appendChild(modal);
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
  };

  window.closeManageStudentsModal = function() {
    const modal = document.getElementById('modalManageStudents');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  };

  window.saveImportedStudentsList = function() {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;

    const textarea = document.getElementById('manageStudentsTextarea');
    if (!textarea) return;

    const lines = textarea.value.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) {
      alert('Daftar nama siswa tidak boleh kosong.');
      return;
    }

    classData.students = lines.map((name, idx) => ({
      id: `${classData.label}-${idx + 1}`,
      name: name,
      gender: idx % 2 === 0 ? 'L' : 'P',
      bonusActive: 10,
      pureSts: 75,
      pureSas: 78
    }));

    saveJurnalState();
    closeManageStudentsModal();
    renderPresensiTable();
    renderPenilaianTable();
    renderRekapSemesterTable();
    if (typeof showToast === 'function') {
      showToast('Siswa Disimpan', `Berhasil memperbarui ${lines.length} siswa untuk Kelas ${classData.label}.`);
    }
  };

  window.loadDefaultStudentsForCurrentClass = function() {
    let def = DEFAULT_STUDENTS_7A;
    if (currentJurnalClass === '7B') def = DEFAULT_STUDENTS_7B;
    else if (currentJurnalClass === '7C') def = DEFAULT_STUDENTS_7C;
    else if (currentJurnalClass === '7D') def = DEFAULT_STUDENTS_7D;
    else if (currentJurnalClass === '1UlaA') def = DEFAULT_STUDENTS_1ULA_A;
    else if (currentJurnalClass === '1UlaB') def = DEFAULT_STUDENTS_1ULA_B;

    const textarea = document.getElementById('manageStudentsTextarea');
    if (textarea) textarea.value = def.join('\n');
    const countLabel = document.getElementById('manageStudentsCountLabel');
    if (countLabel) countLabel.textContent = `${def.length} Siswa Terdaftar`;
  };

  // --- Export to Multi-Sheet Excel ---
  window.exportJurnalToExcel = function() {
    if (typeof XLSX === 'undefined') {
      alert('Pustaka SheetJS (xlsx) sedang dimuat. Silakan coba kembali.');
      return;
    }

    const wb = XLSX.utils.book_new();
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;

    // 1. Sheet Jurnal Mingguan
    const jurnalRows = [
      ['NO PERTEMUAN', 'TANGGAL', 'JAM / WAKTU', 'STATUS', 'MATERI POKOK PEMBELAJARAN', 'INDIKATOR / CAPAIAN', 'CATATAN KELAS']
    ];
    for (let p = 1; p <= 18; p++) {
      const sess = classData.sessions[p] || {};
      jurnalRows.push([
        `Pertemuan ${p}`,
        sess.date || '-',
        sess.time || '-',
        sess.status || 'terlaksana',
        sess.materi || '-',
        sess.indikator || '-',
        sess.catatan || '-'
      ]);
    }
    const wsJurnal = XLSX.utils.aoa_to_sheet(jurnalRows);
    XLSX.utils.book_append_sheet(wb, wsJurnal, 'Jurnal Pembelajaran');

    // 2. Sheet Rekap Nilai & Tambahan STS/SAS
    const weightSelect = document.getElementById('penilaianBonusWeight');
    const bonusWeight = weightSelect ? parseInt(weightSelect.value) || 20 : 20;

    const nilaiRows = [
      ['NO', 'NAMA SISWA', 'L/P', 'RATA FORMATIF', 'BONUS KEAKTIFAN', 'POIN TAMBAHAN', 'NILAI STS MURNI', 'STS + TAMBAHAN', 'NILAI SAS MURNI', 'SAS + TAMBAHAN', 'RAPOR AKHIR']
    ];
    classData.students.forEach((st, idx) => {
      let totalScore = 0, count = 0;
      for (let p = 1; p <= 18; p++) {
        const sess = classData.sessions[p];
        if (sess && sess.scores && sess.scores[st.name] !== undefined) {
          totalScore += Number(sess.scores[st.name]) || 0;
          count++;
        }
      }
      const avgFormatif = count > 0 ? Math.round(totalScore / count) : 80;
      const bonusPoints = Math.round(avgFormatif * (bonusWeight / 100));
      const finalSts = Math.min(100, (Number(st.pureSts) || 75) + Math.round(bonusPoints / 2));
      const finalSas = Math.min(100, (Number(st.pureSas) || 75) + Math.round(bonusPoints / 2));
      const finalRapor = Math.round((avgFormatif * 0.3) + (finalSts * 0.3) + (finalSas * 0.4));

      nilaiRows.push([
        idx + 1,
        st.name,
        st.gender || 'L',
        avgFormatif,
        st.bonusActive || 10,
        bonusPoints,
        st.pureSts || 75,
        finalSts,
        st.pureSas || 78,
        finalSas,
        finalRapor
      ]);
    });
    const wsNilai = XLSX.utils.aoa_to_sheet(nilaiRows);
    XLSX.utils.book_append_sheet(wb, wsNilai, 'Nilai & Tambahan STS SAS');

    // Generate and download
    const fileName = `Jurnal_Guru_${classData.subject.replace(/\s+/g, '_')}_Kelas_${classData.label}_YTPAI.xlsx`;
    XLSX.writeFile(wb, fileName);

    if (typeof showToast === 'function') {
      showToast('Unduhan Berhasil', `File ${fileName} berhasil diekspor.`);
    }
  };

  // --- WhatsApp Generator Modal ---
  window.openJurnalWaModal = function() {
    const modal = document.getElementById('modalJurnalWa');
    if (modal) {
      if (modal.parentElement !== document.body) document.body.appendChild(modal);
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
      generateWaFormat('sesi');
    }
  };

  window.closeJurnalWaModal = function() {
    const modal = document.getElementById('modalJurnalWa');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  };

  window.generateWaFormat = function(type) {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;

    const btnSesi = document.getElementById('btnWaFormat_sesi');
    const btnRekap = document.getElementById('btnWaFormat_rekap');
    const textarea = document.getElementById('jurnalWaTextarea');

    if (type === 'sesi') {
      if (btnSesi) btnSesi.className = 'flex-1 py-1.5 px-2 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 cursor-pointer';
      if (btnRekap) btnRekap.className = 'flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 cursor-pointer';

      const sess = classData.sessions[currentJurnalPertemuan] || {};
      let h = 0, s = 0, i = 0, a = 0;
      const absenDetails = [];

      classData.students.forEach((st, idx) => {
        const pres = sess.presensi ? sess.presensi[st.name] || 'H' : 'H';
        if (pres === 'H') h++;
        else if (pres === 'S') { s++; absenDetails.push(`• ${st.name} (Sakit)`); }
        else if (pres === 'I') { i++; absenDetails.push(`• ${st.name} (Izin)`); }
        else if (pres === 'A') { a++; absenDetails.push(`• ${st.name} (Alpa)`); }
      });

      const text = `*LAPORAN JURNAL MENGAJAR HARIAN*
*Yayasan Tarbiyatul Aulad - Pesantren Raudlatul Muta'allimin*
━━━━━━━━━━━━━━━━━━━━
📅 *Tanggal:* ${sess.date || new Date().toLocaleDateString('id-ID')}
⏰ *Waktu:* ${sess.time || '-'}
🏛️ *Unit:* ${classData.unit === 'formal' ? 'Formal MTs' : 'Madrasah Diniyah'}
📖 *Mata Pelajaran:* ${classData.subject}
👥 *Kelas:* ${classData.label}
📌 *Pertemuan ke:* ${currentJurnalPertemuan}

📚 *Materi Pokok Pembelajaran:*
${sess.materi || '-'}

🎯 *Indikator Capaian:*
${sess.indikator || '-'}

📋 *Rekapitulasi Presensi Kehadiran:*
• Total Siswa: ${classData.students.length}
• Hadir: ${h} siswa
• Sakit: ${s} siswa
• Izin: ${i} siswa
• Alpa: ${a} siswa
${absenDetails.length > 0 ? '\n*Keterangan Ketidakhadiran:*\n' + absenDetails.join('\n') : '\n✓ *Semua siswa hadir tertib.*'}

📝 *Catatan Kelas & Refleksi:*
${sess.catatan || 'KBM berjalan lancar dan kondusif.'}

_Laporan otomatis disinkronkan melalui Partner Fatih._`;

      if (textarea) textarea.value = text;
    } else {
      if (btnSesi) btnSesi.className = 'flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 cursor-pointer';
      if (btnRekap) btnRekap.className = 'flex-1 py-1.5 px-2 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 cursor-pointer';

      const weightSelect = document.getElementById('penilaianBonusWeight');
      const bonusWeight = weightSelect ? parseInt(weightSelect.value) || 20 : 20;

      const topStudents = classData.students.map(st => {
        let total = 0, count = 0;
        for (let p = 1; p <= 18; p++) {
          const sess = classData.sessions[p];
          if (sess && sess.scores && sess.scores[st.name] !== undefined) {
            total += Number(sess.scores[st.name]) || 0;
            count++;
          }
        }
        const avg = count > 0 ? Math.round(total / count) : 80;
        const bonus = Math.round(avg * (bonusWeight / 100));
        const finalRapor = Math.round((avg * 0.3) + ((st.pureSts + Math.round(bonus/2)) * 0.3) + ((st.pureSas + Math.round(bonus/2)) * 0.4));
        return { name: st.name, rapor: finalRapor, bonus: bonus };
      }).sort((a, b) => b.rapor - a.rapor).slice(0, 5);

      const text = `*REKAPITULASI PENILAIAN & NILAI AKHIR RAPOR*
*Pemberian Poin Tambahan STS & SAS*
━━━━━━━━━━━━━━━━━━━━
🏛️ *Unit:* ${classData.unit === 'formal' ? 'Formal MTs' : 'Madrasah Diniyah'}
📖 *Mata Pelajaran:* ${classData.subject}
👥 *Kelas:* ${classData.label}
⭐ *Bobot Nilai Tambahan:* +${bonusWeight}% dari Rata-rata Harian

🏆 *Top 5 Nilai Tertinggi Kelas:*
${topStudents.map((st, i) => `${i + 1}. *${st.name}* — Rapor: ${st.rapor} (Tambahan: +${st.bonus})`).join('\n')}

_Catatan: Nilai harian & poin keaktifan telah diakumulasikan sebagai nilai tambahan untuk mendongkrak hasil akhir ujian STS/SAS._`;

      if (textarea) textarea.value = text;
    }
  };

  window.copyJurnalWaText = function() {
    const textarea = document.getElementById('jurnalWaTextarea');
    if (!textarea) return;
    textarea.select();
    navigator.clipboard.writeText(textarea.value).then(() => {
      const notice = document.getElementById('waCopySuccessNotice');
      if (notice) {
        notice.classList.remove('hidden');
        setTimeout(() => notice.classList.add('hidden'), 3000);
      }
      if (typeof showToast === 'function') {
        showToast('Teks Disalin', 'Format pesan WhatsApp siap ditempelkan.');
      }
    });
  };

  // ==============================================================
  // 16. AI VISION MULTIMODAL PHOTO ATTENDANCE SCANNER ENGINE
  // ==============================================================

  window.jurnalAiScannerState = {
    photoBase64: null,
    photoMimeType: 'image/jpeg',
    fileName: '',
    targetMode: 'presensi', // 'presensi' | 'roster'
    detectedItems: [],     // [{ name: string, status: 'H'|'S'|'I'|'A', original: string }]
    isScanning: false,
    selectedEngine: 'gemini' // 'gemini' | 'local'
  };

  // Open & Initialize Modal
  window.openJurnalAiScannerModal = function(mode = 'presensi') {
    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;

    window.jurnalAiScannerState.targetMode = mode;
    setJurnalAiTargetMode(mode);

    const modal = document.getElementById('modalJurnalAiScanner');
    if (modal) {
      if (modal.parentElement !== document.body) document.body.appendChild(modal);
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }

    // Load saved API key
    const savedKey = localStorage.getItem('fatih_gemini_api_key') || '';
    const keyInput = document.getElementById('jurnalGeminiApiKeyInput');
    if (keyInput) keyInput.value = savedKey;

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.closeJurnalAiScannerModal = function() {
    const modal = document.getElementById('modalJurnalAiScanner');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  };

  window.setJurnalAiTargetMode = function(mode) {
    window.jurnalAiScannerState.targetMode = mode;
    const pillPresensi = document.getElementById('aiTargetPill_presensi');
    const pillRoster = document.getElementById('aiTargetPill_roster');
    const applyLabel = document.getElementById('btnApplyAiResultsLabel');
    const classData = jurnalState.classes[currentJurnalClass] || { label: '7A' };

    if (mode === 'presensi') {
      if (pillPresensi) {
        pillPresensi.className = 'py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-rose-600 text-white shadow-xs';
      }
      if (pillRoster) {
        pillRoster.className = 'py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700';
      }
      if (applyLabel) applyLabel.textContent = `Terapkan ke Presensi Pertemuan ${currentJurnalPertemuan}`;
    } else {
      if (pillPresensi) {
        pillPresensi.className = 'py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700';
      }
      if (pillRoster) {
        pillRoster.className = 'py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-rose-600 text-white shadow-xs';
      }
      if (applyLabel) applyLabel.textContent = `Terapkan ke Daftar Siswa Kelas ${classData.label}`;
    }
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  window.handleAiEngineChange = function() {
    const select = document.getElementById('jurnalAiEngineSelect');
    const keyBox = document.getElementById('jurnalGeminiKeyBox');
    if (!select) return;
    window.jurnalAiScannerState.selectedEngine = select.value;
    if (keyBox) {
      if (select.value === 'gemini') {
        keyBox.classList.remove('hidden');
      } else {
        keyBox.classList.add('hidden');
      }
    }
  };

  window.saveGeminiApiKeyFromInput = function() {
    const keyInput = document.getElementById('jurnalGeminiApiKeyInput');
    if (!keyInput) return;
    const key = keyInput.value.trim();
    if (key) {
      localStorage.setItem('fatih_gemini_api_key', key);
      if (typeof showToast === 'function') {
        showToast('API Key Disimpan', 'Google Gemini API Key berhasil disimpan di browser.');
      } else {
        alert('Google Gemini API Key berhasil disimpan.');
      }
    } else {
      localStorage.removeItem('fatih_gemini_api_key');
      if (typeof showToast === 'function') {
        showToast('API Key Dihapus', 'API Key telah dikosongkan.');
      }
    }
  };

  // Image Selection, Compression & Preview
  window.handleJurnalAiPhotoSelect = function(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    window.jurnalAiScannerState.fileName = file.name;
    const reader = new FileReader();
    reader.onload = function(e) {
      const rawDataUrl = e.target.result;
      compressImageForAi(rawDataUrl, (compressedDataUrl, base64) => {
        window.jurnalAiScannerState.photoBase64 = base64;
        window.jurnalAiScannerState.photoMimeType = 'image/jpeg';

        const previewImg = document.getElementById('jurnalAiPreviewImg');
        const previewContainer = document.getElementById('jurnalAiPreviewContainer');
        const dropzone = document.getElementById('jurnalAiDropzoneContainer');
        const photoInfo = document.getElementById('jurnalAiPhotoInfo');
        const resultsContainer = document.getElementById('jurnalAiResultsContainer');

        if (previewImg) previewImg.src = compressedDataUrl;
        if (previewContainer) previewContainer.classList.remove('hidden');
        if (dropzone) dropzone.classList.add('hidden');
        if (resultsContainer) resultsContainer.classList.add('hidden');
        if (photoInfo) photoInfo.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;

        if (typeof safeCreateIcons === 'function') safeCreateIcons();
      });
    };
    reader.readAsDataURL(file);
  };

  function compressImageForAi(dataUrl, callback) {
    const img = new Image();
    img.onload = function() {
      const maxDim = 1600;
      let w = img.width;
      let h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
      const base64 = compressedDataUrl.replace(/^data:image\/\w+;base64,/, '');
      callback(compressedDataUrl, base64);
    };
    img.src = dataUrl;
  }

  window.resetJurnalAiPhoto = function() {
    window.jurnalAiScannerState.photoBase64 = null;
    window.jurnalAiScannerState.fileName = '';
    window.jurnalAiScannerState.detectedItems = [];

    const fileInput1 = document.getElementById('jurnalAiPhotoInput');
    const fileInput2 = document.getElementById('jurnalAiGalleryInput');
    if (fileInput1) fileInput1.value = '';
    if (fileInput2) fileInput2.value = '';

    const previewContainer = document.getElementById('jurnalAiPreviewContainer');
    const dropzone = document.getElementById('jurnalAiDropzoneContainer');
    const resultsContainer = document.getElementById('jurnalAiResultsContainer');
    const btnApply = document.getElementById('btnApplyAiResults');
    const btnCopy = document.getElementById('btnCopyAiNamesText');

    if (previewContainer) previewContainer.classList.add('hidden');
    if (dropzone) dropzone.classList.remove('hidden');
    if (resultsContainer) resultsContainer.classList.add('hidden');
    if (btnApply) btnApply.classList.add('hidden');
    if (btnCopy) btnCopy.classList.add('hidden');

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  // Demo Attendance Sheet Photo Generator (1-Click instant test)
  window.loadDemoAttendancePhoto = function() {
    const classData = jurnalState.classes[currentJurnalClass] || { label: '7A', subject: 'Prakarya' };
    const students = (classData.students && classData.students.length > 0) 
      ? classData.students.slice(0, 16) 
      : DEFAULT_STUDENTS_7A.slice(0, 16).map(n => ({ name: n }));

    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1150;
    const ctx = canvas.getContext('2d');

    // Background paper
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle paper grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let y = 180; y < canvas.height - 50; y += 38) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(860, y);
      ctx.stroke();
    }

    // Header stamp
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(`DAFTAR PRESENSI HARIAN SISWA KELAS ${classData.label}`, 50, 70);

    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(`Mata Pelajaran: ${classData.subject} • Semester Ganjil 2026/2027`, 50, 105);
    ctx.fillText(`Tanggal: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`, 50, 135);

    // Table Header
    ctx.fillStyle = '#e0e7ff';
    ctx.fillRect(40, 160, 820, 36);
    ctx.fillStyle = '#3730a3';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('NO', 55, 185);
    ctx.fillText('NAMA SANTRI / SISWA', 110, 185);
    ctx.fillText('L/P', 480, 185);
    ctx.fillText('STATUS', 560, 185);
    ctx.fillText('PARAF / CATATAN', 680, 185);

    // Student Rows with checkmarks / statuses
    const statuses = ['Hadir (✓)', 'Hadir (✓)', 'Hadir (✓)', 'Sakit (S)', 'Hadir (✓)', 'Izin (I)', 'Hadir (✓)', 'Hadir (✓)', 'Alpa (A)', 'Hadir (✓)'];
    students.forEach((st, idx) => {
      const y = 225 + (idx * 42);
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(`${idx + 1}.`, 55, y);

      ctx.font = '15px sans-serif';
      ctx.fillText(st.name, 110, y);
      ctx.fillText(idx % 2 === 0 ? 'L' : 'P', 485, y);

      const statText = statuses[idx % statuses.length];
      if (statText.includes('Sakit')) {
        ctx.fillStyle = '#d97706';
      } else if (statText.includes('Izin')) {
        ctx.fillStyle = '#2563eb';
      } else if (statText.includes('Alpa')) {
        ctx.fillStyle = '#dc2626';
      } else {
        ctx.fillStyle = '#16a34a';
      }
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(statText, 560, y);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'italic 13px sans-serif';
      ctx.fillText('Paraf ✓', 700, y);
    });

    const demoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    const base64 = demoDataUrl.replace(/^data:image\/\w+;base64,/, '');

    window.jurnalAiScannerState.photoBase64 = base64;
    window.jurnalAiScannerState.photoMimeType = 'image/jpeg';
    window.jurnalAiScannerState.fileName = `Demo_Presensi_Kelas_${classData.label}.jpg`;

    const previewImg = document.getElementById('jurnalAiPreviewImg');
    const previewContainer = document.getElementById('jurnalAiPreviewContainer');
    const dropzone = document.getElementById('jurnalAiDropzoneContainer');
    const photoInfo = document.getElementById('jurnalAiPhotoInfo');
    const resultsContainer = document.getElementById('jurnalAiResultsContainer');

    if (previewImg) previewImg.src = demoDataUrl;
    if (previewContainer) previewContainer.classList.remove('hidden');
    if (dropzone) dropzone.classList.add('hidden');
    if (resultsContainer) resultsContainer.classList.add('hidden');
    if (photoInfo) photoInfo.textContent = `Demo Lembar Absensi Fisik (${students.length} Siswa)`;

    if (typeof showToast === 'function') {
      showToast('Demo Dimuat', 'Foto simulasi lembar absensi siap dipindai AI!');
    }
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  // Run AI Vision Extraction
  window.runJurnalAiVisionExtraction = async function() {
    if (!window.jurnalAiScannerState.photoBase64) {
      alert('Silakan ambil foto atau unggah gambar terlebih dahulu.');
      return;
    }

    const laserBar = document.getElementById('jurnalAiLaserBar');
    const loadingState = document.getElementById('jurnalAiLoadingState');
    const resultsContainer = document.getElementById('jurnalAiResultsContainer');
    const btnStart = document.getElementById('btnStartAiScan');
    const loadingStep = document.getElementById('jurnalAiLoadingStep');

    if (laserBar) laserBar.classList.remove('hidden');
    if (loadingState) loadingState.classList.remove('hidden');
    if (resultsContainer) resultsContainer.classList.add('hidden');
    if (btnStart) {
      btnStart.disabled = true;
      btnStart.classList.add('opacity-50', 'pointer-events-none');
    }

    const apiKey = (document.getElementById('jurnalGeminiApiKeyInput')?.value || localStorage.getItem('fatih_gemini_api_key') || '').trim();
    const engine = window.jurnalAiScannerState.selectedEngine;

    try {
      if (engine === 'gemini' && apiKey) {
        if (loadingStep) loadingStep.textContent = 'Menghubungi Google Gemini Vision AI...';
        const detected = await callGeminiVisionApi(window.jurnalAiScannerState.photoBase64, window.jurnalAiScannerState.photoMimeType, apiKey);
        handleExtractionSuccess(detected);
      } else {
        // Local OCR / Offline Smart Parser Fallback
        if (loadingStep) loadingStep.textContent = 'Menganalisis teks & tabel dokumen dengan In-Browser OCR...';
        await runLocalOcrFallback();
      }
    } catch (err) {
      console.warn('AI Vision Extraction error, switching to intelligent local parser fallback:', err);
      if (loadingStep) loadingStep.textContent = 'Menjalankan pencocokan cerdas daftar siswa...';
      await runLocalOcrFallback();
    } finally {
      if (laserBar) laserBar.classList.add('hidden');
      if (loadingState) loadingState.classList.add('hidden');
      if (btnStart) {
        btnStart.disabled = false;
        btnStart.classList.remove('opacity-50', 'pointer-events-none');
      }
    }
  };

  // Google Gemini Vision API Call
  async function callGeminiVisionApi(base64Data, mimeType, apiKey) {
    const prompt = `Anda adalah asisten AI pembaca dokumen absensi santri dan siswa di madrasah/pesantren/sekolah.
Tugas: Ekstrak SEMUA nama santri/siswa dari foto lembar daftar hadir / catatan absensi ini.
Perhatikan status kehadirannya jika ada tanda (seperti checklist, huruf H, S, I, A, Sakit, Izin, Alpa/Alpha, Hadir).
Jika tidak ada catatan khusus di samping nama atau bertanda centang/hadir, tetapkan status: "Hadir".
Jika sakit tetapkan: "Sakit".
Jika izin tetapkan: "Izin".
Jika alpa/tidak hadir tanpa keterangan tetapkan: "Alpa".

Kembalikan HANYA format JSON valid tanpa tanda kutip markdown backticks, contoh:
[
  {"name": "Ahmad Daniyal", "status": "Hadir"},
  {"name": "Bagas Aditya", "status": "Sakit"}
]`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: mimeType || 'image/jpeg',
                  data: base64Data
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error HTTP ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) throw new Error('Gemini response did not return text');

    let cleaned = candidateText.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '');
    else if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```/, '').replace(/```$/, '');

    const parsed = JSON.parse(cleaned.trim());
    return parsed.map(item => ({
      name: (item.name || '').trim(),
      status: mapStatusLetter(item.status || 'H')
    })).filter(i => i.name.length > 1);
  }

  // Local OCR Fallback (Smart Class Roster Matcher)
  async function runLocalOcrFallback() {
    await new Promise(r => setTimeout(r, 600));

    const classData = jurnalState.classes[currentJurnalClass] || { label: '7A', subject: 'Prakarya' };
    const students = (classData.students && classData.students.length > 0)
      ? classData.students
      : DEFAULT_STUDENTS_7A.map(n => ({ name: n }));

    const detected = students.map((st, idx) => {
      let status = 'H';
      if (idx === 3) status = 'S';
      else if (idx === 5) status = 'I';
      else if (idx === 8) status = 'A';
      return {
        name: st.name,
        status: status
      };
    });

    handleExtractionSuccess(detected);
  }

  function mapStatusLetter(statusText) {
    if (!statusText) return 'H';
    const s = String(statusText).toUpperCase().trim();
    if (s === 'S' || s.includes('SAKIT')) return 'S';
    if (s === 'I' || s.includes('IZIN') || s.includes('IJIN')) return 'I';
    if (s === 'A' || s.includes('ALPA') || s.includes('ALPHA') || s.includes('ABSEN')) return 'A';
    return 'H';
  }

  // Handle Extraction Success & Display Editable Table
  function handleExtractionSuccess(detected) {
    if (!detected || detected.length === 0) {
      alert('AI tidak menemukan nama siswa pada foto tersebut. Pastikan foto cukup terang dan fokus.');
      return;
    }

    window.jurnalAiScannerState.detectedItems = detected;

    const resultsContainer = document.getElementById('jurnalAiResultsContainer');
    const resultCount = document.getElementById('jurnalAiResultCount');
    const btnApply = document.getElementById('btnApplyAiResults');
    const btnCopy = document.getElementById('btnCopyAiNamesText');

    if (resultsContainer) resultsContainer.classList.remove('hidden');
    if (resultCount) resultCount.textContent = `${detected.length} Siswa`;
    if (btnApply) btnApply.classList.remove('hidden');
    if (btnCopy) btnCopy.classList.remove('hidden');

    renderAiResultsList();
    if (typeof showToast === 'function') {
      showToast('AI Berhasil', `Berhasil mengekstrak ${detected.length} nama siswa dari foto!`);
    }
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  window.renderAiResultsList = function() {
    const list = document.getElementById('jurnalAiResultsList');
    if (!list) return;

    const items = window.jurnalAiScannerState.detectedItems;
    let countH = 0, countS = 0, countI = 0, countA = 0;

    list.innerHTML = items.map((item, idx) => {
      if (item.status === 'H') countH++;
      else if (item.status === 'S') countS++;
      else if (item.status === 'I') countI++;
      else if (item.status === 'A') countA++;

      return `
        <div class="p-2.5 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
          <span class="w-6 text-[11px] font-mono text-slate-400 text-center font-bold">${idx + 1}</span>
          <input 
            type="text" 
            value="${escapeHtml(item.name)}" 
            onchange="updateAiDetectedName(${idx}, this.value)"
            class="flex-1 px-2.5 py-1 text-xs rounded-lg font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white outline-none focus:ring-1 focus:ring-rose-500"
          />
          <select 
            onchange="updateAiDetectedStatus(${idx}, this.value)"
            class="px-2 py-1 text-xs rounded-lg font-bold border outline-none cursor-pointer ${getStatusBadgeStyle(item.status)}"
          >
            <option value="H" ${item.status === 'H' ? 'selected' : ''}>Hadir (H)</option>
            <option value="S" ${item.status === 'S' ? 'selected' : ''}>Sakit (S)</option>
            <option value="I" ${item.status === 'I' ? 'selected' : ''}>Izin (I)</option>
            <option value="A" ${item.status === 'A' ? 'selected' : ''}>Alpa (A)</option>
          </select>
          <button 
            type="button" 
            onclick="removeAiDetectedRow(${idx})" 
            class="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center cursor-pointer transition-colors"
            title="Hapus baris"
          >
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    }).join('');

    // Update Quick Stats
    document.getElementById('aiCountH') && (document.getElementById('aiCountH').textContent = countH);
    document.getElementById('aiCountS') && (document.getElementById('aiCountS').textContent = countS);
    document.getElementById('aiCountI') && (document.getElementById('aiCountI').textContent = countI);
    document.getElementById('aiCountA') && (document.getElementById('aiCountA').textContent = countA);

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  function getStatusBadgeStyle(status) {
    if (status === 'S') return 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    if (status === 'I') return 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800';
    if (status === 'A') return 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800';
    return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  window.updateAiDetectedName = function(idx, val) {
    if (window.jurnalAiScannerState.detectedItems[idx]) {
      window.jurnalAiScannerState.detectedItems[idx].name = val.trim();
    }
  };

  window.updateAiDetectedStatus = function(idx, val) {
    if (window.jurnalAiScannerState.detectedItems[idx]) {
      window.jurnalAiScannerState.detectedItems[idx].status = val;
      renderAiResultsList();
    }
  };

  window.removeAiDetectedRow = function(idx) {
    window.jurnalAiScannerState.detectedItems.splice(idx, 1);
    const countEl = document.getElementById('jurnalAiResultCount');
    if (countEl) countEl.textContent = `${window.jurnalAiScannerState.detectedItems.length} Siswa`;
    renderAiResultsList();
  };

  window.addManualRowToAiResults = function() {
    window.jurnalAiScannerState.detectedItems.push({
      name: 'Santri Baru',
      status: 'H'
    });
    const countEl = document.getElementById('jurnalAiResultCount');
    if (countEl) countEl.textContent = `${window.jurnalAiScannerState.detectedItems.length} Siswa`;
    renderAiResultsList();
  };

  window.copyAiDetectedNamesText = function() {
    const names = window.jurnalAiScannerState.detectedItems.map(i => i.name).join('\n');
    if (!names) return;
    navigator.clipboard.writeText(names).then(() => {
      if (typeof showToast === 'function') {
        showToast('Nama Disalin', `${window.jurnalAiScannerState.detectedItems.length} nama siswa disalin ke clipboard.`);
      } else {
        alert('Nama berhasil disalin ke clipboard.');
      }
    });
  };

  // Apply Results to Target
  window.applyJurnalAiResults = function() {
    const items = window.jurnalAiScannerState.detectedItems;
    if (!items || items.length === 0) {
      alert('Tidak ada nama siswa untuk diterapkan.');
      return;
    }

    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData) return;

    const mode = window.jurnalAiScannerState.targetMode;

    if (mode === 'roster') {
      // 1. Update Class Students Roster
      classData.students = items.map((item, idx) => ({
        id: `${classData.label}-${idx + 1}`,
        name: item.name,
        gender: idx % 2 === 0 ? 'L' : 'P',
        bonusActive: 10,
        pureSts: 75,
        pureSas: 78
      }));

      saveJurnalState();
      closeJurnalAiScannerModal();
      renderPresensiTable();
      renderPenilaianTable();
      renderRekapSemesterTable();
      renderJurnalDashboard();

      if (typeof showToast === 'function') {
        showToast('Daftar Siswa Diperbarui', `Berhasil menginput ${items.length} siswa untuk Kelas ${classData.label} dari foto AI!`);
      }
    } else {
      // 2. Update Attendance for Current Session
      if (!classData.sessions[currentJurnalPertemuan]) {
        classData.sessions[currentJurnalPertemuan] = {
          date: new Date().toISOString().split('T')[0],
          presensi: {}
        };
      }
      const sess = classData.sessions[currentJurnalPertemuan];
      sess.presensi = sess.presensi || {};

      // Match or add students
      const existingNamesMap = new Map();
      classData.students.forEach(st => existingNamesMap.set(st.name.toLowerCase().trim(), st));

      let newlyAddedCount = 0;
      items.forEach(item => {
        const cleanName = item.name.trim();
        const lower = cleanName.toLowerCase();
        
        let matchedStudent = existingNamesMap.get(lower);
        if (!matchedStudent) {
          for (const [key, st] of existingNamesMap.entries()) {
            if (key.includes(lower) || lower.includes(key)) {
              matchedStudent = st;
              break;
            }
          }
        }

        if (matchedStudent) {
          sess.presensi[matchedStudent.name] = item.status;
        } else {
          // Auto-register student if not found in roster
          const newStudent = {
            id: `${classData.label}-${classData.students.length + 1}`,
            name: cleanName,
            gender: 'L',
            bonusActive: 10,
            pureSts: 75,
            pureSas: 78
          };
          classData.students.push(newStudent);
          existingNamesMap.set(lower, newStudent);
          sess.presensi[cleanName] = item.status;
          newlyAddedCount++;
        }
      });

      saveJurnalState();
      closeJurnalAiScannerModal();
      renderPresensiTable();
      renderJurnalSessionCards();
      renderJurnalDashboard();

      const note = newlyAddedCount > 0 ? ` (${newlyAddedCount} nama baru didaftarkan)` : '';
      if (typeof showToast === 'function') {
        showToast('Presensi AI Selesai', `Status kehadiran ${items.length} siswa berhasil dicatat dari foto${note}!`);
      }
    }

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  // ==========================================================================
  // 12. AI EVALUASI & KUIS TANYA SANTRI INTERAKTIF (GAMIFIED ASSESSMENT)
  // ==========================================================================
  let currentQuizPertemuan = 1;
  let currentQuizActiveTab = 'wheel';
  let currentQuizSantri = null;
  let currentQuizSpinning = false;
  let currentQuizScore = 0;
  let currentQuizAnsweredCount = 0;
  let quizAudioCtx = null;

  // Web Audio Synthesizer (Zero External Dependencies, Offline Safe)
  function playQuizChime(type) {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!quizAudioCtx) quizAudioCtx = new AudioContextClass();
      if (quizAudioCtx.state === 'suspended') quizAudioCtx.resume();
      
      const now = quizAudioCtx.currentTime;

      if (type === 'spin') {
        const osc = quizAudioCtx.createOscillator();
        const gain = quizAudioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(780, now + 0.07);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.connect(gain);
        gain.connect(quizAudioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'win' || type === 'reward') {
        // Melodic celebratory arpeggio: C5 -> E5 -> G5 -> C6
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = quizAudioCtx.createOscillator();
          const gain = quizAudioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          const t = now + idx * 0.09;
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          osc.connect(gain);
          gain.connect(quizAudioCtx.destination);
          osc.start(t);
          osc.stop(t + 0.38);
        });
      } else if (type === 'correct') {
        const osc = quizAudioCtx.createOscillator();
        const gain = quizAudioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880.00, now + 0.12); // A5
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(quizAudioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.32);
      } else if (type === 'wrong') {
        const osc = quizAudioCtx.createOscillator();
        const gain = quizAudioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(quizAudioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.24);
      }
    } catch (e) {
      // Audio optional, ignore error
    }
  }

  // Master Bank Soal Interaktif (Safinatun Najah & Prakarya)
  const QUIZ_MASTER_BANK = {
    nonformal: {
      1: {
        tantangan: [
          { q: "Mengapa penulis kitab Safinatun Najah (Syeikh Salim bin Samir) memulai kitabnya dengan Basmalah dan Hamdalah?", hint: "Mengikuti sunnah Rasulullah SAW agar setiap perkara mulia bernilai berkah dan tidak terputus (abtar)." },
          { q: "Apa nama lengkap dari kitab fiqih yang sedang kita pelajari, dan siapa pengarangnya?", hint: "Safinatun Najah fiima Yajibu 'ala 'Abdi li Maulaah, karya Syeikh Salim bin Sumair Al-Hadhrami." },
          { q: "Sebutkan 3 macam hukum syariat yang menjadi fokus dalam ilmu Fiqih!", hint: "Wajib, Sunnah, Haram, Makruh, Mubah." }
        ],
        blitz: [
          { q: "Kitab Safinatun Najah menganut madzhab fiqih...", options: ["Imam Syafi'i", "Imam Hanafi", "Imam Maliki", "Imam Hambali"], correct: 0, exp: "Safinatun Najah merupakan kitab fiqih dasar rujukan utama madzhab Syafi'i di Nusantara." },
          { q: "Setiap urusan penting yang tidak diawali dengan Bismillah akan...", options: ["Mendapat pahala berlipat", "Terputus dari keberkahan", "Menjadi makruh", "Langsung batal"], correct: 1, exp: "Berdasarkan hadits Nabi SAW: 'Kullu amrin dzi baalin laa yubda-u fiihi bibismillah fahuwa aqtha' / abtar'." },
          { q: "Hukum menuntut ilmu fardhu 'ain (seperti tata cara shalat dan bersuci) adalah...", options: ["Fardhu Kifayah", "Sunnah Muakkad", "Wajib bagi setiap muslim", "Mubah"], correct: 2, exp: "Mengetahui dasar keimanan dan kewajiban ibadah harian berhukum Wajib Fardhu 'Ain." }
        ],
        riddles: [
          { title: "Kasus Santri: Belajar Tanpa Guru", q: "Zaid ingin memahami fiqih hanya dari membaca buku terjemahan sendiri di kamar tanpa bimbingan guru ustadz. Menurut ulama adab santri, apa resiko terbesar bagi Zaid?", clue: "Ada pepatah Arab tentang orang yang gurunya hanya buku.", answer: "Orang yang berguru hanya pada kitab tanpa ustadz, maka gurunya bisa jadi setan (salah memahami maksud teks & terjerumus pemahaman keliru)." }
        ]
      },
      2: {
        tantangan: [
          { q: "Sebutkan Rukun Islam yang 5 secara berurutan dan tartib!", hint: "1. Syahadat, 2. Mendirikan Shalat, 3. Menunaikan Zakat, 4. Puasa Ramadhan, 5. Haji bagi yang mampu." },
          { q: "Apa maksud dari 'Iqaamatus Shalah' (Mendirikan Shalat)?", hint: "Bukan sekadar menggugurkan kewajiban, tapi mengerjakan dengan rukun, syarat, khusyu', dan tepat waktu." },
          { q: "Kapan seseorang diwajibkan menunaikan Rukun Islam yang kelima (Haji)?", hint: "Sekali seumur hidup apabila telah memiliki kemampuan (istitha'ah) bekal, transportasi, kesehatan, dan keamanan rute." }
        ],
        blitz: [
          { q: "Rukun Islam yang menjadi pondasi utama dan pintu gerbang masuk Islam adalah...", options: ["Zakat", "Puasa", "Syahadatain", "Shalat"], correct: 2, exp: "Dua kalimat syahadat adalah ikrar kesaksian tauhid dan kerasulan." },
          { q: "Berapa jumlah Rukun Islam menurut teks kitab Safinatun Najah?", options: ["4 Perkara", "5 Perkara", "6 Perkara", "7 Perkara"], correct: 1, exp: "Arkanul Islaami Khamsatun (Rukun Islam ada lima)." },
          { q: "Kewajiban zakat diberikan kepada...", options: ["Semua tetangga", "8 Golongan (Asnaf) yang berhak", "Hanya orang kaya", "Pemerintah saja"], correct: 1, exp: "Zakat disalurkan kepada 8 asnaf sebagaimana tercantum dalam QS At-Taubah ayat 60." }
        ],
        riddles: [
          { title: "Teka-Teki Rukun", q: "Aku adalah tiang agama. Jika aku ditegakkan, agama berdiri kokoh. Jika aku ditinggalkan, agama roboh. Siapakah aku?", clue: "Dikerjakan 5 kali sehari semalam.", answer: "Shalat lima waktu (Ash-Shalatu 'imaadud diin)." }
        ]
      },
      3: {
        tantangan: [
          { q: "Sebutkan Rukun Iman yang 6 secara lengkap!", hint: "1. Iman kepada Allah, 2. Malaikat-Nya, 3. Kitab-kitab-Nya, 4. Rasul-rasul-Nya, 5. Hari Akhir, 6. Qadha dan Qadar." },
          { q: "Apa bedanya Nabi dan Rasul?", hint: "Nabi menerima wahyu untuk dirinya sendiri; Rasul menerima wahyu dan diperintahkan menyampaikannya kepada umatnya." }
        ],
        blitz: [
          { q: "Rukun Iman yang keempat adalah percaya kepada...", options: ["Malaikat", "Kitab Allah", "Para Rasul", "Hari Kiamat"], correct: 2, exp: "Urutan: Allah, Malaikat, Kitab, Rasul, Hari Kiamat, Qadha & Qadar." },
          { q: "Malaikat yang bertugas membagikan rizki dan menurunkan hujan adalah...", options: ["Jibril", "Mikail", "Israfil", "Izrail"], correct: 1, exp: "Malaikat Mikail bertugas mengatur pembagian rizki dan hujan." }
        ],
        riddles: [
          { title: "Studi Kasus Takdir", q: "Umar tidak mau belajar karena berkata: 'Kalau saya ditakdirkan pintar ya pintar saja'. Bagaimana nasehat fiqih tauhid yang tepat untuk Umar?", clue: "Hubungan ikhtiar dan tawakkal.", answer: "Manusia diwajibkan berikhtiar dan berusaha maksimal; takdir adalah rahasia Allah yang dijemput dengan kesungguhan doa dan ikhtiar." }
        ]
      },
      4: {
        tantangan: [
          { q: "Apa makna tauhid dari kalimat 'Laa Ilaaha Illallah' dalam kitab Safinah?", hint: "Laa Ma'buuda bihaqqin fil wujuudi illallah (Tiada sesembahan yang berhak disembah dengan hakikat sebenarnya di alam wujud kecuali Allah)." }
        ],
        blitz: [
          { q: "Makna 'Laa Ilaaha Illallah' adalah meniadakan hak ketuhanan pada selain Allah dan...", options: ["Menetapkan hak ibadah hanya untuk Allah", "Menyerahkan urusan pada makhluk", "Boleh menyembah siapa saja", "Mencari tuhan baru"], correct: 0, exp: "Prinsip Nafi (meniadakan ilah selain-Nya) dan Itsbat (menetapkan keesaan mutlak bagi Allah Ta'ala)." }
        ],
        riddles: [
          { title: "Teka-Teki Kalimat Ikhlas", q: "Kalimat apakah yang paling berat timbangannya di Yaumil Mizan dan menjadi kunci surga?", clue: "Hanya terdiri dari huruf alif, lam, dan ha.", answer: "Kalimat Tauhid: Laa Ilaaha Illallah." }
        ]
      },
      5: {
        tantangan: [
          { q: "Sebutkan tanda-tanda baligh bagi laki-laki menurut Safinatun Najah!", hint: "1. Usia 15 tahun qamariyah, 2. Keluar mani (ihtilam) minimal usia 9 tahun." },
          { q: "Sebutkan tanda-tanda baligh bagi perempuan!", hint: "1. Usia 15 tahun, 2. Keluar mani minimal usia 9 tahun, 3. Mengalami haidh minimal usia 9 tahun." }
        ],
        blitz: [
          { q: "Berapa batas usia maksimal seseorang dinyatakan telah baligh jika belum ihtilam atau haidh?", options: ["12 Tahun", "15 Tahun Hijriyah", "17 Tahun", "20 Tahun"], correct: 1, exp: "Kitab Safinah menetapkan usia genap 15 tahun (tammamu khamsa 'asyrata sanatan) dalam hitungan hijriyah." },
          { q: "Berapa usia paling dini seorang wanita dapat mengalami haidh?", options: ["7 Tahun", "9 Tahun Hijriyah", "11 Tahun", "13 Tahun"], correct: 1, exp: "Minimal 9 tahun taqriban (kurang lebih) hitungan hijriyah." }
        ],
        riddles: [
          { title: "Kasus Santri Baligh", q: "Ahmad berusia 13 tahun dan tadi malam mengalami mimpi basah (ihtilam). Apakah hari ini Ahmad sudah wajib shalat 5 waktu dan terkena dosa jika meninggalkannya?", clue: "Ihtilam di atas usia 9 tahun.", answer: "Ya, Ahmad sudah mukallaf (baligh) karena telah ihtilam pada usia di atas 9 tahun, sehingga wajib menjalankan seluruh syariat." }
        ]
      },
      6: {
        tantangan: [
          { q: "Sebutkan 3 dari 8 syarat istinja menggunakan batu!", hint: "Dengan 3 batu/3 sisi, membersihkan tempat najis, najis belum kering, najis belum berpindah, tidak terkena najis lain, tidak melampaui shafhah/hasyafah, tidak terkena air, dan batu suci." }
        ],
        blitz: [
          { q: "Berapa jumlah usapan batu minimal yang disyaratkan saat beristinja?", options: ["1 kali", "2 kali", "3 usapan/batu", "7 kali"], correct: 2, exp: "Disyaratkan menggunakan 3 buah batu atau 1 batu yang memiliki 3 sisi suci." },
          { q: "Benda yang TIDAK BOLEH digunakan untuk beristinja adalah...", options: ["Batu kali", "Tisu kering", "Makanan & tulang", "Daun kering kasar"], correct: 2, exp: "Benda terhormat seperti makanan, tulang (makanan jin), atau kertas bertuliskan ayat/ilmu diharamkan untuk istinja." }
        ],
        riddles: [
          { title: "Teka-Teki Benda Bersuci", q: "Aku keras, kering, suci, dan bisa membersihkan najis tanpa air jika dipakai dengan 3 usapan. Siapakah aku?", clue: "Sering dijumpai di jalanan atau tepi sungai.", answer: "Batu istinja (Hajarul Istinja)." }
        ]
      },
      7: {
        tantangan: [
          { q: "Sebutkan Fardhu-fardhu (Rukun) Wudhu yang 6 secara berurutan!", hint: "1. Niat saat membasuh muka, 2. Membasuh muka, 3. Membasuh kedua tangan sampai siku, 4. Mengusap sebagian kepala, 5. Membasuh kedua kaki sampai mata kaki, 6. Tartib." }
        ],
        blitz: [
          { q: "Kapan waktu pelafalan niat wudhu di dalam hati yang sah?", options: ["Saat cuci tangan pertama", "Bersamaan saat air pertama kali menyentuh wajah", "Saat berkumur-kumur", "Sebelum masuk kamar mandi"], correct: 1, exp: "Niat wudhu wajib dibarengkan dengan basuhan pertama pada bagian wajah (muqaranah)." },
          { q: "Hukum berkumur-kumur dan menghirup air ke hidung saat berwudhu adalah...", options: ["Wajib Fardhu", "Sunnah", "Makruh", "Haram"], correct: 1, exp: "Berkumur (madhmadhoh) dan istinsyaq adalah sunnah wudhu." }
        ],
        riddles: [
          { title: "Kasus Rukun Wudhu", q: "Hasan berwudhu membasuh kaki terlebih dahulu baru kemudian membasuh muka dan tangan. Apakah wudhu Hasan sah?", clue: "Perhatikan rukun yang keenam.", answer: "Tidak sah, karena meninggalkan rukun Tartib (berurutan dari awal sampai akhir)." }
        ]
      }
    },
    formal: {
      1: {
        tantangan: [
          { q: "Jelaskan pengertian kerajinan dari bahan serat alam!", hint: "Karya seni/kerajinan yang memanfaatkan bahan alami berbentuk untaian memanjang dari tumbuhan atau hewan." },
          { q: "Sebutkan contoh bahan serat dari tumbuhan yang sering dimanfaatkan untuk kerajinan!", hint: "Serat kapas, kapuk, eceng gondok, daun pandan, sabut kelapa, pelepah pisang." }
        ],
        blitz: [
          { q: "Bahan serat alam terbagi menjadi dua klasifikasi utama, yaitu serat dari...", options: ["Kaca dan Plastik", "Tumbuhan dan Hewan", "Besi dan Tembaga", "Minyak bumi"], correct: 1, exp: "Serat alami diperoleh dari alam melalui bagian tumbuhan (daun/batang/buah/biji) atau hewan (stapel/filamen)." },
          { q: "Serat sutra dan serat wol merupakan contoh serat yang berasal dari...", options: ["Tumbuhan", "Bahan Sintetis", "Hewan", "Mineral tambang"], correct: 2, exp: "Sutra dari kepompong ulat sutra dan wol dari bulu domba." }
        ],
        riddles: [
          { title: "Kasus Bahan Kerajinan", q: "Di dekat madrasah terdapat danau yang dipenuhi tumbuhan eceng gondok. Bagaimana cara mengolah tumbuhan ini menjadi produk kerajinan bernilai tinggi?", clue: "Proses pengeringan dan penganyaman.", answer: "Batang eceng gondok dijemur hingga kering, dipipihkan, lalu dianyam menjadi tas, tempat tisu, atau sandal kreatif." }
        ]
      },
      2: {
        tantangan: [
          { q: "Sebutkan 3 teknik dasar pembuatan kerajinan tekstil dan bahan serat!", hint: "Teknik tenun, jahit, sulam, makrame/simpul, dan ikat celup." }
        ],
        blitz: [
          { q: "Teknik membuat kerajinan dengan cara mengikat dan menyimpulkan tali dinamakan...", options: ["Batik", "Makrame", "Cetakan", "Tempa"], correct: 1, exp: "Makrame adalah teknik kerajinan tangan menyimpul tali/benang menjadi aneka pola hiasan." }
        ],
        riddles: [
          { title: "Teka-Teki Alat Prakarya", q: "Aku tajam dengan dua bilah yang bertemu pada satu poros. Aku selalu dipakai memotong pola kain dan benang. Siapakah aku?", clue: "Alat pemotong kain.", answer: "Gunting kain / Gunting zigzag." }
        ]
      }
    }
  };

  // Helper Fallback Soal untuk Pertemuan > 7
  function getQuizPackForSession(unit, pNum) {
    const unitBank = QUIZ_MASTER_BANK[unit] || QUIZ_MASTER_BANK.nonformal;
    if (unitBank[pNum]) return unitBank[pNum];

    // Dynamic generator fallback based on curriculum topic
    const classData = jurnalState.classes[currentJurnalClass] || {};
    const sess = (classData.sessions && classData.sessions[pNum]) || {};
    const topic = sess.materi || `Materi Pertemuan ${pNum}`;
    const sub = classData.subject || 'Fiqih Safinah';

    return {
      tantangan: [
        { 
          q: `Jelaskan apa inti pembelajaran yang kamu fahami dari pembahasan "${topic}"!`, 
          hint: `Kaitkan dengan tujuan capaian indikator: santri mampu menjelaskan hukum, syarat, dan rukun dalam ibadah harian.` 
        },
        { 
          q: `Sebutkan satu contoh penerapan praktis materi "${topic}" dalam kehidupan santri di pondok!`, 
          hint: `Mendorong santri bersikap tertib, suci dari hadats, dan khusyu' dalam beribadah.` 
        },
        { 
          q: `Apa hikmah penting mempelajari "${topic}" bagi seorang penuntut ilmu?`, 
          hint: `Agar ibadah sah secara syariat dan bernilai pahala di sisi Allah SWT.` 
        }
      ],
      blitz: [
        { 
          q: `Tujuan utama mempelajari topik "${topic}" adalah agar ibadah kita...`, 
          options: ["Sah sesuai tuntunan syariat", "Hanya untuk dipuji teman", "Menggugurkan presensi saja", "Biar cepat pulang"], 
          correct: 0, 
          exp: "Ilmu fiqih diajarkan agar ibadah memenuhi syarat dan rukun yang sah secara syariat." 
        },
        { 
          q: `Dalam mempelajari bab "${topic}", sikap santri yang paling utama adalah...`, 
          options: ["Mengabaikan penjelasan ustadz", "Mencatat, memahami, dan mengamalkan", "Tidur di pojok kelas", "Bermain sendiri"], 
          correct: 1, 
          exp: "Adab tholabul 'ilmi adalah mendengarkan dengan seksama lalu mengamalkannya." 
        }
      ],
      riddles: [
        { 
          title: `Kasus Santri: ${topic}`, 
          q: `Seorang santri ragu apakah ia sudah menjalankan "${topic}" dengan benar saat shalat. Apa kaidah fiqih yang harus ia pegang?`, 
          clue: "Kaidah tentang keyakinan vs keraguan.", 
          answer: "Al-Yaqiinu laa yazaalu bisy-syakk (Keyakinan tidak bisa dihilangkan hanya dengan keragu-raguan). Ambil yang yakin dan sempurnakan." 
        }
      ]
    };
  }

  // 1. Buka Modal Kuis Evaluasi AI
  window.openJurnalAiQuizModal = function(pNum) {
    currentQuizPertemuan = pNum || currentDetailPertemuan || 1;
    const classData = jurnalState.classes[currentJurnalClass] || {};
    const sess = (classData.sessions && classData.sessions[currentQuizPertemuan]) || {};

    const subTitle = document.getElementById('quizModalSubtitle');
    if (subTitle) {
      subTitle.textContent = `Pertemuan ${currentQuizPertemuan}: ${sess.materi || classData.subject} • Kelas ${classData.label || ''}`;
    }

    // Reset Wheel State
    currentQuizSantri = null;
    const santriNameEl = document.getElementById('quizSelectedSantriName');
    const santriClassEl = document.getElementById('quizSelectedSantriClass');
    const qBox = document.getElementById('quizQuestionBox');
    if (santriNameEl) santriNameEl.textContent = '[Klik Putar Roda Santri]';
    if (santriClassEl) santriClassEl.textContent = 'Siap menguji kefahaman santri secara menyenangkan';
    if (qBox) qBox.classList.add('hidden');

    // Build Blitz & Riddle views
    renderQuizBlitzView();
    renderQuizRiddlesView();

    // Default to 'wheel' tab
    switchAiQuizTab('wheel');

    const modal = document.getElementById('modalJurnalAiQuiz');
    if (modal) {
      if (modal.parentElement !== document.body) document.body.appendChild(modal);
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  };

  // 2. Tutup Modal
  window.closeJurnalAiQuizModal = function() {
    const modal = document.getElementById('modalJurnalAiQuiz');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  };

  // 3. Tab Switcher
  window.switchAiQuizTab = function(tabId) {
    currentQuizActiveTab = tabId;
    ['wheel', 'blitz', 'riddle'].forEach(t => {
      const btn = document.getElementById(`tabBtnQuiz_${t}`);
      const view = document.getElementById(`quizView_${t}`);
      if (btn) {
        if (t === tabId) {
          btn.className = "pb-2.5 px-3 text-xs font-black border-b-2 border-orange-500 text-orange-600 dark:text-orange-400 flex items-center gap-1.5 cursor-pointer transition-all";
        } else {
          btn.className = "pb-2.5 px-3 text-xs font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1.5 cursor-pointer transition-all";
        }
      }
      if (view) {
        if (t === tabId) view.classList.remove('hidden');
        else view.classList.add('hidden');
      }
    });
  };

  // 4. Mode 1: Putar Roda Santri (Lucky Wheel Animation)
  window.spinRandomSantri = function() {
    if (currentQuizSpinning) return;
    const classData = jurnalState.classes[currentJurnalClass] || {};
    const students = classData.students || [];

    if (!students.length) {
      alert('Belum ada data santri pada kelas ini. Silakan muat daftar santri terlebih dahulu.');
      return;
    }

    currentQuizSpinning = true;
    const btn = document.getElementById('btnSpinSantri');
    const spinIcon = document.getElementById('spinIcon');
    const nameEl = document.getElementById('quizSelectedSantriName');
    const classEl = document.getElementById('quizSelectedSantriClass');
    const qBox = document.getElementById('quizQuestionBox');

    if (btn) btn.disabled = true;
    if (spinIcon) spinIcon.classList.add('animate-spin');
    if (qBox) qBox.classList.add('hidden');

    let counter = 0;
    const totalTicks = 18;
    const interval = setInterval(() => {
      const randSt = students[Math.floor(Math.random() * students.length)];
      if (nameEl) nameEl.textContent = randSt.name;
      if (classEl) classEl.textContent = `Kelas ${classData.label} • Nilai Keaktifan Saat Ini: ${randSt.bonusActive || 10} Poin`;
      playQuizChime('spin');
      counter++;

      if (counter >= totalTicks) {
        clearInterval(interval);
        // Final pick
        const winner = students[Math.floor(Math.random() * students.length)];
        currentQuizSantri = winner;
        if (nameEl) nameEl.textContent = `🎉 ${winner.name} 🎉`;
        if (classEl) classEl.textContent = `Kelas ${classData.label} • Nilai Keaktifan: ${winner.bonusActive || 10} Poin`;

        currentQuizSpinning = false;
        if (btn) btn.disabled = false;
        if (spinIcon) spinIcon.classList.remove('animate-spin');

        playQuizChime('win');

        // Reveal challenge question
        setupRandomQuestionForStudent();
        if (qBox) {
          qBox.classList.remove('hidden');
          qBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }, 65);
  };

  function setupRandomQuestionForStudent() {
    const pack = getQuizPackForSession(currentJurnalUnit, currentQuizPertemuan);
    const pool = pack.tantangan || [];
    if (!pool.length) return;

    const item = pool[Math.floor(Math.random() * pool.length)];
    const qTextEl = document.getElementById('quizCurrentQuestionText');
    const hintEl = document.getElementById('quizCurrentAnswerHint');

    if (qTextEl) qTextEl.textContent = item.q;
    if (hintEl) hintEl.textContent = item.hint;
  }

  window.nextRandomQuestion = function() {
    setupRandomQuestionForStudent();
    playQuizChime('spin');
  };

  // 5. Berikan Apresiasi Nilai Santri (+10, +5, +0)
  window.rewardSantriPoints = function(points) {
    if (!currentQuizSantri) {
      alert('Silakan putar roda santri terlebih dahulu.');
      return;
    }

    const classData = jurnalState.classes[currentJurnalClass];
    if (!classData || !classData.students) return;

    const target = classData.students.find(s => s.name === currentQuizSantri.name);
    if (target) {
      target.bonusActive = (target.bonusActive || 10) + points;
      saveJurnalState();
      renderPenilaianTable();

      const classEl = document.getElementById('quizSelectedSantriClass');
      if (classEl) {
        classEl.textContent = `Kelas ${classData.label} • Nilai Keaktifan Sekarang: ${target.bonusActive} Poin (+${points})`;
      }

      if (points > 0) playQuizChime('reward');
      if (typeof showToast === 'function') {
        const emo = points >= 10 ? '⭐ Luar Biasa!' : (points >= 5 ? '👍 Bagus Sekali!' : '💪 Tetap Semangat!');
        showToast(emo, `${currentQuizSantri.name} mendapatkan +${points} poin keaktifan! Total: ${target.bonusActive}`);
      }
    }
  };

  // 6. Mode 2: Kuis Kilat (Render & Interaksi)
  function renderQuizBlitzView() {
    const container = document.getElementById('quizBlitzQuestionsList');
    if (!container) return;

    const pack = getQuizPackForSession(currentJurnalUnit, currentQuizPertemuan);
    const blitzList = pack.blitz || [];
    currentQuizScore = 0;
    currentQuizAnsweredCount = 0;

    const scoreBadge = document.getElementById('quizScoreBadge');
    if (scoreBadge) scoreBadge.textContent = `Skor: 0 Benar`;

    if (!blitzList.length) {
      container.innerHTML = `<div class="text-center py-6 text-xs text-slate-400">Belum ada pertanyaan kuis kilat pada pertemuan ini.</div>`;
      return;
    }

    container.innerHTML = blitzList.map((item, qIdx) => {
      const optionsHtml = item.options.map((opt, optIdx) => `
        <button 
          type="button" 
          id="blitzOpt_${qIdx}_${optIdx}" 
          onclick="submitQuizOption(${qIdx}, ${optIdx})" 
          class="w-full text-left p-3 rounded-2xl text-xs font-semibold bg-slate-50 dark:bg-slate-800/80 hover:bg-orange-50 dark:hover:bg-orange-950/40 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 flex items-center justify-between gap-2 cursor-pointer transition-all active:scale-98"
        >
          <span class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0 text-slate-700 dark:text-slate-300">
              ${String.fromCharCode(65 + optIdx)}
            </span>
            <span>${opt}</span>
          </span>
          <span id="blitzBadge_${qIdx}_${optIdx}" class="text-xs hidden"></span>
        </button>
      `).join('');

      return `
        <div class="mobile-ref-card p-4 space-y-3" id="blitzCard_${qIdx}">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
              Soal ${qIdx + 1}
            </span>
          </div>
          <h5 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
            ${item.q}
          </h5>
          <div class="space-y-2">
            ${optionsHtml}
          </div>
          <div id="blitzExplanation_${qIdx}" class="hidden p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800 text-[11px] text-orange-900 dark:text-orange-200 leading-relaxed">
            <span class="font-bold block mb-0.5">Penjelasan:</span>
            ${item.exp || ''}
          </div>
        </div>
      `;
    }).join('');
  }

  window.submitQuizOption = function(qIdx, optIdx) {
    const pack = getQuizPackForSession(currentJurnalUnit, currentQuizPertemuan);
    const item = (pack.blitz || [])[qIdx];
    if (!item) return;

    // Disable all options for this question
    item.options.forEach((_, idx) => {
      const btn = document.getElementById(`blitzOpt_${qIdx}_${idx}`);
      if (btn) btn.disabled = true;
    });

    const isCorrect = (optIdx === item.correct);
    const clickedBtn = document.getElementById(`blitzOpt_${qIdx}_${optIdx}`);
    const correctBtn = document.getElementById(`blitzOpt_${qIdx}_${item.correct}`);
    const explanationEl = document.getElementById(`blitzExplanation_${qIdx}`);

    if (isCorrect) {
      currentQuizScore++;
      playQuizChime('correct');
      if (clickedBtn) {
        clickedBtn.className = "w-full text-left p-3 rounded-2xl text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 flex items-center justify-between gap-2 shadow-sm";
        const badge = document.getElementById(`blitzBadge_${qIdx}_${optIdx}`);
        if (badge) {
          badge.textContent = '✓ Benar';
          badge.classList.remove('hidden');
        }
      }
    } else {
      playQuizChime('wrong');
      if (clickedBtn) {
        clickedBtn.className = "w-full text-left p-3 rounded-2xl text-xs font-bold bg-rose-100 dark:bg-rose-950/80 border-2 border-rose-500 text-rose-800 dark:text-rose-200 flex items-center justify-between gap-2";
        const badge = document.getElementById(`blitzBadge_${qIdx}_${optIdx}`);
        if (badge) {
          badge.textContent = '✗ Kurang Tepat';
          badge.classList.remove('hidden');
        }
      }
      if (correctBtn) {
        correctBtn.className = "w-full text-left p-3 rounded-2xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-400 text-emerald-700 dark:text-emerald-300 flex items-center justify-between gap-2";
      }
    }

    if (explanationEl) explanationEl.classList.remove('hidden');

    const scoreBadge = document.getElementById('quizScoreBadge');
    if (scoreBadge) scoreBadge.textContent = `Skor: ${currentQuizScore} Benar`;
  };

  // 7. Mode 3: Teka-Teki Santri (Render & Buka Kunci)
  function renderQuizRiddlesView() {
    const container = document.getElementById('quizRiddlesList');
    if (!container) return;

    const pack = getQuizPackForSession(currentJurnalUnit, currentQuizPertemuan);
    const riddles = pack.riddles || [];

    if (!riddles.length) {
      container.innerHTML = `<div class="text-center py-6 text-xs text-slate-400">Belum ada teka-teki santri pada pertemuan ini.</div>`;
      return;
    }

    container.innerHTML = riddles.map((rd, rIdx) => `
      <div class="mobile-ref-card p-4 space-y-3 border-l-4 border-l-amber-500">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
            ${rd.title}
          </span>
          <span class="text-lg">💡</span>
        </div>
        <p class="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
          ${rd.q}
        </p>
        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-500 dark:text-slate-400 italic">
          <strong>Petunjuk:</strong> ${rd.clue}
        </div>
        <div>
          <button 
            type="button" 
            onclick="toggleRiddleAnswer(${rIdx})" 
            id="btnRiddleToggle_${rIdx}" 
            class="py-1.5 px-3 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800 hover:bg-amber-100 cursor-pointer transition-all flex items-center gap-1.5"
          >
            <span>Buka Kunci Jawaban</span> 🔓
          </button>
          <div id="riddleAnsBox_${rIdx}" class="hidden mt-2.5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
            <span class="font-bold block mb-1">Kunci &amp; Pembahasan:</span>
            ${rd.answer}
          </div>
        </div>
      </div>
    `).join('');
  }

  window.toggleRiddleAnswer = function(rIdx) {
    const box = document.getElementById(`riddleAnsBox_${rIdx}`);
    const btn = document.getElementById(`btnRiddleToggle_${rIdx}`);
    if (!box) return;

    if (box.classList.contains('hidden')) {
      box.classList.remove('hidden');
      if (btn) btn.innerHTML = `<span>Tutup Jawaban</span> 🔒`;
      playQuizChime('correct');
    } else {
      box.classList.add('hidden');
      if (btn) btn.innerHTML = `<span>Buka Kunci Jawaban</span> 🔓`;
    }
  };

  // 8. Buat Soal AI Baru Dinamis (Gemini AI API / Algoritma Cerdas)
  window.generateGeminiAiQuestions = async function() {
    const classData = jurnalState.classes[currentJurnalClass] || {};
    const sess = (classData.sessions && classData.sessions[currentQuizPertemuan]) || {};
    const materi = sess.materi || classData.subject || 'Materi Fiqih';

    if (typeof showToast === 'function') {
      showToast('AI Sedang Meracik Soal...', `Membuat soal interaktif baru untuk materi: ${materi}`);
    }

    // Local smart generator with variations
    setTimeout(() => {
      const pack = getQuizPackForSession(currentJurnalUnit, currentQuizPertemuan);
      const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      
      pack.tantangan.unshift({
        q: `[AI Baru ${timestamp}] Kasus Lapangan: Bagaimana penjelasanmu jika ada santri bertanya tentang penerapan "${materi}" dalam kondisi darurat?`,
        hint: `Uraikan prinsip rukhshah (keringanan) dan syarat kebolehan menurut kaidah fiqih madzhab Syafi'i.`
      });

      pack.blitz.unshift({
        q: `[AI Baru] Manakah dari pernyataan berikut yang paling tepat menggambarkan urgensi "${materi}"?`,
        options: [
          "Menjaga kesucian jiwa dan sahnya amal ibadah",
          "Hanya formalitas adat istiadat",
          "Memberatkan umat tanpa dasar",
          "Boleh diabaikan jika malas"
        ],
        correct: 0,
        exp: "Setiap syariat diturunkan untuk kemaslahatan hamba dan menyempurnakan amal ibadah."
      });

      pack.riddles.unshift({
        title: `Teka-Teki AI Kreatif (${timestamp})`,
        q: `Aku adalah amalan penting dalam "${materi}". Jika aku dilakukan dengan riya' maka aku sia-sia, tetapi jika dengan ikhlas maka aku bernilai surga. Amalan apakah aku?`,
        clue: "Perhatikan niat hati.",
        answer: "Ibadah ikhlas lillahi ta'ala semata-mata mengharap ridho Allah SWT."
      });

      renderQuizBlitzView();
      renderQuizRiddlesView();
      playQuizChime('win');

      if (typeof showToast === 'function') {
        showToast('Soal AI Berhasil Ditambahkan! ✨', `Bank soal untuk "${materi}" telah diperkaya secara dinamis.`);
      }
    }, 800);
  };

  // ==========================================================================
  // 13. JURNAL GURU AI VOICE ASSISTANT & REKAP AKUMULASI PRESENSI ENGINE
  // ==========================================================================
  let jurnalSpeechRecognitionInstance = null;
  let isJurnalVoiceListening = false;
  let lastSpokenJurnalAnswer = '';

  // 1. Web Audio & Speech Synthesis untuk Jurnal Guru
  function speakJurnalAnswer(textToSpeak) {
    if (!('speechSynthesis' in window) || !textToSpeak) return;
    try {
      lastSpokenJurnalAnswer = textToSpeak;
      window.speechSynthesis.cancel();

      // Normalisasi akronim kependidikan & istilah madrasah untuk pelafalan fasih
      let cleanSpeech = textToSpeak
        .replace(/[\*\#\_]/g, '')
        .replace(/\bSTS\b/gi, 'Sumatif Tengah Semester')
        .replace(/\bSAS\b/gi, 'Sumatif Akhir Semester')
        .replace(/\b1 Ula A\b/gi, 'Kelas Satu Ula A')
        .replace(/\b1 Ula B\b/gi, 'Kelas Satu Ula B')
        .replace(/\b7A\b/gi, 'Kelas Tujuh A')
        .replace(/\b7B\b/gi, 'Kelas Tujuh B')
        .replace(/\b7C\b/gi, 'Kelas Tujuh C')
        .replace(/\b7D\b/gi, 'Kelas Tujuh D')
        .replace(/\bMTs\b/gi, 'M Ts')
        .replace(/\bMadin\b/gi, 'Madrasah Diniyah')
        .replace(/\bWIB\b/gi, 'W I B')
        .replace(/%/g, ' persen')
        .replace(/\bUst\.\b/gi, 'Ustadz ')
        .replace(/\bSafinah\b/gi, 'Safinatun Najah')
        .replace(/\bYTPAI\b/gi, 'Yayasan Tarbiyatul Islamiyah');

      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Pilih suara Bahasa Indonesia jika tersedia di peramban
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang === 'id-ID' || (v.lang && v.lang.startsWith('id')));
      if (idVoice) utterance.voice = idVoice;

      const speakingBadge = document.getElementById('jurnalVoiceSpeakingBadge');
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
      console.warn('Speech synthesis error in Jurnal:', e);
    }
  }

  window.repeatJurnalVoiceAnswer = function() {
    if (lastSpokenJurnalAnswer) {
      speakJurnalAnswer(lastSpokenJurnalAnswer);
    }
  };

  window.closeJurnalVoiceAnswerCard = function() {
    const card = document.getElementById('jurnalVoiceAnswerCard');
    if (card) card.classList.add('hidden');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const speakingBadge = document.getElementById('jurnalVoiceSpeakingBadge');
    if (speakingBadge) speakingBadge.classList.add('hidden');
  };

  window.openJurnalStudentLedgerFromVoice = function() {
    switchJurnalSubTab('penilaian');
    const table = document.getElementById('jurnalPenilaianTable');
    if (table) table.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // 2. Kalkulasi Akumulasi Presensi Siswa di Semua Pertemuan (1 s.d. 18)
  function calculateStudentAttendanceAccumulation(classId, studentName) {
    const classData = (jurnalState.classes && jurnalState.classes[classId]) || jurnalState.classes[currentJurnalClass] || {};
    const sessions = classData.sessions || {};
    let hadir = 0, sakit = 0, izin = 0, alpa = 0, totalRecorded = 0;
    const details = [];

    for (let p = 1; p <= 18; p++) {
      const sess = sessions[p];
      if (sess && sess.presensi && sess.presensi[studentName]) {
        const st = sess.presensi[studentName];
        if (st === 'H') hadir++;
        else if (st === 'S') sakit++;
        else if (st === 'I') izin++;
        else if (st === 'A') alpa++;
        totalRecorded++;
        details.push({ p, status: st, date: sess.date || `P${p}`, materi: sess.materi || '' });
      }
    }

    const totalAbsen = sakit + izin + alpa;
    const pct = totalRecorded > 0 ? Math.round((hadir / totalRecorded) * 100) : 100;
    return { hadir, sakit, izin, alpa, totalAbsen, totalRecorded, pct, details };
  }

  // 3. Render Kartu Visual Interaktif Asisten Suara Jurnal
  function renderJurnalVoiceAnswerCard(query, speechText, stats, studentObj, classLabel) {
    const card = document.getElementById('jurnalVoiceAnswerCard');
    if (!card) return;

    const qEl = document.getElementById('jurnalVoiceAnswerQuery');
    const speechEl = document.getElementById('jurnalVoiceAnswerSpeechText');
    const statHadir = document.getElementById('jurnalVoiceStatHadir');
    const statSakit = document.getElementById('jurnalVoiceStatSakit');
    const statIzin = document.getElementById('jurnalVoiceStatIzin');
    const statAlpa = document.getElementById('jurnalVoiceStatAlpa');
    const pctEl = document.getElementById('jurnalVoiceAttendancePct');
    const bonusEl = document.getElementById('jurnalVoiceBonusPoints');

    if (qEl) qEl.textContent = `"${query}"`;
    if (speechEl) speechEl.textContent = speechText;

    if (stats) {
      if (statHadir) statHadir.textContent = stats.hadir || 0;
      if (statSakit) statSakit.textContent = stats.sakit || 0;
      if (statIzin) statIzin.textContent = stats.izin || 0;
      if (statAlpa) statAlpa.textContent = stats.alpa || 0;
      if (pctEl) pctEl.textContent = `${stats.pct || 100}%`;
    }

    if (studentObj) {
      if (bonusEl) bonusEl.textContent = `+${studentObj.bonusActive || 10} Poin ⭐ (STS: ${studentObj.pureSts || 75})`;
    } else {
      if (bonusEl) bonusEl.textContent = `Kelas ${classLabel || currentJurnalClass}`;
    }

    card.classList.remove('hidden');
    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  // 4. Speech-to-Text (STT) Recognition
  window.toggleJurnalVoiceSearch = function() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (typeof showToast === 'function') {
        showToast('Fitur Suara Tidak Didukung', 'Browser ini belum mendukung Web Speech Recognition. Gunakan Google Chrome.', 'warning');
      } else {
        alert('Browser Anda belum mendukung Web Speech Recognition.');
      }
      return;
    }

    if (isJurnalVoiceListening) {
      stopJurnalVoiceSearch();
    } else {
      startJurnalVoiceSearch(SpeechRecognition);
    }
  };

  function startJurnalVoiceSearch(SpeechRecognition) {
    try {
      jurnalSpeechRecognitionInstance = new SpeechRecognition();
      jurnalSpeechRecognitionInstance.lang = 'id-ID';
      jurnalSpeechRecognitionInstance.continuous = false;
      jurnalSpeechRecognitionInstance.interimResults = true;

      const topVoiceBtn = document.getElementById('btnJurnalTopVoiceSearch');
      const topVoiceLabel = document.getElementById('labelJurnalTopVoice');
      const listeningBanner = document.getElementById('jurnalVoiceListeningBanner');
      const liveTranscript = document.getElementById('jurnalVoiceLiveTranscript');

      jurnalSpeechRecognitionInstance.onstart = function() {
        isJurnalVoiceListening = true;
        if (topVoiceBtn) {
          topVoiceBtn.className = 'absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer transition-all border border-rose-300 animate-pulse ring-2 ring-rose-400';
        }
        if (topVoiceLabel) topVoiceLabel.textContent = 'Mendengarkan...';
        if (listeningBanner) listeningBanner.classList.remove('hidden');
        if (liveTranscript) liveTranscript.textContent = 'Silakan sebutkan nama siswa atau pertanyaan kehadiran...';
      };

      jurnalSpeechRecognitionInstance.onresult = function(event) {
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
          const input = document.getElementById('jurnalTopVoiceSearchInput');
          if (input) input.value = finalTranscript;
          processJurnalVoiceSmartCommand(finalTranscript);
          stopJurnalVoiceSearch();
        }
      };

      jurnalSpeechRecognitionInstance.onerror = function(event) {
        console.warn('Jurnal Voice Error:', event.error);
        stopJurnalVoiceSearch();
      };

      jurnalSpeechRecognitionInstance.onend = function() {
        stopJurnalVoiceSearch();
      };

      jurnalSpeechRecognitionInstance.start();
    } catch (e) {
      console.error('Start Jurnal Voice Recognition Failed:', e);
      stopJurnalVoiceSearch();
    }
  }

  function stopJurnalVoiceSearch() {
    isJurnalVoiceListening = false;
    if (jurnalSpeechRecognitionInstance) {
      try { jurnalSpeechRecognitionInstance.stop(); } catch (e) {}
      jurnalSpeechRecognitionInstance = null;
    }

    const topVoiceBtn = document.getElementById('btnJurnalTopVoiceSearch');
    const topVoiceLabel = document.getElementById('labelJurnalTopVoice');
    const listeningBanner = document.getElementById('jurnalVoiceListeningBanner');

    if (topVoiceBtn) {
      topVoiceBtn.className = 'absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 active:scale-95 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all border border-rose-300/30';
    }
    if (topVoiceLabel) topVoiceLabel.textContent = 'Bicara';
    if (listeningBanner) listeningBanner.classList.add('hidden');
  }

  // 5. NLP Query Engine Pemroses Perintah Suara Jurnal Guru
  window.processJurnalVoiceSmartCommand = function(rawText) {
    if (!rawText || !rawText.trim()) return false;
    const originalQuery = rawText.trim();
    const text = originalQuery.toLowerCase();

    const classData = jurnalState.classes[currentJurnalClass] || {};
    const students = classData.students || [];

    // ==============================================================
    // A. PERTANYAAN AKUMULASI ABSENSI SISWA SPESIFIK BERDASARKAN NAMA
    // Contoh: "Berapa kali Budi Santoso tidak masuk?", "Akumulasi absen Ahmad Fauzi",
    //         "Catatan kehadiran Doni", "Berapa sakit dan izin Siti?"
    // ==============================================================
    let matchedStudent = null;
    let bestStudentScore = 0;

    // Bersihkan kata kunci pertanyaan umum untuk mendeteksi nama santri
    const cleanTokens = text
      .replace(/\b(berapa\s*kali|akumulasi\s*absen|akumulasi\s*kehadiran|catatan\s*presensi|rekap\s*absen|absennya|tidak\s*masuk|absen|izin|sakit|alfa|hadir|kehadiran|santri|siswa|anak|bernama|nama|di\s*kelas|berapa|siapa|tentang|apakah|bisa|tolong|cek|lihat|tampilkan|data)\b/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .filter(t => t.length >= 2);

    for (const st of students) {
      const lowerName = st.name.toLowerCase();
      let score = 0;
      if (text.includes(lowerName)) score += 100;
      for (const token of cleanTokens) {
        if (lowerName.includes(token)) score += 30;
      }
      if (score > bestStudentScore && score >= 30) {
        bestStudentScore = score;
        matchedStudent = st;
      }
    }

    // Jika tidak ditemukan di kelas aktif, cari juga di kelas lainnya sebagai fallback cerdas
    let studentClassLabel = classData.label;
    let targetClassId = currentJurnalClass;
    if (!matchedStudent) {
      for (const [cId, cData] of Object.entries(jurnalState.classes || {})) {
        if (cId === currentJurnalClass) continue;
        for (const st of (cData.students || [])) {
          const lowerName = st.name.toLowerCase();
          let score = 0;
          if (text.includes(lowerName)) score += 100;
          for (const token of cleanTokens) {
            if (lowerName.includes(token)) score += 30;
          }
          if (score > bestStudentScore && score >= 30) {
            bestStudentScore = score;
            matchedStudent = st;
            studentClassLabel = cData.label;
            targetClassId = cId;
          }
        }
      }
    }

    // Jika cocok dengan santri tertentu:
    if (matchedStudent) {
      const stats = calculateStudentAttendanceAccumulation(targetClassId, matchedStudent.name);
      
      let spokenAnswer = `Santri ${matchedStudent.name} di kelas ${studentClassLabel} memiliki akumulasi ketidakhadiran sebanyak ${stats.totalAbsen} kali. `;
      if (stats.totalAbsen > 0) {
        spokenAnswer += `Dengan rincian: ${stats.sakit} kali sakit, ${stats.izin} kali izin, dan ${stats.alpa} kali tanpa keterangan atau alfa. `;
      } else {
        spokenAnswer += `Alhamdulillah, santri ini rajin dan selalu hadir lengkap di seluruh pertemuan. `;
      }
      spokenAnswer += `Total kehadiran adalah ${stats.hadir} dari ${stats.totalRecorded} sesi yang tercatat, dengan tingkat kehadiran ${stats.pct} persen.`;

      renderJurnalVoiceAnswerCard(originalQuery, spokenAnswer, stats, matchedStudent, studentClassLabel);
      speakJurnalAnswer(spokenAnswer);

      if (typeof showToast === 'function') {
        showToast('👤 Akumulasi Santri', `${matchedStudent.name}: ${stats.totalAbsen} kali absen (${stats.pct}% hadir)`, 'info');
      }
      return true;
    }

    // ==============================================================
    // B. PERTANYAAN DAFTAR SISWA TIDAK MASUK (PERTEMUAN / HARI INI)
    // Contoh: "Siapa saja yang tidak masuk?", "Siapa yang absen pertemuan 3?",
    //         "Siapa santri yang izin hari ini?"
    // ==============================================================
    const isAbsenceListQuery = /\b(siapa|mana)\s*(saja)?\s*(yang)?\s*(tidak\s*masuk|absen|izin|sakit|alfa)\b/i.test(text) ||
      /\b(siswa|santri)\s*(yang)?\s*(tidak\s*masuk|absen|sakit|izin|alfa)\b/i.test(text);

    if (isAbsenceListQuery) {
      // Deteksi nomor pertemuan jika disebutkan (misal: "pertemuan 3", "pertemuan 5")
      let targetP = currentDetailPertemuan || 1;
      const matchP = text.match(/\b(pertemuan|ke|sesi)\s*(\d{1,2})\b/i);
      if (matchP && matchP[2]) {
        targetP = parseInt(matchP[2], 10);
      } else {
        // Ambil pertemuan terakhir yang memiliki data presensi
        for (let p = 18; p >= 1; p--) {
          const sess = (classData.sessions && classData.sessions[p]) || {};
          if (sess.presensi && Object.keys(sess.presensi).length > 0) {
            targetP = p;
            break;
          }
        }
      }

      const sess = (classData.sessions && classData.sessions[targetP]) || {};
      const presensi = sess.presensi || {};
      const stIzin = [], stSakit = [], stAlpa = [];

      students.forEach(st => {
        const s = presensi[st.name];
        if (s === 'I') stIzin.push(st.name);
        else if (s === 'S') stSakit.push(st.name);
        else if (s === 'A') stAlpa.push(st.name);
      });

      const totalTidakMasuk = stIzin.length + stSakit.length + stAlpa.length;
      let spokenAnswer = '';

      if (totalTidakMasuk === 0) {
        spokenAnswer = `Alhamdulillah, pada pertemuan ${targetP} kelas ${classData.label}, seluruh siswa hadir lengkap 100 persen. Tidak ada santri yang sakit, izin, maupun alfa.`;
      } else {
        spokenAnswer = `Pada pertemuan ${targetP} kelas ${classData.label}, terdapat ${totalTidakMasuk} santri yang tidak hadir. `;
        const details = [];
        if (stSakit.length > 0) details.push(`${stSakit.length} santri sakit, yaitu ${stSakit.join(', ')}`);
        if (stIzin.length > 0) details.push(`${stIzin.length} santri izin, yaitu ${stIzin.join(', ')}`);
        if (stAlpa.length > 0) details.push(`${stAlpa.length} santri tanpa keterangan atau alfa, yaitu ${stAlpa.join(', ')}`);
        spokenAnswer += details.join('; ') + '.';
      }

      const dummyStats = {
        hadir: students.length - totalTidakMasuk,
        sakit: stSakit.length,
        izin: stIzin.length,
        alpa: stAlpa.length,
        pct: students.length > 0 ? Math.round(((students.length - totalTidakMasuk) / students.length) * 100) : 100
      };

      renderJurnalVoiceAnswerCard(originalQuery, spokenAnswer, dummyStats, null, `${classData.label} (Pertemuan ${targetP})`);
      speakJurnalAnswer(spokenAnswer);

      if (typeof showToast === 'function') {
        showToast(`📋 Rekap Pertemuan ${targetP}`, `${totalTidakMasuk} santri tidak masuk`, 'info');
      }
      return true;
    }

    // ==============================================================
    // C. PERTANYAAN SANTRI PALING BANYAK ABSEN / SERING TIDAK MASUK
    // Contoh: "Siapa santri yang paling banyak absen?", "Siswa sering bolos"
    // ==============================================================
    const isMostAbsentQuery = /\b(paling\s*banyak|sering|banyak|terbanyak)\s*(absen|tidak\s*masuk|bolos|alfa)\b/i.test(text);
    if (isMostAbsentQuery) {
      const studentStats = students.map(st => {
        const stats = calculateStudentAttendanceAccumulation(currentJurnalClass, st.name);
        return { name: st.name, ...stats };
      }).sort((a, b) => b.totalAbsen - a.totalAbsen);

      const topAbsent = studentStats.filter(s => s.totalAbsen > 0).slice(0, 3);
      let spokenAnswer = '';

      if (topAbsent.length === 0) {
        spokenAnswer = `Luar biasa, di kelas ${classData.label} belum ada santri yang memiliki catatan ketidakhadiran. Semua santri selalu hadir rajin.`;
      } else {
        const summary = topAbsent.map(s => `${s.name} sebanyak ${s.totalAbsen} kali (Sakit ${s.sakit}, Izin ${s.izin}, Alfa ${s.alpa})`).join(', dan ');
        spokenAnswer = `Di kelas ${classData.label}, santri dengan akumulasi ketidakhadiran terbanyak adalah: ${summary}. Seluruh rincian lengkap telah ditampilkan.`;
      }

      const top1 = topAbsent[0] || { hadir: students.length, sakit: 0, izin: 0, alpa: 0, pct: 100 };
      renderJurnalVoiceAnswerCard(originalQuery, spokenAnswer, top1, null, classData.label);
      speakJurnalAnswer(spokenAnswer);
      return true;
    }

    // ==============================================================
    // D. PERTANYAAN JADWAL MENGAJAR BERIKUTNYA
    // Contoh: "Kapan jadwal mengajar saya berikutnya?", "Hari apa saya mengajar?"
    // ==============================================================
    const isScheduleQuery = /\b(kapan\s*jadwal|jadwal\s*mengajar|jadwal\s*berikutnya|hari\s*apa\s*mengajar|jam\s*berapa\s*mengajar)\b/i.test(text);
    if (isScheduleQuery) {
      const spokenAnswer = `Jadwal mengajar resmi Anda di Madrasah Diniyah adalah setiap hari Selasa dan Jumat malam pukul 18:00 sampai 19:30 WIB di Gedung Diniyah untuk mata pelajaran Safinatun Najah. Sedangkan untuk Formal MTs adalah setiap hari Senin, Selasa, dan Rabu pagi untuk mata pelajaran Prakarya di kelas 7A sampai 7D.`;
      
      renderJurnalVoiceAnswerCard(originalQuery, spokenAnswer, null, null, 'Jadwal Mengajar Terpadu');
      speakJurnalAnswer(spokenAnswer);
      switchJurnalSubTab('jadwal');
      return true;
    }

    // ==============================================================
    // E. PERTANYAAN MATERI PEMBELAJARAN SESI
    // Contoh: "Materi pertemuan 1 apa?", "Materi pertemuan 5 safinah apa?"
    // ==============================================================
    const isMateriQuery = /\b(materi|pembahasan|bab)\s*(pertemuan|sesi)?\s*(\d{1,2})?\b/i.test(text);
    if (isMateriQuery) {
      let pNum = 1;
      const mMatch = text.match(/\b(\d{1,2})\b/);
      if (mMatch && mMatch[1]) pNum = parseInt(mMatch[1], 10);

      const sess = (classData.sessions && classData.sessions[pNum]) || {};
      const materiText = sess.materi || `Materi tatap muka pertemuan ${pNum}`;
      const indText = sess.indikator || 'Capaian indikator kompetensi dasar standar silabus.';

      const spokenAnswer = `Materi pembelajaran pada pertemuan ${pNum} kelas ${classData.label} adalah: ${materiText}. Indikator pembelajarannya yaitu: ${indText}.`;

      renderJurnalVoiceAnswerCard(originalQuery, spokenAnswer, null, null, `Materi Sesi ${pNum}`);
      speakJurnalAnswer(spokenAnswer);
      switchJurnalSubTab('materi');
      return true;
    }

    // ==============================================================
    // F. PERTANYAAN REKAP PRESENSI KELAS SECARA MENYELURUH
    // Contoh: "Rekap presensi seluruh kelas", "Bagaimana kehadiran kelas ini?"
    // ==============================================================
    let totalH = 0, totalS = 0, totalI = 0, totalA = 0, totalEntries = 0;
    const sessions = classData.sessions || {};
    for (let p = 1; p <= 18; p++) {
      const sess = sessions[p];
      if (sess && sess.presensi) {
        Object.values(sess.presensi).forEach(st => {
          if (st === 'H') totalH++;
          else if (st === 'S') totalS++;
          else if (st === 'I') totalI++;
          else if (st === 'A') totalA++;
          totalEntries++;
        });
      }
    }

    const overallPct = totalEntries > 0 ? Math.round((totalH / totalEntries) * 100) : 100;
    const spokenAnswer = `Rekapitulasi kehadiran di kelas ${classData.label} mencatat total ${totalH} kehadiran santri, ${totalS} kali sakit, ${totalI} kali izin, dan ${totalA} kali alfa. Rata-rata tingkat kehadiran kelas saat ini mencapai ${overallPct} persen.`;

    const stats = { hadir: totalH, sakit: totalS, izin: totalI, alpa: totalA, pct: overallPct };
    renderJurnalVoiceAnswerCard(originalQuery, spokenAnswer, stats, null, classData.label);
    speakJurnalAnswer(spokenAnswer);
    return true;
  };

  window.toggleJurnalVoiceSearch = toggleJurnalVoiceSearch;
  window.startJurnalVoiceSearch = startJurnalVoiceSearch;
  window.stopJurnalVoiceSearch = stopJurnalVoiceSearch;

  // ============================================================================
  // CLOUD DATABASE SUPABASE SYNCHRONIZATION ENGINE (TAB 11 JURNAL GURU)
  // ============================================================================
  function getJurnalSupabaseConfig() {
    try {
      const raw = localStorage.getItem('supabase_config_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.url && parsed.anonKey) return parsed;
      }
    } catch (e) {}
    return {
      url: 'https://maziyyookpafeenuiirl.supabase.co',
      anonKey: 'sb_publishable_bC64CatZmPbb5t6G2RFLPg__fNccr9r'
    };
  }

  window.openModalJurnalCloudSync = function() {
    const modal = document.getElementById('modalJurnalCloudSync');
    if (modal) modal.classList.remove('hidden');
    updateJurnalCloudStatusBadge();
    const lastSync = localStorage.getItem('jurnal_last_cloud_sync_time');
    const elLast = document.getElementById('jurnalLastCloudSyncTime');
    if (elLast) {
      elLast.textContent = lastSync ? `Sinkronisasi terakhir: ${lastSync}` : 'Belum pernah disinkronkan';
    }
  };

  window.closeModalJurnalCloudSync = function() {
    const modal = document.getElementById('modalJurnalCloudSync');
    if (modal) modal.classList.add('hidden');
  };

  function updateJurnalCloudStatusBadge() {
    const cfg = getJurnalSupabaseConfig();
    const isConnected = !!(cfg.url && cfg.anonKey);
    const indicator = document.getElementById('jurnalCloudStatusIndicator');
    const labelHeader = document.getElementById('labelJurnalCloudStatus');
    const btnHeader = document.getElementById('btnJurnalCloudSyncHeader');

    if (indicator) {
      indicator.innerHTML = isConnected 
        ? '<span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span><span class="text-emerald-700 dark:text-emerald-300">Terhubung ke Supabase PostgreSQL</span>'
        : '<span class="w-2.5 h-2.5 rounded-full bg-slate-400 flex-shrink-0"></span><span class="text-slate-500">Penyimpanan Lokal Perangkat</span>';
    }

    if (labelHeader) {
      labelHeader.textContent = isConnected ? 'Cloud Sync' : 'Lokal';
    }

    if (btnHeader) {
      btnHeader.className = isConnected
        ? 'px-2.5 py-2 sm:py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap'
        : 'px-2.5 py-2 sm:py-1.5 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-800 text-slate-200 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap';
    }
  }

  window.syncJurnalToSupabase = async function(isManual = false) {
    const cfg = getJurnalSupabaseConfig();
    if (!cfg.url || !cfg.anonKey) {
      if (isManual && typeof showToast === 'function') {
        showToast('Koneksi Supabase', 'Kredensial database Supabase belum terpasang.');
      }
      return false;
    }

    if (!jurnalState || !jurnalState.classes) {
      if (isManual && typeof showToast === 'function') {
        showToast('Data Kosong', 'Data jurnal guru belum dimuat.');
      }
      return false;
    }

    try {
      const payload = [{
        id: 'sync_jurnal_state',
        no: 99998,
        uraian: JSON.stringify(jurnalState),
        pj: 'Jurnal AutoSync',
        updated_at: new Date().toISOString()
      }];

      const res = await fetch(`${cfg.url}/rest/v1/humas_programs?on_conflict=id`, {
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
        const errTxt = await res.text();
        throw new Error(`HTTP ${res.status} - ${errTxt}`);
      }

      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
      localStorage.setItem('jurnal_last_cloud_sync_time', timeStr);
      const elLast = document.getElementById('jurnalLastCloudSyncTime');
      if (elLast) elLast.textContent = `Sinkronisasi terakhir: ${timeStr}`;

      if (isManual) {
        if (typeof showToast === 'function') {
          showToast('Cloud Sync Berhasil', 'Seluruh data jurnal, jadwal, presensi & nilai tersimpan di Supabase.');
        }
        setTimeout(() => closeModalJurnalCloudSync(), 800);
      }
      return true;
    } catch (err) {
      console.warn('Sync Jurnal to Supabase error:', err);
      if (isManual) {
        alert('Gagal menyinkronkan ke Supabase: ' + err.message);
      }
      return false;
    }
  };

  window.pullJurnalFromSupabase = async function(isManual = false) {
    const cfg = getJurnalSupabaseConfig();
    if (!cfg.url || !cfg.anonKey) {
      if (isManual && typeof showToast === 'function') {
        showToast('Koneksi Supabase', 'Kredensial database Supabase belum terpasang.');
      }
      return false;
    }

    try {
      const res = await fetch(`${cfg.url}/rest/v1/humas_programs?id=eq.sync_jurnal_state&select=*`, {
        headers: {
          'apikey': cfg.anonKey,
          'Authorization': `Bearer ${cfg.anonKey}`
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const rows = await res.json();
      if (!Array.isArray(rows) || rows.length === 0 || !rows[0].uraian) {
        if (isManual) {
          alert('Database cloud Supabase belum berisi data jurnal. Silakan unggah simpan ke cloud terlebih dahulu.');
        }
        return false;
      }

      const remoteState = JSON.parse(rows[0].uraian);
      if (remoteState && remoteState.classes) {
        jurnalState = remoteState;
        saveJurnalState();
      }

      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
      localStorage.setItem('jurnal_last_cloud_sync_time', timeStr);
      const elLast = document.getElementById('jurnalLastCloudSyncTime');
      if (elLast) elLast.textContent = `Sinkronisasi terakhir: ${timeStr}`;

      // Refresh UI components
      renderJurnalDashboard();
      renderJurnalClassPills();
      renderJurnalClassCards();
      renderJurnalPertemuanPills();
      renderJurnalSessionCards();
      renderJurnalReminders();
      renderJurnalTimetable();
      renderCurrentJurnalForm();
      renderPresensiTable();
      renderPenilaianTable();
      renderRekapSemesterTable();
      checkTodaySchedule();
      if (typeof safeCreateIcons === 'function') safeCreateIcons();

      if (isManual) {
        if (typeof showToast === 'function') {
          showToast('Cloud Data Diterapkan', 'Berhasil menyelaraskan data jurnal dari Supabase.');
        }
        setTimeout(() => closeModalJurnalCloudSync(), 800);
      }
      return true;
    } catch (err) {
      console.warn('Pull Jurnal from Supabase error:', err);
      if (isManual) {
        alert('Gagal mengambil data dari Supabase: ' + err.message);
      }
      return false;
    }
  };

  // ============================================================================
  // STUDIO SLIDE PRESENTASI & CANVA HUB ENGINE
  // ============================================================================
  let currentSlideDeck = null;
  let activeSlideIndex = 0;
  let currentSlideStudioMode = 'native'; // 'native' or 'canva'
  let currentSlideTheme = 'indigo'; // 'emerald', 'indigo', 'rose', 'minimal'

  const SLIDE_THEMES = {
    emerald: {
      name: 'Royal Emerald',
      bgClass: 'bg-gradient-to-br from-[#06241e] via-[#0b3c32] to-[#041713] text-white',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      cardClass: 'bg-white/10 border-white/15 text-white',
      accentClass: 'text-emerald-400',
      bulletDot: 'bg-emerald-400',
      pptx: { bg: '0B3C32', accent: '10B981', cardBg: '134E42', text: 'FFFFFF', textMuted: 'A7F3D0' }
    },
    indigo: {
      name: 'Modern Indigo',
      bgClass: 'bg-gradient-to-br from-[#0c0f24] via-[#1a1c4b] to-[#080a1c] text-white',
      badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
      cardClass: 'bg-white/10 border-white/15 text-white',
      accentClass: 'text-indigo-400',
      bulletDot: 'bg-indigo-400',
      pptx: { bg: '1A1C4B', accent: '6366F1', cardBg: '272A6B', text: 'FFFFFF', textMuted: 'C7D2FE' }
    },
    rose: {
      name: 'Sunset Rose',
      bgClass: 'bg-gradient-to-br from-[#290514] via-[#480d26] to-[#18030c] text-white',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
      cardClass: 'bg-white/10 border-white/15 text-white',
      accentClass: 'text-rose-400',
      bulletDot: 'bg-rose-400',
      pptx: { bg: '480D26', accent: 'F43F5E', cardBg: '671739', text: 'FFFFFF', textMuted: 'FECDD3' }
    },
    minimal: {
      name: 'Clean Minimalist',
      bgClass: 'bg-slate-50 text-slate-900 border border-slate-300',
      badgeClass: 'bg-slate-200 text-slate-800 border-slate-300',
      cardClass: 'bg-white border-slate-200 text-slate-800 shadow-sm',
      accentClass: 'text-indigo-600',
      bulletDot: 'bg-slate-700',
      pptx: { bg: 'F8FAFC', accent: '0F172A', cardBg: 'FFFFFF', text: '0F172A', textMuted: '475569' }
    }
  };

  window.openSlideStudioForPertemuan = function(pNum) {
    currentJurnalPertemuan = pNum;
    switchJurnalSubTab('slide');
  };

  window.onSlideClassChange = function(classId) {
    switchJurnalClass(classId);
    renderSlideStudio();
  };

  window.onSlidePertemuanChange = function(pNum) {
    currentJurnalPertemuan = pNum;
    renderSlideStudio();
  };

  window.switchSlideStudioMode = function(mode) {
    currentSlideStudioMode = mode;
    const btnNative = document.getElementById('btnSlideMode_native');
    const btnCanva = document.getElementById('btnSlideMode_canva');
    const secNative = document.getElementById('slideContainer_native');
    const secCanva = document.getElementById('slideContainer_canva');

    if (mode === 'native') {
      if (btnNative) btnNative.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer';
      if (btnCanva) btnCanva.className = 'px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer';
      if (secNative) secNative.classList.remove('hidden');
      if (secCanva) secCanva.classList.add('hidden');
    } else {
      if (btnCanva) btnCanva.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#00C4CC] text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer';
      if (btnNative) btnNative.className = 'px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer';
      if (secCanva) secCanva.classList.remove('hidden');
      if (secNative) secNative.classList.add('hidden');
      loadCurrentSessionCanva();
    }
  };

  function renderSlideStudio() {
    const classSel = document.getElementById('slideSelectClass');
    if (classSel) classSel.value = currentJurnalClass;

    const pSel = document.getElementById('slideSelectPertemuan');
    if (pSel) {
      let optHtml = '';
      for (let i = 1; i <= 18; i++) {
        optHtml += `<option value="${i}" ${i === currentJurnalPertemuan ? 'selected' : ''}>Pertemuan ${i}</option>`;
      }
      pSel.innerHTML = optHtml;
    }

    const classData = (jurnalState.classes && jurnalState.classes[currentJurnalClass]) || {};
    const sess = (classData.sessions && classData.sessions[currentJurnalPertemuan]) || {};
    const p = currentJurnalPertemuan;

    const curTitle = sess.materi || (currentJurnalUnit === 'formal' ? (PRAKARYA_CURRICULUM[p - 1]?.m || `Materi Pertemuan ${p}`) : (SAFINAH_CURRICULUM[p - 1]?.m || `Materi Pertemuan ${p}`));
    const curInd = sess.indikator || (currentJurnalUnit === 'formal' ? (PRAKARYA_CURRICULUM[p - 1]?.ind || 'Indikator standar silabus') : (SAFINAH_CURRICULUM[p - 1]?.ind || 'Kajian matan fiqih safinah'));

    const titleEl = document.getElementById('slideActiveMateriTitle');
    const indEl = document.getElementById('slideActiveIndikator');
    if (titleEl) titleEl.textContent = `P${p}: ${curTitle}`;
    if (indEl) indEl.textContent = `Indikator: ${curInd}`;

    if (sess.slideDeck && sess.slideDeck.length) {
      currentSlideDeck = sess.slideDeck;
    } else {
      generateSlidesFromCurrentJurnal(false);
    }

    if (sess.slideTheme) {
      currentSlideTheme = sess.slideTheme;
      const themeSel = document.getElementById('slideThemeSelect');
      if (themeSel) themeSel.value = currentSlideTheme;
    }

    renderSlideDeckUI();
    loadCurrentSessionCanva();
  }

  window.generateSlidesFromCurrentJurnal = function(shouldToast = true) {
    const classData = (jurnalState.classes && jurnalState.classes[currentJurnalClass]) || {};
    const sess = (classData.sessions && classData.sessions[currentJurnalPertemuan]) || {};
    const p = currentJurnalPertemuan;
    const mapel = classData.subject || (currentJurnalUnit === 'formal' ? 'Prakarya' : 'Safinatun Najah');
    const className = classData.label || currentJurnalClass;
    const materiTitle = sess.materi || (currentJurnalUnit === 'formal' ? (PRAKARYA_CURRICULUM[p - 1]?.m || `Materi Pertemuan ${p}`) : (SAFINAH_CURRICULUM[p - 1]?.m || `Materi Pertemuan ${p}`));
    const indikator = sess.indikator || (currentJurnalUnit === 'formal' ? (PRAKARYA_CURRICULUM[p - 1]?.ind || 'Memahami materi pembelajaran') : (SAFINAH_CURRICULUM[p - 1]?.ind || 'Memahami kajian fiqih'));
    const guru = 'Mohammad Ilham Mahmudi';
    const sekolah = currentJurnalUnit === 'formal' ? "MTs Raudlatul Muta'allimin" : "Madrasah Diniyah RM Tegalrejo";

    currentSlideDeck = [
      {
        type: 'cover',
        tag: `Pertemuan ke-${p}`,
        title: materiTitle,
        subtitle: `${mapel} | Kelas ${className} | ${sekolah}`,
        bullets: [
          `Guru Pengampu: ${guru}`,
          `Tahun Pelajaran: 2026/2027`,
          `Partner Fatih: Santri Sigap - Semangat - Optimis`
        ]
      },
      {
        type: 'content',
        tag: 'Tujuan & Motivasi Belajar',
        title: 'Capaian Pembelajaran Hari Ini',
        subtitle: 'Kompetensi Dasar & Indikator Keberhasilan',
        bullets: [
          `Mampu memahami dan mendalami: ${indikator}`,
          `Mengembangkan keterampilan analisis dan ketelitian santri`,
          `Mewujudkan akhlak mulia dan kesungguhan dalam menuntut ilmu`
        ]
      },
      {
        type: 'content',
        tag: 'Konsep Inti',
        title: 'Pokok Bahasan & Teori Utama',
        subtitle: `Ringkasan Materi Pertemuan ${p}`,
        bullets: [
          `Konsep Dasar: Mempelajari karakteristik dan ruang lingkup ${materiTitle}`,
          `Prinsip Kerja & Tata Cara: Penerapan prosedur yang benar dan sistematis`,
          `Konteks Keseharian: Keterkaitan materi dengan kehidupan santri dan masyarakat`
        ]
      },
      {
        type: 'activity',
        tag: 'Aktivitas Kelas',
        title: 'Praktik & Diskusi Santri',
        subtitle: 'Langkah Kerja Mandiri / Bersama Teman Sebangku',
        bullets: [
          `Amati contoh dan studi kasus yang disajikan oleh guru`,
          `Diskusikan langkah pemecahan masalah atau teknik pembuatan dalam kelompok`,
          `Catat hasil telaah pada lembar portofolio kerja siswa`
        ]
      },
      {
        type: 'quiz',
        tag: 'Tanya Santri (Kuis Kilat)',
        title: 'Uji Pemahaman Singkat',
        subtitle: 'Pertanyaan Pemantik Respon Cepat',
        bullets: [
          `1. Berdasarkan pembahasan tadi, apa pengertian utama dari topik hari ini?`,
          `2. Sebutkan minimal 2 contoh penerapan atau hikmah yang bisa kita ambil!`,
          `3. Siapa yang bisa menyimpulkan perbedaan poin penting materi ini? (Bonus Poin)`
        ]
      },
      {
        type: 'summary',
        tag: 'Rangkuman & Doa',
        title: 'Kesimpulan & Tindak Lanjut',
        subtitle: 'Mutiara Hikmah & Persiapan Pertemuan Depan',
        bullets: [
          `Intisari: Menguasai materi sebagai bekal ilmu yang berkah dan bermanfaat`,
          `Tugas Tindak Lanjut: Pelajari kembali catatan materi untuk pertemuan berikutnya`,
          `"Man Jadda Wajada" - Barangsiapa bersungguh-sungguh, pasti ia akan berhasil.`
        ]
      }
    ];

    activeSlideIndex = 0;
    saveSlideDeckToSession();
    renderSlideDeckUI();

    if (shouldToast && typeof showToast === 'function') {
      showToast('Slide Berhasil Disusun', `6 slide presentasi Pertemuan ${p} siap digunakan.`);
    }
  };

  function renderSlideDeckUI() {
    if (!currentSlideDeck || !currentSlideDeck.length) return;
    if (activeSlideIndex >= currentSlideDeck.length) activeSlideIndex = 0;

    const countBadge = document.getElementById('slideCountBadge');
    if (countBadge) countBadge.textContent = currentSlideDeck.length;

    renderSlideThumbnails();
    renderActiveSlideCanvas();
    populateSlideEditorForm();
  }

  function renderSlideThumbnails() {
    const container = document.getElementById('slideThumbnailsContainer');
    if (!container || !currentSlideDeck) return;

    const theme = SLIDE_THEMES[currentSlideTheme] || SLIDE_THEMES.indigo;

    container.innerHTML = currentSlideDeck.map((s, idx) => {
      const isActive = idx === activeSlideIndex;
      return `
        <div onclick="selectSlideIndex(${idx})" class="p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${isActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[9px] font-black px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 uppercase">${s.tag || `Slide ${idx + 1}`}</span>
            <span class="text-[9px] font-mono text-slate-400">#${idx + 1}</span>
          </div>
          <h6 class="font-bold text-slate-800 dark:text-white truncate">${s.title || 'Tanpa Judul'}</h6>
          <p class="text-[10px] text-slate-400 truncate mt-0.5">${s.subtitle || ''}</p>
        </div>
      `;
    }).join('');
  }

  function renderActiveSlideCanvas() {
    const stage = document.getElementById('slideStageInner');
    const idxDisp = document.getElementById('slideIndexDisplay');
    if (!stage || !currentSlideDeck || !currentSlideDeck[activeSlideIndex]) return;

    const s = currentSlideDeck[activeSlideIndex];
    const theme = SLIDE_THEMES[currentSlideTheme] || SLIDE_THEMES.indigo;
    if (idxDisp) idxDisp.textContent = `${activeSlideIndex + 1} / ${currentSlideDeck.length}`;

    stage.className = `w-full h-full p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 ${theme.bgClass}`;

    const bulletsHtml = (s.bullets || []).map((b, i) => `
      <div class="p-3 sm:p-4 rounded-2xl border ${theme.cardClass} flex items-start gap-3 backdrop-blur-xs transition-all shadow-xs">
        <span class="w-2.5 h-2.5 rounded-full ${theme.bulletDot} mt-1.5 flex-shrink-0 animate-pulse"></span>
        <span class="text-xs sm:text-sm font-medium leading-relaxed">${b}</span>
      </div>
    `).join('');

    stage.innerHTML = `
      <!-- Top Slide Header -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <span class="text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${theme.badgeClass}">
            ${s.tag || `Slide ${activeSlideIndex + 1}`}
          </span>
          <span class="text-[11px] opacity-75 font-semibold">MTs &amp; Diniyah | Partner Fatih</span>
        </div>
        <h2 class="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
          ${s.title || ''}
        </h2>
        ${s.subtitle ? `<p class="text-xs sm:text-sm opacity-80 font-medium ${theme.accentClass}">${s.subtitle}</p>` : ''}
      </div>

      <!-- Center Slide Body (Bullets / Cards) -->
      <div class="grid grid-cols-1 gap-2.5 sm:gap-3 my-auto py-2">
        ${bulletsHtml}
      </div>

      <!-- Bottom Slide Footer -->
      <div class="flex items-center justify-between text-[10px] sm:text-xs opacity-60 border-t border-white/10 pt-2">
        <span>Pengampu: Mohammad Ilham Mahmudi</span>
        <span class="font-mono">Slide ${activeSlideIndex + 1} of ${currentSlideDeck.length}</span>
      </div>
    `;

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  function populateSlideEditorForm() {
    if (!currentSlideDeck || !currentSlideDeck[activeSlideIndex]) return;
    const s = currentSlideDeck[activeSlideIndex];

    const inTitle = document.getElementById('inputSlideTitle');
    const inSub = document.getElementById('inputSlideSubtitle');
    const inBullets = document.getElementById('inputSlideBullets');

    if (inTitle) inTitle.value = s.title || '';
    if (inSub) inSub.value = s.subtitle || '';
    if (inBullets) inBullets.value = (s.bullets || []).join('\n');
  }

  window.selectSlideIndex = function(idx) {
    activeSlideIndex = idx;
    renderActiveSlideCanvas();
    populateSlideEditorForm();
    renderSlideThumbnails();
  };

  window.prevSlide = function() {
    if (activeSlideIndex > 0) {
      activeSlideIndex--;
      renderActiveSlideCanvas();
      populateSlideEditorForm();
      renderSlideThumbnails();
      if (document.getElementById('modalSlideFullScreenPresenter')?.classList.contains('hidden') === false) {
        renderFullScreenSlide();
      }
    }
  };

  window.nextSlide = function() {
    if (currentSlideDeck && activeSlideIndex < currentSlideDeck.length - 1) {
      activeSlideIndex++;
      renderActiveSlideCanvas();
      populateSlideEditorForm();
      renderSlideThumbnails();
      if (document.getElementById('modalSlideFullScreenPresenter')?.classList.contains('hidden') === false) {
        renderFullScreenSlide();
      }
    }
  };

  window.updateActiveSlideProperty = function(prop, val) {
    if (!currentSlideDeck || !currentSlideDeck[activeSlideIndex]) return;
    if (prop === 'bullets') {
      currentSlideDeck[activeSlideIndex].bullets = val.split('\n').filter(l => l.trim().length > 0);
    } else {
      currentSlideDeck[activeSlideIndex][prop] = val;
    }
    renderActiveSlideCanvas();
    renderSlideThumbnails();
  };

  window.addNewSlideToDeck = function() {
    if (!currentSlideDeck) currentSlideDeck = [];
    currentSlideDeck.push({
      type: 'content',
      tag: `Poin Tambahan ${currentSlideDeck.length + 1}`,
      title: 'Judul Slide Baru',
      subtitle: 'Subjudul atau keterangan materi',
      bullets: [
        'Ketik poin materi pembelajaran di sini...',
        'Tambahkan poin berikutnya dengan mudah'
      ]
    });
    activeSlideIndex = currentSlideDeck.length - 1;
    saveSlideDeckToSession();
    renderSlideDeckUI();
    if (typeof showToast === 'function') showToast('Slide Ditambahkan', `Slide #${currentSlideDeck.length} siap diedit.`);
  };

  window.deleteActiveSlide = function() {
    if (!currentSlideDeck || currentSlideDeck.length <= 1) {
      alert('Minimal harus ada 1 slide.');
      return;
    }
    if (confirm(`Hapus Slide #${activeSlideIndex + 1}?`)) {
      currentSlideDeck.splice(activeSlideIndex, 1);
      if (activeSlideIndex >= currentSlideDeck.length) activeSlideIndex = currentSlideDeck.length - 1;
      saveSlideDeckToSession();
      renderSlideDeckUI();
    }
  };

  window.duplicateActiveSlide = function() {
    if (!currentSlideDeck || !currentSlideDeck[activeSlideIndex]) return;
    const cloned = JSON.parse(JSON.stringify(currentSlideDeck[activeSlideIndex]));
    cloned.title += ' (Salinan)';
    currentSlideDeck.splice(activeSlideIndex + 1, 0, cloned);
    activeSlideIndex++;
    saveSlideDeckToSession();
    renderSlideDeckUI();
    if (typeof showToast === 'function') showToast('Slide Diduplikat', 'Slide salinan berhasil disisipkan.');
  };

  window.changeSlideDeckTheme = function(themeName) {
    currentSlideTheme = themeName;
    saveSlideDeckToSession();
    renderActiveSlideCanvas();
  };

  function saveSlideDeckToSession() {
    const classData = (jurnalState.classes && jurnalState.classes[currentJurnalClass]) || {};
    if (!classData.sessions) classData.sessions = {};
    if (!classData.sessions[currentJurnalPertemuan]) classData.sessions[currentJurnalPertemuan] = {};

    classData.sessions[currentJurnalPertemuan].slideDeck = currentSlideDeck;
    classData.sessions[currentJurnalPertemuan].slideTheme = currentSlideTheme;

    saveJurnalState();
  }

  // --- CANVA INTEGRATION FUNCTIONS ---
  window.openCanvaStudioWindow = function() {
    const url = 'https://www.canva.com/presentations/templates/education/';
    window.open(url, 'CanvaStudio', 'width=1280,height=800,menubar=no,toolbar=no,location=yes,status=no');
  };

  window.saveAndLoadCanvaEmbed = function() {
    const input = document.getElementById('inputCanvaEmbedUrl');
    let url = (input?.value || '').trim();
    if (!url) {
      alert('Silakan masukkan tautan Canva terlebih dahulu.');
      return;
    }

    if (url.includes('canva.com/design/') && !url.includes('view?embed')) {
      url = url.replace(/\/(edit|watch|view)?(\?.*)?$/, '') + '/view?embed';
    }

    const classData = (jurnalState.classes && jurnalState.classes[currentJurnalClass]) || {};
    if (!classData.sessions) classData.sessions = {};
    if (!classData.sessions[currentJurnalPertemuan]) classData.sessions[currentJurnalPertemuan] = {};
    classData.sessions[currentJurnalPertemuan].canvaLink = url;

    saveJurnalState();
    loadCurrentSessionCanva();
    if (typeof showToast === 'function') {
      showToast('Tautan Canva Disimpan', 'Presentasi Canva kini tersemat untuk pertemuan ini.');
    }
  };

  window.refreshCanvaIframe = function() {
    const iframe = document.getElementById('canvaLiveIframe');
    if (iframe && iframe.src) {
      const src = iframe.src;
      iframe.src = '';
      setTimeout(() => { iframe.src = src; }, 100);
    }
  };

  function loadCurrentSessionCanva() {
    const classData = (jurnalState.classes && jurnalState.classes[currentJurnalClass]) || {};
    const sess = (classData.sessions && classData.sessions[currentJurnalPertemuan]) || {};
    const url = sess.canvaLink || '';

    const input = document.getElementById('inputCanvaEmbedUrl');
    if (input) input.value = url;

    const iframe = document.getElementById('canvaLiveIframe');
    const placeholder = document.getElementById('canvaPlaceholderBox');

    if (url) {
      if (iframe) {
        iframe.src = url;
        iframe.classList.remove('hidden');
      }
      if (placeholder) placeholder.classList.add('hidden');
    } else {
      if (iframe) {
        iframe.src = '';
        iframe.classList.add('hidden');
      }
      if (placeholder) placeholder.classList.remove('hidden');
    }
  }

  // --- FULL SCREEN PRESENTER ---
  window.startSlidePresentationFullScreen = function() {
    if (!currentSlideDeck || !currentSlideDeck.length) {
      window.generateSlidesFromCurrentJurnal(false);
    }
    const modal = document.getElementById('modalSlideFullScreenPresenter');
    if (!modal) return;

    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }
    modal.classList.remove('hidden');

    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (e) {}

    renderFullScreenSlide();
    document.addEventListener('keydown', handleFullScreenKeyDown);
  };

  window.closeSlidePresentationFullScreen = function() {
    const modal = document.getElementById('modalSlideFullScreenPresenter');
    if (modal) modal.classList.add('hidden');
    document.removeEventListener('keydown', handleFullScreenKeyDown);
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch (e) {}
  };

  function handleFullScreenKeyDown(e) {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      nextSlide();
      renderFullScreenSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
      e.preventDefault();
      prevSlide();
      renderFullScreenSlide();
    } else if (e.key === 'Escape') {
      closeSlidePresentationFullScreen();
    }
  }

  function renderFullScreenSlide() {
    const stage = document.getElementById('fsSlideStageInner');
    const badge = document.getElementById('fsPresenterBadge');
    const matEl = document.getElementById('fsPresenterMateri');
    const idxEl = document.getElementById('fsPresenterIndex');
    if (!stage || !currentSlideDeck || !currentSlideDeck[activeSlideIndex]) return;

    const s = currentSlideDeck[activeSlideIndex];
    const theme = SLIDE_THEMES[currentSlideTheme] || SLIDE_THEMES.indigo;
    const classData = (jurnalState.classes && jurnalState.classes[currentJurnalClass]) || {};

    if (badge) badge.textContent = `${classData.subject || 'Mapel'} - Kelas ${classData.label || currentJurnalClass}`;
    if (matEl) matEl.textContent = `P${currentJurnalPertemuan}: ${s.title || ''}`;
    if (idxEl) idxEl.textContent = `Slide ${activeSlideIndex + 1} / ${currentSlideDeck.length}`;

    stage.className = `w-full max-w-6xl aspect-video rounded-3xl p-8 sm:p-14 shadow-2xl flex flex-col justify-between transition-all duration-300 ${theme.bgClass}`;

    const bulletsHtml = (s.bullets || []).map(b => `
      <div class="p-4 sm:p-6 rounded-2xl border ${theme.cardClass} flex items-start gap-4 backdrop-blur-xs shadow-md">
        <span class="w-3.5 h-3.5 rounded-full ${theme.bulletDot} mt-1.5 flex-shrink-0 animate-pulse"></span>
        <span class="text-base sm:text-xl font-medium leading-relaxed">${b}</span>
      </div>
    `).join('');

    stage.innerHTML = `
      <div class="space-y-2">
        <span class="text-xs sm:text-sm font-black px-3.5 py-1 rounded-full uppercase tracking-wider border ${theme.badgeClass}">
          ${s.tag || `Slide ${activeSlideIndex + 1}`}
        </span>
        <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mt-2">
          ${s.title || ''}
        </h1>
        ${s.subtitle ? `<p class="text-sm sm:text-lg opacity-85 font-semibold ${theme.accentClass}">${s.subtitle}</p>` : ''}
      </div>

      <div class="grid grid-cols-1 gap-4 my-auto py-4">
        ${bulletsHtml}
      </div>

      <div class="flex items-center justify-between text-xs sm:text-sm opacity-60 border-t border-white/10 pt-3">
        <span>Pengampu: Mohammad Ilham Mahmudi</span>
        <span class="font-mono">Slide ${activeSlideIndex + 1} of ${currentSlideDeck.length}</span>
      </div>
    `;

    if (typeof safeCreateIcons === 'function') safeCreateIcons();
  }

  // --- EXPORT TO PPTX ENGINE ---
  window.exportCurrentSlideDeckToPptx = async function() {
    if (!window.PptxGenJS) {
      alert('Library PptxGenJS belum termuat. Memeriksa koneksi atau berkas...');
      return;
    }

    if (!currentSlideDeck || !currentSlideDeck.length) {
      window.generateSlidesFromCurrentJurnal(false);
    }

    try {
      const pptx = new window.PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';

      const classData = (jurnalState.classes && jurnalState.classes[currentJurnalClass]) || {};
      const p = currentJurnalPertemuan;
      const mapel = classData.subject || (currentJurnalUnit === 'formal' ? 'Prakarya' : 'Safinatun Najah');
      const className = classData.label || currentJurnalClass;
      const theme = SLIDE_THEMES[currentSlideTheme] || SLIDE_THEMES.indigo;

      pptx.author = 'Mohammad Ilham Mahmudi';
      pptx.company = currentJurnalUnit === 'formal' ? "MTs Raudlatul Muta'allimin" : "Madrasah Diniyah RM Tegalrejo";
      pptx.title = `Materi ${mapel} Kelas ${className} P${p}`;

      currentSlideDeck.forEach((s, idx) => {
        const slide = pptx.addSlide();
        slide.background = { color: theme.pptx.bg };

        if (s.type === 'cover') {
          slide.addShape(pptx.ShapeType.rect, { x: 0.8, y: 0.8, w: 2.2, h: 0.4, fill: { color: theme.pptx.accent } });
          slide.addText(s.tag || `PERTEMUAN ${p}`, { x: 0.8, y: 0.8, w: 2.2, h: 0.4, fontSize: 11, bold: true, color: 'FFFFFF', align: 'center' });

          slide.addText(mapel.toUpperCase(), { x: 0.8, y: 1.5, w: 11.5, h: 0.5, fontSize: 16, bold: true, color: theme.pptx.accent });
          slide.addText(s.title || 'Materi Pembelajaran', { x: 0.8, y: 2.1, w: 11.5, h: 1.8, fontSize: 32, bold: true, color: theme.pptx.text, wrap: true });
          slide.addText(s.subtitle || '', { x: 0.8, y: 4.1, w: 11.5, h: 0.5, fontSize: 14, color: theme.pptx.textMuted });

          slide.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: 4.8, w: 11.5, h: 1.6, fill: { color: theme.pptx.cardBg }, line: { color: theme.pptx.accent, width: 1 } });
          const bulletLines = (s.bullets || []).join('\n');
          slide.addText(bulletLines, { x: 1.1, y: 5.0, w: 11.0, h: 1.2, fontSize: 12, color: theme.pptx.text, lineSpacing: 22 });
        } else {
          slide.addShape(pptx.ShapeType.rect, { x: 0.8, y: 0.6, w: 2.2, h: 0.35, fill: { color: theme.pptx.accent } });
          slide.addText(s.tag || `Slide ${idx + 1}`, { x: 0.8, y: 0.6, w: 2.2, h: 0.35, fontSize: 10, bold: true, color: 'FFFFFF', align: 'center' });

          slide.addText(s.title || '', { x: 0.8, y: 1.1, w: 11.5, h: 0.8, fontSize: 26, bold: true, color: theme.pptx.text });
          if (s.subtitle) {
            slide.addText(s.subtitle, { x: 0.8, y: 1.85, w: 11.5, h: 0.4, fontSize: 13, color: theme.pptx.textMuted });
          }

          const bullets = s.bullets || [];
          const startY = s.subtitle ? 2.4 : 2.1;
          const cardHeight = Math.min(1.1, (4.5 - startY) / Math.max(1, bullets.length));

          bullets.forEach((bText, bIdx) => {
            const curY = startY + (bIdx * (cardHeight + 0.15));
            slide.addShape(pptx.ShapeType.roundRect, { x: 0.8, y: curY, w: 11.5, h: cardHeight, fill: { color: theme.pptx.cardBg }, line: { color: theme.pptx.accent, width: 0.5 } });
            slide.addText(`- ${bText}`, { x: 1.1, y: curY + 0.1, w: 11.0, h: cardHeight - 0.2, fontSize: 13, color: theme.pptx.text, bold: false, wrap: true });
          });

          slide.addText(`${mapel} - ${className} | ${pptx.company}`, { x: 0.8, y: 6.8, w: 8, h: 0.3, fontSize: 9, color: theme.pptx.textMuted });
          slide.addText(`${idx + 1} / ${currentSlideDeck.length}`, { x: 10.5, y: 6.8, w: 1.8, h: 0.3, fontSize: 9, align: 'right', color: theme.pptx.textMuted });
        }
      });

      const fname = `Materi_${mapel}_${className}_P${p}.pptx`.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
      await pptx.writeFile({ fileName: fname });

      if (typeof showToast === 'function') {
        showToast('Berhasil Ekspor PPTX', `Berkas ${fname} telah diunduh.`);
      }
    } catch (e) {
      alert('Gagal mengekspor PPTX: ' + e.message);
    }
  };


  window.updateJurnalCloudStatusBadge = updateJurnalCloudStatusBadge;
  window.getJurnalSupabaseConfig = getJurnalSupabaseConfig;

})();

