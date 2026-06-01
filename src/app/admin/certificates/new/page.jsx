'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import CertForm from '@/components/admin/CertForm';
import toast from 'react-hot-toast';

export default function NewCertPage() {
  const { status } = useSession();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Created!');
        router.push('/admin/certificates');
      } else toast.error('Failed');
    } catch { toast.error('Error'); }
  };

  if (status !== 'authenticated') return null;
  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">New Certificate</h1>
      </div>
      <CertForm onSubmit={handleSubmit} />
    </AdminShell>
  );
}
