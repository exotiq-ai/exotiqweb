import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  Play,
  CheckCircle
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import FeaturesHero from '../components/FeaturesHero';
import { MobileSection, MobileContainer } from '../components/MobileOptimizations';
import Card from '../components/ui/Card';
import { softwareApplicationSchema, breadcrumbSchema } from '../data/structuredData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Module data with story arc order and testimonial integration
const modules = [
  {
    id: 'motoriq',
    name: 'MotorIQ',
    tagline: 'Profitability Engine',
    icon: TrendingUp,
    color: 'primary',
    metricHeadline: '40% Revenue Increase',
    metricSubline: 'in 90 Days',
    screenshot: '/images/app-screenshots/hero-dashboard-macbook.svg',
    screenshotAlt: 'MotorIQ dashboard showing AI-powered pricing optimization',
    features: [
      { icon: DollarSign, text: 'AI analyzes 1,000+ data points to optimize every rental' },
      { icon: BarChart3, text: 'Dynamic pricing adapts to demand in real-time' },
      { icon: Target, text: 'Competitor tracking ensures you never leave money on the table' }
    ],
    testimonial: {
      quote: "Exotiq's pricing AI increased our profits by 40% in just 3 months.",
      author: 'Sarah Chen',
      role: 'Fleet Owner, Luxury Drives Miami'
    }
  },
  {
    id: 'pulse',
    name: 'Pulse',
    tagline: 'Live Analytics Dashboard',
    icon: PieChart,
    color: 'success',
    metricHeadline: '89% Utilization Rate',
    metricSubline: 'Industry-Leading',
    screenshot: '/images/app-screenshots/demand-forecast-macbook.svg',
    screenshotAlt: 'Pulse analytics showing demand forecasts and calendar heatmap',
    features: [
      { icon: Eye, text: 'Real-time visibility into vehicle status and active bookings' },
      { icon: Star, text: 'Identify top performers for smarter acquisition decisions' },
      { icon: Brain, text: 'AI-powered predictions based on location and seasonal trends' }
    ],
    testimonial: {
      quote: "Finally, a platform that understands the exotic rental business. Absolutely essential.",
      author: 'Emma Thompson',
      role: 'Operations Manager, Premium Auto Collective'
    }
  },
  {
    id: 'book',
    name: 'Book',
    tagline: 'Direct Booking Platform',
    icon: Globe,
    color: 'primary',
    metricHeadline: '100% Revenue Retention',
    metricSubline: 'vs 65-75% on Platforms',
    screenshot: '/images/app-screenshots/booking-mobile.svg',
    screenshotAlt: 'Book module showing direct booking interface',
    features: [
      { icon: Globe, text: 'Custom-branded booking platform captures 100% revenue' },
      { icon: DollarSign, text: 'Eliminate 25-35% platform fees with direct bookings' },
      { icon: TrendingUp, text: 'Built-in SEO tools drive organic traffic to your site' }
    ],
    testimonial: {
      quote: "Exotiq transformed our operations. We increased profits by 40% in just 3 months.",
      author: 'Sarah Chen',
      role: 'Fleet Owner, Luxury Drives Miami'
    }
  },
  {
    id: 'vault',
    name: 'Vault',
    tagline: 'Compliance & Documentation',
    icon: Shield,
    color: 'accent',
    metricHeadline: 'Zero Compliance Issues',
    metricSubline: 'Automated Protection',
    screenshot: '/images/app-screenshots/crm-macbook.svg',
    screenshotAlt: 'Vault compliance dashboard showing document management',
    features: [
      { icon: Shield, text: 'Automated insurance tracking and renewal reminders' },
      { icon: FileText, text: 'Digital document storage with instant retrieval' },
      { icon: CheckCircle, text: 'Compliance checklists ensure nothing falls through' }
    ],
    testimonial: {
      quote: "The AI insights are game-changing. It's like having a business consultant available 24/7.",
      author: 'Marcus Rodriguez',
      role: 'Rental Entrepreneur, Elite Car Share'
    }
  },
  {
    id: 'core',
    name: 'Core',
    tagline: 'Operations Hub',
    icon: Zap,
    color: 'accent',
    metricHeadline: '15+ Hours Saved',
    metricSubline: 'Every Single Week',
    screenshot: '/images/app-screenshots/crm-macbook.svg',
    screenshotAlt: 'Core operations hub showing unified dashboard',
    features: [
      { icon: MessageSquare, text: 'Unified inbox manages all guest communication' },
      { icon: Calendar, text: 'Visual fleet calendar across all vehicles and platforms' },
      { icon: Zap, text: 'Automated workflows handle check-ins and follow-ups' }
    ],
    testimonial: {
      quote: "The AI insights are game-changing. It's like having a business consultant available 24/7.",
      author: 'Marcus Rodriguez',
      role: 'Rental Entrepreneur, Elite Car Share'
    }
  }
];

