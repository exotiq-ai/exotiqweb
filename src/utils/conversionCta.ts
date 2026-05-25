import { getAttributionMetadata, withoutEmptyAttribution } from './attribution';

export const DEMO_CTA_URL = 'https://calendly.com/hello-exotiq/30min';
export const ROI_CTA_URL = '/pricing';

export type ConversionCtaAction =
  | 'calculate_roi'
  | 'schedule_demo'
  | 'select_plan'
  | 'start_trial'
  | 'enterprise_contact';

export interface ConversionCtaPayload {
  location: string;
  action: ConversionCtaAction;
  page?: string;
  destination?: string;
  tier?: string;
  fleet_size?: number;
  billing?: 'monthly' | 'annual';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
}

const EVENT_NAME = 'conversion_cta_click';

function getBrowserDefaults(destination?: string): Partial<ConversionCtaPayload> {
  if (typeof window === 'undefined') return { destination };

  return {
    ...getAttributionMetadata(),
    destination,
  };
}

function withoutEmptyFields(payload: ConversionCtaPayload): ConversionCtaPayload {
  return withoutEmptyAttribution(payload as unknown as Record<string, unknown>) as unknown as ConversionCtaPayload;
}

export function trackConversionCta(payload: ConversionCtaPayload): void {
  if (typeof window === 'undefined') return;

  const w = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };

  const normalizedPayload = withoutEmptyFields({
    ...getBrowserDefaults(payload.destination),
    ...payload,
  });

  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: EVENT_NAME,
      ...normalizedPayload,
    });

    if (typeof w.gtag === 'function') {
      w.gtag('event', EVENT_NAME, normalizedPayload as unknown as Record<string, unknown>);
    }
  } catch {
    // Analytics failures should never block navigation or booking.
  }
}

export function trackDemoCta(location: string, payload: Partial<ConversionCtaPayload> = {}): void {
  trackConversionCta({
    ...payload,
    location,
    action: 'schedule_demo',
    destination: payload.destination || DEMO_CTA_URL,
  });
}

export function trackRoiCta(location: string, payload: Partial<ConversionCtaPayload> = {}): void {
  trackConversionCta({
    ...payload,
    location,
    action: 'calculate_roi',
    destination: payload.destination || ROI_CTA_URL,
  });
}
