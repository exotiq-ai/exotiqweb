# Frontend Crawlability HTML Handoff for Coding Agent

Prepared by Avi on 2026-06-02.

## Mission

Make `https://exotiq.ai` public pages parseable in initial HTML before JavaScript runs, while preserving the current visual design and React frontend experience.

Gregory likes the current site visually. Do **not** do a redesign or Astro/Next migration unless explicitly directed. The recommended path is to keep the existing Vite/React app and add static prerendering for public marketing/blog routes.

## Current repo

- Repo: `https://github.com/exotiq-ai/exotiqweb`
- Framework: Vite 5 + React 18 + `react-router-dom`
- Route file: `src/App.tsx`
- SEO component: `src/components/SEOHead.tsx`
- Blog source: `src/content/blog/*.mdx`
- Blog loader: `src/lib/blog.ts`
- Static assets: `public/`

## Problem to solve

Current Vite build emits a single SPA shell:

- `dist/index.html`
- No route-specific H1 in raw HTML
- No route-specific body text in raw HTML
- No canonical in raw HTML
- Route-specific metadata is injected client-side by `react-helmet-async`
- Blog MDX content is client-rendered and not visible to raw crawlers

This hurts:

- AI answer-engine retrieval
- non-rendering crawlers
- SEO tools
- link unfurlers
- first-pass crawler quality
- blog article discoverability

## Non-goals

- Do not redesign the site.
- Do not change visual component structure unless required for prerender correctness.
- Do not migrate to Astro/Next in this pass.
- Do not prerender admin/test routes.
- Do not remove React interactivity.
- Do not create fake proof claims or hard-code unsupported metrics.

## Required public routes to prerender

Static routes from `src/App.tsx`:

- `/`
- `/about`
- `/features`
- `/pricing`
- `/contact`
- `/survey`
- `/investors` pending index/noindex decision, but still should render if public
- `/fleetcopilot`
- `/terms`
- `/privacy`
- `/cookies`
- `/dmca`
- `/sms-terms`
- `/blog`

Dynamic blog routes:

- Every MDX post under `src/content/blog/*.mdx`, using its frontmatter `slug`.

Optional taxonomy routes:

- `/blog/category/:category` for categories generated from frontmatter
- `/blog/tag/:tag` for tags generated from frontmatter

Do not prerender:

- `/admin/login`
- `/admin/blog`
- `/admin/blog/new`
- `/admin/blog/:id/edit`
- `/test`
- `/gtm-test`
- `/simple-gtm`

## Recommended implementation approach

### Option chosen for this pass: Vite prerender

Keep Vite/React. Add a post-build static prerender step that renders public routes into individual HTML files under `dist/`.

Acceptable technical approaches:

1. Playwright/Puppeteer post-build prerender:
   - `vite build`
   - serve `dist` locally
   - open each public route in headless Chromium
   - wait for React route content and Helmet metadata
   - serialize final HTML
   - write `dist/<route>/index.html`

2. React SSR entry:
   - More elegant but may require larger refactor because pages use browser APIs, lazy imports, animations, and services.

Given speed and low visual risk, prefer approach #1 first.

## Suggested files to add

### `scripts/public-routes.mjs`

Responsibilities:

- Define static public routes.
- Read `src/content/blog/*.mdx` frontmatter to derive blog slugs, categories, and tags.
- Export route list for sitemap generation, prerendering, and verification.

Route object shape:

```js
{
  path: '/features',
  priority: 0.95,
  changefreq: 'weekly',
  lastmod: '2026-06-02',
  type: 'page'
}
```

### `scripts/prerender-public-routes.mjs`

Responsibilities:

1. Start a local static server for `dist`.
2. For each public route:
   - navigate to `http://127.0.0.1:<port><path>`
   - wait for `main h1` or route-specific content
   - wait for network idle or a short stable delay
   - serialize `document.documentElement.outerHTML`
   - write route HTML to:
     - `/` -> `dist/index.html`
     - `/features` -> `dist/features/index.html`
     - `/blog/foo` -> `dist/blog/foo/index.html`
3. Preserve Vite script/style asset links.
4. Fail if route renders the fallback/404 unexpectedly.

Important: ensure React Router works on direct route paths during local static serving. The server should fallback to `dist/index.html` for SPA routes during prerender.

### `scripts/verify-prerendered-routes.mjs`

Responsibilities:

For each public route HTML file, assert:

- `<title>` exists and is route-specific where expected.
- `<meta name="description">` exists.
- `<link rel="canonical">` exists.
- At least one `<h1>` exists.
- Visible word count threshold:
  - homepage/features/pricing/fleetcopilot/blog posts: ideally >500 words
  - legal pages: >300 words
  - contact/survey: >150 words
- Admin/test routes are not in sitemap/prerender manifest.
- No route has only the generic SPA shell.

### `scripts/generate-seo-artifacts.mjs`

Responsibilities:

