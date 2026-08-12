interface CategoryPageProps {
  params: { categoryId: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl mt-10">
        <h1 className="text-3xl font-bold">Category: {params.categoryId}</h1>
        <p className="mt-4 text-slate-600">This page shows content and posts for the selected category.</p>
      </main>
    </div>
  );
}
