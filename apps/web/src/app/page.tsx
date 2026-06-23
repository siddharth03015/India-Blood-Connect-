'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-sm font-semibold text-white/90">Live Donor Network Across India</span>
          </div>

          {/* Heart Icon */}
          <div className={`mb-8 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl animate-float">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-gradient-hero ${mounted ? 'animate-slide-up delay-100' : 'opacity-0'}`}>
            India Blood Connect
          </h1>
          <p className={`text-lg sm:text-xl lg:text-2xl text-red-100/80 max-w-3xl mx-auto mb-10 font-medium leading-relaxed ${mounted ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
            A nationwide network connecting blood donors with those in need.
            Find compatible donors nearby in seconds. Every drop counts.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${mounted ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
            <Link
              href="/search"
              className="px-8 py-4 bg-white text-red-600 rounded-2xl font-bold text-lg shadow-2xl shadow-black/20 hover:shadow-black/30 hover:-translate-y-0.5 transition-all active:scale-[0.97] flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Blood Now
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all active:scale-[0.97] flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Register as Donor
            </Link>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
            <path d="M0 60V20C240 0 480 40 720 30C960 20 1200 0 1440 20V60H0Z" className="fill-neutral-50 dark:fill-neutral-950" />
          </svg>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Three simple steps to connect with a blood donor or save a life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Search or Request',
              desc: 'Search by blood group & location, or post an emergency blood request to alert nearby donors.',
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ),
              color: 'from-red-500 to-orange-500',
            },
            {
              step: '02',
              title: 'Match & Connect',
              desc: 'Our system finds compatible donors nearby using PostGIS location intelligence and blood type matching.',
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              color: 'from-indigo-500 to-purple-500',
            },
            {
              step: '03',
              title: 'Chat & Donate',
              desc: 'Chat securely in-app to coordinate the donation. No phone numbers exposed until both parties agree.',
              icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              ),
              color: 'from-emerald-500 to-teal-500',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`group relative bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${200 + idx * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl text-white shadow-lg mb-6`}>
                {item.icon}
              </div>
              <div className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-2 tracking-widest uppercase">{item.step}</div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-16 bg-white dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '8', label: 'Blood Groups Supported' },
              { value: '50km', label: 'Search Radius' },
              { value: '24/7', label: 'Emergency Alerts' },
              { value: 'Free', label: 'Always & Forever' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl sm:text-4xl font-black text-gradient mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Links ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/blood-banks"
            className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="text-2xl font-bold mb-2">Blood Bank Directory</h3>
            <p className="text-indigo-100/80 mb-4">Find verified blood banks across India — searchable by state and city.</p>
            <span className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all">
              Browse Directory →
            </span>
          </Link>
          <Link
            href="/camps"
            className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="text-2xl font-bold mb-2">Donation Camp Finder</h3>
            <p className="text-emerald-100/80 mb-4">Discover upcoming blood donation camps near you — organized by NGOs and hospitals.</p>
            <span className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all">
              View Camps →
            </span>
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-12 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span className="font-bold text-neutral-900 dark:text-white">India Blood Connect</span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto mb-4">
            A connector platform — we do not handle blood collection, storage, or screening. 
            All donations must comply with NACO/NBTC guidelines.
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-600">
            © {new Date().getFullYear()} India Blood Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
