$code = @"
using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

public class UniversalMojibakeFixer {
    private static readonly Encoding Enc1252 = Encoding.GetEncoding(1252);
    private static readonly Encoding EncUtf8 = new UTF8Encoding(false);

    public static string Fix(string text) {
        if (string.IsNullOrEmpty(text)) return text;

        // Regex that matches any sequence starting with common double-encoded UTF-8 prefixes
        // (ð = 0xF0 for 4-byte emojis, â = 0xE2 for 3-byte symbols, Ã = 0xC3 for 2-byte accented / letters)
        // followed by 1 or more Windows-1252 high-range characters
        string pattern = @"[ðâÃ][\u0080-\u02DF\u2000-\u214F\u00A0-\u00FF\u0100-\u017F\u0180-\u024F]+";
        
        string pass1 = Regex.Replace(text, pattern, m => {
            try {
                byte[] bytes = Enc1252.GetBytes(m.Value);
                string decoded = EncUtf8.GetString(bytes);
                if (!decoded.Contains("\uFFFD") && decoded != m.Value) {
                    return decoded;
                }
            } catch {}
            return m.Value;
        });

        // Run second pass for triple-encoded cases
        string pass2 = Regex.Replace(pass1, pattern, m => {
            try {
                byte[] bytes = Enc1252.GetBytes(m.Value);
                string decoded = EncUtf8.GetString(bytes);
                if (!decoded.Contains("\uFFFD") && decoded != m.Value) {
                    return decoded;
                }
            } catch {}
            return m.Value;
        });

        return pass2;
    }
}
"@

Add-Type -TypeDefinition $code

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$targetFiles = @(
    (Join-Path $PSScriptRoot "template_core.html"),
    (Join-Path $PSScriptRoot "index.html"),
    (Join-Path $PSScriptRoot "JavaScript.html"),
    (Join-Path $PSScriptRoot "Stylesheet.html")
) + (Get-ChildItem -Path (Join-Path $PSScriptRoot "tabs") -Filter "*.html" | Select-Object -ExpandProperty FullName) +
(Get-ChildItem -Path (Join-Path $PSScriptRoot "js") -Filter "*.js" | Select-Object -ExpandProperty FullName)

foreach ($file in $targetFiles) {
    if (Test-Path $file) {
        $raw = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
        $clean = [UniversalMojibakeFixer]::Fix($raw)
        if ($raw -ne $clean) {
            [System.IO.File]::WriteAllText($file, $clean, $utf8NoBom)
            Write-Host "Fixed Mojibake in: $(Split-Path $file -Leaf)" -ForegroundColor Green
        } else {
            Write-Host "Clean: $(Split-Path $file -Leaf)" -ForegroundColor DarkGray
        }
    }
}
