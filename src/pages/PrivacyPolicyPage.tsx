import React, { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { useTheme } from '../contexts/ThemeContext';

export default function PrivacyPolicyPage() {
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
        title="Privacy Policy - Exotiq Inc."
        description="How Exotiq collects, uses, and protects your information. Comprehensive privacy policy covering the Exotiq Command Center platform and Drive Exotiq marketplace."
        keywords="Exotiq privacy policy, data protection, CCPA, GDPR, fleet management privacy, AI data usage"
        url="https://exotiq.ai/privacy"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://exotiq.ai" },
          { name: "Privacy Policy", url: "https://exotiq.ai/privacy" }
        ])}
      />

      <section className="legal-hero legal-hero-success">
        <div className="legal-hero-inner">
          <div className="legal-eyebrow">Exotiq Inc. — a Delaware C-Corporation</div>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-subtitle">How Exotiq Collects, Uses, and Protects Your Information</p>
        </div>
      </section>

      <div className="legal-meta-bar">
        <div className="legal-container">
          <div className="legal-meta">
            <span><strong>Effective Date:</strong> May 16, 2026</span>
            <span><strong>Last Updated:</strong> May 2026</span>
          </div>
        </div>
      </div>

      <section className="legal-content-section">
        <div className="legal-container">
          <article className="legal-document">

            <p>Exotiq Inc. (&quot;Exotiq,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a Delaware C-Corporation, is committed to protecting the privacy and security of information collected through the Exotiq Command Center platform (&quot;Platform&quot;) and the Drive Exotiq marketplace. This Privacy Policy explains what information we collect, how we use it, who we share it with, and how we protect it.</p>
            <p>This Privacy Policy applies to all users of the Platform, including fleet operators (&quot;Customers&quot;), their authorized users, Vehicle Partners, and renters who interact with Drive Exotiq.</p>

            <h2>Article I: Information We Collect</h2>
            <h3>Section 1.1. Account Information</h3>
            <p>When you create an account, we collect: your name, email address, phone number, business name, business address, and payment information (processed and stored by Stripe, not by Exotiq directly).</p>
            <h3>Section 1.2. Fleet and Operational Data</h3>
            <p>Through your use of the Platform, we collect and process: vehicle inventory data (make, model, year, VIN, mileage, photos, specifications); booking and reservation records; renter information you enter; maintenance records and schedules; pricing data and pricing history; insurance and compliance documentation uploaded to Vault; and financial transaction records synchronized from Stripe.</p>
            <h3>Section 1.3. AI Interaction Data</h3>
            <p>When you use AI Services, we collect: MotorIQ usage data including pricing queries, applied recommendations, and pricing outcomes; FleetCopilot/Rari conversation logs including text and voice inputs; voice recordings processed through ElevenLabs for the Rari voice agent; and AI recommendation acceptance/rejection patterns used for model improvement.</p>
            <h3>Section 1.4. Technical and Usage Data</h3>
            <p>We automatically collect: IP addresses, browser type, device information, and operating system; pages viewed, features used, and session duration; error logs and performance data; and telematics data received from integrated providers (GPS location, vehicle diagnostics, driving data).</p>
            <h3>Section 1.5. SMS Notification and Consent Data</h3>
            <p>When registered operators opt in to SMS lead-alert notifications operated by Exotiq, we collect and store: mobile phone numbers; SMS consent preferences; the timestamp and IP address where available at the time of consent; the specific consent language presented at opt-in; and opt-out history and timestamps. These consent records are maintained as needed to provide the SMS notification service, document compliance, resolve disputes, and satisfy legal obligations.</p>
            <p>If you are a registered operator on our platform, you may configure your mobile phone number within your account dashboard to receive internal lead-alert notifications via SMS. The phone number you provide is stored in our application infrastructure and is used solely to deliver lead notifications triggered by your own business phone lines.</p>
            <p>We do not sell, rent, share, or disclose your mobile phone number, SMS opt-in data, or SMS consent to third parties or affiliates for their own marketing or promotional purposes.</p>

            <h2>Article II: How We Use Your Information</h2>
            <h3>Section 2.1. Platform Operations</h3>
            <p>We use your information to: provide, maintain, and improve the Platform and its modules; process bookings, payments, and financial transactions; generate AI-powered pricing recommendations via MotorIQ; power conversational AI features through FleetCopilot/Rari; monitor fleet compliance and send expiration alerts through Vault; and calculate vehicle profitability and financial analytics through Margin.</p>
            <h3>Section 2.2. AI Model Training and Improvement</h3>
            <p>We use aggregated, anonymized operational data to train and improve our proprietary AI models. We do not use individually identifiable Customer Data to train AI models shared across customers without explicit consent.</p>
            <h3>Section 2.3. Communications</h3>
            <p>We use your contact information to send transactional emails via Resend; internal SMS lead-alert notifications via GoHighLevel and Twilio only after you have opted in; product updates and feature announcements; and security notifications. You may opt out of non-transactional communications at any time.</p>
            <h3>Section 2.4. SMS Data and Consent</h3>
            <p>We send SMS messages only to registered operators who have explicitly opted in by entering their mobile phone number in the platform&apos;s notification settings and enabling SMS notifications. No consumer third parties, inbound callers, rental customers, or lead form submitters receive SMS messages through this program.</p>
            <p>Exotiq may operate separate transactional or marketing SMS programs only where a user provides separate express consent through a clear opt-in disclosure. Participation in one SMS program does not enroll you in another SMS program.</p>
            <p>Message frequency varies based on inbound lead volume. Message and data rates may apply. You may opt out at any time by replying <strong>STOP</strong> to any message or by removing your phone number from your account settings. For help, reply <strong>HELP</strong> to any SMS message or contact <a href="mailto:support@exotiq.ai" className="text-primary-500 hover:text-primary-600">support@exotiq.ai</a>. SMS consent is not a condition of purchasing any goods or services from Exotiq.</p>
            <p>We do not sell, rent, share, or disclose your mobile phone number, SMS opt-in data, or SMS consent to third parties or affiliates for their own marketing or promotional purposes. SMS opt-in data and consent will not be shared with any third parties, except with aggregators, carriers, and service providers as necessary to provide the SMS messaging service.</p>

            <h2>Article III: How We Share Your Information</h2>
            <h3>Section 3.1. Third-Party Service Providers</h3>
            <div className="legal-table-wrapper">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Purpose</th>
                    <th>Data Shared</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Stripe</td>
                    <td>Payment processing</td>
                    <td>Transaction data, account information</td>
                  </tr>
                  <tr>
                    <td>Supabase</td>
                    <td>Database and storage</td>
                    <td>All platform data (encrypted at rest)</td>
                  </tr>
                  <tr>
                    <td>ElevenLabs</td>
                    <td>Voice AI (Rari)</td>
                    <td>Voice recordings, text prompts</td>
                  </tr>
                  <tr>
                    <td>Google (Gemini)</td>
                    <td>Demand forecasting</td>
                    <td>Anonymized market queries</td>
                  </tr>
                  <tr>
                    <td>OpenAI</td>
                    <td>Communication AI</td>
                    <td>Text inputs for optimization</td>
                  </tr>
                  <tr>
                    <td>Anthropic</td>
                    <td>AI reasoning</td>
                    <td>Text inputs for analysis</td>
                  </tr>
                  <tr>
                    <td>Resend</td>
                    <td>Email delivery</td>
                    <td>Email addresses, recipient names</td>
                  </tr>
                  <tr>
                    <td>GoHighLevel</td>
                    <td>SMS/text delivery, CRM</td>
                    <td>Phone numbers, message content, consent data</td>
                  </tr>
                  <tr>
                    <td>Twilio</td>
                    <td>SMS delivery infrastructure</td>
                    <td>Phone numbers, message content</td>
                  </tr>
                  <tr>
                    <td>Telematics providers*</td>
                    <td>Vehicle tracking</td>
                    <td>Vehicle ID, account credentials</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p><em>*Telematics providers include Bouncie, Verizon Connect, and Zubie.</em></p>
            <p>All third-party sharing excludes SMS opt-in data and consent, except where necessary to provide SMS messaging services through our messaging providers, aggregators, carriers, and service providers.</p>

            <h3>Section 3.2. SMS Consent Data</h3>
            <p>We do not sell, rent, share, or disclose your mobile phone number, SMS opt-in data, or SMS consent to third parties or affiliates for their own marketing or promotional purposes. Your phone number, SMS opt-in data, and SMS consent may only be shared with: (a) aggregators, carriers, messaging providers, and service providers solely as necessary to provide the SMS messaging service; and (b) as required by law or legal process.</p>
            <h3>Section 3.3. No Sale of Personal Data</h3>
            <p>Exotiq does not sell, rent, or trade personal information to third parties for marketing purposes.</p>

            <h2>Article IV: Data Security</h2>
            <p>We implement commercially reasonable security measures including: encryption of data at rest and in transit (TLS 1.2+); row-level security (RLS) policies ensuring data isolation between customers; secure API authentication; regular security assessments; and encrypted document storage for Vault.</p>
            <p>In the event of a data breach, we will notify affected users within seventy-two (72) hours of confirmed discovery.</p>

            <h2>Article V: Data Retention</h2>
            <ul>
              <li>Active account data: retained for the duration of your subscription.</li>
              <li>Post-termination: Customer Data available for export for 30 days, then deleted within 60 additional days.</li>
              <li>Backup copies: encrypted backups retained for up to 90 days post-deletion.</li>
              <li>Transaction records: retained for seven (7) years for financial and tax compliance.</li>
              <li>Voice recordings (Rari): retained for 30 days, then deleted.</li>
              <li>Document signatures and audit trails: retained for the subscription term plus seven (7) years.</li>
              <li>SMS consent records: retained for at least five (5) years after last interaction.</li>
            </ul>

            <h2>Article VI: Your Rights</h2>
            <h3>Section 6.1. Access and Portability</h3>
            <p>You may request a copy of your personal information in CSV or JSON format.</p>
            <h3>Section 6.2. Correction</h3>
            <p>You may update or correct your account information through the Platform or by contacting <a href="mailto:privacy@exotiq.ai" className="text-primary-500 hover:text-primary-600">privacy@exotiq.ai</a>.</p>
            <h3>Section 6.3. Deletion</h3>
            <p>You may request deletion by contacting <a href="mailto:privacy@exotiq.ai" className="text-primary-500 hover:text-primary-600">privacy@exotiq.ai</a>. Requests processed within 30 days, subject to legal retention requirements.</p>
            <h3>Section 6.4. Opt-Out</h3>
            <p>You may opt out of: marketing communications, AI model training using identifiable data, telematics data collection, and SMS messages (reply STOP or contact support).</p>
            <h3>Section 6.5. State-Specific Rights</h3>
            <p>California, Colorado, Virginia, and Connecticut residents may have additional rights. Contact <a href="mailto:privacy@exotiq.ai" className="text-primary-500 hover:text-primary-600">privacy@exotiq.ai</a> with your request and state of residence.</p>

            <h2>Article VII: Children&apos;s Privacy</h2>
            <p>The Platform is not intended for individuals under 18. We do not knowingly collect information from minors.</p>

            <h2>Article VIII: Changes to This Policy</h2>
            <p>Material changes communicated via email at least thirty (30) days before the effective date.</p>

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
