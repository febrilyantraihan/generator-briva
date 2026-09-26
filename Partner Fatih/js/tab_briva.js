// ============================================================================
// MODULE: tab_briva.js
// Tab 3: Generator Tagihan 5-Kolom Bank BRI (Bulanan, Seragam, Awal/Akhir Tahun)
// ============================================================================
let brivaSelectedMonths = ['09'];
let currentBrivaResults = [];
let brivaRowMode = 'split_full';
let brivaInputMode = 'mass';
let brivaManualSantriList = [];

// --- UNDO & REDO STATE HISTORY SYSTEM ---
let brivaUndoStack = [];
let brivaRedoStack = [];
let isBrivaHistoryLocked = false;
const BRIVA_MAX_HISTORY = 35;

function captureBrivaStateSnapshot(actionLabel = 'Perubahan Tagihan') {
  return {
    label: actionLabel,
    timestamp: Date.now(),
    inputMode: brivaInputMode || 'mass',
    rowMode: brivaRowMode || 'split_full',
    selectedMonths: [...(brivaSelectedMonths || ['09'])],
    manualSantriList: JSON.parse(JSON.stringify(brivaManualSantriList || [])),
    massNumbers: document.getElementById('brivaInputNumbers')?.value || '',
    idTagihan: document.getElementById('brivaIdTagihan')?.value || '62',
    jumlahTagihan: document.getElementById('brivaJumlahTagihan')?.value || '',
    tglEfektif: document.getElementById('brivaTglEfektif')?.value || '',
    tglJatuhTempo: document.getElementById('brivaTglJatuhTempo')?.value || '',
    jenjang: document.getElementById('brivaDefaultJenjang')?.value || 'sltp',
    kelas: document.getElementById('brivaDefaultKelas')?.value || '7',
    status: document.getElementById('brivaDefaultStatus')?.value || 'reguler',
    gender: document.getElementById('brivaDefaultGender')?.value || 'PA',
    incAwal: document.getElementById('brivaIncAwal')?.checked ?? false,
    incSergSek: document.getElementById('brivaIncSergSek')?.checked ?? false,
    incSergPond: document.getElementById('brivaIncSergPond')?.checked ?? false,
    incAkhir: document.getElementById('brivaIncAkhir')?.checked ?? false,
    incBulanan: document.getElementById('brivaIncBulanan')?.checked ?? true
  };
}

function recordBrivaHistory(actionLabel = 'Ubah Data') {
  if (isBrivaHistoryLocked) return;
  const snapshot = captureBrivaStateSnapshot(actionLabel);
  
  if (brivaUndoStack.length > 0) {
    const last = brivaUndoStack[brivaUndoStack.length - 1];
    if (JSON.stringify(last.manualSantriList) === JSON.stringify(snapshot.manualSantriList) &&
        last.massNumbers === snapshot.massNumbers &&
        last.idTagihan === snapshot.idTagihan &&
        last.jumlahTagihan === snapshot.jumlahTagihan &&
        last.rowMode === snapshot.rowMode &&
        last.inputMode === snapshot.inputMode &&
        last.kelas === snapshot.kelas &&
        last.jenjang === snapshot.jenjang) {
      return;
    }
  }

  brivaUndoStack.push(snapshot);
  if (brivaUndoStack.length > BRIVA_MAX_HISTORY) {
    brivaUndoStack.shift();
  }
  brivaRedoStack = [];
  updateBrivaUndoRedoUI();
}

function restoreBrivaStateSnapshot(snapshot) {
  if (!snapshot) return;
  isBrivaHistoryLocked = true;

  try {
    brivaInputMode = snapshot.inputMode || 'mass';
    brivaRowMode = snapshot.rowMode || 'split_full';
    brivaSelectedMonths = [...(snapshot.selectedMonths || ['09'])];
    brivaManualSantriList = JSON.parse(JSON.stringify(snapshot.manualSantriList || []));

    const elNumbers = document.getElementById('brivaInputNumbers');
    if (elNumbers) elNumbers.value = snapshot.massNumbers || '';

    const elId = document.getElementById('brivaIdTagihan');
    if (elId) elId.value = snapshot.idTagihan || '62';

    const elJumlah = document.getElementById('brivaJumlahTagihan');
    if (elJumlah) elJumlah.value = snapshot.jumlahTagihan || '';

    const elTglEf = document.getElementById('brivaTglEfektif');
    if (elTglEf) elTglEf.value = snapshot.tglEfektif || '';

    const elTglTp = document.getElementById('brivaTglJatuhTempo');
    if (elTglTp) elTglTp.value = snapshot.tglJatuhTempo || '';

    const elJenjang = document.getElementById('brivaDefaultJenjang');
    if (elJenjang) elJenjang.value = snapshot.jenjang || 'sltp';

    const elKelas = document.getElementById('brivaDefaultKelas');
    if (elKelas) elKelas.value = snapshot.kelas || '7';

    const elStatus = document.getElementById('brivaDefaultStatus');
    if (elStatus) elStatus.value = snapshot.status || 'reguler';

    const elGender = document.getElementById('brivaDefaultGender');
    if (elGender) elGender.value = snapshot.gender || 'PA';

    const elIncAwal = document.getElementById('brivaIncAwal');
    if (elIncAwal) elIncAwal.checked = snapshot.incAwal ?? false;

    const elIncSergSek = document.getElementById('brivaIncSergSek');
    if (elIncSergSek) elIncSergSek.checked = snapshot.incSergSek ?? false;

    const elIncSergPond = document.getElementById('brivaIncSergPond');
    if (elIncSergPond) elIncSergPond.checked = snapshot.incSergPond ?? false;

    const elIncAkhir = document.getElementById('brivaIncAkhir');
    if (elIncAkhir) elIncAkhir.checked = snapshot.incAkhir ?? false;

    const elIncBulanan = document.getElementById('brivaIncBulanan');
    if (elIncBulanan) elIncBulanan.checked = snapshot.incBulanan ?? true;

    if (typeof setBrivaRowMode === 'function') {
      setBrivaRowMode(brivaRowMode);
    }
    if (typeof setBrivaInputMode === 'function') {
      setBrivaInputMode(brivaInputMode);
    }
    if (typeof renderManualSantriCards === 'function') {
      renderManualSantriCards();
    }
    if (typeof renderBrivaMonthPills === 'function') {
      renderBrivaMonthPills();
    }
    if (typeof runBrivaGenerator === 'function') {
      runBrivaGenerator();
    }
  } finally {
    isBrivaHistoryLocked = false;
  }
}

function brivaUndo() {
  if (brivaUndoStack.length <= 1) {
    if (typeof showToast === 'function') {
      showToast('Tidak Ada Riwayat Undo', 'Belum ada perubahan sebelumnya untuk dibatalkan.', 'info');
    }
    return;
  }

  const current = brivaUndoStack.pop();
  brivaRedoStack.push(current);

  const prev = brivaUndoStack[brivaUndoStack.length - 1];
  restoreBrivaStateSnapshot(prev);
  updateBrivaUndoRedoUI();

  if (typeof playTone === 'function') playTone(440, 0.08);
  if (typeof showToast === 'function') {
    showToast('↩️ Undo Berhasil', `Mengembalikan: "${prev.label || 'Sebelumnya'}"`, 'info');
  }
}

function brivaRedo() {
  if (brivaRedoStack.length === 0) {
    if (typeof showToast === 'function') {
      showToast('Tidak Ada Riwayat Redo', 'Semua perubahan terkini sudah diterapkan.', 'info');
    }
    return;
  }

  const next = brivaRedoStack.pop();
  brivaUndoStack.push(next);
  restoreBrivaStateSnapshot(next);
  updateBrivaUndoRedoUI();

  if (typeof playTone === 'function') playTone(580, 0.08);
  if (typeof showToast === 'function') {
    showToast('↪️ Redo Berhasil', `Menerapkan kembali: "${next.label || 'Perubahan'}"`, 'info');
  }
}

