'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firestore';
import Header from '@/components/layout/Header';
import PostCard from '@/components/ui/PostCard';
import { TravelPost } from '@/types';

export default function TravelFeedPage() {
  const params = useParams();
  const districtName = params?.districtName ?? 'Unknown';
  const [posts, setPosts] = useState<TravelPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!districtName) return;

    const q = query(
      collection(db, 'travelPosts'),
      where('toDivision', '==', districtName),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: TravelPost[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as TravelPost);
      });
      setPosts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [districtName]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Travel Feed</h1>
        <p className="mt-2 text-slate-600">Region: {districtName}</p>
        {loading ? (
          <p className="mt-6 text-slate-600">Loading travel posts...</p>
        ) : posts.length === 0 ? (
          <p className="mt-6 text-slate-500">No travel posts found for this district.</p>
        ) : (
          <div className="mt-6 grid gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} title={post.driverName} summary={post.vehicleType + ' · ' + post.date} status={post.isPassengerPost ? 'Passenger' : 'Driver'} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
