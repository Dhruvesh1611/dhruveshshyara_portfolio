'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import {
  HiOutlineFolder,
  HiOutlineAcademicCap,
  HiOutlineLightningBolt,
  HiOutlineStar,
  HiOutlinePhotograph,
  HiOutlineMail,
  HiOutlinePlus,
  HiOutlineUpload,
  HiOutlineEye,
  HiOutlinePencil,
} from 'react-icons/hi';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }
    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/admin/dashboard');
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setActivity(data.activity || []);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || status === 'unauthenticated') return null;

  return (
    <AdminShell>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Welcome back, {session?.user?.name || 'Admin'}! Here&apos;s your portfolio overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon--purple"><HiOutlineFolder size={22} /></div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats?.projects ?? '...'}</span>
            <span className="admin-stat-label">Projects</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon--blue"><HiOutlineAcademicCap size={22} /></div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats?.certificates ?? '...'}</span>
            <span className="admin-stat-label">Certificates</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon--green"><HiOutlineLightningBolt size={22} /></div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats?.skills ?? '...'}</span>
            <span className="admin-stat-label">Skills</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon--yellow"><HiOutlineStar size={22} /></div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats?.featured ?? '...'}</span>
            <span className="admin-stat-label">Featured</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon--red"><HiOutlinePhotograph size={22} /></div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats?.media ?? '...'}</span>
            <span className="admin-stat-label">Media</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon--blue"><HiOutlineMail size={22} /></div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{stats?.messages ?? '...'}</span>
            <span className="admin-stat-label">Messages</span>
          </div>
        </div>
      </div>

      {/* Dashboard Widgets */}
      <div className="admin-dashboard-grid">
        {/* Quick Actions */}
        <div className="admin-widget">
          <div className="admin-widget-header">
            <h3 className="admin-widget-title">Quick Actions</h3>
          </div>
          <div className="admin-quick-actions">
            <Link href="/admin/projects/new" className="admin-quick-action">
              <span className="admin-quick-action-icon"><HiOutlinePlus size={24} /></span>
              New Project
            </Link>
            <Link href="/admin/certificates/new" className="admin-quick-action">
              <span className="admin-quick-action-icon"><HiOutlinePlus size={24} /></span>
              New Certificate
            </Link>
            <Link href="/admin/media" className="admin-quick-action">
              <span className="admin-quick-action-icon"><HiOutlineUpload size={24} /></span>
              Upload Media
            </Link>
            <a href="/" target="_blank" rel="noopener noreferrer" className="admin-quick-action">
              <span className="admin-quick-action-icon"><HiOutlineEye size={24} /></span>
              View Portfolio
            </a>
            <Link href="/admin/about" className="admin-quick-action">
              <span className="admin-quick-action-icon"><HiOutlinePencil size={24} /></span>
              Edit Profile
            </Link>
            <Link href="/admin/settings" className="admin-quick-action">
              <span className="admin-quick-action-icon">⚙️</span>
              Settings
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-widget">
          <div className="admin-widget-header">
            <h3 className="admin-widget-title">Recent Activity</h3>
          </div>
          {activity.length === 0 ? (
            <div className="admin-empty-state" style={{ padding: '30px 10px' }}>
              <p className="admin-empty-state-desc">No activity yet. Start managing your portfolio!</p>
            </div>
          ) : (
            <div className="admin-activity-list">
              {activity.slice(0, 8).map((item) => (
                <div key={item.id} className="admin-activity-item">
                  <div className="admin-activity-dot" />
                  <div>
                    <div className="admin-activity-text">
                      <strong>{item.action}</strong> {item.entityType}: {item.entityTitle}
                    </div>
                    <div className="admin-activity-time">
                      {new Date(item.timestamp).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
