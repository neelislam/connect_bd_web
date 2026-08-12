'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { addDocument } from '@/firebase/firestore';
import { TravelPost } from '@/types';
import { bangladeshLocations } from '@/lib/constants/locations';
import Header from '@/components/layout/Header';
import toast from 'react-hot-toast';

const allDistricts = Object.values(bangladeshLocations).flat();

export default function CreateTravelPostPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const isPassenger = searchParams.get('isPassenger') === 'true';

  const [form, setForm] = useState<Partial<TravelPost>>({
    fromDivision: 'Dhaka',
    toDivision: 'Sylhet',
    date: new Date().toISOString().split('T')[0],
    time: '9:00 AM',
    vehicleType: 'Car',
    isPassengerPost: isPassenger,
    hasFreeFood: false,
    hasFreeLiving: false,
    intermediateStops: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login first');
      return;
    }
    try {
      await addDocument('travelPosts', {
        ...form,
        userId: user.uid,
        driverName: form.driverName || user.displayName || 'Anonymous',
        contactNumber: form.contactNumber || '',
      });
      toast.success('Post created!');
      router.back();
    } catch (err) {
      toast.error('Failed to create post');
    }
  };

  // Simplified form, full implementation would include all fields
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Create {isPassenger ? 'Passenger' : 'Rider'} Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">From</label>
            <select
              value={form.fromDivision}
              onChange={(e) => setForm({ ...form, fromDivision: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {allDistricts.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">To</label>
            <select
              value={form.toDivision}
              onChange={(e) => setForm({ ...form, toDivision: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {allDistricts.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="text"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="e.g. 9:00 AM"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Vehicle</label>
            <select
              value={form.vehicleType}
              onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option>Car</option>
              <option>Bike</option>
              <option>MicroBus</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Contact Number</label>
            <input
              type="text"
              value={form.contactNumber || ''}
              onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <label>
              <input
                type="checkbox"
                checked={form.hasFreeFood}
                onChange={(e) => setForm({ ...form, hasFreeFood: e.target.checked })}
              /> Free Food
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.hasFreeLiving}
                onChange={(e) => setForm({ ...form, hasFreeLiving: e.target.checked })}
              /> Free Living
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}