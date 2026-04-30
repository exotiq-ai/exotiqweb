-- Blog Admin Portal V3 indexes for verification/performance

create index if not exists idx_blog_posts_status on public.blog_posts(status);
create index if not exists idx_blog_posts_created_by on public.blog_posts(created_by);
create index if not exists idx_blog_posts_updated_by on public.blog_posts(updated_by);

create index if not exists idx_blog_post_revisions_post_id on public.blog_post_revisions(post_id);
create index if not exists idx_blog_post_revisions_edited_by on public.blog_post_revisions(edited_by);

create index if not exists idx_blog_post_links_post_id on public.blog_post_links(post_id);

create index if not exists idx_blog_workflow_audit_post_id on public.blog_workflow_audit(post_id);
create index if not exists idx_blog_workflow_audit_actor_id on public.blog_workflow_audit(actor_id);
