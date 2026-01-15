import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Brain, BarChart3, Users, Mail, TrendingUp, Building } from 'lucide-react';
import ThemeAwareLogo from './ThemeAwareLogo';

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Platform', href: '/features', icon: BarChart3 },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Survey', href: '/survey', icon: TrendingUp },
    { name: 'Investors', href: '/investors', icon: Building },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  const scrollToBeta = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#beta';
    } else {
      document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed w-full top-0 z-50 bg-white/95 dark:bg-dark-900/95 backdrop-blur-md border-b border-gray-200 dark:border-dark-700 lg:hidden">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <ThemeAwareLogo size="mobile" />
          </Link>

          {/* Mobile Controls */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop with enhanced blur */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel with slide animation */}
          <div 
            className="fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-dark-900 overflow-y-auto transform transition-transform duration-300 ease-out animate-slide-right"
          >
            <div className="px-4 py-6">
              {/* Navigation Links - Optimized for Maximum Clickability */}
              <nav className="space-y-1 mb-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    flex items-center gap-4 px-5 py-4 rounded-xl 
                    font-montserrat font-medium text-base
                    transition-all duration-200 
                    min-h-[60px] w-full
                    active:scale-[0.98]
                    touch-manipulation
                    ${
                      isActive(item.href)
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400 shadow-sm'
                        : 'text-gray-900 dark:text-gray-100 active:bg-gray-100 dark:active:bg-dark-800'
                    }
                  `}
                >
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.name}</span>
                </Link>
              ))}
              </nav>

              {/* CTA Button */}
              <button
                onClick={scrollToBeta}
                className="w-full font-montserrat font-semibold text-base px-6 py-4 bg-primary-500 active:bg-primary-600 text-white rounded-xl transition-all duration-200 active:scale-[0.98] min-h-[56px] shadow-lg touch-manipulation"
              >
                Join Beta
              </button>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-700">
                <p className="font-montserrat text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  Built by automotive enthusiasts,<br />
                  for automotive enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}