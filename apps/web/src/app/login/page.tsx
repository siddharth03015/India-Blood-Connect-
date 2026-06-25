'use client';

import { useState, useEffect } from 'react';
import { supabase } from 'shared';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'register') {
        setIsLogin(false);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    let authError = null;
    let authData = null;

    if (isLogin) {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone: formattedPhone,
        password: password,
      });
      authData = data;
      authError = error;
    } else {
      const { data, error } = await supabase.auth.signUp({
        phone: formattedPhone,
        password: password,
      });
      authData = data;
      authError = error;
    }

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else if (authData?.user) {
      // Check if profile exists
      const { data: profile } = await supabase
        .from('users')
        .select('id')
        .eq('id', authData.user.id)
        .single();
        
      if (!profile) {
        router.push('/register');
      } else {
        router.push('/profile');
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4 py-12 bg-mesh">
      <div className="w-full max-w-md animate-scale-in">
        {/* Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-neutral-900/5 dark:shadow-black/40 border border-neutral-100 dark:border-neutral-800">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-xl shadow-red-500/20 mb-5">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-1">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              {isLogin ? 'Sign in with your phone and password' : 'Sign up to become a donor'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-6 text-sm font-medium animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-neutral-100 dark:bg-neutral-800 border border-r-0 border-neutral-200 dark:border-neutral-700 rounded-l-xl text-sm font-semibold text-neutral-500">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="flex-1 px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium text-neutral-900 dark:text-white placeholder-neutral-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium text-neutral-900 dark:text-white placeholder-neutral-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-xl font-bold text-base shadow-lg shadow-red-500/20 disabled:opacity-50 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  {isLogin ? 'Signing In...' : 'Signing Up...'}
                </span>
              ) : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-sm text-neutral-500 hover:text-red-600 dark:hover:text-red-400 font-semibold transition-colors"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

