interface EcommerceDetailsPageProps {
  params: { categoryName: string };
}

const brands = [
  { name: 'BazaarMart', description: 'Daily essentials and local marketplaces.' },
  { name: 'ShopEasy BD', description: 'Fast delivery for household goods.' },
  { name: 'Health Hub', description: 'Medical supplies and services.' },
];

export default function EcommerceDetailsPage({ params }: EcommerceDetailsPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl mt-10">
        <h1 className="text-3xl font-bold">Ecommerce Details</h1>
        <p className="mt-4 text-slate-600">Category: {params.categoryName}</p>
        <div className="mt-8 grid gap-4">
          {brands.map((brand) => (
            <div key={brand.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold">{brand.name}</h2>
              <p className="mt-2 text-slate-600">{brand.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
