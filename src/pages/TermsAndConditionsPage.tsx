import React, { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { useTheme } from '../contexts/ThemeContext';

export default function TermsAndConditionsPage() {
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
        title="Website Terms of Use - Exotiq Inc."
        description="Terms governing access to exotiq.ai and driveexotiq.com. Read Exotiq's website terms of use, intellectual property rights, disclaimers, and dispute resolution."
        keywords="Exotiq terms of use, website terms, legal terms, exotiq.ai terms, driveexotiq terms"
        url="https://exotiq.ai/terms"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://exotiq.ai" },
          { name: "Terms of Use", url: "https://exotiq.ai/terms" }
        ])}
      />

      <section className="py-16 bg-gradient-to-br from-primary-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <div className="font-montserrat text-sm opacity-80 mb-4 tracking-wide uppercase">Exotiq Inc. — a Delaware C-Corporation</div>
          <h1 className="font-dfaalt font-bold text-4xl md:text-5xl mb-4">Website Terms of Use</h1>
          <p className="font-montserrat text-lg opacity-90">Terms Governing Access to exotiq.ai and Related Websites</p>
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

            <p>These Website Terms of Use govern your access to exotiq.ai and driveexotiq.com (collectively, the &quot;Websites&quot;). These do not govern the Exotiq Command Center (app.exotiq.ai), which has separate <a href="/terms">Terms and Conditions</a>.</p>

            <h2>Article I: Informational Content Disclaimer</h2>
            <p>Content on the Websites, including product descriptions, pricing, and availability, is for general informational purposes only. Nothing constitutes a binding offer. Performance and ROI claims are illustrative, not guarantees. AI feature descriptions represent current or planned functionality. Third-party references are for context only.</p>

            <h2>Article II: Intellectual Property</h2>
            <p>All Website content is property of Exotiq Inc. Trademarks include: Exotiq, Exotiq AI, Command Center, MotorIQ, Pulse, Margin, FleetCopilot, Vault, Rari, and Drive Exotiq. You may not reproduce, distribute, scrape, or create derivative works from Website content.</p>

            <h2>Article III: User Conduct</h2>
            <p>You agree not to: use the Websites unlawfully; gain unauthorized access; introduce malicious code; interfere with performance; transmit spam; impersonate others; or collect personal information without consent.</p>

            <h2>Article IV: Disclaimers</h2>
            <p className="uppercase text-sm font-semibold tracking-wide">THE WEBSITES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. EXOTIQ DISCLAIMS ALL WARRANTIES INCLUDING MERCHANTABILITY, FITNESS FOR PURPOSE, AND NON-INFRINGEMENT.</p>

            <h2>Article V: Limitation of Liability</h2>
            <p className="uppercase text-sm font-semibold tracking-wide">EXOTIQ&apos;S TOTAL LIABILITY SHALL NOT EXCEED ONE HUNDRED DOLLARS ($100). IN NO EVENT SHALL EXOTIQ BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</p>

            <h2>Article VI: Dispute Resolution</h2>
            <p>Governed by Delaware law. Disputes resolved by binding arbitration under AAA Commercial Arbitration Rules.</p>
            <p className="uppercase text-sm font-semibold tracking-wide">CLASS ACTION WAIVER: CLAIMS MAY ONLY BE BROUGHT IN INDIVIDUAL CAPACITY.</p>

            <h2>Contact</h2>
            <p><strong>Email:</strong> <a href="mailto:legal@exotiq.ai" className="text-primary-500 hover:text-primary-600">legal@exotiq.ai</a></p>
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
