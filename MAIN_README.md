# 🤖 AI Backend System - Ollama + Flask + Web Frontends

Complete local AI system with Ollama (llama3), Flask API, and multiple web frontends. Includes ngrok tunneling for public access and file upload stubs.

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────┐
│   Web Frontend  │───▶│  ngrok Tunnel │───▶│ Flask API   │
│  (HTML/Next.js) │    │  (Public)    │    │ (Port 5000) │
└─────────────────┘    └──────────────┘    └─────────────┘
                                                      │
                                                      ▼
                                               ┌─────────────┐
                                               │   Ollama    │
                                               │ (Port 11434)│
                                               └─────────────┘
```

## 🚀 Quick Start

### 1. Prerequisites

- **Ollama**: Install and run `ollama serve`
- **Python 3.8+**: For Flask backend
- **Node.js 18+**: For Next.js frontend
- **ngrok**: For public tunneling

### 2. Backend Setup

```powershell
# Clone and setup
cd ai-backend-flask
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy env.example .env

# Test Ollama first
.\test-ollama.ps1

# Start everything
.\start-all.bat
```

### 3. Frontend Setup

**Option A: Vanilla HTML (GitHub Pages ready)**
```bash
cd frontend-vanilla
# Open index.html in browser
# Update API_BASE in script.js with your ngrok URL
```

**Option B: Next.js (Development)**
```bash
cd next-ai
npm install
cp env.local.example .env.local
# Edit .env.local with your ngrok URL
npm run dev
# Open http://localhost:3001
```

## 🧪 Testing

### Local API Tests
```powershell
# Test Flask API
.\test-local.ps1

# Test Ollama direct
.\test-ollama.ps1

# Test via tunnel (replace with your ngrok URL)
.\test-tunnel.ps1 -TunnelUrl "https://your-subdomain.ngrok-free.app"
```

### Manual Tests

**PowerShell:**
```powershell
Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:5000/chat" -ContentType "application/json" -Body '{"message":"Hello from PowerShell"}'
```

**Bash/curl:**
```bash
curl -X POST "http://127.0.0.1:5000/chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello from curl"}'
```

## 📁 Project Structure

```
├── ai-backend-flask/          # Flask API + Ollama integration
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── env.example           # Environment variables template
│   ├── start-all.bat         # Start Flask + ngrok
│   ├── test-*.ps1            # Test scripts
│   └── README.md             # Backend documentation
│
├── frontend-vanilla/          # Vanilla HTML + JS frontend
│   ├── index.html            # Chat interface
│   ├── script.js             # API communication
│   └── README.md             # Frontend docs
│
├── next-ai/                   # Next.js frontend
│   ├── app/
│   │   ├── page.tsx          # Main chat component
│   │   └── api/chat/route.ts # API proxy
│   ├── package.json          # Dependencies
│   ├── next.config.js        # Next.js config
│   └── README.md             # Next.js docs
│
└── MAIN_README.md            # This file
```

## 🔧 API Endpoints

### Flask API (Port 5000)

- `GET /` - Health check
- `POST /chat` - Chat with AI
- `POST /upload/csv` - CSV upload (stub)
- `POST /upload/image` - Image upload (stub)

### Request Format

```json
{
  "message": "Your question here",
  "history": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```

### Response Format

```json
{
  "reply": "AI response here"
}
```

## 🌐 Frontend Options

### 1. Vanilla HTML (GitHub Pages)
- ✅ No build process
- ✅ Works on GitHub Pages
- ✅ Simple and fast
- ✅ Local storage for API URL

### 2. Next.js (Development)
- ✅ TypeScript support
- ✅ API proxy for CORS
- ✅ Modern React features
- ✅ Production ready

## 🔒 Security Notes

- CORS is open for development (restrict in production)
- ngrok URLs are public (use paid plan for fixed URLs)
- No authentication (add if needed)
- Ollama runs locally (secure)

## 🚀 Production Deployment

### Backend
- Use production WSGI server (gunicorn)
- Set up proper CORS origins
- Use environment variables for secrets
- Consider Cloudflare Tunnel for stable URLs

### Frontend
- Build Next.js: `npm run build`
- Deploy to Vercel/Netlify
- Update API URLs for production

## 🐛 Troubleshooting

### Ollama Issues
```bash
# Check if Ollama is running
ollama list

# Pull llama3 model
ollama pull llama3

# Start Ollama server
ollama serve
```

### Flask Issues
```powershell
# Check if port 5000 is free
netstat -an | findstr :5000

# Test Flask directly
python app.py
```

### ngrok Issues
```bash
# Check ngrok status
ngrok http 5000 --log=stdout

# Use different port if 5000 is busy
ngrok http 5001
```

## 📝 Next Steps

1. **File Upload**: Implement CSV/image processing
2. **Memory**: Add persistent chat history
3. **Authentication**: Add user management
4. **Models**: Support multiple Ollama models
5. **UI**: Enhanced chat interface
6. **Deployment**: Production setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Happy coding! 🚀**
