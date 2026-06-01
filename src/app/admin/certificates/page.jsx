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

export default function CertificatesListPage() {
  const { status } = useSession();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') fetchCerts();
  }, [status]);

  const fetchCerts = async () => {
    try {
      const res = await fetch('/api/admin/certificates');
      if (res.ok) setCerts(await res.json());
    } catch {
      toast.error('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/certificates/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCerts(prev => prev.filter(c => c.id !== id));
        toast.success('Certificate deleted');
        setDeleteId(null);
      }
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleToggleFeatured = async (cert) => {
    try {
      const res = await fetch(`/api/admin/certificates/${cert.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !cert.featured }),
      });
      if (res.ok) {
        setCerts(prev => prev.map(c => c.id === cert.id ? { ...c, featured: !c.featured } : c));
        toast.success(cert.featured ? 'Removed from featured' : 'Marked as featured');
      }
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleToggleStatus = async (cert) => {
    const newStatus = cert.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/admin/certificates/${cert.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setCerts(prev => prev.map(c => c.id === cert.id ? { ...c, status: newStatus } : c));
        toast.success(newStatus === 'published' ? 'Published' : 'Unpublished');
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filtered = certs.filter(c =>
    !search || c.title?.toLowerCase().includes(search.toLowerCase()) || c.issuer?.toLowerCase().includes(search.toLowerCase())
  );

  if (status !== 'authenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Certificates</h1>
        <p className="admin-page-subtitle">Manage your certifications and achievements</p>
        <div className="admin-page-header-actions">
          <Link href="/admin/certificates/new" className="admin-btn admin-btn--primary">
            <HiOutlinePlus size={16} /> Add Certificate
          </Link>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-box">
          <HiOutlineSearch size={18} />
          <input className="admin-search-input" placeholder="Search certificates..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="admin-loading-screen" style={{ minHeight: 200 }}><div className="admin-loading-spinner" /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-state-icon">🎓</div>
          <h3 className="admin-empty-state-title">No certificates found</h3>
          <p className="admin-empty-state-desc">Create your first certificate entry</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Certificate</th>
                <th>Issuer</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(cert => (
                <tr key={cert.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {cert.image && (cert.image.startsWith('/') || cert.image.startsWith('http')) && <img src={cert.image} alt="" className="admin-table-thumb" />}
                      <div className="admin-table-title">{cert.title}</div>
                    </div>
                  </td>
                  <td>{cert.issuer}</td>
                  <td><span className={`admin-badge admin-badge--${cert.status}`}>{cert.status}</span></td>
                  <td>
                    <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => handleToggleFeatured(cert)}>
                      <HiOutlineStar size={18} style={{ color: cert.featured ? '#f9e2af' : 'var(--admin-text-muted)', fill: cert.featured ? '#f9e2af' : 'none' }} />
                    </button>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Link href={`/admin/certificates/${cert.id}/edit`} className="admin-btn admin-btn--ghost admin-btn--icon"><HiOutlinePencil size={16} /></Link>
                      <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => handleToggleStatus(cert)}>
                        {cert.status === 'published' ? <HiOutlineEyeOff size={16} /> : <HiOutlineEye size={16} />}
                      </button>
                      <button className="admin-btn admin-btn--ghost admin-btn--icon" onClick={() => setDeleteId(cert.id)} style={{ color: 'var(--admin-danger)' }}><HiOutlineTrash size={16} /></button>
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
            <h3 className="admin-dialog-title">Delete Certificate</h3>
            <p className="admin-dialog-message">Are you sure you want to delete this certificate?</p>
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
