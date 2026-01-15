import { useEffect } from 'react';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import FounderBanner from '../components/pricing/FounderBanner';
import PricingCards from '../components/pricing/PricingCards';
import ROICalculator from '../components/pricing/ROICalculator';
import FeatureComparison from '../components/pricing/FeatureComparison';
import PricingFAQ from '../components/pricing/PricingFAQ';
import SEOHead from '../components/SEOHead';

export default function PricingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Pricing - Exotiq AI Fleet Management"
        description="Simple, transparent pricing for AI-powered fleet management. Start with a 14-day free trial. Lock in founder pricing before March 31, 2025."
        canonical="https://exotiq.ai/pricing"
      />

      <div className="min-h-screen bg-black">
        {/* Founder Urgency Banner */}
        <FounderBanner />

        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-black to-[#1B1B1B]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#6BB8E5]/10 border border-[#6BB8E5]/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-[#6BB8E5]" />
              <span className="font-montserrat text-sm text-[#6BB8E5] font-semibold">
                14-Day Free Trial • No Credit Card Required
              </span>
            </div>

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

        {/* ROI Calculator */}
        <ROICalculator />

        {/* Feature Comparison */}
        <FeatureComparison />

        {/* Free Trial CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-black to-[#1B1B1B]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-[#6BB8E5]/20 to-[#4A9FCC]/10 border border-[#6BB8E5]/30 rounded-3xl p-8 sm:p-12">
              <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">
                Try Exotiq Free for 14 Days
              </h2>
              <p className="font-montserrat text-lg text-[#E0E0E0] mb-8 max-w-2xl mx-auto">
                See how AI can transform your fleet operations. No credit card required to start your trial.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC] text-black px-8 py-4 rounded-lg font-montserrat font-bold text-lg hover:shadow-xl hover:shadow-[#6BB8E5]/30 transition-all duration-200">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="https://calendly.com/hello-exotiq/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg font-montserrat font-semibold hover:bg-white/20 border border-white/20 transition-all duration-200"
                >
                  Schedule Demo
                </a>
              </div>

              <p className="font-montserrat text-sm text-[#A0A0A0] mt-6">
                Join 73+ fleet operators who locked in founder pricing
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
              Lock in founder pricing today and save forever. Only 73 spots remaining.
            </p>

            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC] text-black px-10 py-5 rounded-lg font-montserrat font-bold text-lg hover:shadow-2xl hover:shadow-[#6BB8E5]/40 transition-all duration-200 hover:scale-105">
              Get Started Now
              <ArrowRight className="w-6 h-6" />
            </button>

            <p className="font-montserrat text-sm text-[#A0A0A0] mt-6">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

