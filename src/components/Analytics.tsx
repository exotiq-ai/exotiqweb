/**
 * Thin GA4 event helpers for call sites that predate utils/trackers.ts.
 *
 * The GA4 tag itself is loaded by trackers.loadGoogleAnalytics() (mounted from
 * RouteAnalytics). This file used to also export an <Analytics /> component
 * that injected gtag.js with a placeholder ID and monkey-patched
 * history.pushState; that component was never mounted and has been removed.
 *
 * Conversions (beta_signup, contact_form, calendar_booking, survey_complete)
 * must go through trackers.trackConversion(), which reports to GA4, Meta and
 * PostHog together. Only non-conversion engagement events belong here.
 */
import { trackEngagement } from '../utils/trackers';

export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  trackEngagement(eventName, parameters);
};

export const trackFeatureClick = (featureName: string) => {
  trackEvent('feature_click', {
    event_category: 'engagement',
    event_label: featureName,
    feature_name: featureName,
  });
};
