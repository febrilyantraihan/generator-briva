$enc1252 = [System.Text.Encoding]::GetEncoding(1252)
$encUtf8 = [System.Text.Encoding]::UTF8

function Fix-MojibakeString ($inputStr) {
    if (-not $inputStr) { return $inputStr }
    # Try converting if it contains classic Mojibake markers
    if ($inputStr -match '[Ãâð][\x80-\xFF]') {
        try {
            $bytes = $enc1252.GetBytes($inputStr)
            $converted = $encUtf8.GetString($bytes)
            # If the converted string does not contain replacement character U+FFFD, return it
            if (-not $converted.Contains([char]0xFFFD)) {
                return $converted
            }
        } catch {}
    }
    return $inputStr
}

$sample = 'Menjaga kesehatan mental dan kesejahteraan emosional merupakan bagian tak terpisahkan dari ikhtiar mencetak generasi santri yang utuh lahir dan batin... ðŸŒ¿âœ¨'
$res = Fix-MojibakeString $sample
Write-Host "Original: $sample"
Write-Host "Fixed:    $res"
