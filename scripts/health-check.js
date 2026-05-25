#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🏥 Pre-Deployment Health Check');

// Check critical files
const criticalFiles = [
    'dist/index.html',
    'dist/error-recovery.js',
    'dist/.htaccess'
];

let allHealthy = true;

// Check if dist exists
if (!fs.existsSync('dist')) {
    console.error('❌ dist folder not found - run npm run build first');
    process.exit(1);
}

// Check critical files
console.log('1. Checking critical files...');
criticalFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.error(`❌ ${file} missing`);
        allHealthy = false;
    }
});

// Check JavaScript files
console.log('2. Checking JavaScript files...');
const jsDir = 'dist/assets/js';
if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
    if (jsFiles.length === 0) {
        console.error('❌ No JavaScript files found in dist/assets/js');
        allHealthy = false;
    } else {
        console.log(`✅ Found ${jsFiles.length} JavaScript files`);
        
        const intentionallySmallChunks = [
            'Analytics',
            'MobileOptimizations',
            'SurveyIcons',
            'useScrollAnimation'
        ];

        // Check file sizes
        jsFiles.forEach(file => {
            const filePath = path.join(jsDir, file);
            const stats = fs.statSync(filePath);

            const isIntentionallySmall = intentionallySmallChunks.some(chunk => file.includes(chunk));
            const minSize = isIntentionallySmall ? 200 : 1000;
            
            if (stats.size < minSize) {
                console.error(`❌ ${file} is suspiciously small (${stats.size} bytes)`);
                allHealthy = false;
            } else {
                console.log(`✅ ${file} size OK (${Math.round(stats.size / 1024)}KB)`);
            }
        });
    }
} else {
    console.error('❌ dist/assets/js folder not found');
    allHealthy = false;
}

// Check CSS files
console.log('3. Checking CSS files...');
const cssDir = 'dist/assets/css';
if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
    if (cssFiles.length === 0) {
        console.error('❌ No CSS files found in dist/assets/css');
        allHealthy = false;
    } else {
        console.log(`✅ Found ${cssFiles.length} CSS files`);
    }
} else {
    console.error('❌ dist/assets/css folder not found');
    allHealthy = false;
}

// Check for error recovery system
console.log('4. Checking error recovery system...');
if (fs.existsSync('dist/error-recovery.js')) {
    const content = fs.readFileSync('dist/error-recovery.js', 'utf8');
    if (content.includes('error-recovery-message') && content.includes('showFallbackPage')) {
        console.log('✅ Error recovery system properly configured');
    } else {
        console.error('❌ Error recovery system missing key functions');
        allHealthy = false;
    }
} else {
    console.error('❌ Error recovery system not found');
    allHealthy = false;
}

// Check for .htaccess file
console.log('5. Checking server configuration...');
if (fs.existsSync('dist/.htaccess')) {
    const content = fs.readFileSync('dist/.htaccess', 'utf8');
    if (content.includes('application/javascript') && content.includes('mod_mime')) {
        console.log('✅ Server configuration file present');
    } else {
        console.error('❌ Server configuration file incomplete');
        allHealthy = false;
    }
} else {
    console.error('❌ Server configuration file (.htaccess) not found');
    allHealthy = false;
}

// Check for cookie fixes
console.log('6. Checking cookie fixes...');
const indexHtml = fs.readFileSync('dist/index.html', 'utf8');
if (indexHtml.includes('error-recovery.js') && indexHtml.includes('exotiq-logo-lockup.png')) {
    console.log('✅ Index.html properly configured');
} else {
    console.error('❌ Index.html missing critical configurations');
    allHealthy = false;
}

if (allHealthy) {
    console.log('✅ Health check passed - safe to deploy');
    process.exit(0);
} else {
    console.log('❌ Health check failed - fix issues before deploying');
    process.exit(1);
}
