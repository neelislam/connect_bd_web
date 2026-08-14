// app/rentanything/page.js
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

// Data for the Rent Anything categories
const rentCategories = [
  {
    id: "vehicle",
    title: "Vehicle Rental",
    icon: "🚗",
    description: "Rent cars, motorcycles, bicycles, and commercial vehicles.",
    gradient: "from-blue-500 to-cyan-500",
    shadow: "hover:shadow-blue-500/25",
  },
  {
    id: "home",
    title: "Home & Room",
    icon: "🏠",
    description: "Find apartments, single rooms, and full houses for rent.",
    gradient: "from-emerald-500 to-teal-500",
    shadow: "hover:shadow-emerald-500/25",
  },
  {
    id: "garage",
    title: "Garage Space",
    icon: "🅿️",
    description: "Secure a parking spot, garage, or storage space.",
    gradient: "from-orange-400 to-amber-500",
    shadow: "hover:shadow-orange-500/25",
  },
  {
    id: "electronics",
    title: "Electronics",
    icon: "💻",
    description: "Rent cameras, laptops, drones, and other tech gear.",
    gradient: "from-purple-500 to-indigo-500",
    shadow: "hover:shadow-purple-500/25",
  },
];

export default function RentAnythingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Sleek Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>📦</span> Rent Anything
          </h1>
          <button
            onClick={() => router.push("/servicecategory")}
            className="text-slate-300 hover:text-white hover:underline font-medium transition"
          >
            ← Categories
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        {/* Header Text */}
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
            What do you need?
          </h2>
          <p className="text-slate-500 font-medium">
            Select a category below to start browsing or listing items for rent.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rentCategories.map((category) => (
            <Link
              href={`/rentanything/${category.id}`}
              key={category.id}
              className={`group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:border-transparent ${category.shadow} hover:shadow-2xl flex flex-col items-center sm:items-start text-center sm:text-left`}
            >
              {/* Floating Gradient Icon Badge */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-3xl mb-5 shadow-lg text-white transform group-hover:scale-110 transition-transform duration-300`}
              >
                {category.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                {category.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {category.description}
              </p>

              {/* Action Link */}
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-slate-800 transition-colors">
                Browse Category{" "}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}