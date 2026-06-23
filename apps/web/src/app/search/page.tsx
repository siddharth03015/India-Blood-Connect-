'use client';

import { useState } from 'react';
import { supabase } from 'shared';
import { useRouter } from 'next/navigation';
import { MapPin, Search, Droplet, Clock, CheckCircle2, Navigation } from 'lucide-react';

export default function SearchDonors() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [city, setCity] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (useLocation: boolean = false) => {
    setLoading(true);
    let lat = null;
    let lng = null;
    const radius = 50000; // 50km default

    if (useLocation && navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      } catch {
        alert('Could not get location. Using text search only.');
      }
    }

    const { data, error } = await supabase.rpc('search_donors_nearby', {
      search_lat: lat,
      search_lng: lng,
      radius_meters: radius,
      filter_blood_group: bloodGroup || null,
      filter_city: useLocation ? null : (city || null)
    });

    setLoading(false);
    setSearched(true);
    if (error) {
      alert(error.message);
    } else {
      setResults(data || []);
    }
  };

  const handleRequest = (donorId: string) => {
    router.push(`/chat/${donorId}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-rose-500/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-rose-600 to-rose-900 text-white py-20 px-6 sm:px-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-black/20 to-black/60 pointer-events-none"></div>
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-2 border border-white/20 shadow-xl">
            <Droplet className="w-8 h-8 text-rose-200" fill="currentColor" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-rose-200">
            Find a Hero Near You
          </h1>
          <p className="text-lg sm:text-xl text-rose-100/90 max-w-2xl mx-auto font-medium">
            Search our network of verified blood donors. Every drop counts, and help is closer than you think.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24 -mt-10 relative z-10">
        {/* Search Panel */}
        <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl shadow-2xl shadow-rose-900/5 dark:shadow-black/40 border border-neutral-100 dark:border-neutral-800 backdrop-blur-xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            
            <div className="md:col-span-3 space-y-2">
              <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-rose-500" /> Blood Group
              </label>
              <div className="relative">
                <select 
                  value={bloodGroup} 
                  onChange={(e) => setBloodGroup(e.target.value)} 
                  className="w-full appearance-none bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all font-medium cursor-pointer"
                >
                  <option value="">Any Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-5 space-y-2">
              <label className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" /> Location (City/Pincode)
              </label>
              <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="e.g. Mumbai, 400001" 
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all font-medium placeholder-neutral-400" 
              />
            </div>

            <div className="md:col-span-4 flex gap-3 h-[52px]">
              <button 
                onClick={() => handleSearch(false)} 
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-rose-500/25 disabled:opacity-70"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Search className="w-5 h-5" /> Search</>}
              </button>
              
              <button 
                onClick={() => handleSearch(true)} 
                disabled={loading}
                title="Search Near Me"
                className="px-5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl font-semibold flex items-center justify-center transition-all transform active:scale-[0.98] border border-neutral-200 dark:border-neutral-700 disabled:opacity-70"
              >
                <Navigation className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-rose-100 dark:border-rose-900/30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="text-neutral-500 font-medium animate-pulse">Finding matching donors...</p>
          </div>
        ) : searched && results.length === 0 ? (
          <div className="text-center py-24 bg-white/50 dark:bg-neutral-900/50 rounded-3xl border border-neutral-100 dark:border-neutral-800 backdrop-blur-sm">
            <div className="inline-flex bg-neutral-100 dark:bg-neutral-800 p-4 rounded-full mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">No donors found</h3>
            <p className="text-neutral-500 max-w-md mx-auto">We couldn&apos;t find any donors matching your criteria. Try adjusting your filters or expanding your search area.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((donor, idx) => (
              <div 
                key={donor.id} 
                className="group bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:shadow-rose-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">{donor.name}</h3>
                      <div className="flex items-center text-neutral-500 text-sm mt-1 gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5" /> 
                        {donor.locality}, {donor.city}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="bg-gradient-to-br from-rose-500 to-rose-700 text-white font-black text-lg px-3 py-1 rounded-lg shadow-sm">
                        {donor.blood_group}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6 bg-neutral-50 dark:bg-neutral-950/50 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800/50">
                    {donor.distance_meters !== null && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-500 flex items-center gap-2"><Navigation className="w-4 h-4" /> Distance</span>
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">~{(donor.distance_meters / 1000).toFixed(1)} km</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Last Donated</span>
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                        {donor.last_donated_at ? new Date(donor.last_donated_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Never/Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                  {donor.is_available_to_donate ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs rounded-full border border-emerald-200 dark:border-emerald-500/20">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Available Now
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 font-medium text-xs rounded-full">
                      Unavailable
                    </span>
                  )}
                  
                  <button 
                    onClick={() => handleRequest(donor.id)} 
                    className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-xl font-bold text-sm transition-all transform active:scale-95 shadow-md flex items-center gap-2"
                  >
                    Request <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
