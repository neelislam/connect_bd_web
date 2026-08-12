import Header from "@/components/layout/Header";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl mt-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-4 text-slate-600">Your dashboard lives here. Build your main application experience from this page.</p>
      </main>
    </div>
  );
}
