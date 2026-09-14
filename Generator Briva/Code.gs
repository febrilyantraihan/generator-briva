/**
 * =========================================================================
 * Google Apps Script Web App Controller: DriveData Generator BRIVA & Keuangan
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
    .setTitle("DriveData - Generator BRIVA & Sistem Keuangan YTPAI")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover')
    .setFaviconUrl('https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png');
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

