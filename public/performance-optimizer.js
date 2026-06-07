// Performance Optimizer for Exotiq.ai
// Ensures optimal performance across all devices and browsers

(function() {
    'use strict';
    
    console.log('⚡ Performance Optimizer Starting...');
    
    // Performance monitoring
    const performanceMonitor = {
        metrics: {},
        
        init() {
            this.trackWebVitals();
            this.trackResourceTiming();
            this.trackUserTiming();
            this.setupPerformanceObserver();
        },
        
        trackWebVitals() {
            // First Contentful Paint
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.name === 'first-contentful-paint') {
                            this.metrics.fcp = entry.startTime;
                            console.log('📊 First Contentful Paint:', entry.startTime + 'ms');
                        }
                        if (entry.name === 'largest-contentful-paint') {
                            this.metrics.lcp = entry.startTime;
                            console.log('📊 Largest Contentful Paint:', entry.startTime + 'ms');
                        }
                        if (entry.name === 'first-input-delay') {
                            this.metrics.fid = entry.processingStart - entry.startTime;
                            console.log('📊 First Input Delay:', this.metrics.fid + 'ms');
                        }
                        if (entry.name === 'cumulative-layout-shift') {
                            this.metrics.cls = entry.value;
                            console.log('📊 Cumulative Layout Shift:', entry.value);
                        }
                    }
                });
                
                observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
            }
        },
        
        trackResourceTiming() {
            if ('performance' in window && 'getEntriesByType' in performance) {
                const resources = performance.getEntriesByType('resource');
                const totalSize = resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0);
                this.metrics.totalResourceSize = totalSize;
                console.log('📊 Total Resource Size:', Math.round(totalSize / 1024) + 'KB');
            }
        },
        
        trackUserTiming() {
            // Track custom performance marks
            if ('performance' in window && 'mark' in performance) {
                performance.mark('exotiq-app-start');
                
                window.addEventListener('load', () => {
                    performance.mark('exotiq-app-loaded');
                    performance.measure('app-load-time', 'exotiq-app-start', 'exotiq-app-loaded');
                    
                    const measure = performance.getEntriesByName('app-load-time')[0];
                    this.metrics.appLoadTime = measure.duration;
                    console.log('📊 App Load Time:', Math.round(measure.duration) + 'ms');
                });
            }
        },
        
        setupPerformanceObserver() {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.entryType === 'measure') {
                            console.log('📊 Custom Measure:', entry.name, Math.round(entry.duration) + 'ms');
                        }
                    }
                });
                
                observer.observe({ entryTypes: ['measure'] });
            }
        },
        
        getMetrics() {
            return this.metrics;
        }
    };
    
    // Image optimization
    const imageOptimizer = {
        init() {
            this.lazyLoadImages();
            this.optimizeImages();
            this.preloadCriticalImages();
        },
        
        lazyLoadImages() {
            const images = document.querySelectorAll('img[data-src]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    });
                }, {
                    rootMargin: '50px 0px',
                    threshold: 0.01
                });
                
                images.forEach(img => imageObserver.observe(img));
            } else {
                // Fallback for browsers without IntersectionObserver
                images.forEach(img => {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                });
            }
        },
        
        optimizeImages() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                // Add loading="lazy" for better performance
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
                
                // Add decoding="async" for better performance
                if (!img.hasAttribute('decoding')) {
                    img.setAttribute('decoding', 'async');
                }
                
                // Optimize for different screen densities
                if (window.devicePixelRatio > 1) {
                    img.style.imageRendering = 'crisp-edges';
                }
            });
        },
        
        preloadCriticalImages() {
            const criticalImages = [
                '/favicon.svg',
                '/brand/exotiq-lockup-horizontal-white.svg',
                '/brand/exotiq-lockup-horizontal-black.svg'
            ];
            
            criticalImages.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            });
        }
    };
    
    // Font optimization
    const fontOptimizer = {
        init() {
            this.preloadFonts();
            this.optimizeFontLoading();
        },
        
        preloadFonts() {
            const fonts = [
                'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
                'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
                'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'
            ];
            
            fonts.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = href;
                link.onload = function() {
                    this.rel = 'stylesheet';
                };
                document.head.appendChild(link);
            });
        },
        
        optimizeFontLoading() {
            // Add font-display: swap for better performance
            const style = document.createElement('style');
            style.textContent = `
                @font-face {
                    font-family: 'Space Grotesk';
                    font-display: swap;
                }
                @font-face {
                    font-family: 'Inter';
                    font-display: swap;
                }
                @font-face {
                    font-family: 'Poppins';
                    font-display: swap;
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // Resource optimization
    const resourceOptimizer = {
        init() {
            this.deferNonCriticalScripts();
            this.optimizeThirdPartyScripts();
            this.setupResourceHints();
        },
        
        deferNonCriticalScripts() {
            const scripts = document.querySelectorAll('script[src]');
            scripts.forEach(script => {
                if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
                    // Defer non-critical scripts
                    if (!script.src.includes('error-recovery') && 
                        !script.src.includes('browser-compatibility') &&
                        !script.src.includes('performance-optimizer')) {
                        script.defer = true;
                    }
                }
            });
        },
        
        optimizeThirdPartyScripts() {
            // Optimize Google Analytics
            if (window.gtag) {
                window.gtag('config', 'GA_MEASUREMENT_ID', {
                    send_page_view: false, // We'll send manually for better control
                    transport_type: 'beacon'
                });
            }
        },
        
        setupResourceHints() {
            // Preconnect to external domains
            const domains = [
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com',
                'https://www.googletagmanager.com',
                'https://www.google-analytics.com'
            ];
            
            domains.forEach(domain => {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = domain;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
        }
    };
    
    // Memory optimization
    const memoryOptimizer = {
        init() {
            this.setupMemoryMonitoring();
            this.optimizeEventListeners();
            this.setupCleanup();
        },
        
        setupMemoryMonitoring() {
            if ('memory' in performance) {
                setInterval(() => {
                    const memory = performance.memory;
                    console.log('🧠 Memory Usage:', {
                        used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB',
                        total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB',
                        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
                    });
                    
                    // Warn if memory usage is high
                    if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
                        console.warn('⚠️ High memory usage detected');
                        this.triggerCleanup();
                    }
                }, 30000); // Check every 30 seconds
            }
        },
        
        optimizeEventListeners() {
            // Use passive event listeners for better performance
            const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
            
            passiveEvents.forEach(eventType => {
                document.addEventListener(eventType, () => {}, { passive: true });
            });
        },
        
        setupCleanup() {
            // Clean up on page unload
            window.addEventListener('beforeunload', () => {
                this.triggerCleanup();
            });
            
            // Clean up on visibility change
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.triggerCleanup();
                }
            });
        },
        
        triggerCleanup() {
            // Clear any intervals or timeouts
            const highestTimeoutId = setTimeout(() => {}, 0);
            for (let i = 0; i < highestTimeoutId; i++) {
                clearTimeout(i);
            }
            
            // Clear any intervals
            const highestIntervalId = setInterval(() => {}, 0);
            for (let i = 0; i < highestIntervalId; i++) {
                clearInterval(i);
            }
            
            console.log('🧹 Memory cleanup triggered');
        }
    };
    
    // Initialize all optimizers
    const initOptimizers = () => {
        performanceMonitor.init();
        imageOptimizer.init();
        fontOptimizer.init();
        resourceOptimizer.init();
        memoryOptimizer.init();
        
        console.log('✅ Performance optimization complete');
    };
    
    // Start optimization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOptimizers);
    } else {
        initOptimizers();
    }
    
    // Global performance object
    window.exotiqPerformance = {
        monitor: performanceMonitor,
        getMetrics: () => performanceMonitor.getMetrics(),
        triggerCleanup: () => memoryOptimizer.triggerCleanup()
    };
    
})();







