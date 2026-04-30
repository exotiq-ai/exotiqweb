# EXOTIQ BLOG CONTENT STRATEGY BRIEF

Purpose: align AI writing output (Claude) with Exotiq business goals, SEO performance, and LLM crawlability.

Owner: Exotiq
Last updated: 2026-02-26
Coverage window: 90 days (12 weeks)

---

## 0) Confirmed Product Decisions (Gregory)

These decisions are now locked unless changed later.

- Initial author: Gregory Ringler (Founder and CEO, Exotiq).
- Future state: multi-author support should be enabled in data model from day one.
- Launch content: 3-6 seed posts first, then continue through the 90-day calendar.
- Design direction: editorial-first readability in light mode, with dark mode toggle available.
- Conversion goals: education + demo bookings + newsletter + SEO traffic + social credibility.
- Analytics: track blog interaction events from day one.

### Best-practice architecture choices

1) CMS choice (recommended now)
- Use repo-based markdown/MDX for launch.
- Why: fastest, version-controlled, high quality control, easy to ship 3-6 seed posts quickly.
- Future upgrade path: add headless CMS only after publishing workflow volume demands it.

2) Rendering strategy (recommended now)
- Use pre-rendered static HTML for all blog routes (index, posts, category pages).
- Why: strongest practical crawlability for SEO + AI agents without full framework migration.
- Note: if content velocity and dynamic features increase, evaluate moving the blog surface to SSR/ISG.

3) TL;DR behavior (recommended now)
- Hybrid model:
  - Required static editor-reviewed TL;DR in every post (indexable and stable).
  - Optional dynamic "Rari summarize" interaction for alternate summary modes.
- Why: keeps search/LLM extraction reliable while enabling differentiated product UX.

4) Tag indexing policy (recommended now)
- Since launch starts with 3-6 posts, tag pages should be `noindex, follow` initially.
- Switch specific high-quality tag pages to index only when each has enough unique value (target 5+ strong posts).

5) AI disclosure policy (recommended now)
- Not legally required in every jurisdiction, but recommended for trust and brand clarity.
- Suggested line: "Rari helped edit this article."
- Place near author block or article footer.

---

## 1) Goals And Success Criteria

### Primary goals
- Build topical authority in AI-powered rental fleet operations.
- Drive qualified traffic from search (Google + AI answer engines).
- Convert readers to high-intent actions (demo, waitlist, ROI interactions).

### SEO and AI-crawl goals
- Every article is indexable, structurally consistent, and machine-readable.
- Every article includes clear summaries that can be retrieved by LLM systems.
- Topic clusters are internally linked to strengthen semantic relevance.

### Funnel goals
- TOFU: capture new audience and newsletter traffic.
- MOFU: educate and compare approaches to qualify operators.
- BOFU: convert high-intent readers to demo and sales conversations.

---

## 2) Audience And Voice

### Core audience
- Turo and multi-platform hosts scaling beyond hobby stage.
- Rental operators running 5-100+ vehicles.
- Fleet managers focused on utilization, margins, and automation.

### Voice profile
- Expert, direct, useful, and modern.
- Practical over fluffy.
- Confident but evidence-oriented.
- Light personality is welcome, but avoid hype-only claims.

### Tone constraints
- No generic filler.
- No unverified superlatives.
- No fake stats.
- Explain tradeoffs clearly when recommendations are not universal.

---

## 3) Information Architecture

### URL structure
- `/blog` -> main index
- `/blog/:slug` -> article detail
- `/blog/category/:category` -> category hubs
- `/blog/tag/:tag` -> tag collections (index only when page quality is high)
- `/blog/page/:n` -> pagination

### Category taxonomy (fixed set)
- `pricing-revenue-optimization`
- `fleet-operations`
- `turo-platform-strategy`
- `guest-experience-automation`
- `scale-and-profitability`

### Taxonomy rules
- One post must have one primary category.
- Each post should have 3-6 tags.
- Tags should be specific entities or tactics (not vague words).
- Do not create duplicate category meanings with near-identical labels.

---

## 4) Required Article Content Model

Use this model for every article (CMS or MDX frontmatter equivalent).

```yaml
title: ""
slug: ""
excerpt: "" # 140-180 chars
tldr_short: "" # 1-2 sentences
tldr_bullets: [] # 3-5 bullets
rari_summary_modes:
  quick: ""
  operator: ""
  investor: ""
primary_keyword: ""
secondary_keywords: []
search_intent: "" # informational | comparison | transactional
funnel_stage: "" # TOFU | MOFU | BOFU
category: ""
tags: []
author:
  name: ""
  role: ""
  bio: ""
  profile_url: ""
publish_date: ""
updated_date: ""
hero_image:
  src: ""
  alt: ""
  width: 0
  height: 0
og_image: ""
canonical_url: ""
meta_title: "" # <= 60 chars
meta_description: "" # <= 155 chars
faq_items: [] # optional, 2-5 if present
cta_type: "" # demo | waitlist | newsletter | calculator
cta_copy: ""
related_posts: []
schema_type: "BlogPosting"
```

