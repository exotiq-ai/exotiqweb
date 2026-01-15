import React from 'react';
import { motion } from 'framer-motion';
import { MobileSection, MobileContainer } from './MobileOptimizations';
import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Michael R.',
    initials: 'MR',
    text: 'This is the first platform that treats us like the professionals we are. Exotiq understands we\'re running real businesses.',
    role: 'Founder, Apex Luxury Rentals',
    fleet: '28 vehicles',
  },
  {
    name: 'David K.',
    initials: 'DK',
    text: 'Exotiq saves me 10+ hours every week. That\'s time I can reinvest in scaling my fleet instead of drowning in tasks.',
    role: 'CEO, Elite Auto Collective',
    fleet: '14 vehicles',
  },
  {
    name: 'Alex R.',
    initials: 'AR',
    text: 'Nothing truly supports the way P2P rental hosts operate. Exotiq looks like the first platform built for us.',
    role: 'Professional Turo Host',
    fleet: '12 vehicles',
  },
  {
    name: 'Sarah M.',
    initials: 'SM',
    text: 'This will absolutely change the game. I have been waiting for something like this for years.',
    role: 'Exotic Car Rental Owner',
    fleet: '50+ vehicles',
  },
];

// Bombon-style animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const headerVariants = {
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

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.2 + i * 0.1,
      ease: [0.25, 0.4, 0.25, 1]
    }
  })
};

const starVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: i * 0.05,
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  })
};

const TestimonialsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });

  return (
    <MobileSection ref={ref} className="bg-gray-50 dark:bg-dark-900 py-14 lg:py-16">
      <MobileContainer>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-8 lg:mb-10"
        >
          <motion.h2
            variants={headerVariants}
            className="font-dfaalt font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-3"
          >
            Trusted by{' '}
            <span className="text-primary-500">Fleet Operators</span>
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="font-inter text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Real feedback from operators managing 10 to 100+ vehicles across major U.S. markets
          </motion.p>
        </motion.div>

        {/* Testimonials Grid - Clean 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative bg-white dark:bg-dark-800 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl border border-gray-100 dark:border-dark-700 cursor-default"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
                animate={isVisible ? { opacity: 1, rotate: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Quote 
                  className="absolute top-6 right-6 w-8 h-8 text-gray-100 dark:text-dark-700" 
                  fill="currentColor"
                />
              </motion.div>
              
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={starVariants}
                  >
                    <Star 
                      className="w-4 h-4 text-amber-400 fill-current" 
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Quote */}
              <p className="font-inter text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-12 h-12 bg-primary-500/10 dark:bg-primary-500/20 rounded-full flex items-center justify-center"
                >
                  <span className="font-dfaalt font-bold text-primary-500">
                    {testimonial.initials}
                  </span>
                </motion.div>
                
                {/* Info */}
                <div>
                  <div className="font-dfaalt font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="font-inter text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role} · {testimonial.fleet}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </MobileContainer>
    </MobileSection>
  );
};

export default TestimonialsSection;
