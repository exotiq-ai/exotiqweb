import { parse as parseYaml } from 'yaml';
import type { BlogAuthor, BlogDbPost } from '../types/blog';
import { normalizeSlug } from './blogGuardrails';

interface ParsedClaudeMarkdown {
  metadata: Partial<BlogDbPost>;
  articleMarkdown: string;
}

const getMetadataBlock = (input: string): string => {
  const match = input.match(/##\s*\*\*Metadata\*\*[\s\S]*?```([\s\S]*?)```/i);
  return match?.[1]?.trim() ?? '';
};

const getArticleBlock = (input: string): string => {
  const articleMatch = input.match(/##\s*\*\*Full Article\*\*([\s\S]*)$/i);
  return articleMatch?.[1]?.trim() ?? input.trim();
};

const sanitizeString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item) => sanitizeString(item)).filter(Boolean);
};

const toAuthor = (value: unknown): BlogAuthor => {
  if (!value || typeof value !== 'object') {
    return {
      name: '',
      role: '',
      bio: '',
    };
  }

  const source = value as Record<string, unknown>;
  return {
    name: sanitizeString(source.name),
    role: sanitizeString(source.role),
    bio: sanitizeString(source.bio),
    profileUrl: sanitizeString(source.profile_url || source.profileUrl),
  };
};

const toSummaryModes = (value: unknown) => {
  const source = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>;
  return {
    quick: sanitizeString(source.quick),
    operator: sanitizeString(source.operator),
    investor: sanitizeString(source.investor),
  };
};

export const parseClaudeMarkdownPost = (input: string): ParsedClaudeMarkdown => {
  const metadataYaml = getMetadataBlock(input);
  const articleMarkdown = getArticleBlock(input);

  const rawMetadata = metadataYaml ? (parseYaml(metadataYaml) as Record<string, unknown>) : {};

  const slug = normalizeSlug(sanitizeString(rawMetadata.slug));
  const author = toAuthor(rawMetadata.author);

  const metadata: Partial<BlogDbPost> = {
    title: sanitizeString(rawMetadata.title),
    slug,
    excerpt: sanitizeString(rawMetadata.excerpt),
    tldrShort: sanitizeString(rawMetadata.tldr_short),
    tldrBullets: toStringArray(rawMetadata.tldr_bullets),
    rariSummaryModes: toSummaryModes(rawMetadata.rari_summary_modes),
    primaryKeyword: sanitizeString(rawMetadata.primary_keyword),
    secondaryKeywords: toStringArray(rawMetadata.secondary_keywords),
    searchIntent: sanitizeString(rawMetadata.search_intent) as BlogDbPost['searchIntent'],
    funnelStage: sanitizeString(rawMetadata.funnel_stage) as BlogDbPost['funnelStage'],
    category: sanitizeString(rawMetadata.category),
    tags: toStringArray(rawMetadata.tags),
    author,
    publishDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    metaTitle: sanitizeString(rawMetadata.meta_title),
    metaDescription: sanitizeString(rawMetadata.meta_description),
    canonicalUrl: sanitizeString(rawMetadata.canonical_url),
    ctaType: sanitizeString(rawMetadata.cta_type) as BlogDbPost['ctaType'],
    ctaCopy: sanitizeString(rawMetadata.cta_copy),
    bodyMarkdown: articleMarkdown,
    status: 'draft',
  };

  return {
    metadata,
    articleMarkdown,
  };
};
