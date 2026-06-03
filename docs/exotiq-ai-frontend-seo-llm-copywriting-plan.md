# Exotiq.ai Frontend Parseability, SEO, Robots, LLM, and Copywriting Improvement Plan

Prepared by Avi on 2026-06-02.

Repository: `https://github.com/exotiq-ai/exotiqweb`  
Local path: `/Users/gbot/Projects/exotiqweb`  
Live site audited: `https://exotiq.ai`

## 1. Executive summary

The Exotiq.ai frontend is a polished Vite/React SPA with strong product concepts, real module structure, existing blog MDX content, route-level `SEOHead`, a sitemap, robots file, and a thin `llms.txt`.

The main blocker is not lack of content. The main blocker is that the content is not present in the initial HTML that crawlers and AI retrievers receive.

After cloning the repo and running `npm run build`, the production output confirms the live audit finding:

- `dist/index.html` is the only HTML document.
- Initial HTML contains no page-specific H1/H2 body content.
- Initial HTML has no canonical tag.
- Initial HTML word count is about 9 visible words.
- Every public route depends on client-side React rendering for page-specific content and metadata.

This means the site can look good to users and still underperform for:

- Google first-pass crawling.
- Bing and non-Google crawlers.
- AI answer engines.
- SEO tools.
- Link unfurlers.
- Blog article retrieval.
- LLM citation and summarization.

The highest-leverage fix is to make public marketing and blog routes statically rendered or prerendered before JavaScript.

## 2. Current repo facts

### Framework and routing

Files:

- `package.json`
- `vite.config.ts`
- `index.html`
- `src/App.tsx`
- `src/components/SEOHead.tsx`

Current architecture:

- Vite 5 + React 18.
- `react-router-dom` BrowserRouter.
- Lazy-loaded pages in `src/App.tsx`.
- Route metadata injected client-side via `react-helmet-async`.
- Blog content exists as local MDX under `src/content/blog/*.mdx` and is loaded via `import.meta.glob` in `src/lib/blog.ts`.

Routes in `src/App.tsx`:

- `/`
- `/about`
- `/features`
- `/pricing`
- `/contact`
- `/survey`
- `/investors`
- `/fleetcopilot`
- `/terms`
- `/privacy`
- `/cookies`
- `/dmca`
- `/sms-terms`
- `/blog`
- `/blog/category/:category`
- `/blog/tag/:tag`
- `/blog/:slug`
- admin/test routes

### Static files

Files:

- `public/robots.txt`
- `public/sitemap.xml`
- `public/llms.txt`

Missing from repo:

- `public/llms-full.txt`
- `public/agents.txt`
- `public/ai-content.txt`
- `public/ai-training-content.txt`
- `public/sitemap-index.xml`

Live site currently has `ai-content.txt` and `ai-training-content.txt`, but they are not present in the freshly cloned repo. That means the live deploy may include older artifacts, generated artifacts, or files outside this repo.

### Build verification

Command run:

```bash
npm install
npm run build
```

Result:

- Build passed.
- 474 packages installed.
- 5 moderate npm audit vulnerabilities reported.
- Browserslist/caniuse-lite is stale.
- Vite build output confirms SPA-only HTML.

## 3. Critical audit findings

### Finding 1: Public route HTML is not parseable enough

Direct raw build check:

- `/`: title exists, no H1, no canonical, ~9 visible words.
- `/features`: same issue.
- `/pricing`: same issue.
- `/blog/turo-dynamic-pricing-playbook-2026`: same issue.

Cause:

- The public app is a client-rendered SPA.
- `SEOHead` only runs after React mounts.
- Blog content is bundled into JS and rendered on the client.

Impact:

- Search engines and AI crawlers that do not fully render JS get little useful content.
- Blog articles are weakly retrievable despite being in the sitemap.
- Route-specific canonical/title/description may be missed by lightweight crawlers.

### Finding 2: `SEOHead` is useful but client-only

