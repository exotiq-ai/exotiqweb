import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackConversion } from '../utils/trackers';

/**
 * Calendly lands here after a confirmed booking (each event type's
 * "Confirmation page" is set to redirect to /thanks/demo?meeting=<slug>).
 * Landing here is the only signal the site ever gets that a meeting was
 * actually booked, so this page reports the demo_booked conversion.
 *
 * Calendly must NOT be configured to "pass event details" to this URL: those
 * parameters carry the invitee's name and e-mail, which would flow into every
 * tracker's page URL. The query string is dropped from the address bar on
 * mount as a second line of defence.
 */
const FIRED_KEY = 'exotiq_demo_booked_v1';

export default function DemoBookedPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const meeting = params.get('meeting') || 'demo';

    // A reload or back-navigation to this page must not count twice.
    let alreadyFired = false;
    try {
      alreadyFired = sessionStorage.getItem(FIRED_KEY) === '1';
      if (!alreadyFired) sessionStorage.setItem(FIRED_KEY, '1');
    } catch {
      /* storage unavailable: fire once per load, which is the best we can do */
    }

    if (window.location.search) {
      window.history.replaceState(window.history.state, '', window.location.pathname);
    }

    if (!alreadyFired) {
      trackConversion('demo_booked', { meeting, page: window.location.pathname });
    }
  }, []);

  return (
    <>
      <SEOHead
        title="You're booked"
        description="Your exotiq demo is on the calendar."
        canonical="https://exotiq.ai/thanks/demo"
        noindex
      />
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50 dark:bg-dark-900">
        <div className="text-center max-w-lg">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500/15">
            <CalendarCheck className="h-7 w-7 text-primary-600 dark:text-primary-400" />
          </div>
          <p className="font-poppins font-bold text-sm uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-3">
            Demo confirmed
          </p>
          <h1 className="font-dfaalt font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
            You're booked
          </h1>
          <p className="font-inter text-gray-600 dark:text-gray-300 mb-8">
            The calendar invite is on its way to your inbox. Bring a rough count of your fleet and
            the tools you run it on today, and we'll show you exactly what exotiq replaces.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/features"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-inter font-semibold transition-colors"
            >
              See the platform
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-dark-700 font-inter font-semibold transition-colors hover:border-primary-500"
            >
              Pricing
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