- Generate `public/sitemap.xml` from public route manifest and blog frontmatter.
- Optionally generate `public/sitemap-index.xml`, or intentionally do not serve it. If created, it must be valid XML and not fallback HTML.
- Keep lastmod fresh for changed content.

## Package script changes

Recommended scripts:

```json
{
  "generate:seo": "node scripts/generate-seo-artifacts.mjs",
  "build:spa": "vite build",
  "prerender": "node scripts/prerender-public-routes.mjs",
  "verify:prerender": "node scripts/verify-prerendered-routes.mjs",
  "build": "npm run generate:seo && npm run build:spa && npm run prerender && npm run verify:prerender"
}
```

If changing the existing `build` script feels risky, first add:

```json
{
  "build:prerendered": "npm run generate:seo && vite build && npm run prerender && npm run verify:prerender"
}
```

Then switch deployment after validation.

## Metadata requirements

Each prerendered public route must include the final Helmet output:

- route-specific `<title>`
- route-specific `<meta name="description">`
- `<link rel="canonical" href="https://exotiq.ai/...">`
- OG/Twitter tags
- route-specific structured data when present

If Helmet output is not being captured by the prerender, fix that before proceeding.

## Blog requirements

Blog routes are important SEO assets.

For each `src/content/blog/*.mdx` post:

- Generate `/blog/<slug>/index.html`.
- Include article H1 and body content in initial HTML.
- Include BlogPosting JSON-LD.
- Include canonical URL.
- Include meta title/description from frontmatter.
- Include TL;DR/Rari summary content if currently rendered.

## SEO/AI text files already prepared

Avi added these files in this branch:

- `public/llms.txt`
- `public/llms-full.txt`
- `public/agents.txt`
- `public/ai-content.txt`
- `public/ai-training-content.txt`

Do not remove them. Ensure the deployment serves them as `text/plain` and does not route them to SPA fallback HTML.

`public/robots.txt` now explicitly allows:

- `/llms.txt`
- `/llms-full.txt`
- `/agents.txt`
- `/ai-content.txt`
- `/ai-training-content.txt`
- `/sitemap.xml`

## Immediate low-risk copy fix already made

Avi updated `src/services/openai.ts` fallback pricing from stale `$49/month for up to 5 vehicles` to the pricing model in `src/data/pricingData.ts`.

Verify it still passes lint/build.

## Recommended homepage copy adjustment after prerender works

Current H1:

> AI Fleet Intelligence That Saves Time and Accelerates Growth

Recommended H1:

> AI Fleet Management Software for Exotic Car Rental Operators

Recommended subheadline:

> Exotiq gives exotic and luxury rental fleets one command center for pricing, bookings, maintenance, compliance, guest communication, and marketplace growth.

This copy change is high-value, but do it after prerendering or in the same PR only if verification passes.

## Verification commands

Run:

```bash
npm run build
npm run lint
```

Then manually inspect raw route HTML:

```bash
python3 - <<'PY'
from pathlib import Path
from bs4 import BeautifulSoup
routes = ['/', '/features', '/pricing', '/fleetcopilot', '/blog/turo-dynamic-pricing-playbook-2026']
for route in routes:
    path = Path('dist/index.html') if route == '/' else Path('dist' + route + '/index.html')
    html = path.read_text()
    soup = BeautifulSoup(html, 'html.parser')
    text = soup.get_text(' ', strip=True)
    print(route)
    print('  title:', soup.title.string if soup.title else None)
    print('  canonical:', soup.find('link', rel='canonical')['href'] if soup.find('link', rel='canonical') else None)
    print('  h1:', [h.get_text(' ', strip=True) for h in soup.find_all('h1')])
    print('  words:', len(text.split()))
PY
```

Pass condition:

- No route should show empty H1.
- No route should have only the generic SPA shell.
- Blog post route should expose article body text in raw HTML.

## Deployment notes

If Netlify is used, ensure direct route refreshes still work:

- `/features`
- `/pricing`
- `/blog/<slug>`

If prerender writes physical `index.html` files per route, Netlify should serve those first. Keep SPA fallback for routes not physically generated, but do not allow public text files like `/llms-full.txt` or `/agents.txt` to fall through to the SPA.

## Why not Astro/Next now?

Astro or Next would be better long-term for marketing/blog SEO, but Gregory is happy with the visual state and wants speed. Vite prerendering should deliver most crawlability/LLM benefits without a redesign or full migration.

Migrate later only if:

- prerendering becomes brittle,
- blog/editor workflows require SSR,
- SEO content operations need richer static generation,
- or the public site grows into many landing pages.

## Done definition

The task is complete when:

- All public routes have static HTML output.
- Raw HTML contains route-specific title, description, canonical, H1, and body content.
- Blog posts are visible in raw HTML.
- Sitemap is generated from actual routes and posts.
- LLM/AI text files are served as text, not SPA fallback.
- `npm run build` and verifier pass.
- Browser visual QA confirms the site still looks the same.
