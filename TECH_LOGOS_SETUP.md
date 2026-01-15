# Tech Partner Logos Setup Guide

## Quick Start: 3 Options

### Option 1: Manual Download (Best Quality - Recommended)
Download logos from official brand pages and save to `/public/images/logos/tech-partners/`

### Option 2: Use the Logos I Found (Fastest)
I'll provide you with direct download links below

### Option 3: Create Your Own Sprite Sheet
Use the design from your deck (image 1) and export as PNG

---

## Option 1: Official Brand Assets (Recommended)

### 1. Stripe
- **Official Page:** https://stripe.com/newsroom/brand-assets
- **Download:** Stripe wordmark (Black or Blurple)
- **Save as:** `stripe.png`
- **Format:** PNG or SVG, transparent background

### 2. OpenAI
- **Official Page:** https://openai.com/brand
- **Download:** OpenAI logo (Black)
- **Save as:** `openai.png`
- **Note:** Use the wordmark version (circle + text)

### 3. Plaid
- **Official Page:** https://plaid.com/brand/
- **Download:** Plaid logo (Black)
- **Save as:** `plaid.png`
- **Note:** Use the full logo (icon + wordmark)

### 4. Claude (Anthropic)
- **Official Page:** https://www.anthropic.com/brand
- **Download:** Claude logo (Orange asterisk + black text)
- **Save as:** `claude.png`
- **Note:** Use horizontal layout

### 5. Axle
- **Website:** https://www.axle.insure/
- **Method:** Right-click on logo → Save image
- **Save as:** `axle.png`
- **Note:** Use black version if available

### 6. Persona
- **Official Page:** https://withpersona.com/
- **Method:** Inspect element and download logo from footer
- **Save as:** `persona.png`
- **Note:** Purple asterisk + black text

### 7. PredictHQ
- **Website:** https://www.predicthq.com/
- **Method:** Right-click on logo → Save image
- **Save as:** `predicthq.png`
- **Note:** Orange/red hexagon + black text

### 8. Brex
- **Official Page:** https://www.brex.com/brand
- **Download:** Brex logo (Black)
- **Save as:** `brex.png`
- **Note:** Use wordmark version

### 9. Gemini (Google AI)
- **Website:** https://ai.google.dev/
- **Method:** Download Gemini sparkle logo
- **Save as:** `gemini.png`
- **Note:** Colorful sparkle + text

---

## Option 2: Quick Download Links

I've found these direct links (may require manual download):

```bash
# Create directory
mkdir -p public/images/logos/tech-partners

# Download using these URLs (visit in browser and save):
```

**Stripe:**
- https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_wordmark_-_blurple.svg

**OpenAI:**
- https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg

**Plaid:**
- https://plaid.com/assets/img/press-kit/plaid-logo-black.png

**Claude:**
- Visit https://www.anthropic.com/ and download logo from press kit

**Others:**
- Visit company websites and download from footer or press/brand pages

---

## Option 3: Use Your Existing Design

You already have a beautiful tech partner slide (image 1 you shared). Here's how to use it:

### Steps:
1. Open your design tool (Figma, Canva, etc.)
2. Export each logo individually:
   - **Size:** 200x80px (or maintain aspect ratio)
   - **Format:** PNG
   - **Background:** Transparent
   - **Color:** Black or white (for dark mode)

3. Save to `/public/images/logos/tech-partners/` with these names:
   - `stripe.png`
   - `openai.png`
   - `claude.png`
   - `plaid.png`
   - `axle.png`
   - `persona.png`
   - `predicthq.png`
   - `brex.png`
   - `gemini.png`

---

## Investor Logos (1080 Ventures & LEX Growth Studio)

You already provided these! Just save them to:

```
/public/images/logos/investors/1080-ventures.png
/public/images/logos/investors/lex-growth-studio.png
```

**Requirements:**
- **Format:** PNG with transparent background
- **Size:** Height ~100-120px (width auto)
- **Color:** White or light version (for dark background)

---

## Logo Specifications

### Size Guidelines
- **Desktop:** Height 32-40px (width auto)
- **Mobile:** Height 24-32px (width auto)
- **Hover:** Scale to 105%

### Format
- **Preferred:** PNG or SVG
- **Background:** Transparent
- **Color:** Black (will be inverted to white via CSS filter)

### File Naming
- Lowercase
- Hyphens for spaces
- Example: `lex-growth-studio.png`

---

## CSS Filters Applied

The page uses these CSS filters to make logos work on dark backgrounds:

```css
filter: brightness(0) invert(1)
```

This converts any colored logo to white. If you want to preserve logo colors:
1. Remove the `filter` class
2. Provide white/light versions of logos
3. Or use SVGs with `fill="white"`

---

## Testing

After adding logos, test:

1. **Local Preview:**
   ```bash
   npm run dev
   ```
   Visit: http://localhost:5174/investors

2. **Check:**
   - [ ] All logos load correctly
   - [ ] Logos are white/light on dark background
   - [ ] Hover effects work (grayscale → color)
   - [ ] Mobile responsive (logos scale down)
   - [ ] Fallback text appears if logo fails

3. **Build:**
   ```bash
   npm run build
   ```
   Verify logos are included in `dist/images/logos/`

---

## Fallback Strategy

If a logo doesn't load, the page will:
1. Hide the broken image
2. Display the company name as text
3. Maintain spacing and layout

This is already implemented in the code!

---

## Quick Checklist

- [ ] Create `/public/images/logos/investors/` directory
- [ ] Add `1080-ventures.png` (provided by you)
- [ ] Add `lex-growth-studio.png` (provided by you)
- [ ] Create `/public/images/logos/tech-partners/` directory
- [ ] Download/add all 9 tech partner logos
- [ ] Test locally at http://localhost:5174/investors
- [ ] Verify all logos display correctly
- [ ] Build and deploy

---

## Need Help?

If you want me to:
1. ✅ **Create placeholder logos** (I can generate simple text-based versions)
2. ✅ **Adjust sizing/spacing** (I can tweak the CSS)
3. ✅ **Add more partners** (I can expand the grid)

Just let me know!

---

## Current Status

✅ **Code Updated:** Investor page now references logo files  
✅ **Directories Created:** `/public/images/logos/investors/` and `/tech-partners/`  
✅ **Fallbacks Implemented:** Text displays if logos don't load  
⏳ **Logos Needed:** 2 investor + 9 tech partner logos  

**Next Step:** Add the logo files and test!

