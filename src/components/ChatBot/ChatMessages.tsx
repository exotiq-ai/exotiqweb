import React from 'react';
import { User, Bot, ExternalLink } from 'lucide-react';

export interface Message {
  id: string;
  type: 'user' | 'bot' | 'action';
  content: string;
  timestamp: Date;
  metadata?: {
    leadScore?: number;
    actionType?: string;
    buttons?: Array<{
      text: string;
      action: string;
      url?: string;
    }>;
  };
}

export interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleActionClick: (action: string, url?: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isTyping, messagesEndRef, handleActionClick }) => (
  <>
    {messages.map((message: Message) => (
      <div key={message.id} className="flex mb-4">
        <div className="flex-1">
          <div
            className={`inline-block rounded-2xl px-4 py-3 shadow-sm max-w-[90vw] md:max-w-2xl break-words ${
              message.type === 'user'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white'
            }`}
          >
            <p className="font-montserrat text-sm leading-relaxed break-words">{message.content}</p>
          </div>
          {/* Action buttons */}
          {message.metadata?.buttons && (
            <div className="mt-2 space-y-2">
              {message.metadata.buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => handleActionClick(button.action, button.url)}
                  className="block w-full text-left px-4 py-3 bg-primary-50 dark:bg-primary-900/20 text-primary-500 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-sm font-medium border border-primary-200 dark:border-primary-800 hover:border-primary-300 dark:hover:border-primary-600 min-h-[44px] touch-manipulation"
                >
                  <div className="flex items-center justify-between min-h-[20px]">
                    <span className="flex-1 pr-2 leading-tight">{button.text}</span>
                    {button.url && <ExternalLink className="w-3 h-3" />}
                  </div>
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center space-x-2 mt-1">
            {message.type === 'user' ? (
              <User className="w-3 h-3 text-gray-400" />
            ) : (
              <Bot className="w-3 h-3 text-gray-400" />
            )}
            <span className="text-xs text-gray-400">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    ))}
    {/* Typing indicator */}
    {isTyping && (
      <div className="flex justify-start">
        <div className="bg-gray-100 dark:bg-dark-700 p-3 rounded-2xl">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    )}
    <div ref={messagesEndRef} />
  </>
);

export default ChatMessages; 