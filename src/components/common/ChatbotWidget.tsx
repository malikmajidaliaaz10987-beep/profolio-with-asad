import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Minus, 
  Maximize2, 
  Sparkles, 
  ExternalLink,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { ChatMessage, Message } from './ChatMessage';
import { useProfile } from '../../context/ProfileContext';
import { parseApiJsonResponse } from '../../utils/api';

export const ChatbotWidget: React.FC = () => {
  const { openHireModal } = useProfile();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialWelcomeText = `Hi! 👋 Welcome to Asad Ali Awan's portfolio.

I'm Asad AI, your virtual portfolio assistant.

I can help you explore services, understand available solutions and discuss your next project.

How can I help you today?`;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: initialWelcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const quickActions = [
    'Explore Services',
    'Website Development',
    'SEO & Digital Marketing',
    'AI Chatbot Solutions',
    'Get a Project Quote',
    'Contact Asad',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const userText = textToSend || input;
    if (!userText.trim() || isLoading) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText.trim(),
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await parseApiJsonResponse(response);
      const botText = data.reply || "I am glad to assist with that. Could you share more details about your project goals?";

      // Check if user is asking for quote or to discuss project and offer structured lead card
      const isQuoteIntent =
        userText.toLowerCase().includes('quote') ||
        userText.toLowerCase().includes('hire') ||
        userText.toLowerCase().includes('start project') ||
        userText.toLowerCase().includes('discuss');

      const botMsg: Message = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isLeadCard: isQuoteIntent,
        leadData: isQuoteIntent
          ? {
              fullName: 'Prospective Client',
              email: 'client@example.com',
              country: 'United States',
              service: 'Digital Marketing & Web Development',
              budget: '$1,000–$3,000',
              contactPreference: 'Email',
              projectDescription: userText,
            }
          : undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_err_${Date.now()}`,
          sender: 'bot',
          text: "I apologize, but I experienced a brief connection glitch. Feel free to explore the Services page or contact Asad directly via WhatsApp or email.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmLeadSubmission = async (leadData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          privacyConsent: true,
          source: 'ai_chatbot',
        }),
      });

      const data = await parseApiJsonResponse(response);

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot_conf_${Date.now()}`,
            sender: 'bot',
            text: "✅ Excellent! Your project details have been successfully transmitted directly to Asad Ali Awan's private dashboard. He will review your scope and get in touch within 12–24 hours.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error(data.error || 'Submission error');
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_conf_err_${Date.now()}`,
          sender: 'bot',
          text: "You can also submit via the complete inquiry form or message Asad directly on WhatsApp.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'bot',
        text: initialWelcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          aria-label="Open Asad AI Portfolio Assistant"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#1769FF] via-[#1255d4] to-[#16B89A] text-white font-semibold text-xs shadow-2xl shadow-[#1769FF]/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/20 group"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:inline">Ask Asad AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          role="complementary"
          aria-label="Asad AI Chat Window"
          className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 w-[94vw] sm:w-[410px] bg-[#101827] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden text-white transition-all duration-200 ${
            isMinimized ? 'h-14' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#17243A] border-b border-slate-700/80 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1769FF] to-[#16B89A] flex items-center justify-center text-white shadow-sm">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#17243A]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                  <span>ASAD AI</span>
                  <span className="text-[10px] font-mono text-[#16B89A]">Assistant</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  Ask about services, projects &amp; quotes
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleResetChat}
                title="Restart chat session"
                className="p-1 rounded-md hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1 rounded-md hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1 rounded-md hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#101827]">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    onConfirmLead={handleConfirmLeadSubmission}
                    onOpenFullForm={() => {
                      setIsOpen(false);
                      openHireModal();
                    }}
                  />
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                    <div className="w-2 h-2 rounded-full bg-[#1769FF] animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-[#16B89A] animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] font-mono ml-1">Asad AI is thinking...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions Scroll Strip */}
              <div className="p-2 bg-[#142033] border-t border-slate-800/80 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
                {quickActions.map((qa) => (
                  <button
                    key={qa}
                    onClick={() => handleSendMessage(qa)}
                    className="px-2.5 py-1 rounded-full bg-[#17243A] hover:bg-[#1769FF] hover:text-white text-slate-300 border border-slate-700/60 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {qa}
                  </button>
                ))}
              </div>

              {/* Chat Input Field */}
              <div className="p-3 bg-[#17243A] border-t border-slate-700/80 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about SEO, web dev, pricing, or projects..."
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#1769FF] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    aria-label="Send message"
                    className="p-2 rounded-xl bg-[#1769FF] hover:bg-[#1255d4] disabled:opacity-40 text-white transition-colors cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Asad Ali Awan · Virtual Assistant</span>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      openHireModal();
                    }}
                    className="text-[#1769FF] hover:underline"
                  >
                    Open Full Inquiry Form ›
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
