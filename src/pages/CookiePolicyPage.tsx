import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { useTheme } from '../contexts/ThemeContext';

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
            <span><strong>Last Updated:</strong> June 6, 2026</span>
          </div>
        </div>
      </div>

      <section className="legal-content-section">
        <div className="legal-container">
          <article className="legal-document">

            <p>This Cookie Policy explains how Exotiq Inc. uses cookies and similar technologies on exotiq.ai, app.exotiq.ai, and driveexotiq.com.</p>

            <h2>Article I: What Are Cookies</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They enable core functionality, remember preferences, and provide usage analytics.</p>

            <h2>Article II: Cookies We Use</h2>

            <h3>Section 2.1. Strictly Necessary</h3>
            <div className="legal-table-wrapper">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Session authentication</td>
                    <td>Maintains login and session security</td>
                    <td>Session / 30 days</td>
                  </tr>
                  <tr>
                    <td>CSRF protection</td>
                    <td>Prevents cross-site request forgery</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>Load balancing</td>
                    <td>Distributes traffic for performance</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>Cookie consent</td>
                    <td>Stores your cookie preferences</td>
                    <td>12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Section 2.2. Functional (require consent)</h3>
            <div className="legal-table-wrapper">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>User preferences</td>
                    <td>UI preferences, dashboard layout</td>
                    <td>12 months</td>
                  </tr>
                  <tr>
                    <td>Language/locale</td>
                    <td>Regional formatting preferences</td>
                    <td>12 months</td>
                  </tr>
                  <tr>
                    <td>Recent activity</td>
                    <td>Quick access to recent items</td>
                    <td>Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Section 2.3. Analytics (require consent)</h3>
            <div className="legal-table-wrapper">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Page views</td>
                    <td>Tracks pages visited</td>
                    <td>24 months</td>
                  </tr>
                  <tr>
                    <td>Feature usage</td>
                    <td>Records feature frequency</td>
                    <td>24 months</td>
                  </tr>
                  <tr>
                    <td>Performance</td>
                    <td>Measures load times and errors</td>
                    <td>24 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Section 2.4. Cookies We Do Not Use</h3>
            <p>Exotiq does not use advertising, cross-site tracking, social media tracking, retargeting, or third-party advertising network cookies. We do not serve ads or share cookie data with advertisers.</p>

            <h2>Article III: Your Choices</h2>
            <p>The cookie consent banner allows you to accept all, reject non-essential, or customize by category. Change preferences anytime via "Cookie Settings" in the footer. Most browsers also allow cookie management through their settings.</p>

            <h2>Article IV: State and International Disclosures</h2>
            <p>California residents: CCPA/CPRA rights apply. We do not sell cookie data. Colorado, Virginia, Connecticut residents: we do not use cookies for targeted advertising. EEA/UK visitors: non-essential cookies placed only with prior consent per the ePrivacy Directive and GDPR.</p>

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
