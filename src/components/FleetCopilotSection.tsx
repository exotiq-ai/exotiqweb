import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, MessageSquare, Wrench, ArrowRight } from 'lucide-react';
import { MobileSection, MobileContainer } from './MobileOptimizations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FleetCopilotSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, once: true });

  const features = [
    {
      icon: TrendingUp,
      title: 'Revenue Optimization',
      description: 'AI analyzes competitors and demand to maximize your daily rates automatically.'
    },
    {
      icon: MessageSquare,
      title: 'Guest Automation',
      description: 'Handle 3x more bookings with automated inquiries, check-ins, and VIP escalations.'
    },
    {
      icon: Wrench,
      title: 'Predictive Maintenance',
      description: 'Get alerts before breakdowns happen. Schedule service during booking gaps.'
    }
  ];

  // Bombon-style animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  };

  const floatAnimation = {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <MobileSection ref={ref} className="bg-white dark:bg-dark-900 py-14 lg:py-16">
      <MobileContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column - Copy */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 bg-primary-500/10 dark:bg-primary-500/20 rounded-full text-primary-600 dark:text-primary-400 font-semibold text-sm mb-4 border border-primary-500/20 dark:border-primary-500/30"
            >
              <Brain className="w-4 h-4 mr-2" />
              Meet FleetCopilot™ AI
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={itemVariants}
              className="font-dfaalt font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4 leading-tight"
            >
              Your AI Operations Partner
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="font-inter text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
            >
              FleetCopilot delivers the strategic capacity of a dedicated analyst, ops manager, 
              and guest coordinator, without expanding your team.
            </motion.p>

            {/* Feature List */}
            <div className="space-y-5 mb-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  custom={index}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={featureVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex-shrink-0 w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-xl flex items-center justify-center"
                  >
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </motion.div>
                  <div>
                    <h3 className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-inter text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/fleetcopilot"
                className="inline-flex items-center gap-3 font-dfaalt font-semibold text-base px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30 group"
              >
                <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Talk to Rari, your FleetCopilot</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - App Screenshot */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={imageVariants}
            className="relative"
          >
            {/* Background glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 dark:from-primary-500/10 dark:to-accent-500/10 rounded-3xl blur-xl"
            />
            
            {/* Screenshot - Large and centered, no wasted space */}
            <div className="relative flex items-center justify-center py-8">
              <motion.div
                animate={floatAnimation}
                className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl"
              >
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  src="/images/app-screenshots/fleetcopilot-mobile-hand.svg"
                  alt="FleetCopilot AI Assistant on mobile - voice-enabled fleet management with Rari"
                  className="w-full h-auto drop-shadow-2xl"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

export default FleetCopilotSection;
