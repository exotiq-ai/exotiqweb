import { Check } from 'lucide-react';
import { allPlanFeatures, planDifferences } from '../../data/pricingData';

type TierKey = 'pro' | 'business' | 'enterprise';

export default function FeatureComparison() {
  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check
          className="w-5 h-5 text-success-500 mx-auto"
          aria-label="Included"
        />
      ) : (
        <span className="text-white/25 font-montserrat text-sm mx-auto block text-center">
          —
        </span>
      );
    }
    return (
      <span className="text-sm font-montserrat font-medium text-white">
        {value}
      </span>
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-[#1B1B1B] to-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Compare Plans
          </h2>
          <p className="font-montserrat text-lg text-[#A0A0A0] max-w-2xl mx-auto">
            All features included on every plan. Here&apos;s what differs.
          </p>
        </div>

        {/* Section 1 — Included in All Plans */}
        <div className="mb-16">
          <h3 className="font-montserrat font-bold text-xl text-white mb-8 text-center">
            Included in All Plans
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {allPlanFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              >
                <Check
                  className="w-5 h-5 text-success-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="font-montserrat text-sm text-white/85">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 — Plan Differences */}
        <div>
          <h3 className="font-montserrat font-bold text-xl text-white mb-8 text-center">
            Plan Differences
          </h3>

          {/* Desktop table */}
          <div className="hidden sm:block">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-primary-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left font-dfaalt font-bold text-white text-sm"
                    >
                      Feature
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-dfaalt font-bold text-white text-sm"
                    >
                      Pro
                      <div className="text-xs font-montserrat font-normal mt-0.5 text-white/80">
                        $39/vehicle/mo
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-dfaalt font-bold text-white text-sm"
                    >
                      Business
                      <div className="text-xs font-montserrat font-normal mt-0.5 text-white/80">
                        $29/vehicle/mo
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center font-dfaalt font-bold text-white text-sm"
                    >
                      Enterprise
                      <div className="text-xs font-montserrat font-normal mt-0.5 text-white/80">
                        Custom
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {planDifferences.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={`${idx % 2 === 0 ? 'bg-white/[0.03]' : ''} hover:bg-white/[0.06] transition-colors`}
                    >
                      <td className="px-6 py-4 font-montserrat font-semibold text-sm text-white">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderValue(row.pro)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderValue(row.business)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderValue(row.enterprise)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile — stacked cards */}
          <div className="sm:hidden space-y-3">
            {planDifferences.map((row) => (
              <div
                key={row.feature}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <p className="font-montserrat font-semibold text-white text-sm mb-3">
                  {row.feature}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {(['pro', 'business', 'enterprise'] as TierKey[]).map(
                    (tier) => (
                      <div key={tier}>
                        <p className="font-montserrat text-[10px] uppercase tracking-wider text-white/40 mb-1">
                          {tier === 'pro'
                            ? 'Pro'
                            : tier === 'business'
                              ? 'Business'
                              : 'Enterprise'}
                        </p>
                        {renderValue(row[tier])}
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
