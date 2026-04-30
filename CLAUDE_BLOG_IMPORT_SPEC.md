# Exotiq Claude Blog Import Spec

Use this exact format for any Claude-generated post that will be pasted into the Exotiq blog importer.

## Required wrapper format (must match exactly)

The parser expects these exact section headers:

- `## **Metadata**`
- `## **Full Article**`

Metadata must be inside a fenced code block (YAML), like this:

```md
## **Metadata**

```yaml
# metadata keys here
```

## **Full Article**

Article markdown here...
```

## YAML metadata schema (use exact keys)

```yaml
title: "..."
slug: "..."
excerpt: "..."
tldr_short: "..."
tldr_bullets:
  - "..."
rari_summary_modes:
  quick: "..."
  operator: "..."
  investor: "..."
primary_keyword: "..."
secondary_keywords:
  - "..."
search_intent: "informational" # informational | comparison | transactional
funnel_stage: "TOFU" # TOFU | MOFU | BOFU
category: "fleet-operations"
tags:
  - "fleet-operations"
author:
  name: "Gregory Ringler"
  role: "Founder & CEO"
  bio: "..."
  profile_url: "https://..." # optional
meta_title: "..."
meta_description: "..."
canonical_url: "https://exotiq.ai/blog/..." # optional but recommended
cta_type: "newsletter" # demo | waitlist | newsletter | calculator
cta_copy: "..."
related_posts: # optional
  - "another-slug"
disclosure: "Rari helped edit this article." # optional
```

## Allowed values

- `search_intent`: `informational`, `comparison`, `transactional`
- `funnel_stage`: `TOFU`, `MOFU`, `BOFU`
- `cta_type`: `demo`, `waitlist`, `newsletter`, `calculator`

## Slug and taxonomy rules

- Slug must be lowercase kebab-case, unique, no dates unless needed.
- Tags should also be kebab-case for URL consistency.
- Category should match one of the current active production categories:
  - `fleet-operations`
  - `pricing-revenue-optimization`
  - `scale-and-profitability`
- Future categories are planned but not currently active in the importer taxonomy:
  - `turo-platform-strategy`
  - `guest-experience-automation`

## Current canonical blog slugs (avoid collisions)

- `fleet-management-fundamentals-rental-hosts`
- `turo-dynamic-pricing-playbook-2026`
- `utilization-benchmarks-by-fleet-size`
- `preventive-maintenance-schedule-template`
- `ai-pricing-vs-manual-pricing-for-rental-fleets`
- `exotiq-vs-spreadsheets-fleet-operations-breakdown`
- `hidden-costs-fleet-profit` (new canonical slug)

Canonical note:
- The slugs above are treated as canonical for existing routed content.
- Internal links must use these exact slugs (no near-match variants).

## Internal linking rules

- Only link to existing routes/slugs.
- Prefer relative internal links, example:
  - `/blog/utilization-benchmarks-by-fleet-size`
- Do not invent near-miss slugs (for example, `...-fleet-size` when canonical is `...-by-fleet-size`).

## Article body rules

- Do not include a top-level `# H1` in the article body (the app renders H1 from metadata title).
- Start body content with intro paragraph or `##` heading.
- Keep headings to `##` and `###` for table-of-contents extraction.
- Ensure all external links are `https://` and non-placeholder.

## Author defaults

Use this default author block unless explicitly overridden:

```yaml
author:
  name: "Gregory Ringler"
  role: "Founder & CEO"
  bio: "Gregory Ringler is the Founder and CEO of Exotiq.ai, building AI-powered fleet management systems for rental fleet operators."
```

## FAQ handling

- Launch default: FAQ content can remain in article body (acceptable).
- Phase 2 enhancement: also populate structured FAQ metadata (`faq_items`) for richer schema support.
- If `faq_items` is provided, use this format:

```yaml
faq_items:
  - question: "What is ...?"
    answer: "..."
```

## Authoring checklist before final output

- Slug is unique and canonical.
- Metadata keys and enum values are valid.
- Category and tags follow production taxonomy.
- Internal links resolve to valid routes.
- No body `# H1`.
- Meta title and description are concise and SEO-safe.
- Author block uses the default biography unless instructed otherwise.
- FAQ is either body-only (launch) or body + `faq_items` (phase 2).

## Copy/paste template for Claude output

```md
## **Metadata**

```yaml
title: ""
slug: ""
excerpt: ""
tldr_short: ""
tldr_bullets:
  - ""
rari_summary_modes:
  quick: ""
  operator: ""
  investor: ""
primary_keyword: ""
secondary_keywords:
  - ""
search_intent: "informational"
funnel_stage: "TOFU"
category: "fleet-operations"
tags:
  - ""
author:
  name: "Gregory Ringler"
  role: "Founder & CEO"
  bio: "Gregory Ringler is the Founder and CEO of Exotiq.ai, building AI-powered fleet management systems for rental fleet operators."
meta_title: ""
meta_description: ""
cta_type: "newsletter"
cta_copy: ""
```

## **Full Article**

Intro paragraph...

## Section

Content...
```
