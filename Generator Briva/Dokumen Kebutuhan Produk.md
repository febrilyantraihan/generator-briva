# **Product Requirements Document (PRD)**

## **Proyek: DriveData \- Database Tagihan & Konverter Excel Premium**

| Informasi Dokumen | Detail |
| :---- | :---- |
| **Nama Produk** | DriveData (Sistem Kasir & Tagihan Mandiri) |
| **Versi Dokumen** | 1.0.0 |
| **Status** | Production / Active |
| **Basis Institusi** | YTPAI Raudlatul Muta'allimin Lamongan |
| **Target Platform** | Web App (Responsive Desktop & Tablet, Standalone HTML5) |
| **Tanggal Terbit** | September 2026 |

## **1\. Latar Belakang & Pernyataan Masalah (*Problem Statement*)**

### **1.1 Latar Belakang**

Bagian tata usaha dan kasir keuangan madrasah/pondok pesantren sering menghadapi tantangan administratif saat memproses data tagihan siswa dalam jumlah besar dari Microsoft Excel atau spreadsheet institusi.

### **1.2 Masalah Utama yang Dihadapi**

1. **Kerusakan Format di Microsoft Excel:**  
   * Komputer dengan pengaturan regional bahasa Inggris (English US) membaca titik (.) sebagai desimal. Akibatnya, nominal seperti Rp759.000 atau 1.000 sering kali berubah menjadi angka 1 atau kehilangan angka nol di belakang koma saat disalin (di-*paste*).  
2. **Kompleksitas Variasi Biaya:**  
   * Struktur biaya institusi memiliki banyak variabel: jenjang kelas (Kelas 7–9 MTs dan Kelas 10–12 MA), status santri (*Mukim Vip PI*, *Mukim Reguler PA/PI*, *Non-Mukim Mbajak*), jenis tagihan (Bulanan, Awal Tahun, Akhir Tahun), hingga paket seragam sekolah dan pondok.  
   * Pengecekan manual menggunakan tabel fisik/kertas memakan waktu lama dan rentan terhadap kesalahan manusia (*human error*).  
3. **Inkonsistensi Penulisan Kolom Status:**  
   * Data status siswa dari spreadsheet sering ditulis secara bervariasi (misal: VIP, Reguler Pa, Non Mukim PI) sehingga menyulitkan proses pencocokan dengan tarif tagihan.

## **2\. Visi & Tujuan Produk (*Product Vision & Goals*)**

### **2.1 Visi Produk**

Menjadi sistem kasir dan konverter data keuangan instan berbasis browser yang ringkas, tanpa memerlukan instalasi server rumit, mampu memetakan biaya lembaga secara akurat, serta ramah terhadap integrasi Microsoft Excel.

### **2.2 Sasaran (*Objectives*)**

* Mempercepat proses konversi status siswa menjadi nominal tagihan massal dari hitungan jam menjadi hitungan detik.  
* Mengeliminasi 100% insiden hilangnya angka nol (0) dan titik/koma desimal saat data dipindahkan ke Excel.  
* Menyediakan katalog database resmi terpusat yang mudah diaudit oleh tim keuangan.

## **3\. Profil Pengguna (*Target Personas*)**

### **Persona: Petugas Keuangan / Bendahara Madrasah & Pondok**

* **Tanggung Jawab:** Menyusun lembar tagihan siswa, mengecek mutasi pembayaran syahriyah bulanan, serta membuat rekapitulasi data keuangan di Excel.  
* **Karakteristik Perangkat:** Menggunakan PC/Laptop kantor dengan sistem operasi Windows dan Microsoft Excel, sering kali membuka spreadsheet ribuan baris.  
* **Kebutuhan Kunci:** Fitur salin (*copy-paste*) yang andal, pemroses massal (*batch processing*), dan antarmuka yang bersih serta intuitif.

## **4\. Alur Kerja Pengguna (*User Journey*)**

\[Mulai\]  
   │  
   ├─► Skenario A: Konversi Massal Kolom Excel (Paling Sering Digunakan)  
   │     1\. Buka Menu "Konverter Massal Excel".  
   │     2\. Tentukan Kelas Global (misal: Kelas 10\) & Jenis Tagihan (misal: Bulanan).  
   │     3\. Salin kolom status dari Excel, lalu tempel pada kotak input.  
   │     4\. Sistem otomatis mencocokkan status dan mengeluarkan nominal koma (330,000).  
   │     5\. Klik "Salin Aman Excel" atau "Salin Hasil Kolom" \-\> Tempel kembali ke Excel.  
   │  
   ├─► Skenario B: Panggilan Data Tagihan Perorangan  
   │     1\. Buka Menu "Panggil Data Tagihan".  
   │     2\. Masukkan nama, kelas, status tinggal, dan jenis kelamin.  
   │     3\. Tentukan opsi opsional (Seragam Sekolah & Seragam Pondok).  
   │     4\. Salin angka nominal tunggal instan atau cetak seluruh rincian kwitansi.  
   │  
   └─► Skenario C: Audit & Pembersihan Manual  
         1\. Cek tabel tarif pada menu "Katalog Database Biaya".  
         2\. Gunakan "Pembersih Angka Manual" untuk menghapus teks "Rp" dan menghitung total SUM.

