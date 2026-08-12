interface PostCardProps {
  title: string;
  summary: string;
  status: string;
}

export default function PostCard({ title, summary, status }: PostCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{status}</span>
      </div>
      <p className="mt-3 text-slate-600">{summary}</p>
    </article>
  );
}
