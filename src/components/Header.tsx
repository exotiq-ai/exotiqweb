import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';
import MobileNavigation from './MobileNavigation';

const HEADER_DEMO_CALENDLY = 'https://calendly.com/hello-exotiq/15-minute-meeting';

// Core links stay visible in the condensed (scrolled) pill.
const coreNav = [
  { name: 'Platform', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

// Secondary links only appear in the expanded (top-of-page) pill.
const secondaryNav = [
  { name: 'Survey', href: '/survey' },
  { name: 'Invest', href: '/investors' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const showLaunchChip = location.pathname !== '/pricing';

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

  const linkClasses = (active: boolean) =>
    `inline-flex h-9 items-center rounded-full px-3.5 text-sm font-inter font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70 ${
      active
        ? 'text-primary-300 bg-primary-500/10'
        : 'text-gray-200 hover:text-white hover:bg-white/5'
    }`;

  return (
    <>
      {/* Mobile Navigation Component */}
      <MobileNavigation />

      {/* Always-on top scrim: gives the floating pill one consistent dark backdrop
          that fades into whatever hero sits below, so there is no hard tonal seam
          between the dark page canvas and a slightly-lighter hero gradient. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 inset-x-0 z-40 hidden lg:block bg-gradient-to-b from-[#05070a] via-[#05070a]/80 to-transparent transition-all duration-300 ${
          isScrolled ? 'h-24 via-[#05070a]/90' : 'h-28'
        }`}
      />

      {/* Desktop Floating Glass Pill */}
      <header className="fixed top-0 inset-x-0 z-50 hidden lg:block px-4 pt-3">
        <div
          className={`mx-auto max-w-5xl grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-full border transition-all duration-300 ease-out ${
            isScrolled
              ? 'bg-dark-900/70 border-white/10 ring-1 ring-white/5 shadow-lg shadow-black/30 backdrop-blur-xl backdrop-saturate-150 px-4 py-2'
              : 'bg-dark-900/50 border-white/8 ring-1 ring-white/[0.03] shadow-md shadow-black/20 backdrop-blur-lg px-5 py-2.5'
          }`}
        >
          {/* Left: Logo — full lockup morphs to mark on scroll */}
          <Link
            to="/"
            className="group relative flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70"
            aria-label="exotiq home"
          >
            <span
              className={`relative flex h-8 items-center transition-[width] duration-300 ease-out ${
                isScrolled ? 'w-8' : 'w-24'
              }`}
            >
              <img
                src="/brand/exotiq-lockup-horizontal-white.svg"
                alt="exotiq"
                width={94}
                height={32}
                className={`absolute inset-y-0 left-0 my-auto h-8 w-auto max-w-none transition-all duration-300 ease-out ${
                  isScrolled ? 'opacity-0 -translate-x-1 pointer-events-none' : 'opacity-100'
                }`}
              />
              <img
                src="/brand/exotiq-mark-white.svg"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                className={`absolute inset-y-0 left-0 my-auto h-8 w-8 transition-all duration-300 ease-out group-hover:scale-110 ${
                  isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                }`}
              />
            </span>
          </Link>

          {/* Center: Nav links */}
          <nav className="justify-self-center flex items-center gap-1">
            {coreNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={linkClasses(isActive(item.href))}
              >
                {item.name}
              </Link>
            ))}
            <div
              className={`flex items-center gap-1 overflow-hidden transition-all duration-300 ease-out ${
                isScrolled
                  ? 'max-w-0 opacity-0 -translate-x-1 pointer-events-none'
                  : 'max-w-md opacity-100'
              }`}
              aria-hidden={isScrolled}
            >
              {secondaryNav.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  tabIndex={isScrolled ? -1 : 0}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={linkClasses(isActive(item.href))}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right: Launch chip (expanded only) + Book a Demo */}
          <div className="justify-self-end flex items-center">
            {showLaunchChip && (
              <Link
                to="/pricing"
                tabIndex={isScrolled ? -1 : 0}
                aria-hidden={isScrolled}
                className={`inline-flex h-7 items-center gap-1.5 overflow-hidden rounded-full border bg-primary-500/10 text-xs font-inter font-semibold text-primary-300 whitespace-nowrap transition-all duration-300 ease-out hover:bg-primary-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70 ${
                  isScrolled
                    ? 'max-w-0 px-0 mr-0 opacity-0 scale-95 -translate-x-1 border-transparent pointer-events-none'
                    : 'max-w-[170px] px-3 mr-3 opacity-100 scale-100 border-primary-500/30'
                }`}
              >
                <Zap className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                <span>Launch pricing</span>
              </Link>
            )}
            <a
              href={HEADER_DEMO_CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackHeaderDemoClick}
              className="group inline-flex h-9 items-center justify-center gap-1.5 px-5 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-poppins font-bold text-sm uppercase tracking-wide transition-all duration-200 hover:scale-105 shadow-lg shadow-primary-900/30 hover:shadow-xl hover:shadow-primary-500/25 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
