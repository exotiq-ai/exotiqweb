import { useEffect, useMemo, useState } from 'react';
import type { BlogDbPost } from '../types/blog';
import { getPublishedBlogPostBySlug, getPublishedBlogPosts } from '../services/blogReadService';
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getHeadingsFromMarkdown,
  getReadingTimeFromContent,
} from '../lib/blog';

type BlogSourceMode = 'hybrid' | 'supabase' | 'mdx';
const BLOG_SOURCE_MODE: BlogSourceMode =
  import.meta.env.VITE_BLOG_CONTENT_SOURCE === 'supabase'
    ? 'supabase'
    : import.meta.env.VITE_BLOG_CONTENT_SOURCE === 'mdx'
      ? 'mdx'
      : 'hybrid';

const mapMdxToDbShape = (post: ReturnType<typeof getAllBlogPosts>[number]): BlogDbPost => ({
  id: `mdx:${post.slug}`,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  tldrShort: post.tldrShort,
  tldrBullets: post.tldrBullets,
  rariSummaryModes: post.rariSummaryModes,
  primaryKeyword: post.primaryKeyword,
  secondaryKeywords: post.secondaryKeywords,
  searchIntent: post.searchIntent,
  funnelStage: post.funnelStage,
  category: post.category,
  tags: post.tags,
  author: post.author,
  publishDate: post.publishDate,
  updatedDate: post.updatedDate,
  heroImage: post.heroImage,
  ogImage: post.ogImage,
  canonicalUrl: post.canonicalUrl,
  metaTitle: post.metaTitle,
  metaDescription: post.metaDescription,
  faqItems: post.faqItems,
  ctaType: post.ctaType,
  ctaCopy: post.ctaCopy,
  relatedPosts: post.relatedPosts,
  disclosure: post.disclosure,
  status: 'published',
  bodyMarkdown: post.rawContent.replace(/^export const metadata = \{[\s\S]*?\};\s*/m, ''),
  createdAt: post.publishDate,
  publishedAt: post.publishDate,
  createdBy: null,
  updatedBy: null,
});

const mergePostsBySlug = (preferred: BlogDbPost[], fallback: BlogDbPost[]): BlogDbPost[] => {
  const bySlug = new Map<string, BlogDbPost>();
  preferred.forEach((post) => bySlug.set(post.slug, post));
  fallback.forEach((post) => {
    if (!bySlug.has(post.slug)) {
      bySlug.set(post.slug, post);
    }
  });

  return Array.from(bySlug.values()).sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
};

export const usePublishedBlogPosts = () => {
  const [posts, setPosts] = useState<BlogDbPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'mdx' | 'hybrid'>('hybrid');

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const mdxPosts = getAllBlogPosts().map(mapMdxToDbShape);
      let supabasePosts: BlogDbPost[] = [];

      try {
        supabasePosts = await getPublishedBlogPosts();
      } catch {
        supabasePosts = [];
      }

      if (!mounted) {
        return;
      }

      if (BLOG_SOURCE_MODE === 'supabase') {
        setPosts(supabasePosts);
        setSource('supabase');
      } else if (BLOG_SOURCE_MODE === 'mdx') {
        setPosts(mdxPosts);
        setSource('mdx');
      } else {
        setPosts(mergePostsBySlug(supabasePosts, mdxPosts));
        setSource(supabasePosts.length > 0 ? 'hybrid' : 'mdx');
      }
      setLoading(false);
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  return { posts, loading, source };
};

export const usePublishedBlogPost = (slug?: string) => {
  const [post, setPost] = useState<BlogDbPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'mdx' | 'hybrid'>('hybrid');

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!slug) {
        setPost(null);
        setLoading(false);
        return;
      }

      const mdxPost = getBlogPostBySlug(slug);

      if (BLOG_SOURCE_MODE !== 'mdx') {
        try {
          const supabasePost = await getPublishedBlogPostBySlug(slug);
          if (!mounted) {
            return;
          }
          if (supabasePost) {
            setPost(supabasePost);
            setSource(BLOG_SOURCE_MODE === 'hybrid' ? 'hybrid' : 'supabase');
            setLoading(false);
            return;
          }
        } catch {
          // fallback below
        }
      }

      if (!mounted) {
        return;
      }

      if (BLOG_SOURCE_MODE === 'supabase') {
        setPost(null);
        setSource('supabase');
      } else {
        setPost(mdxPost ? mapMdxToDbShape(mdxPost) : null);
        setSource('mdx');
      }
      setLoading(false);
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const readingTimeMinutes = useMemo(
    () => getReadingTimeFromContent(post?.bodyMarkdown ?? ''),
    [post?.bodyMarkdown]
  );
  const headings = useMemo(
    () => getHeadingsFromMarkdown(post?.bodyMarkdown ?? ''),
    [post?.bodyMarkdown]
  );

  return { post, loading, source, readingTimeMinutes, headings };
};
