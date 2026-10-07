/**
 * Single source of truth for the legal hub at /terms.
 *
 * The hub LINKS to each agreement's canonical home and never mirrors its text:
 * a second copy drifts. When a document is revised, change its version, date
 * and URL here and nowhere else.
 *
 * Document ids and versions follow docs/legal/POLICY_ALIGNMENT_HANDOFF_2026-10.md.
 */

export interface LegalDocument {
  /** Stable id used in the assent log. */
  docId: string;
  title: string;
  /** Canonical URL (absolute when the document is served by another app). */
  url: string;
  /** Shown as "Version x · Effective y". Omit when the document is not versioned. */
  version?: string;
  effective?: string;
}

/** Served by the renter app. exotiq.rent redirects to book.exotiq.rent; both appear in the signed ToS. */
export const RENTER_TERMS: LegalDocument = {
  docId: 'terms',
  title: 'Drive Exotiq Terms of Service',
  url: 'https://exotiq.rent/terms',
  version: '2.0.0',
  effective: 'October 6, 2026',
};

/** Served by the Command Center app today. */
export const OPERATOR_TERMS: LegalDocument = {
  docId: 'operator-terms',
  title: 'Exotiq Command Center Platform Agreement',
  url: 'https://app.exotiq.ai/terms',
  effective: 'September 16, 2026',
};

export const SITE_DOCUMENTS: LegalDocument[] = [
  { docId: 'website-terms', title: 'Website Terms of Use', url: '/website-terms' },
  { docId: 'privacy', title: 'Privacy Policy', url: '/privacy' },
  { docId: 'cookies', title: 'Cookie Policy', url: '/cookies' },
  { docId: 'sms', title: 'SMS and Text Messaging Policy', url: '/sms-terms' },
  { docId: 'dmca', title: 'Copyright and DMCA Policy', url: '/dmca' },
];

export const LEGAL_CONTACTS = {
  support: 'support@exotiq.ai',
  legal: 'legal@exotiq.ai',
  privacy: 'privacy@exotiq.ai',
} as const;
