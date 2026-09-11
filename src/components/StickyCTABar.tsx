import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackEngagement, withAttribution } from '../utils/trackers';
import { CONSENT_EVENT, readConsent } from '../utils/consentStore';

const TRIAL_URL = 'https://app.exotiq.ai';
const DEMO_URL = 'https://calendly.com/hello-exotiq/15-minute-meeting';
/** The home hero (HomeHeroSection) and its orange button. */
const HERO_ID = 'home-hero';
const HERO_CTA_ID = 'hero-primary-cta';
/** Roughly the bar's own height: the hero must clear this much of the viewport bottom before the bar covers it. */
const BAR_CLEARANCE = 80;
/** Pages without the hero: plain scroll threshold. */
const FALLBACK_SCROLL_Y = 800;

/**
 * Mobile-only sticky action bar. Continues the hero's hierarchy — one orange
 * trial button, a quiet demo alternative — and appears only after the hero's
 * own button AND the car have left the viewport, so it never covers the
 * composition and there is never a second orange target on screen. Stays
 * hidden while the cookie banner owns the bottom edge (no consent decision
 * yet) and while the footer is in view.
 */
export default function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    let consentDecided = readConsent() !== null;

    const evaluate = () => {
      frame = 0;
      const hero = document.getElementById(HERO_ID);
      const cta = document.getElementById(HERO_CTA_ID);
      const footer = document.querySelector('footer');
      const viewport = window.innerHeight;
      // Two conditions: the hero's own orange button has scrolled off the top
      // (never two orange targets on screen) and the hero's bottom edge, i.e.
      // the car, has cleared the strip the bar will cover.
      const ctaGone = cta ? cta.getBoundingClientRect().bottom < 0 : true;
      const heroCleared = hero
        ? hero.getBoundingClientRect().bottom <= viewport - BAR_CLEARANCE
        : window.scrollY > FALLBACK_SCROLL_Y;
      const pastHero = ctaGone && heroCleared;
      const footerInView = footer ? footer.getBoundingClientRect().top < viewport : false;
      setIsVisible(consentDecided && pastHero && !footerInView);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(evaluate);
    };
    const onConsent = () => {
      consentDecided = true;
      schedule();
    };

    evaluate();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener(CONSENT_EVENT, onConsent);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Don't render on desktop or before the hero has scrolled away
  if (typeof window !== 'undefined' && window.innerWidth >= 1024) return null;
  if (!isVisible) return null;

  return (
    <div data-sticky-cta className="fixed bottom-0 left-0 right-0 z-40 lg:hidden animate-slide-up">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark-900/95 backdrop-blur-lg border-t border-white/10" />

      {/* Content */}
      <div
        className="relative flex items-center gap-3 px-4 pt-3"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={withAttribution(TRIAL_URL)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEngagement('sticky_cta_click', { location: 'mobile_sticky_primary', action: 'start_trial' })
          }
          className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-accent-500 active:bg-accent-600 font-dfaalt font-bold text-[19px] leading-none text-white shadow-lg shadow-accent-500/25 transition-[transform,background-color] duration-150 ease-out active:scale-[0.985] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900"
        >
          Start Free Trial
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEngagement('sticky_cta_click', { location: 'mobile_sticky_demo', action: 'schedule_demo' })
          }
          className="flex h-12 items-center justify-center rounded-xl border border-white/20 px-4 font-inter text-[15px] font-medium text-white active:bg-white/10 transition-colors duration-150 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70"
        >
          Book a demo
        </a>
      </div>
    </div>
  );
}
