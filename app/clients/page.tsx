import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { SignOutButton } from '@/components/auth/SignOutButton';

export default async function ClientsPage() {
  const session = await auth();

  if (!session?.user) redirect('/login');
  if (!session.user.approved) redirect('/pending');
  if (session.user.role !== 'CLIENT' && session.user.role !== 'ADMIN') {
    redirect('/login/redirect');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Client Dashboard</h1>
          <p className="text-xs text-slate-400">Straits Advisory</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-white">{session.user.name}</p>
            <p className="text-xs text-slate-400">{session.user.email}</p>
          </div>
          {session.user.image && (
            <img
              src={session.user.image}
              alt=""
              className="w-8 h-8 rounded-full"
            />
          )}
          <SignOutButton />
        </div>
      </header>

      {/* Content */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
              Welcome, {session.user.name}
            </h2>
            <p className="text-slate-400">
              Your client dashboard is being set up. Features coming soon.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
