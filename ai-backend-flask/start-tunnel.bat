@echo off
echo Starting ngrok tunnel for Flask API...
echo Make sure Flask is running on port 5000 first!
echo.
ngrok http 5000
