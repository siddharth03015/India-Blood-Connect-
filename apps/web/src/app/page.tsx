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
      const { count: donorsCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
      const { data: users } = await supabase.from('users').select('city');
      const uniqueCities = new Set(users?.map(u => u.city?.toLowerCase().trim()).filter(Boolean)).size;
      const totalDonors = donorsCount || 0;
      setStats({ donors: totalDonors, lives: totalDonors * 3, cities: uniqueCities || 0 });
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcfafb] to-[#fdf2f2] dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-white overflow-hidden">
      
      {/* Background soft red blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-100/50 dark:bg-red-900/10 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Column: Content */}
          <div className="flex-1 text-left w-full relative z-10">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-neutral-800 rounded-full border border-red-100 dark:border-red-900 shadow-sm mb-6 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold text-red-600 dark:text-red-400">Live Donor Network Across India</span>
            </div>

            {/* Title */}
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-slate-800 dark:text-white mb-6 ${mounted ? 'animate-slide-up delay-100' : 'opacity-0'}`}>
              Every Drop <br/>
              Saves a <span className="text-red-600 dark:text-red-500">Life</span> 
              <span className="inline-block ml-2 text-red-600 animate-pulse-soft">❤</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg text-slate-500 dark:text-neutral-400 max-w-xl mb-10 leading-relaxed font-medium ${mounted ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
              India Blood Connect is a nationwide platform that connects blood donors with those in urgent need. Find compatible donors near you in seconds.
            </p>

            {/* Feature Pills */}
            <div className={`flex flex-wrap items-center gap-4 mb-10 ${mounted ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
              <div className="flex items-center gap-3 bg-white dark:bg-neutral-900 px-4 py-2.5 rounded-2xl border border-red-50 dark:border-neutral-800 shadow-sm">
                <div className="w-10 h-10 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">Verified Donors</div>
                  <div className="text-xs text-slate-400">Safe & Trusted</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-neutral-900 px-4 py-2.5 rounded-2xl border border-red-50 dark:border-neutral-800 shadow-sm">
                <div className="w-10 h-10 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">Find Near You</div>
                  <div className="text-xs text-slate-400">Across India</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-neutral-900 px-4 py-2.5 rounded-2xl border border-red-50 dark:border-neutral-800 shadow-sm">
                <div className="w-10 h-10 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">100% Secure</div>
                  <div className="text-xs text-slate-400">Your data is safe</div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className={`flex flex-wrap items-center gap-4 mb-10 ${mounted ? 'animate-slide-up delay-400' : 'opacity-0'}`}>
              <Link href="/search" className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-red-500/30 transition-all active:scale-[0.98]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Find Blood Now
              </Link>
              <Link href="/login" className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-neutral-900 border-2 border-red-100 dark:border-red-900/50 hover:border-red-600 text-red-600 dark:text-red-400 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                Register as Donor
              </Link>
            </div>


          </div>

          {/* Right Column: Graphic Hero */}
          <div className={`flex-1 relative w-full max-w-[600px] h-[500px] flex items-center justify-center ${mounted ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
            
            {/* Background dashed circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] rounded-full border border-dashed border-red-200 dark:border-red-900/50 animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute w-[450px] h-[450px] rounded-full border border-dashed border-red-100 dark:border-red-900/30 animate-[spin_80s_linear_infinite_reverse]"></div>
            </div>

            {/* Connecting lines for cards */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <path d="M 120 120 L 250 250" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <path d="M 450 120 L 320 250" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <path d="M 120 380 L 250 300" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <path d="M 450 380 L 320 300" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            </svg>

            {/* Central Glossy Blood Drop */}
            <div className="relative z-10 animate-float drop-shadow-2xl">
              <svg width="220" height="260" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="dropGradient" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
                    <stop offset="0%" stopColor="#ff4b4b" />
                    <stop offset="40%" stopColor="#dc2626" />
                    <stop offset="80%" stopColor="#991b1b" />
                    <stop offset="100%" stopColor="#450a0a" />
                  </radialGradient>
                  <linearGradient id="glossGradient" x1="20%" y1="0%" x2="50%" y2="80%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="20" stdDeviation="25" floodColor="#991b1b" floodOpacity="0.5" />
                  </filter>
                </defs>
                {/* Main Drop Body */}
                <path d="M100 10 C100 10, 20 130, 20 190 A80 80 0 0 0 180 190 C180 130, 100 10, 100 10 Z" fill="url(#dropGradient)" filter="url(#shadow)" />
                {/* Gloss Reflection */}
                <path d="M100 20 C100 20, 35 125, 35 180 A65 70 0 0 0 80 245 C95 245, 95 20, 95 20 Z" fill="url(#glossGradient)" />
                {/* White Heart Overlay */}
                <path d="M100 180 C100 180, 75 155, 75 140 A15 15 0 0 1 100 125 A15 15 0 0 1 125 140 C125 155, 100 180, 100 180 Z" fill="white" className="drop-shadow-md" />
              </svg>
            </div>

            {/* Floating Card: Find Donors (Top Left) */}
            <div className="absolute top-4 left-0 bg-white dark:bg-neutral-800 p-4 rounded-3xl shadow-xl shadow-red-500/10 border border-red-50 dark:border-neutral-700 animate-[float_4s_ease-in-out_infinite_0s] z-20 flex flex-col items-center min-w-[120px]">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <div className="text-sm font-black text-slate-800 dark:text-white">Find Donors</div>
              <div className="text-xs font-medium text-slate-400">Near You</div>
            </div>

            {/* Floating Card: Request Blood (Top Right) */}
            <div className="absolute top-12 right-0 bg-white dark:bg-neutral-800 p-4 rounded-3xl shadow-xl shadow-red-500/10 border border-red-50 dark:border-neutral-700 animate-[float_4s_ease-in-out_infinite_1s] z-20 flex flex-col items-center min-w-[120px]">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-600 mb-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
              </div>
              <div className="text-sm font-black text-slate-800 dark:text-white">Request Blood</div>
              <div className="text-xs font-medium text-slate-400">Quick & Easy</div>
            </div>

            {/* Floating Card: Blood Banks (Bottom Left) */}
            <div className="absolute bottom-12 left-0 bg-white dark:bg-neutral-800 p-4 rounded-3xl shadow-xl shadow-red-500/10 border border-red-50 dark:border-neutral-700 animate-[float_4s_ease-in-out_infinite_2s] z-20 flex flex-col items-center min-w-[120px]">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <div className="text-sm font-black text-slate-800 dark:text-white">Blood Banks</div>
              <div className="text-xs font-medium text-slate-400">Directory</div>
            </div>

            {/* Floating Card: Join Camps (Bottom Right) */}
            <div className="absolute bottom-4 right-8 bg-white dark:bg-neutral-800 p-4 rounded-3xl shadow-xl shadow-red-500/10 border border-red-50 dark:border-neutral-700 animate-[float_4s_ease-in-out_infinite_3s] z-20 flex flex-col items-center min-w-[120px]">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div className="text-sm font-black text-slate-800 dark:text-white">Join Camps</div>
              <div className="text-xs font-medium text-slate-400">Save Lives</div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Banner Stats */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 ${mounted ? 'animate-slide-up delay-700' : 'opacity-0'}`}>
        <div className="relative bg-gradient-to-r from-[#8a1212] to-[#c51919] rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Background huge quote mark */}
          <div className="absolute -top-10 -left-6 text-[150px] leading-none text-white/5 font-serif pointer-events-none">"</div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left: Quote */}
          <div className="flex-1 relative z-10 text-white max-w-xl pl-6 lg:border-l-4 lg:border-white/20">
            <p className="text-xl lg:text-2xl font-medium leading-relaxed mb-4">
              "The best way to find yourself is to lose yourself in the service of others."
            </p>
            <p className="text-white/70 font-semibold uppercase tracking-wider text-sm">
              — Mahatma Gandhi
            </p>
          </div>

          {/* Right: Stats */}
          <div className="flex items-center flex-wrap lg:flex-nowrap gap-8 lg:gap-16 text-white relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
              </div>
              <div>
                <div className="text-3xl font-black">{stats.donors > 0 ? stats.donors.toLocaleString() : '2.5M+'}</div>
                <div className="text-sm text-white/80 font-medium">Donors</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 13l2 2 4-4" /></svg>
              </div>
              <div>
                <div className="text-3xl font-black">{stats.lives > 0 ? stats.lives.toLocaleString() : '8.7L+'}</div>
                <div className="text-sm text-white/80 font-medium">Lives Saved</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <div className="text-3xl font-black">{stats.cities > 0 ? stats.cities.toLocaleString() : '28,000+'}</div>
                <div className="text-sm text-white/80 font-medium">Cities Covered</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
