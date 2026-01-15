import React, { useState, useEffect } from 'react';
import { Cookie, Settings, Shield, BarChart3, Target, ExternalLink, Check } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { useTheme } from '../contexts/ThemeContext';

export default function CookiePolicyPage() {
  const { theme } = useTheme();

  // Force light mode for this page
  useEffect(() => {
    const originalTheme = document.documentElement.classList.contains('dark');
    document.documentElement.classList.remove('dark');
    
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

  const [showModal, setShowModal] = useState(false);

  const cookieData = [
    {
      category: 'Essential',
      icon: Shield,
      color: 'red',
      description: 'Required for basic website functionality',
      required: true,
      cookies: [
        { name: 'exotiq_session', purpose: 'Maintains your login session', duration: 'Session', provider: 'Exotiq.ai' },
        { name: 'csrf_token', purpose: 'Security protection against cross-site attacks', duration: 'Session', provider: 'Exotiq.ai' },
        { name: 'cookie_consent', purpose: 'Remembers your cookie preferences', duration: '1 year', provider: 'Exotiq.ai' }
      ]
    },
    {
      category: 'Functional',
      icon: Settings,
      color: 'primary',
      description: 'Enhanced functionality and personalization',
      required: false,
      cookies: [
        { name: 'user_preferences', purpose: 'Stores your dashboard layout and preferences', duration: '1 year', provider: 'Exotiq.ai' },
        { name: 'language_setting', purpose: 'Remembers your selected language', duration: '1 year', provider: 'Exotiq.ai' },
        { name: 'timezone_offset', purpose: 'Displays times in your local timezone', duration: '6 months', provider: 'Exotiq.ai' }
      ]
    },
    {
      category: 'Analytics',
      icon: BarChart3,
      color: 'success',
      description: 'Help us understand how visitors interact with our website',
      required: false,
      cookies: [
        { name: '_ga', purpose: 'Distinguishes unique users for analytics', duration: '2 years', provider: 'Google Analytics' },
        { name: '_ga_*', purpose: 'Stores session state for Google Analytics 4', duration: '2 years', provider: 'Google Analytics' },
        { name: 'mixpanel_*', purpose: 'Tracks user interactions and feature usage', duration: '1 year', provider: 'Mixpanel' },
        { name: 'hotjar_*', purpose: 'User behavior analysis and heatmaps', duration: '1 year', provider: 'Hotjar' }
      ]
    },
    {
      category: 'Marketing',
      icon: Target,
      color: 'warning',
      description: 'Track activity for relevant advertisements',
      required: false,
      cookies: [
        { name: '_fbp', purpose: 'Facebook pixel for ad targeting and conversion tracking', duration: '3 months', provider: 'Facebook' },
        { name: '_gcl_au', purpose: 'Google Ads conversion tracking', duration: '3 months', provider: 'Google Ads' },
        { name: 'linkedin_*', purpose: 'LinkedIn Insight Tag for B2B advertising', duration: '2 years', provider: 'LinkedIn' }
      ]
    }
  ];

  return (
    <div className="pt-16">
      <SEOHead
        title="Cookie Policy - Exotiq.ai Privacy & Data Usage"
        description="Learn about Exotiq.ai's cookie usage, manage your preferences, and understand how we protect your privacy while providing the best fleet management experience."
        keywords="Exotiq.ai cookies, privacy policy, data usage, cookie preferences, GDPR compliance, privacy controls"
        url="https://exotiq.ai/cookies"
        structuredData={breadcrumbSchema([
          { name: "Home", url: "https://exotiq.ai" },
          { name: "Cookie Policy", url: "https://exotiq.ai/cookies" }
        ])}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-xl mx-auto mb-6">
            <Cookie className="w-10 h-10" />
          </div>
          <h1 className="font-dfaalt font-bold text-5xl md:text-6xl mb-6">
            🍪 Cookie Policy
          </h1>
          <p className="font-montserrat text-xl opacity-90 mb-8">
            Exotiq.ai Cookie Usage & Privacy Controls
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="font-poppins font-bold text-sm uppercase tracking-wide px-8 py-4 bg-white text-primary-500 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2 justify-center"
            >
              <Settings className="w-5 h-5" />
              <span>🛠️ Manage Cookie Preferences</span>
            </button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="bg-gray-50 dark:bg-dark-800 p-8 rounded-2xl mb-12">
            <h2 className="font-dfaalt font-bold text-3xl text-gray-900 dark:text-white mb-6">
              About Cookies
            </h2>
            <p className="font-montserrat text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Cookies are small text files that websites store on your device to enhance your browsing experience. 
              Exotiq.ai uses cookies to provide essential functionality, improve our services, and understand how 
              you interact with our platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">Last Updated:</span>
                <span className="text-gray-600 dark:text-gray-300 ml-2">January 2025</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">Contact:</span>
                <a href="mailto:privacy@exotiq.ai" className="text-primary-500 hover:text-primary-600 ml-2">
                  privacy@exotiq.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Categories */}
      <section className="py-20 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="text-center mb-16">
            <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-6">
              Types of Cookies We Use
            </h2>
            <p className="font-montserrat text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We categorize cookies based on their purpose and give you control over optional cookies.
            </p>
          </div>

          <div className="space-y-8">
            {cookieData.map((category, index) => (
              <div key={category.category} className="bg-white dark:bg-dark-700 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-12 h-12 bg-${category.color}-100 dark:bg-${category.color}-900/30 rounded-xl`}>
                      <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white">
                        {category.category} Cookies
                      </h3>
                      <p className="font-montserrat text-gray-600 dark:text-gray-300">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {category.required ? (
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold">
                        Always Active
                      </span>
                    ) : (
                      <span className={`px-3 py-1 bg-${category.color}-100 dark:bg-${category.color}-900/30 text-${category.color}-700 dark:text-${category.color}-300 rounded-full text-sm font-semibold`}>
                        Optional
                      </span>
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-dark-600">
                        <th className="text-left py-3 font-dfaalt font-semibold text-gray-900 dark:text-white">Cookie Name</th>
                        <th className="text-left py-3 font-dfaalt font-semibold text-gray-900 dark:text-white">Purpose</th>
                        <th className="text-left py-3 font-dfaalt font-semibold text-gray-900 dark:text-white">Duration</th>
                        <th className="text-left py-3 font-dfaalt font-semibold text-gray-900 dark:text-white">Provider</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.cookies.map((cookie, cookieIndex) => (
                        <tr key={cookieIndex} className="border-b border-gray-100 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600">
                          <td className="py-4 font-mono text-sm text-gray-900 dark:text-white">{cookie.name}</td>
                          <td className="py-4 font-montserrat text-gray-600 dark:text-gray-300">{cookie.purpose}</td>
                          <td className="py-4 font-montserrat text-gray-600 dark:text-gray-300">{cookie.duration}</td>
                          <td className="py-4 font-montserrat text-gray-600 dark:text-gray-300">{cookie.provider}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-12 text-center">
            Managing Your Cookie Preferences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary-50 dark:bg-primary-900/20 p-8 rounded-2xl">
              <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white mb-4">
                Exotiq.ai Cookie Settings
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-6">
                You can manage your cookie preferences at any time using our cookie settings panel.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="font-poppins font-bold text-sm uppercase tracking-wide px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Manage Preferences</span>
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-dark-800 p-8 rounded-2xl">
              <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white mb-4">
                Browser Settings
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-4">
                You can also control cookies through your browser:
              </p>
              <ul className="space-y-2 text-sm font-montserrat text-gray-600 dark:text-gray-300">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong>Firefox:</strong> Preferences → Privacy & Security</li>
                <li><strong>Safari:</strong> Preferences → Privacy</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Services */}
      <section className="py-20 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-12 text-center">
            Third-Party Cookie Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-dark-700 p-8 rounded-2xl">
              <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white mb-6">
                Analytics Partners
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Google Analytics', privacy: 'https://policies.google.com/privacy', optout: 'https://tools.google.com/dlpage/gaoptout' },
                  { name: 'Mixpanel', privacy: 'https://mixpanel.com/legal/privacy-policy/', optout: 'https://mixpanel.com/optout/' },
                  { name: 'Hotjar', privacy: 'https://www.hotjar.com/legal/policies/privacy/', optout: 'https://www.hotjar.com/legal/compliance/opt-out' }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-600 rounded-lg">
                    <span className="font-montserrat font-semibold text-gray-900 dark:text-white">{service.name}</span>
                    <div className="flex space-x-2">
                      <a href={service.privacy} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 text-sm flex items-center space-x-1">
                        <span>Privacy</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a href={service.optout} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 text-sm flex items-center space-x-1">
                        <span>Opt-out</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-dark-700 p-8 rounded-2xl">
              <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white mb-6">
                Advertising Partners
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Facebook', privacy: 'https://www.facebook.com/privacy/explanation', optout: 'https://www.facebook.com/settings?tab=ads' },
                  { name: 'Google Ads', privacy: 'https://policies.google.com/privacy', optout: 'https://adssettings.google.com/' },
                  { name: 'LinkedIn', privacy: 'https://www.linkedin.com/legal/privacy-policy', optout: 'https://www.linkedin.com/psettings/guest-controls' }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-600 rounded-lg">
                    <span className="font-montserrat font-semibold text-gray-900 dark:text-white">{service.name}</span>
                    <div className="flex space-x-2">
                      <a href={service.privacy} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 text-sm flex items-center space-x-1">
                        <span>Privacy</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a href={service.optout} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-700 text-sm flex items-center space-x-1">
                        <span>Opt-out</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-6">
            Questions About Cookies?
          </h2>
          <p className="font-montserrat text-xl text-gray-600 dark:text-gray-300 mb-8">
            Contact us if you have questions about our cookie usage or privacy practices.
          </p>
          <div className="bg-gray-50 dark:bg-dark-800 p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-2">Email</h3>
                <a href="mailto:privacy@exotiq.ai" className="font-montserrat text-primary-500 hover:text-primary-600">
                  privacy@exotiq.ai
                </a>
              </div>
              <div>
                <h3 className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-2">Address</h3>
                <p className="font-montserrat text-gray-600 dark:text-gray-300 text-sm">
                  G & G Holdings MT LLC<br />
                  1001 S Main St #XXX<br />
                  Kalispell, MT 59901
                </p>
              </div>
              <div>
                <h3 className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-2">DPO</h3>
                <a href="mailto:dpo@exotiq.ai" className="font-montserrat text-primary-500 hover:text-primary-600">
                  dpo@exotiq.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}