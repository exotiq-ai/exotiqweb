import { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Calculator } from 'lucide-react';
import { roiDefaults, getPerVehicleCost } from '../../data/pricingData';
import { openPricingSalesCall, trackPricingCta } from '../../utils/pricingCta';

export default function ROICalculator() {
  const [fleetSize, setFleetSize] = useState(roiDefaults.defaultFleetSize);
  const [dailyRate, setDailyRate] = useState(roiDefaults.defaultDailyRate);

  const metrics = useMemo(() => {
    const { utilization, aiImprovementPercent } = roiDefaults;

    const currentAnnualRevenue =
      fleetSize * dailyRate * 365 * (utilization / 100);
    const projectedRevenue =
      currentAnnualRevenue * (1 + aiImprovementPercent / 100);
    const revenueIncrease = projectedRevenue - currentAnnualRevenue;
    const exotiqAnnualCost = fleetSize * getPerVehicleCost(fleetSize) * 12;
    const netAnnualGain = revenueIncrease - exotiqAnnualCost;

    return {
      currentAnnualRevenue,
      projectedRevenue,
      revenueIncrease,
      exotiqAnnualCost,
      netAnnualGain,
    };
  }, [fleetSize, dailyRate]);

  const fmt = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  const perVehicleCost = getPerVehicleCost(fleetSize);
  const planName = fleetSize <= 15 ? 'Pro' : 'Business';

  const fleetPct =
    ((fleetSize - roiDefaults.minFleetSize) /
      (roiDefaults.maxFleetSize - roiDefaults.minFleetSize)) *
    100;
  const ratePct =
    ((dailyRate - roiDefaults.minDailyRate) /
      (roiDefaults.maxDailyRate - roiDefaults.minDailyRate)) *
    100;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-black border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Calculate Your ROI
          </h2>
          <p className="font-montserrat text-lg text-[#A0A0A0] max-w-2xl mx-auto">
            A conservative, illustrative estimate of what smarter pricing could add to your bottom line.
          </p>
        </div>

        {/* Calculator card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-10">
          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Fleet size */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label
                  htmlFor="roi-fleet-size"
                  className="font-montserrat font-semibold text-white"
                >
                  Fleet Size
                </label>
                <div className="flex items-baseline gap-2">
                  <span className="font-montserrat font-bold text-3xl text-[#6BB8E5]">
                    {fleetSize}
                  </span>
                  <span className="font-montserrat text-sm text-[#A0A0A0]">
                    vehicles
                  </span>
                </div>
              </div>

              <div className="relative">
                <input
                  id="roi-fleet-size"
                  type="range"
                  min={roiDefaults.minFleetSize}
                  max={roiDefaults.maxFleetSize}
                  step={1}
                  value={fleetSize}
                  onChange={(e) => setFleetSize(parseInt(e.target.value, 10))}
                  aria-valuemin={roiDefaults.minFleetSize}
                  aria-valuemax={roiDefaults.maxFleetSize}
                  aria-valuenow={fleetSize}
                  aria-valuetext={`${fleetSize} vehicle${fleetSize === 1 ? '' : 's'}`}
                  className="roi-slider w-full h-3 bg-transparent rounded-lg appearance-none cursor-pointer relative z-10"
                />
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 bg-white/10 rounded-lg pointer-events-none">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg transition-all duration-300 shadow-lg shadow-primary-500/50"
                    style={{ width: `${fleetPct}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <span className="font-montserrat text-xs text-[#A0A0A0]">1</span>
                <span className="font-montserrat text-xs text-[#A0A0A0]">25</span>
                <span className="font-montserrat text-xs text-[#A0A0A0]">50</span>
              </div>
            </div>

            {/* Daily rate */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label
                  htmlFor="roi-daily-rate"
                  className="font-montserrat font-semibold text-white"
                >
                  Avg Daily Rate
                </label>
                <div className="flex items-baseline gap-1">
                  <span className="font-montserrat font-bold text-3xl text-[#6BB8E5]">
                    ${dailyRate.toLocaleString()}
                  </span>
                  <span className="font-montserrat text-sm text-[#A0A0A0]">
                    /day
                  </span>
                </div>
              </div>

              <div className="relative">
                <input
                  id="roi-daily-rate"
                  type="range"
                  min={roiDefaults.minDailyRate}
                  max={roiDefaults.maxDailyRate}
                  step={50}
                  value={dailyRate}
                  onChange={(e) => setDailyRate(parseInt(e.target.value, 10))}
                  aria-valuemin={roiDefaults.minDailyRate}
                  aria-valuemax={roiDefaults.maxDailyRate}
                  aria-valuenow={dailyRate}
                  aria-valuetext={`$${dailyRate} per day`}
                  className="roi-slider w-full h-3 bg-transparent rounded-lg appearance-none cursor-pointer relative z-10"
                />
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 bg-white/10 rounded-lg pointer-events-none">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg transition-all duration-300 shadow-lg shadow-primary-500/50"
                    style={{ width: `${ratePct}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <span className="font-montserrat text-xs text-[#A0A0A0]">$500</span>
                <span className="font-montserrat text-xs text-[#A0A0A0]">$1,500</span>
                <span className="font-montserrat text-xs text-[#A0A0A0]">$2,500</span>
              </div>
            </div>
          </div>

          {/* Slider thumb styles */}
          <style>{`
            .roi-slider::-webkit-slider-thumb {
              appearance: none;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: linear-gradient(135deg, #6EC1E4 0%, #4a9fcc 100%);
              cursor: pointer;
              box-shadow: 0 4px 12px rgba(110, 193, 228, 0.5);
              border: 3px solid white;
              transition: all 0.2s ease;
            }
            .roi-slider::-webkit-slider-thumb:hover {
              transform: scale(1.2);
              box-shadow: 0 6px 16px rgba(110, 193, 228, 0.7);
            }
            .roi-slider::-moz-range-thumb {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: linear-gradient(135deg, #6EC1E4 0%, #4a9fcc 100%);
              cursor: pointer;
              box-shadow: 0 4px 12px rgba(110, 193, 228, 0.5);
              border: 3px solid white;
              transition: all 0.2s ease;
            }
            .roi-slider::-moz-range-thumb:hover {
              transform: scale(1.2);
              box-shadow: 0 6px 16px rgba(110, 193, 228, 0.7);
            }
          `}</style>

          {/* Plan indicator */}
          <div className="mb-8 p-4 bg-[#6BB8E5]/10 border border-[#6BB8E5]/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-montserrat text-sm text-[#A0A0A0]">
                  Your Plan
                </p>
                <p className="font-montserrat font-bold text-xl text-white">
                  {planName}
                </p>
              </div>
              <div className="text-right">
                <p className="font-montserrat font-bold text-2xl text-[#6BB8E5]">
                  ${perVehicleCost}/vehicle/mo
                </p>
                <p className="font-montserrat text-sm text-[#A0A0A0]">
                  {fmt(metrics.exotiqAnnualCost)}/year total
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-8" aria-live="polite" aria-atomic="false">
            <h3 className="font-montserrat font-bold text-xl text-white mb-6 text-center">
              Your Projected Annual Impact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Current revenue */}
              <div className="bg-gradient-to-br from-[#6BB8E5]/20 to-[#6BB8E5]/5 border border-[#6BB8E5]/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-5 h-5 text-[#6BB8E5]" />
                  <h4 className="font-montserrat text-sm font-semibold text-white">
                    Current Revenue
                  </h4>
                </div>
                <p className="font-montserrat font-bold text-3xl text-white">
                  {fmt(metrics.currentAnnualRevenue)}
                </p>
                <p className="font-montserrat text-xs text-[#A0A0A0] mt-1">
                  {fleetSize} vehicles · ${dailyRate.toLocaleString()}/day ·{' '}
                  {roiDefaults.utilization}% utilization
                </p>
              </div>

              {/* AI uplift */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-montserrat text-sm font-semibold text-white">
                    With AI Pricing
                  </h4>
                </div>
                <p className="font-montserrat font-bold text-3xl text-emerald-400">
                  +{fmt(metrics.revenueIncrease)}
                </p>
                <p className="font-montserrat text-xs text-emerald-400/80 mt-1">
                  {roiDefaults.aiImprovementPercent}% pricing uplift (illustrative)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Exotiq cost */}
              <div className="bg-gradient-to-br from-[#FF5733]/20 to-[#FF5733]/5 border border-[#FF5733]/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-[#FF5733]" />
                  <h4 className="font-montserrat text-sm font-semibold text-white">
                    exotiq cost
                  </h4>
                </div>
                <p className="font-montserrat font-bold text-3xl text-[#FF5733]">
                  {fmt(metrics.exotiqAnnualCost)}
                </p>
                <p className="font-montserrat text-xs text-[#A0A0A0] mt-1">
                  /year
                </p>
              </div>

              {/* Net gain */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-montserrat text-sm font-semibold text-white">
                    Net Annual Gain
                  </h4>
                </div>
                <p className="font-montserrat font-bold text-3xl text-emerald-400">
                  {fmt(metrics.netAnnualGain)}
                </p>
              </div>
            </div>
          </div>

          {/* Net gain payoff */}
          <div className="bg-gradient-to-r from-[#6BB8E5]/10 to-[#4A9FCC]/10 border border-[#6BB8E5]/30 rounded-xl p-6 sm:p-8 text-center">
            <p className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.18em] text-[#A0A0A0] mb-2">
              Estimated net annual gain
            </p>
            <p className="font-dfaalt font-bold text-4xl sm:text-5xl text-[#22C55E]">
              +{fmt(metrics.netAnnualGain)}
            </p>
            <p className="font-montserrat text-sm text-[#A0A0A0] mt-2">
              after exotiq&apos;s cost · illustrative estimate
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => {
                trackPricingCta({
                  location: 'roi_calculator_cta',
                  action: 'schedule_demo',
                  meta: {
                    fleetSize,
                    dailyRate,
                    netAnnualGain: metrics.netAnnualGain,
                  },
                });
                openPricingSalesCall();
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC] text-black px-8 py-4 rounded-lg font-montserrat font-bold hover:shadow-xl hover:shadow-[#6BB8E5]/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6BB8E5] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Talk to Sales
            </button>
            <p className="font-montserrat text-xs text-[#A0A0A0] mt-3">
              We&apos;ll validate these projections with your actual fleet data
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center font-montserrat text-xs text-[#A0A0A0] mt-6 max-w-3xl mx-auto">
          Illustrative estimate only. Assumes {roiDefaults.utilization}% utilization
          and a {roiDefaults.aiImprovementPercent}% pricing uplift. Your results depend
          on your market, fleet mix, and operations. We&apos;ll validate against your real
          numbers.
        </p>
      </div>
    </section>
  );
}
