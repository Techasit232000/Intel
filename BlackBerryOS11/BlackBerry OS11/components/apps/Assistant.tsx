import React, { useState, useRef, useEffect } from 'react';
    import { Mic, Send, Bot, Loader2 } from 'lucide-react';
    import { generateAssistantResponse } from '../../services/geminiService';
    
    interface Message {
      id: number;
      text: string;
      sender: 'user' | 'bot';
    }
    
    const Assistant: React.FC = () => {
      const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello. I am the BlackBerry Assistant. Monitoring Neural Link status: Normal.", sender: 'bot' }
      ]);
      const [input, setInput] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const endOfMessagesRef = useRef<HTMLDivElement>(null);
    
      const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
    
      useEffect(scrollToBottom, [messages]);
    
      const handleSend = async () => {
        if (!input.trim()) return;
    
        const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);
    
        const responseText = await generateAssistantResponse(input, "User is currently viewing the Neural Link Dashboard.");
        
        const botMsg: Message = { id: Date.now() + 1, text: responseText, sender: 'bot' };
        setMessages(prev => [...prev, botMsg]);
        setIsLoading(false);
      };
    
      return (
        <div className="h-full bg-gray-950 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-800 flex items-center bg-black/50">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center mr-3 font-bold">
              <Bot size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-white">Assistant</h2>
              <p className="text-xs text-gray-500">Powered by Gemini</p>
            </div>
          </div>
    
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-none">
                  <Loader2 size={16} className="animate-spin text-gray-400" />
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
    
          {/* Input Area */}
          <div className="p-4 bg-black border-t border-gray-800">
            <div className="flex items-center space-x-2 bg-gray-900 rounded-full px-4 py-2 border border-gray-800">
              <Mic size={20} className="text-gray-400 cursor-pointer hover:text-white transition-colors" />
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Neural Assistant..."
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-gray-500"
              />
              <button onClick={handleSend} disabled={!input.trim() || isLoading}>
                <Send size={20} className={`${input.trim() ? 'text-blue-500' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    export default Assistant;