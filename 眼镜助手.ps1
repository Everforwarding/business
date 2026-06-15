<#
Script:  Yanjing-Assistant (眼镜助手.ps1)
Purpose: One-click start script for frontend and backend (Windows PowerShell).
Usage:
  - Place this script in project root (where package.json is), or run it from anywhere.
  - Run in PowerShell:
      .\眼镜助手.ps1
  - Optionally set preferred ports via env vars before running:
      $env:SITE_FRONTEND_PORT=5173; $env:SITE_BACKEND_PORT=3000; .\眼镜助手.ps1
Notes:
  - The script prefers package.json scripts named 'backend','server','start' (in that order) for backend.
  - If no backend script is found and db.json exists, it will use json-server via npx.
  - Frontend is started with: npm run dev -- --port <port> (Vite).
  - Both services are launched in new PowerShell windows; the script waits for HTTP readiness and opens the frontend URL in the default browser.
#>

# Change to script directory (project root)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $scriptDir
Write-Host "Working directory: $((Get-Location).Path)"

# Check if a TCP port is free by attempting to bind
function Test-PortFree {
    param([int]$Port)
    try {
        $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)
        $listener.Start()
        $listener.Stop()
        return $true
    } catch {
        return $false
    }
}

function Find-FreePort {
    param(
        [int]$Start = 3000,
        [int]$Max = 65535
    )
    for ($p = $Start; $p -le $Max; $p++) {
        if (Test-PortFree -Port $p) { return $p }
    }
    throw "No free port found"
}

# Default ports (can be overridden via environment variables)
$defaultFrontendPort = if ($env:SITE_FRONTEND_PORT) { [int]$env:SITE_FRONTEND_PORT } else { 5173 }
$defaultBackendPort = if ($env:SITE_BACKEND_PORT) { [int]$env:SITE_BACKEND_PORT } else { 3000 }

$frontendPort = if (Test-PortFree -Port $defaultFrontendPort) { $defaultFrontendPort } else { Find-FreePort -Start ($defaultFrontendPort + 1) }
if ($frontendPort -ne $defaultFrontendPort) { Write-Host "Frontend default port $defaultFrontendPort is busy, using $frontendPort" }

$backendPort = if (Test-PortFree -Port $defaultBackendPort) { $defaultBackendPort } else { Find-FreePort -Start ($defaultBackendPort + 1) }
if ($backendPort -ne $defaultBackendPort) { Write-Host "Backend default port $defaultBackendPort is busy, using $backendPort" }

# Detect backend command from package.json or fallback to json-server
$packageJson = $null
if (Test-Path package.json) {
    try { $packageJson = Get-Content package.json -Raw | ConvertFrom-Json } catch { $packageJson = $null }
}

$backendScriptName = $null
if ($packageJson -and $packageJson.scripts) {
    foreach ($name in @('backend','server','start')) {
        if ($packageJson.scripts.PSObject.Properties.Name -contains $name) { $backendScriptName = $name; break }
    }
}

$backendCommand = $null
if ($backendScriptName) {
    $backendCommand = "npm run $backendScriptName -- --port $backendPort"
    Write-Host "Using package.json script: $backendScriptName -> $backendCommand"
} elseif (Test-Path db.json) {
    $backendCommand = "npx json-server --watch db.json --port $backendPort"
    Write-Host "No backend script found, will use json-server: $backendCommand"
} else {
    Write-Host "No backend script or db.json found — skipping backend start."
}

# Start backend (if any) in new PowerShell window
$backendStarted = $false
if ($backendCommand) {
    Write-Host "Starting backend in new PowerShell window: $backendCommand"
    Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit","-Command","cd `"$scriptDir`"; $backendCommand" -WorkingDirectory $scriptDir
    $backendStarted = $true
}

# Start frontend (Vite) in new PowerShell window
$frontendCommand = "npm run dev -- --port $frontendPort"
Write-Host "Starting frontend in new PowerShell window: $frontendCommand"
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit","-Command","cd `"$scriptDir`"; $frontendCommand" -WorkingDirectory $scriptDir

# Wait for HTTP readiness
function Wait-UrlReady {
    param(
        [string]$Url,
        [int]$TimeoutSec = 60
    )
    $start = Get-Date
    while (((Get-Date) - $start).TotalSeconds -lt $TimeoutSec) {
        try {
            $resp = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
            if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 400) { return $true }
        } catch {}
        Start-Sleep -Seconds 1
    }
    return $false
}

$frontendUrl = "http://localhost:$frontendPort"
$backendUrl = "http://localhost:$backendPort"

# Wait for backend (optional)
$backendReady = $true
if ($backendStarted) {
    Write-Host "Waiting for backend ready: $backendUrl (timeout 60s)"
    $backendReady = Wait-UrlReady -Url $backendUrl -TimeoutSec 60
}

# Wait for frontend
Write-Host "Waiting for frontend ready: $frontendUrl (timeout 60s)"
$frontendReady = Wait-UrlReady -Url $frontendUrl -TimeoutSec 60

if ($frontendReady -and $backendReady) {
    Write-Host "All services ready — opening browser: $frontendUrl"
    Start-Process $frontendUrl
    Write-Host "Started: frontend port $frontendPort; backend port $backendPort"
} else {
    Write-Host "Warning: some services did not become ready in time. Frontend:$frontendReady Backend:$backendReady"
    if ($frontendReady) { Start-Process $frontendUrl }
}

Write-Host "Script finished (service windows remain open)."
