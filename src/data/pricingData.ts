// Exotiq Pricing System - Hybrid Model (Per-Vehicle + Flat Tiers)

export interface PricingTier {
  id: 'starter' | 'professional' | 'business' | 'enterprise';
  name: string;
  pricingModel: 'per-vehicle' | 'flat';
  basePrice: number; // Monthly base price
  perVehiclePrice?: number; // For per-vehicle tiers
  includedVehicles?: number; // For flat tiers
  overagePrice?: number; // Price per vehicle over included amount
  minCharge?: number; // Minimum monthly charge
  founderDiscount: number; // Percentage discount for founders
  regularPrice: number; // Regular price (post-founder)
  minVehicles: number;
  maxVehicles: number;
  popular?: boolean;
  label: string;
  tagline: string;
  features: string[];
}

export const STRIPE_PRICES = {
  starter: {
    monthly: 'price_1ShjP0HO7nC3pJiP4ExcElvZ',
    annual: 'price_1ShjP6HO7nC3pJiP9QBawM60',
  },
  professional: {
    monthly: 'price_1ShjP8HO7nC3pJiPQyJ3HFB4',
    annual: 'price_1ShjPBHO7nC3pJiP6KR4QvWc',
  },
  business: {
    monthly: 'price_1ShjPCHO7nC3pJiP3e6FjmV9',
    annual: 'price_1ShjPEHO7nC3pJiPdIX5VJuc',
  },
  enterprise: {
    monthly: 'price_1ShjPFHO7nC3pJiPDFbyAUZF',
    annual: 'price_1ShjPHHO7nC3pJiPoU8XyhuH',
  },
};

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    pricingModel: 'per-vehicle',
    basePrice: 29,
    perVehiclePrice: 29,
    minCharge: 79,
    founderDiscount: 0, // Already at founder price
    regularPrice: 39,
    minVehicles: 1,
    maxVehicles: 10,
    label: 'BEST FOR SIDE HUSTLES',
    tagline: 'Solo operators & small boutique fleets getting started',
    features: [
      '1-10 vehicles',
      'Fleet Dashboard',
      'Booking Calendar',
      'Document Vault',
      'Customer CRM',
      '7-day AI Forecasting',
      '1 Location',
      'Email Support (48hr)',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    pricingModel: 'flat',
    basePrice: 399,
    includedVehicles: 25,
    overagePrice: 22,
    founderDiscount: 0, // Already at founder price
    regularPrice: 32, // Equivalent per-vehicle price
    minVehicles: 5,
    maxVehicles: 999,
    popular: true,
    label: 'MOST POPULAR',
    tagline: 'Growing rental businesses ready to scale with AI',
    features: [
      'Everything in Starter',
      'Up to 25 vehicles included',
      'AI Pricing Engine (MotorIQ)',
      '30-day AI Forecasting',
      'Advanced Analytics',
      'API Access (Read-only)',
      'Up to 3 Locations',
      'Custom Integrations',
      'Chat Support (24hr)',
      '$22/vehicle over 25',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    pricingModel: 'flat',
    basePrice: 899,
    includedVehicles: 75,
    overagePrice: 18,
    founderDiscount: 0, // Already at founder price
    regularPrice: 26, // Equivalent per-vehicle price
    minVehicles: 26,
    maxVehicles: 999,
    label: 'BEST FOR GROWING FLEETS',
    tagline: 'Established operators managing multiple locations',
    features: [
      'Everything in Professional',
      'Up to 75 vehicles included',
      'Rari AI Copilot',
      '90-day AI Forecasting',
      'White-label Booking Portal',
      'Unlimited Locations',
      'Dedicated Success Manager',
      'Phone Support (4hr)',
      '99.5% SLA Guarantee',
      '$18/vehicle over 75',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    pricingModel: 'flat',
    basePrice: 1799,
    includedVehicles: 150,
    overagePrice: 15,
    founderDiscount: 0, // Already at founder price
    regularPrice: 22, // Equivalent per-vehicle price
    minVehicles: 76,
    maxVehicles: 999,
    label: 'ENTERPRISE-GRADE',
    tagline: 'Large fleets & franchise operations',
    features: [
      'Everything in Business',
      'Up to 150 vehicles included',
      '365-day AI Forecasting',
      'Custom AI Model Training',
      'Quarterly Business Reviews',
      'Priority Phone Support (1hr)',
      '99.9% SLA Guarantee',
      'Custom Enterprise Setup',
      'NET-30 Invoice Billing',
      '$15/vehicle over 150',
    ],
  },
];

// Updated feature comparison matrix
export const featureComparison = [
  { feature: 'Vehicles Included', starter: '1-10', professional: 'Up to 25', business: 'Up to 75', enterprise: 'Up to 150' },
  { feature: 'Fleet Dashboard', starter: true, professional: true, business: true, enterprise: true },
  { feature: 'Booking Calendar', starter: true, professional: true, business: true, enterprise: true },
  { feature: 'Document Vault', starter: true, professional: true, business: true, enterprise: true },
  { feature: 'Customer CRM', starter: true, professional: true, business: true, enterprise: true },
  { feature: 'AI Demand Forecasting', starter: '7-day', professional: '30-day', business: '90-day', enterprise: '365-day' },
  { feature: 'Dynamic Pricing Engine', starter: 'Basic rules', professional: 'Full AI (MotorIQ)', business: 'Full AI', enterprise: 'Full AI' },
  { feature: 'Rari AI Copilot', starter: false, professional: false, business: true, enterprise: true },
  { feature: 'API Access', starter: false, professional: 'Read-only', business: 'Full', enterprise: 'Full + webhooks' },
  { feature: 'Custom AI Training', starter: false, professional: false, business: 'Quarterly', enterprise: 'Monthly' },
  { feature: 'Multi-Location Support', starter: '1 location', professional: 'Up to 3', business: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'White-Label Portal', starter: false, professional: false, business: 'Mobile app', enterprise: 'Full platform' },
  { feature: 'User Seats', starter: 'Up to 3', professional: 'Up to 10', business: 'Up to 25', enterprise: 'Unlimited' },
  { feature: 'Support', starter: 'Email (48hr)', professional: 'Chat (24hr)', business: 'Phone (4hr)', enterprise: 'Priority (1hr) + Manager' },
  { feature: 'SLA Guarantee', starter: false, professional: false, business: '99.5%', enterprise: '99.9%' },
];

// FAQ content
export const faqItems = [
  {
    question: 'How much does Exotiq actually cost?',
    answer: 'Pricing depends on your fleet size. Starter is $29/vehicle/month (minimum $79/month) for 1-10 vehicles. Professional is a flat $399/month for up to 25 vehicles. Business is $899/month for up to 75 vehicles. Enterprise is $1,799/month for up to 150 vehicles. All tiers include 14-day free trial.',
  },
  {
    question: 'What happens when my fleet grows beyond my current tier?',
    answer: 'Professional, Business, and Enterprise tiers include overage pricing. Professional: $22/vehicle over 25. Business: $18/vehicle over 75. Enterprise: $15/vehicle over 150. You can also upgrade to the next tier anytime for more features and better pricing.',
  },
  {
    question: 'What is the real ROI? How do I know I will make my money back?',
    answer: 'Our customers see an average 25% revenue increase from AI pricing optimization and 38% reduction in maintenance costs. For a 15-vehicle fleet on Professional tier ($399/month), that translates to $487,620 additional annual revenue. Your investment pays back in under 3 days on average.',
  },
  {
    question: 'Can I cancel if it does not work for me?',
    answer: 'Yes! You can cancel anytime during your 14-day free trial with no charges. After that, you can cancel anytime and we offer a 30-day money-back guarantee if you are not seeing results. No contracts, no commitments.',
  },
  {
    question: 'How long does it take to get up and running?',
    answer: 'Most fleets are fully onboarded in under 15 minutes. Annual prepay customers get free white-glove onboarding (worth $2,500) including data migration, custom AI training, and dedicated support. You will see results within 48 hours.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-level encryption, SOC 2 compliance, and never share your data with third parties. Your fleet data and customer information are protected with the highest security standards. Business and Enterprise tiers include 99.5-99.9% SLA guarantees.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) and ACH bank transfers for annual plans. Enterprise customers can also pay via invoice with NET-30 terms.',
  },
];

// Updated ROI defaults (real-world data from your spec)
export const roiDefaults = {
  avgDailyRate: 350, // Average daily rate for exotic rentals
  avgDailyRateWithAI: 425, // With AI pricing (+21%)
  avgUtilization: 62, // Industry average
  avgUtilizationWithAI: 78, // With AI forecasting (+16 points)
  revenueIncreasePercent: 25, // Average revenue increase
  maintenanceSavingsPercent: 38, // Maintenance cost reduction
  avgMaintenanceCostPerVehicle: 3000, // Annual maintenance per vehicle
};

// Founder pricing config
export const founderConfig = {
  deadline: new Date('2025-03-31T23:59:59'),
  totalSpots: 250,
  spotsRemaining: 73,
  isActive: () => new Date() < new Date('2025-03-31T23:59:59'),
};

// Helper functions
export const getAnnualPrice = (monthlyPrice: number) => Math.round(monthlyPrice * 10); // 2 months free
export const getAnnualSavings = (monthlyPrice: number) => monthlyPrice * 2;

export const calculatePrice = (tier: PricingTier, vehicleCount: number, isAnnual: boolean = false) => {
  let monthlyPrice = 0;
  
  if (tier.pricingModel === 'per-vehicle') {
    // Starter tier: Per-vehicle with minimum
    monthlyPrice = Math.max(tier.minCharge || 0, vehicleCount * tier.basePrice);
  } else {
    // Flat tiers: Base price + overage
    if (vehicleCount <= (tier.includedVehicles || 0)) {
      monthlyPrice = tier.basePrice;
    } else {
      const overageCount = vehicleCount - (tier.includedVehicles || 0);
      monthlyPrice = tier.basePrice + (overageCount * (tier.overagePrice || 0));
    }
  }
  
  if (isAnnual) {
    return getAnnualPrice(monthlyPrice);
  }
  
  return monthlyPrice;
};

export const getTierForFleetSize = (fleetSize: number): PricingTier => {
  // Starter: 1-10 vehicles
  if (fleetSize <= 10) return pricingTiers[0];
  
  // Professional: 11-25 vehicles (base) or up to any with overage
  if (fleetSize <= 25) return pricingTiers[1];
  
  // Business: 26-75 vehicles
  if (fleetSize <= 75) return pricingTiers[2];
  
  // Enterprise: 76+ vehicles
  return pricingTiers[3];
};

export const getTierRecommendation = (vehicleCount: number) => {
  const currentTier = getTierForFleetSize(vehicleCount);
  const currentPrice = calculatePrice(currentTier, vehicleCount);
  
  // Check if upgrading would be cheaper or offer better value
  const nextTierIndex = pricingTiers.findIndex(t => t.id === currentTier.id) + 1;
  if (nextTierIndex < pricingTiers.length) {
    const nextTier = pricingTiers[nextTierIndex];
    const nextTierPrice = calculatePrice(nextTier, vehicleCount);
    
    if (nextTierPrice <= currentPrice * 1.15) { // Within 15% price
      return {
        suggested: true,
        tier: nextTier,
        reason: `Consider upgrading to ${nextTier.name} for more features at similar pricing`,
        savings: currentPrice - nextTierPrice,
      };
    }
  }
  
  return {
    suggested: false,
    tier: currentTier,
    reason: null,
    savings: 0,
  };
};

