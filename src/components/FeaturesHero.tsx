import React from 'react';
import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { MobileSection, MobileContainer } from './MobileOptimizations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FeaturesHero: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  return (
    <MobileSection 
      ref={ref} 
      className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden py-20 lg:py-24"
    >
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/5 via-transparent to-transparent" />
      </div>

      <MobileContainer>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Copy (45%) */}
          <div className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Trust Badge - Animated */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 font-semibold text-sm mb-6 animate-pulse-subtle transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <CheckCircle className="w-4 h-4 text-green-400" />
              Trusted by 20+ Premium Fleet Operators
            </div>

            {/* Headline */}
            <h1 
              className={`font-dfaalt font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '200ms' }}
            >
              The Only Platform Built for{' '}
              <span className="text-primary-400">Exotic Fleet Operations</span>
            </h1>

            {/* Proof Point Subheadline */}
            <p 
              className={`font-inter text-xl text-gray-300 mb-8 leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '300ms' }}
            >
              Operators using Exotiq increase revenue by{' '}
              <span className="text-primary-400 font-semibold">40% in 90 days</span>{' '}
              while cutting manual work by{' '}
              <span className="text-primary-400 font-semibold">85%</span>.
            </p>

            {/* Single CTA */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <a
                href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 font-dfaalt font-semibold text-lg px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/30"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your 15-Minute Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Micro-copy */}
            <p 
              className={`font-inter text-sm text-gray-500 mt-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '500ms' }}
            >
              See how Exotiq transforms your fleet operations
            </p>
          </div>

          {/* Right Column - Visual (55%) */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {/* Glow effect behind the visual */}
            <div
              className="absolute -inset-8 bg-gradient-to-r from-primary-500/20 via-primary-400/10 to-primary-500/20 rounded-3xl blur-3xl"
              aria-hidden="true"
            />

            {/* Visual Container - Floating animation */}
            <div className="relative animate-float">
              <img
                src="/images/app-screenshots/hero-dashboard-macbook.svg"
                alt="Exotiq MotorIQ Dashboard showing AI-powered revenue optimization and fleet analytics"
                className="w-full h-auto relative z-10 rounded-lg drop-shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

export default FeaturesHero;
