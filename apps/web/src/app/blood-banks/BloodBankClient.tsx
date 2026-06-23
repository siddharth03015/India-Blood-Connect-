'use client';

import { useState } from 'react';

export default function BloodBankClient({ initialBanks }: { initialBanks: any[] }) {
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  const states = Array.from(new Set(initialBanks.map(b => b.state).filter(Boolean))).sort();

  const filtered = initialBanks.filter(bank => {
    const matchesSearch = !search ||
      bank.name.toLowerCase().includes(search.toLowerCase()) ||
      bank.city.toLowerCase().includes(search.toLowerCase()) ||
      (bank.address && bank.address.toLowerCase().includes(search.toLowerCase()));
    const matchesState = !stateFilter || bank.state === stateFilter;
    return matchesSearch && matchesState;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">Blood Bank Directory</h1>
          <p className="text-indigo-200/80 text-lg max-w-2xl mx-auto">Find verified blood banks across India</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10 pb-20">
        {/* Filters */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-xl border border-neutral-100 dark:border-neutral-800 mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, city, or address..."
            className="flex-1 px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium text-neutral-900 dark:text-white placeholder-neutral-400"
          />
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium text-neutral-900 dark:text-white min-w-[180px]"
          >
            <option value="">All States</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Results */}
        <p className="text-sm font-semibold text-neutral-500 mb-4">{filtered.length} blood bank{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
            <div className="inline-flex bg-neutral-100 dark:bg-neutral-800 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">No blood banks found</h3>
            <p className="text-neutral-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((bank, idx) => (
              <div
                key={bank.id}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">{bank.name}</h3>
                  {bank.verified && (
                    <span className="flex-shrink-0 ml-2 inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-lg">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-500 mb-1 flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {bank.address}
                </p>
                <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">{bank.city}{bank.state ? `, ${bank.state}` : ''}</p>
                {bank.phone && (
                  <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {bank.phone}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
