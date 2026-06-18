// Apollo tracking service for lead generation and sales intelligence
import logger from '../utils/logger';

export interface ApolloConfig {
  appId: string;
  enabled: boolean;
  cookieConsent?: boolean;
}

class ApolloService {
  private static instance: ApolloService;
  private config: ApolloConfig;
  private isInitialized: boolean = false;
  private isEnabled: boolean = false;

  constructor() {
    this.config = {
      appId: '665f9a5b2a272a0c71bf8798', // Your Apollo App ID
      enabled: import.meta.env.VITE_ENABLE_APOLLO === 'true',
      cookieConsent: false
    };
    
    this.checkCookieConsent();
  }

  static getInstance(): ApolloService {
    if (!ApolloService.instance) {
      ApolloService.instance = new ApolloService();
    }
    return ApolloService.instance;
  }

  private checkCookieConsent(): void {
    try {
      const saved = localStorage.getItem('exotiq_cookie_preferences');
      if (saved) {
        const preferences = JSON.parse(saved);
        this.config.cookieConsent = preferences.marketing === true;
        this.isEnabled = this.config.enabled && this.config.cookieConsent;
      }
    } catch (error) {
      logger.warn('Failed to load cookie preferences for Apollo', { error });
    }
  }

  private canTrack(): boolean {
    this.checkCookieConsent(); // Refresh consent status
    return Boolean(this.isEnabled && this.config.cookieConsent && !this.isInitialized);
  }

  /**
   * Initialize Apollo tracking script
   * This should be called after user consent is given
   */
  init(): void {
    if (!this.canTrack()) {
      logger.debug('Apollo tracking not enabled or already initialized');
      return;
    }

    try {
      // Create unique cache-busting parameter
      const cacheBuster = Math.random().toString(36).substring(7);
      
      // Create script element
      const script = document.createElement('script');
      script.src = `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${cacheBuster}`;
      script.async = true;
      script.defer = true;
      
      // Set up onload handler
      script.onload = () => {
        if (window.trackingFunctions && window.trackingFunctions.onLoad) {
          window.trackingFunctions.onLoad({
            appId: this.config.appId
          });
          
          this.isInitialized = true;
          logger.info('Apollo tracking initialized successfully');
          
          // Track initialization event
          this.trackEvent('apollo_initialized', {
            appId: this.config.appId,
            timestamp: new Date().toISOString()
          });
        } else {
          logger.warn('Apollo tracking functions not found');
        }
      };
      
      // Handle script load errors
      script.onerror = () => {
        logger.error('Failed to load Apollo tracking script');
        this.trackEvent('apollo_load_error', {
          appId: this.config.appId,
          timestamp: new Date().toISOString()
        });
      };
      
      // Append to document head
      document.head.appendChild(script);
      
    } catch (error) {
      logger.error('Failed to initialize Apollo tracking', { error });
      this.trackEvent('apollo_init_error', {
        error: error instanceof Error ? error.message : String(error),
        appId: this.config.appId,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Track custom events for Apollo
   */
  trackEvent(eventName: string, properties: Record<string, any> = {}): void {
    if (!this.isEnabled) return;

    try {
      // Send to Apollo if available
      if (window.trackingFunctions && window.trackingFunctions.track) {
        window.trackingFunctions.track(eventName, properties);
      }
      
      // Also send to your analytics service
      if (window.gtag) {
        window.gtag('event', eventName, {
          event_category: 'Apollo',
          ...properties
        });
      }
      
      // Log in development
      logger.debug('Apollo Event tracked', { eventName, properties });
      
    } catch (error) {
      logger.warn('Failed to track Apollo event', { error, eventName });
    }
  }

  /**
   * Track page views
   */
  trackPageView(page: string, properties: Record<string, any> = {}): void {
    this.trackEvent('page_view', {
      page,
      url: window.location.href,
      referrer: document.referrer,
      ...properties
    });
  }

  /**
   * Track user interactions
   */
  trackInteraction(interactionType: string, properties: Record<string, any> = {}): void {
    this.trackEvent('user_interaction', {
      interaction_type: interactionType,
      timestamp: new Date().toISOString(),
      ...properties
    });
  }

  /**
   * Track form submissions
   */
  trackFormSubmission(formType: string, properties: Record<string, any> = {}): void {
    this.trackEvent('form_submission', {
      form_type: formType,
      timestamp: new Date().toISOString(),
      ...properties
    });
  }

  /**
   * Track conversion events
   */
  trackConversion(conversionType: string, value?: number, properties: Record<string, any> = {}): void {
    this.trackEvent('conversion', {
      conversion_type: conversionType,
      value,
      timestamp: new Date().toISOString(),
      ...properties
    });
  }

  /**
   * Update cookie consent status
   */
  updateCookieConsent(consent: boolean): void {
    this.config.cookieConsent = consent;
    this.isEnabled = this.config.enabled && this.config.cookieConsent;
    
    if (this.isEnabled && !this.isInitialized) {
      // Initialize Apollo if consent is now given
      this.init();
    }
    
    logger.info('Apollo cookie consent updated', { consent });
  }

  /**
   * Get current status
   */
  getStatus(): {
    enabled: boolean;
    initialized: boolean;
    cookieConsent: boolean;
    appId: string;
  } {
    return {
      enabled: this.isEnabled,
      initialized: this.isInitialized,
      cookieConsent: Boolean(this.config.cookieConsent),
      appId: this.config.appId
    };
  }

  /**
   * Reset service (useful for testing)
   */
  reset(): void {
    this.isInitialized = false;
    this.isEnabled = false;
    this.config.cookieConsent = false;
    logger.info('Apollo service reset');
  }
}

// Global type declarations for Apollo
declare global {
  interface Window {
    trackingFunctions?: {
      onLoad: (config: { appId: string }) => void;
      track: (eventName: string, properties?: Record<string, any>) => void;
    };
  }
}

export const apolloService = ApolloService.getInstance();

// Convenience functions
export const initApollo = () => apolloService.init();
export const trackApolloEvent = (eventName: string, properties?: Record<string, any>) => 
  apolloService.trackEvent(eventName, properties);
export const trackApolloPageView = (page: string, properties?: Record<string, any>) => 
  apolloService.trackPageView(page, properties);
export const trackApolloConversion = (conversionType: string, value?: number, properties?: Record<string, any>) => 
  apolloService.trackConversion(conversionType, value, properties);

