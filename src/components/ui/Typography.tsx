import React from 'react';
import { TypographyVariant, BaseComponentProps } from '../../lib/types';

export interface TypographyProps extends BaseComponentProps {
  variant?: TypographyVariant;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';
  color?: 'default' | 'primary' | 'accent' | 'muted' | 'success' | 'warning' | 'error';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  as,
  color = 'default',
  weight,
  align,
  className = '',
  children
}) => {
  const variantClasses = {
    h1: 'font-dfaalt font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    h2: 'font-dfaalt font-bold text-3xl sm:text-4xl md:text-5xl',
    h3: 'font-dfaalt font-semibold text-2xl sm:text-3xl md:text-4xl',
    h4: 'font-dfaalt font-semibold text-xl sm:text-2xl md:text-3xl',
    h5: 'font-dfaalt font-semibold text-lg sm:text-xl md:text-2xl',
    h6: 'font-dfaalt font-semibold text-base sm:text-lg md:text-xl',
    body: 'font-montserrat text-base sm:text-lg',
    'body-sm': 'font-montserrat text-sm sm:text-base',
    caption: 'font-montserrat text-xs sm:text-sm',
    label: 'font-montserrat font-medium text-sm sm:text-base uppercase tracking-wide'
  };
  
  const colorClasses = {
    default: 'text-gray-900 dark:text-white',
    primary: 'text-primary-500 dark:text-primary-400',
    accent: 'text-accent-600 dark:text-accent-400',
    muted: 'text-gray-600 dark:text-gray-400',
    success: 'text-success-600 dark:text-success-400',
    warning: 'text-warning-600 dark:text-warning-400',
    error: 'text-error-600 dark:text-error-400'
  };
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  // Determine the element to render
  const getElement = () => {
    if (as) return as;
    
    const variantToElement: Record<TypographyVariant, string> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      body: 'p',
      'body-sm': 'p',
      caption: 'span',
      label: 'label'
    };
    
    return variantToElement[variant] || 'p';
  };
  
  const Element = getElement() as keyof JSX.IntrinsicElements;
  
  const classes = `
    ${variantClasses[variant]}
    ${colorClasses[color]}
    ${weight ? weightClasses[weight] : ''}
    ${align ? alignClasses[align] : ''}
    ${className}
  `.trim();
  
  return <Element className={classes}>{children}</Element>;
};

export default Typography;







