'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [loginSubmitting, setLoginSubmitting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  // Check session status on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        // Try server API first
        const res = await fetch('/api/admin/session', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            router.replace('/admin/dashboard');
            return;
          }
        }
      } catch (err) {
        console.log('Server session check unavailable, fallback to client auth check:', err);
      }

      // Fallback: Check localStorage for static export
      if (typeof window !== 'undefined') {
        const isAuth = localStorage.getItem('nariva_admin_auth') === 'true';
        if (isAuth) {
          router.replace('/admin/dashboard');
          return;
        }
      }

      setLoading(false);
    };

    checkSession();
  }, [router]);

  // Handle Login Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginUsername || !loginPassword) {
      setLoginError('Please enter both username and password.');
      return;
    }

    setLoginSubmitting(true);
    try {
      // 1. Try Server API Login
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('nariva_admin_auth', 'true');
            localStorage.setItem('nariva_admin_user', loginUsername.trim());
          }
          router.push('/admin/dashboard');
          return;
        }
      }
    } catch (err) {
      console.warn('Server API login unreached, falling back to static client verification:', err);
    }

    // 2. Fallback Client-side Verification (for static export on Cloudflare Pages)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('nariva_admin_username') || 'admin';
      const storedPass = localStorage.getItem('nariva_admin_password') || 'admin123';

      if (loginUsername.trim() === storedUser && loginPassword === storedPass) {
        localStorage.setItem('nariva_admin_auth', 'true');
        localStorage.setItem('nariva_admin_user', loginUsername.trim());
        router.push('/admin/dashboard');
        return;
      }
    }

    setLoginError('Invalid username or password.');
    setLoginSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#1c1a17] text-[#fdfcf9] flex flex-col font-sans selection:bg-[#9a7d46] selection:text-white">
      {/* Header */}
      <header className="border-b border-[#9a7d46]/20 bg-[#1c1a17]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-[#9a7d46]/20 border border-[#9a7d46]/40 flex items-center justify-center text-[#c4ab7c] font-serif text-lg font-bold group-hover:bg-[#9a7d46] group-hover:text-white transition-all duration-300">
              N
            </div>
            <div>
              <span className="font-serif text-xl font-light tracking-wide text-[#fdfcf9] block">
                NARVIYA DESIGN
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#9a7d46] font-medium block">
                NARIVA INTERIORS Admin Portal
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs uppercase tracking-wider text-[#c4ab7c] hover:text-white transition-colors duration-200 flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
          >
            ← Main Site
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9a7d46]/10 rounded-full blur-3xl pointer-events-none" />

        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#9a7d46] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-[#c4ab7c] tracking-wider uppercase font-medium">Checking session status...</p>
          </div>
        ) : (
          <div className="w-full max-w-md bg-[#25221d] border border-[#9a7d46]/30 rounded-2xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-[#9a7d46]/15 border border-[#9a7d46]/40 flex items-center justify-center text-[#c4ab7c] mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="font-serif text-3xl text-[#fdfcf9] mb-2 font-light">Admin Access</h1>
              <p className="text-xs text-[#a09789]">Enter credentials to access admin tools</p>
            </div>

            {/* Test Credentials Box */}
            <div className="mb-6 p-4 rounded-xl bg-[#9a7d46]/10 border border-[#9a7d46]/25 text-xs text-[#d8cebe] space-y-1">
              <div className="font-medium text-[#c4ab7c] flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Default Admin Credentials</span>
              </div>
              <div>Username: <strong className="text-white font-mono bg-black/40 px-1.5 py-0.5 rounded">admin</strong></div>
              <div>Password: <strong className="text-white font-mono bg-black/40 px-1.5 py-0.5 rounded">admin123</strong></div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-6 p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c4ab7c] mb-2 font-medium">
                  Username
                </label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-4 py-3 text-sm text-[#fdfcf9] placeholder-[#6b6459] focus:outline-none focus:border-[#9a7d46] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c4ab7c] mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="admin123"
                    className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-4 py-3 text-sm text-[#fdfcf9] placeholder-[#6b6459] focus:outline-none focus:border-[#9a7d46] transition-all pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a09789] hover:text-[#c4ab7c] text-xs transition-colors p-1"
                  >
                    {showLoginPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginSubmitting}
                className="w-full bg-[#9a7d46] hover:bg-[#856a37] text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#9a7d46]/20 disabled:opacity-50 text-sm tracking-wide uppercase"
              >
                {loginSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Log In & Go to Dashboard</span>
                )}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#9a7d46]/10 py-4 px-6 text-center text-xs text-[#6b6459]">
        NARVIYA DESIGN &bull; NARIVA INTERIORS Admin Management Portal
      </footer>
    </div>
  );
}
