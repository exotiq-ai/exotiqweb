export interface AttributionMetadata {
  page?: string;
  landing_page?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const STORAGE_PREFIX = 'exotiq_';
const LANDING_PAGE_KEY = `${STORAGE_PREFIX}landing_page`;
const UTM_SOURCE_KEY = `${STORAGE_PREFIX}utm_source`;
const UTM_MEDIUM_KEY = `${STORAGE_PREFIX}utm_medium`;
const UTM_CAMPAIGN_KEY = `${STORAGE_PREFIX}utm_campaign`;
const REFERRER_KEY = `${STORAGE_PREFIX}referrer`;

function safeSessionGet(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSessionSet(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Storage blocked — attribution will fall back to current-page values.
  }
}

/**
 * Persist first-touch attribution on the very first call per session,
 * then return stored values on subsequent pages so UTMs survive navigation.
 */
export function getAttributionMetadata(): AttributionMetadata {
  if (typeof window === 'undefined') return {};

  const searchParams = new URLSearchParams(window.location.search);
  const currentPage = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  const existingLandingPage = safeSessionGet(LANDING_PAGE_KEY);
  if (!existingLandingPage) {
    safeSessionSet(LANDING_PAGE_KEY, currentPage);

    const utmSource = searchParams.get('utm_source');
    const utmMedium = searchParams.get('utm_medium');
    const utmCampaign = searchParams.get('utm_campaign');
    const referrer = document.referrer;

    if (utmSource) safeSessionSet(UTM_SOURCE_KEY, utmSource);
    if (utmMedium) safeSessionSet(UTM_MEDIUM_KEY, utmMedium);
    if (utmCampaign) safeSessionSet(UTM_CAMPAIGN_KEY, utmCampaign);
    if (referrer) safeSessionSet(REFERRER_KEY, referrer);
  }

  return {
    page: currentPage,
    landing_page: existingLandingPage || currentPage,
    referrer: safeSessionGet(REFERRER_KEY) || document.referrer || undefined,
    utm_source: safeSessionGet(UTM_SOURCE_KEY) || undefined,
    utm_medium: safeSessionGet(UTM_MEDIUM_KEY) || undefined,
    utm_campaign: safeSessionGet(UTM_CAMPAIGN_KEY) || undefined,
  };
}

export function withoutEmptyAttribution<T extends Record<string, unknown>>(metadata: T): T {
  return Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== undefined && value !== '')
  ) as T;
}
