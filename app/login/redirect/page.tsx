import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function RedirectPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const { role, approved } = session.user;

  if (!approved) {
    redirect('/pending');
  }

  switch (role) {
    case 'ADMIN':
      redirect('/admin');
    case 'AGENT':
      redirect('/agent');
    case 'CLIENT':
      redirect('/clients');
    default:
      redirect('/pending');
  }
}
