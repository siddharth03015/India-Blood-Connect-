'use client';

import { useState, useEffect } from 'react';
import { supabase, ALL_BLOOD_GROUPS, getCompatibleDonors, type BloodGroup } from 'shared';
import { useRouter } from 'next/navigation';

export default function RequestBlood() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    blood_group: '' as BloodGroup | '',
    units_needed: 1,
    hospital_name: '',
    city: '',
    locality: '',
    urgency: 'within_24h' as 'critical' | 'within_24h' | 'planned',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUserId(user.id);
    };
    checkAuth();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.name === 'units_needed' ? parseInt(e.target.value) || 1 : e.target.value;
    setFormData({ ...formData, [e.target.name]: val });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setFormData({ ...formData, lat: pos.coords.latitude.toString(), lng: pos.coords.longitude.toString() }),
        () => setError('Unable to get location.')
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !formData.blood_group) return;
    setLoading(true);
    setError('');

    const { error: insertError } = await supabase.from('blood_requests').insert([{
      requester_id: userId,
      blood_group: formData.blood_group,
      units_needed: formData.units_needed,
      hospital_name: formData.hospital_name,
      city: formData.city,
      locality: formData.locality || null,
      lat: formData.lat ? parseFloat(formData.lat) : null,
      lng: formData.lng ? parseFloat(formData.lng) : null,
      urgency: formData.urgency,
      status: 'open',
      expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
    }]);

    setLoading(false);
    if (insertError) {
      setError(insertError.message);
    } else {
      setSuccess(true);
    }
  };

  const compatibleDonors = formData.blood_group ? getCompatibleDonors(formData.blood_group as BloodGroup) : [];

  const urgencyConfig = {
    critical: { label: 'Critical — Need Now', color: 'from-red-500 to-red-600', icon: '🚨' },
    within_24h: { label: 'Within 24 Hours', color: 'from-orange-500 to-amber-500', icon: '⏰' },
    planned: { label: 'Planned / Non-Urgent', color: 'from-blue-500 to-indigo-500', icon: '📋' },
  };

  if (success) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4 bg-mesh">
        <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-3xl p-10 shadow-2xl border border-neutral-100 dark:border-neutral-800 text-center animate-scale-in">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-2">Request Submitted!</h2>
          <p className="text-neutral-500 mb-6">Your blood request has been posted. Compatible donors nearby will be notified.</p>
          <div className="flex gap-3">
            <button onClick={() => router.push('/search')} className="flex-1 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl font-bold transition-all hover:bg-neutral-200">Search Donors</button>
            <button onClick={() => router.push('/')} className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all">Go Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 bg-mesh">
      <div className="max-w-2xl mx-auto animate-scale-in">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-neutral-100 dark:border-neutral-800">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-xl shadow-red-500/20 mb-5">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-1">Request Blood</h1>
            <p className="text-neutral-500 text-sm">Post a blood request and compatible donors nearby will be notified</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium animate-fade-in">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">Blood Group Needed</label>
              <div className="grid grid-cols-4 gap-2">
                {ALL_BLOOD_GROUPS.map(bg => (
                  <button
                    key={bg} type="button"
                    onClick={() => setFormData({ ...formData, blood_group: bg })}
                    className={`py-3 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                      formData.blood_group === bg
                        ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >{bg}</button>
                ))}
              </div>
              {formData.blood_group && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-500/5 rounded-xl border border-blue-100 dark:border-blue-500/10 animate-fade-in">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">Compatible donors who can donate:</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {compatibleDonors.map(bg => (
                      <span key={bg} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-md">{bg}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Units */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Units Needed</label>
              <input type="number" name="units_needed" min={1} max={20} value={formData.units_needed} onChange={handleChange}
                className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white" />
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">Urgency Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['critical', 'within_24h', 'planned'] as const).map(u => {
                  const cfg = urgencyConfig[u];
                  return (
                    <button key={u} type="button" onClick={() => setFormData({ ...formData, urgency: u })}
                      className={`p-4 rounded-xl text-left transition-all active:scale-95 border-2 ${
                        formData.urgency === u
                          ? 'border-red-500 bg-red-50 dark:bg-red-500/5'
                          : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 hover:border-neutral-300'
                      }`}>
                      <span className="text-lg mb-1 block">{cfg.icon}</span>
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hospital */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Hospital Name</label>
              <input required type="text" name="hospital_name" value={formData.hospital_name} onChange={handleChange}
                placeholder="e.g. AIIMS Delhi"
                className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white placeholder-neutral-400" />
            </div>

            {/* City */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Locality (Optional)</label>
                <input type="text" name="locality" value={formData.locality} onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white" />
              </div>
            </div>

            {/* Location */}
            <div className="bg-neutral-50 dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">📍 GPS Location</span>
                <button type="button" onClick={handleGetLocation} className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-xs font-bold hover:opacity-90 transition-all active:scale-95">
                  Get My Location
                </button>
              </div>
              {formData.lat && <p className="text-xs text-emerald-600 font-semibold">✅ Location captured: {parseFloat(formData.lat).toFixed(4)}, {parseFloat(formData.lng).toFixed(4)}</p>}
            </div>

            <button type="submit" disabled={loading || !formData.blood_group}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-xl font-bold text-lg shadow-xl shadow-red-500/20 disabled:opacity-50 transition-all active:scale-[0.98]">
              {loading ? 'Submitting...' : '🚨 Submit Blood Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
