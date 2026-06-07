# Exotiq.ai SEO Visibility and Authority Audit

Prepared by Avi on 2026-06-07.

## Executive summary

Exotiq.ai is not showing reliably in search because the site still has two foundational problems:

1. **The SEO/LLM updates merged to `main` are not live.**
   - GitHub `main` includes PR #4: `3db74c5 Add SEO LLM handoff and AI text resources`.
   - Netlify live deploy for `https://exotiq.ai` is from **2026-05-28**, before PR #4 was merged on 2026-06-03.
   - The Netlify site `papaya-dieffenbachia-760a16` is **not connected to a repo** (`build_settings {}`, `repo None`), so GitHub merges do not auto-deploy.

2. **The live public routes are still SPA-shell-only for raw crawlers.**
   - Raw fetch for `/`, `/features`, `/pricing`, `/fleetcopilot`, `/blog`, and blog posts returns the same generic HTML shell.
   - Raw HTML has no H1, no canonical, about 11 visible words, and one generic Organization schema.
   - Route-specific content exists only after JavaScript renders.

Until both are fixed, more copy alone will not produce strong visibility because crawlers and AI retrieval systems do not get enough first-pass page content.

## Live deploy evidence

Netlify project:

- Site name: `papaya-dieffenbachia-760a16`
- Site ID: `7f094e40-b734-4475-8a2c-3ea90587f5ed`
- URL: `https://exotiq.ai`
- Admin: `https://app.netlify.com/projects/papaya-dieffenbachia-760a16`
- Repo: `None`
- Build settings: `{}`
- Published deploy: `6a17ca582a68dc2d59417f4d`
- Published at: `2026-05-28T04:53:48.996Z`
- Commit ref: `None`

GitHub repo:

- Local branch: `main`
- Current HEAD: `3db74c5 Add SEO LLM handoff and AI text resources (#4)`
- PR #4 merged: `2026-06-03T12:52:13Z`

Conclusion: the repo was updated, but the live Netlify site did not deploy the update.

## Live raw HTML audit

Checked live routes:

- `/`
- `/features`
- `/pricing`
- `/fleetcopilot`
- `/blog`
- `/blog/turo-dynamic-pricing-playbook-2026`
- `/contact`
- `/about`

Every checked route returned:

- status: `200`
- content type: `text/html; charset=UTF-8`
- bytes: about `5724`
- title: `exotiq — The AI command center for exotic car rental operations`
- meta description: `exotiq is the AI command center for exotic car rental operators. Automate pricing, maintenance, and operations to scale profitably.`
- canonical: missing
- H1: missing
- visible words: about `11`
- schema count: `1`

This is the biggest crawlability problem.

## Live AI/LLM resource audit

Live:

- `/llms.txt`: still old, 625 bytes.
- `/llms-full.txt`: returns homepage HTML shell, not text.
- `/agents.txt`: returns homepage HTML shell, not text.
- `/ai-content.txt`: old text, no 2026 update addendum.
- `/ai-training-content.txt`: old text, no 2026 update addendum.
- `/robots.txt`: old version, does not explicitly reference `/llms-full.txt` or `/agents.txt`.

Local GitHub `main` has the improved versions, but Netlify has not deployed them.

## What Exotiq should show up for

### Branded terms, should be non-negotiable

These should rank #1 once the site is indexed properly and deployed consistently:

- `exotiq`
- `exotiq ai`
- `exotiq.ai`
- `exotiq fleet management`
- `exotiq pricing`
- `exotiq FleetCopilot`
- `MotorIQ Exotiq`
- `Drive Exotiq operator platform`

If Exotiq does not show for these, that is a technical/indexing/entity issue, not a content-volume issue.

### Near-term niche terms, realistic within weeks/months with crawlability fixed

These are lower-volume but high-intent and specific enough to win with focused content:

- `AI fleet management software for exotic car rental operators`
- `exotic car rental fleet management software`
- `exotic car rental software`
- `luxury car rental management software`
- `Turo host fleet management software`
- `fleet management software for Turo hosts`
- `AI pricing software for car rentals`
- `dynamic pricing software for exotic car rentals`
- `direct booking software for car rental operators`
- `car rental fleet operations software`
- `rental fleet document management software`
- `AI assistant for car rental business`

### Mid-term competitive terms

These require content depth and authority/backlinks:

- `car rental management software`
- `fleet management software`
- `vehicle rental software`
- `rental car CRM`
- `booking software for car rentals`
- `best car rental software`
- `Turo pricing tool`
- `Turo automation software`

### Long-term authority terms

These require high-quality content clusters, backlinks, brand mentions, and product proof:

- `AI fleet management`
- `dynamic pricing software`
- `fleet analytics dashboard`
- `automotive SaaS`
- `rental marketplace software`

## What is missing to demand authority

