'use client';

import { useState, useEffect } from 'react';
import { supabase, ALL_BLOOD_GROUPS, type BloodGroup } from 'shared';
import { useRouter } from 'next/navigation';
import CityAutocomplete from '../components/CityAutocomplete';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    blood_group: '' as BloodGroup | '',
    gender: '',
    dob: '',
    city: '',
    locality: '',
    pincode: '',
    lat: '',
    lng: ''
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUserId(user.id);
        setPhone(user.phone || '');
      }
    };
    checkUser();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString()
          });
        },
        () => {
          setError('Unable to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !phone) return;
    setLoading(true);
    setError('');

    const { error: insertError } = await supabase.from('users').insert([{
      id: userId,
      phone: phone,
      name: formData.name,
      blood_group: formData.blood_group,
      gender: formData.gender,
      dob: formData.dob || null,
      city: formData.city,
      locality: formData.locality,
      pincode: formData.pincode,
      lat: formData.lat ? parseFloat(formData.lat) : null,
      lng: formData.lng ? parseFloat(formData.lng) : null,
      is_available_to_donate: true
    }]);

    setLoading(false);
    if (insertError) {
      setError(insertError.message);
    } else {
      router.push('/profile');
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 bg-mesh">
      <div className="max-w-2xl mx-auto animate-scale-in">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-neutral-900/5 dark:shadow-black/40 border border-neutral-100 dark:border-neutral-800">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-1">Complete Your Profile</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">Tell us about yourself to start saving lives</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  s <= step 
                    ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20' 
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                }`}>
                  {s < step ? '✓' : s}
                </div>
                {s < 3 && <div className={`flex-1 h-0.5 rounded-full transition-all ${s < step ? 'bg-red-500' : 'bg-neutral-200 dark:bg-neutral-700'}`} />}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl mb-6 text-sm font-medium animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium text-neutral-900 dark:text-white" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">Blood Group</label>
                  <div className="grid grid-cols-4 gap-2">
                    {ALL_BLOOD_GROUPS.map(bg => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setFormData({ ...formData, blood_group: bg })}
                        className={`py-3 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                          formData.blood_group === bg
                            ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { if (formData.name && formData.blood_group) setStep(2); else setError('Please fill name and blood group.'); }}
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]"
                >
                  Next →
                </button>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">City</label>
                  <CityAutocomplete
                    value={formData.city}
                    onChange={(val) => setFormData({ ...formData, city: val })}
                    placeholder="Type your city name..."
                    required
                    className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Locality / Area</label>
                  <input required type="text" name="locality" value={formData.locality} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Pincode</label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-medium text-neutral-900 dark:text-white" />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-3.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-xl font-bold transition-all active:scale-[0.98]">← Back</button>
                  <button type="button" onClick={() => { if (formData.city && formData.locality) setStep(3); else setError('Please fill city and locality.'); }}
                    className="flex-1 py-3.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]">Next →</button>
                </div>
              </div>
            )}

            {/* Step 3: GPS + Submit */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div className="bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    GPS Location (Recommended)
                  </h3>
                  <p className="text-sm text-neutral-500 mb-4">Helps us match you with nearby requests. Your exact location is never shown publicly.</p>

                  <div className="flex gap-3 items-center">
                    <input type="text" placeholder="Latitude" value={formData.lat} readOnly className="flex-1 px-3 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-mono text-neutral-500" />
                    <input type="text" placeholder="Longitude" value={formData.lng} readOnly className="flex-1 px-3 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-mono text-neutral-500" />
                    <button type="button" onClick={handleGetLocation}
                      className="px-4 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-bold hover:opacity-90 transition-all active:scale-95 whitespace-nowrap">
                      📍 Get Location
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-500/5 dark:to-orange-500/5 p-6 rounded-2xl border border-red-100 dark:border-red-500/10">
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Registration Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-neutral-500">Name:</span><span className="font-semibold text-neutral-900 dark:text-white">{formData.name}</span>
                    <span className="text-neutral-500">Blood Group:</span><span className="font-bold text-red-600">{formData.blood_group}</span>
                    <span className="text-neutral-500">Location:</span><span className="font-semibold text-neutral-900 dark:text-white">{formData.locality}, {formData.city}</span>
                    <span className="text-neutral-500">GPS:</span><span className="font-semibold text-neutral-900 dark:text-white">{formData.lat ? '✅ Captured' : '❌ Not set'}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 py-3.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-xl font-bold transition-all active:scale-[0.98]">← Back</button>
                  <button type="submit" disabled={loading}
                    className="flex-1 py-3.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 disabled:opacity-50 transition-all active:scale-[0.98]">
                    {loading ? 'Saving...' : '✓ Complete Registration'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
