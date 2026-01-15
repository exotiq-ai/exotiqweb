import React, { useState, useEffect } from 'react';
import { Brain, MessageSquare, Settings, BarChart3 } from 'lucide-react';
import ChatBotTest from '../components/ChatBot/ChatBotTest';
import FleetCopilot from '../components/ChatBot/ChatBot';
import { useChatBot } from '../hooks/useChatBot';

export default function TestPage() {
  const [showTest, setShowTest] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const { sessionId } = useChatBot();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <h1 className="font-dfaalt font-bold text-4xl mb-4">
            ChatBot Testing Center
          </h1>
          <p className="font-montserrat text-xl opacity-90">
            Comprehensive testing tools for OpenAI integration and ChatBot functionality
          </p>
        </div>
      </section>

      {/* Test Options */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* AI Integration Test */}
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl mx-auto mb-6">
                <Brain className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="font-dfaalt font-bold text-2xl text-center mb-4">
                AI Integration Test
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300 text-center mb-6">
                Comprehensive test suite to verify OpenAI integration, response quality, 
                error handling, and performance metrics.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Environment configuration</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>OpenAI API connectivity</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Response quality & context</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Performance & reliability</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowTest(true)}
                className="w-full font-poppins font-bold text-sm uppercase tracking-wide px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all duration-200 hover:scale-105"
              >
                Run AI Integration Test
              </button>
            </div>

            {/* Live ChatBot Test */}
            <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-center w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-xl mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="font-dfaalt font-bold text-2xl text-center mb-4">
                Live ChatBot Test
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300 text-center mb-6">
                Interactive test of the actual ChatBot interface. Test conversation flows, 
                AI responses, and user experience in real-time.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Real conversation testing</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>UI/UX validation</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Lead scoring system</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Analytics tracking</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowChatBot(true)}
                className="w-full font-poppins font-bold text-sm uppercase tracking-wide px-6 py-4 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
              >
                Open Live ChatBot
              </button>
            </div>
          </div>

          {/* Test Instructions */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="w-6 h-6 text-blue-600" />
              <h3 className="font-dfaalt font-bold text-xl text-blue-900 dark:text-blue-100">
                Testing Instructions
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-dfaalt font-semibold text-lg mb-3 text-blue-900 dark:text-blue-100">
                  Before Testing
                </h4>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li>• Ensure your .env.local file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY</li>
                  <li>• Verify OpenAI API key is set in Supabase Edge Functions</li>
                  <li>• Check that VITE_ENABLE_AI_RESPONSES=true</li>
                  <li>• Make sure you have internet connectivity</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-dfaalt font-semibold text-lg mb-3 text-blue-900 dark:text-blue-100">
                  What to Test
                </h4>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li>• Ask about fleet management challenges</li>
                  <li>• Test conversation memory (reference previous messages)</li>
                  <li>• Try different fleet sizes and experience levels</li>
                  <li>• Test error scenarios (network issues, etc.)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Current Configuration */}
          <div className="mt-8 bg-gray-100 dark:bg-dark-800 p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h4 className="font-dfaalt font-semibold text-lg">Current Configuration</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Supabase URL:</span>
                <div className="font-mono text-xs bg-white dark:bg-dark-700 p-2 rounded mt-1">
                  {import.meta.env.VITE_SUPABASE_URL || 'Not configured'}
                </div>
              </div>
              <div>
                <span className="font-medium">AI Responses:</span>
                <div className="font-mono text-xs bg-white dark:bg-dark-700 p-2 rounded mt-1">
                  {import.meta.env.VITE_ENABLE_AI_RESPONSES || 'false'}
                </div>
              </div>
              <div>
                <span className="font-medium">Session ID:</span>
                <div className="font-mono text-xs bg-white dark:bg-dark-700 p-2 rounded mt-1">
                  {sessionId}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Components */}
      {showTest && <ChatBotTest />}
      
      {showChatBot && (
        <FleetCopilot 
          isOpen={true} 
          onToggle={() => setShowChatBot(false)}
          sessionId={sessionId}
          isReturningUser={false}
        />
      )}
    </div>
  );
}