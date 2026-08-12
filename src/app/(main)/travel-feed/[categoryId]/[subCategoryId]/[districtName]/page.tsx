'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase/clientApp';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { TravelPost } from '@/types';
import Header from '@/components/layout/Header';
import PostCard from '@/components/ui/PostCard';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function TravelFeedPage() {
  const { districtName, subCategoryId } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<TravelPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'travelPosts'),
      where('toDivision', '==', districtName),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: TravelPost[] = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() } as TravelPost);
      });
      setPosts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [districtName]);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Travel in {districtName}</h1>
          <button
            onClick={() => router.push(`/create-travel-post?isPassenger=${subCategoryId === 'travel_go' ? 'true' : 'false'}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            + New Post
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No posts in this district.</p>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PostCard post={post} type="travel" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}