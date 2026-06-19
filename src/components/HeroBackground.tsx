import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  md: number; // distance to cursor, recomputed each frame
}

/**
 * Interconnected gulf-blue particle field for the hero.
 *
 * The web is dense and bright; lines near the cursor light up white and the
 * cursor pushes particles away — that's the "alive / intentional" feel.
 * Performance + a11y are still guarded: pauses when scrolled offscreen or the
 * tab is hidden, honors prefers-reduced-motion (single static frame), and drops
 * cursor interaction + density on touch devices. All listeners cleaned up.
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;
    const BRAND = '110, 193, 228'; // Gulf Blue #6EC1E4
    const BG = '#05070a';

    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999, radius: isTouch ? 0 : 200 };

    const sizeCanvas = () => {
      canvas.width = parent?.clientWidth || window.innerWidth;
      canvas.height = parent?.clientHeight || window.innerHeight;
    };

    const buildParticles = () => {
      const w = canvas.width;
      const h = canvas.height;
      const count = Math.min(Math.floor((w * h) / 9000), isTouch ? 70 : 160);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.7,
        md: Infinity,
      }));
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      // Move + draw particles, capture cursor distance
      for (const p of particles) {
        if (p.x <= 0 || p.x >= w) p.vx = -p.vx;
        if (p.y <= 0 || p.y >= h) p.vy = -p.vy;
        if (mouse.radius) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          p.md = d;
          if (d > 0 && d < mouse.radius) {
            const force = (mouse.radius - d) / mouse.radius;
            p.x -= (dx / d) * force * 5;
            p.y -= (dy / d) * force * 5;
          }
        } else {
          p.md = Infinity;
        }
        p.x += p.vx;
        p.y += p.vy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${BRAND}, 0.85)`;
        ctx.fill();
      }

      // Connections — bright, and white near the cursor
      const linkDist = Math.min(w, h) * 0.18;
      for (let a = 0; a < particles.length; a++) {
        const pa = particles[a];
        for (let b = a + 1; b < particles.length; b++) {
          const pb = particles[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const t = 1 - dist / linkDist;
            if (pa.md < mouse.radius || pb.md < mouse.radius) {
              ctx.strokeStyle = `rgba(210, 235, 255, ${t})`;
              ctx.lineWidth = 1.1;
            } else {
              ctx.strokeStyle = `rgba(${BRAND}, ${t * 0.55})`;
              ctx.lineWidth = 1;
            }
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      loop();
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const handleResize = () => {
      sizeCanvas();
      buildParticles();
      if (reduceMotion) render();
    };
    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    sizeCanvas();
    buildParticles();

    if (reduceMotion) {
      render();
    } else {
      start();
      if (!isTouch) {
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseout', handleLeave);
      }
    }
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    let io: IntersectionObserver | null = null;
    if (parent && 'IntersectionObserver' in window && !reduceMotion) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) start();
          else stop();
        },
        { threshold: 0 },
      );
      io.observe(parent);
    }

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      io?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}
