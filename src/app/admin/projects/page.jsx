'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import toast from 'react-hot-toast';
import {
  HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch,
  HiOutlineDuplicate, HiOutlineStar, HiOutlineEye, HiOutlineEyeOff,
} from 'react-icons/hi';

export default function ProjectsListPage() {
  const { status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') fetchProjects();
  }, [status]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
        toast.success('Project deleted');
        setDeleteId(null);
      }
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const handleDuplicate = async (project) => {
    try {
      const { id, slug, createdAt, updatedAt, ...rest } = project;
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...rest, title: `${rest.title} (Copy)`, status: 'draft' }),
      });
      if (res.ok) {
        const newProj = await res.json();
        setProjects(prev => [...prev, newProj]);
        toast.success('Project duplicated');
      }
    } catch {
      toast.error('Failed to duplicate');
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !project.featured }),
      });
      if (res.ok) {
        setProjects(prev => prev.map(p => p.id === project.id ? { ...p, featured: !p.featured } : p));
        toast.success(project.featured ? 'Removed from featured' : 'Marked as featured');
      }
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleToggleStatus = async (project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setProjects(prev => prev.map(p => p.id === project.id ? { ...p, status: newStatus } : p));
        toast.success(newStatus === 'published' ? 'Published' : 'Unpublished');
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    const matchesStatus = !statusFilter || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(projects.map(p => p.category).filter(Boolean))];

  if (status !== 'authenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Projects</h1>
        <p className="admin-page-subtitle">Manage your portfolio projects</p>
        <div className="admin-page-header-actions">
          <Link href="/admin/projects/new" className="admin-btn admin-btn--primary">
            <HiOutlinePlus size={16} /> Add Project
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search-box">
          <HiOutlineSearch size={18} />
          <input
            className="admin-search-input"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="admin-form-select" style={{ width: 'auto', minWidth: 140 }} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="admin-form-select" style={{ width: 'auto', minWidth: 140 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading-screen" style={{ minHeight: 200 }}>
          <div className="admin-loading-spinner" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">📁</div>
          <h3 className="admin-empty-state-title">No projects found</h3>
          <p className="admin-empty-state-desc">
            {search || categoryFilter || statusFilter ? 'Try adjusting your filters' : 'Create your first project to get started'}
          </p>
          {!search && !categoryFilter && !statusFilter && (
            <Link href="/admin/projects/new" className="admin-btn admin-btn--primary">
              <HiOutlinePlus size={16} /> Add Project
            </Link>
          )}
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(project => (
                <tr key={project.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {project.image && (
                        <img src={project.image} alt="" className="admin-table-thumb" />
                      )}
                      <div>
                        <div className="admin-table-title">{project.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                          /{project.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><span className="admin-badge admin-badge--featured">{project.category}</span></td>
                  <td>
                    <span className={`admin-badge admin-badge--${project.status}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="admin-btn admin-btn--ghost admin-btn--icon"
                      onClick={() => handleToggleFeatured(project)}
                      title={project.featured ? 'Remove featured' : 'Mark as featured'}
                    >
                      <HiOutlineStar size={18} style={{ color: project.featured ? '#f9e2af' : 'var(--admin-text-muted)', fill: project.featured ? '#f9e2af' : 'none' }} />
                    </button>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Link href={`/admin/projects/${project.id}/edit`} className="admin-btn admin-btn--ghost admin-btn--icon" title="Edit">
                        <HiOutlinePencil size={16} />
                      </Link>
                      <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => handleToggleStatus(project)} title={project.status === 'published' ? 'Unpublish' : 'Publish'}>
                        {project.status === 'published' ? <HiOutlineEyeOff size={16} /> : <HiOutlineEye size={16} />}
                      </button>
                      <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => handleDuplicate(project)} title="Duplicate">
                        <HiOutlineDuplicate size={16} />
                      </button>
                      <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => setDeleteId(project.id)} title="Delete" style={{ color: 'var(--admin-danger)' }}>
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteId && (
        <div className="admin-dialog-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-dialog" onClick={(e) => e.stopPropagation()}>
            <h3 className="admin-dialog-title">Delete Project</h3>
            <p className="admin-dialog-message">Are you sure you want to delete this project? This action cannot be undone.</p>
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
