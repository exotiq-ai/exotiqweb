import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { MobileSection, MobileContainer } from './MobileOptimizations';
import { Star, Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Jay',
    initials: 'J',
    text: 'We need an integrated system that actually understands how we work. exotiq gets it.',
    company: 'Denver Exotic Rental Cars',
    market: 'Denver',
  },
  {
    name: 'Ed',
    initials: 'E',
    text: 'I tried three other platforms before exotiq. None of them got it right. exotiq did, from the start. I made the call to switch halfway through the demo, and a month later I am glad I did. The operational gains were immediate.',
    company: 'Revel + Roam',
    market: 'Westlake Village',
  },
];

// Real, founder-confirmed paying operators (text now; logos when supplied).
const operatorWall = [
  'Exotics by The Bay',
  'Denver Exotic Rental Cars',
  'Dryvit',
  'Revel + Roam',
];

// Bombon-style animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const headerVariants: Variants = {
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

const cardVariants: Variants = {
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

const starVariants: Variants = {
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
    <MobileSection ref={ref} className="bg-gray-50 dark:bg-dark-900 py-14 lg:py-20">
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
            From operators across Tampa, Miami, Denver, Scottsdale &amp; Westlake Village.
          </motion.p>
        </motion.div>

        {/* Named operator wall */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-10 lg:mb-14"
        >
          <p className="text-center font-inter text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 mb-5">
            Operators building real exotic-rental brands run on exotiq
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8 max-w-4xl mx-auto">
            {operatorWall.map((op, i) => (
              <React.Fragment key={op}>
                {i > 0 && (
                  <span
                    aria-hidden
                    className="hidden sm:inline-block w-px h-5 bg-gray-300 dark:bg-dark-700"
                  />
                )}
                <span className="font-dfaalt font-semibold text-base sm:text-lg text-gray-700 dark:text-gray-200 tracking-tight">
                  {op}
                </span>
              </React.Fragment>
            ))}
          </div>
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
                    {testimonial.company} · {testimonial.market}
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
