import React from 'react';

// Mobile-specific utility components for better UX

export const MobileContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-4 sm:px-6 lg:px-16 xl:px-20 ${className}`}>
    {children}
  </div>
);

export const MobileGrid = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 ${className}`}>
    {children}
  </div>
);

export const TouchFriendlyButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}) => {
  const baseClasses = 'font-poppins font-bold uppercase tracking-wide rounded-lg transition-all duration-200 active:scale-95 touch-manipulation';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs min-h-[44px]',
    md: 'px-6 py-3 text-sm min-h-[48px]',
    lg: 'px-8 py-4 text-sm min-h-[52px]'
  };
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-accent-600 hover:bg-accent-700 text-white',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${className}`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
};

export const MobileCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-dark-800 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-dark-700 shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}>
    {children}
  </div>
);

export const MobileSection = React.forwardRef<HTMLElement, { 
  children: React.ReactNode; 
  className?: string;
  padding?: 'none' | 'sm' | 'default' | 'lg';
}>(({ 
  children, 
  className = '',
  padding = 'default'
}, ref) => {
  const paddingClasses = {
    none: '',
    sm: 'py-8 sm:py-12',
    default: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24'
  };
  
  return (
    <section ref={ref} className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </section>
  );
});