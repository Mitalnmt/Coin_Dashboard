@echo off
echo Starting AI Backend System...
echo.

echo 1. Starting Flask API...
start "Flask API" cmd /k "cd /d %~dp0 && python app.py"

echo 2. Waiting for Flask to start...
timeout /t 3 /nobreak > nul

echo 3. Starting ngrok tunnel...
start "ngrok Tunnel" cmd /k "ngrok http 5000"

echo.
echo ✅ Both Flask and ngrok are starting...
echo.
echo Next steps:
echo 1. Wait for ngrok to show the public URL
echo 2. Copy the HTTPS URL (e.g., https://isaiah-pretonic-tory.ngrok-free.dev)
echo 3. Update your frontend with the ngrok URL
echo 4. Test with: .\test-local.ps1
echo.
pause
