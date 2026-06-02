import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
  structuredData?: object;
}

const BRAND_NAME = 'exotiq';
const DEFAULT_TITLE = 'exotiq — The AI command center for exotic car rental operations';
const DEFAULT_DESCRIPTION =
  'exotiq is the AI command center for exotic car rental operators. Automate pricing, maintenance, and operations. Keep 100% of your direct booking revenue.';

function formatTitle(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('exotiq')) {
    return title;
  }
  return `${title} | ${BRAND_NAME}`;
}

export default function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = "fleet management software, Turo hosting tools, vehicle rental automation, AI pricing optimization, car sharing platform, fleet analytics, rental business software, automotive SaaS, peer-to-peer car sharing, fleet operations",
  image = "https://exotiq.ai/og-exotiq-ai-fleet.png",
  url = "https://exotiq.ai",
  type = "website",
  author = "Exotiq Team",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  canonical,
  structuredData
}: SEOHeadProps) {
  const fullTitle = formatTitle(title);
  const currentUrl = canonical || url;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={currentUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={BRAND_NAME} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@Exotiqai" />
      <meta name="twitter:site" content="@Exotiqai" />
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="application-name" content={BRAND_NAME} />
      <meta name="apple-mobile-web-app-title" content={BRAND_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta httpEquiv="content-language" content="en-US" />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
