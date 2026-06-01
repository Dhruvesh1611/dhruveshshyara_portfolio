'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AdminShell from '@/components/admin/AdminShell';
import toast from 'react-hot-toast';

export default function AppearancePage() {
  const { status } = useSession();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/admin/settings').then(r => r.json()).then(data => setSettings(data.appearance || { sections: [], featuredMode: false }));
    }
  }, [status]);

  const toggleSection = (id) => {
    const newSections = settings.sections.map(s => s.id === id ? { ...s, visible: !s.visible } : s);
    setSettings({ ...settings, sections: newSections });
  };

  const handleSave = async () => {
    try {
      const current = await fetch('/api/admin/settings').then(r => r.json());
      const res = await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...current, appearance: settings }) });
      if (res.ok) toast.success('Appearance updated');
    } catch { toast.error('Error'); }
  };

  if (status !== 'authenticated') return null;
  if (!settings) return <AdminShell><div className="admin-loading-spinner" /></AdminShell>;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Appearance</h1>
        <p className="admin-page-subtitle">Control section visibility on your portfolio</p>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title" style={{ marginBottom: 16 }}>Section Visibility</h3>
        <div className="admin-section-list">
          {settings.sections.map((section) => (
            <div key={section.id} className="admin-section-item">
              <span className="admin-section-item-name">{section.name}</span>
              <label className="admin-toggle">
                <input type="checkbox" checked={section.visible} onChange={() => toggleSection(section.id)} />
                <span className="admin-toggle-slider" />
              </label>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <label className="admin-toggle" style={{ display: 'flex', alignItems: 'center', gap: 12, width: 'auto' }}>
            <input type="checkbox" checked={settings.featuredMode} onChange={e => setSettings({ ...settings, featuredMode: e.target.checked })} />
            <span className="admin-toggle-slider" style={{ position: 'relative' }} />
            <span className="admin-form-label" style={{ margin: 0 }}>Featured Mode (Only show featured projects/skills on home page)</span>
          </label>
        </div>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="admin-btn admin-btn--primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </AdminShell>
  );
}
