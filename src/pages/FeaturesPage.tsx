import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar,
  MessageSquare,
  Globe,
  Zap,
  Bot,
  TrendingUp,
  Brain,
  PieChart,
  Shield,
  DollarSign,
  BarChart3,
  Target,
  Eye,
  Star,
  FileText,
  CheckCircle,
  Users,
  Sparkles,
  ChevronRight,
  Plus,
  LineChart,
  Bell,
  Wallet,
  UserCheck,
  Filter,
  Mail,
  CreditCard,
  Radar,
  FolderLock,
  ClipboardCheck,
  Mic,
  Route,
  Wrench
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { MobileSection, MobileContainer } from '../components/MobileOptimizations';
import { softwareApplicationSchema, breadcrumbSchema } from '../data/structuredData';

// Enhanced module data with final copy
const modules = [
  {
    id: 'motoriq',
    name: 'MotorIQ',
    tagline: 'Profitability Engine',
    icon: TrendingUp,
    gradient: 'from-blue-600 via-cyan-500 to-blue-600',
    bgGradient: 'from-blue-500/10 via-cyan-500/5 to-blue-500/10',
    borderColor: 'border-blue-500/30',
    accentColor: 'text-blue-400',
    iconBg: 'bg-blue-500/20',
    description: 'AI-powered dynamic pricing that analyzes 1,000+ data points to optimize every rental. Never leave money on the table again.',
    longDescription: 'MotorIQ is your always-on revenue analyst. It watches competitor pricing, local events, weather patterns, and historical demand to adjust your rates in real-time. Set your floor, set your ceiling, and let AI maximize every booking.',
    screenshot: '/images/app-screenshots/motoriq-ui.png',
    screenshotAlt: 'MotorIQ dashboard showing price optimization and revenue analytics',
    heroMetric: { value: '40%', label: 'Average Revenue Increase', sublabel: 'in 90 days' },
    features: [
      { 
        icon: DollarSign, 
        title: 'AI Dynamic Pricing', 
        description: 'Analyzes 1,000+ data points including demand, local events, competitor rates, and weather. Prices update automatically so you capture every dollar without lifting a finger.',
        highlight: true
      },
      { 
        icon: BarChart3, 
        title: 'Revenue Analytics', 
        description: 'See exactly what each vehicle earns per day, per week, per season. Know your top performers, spot your underperformers, and optimize your fleet mix accordingly.'
      },
      { 
        icon: Wallet, 
        title: 'Profit Intelligence', 
        description: 'Understands the true cost of each vehicle, factoring in depreciation, maintenance, and utilization. Shows you which cars actually make money, not just revenue.'
      },
      { 
        icon: LineChart, 
        title: 'Demand Forecasting', 
        description: 'Predicts demand weeks in advance by learning from local events, holidays, and historical booking patterns. Position your rates before the surge, not after.'
      },
      { 
        icon: Shield, 
        title: 'Price Floor Protection', 
        description: 'Set minimum prices that protect your margins. AI will never undercut your floor, even when demand dips. Your bottom line stays intact.'
      },
      { 
        icon: Sparkles, 
        title: 'Opportunity Engine', 
        description: 'Surfaces opportunities before you spot them. When to raise rates, which vehicles to add, and market gaps your competitors are ignoring.'
      }
    ],
    whoItsFor: ['Fleet operators running 5+ vehicles', 'Hosts ready to stop guessing on pricing', 'Multi-market operators managing demand across locations'],
    testimonial: {
      quote: "MotorIQ increased our revenue by 40% in just 3 months. The AI pricing is scary accurate — it knows when to raise prices before we even realize demand is spiking.",
      author: 'Sarah C.',
      role: 'Fleet Owner',
      company: 'Miami',
      metric: '+40% Revenue'
    }
  },
  {
    id: 'pulse',
    name: 'Pulse',
    tagline: 'Live Analytics Dashboard',
    icon: PieChart,
    gradient: 'from-orange-500 via-amber-500 to-orange-500',
    bgGradient: 'from-orange-500/10 via-amber-500/5 to-orange-500/10',
    borderColor: 'border-orange-500/30',
    accentColor: 'text-orange-400',
    iconBg: 'bg-orange-500/20',
    description: 'Real-time visibility into your entire fleet. See what\'s happening, predict what\'s coming, and make smarter decisions faster.',
    longDescription: 'Pulse turns scattered data into a single command center. See which vehicles are booked, which are sitting idle, where demand is heating up, and where your attention is needed. Your entire fleet, one screen, zero spreadsheets.',
    screenshot: '/images/app-screenshots/pulse-ui.png',
    screenshotAlt: 'Pulse analytics showing demand forecasts and calendar heatmap',
    heroMetric: { value: '89%', label: 'Average Utilization Rate', sublabel: 'industry-leading' },
    features: [
      { 
        icon: Eye, 
        title: 'Live Fleet Status', 
        description: 'Every vehicle\'s status in real-time: booked, available, in transit, or in maintenance. Know where your fleet stands without calling anyone.',
        highlight: true
      },
      { 
        icon: Star, 
        title: 'Performance Rankings', 
        description: 'Instantly see which vehicles generate the most revenue and which drag down your average. Make confident decisions about expansion, retirement, and repositioning.'
      },
      { 
        icon: Calendar, 
        title: 'Calendar Heatmap', 
        description: 'Visual calendar showing booking density across your fleet. Spot schedule gaps at a glance and fill empty days before they cost you.'
      },
      { 
        icon: Target, 
        title: 'Utilization Tracker', 
        description: 'Monitor how hard each vehicle works. Flag cars sitting idle too long and surface opportunities to rebalance inventory across locations.'
      },
      { 
        icon: TrendingUp, 
        title: 'Trend Analysis', 
        description: 'Track revenue patterns and seasonal shifts over time. Compare month-over-month and year-over-year so you see the trajectory, not just the snapshot.'
      },
      { 
        icon: Bell, 
        title: 'Proactive Alerts', 
        description: 'Get notified the moment metrics slip below targets, demand spikes in your market, or a vehicle needs attention. Act on opportunities while they\'re still opportunities.'
      }
    ],
    whoItsFor: ['Data-driven operators', 'Multi-vehicle fleet managers', 'Operators scaling beyond gut instinct'],
    testimonial: {
      quote: "Finally, I can see my entire operation at a glance. Pulse showed me which vehicles were underperforming. I sold two and increased my overall profit margin by 15%.",
      author: 'Marcus R.',
      role: 'Rental Entrepreneur',
      company: 'Elite Car Share',
      metric: '+15% Margin'
    }
  },
  {
    id: 'book',
    name: 'Book',
    tagline: 'Direct Booking Platform',
    icon: Globe,
    gradient: 'from-emerald-500 via-green-500 to-emerald-500',
    bgGradient: 'from-emerald-500/10 via-green-500/5 to-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    accentColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/20',
    description: 'Your own booking system. Capture 100% of revenue and build direct relationships with customers.',
    longDescription: 'Stop giving away 25-40% of every booking to platforms. Book is your command center for reservations, calendars, and customer relationships. Sync your calendars, track your best customers, and let MotorIQ pricing flow in automatically. Your customers, your data, your revenue.',
    screenshot: '/images/app-screenshots/book-ui.png',
    screenshotAlt: 'Book module showing direct booking interface',
    heroMetric: { value: '100%', label: 'Revenue Retention', sublabel: 'vs 60-75% on marketplace platforms' },
    features: [
      { 
        icon: Calendar, 
        title: 'Unified Calendar', 
        description: 'Sync with Google Calendar, export to iCal, and import .ics files from anywhere. One calendar view across your entire fleet. No more double-bookings, no more juggling tabs.',
        highlight: true
      },
      { 
        icon: Users, 
        title: 'Customer Intelligence', 
        description: 'See every customer\'s lifetime value, total bookings, average spend, and last rental date. Tag your VIPs and know exactly who your best renters are.'
      },
      { 
        icon: Filter, 
        title: 'Smart Segmentation', 
        description: 'Filter customers by spend, booking frequency, or time since last rental. Target your $5K+ whales differently than one-time renters. Re-engage customers who haven\'t booked in 90 days.'
      },
      { 
        icon: Zap, 
        title: 'Dynamic Pricing Sync', 
        description: 'MotorIQ prices flow directly into your booking system. No manual updates, no lag. Rates adjust automatically based on demand, events, and competition.'
      },
      { 
        icon: CreditCard, 
        title: 'Instant Booking & Payments', 
        description: 'Customers book and pay in one step. Stripe processing with Apple Pay and Google Pay. Deposits, damage waivers, and automated confirmations built in.'
      },
      { 
        icon: Mail, 
        title: 'Branded Communications', 
        description: 'Professional email templates with your logo, colors, and domain. Confirmations, reminders, and follow-ups that look like you spent $200K on custom software.'
      }
    ],
    whoItsFor: ['Operators done paying platform fees', 'Hosts building a brand they own', 'Businesses ready to own the customer relationship'],
    testimonial: {
      quote: "We moved 60% of our bookings to direct within 30 days. That\'s an extra $14,000/month we were giving to Turo. Book paid for itself in one week.",
      author: 'James P.',
      role: 'Fleet Manager',
      company: 'Scottsdale',
      metric: '+$14K/month'
    }
  },
  {
    id: 'vault',
    name: 'Vault',
    tagline: 'Compliance & Documentation',
    icon: Shield,
    gradient: 'from-amber-500 via-yellow-500 to-amber-500',
    bgGradient: 'from-amber-500/10 via-yellow-500/5 to-amber-500/10',
    borderColor: 'border-amber-500/30',
    accentColor: 'text-amber-400',
    iconBg: 'bg-amber-500/20',
    description: 'Automated compliance management. Generate documents, track expirations, stay protected.',
    longDescription: 'One lapsed insurance policy. One expired registration. One missing agreement. That\'s all it takes to turn a fender-bender into a lawsuit. Vault tracks every deadline, generates every document, and alerts you before anything slips. The stuff that can sink your business, handled automatically.',
    screenshot: '/images/app-screenshots/vault-ui.png',
    screenshotAlt: 'Vault compliance dashboard showing document management',
    heroMetric: { value: '$47K', label: 'Average Cost of One Compliance Failure', sublabel: 'sleep easier' },
    features: [
      { 
        icon: FileText, 
        title: 'Automated Agreements', 
        description: 'Generate rental agreements, damage reports, and receipts with one click. Legally compliant templates updated for your state. No more Googling "is this enforceable."',
        highlight: true
      },
      { 
        icon: Shield, 
        title: 'Insurance Tracker', 
        description: 'Every policy for every vehicle in one view. Alerts at 30, 14, and 7 days before expiration. Coverage gaps don\'t happen when Vault is watching.'
      },
      { 
        icon: Radar, 
        title: 'Deadline Radar', 
        description: 'Registrations, inspections, permits, renewals. Vault tracks every date that matters and alerts you before anything lapses. Nothing expires without warning.'
      },
      { 
        icon: FolderLock, 
        title: 'Document Vault', 
        description: 'Encrypted cloud storage for every file. Access from anywhere, share with a click, pull records instantly if you ever need to prove compliance.'
      },
      { 
        icon: ClipboardCheck, 
        title: 'State Compliance', 
        description: 'Pre-built checklists for state-specific requirements. Know exactly what your market demands and stay audit-ready without the research.'
      },
      { 
        icon: UserCheck, 
        title: 'Driver Verification', 
        description: 'Verify licenses, run background checks, and store verification records. Know who\'s behind the wheel before you hand over the keys.'
      }
    ],
    whoItsFor: ['Operators in regulated markets', 'Fleets with lender or insurance requirements', 'Anyone who\'s been burned by a missed deadline'],
    testimonial: {
      quote: "Vault caught an insurance expiration I would have missed. One claim on an uninsured vehicle could have bankrupted me. Worth every penny.",
      author: 'Emma T.',
      role: 'Operations Manager',
      company: 'Luxury Fleet Rentals',
      metric: '$50K+ Protected'
    }
  },
  {
    id: 'fleetcopilot',
    name: 'FleetCopilot',
    tagline: 'AI Operations Assistant',
    icon: Bot,
    gradient: 'from-emerald-400 via-teal-500 to-emerald-500',
    bgGradient: 'from-emerald-500/10 via-teal-500/5 to-emerald-500/10',
    borderColor: 'border-emerald-400/30',
    accentColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/20',
    description: 'Your AI-powered operations assistant. Voice commands, smart scheduling, and intelligent task management.',
    longDescription: 'FleetCopilot is mission control for your fleet. Talk to it like a teammate — ask questions, give commands, get answers. It coordinates pickups, manages turnarounds, and keeps your operation running smoothly. The admin work that used to take hours now takes seconds.',
    screenshot: '/images/app-screenshots/fleetcopilot-ui.png',
    screenshotAlt: 'FleetCopilot AI assistant interface showing voice commands and task management',
    heroMetric: { value: '15+', label: 'Hours Saved Weekly', sublabel: 'per operator' },
    features: [
      { 
        icon: Mic, 
        title: 'Voice Commands', 
        description: 'Talk to Copilot like a teammate. "What\'s my schedule tomorrow?" "Block the Lambo for maintenance." "Text the 3pm pickup that I\'m running late." Natural language, instant action.',
        highlight: true
      },
      { 
        icon: MessageSquare, 
        title: 'Unified Inbox', 
        description: 'Messages from Turo, Getaround, direct bookings — all in one place. Copilot drafts responses, flags urgent items, and makes sure nothing slips through the cracks.'
      },
      { 
        icon: Route, 
        title: 'Smart Scheduling', 
        description: 'Copilot knows your fleet, your locations, and your team. It optimizes pickup routes, suggests handoff times, and prevents scheduling conflicts before they happen.'
      },
      { 
        icon: Wrench, 
        title: 'Condition-Based Estimates', 
        description: 'Car came back trashed? Copilot adjusts the turnaround time automatically. "This one needs 90 minutes, not 45. Flagging the 3pm pickup as at-risk." No more surprise delays.'
      },
      { 
        icon: Users, 
        title: 'Team Coordination', 
        description: 'Assign tasks to cleaners, drivers, and managers with role-based access. Everyone sees what they need, nothing they don\'t. Copilot keeps the whole team in sync.'
      },
      { 
        icon: Zap, 
        title: 'Workflow Automation', 
        description: 'Automate check-in instructions, review requests, follow-ups, and reminders. Set it once, forget it forever. Copilot handles the repetitive stuff so you can focus on growth.'
      }
    ],
    whoItsFor: ['Operators drowning in admin work', 'Teams coordinating multiple people', 'Anyone who\'d rather talk than type'],
    testimonial: {
      quote: "I was spending 3 hours a day on admin. FleetCopilot cut that to 30 minutes. The voice commands alone are worth it — I run my whole operation while driving between pickups.",
      author: 'David K.',
      role: 'Fleet Operator',
      company: 'Denver',
      metric: '85% Time Saved'
    }
  }
];

