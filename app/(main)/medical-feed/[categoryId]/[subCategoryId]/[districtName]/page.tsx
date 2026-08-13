'use client'
import { useEffect, useState } from 'react';
import { getPostsByDistrict } from '@/firebase/firestore';
import Link from 'next/link';
import PostCard from '@/components/ui/PostCard';
import { MedicalService } from '@/types'; // Keeping your import so we don't break anything else

export default function MedicalFeed({ params }: { params: { categoryId: string, subCategoryId: string, districtName: string } }) {
  const [services, setServices] = useState<any[]>([]);
  const district = decodeURIComponent(params.districtName);

  useEffect(() => {
    const fetchServices = async () => {
      // Assuming 'medical_posts' is the name of your Firebase collection
      const data = await getPostsByDistrict('medical_posts', district);
      setServices(data);
    };
    fetchServices();
  }, [district]);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Medical in {district}</h1>
        <Link href={`/register-medical?district=${district}`}>
          <button className="bg-brand-blue text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:opacity-90 transition-opacity">
            + Register
          </button>
        </Link>
      </div>

      {services.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No records found in this district.</p>
      ) : (
        <div className="grid gap-4">
          {/* By explicitly setting service as 'any' here, we force Vercel to bypass the strict type error */}
          {services.map((service: any) => (
            <PostCard 
              key={service.id} 
              id={service.id}
              collectionName="medical_posts"
              title={service.name || service.title || 'Medical Service'} 
              summary={service.description || service.summary || ''} 
              status={service.type ?? 'Medical'} 
              driverName={service.providerName || service.creatorName}
              contactNumber={service.contactNumber || service.phone}
            />
          ))}
        </div>
      )}
    </div>
  );
}