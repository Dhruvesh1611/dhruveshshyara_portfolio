'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineSave, HiOutlineEye } from 'react-icons/hi';

export default function HackathonForm({ initialData, onSubmit, isEdit = false }) {
  const [form, setForm] = useState({
    title: '', description: '', date: '', image: '', status: 'draft', featured: false, ...initialData
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [aiLoading, setAiLoading] = useState(false);

  const handleAiUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAiLoading(true);
    const toastId = toast.loading('AI is analyzing the photo...');
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'hackathon');

      const res = await fetch('/api/admin/ai-extract', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to extract data');

      setForm((prev) => ({
        ...prev,
        title: data.data.title || prev.title,
        date: data.data.date || prev.date,
        description: data.data.description || prev.description,
      }));
      toast.success('AI successfully filled the form!', { id: toastId });
    } catch (err) {
      toast.error(`AI Error: ${err.message}`, { id: toastId });
    } finally {
      setAiLoading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleSubmit = async (status) => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is mandatory.';
    if (form.image && form.image.trim() && !form.image.trim().startsWith('/') && !form.image.trim().startsWith('http')) {
      newErrors.image = 'Image path must start with "/" (e.g., /hackathons/photo.png) or be a full URL (https://...). Leave empty if no image.';
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
      {/* AI Auto-fill Section */}
      <div style={{ marginBottom: '24px', padding: '16px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.05)', border: '1px dashed rgba(99, 102, 241, 0.3)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontWeight: 500 }}>
          <span style={{ fontSize: '18px' }}>✨</span> AI Auto-fill
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Upload a screenshot of the hackathon photo and our AI will automatically fill the details below.</p>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleAiUpload}
          disabled={aiLoading}
          style={{ marginTop: '8px', fontSize: '14px', cursor: aiLoading ? 'not-allowed' : 'pointer' }}
        />
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group" style={{ flex: 2 }}>
          <label className="admin-form-label">Title (Event Name) <span className="admin-required-star">*</span></label>
          <input className={`admin-form-input ${errors.title ? 'admin-form-input--error' : ''}`} value={form.title} onChange={e => { setForm({ ...form, title: e.target.value }); if(errors.title) setErrors({...errors, title: null}); }} />
          {errors.title && <div className="admin-form-error-msg">⚠️ {errors.title}</div>}
        </div>
        <div className="admin-form-group" style={{ flex: 1 }}>
          <label className="admin-form-label">Date</label>
          <input className="admin-form-input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Description (Highlights & Memories)</label>
        <textarea className="admin-form-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} />
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Image Path</label>
        <input className={`admin-form-input ${errors.image ? 'admin-form-input--error' : ''}`} value={form.image} onChange={e => { setForm({ ...form, image: e.target.value }); if(errors.image) setErrors({...errors, image: null}); }} placeholder="/public/certificates/... or /hackathons/photo.png or leave empty" />
        {errors.image && <div className="admin-form-error-msg">⚠️ {errors.image}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
        <label className="admin-toggle"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /><span className="admin-toggle-slider" /></label>
        <span className="admin-form-label" style={{ margin: 0 }}>Featured Memory</span>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 16, justifyContent: 'flex-end' }}>
        <button className="admin-btn admin-btn--secondary" onClick={() => handleSubmit('draft')} disabled={saving}><HiOutlineSave size={16} /> Save Draft</button>
        <button className="admin-btn admin-btn--primary" onClick={() => handleSubmit('published')} disabled={saving}>{saving ? <span className="admin-login-spinner" /> : <><HiOutlineEye size={16} /> {isEdit ? 'Update & Publish' : 'Publish'}</>}</button>
      </div>
    </div>
  );
}