### 1. Deployment pipeline authority

Right now the live site is manually deployed and disconnected from GitHub. This breaks SEO iteration.

Fix:

- Connect Netlify project `papaya-dieffenbachia-760a16` to `github.com/exotiq-ai/exotiqweb`, or
- Manually deploy current `main` now, then connect CI/CD immediately after.

### 2. Crawlable HTML authority

Google can render JavaScript, but relying on JS rendering for every signal is weak. AI crawlers and many SEO tools often do not render fully.

Fix:

- Implement the Vite prerender/static HTML handoff in `docs/frontend-crawlability-html-handoff.md`.
- Every public route should have real route-specific HTML, H1, body text, canonical, meta description, and schema before JS.

### 3. Search Console operational authority

DNS shows Google verification exists:

- `google-site-verification=mAe_VZn5y88rkX6RLaOujYfkLjW403_ns8WVoPL0qwQ`

But we need active Search Console operations:

- Submit sitemap.
- Request indexing for homepage, features, pricing, FleetCopilot, blog index, and top blog posts.
- Inspect URL status.
- Review coverage/indexing errors.
- Review whether Google sees rendered content.

### 4. Entity authority

Google needs to understand that Exotiq is a real entity.

Build/align profiles:

- LinkedIn company page, updated with exact `Exotiq`/`Exotiq.ai` naming.
- X/Twitter profile.
- GitHub org public description and website.
- Crunchbase or Wellfound profile if appropriate.
- Product Hunt launch when product proof is ready.
- YouTube or demo video page.
- Schema `sameAs` links to verified profiles.
- Consistent NAP/entity details: company name, logo, founder, domain, social URLs.

### 5. Topical authority

The site needs crawlable content clusters, not only a polished homepage.

Core cluster:

- `Exotic Car Rental Software: What Operators Need in 2026`
- `AI Dynamic Pricing for Exotic Car Rentals`
- `Turo vs Direct Booking for Exotic Rental Operators`
- `Fleet Management for Turo Hosts Scaling Past 5 Cars`
- `Rental Fleet Compliance Checklist`
- `Direct Booking CRM for Exotic Car Rentals`
- `How to Improve Exotic Rental Fleet Utilization`
- `Best Car Rental Management Software for Luxury and Exotic Fleets`

Each post should link to:

- `/features`
- `/pricing`
- `/fleetcopilot`
- relevant module anchors/sections
- contact/demo CTA

### 6. Proof authority

Claims like `40% revenue increase`, `$120M+ fleet assets`, `89% utilization`, `85% less admin work` need either proof or safer framing.

Authority-building assets:

- real case study or founder operator story
- calculator methodology page
- security/data handling page
- public roadmap / changelog
- feature screenshots with alt text
- customer/operator quotes if verified
- comparisons vs spreadsheets, Turo-only ops, and generic rental software

### 7. Backlink and mention authority

Without external mentions, even good pages can sit invisible.

Near-term backlink targets:

- founder LinkedIn posts linking to key pages
- Drive Exotiq / Exotiq Rent properties linking to Exotiq.ai operator pages
- GitHub org and public repos linking to Exotiq.ai
- operator partner pages where possible
- relevant directories: SaaS, fleet management, car rental software, startup profiles
- podcast/newsletter/local business mentions
- guest posts or data studies around exotic rental operations

## Priority action plan

### P0, this week

1. Deploy current GitHub `main` to Netlify production.
2. Connect Netlify site to `exotiq-ai/exotiqweb` so future merges auto-deploy.
3. Verify live files:
   - `/llms.txt`
   - `/llms-full.txt`
   - `/agents.txt`
   - `/ai-content.txt`
   - `/ai-training-content.txt`
4. Submit/resubmit `/sitemap.xml` in Search Console.
5. Request indexing for core URLs.

### P1, next

1. Implement Vite prerender/static HTML for public routes.
2. Add route verifier to fail on missing H1/canonical/low word count.
3. Generate sitemap from actual routes and blog posts.
4. Add canonical tags in raw HTML via prerender.

### P2, after crawlability

1. Rewrite homepage H1 to: `AI Fleet Management Software for Exotic Car Rental Operators`.
2. Build content cluster for exotic rental software + Turo host scaling + AI pricing.
3. Add claim methodology and proof pages.
4. Add entity schema `sameAs` links.
5. Build backlinks/mentions from owned properties and external profiles.

## Bottom line

Exotiq is not missing a better visual website. It is missing deployment hygiene, crawlable route HTML, and external/entity authority. The highest-impact fix is not an Astro migration yet. The highest-impact fix is:

1. deploy the already-merged SEO/LLM resources,
2. connect Netlify to GitHub,
3. prerender public routes,
4. submit/index in Search Console,
5. then build authority with crawlable content clusters and real proof.
