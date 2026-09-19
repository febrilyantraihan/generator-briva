// ============================================================================
// MODULE: tab_panggil.js
// Tab 4: Panggil Tagihan Cepat & Kalkulator Kwitansi Santri
// ============================================================================
let singleSelectedCategory = 'bulanan';
let singleCurrentFormat = 'safe';
      const status = document.getElementById('singleStatus').value;
      
      const withBulanan = document.getElementById('checkBulanan').checked;
      const withAwal = document.getElementById('checkAwalTahun').checked;
      const withAkhir = document.getElementById('checkAkhirTahun').checked;
      const withSeragamSekolah = document.getElementById('checkSeragamSekolah').checked;
      const withSeragamPondok = document.getElementById('checkSeragamPondok').checked;

      const vipWarn = document.getElementById('vipWarningText');
      if (status === 'vip' && gender === 'PA') {
        vipWarn.innerHTML = '<span class="text-amber-600 font-semibold">⚠️ Catatan: Status VIP di dokumen institusi khusus untuk Putri (PI).</span>';
      } else {
        vipWarn.innerHTML = '';
      }

      document.getElementById('receiptNama').textContent = nama.toUpperCase();
      const statusLabel = status === 'vip' ? 'Mukim VIP' : (status === 'reguler' ? 'Mukim Reguler' : 'Non-Mukim (Mbajak)');
      document.getElementById('receiptSub').textContent = `Kelas ${kelas} | ${gender === 'PA' ? 'Putra (PA)' : 'Putri (PI)'} | ${statusLabel}`;

      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      document.getElementById('receiptDate').textContent = `${now.getDate()}-${months[now.getMonth()]}-${now.getFullYear()}`;

      const itemsList = [];
      const criteria = { status: status, gender: gender };

      if (withBulanan) {
        const rateBulanan = calculateRate(kelas, 'bulanan', criteria);
        itemsList.push({ name: `Syahriyah Bulanan (Kelas ${kelas})`, amount: rateBulanan, color: 'text-blue-700' });
      }

      if (withAwal) {
        const rateAwal = calculateRate(kelas, 'awal_tahun', criteria);
        itemsList.push({ name: `Daftar Ulang Awal Tahun (Kelas ${kelas})`, amount: rateAwal, color: 'text-amber-700' });
      }

      if (withAkhir) {
        const rateAkhir = calculateRate(kelas, 'akhir_tahun', criteria);
        itemsList.push({ name: `Biaya Akhir Tahun / Haflah (Kelas ${kelas})`, amount: rateAkhir, color: 'text-emerald-700' });
      }

      if (withSeragamSekolah) {
        const rateSeragamSekolah = calculateRate(kelas, 'seragam_sekolah', criteria);
        itemsList.push({ name: `Paket Seragam Sekolah Baru (${gender})`, amount: rateSeragamSekolah, color: 'text-purple-700' });
      }

      if (withSeragamPondok) {
        const rateSeragamPondok = calculateRate(kelas, 'seragam_pondok', criteria);
        itemsList.push({ name: `Paket Seragam Pondok (${gender === 'PA' ? 'Baju Taqwa' : 'Jubah + Kerudung'})`, amount: rateSeragamPondok, color: 'text-purple-700' });
      }

      let receiptHtml = '';
      let grandTotal = 0;

      if (itemsList.length === 0) {
        receiptHtml = `<div class="text-slate-400 py-2 italic text-center">Tidak ada komponen biaya yang dicentang.</div>`;
      } else {
        itemsList.forEach(item => {
          grandTotal += item.amount;
          receiptHtml += `
            <div class="flex items-center justify-between gap-2">
              <span class="text-slate-600 truncate">${item.name}</span>
              <span class="font-bold ${item.color} flex-shrink-0">Rp ${item.amount.toLocaleString('id-ID')}</span>
            </div>
          `;
        });
      }

      document.getElementById('receiptItems').innerHTML = receiptHtml;
      document.getElementById('receiptTotalText').textContent = 'Rp ' + grandTotal.toLocaleString('id-ID');

      updateSingleNominalDisplay(kelas, criteria);
    }

    function switchSingleCategory(cat) {
      singleSelectedCategory = cat;
      const cats = ['bulanan', 'awal_tahun', 'akhir_tahun', 'bulanan_setahun'];
      cats.forEach(c => {
        const btn = document.getElementById({
          bulanan: 'btnCatBulanan',
          awal_tahun: 'btnCatAwal',
          akhir_tahun: 'btnCatAkhir',
          bulanan_setahun: 'btnCatSetahun'
        }[c]);
        if (c === cat) {
          btn.className = 'py-1.5 px-2 rounded-lg text-xs font-semibold bg-white/20 text-white text-center transition-all shadow-xs';
        } else {
          btn.className = 'py-1.5 px-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 text-center transition-all';
        }
      });

      const kelas = document.getElementById('singleKelas').value;
      const gender = document.querySelector('input[name="singleGender"]:checked').value;
      const status = document.getElementById('singleStatus').value;
      updateSingleNominalDisplay(kelas, { status, gender });
    }

    function setSingleFormat(format) {
      singleCurrentFormat = format;
      const formats = ['safe', 'comma', 'dot'];
      formats.forEach(f => {
        const btn = document.getElementById({
          safe: 'btnFormatSafe',
          comma: 'btnFormatComma',
          dot: 'btnFormatDot'
        }[f]);
        if (f === format) {
          btn.className = 'px-2 py-1 rounded bg-blue-600 text-white font-bold';
        } else {
          btn.className = 'px-2 py-1 rounded text-slate-300 hover:text-white';
        }
      });

      const kelas = document.getElementById('singleKelas').value;
      const gender = document.querySelector('input[name="singleGender"]:checked').value;
      const status = document.getElementById('singleStatus').value;
      updateSingleNominalDisplay(kelas, { status, gender });
    }

    function updateSingleNominalDisplay(kelas, criteria) {
      const rate = calculateRate(kelas, singleSelectedCategory, criteria);
      const formatted = formatNumberOutput(rate, singleCurrentFormat);
      document.getElementById('singleBigNominal').textContent = formatted;

      const labels = {
        bulanan: 'Bulanan',
        awal_tahun: 'Awal Tahun',
        akhir_tahun: 'Akhir Tahun',
        bulanan_setahun: 'Bulanan 1 Tahun'
      };
      document.getElementById('singleCategoryLabel').textContent = labels[singleSelectedCategory] || 'Nominal';

      const descLabels = {
        bulanan: `Syahriyah Per Bulan (Kelas ${kelas} - ${criteria.status.toUpperCase()})`,
        awal_tahun: `Daftar Ulang Awal Tahun (Kelas ${kelas} - ${criteria.status.toUpperCase()})`,
        akhir_tahun: `Biaya Akhir Tahun / Ujian (Kelas ${kelas})`,
        bulanan_setahun: `Syahriyah 12 Bulan Penuh (Kelas ${kelas} - ${criteria.status.toUpperCase()})`
      };
      document.getElementById('singleNominalDesc').textContent = descLabels[singleSelectedCategory];
    }

    function copySingleNominal() {
      const nominal = document.getElementById('singleBigNominal').textContent.trim();
      copyToClipboard(nominal, 'Nominal Disalin!', `Angka ${nominal} siap ditempel.`);
    }

    function copyFullReceiptText() {
      const nama = document.getElementById('receiptNama').textContent;
      const sub = document.getElementById('receiptSub').textContent;
      const total = document.getElementById('receiptTotalText').textContent;
      
      const itemRows = [];
      const itemEls = document.querySelectorAll('#receiptItems > div');
      itemEls.forEach(el => {
        if (el.children.length >= 2) {
          const label = el.children[0].textContent;
          const val = el.children[1].textContent;
          itemRows.push(`- ${label.padEnd(36, ' ')} : ${val}`);
        }
      });

      const fullText = [
        '========================================',
        '   KWITANSI TAGIHAN RESMI YTPAI LAMONGAN',
        '========================================',
        `Nama Siswa : ${nama}`,
        `Rincian    : ${sub}`,
        '----------------------------------------',
        ...itemRows,
        '----------------------------------------',
        `TOTAL TAGIHAN : ${total}`,
        '========================================'
      ].join('\n');

      copyToClipboard(fullText, 'Kwitansi Teks Disalin!', 'Rincian kwitansi siap dikirim via WhatsApp/Excel.');
    }

    function setSinglePreset(preset) {
      if (preset === 'vip') {
        document.getElementById('singleKelas').value = '10';
        document.querySelector('input[name="singleGender"][value="PI"]').checked = true;
        document.getElementById('singleStatus').value = 'vip';
      } else if (preset === 'reguler') {
        document.getElementById('singleKelas').value = '7';
        document.querySelector('input[name="singleGender"][value="PA"]').checked = true;
        document.getElementById('singleStatus').value = 'reguler';
      } else if (preset === 'mbajak') {
        document.getElementById('singleKelas').value = '12';
        document.getElementById('singleStatus').value = 'mbajak';
      }
      calculateSingleReceipt();
    }

    // --- 9. GENERATOR USERNAME & EMAIL LOGIC WITH DISTINCT ITEM COLORS ---
    function onNumberModeChange() {
      const mode = document.getElementById('accNumberMode').value;
      const wrapStatic = document.getElementById('wrapperStaticNumber');
      const wrapInc = document.getElementById('wrapperIncrementNumber');
