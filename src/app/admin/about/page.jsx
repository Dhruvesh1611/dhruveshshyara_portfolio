'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AdminShell from '@/components/admin/AdminShell';
import toast from 'react-hot-toast';
import { HiOutlineSave } from 'react-icons/hi';

export default function AboutPage() {
  const { status } = useSession();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/admin/about').then(r => r.json()).then(data => {
        setForm({
          ...data,
          socialLinks: data.socialLinks || { github: '', linkedin: '', email: '' }
        });
        setLoading(false);
      });
    }
  }, [status]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) toast.success('Profile updated successfully!');
      else toast.error('Failed to update');
    } catch { toast.error('Error saving profile'); }
    setSaving(false);
  };

  if (status !== 'authenticated') return null;
  if (loading) return <AdminShell><div className="admin-loading-screen"><div className="admin-loading-spinner" /></div></AdminShell>;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">About Me</h1>
        <p className="admin-page-subtitle">Manage your personal information, hero text, and social links</p>
      </div>

      <div className="admin-card" style={{ marginBottom: 20 }}>
        <h3 className="admin-card-title" style={{ marginBottom: 16 }}>Hero Section</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Hero Title Prefix</label>
            <input className="admin-form-input" value={form.heroTitle || ''} onChange={e => setForm({ ...form, heroTitle: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Hero Title Accent (Highlighted)</label>
            <input className="admin-form-input" value={form.heroTitleAccent || ''} onChange={e => setForm({ ...form, heroTitleAccent: e.target.value })} />
          </div>
        </div>
        <div className="admin-form-row" style={{ marginTop: 16 }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Hero Title Suffix</label>
            <input className="admin-form-input" value={form.heroTitleEnd || ''} onChange={e => setForm({ ...form, heroTitleEnd: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Hero Subtitle</label>
            <input className="admin-form-input" value={form.heroSubtitle || ''} onChange={e => setForm({ ...form, heroSubtitle: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 20 }}>
        <h3 className="admin-card-title" style={{ marginBottom: 16 }}>Personal Info</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Full Name</label>
            <input className="admin-form-input" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Role / Headline</label>
            <input className="admin-form-input" value={form.role || ''} onChange={e => setForm({ ...form, role: e.target.value })} />
          </div>
        </div>
        <div className="admin-form-group" style={{ marginTop: 16 }}>
          <label className="admin-form-label">Short Description</label>
          <textarea className="admin-form-textarea" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} />
        </div>
        <div className="admin-form-group" style={{ marginTop: 16 }}>
          <label className="admin-form-label">Detailed Focus</label>
          <textarea className="admin-form-textarea" value={form.focusText || ''} onChange={e => setForm({ ...form, focusText: e.target.value })} rows={3} />
        </div>
        <div className="admin-form-row" style={{ marginTop: 16 }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Profile Image Path</label>
            <input className="admin-form-input" value={form.profileImage || ''} onChange={e => setForm({ ...form, profileImage: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Resume Google Drive URL</label>
            <input className="admin-form-input" value={form.resumeUrl || ''} onChange={e => setForm({ ...form, resumeUrl: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: 20 }}>
        <h3 className="admin-card-title" style={{ marginBottom: 16 }}>Contact & Social</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Email</label>
            <input className="admin-form-input" value={form.contactEmail || ''} onChange={e => setForm({ ...form, contactEmail: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Phone</label>
            <input className="admin-form-input" value={form.contactPhone || ''} onChange={e => setForm({ ...form, contactPhone: e.target.value })} />
          </div>
        </div>
        <div className="admin-form-row" style={{ marginTop: 16 }}>
          <div className="admin-form-group">
            <label className="admin-form-label">GitHub URL</label>
            <input className="admin-form-input" value={form.socialLinks?.github || ''} onChange={e => setForm({ ...form, socialLinks: { ...form.socialLinks, github: e.target.value } })} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">LinkedIn URL</label>
            <input className="admin-form-input" value={form.socialLinks?.linkedin || ''} onChange={e => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
          {saving ? <span className="admin-login-spinner" /> : <><HiOutlineSave size={16} /> Save Changes</>}
        </button>
      </div>
    </AdminShell>
  );
}
