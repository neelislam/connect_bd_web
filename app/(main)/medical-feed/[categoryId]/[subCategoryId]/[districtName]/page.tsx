'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firestore';
import Header from '@/components/layout/Header';
import PostCard from '@/components/ui/PostCard';
import { MedicalService } from '@/types';

export default function MedicalFeedPage() {
  const params = useParams();
  const districtName = params?.districtName ?? 'Unknown';
  const [services, setServices] = useState<MedicalService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!districtName) return;

    const q = query(
      collection(db, 'medicalServices'),
      where('district', '==', districtName),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: MedicalService[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as MedicalService);
      });
      setServices(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [districtName]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Medical Feed</h1>
        <p className="mt-2 text-slate-600">District: {districtName}</p>
        {loading ? (
          <p className="mt-6 text-slate-600">Loading medical services...</p>
        ) : services.length === 0 ? (
          <p className="mt-6 text-slate-500">No medical services found for this district.</p>
        ) : (
          <div className="mt-6 grid gap-4">
            {services.map((service) => (
              <PostCard key={service.id} title={service.name} summary={service.type} status={service.verified ? 'Verified' : 'Unverified'} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
