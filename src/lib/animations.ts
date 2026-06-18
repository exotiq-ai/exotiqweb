// Animation utilities and helpers

export type AnimationDirection = 'up' | 'down' | 'left' | 'right';
export type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate';

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  distance?: number;
}

/**
 * Generate CSS animation classes
 */
export const getAnimationClasses = (
  type: AnimationType,
  direction?: AnimationDirection,
  config?: AnimationConfig
): string => {
  void config;
  const classes: string[] = [];

  switch (type) {
    case 'fade':
      classes.push('animate-fade-in');
      break;
    case 'slide':
      if (direction === 'up') classes.push('animate-slide-up');
      else if (direction === 'down') classes.push('animate-slide-down');
      else if (direction === 'left') classes.push('animate-slide-left');
      else if (direction === 'right') classes.push('animate-slide-right');
      else classes.push('animate-slide-up');
      break;
    case 'scale':
      classes.push('animate-scale-in');
      break;
    case 'rotate':
      classes.push('animate-rotate-in');
      break;
  }

  return classes.join(' ');
};

/**
 * Stagger animation delays for lists
 */
export const getStaggerDelay = (index: number, baseDelay: number = 100): number => {
  return baseDelay * index;
};

/**
 * Parallax scroll calculation
 */
export const calculateParallax = (
  scrollY: number,
  speed: number = 0.5,
  offset: number = 0
): number => {
  return scrollY * speed + offset;
};

/**
 * Smooth scroll to element
 */
export const smoothScrollTo = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement, threshold: number = 0.1): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top >= -threshold * rect.height &&
    rect.left >= -threshold * rect.width &&
    rect.bottom <= windowHeight + threshold * rect.height &&
    rect.right <= windowWidth + threshold * rect.width
  );
};

/**
 * Get scroll progress (0-1)
 */
export const getScrollProgress = (): number => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  return Math.min(scrollTop / (documentHeight - windowHeight), 1);
};







