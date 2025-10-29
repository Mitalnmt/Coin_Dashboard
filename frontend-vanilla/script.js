// Default API base - update with your ngrok URL
let API_BASE = "https://your-subdomain.ngrok-free.app";

const $msg = document.getElementById('message');
const $send = document.getElementById('send');
const $chat = document.getElementById('chat');
const $apiUrl = document.getElementById('apiUrl');

// Load saved API URL
const savedApiUrl = localStorage.getItem('ai-chat-api-url');
if (savedApiUrl) {
    API_BASE = savedApiUrl;
    $apiUrl.value = savedApiUrl;
}

// Save API URL when changed
$apiUrl.addEventListener('input', (e) => {
    API_BASE = e.target.value.trim();
    localStorage.setItem('ai-chat-api-url', API_BASE);
});

function addMsg(text, who) {
  const div = document.createElement('div');
  div.className = who === 'user' ? 'msg-user' : 'msg-bot';
  div.textContent = text;
  $chat.appendChild(div);
  $chat.scrollTop = $chat.scrollHeight;
}

function addStatus(text, type = 'loading') {
  const div = document.createElement('div');
  div.className = `status ${type}`;
  div.textContent = text;
  $chat.appendChild(div);
  $chat.scrollTop = $chat.scrollHeight;
  return div;
}

function removeStatus(statusDiv) {
  if (statusDiv && statusDiv.parentNode) {
    statusDiv.parentNode.removeChild(statusDiv);
  }
}

// Chat history for context
let chatHistory = [];

$send.onclick = async () => {
  const text = $msg.value.trim();
  if (!text) return;
  
  if (!API_BASE || API_BASE.includes('your-subdomain')) {
    addStatus('Please set a valid API URL above!', 'error');
    return;
  }

  addMsg(text, 'user');
  $msg.value = '';
  $send.disabled = true;

  // Add to history
  chatHistory.push({ role: 'user', content: text });

  const statusDiv = addStatus('🤔 Thinking...');

  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: text,
        history: chatHistory.slice(-10) // Keep last 10 messages for context
      })
    });
    
    removeStatus(statusDiv);
    
    const data = await res.json();
    
    if (data.reply) {
      addMsg(data.reply, 'bot');
      chatHistory.push({ role: 'assistant', content: data.reply });
    } else {
      addStatus(`❌ Error: ${JSON.stringify(data)}`, 'error');
    }
  } catch (e) {
    removeStatus(statusDiv);
    addStatus(`🌐 Network error: ${e.message}`, 'error');
  } finally {
    $send.disabled = false;
    $msg.focus();
  }
};

// Allow Enter to send (Shift+Enter for new line)
$msg.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    $send.click();
  }
});

// Auto-focus message input
$msg.focus();
