'use client';

import { useState, useEffect, useCallback } from 'react';
import { signOut } from 'next-auth/react';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  approved: boolean;
  createdAt: string;
}

export function AdminDashboard({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data.users);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateUser = async (
    userId: string,
    updates: { role?: string; approved?: boolean }
  ) => {
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...updates }),
    });
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>
          <p className="text-xs text-slate-400">Straits Advisory — User Management</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </header>

      {/* Content */}
      <main className="p-6 max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading users...</div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-4 py-3 text-slate-400 font-medium">User</th>
                  <th className="px-4 py-3 text-slate-400 font-medium">Role</th>
                  <th className="px-4 py-3 text-slate-400 font-medium">Status</th>
                  <th className="px-4 py-3 text-slate-400 font-medium">Joined</th>
                  <th className="px-4 py-3 text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    {/* User info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">
                            {user.name?.[0] || '?'}
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role selector */}
                    <td className="px-4 py-3">
                      {user.id === currentUserId ? (
                        <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full">
                          ADMIN
                        </span>
                      ) : (
                        <select
                          value={user.role}
                          onChange={(e) =>
                            updateUser(user.id, { role: e.target.value })
                          }
                          className="bg-white/10 border border-white/10 text-white text-xs rounded-lg px-2 py-1 cursor-pointer"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CLIENT">CLIENT</option>
                          <option value="AGENT">AGENT</option>
                        </select>
                      )}
                    </td>

                    {/* Approval status */}
                    <td className="px-4 py-3">
                      {user.id === currentUserId ? (
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">
                          Approved
                        </span>
                      ) : user.approved ? (
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">
                          Approved
                        </span>
                      ) : (
                        <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Joined date */}
                    <td className="px-4 py-3 text-slate-400 text-xs">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      {user.id !== currentUserId && (
                        <div className="flex gap-2">
                          {!user.approved ? (
                            <button
                              onClick={() =>
                                updateUser(user.id, { approved: true })
                              }
                              className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg transition-colors cursor-pointer"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                updateUser(user.id, {
                                  approved: false,
                                  role: 'PENDING',
                                })
                              }
                              className="text-xs bg-red-600/80 hover:bg-red-500 text-white px-3 py-1 rounded-lg transition-colors cursor-pointer"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
