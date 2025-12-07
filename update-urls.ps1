$baseUrl = "https://hmukragqu7.github.io/ktx"

# Define file mappings (filename => clean URL path)
$files = @{
    "index.html" = ""
    "about-us.html" = "about-us"
    "contact-us.html" = "contact-us"
    "industrial-iot-consulting.html" = "industrial-iot-consulting"
    "manpower-deployment-services.html" = "manpower-deployment-services"
}

$rootDir = "c:\xampp\htdocs\Koushalya Tantra Solutions (KT-X)"

# 1. First update all HTML files with canonical URLs and meta tags
foreach ($file in $files.Keys) {
    $filePath = Join-Path $rootDir $file
   
    if (Test-Path $filePath) {
        Write-Host "Processing $file..."
        $content = Get-Content $filePath -Raw
        
        $cleanPath = $files[$file]
        $cleanUrl = if ($cleanPath) { "$baseUrl/$cleanPath" } else { "$baseUrl/" }
        
        # Update Open Graph URL
        $content = $content -replace 'property="og:url" content="https://ktxsolutions\.com[^"]*"', "property=`"og:url`" content=`"$cleanUrl`""
        
        # Update Twitter URL
        $content = $content -replace 'property="twitter:url" content="https://ktxsolutions\.com[^"]*"', "property=`"twitter:url`" content=`"$cleanUrl`""
        
        # Update Canonical URL
        $content = $content -replace 'rel="canonical" href="https://ktxsolutions\.com[^"]*"', "rel=`"canonical`" href=`"$cleanUrl`""
        
        # Update schema.org URLs
        $content = $content -replace '"url":\s*"https://ktxsolutions\.com[^"]*"', "`"url`": `"$cleanUrl`""
        $content = $content -replace '"item":\s*"https://ktxsolutions\.com[^"]*"', "`"item`": `"$cleanUrl`""
        
        # Update og:image and twitter:image to use GitHub Pages
        $content = $content -replace 'content="https://ktxsolutions\.com/assets/', "content=`"$baseUrl/assets/"
        $content = $content -replace '"logo":\s*"https://ktxsolutions\.com/assets/', "`"logo`": `"$baseUrl/assets/"
        
        # Add redirect script before closing body tag if not present
        if ($content -notmatch "Clean URL Redirect Script") {
            $redirectScript = @"
    
    <!-- Clean URL Redirect Script -->
    <script>
        // Redirect from .html to clean URL
        if (window.location.pathname.endsWith('.html')) {
            window.location.replace(
                window.location.href.replace(/\.html`$/, '')
            );
        }
    </script>
"@
            $content = $content -replace '(\s*)(<script src="js/main\.js"></script>)', "`$1`$2$redirectScript"
        }
        
        # Remove .html from all internal links (but keep anchors)
        # Match patterns like href="pagename.html" or href="pagename.html#anchor"
        $content = $content -replace 'href="([a-z-]+)\.html(#[^"]*)?  "', 'href="$1$2"'
        
        # Save the file
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "✓ Updated $file"
    }
}

Write-Host "`n✓ All HTML files updated successfully!"
Write-Host "`nClean URLs will now work:"
foreach ($file in $files.Keys) {
    $cleanPath = $files[$file]
    $cleanUrl = if ($cleanPath) { "$baseUrl/$cleanPath" } else { "$baseUrl/" }
    Write-Host "  $cleanUrl"
}
