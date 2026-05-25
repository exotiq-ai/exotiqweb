export interface AttributionMetadata {
  page?: string;
  landing_page?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export function getAttributionMetadata(): AttributionMetadata {
  if (typeof window === 'undefined') return {};

  const searchParams = new URLSearchParams(window.location.search);
  const landingPageKey = 'exotiq_landing_page';
  const currentPage = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const existingLandingPage = window.sessionStorage.getItem(landingPageKey);

  if (!existingLandingPage) {
    window.sessionStorage.setItem(landingPageKey, currentPage);
  }

  return {
    page: currentPage,
    landing_page: existingLandingPage || currentPage,
    referrer: document.referrer || undefined,
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || undefined,
  };
}

export function withoutEmptyAttribution<T extends Record<string, unknown>>(metadata: T): T {
  return Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== undefined && value !== '')
  ) as T;
}
