import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv

load_dotenv()

FLASK_PORT = int(os.getenv("FLASK_PORT", "5000"))
FLASK_HOST = os.getenv("FLASK_HOST", "0.0.0.0")

OLLAMA_BASE = os.getenv("OLLAMA_BASE", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")
OLLAMA_CHAT_URL = f"{OLLAMA_BASE}/v1/chat/completions"

app = Flask(__name__)
CORS(app)  # allow all origins for simplicity; tighten later if needed

@app.route("/", methods=["GET"])
def health():
    return jsonify(status="ok", service="flask+ollama", model=OLLAMA_MODEL)

@app.route("/chat", methods=["POST"])
def chat():
    """Accepts: { "message": "text", "history": [ {role, content}, ... ]? }"""
    try:
        data = request.get_json(force=True) or {}
        user_message = (data.get("message") or "").strip()
        history = data.get("history") or []  # optional array of {role, content}

        if not user_message:
            return jsonify(error="message is required"), 400

        # Build messages list (system prompt optional later phases)
        messages = []
        # carry over history if provided
        for m in history:
            if isinstance(m, dict) and m.get("role") in ("system", "user", "assistant") and m.get("content"):
                messages.append({"role": m["role"], "content": m["content"]})
        messages.append({"role": "user", "content": user_message})

        payload = {
            "model": OLLAMA_MODEL,
            "messages": messages
        }

        r = requests.post(OLLAMA_CHAT_URL, json=payload, timeout=120)
        r.raise_for_status()
        res = r.json()

        # Defensive parse
        choices = res.get("choices") or []
        if not choices or not choices[0].get("message"):
            return jsonify(error="empty response from model", raw=res), 502

        reply = choices[0]["message"].get("content", "").strip()
        return jsonify(reply=reply)

    except requests.exceptions.RequestException as e:
        return jsonify(error="ollama connection error", detail=str(e)), 502
    except Exception as e:
        return jsonify(error="server error", detail=str(e)), 500

# --- Future stubs (Phase 4) ---
@app.route("/upload/csv", methods=["POST"])
def upload_csv_stub():
    return jsonify(status="todo", note="CSV upload stub; implement in Phase 4"), 501

@app.route("/upload/image", methods=["POST"])
def upload_image_stub():
    return jsonify(status="todo", note="Image upload stub; implement in Phase 4"), 501

if __name__ == "__main__":
    app.run(port=FLASK_PORT, host=FLASK_HOST)
