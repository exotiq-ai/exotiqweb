import logger from '../utils/logger';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface UserContext {
  fleetSize?: string;
  experience?: string;
  challenges?: string[];
  interests?: string[];
  leadScore?: number;
  name?: string;
  email?: string;
}

export class OpenAIService {
  private static instance: OpenAIService;
  private conversationHistory: Map<string, ChatMessage[]> = new Map();

  static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  async generateResponse(
    sessionId: string,
    userMessage: string,
    userContext: UserContext = {}
  ): Promise<string> {
    try {
      // Get conversation history for context
      const conversationHistory = this.conversationHistory.get(sessionId) || [];
      
      // Call backend AI service
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl) {
        throw new Error('Supabase URL not configured');
      }
      
      if (!supabaseKey) {
        throw new Error('Supabase anon key not configured');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/chatbot-ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
          userContext,
          conversationHistory: conversationHistory.slice(-20) // Send last 20 messages for context
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'AI service error');
      }

      const aiResponse = result.response;

      // Update local conversation history
      let history = conversationHistory;
      history.push(
        { role: 'user', content: userMessage },
        { role: 'assistant', content: aiResponse }
      );

      // Keep last 40 messages (20 exchanges) to manage memory
      if (history.length > 40) {
        history = history.slice(-40);
      }
      
      this.conversationHistory.set(sessionId, history);

      return aiResponse;
    } catch (error) {
      logger.error('OpenAI API Error', { error, sessionId });
      
      // Fallback to rule-based response
      return this.getFallbackResponse(userMessage, userContext);
    }
  }

  private getFallbackResponse(userMessage: string, userContext: UserContext): string {
    const message = userMessage.toLowerCase();
    
    // Simple keyword-based fallback responses
    if (message.includes('fleet') || message.includes('vehicle')) {
      return "I'd love to learn more about your fleet! What's your current setup like, and what challenges are you facing?";
    }
    
    if (message.includes('pricing') || message.includes('cost')) {
      return "Our pricing is simple: $39/vehicle/month for Pro (1–15 vehicles) and $29/vehicle/month for Business (16–50 vehicles). All features included on every plan, and you can start with a 14-day free trial — no credit card required. What's your current fleet size?";
    }
    
    if (message.includes('beta') || message.includes('trial')) {
      return "We'll put you on the list for first access to beta when available! We're working diligently on building something special. What type of fleet operation are you running?";
    }
    
    if (message.includes('demo') || message.includes('call')) {
      return "I'd be happy to connect you with our team! For general questions, we have 15-min slots available. For serious operators or investors, we offer 30-min deep dives. Which would work better for you?";
    }
    
    return "Thanks for reaching out! I'm here to help with any fleet management questions. What would you like to know about Exotiq or fleet operations in general?";
  }

  updateUserContext(sessionId: string, context: Partial<UserContext>): void {
    // Context is now handled by the backend, but we can store it locally for reference
    // This method is kept for compatibility
  }

  clearConversation(sessionId: string): void {
    this.conversationHistory.delete(sessionId);
  }

  getConversationHistory(sessionId: string): ChatMessage[] {
    return this.conversationHistory.get(sessionId) || [];
  }
}

export const openAIService = OpenAIService.getInstance();