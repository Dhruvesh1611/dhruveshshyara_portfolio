'use client';
import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import ProjectForm from '@/components/admin/ProjectForm';
import toast from 'react-hot-toast';

export default function EditProjectPage({ params }) {
  const { id } = use(params);
  const { status } = useSession();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch(`/api/admin/projects/${id}`)
        .then(r => r.json())
        .then(data => { setProject(data); setLoading(false); })
        .catch(() => { toast.error('Project not found'); setLoading(false); });
    }
  }, [status, id]);

  const handleSubmit = async (data) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Project updated!');
        router.push('/admin/projects');
      } else {
        toast.error('Failed to update');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  if (status !== 'authenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Edit Project</h1>
        <p className="admin-page-subtitle">{project?.title || 'Loading...'}</p>
      </div>
      {loading ? (
        <div className="admin-loading-screen" style={{ minHeight: 200 }}><div className="admin-loading-spinner" /></div>
      ) : project ? (
        <ProjectForm initialData={project} onSubmit={handleSubmit} isEdit />
      ) : (
        <div className="admin-empty-state"><h3 className="admin-empty-state-title">Project not found</h3></div>
      )}
    </AdminShell>
  );
}
