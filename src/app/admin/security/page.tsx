'use client';

import React, { useState, useEffect } from 'react';

export default function AdminSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showUpdatePasswords, setShowUpdatePasswords] = useState<boolean>(false);
  const [updateSubmitting, setUpdateSubmitting] = useState<boolean>(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const activeUser = localStorage.getItem('nariva_admin_user') || localStorage.getItem('nariva_admin_username') || 'admin';
      setNewUsername(activeUser);
    }
  }, []);

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateMessage(null);

    if (!currentPassword || !newUsername || !newPassword || !confirmPassword) {
      setUpdateMessage({ type: 'error', text: 'All fields are required.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setUpdateMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setUpdateMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    setUpdateSubmitting(true);

    if (typeof window !== 'undefined') {
      const activePass = localStorage.getItem('nariva_admin_password') || 'admin123';
      if (currentPassword !== activePass) {
        setUpdateMessage({ type: 'error', text: 'Current password is incorrect.' });
        setUpdateSubmitting(false);
        return;
      }

      // Save to localStorage for static deployment
      const cleanedUser = newUsername.trim();
      localStorage.setItem('nariva_admin_username', cleanedUser);
      localStorage.setItem('nariva_admin_password', newPassword);
      localStorage.setItem('nariva_admin_user', cleanedUser);
    }

    // Try server API update as well if connected
    try {
      await fetch('/api/admin/update-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newUsername: newUsername.trim(),
          newPassword,
        }),
      });
    } catch {
      // Server API unreached in static export - client update already saved above
    }

    setUpdateMessage({
      type: 'success',
      text: `Credentials updated successfully! Your new admin username is "${newUsername.trim()}".`,
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setUpdateSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#25221d] border border-[#9a7d46]/30 rounded-2xl p-8 shadow-xl space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[#fdfcf9] flex items-center gap-2">
          <svg className="w-5 h-5 text-[#c4ab7c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          Security & Account Settings
        </h2>
        <p className="text-xs text-[#a09789] mt-1">
          Update your admin login username and password. Changes take effect immediately.
        </p>
      </div>

      {updateMessage && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
            updateMessage.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/60 border-red-500/40 text-red-200'
          }`}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {updateMessage.type === 'success' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
          <span>{updateMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleUpdateCredentials} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-[#c4ab7c] mb-1 font-medium">
            Current Password *
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-4 py-2.5 text-sm text-[#fdfcf9] placeholder-[#6b6459] focus:outline-none focus:border-[#9a7d46] transition-all"
            required
          />
        </div>

        <div className="pt-2 border-t border-[#9a7d46]/10">
          <label className="block text-xs uppercase tracking-wider text-[#c4ab7c] mb-1 font-medium">
            New Username *
          </label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new admin username"
            className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-4 py-2.5 text-sm text-[#fdfcf9] placeholder-[#6b6459] focus:outline-none focus:border-[#9a7d46] transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#c4ab7c] mb-1 font-medium">
              New Password *
            </label>
            <input
              type={showUpdatePasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-4 py-2.5 text-sm text-[#fdfcf9] placeholder-[#6b6459] focus:outline-none focus:border-[#9a7d46] transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#c4ab7c] mb-1 font-medium">
              Confirm New Password *
            </label>
            <input
              type={showUpdatePasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full bg-[#1c1a17] border border-[#9a7d46]/30 rounded-xl px-4 py-2.5 text-sm text-[#fdfcf9] placeholder-[#6b6459] focus:outline-none focus:border-[#9a7d46] transition-all"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#a09789]">
            <input
              type="checkbox"
              checked={showUpdatePasswords}
              onChange={(e) => setShowUpdatePasswords(e.target.checked)}
              className="accent-[#9a7d46]"
            />
            <span>Show passwords</span>
          </label>

          <button
            type="submit"
            disabled={updateSubmitting}
            className="bg-[#9a7d46] hover:bg-[#856a37] text-white px-6 py-2.5 rounded-xl font-medium text-xs uppercase tracking-wider transition-all duration-200 disabled:opacity-50 shadow-md shadow-[#9a7d46]/20 flex items-center gap-2"
          >
            {updateSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Updated Credentials</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
