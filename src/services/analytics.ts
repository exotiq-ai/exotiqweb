// Analytics service for tracking chatbot interactions and conversions
import logger from '../utils/logger';

export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: Date;
  sessionId: string;
  userId?: string;
}

export interface ConversationMetrics {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  messageCount: number;
  userMessages: number;
  botMessages: number;
  leadScore: number;
  outcome: 'abandoned' | 'completed' | 'converted' | 'ongoing';
  conversionType?: 'calendar_booking' | 'beta_signup' | 'contact_form';
  userContext?: Record<string, any>;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private events: AnalyticsEvent[] = [];
  private conversations: Map<string, ConversationMetrics> = new Map();
  private isEnabled: boolean;
  private cookiePreferences: any = null;

  constructor() {
    this.isEnabled = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
    this.loadCookiePreferences();
  }

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  private loadCookiePreferences() {
    try {
      const saved = localStorage.getItem('exotiq_cookie_preferences');
      if (saved) {
        this.cookiePreferences = JSON.parse(saved);
      }
    } catch (error) {
      logger.warn('Failed to load cookie preferences', { error });
    }
  }

  private canTrackAnalytics(): boolean {
    this.loadCookiePreferences(); // Refresh preferences
    return this.cookiePreferences?.analytics === true;
  }

