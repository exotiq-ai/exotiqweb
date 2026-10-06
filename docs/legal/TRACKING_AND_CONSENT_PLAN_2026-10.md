# Tracking, consent and cookie-claim plan — exotiq.ai

Date: 2026-10-06 · Owner: Gregory Ringler · Status: PLAN (Phase A is being built on branch `fix/legal-accuracy-2026-10`; nothing here is deployed until Gregory drops a new `dist`).
Not legal advice. Items marked **COUNSEL** need a lawyer's answer before they ship.

## 1. What the site really does today (measured, not assumed)

Measured with Playwright against a fresh browser on 2026-10-06, production-equivalent build.

| Moment | Third parties contacted | Cookies set | Other storage |
|---|---|---|---|
| First visit, no choice | googletagmanager.com, google-analytics.com, fonts.googleapis.com, fonts.gstatic.com | none | `exotiq_performance_metrics` |
| After "Essential only" | same, plus google.com | `exotiq_consent` (180 days) | `exotiq_cookie_preferences` |
| After "Accept all" | adds connect.facebook.net (Meta), us-assets.i.posthog.com (PostHog), assets.apollo.io and aplo-evnt.com (Apollo) | `_ga`, `_ga_E5GG9Y4151` (browser-capped about 400 days), `_fbp` and `_fbc` (90 days), `ph_phc_…_posthog` (365 days), Apollo `__cf_bm` | PostHog keys, `apolloAnonId`, Apollo queue keys |

How consent is wired (`src/utils/trackers.ts`, `src/components/CookieConsentBanner.tsx`): opt-in, everything defaults to denied. GA4 uses Google Consent Mode v2 (default denied, updated on choice). PostHog starts opted out. Meta Pixel and Apollo load only on "marketing". Apollo is switched on by `VITE_ENABLE_APOLLO=true` in the local `.env`, so every `dist` you build locally ships it.

## 2. Claims on the published pages that are wrong today

Both the live pages and the June 14 app legal suite carry the same text.

| # | Claim | Reality | Fix (Phase A) |
|---|---|---|---|
| 1 | Cookie Policy §2.4: "does not use advertising, cross-site tracking, social media tracking, retargeting" | Meta Pixel (`_fbp`) loads on marketing consent since 2026-09-05 | Replace with an accurate Marketing category naming Meta Pixel and Apollo, consent-gated |
| 2 | Cookie Policy: analytics cookies last 24 months | `_ga` about 13 months in modern browsers, PostHog 12 months | Correct durations to the measured values |
| 3 | Cookie Policy: consent cookie lasts 12 months | 180 days | Change to 180 days |
| 4 | Cookie Policy §3 and EEA text: non-essential tech only after prior consent | Before any choice the page already calls Google (Tag Manager, Analytics pings, Fonts) | Disclose it now; remove it in Phase B |
| 5 | Cookie Policy §3: "Cookie Settings" link in the footer | No such link exists | Build it (Phase A, code) |
| 6 | Privacy Policy third-party table | Omits Meta, Google Analytics and Tag Manager, PostHog, Apollo, Calendly, Google Fonts | Add them, each marked consent-gated or not |
| 7 | Privacy Policy and Cookie Policy: no description of Global Privacy Control | No GPC code exists | Build GPC handling (Phase A, code) and describe it |
| 8 | Cookie Policy lists `driveexotiq.com` and not `book.exotiq.rent` | Renter app lives on book.exotiq.rent | Cover both; domain list owned by the handoff doc |

## 3. Opt-in or opt-out — the honest answer

"Everybody opts in by default" is not what the market does. The common pattern is a **geo split**: opt-in in the EU, UK and Switzerland (where the law requires prior consent), opt-out with Global Privacy Control honored in the US (where it does not). Sites using a consent platform usually ship exactly that default.

What the law actually requires in the US, for a site with ad pixels:

- No state requires opt-in for cookies on adults. The state privacy laws (California and the many that followed) require notice, an easy opt-out of "sale/sharing" and targeted advertising, and recognition of Global Privacy Control. The Meta Pixel counts as "sharing" for cross-context behavioral advertising. California has fined companies for ignoring GPC.
- B2B does not exempt a visitor. A fleet operator browsing your site is a consumer under these laws.
- **COUNSEL:** California's wiretap statute (CIPA) is being used in private suits against ad pixels that fire before consent. Opt-out is lawful under the privacy statutes but that litigation risk is real for the Meta Pixel specifically, much less for first-party analytics.

