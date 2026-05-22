import AuthProvider from '@/components/admin/AuthProvider';
import './admin.css';

export const metadata = {
  title: 'Admin Panel | Dhruvesh Shyara Portfolio',
  description: 'Manage your portfolio content',
};

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
