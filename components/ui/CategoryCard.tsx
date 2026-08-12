interface CategoryCardProps {
  title: string;
  description: string;
}

export default function CategoryCard({ title, description }: CategoryCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-slate-600">{description}</p>
    </article>
  );
}
