import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileNavigation from './MobileNavigation';
import ThemeAwareLogo from './ThemeAwareLogo';
import { useStickyHeader } from '../hooks/useScrollAnimation';
import ScrollProgressIndicator from './ScrollProgressIndicator';

export default function Header() {
  const [, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isSticky } = useStickyHeader(50);

  const navigation = [
    { name: 'Platform', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Survey', href: '/survey' },
    { name: 'Investors', href: '/investors' },
    { name: 'Contact', href: '/contact' },
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

  return (
    <>
      <ScrollProgressIndicator />
      
      {/* Mobile Navigation Component */}
      <MobileNavigation />
      
      {/* Desktop Header - Premium Polish */}
      <header 
        className={`fixed w-full top-0 z-50 backdrop-blur-xl hidden lg:block transition-all duration-500 ease-out ${
          isSticky 
            ? 'bg-white/95 dark:bg-dark-black/95 shadow-xl border-b border-gray-200/50 dark:border-white/10' 
            : 'bg-white/90 dark:bg-dark-black/90 border-b border-gray-200/30 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className={`flex justify-between items-center transition-all duration-500 ease-out ${isSticky ? 'h-16' : 'h-18'}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <ThemeAwareLogo size="header" />
            </Link>

            {/* Desktop Navigation - Premium Interactions */}
            <nav className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative font-montserrat font-medium transition-all duration-250 ease-out group py-2 ${
                    isActive(item.href)
                      ? 'text-primary-500 dark:text-primary-500'
                      : 'text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-500'
                  }`}
                >
                  <span className="relative z-10 transition-transform duration-250 inline-block group-hover:-translate-y-0.5">
                    {item.name}
                  </span>
                  {/* Sophisticated underline animation - Gulf Blue */}
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-primary-500 transition-all duration-300 ease-out ${
                      isActive(item.href) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                  {/* Subtle hover background */}
                  <span className="absolute inset-0 -inset-x-2 bg-gray-100/50 dark:bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-250 ease-out -z-10"></span>
                </Link>
              ))}
            </nav>

            {/* CTA - Premium Style */}
            <div className="flex items-center">
              <button
                onClick={scrollToBeta}
                className="group relative font-dfaalt font-semibold text-sm px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-250 hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center shadow-lg hover:shadow-xl overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-500 rounded-xl"></span>
                <span className="relative z-10">Join Beta</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}