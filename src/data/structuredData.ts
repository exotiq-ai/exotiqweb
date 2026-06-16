// Structured Data for SEO
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "exotiq",
  "alternateName": "Exotiq",
  "url": "https://exotiq.ai",
  "logo": "https://exotiq.ai/brand/exotiq-lockup-horizontal-white.svg",
  "description": "exotiq is the AI command center for exotic car rental operators. Optimize operations and maximize margins for rental fleet hosts.",
  "foundingDate": "2024-01-01",
  "founders": [
    {
      "@type": "Person",
      "name": "Exotiq Founding Team"
    }
  ],
  "industry": "Software as a Service (SaaS)",
  "numberOfEmployees": "2-10",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "Remote-first"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@exotiq.ai",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.linkedin.com/company/driveexotiq",
    "https://twitter.com/Exotiqai"
  ],
  "knowsAbout": [
    "Fleet Management Software",
    "AI-powered Pricing Optimization",
    "Vehicle Rental Automation",
    "Turo Host Tools",
    "Car Sharing Platform Technology",
    "Predictive Maintenance",
    "Revenue Optimization"
  ],
  "offers": {
    "@type": "Offer",
    "category": "Software",
    "description": "Fleet management software for vehicle rental operations"
  }
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "exotiq",
  "description": "The AI command center for exotic car rental operators. Automates pricing, maintenance, and operations for vehicle rental businesses and Turo hosts.",
  "url": "https://exotiq.ai",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web-based, iOS, Android",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "29",
    "highPrice": "39",
    "offerCount": "3",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2027-12-31",
    "description": "Per-vehicle pricing, all features included: Pro $39/vehicle/mo (1–15 vehicles), Business $29/vehicle/mo (16–50), Enterprise for 51+. 30-day free trial, zero commission fees."
  },
  "featureList": [
    "AI-powered dynamic pricing optimization",
    "Automated maintenance scheduling and tracking",
    "Real-time fleet analytics and performance metrics",
    "Multi-platform integration (Turo, Getaround, direct bookings)",
    "White-labeled direct booking portal",
    "Comprehensive financial reporting and revenue insights",
    "AI-powered guest communication automation",
    "Predictive maintenance alerts",
    "FleetCopilot AI assistant for 24/7 operations support",
    "Compliance and documentation management"
  ],
  "screenshot": "https://exotiq.ai/og-exotiq-ai-fleet.png",
  "softwareVersion": "1.0",
  "datePublished": "2024-01-01",
  "author": {
    "@type": "Organization",
    "name": "exotiq"
  }
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does exotiq differentiate from traditional fleet management software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike legacy tools that rely on static rules, exotiq uses generative AI to proactively support operations, helping with claims, insurance usage, and maintenance planning before issues become breakdowns, acting as an operational co-pilot. Traditional fleet management software requires manual input and reactive decision-making, while exotiq is designed to automate much of the repetitive operational work including pricing optimization, guest communications, and predictive maintenance."
      }
    },
    {
      "@type": "Question",
      "name": "Does exotiq support multi-platform fleet synchronization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Exotiq provides real-time synchronization across Turo, Getaround, and private direct-booking websites. This unified inventory management prevents double-bookings and centralizes financial analytics into a single dashboard. All pricing updates, availability changes, and booking confirmations sync automatically across all platforms in real-time."
      }
    },
    {
      "@type": "Question",
      "name": "What specific operational tasks can the AI Autopilot automate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Exotiq Autopilot automates much of the manual operational work, including guest vetting, check-in/check-out instructions, toll reimbursement processing, damage claim documentation, and automated review management. It also handles dynamic pricing adjustments, maintenance scheduling, insurance claim coordination, and 24/7 guest communication through our FleetCopilot AI assistant."
      }
    },
    {
      "@type": "Question",
      "name": "Is exotiq suitable for scaling from a side-hustle to an enterprise fleet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exotiq is architected for scalability. It supports fleets ranging from 5 vehicles to enterprise operations with 500+ units, offering advanced features like sub-host management, dynamic market pricing, and predictive fleet utilization analytics. Our tiered pricing grows with your business, and the AI automation ensures you can scale operations without proportionally increasing your payroll."
      }
    },
    {
      "@type": "Question",
      "name": "How does exotiq handle data security and guest privacy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "exotiq employs enterprise-grade encryption for all fleet and guest data. We adhere to strict data privacy standards, ensuring that guest communications and vehicle telemetry data are processed securely and never shared with unauthorized third parties. All data is encrypted in transit and at rest, and we maintain SOC 2 compliance standards for data security."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can I onboard my existing fleet to exotiq?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Onboarding is streamlined via automated platform integrations. Most users can sync their existing Turo or car rental accounts and fully configure their AI settings within less than 15 minutes. Our one-click integration connects to your existing platforms, imports your vehicle data, and the AI begins learning your pricing patterns immediately."
      }
    },
    {
      "@type": "Question",
      "name": "How much does exotiq cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "exotiq offers simple per-vehicle pricing. Pro is $39/vehicle/month for 1–15 vehicles. Business is $29/vehicle/month for 16–50 vehicles. Enterprise pricing is available for 51+ vehicles. All features are included on every plan with a 30-day free trial, no credit card required. Unlike platform-based solutions, there are zero commission fees, so you keep 100% of your direct booking revenue."
      }
    },
    {
      "@type": "Question",
      "name": "How does the AI pricing work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI pricing engine analyzes market demand, competitor rates, seasonal patterns, and local events to automatically optimize your vehicle pricing for maximum revenue. It adjusts rates in real-time based on market conditions, learning from booking patterns and conversion rates to continuously improve pricing accuracy. The system monitors over 50 data points per vehicle to identify revenue opportunities."
      }
    }
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "exotiq",
  "url": "https://exotiq.ai",
  "description": "The AI command center for exotic car rental operators.",
  "publisher": {
    "@type": "Organization",
    "name": "exotiq",
    "url": "https://exotiq.ai"
  },
  "inLanguage": "en-US"
};

