'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockCategories, getSubCategory } from '@/lib/constants/mockData';
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';

export default function DivisionListPage() {
  const { categoryId, subCategoryId } = useParams();
  const router = useRouter();
  const sub = getSubCategory(categoryId as string, subCategoryId as string);
  if (!sub) return <div>Sub-category not found</div>;

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{sub.title}</h1>
        <div className="space-y-3 max-w-lg mx-auto">
          {sub.divisions.map((div, index) => (
            <motion.div
              key={div.divisionName}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center cursor-pointer hover:shadow-md transition"
              onClick={() => router.push(`/districts/${div.divisionName}/${categoryId}/${subCategoryId}`)}
            >
              <span>{div.divisionName}</span>
              <span className="text-sm text-gray-500">{div.count} posts</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}