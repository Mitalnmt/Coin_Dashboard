# Test script for Ollama direct connection
Write-Host "Testing Ollama direct connection..." -ForegroundColor Green

try {
    $ollamaBody = @{
        model = "llama3"
        messages = @(
            @{ role = "user"; content = "Ping?" }
        )
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Method Post -Uri "http://localhost:11434/v1/chat/completions" -ContentType "application/json" -Body $ollamaBody -TimeoutSec 30
    
    if ($response.choices -and $response.choices[0].message.content) {
        Write-Host "✓ Ollama direct test passed: $($response.choices[0].message.content)" -ForegroundColor Green
    } else {
        Write-Host "✗ Ollama response format unexpected: $($response | ConvertTo-Json)" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Ollama direct test failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure Ollama is running: ollama serve" -ForegroundColor Yellow
    Write-Host "Make sure llama3 model is pulled: ollama pull llama3" -ForegroundColor Yellow
}
