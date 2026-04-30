import { useEffect } from 'react';
import logger from '../utils/logger';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface AnalyticsProps {
  trackingId?: string;
}

export default function Analytics({ trackingId = 'G-XXXXXXXXXX' }: AnalyticsProps) {
  useEffect(() => {
    // Only load analytics in production with a valid tracking ID.
    if (!import.meta.env.PROD || !trackingId || trackingId === 'G-XXXXXXXXXX') {
      return;
    }

    try {
      // Google Analytics 4
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${trackingId}', {
          page_title: document.title,
          page_location: window.location.href,
          send_page_view: true
        });
      `;
      document.head.appendChild(script2);

      // Track page views across SPA navigation and browser navigation.
      const handleRouteChange = () => {
        if (window.gtag) {
          window.gtag('config', trackingId, {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true
          });
        }
      };

      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      const routeEventName = 'exotiq:route-change';

      window.history.pushState = function (...args) {
        originalPushState.apply(this, args);
        window.dispatchEvent(new Event(routeEventName));
      };

      window.history.replaceState = function (...args) {
        originalReplaceState.apply(this, args);
        window.dispatchEvent(new Event(routeEventName));
      };

      window.addEventListener('popstate', handleRouteChange);
      window.addEventListener(routeEventName, handleRouteChange);

      return () => {
        window.removeEventListener('popstate', handleRouteChange);
        window.removeEventListener(routeEventName, handleRouteChange);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    } catch (error) {
      logger.warn('Failed to initialize Google Analytics', { error });
    }
  }, [trackingId]);

  return null;
}

// Custom event tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackBetaSignup = (userEmail: string) => {
  trackEvent('beta_signup', {
    event_category: 'engagement',
    event_label: 'beta_form_submission',
    user_email: userEmail
  });
};

export const trackContactForm = (formType: string) => {
  trackEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: formType,
    form_type: formType
  });
};

export const trackFeatureClick = (featureName: string) => {
  trackEvent('feature_click', {
    event_category: 'engagement',
    event_label: featureName,
    feature_name: featureName
  });
};

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', {
    event_category: 'navigation',
    event_label: pageName,
    page_name: pageName
  });
};