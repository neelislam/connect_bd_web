'use client'
import { mockCategories } from '@/lib/constants/mockData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function CategoryDetails({ params }: { params: { categoryId: string } }) {
  const category = mockCategories.find(c => c.id === params.categoryId);
  if (!category) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">{category.title}</h1>
      <div className="flex flex-col gap-4">
        {category.subCategories.map((sub, index) => (
          <Link href={`/divisions/${category.id}/${sub.id}`} key={sub.id}>
            <motion.div 
              initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}
              className="flex justify-between items-center p-6 bg-white dark:bg-brand-card rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 hover:border-brand-blue transition"
            >
              <span className="text-xl font-bold dark:text-white">{sub.title}</span>
              <ChevronRight className="text-gray-400" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}