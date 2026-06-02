// Quality gate for prerendered HTML. For every public route it asserts the raw
// HTML (pre-JavaScript) contains the SEO/AI essentials. Run AFTER prerender.
//
// Hard failures (exit 1): missing title / description / canonical / <h1>, or a
// route that still ships the empty SPA shell.
// Soft warnings: visible word count below the route's target (content depth is
// an editorial decision, not a build blocker). Pass --strict to fail on those.

import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { getAllPublicRoutes, EXCLUDED_ROUTES } from './public-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const STRICT = process.argv.includes('--strict');

function outPathFor(routePath) {
  if (routePath === '/') return join(DIST_DIR, 'index.html');
  return join(DIST_DIR, routePath.replace(/^\//, ''), 'index.html');
}

async function exists(p) {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}

function extractMainText(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const scope = main ? main[1] : html;
  return scope
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function checkRoute(html, route) {
  const errors = [];
  const warnings = [];

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
  if (!title) errors.push('missing <title>');

  const hasDescription = /<meta\s+name=["']description["']\s+content=["'][^"']+["']/i.test(html);
  if (!hasDescription) errors.push('missing meta description');

  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  if (!canonical) errors.push('missing canonical');

  const h1Count = (html.match(/<h1[\b >]/gi) || []).length;
  if (h1Count < 1) errors.push('no <h1>');

  if (/<div id="root">\s*<\/div>/.test(html)) errors.push('still the empty SPA shell');

  const text = extractMainText(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  const target = route.wordTarget || 150;
  if (words < target) {
    warnings.push(`${words} words (< target ${target})`);
  }

  return { title, canonical, h1Count, words, errors, warnings };
}

async function main() {
  const routes = getAllPublicRoutes({ includeTaxonomy: true });
  let failed = 0;
  let warned = 0;

  console.log('Verifying prerendered routes:\n');

  for (const route of routes) {
    const file = outPathFor(route.path);
    if (!(await exists(file))) {
      failed += 1;
      console.error(`  ✗ ${route.path} — no prerendered file at ${file}`);
      continue;
    }
    const html = await readFile(file, 'utf8');
    const r = checkRoute(html, route);

    if (r.errors.length) {
      failed += 1;
      console.error(`  ✗ ${route.path.padEnd(46)} ${r.errors.join('; ')}`);
    } else if (r.warnings.length) {
      warned += 1;
      console.warn(`  ⚠ ${route.path.padEnd(46)} ${r.warnings.join('; ')}`);
    } else {
      console.log(`  ✓ ${route.path.padEnd(46)} words=${String(r.words).padStart(4)} h1=${r.h1Count}`);
    }
  }

  // Guard: excluded routes must never have been prerendered.
  console.log('\nChecking excluded routes are absent:');
  let leaked = 0;
  for (const ex of EXCLUDED_ROUTES) {
    const file = outPathFor(ex);
    if (await exists(file)) {
      leaked += 1;
      console.error(`  ✗ excluded route was prerendered: ${ex}`);
    }
  }
  if (leaked === 0) console.log('  ✓ no admin/test routes prerendered');

  const total = routes.length;
  console.log(
    `\n[verify] ${total - failed}/${total} routes OK, ${warned} warnings, ${failed} failures, ${leaked} leaked.`,
  );

  if (failed > 0 || leaked > 0 || (STRICT && warned > 0)) process.exit(1);
}

main().catch((err) => {
  console.error('[verify] fatal:', err);
  process.exit(1);
});
