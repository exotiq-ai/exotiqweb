/**
 * Generates every raster + vector brand asset from the canonical "Aperture E"
 * mark (brand book geometry on a 240-unit grid). Re-run after any mark change:
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * Outputs into /public:
 *   favicon-16.png, favicon-32.png        browser tab (black tile, white mark)
 *   apple-touch-icon.png (180)            iOS home screen
 *   icon-192.png, icon-512.png            PWA, "any maskable"
 *   exotiq-logo.png (512)                 schema.org / Organization logo
 *   exotiq-logo-lockup.png (512)          legacy ref, kept on-brand
 *   og-exotiq-ai-fleet.png (1200x630)     Open Graph / Twitter card
 *   exotiq-lockup-white-transparent.svg   clean vector lockup (replaces 388KB file)
 *   exotiq-lockup-black-transparent.svg
 */
import sharp from 'sharp';
import { writeFile, mkdir, copyFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '..', 'public');

const GULF = '#6EC1E4';
const BLACK = '#000000';
const WHITE = '#FFFFFF';

// --- canonical mark geometry (240-unit grid) --------------------------------
function markBody(fg, dot, dotR = 10) {
  return `
    <circle cx="120" cy="120" r="96" fill="none" stroke="${fg}" stroke-width="20"/>
    <rect x="56" y="68" width="116" height="18" fill="${fg}"/>
    <rect x="56" y="111" width="86" height="18" fill="${fg}"/>
    <rect x="56" y="154" width="116" height="18" fill="${fg}"/>
    <circle cx="186" cy="54" r="${dotR}" fill="${dot}"/>`;
}

// Square icon SVG authored at high internal res (S) for a crisp downscale.
function iconSvg({ bg = null, fg = WHITE, dot = GULF, rx = 0, pad = 0.18, dotR = 10, S = 1024 }) {
  const markVB = 240;
  const avail = S * (1 - 2 * pad);
  const scale = avail / markVB;
  const off = (S - avail) / 2;
  const bgRect = bg ? `<rect width="${S}" height="${S}" rx="${rx}" fill="${bg}"/>` : '';
  return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">${bgRect}<g transform="translate(${off} ${off}) scale(${scale})">${markBody(fg, dot, dotR)}</g></svg>`;
}

async function png(svg, file, size) {
  const out = path.join(PUBLIC, file);
  await sharp(Buffer.from(svg)).resize(size, size, { fit: 'contain' }).png().toFile(out);
  console.log('  ✓', file, `(${size}x${size})`);
}

// --- clean vector lockups (mark + wordmark), replacing the 388KB raster SVGs -
function lockupSvg(fg) {
  // Brand-book horizontal lockup proportions: viewBox 900x240, mark at 0,0,
  // wordmark Manrope 700 @140, baseline y=170, tracking -5. Dot stays Gulf Blue.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 240" width="880" height="240" fill="none">
  ${markBody(fg, GULF)}
  <text x="290" y="170" fill="${fg}" font-family="Manrope, 'Dfaalt', 'Space Grotesk', system-ui, sans-serif" font-weight="700" font-size="140" letter-spacing="-5">exotiq</text>
</svg>
`;
}

// --- Open Graph card (1200x630) ---------------------------------------------
function ogSvg(fontFamily) {
  const markVB = 240, markSize = 196;
  const scale = markSize / markVB;
  const mx = 600 - markSize / 2;       // centered horizontally
  const my = 150;                       // top group y
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#000000"/>
  <g opacity="0.07" stroke="${GULF}" stroke-width="1">
    ${Array.from({ length: 25 }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="630"/>`).join('')}
    ${Array.from({ length: 14 }, (_, i) => `<line x1="0" y1="${i * 48}" x2="1200" y2="${i * 48}"/>`).join('')}
  </g>
  <g transform="translate(${mx} ${my}) scale(${scale})">${markBody(WHITE, GULF)}</g>
  <text x="600" y="480" text-anchor="middle" fill="#FFFFFF" font-family="${fontFamily}" font-weight="800" font-size="132" letter-spacing="-6">exotiq</text>
  <text x="600" y="545" text-anchor="middle" fill="${GULF}" font-family="monospace" font-size="24" letter-spacing="6">THE AI COMMAND CENTER</text>
  <text x="600" y="600" text-anchor="middle" fill="#C0C0C0" font-family="monospace" font-size="17" letter-spacing="4">AI FLEET MANAGEMENT FOR EXOTIC &amp; RENTAL CAR OPERATORS</text>
