import type { ComponentType } from 'react';

export type FunnelStage = 'TOFU' | 'MOFU' | 'BOFU';
export type SearchIntent = 'informational' | 'comparison' | 'transactional';
export type BlogStatus = 'draft' | 'in_review' | 'approved' | 'published' | 'archived';

export interface BlogAuthor {
  name: string;
  role: string;
  bio: string;
  profileUrl?: string;
}

export interface BlogSummaryModes {
  quick: string;
  operator: string;
  investor: string;
}

export interface BlogFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  tldrShort: string;
  tldrBullets: string[];
  rariSummaryModes: BlogSummaryModes;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  funnelStage: FunnelStage;
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishDate: string;
  updatedDate: string;
  heroImage?: string;
  ogImage?: string;
  canonicalUrl?: string;
  metaTitle: string;
  metaDescription: string;
  faqItems?: Array<{ question: string; answer: string }>;
  ctaType: 'demo' | 'waitlist' | 'newsletter' | 'calculator';
  ctaCopy: string;
  relatedPosts?: string[];
  disclosure?: string;
}

export interface BlogHeading {
  id: string;
  level: 2 | 3;
  text: string;
}

export interface BlogPost extends BlogFrontmatter {
  content: ComponentType;
  rawContent: string;
  readingTimeMinutes: number;
  headings: BlogHeading[];
}

export interface BlogDbPost extends Omit<BlogFrontmatter, 'publishDate' | 'updatedDate'> {
  id: string;
  status: BlogStatus;
  bodyMarkdown: string;
  publishDate: string;
  updatedDate: string;
  createdAt: string;
  publishedAt?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
}

export interface BlogValidationIssue {
  field: string;
  level: 'error' | 'warning';
  message: string;
}

export interface BlogValidationResult {
  isValid: boolean;
  issues: BlogValidationIssue[];
}

export interface BlogLinkCheckResult {
  url: string;
  linkType: 'internal' | 'external';
  isPlaceholder: boolean;
  isValid: boolean;
  statusCode?: number;
  message?: string;
}

