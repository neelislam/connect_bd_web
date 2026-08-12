'use client'
import { bangladeshLocations } from '@/lib/constants/locations';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Divisions({ params }: { params: { categoryId: string, subCategoryId: string } }) {
  const divisions = Object.keys(bangladeshLocations);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Select Division</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {divisions.map((div, index) => (
          <Link href={`/districts/${div}/${params.categoryId}/${params.subCategoryId}`} key={div}>
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.05 }}
              className="p-6 bg-white dark:bg-brand-card rounded-xl shadow-sm border border-transparent hover:border-brand-blue transition-colors"
            >
              <span className="text-lg font-bold dark:text-white">{div}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}