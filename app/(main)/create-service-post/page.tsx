'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';

export default function CreateServicePostPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    availability: '24/7',
    days: '',
    time: '',
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl mt-10">
        <h1 className="text-3xl font-bold">Create Service Post</h1>
        <form className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="Service title"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              rows={5}
              placeholder="Describe the service"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Availability</label>
            <select
              value={form.availability}
              onChange={(e) => setForm({ ...form, availability: e.target.value })}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option value="24/7">24/7</option>
              <option value="days">Days</option>
              <option value="time">Time</option>
            </select>
          </div>
          {form.availability !== '24/7' && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold">Days</label>
                <input
                  value={form.days}
                  onChange={(e) => setForm({ ...form, days: e.target.value })}
                  className="mt-2 w-full rounded-2xl border px-4 py-3"
                  placeholder="Mon-Fri"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Time</label>
                <input
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="mt-2 w-full rounded-2xl border px-4 py-3"
                  placeholder="09:00 - 18:00"
                />
              </div>
            </div>
          )}
          <button type="button" className="w-full rounded-3xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">Create Service Post</button>
        </form>
      </main>
    </div>
  );
}
