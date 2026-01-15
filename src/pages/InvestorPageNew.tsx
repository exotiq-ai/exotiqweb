import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    TrendingUp,
    Users,
    Target,
    Calendar,
    ArrowRight,
    CheckCircle,
    Zap,
    Mail,
    Building,
    Award,
    ExternalLink,
    Phone,
    Shield,
    BarChart3,
    Rocket,
    DollarSign
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { organizationSchema, breadcrumbSchema } from '../data/structuredData';
import logger from '../utils/logger';

interface InvestorFormData {
    fullName: string;
    email: string;
    companyName: string;
    phone?: string;
    investmentRange: string;
    investorType: string;
    investmentTimeline: string;
    additionalNotes?: string;
}

export default function InvestorPageNew() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState<InvestorFormData>({
        fullName: '',
        email: '',
        companyName: '',
        phone: '',
        investmentRange: '',
        investorType: '',
        investmentTimeline: '',
        additionalNotes: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const nameParts = formData.fullName.trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            const submissionData = {
                firstName,
                lastName,
                email: formData.email,
                companyName: formData.companyName,
                phone: formData.phone,
                investmentAmountRange: formData.investmentRange,
                investmentType: formData.investorType,
                investmentTimeline: formData.investmentTimeline,
                additionalNotes: formData.additionalNotes,
                source: 'website_new_investor_page'
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

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Failed to submit investor form');
            }

            logger.info('Investor submission successful', { investorId: result.investorId });

            // Track GTM event
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'investor_form_submit',
                    investor_type: formData.investorType,
                    investment_range: formData.investmentRange
                });
            }

            // Redirect to deck.exotiq.ai
            window.location.href = 'https://deck.exotiq.ai';

        } catch (error) {
            logger.error('Investor submission error', { error });
            setSubmitError(error instanceof Error ? error.message : 'An error occurred while submitting the form');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-16 bg-black text-white overflow-hidden">
            <SEOHead
                title="Investor Portal - Exotiq.ai Pre-Seed Round"
                description="Join Exotiq's $2.5M pre-seed round. The operating system for the $2.45B exotic car rental market. 85% gross margins, 8.5:1 LTV:CAC."
                keywords="Exotiq investment, fleet management startup, automotive SaaS investment, pre-seed round, venture capital opportunity"
                url="https://exotiq.ai/investors"
                noindex={false}
                structuredData={[
                    organizationSchema,
                    breadcrumbSchema([
                        { name: "Home", url: "https://exotiq.ai" },
                        { name: "Investors", url: "https://exotiq.ai/investors" }
                    ])
                ]}
            />

            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#1B1B1B] opacity-90"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(107,184,229,0.03),transparent_50%)]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">

                {/* SECTION 1: HERO */}
                <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto text-center">
                        {/* Live Badge */}
                        <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-[#FF5733]/10 border border-[#FF5733]/30 backdrop-blur-sm">
                            <div className="w-2 h-2 bg-[#FF5733] rounded-full mr-3 animate-pulse"></div>
                            <span className="font-montserrat text-sm font-semibold text-[#FF5733] uppercase tracking-wide">
                                Live on AngelList • $2.5M Pre-Seed Closing
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="font-montserrat font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                            The Operating System for the{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC]">
                                $2.45B Exotic Car Rental Market
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="font-montserrat text-lg sm:text-xl md:text-2xl text-[#A0A0A0] max-w-4xl mx-auto mb-12 leading-relaxed">
                            Exotiq replaces spreadsheets with AI agents. We help operators automate sales, predict maintenance, and scale their fleets.
                        </p>

                        {/* Traction Row */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-12">
                            <div className="text-center">
                                <div className="font-montserrat font-bold text-3xl sm:text-4xl text-[#6BB8E5] mb-1">15+ Hours</div>
                                <div className="font-montserrat text-sm text-[#A0A0A0]">Saved Weekly</div>
                            </div>
                            <div className="hidden sm:block w-px h-12 bg-[#A0A0A0]/20"></div>
                            <div className="text-center">
                                <div className="font-montserrat font-bold text-3xl sm:text-4xl text-[#6BB8E5] mb-1">3 Cities</div>
                                <div className="font-montserrat text-sm text-[#A0A0A0]">Live Now</div>
                            </div>
                            <div className="hidden sm:block w-px h-12 bg-[#A0A0A0]/20"></div>
                            <div className="text-center">
                                <div className="font-montserrat font-bold text-3xl sm:text-4xl text-[#6BB8E5] mb-1">90%+</div>
                                <div className="font-montserrat text-sm text-[#A0A0A0]">Operator Stickiness</div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="#form"
                                className="group inline-flex items-center justify-center px-8 py-4 bg-[#6BB8E5] hover:bg-[#5AA7D4] text-black font-montserrat font-bold text-sm uppercase tracking-wide rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(107,184,229,0.4)] min-w-[240px]"
                            >
                                Request Investor Deck
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="https://calendly.com/hello-exotiq/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/5 text-white font-montserrat font-bold text-sm uppercase tracking-wide rounded-lg border-2 border-white/20 hover:border-[#6BB8E5] transition-all duration-200 hover:scale-105 min-w-[240px]"
                            >
                                <Calendar className="mr-2 w-5 h-5" />
                                Schedule Founder Call
                            </a>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: BACKED BY */}
                <section className="py-16 px-4 sm:px-6 lg:px-16 xl:px-20 bg-[#1B1B1B]/30 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto">
                        {/* Investors */}
                        <div className="text-center mb-12">
                            <h2 className="font-montserrat font-bold text-2xl sm:text-3xl text-white mb-8">
                                Backed by Industry Leaders
                            </h2>
                            <div className="flex flex-wrap items-center justify-center gap-16 sm:gap-20">
                                <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-75 hover:opacity-100 p-6">
                                    <img
                                        src="/images/logos/investors/1080-ventures.png"
                                        alt="1080 Ventures"
                                        className="h-24 sm:h-28 md:h-32 w-auto max-w-[320px] filter brightness-0 invert"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const fallback = document.createElement('div');
                                            fallback.className = 'font-montserrat font-bold text-2xl text-white';
                                            fallback.textContent = '1080 Ventures';
                                            e.currentTarget.parentElement!.appendChild(fallback);
                                        }}
                                    />
                                </div>
                                <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-75 hover:opacity-100 p-6">
                                    <img
                                        src="/images/logos/investors/lex-growth-studio.png"
                                        alt="LEX Growth Studio"
                                        className="h-24 sm:h-28 md:h-32 w-auto max-w-[320px]"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            const fallback = document.createElement('div');
                                            fallback.className = 'font-montserrat font-bold text-2xl text-white';
                                            fallback.textContent = 'LEX Growth Studio';
                                            e.currentTarget.parentElement!.appendChild(fallback);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6BB8E5]/30 to-transparent mb-12"></div>

                        {/* Tech Stack */}
                        <div className="text-center mb-12">
                            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-4">
                                Strategic Technology & Data Partners
                            </h2>
                            <p className="font-montserrat text-base sm:text-lg text-[#A0A0A0] max-w-3xl mx-auto">
                                Enterprise-grade infrastructure powering our platform
                            </p>
                        </div>

                        {/* Compliance Partners */}
                        <div className="mb-16">
                            <h3 className="font-montserrat text-xl sm:text-2xl text-[#6BB8E5] text-center mb-10">
                                Compliance
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 items-center justify-items-center max-w-5xl mx-auto">
                                {[
                                    { name: 'Axle', file: 'axle.png' },
                                    { name: 'Persona', file: 'persona.png' },
                                    { name: 'PredictHQ', file: 'predicthq.png' }
                                ].map((tech) => (
                                    <div key={tech.name} className="grayscale hover:grayscale-0 transition-all duration-300 opacity-75 hover:opacity-100 flex items-center justify-center p-6">
                                        <img
                                            src={`/images/logos/tech-partners/${tech.file}`}
                                            alt={tech.name}
                                            className="h-20 sm:h-24 md:h-28 w-auto max-w-[280px] object-contain filter brightness-0 invert contrast-125"
                                            style={{ imageRendering: 'crisp-edges' }}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                const fallback = document.createElement('span');
                                                fallback.className = 'font-montserrat text-base sm:text-lg text-white';
                                                fallback.textContent = tech.name;
                                                e.currentTarget.parentElement!.appendChild(fallback);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Banking Partners */}
                        <div className="mb-16">
                            <h3 className="font-montserrat text-xl sm:text-2xl text-[#6BB8E5] text-center mb-10">
                                Banking
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 items-center justify-items-center max-w-5xl mx-auto">
                                {[
                                    { name: 'Stripe', file: 'stripe.png' },
                                    { name: 'Plaid', file: 'plaid.png' },
                                    { name: 'Brex', file: 'brex.png' }
                                ].map((tech) => (
                                    <div key={tech.name} className="grayscale hover:grayscale-0 transition-all duration-300 opacity-75 hover:opacity-100 flex items-center justify-center p-6">
                                        <img
                                            src={`/images/logos/tech-partners/${tech.file}`}
                                            alt={tech.name}
                                            className="h-20 sm:h-24 md:h-28 w-auto max-w-[280px] object-contain filter brightness-0 invert contrast-125"
                                            style={{ imageRendering: 'crisp-edges' }}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                const fallback = document.createElement('span');
                                                fallback.className = 'font-montserrat text-base sm:text-lg text-white';
                                                fallback.textContent = tech.name;
                                                e.currentTarget.parentElement!.appendChild(fallback);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Models */}
                        <div className="mb-10">
                            <h3 className="font-montserrat text-xl sm:text-2xl text-[#6BB8E5] text-center mb-10">
                                AI Models
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 items-center justify-items-center max-w-5xl mx-auto">
                                {[
                                    { name: 'OpenAI', file: 'openai.png' },
                                    { name: 'Claude', file: 'claude.png' },
                                    { name: 'Gemini', file: 'gemini.png' }
                                ].map((tech) => (
                                    <div key={tech.name} className="grayscale hover:grayscale-0 transition-all duration-300 opacity-75 hover:opacity-100 flex items-center justify-center p-6">
                                        <img
                                            src={`/images/logos/tech-partners/${tech.file}`}
                                            alt={tech.name}
                                            className="h-20 sm:h-24 md:h-28 w-auto max-w-[280px] object-contain filter brightness-0 invert contrast-125"
                                            style={{ imageRendering: 'crisp-edges' }}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                const fallback = document.createElement('span');
                                                fallback.className = 'font-montserrat text-base sm:text-lg text-white';
                                                fallback.textContent = tech.name;
                                                e.currentTarget.parentElement!.appendChild(fallback);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <a
                                href="https://deck.exotiq.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center font-montserrat text-sm text-[#6BB8E5] hover:text-[#5AA7D4] transition-colors"
                            >
                                Full team and advisor bios at deck.exotiq.ai
                                <ExternalLink className="ml-2 w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: MARKET VALIDATION */}
                <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Card 1: Proven Demand */}
                            <div className="group relative bg-white/5 backdrop-blur-sm border border-[#6BB8E5]/20 rounded-2xl p-8 hover:border-[#6BB8E5]/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#6BB8E5] to-transparent rounded-l-2xl"></div>
                                <Target className="w-10 h-10 text-[#6BB8E5] mb-4" />
                                <h3 className="font-montserrat font-bold text-xl mb-4">Proven Demand</h3>
                                <ul className="space-y-3 font-montserrat text-sm text-[#A0A0A0]">
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-[#6BB8E5] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>30+ operator workflows automated</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-[#6BB8E5] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>15+ hours saved per operator weekly</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-[#6BB8E5] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>90%+ would use as primary OS</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-[#6BB8E5] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>Successful events: Denver, Scottsdale</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Card 2: Massive Opportunity */}
                            <div className="group relative bg-white/5 backdrop-blur-sm border border-[#FF5733]/20 rounded-2xl p-8 hover:border-[#FF5733]/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF5733] to-transparent rounded-l-2xl"></div>
                                <DollarSign className="w-10 h-10 text-[#FF5733] mb-4" />
                                <h3 className="font-montserrat font-bold text-xl mb-4">Massive Opportunity</h3>
                                <ul className="space-y-3 font-montserrat text-sm text-[#A0A0A0]">
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-[#FF5733] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>$2.45B serviceable market (SAM)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-[#FF5733] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>15.8% CAGR growth rate</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-[#FF5733] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>$450M+ immediate addressable</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-[#FF5733] mr-2 mt-0.5 flex-shrink-0" />
                                        <span>85% gross margins (pure software)</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Card 3: Fundraising Momentum */}
                            <div className="group relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:border-white/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white to-transparent rounded-l-2xl"></div>
                                <Rocket className="w-10 h-10 text-white mb-4" />
                                <h3 className="font-montserrat font-bold text-xl mb-4">Fundraising Momentum</h3>
                                <ul className="space-y-3 font-montserrat text-sm text-[#A0A0A0]">
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-white mr-2 mt-0.5 flex-shrink-0" />
                                        <span>Live on AngelList</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-white mr-2 mt-0.5 flex-shrink-0" />
                                        <span>3 strategic investors committed</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-white mr-2 mt-0.5 flex-shrink-0" />
                                        <span>Miami expansion Q1 2025</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-white mr-2 mt-0.5 flex-shrink-0" />
                                        <span>87% survey to beta conversion</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>

                {/* SECTION 4: THE SOLUTION */}
                <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-[#1B1B1B]/30 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
                                Three Agents. One Command Center.
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* FleetCopilot */}
                            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#6BB8E5]/50 hover:bg-white/10 transition-all duration-300">
                                <div className="w-14 h-14 bg-[#6BB8E5]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#6BB8E5]/20 transition-colors">
                                    <Zap className="w-7 h-7 text-[#6BB8E5]" />
                                </div>
                                <h3 className="font-montserrat font-bold text-xl mb-3">FleetCopilot</h3>
                                <p className="font-montserrat text-[#A0A0A0] leading-relaxed">
                                    AI assistant for dynamic pricing, instant guest communication, and predictive maintenance.
                                </p>
                            </div>

                            {/* MotorIQ */}
                            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#6BB8E5]/50 hover:bg-white/10 transition-all duration-300">
                                <div className="w-14 h-14 bg-[#6BB8E5]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#6BB8E5]/20 transition-colors">
                                    <BarChart3 className="w-7 h-7 text-[#6BB8E5]" />
                                </div>
                                <h3 className="font-montserrat font-bold text-xl mb-3">MotorIQ</h3>
                                <p className="font-montserrat text-[#A0A0A0] leading-relaxed">
                                    Real-time dashboards with predictive forecasting and market intelligence.
                                </p>
                            </div>

                            {/* Pulse + Vault */}
                            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#6BB8E5]/50 hover:bg-white/10 transition-all duration-300">
                                <div className="w-14 h-14 bg-[#6BB8E5]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#6BB8E5]/20 transition-colors">
                                    <Shield className="w-7 h-7 text-[#6BB8E5]" />
                                </div>
                                <h3 className="font-montserrat font-bold text-xl mb-3">Pulse + Vault</h3>
                                <p className="font-montserrat text-[#A0A0A0] leading-relaxed">
                                    Unified operations with automated compliance and risk management.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* SECTION 5: THE OPPORTUNITY */}
                <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
                                A Fragmented Market Ripe for Consolidation
                            </h2>
                            <p className="font-montserrat text-lg sm:text-xl text-[#A0A0A0] max-w-4xl mx-auto leading-relaxed">
                                The exotic car rental market is growing at 15.8% annually, yet operators still run on WhatsApp and Excel. We are the first purpose-built operating system for this high-value asset class.
                            </p>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                            <div className="text-center">
                                <div className="font-montserrat font-bold text-4xl sm:text-5xl text-[#6BB8E5] mb-2">$13B+</div>
                                <div className="font-montserrat text-sm text-[#A0A0A0]">Total Market</div>
                                <div className="font-montserrat text-xs text-[#A0A0A0]/60">(TAM)</div>
                            </div>
                            <div className="text-center">
                                <div className="font-montserrat font-bold text-4xl sm:text-5xl text-[#6BB8E5] mb-2">$2.45B</div>
                                <div className="font-montserrat text-sm text-[#A0A0A0]">Addressable</div>
                                <div className="font-montserrat text-xs text-[#A0A0A0]/60">(SAM)</div>
                            </div>
                            <div className="text-center">
                                <div className="font-montserrat font-bold text-4xl sm:text-5xl text-[#6BB8E5] mb-2">15.8%</div>
                                <div className="font-montserrat text-sm text-[#A0A0A0]">Annual Growth</div>
                                <div className="font-montserrat text-xs text-[#A0A0A0]/60">(CAGR)</div>
                            </div>
                            <div className="text-center">
                                <div className="font-montserrat font-bold text-4xl sm:text-5xl text-[#6BB8E5] mb-2">85%</div>
                                <div className="font-montserrat text-sm text-[#A0A0A0]">Gross Margin</div>
                                <div className="font-montserrat text-xs text-[#A0A0A0]/60">(Software)</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: BUSINESS MODEL */}
                <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-[#1B1B1B]/30 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
                                Simple, Scalable, Profitable
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* Tiered SaaS */}
                            <div className="bg-white/5 backdrop-blur-sm border border-[#6BB8E5]/20 rounded-2xl p-8">
                                <div className="w-12 h-12 bg-[#6BB8E5]/10 rounded-lg flex items-center justify-center mb-6">
                                    <DollarSign className="w-6 h-6 text-[#6BB8E5]" />
                                </div>
                                <h3 className="font-montserrat font-bold text-xl mb-4">Tiered SaaS Pricing</h3>
                                <p className="font-montserrat text-[#A0A0A0] mb-4">
                                    $49-$199/month based on fleet size
                                </p>
                                <p className="font-montserrat text-sm text-[#A0A0A0]/80">
                                    + Premium AI add-ons ($15-$25/vehicle)
                                </p>
                            </div>

                            {/* Unit Economics */}
                            <div className="bg-white/5 backdrop-blur-sm border border-[#FF5733]/20 rounded-2xl p-8">
                                <div className="w-12 h-12 bg-[#FF5733]/10 rounded-lg flex items-center justify-center mb-6">
                                    <TrendingUp className="w-6 h-6 text-[#FF5733]" />
                                </div>
                                <h3 className="font-montserrat font-bold text-xl mb-4">Unit Economics</h3>
                                <div className="space-y-3 font-montserrat text-[#A0A0A0]">
                                    <div className="flex justify-between">
                                        <span>Gross Margin</span>
                                        <span className="font-bold text-white">85%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>LTV:CAC</span>
                                        <span className="font-bold text-white">8.5:1</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Churn Rate</span>
                                        <span className="font-bold text-white">&lt;5%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Growth Levers */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                                    <Rocket className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-montserrat font-bold text-xl mb-4">Growth Levers</h3>
                                <ul className="space-y-3 font-montserrat text-sm text-[#A0A0A0]">
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-white mr-2 mt-0.5 flex-shrink-0" />
                                        <span>White-glove onboarding</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-white mr-2 mt-0.5 flex-shrink-0" />
                                        <span>Data partnerships (insurance)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="w-4 h-4 text-white mr-2 mt-0.5 flex-shrink-0" />
                                        <span>Enterprise customization</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>

                {/* SECTION 7: GO-TO-MARKET */}
                <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
                                From Zero to Market Momentum
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                            {/* Phase 1 */}
                            <div className="bg-white/5 backdrop-blur-sm border border-[#6BB8E5]/20 rounded-2xl p-6 hover:border-[#6BB8E5]/50 transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-[#6BB8E5] rounded-full flex items-center justify-center font-montserrat font-bold text-black mr-3">
                                        1
                                    </div>
                                    <span className="font-montserrat font-semibold text-sm text-[#A0A0A0]">Q1 2026</span>
                                </div>
                                <h3 className="font-montserrat font-bold text-lg mb-3">Beta Launch</h3>
                                <p className="font-montserrat text-sm text-[#A0A0A0]">
                                    MVP live in Denver, Scottsdale, Miami
                                </p>
                            </div>

                            {/* Phase 2 */}
                            <div className="bg-white/5 backdrop-blur-sm border border-[#6BB8E5]/20 rounded-2xl p-6 hover:border-[#6BB8E5]/50 transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-[#6BB8E5] rounded-full flex items-center justify-center font-montserrat font-bold text-black mr-3">
                                        2
                                    </div>
                                    <span className="font-montserrat font-semibold text-sm text-[#A0A0A0]">Q1 2026</span>
                                </div>
                                <h3 className="font-montserrat font-bold text-lg mb-3">Drive Exotiq App</h3>
                                <p className="font-montserrat text-sm text-[#A0A0A0]">
                                    Direct renter funnel
                                </p>
                            </div>

                            {/* Phase 3 */}
                            <div className="bg-white/5 backdrop-blur-sm border border-[#6BB8E5]/20 rounded-2xl p-6 hover:border-[#6BB8E5]/50 transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-[#6BB8E5] rounded-full flex items-center justify-center font-montserrat font-bold text-black mr-3">
                                        3
                                    </div>
                                    <span className="font-montserrat font-semibold text-sm text-[#A0A0A0]">Q2-Q3 2026</span>
                                </div>
                                <h3 className="font-montserrat font-bold text-lg mb-3">Platform Partnerships</h3>
                                <p className="font-montserrat text-sm text-[#A0A0A0]">
                                    Insurance, inspection integrations
                                </p>
                            </div>

                            {/* Phase 4 */}
                            <div className="bg-white/5 backdrop-blur-sm border border-[#6BB8E5]/20 rounded-2xl p-6 hover:border-[#6BB8E5]/50 transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-[#6BB8E5] rounded-full flex items-center justify-center font-montserrat font-bold text-black mr-3">
                                        4
                                    </div>
                                    <span className="font-montserrat font-semibold text-sm text-[#A0A0A0]">Q4 2026</span>
                                </div>
                                <h3 className="font-montserrat font-bold text-lg mb-3">Market Expansion</h3>
                                <p className="font-montserrat text-sm text-[#A0A0A0]">
                                    10+ cities, enterprise licensing
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* SECTION 8: USE OF FUNDS */}
                <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-[#1B1B1B]/30 backdrop-blur-sm">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
                                The Raise: $2.5M Pre-Seed
                            </h2>
                        </div>

                        <div className="space-y-6">

                            {/* Product & AI */}
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-montserrat font-semibold text-lg">Product & AI Development</span>
                                        <span className="font-montserrat font-bold text-[#6BB8E5]">60%</span>
                                    </div>
                                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-[#6BB8E5] to-[#4A9FCC] rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                    <p className="font-montserrat text-sm text-[#A0A0A0] mt-2">MVP Launch, Core Features</p>
                                </div>
                            </div>

                            {/* GTM & Partnerships */}
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-montserrat font-semibold text-lg">GTM & Partnerships</span>
                                        <span className="font-montserrat font-bold text-[#FF5733]">25%</span>
                                    </div>
                                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-[#FF5733] to-[#E64A2E] rounded-full" style={{ width: '25%' }}></div>
                                    </div>
                                    <p className="font-montserrat text-sm text-[#A0A0A0] mt-2">Market Entry, Sales Team</p>
                                </div>
                            </div>

                            {/* Operations */}
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-montserrat font-semibold text-lg">Operations</span>
                                        <span className="font-montserrat font-bold text-white">15%</span>
                                    </div>
                                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-white to-[#A0A0A0] rounded-full" style={{ width: '15%' }}></div>
                                    </div>
                                    <p className="font-montserrat text-sm text-[#A0A0A0] mt-2">Regulatory, Infrastructure</p>
                                </div>
                            </div>

                        </div>

                        <div className="text-center mt-12">
                            <p className="font-montserrat text-sm text-[#A0A0A0]">
                                Runway: 18 months to profitability
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 9: TEAM */}
                <section className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
                                Led by Operators & Builders
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* Gregory */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-[#6BB8E5]/50 hover:bg-white/10 transition-all duration-300">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#6BB8E5] to-[#4A9FCC] rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <Users className="w-12 h-12 text-black" />
                                </div>
                                <h3 className="font-montserrat font-bold text-xl mb-2">Gregory Ringler</h3>
                                <p className="font-montserrat text-sm text-[#6BB8E5] mb-4">Founder & CEO</p>
                                <p className="font-montserrat text-sm text-[#A0A0A0] leading-relaxed">
                                    Former Turo Power Host, scaled luxury fleet
                                </p>
                            </div>

                            {/* Nikola */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-[#6BB8E5]/50 hover:bg-white/10 transition-all duration-300">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#6BB8E5] to-[#4A9FCC] rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <Zap className="w-12 h-12 text-black" />
                                </div>
                                <h3 className="font-montserrat font-bold text-xl mb-2">Nikola Javić</h3>
                                <p className="font-montserrat text-sm text-[#6BB8E5] mb-4">Fractional CTO (Ars Futura)</p>
                                <p className="font-montserrat text-sm text-[#A0A0A0] leading-relaxed">
                                    AI/ML leader, multiple SaaS unicorns
                                </p>
                            </div>

                            {/* Arthur */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-[#6BB8E5]/50 hover:bg-white/10 transition-all duration-300">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#6BB8E5] to-[#4A9FCC] rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <Award className="w-12 h-12 text-black" />
                                </div>
                                <h3 className="font-montserrat font-bold text-xl mb-2">Arthur Woods</h3>
                                <p className="font-montserrat text-sm text-[#6BB8E5] mb-4">Strategic Advisor (1080 Ventures)</p>
                                <p className="font-montserrat text-sm text-[#A0A0A0] leading-relaxed">
                                    Serial entrepreneur, 2 exits, Forbes 30 Under 40
                                </p>
                            </div>

                        </div>

                        <div className="text-center mt-12">
                            <a
                                href="https://deck.exotiq.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center font-montserrat text-sm text-[#6BB8E5] hover:text-[#5AA7D4] transition-colors"
                            >
                                Full bios at deck.exotiq.ai
                                <ExternalLink className="ml-2 w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* SECTION 10: CONVERSION ZONE */}
                <section id="form" className="py-20 px-4 sm:px-6 lg:px-16 xl:px-20 bg-gradient-to-b from-black to-[#1B1B1B]">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
                                Join the Round
                            </h2>
                            <p className="font-montserrat text-lg sm:text-xl text-[#6BB8E5] leading-relaxed">
                                We are selecting strategic partners to join us in capturing this $2.45B opportunity.
                            </p>
                        </div>

                        {/* Form */}
                        <div className="bg-white/5 backdrop-blur-sm border border-[#6BB8E5]/20 rounded-2xl p-8 sm:p-10">
                            <form onSubmit={handleFormSubmit} className="space-y-6" autoComplete="on">

                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block font-montserrat font-medium text-white mb-2 text-sm">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        autoComplete="name"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        autoFocus
                                        placeholder="John Smith"
                                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#6BB8E5] focus:border-transparent transition-all text-base"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block font-montserrat font-medium text-white mb-2 text-sm">
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
                                        placeholder="john@company.com"
                                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#6BB8E5] focus:border-transparent transition-all text-base"
                                    />
                                </div>

                                {/* Company/Fund */}
                                <div>
                                    <label htmlFor="companyName" className="block font-montserrat font-medium text-white mb-2 text-sm">
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
                                        placeholder="Acme Ventures"
                                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#6BB8E5] focus:border-transparent transition-all text-base"
                                    />
                                </div>

                                {/* Investment Range & Type */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="investmentRange" className="block font-montserrat font-medium text-white mb-2 text-sm">
                                            Investment Range *
                                        </label>
                                        <select
                                            id="investmentRange"
                                            name="investmentRange"
                                            value={formData.investmentRange}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#6BB8E5] focus:border-transparent transition-all text-base"
                                        >
                                            <option value="">Select range</option>
                                            <option value="25k-100k">$25K - $100K</option>
                                            <option value="100k-500k">$100K - $500K</option>
                                            <option value="500k-1m">$500K - $1M</option>
                                            <option value="1m+">$1M+</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="investorType" className="block font-montserrat font-medium text-white mb-2 text-sm">
                                            Investor Type *
                                        </label>
                                        <select
                                            id="investorType"
                                            name="investorType"
                                            value={formData.investorType}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#6BB8E5] focus:border-transparent transition-all text-base"
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="investmentTimeline" className="block font-montserrat font-medium text-white mb-2 text-sm">
                                            Timeline *
                                        </label>
                                        <select
                                            id="investmentTimeline"
                                            name="investmentTimeline"
                                            value={formData.investmentTimeline}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-[#6BB8E5] focus:border-transparent transition-all text-base"
                                        >
                                            <option value="">Select timeline</option>
                                            <option value="immediate">Ready now</option>
                                            <option value="30-days">Within 30 days</option>
                                            <option value="90-days">Within 90 days</option>
                                            <option value="exploring">Exploring</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block font-montserrat font-medium text-white mb-2 text-sm">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            autoComplete="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 123-4567"
                                            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#6BB8E5] focus:border-transparent transition-all text-base"
                                        />
                                    </div>
                                </div>

                                {/* Additional Notes */}
                                <div>
                                    <label htmlFor="additionalNotes" className="block font-montserrat font-medium text-white mb-2 text-sm">
                                        Additional Notes
                                    </label>
                                    <textarea
                                        id="additionalNotes"
                                        name="additionalNotes"
                                        value={formData.additionalNotes}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#6BB8E5] focus:border-transparent transition-all resize-none text-base"
                                        placeholder="Any additional information about your investment interest..."
                                    />
                                </div>

                                {/* Error Message */}
                                {submitError && (
                                    <div className="bg-[#FF5733]/10 border border-[#FF5733]/30 rounded-lg p-4">
                                        <p className="text-[#FF5733] text-sm">{submitError}</p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full font-montserrat font-bold text-sm uppercase tracking-wide px-8 py-4 bg-[#6BB8E5] hover:bg-[#5AA7D4] disabled:bg-[#6BB8E5]/50 text-black rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(107,184,229,0.4)] disabled:scale-100 disabled:shadow-none flex items-center justify-center space-x-2 min-h-[56px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="w-5 h-5" />
                                            <span>Request Access & Schedule Call</span>
                                        </>
                                    )}
                                </button>

                                <p className="text-center font-montserrat text-xs text-[#A0A0A0] mt-4">
                                    Accredited investors only
                                </p>
                            </form>
                        </div>
                    </div>
                </section>

            </div>

            {/* Mobile Sticky CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/90 backdrop-blur-lg border-t border-[#6BB8E5]/20">
                <a
                    href="https://calendly.com/hello-exotiq/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-6 py-4 bg-[#6BB8E5] hover:bg-[#5AA7D4] text-black font-montserrat font-bold text-sm uppercase tracking-wide rounded-lg transition-all duration-200 active:scale-95"
                >
                    <Calendar className="mr-2 w-5 h-5" />
                    Schedule Call
                </a>
            </div>
        </div>
    );
}

