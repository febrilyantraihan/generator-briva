# ATURAN ISOLASI KETAT PROYEK (STRICT PROJECT ISOLATION RULES)

## 1. Lingkup & Batasan Workspace (Workspace Scope)
- Proyek ini adalah **Generator Briva / Partner Fatih** yang berlokasi secara eksklusif di `d:\Aplikasi\Generator Briva\`.
- Proyek ini **100% TERISOLASI SECARA TOTAL** dari proyek lain (seperti `website pesantren`, sistem profil web, atau direktori lainnya).

## 2. Batasan Eksekusi & Modifikasi (Strict Boundaries)
- Asisten AI **HANYA DIPERBOLEHKAN** membaca, mencari, membuat, atau memodifikasi file yang berada di dalam folder `d:\Aplikasi\Generator Briva\`.
- **DILARANG KERAS** menyentuh, mengedit, menghapus, atau membaca file di luar direktori `d:\Aplikasi\Generator Briva\`.
- Perintah shell / terminal **HANYA BOLEH** dijalankan di dalam direktori kerja `d:\Aplikasi\Generator Briva`.

## 3. Penanganan Dokumen Terbuka (Open Documents / Tabs Handling)
- Meskipun pengguna membuka tab/file dari proyek lain di editor (misalnya file dari `d:\Aplikasi\website pesantren\admin.html` atau CSS-nya), **AI WAJIB MENGABAIKANNYA**.
- AI **TIDAK BOLEH** menerapkan perubahan, referensi kode, atau saran fitur ke file proyek lain tersebut.
- Semua aksi dan respon hanya boleh ditujukan untuk file proyek Generator Briva (`index.html`, folder `tabs/`, `JavaScript.html`, `Stylesheet.html`, `Code.gs`, `manifest.json`, dll.).

## 4. Larangan Pencemaran Kode (Zero Cross-Contamination)
- Dilarang mencampurkan logika, styling, dependensi, atau arsitektur dari proyek lain ke dalam proyek Generator Briva, dan sebaliknya.
- Generator Briva beroperasi secara mandiri sebagai Web App / PWA / Google Apps Script Partner Fatih.

---

# STANDAR EMAS & PATOKAN SISTEM (GOLDEN MASTER STANDARDS)

## 1. Patokan Arsitektur & Sinkronisasi Modular
- **Sumber Inti (Single Source of Truth)**:
  - HTML Tab: Berada di folder `tabs/` (`Tab01_Konverter.html` s.d. `Tab10_HumasSosmed.html`).
  - Template & Chassis: Berada di `template_core.html`.
  - Logika JS Terpisah: Berada di folder `js/` (`tab_*.js`, `data_master.js`, `utils.js`).
  - CSS Mandiri: `css/main.css` dan `Stylesheet.html`.
- **Protokol Build Mandatori**:
  - Setiap perubahan pada file modular WAJIB langsung disinkronkan melalui `build_bundle.ps1`.
  - `index.html` dan `js/app.bundle.js` adalah bundle siap rilis.

## 2. Standar Responsivitas & Tampilan Navigasi
- **Navigasi Desktop ($\ge 1024\text{px}$)**:
  - Menggunakan Top Navigation Pills & Left Sidebar Icon Rail secara eksklusif.
  - `#mobileBottomNav` WAJIB disembunyikan total (`display: none !important;`) pada `@media (min-width: 1024px)` untuk mencegah navigasi ganda/tiga dan artefak titik indikator mengambang.
- **Navigasi Mobile ($< 1024\text{px}$)**:
  - Menggunakan Curved Scoop Magic Bottom Nav dengan indikator titik aktif terkalibrasi presisi.
- **Toolbar & Action Buttons**:
  - Tombol aksi di dalam container header flex WAJIB menggunakan class `w-full sm:w-auto` agar tersusun horizontal rapi di desktop dan grid 2×2 di mobile tanpa menumpuk vertikal.

## 3. Standar Integritas Data & Kebijakan Cache (Cache Safety Policy)
- **Versi Cache Master Data**: Menggunakan key `humas_programs_master_v3` dan `tahfidz_master_students_v1`.
- **Proteksi Fallback Otomatis**:
  - Jika cache kosong atau data di bawah 200 item, sistem secara otomatis me-*load* 252 Master Data Agenda Resmi YTPAI 2026-2027 (`YTPAI_ANNUAL_PROGRAMS`) dan 31 Santri Tahfidz Tasmi' (`TAHFIDZ_DEFAULT_STUDENTS`).
  - Mencegah terjadinya anomali data kosong (0 event) pada saat hard refresh.

## 4. Standar Ekspor Gambar HD & Desain Matrix Resmi
- **Engine Canvas Matrix 4-Box**:
  - Menggunakan format matrix resmi: Header Biru Tua Resmi, Kotak Syahriyah Bulanan (Kiri Atas), Awal Tahun (Kanan Atas), Akhir Tahun (Kiri Bawah), Seragam Lengkap (Kanan Bawah), serta Footer Administrasi & Stempel Resmi.
  - Resolusi minimum $1200\text{px} \times 900\text{px}$ (HD JPEG kualitas 0.95) agar mudah dibaca orang tua saat dibagikan via WhatsApp.

## 5. Patokan Validasi & Zero SyntaxError Guarantee
- Snapshot benchmark tersimpan di `backup_monolith/index_golden_master.html` dan `backup_monolith/app.bundle.golden.js`.
- Setiap kompilasi harus lulus uji keseimbangan struktur HTML (0 error) dan eksekusi JavaScript tanpa *uncaught token/syntax errors*.
