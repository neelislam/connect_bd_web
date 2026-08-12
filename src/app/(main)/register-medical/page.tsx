'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';

export default function RegisterMedicalPage() {
  const [providerName, setProviderName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [district, setDistrict] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg mt-8">
        <h1 className="text-3xl font-bold mb-4">Register Medical Provider</h1>
        <form className="space-y-5">
          <div>
            <label className="mb-2 block font-semibold">Provider Name</label>
            <input value={providerName} onChange={(e) => setProviderName(e.target.value)} className="w-full rounded-2xl border px-4 py-3" placeholder="Clinic or doctor name" />
          </div>
          <div>
            <label className="mb-2 block font-semibold">Service Type</label>
            <input value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full rounded-2xl border px-4 py-3" placeholder="General Practice, Emergency, Pharmacy" />
          </div>
          <div>
            <label className="mb-2 block font-semibold">District</label>
            <input value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full rounded-2xl border px-4 py-3" placeholder="District name" />
          </div>
          <div>
            <label className="mb-2 block font-semibold">Contact Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-2xl border px-4 py-3" placeholder="017XXXXXXXX" />
          </div>
          <button type="button" className="rounded-2xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700">
            Register Provider
          </button>
        </form>
      </main>
    </div>
  );
}
