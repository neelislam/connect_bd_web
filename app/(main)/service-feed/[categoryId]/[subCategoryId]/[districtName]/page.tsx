'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firestore';
import Header from '@/components/layout/Header';
import PostCard from '@/components/ui/PostCard';
import { ServicePost } from '@/types';

export default function ServiceFeedPage() {
  const params = useParams();
  const districtName = params?.districtName ?? 'Unknown';
  const categoryId = params?.subCategoryId ?? 'General';
  const [posts, setPosts] = useState<ServicePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!districtName) return;

    const q = query(
      collection(db, 'servicePosts'),
      where('district', '==', districtName),
      where('category', '==', categoryId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: ServicePost[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as ServicePost);
      });
      setPosts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [districtName, categoryId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Service Feed</h1>
        <p className="mt-2 text-slate-600">District: {districtName}</p>
        <p className="text-slate-600">Category: {categoryId}</p>
        {loading ? (
          <p className="mt-6 text-slate-600">Loading service posts...</p>
        ) : posts.length === 0 ? (
          <p className="mt-6 text-slate-500">No service posts found for this district and category.</p>
        ) : (
          <div className="mt-6 grid gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} title={post.title} summary={post.description ?? ''} status={post.category} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
