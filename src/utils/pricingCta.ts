import { DEMO_CTA_URL, trackConversionCta } from './conversionCta';

/** Primary sales call booking link used across /pricing. */
export const PRICING_SALES_CALENDLY = DEMO_CTA_URL;

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
  const { meta, ...basePayload } = payload;

  trackConversionCta({
    ...basePayload,
    action:
      payload.action === 'enterprise_contact'
        ? 'enterprise_contact'
        : payload.action === 'select_plan'
          ? 'select_plan'
          : payload.action === 'start_trial'
            ? 'start_trial'
            : 'schedule_demo',
    destination: payload.action === 'enterprise_contact' ? '/contact' : PRICING_SALES_CALENDLY,
    fleet_size: typeof meta?.fleetSize === 'number' ? meta.fleetSize : undefined,
  });
}
