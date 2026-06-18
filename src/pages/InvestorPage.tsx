import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Calendar,
  ExternalLink,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Award,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { organizationSchema, breadcrumbSchema } from '../data/structuredData';
import logger from '../utils/logger';

const DECK_URL = 'https://summary.exotiq.ai';
const CALENDLY_URL = 'https://calendly.com/hello-exotiq/30min';

function humanizeInvestorSubmitError(message: string): string {
  if (/23505|duplicate key|already exists|investor_contacts_email_key/i.test(message)) {
    return 'We already have your email on file. If you need to update your information, reply to any Exotiq email or contact hello@exotiq.ai.';
  }
  return message;
}

export default function InvestorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) throw new Error('Configuration missing');

      const response = await fetch(`${supabaseUrl}/functions/v1/handle-investor-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          source: 'website_investor_teaser',
        }),
      });

      const text = await response.text();
      let result: { success?: boolean; error?: string; investorId?: string } = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(text || `Request failed (${response.status})`);
      }

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      logger.info('Investor submission successful', { investorId: result.investorId });

      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'investor_form_submit',
          source: 'teaser_page',
        });
      }

      window.location.href = DECK_URL;
    } catch (error) {
      logger.error('Investor submission error', { error });
      const raw = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setSubmitError(humanizeInvestorSubmitError(raw));
    } finally {
      setIsSubmitting(false);
    }
  };

  const tractionStats = [
    { value: '5', label: 'Operators Signed', sublabel: 'Paid contracts live' },
    { value: '$200M+', label: 'Fleet Value', sublabel: 'Under management' },
    { value: '3 Cities', label: 'Markets Live', sublabel: 'Denver, Scottsdale, Miami' },
    { value: '33%', label: 'Conversion Rate', sublabel: 'vs 3-5% industry avg' },
  ];

  return (
    <div className="pt-16">
      <SEOHead
        title="Invest in Exotiq — The AI Command Center for Exotic Fleet Operations"
        description="Exotiq is raising $2M to build the operating system for the $50B+ exotic car rental market. 5 operators signed, $200M+ fleet value managed, 3 markets live."
        keywords="Exotiq investment, exotic car rental SaaS, fleet management startup, pre-seed round, SAFE note"
        url="https://exotiq.ai/investors"
        noindex={false}
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', url: 'https://exotiq.ai' },
            { name: 'Investors', url: 'https://exotiq.ai/investors' },
          ]),
        ]}
      />

      {/* ─── HERO ─── */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-dark-900 via-dark-900 to-dark-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(110,193,228,0.06),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">

          <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-accent-500/10 border border-accent-500/25">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
            </span>
            <span className="font-inter text-sm font-semibold text-accent-500 uppercase tracking-wide">
              Pre-Seed Round Open
            </span>
          </div>

          <h1 className="font-dfaalt font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]">
            The AI Command Center for the{' '}
            <span className="text-primary-500">$50B+ Exotic Car Rental Market</span>
          </h1>

          <p className="font-inter text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Operators manage Lamborghini rentals on WhatsApp and spreadsheets. Exotiq replaces
            all of it with AI-powered pricing, guest automation, and real-time fleet intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a
              href={DECK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-dfaalt font-bold text-sm uppercase tracking-wide rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-primary-500/20 min-w-[220px]"
            >
              View Investor Deck
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-600 hover:border-primary-500 text-white font-dfaalt font-bold text-sm uppercase tracking-wide rounded-xl transition-all duration-200 hover:scale-105 min-w-[220px]"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Schedule Founder Call
            </a>
          </div>

          <p className="font-inter text-xs text-gray-500">
            $2M Pre-Seed &middot; SAFE &middot; $10M Post-Money Cap
          </p>
        </div>
      </section>

      {/* ─── TRACTION BAR ─── */}
      <section className="py-16 bg-dark-800 border-y border-dark-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {tractionStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-dfaalt font-bold text-3xl sm:text-4xl text-white mb-1">
                  {stat.value}
                </div>
                <div className="font-inter font-semibold text-sm text-primary-500 mb-0.5">
                  {stat.label}
                </div>
                <div className="font-inter text-xs text-gray-500">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY NOW ─── */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="text-center mb-14">
            <h2 className="font-dfaalt font-bold text-3xl sm:text-4xl text-white mb-4">
              A $50B Market with Zero Purpose-Built Technology
            </h2>
            <p className="font-inter text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              The US luxury rental market is growing from $6B to $13B by 2032 at 8.6% CAGR.
              The most premium rental experiences in the world are still run on personal phones
              and five disconnected tools. Exotiq is the first platform built for this asset class.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 hover:border-primary-500/30 transition-colors duration-300">
              <TrendingUp className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="font-dfaalt font-bold text-lg text-white mb-2">Massive Market, Zero Software</h3>
              <p className="font-inter text-sm text-gray-400 leading-relaxed">
                $50B+ global market growing at 8.6% annually. No incumbent has built for exotic
                fleet operators. First-mover advantage is wide open.
              </p>
            </div>
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 hover:border-primary-500/30 transition-colors duration-300">
              <Zap className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="font-dfaalt font-bold text-lg text-white mb-2">AI-Native from Day One</h3>
              <p className="font-inter text-sm text-gray-400 leading-relaxed">
                Dynamic pricing, automated guest messaging, predictive maintenance. AI labor
                costs $0.02 per transaction vs. $25/hour for human operators.
              </p>
            </div>
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 hover:border-primary-500/30 transition-colors duration-300">
              <Shield className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="font-dfaalt font-bold text-lg text-white mb-2">Built by an Operator</h3>
              <p className="font-inter text-sm text-gray-400 leading-relaxed">
                Our founder scaled a top-1% Turo luxury fleet and discovered every gap firsthand.
                Deep operator relationships across Denver, Scottsdale, and Miami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROOF POINTS ─── */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="text-center mb-14">
            <h2 className="font-dfaalt font-bold text-3xl sm:text-4xl text-white mb-4">
              Already Working. Already Paying.
            </h2>
            <p className="font-inter text-lg text-gray-400 max-w-2xl mx-auto">
              Live operators. Paid contracts. Real results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 text-center">
              <div className="font-dfaalt font-bold text-3xl text-primary-500 mb-1">2x</div>
              <div className="font-inter text-sm text-gray-400">Utilization Increase</div>
            </div>
            <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 text-center">
              <div className="font-dfaalt font-bold text-3xl text-primary-500 mb-1">15+</div>
              <div className="font-inter text-sm text-gray-400">Hours Saved / Week</div>
            </div>
            <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 text-center">
              <div className="font-dfaalt font-bold text-3xl text-primary-500 mb-1">&gt;90%</div>
              <div className="font-inter text-sm text-gray-400">Customer Retention</div>
            </div>
            <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 text-center">
              <div className="font-dfaalt font-bold text-3xl text-primary-500 mb-1">85%</div>
              <div className="font-inter text-sm text-gray-400">Gross Margin</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <blockquote className="bg-dark-900 border border-dark-700 rounded-2xl p-8">
              <p className="font-inter text-gray-300 italic leading-relaxed mb-4">
                "We need an integrated system that actually understands how we work. Exotiq gets it."
              </p>
              <footer className="font-inter text-sm text-gray-500">
                <span className="font-semibold text-gray-400">Jay</span> &mdash; Denver Exotic Rental Cars
              </footer>
            </blockquote>
            <blockquote className="bg-dark-900 border border-dark-700 rounded-2xl p-8">
              <p className="font-inter text-gray-300 italic leading-relaxed mb-4">
                "This will change the game. I've been waiting for something like this for years."
              </p>
              <footer className="font-inter text-sm text-gray-500">
                <span className="font-semibold text-gray-400">Sara</span> &mdash; Zara Exotics
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── THE ROUND ─── */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="text-center mb-14">
            <h2 className="font-dfaalt font-bold text-3xl sm:text-4xl text-white mb-4">
              The Round
            </h2>
          </div>

          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 sm:p-10 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-10">
              <div>
                <div className="font-dfaalt font-bold text-4xl text-white mb-1">$2M</div>
                <div className="font-inter text-sm text-gray-400">Pre-Seed Raise</div>
              </div>
              <div>
                <div className="font-dfaalt font-bold text-4xl text-white mb-1">SAFE</div>
                <div className="font-inter text-sm text-gray-400">Instrument</div>
              </div>
              <div>
                <div className="font-dfaalt font-bold text-4xl text-white mb-1">$10M</div>
                <div className="font-inter text-sm text-gray-400">Post-Money Cap</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-inter font-medium text-sm text-gray-300">Product & AI Development</span>
                  <span className="font-dfaalt font-bold text-primary-500">60%</span>
                </div>
                <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-inter font-medium text-sm text-gray-300">GTM & Sales</span>
                  <span className="font-dfaalt font-bold text-accent-500">25%</span>
                </div>
                <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-500 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-inter font-medium text-sm text-gray-300">Operations & Compliance</span>
                  <span className="font-dfaalt font-bold text-gray-400">15%</span>
                </div>
                <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-500 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-inter text-sm text-gray-500 mb-6">
              Capital already committed. Live on AngelList. Early investors get equity in both
              the SaaS and the Drive Exotiq marketplace.
            </p>
            <a
              href={DECK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center font-inter text-primary-500 hover:text-primary-400 font-semibold transition-colors"
            >
              Full financial model and exit scenarios in the deck
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── TEAM & BACKERS ─── */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="text-center mb-14">
            <h2 className="font-dfaalt font-bold text-3xl sm:text-4xl text-white mb-4">
              Led by Operators. Backed by Builders.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {[
              {
                name: 'Gregory Ringler',
                role: 'Founder & CEO',
                desc: 'Top-1% Turo host. Scaled luxury fleet. Operator-first founder.',
                Icon: Users,
              },
              {
                name: 'Nikola Javic',
                role: 'Fractional CTO (Ars Futura)',
                desc: 'AI/ML engineering leader. Multiple SaaS unicorns.',
                Icon: Zap,
              },
              {
                name: 'Yogev Shifman',
                role: 'Advisor (1080 Ventures)',
                desc: 'Co-founded Exodigo ($175M raised). Forbes Technology Council.',
                Icon: Award,
              },
              {
                name: 'Arthur Woods',
                role: 'Advisor (1080 Ventures)',
                desc: 'Serial entrepreneur. Multiple exits. 20 years scaling ventures.',
                Icon: TrendingUp,
              },
              {
                name: 'Mike Looney',
                role: 'Advisor (1080 Ventures)',
                desc: 'SaaS growth strategist. Fundraising and market positioning.',
                Icon: BarChart3,
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-dark-900 border border-dark-700 rounded-2xl p-6 hover:border-primary-500/30 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <member.Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <div className="font-dfaalt font-bold text-white">{member.name}</div>
                    <div className="font-inter text-xs text-primary-500">{member.role}</div>
                  </div>
                </div>
                <p className="font-inter text-sm text-gray-400 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-16">
            <div className="text-center opacity-70 hover:opacity-100 transition-opacity">
              <img
                src="/images/logos/investors/1080-ventures.png"
                alt="1080 Ventures"
                className="h-16 sm:h-20 w-auto max-w-[200px] filter brightness-0 invert mx-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'font-dfaalt font-bold text-xl text-white';
                  fallback.textContent = '1080 Ventures';
                  e.currentTarget.parentElement!.appendChild(fallback);
                }}
              />
            </div>
            <div className="text-center opacity-70 hover:opacity-100 transition-opacity">
              <img
                src="/images/logos/investors/lex-growth-studio.png"
                alt="LEX Growth Studio"
                className="h-16 sm:h-20 w-auto max-w-[200px] mx-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'font-dfaalt font-bold text-xl text-white';
                  fallback.textContent = 'LEX Growth Studio';
                  e.currentTarget.parentElement!.appendChild(fallback);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA / FORM ─── */}
      <section id="form" className="py-24 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="text-center mb-10">
            <h2 className="font-dfaalt font-bold text-3xl sm:text-4xl text-white mb-4">
              View the Full Deck
            </h2>
            <p className="font-inter text-gray-400 leading-relaxed">
              Get access to our complete investor deck with financials, GTM strategy,
              exit scenarios, and product roadmap.
            </p>
          </div>

          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8">
            <form onSubmit={handleFormSubmit} className="space-y-4" autoComplete="on">
              <div>
                <label htmlFor="fullName" className="block font-inter font-medium text-gray-300 mb-1.5 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isSubmitting}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 rounded-lg border border-dark-600 bg-dark-900 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base disabled:opacity-50 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-inter font-medium text-gray-300 mb-1.5 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  placeholder="jane@ventures.com"
                  className="w-full px-4 py-3 rounded-lg border border-dark-600 bg-dark-900 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base disabled:opacity-50 transition-all"
                />
              </div>

              {submitError && (
                <div role="alert" className="bg-accent-500/10 border border-accent-500/25 rounded-lg p-4">
                  <p className="text-accent-500 text-sm">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-dfaalt font-bold text-sm uppercase tracking-wide px-8 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:scale-100 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:shadow-primary-500/20"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-5 h-5" />
                    <span>Get Deck Access</span>
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-600" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-dark-800 px-3 text-gray-500 uppercase tracking-wide">or</span>
              </div>
            </div>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-8 py-4 border-2 border-dark-600 hover:border-primary-500 text-white font-dfaalt font-bold text-sm uppercase tracking-wide rounded-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Schedule a Call with the Founder
            </a>
          </div>

          <p className="text-center font-inter text-xs text-gray-600 mt-6">
            Confidential and proprietary. Accredited investors only.
          </p>
        </div>
      </section>
    </div>
  );
}
