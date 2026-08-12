'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/firebase/firestore';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { ServicePost } from '@/types';
import Header from '@/components/layout/Header';
import PostCard from '@/components/ui/PostCard';

export default function ServiceFeedPage() {
  const params = useParams();
  const districtName = params?.districtName ?? 'Unknown';
  const categoryId = params?.subCategoryId ?? '';
  const [posts, setPosts] = useState<ServicePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!districtName) return;

    const filters = [where('district', '==', districtName)];
    if (categoryId) {
      filters.push(where('category', '==', categoryId));
    }

    const q = query(collection(db, 'servicePosts'), ...filters, orderBy('createdAt', 'desc'));

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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Service Feed</h1>
          <p className="text-slate-600">District: {districtName}</p>
          <p className="text-slate-600">Category: {categoryId || 'All'}</p>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading service posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-slate-500">No service posts found for this category and district.</p>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} title={post.title} summary={post.summary} status={post.category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
