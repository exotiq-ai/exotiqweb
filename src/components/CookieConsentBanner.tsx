import { useState, useEffect } from 'react';
import { Cookie, Settings, X, Check } from 'lucide-react';
import { apolloService } from '../services/apollo';
import logger from '../utils/logger';

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number | null;
}

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
    timestamp: null
  });

  // Load preferences on mount
  useEffect(() => {
    try {
      // Clear old preferences if domain changed
      const currentDomain = window.location.hostname;
      const savedDomain = localStorage.getItem('exotiq_domain');
      
      if (savedDomain && savedDomain !== currentDomain) {
        // Domain changed, clear old preferences
        localStorage.removeItem('exotiq_cookie_preferences');
        localStorage.removeItem('exotiq_analytics_events');
        setShowBanner(true);
      }
      
      // Save current domain
      localStorage.setItem('exotiq_domain', currentDomain);
      
      const savedPreferences = localStorage.getItem('exotiq_cookie_preferences');
      if (savedPreferences) {
        try {
          const parsed = JSON.parse(savedPreferences);
          setPreferences(parsed);
          applyPreferences(parsed);
        } catch (error) {
          // Invalid JSON, clear and show banner
          localStorage.removeItem('exotiq_cookie_preferences');
          setShowBanner(true);
        }
      } else {
        // Show banner for first-time visitors
        setShowBanner(true);
      }
    } catch (error) {
      // localStorage blocked, show banner
      logger.warn('localStorage blocked, showing cookie banner', { error });
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (newPreferences: CookiePreferences) => {
    try {
      const prefsWithTimestamp = {
        ...newPreferences,
        timestamp: Date.now()
      };
      
      localStorage.setItem('exotiq_cookie_preferences', JSON.stringify(prefsWithTimestamp));
      setPreferences(prefsWithTimestamp);
      applyPreferences(prefsWithTimestamp);
    } catch (error) {
      // localStorage blocked, continue without saving
      logger.warn('localStorage blocked, preferences not saved', { error });
      setPreferences(newPreferences);
      applyPreferences(newPreferences);
    }
  };

  const applyPreferences = (prefs: CookiePreferences) => {
    // Apply analytics cookies
    if (prefs.analytics) {
      loadGoogleAnalytics();
      loadMixpanel();
    } else {
      disableAnalytics();
    }

    // Apply marketing cookies
    if (prefs.marketing) {
      loadMarketingCookies();
    } else {
      disableMarketing();
    }

    // Apply functional cookies
    if (prefs.functional) {
      enableFunctionalFeatures();
    }
  };

  const loadGoogleAnalytics = () => {
    if (typeof window !== 'undefined' && !window.gtag) {
      try {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID'}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) { window.dataLayer.push(args); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID', {
          anonymize_ip: true,
          cookie_flags: window.location.protocol === 'https:' ? 'SameSite=None;Secure' : 'SameSite=Lax'
        });
      } catch (error) {
        logger.warn('Failed to load Google Analytics', { error });
      }
    }
  };

  const loadMixpanel = () => {
    if (typeof window !== 'undefined' && !(window as any).mixpanel && import.meta.env.VITE_MIXPANEL_TOKEN) {
      // Mixpanel implementation would go here
      logger.debug('Mixpanel analytics enabled');
    }
  };

  const loadMarketingCookies = () => {
    // Facebook Pixel, Google Ads, LinkedIn Insight Tag implementation
    logger.debug('Marketing cookies enabled');
    
    // Initialize Apollo tracking if marketing cookies are enabled
    try {
      apolloService.updateCookieConsent(true);
    } catch (error) {
      logger.warn('Failed to initialize Apollo tracking', { error });
    }
  };

  const disableAnalytics = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('consent', 'update', {
          'analytics_storage': 'denied'
        });
      } catch (error) {
        logger.warn('Failed to disable analytics', { error });
      }
    }
  };

  const disableMarketing = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('consent', 'update', {
          'ad_storage': 'denied'
        });
      } catch (error) {
        logger.warn('Failed to disable marketing', { error });
      }
    }
    
    // Disable Apollo tracking if marketing cookies are disabled
    try {
      apolloService.updateCookieConsent(false);
    } catch (error) {
      logger.warn('Failed to disable Apollo tracking', { error });
    }
  };

  const enableFunctionalFeatures = () => {
    // Enable preference saving, theme persistence, etc.
    logger.debug('Functional cookies enabled');
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now()
    };
    
    savePreferences(allAccepted);
    setShowBanner(false);
    showStatusMessage('All cookies accepted');
  };

  const acceptEssentialOnly = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    };
    
    savePreferences(essentialOnly);
    setShowBanner(false);
    setShowModal(false);
    showStatusMessage('Essential cookies only');
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
    setShowModal(false);
    showStatusMessage('Cookie preferences saved');
  };

  const togglePreference = (category: keyof Omit<CookiePreferences, 'timestamp'>) => {
    if (category === 'essential') return; // Can't disable essential
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const showStatusMessage = (message: string) => {
    setStatusMessage(message);
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const cookieCategories = [
    {
      id: 'essential' as const,
      title: '🔒 Essential Cookies',
      description: 'Required for basic website functionality',
      required: true
    },
    {
      id: 'functional' as const,
      title: '⚙️ Functional Cookies',
      description: 'Enhanced features and personalization',
      required: false
    },
    {
      id: 'analytics' as const,
      title: '📊 Analytics Cookies',
      description: 'Help us understand how you use our site',
      required: false
    },
    {
      id: 'marketing' as const,
      title: '🎯 Marketing Cookies',
      description: 'Personalized advertising and campaign tracking',
      required: false
    }
  ];

  return (
    <>
      {/* Cookie Consent Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-dark-900 text-white p-4 sm:p-6 z-50 shadow-2xl transform transition-transform duration-300">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
            <div className="flex items-start space-x-4 flex-1">
              <Cookie className="w-6 h-6 text-accent-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-dfaalt font-bold text-lg mb-2">We use cookies to enhance your experience</h3>
                <p className="font-montserrat text-sm opacity-90 leading-relaxed">
                  We use essential cookies for functionality and optional cookies for analytics and marketing. 
                  You can customize your preferences anytime.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowModal(true)}
                className="font-poppins font-bold text-xs uppercase tracking-wide px-4 py-3 border border-gray-600 text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] flex items-center justify-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Customize</span>
              </button>
              <button
                onClick={acceptEssentialOnly}
                className="font-poppins font-bold text-xs uppercase tracking-wide px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors min-h-[44px]"
              >
                Essential Only
              </button>
              <button
                onClick={acceptAll}
                className="font-poppins font-bold text-xs uppercase tracking-wide px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors min-h-[44px]"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Preferences Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white mb-2">
                    Cookie Preferences
                  </h2>
                  <p className="font-montserrat text-gray-600 dark:text-gray-300">
                    Choose which types of cookies you'd like to allow. Essential cookies cannot be disabled.
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {cookieCategories.map((category) => (
                  <div key={category.id} className="border border-gray-200 dark:border-dark-600 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-dfaalt font-bold text-lg text-gray-900 dark:text-white mb-1">
                          {category.title}
                        </h3>
                        <p className="font-montserrat text-gray-600 dark:text-gray-300 text-sm">
                          {category.description}
                        </p>
                      </div>
                      <button
                        onClick={() => togglePreference(category.id)}
                        disabled={category.required}
                        className={`relative w-12 h-6 rounded-full transition-colors min-w-[48px] ${
                          preferences[category.id] ? 'bg-primary-500' : 'bg-gray-300 dark:bg-dark-600'
                        } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}`}
                      >
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences[category.id] ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                    {category.required && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        Required for basic website functionality
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-8 border-t border-gray-200 dark:border-dark-700 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="font-poppins font-bold text-sm uppercase tracking-wide px-6 py-3 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={acceptEssentialOnly}
                className="font-poppins font-bold text-sm uppercase tracking-wide px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors min-h-[44px]"
              >
                Essential Only
              </button>
              <button
                onClick={saveCustomPreferences}
                className="font-poppins font-bold text-sm uppercase tracking-wide px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors flex items-center space-x-2 min-h-[44px]"
              >
                <Check className="w-4 h-4" />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      {showStatus && (
        <div className="fixed top-6 right-6 bg-success-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 transform transition-transform duration-300">
          <Check className="w-5 h-5" />
          <span className="font-montserrat font-medium">{statusMessage}</span>
        </div>
      )}
    </>
  );
}