File:

- `src/components/SEOHead.tsx`

It includes:

- Title
- Description
- Keywords
- Canonical
- OG/Twitter
- Article metadata
- Structured data

Problem:

- All of this is injected after JavaScript hydration.
- It does not solve initial HTML parseability.

### Finding 3: sitemap is static and stale in places

File:

- `public/sitemap.xml`

Issues:

- Several `lastmod` values are old (`2024-12-23`) despite active page changes.
- Blog URLs are manually listed.
- No categories/tags are included, despite route support.
- No `llms-full.txt`, `ai-content.txt`, or `agents.txt` references.
- No generated validation against actual route/content list.

### Finding 4: LLM files are underpowered or missing

Current `public/llms.txt` is only 20 lines. It points to routes but does not explain the product in enough detail for answer engines.

Missing files should be added:

- `/llms-full.txt`
- `/agents.txt`
- `/ai-content.txt`
- `/ai-training-content.txt`

### Finding 5: pricing copy conflicts exist

Files:

- `src/data/pricingData.ts`
- `src/services/openai.ts`
- `src/pages/InvestorPage.tsx`

Current `pricingData.ts` model:

- Starter: `$29/vehicle/month`, minimum `$79/month`, 1-10 vehicles.
- Professional: `$399/month`, up to 25 vehicles, `$22/vehicle` over 25.
- Business: `$899/month`, up to 75 vehicles, `$18/vehicle` over 75.
- Enterprise: `$1,799/month`, up to 150 vehicles, `$15/vehicle` over 150.

But `src/services/openai.ts` fallback says:

> Our pricing starts at $49/month for up to 5 vehicles.

That is outdated and should be fixed immediately because it can answer visitors with wrong pricing.

Investor page also references pricing/business model language that should be reconciled with the canonical pricing table.

### Finding 6: claims need validation or softened wording

Examples:

- `$120M+ in fleet assets`
- `40% revenue increase in 90 days`
- `85% less admin work in 90 days`
- `89% average utilization rate`
- `$47K average cost of one compliance failure`
- `Trusted by operators managing over $120M in fleet assets`
- testimonial cards with named operators and quantified outcomes

If these are verified, they should be supported with source/methodology notes. If modeled or illustrative, label them as modeled/illustrative and avoid implying guaranteed results.

### Finding 7: homepage H1 is not category-explicit enough

Current H1 in `src/components/HomeHeroSection.tsx`:

> AI Fleet Intelligence That Saves Time and Accelerates Growth

This is polished but broad. It does not directly own the high-intent category.

Recommended H1:

> AI Fleet Management Software for Exotic Car Rental Operators

Recommended subheadline:

> Exotiq gives exotic and luxury rental fleets one command center for pricing, bookings, maintenance, compliance, guest communication, and marketplace growth.

## 4. North-star positioning

Exotiq should repeatedly and consistently define itself as:

> AI fleet management software for exotic and luxury car rental operators.

Expanded definition:

> Exotiq helps exotic rental fleets replace fragmented calendars, spreadsheets, DMs, manual pricing, compliance reminders, and marketplace-only workflows with one AI-powered command center.

Audience:

- Independent exotic/luxury car rental operators.
- Turo hosts scaling beyond side-hustle operations.
- Multi-vehicle rental entrepreneurs.
- Operators trying to move more revenue direct.
- Fleets with compliance, maintenance, pricing, and guest messaging complexity.

Category moat:

- Built for exotic/luxury rental workflows, not generic economy rental counters.
- AI pricing + operations assistant + direct booking + compliance + marketplace path.
- Bridges SaaS command center with Drive Exotiq marketplace demand.

## 5. Technical implementation plan

### Phase 1: Fix parseability before deeper copy expansion

Goal: Every public route should return useful initial HTML before JavaScript.

Recommended path options:

#### Option A, best long-term: migrate public marketing site to Next.js or Astro

Pros:

