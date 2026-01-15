import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { MobileContainer } from './MobileOptimizations';

interface HomeHeroSectionProps {
  isVisible: boolean;
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({ isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Bombon-style animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const trustIndicatorVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.8 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"
      data-hero-section
      aria-label="Hero section"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Primary gradient mesh */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(110, 193, 228, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(110, 193, 228, 0.2) 0%, transparent 50%)
            `
          }}
        />

        {/* Subtle animated gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background: 'linear-gradient(135deg, rgba(110, 193, 228, 0.2) 0%, transparent 40%, rgba(241, 90, 41, 0.1) 100%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Grid pattern overlay for depth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pt-8 pb-16 lg:pt-0 lg:pb-0">
        <MobileContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left Column - Copy */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="text-center lg:text-left lg:pr-8 xl:pr-12"
            >
              {/* Trust Badge - Animated */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 mb-6 border border-white/20"
              >
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Trusted by operators managing $120M+ in fleet assets
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-dfaalt font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] tracking-tight"
              >
                Exotic Fleet Operations on{' '}
                <span className="text-primary-400">Autopilot</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="font-inter text-lg sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                AI-powered platform that automates pricing, guest messaging, and maintenance so you can scale without the chaos.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Link
                    to="/features"
                    className="group inline-flex items-center justify-center font-dfaalt font-semibold text-base px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/30"
                  >
                    <span>Explore the Platform</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <a
                    href="https://calendly.com/hello-exotiq/15-minute-meeting?back=1&month=2025-07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-dfaalt font-semibold text-base px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:border-white/40 rounded-xl transition-all duration-300"
                  >
                    Book a Demo
                  </a>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-400"
              >
                {[
                  { text: 'No commitment', delay: 0 },
                  { text: '14-day free trial', delay: 1 },
                  { text: 'Cancel anytime', delay: 2 }
                ].map((item, i) => (
                  <motion.span
                    key={item.text}
                    custom={i}
                    variants={trustIndicatorVariants}
                    className="flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-1.5 text-green-400" />
                    {item.text}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Dashboard Screenshot */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="relative"
            >
              {/* Glow effect behind the dashboard */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute -inset-8 lg:-inset-16 bg-gradient-to-r from-primary-500/25 via-primary-400/15 to-primary-500/25 rounded-3xl blur-3xl"
                aria-hidden="true"
              />

              {/* Dashboard Image Container - LARGER & MORE PROMINENT */}
              <motion.div
                animate={floatAnimation}
                className="relative lg:scale-110 lg:translate-x-4 xl:scale-115 xl:translate-x-8"
              >
                {/* Main Dashboard - MacBook - PROMINENT */}
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  src="/images/app-screenshots/hero-dashboard-macbook.svg"
                  alt="Exotiq MotorIQ Dashboard showing dynamic pricing optimization and fleet utilization analytics"
                  className="w-full h-auto relative z-10 drop-shadow-2xl"
                  onLoad={() => setImageLoaded(true)}
                  loading="eager"
                />

                {/* Loading placeholder */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-dark-700 rounded-2xl animate-pulse" />
                )}
              </motion.div>
            </motion.div>
          </div>
        </MobileContainer>
      </div>

      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};

export default HomeHeroSection;
