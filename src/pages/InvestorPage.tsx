import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Calendar,
  Download,
  Lock,
  Unlock,
  BarChart3,
  PieChart,
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Zap,
  Mail,
  Building,
  Clock,
  Award,
  FileText,
  ExternalLink,
  Phone
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import SMSConsentCheckboxes from '../components/SMSConsentCheckboxes';
import { organizationSchema, breadcrumbSchema } from '../data/structuredData';
import { buildSmsConsentFields } from '../types/smsConsent';
import logger from '../utils/logger';

interface InvestorFormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phone?: string;
  investmentAmountRange: string;
  investmentType: string;
  industryExperience: string;
  investmentTimeline: string;
  contactPreference: string;
  additionalNotes?: string;
  smsConsentTransactional: boolean;
  smsConsentMarketing: boolean;
}

function humanizeInvestorSubmitError(message: string): string {
  if (/23505|duplicate key|already exists|investor_contacts_email_key/i.test(message)) {
    return 'We already have your email on file from a previous submission. If you need to update your information, reply to any Exotiq email or contact hello@exotiq.ai.';
  }
  return message;
}

export default function InvestorPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showDataRoomPopup, setShowDataRoomPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState<InvestorFormData>({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    phone: '',
    investmentAmountRange: '',
    investmentType: '',
    industryExperience: '',
    investmentTimeline: '',
    contactPreference: '',
    additionalNotes: '',
    smsConsentTransactional: false,
    smsConsentMarketing: false,
  });

  useEffect(() => {
    const p = formData.phone?.trim() ?? '';
    if (!p && (formData.smsConsentTransactional || formData.smsConsentMarketing)) {
      setFormData((prev) => ({
        ...prev,
        smsConsentTransactional: false,
        smsConsentMarketing: false,
      }));
    }
  }, [formData.phone, formData.smsConsentTransactional, formData.smsConsentMarketing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSmsConsentChange = (
    field: 'smsConsentTransactional' | 'smsConsentMarketing',
    value: boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Split full name into first and last name
      const nameParts = formData.firstName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const phoneTrim = formData.phone?.trim() ?? '';
      const submissionData = {
        firstName,
        lastName,
        email: formData.email,
        companyName: formData.companyName,
        investmentAmountRange: formData.investmentAmountRange,
        investmentType: formData.investmentType,
        investmentTimeline: formData.investmentTimeline,
        additionalNotes: formData.additionalNotes,
        source: 'website',
        ...(phoneTrim
          ? {
              phone: phoneTrim,
              ...buildSmsConsentFields(
                formData.phone,
                formData.smsConsentTransactional,
                formData.smsConsentMarketing
              ),
            }
          : {}),
      };

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error('Supabase configuration missing');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/handle-investor-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(submissionData)
      });

      const text = await response.text();
      let result: { success?: boolean; error?: string; investorId?: string } = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(text || `Request failed (${response.status})`);
      }

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit investor form');
      }

      logger.info('Investor submission successful', { investorId: result.investorId });
      setEmailSent(true);

      // Simulate email verification after 3 seconds (for demo purposes)
      setTimeout(() => {
        setIsUnlocked(true);
      }, 3000);

    } catch (error) {
      logger.error('Investor submission error', { error });
      const raw = error instanceof Error ? error.message : 'An error occurred while submitting the form';
      setSubmitError(humanizeInvestorSubmitError(raw));
    } finally {
      setIsSubmitting(false);
    }
  };

  const simulateEmailVerification = () => {
    setIsUnlocked(true);
  };

  const handleDataRoomRequest = () => {
    setShowDataRoomPopup(true);
  };

  const closeDataRoomPopup = () => {
    setShowDataRoomPopup(false);
  };

  // Data Room Popup
  if (showDataRoomPopup) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 max-w-md mx-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-accent-600 rounded-full mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white mb-4">
            Thank You!
          </h3>
          <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-8">
            Thank you from the Exotiq team, we'll be in touch to schedule your access to Exotiq's Data Room.
          </p>
          <button
            onClick={closeDataRoomPopup}
            className="font-poppins font-bold text-sm uppercase tracking-wide px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="pt-16">
        <SEOHead
          title="Investor Portal - Exotiq.ai Investment Opportunity"
          description="Access Exotiq.ai's investor materials including pitch deck, financial projections, and market analysis. $1.5M raise to capture the $2.8B car sharing market opportunity."
          keywords="Exotiq.ai investment, fleet management startup, automotive SaaS investment, car sharing market, venture capital opportunity"
          url="https://exotiq.ai/investors"
          noindex={true}
          structuredData={[
            organizationSchema,
            breadcrumbSchema([
              { name: "Home", url: "https://exotiq.ai" },
              { name: "Investors", url: "https://exotiq.ai/investors" }
            ])
          ]}
        />

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-dark-900 to-dark-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-accent-600 rounded-xl mx-auto mb-6">
              <Building className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-dfaalt font-bold text-5xl md:text-6xl mb-6">
              Investor Portal
            </h1>
            <p className="font-montserrat text-xl text-gray-300 mb-8">
              Access detailed financials, market analysis, and investment opportunities in the future of fleet management.
            </p>
            <div className="flex items-center justify-center space-x-2 text-accent-400 mb-8">
              <Lock className="w-5 h-5" />
              <span className="font-montserrat">Qualified Investors Only</span>
            </div>
          </div>
        </section>

        {/* Executive Summary - Simplified */}
        <section className="py-20 bg-gray-50 dark:bg-dark-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
            <div className="text-center mb-12">
              <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-6">
                Why Exotiq
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-dark-700 p-8 rounded-xl border-l-4 border-primary-500">
                <h3 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white mb-3">
                  Real Traction
                </h3>
                <p className="font-montserrat text-lg text-gray-700 dark:text-gray-200">
                  20+ operators already using the platform. $12K MRR from beta customers. 85% activation rate, nearly 3x industry average.
                </p>
              </div>

              <div className="bg-white dark:bg-dark-700 p-8 rounded-xl border-l-4 border-accent-600">
                <h3 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white mb-3">
                  Proven ROI
                </h3>
                <p className="font-montserrat text-lg text-gray-700 dark:text-gray-200">
                  Operators save 15+ hours per week and increase revenue by 15-25% through automated pricing and operations.
                </p>
              </div>

              <div className="bg-white dark:bg-dark-700 p-8 rounded-xl border-l-4 border-success-600">
                <h3 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white mb-3">
                  Built Different
                </h3>
                <p className="font-montserrat text-lg text-gray-700 dark:text-gray-200">
                  Founded by former Turo hosts who scaled from 2 to 30 vehicles. We've lived the pain and built the solution.
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-dark-700 p-6 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-2">
                  Early Traction & Validation
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-white">📊 85% beta signup → activation rate</span>
                    <span className="text-gray-600 dark:text-gray-400">(vs. industry average of 30%)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-white">🤝 Signed agreements</span>
                    <span className="text-gray-600 dark:text-gray-400">with Arizona rental operators managing 250-vehicle fleet</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-white">$12K MRR</span>
                    <span className="text-gray-600 dark:text-gray-400">from first 20 beta customers (pre-official launch)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-white">⭐ 4.8/5.0</span>
                    <span className="text-gray-600 dark:text-gray-400">average satisfaction score from beta users</span>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-700 p-6 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-success-600 rounded-lg mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-2">
                  Guaranteed ROI Model
                </h3>
                <p className="font-montserrat text-gray-600 dark:text-gray-300">
                  25% savings on platform fees plus 15-25% maintenance cost reduction equals immediate value proposition.
                </p>
              </div>
              <div className="bg-white dark:bg-dark-700 p-6 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-accent-600 rounded-lg mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-2">
                  Purpose-Built Competitive Moat
                </h3>
                <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-3">
                  While generic fleet management tools exist, none are purpose-built for P2P hosts' unique challenges: multi-platform management, peer-to-peer insurance compliance, and hyperlocal market pricing. Our founder insight + proprietary data network = 2-3 year head start on competition.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-success-600 mt-0.5 flex-shrink-0" />
                    <span>Built by former Turo Power Hosts who lived the pain</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-success-600 mt-0.5 flex-shrink-0" />
                    <span>Proprietary pricing algorithm trained on 10,000+ P2P bookings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-success-600 mt-0.5 flex-shrink-0" />
                    <span>Only platform with native Turo/Getaround/HyreCar integrations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-success-600 mt-0.5 flex-shrink-0" />
                    <span>Network effects: More hosts = better AI predictions for everyone</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="font-montserrat text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
                Want to see the full pitch deck and financial projections? Request access below.
              </p>
              <a
                href="https://deck.exotiq.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-poppins font-bold text-sm uppercase tracking-wide px-8 py-4 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-all duration-200 hover:scale-105 space-x-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Full Deck</span>
              </a>
            </div>
          </div>
        </section>

        {/* Business Model Clarity Section */}
        <section className="py-20 bg-gray-50 dark:bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
            <div className="text-center mb-12">
              <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-4">
                Revenue Model & Unit Economics
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Column 1: Traditional Fleet Operators */}
              <div className="bg-white dark:bg-dark-700 p-8 rounded-xl">
                <h3 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white mb-4">
                  For Traditional Fleet Operators
                </h3>
                <h4 className="font-dfaalt font-semibold text-xl text-primary-500 dark:text-primary-400 mb-3">
                  Pure SaaS Business Model
                </h4>
                <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-4">
                  Operators pay $49-$199/mo subscription based on fleet size.
                </p>
                <p className="font-montserrat text-gray-600 dark:text-gray-300">
                  We don't take booking commissions - operators keep 100% of rental revenue.
                </p>
                <p className="font-montserrat text-gray-600 dark:text-gray-300 mt-4 font-semibold">
                  This aligns our incentives: we win when they grow.
                </p>
              </div>

              {/* Column 2: P2P Hosts */}
              <div className="bg-white dark:bg-dark-700 p-8 rounded-xl">
                <h3 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white mb-4">
                  For P2P Hosts
                </h3>
                <h4 className="font-dfaalt font-semibold text-xl text-accent-600 dark:text-accent-400 mb-3">
                  Hybrid SaaS + Transaction Model
                </h4>
                <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-4">
                  Low monthly SaaS fee + 2% transaction fee on direct bookings.
                </p>
                <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-4">
                  (Compare to Turo's 25-35% platform fees)
                </p>
                <p className="font-montserrat text-gray-600 dark:text-gray-300 font-semibold">
                  Projected blended ARPU: $475/month at scale.
                </p>
              </div>
            </div>

            {/* Key Metrics Box */}
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-8">
              <h3 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white mb-6 text-center">
                Unit Economics at Scale
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                <div>
                  <div className="text-2xl font-dfaalt font-bold text-primary-500 dark:text-primary-400 mb-2">$450</div>
                  <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">CAC</div>
                </div>
                <div>
                  <div className="text-2xl font-dfaalt font-bold text-primary-500 dark:text-primary-400 mb-2">$8,500</div>
                  <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">LTV</div>
                </div>
                <div>
                  <div className="text-2xl font-dfaalt font-bold text-success-600 dark:text-success-400 mb-2">18.9:1</div>
                  <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">LTV:CAC</div>
                </div>
                <div>
                  <div className="text-2xl font-dfaalt font-bold text-success-600 dark:text-success-400 mb-2">87%</div>
                  <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">Gross Margin</div>
                </div>
                <div>
                  <div className="text-2xl font-dfaalt font-bold text-success-600 dark:text-success-400 mb-2">&lt;3%</div>
                  <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">Monthly Churn</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Go-to-Market Strategy Section */}
        <section className="py-20 bg-white dark:bg-dark-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
            <div className="text-center mb-12">
              <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-4">
                Path to 100K Hosts: Our 4-Phase Growth Plan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Phase 1 */}
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 p-6 rounded-xl border border-primary-200 dark:border-primary-800">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white">Phase 1 (2024-Q4)</h3>
                </div>
                <p className="font-dfaalt font-semibold text-gray-900 dark:text-white mb-3">Validate & Refine</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• 100 beta hosts across 5 major markets</li>
                  <li>• Validate product-market fit</li>
                  <li>• Refine core modules based on user feedback</li>
                  <li>• Achieve $15K MRR</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="bg-gradient-to-br from-accent-50 to-success-50 dark:from-accent-900/20 dark:to-success-900/20 p-6 rounded-xl border border-accent-200 dark:border-accent-800">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-accent-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white">Phase 2 (2025)</h3>
                </div>
                <p className="font-dfaalt font-semibold text-gray-900 dark:text-white mb-3">Community-Led Growth</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• 1,000 hosts via Turo Power Host community</li>
                  <li>• Launch host referral program (20% revenue share for 12 months)</li>
                  <li>• Content marketing: SEO-optimized guides</li>
                  <li>• Target: $125K MRR</li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="bg-gradient-to-br from-success-50 to-warning-50 dark:from-success-900/20 dark:to-warning-900/20 p-6 rounded-xl border border-success-200 dark:border-success-800">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-success-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white">Phase 3 (2026)</h3>
                </div>
                <p className="font-dfaalt font-semibold text-gray-900 dark:text-white mb-3">Strategic Partnerships</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• 10,000 hosts through insurance provider partnerships</li>
                  <li>• White-label solution for rental associations</li>
                  <li>• Expand to traditional independent rental operators</li>
                  <li>• Target: $1.2M MRR</li>
                </ul>
              </div>

              {/* Phase 4 */}
              <div className="bg-gradient-to-br from-warning-50 to-primary-50 dark:from-warning-900/20 dark:to-primary-900/20 p-6 rounded-xl border border-warning-200 dark:border-warning-800">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-warning-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <h3 className="font-dfaalt font-bold text-xl text-gray-900 dark:text-white">Phase 4 (2027+)</h3>
                </div>
                <p className="font-dfaalt font-semibold text-gray-900 dark:text-white mb-3">Market Expansion</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• International expansion (Canada, UK, Australia)</li>
                  <li>• Enterprise solution for traditional rental agencies</li>
                  <li>• Strategic acquisition targets for faster market penetration</li>
                  <li>• Target: $5M+ MRR</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Access Form */}
        <section className="py-20 bg-white dark:bg-dark-900">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
            {!emailSent ? (
              <div className="bg-gray-50 dark:bg-dark-800 p-8 rounded-2xl">
                <h2 className="font-dfaalt font-bold text-3xl text-gray-900 dark:text-white mb-6 text-center">
                  Investor Qualification
                </h2>
                <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-8 text-center">
                  Please provide your information to access our investor materials.
                  You'll receive an email verification link to unlock the portal.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4" autoComplete="on">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-1.5 text-sm">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        autoComplete="name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-base disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-1.5 text-sm">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-base disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="companyName" className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-1.5 text-sm">
                      Company/Fund Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      autoComplete="organization"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Acme Ventures"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-base disabled:opacity-50"
                    />
                  </div>

                  {/* Investment Range & Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="investmentAmountRange" className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-1.5 text-sm">
                        Investment Range *
                      </label>
                      <select
                        id="investmentAmountRange"
                        name="investmentAmountRange"
                        value={formData.investmentAmountRange}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-base disabled:opacity-50"
                      >
                        <option value="">Select range</option>
                        <option value="25k-100k">$25K - $100K</option>
                        <option value="100k-500k">$100K - $500K</option>
                        <option value="500k-1m">$500K - $1M</option>
                        <option value="1m+">$1M+</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="investmentType" className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-1.5 text-sm">
                        Investor Type *
                      </label>
                      <select
                        id="investmentType"
                        name="investmentType"
                        value={formData.investmentType}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-base disabled:opacity-50"
                      >
                        <option value="">Select type</option>
                        <option value="angel">Angel Investor</option>
                        <option value="vc">VC Fund</option>
                        <option value="family-office">Family Office</option>
                        <option value="strategic">Strategic Investor</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Timeline & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="investmentTimeline" className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-1.5 text-sm">
                        Investment Timeline *
                      </label>
                      <select
                        id="investmentTimeline"
                        name="investmentTimeline"
                        value={formData.investmentTimeline}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-base disabled:opacity-50"
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Ready to invest now</option>
                        <option value="30-days">Within 30 days</option>
                        <option value="90-days">Within 90 days</option>
                        <option value="exploring">Currently exploring</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-1.5 text-sm">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-base disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <SMSConsentCheckboxes
                    visible={(formData.phone ?? '').trim() !== ''}
                    smsTransactional={formData.smsConsentTransactional}
                    smsMarketing={formData.smsConsentMarketing}
                    onChange={handleSmsConsentChange}
                    disabled={isSubmitting}
                  />

                  <div>
                    <label className="block font-montserrat font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 disabled:opacity-50"
                      placeholder="Any additional information about your investment interest..."
                    />
                  </div>

                  {submitError && (
                    <div role="alert" className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <p className="text-red-600 dark:text-red-400 text-sm">{submitError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-poppins font-bold text-sm uppercase tracking-wide px-8 py-4 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-400 text-white rounded-lg transition-all duration-200 hover:scale-105 disabled:scale-100 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span>Send Verification Email</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-accent-50 dark:bg-accent-900/20 p-8 rounded-2xl text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-accent-600 rounded-full mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-dfaalt font-bold text-2xl text-gray-900 dark:text-white mb-4">
                  Verification Email Sent
                </h2>
                <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-6">
                  We've sent a verification link to <strong>{formData.email}</strong>.
                  Please check your email and click the link to access the investor portal.
                </p>
                <button
                  onClick={simulateEmailVerification}
                  className="font-poppins font-bold text-sm uppercase tracking-wide px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors"
                >
                  Simulate Email Verification (Demo)
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Unlocked Investor Portal Content
  return (
    <div className="pt-16">
      {/* Welcome Header */}
      <section className="py-12 bg-gradient-to-br from-accent-600 to-accent-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Unlock className="w-6 h-6 text-accent-200" />
                <span className="font-montserrat text-accent-200">Verified Investor Portal</span>
              </div>
              <h1 className="font-dfaalt font-bold text-4xl mb-2">
                Welcome, {formData.firstName} {formData.lastName}
              </h1>
              <p className="font-montserrat text-accent-100">
                {formData.companyName} • {formData.investmentType}
              </p>
            </div>
            <div className="text-right">
              <div className="font-montserrat text-sm text-accent-200 mb-1">Last Updated</div>
              <div className="font-montserrat font-semibold">January 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="text-center mb-12">
            <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-4">
              Investment Opportunity
            </h2>
            <p className="font-montserrat text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Exotiq is raising $1.5M to build the future of fleet management and capture a $500M+ market opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-dfaalt font-bold text-accent-600 mb-2">$1.5M</div>
              <div className="font-montserrat text-gray-600 dark:text-gray-400">Raising</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-dfaalt font-bold text-accent-600 mb-2">$2.8B</div>
              <div className="font-montserrat text-gray-600 dark:text-gray-400">Market by 2027</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-dfaalt font-bold text-accent-600 mb-2">40%</div>
              <div className="font-montserrat text-gray-600 dark:text-gray-400">YoY Growth</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-dfaalt font-bold text-accent-600 mb-2">100K+</div>
              <div className="font-montserrat text-gray-600 dark:text-gray-400">Target Hosts</div>
            </div>
          </div>

          {/* Key Investment Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-2">
                Proven Market Need
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300">
                Built by former Turo hosts who experienced the pain firsthand. 20+ beta signups before product launch.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-success-600 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-2">
                Guaranteed ROI Model
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300">
                25% savings on platform fees plus 15 to 25% maintenance cost reduction equals immediate value proposition.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-800 p-6 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-accent-600 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-2">
                First-Mover Advantage
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300">
                No direct competitors in car-sharing specific fleet management. Capturing market before incumbents adapt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Projections */}
      <section className="py-16 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-12 text-center">
            Financial Projections
          </h2>

          {/* Revenue Model */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="font-dfaalt font-semibold text-2xl text-gray-900 dark:text-white mb-6">
                SaaS Pricing Tiers
              </h3>
              <div className="space-y-4">
                <div className="bg-white dark:bg-dark-700 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-dfaalt font-semibold text-gray-900 dark:text-white">Starter</div>
                    <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">Up to 5 vehicles</div>
                  </div>
                  <div className="font-dfaalt font-bold text-xl text-primary-500">$49/mo</div>
                </div>
                <div className="bg-white dark:bg-dark-700 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-dfaalt font-semibold text-gray-900 dark:text-white">Growth</div>
                    <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">Up to 20 vehicles</div>
                  </div>
                  <div className="font-dfaalt font-bold text-xl text-accent-600">$99/mo</div>
                </div>
                <div className="bg-white dark:bg-dark-700 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-dfaalt font-semibold text-gray-900 dark:text-white">Scale</div>
                    <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">Up to 50 vehicles</div>
                  </div>
                  <div className="font-dfaalt font-bold text-xl text-success-600">$199/mo</div>
                </div>
                <div className="bg-white dark:bg-dark-700 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-dfaalt font-semibold text-gray-900 dark:text-white">Enterprise</div>
                    <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">50+ vehicles</div>
                  </div>
                  <div className="font-dfaalt font-bold text-xl text-warning-600">Custom</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-dfaalt font-semibold text-2xl text-gray-900 dark:text-white mb-6">
                Revenue Streams
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                  <div>
                    <div className="font-montserrat font-medium text-gray-900 dark:text-white">SaaS Subscriptions (70%)</div>
                    <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">Monthly recurring revenue</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-accent-600 rounded-full"></div>
                  <div>
                    <div className="font-montserrat font-medium text-gray-900 dark:text-white">Transaction Fees (20%)</div>
                    <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">2% on direct bookings</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-success-600 rounded-full"></div>
                  <div>
                    <div className="font-montserrat font-medium text-gray-900 dark:text-white">Merchant Services (7%)</div>
                    <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">Payment processing</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-warning-600 rounded-full"></div>
                  <div>
                    <div className="font-montserrat font-medium text-gray-900 dark:text-white">Premium Add-ons (3%)</div>
                    <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">Book, Pulse, Vault modules</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Projections */}
          <div className="bg-white dark:bg-dark-700 p-8 rounded-2xl">
            <h3 className="font-dfaalt font-semibold text-2xl text-gray-900 dark:text-white mb-6 text-center">
              3-Year Growth Projection
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-600">
                    <th className="font-dfaalt font-semibold text-left py-3 text-gray-900 dark:text-white">Metric</th>
                    <th className="font-dfaalt font-semibold text-center py-3 text-gray-900 dark:text-white">Year 1</th>
                    <th className="font-dfaalt font-semibold text-center py-3 text-gray-900 dark:text-white">Year 2</th>
                    <th className="font-dfaalt font-semibold text-center py-3 text-gray-900 dark:text-white">Year 3</th>
                  </tr>
                </thead>
                <tbody className="font-montserrat">
                  <tr className="border-b border-gray-100 dark:border-dark-600">
                    <td className="py-3 text-gray-900 dark:text-white">Active Customers</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">50</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">250</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">500</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-dark-600">
                    <td className="py-3 text-gray-900 dark:text-white">Monthly Revenue</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">$4,500</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">$22,500</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">$45,000</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-dark-600">
                    <td className="py-3 text-gray-900 dark:text-white">Annual Revenue</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">$54K</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">$270K</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">$540K</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-900 dark:text-white">Gross Margin</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">45%</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">65%</td>
                    <td className="py-3 text-center text-gray-600 dark:text-gray-300">70%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-12 text-center">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { name: 'Gregory Ringler', role: 'Founder & CEO', icon: Users },
              { name: 'Scott Wollaston', role: 'CFO', icon: BarChart3 },
              { name: 'Mike Looney', role: 'CMO', icon: Target },
              { name: 'Didi Patel', role: 'Lead Developer', icon: Zap },
              { name: 'Sarah Jane', role: 'Marketing Manager', icon: TrendingUp }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gray-200 dark:bg-dark-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <member.icon className="w-8 h-8 text-gray-400" />
                </div>
                <div className="font-dfaalt font-semibold text-lg text-gray-900 dark:text-white mb-1">
                  {member.name}
                </div>
                <div className="font-montserrat text-sm text-gray-600 dark:text-gray-400">
                  {member.role}
                </div>
              </div>
            ))}
          </div>
          <p className="font-montserrat text-center text-gray-500 dark:text-gray-400 mt-8">
            Detailed team bios and credentials available in pitch deck
          </p>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section className="py-16 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20">
          <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-12 text-center">
            Competitive Advantage
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-dark-700 rounded-2xl overflow-hidden">
              <thead className="bg-accent-600 text-white">
                <tr>
                  <th className="font-dfaalt font-semibold text-left p-6">Feature</th>
                  <th className="font-dfaalt font-semibold text-center p-6">Exotiq</th>
                  <th className="font-dfaalt font-semibold text-center p-6">Generic Fleet Tools</th>
                  <th className="font-dfaalt font-semibold text-center p-6">Spreadsheets</th>
                </tr>
              </thead>
              <tbody className="font-montserrat">
                <tr className="border-b border-gray-200 dark:border-dark-600">
                  <td className="p-6 font-medium text-gray-900 dark:text-white">Car-sharing Platform Integration</td>
                  <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-success-600 mx-auto" /></td>
                  <td className="p-6 text-center text-gray-400">Limited</td>
                  <td className="p-6 text-center text-gray-400">Manual</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-800">
                  <td className="p-6 font-medium text-gray-900 dark:text-white">AI-Powered Pricing</td>
                  <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-success-600 mx-auto" /></td>
                  <td className="p-6 text-center text-gray-400">Basic</td>
                  <td className="p-6 text-center text-gray-400">None</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-dark-600">
                  <td className="p-6 font-medium text-gray-900 dark:text-white">Host-Specific Analytics</td>
                  <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-success-600 mx-auto" /></td>
                  <td className="p-6 text-center text-gray-400">Generic</td>
                  <td className="p-6 text-center text-gray-400">None</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-800">
                  <td className="p-6 font-medium text-gray-900 dark:text-white">Direct Booking Tools</td>
                  <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-success-600 mx-auto" /></td>
                  <td className="p-6 text-center text-gray-400">None</td>
                  <td className="p-6 text-center text-gray-400">None</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-dark-600">
                  <td className="p-6 font-medium text-gray-900 dark:text-white">Built by Former Hosts</td>
                  <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-success-600 mx-auto" /></td>
                  <td className="p-6 text-center text-gray-400">No</td>
                  <td className="p-6 text-center text-gray-400">No</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-dark-800">
                  <td className="p-6 font-medium text-gray-900 dark:text-white">Guaranteed ROI</td>
                  <td className="p-6 text-center"><CheckCircle className="w-6 h-6 text-success-600 mx-auto" /></td>
                  <td className="p-6 text-center text-gray-400">No</td>
                  <td className="p-6 text-center text-gray-400">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pitch Deck Section */}
      <section className="py-16 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <h2 className="font-dfaalt font-bold text-4xl text-gray-900 dark:text-white mb-6">
            Pitch Deck & Materials
          </h2>
          <p className="font-montserrat text-lg text-gray-600 dark:text-gray-300 mb-12">
            Access our complete investor materials including detailed financial projections,
            market analysis, and product roadmap.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-dark-800 p-8 rounded-xl">
              <div className="flex items-center justify-center w-16 h-16 bg-accent-600 rounded-xl mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-4">
                Investor Pitch Deck
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-6">
                Complete 15-slide presentation covering market opportunity, product demo,
                financial projections, and team credentials.
              </p>
              <button
                onClick={() => window.open('https://invest.exotiq.ai/expanded', '_blank')}
                className="font-poppins font-bold text-sm uppercase tracking-wide px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors flex items-center space-x-2 mx-auto"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
              <p className="font-montserrat text-xs text-gray-500 dark:text-gray-400 mt-2">
                Available when ready
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-dark-800 p-8 rounded-xl">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-xl mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-4">
                Financial Model
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-6">
                Detailed 5-year financial projections including revenue forecasts,
                unit economics, and sensitivity analysis.
              </p>
              <button
                className="font-poppins font-bold text-sm uppercase tracking-wide px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors flex items-center space-x-2 mx-auto"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Data Room Request</span>
              </button>
              <p className="font-montserrat text-xs text-gray-500 dark:text-gray-400 mt-2">
                Google Sheets access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-gradient-to-br from-accent-600 to-accent-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 text-center">
          <h2 className="font-dfaalt font-bold text-4xl mb-6">
            Ready to Invest?
          </h2>
          <p className="font-montserrat text-xl mb-8 opacity-90">
            Join us in building the future of fleet management. Let's schedule a call to discuss your investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://calendly.com/hello-exotiq/30min?back=1&month=2025-08', '_blank')}
              className="font-poppins font-bold text-sm uppercase tracking-wide px-8 py-4 bg-white text-accent-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2 justify-center min-h-[44px] touch-manipulation"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule Call</span>
            </button>
            <Link
              to="/contact"
              className="font-poppins font-bold text-sm uppercase tracking-wide px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-accent-600 rounded-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2 justify-center min-h-[44px] touch-manipulation"
            >
              <Mail className="w-5 h-5" />
              <span>Send Questions</span>
            </Link>
          </div>
          <p className="font-montserrat text-sm opacity-75 mt-6">
            Confidential and proprietary information. For qualified investors only.
          </p>
        </div>
      </section>
    </div>
  );
}