# Exotiq.ai Typography & Spacing System Guide

## Font Families

### Primary Fonts (2-font system for clarity)

**Space Grotesk** (`font-space`)
- **Usage:** Headlines, section titles, all display text, UI elements
- **Weights Used:**
  - `font-bold` (700) - Main headlines (h1, h2, h3)
  - `font-semibold` (600) - Subheadings, feature titles, CTAs
- **Fallback:** `-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`

**Inter** (`font-inter`)
- **Usage:** Body text, descriptions, form inputs, supporting text
- **Weights Used:**
  - `font-bold` (700) - Emphasis in body text
  - `font-semibold` (600) - Feature descriptions, card titles
  - `font-medium` (500) - Slightly emphasized body text
  - `font-normal` (400) - Standard body copy (default)
  - `font-light` (300) - Subtle text elements (rare)
- **Fallback:** `-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`

**JetBrains Mono** (`font-mono`)
- **Usage:** Code snippets, technical content only
- **Fallback:** `SF Mono, Monaco, Cascadia Code, monospace`

---

## Typography Scale (Text Sizes)

### Responsive Scale Strategy
All text sizes use responsive Tailwind utilities with mobile-first breakpoints.

### Standard Scale

| Class | Mobile | Tablet (sm:) | Desktop (md:) | Desktop (lg:) | Usage |
|-------|--------|--------------|---------------|---------------|-------|
| `text-xs` | 12px | 14px | - | - | Fine print, timestamps, badges |
| `text-sm` | 14px | 16px | - | - | Supporting text, captions, form labels |
| `text-base` | 16px | 18px | - | - | Standard body text |
| `text-lg` | 18px | 20px | - | - | Large body text, introductions |
| `text-xl` | 20px | 24px | - | - | Subheadings, lead paragraphs |
| `text-2xl` | 24px | 30px | - | - | Section subheaders |
| `text-3xl` | 30px | 36px | 48px | - | Secondary headlines |
| `text-4xl` | 36px | 48px | 60px | - | Primary headlines |
| `text-5xl` | 48px | 60px | 72px | - | Hero headlines |
| `text-6xl` | 60px | 72px | 96px | - | Extra large hero text (rare) |

### Custom Arbitrary Values (Used in Hero)
- `text-[2.7rem]` (43.2px) → Hero headline mobile
- `text-[3.6rem]` (57.6px) → Hero headline tablet (sm:)
- `text-[4.5rem]` (72px) → Hero headline desktop (md: and lg:)

---

## Typography by Page Section

### Hero Section (HomeHeroSection.tsx)
```
Headline:
- font-space font-bold
- text-[2.7rem] sm:text-[3.6rem] md:text-[4.5rem] lg:text-[4.5rem]
- leading-tight
- drop-shadow-2xl

Subheadline:
- font-inter
- text-lg sm:text-xl md:text-2xl
- leading-snug space-y-2
- font-medium
- drop-shadow-md

Badge:
- font-inter font-medium
- text-sm
```

### About Page Hero
```
Main Headline:
- font-space font-bold
- text-5xl md:text-6xl

Body Text:
- font-inter
- text-xl
- leading-relaxed

Section Headers (h2):
- font-space font-bold
- text-4xl md:text-5xl

Card Titles (h3):
- font-space font-bold
- text-2xl

Card Body:
- font-inter
- text-lg
- leading-relaxed
```

### FleetCopilot Section
```
Section Headline (h2):
- font-space font-bold
- text-4xl md:text-5xl
- leading-tight

Description:
- font-inter
- text-lg
- leading-relaxed (line-height: 1.7)

Feature Card Titles (h3):
- font-space font-bold
- text-lg

Feature Card Descriptions:
- font-inter
- text-sm
- leading-relaxed

Notification Card Titles:
- font-space font-semibold
- text-xl to text-2xl

Notification Card Body:
- font-inter
- text-sm
- leading-relaxed
```

### Platform Modules Section
```
Tab Labels:
- font-space font-semibold
- text-base md:text-lg

Feature Titles:
- font-space font-bold
- text-xl md:text-2xl

Feature Descriptions:
- font-inter
- text-base md:text-lg
```

### Buttons & CTAs
```
Primary Buttons:
- font-poppins (deprecated - being replaced with font-space)
- font-bold
- text-xs sm:text-sm
- uppercase tracking-wide

Modern Buttons (new standard):
- font-space font-semibold
- text-sm md:text-base
```

---

## Font Weight Hierarchy

### Space Grotesk Usage
- **Bold (700)**: All headlines (h1, h2, h3), section titles
- **Semibold (600)**: CTAs, feature titles, card headers
- **Regular (400)**: Minimal use (tab labels, nav items)

### Inter Usage
- **Bold (700)**: Rare - strong emphasis in body text
- **Semibold (600)**: Feature list items, emphasized paragraphs
- **Medium (500)**: Subheadings within body text, badge text
- **Regular (400)**: 95% of body copy
- **Light (300)**: Very rare - subtle UI text

---

## Line Heights (Leading)

| Class | Value | Usage |
|-------|-------|-------|
| `leading-none` | 1 | Rare - very tight headlines |
| `leading-tight` | 1.25 | Headlines, hero text |
| `leading-snug` | 1.375 | Subheadings, short descriptions |
| `leading-normal` | 1.5 | Standard body text |
| `leading-relaxed` | 1.625 | Long-form body text, articles |
| `leading-loose` | 2 | Rarely used |

### Custom Line Heights
- Hero subheadline: `leading-snug` with `space-y-2` between paragraphs
- Feature descriptions: `leading-relaxed` (1.625)
- Long-form content: `leading-relaxed` (1.625)
- Mobile headlines: `line-height: 1.2` (media query)

---

## Spacing System (4px/8px Base Grid)

