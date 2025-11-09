@echo off
title 🚀 Start Full Coin Dashboard Stack

:: 1️⃣ Khởi động Ollama server trong cửa sổ mới
start "Ollama Server" cmd /k ollama serve

:: 2️⃣ Khởi động Flask backend (trong ai-backend-flask)
cd ai-backend-flask
if not exist venv (
    echo [*] Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
if not exist .env (
    echo [*] Copying environment file...
    copy env.example .env
)
start "Flask Backend" cmd /k python app.py
cd ..

:: 3️⃣ Khởi động ngrok
start "Ngrok Tunnel" cmd /k ngrok http 5000

:: 4️⃣ Chạy file start-server.bat (nếu có)
start "Frontend" cmd /k start-server.bat

echo ✅ All services launched successfully!
pause

