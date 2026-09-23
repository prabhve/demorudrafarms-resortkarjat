import React, { useState, useRef, useEffect } from 'react';
import { RESORT_META } from '../data/resortData';
import { X, Send, Sparkles, MessageCircle, Bot, User } from 'lucide-react';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Namaste! I am the Rudra Farms AI Concierge. How may I assist you with villa reservations, swimming pool access, meal plans, or driving directions to Vinegaon Karjat?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.slice(-4)
        })
      });

      const data = await res.json();
      const reply = data.reply || "I'd be delighted to assist. You can also reach our host directly on WhatsApp (+91 90829 51341)!";

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'Rudra Farms & Resort in Vinegaon, Karjat features a private pool, 4-acre lawns, and authentic farm-to-table cuisine. You can WhatsApp our host directly at +91 90829 51341 for immediate assistance!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    'How do I reach from Mumbai / Pune?',
    'Are pets allowed at the resort?',
    'What is on the authentic farm food menu?',
    'Can we book the whole 4BHK villa for 16-20 guests?'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white text-stone-900 shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Chat Top Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="font-brand text-base font-bold text-stone-900 flex items-center gap-2">
                <span>Rudra AI Concierge</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Online" />
              </div>
              <div className="text-[11px] text-stone-600 font-medium">
                Rudra Farms Karjat · 24/7 Virtual Host
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${RESORT_META.whatsapp}?text=Hi%20Rudra%20Farms,%20I%20am%20chatting%20with%20your%20assistant%20and%20would%20like%20to%20speak%20with%20a%20human.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
              title="Switch to WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#faf8f5]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-200 text-amber-800'
                }`}
              >
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className={`max-w-[80%] space-y-1 ${m.sender === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-stone-900 text-white rounded-tr-none'
                      : 'bg-white text-stone-800 rounded-tl-none border border-stone-200'
                  }`}
                >
                  {m.text}
                </div>
                <div className="text-[10px] text-stone-500 px-1">{m.time}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-stone-600 p-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-600" />
              <span>Rudra Concierge is responding...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-stone-50 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-white border border-stone-300 text-stone-700 hover:border-amber-500 hover:text-stone-950 whitespace-nowrap transition-colors cursor-pointer shadow-xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-stone-200 bg-white flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about villa price, pool, food menu, location..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-stone-50 text-stone-900 outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || loading}
            className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
