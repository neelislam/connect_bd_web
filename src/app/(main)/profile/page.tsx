'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { UserProfile } from '@/types';

const initialProfile: UserProfile = {
  id: 'user-123',
  name: 'Md. Arafat',
  email: 'arafat@example.com',
  phone: '017XXXXXXXX',
  division: 'Dhaka',
  district: 'Dhaka',
  role: 'user',
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [postsCount] = useState(12);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg mt-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-slate-600">Manage your account and view activity.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (editing) {
                setProfile(draft);
              }
              setEditing((current) => !current);
            }}
            className="rounded-2xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            {editing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_280px]">
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            {['name', 'email', 'phone', 'division', 'district', 'role'].map((field) => (
              <div key={field} className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  value={(draft as any)[field] ?? ''}
                  onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}
                  disabled={!editing}
                  className="w-full rounded-2xl border px-4 py-3 bg-white text-slate-900 disabled:opacity-70"
                />
              </div>
            ))}
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold">Stats</h2>
            <div className="mt-4 space-y-3 text-slate-700">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Posts</p>
                <p className="text-3xl font-bold">{postsCount}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Role</p>
                <p className="text-lg font-semibold">{profile.role}</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
