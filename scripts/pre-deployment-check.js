#!/usr/bin/env node

import fs from 'fs';

console.log('🔍 Pre-Deployment Checklist');

let allChecksPassed = true;

const fail = (message) => {
    console.log(`❌ ${message}`);
    allChecksPassed = false;
};

const pass = (message) => {
    console.log(`✅ ${message}`);
};

const read = (file) => fs.readFileSync(file, 'utf8');

// Check if cookie fixes are present
console.log('1. Checking cookie fixes...');
if (fs.existsSync('src/components/CookieConsentBanner.tsx')) {
    const content = read('src/components/CookieConsentBanner.tsx');
    if (content.includes('useEffect(() => {') && content.includes('try {')) {
        pass('CookieConsentBanner has useEffect fix and error handling');
    } else {
        fail('CookieConsentBanner missing useEffect fix or error handling');
    }
} else {
    fail('CookieConsentBanner.tsx not found');
}

// Check if OG image is correct
console.log('2. Checking Open Graph image...');
if (fs.existsSync('index.html')) {
    const content = read('index.html');
    if (content.includes('og-exotiq-ai-fleet.png') && content.includes('og:image')) {
        pass('OG image is correct');
    } else {
        fail('OG image is incorrect');
    }
} else {
    fail('index.html not found');
}

// Check if analytics has error handling
console.log('3. Checking analytics error handling...');
if (fs.existsSync('src/components/Analytics.tsx')) {
    const content = read('src/components/Analytics.tsx');
    if (content.includes('try {') && content.includes('catch (error)')) {
        pass('Analytics has error handling');
    } else {
        fail('Analytics missing error handling');
    }
} else {
    fail('Analytics.tsx not found');
}

// Check if SEOHead has correct default social image
console.log('4. Checking SEOHead component...');
if (fs.existsSync('src/components/SEOHead.tsx')) {
    const content = read('src/components/SEOHead.tsx');
    if (content.includes('og-exotiq-ai-fleet.png')) {
        pass('SEOHead has correct social image');
    } else {
        fail('SEOHead has incorrect social image');
    }
} else {
    fail('SEOHead.tsx not found');
}

console.log('5. Checking public assets...');
[
    'public/exotiq-logo-lockup.png',
    'public/og-exotiq-ai-fleet.png',
    'public/site.webmanifest',
    'public/robots.txt',
    'public/sitemap.xml'
].forEach((file) => {
    if (fs.existsSync(file)) {
        pass(`${file} exists`);
    } else {
        fail(`${file} missing`);
    }
});

console.log('6. Checking sitemap route hygiene...');
if (fs.existsSync('public/sitemap.xml')) {
    const sitemap = read('public/sitemap.xml');
    const requiredRoutes = ['/', '/features', '/pricing', '/survey', '/fleetcopilot', '/about', '/contact', '/investors', '/blog'];
    const blockedRoutes = ['/admin', '/test', '/gtm-test', '/simple-gtm'];

    requiredRoutes.forEach((route) => {
        const url = route === '/' ? 'https://exotiq.ai/' : `https://exotiq.ai${route}`;
        if (sitemap.includes(`<loc>${url}</loc>`)) {
            pass(`Sitemap includes ${route}`);
        } else {
            fail(`Sitemap missing ${route}`);
        }
    });

    blockedRoutes.forEach((route) => {
        if (sitemap.includes(`https://exotiq.ai${route}`)) {
            fail(`Sitemap should not include ${route}`);
        }
    });
} else {
    fail('public/sitemap.xml not found');
}

console.log('7. Checking structured data freshness...');
if (fs.existsSync('src/data/structuredData.ts')) {
    const structuredData = read('src/data/structuredData.ts');
    const match = structuredData.match(/"priceValidUntil": "([^"]+)"/);
    const priceValidUntil = match ? new Date(`${match[1]}T00:00:00Z`) : null;

    if (structuredData.includes('https://exotiq.ai/exotiq-logo-lockup.png')) {
        pass('Structured data references an existing logo asset');
    } else {
        fail('Structured data logo must use exotiq-logo-lockup.png');
    }

    if (priceValidUntil && priceValidUntil > new Date()) {
        pass(`Structured data priceValidUntil is current (${match[1]})`);
    } else {
        fail('Structured data priceValidUntil is missing or expired');
    }
} else {
    fail('src/data/structuredData.ts not found');
}

if (allChecksPassed) {
    console.log('✅ All checks passed - safe to deploy!');
    process.exit(0);
} else {
    console.log('❌ Some checks failed - fix issues before deploying');
    process.exit(1);
}
