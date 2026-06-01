'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AdminShell from '@/components/admin/AdminShell';
import toast from 'react-hot-toast';

export default function SEOPage() {
  const { status } = useSession();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/admin/settings').then(r => r.json()).then(data => {
        setSettings(data.seo || {});
        setLoading(false);
      });
    }
  }, [status]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const current = await fetch('/api/admin/settings').then(r => r.json());
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...current, seo: settings })
      });
      if (res.ok) toast.success('SEO Settings updated!');
      else toast.error('Failed to update');
    } catch { toast.error('Error saving SEO settings'); }
    setSaving(false);
  };

  if (status !== 'authenticated') return null;
  if (loading) return <AdminShell><div className="admin-loading-spinner" /></AdminShell>;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">SEO Management</h1>
        <p className="admin-page-subtitle">Configure your meta tags for search engines</p>
      </div>

      <div className="admin-card">
        <div className="admin-form-group">
          <label className="admin-form-label">Default Page Title</label>
          <input className="admin-form-input" value={settings.defaultTitle || ''} onChange={e => setSettings({ ...settings, defaultTitle: e.target.value })} />
        </div>
        <div className="admin-form-group" style={{ marginTop: 16 }}>
          <label className="admin-form-label">Default Meta Description</label>
          <textarea className="admin-form-textarea" value={settings.defaultDescription || ''} onChange={e => setSettings({ ...settings, defaultDescription: e.target.value })} rows={3} />
        </div>
        <div className="admin-form-row" style={{ marginTop: 16 }}>
          <div className="admin-form-group">
            <label className="admin-form-label">OG Type</label>
            <input className="admin-form-input" value={settings.ogType || ''} onChange={e => setSettings({ ...settings, ogType: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Twitter Site (@username)</label>
            <input className="admin-form-input" value={settings.twitterSite || ''} onChange={e => setSettings({ ...settings, twitterSite: e.target.value })} />
          </div>
        </div>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>Save SEO Settings</button>
        </div>
      </div>

      {/* Google Preview */}
      <div className="admin-card" style={{ marginTop: 24 }}>
        <h3 className="admin-card-title" style={{ marginBottom: 16 }}>Search Engine Preview</h3>
        <div style={{ padding: 16, background: '#fff', borderRadius: 8, maxWidth: 600 }}>
          <div style={{ color: '#1a0dab', fontSize: 20, cursor: 'pointer', fontFamily: 'arial, sans-serif' }}>{settings.defaultTitle || 'Page Title'}</div>
          <div style={{ color: '#006621', fontSize: 14, marginTop: 2, fontFamily: 'arial, sans-serif' }}>https://yourportfolio.com</div>
          <div style={{ color: '#545454', fontSize: 14, marginTop: 4, fontFamily: 'arial, sans-serif', lineHeight: 1.4 }}>{settings.defaultDescription || 'Meta description will appear here...'}</div>
        </div>
      </div>
    </AdminShell>
  );
}
