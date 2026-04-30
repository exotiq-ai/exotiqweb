import { supabase } from './supabaseClient';
import type {
  BlogDbPost,
  BlogLinkCheckResult,
  BlogStatus,
  BlogValidationResult,
} from '../types/blog';
import { normalizeSlug, validateBlogPost } from '../lib/blogGuardrails';
import { parseClaudeMarkdownPost } from '../lib/claudeBlogParser';

export interface BlogRoleRecord {
  user_id: string;
  role: 'author' | 'editor' | 'admin';
}

export const BLOG_ROUTES = [
  '/',
  '/about',
  '/features',
  '/pricing',
  '/contact',
  '/survey',
  '/investors',
  '/fleetcopilot',
  '/terms',
  '/privacy',
  '/cookies',
  '/blog',
  '/blog/:slug',
  '/blog/category/:category',
  '/blog/tag/:tag',
];

export const mapDbPost = (row: Record<string, any>): BlogDbPost => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt,
  tldrShort: row.tldr_short,
  tldrBullets: row.tldr_bullets ?? [],
  rariSummaryModes: row.rari_summary_modes ?? { quick: '', operator: '', investor: '' },
  primaryKeyword: row.primary_keyword,
  secondaryKeywords: row.secondary_keywords ?? [],
  searchIntent: row.search_intent,
  funnelStage: row.funnel_stage,
  category: row.category,
  tags: row.tags ?? [],
  author: {
    name: row.author_name,
    role: row.author_role ?? '',
    bio: row.author_bio ?? '',
    profileUrl: row.author_profile_url ?? undefined,
  },
  publishDate: row.published_at ?? row.created_at,
  updatedDate: row.updated_at,
  heroImage: row.hero_image ?? undefined,
  ogImage: row.og_image ?? undefined,
  canonicalUrl: row.canonical_url ?? undefined,
  metaTitle: row.meta_title,
  metaDescription: row.meta_description,
  faqItems: row.faq_items ?? undefined,
  ctaType: row.cta_type,
  ctaCopy: row.cta_copy,
  relatedPosts: row.related_posts ?? [],
  disclosure: row.disclosure ?? undefined,
  status: row.status,
  bodyMarkdown: row.body_markdown,
  createdAt: row.created_at,
  publishedAt: row.published_at,
  createdBy: row.created_by,
  updatedBy: row.updated_by,
});

const toInsertPayload = (post: Partial<BlogDbPost>, actorId?: string | null) => ({
  slug: normalizeSlug(post.slug ?? ''),
  title: post.title,
  excerpt: post.excerpt,
  body_markdown: post.bodyMarkdown,
  status: post.status ?? 'draft',
  meta_title: post.metaTitle,
  meta_description: post.metaDescription,
  canonical_url: post.canonicalUrl ?? null,
  category: post.category,
  tags: post.tags ?? [],
  funnel_stage: post.funnelStage,
  search_intent: post.searchIntent,
  author_name: post.author?.name,
  author_role: post.author?.role ?? null,
  author_bio: post.author?.bio ?? null,
  author_profile_url: post.author?.profileUrl ?? null,
  tldr_short: post.tldrShort,
  tldr_bullets: post.tldrBullets ?? [],
  rari_summary_modes: post.rariSummaryModes ?? { quick: '', operator: '', investor: '' },
  primary_keyword: post.primaryKeyword,
  secondary_keywords: post.secondaryKeywords ?? [],
  cta_type: post.ctaType,
  cta_copy: post.ctaCopy,
  faq_items: post.faqItems ?? null,
  hero_image: post.heroImage ?? null,
  og_image: post.ogImage ?? null,
  related_posts: post.relatedPosts ?? [],
  disclosure: post.disclosure ?? null,
  created_by: actorId ?? null,
  updated_by: actorId ?? null,
});

export const getCurrentBlogRole = async (): Promise<BlogRoleRecord['role'] | null> => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) {
    return null;
  }

  const { data } = await supabase
    .from('blog_roles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();

  return (data?.role as BlogRoleRecord['role']) ?? 'author';
};

export const listAdminPosts = async (status?: BlogStatus): Promise<BlogDbPost[]> => {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapDbPost(row));
};

export const getAdminPostById = async (id: string): Promise<BlogDbPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) {
    throw error;
  }
  return data ? mapDbPost(data) : null;
};

