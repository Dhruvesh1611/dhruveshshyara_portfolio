'use client';
import { useState } from 'react';
import slugify from 'slugify';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlineX, HiOutlineSave, HiOutlineEye } from 'react-icons/hi';

const CATEGORIES = ['Fullstack', 'Frontend', 'Extension', 'UI/UX', 'Other'];

export default function ProjectForm({ initialData, onSubmit, isEdit = false }) {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Fullstack',
    description: '',
    detailedDescription: '',
    image: '',
    tags: [],
    youtubeVideoId: '',
    subtitle: '',
    timeline: '',
    role: '',
    purpose: '',
    github: '',
    live: '',
    status: 'draft',
    featured: false,
    features: [],
    challenges: [],
    standoutPoints: [],
    projectStructure: [],
    architecture: { frontend: '', backend: '', database: '' },
    seoTitle: '',
    seoDescription: '',
    ...initialData,
  });

  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [aiLoading, setAiLoading] = useState(false);

  const handleAiUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAiLoading(true);
    const toastId = toast.loading('AI is analyzing the project image...');
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'project');

      const res = await fetch('/api/admin/ai-extract', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to extract data');

      setForm((prev) => ({
        ...prev,
        title: data.data.title || prev.title,
        description: data.data.description || prev.description,
        slug: (!isEdit && data.data.title && !prev.slug) ? slugify(data.data.title, { lower: true, strict: true }) : prev.slug,
      }));
      
      if (data.data.technologies) {
        const techs = data.data.technologies.split(',').map(t => t.trim()).filter(Boolean);
        setForm((prev) => ({
           ...prev,
           tags: [...new Set([...prev.tags, ...techs])]
        }));
      }

      toast.success('AI successfully filled the form!', { id: toastId });
    } catch (err) {
      toast.error(`AI Error: ${err.message}`, { id: toastId });
    } finally {
      setAiLoading(false);
      e.target.value = '';
    }
  };

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field === 'title' && !isEdit) {
      setForm(prev => ({ ...prev, slug: slugify(value, { lower: true, strict: true }) }));
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput('');
    }
  };

  const removeTag = (t) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(x => x !== t) }));
  };

  const addFeature = () => {
    setForm(prev => ({
      ...prev,
      features: [...prev.features, { icon: '⚡', title: '', description: '' }]
    }));
  };

  const updateFeature = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? { ...f, [field]: value } : f)
    }));
  };

  const removeFeature = (index) => {
    setForm(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const addChallenge = () => {
    setForm(prev => ({
      ...prev,
      challenges: [...prev.challenges, { problem: '', solution: '' }]
    }));
  };

  const updateChallenge = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      challenges: prev.challenges.map((c, i) => i === index ? { ...c, [field]: value } : c)
    }));
  };

  const removeChallenge = (index) => {
    setForm(prev => ({ ...prev, challenges: prev.challenges.filter((_, i) => i !== index) }));
  };

  const addStandoutPoint = () => {
    setForm(prev => ({ ...prev, standoutPoints: [...prev.standoutPoints, ''] }));
  };

  const handleSubmit = async (publishStatus) => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Project Title is mandatory.';
    if (form.image && form.image.trim() && !form.image.trim().startsWith('/') && !form.image.trim().startsWith('http')) {
      newErrors.image = 'Image path must start with "/" (e.g., /projects/my-project.png) or be a full URL. Leave empty if no image.';
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
    try {
      await onSubmit({ ...form, status: publishStatus || form.status });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-form">
      {/* AI Auto-fill Section */}
      <div style={{ marginBottom: '24px', padding: '16px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.05)', border: '1px dashed rgba(99, 102, 241, 0.3)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontWeight: 500 }}>
          <span style={{ fontSize: '18px' }}>✨</span> AI Auto-fill
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Upload a screenshot of the project and our AI will automatically extract the title, description, and technologies.</p>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleAiUpload}
          disabled={aiLoading}
          style={{ marginTop: '8px', fontSize: '14px', cursor: aiLoading ? 'not-allowed' : 'pointer' }}
        />
      </div>

      {/* Title & Slug */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Project Title <span className="admin-required-star">*</span></label>
          <input className={`admin-form-input ${errors.title ? 'admin-form-input--error' : ''}`} style={{ paddingLeft: 14 }} value={form.title} onChange={(e) => { updateField('title', e.target.value); if(errors.title) setErrors({...errors, title: null}); }} placeholder="My Awesome Project" />
          {errors.title && <div className="admin-form-error-msg">⚠️ {errors.title}</div>}
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Slug</label>
          <input className="admin-form-input" style={{ paddingLeft: 14 }} value={form.slug} onChange={(e) => updateField('slug', e.target.value)} placeholder="my-awesome-project" />
        </div>
      </div>

      {/* Category & Status */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Category</label>
          <select className="admin-form-select" value={form.category} onChange={(e) => updateField('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Subtitle</label>
          <input className="admin-form-input" style={{ paddingLeft: 14 }} value={form.subtitle} onChange={(e) => updateField('subtitle', e.target.value)} placeholder="Short subtitle" />
        </div>
      </div>

      {/* Short Description */}
      <div className="admin-form-group">
        <label className="admin-form-label">Short Description</label>
        <textarea className="admin-form-textarea" value={typeof form.description === 'string' ? form.description : Array.isArray(form.description) ? form.description.join('\n') : ''} onChange={(e) => updateField('description', e.target.value)} placeholder="Brief project description..." rows={3} />
      </div>

      {/* Detailed Description */}
      <div className="admin-form-group">
        <label className="admin-form-label">Detailed Description</label>
        <textarea className="admin-form-textarea" style={{ minHeight: 200 }} value={form.detailedDescription} onChange={(e) => updateField('detailedDescription', e.target.value)} placeholder="Full project details, architecture, technical decisions..." />
      </div>

      {/* Image & YouTube */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Thumbnail Image Path</label>
          <input className={`admin-form-input ${errors.image ? 'admin-form-input--error' : ''}`} style={{ paddingLeft: 14 }} value={form.image} onChange={(e) => { updateField('image', e.target.value); if(errors.image) setErrors({...errors, image: null}); }} placeholder="/projects/my-project.png or leave empty" />
          {errors.image && <div className="admin-form-error-msg">⚠️ {errors.image}</div>}
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">YouTube Video ID</label>
          <input className="admin-form-input" style={{ paddingLeft: 14 }} value={form.youtubeVideoId || ''} onChange={(e) => updateField('youtubeVideoId', e.target.value)} placeholder="e.g. dQw4w9WgXcQ" />
        </div>
      </div>

      {/* Timeline & Role */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Timeline</label>
          <input className="admin-form-input" style={{ paddingLeft: 14 }} value={form.timeline || ''} onChange={(e) => updateField('timeline', e.target.value)} placeholder="Jan 2024 - Mar 2024" />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Role</label>
          <input className="admin-form-input" style={{ paddingLeft: 14 }} value={form.role || ''} onChange={(e) => updateField('role', e.target.value)} placeholder="Lead Developer" />
        </div>
      </div>

      {/* Purpose */}
      <div className="admin-form-group">
        <label className="admin-form-label">Purpose</label>
        <textarea className="admin-form-textarea" value={form.purpose || ''} onChange={(e) => updateField('purpose', e.target.value)} placeholder="Why this project was built..." rows={3} />
      </div>

      {/* Technologies/Tags */}
      <div className="admin-form-group">
        <label className="admin-form-label">Technologies</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="admin-form-input" style={{ paddingLeft: 14 }} value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} placeholder="Type and press Enter" />
          <button type="button" className="admin-btn admin-btn--secondary" onClick={addTag}><HiOutlinePlus size={16} /></button>
        </div>
        {form.tags.length > 0 && (
          <div className="admin-tag-list">
            {form.tags.map(tag => (
              <span key={tag} className="admin-tag">
                {tag}
                <button className="admin-tag-remove" onClick={() => removeTag(tag)}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Links */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">GitHub URL</label>
          <input className="admin-form-input" style={{ paddingLeft: 14 }} value={form.github || ''} onChange={(e) => updateField('github', e.target.value)} placeholder="https://github.com/..." />
        </div>
        <div className="admin-form-group">
          <label className="admin-form-label">Live URL</label>
          <input className="admin-form-input" style={{ paddingLeft: 14 }} value={form.live || ''} onChange={(e) => updateField('live', e.target.value)} placeholder="https://..." />
        </div>
      </div>

      {/* Architecture */}
      <div className="admin-card" style={{ marginTop: 8 }}>
        <h3 className="admin-card-title" style={{ marginBottom: 16 }}>Architecture</h3>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Frontend</label>
            <input className="admin-form-input" style={{ paddingLeft: 14 }} value={form.architecture?.frontend || ''} onChange={(e) => setForm(prev => ({ ...prev, architecture: { ...prev.architecture, frontend: e.target.value } }))} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Backend</label>
            <input className="admin-form-input" style={{ paddingLeft: 14 }} value={form.architecture?.backend || ''} onChange={(e) => setForm(prev => ({ ...prev, architecture: { ...prev.architecture, backend: e.target.value } }))} />
          </div>
        </div>
        <div className="admin-form-group" style={{ marginTop: 16 }}>
          <label className="admin-form-label">Database</label>
          <input className="admin-form-input" style={{ paddingLeft: 14 }} value={form.architecture?.database || ''} onChange={(e) => setForm(prev => ({ ...prev, architecture: { ...prev.architecture, database: e.target.value } }))} />
        </div>
      </div>

      {/* Features */}
      <div className="admin-card" style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 className="admin-card-title">Features</h3>
          <button type="button" className="admin-btn admin-btn--secondary admin-btn--sm" onClick={addFeature}><HiOutlinePlus size={14} /> Add</button>
        </div>
        {form.features.map((feat, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-start' }}>
            <input className="admin-form-input" style={{ paddingLeft: 14, width: 50, flexShrink: 0 }} value={feat.icon} onChange={(e) => updateFeature(i, 'icon', e.target.value)} />
            <input className="admin-form-input" style={{ paddingLeft: 14, flex: 1 }} value={feat.title} onChange={(e) => updateFeature(i, 'title', e.target.value)} placeholder="Feature title" />
            <input className="admin-form-input" style={{ paddingLeft: 14, flex: 2 }} value={feat.description} onChange={(e) => updateFeature(i, 'description', e.target.value)} placeholder="Description" />
            <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => removeFeature(i)}><HiOutlineX size={16} /></button>
          </div>
        ))}
      </div>

      {/* Challenges */}
      <div className="admin-card" style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 className="admin-card-title">Challenges & Solutions</h3>
          <button type="button" className="admin-btn admin-btn--secondary admin-btn--sm" onClick={addChallenge}><HiOutlinePlus size={14} /> Add</button>
        </div>
        {(form.challenges || []).map((ch, i) => (
          <div key={i} style={{ marginBottom: 16, position: 'relative' }}>
            <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => removeChallenge(i)} style={{ position: 'absolute', top: 0, right: 0 }}><HiOutlineX size={14} /></button>
            <div className="admin-form-group">
              <label className="admin-form-label">Problem</label>
              <textarea className="admin-form-textarea" value={ch.problem} onChange={(e) => updateChallenge(i, 'problem', e.target.value)} rows={2} />
            </div>
            <div className="admin-form-group" style={{ marginTop: 8 }}>
              <label className="admin-form-label">Solution</label>
              <textarea className="admin-form-textarea" value={ch.solution} onChange={(e) => updateChallenge(i, 'solution', e.target.value)} rows={2} />
            </div>
          </div>
        ))}
      </div>

      {/* Standout Points */}
      <div className="admin-card" style={{ marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 className="admin-card-title">Standout Points</h3>
          <button type="button" className="admin-btn admin-btn--secondary admin-btn--sm" onClick={addStandoutPoint}><HiOutlinePlus size={14} /> Add</button>
        </div>
        {(form.standoutPoints || []).map((pt, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input className="admin-form-input" style={{ paddingLeft: 14, flex: 1 }} value={pt} onChange={(e) => setForm(prev => ({ ...prev, standoutPoints: prev.standoutPoints.map((p, j) => j === i ? e.target.value : p) }))} placeholder="Key highlight..." />
            <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => setForm(prev => ({ ...prev, standoutPoints: prev.standoutPoints.filter((_, j) => j !== i) }))}><HiOutlineX size={16} /></button>
          </div>
        ))}
      </div>

      {/* SEO */}
      <div className="admin-card" style={{ marginTop: 8 }}>
        <h3 className="admin-card-title" style={{ marginBottom: 16 }}>SEO</h3>
        <div className="admin-form-group">
          <label className="admin-form-label">SEO Title</label>
          <input className="admin-form-input" style={{ paddingLeft: 14 }} value={form.seoTitle || ''} onChange={(e) => updateField('seoTitle', e.target.value)} placeholder="Custom SEO title" />
        </div>
        <div className="admin-form-group" style={{ marginTop: 12 }}>
          <label className="admin-form-label">SEO Description</label>
          <textarea className="admin-form-textarea" value={form.seoDescription || ''} onChange={(e) => updateField('seoDescription', e.target.value)} placeholder="Meta description for search engines" rows={2} />
        </div>
      </div>

      {/* Featured Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
        <label className="admin-toggle">
          <input type="checkbox" checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)} />
          <span className="admin-toggle-slider" />
        </label>
        <span className="admin-form-label" style={{ margin: 0 }}>Featured Project</span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 12, marginTop: 16, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button className="admin-btn admin-btn--secondary" onClick={() => handleSubmit('draft')} disabled={saving}>
          <HiOutlineSave size={16} /> Save Draft
        </button>
        <button className="admin-btn admin-btn--primary" onClick={() => handleSubmit('published')} disabled={saving}>
          {saving ? <span className="admin-login-spinner" /> : <><HiOutlineEye size={16} /> {isEdit ? 'Update & Publish' : 'Publish'}</>}
        </button>
      </div>
    </div>
  );
}
