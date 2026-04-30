import type { BlogFrontmatter, BlogHeading, BlogPost } from '../types/blog';

type BlogModule = {
  default: BlogPost['content'];
  metadata: BlogFrontmatter;
};

const postModules = import.meta.glob('/src/content/blog/*.mdx', {
  eager: true,
}) as Record<string, BlogModule>;

const rawModules = import.meta.glob('/src/content/blog/*.mdx', {
  eager: true,
  query: '?raw',
}) as Record<string, unknown>;

const WORDS_PER_MINUTE = 220;

const toRawString = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (
    value &&
    typeof value === 'object' &&
    'default' in value &&
    typeof (value as { default: unknown }).default === 'string'
  ) {
    return (value as { default: string }).default;
  }
  return '';
};

export const getReadingTimeFromContent = (content: string): number => {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`.*?`/g, ' ')
    .replace(/[#>*_\-[\]()]/g, ' ')
    .trim();
  const words = cleanContent.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

export const slugifyBlogText = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

export const formatTaxonomyLabel = (value: string): string =>
  value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const getHeadingsFromMarkdown = (rawContent: string): BlogHeading[] => {
  const headingLines = rawContent.match(/^#{2,3}\s+.+$/gm) ?? [];

  return headingLines.map((line) => {
    const level = line.startsWith('###') ? 3 : 2;
    const text = line
      .replace(/^#{2,3}\s+/, '')
      .replace(/[*_`[\]]/g, '')
      .replace(/\((.*?)\)/g, '$1')
      .trim();

    return {
      id: slugifyBlogText(text),
      level,
      text,
    };
  });
};

const normalizePost = (path: string, module: BlogModule): BlogPost => {
  const rawContent = toRawString(rawModules[path]);

  return {
    ...module.metadata,
    content: module.default,
    rawContent,
    readingTimeMinutes: getReadingTimeFromContent(rawContent),
    headings: getHeadingsFromMarkdown(rawContent),
  };
};

const blogPosts = Object.entries(postModules)
  .map(([path, module]) => normalizePost(path, module))
  .sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

export const getAllBlogPosts = (): BlogPost[] => blogPosts;

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);

export const getBlogCategories = (): string[] =>
  Array.from(new Set(blogPosts.map((post) => post.category))).sort();

export const getBlogTags = (): string[] =>
  Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort();

export const getBlogPostsByCategory = (category: string): BlogPost[] =>
  blogPosts.filter((post) => post.category === category);

export const getBlogPostsByTag = (tag: string): BlogPost[] =>
  blogPosts.filter((post) => post.tags.includes(tag));

export const searchBlogPosts = (query: string): BlogPost[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return blogPosts;
  }

  return blogPosts.filter((post) => {
    const searchCorpus = [
      post.title,
      post.excerpt,
      post.primaryKeyword,
      post.secondaryKeywords.join(' '),
      post.tags.join(' '),
      post.category,
      post.rawContent,
    ]
      .join(' ')
      .toLowerCase();

    return searchCorpus.includes(normalized);
  });
};

