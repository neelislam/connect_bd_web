'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { bangladeshLocations } from '@/lib/constants/locations';
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';

export default function DistrictListPage() {
  const { divisionName, categoryId, subCategoryId } = useParams();
  const router = useRouter();
  const districts = bangladeshLocations[divisionName as string] || [];
  const [search, setSearch] = useState('');
  const filtered = districts.filter(d => d.toLowerCase().includes(search.toLowerCase()));

  const handleDistrictClick = (district: string) => {
    const clean = district.trim();
    // Route based on category
    const basePath = (() => {
      if (categoryId === 'travel') return '/travel-feed';
      if (categoryId === 'medical') return '/medical-feed';
      if (categoryId === 'service') return '/service-feed';
      if (categoryId === 'ecommerce') return '/ecommerce-details';
      return null;
    })();
    if (basePath) {
      router.push(`/${basePath}/${categoryId}/${subCategoryId}/${clean}`);
    } else {
      alert('Coming soon!');
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Districts in {divisionName}</h1>
        <input
          type="text"
          placeholder="Search district..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 mb-6"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((district, index) => (
            <motion.div
              key={district}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow cursor-pointer hover:shadow-md transition"
              onClick={() => handleDistrictClick(district)}
            >
              {district}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}