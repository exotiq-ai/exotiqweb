import { supabase } from './supabaseClient';
import type { BlogDbPost } from '../types/blog';
import { mapDbPost } from './blogAdminService';

export const getPublishedBlogPosts = async (): Promise<BlogDbPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => mapDbPost(row));
};

export const getPublishedBlogPostBySlug = async (slug: string): Promise<BlogDbPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapDbPost(data) : null;
};
