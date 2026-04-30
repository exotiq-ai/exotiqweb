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
        title="SMS/Text Messaging Consent and Disclosure - Exotiq Inc."
        description="Exotiq's SMS and text messaging consent policy. TCPA and CTIA compliant disclosure for transactional and marketing text messages from Exotiq and Drive Exotiq."
        keywords="Exotiq SMS policy, text messaging consent, TCPA compliance, CTIA, Drive Exotiq SMS, opt out"
        url="https://exotiq.ai/sms-terms"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://exotiq.ai" },
          { name: "SMS Terms", url: "https://exotiq.ai/sms-terms" }
        ])}
      />

      <section className="py-16 bg-gradient-to-br from-violet-500 to-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <div className="font-montserrat text-sm opacity-80 mb-4 tracking-wide uppercase">Exotiq Inc. dba Drive Exotiq — a Delaware C-Corporation</div>
          <h1 className="font-dfaalt font-bold text-4xl md:text-5xl mb-4">SMS/Text Messaging Consent and Disclosure</h1>
          <p className="font-montserrat text-lg opacity-90">TCPA and CTIA Compliance</p>
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

            <p>This SMS Policy describes the text messaging programs operated by Exotiq Inc., a Delaware C-Corporation, doing business as Drive Exotiq (&quot;Exotiq,&quot; &quot;Drive Exotiq,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). For consumer-facing SMS, the brand name &quot;Drive Exotiq&quot; is used. For operator-facing SMS, &quot;Exotiq&quot; is used. Both are the same legal entity.</p>
            <p>This policy complies with the Telephone Consumer Protection Act (&quot;TCPA&quot;), 47 U.S.C. Section 227, the Cellular Telecommunications Industry Association (&quot;CTIA&quot;) Messaging Principles and Best Practices, applicable FCC regulations, and applicable state laws.</p>

            <h2>Article I: Two Separate SMS Programs</h2>
            <p>Exotiq operates <strong>two separate and independent SMS programs</strong>. Participation in one does not enroll you in the other.</p>
            <h3>Section 1.1. Transactional Messages</h3>
            <p>Booking confirmations, payment receipts, vehicle pickup/return reminders, fleet alerts, AI-generated operational alerts, security notifications, and support communications.</p>
            <h3>Section 1.2. Marketing and Promotional Messages</h3>
            <p>Feature announcements, promotional offers, Founding Member updates, event-based marketing, and referral program information.</p>

            <h2>Article II: Consent</h2>
            <h3>Section 2.1. Opt-In Methods</h3>
            <p>Consent may be provided by: (a) checking the SMS consent checkbox during registration or booking; (b) texting START to our number; (c) providing your number through a form with clear disclosure; or (d) documented verbal consent.</p>
            <h3>Section 2.2. Consent Language</h3>
            <p>Transactional checkbox:</p>
            <blockquote><p>I consent to receive transactional text messages from Drive Exotiq at the phone number provided (e.g., booking confirmations, reminders, account alerts). Message frequency may vary. Message and data rates may apply. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.</p></blockquote>
            <p>Marketing checkbox:</p>
            <blockquote><p>I consent to receive marketing and promotional text messages from Drive Exotiq at the phone number provided. Message frequency may vary. Message and data rates may apply. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.</p></blockquote>
            <h3>Section 2.3. Not Required for Service</h3>
            <p>Consent is not required as a condition of purchasing any goods or services, booking a vehicle, or creating an account. Checkboxes are never pre-checked.</p>

            <h2>Article III: Message Frequency and Rates</h2>
            <p>Transactional: 1-5 messages per booking/event. Marketing: no more than 8 per month. Message and data rates may apply.</p>

            <h2>Article IV: Opt-Out</h2>
            <p>Reply <strong>STOP</strong> to any message. Or contact <a href="mailto:support@exotiq.ai" className="text-primary-500 hover:text-primary-600">support@exotiq.ai</a> (operators) / <a href="mailto:support@driveexotiq.com" className="text-primary-500 hover:text-primary-600">support@driveexotiq.com</a> (renters). Reply <strong>PROMO STOP</strong> to opt out of marketing only. Processed immediately via text, within 5 business days via other channels.</p>

            <h2>Article V: HELP</h2>
            <p>Reply <strong>HELP</strong> to any message, or contact <a href="mailto:support@exotiq.ai" className="text-primary-500 hover:text-primary-600">support@exotiq.ai</a> / <a href="mailto:support@driveexotiq.com" className="text-primary-500 hover:text-primary-600">support@driveexotiq.com</a>.</p>

            <h2>Article VI: Carriers and Eligibility</h2>
            <p>Supported by all major U.S. carriers (AT&amp;T, Verizon, T-Mobile, others). Carriers are not liable for delayed or undelivered messages. U.S. residents only, age 18+.</p>

            <h2>Article VII: SMS Platform Providers</h2>
            <div className="not-prose overflow-x-auto my-6 rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Provider</th>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Role</th>
                    <th className="px-4 py-3 text-left font-dfaalt font-semibold text-gray-900 border-b border-gray-200">Data Processed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">GoHighLevel</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Primary SMS platform, CRM, A2P 10DLC</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Phone numbers, messages, consent data</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-montserrat font-medium text-gray-900">Twilio</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">SMS delivery infrastructure</td>
                    <td className="px-4 py-3 font-montserrat text-gray-700">Phone numbers, message content</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Article VIII: AI Messages (Rari)</h2>
            <p>Rari may generate text messages regarding bookings. Initial messages include: &quot;This message was sent by Rari, Drive Exotiq&apos;s AI concierge, on behalf of [Operator Name].&quot; Operators using Rari for SMS are responsible for obtaining TCPA-compliant consent from recipients.</p>

            <h2>Article IX: Consent Records</h2>
            <p>We maintain consent records including date, time, method, IP address, and consent language version. Retained for at least five (5) years per TCPA, CTIA, and FCC requirements. We do not sell, rent, or share SMS consent or phone numbers for third-party marketing.</p>

            <h2>Contact</h2>
            <p><strong>Operators:</strong> <a href="mailto:support@exotiq.ai" className="text-primary-500 hover:text-primary-600">support@exotiq.ai</a></p>
            <p><strong>Renters:</strong> <a href="mailto:support@driveexotiq.com" className="text-primary-500 hover:text-primary-600">support@driveexotiq.com</a></p>
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