### CSS Variables
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
```

### Tailwind Spacing Scale
| Class | Size | Usage |
|-------|------|-------|
| `p-1, m-1` | 4px | Minimal spacing, tight elements |
| `p-2, m-2` | 8px | Small padding, icons |
| `p-3, m-3` | 12px | Badge padding |
| `p-4, m-4` | 16px | Standard card padding (mobile) |
| `p-5, m-5` | 20px | Medium card padding |
| `p-6, m-6` | 24px | Standard card padding (desktop) |
| `p-8, m-8` | 32px | Large sections, containers |
| `p-10, m-10` | 40px | Extra large spacing |
| `p-12, m-12` | 48px | Section vertical spacing (mobile) |
| `p-16, m-16` | 64px | Section vertical spacing (desktop) |
| `p-20, m-20` | 80px | Large hero sections |
| `p-24, m-24` | 96px | Extra large sections |

### Common Spacing Patterns

**Section Padding (Vertical):**
```
Mobile: py-12 (48px)
Tablet: py-16 (64px)
Desktop: py-20 md:py-24 (80px - 96px)
```

**Container Padding (Horizontal):**
```
Mobile: px-4 (16px)
Tablet: sm:px-6 (24px)
Desktop: lg:px-8 (32px)
```

**Card Padding:**
```
Mobile: p-4 sm:p-6 (16px - 24px)
Desktop: lg:p-8 (32px)
```

**Gap Between Elements:**
```
Tight: gap-2 sm:gap-3 (8px - 12px)
Standard: gap-4 sm:gap-6 (16px - 24px)
Loose: gap-6 sm:gap-8 lg:gap-12 (24px - 48px)
```

**Margin Between Sections:**
```
Titles to body: mb-4 sm:mb-6 (16px - 24px)
Body to features: mb-6 sm:mb-8 (24px - 32px)
Feature lists: space-y-4 sm:space-y-6 (16px - 24px)
```

---

## Mobile Responsive Utilities (Custom)

### Mobile-Optimized Text Classes (from index.css)
```
.text-mobile-xs   → text-xs sm:text-sm
.text-mobile-sm   → text-sm sm:text-base
.text-mobile-base → text-base sm:text-lg
.text-mobile-lg   → text-lg sm:text-xl
.text-mobile-xl   → text-xl sm:text-2xl
.text-mobile-2xl  → text-2xl sm:text-3xl
.text-mobile-3xl  → text-3xl sm:text-4xl
.text-mobile-4xl  → text-4xl sm:text-5xl
```

### Mobile Spacing Classes
```
.mobile-padding → px-4 sm:px-6 lg:px-8
.mobile-margin  → mx-4 sm:mx-6 lg:mx-8
.mobile-section → py-12 (mobile-specific)
```

---

## Text Color Hierarchy

### Light Mode
```
High Contrast (Headlines):
- text-gray-900 (primary headers)
- text-primary-600 (branded headlines)

Medium Contrast (Body):
- text-gray-700 to text-gray-800 (body text)

Low Contrast (Subtle):
- text-gray-600 (supporting text)
- text-gray-500 (captions, timestamps)
```

### Dark Mode
```
High Contrast (Headlines):
- dark:text-white (primary headers)
- dark:text-primary-400 (branded headlines)

Medium Contrast (Body):
- dark:text-gray-200 to dark:text-gray-300

Low Contrast (Subtle):
- dark:text-gray-400 (supporting text)
- dark:text-gray-500 (captions)
```

---

## Best Practices & Rules

### Typography
1. **Always pair font family with weight**: `font-space font-bold`
2. **Use responsive text sizes**: `text-4xl md:text-5xl lg:text-6xl`
3. **Set line-height explicitly** for headlines: `leading-tight` or `leading-snug`
4. **Space Grotesk for headlines, Inter for body** - no exceptions
5. **Avoid mixing weights unnecessarily** - use `font-bold` for h1-h3, `font-semibold` for h4-h6

### Spacing
1. **Maintain 4px/8px grid** - all spacing divisible by 4
2. **Use responsive spacing**: `mb-4 sm:mb-6 md:mb-8`
3. **Section padding formula**: Mobile (py-12) → Tablet (py-16) → Desktop (py-20/py-24)
4. **Container padding**: Always `px-4 sm:px-6 lg:px-8`
5. **Card internal spacing**: `p-4 sm:p-6 lg:p-8`

### Common Combinations
```tsx
// Hero Headline
<h1 className="font-space font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">

// Section Headline  
<h2 className="font-space font-bold text-3xl md:text-4xl leading-tight mb-8">

// Feature Card Title
<h3 className="font-space font-semibold text-xl md:text-2xl mb-4">

// Body Paragraph
<p className="font-inter text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">

// Supporting Text
<p className="font-inter text-sm text-gray-600 dark:text-gray-400">
```

---

## Usage Statistics (Current Codebase)

**Font Usage Across 39 Files:**
- `font-space`: Used for all headlines and display text
- `font-inter`: Used for all body text and descriptions
- `font-bold`: 693 instances (primarily headlines)
- `font-semibold`: Common in CTAs and subheadings
- `font-medium`: Used sparingly for emphasis

**Text Size Distribution:**
- Most common: `text-lg`, `text-xl`, `text-2xl` (body and subheadings)
- Headlines: `text-4xl`, `text-5xl`, `text-6xl`
- Supporting text: `text-sm`, `text-base`
- Total text size instances: 575 across all components

---

## Migration Notes

### Deprecated
- **Poppins font** (being phased out - previously used for CTAs)
  - Migrate to: `font-space font-semibold` for buttons

### Current Standard (2025)
- Two-font system: Space Grotesk + Inter
- Responsive-first approach
- 4px/8px spacing grid
- Mobile-first breakpoints
