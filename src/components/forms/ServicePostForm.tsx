export default function ServicePostForm() {
  return (
    <form className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Create Service Post</h2>
      <input className="w-full rounded-2xl border px-4 py-3" placeholder="Service title" />
      <textarea className="w-full rounded-2xl border px-4 py-3" placeholder="Service details" rows={5} />
      <button className="rounded-2xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">Submit</button>
    </form>
  );
}
