// ============================================================================
// MODULE: voice_nlp.js
// Smart Voice NLP Engine (Fuzzy Intent & Context Extractor)
// Designed for Partner Fatih - Generator Briva
// ============================================================================
// Handles messy, conversational, colloquial, inverted, or convoluted
// ("belibet") Indonesian speech recognition inputs with phonetic variations,
// filler word stripping, spoken compound numbers, and fuzzy entity extraction.
// ============================================================================

(function(global) {
  'use strict';

  // 1. Spoken Indonesian Numbers Dictionary (Ordered by length descending for compound replacement)
  const SPOKEN_NUMBERS = {
    'sembilan puluh sembilan': 99, 'sembilan puluh delapan': 98, 'sembilan puluh tujuh': 97,
    'sembilan puluh enam': 96, 'sembilan puluh lima': 95, 'sembilan puluh empat': 94,
    'sembilan puluh tiga': 93, 'sembilan puluh dua': 92, 'sembilan puluh satu': 91, 'sembilan puluh': 90,
    'delapan puluh sembilan': 89, 'delapan puluh delapan': 88, 'delapan puluh tujuh': 87,
    'delapan puluh enam': 86, 'delapan puluh lima': 85, 'delapan puluh empat': 84,
    'delapan puluh tiga': 83, 'delapan puluh dua': 82, 'delapan puluh satu': 81, 'delapan puluh': 80,
    'tujuh puluh sembilan': 79, 'tujuh puluh delapan': 78, 'tujuh puluh tujuh': 77,
    'tujuh puluh enam': 76, 'tujuh puluh lima': 75, 'tujuh puluh empat': 74,
    'tujuh puluh tiga': 73, 'tujuh puluh dua': 72, 'tujuh puluh satu': 71, 'tujuh puluh': 70,
    'enam puluh sembilan': 69, 'enam puluh delapan': 68, 'enam puluh tujuh': 67,
    'enam puluh enam': 66, 'enam puluh lima': 65, 'enam puluh empat': 64,
    'enam puluh tiga': 63, 'enam puluh dua': 62, 'enam puluh satu': 61, 'enam puluh': 60,
    'lima puluh sembilan': 59, 'lima puluh delapan': 58, 'lima puluh tujuh': 57,
    'lima puluh enam': 56, 'lima puluh lima': 55, 'lima puluh empat': 54,
    'lima puluh tiga': 53, 'lima puluh dua': 52, 'lima puluh satu': 51, 'lima puluh': 50,
    'empat puluh sembilan': 49, 'empat puluh delapan': 48, 'empat puluh tujuh': 47,
    'empat puluh enam': 46, 'empat puluh lima': 45, 'empat puluh empat': 44,
    'empat puluh tiga': 43, 'empat puluh dua': 42, 'empat puluh satu': 41, 'empat puluh': 40,
    'tiga puluh sembilan': 39, 'tiga puluh delapan': 38, 'tiga puluh tujuh': 37,
    'tiga puluh enam': 36, 'tiga puluh lima': 35, 'tiga puluh empat': 34,
    'tiga puluh tiga': 33, 'tiga puluh dua': 32, 'tiga puluh satu': 31, 'tiga puluh': 30,
    'dua puluh sembilan': 29, 'dua puluh delapan': 28, 'dua puluh tujuh': 27,
    'dua puluh enam': 26, 'dua puluh lima': 25, 'dua puluh empat': 24,
    'dua puluh tiga': 23, 'dua puluh dua': 22, 'dua puluh satu': 21, 'dua puluh': 20,
    'sembilan belas': 19, 'delapan belas': 18, 'tujuh belas': 17, 'enam belas': 16,
    'lima belas': 15, 'empat belas': 14, 'tiga belas': 13, 'dua belas': 12, 'sebelas': 11,
    'sepuluh': 10, 'sembilan': 9, 'delapan': 8, 'tujuh': 7, 'enam': 6, 'lima': 5,
    'empat': 4, 'tiga': 3, 'dua': 2, 'satu': 1, 'nol': 0, 'kosong': 0, 'seratus': 100
  };

  // 2. Conversational Fillers, Hesitations, & Polite Particles
  const FILLERS_REGEX = /\b(tolong dong|tolong bikinin|tolong buatkan|tolong carikan|tolong bantu|bisa tolong|minta tolong|tolong inputkan|tolong|bikinin|buatkan|carikan|coba tolong|coba deh|coba|anu dong|anu itu|anu|apa namanya|ee+|eh|ya|dong|sih|lah|kan|nih|deh|oke|okey|sip|halo|hai|admin|partner fatih|bot|assistant|mas|mbak|mba|pak|bu|ustadz|ustadzah|kak)\b/gi;

  // 3. Normalizer Function
  function normalizeText(text) {
    if (!text) return '';
    let t = text.toString().toLowerCase().trim();

    // Replace punctuation except hyphens inside words
    t = t.replace(/[.,;:!?_~`()\[\]{}"'\/\\]/g, ' ');

    // Normalize spoken compound numbers to digits
    for (const [phrase, num] of Object.entries(SPOKEN_NUMBERS)) {
      const reg = new RegExp('\\b' + phrase + '\\b', 'gi');
      t = t.replace(reg, num.toString());
    }

    // Normalize ordinal / class patterns e.g. "ke 7", "ke-7" -> "7", "kls 7" -> "kelas 7"
    t = t.replace(/\bke\s*[-]?\s*(\d+)\b/gi, '$1');
    t = t.replace(/\bkls\b/gi, 'kelas');

    // Normalize phonetic / transcription variants for school levels
    t = t.replace(/\b(em\s*tes|emtes|m\s*ts|tsanawiyah|tsanawiah|sltp|smp)\b/gi, 'mts');
    t = t.replace(/\b(em\s*a|ema|m\s*a|aliyah|aliyyah|slta|sma|smk)\b/gi, 'ma');
    t = t.replace(/\b(em\s*i|emi|m\s*i|ibtidaiyah|ibtidaiyyah|sd)\b/gi, 'mi');

    // Normalize multiple whitespace
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  }

  // 4. Clean fillers for search / name extraction
  function stripFillers(text) {
    if (!text) return '';
    return text.replace(FILLERS_REGEX, ' ').replace(/\s+/g, ' ').trim();
  }

  // 5. String Levenshtein distance & similarity (0 to 1)
  function similarity(s1, s2) {
    if (!s1 || !s2) return 0;
    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();
    if (s1 === s2) return 1;
    if (s1.includes(s2) || s2.includes(s1)) return 0.88;

    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1.0;

    let costs = [];
    for (let i = 0; i <= longer.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= shorter.length; j++) {
        if (i === 0) costs[j] = j;
        else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (longer.charAt(i - 1) !== shorter.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[shorter.length] = lastValue;
    }
    return (longerLength - costs[shorter.length]) / parseFloat(longerLength);
  }

  // 6. Billing Intent Parser (Robust & Unstructured Phrasing Tolerant)
  function parseBillingIntent(rawText, explicitTipe = null) {
    const originalText = (rawText || '').trim();
    const normalized = normalizeText(originalText);
    const cleaned = stripFillers(normalized);

    // Intent detection score
    let isBilling = false;
    if (/\b(buat tagihan|tagihan|biaya|hitung tagihan|tarif|buatkan tagihan|rincian tagihan|biaya masuk|pembayaran|pindah|pindahan|pindahak|santri baru|siswa baru|spp|daftar ulang|uang masuk)\b/i.test(cleaned)) {
      isBilling = true;
    }
    // Trigger if it mentions a school level or grade AND student characteristics
    if (/\b(ma|mts|smp|sma|mi|kelas\s*\d+|\b(7|8|9|10|11|12)\b)/i.test(cleaned) && /\b(putra|putri|cewek|cowok|santri|mondok|mbajak|asrama|laju|reguler|vip)\b/i.test(cleaned)) {
      isBilling = true;
    }

    // --- A. GENDER EXTRACTION ---
    let gender = null;
    let genderLabel = 'Putri';
    let genderKey = 'pi';
    if (/\b(putra|putro|laki|laki-laki|cowok|cowo|santriwan|ikhwan|pria|mas|anak laki)\b/i.test(cleaned)) {
      gender = 'PA';
      genderLabel = 'Putra';
      genderKey = 'pa';
    } else if (/\b(putri|putree|perempuan|cewek|cewe|santriwati|akhwat|wanita|siswi|mbak|mba|anak perempuan)\b/i.test(cleaned)) {
      gender = 'PI';
      genderLabel = 'Putri';
      genderKey = 'pi';
    }

    // Default gender from UI dropdown if not spoken
    if (!gender) {
      const defaultGenderEl = document.getElementById('brivaGenderDefault') || document.getElementById('brivaDefaultGender');
      gender = defaultGenderEl && defaultGenderEl.value === 'PA' ? 'PA' : 'PI';
      genderLabel = gender === 'PA' ? 'Putra' : 'Putri';
      genderKey = gender.toLowerCase();
    }

    // --- B. KELAS EXTRACTION ---
    let kelas = null;
    const matchKelas1 = cleaned.match(/\bkelas\s*(\d+)\b/i);
    const matchKelas2 = cleaned.match(/\b(7|8|9|10|11|12)\b/);
    if (matchKelas1 && matchKelas1[1]) {
      kelas = matchKelas1[1];
    } else if (matchKelas2 && matchKelas2[1]) {
      kelas = matchKelas2[1];
    }

    // --- C. JENJANG & LEVEL EXTRACTION ---
    let jenjang = null;
    let level = 'slta';
    if (/\bmts\b/i.test(cleaned)) {
      jenjang = 'MTs';
      level = 'sltp';
    } else if (/\bma\b/i.test(cleaned)) {
      jenjang = 'MA';
      level = 'slta';
    } else if (/\bmi\b/i.test(cleaned)) {
      jenjang = 'MI';
      level = 'sltp';
    }

    // Infer jenjang from kelas if not explicit
    if (!jenjang) {
      if (kelas && ['7', '8', '9'].includes(kelas)) {
        jenjang = 'MTs';
        level = 'sltp';
      } else if (kelas && ['10', '11', '12'].includes(kelas)) {
        jenjang = 'MA';
        level = 'slta';
      } else {
        jenjang = 'MA';
        level = 'slta';
      }
    }

    if (!kelas) {
      kelas = (jenjang === 'MA') ? '10' : '7';
    }

    // Adjust consistency between kelas and jenjang
    if (['7', '8', '9'].includes(kelas)) {
      level = 'sltp';
      if (jenjang === 'MA') jenjang = 'MTs';
    } else if (['10', '11', '12'].includes(kelas)) {
      level = 'slta';
      if (jenjang === 'MTs' || jenjang === 'MI') jenjang = 'MA';
    }

    // --- D. TIPE / STATUS MUKIM EXTRACTION ---
    let tipe = explicitTipe;
    let tipeExplicitlyFound = false;

    if (!tipe) {
      const hasNonMukim = /\b(non[- ]?mukim|mbajak|bajak|pulang[- ]?pergi|laju|tidak mondok|ga mondok|gak mondok|nggak mondok|luar|santri luar|kalong)\b/i.test(cleaned);
      const hasVip = /\b(vip|kamar ac|ac|fasilitas khusus)\b/i.test(cleaned);
      const hasMukim = /\b(mukim|mondok|asrama|pesantren|pondok|nginap|menginap|nginep|tidur dalem|tidur dalam|reguler)\b/i.test(cleaned);

      if (hasNonMukim) {
        tipe = 'mbajak';
        tipeExplicitlyFound = true;
      } else if (hasVip) {
        tipe = 'vip';
        tipeExplicitlyFound = true;
      } else if (hasMukim) {
        tipe = 'reguler';
        tipeExplicitlyFound = true;
      }
    } else {
      tipeExplicitlyFound = true;
    }

    let tipeLabel = 'Reguler';
    if (tipe === 'vip') {
      tipeLabel = 'VIP';
    } else if (tipe === 'mbajak') {
      tipeLabel = 'Non-Mukim (Mbajak)';
    } else if (tipe === 'reguler') {
      tipeLabel = 'Mukim (Reguler)';
    }

    // --- E. STATUS SANTRI EXTRACTION ---
    let statusSantri = 'Santri Baru (Pindahan)';
    if (/\b(pindahan|pindah|pindahak|mutasi)\b/i.test(cleaned)) {
      statusSantri = 'Santri Pindahan';
    } else if (/\b(baru|santri baru|siswa baru|calon santri|pendaftar baru|masuk baru)\b/i.test(cleaned)) {
      statusSantri = 'Santri Baru';
    } else if (/\b(lama|siswa lama|santri lama|naik kelas)\b/i.test(cleaned)) {
      statusSantri = 'Siswa Lama';
    }

    // --- F. BULAN MASUK EXTRACTION ---
    let bulanMasuk = 'September';
    const monthMatches = [
      { name: 'Juli', regex: /\bjuli\b/i },
      { name: 'Agustus', regex: /\bagustus\b/i },
      { name: 'September', regex: /\bseptember\b/i },
      { name: 'Oktober', regex: /\boktober\b/i },
      { name: 'November', regex: /\b(november|nopember)\b/i },
      { name: 'Desember', regex: /\bdesember\b/i },
      { name: 'Januari', regex: /\bjanuari\b/i },
      { name: 'Februari', regex: /\b(februari|pebruari)\b/i },
      { name: 'Maret', regex: /\bmaret\b/i },
      { name: 'April', regex: /\bapril\b/i },
      { name: 'Mei', regex: /\bmei\b/i },
      { name: 'Juni', regex: /\bjuni\b/i }
    ];
    for (const m of monthMatches) {
      if (m.regex.test(cleaned)) {
        bulanMasuk = m.name;
        break;
      }
    }

    return {
      isBilling,
      jenjang,
      level,
      gender,
      genderLabel,
      genderKey,
      kelas,
      tipe,
      tipeLabel,
      tipeExplicitlyFound,
      statusSantri,
      bulanMasuk,
      originalText,
      normalized,
      cleaned
    };
  }

  // 8. Tahfidz Smart Command Parser (Student Name, Juz Range, & Predikat Fuzzy Matcher)
  function parseTahfidzIntent(rawText, masterStudents = []) {
    const originalText = (rawText || '').trim();
    const normalized = normalizeText(originalText);
    const text = stripFillers(normalized);

    // 1. Deteksi Predikat (Mumtaz, Jayyid Jiddan, Jayyid)
    let detectedPredikat = null;
    if (/\b(mumtaz|istimewa|sempurna|cumlaude|terbaik|sangat\s*memuaskan)\b/i.test(text)) {
      detectedPredikat = 'Mumtaz';
    } else if (/\b(jayyid\s*jiddan|jayyid\s*ziddan|sangat\s*baik|bagus\s*banget|bagus\s*sekali|memuaskan)\b/i.test(text)) {
      detectedPredikat = 'Jayyid Jiddan';
    } else if (/\b(jayyid|jayid|baik|bagus|lancar|cukup\s*baik)\b/i.test(text)) {
      detectedPredikat = 'Jayyid';
    }

    // 2. Deteksi Juz & Kategori (Range atau Single)
    let detectedJuz = null;
    let detectedKategori = null;

    const rangeMatch = text.match(/(?:juz|jus)\s*(\d{1,2})\s*(?:-|sampai|sd|s\/d)\s*(\d{1,2})/i);
    if (rangeMatch) {
      const startJuz = parseInt(rangeMatch[1], 10);
      const endJuz = parseInt(rangeMatch[2], 10);
      detectedJuz = `${startJuz}-${endJuz}`;
      const totalJuz = Math.abs(endJuz - startJuz) + 1;
      detectedKategori = `${totalJuz} Juz`;
    } else {
      const singleJuzMatch = text.match(/(?:juz|jus)\s*(\d{1,2})/i) || text.match(/(\d{1,2})\s*(?:juz|jus)/i);
      if (singleJuzMatch) {
        detectedJuz = singleJuzMatch[1];
        detectedKategori = '1 Juz';
      } else {
        const numMatch = text.match(/\b([1-9]|[12]\d|30)\b/);
        if (numMatch) {
          detectedJuz = numMatch[1];
          detectedKategori = '1 Juz';
        }
      }
    }

    // 3. Ekstraksi Query Nama Santri (Pembersihan Stopwords)
    let cleanQuery = text
      .replace(/\b(juz|jus|predikat|predikatnya|nilai|nilainya|hasil|hasilnya|dapat|mendapatkan|alhamdulillah|bismillah|lulus|selesai|telah|ujian|ujiannya|atas|nama|untuk|caption|pamflet|berhasil|tasmi|tasmiyah|hafalan|bil|ghoib|sekali|duduk|dengan|mumtaz|jayyid|jiddan|ziddan|istimewa|sempurna|baik|bagus|sekali|banget|sampai|ananda|santri|siswa|siswi|dari|bapak|ibu|unit|kelas|mi|mts|smp|ma|sma|tolong|buatkan|panggil|tampilkan|cari|tolongkan)\b/gi, ' ')
      .replace(/[\d\-\.\,]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    let matchedStudent = null;
    let bestScore = 0;

    if (masterStudents && masterStudents.length > 0 && cleanQuery.length > 0) {
      const queryWords = cleanQuery.split(' ').filter(w => w.length >= 2);

      masterStudents.forEach(s => {
        let score = 0;
        const sName = (s.nama || '').toLowerCase();
        const sWords = sName.split(' ');

        // Exact substring match
        if (sName.includes(cleanQuery)) {
          score += 100;
        }

        // Token matching
        queryWords.forEach(qw => {
          if (sName.includes(qw)) score += 40;
          sWords.forEach(sw => {
            if (sw === qw) score += 60;
            else if (sw.startsWith(qw) || qw.startsWith(sw)) score += 35;
            else {
              const sim = similarity(sw, qw);
              if (sim > 0.7) score += Math.round(sim * 50);
            }
          });
        });

        if (score > bestScore) {
          bestScore = score;
          matchedStudent = s;
        }
      });
    }

    return {
      originalText,
      normalized,
      text,
      cleanQuery,
      matchedStudent,
      bestScore,
      detectedJuz,
      detectedKategori,
      detectedPredikat
    };
  }

  // 9. Global Command & Intent Dispatcher
  function dispatchSmartVoiceCommand(rawText) {
    if (!rawText || !rawText.trim()) return false;
    const originalText = rawText.trim();
    const normalized = normalizeText(originalText);
    const cleaned = stripFillers(normalized);

    // Global Tab Switching Intent
    if (/\b(buka|pindah|tampilkan|ke|menu|tab)\s*(humas|sosmed|instagram|agenda|postingan)\b/i.test(cleaned) || cleaned === 'humas') {
      if (typeof switchTab === 'function') switchTab('humas');
      if (typeof showToast === 'function') showToast('📂 Pindah Tab', 'Membuka Tab Humas & Agenda', 'info');
      return true;
    }
    if (/\b(buka|pindah|tampilkan|ke|menu|tab)\s*(briva|tagihan briva|generator briva)\b/i.test(cleaned) || cleaned === 'briva') {
      if (typeof switchTab === 'function') switchTab('briva');
      if (typeof showToast === 'function') showToast('📂 Pindah Tab', 'Membuka Tab Tagihan BRIVA', 'info');
      return true;
    }
    if (/\b(buka|pindah|tampilkan|ke|menu|tab)\s*(tahfidz|tasmi|hafalan|tasmi'|ujian tahfidz)\b/i.test(cleaned) || cleaned === 'tahfidz') {
      if (typeof switchTab === 'function') switchTab('tahfidz');
      if (typeof showToast === 'function') showToast('📂 Pindah Tab', 'Membuka Tab Tahfidz & Tasmi\'', 'info');
      return true;
    }
    if (/\b(buka|pindah|tampilkan|ke|menu|tab)\s*(akun|ppdb|akun ppdb|ortu|wali|siswa|guru)\b/i.test(cleaned) || cleaned === 'akun' || cleaned === 'ppdb') {
      if (typeof switchTab === 'function') switchTab('akun');
      if (typeof showToast === 'function') showToast('📂 Pindah Tab', 'Membuka Tab Akun PPDB', 'info');
      return true;
    }
    if (/\b(buka|pindah|tampilkan|ke|menu|tab)\s*(katalog|katalog biaya|tarif biaya|biaya)\b/i.test(cleaned) || cleaned === 'katalog') {
      if (typeof switchTab === 'function') switchTab('katalog');
      if (typeof showToast === 'function') showToast('📂 Pindah Tab', 'Membuka Tab Katalog Biaya', 'info');
      return true;
    }
    if (/\b(buka|pindah|tampilkan|ke|menu|tab)\s*(konverter|konvert|konversi)\b/i.test(cleaned) || cleaned === 'konverter') {
      if (typeof switchTab === 'function') switchTab('konverter');
      if (typeof showToast === 'function') showToast('📂 Pindah Tab', 'Membuka Tab Konverter', 'info');
      return true;
    }
    if (/\b(buka|pindah|tampilkan|ke|menu|tab)\s*(panggil|panggil tagihan)\b/i.test(cleaned) || cleaned === 'panggil') {
      if (typeof switchTab === 'function') switchTab('panggil');
      if (typeof showToast === 'function') showToast('📂 Pindah Tab', 'Membuka Tab Panggil Tagihan', 'info');
      return true;
    }
    if (/\b(buka|pindah|tampilkan|ke|menu|tab)\s*(pembersih|pembersih sum|bersihkan sum)\b/i.test(cleaned) || cleaned === 'pembersih') {
      if (typeof switchTab === 'function') switchTab('pembersih');
      if (typeof showToast === 'function') showToast('📂 Pindah Tab', 'Membuka Tab Pembersih Sum', 'info');
      return true;
    }
    if (/\b(buka|pindah|tampilkan|ke|menu|tab)\s*(panduan|excel|panduan excel)\b/i.test(cleaned) || cleaned === 'panduan') {
      if (typeof switchTab === 'function') switchTab('panduan');
      if (typeof showToast === 'function') showToast('📂 Pindah Tab', 'Membuka Tab Panduan Excel', 'info');
      return true;
    }
    if (/\b(buka|pindah|tampilkan|ke|menu|tab)\s*(wa|template wa|whatsapp)\b/i.test(cleaned) || cleaned === 'wa') {
      if (typeof switchTab === 'function') switchTab('wa');
      if (typeof showToast === 'function') showToast('📂 Pindah Tab', 'Membuka Tab Template WhatsApp', 'info');
      return true;
    }

    // Global Theme Toggle Intent
    if (/\b(tema malam|dark mode|mode gelap|mode malam|tema gelap)\b/i.test(cleaned)) {
      if (!document.documentElement.classList.contains('dark') && typeof toggleTheme === 'function') {
        toggleTheme();
      }
      return true;
    } else if (/\b(tema siang|light mode|mode terang|mode siang|tema terang)\b/i.test(cleaned)) {
      if (document.documentElement.classList.contains('dark') && typeof toggleTheme === 'function') {
        toggleTheme();
      }
      return true;
    }

    // Billing Generator Intent -> Route to BRIVA
    const billingResult = parseBillingIntent(originalText);
    if (billingResult.isBilling) {
      if (typeof switchTab === 'function') switchTab('briva');
      if (typeof processBrivaVoiceSmartCommand === 'function') {
        return processBrivaVoiceSmartCommand(originalText);
      }
    }

    return false;
  }

  // Export to Global
  const SmartVoiceNLP = {
    SPOKEN_NUMBERS,
    normalizeText,
    stripFillers,
    similarity,
    parseBillingIntent,
    parseTahfidzIntent,
    dispatchSmartVoiceCommand
  };

  global.SmartVoiceNLP = SmartVoiceNLP;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartVoiceNLP;
  }
})(typeof window !== 'undefined' ? window : this);