</svg>`;
}

// Make a real font discoverable by librsvg/fontconfig for the OG wordmark.
async function bootstrapFont() {
  const fontDir = path.join(homedir(), '.fonts');
  await mkdir(fontDir, { recursive: true });
  const candidates = [
    'https://github.com/google/fonts/raw/main/ofl/manrope/Manrope%5Bwght%5D.ttf',
  ];
  for (const url of candidates) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(path.join(fontDir, 'Manrope.ttf'), buf);
      try { execSync('fc-cache -f', { stdio: 'ignore' }); } catch {}
      console.log('  ✓ Manrope installed for OG text');
      return 'Manrope';
    } catch (e) {
      console.log('  · Manrope fetch failed:', e.message);
    }
  }
  // Fallback: install the bundled Inter so the OG wordmark still renders cleanly.
  const localInter = path.join(PUBLIC, 'fonts', 'Inter-Variable.ttf');
  if (existsSync(localInter)) {
    try {
      await copyFile(localInter, path.join(fontDir, 'Inter-Variable.ttf'));
      try { execSync('fc-cache -f', { stdio: 'ignore' }); } catch {}
      console.log('  · Using bundled Inter for OG text (Manrope unavailable)');
      return 'Inter, sans-serif';
    } catch {}
  }
  console.log('  · Falling back to system sans for OG text');
  return 'sans-serif';
}

async function main() {
  console.log('Generating brand assets…');

  // Browser-tab favicons: black tile, white mark, enlarged dot for legibility.
  await png(iconSvg({ bg: BLACK, rx: 80, pad: 0.12, dotR: 20 }), 'favicon-32.png', 32);
  await png(iconSvg({ bg: BLACK, rx: 80, pad: 0.10, dotR: 22, /* dot drops out cleanly if too small */ }), 'favicon-16.png', 16);

  // iOS home screen (no rounding — iOS masks it).
  await png(iconSvg({ bg: BLACK, rx: 0, pad: 0.16, dotR: 12 }), 'apple-touch-icon.png', 180);

  // PWA maskable icons: extra safe-zone padding, full-bleed black.
  await png(iconSvg({ bg: BLACK, rx: 0, pad: 0.2, dotR: 11 }), 'icon-512.png', 512);
  await png(iconSvg({ bg: BLACK, rx: 0, pad: 0.2, dotR: 11 }), 'icon-192.png', 192);

  // schema.org Organization logo + legacy lockup png (rounded black tile).
  await png(iconSvg({ bg: BLACK, rx: 64, pad: 0.16, dotR: 11 }), 'exotiq-logo.png', 512);
  await png(iconSvg({ bg: BLACK, rx: 64, pad: 0.16, dotR: 11 }), 'exotiq-logo-lockup.png', 512);

  // Clean vector lockups (replace the 388KB raster-embedded files).
  await writeFile(path.join(PUBLIC, 'exotiq-lockup-white-transparent.svg'), lockupSvg(WHITE));
  console.log('  ✓ exotiq-lockup-white-transparent.svg');
  await writeFile(path.join(PUBLIC, 'exotiq-lockup-black-transparent.svg'), lockupSvg(BLACK));
  console.log('  ✓ exotiq-lockup-black-transparent.svg');

  // Open Graph / Twitter card.
  const fontFamily = await bootstrapFont();
  await sharp(Buffer.from(ogSvg(fontFamily))).png().toFile(path.join(PUBLIC, 'og-exotiq-ai-fleet.png'));
  console.log('  ✓ og-exotiq-ai-fleet.png (1200x630)');

  console.log('Done.');
}

main().catch((e) => { console.error(e); process.exit(1); });
