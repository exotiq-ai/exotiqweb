#!/usr/bin/env node

import fs from 'fs';

console.log('🔍 Pre-Deployment Checklist');

let allChecksPassed = true;

// Check if cookie fixes are present
console.log('1. Checking cookie fixes...');
if (fs.existsSync('src/components/CookieConsentBanner.tsx')) {
    const content = fs.readFileSync('src/components/CookieConsentBanner.tsx', 'utf8');
    if (content.includes('useEffect(() => {') && content.includes('try {')) {
        console.log('✅ CookieConsentBanner has useEffect fix and error handling');
    } else {
        console.log('❌ CookieConsentBanner missing useEffect fix or error handling');
        allChecksPassed = false;
    }
} else {
    console.log('❌ CookieConsentBanner.tsx not found');
    allChecksPassed = false;
}

// Check if OG image is correct
console.log('2. Checking Open Graph image...');
if (fs.existsSync('index.html')) {
    const content = fs.readFileSync('index.html', 'utf8');
    if (content.includes('og-exotiq-ai-fleet.png') && content.includes('og:image')) {
        console.log('✅ OG image is correct');
    } else {
        console.log('❌ OG image is incorrect');
        allChecksPassed = false;
    }
} else {
    console.log('❌ index.html not found');
    allChecksPassed = false;
}

// Check if analytics has error handling
console.log('3. Checking analytics error handling...');
if (fs.existsSync('src/components/Analytics.tsx')) {
    const content = fs.readFileSync('src/components/Analytics.tsx', 'utf8');
    if (content.includes('try {') && content.includes('catch (error)')) {
        console.log('✅ Analytics has error handling');
    } else {
        console.log('❌ Analytics missing error handling');
        allChecksPassed = false;
    }
} else {
    console.log('❌ Analytics.tsx not found');
    allChecksPassed = false;
}

// Check if SEOHead has correct image
console.log('4. Checking SEOHead component...');
if (fs.existsSync('src/components/SEOHead.tsx')) {
    const content = fs.readFileSync('src/components/SEOHead.tsx', 'utf8');
    if (content.includes('og-exotiq-ai-fleet.png')) {
        console.log('✅ SEOHead has correct image');
    } else {
        console.log('❌ SEOHead has incorrect image');
        allChecksPassed = false;
    }
} else {
    console.log('❌ SEOHead.tsx not found');
    allChecksPassed = false;
}

if (allChecksPassed) {
    console.log('✅ All checks passed - safe to deploy!');
    process.exit(0);
} else {
    console.log('❌ Some checks failed - fix issues before deploying');
    process.exit(1);
}
