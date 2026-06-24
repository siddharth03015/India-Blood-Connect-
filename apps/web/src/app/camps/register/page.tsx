'use client';

import { FormEvent, useState } from 'react';
import { supabase } from 'shared';
import { useRouter } from 'next/navigation';

export default function RegisterCampPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    campCode: 'Festival',
    date_start: '',
    date_end: '',
    venue: '',
    organizer_name: '',
    address: '',
    contact_phone: '',
    lat: '',
    lng: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fullTitle = `[${formData.campCode}] ${formData.title}`;
    
    const startDate = new Date(formData.date_start).toISOString();
    const endDate = new Date(formData.date_end).toISOString();

    const { error } = await supabase.from('donation_camps').insert({
      title: fullTitle,
      organizer_name: formData.organizer_name,
      address: formData.venue + ', ' + formData.address,
      city: formData.address,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
      date_start: startDate,
      date_end: endDate,
      contact_phone: formData.contact_phone,
      status: 'upcoming'
    });

    setLoading(false);
    
    if (error) {
      alert('Failed to register camp: ' + error.message);
    } else {
      alert('Blood Camp Registration request submitted successfully!');
      router.push('/camps');
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f9f5] dark:bg-neutral-950 pt-28 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-[#1b4332] dark:text-emerald-50 mb-3 tracking-tight">Register Blood Camp</h1>
          <p className="text-lg text-[#2d6a4f] dark:text-emerald-200/80 font-medium">Fill out the details below to register a new blood donation camp.</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 shadow-2xl shadow-emerald-900/5 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Blood Camp Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-slate-800 dark:text-slate-200">
                Blood Camp Name <span className="text-red-500">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Blood Camp Name" className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all" />
              </div>
            </div>

            {/* Camp Code */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-slate-800 dark:text-slate-200">
                Camp Code <span className="text-red-500">*</span>
              </label>
              <div className="md:w-2/3 relative">
                <select required name="campCode" value={formData.campCode} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer">
                  <option value="Festival">Festival</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Community">Community</option>
                  <option value="College">College</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Start Date */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-slate-800 dark:text-slate-200">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="datetime-local" name="date_start" value={formData.date_start} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all cursor-pointer" />
              </div>
            </div>

            {/* End Date */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-slate-800 dark:text-slate-200">
                End Date <span className="text-red-500">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="datetime-local" name="date_end" value={formData.date_end} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all cursor-pointer" />
              </div>
            </div>

            {/* Venue */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-slate-800 dark:text-slate-200">
                Venue <span className="text-red-500">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="text" name="venue" value={formData.venue} onChange={handleChange} placeholder="Enter Venue" className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all" />
              </div>
            </div>

            {/* Sponsored By */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-slate-800 dark:text-slate-200">
                Sponsored By <span className="text-red-500">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="text" name="organizer_name" value={formData.organizer_name} onChange={handleChange} placeholder="Enter Sponsored By" className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all" />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-slate-800 dark:text-slate-200">
                Address (City) <span className="text-red-500">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address (City)" className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all" />
              </div>
            </div>

            {/* Contact No. */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-slate-800 dark:text-slate-200">
                Contact No. <span className="text-red-500">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="tel" name="contact_phone" value={formData.contact_phone} onChange={handleChange} placeholder="Enter Contact No." className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all" />
              </div>
            </div>

            {/* Latitude */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-slate-800 dark:text-slate-200">
                Latitude <span className="text-red-500">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="number" step="any" name="lat" value={formData.lat} onChange={handleChange} placeholder="Enter Latitude" className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all" />
              </div>
            </div>

            {/* Longitude */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
              <label className="md:w-1/3 text-sm font-bold text-slate-800 dark:text-slate-200">
                Longitude <span className="text-red-500">*</span>
              </label>
              <div className="md:w-2/3">
                <input required type="number" step="any" name="lng" value={formData.lng} onChange={handleChange} placeholder="Enter Longitude" className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 md:pl-[33.33%] md:ml-8">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all"
              >
                {loading ? 'Submitting...' : 'Register Camp'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
