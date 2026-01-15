import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { MobileContainer } from './MobileOptimizations';

interface HomeHeroSectionProps {
  isVisible: boolean;
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({ isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"
      data-hero-section
      aria-label="Hero section"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Primary gradient mesh */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(110, 193, 228, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(110, 193, 228, 0.2) 0%, transparent 50%)
            `
          }}
        />

        {/* Subtle animated gradient */}
        <div
          className="absolute inset-0 opacity-20 animate-gradient-shift"
          style={{
            background: 'linear-gradient(135deg, rgba(110, 193, 228, 0.2) 0%, transparent 40%, rgba(241, 90, 41, 0.1) 100%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Grid pattern overlay for depth */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pt-8 pb-16 lg:pt-0 lg:pb-0">
        <MobileContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left Column - Copy */}
            <div className={`text-center lg:text-left lg:pr-8 xl:pr-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

              {/* Trust Badge - Animated */}
              <div
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 mb-6 border border-white/20 animate-pulse-subtle"
                style={{ animationDelay: '100ms' }}
              >
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Trusted by operators managing $120M+ in fleet assets
              </div>

              {/* Headline */}
              <h1 className="font-dfaalt font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] tracking-tight">
                Exotic Fleet Operations on{' '}
                <span className="text-primary-400">Autopilot</span>
              </h1>

              {/* Subheadline */}
              <p className="font-inter text-lg sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                AI-powered platform that automates pricing, guest messaging, and maintenance so you can scale without the chaos.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
                <Link
                  to="/features"
                  className="group inline-flex items-center justify-center font-dfaalt font-semibold text-base px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/30 active:scale-[0.98]"
                >
                  <span>Explore the Platform</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <a
                  href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-dfaalt font-semibold text-base px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:border-white/40 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book a Demo
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-400">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1.5 text-green-400" />
                  No commitment
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1.5 text-green-400" />
                  14-day free trial
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1.5 text-green-400" />
                  Cancel anytime
                </span>
              </div>
            </div>

            {/* Right Column - Dashboard Screenshot */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Glow effect behind the dashboard */}
              <div
                className="absolute -inset-8 lg:-inset-16 bg-gradient-to-r from-primary-500/25 via-primary-400/15 to-primary-500/25 rounded-3xl blur-3xl"
                aria-hidden="true"
              />

              {/* Dashboard Image Container - LARGER & MORE PROMINENT */}
              <div className="relative lg:scale-110 lg:translate-x-4 xl:scale-115 xl:translate-x-8 animate-float">
                {/* Main Dashboard - MacBook - PROMINENT */}
                <img
                  src="/images/app-screenshots/hero-dashboard-macbook.svg"
                  alt="Exotiq MotorIQ Dashboard showing dynamic pricing optimization and fleet utilization analytics"
                  className={`w-full h-auto relative z-10 drop-shadow-2xl transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  loading="eager"
                />

                {/* Loading placeholder */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-dark-700 rounded-2xl animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </MobileContainer>
      </div>

      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};

export default HomeHeroSection;
