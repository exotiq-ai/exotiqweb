import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { MobileContainer } from './MobileOptimizations';

interface HomeHeroSectionProps {
  isVisible: boolean;
  scrollToSection: (id: string) => void;
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({ isVisible, scrollToSection }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background Image with Overlay */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 sm:bg-black/50 dark:bg-black/70 sm:dark:bg-black/60"></div>
    </div>
    {/* Content */}
    <div className="relative z-10 w-full">
      <MobileContainer>
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="font-space font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6 leading-tight px-2 drop-shadow-lg">
            AI Fleet Intelligence That Saves Time
            <span className="block text-primary-300 animate-gradient-text drop-shadow-lg">and Accelerates Growth</span>
          </h1>
          <p className="font-inter text-lg sm:text-xl text-gray-100 dark:text-gray-50 max-w-4xl mx-auto mb-8 sm:mb-12 animate-slide-up px-4 drop-shadow-md" style={{ animationDelay: '200ms' }}>
            Exotiq replaces 15+ hours of manual work each week with intelligent automation, so you can focus on growing your business while we handle pricing, availability, maintenance, and messaging.
          </p>
          <p className="font-inter text-base sm:text-lg text-gray-200 dark:text-gray-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-2 italic drop-shadow-md">
            We've walked in your shoes. Now we're using AI to make the road smoother for everyone.
          </p>
          <div className="flex justify-center px-4">
            <button
              onClick={() => scrollToSection('platform-features')}
              className="group font-poppins font-bold text-xs sm:text-sm uppercase tracking-wide px-6 sm:px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2 justify-center min-h-[48px] touch-manipulation shadow-lg hover:shadow-xl"
            >
              <span>View Platform Features</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </MobileContainer>
    </div>
    {/* Scroll Indicator - Hidden on small screens */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle hidden sm:block">
      <ChevronDown className="w-6 h-6 text-white" />
    </div>
  </section>
);

export default HomeHeroSection; 