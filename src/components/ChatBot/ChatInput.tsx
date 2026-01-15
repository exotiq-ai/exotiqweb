import React from 'react';
import { Loader, Send, Star } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
  isMobile: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  userProfile: { leadScore: number };
  getLeadScoreColor: (score: number) => string;
  getLeadScoreLabel: (score: number) => string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  isLoading,
  isMobile,
  inputRef,
  userProfile,
  getLeadScoreColor,
  getLeadScoreLabel
}) => (
  <>
    <div className={`border-t border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 ${
      isMobile ? 'p-4 pb-6' : 'p-4'
    } ${isMobile ? 'safe-area-bottom' : ''}`}>
      <div className="flex space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me about fleet management..."
          disabled={isLoading}
          className={`flex-1 px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-500 disabled:opacity-50 resize-none ${
            isMobile ? 'text-base min-h-[48px]' : ''
          }`}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="px-4 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white rounded-xl transition-colors disabled:cursor-not-allowed flex items-center justify-center min-w-[48px] min-h-[48px] touch-manipulation"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
      {/* Lead score indicator */}
      {userProfile.leadScore > 0 && (
        <div className="mt-2 text-center">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getLeadScoreColor(userProfile.leadScore)}`}>
            <Star className="w-3 h-3 mr-1" />
            {getLeadScoreLabel(userProfile.leadScore)}
          </span>
        </div>
      )}
    </div>
  </>
);

export default ChatInput; 