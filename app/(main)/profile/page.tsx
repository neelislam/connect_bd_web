'use client';

import { useState } from "react";
import Header from "@/components/layout/Header";

const initialProfile = {
  name: "Arafat Hossain",
  email: "arafat@example.com",
  phone: "017XXXXXXXX",
  division: "Dhaka",
  district: "Dhaka",
  role: "user",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialProfile);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl mt-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="mt-2 text-slate-600">View and edit your account details.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (editing) setProfile(draft);
              setEditing(!editing);
            }}
            className="rounded-3xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            {editing ? "Save" : "Edit Profile"}
          </button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_280px]">
          <section className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            {Object.entries(draft).map(([key, value]) => (
              <label key={key} className="block">
                <span className="text-sm font-semibold text-slate-700">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <input
                  value={value}
                  disabled={!editing}
                  onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                  className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-slate-900 disabled:opacity-70"
                />
              </label>
            ))}
          </section>
          <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold">Stats</h2>
            <div className="mt-4 space-y-4 text-slate-700">
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Posts Created</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Role</p>
                <p className="text-xl font-semibold capitalize">{profile.role}</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
