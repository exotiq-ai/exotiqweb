import { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { featureComparison } from '../../data/pricingData';

export default function FeatureComparison() {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleFeatures = isExpanded ? featureComparison : featureComparison.slice(0, 8);

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-6 h-6 text-success-500 mx-auto transition-transform hover:scale-125" />
      ) : (
        <X className="w-6 h-6 text-gray-500 mx-auto opacity-30" />
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

        {/* Table Container - With scroll indicator */}
        <div className="relative">
          {/* Scroll indicator for mobile */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-dark-900 to-transparent pointer-events-none z-10 md:hidden"></div>
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
            href="https://calendly.com/hello-exotiq/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-200 font-montserrat font-semibold"
          >
            Schedule a Demo Call
          </a>
        </div>
      </div>
    </div>
  );
}
