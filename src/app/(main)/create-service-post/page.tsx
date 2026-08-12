'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';

export default function CreateServicePostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [availabilityType, setAvailabilityType] = useState<'24/7' | 'daily' | 'custom'>('24/7');
  const [days, setDays] = useState('');
  const [timeRange, setTimeRange] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg mt-8">
        <h1 className="text-3xl font-bold mb-4">Create Service Post</h1>
        <form className="space-y-5">
          <div>
            <label className="mb-2 block font-semibold">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-2xl border px-4 py-3" placeholder="Service title" />
          </div>
          <div>
            <label className="mb-2 block font-semibold">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="w-full rounded-2xl border px-4 py-3" placeholder="Describe your service" />
          </div>
          <div>
            <label className="mb-2 block font-semibold">Category</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-2xl border px-4 py-3" placeholder="e.g. Home Repair" />
          </div>
          <div>
            <label className="mb-2 block font-semibold">Availability</label>
            <div className="flex flex-wrap gap-3">
              {['24/7', 'daily', 'custom'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAvailabilityType(option as '24/7' | 'daily' | 'custom')}
                  className={`rounded-full px-4 py-2 transition ${availabilityType === option ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          {availabilityType !== '24/7' && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold">Days</label>
                <input value={days} onChange={(e) => setDays(e.target.value)} className="w-full rounded-2xl border px-4 py-3" placeholder="Mon-Fri" />
              </div>
              <div>
                <label className="mb-2 block font-semibold">Time range</label>
                <input value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="w-full rounded-2xl border px-4 py-3" placeholder="09:00 - 18:00" />
              </div>
            </div>
          )}
          <button type="button" className="rounded-2xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">
            Submit Service Post
          </button>
        </form>
      </main>
    </div>
  );
}
