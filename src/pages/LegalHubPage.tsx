import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { breadcrumbSchema } from '../data/structuredData';
import { useTheme } from '../contexts/ThemeContext';
import {
  LEGAL_CONTACTS,
  OPERATOR_TERMS,
  RENTER_TERMS,
  SITE_DOCUMENTS,
  type LegalDocument,
} from '../data/legalDocuments';

/**
 * exotiq.ai/terms: a guide to which agreement applies. It is NOT itself a
 * contract and never copies another document's text. The two agreement cards
 * keep stable anchors (#renter-terms, #operator-terms) that other systems link to.
 */

function metaLine(doc: LegalDocument): string {
  return [doc.version && `Version ${doc.version}`, doc.effective && `Effective ${doc.effective}`]
    .filter(Boolean)
    .join(' · ');
}

interface AgreementCardProps {
  id: string;
  audience: string;
  doc: LegalDocument;
  summary: string;
  cta: string;
}

function AgreementCard({ id, audience, doc, summary, cta }: AgreementCardProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
    >
      <p className="font-inter text-xs font-semibold uppercase tracking-[0.16em] text-primary-700">
        {audience}
      </p>
      <h2 id={`${id}-title`} className="mt-3 font-dfaalt text-2xl font-bold tracking-tight text-slate-950">
        {doc.title}
      </h2>
      <p className="mt-3 font-inter text-base leading-relaxed text-slate-600">{summary}</p>
      <p className="mt-4 font-inter text-sm text-slate-500">{metaLine(doc)}</p>
      <a
        href={doc.url}
        className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 self-start rounded-xl bg-slate-950 px-6 py-3 font-dfaalt text-base font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </section>
  );
}

export default function LegalHubPage() {
  const { theme } = useTheme();
  const { hash } = useLocation();

  // Anchors (#renter-terms, #operator-terms) are linked from other systems, so a cold load
  // must land on the card. React Router reports a first load as "POP", which
  // RouteScrollManager skips, and the browser's own anchor jump fires before this lazy page
  // exists. So scroll here: retry until the card is in the DOM, then once more after fonts
  // settle so late layout shifts don't strand the card off-screen.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = hash.slice(1);
    let raf = 0;
    let cancelled = false;
    let tries = 0;
    const jump = () => document.getElementById(id)?.scrollIntoView({ block: 'start' });
    const find = () => {
      if (cancelled) return;
      if (document.getElementById(id)) {
        jump();
        document.fonts?.ready.then(() => !cancelled && jump());
      } else if (tries++ < 30) {
        raf = requestAnimationFrame(find);
      }
    };
    raf = requestAnimationFrame(find);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [hash]);

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
        title="Terms and Agreements | Exotiq and Drive Exotiq"
        description="Which Exotiq agreement applies to you: the Drive Exotiq Terms of Service for renters, or the Exotiq Command Center Platform Agreement for fleet operators. Plus our privacy, cookie, SMS, and copyright policies."
        keywords="Exotiq terms, Drive Exotiq terms of service, Command Center platform agreement, legal"
        url="https://exotiq.ai/terms"
        structuredData={breadcrumbSchema([
          { name: 'Home', url: 'https://exotiq.ai' },
          { name: 'Terms', url: 'https://exotiq.ai/terms' },
        ])}
      />

      <section className="legal-hero legal-hero-accent">
        <div className="legal-hero-inner">
          <div className="legal-eyebrow">Exotiq Inc. — a Delaware C-Corporation</div>
          <h1 className="legal-title">Terms and Agreements</h1>
          <p className="legal-subtitle">Find the agreement that applies to how you use Exotiq</p>
        </div>
      </section>

      <section className="legal-content-section">
        <div className="legal-container">
          <p className="font-inter text-lg leading-relaxed text-slate-700">
            Exotiq Inc., a Delaware corporation doing business as Drive Exotiq, runs two services:
            the Exotiq Command Center, software for vehicle operators, and the Drive Exotiq
            marketplace, where renters book vehicles. Which agreement governs depends on which one
            you use. This page is a guide. It is not itself a contract, and it does not copy the
            text of any agreement.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <AgreementCard
              id="renter-terms"
              audience="Renting a car?"
              doc={RENTER_TERMS}
              summary="Governs your booking on Drive Exotiq: payments, deposits, cancellations, your responsibilities as a renter, and how disputes are resolved."
              cta="Read the Terms of Service"
            />
            <AgreementCard
              id="operator-terms"
              audience="Operating a fleet?"
              doc={OPERATOR_TERMS}
              summary="Governs your use of the Exotiq Command Center: subscriptions and trial billing, fleet tools, software licensing, your data, and disputes between you and Exotiq."
              cta="Read the Platform Agreement"
            />
          </div>

          <p className="mt-8 font-inter text-base leading-relaxed text-slate-600">
            Vehicle listings and rentals made through Drive Exotiq are governed by the Drive Exotiq
            Terms of Service and by the operator's own rental agreement with the renter. The
            Command Center agreement does not replace either of them.
          </p>

          <h2 className="mt-14 font-dfaalt text-xl font-bold tracking-tight text-slate-950">
            Other policies
          </h2>
          <ul className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {SITE_DOCUMENTS.map((doc) => (
              <li key={doc.docId}>
                <Link
                  to={doc.url}
                  className="inline-flex min-h-[44px] items-center font-inter text-base font-medium text-primary-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-dfaalt text-xl font-bold tracking-tight text-slate-950">Questions</h2>
          <p className="mt-3 font-inter text-base leading-relaxed text-slate-600">
            Help with an account or a booking:{' '}
            <a className="font-medium text-primary-700 underline-offset-4 hover:underline" href={`mailto:${LEGAL_CONTACTS.support}`}>
              {LEGAL_CONTACTS.support}
            </a>
            . Legal notices:{' '}
            <a className="font-medium text-primary-700 underline-offset-4 hover:underline" href={`mailto:${LEGAL_CONTACTS.legal}`}>
              {LEGAL_CONTACTS.legal}
            </a>
            . Privacy requests:{' '}
            <a className="font-medium text-primary-700 underline-offset-4 hover:underline" href={`mailto:${LEGAL_CONTACTS.privacy}`}>
              {LEGAL_CONTACTS.privacy}
            </a>
            . Exotiq Inc., 1001 S Main St #6709, Kalispell, MT 59901.
          </p>
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
