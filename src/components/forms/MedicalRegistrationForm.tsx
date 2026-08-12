export default function MedicalRegistrationForm() {
  return (
    <form className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Medical Registration</h2>
      <input className="w-full rounded-2xl border px-4 py-3" placeholder="Patient name" />
      <textarea className="w-full rounded-2xl border px-4 py-3" placeholder="Medical notes" rows={5} />
      <button className="rounded-2xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700">Register</button>
    </form>
  );
}
