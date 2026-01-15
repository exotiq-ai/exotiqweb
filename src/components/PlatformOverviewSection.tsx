import React from 'react';
import { Link } from 'react-router-dom';
import { MobileSection, MobileContainer } from './MobileOptimizations';
import { TrendingUp, PieChart, Globe, Shield, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const modules = [
  {
    id: 'motoriq',
    name: 'MotorIQ',
    icon: TrendingUp,
    color: 'primary',
    description: 'Profitability Engine',
    benefit: 'AI pricing & revenue insights'
  },
  {
    id: 'pulse',
    name: 'Pulse',
    icon: PieChart,
    color: 'accent',
    description: 'Live Analytics Dashboard',
    benefit: 'Real-time fleet visibility'
  },
  {
    id: 'book',
    name: 'Book',
    icon: Globe,
    color: 'success',
    description: 'Direct Booking Platform',
    benefit: '100% revenue retention'
  },
  {
    id: 'vault',
    name: 'Vault',
    icon: Shield,
    color: 'warning',
    description: 'Compliance Hub',
    benefit: 'Auto document management'
  },
  {
    id: 'core',
    name: 'Core',
    icon: Zap,
    color: 'primary',
    description: 'Operations Center',
    benefit: 'Unified workflow automation'
  }
];

const PlatformOverviewSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  const colorClasses = {
    primary: {
      bg: 'bg-primary-500',
      bgLight: 'bg-primary-100',
      text: 'text-primary-500',
      border: 'border-primary-200',
    },
    accent: {
      bg: 'bg-accent-600',
      bgLight: 'bg-accent-100',
      text: 'text-accent-600',
      border: 'border-accent-200',
    },
    success: {
      bg: 'bg-success-600',
      bgLight: 'bg-success-100',
      text: 'text-success-600',
      border: 'border-success-200',
    },
    warning: {
      bg: 'bg-warning-600',
      bgLight: 'bg-warning-100',
      text: 'text-warning-600',
      border: 'border-warning-200',
    },
  };

  return (
    <MobileSection ref={ref} className="bg-white dark:bg-dark-900">
      <MobileContainer>
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-primary-500/20 rounded-full text-primary-600 dark:text-primary-300 font-semibold text-xs sm:text-sm mb-4 sm:mb-6">
            <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
            The Complete Platform
          </div>
          <h2 className="font-dfaalt font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4 sm:mb-6">
            Five Modules. <span className="text-primary-500">One Powerful System.</span>
          </h2>
          <p className="font-inter text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12">
            Everything you need to automate, optimize, and scale your fleet operation - all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 sm:mb-12">
          {modules.map((module, index) => {
            const colors = colorClasses[module.color as keyof typeof colorClasses] || colorClasses.primary;
            return (
              <div
                key={module.id}
                className={`group bg-white dark:bg-dark-800 p-6 rounded-2xl border-2 ${colors.border
                  } dark:border-dark-700 hover:shadow-xl transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`flex items-center justify-center w-14 h-14 ${colors.bgLight} dark:bg-${module.color}-900/30 rounded-xl mb-4 group-hover:scale-110 transition-transform mx-auto`}>
                  <module.icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white mb-2 text-center">
                  {module.name}
                </h3>
                <p className={`font-montserrat font-medium text-sm ${colors.text} mb-3 text-center`}>
                  {module.description}
                </p>
                <p className="font-montserrat text-sm text-gray-600 dark:text-gray-300 text-center">
                  {module.benefit}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/features"
            className="inline-flex items-center font-poppins font-bold text-sm uppercase tracking-wide px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all duration-200 hover:scale-105 space-x-2"
          >
            <span>Explore Full Platform Details</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

export default PlatformOverviewSection;







