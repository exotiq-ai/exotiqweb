import React, { useState, useEffect } from 'react';
import { Bot, ArrowLeft, Mic, MessageSquare, Phone, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { elevenLabsLoader } from '../services/elevenlabsLoader';
import logger from '../utils/logger';

export default function FleetCopilotDemoPage() {
  const [elevenLabsReady, setElevenLabsReady] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load ElevenLabs ConvAI script using centralized loader
    elevenLabsLoader.loadScript()
      .then(() => setElevenLabsReady(true))
      .catch(error => {
        logger.error('Failed to load ElevenLabs script', { error });
      });
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-accent-50 via-white to-primary-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      <SEOHead
        title="FleetCopilot™ AI Demo - Experience Voice AI for Fleet Management"
        description="Try FleetCopilot™ AI assistant live! Experience natural voice conversations about fleet management, pricing optimization, and operational challenges. Built specifically for vehicle rental operators."
        keywords="FleetCopilot AI demo, voice AI assistant, fleet management AI, conversational AI, vehicle rental assistant, Turo host AI"
        url="https://exotiq.ai/fleetcopilot"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://exotiq.ai" },
          { name: "FleetCopilot Demo", url: "https://exotiq.ai/fleetcopilot" }
        ])}
      />

      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-accent-600 to-primary-500 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 relative z-10">
          {/* Back Button */}
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-montserrat">Back to Home</span>
          </Link>

          <div className="text-center">
            <div className="flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-8 animate-pulse-subtle">
              <Bot className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-dfaalt font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Meet FleetCopilot™
            </h1>
            <p className="font-montserrat text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your AI assistant for fleet management. Try a live conversation about pricing, 
              maintenance, scaling, or any fleet operation challenge.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group">
                <Phone className="w-8 h-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-montserrat font-semibold text-base mb-2">Natural Voice Conversations</div>
                <div className="font-montserrat text-sm opacity-80">Speak naturally with your AI assistant</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group">
                <Zap className="w-8 h-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-montserrat font-semibold text-base mb-2">Fleet Management Expertise</div>
                <div className="font-montserrat text-sm opacity-80">Built specifically for rental operators</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group">
                <MessageSquare className="w-8 h-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-montserrat font-semibold text-base mb-2">Real-time Assistance</div>
                <div className="font-montserrat text-sm opacity-80">Get instant answers to your questions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-2xl p-8 md:p-16 border border-gray-200 dark:border-dark-700 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
            
            <div className="text-center mb-12 relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-accent-100 dark:bg-accent-900/30 rounded-full text-accent-700 dark:text-accent-300 font-semibold text-sm mb-4">
                <Mic className="w-4 h-4 mr-2" />
                Live AI Demo
              </div>
              <h2 className="font-dfaalt font-bold text-3xl md:text-4xl text-gray-900 dark:text-white mb-6">
                Start a Conversation with FleetCopilot™
              </h2>
              <p className="font-montserrat text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Click the phone icon below to start a live conversation. Ask about pricing strategies, 
                maintenance schedules, scaling challenges, or any fleet management topic.
              </p>
              
              {/* Conversation starters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
                <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
                  <div className="font-montserrat font-semibold text-sm text-gray-900 dark:text-white mb-1">Pricing</div>
                  <div className="font-montserrat text-xs text-gray-600 dark:text-gray-400">"How should I price my Tesla?"</div>
                </div>
                <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
                  <div className="font-montserrat font-semibold text-sm text-gray-900 dark:text-white mb-1">🔧 Maintenance</div>
                  <div className="font-montserrat text-xs text-gray-600 dark:text-gray-400">"When should I service my fleet?"</div>
                </div>
                <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
                  <div className="font-montserrat font-semibold text-sm text-gray-900 dark:text-white mb-1">📈 Scaling</div>
                  <div className="font-montserrat text-xs text-gray-600 dark:text-gray-400">"How do I grow to 20 cars?"</div>
                </div>
                <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
                  <div className="font-montserrat font-semibold text-sm text-gray-900 dark:text-white mb-1">💡 Strategy</div>
                  <div className="font-montserrat text-xs text-gray-600 dark:text-gray-400">"What's the best platform mix?"</div>
                </div>
              </div>
            </div>

            {/* ElevenLabs Embed */}
            {elevenLabsReady && (
              <div className="flex justify-center mb-12 relative z-10">
                <elevenlabs-convai agent-id="agent_4301k0sa2925fax92p0dst6hezge"></elevenlabs-convai>
              </div>
            )}
            
            {/* Demo info */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-6 relative z-10">
              <div className="text-center">
                <h3 className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-3">
                  💡 Demo Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="font-montserrat text-gray-700 dark:text-gray-300">Speak naturally and clearly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                    <span className="font-montserrat text-gray-700 dark:text-gray-300">Ask specific fleet questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success-600 rounded-full"></div>
                    <span className="font-montserrat text-gray-700 dark:text-gray-300">Try different scenarios</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About FleetCopilot */}
      <section className="py-20 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent-100 dark:bg-accent-900/30 rounded-full text-accent-700 dark:text-accent-300 font-semibold text-sm mb-6">
              <Bot className="w-4 h-4 mr-2" />
              Powered by Advanced AI
            </div>
            <h2 className="font-dfaalt font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6">
              FleetCopilot™ in the Exotiq Platform
            </h2>
            <p className="font-montserrat text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              FleetCopilot™ is integrated throughout the Exotiq platform, providing intelligent 
              assistance for every aspect of your fleet management operation.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="bg-white dark:bg-dark-700 rounded-3xl p-8 md:p-12 mb-16 shadow-xl border border-gray-200 dark:border-dark-600">
            <h3 className="font-dfaalt font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-8 text-center">
              Why FleetCopilot™ Changes Everything
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-4">Time Savings</h4>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-1 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">Saves 15+ hours per week on routine tasks</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-1 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">Increases revenue through optimized pricing</span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-4">Cost Reduction</h4>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-1 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">Prevents costly maintenance emergencies</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-600 mt-1 flex-shrink-0" />
                  <span className="font-montserrat text-gray-700 dark:text-gray-300">Provides 24/7 guest support coverage</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-2xl mx-auto mb-6 hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-3">
                Guest Communication
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300 leading-relaxed">
                Handles guest inquiries via phone and text with human-like intelligence
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-accent-100 dark:bg-accent-900/30 rounded-2xl mx-auto mb-6 hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-3">
                Smart Automation
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300 leading-relaxed">
                Automatically optimizes pricing and schedules maintenance based on data
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-success-100 dark:bg-success-900/30 rounded-2xl mx-auto mb-6 hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-3">
                24/7 Monitoring
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300 leading-relaxed">
                Continuously monitors your fleet and alerts you to opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-accent-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <h2 className="font-dfaalt font-bold text-3xl md:text-4xl lg:text-5xl mb-8">
            Ready to Get FleetCopilot™ for Your Fleet?
          </h2>
          <p className="font-montserrat text-xl md:text-2xl mb-10 opacity-90 max-w-4xl mx-auto leading-relaxed">
            Experience the full Exotiq platform with FleetCopilot™ integrated into every aspect 
            of your fleet management workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/survey"
              className="font-poppins font-bold text-sm uppercase tracking-wide px-10 py-5 bg-white text-primary-500 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 flex items-center space-x-2 justify-center min-h-[44px] touch-manipulation shadow-lg"
            >
              <Zap className="w-5 h-5" />
              <span>Join Beta Program</span>
            </Link>
            <Link
              to="/features"
              className="font-poppins font-bold text-sm uppercase tracking-wide px-10 py-5 border-2 border-white text-white hover:bg-white hover:text-primary-500 rounded-xl transition-all duration-200 hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation"
            >
              <ArrowRight className="w-5 h-5" />
              Explore Platform
            </Link>
          </div>
          <p className="font-montserrat text-sm opacity-75 mt-8">
            Experience the future of fleet management with AI-powered automation
          </p>
        </div>
      </section>
    </div>
  );
}