// Survey data and interfaces moved from SurveyPage.tsx

export interface SurveyQuestion {
  id: string;
  type: 'radio' | 'checkbox' | 'text' | 'textarea' | 'scale' | 'select';
  question: string;
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export interface SurveyData {
  title: string;
  subtitle: string;
  icon: string; // Use string for icon reference
  color: string;
  description: string;
  estimatedTime: string;
  questions: SurveyQuestion[];
  incentive: string;
}

export const surveys: Record<string, SurveyData> = {
  small: {
    title: 'Small Fleet Survey',
    subtitle: '1-5 vehicles',
    icon: 'Users',
    color: 'primary',
    description: 'Help us understand the unique challenges of small fleet operators',
    estimatedTime: '5-7 minutes',
    incentive: 'First 50 respondents get priority beta access',
    questions: [
      { id: 'fleet_size', type: 'radio', question: 'How many vehicles do you currently have in your fleet?', options: ['1 vehicle', '2 vehicles', '3 vehicles', '4 vehicles', '5 vehicles'], required: true },
      { id: 'platforms', type: 'checkbox', question: 'Which platforms do you currently use? (Select all that apply)', options: ['Turo', 'Getaround', 'HyreCar', 'Direct bookings', 'Other car-sharing platform', 'Traditional rental'], required: true },
      { id: 'time_spent', type: 'radio', question: 'How many hours per week do you spend managing your fleet?', options: ['Less than 5 hours', '5-10 hours', '10-15 hours', '15-20 hours', 'More than 20 hours'], required: true },
      { id: 'biggest_challenge', type: 'radio', question: 'What is your biggest operational challenge?', options: ['Pricing vehicles competitively', 'Managing maintenance schedules', 'Coordinating guest communications', 'Tracking finances across platforms', 'Finding time to manage everything', 'Growing beyond current size'], required: true },
      { id: 'current_tools', type: 'checkbox', question: 'What tools do you currently use for fleet management?', options: ['Excel/Google Sheets', 'Platform native tools only', 'Fleetio or similar fleet software', 'Custom tracking system', 'Pen and paper', 'Nothing organized'], required: true },
      { id: 'pricing_method', type: 'radio', question: 'How do you currently set your vehicle prices?', options: ['Manual research of competitors', 'Platform suggested pricing', 'Set it once and forget', 'Adjust based on gut feeling', 'Use third-party pricing tools', 'Copy other successful hosts'], required: true },
      { id: 'maintenance_tracking', type: 'radio', question: 'How do you track vehicle maintenance?', options: ['Spreadsheet with dates/mileage', 'Phone reminders/calendar', 'Mechanic handles everything', 'Wait until something breaks', 'Dedicated maintenance app', 'No formal tracking system'], required: true },
      { id: 'revenue_goal', type: 'radio', question: 'What is your monthly revenue goal per vehicle?', options: ['$500-800', '$800-1,200', '$1,200-1,500', '$1,500-2,000', '$2,000+', 'Not sure/varies by season'], required: true },
      { id: 'growth_plans', type: 'radio', question: 'Do you plan to grow your fleet in the next 12 months?', options: ['Yes, definitely', 'Probably', 'Maybe', 'Probably not', 'No, staying current size', 'Considering downsizing'], required: true },
      { id: 'pain_points', type: 'checkbox', question: 'Which of these problems do you experience regularly? (Select all that apply)', options: ['Forgetting maintenance appointments', 'Underpricing compared to competitors', 'Missing booking opportunities', 'Guest communication delays', 'Financial tracking confusion', 'Platform fee frustration', 'Time management stress', 'Scaling anxiety'], required: true },
      { id: 'ideal_solution', type: 'textarea', question: 'If you could wave a magic wand and solve your biggest fleet management problem, what would that solution look like?', placeholder: 'Describe your ideal solution in detail...', required: true },
      { id: 'willingness_to_pay', type: 'radio', question: 'What would you pay monthly for a solution that guaranteed 25% savings on platform fees and 20% reduction in maintenance costs?', options: ['$25-49', '$50-99', '$100-149', '$150-199', '$200+', 'Would need to see ROI proof first'], required: true }
    ]
  },
  scaling: {
    title: 'Scaling Host Survey',
    subtitle: '6-50 vehicles',
    icon: 'TrendingUp',
    color: 'accent',
    description: 'Share your experience scaling beyond the basics',
    estimatedTime: '7-10 minutes',
    incentive: 'Priority beta access + 30-minute strategy call with our team',
    questions: [
      { id: 'fleet_size', type: 'radio', question: 'Current fleet size?', options: ['6-10 vehicles', '11-20 vehicles', '21-35 vehicles', '36-50 vehicles', '50+ vehicles'], required: true },
      { id: 'growth_timeline', type: 'radio', question: 'How long did it take you to scale from 5 to your current size?', options: ['Less than 6 months', '6-12 months', '1-2 years', '2-3 years', '3+ years', 'Still growing'], required: true },
      { id: 'platforms_used', type: 'checkbox', question: 'Which platforms do you actively manage? (Select all)', options: ['Turo', 'Getaround', 'HyreCar', 'Direct bookings website', 'Corporate rentals', 'Other platforms'], required: true },
      { id: 'team_size', type: 'radio', question: 'How many people help you manage your fleet?', options: ['Just me', '1 part-time helper', '2-3 part-time helpers', '1-2 full-time employees', '3+ full-time employees', 'Mix of employees and contractors'], required: true },
      { id: 'biggest_bottleneck', type: 'radio', question: 'What is your biggest scaling bottleneck right now?', options: ['Managing multiple platforms efficiently', 'Coordinating team/contractor work', 'Maintaining pricing competitiveness', 'Vehicle maintenance oversight', 'Financial tracking and reporting', 'Finding and acquiring good vehicles', 'Insurance and legal complexity'], required: true },
      { id: 'current_software', type: 'checkbox', question: 'What software/tools do you currently use?', options: ['Advanced spreadsheets with formulas', 'Fleetio or similar fleet management', 'Custom built solution', 'Multiple specialized apps', 'Accounting software (QuickBooks, etc.)', 'Project management tools (Asana, etc.)', 'Communication tools (Slack, etc.)', 'Still mostly manual/basic tools'], required: true },
      { id: 'automation_level', type: 'scale', question: 'On a scale of 1-10, how automated is your current operation?', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], required: true },
      { id: 'monthly_revenue', type: 'radio', question: 'What is your current monthly gross revenue?', options: ['$5K-15K', '$15K-30K', '$30K-50K', '$50K-75K', '$75K-100K', '$100K+'], required: true },
      { id: 'profit_margin', type: 'radio', question: 'What is your approximate profit margin after all expenses?', options: ['Less than 10%', '10-20%', '20-30%', '30-40%', '40%+', 'Not sure/varies significantly'], required: true },
      { id: 'pricing_strategy', type: 'radio', question: 'How do you handle pricing across your fleet?', options: ['Manual adjustment based on research', 'Automated rules/formulas I created', 'Third-party pricing software', 'Team member handles pricing', 'Set seasonal rates and adjust rarely', 'Different strategy per platform'], required: true },
      { id: 'maintenance_system', type: 'radio', question: 'How do you manage maintenance across your fleet?', options: ['Detailed tracking system with schedules', 'Preferred mechanic handles everything', 'Team member coordinates maintenance', 'Mix of preventive and reactive', 'Mostly reactive when issues arise', 'Each vehicle handled independently'], required: true },
      { id: 'scaling_challenges', type: 'checkbox', question: 'Which scaling challenges have you experienced? (Select all)', options: ['Platform fee costs eating into profits', 'Difficulty finding reliable team members', 'Maintenance costs spiraling out of control', 'Insurance complications with fleet size', 'Tax and accounting complexity', 'Quality control across vehicles', 'Guest experience consistency', 'Competition from other large hosts'], required: true },
      { id: 'ideal_features', type: 'checkbox', question: 'Which features would be most valuable for your operation? (Select top 5)', options: ['Unified dashboard for all platforms', 'Automated competitive pricing', 'Maintenance scheduling and tracking', 'Team task management', 'Financial reporting and analytics', 'Guest communication automation', 'Direct booking website builder', 'Insurance claim tracking', 'Vehicle performance analytics', 'Automated listing optimization'], required: true },
      { id: 'growth_goals', type: 'textarea', question: 'What are your growth goals for the next 2-3 years? What would need to change in your operation to achieve them?', placeholder: 'Describe your growth vision and operational needs...', required: true },
      { id: 'investment_willingness', type: 'radio', question: 'What would you invest monthly in software that could increase your profit margin by 15-25%?', options: ['$100-199', '$200-399', '$400-599', '$600-999', '$1000+', 'Would need detailed ROI analysis first'], required: true }
    ]
  },
  exotic: {
    title: 'Exotic/Agency Survey',
    subtitle: 'Premium fleet management',
    icon: 'Star',
    color: 'warning',
    description: 'Luxury and exotic vehicle management insights',
    estimatedTime: '8-12 minutes',
    incentive: 'Exclusive beta access + custom feature consultation call',
    questions: [
      { id: 'business_type', type: 'radio', question: 'Which best describes your business?', options: ['Exotic car rental agency', 'Luxury car sharing host', 'Event/wedding rental specialist', 'Supercar experience company', 'High-end Turo host', 'Traditional rental with luxury fleet', 'Other premium vehicle business'], required: true },
      { id: 'fleet_composition', type: 'checkbox', question: 'What types of vehicles do you offer? (Select all)', options: ['Supercars (Ferrari, Lamborghini, McLaren)', 'Luxury sedans (Mercedes S-Class, BMW 7-Series)', 'Luxury SUVs (Range Rover, Escalade)', 'Classic/vintage cars', 'Exotic sports cars (Porsche, Aston Martin)', 'Ultra-luxury (Rolls Royce, Bentley)', 'Performance cars (AMG, M-Series)', 'Specialty vehicles (convertibles, etc.)'], required: true },
      { id: 'fleet_size', type: 'radio', question: 'How many vehicles in your premium fleet?', options: ['1-3 vehicles', '4-8 vehicles', '9-15 vehicles', '16-25 vehicles', '26-50 vehicles', '50+ vehicles'], required: true },
      { id: 'average_value', type: 'radio', question: 'What is the average value of vehicles in your fleet?', options: ['$50K-100K', '$100K-200K', '$200K-400K', '$400K-600K', '$600K+', 'Wide range/mixed'], required: true },
      { id: 'daily_rates', type: 'radio', question: 'What are your typical daily rental rates?', options: ['$200-500', '$500-1,000', '$1,000-2,000', '$2,000-5,000', '$5,000+', 'Varies significantly by vehicle'], required: true },
      { id: 'booking_channels', type: 'checkbox', question: 'How do customers find and book your vehicles? (Select all)', options: ['Turo platform', 'Direct website bookings', 'Phone/email inquiries', 'Social media marketing', 'Event/wedding referrals', 'Corporate partnerships', 'Luxury travel concierge services', 'Other rental platforms'], required: true },
      { id: 'biggest_challenges', type: 'checkbox', question: 'What are your biggest operational challenges? (Select all)', options: ['Insurance coverage and claims', 'Vehicle damage and repairs', 'Finding qualified mechanics', 'Guest screening and qualification', 'Seasonal demand fluctuations', 'Competition from other luxury providers', 'Maintaining vehicle condition', 'Storage and security', 'Pricing optimization', 'Marketing to right clientele'], required: true },
      { id: 'insurance_approach', type: 'radio', question: 'How do you handle insurance for high-value vehicles?', options: ['Platform insurance only', 'Commercial exotic car insurance', 'Combination of platform + commercial', 'Self-insured with high reserves', 'Specialized luxury vehicle coverage', 'Still figuring out best approach'], required: true },
      { id: 'maintenance_strategy', type: 'radio', question: 'How do you handle maintenance for exotic vehicles?', options: ['Authorized dealer service only', 'Specialized exotic car mechanics', 'Mix of dealer and independent specialists', 'In-house maintenance team', 'Preventive maintenance contracts', 'Reactive maintenance as needed'], required: true },
      { id: 'guest_experience', type: 'checkbox', question: 'What premium services do you offer guests? (Select all)', options: ['White-glove delivery/pickup', 'Concierge booking service', 'Professional photography sessions', 'Driving instruction/orientation', 'Event planning assistance', 'Luxury amenities (champagne, etc.)', 'Custom itinerary planning', 'VIP customer support'], required: true },
      { id: 'technology_needs', type: 'checkbox', question: 'Which technology features would be most valuable? (Select top 5)', options: ['Professional booking website builder', 'Advanced guest screening tools', 'Damage documentation system', 'Insurance claim management', 'Specialized maintenance tracking', 'Dynamic pricing for luxury market', 'Guest communication automation', 'Financial reporting for high-value assets', 'Marketing automation tools', 'Integration with luxury travel platforms'], required: true },
      { id: 'seasonal_patterns', type: 'textarea', question: 'Describe your seasonal booking patterns and how you optimize for peak periods (weddings, holidays, events, etc.)', placeholder: 'Detail your seasonal strategy and challenges...', required: true },
      { id: 'growth_vision', type: 'textarea', question: 'What is your vision for growing your luxury fleet business? What operational improvements would enable that growth?', placeholder: 'Describe your growth plans and operational needs...', required: true },
      { id: 'investment_capacity', type: 'radio', question: 'What would you invest monthly in premium fleet management software that could increase bookings by 30% and reduce operational overhead by 25%?', options: ['$200-499', '$500-999', '$1,000-1,999', '$2,000-4,999', '$5,000+', 'Would need comprehensive ROI analysis'], required: true }
    ]
  }
}; 