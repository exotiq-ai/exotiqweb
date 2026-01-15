import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar,
  Sparkles,
  Award,
  DollarSign,
  Zap
} from 'lucide-react';
import SkeletonLoader from '../components/SkeletonLoader';
import { MobileContainer, MobileSection } from '../components/MobileOptimizations';
import SEOHead from '../components/SEOHead';
import { organizationSchema, softwareApplicationSchema, faqSchema } from '../data/structuredData';

// Import section components
import HomeHeroSection from '../components/HomeHeroSection';
import FleetCopilotSection from '../components/FleetCopilotSection';
import ExoticFleetsSection from '../components/ExoticFleetsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PlatformModulesSection from '../components/PlatformModulesSection';
import StickyCTABar from '../components/StickyCTABar';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="pt-16">
        {/* Hero Skeleton */}
        <section className="min-h-screen flex items-center justify-center bg-dark-900">
          <MobileContainer>
            <div className="text-center">
              <SkeletonLoader className="h-8 w-64 mx-auto mb-6" />
              <SkeletonLoader className="h-16 w-full max-w-4xl mx-auto mb-4" />
              <SkeletonLoader className="h-6 w-96 mx-auto mb-8" />
              <div className="flex justify-center space-x-4">
                <SkeletonLoader className="h-12 w-40" />
                <SkeletonLoader className="h-12 w-32" />
              </div>
            </div>
          </MobileContainer>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <SEOHead
        title="Exotiq.ai - AI-Powered Fleet Management for Exotic Car Rental Operations"
        description="Exotiq.ai: AI-powered fleet management for exotic car rental operators. Automate pricing, maintenance, and guest messaging. Trusted by operators managing $120M+ in fleet assets."
        keywords="exotic car fleet management, luxury rental software, AI pricing optimization, Turo host tools, fleet analytics, rental business automation, exotic car rental platform"
        url="https://exotiq.ai"
        image="https://exotiq.ai/og-image.jpg"
        structuredData={[organizationSchema, softwareApplicationSchema, faqSchema]}
      />
      
      {/* 1. Hero Section - Dark gradient with dashboard screenshot */}
      <HomeHeroSection isVisible={isVisible} />

      {/* 2. FleetCopilot™ AI Section - Product differentiator */}
      <FleetCopilotSection />

      {/* 3. Built for Exotic Fleets - McLaren imagery section */}
      <ExoticFleetsSection />

      {/* 4. Platform Modules Section - Bombon-style scroll reveal cards */}
      <PlatformModulesSection />

      {/* 5. ROI Calculator CTA Section - Moved lower */}
      <MobileSection className="py-12 sm:py-14 bg-gradient-to-b from-dark-900 to-dark-black">
        <MobileContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-dfaalt font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6">
              See How Much You Could Save
            </h2>
            <p className="font-inter text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Use our interactive ROI calculator to see your potential revenue increase and payback period
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link 
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-dfaalt font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-primary-500/25"
              >
                <DollarSign className="w-5 h-5" />
                Calculate Your ROI
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://calendly.com/hello-exotiq/15-minute-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 px-8 py-4 rounded-xl font-dfaalt font-semibold text-lg transition-all duration-300"
              >
                <Calendar className="w-5 h-5" />
                Book a Demo
              </a>
            </div>
            <p className="font-inter text-sm text-gray-500 mt-6">
              14-day free trial • No credit card required • See results in 48 hours
            </p>
          </div>
        </MobileContainer>
      </MobileSection>

      {/* 6. Testimonials Section - Clean 4-card grid */}
      <TestimonialsSection />

      {/* 7. Founder's Circle Section */}
      <MobileSection className="relative bg-white dark:bg-dark-900 overflow-hidden py-12 lg:py-14">
        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"></div>
        
        <MobileContainer>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-accent-100 dark:bg-accent-500/20 rounded-full text-accent-700 dark:text-accent-400 font-semibold text-sm mb-6 border border-accent-200 dark:border-accent-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Exclusive Founder Opportunity
            </div>
            
            <h2 className="font-dfaalt font-bold text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-6">
              Join the Founder's Circle
            </h2>
            
            <p className="font-inter text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              An exclusive opportunity for industry leaders to shape the next generation of fleet technology.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  $25 Gift Card
                </h3>
                <p className="font-inter text-sm text-gray-600 dark:text-gray-400">
                  For qualified operators
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl">
                <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  Priority Beta Access
                </h3>
                <p className="font-inter text-sm text-gray-600 dark:text-gray-400">
                  First access to the platform
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl">
                <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-accent-500" />
                </div>
                <h3 className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-2">
                  Lifetime Founder Pricing
                </h3>
                <p className="font-inter text-sm text-gray-600 dark:text-gray-400">
                  Exclusive founding member rates
                </p>
              </div>
            </div>
            
            <Link
              to="/survey"
              className="inline-flex items-center font-dfaalt font-semibold px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-xl transition-all duration-300 hover:scale-105"
            >
              <span>Join the Founder's Circle</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </MobileContainer>
      </MobileSection>

      {/* 8. Final CTA Section */}
      <MobileSection className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-12 lg:py-14">
        <MobileContainer>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-dfaalt font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
              Ready to Transform Your Fleet?
            </h2>
            <p className="font-inter text-xl mb-8 text-white/90 leading-relaxed">
              Join the growing community of operators who are scaling smarter with Exotiq.
            </p>
            <a
              href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-dfaalt font-semibold px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              <span>Book a 15-Min Call</span>
            </a>
            <p className="font-inter text-sm text-white/70 mt-6">
              No commitment required. Let's explore if Exotiq is right for you.
            </p>
          </div>
        </MobileContainer>
      </MobileSection>

      {/* Sticky CTA Bar - Mobile Only */}
      <StickyCTABar />
    </div>
  );
}
