import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { useTheme } from '../contexts/ThemeContext';
import { openCookieSettings } from '../utils/consentStore';

export default function CookiePolicyPage() {
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const originalTheme = document.documentElement.classList.contains('dark');
    document.documentElement.classList.remove('dark');
    return () => {
      if (originalTheme || theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    };
  }, [theme]);

  return (
    <div className="pt-16">
      <SEOHead
        title="Cookie Policy - Exotiq Inc."
        description="Learn how Exotiq uses cookies and similar technologies on exotiq.ai and related websites. Manage your cookie preferences and understand your choices."
        keywords="Exotiq cookies, cookie policy, cookie preferences, tracking technologies, privacy controls"
        url="https://exotiq.ai/cookies"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://exotiq.ai" },
          { name: "Cookie Policy", url: "https://exotiq.ai/cookies" }
        ])}
      />

      <section className="legal-hero legal-hero-amber">
        <div className="legal-hero-inner">
          <div className="legal-eyebrow">Exotiq Inc. — a Delaware C-Corporation</div>
          <h1 className="legal-title">Cookie Policy</h1>
          <p className="legal-subtitle">Use of Cookies and Similar Technologies</p>
        </div>
      </section>

      <div className="legal-meta-bar">
        <div className="legal-container">
          <div className="legal-meta">
            <span><strong>Effective Date:</strong> January 1, 2026</span>
            <span><strong>Last Updated:</strong> October 6, 2026</span>
          </div>
        </div>
      </div>

      <section className="legal-content-section">
        <div className="legal-container">
          <article className="legal-document">

            <p>This Cookie Policy explains how Exotiq Inc., doing business as Drive Exotiq, uses cookies and similar technologies (local storage, session storage and pixels). This version lists, from testing, what <strong>exotiq.ai</strong> (our website) sets and loads. The Command Center (app.exotiq.ai) and Drive Exotiq (book.exotiq.rent) also use strictly necessary cookies for sign-in, security and checkout; a complete list for those sites is being added.</p>

            <h2>Article I: What Are Cookies</h2>
            <p>Cookies are small text files placed on your device when you visit a website. Similar technologies, such as local storage and session storage in your browser, and tracking pixels, do the same jobs. We call all of them "cookies" in this policy.</p>

            <h2>Article II: What exotiq.ai Sets and Loads</h2>

            <h3>Section 2.1. Strictly Necessary (always on)</h3>
            <div className="legal-table-wrapper">
              <table className="legal-table">
                <thead>
                  <tr><th>Name</th><th>Purpose</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  <tr><td>exotiq_consent (cookie)</td><td>Remembers your cookie choices</td><td>180 days</td></tr>
                  <tr><td>exotiq_cookie_preferences (local storage)</td><td>Backup copy of your cookie choices</td><td>Until you clear it</td></tr>
                  <tr><td>exotiq_performance_metrics (local storage)</td><td>Page-load timings kept on your device to help the page load quickly. Not sent to us</td><td>Until you clear it</td></tr>
                  <tr><td>exotiq_high_contrast, exotiq_reduced_motion, exotiq_font_size (local storage)</td><td>Your accessibility settings, saved only if you change them</td><td>Until you clear it</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Section 2.2. Analytics (only with your consent)</h3>
            <div className="legal-table-wrapper">
              <table className="legal-table">
                <thead>
                  <tr><th>Provider and name</th><th>Purpose</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  <tr><td>Google Analytics 4: _ga, _ga_E5GG9Y4151</td><td>Counts visits and shows which pages are used</td><td>Up to 13 months</td></tr>
                  <tr><td>PostHog: ph_phc_…_posthog (cookie, local and session storage)</td><td>Product and website analytics: pages viewed, clicks, conversions</td><td>12 months</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Section 2.3. Marketing (only with your consent, and never when Global Privacy Control is on)</h3>
            <div className="legal-table-wrapper">
              <table className="legal-table">
                <thead>
                  <tr><th>Provider and name</th><th>Purpose</th><th>Duration</th></tr>
                </thead>
                <tbody>
                  <tr><td>Meta Pixel: _fbp, _fbc</td><td>Measures and improves our Meta (Facebook and Instagram) ads. Meta receives page views and conversion events such as a booked demo or a submitted form</td><td>90 days</td></tr>
                  <tr><td>exotiq_attribution (session storage)</td><td>Remembers campaign identifiers (utm_*, fbclid, gclid, ttclid) in the web address so we can credit the right ad when you start a trial</td><td>Until you close the tab</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Section 2.4. Functional</h3>
            <p>exotiq.ai does not currently set functional cookies beyond those in Section 2.1.</p>

            <h3>Section 2.5. Third-Party Requests Before You Choose</h3>
            <p>Before you make a choice, your browser contacts Google Tag Manager and Google Analytics. In that state Google Analytics runs in a limited mode that sets no cookies and sends basic measurement pings, and Google sees your IP address as it would on any web request. Your browser also loads typefaces from Google Fonts. We plan to host our fonts ourselves and, for visitors in the EEA and UK, to load no Google tags until you consent.</p>

            <h2>Article III: Advertising, Sharing and Your Choices</h2>
            <p>With your consent, the Meta Pixel sends browsing information to Meta. Under some state privacy laws that is "sharing" for cross-context behavioral advertising or "targeted advertising". We do not do it without your consent.</p>
            <p>You can change your choices at any time with <button type="button" className="underline" onClick={openCookieSettings}>Cookie Settings</button> (also in the footer of every page). If your browser sends a Global Privacy Control signal, we treat it as a request to keep advertising and sharing off, and we apply it automatically. Your browser's own settings also let you delete or block cookies. Withdrawing consent stops new collection; cookies already set stay until they expire or you delete them.</p>

            <h2>Article IV: State and International Disclosures</h2>
            <p>California residents: CCPA/CPRA rights apply. We do not sell personal information for money. The consent-based sharing described in Article III is the only sharing for advertising we do, and you can turn it off as described. Colorado, Virginia and Connecticut residents: the same choice applies to targeted advertising. EEA/UK visitors: we ask for your consent before non-essential cookies and storage, subject to Section 2.5.</p>

            <h2>Contact</h2>
            <p><strong>Email:</strong> <a href="mailto:privacy@exotiq.ai">privacy@exotiq.ai</a></p>
            <p><strong>Address:</strong> Exotiq Inc., 1001 S Main St #6709, Kalispell, MT 59901</p>

          </article>
        </div>
      </section>

      <div className="legal-footer">
        <div className="legal-footer-inner">
          <p>&copy; 2026 Exotiq Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
