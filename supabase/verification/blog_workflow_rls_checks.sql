-- Manual verification queries for blog workflow hardening.
-- Run these in Supabase SQL editor with representative author/editor/admin accounts.

-- 1) Author: direct publish update should fail.
-- update public.blog_posts
-- set status = 'published', updated_by = auth.uid()
-- where id = '<author_owned_post_uuid>';

-- 2) Author: content update with unchanged status should succeed.
-- update public.blog_posts
-- set excerpt = 'Updated excerpt', updated_by = auth.uid()
-- where id = '<author_owned_post_uuid>';

-- 3) Author: allowed transition path should succeed through RPC.
-- select public.set_blog_status(
--   '<author_owned_post_uuid>'::uuid,
--   'in_review',
--   'Submit draft for review'
-- );

-- 4) Editor/Admin: direct status update may be allowed by policy, but workflow should use RPC.
-- select public.set_blog_status(
--   '<editor_visible_post_uuid>'::uuid,
--   'published',
--   'Publish approved draft'
-- );
