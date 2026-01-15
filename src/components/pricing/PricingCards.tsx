import { Check, Sparkles, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { pricingTiers, calculatePrice, getAnnualPrice } from '../../data/pricingData';

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleSelectPlan = (tierId: string) => {
    // TODO: Open plan selection modal with Stripe checkout
    console.log('Selected plan:', tierId, 'Annual:', isAnnual);
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-black to-[#1B1B1B]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="font-montserrat text-lg sm:text-xl text-[#A0A0A0] max-w-3xl mx-auto mb-10">
            Start with a 14-day free trial. Scale as you grow. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-2">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-montserrat text-sm font-medium transition-all duration-200 ${
                !isAnnual
                  ? 'bg-[#6BB8E5] text-black'
                  : 'text-white hover:text-[#6BB8E5]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-montserrat text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isAnnual
                  ? 'bg-[#6BB8E5] text-black'
                  : 'text-white hover:text-[#6BB8E5]'
              }`}
            >
              Annual
              <span className="text-xs bg-[#22C55E] text-white px-2 py-0.5 rounded-full font-bold">
                2 months free
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {pricingTiers.map((tier) => {
            // Calculate pricing based on model
            const displayPrice = tier.pricingModel === 'per-vehicle'
              ? tier.basePrice
              : tier.basePrice;
              
            const annualPrice = getAnnualPrice(displayPrice);
            const monthlyEquivalent = isAnnual ? Math.round(annualPrice / 12) : displayPrice;

            return (
              <div
                key={tier.id}
                className={`relative bg-white/5 backdrop-blur-sm border-2 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-2xl ${
                  tier.popular
                    ? 'border-accent-500 shadow-2xl shadow-accent-500/30 lg:scale-105 bg-white/8'
                    : 'border-white/10 hover:border-primary-500/50'
                }`}
              >
                {/* Popular Badge - Enhanced with larger size and animation */}
                {tier.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-accent-500 via-accent-600 to-accent-500 text-white px-6 py-2.5 rounded-full text-base font-bold flex items-center gap-2 shadow-xl animate-pulse-subtle">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-dfaalt">{tier.label}</span>
                    </div>
                  </div>
                )}

                {/* Tier Label (for non-popular) */}
                {!tier.popular && (
                  <div className="text-[#6BB8E5] text-xs font-semibold uppercase tracking-wide mb-2">
                    {tier.label}
                  </div>
                )}

                {/* Tier Name */}
                <h3 className="font-montserrat font-bold text-2xl text-white mb-2">
                  {tier.name}
                </h3>

                {/* Tagline */}
                <p className="font-montserrat text-sm text-[#A0A0A0] mb-6">
                  {tier.tagline}
                </p>

                {/* Pricing */}
                <div className="mb-6">
                  {tier.pricingModel === 'per-vehicle' ? (
                    // Per-vehicle pricing (Starter)
                    <>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="font-montserrat font-bold text-4xl sm:text-5xl text-white">
                          ${monthlyEquivalent}
                        </span>
                        <span className="font-montserrat text-base text-[#A0A0A0]">
                          /vehicle/month
                        </span>
                      </div>
                      <p className="font-montserrat text-sm text-[#6BB8E5] mb-2">
                        Minimum ${tier.minCharge}/month
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-montserrat text-sm text-[#A0A0A0] line-through">
                          ${tier.regularPrice}/vehicle/month
                        </span>
                        <span className="text-xs bg-[#6BB8E5]/20 text-[#6BB8E5] px-2 py-0.5 rounded-full">
                          Founder Price
                        </span>
                      </div>
                    </>
                  ) : (
                    // Flat pricing (Professional, Business, Enterprise)
                    <>
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="font-montserrat font-bold text-4xl sm:text-5xl text-white">
                          ${isAnnual ? monthlyEquivalent : displayPrice}
                        </span>
                        <span className="font-montserrat text-base text-[#A0A0A0]">
                          /month
                        </span>
                      </div>
                      {isAnnual && (
                        <p className="font-montserrat text-sm text-[#22C55E] mb-2">
                          ${annualPrice}/year (2 months free!)
                        </p>
                      )}
                      <p className="font-montserrat text-sm text-[#6BB8E5] mb-2">
                        Includes up to {tier.includedVehicles} vehicles
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-montserrat text-sm text-[#A0A0A0] line-through">
                          ${tier.regularPrice}/vehicle/month equivalent
                        </span>
                        <span className="text-xs bg-[#6BB8E5]/20 text-[#6BB8E5] px-2 py-0.5 rounded-full">
                          Founder Price
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(tier.id)}
                  className={`w-full py-3 rounded-lg font-montserrat font-semibold text-sm transition-all duration-200 mb-6 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#FFC700] text-black hover:shadow-lg hover:shadow-[#FFD700]/50'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {tier.popular ? 'Lock in Founder Pricing' : 'Start Free Trial'}
                </button>

                {/* Features List */}
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                      <span className="font-montserrat text-sm text-[#E0E0E0] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* AI Badge for Professional+ */}
                {tier.id !== 'starter' && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-[#6BB8E5]">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-montserrat text-xs font-semibold">
                        AI-Powered Intelligence
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-montserrat text-[#A0A0A0] mb-4">
            Need custom pricing for 150+ vehicles?
          </p>
          <a
            href="https://calendly.com/hello-exotiq/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-montserrat text-[#6BB8E5] hover:text-[#5AA7D4] transition-colors font-semibold"
          >
            Schedule Enterprise Demo →
          </a>
        </div>
      </div>
    </div>
  );
}
