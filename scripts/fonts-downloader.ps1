# Ensure folders exist
$folders = @(
    "css",
    "js",
    "menu",
    "assets/fonts",
    "assets/images",
    "assets/videos"
)

foreach ($f in $folders) {
    if (-not (Test-Path $f)) {
        New-Item -ItemType Directory -Path $f -Force | Out-Null
        Write-Host "Created directory: $f"
    }
}

# Download fonts from google-webfonts-helper API
$fonts = @("archivo-black", "barlow-condensed")

foreach ($fontId in $fonts) {
    Write-Host "Fetching metadata for font: $fontId"
    $url = "https://gwfh.mranftl.com/api/fonts/$fontId"
    try {
        $meta = Invoke-RestMethod -Uri $url
        # Get variants (like regular, bold, etc.)
        foreach ($variant in $meta.variants) {
            $woff2Url = $variant.woff2
            $filename = Split-Path -Leaf $woff2Url
            $destPath = Join-Path "assets/fonts" $filename
            
            Write-Host "Downloading $filename from $woff2Url ..."
            Invoke-WebRequest -Uri $woff2Url -OutFile $destPath
            Write-Host "Saved to $destPath"
        }
    } catch {
        Write-Warning ("Could not download " + $fontId + ": " + $_.Exception.Message)
    }
}

Write-Host "Setup and font download complete."
