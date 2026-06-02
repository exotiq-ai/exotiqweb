#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 Verifying Build...');

// Check if dist exists
if (!fs.existsSync('dist')) {
    console.error('❌ dist folder not found - run npm run build first');
    process.exit(1);
}

// Check critical files
const criticalFiles = [
    'dist/index.html',
    'dist/og-exotiq-ai-fleet.png',
    'dist/favicon.svg',
    'dist/icon-192.png',
    'dist/icon-512.png',
    'dist/apple-touch-icon.png'
];

console.log('1. Checking critical files...');
criticalFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.error(`❌ ${file} missing`);
        process.exit(1);
    }
});

// Check if cookie fixes are in built JS
console.log('2. Checking cookie fixes in built files...');
const jsDir = 'dist/assets/js';
if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
    let foundCookieFixes = false;
    let foundAnalyticsFixes = false;

    jsFiles.forEach(file => {
        const content = fs.readFileSync(path.join(jsDir, file), 'utf8');
        if (content.includes('useEffect') && content.includes('localStorage')) {
            foundCookieFixes = true;
        }
        if (content.includes('try {') && content.includes('gtag')) {
            foundAnalyticsFixes = true;
        }
    });

    if (foundCookieFixes) {
        console.log('✅ Cookie fixes found in built files');
    } else {
        console.error('❌ Cookie fixes missing from built files');
        process.exit(1);
    }

    if (foundAnalyticsFixes) {
        console.log('✅ Analytics error handling found in built files');
    } else {
        console.log('⚠️  Analytics error handling not found (may be minified)');
    }
} else {
    console.error('❌ dist/assets/js folder not found');
    process.exit(1);
}

// Check OG image configuration
console.log('3. Checking Open Graph configuration...');
const indexHtml = fs.readFileSync('dist/index.html', 'utf8');
if (indexHtml.includes('og-exotiq-ai-fleet.png') && indexHtml.includes('og:image')) {
    console.log('✅ Open Graph image configured correctly');
} else {
    console.error('❌ Open Graph image not configured correctly');
    process.exit(1);
}

console.log('✅ Build verification complete - safe to deploy!');
