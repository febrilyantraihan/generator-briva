/**
 * =========================================================================
 * Google Apps Script Web App Controller: Partner Fatih Generator BRIVA & Keuangan
 * Institusi: Pondok Pesantren & Madrasah YTPAI Babat Lamongan
 * =========================================================================
 */

function doGet(e) {
  var output;
  try {
    // 1. Coba render sebagai Template Apps Script (mendukung <?!= include(...) ?> jika dipisah modular)
    output = HtmlService.createTemplateFromFile('index').evaluate();
  } catch (err) {
    try {
      // 2. Fallback jika berupa HTML murni / createHtmlOutputFromFile
      output = HtmlService.createHtmlOutputFromFile('index');
    } catch (e2) {
      try {
        output = HtmlService.createTemplateFromFile('Index').evaluate();
      } catch (e3) {
        try {
          output = HtmlService.createHtmlOutputFromFile('Index');
        } catch (e4) {
          return HtmlService.createHtmlOutput('<h3>Error: File index.html tidak ditemukan di Google Apps Script</h3>');
        }
      }
    }
  }
  
  return output
    .setTitle("Partner Fatih - Generator BRIVA & Sistem Keuangan YTPAI")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover')
    .setFaviconUrl('data:image/png;base64,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');
}

/**
 * Fungsi helper untuk menyertakan file HTML/CSS/JS (bebas sensitivitas huruf besar/kecil)
 * Mendukung StyleSheet / Stylesheet, Javascript / JavaScript, dsb.
 */
function include(filename) {
  if (!filename) return '';
  
  // Daftar variasi nama file yang mungkin dibuat oleh pengguna di Google Apps Script
  var candidates = [
    filename,
    filename.toLowerCase(),
    filename.toUpperCase()
  ];
  
  var lower = filename.toLowerCase();
  if (lower.indexOf('style') !== -1 || lower.indexOf('css') !== -1) {
    candidates.push('StyleSheet', 'Stylesheet', 'stylesheet', 'style', 'css');
  }
  if (lower.indexOf('script') !== -1 || lower.indexOf('js') !== -1) {
    candidates.push('Javascript', 'JavaScript', 'javascript', 'js');
  }
  if (lower.indexOf('index') !== -1) {
    candidates.push('Index', 'index');
  }
  
  for (var i = 0; i < candidates.length; i++) {
    try {
      var output = HtmlService.createHtmlOutputFromFile(candidates[i]);
      var content = output.getContent();
      if (content && content.trim().length > 0) {
        return content;
      }
    } catch (e) {
      // Lanjut coba kandidat nama file berikutnya
    }
  }
  
  return '<!-- WARNING: File ' + filename + ' tidak ditemukan di Google Apps Script -->';
}

/**
 * [OPSIONAL] Fungsi Server-side untuk integrasi Google Sheets di masa depan
 * Anda dapat memanggil fungsi ini dari Index.html menggunakan:
 * google.script.run.withSuccessHandler(...).simpanDataKeSheet(data)
 */
