// Post-build prerender: serves dist/ with SPA fallback, renders each public
// route in headless Chromium (so react-helmet metadata + route content land in
// the HTML), then writes the serialized DOM to dist/<route>/index.html.
//
// Run AFTER `vite build`. Pairs with verify-prerendered-routes.mjs.

import {
  createServer,
} from 'node:http';
import {
  readFile,
  mkdir,
  writeFile,
  stat,
  rm,
} from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { chromium } from 'playwright';
import { getAllPublicRoutes } from './public-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

async function fileExists(p) {
  try {
    const s = await stat(p);
    return s.isFile();
  } catch {
    return false;
  }
}

// Static server for dist/ with SPA fallback to index.html for non-file routes.
function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://127.0.0.1');
      let pathname = decodeURIComponent(url.pathname);

      // Direct file hit (assets, llms.txt, sitemap.xml, etc.)
      const candidate = join(DIST_DIR, pathname);
      if (extname(pathname) && (await fileExists(candidate))) {
        const data = await readFile(candidate);
        res.writeHead(200, { 'Content-Type': MIME[extname(pathname)] || 'application/octet-stream' });
        res.end(data);
        return;
      }

      // SPA fallback — always serve the original shell so React Router can
      // render the requested route client-side.
      const shell = await readFile(join(DIST_DIR, 'index.html.shell'))
        .catch(() => readFile(join(DIST_DIR, 'index.html')));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(shell);
    } catch (err) {
      res.writeHead(500);
      res.end(String(err));
    }
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

function outPathFor(route) {
  if (route === '/') return join(DIST_DIR, 'index.html');
  return join(DIST_DIR, route.replace(/^\//, ''), 'index.html');
}

const FALLBACK_MARKERS = [
  "We couldn't find that page",
  'Page Not Found',
];

async function renderRoute(page, baseUrl, route) {
  const url = `${baseUrl}${route.path}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });

  // Best-effort wait for a route H1 (most pages have one).
  await page
    .waitForSelector('main#main-content h1', { timeout: 8000 })
    .catch(() => {});

  // Wait until the lazy route has replaced the Suspense "Loading..." fallback
  // and #main-content holds real text.
  await page
    .waitForFunction(
      () => {
        const main = document.querySelector('#main-content');
        if (!main) return false;
        const text = (main.innerText || '').trim();
        return text.length > 60 && !/^Loading\.\.\.$/.test(text);
      },
      { timeout: 20000 },
    )
    .catch(() => {});

  // Settle any final Helmet/head writes + late content.
  await page.waitForTimeout(400);

  const data = await page.evaluate(() => {
    const main = document.querySelector('#main-content');
    return {
      html: document.documentElement.outerHTML,
      title: document.title,
      hasCanonical: !!document.querySelector('link[rel="canonical"]'),
      h1Count: document.querySelectorAll('main h1').length,
      words: ((main && main.innerText) || '').trim().split(/\s+/).filter(Boolean).length,
      bodyText: ((main && main.innerText) || '').slice(0, 200),
    };
  });

  const looksLikeFallback = FALLBACK_MARKERS.some((m) => data.bodyText.includes(m));
  return { ...data, looksLikeFallback };
}

async function main() {
  if (!(await fileExists(join(DIST_DIR, 'index.html')))) {
    console.error('[prerender] dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  // Preserve the pristine SPA shell so the server can keep serving it even
  // after we overwrite dist/index.html with the prerendered homepage.
  // A fresh `vite build` always emits an empty <div id="root"></div>; if we see
  // that we (re)capture the shell, otherwise we reuse a previously saved one.
  const shellPath = join(DIST_DIR, 'index.html.shell');
  const indexHtml = await readFile(join(DIST_DIR, 'index.html'), 'utf8');
  const isPristineShell = /<div id="root">\s*<\/div>/.test(indexHtml);
  if (isPristineShell) {
    await writeFile(shellPath, indexHtml);
  } else if (!(await fileExists(shellPath))) {
    console.error(
      '[prerender] dist/index.html is already prerendered and no shell exists. Run `vite build` first.',
    );
    process.exit(1);
  }

  const routes = getAllPublicRoutes({ includeTaxonomy: true });
  const { server, port } = await startServer();
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', (e) => console.warn(`[prerender] page error: ${e.message.split('\n')[0]}`));

  const results = [];
  let failures = 0;

  for (const route of routes) {
    try {
      const r = await renderRoute(page, baseUrl, route);
      if (r.looksLikeFallback) {
        failures += 1;
        console.error(`  ✗ ${route.path} rendered the 404/fallback view`);
        continue;
      }

      const outPath = outPathFor(route.path);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, `<!DOCTYPE html>\n${r.html}`, 'utf8');

      results.push({ path: route.path, words: r.words, h1: r.h1Count, canonical: r.hasCanonical });
      console.log(
        `  ✓ ${route.path.padEnd(46)} words=${String(r.words).padStart(4)} h1=${r.h1Count} canonical=${r.hasCanonical ? 'yes' : 'NO'}`,
      );
    } catch (err) {
      failures += 1;
      console.error(`  ✗ ${route.path} — ${String(err).split('\n')[0]}`);
    }
  }

  await browser.close();
  server.close();

  // Remove the internal shell artifact so it isn't deployed.
  await rm(shellPath, { force: true });

  console.log(`\n[prerender] ${results.length} routes written, ${failures} failures.`);
  if (failures > 0) process.exit(1);
}

main().catch((err) => {
  console.error('[prerender] fatal:', err);
  process.exit(1);
});
