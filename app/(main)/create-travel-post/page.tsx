'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';

const districts = [
  'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh',
];

export default function CreateTravelPostPage() {
  const [form, setForm] = useState({
    fromDivision: 'Dhaka',
    toDivision: 'Chattogram',
    date: new Date().toISOString().slice(0, 10),
    time: '09:00',
    vehicleType: 'Car',
    contactNumber: '',
    passengerType: 'driver',
    hasFreeFood: false,
    hasFreeLiving: false,
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl mt-10">
        <h1 className="text-3xl font-bold">Create Travel Post</h1>
        <form className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold">From</label>
            <select
              value={form.fromDivision}
              onChange={(e) => setForm({ ...form, fromDivision: e.target.value })}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              {districts.map((district) => <option key={district}>{district}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold">To</label>
            <select
              value={form.toDivision}
              onChange={(e) => setForm({ ...form, toDivision: e.target.value })}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              {districts.map((district) => <option key={district}>{district}</option>)}
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="mt-2 w-full rounded-2xl border px-4 py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="mt-2 w-full rounded-2xl border px-4 py-3"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold">Vehicle Type</label>
            <select
              value={form.vehicleType}
              onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
            >
              <option>Car</option>
              <option>Bike</option>
              <option>MicroBus</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold">Contact Number</label>
            <input
              value={form.contactNumber}
              onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="017XXXXXXXX"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.hasFreeFood} onChange={(e) => setForm({ ...form, hasFreeFood: e.target.checked })} />
              Free Food
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.hasFreeLiving} onChange={(e) => setForm({ ...form, hasFreeLiving: e.target.checked })} />
              Free Living
            </label>
          </div>
          <button type="button" className="w-full rounded-3xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">Submit Travel Post</button>
        </form>
      </main>
    </div>
  );
}
