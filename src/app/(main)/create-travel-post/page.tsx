'use client'
import { useState } from 'react';
import { createPost } from '@/firebase/firestore';
import { useRouter } from 'next/navigation';
import { bangladeshLocations } from '@/lib/constants/locations';

export default function CreateTravelPost() {
  const router = useRouter();
  const allLocations = Object.values(bangladeshLocations).flat().sort();
  const [formData, setFormData] = useState({
    isPassenger: false, fromDivision: 'Dhaka', toDivision: 'Sylhet',
    time: '', vehicleType: 'Car', driverName: '', contactNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost('travel_posts', formData);
    router.back();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Create Travel Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-brand-card p-8 rounded-3xl shadow-xl">
        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2 dark:text-white cursor-pointer">
            <input type="radio" checked={!formData.isPassenger} onChange={() => setFormData({...formData, isPassenger: false})} /> Rider Offer
          </label>
          <label className="flex items-center gap-2 dark:text-white cursor-pointer">
            <input type="radio" checked={formData.isPassenger} onChange={() => setFormData({...formData, isPassenger: true})} /> Passenger Request
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white" value={formData.fromDivision} onChange={e => setFormData({...formData, fromDivision: e.target.value})}>
            {allLocations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white" value={formData.toDivision} onChange={e => setFormData({...formData, toDivision: e.target.value})}>
            {allLocations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input type="time" required className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white" onChange={e => setFormData({...formData, time: e.target.value})} />
          <select className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white" value={formData.vehicleType} onChange={e => setFormData({...formData, vehicleType: e.target.value})}>
            <option>Car</option><option>Bike</option><option>MicroBus</option>
          </select>
        </div>
        <input type="text" placeholder="Your Name" required className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white" onChange={e => setFormData({...formData, driverName: e.target.value})} />
        <input type="tel" placeholder="Phone Number" required className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white" onChange={e => setFormData({...formData, contactNumber: e.target.value})} />
        <button type="submit" className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl hover:opacity-90 transition">
          PUBLISH POST
        </button>
      </form>
    </div>
  );
}