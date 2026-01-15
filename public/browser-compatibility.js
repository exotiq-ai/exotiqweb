// Browser Compatibility & Feature Detection
// Ensures optimal experience across all browsers and devices

(function () {
    'use strict';

    console.log('🔍 Browser Compatibility Check Starting...');

    // Browser detection
    const browserInfo = {
        userAgent: navigator.userAgent,
        isChrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        isSafari: /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
        isFirefox: /Firefox/.test(navigator.userAgent),
        isEdge: /Edg/.test(navigator.userAgent),
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        isAndroid: /Android/.test(navigator.userAgent)
    };

    console.log('Browser Info:', browserInfo);

    // Feature detection
    const features = {
        localStorage: typeof (Storage) !== "undefined",
        sessionStorage: typeof (Storage) !== "undefined",
        webWorkers: typeof (Worker) !== "undefined",
        serviceWorkers: 'serviceWorker' in navigator,
        pushNotifications: 'PushManager' in window,
        geolocation: 'geolocation' in navigator,
        webGL: !!window.WebGLRenderingContext,
        webGL2: !!window.WebGL2RenderingContext,
        canvas: !!document.createElement('canvas').getContext,
        svg: !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect,
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid'),
        customProperties: CSS.supports('color', 'var(--test)'),
        backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
        intersectionObserver: 'IntersectionObserver' in window,
        resizeObserver: 'ResizeObserver' in window,
        mutationObserver: 'MutationObserver' in window,
        fetch: 'fetch' in window,
        promises: 'Promise' in window,
        asyncAwait: (async function () { }).constructor === Function,
        es6Modules: 'noModule' in HTMLScriptElement.prototype,
        webComponents: 'customElements' in window
    };

    console.log('Feature Support:', features);

    // Browser-specific optimizations
    if (browserInfo.isSafari) {
        console.log('🍎 Safari optimizations applied');

        // Fix Safari-specific issues
        document.documentElement.style.setProperty('--safari-fix', '1');

        // Prevent zoom on input focus
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.style.fontSize === '') {
                input.style.fontSize = '16px';
            }
        });

        // Fix smooth scrolling
        if (!CSS.supports('scroll-behavior', 'smooth')) {
            document.documentElement.style.scrollBehavior = 'auto';
        }
    }

    if (browserInfo.isChrome) {
        console.log('🌐 Chrome optimizations applied');

        // Chrome-specific performance optimizations
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
                console.log('Chrome: Idle callback executed');
            });
        }
    }

    if (browserInfo.isFirefox) {
        console.log('🦊 Firefox optimizations applied');

        // Firefox-specific fixes
        document.documentElement.style.setProperty('--firefox-fix', '1');
    }

    if (browserInfo.isEdge) {
        console.log('🔷 Edge optimizations applied');

        // Edge-specific optimizations
        document.documentElement.style.setProperty('--edge-fix', '1');
    }

    // Mobile-specific optimizations
    if (browserInfo.isMobile) {
        console.log('📱 Mobile optimizations applied');

        // Prevent double-tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Improve touch scrolling (wait for body to be available)
        if (document.body) {
            document.body.style.touchAction = 'manipulation';
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.style.touchAction = 'manipulation';
            });
        }

        // Fix viewport height on mobile
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
    }

    // iOS-specific optimizations
    if (browserInfo.isIOS) {
        console.log('📱 iOS optimizations applied');

        // Fix iOS Safari viewport issues
        const meta = document.querySelector('meta[name="viewport"]');
        if (meta) {
            meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
        }

        // Fix iOS scroll bounce
        if (document.body) {
            document.body.style.webkitOverflowScrolling = 'touch';
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.style.webkitOverflowScrolling = 'touch';
            });
        }

        // Fix iOS input zoom
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.style.fontSize = '16px';
        });
    }

    // Android-specific optimizations
    if (browserInfo.isAndroid) {
        console.log('🤖 Android optimizations applied');

        // Fix Android keyboard issues
        window.addEventListener('resize', () => {
            setTimeout(() => {
                const activeElement = document.activeElement;
                if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                    activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 300);
        });
    }

    // Performance optimizations
    if (features.intersectionObserver) {
        console.log('⚡ Intersection Observer available - enabling lazy loading');

        // Enable lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Error handling for unsupported features
    if (!features.localStorage) {
        console.warn('⚠️ localStorage not supported - using fallback');
        window.localStorage = {
            getItem: () => null,
            setItem: () => { },
            removeItem: () => { },
            clear: () => { }
        };
    }

    if (!features.fetch) {
        console.warn('⚠️ Fetch not supported - using XMLHttpRequest fallback');
        window.fetch = function (url, options) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(options?.method || 'GET', url);

                if (options?.headers) {
                    Object.keys(options.headers).forEach(key => {
                        xhr.setRequestHeader(key, options.headers[key]);
                    });
                }

                xhr.onload = () => {
                    resolve({
                        ok: xhr.status >= 200 && xhr.status < 300,
                        status: xhr.status,
                        json: () => Promise.resolve(JSON.parse(xhr.responseText)),
                        text: () => Promise.resolve(xhr.responseText)
                    });
                };

                xhr.onerror = () => reject(new Error('Network error'));
                xhr.send(options?.body);
            });
        };
    }

    // CSS feature detection and fallbacks
    if (!features.flexbox) {
        console.warn('⚠️ Flexbox not supported - applying fallbacks');
        document.documentElement.classList.add('no-flexbox');
    }

    if (!features.grid) {
        console.warn('⚠️ CSS Grid not supported - applying fallbacks');
        document.documentElement.classList.add('no-grid');
    }

    if (!features.customProperties) {
        console.warn('⚠️ CSS Custom Properties not supported - applying fallbacks');
        document.documentElement.classList.add('no-custom-properties');
    }

    // Global compatibility object
    window.exotiqCompatibility = {
        browser: browserInfo,
        features: features,
        isSupported: (feature) => features[feature] || false,
        getBrowserInfo: () => browserInfo,
        getFeatureSupport: () => features
    };

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('📊 Performance Metrics:', {
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime,
                    firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime
                });
            }, 0);
        });
    }

    console.log('✅ Browser compatibility check complete');
    console.log('🌐 Exotiq.ai optimized for:', Object.keys(browserInfo).filter(key => browserInfo[key]).join(', '));

})();







