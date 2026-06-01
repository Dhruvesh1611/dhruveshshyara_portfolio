'use client';
import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import CertForm from '@/components/admin/CertForm';
import toast from 'react-hot-toast';

export default function EditCertPage({ params }) {
  const { id } = use(params);
  const { status } = useSession();
  const router = useRouter();
  const [cert, setCert] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch(`/api/admin/certificates/${id}`).then(r => r.json()).then(setCert);
    }
  }, [status, id]);

  const handleSubmit = async (data) => {
    try {
      const res = await fetch(`/api/admin/certificates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Updated!');
        router.push('/admin/certificates');
      }
    } catch { toast.error('Error'); }
  };

  if (status !== 'authenticated') return null;
  return (
    <AdminShell>
      <div className="admin-page-header"><h1 className="admin-page-title">Edit Certificate</h1></div>
      {cert ? <CertForm initialData={cert} onSubmit={handleSubmit} isEdit /> : <div className="admin-loading-spinner" />}
    </AdminShell>
  );
}
