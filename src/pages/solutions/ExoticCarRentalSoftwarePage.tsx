import MarketingLanding from '../../components/landing/MarketingLanding';

export default function ExoticCarRentalSoftwarePage() {
  return (
    <MarketingLanding
      canonicalPath="/solutions/exotic-car-rental-software/"
      metaTitle="Exotic Car Rental Software | exotiq"
      metaDescription="exotiq is AI exotic car rental software for luxury fleet operators: dynamic pricing, multi-platform sync, compliance tracking, and direct bookings in one platform."
      keywords="exotic car rental software, luxury car rental software, fleet management for luxury rentals, supercar rental software, high-value vehicle rental software"
      eyebrow="Solution"
      h1="Exotic car rental software"
      intro="Renting exotic and luxury vehicles is a different business than economy car-sharing. Assets are worth more, compliance matters more, and guests expect a premium experience. exotiq is the AI command center built specifically for high-value rental fleets."
      sections={[
        {
          heading: 'Everything a luxury fleet needs in one platform',
          bullets: [
            'MotorIQ: AI dynamic pricing and revenue optimization',
            'Pulse: fleet analytics, utilization tracking, and a live operations dashboard',
            'Book: direct booking, calendar, CRM, and payments',
            'Vault: compliance, insurance, registration, and document alerts',
            'FleetCopilot: an AI operations assistant for fleet questions and workflows',
          ],
        },
        {
          heading: 'Why high-value fleets need purpose-built software',
          body: 'Generic tools treat every vehicle the same. exotiq is tuned for the realities of exotic and luxury rentals: protecting expensive assets with predictive maintenance, staying ahead of compliance and insurance, and pricing scarce, high-demand inventory with discipline.',
          bullets: [
            'Predictive maintenance to protect uptime on costly vehicles',
            'Document and insurance tracking so nothing lapses',
            'Pricing guardrails that protect both occupancy and margin',
            'A premium, branded direct-booking experience for guests',
          ],
        },
      ]}
      faqs={[
        {
          question: 'What is exotic car rental software?',
          answer: 'Exotic car rental software helps operators of high-value vehicle fleets manage pricing, bookings, customers, documents, compliance, maintenance, and analytics from one place. exotiq adds AI automation across these areas and is designed specifically for exotic and luxury rental operators.',
        },
        {
          question: 'Is exotiq suitable for both small and large luxury fleets?',
          answer: 'Yes. exotiq is architected to scale from a handful of vehicles to enterprise fleets, with features like sub-host management, dynamic pricing, and utilization analytics, and per-vehicle pricing that grows with you.',
        },
        {
          question: 'Does exotiq handle compliance and insurance documents?',
          answer: 'Yes. The Vault module tracks compliance, insurance, registration, and agreements, and is designed to alert you before documents lapse, which is critical for high-value fleets.',
        },
        {
          question: 'How secure is my fleet and guest data?',
          answer: 'exotiq uses enterprise-grade encryption for data in transit and at rest and follows strict data-privacy practices. It is built on SOC 2 Type II and ISO 27001:2022 certified infrastructure.',
        },
      ]}
      ctaHeading="Operate your luxury fleet with confidence"
      ctaSubtext="Book a 15-minute demo to see exotiq configured for your exotic and luxury vehicles."
      relatedLinks={[
        { label: 'Best exotic car rental software', to: '/compare/best-exotic-car-rental-software' },
        { label: 'exotiq vs traditional fleet software', to: '/compare/exotiq-vs-hq-rental' },
        { label: 'Turo host software', to: '/solutions/turo-host-software' },
        { label: 'See features', to: '/features' },
      ]}
    />
  );
}
