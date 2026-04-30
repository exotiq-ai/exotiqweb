import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// Sticky header height (Tailwind h-16 = 64px). Anchor jumps subtract this so
// the target heading isn't covered by the fixed nav.
const STICKY_HEADER_OFFSET = 80;

/**
 * Resets scroll position on forward route changes and handles hash anchors.
 *
 * Why a custom manager (not just react-router):
 * - We have `scroll-behavior: smooth` on <html>, which would cause every
 *   route change to slowly slide back to the top — feels broken. We force
 *   an instant jump on real navigations and reserve smooth scroll for
 *   user-driven anchor links.
 * - Browser back/forward (POP) is left alone so native scroll restoration
 *   continues to feel right.
 * - Same-path clicks still trigger a top reset (e.g. clicking "Pricing" in
 *   the nav while already on /pricing). Refer to `lastScrolledKey`.
 * - Hash navigations (e.g. /#beta, /pricing#faq) smooth-scroll to the
 *   target after the new page renders, with the sticky header offset
 *   accounted for.
 */
export default function RouteScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const lastScrolledKey = useRef<string | null>(null);

  useEffect(() => {
    const key = `${location.pathname}${location.search}${location.hash}`;

    if (navigationType === 'POP') {
      lastScrolledKey.current = key;
      return;
    }

    if (lastScrolledKey.current === key) {
      return;
    }
    lastScrolledKey.current = key;

    if (location.hash) {
      // Defer to the next paint so the lazy-loaded page has mounted and
      // the target element exists in the DOM.
      const id = location.hash.slice(1);
      let attempts = 0;
      const tryScroll = () => {
        const target = id ? document.getElementById(id) : null;
        if (target) {
          const top =
            target.getBoundingClientRect().top + window.scrollY - STICKY_HEADER_OFFSET;
          window.scrollTo({ top, left: 0, behavior: 'smooth' });
          return;
        }
        if (attempts < 20) {
          attempts += 1;
          requestAnimationFrame(tryScroll);
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
      };
      requestAnimationFrame(tryScroll);
      return;
    }

    // Force an *instant* jump. CSS `scroll-behavior: smooth` would otherwise
    // animate the top reset (feels broken between routes), and not every
    // browser respects `behavior: 'instant'` reliably yet — temporarily
    // disabling the CSS rule is the safest cross-browser path.
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, [location.pathname, location.search, location.hash, navigationType]);

  return null;
}
