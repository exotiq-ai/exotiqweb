import MarketingLanding from '../../components/landing/MarketingLanding';

export default function ExotiqVsTuroPage() {
  return (
    <MarketingLanding
      canonicalPath="/compare/exotiq-vs-turo/"
      metaTitle="exotiq vs Turo Native Tools: What's the Difference? | exotiq"
      metaDescription="Compare exotiq to Turo's built-in host tools. See how a dedicated operator platform handles pricing, multi-platform sync, direct bookings, and operations."
      keywords="exotiq vs Turo, Turo native tools, Turo host software, Turo automation, fleet management for Turo hosts"
      eyebrow="Comparison"
      h1="exotiq vs Turo native tools"
      intro="Turo's built-in tools are designed to help you list and manage cars on Turo. exotiq is a dedicated operator platform that sits on top of every channel you use, including Turo, Getaround, and your own direct-booking site. Here is how they compare for a growing fleet."
      comparison={{
        alternativeLabel: 'Turo native tools',
        rows: [
          {
            capability: 'Scope',
            exotiq: 'Cross-platform command center for the whole operation',
            alternative: 'Tools scoped to the Turo marketplace',
            exotiqWins: true,
          },
          {
            capability: 'Pricing',
            exotiq: 'AI dynamic pricing (MotorIQ) with operator-defined guardrails',
            alternative: 'Marketplace-driven automated pricing',
          },
          {
            capability: 'Direct bookings',
            exotiq: 'Built-in direct booking so you keep more of each reservation',
            alternative: 'Bookings stay on-platform with marketplace fees',
            exotiqWins: true,
          },
          {
            capability: 'Multi-platform sync',
            exotiq: 'Real-time sync across Turo, Getaround, and direct',
            alternative: 'Single-platform by design',
            exotiqWins: true,
          },
          {
            capability: 'Maintenance & compliance',
            exotiq: 'Predictive maintenance and document/insurance tracking (Vault)',
            alternative: 'Limited operational tooling',
            exotiqWins: true,
          },
          {
            capability: 'AI operations assistant',
            exotiq: 'FleetCopilot for fleet questions, scheduling, and tasks',
            alternative: 'Not available',
            exotiqWins: true,
          },
        ],
      }}
      sections={[
        {
          heading: 'Why operators add exotiq on top of Turo',
          body: 'Most serious operators do not abandon Turo; they outgrow what its native tools can do alone. exotiq centralizes pricing, operations, and analytics across every channel so you are not stitching together spreadsheets and tabs.',
          bullets: [
            'Run Turo, Getaround, and direct bookings from one dashboard',
            'Apply consistent, market-aware pricing instead of per-platform guesswork',
            'Reduce commission drag by growing your direct-booking share over time',
            'Catch maintenance and compliance issues before they cost you uptime',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Does exotiq replace Turo?',
          answer: 'No. exotiq is platform-agnostic and designed to work alongside Turo. It sits on top of your channels, including Turo, Getaround, and your direct-booking site, so you can manage them together rather than choosing one.',
        },
        {
          question: 'What does exotiq do that Turo native tools do not?',
          answer: 'exotiq adds cross-platform sync, AI dynamic pricing with operator guardrails, a direct-booking path, predictive maintenance, compliance/document tracking, and an AI operations assistant (FleetCopilot). Turo native tools are scoped to managing your presence on the Turo marketplace.',
        },
        {
          question: 'Will I lose my Turo reviews or history?',
          answer: 'No. exotiq does not change your Turo account or history. It connects to your existing platforms and centralizes operations around them.',
        },
        {
          question: 'How quickly can I get started?',
          answer: 'Onboarding is designed to be fast: most operators can connect their existing accounts and configure settings in under 15 minutes, and every plan includes a 30-day free trial.',
        },
      ]}
      ctaHeading="Run Turo and everything else from one place"
      ctaSubtext="Book a 15-minute demo to see how exotiq layers on top of your current channels."
      relatedLinks={[
        { label: 'Best exotic car rental software', to: '/compare/best-exotic-car-rental-software' },
        { label: 'exotiq vs traditional fleet software', to: '/compare/exotiq-vs-hq-rental' },
        { label: 'Turo host software', to: '/solutions/turo-host-software' },
        { label: 'See pricing', to: '/pricing' },
      ]}
    />
  );
}
