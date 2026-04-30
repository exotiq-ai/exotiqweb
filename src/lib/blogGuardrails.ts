import type {
  BlogDbPost,
  BlogLinkCheckResult,
  BlogValidationIssue,
  BlogValidationResult,
} from '../types/blog';
import { slugifyBlogText } from './blog';

const PLACEHOLDER_HOSTS = ['claude.ai', 'localhost', '127.0.0.1', 'example.com'];
const REQUIRED_FIELDS: Array<keyof BlogDbPost> = [
  'title',
  'slug',
  'excerpt',
  'bodyMarkdown',
  'tldrShort',
  'primaryKeyword',
  'searchIntent',
  'funnelStage',
  'category',
  'metaTitle',
  'metaDescription',
  'ctaType',
  'ctaCopy',
  'author',
];

export const normalizeSlug = (slug: string): string => slugifyBlogText(slug);

const isValidAbsoluteUrl = (value: string): boolean => {
  try {
    const parsed = new URL(value);
    return Boolean(parsed.protocol && parsed.hostname);
  } catch {
    return false;
  }
};

const validateCanonicalUrl = (canonicalUrl?: string): BlogValidationIssue[] => {
  if (!canonicalUrl) {
    return [];
  }

  const issues: BlogValidationIssue[] = [];
  if (!isValidAbsoluteUrl(canonicalUrl)) {
    issues.push({
      field: 'canonicalUrl',
      level: 'error',
      message: 'Canonical URL must be an absolute URL.',
    });
    return issues;
  }

  const url = new URL(canonicalUrl);
  if (url.protocol !== 'https:') {
    issues.push({
      field: 'canonicalUrl',
      level: 'error',
      message: 'Canonical URL must use HTTPS.',
    });
  }

  if (!url.hostname.endsWith('exotiq.ai')) {
    issues.push({
      field: 'canonicalUrl',
      level: 'error',
      message: 'Canonical URL must be on exotiq.ai.',
    });
  }

  return issues;
};

const extractUrls = (content: string): string[] => {
  const markdownLinks = content.match(/\[[^\]]*]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g) ?? [];
  const inlineUrls = content.match(/https?:\/\/[^\s)]+/g) ?? [];

  const markdownUrls = markdownLinks
    .map((match) => match.match(/\((.*?)\)/)?.[1] ?? '')
    .filter(Boolean);

  return Array.from(new Set([...markdownUrls, ...inlineUrls]));
};

const isPlaceholderLink = (url: string): boolean => {
  try {
    if (url.startsWith('/')) {
      return false;
    }

    const parsed = new URL(url);
    return PLACEHOLDER_HOSTS.some((host) => parsed.hostname.includes(host));
  } catch {
    return true;
  }
};

export const checkLinks = async (
  bodyMarkdown: string,
  validInternalRoutes: string[]
): Promise<BlogLinkCheckResult[]> => {
  const urls = extractUrls(bodyMarkdown);

  const checks = urls.map(async (url): Promise<BlogLinkCheckResult> => {
    if (url.startsWith('/')) {
      const isValidInternal = validInternalRoutes.some((route) => {
        if (route.includes(':')) {
          const baseRoute = route.split('/:')[0];
          return url.startsWith(baseRoute);
        }
        return route === url;
      });

      return {
        url,
        linkType: 'internal',
        isPlaceholder: false,
        isValid: isValidInternal,
        message: isValidInternal ? undefined : 'Internal link does not match known routes.',
      };
    }

    if (!isValidAbsoluteUrl(url)) {
      return {
        url,
        linkType: 'external',
        isPlaceholder: true,
        isValid: false,
        message: 'Malformed URL.',
      };
    }

    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') {
      return {
        url,
        linkType: 'external',
        isPlaceholder: false,
        isValid: false,
        message: 'External links must use HTTPS.',
      };
    }

    const placeholder = isPlaceholderLink(url);
    if (placeholder) {
      return {
        url,
        linkType: 'external',
        isPlaceholder: true,
        isValid: false,
        message: 'Placeholder link detected.',
      };
    }

    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return {
          url,
          linkType: 'external',
          isPlaceholder: false,
          isValid: true,
          statusCode: response.status,
        };
      }

      // Retry once with GET for hosts that reject HEAD.
      const retry = await fetch(url, { method: 'GET' });
      return {
        url,
        linkType: 'external',
        isPlaceholder: false,
        isValid: retry.ok || (retry.status >= 500 && retry.status < 600),
        statusCode: retry.status,
        message:
          retry.ok || (retry.status >= 500 && retry.status < 600)
            ? retry.status >= 500
              ? 'Transient server issue (warning).'
              : undefined
            : `External URL returned ${retry.status}.`,
      };
    } catch {
      return {
        url,
        linkType: 'external',
        isPlaceholder: false,
        isValid: true,
        message: 'Network check unavailable, treated as warning.',
      };
    }
  });

  return Promise.all(checks);
};

export const validateBlogPost = (post: Partial<BlogDbPost>): BlogValidationResult => {
  const issues: BlogValidationIssue[] = [];

  REQUIRED_FIELDS.forEach((field) => {
    const value = post[field];
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim().length === 0) ||
      (Array.isArray(value) && value.length === 0)
    ) {
      issues.push({
        field: String(field),
        level: 'error',
        message: `${String(field)} is required.`,
      });
    }
  });

  if (post.slug && post.slug !== normalizeSlug(post.slug)) {
    issues.push({
      field: 'slug',
      level: 'warning',
      message: 'Slug should be normalized to lowercase hyphen format.',
    });
  }

  if (post.metaTitle) {
    if (post.metaTitle.length > 70) {
      issues.push({
        field: 'metaTitle',
        level: 'error',
        message: 'Meta title exceeds hard limit of 70 characters.',
      });
    } else if (post.metaTitle.length > 60) {
      issues.push({
        field: 'metaTitle',
        level: 'warning',
        message: 'Meta title exceeds recommended 60 characters.',
      });
    }
  }

  if (post.metaDescription) {
    if (post.metaDescription.length > 170) {
      issues.push({
        field: 'metaDescription',
        level: 'error',
        message: 'Meta description exceeds hard limit of 170 characters.',
      });
    } else if (post.metaDescription.length > 155) {
      issues.push({
        field: 'metaDescription',
        level: 'warning',
        message: 'Meta description exceeds recommended 155 characters.',
      });
    }
  }

  issues.push(...validateCanonicalUrl(post.canonicalUrl));

  return {
    isValid: !issues.some((issue) => issue.level === 'error'),
    issues,
  };
};
