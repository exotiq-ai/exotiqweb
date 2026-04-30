-- Blog Admin Portal V1
-- Source of truth: Supabase

create extension if not exists pgcrypto;

create table if not exists public.blog_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('author', 'editor', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body_markdown text not null,
  status text not null default 'draft' check (status in ('draft', 'in_review', 'approved', 'published', 'archived')),
  meta_title text not null,
  meta_description text not null,
  canonical_url text,
  category text not null,
  tags text[] not null default '{}',
  funnel_stage text not null check (funnel_stage in ('TOFU', 'MOFU', 'BOFU')),
  search_intent text not null check (search_intent in ('informational', 'comparison', 'transactional')),
  author_name text not null,
  author_role text,
  author_bio text,
  author_profile_url text,
  tldr_short text not null,
  tldr_bullets jsonb not null,
  rari_summary_modes jsonb not null,
  primary_keyword text not null,
  secondary_keywords text[] not null default '{}',
  cta_type text not null check (cta_type in ('demo', 'waitlist', 'newsletter', 'calculator')),
  cta_copy text not null,
  faq_items jsonb,
  hero_image text,
  og_image text,
  related_posts text[] not null default '{}',
  disclosure text,
  published_at timestamptz,
  created_by uuid references auth.users (id),
  updated_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_post_revisions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  snapshot jsonb not null,
  edited_by uuid references auth.users (id),
  edited_at timestamptz not null default now(),
  change_note text
);

create table if not exists public.blog_post_links (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  url text not null,
  link_type text not null check (link_type in ('internal', 'external')),
  status_code int,
  is_placeholder boolean not null default false,
  last_checked_at timestamptz not null default now(),
  unique (post_id, url)
);

create table if not exists public.blog_workflow_audit (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  from_status text,
  to_status text not null,
  actor_id uuid references auth.users (id),
  note text,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at_timestamp()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_blog_roles_updated_at on public.blog_roles;
create trigger trg_blog_roles_updated_at
before update on public.blog_roles
for each row execute procedure public.set_updated_at_timestamp();

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
create trigger trg_blog_posts_updated_at
before update on public.blog_posts
for each row execute procedure public.set_updated_at_timestamp();

create or replace function public.current_blog_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select role from public.blog_roles where user_id = auth.uid()), 'author');
$$;

create or replace function public.can_transition_blog_status(
  current_status text,
  next_status text,
  actor_role text
)
returns boolean
language plpgsql
stable
as $$
begin
  if actor_role = 'admin' then
    return true;
  end if;

  if actor_role = 'editor' then
    return (
      (current_status = 'draft' and next_status in ('in_review', 'archived')) or
      (current_status = 'in_review' and next_status in ('approved', 'draft', 'archived')) or
      (current_status = 'approved' and next_status in ('published', 'draft', 'archived')) or
      (current_status = 'published' and next_status in ('archived', 'draft')) or
      (current_status = 'archived' and next_status in ('draft'))
    );
  end if;

  return (
    (current_status = 'draft' and next_status in ('in_review', 'archived')) or
    (current_status = 'in_review' and next_status in ('draft')) or
    (current_status = 'archived' and next_status in ('draft'))
  );
end;
$$;

create or replace function public.set_blog_status(
  post_id uuid,
  next_status text,
  note text default null
)
returns public.blog_posts
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_role text;
  current_record public.blog_posts;
  updated_record public.blog_posts;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  actor_role := public.current_blog_role();

  select * into current_record from public.blog_posts where id = post_id;
  if not found then
    raise exception 'Post not found';
  end if;

  if not public.can_transition_blog_status(current_record.status, next_status, actor_role) then
    raise exception 'Transition not allowed for role %', actor_role;
  end if;

  update public.blog_posts
  set
    status = next_status,
    published_at = case when next_status = 'published' then now() else published_at end,
    updated_by = auth.uid()
  where id = post_id
  returning * into updated_record;

  insert into public.blog_workflow_audit (post_id, from_status, to_status, actor_id, note)
  values (post_id, current_record.status, next_status, auth.uid(), note);

  return updated_record;
end;
$$;

alter table public.blog_roles enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_post_revisions enable row level security;
alter table public.blog_post_links enable row level security;
alter table public.blog_workflow_audit enable row level security;

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
on public.blog_posts
for select
using (status = 'published');

drop policy if exists "Authors can read scoped blog posts" on public.blog_posts;
create policy "Authors can read scoped blog posts"
on public.blog_posts
for select
to authenticated
using (
  public.current_blog_role() in ('editor', 'admin')
  or created_by = auth.uid()
  or updated_by = auth.uid()
  or status = 'published'
);

drop policy if exists "Authors can insert blog drafts" on public.blog_posts;
create policy "Authors can insert blog drafts"
on public.blog_posts
for insert
to authenticated
with check (
  public.current_blog_role() in ('author', 'editor', 'admin')
  and (created_by = auth.uid() or created_by is null)
);

drop policy if exists "Scoped updates by role" on public.blog_posts;
create policy "Scoped updates by role"
on public.blog_posts
for update
to authenticated
using (
  public.current_blog_role() in ('editor', 'admin')
  or created_by = auth.uid()
)
with check (
  public.current_blog_role() in ('editor', 'admin')
  or created_by = auth.uid()
);

drop policy if exists "Editors and admins can manage blog roles" on public.blog_roles;
create policy "Editors and admins can manage blog roles"
on public.blog_roles
for all
to authenticated
using (public.current_blog_role() in ('editor', 'admin'))
with check (public.current_blog_role() in ('editor', 'admin'));

drop policy if exists "Authenticated users can read blog roles" on public.blog_roles;
create policy "Authenticated users can read blog roles"
on public.blog_roles
for select
to authenticated
using (true);

drop policy if exists "Read revisions by role" on public.blog_post_revisions;
create policy "Read revisions by role"
on public.blog_post_revisions
for select
to authenticated
using (
  public.current_blog_role() in ('editor', 'admin')
  or exists (
    select 1
    from public.blog_posts p
    where p.id = post_id
      and p.created_by = auth.uid()
  )
);

drop policy if exists "Insert revisions by role" on public.blog_post_revisions;
create policy "Insert revisions by role"
on public.blog_post_revisions
for insert
to authenticated
with check (
  public.current_blog_role() in ('author', 'editor', 'admin')
);

drop policy if exists "Read links by role" on public.blog_post_links;
create policy "Read links by role"
on public.blog_post_links
for select
to authenticated
using (
  public.current_blog_role() in ('editor', 'admin')
  or exists (
    select 1
    from public.blog_posts p
    where p.id = post_id
      and p.created_by = auth.uid()
  )
);

drop policy if exists "Manage links by role" on public.blog_post_links;
create policy "Manage links by role"
on public.blog_post_links
for all
to authenticated
using (
  public.current_blog_role() in ('editor', 'admin')
  or exists (
    select 1
    from public.blog_posts p
    where p.id = post_id
      and p.created_by = auth.uid()
  )
)
with check (
  public.current_blog_role() in ('editor', 'admin')
  or exists (
    select 1
    from public.blog_posts p
    where p.id = post_id
      and p.created_by = auth.uid()
  )
);

drop policy if exists "Read workflow audit by role" on public.blog_workflow_audit;
create policy "Read workflow audit by role"
on public.blog_workflow_audit
for select
to authenticated
using (public.current_blog_role() in ('editor', 'admin'));

drop policy if exists "Insert workflow audit by role" on public.blog_workflow_audit;
create policy "Insert workflow audit by role"
on public.blog_workflow_audit
for insert
to authenticated
with check (public.current_blog_role() in ('editor', 'admin', 'author'));
