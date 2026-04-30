import React from 'react';
import { motion, useInView } from 'framer-motion';
import { MobileSection, MobileContainer } from './MobileOptimizations';
import { Brain, TrendingUp, PieChart, Globe, Shield, Bot, DollarSign, BarChart3, Target, Eye, Star, MessageSquare, Calendar, FileText, ArrowRight, Mic, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlatformModulesSectionProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const modules = [
  {
    id: 'motoriq',
    name: 'MotorIQ',
    tagline: 'Profitability Engine',
    icon: TrendingUp,
    color: 'primary',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    borderColor: 'border-blue-500/30',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    description: 'AI-powered dynamic pricing that watches competitor pricing, local events, and demand to adjust your rates in real-time. Set your floor, set your ceiling, let AI maximize every booking.',
    screenshot: '/images/app-screenshots/motoriq-ui.png',
    screenshotAlt: 'MotorIQ dashboard showing price optimization and revenue analytics',
    features: [
      { icon: DollarSign, text: 'AI Dynamic Pricing' },
      { icon: BarChart3, text: 'Revenue Analytics' },
      { icon: Target, text: 'Profit Intelligence' }
    ],
    metric: { value: '40%', label: 'Revenue Increase', change: 'in 90 days' }
  },
  {
    id: 'pulse',
    name: 'Pulse',
    tagline: 'Live Analytics Dashboard',
    icon: PieChart,
    color: 'accent',
    gradient: 'from-orange-500/20 to-amber-500/10',
    borderColor: 'border-orange-500/30',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
    description: 'Your entire fleet on one screen. See which vehicles are booked, which are sitting idle, where demand is heating up. Zero spreadsheets, zero guessing.',
    screenshot: '/images/app-screenshots/pulse-ui.png',
    screenshotAlt: 'Pulse analytics showing demand forecasts and calendar heatmap',
    features: [
      { icon: Eye, text: 'Live Fleet Status' },
      { icon: Star, text: 'Performance Rankings' },
      { icon: Brain, text: 'Demand Forecasting' }
    ],
    metric: { value: '89%', label: 'Utilization Rate', change: 'industry-leading' }
  },
  {
    id: 'book',
    name: 'Book',
    tagline: 'Direct Booking Platform',
    icon: Globe,
    color: 'success',
    gradient: 'from-emerald-500/20 to-green-500/10',
    borderColor: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    description: 'Stop giving away 25-40% of every booking. Unified calendar, customer intelligence, and MotorIQ pricing sync. Your customers, your data, your revenue.',
    screenshot: '/images/app-screenshots/book-ui.png',
    screenshotAlt: 'Book module showing direct booking interface',
    features: [
      { icon: Calendar, text: 'Unified Calendar' },
      { icon: DollarSign, text: 'Zero Platform Fees' },
      { icon: TrendingUp, text: 'Customer Intelligence' }
    ],
    metric: { value: '100%', label: 'Revenue Retention', change: 'vs 60-75%' }
  },
  {
    id: 'vault',
    name: 'Vault',
    tagline: 'Compliance & Documentation',
    icon: Shield,
    color: 'warning',
    gradient: 'from-amber-500/20 to-yellow-500/10',
    borderColor: 'border-amber-500/30',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    description: 'One lapsed policy can sink your business. Vault tracks every deadline, generates every document, and alerts you before anything slips.',
    screenshot: '/images/app-screenshots/vault-ui.png',
    screenshotAlt: 'Vault compliance dashboard showing document management',
    features: [
      { icon: FileText, text: 'Auto Documentation' },
      { icon: Shield, text: 'Insurance Tracker' },
      { icon: Calendar, text: 'Deadline Radar' }
    ],
    metric: { value: '$47K', label: 'Avg Compliance Failure', change: 'sleep easier' }
  },
  {
    id: 'fleetcopilot',
    name: 'FleetCopilot',
    tagline: 'AI Operations Assistant',
    icon: Bot,
    color: 'copilot',
    gradient: 'from-emerald-400/20 to-teal-500/10',
    borderColor: 'border-emerald-400/30',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    description: 'Talk to it like a teammate. Voice commands, smart scheduling, condition-based estimates. The admin work that took hours now takes seconds.',
    screenshot: '/images/app-screenshots/fleetcopilot-ui.png',
    screenshotAlt: 'FleetCopilot AI assistant interface showing voice commands',
    features: [
      { icon: Mic, text: 'Voice Commands' },
      { icon: MessageSquare, text: 'Unified Inbox' },
      { icon: Zap, text: 'Workflow Automation' }
    ],
    metric: { value: '15+', label: 'Hours Saved Weekly', change: 'per operator' }
  }
];

// Individual Module Card Component with scroll-triggered animation
const ModuleCard: React.FC<{ module: typeof modules[0]; index: number; isReversed: boolean }> = ({ 
  module, 
  index, 
  isReversed 
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = module.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ 
        duration: 0.7, 
        delay: 0.1,
        ease: [0.25, 0.4, 0.25, 1] 
      }}
      className="relative"
    >
      {/* Main Card */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${module.gradient} border ${module.borderColor} backdrop-blur-sm`}>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Screenshot Side */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`relative p-6 lg:p-10 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
          >
            {/* Screenshot Frame */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Screenshot Container - Clean UI frame */}
              <div className="relative bg-dark-800/80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Browser-style top bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-dark-900/50 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-dark-700/50 rounded-md px-3 py-1 text-xs text-gray-500 font-mono">
                      app.exotiq.ai/{module.id}
                    </div>
                  </div>
                </div>
                
                {/* Screenshot Image - Scaled to fit full app view */}
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
                      decoding="async"
                      onError={(e) => {
                        // Fallback placeholder if image doesn't exist yet
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
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`flex flex-col justify-center p-6 lg:p-10 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
          >
            {/* Module Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 ${module.iconBg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${module.iconColor}`} />
              </div>
              <div>
                <h3 className="font-dfaalt font-bold text-2xl sm:text-3xl text-white">
                  {module.name}
                </h3>
                <p className="font-inter text-sm text-gray-400">{module.tagline}</p>
              </div>
            </div>

            {/* Description */}
            <p className="font-inter text-gray-300 text-base lg:text-lg leading-relaxed mb-6">
              {module.description}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {module.features.map((feature, i) => {
                const FeatureIcon = feature.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                  >
                    <FeatureIcon className="w-4 h-4 text-gray-400" />
                    {feature.text}
                  </motion.div>
                );
              })}
            </div>

            {/* Metric Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="text-3xl sm:text-4xl font-dfaalt font-bold text-white">
                {module.metric.value}
              </div>
              <div>
                <div className="font-inter text-sm text-gray-300 font-medium">
                  {module.metric.label}
                </div>
                <div className={`font-inter text-xs font-semibold ${module.iconColor}`}>
                  {module.metric.change}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const PlatformModulesSection: React.FC<PlatformModulesSectionProps> = () => {
  const headerRef = React.useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <MobileSection className="bg-dark-900 py-20 lg:py-32">
      <div id="platform-features">
        <MobileContainer>
          {/* Section Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 lg:mb-24"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={headerInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 font-semibold text-sm mb-6"
            >
              <Brain className="w-4 h-4 mr-2" />
              The Exotiq Platform
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-dfaalt font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6"
            >
              Five Powerful Modules.
              <span className="block text-primary-400 mt-2">One Complete Platform.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-inter text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Each module addresses a critical operational challenge. Together, they transform 
              operational complexity into automated profitability.
            </motion.p>
          </motion.div>

          {/* Module Cards - Stacked with scroll reveal */}
          <div className="space-y-8 lg:space-y-12">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                isReversed={index % 2 === 1}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16 lg:mt-24"
          >
            <p className="font-inter text-gray-400 mb-6">
              Ready to see how Exotiq can transform your fleet operations?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-dfaalt font-semibold rounded-xl transition-colors duration-300 group"
                >
                  Explore All Features
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-dfaalt font-semibold rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  Book a Demo
                </a>
              </motion.div>
            </div>
          </motion.div>
        </MobileContainer>
      </div>
    </MobileSection>
  );
};

export default PlatformModulesSection;
