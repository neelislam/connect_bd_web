'use client'
import { bangladeshLocations } from '@/lib/constants/locations';
import Link from 'next/link';
import { useState } from 'react';

export default function Districts({ params }: { params: { divisionName: string, categoryId: string, subCategoryId: string } }) {
  const [search, setSearch] = useState('');
  const allDistricts = bangladeshLocations[decodeURIComponent(params.divisionName)] || [];
  const districts = allDistricts.filter(d => d.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Districts in {decodeURIComponent(params.divisionName)}</h1>
      <input 
        type="text" placeholder="Search District..." onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-4 rounded-xl bg-white dark:bg-brand-card border-none focus:ring-2 focus:ring-brand-blue dark:text-white shadow-sm"
      />
      <div className="grid gap-3">
        {districts.map((district) => (
          <Link href={`/${params.categoryId}-feed/${params.categoryId}/${params.subCategoryId}/${district}`} key={district}>
            <div className="p-4 bg-white dark:bg-brand-card rounded-lg hover:shadow-md transition dark:text-white">
              {district}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}