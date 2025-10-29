@echo off
echo ========================================
echo    BTC Dash - Local Web Server
echo ========================================
echo.
echo Starting local web server on port 8000...
echo.
echo You can access the app at:
echo   Main page: http://localhost:8000
echo   Dashboard: http://localhost:8000/frontend/dashboard.html
echo   Index:     http://localhost:8000/frontend/index.html
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000