import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

type BlogStatus = 'draft' | 'in_review' | 'approved' | 'published' | 'archived';
type BlogRole = 'author' | 'editor' | 'admin';

const PLACEHOLDER_HOSTS = ['claude.ai', 'localhost', '127.0.0.1', 'example.com'];

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const adminClient = createClient(supabaseUrl, supabaseServiceRoleKey);

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });

const normalizeSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

const isValidAbsoluteUrl = (value: string): boolean => {
  try {
    const parsed = new URL(value);
    return Boolean(parsed.protocol && parsed.hostname);
  } catch {
    return false;
  }
};

const extractUrls = (content: string): string[] => {
  const markdownLinks = content.match(/\[[^\]]*]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g) ?? [];
  const inlineUrls = content.match(/https?:\/\/[^\s)]+/g) ?? [];

  const markdownUrls = markdownLinks
    .map((match) => match.match(/\((.*?)\)/)?.[1] ?? '')
    .filter(Boolean);

  return Array.from(new Set([...markdownUrls, ...inlineUrls]));
};

const checkLinks = async (bodyMarkdown: string, validRoutes: string[]) => {
  const urls = extractUrls(bodyMarkdown);
  const results = await Promise.all(
    urls.map(async (url) => {
      if (url.startsWith('/')) {
        const isValidRoute = validRoutes.some((route) => {
          if (route.includes(':')) {
            return url.startsWith(route.split('/:')[0]);
          }
          return route === url;
        });
        return {
          url,
          linkType: 'internal',
          isValid: isValidRoute,
          isPlaceholder: false,
          message: isValidRoute ? undefined : 'Internal route not recognized.',
        };
      }

      if (!isValidAbsoluteUrl(url)) {
        return {
          url,
          linkType: 'external',
          isValid: false,
          isPlaceholder: true,
          message: 'Malformed URL.',
        };
      }

      const parsed = new URL(url);
      const placeholder = PLACEHOLDER_HOSTS.some((host) => parsed.hostname.includes(host));
      if (placeholder) {
        return {
          url,
          linkType: 'external',
          isValid: false,
          isPlaceholder: true,
          message: 'Placeholder link detected.',
        };
      }

      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
          return {
            url,
            linkType: 'external',
            isValid: true,
            isPlaceholder: false,
            statusCode: response.status,
          };
        }

        return {
          url,
          linkType: 'external',
          isValid: response.status >= 500 && response.status < 600,
          isPlaceholder: false,
          statusCode: response.status,
          message:
            response.status >= 500 && response.status < 600
              ? 'Transient server issue (warning).'
              : `External URL returned ${response.status}.`,
        };
      } catch {
        return {
          url,
          linkType: 'external',
          isValid: true,
          isPlaceholder: false,
          message: 'External validation skipped (network).',
        };
      }
    })
  );

  return results;
};

const isSlugUnique = async (slug: string, excludePostId?: string): Promise<boolean> => {
  const normalized = normalizeSlug(slug);
  let query = adminClient.from('blog_posts').select('id').eq('slug', normalized).limit(1);

  if (excludePostId) {
    query = query.neq('id', excludePostId);
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }

  return (data ?? []).length === 0;
};

const getUserRole = async (userId: string): Promise<BlogRole> => {
  const { data, error } = await adminClient
    .from('blog_roles')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) {
    throw error;
  }
  return (data?.role as BlogRole) ?? 'author';
};

const canWriteAction = (
  role: BlogRole,
  action: 'create' | 'update' | 'transition'
): boolean => {
  if (action === 'transition') {
    return role === 'editor' || role === 'admin';
  }
  return role === 'author' || role === 'editor' || role === 'admin';
};