// Color class mappings
const colorClasses = {
  primary: {
    bg: 'bg-primary-500',
    bgLight: 'bg-primary-100 dark:bg-primary-900/30',
    text: 'text-primary-500 dark:text-primary-400',
    border: 'border-primary-500/30',
    iconBg: 'bg-primary-500/10',
    iconText: 'text-primary-500',
  },
  accent: {
    bg: 'bg-accent-600',
    bgLight: 'bg-accent-100 dark:bg-accent-900/30',
    text: 'text-accent-600 dark:text-accent-400',
    border: 'border-accent-500/30',
    iconBg: 'bg-accent-600/10',
    iconText: 'text-accent-600',
  },
  success: {
    bg: 'bg-success-600',
    bgLight: 'bg-success-100 dark:bg-success-900/30',
    text: 'text-success-600 dark:text-success-400',
    border: 'border-success-500/30',
    iconBg: 'bg-success-600/10',
    iconText: 'text-success-600',
  },
};

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('motoriq');
  const [contentVisible, setContentVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const activeModule = modules.find(m => m.id === activeTab) || modules[0];
  const activeColorClasses = colorClasses[activeModule.color as keyof typeof colorClasses] || colorClasses.primary;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Trigger content animation when tab changes
  useEffect(() => {
    setContentVisible(false);
    const timer = setTimeout(() => setContentVisible(true), 150);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleTabClick = (moduleId: string) => {
    setActiveTab(moduleId);
    
    // Smooth scroll to content
    if (contentRef.current) {
      setTimeout(() => {
        const headerOffset = 100;
        const elementPosition = contentRef.current!.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <div className="pt-16">
      <SEOHead
        title="Platform Features - Complete Fleet Management Solution"
        description="Discover Exotiq.ai's powerful modules: MotorIQ for revenue optimization, FleetCopilot for AI automation, Pulse for analytics, Book for direct bookings, and Core for operations. Built specifically for exotic fleet operators."
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
      
      {/* Hero Section - Proof-Driven */}
      <FeaturesHero />

      {/* Module Navigation & Content Section - Bombon-Inspired */}
      <MobileSection className="bg-white dark:bg-dark-900 py-16 lg:py-20">
        <div id="platform-features">
          <MobileContainer>
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-300 font-semibold text-sm mb-4">
                <Brain className="w-4 h-4 mr-2" />
                The Exotiq Platform
              </div>
              <h2 className="font-dfaalt font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
                Five Powerful Modules.
                <span className="block text-primary-500 dark:text-primary-400">One Complete Platform.</span>
              </h2>
              <p className="font-inter text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Each module addresses a critical operational challenge. Together, they transform complexity into automated profitability.
              </p>
            </div>
            
            {/* Bombon-Inspired Module Grid - No Sticky Tabs */}
            <div className="max-w-6xl mx-auto">
              {/* Module Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-10 sm:mb-12">
                {modules.map((module) => {
                  const Icon = module.icon;
                  const moduleColorClasses = colorClasses[module.color as keyof typeof colorClasses] || colorClasses.primary;
                  const isActive = activeTab === module.id;
                  
                  return (
                    <button
                      key={module.id}
                      onClick={() => handleTabClick(module.id)}
                      className={`group relative flex flex-col items-center p-4 sm:p-5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                        isActive
                          ? `${moduleColorClasses.bg} text-white shadow-xl`
                          : 'bg-gray-50 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700 hover:shadow-lg'
                      }`}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg" />
                      )}
                      
                      {/* Icon */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                        isActive 
                          ? 'bg-white/20' 
                          : moduleColorClasses.iconBg
                      }`}>
                        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110 ${
                          isActive ? 'text-white' : moduleColorClasses.iconText
                        }`} />
                      </div>
                      
                      {/* Name */}
                      <span className={`font-dfaalt font-bold text-sm sm:text-base mb-1 ${
                        isActive ? 'text-white' : 'text-gray-900 dark:text-white'
                      }`}>
                        {module.name}
                      </span>
                      
                      {/* Tagline */}
                      <span className={`font-inter text-xs text-center leading-tight ${
                        isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {module.tagline}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              {/* Tab Content - Full Feature Card */}
              <Card 
                ref={contentRef}
                variant="elevated" 
                padding="lg" 
                hover
                className={`shadow-2xl hover:shadow-3xl transition-all duration-500 ${contentVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
              >
                {/* Module Header with Icon */}
                <div className="flex items-center gap-4 pb-6 mb-6 border-b border-gray-200 dark:border-dark-700">
                  <div className={`w-14 h-14 ${activeColorClasses.bgLight} rounded-xl flex items-center justify-center`}>
                    <activeModule.icon className={`w-7 h-7 ${activeColorClasses.text}`} />
                  </div>
                  <div>
                    <h3 className="font-dfaalt font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">
                      {activeModule.name}
                    </h3>
                    <p className="font-inter text-gray-600 dark:text-gray-400">{activeModule.tagline}</p>
                  </div>
                </div>
                
                {/* Big Metric Headline */}
                <div className={`text-center py-6 mb-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-800 dark:to-dark-700 rounded-xl transition-all duration-500 ${contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '100ms' }}>
                  <div className={`text-4xl sm:text-5xl lg:text-6xl font-dfaalt font-bold ${activeColorClasses.text} mb-2`}>
                    {activeModule.metricHeadline}
                  </div>
                  <div className="font-inter text-lg text-gray-600 dark:text-gray-400">
                    {activeModule.metricSubline}
                  </div>
                </div>
                
                {/* Screenshot + Features Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8">
                  {/* Screenshot - Large & Prominent */}
                  <div 
                    className={`relative transition-all duration-500 ${contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    style={{ transitionDelay: '200ms' }}
                  >
                    <div className="relative group">
                      <div className="absolute -inset-6 bg-gradient-to-r from-primary-500/10 to-primary-600/10 dark:from-primary-500/15 dark:to-primary-600/15 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={activeModule.screenshot}
                        alt={activeModule.screenshotAlt}
                        className="w-full h-auto relative z-10 rounded-lg drop-shadow-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:drop-shadow-2xl"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* 3 Power Features */}
                  <div className="space-y-4">
                    {activeModule.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div 
                          key={index} 
                          className={`flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-dark-800 border border-gray-100 dark:border-dark-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                          style={{ transitionDelay: `${300 + index * 100}ms` }}
                        >
                          <div className={`w-12 h-12 ${activeColorClasses.bgLight} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <FeatureIcon className={`w-6 h-6 ${activeColorClasses.text}`} />
                          </div>
                          <p className="font-inter text-gray-700 dark:text-gray-300 leading-relaxed pt-2">
                            {feature.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Testimonial Proof Element */}
                <div 
                  className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-800 dark:to-dark-700 p-6 rounded-xl border-l-4 ${activeColorClasses.border} transition-all duration-500 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: '600ms' }}
                >
                  <p className="font-inter text-lg text-gray-700 dark:text-gray-300 italic mb-4">
                    "{activeModule.testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500/10 dark:bg-primary-500/20 rounded-full flex items-center justify-center">
                      <span className="font-dfaalt font-bold text-primary-500 text-sm">
                        {activeModule.testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-dfaalt font-semibold text-gray-900 dark:text-white">
                        {activeModule.testimonial.author}
                      </div>
                      <div className="font-inter text-sm text-gray-500 dark:text-gray-400">
                        {activeModule.testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </MobileContainer>
        </div>
      </MobileSection>

      {/* Social Proof Section - 3 Testimonials */}
      <TestimonialsSection />

      {/* Demo Section */}
      <DemoSection />

      {/* Final CTA Section */}
      <FinalCTASection />
    </div>
  );
}

// Testimonials Section Component
const TestimonialsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  const testimonials = [
    {
      quote: "Exotiq transformed our operations. We increased profits by 40% in just 3 months.",
      author: 'Sarah Chen',
      initials: 'SC',
      role: 'Fleet Owner',
      company: 'Luxury Drives Miami'
    },
    {
      quote: "The AI insights are game-changing. It's like having a business consultant available 24/7.",
      author: 'Marcus Rodriguez',
      initials: 'MR',
      role: 'Rental Entrepreneur',
      company: 'Elite Car Share'
    },
    {
      quote: "Finally, a platform that understands the exotic rental business. Absolutely essential.",
      author: 'Emma Thompson',
      initials: 'ET',
      role: 'Operations Manager',
      company: 'Premium Auto Collective'
    }
  ];

  return (
    <MobileSection ref={ref} className="bg-gray-50 dark:bg-dark-800 py-16 lg:py-20">
      <MobileContainer>
        <div className="text-center mb-12">
          <h2 
            className={`font-dfaalt font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            What Operators Are Saying
          </h2>
          <p 
            className={`font-inter text-lg text-gray-600 dark:text-gray-400 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            Real results from real fleet operators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={`relative bg-white dark:bg-dark-900 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-dark-700 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="font-inter text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-full flex items-center justify-center">
                  <span className="font-dfaalt font-bold text-primary-500">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <div className="font-dfaalt font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="font-inter text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

// Demo Section Component
const DemoSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  return (
    <MobileSection ref={ref} className="bg-white dark:bg-dark-900 py-16 lg:py-20">
      <MobileContainer>
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className={`font-dfaalt font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            See Exotiq in Action
          </h2>
          <p 
            className={`font-inter text-lg text-gray-600 dark:text-gray-400 mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            Experience the power of our integrated platform
          </p>

          {/* Video Placeholder */}
          <div 
            className={`bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-800 dark:to-dark-700 rounded-2xl p-12 lg:p-16 mb-10 border-2 border-dashed border-gray-300 dark:border-dark-600 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary-500/10 dark:bg-primary-500/20 rounded-full flex items-center justify-center mb-6">
                <Play className="w-10 h-10 text-primary-500" />
              </div>
              <p className="font-inter text-gray-500 dark:text-gray-400 text-lg">
                Demo video coming soon
              </p>
            </div>
          </div>

          {/* CTA Below Video */}
          <p 
            className={`font-inter text-lg text-gray-700 dark:text-gray-300 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '300ms' }}
          >
            Ready to transform your operations?
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <a
              href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 font-dfaalt font-semibold text-base px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Your Demo Call</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/fleetcopilot"
              className="inline-flex items-center justify-center gap-2 font-dfaalt font-semibold text-base px-8 py-4 border-2 border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500 rounded-xl transition-all duration-300"
            >
              <Bot className="w-5 h-5" />
              <span>Or explore FleetCopilot</span>
            </Link>
          </div>
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

// Final CTA Section Component
const FinalCTASection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  return (
    <MobileSection ref={ref} className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-20 lg:py-24">
      <MobileContainer>
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            className={`font-dfaalt font-bold text-4xl sm:text-5xl text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Ready to Scale Your Exotic Fleet?
          </h2>
          <p 
            className={`font-inter text-xl text-gray-300 mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            Join 20+ operators already growing with Exotiq
          </p>

          {/* Single Large CTA */}
          <div 
            className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <a
              href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 font-dfaalt font-semibold text-lg px-10 py-5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/30"
            >
              <Calendar className="w-6 h-6" />
              <span>Book Your 15-Minute Demo</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Trust Badges */}
          <div 
            className={`flex flex-wrap justify-center gap-6 text-gray-400 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="font-inter text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="font-inter text-sm">15-minute consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              <span className="font-inter text-sm">Custom setup included</span>
            </div>
          </div>
        </div>
      </MobileContainer>
    </MobileSection>
  );
};
