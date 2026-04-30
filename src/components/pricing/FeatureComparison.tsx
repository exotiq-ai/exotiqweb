import { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { featureComparison } from '../../data/pricingData';
import { PRICING_SALES_CALENDLY, trackPricingCta } from '../../utils/pricingCta';

type TierKey = 'starter' | 'professional' | 'business' | 'enterprise';

const TIER_OPTIONS: Array<{ key: TierKey; label: string }> = [
  { key: 'starter', label: 'Starter' },
  { key: 'professional', label: 'Professional' },
  { key: 'business', label: 'Business' },
  { key: 'enterprise', label: 'Enterprise' },
];

export default function FeatureComparison() {
  const [isExpanded, setIsExpanded] = useState(false);
  // Mobile-only: which single tier the user is currently inspecting.
  const [activeMobileTier, setActiveMobileTier] = useState<TierKey>('professional');

  const visibleFeatures = isExpanded ? featureComparison : featureComparison.slice(0, 8);

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-6 h-6 text-success-500 mx-auto transition-transform hover:scale-125" aria-label="Included" />
      ) : (
        <X className="w-6 h-6 text-gray-500 mx-auto opacity-30" aria-label="Not included" />
      );
    }
    return <span className="text-sm font-montserrat font-medium text-white">{value}</span>;
  };

  const renderMobileValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="inline-flex items-center gap-1 text-success-500 text-sm font-medium">
          <Check className="w-4 h-4" aria-hidden="true" /> Included
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-gray-400 text-sm">
          <X className="w-4 h-4" aria-hidden="true" /> Not included
        </span>
      );
    }
    return <span className="text-sm font-montserrat font-medium text-white">{value}</span>;
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-[#1B1B1B] to-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Compare Features Across All Tiers
          </h2>
          <p className="font-montserrat text-lg text-[#A0A0A0] max-w-2xl mx-auto">
            Every plan includes core features. Higher tiers unlock AI, automation, and enterprise support.
          </p>
        </div>

        {/* Mobile: Tier switcher + stacked feature list (avoids horizontal scroll) */}
        <div className="md:hidden mb-8">
          <div
            className="grid grid-cols-2 gap-2 mb-6 bg-white/5 border border-white/10 rounded-xl p-2"
            role="tablist"
            aria-label="Compare tier"
          >
            {TIER_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                role="tab"
                aria-selected={activeMobileTier === opt.key}
                onClick={() => setActiveMobileTier(opt.key)}
                className={`py-2 px-3 rounded-lg font-montserrat text-sm font-semibold transition-colors ${
                  activeMobileTier === opt.key
                    ? 'bg-[#6BB8E5] text-black'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <ul className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl divide-y divide-white/10 overflow-hidden">
            {visibleFeatures.map((row) => (
              <li
                key={row.feature}
                className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
              >
                <span className="font-montserrat font-medium text-white pr-4">{row.feature}</span>
                <span className="text-right">{renderMobileValue(row[activeMobileTier])}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop/tablet: Full comparison table */}
        <div className="relative hidden md:block">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-dark-800">
            <div className="inline-block min-w-full align-middle">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <table className="min-w-full divide-y divide-white/10">
                
                {/* Table Header - Sticky with enhanced styling */}
                <thead className="bg-primary-500 sticky top-0 z-10 shadow-lg">
                  <tr>
                    <th scope="col" className="px-6 py-5 text-left text-base font-dfaalt font-bold text-white">
                      Feature
                    </th>
                    <th scope="col" className="px-6 py-5 text-center text-base font-dfaalt font-bold text-white">
                      Starter
                    </th>
                    <th scope="col" className="px-6 py-5 text-center text-base font-dfaalt font-bold text-white bg-accent-500/30 border-x-2 border-accent-500">
                      Professional
                      <div className="text-xs font-montserrat font-normal mt-1 text-white/90">Most Popular</div>
                    </th>
                    <th scope="col" className="px-6 py-5 text-center text-base font-dfaalt font-bold text-white">
                      Business
                    </th>
                    <th scope="col" className="px-6 py-5 text-center text-base font-dfaalt font-bold text-white">
                      Enterprise
                    </th>
                  </tr>
                </thead>

                {/* Table Body - With hover animations */}
                <tbody className="divide-y divide-white/10">
                  {visibleFeatures.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={`transition-all duration-200 hover:bg-white/10 ${idx % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        {renderValue(row.starter)}
                      </td>
                      <td className="px-6 py-4 text-center text-sm bg-accent-500/10 border-x border-accent-500/30">
                        {renderValue(row.professional)}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        {renderValue(row.business)}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        {renderValue(row.enterprise)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
            {featureComparison.length > 8 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl font-dfaalt font-semibold text-base min-h-[56px]"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show All Features ({featureComparison.length - 8} more)
                    </>
                  )}
                </button>
              </div>
            )}

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-montserrat text-[#A0A0A0] mb-6">
            Still have questions? We're here to help.
          </p>
          <a
            href={PRICING_SALES_CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackPricingCta({ location: 'feature_comparison_demo', action: 'schedule_demo' })}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-200 font-montserrat font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6BB8E5] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </div>
  );
}
