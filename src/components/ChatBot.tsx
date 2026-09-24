import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, RotateCcw, ChevronDown, Check, User, Bot, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

const N8N_WEBHOOK_URL = 'https://inspire123.app.n8n.cloud/webhook/fd72ef00-78bf-4637-9ab6-a639c02b4f33/chat';
const STORAGE_KEY_MESSAGES = 'maison_noir_chat_messages';
const STORAGE_KEY_SESSION = 'maison_noir_chat_session_id';

const QUICK_PROMPTS = [
  'Runway talent availability for Paris Fashion Week',
  'What are the digital polaroid requirements for scouting?',
  'Recommend talent for an editorial jewelry campaign',
  'What are your usage terms and booking rates?',
];

export const openMaisonChat = () => {
  window.dispatchEvent(new CustomEvent('open-maison-chat'));
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for programmatic open requests
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-maison-chat', handleOpen);
    return () => window.removeEventListener('open-maison-chat', handleOpen);
  }, []);

  // Initialize Session ID and load history
  useEffect(() => {
    let storedSession = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!storedSession) {
      storedSession = `mn_session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(STORAGE_KEY_SESSION, storedSession);
    }
    setSessionId(storedSession);

    const savedMessages = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to parse chat messages', e);
      }
    } else {
      // Default welcome message
      const initialMessage: Message = {
        id: 'welcome_1',
        sender: 'agent',
        text: 'Welcome to MAISON NOIR International Model Management.\n\nI am your dedicated AI Concierge connected to our Paris and Milan booking desks. How may I assist your casting brief, talent procurement, or scouting inquiry today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialMessage]);
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify([initialMessage]));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: text,
          sessionId: sessionId || 'default_session',
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      
      // Parse response from n8n (could be { output: "..." } or { text: "..." } or plain string)
      let replyText = '';
      if (typeof data === 'string') {
        replyText = data;
      } else if (data.output) {
        replyText = data.output;
      } else if (data.text) {
        replyText = data.text;
      } else if (data.message) {
        replyText = data.message;
      } else {
        replyText = JSON.stringify(data);
      }

      const agentMsg: Message = {
        id: `agent_${Date.now()}`,
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err: any) {
      console.error('n8n Chat webhook error:', err);
      setErrorMessage('Unable to connect to the Maison Noir booking webhook. Please verify your connection or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    const newSession = `mn_session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(newSession);
    localStorage.setItem(STORAGE_KEY_SESSION, newSession);

    const initialMessage: Message = {
      id: `welcome_${Date.now()}`,
      sender: 'agent',
      text: 'Conversation reset. Welcome to MAISON NOIR. How may I assist your casting or booking inquiry?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialMessage]);
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify([initialMessage]));
    setErrorMessage(null);
  };

  // Format markdown-like text (bold, bullet points, line breaks)
  const renderFormattedText = (content: string) => {
    return content.split('\n').map((line, idx) => {
      // Bold text formatting with **text**
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
      const cleanLine = isBullet ? formattedLine.replace(/^(\*|-)\s/, '') : formattedLine;

      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#e2b868] mt-1 shrink-0 text-xs">·</span>
            <span
              className="text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: cleanLine }}
            />
          </div>
        );
      }

      return (
        <p
          key={idx}
          className="text-xs leading-relaxed my-0.5"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#121216]/95 border border-[#26262e] text-[#b5b5c0] px-3.5 py-1.5 rounded-full text-xs shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-editorial text-sm tracking-wide text-white">AI Concierge</span>
            <span className="text-[#686874]">|</span>
            <span className="text-[11px] text-[#e2b868]">Paris / Milan Desk</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Concierge Chat"
            className="group relative flex items-center justify-center w-14 h-14 bg-[#e2b868] hover:bg-[#edd498] text-black rounded-full shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#e2b868]/50"
          >
            <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-6" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#10b981] border-2 border-[#0c0c0d]" />
            </span>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#111114] border border-[#2b2b35] rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="px-5 py-3.5 bg-[#16161b] border-b border-[#22222a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#1d1d24] border border-[#2e2e38] flex items-center justify-center text-[#e2b868]">
                <Sparkles className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-[#16161b]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-editorial text-lg tracking-wider text-[#f5f5f7]">
                    MAISON NOIR
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#e2b868] bg-[#22222b] px-1.5 py-0.5 rounded">
                    AI CONCIERGE
                  </span>
                </div>
                <div className="text-[10px] text-[#7d7d8a] flex items-center gap-1.5">
                  <span>Connected via n8n Booking Desk</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#10b981]">Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-[#7d7d8a] hover:text-[#d1d1d6] hover:bg-[#202028] rounded-md transition-colors cursor-pointer"
                title="Reset Conversation"
                aria-label="Reset Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#7d7d8a] hover:text-[#f5f5f7] hover:bg-[#202028] rounded-md transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Quick Prompts on initial conversation */}
            {messages.length <= 1 && (
              <div className="space-y-2 py-1">
                <div className="text-[10px] uppercase tracking-wider text-[#70707c] font-medium">
                  Frequently Requested Inquiries
                </div>
                <div className="flex flex-col gap-1.5">
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left text-xs text-[#a0a0ac] hover:text-white bg-[#16161b] hover:bg-[#1e1e26] border border-[#23232c] hover:border-[#383846] px-3 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Render Messages */}
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs shadow-md ${
                      isUser
                        ? 'bg-[#e2b868] text-black font-medium rounded-br-sm'
                        : 'bg-[#18181e] text-[#d6d6df] border border-[#262630] rounded-bl-sm'
                    }`}
                  >
                    {isUser ? (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}
                  </div>
                  <span className="text-[9px] text-[#5c5c67] mt-1 px-1 font-mono tabular-nums">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start space-y-1">
                <div className="bg-[#18181e] border border-[#262630] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5 text-xs text-[#9d9da8]">
                  <span className="text-[11px] text-[#e2b868]">Booking Concierge is drafting</span>
                  <span className="flex gap-1 items-center ml-1">
                    <span className="w-1.5 h-1.5 bg-[#e2b868] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#e2b868] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#e2b868] rounded-full animate-bounce" />
                  </span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-[#241315] border border-[#482024] rounded-xl text-xs text-[#f87171] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>{errorMessage}</p>
                  <button
                    onClick={() => handleSendMessage()}
                    className="text-[11px] underline font-medium hover:text-white"
                  >
                    Retry Sending
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-3.5 bg-[#16161b] border-t border-[#22222a]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about talent, casting, rates, or polaroids..."
                disabled={isLoading}
                className="flex-1 bg-[#121215] border border-[#2b2b35] focus:border-[#e2b868] rounded-xl px-3.5 py-2.5 text-xs text-[#f5f5f7] placeholder-[#666672] focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                aria-label="Send message"
                className="w-9 h-9 bg-[#e2b868] hover:bg-[#edd498] disabled:opacity-40 disabled:hover:bg-[#e2b868] text-black rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 text-center text-[10px] text-[#555560]">
              Direct n8n webhook integration · Paris · Milan · NY · Tokyo
            </div>
          </div>

        </div>
      )}
    </>
  );
};
