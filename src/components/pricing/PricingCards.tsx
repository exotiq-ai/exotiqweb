import { Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { pricingTiers, APP_URL } from '../../data/pricingData';
import { PRICING_SALES_CALENDLY, trackPricingCta } from '../../utils/pricingCta';

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleCta = (tierId: string) => {
    const billing = isAnnual ? 'annual' : 'monthly';
    trackPricingCta({
      location: `pricing_card_${tierId}`,
      action: tierId === 'enterprise' ? 'schedule_demo' : 'start_trial',
      tier: tierId,
      billing,
    });

    if (tierId === 'enterprise') {
      window.open(PRICING_SALES_CALENDLY, '_blank', 'noopener,noreferrer');
    } else {
      window.open(APP_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="pt-20 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-black to-dark-900">
      <div className="max-w-6xl mx-auto">
        {/* Header + billing toggle */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="font-montserrat text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-4">
            All features included on every plan. Pay per vehicle, scale as you grow.
          </p>
          <p className="font-montserrat text-sm text-primary-400 mb-10">
            Launch pricing — lock in today before rates increase in 2027
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
                Save 2 months
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingTiers.map((tier) => {
            const isEnterprise = tier.id === 'enterprise';
            const isPro = !!tier.popular;

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-2xl border p-7 lg:p-8 transition-colors duration-200 ${
                  isPro
                    ? 'border-primary-500/40 bg-primary-500/[0.05] ring-1 ring-primary-500/20'
                    : isEnterprise
                      ? 'border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
              >
                {/* Label */}
                <div className="mb-4 flex h-6 items-center">
                  {isPro ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary-500/30 bg-primary-500/15 px-2.5 py-0.5 font-montserrat text-[11px] font-semibold uppercase tracking-wide text-primary-300">
                      Most Popular
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-400 font-montserrat">
                      {tier.label}
                    </span>
                  )}
                </div>

                {/* Name + tagline */}
                <div className="mb-4">
                  <h3 className="mb-2 font-dfaalt text-2xl font-bold text-white">{tier.name}</h3>
                  <p className="min-h-[2.5rem] font-montserrat text-sm leading-relaxed text-white/60">
                    {tier.tagline}
                  </p>
                </div>

                <div className="mb-4 h-px bg-white/10" />

                {/* Price */}
                <div className="mb-6">
                  {isEnterprise ? (
                    <div className="min-h-[5.5rem] flex flex-col justify-center">
                      <span className="font-dfaalt text-4xl font-bold text-white">Custom</span>
                      <span className="font-montserrat text-sm text-white/55 mt-1">
                        Tailored for 51+ vehicles
                      </span>
                    </div>
                  ) : (
                    <div className="min-h-[5.5rem]">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-dfaalt text-5xl font-bold tracking-tight text-white">
                          ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                        </span>
                        <span className="font-montserrat text-sm text-white/55">
                          /vehicle/{isAnnual ? 'year' : 'month'}
                        </span>
                      </div>
                      {isAnnual && tier.monthlyPrice ? (
                        <p className="font-montserrat text-xs text-success-500 mt-1.5">
                          Save ${tier.monthlyPrice * 2}/vehicle/year vs monthly
                        </p>
                      ) : (
                        <p className="font-montserrat text-xs text-white/40 mt-1.5">
                          or ${tier.annualPrice}/vehicle/year — save 2 months
                        </p>
                      )}
                      <p className="font-montserrat text-xs text-white/40 mt-0.5">
                        {tier.vehicleRange}
                      </p>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => handleCta(tier.id)}
                  aria-label={
                    isEnterprise
                      ? 'Schedule a demo for the Enterprise plan'
                      : `Start free trial for the ${tier.name} plan`
                  }
                  className={`mb-2 w-full min-h-12 rounded-lg font-montserrat text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 ${
                    isEnterprise
                      ? 'border border-white/20 bg-white/[0.06] text-white hover:bg-white/10'
                      : 'bg-primary-500 text-dark-950 hover:bg-primary-400'
                  }`}
                >
                  {isEnterprise ? 'Schedule a Demo' : 'Start Free Trial'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {!isEnterprise && (
                  <p className="text-center font-montserrat text-[11px] text-white/40 mb-4">
                    14 days free · No credit card required
                  </p>
                )}
                {isEnterprise && <div className="mb-4" />}

                <div className="mb-4 h-px bg-white/10" />

                {/* Features */}
                {tier.inheritLabel && (
                  <p className="font-montserrat text-xs font-semibold text-white/70 mb-3 uppercase tracking-wide">
                    {tier.inheritLabel}
                  </p>
                )}
                <ul className="flex-1 space-y-2.5">
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
              </div>
            );
          })}
        </div>

        <p className="text-center font-montserrat text-sm text-white/40 mt-8">
          14 days free · No credit card · All features included
        </p>
      </div>
    </section>
  );
}
