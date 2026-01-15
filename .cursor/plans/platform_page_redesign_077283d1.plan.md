---
name: Platform Page Redesign
overview: Transform the Features/Platform page into a high-converting, clean showcase with mobile screenshots in phone frames, impactful 3-card benefit statements per module, hybrid scroll/tab navigation, and multiple CTA touchpoints.
todos:
  - id: prepare-screenshots
    content: Prepare 5 phone-framed module screenshots (WebP + JPG fallback)
    status: pending
  - id: write-benefit-copy
    content: Write 3-card benefit copy for all 5 modules (What/Time/Money)
    status: pending
  - id: refine-hero-copy
    content: Finalize hero section headline and subheadline copy
    status: pending
  - id: create-benefit-card
    content: Build new BenefitCard component with icon, metric, and description
    status: pending
    dependencies:
      - write-benefit-copy
  - id: create-module-section
    content: Build ModuleSection component with split layout (screenshot + benefits)
    status: pending
    dependencies:
      - prepare-screenshots
      - create-benefit-card
  - id: implement-sticky-nav
    content: Implement hybrid sticky tab navigation with scroll detection
    status: pending
  - id: refactor-features-page
    content: Refactor FeaturesPage.tsx with new components and clean structure
    status: pending
    dependencies:
      - create-module-section
      - implement-sticky-nav
  - id: add-multiple-ctas
    content: Add CTAs at multiple touchpoints (sticky bar, inline, final section)
    status: pending
    dependencies:
      - refactor-features-page
  - id: add-animations
    content: Add scroll animations, hover states, and transitions
    status: pending
    dependencies:
      - refactor-features-page
  - id: mobile-optimization
    content: Test and optimize responsive behavior for mobile/tablet/desktop
    status: pending
    dependencies:
      - add-animations
---

# Platform Page Redesign: High-Converting Product Showcase

## Your Action Items (To Prepare Before Implementation)

### 1. Screenshot Preparation

**Decision: I recommend you provide phone-framed versions** for the following reasons:

- You have more control over the exact phone model/style that matches your brand
- Tools like Mockuphone, Screely, or Figma give you professional frames
- Ensures consistency across all module screenshots
- Reduces implementation complexity

**What to prepare:**

- [ ] 5 phone-framed screenshots (one per module): Dashboard/Core, MotorIQ, Pulse, Book, Vault
- [ ] Optimal dimensions: 400-500px width for web display
- [ ] File format: WebP for performance, with JPG fallback
- [ ] File naming: `module-motoriq-mobile.webp`, `module-pulse-mobile.webp`, etc.
- [ ] Place in: `/public/images/modules/` directory

**Alternative:** If you prefer, I can implement CSS-based phone frames using your raw screenshots, but custom frames look more polished.

### 2. Benefit Card Copy (3 Cards Per Module)

For each of the 5 modules, prepare copy for 3 impactful cards following this structure:**Card 1: What It Does** (The Core Function)

- One punchy sentence describing the primary capability
- Example: "Automates dynamic pricing across your entire fleet"

**Card 2: Time Saved** (Efficiency Gain)

- Specific time metric
- Example: "Save 12+ hours per week on manual pricing updates"

**Card 3: Money Saved/Made** (Financial Impact)

- Specific dollar amount or percentage
- Example: "Capture $15K+ in additional annual revenue"

**Template to fill out for each module:**

```javascript
MODULE: MotorIQ
Card 1 (What): _______________
Card 2 (Time): _______________
Card 3 (Money): _______________

MODULE: Pulse
Card 1 (What): _______________
Card 2 (Time): _______________
Card 3 (Money): _______________

MODULE: Book
Card 1 (What): _______________
Card 2 (Time): _______________
Card 3 (Money): _______________

MODULE: Vault
Card 1 (What): _______________
Card 2 (Time): _______________
Card 3 (Money): _______________

MODULE: Core
Card 1 (What): _______________
Card 2 (Time): _______________
Card 3 (Money): _______________
```



### 3. Hero Section Copy Refinement

- [ ] Main headline (current: "The Complete Platform for Modern Fleet Operators")
- [ ] Subheadline (keep it tight, 1-2 sentences max)
- [ ] Primary CTA text (current: "Join the Founder's Circle")
- [ ] Secondary CTA text (current: "Watch Demo")

### 4. Module Names & One-Liners

For each module, provide:

- [ ] Module name (e.g., "MotorIQ")
- [ ] One-line descriptor (e.g., "Revenue Optimization Engine")
- Keep descriptors under 5 words

## Implementation Plan

### Phase 1: Page Structure & Layout

**File to modify:** [`src/pages/FeaturesPage.tsx`](src/pages/FeaturesPage.tsx)

