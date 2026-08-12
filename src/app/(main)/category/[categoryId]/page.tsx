'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockCategories } from '@/lib/constants/mockData';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';

export default function SubCategoryPage() {
  const { categoryId } = useParams();
  const router = useRouter();
  const category = mockCategories.find(c => c.id === categoryId);
  if (!category) return <div>Category not found</div>;

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{category.title}</h1>
        <div className="space-y-4 max-w-2xl mx-auto">
          {category.subCategories.map((sub, index) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex justify-between items-center cursor-pointer hover:shadow-lg transition"
              onClick={() => router.push(`/divisions/${categoryId}/${sub.id}`)}
            >
              <span className="text-lg font-medium">{sub.title}</span>
              <span className="text-gray-400">→</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}