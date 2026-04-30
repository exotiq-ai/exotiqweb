import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { getCurrentBlogRole } from '../services/blogAdminService';
import { trackEvent } from './Analytics';

interface AdminAuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  allowedRoles?: Array<'author' | 'editor' | 'admin'>;
}

const BREAK_GLASS_ENABLED = import.meta.env.VITE_BLOG_BREAK_GLASS === 'true';

export default function AdminAuthGuard({
  children,
  fallback,
  allowedRoles = ['author', 'editor', 'admin'],
}: AdminAuthGuardProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const [role, setRole] = useState<'author' | 'editor' | 'admin' | null>(null);
  const [showBreakGlassBanner, setShowBreakGlassBanner] = useState(false);

  const breakGlassAllowlist = useMemo(
    () =>
      (import.meta.env.VITE_BLOG_BREAK_GLASS_ALLOWLIST ?? '')
        .split(',')
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean),
    []
  );

  const breakGlassIsExpired = useMemo(() => {
    const expiresAt = import.meta.env.VITE_BLOG_BREAK_GLASS_EXPIRES_AT;
    if (!expiresAt) {
      return false;
    }
    const expiresTimestamp = new Date(expiresAt).getTime();
    return Number.isFinite(expiresTimestamp) ? Date.now() > expiresTimestamp : false;
  }, []);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!mounted) return;

      const breakGlassToken = import.meta.env.VITE_BLOG_BREAK_GLASS_TOKEN;
      const tokenFromQuery = searchParams.get('bg');
      const isTokenBypassActive =
        BREAK_GLASS_ENABLED &&
        !breakGlassIsExpired &&
        Boolean(breakGlassToken) &&
        breakGlassToken === tokenFromQuery;

      const isEmailAllowlisted =
        BREAK_GLASS_ENABLED &&
        !breakGlassIsExpired &&
        session?.user?.email &&
        breakGlassAllowlist.includes(session.user.email.toLowerCase());

      if (isTokenBypassActive || isEmailAllowlisted) {
        setRole('admin');
        setState('authenticated');
        setShowBreakGlassBanner(true);
        trackEvent('blog_break_glass_access', {
          event_category: 'security',
          event_label: location.pathname,
        });
        return;
      }

      if (!session) {
        setState('unauthenticated');
        setRole(null);
        return;
      }

      const userRole = await getCurrentBlogRole();
      if (!mounted) return;
      setRole(userRole);
      setState('authenticated');
    };

    void check();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      if (!session) {
        setState('unauthenticated');
        setRole(null);
        return;
      }
      const userRole = await getCurrentBlogRole();
      if (!mounted) return;
      setRole(userRole);
      setState('authenticated');
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [breakGlassAllowlist, breakGlassIsExpired, location.pathname, searchParams]);

  if (state === 'loading') {
    return fallback ?? (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-10 text-gray-500">Checking authentication...</div>
      </div>
    );
  }

  if (state === 'unauthenticated') {
    return (
      <Navigate
        to={`/admin/login?next=${encodeURIComponent(`${location.pathname}${location.search}`)}`}
        replace
      />
    );
  }

  if (!role || !allowedRoles.includes(role)) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <section className="max-w-2xl mx-auto px-4 py-16">
          <h1 className="font-dfaalt text-3xl text-gray-900 mb-2">Access denied</h1>
          <p className="text-gray-600">
            Your account is signed in, but it does not have permission to access this admin route.
          </p>
        </section>
      </div>
    );
  }

  return (
    <>
      {showBreakGlassBanner ? (
        <div className="bg-amber-100 border-b border-amber-300 text-amber-900 text-sm font-semibold px-4 py-2">
          Break-glass mode is active for this session. Disable it after incident recovery.
        </div>
      ) : null}
      {children}
    </>
  );
}
