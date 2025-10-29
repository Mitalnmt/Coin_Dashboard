'use client';
import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  who: 'user' | 'bot';
  text: string;
}

export default function Page() {
  const [msg, setMsg] = useState('');
  const [items, setItems] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [items]);

  const send = async () => {
    const text = msg.trim();
    if (!text || isLoading) return;

    setItems(prev => [...prev, { who: 'user', text }]);
    setMsg('');
    setIsLoading(true);

    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          history: items.slice(-10).map(item => ({
            role: item.who === 'user' ? 'user' : 'assistant',
            content: item.text
          }))
        })
      });
      
      const data = await r.json();
      
      if (data.reply) {
        setItems(prev => [...prev, { who: 'bot', text: data.reply }]);
      } else {
        setItems(prev => [...prev, { 
          who: 'bot', 
          text: `❌ Error: ${JSON.stringify(data)}` 
        }]);
      }
    } catch (e: any) {
      setItems(prev => [...prev, { 
        who: 'bot', 
        text: `🌐 Network error: ${e?.message || e}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <main style={{
      maxWidth: 800, 
      margin: '40px auto', 
      fontFamily: 'system-ui, Arial',
      padding: '20px',
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          color: '#333', 
          textAlign: 'center', 
          marginBottom: '30px' 
        }}>
          🤖 Next.js ↔ Flask ↔ Ollama
        </h1>

        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '20px' 
        }}>
          <textarea 
            rows={4} 
            style={{
              flex: 1,
              padding: '12px',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontFamily: 'inherit',
              fontSize: '14px',
              resize: 'vertical'
            }}
            value={msg} 
            onChange={e => setMsg(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button 
            onClick={send}
            disabled={isLoading || !msg.trim()}
            style={{
              padding: '12px 24px',
              background: isLoading ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background 0.2s'
            }}
          >
            {isLoading ? '⏳' : 'Send'}
          </button>
        </div>

        <div style={{
          marginTop: '20px',
          border: '1px solid #e1e5e9',
          padding: '16px',
          minHeight: '300px',
          borderRadius: '8px',
          background: '#fafbfc',
          maxHeight: '500px',
          overflowY: 'auto'
        }}>
          {items.length === 0 && (
            <div style={{
              background: '#e9ecef',
              color: '#333',
              padding: '12px 16px',
              borderRadius: '18px 18px 18px 4px',
              margin: '8px 0',
              wordWrap: 'break-word'
            }}>
              👋 Hello! I'm your AI assistant powered by Ollama.
              <br /><br />
              <strong>Setup:</strong>
              <ol>
                <li>Make sure Flask backend is running</li>
                <li>Start ngrok tunnel: <code>ngrok http 5000</code></li>
                <li>Update NEXT_PUBLIC_BACKEND_BASE in .env.local</li>
                <li>Start chatting!</li>
              </ol>
            </div>
          )}
          
          {items.map((item, i) => (
            <div key={i} style={{
              background: item.who === 'user' ? '#007bff' : '#e9ecef',
              color: item.who === 'user' ? '#fff' : '#000',
              padding: '12px 16px',
              borderRadius: item.who === 'user' 
                ? '18px 18px 4px 18px' 
                : '18px 18px 18px 4px',
              margin: '8px 0',
              textAlign: item.who === 'user' ? 'right' : 'left',
              marginLeft: item.who === 'user' ? '20%' : '0',
              marginRight: item.who === 'user' ? '0' : '20%',
              wordWrap: 'break-word'
            }}>
              {item.text}
            </div>
          ))}
          
          {isLoading && (
            <div style={{
              background: '#fff3cd',
              color: '#856404',
              padding: '12px 16px',
              borderRadius: '18px 18px 18px 4px',
              margin: '8px 0',
              border: '1px solid #ffeaa7'
            }}>
              🤔 Thinking...
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>
      </div>
    </main>
  );
}
