import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white/90 px-6 py-4 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="text-xl font-semibold text-slate-900">ConnectBD</Link>
        <nav className="flex flex-wrap items-center gap-4 text-slate-700">
          <Link href="/login">Login</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </div>
    </header>
  );
}
