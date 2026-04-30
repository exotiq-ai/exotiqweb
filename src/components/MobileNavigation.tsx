import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Home, BarChart3, Users, Mail, TrendingUp, Building, BookOpen, Tag, Flame } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeAwareLogo from './ThemeAwareLogo';
import { founderConfig } from '../data/pricingData';

const MOBILE_DEMO_CALENDLY = 'https://calendly.com/hello-exotiq/15-minute-meeting';

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Platform', href: '/features', icon: BarChart3 },
    { name: 'Pricing', href: '/pricing', icon: Tag },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Survey', href: '/survey', icon: TrendingUp },
    { name: 'Invest', href: '/investors', icon: Building },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleDemoClick = () => {
    if (typeof window !== 'undefined') {
      const w = window as typeof window & {
        dataLayer?: Array<Record<string, unknown>>;
      };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: 'header_cta_click',
        location: 'mobile_menu_book_demo',
        action: 'schedule_demo',
      });
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
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-dark-900 overflow-y-auto">
            <div className="p-6">
              {/* Founder pricing chip — only shown while the offer is active
                  and the user isn't already on /pricing. */}
              {founderConfig.isActive() && location.pathname !== '/pricing' && (
                <Link
                  to="/pricing"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={`Founder pricing — ${founderConfig.spotsRemaining} of ${founderConfig.totalSpots} spots remaining, ends ${founderConfig.deadlineLabel}`}
                  className="flex items-center justify-between gap-3 mb-6 px-4 py-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-700 dark:text-orange-300"
                >
                  <span className="flex items-center gap-2 font-inter font-semibold text-sm">
                    <Flame className="w-4 h-4" aria-hidden="true" />
                    Founder pricing — {founderConfig.spotsRemaining} spots left
                  </span>
                  <span className="font-inter text-xs opacity-80">
                    ends {founderConfig.deadlineShortLabel}
                  </span>
                </Link>
              )}

              {/* Navigation Links */}
              <nav className="space-y-2 mb-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-inter font-medium transition-all duration-200 min-h-[52px] ${
                      isActive(item.href)
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-dark-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>

              {/* CTA Button */}
              <a
                href={MOBILE_DEMO_CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDemoClick}
                className="w-full font-poppins font-bold text-sm uppercase tracking-wide px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all duration-200 active:scale-95 min-h-[52px] shadow-lg flex items-center justify-center"
              >
                Book a Demo
              </a>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-700">
                <p className="font-inter text-sm text-gray-600 dark:text-gray-300 text-center">
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