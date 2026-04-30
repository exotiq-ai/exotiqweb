import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles } from 'lucide-react';

export default function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (800px)
      const heroHeight = 800;
      const scrollPosition = window.scrollY;
      
      setIsVisible(scrollPosition > heroHeight);

      // Hide when footer is visible
      const footer = document.querySelector('footer');
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setIsFooterVisible(footerTop < windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render on desktop or when footer visible
  if (typeof window !== 'undefined' && window.innerWidth >= 1024) return null;
  if (!isVisible || isFooterVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden animate-slide-up"
      style={{ 
        paddingBottom: 'env(safe-area-inset-bottom)',
        transform: isVisible && !isFooterVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-white/95 dark:bg-dark-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-dark-700" />
      
      {/* Content */}
      <div className="relative px-4 py-3 flex items-center gap-3">
        {/* Primary CTA */}
        <a
          href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-primary-500 active:bg-primary-600 text-white rounded-xl font-montserrat font-semibold text-sm transition-all duration-200 active:scale-[0.98] min-h-[52px] shadow-lg touch-manipulation"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Demo</span>
        </a>
        
        {/* Secondary CTA */}
        <a
          href="https://calendly.com/hello-exotiq/15-minute-meeting"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-accent-600 active:bg-accent-700 text-white rounded-xl font-montserrat font-semibold text-sm transition-all duration-200 active:scale-[0.98] min-h-[52px] shadow-lg touch-manipulation"
        >
          <Sparkles className="w-4 h-4" />
          <span>Book a Demo</span>
        </a>
      </div>
    </div>
  );
}

