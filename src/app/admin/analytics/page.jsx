'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AdminShell from '@/components/admin/AdminShell';

export default function AnalyticsPage() {
  const { status } = useSession();

  if (status !== 'authenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Analytics</h1>
        <p className="admin-page-subtitle">Basic metrics for your portfolio</p>
      </div>
      <div className="admin-empty-state">
        <div className="admin-empty-state-icon">📊</div>
        <h3 className="admin-empty-state-title">Analytics currently disabled</h3>
        <p className="admin-empty-state-desc">You need to implement a tracking pixel or Google Analytics to gather data.</p>
      </div>
    </AdminShell>
  );
}
