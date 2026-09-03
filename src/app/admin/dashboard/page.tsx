'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#25221d] border border-[#9a7d46]/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#9a7d46] font-semibold">Dashboard Overview</span>
            </div>
            <h1 className="font-serif text-3xl text-white">NARIVA INTERIORS Admin Console</h1>
            <p className="text-xs text-[#a09789] mt-1">
              Select a generator tool below to create, preview, and print invoices or estimations.
            </p>
          </div>
        </div>
      </div>

      {/* Generator Tool Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Invoice Generator Card */}
        <Link
          href="/admin/invoice"
          className="group bg-[#25221d] hover:bg-[#2c2823] border border-[#9a7d46]/30 hover:border-[#9a7d46] rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#9a7d46]/15 border border-[#9a7d46]/40 flex items-center justify-center text-[#c4ab7c] group-hover:bg-[#9a7d46] group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-white group-hover:text-[#c4ab7c] transition-colors">
                Invoice Generator
              </h2>
              <p className="text-xs text-[#a09789] mt-1 leading-relaxed">
                Generate professional billing invoices matching exact LaTeX specifications for NARIVA INTERIORS with items, rates, quantities, discounts, and print/PDF export.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#9a7d46]/15 flex items-center justify-between text-xs text-[#c4ab7c] font-medium group-hover:text-white">
            <span>Open Invoice Form (/admin/invoice)</span>
            <span>→</span>
          </div>
        </Link>

        {/* Estimation Generator Card */}
        <Link
          href="/admin/estimation"
          className="group bg-[#25221d] hover:bg-[#2c2823] border border-[#9a7d46]/30 hover:border-[#9a7d46] rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#9a7d46]/15 border border-[#9a7d46]/40 flex items-center justify-center text-[#c4ab7c] group-hover:bg-[#9a7d46] group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m-6 4h6m-6 4h6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-white group-hover:text-[#c4ab7c] transition-colors">
                Estimation Generator
              </h2>
              <p className="text-xs text-[#a09789] mt-1 leading-relaxed">
                Create project estimates with description, amount, and optional quantity column auto-rendering, live preview, and PDF printing.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#9a7d46]/15 flex items-center justify-between text-xs text-[#c4ab7c] font-medium group-hover:text-white">
            <span>Open Estimation Form (/admin/estimation)</span>
            <span>→</span>
          </div>
        </Link>
      </div>

      {/* Quick Security Link */}
      <div className="bg-[#25221d] border border-[#9a7d46]/30 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <h3 className="font-serif text-xl text-white">Security & Password Settings</h3>
          <p className="text-xs text-[#a09789] mt-0.5">
            Update your admin login username and password.
          </p>
        </div>
        <Link
          href="/admin/security"
          className="bg-[#9a7d46]/20 hover:bg-[#9a7d46] text-[#c4ab7c] hover:text-white px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium border border-[#9a7d46]/40 transition-all"
        >
          Manage Security (/admin/security)
        </Link>
      </div>
    </div>
  );
}
