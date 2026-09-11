import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { loadGoogleAnalytics, trackConversion, trackRouteChange } from '../utils/trackers';

/**
 * Sends a pageview to every consented tracker on client-side navigation, and
 * reports demo/sales-call bookings.
 *
 * Booking CTAs are caught with ONE delegated listener rather than an onClick
 * per button. There are ~18 hardcoded Calendly links across the site; wiring
 * them individually misses some today and every new one added later. Listening
 * in the capture phase also means a handler that calls preventDefault or
 * stopPropagation further down cannot hide the conversion.
 *
 * The initial pageview is skipped: GA4 sends one on config, the Meta Pixel
 * sends one on init and PostHog sends one on opt-in, so counting it here
 * would double it.
 */
export default function RouteAnalytics() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  // GA4 runs under Consent Mode (defaults denied in index.html), so it is
  // loaded unconditionally like the GTM container; consent gates its cookies.
  useEffect(() => {
    loadGoogleAnalytics();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    trackRouteChange();
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.('a[href*="calendly.com"]') as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute('href') || '';
      trackConversion('calendar_booking', {
        location: link.dataset.cta || link.textContent?.trim().slice(0, 40) || 'unknown',
        page: window.location.pathname,
        meeting: href.split('/').filter(Boolean).pop(),
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
