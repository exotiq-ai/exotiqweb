/**
 * Consent-gated tracking loaders.
 *
 * One file owns every tag the site controls (Google Analytics 4, Meta Pixel,
 * PostHog) so that consent, pageviews and conversions cannot drift apart per
 * vendor. Each loader is idempotent and never throws: a blocked or failed tag
 * must never take the page down with it. PostHog is dynamically imported so it
 * stays out of the critical bundle (first paint on an in-app browser is the
 * tight budget).
 *
 * Consent model:
 * - Google (GA4 + the GTM container in index.html) runs under Consent Mode v2.
 *   The tag loads regardless; index.html sets every storage type to "denied"
 *   before any Google script runs, and applyTrackingConsent() flips the six
 *   consent types to match the visitor's choice. Until then Google sends only
 *   cookieless pings.
 * - Meta Pixel and PostHog do not have a comparable mode, so they are not even
 *   loaded until the visitor has consented (marketing / analytics respectively).
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
    /** gtag() shim declared inline in index.html; queues into dataLayer. */
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// exotiq.ai is deployed by uploading a locally built dist/, so Netlify's own
// environment variables are never read at build time. A committed default is
// therefore the only value that reliably survives a deploy. All three IDs below
// are public by design — they are visible in the page source of every site
// using them — so committing them discloses nothing. The env var still wins
// where one is set (previews, a future CI build).
const DEFAULT_META_PIXEL_ID = '2060347114601720';
const META_PIXEL_ID =
  (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || DEFAULT_META_PIXEL_ID;
// A PostHog *project* key (phc_) is a public client-side token — it ships in
// the bundle by design and is not a secret. Personal API keys (phx_) are
// secrets and must never appear here.
// Region verified against the key: us.i.posthog.com answers, eu returns 404.
const DEFAULT_POSTHOG_KEY = 'phc_mNUjg58cEcEzMp8d4DCxi7XZU24ZpY9QJwpm2hYJak4N';
const POSTHOG_KEY =
  (import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined) || DEFAULT_POSTHOG_KEY;
const POSTHOG_HOST =
  (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined) || 'https://us.i.posthog.com';
// GA4 web data stream Measurement ID (G-XXXXXXXXXX). Empty means GA4 is not
// wired: the loader is a no-op and warns once. Fill this in from
// GA4 Admin → Data streams → Web → Measurement ID.
const DEFAULT_GA4_MEASUREMENT_ID = 'G-E5GG9Y4151';
const GA4_MEASUREMENT_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || DEFAULT_GA4_MEASUREMENT_ID;

let metaPixelLoaded = false;
let ga4Loaded = false;
let posthogLoading: Promise<void> | null = null;
let posthogOptedIn = false;
/** True once the visitor's consent has been applied (stored or just chosen). */
let consentApplied = false;
/** Consent granted for PostHog (analytics). Loading is async; this is the intent. */
let posthogEnabled = false;

/* ---------------------------------------------------------------- Google */

/**
 * The gtag() shim is declared inline in index.html (it must exist before the
 * GTM container loads so the Consent Mode defaults land first). Calling
 * through window keeps this file safe under prerender and tests.
 */
function gtag(...args: unknown[]): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
    return;
  }
  // Shell not present (tests / unusual embeds): fall back to the raw queue so
  // the call is not lost if a Google tag turns up later.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Loads the GA4 tag (gtag.js) directly, independent of the GTM container.
 * The container GTM-MZ8QVQXN is loaded by index.html but has no tags in it,
 * so GA4 must be wired here or nothing reaches Google Analytics at all.
 *
 * Do NOT also add a GA4 configuration tag to the GTM container: the same
 * Measurement ID configured in both places double-counts every pageview.
 */
export function loadGoogleAnalytics(): void {
  if (ga4Loaded || typeof window === 'undefined') return;

  if (!GA4_MEASUREMENT_ID) {
    logger.warn(
      'GA4 not loaded: no Measurement ID. Set VITE_GA_MEASUREMENT_ID or DEFAULT_GA4_MEASUREMENT_ID in trackers.ts.',
    );
    return;
  }

  try {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
    document.head.appendChild(script);

    gtag('js', new Date());
    // The initial page_view is sent by config; SPA navigations are sent by
    // trackRouteChange(). Every full load (each prerendered route) counts once.
    gtag('config', GA4_MEASUREMENT_ID, { send_page_view: true });
    ga4Loaded = true;
    logger.info('GA4 loaded', { measurementId: GA4_MEASUREMENT_ID });
  } catch (error) {
    logger.warn('Failed to load GA4', { error });
  }
}

