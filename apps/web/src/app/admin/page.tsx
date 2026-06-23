'use client';

import { useEffect, useState } from 'react';
import { supabase } from 'shared';

type Tab = 'donors' | 'banks' | 'camps' | 'chats';

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('donors');
  const [users, setUsers] = useState<any[]>([]);
  const [banks, setBanks] = useState<any[]>([]);
  const [camps, setCamps] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [usersRes, banksRes, campsRes, chatsRes] = await Promise.all([
      supabase.from('users').select('*').eq('is_verified', false),
      supabase.from('blood_banks').select('*').eq('verified', false),
      supabase.from('donation_camps').select('*').eq('status', 'pending'),
      supabase.from('chats').select('*').eq('status', 'reported')
    ]);
    if (usersRes.data) setUsers(usersRes.data);
    if (banksRes.data) setBanks(banksRes.data);
    if (campsRes.data) setCamps(campsRes.data);
    if (chatsRes.data) setChats(chatsRes.data);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const verifyUser = async (id: string) => { await supabase.from('users').update({ is_verified: true }).eq('id', id); loadData(); };
  const rejectUser = async (id: string) => { await supabase.from('users').delete().eq('id', id); loadData(); };
  const approveBank = async (id: string) => { await supabase.from('blood_banks').update({ verified: true }).eq('id', id); loadData(); };
  const rejectBank = async (id: string) => { await supabase.from('blood_banks').delete().eq('id', id); loadData(); };
  const approveCamp = async (id: string) => { await supabase.from('donation_camps').update({ status: 'approved' }).eq('id', id); loadData(); };
  const rejectCamp = async (id: string) => { await supabase.from('donation_camps').delete().eq('id', id); loadData(); };
  const resolveChat = async (id: string) => { await supabase.from('chats').update({ status: 'resolved' }).eq('id', id); loadData(); };

  const tabs: { key: Tab; label: string; count: number; icon: string }[] = [
    { key: 'donors', label: 'Pending Donors', count: users.length, icon: '👥' },
    { key: 'banks', label: 'Blood Banks', count: banks.length, icon: '🏥' },
    { key: 'camps', label: 'Camps', count: camps.length, icon: '⛺' },
    { key: 'chats', label: 'Reported Chats', count: chats.length, icon: '⚠️' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`p-5 rounded-2xl text-left transition-all border ${
              tab === t.key
                ? 'bg-white dark:bg-neutral-900 border-red-200 dark:border-red-500/20 shadow-lg'
                : 'bg-white/50 dark:bg-neutral-900/50 border-neutral-100 dark:border-neutral-800 hover:shadow-md'
            }`}
          >
            <span className="text-2xl mb-2 block">{t.icon}</span>
            <p className="text-2xl font-black text-neutral-900 dark:text-white">{t.count}</p>
            <p className="text-xs font-semibold text-neutral-500 mt-0.5">{t.label}</p>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm overflow-hidden">
          {/* Donors Tab */}
          {tab === 'donors' && (
            <div>
              <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Pending Donor Registrations</h2>
              </div>
              {users.length === 0 ? (
                <div className="px-6 py-12 text-center text-neutral-400">No pending donors</div>
              ) : (
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {users.map(u => (
                    <div key={u.id} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-950/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold">{u.name?.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-neutral-900 dark:text-white">{u.name}</p>
                          <p className="text-xs text-neutral-500">{u.phone} · <span className="font-bold text-red-600">{u.blood_group}</span> · {u.locality}, {u.city}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => verifyUser(u.id)} className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all">Verify</button>
                        <button onClick={() => rejectUser(u.id)} className="px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Banks Tab */}
          {tab === 'banks' && (
            <div>
              <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Submitted Blood Banks</h2>
              </div>
              {banks.length === 0 ? (
                <div className="px-6 py-12 text-center text-neutral-400">No pending blood banks</div>
              ) : (
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {banks.map(b => (
                    <div key={b.id} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-950/50 transition-colors">
                      <div>
                        <p className="font-bold text-neutral-900 dark:text-white">{b.name}</p>
                        <p className="text-xs text-neutral-500">{b.address} · {b.city}, {b.state}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => approveBank(b.id)} className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all">Approve</button>
                        <button onClick={() => rejectBank(b.id)} className="px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Camps Tab */}
          {tab === 'camps' && (
            <div>
              <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Pending Donation Camps</h2>
              </div>
              {camps.length === 0 ? (
                <div className="px-6 py-12 text-center text-neutral-400">No pending camps</div>
              ) : (
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {camps.map(c => (
                    <div key={c.id} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-950/50 transition-colors">
                      <div>
                        <p className="font-bold text-neutral-900 dark:text-white">{c.title}</p>
                        <p className="text-xs text-neutral-500">{c.organizer_name} · {c.city}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => approveCamp(c.id)} className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all">Approve</button>
                        <button onClick={() => rejectCamp(c.id)} className="px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reported Chats Tab */}
          {tab === 'chats' && (
            <div>
              <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Reported Chats</h2>
              </div>
              {chats.length === 0 ? (
                <div className="px-6 py-12 text-center text-neutral-400">No reported chats</div>
              ) : (
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {chats.map(ch => (
                    <div key={ch.id} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-950/50 transition-colors">
                      <div>
                        <p className="font-bold text-neutral-900 dark:text-white">Chat #{ch.id.slice(0, 8)}</p>
                        <p className="text-xs text-neutral-500">Users: {ch.user_a_id.slice(0, 8)}... ↔ {ch.user_b_id.slice(0, 8)}...</p>
                      </div>
                      <button onClick={() => resolveChat(ch.id)} className="px-4 py-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">Resolve</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
