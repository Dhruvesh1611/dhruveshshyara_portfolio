'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import AdminShell from '@/components/admin/AdminShell';

export default function ContentPage() {
  const { status } = useSession();

  if (status !== 'authenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Content & Articles</h1>
        <p className="admin-page-subtitle">Manage your blog posts and explanations</p>
      </div>
      <div className="admin-empty-state">
        <div className="admin-empty-state-icon">📝</div>
        <h3 className="admin-empty-state-title">No content found</h3>
        <p className="admin-empty-state-desc">You haven't written any articles yet.</p>
      </div>
    </AdminShell>
  );
}
