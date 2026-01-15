# EXOTIQ.AI DESIGN SYSTEM

**Version:** 2.0  
**Last Updated:** December 24, 2024  
**Status:** Active

---

## 📐 SPACING SYSTEM

### 8px Base System

All spacing follows an 8px base for visual consistency and rhythm.

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| **XXS** | 4px | `space-1`, `p-1`, `m-1`, `gap-1` | Tight spacing, icon padding |
| **XS** | 8px | `space-2`, `p-2`, `m-2`, `gap-2` | Compact spacing, small gaps |
| **SM** | 16px | `space-4`, `p-4`, `m-4`, `gap-4` | Default component padding |
| **MD** | 24px | `space-6`, `p-6`, `m-6`, `gap-6` | Section spacing, card padding |
| **LG** | 32px | `space-8`, `p-8`, `m-8`, `gap-8` | Large section padding |
| **XL** | 48px | `space-12`, `p-12`, `m-12`, `gap-12` | Hero section spacing |
| **2XL** | 64px | `space-16`, `p-16`, `m-16`, `gap-16` | Major section breaks |
| **3XL** | 96px | `space-24`, `p-24`, `m-24`, `gap-24` | Page-level spacing |

### Usage Guidelines

```tsx
// ✅ Good - Uses 8px base system
<div className="p-6 mb-8 gap-4">

// ❌ Bad - Arbitrary values
<div className="p-5 mb-10 gap-3">

// ✅ Good - Consistent card spacing
<div className="p-6 sm:p-8 lg:p-12">

// ❌ Bad - Inconsistent responsive spacing
<div className="p-4 sm:p-7 lg:p-11">
```

---

## 🎨 COLOR SYSTEM

### Brand Colors (DriveExotiq Brand Guidelines)

