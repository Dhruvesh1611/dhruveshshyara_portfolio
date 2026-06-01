'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import AdminShell from '@/components/admin/AdminShell';

export default function MessagesPage() {
  const { status } = useSession();

  if (status !== 'authenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Messages</h1>
        <p className="admin-page-subtitle">Contact form submissions</p>
      </div>
      <div className="admin-empty-state">
        <div className="admin-empty-state-icon">✉️</div>
        <h3 className="admin-empty-state-title">No messages</h3>
        <p className="admin-empty-state-desc">Your inbox is empty.</p>
      </div>
    </AdminShell>
  );
}