function simpanDataKeSheet(dataRows) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return { success: false, message: 'Tidak ada spreadsheet aktif terhubung.' };
    
    let sheet = ss.getSheetByName('Data_BRIVA');
    if (!sheet) {
      sheet = ss.insertSheet('Data_BRIVA');
      sheet.appendRow(['No. Registrasi', 'ID Tagihan', 'Jumlah', 'Tgl Efektif', 'Tgl Jatuh Tempo', 'Timestamp']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#e8f0fe');
    }
    
    const now = new Date();
    dataRows.forEach(row => {
      const cleanReg = String(row.noRegistrasi || '').replace(/^'+/, '');
      const tglEf = String(row.tglEfektif || '').replace(/\//g, '-');
      const tglTp = String(row.tglJatuhTempo || '').replace(/\//g, '-');
      sheet.appendRow([
        "'" + cleanReg,
        row.idTagihan,
        row.rawAmount,
        "'" + tglEf,
        "'" + tglTp,
        now
      ]);
    });
    
    return { success: true, count: dataRows.length };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

/**
 * =========================================================================
 * INTEGRASI GOOGLE SHEETS CLOUD: DATA TAHFIDZ & STATUS PAMFLET
 * Memungkinkan data santri & status pamflet diakses/disimpan dari perangkat mana saja
 * =========================================================================
 */

function getTahfidzSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) return null;
  
  let sheet = ss.getSheetByName('Data_Tahfidz_Master');
  if (!sheet) {
    sheet = ss.insertSheet('Data_Tahfidz_Master');
    sheet.appendRow([
      'ID Santri',
      'Nama Santri',
      'Unit',
      'Kelas',
      'Nama Ayah',
      'Nama Ibu',
      'Kategori',
      'Juz',
      'Gender',
      'Status Pamflet',
      'Tgl Tasmi',
      'Catatan',
      'Terakhir Diperbarui'
    ]);
    sheet.getRange(1, 1, 1, 13).setFontWeight('bold').setBackground('#dcfce7').setFontColor('#065f46');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getTahfidzMasterFromSheet() {
  try {
    const sheet = getTahfidzSheet();
    if (!sheet) return { success: false, message: 'Tidak ada spreadsheet aktif terhubung.' };
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return { success: true, data: [], count: 0 };
    
    const values = sheet.getRange(2, 1, lastRow - 1, 13).getValues();
    const students = values.map(row => ({
      id: String(row[0] || ''),
      nama: String(row[1] || ''),
      unit: String(row[2] || 'MI'),
      kelas: String(row[3] || 'Kelas 1'),
      bapak: String(row[4] || '-'),
      ibu: String(row[5] || '-'),
      kategori: String(row[6] || '1 Juz'),
      juz: String(row[7] || 'Juz 30'),
      gender: String(row[8] || 'Putra'),
      statusPamflet: String(row[9] || 'selesai'),
      tglTasmi: String(row[10] || ''),
      catatan: String(row[11] || ''),
      updatedAt: String(row[12] || '')
    })).filter(s => s.nama && s.nama.trim() !== '');
    
    return { success: true, data: students, count: students.length };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

function saveTahfidzMasterToSheet(students) {
  try {
    const sheet = getTahfidzSheet();
    if (!sheet) return { success: false, message: 'Tidak ada spreadsheet aktif terhubung.' };
    
    // Bersihkan data lama di bawah baris header
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, 13).clearContent();
    }
    
    if (!students || students.length === 0) {
      return { success: true, count: 0 };
    }
    
    const nowStr = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
    const rows = students.map((s, idx) => [
      s.id || ('st-' + (idx + 1)),
      s.nama || '',
      s.unit || 'MI',
      s.kelas || 'Kelas 1',
      s.bapak || '-',
      s.ibu || '-',
      s.kategori || '1 Juz',
      s.juz || 'Juz 30',
      s.gender || 'Putra',
      s.statusPamflet || 'selesai',
      s.tglTasmi || '',
      s.catatan || '',
      nowStr
    ]);
    
    sheet.getRange(2, 1, rows.length, 13).setValues(rows);
    return { success: true, count: rows.length, timestamp: nowStr };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

/**
 * ============================================================================
 * MODUL HUMAS & SOSMED: SINKRONISASI KALENDER PROGRAM TAHUNAN KE SPREADSHEET
 * ============================================================================
 */

function getHumasSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) return null;
  
  let sheet = ss.getSheetByName('Kalender_Humas_Sosmed');
  if (!sheet) {
    sheet = ss.insertSheet('Kalender_Humas_Sosmed');
    sheet.appendRow([
      'ID Kegiatan',
      'No',
      'Tanggal',
      'Bulan',
      'Tahun',
      'Uraian Acara',
      'Penanggung Jawab',
      'Sasaran',
      'Status Pamflet',
      'Status Postingan',
      'Kanal Tayang',
      'Caption & Catatan',
      'Terakhir Diperbarui'
    ]);
    sheet.getRange(1, 1, 1, 13).setFontWeight('bold').setBackground('#e0e7ff').setFontColor('#3730a3');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getHumasPlannerFromSheet() {
  try {
    const sheet = getHumasSheet();
    if (!sheet) return { success: false, message: 'Tidak ada spreadsheet aktif terhubung.' };
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return { success: true, data: [], count: 0 };
    
    const values = sheet.getRange(2, 1, lastRow - 1, 13).getValues();
    const programs = values.map(row => ({
      id: String(row[0] || ''),
      no: String(row[1] || ''),
      tgl: String(row[2] || ''),
      bulan: String(row[3] || ''),
      tahun: String(row[4] || '2026'),
      uraian: String(row[5] || ''),
      pj: String(row[6] || ''),
      sasaran: String(row[7] || ''),
      statusPamflet: String(row[8] || 'belum'), // belum | proses | siap | selesai
      statusPost: String(row[9] || 'belum'),    // belum | draft | siap | published
      kanal: String(row[10] || ''),              // comma-separated e.g. "IG,FB,WA"
      caption: String(row[11] || ''),
      updatedAt: String(row[12] || '')
    })).filter(p => p.uraian && p.uraian.trim() !== '');
    
    return { success: true, data: programs, count: programs.length };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

function saveHumasPlannerToSheet(programs) {
  try {
    const sheet = getHumasSheet();
    if (!sheet) return { success: false, message: 'Tidak ada spreadsheet aktif terhubung.' };
    
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, 13).clearContent();
    }
    
    if (!programs || programs.length === 0) {
      return { success: true, count: 0 };
    }
    
    const nowStr = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
    const rows = programs.map((p, idx) => [
      p.id || ('prog-' + (idx + 1)),
      p.no || (idx + 1),
      p.tgl || '',
      p.bulan || '',
      p.tahun || '2026',
      p.uraian || '',
      p.pj || '',
      p.sasaran || '',
      p.statusPamflet || 'belum',
      p.statusPost || 'belum',
      p.kanal || '',
      p.caption || '',
      nowStr
    ]);
    
    sheet.getRange(2, 1, rows.length, 13).setValues(rows);
    return { success: true, count: rows.length, timestamp: nowStr };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

