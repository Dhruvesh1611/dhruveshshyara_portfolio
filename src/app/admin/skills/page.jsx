'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AdminShell from '@/components/admin/AdminShell';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch, HiOutlineStar } from 'react-icons/hi';

export default function SkillsPage() {
  const { status } = useSession();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({ name: '', icon: '', category: 'Frontend', level: 80, featured: false, invert: false });

  useEffect(() => {
    if (status === 'authenticated') fetchSkills();
  }, [status]);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/admin/skills');
      if (res.ok) setSkills(await res.json());
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Skill Name is mandatory.';
    if (form.icon && form.icon.trim() && !form.icon.trim().startsWith('/') && !form.icon.trim().startsWith('http')) {
      newErrors.icon = 'Icon path must start with "/" (e.g., /png/reactlogo.png) or be a full URL (https://...). Leave empty if no icon.';
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
    try {
      const url = editing ? `/api/admin/skills/${editing}` : '/api/admin/skills';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) {
        toast.success(editing ? 'Updated' : 'Added');
        setEditing(null);
        setForm({ name: '', icon: '', category: 'Frontend', level: 80, featured: false, invert: false });
        fetchSkills();
      }
    } catch { toast.error('Error saving skill'); }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSkills(prev => prev.filter(s => s.id !== id));
        toast.success('Deleted');
        setDeleteId(null);
      }
    } catch { toast.error('Error'); }
  };

  const editSkill = (s) => { setEditing(s.id); setForm(s); setErrors({}); };
  const cancelEdit = () => { setEditing(null); setForm({ name: '', icon: '', category: 'Frontend', level: 80, featured: false, invert: false }); setErrors({}); };

  if (status !== 'authenticated') return null;
  const filtered = skills.filter(s => !search || s.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Skills</h1>
        <p className="admin-page-subtitle">Manage your skills and expertise levels</p>
      </div>

      <div className="admin-card" style={{ marginBottom: 24 }}>
        <h3 className="admin-card-title" style={{ marginBottom: 16 }}>{editing ? 'Edit Skill' : 'Add New Skill'}</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Name <span className="admin-required-star">*</span></label>
            <input className={`admin-form-input ${errors.name ? 'admin-form-input--error' : ''}`} value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); if(errors.name) setErrors({...errors, name: null}); }} />
            {errors.name && <div className="admin-form-error-msg">⚠️ {errors.name}</div>}
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Category</label>
            <select className="admin-form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="Frontend">Frontend</option><option value="Backend">Backend</option><option value="Database">Database</option><option value="Tools">Tools</option><option value="Cloud">Cloud</option><option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="admin-form-row" style={{ marginTop: 16 }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Icon Path (e.g., /png/reactlogo.png)</label>
            <input className={`admin-form-input ${errors.icon ? 'admin-form-input--error' : ''}`} value={form.icon} onChange={e => { setForm({ ...form, icon: e.target.value }); if(errors.icon) setErrors({...errors, icon: null}); }} placeholder="Leave empty if no icon" />
            {errors.icon && <div className="admin-form-error-msg">⚠️ {errors.icon}</div>}
          </div>
          <div className="admin-form-group"><label className="admin-form-label">Proficiency Level (%)</label><input type="number" className="admin-form-input" value={form.level} onChange={e => setForm({ ...form, level: parseInt(e.target.value) })} /></div>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
          <label className="admin-toggle" style={{ display: 'flex', alignItems: 'center', gap: 8, width: 'auto' }}>
            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /><span className="admin-toggle-slider" style={{ position: 'relative' }} /><span className="admin-form-label" style={{ margin: 0 }}>Featured</span>
          </label>
          <label className="admin-toggle" style={{ display: 'flex', alignItems: 'center', gap: 8, width: 'auto' }}>
            <input type="checkbox" checked={form.invert} onChange={e => setForm({ ...form, invert: e.target.checked })} /><span className="admin-toggle-slider" style={{ position: 'relative' }} /><span className="admin-form-label" style={{ margin: 0 }}>Invert Icon (Dark mode)</span>
          </label>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="admin-btn admin-btn--primary" onClick={handleSave}>{editing ? 'Update' : 'Add'} Skill</button>
          {editing && <button className="admin-btn admin-btn--secondary" onClick={cancelEdit}>Cancel</button>}
        </div>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead><tr><th>Skill</th><th>Category</th><th>Level</th><th>Featured</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td>{s.category}</td>
                <td>{s.level}%</td>
                <td>{s.featured ? <HiOutlineStar color="#f9e2af" fill="#f9e2af" /> : '-'}</td>
                <td>
                  <div className="admin-table-actions">
                    <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => editSkill(s)}><HiOutlinePencil size={16} /></button>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => setDeleteId(s.id)} style={{ color: 'var(--admin-danger)' }}><HiOutlineTrash size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="admin-dialog-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-dialog" onClick={e => e.stopPropagation()}>
            <h3 className="admin-dialog-title">Delete Skill</h3>
            <p className="admin-dialog-message">Are you sure you want to delete this skill?</p>
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
