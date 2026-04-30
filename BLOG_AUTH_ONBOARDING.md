# Blog Auth Onboarding

This runbook defines how to onboard contractor writers without giving them Supabase dashboard access.

## Account model
- App authentication uses Supabase Auth (email/password).
- Editorial role authorization uses the `public.blog_roles` table.
- Supabase dashboard access is separate and reserved for technical admins only.

## Writer onboarding flow
1. Admin creates/invites writer account in auth.
2. Admin inserts writer role mapping into `public.blog_roles` with `role = 'author'`.
3. Writer signs in via `/admin/login` and works only inside Exotiq admin routes.
4. Writer cannot publish directly; status changes follow workflow constraints.

## Role model
- `author`: draft/edit own content, submit for review.
- `editor`: review, approve, publish, archive.
- `admin`: full editorial control and role management.

## Offboarding checklist
1. Disable auth user session or rotate password.
2. Remove role row from `public.blog_roles`.
3. Confirm no pending break-glass token is active.