## **5\. Spesifikasi Fungsional Produk**

### **5.1 Modul 1: Konverter Massal Excel (*Bulk Converter Engine*)**

* **Parameter Global:**  
  * Pilihan Jenjang Kelas: Kelas 7, 8, 9 (SLTP/MTs) dan Kelas 10, 11, 12 (SLTA/MA).  
  * Pilihan Jenis Tagihan: Bulanan (Per Bulan), Bulanan (1 Tahun Penuh), Awal Tahun, Akhir Tahun, Seragam Sekolah, Seragam Pondok.  
  * Pilihan Mode Parser:  
    * *Mode Sederhana:* Hanya menempelkan daftar status siswa (contoh: Mukim Reguler PI).  
    * *Mode Multi-Kolom:* Memproses teks hasil pemisahan tabulasi/spasi ganda (Kelas \+ Status \+ Jenis).  
* **Logika Pemrosesan (Parser):**  
  * Mampu mengenali alias kata kunci tanpa sensitivitas huruf besar/kecil (*case-insensitive*).  
  * Menangani variasi gender: PA/Putra vs PI/Putri.  
* **Pilihan Format Output:**  
  * *Excel Aman ('1,000):* Menyisipkan tanda petik satu (') di depan angka berkoma untuk mengunci teks desimal di Excel.  
  * *Pemisah Koma (1,000):* Standarisasi format ribuan internasional tanpa tanda petik.  
  * *Pemisah Titik (1.000):* Format ribuan standar regional Indonesia.  
  * *Angka Polos (1000):* Nilai murni (*raw integer*) untuk perhitungan rumus matematis/SUM.  
* **Tabel Pratinjau (*Live Mapping Table*):**  
  * Menampilkan nomor baris, hasil kriteria terdeteksi, kategori tagihan, dan nominal terhitung secara real-time.

### **5.2 Modul 2: Panggil Data Tagihan Siswa (*Individual Receipt Generator*)**

* **Input Form:**  
  * Input teks Nama Lengkap Siswa.  
  * Dropdown Kelas (7 s.d. 12).  
  * Dropdown Status Tinggal (VIP, Reguler, Mbajak).  
  * Radio Button Jenis Kelamin (Putra PA / Putri PI).  
  * Checkbox Opsional: Seragam Sekolah Baru & Seragam Khusus Pondok.  
* **Widget Nominal Tunggal (*Single Value Caller*):**  
  * Kotak metrik berukuran besar yang menampilkan angka nominal tunggal instan.  
  * Tombol pengalih kategori cepat: Per Bulan, Awal Tahun, Akhir Tahun, dan Bulanan 1 Tahun.  
  * Sakelar format pemisah: Titik (.) vs Koma (,).  
* **Lembar Kwitansi Lengkap:**  
  * Area pratinjau teks bergaya terminal yang merinci subtotal komponen biaya per kategori.  
  * Badge Akumulasi Total Biaya Keseluruhan.

### **5.3 Modul 3: Katalog Database Biaya (*Dynamic Pricing Catalog*)**

* Tabel visual interaktif yang menampilkan daftar lengkap tarif resmi.  
* Filter dropdown berdasarkan kelas dan jenis seragam.  
* Fitur pencarian instan (*live search bar*) pada header dashboard untuk mencari item biaya tertentu.

### **5.4 Modul 4: Pembersih Angka & Konverter Teks Manual**

* **Pembersih Rupiah:** Menghilangkan kata Rp, spasi, titik ribuan, dan desimal ,00, serta menyediakan metrik **Total SUM** otomatis.  
* **Konverter Teks (A ke B):** Pemetaan otomatis teks pendek menjadi teks baku institusi:  
  * VIP ➔ Mukim Vip PI  
  * Non Mukim Pi ➔ Non Mukim PI  
  * Reguler Pa ➔ Mukim Reguler PA  
  * Non Mukim Pa ➔ Non Mukim Pa  
  * Reguler Pi ➔ Mukim Reguler PI

### **5.5 Modul 5: Panduan Sinkronisasi Excel**

