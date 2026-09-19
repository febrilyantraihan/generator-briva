// ============================================================================
// MODULE: tab_pembersih.js
// Tab 7: Pembersih Teks & Angka Multi-Kolom + Kalkulator SUM Otomatis
// ============================================================================
let cleanNumbers = [];
let aliasResults = [];
      cleanNumbers = [];
      let totalSum = 0;

      lines.forEach(line => {
        const clean = line.replace(/rp/gi, '')
                          .replace(/\s+/g, '')
                          .replace(/,00$/g, '')
                          .replace(/\./g, '')
                          .replace(/,/g, '');
        const num = parseInt(clean, 10);
        if (!isNaN(num) && num > 0) {
          cleanNumbers.push(num);
          totalSum += num;
        }
      });

      document.getElementById('cleanRowCount').textContent = cleanNumbers.length;
      document.getElementById('cleanSumText').textContent = 'Rp ' + totalSum.toLocaleString('id-ID');
    }

    function copyCleanResult() {
      if (cleanNumbers.length === 0) {
        showToast('Data Kosong', 'Masukkan data nominal terlebih dahulu.', true);
        return;
      }
      const text = cleanNumbers.map(n => "'" + n.toLocaleString('en-US')).join('\r\n');
      copyToClipboard(text, 'Angka Bersih Disalin!', `${cleanNumbers.length} baris angka berhasil disalin.`);
    }

    function clearCleanTool() {
      document.getElementById('cleanInput').value = '';
      processCleanTool();
      soundReset();
    }

    let aliasResults = [];

    function processAliasTool() {
      const input = document.getElementById('aliasInput').value;
      const lines = input.split('\n');

      aliasResults = [];
      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        const lower = trimmed.toLowerCase();

        let standardized = trimmed;
        if (lower.includes('vip')) {
          standardized = 'Mukim Vip PI';
        } else if (lower.includes('non') && (lower.includes('pi') || lower.includes('putri'))) {
          standardized = 'Non Mukim PI';
        } else if (lower.includes('non') && (lower.includes('pa') || lower.includes('putra'))) {
          standardized = 'Non Mukim Pa';
        } else if (lower.includes('mbajak') || lower.includes('non')) {
          standardized = 'Non Mukim Pa';
        } else if (lower.includes('reguler') && (lower.includes('pa') || lower.includes('putra'))) {
          standardized = 'Mukim Reguler PA';
        } else if (lower.includes('reguler') && (lower.includes('pi') || lower.includes('putri'))) {
          standardized = 'Mukim Reguler PI';
        } else if (lower.includes('reguler')) {
          standardized = 'Mukim Reguler PA';
        }

        aliasResults.push(standardized);
      });

      document.getElementById('aliasCount').textContent = aliasResults.length;
    }

    function copyAliasResult() {
      if (aliasResults.length === 0) {
        showToast('Data Kosong', 'Tempelkan teks singkatan terlebih dahulu.', true);
        return;
      }
      const text = aliasResults.join('\r\n');
      copyToClipboard(text, 'Teks Baku Disalin!', `${aliasResults.length} baris status baku siap ditempel ke Excel.`);
    }

    // --- 12. BRIVA BULK BILLING GENERATOR (STANDAR BANK BRI 5-KOLOM) ---
    // 12 Academic Months with Official BRI ID Tagihan (Jan=54 s/d Des=65, Jul=60 s/d Des=65)
    const ACADEMIC_MONTHS = [
      { code: '07', name: 'Juli', idTagihan: '60' },
      { code: '08', name: 'Agustus', idTagihan: '61' },
