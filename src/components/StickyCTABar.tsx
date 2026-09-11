import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { trackEngagement, withAttribution } from '../utils/trackers';
import { CONSENT_EVENT, readConsent } from '../utils/consentStore';

const TRIAL_URL = 'https://app.exotiq.ai';
const DEMO_URL = 'https://calendly.com/hello-exotiq/15-minute-meeting';
/** The home hero (HomeHeroSection): its orange button and the car stage under it. */
const HERO_ID = 'home-hero';
const HERO_CTA_ID = 'hero-primary-cta';
const HERO_STAGE_ID = 'hero-stage';
/** Roughly the bar's own height: the car must clear this much of the viewport bottom before the bar covers it. */
const BAR_CLEARANCE = 80;
/** The hero button must be this far above the viewport before the bar appears, so a 1px scroll never flips it. */
const CTA_HYSTERESIS = 120;
/** Pages without the hero: plain scroll threshold. */
const FALLBACK_SCROLL_Y = 800;
/** Dispatched by MobileNavigation when the menu opens/closes (it also sets body[data-menu-open]). */
export const MENU_EVENT = 'exotiq:menu';

/**
 * Mobile-only sticky action bar. Continues the hero's hierarchy — one orange
 * trial button, a quiet demo alternative — and appears only once the hero's
 * own button is well above the viewport AND the car has cleared the strip the
 * bar covers, so it never sits on the photograph and there is never a second
 * orange target on screen. Stays hidden while the cookie banner owns the
 * bottom edge (no consent decision yet), while the mobile menu is open (the
 * menu has its own orange button) and while the footer is in view.
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
      const stage = document.getElementById(HERO_STAGE_ID);
      const footer = document.querySelector('footer');
      const viewport = window.innerHeight;
      const ctaGone = cta ? cta.getBoundingClientRect().bottom < -CTA_HYSTERESIS : true;
      const carCleared = stage
        ? stage.getBoundingClientRect().bottom <= viewport - BAR_CLEARANCE
        : hero
          ? hero.getBoundingClientRect().bottom <= viewport - BAR_CLEARANCE
          : window.scrollY > FALLBACK_SCROLL_Y;
      const footerInView = footer ? footer.getBoundingClientRect().top < viewport : false;
      const menuOpen = document.body.dataset.menuOpen === 'true';
      setIsVisible(consentDecided && ctaGone && carCleared && !footerInView && !menuOpen);
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
    window.addEventListener(MENU_EVENT, schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener(CONSENT_EVENT, onConsent);
      window.removeEventListener(MENU_EVENT, schedule);
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
          rel="noopener"
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
