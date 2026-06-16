// Exotiq Pricing System — Per-Vehicle Model (Pro + Business + Enterprise)

export interface PricingTier {
  id: 'pro' | 'business' | 'enterprise';
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  vehicleRange: string;
  minVehicles: number;
  maxVehicles: number | null;
  popular?: boolean;
  label: string;
  tagline: string;
  inheritLabel?: string;
  features: string[];
}

export const APP_URL = 'https://app.exotiq.ai';

export const pricingTiers: PricingTier[] = [
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 39,
    annualPrice: 390,
    vehicleRange: '1–15 vehicles',
    minVehicles: 1,
    maxVehicles: 15,
    popular: true,
    label: 'MOST POPULAR',
    tagline: 'Everything you need to manage and grow your exotic rental fleet',
    features: [
      'Complete fleet dashboard',
      'MotorIQ AI pricing engine',
      'Booking calendar & CRM',
      'Document vault with alerts',
      'Stripe Connect payments',
      'Drive Exotiq marketplace listing',
      'Analytics & reports',
      'Chat support (24hr)',
      'Up to 2 locations',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    monthlyPrice: 29,
    annualPrice: 290,
    vehicleRange: '16–50 vehicles',
    minVehicles: 16,
    maxVehicles: 50,
    label: 'BEST VALUE',
    tagline: 'Scale your operation with priority support and advanced features',
    inheritLabel: 'Everything in Pro, plus:',
    features: [
      'Priority chat + phone support',
      'Up to 5 locations',
      'Featured marketplace listing',
      'White-glove onboarding & migration',
      'Advanced analytics & exports',
      'Team roles & permissions',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    vehicleRange: '51+ vehicles',
    minVehicles: 51,
    maxVehicles: null,
    label: 'ENTERPRISE',
    tagline: 'Custom solutions for large fleet and franchise operations',
    inheritLabel: 'Everything in Business, plus:',
    features: [
      'Custom AI model training',
      'Unlimited locations',
      'Premium marketplace placement',
      'Dedicated success manager',
      'Custom integrations & API',
      'Quarterly business reviews',
      'Enterprise SLA (99.9%)',
    ],
  },
];

// Features included on every paid plan
export const allPlanFeatures = [
  'Fleet Dashboard',
  'MotorIQ AI Pricing Engine',
  'AI Forecasting (30-day)',
  'Booking Calendar',
  'Customer CRM',
  'Document Vault',
  'Stripe Connect Payments',
  'Drive Exotiq Marketplace',
  'Analytics & Reports',
  'Team Management',
  'Mobile Responsive',
];

export interface PlanDifference {
  feature: string;
  pro: string | boolean;
  business: string | boolean;
  enterprise: string | boolean;
}

export const planDifferences: PlanDifference[] = [
  { feature: 'Vehicles', pro: '1–15', business: '16–50', enterprise: '51+' },
  { feature: 'Locations', pro: 'Up to 2', business: 'Up to 5', enterprise: 'Unlimited' },
  { feature: 'Support', pro: 'Chat (24hr)', business: 'Priority + phone', enterprise: 'Dedicated (1hr)' },
  { feature: 'Marketplace', pro: 'Listed', business: 'Featured', enterprise: 'Premium + priority leads' },
  { feature: 'Onboarding', pro: 'Self-serve', business: 'White-glove', enterprise: 'Custom' },
  { feature: 'API Access', pro: false, business: false, enterprise: 'Full API' },
  { feature: 'Custom AI', pro: false, business: false, enterprise: 'Custom model training' },
  { feature: 'SLA', pro: false, business: false, enterprise: '99.9%' },
];

export const faqItems = [
  {
    question: 'How does the 30-day free trial work?',
    answer: 'Sign up with just your email, no credit card required. You get full access to every feature for 30 days. After the trial, your account switches to read-only until you subscribe. Your data is never deleted.',
  },
  {
    question: 'How does pricing work?',
    answer: 'Simple per-vehicle pricing. Pro is $39/vehicle/month (1–15 vehicles). Business is $29/vehicle/month (16–50 vehicles). All features are included on both plans. Annual billing saves you 2 months.',
  },
  {
    question: 'What if I have more than 50 vehicles?',
    answer: 'Contact us for Enterprise pricing with custom rates, dedicated support, and custom AI model training.',
  },
  {
    question: 'Are all features really included?',
    answer: 'Yes. MotorIQ AI pricing, booking calendar, CRM, document vault, Stripe Connect payments, marketplace listing, and analytics, all included on every paid plan. No feature gates.',
  },
  {
    question: 'What happens after the trial ends?',
    answer: "Read-only mode. You can still view your fleet and data, but can't create bookings, process payments, or use AI pricing until you subscribe.",
  },
  {
    question: 'Can I switch plans?',
    answer: 'If your fleet grows past 15 vehicles, you automatically qualify for the lower Business rate at your next billing cycle.',
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No. Monthly plans cancel anytime. Annual plans are prepaid with 2 months free.',
  },
  {
    question: 'What about the Drive Exotiq marketplace?',
    answer: 'Every paid account is listed on Drive Exotiq (exotiq.rent). Business and Enterprise get featured placement with priority lead routing.',
  },
];

// ROI calculator defaults
export const roiDefaults = {
  defaultFleetSize: 10,
  defaultDailyRate: 1500,
  minDailyRate: 500,
  maxDailyRate: 2500,
  minFleetSize: 1,
  maxFleetSize: 50,
  utilization: 52,
  aiImprovementPercent: 18,
};

export const getPerVehicleCost = (fleetSize: number): number =>
  fleetSize <= 15 ? 39 : 29;

export const getAnnualExotiqCost = (fleetSize: number): number =>
  fleetSize * getPerVehicleCost(fleetSize) * 12;
