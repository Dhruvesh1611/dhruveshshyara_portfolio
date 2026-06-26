'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import HackathonForm from '@/components/admin/HackathonForm';
import toast from 'react-hot-toast';
import { HiOutlineArrowLeft } from 'react-icons/hi';

export default function NewHackathonPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status !== 'authenticated') return null;

  const handleSubmit = async (data) => {
    try {
      const res = await fetch('/api/admin/hackathons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('Hackathon memory saved!');
        router.push('/admin/hackathons');
      } else {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AdminShell>
      <div className="admin-page-header">
        <div>
          <Link href="/admin/hackathons" className="admin-back-link">
            <HiOutlineArrowLeft /> Back to Hackathons
          </Link>
          <h1 className="admin-page-title" style={{ marginTop: 8 }}>Add New Memory</h1>
        </div>
      </div>
      <div style={{ maxWidth: 800 }}>
        <HackathonForm onSubmit={handleSubmit} />
      </div>
    </AdminShell>
  );
}
