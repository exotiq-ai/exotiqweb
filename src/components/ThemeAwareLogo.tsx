import { useTheme } from '../contexts/ThemeContext';

interface ThemeAwareLogoProps {
  className?: string;
  alt?: string;
  size?: 'header' | 'footer' | 'mobile' | 'loading';
}

/** Horizontal lockup viewBox 708×240 */
const LOCKUP_ASPECT = 708 / 240;

export default function ThemeAwareLogo({
  className = '',
  alt = 'exotiq',
  size = 'header'
}: ThemeAwareLogoProps) {
  const { theme } = useTheme();

  const logoSrc = size === 'footer'
    ? '/brand/exotiq-lockup-horizontal-white.svg'
    : theme === 'dark'
      ? '/brand/exotiq-lockup-horizontal-white.svg'
      : '/brand/exotiq-lockup-horizontal-black.svg';

  const sizeClasses = {
    header: 'logo-optimized logo-header logo-hover',
    footer: 'logo-optimized logo-footer logo-hover',
    mobile: 'logo-optimized logo-mobile logo-hover',
    loading: 'logo-optimized logo-header mx-auto opacity-80'
  };

  const heights = {
    header: 48,
    footer: 80,
    mobile: 32,
    loading: 48
  };

  const height = heights[size];
  const width = Math.round(height * LOCKUP_ASPECT);

  return (
    <img
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${sizeClasses[size]} ${className}`}
    />
  );
}
