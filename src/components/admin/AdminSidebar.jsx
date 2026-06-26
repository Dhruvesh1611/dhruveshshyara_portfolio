'use client';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  HiOutlineHome,
  HiOutlineFolder,
  HiOutlineAcademicCap,
  HiOutlineLightningBolt,
  HiOutlineBriefcase,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlinePhotograph,
  HiOutlineSearch,
  HiOutlineMail,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineGlobe,
  HiOutlineEye,
  HiOutlineCamera,
} from 'react-icons/hi';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: HiOutlineHome },
  { type: 'divider', label: 'Content' },
  { name: 'Projects', href: '/admin/projects', icon: HiOutlineFolder },
  { name: 'Certificates', href: '/admin/certificates', icon: HiOutlineAcademicCap },
  { name: 'Hackathons', href: '/admin/hackathons', icon: HiOutlineCamera },
  { name: 'Skills', href: '/admin/skills', icon: HiOutlineLightningBolt },
  { name: 'Experience', href: '/admin/experience', icon: HiOutlineBriefcase },
  { name: 'About', href: '/admin/about', icon: HiOutlineUser },
  { name: 'Content', href: '/admin/content', icon: HiOutlineDocumentText },
  { type: 'divider', label: 'Assets & SEO' },
  { name: 'Media Library', href: '/admin/media', icon: HiOutlinePhotograph },
  { name: 'SEO', href: '/admin/seo', icon: HiOutlineSearch },
  { name: 'Appearance', href: '/admin/appearance', icon: HiOutlineEye },
  { type: 'divider', label: 'Communication' },
  { name: 'Messages', href: '/admin/messages', icon: HiOutlineMail },
  { name: 'Analytics', href: '/admin/analytics', icon: HiOutlineChartBar },
  { type: 'divider', label: 'System' },
  { name: 'Settings', href: '/admin/settings', icon: HiOutlineCog },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button className="admin-mobile-menu-btn" onClick={() => setMobileOpen(true)}>
        <HiOutlineMenu size={22} />
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`admin-sidebar ${collapsed ? 'admin-sidebar--collapsed' : ''} ${mobileOpen ? 'admin-sidebar--mobile-open' : ''}`}>
        {/* Header */}
        <div className="admin-sidebar-header">
          {!collapsed && (
            <Link href="/admin" className="admin-sidebar-brand">
              <div className="admin-sidebar-logo">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="10" fill="url(#sb-grad)" />
                  <path d="M12 28V12h5.5c1.8 0 3.2.5 4.2 1.4 1 .9 1.5 2.2 1.5 3.7 0 1-.3 1.9-.8 2.7-.5.7-1.3 1.3-2.2 1.6l3.5 6.6h-3.4l-3-5.9H15v5.9h-3zm3-8.5h2.3c1 0 1.7-.2 2.2-.7.5-.5.7-1.1.7-1.9 0-.8-.2-1.4-.7-1.9-.5-.4-1.2-.7-2.2-.7H15v5.2z" fill="white"/>
                  <defs><linearGradient id="sb-grad" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient></defs>
                </svg>
              </div>
              <span className="admin-sidebar-brand-text">Portfolio CMS</span>
            </Link>
          )}
          <button className="admin-sidebar-toggle desktop-only" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <HiOutlineMenu size={18} /> : <HiOutlineX size={18} />}
          </button>
          <button className="admin-sidebar-toggle mobile-only" onClick={() => setMobileOpen(false)}>
            <HiOutlineX size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          {sidebarItems.map((item, i) => {
            if (item.type === 'divider') {
              return (
                <div key={i} className="admin-sidebar-divider">
                  {!collapsed && <span>{item.label}</span>}
                </div>
              );
            }
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar-link ${isActive(item.href) ? 'admin-sidebar-link--active' : ''}`}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.name : undefined}
              >
                <Icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer — User Profile & Actions */}
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-sidebar-link admin-sidebar-link--view">
            <HiOutlineGlobe size={20} />
            {!collapsed && <span>View Portfolio</span>}
          </a>
          <button className="admin-sidebar-link admin-sidebar-link--logout" onClick={handleLogout}>
            <HiOutlineLogout size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
          {!collapsed && session?.user && (
            <div className="admin-sidebar-user">
              <div className="admin-sidebar-user-avatar">
                {session.user.name?.[0] || 'A'}
              </div>
              <div className="admin-sidebar-user-info">
                <span className="admin-sidebar-user-name">{session.user.name}</span>
                <span className="admin-sidebar-user-role">Administrator</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
