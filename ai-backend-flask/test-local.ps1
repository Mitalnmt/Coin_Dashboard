# Test script for local Flask API
Write-Host "Testing local Flask API..." -ForegroundColor Green

# Test health endpoint
Write-Host "`n1. Testing health endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:5000/" -TimeoutSec 5
    Write-Host "✓ Health check passed: $($health | ConvertTo-Json)" -ForegroundColor Green
} catch {
    Write-Host "✗ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure Flask is running: python app.py" -ForegroundColor Yellow
    exit 1
}

# Test chat endpoint
Write-Host "`n2. Testing chat endpoint..." -ForegroundColor Yellow
try {
    $chatBody = @{
        message = "Hello from PowerShell test!"
    } | ConvertTo-Json

    $chat = Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:5000/chat" -ContentType "application/json" -Body $chatBody -TimeoutSec 30
    Write-Host "✓ Chat test passed: $($chat.reply)" -ForegroundColor Green
} catch {
    Write-Host "✗ Chat test failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure Ollama is running: ollama serve" -ForegroundColor Yellow
}

# Test chat with history
Write-Host "`n3. Testing chat with history..." -ForegroundColor Yellow
try {
    $chatWithHistory = @{
        message = "What was my previous question?"
        history = @(
            @{ role = "user"; content = "Hello, my name is Test User" }
            @{ role = "assistant"; content = "Hello Test User! How can I help you today?" }
        )
    } | ConvertTo-Json

    $chatHistory = Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:5000/chat" -ContentType "application/json" -Body $chatWithHistory -TimeoutSec 30
    Write-Host "✓ Chat with history passed: $($chatHistory.reply)" -ForegroundColor Green
} catch {
    Write-Host "✗ Chat with history failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test upload stubs
Write-Host "`n4. Testing upload stubs..." -ForegroundColor Yellow
try {
    $csvStub = Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:5000/upload/csv" -ContentType "application/json" -Body '{}' -TimeoutSec 5
    Write-Host "✓ CSV upload stub: $($csvStub.note)" -ForegroundColor Green
} catch {
    Write-Host "✗ CSV upload stub failed: $($_.Exception.Message)" -ForegroundColor Red
}

try {
    $imgStub = Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:5000/upload/image" -ContentType "application/json" -Body '{}' -TimeoutSec 5
    Write-Host "✓ Image upload stub: $($imgStub.note)" -ForegroundColor Green
} catch {
    Write-Host "✗ Image upload stub failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nLocal API testing complete!" -ForegroundColor Cyan