#### Gulf Blue (Primary)
- **Main:** `#6EC1E4` - `primary-500`
- **Usage:** Primary CTAs, links, interactive elements
- **Hover:** `primary-600` (#58a8cd)
- **Active:** `primary-700` (#4a8fb0)

```tsx
// Primary CTA
<button className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700">

// Links
<a className="text-primary-500 hover:text-primary-600">

// Borders
<div className="border-2 border-primary-500">
```

#### Performance Orange (Accent)
- **Main:** `#F15A29` - `accent-500`
- **Usage:** Urgency, highlights, limited use for emphasis
- **Hover:** `accent-600` (#e04815)

```tsx
// Urgency badges
<span className="bg-accent-500 text-white">

// Highlights
<div className="border-l-4 border-accent-500">
```

#### Deep Black & Jet Grey (Foundation)
- **Deep Black:** `#000000` - `dark-black`
- **Jet Grey:** `#1B1B1B` - `dark-900`
- **Usage:** Dark backgrounds, premium feel

```tsx
// Dark sections (preferred)
<section className="bg-dark-black">

// Secondary dark sections
<section className="bg-dark-900">
```

### Opacity Standards

Use consistent opacity values:
- `/10` - 10% - Subtle overlays
- `/20` - 20% - Light backgrounds
- `/30` - 30% - Hover states
- `/50` - 50% - Disabled states
- `/75` - 75% - Semi-transparent
- `/90` - 90% - Nearly opaque

```tsx
// ✅ Good - Standard opacity
<div className="bg-white/10">

// ❌ Bad - Arbitrary opacity
<div className="bg-white/15">
```

---

## 📝 TYPOGRAPHY SYSTEM

### Font Families

#### Dfaalt (Display & Headers)
- **Usage:** Headlines, CTAs, important UI elements
- **Weights:** 600 (SemiBold), 700 (Bold)
- **Class:** `font-dfaalt`

#### Montserrat (Body Copy)
- **Usage:** Body text, descriptions, secondary UI
- **Weights:** 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Class:** `font-montserrat`

### Typography Scale (6-Level Hierarchy)

| Level | Size | Line Height | Tailwind | Usage | Font |
|-------|------|-------------|----------|-------|------|
| **Display** | 60px | 1.1 | `text-6xl` | Hero headlines only | Dfaalt Bold |
| **H1** | 48px | 1.2 | `text-5xl` | Page titles | Dfaalt Bold |
| **H2** | 36px | 1.3 | `text-4xl` | Section headers | Dfaalt SemiBold |
| **H3** | 24px | 1.4 | `text-2xl` | Subsection headers | Dfaalt SemiBold |
| **Body Large** | 18px | 1.6 | `text-lg` | Intro paragraphs | Montserrat Regular |
| **Body** | 16px | 1.6 | `text-base` | Default body text | Montserrat Regular |
| **Caption** | 14px | 1.5 | `text-sm` | Meta information | Montserrat Regular |

### Usage Examples

```tsx
// ✅ Good - Clear hierarchy
<h1 className="font-dfaalt font-bold text-5xl">Page Title</h1>
<h2 className="font-dfaalt font-semibold text-4xl">Section Header</h2>
<p className="font-montserrat text-base">Body text content here.</p>

// ❌ Bad - Inconsistent hierarchy
<h1 className="font-montserrat text-4xl">Page Title</h1>
<h2 className="font-dfaalt text-3xl">Section Header</h2>
<p className="font-dfaalt text-lg">Body text content here.</p>
```

---

## 🔘 BUTTON SYSTEM

### Three Variants

#### Primary (Gulf Blue)
- **Usage:** Main CTAs, primary actions
- **Component:** `<Button variant="primary">`

```tsx
<Button variant="primary" size="lg">
  Join Beta
</Button>
```

#### Secondary (Outline)
- **Usage:** Secondary actions, alternative CTAs
- **Component:** `<Button variant="secondary">`

```tsx
<Button variant="secondary" size="md">
  Learn More
</Button>
```

#### Tertiary (Text)
- **Usage:** Low-emphasis actions, inline links
- **Component:** `<Button variant="tertiary">`

```tsx
<Button variant="tertiary" size="sm">
  View Details
</Button>
```

### Button Sizes

- **Small:** `size="sm"` - 40px min-height
- **Medium:** `size="md"` - 48px min-height (default)
- **Large:** `size="lg"` - 56px min-height

### Button States

All buttons include:
- ✅ Hover: `scale(1.02)` + shadow increase
- ✅ Active: `scale(0.98)`
- ✅ Focus: `ring-2 ring-primary-500`
- ✅ Disabled: `opacity-50` + no hover
- ✅ Loading: Spinner animation

---

## 🎭 MICRO-INTERACTIONS

### Hover States

```tsx
// Cards
hover:shadow-xl hover:-translate-y-1 transition-all duration-300

// Buttons
hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200

// Links
hover:text-primary-600 hover:underline transition-colors duration-200
```

### Focus States

```tsx
// All interactive elements
focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
```

### Loading States

```tsx
// Forms
<div className="animate-pulse">

// Buttons
<Button loading={true}>
```

---

## 📱 MOBILE OPTIMIZATION

### Touch Targets

- **Minimum:** 44px × 44px (Apple guideline)
- **Preferred:** 48px × 48px
- **Class:** `min-h-touch min-w-touch`

```tsx
// ✅ Good - Meets touch target size
<button className="min-h-[48px] min-w-[48px]">

// ❌ Bad - Too small for touch
<button className="h-8 w-8">
```

### Responsive Spacing

```tsx
// ✅ Good - Increases on larger screens
<div className="p-4 sm:p-6 lg:p-8">

// ❌ Bad - Same spacing on all screens
<div className="p-4">
```

### Mobile-First Typography

```tsx
// ✅ Good - Scales up on larger screens
<h1 className="text-4xl sm:text-5xl lg:text-6xl">

// ❌ Bad - Too large on mobile
<h1 className="text-6xl">
```

---

## 🌓 DARK MODE STRATEGY

### Dark-First Approach

Exotiq.ai uses a **dark-first** design strategy to match the premium Gulf Racing brand heritage.

#### Background Flow

```tsx
// Homepage recommended flow:
Hero: bg-dark-black ✅
FleetCopilot: bg-dark-900 ✅
Platform Modules: bg-gray-50 dark:bg-dark-800 (light for contrast)
Testimonials: bg-dark-black ✅
Survey CTA: bg-gray-50 dark:bg-dark-800 (light for contrast)
```

#### Dark Section Best Practices

```tsx
// ✅ Good - Dark section with proper contrast
<section className="bg-dark-black text-white">
  <h2 className="text-white">Title</h2>
  <p className="text-gray-300">Description</p>
</section>

// ❌ Bad - Poor contrast
<section className="bg-dark-black text-gray-500">
```

---

## 🎯 IMPLEMENTATION CHECKLIST

When creating new components:

- [ ] Uses 8px spacing system
- [ ] Uses Dfaalt for headers, Montserrat for body
- [ ] Uses Gulf Blue (primary-500) for CTAs
- [ ] Includes hover states (scale + shadow)
- [ ] Includes focus states (ring)
- [ ] Meets 44px touch target minimum
- [ ] Responsive spacing (increases on larger screens)
- [ ] Dark mode compatible
- [ ] Uses Button component for CTAs
- [ ] Consistent opacity values (/10, /20, /30, etc.)

---

## 📚 QUICK REFERENCE

### Common Patterns

```tsx
// Section Container
<section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">

// Content Container
<div className="max-w-7xl mx-auto">

// Card
<div className="p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

// Primary CTA
<Button variant="primary" size="lg" icon={ArrowRight}>
  Get Started
</Button>

// Section Header
<h2 className="font-dfaalt font-bold text-4xl sm:text-5xl mb-6 text-center">
  Section Title
</h2>

// Body Text
<p className="font-montserrat text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
  Body content here.
</p>
```

---

**Questions?** Refer to this guide when implementing new features or updating existing components.

