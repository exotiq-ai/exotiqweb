import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, MessageSquare, Wrench, ArrowRight } from 'lucide-react';
import { MobileSection, MobileContainer } from './MobileOptimizations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FleetCopilotSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, once: true });

  const features = [
    {
      icon: TrendingUp,
      title: 'Revenue Optimization',
      description: 'AI analyzes competitors and demand to maximize your daily rates automatically.'
    },
    {
      icon: MessageSquare,
      title: 'Guest Automation',
      description: 'Handle 3x more bookings with automated inquiries, check-ins, and VIP escalations.'
    },
    {
      icon: Wrench,
      title: 'Predictive Maintenance',
      description: 'Get alerts before breakdowns happen. Schedule service during booking gaps.'
    }
  ];

  return (
    <MobileSection ref={ref} className="bg-white dark:bg-dark-900 py-14 lg:py-16">
      <MobileContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column - Copy */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 dark:bg-primary-500/20 rounded-full text-primary-600 dark:text-primary-400 font-semibold text-sm mb-4 border border-primary-500/20 dark:border-primary-500/30">
              <Brain className="w-4 h-4 mr-2" />
              Meet FleetCopilot™ AI
            </div>

            {/* Headline */}
            <h2 className="font-dfaalt font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4 leading-tight">
              Your AI Operations Partner
            </h2>

            {/* Description */}
            <p className="font-inter text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              FleetCopilot delivers the strategic capacity of a dedicated analyst, ops manager, 
              and guest coordinator, without expanding your team.
            </p>

            {/* Feature List */}
            <div className="space-y-5 mb-6">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className={`flex items-start space-x-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/fleetcopilot"
              className="inline-flex items-center gap-3 font-dfaalt font-semibold text-base px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/30 active:scale-[0.98] group"
            >
              <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Talk to Rari, your FleetCopilot</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Right Column - App Screenshot */}
          <div 
            className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 dark:from-primary-500/10 dark:to-accent-500/10 rounded-3xl blur-xl" />
            
            {/* Screenshot - Large and centered, no wasted space */}
            <div className="relative flex items-center justify-center py-8">
              <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
                <img
                  src="/images/app-screenshots/fleetcopilot-mobile-hand.svg"
                  alt="FleetCopilot AI Assistant on mobile - voice-enabled fleet management with Rari"
                  className="w-full h-auto drop-shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

export default FleetCopilotSection;
