'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import HackathonForm from '@/components/admin/HackathonForm';
import toast from 'react-hot-toast';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { use } from 'react';

export default function EditHackathonPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') fetchData();
  }, [status, id]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/hackathons');
      if (res.ok) {
        const all = await res.json();
        const found = all.find(h => h.id === id);
        if (found) setData(found);
        else throw new Error('Not found');
      }
    } catch {
      toast.error('Failed to load memory');
      router.push('/admin/hackathons');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (updatedData) => {
    try {
      const res = await fetch(`/api/admin/hackathons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        toast.success('Hackathon memory updated!');
        router.push('/admin/hackathons');
      } else {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (status !== 'authenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <div>
          <Link href="/admin/hackathons" className="admin-back-link">
            <HiOutlineArrowLeft /> Back to Hackathons
          </Link>
          <h1 className="admin-page-title" style={{ marginTop: 8 }}>Edit Memory</h1>
        </div>
      </div>
      <div style={{ maxWidth: 800 }}>
        {loading ? (
          <div className="admin-loading-screen" style={{ minHeight: 200 }}><div className="admin-loading-spinner" /></div>
        ) : data ? (
          <HackathonForm initialData={data} onSubmit={handleSubmit} isEdit={true} />
        ) : null}
      </div>
    </AdminShell>
  );
}