Recommendation, in two stages:

1. **Now (Phase A):** stay opt-in everywhere. It is already what the code does, it is legal everywhere, and it lets the policy be made true by editing text plus two small code additions. Nothing about tracking power changes.
2. **Next (Phase B), once counsel answers the CIPA question:** move to the geo split. EU, UK and Swiss visitors opt-in; US visitors opt-out for first-party analytics (PostHog) and, if counsel agrees, for Meta; Global Privacy Control turns advertising off everywhere. This matches the decision already made for the renter app, so one policy can describe both sites.

You lose some signal staying opt-in in the interim. Phase B's cookieless measurement recovers most of it without any consent risk.

## 4. Maximum trackability that stays compliant

| Tool | What to do | Needs consent? | Phase |
|---|---|---|---|
| PostHog | Turn on `cookieless_mode: 'on_reject'`. Visitors who decline are still counted (anonymous, no cookie, no storage). Serve PostHog through a first-party path (`/ingest/*` in `public/_redirects`, which the dist drop honors) to survive ad blockers | Cookieless counts: no in the US, **COUNSEL** for EU/UK. Full tracking: analytics consent | B |
| GA4 | Keep Consent Mode v2. In EU/UK, do not load Google at all until consent (also removes the pre-consent calls above). Honor GPC | Yes, in EU/UK | A (disclose), B (gate) |
| Meta Pixel | Load on marketing consent (opt-in) or US opt-out default if counsel agrees. Add Meta Conversions API for the demo-booked and form-submit events, sent from a Supabase edge function with hashed email, only for visitors whose marketing choice allows it. CAPI improves match rates and ad-blocker resilience; it is not a way around consent | Yes | B (pixel policy), C (CAPI) |
| Apollo | Decide whether you want it (see section 7). If kept: disclose it, keep it marketing-gated. Set `VITE_ENABLE_APOLLO=false` in `.env` if not | Yes | A |
| Google Fonts | Self-host Inter and Manrope (Inter's file is already in `public/fonts`). Removes a pre-consent transfer of every visitor's IP to Google | No longer applicable | B |
| Cloudflare | See section 5 | — | — |

## 5. Where Cloudflare fits

Today DNS is on NS1 and the site is served by Netlify. Cloudflare is not in the path.

- **Cloudflare Web Analytics** can be added as a single script without moving DNS. By Cloudflare's published description it sets no cookies and keeps no per-visitor identifiers, so it works as a consent-free sanity baseline for traffic counts. I will re-check Cloudflare's docs before wiring it.
- **Zaraz, geo detection and a WAF** only work if Cloudflare proxies the domain. That means moving nameservers off NS1/Netlify DNS. That is a risky change for a hand-dropped site and buys little today, since PostHog and GA4 already cover analytics.
- **Recommendation:** add the Web Analytics beacon in Phase B if you want a second opinion on traffic. Do not move DNS. For geo, use the cheaper options in section 6.

## 6. Phases

**Phase A, on branch `fix/legal-accuracy-2026-10` (in progress)**
- Footer "Cookie Settings" control that reopens the preferences dialog.
- Global Privacy Control recognized: GPC forces marketing off and is shown in the dialog.
- Cookie Policy and Privacy Policy text corrected per section 2.
- Cookie inventory table rebuilt from the measured data.

**Phase B, after counsel answers and you pick a geo method**
- Geo method: visitors in Europe get opt-in, fail-closed. Candidate signals: Netlify edge geo (if it works with a dist drop), or a conservative browser-timezone and language check as a stopgap. **COUNSEL** to bless.
- Banner copy for the geo split, "Your Privacy Choices" footer link, Notice at Collection.
- PostHog cookieless mode and first-party proxy.
- Stop loading Tag Manager and gtag before consent in EU/UK.
- Self-host fonts.

**Phase C, build**
- Meta Conversions API via Supabase edge function.
- Optional Cloudflare Web Analytics beacon.
- Server-side consent log for EU/UK proof of consent.

## 7. Decisions needed from Gregory

1. Is Apollo's website visitor identification something you actually use? If not, switch it off and delete it from the disclosures.
2. Meta Pixel in the US: opt-out (more signal, more CIPA exposure) or opt-in (less signal, least risk)? Counsel should answer before Phase B.
3. Who is counsel for this, MKT-14 or a separate privacy review?