- Native SSG/SSR.
- Easy per-route metadata.
- Better blog generation.
- Better sitemap generation.
- Better LLM/AI text generation.

Cons:

- Larger migration.
- Need to port existing components/routes.

#### Option B, fastest with current repo: add Vite prerendering

Use a prerender strategy such as:

- `vite-plugin-ssr` / Vike, or
- a static prerender script using Playwright/Puppeteer after `vite build`, or
- React SSR entry plus route manifest.

Minimum requirements:

- Generate static HTML files for all public routes.
- Do not prerender admin routes.
- Ensure each generated HTML includes route-specific metadata and body content.
- Add a test that fails when prerendered routes have no H1.

Recommended first implementation in this repo:

1. Create route manifest:
   - `src/data/publicRoutes.ts`
   - Include all static public routes and generated blog routes from MDX metadata.
2. Add prerender build step:
   - `npm run build` -> Vite build.
   - `npm run prerender` -> generate `dist/<route>/index.html` files.
3. Update scripts:
   - `build`: `vite build && node scripts/prerender-public-routes.mjs`
   - Or add `build:prerender` first until stable.
4. Add smoke verifier:
   - Check each public route HTML has title, meta description, canonical, H1, and >300 visible words for major pages/blog posts.

### Phase 2: Generate sitemap and LLM files from source of truth

Create source-of-truth route/content model:

- `src/data/siteMeta.ts`
- `src/data/publicRoutes.ts`
- Use blog frontmatter from `src/content/blog/*.mdx`

Generate:

