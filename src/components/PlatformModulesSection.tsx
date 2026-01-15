import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileSection, MobileContainer } from './MobileOptimizations';
import { Brain, TrendingUp, PieChart, Globe, Shield, Zap, DollarSign, BarChart3, Target, Eye, Star, MessageSquare, Calendar, FileText } from 'lucide-react';
import Card from './ui/Card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface PlatformModulesSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const modules = [
  {
    id: 'motoriq',
    name: 'MotorIQ',
    icon: TrendingUp,
    color: 'primary',
    description: 'Profitability Engine',
    screenshot: '/images/app-screenshots/hero-dashboard-macbook.svg',
    screenshotAlt: 'MotorIQ dashboard showing price optimization and revenue analytics',
    features: [
      { icon: DollarSign, title: 'AI Dynamic Pricing', text: 'Automatically adjust rates to maximize revenue based on demand and competition' },
      { icon: BarChart3, title: 'Real-Time Revenue Insights', text: 'Track earnings, margins, and performance metrics across all platforms' },
      { icon: Target, title: 'Maintenance Cost Forecasting', text: 'Predict upcoming costs and budget before emergencies happen' }
    ],
    metric: '$1,890',
    metricLabel: 'Average Revenue per Vehicle',
    metricChange: '+12%'
  },
  {
    id: 'pulse',
    name: 'Pulse',
    icon: PieChart,
    color: 'accent',
    description: 'Live Analytics Dashboard',
    screenshot: '/images/app-screenshots/demand-forecast-macbook.svg',
    screenshotAlt: 'Pulse analytics showing demand forecasts and calendar heatmap',
    features: [
      { icon: Eye, title: 'Live Vehicle Metrics', text: 'Real-time visibility into vehicle status and active bookings' },
      { icon: Star, title: 'Top Performers Analysis', text: 'Identify most profitable vehicles for better acquisition decisions' },
      { icon: Brain, title: 'Location & Season Forecasts', text: 'AI-powered predictions based on trends and patterns' }
    ],
    metric: '89%',
    metricLabel: 'Utilization Rate',
    metricChange: '+5%'
  },
  {
    id: 'book',
    name: 'Book',
    icon: Globe,
    color: 'success',
    description: 'Direct Booking Platform',
    screenshot: '/images/app-screenshots/booking-mobile.svg',
    screenshotAlt: 'Book module showing direct booking interface',
    features: [
      { icon: Calendar, title: 'White-Label Booking Site', text: 'Custom-branded booking platform to capture 100% revenue' },
      { icon: DollarSign, title: 'Zero Platform Fees', text: 'Eliminate 25-35% fees by booking directly with customers' },
      { icon: TrendingUp, title: 'SEO Optimized', text: 'Built-in marketing tools to drive organic traffic' }
    ],
    metric: '100%',
    metricLabel: 'Revenue Retention',
    metricChange: 'vs 65-75%'
  },
  {
    id: 'vault',
    name: 'Vault',
    icon: Shield,
    color: 'warning',
    description: 'Compliance & Documentation',
    screenshot: '/images/app-screenshots/vault-macbook.svg',
    screenshotAlt: 'Vault compliance dashboard showing 87% compliance rate',
    features: [
      { icon: FileText, title: 'Automated Documentation', text: 'Generate rental agreements, insurance forms, and compliance docs' },
      { icon: Shield, title: 'Regulatory Compliance', text: 'Stay compliant with state and local regulations automatically' },
      { icon: Calendar, title: 'Expiration Tracking', text: 'Never miss renewal deadlines for licenses, insurance, or permits' }
    ],
    metric: '0',
    metricLabel: 'Compliance Violations',
    metricChange: '100% Success'
  },
  {
    id: 'core',
    name: 'Core',
    icon: Zap,
    color: 'primary',
    description: 'Operations Hub',
    screenshot: '/images/app-screenshots/crm-macbook.svg',
    screenshotAlt: 'Core operations hub showing customer database and VIP management',
    features: [
      { icon: MessageSquare, title: 'Unified Inbox', text: 'Manage all guest communication from one central dashboard' },
      { icon: Calendar, title: 'Fleet Calendar', text: 'Visual scheduling across all vehicles and platforms' },
      { icon: Zap, title: 'Workflow Automation', text: 'Automate repetitive tasks like check-ins and follow-ups' }
    ],
    metric: '15+',
    metricLabel: 'Hours Saved Weekly',
    metricChange: 'Per Operator'
  }
];

