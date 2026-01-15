import React, { forwardRef } from 'react';
import { BaseComponentProps, CardVariant } from '../../lib/types';

export interface CardProps extends BaseComponentProps {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  children
}, ref) => {
  const baseClasses = 'rounded-xl transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700',
    elevated: 'bg-white dark:bg-dark-800 shadow-lg',
    outlined: 'bg-transparent border-2 border-gray-200 dark:border-dark-700',
    flat: 'bg-gray-50 dark:bg-dark-700'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const hoverClasses = hover ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] group' : '';
  
  const variantHoverEffects = {
    default: hover ? 'hover:border-primary-300 dark:hover:border-primary-500' : '',
    elevated: hover ? 'hover:shadow-2xl' : '',
    outlined: hover ? 'hover:border-primary-400 dark:hover:border-primary-500' : '',
    flat: hover ? 'hover:bg-gray-100 dark:hover:bg-dark-600' : ''
  };
  
  return (
    <div ref={ref} className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${variantHoverEffects[variant]} ${className}`}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;

