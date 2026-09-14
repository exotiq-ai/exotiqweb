import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, BarChart3, Users, Mail, TrendingUp, Building, BookOpen, Tag, Zap, ArrowRight, Settings } from 'lucide-react';
import ThemeAwareLogo from './ThemeAwareLogo';
import { trackEngagement, withAttribution } from '../utils/trackers';
import { useAccessibility } from './AccessibilityProvider';
import { MENU_EVENT } from './StickyCTABar';

const MOBILE_TRIAL_URL = 'https://app.exotiq.ai';
const MOBILE_DEMO_CALENDLY = 'https://calendly.com/hello-exotiq/15-minute-meeting';

// Routes that render on a light background — the floating pill flips to a
// light-glass treatment with dark logo/controls so it stays legible.
const lightRoutePrefixes = ['/blog', '/privacy', '/terms', '/cookies', '/dmca', '/sms-terms', '/admin'];

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openPanel: openAccessibilityPanel } = useAccessibility();
  // While the overlay is open the pill sits on the dark backdrop, so treat it as a dark surface.
  const isLightPage =
    !isMenuOpen &&
    lightRoutePrefixes.some(
      (prefix) => location.pathname === prefix || location.pathname.startsWith(`${prefix}/`)
    );

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

  const handleTrialClick = () => {
    trackEngagement('header_cta_click', { location: 'mobile_menu_start_trial', action: 'start_trial' });
    setIsMenuOpen(false);
  };

  const handleDemoClick = () => {
    trackEngagement('header_cta_click', { location: 'mobile_menu_book_demo', action: 'schedule_demo' });
    setIsMenuOpen(false);
  };

  const handleAccessibilityClick = () => {
    setIsMenuOpen(false);
    openAccessibilityPanel();
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

  // Prevent body scroll when menu is open, and tell the sticky CTA bar (it hides
  // while the menu is open so there is never a second orange button on screen).
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.dataset.menuOpen = 'true';
    } else {
      document.body.style.overflow = 'unset';
      delete document.body.dataset.menuOpen;
    }
    window.dispatchEvent(new CustomEvent(MENU_EVENT, { detail: { open: isMenuOpen } }));

    return () => {
      document.body.style.overflow = 'unset';
      delete document.body.dataset.menuOpen;
      window.dispatchEvent(new CustomEvent(MENU_EVENT, { detail: { open: false } }));
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Scroll scrim: masks content bleeding through the gap above the floating pill */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 inset-x-0 z-40 h-16 bg-gradient-to-b to-transparent transition-opacity duration-300 lg:hidden ${
          isLightPage ? 'from-white via-white/80' : 'from-dark-950 via-dark-950/80'
        } ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Mobile Floating Glass Pill */}
      <header className="fixed top-0 inset-x-0 z-50 px-3 pt-3 lg:hidden">
        <div
          className={`flex justify-between items-center rounded-full border backdrop-blur-xl px-4 py-2 transition-all duration-300 ${
            isMenuOpen || isScrolled
              ? isLightPage
                ? 'bg-white/85 border-gray-200/80 shadow-lg shadow-gray-900/10'
                : 'bg-dark-900/80 border-dark-700/60 shadow-lg'
              : isLightPage
                ? 'bg-white/75 border-gray-200/70 shadow-sm shadow-gray-900/5'
                : 'bg-dark-900/30 border-transparent shadow-none'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="exotiq home">
            <ThemeAwareLogo size="mobile" forLightBg={isLightPage} />
          </Link>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1">
            {/* Accessibility settings live in the pill while the menu is open (the floating gear is
                desktop-only). Always in view — the menu panel can scroll below the fold. */}
            {isMenuOpen && (
              <button
                type="button"
                onClick={handleAccessibilityClick}
                aria-label="Accessibility settings"
                aria-haspopup="dialog"
                className="p-2 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70"
              >
                <Settings className="w-5 h-5 text-gray-100" aria-hidden="true" />
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70 ${
                isLightPage ? 'bg-gray-900/[0.06] hover:bg-gray-900/10' : 'bg-white/5 hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isLightPage ? 'text-gray-700' : 'text-gray-100'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isLightPage ? 'text-gray-700' : 'text-gray-100'}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay. z-[45]: above the sticky CTA bar (z-40) and the cookie banner (z-30),
          below the pill (z-50) and the accessibility sheet (z-60). */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[45] lg:hidden">
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

              {/* CTA: the same hierarchy as the hero and the sticky bar — one orange trial button, a quiet demo link */}
              <a
                href={withAttribution(MOBILE_TRIAL_URL)}
                target="_blank"
                rel="noopener"
                onClick={handleTrialClick}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent-500 active:bg-accent-600 font-dfaalt font-bold text-[19px] leading-none text-white shadow-lg shadow-accent-500/25 transition-[transform,background-color] duration-150 ease-out active:scale-[0.985] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={MOBILE_DEMO_CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDemoClick}
                className="mt-1 flex min-h-[44px] w-full items-center justify-center font-inter text-[15px] leading-5 font-medium text-white/85 active:text-white transition-colors focus-visible:outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-primary-400/70"
              >
                Or&nbsp;
                <span className="underline underline-offset-4 decoration-white/35">book a 15-minute demo</span>
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