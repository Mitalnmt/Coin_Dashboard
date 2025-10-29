import requests

response = requests.post(
    "http://localhost:11434/v1/chat/completions",
    json={
        "model": "mistral",
        "messages": [{"role": "user", "content": "Hello từ Python!"}]
    }
)

print(response.json())
