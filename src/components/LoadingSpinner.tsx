import { cn } from '../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  variant?: 'spinner' | 'dots' | 'pulse';
}

/**
 * Premium Loading Spinner Component
 * 
 * Sophisticated loading indicators with multiple variants
 */
export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  variant = 'spinner' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const dotSize = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  if (variant === 'dots') {
    return (
      <div className="flex items-center space-x-2" role="status" aria-label="Loading">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full animate-bounce-subtle',
              dotSize[size],
              `bg-${color}-600`
            )}
            style={{
              animationDelay: `${i * 150}ms`,
            }}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div
        className={cn(
          'rounded-full animate-pulse-subtle',
          sizeClasses[size],
          `bg-${color}-600`
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // Default spinner variant with premium styling
  return (
    <div className={`${sizeClasses[size]} animate-spin relative`} role="status" aria-label="Loading">
      <div className={`w-full h-full border-2 border-${color}-200 dark:border-${color}-800/50 border-t-${color}-600 rounded-full`}></div>
      <div className={`absolute inset-0 rounded-full blur-sm opacity-20 bg-${color}-600`}></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
