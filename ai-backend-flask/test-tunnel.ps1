# Test script for ngrok tunnel
# Usage: .\test-tunnel.ps1 -TunnelUrl "https://your-subdomain.ngrok-free.app"

param(
    [Parameter(Mandatory=$true)]
    [string]$TunnelUrl
)

Write-Host "Testing tunnel URL: $TunnelUrl" -ForegroundColor Green

# Test health endpoint
Write-Host "`n1. Testing health endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Method Get -Uri "$TunnelUrl/" -TimeoutSec 10
    Write-Host "✓ Health check passed: $($health | ConvertTo-Json)" -ForegroundColor Green
} catch {
    Write-Host "✗ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test chat endpoint
Write-Host "`n2. Testing chat endpoint..." -ForegroundColor Yellow
try {
    $chatBody = @{
        message = "Hello from PowerShell test!"
    } | ConvertTo-Json

    $chat = Invoke-RestMethod -Method Post -Uri "$TunnelUrl/chat" -ContentType "application/json" -Body $chatBody -TimeoutSec 30
    Write-Host "✓ Chat test passed: $($chat.reply)" -ForegroundColor Green
} catch {
    Write-Host "✗ Chat test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTunnel testing complete!" -ForegroundColor Cyan
