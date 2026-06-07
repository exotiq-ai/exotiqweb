// Error recovery system for exotiq
// Prevents page loading failures and provides fallback

(function() {
    'use strict';
    
    // Prevent custom element conflicts
    if (window.customElements) {
        const originalDefine = window.customElements.define;
        window.customElements.define = function(name, constructor, options) {
            if (!window.customElements.get(name)) {
                originalDefine.call(this, name, constructor, options);
            } else {
                console.warn(`Custom element '${name}' already defined, skipping...`);
            }
        };
    }
    
    // Error recovery system - ONLY for actual critical errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript error detected:', e.message);
        
        // ONLY trigger for actual critical errors that break the page
        if (e.message.includes('Failed to load module script') || 
            e.message.includes('MIME type') ||
            e.message.includes('module script')) {
            console.warn('Critical module loading error detected, attempting recovery...');
            
            // Show recovery message
            showRecoveryMessage();
            
            // Reload after delay
            setTimeout(() => {
                console.log('Attempting page reload...');
                window.location.reload();
            }, 3000);
        }
        // Don't trigger for localStorage, cookie, gtag, or analytics errors - these are not critical
    });
    
    // DISABLED: Check if page loaded successfully (too aggressive)
    // Only check for actual errors, not during normal loading
    window.addEventListener('load', function() {
        console.log('Page loaded successfully - no fallback needed');
    });
    
    // Mobile-specific error detection
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // More aggressive error detection for mobile
    if (isMobile()) {
        console.log('Mobile device detected - enhanced error monitoring active');
        
        // DISABLED: Proactive cookie clearing (interfering with normal operation)
        // Let the cookie system work normally
        console.log('Mobile device detected - cookie system will work normally');
        
        // Check for localStorage issues
        setTimeout(() => {
            try {
                localStorage.getItem('test');
            } catch (error) {
                console.warn('localStorage blocked on mobile, showing recovery...');
                showRecoveryMessage();
            }
        }, 1000);
        
        // DISABLED: Check for React loading issues (too aggressive)
        // React will load normally without interference
        console.log('Mobile device detected - React will load normally');
        
        // DISABLED: Check for cookie consent issues (too aggressive)
        // Cookie banner will appear normally when needed
        console.log('Mobile device detected - cookie banner will appear normally');
    }
    
    // Check for unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        
        if (e.reason && e.reason.message && e.reason.message.includes('module')) {
            console.warn('Module-related promise rejection detected');
            showRecoveryMessage();
        }
    });
    
    function showRecoveryMessage() {
        // Remove existing recovery message if any
        const existing = document.getElementById('error-recovery-message');
        if (existing) {
            existing.remove();
        }
        
        const message = document.createElement('div');
        message.id = 'error-recovery-message';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 16px;
            max-width: 300px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        
        message.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="width: 20px; height: 20px; background: #f59e0b; border-radius: 50%; margin-right: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">⚠</div>
                <strong style="color: #92400e;">Loading Issue Detected</strong>
            </div>
            <p style="margin: 0; color: #92400e; font-size: 14px;">Attempting to reload the page automatically...</p>
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
    
    function showFallbackPage() {
        // Only show fallback if we don't have React loaded
        if (window.React) {
            return;
        }
        
        // Clear problematic cookies/localStorage for mobile
        if (isMobile()) {
            console.log('Clearing problematic cookies for mobile recovery...');
            try {
                // Clear localStorage
                localStorage.clear();
                // Clear sessionStorage
                sessionStorage.clear();
                // Clear cookies
                document.cookie.split(";").forEach(function(c) { 
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                });
            } catch (error) {
                console.warn('Could not clear storage:', error);
            }
        }
        
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <div style="text-align: center; padding: 3rem; background: white; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); max-width: 500px; margin: 2rem;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: bold;">E</div>
                    <h1 style="color: #1f2937; margin-bottom: 1rem; font-size: 2rem; font-weight: 700;">exotiq</h1>
                    <p style="color: #6b7280; margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.6;">AI-Powered Fleet Management for Vehicle Rental Operations</p>
                    <p style="color: #6b7280; margin-bottom: 2rem;">The page is loading. If this doesn't resolve automatically, please refresh.</p>
                    <button onclick="clearAndReload()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; transition: transform 0.2s;">
                        Refresh Page
                    </button>
                    <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
                        <p style="color: #9ca3af; font-size: 14px; margin: 0;">If the issue persists, please contact support at hello@exotiq.ai</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Global function for clearing and reloading
    window.clearAndReload = function() {
        try {
            localStorage.clear();
            sessionStorage.clear();
            document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
            });
        } catch (error) {
            console.warn('Could not clear storage:', error);
        }
        window.location.reload();
    };
    
    // Health check function
    window.exotiqHealthCheck = function() {
        const checks = {
            react: !!window.React,
            root: !!document.querySelector('#root'),
            scripts: document.querySelectorAll('script[src*="assets/js"]').length > 0,
            styles: document.querySelectorAll('link[href*="assets/css"]').length > 0
        };
        
        console.log('exotiq Health Check:', checks);
        return checks;
    };
    
    console.log('exotiq error recovery system loaded');
    
    // DISABLED: React loading debugging (interfering with normal loading)
    console.log('Error recovery system loaded - React will load normally');
})();