// Detailed, tiered pricing schema for /pricing. Prices mirror the source of
// truth in src/data/pricingData.ts (Pro $39, Business $29, Enterprise custom).
export const pricingProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "exotiq AI Fleet Management Platform",
  "description": "Per-vehicle AI fleet management software for exotic and luxury car rental operators. All features included on every plan, zero commission fees, 30-day free trial.",
  "brand": {
    "@type": "Brand",
    "name": "exotiq"
  },
  "url": "https://exotiq.ai/pricing",
  "image": "https://exotiq.ai/og-exotiq-ai-fleet.png",
  "offers": [
    {
      "@type": "Offer",
      "name": "Pro",
      "price": "39",
      "priceCurrency": "USD",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://exotiq.ai/pricing",
      "description": "$39 per vehicle / month for fleets of 1–15 vehicles. All features included. 30-day free trial, no credit card required."
    },
    {
      "@type": "Offer",
      "name": "Business",
      "price": "29",
      "priceCurrency": "USD",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://exotiq.ai/pricing",
      "description": "$29 per vehicle / month for fleets of 16–50 vehicles. All features included, volume pricing."
    },
    {
      "@type": "Offer",
      "name": "Enterprise",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://exotiq.ai/pricing",
      "description": "Custom pricing for fleets of 51+ vehicles with dedicated support."
    }
  ]
};

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Fleet Management Software",
  "description": "AI-powered fleet management platform for vehicle rental operations",
  "provider": {
    "@type": "Organization",
    "name": "exotiq"
  },
  "serviceType": "Software as a Service",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Fleet Management Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Pricing Optimization"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Maintenance Scheduling"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fleet Analytics"
        }
      }
    ]
  }
};