// Single source of truth for public, crawlable routes.
//
// Consumed by:
//   - scripts/generate-seo-artifacts.mjs  (sitemap.xml)
//   - scripts/prerender-public-routes.mjs (static HTML per route)
//   - scripts/verify-prerendered-routes.mjs (HTML quality gate)
//
// Admin/test routes are intentionally excluded so they never get prerendered
// or listed in the sitemap.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const BLOG_DIR = join(PROJECT_ROOT, 'src', 'content', 'blog');

export const SITE_URL = 'https://exotiq.ai';

// Static marketing/legal routes. `wordTarget` feeds the verifier's minimum
// visible-word gate so thin routes (contact/survey) aren't held to the same
// bar as content-heavy pages.
export const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'daily', type: 'page', wordTarget: 500 },
  { path: '/features', priority: 0.95, changefreq: 'weekly', type: 'page', wordTarget: 500 },
  { path: '/pricing', priority: 0.95, changefreq: 'weekly', type: 'page', wordTarget: 400 },
  { path: '/fleetcopilot', priority: 0.9, changefreq: 'weekly', type: 'page', wordTarget: 500 },
  { path: '/about', priority: 0.7, changefreq: 'monthly', type: 'page', wordTarget: 250 },
  { path: '/contact', priority: 0.6, changefreq: 'monthly', type: 'page', wordTarget: 150 },
  { path: '/survey', priority: 0.5, changefreq: 'monthly', type: 'page', wordTarget: 150 },
  { path: '/investors', priority: 0.5, changefreq: 'monthly', type: 'page', wordTarget: 250 },
  { path: '/blog', priority: 0.8, changefreq: 'daily', type: 'page', wordTarget: 150 },
  { path: '/terms', priority: 0.3, changefreq: 'yearly', type: 'legal', wordTarget: 300 },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly', type: 'legal', wordTarget: 300 },
  { path: '/cookies', priority: 0.3, changefreq: 'yearly', type: 'legal', wordTarget: 300 },
  { path: '/dmca', priority: 0.3, changefreq: 'yearly', type: 'legal', wordTarget: 300 },
  { path: '/sms-terms', priority: 0.3, changefreq: 'yearly', type: 'legal', wordTarget: 300 },
];

// Routes that must never be prerendered or appear in the sitemap.
export const EXCLUDED_ROUTES = [
  '/admin/login',
  '/admin/blog',
  '/admin/blog/new',
  '/test',
  '/gtm-test',
  '/simple-gtm',
];

const today = () => new Date().toISOString().slice(0, 10);

// Extracts the `export const metadata = { ... }` object literal from an MDX
// file by brace-matching (string-literal aware), then evaluates it. Inputs are
// first-party content files, so a scoped Function eval is acceptable here.
function parseFrontmatter(source, file) {
  const marker = source.indexOf('export const metadata');
  if (marker === -1) {
    throw new Error(`No "export const metadata" found in ${file}`);
  }
  const start = source.indexOf('{', marker);
  if (start === -1) {
    throw new Error(`No metadata object opening brace in ${file}`);
  }

  let depth = 0;
  let inString = false;
  let quote = '';
  let end = -1;

  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    const prev = source[i - 1];

    if (inString) {
      if (ch === quote && prev !== '\\') inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      quote = ch;
      continue;
    }
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (end === -1) {
    throw new Error(`Unterminated metadata object in ${file}`);
  }

  const objectLiteral = source.slice(start, end + 1);
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${objectLiteral});`)();
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

let cachedPosts = null;

export function getBlogPosts() {
  if (cachedPosts) return cachedPosts;

  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  cachedPosts = files
    .map((file) => {
      const source = readFileSync(join(BLOG_DIR, file), 'utf8');
      const fm = parseFrontmatter(source, file);
      return {
        slug: fm.slug,
        title: fm.title,
        category: fm.category,
        tags: Array.isArray(fm.tags) ? fm.tags : [],
        publishDate: fm.publishDate,
        updatedDate: fm.updatedDate || fm.publishDate,
      };
    })
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  return cachedPosts;
}

export function getBlogPostRoutes() {
  return getBlogPosts().map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.7,
    changefreq: 'monthly',
    type: 'article',
    wordTarget: 500,
    lastmod: post.updatedDate,
  }));
}

export function getBlogTaxonomyRoutes() {
  const posts = getBlogPosts();
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  const tags = [...new Set(posts.flatMap((p) => p.tags).filter(Boolean))];

  const categoryRoutes = categories.map((category) => ({
    path: `/blog/category/${slugify(category)}`,
    priority: 0.5,
    changefreq: 'weekly',
    type: 'taxonomy',
    wordTarget: 100,
  }));

  const tagRoutes = tags.map((tag) => ({
    path: `/blog/tag/${slugify(tag)}`,
    priority: 0.4,
    changefreq: 'weekly',
    type: 'taxonomy',
    wordTarget: 100,
  }));

  return [...categoryRoutes, ...tagRoutes];
}

// Full list of routes to prerender + verify (excludes taxonomy by default to
// keep the prerender fast; pass { includeTaxonomy: true } to add them).
export function getAllPublicRoutes({ includeTaxonomy = false } = {}) {
  const routes = [
    ...STATIC_ROUTES.map((r) => ({ lastmod: today(), ...r })),
    ...getBlogPostRoutes(),
  ];
  if (includeTaxonomy) {
    routes.push(...getBlogTaxonomyRoutes().map((r) => ({ lastmod: today(), ...r })));
  }
  return routes;
}

// CLI: `node scripts/public-routes.mjs` prints the resolved route list.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const routes = getAllPublicRoutes({ includeTaxonomy: true });
  // eslint-disable-next-line no-console
  console.log(`Resolved ${routes.length} public routes:\n`);
  for (const r of routes) {
    // eslint-disable-next-line no-console
    console.log(`  ${r.path.padEnd(48)} [${r.type}] priority=${r.priority}`);
  }
}