function updateBrivaUndoRedoUI() {
  const btnUndo = document.getElementById('btnBrivaUndo');
  const btnRedo = document.getElementById('btnBrivaRedo');

  if (btnUndo) {
    btnUndo.disabled = brivaUndoStack.length <= 1;
    btnUndo.title = brivaUndoStack.length > 1 ? `Undo (${brivaUndoStack.length - 1} langkah tersimpan - Ctrl+Z)` : 'Tidak ada riwayat undo';
  }
  if (btnRedo) {
    btnRedo.disabled = brivaRedoStack.length === 0;
    btnRedo.title = brivaRedoStack.length > 0 ? `Redo (${brivaRedoStack.length} langkah tersimpan - Ctrl+Y)` : 'Tidak ada riwayat redo';
  }
}

    // --- MODE SWITCHER: MASSAL (TEKS) VS SANTRI MANUAL (PER-BRIVA) ---
    function setBrivaInputMode(mode) {
      brivaInputMode = mode;
      
      const massBtn = document.getElementById('brivaInputModeBtn_mass');
      const manualBtn = document.getElementById('brivaInputModeBtn_manual');
      const massCont = document.getElementById('brivaMassalContainer');
      const manualCont = document.getElementById('brivaManualContainer');
      const massAct = document.getElementById('brivaMassalActions');
      const manualAct = document.getElementById('brivaManualActions');

      if (mode === 'mass') {
        if (massBtn) massBtn.className = 'px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-blue-900 dark:text-sky-300 font-bold shadow-2xs transition-all flex items-center gap-1 border border-slate-200/60 dark:border-slate-700';
        if (manualBtn) manualBtn.className = 'px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-all flex items-center gap-1.5';
        if (massCont) massCont.classList.remove('hidden');
        if (manualCont) manualCont.classList.add('hidden');
        if (massAct) massAct.classList.remove('hidden');
        if (manualAct) manualAct.classList.add('hidden');
      } else {
        if (massBtn) massBtn.className = 'px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-all flex items-center gap-1';
        if (manualBtn) manualBtn.className = 'px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-blue-900 dark:text-sky-300 font-bold shadow-2xs transition-all flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-700';
        if (massCont) massCont.classList.add('hidden');
        if (manualCont) manualCont.classList.remove('hidden');
        if (massAct) massAct.classList.add('hidden');
        if (manualAct) manualAct.classList.remove('hidden');

        if (brivaManualSantriList.length === 0) {
          loadSample3SantriManual();
        } else {
          renderManualSantriCards();
        }
      }

      if (window.lucide) lucide.createIcons();
      runBrivaGenerator();
    }

    function loadSample3SantriManual() {
      brivaManualSantriList = [
        {
          id: 'santri_1',
          brivaNo: '015660',
          label: 'Santri 1 (MTs Putra)',
          bills: [
            { billId: '48', title: 'Biaya Awal Tahun', amount: 410000, dateEf: '', dateTp: '' },
            { billId: '51', title: 'Seragam Sekolah', amount: 736000, dateEf: '', dateTp: '' },
            { billId: '79', title: 'Seragam Santri', amount: 90000, dateEf: '', dateTp: '' },
            { billId: '60', title: 'Syahriyah Juli', amount: 281000, dateEf: '01-07-2026', dateTp: '10-07-2026' }
          ]
        },
        {
          id: 'santri_2',
          brivaNo: '015661',
          label: 'Santri 2 (MTs Putri)',
          bills: [
            { billId: '48', title: 'Biaya Awal Tahun', amount: 410000, dateEf: '', dateTp: '' },
            { billId: '79', title: 'Seragam Santri', amount: 160000, dateEf: '', dateTp: '' },
            { billId: '73', title: 'Tas Almamater', amount: 120000, dateEf: '', dateTp: '' },
            { billId: '50', title: 'Tabungan Santri', amount: 200000, dateEf: '', dateTp: '' }
          ]
        },
        {
          id: 'santri_3',
          brivaNo: '015662',
          label: 'Santri 3 (MA Putra)',
          bills: [
            { billId: '48', title: 'Biaya Awal Tahun', amount: 420000, dateEf: '', dateTp: '' },
            { billId: '80', title: 'Bimbel', amount: 150000, dateEf: '', dateTp: '' },
            { billId: '52', title: 'LKS', amount: 50000, dateEf: '', dateTp: '' }
          ]
        }
      ];
      renderManualSantriCards();
      runBrivaGenerator();
      soundSuccess();
      showToast('Contoh 3 Santri Dimuat', '3 santri dengan nomor BRIVA dan jenis tagihan berbeda berhasil disiapkan.');
    }

    function addManualSantri(defaultNo = '', defaultLabel = '') {
      let suggestedNo = '015660';
      if (brivaManualSantriList.length > 0) {
        const last = brivaManualSantriList[brivaManualSantriList.length - 1].brivaNo || '';
        const num = parseInt(last.replace(/\D/g, ''), 10);
        if (!isNaN(num)) {
          suggestedNo = String(num + 1).padStart(last.length || 6, '0');
        }
      }
      const nextIdx = brivaManualSantriList.length + 1;
      brivaManualSantriList.push({
        id: 'santri_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        brivaNo: defaultNo || suggestedNo,
        label: defaultLabel || `Santri Baru ${nextIdx}`,
        bills: [
          { billId: '48', title: 'Biaya Awal Tahun', amount: 410000, dateEf: '', dateTp: '' },
          { billId: '51', title: 'Seragam Sekolah', amount: 736000, dateEf: '', dateTp: '' }
        ]
      });
      renderManualSantriCards();
      runBrivaGenerator();
      soundSuccess();
      showToast('Santri Ditambahkan', `Santri #${nextIdx} berhasil ditambahkan.`);
    }

    function removeManualSantri(santriIdx) {
      if (santriIdx >= 0 && santriIdx < brivaManualSantriList.length) {
        brivaManualSantriList.splice(santriIdx, 1);
        renderManualSantriCards();
        runBrivaGenerator();
        soundReset();
      }
    }

    function clearAllManualSantri() {
      if (brivaManualSantriList.length === 0) return;
      brivaManualSantriList = [];
      renderManualSantriCards();
      runBrivaGenerator();
      soundReset();
      showToast('Semua Santri Dikosongkan', 'Daftar santri manual telah dibersihkan.');
    }

    function updateSantriBrivaNo(santriIdx, value) {
      if (brivaManualSantriList[santriIdx]) {
        brivaManualSantriList[santriIdx].brivaNo = value;
        runBrivaGenerator();
      }
    }

    function updateSantriLabel(santriIdx, value) {
      if (brivaManualSantriList[santriIdx]) {
        brivaManualSantriList[santriIdx].label = value;
        runBrivaGenerator();
      }
    }

    function addBillToSantri(santriIdx, billId, customTitle = '', customAmount = null) {
      const santri = brivaManualSantriList[santriIdx];
      if (!santri) return;

      const master = BRI_OFFICIAL_BILL_IDS.find(x => x.id === billId);
      const title = customTitle || (master ? master.name : `Tagihan ${billId}`);

      let amount = customAmount;
      if (amount === null) {
        const defaultAmounts = {
          '48': 410000,
          '51': 736000,
          '79': 90000,
          '60': 281000,
          '61': 281000,
          '62': 281000,
          '73': 120000,
          '50': 100000,
          '80': 150000,
          '53': 150000,
          '52': 50000,
          '66': 200000,
          '69': 250000,
          '71': 300000,
          '74': 150000,
          '49': 325000
        };
        amount = defaultAmounts[billId] || 100000;
      }

      santri.bills.push({
        billId: billId,
        title: title,
        amount: amount,
        dateEf: '',
        dateTp: ''
      });

      renderManualSantriCards();
      runBrivaGenerator();
      soundSuccess();
    }

    function removeBillFromSantri(santriIdx, billIdx) {
      const santri = brivaManualSantriList[santriIdx];
      if (santri && santri.bills) {
        santri.bills.splice(billIdx, 1);
        renderManualSantriCards();
        runBrivaGenerator();
      }
    }

    function updateSantriBillType(santriIdx, billIdx, newId) {
      const santri = brivaManualSantriList[santriIdx];
      if (santri && santri.bills && santri.bills[billIdx]) {
        const master = BRI_OFFICIAL_BILL_IDS.find(x => x.id === newId);
        santri.bills[billIdx].billId = newId;
        if (master) santri.bills[billIdx].title = master.name;
        runBrivaGenerator();
      }
    }

    function updateSantriBillAmount(santriIdx, billIdx, value) {
      const santri = brivaManualSantriList[santriIdx];
      if (santri && santri.bills && santri.bills[billIdx]) {
        santri.bills[billIdx].amount = parseFloat(value) || 0;
        const subtotalEl = document.getElementById(`santriSubtotal_${santriIdx}`);
        if (subtotalEl) {
          const sum = santri.bills.reduce((acc, b) => acc + (parseFloat(b.amount) || 0), 0);
          subtotalEl.textContent = 'Rp ' + sum.toLocaleString('id-ID');
        }
        runBrivaGenerator();
      }
    }

    function renderManualSantriCards() {
      const container = document.getElementById('brivaManualCardsList');
      if (!container) return;

      const countBadge = document.getElementById('brivaManualTotalSantriBadge');
      if (countBadge) countBadge.textContent = `${brivaManualSantriList.length} Santri`;

      if (brivaManualSantriList.length === 0) {
        container.innerHTML = `
          <div class="py-12 text-center text-slate-400 font-sans border-2 border-dashed border-slate-200 rounded-xl p-4">
            <i data-lucide="user-x" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
            <p class="font-medium text-xs text-slate-600">Belum ada data santri manual</p>
            <p class="text-[11px] text-slate-400 mt-1">Klik <b>"+ Tambah Santri"</b> atau <b>"Contoh 3 Santri"</b> untuk memulai.</p>
            <button type="button" onclick="loadSample3SantriManual()" class="mt-3 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all">
              Muat Contoh 3 Santri
            </button>
          </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
      }

      const cardThemes = [
        { border: 'border-blue-300', bg: 'bg-blue-50/40', badge: 'bg-blue-600 text-white', accent: 'text-blue-900', lightBadge: 'bg-blue-100 text-blue-800' },
        { border: 'border-emerald-300', bg: 'bg-emerald-50/40', badge: 'bg-emerald-600 text-white', accent: 'text-emerald-900', lightBadge: 'bg-emerald-100 text-emerald-800' },
        { border: 'border-purple-300', bg: 'bg-purple-50/40', badge: 'bg-purple-600 text-white', accent: 'text-purple-900', lightBadge: 'bg-purple-100 text-purple-800' },
        { border: 'border-amber-300', bg: 'bg-amber-50/40', badge: 'bg-amber-600 text-white', accent: 'text-amber-900', lightBadge: 'bg-amber-100 text-amber-800' },
        { border: 'border-rose-300', bg: 'bg-rose-50/40', badge: 'bg-rose-600 text-white', accent: 'text-rose-900', lightBadge: 'bg-rose-100 text-rose-800' },
        { border: 'border-cyan-300', bg: 'bg-cyan-50/40', badge: 'bg-cyan-600 text-white', accent: 'text-cyan-900', lightBadge: 'bg-cyan-100 text-cyan-800' }
      ];

      container.innerHTML = brivaManualSantriList.map((santri, sIdx) => {
        const theme = cardThemes[sIdx % cardThemes.length];
        const subtotal = santri.bills.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

        return `
          <div class="rounded-xl border-2 ${theme.border} ${theme.bg} p-2.5 sm:p-3 shadow-2xs space-y-2 transition-all">
            <!-- Header Santri: No BRIVA & Label -->
            <div class="flex items-center justify-between gap-1.5 flex-wrap">
              <div class="flex items-center gap-1.5 flex-1 min-w-[200px]">
                <span class="w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold ${theme.badge} flex-shrink-0">
                  ${sIdx + 1}
                </span>
                <div class="flex items-center gap-1">
                  <span class="text-[10px] font-bold text-slate-500 uppercase">BRIVA:</span>
                  <input 
                    type="text" 
                    value="${escapeHtml(santri.brivaNo)}" 
                    oninput="updateSantriBrivaNo(${sIdx}, this.value)" 
                    placeholder="015660" 
                    class="w-24 bg-white border border-slate-300 rounded px-1.5 py-0.5 font-mono font-black text-xs text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 outline-none shadow-2xs"
                    title="Nomor registrasi BRIVA untuk santri ini"
                  />
                </div>
                <input 
                  type="text" 
                  value="${escapeHtml(santri.label || '')}" 
                  oninput="updateSantriLabel(${sIdx}, this.value)" 
                  placeholder="Nama / Kelas (cth: Ahmad MTs PA)" 
                  class="flex-1 min-w-[110px] bg-white border border-slate-300 rounded px-1.5 py-0.5 text-xs text-slate-800 font-medium focus:border-blue-500 outline-none"
                  title="Nama atau keterangan santri"
                />
              </div>
              <div class="flex items-center gap-1">
                <button 
                  type="button" 
                  onclick="removeManualSantri(${sIdx})" 
                  class="w-6 h-6 rounded-md bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 flex items-center justify-center transition-colors"
                  title="Hapus santri ini"
                >
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>

            <!-- Quick Add Chips for this santri -->
            <div class="flex flex-wrap items-center gap-1 text-[10px] pt-1 border-t border-slate-200/60">
              <span class="text-slate-400 font-semibold mr-0.5">+ Tagihan:</span>
              <button type="button" onclick="addBillToSantri(${sIdx}, '48', 'Biaya Awal Tahun', 410000)" class="px-1.5 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold">48 Awal</button>
              <button type="button" onclick="addBillToSantri(${sIdx}, '51', 'Seragam Sekolah', 736000)" class="px-1.5 py-0.5 rounded bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 font-bold">51 Seragam</button>
              <button type="button" onclick="addBillToSantri(${sIdx}, '79', 'Seragam Santri', 90000)" class="px-1.5 py-0.5 rounded bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border border-indigo-300 font-bold">79 Santri</button>
              <button type="button" onclick="addBillToSantri(${sIdx}, '60', 'Syahriyah Juli', 281000)" class="px-1.5 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300 font-bold">60 Juli</button>
              <button type="button" onclick="addBillToSantri(${sIdx}, '73', 'Tas Almamater', 120000)" class="px-1.5 py-0.5 rounded bg-teal-100 hover:bg-teal-200 text-teal-900 border border-teal-300 font-bold">73 Tas</button>
              <button type="button" onclick="addBillToSantri(${sIdx}, '50', 'Tabungan Santri', 100000)" class="px-1.5 py-0.5 rounded bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 font-bold">50 Tabungan</button>
              <button type="button" onclick="addBillToSantri(${sIdx}, '80', 'Bimbel', 150000)" class="px-1.5 py-0.5 rounded bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 font-bold">80 Bimbel</button>
              <button type="button" onclick="addBillToSantri(${sIdx}, '52', 'LKS', 50000)" class="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold">52 LKS</button>
            </div>

            <!-- Bills List for this santri -->
            <div class="space-y-1 pt-0.5">
              ${santri.bills.map((bill, bIdx) => `
                <div class="flex items-center justify-between gap-1.5 bg-white/90 p-1.5 rounded-lg border border-slate-200 shadow-2xs">
                  <div class="flex items-center gap-1.5 flex-1 min-w-[140px]">
                    <span class="font-mono font-bold text-[10px] text-blue-900 bg-blue-100 px-1 py-0.2 rounded border border-blue-200 w-7 text-center flex-shrink-0">
                      ${escapeHtml(bill.billId)}
                    </span>
                    <select 
                      onchange="updateSantriBillType(${sIdx}, ${bIdx}, this.value)" 
                      class="flex-1 bg-transparent text-[11px] font-semibold text-slate-800 outline-none cursor-pointer"
                    >
                      ${BRI_OFFICIAL_BILL_IDS.map(opt => `
                        <option value="${opt.id}" ${opt.id === bill.billId ? 'selected' : ''}>
                          ${opt.id} - ${opt.name}
                        </option>
                      `).join('')}
                    </select>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-[10px] text-slate-400 font-mono font-bold">Rp</span>
                    <input 
                      type="number" 
                      value="${bill.amount}" 
                      step="5000" 
                      oninput="updateSantriBillAmount(${sIdx}, ${bIdx}, this.value)" 
                      class="w-20 text-right bg-slate-50 border border-slate-300 rounded px-1.5 py-0.5 font-mono font-bold text-slate-900 text-xs focus:bg-white focus:border-blue-500 outline-none"
                    />
                    <button 
                      type="button" 
                      onclick="removeBillFromSantri(${sIdx}, ${bIdx})" 
                      class="w-5 h-5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center text-sm font-bold transition-colors"
                      title="Hapus tagihan ini"
                    >
                      ×
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Footer: Subtotal Santri & Add Button -->
            <div class="pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <div class="flex items-center gap-1">
                <span class="text-[11px] text-slate-500">Subtotal:</span>
                <b id="santriSubtotal_${sIdx}" class="text-xs font-bold ${theme.accent}">Rp ${subtotal.toLocaleString('id-ID')}</b>
                <span class="text-[10px] text-slate-400">(${santri.bills.length} tagihan)</span>
              </div>
              <button 
                type="button" 
                onclick="addBillToSantri(${sIdx}, '48', 'Biaya Awal Tahun', 410000)" 
                class="text-[10px] text-blue-700 hover:text-blue-900 font-bold hover:underline"
              >
                + Tambah Tagihan
              </button>
            </div>
          </div>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();
    }

    // Exact sample from user's uploaded BRI screenshot (media_1789095704050.png)
    const BRI_SCREENSHOT_SAMPLES = [
      '015660',
      '015661',
      '015662',
      '015663',
      '015665',
      '015666',
      '015667',
      '015668',
      '015669',
      '015670',
      '015671',
      '015672',
      '015673',
      '015674',
      '015675',
      '015676',
      '015677'
    ];

    function handleBrivaExtraChange() {
      const sel = document.getElementById('brivaExtraType');
      if (!sel) return;
      const parts = sel.value.split('|');
      const id = parts[0];
      const defaultAmt = parts[2];
      const idInput = document.getElementById('brivaIdExtra');
      const nomInput = document.getElementById('brivaNominalExtra');
      if (idInput && id) idInput.value = id;
      if (nomInput && defaultAmt) nomInput.value = defaultAmt;
      runBrivaGenerator();
    }


    // =========================================================================
    // MOBILE MAXIMIZATION & PHONE ERGONOMICS ENGINE
    // =========================================================================

    // Haptic vibration feedback for mobile taps
    function triggerHaptic(duration = 12) {
      try {
        if (navigator.vibrate) {
    }

    // Sticky Floating Action Bar for Phone Users
    function updateMobileStickyBar(type, countText, actionFnStr, actionLabel) {
      const bar = document.getElementById('mobileStickyActionBar');
      const titleEl = document.getElementById('mobileActionTitle');
      const subEl = document.getElementById('mobileActionSubtitle');
      const btnPrimary = document.getElementById('mobileActionBtnPrimary');
      const btnText = document.getElementById('mobileActionBtnText');
      if (!bar) return;

      if (titleEl) titleEl.textContent = type === 'briva' ? 'BRIVA Siap Digunakan' : 'Data Siap Disalin';
      if (subEl) subEl.textContent = countText;
      if (btnText) btnText.textContent = actionLabel;
      if (btnPrimary) {
        btnPrimary.setAttribute('onclick', `${actionFnStr}; triggerHaptic(18);`);
      }

      bar.classList.add('show-bar');
      if (window.lucide) lucide.createIcons();
    }

    function hideMobileStickyBar() {
      const bar = document.getElementById('mobileStickyActionBar');
      if (bar) bar.classList.remove('show-bar');
    }

    function setBrivaRowMode(mode) {
      brivaRowMode = mode;
      
      const configs = {
        split_full: {
          active: 'flex-1 sm:flex-initial justify-center min-w-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-none font-bold transition-all bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap text-[11px] sm:text-xs',
          inactive: 'flex-1 sm:flex-initial justify-center min-w-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-none font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap text-[11px] sm:text-xs'
        },
        split_category: {
          active: 'flex-1 sm:flex-initial justify-center min-w-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-none font-bold transition-all bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap text-[11px] sm:text-xs',
          inactive: 'flex-1 sm:flex-initial justify-center min-w-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-none font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap text-[11px] sm:text-xs'
        },
        accumulate: {
          active: 'flex-1 sm:flex-initial justify-center min-w-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-none font-bold transition-all bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap text-[11px] sm:text-xs',
          inactive: 'flex-1 sm:flex-initial justify-center min-w-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-none font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap text-[11px] sm:text-xs'
        }
      };

      const btnFull = document.getElementById('brivaModeBtn_split_full');
      const btnCat = document.getElementById('brivaModeBtn_split_category');
      const btnAcc = document.getElementById('brivaModeBtn_accumulate');

      if (btnFull) btnFull.className = mode === 'split_full' ? configs.split_full.active : configs.split_full.inactive;
      if (btnCat) btnCat.className = mode === 'split_category' ? configs.split_category.active : configs.split_category.inactive;
      if (btnAcc) btnAcc.className = mode === 'accumulate' ? configs.accumulate.active : configs.accumulate.inactive;

      if (!isBrivaHistoryLocked) recordBrivaHistory('Ubah Mode Baris: ' + mode);
      runBrivaGenerator();
    }

    function renderBrivaMonthPills() {
      const container = document.getElementById('brivaMonthPillsContainer');
      if (!container) return;

      container.innerHTML = ACADEMIC_MONTHS.map(m => {
        const isSel = brivaSelectedMonths.includes(m.code);
        const cls = isSel 
          ? 'bg-blue-600 dark:bg-blue-600 text-white font-bold shadow-xs border-blue-600 dark:border-blue-400' 
          : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 border-slate-200 dark:border-slate-700/80';
        return `
          <button 
            type="button" 
            onclick="toggleBrivaMonth('${m.code}')" 
            class="flex items-center justify-between px-2 py-1 rounded-lg border text-[11px] transition-all cursor-pointer ${cls}"
            title="Klik untuk memilih/membatalkan bulan ${m.name} (Kode ID BRI: ${m.idTagihan})"
          >
            <span>${m.name.slice(0, 3)}</span>
            <span class="text-[10.5px] font-mono px-1 rounded ${isSel ? 'bg-blue-800 dark:bg-blue-950 text-blue-100 font-black' : 'bg-slate-100 dark:bg-slate-900/90 text-slate-600 dark:text-slate-200 font-bold border dark:border-slate-700/70'}">${m.idTagihan}</span>
          </button>
        `;
      }).join('');

      const badge = document.getElementById('brivaMonthCountBadge');
      if (badge) {
        badge.textContent = `${brivaSelectedMonths.length} Bulan Terpilih`;
        if (brivaSelectedMonths.length === 0) {
          badge.className = 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
        } else {
          badge.className = 'text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-xs';
        }
      }
    }

    function toggleBrivaMonth(code) {
      const idx = brivaSelectedMonths.indexOf(code);
      if (idx >= 0) {
        brivaSelectedMonths.splice(idx, 1);
      } else {
        brivaSelectedMonths.push(code);
        const orderMap = ACADEMIC_MONTHS.reduce((acc, cur, i) => { acc[cur.code] = i; return acc; }, {});
        brivaSelectedMonths.sort((a, b) => orderMap[a] - orderMap[b]);
      }
      renderBrivaMonthPills();
      runBrivaGenerator();
    }

    function setBrivaMonthPreset(preset) {
      if (preset === '1') {
        brivaSelectedMonths = ['09'];
      } else if (preset === 'triwulan') {
        brivaSelectedMonths = ['07', '08', '09'];
      } else if (preset === 'semester') {
        brivaSelectedMonths = ['07', '08', '09', '10', '11', '12'];
      } else if (preset === '12') {
        brivaSelectedMonths = ACADEMIC_MONTHS.map(m => m.code);
      } else if (preset === 'clear') {
        brivaSelectedMonths = [];
      }
      renderBrivaMonthPills();
      runBrivaGenerator();
    }

    function setBrivaIdPreset(code) {
      const input = document.getElementById('brivaIdTagihan');
      if (input) {
        input.value = code;
        runBrivaGenerator();
      }
    }

    function setBrivaQuickDate(efektif, tempo) {
      const efInput = document.getElementById('brivaTglEfektif');
      const tpInput = document.getElementById('brivaTglJatuhTempo');
      if (efInput) efInput.value = efektif;
      if (tpInput) tpInput.value = tempo;
      runBrivaGenerator();
    }

    function setBrivaCurrentMonthDate() {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      setBrivaQuickDate(`01-${mm}-${yyyy}`, `10-${mm}-${yyyy}`);
    }

    function setBrivaDueDateDay(day) {
      const tpInput = document.getElementById('brivaTglJatuhTempo');
      if (!tpInput) return;
      const parts = tpInput.value.split('-');
      if (parts.length === 3) {
        const dayStr = String(day).padStart(2, '0');
        tpInput.value = `${dayStr}-${parts[1]}-${parts[2]}`;
        runBrivaGenerator();
      }
    }

    function insertBrivaSample(showNotification = false) {
      const textarea = document.getElementById('brivaInput');
      if (textarea) textarea.value = BRI_SCREENSHOT_SAMPLES.join('\n');
      const idTagihan = document.getElementById('brivaIdTagihan');
      if (idTagihan) idTagihan.value = '62';
      const idBulanan = document.getElementById('brivaIdBulanan');
      if (idBulanan) idBulanan.value = 'auto';
      const idAwal = document.getElementById('brivaIdAwalTahun');
      if (idAwal) idAwal.value = '48';
      const idSergSek = document.getElementById('brivaIdSeragamSekolah');
      if (idSergSek) idSergSek.value = '51';
      const idSergPond = document.getElementById('brivaIdSeragamPondok');
      if (idSergPond) idSergPond.value = '79';
      const idAkhir = document.getElementById('brivaIdAkhirTahun');
      if (idAkhir) idAkhir.value = '49';
      const idBimbel = document.getElementById('brivaIdBimbel');
      if (idBimbel) idBimbel.value = '80';
      const idExtra = document.getElementById('brivaIdExtra');
      if (idExtra) idExtra.value = '52';

      const tglEfektif = document.getElementById('brivaTglEfektif');
      if (tglEfektif) tglEfektif.value = '01-09-2026';
      const tglJatuhTempo = document.getElementById('brivaTglJatuhTempo');
      if (tglJatuhTempo) tglJatuhTempo.value = '10-09-2026';
      const kelasDefault = document.getElementById('brivaKelasDefault');
      if (kelasDefault) kelasDefault.value = '7';
      const statusDefault = document.getElementById('brivaStatusDefault');
      if (statusDefault) statusDefault.value = 'reguler';
      const genderDefault = document.getElementById('brivaGenderDefault');
      if (genderDefault) genderDefault.value = 'PA';
      
      const chkBln = document.getElementById('brivaCheckBulanan');
      if (chkBln) chkBln.checked = true;
      const chkAw = document.getElementById('brivaCheckAwalTahun');
      if (chkAw) chkAw.checked = false;
      const chkSS = document.getElementById('brivaCheckSeragamSekolah');
      if (chkSS) chkSS.checked = false;
      const chkSP = document.getElementById('brivaCheckSeragamPondok');
      if (chkSP) chkSP.checked = false;
      const chkAk = document.getElementById('brivaCheckAkhirTahun');
      if (chkAk) chkAk.checked = false;
      const chkBimbel = document.getElementById('brivaCheckBimbel');
      if (chkBimbel) chkBimbel.checked = false;
      const chkExtra = document.getElementById('brivaCheckExtra');
      if (chkExtra) chkExtra.checked = false;

      brivaSelectedMonths = ['09'];
      renderBrivaMonthPills();
      runBrivaGenerator();
      if (showNotification) {
        showToast('Contoh Screenshot Dimuat', '17 No. Registrasi dari foto BRI berhasil dimuat.');
      }
    }

    function insertBrivaMultiStatusSample() {
      const textarea = document.getElementById('brivaInput');
      if (!textarea) return;
      textarea.value = [
        '015660 VIP',
        '015661 Reguler',
        '015662 Mbajak',
        '015663 Reguler PI',
        '015665 Kelas 8 Reguler',
        '015666 Kelas 10 VIP',
        '015667 Kelas 10 Mbajak'
      ].join('\n');
      runBrivaGenerator();
      showToast('Contoh Multi Status Dimuat', 'Data contoh dengan variasi status santri dimuat.');
    }

    function resetBrivaGenerator() {
      const idTagihan = document.getElementById('brivaIdTagihan');
      if (idTagihan) idTagihan.value = '62';
      const idBulanan = document.getElementById('brivaIdBulanan');
      if (idBulanan) idBulanan.value = 'auto';
      const idAwal = document.getElementById('brivaIdAwalTahun');
      if (idAwal) idAwal.value = '48';
      const idSergSek = document.getElementById('brivaIdSeragamSekolah');
      if (idSergSek) idSergSek.value = '51';
      const idSergPond = document.getElementById('brivaIdSeragamPondok');
      if (idSergPond) idSergPond.value = '79';
      const idAkhir = document.getElementById('brivaIdAkhirTahun');
      if (idAkhir) idAkhir.value = '49';
      const idBimbel = document.getElementById('brivaIdBimbel');
      if (idBimbel) idBimbel.value = '80';
      const idExtra = document.getElementById('brivaIdExtra');
      if (idExtra) idExtra.value = '52';

      const tglEfektif = document.getElementById('brivaTglEfektif');
      if (tglEfektif) tglEfektif.value = '01-09-2026';
      const tglJatuhTempo = document.getElementById('brivaTglJatuhTempo');
      if (tglJatuhTempo) tglJatuhTempo.value = '10-09-2026';
      const kelasDefault = document.getElementById('brivaKelasDefault');
      if (kelasDefault) kelasDefault.value = '7';
      const statusDefault = document.getElementById('brivaStatusDefault');
      if (statusDefault) statusDefault.value = 'reguler';
      const genderDefault = document.getElementById('brivaGenderDefault');
      if (genderDefault) genderDefault.value = 'PA';
      const formatSelect = document.getElementById('brivaFormatSelect');
      if (formatSelect) formatSelect.value = 'comma';
      const lockZero = document.getElementById('brivaLockLeadingZero');
      if (lockZero) lockZero.checked = true;

      const chkBln = document.getElementById('brivaCheckBulanan');
      if (chkBln) chkBln.checked = true;
      const chkAw = document.getElementById('brivaCheckAwalTahun');
      if (chkAw) chkAw.checked = false;
      const chkSS = document.getElementById('brivaCheckSeragamSekolah');
      if (chkSS) chkSS.checked = false;
      const chkSP = document.getElementById('brivaCheckSeragamPondok');
      if (chkSP) chkSP.checked = false;
      const chkAk = document.getElementById('brivaCheckAkhirTahun');
      if (chkAk) chkAk.checked = false;
      const chkBimbel = document.getElementById('brivaCheckBimbel');
      if (chkBimbel) chkBimbel.checked = false;
      const chkExtra = document.getElementById('brivaCheckExtra');
      if (chkExtra) chkExtra.checked = false;

      brivaSelectedMonths = ['09'];
      renderBrivaMonthPills();
      setBrivaRowMode('split_full');
      soundReset();
      showToast('Pengaturan Direset', 'Semua parameter BRIVA dikembalikan ke default resmi.');
    }

    function runBrivaGenerator() {
      const rawInput = document.getElementById('brivaInput')?.value || '';
      const lines = rawInput.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
      
      const lineCountEl = document.getElementById('brivaLineCount');
      if (lineCountEl) lineCountEl.textContent = `${lines.length} baris`;

      // Get active controls
      const idGlobal = (document.getElementById('brivaIdTagihan')?.value || '62').trim();
      const idBulanan = (document.getElementById('brivaIdBulanan')?.value || 'auto').trim();
      const idAwalTahun = (document.getElementById('brivaIdAwalTahun')?.value || '48').trim();
      const idSeragamSekolah = (document.getElementById('brivaIdSeragamSekolah')?.value || '51').trim();
      const idSeragamPondok = (document.getElementById('brivaIdSeragamPondok')?.value || '79').trim();
      const idAkhirTahun = (document.getElementById('brivaIdAkhirTahun')?.value || '49').trim();
      const idBimbel = (document.getElementById('brivaIdBimbel')?.value || '80').trim();
      const idExtra = (document.getElementById('brivaIdExtra')?.value || '52').trim();

      const nominalBimbel = parseFloat(document.getElementById('brivaNominalBimbel')?.value) || 150000;
      const nominalExtra = parseFloat(document.getElementById('brivaNominalExtra')?.value) || 50000;
      
      const extraTypeSel = document.getElementById('brivaExtraType');
      let extraTitle = 'Tagihan Tambahan';
      if (extraTypeSel) {
        const parts = extraTypeSel.value.split('|');
        if (parts.length >= 2) extraTitle = parts[1];
      }

      const tglEfektif = (document.getElementById('brivaTglEfektif')?.value || '01-09-2026').trim();
      const tglJatuhTempo = (document.getElementById('brivaTglJatuhTempo')?.value || '10-09-2026').trim();
      const formatMode = document.getElementById('brivaFormatSelect')?.value || 'comma';
      
      const defaultKelas = document.getElementById('brivaKelasDefault')?.value || '7';
      const defaultStatus = document.getElementById('brivaStatusDefault')?.value || 'reguler';
      const defaultGender = document.getElementById('brivaGenderDefault')?.value || 'PA';

      const incBulanan = document.getElementById('brivaCheckBulanan')?.checked ?? true;
      const incAwalTahun = document.getElementById('brivaCheckAwalTahun')?.checked ?? false;
      const incSeragamSekolah = document.getElementById('brivaCheckSeragamSekolah')?.checked ?? false;
      const incSeragamPondok = document.getElementById('brivaCheckSeragamPondok')?.checked ?? false;
      const incAkhirTahun = document.getElementById('brivaCheckAkhirTahun')?.checked ?? false;
      const incBimbel = document.getElementById('brivaCheckBimbel')?.checked ?? false;
      const incExtra = document.getElementById('brivaCheckExtra')?.checked ?? false;

      // Extract base year and due day
      let baseYear = '2026';
      let baseDueDay = '10';
      const partsEf = tglEfektif.split('-');
      if (partsEf.length === 3) baseYear = partsEf[2];
      const partsTp = tglJatuhTempo.split('-');
      if (partsTp.length === 3) baseDueDay = partsTp[0];

      // Update preview rates on the checkboxes
      const defJenjang = (defaultKelas === '7' || defaultKelas === '8' || defaultKelas === '9') ? 'sltp' : 'slta';
      const defGenderKey = defaultGender.toLowerCase() === 'pi' ? 'pi' : 'pa';
      
      const rateAwal = (PRICING_DB.awal_tahun[defaultKelas] && PRICING_DB.awal_tahun[defaultKelas][defaultStatus]) || 0;
      const rateSergSek = (PRICING_DB.seragam_sekolah[defJenjang] && PRICING_DB.seragam_sekolah[defJenjang][defGenderKey]) || 0;
      const rateSergPond = (PRICING_DB.seragam_pondok && PRICING_DB.seragam_pondok[defGenderKey]) || 0;
      const rateAkhir = (PRICING_DB.akhir_tahun[defaultKelas]) || 0;

      const elPrevAwal = document.getElementById('brivaPreviewAwalTahun');
      if (elPrevAwal) elPrevAwal.textContent = 'Rp ' + rateAwal.toLocaleString('id-ID');
      const elPrevSergSek = document.getElementById('brivaPreviewSeragamSekolah');
      if (elPrevSergSek) elPrevSergSek.textContent = 'Rp ' + rateSergSek.toLocaleString('id-ID');
      const elPrevSergPond = document.getElementById('brivaPreviewSeragamPondok');
      if (elPrevSergPond) elPrevSergPond.textContent = 'Rp ' + rateSergPond.toLocaleString('id-ID');
      const elPrevAkhir = document.getElementById('brivaPreviewAkhirTahun');
      if (elPrevAkhir) elPrevAkhir.textContent = 'Rp ' + rateAkhir.toLocaleString('id-ID');

      // Toggle month section visibility
      const monthSection = document.getElementById('brivaMonthSection');
      if (monthSection) {
        if (incBulanan) {
          monthSection.classList.remove('opacity-40', 'pointer-events-none');
        } else {
          monthSection.classList.add('opacity-40', 'pointer-events-none');
        }
      }

      // Calculate default single estimate
      let defaultSingleTotal = 0;
      if (incBulanan && brivaSelectedMonths.length > 0) {
        const rateBln = (PRICING_DB.bulanan[defaultKelas] && PRICING_DB.bulanan[defaultKelas][defaultStatus]) || 0;
        defaultSingleTotal += rateBln * brivaSelectedMonths.length;
      }
      if (incAwalTahun) defaultSingleTotal += rateAwal;
      if (incSeragamSekolah) defaultSingleTotal += rateSergSek;
      if (incSeragamPondok) defaultSingleTotal += rateSergPond;
      if (incAkhirTahun) defaultSingleTotal += rateAkhir;
      if (incBimbel) defaultSingleTotal += nominalBimbel;
      if (incExtra) defaultSingleTotal += nominalExtra;

      const estBadge = document.getElementById('brivaEstimatedBadge');
      if (estBadge) {
        estBadge.textContent = `Estimasi Default: Rp ${defaultSingleTotal.toLocaleString('id-ID')} / siswa`;
      }

      // Process rows
      currentBrivaResults = [];
      let totalNominal = 0;

      function formatNominal(num) {
        if (formatMode === 'comma') return num.toLocaleString('en-US');
        if (formatMode === 'safe') return "'" + num.toLocaleString('en-US');
        if (formatMode === 'dot') return num.toLocaleString('id-ID');
        
        brivaManualSantriList.forEach((santri, sIdx) => {
          let cleanNo = (santri.brivaNo || '').trim();
          if (!cleanNo) cleanNo = '000000';
          if (lockZero) {
            const rawDigits = cleanNo.replace(/^'+/, '').replace(/\D/g, '');
            if (rawDigits.length > 0) {
              const padded = rawDigits.length < 6 ? rawDigits.padStart(6, '0') : rawDigits;
              cleanNo = "'" + padded;
            }
          }

          const santriTheme = ITEM_THEMES[sIdx % ITEM_THEMES.length];
          const bills = santri.bills || [];

          if (bills.length === 0) {
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: cleanNo,
              idTagihan: '47',
              rawAmount: 0,
              jumlahFormatted: formatNominal(0),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: `Belum Ada Tagihan (${santri.label || 'Santri ' + (sIdx + 1)})`,
              componentBadge: 'bg-slate-100 text-slate-500 border-slate-200',
              studentClass: santri.label || 'Santri ' + (sIdx + 1),
              statusKey: 'Manual',
              studentGender: '-',
              rawLine: santri.brivaNo,
              santriTheme: santriTheme
            });
          } else {
            bills.forEach(b => {
              const bAmt = parseFloat(b.amount) || 0;
              const bId = (b.billId || '48').trim();
              const bEf = b.dateEf || tglEfektif;
              const bTp = b.dateTp || tglJatuhTempo;
              const bTitle = b.title || `Tagihan ID ${bId}`;

              currentBrivaResults.push({
                index: currentBrivaResults.length + 1,
                noRegistrasi: cleanNo,
                idTagihan: bId,
                rawAmount: bAmt,
                jumlahFormatted: formatNominal(bAmt),
                tglEfektif: bEf,
                tglJatuhTempo: bTp,
                componentTitle: `${bTitle} (${santri.label || 'Santri ' + (sIdx + 1)})`,
                componentBadge: santriTheme.numBadge,
                studentClass: santri.label || 'Santri ' + (sIdx + 1),
                statusKey: 'Manual',
                studentGender: '-',
                rawLine: santri.brivaNo,
                santriTheme: santriTheme
              });
              totalNominal += bAmt;
            });
          }
        });

        // Update Stats
        const count = currentBrivaResults.length;
        const elRows = document.getElementById('brivaTotalRows');
        if (elRows) elRows.textContent = count;
        const elStatCnt = document.getElementById('brivaStatCount');
        if (elStatCnt) elStatCnt.textContent = count;
        const elStatTot = document.getElementById('brivaStatTotal');
        if (elStatTot) elStatTot.textContent = 'Rp ' + totalNominal.toLocaleString('id-ID');
        const elSumBadge = document.getElementById('brivaSummaryBadge');
        if (elSumBadge) elSumBadge.textContent = 'Total: Rp ' + totalNominal.toLocaleString('id-ID');
        const elStatAvg = document.getElementById('brivaStatAverage');
        if (elStatAvg) elStatAvg.textContent = count > 0 ? 'Rp ' + Math.round(totalNominal / count).toLocaleString('id-ID') : 'Rp 0';

        renderBrivaTable();
        return;
      }

      const linesToProcess = lines.length > 0 ? lines : [''];

      linesToProcess.forEach((line) => {
        const tokens = line.split(/[\t,; ]+/).filter(t => t.length > 0);
        
        let noReg = '';
        let statusCriteria = null;
        let studentClass = defaultKelas;
        let studentGender = defaultGender;

        // Detect if line mentions class
        const classMatch = line.match(/\b(kelas|kls)?\s*([7-9]|1[0-2])\b/i);
        if (classMatch && classMatch[2]) {
          studentClass = classMatch[2];
        }

        // Detect status criteria
        statusCriteria = parseStatusCriteria(line);
        let statusKey = defaultStatus;
        if (statusCriteria) {
          statusKey = statusCriteria.status;
          if (statusCriteria.gender) studentGender = statusCriteria.gender;
        }

        // Locate numeric registration number token
        for (const tok of tokens) {
          if (/^\d{3,}$/.test(tok)) {
            noReg = tok;
            break;
          }
        }
        if (!noReg && tokens.length > 0) {
          noReg = tokens[0];
        }
        if (noReg && /^\d+$/.test(noReg) && noReg.length === 5) {
          noReg = '0' + noReg;
        }

        const jenjang = (studentClass === '7' || studentClass === '8' || studentClass === '9') ? 'sltp' : 'slta';
        const genderKey = studentGender.toLowerCase() === 'pi' ? 'pi' : 'pa';

        // ========================================================
        // MODE 1: PECACAHAN RINCI PENUH (split_full)
        // Satu nomor registrasi dijabarkan ke bawah per bulan & per komponen
        // ========================================================
        if (brivaRowMode === 'split_full') {
          // 1. Bulanan: 1 baris per bulan terpilih dengan ID resmi Bank BRI per bulan (54 s/d 65)
          if (incBulanan && brivaSelectedMonths.length > 0) {
            const rateBln = (PRICING_DB.bulanan[studentClass] && PRICING_DB.bulanan[studentClass][statusKey]) || 0;
            brivaSelectedMonths.forEach(code => {
              const mObj = ACADEMIC_MONTHS.find(m => m.code === code);
              const mName = mObj ? mObj.name : ('Bulan ' + code);
              let mYear = baseYear;
              const numCode = parseInt(code, 10);
              if (numCode >= 1 && numCode <= 6) {
                const numBaseYear = parseInt(baseYear, 10);
                if (!isNaN(numBaseYear)) mYear = String(numBaseYear + 1);
              }
              const rowEf = `01-${code}-${mYear}`;
              const rowTp = `${baseDueDay}-${code}-${mYear}`;

              // ID Tagihan otomatis per bulan (Jan=54 s/d Des=65), atau override manual jika user ketik nomor lain
              let rowId = (mObj && mObj.idTagihan) ? mObj.idTagihan : '62';
              if (idBulanan && idBulanan.toLowerCase() !== 'auto' && idBulanan !== '62') {
                rowId = idBulanan;
              }
              
              currentBrivaResults.push({
                index: currentBrivaResults.length + 1,
                noRegistrasi: noReg,
                idTagihan: rowId,
                rawAmount: rateBln,
                jumlahFormatted: formatNominal(rateBln),
                tglEfektif: rowEf,
                tglJatuhTempo: rowTp,
                componentTitle: `Syahriyah ${mName} ${mYear}`,
                componentBadge: 'bg-blue-100 text-blue-900 border-blue-300',
                studentClass: studentClass,
                statusKey: statusKey,
                studentGender: studentGender,
                rawLine: line
              });
              totalNominal += rateBln;
            });
          }

          // 2. Awal Tahun (ID Resmi: 48)
          if (incAwalTahun) {
            const rateAw = (PRICING_DB.awal_tahun[studentClass] && PRICING_DB.awal_tahun[studentClass][statusKey]) || 0;
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idAwalTahun,
              rawAmount: rateAw,
              jumlahFormatted: formatNominal(rateAw),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: 'Biaya Awal Tahun / Daftar Ulang',
              componentBadge: 'bg-amber-100 text-amber-900 border-amber-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += rateAw;
          }

          // 3. Seragam Sekolah (ID Resmi: 51 / 72)
          if (incSeragamSekolah) {
            const rateSS = (PRICING_DB.seragam_sekolah[jenjang] && PRICING_DB.seragam_sekolah[jenjang][genderKey]) || 0;
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idSeragamSekolah,
              rawAmount: rateSS,
              jumlahFormatted: formatNominal(rateSS),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: `Seragam Sekolah (${jenjang.toUpperCase()} ${studentGender})`,
              componentBadge: 'bg-purple-100 text-purple-900 border-purple-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += rateSS;
          }

          // 4. Seragam Santri / Pondok (ID Resmi: 79)
          if (incSeragamPondok) {
            const rateSP = (PRICING_DB.seragam_pondok && PRICING_DB.seragam_pondok[genderKey]) || 0;
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idSeragamPondok,
              rawAmount: rateSP,
              jumlahFormatted: formatNominal(rateSP),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: `Seragam Santri (${studentGender})`,
              componentBadge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += rateSP;
          }

          // 5. Akhir Tahun (ID Resmi: 49)
          if (incAkhirTahun) {
            const rateAT = (PRICING_DB.akhir_tahun[studentClass]) || 0;
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idAkhirTahun,
              rawAmount: rateAT,
              jumlahFormatted: formatNominal(rateAT),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: 'Biaya Akhir Tahun / Ujian & Wisuda',
              componentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += rateAT;
          }

          // 6. Bimbel (ID Resmi: 80 / 53)
          if (incBimbel) {
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idBimbel,
              rawAmount: nominalBimbel,
              jumlahFormatted: formatNominal(nominalBimbel),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: idBimbel === '53' ? 'Bimbel/UN' : 'Bimbel (Bimbingan Belajar)',
              componentBadge: 'bg-rose-100 text-rose-900 border-rose-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += nominalBimbel;
          }

          // 7. Tagihan Tambahan / Khusus (ID Resmi: 50, 52, 66, 69, 71, 73, 74, 75, 76, 78)
          if (incExtra) {
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idExtra,
              rawAmount: nominalExtra,
              jumlahFormatted: formatNominal(nominalExtra),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: extraTitle,
              componentBadge: 'bg-teal-100 text-teal-900 border-teal-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += nominalExtra;
          }

          // Fallback jika tidak ada komponen yang dipilih
          if (!incBulanan && !incAwalTahun && !incSeragamSekolah && !incSeragamPondok && !incAkhirTahun && !incBimbel && !incExtra) {
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idGlobal,
              rawAmount: 0,
              jumlahFormatted: formatNominal(0),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: 'Belum Ada Komponen Dipilih',
              componentBadge: 'bg-slate-100 text-slate-500 border-slate-200',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
          }
        }
        // ========================================================
        // MODE 2: PECAH KATEGORI (split_category)
        // Bulanan digabung jadi 1 baris, komponen lain tetap terpisah ke bawah
        // ========================================================
        else if (brivaRowMode === 'split_category') {
          if (incBulanan && brivaSelectedMonths.length > 0) {
            const rateBln = (PRICING_DB.bulanan[studentClass] && PRICING_DB.bulanan[studentClass][statusKey]) || 0;
            const subTotal = rateBln * brivaSelectedMonths.length;
            const monthNames = brivaSelectedMonths.map(code => {
              const found = ACADEMIC_MONTHS.find(m => m.code === code);
              return found ? found.name.slice(0, 3) : code;
            }).join(', ');

            const catBlnId = (idBulanan && idBulanan !== 'auto') ? idBulanan : '47';

            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: catBlnId,
              rawAmount: subTotal,
              jumlahFormatted: formatNominal(subTotal),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: `Biaya Pendidikan ${brivaSelectedMonths.length} Bln (${monthNames})`,
              componentBadge: 'bg-blue-100 text-blue-900 border-blue-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += subTotal;
          }

          if (incAwalTahun) {
            const rateAw = (PRICING_DB.awal_tahun[studentClass] && PRICING_DB.awal_tahun[studentClass][statusKey]) || 0;
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idAwalTahun,
              rawAmount: rateAw,
              jumlahFormatted: formatNominal(rateAw),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: 'Biaya Awal Tahun / Daftar Ulang',
              componentBadge: 'bg-amber-100 text-amber-900 border-amber-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += rateAw;
          }

          if (incSeragamSekolah) {
            const rateSS = (PRICING_DB.seragam_sekolah[jenjang] && PRICING_DB.seragam_sekolah[jenjang][genderKey]) || 0;
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idSeragamSekolah,
              rawAmount: rateSS,
              jumlahFormatted: formatNominal(rateSS),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: `Seragam Sekolah (${jenjang.toUpperCase()} ${studentGender})`,
              componentBadge: 'bg-purple-100 text-purple-900 border-purple-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += rateSS;
          }

          if (incSeragamPondok) {
            const rateSP = (PRICING_DB.seragam_pondok && PRICING_DB.seragam_pondok[genderKey]) || 0;
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idSeragamPondok,
              rawAmount: rateSP,
              jumlahFormatted: formatNominal(rateSP),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: `Seragam Santri (${studentGender})`,
              componentBadge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += rateSP;
          }

          if (incAkhirTahun) {
            const rateAT = (PRICING_DB.akhir_tahun[studentClass]) || 0;
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idAkhirTahun,
              rawAmount: rateAT,
              jumlahFormatted: formatNominal(rateAT),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: 'Biaya Akhir Tahun / Ujian & Wisuda',
              componentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += rateAT;
          }

          if (incBimbel) {
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idBimbel,
              rawAmount: nominalBimbel,
              jumlahFormatted: formatNominal(nominalBimbel),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: idBimbel === '53' ? 'Bimbel/UN' : 'Bimbel (Bimbingan Belajar)',
              componentBadge: 'bg-rose-100 text-rose-900 border-rose-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += nominalBimbel;
          }

          if (incExtra) {
            currentBrivaResults.push({
              index: currentBrivaResults.length + 1,
              noRegistrasi: noReg,
              idTagihan: idExtra,
              rawAmount: nominalExtra,
              jumlahFormatted: formatNominal(nominalExtra),
              tglEfektif: tglEfektif,
              tglJatuhTempo: tglJatuhTempo,
              componentTitle: extraTitle,
              componentBadge: 'bg-teal-100 text-teal-900 border-teal-300',
              studentClass: studentClass,
              statusKey: statusKey,
              studentGender: studentGender,
              rawLine: line
            });
            totalNominal += nominalExtra;
          }
        }
        // ========================================================
        // MODE 3: AKUMULASI 1 BARIS (accumulate)
        // Semua komponen digabung jadi 1 nominal tunggal per siswa
        // ========================================================
        else {
          let rowTotal = 0;
          const breakdowns = [];

          if (incBulanan && brivaSelectedMonths.length > 0) {
            const rateBln = (PRICING_DB.bulanan[studentClass] && PRICING_DB.bulanan[studentClass][statusKey]) || 0;
            const subTotal = rateBln * brivaSelectedMonths.length;
            rowTotal += subTotal;
            const monthNames = brivaSelectedMonths.map(code => {
              const found = ACADEMIC_MONTHS.find(m => m.code === code);
              return found ? found.name.slice(0, 3) : code;
            }).join(', ');
            breakdowns.push(`Syahriyah ${brivaSelectedMonths.length} bln (${monthNames})`);
          }

          if (incAwalTahun) {
            const rateAw = (PRICING_DB.awal_tahun[studentClass] && PRICING_DB.awal_tahun[studentClass][statusKey]) || 0;
            rowTotal += rateAw;
            breakdowns.push('Awal Tahun');
          }

          if (incSeragamSekolah) {
            const rateSS = (PRICING_DB.seragam_sekolah[jenjang] && PRICING_DB.seragam_sekolah[jenjang][genderKey]) || 0;
            rowTotal += rateSS;
            breakdowns.push('Seragam Sekolah');
          }

          if (incSeragamPondok) {
            const rateSP = (PRICING_DB.seragam_pondok && PRICING_DB.seragam_pondok[genderKey]) || 0;
            rowTotal += rateSP;
            breakdowns.push('Seragam Santri');
          }

          if (incAkhirTahun) {
            const rateAT = (PRICING_DB.akhir_tahun[studentClass]) || 0;
            rowTotal += rateAT;
            breakdowns.push('Akhir Tahun');
          }

          if (incBimbel) {
            rowTotal += nominalBimbel;
            breakdowns.push(idBimbel === '53' ? 'Bimbel/UN' : 'Bimbel');
          }

          if (incExtra) {
            rowTotal += nominalExtra;
            breakdowns.push(extraTitle);
          }

          totalNominal += rowTotal;

          currentBrivaResults.push({
            index: currentBrivaResults.length + 1,
            noRegistrasi: noReg,
            idTagihan: idGlobal,
            rawAmount: rowTotal,
            jumlahFormatted: formatNominal(rowTotal),
            tglEfektif: tglEfektif,
            tglJatuhTempo: tglJatuhTempo,
            componentTitle: breakdowns.length > 0 ? breakdowns.join(' + ') : 'Tagihan Akumulasi',
            componentBadge: 'bg-orange-100 text-orange-950 border-orange-300',
            studentClass: studentClass,
            statusKey: statusKey,
            studentGender: studentGender,
            rawLine: line
          });
        }
      });

      // Update Stats
      const count = currentBrivaResults.length;
      const elRows = document.getElementById('brivaTotalRows');
      if (elRows) elRows.textContent = count;
      const elStatCnt = document.getElementById('brivaStatCount');
      if (elStatCnt) elStatCnt.textContent = count;
      const elStatTot = document.getElementById('brivaStatTotal');
      if (elStatTot) elStatTot.textContent = 'Rp ' + totalNominal.toLocaleString('id-ID');
      const elSumBadge = document.getElementById('brivaSummaryBadge');
      if (elSumBadge) elSumBadge.textContent = 'Total: Rp ' + totalNominal.toLocaleString('id-ID');
      const elStatAvg = document.getElementById('brivaStatAverage');
      if (elStatAvg) elStatAvg.textContent = count > 0 ? 'Rp ' + Math.round(totalNominal / count).toLocaleString('id-ID') : 'Rp 0';

      renderBrivaTable();
    }

    function renderBrivaTable() {
      const tbody = document.getElementById('brivaTableBody');
      if (!tbody) return;

      const searchQuery = (document.getElementById('brivaTableSearch')?.value || '').toLowerCase().trim();
      const clearSearchBtn = document.getElementById('clearBrivaSearchBtn');
      if (clearSearchBtn) {
        if (searchQuery) clearSearchBtn.classList.remove('hidden');
        else clearSearchBtn.classList.add('hidden');
      }

      if (currentBrivaResults.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="7" class="py-16 text-center text-slate-400 font-sans">
              <i data-lucide="layers" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
              <p class="font-medium">Belum ada data nomor registrasi</p>
              <p class="text-[11px] text-slate-400 mt-1">Tempelkan nomor registrasi di kotak sebelah kiri atau klik <b>"Screenshot BRI"</b> untuk menguji data.</p>
            </td>
          </tr>
        `;
        const filterBadge = document.getElementById('brivaFilterCountBadge');
        if (filterBadge) filterBadge.textContent = '0 baris cocok';
        lucide.createIcons();
        return;
      }

      let filtered = currentBrivaResults;
      if (searchQuery) {
        filtered = currentBrivaResults.filter(r => {
          const matchNo = r.noRegistrasi.toLowerCase().includes(searchQuery);
          const matchId = r.idTagihan.toLowerCase().includes(searchQuery);
          const matchAmt = r.jumlahFormatted.toLowerCase().includes(searchQuery) || String(r.rawAmount).includes(searchQuery);
          const matchStatus = r.statusKey.toLowerCase().includes(searchQuery);
          const matchClass = r.studentClass.toLowerCase().includes(searchQuery);
          const matchComp = (r.componentTitle || '').toLowerCase().includes(searchQuery);
          return matchNo || matchId || matchAmt || matchStatus || matchClass || matchComp;
        });
      }

      const filterBadge = document.getElementById('brivaFilterCountBadge');
      if (filterBadge) {
        filterBadge.textContent = `${filtered.length} dari ${currentBrivaResults.length} baris`;
      }

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="7" class="py-12 text-center text-slate-400 font-sans">
              <i data-lucide="search-x" class="w-7 h-7 mx-auto mb-1.5 text-slate-300"></i>
              <p class="font-medium text-xs">Pencarian "${escapeHtml(searchQuery)}" tidak ditemukan</p>
              <button onclick="document.getElementById('brivaTableSearch').value = ''; renderBrivaTable();" class="text-xs text-orange-600 hover:underline mt-1 font-semibold">Reset Pencarian</button>
            </td>
          </tr>
        `;
        lucide.createIcons();
        return;
      }

      tbody.innerHTML = filtered.map((row, idx) => {
        const theme = row.santriTheme || ITEM_THEMES[idx % ITEM_THEMES.length];
        const highlightedNo = highlightSearch(row.noRegistrasi, searchQuery);
        const highlightedId = highlightSearch(row.idTagihan, searchQuery);
        const highlightedAmt = highlightSearch(row.jumlahFormatted, searchQuery);
        const highlightedComp = highlightSearch(row.componentTitle, searchQuery);

        return `
          <tr class="transition-colors ${theme.rowBg} ${theme.borderLeft}">
            <!-- # -->
            <td class="py-2.5 px-3 text-center">
              <span class="w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold ${theme.numBadge}">
                ${row.index}
              </span>
            </td>

            <!-- Kolom A: No. Registrasi (Langsung Editable / Manual) -->
            <td class="py-2.5 px-3">
              <div class="flex items-center gap-1">
                <input 
                  type="text" 
                  value="${escapeHtml(row.noRegistrasi || '')}" 
                  placeholder="Ketik No. Reg..." 
                  oninput="updateBrivaTableRowReg(${idx}, this.value)" 
                  class="w-24 sm:w-28 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-xs text-slate-900 dark:text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none placeholder:text-slate-400 shadow-2xs"
                  title="Ketik / ubah No. Registrasi langsung di sini"
                />
                <button 
                  type="button"
                  onclick="applyRegToAllRows('${row.noRegistrasi || ''}')" 
                  class="p-1 hover:bg-orange-100 dark:hover:bg-orange-950/80 text-slate-400 hover:text-orange-600 rounded transition-colors" 
                  title="Terapkan nomor ini ke seluruh baris tabel"
                >
                  <i data-lucide="chevrons-down" class="w-3.5 h-3.5"></i>
                </button>
                <button 
                  type="button"
                  onclick="copyToClipboard('${row.noRegistrasi || ''}', 'No. Registrasi Disalin', 'Nomor ${row.noRegistrasi || ''} siap ditempel.')" 
                  class="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition-colors" 
                  title="Salin No. Registrasi"
                >
                  <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </td>

            <!-- Kolom B: ID Tagihan -->
            <td class="py-2.5 px-3">
              <span class="tabular-nums font-bold text-slate-800 dark:text-sky-300 bg-slate-100 dark:bg-blue-950/70 px-2 py-0.5 rounded border border-slate-200 dark:border-blue-800/60">
                ${highlightedId}
              </span>
            </td>

            <!-- Kolom C: Jumlah -->
            <td class="py-2.5 px-3 text-right">
              <span class="tabular-nums font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/60">
                ${highlightedAmt}
              </span>
            </td>

            <!-- Kolom D: Tanggal Efektif -->
            <td class="py-2.5 px-3 text-center text-slate-700 dark:text-slate-300 tabular-nums text-[11px] font-semibold">
              ${row.tglEfektif}
            </td>

            <!-- Kolom E: Tanggal Jatuh Tempo -->
            <td class="py-2.5 px-3 text-center text-slate-700 dark:text-slate-300 tabular-nums text-[11px] font-semibold">
              ${row.tglJatuhTempo}
            </td>

            <!-- Jenis Tagihan / Komponen -->
            <td class="py-2.5 px-3 font-sans">
              <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border ${row.componentBadge}">
                ${highlightedComp}
              </span>
            </td>
          </tr>
        `;
      }).join('');

      // Render Mobile Ergonomic Cards View
      const cardsContainer = document.getElementById('brivaCardsContainer');
      if (cardsContainer) {
        cardsContainer.innerHTML = filtered.map((row, idx) => {
          const theme = row.santriTheme || ITEM_THEMES[idx % ITEM_THEMES.length];
          const highlightedId = highlightSearch(row.idTagihan, searchQuery);
          const highlightedAmt = highlightSearch(row.jumlahFormatted, searchQuery);
          const highlightedComp = highlightSearch(row.componentTitle, searchQuery);

          return `
            <div class="bg-white dark:bg-[#151e30] rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 dark:border-white/10 shadow-xs space-y-2 transition-all hover:border-orange-300">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold ${theme.numBadge} shrink-0">
                    ${row.index}
                  </span>
                  <input 
                    type="text" 
                    value="${escapeHtml(row.noRegistrasi || '')}" 
                    placeholder="No. Reg..." 
                    oninput="updateBrivaTableRowReg(${idx}, this.value)" 
                    class="w-28 sm:w-32 px-2 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded font-mono font-bold text-xs text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-orange-500 shadow-2xs"
                    title="Ketik / ubah No. Registrasi di sini"
                  />
                  <button type="button" onclick="applyRegToAllRows('${row.noRegistrasi || ''}')" class="text-slate-400 hover:text-orange-600 p-1 active:scale-90 transition-transform" title="Terapkan nomor ini ke semua baris">
                    <i data-lucide="chevrons-down" class="w-3.5 h-3.5"></i>
                  </button>
                  <button type="button" onclick="copyToClipboard('${row.noRegistrasi || ''}', 'No. Registrasi Disalin', 'Nomor ${row.noRegistrasi || ''} siap ditempel.')" class="text-slate-400 hover:text-orange-600 p-1 active:scale-90 transition-transform" title="Salin No. Registrasi">
                    <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    ID: ${highlightedId}
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-white/10">
                <div class="flex flex-col min-w-0">
                  <span class="text-[10px] text-slate-400 dark:text-slate-500 font-semibold truncate">${highlightedComp || 'Tagihan'}</span>
                  <span class="text-[11px] text-slate-600 dark:text-slate-300 font-mono font-medium">${row.tglEfektif} s/d ${row.tglJatuhTempo}</span>
                </div>
                <div class="text-right shrink-0">
                  <span class="text-[10.5px] text-slate-400 uppercase font-bold block">Nominal</span>
                  <span class="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 tabular-nums">${highlightedAmt}</span>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }

      // Switch Visibility between Table View and Cards View
      const tableWrapper = document.querySelector('#tab-briva table')?.parentElement;
      if (tableWrapper && cardsContainer) {
        if (brivaViewMode === 'cards') {
          tableWrapper.classList.add('hidden');
          cardsContainer.classList.remove('hidden');
        } else {
          tableWrapper.classList.remove('hidden');
          cardsContainer.classList.add('hidden');
        }
      }

      // Update View Switcher Buttons
      const btnCards = document.getElementById('btnBrivaViewCards');
      const btnTable = document.getElementById('btnBrivaViewTable');
      if (btnCards && btnTable) {
        if (brivaViewMode === 'cards') {
          btnCards.className = 'px-2.5 py-1 rounded-md font-bold transition-all bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs flex items-center gap-1 cursor-pointer';
          btnTable.className = 'px-2.5 py-1 rounded-md font-semibold transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-transparent flex items-center gap-1 cursor-pointer';
        } else {
          btnTable.className = 'px-2.5 py-1 rounded-md font-bold transition-all bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs flex items-center gap-1 cursor-pointer';
          btnCards.className = 'px-2.5 py-1 rounded-md font-semibold transition-all text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-transparent flex items-center gap-1 cursor-pointer';
        }
      }

      // Update Mobile Sticky Action Bar
      if (activeTab === 'briva') {
        if (currentBrivaResults.length > 0) {
          updateMobileStickyBar('briva', `${currentBrivaResults.length} baris BRIVA`, 'copyBriva5Columns()', 'Salin 5 Kolom');
        } else {
          hideMobileStickyBar();
        }
      }

      lucide.createIcons();
    }

    // =========================================================================
    // MANUAL REGISTRATION & INLINE 5-COLUMN TABLE HELPERS
    // =========================================================================
    function applyQuickBrivaReg() {
      const input = document.getElementById('quickBrivaRegInput');
      const val = (input?.value || '').trim();
      if (!val) {
        if (typeof showToast === 'function') {
          showToast('Masukkan Nomor Registrasi', 'Silakan ketik nomor registrasi (cth: 015660) terlebih dahulu.', 'warning');
        }
        return;
      }
      applyRegToAllRows(val);
      if (input) input.value = '';
    }

    function applyRegToAllRows(noReg) {
      if (!noReg) {
        const inputPrompt = prompt('Masukkan Nomor Registrasi untuk seluruh baris tagihan:', '015660');
        if (inputPrompt) noReg = inputPrompt.trim();
        else return;
      }
      
      let cleanNo = String(noReg).trim();
      const lockZero = document.getElementById('brivaLockLeadingZero')?.checked ?? true;
      if (lockZero && /^\d+$/.test(cleanNo) && cleanNo.length < 6) {
        cleanNo = cleanNo.padStart(6, '0');
      }

      currentBrivaResults.forEach(r => {
        r.noRegistrasi = cleanNo;
      });

      syncBrivaInputTextareaFromResults();
      renderBrivaTable();
      if (typeof recordBrivaHistory === 'function') {
        recordBrivaHistory(`Set No. Registrasi ${cleanNo}`);
      }
      if (typeof soundSuccess === 'function') soundSuccess();
      if (typeof showToast === 'function') {
        showToast('Nomor Berhasil Diterapkan!', `Nomor Registrasi ${cleanNo} diterapkan ke semua ${currentBrivaResults.length} baris 5 kolom BRI.`, 'success');
      }
    }

    function updateBrivaTableRowReg(rowIdx, newNoReg) {
      if (currentBrivaResults[rowIdx]) {
        currentBrivaResults[rowIdx].noRegistrasi = newNoReg;
        syncBrivaInputTextareaFromResults();
      }
    }

    function syncBrivaInputTextareaFromResults() {
      const textarea = document.getElementById('brivaInput');
      if (textarea && brivaInputMode === 'mass') {
        const uniqueRegs = [...new Set(currentBrivaResults.map(r => r.noRegistrasi).filter(Boolean))];
        if (uniqueRegs.length > 0) {
          textarea.value = uniqueRegs.join('\n');
        }
      }
    }

    function addSingleDraftBrivaRow() {
      const idx = currentBrivaResults.length + 1;
      const tglEf = document.getElementById('brivaTglEfektif')?.value || '01-09-2026';
      const tglTp = document.getElementById('brivaTglJatuhTempo')?.value || '10-09-2026';
      const idGlobal = document.getElementById('brivaIdTagihan')?.value || '62';
      
      let lastReg = '';
      if (currentBrivaResults.length > 0) {
        lastReg = currentBrivaResults[currentBrivaResults.length - 1].noRegistrasi || '';
      }

      currentBrivaResults.push({
        index: idx,
        noRegistrasi: lastReg,
        idTagihan: idGlobal,
        rawAmount: 281000,
        jumlahFormatted: formatNominal(281000),
        tglEfektif: tglEf,
        tglJatuhTempo: tglTp,
        componentTitle: `Tagihan Tambahan #${idx}`,
        componentBadge: 'bg-blue-100 text-blue-900 border-blue-300',
        studentClass: '7',
        statusKey: 'reguler',
        studentGender: 'PA',
        rawLine: lastReg
      });

      renderBrivaTable();
      if (typeof recordBrivaHistory === 'function') {
        recordBrivaHistory('Tambah Baris Tagihan');
      }
      if (typeof soundSuccess === 'function') soundSuccess();
      if (typeof showToast === 'function') {
        showToast('Baris Ditambahkan', `Baris #${idx} berhasil ditambahkan ke tabel 5 kolom.`, 'info');
      }
    }

    // Helper: Normalisasi format tanggal agar selalu DD-MM-YYYY dengan tanda strip (-)
    function normalizeDateWithHyphen(dateStr) {
      if (!dateStr) return '';
      let s = String(dateStr).trim().replace(/\//g, '-');
      const parts = s.split('-');
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          return `${parts[2].padStart(2, '0')}-${parts[1].padStart(2, '0')}-${parts[0]}`;
        }
        return `${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}-${parts[2]}`;
      }
      return s;
    }

    // Export to Excel with proper formatting
    function exportBrivaToExcel() {
      if (currentBrivaResults.length === 0) {
        showToast('Data Masih Kosong', 'Tempelkan daftar nomor registrasi terlebih dahulu.', true);
        return;
      }

      const lockZero = document.getElementById('brivaLockLeadingZero')?.checked ?? true;
      const header = ['No. Registrasi', 'ID Tagihan', 'Jumlah', 'Tanggal Efektif', 'Tanggal Jatuh Tempo'];
      const dataRows = [];

      currentBrivaResults.forEach(r => {
        let rawReg = String(r.noRegistrasi || '').trim().replace(/^'+/, '');
        if (lockZero && /^\d+$/.test(rawReg) && rawReg.length < 6) {
          rawReg = rawReg.padStart(6, '0');
        }

        const idTag = isNaN(Number(r.idTagihan)) ? String(r.idTagihan || '') : Number(r.idTagihan);
        const amount = Number(r.rawAmount) || 0;
        const tglEf = normalizeDateWithHyphen(r.tglEfektif);
        const tglTp = normalizeDateWithHyphen(r.tglJatuhTempo);

        dataRows.push({
          regNo: rawReg,
          idTag: idTag,
          amount: amount,
          tglEf: tglEf,
          tglTp: tglTp
        });
      });

      // 1. Prioritas Utama: Menggunakan pustaka SheetJS (XLSX) untuk menghasilkan file .xlsx asli
      if (typeof XLSX !== 'undefined') {
        try {
          const wsData = [header];
          dataRows.forEach(r => {
            wsData.push([r.regNo, r.idTag, r.amount, r.tglEf, r.tglTp]);
          });

          const ws = XLSX.utils.aoa_to_sheet(wsData);

          // Format tiap sel secara spesifik agar Microsoft Excel tidak merusak format
          for (let R = 1; R <= dataRows.length; R++) {
            const item = dataRows[R - 1];

            // Kolom A: No. Registrasi (wajib Text 's' agar awalan '0' tidak hilang)
            const cellA = XLSX.utils.encode_cell({ r: R, c: 0 });
            ws[cellA] = { t: 's', v: item.regNo, z: '@' };

            // Kolom B: ID Tagihan
            const cellB = XLSX.utils.encode_cell({ r: R, c: 1 });
            if (typeof item.idTag === 'number') {
              ws[cellB] = { t: 'n', v: item.idTag };
            } else {
              ws[cellB] = { t: 's', v: String(item.idTag), z: '@' };
            }

            // Kolom C: Jumlah (angka dengan format ribuan #,##0)
            const cellC = XLSX.utils.encode_cell({ r: R, c: 2 });
            ws[cellC] = { t: 'n', v: item.amount, z: '#,##0' };

            // Kolom D: Tanggal Efektif (wajib Text 's' berformat DD-MM-YYYY strip (-) agar tidak diubah Excel jadi slash)
            const cellD = XLSX.utils.encode_cell({ r: R, c: 3 });
            ws[cellD] = { t: 's', v: item.tglEf, z: '@' };

            // Kolom E: Tanggal Jatuh Tempo (wajib Text 's' berformat DD-MM-YYYY strip (-))
            const cellE = XLSX.utils.encode_cell({ r: R, c: 4 });
            ws[cellE] = { t: 's', v: item.tglTp, z: '@' };
          }

          // Lebar kolom rapi
          ws['!cols'] = [
            { wch: 18 }, // No. Registrasi
            { wch: 14 }, // ID Tagihan
            { wch: 16 }, // Jumlah
            { wch: 18 }, // Tanggal Efektif
            { wch: 20 }  // Tanggal Jatuh Tempo
          ];

          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Tagihan BRIVA');

          const tglFile = normalizeDateWithHyphen(document.getElementById('brivaTglEfektif')?.value || '2026');
          XLSX.writeFile(wb, `Tagihan_BRIVA_BRI_${tglFile}.xlsx`);

          soundSuccess();
          showToast('File Excel .xlsx Diunduh', `${dataRows.length} baris data berhasil diexport ke file Excel dengan tanggal format hyphen (-).`);
          return;
        } catch (err) {
          console.warn('SheetJS export error, falling back to XML Spreadsheet:', err);
        }
      }

      // 2. Fallback jika offline / CDN tidak tersedia: XML Spreadsheet (.xls)
      exportBrivaXmlFallback(dataRows);
    }

    // Fallback Export jika SheetJS (.xlsx) bermasalah di browser
    function exportBrivaXmlFallback(dataRows) {
      downloadBrivaCsv();
    }

    // Copy 5-Column Excel format: Kolom A \t Kolom B \t Kolom C \t Kolom D \t Kolom E
    async function copyBriva5Columns() {
      if (currentBrivaResults.length === 0) {
        showToast('Data Masih Kosong', 'Tempelkan daftar nomor registrasi terlebih dahulu.', true);
        return;
      }

      const lockZero = document.getElementById('brivaLockLeadingZero')?.checked ?? true;

      const rows = ['No. Registrasi\tID Tagihan\tJumlah\tTanggal Efektif\tTanggal Jatuh Tempo'];
      let htmlTable = `<table border="1" style="border-collapse:collapse;font-family:Calibri,sans-serif;font-size:11pt;">
<thead>
  <tr style="background-color:#F1F5F9;font-weight:bold;">
    <th>No. Registrasi</th>
    <th>ID Tagihan</th>
    <th>Jumlah</th>
    <th>Tanggal Efektif</th>
    <th>Tanggal Jatuh Tempo</th>
  </tr>
</thead>
<tbody>`;

      currentBrivaResults.forEach(r => {
        let rawReg = String(r.noRegistrasi || '').trim().replace(/^'+/, '');
        if (lockZero && /^\d+$/.test(rawReg) && rawReg.length < 6) {
          rawReg = rawReg.padStart(6, '0');
        }
        const plainReg = lockZero ? `'${rawReg}` : rawReg;
        const colB = r.idTagihan;
        const colC = r.jumlahFormatted;
        const rawAmt = Number(r.rawAmount) || 0;
        const colD = normalizeDateWithHyphen(r.tglEfektif);
        const colE = normalizeDateWithHyphen(r.tglJatuhTempo);

        rows.push(`${plainReg}\t${colB}\t${colC}\t${colD}\t${colE}`);

        htmlTable += `
  <tr>
    <td style="mso-number-format:'\\@'">${rawReg}</td>
    <td style="mso-number-format:'0'">${colB}</td>
    <td style="mso-number-format:'\\#\\,\\#\\#0'">${rawAmt}</td>
    <td style="mso-number-format:'\\@'">${colD}</td>
    <td style="mso-number-format:'\\@'">${colE}</td>
  </tr>`;
      });

      htmlTable += `
</tbody>
</table>`;

      const fullText = rows.join('\r\n');

      let copied = false;
      if (navigator.clipboard && window.ClipboardItem) {
        try {
          const blobText = new Blob([fullText], { type: 'text/plain' });
          const blobHtml = new Blob([htmlTable], { type: 'text/html' });
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/plain': blobText,
              'text/html': blobHtml
            })
          ]);
          copied = true;
        } catch (err) {
          console.warn('Rich clipboard paste failed, using text fallback:', err);
        }
      }

      if (!copied) {
        copied = await copyToClipboard(fullText, '5 Kolom Excel Disalin!', `${currentBrivaResults.length} baris siap ditempel langsung ke sel A1 pada Microsoft Excel.`);
      } else {
        soundSuccess();
        showToast('5 Kolom Excel Disalin!', `${currentBrivaResults.length} baris siap ditempel ke Microsoft Excel (format tanggal (-) terjaga).`);
      }

      if (copied) {
        const btn = document.getElementById('btnCopyBriva5');
        if (btn) {
          const origText = btn.innerHTML;
          btn.classList.remove('bg-white', 'text-slate-700');
          btn.classList.add('bg-blue-600', 'text-white');
          btn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i><span>Tersalin!</span>';
          lucide.createIcons();
          setTimeout(() => {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-white', 'text-slate-700');
            btn.innerHTML = origText;
            lucide.createIcons();
          }, 2000);
        }
      }
    }

    // Copy Kolom Jumlah Saja (Kolom C)
    async function copyBrivaAmountsOnly() {
      if (currentBrivaResults.length === 0) {
        showToast('Data Masih Kosong', 'Tempelkan daftar nomor registrasi terlebih dahulu.', true);
        return;
      }
      const rows = currentBrivaResults.map(r => r.jumlahFormatted);
      const text = rows.join('\r\n');
      await copyToClipboard(text, 'Kolom Jumlah Disalin!', `${rows.length} baris nominal siap ditempel ke Kolom C Excel.`);
    }

    // Download CSV for BRI CMS (dengan tanggal strip (-) terproteksi)
    function downloadBrivaCsv() {
      if (currentBrivaResults.length === 0) {
        showToast('Data Masih Kosong', 'Tempelkan daftar nomor registrasi terlebih dahulu.', true);
        return;
      }

      const lockZero = document.getElementById('brivaLockLeadingZero')?.checked ?? true;
      const csvRows = ['No. Registrasi,ID Tagihan,Jumlah,Tanggal Efektif,Tanggal Jatuh Tempo'];
      currentBrivaResults.forEach(r => {
        let rawReg = String(r.noRegistrasi || '').trim().replace(/^'+/, '');
        if (lockZero && /^\d+$/.test(rawReg) && rawReg.length < 6) {
          rawReg = rawReg.padStart(6, '0');
        }
        const regEsc = `="${rawReg}"`;
        const amtEsc = `"${r.jumlahFormatted}"`;
        const tglEf = `="${normalizeDateWithHyphen(r.tglEfektif)}"`;
        const tglTp = `="${normalizeDateWithHyphen(r.tglJatuhTempo)}"`;
        csvRows.push(`${regEsc},${r.idTagihan},${amtEsc},${tglEf},${tglTp}`);
      });

      const blob = new Blob([csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      const tglFile = normalizeDateWithHyphen(document.getElementById('brivaTglEfektif')?.value || '2026');
      link.download = `Tagihan_BRIVA_BRI_${tglFile}.csv`;
      link.click();
      soundSuccess();
      showToast('File CSV Diunduh', 'File CSV siap diimpor ke aplikasi BRI CMS atau Excel.');
    }

    // --- 13. GLOBAL SEARCH LOGIC ---
    const searchInput = document.getElementById('globalSearchInput');
    const clearSearch = document.getElementById('clearSearchBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (clearSearch) {
          if (q.length > 0) {
            clearSearch.classList.remove('hidden');
          } else {
            clearSearch.classList.add('hidden');
          }
        }

        // 1. Tab jump detection
        if (q.includes('briva') || q.includes('bri') || q.includes('tagihan massal')) {
          switchTab('briva');
        } else if (q.includes('bulanan') || q.includes('syahriyah')) {
          switchTab('katalog');
        } else if (q.includes('akun') || q.includes('email') || q.includes('user')) {
          switchTab('akun');
        } else if (q.includes('bersih') || q.includes('sum')) {
          switchTab('pembersih');
        } else if (q.includes('panduan') || q.includes('rumus')) {
          switchTab('panduan');
        } else if (q.includes('seragam')) {
          switchTab('katalog');
          filterCatalog('seragam');
        }

        // 2. Synchronize search with active tab table filter
        if (activeTab === 'briva') {
          const brivaSearch = document.getElementById('brivaTableSearch');
          if (brivaSearch) {
            brivaSearch.value = e.target.value;
            filterBrivaTable(e.target.value);
          }
        }
      });
    }

    // ============================================================================
    // VOICE ASSISTANT & SMART BILLING GENERATOR UNTUK TAB BRIVA
    // ============================================================================
    let brivaSpeechRecognitionInstance = null;
    let isBrivaVoiceListening = false;

    function handleBrivaVoiceKeydown(e, val) {
      if (e.key === 'Enter') {
        e.preventDefault();
        processBrivaVoiceSmartCommand(val);
      }
    }

    function toggleBrivaVoiceAssistant() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        if (typeof showToast === 'function') {
          showToast('Fitur Suara Tidak Didukung', 'Browser Anda belum mendukung Web Speech Recognition. Silakan gunakan Google Chrome di HP/Laptop.', 'warning');
        } else {
          alert('Browser ini belum mendukung Web Speech Recognition. Silakan gunakan Google Chrome.');
        }
        return;
      }

      if (isBrivaVoiceListening) {
        stopBrivaVoiceAssistant();
      } else {
        startBrivaVoiceAssistant(SpeechRecognition);
      }
    }

    function startBrivaVoiceAssistant(SpeechRecognition) {
      try {
        brivaSpeechRecognitionInstance = new SpeechRecognition();
        brivaSpeechRecognitionInstance.lang = 'id-ID';
        brivaSpeechRecognitionInstance.continuous = false;
        brivaSpeechRecognitionInstance.interimResults = true;

        const banner = document.getElementById('brivaVoiceListeningBanner');
        const liveTranscript = document.getElementById('brivaVoiceLiveTranscript');
        const btn = document.getElementById('btnBrivaVoiceAssistant');

        brivaSpeechRecognitionInstance.onstart = function() {
          isBrivaVoiceListening = true;
          if (btn) {
            btn.className = 'absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-none font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer transition-all border border-rose-400 animate-pulse ring-2 ring-rose-400';
          }
          if (banner) banner.classList.remove('hidden');
          if (liveTranscript) liveTranscript.textContent = 'Mendengarkan... Ucapkan cth: "Buat tagihan santri baru MA Putri kelas 11" atau "Set ID tagihan 62"...';
        };

        brivaSpeechRecognitionInstance.onresult = function(event) {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const activeText = finalTranscript || interimTranscript;
          if (liveTranscript && activeText) {
            liveTranscript.textContent = `🗣️ "${activeText}"`;
          }

          if (finalTranscript && finalTranscript.trim().length > 1) {
            processBrivaVoiceSmartCommand(finalTranscript.trim());
          }
        };

        brivaSpeechRecognitionInstance.onerror = function(event) {
          console.warn('BRIVA Speech recognition error:', event.error);
          stopBrivaVoiceAssistant();
        };

        brivaSpeechRecognitionInstance.onend = function() {
          stopBrivaVoiceAssistant();
        };

        brivaSpeechRecognitionInstance.start();
      } catch (err) {
        console.error('Failed to start briva speech recognition:', err);
        stopBrivaVoiceAssistant();
      }
    }

    function stopBrivaVoiceAssistant() {
      isBrivaVoiceListening = false;
      if (brivaSpeechRecognitionInstance) {
        try { brivaSpeechRecognitionInstance.stop(); } catch (e) {}
        brivaSpeechRecognitionInstance = null;
      }
      const banner = document.getElementById('brivaVoiceListeningBanner');
      const btn = document.getElementById('btnBrivaVoiceAssistant');
      if (btn) {
        btn.className = 'absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 active:scale-95 text-white rounded-none font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all border border-orange-300/30';
      }
      if (banner) banner.classList.add('hidden');
    }

    function processBrivaVoiceSmartCommand(rawText) {
      if (!rawText || !rawText.trim()) return false;
      const originalText = rawText.trim();
      const text = originalText.toLowerCase();

      const input = document.getElementById('brivaVoiceCommandInput');
      if (input) input.value = originalText;

      // 0. CEK PERINTAH UNDO & REDO
      if (/\b(undo|kembalikan|batal|batalkan)\b/i.test(text)) {
        brivaUndo();
        return true;
      } else if (/\b(redo|ulangi|kembali lagi)\b/i.test(text)) {
        brivaRedo();
        return true;
      }

      // 1. CEK PERINTAH MODE BARIS
      if (/\b(pecah rinci|split full|rinci)\b/i.test(text)) {
        setBrivaRowMode('split_full');
        if (typeof speakHumasAnswer === 'function') speakHumasAnswer('Mode baris diatur ke Pecah Rinci ke Bawah.');
        if (typeof showToast === 'function') showToast('Mode Baris BRIVA', 'Mode Pecah Rinci Aktif.', 'info');
        return true;
      } else if (/\b(pecah kategori|kategori)\b/i.test(text)) {
        setBrivaRowMode('split_category');
        if (typeof speakHumasAnswer === 'function') speakHumasAnswer('Mode baris diatur ke Pecah Kategori.');
        if (typeof showToast === 'function') showToast('Mode Baris BRIVA', 'Mode Pecah Kategori Aktif.', 'info');
        return true;
      } else if (/\b(1 baris|satu baris|akumulasi)\b/i.test(text)) {
        setBrivaRowMode('accumulate');
        if (typeof speakHumasAnswer === 'function') speakHumasAnswer('Mode baris diatur ke Akumulasi 1 Baris.');
        if (typeof showToast === 'function') showToast('Mode Baris BRIVA', 'Mode Akumulasi 1 Baris Aktif.', 'info');
        return true;
      }

      // 2. CEK PERINTAH SET ID TAGIHAN
      const matchId = text.match(/\b(?:set\s*id|id\s*tagihan|id)\s*(\d+)\b/i);
      if (matchId && matchId[1]) {
        const idInput = document.getElementById('brivaIdTagihan');
        if (idInput) {
          idInput.value = matchId[1];
          if (typeof speakHumasAnswer === 'function') speakHumasAnswer(`ID tagihan diatur ke ${matchId[1]}.`);
          if (typeof showToast === 'function') showToast('ID Tagihan Diubah', `ID Tagihan: ${matchId[1]}`, 'success');
          return true;
        }
      }

      // 3. CEK PERINTAH PEMBUATAN TAGIHAN SANTRI BARU / PINDAHAN / REGULER
      const isBillingRequest = /\b(buat tagihan|tagihan|biaya|hitung tagihan|tarif|buatkan tagihan|rincian tagihan|biaya masuk|pembayaran|pindah|pindahan|pindahak|santri baru|siswa baru)\b/i.test(text);
      if (isBillingRequest) {
        const brivaSearch = document.getElementById('brivaTableSearch');
        if (brivaSearch) brivaSearch.value = '';
        return generateVoiceSmartBilling(text, originalText);
      }

      // 4. CEK PERINTAH GENERATE / RESET
      if (/\b(proses|generate|buat sekarang|terbitkan)\b/i.test(text)) {
        const btnGen = document.getElementById('btnGenerateBriva');
        if (btnGen) btnGen.click();
        return true;
      } else if (/\b(reset)\b/i.test(text)) {
        resetBrivaGenerator();
        return true;
      }

      // 5. Fallback ke billing jika mengandung kata kelas atau jenjang
      if (/\b(ma|mts|smp|sma|kelas\s*\d+|\b\d+\s*ma|\b\d+\s*mts)\b/i.test(text)) {
        return generateVoiceSmartBilling(text, originalText);
      }

      // Default: Cari di tabel tagihan BRIVA hanya jika berupa nomor/keyword pendek
      const brivaSearch = document.getElementById('brivaTableSearch');
      if (brivaSearch) {
        brivaSearch.value = originalText;
        renderBrivaTable();
        if (typeof showToast === 'function') {
          showToast('🔍 Filter BRIVA', `Menyaring data "${originalText}"`, 'info');
        }
      }
      return true;
    }

    function handleBrivaTableSearchInput(val) {
      const trimmed = (val || '').trim();
      const isVoiceOrCmd = /\b(buat tagihan|tagihan|biaya|hitung tagihan|tarif|buatkan tagihan|rincian tagihan|biaya masuk|pembayaran|pindah|pindahan|pindahak)\b/i.test(trimmed);
      if (isVoiceOrCmd) {
        processBrivaVoiceSmartCommand(trimmed);
        const brivaSearch = document.getElementById('brivaTableSearch');
        if (brivaSearch) brivaSearch.value = '';
        renderBrivaTable();
        return;
      }
      renderBrivaTable();
    }

    // =========================================================================
    // VOICE SMART BILLING ENGINE & MUKIM / NON-MUKIM CONFIRMATION SYSTEM
    // =========================================================================
    let currentVoiceBillingData = null;
    let pendingVoiceBillingState = null;

    function openConfirmMukimModal(originalText, text) {
      pendingVoiceBillingState = { originalText, text };

      const modal = document.getElementById('modalConfirmMukimStatus');
      if (!modal) return;

      if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }

      const elParsed = document.getElementById('confirmMukimParsedCmd');
      if (elParsed) elParsed.textContent = `"${originalText}"`;

      modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'flex';
      if (typeof lucide !== 'undefined') lucide.createIcons();

      if (typeof speakHumasAnswer === 'function') {
        speakHumasAnswer('Mohon konfirmasi, apakah santri Mukim mondok atau Non-Mukim mbajak?');
      }
    }

    function closeConfirmMukimModal() {
      const modal = document.getElementById('modalConfirmMukimStatus');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
      pendingVoiceBillingState = null;
    }

    function selectMukimStatusChoice(chosenTipe) {
      const state = pendingVoiceBillingState;
      closeConfirmMukimModal();

      if (state) {
        generateVoiceSmartBilling(state.text, state.originalText, chosenTipe);
      }
    }

    function generateVoiceSmartBilling(text, originalText, explicitTipe = null) {
      if (typeof PRICING_DB === 'undefined') {
        console.warn('PRICING_DB is not loaded yet');
        return false;
      }

      // Pastikan search box bersih agar data tidak terfilter
      const brivaSearch = document.getElementById('brivaTableSearch');
      if (brivaSearch) brivaSearch.value = '';

      // 1. Parsing Jenjang & Level
      let jenjang = 'MA';
      let level = 'slta';
      if (/\b(mts|tsanawiyah)\b/i.test(text)) {
        jenjang = 'MTs';
        level = 'sltp';
      } else if (/\b(smp)\b/i.test(text)) {
        jenjang = 'SMP';
        level = 'sltp';
      } else if (/\b(sma)\b/i.test(text)) {
        jenjang = 'SMA';
        level = 'slta';
      } else if (/\b(ma|aliyah)\b/i.test(text)) {
        jenjang = 'MA';
        level = 'slta';
      } else if (/\b(mi|ibtidaiyah)\b/i.test(text)) {
        jenjang = 'MI';
        level = 'sltp';
      }

      // 2. Parsing Gender (Putri / Putra)
      const defaultGenderEl = document.getElementById('brivaGenderDefault') || document.getElementById('brivaDefaultGender');
      const activeDefaultGender = defaultGenderEl ? defaultGenderEl.value : 'PI';

      let gender = activeDefaultGender === 'PA' ? 'PA' : 'PI';
      let genderLabel = gender === 'PA' ? 'Putra' : 'Putri';
      let genderKey = gender.toLowerCase();

      if (/\b(putra|laki|pa|santriwan|ikhwan|cowok)\b/i.test(text)) {
        gender = 'PA';
        genderLabel = 'Putra';
        genderKey = 'pa';
      } else if (/\b(putri|perempuan|pi|santriwati|akhwat|cewek|siswi)\b/i.test(text)) {
        gender = 'PI';
        genderLabel = 'Putri';
        genderKey = 'pi';
      }

      // 3. Parsing Kelas
      let kelas = (jenjang === 'MA' || jenjang === 'SMA') ? '10' : '7';
      const matchKelas1 = text.match(/\bkelas\s*(\d+)\b/i);
      const matchKelas2 = text.match(/\b(10|11|12|7|8|9)\s*(?:ma|mts|smp|sma)?\b/i);
      if (matchKelas1 && matchKelas1[1]) {
        kelas = matchKelas1[1];
      } else if (matchKelas2 && matchKelas2[1]) {
        kelas = matchKelas2[1];
      }

      // Auto-adjust level from kelas
      if (['7', '8', '9'].includes(kelas)) {
        level = 'sltp';
        if (jenjang === 'MA' || jenjang === 'SMA') jenjang = 'MTs';
      } else if (['10', '11', '12'].includes(kelas)) {
        level = 'slta';
        if (jenjang === 'MTs' || jenjang === 'SMP') jenjang = 'MA';
      }

      // 4. Parsing Tipe Santri (Mukim Reguler, VIP, Non-Mukim / Mbajak) & KONFIRMASI JIKA TIDAK DISEBUTKAN
      let tipe = explicitTipe;
      let tipeLabel = 'Reguler';

      if (!tipe) {
        const hasNonMukim = /\b(non[- ]?mukim|mbajak|pulang[- ]?pergi|laju|tidak mondok)\b/i.test(text);
        const hasVip = /\b(vip)\b/i.test(text);
        const hasMukim = /\b(mukim|mondok|asrama|pesantren|nginap|menginap|reguler)\b/i.test(text);

        if (hasNonMukim) {
          tipe = 'mbajak';
        } else if (hasVip) {
          tipe = 'vip';
        } else if (hasMukim) {
          tipe = 'reguler';
        } else {
          // Tidak ada mukim / non-mukim di kalimat: Tampilkan dialog konfirmasi!
          openConfirmMukimModal(originalText, text);
          return true;
        }
      }

      if (tipe === 'vip') {
        tipeLabel = 'VIP';
      } else if (tipe === 'mbajak') {
        tipeLabel = 'Non-Mukim (Mbajak)';
      } else {
        tipe = 'reguler';
        tipeLabel = 'Mukim (Reguler)';
      }

      // 5. Parsing Status
      let statusSantri = 'Santri Baru (Pindahan)';
      if (/\b(pindahan|pindah|pindahak|mutasi)\b/i.test(text)) {
        statusSantri = 'Santri Pindahan';
      } else if (/\b(baru|santri baru|siswa baru)\b/i.test(text)) {
        statusSantri = 'Santri Baru';
      } else if (/\b(lama)\b/i.test(text)) {
        statusSantri = 'Siswa Lama';
      }

      // 6. Parsing Bulan Masuk
      let bulanMasuk = 'September';
      const monthMatches = [
        { name: 'Juli', regex: /\bjuli\b/i },
        { name: 'Agustus', regex: /\bagustus\b/i },
        { name: 'September', regex: /\bseptember\b/i },
        { name: 'Oktober', regex: /\boktober\b/i },
        { name: 'November', regex: /\bnovember\b/i },
        { name: 'Desember', regex: /\bdesember\b/i },
        { name: 'Januari', regex: /\bjanuari\b/i },
        { name: 'Februari', regex: /\bfebruari\b/i },
        { name: 'Maret', regex: /\bmaret\b/i },
        { name: 'April', regex: /\bapril\b/i },
        { name: 'Mei', regex: /\bmei\b/i },
        { name: 'Juni', regex: /\bjuni\b/i }
      ];
      for (const m of monthMatches) {
        if (m.regex.test(text)) {
          bulanMasuk = m.name;
          break;
        }
      }

      // Ambil data harga dari PRICING_DB
      const rateAwal = (PRICING_DB.awal_tahun && PRICING_DB.awal_tahun[kelas] && PRICING_DB.awal_tahun[kelas][tipe]) || 0;
      const rateSergSek = (PRICING_DB.seragam_sekolah && PRICING_DB.seragam_sekolah[level] && PRICING_DB.seragam_sekolah[level][genderKey]) || 0;
      const rateSergPond = tipe === 'mbajak' ? 0 : ((PRICING_DB.seragam_pondok && PRICING_DB.seragam_pondok[genderKey]) || 0);
      const rateSpp = (PRICING_DB.bulanan && PRICING_DB.bulanan[kelas] && PRICING_DB.bulanan[kelas][tipe]) || 0;
      const total = rateAwal + rateSergSek + rateSergPond + rateSpp;

      currentVoiceBillingData = {
        jenjang,
        level,
        gender,
        genderLabel,
        kelas,
        tipe,
        tipeLabel,
        statusSantri,
        bulanMasuk,
        rateAwal,
        rateSergSek,
        rateSergPond,
        rateSpp,
        total
      };

      // 1. GUNAKAN NOMOR REGISTRASI SEMENTARA '00000' YANG DAPAT DIUBAH PENGGUNA
      const brivaInputArea = document.getElementById('brivaInput');
      if (brivaInputArea) {
        brivaInputArea.value = '00000';
      }

      // 2. ATUR DROPDOWNS PARAMETER
      const elKelas = document.getElementById('brivaKelasDefault') || document.getElementById('brivaDefaultKelas');
      const elStatus = document.getElementById('brivaStatusDefault') || document.getElementById('brivaDefaultStatus');
      const elGender = document.getElementById('brivaGenderDefault') || document.getElementById('brivaDefaultGender');

      if (elKelas) elKelas.value = kelas;
      if (elStatus) elStatus.value = tipe;
      if (elGender) elGender.value = gender;

      // 3. CENTANG POS BIAYA SESUAI TIPE SANTRI (Non-Mukim tidak mencentang seragam pondok)
      const elIncAwal = document.getElementById('brivaCheckAwalTahun') || document.getElementById('brivaIncAwal');
      const elIncSergSek = document.getElementById('brivaCheckSeragamSekolah') || document.getElementById('brivaIncSergSek');
      const elIncSergPond = document.getElementById('brivaCheckSeragamPondok') || document.getElementById('brivaIncSergPond');
      const elIncBulanan = document.getElementById('brivaCheckBulanan') || document.getElementById('brivaIncBulanan');
      const elIncAkhir = document.getElementById('brivaCheckAkhirTahun') || document.getElementById('brivaIncAkhir');
      const elIncBimbel = document.getElementById('brivaCheckBimbel');
      const elIncExtra = document.getElementById('brivaCheckExtra');

      if (elIncAwal) elIncAwal.checked = true;
      if (elIncSergSek) elIncSergSek.checked = true;
      if (elIncSergPond) elIncSergPond.checked = (tipe !== 'mbajak');
      if (elIncBulanan) elIncBulanan.checked = true;
      if (elIncAkhir) elIncAkhir.checked = false;
      if (elIncBimbel) elIncBimbel.checked = false;
      if (elIncExtra) elIncExtra.checked = false;

      // 4. JALANKAN GENERATOR SEHINGGA TABEL 5-KOLOM BRIVA DI BAWAH LANGSUNG MUNCUL DENGAN NO 00000
      if (typeof recordBrivaHistory === 'function') {
        recordBrivaHistory(`Tagihan ${jenjang} ${genderLabel} Kelas ${kelas} (${tipeLabel})`);
      }
      if (typeof runBrivaGenerator === 'function') {
        runBrivaGenerator();
      }

      // 5. TAMPILKAN MODAL RINCIAN BIAYA & DRAF WHATSAPP
      showVoiceBillingResultModal(currentVoiceBillingData);

      const spokenAns = `Tagihan ${statusSantri} ${jenjang} ${genderLabel} Kelas ${kelas} ${tipeLabel} siap. Total tagihan Rp ${total.toLocaleString('id-ID')}. Data sementara nomor 00000 telah dimuat di tabel.`;
      if (typeof speakHumasAnswer === 'function') {
        speakHumasAnswer(spokenAns);
      }

      if (typeof showToast === 'function') {
        showToast(`💳 Tagihan ${jenjang} ${genderLabel} (${tipeLabel})`, `Total: Rp ${total.toLocaleString('id-ID')} • Data sementara 00000 siap di tabel (dapat Anda ubah).`, 'success');
      }
      return true;
    }

    function showVoiceBillingResultModal(d) {
      if (!d) return;

      const modal = document.getElementById('modalVoiceBillingResult');
      if (!modal) return;

      if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }

      const elTitle = document.getElementById('voiceBillingModalTitle');
      if (elTitle) elTitle.textContent = `Tagihan ${d.statusSantri} ${d.jenjang} ${d.genderLabel}`;

      const elSubtitle = document.getElementById('voiceBillingModalSubtitle');
      if (elSubtitle) elSubtitle.textContent = `Kelas ${d.kelas} (${d.tipeLabel}) • Bulan Masuk ${d.bulanMasuk}`;

      const elBadgeJenjang = document.getElementById('vbBadgeJenjang');
      if (elBadgeJenjang) elBadgeJenjang.textContent = d.jenjang;

      const elBadgeGender = document.getElementById('vbBadgeGender');
      if (elBadgeGender) elBadgeGender.textContent = d.genderLabel;

      const elBadgeKelas = document.getElementById('vbBadgeKelas');
      if (elBadgeKelas) elBadgeKelas.textContent = d.kelas;

      const elBadgeTipe = document.getElementById('vbBadgeTipe');
      if (elBadgeTipe) elBadgeTipe.textContent = d.tipeLabel;

      const elRateAwal = document.getElementById('vbRateAwal');
      if (elRateAwal) elRateAwal.textContent = 'Rp ' + d.rateAwal.toLocaleString('id-ID');

      const elLabelSergSek = document.getElementById('vbLabelSergSek');
      if (elLabelSergSek) elLabelSergSek.textContent = `2. Paket Seragam Sekolah (${d.jenjang} ${d.genderLabel})`;

      const elRateSergSek = document.getElementById('vbRateSergSek');
      if (elRateSergSek) elRateSergSek.textContent = 'Rp ' + d.rateSergSek.toLocaleString('id-ID');

      const elLabelSergPond = document.getElementById('vbLabelSergPond');
      if (elLabelSergPond) elLabelSergPond.textContent = `3. Paket Seragam Pondok (${d.genderLabel})`;

      const elRateSergPond = document.getElementById('vbRateSergPond');
      if (elRateSergPond) elRateSergPond.textContent = 'Rp ' + d.rateSergPond.toLocaleString('id-ID');

      const elLabelSpp = document.getElementById('vbLabelSpp');
      if (elLabelSpp) elLabelSpp.textContent = `4. SPP / Syahriah (Bulan ${d.bulanMasuk})`;

      const elSubSpp = document.getElementById('vbSubSpp');
      if (elSubSpp) elSubSpp.textContent = `SPP Kelas ${d.kelas} (${d.tipeLabel})`;

      const elRateSpp = document.getElementById('vbRateSpp');
      if (elRateSpp) elRateSpp.textContent = 'Rp ' + d.rateSpp.toLocaleString('id-ID');

      const elTotalGrand = document.getElementById('vbTotalGrand');
      if (elTotalGrand) elTotalGrand.textContent = 'Rp ' + d.total.toLocaleString('id-ID');

      const waText = generateVoiceBillingWaText(d);
      const waTextarea = document.getElementById('vbWaPreviewText');
      if (waTextarea) waTextarea.value = waText;

      modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      modal.style.display = 'flex';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function closeVoiceBillingModal() {
      const modal = document.getElementById('modalVoiceBillingResult');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    function generateVoiceBillingWaText(d) {
      if (!d) return '';
      return `Assalamu'alaikum Wr. Wb.

Yth. Wali Santri Baru / Pindahan
Pondok Pesantren Raudlatul Muta'allimin

Berikut adalah rincian tagihan pembayaran awal:
────────────────────
• Jenjang: ${d.jenjang} ${d.genderLabel}
• Kelas: ${d.kelas} (${d.tipeLabel})
• Status: ${d.statusSantri}
────────────────────
RINCIAN TAGIHAN:
1. Biaya Awal Tahun: Rp ${d.rateAwal.toLocaleString('id-ID')}
2. Seragam Sekolah (${d.jenjang} ${d.genderLabel}): Rp ${d.rateSergSek.toLocaleString('id-ID')}
3. Seragam Pondok (${d.genderLabel}): Rp ${d.rateSergPond.toLocaleString('id-ID')}
4. SPP Bulan ${d.bulanMasuk}: Rp ${d.rateSpp.toLocaleString('id-ID')}
────────────────────
TOTAL TAGIHAN: Rp ${d.total.toLocaleString('id-ID')}
────────────────────

Pembayaran dapat ditransfer melalui nomor Virtual Account (BRIVA) santri.
Terima kasih.
Wassalamu'alaikum Wr. Wb.`;
    }

    function copyVoiceBillingWaText() {
      if (!currentVoiceBillingData) return;
      const text = generateVoiceBillingWaText(currentVoiceBillingData);
      
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          if (typeof showToast === 'function') {
            showToast('📋 Rincian WA Disalin!', 'Rincian tagihan santri baru berhasil disalin ke clipboard.');
          }
        }).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }

      function fallbackCopy(str) {
        const helper = document.getElementById('hiddenClipboardHelper') || document.createElement('textarea');
        helper.value = str;
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        if (typeof showToast === 'function') {
          showToast('📋 Rincian WA Disalin!', 'Rincian tagihan santri baru berhasil disalin ke clipboard.');
        }
      }
    }

    function insertVoiceBillingToBrivaTable() {
      if (!currentVoiceBillingData) return;
      const d = currentVoiceBillingData;
      
      closeVoiceBillingModal();
      if (typeof switchTab === 'function') {
        switchTab('briva');
      }

      // Pastikan search box tabel bersih agar data langsung muncul
      const brivaSearch = document.getElementById('brivaTableSearch');
      if (brivaSearch) brivaSearch.value = '';

      // 1. Set dropdowns di tab BRIVA
      const elKelas = document.getElementById('brivaKelasDefault') || document.getElementById('brivaDefaultKelas');
      const elStatus = document.getElementById('brivaStatusDefault') || document.getElementById('brivaDefaultStatus');
      const elGender = document.getElementById('brivaGenderDefault') || document.getElementById('brivaDefaultGender');

      if (elKelas) elKelas.value = d.kelas;
      if (elStatus) elStatus.value = d.tipe;
      if (elGender) elGender.value = d.gender;

      // 2. Centang komponen pos biaya default (Awal Tahun, Seragam Sekolah, Seragam Pondok, Bulanan)
      const elIncAwal = document.getElementById('brivaCheckAwalTahun') || document.getElementById('brivaIncAwal');
      const elIncSergSek = document.getElementById('brivaCheckSeragamSekolah') || document.getElementById('brivaIncSergSek');
      const elIncSergPond = document.getElementById('brivaCheckSeragamPondok') || document.getElementById('brivaIncSergPond');
      const elIncBulanan = document.getElementById('brivaCheckBulanan') || document.getElementById('brivaIncBulanan');
      const elIncAkhir = document.getElementById('brivaCheckAkhirTahun') || document.getElementById('brivaIncAkhir');
      const elIncBimbel = document.getElementById('brivaCheckBimbel');
      const elIncExtra = document.getElementById('brivaCheckExtra');

      if (elIncAwal) elIncAwal.checked = true;
      if (elIncSergSek) elIncSergSek.checked = true;
      if (elIncSergPond) elIncSergPond.checked = true;
      if (elIncBulanan) elIncBulanan.checked = true;
      if (elIncAkhir) elIncAkhir.checked = false;
      if (elIncBimbel) elIncBimbel.checked = false;
      if (elIncExtra) elIncExtra.checked = false;

      // 3. Catat history & render
      if (typeof recordBrivaHistory === 'function') {
        recordBrivaHistory(`Tagihan ${d.jenjang} ${d.genderLabel} Kelas ${d.kelas}`);
      }
      if (typeof runBrivaGenerator === 'function') {
        runBrivaGenerator();
      }

      if (typeof soundSuccess === 'function') soundSuccess();
      if (typeof showToast === 'function') {
        showToast('💳 Parameter BRIVA Diterapkan!', `Tagihan ${d.jenjang} ${d.genderLabel} Kelas ${d.kelas} (Total: Rp ${d.total.toLocaleString('id-ID')}) siap diekspor ke BRI.`, 'success');
      }
    }

    // Attach to global window
    window.handleBrivaVoiceKeydown = handleBrivaVoiceKeydown;
    window.toggleBrivaVoiceAssistant = toggleBrivaVoiceAssistant;
    window.startBrivaVoiceAssistant = startBrivaVoiceAssistant;
    window.stopBrivaVoiceAssistant = stopBrivaVoiceAssistant;
    window.processBrivaVoiceSmartCommand = processBrivaVoiceSmartCommand;
    window.handleBrivaTableSearchInput = handleBrivaTableSearchInput;
    window.generateVoiceSmartBilling = generateVoiceSmartBilling;
    window.openConfirmMukimModal = openConfirmMukimModal;
    window.closeConfirmMukimModal = closeConfirmMukimModal;
    window.selectMukimStatusChoice = selectMukimStatusChoice;
    window.showVoiceBillingResultModal = showVoiceBillingResultModal;
    window.closeVoiceBillingModal = closeVoiceBillingModal;
    window.copyVoiceBillingWaText = copyVoiceBillingWaText;
    window.insertVoiceBillingToBrivaTable = insertVoiceBillingToBrivaTable;
    window.downloadVoiceBillingCardImage = downloadVoiceBillingCardImage;
    window.openCatalogImageModal = openCatalogImageModal;
    window.closeCatalogImageModal = closeCatalogImageModal;
    window.downloadCurrentKatalogImage = downloadCurrentKatalogImage;
    window.shareCurrentKatalogImage = shareCurrentKatalogImage;
    window.copyCurrentKatalogWaText = copyCurrentKatalogWaText;
    window.brivaUndo = brivaUndo;
    window.brivaRedo = brivaRedo;

    // KEYBOARD SHORTCUTS: Ctrl+Z (Undo) and Ctrl+Y / Ctrl+Shift+Z (Redo)
    window.addEventListener('keydown', function(e) {
      if (typeof activeTab !== 'undefined' && activeTab === 'briva') {
        const isInputFocused = document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA');
        if (!isInputFocused) {
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
            e.preventDefault();
            brivaUndo();
          } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
            e.preventDefault();
            brivaRedo();
          }
        }
      }
    });

    // Inisialisasi snapshot awal riwayat saat aplikasi siap
    setTimeout(() => {
      if (brivaUndoStack.length === 0) {
        recordBrivaHistory('Kondisi Awal');
      }
    }, 600);
