# Fleet Module — Homepage & Platform Section Design

**Date:** 2026-06-01
**Status:** Approved copy, pending implementation plan

## Goal

Add a sixth module, **Fleet**, to the marketing site. It appears in two places, both
driven by the existing `modules` arrays:

- **Homepage** — compact card in `src/components/PlatformModulesSection.tsx`
- **Platform page** — deep-dive section in `src/pages/FeaturesPage.tsx`

Fleet showcases the in-app Fleet dashboard (vehicle list, photos, tasks, maintenance).

## Positioning

Fleet is the **foundation / source of truth** for the platform. It captures the data —
vehicles, photos, tasks, maintenance — and gives every car a "fingerprint." That
fingerprint is what feeds:

- **MotorIQ** — true per-vehicle P&L (depreciation, maintenance, utilization → profit)
- **Pulse** — utilization and live fleet status analytics

This deliberately avoids cannibalizing Pulse (which owns the "89% Utilization Rate"
headline) and MotorIQ (which owns "Profit Intelligence"). Fleet = *capture it*,
Pulse = *analyze it*, MotorIQ = *price on it*.

The distinct, non-overlapping hook for Fleet is **AI agentic onboarding / time saved on
setup**: AI ingests vehicle details and photos automatically, eliminating spreadsheets,
sticky notes, and WhatsApp task-tracking. (FleetCopilot owns "15+ hrs saved weekly"
*operationally*; Fleet owns *setup/record-keeping* time — no collision.)

## Module Identity

| Field | Value |
|---|---|
| `id` | `fleet` |
| `name` | Fleet |
| `tagline` | Fleet Command Center |
| Hero line | "Your entire fleet, at your fingertips." |
| `icon` | `Car` (lucide-react; matches app sidebar) |
| Accent color | Violet/purple (only unused accent — blue/orange/green/amber/teal are taken) |

Suggested color tokens (match the structure used by other modules):
- `gradient` (homepage): `from-violet-500/20 to-purple-500/10`
- `gradient` (features deep-dive): `from-violet-600 via-purple-500 to-violet-600`
- `bgGradient`: `from-violet-500/10 via-purple-500/5 to-violet-500/10`
- `borderColor`: `border-violet-500/30`
- `accentColor` / `iconColor`: `text-violet-400`
- `iconBg`: `bg-violet-500/20`

## Placement

Fleet goes **first** in both `modules` arrays (before MotorIQ). Narrative order:
*start with your fleet → price it (MotorIQ) → track it (Pulse) → book it (Book) →
protect it (Vault) → run it (FleetCopilot).*

Copy references to update from "Five" → "Six":
- `PlatformModulesSection.tsx` header: "Five Powerful Modules." → "Six Powerful Modules."
- `FeaturesPage.tsx` hero subhead: "Five powerful modules working together." → "Six..."
- Any other "five modules" references discovered during implementation (e.g. SEO copy,
  structured data) should be checked and updated for consistency.

## Hero Metric

- **value:** `Zero`
- **label:** Spreadsheets Required
- **sublabel:** *AI onboards your fleet — you never touch a cell*

> Note: this is intentionally a "zero" framing rather than a hard stat. If a real
> setup-time or data-entry stat becomes available, consider swapping it in.

## Copy — Platform Page (deep-dive)

**Long description:**

> Fleet is the foundation everything else is built on — and AI sets it up for you. Point
> it at your vehicles and it onboards the details and photos automatically: no more
> manually updating spreadsheets, no more tracking tasks across sticky notes and WhatsApp
> threads. Every car gets a living profile — specs, status, photos, tasks, maintenance
> history — and a fingerprint that feeds true per-vehicle P&L into MotorIQ and utilization
> into Pulse. Capture it once; the whole platform gets smarter.

**Six features** (first is `highlight: true`):

1. **AI Fleet Onboarding** — Stop typing. Exotiq's AI ingests your vehicle details and
   photos and builds out complete profiles automatically — turning a weekend of
   spreadsheet data entry into minutes. Your fleet, set up before your coffee's cold.
   *(icon: `Sparkles` or `Wand2`)*
2. **Photo Management** — Build a photo set for every vehicle and document condition
   before and after every rental. Visual proof on file means damage disputes end in your
   favor, not a he-said-she-said. *(icon: `Camera` or `Image`)*
3. **Task Management** — Assign and track per-vehicle tasks — detailing, repairs, prep —
   so nothing falls through the cracks. See exactly which cars need attention before
   they're due back out. *(icon: `ClipboardCheck`)*
4. **Maintenance Logging** — Log every service, mileage reading, and repair cost against
   the specific vehicle. A complete history that protects resale value and proves you
   maintained the car. *(icon: `Wrench`)*
5. **Vehicle Fingerprint** — Every cost and every earning day ties back to the individual
   car. That fingerprint is what makes true per-vehicle P&L and accurate utilization
   possible across the platform. *(icon: `Fingerprint`)*
6. **Status at a Glance** — Available, Booked, Maintenance, Ready for Pickup — see your
   whole fleet's state instantly in grid or list view. Know what's earning, what's idle,
   and what's down. *(icon: `LayoutGrid` or `Eye`)*

**Perfect For:** Operators tired of spreadsheets · Fleets scaling past what one person can
track · Anyone who needs true cost accountability per vehicle

**Testimonial (placeholder, same style as existing modules — replace with real quote when
available):**

> "I used to track maintenance in a notebook and photos in my phone. Now every car has a
> complete record. When a renter tried to dispute damage, I pulled the pre-rental photos
> in 10 seconds."
> — **Tony M.**, Fleet Owner · Las Vegas · metric: **Disputes Won**

## Copy — Homepage (compact card)

**One-liner description:**

> Every vehicle, one record. AI onboards your cars, photos, tasks, and maintenance
> automatically — so every car carries a fingerprint that powers your pricing, analytics,
> and P&L.

**3 feature pills:** AI Onboarding · Photo & Condition · Maintenance Logs

**Metric:** `Zero` / Spreadsheets / required

## Screenshots / Assets

- Module screenshot path follows existing convention: `/images/app-screenshots/...`
- New light-theme assets available (user-provided):
  - `Fleet Dashboard - light - grid.png`
  - `Fleet Dashboard - light - rows.png`
- Browser-frame URL label auto-renders as `app.exotiq.ai/fleet` (from `module.id`).
- Decide during implementation which screenshot (grid vs rows) reads best at the
  rendered aspect ratio (`16/10`, `object-contain`). Note: existing module screenshots
  appear dark-theme on dark section backgrounds; confirm the light-theme Fleet shot looks
  intentional rather than mismatched, or add a subtle frame/treatment.

## Out of Scope

- The light-theme screenshot work the user is doing separately.
- Any changes to the in-app Fleet dashboard itself.
- New routes/pages (Fleet reuses the existing module rendering pattern; no `/fleet`
  marketing route is created unless requested).
