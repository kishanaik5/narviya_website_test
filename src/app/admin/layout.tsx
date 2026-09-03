'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      // 1. Check Client-side Auth First (localStorage)
      if (typeof window !== 'undefined') {
        const isClientAuth = localStorage.getItem('nariva_admin_auth') === 'true';
        if (isClientAuth) {
          const user = localStorage.getItem('nariva_admin_user') || 'admin';
          setUsername(user);
          setLoading(false);
          return;
        }
      }

      // 2. Check Server API Session
      try {
        const res = await fetch('/api/admin/session', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setUsername(data.username || 'admin');
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Server session check unavailable:', err);
      }

      // 3. If neither is authenticated, redirect to /admin-login
      router.replace('/admin-login');
    };

    checkAuth();
  }, [router, pathname]);

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nariva_admin_auth');
      localStorage.removeItem('nariva_admin_user');
    }
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.warn('Logout API error:', err);
    }
    router.replace('/admin-login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1c1a17] text-[#fdfcf9] flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-[#9a7d46] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-[#c4ab7c] tracking-wider uppercase font-medium">Loading admin portal...</p>
      </div>
    );
  }

  const tabs = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { label: 'Invoice Generator', path: '/admin/invoice', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Estimation Generator', path: '/admin/estimation', icon: 'M9 7h6m-6 4h6m-6 4h6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Security Settings', path: '/admin/security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  ];

  return (
    <div className="min-h-screen bg-[#1c1a17] text-[#fdfcf9] flex flex-col font-sans selection:bg-[#9a7d46] selection:text-white">
      {/* Admin Top Header Navigation */}
      <header className="border-b border-[#9a7d46]/20 bg-[#1c1a17]/95 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#a09789] bg-[#25221d] px-3 py-1.5 rounded-full border border-[#9a7d46]/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admin: <strong className="text-white font-medium">{username}</strong></span>
            </div>

            <Link
              href="/"
              className="text-xs uppercase tracking-wider text-[#c4ab7c] hover:text-white transition-colors duration-200 flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
            >
              ← Main Site
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs uppercase tracking-wider bg-[#9a7d46]/20 hover:bg-[#9a7d46] text-[#c4ab7c] hover:text-white px-4 py-1.5 rounded-full border border-[#9a7d46]/40 transition-all duration-300 font-medium"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Header Navigation Tabs */}
      <div className="border-b border-[#9a7d46]/15 bg-[#25221d]/60 sticky top-[69px] z-40 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path || (tab.path === '/admin/dashboard' && pathname === '/admin');
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`px-4 py-2 rounded-xl text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#9a7d46] text-white shadow-md shadow-[#9a7d46]/20 font-semibold'
                    : 'text-[#a09789] hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
                </svg>
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9a7d46]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#9a7d46]/10 py-4 px-6 text-center text-xs text-[#6b6459]">
        NARVIYA DESIGN &bull; NARIVA INTERIORS Admin Management Console
      </footer>
    </div>
  );
}
