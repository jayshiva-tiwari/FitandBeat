"use client";
import { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/src/utils/cn';

const INITIAL_MSGS = [
  { role: 'assistant', content: 'Hi there! I am your FitandBeat AI Coach. How can I help you reach your fitness goals today?' }
];

export default function Coach() {
  const [messages, setMessages] = useState(INITIAL_MSGS);
  const [input, setInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const newMsg = { role: 'user', content: input };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages.filter(m => m.role !== 'system') }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message || 'Unknown error'}. Please try again.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-indigo-600" /> FitandBeat Coach
        </h1>
        <p className="text-slate-500 mt-1">Your personal AI fitness assistant</p>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-4 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'user' ? "bg-slate-900 text-white" : "bg-indigo-100 text-indigo-600"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-[15px] leading-relaxed",
                msg.role === 'user' 
                  ? "bg-indigo-600 text-white rounded-tr-sm" 
                  : "bg-slate-100 text-slate-800 rounded-tl-sm"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        
        {isLoading && (
          <div className="px-6 pb-6">
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100 text-indigo-600">
                <Bot className="w-6 h-6" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 text-slate-800 rounded-tl-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-2xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for a workout, advice, or motivation..." 
              className="flex-1 bg-transparent px-3 py-2 outline-none text-slate-700 font-medium placeholder:text-slate-400"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
            {['Suggest a 10 min workout', 'I feel sore today', 'Which sport is best for me?'].map((suggestion, i) => (
              <button 
                key={i}
                onClick={() => setInput(suggestion)} 
                className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition shrink-0"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
