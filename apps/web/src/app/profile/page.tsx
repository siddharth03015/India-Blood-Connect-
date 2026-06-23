'use client';

import { useState, useEffect } from 'react';
import { supabase, getCanDonateTo, type BloodGroup } from 'shared';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      const { data, error } = await supabase.from('users').select('*').eq('id', user.id).single();
      if (error || !data) { router.push('/register'); } else { setProfile(data); }
      setLoading(false);
    };
    fetchProfile();
  }, [router]);

  const handleUpdate = async () => {
    if (!profile) return;
    setUpdating(true);
    setError('');
    setSuccess('');
    const { error: updateError } = await supabase
      .from('users')
      .update({ is_available_to_donate: profile.is_available_to_donate, last_donated_at: profile.last_donated_at || null })
      .eq('id', profile.id);
    setUpdating(false);
    if (updateError) { setError(updateError.message); } else { setSuccess('Profile updated!'); setTimeout(() => setSuccess(''), 3000); }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const canDonateTo = profile ? getCanDonateTo(profile.blood_group as BloodGroup) : [];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 bg-mesh">
      <div className="max-w-2xl mx-auto animate-scale-in">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-3xl p-8 text-white shadow-2xl shadow-red-900/20 mb-6 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative flex items-start justify-between">
            <div>
              <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-black">{profile?.name?.charAt(0)?.toUpperCase()}</span>
              </div>
              <h1 className="text-2xl font-extrabold mb-1">{profile?.name}</h1>
              <p className="text-red-200/80 text-sm font-medium">{profile?.locality}, {profile?.city}</p>
              <p className="text-red-200/60 text-xs mt-1">Member since {new Date(profile?.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-white text-red-600 font-black text-2xl px-4 py-2 rounded-xl shadow-lg">
                {profile?.blood_group}
              </span>
              {profile?.is_verified && (
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  Verified
                </div>
              )}
            </div>
          </div>
          {/* Compatibility */}
          <div className="mt-6 pt-5 border-t border-white/15">
            <p className="text-xs font-semibold text-red-200/60 mb-2 uppercase tracking-wider">Can donate to</p>
            <div className="flex gap-2 flex-wrap">
              {canDonateTo.map(bg => (
                <span key={bg} className="px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-bold border border-white/10">{bg}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-xl border border-neutral-100 dark:border-neutral-800">
          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium animate-fade-in">{error}</div>
          )}
          {success && (
            <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium animate-fade-in">{success}</div>
          )}

          <div className="space-y-6">
            {/* Availability Toggle */}
            <div className="flex items-center justify-between p-5 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800">
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white text-lg">Available to Donate</h3>
                <p className="text-sm text-neutral-500 mt-0.5">Toggle when you&apos;re ready to receive requests.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={profile?.is_available_to_donate}
                  onChange={(e) => setProfile({ ...profile, is_available_to_donate: e.target.checked })}
                />
                <div className="w-14 h-7 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
              </label>
            </div>

            {/* Last Donated */}
            <div className="p-5 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-800">
              <h3 className="font-bold text-neutral-900 dark:text-white text-lg mb-3">Last Donated</h3>
              <input
                type="date"
                value={profile?.last_donated_at ? new Date(profile.last_donated_at).toISOString().split('T')[0] : ''}
                onChange={(e) => setProfile({ ...profile, last_donated_at: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white"
              />
            </div>

            <button
              onClick={handleUpdate}
              disabled={updating}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 disabled:opacity-50 transition-all active:scale-[0.98]"
            >
              {updating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-3">
            <Link href="/search" className="py-3 text-center bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl text-sm font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all">Find Donors</Link>
            <Link href="/chat" className="py-3 text-center bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl text-sm font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all">My Chats</Link>
          </div>

          <button onClick={handleLogout} className="w-full mt-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-sm font-bold transition-all">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
