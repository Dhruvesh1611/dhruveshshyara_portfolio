'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import AdminShell from '@/components/admin/AdminShell';

export default function MediaPage() {
  const { status } = useSession();

  if (status !== 'authenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Media Library</h1>
        <p className="admin-page-subtitle">Manage uploaded images and files (coming soon to Vercel via Cloudinary)</p>
      </div>
      <div className="admin-empty-state">
        <div className="admin-empty-state-icon">📸</div>
        <h3 className="admin-empty-state-title">Static File Hosting</h3>
        <p className="admin-empty-state-desc">For now, images are stored in your `public/` directory and version-controlled via git.</p>
        <p className="admin-empty-state-desc" style={{ marginTop: 8 }}>To upload images via the admin panel on Vercel, we will integrate Cloudinary or AWS S3 in the next phase.</p>
      </div>
    </AdminShell>
  );
}
