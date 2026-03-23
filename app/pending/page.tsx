import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { SignOutButton } from '@/components/auth/SignOutButton';

export default async function PendingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  // If already approved, redirect to the right dashboard
  if (session.user.approved) {
    switch (session.user.role) {
      case 'ADMIN':
        redirect('/admin');
      case 'AGENT':
        redirect('/agent');
      case 'CLIENT':
        redirect('/clients');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
          {/* Pending icon */}
          <div className="w-16 h-16 rounded-full bg-[#D4C4A8]/10 border border-[#D4C4A8]/20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-[#D4C4A8]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>

          <h1 className="text-xl font-bold text-white mb-2">
            Account Pending Approval
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            Your account has been created successfully. An administrator will
            review and approve your access shortly.
          </p>

          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <p className="text-xs text-slate-500 mb-1">Signed in as</p>
            <p className="text-sm text-white font-medium">
              {session.user.email}
            </p>
          </div>

          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