// Color class mappings for Tailwind
const colorClasses = {
  primary: {
    bg: 'bg-primary-500',
    bgLight: 'bg-primary-100',
    bgDark: 'dark:bg-primary-900/30',
    text: 'text-primary-500',
    textDark: 'dark:text-primary-400',
    border: 'border-primary-500/20',
    borderHover: 'hover:border-primary-500/50',
    glow: 'hover:shadow-primary-500/20',
  },
  accent: {
    bg: 'bg-accent-600',
    bgLight: 'bg-accent-100',
    bgDark: 'dark:bg-accent-900/30',
    text: 'text-accent-600',
    textDark: 'dark:text-accent-400',
    border: 'border-accent-500/20',
    borderHover: 'hover:border-accent-500/50',
    glow: 'hover:shadow-accent-500/20',
  },
  success: {
    bg: 'bg-success-600',
    bgLight: 'bg-success-100',
    bgDark: 'dark:bg-success-900/30',
    text: 'text-success-600',
    textDark: 'dark:text-success-400',
    border: 'border-success-500/20',
    borderHover: 'hover:border-success-500/50',
    glow: 'hover:shadow-success-500/20',
  },
  warning: {
    bg: 'bg-warning-600',
    bgLight: 'bg-warning-100',
    bgDark: 'dark:bg-warning-900/30',
    text: 'text-warning-600',
    textDark: 'dark:text-warning-400',
    border: 'border-warning-500/20',
    borderHover: 'hover:border-warning-500/50',
    glow: 'hover:shadow-warning-500/20',
  },
};

// Bombon-style animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  }
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.1,
      ease: [0.25, 0.4, 0.25, 1]
    }
  })
};

