-- Blog Admin Portal V2 hardening
-- Tightens direct update pathways so status transitions happen through set_blog_status.

create or replace function public.can_author_update_blog_post(post_id uuid, next_status text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.blog_posts p
    where p.id = post_id
      and p.created_by = auth.uid()
      and p.status = next_status
  );
$$;

drop policy if exists "Scoped updates by role" on public.blog_posts;
create policy "Scoped updates by role v2"
on public.blog_posts
for update
to authenticated
using (
  public.current_blog_role() in ('editor', 'admin')
  or created_by = auth.uid()
)
with check (
  (
    public.current_blog_role() in ('editor', 'admin')
    and (updated_by = auth.uid() or updated_by is null)
  )
  or (
    public.current_blog_role() = 'author'
    and public.can_author_update_blog_post(id, status)
    and created_by = auth.uid()
    and updated_by = auth.uid()
  )
);

comment on policy "Scoped updates by role v2" on public.blog_posts is
  'Authors can edit own content, but cannot change status directly. Use set_blog_status for transitions.';
