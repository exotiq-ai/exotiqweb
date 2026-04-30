import React, { useEffect } from 'react';
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

      <section className="py-16 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <div className="font-montserrat text-sm opacity-80 mb-4 tracking-wide uppercase">Exotiq Inc. — a Delaware C-Corporation</div>
          <h1 className="font-dfaalt font-bold text-4xl md:text-5xl mb-4">Cookie Policy</h1>
          <p className="font-montserrat text-lg opacity-90">Use of Cookies and Similar Technologies</p>
        </div>
      </section>

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 py-4">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-montserrat text-gray-600">
            <span><strong className="text-gray-900">Effective Date:</strong> January 1, 2026</span>
            <span><strong className="text-gray-900">Last Updated:</strong> March 2026</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <article className="prose prose-gray prose-lg max-w-none prose-headings:font-dfaalt prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-p:font-montserrat prose-p:text-gray-700 prose-p:leading-relaxed prose-li:font-montserrat prose-li:text-gray-700 prose-a:text-primary-500 hover:prose-a:text-primary-600 prose-strong:text-gray-900">

            <p>This Cookie Policy explains how Exotiq Inc. uses cookies and similar technologies on exotiq.ai, app.exotiq.ai, and driveexotiq.com.</p>

            <h2>Article I: What Are Cookies</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They enable core functionality, remember preferences, and provide usage analytics.</p>

            <h2>Article II: Cookies We Use</h2>

            <h3>Section 2.1. Strictly Necessary</h3>
            <div className="not-prose overflow-x-auto my-6 rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Cookie</th>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Purpose</th>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">Session authentication</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Maintains login and session security</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Session / 30 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">CSRF protection</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Prevents cross-site request forgery</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">Load balancing</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Distributes traffic for performance</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">Cookie consent</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Stores your cookie preferences</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Section 2.2. Functional (require consent)</h3>
            <div className="not-prose overflow-x-auto my-6 rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Cookie</th>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Purpose</th>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">User preferences</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">UI preferences, dashboard layout</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">12 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">Language/locale</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Regional formatting preferences</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">12 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">Recent activity</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Quick access to recent items</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Section 2.3. Analytics (require consent)</h3>
            <div className="not-prose overflow-x-auto my-6 rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Cookie</th>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Purpose</th>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">Page views</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Tracks pages visited</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">24 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">Feature usage</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Records feature frequency</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">24 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">Performance</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Measures load times and errors</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">24 months</td>
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
            <p><strong>Email:</strong> <a href="mailto:privacy@exotiq.ai" className="text-primary-500 hover:text-primary-600">privacy@exotiq.ai</a></p>
            <p><strong>Address:</strong> Exotiq Inc., 1001 S Main St #6709, Kalispell, MT 59901</p>

          </article>
        </div>
      </section>

      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 py-8 text-center">
          <p className="font-montserrat text-sm text-gray-500">&copy; 2026 Exotiq Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
