# Blog Portal Release Checklist

## Frontend smoke
- `/blog` loads with no console hook errors.
- `/blog/:slug` renders article content after hard refresh.
- Invalid blog slug shows fallback state.
- Category and tag pages show the same source universe as blog index.
- `/admin/login` signs in and redirects to requested admin route.

## Workflow and security smoke
- Author can save draft content but cannot directly publish via table update.
- Author can submit for review using allowed transition path.
- Editor/Admin can publish through transition flow.
- Unauthorized edge function write attempts return `403`.
- Workflow audit rows are created for status transitions.

## SEO/content checks
- `public/sitemap.xml` matches active blog routes.
- Canonical URLs resolve correctly on blog detail pages.
- Tag noindex behavior is intentional and validated.

## Incident readiness
- Break-glass env defaults are disabled.
- Break-glass runbook is accessible to on-call owners.
