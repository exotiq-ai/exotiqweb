# Exotiq Pricing Pages — Side-by-Side Review & Improvement Plan

> **Context:** Comparison of `exotiq.ai/pricing` (marketing site, React/Tailwind) and `app.exotiq.ai` (product/app, Lovable-built). Same brand, same 4-tier model, but the two pages diverge in layout, CTA strategy, and several data details. This doc covers honest feedback on the web page first, then a detailed improvement brief for the app page.

---

## Part 1: exotiq.ai/pricing — Honest Feedback

### What's working well
- **Single CTA story.** Every button says "Book a Demo" → Calendly. No confusion about what happens when you click.
- **Dark-on-dark brand consistency.** Gulf Blue + Performance Orange + deep black feels premium and on-brand for exotic/luxury fleet operators.
- **Price alignment across cards.** Min-heights on tagline, inclusion/overage, and savings rows keep the 4-card grid clean at every breakpoint.
- **Monthly/Annual toggle.** Pill-style tablist with "2 months free" badge is clear and accessible (`role="tablist"`, `aria-selected`).
- **Supporting content depth.** Founder band → ROI calculator → feature comparison → money-back guarantee → FAQ → final CTA is a solid conversion funnel with multiple entry points.

### What should improve

| Area | Issue | Fix |
|------|-------|-----|
| **Toggle defaults to Monthly** | Most SaaS pages default to Annual to anchor on the lower number and show savings. The app page already does this — the web page should match. | Default `isAnnual` to `true`. |
| **Annual price display** | When Annual is selected, we show the monthly-equivalent (`$333`) but never show the total annual price (`$3,990`). The app page shows both. Operators evaluating budget want to see the annual lump sum. | Add a small line below the monthly-equivalent: "Billed at $X,XXX/year". |
| **No explicit savings callout on popular card** | The green "Save $XXX/yr" line exists but is the same weight as every other card. The app page puts a prominent green badge ("Save $798 per year") on the Professional card. | Give the popular card's savings line more visual weight — larger font, a small green pill, or a badge. |
| **"Book a Demo" on every tier including Starter** | A solo operator with 3 cars doesn't want to book a 30-minute sales call to pay $29/mo. Lower tiers should have a self-serve path (even if it's just "Start Free Trial" → signup). | Consider: Starter + Pro → "Start Free Trial", Business + Enterprise → "Book a Demo". Or keep "Book a Demo" but add a secondary ghost link "or start free trial →" below it on the lower tiers. |
| **Hero subtitle repeats "founder pricing" twice** | The pill above the H1 says "Founder Pricing · 15 of 250 spots · ends Jul 31" and the subtitle says "lock in founder pricing that never expires." Redundant. | Subtitle should sell the value prop, not repeat the pill. Try: *"Pay per vehicle. Scale as you grow. AI handles the rest."* |
| **Trust row below the H1 is weak** | "14-Day Free Trial · Cancel Anytime · Setup in 15 Minutes" — these are generic SaaS claims. The app page has a dedicated "Pricing Promise" section with 4 cards (Locked-In Forever, No Hidden Fees, Cancel Anytime, 30-Day Guarantee). | Either strengthen the web trust row with more specific proof points (e.g. "30-Day Money-Back" instead of the generic version below), or add a compact Pricing Promise row similar to the app page. |
| **ROI calculator has no billing toggle** | The web ROI calculator is locked to monthly. The app version has its own Monthly/Annual toggle that recalculates investment and ROI. | Add a billing toggle to the web ROI calculator, or wire it to the same `isAnnual` state as the cards so they stay in sync. |
| **Feature comparison mobile UX** | Mobile shows a 2×2 grid tier switcher + stacked list — good. But the "Show All Features (7 more)" button is a primary-colored `bg-primary-500` button that competes with the real CTAs. | Restyle the expand button as a ghost/text link so it doesn't steal attention from "Book a Demo." |
| **No "Pricing Promise" section** | The app page has a 4-card "Our Pricing Promise" grid (Locked-In Forever, No Hidden Fees, Cancel Anytime, 30-Day Guarantee). The web page has a minimal 3-item trust row. This is a missed conversion opportunity. | Add a compact Pricing Promise section between the FAQ and the final CTA. |
| **Page is long** | Hero → Cards → Founder Band → ROI → Feature Comparison → Mid-page CTA → Money-Back Guarantee → FAQ → Final CTA. That's 9 sections. Some are repeating the same message. | Consider merging the mid-page CTA into the founder band (they say the same thing). The money-back guarantee row could fold into a Pricing Promise section. Net: drop from 9 to 7 sections. |

