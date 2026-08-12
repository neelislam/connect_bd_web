import Header from '@/components/layout/Header';

interface EcommerceDetailsPageProps {
  params: { categoryName: string };
}

const brands = [
  { name: 'BazaarMart', description: 'Local goods and marketplace listings' },
  { name: 'ShopEasy BD', description: 'Daily essentials delivered quickly' },
  { name: 'HealthHub', description: 'Medical devices and consultations' },
];

export default function EcommerceDetailsPage({ params }: EcommerceDetailsPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg mt-8">
        <h1 className="text-3xl font-bold mb-4">Ecommerce Details</h1>
        <p className="text-slate-600 mb-6">Category: {params.categoryName}</p>

        <div className="grid gap-4">
          {brands.map((brand) => (
            <div key={brand.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-semibold">{brand.name}</h2>
              <p className="text-slate-600">{brand.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
