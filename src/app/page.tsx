import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 text-black">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-700">Welcome to ConnectBD</h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600">
          Connecting people across all divisions and districts.
        </p>
        <Link 
          href="/login" 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Get Started / Login
        </Link>
      </div>
    </main>
  );
}