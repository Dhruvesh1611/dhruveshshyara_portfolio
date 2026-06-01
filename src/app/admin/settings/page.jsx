'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AdminShell from '@/components/admin/AdminShell';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { status } = useSession();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/admin/settings').then(r => r.json()).then(data => {
        setSettings(data);
        setLoading(false);
      });
    }
  }, [status]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) toast.success('Settings updated!');
      else toast.error('Failed to update');
    } catch { toast.error('Error saving settings'); }
    setSaving(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) return toast.error('New passwords do not match');
    // For now, this is a placeholder since Next.js doesn't easily let us change .env programmatically on Vercel
    toast.success('In a real deployment, this would update your environment variables or database hash.');
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  if (status !== 'authenticated') return null;
  if (loading) return <AdminShell><div className="admin-loading-spinner" /></AdminShell>;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Settings</h1>
        <p className="admin-page-subtitle">Global configuration for your portfolio</p>
      </div>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h3 className="admin-card-title" style={{ marginBottom: 16 }}>General Site Info</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Site Title</label>
            <input className="admin-form-input" value={settings.siteTitle || ''} onChange={e => setSettings({ ...settings, siteTitle: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Author Name</label>
            <input className="admin-form-input" value={settings.author || ''} onChange={e => setSettings({ ...settings, author: e.target.value })} />
          </div>
        </div>
        <div className="admin-form-group" style={{ marginTop: 16 }}>
          <label className="admin-form-label">Global Site Description</label>
          <textarea className="admin-form-textarea" value={settings.siteDescription || ''} onChange={e => setSettings({ ...settings, siteDescription: e.target.value })} rows={2} />
        </div>
        <div className="admin-form-group" style={{ marginTop: 16 }}>
          <label className="admin-form-label">Global Keywords (comma separated)</label>
          <input className="admin-form-input" value={settings.siteKeywords || ''} onChange={e => setSettings({ ...settings, siteKeywords: e.target.value })} />
        </div>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>Save General Settings</button>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title" style={{ marginBottom: 16 }}>Admin Security</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Current Password</label>
              <input type="password" required className="admin-form-input" value={passwordForm.current} onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">New Password</label>
              <input type="password" required className="admin-form-input" value={passwordForm.new} onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })} />
            </div>
          </div>
          <div className="admin-form-group" style={{ marginTop: 16 }}>
            <label className="admin-form-label">Confirm New Password</label>
            <input type="password" required className="admin-form-input" value={passwordForm.confirm} onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })} />
          </div>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="admin-btn admin-btn--danger">Change Password</button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
