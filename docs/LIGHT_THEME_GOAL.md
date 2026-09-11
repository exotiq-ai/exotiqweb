# exotiq.ai Light Theme — Goal-State Specification

**Status:** Proposal only. Not started. No prior light-theme plan exists in this repo.
**Decision (2026-07-04):** Staying dark. Revisit only if a G1/G2 evidence gate below is met.
**Prior art:** `DARK_THEME_LOCK.md` (Dec 2024) deliberately removed the light theme and toggle, and recommends staying dark-only. This document supersedes nothing — it defines what "done right" looks like *if* we ever decide to build it.
**Recommendation:** Do not build Phase 2 (full light theme) without the evidence gates below. Phase 0 is worth doing regardless.

---

## 1. Why this is written as a gated plan

The site's dark cinematic identity is a deliberate, recently-reinforced investment (Koenigsegg hero, dark-canvas header work, dark blog — the last five commits on `main` are dark-theme polish). A light theme is not a toggle flip here:

- **40 of 84 components hardcode dark palette classes** (`bg-dark-900`, `bg-black`, raw hex). Only 30 use theme-aware `dark:` variants. There is no semantic token layer — colors are baked into utility classes per component.
- **The brand accent fails on white.** Gulf Blue `#6EC1E4` has a ~2.0:1 contrast ratio on white — it cannot be text, a link, or a CTA label on a light surface (WCAG AA needs 4.5:1 for text, 3:1 for large text/UI). A light theme forces a *darker Gulf Blue* (`primary-900 #2e5d76` ≈ 7.1:1 passes; `primary-700 #4a8fb0` ≈ 3.6:1 passes only for large text/UI). This visibly changes the perceived brand color.
- **The photography doesn't translate.** The cinematic hero, scrims, and gradients are tuned for dark canvases. On white they read as gray murk, not drama.
- **Permanent 2× QA surface.** Every future page, component, and screenshot ships in two themes forever.

### Evidence gates (what would justify each phase)

| Gate | Evidence required | Unlocks |
|---|---|---|
| G0 | None — pure refactor value | Phase 0 (tokens) |
| G1 | Blog/long-form engagement data showing read-depth or bounce problems; or repeated prospect feedback that dark long-form is hard to read | Phase 1 (editorial light surfaces) |
| G2 | Direct evidence theme is costing conversions — e.g., session recordings, sales-call feedback from conservative fleet-operator buyers, or an A/B test on a single light landing page that outperforms | Phase 2 (full light theme) |

If G2 evidence never appears, Phase 2 never happens, and Phases 0–1 were still worth it.

---

## 2. Design vision: "Showroom Daylight"

If we build it, the light theme is **not the dark site inverted**. It is the same brand photographed in a different light: the dark theme is the car at night on wet asphalt; the light theme is the same car in a daylight showroom — porcelain, glass, brushed metal, hard shadows.

### Aesthetic principles

1. **Porcelain, never white.** Base surface is warm off-white (`#F7F5F2` family), with elevation moving *toward* white, not gray. Pure `#FFFFFF` is reserved for cards/elevated surfaces so depth reads without borders.
2. **Deep Gulf ink replaces bright Gulf glow.** On dark, Gulf Blue is a neon accent. On light, it becomes a deep pigment (`#2e5d76`–`#1f4358` range) used like editorial ink: headlines, rules, CTAs. Performance Orange `#F15A29` survives on light (≈3.2:1 — large text/UI only; darken to `#D14A1F` for small text).
3. **Dark islands.** Cinematic photography sections (hero, testimonial canvases) stay dark *inside* the light theme — full-bleed dark bands with the existing artwork, exactly the inverse of today's "light module screenshots inside a dark site" pattern. The adaptive navbar already knows how to cross these boundaries — that work gets reused, not rebuilt.
4. **Editorial typography carries the weight.** With less atmosphere available, hierarchy comes from the Dfaalt display face at larger scales, tighter tracking, and hairline rules (`1px` `#2e5d76` at 12–16% opacity) — an F1 technical-drawing feel rather than a generic SaaS white page.
5. **Grain stays.** Keep a 2–3% noise texture on porcelain surfaces so light mode keeps the tactile, filmic quality of the dark site instead of feeling like a default Tailwind page.

