'use client';

import { useState } from 'react';

export default function CampsClient({ initialCamps }: { initialCamps: any[] }) {
  const [search, setSearch] = useState('');
  const [showPast, setShowPast] = useState(false);

  const now = new Date();

  const filtered = initialCamps.filter(camp => {
    const matchesSearch = !search ||
      camp.title.toLowerCase().includes(search.toLowerCase()) ||
      camp.city.toLowerCase().includes(search.toLowerCase()) ||
      (camp.organizer_name && camp.organizer_name.toLowerCase().includes(search.toLowerCase()));
    const campEnd = new Date(camp.date_end);
    const isUpcoming = campEnd >= now;
    return matchesSearch && (showPast || isUpcoming);
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const getStatusBadge = (camp: any) => {
    const campEnd = new Date(camp.date_end);
    const campStart = new Date(camp.date_start);
    if (campEnd < now) return { text: 'Completed', color: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500' };
    if (campStart <= now && campEnd >= now) return { text: 'Happening Now', color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' };
    return { text: 'Upcoming', color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' };
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">Donation Camps</h1>
          <p className="text-emerald-200/80 text-lg max-w-2xl mx-auto">Discover upcoming blood donation camps across India</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10 pb-20">
        {/* Filters */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-xl border border-neutral-100 dark:border-neutral-800 mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, city, or organizer..."
            className="flex-1 px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium text-neutral-900 dark:text-white placeholder-neutral-400"
          />
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
            <input
              type="checkbox"
              checked={showPast}
              onChange={(e) => setShowPast(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500"
            />
            Show past camps
          </label>
        </div>

        <p className="text-sm font-semibold text-neutral-500 mb-4">{filtered.length} camp{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
            <div className="inline-flex bg-neutral-100 dark:bg-neutral-800 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">No camps found</h3>
            <p className="text-neutral-500">Check back later or try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((camp, idx) => {
              const badge = getStatusBadge(camp);
              return (
                <div
                  key={camp.id}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{camp.title}</h3>
                    <span className={`flex-shrink-0 ml-2 px-2.5 py-1 text-xs font-bold rounded-lg ${badge.color}`}>
                      {badge.text}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Organized by: {camp.organizer_name}
                  </p>

                  <div className="space-y-2 mt-3 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {camp.address}, {camp.city}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(camp.date_start)} — {formatDate(camp.date_end)}
                    </div>
                    {camp.contact_phone && (
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {camp.contact_phone}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
