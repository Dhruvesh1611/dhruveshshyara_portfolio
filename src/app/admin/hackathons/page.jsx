'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import toast from 'react-hot-toast';
import {
  HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch,
  HiOutlineStar, HiOutlineEye, HiOutlineEyeOff,
} from 'react-icons/hi';

export default function HackathonsListPage() {
  const { status } = useSession();
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') fetchHackathons();
  }, [status]);

  const fetchHackathons = async () => {
    try {
      const res = await fetch('/api/admin/hackathons');
      if (res.ok) setHackathons(await res.json());
    } catch {
      toast.error('Failed to load hackathons');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/hackathons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setHackathons(prev => prev.filter(h => h.id !== id));
        toast.success('Hackathon memory deleted');
        setDeleteId(null);
      }
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleToggleFeatured = async (hackathon) => {
    try {
      const res = await fetch(`/api/admin/hackathons/${hackathon.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !hackathon.featured }),
      });
      if (res.ok) {
        setHackathons(prev => prev.map(h => h.id === hackathon.id ? { ...h, featured: !h.featured } : h));
        toast.success(hackathon.featured ? 'Removed from featured' : 'Marked as featured');
      }
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleToggleStatus = async (hackathon) => {
    const newStatus = hackathon.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/admin/hackathons/${hackathon.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setHackathons(prev => prev.map(h => h.id === hackathon.id ? { ...h, status: newStatus } : h));
        toast.success(newStatus === 'published' ? 'Published' : 'Unpublished');
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filtered = hackathons.filter(h =>
    !search || h.title?.toLowerCase().includes(search.toLowerCase()) || h.description?.toLowerCase().includes(search.toLowerCase())
  );

  if (status !== 'authenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Hackathons</h1>
        <p className="admin-page-subtitle">Manage your hackathon photos and memories</p>
        <div className="admin-page-header-actions">
          <Link href="/admin/hackathons/new" className="admin-btn admin-btn--primary">
            <HiOutlinePlus size={16} /> Add Memory
          </Link>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-box">
          <HiOutlineSearch size={18} />
          <input className="admin-search-input" placeholder="Search hackathons..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="admin-loading-screen" style={{ minHeight: 200 }}><div className="admin-loading-spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">📸</div>
          <h3 className="admin-empty-state-title">No photos found</h3>
          <p className="admin-empty-state-desc">Upload your first hackathon memory</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(hackathon => (
                <tr key={hackathon.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {hackathon.image && (hackathon.image.startsWith('/') || hackathon.image.startsWith('http')) && <img src={hackathon.image} alt="" className="admin-table-thumb" />}
                      <div className="admin-table-title">{hackathon.title}</div>
                    </div>
                  </td>
                  <td>{hackathon.date}</td>
                  <td><span className={`admin-badge admin-badge--${hackathon.status}`}>{hackathon.status}</span></td>
                  <td>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => handleToggleFeatured(hackathon)}>
                      <HiOutlineStar size={18} style={{ color: hackathon.featured ? '#f9e2af' : 'var(--admin-text-muted)', fill: hackathon.featured ? '#f9e2af' : 'none' }} />
                    </button>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Link href={`/admin/hackathons/${hackathon.id}/edit`} className="admin-btn admin-btn--ghost admin-btn--icon"><HiOutlinePencil size={16} /></Link>
                      <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => handleToggleStatus(hackathon)}>
                        {hackathon.status === 'published' ? <HiOutlineEyeOff size={16} /> : <HiOutlineEye size={16} />}
                      </button>
                      <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => setDeleteId(hackathon.id)} style={{ color: 'var(--admin-danger)' }}><HiOutlineTrash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteId && (
        <div className="admin-dialog-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-dialog" onClick={e => e.stopPropagation()}>
            <h3 className="admin-dialog-title">Delete Hackathon Memory</h3>
            <p className="admin-dialog-message">Are you sure you want to delete this memory?</p>
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
