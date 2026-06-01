'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineSave, HiOutlineEye } from 'react-icons/hi';

export default function CertForm({ initialData, onSubmit, isEdit = false }) {
  const [form, setForm] = useState({
    title: '', issuer: '', description: '', date: '', image: '', link: '', status: 'draft', featured: false, relatedSkills: [], ...initialData
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (status) => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Certificate Title is mandatory.';
    if (form.image && form.image.trim() && !form.image.trim().startsWith('/') && !form.image.trim().startsWith('http')) {
      newErrors.image = 'Image path must start with "/" (e.g., /certificates/cert.png) or be a full URL (https://...). Leave empty if no image.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Validation Error: Please fix the highlighted fields.', {
        duration: 4000,
        icon: '⚠️',
        style: { background: '#f87171', color: '#fff' },
      });
      return;
    }
    setErrors({});
    setSaving(true);
    await onSubmit({ ...form, status: status || form.status });
    setSaving(false);
  };

  return (
    <div className="admin-form">
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Title <span className="admin-required-star">*</span></label>
          <input className={`admin-form-input ${errors.title ? 'admin-form-input--error' : ''}`} value={form.title} onChange={e => { setForm({ ...form, title: e.target.value }); if(errors.title) setErrors({...errors, title: null}); }} />
          {errors.title && <div className="admin-form-error-msg">⚠️ {errors.title}</div>}
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Issuer</label>
          <input className="admin-form-input" value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} />
        </div>
      </div>
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Date (e.g., 2024 or Aug 2024)</label>
          <input className="admin-form-input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Credential Link</label>
          <input className="admin-form-input" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
        </div>
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Description</label>
        <textarea className="admin-form-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Image Path</label>
        <input className={`admin-form-input ${errors.image ? 'admin-form-input--error' : ''}`} value={form.image} onChange={e => { setForm({ ...form, image: e.target.value }); if(errors.image) setErrors({...errors, image: null}); }} placeholder="/certificates/image.png or leave empty" />
        {errors.image && <div className="admin-form-error-msg">⚠️ {errors.image}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
        <label className="admin-toggle"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /><span className="admin-toggle-slider" /></label>
        <span className="admin-form-label" style={{ margin: 0 }}>Featured Certificate</span>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 16, justifyContent: 'flex-end' }}>
        <button className="admin-btn admin-btn--secondary" onClick={() => handleSubmit('draft')} disabled={saving}><HiOutlineSave size={16} /> Save Draft</button>
        <button className="admin-btn admin-btn--primary" onClick={() => handleSubmit('published')} disabled={saving}>{saving ? <span className="admin-login-spinner" /> : <><HiOutlineEye size={16} /> {isEdit ? 'Update & Publish' : 'Publish'}</>}</button>
      </div>
    </div>
  );
}
