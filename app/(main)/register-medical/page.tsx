'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';

export default function RegisterMedicalPage() {
  const [form, setForm] = useState({ providerName: '', serviceType: '', district: '', phone: '' });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl mt-10">
        <h1 className="text-3xl font-bold">Register Medical Provider</h1>
        <form className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold">Provider Name</label>
            <input
              value={form.providerName}
              onChange={(e) => setForm({ ...form, providerName: e.target.value })}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="Clinic or doctor name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Service Type</label>
            <input
              value={form.serviceType}
              onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="Doctor, Ambulance, Pharmacy"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">District</label>
            <input
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="District name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Contact Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-2 w-full rounded-2xl border px-4 py-3"
              placeholder="017XXXXXXXX"
            />
          </div>
          <button type="button" className="w-full rounded-3xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700">Register Provider</button>
        </form>
      </main>
    </div>
  );
}
