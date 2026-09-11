# Hero Image Setup Guide

This directory contains the rotating hero carousel images for Exotiq.ai. Follow these instructions to add your exotic car images.

## Directory Structure

```
public/images/hero/
├── originals/          # Place your high-res source images here
│   ├── audi-r8-desert.jpg
│   ├── mclaren-720s-urban-night.jpg
│   ├── lamborghini-huracan-coastal.jpg
│   ├── porsche-911-gt3rs-mountain.jpg
│   └── ferrari-488-pista-racetrack.jpg
│
└── [optimized files will be generated here]
    ├── audi-r8-desert-desktop.webp
    ├── audi-r8-desert-tablet.webp
    ├── audi-r8-desert-mobile.webp
    ├── audi-r8-desert-tiny.jpg
    └── ... (all variants)
```

## Step-by-Step Instructions

### 1. Create the Originals Directory

```bash
mkdir -p public/images/hero/originals
```

### 2. Add Your Images

Save your 5 hero images to `public/images/hero/originals/` with these exact names:

1. **audi-r8-desert.jpg** - Your provided Audi R8 on desert highway
2. **mclaren-720s-urban-night.jpg** - Orange McLaren in urban night setting
3. **lamborghini-huracan-coastal.jpg** - Green Lamborghini on coastal PCH
4. **porsche-911-gt3rs-mountain.jpg** - Red Porsche GT3 RS on mountain road  
5. **ferrari-488-pista-racetrack.jpg** - Red Ferrari on Road Atlanta track

### 3. Image Requirements

**Resolution**: 3840x2160px minimum (4K recommended)
**Format**: JPG or PNG
**Size**: 2-10MB (will be optimized automatically)
**Aspect Ratio**: 16:9 or wider
**Quality**: High-resolution, professional photography

### 4. Run the Optimization Script

```bash
npm run optimize-images
```

This will automatically:
- Convert images to WebP (70-80% file size reduction)
- Generate responsive sizes (mobile, tablet, desktop, 4K)
- Create tiny blur placeholders for lazy loading
- Maintain JPG fallbacks for older browsers

### 5. Verify the Output

Check that these files were generated:

```bash
ls -lh public/images/hero/
```

You should see:
- `*-mobile.webp` (~150KB each)
- `*-tablet.webp` (~300KB each)
- `*-desktop.webp` (~600KB each)
- `*-tiny.jpg` (~5KB each)
- Plus JPG fallbacks for all sizes

## Image Metadata

Each image is configured in `src/data/heroImages.ts` with:
- SEO-optimized alt text
- Accessibility titles
- Overlay intensity settings
- Background positioning
- Dominant color schemes

## Testing

1. **Desktop**: Images should load in < 1.5s on 3G
2. **Mobile**: Should serve mobile-optimized versions automatically
3. **WebP Support**: Modern browsers get WebP, others get JPG
4. **Rotation**: Images should rotate every 8 seconds
5. **Navigation**: Arrow keys, dot indicators, and pause/play should work

## Troubleshooting

### Images not loading?
- Check file names match exactly (case-sensitive)
- Verify images are in `/public/images/hero/` not `/public/images/hero/originals/`
- Clear browser cache and rebuild: `npm run build`

### Optimization script fails?
- Ensure Sharp is installed: `npm install sharp`
- Check Node.js version: `node -v` (should be 14+ for Sharp)
- Verify originals directory exists and has images

### Performance issues?
- Run `npm run build` and check bundle sizes
- Test with network throttling (Chrome DevTools)
- Verify WebP images are being served (Network tab)

## Future Enhancements

- CDN integration (Cloudflare/Cloudinary)
- AVIF format support (even smaller than WebP)
- Automatic color extraction for dynamic overlays
- Video background support for hero section

## Support

For issues or questions, reference:
- Plan: `Hero Image Enhancement Plan`
- Hook: `src/hooks/useHeroImageRotation.ts`
- Component: `src/components/HomeHeroSection.tsx`
- Data: `src/data/heroImages.ts`



## Home hero — mobile portrait cut of the Koenigsegg Regera

Phones (< 1024px) get a dedicated portrait crop of `koenigsegg-regera.jpg`
(2560×1707) instead of the landscape cover crop, so the car actually reads on
a 390px screen. Source rectangle: x 1040→2210, y 0→1707 (1170×1707). Served at
780w (2×) and 1170w (3×) as WebP with JPEG fallbacks. Regenerate with:

```bash
cd public/images/hero
# sips takes HEIGHT then WIDTH; --cropOffset takes Y then X
sips -s format png koenigsegg-regera.jpg --cropOffset 0 1040 -c 1707 1170 --out /tmp/regera-mobile-1170.png
sips -s format png --resampleWidth 780 /tmp/regera-mobile-1170.png --out /tmp/regera-mobile-780.png
cwebp -q 80 -m 6 /tmp/regera-mobile-1170.png -o koenigsegg-regera-mobile-1170.webp
cwebp -q 80 -m 6 /tmp/regera-mobile-780.png  -o koenigsegg-regera-mobile-780.webp
sips -s format jpeg -s formatOptions 82 /tmp/regera-mobile-1170.png --out koenigsegg-regera-mobile-1170.jpg
sips -s format jpeg -s formatOptions 82 /tmp/regera-mobile-780.png  --out koenigsegg-regera-mobile-780.jpg
```

`src/components/HomeHeroSection.tsx` and the preload in `index.html` reference
these four files by name.