#### 1.1 Hero Section Cleanup

- Remove repetitive pill badge (already done)
- Streamline hero to: Headline → Subheadline → CTA buttons
- Add sticky tab navigation immediately below hero
- Implement smooth scroll behavior

#### 1.2 Module Section Architecture

Create new split-layout component structure:

```javascript
[Module Section]
├── Left Column (40% width on desktop, full width mobile)
│   ├── Phone-framed screenshot
│   └── Subtle animation on scroll
└── Right Column (60% width on desktop, full width mobile)
    ├── Module name + icon
    ├── One-line descriptor
    └── 3 Benefit Cards (What/Time/Money)
```



#### 1.3 Responsive Behavior

- Desktop: Side-by-side split layout
- Tablet: Screenshot above, benefits below
- Mobile: Stacked, screenshot first

### Phase 2: Benefit Card Component

Create new `BenefitCard` component with:

- Icon (Clock for time, DollarSign for money, Zap for what it does)
- Bold metric/statement
- Supporting detail text
- Subtle hover animation
- Color-coded by type (primary for what, success for money, accent for time)

**Component structure:**

```typescript
interface BenefitCardProps {
  type: 'what' | 'time' | 'money';
  metric: string;
  description: string;
}
```



### Phase 3: CTA Strategy (Multiple Touchpoints)

#### 3.1 Sticky Bottom Bar (Mobile)

- Appears after scrolling past hero
- Fixed position with backdrop blur
- "Join Founder's Circle" primary button
- Hides when user scrolls up

#### 3.2 After Each Module

- Subtle inline CTA after every 2 modules
- Alternating style: "Book a Demo" and "Join Founder's Circle"
- Non-intrusive, secondary button style

#### 3.3 Final CTA Section

- Full-width gradient background
- Both CTAs side-by-side
- Social proof element (e.g., "Join 50+ operators in beta")

### Phase 4: Visual Polish

#### 4.1 Phone Frame Implementation

If using CSS frames:

- Create reusable `PhoneFrame` component
- iPhone 14 Pro style with notch
- Subtle shadow and depth
- Responsive scaling

If using your pre-framed images:

- Simple `LazyImage` component with optimized loading
- Subtle parallax effect on scroll

#### 4.2 Animations

- Fade-in on scroll for each module section
- Stagger animation for benefit cards (100ms delay between each)
- Smooth tab transitions
- Hover states on all interactive elements

#### 4.3 Typography Hierarchy

- Remove or minimize subheaders within module sections
- Let module names be bold and prominent
- Benefit card text: Large metric, smaller description
- Maintain consistent spacing

### Phase 5: Navigation & UX

#### 5.1 Sticky Tab Navigation

- 5 tabs (one per module)
- Active state highlights current section
- Click to jump, or auto-updates on scroll
- Smooth scroll with offset for fixed header

#### 5.2 Scroll Behavior

- Intersection Observer to track which module is in view
- Update active tab automatically
- Smooth scroll with easing function

## Best Practices from Leading SaaS Platforms

Based on analysis of top SaaS product pages (Stripe, Notion, Linear, Intercom):

### What They Do Well:

1. **Split layouts** with product screenshots on one side, benefits on the other
2. **Animated product demos** (we can add subtle animations to screenshots)
3. **Stat-driven benefit cards** with bold numbers
4. **Minimal text** - let the product speak for itself
5. **Multiple CTAs** without being pushy
6. **Sticky navigation** for easy jumping between features
7. **Phone frames** for mobile-first products (like Intercom, Front)

### What We'll Avoid:

1. Long paragraphs of text
2. Too many features listed at once
3. Generic stock photos
4. Cluttered layouts
5. Weak CTAs buried at the bottom

## File Structure

```javascript
src/
├── pages/
│   └── FeaturesPage.tsx (main refactor)
├── components/
│   ├── BenefitCard.tsx (new)
│   ├── PhoneFrame.tsx (new, optional)
│   ├── ModuleSection.tsx (new)
│   └── StickyCTABar.tsx (enhance existing)
└── public/
    └── images/
        └── modules/ (new directory)
            ├── module-motoriq-mobile.webp
            ├── module-pulse-mobile.webp
            ├── module-book-mobile.webp
            ├── module-vault-mobile.webp
            └── module-core-mobile.webp
```



## Success Metrics

The redesigned page should achieve:

- Cleaner visual hierarchy (less text, more impact)
- Faster comprehension (users understand value in 30 seconds)
- Higher conversion rate (more demo bookings and survey completions)
- Better mobile experience (optimized for phone viewing)
- Improved engagement (users scroll through all 5 modules)

## Next Steps

1. You prepare the assets and copy (action items above)
2. Share the prepared content with me
3. I implement the redesign in phases