interface ExotiqMarkProps {
  /** Rendered width & height in px (the mark is square). */
  size?: number | string;
  className?: string;
  /** Color of the ring + bars. Defaults to currentColor so it inherits text color. */
  fg?: string;
  /** Color of the live-signal dot. Defaults to Gulf Blue. */
  dotColor?: string;
  /** Drop the live-signal dot (e.g. extreme small sizes). */
  showDot?: boolean;
  /** Accessible label. When omitted the mark is treated as decorative. */
  title?: string;
}

/**
 * The Exotiq "Aperture E" mark — a ring (aperture/lens), three bars (the E /
 * dashboard) and one Gulf-Blue live-signal dot. Geometry is the canonical
 * 240-unit grid from the brand book; do not distort, recolor, or rescale parts.
 */
export default function ExotiqMark({
  size = 40,
  className = '',
  fg = 'currentColor',
  dotColor = '#6EC1E4',
  showDot = true,
  title,
}: ExotiqMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="120" cy="120" r="96" fill="none" stroke={fg} strokeWidth="20" />
      <rect x="56" y="68" width="116" height="18" fill={fg} />
      <rect x="56" y="111" width="86" height="18" fill={fg} />
      <rect x="56" y="154" width="116" height="18" fill={fg} />
      {showDot ? <circle cx="186" cy="54" r="10" fill={dotColor} /> : null}
    </svg>
  );
}
