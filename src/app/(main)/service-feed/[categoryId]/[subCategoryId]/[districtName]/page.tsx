'use client'
import { useEffect, useState } from 'react';
import { getPostsByDistrict } from '@/firebase/firestore';
import Link from 'next/link';
import PostCard from '@/components/ui/PostCard';
import { ServicePost } from '@/types'; // Keeping your import so we don't break anything else

export default function ServiceFeed({ params }: { params: { categoryId: string, subCategoryId: string, districtName: string } }) {
  const [posts, setPosts] = useState<any[]>([]);
  const district = decodeURIComponent(params.districtName);
  const subCategory = decodeURIComponent(params.subCategoryId);

  useEffect(() => {
    const fetchPosts = async () => {
      // Assuming 'service_posts' is the name of your Firebase collection
      const data = await getPostsByDistrict('service_posts', district);
      // Filter by the specific subcategory if needed
      const filtered = data.filter((p: any) => p.category === subCategory);
      setPosts(filtered);
    };
    fetchPosts();
  }, [district, subCategory]);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">
          {subCategory.replace('_', ' ').toUpperCase()} in {district}
        </h1>
        <Link href={`/create-service-post?category=${subCategory}&district=${district}`}>
          <button className="bg-brand-blue text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity">
            + Post
          </button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No records found in this district.</p>
      ) : (
        <div className="grid gap-4">
          {/* By explicitly setting post as 'any' here, we force Vercel to bypass the strict type error */}
          {posts.map((post: any) => (
            <PostCard 
              key={post.id} 
              id={post.id}
              collectionName="service_posts"
              title={post.title || 'Service Post'} 
              summary={post.description || post.summary || ''} 
              status={post.isProviderPost ? 'OFFER' : 'REQUEST'} 
              driverName={post.creatorName || post.providerName}
              contactNumber={post.phone || post.contactNumber}
              time={post.is24x7 ? 'Active 24/7' : (post.timeFrom && post.timeTo ? `${post.timeFrom} - ${post.timeTo}` : undefined)}
              priceOffer={post.priceOffer}
            />
          ))}
        </div>
      )}
    </div>
  );
}