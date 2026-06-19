import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, BarChart3, Users, Mail, TrendingUp, Building, BookOpen, Tag, Zap } from 'lucide-react';
import ThemeAwareLogo from './ThemeAwareLogo';

const MOBILE_DEMO_CALENDLY = 'https://calendly.com/hello-exotiq/15-minute-meeting';

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Scroll-reactive glass for the floating pill
  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 12);
        frame = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

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
      {/* Scroll scrim: masks content bleeding through the gap above the floating pill */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 inset-x-0 z-40 h-16 bg-gradient-to-b from-dark-950 via-dark-950/80 to-transparent transition-opacity duration-300 lg:hidden ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Mobile Floating Glass Pill */}
      <header className="fixed top-0 inset-x-0 z-50 px-3 pt-3 lg:hidden">
        <div
          className={`flex justify-between items-center rounded-full border backdrop-blur-xl px-4 py-2 transition-all duration-300 ${
            isMenuOpen || isScrolled
              ? 'bg-dark-900/80 border-dark-700/60 shadow-lg'
              : 'bg-dark-900/30 border-transparent shadow-none'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="exotiq home">
            <ThemeAwareLogo size="mobile" />
          </Link>

          {/* Mobile Controls */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-100" />
            ) : (
              <Menu className="w-6 h-6 text-gray-100" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Floating Glass Panel */}
          <div className="absolute top-20 inset-x-3 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border border-dark-700/60 bg-dark-900/95 backdrop-blur-xl shadow-2xl animate-slide-down">
            <div className="p-4">
              {location.pathname !== '/pricing' && (
                <Link
                  to="/pricing"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 mb-4 px-4 py-3 rounded-2xl bg-primary-500/10 border border-primary-500/30 text-primary-300 font-inter font-semibold text-sm"
                >
                  <Zap className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  <span>Launch pricing · lock in before 2027</span>
                </Link>
              )}

              {/* Navigation Links */}
              <nav className="space-y-1 mb-4">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center gap-3 px-3 py-3 rounded-2xl font-inter font-medium transition-colors min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70 ${
                        active
                          ? 'bg-primary-500/15 text-primary-300'
                          : 'text-gray-200 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors ${
                          active ? 'bg-primary-500/20 text-primary-300' : 'bg-white/5 text-gray-400'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* CTA Button */}
              <a
                href={MOBILE_DEMO_CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDemoClick}
                className="w-full font-poppins font-bold text-sm uppercase tracking-wide px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-all duration-200 active:scale-95 min-h-[52px] shadow-lg flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70"
              >
                Book a Demo
              </a>

              {/* Additional Info */}
              <p className="mt-5 pt-5 border-t border-dark-700/60 font-inter text-xs text-gray-400 text-center">
                Built by automotive enthusiasts, for automotive enthusiasts.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}