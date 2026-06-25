'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from 'shared';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ donors: 0, lives: 0, cities: 0 });

  useEffect(() => {
    setMounted(true);
    const fetchStats = async () => {
      try {
        const { data: donorsData } = await supabase.rpc('search_donors_nearby', {
          search_lat: null,
          search_lng: null,
          radius_meters: 0
        });
        
        const totalDonors = donorsData?.length || 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const uniqueCities = new Set(donorsData?.map((d: any) => d.city).filter(Boolean));
        
        const { count: fulfilledCount } = await supabase
          .from('blood_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'fulfilled');

        setStats({ 
          donors: totalDonors, 
          lives: (fulfilledCount || 0) * 3, 
          cities: uniqueCities.size
        });
      } catch (err) {
        console.error('Error fetching realtime stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-hidden font-sans">
      
      {/* Background abstract shape (faint red wave/blob in top right) */}
      <div className="absolute top-0 right-0 w-[1000px] h-[800px] bg-red-50/50 dark:bg-red-900/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Content */}
          <div className="flex-1 text-left w-full max-w-2xl">
            
            {/* Main Headline */}
            <h1 className={`text-5xl sm:text-6xl lg:text-[72px] font-medium tracking-tight leading-[1.1] text-slate-800 dark:text-white mb-6 ${mounted ? 'animate-slide-up delay-100' : 'opacity-0'}`}>
              Together, We Keep <br/>
              <span className="text-[#b91c1c] font-bold">Hope Alive.</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg text-slate-500 dark:text-neutral-400 max-w-md mb-8 leading-relaxed ${mounted ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
              Connect with verified blood donors in your area.<br/>
              Every drop counts.
            </p>

            {/* Find Donors Button */}
            <div className={`mb-12 ${mounted ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
              <Link href="/search" className="inline-flex items-center justify-center px-8 py-3 bg-[#b91c1c] text-white rounded-md font-medium shadow-md hover:bg-[#991b1b] transition-all">
                Find Donors
              </Link>
            </div>


            {/* Features Row */}
            <div className={`flex flex-wrap items-center justify-between gap-6 w-full ${mounted ? 'animate-slide-up delay-500' : 'opacity-0'}`}>
              
              <div className="flex flex-col items-center gap-2">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-800 dark:text-white">Verified Donors</div>
                  <div className="text-[11px] text-slate-500">Safe & Trusted</div>
                </div>
              </div>

              <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></div>

              <div className="flex flex-col items-center gap-2">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-800 dark:text-white">Real-time Search</div>
                  <div className="text-[11px] text-slate-500">Live donor updates</div>
                </div>
              </div>

              <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></div>

              <div className="flex flex-col items-center gap-2">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-800 dark:text-white">Nearby Donors</div>
                  <div className="text-[11px] text-slate-500">Close to you</div>
                </div>
              </div>

              <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></div>

              <div className="flex flex-col items-center gap-2">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-800 dark:text-white">100% Secure</div>
                  <div className="text-[11px] text-slate-500">Your data is safe</div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Graphic Image */}
          <div className={`flex-1 relative w-full flex items-center justify-center ${mounted ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
            <img src="/hands-blood-drop.png" alt="Donate Blood" className="w-full max-w-[500px] h-auto object-contain drop-shadow-xl" />
          </div>
        </div>
      </div>

      {/* Benefits of Blood Donation Section */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${mounted ? 'animate-slide-up delay-500' : 'opacity-0'}`}>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Illustration Container */}
          <div className="flex-1 relative w-full h-[400px] sm:h-[500px] bg-[#f4f4f4] dark:bg-neutral-900/50 rounded-r-[120px] sm:rounded-r-[200px] flex items-center justify-center p-8 overflow-hidden">
            {/* 
              I've added a placeholder image path. 
              Please drop your superhero illustration into apps/web/public/hero-donate.png!
            */}
            <img 
              src="/hero-donate.png" 
              alt="Become a Hero - Donate Blood" 
              className="w-full h-full object-contain relative z-10 drop-shadow-xl"
              onError={(e) => {
                // Fallback placeholder if image is missing
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="text-center">
                    <div class="text-8xl mb-4">🦸‍♂️🩸</div>
                    <h3 class="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Become a Hero<br/><span class="text-[#b31414] text-5xl">Donate<br/>Blood</span></h3>
                  </div>
                `;
              }}
            />
          </div>

          {/* Right Side: Content */}
          <div className="flex-1 max-w-2xl">
            <div className="text-[#b31414] font-bold mb-2 tracking-wide text-sm">Benefits of Blood Donation</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 dark:text-white mb-6 tracking-tight">Save Lives, Be a Real Hero</h2>
            
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-sm sm:text-base">
              Donating blood is a noble act that not everyone can do. With advancements in medicine, the need for blood has increased threefold since the industrial revolution. Every year, India has a deficit of between 30% and 35%. It is absurd to say that the country cannot meet this requirement with 1.2 billion people. The real challenge is not the lack of blood donors, but finding someone willing to donate when needed. Therefore, the aim should be to create a system of people who can help each other in emergencies. Below are some benefits donating blood:
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Reduces Risk of Cancer
              </div>
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Boosts the Production of RBC (Red Blood Cells)
              </div>
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Helps in Weight Loss
              </div>
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Makes the Donor Psychologically Rejuvenated
              </div>
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Replenishes Blood
              </div>
              <div className="flex items-start gap-2 text-slate-800 dark:text-slate-300 font-bold text-sm">
                <span className="text-[#b31414] mt-0.5">»</span> Lower Cholestrol Level
              </div>
            </div>

            <Link href="/search" className="inline-block px-8 py-3 bg-[#b31414] hover:bg-[#8f1010] text-white font-bold rounded shadow-md transition-all uppercase tracking-wide text-sm hover:-translate-y-0.5">
              EXPLORE NEW
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Stats & Quote Banner */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 ${mounted ? 'animate-slide-up delay-700' : 'opacity-0'}`}>
        <div className="relative bg-gradient-to-r from-[#8a0303] via-[#a30b0b] to-[#c71616] rounded-3xl p-10 lg:p-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 text-white">
          
          {/* Background Quote Mark */}
          <div className="absolute top-4 left-6 text-[180px] leading-none text-white/10 font-serif pointer-events-none select-none">&ldquo;</div>

          {/* Quote Area */}
          <div className="relative z-10 flex-1 max-w-2xl pl-10">
            <h3 className="text-2xl sm:text-3xl font-medium mb-4 leading-snug">The best way to find yourself is to lose yourself in the service of others.</h3>
            <p className="text-red-200 text-lg">− Mahatma Gandhi</p>
          </div>

          {/* Stats Area */}
          <div className="relative z-10 flex flex-wrap lg:flex-nowrap items-center gap-8 lg:gap-12">
            
            {/* Stat 1: Donors */}
            <div className="flex items-center gap-4">
              <svg className="w-10 h-10 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
              <div>
                <div className="text-3xl font-bold">{stats.donors.toLocaleString()}</div>
                <div className="text-sm text-red-200 uppercase tracking-wide">Donors</div>
              </div>
            </div>

            {/* Stat 2: Lives Saved */}
            <div className="flex items-center gap-4">
              <svg className="w-10 h-10 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <div>
                <div className="text-3xl font-bold">{stats.lives.toLocaleString()}</div>
                <div className="text-sm text-red-200 uppercase tracking-wide">Lives Saved</div>
              </div>
            </div>

            {/* Stat 3: Cities Covered */}
            <div className="flex items-center gap-4">
              <svg className="w-10 h-10 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <div>
                <div className="text-3xl font-bold">{stats.cities.toLocaleString()}</div>
                <div className="text-sm text-red-200 uppercase tracking-wide">Cities Covered</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
