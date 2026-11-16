import React from 'react';
import { Bot, User } from 'lucide-react';

export interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  isLeadCard?: boolean;
  leadData?: any;
}

interface ChatMessageProps {
  message: Message;
  onConfirmLead?: (lead: any) => void;
  onOpenFullForm?: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onConfirmLead,
  onOpenFullForm,
}) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200`}>
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1769FF] to-[#16B89A] flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div className={`max-w-[85%] space-y-1.5 ${isBot ? 'items-start' : 'items-end'}`}>
        <div
          className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap break-words ${
            isBot
              ? 'bg-[#17243A] text-slate-100 border border-slate-700/80 rounded-tl-sm shadow-sm'
              : 'bg-[#1769FF] text-white rounded-tr-sm shadow-md'
          }`}
        >
          {message.text}

          {message.isLeadCard && message.leadData && (
            <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2 text-slate-200">
              <div className="font-semibold text-white border-b border-slate-700 pb-1 flex items-center justify-between">
                <span>Inquiry Confirmation</span>
                <span className="text-[10px] text-[#16B89A]">Ready to submit</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div><span className="text-slate-400">Name:</span> {message.leadData.fullName}</div>
                <div><span className="text-slate-400">Email:</span> {message.leadData.email}</div>
                <div><span className="text-slate-400">Country:</span> {message.leadData.country}</div>
                <div><span className="text-slate-400">Service:</span> {message.leadData.service}</div>
                <div><span className="text-slate-400">Budget:</span> {message.leadData.budget}</div>
                <div><span className="text-slate-400">Contact:</span> {message.leadData.contactPreference}</div>
              </div>
              {onConfirmLead && (
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => onConfirmLead(message.leadData)}
                    className="w-full py-1.5 px-3 bg-[#16B89A] hover:bg-[#139c82] text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors text-center"
                  >
                    Confirm &amp; Send to Asad
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`text-[10px] text-slate-400 font-mono px-1 ${isBot ? 'text-left' : 'text-right'}`}>
          {message.timestamp}
        </div>
      </div>

      {!isBot && (
        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white shrink-0 mt-0.5">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