---

## 5) Article Format Blueprint (For Claude)

Use this section template for consistency:

1. Hook + context (problem framing, 2-4 short paragraphs)
2. TL;DR block (short sentence + 3-5 bullets)
3. Core analysis sections (H2/H3 with clear action points)
4. Comparison table (when relevant: manual vs AI, tool A vs B, etc.)
5. Implementation checklist
6. Common mistakes / FAQs
7. Internal links to related Exotiq posts/pages
8. CTA aligned to funnel stage

### Length targets
- TOFU: 1,300-1,900 words
- MOFU: 1,500-2,200 words
- BOFU: 1,100-1,800 words

### Readability targets
- Paragraphs: 2-4 lines average.
- Use bullets frequently for operators scanning on mobile.
- Use direct language, concrete examples, and measurable takeaways.

---

## 6) "Rari TL;DR" Pattern

This is a signature UX/content feature and should appear in every article draft.

### Rari summary requirements
- A human-reviewed TL;DR must exist in the article body.
- Provide 3 summary modes:
  - `Quick` (30-second summary)
  - `Operator` (how to execute)
  - `Investor` (business impact and economics)
- Keep mode summaries faithful to article evidence.
- Avoid introducing claims not supported in the article.

### Suggested CTA copy variants
- "Too long? Let Rari break it down in 30 seconds."
- "Running ops right now? Tap for the operator summary."
- "Need the numbers only? Rari investor mode."

---

## 7) SEO Requirements (Per Post)

Every post must include:
- One clear primary keyword in title, intro, one H2, and conclusion.
- Semantic secondary keywords woven naturally (no stuffing).
- Unique `meta_title`, `meta_description`, canonical URL.
- Valid structured data (`BlogPosting` + `BreadcrumbList`).
- Internal links:
  - Minimum 3 links to relevant blog posts.
  - Minimum 1 link to core product/conversion page (`/features`, `/pricing`, `/survey`, etc.).
- External links only to high-trust sources when citing data.

### Snippet optimization
- Include a concise answer paragraph under the first H2 (40-60 words).
- Use numbered steps for process queries.
- Add one table for comparative queries when possible.

---

## 8) LLM Crawlability Requirements

To improve AI retrieval quality:
- Start each article with a concise abstract (what, who, why).
- Use explicit section headers that map to user intent.
- Include definitions for key terms on first mention.
- Provide summary bullets after complex sections.
- Use FAQ blocks with direct Q/A phrasing for high-value queries.
- Keep entity naming consistent (Exotiq, FleetCopilot, Turo, etc.).

Optional high-value add-ons:
- Publish `/llms.txt` and `/llms-full.txt` with curated content pointers.
- Maintain freshness by updating high-performing posts quarterly.

---

## 9) Internal Linking Strategy

### Rule set
- Every new post links to:
  - 2 older posts in same category,
  - 1 post in adjacent category,
  - 1 conversion page.
- Anchor text should be descriptive, not generic.
- Add a "Related reading" module near the end.

### Pillar and cluster pattern
- Pillar pages target broad intent.
- Cluster posts target long-tail variants and subproblems.
- Cluster posts must link back to the pillar page.

---

## 10) 90-Day Editorial Calendar (24 Posts)

Cadence: 2 posts per week
Mix target: TOFU 50%, MOFU 30%, BOFU 20%

