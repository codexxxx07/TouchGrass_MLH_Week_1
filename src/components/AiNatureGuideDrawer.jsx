import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Cpu, ShieldAlert, RefreshCw, Feather, Leaf, Clock, Sprout } from 'lucide-react';
import { askNatureGuide, getAiConfig, AI_PROVIDERS } from '../services/aiService';

export default function AiNatureGuideDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Nature Guide 🌿. Tell me how much time you have or what nature topic you want to explore today!',
      meta: { source: getAiConfig().provider, disclosureNotice: 'Ready to assist your real-world outdoor adventures.' }
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend = input) => {
    if (!textToSend || !textToSend.trim()) return;

    const userMsg = textToSend.trim();
    setInput('');

    const newMessages = [...messages, { sender: 'user', text: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const history = newMessages
        .filter(m => m.sender === 'user' || m.sender === 'ai')
        .map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));

      const res = await askNatureGuide(userMsg, history);

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: res.text,
          meta: res.meta
        }
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Nature Guide is currently adjusting. Try a quick walk outdoors while I refresh!',
          meta: { source: AI_PROVIDERS.OFFLINE_FALLBACK, disclosureNotice: 'Offline Fallback Active' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    { label: '30 mins outdoor idea', prompt: 'I have 30 minutes and want to do something outside.' },
    { label: 'Spotting local birds', prompt: 'How do I spot local birds quietly without scaring them?' },
    { label: 'Balcony gardening', prompt: 'Give me beginner-friendly balcony gardening suggestions.' },
    { label: 'Screen fatigue reset', prompt: 'What is a quick 15-minute nature exercise for screen fatigue?' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF6EE] border-l border-[#2D5A27]/20 w-full max-w-md h-full flex flex-col shadow-2xl relative">
        
        {/* Header */}
        <div className="p-4 bg-[#2D5A27] text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-700/80 rounded-xl text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-1.5 text-white">
                AI Nature Guide 🌿
              </h3>
              <p className="text-[11px] text-emerald-200">Powered by Open-Weight Models & Nature Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Foraging Safety Alert */}
        <div className="bg-amber-100/90 text-amber-900 px-3 py-2 text-[11px] flex items-center gap-2 border-b border-amber-300">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Safety Note:</strong> Never consume wild plants or mushrooms identified solely by AI.
          </span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#2D5A27] text-white rounded-br-none shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-900 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>

              {/* Source Disclosure Tag for AI responses */}
              {msg.sender === 'ai' && msg.meta && (
                <div className="mt-1 text-[10px] text-stone-600 flex items-center gap-1 px-1">
                  <Cpu className="w-3 h-3 text-[#2D5A27]" />
                  <span>{msg.meta.disclosureNotice || msg.meta.modelName}</span>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-stone-600 p-3 bg-white/70 rounded-xl border border-stone-200 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-[#2D5A27]" />
              <span>Nature Guide is formulating real-world advice...</span>
            </div>
          )}
        </div>

        {/* Sample Prompt Chips */}
        <div className="px-4 py-2 bg-stone-100/70 border-t border-stone-200 flex flex-wrap gap-1.5">
          {samplePrompts.map((sp, i) => (
            <button
              key={i}
              onClick={() => handleSend(sp.prompt)}
              className="text-[11px] bg-white border border-stone-300 hover:border-[#2D5A27] hover:text-[#2D5A27] text-stone-700 px-2.5 py-1 rounded-full font-medium transition-colors"
            >
              {sp.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Nature Guide (e.g. 30 mins outside)..."
            className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#2D5A27]"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="btn-nature-primary py-2 px-3 text-xs disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
