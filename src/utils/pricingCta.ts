// Lightweight pricing CTA tracker.
//
// Why a dedicated helper:
// - Centralizes the event shape so every CTA reports the same event name
//   and properties (`pricing_cta_click`) to GA4 and PostHog.
// - Stays SSR-safe (no-op when `window` is unavailable).
//
// To rename the event downstream, change `EVENT_NAME` only.

import { trackConversion, trackEngagement } from './trackers';

const EVENT_NAME = 'pricing_cta_click';

/** Primary sales call booking link used across /pricing. */
export const PRICING_SALES_CALENDLY = 'https://calendly.com/hello-exotiq/30min';

/** Canonical 15-minute demo booking link used across marketing CTAs. */
export const DEMO_CALENDLY = 'https://calendly.com/hello-exotiq/15-minute-meeting';

/**
 * Reports a demo/sales-call booking click as a conversion.
 *
 * This fires on the CLICK, not on a confirmed booking — Calendly is a third
 * party and the page never learns whether the visitor completed it. Treat it
 * as strong intent. A true booked-meeting signal would need Calendly webhooks
 * feeding Meta's Conversions API server-side.
 */
export function trackDemoBooking(location: string, meta?: Record<string, unknown>): void {
  trackConversion('calendar_booking', { location, ...meta });
}

export function openPricingSalesCall(location = 'pricing_sales_call'): void {
  if (typeof window === 'undefined') return;
  trackDemoBooking(location);
  window.open(PRICING_SALES_CALENDLY, '_blank', 'noopener,noreferrer');
}

export interface PricingCtaPayload {
  // Stable identifier for the click target (e.g. "hero_pro_card", "final_cta").
  location: string;
  // Functional intent: which user journey this CTA triggers.
  action: 'start_trial' | 'select_plan' | 'schedule_demo' | 'enterprise_contact';
  // Optional plan tier when the click targets a specific card.
  tier?: string;
  // Optional billing cadence at the moment of click.
  billing?: 'monthly' | 'annual';
  // Free-form additional context (e.g. fleet size from the ROI slider).
  meta?: Record<string, unknown>;
}

export function trackPricingCta(payload: PricingCtaPayload): void {
  if (typeof window === 'undefined') return;
  const { meta, ...rest } = payload;
  trackEngagement(EVENT_NAME, { ...rest, ...(meta ?? {}) });
}
