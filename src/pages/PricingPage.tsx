import { ArrowRight, Shield, Zap, Users, Flame } from 'lucide-react';
import PricingCards from '../components/pricing/PricingCards';
import ROICalculator from '../components/pricing/ROICalculator';
import FeatureComparison from '../components/pricing/FeatureComparison';
import PricingFAQ from '../components/pricing/PricingFAQ';
import SEOHead from '../components/SEOHead';
import { openPricingSalesCall, trackPricingCta } from '../utils/pricingCta';
import { founderConfig } from '../data/pricingData';

export default function PricingPage() {
  const founderActive = founderConfig.isActive();

  const goToSalesCall = (location: string) => {
    trackPricingCta({ location, action: 'schedule_demo' });
    openPricingSalesCall();
  };

  return (
    <>
      <SEOHead
        title="Pricing - Exotiq AI Fleet Management"
        description={`Simple, transparent pricing for AI-powered fleet management. Book a demo to walk through plans, ROI, and founder options. Founder pricing available through ${founderConfig.deadlineLabel}.`}
        canonical="https://exotiq.ai/pricing"
      />

      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-black to-[#1B1B1B]">
          <div className="max-w-4xl mx-auto text-center">
            {founderActive ? (
              <div className="inline-flex items-center gap-2 bg-[#FF5733]/10 border border-[#FF5733]/30 rounded-full px-4 py-2 mb-6">
                <Flame className="w-4 h-4 text-[#FF5733]" aria-hidden="true" />
                <span className="font-montserrat text-sm text-[#FF5733] font-semibold">
                  Founder Pricing · {founderConfig.spotsRemaining} of {founderConfig.totalSpots} spots · ends {founderConfig.deadlineShortLabel}
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-[#6BB8E5]/10 border border-[#6BB8E5]/30 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-[#6BB8E5]" aria-hidden="true" />
                <span className="font-montserrat text-sm text-[#6BB8E5] font-semibold">
                  14-Day Free Trial • No Credit Card Required
                </span>
              </div>
            )}

            <h1 className="font-dfaalt font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Pricing Built for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC]">
                Every Fleet
              </span>
            </h1>

            <p className="font-montserrat text-lg sm:text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-10 leading-relaxed">
              From side hustles to enterprise operations. Pay per vehicle, scale as you grow, and lock in founder pricing that never expires.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[#A0A0A0]">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#6BB8E5]" />
                <span className="font-montserrat text-sm">14-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#6BB8E5]" />
                <span className="font-montserrat text-sm">Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#6BB8E5]" />
                <span className="font-montserrat text-sm">Setup in 15 Minutes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <PricingCards />

        {/* Founder Offer Band — only renders while the founder window is open. */}
        {founderActive && (
          <section
            className="px-4 sm:px-6 lg:px-16 xl:px-20 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 bg-black"
            aria-label="Founder pricing offer"
          >
            <div className="max-w-4xl mx-auto w-full">
              <div className="bg-gradient-to-r from-[#FF5733]/15 via-[#FF5733]/8 to-[#FF5733]/15 border border-[#FF5733]/30 rounded-2xl p-7 sm:p-9 shadow-lg shadow-black/40">
                <div className="flex flex-col items-center justify-center gap-7 md:flex-row md:gap-10 md:text-left">
                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-4 md:max-w-xl">
                    <div className="bg-[#FF5733]/20 border border-[#FF5733]/40 rounded-full p-3 flex-shrink-0">
                      <Flame className="w-6 h-6 text-[#FF5733]" aria-hidden="true" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="font-dfaalt font-bold text-xl sm:text-2xl text-white mb-1.5">
                        Lock in lifetime founder rates
                      </h2>
                      <p className="font-montserrat text-sm sm:text-base text-[#A0A0A0] leading-relaxed">
                        Only <span className="text-white font-semibold">{founderConfig.spotsRemaining} of {founderConfig.totalSpots}</span> spots remaining · offer ends <span className="text-white font-semibold">{founderConfig.deadlineLabel}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToSalesCall('founder_offer_band')}
                    className="inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF5733] to-[#E04020] px-7 py-3.5 font-montserrat font-bold text-white shadow-md transition-all duration-200 hover:shadow-xl hover:shadow-[#FF5733]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5733] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
                  >
                    Book a Demo
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ROI Calculator */}
        <ROICalculator />

        {/* Feature Comparison */}
        <FeatureComparison />

        {/* Free Trial CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-black to-[#1B1B1B]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#6BB8E5]/20 to-[#4A9FCC]/10 border border-[#6BB8E5]/30 rounded-3xl p-8 sm:p-12">
              <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">
                See Exotiq in action
              </h2>
              <p className="font-montserrat text-lg text-[#E0E0E0] mb-8 max-w-2xl mx-auto">
                Book a 30-minute product demo. We&apos;ll align pricing to your fleet size, walk through the platform, and answer founder and rollout questions.
              </p>

              <div className="flex flex-col items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => goToSalesCall('mid_page_trial_cta')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC] text-black px-8 py-4 rounded-lg font-montserrat font-bold text-lg hover:shadow-xl hover:shadow-[#6BB8E5]/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6BB8E5] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Book a Demo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <p className="font-montserrat text-sm text-[#A0A0A0] mt-6">
                Join {founderConfig.totalSpots - founderConfig.spotsRemaining}+ fleet operators who locked in founder pricing
              </p>
            </div>
          </div>
        </section>

        {/* Money-Back Guarantee */}
        <section className="py-12 px-4 sm:px-6 lg:px-16 xl:px-20 bg-black border-y border-white/10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              <div className="flex items-start gap-4">
                <Shield className="w-10 h-10 text-[#6BB8E5] flex-shrink-0" />
                <div>
                  <h3 className="font-montserrat font-bold text-white mb-2">30-Day Money-Back Guarantee</h3>
                  <p className="font-montserrat text-sm text-[#A0A0A0]">
                    Not seeing results? Get a full refund within 30 days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Zap className="w-10 h-10 text-[#6BB8E5] flex-shrink-0" />
                <div>
                  <h3 className="font-montserrat font-bold text-white mb-2">Free Migration & Setup</h3>
                  <p className="font-montserrat text-sm text-[#A0A0A0]">
                    We'll handle data migration and onboarding at no extra cost.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="w-10 h-10 text-[#6BB8E5] flex-shrink-0" />
                <div>
                  <h3 className="font-montserrat font-bold text-white mb-2">Dedicated Support</h3>
                  <p className="font-montserrat text-sm text-[#A0A0A0]">
                    Get help from real humans who understand fleet operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <PricingFAQ />

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-t from-black to-[#1B1B1B]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              Ready to Transform Your Fleet?
            </h2>
            <p className="font-montserrat text-lg text-[#A0A0A0] mb-10">
              {founderConfig.isActive()
                ? `Lock in founder pricing today and save forever. Only ${founderConfig.spotsRemaining} of ${founderConfig.totalSpots} spots remaining.`
                : 'Join hundreds of operators using AI to scale your fleet — book a demo to get started.'}
            </p>

            <button
              type="button"
              onClick={() => goToSalesCall('final_cta')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC] text-black px-10 py-5 rounded-lg font-montserrat font-bold text-lg hover:shadow-2xl hover:shadow-[#6BB8E5]/40 transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6BB8E5] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Book a Demo
              <ArrowRight className="w-6 h-6" />
            </button>

            <p className="font-montserrat text-sm text-[#A0A0A0] mt-6">
              30-minute demo · We&apos;ll map the right plan to your operation
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

