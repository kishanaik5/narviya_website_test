'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  email_verified: boolean;
  resolved: boolean;
  created_at: string;
}

interface AdminAccount {
  id: number;
  username: string;
  last_login_at: string | null;
  created_at: string;
}

interface EstimationRecord {
  id: string;
  estimation_no: string;
  company_name: string;
  client_name: string;
  estimation_date: string;
  total_amount: number;
  created_at: string;
  meta?: any;
}

interface InvoiceRecord {
  id: string;
  invoice_no: string;
  company_name: string;
  billed_to: string;
  invoice_date: string;
  total_amount: number;
  created_at: string;
  meta?: any;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'leads' | 'admins' | 'estimations' | 'invoices'>('leads');
  const [loading, setLoading] = useState(true);

  // Data states
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [admins, setAdmins] = useState<AdminAccount[]>([]);
  const [estimations, setEstimations] = useState<EstimationRecord[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);

  // LaTeX Modal state
  const [showLatexModal, setShowLatexModal] = useState(false);
  const [latexCode, setLatexCode] = useState('');
  const [latexTitle, setLatexTitle] = useState('');

  // Add Admin Modal state
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdminUser, setNewAdminUser] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [newAdminMasterKey, setNewAdminMasterKey] = useState('');
  const [addAdminError, setAddAdminError] = useState('');
  const [addAdminSuccess, setAddAdminSuccess] = useState('');
  const [addAdminSubmitting, setAddAdminSubmitting] = useState(false);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddAdminError('');
    setAddAdminSuccess('');

    if (!newAdminMasterKey.trim()) {
      setAddAdminError('Master API Key is mandatory. Cannot create admin account.');
      return;
    }

    setAddAdminSubmitting(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${baseUrl}/api/admin/create-admin`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          username: newAdminUser.trim(),
          password: newAdminPass.trim(),
          master_key: newAdminMasterKey.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setAddAdminSuccess(`✓ Admin account '${data.username}' created successfully!`);
        setNewAdminUser('');
        setNewAdminPass('');
        setNewAdminMasterKey('');
        fetchData();
        setTimeout(() => {
          setShowAddAdminModal(false);
          setAddAdminSuccess('');
        }, 1500);
      } else {
        setAddAdminError(data?.detail || 'Failed to create admin account.');
      }
    } catch {
      setAddAdminError('Connection error to backend server.');
    } finally {
      setAddAdminSubmitting(false);
    }
  };

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const fetchData = async () => {
    setLoading(true);
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      // 1. Fetch Leads
      const resLeads = await fetch(`${baseUrl}/api/leads`, { headers, cache: 'no-store' });
      if (resLeads.ok) setLeads(await resLeads.json());

      // 2. Fetch Admins
      const resAdmins = await fetch(`${baseUrl}/api/admin/accounts`, { headers, cache: 'no-store' });
      if (resAdmins.ok) setAdmins(await resAdmins.json());

      // 3. Fetch Estimations
      const resEst = await fetch(`${baseUrl}/api/admin/estimations`, { headers, cache: 'no-store' });
      if (resEst.ok) setEstimations(await resEst.json());

      // 4. Fetch Invoices
      const resInv = await fetch(`${baseUrl}/api/admin/invoices`, { headers, cache: 'no-store' });
      if (resInv.ok) setInvoices(await resInv.json());
    } catch (err) {
      console.warn('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle Lead Resolved Status Action
  const toggleResolveLead = async (leadId: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const res = await fetch(`${baseUrl}/api/leads/${leadId}/resolve`, {
        method: 'PATCH',
        headers,
      });
      if (res.ok) {
        const updatedLead: LeadItem = await res.json();
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, resolved: updatedLead.resolved } : l))
        );
      }
    } catch (err) {
      console.error('Error toggling resolve status:', err);
    }
  };

  // Fetch & display LaTeX code
  const viewLatexCode = async (type: 'invoice' | 'estimation', id: string, identifier: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const endpoint = type === 'invoice' ? `/api/admin/invoices/${id}/latex` : `/api/admin/estimations/${id}/latex`;
      const res = await fetch(`${baseUrl}${endpoint}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setLatexCode(data.latex || '');
        setLatexTitle(`${type === 'invoice' ? 'Invoice' : 'Estimation'} LaTeX Source (${identifier})`);
        setShowLatexModal(true);
      }
    } catch (err) {
      console.error('Error loading LaTeX code:', err);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const formatDate = (isoStr: string) => {
    if (!isoStr) return '—';
    return new Date(isoStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const pendingLeadsCount = leads.filter((l) => !l.resolved).length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#25221d] border border-[#9a7d46]/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#9a7d46] font-semibold">Admin Dashboard</span>
            </div>
            <h1 className="font-serif text-3xl text-white">NARIVA INTERIORS Console</h1>
            <p className="text-xs text-[#a09789] mt-1">
              Manage client inquiries, admin accounts, estimations, and invoices with real-time database sync.
            </p>
          </div>

          <button
            onClick={fetchData}
            className="self-start sm:self-auto bg-[#1c1a17] hover:bg-[#2c2823] text-[#c4ab7c] border border-[#9a7d46]/30 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5"
          >
            <span>↻ Refresh Data</span>
          </button>
        </div>

        {/* Metrics Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#9a7d46]/15">
          <div className="bg-[#1c1a17] p-3.5 rounded-xl border border-[#9a7d46]/20">
            <span className="text-[10px] uppercase tracking-wider text-[#a09789] block">Total Inquiries</span>
            <span className="text-2xl font-serif text-white font-light">{leads.length}</span>
            {pendingLeadsCount > 0 && (
              <span className="text-[10px] text-amber-400 block mt-0.5">{pendingLeadsCount} pending action</span>
            )}
          </div>

          <div className="bg-[#1c1a17] p-3.5 rounded-xl border border-[#9a7d46]/20">
            <span className="text-[10px] uppercase tracking-wider text-[#a09789] block">Admin Accounts</span>
            <span className="text-2xl font-serif text-white font-light">{admins.length}</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">Active inside admin_orch</span>
          </div>

          <div className="bg-[#1c1a17] p-3.5 rounded-xl border border-[#9a7d46]/20">
            <span className="text-[10px] uppercase tracking-wider text-[#a09789] block">Estimations</span>
            <span className="text-2xl font-serif text-white font-light">{estimations.length}</span>
            <span className="text-[10px] text-[#c4ab7c] block mt-0.5">Saved in database</span>
          </div>

          <div className="bg-[#1c1a17] p-3.5 rounded-xl border border-[#9a7d46]/20">
            <span className="text-[10px] uppercase tracking-wider text-[#a09789] block">Invoices</span>
            <span className="text-2xl font-serif text-white font-light">{invoices.length}</span>
            <span className="text-[10px] text-[#c4ab7c] block mt-0.5">Saved in database</span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Section Tabs */}
      <div className="border-b border-[#9a7d46]/30 flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'leads'
              ? 'bg-[#9a7d46] text-white shadow-lg shadow-[#9a7d46]/20 font-semibold'
              : 'bg-[#25221d] text-[#a09789] hover:text-white border border-[#9a7d46]/20'
          }`}
        >
          <span>User Inquiries (`user_request`)</span>
          {pendingLeadsCount > 0 && (
            <span className="bg-amber-500 text-black font-bold px-1.5 py-0.5 rounded-full text-[10px]">
              {pendingLeadsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('admins')}
          className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'admins'
              ? 'bg-[#9a7d46] text-white shadow-lg shadow-[#9a7d46]/20 font-semibold'
              : 'bg-[#25221d] text-[#a09789] hover:text-white border border-[#9a7d46]/20'
          }`}
        >
          <span>Admin Accounts (`admin_orch`)</span>
        </button>

        <button
          onClick={() => setActiveTab('estimations')}
          className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'estimations'
              ? 'bg-[#9a7d46] text-white shadow-lg shadow-[#9a7d46]/20 font-semibold'
              : 'bg-[#25221d] text-[#a09789] hover:text-white border border-[#9a7d46]/20'
          }`}
        >
          <span>Estimations History ({estimations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'invoices'
              ? 'bg-[#9a7d46] text-white shadow-lg shadow-[#9a7d46]/20 font-semibold'
              : 'bg-[#25221d] text-[#a09789] hover:text-white border border-[#9a7d46]/20'
          }`}
        >
          <span>Invoices History ({invoices.length})</span>
        </button>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="bg-[#25221d] border border-[#9a7d46]/30 rounded-2xl p-12 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#9a7d46] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#c4ab7c] uppercase tracking-wider">Loading data from PostgreSQL database...</p>
        </div>
      ) : (
        <div>
          {/* TAB 1: User Requests (Leads) */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#c4ab7c]">
                  Contact Form Briefs & Customer Requests
                </h2>
                <span className="text-xs text-[#a09789]">Total: {leads.length} records</span>
              </div>

              {leads.length === 0 ? (
                <div className="bg-[#25221d] border border-[#9a7d46]/20 rounded-2xl p-8 text-center text-xs text-[#a09789]">
                  No user requests found in `user_request` table.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        lead.resolved
                          ? 'bg-[#1c1a17]/60 border-[#9a7d46]/15 opacity-75'
                          : 'bg-[#25221d] border-[#9a7d46]/40 shadow-lg'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-lg text-white font-medium">{lead.name}</h3>
                          <div className="flex items-center gap-3 text-xs text-[#a09789] mt-0.5">
                            <span>📞 {lead.phone}</span>
                            <span>✉️ {lead.email}</span>
                          </div>
                        </div>

                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                            lead.resolved
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {lead.resolved ? '✓ Resolved' : '● Pending Action'}
                        </span>
                      </div>

                      <div className="bg-[#1c1a17] p-3 rounded-xl border border-[#9a7d46]/15 text-xs text-[#e6decb] whitespace-pre-line leading-relaxed">
                        {lead.message}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#9a7d46]/15 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[#a09789]">{formatDate(lead.created_at)}</span>
                          {lead.email_verified && (
                            <span className="text-[10px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                              Verified Email
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => toggleResolveLead(lead.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs uppercase font-medium transition-all ${
                            lead.resolved
                              ? 'bg-[#1c1a17] text-[#a09789] hover:text-white border border-[#9a7d46]/20'
                              : 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-md shadow-emerald-900/20'
                          }`}
                        >
                          {lead.resolved ? 'Mark Pending' : 'Mark Resolved'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Admin Accounts (admin_orch) */}
          {activeTab === 'admins' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#c4ab7c]">
                  Registered Admin Credentials & Access Log (`admin_orch`)
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddAdminModal(true)}
                    className="bg-[#9a7d46] hover:bg-[#856a37] text-white px-3 py-1.5 rounded-xl text-xs uppercase font-medium transition-all shadow-md shadow-[#9a7d46]/20 flex items-center gap-1"
                  >
                    <span>+ Add New Admin Account</span>
                  </button>
                  <Link
                    href="/admin/security"
                    className="text-xs uppercase tracking-wider text-[#c4ab7c] hover:text-white underline"
                  >
                    Update Credentials →
                  </Link>
                </div>
              </div>

              <div className="bg-[#25221d] border border-[#9a7d46]/30 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#1c1a17] border-b border-[#9a7d46]/30 text-[#c4ab7c] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Admin Username</th>
                      <th className="py-3 px-4">Last Login Timestamp</th>
                      <th className="py-3 px-4">Creation Date</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#9a7d46]/15">
                    {admins.map((adm) => (
                      <tr key={adm.id} className="hover:bg-[#2a2620] transition-colors">
                        <td className="py-3 px-4 text-[#a09789] font-mono">#{adm.id}</td>
                        <td className="py-3 px-4 font-semibold text-white">{adm.username}</td>
                        <td className="py-3 px-4 text-[#e6decb]">{formatDate(adm.last_login_at || '')}</td>
                        <td className="py-3 px-4 text-[#a09789]">{formatDate(adm.created_at)}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="bg-emerald-950 text-emerald-400 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border border-emerald-500/30">
                            Active Admin
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Estimations History */}
          {activeTab === 'estimations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#c4ab7c]">
                  Saved Estimations (`estimation_table`)
                </h2>
                <Link
                  href="/admin/estimation"
                  className="bg-[#9a7d46] hover:bg-[#856a37] text-white px-3 py-1.5 rounded-xl text-xs uppercase font-medium transition-all"
                >
                  + Create New Estimation
                </Link>
              </div>

              {estimations.length === 0 ? (
                <div className="bg-[#25221d] border border-[#9a7d46]/20 rounded-2xl p-8 text-center text-xs text-[#a09789]">
                  No estimations saved yet. Create your first estimation in the Estimation Generator tool.
                </div>
              ) : (
                <div className="bg-[#25221d] border border-[#9a7d46]/30 rounded-2xl overflow-hidden shadow-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#1c1a17] border-b border-[#9a7d46]/30 text-[#c4ab7c] uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Estimate No</th>
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Total Amount (Rs.)</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#9a7d46]/15">
                      {estimations.map((est) => (
                        <tr key={est.id} className="hover:bg-[#2a2620] transition-colors">
                          <td className="py-3 px-4 font-mono font-semibold text-white">{est.estimation_no}</td>
                          <td className="py-3 px-4 text-[#e6decb] font-medium">{est.client_name}</td>
                          <td className="py-3 px-4 text-[#a09789]">{formatDate(est.estimation_date)}</td>
                          <td className="py-3 px-4 text-right font-mono font-semibold text-[#c4ab7c]">
                            ₹{formatCurrency(est.total_amount)}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => viewLatexCode('estimation', est.id, est.estimation_no)}
                              className="bg-[#1c1a17] hover:bg-[#25221d] text-[#c4ab7c] border border-[#9a7d46]/30 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                            >
                              LaTeX Code
                            </button>
                            <Link
                              href={`/admin/estimation?id=${est.id}`}
                              className="bg-[#9a7d46]/20 hover:bg-[#9a7d46] text-[#c4ab7c] hover:text-white border border-[#9a7d46]/40 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                            >
                              View / Edit Estimation
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Invoices History */}
          {activeTab === 'invoices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#c4ab7c]">
                  Saved Invoices (`invoice_table`)
                </h2>
                <Link
                  href="/admin/invoice"
                  className="bg-[#9a7d46] hover:bg-[#856a37] text-white px-3 py-1.5 rounded-xl text-xs uppercase font-medium transition-all"
                >
                  + Create New Invoice
                </Link>
              </div>

              {invoices.length === 0 ? (
                <div className="bg-[#25221d] border border-[#9a7d46]/20 rounded-2xl p-8 text-center text-xs text-[#a09789]">
                  No invoices saved yet. Create your first invoice in the Invoice Generator tool.
                </div>
              ) : (
                <div className="bg-[#25221d] border border-[#9a7d46]/30 rounded-2xl overflow-hidden shadow-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#1c1a17] border-b border-[#9a7d46]/30 text-[#c4ab7c] uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Invoice No</th>
                        <th className="py-3 px-4">Billed To (Client)</th>
                        <th className="py-3 px-4">Invoice Date</th>
                        <th className="py-3 px-4 text-right">Total Amount (Rs.)</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#9a7d46]/15">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-[#2a2620] transition-colors">
                          <td className="py-3 px-4 font-mono font-semibold text-white">{inv.invoice_no}</td>
                          <td className="py-3 px-4 text-[#e6decb] font-medium">{inv.billed_to}</td>
                          <td className="py-3 px-4 text-[#a09789]">{formatDate(inv.invoice_date)}</td>
                          <td className="py-3 px-4 text-right font-mono font-semibold text-[#c4ab7c]">
                            ₹{formatCurrency(inv.total_amount)}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => viewLatexCode('invoice', inv.id, inv.invoice_no)}
                              className="bg-[#1c1a17] hover:bg-[#25221d] text-[#c4ab7c] border border-[#9a7d46]/30 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                            >
                              LaTeX Code
                            </button>
                            <Link
                              href={`/admin/invoice?id=${inv.id}`}
                              className="bg-[#9a7d46]/20 hover:bg-[#9a7d46] text-[#c4ab7c] hover:text-white border border-[#9a7d46]/40 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                            >
                              View / Edit Invoice
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* LaTeX Code Modal */}
      {showLatexModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#25221d] border border-[#9a7d46]/40 rounded-2xl max-w-3xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#9a7d46]/20">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c4ab7c]">
                {latexTitle}
              </h3>
              <button
                onClick={() => setShowLatexModal(false)}
                className="text-[#a09789] hover:text-white"
              >
                ✕
              </button>
            </div>

            <textarea
              readOnly
              rows={16}
              value={latexCode}
              className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl p-4 font-mono text-xs text-emerald-300 focus:outline-none select-all"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(latexCode);
                  alert('LaTeX code copied to clipboard!');
                }}
                className="bg-[#9a7d46] hover:bg-[#856a37] text-white px-4 py-2 rounded-xl text-xs uppercase font-medium"
              >
                Copy LaTeX Code
              </button>
              <button
                onClick={() => setShowLatexModal(false)}
                className="bg-[#1c1a17] text-[#a09789] hover:text-white px-4 py-2 rounded-xl text-xs uppercase font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Admin Modal */}
      {showAddAdminModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#25221d] border border-[#9a7d46]/40 rounded-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#9a7d46]/20">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c4ab7c]">
                Add New Admin Account (`admin_orch`)
              </h3>
              <button
                onClick={() => setShowAddAdminModal(false)}
                className="text-[#a09789] hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {addAdminError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                ⚠️ {addAdminError}
              </div>
            )}

            {addAdminSuccess && (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200">
                {addAdminSuccess}
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#a09789] mb-1.5 font-medium">New Admin Username *</label>
                <input
                  type="text"
                  value={newAdminUser}
                  onChange={(e) => setNewAdminUser(e.target.value)}
                  placeholder="e.g. kishan_subadmin"
                  className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#9a7d46]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#a09789] mb-1.5 font-medium">New Password (min 8 chars) *</label>
                <input
                  type="password"
                  value={newAdminPass}
                  onChange={(e) => setNewAdminPass(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#9a7d46]"
                  required
                />
              </div>

              <div className="pt-2 border-t border-[#9a7d46]/20">
                <label className="block text-[#c4ab7c] mb-1.5 font-semibold uppercase tracking-wider text-[11px]">
                  Master API Key (Mandatory) *
                </label>
                <input
                  type="text"
                  value={newAdminMasterKey}
                  onChange={(e) => setNewAdminMasterKey(e.target.value)}
                  placeholder="Enter Master API Key"
                  className="w-full bg-[#1c1a17] border border-amber-500/50 rounded-xl px-3 py-2.5 text-amber-200 font-mono focus:outline-none focus:border-amber-400"
                  required
                />
                <p className="text-[10px] text-[#a09789] mt-1">
                  Creation will fail if Master API Key is null or incorrect.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#9a7d46]/20">
                <button
                  type="button"
                  onClick={() => setShowAddAdminModal(false)}
                  className="bg-[#1c1a17] text-[#a09789] hover:text-white px-4 py-2 rounded-xl text-xs uppercase font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addAdminSubmitting}
                  className="bg-[#9a7d46] hover:bg-[#856a37] text-white px-5 py-2 rounded-xl text-xs uppercase font-medium shadow-md shadow-[#9a7d46]/20 disabled:opacity-50"
                >
                  {addAdminSubmitting ? 'Creating...' : 'Create Admin Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
