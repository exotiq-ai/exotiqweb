import React, { useEffect } from 'react';
import { ArrowRight, Calendar, Target, Cpu, Users, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { organizationSchema, breadcrumbSchema } from '../data/structuredData';
import { MobileSection, MobileContainer } from '../components/MobileOptimizations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function AboutPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16">
      <SEOHead
        title="About Exotiq.ai - Built by Fleet Operators, for Fleet Operators"
        description="We built Exotiq because we lived the chaos ourselves. Every feature is built from real operational pain. Every automation targets hours we've personally lost."
        keywords="Exotiq.ai team, fleet management company, exotic car rental software, automotive SaaS startup, vehicle rental industry, fleet operations experts"
        url="https://exotiq.ai/about"
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: "Home", url: "https://exotiq.ai" },
            { name: "About", url: "https://exotiq.ai/about" }
          ])
        ]}
      />
      
      {/* Hero Section - Tight & Impactful */}
      <HeroSection />

      {/* Mission Statement - Bold & Clear */}
      <MissionSection />

      {/* The Problem / What We Built - Two Column */}
      <ProblemSolutionSection />

      {/* Why We're Different - 3 Cards */}
      <WhyDifferentSection />

      {/* Founder CTA Section */}
      <FounderCTASection />
    </div>
  );
}

