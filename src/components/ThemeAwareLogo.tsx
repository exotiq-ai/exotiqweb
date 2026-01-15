import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeAwareLogoProps {
  className?: string;
  alt?: string;
  size?: 'header' | 'footer' | 'mobile' | 'loading';
}

export default function ThemeAwareLogo({
  className = '',
  alt = 'Exotiq.ai',
  size = 'header'
}: ThemeAwareLogoProps) {
  const { theme } = useTheme();

  // Choose logo based on theme and size
  // Footer always uses white logo, others switch based on theme
  const logoSrc = size === 'footer'
    ? '/exotiq-lockup-white-transparent.svg'
    : theme === 'dark'
      ? '/exotiq-lockup-white-transparent.svg'
      : '/exotiq-lockup-black-transparent.svg';

  // Size classes with optimized dimensions
  const sizeClasses = {
    header: 'logo-optimized logo-header logo-hover',
    footer: 'logo-optimized logo-footer logo-hover',
    mobile: 'logo-optimized logo-mobile logo-hover',
    loading: 'logo-optimized logo-header mx-auto opacity-80'
  };

  // Explicit dimensions to prevent layout shift (based on actual SVG aspect ratio)
  // Desktop header increased to 180px for better brand presence
  const dimensions = {
    header: { width: 180, height: 41 },
    footer: { width: 160, height: 37 },
    mobile: { width: 120, height: 28 },
    loading: { width: 180, height: 41 }
  };

  return (
    <img
      src={logoSrc}
      alt={alt}
      width={dimensions[size].width}
      height={dimensions[size].height}
      className={`${sizeClasses[size]} ${className}`}
    />
  );
}
