import { useEffect } from 'react';
import { trackEvent } from '../components/Analytics';

const DEPTH_THRESHOLDS = [25, 50, 75, 100];

export function useArticleAnalytics(articleSlug: string) {
  useEffect(() => {
    const start = Date.now();
    const trackedDepths = new Set<number>();
    let hasTrackedTimeOnPage = false;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        return;
      }

      const percent = Math.min(
        100,
        Math.round((scrollTop / docHeight) * 100)
      );

      DEPTH_THRESHOLDS.forEach((threshold) => {
        if (percent >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          trackEvent('scroll_depth', {
            event_category: 'blog_engagement',
            event_label: articleSlug,
            depth_percentage: threshold,
          });
        }
      });
    };

    const trackTimeOnPage = () => {
      if (hasTrackedTimeOnPage) {
        return;
      }
      hasTrackedTimeOnPage = true;
      const seconds = Math.round((Date.now() - start) / 1000);
      trackEvent('time_on_article', {
        event_category: 'blog_engagement',
        event_label: articleSlug,
        seconds,
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', trackTimeOnPage);

    return () => {
      trackTimeOnPage();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', trackTimeOnPage);
    };
  }, [articleSlug]);
}