export const checkSlugUniqueness = async (
  slug: string,
  excludePostId?: string
): Promise<boolean> => {
  const normalized = normalizeSlug(slug);

  let query = supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', normalized)
    .limit(1);

  if (excludePostId) {
    query = query.neq('id', excludePostId);
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }

  return (data ?? []).length === 0;
};

export const validatePost = async (
  post: Partial<BlogDbPost>,
  opts?: { excludePostId?: string }
): Promise<{ validation: BlogValidationResult; links: BlogLinkCheckResult[] }> => {
  const validation = validateBlogPost(post);

  if (post.slug) {
    const unique = await checkSlugUniqueness(post.slug, opts?.excludePostId);
    if (!unique) {
      validation.issues.push({
        field: 'slug',
        level: 'error',
        message: 'Slug already exists.',
      });
      validation.isValid = false;
    }
  }

  // Link checking is done server-side only (edge function) to avoid CORS issues.
  // Client-side validatePost returns an empty links array.
  return { validation, links: [] };
};

export const validatePostServer = async (
  post: Partial<BlogDbPost>,
  postId?: string
): Promise<{ validation: BlogValidationResult; links: BlogLinkCheckResult[] } | null> => {
  const { data, error } = await supabase.functions.invoke('blog-admin', {
    body: {
      action: 'validate',
      post,
      postId,
      validRoutes: BLOG_ROUTES,
    },
  });

  if (error) {
    return null;
  }

  return data as { validation: BlogValidationResult; links: BlogLinkCheckResult[] };
};

export const createDraftPost = async (post: Partial<BlogDbPost>): Promise<BlogDbPost> => {
  const { data: userData } = await supabase.auth.getUser();
  const actorId = userData.user?.id ?? null;
  const payload = toInsertPayload({ ...post, status: 'draft' }, actorId);

  const { data, error } = await supabase.from('blog_posts').insert(payload).select('*').single();
  if (error) {
    throw error;
  }

  await createRevision(data.id, payload, 'Initial draft');
  return mapDbPost(data);
};

export const updateDraftPost = async (
  id: string,
  post: Partial<BlogDbPost>,
  changeNote?: string
): Promise<BlogDbPost> => {
  const { data: userData } = await supabase.auth.getUser();
  const actorId = userData.user?.id ?? null;
  const payload = toInsertPayload(post, actorId);

  const { data, error } = await supabase
    .from('blog_posts')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();
  if (error) {
    throw error;
  }

  await createRevision(id, payload, changeNote ?? 'Content update');
  return mapDbPost(data);
};

export const transitionPostStatus = async (
  postId: string,
  nextStatus: BlogStatus,
  note?: string
): Promise<BlogDbPost> => {
  const { data, error } = await supabase.rpc('set_blog_status', {
    post_id: postId,
    next_status: nextStatus,
    note: note ?? null,
  });
  if (error) {
    throw error;
  }
  return mapDbPost(data);
};

export const createRevision = async (
  postId: string,
  snapshot: Record<string, unknown>,
  changeNote?: string
): Promise<void> => {
  const { data: userData } = await supabase.auth.getUser();
  const actorId = userData.user?.id ?? null;

  const { error } = await supabase.from('blog_post_revisions').insert({
    post_id: postId,
    snapshot,
    edited_by: actorId,
    change_note: changeNote ?? null,
  });
  if (error) {
    throw error;
  }
};

export const listRevisions = async (postId: string) => {
  const { data, error } = await supabase
    .from('blog_post_revisions')
    .select('*')
    .eq('post_id', postId)
    .order('edited_at', { ascending: false });
  if (error) {
    throw error;
  }
  return data ?? [];
};

export const upsertLinkChecks = async (
  postId: string,
  results: BlogLinkCheckResult[]
): Promise<void> => {
  if (results.length === 0) {
    return;
  }

  const payload = results.map((result) => ({
    post_id: postId,
    url: result.url,
    link_type: result.linkType,
    status_code: result.statusCode ?? null,
    is_placeholder: result.isPlaceholder,
    last_checked_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from('blog_post_links')
    .upsert(payload, { onConflict: 'post_id,url' });
  if (error) {
    throw error;
  }
};

export const parseClaudePost = (markdown: string): Partial<BlogDbPost> => {
  const parsed = parseClaudeMarkdownPost(markdown);
  return parsed.metadata;
};
