import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { supabase } from '../services/supabaseClient';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const nextPath = searchParams.get('next') || '/admin/blog';

  const onSignIn = async () => {
    setSigningIn(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSigningIn(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    navigate(nextPath, { replace: true });
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <SEOHead
        title="Admin Login | Exotiq"
        description="Sign in to the Exotiq editorial portal."
        noindex
      />
      <section className="max-w-md mx-auto px-4 py-16">
        <h1 className="font-dfaalt text-3xl text-gray-900 mb-2">Editorial sign in</h1>
        <p className="text-gray-600 mb-6">
          Use your Exotiq account credentials to access the blog admin portal.
        </p>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">
            {error}
          </div>
        ) : null}

        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-3">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            onKeyDown={(event) => event.key === 'Enter' && void onSignIn()}
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            onKeyDown={(event) => event.key === 'Enter' && void onSignIn()}
          />
          <button
            onClick={() => void onSignIn()}
            disabled={signingIn}
            className="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
          >
            {signingIn ? 'Signing in...' : 'Sign in'}
          </button>
        </div>

        <Link to="/blog" className="block mt-4 text-sm text-primary-600 hover:text-primary-700 font-semibold">
          Back to blog
        </Link>
      </section>
    </div>
  );
}
