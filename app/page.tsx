import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex grow flex-col items-center justify-center px-6 py-16">
        <div className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-10 shadow-xl">
          <h1 className="text-4xl font-bold text-slate-900">Welcome to ConnectBD</h1>
          <p className="mt-4 text-lg text-slate-600">Find travel posts, services, medical providers, and local ecommerce partners across Bangladesh.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link href="/login" className="rounded-3xl bg-blue-600 px-6 py-4 text-center text-white hover:bg-blue-700">Login</Link>
            <Link href="/dashboard" className="rounded-3xl bg-slate-900 px-6 py-4 text-center text-white hover:bg-slate-700">Dashboard</Link>
            <Link href="/profile" className="rounded-3xl bg-emerald-600 px-6 py-4 text-center text-white hover:bg-emerald-700">Profile</Link>
            <Link href="/create-travel-post" className="rounded-3xl bg-violet-600 px-6 py-4 text-center text-white hover:bg-violet-700">Create Travel Post</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
