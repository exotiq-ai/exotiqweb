import React, { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { useTheme } from '../contexts/ThemeContext';

export default function SMSTermsPage() {
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
        title="SMS Terms and Conditions - Exotiq Inc."
        description="Exotiq's SMS terms for operator lead-alert notifications, including opt-in, message frequency, STOP, HELP, carrier, and privacy disclosures."
        keywords="Exotiq SMS terms, text messaging consent, TCPA compliance, CTIA, A2P 10DLC, opt out"
        url="https://exotiq.ai/sms-terms"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://exotiq.ai" },
          { name: "SMS Terms", url: "https://exotiq.ai/sms-terms" }
        ])}
      />

      <section className="legal-hero legal-hero-primary">
        <div className="legal-hero-inner">
          <div className="legal-eyebrow">Exotiq Inc. — a Delaware C-Corporation</div>
          <h1 className="legal-title">SMS Terms and Conditions</h1>
          <p className="legal-subtitle">Operator Lead-Alert SMS Notifications</p>
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

            <p>These SMS Terms and Conditions (&quot;SMS Terms&quot;) govern the SMS notification service provided by Exotiq Inc. (&quot;Exotiq,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) through the Exotiq.ai platform. By opting in to receive SMS notifications, you agree to these SMS Terms.</p>
            <p>This policy is intended to support compliance with the Telephone Consumer Protection Act (&quot;TCPA&quot;), CTIA Messaging Principles and Best Practices, applicable FCC regulations, carrier messaging rules, and A2P 10DLC campaign registration requirements.</p>

            <h2>Article I: Program Description</h2>
            <p>Exotiq provides an internal lead-alert notification service via SMS for registered operators on the Exotiq.ai platform. When an inbound caller to your business completes a lead capture form, a notification may be sent via SMS to the mobile phone number you have configured in your account settings.</p>
            <p>These messages are operator-only notifications. No consumer third parties, inbound callers, rental customers, or lead form submitters are messaged through this SMS program.</p>
            <p>Exotiq may operate separate transactional or marketing SMS programs only where a user provides separate express consent through a clear opt-in disclosure. Participation in the operator lead-alert SMS program does not enroll you in any marketing SMS program, and participation in a marketing SMS program does not enroll you in operator lead-alert notifications.</p>

            <h2>Article II: Opt-In and Consent</h2>
            <h3>Section 2.1. Opt-In Method</h3>
            <p>You opt in to receive SMS lead notifications by entering your mobile phone number in the notification settings within your Exotiq account dashboard and enabling SMS notifications.</p>
            <h3>Section 2.2. Consent Disclosure</h3>
            <p>The SMS opt-in screen states that by entering your mobile number and enabling SMS notifications, you consent to receive SMS lead notification alerts from Exotiq. The screen also discloses that message frequency varies based on inbound lead volume, message and data rates may apply, you may reply <strong>STOP</strong> to opt out, you may reply <strong>HELP</strong> for help, and consent is not a condition of purchase.</p>
            <blockquote><p>By entering your mobile number and enabling SMS notifications, you consent to receive SMS lead notification alerts from Exotiq. Message frequency varies based on inbound lead volume. Message and data rates may apply. Reply <strong>STOP</strong> to opt out and <strong>HELP</strong> for help. Consent is not a condition of purchase. View our SMS Terms and Privacy Policy.</p></blockquote>
            <h3>Section 2.3. Not Required for Service</h3>
            <p>SMS consent is not a condition of purchasing any goods or services from Exotiq. You are not required to opt in to SMS notifications to use the Exotiq platform. Any SMS opt-in checkbox or toggle is optional and is not pre-selected.</p>

            <h2>Article III: Message Frequency and Rates</h2>
            <p>For operator lead-alert notifications, message frequency varies based on inbound lead volume to your business. You will receive one SMS per qualifying lead event. During periods of high lead activity, you may receive multiple messages per day. For any separately consented marketing SMS program, message frequency may vary based on campaign activity. Standard message and data rates may apply depending on your mobile carrier and plan. Exotiq does not charge any fees for SMS notifications.</p>

            <h2>Article IV: Opt-Out</h2>
            <p>You may opt out of SMS notifications at any time by replying <strong>STOP</strong> to any message you receive from us, or by removing your phone number from the notification settings in your Exotiq account dashboard.</p>
            <p>After opting out, you will receive a single confirmation message acknowledging your request. No further SMS messages will be sent unless you re-enroll by adding your phone number back to your notification settings and enabling SMS notifications again.</p>

            <h2>Article V: HELP</h2>
            <p>For assistance, reply <strong>HELP</strong> to any message you receive from us, or contact <a href="mailto:support@exotiq.ai" className="text-primary-500 hover:text-primary-600">support@exotiq.ai</a>.</p>

            <h2>Article VI: Carriers and Eligibility</h2>
            <p>SMS notifications are supported on major U.S. carriers including AT&amp;T, T-Mobile, Verizon, and others. Carrier support is not guaranteed, and delivery may vary. Carriers are not liable for delayed or undelivered messages.</p>

            <h2>Article VII: SMS Platform Providers</h2>
            <div className="legal-table-wrapper">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Role</th>
                    <th>Data Processed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GoHighLevel</td>
                    <td>Primary SMS platform, CRM, A2P 10DLC</td>
                    <td>Phone numbers, messages, consent data</td>
                  </tr>
                  <tr>
                    <td>Twilio</td>
                    <td>SMS delivery infrastructure</td>
                    <td>Phone numbers, message content</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Article VIII: Privacy and Third-Party Sharing</h2>
            <p>Your mobile phone number, SMS opt-in data, and SMS consent will not be sold, rented, shared, or disclosed to third parties or affiliates for their own marketing or promotional purposes.</p>
            <p>SMS opt-in data and consent may be shared only with service providers, aggregators, carriers, or technology vendors as necessary to provide the SMS notification service.</p>
            <p>For full details on how we handle your data, please review our <a href="/privacy">Privacy Policy</a>.</p>

            <h2>Article IX: Consent Records</h2>
            <p>We maintain consent records including date, time, method, IP address where available, consent language version, opt-in status, and opt-out history. Consent records are retained as needed to provide the SMS notification service, document compliance, resolve disputes, and satisfy legal obligations.</p>

            <h2>Article X: Modifications</h2>
            <p>We may update these SMS Terms from time to time. Material changes will be communicated via the Exotiq platform, email, or SMS where permitted. Continued use of the SMS notification service after changes constitutes acceptance of the revised terms.</p>

            <h2>Contact</h2>
            <p><strong>Email:</strong> <a href="mailto:support@exotiq.ai">support@exotiq.ai</a></p>
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
