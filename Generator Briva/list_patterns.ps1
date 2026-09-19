$eUtf8 = [System.Text.Encoding]::UTF8
$str = [System.IO.File]::ReadAllText('template_core.html', $eUtf8)

$matches = [regex]::Matches($str, '[\u00C0-\u00FF\u0100-\u024F\u2000-\u2030]{2,}')
$unique = $matches | ForEach-Object { $_.Value } | Select-Object -Unique

Write-Host "Total unique patterns: $($unique.Count)"
foreach ($u in $unique) {
    Write-Host "Pattern: $u"
}