  private canTrackMarketing(): boolean {
    this.loadCookiePreferences(); // Refresh preferences
    return this.cookiePreferences?.marketing === true;
  }
  // Track chatbot events
  track(event: string, properties: Record<string, any> = {}, sessionId: string, userId?: string): void {
    if (!this.isEnabled || !this.canTrackAnalytics()) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`
      },
      timestamp: new Date(),
      sessionId,
      userId
    };

    this.events.push(analyticsEvent);
    
    // Send to external analytics services
    this.sendToExternalServices(analyticsEvent);
    
    // Store in localStorage for persistence
    this.persistEvent(analyticsEvent);
    
    logger.debug('Analytics Event tracked', { event: analyticsEvent.event, sessionId, properties });
  }

  // Conversation-specific tracking
  startConversation(sessionId: string, userContext?: Record<string, any>): void {
    const conversation: ConversationMetrics = {
      sessionId,
      startTime: new Date(),
      messageCount: 0,
      userMessages: 0,
      botMessages: 0,
      leadScore: 0,
      outcome: 'ongoing',
      userContext
    };

    this.conversations.set(sessionId, conversation);
    
    this.track('conversation_started', {
      sessionId,
      userContext
    }, sessionId);
  }

  trackMessage(sessionId: string, type: 'user' | 'bot', content: string, leadScore?: number): void {
    const conversation = this.conversations.get(sessionId);
    if (!conversation) return;

    conversation.messageCount++;
    if (type === 'user') {
      conversation.userMessages++;
    } else {
      conversation.botMessages++;
    }

    if (leadScore !== undefined) {
      conversation.leadScore = leadScore;
    }

    this.conversations.set(sessionId, conversation);

    this.track('message_sent', {
      type,
      messageLength: content.length,
      messageCount: conversation.messageCount,
      leadScore: conversation.leadScore
    }, sessionId);
  }

  trackAction(sessionId: string, action: string, properties: Record<string, any> = {}): void {
    this.track('chatbot_action', {
      action,
      ...properties
    }, sessionId);

    // Update conversation metrics based on action
    const conversation = this.conversations.get(sessionId);
    if (conversation) {
      if (action === 'calendar_booking' || action === 'beta_signup' || action === 'contact_form') {
        conversation.outcome = 'converted';
        conversation.conversionType = action as any;
        conversation.endTime = new Date();
      }
      this.conversations.set(sessionId, conversation);
    }
  }

  endConversation(sessionId: string, outcome: ConversationMetrics['outcome'] = 'completed'): void {
    const conversation = this.conversations.get(sessionId);
    if (!conversation) return;

    conversation.endTime = new Date();
    conversation.outcome = outcome;

    this.conversations.set(sessionId, conversation);

    const duration = conversation.endTime.getTime() - conversation.startTime.getTime();

    this.track('conversation_ended', {
      outcome,
      duration: Math.round(duration / 1000), // seconds
      messageCount: conversation.messageCount,
      leadScore: conversation.leadScore,
      conversionType: conversation.conversionType
    }, sessionId);
  }

  // A/B Testing support
  getVariant(testName: string, sessionId: string): string {
    // Simple hash-based A/B testing
    const hash = this.hashCode(sessionId + testName);
    const variant = hash % 2 === 0 ? 'A' : 'B';
    
    this.track('ab_test_assignment', {
      testName,
      variant
    }, sessionId);
    
    return variant;
  }

  // Get analytics data for reporting
  getConversationMetrics(): ConversationMetrics[] {
    return Array.from(this.conversations.values());
  }

  getEvents(filter?: Partial<AnalyticsEvent>): AnalyticsEvent[] {
    if (!filter) return this.events;
    
    return this.events.filter(event => {
      return Object.entries(filter).every(([key, value]) => {
        return event[key as keyof AnalyticsEvent] === value;
      });
    });
  }

  // Export data for analysis
  exportData(): { events: AnalyticsEvent[]; conversations: ConversationMetrics[] } {
    return {
      events: this.events,
      conversations: Array.from(this.conversations.values())
    };
  }

  // Private methods
  private sendToExternalServices(event: AnalyticsEvent): void {
    // Only send to analytics services if user has consented
    if (!this.canTrackAnalytics()) return;

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.event, {
        custom_parameter_1: event.sessionId,
        ...event.properties
      });
    }

    // Mixpanel (if configured)
    if (typeof window !== 'undefined' && (window as any).mixpanel && import.meta.env.VITE_MIXPANEL_TOKEN && this.canTrackAnalytics()) {
      (window as any).mixpanel.track(event.event, {
        session_id: event.sessionId,
        ...event.properties
      });
    }

    // Marketing tracking (only if marketing cookies are enabled)
    if (this.canTrackMarketing()) {
      // Facebook Pixel, LinkedIn Insight Tag, etc.
      logger.debug('Marketing tracking enabled for event', { event: event.event });
    }
  }

  private persistEvent(event: AnalyticsEvent): void {
    try {
      const stored = localStorage.getItem('exotiq_analytics_events');
      const events = stored ? JSON.parse(stored) : [];
      events.push(event);
      
      // Keep only last 1000 events to prevent localStorage bloat
      if (events.length > 1000) {
        events.splice(0, events.length - 1000);
      }
      
      localStorage.setItem('exotiq_analytics_events', JSON.stringify(events));
    } catch (error) {
      logger.warn('Failed to persist analytics event', { error });
    }
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

export const analyticsService = AnalyticsService.getInstance();

// Convenience functions for common tracking
export const trackChatbotOpen = (sessionId: string) => {
  analyticsService.track('chatbot_opened', {}, sessionId);
};

export const trackChatbotClose = (sessionId: string) => {
  analyticsService.track('chatbot_closed', {}, sessionId);
};

export const trackCalendarClick = (sessionId: string, type: '15min' | '30min') => {
  analyticsService.trackAction(sessionId, 'calendar_booking', { type });
};

export const trackBetaSignup = (sessionId: string, email: string) => {
  analyticsService.trackAction(sessionId, 'beta_signup', { email });
};

// Performance monitoring and Core Web Vitals
export const PerformanceMonitor = {
  // Track Core Web Vitals
  trackWebVitals: () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Track Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            const lcp = lastEntry.startTime;
            PerformanceMonitor.trackMetric('LCP', lcp);
            
            // Send to analytics
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'LCP',
                value: Math.round(lcp),
                non_interaction: true,
              });
            }
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Track First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fid = entry.processingStart - entry.startTime;
            PerformanceMonitor.trackMetric('FID', fid);
            
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'FID',
                value: Math.round(fid),
                non_interaction: true,
              });
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Track Cumulative Layout Shift (CLS)
        let clsValue = 0;
        let clsEntries: any[] = [];
        
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              clsEntries.push(entry);
            }
          });
          
          PerformanceMonitor.trackMetric('CLS', clsValue);
          
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(clsValue * 1000) / 1000,
              non_interaction: true,
            });
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Track Time to First Byte (TTFB)
        const navigationObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.entryType === 'navigation') {
              const ttfb = entry.responseStart - entry.requestStart;
              PerformanceMonitor.trackMetric('TTFB', ttfb);
              
              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  event_category: 'Web Vitals',
                  event_label: 'TTFB',
                  value: Math.round(ttfb),
                  non_interaction: true,
                });
              }
            }
          });
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });

      } catch (error) {
        logger.warn('Performance monitoring failed', { error });
      }
    }
  },

  // Track custom performance metrics
  trackMetric: (name: string, value: number) => {
    try {
      const stored = localStorage.getItem('exotiq_performance_metrics');
      const metrics = stored ? JSON.parse(stored) : {};
      
      if (!metrics[name]) {
        metrics[name] = [];
      }
      
      metrics[name].push({
        value,
        timestamp: Date.now(),
      });
      
      // Keep only last 100 measurements
      if (metrics[name].length > 100) {
        metrics[name] = metrics[name].slice(-100);
      }
      
      localStorage.setItem('exotiq_performance_metrics', JSON.stringify(metrics));
      
      // Log performance metrics
      logger.performance(name, value);
    } catch (error) {
      logger.warn('Failed to track performance metric', { error, metricName: name });
    }
  },

  // Get performance summary
  getPerformanceSummary: () => {
    try {
      const stored = localStorage.getItem('exotiq_performance_metrics');
      if (!stored) return null;
      
      const metrics = JSON.parse(stored);
      const summary: Record<string, any> = {};
      
      Object.keys(metrics).forEach((key) => {
        const values = metrics[key].map((m: any) => m.value);
        summary[key] = {
          count: values.length,
          average: values.reduce((a: number, b: number) => a + b, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
          latest: values[values.length - 1],
        };
      });
      
      return summary;
    } catch (error) {
      logger.warn('Failed to get performance summary', { error });
      return null;
    }
  },

  // Check performance budgets
  checkPerformanceBudgets: () => {
    const budgets = {
      LCP: 2500, // 2.5 seconds
      FID: 100,  // 100 milliseconds
      CLS: 0.1,  // 0.1
      TTFB: 800, // 800 milliseconds
    };
    
    const summary = PerformanceMonitor.getPerformanceSummary();
    if (!summary) return null;
    
    const violations: string[] = [];
    
    Object.keys(budgets).forEach((metric) => {
      if (summary[metric] && summary[metric].latest > budgets[metric as keyof typeof budgets]) {
        violations.push(`${metric}: ${summary[metric].latest}ms (budget: ${budgets[metric as keyof typeof budgets]}ms)`);
      }
    });
    
    return violations.length > 0 ? violations : null;
  },
};