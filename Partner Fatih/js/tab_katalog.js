// ============================================================================
// MODULE: tab_katalog.js
// Tab 5: Katalog Tarif Biaya Pendidikan & Modal 31 Kode Resmi Bank BRI
// ============================================================================

    function setCatalogViewMode(mode) {
      currentCatalogViewMode = mode;
      const btnClass = document.getElementById('catModeBtn-class');
      const btnCategory = document.getElementById('catModeBtn-category');
      const viewClass = document.getElementById('catalogViewByClass');
      const viewCategory = document.getElementById('catalogViewByCategory');

      const activeBtnClass = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm transition-all cursor-pointer flex items-center gap-1.5';
      const inactiveBtnClass = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer flex items-center gap-1.5';

      if (mode === 'class') {
        if (btnClass) btnClass.className = activeBtnClass;
        if (btnCategory) btnCategory.className = inactiveBtnClass;
        if (viewClass) viewClass.classList.remove('hidden');
        if (viewCategory) viewCategory.classList.add('hidden');
      } else {
        if (btnClass) btnClass.className = inactiveBtnClass;
        if (btnCategory) btnCategory.className = activeBtnClass;
        if (viewClass) viewClass.classList.add('hidden');
        if (viewCategory) viewCategory.classList.remove('hidden');
      }

      filterCatalogClass(currentCatalogClassFilter, false);
      searchCatalogTables();
      safeCreateIcons();
      showToast('Tampilan Katalog Diubah', mode === 'class' ? 'Mode: Pengelompokan Per Kelas' : 'Mode: Matriks Kategori Biaya');
    }

    function filterCatalogClass(cls, showNotification = true) {
      currentCatalogClassFilter = cls;
      const pills = ['all', '7mts', '8mts', '9mts', '10ma', '11ma', '12ma', 'seragam'];
      pills.forEach(p => {
        const btn = document.getElementById(p === 'all' ? 'catFilter-all' : 'catClassPill-' + p) || document.getElementById('catClassPill-' + p);
        if (btn) {
          if (p === cls) {
            btn.className = 'px-3 py-1 rounded-full text-[11px] font-bold bg-orange-500 text-white shadow-xs transition-all cursor-pointer';
          } else {
            btn.className = 'px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border border-slate-200/80 dark:border-slate-700';
          }
        }
      });

      // Filter in Class View
      const classCards = document.querySelectorAll('.catalog-class-card');
      classCards.forEach(card => {
        const cardCls = card.getAttribute('data-class') || '';
        if (cls === 'all' || cardCls.includes(cls)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      // Filter in Category View
      const catCards = ['catalogCard-bulanan', 'catalogCard-awal', 'catalogCard-akhir', 'catalogCard-seragam'];
      if (cls === 'seragam') {
        ['catalogCard-bulanan', 'catalogCard-awal', 'catalogCard-akhir'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.add('hidden');
        });
        const elSeragam = document.getElementById('catalogCard-seragam');
        if (elSeragam) elSeragam.classList.remove('hidden');
      } else {
        catCards.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.remove('hidden');
        });

        // Filter rows in tables
        const allRows = document.querySelectorAll('#catalogViewByCategory [data-class]');
        allRows.forEach(el => {
          const targetCls = el.getAttribute('data-class') || '';
          if (cls === 'all' || targetCls.includes(cls)) {
            el.style.display = '';
          } else {
            el.style.display = 'none';
          }
        });
      }

      if (showNotification) {
        const labelMap = {
          'all': 'Semua Kelas',
          '7mts': 'Kelas 7 MTs',
          '8mts': 'Kelas 8 MTs',
          '9mts': 'Kelas 9 MTs',
          '10ma': 'Kelas 10 MA',
          '11ma': 'Kelas 11 MA',
          '12ma': 'Kelas 12 MA',
          'seragam': 'Paket Seragam & Atribut'
        };
        showToast('Katalog Disaring', `Menampilkan: ${labelMap[cls] || cls.toUpperCase()}`);
      }
    }

    // Kompatibilitas mundur filter lama jika ada pemanggil
    function filterCatalog(category) {
      if (category === 'mts') filterCatalogClass('7mts');
      else if (category === 'ma') filterCatalogClass('10ma');
      else if (category === 'seragam') filterCatalogClass('seragam');
      else filterCatalogClass('all');
    }

    // Salin Rekap Rincian Biaya Format WhatsApp untuk Wali Santri
    function copyClassSummary(clsKey) {
      const b = '\u2022 ';
      const lineBar = '════════════════════════════════';
      const summaries = {
        '7mts': {
          title: 'KELAS 7 MTs (SANTRI BARU)',
          tingkat: 'MTs / SMP (Tingkat 1)',
          syahriyah: [
            b + 'VIP (Putri) : Rp 301.000 / bln',
            b + 'Reguler     : Rp 281.000 / bln',
            b + 'Mbajak      : Rp 73.000 / bln'
          ],
          daftarUlang: [
            b + 'VIP (Putri) : Rp 560.000 (1x di awal)',
            b + 'Reguler     : Rp 410.000 (1x di awal)',
            b + 'Mbajak      : Rp 270.000 (1x di awal)'
          ],
          akhirTahun: b + 'Flat Biaya Akhir Th : Rp 325.000',
          seragam: [
            b + 'Seragam MTs Putra   : Rp 736.000',
            b + 'Seragam MTs Putri   : Rp 897.000',
            b + 'Pondok: Baju Taqwa (Pa) : Rp 90.000',
            b + 'Pondok: Jubah+Kerudung (Pi) : Rp 160.000'
          ]
        },
        '8mts': {
          title: 'KELAS 8 MTs (SANTRI LANJUTAN)',
          tingkat: 'MTs / SMP (Tingkat 2)',
          syahriyah: [
            b + 'VIP (Putri) : Rp 301.000 / bln',
            b + 'Reguler     : Rp 281.000 / bln',
            b + 'Mbajak      : Rp 73.000 / bln'
          ],
          daftarUlang: [
            b + 'VIP (Putri) : Rp 250.000 (1x di awal)',
            b + 'Reguler     : Rp 100.000 (1x di awal)',
            b + 'Mbajak      : Rp 100.000 (1x di awal)'
          ],
          akhirTahun: b + 'Flat Biaya Akhir Th : Rp 325.000',
          seragam: [
            b + 'Bebas seragam baru (melanjutkan seragam kelas 7)',
            b + '_Khusus Murid Pindahan:_ Wajib membeli paket seragam MTs sesuai status (Putra Rp 736.000 / Putri Rp 897.000)'
          ]
        },
        '9mts': {
          title: 'KELAS 9 MTs (TINGKAT AKHIR)',
          tingkat: 'MTs / SMP (Tingkat 3 - Persiapan Kelulusan)',
          syahriyah: [
            b + 'VIP (Putri) : Rp 297.000 / bln',
            b + 'Reguler     : Rp 277.000 / bln',
            b + 'Mbajak      : Rp 69.000 / bln'
          ],
          daftarUlang: [
            b + 'VIP (Putri) : Rp 360.000 (1x di awal)',
            b + 'Reguler     : Rp 210.000 (1x di awal)',
            b + 'Mbajak      : Rp 210.000 (1x di awal)'
          ],
          akhirTahun: b + 'Akhir Th (Ujian & Kelulusan) : Rp 475.000',
          seragam: [
            b + 'Melanjutkan seragam yang ada',
            b + '_Khusus Murid Pindahan:_ Wajib membeli paket seragam MTs sesuai status (Putra Rp 736.000 / Putri Rp 897.000)'
          ]
        },
        '10ma': {
          title: 'KELAS 10 MA (SANTRI BARU)',
          tingkat: 'MA / SMA (Tingkat 1)',
          syahriyah: [
            b + 'VIP (Putri) : Rp 350.000 / bln',
            b + 'Reguler     : Rp 330.000 / bln',
            b + 'Mbajak      : Rp 122.000 / bln'
          ],
          daftarUlang: [
            b + 'VIP (Putri) : Rp 570.000 (1x di awal)',
            b + 'Reguler     : Rp 420.000 (1x di awal)',
            b + 'Mbajak      : Rp 280.000 (1x di awal)'
          ],
          akhirTahun: b + 'Flat Biaya Akhir Th : Rp 335.000',
          seragam: [
            b + 'Seragam MA Putra    : Rp 759.000',
            b + 'Seragam MA Putri    : Rp 938.000',
            b + 'Pondok: Baju Taqwa (Pa) : Rp 90.000',
            b + 'Pondok: Jubah+Kerudung (Pi) : Rp 160.000'
          ]
        },
        '11ma': {
          title: 'KELAS 11 MA (SANTRI LANJUTAN)',
          tingkat: 'MA / SMA (Tingkat 2)',
          syahriyah: [
            b + 'VIP (Putri) : Rp 350.000 / bln',
            b + 'Reguler     : Rp 330.000 / bln',
            b + 'Mbajak      : Rp 122.000 / bln'
          ],
          daftarUlang: [
            b + 'VIP (Putri) : Rp 250.000 (1x di awal)',
            b + 'Reguler     : Rp 100.000 (1x di awal)',
            b + 'Mbajak      : Rp 100.000 (1x di awal)'
          ],
          akhirTahun: b + 'Flat Biaya Akhir Th : Rp 335.000',
          seragam: [
            b + 'Bebas seragam baru (melanjutkan seragam kelas 10)',
            b + '_Khusus Murid Pindahan:_ Wajib membeli paket seragam MA sesuai status (Putra Rp 759.000 / Putri Rp 938.000)'
          ]
        },
        '12ma': {
          title: 'KELAS 12 MA (WISUDA & TINGKAT AKHIR)',
          tingkat: 'MA / SMA (Tingkat 3 - Pelepasan & Wisuda)',
          syahriyah: [
            b + 'VIP (Putri) : Rp 345.000 / bln',
            b + 'Reguler     : Rp 325.000 / bln',
            b + 'Mbajak      : Rp 117.000 / bln'
          ],
          daftarUlang: [
            b + 'VIP (Putri) : Rp 460.000 (1x di awal)',
            b + 'Reguler     : Rp 310.000 (1x di awal)',
            b + 'Mbajak      : Rp 310.000 (1x di awal)'
          ],
          akhirTahun: b + 'Akhir Th (Wisuda & Ijazah)  : Rp 560.000',
          seragam: [
            b + 'Melanjutkan seragam yang ada',
            b + '_Khusus Murid Pindahan:_ Wajib membeli paket seragam MA sesuai status (Putra Rp 759.000 / Putri Rp 938.000)'
          ]
        },
        'seragam': {
          title: 'KATALOG SERAGAM SEKOLAH & ATRIBUT PONDOK',
          tingkat: 'Semua Jenjang (MTs, MA & Pesantren)',
          syahriyah: [],
          daftarUlang: [],
          akhirTahun: '',
          seragam: [
            b + 'Seragam MTs/SMP (Putra) : Rp 736.000',
            b + 'Seragam MTs/SMP (Putri) : Rp 897.000',
            b + 'Seragam MA/SMA (Putra)  : Rp 759.000',
            b + 'Seragam MA/SMA (Putra)  : Rp 938.000',
            b + 'Pondok: Baju Taqwa (Putra) : Rp 90.000',
            b + 'Pondok: Jubah+Kerudung (Pi) : Rp 160.000'
          ]
        }
      };

      const data = summaries[clsKey];
      if (!data) return;

      const lines = [
        `\uD83D\uDCCB *RINCIAN BIAYA RESMI: ${data.title}*`,
        `\uD83C\uDFDB\uFE0F *YTPAI Raudlatul Muta'allimin*`,
        `\uD83D\uDCCC *Jenjang:* ${data.tingkat}`,
        lineBar
      ];

      if (data.syahriyah && data.syahriyah.length > 0) {
        lines.push(`1\uFE0F\u20E3 *Biaya Bulanan (Syahriyah):*`);
        data.syahriyah.forEach(s => lines.push(`   ${s}`));
        lines.push(``);
      }

      if (data.daftarUlang && data.daftarUlang.length > 0) {
        lines.push(`2\uFE0F\u20E3 *Biaya Awal Tahun (Daftar Ulang):*`);
        data.daftarUlang.forEach(d => lines.push(`   ${d}`));
        lines.push(``);
      }

      if (data.akhirTahun) {
        lines.push(`3\uFE0F\u20E3 *Biaya Akhir Tahun:*`);
        lines.push(`   ${data.akhirTahun}`);
        lines.push(``);
      }

      if (data.seragam && data.seragam.length > 0) {
        lines.push(`4\uFE0F\u20E3 *Paket Seragam & Atribut:*`);
        data.seragam.forEach(sg => lines.push(`   ${sg}`));
        lines.push(``);
      }

      lines.push(lineBar);
      lines.push(`_Catatan: Pembayaran dapat disalurkan melalui Virtual Account BRIVA resmi masing-masing santri._`);
      lines.push(`_Bagian Administrasi & Keuangan YTPAI Raudlatul Muta'allimin_`);

      const messageText = lines.join('\n');
      copyToClipboard(messageText, 'Format WA Disalin!', `Rincian ${data.title} berhasil disalin dan siap dikirim.`);
    }

    // =========================================================================
    // HD JPEG IMAGE GENERATOR ENGINE FOR KATALOG BIAYA & TAGIHAN
    // =========================================================================
    let currentKatalogImageData = null;

    const CLASS_CATALOG_CONFIG = {
      '7mts': {
        title: 'KELAS 7 MTs',
        badge: 'SANTRI BARU',
        tingkat: 'Tingkat Pertama MTs / SMP (Tingkat 1)',
        theme: {
          primary: '#059669',
          gradient: ['#064e3b', '#047857', '#0f766e'],
          border: '#10b981',
          accent: '#34d399'
        },
        syahriyah: [
          { label: 'VIP (Putri)', val: 'Rp 301.000', period: '/ bulan', desc: 'Asrama VIP Putri', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 281.000', period: '/ bulan', desc: 'Asrama Reguler Pa/Pi', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 73.000', period: '/ bulan', desc: 'Sekolah (Pulang-Pergi)', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        daftarUlang: [
          { label: 'VIP (Putri)', val: 'Rp 560.000', period: '1x awal thn', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 410.000', period: '1x awal thn', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 270.000', period: '1x awal thn', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        akhirTahun: {
          label: 'Biaya Akhir Tahun (Flat)',
          val: 'Rp 325.000',
          desc: 'Evaluasi & kegiatan akhir tahun'
        },
        seragam: [
          { label: 'Paket Seragam MTs Putra', val: 'Rp 736.000' },
          { label: 'Paket Seragam MTs Putri', val: 'Rp 897.000' },
          { label: 'Baju Taqwa Pondok (Putra)', val: 'Rp 90.000' },
          { label: 'Jubah + Kerudung Pondok (Putri)', val: 'Rp 160.000' }
        ]
      },
      '8mts': {
        title: 'KELAS 8 MTs',
        badge: 'SANTRI LANJUTAN',
        tingkat: 'Tingkat Kedua MTs / SMP (Tingkat 2)',
        theme: {
          primary: '#2563eb',
          gradient: ['#1e3a8a', '#1d4ed8', '#2563eb'],
          border: '#3b82f6',
          accent: '#60a5fa'
        },
        syahriyah: [
          { label: 'VIP (Putri)', val: 'Rp 301.000', period: '/ bulan', desc: 'Asrama VIP Putri', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 281.000', period: '/ bulan', desc: 'Asrama Reguler Pa/Pi', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 73.000', period: '/ bulan', desc: 'Sekolah (Pulang-Pergi)', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        daftarUlang: [
          { label: 'VIP (Putri)', val: 'Rp 250.000', period: '1x awal thn', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 100.000', period: '1x awal thn', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 100.000', period: '1x awal thn', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        akhirTahun: {
          label: 'Biaya Akhir Tahun (Flat)',
          val: 'Rp 325.000',
          desc: 'Evaluasi & kegiatan akhir tahun'
        },
        seragamNote: 'Melanjutkan seragam kelas 7. Khusus murid pindahan wajib membeli paket seragam MTs (Putra Rp 736k / Putri Rp 897k).'
      },
      '9mts': {
        title: 'KELAS 9 MTs',
        badge: 'TINGKAT AKHIR & KELULUSAN',
        tingkat: 'Tingkat Akhir MTs / SMP (Ujian & Kelulusan)',
        theme: {
          primary: '#4f46e5',
          gradient: ['#312e81', '#4338ca', '#4f46e5'],
          border: '#6366f1',
          accent: '#818cf8'
        },
        syahriyah: [
          { label: 'VIP (Putri)', val: 'Rp 297.000', period: '/ bulan', desc: 'Asrama VIP Putri', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 277.000', period: '/ bulan', desc: 'Asrama Reguler Pa/Pi', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 69.000', period: '/ bulan', desc: 'Sekolah (Pulang-Pergi)', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        daftarUlang: [
          { label: 'VIP (Putri)', val: 'Rp 360.000', period: '1x awal thn', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 210.000', period: '1x awal thn', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 210.000', period: '1x awal thn', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        akhirTahun: {
          label: 'Akhir Tahun (Ujian & Kelulusan MTs)',
          val: 'Rp 475.000',
          desc: 'Termasuk Ujian Madrasah & Ijazah'
        },
        seragamNote: 'Melanjutkan seragam yang ada. Khusus murid pindahan wajib membeli paket seragam MTs.'
      },
      '10ma': {
        title: 'KELAS 10 MA',
        badge: 'SANTRI BARU',
        tingkat: 'Tingkat Pertama MA / SMA (Tingkat 1)',
        theme: {
          primary: '#ea580c',
          gradient: ['#7c2d12', '#c2410c', '#ea580c'],
          border: '#f97316',
          accent: '#fb923c'
        },
        syahriyah: [
          { label: 'VIP (Putri)', val: 'Rp 350.000', period: '/ bulan', desc: 'Asrama VIP Putri', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 330.000', period: '/ bulan', desc: 'Asrama Reguler Pa/Pi', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 122.000', period: '/ bulan', desc: 'Sekolah (Pulang-Pergi)', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        daftarUlang: [
          { label: 'VIP (Putri)', val: 'Rp 570.000', period: '1x awal thn', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 420.000', period: '1x awal thn', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 280.000', period: '1x awal thn', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        akhirTahun: {
          label: 'Biaya Akhir Tahun (Flat)',
          val: 'Rp 335.000',
          desc: 'Evaluasi & kegiatan akhir tahun'
        },
        seragam: [
          { label: 'Paket Seragam MA Putra', val: 'Rp 759.000' },
          { label: 'Paket Seragam MA Putri', val: 'Rp 938.000' },
          { label: 'Baju Taqwa Pondok (Putra)', val: 'Rp 90.000' },
          { label: 'Jubah + Kerudung Pondok (Putri)', val: 'Rp 160.000' }
        ]
      },
      '11ma': {
        title: 'KELAS 11 MA',
        badge: 'SANTRI LANJUTAN',
        tingkat: 'Tingkat Kedua MA / SMA (Tingkat 2)',
        theme: {
          primary: '#e11d48',
          gradient: ['#881337', '#be123c', '#e11d48'],
          border: '#fb7185',
          accent: '#f43f5e'
        },
        syahriyah: [
          { label: 'VIP (Putri)', val: 'Rp 350.000', period: '/ bulan', desc: 'Asrama VIP Putri', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 330.000', period: '/ bulan', desc: 'Asrama Reguler Pa/Pi', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 122.000', period: '/ bulan', desc: 'Sekolah (Pulang-Pergi)', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        daftarUlang: [
          { label: 'VIP (Putri)', val: 'Rp 250.000', period: '1x awal thn', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 100.000', period: '1x awal thn', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 100.000', period: '1x awal thn', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        akhirTahun: {
          label: 'Biaya Akhir Tahun (Flat)',
          val: 'Rp 335.000',
          desc: 'Evaluasi & kegiatan akhir tahun'
        },
        seragamNote: 'Melanjutkan seragam kelas 10. Khusus murid pindahan wajib membeli paket seragam MA (Putra Rp 759k / Putri Rp 938k).'
      },
      '12ma': {
        title: 'KELAS 12 MA',
        badge: 'WISUDA & TINGKAT AKHIR',
        tingkat: 'Tingkat Akhir MA / SMA (Ujian & Wisuda)',
        theme: {
          primary: '#7c3aed',
          gradient: ['#4c1d95', '#6d28d9', '#7c3aed'],
          border: '#a78bfa',
          accent: '#c084fc'
        },
        syahriyah: [
          { label: 'VIP (Putri)', val: 'Rp 345.000', period: '/ bulan', desc: 'Asrama VIP Putri', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 325.000', period: '/ bulan', desc: 'Asrama Reguler Pa/Pi', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 117.000', period: '/ bulan', desc: 'Sekolah (Pulang-Pergi)', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        daftarUlang: [
          { label: 'VIP (Putri)', val: 'Rp 460.000', period: '1x awal thn', color: '#c084fc', bg: 'rgba(168, 85, 247, 0.15)' },
          { label: 'Mukim (Reguler)', val: 'Rp 310.000', period: '1x awal thn', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
          { label: 'Non-Mukim (Mbajak)', val: 'Rp 310.000', period: '1x awal thn', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' }
        ],
        akhirTahun: {
          label: 'Akhir Tahun (Wisuda & Pelepasan Siswa)',
          val: 'Rp 560.000',
          desc: 'Termasuk perlengkapan wisuda, ijazah, album & pelepasan'
        },
        seragamNote: 'Melanjutkan seragam yang ada. Khusus murid pindahan wajib membeli paket seragam MA.'
      },
      'seragam': {
        title: 'KATALOG SERAGAM & ATRIBUT',
        badge: 'SEKOLAH & PONDOK',
        tingkat: 'Semua Jenjang: MTs, MA & Pondok Pesantren',
        theme: {
          primary: '#9333ea',
          gradient: ['#581c87', '#7e22ce', '#9333ea'],
          border: '#c084fc',
          accent: '#d8b4fe'
        },
        seragamList: [
          { name: 'Paket Seragam MTs/SMP Putra', val: 'Rp 736.000', desc: 'Atasan, bawahan, kopyah, kaos OR, atribut lengkap' },
          { name: 'Paket Seragam MTs/SMP Putri', val: 'Rp 897.000', desc: 'Atasan, bawahan/rok, kerudung, kaos OR, atribut' },
          { name: 'Paket Seragam MA/SMA Putra', val: 'Rp 759.000', desc: 'Atasan, bawahan, kopyah, kaos OR, atribut lengkap' },
          { name: 'Paket Seragam MA/SMA Putri', val: 'Rp 938.000', desc: 'Atasan, rok panjang, kerudung, kaos OR, atribut' },
          { name: 'Busana Taqwa Pondok (Putra)', val: 'Rp 90.000', desc: 'Seragam ibadah & kegiatan pesantren santriwan' },
          { name: 'Jubah + Kerudung Pondok (Putri)', val: 'Rp 160.000', desc: 'Seragam muslimah kegiatan pesantren santriwati' }
        ]
      }
    };

    function drawRoundedBox(ctx, x, y, width, height, radius, fillStyle, strokeStyle, lineWidth = 1) {
      ctx.save();
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, width, height, radius);
      } else {
        const r = typeof radius === 'number' ? radius : radius[0] || 10;
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + width - r, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + r);
        ctx.lineTo(x + width, y + height - r);
        ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
        ctx.lineTo(x + r, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
      }
      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
      if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      ctx.restore();
    }

    // =========================================================================
    // OFFICIAL 4-BOX MATRIX DATA & CANVAS GENERATOR (EXACT MATCH TO OFFICIAL DOC)
    // =========================================================================
    const OFFICIAL_CLASS_MATRIX = {
      '7mts': {
        title: 'KELAS 7 MTs',
        classSubtitle: 'RINCIAN PEMBAYARAN KELAS 7 (TUJUH)',
        tingkat: 'MTs / SMP (Tingkat 1 - Santri Baru)',
        awalTahun: {
          vip: [
            { no: 1, jenis: 'PPDB Sekolah', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 2, jenis: 'Rapor Sekolah', nom: '60.000', vol: 1, jml: '60.000' },
            { no: 3, jenis: 'Kesiswaan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 4, jenis: 'MOS', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 5, jenis: 'KTA/Brizzi', nom: '30.000', vol: 1, jml: '30.000' },
            { no: 6, jenis: 'PPDB Pondok & Almari', nom: '110.000', vol: 1, jml: '110.000' },
            { no: 7, jenis: 'Rapor Madin', nom: '30.000', vol: 1, jml: '30.000' },
            { no: 8, jenis: 'Kasur dan Dipan', nom: '150.000', vol: 1, jml: '150.000' }
          ],
          vipTotal: '560.000',
          reguler: [
            { no: 1, jenis: 'PPDB Sekolah', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 2, jenis: 'Rapor Sekolah', nom: '60.000', vol: 1, jml: '60.000' },
            { no: 3, jenis: 'Kesiswaan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 4, jenis: 'MOS', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 5, jenis: 'KTA/Brizzi', nom: '30.000', vol: 1, jml: '30.000' },
            { no: 6, jenis: 'PPDB Pondok & Almari', nom: '110.000', vol: 1, jml: '110.000' },
            { no: 7, jenis: 'Rapor Madin', nom: '30.000', vol: 1, jml: '30.000' }
          ],
          regTotal: '410.000',
          nonMukim: [
            { no: 1, jenis: 'PPDB Sekolah', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 2, jenis: 'Rapor Sekolah', nom: '60.000', vol: 1, jml: '60.000' },
            { no: 3, jenis: 'Kesiswaan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 4, jenis: 'MOS', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 5, jenis: 'KTA/Brizzi', nom: '30.000', vol: 1, jml: '30.000' }
          ],
          nonMukimTotal: '270.000'
        },
        bulanan: {
          vip: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '223.000', vol: 12, jml: '2.676.000', tiapBln: '223.000' },
            { no: 2, rincian: 'INFAQ', nom: '43.000', vol: 12, jml: '516.000', tiapBln: '43.000' },
            { no: 3, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 4, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 5, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 6, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 8, rincian: 'MUHARRAM', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' },
            { no: 9, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 10, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          vipTotal1Th: '3.612.000',
          vipTotalBln: '301.000',
          vipBulat: '301.000',
          reguler: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '203.000', vol: 12, jml: '2.436.000', tiapBln: '203.000' },
            { no: 2, rincian: 'INFAQ', nom: '43.000', vol: 12, jml: '516.000', tiapBln: '43.000' },
            { no: 3, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 4, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 5, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 6, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 8, rincian: 'MUHARRAM', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' },
            { no: 9, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 10, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          regTotal1Th: '3.372.000',
          regTotalBln: '281.000',
          regBulat: '281.000',
          nonMukim: [
            { no: 1, rincian: 'INFAQ Sekolah', nom: '43.000', vol: 12, jml: '516.000', tiapBln: '43.000' },
            { no: 2, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 3, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 4, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 5, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 6, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          nonMukimTotal1Th: '876.000',
          nonMukimTotalBln: '73.000',
          nonMukimBulat: '73.000'
        },
        akhirTahun: {
          items: [
            { no: 1, jenis: 'Kesiswaan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Kalender', nom: '25.000', vol: 1, jml: '25.000' },
            { no: 3, jenis: 'Pondok Romadlon', nom: '25.000', vol: 1, jml: '25.000' },
            { no: 4, jenis: 'Haflah & Haul', nom: '125.000', vol: 1, jml: '125.000' },
            { no: 5, jenis: 'Perpustakaan', nom: '50.000', vol: 1, jml: '50.000' }
          ],
          total: '325.000'
        },
        seragam: {
          putra: [{ no: 1, jenis: 'Baju Taqwa', nom: '90.000', vol: 1, jml: '90.000' }],
          putraTotal: '90.000',
          putri: [
            { no: 1, jenis: 'Jubah', nom: '120.000', vol: 1, jml: '120.000' },
            { no: 2, jenis: 'Kerudung', nom: '40.000', vol: 1, jml: '40.000' }
          ],
          putriTotal: '160.000',
          note: 'NB: Pembayaran Seragam Khusus Pondok dilaksanakan pada bulan Oktober'
        }
      },
      '8mts': {
        title: 'KELAS 8 MTs',
        classSubtitle: 'RINCIAN PEMBAYARAN KELAS 8 (DELAPAN)',
        tingkat: 'MTs / SMP (Tingkat 2 - Santri Lanjutan)',
        awalTahun: {
          vip: [
            { no: 1, jenis: 'PPDB Pondok / Daftar Ulang', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Fasilitas & Asrama Lanjutan', nom: '150.000', vol: 1, jml: '150.000' }
          ],
          vipTotal: '250.000',
          reguler: [
            { no: 1, jenis: 'Daftar Ulang Santri Lanjutan', nom: '100.000', vol: 1, jml: '100.000' }
          ],
          regTotal: '100.000',
          nonMukim: [
            { no: 1, jenis: 'Daftar Ulang Siswa Lanjutan', nom: '100.000', vol: 1, jml: '100.000' }
          ],
          nonMukimTotal: '100.000'
        },
        bulanan: {
          vip: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '223.000', vol: 12, jml: '2.676.000', tiapBln: '223.000' },
            { no: 2, rincian: 'INFAQ', nom: '43.000', vol: 12, jml: '516.000', tiapBln: '43.000' },
            { no: 3, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 4, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 5, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 6, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 8, rincian: 'MUHARRAM', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' },
            { no: 9, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 10, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          vipTotal1Th: '3.612.000',
          vipTotalBln: '301.000',
          vipBulat: '301.000',
          reguler: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '203.000', vol: 12, jml: '2.436.000', tiapBln: '203.000' },
            { no: 2, rincian: 'INFAQ', nom: '43.000', vol: 12, jml: '516.000', tiapBln: '43.000' },
            { no: 3, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 4, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 5, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 6, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 8, rincian: 'MUHARRAM', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' },
            { no: 9, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 10, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          regTotal1Th: '3.372.000',
          regTotalBln: '281.000',
          regBulat: '281.000',
          nonMukim: [
            { no: 1, rincian: 'INFAQ Sekolah', nom: '43.000', vol: 12, jml: '516.000', tiapBln: '43.000' },
            { no: 2, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 3, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 4, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 5, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 6, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          nonMukimTotal1Th: '876.000',
          nonMukimTotalBln: '73.000',
          nonMukimBulat: '73.000'
        },
        akhirTahun: {
          items: [
            { no: 1, jenis: 'Kesiswaan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Kalender', nom: '25.000', vol: 1, jml: '25.000' },
            { no: 3, jenis: 'Pondok Romadlon', nom: '25.000', vol: 1, jml: '25.000' },
            { no: 4, jenis: 'Haflah & Haul', nom: '125.000', vol: 1, jml: '125.000' },
            { no: 5, jenis: 'Perpustakaan', nom: '50.000', vol: 1, jml: '50.000' }
          ],
          total: '325.000'
        },
        seragam: {
          putra: [{ no: 1, jenis: 'Seragam Melanjutkan Kelas 7', nom: '0', vol: 1, jml: '0' }],
          putraTotal: '0',
          putri: [{ no: 1, jenis: 'Seragam Melanjutkan Kelas 7', nom: '0', vol: 1, jml: '0' }],
          putriTotal: '0',
          note: 'NB: Bebas seragam baru (melanjutkan seragam kelas 7). Santri pindahan wajib paket seragam MTs.'
        }
      },
      '9mts': {
        title: 'KELAS 9 MTs',
        classSubtitle: 'RINCIAN PEMBAYARAN KELAS 9 (SEMBILAN)',
        tingkat: 'MTs / SMP (Tingkat Akhir & Kelulusan)',
        awalTahun: {
          vip: [
            { no: 1, jenis: 'Daftar Ulang Pondok Lanjutan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Fasilitas & Kasur Asrama', nom: '150.000', vol: 1, jml: '150.000' },
            { no: 3, jenis: 'Daftar Ulang Ujian Akhir', nom: '110.000', vol: 1, jml: '110.000' }
          ],
          vipTotal: '360.000',
          reguler: [
            { no: 1, jenis: 'Daftar Ulang Lanjutan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Biaya Administrasi Akhir', nom: '110.000', vol: 1, jml: '110.000' }
          ],
          regTotal: '210.000',
          nonMukim: [
            { no: 1, jenis: 'Daftar Ulang Sekolah', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Administrasi Akhir', nom: '110.000', vol: 1, jml: '110.000' }
          ],
          nonMukimTotal: '210.000'
        },
        bulanan: {
          vip: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '223.000', vol: 12, jml: '2.676.000', tiapBln: '223.000' },
            { no: 2, rincian: 'INFAQ', nom: '43.000', vol: 12, jml: '516.000', tiapBln: '43.000' },
            { no: 3, rincian: 'PTS & PAS (Disesuaikan)', nom: '105.000', vol: 2, jml: '210.000', tiapBln: '17.500' },
            { no: 4, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 5, rincian: 'KKM & PERAWATAN', nom: '40.000', vol: 2, jml: '80.000', tiapBln: '6.667' },
            { no: 6, rincian: 'KEGIATAN & SOSIAL', nom: '40.000', vol: 1, jml: '40.000', tiapBln: '2.667' }
          ],
          vipTotal1Th: '3.572.000',
          vipTotalBln: '297.000',
          vipBulat: '297.000',
          reguler: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '203.000', vol: 12, jml: '2.436.000', tiapBln: '203.000' },
            { no: 2, rincian: 'INFAQ', nom: '43.000', vol: 12, jml: '516.000', tiapBln: '43.000' },
            { no: 3, rincian: 'PTS & PAS (Disesuaikan)', nom: '105.000', vol: 2, jml: '210.000', tiapBln: '17.500' },
            { no: 4, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 5, rincian: 'KKM & PERAWATAN', nom: '40.000', vol: 2, jml: '80.000', tiapBln: '6.667' },
            { no: 6, rincian: 'KEGIATAN & SOSIAL', nom: '40.000', vol: 1, jml: '40.000', tiapBln: '2.667' }
          ],
          regTotal1Th: '3.332.000',
          regTotalBln: '277.000',
          regBulat: '277.000',
          nonMukim: [
            { no: 1, rincian: 'INFAQ Sekolah', nom: '43.000', vol: 12, jml: '516.000', tiapBln: '43.000' },
            { no: 2, rincian: 'PTS & PAS Disesuaikan', nom: '105.000', vol: 2, jml: '210.000', tiapBln: '17.500' },
            { no: 3, rincian: 'KKM & PERAWATAN', nom: '40.000', vol: 2, jml: '80.000', tiapBln: '6.667' },
            { no: 4, rincian: 'KEGIATAN & SOSIAL', nom: '40.000', vol: 1, jml: '40.000', tiapBln: '1.833' }
          ],
          nonMukimTotal1Th: '846.000',
          nonMukimTotalBln: '69.000',
          nonMukimBulat: '69.000'
        },
        akhirTahun: {
          items: [
            { no: 1, jenis: 'Ujian Madrasah & Kelulusan', nom: '200.000', vol: 1, jml: '200.000' },
            { no: 2, jenis: 'Ijazah & Dokumen Kelulusan', nom: '75.000', vol: 1, jml: '75.000' },
            { no: 3, jenis: 'Kesiswaan & Haflah Haul', nom: '150.000', vol: 1, jml: '150.000' },
            { no: 4, jenis: 'Kalender & Perpustakaan', nom: '50.000', vol: 1, jml: '50.000' }
          ],
          total: '475.000'
        },
        seragam: {
          putra: [{ no: 1, jenis: 'Melanjutkan Seragam MTs', nom: '0', vol: 1, jml: '0' }],
          putraTotal: '0',
          putri: [{ no: 1, jenis: 'Melanjutkan Seragam MTs', nom: '0', vol: 1, jml: '0' }],
          putriTotal: '0',
          note: 'NB: Bebas seragam baru (melanjutkan seragam kelas sebelumnya).'
        }
      },
      '10ma': {
        title: 'KELAS 10 MA',
        classSubtitle: 'RINCIAN PEMBAYARAN KELAS 10 (SEPULUH)',
        tingkat: 'MA / SMA (Tingkat 1 - Santri Baru)',
        awalTahun: {
          vip: [
            { no: 1, jenis: 'PPDB Sekolah', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 2, jenis: 'Rapor Sekolah', nom: '70.000', vol: 1, jml: '70.000' },
            { no: 3, jenis: 'Kesiswaan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 4, jenis: 'MOS', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 5, jenis: 'KTA/Brizzi', nom: '30.000', vol: 1, jml: '30.000' },
            { no: 6, jenis: 'PPDB Pondok & Almari', nom: '110.000', vol: 1, jml: '110.000' },
            { no: 7, jenis: 'Rapor Madin', nom: '30.000', vol: 1, jml: '30.000' },
            { no: 8, jenis: 'Kasur dan Dipan', nom: '150.000', vol: 1, jml: '150.000' }
          ],
          vipTotal: '570.000',
          reguler: [
            { no: 1, jenis: 'PPDB Sekolah', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 2, jenis: 'Rapor Sekolah', nom: '70.000', vol: 1, jml: '70.000' },
            { no: 3, jenis: 'Kesiswaan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 4, jenis: 'MOS', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 5, jenis: 'KTA/Brizzi', nom: '30.000', vol: 1, jml: '30.000' },
            { no: 6, jenis: 'PPDB Pondok & Almari', nom: '110.000', vol: 1, jml: '110.000' },
            { no: 7, jenis: 'Rapor Madin', nom: '30.000', vol: 1, jml: '30.000' }
          ],
          regTotal: '420.000',
          nonMukim: [
            { no: 1, jenis: 'PPDB Sekolah', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 2, jenis: 'Rapor Sekolah', nom: '70.000', vol: 1, jml: '70.000' },
            { no: 3, jenis: 'Kesiswaan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 4, jenis: 'MOS', nom: '40.000', vol: 1, jml: '40.000' },
            { no: 5, jenis: 'KTA/Brizzi', nom: '30.000', vol: 1, jml: '30.000' }
          ],
          nonMukimTotal: '280.000'
        },
        bulanan: {
          vip: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '223.000', vol: 12, jml: '2.676.000', tiapBln: '223.000' },
            { no: 2, rincian: 'INFAQ', nom: '92.000', vol: 12, jml: '1.104.000', tiapBln: '92.000' },
            { no: 3, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 4, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 5, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 6, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 8, rincian: 'MUHARRAM', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' },
            { no: 9, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 10, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          vipTotal1Th: '4.200.000',
          vipTotalBln: '350.000',
          vipBulat: '350.000',
          reguler: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '203.000', vol: 12, jml: '2.436.000', tiapBln: '203.000' },
            { no: 2, rincian: 'INFAQ', nom: '92.000', vol: 12, jml: '1.104.000', tiapBln: '92.000' },
            { no: 3, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 4, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 5, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 6, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 8, rincian: 'MUHARRAM', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' },
            { no: 9, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 10, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          regTotal1Th: '3.960.000',
          regTotalBln: '330.000',
          regBulat: '330.000',
          nonMukim: [
            { no: 1, rincian: 'INFAQ Sekolah', nom: '92.000', vol: 12, jml: '1.104.000', tiapBln: '92.000' },
            { no: 2, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 3, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 4, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 5, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 6, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          nonMukimTotal1Th: '1.464.000',
          nonMukimTotalBln: '122.000',
          nonMukimBulat: '122.000'
        },
        akhirTahun: {
          items: [
            { no: 1, jenis: 'Kesiswaan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Kalender', nom: '25.000', vol: 1, jml: '25.000' },
            { no: 3, jenis: 'Pondok Romadlon', nom: '25.000', vol: 1, jml: '25.000' },
            { no: 4, jenis: 'Haflah & Haul', nom: '125.000', vol: 1, jml: '125.000' },
            { no: 5, jenis: 'Perpustakaan', nom: '60.000', vol: 1, jml: '60.000' }
          ],
          total: '335.000'
        },
        seragam: {
          putra: [{ no: 1, jenis: 'Baju Taqwa', nom: '90.000', vol: 1, jml: '90.000' }],
          putraTotal: '90.000',
          putri: [
            { no: 1, jenis: 'Jubah', nom: '120.000', vol: 1, jml: '120.000' },
            { no: 2, jenis: 'Kerudung', nom: '40.000', vol: 1, jml: '40.000' }
          ],
          putriTotal: '160.000',
          note: 'NB: Pembayaran Seragam Khusus Pondok dilaksanakan pada bulan Oktober'
        }
      },
      '11ma': {
        title: 'KELAS 11 MA',
        classSubtitle: 'RINCIAN PEMBAYARAN KELAS 11 (SEBELAS)',
        tingkat: 'MA / SMA (Tingkat 2 - Santri Lanjutan)',
        awalTahun: {
          vip: [
            { no: 1, jenis: 'PPDB Pondok / Daftar Ulang', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Fasilitas & Asrama Lanjutan', nom: '150.000', vol: 1, jml: '150.000' }
          ],
          vipTotal: '250.000',
          reguler: [
            { no: 1, jenis: 'Daftar Ulang Santri Lanjutan', nom: '100.000', vol: 1, jml: '100.000' }
          ],
          regTotal: '100.000',
          nonMukim: [
            { no: 1, jenis: 'Daftar Ulang Siswa Lanjutan', nom: '100.000', vol: 1, jml: '100.000' }
          ],
          nonMukimTotal: '100.000'
        },
        bulanan: {
          vip: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '223.000', vol: 12, jml: '2.676.000', tiapBln: '223.000' },
            { no: 2, rincian: 'INFAQ', nom: '92.000', vol: 12, jml: '1.104.000', tiapBln: '92.000' },
            { no: 3, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 4, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 5, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 6, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 8, rincian: 'MUHARRAM', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' },
            { no: 9, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 10, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          vipTotal1Th: '4.200.000',
          vipTotalBln: '350.000',
          vipBulat: '350.000',
          reguler: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '203.000', vol: 12, jml: '2.436.000', tiapBln: '203.000' },
            { no: 2, rincian: 'INFAQ', nom: '92.000', vol: 12, jml: '1.104.000', tiapBln: '92.000' },
            { no: 3, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 4, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 5, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 6, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 8, rincian: 'MUHARRAM', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' },
            { no: 9, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 10, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          regTotal1Th: '3.960.000',
          regTotalBln: '330.000',
          regBulat: '330.000',
          nonMukim: [
            { no: 1, rincian: 'INFAQ Sekolah', nom: '92.000', vol: 12, jml: '1.104.000', tiapBln: '92.000' },
            { no: 2, rincian: 'PTS', nom: '55.000', vol: 2, jml: '110.000', tiapBln: '9.167' },
            { no: 3, rincian: 'PAS', nom: '70.000', vol: 2, jml: '140.000', tiapBln: '11.667' },
            { no: 4, rincian: 'KKM', nom: '10.000', vol: 2, jml: '20.000', tiapBln: '1.667' },
            { no: 5, rincian: 'PERAWATAN', nom: '30.000', vol: 2, jml: '60.000', tiapBln: '5.000' },
            { no: 6, rincian: 'POSKESTREN', nom: '20.000', vol: 1, jml: '20.000', tiapBln: '1.667' },
            { no: 7, rincian: 'HUT RI', nom: '10.000', vol: 1, jml: '10.000', tiapBln: '833' }
          ],
          nonMukimTotal1Th: '1.464.000',
          nonMukimTotalBln: '122.000',
          nonMukimBulat: '122.000'
        },
        akhirTahun: {
          items: [
            { no: 1, jenis: 'Kesiswaan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Kalender', nom: '25.000', vol: 1, jml: '25.000' },
            { no: 3, jenis: 'Pondok Romadlon', nom: '25.000', vol: 1, jml: '25.000' },
            { no: 4, jenis: 'Haflah & Haul', nom: '125.000', vol: 1, jml: '125.000' },
            { no: 5, jenis: 'Perpustakaan', nom: '60.000', vol: 1, jml: '60.000' }
          ],
          total: '335.000'
        },
        seragam: {
          putra: [{ no: 1, jenis: 'Seragam Melanjutkan Kelas 10', nom: '0', vol: 1, jml: '0' }],
          putraTotal: '0',
          putri: [{ no: 1, jenis: 'Seragam Melanjutkan Kelas 10', nom: '0', vol: 1, jml: '0' }],
          putriTotal: '0',
          note: 'NB: Bebas seragam baru (melanjutkan seragam kelas 10). Santri pindahan wajib paket seragam MA.'
        }
      },
      '12ma': {
        title: 'KELAS 12 MA',
        classSubtitle: 'RINCIAN PEMBAYARAN KELAS 12 (DUA BELAS)',
        tingkat: 'MA / SMA (Tingkat Akhir & Wisuda Pelepasan)',
        awalTahun: {
          vip: [
            { no: 1, jenis: 'Daftar Ulang Pondok Lanjutan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Fasilitas & Kasur Asrama', nom: '150.000', vol: 1, jml: '150.000' },
            { no: 3, jenis: 'Daftar Ulang Ujian Akhir MA', nom: '210.000', vol: 1, jml: '210.000' }
          ],
          vipTotal: '460.000',
          reguler: [
            { no: 1, jenis: 'Daftar Ulang Lanjutan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Biaya Administrasi Akhir', nom: '210.000', vol: 1, jml: '210.000' }
          ],
          regTotal: '310.000',
          nonMukim: [
            { no: 1, jenis: 'Daftar Ulang Sekolah', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 2, jenis: 'Administrasi Akhir', nom: '210.000', vol: 1, jml: '210.000' }
          ],
          nonMukimTotal: '310.000'
        },
        bulanan: {
          vip: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '223.000', vol: 12, jml: '2.676.000', tiapBln: '223.000' },
            { no: 2, rincian: 'INFAQ', nom: '92.000', vol: 12, jml: '1.104.000', tiapBln: '92.000' },
            { no: 3, rincian: 'PTS & PAS (Disesuaikan)', nom: '105.000', vol: 2, jml: '210.000', tiapBln: '17.500' },
            { no: 4, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 5, rincian: 'KKM & PERAWATAN', nom: '40.000', vol: 2, jml: '80.000', tiapBln: '6.667' },
            { no: 6, rincian: 'KEGIATAN & SOSIAL', nom: '40.000', vol: 1, jml: '40.000', tiapBln: '1.667' }
          ],
          vipTotal1Th: '4.140.000',
          vipTotalBln: '345.000',
          vipBulat: '345.000',
          reguler: [
            { no: 1, rincian: 'SYAHRIYAH', nom: '203.000', vol: 12, jml: '2.436.000', tiapBln: '203.000' },
            { no: 2, rincian: 'INFAQ', nom: '92.000', vol: 12, jml: '1.104.000', tiapBln: '92.000' },
            { no: 3, rincian: 'PTS & PAS (Disesuaikan)', nom: '105.000', vol: 2, jml: '210.000', tiapBln: '17.500' },
            { no: 4, rincian: 'PAS MADIN', nom: '25.000', vol: 2, jml: '50.000', tiapBln: '4.167' },
            { no: 5, rincian: 'KKM & PERAWATAN', nom: '40.000', vol: 2, jml: '80.000', tiapBln: '6.667' },
            { no: 6, rincian: 'KEGIATAN & SOSIAL', nom: '40.000', vol: 1, jml: '40.000', tiapBln: '1.667' }
          ],
          regTotal1Th: '3.900.000',
          regTotalBln: '325.000',
          regBulat: '325.000',
          nonMukim: [
            { no: 1, rincian: 'INFAQ Sekolah', nom: '92.000', vol: 12, jml: '1.104.000', tiapBln: '92.000' },
            { no: 2, rincian: 'PTS & PAS Disesuaikan', nom: '105.000', vol: 2, jml: '210.000', tiapBln: '17.500' },
            { no: 3, rincian: 'KKM & PERAWATAN', nom: '40.000', vol: 2, jml: '80.000', tiapBln: '6.667' },
            { no: 4, rincian: 'KEGIATAN & SOSIAL', nom: '40.000', vol: 1, jml: '40.000', tiapBln: '833' }
          ],
          nonMukimTotal1Th: '1.404.000',
          nonMukimTotalBln: '117.000',
          nonMukimBulat: '117.000'
        },
        akhirTahun: {
          items: [
            { no: 1, jenis: 'Ujian Madrasah & Asesmen Akhir', nom: '200.000', vol: 1, jml: '200.000' },
            { no: 2, jenis: 'Ijazah & Dokumen Kelulusan', nom: '100.000', vol: 1, jml: '100.000' },
            { no: 3, jenis: 'Wisuda & Pelepasan Siswa', nom: '150.000', vol: 1, jml: '150.000' },
            { no: 4, jenis: 'Haflah, Romadlon & Kalender', nom: '110.000', vol: 1, jml: '110.000' }
          ],
          total: '560.000'
        },
        seragam: {
          putra: [{ no: 1, jenis: 'Melanjutkan Seragam MA', nom: '0', vol: 1, jml: '0' }],
          putraTotal: '0',
          putri: [{ no: 1, jenis: 'Melanjutkan Seragam MA', nom: '0', vol: 1, jml: '0' }],
          putriTotal: '0',
          note: 'NB: Bebas seragam baru (melanjutkan seragam kelas sebelumnya).'
        }
      }
    };

    function drawOfficialCell(ctx, text, x, y, w, h, options = {}) {
      const {
        align = 'left',
        isBold = false,
        fontSize = 12,
        bg = '#ffffff',
        textColor = '#000000',
        border = true,
        borderColor = '#000000',
        padding = 5
      } = options;

      // Fill background
      if (bg) {
        ctx.fillStyle = bg;
        ctx.fillRect(x, y, w, h);
      }

      // Draw border
      if (border) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);
      }

      // Text
      if (text !== undefined && text !== null && text !== '') {
        ctx.fillStyle = textColor;
        ctx.font = `${isBold ? 'bold ' : ''}${fontSize}px Arial, "Plus Jakarta Sans", sans-serif`;
        ctx.textBaseline = 'middle';

        let textX = x + padding;
        if (align === 'center') {
          ctx.textAlign = 'center';
          textX = x + (w / 2);
        } else if (align === 'right') {
          ctx.textAlign = 'right';
          textX = x + w - padding;
        } else {
          ctx.textAlign = 'left';
        }

        ctx.fillText(String(text), textX, y + (h / 2));
      }
    }

    function generateClassCatalogCanvas(clsKey) {
      if (clsKey === 'seragam') {
        return generateSeragamCatalogCanvas();
      }

      const matrix = OFFICIAL_CLASS_MATRIX[clsKey] || OFFICIAL_CLASS_MATRIX['10ma'];
      const canvas = document.createElement('canvas');
      const width = 1240;
      const height = 1880;
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // Pure White Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      const margin = 20;
      const gap = 16;
      const colLeftW = 510;
      const colRightW = width - (margin * 2) - colLeftW - gap; // 674px

      const colLeftX = margin;
      const colRightX = margin + colLeftW + gap;
      let startY = margin;

      // COLOR PALETTE CONSTANTS
      const C_CYAN = '#b2ebf2';
      const C_BLACK = '#000000';
      const C_GREEN_BORDER = '#15803d';
      const C_PURPLE_BORDER = '#581c87';
      const C_RED_BORDER = '#991b1b';

      // =======================================================================
      // 1. BOX 1 (TOP LEFT): BIAYA AWAL TAHUN (BLACK BORDER & HEADER)
      // =======================================================================
      let curY1 = startY;
      const box1X = colLeftX;
      const box1W = colLeftW;

      // Header Top Text
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 12px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN", box1X + (box1W / 2), curY1 + 18);
      ctx.font = 'bold 13px Arial, sans-serif';
      ctx.fillText(matrix.classSubtitle, box1X + (box1W / 2), curY1 + 36);

      // Title Bar: BIAYA AWAL TAHUN
      drawOfficialCell(ctx, 'BIAYA AWAL TAHUN', box1X, curY1 + 45, box1W, 36, {
        align: 'center', isBold: true, fontSize: 19, bg: C_BLACK, textColor: '#ffffff', border: true
      });
      curY1 += 81;

      // Section A: PUTRI-MUKIM (VIP)
      drawOfficialCell(ctx, 'A. PUTRI-MUKIM (VIP)', box1X, curY1, box1W, 22, {
        align: 'left', isBold: true, fontSize: 12, bg: C_BLACK, textColor: '#ffffff', padding: 8
      });
      curY1 += 22;

      // Subheaders Awal Tahun: NO (35) | JENIS (245) | NOMINAL (80) | VOL (45) | JUMLAH (105)
      const wAwal = [35, 245, 80, 45, 105];
      const hRow = 20;

      function renderAwalTahunSubheader(y) {
        let x = box1X;
        const headers = ['NO', 'JENIS', 'NOMINAL', 'VOL', 'JUMLAH'];
        const aligns = ['center', 'center', 'center', 'center', 'center'];
        for (let i = 0; i < headers.length; i++) {
          drawOfficialCell(ctx, headers[i], x, y, wAwal[i], hRow, {
            align: aligns[i], isBold: true, fontSize: 11, bg: C_CYAN
          });
          x += wAwal[i];
        }
      }

      renderAwalTahunSubheader(curY1);
      curY1 += hRow;

      const itemsVip = matrix.awalTahun.vip || [];
      itemsVip.forEach(item => {
        let x = box1X;
        drawOfficialCell(ctx, item.no, x, curY1, wAwal[0], hRow, { align: 'center', fontSize: 11 }); x += wAwal[0];
        drawOfficialCell(ctx, item.jenis, x, curY1, wAwal[1], hRow, { align: 'left', fontSize: 11 }); x += wAwal[1];
        drawOfficialCell(ctx, item.nom, x, curY1, wAwal[2], hRow, { align: 'right', fontSize: 11 }); x += wAwal[2];
        drawOfficialCell(ctx, item.vol, x, curY1, wAwal[3], hRow, { align: 'center', fontSize: 11 }); x += wAwal[3];
        drawOfficialCell(ctx, item.jml, x, curY1, wAwal[4], hRow, { align: 'right', fontSize: 11 });
        curY1 += hRow;
      });

      // Total VIP
      let xTot1 = box1X;
      const spanW1 = wAwal[0] + wAwal[1] + wAwal[2] + wAwal[3];
      drawOfficialCell(ctx, 'TOTAL', xTot1, curY1, spanW1, hRow, { align: 'right', isBold: true, fontSize: 12, padding: 10 });
      drawOfficialCell(ctx, matrix.awalTahun.vipTotal, xTot1 + spanW1, curY1, wAwal[4], hRow, { align: 'right', isBold: true, fontSize: 12, bg: C_CYAN });
      curY1 += hRow;

      // Section B: PUTRA/ PUTRI-MUKIM (REGULER)
      drawOfficialCell(ctx, 'B. PUTRA/ PUTRI-MUKIM (REGULER)', box1X, curY1, box1W, 22, {
        align: 'left', isBold: true, fontSize: 12, bg: C_BLACK, textColor: '#ffffff', padding: 8
      });
      curY1 += 22;

      renderAwalTahunSubheader(curY1);
      curY1 += hRow;

      const itemsReg = matrix.awalTahun.reguler || [];
      itemsReg.forEach(item => {
        let x = box1X;
        drawOfficialCell(ctx, item.no, x, curY1, wAwal[0], hRow, { align: 'center', fontSize: 11 }); x += wAwal[0];
        drawOfficialCell(ctx, item.jenis, x, curY1, wAwal[1], hRow, { align: 'left', fontSize: 11 }); x += wAwal[1];
        drawOfficialCell(ctx, item.nom, x, curY1, wAwal[2], hRow, { align: 'right', fontSize: 11 }); x += wAwal[2];
        drawOfficialCell(ctx, item.vol, x, curY1, wAwal[3], hRow, { align: 'center', fontSize: 11 }); x += wAwal[3];
        drawOfficialCell(ctx, item.jml, x, curY1, wAwal[4], hRow, { align: 'right', fontSize: 11 });
        curY1 += hRow;
      });

      // Total Reguler
      drawOfficialCell(ctx, 'TOTAL', xTot1, curY1, spanW1, hRow, { align: 'right', isBold: true, fontSize: 12, padding: 10 });
      drawOfficialCell(ctx, matrix.awalTahun.regTotal, xTot1 + spanW1, curY1, wAwal[4], hRow, { align: 'right', isBold: true, fontSize: 12, bg: C_CYAN });
      curY1 += hRow;

      // Section C: NON MUKIM (MBAJAK)
      drawOfficialCell(ctx, 'C. NON MUKIM (MBAJAK)', box1X, curY1, box1W, 22, {
        align: 'left', isBold: true, fontSize: 12, bg: C_BLACK, textColor: '#ffffff', padding: 8
      });
      curY1 += 22;

      renderAwalTahunSubheader(curY1);
      curY1 += hRow;

      const itemsNm = matrix.awalTahun.nonMukim || [];
      itemsNm.forEach(item => {
        let x = box1X;
        drawOfficialCell(ctx, item.no, x, curY1, wAwal[0], hRow, { align: 'center', fontSize: 11 }); x += wAwal[0];
        drawOfficialCell(ctx, item.jenis, x, curY1, wAwal[1], hRow, { align: 'left', fontSize: 11 }); x += wAwal[1];
        drawOfficialCell(ctx, item.nom, x, curY1, wAwal[2], hRow, { align: 'right', fontSize: 11 }); x += wAwal[2];
        drawOfficialCell(ctx, item.vol, x, curY1, wAwal[3], hRow, { align: 'center', fontSize: 11 }); x += wAwal[3];
        drawOfficialCell(ctx, item.jml, x, curY1, wAwal[4], hRow, { align: 'right', fontSize: 11 });
        curY1 += hRow;
      });

      // Total Non-Mukim
      drawOfficialCell(ctx, 'TOTAL', xTot1, curY1, spanW1, hRow, { align: 'right', isBold: true, fontSize: 12, padding: 10 });
      drawOfficialCell(ctx, matrix.awalTahun.nonMukimTotal, xTot1 + spanW1, curY1, wAwal[4], hRow, { align: 'right', isBold: true, fontSize: 12, bg: C_CYAN });
      curY1 += hRow;

      // Stroke outer border for Box 1
      ctx.strokeStyle = C_BLACK;
      ctx.lineWidth = 3;
      ctx.strokeRect(box1X, startY, box1W, curY1 - startY);

      // =======================================================================
      // 2. BOX 3 (BOTTOM LEFT): BIAYA AKHIR TAHUN (PURPLE BORDER & HEADER)
      // =======================================================================
      const box3Y = curY1 + 18;
      let curY3 = box3Y;

      // Header Top Text
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 12px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN", box1X + (box1W / 2), curY3 + 18);
      ctx.font = 'bold 13px Arial, sans-serif';
      ctx.fillText(matrix.classSubtitle, box1X + (box1W / 2), curY3 + 36);

      // Title Bar: BIAYA AKHIR TAHUN
      drawOfficialCell(ctx, 'BIAYA AKHIR TAHUN', box1X, curY3 + 45, box1W, 36, {
        align: 'center', isBold: true, fontSize: 19, bg: C_PURPLE_BORDER, textColor: '#ffffff', border: true, borderColor: C_PURPLE_BORDER
      });
      curY3 += 81;

      // Section A: VIP/ REGULER/ NON MUKIM
      drawOfficialCell(ctx, 'A. VIP/ REGULER/ NON MUKIM', box1X, curY3, box1W, 22, {
        align: 'left', isBold: true, fontSize: 12, bg: C_PURPLE_BORDER, textColor: '#ffffff', padding: 8, borderColor: C_PURPLE_BORDER
      });
      curY3 += 22;

      renderAwalTahunSubheader(curY3);
      curY3 += hRow;

      const itemsAkhir = matrix.akhirTahun.items || [];
      itemsAkhir.forEach(item => {
        let x = box1X;
        drawOfficialCell(ctx, item.no, x, curY3, wAwal[0], hRow, { align: 'center', fontSize: 11 }); x += wAwal[0];
        drawOfficialCell(ctx, item.jenis, x, curY3, wAwal[1], hRow, { align: 'left', fontSize: 11 }); x += wAwal[1];
        drawOfficialCell(ctx, item.nom, x, curY3, wAwal[2], hRow, { align: 'right', fontSize: 11 }); x += wAwal[2];
        drawOfficialCell(ctx, item.vol, x, curY3, wAwal[3], hRow, { align: 'center', fontSize: 11 }); x += wAwal[3];
        drawOfficialCell(ctx, item.jml, x, curY3, wAwal[4], hRow, { align: 'right', fontSize: 11 });
        curY3 += hRow;
      });

      // Total Akhir Tahun
      drawOfficialCell(ctx, 'TOTAL', xTot1, curY3, spanW1, hRow, { align: 'right', isBold: true, fontSize: 12, padding: 10 });
      drawOfficialCell(ctx, matrix.akhirTahun.total, xTot1 + spanW1, curY3, wAwal[4], hRow, { align: 'right', isBold: true, fontSize: 12, bg: C_CYAN });
      curY3 += hRow;

      // Stroke outer border for Box 3
      ctx.strokeStyle = C_PURPLE_BORDER;
      ctx.lineWidth = 3;
      ctx.strokeRect(box1X, box3Y, box1W, curY3 - box3Y);

      // =======================================================================
      // 3. BOX 2 (RIGHT COLUMN): BIAYA BULANAN (GREEN BORDER & HEADER)
      // =======================================================================
      let curY2 = startY;
      const box2X = colRightX;
      const box2W = colRightW;

      // Header Top Text
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 12px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN", box2X + (box2W / 2), curY2 + 18);
      ctx.font = 'bold 13px Arial, sans-serif';
      ctx.fillText(matrix.classSubtitle, box2X + (box2W / 2), curY2 + 36);

      // Title Bar: BIAYA BULANAN
      drawOfficialCell(ctx, 'BIAYA BULANAN', box2X, curY2 + 45, box2W, 36, {
        align: 'center', isBold: true, fontSize: 19, bg: C_GREEN_BORDER, textColor: '#ffffff', border: true, borderColor: C_GREEN_BORDER
      });
      curY2 += 81;

      // Subheaders Bulanan: NO (35) | RINCIAN BIAYA (190) | NOMINAL (Satuan) (110) | DALAM 1 TAHUN (VOL 45, JML 140) | TIAP BULAN (154)
      const wBln = [35, 190, 110, 45, 140, 154];

      function renderBulananHeader(y) {
        let x = box2X;
        // Two-row header
        // Row 1:
        drawOfficialCell(ctx, 'NO', x, y, wBln[0], hRow * 2, { align: 'center', isBold: true, fontSize: 11, bg: C_CYAN }); x += wBln[0];
        drawOfficialCell(ctx, 'RINCIAN BIAYA', x, y, wBln[1], hRow * 2, { align: 'center', isBold: true, fontSize: 11, bg: C_CYAN }); x += wBln[1];
        drawOfficialCell(ctx, 'NOMINAL\n(Satuan)', x, y, wBln[2], hRow, { align: 'center', isBold: true, fontSize: 10, bg: C_CYAN });
        drawOfficialCell(ctx, '(Satuan)', x, y + hRow, wBln[2], hRow, { align: 'center', isBold: true, fontSize: 10, bg: C_CYAN }); x += wBln[2];

        // DALAM 1 TAHUN (Spans VOL & JUMLAH)
        const spanThnW = wBln[3] + wBln[4];
        drawOfficialCell(ctx, 'DALAM 1 TAHUN', x, y, spanThnW, hRow, { align: 'center', isBold: true, fontSize: 11, bg: C_CYAN });
        drawOfficialCell(ctx, 'VOL.', x, y + hRow, wBln[3], hRow, { align: 'center', isBold: true, fontSize: 11, bg: C_CYAN });
        drawOfficialCell(ctx, 'JUMLAH', x + wBln[3], y + hRow, wBln[4], hRow, { align: 'center', isBold: true, fontSize: 11, bg: C_CYAN });
        x += spanThnW;

        drawOfficialCell(ctx, 'TIAP', x, y, wBln[5], hRow, { align: 'center', isBold: true, fontSize: 11, bg: C_CYAN });
        drawOfficialCell(ctx, 'BULAN', x, y + hRow, wBln[5], hRow, { align: 'center', isBold: true, fontSize: 11, bg: C_CYAN });
      }

      // SECTION A: PUTRI-MUKIM (VIP)
      drawOfficialCell(ctx, 'A. PUTRI-MUKIM (VIP)', box2X, curY2, box2W, 22, {
        align: 'left', isBold: true, fontSize: 12, bg: C_GREEN_BORDER, textColor: '#ffffff', padding: 8, borderColor: C_GREEN_BORDER
      });
      curY2 += 22;

      renderBulananHeader(curY2);
      curY2 += (hRow * 2);

      const itemsBlnVip = matrix.bulanan.vip || [];
      itemsBlnVip.forEach(item => {
        let x = box2X;
        drawOfficialCell(ctx, item.no, x, curY2, wBln[0], hRow, { align: 'center', fontSize: 11 }); x += wBln[0];
        drawOfficialCell(ctx, item.rincian, x, curY2, wBln[1], hRow, { align: 'left', fontSize: 11 }); x += wBln[1];
        drawOfficialCell(ctx, item.nom, x, curY2, wBln[2], hRow, { align: 'right', fontSize: 11 }); x += wBln[2];
        drawOfficialCell(ctx, item.vol, x, curY2, wBln[3], hRow, { align: 'center', fontSize: 11 }); x += wBln[3];
        drawOfficialCell(ctx, item.jml, x, curY2, wBln[4], hRow, { align: 'right', fontSize: 11 }); x += wBln[4];
        drawOfficialCell(ctx, item.tiapBln, x, curY2, wBln[5], hRow, { align: 'right', fontSize: 11 });
        curY2 += hRow;
      });

      // Total VIP Bulanan
      const spanBlnTot = wBln[0] + wBln[1] + wBln[2] + wBln[3];
      drawOfficialCell(ctx, 'TOTAL', box2X, curY2, spanBlnTot, hRow, { align: 'right', isBold: true, fontSize: 12, padding: 10 });
      drawOfficialCell(ctx, matrix.bulanan.vipTotal1Th, box2X + spanBlnTot, curY2, wBln[4], hRow, { align: 'right', isBold: true, fontSize: 12 });
      drawOfficialCell(ctx, matrix.bulanan.vipTotalBln, box2X + spanBlnTot + wBln[4], curY2, wBln[5], hRow, { align: 'right', isBold: true, fontSize: 12 });
      curY2 += hRow;

      // Pembulatan VIP
      const spanBulat = wBln[0] + wBln[1] + wBln[2] + wBln[3] + wBln[4];
      drawOfficialCell(ctx, 'Pembulatan Biaya Pendidikan Setiap Bulan', box2X, curY2, spanBulat, hRow, { align: 'center', isBold: true, fontSize: 12, bg: C_CYAN });
      drawOfficialCell(ctx, matrix.bulanan.vipBulat, box2X + spanBulat, curY2, wBln[5], hRow, { align: 'right', isBold: true, fontSize: 12, bg: C_CYAN });
      curY2 += hRow;

      // SECTION B: PUTRA/ PUTRI-MUKIM (REGULER)
      drawOfficialCell(ctx, 'B. PUTRA/ PUTRI-MUKIM (REGULER)', box2X, curY2, box2W, 22, {
        align: 'left', isBold: true, fontSize: 12, bg: C_GREEN_BORDER, textColor: '#ffffff', padding: 8, borderColor: C_GREEN_BORDER
      });
      curY2 += 22;

      renderBulananHeader(curY2);
      curY2 += (hRow * 2);

      const itemsBlnReg = matrix.bulanan.reguler || [];
      itemsBlnReg.forEach(item => {
        let x = box2X;
        drawOfficialCell(ctx, item.no, x, curY2, wBln[0], hRow, { align: 'center', fontSize: 11 }); x += wBln[0];
        drawOfficialCell(ctx, item.rincian, x, curY2, wBln[1], hRow, { align: 'left', fontSize: 11 }); x += wBln[1];
        drawOfficialCell(ctx, item.nom, x, curY2, wBln[2], hRow, { align: 'right', fontSize: 11 }); x += wBln[2];
        drawOfficialCell(ctx, item.vol, x, curY2, wBln[3], hRow, { align: 'center', fontSize: 11 }); x += wBln[3];
        drawOfficialCell(ctx, item.jml, x, curY2, wBln[4], hRow, { align: 'right', fontSize: 11 }); x += wBln[4];
        drawOfficialCell(ctx, item.tiapBln, x, curY2, wBln[5], hRow, { align: 'right', fontSize: 11 });
        curY2 += hRow;
      });

      // Total Reguler Bulanan
      drawOfficialCell(ctx, 'TOTAL', box2X, curY2, spanBlnTot, hRow, { align: 'right', isBold: true, fontSize: 12, padding: 10 });
      drawOfficialCell(ctx, matrix.bulanan.regTotal1Th, box2X + spanBlnTot, curY2, wBln[4], hRow, { align: 'right', isBold: true, fontSize: 12 });
      drawOfficialCell(ctx, matrix.bulanan.regTotalBln, box2X + spanBlnTot + wBln[4], curY2, wBln[5], hRow, { align: 'right', isBold: true, fontSize: 12 });
      curY2 += hRow;

      // Pembulatan Reguler
      drawOfficialCell(ctx, 'Pembulatan Biaya Pendidikan Setiap Bulan', box2X, curY2, spanBulat, hRow, { align: 'center', isBold: true, fontSize: 12, bg: C_CYAN });
      drawOfficialCell(ctx, matrix.bulanan.regBulat, box2X + spanBulat, curY2, wBln[5], hRow, { align: 'right', isBold: true, fontSize: 12, bg: C_CYAN });
      curY2 += hRow;

      // SECTION C: NON MUKIM (MBAJAK)
      drawOfficialCell(ctx, 'C. NON MUKIM (MBAJAK)', box2X, curY2, box2W, 22, {
        align: 'left', isBold: true, fontSize: 12, bg: C_GREEN_BORDER, textColor: '#ffffff', padding: 8, borderColor: C_GREEN_BORDER
      });
      curY2 += 22;

      renderBulananHeader(curY2);
      curY2 += (hRow * 2);

      const itemsBlnNm = matrix.bulanan.nonMukim || [];
      itemsBlnNm.forEach(item => {
        let x = box2X;
        drawOfficialCell(ctx, item.no, x, curY2, wBln[0], hRow, { align: 'center', fontSize: 11 }); x += wBln[0];
        drawOfficialCell(ctx, item.rincian, x, curY2, wBln[1], hRow, { align: 'left', fontSize: 11 }); x += wBln[1];
        drawOfficialCell(ctx, item.nom, x, curY2, wBln[2], hRow, { align: 'right', fontSize: 11 }); x += wBln[2];
        drawOfficialCell(ctx, item.vol, x, curY2, wBln[3], hRow, { align: 'center', fontSize: 11 }); x += wBln[3];
        drawOfficialCell(ctx, item.jml, x, curY2, wBln[4], hRow, { align: 'right', fontSize: 11 }); x += wBln[4];
        drawOfficialCell(ctx, item.tiapBln, x, curY2, wBln[5], hRow, { align: 'right', fontSize: 11 });
        curY2 += hRow;
      });

      // Total Non-Mukim Bulanan
      drawOfficialCell(ctx, 'TOTAL', box2X, curY2, spanBlnTot, hRow, { align: 'right', isBold: true, fontSize: 12, padding: 10 });
      drawOfficialCell(ctx, matrix.bulanan.nonMukimTotal1Th, box2X + spanBlnTot, curY2, wBln[4], hRow, { align: 'right', isBold: true, fontSize: 12 });
      drawOfficialCell(ctx, matrix.bulanan.nonMukimTotalBln, box2X + spanBlnTot + wBln[4], curY2, wBln[5], hRow, { align: 'right', isBold: true, fontSize: 12 });
      curY2 += hRow;

      // Pembulatan Non-Mukim
      drawOfficialCell(ctx, 'Pembulatan Biaya Pendidikan Setiap Bulan', box2X, curY2, spanBulat, hRow, { align: 'center', isBold: true, fontSize: 12, bg: C_CYAN });
      drawOfficialCell(ctx, matrix.bulanan.nonMukimBulat, box2X + spanBulat, curY2, wBln[5], hRow, { align: 'right', isBold: true, fontSize: 12, bg: C_CYAN });
      curY2 += hRow;

      // Stroke outer border for Box 2
      ctx.strokeStyle = C_GREEN_BORDER;
      ctx.lineWidth = 3;
      ctx.strokeRect(box2X, startY, box2W, curY2 - startY);

      // =======================================================================
      // 4. BOX 4 (BOTTOM FULL WIDTH): SERAGAM KHUSUS PONDOK (RED BORDER & HEADER)
      // =======================================================================
      const box4Y = Math.max(curY3, curY2) + 20;
      let curY4 = box4Y;
      const box4X = margin;
      const box4W = width - (margin * 2);

      // Title Bar: SERAGAM KHUSUS PONDOK (SANTRI)
      drawOfficialCell(ctx, 'SERAGAM KHUSUS PONDOK (SANTRI)', box4X, curY4, box4W, 30, {
        align: 'center', isBold: true, fontSize: 16, bg: C_RED_BORDER, textColor: '#ffffff', border: true, borderColor: C_RED_BORDER
      });
      curY4 += 30;

      const subW = (box4W / 2);
      const wSrg = [35, 175, 80, 45, 115]; // = 450px for half (450 + 450 + 120 rest)
      const wSrgPa = [35, 230, 80, 45, 160];
      const wSrgPi = [35, 230, 80, 45, 160];

      // Left: A. SANTRI PUTRA
      drawOfficialCell(ctx, 'A. SANTRI PUTRA', box4X, curY4, subW, 20, {
        align: 'left', isBold: true, fontSize: 11, bg: C_RED_BORDER, textColor: '#ffffff', padding: 8, borderColor: C_RED_BORDER
      });
      // Right: B. SANTRI PUTRI
      drawOfficialCell(ctx, 'B. SANTRI PUTRI', box4X + subW, curY4, subW, 20, {
        align: 'left', isBold: true, fontSize: 11, bg: C_RED_BORDER, textColor: '#ffffff', padding: 8, borderColor: C_RED_BORDER
      });
      curY4 += 20;

      // Headers for Putra & Putri
      let xH = box4X;
      ['NO', 'JENIS', 'NOMINAL', 'VOL', 'JUMLAH'].forEach((h, idx) => {
        drawOfficialCell(ctx, h, xH, curY4, wSrgPa[idx], hRow, { align: 'center', isBold: true, fontSize: 11, bg: C_CYAN });
        xH += wSrgPa[idx];
      });

      let xH2 = box4X + subW;
      ['NO', 'JENIS', 'NOMINAL', 'VOL', 'JUMLAH'].forEach((h, idx) => {
        drawOfficialCell(ctx, h, xH2, curY4, wSrgPi[idx], hRow, { align: 'center', isBold: true, fontSize: 11, bg: C_CYAN });
        xH2 += wSrgPi[idx];
      });
      curY4 += hRow;

      // Row 1
      const itemPa1 = (matrix.seragam.putra && matrix.seragam.putra[0]) || { no: 1, jenis: 'Baju Taqwa', nom: '90.000', vol: 1, jml: '90.000' };
      let xPa = box4X;
      drawOfficialCell(ctx, itemPa1.no, xPa, curY4, wSrgPa[0], hRow, { align: 'center', fontSize: 11 }); xPa += wSrgPa[0];
      drawOfficialCell(ctx, itemPa1.jenis, xPa, curY4, wSrgPa[1], hRow, { align: 'left', fontSize: 11 }); xPa += wSrgPa[1];
      drawOfficialCell(ctx, itemPa1.nom, xPa, curY4, wSrgPa[2], hRow, { align: 'right', fontSize: 11 }); xPa += wSrgPa[2];
      drawOfficialCell(ctx, itemPa1.vol, xPa, curY4, wSrgPa[3], hRow, { align: 'center', fontSize: 11 }); xPa += wSrgPa[3];
      drawOfficialCell(ctx, itemPa1.jml, xPa, curY4, wSrgPa[4], hRow, { align: 'right', fontSize: 11 });

      const itemPi1 = (matrix.seragam.putri && matrix.seragam.putri[0]) || { no: 1, jenis: 'Jubah', nom: '120.000', vol: 1, jml: '120.000' };
      let xPi = box4X + subW;
      drawOfficialCell(ctx, itemPi1.no, xPi, curY4, wSrgPi[0], hRow, { align: 'center', fontSize: 11 }); xPi += wSrgPi[0];
      drawOfficialCell(ctx, itemPi1.jenis, xPi, curY4, wSrgPi[1], hRow, { align: 'left', fontSize: 11 }); xPi += wSrgPi[1];
      drawOfficialCell(ctx, itemPi1.nom, xPi, curY4, wSrgPi[2], hRow, { align: 'right', fontSize: 11 }); xPi += wSrgPi[2];
      drawOfficialCell(ctx, itemPi1.vol, xPi, curY4, wSrgPi[3], hRow, { align: 'center', fontSize: 11 }); xPi += wSrgPi[3];
      drawOfficialCell(ctx, itemPi1.jml, xPi, curY4, wSrgPi[4], hRow, { align: 'right', fontSize: 11 });
      curY4 += hRow;

      // Row 2 (Putra Total vs Putri Row 2)
      const spanPaTot = wSrgPa[0] + wSrgPa[1] + wSrgPa[2] + wSrgPa[3];
      drawOfficialCell(ctx, 'TOTAL', box4X, curY4, spanPaTot, hRow, { align: 'right', isBold: true, fontSize: 12, padding: 10 });
      drawOfficialCell(ctx, matrix.seragam.putraTotal, box4X + spanPaTot, curY4, wSrgPa[4], hRow, { align: 'right', isBold: true, fontSize: 12, bg: C_CYAN });

      const itemPi2 = (matrix.seragam.putri && matrix.seragam.putri[1]) || { no: 2, jenis: 'Kerudung', nom: '40.000', vol: 1, jml: '40.000' };
      xPi = box4X + subW;
      drawOfficialCell(ctx, itemPi2.no, xPi, curY4, wSrgPi[0], hRow, { align: 'center', fontSize: 11 }); xPi += wSrgPi[0];
      drawOfficialCell(ctx, itemPi2.jenis, xPi, curY4, wSrgPi[1], hRow, { align: 'left', fontSize: 11 }); xPi += wSrgPi[1];
      drawOfficialCell(ctx, itemPi2.nom, xPi, curY4, wSrgPi[2], hRow, { align: 'right', fontSize: 11 }); xPi += wSrgPi[2];
      drawOfficialCell(ctx, itemPi2.vol, xPi, curY4, wSrgPi[3], hRow, { align: 'center', fontSize: 11 }); xPi += wSrgPi[3];
      drawOfficialCell(ctx, itemPi2.jml, xPi, curY4, wSrgPi[4], hRow, { align: 'right', fontSize: 11 });
      curY4 += hRow;

      // Row 3 (Putra Empty / Putri Total)
      drawOfficialCell(ctx, '', box4X, curY4, subW, hRow, { border: true });
      
      const spanPiTot = wSrgPi[0] + wSrgPi[1] + wSrgPi[2] + wSrgPi[3];
      drawOfficialCell(ctx, 'TOTAL', box4X + subW, curY4, spanPiTot, hRow, { align: 'right', isBold: true, fontSize: 12, padding: 10 });
      drawOfficialCell(ctx, matrix.seragam.putriTotal, box4X + subW + spanPiTot, curY4, wSrgPi[4], hRow, { align: 'right', isBold: true, fontSize: 12, bg: C_CYAN });
      curY4 += hRow;

      // Footnote NB
      drawOfficialCell(ctx, matrix.seragam.note || 'NB: Pembayaran Seragam Khusus Pondok dilaksanakan pada bulan Oktober', box4X, curY4, box4W, 26, {
        align: 'left', isBold: true, fontSize: 12, padding: 10
      });
      curY4 += 26;

      // Stroke outer border for Box 4
      ctx.strokeStyle = C_RED_BORDER;
      ctx.lineWidth = 3;
      ctx.strokeRect(box4X, box4Y, box4W, curY4 - box4Y);

      return canvas;
    }

    // Special Canvas for Full Seragam Catalog Card
    function generateSeragamCatalogCanvas() {
      const canvas = document.createElement('canvas');
      const width = 1200;
      const height = 1100;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      const margin = 25;
      const boxW = width - (margin * 2);
      let curY = margin;

      // Top Title
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 14px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("YTPAI RAUDLATUL MUTA'ALLIMIN LAMONGAN", width / 2, curY + 20);
      ctx.font = 'bold 16px Arial, sans-serif';
      ctx.fillText("KATALOG LENGKAP SERAGAM SEKOLAH & ATRIBUT PONDOK", width / 2, curY + 42);

      drawOfficialCell(ctx, 'RINCIAN HARGA PAKET SERAGAM & BUSANA MUSLIM PESANTREN', margin, curY + 55, boxW, 40, {
        align: 'center', isBold: true, fontSize: 18, bg: '#7e22ce', textColor: '#ffffff', border: true
      });
      curY += 105;

      const wCols = [50, 320, 520, 260];
      const hRow = 32;

      // Subheaders
      const headers = ['NO', 'JENIS PAKET SERAGAM', 'KELENGKAPAN & ATRIBUT', 'NOMINAL (HARGA)'];
      let x = margin;
      headers.forEach((h, i) => {
        drawOfficialCell(ctx, h, x, curY, wCols[i], 36, { align: 'center', isBold: true, fontSize: 12, bg: '#b2ebf2' });
        x += wCols[i];
      });
      curY += 36;

      const items = [
        { no: 1, name: 'Paket Seragam MTs/SMP Putra', desc: 'Atasan putih/batik/pramuka, celana, kopyah, kaos olahraga & atribut', val: 'Rp 736.000' },
        { no: 2, name: 'Paket Seragam MTs/SMP Putri', desc: 'Atasan putih/batik/pramuka, rok panjang, kerudung, kaos OR & atribut', val: 'Rp 897.000' },
        { no: 3, name: 'Paket Seragam MA/SMA Putra', desc: 'Atasan putih/batik/pramuka, celana abu/panjang, kopyah, kaos OR & atribut', val: 'Rp 759.000' },
        { no: 4, name: 'Paket Seragam MA/SMA Putri', desc: 'Atasan putih/batik/pramuka, rok panjang, kerudung syari, kaos OR & atribut', val: 'Rp 938.000' },
        { no: 5, name: 'Busana Taqwa Santri (Putra)', desc: 'Seragam muslim resmi ibadah & pengajian santriwan', val: 'Rp 90.000' },
        { no: 6, name: 'Jubah + Kerudung Santri (Putri)', desc: 'Seragam gamis/jubah syari muslimah & kerudung santriwati', val: 'Rp 160.000' }
      ];

      items.forEach(it => {
        let xCell = margin;
        drawOfficialCell(ctx, it.no, xCell, curY, wCols[0], hRow, { align: 'center', fontSize: 12 }); xCell += wCols[0];
        drawOfficialCell(ctx, it.name, xCell, curY, wCols[1], hRow, { align: 'left', isBold: true, fontSize: 12, padding: 8 }); xCell += wCols[1];
        drawOfficialCell(ctx, it.desc, xCell, curY, wCols[2], hRow, { align: 'left', fontSize: 11, padding: 8 }); xCell += wCols[2];
        drawOfficialCell(ctx, it.val, xCell, curY, wCols[3], hRow, { align: 'right', isBold: true, fontSize: 13, bg: '#f3e8ff', padding: 10 });
        curY += hRow;
      });

      // Notes
      curY += 20;
      drawOfficialCell(ctx, 'INFORMASI PEMBELIAN & PEMBAYARAN SERAGAM', margin, curY, boxW, 26, {
        align: 'left', isBold: true, fontSize: 12, bg: '#f1f5f9', padding: 8
      });
      curY += 26;
      drawOfficialCell(ctx, '1. Santri Baru (Kelas 7 MTs & Kelas 10 MA) wajib mengambil paket seragam lengkap pada awal tahun ajaran.', margin, curY, boxW, 24, { fontSize: 11, padding: 8 });
      curY += 24;
      drawOfficialCell(ctx, '2. Santri Lanjutan (Kelas 8, 9, 11, 12) melanjutkan seragam yang ada, kecuali santri baru pindahan.', margin, curY, boxW, 24, { fontSize: 11, padding: 8 });
      curY += 24;
      drawOfficialCell(ctx, '3. Seragam Khusus Pondok Pesantren (Baju Taqwa / Jubah) dibayarkan dan didistribusikan pada bulan Oktober.', margin, curY, boxW, 24, { isBold: true, fontSize: 11, padding: 8 });
      curY += 24;

      // Outer border
      ctx.strokeStyle = '#7e22ce';
      ctx.lineWidth = 3;
      ctx.strokeRect(margin, margin, boxW, curY - margin);

      return canvas;
    }

    function openCatalogImageModal(clsKey) {
      const modal = document.getElementById('modalKatalogImagePreview');
      const img = document.getElementById('katalogPreviewImg');
      const titleEl = document.getElementById('katalogPreviewModalTitle');

      if (!modal || !img) return;

      if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }

      const canvas = generateClassCatalogCanvas(clsKey);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      const cfg = (typeof OFFICIAL_CLASS_MATRIX !== 'undefined' && OFFICIAL_CLASS_MATRIX[clsKey]) || (typeof CLASS_CATALOG_CONFIG !== 'undefined' && CLASS_CATALOG_CONFIG[clsKey]) || { title: clsKey.toUpperCase() };

      currentKatalogImageData = {
        clsKey,
        dataUrl,
        canvas,
        title: `Rincian Biaya ${cfg.title}`,
        fileName: `Rincian_Biaya_${clsKey.toUpperCase()}_YTPAI.jpeg`
      };

      img.src = dataUrl;
      if (titleEl) {
        titleEl.textContent = `Gambar HD: ${cfg.title} (Matriks Resmi)`;
      }

      modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'flex';
      if (typeof lucide !== 'undefined') lucide.createIcons();

      if (typeof showToast === 'function') {
        showToast('🖼️ Gambar HD Siap', `Pratinjau rincian biaya ${cfg.title} berkualitas tinggi (JPEG HD).`, 'success');
      }
    }

    function closeCatalogImageModal() {
      const modal = document.getElementById('modalKatalogImagePreview');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    function downloadCurrentKatalogImage() {
      if (!currentKatalogImageData) return;
      const { dataUrl, fileName } = currentKatalogImageData;
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName || 'Rincian_Biaya_YTPAI.jpeg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      if (typeof soundSuccess === 'function') soundSuccess();
      if (typeof showToast === 'function') {
        showToast('📥 Gambar HD Berhasil Diunduh', `File ${fileName} tersimpan dengan kualitas jernih (JPEG HD).`, 'success');
      }
    }

    async function shareCurrentKatalogImage() {
      if (!currentKatalogImageData) return;
      const { canvas, fileName, clsKey, title } = currentKatalogImageData;

      try {
        if (canvas.toBlob && navigator.canShare) {
          canvas.toBlob(async (blob) => {
            if (!blob) {
              downloadCurrentKatalogImage();
              return;
            }
            const file = new File([blob], fileName, { type: 'image/jpeg' });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: title || 'Rincian Biaya Pendidikan YTPAI',
                text: `Berikut rincian resmi ${title} Pondok Pesantren & Madrasah YTPAI Raudlatul Muta'allimin Babat Lamongan:`,
                files: [file]
              });
              if (typeof showToast === 'function') {
                showToast('📤 Berhasil Dibagikan', 'Gambar HD siap dikirim via WhatsApp.', 'success');
              }
              return;
            } else {
              downloadCurrentKatalogImage();
            }
          }, 'image/jpeg', 0.95);
        } else {
          downloadCurrentKatalogImage();
        }
      } catch (err) {
        console.warn('Share image error / cancelled:', err);
        downloadCurrentKatalogImage();
      }
    }

    function copyCurrentKatalogWaText() {
      if (!currentKatalogImageData) return;
      copyClassSummary(currentKatalogImageData.clsKey);
    }

    // =========================================================================
    // HD JPEG RECEIPT GENERATOR FOR VOICE SMART BILLING
    // =========================================================================
    function generateVoiceBillingCanvas(d) {
      if (!d) return null;
      const canvas = document.createElement('canvas');
      const width = 1200;
      const height = 1420;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // 1. Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Radial Glow
      const gradBg = ctx.createRadialGradient(width / 2, 200, 50, width / 2, 200, 700);
      gradBg.addColorStop(0, 'rgba(30, 41, 59, 0.85)');
      gradBg.addColorStop(1, 'rgba(9, 13, 22, 1)');
      ctx.fillStyle = gradBg;
      ctx.fillRect(0, 0, width, height);

      // 2. Header
      const headGrad = ctx.createLinearGradient(40, 40, width - 40, 220);
      headGrad.addColorStop(0, '#c2410c');
      headGrad.addColorStop(0.5, '#ea580c');
      headGrad.addColorStop(1, '#059669');
      drawRoundedBox(ctx, 40, 40, width - 80, 180, 26, headGrad, 'rgba(255, 255, 255, 0.25)', 2);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('YAYASAN TARBIYATUL MUBTADI\'IN (YTPAI) • BABAT LAMONGAN', 80, 85);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('RINCIAN RESMI TAGIHAN AWAL SANTRI', 80, 126);

      ctx.fillStyle = '#fef08a';
      ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`Santri: ${d.jenjang} ${d.genderLabel} • Kelas ${d.kelas} (${d.tipeLabel})`, 80, 168);

      // Status Pill
      const statusPill = d.statusSantri.toUpperCase();
      ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
      const pillW = ctx.measureText(statusPill).width + 36;
      drawRoundedBox(ctx, width - 80 - pillW, 70, pillW, 44, 22, '#ffffff', 'transparent');
      ctx.fillStyle = '#ea580c';
      ctx.textAlign = 'center';
      ctx.fillText(statusPill, width - 80 - (pillW / 2), 99);

      let currentY = 250;

      // Profile Row
      const colW = (width - 80 - 36) / 4;
      const profileData = [
        { label: 'Jenjang Pendidikan', val: d.jenjang, color: '#fb923c' },
        { label: 'Jenis Kelamin', val: d.genderLabel, color: '#818cf8' },
        { label: 'Tingkat Kelas', val: `Kelas ${d.kelas}`, color: '#fbbf24' },
        { label: 'Kategori Santri', val: d.tipeLabel, color: '#34d399' }
      ];

      for (let i = 0; i < profileData.length; i++) {
        const p = profileData[i];
        const pX = 40 + (i * (colW + 12));
        drawRoundedBox(ctx, pX, currentY, colW, 95, 18, '#111827', '#334155', 1.5);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#94a3b8';
        ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(p.label, pX + (colW / 2), currentY + 34);

        ctx.fillStyle = p.color;
        ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(p.val, pX + (colW / 2), currentY + 70);
      }

      currentY += 125;

      // Itemized Table
      drawRoundedBox(ctx, 40, currentY, width - 80, 480, 24, '#111827', '#334155', 1.5);

      // Table Header
      drawRoundedBox(ctx, 40, currentY, width - 80, 56, [24, 24, 0, 0], '#1e293b', 'transparent');
      ctx.textAlign = 'left';
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('KOMPONEN POS BIAYA', 75, currentY + 36);

      ctx.textAlign = 'right';
      ctx.fillText('NOMINAL TAGIHAN', width - 75, currentY + 36);

      const items = [
        { name: '1. Biaya Awal Tahun / Pendaftaran Masuk', desc: 'Pedoman administrasi pendaftaran santri baru / pindahan', val: d.rateAwal },
        { name: `2. Paket Seragam Sekolah (${d.jenjang} ${d.genderLabel})`, desc: 'Atasan, bawahan/rok, kerudung/kopyah, kaos OR & atribut', val: d.rateSergSek },
        { name: `3. Paket Seragam Pesantren (${d.genderLabel})`, desc: d.tipe === 'mbajak' ? 'Bebas seragam pondok (Santri Non-Mukim / Mbajak)' : 'Seragam khas pesantren santri mukim & perlengkapan', val: d.rateSergPond },
        { name: `4. SPP / Syahriyah Bulanan (${d.bulanMasuk})`, desc: `Iuran pendidikan bulan pendaftaran aktif (${d.bulanMasuk})`, val: d.rateSpp }
      ];

      let rowY = currentY + 56;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        if (i % 2 === 1) {
          ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
          ctx.fillRect(41, rowY, width - 82, 80);
        }

        ctx.textAlign = 'left';
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(it.name, 75, rowY + 34);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(it.desc, 75, rowY + 62);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#f8fafc';
        ctx.font = '800 24px "Plus Jakarta Sans", monospace';
        ctx.fillText('Rp ' + it.val.toLocaleString('id-ID'), width - 75, rowY + 48);

        rowY += 80;
      }

      // Grand Total Highlight Banner
      drawRoundedBox(ctx, 41, rowY, width - 82, 104, [0, 0, 24, 24], '#1e1b4b', '#4338ca', 2);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#a5b4fc';
      ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('TOTAL TAGIHAN AWAL SANTRI', 75, rowY + 42);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Siap dibayarkan melalui Virtual Account BRIVA resmi', 75, rowY + 74);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#38bdf8';
      ctx.font = '900 42px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Rp ' + d.total.toLocaleString('id-ID'), width - 75, rowY + 65);

      currentY += 510;

      // BRIVA Instruction Box
      drawRoundedBox(ctx, 40, currentY, width - 80, 110, 20, '#111827', '#059669', 1.5);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#34d399';
      ctx.font = '800 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('💳 SISTEM PEMBAYARAN ONLINE BRIVA (BANK BRI)', 70, currentY + 40);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Nomor registrasi santri digunakan sebagai kode pembayaran BRIVA resmi.', 70, currentY + 72);
      ctx.fillText('Pembayaran dapat dilakukan melalui BRImo, ATM BRI, Agen BRILink, atau Transfer Bank Lain.', 70, currentY + 95);

      currentY += 135;

      // Footer
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, currentY);
      ctx.lineTo(width - 40, currentY);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Bagian Administrasi & Keuangan YTPAI Raudlatul Muta\'allimin Babat Lamongan', 40, currentY + 30);

      ctx.textAlign = 'right';
      const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      ctx.fillText(`Partner Fatih Voice Engine • Dokumen Resmi HD • ${todayStr}`, width - 40, currentY + 30);

      return canvas;
    }

    function downloadVoiceBillingCardImage() {
      if (!currentVoiceBillingData) {
        if (typeof showToast === 'function') {
          showToast('Data Tidak Tersedia', 'Silakan hitung tagihan terlebih dahulu.', 'warning');
        }
        return;
      }
      const d = currentVoiceBillingData;
      const canvas = generateVoiceBillingCanvas(d);
      if (!canvas) return;

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      const fileName = `Tagihan_${d.statusSantri.replace(/\s+/g, '_')}_${d.jenjang}_${d.genderLabel}_Kelas_${d.kelas}.jpeg`;

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      if (typeof soundSuccess === 'function') soundSuccess();
      if (typeof showToast === 'function') {
        showToast('📥 Gambar HD Disimpan', `File JPEG HD tagihan ${d.jenjang} ${d.genderLabel} berhasil diunduh.`, 'success');
      }
    }

    function searchCatalogTables() {
      const q = (document.getElementById('catalogSearchInput')?.value || '').toLowerCase().trim();
      const clearBtn = document.getElementById('clearCatalogSearchBtn');
      if (clearBtn) {
        if (q.length > 0) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
      }

      // Search in Class View
      const classCards = document.querySelectorAll('.catalog-class-card');
      classCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!q) {
          // If no search query, restore class filter
          const cardCls = card.getAttribute('data-class') || '';
          if (currentCatalogClassFilter === 'all' || cardCls.includes(currentCatalogClassFilter)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
          card.classList.remove('ring-2', 'ring-orange-400');
        } else if (text.includes(q)) {
          card.style.display = '';
          card.classList.add('ring-2', 'ring-orange-400');
        } else {
          card.style.display = 'none';
          card.classList.remove('ring-2', 'ring-orange-400');
        }
      });

      // Search in Category View
      const rows = document.querySelectorAll('#catalogViewByCategory tbody tr, #catalogViewByCategory .space-y-2 > div');
      rows.forEach(tr => {
        const text = tr.textContent.toLowerCase();
        if (!q) {
          tr.style.display = '';
          tr.classList.remove('bg-yellow-100/70', 'ring-2', 'ring-yellow-300');
        } else if (text.includes(q)) {
          tr.style.display = '';
          tr.classList.add('bg-yellow-100/70', 'ring-2', 'ring-yellow-300');
        } else {
          tr.style.display = 'none';
          tr.classList.remove('bg-yellow-100/70', 'ring-2', 'ring-yellow-300');
        }
      });
    }

    // --- 11. CLEANER & TEXT ALIAS TOOL ---
    let cleanNumbers = [];

    function processCleanTool() {
      const input = document.getElementById('cleanInput').value;
      const lines = input.split('\n');
      
      modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
      const searchInput = document.getElementById('briCodeModalSearch');
      if (searchInput) {
        searchInput.value = '';
        renderBriCodeModalTable('');
        setTimeout(() => searchInput.focus(), 100);
      } else {
        renderBriCodeModalTable('');
      }
      if (window.lucide) lucide.createIcons();
    }

    function closeBriCodeModal() {
      const modal = document.getElementById('modalBriCodes');
      if (!modal) return;
      modal.classList.remove('opacity-100', 'pointer-events-auto');
      modal.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 200);
    }

    function renderBriCodeModalTable(query = '') {
      const tbody = document.getElementById('briCodeModalTableBody');
      if (!tbody) return;
      const q = (query || '').toLowerCase().trim();
      const clearBtn = document.getElementById('clearBriCodeModalSearchBtn');
      if (clearBtn) {
        if (q.length > 0) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
      }

      let filtered = BRI_OFFICIAL_BILL_IDS;
      if (q) {
        filtered = BRI_OFFICIAL_BILL_IDS.filter(item => 
          item.id.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q)
        );
      }

      const badge = document.getElementById('briCodeModalBadge');
      if (badge) badge.textContent = `${filtered.length} Kode`;

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="4" class="py-10 text-center text-slate-400">
              <i data-lucide="search-x" class="w-6 h-6 mx-auto mb-1 text-slate-300"></i>
              <p class="font-medium">Kode "${escapeHtml(q)}" tidak ditemukan</p>
            </td>
          </tr>
        `;
        if (window.lucide) lucide.createIcons();
        return;
      }

      const currentHeaderId = document.getElementById('brivaIdTagihan')?.value || '';

      tbody.innerHTML = filtered.map(item => {
        const isCurrent = (item.id === currentHeaderId);
        const highlightedId = highlightSearch(item.id, q);
        const highlightedName = highlightSearch(item.name, q);
        const highlightedDesc = highlightSearch(item.desc, q);

        let badgeColor = 'bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-sky-200 border-blue-300 dark:border-blue-700/80';
        if (item.id === '80' || item.id === '53') badgeColor = 'bg-rose-100 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700/80';
        else if (item.id === '48') badgeColor = 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/80';
        else if (item.id === '49') badgeColor = 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700/80';
        else if (item.id === '51' || item.id === '70' || item.id === '72') badgeColor = 'bg-purple-100 dark:bg-purple-950/70 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700/80';
        else if (item.id === '79') badgeColor = 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700/80';
        else if (item.id === '50') badgeColor = 'bg-sky-100 dark:bg-sky-950/70 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-700/80';
        else if (item.id === '52') badgeColor = 'bg-teal-100 dark:bg-teal-950/70 text-teal-900 dark:text-teal-200 border-teal-300 dark:border-teal-700/80';
        else if (item.id === '66' || item.id === '69' || item.id === '71') badgeColor = 'bg-orange-100 dark:bg-orange-950/70 text-orange-900 dark:text-orange-200 border-orange-300 dark:border-orange-700/80';

        const rowActiveClasses = isCurrent 
          ? 'bri-code-row-active bg-blue-100/90 dark:bg-blue-900/50 border-y border-blue-300 dark:border-blue-600/60 font-semibold' 
          : 'hover:bg-blue-50/50 dark:hover:bg-slate-900/60';

        const nameTextColor = isCurrent 
          ? 'text-blue-950 dark:text-sky-100 font-extrabold' 
          : 'text-slate-800 dark:text-slate-100';

        const descTextColor = isCurrent 
          ? 'text-blue-900/90 dark:text-sky-200/90 font-medium' 
          : 'text-slate-500 dark:text-slate-400';

        const mobileDescColor = isCurrent 
          ? 'text-blue-800/80 dark:text-sky-300/80 font-medium' 
          : 'text-slate-400 dark:text-slate-500';

        return `
          <tr class="${rowActiveClasses} transition-colors">
            <td class="py-2.5 px-3 text-center">
              <span class="inline-block px-2 py-0.5 rounded font-mono font-black text-xs border ${badgeColor}">
                ${highlightedId}
              </span>
            </td>
            <td class="py-2.5 px-3 font-semibold ${nameTextColor}">
              <div class="flex items-center gap-1.5">
                <span>${highlightedName}</span>
                ${isCurrent ? '<span class="text-[10px] bg-blue-600 text-white font-extrabold px-1.5 py-0.2 rounded-full shadow-xs">Aktif</span>' : ''}
              </div>
              <div class="text-[11px] ${mobileDescColor} font-normal sm:hidden mt-0.5">${highlightedDesc}</div>
            </td>
            <td class="py-2.5 px-3 ${descTextColor} hidden sm:table-cell">
              ${highlightedDesc}
            </td>
            <td class="py-2.5 px-3 text-right">
              <div class="flex items-center justify-end gap-1">
                <button 
                  type="button" 
                  onclick="selectBriCodeFromModal('${item.id}', '${escapeHtml(item.name)}')" 
                  class="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
                  title="Gunakan kode ${item.id} (${item.name}) pada Header KOLOM B"
                >
                  Pilih
                </button>
                <button 
                  type="button" 
                  onclick="copyToClipboard('${item.id}', 'Kode Disalin!', 'Kode BRI ${item.id} (${item.name}) disalin.')" 
                  class="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] transition-all cursor-pointer"
                  title="Salin kode ${item.id}"
                >
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();
    }

    function selectBriCodeFromModal(id, name) {
      const input = document.getElementById('brivaIdTagihan');
      if (input) {
        input.value = id;
        runBrivaGenerator();
      }
      closeBriCodeModal();
      soundSuccess();
      showToast(`Kode BRI ${id} Terpilih`, `${name} berhasil diset ke ID Tagihan Header.`);
    }

    // Escape key listener to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('modalBriCodes');
        if (modal && !modal.classList.contains('hidden')) {
          closeBriCodeModal();
        }
      }
    });

    // --- 14. WHATSAPP TEMPLATE & MEETING INVITATION ENGINE ---
    const WA_TEMPLATES = {
      santri_baru: {