* Dokumentasi bantuan interaktif di dalam aplikasi mengenai pengaturan regional komputer, penggunaan tanda petik tunggal ('), dan tips rumus \=SUM().

## **6\. Aturan Logika Bisnis (*Business Rules & Database Mapping*)**

### **6.1 Matriks Biaya Bulanan (Pembulatan Resmi Per Bulan)**

| Jenjang | Kelas | VIP (Putri) | Reguler (PA/PI) | Non-Mukim (Mbajak) |
| :---- | :---- | :---- | :---- | :---- |
| **MTs / SMP** | 7 & 8 | Rp 301,000 | Rp 281,000 | Rp 73,000 |
| **MTs / SMP** | 9 | Rp 297,000 | Rp 277,000 | Rp 69,000 |
| **MA / SMA** | 10 & 11 | Rp 350,000 | Rp 330,000 | Rp 122,000 |
| **MA / SMA** | 12 | Rp 345,000 | Rp 325,000 | Rp 117,000 |

### **6.2 Matriks Biaya Awal Tahun**

* **Kelas 7:** VIP: Rp 560,000 | Reguler: Rp 410,000 | Mbajak: Rp 270,000  
* **Kelas 8:** VIP: Rp 250,000 | Reguler: Rp 100,000 | Mbajak: Rp 100,000  
* **Kelas 9:** VIP: Rp 360,000 | Reguler: Rp 210,000 | Mbajak: Rp 210,000  
* **Kelas 10:** VIP: Rp 570,000 | Reguler: Rp 420,000 | Mbajak: Rp 280,000  
* **Kelas 11:** VIP: Rp 250,000 | Reguler: Rp 100,000 | Mbajak: Rp 100,000  
* **Kelas 12:** VIP: Rp 460,000 | Reguler: Rp 310,000 | Mbajak: Rp 310,000

### **6.3 Matriks Biaya Akhir Tahun**

* **Kelas 7 & 8:** Rp 325,000 (Semua Status)  
* **Kelas 9:** Rp 475,000 (Semua Status)  
* **Kelas 10 & 11:** Rp 335,000 (Semua Status)  
* **Kelas 12:** Rp 560,000 (Semua Status)

### **6.4 Matriks Biaya Seragam**

* **Seragam SLTP (MTs/SMP):** Putra: Rp 736,000 | Putri: Rp 897,000  
* **Seragam SLTA (MA/SMA):** Putra: Rp 759,000 | Putri: Rp 938,000  
* **Seragam Khusus Pondok (Santri):** Putra (Baju Taqwa): Rp 90,000 | Putri (Jubah \+ Kerudung): Rp 160,000

## **7\. Kebutuhan Non-Fungsional & Teknis**

### **7.1 Arsitektur Aplikasi (*Single-File Architecture*)**

* Seluruh aplikasi berjalan pada **satu file tunggal (index.html)** tanpa dependensi backend atau proses instalasi (serverless client-side execution).  
* **CSS Framework:** Tailwind CSS CDN.  
* **Icon Set:** Lucide Icons.  
* **Font:** Inter (Google Fonts).

### **7.2 Mesin Salin (*Ultra-Robust Clipboard Engine*)**

* Menggunakan mekanisme fallback document.execCommand('copy') dengan elemen textarea tersembunyi.  
* **Alasan Teknis:** Memastikan operasi salin tetap berhasil 100% meskipun dijalankan di dalam lingkungan yang membatasi API clipboard modern (seperti iframe peramban, aplikasi web view, atau browser lawas).

### **7.3 Pengalaman Pengguna (*UI/UX Experience*)**

* **Desain Google Drive:** Sidebar melengkung berwarna biru dengan indikator penyimpanan data lokal, dikombinasikan dengan panel kerja berwarna abu-abu terang yang bersih.  
* **Efek Audio Sintetis (Web Audio API):** Memberikan umpan balik suara frekuensi tinggi (D5 / 587.33 Hz) saat salin berhasil, dan frekuensi rendah (F4 / 349.23 Hz) saat terjadi pembatalan/reset.  
* **Toast Notification:** Komponen notifikasi mengambang dengan transisi halus tanpa menggunakan popup pemblokir bawaan seperti alert().

## **8\. Metrik Keberhasilan (*Key Success Metrics*)**

1. **Kecepatan Konversi:** Mampu mengonversi 500 baris status siswa menjadi nominal angka dalam waktu kurang dari 200 ms.  
2. **Tingkat Keakuratan Data:** Nol galat (0% error) pada pencocokan kriteria status dengan nominal database institusi.  
3. **Kompatibilitas Excel:** 100% data yang disalin dengan mode koma atau aman teks tidak mengalami kehilangan digit nol saat ditempel ke lembar kerja Excel.

## **9\. Rencana Pengembangan Lanjutan (*Future Roadmap*)**

* **Fase 2:** Integrasi pembacaan file langsung (.xlsx / .csv) via drag-and-drop menggunakan SheetJS.  
* **Fase 3:** Fitur ekspor langsung dalam bentuk file .xlsx yang sudah terformat rapi.  
* **Fase 4:** Penyimpanan kustomisasi tarif dinamis langsung ke localStorage peramban agar admin dapat memperbarui database biaya secara mandiri tanpa mengubah kode program.