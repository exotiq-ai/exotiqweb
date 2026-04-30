-- Blog Admin Portal V4 function hardening

alter function public.set_updated_at_timestamp() set search_path = public;
alter function public.can_transition_blog_status(text, text, text) set search_path = public;
