import Header from "@/components/layout/Header";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl mt-10">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-4 text-slate-600">This is the login page placeholder for the auth route group.</p>
      </main>
    </div>
  );
}
