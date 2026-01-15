import React from 'react';
import { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'right',
      fullWidth = false,
      loading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Base styles - consistent across all variants
    const baseStyles = `
      group relative inline-flex items-center justify-center
      font-dfaalt font-semibold
      rounded-xl
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-black
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
      overflow-hidden
    `;

    // Variant styles
    const variantStyles = {
      primary: `
        bg-primary-500 hover:bg-primary-600 active:bg-primary-700
        text-white
        shadow-lg hover:shadow-xl
        hover:scale-[1.02] active:scale-[0.98]
      `,
      secondary: `
        border-2 border-primary-500
        text-primary-500 hover:text-white
        bg-transparent hover:bg-primary-500
        shadow-md hover:shadow-lg
        hover:scale-[1.02] active:scale-[0.98]
      `,
      tertiary: `
        text-primary-500 hover:text-primary-600 active:text-primary-700
        underline-offset-4 hover:underline
        hover:translate-x-1
      `,
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm min-h-[40px]',
      md: 'px-6 py-3 text-base min-h-[48px]',
      lg: 'px-8 py-4 text-lg min-h-[56px]',
    };

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    // Loading styles
    const loadingStyles = loading ? 'cursor-wait' : '';

    const combinedClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${widthStyles}
      ${loadingStyles}
      ${className}
    `.replace(/\s+/g, ' ').trim();

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || loading}
        {...props}
      >
        {/* Ripple effect for primary buttons */}
        {variant === 'primary' && (
          <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-500 rounded-xl" />
        )}

        {/* Gradient overlay for primary buttons on hover */}
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Content wrapper */}
        <span className="relative z-10 flex items-center justify-center space-x-2">
          {/* Loading spinner */}
          {loading && (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}

          {/* Icon left */}
          {Icon && iconPosition === 'left' && !loading && (
            <Icon className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          )}

          {/* Button text */}
          <span>{children}</span>

          {/* Icon right */}
          {Icon && iconPosition === 'right' && !loading && (
            <Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
