'use client';

import Link from 'next/link';
import { FeatureCategory } from '@/types';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const categoryColors: Record<string, string> = {
  travel: 'bg-cyan-500',
  medical: 'bg-red-500',
  marketplace: 'bg-yellow-500',
  ecommerce: 'bg-purple-500',
  service: 'bg-green-500',
};

const categoryIcons: Record<string, string> = {
  travel: '🚗',
  medical: '🏥',
  marketplace: '🛍️',
  ecommerce: '🛒',
  service: '🔧',
};

export default function CategoryCard({ category }: { category: FeatureCategory }) {
  const { theme } = useTheme();
  const color = categoryColors[category.id] || 'bg-blue-500';
  const icon = categoryIcons[category.id] || '📦';

  return (
    <Link href={`/category/${category.id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`${color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 text-7xl opacity-10 transform rotate-12">
          {icon}
        </div>
        <div className="relative z-10">
          <div className="text-white text-4xl mb-2">{icon}</div>
          <h3 className="text-white text-xl font-bold">{category.title}</h3>
          <p className="text-white/80 text-sm mt-1">{category.subCategories.length} options</p>
        </div>
      </motion.div>
    </Link>
  );
}