'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/firebase/firestore';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { MedicalService } from '@/types';
import Header from '@/components/layout/Header';
import PostCard from '@/components/ui/PostCard';

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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Medical Feed</h1>
          <p className="text-slate-600">District: {districtName}</p>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading medical services...</p>
        ) : services.length === 0 ? (
          <p className="text-slate-500">No medical services found for this district.</p>
        ) : (
          <div className="grid gap-4">
            {services.map((service) => (
              <PostCard key={service.id} title={service.name} summary={service.description} status={service.type ?? 'Medical'} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
