interface DivisionPageProps {
  params: { categoryId: string; subCategoryId: string };
}

export default function DivisionPage({ params }: DivisionPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl mt-10">
        <h1 className="text-3xl font-bold">Division Listing</h1>
        <p className="mt-4 text-slate-600">Category: {params.categoryId}</p>
        <p className="text-slate-600">Subcategory: {params.subCategoryId}</p>
      </main>
    </div>
  );
}
