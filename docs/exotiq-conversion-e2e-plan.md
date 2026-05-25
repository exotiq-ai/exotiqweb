# Exotiq Conversion + E2E Upgrade Plan

## Summary

Run this from the local git worktree at `/Users/g.r./.codex/worktrees/2f48/project 3` on branch `codex/exotiq-conversion-e2e`.

Primary outcome: make `exotiq.ai` tell one clean conversion story from problem to ROI to plan fit to demo booked, while adding enough automated E2E, SEO, analytics, accessibility, and deployment coverage to trust future changes.

## Execution Model

- Orchestrator owns branch state, integration, reviews, final verification, and human debrief.
- Use scoped subagents for independent work with disjoint file ownership.
- Keep no more than three implementation agents active at once.
- Each subagent must use the repo plan, avoid reverting others' changes, report changed paths, and run its assigned verification.
- Commit after each phase with focused messages.

## Phase 1: Branch, Repo Plan, And Quality Gates

Goal: make the repo safe for agent work before broad changes.

- Fix `npm run pre-deploy`, currently failing because `scripts/pre-deployment-check.js` and `SEOHead.tsx` disagree on the expected image.
- Add a `typecheck` script using `tsc -p tsconfig.app.json --noEmit`.
- Make `npm run typecheck` pass by fixing real TypeScript errors, including the missing `scrollToSection` prop on the home hero.
- Keep `npm run build` passing.
- Do not spend this phase chasing every stylistic lint issue unless it blocks touched files or type safety.
- Adjust Rollup visualizer so production and CI builds do not auto-open the report.

Acceptance:

- `npm run pre-deploy` passes.
- `npm run typecheck` passes.
- `npm run build` passes.
- `git status` shows only intentional tracked changes.

## Phase 2: E2E Baseline

Goal: create repeatable browser coverage for the current public journey.

- Add Playwright with scripts `test:e2e` and, if useful locally, `test:e2e:ui`.
- Cover desktop and mobile for `/`, `/features`, `/pricing`, `/contact`, `/survey`, `/blog`, one known blog post, `/fleetcopilot`, and an unknown route.
- Assert each route has visible page-specific content, no blank shell, no critical console errors, and no broken primary CTA.
- Add CTA tests for header demo, pricing demo, ROI demo, home hero CTA, mobile nav, and mobile sticky CTA.
- For external Calendly links, assert URL target and tracking event shape; do not require opening Calendly.
- Add form-path smoke tests for contact and survey using mocked network responses where needed.

Acceptance:

- `npm run test:e2e` passes locally against Vite preview.
- E2E artifacts are gitignored.
- Tests cover the primary conversion path.

## Phase 3: Conversion Journey Upgrade

Goal: make the site's story and CTAs converge on qualified demos.

- Make the homepage hero primary actions `Calculate ROI` and `Book Demo`.
- Remove the broken `View Platform Features` behavior or wire it correctly as a secondary scroll action.
- Centralize Calendly URLs and CTA labels; default public demo CTA should use one agreed sales link, with stale `month=2025-07` params removed.
- Simplify mobile sticky CTA to one primary demo action and one genuinely different secondary action, such as `Calculate ROI`.
- Make pricing the conversion source of truth: ROI to plan fit to demo.
- Convert contact from a generic message form into a demo-oriented `Talk to Exotiq` form with company, role, fleet size, timeline, and message.
- Fix survey lead capture by collecting name and email before final submission.
- Keep founder survey as a secondary research path, not the main demo path.

Acceptance:

- Homepage above the fold clearly communicates who Exotiq is for, what pain it solves, and the next action.
- All demo CTAs use centralized labels and URLs.
- Contact and survey cannot submit required lead fields empty.
- E2E CTA and form tests pass.

## Phase 4: Analytics And Attribution

Goal: make conversion reporting coherent.

- Replace fragmented CTA tracking with one lightweight helper used by header, homepage, pricing, contact, survey, blog CTAs, and sticky CTA.
- Standard event name: `conversion_cta_click`.
- Event payload shape: `location`, `action`, `page`, `destination`, `tier`, `fleet_size`, `billing`, `utm_source`, `utm_medium`, `utm_campaign`, and `referrer`.
- Keep current pricing-specific metadata only if downstream dashboards need it; otherwise map pricing events into the shared event.
- Add attribution to form submissions as a JSON metadata field appended to the existing Google Sheets row, preserving current column order.
- Mount active analytics only from the real app shell, not unused `Layout`.
- Respect cookie consent for non-essential analytics where controlled by app code.

Acceptance:

- Demo CTA clicks push one normalized event with location and page.
- Contact and survey submissions include attribution metadata without breaking existing email notifications.
- Consent/network tests cover app-controlled analytics behavior.

## Phase 5: SEO And Deployment Reliability

Goal: prevent deploy and bot-indexing drift.

- Fix structured data asset references to existing public assets.
- Update expired `priceValidUntil`.
- Add `/blog` to sitemap and ensure public app routes and sitemap stay aligned.
- Ensure admin/test routes are noindex or unavailable in production navigation and are absent from sitemap.
- Add validation for OG image, schema logo, manifest icons, sitemap URLs, and JSON-LD parseability.
- Confirm Netlify SPA fallback works for real deep links without hiding missing assets.
- Add a documented deploy-preview bot check for Googlebot and social user agents.

Acceptance:

- `npm run pre-deploy` includes asset, schema, and sitemap checks and passes.
- Public sitemap URLs return 200.
- Missing assets are not masked by SPA fallback.
- Route metadata is correct for home, pricing, features, blog, and contact.

## Phase 6: Visual, Accessibility, And Performance QA

Goal: catch human-facing issues automation usually misses.

- Add Playwright screenshots for desktop and mobile versions of home, pricing, contact, survey, blog, and mobile nav.
- Add `@axe-core/playwright` checks for core routes and forms.
- Verify keyboard navigation through header, mobile menu, cookie banner, contact form, survey, and pricing CTA.
- Check sticky CTA does not cover footer or form controls on mobile.
- Add Lighthouse or equivalent performance budget for home and pricing.
- Fix visible issues found during screenshots: overlapping text, unclear CTA hierarchy, mobile overflow, unusable tap targets, or contrast failures.

Acceptance:

- Visual screenshots show no obvious layout breaks at mobile and desktop widths.
- Axe checks pass with no serious or critical violations on core routes.
- Performance budget is documented and passes locally or has explicit known exceptions.

## Phase 7: Final Review And Human Debrief

Goal: finish with confidence and a usable human summary.

- Run the full gate: `npm run pre-deploy`, `npm run typecheck`, `npm run build`, `npm run test:e2e`, and accessibility/performance scripts added in Phase 6.
- Review git diff phase by phase for scope creep.
- Produce a human debrief covering what changed, before/after conversion journey, test coverage added, remaining risks, and follow-up experiments for next week.
- Open a PR from `codex/exotiq-conversion-e2e` to `main`.
- Include screenshots or Playwright artifacts in the PR summary if practical.
- Do not merge until the human reviews the debrief and test results.

## Assumptions

- Primary business goal this week is demos booked, not broad brand redesign.
- The main demo link should be centralized and stale calendar query params removed.
- Survey is secondary to demo booking unless a user explicitly chooses Founder Circle.
- Full lint cleanup is valuable but not the first blocker; passing typecheck, build, pre-deploy, and E2E are higher priority.