const validatePayload = (payload: Record<string, unknown>) => {
  const required = [
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
  ];

  const issues: Array<{ field: string; level: 'error' | 'warning'; message: string }> = [];

  required.forEach((key) => {
    const value = payload[key];
    if (value === undefined || value === null || String(value).trim().length === 0) {
      issues.push({
        field: key,
        level: 'error',
        message: `${key} is required.`,
      });
    }
  });

  if (typeof payload.metaTitle === 'string') {
    if (payload.metaTitle.length > 70) {
      issues.push({ field: 'metaTitle', level: 'error', message: 'Meta title exceeds 70 chars.' });
    } else if (payload.metaTitle.length > 60) {
      issues.push({ field: 'metaTitle', level: 'warning', message: 'Meta title exceeds 60 chars.' });
    }
  }

  if (typeof payload.metaDescription === 'string') {
    if (payload.metaDescription.length > 170) {
      issues.push({ field: 'metaDescription', level: 'error', message: 'Meta description exceeds 170 chars.' });
    } else if (payload.metaDescription.length > 155) {
      issues.push({ field: 'metaDescription', level: 'warning', message: 'Meta description exceeds 155 chars.' });
    }
  }

  if (payload.canonicalUrl) {
    const canonicalUrl = String(payload.canonicalUrl);
    if (!isValidAbsoluteUrl(canonicalUrl)) {
      issues.push({
        field: 'canonicalUrl',
        level: 'error',
        message: 'Canonical URL must be absolute.',
      });
    } else {
      const parsed = new URL(canonicalUrl);
      if (!parsed.hostname.endsWith('exotiq.ai') || parsed.protocol !== 'https:') {
        issues.push({
          field: 'canonicalUrl',
          level: 'error',
          message: 'Canonical URL must be HTTPS and on exotiq.ai.',
        });
      }
    }
  }

  return {
    isValid: !issues.some((issue) => issue.level === 'error'),
    issues,
  };
};

