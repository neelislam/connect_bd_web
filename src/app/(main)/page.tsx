'use client';

import { mockCategories } from '@/lib/constants/mockData';
import CategoryCard from '@/components/ui/CategoryCard';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-12 pt-8">
        <h1 className="text-4xl font-bold dark:text-white mb-2">
          Explore Services
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Everything you need in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockCategories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}