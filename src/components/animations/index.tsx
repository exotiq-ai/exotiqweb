/**
 * Bombon-Style Animation Components
 * 
 * Premium animation components using Framer Motion
 * Inspired by https://bombon.framer.website
 */

import React from 'react';
import { motion, Variants, HTMLMotionProps } from 'framer-motion';

// ============================================
// ANIMATION VARIANTS
// ============================================

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1]
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// ============================================
// ANIMATION COMPONENTS
// ============================================

interface AnimatedProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}

/**
 * FadeInUp - Element fades in while moving up
 * Great for: Headlines, paragraphs, cards
 */
export const FadeInUp: React.FC<AnimatedProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  once = true,
  amount = 0.3,
  ...props 
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, amount }}
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          delay,
          ease: [0.25, 0.4, 0.25, 1]
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * FadeInDown - Element fades in while moving down
 * Great for: Navigation, dropdowns
 */
export const FadeInDown: React.FC<AnimatedProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  once = true,
  amount = 0.3,
  ...props 
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, amount }}
    variants={{
      hidden: { opacity: 0, y: -40 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          delay,
          ease: [0.25, 0.4, 0.25, 1]
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * FadeInLeft - Element fades in from left
 * Great for: Text content, alternating layouts
 */
export const FadeInLeft: React.FC<AnimatedProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  once = true,
  amount = 0.3,
  ...props 
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, amount }}
    variants={{
      hidden: { opacity: 0, x: -60 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.7,
          delay,
          ease: [0.25, 0.4, 0.25, 1]
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * FadeInRight - Element fades in from right
 * Great for: Images, alternating layouts
 */
export const FadeInRight: React.FC<AnimatedProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  once = true,
  amount = 0.3,
  ...props 
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, amount }}
    variants={{
      hidden: { opacity: 0, x: 60 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.7,
          delay,
          ease: [0.25, 0.4, 0.25, 1]
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * ScaleIn - Element scales up while fading in
 * Great for: Buttons, icons, badges
 */
export const ScaleIn: React.FC<AnimatedProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  once = true,
  amount = 0.3,
  ...props 
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, amount }}
    variants={{
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.5,
          delay,
          ease: [0.25, 0.4, 0.25, 1]
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * StaggerContainer - Container that staggers children animations
 * Wrap around multiple animated children
 */
export const StaggerContainer: React.FC<AnimatedProps & { 
  staggerDelay?: number;
  childDelay?: number;
}> = ({ 
  children, 
  className = '', 
  staggerDelay = 0.1,
  childDelay = 0.1,
  once = true,
  amount = 0.2,
  ...props 
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, amount }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: childDelay
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * StaggerItem - Child item for StaggerContainer
 * Use inside StaggerContainer for staggered animations
 */
export const StaggerItem: React.FC<AnimatedProps> = ({ 
  children, 
  className = '',
  ...props 
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.4, 0.25, 1]
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * HoverScale - Element scales on hover with spring physics
 * Great for: Cards, buttons, interactive elements
 */
export const HoverScale: React.FC<AnimatedProps & { 
  scale?: number;
  lift?: number;
}> = ({ 
  children, 
  className = '', 
  scale = 1.03,
  lift = -5,
  ...props 
}) => (
  <motion.div
    whileHover={{ 
      scale, 
      y: lift,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }}
    whileTap={{ scale: 0.98 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * HoverGlow - Element glows on hover
 * Great for: Buttons, CTAs
 */
export const HoverGlow: React.FC<AnimatedProps & {
  glowColor?: string;
}> = ({ 
  children, 
  className = '', 
  glowColor = 'rgba(59, 130, 246, 0.5)',
  ...props 
}) => (
  <motion.div
    whileHover={{ 
      boxShadow: `0 0 30px ${glowColor}`,
      transition: {
        duration: 0.3
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * ParallaxContainer - Creates parallax scroll effect
 * Great for: Hero images, background elements
 */
export const ParallaxContainer: React.FC<AnimatedProps & {
  speed?: number;
}> = ({ 
  children, 
  className = '', 
  speed = 0.5,
  ...props 
}) => (
  <motion.div
    initial={{ y: 0 }}
    whileInView={{ y: 0 }}
    style={{ 
      willChange: 'transform'
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * FloatingElement - Element that floats/bobs continuously
 * Great for: Hero images, decorative elements
 */
export const FloatingElement: React.FC<AnimatedProps & {
  duration?: number;
  distance?: number;
}> = ({ 
  children, 
  className = '', 
  duration = 3,
  distance = 10,
  ...props 
}) => (
  <motion.div
    animate={{ 
      y: [-distance, distance, -distance]
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * SlideIn - Element slides in from specified direction
 * Great for: Modals, sidebars, notifications
 */
export const SlideIn: React.FC<AnimatedProps & {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  distance?: number;
}> = ({ 
  children, 
  className = '', 
  direction = 'bottom',
  distance = 100,
  delay = 0,
  once = true,
  amount = 0.3,
  ...props 
}) => {
  const directionMap = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    top: { x: 0, y: -distance },
    bottom: { x: 0, y: distance }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionMap[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: {
          duration: 0.6,
          delay,
          ease: [0.25, 0.4, 0.25, 1]
        }
      }}
      viewport={{ once, amount }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * TextReveal - Text reveals character by character or word by word
 * Great for: Headlines, hero text
 */
export const TextReveal: React.FC<{
  text: string;
  className?: string;
  delay?: number;
  wordByWord?: boolean;
}> = ({ 
  text, 
  className = '', 
  delay = 0,
  wordByWord = true 
}) => {
  const words = text.split(' ');
  
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: wordByWord ? 0.08 : 0.03,
            delayChildren: delay
          }
        }
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.4,
                ease: [0.25, 0.4, 0.25, 1]
              }
            }
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

/**
 * CountUp - Animated number counter
 * Great for: Stats, metrics
 */
export const CountUp: React.FC<{
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}> = ({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '',
  className = ''
}) => {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Re-export motion for custom use
export { motion };
