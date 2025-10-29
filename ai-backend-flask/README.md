# AI Backend Flask + Ollama

Local AI backend powered by Ollama (llama3) with Flask API and web frontends.

## Quick Setup

### 1. Install & Run Backend

```powershell
cd ai-backend-flask
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy env.example .env
python app.py
```

### 2. Test Local API

**PowerShell:**
```powershell
Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:5000/chat" -ContentType "application/json" -Body '{"message":"Hello from Flask"}'
```

**Bash/curl:**
```bash
curl -s -X POST "http://127.0.0.1:5000/chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello from Flask"}'
```

### 3. Expose Publicly (ngrok)

```powershell
ngrok http 5000
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok-free.app`)

### 4. Frontend Options

- **Vanilla HTML**: Update `API_BASE` in `frontend-vanilla/script.js`
- **Next.js**: Update `NEXT_PUBLIC_BACKEND_BASE` in `.env.local`

## API Endpoints

- `GET /` - Health check
- `POST /chat` - Chat with AI
- `POST /upload/csv` - CSV upload (stub)
- `POST /upload/image` - Image upload (stub)

## Chat Request Format

```json
{
  "message": "Your question here",
  "history": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```

## Response Format

```json
{
  "reply": "AI response here"
}
```
