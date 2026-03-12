$ErrorActionPreference = "Stop"

$port = 3002
$root = Join-Path $PSScriptRoot "build"
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $requestPath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))

        if ([string]::IsNullOrWhiteSpace($requestPath)) {
            $requestPath = "index.html"
        }

        $filePath = Join-Path $root $requestPath
        if ((Test-Path $filePath) -and (Get-Item $filePath).PSIsContainer) {
            $filePath = Join-Path $filePath "index.html"
        }

        if (-not (Test-Path $filePath)) {
            $filePath = Join-Path $root "index.html"
        }

        $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
        $contentType = switch ($extension) {
            ".html" { "text/html; charset=utf-8" }
            ".js" { "application/javascript; charset=utf-8" }
            ".css" { "text/css; charset=utf-8" }
            ".json" { "application/json; charset=utf-8" }
            ".svg" { "image/svg+xml" }
            ".jpg" { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".png" { "image/png" }
            ".pdf" { "application/pdf" }
            ".map" { "application/json; charset=utf-8" }
            default { "application/octet-stream" }
        }

        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $context.Response.StatusCode = 200
        $context.Response.ContentType = $contentType
        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        $context.Response.OutputStream.Close()
    }
}
finally {
    $listener.Stop()
    $listener.Close()
}
