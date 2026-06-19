import { corsHeaders } from '../_shared/cors.ts'
import OpenAI from 'npm:openai@4.52.7'

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  sessionId: string;
  message: string;
  userContext?: {
    fleetSize?: string;
    experience?: string;
    challenges?: string[];
    interests?: string[];
    leadScore?: number;
    name?: string;
    email?: string;
  };
  conversationHistory?: ChatMessage[];
}

// System prompt for FleetCopilot
const SYSTEM_PROMPT = `You are FleetCopilot, an AI assistant for exotiq, the operating system for exotic and luxury rental operators.

PERSONALITY & TONE:
- Friendly, knowledgeable, and helpful
- Professional but approachable
- Enthusiastic about fleet management and automotive industry
- Built by operators who scaled their own exotic fleet (after migrating off Turo) and understand the challenges

KEY INFORMATION ABOUT EXOTIQ:
- AI-powered fleet management platform
- 5 modules: MotorIQ (profitability), Pulse (analytics), Book (direct bookings), Vault (compliance), FleetCopilot (AI operations assistant; the voice agent is named Rari)
- Built specifically for exotic and luxury fleet operators
- Now onboarding founding operators with a 30-day free trial, no credit card required
- Per-vehicle pricing: Pro $39/vehicle/month (1-15 vehicles), Business $29/vehicle/month (16-50), Enterprise custom for 51+. All features included on every plan, zero commission fees.
- Live in 5 markets (Tampa, Miami, Denver, Scottsdale, Westlake Village). Built on SOC 2 Type II and ISO 27001:2022 certified infrastructure. MotorIQ reads 50+ demand signals per vehicle. Drive Exotiq marketplace listing as it launches.

YOUR GOALS:
1. Understand the user's fleet size and challenges
2. Provide helpful, relevant information about fleet management
3. Guide qualified leads to book a call or join the beta list
4. Keep responses concise (2-3 sentences max unless asked for details)
5. Always be helpful even if they're not a perfect fit

CONVERSATION FLOW:
1. Greet warmly and ask about their fleet
2. Understand their specific challenges
3. Provide relevant solutions and insights
4. Guide to appropriate next steps (15-min call for general questions, 30-min for serious operators/investors)

CALENDLY LINKS:
- 15-min meeting: https://calendly.com/hello-exotiq/15-minute-meeting
- 30-min meeting: https://calendly.com/hello-exotiq/30min

IMPORTANT GUIDELINES:
- Keep responses short and conversational
- Ask follow-up questions to understand their needs
- Don't oversell - focus on being helpful
- If they mention a trial, let them know there is a 30-day free trial, no credit card required, and a Founding Operator Program with the rate locked for life
- Invite qualified operators to start a free trial or book a 15-min call to see their fleet in exotiq
- Be honest and never overstate results; say "individual results vary" when discussing outcomes

Remember: You're here to help fleet operators succeed, whether they use exotiq or not.`;

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    const { sessionId, message, userContext = {}, conversationHistory = [] }: ChatRequest = await req.json()
    
    if (!sessionId || !message) {
      throw new Error('Missing required fields: sessionId and message')
    }

    // Initialize OpenAI client with server-side API key
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })

    // Build conversation history
    let history: ChatMessage[] = []
    
    // Add system prompt with user context
    history.push({
      role: 'system',
      content: buildSystemPrompt(userContext)
    })

    // Add previous conversation history (limit to last 10 exchanges to manage tokens)
    if (conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-20) // Last 20 messages
      history.push(...recentHistory)
    }

    // Add current user message
    history.push({
      role: 'user',
      content: message
    })

    // Generate AI response
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: history,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    })

    const aiResponse = response.choices[0]?.message?.content || 'I apologize, but I encountered an issue. Could you please try again?'

    // Log usage for monitoring
    console.log(`ChatBot AI Request - Session: ${sessionId}, Tokens: ${response.usage?.total_tokens || 0}`)

    return new Response(
      JSON.stringify({ 
        success: true,
        response: aiResponse,
        usage: response.usage,
        timestamp: new Date().toISOString()
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    )

  } catch (error) {
    console.error('ChatBot AI Error:', error)
    
    // Return fallback response on error
    const fallbackResponse = getFallbackResponse(req.body?.message || '', req.body?.userContext || {})
    
    return new Response(
      JSON.stringify({ 
        success: false,
        response: fallbackResponse,
        error: 'AI service temporarily unavailable',
        fallback: true
      }),
      {
        status: 200, // Return 200 so frontend can handle gracefully
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    )
  }
})

function buildSystemPrompt(userContext: any): string {
  let contextInfo = ''
  
  if (userContext.fleetSize) {
    contextInfo += `\nUser's fleet size: ${userContext.fleetSize}`
  }
  if (userContext.experience) {
    contextInfo += `\nUser's experience level: ${userContext.experience}`
  }
  if (userContext.challenges?.length) {
    contextInfo += `\nUser's main challenges: ${userContext.challenges.join(', ')}`
  }
  if (userContext.leadScore) {
    contextInfo += `\nLead score: ${userContext.leadScore}/100`
  }
  if (userContext.name) {
    contextInfo += `\nUser's name: ${userContext.name}`
  }

  return SYSTEM_PROMPT + contextInfo
}

function getFallbackResponse(message: string, userContext: any): string {
  const msg = message.toLowerCase()
  
  // Simple keyword-based fallback responses
  if (msg.includes('fleet') || msg.includes('vehicle')) {
    return "I'd love to learn more about your fleet! What's your current setup like, and what challenges are you facing?"
  }
  
  if (msg.includes('pricing') || msg.includes('cost')) {
    return "Our pricing is simple per-vehicle: $39/vehicle/month for Pro (1-15 vehicles) and $29/vehicle/month for Business (16-50 vehicles). All features included, zero commission fees, and a 30-day free trial with no credit card required. What's your current fleet size?"
  }
  
  if (msg.includes('beta') || msg.includes('trial')) {
    return "You can start with a 30-day free trial, no credit card required, and we're onboarding founding operators now with the rate locked for life. What type of fleet operation are you running?"
  }
  
  if (msg.includes('demo') || msg.includes('call')) {
    return "I'd be happy to connect you with our team! For general questions, we have 15-min slots available. For serious operators or investors, we offer 30-min deep dives. Which would work better for you?"
  }
  
  return "Thanks for reaching out! I'm here to help with any fleet management questions. What would you like to know about exotiq or fleet operations in general?"
}