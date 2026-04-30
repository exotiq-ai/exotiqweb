# Blog Phase 2 TODO

Purpose: track post-launch upgrades that are intentionally deferred from Phase 1.

## Priority backlog

- [ ] Add true SSR/ISG blog rendering path (or move blog surface to an SSR-native framework) for maximum crawl reliability at scale.
- [ ] Automate sitemap generation from MDX metadata on build.
- [ ] Add RSS feed generation and submit to distribution channels.
- [ ] Add JSON-LD `ItemList` schema for blog index and category pages.
- [ ] Add author profile page(s) with `Person` schema and social links.
- [ ] Add robust pagination (`/blog/page/:n`) if post count grows beyond single-page index.
- [ ] Add article-level OpenGraph image generation pipeline.
- [ ] Add "copy quote" and "highlight share" interactions for social distribution.
- [ ] Add full-text search index optimization (Fuse.js or pre-built index) once posts exceed 30.
- [ ] Add webhook workflow for auto-indexing pings after publish.

## Observability improvements

- [ ] Build blog analytics dashboard (scroll depth, TL;DR usage, CTA conversion by post).
- [ ] Add attribution model for social -> blog -> conversion journeys.
- [ ] Add cohort view for returning readers and newsletter-to-demo conversion.

## Content operations

- [ ] Add editorial status fields (draft, ready, published, refresh-needed).
- [ ] Add stale-content monitor and quarterly update reminders.
- [ ] Add "last reviewed by" and changelog snippet on long-lived articles.

