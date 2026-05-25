import { useTheme } from '../contexts/ThemeContext';
import ExotiqMark from './ExotiqMark';

interface ThemeAwareLogoProps {
  className?: string;
  alt?: string;
  size?: 'header' | 'footer' | 'mobile' | 'loading';
}

// Mark + wordmark dimensions per slot. The mark:wordmark ratio (~1.4) and the
// gap (~0.2 of the mark) follow the brand-book horizontal lockup proportions.
const SLOT = {
  header: { mark: 38, font: 27 },
  footer: { mark: 44, font: 31 },
  mobile: { mark: 32, font: 23 },
  loading: { mark: 60, font: 44 },
} as const;

export default function ThemeAwareLogo({
  className = '',
  alt = 'Exotiq',
  size = 'header',
}: ThemeAwareLogoProps) {
  const { theme } = useTheme();
  // Footer sits on the permanent dark surface; everything else follows theme.
  const onDark = size === 'footer' || theme === 'dark';
  const { mark, font } = SLOT[size];

  return (
    <span
      className={`logo-hover inline-flex items-center ${onDark ? 'text-white' : 'text-black'} ${className}`}
      role="img"
      aria-label={alt}
      style={{ gap: Math.round(mark * 0.2) }}
    >
      <ExotiqMark size={mark} />
      <span
        className="font-manrope font-bold leading-none"
        style={{ fontSize: font, letterSpacing: '-0.045em' }}
      >
        exotiq
      </span>
    </span>
  );
}
