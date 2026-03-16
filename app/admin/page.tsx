import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { AdminDashboard } from '@/components/auth/AdminDashboard';

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/login/redirect');

  return <AdminDashboard currentUserId={session.user.id} />;
}
