import React, { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { useTheme } from '../contexts/ThemeContext';

export default function TermsAndConditionsPage() {
  const { theme } = useTheme();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <div className="pt-16">
      <SEOHead
        title="Terms and Conditions - Exotiq.ai Legal Terms"
        description="Read Exotiq.ai's terms and conditions for using our fleet management platform. Understand your rights and responsibilities when using our services."
        keywords="Exotiq.ai terms, terms and conditions, legal terms, fleet management terms, user agreement, service terms"
        url="https://exotiq.ai/terms"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://exotiq.ai" },
          { name: "Terms and Conditions", url: "https://exotiq.ai/terms" }
        ])}
      />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <h1 className="font-dfaalt font-bold text-5xl md:text-6xl mb-6">
            Terms and Conditions
          </h1>
          <p className="font-montserrat text-xl opacity-90">
            Legal terms and conditions for using Exotiq.ai services
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          {/* Document Header */}
          <div className="bg-gray-50 dark:bg-dark-800 p-6 sm:p-8 rounded-2xl mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">Effective Date:</span>
                <span className="text-gray-600 dark:text-gray-300 ml-2">January 2025</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">Legal Entity:</span>
                <span className="text-gray-600 dark:text-gray-300 ml-2">G & G Holdings MT LLC</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">Address:</span>
                <span className="text-gray-600 dark:text-gray-300 ml-2">1001 S Main St #XXX, Kalispell, MT 59901</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">Contact Email:</span>
                <a href="mailto:hello@exotiq.ai" className="text-primary-500 hover:text-primary-600 ml-2">
                  hello@exotiq.ai
                </a>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-dfaalt prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:font-montserrat prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:font-montserrat prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-a:text-primary-500 hover:prose-a:text-primary-600 prose-strong:text-gray-900 dark:prose-strong:text-white">
            
            <h2 id="introduction">1. Introduction and Acceptance</h2>
            <p>
              Welcome to Exotiq.ai, operated by G & G Holdings MT LLC ("Exotiq.ai," "Company," "we," "us," or "our"). 
              These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") 
              and G & G Holdings MT LLC governing your access to and use of our website, applications, products, and services 
              (collectively, the "Services").
            </p>
            <div className="bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 p-4 my-6">
              <p className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
                Important Notice
              </p>
              <p className="text-primary-600 dark:text-primary-300 mb-0">
                By accessing or using our Services, you acknowledge that you have read, understood, and agree to be legally 
                bound by these Terms and our Privacy Policy, which is incorporated herein by reference.
              </p>
            </div>
            <p>
              If you do not agree with these Terms, you must not access or use our Services.
            </p>

            <h2 id="eligibility">2. Eligibility and Account Requirements</h2>
            <h3>2.1 Age and Legal Capacity</h3>
            <p>
              You must be at least 18 years old and have the legal capacity to enter into contracts under applicable law. 
              By using Exotiq.ai, you represent and warrant that:
            </p>
            <ul>
              <li>You are legally able to enter into binding contracts</li>
              <li>You are not barred from using the Services under applicable law</li>
              <li>Your use of the Services does not violate any applicable laws or regulations</li>
            </ul>

            <h3>2.2 Business Use</h3>
            <p>
              If you are using the Services on behalf of a business, organization, or other entity, you represent that you 
              have the authority to bind that entity to these Terms, and "you" refers to that entity.
            </p>

            <h3>2.3 Prohibited Users</h3>
            <p>
              The Services are not available to persons who have been previously suspended or removed from the Services, 
              or to persons with whom we are prohibited from conducting business under applicable law.
            </p>

            <h2 id="services">3. Services Overview and Availability</h2>
            <h3>3.1 Service Description</h3>
            <p>
              Exotiq.ai is a comprehensive technology platform offering software-as-a-service (SaaS) tools specifically 
              designed for vehicle rental operators and hosts, including but not limited to:
            </p>
            <ul>
              <li>Host & Fleet Management Systems</li>
              <li>Direct Booking Solutions and Marketplace Integration</li>
              <li>AI-Powered Automation Tools</li>
              <li>Communication and Customer Management Dashboards</li>
              <li>Financial Analytics and Operational Intelligence</li>
              <li>Pricing Optimization and Revenue Management</li>
            </ul>

            <h3>3.2 Service Modifications</h3>
            <p>
              We reserve the right to modify, suspend, discontinue, or restrict access to any part of the Services at any time, 
              with or without notice, without liability to you or any third party. We may also impose limits on certain features 
              or restrict access to parts of the Services.
            </p>

            <h3>3.3 Service Availability</h3>
            <p>
              While we strive to provide continuous service, we do not guarantee that the Services will be available at all times. 
              Services may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.
            </p>

            <h2 id="account">4. Account Registration and Security</h2>
            <h3>4.1 Account Creation</h3>
            <p>
              To access certain features, you must register for an account by providing accurate, current, and complete information. 
              You agree to:
            </p>
            <ul>
              <li>Provide truthful and accurate registration information</li>
              <li>Maintain and update your account information</li>
              <li>Use your own identity and not impersonate others</li>
              <li>Maintain only one account unless expressly permitted</li>
            </ul>

            <h3>4.2 Account Security</h3>
            <p>You are solely responsible for:</p>
            <ul>
              <li>Maintaining the confidentiality of your login credentials</li>
              <li>All activities occurring under your account</li>
              <li>Immediately notifying us of any unauthorized use or security breach</li>
              <li>Taking reasonable steps to prevent unauthorized access</li>
            </ul>

            <h3>4.3 Account Termination</h3>
            <p>
              We may suspend or terminate your account immediately if you violate these Terms, engage in fraudulent activity, 
              or for any other reason at our sole discretion.
            </p>

            <h2 id="payments">5. Subscription Terms, Payments, and Billing</h2>
            <h3>5.1 Subscription Plans</h3>
            <p>
              Certain features require paid subscriptions. Subscription details, including pricing and billing cycles, 
              are described on our pricing page and in your account dashboard.
            </p>

            <h3>5.2 Payment Terms</h3>
            <p>By purchasing a subscription, you agree to:</p>
            <ul>
              <li>Pay all fees when due according to the billing schedule</li>
              <li>Provide valid payment information and authorize recurring charges</li>
              <li>Pay any applicable taxes unless you provide valid tax exemption documentation</li>
              <li>Be responsible for all charges incurred under your account</li>
            </ul>

            <h3>5.3 Automatic Renewal</h3>
            <p>
              Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date. 
              You may cancel your subscription at any time through your account settings or by contacting support.
            </p>

            <h3>5.4 Refunds and Cancellation</h3>
            <ul>
              <li><strong>General Policy:</strong> All sales are final unless required by applicable law</li>
              <li><strong>EU Residents:</strong> You may have a right to cancel within 14 days under EU consumer protection laws</li>
              <li><strong>Refunds:</strong> Refunds may be issued at our sole discretion or where required by law</li>
              <li><strong>Pro-rated Credits:</strong> Cancelled subscriptions may receive pro-rated credits for unused time at our discretion</li>
            </ul>

            <h3>5.5 Fee Changes</h3>
            <p>
              We may change subscription fees with at least 30 days' advance notice. Changes will not affect your current 
              billing cycle but will apply to subsequent renewals.
            </p>

            <h2 id="acceptable-use">6. Acceptable Use Policy</h2>
            <h3>6.1 Permitted Use</h3>
            <p>
              You may use the Services only for lawful purposes and in accordance with these Terms. You agree to use the 
              Services in a manner consistent with all applicable laws and regulations.
            </p>

            <h3>6.2 Prohibited Activities</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Violate any applicable federal, state, local, or international law or regulation</li>
              <li>Use the Services for any fraudulent, illegal, or unauthorized purpose</li>
              <li>Upload, transmit, or distribute malicious code, viruses, or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems or user accounts</li>
              <li>Interfere with, disrupt, or overload our servers or networks</li>
              <li>Copy, reproduce, distribute, or create derivative works from our Services</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
              <li>Use automated tools to access the Services without permission</li>
              <li>Collect user information without consent</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
            </ul>

            <h3>6.3 Content Standards</h3>
            <p>Any content you submit must:</p>
            <ul>
              <li>Be accurate and not misleading</li>
              <li>Comply with applicable laws and regulations</li>
              <li>Not infringe on intellectual property rights</li>
              <li>Not contain harmful, offensive, or inappropriate material</li>
            </ul>

            <h3>6.4 Enforcement</h3>
            <p>
              We reserve the right to investigate violations and take appropriate action, including account suspension 
              or termination, without notice.
            </p>

            <h2 id="intellectual-property">7. Intellectual Property Rights</h2>
            <h3>7.1 Our Intellectual Property</h3>
            <p>
              All intellectual property rights in and to the Services, including software, technology, content, trademarks, 
              logos, and documentation, are owned by G & G Holdings MT LLC or our licensors. These rights are protected by 
              copyright, trademark, patent, and other intellectual property laws.
            </p>

            <h3>7.2 Limited License</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable, revocable license to use the Services solely for 
              your internal business purposes in accordance with these Terms.
            </p>

            <h3>7.3 User Content</h3>
            <p>
              You retain ownership of content you submit to the Services. By submitting content, you grant us a worldwide, 
              royalty-free, sublicensable license to use, modify, reproduce, and distribute such content solely to provide 
              the Services.
            </p>

            <h3>7.4 Feedback</h3>
            <p>
              Any feedback, suggestions, or improvements you provide may be used by us without compensation or attribution.
            </p>

            <h2 id="privacy">8. Data Privacy and International Compliance</h2>
            <h3>8.1 Privacy Policy</h3>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, 
              and protect your information.
            </p>

            <h3>8.2 GDPR Compliance (EU Residents)</h3>
            <p>For users in the European Union, we comply with the General Data Protection Regulation (GDPR):</p>
            <ul>
              <li>We process your data lawfully, fairly, and transparently</li>
              <li>You have rights including access, rectification, erasure, data portability, and objection</li>
              <li>We maintain appropriate security measures and Data Processing Agreements with processors</li>
              <li>You may withdraw consent at any time where processing is based on consent</li>
              <li>We will respond to data subject requests within 30 days</li>
            </ul>

            <h3>8.3 PIPEDA Compliance (Canadian Residents)</h3>
            <p>For Canadian residents, we comply with the Personal Information Protection and Electronic Documents Act (PIPEDA):</p>
            <ul>
              <li>We collect personal information only for identified purposes</li>
              <li>We obtain consent before collecting, using, or disclosing personal information</li>
              <li>You may access your personal information and request corrections</li>
              <li>We maintain appropriate safeguards for personal information</li>
            </ul>

            <h3>8.4 Data Rights Exercise</h3>
            <p>To exercise your privacy rights, contact us at: <a href="mailto:hello@exotiq.ai">hello@exotiq.ai</a></p>

            <h2 id="disclaimers">11. Disclaimers and Warranties</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-6">
              <h3 className="text-yellow-800 dark:text-yellow-200 mt-0">11.1 Service Disclaimer</h3>
              <p className="text-yellow-700 dark:text-yellow-300 mb-0">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. 
                WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                NON-INFRINGEMENT, AND TITLE.
              </p>
            </div>

            <h3>11.2 No Guarantees</h3>
            <p>We do not guarantee that:</p>
            <ul>
              <li>The Services will be uninterrupted, timely, secure, or error-free</li>
              <li>Results or data will be accurate, reliable, or complete</li>
              <li>Defects will be corrected</li>
              <li>The Services will meet your requirements</li>
            </ul>

            <h2 id="limitation">12. Limitation of Liability</h2>
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 my-6">
              <h3 className="text-red-800 dark:text-red-200 mt-0">12.1 Liability Limitations</h3>
              <p className="text-red-700 dark:text-red-300 mb-0">
                TO THE FULLEST EXTENT PERMITTED BY LAW, G & G HOLDINGS MT LLC SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, LOST PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES.
              </p>
            </div>

            <h3>12.2 Damage Cap</h3>
            <p>
              OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE SIX (6) MONTHS 
              PRECEDING THE CLAIM.
            </p>

            <h2 id="governing-law">15. Governing Law and Jurisdiction</h2>
            <h3>15.1 Applicable Law</h3>
            <p>
              These Terms are governed by the laws of the State of Montana, United States, without regard to its 
              conflict of law provisions.
            </p>

            <h3>15.2 Jurisdiction</h3>
            <p>
              Subject to the arbitration provisions above, any legal proceedings shall be brought in the state or 
              federal courts located in Flathead County, Montana.
            </p>

            <h2 id="contact">18. Contact Information</h2>
            <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-xl">
              <p className="font-semibold text-primary-800 dark:text-primary-200 mb-4">
                For questions about these Terms or our Services, please contact us:
              </p>
              <div className="space-y-2 text-primary-600 dark:text-primary-300">
                <p><strong>G & G Holdings MT LLC</strong></p>
                <p>1001 S Main St #XXX<br />Kalispell, MT 59901</p>
                <p>📧 Email: <a href="mailto:hello@exotiq.ai" className="text-primary-500 hover:text-primary-600">hello@exotiq.ai</a></p>
                <p>🌐 Website: <a href="https://exotiq.ai" className="text-primary-500 hover:text-primary-600">https://exotiq.ai</a></p>
              </div>
            </div>

            <hr className="my-8" />
            
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p><strong>Last Updated:</strong> January 2025</p>
              <p><strong>Version:</strong> 1.0</p>
              <p className="mt-4 italic">
                This document represents the complete Terms and Conditions for Exotiq.ai. By using our Services, 
                you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}