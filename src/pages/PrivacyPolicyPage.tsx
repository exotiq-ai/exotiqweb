import React, { useEffect } from 'react';
import { Shield, Lock, Eye, Users, Globe, Cookie, FileText, Mail, Phone, MapPin } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { useTheme } from '../contexts/ThemeContext';

export default function PrivacyPolicyPage() {
  const { theme } = useTheme();

  // Force light mode for this page
  useEffect(() => {
    // Store original theme state
    const originalTheme = document.documentElement.classList.contains('dark');
    
    // Force light mode
    document.documentElement.classList.remove('dark');
    
    // Cleanup: restore original theme when component unmounts
    return () => {
      if (originalTheme || theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    };
  }, [theme]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16">
      <SEOHead
        title="Privacy Policy - Exotiq.ai Data Protection & Privacy"
        description="Learn how Exotiq.ai protects your privacy and handles your data. Our comprehensive privacy policy explains data collection, usage, and your rights under GDPR, CCPA, and PIPEDA."
        keywords="Exotiq.ai privacy, privacy policy, data protection, GDPR compliance, CCPA compliance, PIPEDA compliance, data usage, user privacy, fleet management privacy"
        url="https://exotiq.ai/privacy"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://exotiq.ai" },
          { name: "Privacy Policy", url: "https://exotiq.ai/privacy" }
        ])}
      />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-success-600 to-primary-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-xl mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-dfaalt font-bold text-5xl md:text-6xl mb-6">
            Privacy Policy
          </h1>
          <p className="font-montserrat text-xl opacity-90 mb-8">
            Your privacy is our priority
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="font-dfaalt font-semibold text-lg mb-2">G & G Holdings MT LLC</div>
            <div className="font-montserrat text-sm opacity-90">
              Effective Date: January 2025 | Last Updated: January 2025
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="bg-white dark:bg-dark-700 p-8 rounded-2xl shadow-lg">
            <h2 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-primary-500" />
              Table of Contents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { id: 'introduction', title: '1. Introduction' },
                { id: 'information-collection', title: '2. Information We Collect' },
                { id: 'information-use', title: '3. How We Use Information' },
                { id: 'legal-basis', title: '4. Legal Basis (GDPR)' },
                { id: 'information-sharing', title: '5. Information Sharing' },
                { id: 'data-security', title: '6. Data Security' },
                { id: 'data-retention', title: '7. Data Retention' },
                { id: 'privacy-rights', title: '8. Your Privacy Rights' },
                { id: 'international-transfers', title: '9. International Transfers' },
                { id: 'cookies', title: '10. Cookies & Tracking' },
                { id: 'third-party', title: '11. Third-Party Services' },
                { id: 'children', title: '12. Children\'s Privacy' },
                { id: 'changes', title: '13. Policy Changes' },
                { id: 'contact', title: '14. Contact Information' },
                { id: 'compliance', title: '15. Compliance' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block p-3 bg-gray-50 dark:bg-dark-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg border border-gray-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm font-medium"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-dfaalt prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:font-montserrat prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:font-montserrat prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-a:text-primary-500 hover:prose-a:text-primary-600 prose-strong:text-gray-900 dark:prose-strong:text-white">
            
            {/* Section 1: Introduction */}
            <section id="introduction">
              <h2 className="flex items-center">
                <Shield className="w-8 h-8 mr-3 text-primary-500" />
                1. Introduction
              </h2>
              <p>
                G & G Holdings MT LLC ("Exotiq.ai," "Company," "we," "us," or "our") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, applications, products, and services (collectively, the "Services").
              </p>
              
              <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-6 my-6">
                <p className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
                  Important Notice
                </p>
                <p className="text-primary-600 dark:text-primary-300 mb-0">
                  By using our Services, you consent to the practices described in this Privacy Policy.
                </p>
              </div>
              
              <p>
                This Privacy Policy should be read in conjunction with our <a href="/terms">Terms and Conditions</a>, which govern your use of our Services.
              </p>
            </section>

            {/* Section 2: Information Collection */}
            <section id="information-collection">
              <h2 className="flex items-center">
                <Eye className="w-8 h-8 mr-3 text-accent-600" />
                2. Information We Collect
              </h2>
              
              <h3>2.1 Personal Information You Provide</h3>
              
              <h4>Account Information:</h4>
              <ul>
                <li>Name, email address, phone number</li>
                <li>Business name and address</li>
                <li>Payment information and billing details</li>
                <li>Profile information and preferences</li>
              </ul>

              <h4>Business Data:</h4>
              <ul>
                <li>Fleet and vehicle information</li>
                <li>Rental agreements and booking data</li>
                <li>Customer information you input into our system</li>
                <li>Financial and operational metrics</li>
                <li>Communication records and support tickets</li>
              </ul>

              <h4>Communications:</h4>
              <ul>
                <li>Messages sent through our platform</li>
                <li>Email communications with our team</li>
                <li>Phone call recordings (with consent)</li>
                <li>Feedback and survey responses</li>
              </ul>

              <h3>2.2 Information We Collect Automatically</h3>
              
              <div className="overflow-x-auto my-8">
                <table className="w-full border-collapse bg-white dark:bg-dark-700 rounded-lg overflow-hidden shadow-lg">
                  <thead className="bg-primary-500 text-white">
                    <tr>
                      <th className="p-4 text-left font-dfaalt font-semibold">Data Type</th>
                      <th className="p-4 text-left font-dfaalt font-semibold">Examples</th>
                      <th className="p-4 text-left font-dfaalt font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="font-montserrat">
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">Usage Data</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Pages visited, features used, time spent</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Service improvement and analytics</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">Technical Information</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">IP address, browser type, device info</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Security and platform optimization</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">Performance Data</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Response times, API usage, errors</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">System monitoring and enhancement</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>2.3 Information from Third Parties</h3>
              <p>We may receive information from:</p>
              <ul>
                <li><strong>Integration Partners:</strong> Booking platforms, payment processors, calendar systems</li>
                <li><strong>Public Sources:</strong> Business directories, industry databases</li>
                <li><strong>Social Media:</strong> Profile data when you connect accounts</li>
              </ul>
            </section>

            {/* Section 3: Information Use */}
            <section id="information-use">
              <h2 className="flex items-center">
                <Users className="w-8 h-8 mr-3 text-success-600" />
                3. How We Use Your Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200">
                  <h4 className="text-primary-500 dark:text-primary-400 font-dfaalt font-semibold text-lg mb-3 flex items-center">
                    🚀 Service Provision
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>Enable platform functionality</li>
                    <li>Account management</li>
                    <li>Customer support</li>
                    <li>Payment processing</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700 hover:border-accent-300 dark:hover:border-accent-700 transition-all duration-200">
                  <h4 className="text-accent-600 dark:text-accent-400 font-dfaalt font-semibold text-lg mb-3 flex items-center">
                    📈 Service Improvement
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>Analytics and insights</li>
                    <li>Feature development</li>
                    <li>Performance optimization</li>
                    <li>Bug fixes and maintenance</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700 hover:border-success-300 dark:hover:border-success-700 transition-all duration-200">
                  <h4 className="text-success-600 dark:text-success-400 font-dfaalt font-semibold text-lg mb-3 flex items-center">
                    📢 Communication
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>Service updates</li>
                    <li>Marketing communications</li>
                    <li>Educational content</li>
                    <li>Emergency notifications</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700 hover:border-warning-300 dark:hover:border-warning-700 transition-all duration-200">
                  <h4 className="text-warning-600 dark:text-warning-400 font-dfaalt font-semibold text-lg mb-3 flex items-center">
                    ⚖️ Legal & Compliance
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>Legal obligations</li>
                    <li>Security measures</li>
                    <li>Dispute resolution</li>
                    <li>Audit and compliance</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: Legal Basis */}
            <section id="legal-basis">
              <h2 className="flex items-center">
                <Globe className="w-8 h-8 mr-3 text-primary-500" />
                4. Legal Basis for Processing (GDPR)
              </h2>
              <p>For users in the European Union, we process your personal data based on the following legal grounds:</p>
              
              <h3>4.1 Contract Performance</h3>
              <ul>
                <li>Account creation and management</li>
                <li>Service delivery and billing</li>
                <li>Customer support provision</li>
              </ul>

              <h3>4.2 Legitimate Interests</h3>
              <ul>
                <li>Platform security and fraud prevention</li>
                <li>Service improvement and analytics</li>
                <li>Direct marketing to existing customers</li>
              </ul>

              <h3>4.3 Legal Compliance</h3>
              <ul>
                <li>Regulatory reporting requirements</li>
                <li>Tax and accounting obligations</li>
                <li>Legal proceedings and investigations</li>
              </ul>

              <h3>4.4 Consent</h3>
              <ul>
                <li>Marketing communications to prospects</li>
                <li>Optional feature usage</li>
                <li>Cookie placement (where required)</li>
              </ul>
            </section>

            {/* Section 5: Information Sharing */}
            <section id="information-sharing">
              <h2>5. Information Sharing and Disclosure</h2>
              
              <div className="bg-success-50 dark:bg-success-900/20 border-l-4 border-success-600 p-6 my-6">
                <h4 className="text-success-800 dark:text-success-200 font-dfaalt font-semibold text-lg mb-2 flex items-center">
                  🛡️ We Do Not Sell Personal Information
                </h4>
                <p className="text-success-700 dark:text-success-300 mb-0">
                  We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                </p>
              </div>

              <h3>5.1 Service Providers</h3>
              <p>We may share information with trusted third-party service providers:</p>
              <ul>
                <li><strong>Cloud Hosting:</strong> AWS, Google Cloud, or similar providers</li>
                <li><strong>Payment Processing:</strong> Stripe, PayPal, or other payment processors</li>
                <li><strong>Analytics Services:</strong> Google Analytics, Mixpanel, or similar tools</li>
                <li><strong>Communication Tools:</strong> Email services, chat systems, phone providers</li>
                <li><strong>Security Services:</strong> Fraud detection and prevention tools</li>
              </ul>

              <h3>5.2 Legal Requirements</h3>
              <p>We may disclose information when required by law or to:</p>
              <ul>
                <li>Comply with legal process or government requests</li>
                <li>Protect our rights, property, or safety</li>
                <li>Prevent fraud or security threats</li>
                <li>Enforce our Terms and Conditions</li>
              </ul>
            </section>

            {/* Section 6: Data Security */}
            <section id="data-security">
              <h2>6. Data Security</h2>
              
              <h3>6.1 Security Measures</h3>
              <p>We implement industry-standard security measures to protect your information:</p>
              
              <div className="overflow-x-auto my-8">
                <table className="w-full border-collapse bg-white dark:bg-dark-700 rounded-lg overflow-hidden shadow-lg">
                  <thead className="bg-accent-600 text-white">
                    <tr>
                      <th className="p-4 text-left font-dfaalt font-semibold">Security Layer</th>
                      <th className="p-4 text-left font-dfaalt font-semibold">Implementation</th>
                      <th className="p-4 text-left font-dfaalt font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="font-montserrat">
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">Encryption</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">AES-256</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Data encrypted in transit and at rest</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">Access Controls</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Multi-factor Authentication</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Role-based access with MFA</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">Network Security</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Firewalls & Monitoring</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Intrusion detection and prevention</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">Regular Audits</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Security Assessments</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Vulnerability testing and reviews</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>6.2 Data Breach Response</h3>
              <div className="bg-warning-50 dark:bg-warning-900/20 border-l-4 border-warning-600 p-6 my-6">
                <p className="text-warning-700 dark:text-warning-300 mb-3">In the event of a data breach, we will:</p>
                <ul className="text-warning-700 dark:text-warning-300 space-y-1">
                  <li>Investigate and contain the breach immediately</li>
                  <li>Notify affected users within 72 hours where required by law</li>
                  <li>Report to relevant authorities as required by GDPR</li>
                  <li>Take corrective actions to prevent future breaches</li>
                </ul>
              </div>
            </section>

            {/* Section 7: Data Retention */}
            <section id="data-retention">
              <h2>7. Data Retention</h2>
              
              <h3>7.1 Retention Periods</h3>
              <p>We retain your information for as long as necessary to provide our Services and comply with legal obligations.</p>
              
              <div className="overflow-x-auto my-8">
                <table className="w-full border-collapse bg-white dark:bg-dark-700 rounded-lg overflow-hidden shadow-lg">
                  <thead className="bg-success-600 text-white">
                    <tr>
                      <th className="p-4 text-left font-dfaalt font-semibold">Data Type</th>
                      <th className="p-4 text-left font-dfaalt font-semibold">Retention Period</th>
                      <th className="p-4 text-left font-dfaalt font-semibold">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="font-montserrat">
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 text-gray-900 dark:text-white">Account Data</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Active account + 3 years</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Service provision and support</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 text-gray-900 dark:text-white">Payment Information</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">7 years</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Tax and accounting purposes</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 text-gray-900 dark:text-white">Communications</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">3 years after last contact</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Customer support and disputes</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 text-gray-900 dark:text-white">Usage Data</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">2 years</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Analytics and service improvement</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 text-gray-900 dark:text-white">Security Logs</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">1 year</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Security monitoring and incident response</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>7.2 Data Deletion</h3>
              <p>Upon request or at the end of retention periods, we will securely delete your information unless retention is required by law.</p>
            </section>

            {/* Section 8: Privacy Rights */}
            <section id="privacy-rights">
              <h2>8. Your Privacy Rights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                  <h4 className="text-primary-500 dark:text-primary-400 font-dfaalt font-semibold text-lg mb-3">
                    🌍 General Rights (All Users)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Access:</strong> Request information about data processing</li>
                    <li><strong>Correction:</strong> Update inaccurate information</li>
                    <li><strong>Deletion:</strong> Request data deletion</li>
                    <li><strong>Portability:</strong> Receive data in structured format</li>
                    <li><strong>Objection:</strong> Object to certain processing</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                  <h4 className="text-accent-600 dark:text-accent-400 font-dfaalt font-semibold text-lg mb-3">
                    🇪🇺 GDPR Rights (EU Residents)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Rectification:</strong> Correct inaccurate data</li>
                    <li><strong>Erasure:</strong> Right to be forgotten</li>
                    <li><strong>Restrict Processing:</strong> Limit data usage</li>
                    <li><strong>Data Portability:</strong> Machine-readable format</li>
                    <li><strong>Withdraw Consent:</strong> Revoke consent anytime</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                  <h4 className="text-success-600 dark:text-success-400 font-dfaalt font-semibold text-lg mb-3">
                    🇺🇸 CCPA Rights (California)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Know:</strong> What data we collect and use</li>
                    <li><strong>Delete:</strong> Request data deletion</li>
                    <li><strong>Opt-Out:</strong> Sale of personal info (we don't sell)</li>
                    <li><strong>Non-Discrimination:</strong> Equal service regardless</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
                  <h4 className="text-warning-600 dark:text-warning-400 font-dfaalt font-semibold text-lg mb-3">
                    🇨🇦 PIPEDA Rights (Canada)
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Access:</strong> Request personal information</li>
                    <li><strong>Correction:</strong> Fix inaccurate data</li>
                    <li><strong>Withdraw Consent:</strong> Revoke processing consent</li>
                    <li><strong>Complaint:</strong> File with Privacy Commissioner</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 9: International Transfers */}
            <section id="international-transfers">
              <h2>9. International Data Transfers</h2>
              
              <h3>9.1 Cross-Border Transfers</h3>
              <p>We may transfer your information to countries outside your home country. When we do so, we ensure adequate protection through:</p>
              <ul>
                <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate privacy laws</li>
                <li><strong>Standard Contractual Clauses:</strong> EU-approved contract terms</li>
                <li><strong>Privacy Shield:</strong> For certified U.S. companies (where applicable)</li>
                <li><strong>Your Consent:</strong> Where you have explicitly consented</li>
              </ul>

              <h3>9.2 Safeguards</h3>
              <p>We implement appropriate safeguards including contractual obligations and technical measures to protect your information during international transfers.</p>
            </section>

            {/* Section 10: Cookies */}
            <section id="cookies">
              <h2 className="flex items-center">
                <Cookie className="w-8 h-8 mr-3 text-warning-600" />
                10. Cookies and Tracking Technologies
              </h2>
              
              <h3>10.1 Types of Cookies</h3>
              <div className="overflow-x-auto my-8">
                <table className="w-full border-collapse bg-white dark:bg-dark-700 rounded-lg overflow-hidden shadow-lg">
                  <thead className="bg-warning-600 text-white">
                    <tr>
                      <th className="p-4 text-left font-dfaalt font-semibold">Cookie Type</th>
                      <th className="p-4 text-left font-dfaalt font-semibold">Purpose</th>
                      <th className="p-4 text-left font-dfaalt font-semibold">Examples</th>
                    </tr>
                  </thead>
                  <tbody className="font-montserrat">
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">Essential Cookies</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Required for basic functionality</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Login sessions, security tokens</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">Performance Cookies</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Help us improve our Services</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Analytics, error tracking</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">Functionality Cookies</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Remember your preferences</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Language settings, dashboard layout</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-dark-600">
                      <td className="p-4 font-semibold text-gray-900 dark:text-white">Analytics Cookies</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Understand platform usage</td>
                      <td className="p-4 text-gray-600 dark:text-gray-300">Google Analytics, user behavior</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Temporarily commented out due to JSX syntax issues
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 my-6">
                <p className="text-blue-700 dark:text-blue-300">
                  <strong>Cookie Management:</strong> You can manage cookies through your browser settings or our <a href="/cookies" className="text-blue-600 hover:text-blue-700">Cookie Preferences Center</a>. Note that disabling certain cookies may affect functionality.
                </p>
              </div>
              */}
            </section>

            {/* Section 11: Third-Party Services */}
            <section id="third-party">
              <h2>11. Third-Party Services</h2>
              
              <h3>11.1 Integration Partners</h3>
              <p>Our platform integrates with various third-party services, each governed by their own privacy policies:</p>
              <ul>
                <li><strong>Booking Platforms:</strong> Airbnb, Turo, Getaround</li>
                <li><strong>Payment Processors:</strong> Stripe, PayPal</li>
                <li><strong>Communication Tools:</strong> Twilio, SendGrid</li>
                <li><strong>Analytics Services:</strong> Google Analytics, Mixpanel</li>
              </ul>

              <div className="bg-warning-50 dark:bg-warning-900/20 border-l-4 border-warning-600 p-6 my-6">
                <p className="text-warning-700 dark:text-warning-300">
                  <strong>Third-Party Responsibility:</strong> We are not responsible for the privacy practices of third-party services. We encourage you to review their privacy policies before use.
                </p>
              </div>
            </section>

            {/* Section 12: Children's Privacy */}
            <section id="children">
              <h2>12. Children's Privacy</h2>
              <p>Our Services are not intended for children under 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will delete it immediately.</p>
            </section>

            {/* Section 13: Changes */}
            <section id="changes">
              <h2>13. Changes to This Privacy Policy</h2>
              
              <h3>13.1 Policy Updates</h3>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:</p>
              <ul>
                <li>Posting the updated policy on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices in our Services</li>
              </ul>

              <h3>13.2 Continued Use</h3>
              <p>Your continued use of our Services after any changes indicates your acceptance of the updated Privacy Policy.</p>
            </section>

            {/* Section 14: Contact Information */}
            <section id="contact">
              <h2>14. Contact Information</h2>
              <p>For questions about this Privacy Policy or to exercise your privacy rights, please contact us:</p>
            </section>

            {/* Section 15: Compliance */}
            <section id="compliance">
              <h2>15. Compliance</h2>
              <p>We are committed to compliance with applicable privacy laws including GDPR, CCPA, and PIPEDA. We regularly review and update our practices to ensure ongoing compliance.</p>
            </section>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <h2 className="font-dfaalt font-bold text-3xl text-center mb-8">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-dfaalt font-semibold text-lg mb-2">Email</h4>
              <p className="opacity-90 mb-2">For privacy inquiries</p>
              <a href="mailto:hello@exotiq.ai" className="text-white hover:text-gray-200 underline">
                hello@exotiq.ai
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-dfaalt font-semibold text-lg mb-2">Address</h4>
              <p className="opacity-90 text-sm">
                G & G Holdings MT LLC<br />
                1001 S Main St #XXX<br />
                Kalispell, MT 59901
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="font-dfaalt font-semibold text-lg mb-2">Website</h4>
              <p className="opacity-90 mb-2">Visit our main site</p>
              <a href="https://exotiq.ai" className="text-white hover:text-gray-200 underline">
                https://exotiq.ai
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <div className="bg-white dark:bg-dark-700 p-6 rounded-xl border border-gray-200 dark:border-dark-600">
            <p className="font-montserrat text-sm text-gray-600 dark:text-gray-400 mb-2">
              <strong>Last Updated:</strong> January 2025
            </p>
            <p className="font-montserrat text-sm text-gray-600 dark:text-gray-400 mb-4">
              <strong>Version:</strong> 1.0
            </p>
            <p className="font-montserrat text-xs text-gray-500 dark:text-gray-400 italic">
              This document represents our complete Privacy Policy for Exotiq.ai. By using our Services, 
              you acknowledge that you have read, understood, and agree to the practices described herein.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}