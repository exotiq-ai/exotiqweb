# Remaining Areas After Pricing Model Update

**Date:** May 28, 2026
**Status:** Pricing page complete — these are stale references elsewhere on the site

---

## What Was Completed

The pricing page and all its components are fully updated to the new 2-tier + Enterprise model:

- **Pricing page** — new hero, cards, ROI calculator, feature comparison, FAQ
- **Pricing data** — new tier definitions, ROI defaults, FAQ content
- **Header / Mobile nav** — founder chip replaced with "Launch pricing" chip
- **Structured data** — SEO schema updated with new pricing
- **HomePage** — "Founder's Circle" → "Early Adopter Program"
- **SurveyPage** — matching heading update
- **FounderBanner.tsx** — deleted

---

## Priority 1: Investor Pages (stale pricing displayed to investors)

### `src/pages/InvestorPage.tsx`

**Lines ~877–905 — Old 4-tier pricing grid:**
```
Starter     — Up to 5 vehicles   — $49/mo
Growth      — Up to 20 vehicles  — $99/mo
Scale       — Up to 50 vehicles  — $199/mo
Enterprise  — 50+ vehicles       — Custom
```

**Should become:**
```
Pro         — 1–15 vehicles      — $39/vehicle/mo
Business    — 16–50 vehicles     — $29/vehicle/mo
Enterprise  — 51+ vehicles       — Custom
```

**Line ~403 — Revenue model description:**
```
"Operators pay $49-$199/mo subscription based on fleet size."
```

**Should become:**
```
"Per-vehicle SaaS pricing: $39/vehicle/mo (Pro) and $29/vehicle/mo (Business). All features included."
```

### `src/pages/InvestorPageNew.tsx`

**Lines ~560–566 — Tiered SaaS pricing card:**
```
$49-$199/month based on fleet size
+ Premium AI add-ons ($15-$25/vehicle)
```

**Should become:**
```
$29–$39/vehicle/month based on fleet size
All features included — no add-on gates
```

**Note:** The "Premium AI add-ons" line should be removed since the new model includes all features on every plan.

---

## Priority 2: AI/Chatbot Responses (users get wrong pricing)

### `src/services/openai.ts`

**Line ~108 — Chatbot pricing response:**
```
"Our pricing starts at $49/month for up to 5 vehicles..."
```

**Should become:**
```
"Our pricing is $39/vehicle/month for Pro (1–15 vehicles) and $29/vehicle/month for Business (16–50 vehicles). All features included. Enterprise pricing is available for 51+ vehicles. Start with a 14-day free trial — no credit card required."
```

---

## Priority 3: AI Training Content (affects LLM-generated responses)

### `public/ai-training-content.txt`

This is the largest block of stale content. Multiple sections reference old pricing:

**Section: "Standard Pricing Tiers" (~line 239–270)**
- Lists Starter ($49), Professional ($99), Enterprise ($199), Enterprise Plus
- References "Beta Program" with "lifetime founder pricing (50-70% discount)"

**Recommended rewrite:**
```
### Pricing

**Pro: $39/vehicle/month**
- 1–15 vehicles
- All features included
- Chat support (24hr)
- Up to 2 locations
- Annual: $390/vehicle/year (save 2 months)

**Business: $29/vehicle/month**
- 16–50 vehicles
- All features included
- Priority chat + phone support
- Up to 5 locations
- White-glove onboarding
- Annual: $290/vehicle/year (save 2 months)

**Enterprise: Custom pricing**
- 51+ vehicles
- Dedicated success manager
- Custom AI model training
- Unlimited locations
- Enterprise SLA (99.9%)
```

**Other stale references in the same file:**
- Line ~138: `$99-199/mo subscription` → update to `$29–$39/vehicle/mo`
- Line ~273: `lifetime founder pricing` → remove or replace with "14-day free trial"
- Line ~283: `$49-199/month` → `$29–$39/vehicle/month`
- Line ~337: `$49-199/month` comparison → update
- Line ~484: `Guided onboarding: Available for Professional tier and above` → `White-glove onboarding: Business and Enterprise`
- Line ~598: `Beta users with lifetime founder pricing` → remove
- Line ~601: `lifetime founder pricing (50-70% discount)` → `14-day free trial, no credit card`
- Line ~604: `$49-199/month` → `$29–$39/vehicle/month`

---

## Priority 4: Low Priority / Cosmetic

### `src/data/structuredData.ts`
- ✅ Already fixed (both FAQ and offer description)

### `public/llms.txt`
- No old pricing found — clean

### `public/ai-content.txt`
- No pricing references — clean (general marketing copy)

### Blog content (`src/content/blog/*.mdx`)
- Author roles show "Founder and CEO" — this refers to Gregory's title, not the pricing concept. No change needed.

### `src/components/TestimonialsSection.tsx`
- "Founder, Apex Luxury Rentals" — this is a testimonial author's title. No change needed.

---

## Decision Points

1. **Investor page tone:** The investor pages currently frame Exotiq as flat-tier SaaS. The new per-vehicle model tells a different (arguably better) revenue story for investors — ARPU scales linearly with fleet size. You may want to add a "Revenue per account" projection showing how a 30-vehicle Business customer = $870/mo vs old $199/mo flat.

2. **AI training content depth:** `ai-training-content.txt` is ~600 lines. A full rewrite of the pricing sections would take ~15 minutes. Or it can be done in bulk with a find-and-replace pass if the structure stays the same.

3. **Chatbot (`openai.ts`):** This is a simple one-line fix but worth doing soon since live users hitting the chatbot will get wrong pricing.
