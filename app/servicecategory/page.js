// app/servicecategory/page.js
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Data array for the service categories
const categories = [
  {
    id: "travel",
    title: "Travel",
    icon: "✈️",
    description: "Explore destinations and book local transport.",
  },
  {
    id: "mechanic",
    title: "Vehicle Mechanics",
    icon: "🔧",
    description: "Get your car or motorcycle repaired by trusted local experts.",
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    icon: "💊",
    description: "Find nearby pharmacies, medicines, and healthcare essentials.",
  },
  {
    id: "airbnb",
    title: "AirBNB",
    icon: "🏠",
    description: "Discover and book comfortable stays and accommodations.",
  },
  {
    id: "electrician",
    title: "Electric Mechanic",
    icon: "⚡",
    description: "Hire professional electricians for home and office repairs.",
  },
  {
    id: "technician",
    title: "Technician",
    icon: "🛠️",
    description: "Expert technicians for appliances and general maintenance.",
  },
];

export default function ServiceCategoryScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Available Services
            </h1>
            <p className="mt-2 text-gray-600">
              Select a category below to find exactly what you need.
            </p>
          </div>
          
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition font-medium shadow-sm"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
             onClick={() => {
  if (category.id === "travel") {
    router.push("/travel");
  } else {
    console.log(`Clicked on ${category.title}`);
  }
}}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-md hover:border-blue-500 hover:-translate-y-1 transition duration-200 group"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                {category.icon}
              </div>
              
              {/* Text Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {category.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}