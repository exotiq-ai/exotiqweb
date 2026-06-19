import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MobileContainer } from './MobileOptimizations';

/** Hero background. Koenigsegg Regera in a dark studio (5107×3405). */
const HERO_IMG = '/images/hero/koenigsegg-regera.jpg';

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface HomeHeroSectionProps {
  isVisible: boolean;
  scrollToSection: (id: string) => void;
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({ isVisible }) => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-[#05070a]">
    {/* Car image with a slow cinematic zoom */}
    <div
      className="hero-kenburns absolute inset-0 bg-cover bg-[position:62%_center] sm:bg-[position:58%_center] will-change-transform"
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
    {/* Mobile: vertical scrim — dark behind the headline and the CTAs, car visible in the middle */}
    <div
      className="absolute inset-0 lg:hidden pointer-events-none"
      style={{
        background:
          'linear-gradient(to bottom, rgba(5,7,10,0.58) 0%, transparent 26%), linear-gradient(to top, rgba(5,7,10,0.96) 6%, rgba(5,7,10,0.72) 30%, rgba(5,7,10,0.12) 56%, transparent 72%)',
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

    {/* Film grain */}
    <div
      className="absolute inset-0 opacity-[0.05] mix-blend-soft-light pointer-events-none"
      style={{ backgroundImage: GRAIN, backgroundSize: '180px 180px' }}
    />

    <div className="relative z-10 w-full">
      <MobileContainer>
        <div
          className={`max-w-xl text-center lg:text-left mx-auto lg:mx-0 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1
            className="font-dfaalt font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.65)' }}
          >
            Your fleet runs on five tools and a spreadsheet.{' '}
            <span className="text-primary-400">Run it on one.</span>
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

    <style>{`
      .hero-kenburns { animation: heroZoom 28s ease-in-out infinite alternate; transform-origin: 60% 55%; }
      @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.07); } }
      @media (prefers-reduced-motion: reduce) { .hero-kenburns { animation: none; } }
    `}</style>
  </section>
);

export default HomeHeroSection;
