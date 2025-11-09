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
    """Accepts: { "message": "text", "history": [ {role, content}, ... ]?, "attachments": [...]? }"""
    try:
        data = request.get_json(force=True) or {}
        user_message = (data.get("message") or "").strip()
        history = data.get("history") or []  # optional array of {role, content}
        attachments = data.get("attachments") or []  # optional array of file/image attachments

        if not user_message:
            return jsonify(error="message is required"), 400

        # Build messages list (system prompt optional later phases)
        messages = []
        # carry over history if provided
        for m in history:
            if isinstance(m, dict) and m.get("role") in ("system", "user", "assistant") and m.get("content"):
                messages.append({"role": m["role"], "content": m["content"]})
        
        # Build user message with attachments if any
        user_content = []
        
        # Add text message
        if user_message:
            user_content.append({"type": "text", "text": user_message})
        
        # Add image attachments
        for att in attachments:
            if att.get("type") == "image" and att.get("data"):
                # Extract base64 data (remove data:image/...;base64, prefix if present)
                image_data = att["data"]
                if "," in image_data:
                    image_data = image_data.split(",", 1)[1]
                user_content.append({
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/{att.get('mimeType', 'jpeg').split('/')[-1]};base64,{image_data}"
                    }
                })
            elif att.get("type") == "file" and att.get("content"):
                # For text files, append content to message text
                file_content = att["content"]
                file_name = att.get("name", "file")
                # Limit file content preview to avoid token limits
                if len(file_content) > 10000:
                    file_content = file_content[:10000] + "\n\n[File truncated - showing first 10000 characters]"
                user_content.append({
                    "type": "text",
                    "text": f"\n\n[File: {file_name}]\n{file_content}"
                })
        
        # If only text, use simple format; otherwise use content array
        if len(user_content) == 1 and user_content[0]["type"] == "text":
            messages.append({"role": "user", "content": user_content[0]["text"]})
        else:
            messages.append({"role": "user", "content": user_content})

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
