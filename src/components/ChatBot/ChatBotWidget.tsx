import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Zap } from 'lucide-react';
import FleetCopilot from './ChatBot';
import { useChatBot } from '../../hooks/useChatBot';

export default function ChatBotWidget() {
  const { isOpen, toggleChatBot, sessionId, isReturningUser } = useChatBot();
  const [showPulse, setShowPulse] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide pulse animation after user interacts
  useEffect(() => {
    if (isOpen) {
      setShowPulse(false);
    }
  }, [isOpen]);

  // Auto-show pulse after 30 seconds if not interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPulse(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className={`fixed z-50 ${
          isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'
        }`}>
          <button
            onClick={toggleChatBot}
            className={`group relative flex items-center justify-center bg-gradient-to-r from-primary-500 to-accent-600 hover:from-primary-600 hover:to-accent-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 touch-manipulation ${
              isMobile ? 'w-14 h-14' : 'w-16 h-16'
            } ${
              showPulse ? 'animate-pulse' : ''
            }`}
            aria-label="Open FleetCopilot Chat"
          >
            <MessageSquare className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
            
            {/* Pulse rings */}
            {showPulse && (
              <>
                <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20"></div>
                <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-10" style={{ animationDelay: '0.5s' }}></div>
              </>
            )}
            
            {/* Tooltip */}
            <div className={`absolute right-full mr-3 px-3 py-2 bg-dark-900 text-white text-sm rounded-lg transition-opacity duration-200 whitespace-nowrap ${isMobile ? 'hidden' : 'opacity-0 group-hover:opacity-100'}`}>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Chat with FleetCopilot</span>
              </div>
              <div className="absolute top-1/2 left-full w-0 h-0 border-l-4 border-l-dark-900 border-t-4 border-t-transparent border-b-4 border-b-transparent transform -translate-y-1/2"></div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <FleetCopilot 
          isOpen={isOpen}
          onToggle={toggleChatBot}
          sessionId={sessionId}
          isReturningUser={isReturningUser}
        />
      )}
    </>
  );
}