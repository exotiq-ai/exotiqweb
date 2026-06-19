/**
 * Cinematic "light-sheen" hero background.
 *
 * Deep near-black with two slow-drifting brand light pools (gulf-blue key light,
 * warm orange rim light), a slow raking sheen like studio light over bodywork,
 * a film-grain layer to kill banding and add tactility, and a vignette for depth.
 *
 * Pure CSS + GPU-composited transforms — no canvas, fast LCP. Motion is disabled
 * under prefers-reduced-motion.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function HeroSheen() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#05070a]" aria-hidden="true">
      {/* Gulf-blue key light */}
      <div
        className="absolute left-[6%] top-[-12%] h-[85%] w-[72%] rounded-full blur-[64px] will-change-transform"
        style={{
          background:
            'radial-gradient(circle at center, rgba(110,193,228,0.22), rgba(110,193,228,0.05) 45%, transparent 64%)',
          animation: 'heroDriftA 34s ease-in-out infinite',
        }}
      />

      {/* Warm orange rim light */}
      <div
        className="absolute right-[0%] bottom-[-16%] h-[78%] w-[66%] rounded-full blur-[72px] will-change-transform"
        style={{
          background:
            'radial-gradient(circle at center, rgba(241,90,41,0.14), rgba(241,90,41,0.04) 42%, transparent 60%)',
          animation: 'heroDriftB 46s ease-in-out infinite',
        }}
      />

      {/* Slow raking sheen, like light moving across a car's bodywork */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            'linear-gradient(108deg, transparent 38%, rgba(150,205,240,0.05) 47%, rgba(255,255,255,0.06) 50%, rgba(150,205,240,0.05) 53%, transparent 62%)',
          animation: 'heroSweep 22s ease-in-out infinite',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN, backgroundSize: '180px 180px' }}
      />

      {/* Vignette for depth + center focus */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 85% at 50% 38%, transparent 46%, rgba(0,0,0,0.62) 100%)',
        }}
      />

      <style>{`
        @keyframes heroDriftA {
          0%, 100% { transform: translate3d(-4%, -3%, 0) scale(1); }
          50% { transform: translate3d(8%, 6%, 0) scale(1.18); }
        }
        @keyframes heroDriftB {
          0%, 100% { transform: translate3d(4%, 4%, 0) scale(1.05); }
          50% { transform: translate3d(-7%, -5%, 0) scale(1.2); }
        }
        @keyframes heroSweep {
          0% { transform: translate3d(-55%, 0, 0); }
          100% { transform: translate3d(120%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="heroDriftA"], [style*="heroDriftB"], [style*="heroSweep"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