| Week | Post | Primary Keyword | Stage | Category | CTA |
|---|---|---|---|---|---|
| 1A | Fleet Management Fundamentals For Rental Hosts | fleet management software for car rentals | TOFU | fleet-operations | newsletter |
| 1B | Turo Dynamic Pricing Playbook | turo dynamic pricing strategy | MOFU | pricing-revenue-optimization | calculator |
| 2A | Hidden Costs That Kill Fleet Profit | car rental fleet cost analysis | TOFU | scale-and-profitability | newsletter |
| 2B | Exotiq vs Spreadsheets: Operational Breakdown | fleet management spreadsheet alternative | BOFU | fleet-operations | demo |
| 3A | Utilization Benchmarks By Fleet Size | fleet utilization rate benchmark | TOFU | scale-and-profitability | newsletter |
| 3B | Automating Guest Messaging Workflows | automated guest messaging turo | MOFU | guest-experience-automation | demo |
| 4A | Preventive Maintenance Schedule Template | rental fleet maintenance schedule | TOFU | fleet-operations | newsletter |
| 4B | AI Pricing vs Manual Pricing | ai pricing for car rentals | MOFU | pricing-revenue-optimization | calculator |
| 5A | Direct Booking vs Marketplace Margin Math | direct booking vs turo profitability | TOFU | turo-platform-strategy | newsletter |
| 5B | SOPs For 10+ Car Fleet Operations | fleet operations SOP | MOFU | fleet-operations | demo |
| 6A | Insurance And Claims Workflow Guide | car rental claims process automation | TOFU | fleet-operations | newsletter |
| 6B | Exotiq Platform Deep Dive For Operators | ai fleet management platform demo | BOFU | scale-and-profitability | demo |
| 7A | Seasonal Demand Forecasting For Rentals | car rental demand forecasting | TOFU | pricing-revenue-optimization | newsletter |
| 7B | Multi-Platform Calendar Sync Guide | turo getaround calendar sync | MOFU | turo-platform-strategy | demo |
| 8A | The KPI Dashboard Every Host Needs | fleet KPI dashboard | TOFU | scale-and-profitability | newsletter |
| 8B | Reducing No-Shows And Late Returns | reduce late returns car rental | MOFU | guest-experience-automation | demo |
| 9A | Scaling From 5 To 20 Cars | scale turo fleet | TOFU | scale-and-profitability | newsletter |
| 9B | FleetCopilot Use Cases In Daily Ops | ai copilot for fleet operations | MOFU | guest-experience-automation | demo |
| 10A | Pricing Mistakes In Luxury Fleets | exotic car rental pricing mistakes | TOFU | pricing-revenue-optimization | newsletter |
| 10B | Exotiq vs Legacy Fleet Tools | best fleet management software for turo hosts | BOFU | fleet-operations | demo |
| 11A | Guest Messaging Scripts That Convert | car rental guest communication templates | TOFU | guest-experience-automation | newsletter |
| 11B | Maintenance Alerts And Uptime Gains | predictive maintenance car rental fleets | MOFU | fleet-operations | demo |
| 12A | 2026 Rental Fleet Operations Trends | rental fleet trends 2026 | TOFU | turo-platform-strategy | newsletter |
| 12B | Migration Checklist: Move To Exotiq | migrate to fleet management software | BOFU | scale-and-profitability | demo |

---

## 11) Funnel-Specific Writing Guidance

### TOFU (awareness)
- Objective: rank and attract.
- Angle: educational, problem-first, benchmark and template heavy.
- CTA: newsletter, checklist, or calculator soft conversion.

### MOFU (consideration)
- Objective: qualify and build preference.
- Angle: workflows, comparisons, strategic implementation depth.
- CTA: demo invite or product walkthrough action.

### BOFU (decision)
- Objective: convert high intent.
- Angle: alternatives, migration plans, ROI framing, objections.
- CTA: demo booking and sales conversation.

---

## 12) Claude Prompting Template (Copy/Paste)

Use this prompt whenever generating a post draft:

1) Role and constraints
- "You are writing as Exotiq's editorial strategist for fleet operators."
- "Write for SEO + LLM retrieval quality."
- "No fake metrics, no broad hype, no unverifiable claims."

2) Input packet
- Topic:
- Primary keyword:
- Secondary keywords:
- Funnel stage:
- Category:
- CTA type:
- Internal links to include:

3) Output requirements
- Return:
  - Meta title (<=60)
  - Meta description (<=155)
  - Excerpt (140-180)
  - TL;DR short
  - TL;DR bullets
  - Rari summaries (quick/operator/investor)
  - Full article in markdown with H2/H3 structure
  - FAQ section (3-5 Q/A)
  - JSON-LD draft for BlogPosting

4) Quality check
- "Confirm keyword appears naturally."
- "Confirm article has one clear opinion and one practical framework."
- "Confirm 3+ internal links and 1 conversion link are suggested."

---

## 13) Editorial QA Checklist (Before Publish)

- Keyword intent matches article angle.
- Metadata is unique and within length limits.
- TL;DR block is useful and not generic.
- Rari summaries are consistent with article facts.
- Internal links are relevant and descriptive.
- CTA matches funnel stage.
- At least one practical framework/checklist included.
- Any claims have citations or are framed as opinion/experience.

---

## 14) Notes For Implementation Team

- Keep article templates uniform to reduce production variance.
- Add update logs for high-traffic posts to preserve freshness signals.
- Ensure sitemap and canonicals are generated correctly for all new blog URLs.
- Ensure category/tag pages are not indexed until they meet quality thresholds.

