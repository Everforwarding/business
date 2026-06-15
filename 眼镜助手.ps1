<#
鑴氭湰鍚? 鐪奸暅鍔╂墜.ps1
鐢ㄩ€? 涓€閿惎鍔ㄦ湰椤圭洰鐨勫墠绔拰鍚庣寮€鍙戞湇鍔★紝鑷姩妫€娴嬬鍙ｅ啿绐侊紝鏈嶅姟灏辩华鍚庢墦寮€榛樿娴忚鍣ㄣ€?
浣跨敤鏂规硶:
  1. 灏嗘湰鑴氭湰鏀惧湪椤圭洰鏍圭洰褰曪紙鍚?package.json 鐨勭洰褰曪級锛屾垨浠庝换鎰忎綅缃洿鎺ヨ繍琛屽畠锛屽畠浼氳嚜鍔ㄥ垏鎹㈠埌鑴氭湰鎵€鍦ㄧ洰褰曘€?
  2. 鍦?PowerShell 涓繍琛岋紙鍙兘闇€浠ョ鐞嗗憳/闈炵鐞嗗憳鍧囧彲锛夛細
       .\鐪奸暅鍔╂墜.ps1
  3. 鍙€氳繃璁剧疆鐜鍙橀噺 `SITE_FRONTEND_PORT` 鎴?`SITE_BACKEND_PORT` 鏉ユ寚瀹氶閫夌鍙ｏ紝渚嬪锛?
       $env:SITE_FRONTEND_PORT=5173; $env:SITE_BACKEND_PORT=3000; .\鐪奸暅鍔╂墜.ps1
璇存槑:
  - 鑴氭湰浼氫紭鍏堟煡鎵?package.json 涓殑鍚庣鍚姩鑴氭湰锛堟寜椤哄簭灏濊瘯: backend, server, start锛夛紝鑻ユ壘涓嶅埌鍒欏皾璇曚娇鐢?`npx json-server --watch db.json --port <port>`锛堣姹傛湁 db.json锛夈€?
  - 鍓嶇浣跨敤 `npm run dev -- --port <port>` 鍚姩锛圴ite锛夈€?
  - 鑻ョ鍙ｈ鍗犵敤锛岃剼鏈細鑷姩瀵绘壘涓嬩竴涓彲鐢ㄧ鍙ｅ苟浣跨敤涔嬨€?
  - 鍚姩鐨勬湇鍔′細鍦ㄦ柊鐨?PowerShell 绐楀彛涓繍琛岋紝浠ヤ究鏌ョ湅鏃ュ織銆?
  - 鍚姩鎴愬姛鍚庯紝鑴氭湰浼氬湪榛樿娴忚鍣ㄤ腑鎵撳紑鍓嶇鍦板潃銆?
#>

# 鍒囨崲鍒拌剼鏈墍鍦ㄧ洰褰曪紙椤圭洰鏍癸級
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location -Path $scriptDir
Write-Host "褰撳墠鐩綍锛?$((Get-Location).Path)"

# 鏌ユ壘鍙敤绔彛鍑芥暟
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
    throw "鏈壘鍒板彲鐢ㄧ鍙?
}

# 榛樿绔彛锛屽彲閫氳繃鐜鍙橀噺瑕嗙洊
$defaultFrontendPort = if ($env:SITE_FRONTEND_PORT) { [int]$env:SITE_FRONTEND_PORT } else { 5173 }
$defaultBackendPort = if ($env:SITE_BACKEND_PORT) { [int]$env:SITE_BACKEND_PORT } else { 3000 }

$frontendPort = if (Test-PortFree -Port $defaultFrontendPort) { $defaultFrontendPort } else { Find-FreePort -Start ($defaultFrontendPort + 1) }
if ($frontendPort -ne $defaultFrontendPort) { Write-Host "鍓嶇榛樿绔彛 $defaultFrontendPort 琚崰鐢紝鏀圭敤 $frontendPort" }

$backendPort = if (Test-PortFree -Port $defaultBackendPort) { $defaultBackendPort } else { Find-FreePort -Start ($defaultBackendPort + 1) }
if ($backendPort -ne $defaultBackendPort) { Write-Host "鍚庣榛樿绔彛 $defaultBackendPort 琚崰鐢紝鏀圭敤 $backendPort" }

# 璇诲彇 package.json锛屾娴嬪悗绔剼鏈?
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
    Write-Host "妫€娴嬪埌 package.json 鑴氭湰: $backendScriptName -> $backendCommand"
} elseif (Test-Path db.json) {
    $backendCommand = "npx json-server --watch db.json --port $backendPort"
    Write-Host "鏈娴嬪埌鍚庣鑴氭湰锛屼娇鐢?json-server: $backendCommand"
} else {
    Write-Host "鏈娴嬪埌鍚庣鍚姩鑴氭湰鎴?db.json锛屽悗绔惎鍔ㄥ皢琚烦杩囥€傝嫢闇€瑕侊紝璇峰湪 package.json 涓坊鍔犲惎鍔ㄨ剼鏈垨鎻愪緵 db.json銆?
}

# 鍚姩鍚庣锛堝鏋滄湁锛?
$backendStarted = $false
if ($backendCommand) {
    Write-Host "鍦ㄦ柊 PowerShell 绐楀彛涓惎鍔ㄥ悗绔細 $backendCommand"
    Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit","-Command","cd `"$scriptDir`"; $backendCommand" -WorkingDirectory $scriptDir
    $backendStarted = $true
}

# 鍚姩鍓嶇锛圴ite锛?
$frontendCommand = "npm run dev -- --port $frontendPort"
Write-Host "鍦ㄦ柊 PowerShell 绐楀彛涓惎鍔ㄥ墠绔細 $frontendCommand"
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit","-Command","cd `"$scriptDir`"; $frontendCommand" -WorkingDirectory $scriptDir

# 绛夊緟鏈嶅姟灏辩华鍑芥暟锛堟娴?HTTP锛?
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

# 绛夊緟鍚庣锛堝彲閫夛級
$backendReady = $true
if ($backendStarted) {
    Write-Host "绛夊緟鍚庣灏辩华: $backendUrl (瓒呮椂 60s)"
    $backendReady = Wait-UrlReady -Url $backendUrl -TimeoutSec 60
}

# 绛夊緟鍓嶇
Write-Host "绛夊緟鍓嶇灏辩华: $frontendUrl (瓒呮椂 60s)"
$frontendReady = Wait-UrlReady -Url $frontendUrl -TimeoutSec 60

if ($frontendReady -and $backendReady) {
    Write-Host "鎵€鏈夋湇鍔″凡灏辩华锛屾墦寮€榛樿娴忚鍣?-> $frontendUrl"
    Start-Process $frontendUrl
    Write-Host "鍚姩瀹屾垚锛氬墠绔鍙?$frontendPort; 鍚庣绔彛 $backendPort"
} else {
    Write-Host "璀﹀憡锛氶儴鍒嗘湇鍔℃湭鑳藉湪闄愬畾鏃堕棿鍐呭氨缁€傚墠绔細$frontendReady; 鍚庣锛?backendReady"
    if ($frontendReady) { Start-Process $frontendUrl }
}

Write-Host "鑴氭湰鎵ц缁撴潫锛堟柊绐楀彛涓粛浼氫繚鐣欐湇鍔¤繘绋嬭緭鍑猴級銆?

