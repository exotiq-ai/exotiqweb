/**
 * Consent-gated tracking loaders.
 *
 * Nothing in here runs until the visitor has actually chosen. Each loader is
 * idempotent and never throws: a blocked or failed tag must never take the
 * page down with it. PostHog is dynamically imported so it stays out of the
 * critical bundle (first paint on an in-app browser is the tight budget).
 */

import type { CookiePreferences } from './consentStore';
import logger from './logger';

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

// exotiq.ai is deployed by uploading a locally built dist/, so Netlify's own
// environment variables are never read at build time. A committed default is
// therefore the only value that reliably survives a deploy. A Meta Pixel ID is
// public by design — it is visible in the page source of every site using it —
// so committing it discloses nothing. The env var still wins where one is set
// (previews, a future CI build).
const DEFAULT_META_PIXEL_ID = '2060347114601720';
const META_PIXEL_ID =
  (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || DEFAULT_META_PIXEL_ID;
// Committed for the same reason as the pixel ID above: production is a local
// build, so Netlify env vars are never read. A PostHog *project* key (phc_) is
// a public client-side token — it ships in the bundle by design and is not a
// secret. Personal API keys (phx_) are secrets and must never appear here.
// Region verified against the key: us.i.posthog.com answers, eu returns 404.
const DEFAULT_POSTHOG_KEY = 'phc_mNUjg58cEcEzMp8d4DCxi7XZU24ZpY9QJwpm2hYJak4N';
const POSTHOG_KEY =
  (import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined) || DEFAULT_POSTHOG_KEY;
const POSTHOG_HOST =
  (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined) || 'https://us.i.posthog.com';

let metaPixelLoaded = false;
let posthogLoading: Promise<void> | null = null;
let posthogOptedIn = false;

/* ------------------------------------------------------------------ Meta */

/**
 * Loads the Meta (Facebook/Instagram) Pixel. Requires VITE_META_PIXEL_ID at
 * build time; without it this is a no-op and says so loudly in the console,
 * because a paid Meta campaign with no pixel has no conversion signal at all.
 */
export function loadMetaPixel(): void {
  if (metaPixelLoaded || typeof window === 'undefined') return;

  if (!META_PIXEL_ID) {
    logger.warn(
      'Meta Pixel not loaded: VITE_META_PIXEL_ID is unset. Paid Meta traffic has no conversion tracking.',
    );
    return;
  }

  try {
    /* Standard Meta Pixel bootstrap (fbevents.js reads the queue on load). */
    if (!window.fbq) {
      const fbq: Fbq = function (...args: unknown[]) {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue?.push(args);
      } as Fbq;
      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.push = fbq;
      window.fbq = fbq;
      window._fbq = window._fbq || fbq;

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }

    window.fbq?.('init', META_PIXEL_ID);
    window.fbq?.('track', 'PageView');
    metaPixelLoaded = true;
    logger.info('Meta Pixel loaded', { pixelId: META_PIXEL_ID });
  } catch (error) {
    logger.warn('Failed to load Meta Pixel', { error });
  }
}

/** Fires a Meta standard/custom event; no-op until the pixel is loaded. */
export function trackMetaEvent(event: string, params?: Record<string, unknown>): void {
  if (!metaPixelLoaded) return;
  try {
    window.fbq?.('track', event, params);
  } catch (error) {
    logger.warn('Failed to send Meta event', { event, error });
  }
}

/** Meta expects one PageView per SPA route change. */
export function trackMetaPageView(): void {
  trackMetaEvent('PageView');
}

/* --------------------------------------------------------------- PostHog */

async function ensurePostHog(): Promise<typeof import('posthog-js').default | null> {
  if (typeof window === 'undefined' || !POSTHOG_KEY) return null;

  if (!posthogLoading) {
    posthogLoading = import('posthog-js')
      .then(({ default: posthog }) => {
        posthog.init(POSTHOG_KEY, {
          api_host: POSTHOG_HOST,
          // Consent is the gate; PostHog stays opted out until we say otherwise.
          opt_out_capturing_by_default: true,
          persistence: 'localStorage+cookie',
          autocapture: true,
          capture_pageview: false, // sent manually on route change
          capture_pageleave: true,
        });
        // PostHog's ESM build does not set the global; the session-replay
        // toolbar and any manual debugging both expect window.posthog.
        (window as unknown as { posthog?: unknown }).posthog = posthog;
      })
      .catch((error) => {
        logger.warn('Failed to load PostHog', { error });
        posthogLoading = null;
      });
  }

  await posthogLoading;
  const mod = await import('posthog-js').catch(() => null);
  return mod?.default ?? null;
}

/** Turns PostHog capture on. Safe to call repeatedly. */
export async function optInPostHog(): Promise<void> {
  if (!POSTHOG_KEY) {
    logger.warn('PostHog not initialised: VITE_PUBLIC_POSTHOG_KEY is unset.');
    return;
  }
  const posthog = await ensurePostHog();
  if (!posthog || posthogOptedIn) return;
  try {
    posthog.opt_in_capturing();
    posthog.capture('$pageview');
    posthogOptedIn = true;
  } catch (error) {
    logger.warn('Failed to opt in to PostHog', { error });
  }
}

/** Turns PostHog capture off and clears its stored identifiers. */
export async function optOutPostHog(): Promise<void> {
  if (!POSTHOG_KEY || !posthogLoading) return;
  const posthog = await ensurePostHog();
  if (!posthog) return;
  try {
    posthog.opt_out_capturing();
    posthogOptedIn = false;
  } catch (error) {
    logger.warn('Failed to opt out of PostHog', { error });
  }
}

/** Sends a PostHog pageview; no-op unless the visitor opted in. */
export async function trackPostHogPageView(): Promise<void> {
  if (!posthogOptedIn) return;
  const posthog = await ensurePostHog();
  try {
    posthog?.capture('$pageview');
  } catch (error) {
    logger.warn('Failed to send PostHog pageview', { error });
  }
}

/* ----------------------------------------------------------- Conversions */

/**
 * The conversion vocabulary already used by services/analytics.ts, extended
 * with the survey. Keeping one list means Meta, PostHog and GA cannot drift
 * apart on what counts as a conversion.
 */
export type ConversionType =
  | 'beta_signup'
  | 'contact_form'
  | 'calendar_booking'
  | 'survey_complete';

/** Meta standard events. Standard (not custom) so Ads Manager can optimise. */
const META_EVENT: Record<ConversionType, string> = {
  beta_signup: 'CompleteRegistration',
  contact_form: 'Lead',
  calendar_booking: 'Schedule',
  survey_complete: 'SubmitApplication',
};

/**
 * Reports a conversion to every consented tracker.
 *
 * NEVER pass personal data in `props`. It reaches Meta and PostHog verbatim,
 * and Meta's terms (like Google's) prohibit sending raw identifiers. Advanced
 * Matching, if it is ever wanted, requires SHA-256 hashing through fbq('init').
 */
export function trackConversion(
  type: ConversionType,
  props?: Record<string, unknown>,
): void {
  trackMetaEvent(META_EVENT[type], props);

  if (posthogOptedIn) {
    void ensurePostHog()
      .then((posthog) => posthog?.capture(type, props))
      .catch(() => {
        /* analytics must never break a form submission */
      });
  }
}

/* ---------------------------------------------------------------- Router */

/**
 * Single entry point used by the consent banner. Applies the visitor's choice
 * to every tag we control, in both directions.
 */
export function applyTrackingConsent(prefs: CookiePreferences): void {
  if (prefs.analytics) void optInPostHog();
  else void optOutPostHog();

  if (prefs.marketing) loadMetaPixel();
}

/** Fires the per-route pageviews for whichever tags are consented + loaded. */
export function trackRouteChange(): void {
  trackMetaPageView();
  void trackPostHogPageView();
}
