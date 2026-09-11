import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MobileContainer } from './MobileOptimizations';
import { trackEngagement, withAttribution } from '../utils/trackers';

/** Desktop hero background. Koenigsegg Regera in a dark studio (2560×1707). */
const HERO_IMG = '/images/hero/koenigsegg-regera.jpg';

/**
 * Mobile (< lg) hero photograph: a portrait cut of the same Regera frame,
 * source rectangle x 1040–2210 × y 430–1707 of the 2560×1707 master
 * (1170×1277 — the studio ceiling above y 430 is never on screen because the
 * stage is bottom-anchored), served at 2× (780w) and 3× (1170w). The rear
 * wheel is fully in frame, the tail bleeds off the left edge and the nose
 * keeps a little air on the right. Recipe (sips + cwebp) lives in
 * public/images/hero/README.md.
 */
const HERO_IMG_MOBILE = {
  webp780: '/images/hero/koenigsegg-regera-mobile-780.webp',
  webp1170: '/images/hero/koenigsegg-regera-mobile-1170.webp',
  jpg780: '/images/hero/koenigsegg-regera-mobile-780.jpg',
  jpg1170: '/images/hero/koenigsegg-regera-mobile-1170.jpg',
  width: 1170,
  height: 1277,
} as const;

/**
 * Media query for the mobile photograph. It must match Tailwind's `lg`
 * breakpoint (min-width: 1024px) exactly, with no gap at fractional widths,
 * and index.html's preload uses the same string.
 */
const MOBILE_MEDIA = '(max-width: 1023.98px)';

/**
 * The <img> fallback when no <source> matches (i.e. at lg and up). A 1×1
 * transparent GIF, so a desktop browser never downloads the mobile asset even
 * though the element sits in a display:none subtree (hidden <img>s still fetch).
 */
const BLANK_GIF =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * React 18 forwards unknown *lowercase* attributes to the DOM; the camelCase
 * `fetchPriority` prop only exists in React 19 (18 warns and drops it).
 */
const FETCH_PRIORITY_HIGH = { fetchpriority: 'high' } as const;

const TRIAL_URL = 'https://app.exotiq.ai';
const DEMO_URL = 'https://calendly.com/hello-exotiq/15-minute-meeting';

/** Objection-killers under the trial button. A list, so screen readers announce three items, not one run-on line. */
const REASSURANCE = ['30 days free', 'No credit card', 'Migration help'] as const;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface HomeHeroSectionProps {
  isVisible: boolean;
  scrollToSection: (id: string) => void;
}

const trackMobileTrial = () =>
  trackEngagement('hero_cta_click', { location: 'mobile_hero_primary', action: 'start_trial' });
const trackMobileDemo = () =>
  trackEngagement('hero_cta_click', { location: 'mobile_hero_demo_link', action: 'schedule_demo' });

/**
 * Below lg the hero is two storeys on a solid #05070a ground, both in normal
 * flow: copy + one orange action on top, then the car parked in the dark,
 * bottom-anchored and feathered into the page black. Because the car is a
 * flex sibling of the copy (not an overlay), text can never sit on the
 * photograph — a taller copy block (large type, landscape, text zoom) pushes
 * the car down instead. Nothing here is gated on `isVisible`: the H1 and the
 * car are the LCP candidates and paint on the first frame. At lg and up the
 * markup after the mobile blocks is the original desktop hero, unchanged.
 */