/** Sends a GA4 event; no-op until the tag is loaded. */
export function trackGa4Event(name: string, params?: Record<string, unknown>): void {
  if (!ga4Loaded) return;
  try {
    gtag('event', name, params);
  } catch (error) {
    logger.warn('Failed to send GA4 event', { name, error });
  }
}

function trackGa4PageView(): void {
  if (typeof window === 'undefined') return;
  trackGa4Event('page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });
}

/**
 * Pushes the visitor's choice into Google Consent Mode v2. All six consent
 * types are set every time: leaving ad_user_data / ad_personalization at
 * their "denied" default silently degrades Google Ads conversion matching
 * even after the visitor accepted marketing cookies.
 */
function applyGoogleConsent(prefs: CookiePreferences): void {
  const state = (granted: boolean) => (granted ? 'granted' : 'denied');
  try {
    gtag('consent', 'update', {
      analytics_storage: state(prefs.analytics),
      ad_storage: state(prefs.marketing),
      ad_user_data: state(prefs.marketing),
      ad_personalization: state(prefs.marketing),
      functionality_storage: state(prefs.functional),
      personalization_storage: state(prefs.functional),
    });
  } catch (error) {
    logger.warn('Failed to update Google consent mode', { error });
  }
}

/* ------------------------------------------------------------------ Meta */

/**
 * Loads the Meta (Facebook/Instagram) Pixel. Requires a pixel ID at build
 * time; without it this is a no-op and says so loudly in the console, because
 * a paid Meta campaign with no pixel has no conversion signal at all.
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

/** Fires a Meta custom (non-standard) event; no-op until the pixel is loaded. */
export function trackMetaCustomEvent(event: string, params?: Record<string, unknown>): void {
  if (!metaPixelLoaded) return;
  try {
    window.fbq?.('trackCustom', event, params);
  } catch (error) {
    logger.warn('Failed to send Meta custom event', { event, error });
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
          // Anonymous visitors stay anonymous events (billed at the cheaper
          // rate). A person profile is only created once identify() is called,
          // which the marketing site never does today.
          person_profiles: 'identified_only',
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
  | 'demo_booked'
  | 'survey_complete';

/**
 * Meta event per conversion. `standard` events are the ones Ads Manager can
 * optimise for; `custom` ones are reported via trackCustom and are visible in
 * Events Manager but not eligible as an optimisation goal.
 *
 * calendar_booking is the CLICK on a Calendly link (intent, not a booking).
 * demo_booked is the confirmed booking, fired by /thanks/demo after Calendly
 * redirects there. Only the confirmed booking is Meta's standard Schedule
 * event, so campaigns optimise on real meetings rather than clicks.
 */
const META_EVENT: Record<ConversionType, { name: string; custom?: boolean }> = {
  beta_signup: { name: 'CompleteRegistration' },
  contact_form: { name: 'Lead' },
  calendar_booking: { name: 'ScheduleClick', custom: true },
  demo_booked: { name: 'Schedule' },
  survey_complete: { name: 'SubmitApplication' },
};

/** Runs `fn` with an opted-in PostHog client, if analytics consent exists. */
function withPostHog(fn: (posthog: NonNullable<Awaited<ReturnType<typeof ensurePostHog>>>) => void): void {
  if (!posthogEnabled) return;
  void optInPostHog()
    .then(() => ensurePostHog())
    .then((posthog) => {
      if (posthog) fn(posthog);
    })
    .catch(() => {
      /* analytics must never break the page */
    });
}

/**
 * Non-conversion engagement events (CTA clicks, feature clicks, 404s). Sent
 * to GA4 and PostHog; never to Meta. The gtag() push also lands in the GTM
 * dataLayer, so a future GTM trigger can key on the same event name.
 */
export function trackEngagement(name: string, props?: Record<string, unknown>): void {
  trackGa4Event(name, props);
  withPostHog((posthog) => posthog.capture(name, props));
}

/**
 * Conversions fired before consent has been applied (a full page load whose
 * first effect is the conversion itself, e.g. /thanks/demo) wait here until
 * applyTrackingConsent() runs. GA4 is exempt: under Consent Mode it accepts
 * cookieless events before consent and models them.
 */
const pendingConversions: Array<[ConversionType, Record<string, unknown> | undefined]> = [];

/**
 * Reports a conversion to every consented tracker. This is the ONLY place a
 * conversion is reported; do not add a second vendor-specific call next to a
 * trackConversion() call site or the conversion double-counts there.
 *
 * GA4 receives the ConversionType verbatim as the event name (beta_signup,
 * contact_form, calendar_booking, survey_complete). Mark those four as key
 * events in GA4 Admin → Events.
 *
 * NEVER pass personal data in `props`. It reaches Meta, PostHog and Google
 * verbatim, and all three prohibit sending raw identifiers. Advanced Matching,
 * if it is ever wanted, requires SHA-256 hashing through fbq('init').
 */
export function trackConversion(
  type: ConversionType,
  props?: Record<string, unknown>,
): void {
  trackGa4Event(type, props);

  if (!consentApplied) {
    pendingConversions.push([type, props]);
    return;
  }

  const meta = META_EVENT[type];
  if (meta.custom) trackMetaCustomEvent(meta.name, props);
  else trackMetaEvent(meta.name, props);

  withPostHog((posthog) => posthog.capture(type, props));
}

/* ----------------------------------------------------------- Attribution */

/** Ad-click identifiers worth carrying from the landing URL into the app's signup URL. */
const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
  'ttclid',
] as const;
const ATTRIBUTION_STORAGE_KEY = 'exotiq_attribution';

/**
 * Appends the visit's ad-click identifiers (utm_*, fbclid, gclid, ttclid) to
 * an outbound first-party URL, so a trial started from a mobile CTA can be
 * stitched back to the ad in PostHog/Meta. The identifiers are remembered for
 * the session because client-side navigation drops them from the address
 * bar. Never throws; returns the URL untouched when there is nothing to add.
 */
export function withAttribution(url: string): string {
  if (typeof window === 'undefined') return url;
  try {
    const found: Record<string, string> = {};
    try {
      const stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) ?? '{}');
      for (const key of ATTRIBUTION_KEYS) {
        if (typeof stored?.[key] === 'string') found[key] = stored[key];
      }
    } catch {
      /* storage blocked — the current URL is still checked below */
    }
    const params = new URLSearchParams(window.location.search);
    for (const key of ATTRIBUTION_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value;
    }
    const keys = Object.keys(found);
    if (keys.length === 0) return url;
    try {
      sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(found));
    } catch {
      /* storage blocked — still forward what the current URL carries */
    }
    const target = new URL(url);
    for (const key of keys) {
      if (!target.searchParams.has(key)) target.searchParams.set(key, found[key]);
    }
    return target.toString();
  } catch {
    return url;
  }
}