---

## 3. Architecture goal: semantic tokens first (Phase 0)

The single prerequisite for any theming work — and a codebase win even if light mode is never shipped.

### Token layer

Define semantic CSS variables on `:root` (dark values, the default) and `[data-theme="light"]`:

```css
:root {
  --surface-0: #0A0A0B;      /* page canvas */
  --surface-1: #131316;      /* section alt */
  --surface-2: #1C1C21;      /* card */
  --ink-1: #FAFAFA;          /* headline */
  --ink-2: #A1A1AA;          /* body */
  --ink-3: #71717A;          /* caption */
  --line:  rgb(255 255 255 / 0.08);
  --brand: #6EC1E4;          /* Gulf Blue, glow variant */
  --brand-ink: #6EC1E4;      /* text-safe brand on this surface */
  --accent: #F15A29;
}
[data-theme="light"] {
  --surface-0: #F7F5F2;
  --surface-1: #FFFFFF;
  --surface-2: #FFFFFF;
  --ink-1: #17181A;
  --ink-2: #45484D;
  --ink-3: #6B6F75;
  --line:  rgb(46 93 118 / 0.14);
  --brand: #6EC1E4;          /* decorative only on light */
  --brand-ink: #2e5d76;      /* text/CTA-safe on light */
  --accent: #D14A1F;
}
```

Expose through Tailwind (`colors: { surface: {...}, ink: {...} }` via `rgb(var(...))` or Tailwind v4 `@theme`) so components write `bg-surface-0 text-ink-1 border-line` — one class, both themes.

### Migration rule

Component-by-component, replace hardcoded `bg-dark-900 / bg-black / text-white / #0…` with semantic classes. **The site looks pixel-identical after Phase 0** — dark values are unchanged; only the indirection is new. ~40 files, mechanical, safely reviewable in small PRs.

`ThemeContext.tsx` stays locked to dark until Phase 2; it just sets `data-theme="dark"` instead of only a class.

---

## 4. Phases

### Phase 0 — Semantic token refactor (no visual change)
- Token layer as above; migrate the 40 hardcoded files; delete dead `dark:` variants where the light branch is unreachable.
- Exit: zero visual diff (screenshot regression on all routes), no remaining raw dark hex/`bg-dark-*` in components.

### Phase 1 — Editorial light surfaces (scoped, no toggle)
- Blog **article bodies** (not the blog index) render on porcelain: long-form reading is the one place dark measurably hurts (halation for astigmatic readers, print/PDF, shareability into light contexts like email and LinkedIn previews).
- Legal pages and any docs pages join. Marketing pages untouched.
- These are hardcoded `data-theme="light"` regions using the same tokens — the adaptive navbar treats them like the existing light module sections.
- Exit: article read-depth / time-on-page compared before vs. after.

### Phase 2 — Full light theme + preference (gated on G2)
- Restore `prefers-color-scheme` detection + toggle (the removal is documented step-by-step in `DARK_THEME_LOCK.md`, so re-adding is mapped).
- Dark remains default; light is opt-in. Dark islands per §2.3 for photographic sections.
- New light-tuned assets required: hero treatment, module screenshots re-shot on light chrome, OG images per theme.
- Exit: WCAG AA on every ink/surface pair (automated axe run in CI), full-route screenshot matrix in both themes, no FOUC (theme attribute set in `<head>` inline script before paint).

---

## 5. Success criteria (Phase 2, if ever)

1. A first-time visitor in light mode still identifies the site as *premium motorsport*, not generic SaaS — dark islands, deep Gulf ink, grain, and Dfaalt scale do that work.
2. Every text/surface pair ≥ 4.5:1 (body) or 3:1 (large/UI), verified in CI, both themes.
3. No component contains a theme conditional in JSX — theming lives entirely in tokens.
4. Lighthouse/CWV parity with the dark site (no extra CSS payload beyond the variable block).
5. The toggle persists per user, respects OS preference on first visit, and never flashes.

---

## 6. What we are explicitly *not* doing

- Not inverting colors programmatically.
- Not maintaining two component trees or forked pages.
- Not making light the default — dark is the brand.
- Not starting Phase 2 on intuition; it waits for G2 evidence.
