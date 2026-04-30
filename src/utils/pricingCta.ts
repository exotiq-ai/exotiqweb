// Lightweight pricing CTA tracker.
//
// Why a dedicated helper:
// - Centralizes the GTM `dataLayer.push` shape so every CTA reports
//   the same event name and properties (e.g. `pricing_cta_click`).
// - Stays SSR-safe (no-op when `window` is unavailable).
// - Avoids tying the pricing page to a heavier analytics dependency
//   while still feeding GA4/GTM-based dashboards.
//
// To rename the event downstream, change `EVENT_NAME` only.

const EVENT_NAME = 'pricing_cta_click';

/** Primary sales call booking link used across /pricing. */
export const PRICING_SALES_CALENDLY = 'https://calendly.com/hello-exotiq/30min';

export function openPricingSalesCall(): void {
  if (typeof window === 'undefined') return;
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

  const w = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };

  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: EVENT_NAME,
      ...payload,
    });

    if (typeof w.gtag === 'function') {
      w.gtag('event', EVENT_NAME, payload as unknown as Record<string, unknown>);
    }
  } catch {
    // Analytics failures must never break the user experience.
  }
}