const PlatformModulesSection: React.FC<PlatformModulesSectionProps> = ({ activeTab, setActiveTab }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });
  const [contentKey, setContentKey] = useState(0);
  const activeModule = modules.find(m => m.id === activeTab) || modules[0];
  const activeColorClasses = colorClasses[activeModule.color as keyof typeof colorClasses] || colorClasses.primary;

  // Trigger re-animation when tab changes
  useEffect(() => {
    setContentKey(prev => prev + 1);
  }, [activeTab]);

  return (
    <MobileSection ref={ref} className="bg-white dark:bg-dark-900">
      <div id="platform-features">
        <MobileContainer>
          {/* Section Header */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-300 font-semibold text-sm mb-4"
            >
              <Brain className="w-4 h-4 mr-2" />
              The Exotiq Platform
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="font-dfaalt font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4 px-2"
            >
              Five Powerful Modules.
              <span className="block text-primary-500 dark:text-primary-400">One Complete Platform.</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="font-inter text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2"
            >
              Each module addresses a critical operational challenge. Together, they transform operational complexity into automated profitability.
            </motion.p>
          </motion.div>
          
          {/* Module Cards Grid - Bombon-inspired with stagger */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="max-w-5xl mx-auto mb-12 sm:mb-16"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {modules.map((module, index) => {
                const Icon = module.icon;
                const moduleColorClasses = colorClasses[module.color as keyof typeof colorClasses] || colorClasses.primary;
                const isActive = activeTab === module.id;
                
                return (
                  <motion.button
                    key={module.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(module.id)}
                    className={`group relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl border-2 transition-colors duration-300 ${
                      isActive
                        ? `${moduleColorClasses.bg} text-white border-transparent shadow-xl`
                        : `bg-gray-50 dark:bg-dark-800 border-gray-200 dark:border-dark-700 ${moduleColorClasses.borderHover} hover:shadow-lg hover:bg-white dark:hover:bg-dark-700`
                    }`}
                  >
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 ${
                        isActive 
                          ? 'bg-white/20' 
                          : `${moduleColorClasses.bgLight} ${moduleColorClasses.bgDark}`
                      }`}
                    >
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${
                        isActive ? 'text-white' : `${moduleColorClasses.text} ${moduleColorClasses.textDark}`
                      }`} />
                    </motion.div>
                    
                    {/* Name */}
                    <span className={`font-dfaalt font-bold text-base sm:text-lg mb-1 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-gray-900 dark:text-white'
                    }`}>
                      {module.name}
                    </span>
                    
                    {/* Description */}
                    <span className={`font-inter text-xs sm:text-sm text-center leading-tight transition-colors duration-300 ${
                      isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {module.description}
                    </span>
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
          
          {/* Selected Module Content with AnimatePresence */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={contentKey}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
              >
                <Card 
                  variant="elevated" 
                  padding="lg" 
                  hover
                  className="shadow-2xl hover:shadow-3xl"
                >
                  {/* Module Header */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-dark-700"
                  >
                    <motion.div
                      initial={{ scale: 0.8, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
                      className={`w-14 h-14 ${activeColorClasses.bgLight} ${activeColorClasses.bgDark} rounded-xl flex items-center justify-center shadow-md`}
                    >
                      <activeModule.icon className={`w-7 h-7 ${activeColorClasses.text} ${activeColorClasses.textDark}`} />
                    </motion.div>
                    <div>
                      <h3 className="font-dfaalt font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">
                        {activeModule.name}
                      </h3>
                      <p className="font-inter text-sm text-gray-600 dark:text-gray-400">{activeModule.description}</p>
                    </div>
                  </motion.div>
                  
                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {activeModule.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <motion.div
                          key={index}
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={featureCardVariants}
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="group/feature p-5 rounded-xl bg-gray-50 dark:bg-dark-800/50 hover:bg-white dark:hover:bg-dark-800 border border-gray-100 dark:border-dark-700 transition-colors duration-300 hover:shadow-lg cursor-default"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              className={`w-10 h-10 ${activeColorClasses.bgLight} ${activeColorClasses.bgDark} rounded-lg flex items-center justify-center flex-shrink-0`}
                            >
                              <FeatureIcon className={`w-5 h-5 ${activeColorClasses.text} ${activeColorClasses.textDark}`} />
                            </motion.div>
                            <h4 className="font-dfaalt font-semibold text-base text-gray-900 dark:text-white">
                              {feature.title}
                            </h4>
                          </div>
                          <p className="font-inter text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {feature.text}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Screenshot + Metric */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Screenshot */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="relative group"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 to-primary-600/10 dark:from-primary-500/15 dark:to-primary-600/15 rounded-2xl blur-xl"
                      />
                      <motion.img
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        src={activeModule.screenshot}
                        alt={activeModule.screenshotAlt}
                        className="w-full h-auto relative z-10 rounded-xl drop-shadow-xl"
                        loading="lazy"
                      />
                    </motion.div>
                    
                    {/* Metric Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-primary-500/10 via-primary-600/5 to-transparent dark:from-primary-500/20 dark:via-primary-600/10 p-8 lg:p-10 rounded-2xl border border-primary-500/20 hover:border-primary-500/40 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
                          className="text-5xl sm:text-6xl lg:text-7xl font-dfaalt font-bold text-primary-500 mb-4"
                        >
                          {activeModule.metric}
                        </motion.div>
                        <div className="font-inter text-lg text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                          {activeModule.metricLabel}
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full text-sm font-semibold text-primary-600 dark:text-primary-400"
                        >
                          {activeModule.metricChange}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </MobileContainer>
      </div>
    </MobileSection>
  );
};

export default PlatformModulesSection;
