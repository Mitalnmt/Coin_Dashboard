from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

OLLAMA_URL = "http://localhost:11434/v1/chat/completions"

@app.route("/")
def home():
    return "✅ Flask server is running!"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    # Payload gửi tới Ollama API
    payload = {
        "model": "llama3",  # đổi thành model bạn có, ví dụ llama3
        "messages": [{"role": "user", "content": user_message}]
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response_json = response.json()
        reply = response_json["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0")
