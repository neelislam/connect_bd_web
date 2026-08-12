'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Car, Cross, Wrench, ShoppingBag } from 'lucide-react';

const getIcon = (id: string) => {
  switch (id) {
    case 'travel': return <Car size={40} className="text-brand-blue" />;
    case 'medical': return <Cross size={40} className="text-red-500" />;
    case 'service': return <Wrench size={40} className="text-green-500" />;
    default: return <ShoppingBag size={40} className="text-brand-purple" />;
  }
};

export default function CategoryCard({ category, index }: { category: any, index: number }) {
  return (
    <Link href={`/category/${category.id}`}>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }}
        className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-brand-card/60 backdrop-blur-md border border-black/5 dark:border-white/10 p-6 h-48 flex flex-col justify-between shadow-xl cursor-pointer"
      >
        <div className="bg-black/5 dark:bg-white/10 w-fit p-3 rounded-full">
          {getIcon(category.id)}
        </div>
        <div>
          <h2 className="text-2xl font-black dark:text-white drop-shadow-md">{category.title}</h2>
          <p className="text-sm dark:text-gray-300">{category.subCategories.length} Options</p>
        </div>
      </motion.div>
    </Link>
  );
}