/* ---------------------------------------------------------------- Router */

/**
 * Single entry point used by the consent banner. Applies the visitor's choice
 * to every tag we control, in both directions.
 */
export function applyTrackingConsent(prefs: CookiePreferences): void {
  applyGoogleConsent(prefs);

  posthogEnabled = prefs.analytics;
  if (prefs.analytics) void optInPostHog();
  else void optOutPostHog();

  if (prefs.marketing) loadMetaPixel();

  consentApplied = true;
  // Anything that fired before the visitor's choice was known goes out now,
  // to whichever trackers that choice allows.
  const queued = pendingConversions.splice(0, pendingConversions.length);
  for (const [type, props] of queued) {
    const meta = META_EVENT[type];
    if (meta.custom) trackMetaCustomEvent(meta.name, props);
    else trackMetaEvent(meta.name, props);
    withPostHog((posthog) => posthog.capture(type, props));
  }
}

/**
 * Runs `fn` once the document title has settled after a client-side
 * navigation. Routes are lazy-loaded, so react-helmet-async writes the new
 * <title> only after the route chunk arrives; a pageview sent on the same
 * tick as the URL change carries the PREVIOUS page's title into GA4 and
 * PostHog. Waits for the first <title> mutation, or gives up after a short
 * grace period (same-title routes, blocked chunks).
 */
function afterTitleSettles(fn: () => void, graceMs = 1500): void {
  const titleEl = document.querySelector('title');
  if (!titleEl || typeof MutationObserver === 'undefined') {
    window.setTimeout(fn, 0);
    return;
  }
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    observer.disconnect();
    window.clearTimeout(timer);
    fn();
  };
  const observer = new MutationObserver(finish);
  observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
  const timer = window.setTimeout(finish, graceMs);
}

/** Fires the per-route pageviews for whichever tags are consented + loaded. */
export function trackRouteChange(): void {
  if (typeof window === 'undefined') return;
  afterTitleSettles(() => {
    trackGa4PageView();
    trackMetaPageView();
    void trackPostHogPageView();
  });
}