// Expandable Feature Card Component (Bombon-inspired)
const FeatureCard: React.FC<{
  feature: typeof modules[0]['features'][0];
  index: number;
  accentColor: string;
  iconBg: string;
  isInView: boolean;
}> = ({ feature, index, accentColor, iconBg, isInView }) => {
  const [isExpanded, setIsExpanded] = useState(feature.highlight || false);
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`relative group cursor-pointer rounded-2xl border transition-all duration-300 ${
        isExpanded 
          ? 'bg-white/10 border-white/20 shadow-xl' 
          : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/15'
      } ${feature.highlight ? 'ring-1 ring-white/20' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-4 sm:p-5">
        <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`w-5 h-5 ${accentColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-dfaalt font-semibold text-white text-base">
            {feature.title}
          </h4>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            isExpanded ? 'bg-white/20' : 'bg-white/5'
          }`}
        >
          <Plus className={`w-4 h-4 ${isExpanded ? 'text-white' : 'text-gray-400'}`} />
        </motion.div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <p className="font-inter text-sm text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Module Deep-Dive Section Component
const ModuleSection: React.FC<{ module: typeof modules[0]; index: number }> = ({ module, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = module.icon;
  const isReversed = index % 2 === 1;

  return (
    <section
      ref={ref}
      id={module.id}
      className="relative py-20 lg:py-28 scroll-mt-24"
    >
      {/* Section Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${module.bgGradient} opacity-50`} />
      
      <MobileContainer>
        <div className="relative z-10">
          {/* Module Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            {/* Module Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border ${module.borderColor} bg-white/5 mb-6`}
            >
              <div className={`w-8 h-8 ${module.iconBg} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${module.accentColor}`} />
              </div>
              <span className={`font-dfaalt font-bold text-lg ${module.accentColor}`}>
                {module.name}
              </span>
              <span className="font-inter text-sm text-gray-400">
                {module.tagline}
              </span>
            </motion.div>

            {/* Hero Metric */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <div className={`text-5xl sm:text-6xl lg:text-7xl font-dfaalt font-bold bg-gradient-to-r ${module.gradient} bg-clip-text text-transparent`}>
                {module.heroMetric.value}
              </div>
              <div className="font-inter text-lg text-gray-300 mt-2">
                {module.heroMetric.label}
              </div>
              <div className="font-inter text-sm text-gray-500">
                {module.heroMetric.sublabel}
              </div>
            </motion.div>

            {/* Long Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-inter text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              {module.longDescription}
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start`}>
            
            {/* Screenshot Side */}
            <motion.div
              initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className={`${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
            >
              {/* Screenshot Frame */}
              <div className="relative group">
                {/* Glow */}
                <div className={`absolute -inset-4 bg-gradient-to-r ${module.gradient} rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Browser Frame */}
                <div className="relative bg-dark-800/90 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Browser Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-dark-900/80 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-dark-700/50 rounded-md px-3 py-1.5 text-xs text-gray-500 font-mono">
                        app.exotiq.ai/{module.id}
                      </div>
                    </div>
                  </div>
                  
                  {/* Screenshot - Scaled to fit full app view */}
                  <div className="aspect-[16/10] bg-dark-900 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <img
                        src={module.screenshot}
                        alt={module.screenshotAlt}
                        className="w-full h-full object-contain rounded-sm"
                        style={{ 
                          maxWidth: '100%',
                          maxHeight: '100%',
                        }}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="w-full h-full flex flex-col items-center justify-center text-gray-500 p-8">
                              <svg class="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span class="text-sm font-medium">${module.name} Screenshot</span>
                              <span class="text-xs mt-1 opacity-60">Coming Soon</span>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Who It's For */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Users className={`w-4 h-4 ${module.accentColor}`} />
                  <span className="font-dfaalt font-semibold text-sm text-white">Perfect For</span>
                </div>
                <div className="font-inter text-sm text-gray-400 leading-relaxed">
                  {module.whoItsFor.join(' · ')}
                </div>
              </motion.div>
            </motion.div>

            {/* Features Grid Side */}
            <motion.div
              initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className={`${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
            >
              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                {module.features.map((feature, i) => (
                  <FeatureCard
                    key={i}
                    feature={feature}
                    index={i}
                    accentColor={module.accentColor}
                    iconBg={module.iconBg}
                    isInView={isInView}
                  />
                ))}
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className={`mt-6 p-5 rounded-xl bg-gradient-to-br ${module.bgGradient} border ${module.borderColor}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="font-inter text-gray-300 italic leading-relaxed mb-4">
                      "{module.testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${module.iconBg} rounded-full flex items-center justify-center`}>
                          <span className={`font-dfaalt font-bold text-sm ${module.accentColor}`}>
                            {module.testimonial.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-dfaalt font-semibold text-white text-sm">
                            {module.testimonial.author}
                          </div>
                          <div className="font-inter text-xs text-gray-400">
                            {module.testimonial.role} · {module.testimonial.company}
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1.5 rounded-full ${module.iconBg} ${module.accentColor} font-dfaalt font-bold text-sm whitespace-nowrap`}>
                        {module.testimonial.metric}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Module CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-12"
          >
            <a
              href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${module.gradient} text-white font-dfaalt font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
            >
              <span>See {module.name} in Action</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </MobileContainer>
    </section>
  );
};

export default function FeaturesPage() {
  const heroRef = React.useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Smooth scroll to module
  const scrollToModule = (moduleId: string) => {
    const element = document.getElementById(moduleId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-dark-900 min-h-screen">
      <SEOHead
        title="Platform Features - Complete Fleet Management Solution"
        description="Discover Exotiq.ai's powerful modules: MotorIQ for revenue optimization, Pulse for analytics, Book for direct bookings, Vault for compliance, and FleetCopilot for AI-powered operations. Built specifically for exotic fleet operators."
        keywords="fleet management features, AI pricing engine, vehicle analytics, direct booking platform, fleet operations dashboard, Turo host tools, rental business automation"
        url="https://exotiq.ai/features"
        structuredData={[
          softwareApplicationSchema,
          breadcrumbSchema([
            { name: "Home", url: "https://exotiq.ai" },
            { name: "Features", url: "https://exotiq.ai/features" }
          ])
        ]}
      />

      {/* Hero Section with Quick Nav */}
      <section ref={heroRef} className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/5 via-transparent to-transparent" />
        </div>

        <MobileContainer>
          <div className="relative z-10 text-center">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 font-semibold text-sm mb-6"
            >
              <CheckCircle className="w-4 h-4 text-green-400" />
              Trusted by operators managing over $120M in fleet assets
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-dfaalt font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight"
            >
              The Complete Platform for{' '}
              <span className="bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">
                Exotic Fleet Operations
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-inter text-xl text-gray-300 max-w-3xl mx-auto mb-10"
            >
              Five powerful modules working together. Operators see{' '}
              <span className="text-primary-400 font-semibold">40% revenue increase</span> and{' '}
              <span className="text-primary-400 font-semibold">85% less admin work</span> in 90 days.
            </motion.p>

            {/* Quick Nav Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <motion.button
                    key={module.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    onClick={() => scrollToModule(module.id)}
                    className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl border ${module.borderColor} bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105`}
                  >
                    <div className={`w-7 h-7 ${module.iconBg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-3.5 h-3.5 ${module.accentColor}`} />
                    </div>
                    <span className="font-dfaalt font-semibold text-sm text-white">
                      {module.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <a
                href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 font-dfaalt font-semibold text-lg px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/30"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/fleetcopilot"
                className="inline-flex items-center justify-center gap-2 font-dfaalt font-semibold text-lg px-8 py-4 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-xl border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300"
              >
                <Bot className="w-5 h-5" />
                <span>Try FleetCopilot AI</span>
              </Link>
            </motion.div>
          </div>
        </MobileContainer>
      </section>

      {/* Module Deep-Dive Sections */}
      {modules.map((module, index) => (
        <ModuleSection key={module.id} module={module} index={index} />
      ))}

      {/* Final CTA Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-emerald-500/10" />
        
        <MobileContainer>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            <h2 className="font-dfaalt font-bold text-4xl sm:text-5xl text-white mb-6">
              Ready to Transform Your Fleet?
            </h2>
            <p className="font-inter text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Join operators managing over $120M in fleet assets. See the platform in action with a personalized demo.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 font-dfaalt font-semibold text-lg px-10 py-5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/30"
                >
                  <Calendar className="w-6 h-6" />
                  <span>Book Your 15-Minute Demo</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-inter text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-inter text-sm">15-minute consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-inter text-sm">Custom setup included</span>
              </div>
            </div>
          </motion.div>
        </MobileContainer>
      </section>
    </div>
  );
}