const mapToDbPayload = (payload: Record<string, unknown>, userId: string) => ({
  slug: normalizeSlug(String(payload.slug ?? '')),
  title: payload.title,
  excerpt: payload.excerpt,
  body_markdown: payload.bodyMarkdown,
  status: (payload.status as BlogStatus) ?? 'draft',
  meta_title: payload.metaTitle,
  meta_description: payload.metaDescription,
  canonical_url: payload.canonicalUrl ?? null,
  category: payload.category,
  tags: payload.tags ?? [],
  funnel_stage: payload.funnelStage,
  search_intent: payload.searchIntent,
  author_name: (payload.author as Record<string, unknown>)?.name ?? '',
  author_role: (payload.author as Record<string, unknown>)?.role ?? null,
  author_bio: (payload.author as Record<string, unknown>)?.bio ?? null,
  author_profile_url: (payload.author as Record<string, unknown>)?.profileUrl ?? null,
  tldr_short: payload.tldrShort,
  tldr_bullets: payload.tldrBullets ?? [],
  rari_summary_modes: payload.rariSummaryModes ?? { quick: '', operator: '', investor: '' },
  primary_keyword: payload.primaryKeyword,
  secondary_keywords: payload.secondaryKeywords ?? [],
  cta_type: payload.ctaType,
  cta_copy: payload.ctaCopy,
  faq_items: payload.faqItems ?? null,
  hero_image: payload.heroImage ?? null,
  og_image: payload.ogImage ?? null,
  related_posts: payload.relatedPosts ?? [],
  disclosure: payload.disclosure ?? null,
  created_by: userId,
  updated_by: userId,
});

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return jsonResponse({ error: 'Supabase service credentials are not configured.' }, 500);
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return jsonResponse({ error: 'Missing authorization header.' }, 401);
  }

  const token = authHeader.replace('Bearer ', '').trim();
  const { data: authData, error: authError } = await adminClient.auth.getUser(token);
  if (authError || !authData.user) {
    return jsonResponse({ error: 'Unauthorized.' }, 401);
  }

  const userId = authData.user.id;
  const payload = await req.json();
  const action = payload.action as string;
  const role = await getUserRole(userId);

  if (action === 'validate') {
    const postPayload = (payload.post ?? {}) as Record<string, unknown>;
    const validation = validatePayload(postPayload);
    const rawSlug = String(postPayload.slug ?? '').trim();

    if (rawSlug) {
      const slugIsUnique = await isSlugUnique(
        rawSlug,
        typeof payload.postId === 'string' ? payload.postId : undefined
      );
      if (!slugIsUnique) {
        validation.issues.push({
          field: 'slug',
          level: 'error',
          message: 'Slug already exists.',
        });
        validation.isValid = false;
      }
    }

    const links = await checkLinks(String((payload.post ?? {}).bodyMarkdown ?? ''), payload.validRoutes ?? []);
    const hasHardLinkErrors = links.some(
      (link) => !link.isValid && (link.isPlaceholder || link.message !== 'Transient server issue (warning).')
    );

    if (hasHardLinkErrors) {
      validation.issues.push({
        field: 'bodyMarkdown',
        level: 'error',
        message: 'Invalid or placeholder links detected.',
      });
      validation.isValid = false;
    }

    return jsonResponse({ validation, links });
  }

  if (action === 'create') {
    if (!canWriteAction(role, 'create')) {
      return jsonResponse({ error: 'Forbidden.' }, 403);
    }
    const dbPayload = mapToDbPayload(payload.post ?? {}, userId);
    if (role === 'author') {
      dbPayload.status = 'draft';
    }
    const { data, error } = await adminClient
      .from('blog_posts')
      .insert(dbPayload)
      .select('*')
      .single();
    if (error) {
      return jsonResponse({ error: error.message }, 400);
    }
    return jsonResponse({ post: data });
  }

  if (action === 'update') {
    if (!canWriteAction(role, 'update')) {
      return jsonResponse({ error: 'Forbidden.' }, 403);
    }
    if (typeof payload.postId !== 'string') {
      return jsonResponse({ error: 'postId is required for update action.' }, 400);
    }
    const { data: existingPost, error: existingPostError } = await adminClient
      .from('blog_posts')
      .select('id, status, created_by')
      .eq('id', payload.postId)
      .maybeSingle();
    if (existingPostError) {
      return jsonResponse({ error: existingPostError.message }, 400);
    }
    if (!existingPost) {
      return jsonResponse({ error: 'Post not found.' }, 404);
    }
    if (role === 'author' && existingPost.created_by !== userId) {
      return jsonResponse({ error: 'Forbidden.' }, 403);
    }

    const dbPayload = mapToDbPayload(payload.post ?? {}, userId);
    if (role === 'author') {
      if (
        typeof payload.post === 'object' &&
        payload.post &&
        'status' in (payload.post as Record<string, unknown>) &&
        (payload.post as Record<string, unknown>).status !== existingPost.status
      ) {
        return jsonResponse({ error: 'Authors cannot change status directly.' }, 403);
      }
      dbPayload.status = existingPost.status as BlogStatus;
      dbPayload.created_by = existingPost.created_by;
    }
    const { data, error } = await adminClient
      .from('blog_posts')
      .update(dbPayload)
      .eq('id', payload.postId)
      .select('*')
      .single();
    if (error) {
      return jsonResponse({ error: error.message }, 400);
    }
    return jsonResponse({ post: data });
  }

  if (action === 'transition') {
    if (!canWriteAction(role, 'transition')) {
      return jsonResponse({ error: 'Forbidden.' }, 403);
    }
    if (typeof payload.postId !== 'string' || typeof payload.nextStatus !== 'string') {
      return jsonResponse({ error: 'postId and nextStatus are required for transition action.' }, 400);
    }
    const { data: existingPost, error: existingPostError } = await adminClient
      .from('blog_posts')
      .select('*')
      .eq('id', payload.postId)
      .maybeSingle();
    if (existingPostError) {
      return jsonResponse({ error: existingPostError.message }, 400);
    }
    if (!existingPost) {
      return jsonResponse({ error: 'Post not found.' }, 404);
    }

    const { data: canTransition, error: transitionError } = await adminClient.rpc(
      'can_transition_blog_status',
      {
        current_status: existingPost.status,
        next_status: payload.nextStatus,
        actor_role: role,
      }
    );
    if (transitionError) {
      return jsonResponse({ error: transitionError.message }, 400);
    }
    if (!canTransition) {
      return jsonResponse({ error: 'Transition not allowed for role.' }, 403);
    }

    const { data: updatedPost, error: updateError } = await adminClient
      .from('blog_posts')
      .update({
        status: payload.nextStatus as BlogStatus,
        published_at:
          payload.nextStatus === 'published'
            ? new Date().toISOString()
            : existingPost.published_at ?? null,
        updated_by: userId,
      })
      .eq('id', payload.postId)
      .select('*')
      .single();
    if (updateError) {
      return jsonResponse({ error: updateError.message }, 400);
    }

    const { error: auditError } = await adminClient.from('blog_workflow_audit').insert({
      post_id: payload.postId,
      from_status: existingPost.status,
      to_status: payload.nextStatus,
      actor_id: userId,
      note: payload.note ?? 'Transition via blog-admin edge function',
    });
    if (auditError) {
      return jsonResponse({ error: auditError.message }, 400);
    }

    return jsonResponse({ post: updatedPost });
  }

  if (action === 'check_links') {
    const links = await checkLinks(String(payload.bodyMarkdown ?? ''), payload.validRoutes ?? []);
    return jsonResponse({ links });
  }

  return jsonResponse({ error: 'Unsupported action.' }, 400);
});
