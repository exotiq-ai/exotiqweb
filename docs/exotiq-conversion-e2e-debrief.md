# Exotiq Conversion + E2E Upgrade Debrief

Date: 2026-05-25
Branch: `codex/exotiq-conversion-e2e`

## Outcome

This pass converted the site from a mostly content-led landing experience into a more measurable demo-conversion journey with automated checks around public routes, CTAs, forms, accessibility, performance, SEO, and deployment readiness.

The strongest near-term improvement is that the primary visitor paths now have clear actions:

- Book a demo through a single canonical Calendly URL.
- Calculate ROI / review plan fit through the pricing path.
- Submit a higher-intent contact form with company, role, fleet size, and timeline.
- Complete the survey with required lead capture before submission.

## What Changed

### Conversion Journey

- Centralized demo and ROI CTA behavior in shared utilities.
- Standardized CTA analytics event shape with `conversion_cta_click`.
- Updated header, mobile nav, hero, sticky CTA, pricing, feature, about, and FleetCopilot entry points to use the same conversion targets.
- Reworked the homepage hero to present `Calculate ROI` and `Book Demo` as the main above-the-fold actions.

### Lead Capture

- Reframed `/contact` as a demo request flow.
- Added required `company`, `role`, `fleetSize`, and `timeline` fields.
- Preserved optional phone capture and SMS consent behavior.
- Added accessible `id` and `htmlFor` wiring across the contact form.
- Added required lead capture to the survey completion flow.
- Passed lead metadata into survey persistence and form submission payloads.

### Attribution

- Added a shared attribution helper that records page, landing page, referrer, and UTM parameters.
- Attached attribution metadata to CTA clicks, contact submissions, and survey submissions.
- Passed attribution metadata into the Supabase form function for downstream Google Sheets and email context.

### E2E And QA

- Added Playwright with desktop and mobile projects.
- Added public route smoke coverage for key pages and 404 behavior.
- Added conversion CTA tests for desktop header, mobile nav, homepage hero, pricing CTAs, and mobile sticky CTA.
- Added contact and survey form submission tests with mocked network calls.
- Added accessibility smoke tests using `@axe-core/playwright`.
- Added performance budget smoke tests for `/` and `/pricing`.

### SEO And Deploy Hygiene

- Added `/blog` to the sitemap.
- Updated stale structured data values, including organization logo, LinkedIn URL, and pricing validity.
- Updated blog post fallback social image and publisher logo.
- Marked test pages as `noindex`.
- Expanded pre-deploy checks for public assets, sitemap route hygiene, and structured data freshness.
- Updated health-check chunk-size heuristics for intentional small lazy-loaded chunks.

## Verification

Fresh checks run in this branch:

- `npm run pre-deploy` passed.
- `npm run typecheck` passed.
- `npm run build` passed.
- `npm run test:e2e` passed: 42 passed, 4 skipped.
- `npm run test:a11y` passed: 10 passed.
- `npm run test:perf` passed: 4 passed.
- `npm run verify-build` passed.
- `npm run health-check` passed after updating the small-chunk allowlist.
- `npm run deploy-safe` passed.
- `git diff --check` passed.

One non-blocking gap remains:

- `npm run lint` still fails with the repo's existing strict lint backlog, mostly unused imports, `any` usage, and fast-refresh warnings across older files. That should be handled as a separate lint-hardening phase rather than bundled into this conversion pass.

## Recommended This-Week Execution Plan

1. Review the site locally with the new CTA journey and form flows.
2. Confirm the canonical demo URL and whether `https://calendly.com/hello-exotiq/30min` is the final sales booking path.
3. Confirm the destination schema for attribution metadata in Google Sheets / CRM.
4. Merge and deploy after a quick human content pass.
5. Add analytics dashboard views for `conversion_cta_click`, contact submissions, and survey completions.
6. Run one focused copy/design refinement pass on the homepage story after live feedback.
7. Start a dedicated lint-cleanup branch so `npm run lint` can become a required CI gate.

## Human Review Checklist

- Does the homepage clearly say who Exotiq is for in the first viewport?
- Does every major page offer either demo booking or ROI review without competing CTAs?
- Does the contact form ask enough to qualify demos without feeling heavy?
- Are survey leads routed to the right operational follow-up?
- Is the Calendly path correct for production?
- Are UTM/referrer fields showing up correctly in downstream reporting?
