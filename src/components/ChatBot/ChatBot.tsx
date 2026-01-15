import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Calendar,
  ExternalLink,
  Loader,
  Star,
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';
import { openAIService } from '../../services/openai';
import { analyticsService } from '../../services/analytics';
import { persistenceService } from '../../services/persistence';
import logger from '../../utils/logger';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface Message {
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

interface UserProfile {
  fleetSize?: string;
  experience?: string;
  challenges?: string[];
  interests?: string[];
  leadScore: number;
  name?: string;
  email?: string;
}

interface FleetCopilotProps {
  isOpen: boolean;
  onToggle: () => void;
  sessionId: string;
  isReturningUser: boolean;
}

export default function FleetCopilot({ isOpen, onToggle, sessionId, isReturningUser }: FleetCopilotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({ leadScore: 0 });
  const [conversationStage, setConversationStage] = useState<'greeting' | 'discovery' | 'qualification' | 'conversion'>('greeting');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversation history on mount
  useEffect(() => {
    if (isOpen) {
      loadConversationHistory();
      analyticsService.startConversation(sessionId, userProfile);
      
      // Prevent body scroll on mobile when chat is open
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      }
      
      // Focus input when opened
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // Restore body scroll when chat is closed
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen, sessionId]);

  const loadConversationHistory = () => {
    if (hasInitialized) return; // Prevent duplicate initialization
    
    const savedConversation = persistenceService.loadConversation(sessionId);
    
    if (savedConversation && savedConversation.messages.length > 0) {
      // Convert persisted messages to component messages
      const convertedMessages: Message[] = savedConversation.messages.map(msg => ({
        id: msg.id,
        type: msg.type,
        content: msg.content,
        timestamp: msg.timestamp,
        metadata: msg.metadata
      }));
      
      setMessages(convertedMessages);
      setUserProfile(prev => ({ ...prev, ...savedConversation.userContext, leadScore: savedConversation.leadScore }));
      
      // Determine conversation stage based on message count
      if (convertedMessages.length > 10) {
        setConversationStage('conversion');
      } else if (convertedMessages.length > 5) {
        setConversationStage('qualification');
      } else if (convertedMessages.length > 2) {
        setConversationStage('discovery');
      }
    } else {
      // Start new conversation
      setTimeout(() => {
        addBotMessage(getWelcomeMessage());
      }, 500);
    }
    
    setHasInitialized(true);
  };

  const getWelcomeMessage = () => {
    if (isReturningUser) {
      return "Welcome back! I'm FleetCopilot, your AI assistant for fleet management. How can I help you today?";
    }
    return "Hi there! 👋 I'm FleetCopilot, your AI assistant for fleet management. I'm here to help you optimize your vehicle rental operation. What brings you here today?";
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Save to persistence
    persistenceService.addMessage(sessionId, {
      id: newMessage.id,
      type: newMessage.type,
      content: newMessage.content,
      timestamp: newMessage.timestamp,
      metadata: newMessage.metadata
    });

    // Track analytics
    analyticsService.trackMessage(sessionId, newMessage.type, newMessage.content, userProfile.leadScore);

    return newMessage;
  };

  const addBotMessage = (content: string, metadata?: Message['metadata']) => {
    // Check if content is long and should be chunked
    if (content.length > 200) {
      return addChunkedBotMessage(content, metadata);
    }
    return addMessage({ type: 'bot', content, metadata });
  };

  const addChunkedBotMessage = (content: string, metadata?: Message['metadata']) => {
    // Split content into sentences for better readability
    const sentences = content.split(/(?<=[.!?])\s+/);
    const chunks: string[] = [];
    let currentChunk = '';
    
    sentences.forEach(sentence => {
      if (currentChunk.length + sentence.length > 150) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    });
    
    if (currentChunk) chunks.push(currentChunk.trim());
    
    // Add chunks with delays
    chunks.forEach((chunk, index) => {
      setTimeout(() => {
        if (index === chunks.length - 1) {
          // Add metadata only to the last chunk
          addMessage({ type: 'bot', content: chunk, metadata });
        } else {
          addMessage({ type: 'bot', content: chunk });
        }
      }, index * 1500); // 1.5 second delay between chunks
    });
    
    return null; // Return null since we're adding multiple messages
  };

  const addUserMessage = (content: string) => {
    return addMessage({ type: 'user', content });
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    const newProfile = { ...userProfile, ...updates };
    setUserProfile(newProfile);
    
    // Update persistence
    persistenceService.updateUserContext(sessionId, newProfile);
    if (updates.leadScore !== undefined) {
      persistenceService.updateLeadScore(sessionId, updates.leadScore);
    }
  };

  const calculateLeadScore = (profile: UserProfile): number => {
    let score = 0;
    
    // Fleet size scoring
    if (profile.fleetSize) {
      if (profile.fleetSize.includes('50+')) score += 40;
      else if (profile.fleetSize.includes('16-50')) score += 35;
      else if (profile.fleetSize.includes('6-15')) score += 25;
      else if (profile.fleetSize.includes('1-5')) score += 15;
    }
    
    // Experience scoring
    if (profile.experience) {
      if (profile.experience === 'expert') score += 25;
      else if (profile.experience === 'intermediate') score += 20;
      else if (profile.experience === 'beginner') score += 10;
    }
    
    // Challenge-based scoring
    if (profile.challenges?.length) {
      score += Math.min(profile.challenges.length * 5, 20);
    }
    
    // Interest-based scoring
    if (profile.interests?.includes('scaling')) score += 15;
    if (profile.interests?.includes('automation')) score += 10;
    if (profile.interests?.includes('analytics')) score += 10;
    
    return Math.min(score, 100);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Add user message
    addUserMessage(userMessage);

    try {
      setIsTyping(true);
      
      // Get AI response
      const aiResponse = await openAIService.generateResponse(
        sessionId,
        userMessage,
        userProfile
      );

      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      setIsTyping(false);
      
      // Add AI response
      addBotMessage(aiResponse);

      // Update conversation stage and lead score based on content
      updateConversationFlow(userMessage, aiResponse);

    } catch (error) {
      logger.error('Error getting AI response', { error });
      setIsTyping(false);
      
      // Fallback response
      addBotMessage("I apologize, but I'm having trouble connecting right now. Let me help you with some quick options instead!", {
        buttons: [
          { text: "Schedule a Call", action: "calendar", url: "https://calendly.com/hello-exotiq/15-minute-meeting" },
          { text: "Join Beta List", action: "beta" },
          { text: "Learn More", action: "features" }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateConversationFlow = (userMessage: string, aiResponse: string) => {
    const message = userMessage.toLowerCase();
    
    // Extract fleet size
    if (message.includes('vehicle') || message.includes('car') || message.includes('fleet')) {
      if (message.includes('50') || message.includes('fifty')) {
        updateUserProfile({ fleetSize: '50+ vehicles' });
      } else if (message.includes('20') || message.includes('30') || message.includes('40')) {
        updateUserProfile({ fleetSize: '16-50 vehicles' });
      } else if (message.includes('10') || message.includes('15')) {
        updateUserProfile({ fleetSize: '6-15 vehicles' });
      } else if (message.includes('5') || message.includes('few')) {
        updateUserProfile({ fleetSize: '1-5 vehicles' });
      }
    }

    // Extract experience level
    if (message.includes('new') || message.includes('beginner') || message.includes('starting')) {
      updateUserProfile({ experience: 'beginner' });
    } else if (message.includes('experienced') || message.includes('years') || message.includes('expert')) {
      updateUserProfile({ experience: 'expert' });
    } else if (message.includes('some experience') || message.includes('intermediate')) {
      updateUserProfile({ experience: 'intermediate' });
    }

    // Extract challenges
    const challenges = [];
    if (message.includes('pricing') || message.includes('price')) challenges.push('pricing');
    if (message.includes('maintenance') || message.includes('repair')) challenges.push('maintenance');
    if (message.includes('time') || message.includes('busy')) challenges.push('time_management');
    if (message.includes('scale') || message.includes('grow')) challenges.push('scaling');
    if (message.includes('platform') || message.includes('fee')) challenges.push('platform_fees');
    
    if (challenges.length > 0) {
      updateUserProfile({ challenges: [...(userProfile.challenges || []), ...challenges] });
    }

    // Calculate and update lead score
    const newProfile = { ...userProfile };
    const newScore = calculateLeadScore(newProfile);
    updateUserProfile({ leadScore: newScore });

    // Update conversation stage
    if (newScore >= 70 && conversationStage !== 'conversion') {
      setConversationStage('conversion');
      setTimeout(() => {
        addBotMessage("Based on our conversation, Exotiq sounds like a perfect fit for your operation! Ready to see how we can help you scale?", {
          buttons: [
            { text: "Quick 15-min Chat", action: "calendar", url: "https://calendly.com/hello-exotiq/15-minute-meeting" },
            { text: "30-min Strategy Call", action: "calendar", url: "https://calendly.com/hello-exotiq/30min" }
          ]
        });
      }, 2000);
    } else if (newScore >= 40 && conversationStage === 'greeting') {
      setConversationStage('qualification');
    } else if (newScore >= 20 && conversationStage === 'greeting') {
      setConversationStage('discovery');
    }
  };

  const handleActionClick = (action: string, url?: string) => {
    analyticsService.trackAction(sessionId, action, { url });

    if (url) {
      window.open(url, '_blank');
    }

    switch (action) {
      case 'calendar':
        addBotMessage("Perfect! I've opened our calendar in a new tab. Choose a time that works best for you - looking forward to our conversation!");
        break;
      case 'beta':
        addBotMessage("Excellent! I've added you to our priority beta list. You'll be among the first to get access when we launch!");
        break;
      case 'features':
        addBotMessage("You can explore our platform features on the main site. What specific aspect of fleet management interests you most?");
        break;
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getLeadScoreLabel = (score: number) => {
    if (score >= 70) return 'Hot Lead';
    if (score >= 40) return 'Warm Lead';
    return 'Cold Lead';
  };

  if (!isOpen) return null;

  // Mobile full-screen layout
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <div className={`fixed z-50 ${
      isMobile 
        ? 'inset-0' 
        : 'bottom-4 right-4'
    }`}>
      <div className={`bg-white dark:bg-dark-800 shadow-2xl border border-gray-200 dark:border-dark-700 flex flex-col overflow-hidden ${
        isMobile 
          ? 'w-full h-full rounded-none' 
          : 'w-96 h-[600px] rounded-2xl'
      }`}>
        {/* Header */}
        <div className={`bg-gradient-to-r from-primary-500 to-accent-600 text-white ${
          isMobile ? 'p-4 pt-6' : 'p-4'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-dfaalt font-bold text-lg">FleetCopilot</h3>
                <p className="text-sm opacity-90">AI Fleet Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {userProfile.leadScore > 0 && (
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getLeadScoreColor(userProfile.leadScore)}`}>
                  {userProfile.leadScore}/100
                </div>
              )}
              <button
                onClick={onToggle}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={messagesContainerRef}
          className={`flex-1 overflow-y-auto space-y-4 ${
            isMobile ? 'p-4 pb-2' : 'p-4'
          }`}
          style={{
            // Ensure proper scrolling on mobile
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          <ChatMessages
            messages={messages}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
            handleActionClick={handleActionClick}
          />
          
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
        </div>

        {/* Input */}
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
          isMobile={isMobile}
          inputRef={inputRef}
          userProfile={userProfile}
          getLeadScoreColor={getLeadScoreColor}
          getLeadScoreLabel={getLeadScoreLabel}
        />
      </div>
    </div>
  );
}