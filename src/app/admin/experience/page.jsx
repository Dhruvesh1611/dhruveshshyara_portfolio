'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AdminShell from '@/components/admin/AdminShell';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

export default function ExperiencePage() {
  const { status } = useSession();
  const [exp, setExp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({ company: '', position: '', duration: '', description: '', location: '' });

  useEffect(() => {
    if (status === 'authenticated') fetchExp();
  }, [status]);

  const fetchExp = async () => {
    try {
      const res = await fetch('/api/admin/experience');
      if (res.ok) setExp(await res.json());
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!form.company.trim()) newErrors.company = 'Company is mandatory.';
    if (!form.position.trim()) newErrors.position = 'Position is mandatory.';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Validation Error: Please fill in all mandatory fields.', {
        duration: 4000,
        icon: '⚠️',
        style: { background: '#f87171', color: '#fff' },
      });
      return;
    }
    setErrors({});
    
    try {
      const url = editing ? `/api/admin/experience/${editing}` : '/api/admin/experience';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) {
        toast.success(editing ? 'Updated' : 'Added');
        setEditing(null);
        setForm({ company: '', position: '', duration: '', description: '', location: '' });
        fetchExp();
      }
    } catch { toast.error('Error saving experience'); }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/experience/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setExp(prev => prev.filter(e => e.id !== id));
        toast.success('Deleted');
        setDeleteId(null);
      }
    } catch { toast.error('Error'); }
  };

  const editExp = (e) => { setEditing(e.id); setForm(e); setErrors({}); };
  const cancelEdit = () => { setEditing(null); setForm({ company: '', position: '', duration: '', description: '', location: '' }); setErrors({}); };

  if (status !== 'authenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Experience</h1>
        <p className="admin-page-subtitle">Manage your work history and positions</p>
      </div>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h3 className="admin-card-title" style={{ marginBottom: 16 }}>{editing ? 'Edit Experience' : 'Add New Experience'}</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Company/Organization <span className="admin-required-star">*</span></label>
            <input className={`admin-form-input ${errors.company ? 'admin-form-input--error' : ''}`} value={form.company} onChange={e => { setForm({ ...form, company: e.target.value }); if(errors.company) setErrors({...errors, company: null}); }} />
            {errors.company && <div className="admin-form-error-msg">⚠️ {errors.company}</div>}
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Position/Role <span className="admin-required-star">*</span></label>
            <input className={`admin-form-input ${errors.position ? 'admin-form-input--error' : ''}`} value={form.position} onChange={e => { setForm({ ...form, position: e.target.value }); if(errors.position) setErrors({...errors, position: null}); }} />
            {errors.position && <div className="admin-form-error-msg">⚠️ {errors.position}</div>}
          </div>
        </div>
        <div className="admin-form-row" style={{ marginTop: 16 }}>
          <div className="admin-form-group"><label className="admin-form-label">Duration (e.g., Jan 2023 - Present)</label><input className="admin-form-input" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-form-label">Location</label><input className="admin-form-input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
        </div>
        <div className="admin-form-group" style={{ marginTop: 16 }}>
          <label className="admin-form-label">Description / Responsibilities</label>
          <textarea className="admin-form-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="admin-btn admin-btn--primary" onClick={handleSave}>{editing ? 'Update' : 'Add'} Experience</button>
          {editing && <button className="admin-btn admin-btn--secondary" onClick={cancelEdit}>Cancel</button>}
        </div>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead><tr><th>Company</th><th>Position</th><th>Duration</th><th>Actions</th></tr></thead>
          <tbody>
            {exp.map(e => (
              <tr key={e.id}>
                <td style={{ fontWeight: 600 }}>{e.company}</td>
                <td>{e.position}</td>
                <td>{e.duration}</td>
                <td>
                  <div className="admin-table-actions">
                    <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => editExp(e)}><HiOutlinePencil size={16} /></button>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => setDeleteId(e.id)} style={{ color: 'var(--admin-danger)' }}><HiOutlineTrash size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {exp.length === 0 && <div className="admin-empty-state"><p>No experience entries found.</p></div>}
      </div>

      {deleteId && (
        <div className="admin-dialog-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-dialog" onClick={e => e.stopPropagation()}>
            <h3 className="admin-dialog-title">Delete Experience</h3>
            <p className="admin-dialog-message">Are you sure you want to delete this entry?</p>
            <div className="admin-dialog-actions">
              <button className="admin-btn admin-btn--secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
