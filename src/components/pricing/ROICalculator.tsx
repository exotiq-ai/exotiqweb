import { useState, useEffect, useRef } from 'react';
import { TrendingUp, DollarSign, Wrench, Target, Clock, Sparkles } from 'lucide-react';
import { getTierForFleetSize, roiDefaults, calculatePrice } from '../../data/pricingData';

export default function ROICalculator() {
  const [fleetSize, setFleetSize] = useState(15);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevROIRef = useRef(0);
  const [metrics, setMetrics] = useState({
    currentRevenue: 0,
    revenueWithAI: 0,
    revenueIncrease: 0,
    maintenanceSavings: 0,
    totalGain: 0,
    exotiqCost: 0,
    netGain: 0,
    roi: 0,
    paybackDays: 0,
  });

  useEffect(() => {
    calculateROI(fleetSize);
  }, [fleetSize]);

  // Trigger confetti when ROI exceeds threshold
  useEffect(() => {
    if (metrics.roi > 500 && prevROIRef.current <= 500) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    prevROIRef.current = metrics.roi;
  }, [metrics.roi]);

  const calculateROI = (vehicles: number) => {
    const tier = getTierForFleetSize(vehicles);
    const {
      avgDailyRate,
      avgDailyRateWithAI,
      avgUtilization,
      avgUtilizationWithAI,
      maintenanceSavingsPercent,
      avgMaintenanceCostPerVehicle,
    } = roiDefaults;

    // Calculate current annual revenue
    const currentRevenue = vehicles * avgDailyRate * 365 * (avgUtilization / 100);

    // Project revenue with Exotiq AI
    const revenueWithAI = vehicles * avgDailyRateWithAI * 365 * (avgUtilizationWithAI / 100);
    const revenueIncrease = revenueWithAI - currentRevenue;

    // Calculate maintenance savings
    const currentMaintenanceCost = vehicles * avgMaintenanceCostPerVehicle;
    const maintenanceSavings = currentMaintenanceCost * (maintenanceSavingsPercent / 100);

    // Calculate total gain and cost
    const totalGain = revenueIncrease + maintenanceSavings;
    const exotiqCost = calculatePrice(tier, vehicles) * 12;
    const netGain = totalGain - exotiqCost;
    const roi = Math.round((netGain / exotiqCost) * 100);

    // Calculate payback period in days
    const paybackDays = Math.ceil((exotiqCost / totalGain) * 365);

    setMetrics({
      currentRevenue,
      revenueWithAI,
      revenueIncrease,
      maintenanceSavings,
      totalGain,
      exotiqCost,
      netGain,
      roi,
      paybackDays,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const tier = getTierForFleetSize(fleetSize);
  const monthlyPrice = calculatePrice(tier, fleetSize);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-black border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            See Your Potential ROI
          </h2>
          <p className="font-montserrat text-lg text-[#A0A0A0] max-w-2xl mx-auto">
            Real numbers from exotic car rental operators using Exotiq AI
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-10">
          
          {/* Fleet Size Slider */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <label className="font-montserrat font-semibold text-white">
                Your Fleet Size
              </label>
              <div className="flex items-baseline gap-2">
                <span className="font-montserrat font-bold text-4xl text-[#6BB8E5]">
                  {fleetSize}
                </span>
                <span className="font-montserrat text-[#A0A0A0]">vehicles</span>
              </div>
            </div>

            {/* Custom Styled Slider */}
            <div className="relative">
              <input
                type="range"
                min="1"
                max="100"
                value={fleetSize}
                onChange={(e) => setFleetSize(parseInt(e.target.value))}
                className="w-full h-3 bg-transparent rounded-lg appearance-none cursor-pointer relative z-10"
                style={{
                  background: 'transparent',
                }}
              />
              {/* Custom track */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 bg-white/10 rounded-lg pointer-events-none">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg transition-all duration-300 shadow-lg shadow-primary-500/50"
                  style={{ width: `${fleetSize}%` }}
                />
              </div>
              {/* Slider thumb styling via CSS */}
              <style>{`
                input[type="range"]::-webkit-slider-thumb {
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
                input[type="range"]::-webkit-slider-thumb:hover {
                  transform: scale(1.2);
                  box-shadow: 0 6px 16px rgba(110, 193, 228, 0.7);
                }
                input[type="range"]::-moz-range-thumb {
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #6EC1E4 0%, #4a9fcc 100%);
                  cursor: pointer;
                  box-shadow: 0 4px 12px rgba(110, 193, 228, 0.5);
                  border: 3px solid white;
                  transition: all 0.2s ease;
                }
                input[type="range"]::-moz-range-thumb:hover {
                  transform: scale(1.2);
                  box-shadow: 0 6px 16px rgba(110, 193, 228, 0.7);
                }
              `}</style>
            </div>

            {/* Slider Labels */}
            <div className="flex justify-between mt-2">
              <span className="font-montserrat text-xs text-[#A0A0A0]">1</span>
              <span className="font-montserrat text-xs text-[#A0A0A0]">25</span>
              <span className="font-montserrat text-xs text-[#A0A0A0]">50</span>
              <span className="font-montserrat text-xs text-[#A0A0A0]">75</span>
              <span className="font-montserrat text-xs text-[#A0A0A0]">100</span>
            </div>

            {/* Current Tier */}
            <div className="mt-6 p-4 bg-[#6BB8E5]/10 border border-[#6BB8E5]/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-montserrat text-sm text-[#A0A0A0]">Recommended Plan</p>
                  <p className="font-montserrat font-bold text-xl text-white">{tier.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-montserrat font-bold text-2xl text-[#6BB8E5]">
                    ${monthlyPrice}
                  </p>
                  <p className="font-montserrat text-sm text-[#A0A0A0]">per month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Impact Metrics */}
          <div className="mb-8">
            <h3 className="font-montserrat font-bold text-xl text-white mb-6 text-center">
              Your Annual Impact with Exotiq AI
            </h3>
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              
              {/* Daily Rate Increase */}
              <div className="bg-gradient-to-br from-[#6BB8E5]/20 to-[#6BB8E5]/5 border border-[#6BB8E5]/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-[#6BB8E5]" />
                  <h4 className="font-montserrat text-sm font-semibold text-white">Average Daily Rate</h4>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-montserrat font-bold text-3xl text-[#A0A0A0] line-through">
                    ${roiDefaults.avgDailyRate}
                  </span>
                  <span className="font-montserrat font-bold text-3xl text-[#6BB8E5]">
                    ${roiDefaults.avgDailyRateWithAI}
                  </span>
                </div>
                <p className="font-montserrat text-xs text-[#6BB8E5]">+21% with AI pricing</p>
              </div>

              {/* Utilization Rate */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-montserrat text-sm font-semibold text-white">Utilization Rate</h4>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-montserrat font-bold text-3xl text-[#A0A0A0] line-through">
                    {roiDefaults.avgUtilization}%
                  </span>
                  <span className="font-montserrat font-bold text-3xl text-emerald-400">
                    {roiDefaults.avgUtilizationWithAI}%
                  </span>
                </div>
                <p className="font-montserrat text-xs text-emerald-400">+16 points with AI forecasting</p>
              </div>
            </div>

            {/* Revenue & Savings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Revenue Increase */}
              <div className="bg-gradient-to-br from-[#FF5733]/20 to-[#FF5733]/5 border border-[#FF5733]/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-[#FF5733]" />
                  <h4 className="font-montserrat text-sm font-semibold text-white">Annual Revenue Increase</h4>
                </div>
                <p className="font-montserrat font-bold text-3xl sm:text-4xl text-[#FF5733] mb-1">
                  {formatCurrency(metrics.revenueIncrease)}
                </p>
                <p className="font-montserrat text-xs text-[#A0A0A0]">
                  From {formatCurrency(metrics.currentRevenue)} to {formatCurrency(metrics.revenueWithAI)}
                </p>
              </div>

              {/* Maintenance Savings */}
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-purple-400" />
                  <h4 className="font-montserrat text-sm font-semibold text-white">Maintenance Saved</h4>
                </div>
                <p className="font-montserrat font-bold text-3xl sm:text-4xl text-purple-400 mb-1">
                  {formatCurrency(metrics.maintenanceSavings)}
                </p>
                <p className="font-montserrat text-xs text-[#A0A0A0]">38% cost reduction</p>
              </div>
            </div>
          </div>

          {/* Payback Summary */}
          <div className="bg-gradient-to-r from-[#6BB8E5]/10 to-[#4A9FCC]/10 border border-[#6BB8E5]/30 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Clock className="w-8 h-8 text-[#6BB8E5]" />
              <h3 className="font-montserrat font-bold text-3xl text-white">
                Exotiq pays for itself in{' '}
                <span className="text-[#6BB8E5]">{metrics.paybackDays} days</span>
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <p className="font-montserrat text-xs text-[#A0A0A0] mb-1">Investment</p>
                <p className="font-montserrat font-bold text-xl text-white">
                  {formatCurrency(metrics.exotiqCost)}/year
                </p>
              </div>
              <div>
                <p className="font-montserrat text-xs text-[#A0A0A0] mb-1">Total Gain</p>
                <p className="font-montserrat font-bold text-xl text-[#22C55E]">
                  {formatCurrency(metrics.totalGain)}/year
                </p>
              </div>
              <div className="relative">
                <p className="font-montserrat text-xs text-[#A0A0A0] mb-1">ROI</p>
                <p className={`font-dfaalt font-bold text-3xl transition-all duration-300 ${
                  metrics.roi > 500 ? 'text-accent-500 animate-pulse-subtle' : 'text-primary-500'
                }`}>
                  {metrics.roi.toLocaleString()}%
                </p>
                {metrics.roi > 500 && (
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent-500 animate-bounce-subtle" />
                )}
                {/* Confetti effect */}
                {showConfetti && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full animate-confetti"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: '-10px',
                          backgroundColor: ['#6EC1E4', '#F15A29', '#FFD700', '#22C55E'][Math.floor(Math.random() * 4)],
                          animationDelay: `${Math.random() * 0.5}s`,
                          animationDuration: `${1 + Math.random()}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC] text-black px-8 py-4 rounded-lg font-montserrat font-bold hover:shadow-xl hover:shadow-[#6BB8E5]/30 transition-all duration-200">
              Start Free Trial
            </button>
            <p className="font-montserrat text-xs text-[#A0A0A0] mt-3">
              14-day free trial • See results in 48 hours
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center font-montserrat text-xs text-[#A0A0A0] mt-6 max-w-3xl mx-auto">
          * Based on real data from exotic car rental operators: $350→$425 average daily rate (+21%), 62%→78% utilization (+16 points), 38% maintenance cost reduction. Individual results may vary based on market, fleet composition, and operational efficiency.
        </p>
      </div>
    </div>
  );
}