// Hero Section Component
const HeroSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  return (
    <MobileSection ref={ref} className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-16 lg:py-20 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 70% 50%, rgba(110, 193, 228, 0.2) 0%, transparent 60%)'
          }}
        />
      </div>

      <MobileContainer>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Copy */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 rounded-full text-primary-400 font-semibold text-sm mb-6 border border-primary-500/30">
              <span>Our Story</span>
            </div>
            
            <h1 className="font-dfaalt font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]">
              We've Been in Your{' '}
              <span className="text-primary-400">Driver's Seat</span>
            </h1>
            
            <p className="font-inter text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed max-w-xl">
              Exotiq exists because the tools exotic fleet operators actually need didn't exist in one place. So we built them.
            </p>

            {/* Origin Quote */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 mb-6">
              <p className="font-inter text-gray-300 italic leading-relaxed">
                "We built Exotiq because we lived the chaos ourselves. Every feature is built from real operational pain. Every automation targets hours we've personally lost."
              </p>
              <p className="font-dfaalt font-semibold text-white mt-3 text-sm">
                — Gregory Ringler, Founder & CEO
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div 
            className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            {/* Glow effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-primary-500/20 to-primary-400/10 rounded-3xl blur-2xl" />
            
            <div className="relative">
              <img
                src="/images/about/gregory-s8-desktop.jpg"
                alt="Gregory Ringler, Founder of Exotiq.ai"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl p-4">
                <p className="font-inter text-white text-sm font-medium">
                  Managing real fleets. Building real solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

// Mission Section Component
const MissionSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  return (
    <MobileSection ref={ref} className="bg-dark-black py-12 lg:py-14">
      <MobileContainer>
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`inline-flex items-center px-4 py-2 bg-accent-500/20 rounded-full text-accent-400 font-semibold text-sm mb-6 border border-accent-500/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Target className="w-4 h-4 mr-2" />
            Our Mission
          </div>
          
          <h2 
            className={`font-dfaalt font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-6 leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            Help exotic fleet operators make more money, waste less time, and stop handing their customers to platforms that don't give a damn about their success.
          </h2>
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

// Problem / Solution Section Component
const ProblemSolutionSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  return (
    <MobileSection ref={ref} className="bg-white dark:bg-dark-900 py-14 lg:py-16">
      <MobileContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* The Problem */}
          <div 
            className={`bg-gray-50 dark:bg-dark-800 rounded-2xl p-6 lg:p-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                <span className="text-red-500 font-bold text-lg">!</span>
              </div>
              <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white">
                The Industry Problem
              </h3>
            </div>
            
            <div className="space-y-4 font-inter text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Exotic car rental operators have been stuck between two bad options: a patchwork of siloed tools duct-taped together, or enterprise fleet software engineered for companies running 10,000 economy sedans.
              </p>
              <p>
                Nothing purpose-built for operators managing 5-150 high-value vehicles with the service standards and operational complexity that exotic fleets demand.
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                And the AI? Either nonexistent or bolted on as a marketing checkbox. Not architected from the ground up to actually run your business.
              </p>
            </div>
          </div>

          {/* What We Built */}
          <div 
            className={`bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 lg:p-8 border border-primary-200 dark:border-primary-500/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary-500" />
              </div>
              <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white">
                What We Built
              </h3>
            </div>
            
            <div className="space-y-4 font-inter text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Exotiq is a multi-model AI platform built specifically for the exotic and luxury rental niche. Dynamic pricing that understands a McLaren isn't a Mustang. Predictive maintenance calibrated for vehicles worth more than most houses.
              </p>
              <p>
                Operational intelligence designed by a team of SaaS architects, AI engineers, and a founder who spent years running luxury hospitality and exotic fleets on tools that were never built for the job.
              </p>
              <p className="font-semibold text-primary-600 dark:text-primary-400">
                We didn't bolt AI onto legacy software. We built the platform AI-first because that's the only way it actually works.
              </p>
            </div>
          </div>
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

// Why Different Section Component
const WhyDifferentSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  const differentiators = [
    {
      icon: Users,
      title: 'Built by Operators',
      description: 'This isn\'t software built by developers guessing what hosts need. It\'s built by someone who knows what five-star service looks like.',
      color: 'primary'
    },
    {
      icon: Cpu,
      title: 'AI-First Architecture',
      description: 'Every intelligence layer solves problems we\'ve actually faced. Not AI as a checkbox - AI as the foundation.',
      color: 'accent'
    },
    {
      icon: Target,
      title: 'Operator-Aligned',
      description: 'We don\'t take booking commissions. You keep 100% of your revenue. Your success is our success.',
      color: 'success'
    }
  ];

  const colorClasses = {
    primary: 'bg-primary-500/10 text-primary-500 border-primary-500/30',
    accent: 'bg-accent-500/10 text-accent-500 border-accent-500/30',
    success: 'bg-success-500/10 text-success-500 border-success-500/30'
  };

  return (
    <MobileSection ref={ref} className="bg-gray-50 dark:bg-dark-800 py-14 lg:py-16">
      <MobileContainer>
        <div className="text-center mb-10">
          <h2 
            className={`font-dfaalt font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Why We're Different
          </h2>
          <p 
            className={`font-inter text-lg text-gray-600 dark:text-gray-400 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            Three principles that guide everything we build
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`bg-white dark:bg-dark-900 rounded-2xl p-6 border border-gray-100 dark:border-dark-700 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-dfaalt font-bold text-lg text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="font-inter text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

// Founder CTA Section Component
const FounderCTASection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  return (
    <MobileSection ref={ref} className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-16 lg:py-20">
      <MobileContainer>
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            className={`font-dfaalt font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Book a Call with Gregory Ringler
          </h2>
          <p 
            className={`font-inter text-lg text-gray-400 mb-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            Founder & CEO, Exotiq
          </p>
          <p 
            className={`font-inter text-xl text-gray-300 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '150ms' }}
          >
            Let's talk about your fleet and see if Exotiq is right for you.
          </p>

          <div 
            className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <a
              href="https://calendly.com/hello-exotiq/15-minute-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 font-dfaalt font-semibold text-lg px-10 py-5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/30"
            >
              <Calendar className="w-6 h-6" />
              <span>Schedule a Conversation</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Trust indicators */}
          <div 
            className={`flex flex-wrap justify-center gap-4 text-gray-400 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500" />
              <span className="font-inter text-sm">No sales pitch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500" />
              <span className="font-inter text-sm">15 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500" />
              <span className="font-inter text-sm">Operator to operator</span>
            </div>
          </div>
        </div>
      </MobileContainer>
    </MobileSection>
  );
}
