'use client'
import { useEffect, useState } from 'react';
import { getPostsByDistrict } from '@/firebase/firestore';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, Car } from 'lucide-react';

export default function TravelFeed({ params }: { params: { districtName: string } }) {
  const [posts, setPosts] = useState<any[]>([]);
  const district = decodeURIComponent(params.districtName);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPostsByDistrict('travel_posts', district);
      setPosts(data);
    };
    fetchPosts();
  }, [district]);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Travel in {district}</h1>
        <Link href={`/create-travel-post?district=${district}`}>
          <button className="bg-brand-blue text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:opacity-90">
            + Post
          </button>
        </Link>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <motion.div key={post.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="bg-white/90 dark:bg-brand-card/90 backdrop-blur-md p-6 rounded-3xl border border-brand-blue/20 shadow-lg"
          >
            <div className="flex justify-between mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${post.isPassenger ? 'bg-red-500' : 'bg-brand-blue'}`}>
                {post.isPassenger ? 'PASSENGER REQUEST' : 'RIDER OFFER'}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-brand-blue" />
              <h2 className="text-2xl font-black dark:text-white">{post.fromDivision} → {post.toDivision}</h2>
            </div>
            <div className="flex gap-6 mb-6">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><Clock size={18} /> {post.time}</div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><Car size={18} /> {post.vehicleType}</div>
            </div>
            <hr className="border-gray-200 dark:border-gray-700 my-4" />
            <div className="flex justify-between items-center">
              <span className="font-bold dark:text-white">{post.driverName}</span>
              <a href={`tel:${post.contactNumber}`} className="bg-brand-blue text-white px-6 py-2 rounded-xl font-bold">Connect</a>
            </div>
          </motion.div>
        ))}
        {posts.length === 0 && <p className="text-center text-gray-500 py-10">No active posts found.</p>}
      </div>
    </div>
  );
}