### Quick wins (< 30 min each)
1. Flip `isAnnual` default to `true`.
2. Add "Billed at $X,XXX/year" subline when annual is active.
3. Rewrite the hero subtitle to avoid repeating the founder pill.
4. Restyle the feature comparison expand button to ghost/text.

---

## Part 2: app.exotiq.ai — Improvement Brief for Lovable

> This section is formatted as a standalone prompt you can paste into Lovable or share with any AI builder. It includes specific, actionable issues and the desired outcomes.

---

### LOVABLE PROMPT: app.exotiq.ai Pricing Page Improvements

**Page:** Pricing / Plan selection at `app.exotiq.ai`
**Role:** You are improving the pricing page of a B2B SaaS app for exotic and luxury rental car fleet operators. The brand uses Gulf Blue (#6EC1E4), Performance Orange (#F15A29), Jet Grey (#1B1B1B), and Deep Black (#000000). Typography is clean and modern (Inter/Space Grotesk family).

Below are specific issues to fix, ordered by impact. Each has a **Problem**, **Evidence**, and **Desired Outcome**.

---

#### 1. CRITICAL: Two independent billing toggles confuse users

**Problem:** The page has TWO separate Monthly/Annual toggles — one above the pricing cards (switch e6) and one in the ROI calculator section (switch e17). They operate independently, so a user can be viewing Annual cards but Monthly ROI numbers simultaneously. This creates conflicting price signals.

**Desired Outcome:** Single source of truth. Either:
- (A) One shared toggle at the top that controls both the cards AND the ROI calculator, OR
- (B) Remove the ROI calculator toggle entirely and wire it to the card toggle state.

The toggle should be prominent, pill-style (like the marketing site), and default to **Annual** selected.

---

#### 2. HIGH: Countdown timer overlay blocks content

**Problem:** There is a persistent countdown timer banner at the top of the page ("0d : 00h : 00m : 00s" with "73 of 250 spots left") that:
- Shows `0d : 00h : 00m : 00s` — the timer has expired but the banner is still rendering.
- Obscures the pricing card toggle and other interactive elements.
- Creates a sense of expired urgency rather than active urgency.

**Desired Outcome:**
- If the countdown has expired (`deadline < now`), hide the banner entirely.
- If active, ensure the banner does not overlap or obscure the billing toggle or card headers. Use a non-sticky inline banner, or ensure adequate top padding below it.
- Update the spots count to match the marketing site (currently 15 of 250 remaining, not 73).

---

#### 3. HIGH: Annual savings badges persist in Monthly mode

**Problem:** When viewing Monthly pricing, the cards still display "Save $798 per year", "Save $1798 per year", etc. These annual savings badges should only appear when the Annual billing option is selected.

**Desired Outcome:** Conditionally render the green savings badges only when `isAnnual === true`. When Monthly is selected, hide them or replace with a nudge like "Switch to annual and save $XXX".

---

#### 4. MEDIUM: Price format is hard to scan at a glance

**Problem:** Annual prices are displayed as raw numbers (`$3990`, `$8990`, `$15990`) without comma separators. At a glance, `$3990` and `$15990` look similar. The marketing site shows monthly-equivalent pricing ($333/mo) which is easier to compare.

**Desired Outcome:**
- Add comma separators: `$3,990/year`, `$8,990/year`, `$15,990/year`.
- Below the annual price, show the monthly equivalent in smaller text: "That's $333/mo".
- For Starter (per-vehicle), show: `$290/vehicle/year` with "That's $24/vehicle/mo" below.

---

#### 5. MEDIUM: CTA buttons are all identical — no tier differentiation

**Problem:** Every card has the same "Get Started" button in the same style. There is no visual distinction for the recommended/popular tier.

**Desired Outcome:**
- **Professional (Most Popular):** Filled primary button (Gulf Blue background, dark text), larger or more prominent than the others.
- **Starter:** Ghost/outline button ("Start Free Trial" — this is a self-serve tier).
- **Business & Enterprise:** Ghost/outline button ("Book a Demo" — these are sales-assisted).
- This matches the marketing site's pattern where the popular tier gets the filled CTA.

---

#### 6. MEDIUM: "Most Popular" badge is understated

**Problem:** The "Most Popular" badge on the Professional card is a small blue pill. The card itself has a blue border, but the overall visual weight doesn't strongly guide the eye to it as the default choice.

**Desired Outcome:**
- Make the Professional card slightly elevated (e.g., subtle shadow or scale(1.02) on desktop).
- Keep the blue border but make it slightly thicker or add a faint blue glow/shadow.
- "Most Popular" badge should be at the top-right or top-center of the card, not blending into the card body.

---

#### 7. MEDIUM: Compare Plans section duplicates the cards

**Problem:** Below the ROI calculator, there is a "Compare Plans" section that shows pricing again ($29/veh/mo, $399/mo, $899/mo, $1799/mo). This repeats information already visible in the tier cards and creates a second place where prices must be kept in sync.

**Desired Outcome:** Convert this into a **feature comparison table** (like the marketing site has) rather than repeating prices. Show features as rows with check/cross/text per tier. If prices must appear, pull from a single shared data source to avoid drift.

---

#### 8. LOW: "What's Included in Professional" section is tier-locked

**Problem:** There is a small "What's Included in Professional" grid showing AI Forecasting (30-day), Locations (Up to 3), Support (Chat 24hr), API Access (Yes). This only shows Professional — if a user is considering Business or Enterprise, this section is irrelevant.

**Desired Outcome:** Either:
- (A) Make it reactive to whichever card the user last clicked/hovered, or
- (B) Remove it and let the feature comparison table do this job.

---

#### 9. LOW: Final CTA section has three competing buttons

**Problem:** The bottom CTA section has:
1. "Lock in Founder Pricing" (prominent)
2. "Start Free Trial"
3. "Schedule a demo with our team"

Three buttons = decision paralysis. The marketing site has a single "Book a Demo" button.

**Desired Outcome:** Reduce to two buttons max:
- Primary: "Start Free Trial" (filled, prominent)
- Secondary: "Book a Demo" (ghost/outline)

Or, if you want to emphasize founder pricing:
- Primary: "Lock in Founder Pricing" (filled)
- Secondary: "or start a free trial →" (text link)

---

#### 10. DATA SYNC: Ensure pricing numbers match across web and app

| Tier | Web (monthly) | App (monthly) | Web (annual) | App (annual) | Match? |
|------|--------------|---------------|-------------|-------------|--------|
| Starter | $29/veh/mo, min $79 | $29/veh/mo, min $79 | $290/veh/yr | $290/veh/yr | Yes |
| Professional | $399/mo flat | $399/mo flat | $3,990/yr | $3,990/yr | Yes |
| Business | $899/mo flat | $899/mo flat | $8,990/yr | $8,990/yr | Yes |
| Enterprise | $1,799/mo flat | $1,799/mo flat | $15,990/yr | $15,990/yr | Yes |

Prices are aligned. However, the **founder spots remaining** differ: web says **15 of 250**, app says **73 of 250**. These should come from a single source (database or shared config). Update the app to match the web (15 remaining), or better yet, pull both from a shared Supabase row.

---

#### 11. GENERAL: Sections the app has that the web page should consider adopting

- **"Our Pricing Promise" (4-card grid):** Locked-In Forever, No Hidden Fees, Cancel Anytime, 30-Day Guarantee. This is excellent trust-building content. The web page should add a similar section.
- **Inline ROI with billing toggle:** The app's ROI calculator lets users toggle billing within the calculator context. The web version doesn't. Consider syncing the billing state.

#### 12. GENERAL: Sections the web page has that the app page should consider adopting

- **Founder Offer Band:** The web page has a dedicated, well-designed founder pricing call-out band between the cards and the ROI calculator. The app relies on the countdown banner (which is broken). Replace the countdown with an inline founder band similar to the web page.
- **Money-Back Guarantee trust row:** The web page has a clean 3-icon row (30-Day Money-Back, Free Migration, Dedicated Support). The app could add this near the bottom.
- **Feature Comparison Table:** The web page has a full feature comparison table with expand/collapse. The app's "Compare Plans" section is weaker. Adopt the table format.

---

*End of brief. Priority order: items 1–3 are bugs/UX issues that should be fixed before any visual polish. Items 4–6 are medium-impact improvements. Items 7–12 are enhancements.*
