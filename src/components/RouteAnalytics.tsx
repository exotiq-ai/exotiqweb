import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackRouteChange } from '../utils/trackers';

/**
 * Sends a pageview to every consented tracker on client-side navigation.
 *
 * The initial pageview is skipped: the Meta Pixel sends one on init and
 * PostHog sends one on opt-in, so counting it here would double it.
 */
export default function RouteAnalytics() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    trackRouteChange();
  }, [location.pathname, location.search]);

  return null;
}