- `public/sitemap.xml`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/agents.txt`
- `public/ai-content.txt`
- `public/ai-training-content.txt`

Add script:

```bash
node scripts/generate-seo-artifacts.mjs
```

Then wire into build/predeploy:

```json
{
  "generate:seo": "node scripts/generate-seo-artifacts.mjs",
  "build": "npm run generate:seo && vite build && node scripts/prerender-public-routes.mjs"
}
```

### Phase 3: Schema upgrade

Add schema per page in initial/prerendered HTML:

Homepage:

- `Organization`
- `WebSite`
- `SoftwareApplication`
- `FAQPage`

Features:

- `SoftwareApplication`
- `ItemList` for modules
- `BreadcrumbList`
- `FAQPage`

Pricing:

- `SoftwareApplication`
- `OfferCatalog`
- `FAQPage`
- `BreadcrumbList`

Blog:

- `Blog`
- `BlogPosting`
- `Person` / `Organization` author
- `FAQPage` where frontmatter has FAQs
- `BreadcrumbList`

Contact:

- `ContactPage`
- `Organization`

About:

- `AboutPage`
- `Organization`

### Phase 4: Copy rewrite and proof cleanup

Rewrite public copy after the parseability fix, so improved copy is crawlable immediately.

Prioritize:

1. Homepage hero and above-fold CTA.
2. Features page hero and module naming.
3. Pricing page canonical plan/pricing copy.
4. FleetCopilot page workflow examples.
5. Blog titles/intros/FAQ snippets.
6. LLM/AI text files.
7. Investor page separation or noindex decision.

## 6. Page-by-page copywriting plan

### Homepage

File:

- `src/components/HomeHeroSection.tsx`
- `src/pages/HomePage.tsx`

Current H1:

> AI Fleet Intelligence That Saves Time and Accelerates Growth

Recommended H1:

> AI Fleet Management Software for Exotic Car Rental Operators

Recommended subheadline:

> Exotiq gives exotic and luxury rental fleets one command center for pricing, bookings, maintenance, compliance, guest communication, and marketplace growth.

Recommended support bullets:

- Automate pricing around demand, events, utilization, and vehicle class.
- Keep bookings, documents, maintenance, and customer history in one place.
- Move more revenue direct while keeping a path into the Drive Exotiq marketplace.
- Ask FleetCopilot for schedule, pricing, compliance, and guest workflow help.

Recommended CTAs:

- Primary: `Book a 15-minute operator walkthrough`
- Secondary: `Calculate ROI`
- Tertiary: `Explore platform modules`

Recommended trust strip:

- Built for exotic/luxury rental operators.
- Best fit for fleets scaling beyond 5 vehicles.
- Pricing, bookings, docs, analytics, and AI operations in one system.

### Features page

File:

- `src/pages/FeaturesPage.tsx`

Recommended H1:

> Fleet Management Features Built for Exotic Rental Operators

Recommended subheadline:

> Exotiq combines AI pricing, live fleet analytics, direct bookings, compliance tracking, and an AI operations assistant in one command center for high-value rental fleets.

Module naming should pair brand names with plain-English names:

- `MotorIQ — AI Dynamic Pricing`
- `Pulse — Fleet Analytics Dashboard`
- `Book — Direct Booking, Calendar, CRM, and Payments`
- `Vault — Compliance, Insurance, and Document Tracking`
- `FleetCopilot — AI Operations Assistant`

Claims should be rewritten depending on validation:

If verified:

- Add methodology/source note.

If not verified:

- Change `Operators see 40% revenue increase and 85% less admin work in 90 days` to:
  - `Designed to help operators improve utilization, reduce admin work, and protect more direct-booking revenue in the first 90 days.`

### Pricing page

Files:

- `src/pages/PricingPage.tsx`
- `src/data/pricingData.ts`
- `src/components/pricing/*`
- `src/services/openai.ts`

Immediate fix:

- Update `src/services/openai.ts` fallback pricing from `$49/month for up to 5 vehicles` to the canonical pricing model.

Recommended pricing SEO title:

> Exotiq Pricing — AI Fleet Management Software for Exotic Rental Operators

Recommended meta description:

> See Exotiq pricing for exotic and luxury rental fleets. Compare Starter, Professional, Business, and Enterprise plans for AI pricing, bookings, fleet analytics, compliance, and FleetCopilot workflows.

Recommended above-fold copy:

> Simple pricing that scales with your fleet. Start with core fleet operations, then add deeper AI forecasting, marketplace support, multi-location workflows, and enterprise controls as you grow.

Add ROI methodology text:

- Define utilization assumptions.
- Define ADR assumptions.
- Explain AI pricing improvement assumptions.
- State individual results vary.

### FleetCopilot page

File:

- `src/pages/FleetCopilotDemoPage.tsx`

Recommended H1:

> FleetCopilot: AI Operations Assistant for Exotic Rental Fleets

Recommended subheadline:

> Ask questions, check schedules, surface pricing opportunities, coordinate turnarounds, and identify operational risks without digging through spreadsheets or message threads.

Add example prompts:

- `Which cars are idle this weekend?`
- `Show me pickups, returns, and maintenance conflicts today.`
- `Which vehicles should I reprice for the next event weekend?`
- `What insurance or registration deadlines need attention?`
- `Draft pickup instructions for today's renters.`

Add controls/safety copy:

- Role-based permissions.
- Human approval for sensitive actions.
- Audit trail for pricing/booking/document changes.
- Decision support, not guaranteed business/legal advice.

### Blog

Files:

- `src/content/blog/*.mdx`
- `src/lib/blog.ts`
- `src/pages/BlogPage.tsx`
- `src/pages/BlogPostPage.tsx`

Current blog content is strategically useful but loses SEO value if not prerendered.

Immediate tasks:

1. Prerender every MDX post.
2. Add static Article schema in HTML.
3. Add H1/title consistency checks.
4. Add FAQ sections where useful.
5. Add internal product CTA per post.

Priority new or refreshed articles:

1. `Exotic Car Rental Software: What Operators Need in 2026`
2. `Turo vs Direct Booking: How Exotic Fleets Keep More Revenue`
3. `AI Dynamic Pricing for Exotic Car Rentals: Events, Utilization, and Floor Rates`
4. `Fleet Management for Turo Hosts Scaling Past 5 Cars`
5. `Rental Fleet Compliance Checklist for Exotic Car Operators`
6. `Best Car Rental Management Software for Luxury and Exotic Fleets`
7. `How to Reduce Admin Work in an Exotic Rental Business`
8. `Fleet Utilization Benchmarks for Exotic and Luxury Rental Operators`
9. `Direct Booking Website and CRM Setup for Exotic Rentals`
10. `How AI Helps Price Exotic Rentals Around Local Events`

### About page

File:

- `src/pages/AboutPage.tsx`

Recommended angle:

> Built from the real chaos of running exotic rental operations.

Strengthen:

- Operator origin story.
- Why generic fleet tools miss this market.
- Why Exotiq combines SaaS + marketplace path.
- What workflows were painful enough to build around.

Avoid:

- Unsupported claims like “only” or “best” unless sourced.

### Contact page

File:

- `src/pages/ContactPage.tsx`

Recommended segmentation:

- Fleet operator looking for software.
- Operator interested in Drive Exotiq marketplace listing.
- Investor/partner.
- Renter/customer support.

Add copy:

> Tell us your fleet size, market, current booking channels, and biggest operational bottleneck. We will route you to the right walkthrough or partnership path.

### Investor page

File:

- `src/pages/InvestorPage.tsx`

Decision needed:

- Keep indexed if Exotiq wants public investor discovery.
- Add `noindex` if operator acquisition and conversion should dominate search signals.

If indexed:

- Ensure investor-specific schema and canonical.
- Keep investor terms separate from operator SaaS pages.

If noindex:

- Add `noindex` to `SEOHead` for `/investors`.
- Remove or lower priority in sitemap.

## 7. Keyword architecture

### Core category keywords

- exotic car rental software
- luxury car rental software
- exotic fleet management software
- AI fleet management software
- car rental management software
- rental fleet management software
- Turo host management software
- rental car operations software
- direct booking software for car rentals
- AI dynamic pricing for car rentals

### Module keyword clusters

MotorIQ:

- rental car dynamic pricing software
- AI pricing for car rentals
- Turo pricing automation
- fleet revenue optimization
- event-based car rental pricing

Pulse:

- fleet analytics dashboard
- rental fleet utilization tracking
- car rental KPI dashboard
- luxury fleet analytics

Book:

- direct booking platform for car rentals
- car rental CRM
- rental booking calendar software
- reduce Turo platform fees

Vault:

- rental car compliance software
- fleet document management
- insurance expiration tracking
- rental agreement automation

FleetCopilot:

- AI assistant for car rental business
- voice assistant for fleet operations
- AI operations assistant for rental fleets
- rental fleet workflow automation

Drive Exotiq:

- exotic car rental marketplace
- luxury car rental marketplace
- list exotic car rental fleet
- direct booking marketplace for exotic rentals

## 8. Recommended `/llms.txt`

```text
# Exotiq.ai

Exotiq is AI fleet management software for exotic and luxury car rental operators.

## Best short summary
Exotiq helps exotic rental fleets manage pricing, bookings, customers, documents, maintenance, analytics, and AI-powered workflows from one command center, with a path to Drive Exotiq marketplace demand.

## Primary audience
- Independent exotic and luxury car rental operators
- Turo hosts scaling past side-hustle operations
- Multi-vehicle rental entrepreneurs
- Operators who want more direct bookings and cleaner fleet operations

## Product modules
- MotorIQ: AI dynamic pricing and revenue optimization
- Pulse: fleet analytics, utilization tracking, and live operations dashboard
- Book: direct booking, calendar, CRM, and payments
- Vault: compliance, insurance, registration, agreements, and document alerts
- FleetCopilot: AI operations assistant for fleet questions, workflows, and scheduling

## Primary pages
- Homepage: https://exotiq.ai/
- Platform/features: https://exotiq.ai/features
- Pricing: https://exotiq.ai/pricing
- FleetCopilot: https://exotiq.ai/fleetcopilot
- Blog: https://exotiq.ai/blog
- Contact: https://exotiq.ai/contact

## Machine-readable resources
- Full LLM context: https://exotiq.ai/llms-full.txt
- AI content summary: https://exotiq.ai/ai-content.txt
- AI training/product context: https://exotiq.ai/ai-training-content.txt
- Sitemap: https://exotiq.ai/sitemap.xml
- Robots: https://exotiq.ai/robots.txt
```

## 9. Recommended verification gates

Add script/test to verify after build:

For each public route:

- Status or local file exists.
- HTML contains exactly one H1.
- HTML contains canonical link.
- HTML contains meta description.
- HTML contains route-specific title.
- HTML visible word count is above threshold:
  - homepage/features/pricing: >500 words
  - blog posts: >800 words where expected
  - legal pages: >300 words
- HTML contains JSON-LD where expected.
- No public route accidentally uses admin/test metadata.

For static files:

- `/robots.txt` exists.
- `/sitemap.xml` validates XML.
- `/llms.txt` exists and includes product summary.
- `/llms-full.txt` exists and includes module summaries.
- `/agents.txt` exists or is intentionally omitted from robots/sitemap.
- `/ai-content.txt` and `/ai-training-content.txt` exist if referenced.

## 10. Immediate implementation backlog

### P0: Crawlability/AI retrieval

- [ ] Add public route manifest.
- [ ] Add prerender or migrate to SSG framework.
- [ ] Generate static HTML for all public routes.
- [ ] Add route HTML verifier.
- [ ] Add `llms-full.txt`, `agents.txt`, `ai-content.txt`, `ai-training-content.txt`.
- [ ] Expand `llms.txt`.
- [ ] Generate sitemap from actual routes/content.

### P1: Copy and trust cleanup

- [ ] Rewrite homepage H1/subheadline/CTA/trust strip.
- [ ] Update Features H1 and module labels.
- [ ] Reconcile all pricing copy to `src/data/pricingData.ts`.
- [ ] Fix stale chatbot fallback pricing in `src/services/openai.ts`.
- [ ] Validate or soften quantified claims.
- [ ] Add claim methodology notes to ROI sections.

### P2: Blog/content expansion

- [ ] Prerender current MDX posts.
- [ ] Refresh current article titles/intros/FAQs.
- [ ] Add 10 priority SEO articles.
- [ ] Add internal linking from posts to relevant module pages/sections.
- [ ] Add Article + FAQ schema.

### P3: Conversion polish

- [ ] Add primary hero CTA above fold.
- [ ] Consider reducing excessive vertical whitespace under hero.
- [ ] Move ROI/demo path closer to top.
- [ ] Segment Contact route by persona.
- [ ] Decide investor page index/noindex.

## 11. Open decisions for Gregory

1. Should I keep this Vite/React app and add prerendering, or migrate public marketing/blog routes to Astro/Next?
2. Are the quantified metrics/testimonials verified, anonymized, modeled, or placeholders?
3. Should `/investors` remain indexed?
4. Should `exotiq.ai` stay operator/SaaS only while `exotiq.rent` handles renter marketplace SEO?
5. Is the pricing model in `src/data/pricingData.ts` authoritative?

## 12. Recommended next action

Start with a low-risk branch in `exotiqweb`:

```bash
git checkout -b seo-llm-prerender-copy-plan
```

Then implement in this order:

1. Fix stale pricing answer in `src/services/openai.ts`.
2. Add expanded LLM/AI text files.
3. Add generated sitemap/route manifest.
4. Add prerendered HTML for all public routes.
5. Add verifier script.
6. Rewrite homepage/features/pricing copy.
7. Run `npm run build`, route verifier, and live browser QA.

This order gets fast wins while protecting the bigger SEO/AI parseability fix.
