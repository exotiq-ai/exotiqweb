import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Flame } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import MobileNavigation from './MobileNavigation';
import ThemeAwareLogo from './ThemeAwareLogo';
import { founderConfig } from '../data/pricingData';

const HEADER_DEMO_CALENDLY = 'https://calendly.com/hello-exotiq/15-minute-meeting';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Platform', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Survey', href: '/survey' },
    { name: 'Invest', href: '/investors' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  // Show the founder chip on every page except /pricing (where the page
  // itself already surfaces founder messaging in multiple places).
  const showFounderChip = founderConfig.isActive() && location.pathname !== '/pricing';

  const trackHeaderDemoClick = () => {
    if (typeof window === 'undefined') return;
    const w = window as typeof window & {
      dataLayer?: Array<Record<string, unknown>>;
    };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: 'header_cta_click',
      location: 'header_book_demo',
      action: 'schedule_demo',
    });
  };

  return (
    <>
      {/* Mobile Navigation Component */}
      <MobileNavigation />
      
      {/* Desktop Header */}
      <header className="fixed w-full top-0 z-50 bg-white/90 dark:bg-dark-900/95 backdrop-blur-md border-b border-gray-200 dark:border-dark-700 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <ThemeAwareLogo size="header" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-inter font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-800 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Theme Toggle & CTA */}
            <div className="flex items-center space-x-3">
              {showFounderChip && (
                <Link
                  to="/pricing"
                  aria-label={`Founder pricing — ${founderConfig.spotsRemaining} of ${founderConfig.totalSpots} spots remaining, ends ${founderConfig.deadlineLabel}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-inter font-semibold bg-orange-500/10 text-orange-700 border border-orange-500/30 hover:bg-orange-500/20 dark:text-orange-300 transition-colors whitespace-nowrap"
                >
                  <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Founder · {founderConfig.spotsRemaining} spots left</span>
                </Link>
              )}
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
              <a
                href={HEADER_DEMO_CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackHeaderDemoClick}
                className="font-poppins font-bold text-sm uppercase tracking-wide px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 hover:scale-105 min-h-[44px] flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}