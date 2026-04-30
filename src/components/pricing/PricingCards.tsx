import { Check, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { pricingTiers, getAnnualPrice } from '../../data/pricingData';
import { openPricingSalesCall, trackPricingCta } from '../../utils/pricingCta';

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);
  const billing = isAnnual ? 'annual' : 'monthly';

  const handleSelectPlan = (tierId: string) => {
    trackPricingCta({
      location: `pricing_card_${tierId}`,
      action: 'schedule_demo',
      tier: tierId,
      billing,
    });
    openPricingSalesCall();
  };

  return (
    <div className="pt-20 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-black to-dark-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="font-montserrat text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-10">
            Start with a 14-day free trial. Scale as you grow. Cancel anytime.
          </p>

          <div
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1.5"
            role="tablist"
            aria-label="Billing period"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isAnnual}
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full font-montserrat text-sm font-medium transition-all duration-200 ${
                !isAnnual
                  ? 'bg-primary-500 text-dark-950'
                  : 'text-white/80 hover:text-primary-300'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isAnnual}
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full font-montserrat text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isAnnual
                  ? 'bg-primary-500 text-dark-950'
                  : 'text-white/80 hover:text-primary-300'
              }`}
            >
              Annual
              <span className="text-xs bg-success-500 text-white px-2 py-0.5 rounded-full font-bold">
                2 months free
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-6">
          {pricingTiers.map((tier) => {
            const monthlyBase = tier.basePrice;
            const annualTotal = getAnnualPrice(monthlyBase);
            const monthlyEquivalent = isAnnual ? Math.round(annualTotal / 12) : monthlyBase;
            const isPerVehicle = tier.pricingModel === 'per-vehicle';
            const saveAmount = monthlyBase * 2;

            const ctaLabel = 'Book a Demo';

            return (
              <div
                key={tier.id}
                className={`flex h-full min-h-0 flex-col gap-0 rounded-2xl border p-7 transition-colors duration-200 lg:p-8 ${
                  tier.popular
                    ? 'border-primary-500/40 bg-primary-500/[0.05] ring-1 ring-primary-500/20'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                {/* Row 1: tier label OR Most popular (always 24px) */}
                <div
                  className={`mb-4 flex h-6 shrink-0 items-center ${tier.popular ? 'justify-end' : 'justify-start'}`}
                >
                  {tier.popular ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary-500/30 bg-primary-500/15 px-2.5 py-0.5 font-montserrat text-[11px] font-semibold uppercase tracking-wide text-primary-300">
                      Most popular
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-400">
                      {tier.label}
                    </span>
                  )}
                </div>

                {/* Name + tagline (tagline min-height reserves 2 lines) */}
                <div className="mb-4">
                  <h3 className="mb-2 font-dfaalt text-2xl font-bold text-white">{tier.name}</h3>
                  <p className="min-h-[3.25rem] font-montserrat text-sm leading-relaxed text-white/60">
                    {tier.tagline}
                  </p>
                </div>

                <div className="mb-4 h-px shrink-0 bg-white/10" />

                {/* Price block — aligned min-heights across all cards */}
                <div className="mb-4 flex flex-col gap-1.5">
                  <div className="flex min-h-[3.25rem] items-baseline gap-1.5">
                    <span className="font-dfaalt text-5xl font-bold tracking-tight text-white">
                      ${monthlyEquivalent}
                    </span>
                    <span className="font-montserrat text-sm text-white/55">
                      {isPerVehicle ? '/vehicle/mo' : '/month'}
                    </span>
                  </div>

                  <div className="min-h-[2.75rem] font-montserrat text-sm text-white/75">
                    {isPerVehicle ? (
                      <>
                        <p>
                          Minimum ${tier.minCharge}/month
                          {isAnnual && tier.minCharge
                            ? ` ($${tier.minCharge * 10}/year prepay)`
                            : ''}
                        </p>
                        <p className="text-white/45">1–10 vehicles</p>
                      </>
                    ) : (
                      <>
                        <p>Up to {tier.includedVehicles} vehicles included</p>
                        <p className="text-white/45">
                          +${tier.overagePrice}/vehicle after
                        </p>
                      </>
                    )}
                  </div>

                  <p
                    className={`min-h-[1.25rem] font-montserrat text-xs font-medium ${
                      isAnnual ? 'text-success-500' : 'text-transparent select-none'
                    }`}
                    aria-hidden={!isAnnual}
                  >
                    {isAnnual
                      ? `Save $${saveAmount}${isPerVehicle ? '/vehicle' : ''}/yr with annual billing`
                      : '\u00A0'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPlan(tier.id)}
                  aria-label={`Book a demo for the ${tier.name} plan`}
                  className={`mb-5 w-full min-h-12 rounded-lg font-montserrat text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 ${
                    tier.popular
                      ? 'bg-primary-500 text-dark-950 hover:bg-primary-400'
                      : 'border border-white/15 bg-white/[0.06] text-white hover:bg-white/10'
                  }`}
                >
                  {ctaLabel}
                </button>

                <div className="mb-4 h-px shrink-0 bg-white/10" />

                <ul className="min-h-0 flex-1 space-y-2.5">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-500"
                        aria-hidden="true"
                      />
                      <span className="font-montserrat text-sm leading-relaxed text-white/85">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {tier.id !== 'starter' && (
                  <div className="mt-4 flex items-center gap-1.5 text-primary-400/90">
                    <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="font-montserrat text-[11px] font-medium">AI features included</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
