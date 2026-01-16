import React, { useEffect } from 'react';
import { ArrowRight, Calendar, Cpu, Users, CheckCircle, Crown, Gem, Shield, Zap, AlertTriangle, Sparkles, Layers, Heart } from 'lucide-react';
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

      {/* Why We're Different - 3 Cards (moved up) */}
      <WhyDifferentSection />

      {/* The Problem / What We Built - Redesigned */}
      <ProblemSolutionSection />

      {/* Gratitude Section */}
      <GratitudeSection />

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
            
            <h1 className="font-dfaalt font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-8 leading-[1.1]">
              Built in the Trenches,{' '}
              <span className="text-primary-400">Not the Boardroom</span>
            </h1>

            {/* Origin Quote - Tighter, Punchier */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <p className="font-inter text-gray-300 italic leading-relaxed text-lg">
                "We built Exotiq because we lived the chaos. Every feature exists because we felt the pain first.
              </p>
              <p className="font-inter text-gray-300 italic leading-relaxed text-lg mt-3">
                Steve Jobs was right — start with the customer experience and work backward. That's not a philosophy here. <span className="text-white font-medium">It's how we ship.</span>"
              </p>
              <p className="font-dfaalt font-semibold text-white mt-4 text-sm">
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
                  Real fleets. Real problems. Real solutions.
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
            className={`inline-flex items-center px-4 py-2 bg-amber-500/20 rounded-full text-amber-400 font-semibold text-sm mb-6 border border-amber-500/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Crown className="w-4 h-4 mr-2" />
            Our Mission
          </div>
          
          <h2 
            className={`font-dfaalt font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            Make running an exotic fleet as{' '}
            <span className="text-primary-400">refined</span> as driving one.
          </h2>
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

// Problem / Solution Section Component
const ProblemSolutionSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  const industryProblems = [
    {
      icon: Layers,
      title: 'Frankenstack',
      description: 'Software duct-taped together that breaks when you need it most'
    },
    {
      icon: Users,
      title: 'Built for Enterprise, Not You',
      description: 'Tools designed for 10,000 sedans. Not 10-150 exotics.'
    },
    {
      icon: Cpu,
      title: 'AI Theater',
      description: 'Marketing buzzwords, not actual intelligence running your ops'
    }
  ];

  const whatWeBuilt = [
    {
      icon: Gem,
      title: 'Exotic-Native',
      description: 'Pricing that knows a McLaren isn\'t a Mustang'
    },
    {
      icon: Zap,
      title: 'Intelligence at the Core',
      description: 'Not bolted on. Born this way.'
    },
    {
      icon: Shield,
      title: 'Battle-Tested',
      description: 'Every feature earned its place in the product'
    }
  ];

  return (
    <MobileSection ref={ref} className="bg-dark-900 py-16 lg:py-20">
      <MobileContainer>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className={`font-dfaalt font-bold text-3xl sm:text-4xl text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            The Story Behind Exotiq
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* The Problem */}
          <div 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="font-dfaalt font-bold text-2xl text-white">
                The Industry Problem
              </h3>
            </div>
            
            <p className="font-inter text-gray-400 mb-6 leading-relaxed">
              Exotic fleet operators have been stuck with bad options:
            </p>

            <div className="space-y-4">
              {industryProblems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <div 
                    key={problem.title}
                    className={`flex items-start gap-4 p-4 bg-dark-800/50 rounded-xl border border-dark-700 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-dfaalt font-semibold text-white mb-1">{problem.title}</h4>
                      <p className="font-inter text-gray-400 text-sm leading-relaxed">{problem.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="font-inter text-gray-500 mt-6 text-sm italic">
              Nothing purpose-built for operators managing 10-150+ high-value vehicles who refuse to compromise on service.
            </p>
          </div>

          {/* What We Built */}
          <div 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center border border-primary-500/20">
                <Sparkles className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="font-dfaalt font-bold text-2xl text-white">
                What We Built
              </h3>
            </div>
            
            <p className="font-inter text-gray-400 mb-6 leading-relaxed">
              A platform built for operators who run fleets, not spreadsheets:
            </p>

            <div className="space-y-4">
              {whatWeBuilt.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.title}
                    className={`flex items-start gap-4 p-4 bg-primary-500/5 rounded-xl border border-primary-500/20 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                    style={{ transitionDelay: `${350 + index * 100}ms` }}
                  >
                    <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-dfaalt font-semibold text-white mb-1">{item.title}</h4>
                      <p className="font-inter text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-xl border border-primary-500/20">
              <p className="font-inter text-primary-300 text-sm font-medium">
                Architected by SaaS engineers. Shaped by AI specialists. <span className="text-white">Demanded by a founder who ran fleets on tools that weren't built for the job.</span>
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
      title: 'Operator DNA',
      description: 'Not built by developers guessing. Built by someone who knows what 5-star service actually costs.',
      color: 'amber',
      gradient: 'from-amber-500/20 to-amber-600/5'
    },
    {
      icon: Cpu,
      title: 'AI That Ships',
      description: 'Every intelligence layer solves problems we\'ve lived. Not a checkbox. The engine.',
      color: 'primary',
      gradient: 'from-primary-500/20 to-primary-600/5'
    },
    {
      icon: Shield,
      title: 'Zero Commission',
      description: 'We don\'t take a cut of your bookings. You keep 100%. Your growth is our growth.',
      color: 'emerald',
      gradient: 'from-emerald-500/20 to-emerald-600/5'
    }
  ];

  const colorClasses = {
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    primary: 'bg-primary-500/10 text-primary-400 border-primary-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  };

  return (
    <MobileSection ref={ref} className="bg-dark-800 py-14 lg:py-16">
      <MobileContainer>
        <div className="text-center mb-10">
          <h2 
            className={`font-dfaalt font-bold text-3xl sm:text-4xl text-white mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Why We're Different
          </h2>
          <p 
            className={`font-inter text-lg text-gray-400 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
                className={`relative bg-dark-900 rounded-2xl p-6 border border-dark-700 hover:border-dark-600 transition-all duration-500 hover:-translate-y-1 group overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                {/* Subtle gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-dfaalt font-bold text-lg text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-inter text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

// Gratitude Section Component
const GratitudeSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  return (
    <MobileSection ref={ref} className="bg-dark-800 py-12 lg:py-16">
      <MobileContainer>
        <div 
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-500/10 rounded-full mb-6 border border-rose-500/20">
            <Heart className="w-6 h-6 text-rose-400" />
          </div>
          
          <p className="font-inter text-xl sm:text-2xl text-gray-300 leading-relaxed italic">
            "To every operator juggling spreadsheets at midnight, chasing down renters, and wondering if there's a better way —
          </p>
          <p className="font-dfaalt font-bold text-2xl sm:text-3xl text-white mt-4">
            there is. We built it for you."
          </p>
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
            Let's Talk Fleet
          </h2>
          <p 
            className={`font-inter text-lg text-gray-400 mb-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            Gregory Ringler · Founder & CEO
          </p>
          <p 
            className={`font-inter text-xl text-gray-300 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '150ms' }}
          >
            15 minutes. No pitch. Just two operators talking shop.
          </p>

          <div 
            className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <a
              href="https://calendly.com/hello-exotiq/15-minute-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 font-dfaalt font-semibold text-lg px-10 py-5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/30"
            >
              <Calendar className="w-6 h-6" />
              <span>Book a Call</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Trust indicators - Better Desktop Alignment */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-gray-400 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span className="font-inter text-sm">No sales pitch</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full" />
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span className="font-inter text-sm">15 minutes</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full" />
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
              <span className="font-inter text-sm">Operator to operator</span>
            </div>
          </div>
        </div>
      </MobileContainer>
    </MobileSection>
  );
}
