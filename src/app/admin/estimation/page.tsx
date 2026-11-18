'use client';

import React, { Suspense } from 'react';
import EstimationGenerator from '@/components/admin/EstimationGenerator';

export default function AdminEstimationPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-[#a09789]">Loading Estimation Generator...</div>}>
      <EstimationGenerator />
    </Suspense>
  );
}
