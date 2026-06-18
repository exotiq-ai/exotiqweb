import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Check, X } from 'lucide-react';
import SEOHead from '../SEOHead';
import {
  breadcrumbSchema,
  faqPageSchema,
  softwareApplicationSchema,
} from '../../data/structuredData';
import { DEMO_CALENDLY } from '../../utils/pricingCta';
import { trackEvent } from '../Analytics';

export interface LandingFaq {
  question: string;
  answer: string;
}

export interface LandingSection {
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface ComparisonRow {
  capability: string;
  exotiq: string;
  alternative: string;
  exotiqWins?: boolean;
}

export interface ComparisonTable {
  alternativeLabel: string;
  rows: ComparisonRow[];
}

export interface MarketingLandingProps {
  // Canonical path including a trailing slash, e.g. "/compare/exotiq-vs-turo/".
  canonicalPath: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections?: LandingSection[];
  comparison?: ComparisonTable;
  faqs: LandingFaq[];
  ctaHeading: string;
  ctaSubtext: string;
  relatedLinks?: { label: string; to: string }[];
}

const SITE_URL = 'https://exotiq.ai';

export default function MarketingLanding({
  canonicalPath,
  metaTitle,
  metaDescription,
  keywords,
  eyebrow,
  h1,
  intro,
  sections = [],
  comparison,
  faqs,
  ctaHeading,
  ctaSubtext,
  relatedLinks = [],
}: MarketingLandingProps) {
  const pageUrl = `${SITE_URL}${canonicalPath}`;
  const structuredData = [
    breadcrumbSchema([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: h1, url: pageUrl },
    ]),
    faqPageSchema(faqs),
    softwareApplicationSchema,
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-dark-900">
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        url={pageUrl}
        canonical={pageUrl}
        structuredData={structuredData}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-poppins font-semibold text-sm uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-3">
          {eyebrow}
        </p>
        <h1 className="font-dfaalt font-bold text-4xl md:text-5xl leading-tight text-gray-900 dark:text-white mb-5">
          {h1}
        </h1>
        <p className="font-inter text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl">
          {intro}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={DEMO_CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('cta_click', {
                event_category: 'landing_conversion',
                event_label: `${canonicalPath}:hero_demo`,
              })
            }
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-inter font-semibold px-6 py-3 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Book a demo
          </a>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-dark-700 text-gray-800 dark:text-gray-100 font-inter font-semibold px-6 py-3 transition-colors hover:border-primary-500"
          >
            See pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {comparison ? (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-dark-700">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-dark-800">
                  <th className="font-dfaalt text-sm text-gray-700 dark:text-gray-300 px-4 py-3">
                    Capability
                  </th>
                  <th className="font-dfaalt text-sm text-primary-700 dark:text-primary-300 px-4 py-3">
                    exotiq
                  </th>
                  <th className="font-dfaalt text-sm text-gray-700 dark:text-gray-300 px-4 py-3">
                    {comparison.alternativeLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr
                    key={row.capability}
                    className="border-t border-gray-200 dark:border-dark-700 align-top"
                  >
                    <td className="font-inter text-sm font-semibold text-gray-900 dark:text-white px-4 py-3">
                      {row.capability}
                    </td>
                    <td className="font-inter text-sm text-gray-700 dark:text-gray-300 px-4 py-3">
                      <span className="inline-flex items-start gap-2">
                        {row.exotiqWins ? (
                          <Check className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                        ) : null}
                        <span>{row.exotiq}</span>
                      </span>
                    </td>
                    <td className="font-inter text-sm text-gray-600 dark:text-gray-400 px-4 py-3">
                      <span className="inline-flex items-start gap-2">
                        {row.exotiqWins ? (
                          <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        ) : null}
                        <span>{row.alternative}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {sections.length > 0 ? (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-dfaalt font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-3">
                {section.heading}
              </h2>
              {section.body ? (
                <p className="font-inter text-gray-700 dark:text-gray-300 mb-3 max-w-3xl">
                  {section.body}
                </p>
              ) : null}
              {section.bullets && section.bullets.length > 0 ? (
                <ul className="space-y-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 font-inter text-gray-700 dark:text-gray-300"
                    >
                      <Check className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      <section
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
        aria-labelledby="landing-faq-heading"
      >
        <h2
          id="landing-faq-heading"
          className="font-dfaalt font-bold text-2xl md:text-3xl text-gray-900 dark:text-white mb-6"
        >
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-dfaalt text-lg text-gray-900 dark:text-white mb-1">
                {faq.question}
              </h3>
              <p className="font-inter text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-2xl bg-gray-900 dark:bg-dark-800 px-6 py-10 sm:px-10 text-center">
          <h2 className="font-dfaalt font-bold text-2xl md:text-3xl text-white mb-3">
            {ctaHeading}
          </h2>
          <p className="font-inter text-gray-300 mb-6 max-w-2xl mx-auto">{ctaSubtext}</p>
          <a
            href={DEMO_CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('cta_click', {
                event_category: 'landing_conversion',
                event_label: `${canonicalPath}:footer_demo`,
              })
            }
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-inter font-semibold px-6 py-3 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Book a demo
          </a>
        </div>
      </section>

      {relatedLinks.length > 0 ? (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="font-dfaalt font-semibold text-xl text-gray-900 dark:text-white mb-4">
            Keep exploring
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-dark-700 px-4 py-2 font-inter text-sm text-gray-800 dark:text-gray-200 hover:border-primary-500 transition-colors"
              >
                {link.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
