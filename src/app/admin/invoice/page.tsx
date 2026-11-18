'use client';

import React, { Suspense } from 'react';
import InvoiceGenerator from '@/components/admin/InvoiceGenerator';

export default function AdminInvoicePage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-[#a09789]">Loading Invoice Generator...</div>}>
      <InvoiceGenerator />
    </Suspense>
  );
}
