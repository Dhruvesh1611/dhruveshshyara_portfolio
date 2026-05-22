'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import ProjectForm from '@/components/admin/ProjectForm';
import toast from 'react-hot-toast';

export default function NewProjectPage() {
  const { status } = useSession();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Project created!');
        router.push('/admin/projects');
      } else {
        toast.error('Failed to create project');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  if (status !== 'authenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">New Project</h1>
        <p className="admin-page-subtitle">Create a new portfolio project</p>
      </div>
      <ProjectForm onSubmit={handleSubmit} />
    </AdminShell>
  );
}
