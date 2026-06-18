import MarketingLanding from '../../components/landing/MarketingLanding';

export default function TuroHostSoftwarePage() {
  return (
    <MarketingLanding
      canonicalPath="/solutions/turo-host-software/"
      metaTitle="Turo Host Software for Serious Fleet Operators | exotiq"
      metaDescription="exotiq is Turo host software built for fleet operators: AI pricing, multi-platform sync, predictive maintenance, and direct bookings in one command center."
      keywords="Turo host software, Turo host tools, fleet management for Turo hosts, Turo Power Host software, Turo automation"
      eyebrow="Solution"
      h1="Turo host software for serious operators"
      intro="If you are scaling past a handful of cars on Turo, you have likely outgrown spreadsheets and the marketplace's built-in tools. exotiq is the command center designed for Turo Power Hosts and multi-vehicle operators who want to run their fleet like a business."
      sections={[
        {
          heading: 'Built for hosts who run fleets, not single cars',
          body: 'exotiq centralizes the work that gets harder with every vehicle you add: pricing, turnover, maintenance, compliance, and guest communication.',
          bullets: [
            'AI dynamic pricing (MotorIQ) tuned to demand, lead time, and local events',
            'Real-time sync across Turo, Getaround, and your direct-booking site',
            'Predictive maintenance and document/insurance tracking (Vault)',
            'A direct-booking path so you keep more of each reservation over time',
            'FleetCopilot AI assistant for scheduling, tasks, and fleet questions',
          ],
        },
        {
          heading: 'Designed to scale without adding headcount',
          body: 'The goal is operational leverage: automate the repetitive work so you can grow utilization and revenue per vehicle without proportionally growing your team. Results vary by fleet and market.',
        },
      ]}
      faqs={[
        {
          question: 'What is the best software for Turo Power Hosts?',
          answer: 'Power Hosts and multi-vehicle operators usually need more than Turo native tools: dynamic pricing, multi-platform sync, maintenance and compliance tracking, and a direct-booking path. exotiq is built around exactly those operator needs while still working alongside Turo.',
        },
        {
          question: 'Does exotiq work with my existing Turo account?',
          answer: 'Yes. exotiq connects to your existing Turo account and is designed to sync inventory and availability in real time, alongside Getaround and your own direct-booking site.',
        },
        {
          question: 'Will exotiq help me reduce commission fees?',
          answer: 'exotiq includes a direct-booking path so you can grow the share of reservations you keep 100% of over time. It is designed to help reduce commission drag rather than guarantee a specific savings figure.',
        },
        {
          question: 'How much does it cost?',
          answer: 'Simple per-vehicle pricing with all features included: Pro is $39/vehicle/month (1-15 vehicles) and Business is $29/vehicle/month (16-50 vehicles), with custom Enterprise pricing for 51+ vehicles and a 30-day free trial.',
        },
      ]}
      ctaHeading="Run your Turo fleet like a business"
      ctaSubtext="Book a 15-minute demo and see exotiq configured for your vehicles and channels."
      relatedLinks={[
        { label: 'exotiq vs Turo native tools', to: '/compare/exotiq-vs-turo' },
        { label: 'Best exotic car rental software', to: '/compare/best-exotic-car-rental-software' },
        { label: 'Exotic car rental software', to: '/solutions/exotic-car-rental-software' },
        { label: 'See pricing', to: '/pricing' },
      ]}
    />
  );
}
