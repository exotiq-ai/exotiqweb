import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import PricingCards from '../components/pricing/PricingCards';
import ROICalculator from '../components/pricing/ROICalculator';
import FeatureComparison from '../components/pricing/FeatureComparison';
import PricingFAQ from '../components/pricing/PricingFAQ';
import SEOHead from '../components/SEOHead';
import { pricingProductSchema, faqSchema, breadcrumbSchema } from '../data/structuredData';
import { openPricingSalesCall, trackPricingCta } from '../utils/pricingCta';

export default function PricingPage() {
  const goToSalesCall = (location: string) => {
    trackPricingCta({ location, action: 'schedule_demo' });
    openPricingSalesCall();
  };

  return (
    <>
      <SEOHead
        title="Pricing — exotiq AI Fleet Management"
        description="Simple per-vehicle pricing for AI-powered fleet management. All features included. $39/vehicle/month for Pro, $29/vehicle/month for Business. 14-day free trial, no credit card required."
        canonical="https://exotiq.ai/pricing"
        structuredData={[
          pricingProductSchema,
          faqSchema,
          breadcrumbSchema([
            { name: "Home", url: "https://exotiq.ai" },
            { name: "Pricing", url: "https://exotiq.ai/pricing" }
          ])
        ]}
      />

      <div className="min-h-screen bg-black">
        {/* Hero */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-black to-[#1B1B1B]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#6BB8E5]/10 border border-[#6BB8E5]/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-[#6BB8E5]" aria-hidden="true" />
              <span className="font-montserrat text-sm text-[#6BB8E5] font-semibold">
                14-Day Free Trial · No Credit Card Required
              </span>
            </div>

            <h1 className="font-dfaalt font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              All Features.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC]">
                Every Plan.
              </span>
            </h1>

            <p className="font-montserrat text-lg sm:text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-10 leading-relaxed">
              $39/vehicle/month — everything you need to manage and grow your
              exotic rental fleet. Pay per vehicle, scale as you grow.
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

        {/* ROI Calculator */}
        <ROICalculator />

        {/* Feature Comparison */}
        <FeatureComparison />

        {/* Book a Demo CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-black to-[#1B1B1B]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#6BB8E5]/20 to-[#4A9FCC]/10 border border-[#6BB8E5]/30 rounded-3xl p-8 sm:p-12">
              <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">
                See Exotiq in Action
              </h2>
              <p className="font-montserrat text-lg text-[#E0E0E0] mb-8 max-w-2xl mx-auto">
                Book a 30-minute product demo. We&apos;ll walk through the
                platform, discuss your fleet, and help you choose the right
                plan.
              </p>

              <div className="flex flex-col items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => goToSalesCall('mid_page_demo_cta')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC] text-black px-8 py-4 rounded-lg font-montserrat font-bold text-lg hover:shadow-xl hover:shadow-[#6BB8E5]/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6BB8E5] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Book a Demo
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <p className="font-montserrat text-sm text-[#A0A0A0] mt-6">
                30-minute call · No commitment · We&apos;ll map the right plan
                to your operation
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
                  <h3 className="font-montserrat font-bold text-white mb-2">
                    30-Day Money-Back Guarantee
                  </h3>
                  <p className="font-montserrat text-sm text-[#A0A0A0]">
                    Not seeing results? Get a full refund within 30 days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Zap className="w-10 h-10 text-[#6BB8E5] flex-shrink-0" />
                <div>
                  <h3 className="font-montserrat font-bold text-white mb-2">
                    Free Migration &amp; Setup
                  </h3>
                  <p className="font-montserrat text-sm text-[#A0A0A0]">
                    We&apos;ll handle data migration and onboarding at no extra
                    cost.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="w-10 h-10 text-[#6BB8E5] flex-shrink-0" />
                <div>
                  <h3 className="font-montserrat font-bold text-white mb-2">
                    Dedicated Support
                  </h3>
                  <p className="font-montserrat text-sm text-[#A0A0A0]">
                    Get help from real humans who understand fleet operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <PricingFAQ />

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-t from-black to-[#1B1B1B]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              Ready to Transform Your Fleet?
            </h2>
            <p className="font-montserrat text-lg text-[#A0A0A0] mb-10">
              Join operators using AI to scale their fleet — book a demo to get
              started.
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