const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({ isVisible }) => (
  <section
    id="home-hero"
    className="hero-shell relative min-h-screen flex flex-col lg:flex-row lg:items-center overflow-hidden bg-[#05070a]"
  >
    {/* Desktop: car image with a slow cinematic zoom */}
    <div
      className="hero-kenburns absolute inset-0 hidden lg:block bg-cover bg-[position:62%_center] sm:bg-[position:58%_center] will-change-transform"
      style={{ backgroundImage: `url('${HERO_IMG}')` }}
    />

    {/* Desktop: left-dark gradient so copy reads on the left, car breathes on the right */}
    <div
      className="absolute inset-0 hidden lg:block pointer-events-none"
      style={{
        background:
          'linear-gradient(100deg, rgba(5,7,10,0.95) 0%, rgba(5,7,10,0.74) 30%, rgba(5,7,10,0.30) 54%, rgba(5,7,10,0.04) 78%, transparent 100%)',
      }}
    />
    {/* Top + bottom darkening for nav clearance and grounding (desktop) */}
    <div
      className="absolute inset-0 pointer-events-none hidden lg:block"
      style={{
        background:
          'linear-gradient(to bottom, rgba(5,7,10,0.55) 0%, transparent 16%, transparent 78%, rgba(5,7,10,0.8) 100%)',
      }}
    />

    {/* Desktop copy — the original hero block, unchanged. It comes first in the DOM so the
        first <h1> a 1280px-wide prerender sees is the visible one. */}
    <div className="relative z-10 w-full hidden lg:block">
      <MobileContainer>
        <div
          className={`max-w-xl text-center lg:text-left mx-auto lg:mx-0 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p
            className="font-inter text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-primary-300/90 mb-4"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}
          >
            The agentic operating system for exotic rental fleets
          </p>

          <h1
            className="font-dfaalt font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.65)' }}
          >
            Your exotic fleet runs on five tools and a spreadsheet.{' '}
            <span className="text-primary-400">Run it on one platform.</span>
          </h1>

          <p
            className="font-inter text-lg sm:text-xl text-gray-200 leading-relaxed mt-6 max-w-lg mx-auto lg:mx-0"
            style={{ textShadow: '0 1px 18px rgba(0,0,0,0.8)' }}
          >
            One command center for pricing, bookings, compliance, and guest comms, with AI that
            handles the admin you used to do at midnight.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 sm:gap-4">
            <a
              href="https://app.exotiq.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 font-dfaalt font-semibold text-base px-8 py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/25 transition-colors duration-200 min-h-[52px]"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://calendly.com/hello-exotiq/15-minute-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center font-inter font-medium text-base px-8 py-4 rounded-xl text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/35 backdrop-blur-sm transition-colors duration-200 min-h-[52px]"
            >
              Book a demo
            </a>
          </div>

          <p
            className="font-inter text-sm text-gray-400 mt-5"
            style={{ textShadow: '0 1px 14px rgba(0,0,0,0.8)' }}
          >
            30 days free. No credit card. We help migrate your fleet.
          </p>
        </div>
      </MobileContainer>
    </div>

    {/* Mobile: a faint studio light behind the copy so the top storey is a lit room, not a flat slab */}
    <div
      className="absolute inset-x-0 top-0 h-[60vh] lg:hidden pointer-events-none"
      style={{
        background:
          'radial-gradient(120% 70% at 18% 10%, rgba(255,241,224,0.16) 0%, rgba(255,241,224,0.06) 36%, rgba(5,7,10,0) 70%)',
      }}
    />

    {/* Mobile copy + action. Solid ground, left-aligned, nothing under the cookie banner. */}
    <div className="hero-copy relative z-10 w-full px-5 pt-28 pb-4 sm:px-8 sm:pt-32 lg:hidden">
      <div className="sm:max-w-lg">
        {/* The payoff gets its own line: a block accent never dangles "Run it" off a white line. */}
        <h1 className="font-dfaalt font-bold text-white text-[length:clamp(1.75rem,8.2vw,2rem)] sm:text-5xl leading-[1.1] sm:leading-[1.05] tracking-tight">
          Five tools and a spreadsheet?{' '}
          <span className="block text-primary-400">Run it on one platform.</span>
        </h1>

        <p className="mt-5 font-inter text-[length:clamp(1rem,4.36vw,1.0625rem)] leading-[1.53] sm:text-lg sm:leading-relaxed text-gray-300 text-pretty">
          Pricing, bookings, compliance, and guest comms for your exotic fleet. AI does the admin
          you used to do at midnight.
        </p>

        <a
          id="hero-primary-cta"
          href={withAttribution(TRIAL_URL)}
          target="_blank"
          rel="noopener"
          onClick={trackMobileTrial}
          className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent-500 active:bg-accent-600 font-dfaalt font-bold text-[19px] leading-none text-white shadow-[0_12px_32px_-10px_rgba(241,90,41,0.55),inset_0_1px_0_rgba(255,255,255,0.16)] transition-[transform,background-color] duration-150 ease-out active:scale-[0.985] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070a]"
        >
          Start Free Trial
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </a>

        {/* Microcopy for the button above it. Items never break internally; only between items on very narrow phones. */}
        <ul
          data-hero="reassurance"
          role="list"
          className="mt-3 flex flex-wrap items-center justify-center gap-x-1 min-[360px]:gap-x-1.5 font-inter text-[13px] leading-[18px] font-medium text-gray-400"
        >
          {REASSURANCE.map((item, index) => (
            <li key={item} className="flex items-center gap-x-1 min-[360px]:gap-x-1.5 whitespace-nowrap">
              {index > 0 && <span aria-hidden="true">·</span>}
              {item}
            </li>
          ))}
        </ul>

        <a
          data-hero="demo"
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackMobileDemo}
          className="mt-1 flex min-h-[44px] w-full items-center justify-center font-inter text-[15px] leading-5 font-medium text-white/85 active:text-white transition-colors duration-150 touch-manipulation focus-visible:outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-primary-400/70"
        >
          Or&nbsp;
          <span className="underline underline-offset-4 decoration-white/35">book a 15-minute demo</span>
        </a>
      </div>
    </div>

    {/* Mobile: the car. A flex sibling that fills whatever the copy leaves of the first viewport
        (never less than roof-to-wheels), photograph bottom-anchored 32px above the section edge so
        the wheels clear the cookie banner on first visit. Wall and floor dissolve into page black. */}
    <div id="hero-stage" className="hero-stage relative w-full overflow-hidden pointer-events-none lg:hidden" aria-hidden="true">
      <picture className="absolute inset-x-0 top-0 bottom-8 block">
        <source
          type="image/webp"
          media={MOBILE_MEDIA}
          srcSet={`${HERO_IMG_MOBILE.webp780} 780w, ${HERO_IMG_MOBILE.webp1170} 1170w`}
          sizes="100vw"
        />
        <source
          type="image/jpeg"
          media={MOBILE_MEDIA}
          srcSet={`${HERO_IMG_MOBILE.jpg780} 780w, ${HERO_IMG_MOBILE.jpg1170} 1170w`}
          sizes="100vw"
        />
        <img
          src={BLANK_GIF}
          width={HERO_IMG_MOBILE.width}
          height={HERO_IMG_MOBILE.height}
          alt=""
          className="block h-full w-full object-cover object-bottom"
          {...FETCH_PRIORITY_HIGH}
        />
      </picture>
      <div className="hero-stage-fade absolute inset-0" />
    </div>

    {/* Film grain */}
    <div
      className="absolute inset-0 opacity-[0.05] mix-blend-soft-light pointer-events-none"
      style={{ backgroundImage: GRAIN, backgroundSize: '180px 180px' }}
    />

    <style>{`
      .hero-kenburns { animation: heroZoom 28s ease-in-out infinite alternate; transform-origin: 60% 55%; }
      @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.07); } }
      @media (prefers-reduced-motion: reduce) { .hero-kenburns { animation: none; } }

      /* ---- Mobile / tablet (< lg) ------------------------------------------------
         The section is a column: copy, then the car. svh keeps the first paint
         stable under Safari's collapsing toolbar (the vh line is the fallback).
         The photograph is width-fitted and bottom-anchored, so the car's position
         is a linear function of the viewport width: roof ~63vw and tyre contact
         ~26vw above the image bottom, which itself sits 32px above the stage edge.
         Every gradient below is written in those terms, so the feather lands in
         the same place on every phone: the wall dissolves ~40px above the roof,
         the floor reflection sinks into black, and the cut tail on the left edge
         drops into shadow. The stage grows to fill the first viewport and never
         shrinks below roof-to-wheels. */
      @media (max-width: 1023.98px) {
        .hero-shell { min-height: 100vh; min-height: 100svh; }
        .hero-stage { flex: 1 0 auto; min-height: calc(72vw + 32px); }
        .hero-stage-fade {
          background:
            linear-gradient(to bottom, #05070a 0, rgba(5,7,10,0.6) 20px, rgba(5,7,10,0) 48px),
            linear-gradient(to top,
              rgba(5,7,10,0) calc(66vw + 32px), rgba(5,7,10,0.5) calc(72vw + 32px),
              rgba(5,7,10,0.85) calc(78vw + 32px), #05070a calc(88vw + 32px)),
            linear-gradient(to top,
              #05070a 0, #05070a 32px, rgba(5,7,10,0.85) 44px, rgba(5,7,10,0.35) 60px, rgba(5,7,10,0) 80px),
            linear-gradient(to right, rgba(5,7,10,0.55) 0, rgba(5,7,10,0) 18%);
        }
      }
      /* Landscape phones: the sm: type scale is width-based, so pull the copy back to the
         phone scale here or the orange button lands below a 390px-tall fold. A width-fitted
         car would be 2x too tall for the viewport, so show the middle of the frame (roof to
         floor) in a shorter band instead. */
      @media (max-width: 1023.98px) and (max-height: 500px) and (orientation: landscape) {
        .hero-copy { padding-top: 5rem; }
        .hero-copy h1 { font-size: 1.75rem; line-height: 1.1; }
        .hero-copy p { font-size: 1rem; line-height: 1.5; margin-top: 0.75rem; }
        .hero-copy #hero-primary-cta { margin-top: 1rem; }
        .hero-stage { flex: 0 0 auto; min-height: 44vw; }
        .hero-stage picture { bottom: 0; }
        .hero-stage img { object-position: 50% 82%; }
        .hero-stage-fade {
          background:
            linear-gradient(to bottom, #05070a 0, rgba(5,7,10,0) 24%),
            linear-gradient(to top, #05070a 0, rgba(5,7,10,0) 12%),
            linear-gradient(to right, rgba(5,7,10,0.55) 0, rgba(5,7,10,0) 18%);
        }
      }
    `}</style>
  </section>
);

export default HomeHeroSection;
