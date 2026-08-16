// app/servicecategory/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Translation Dictionary (English & Bangla)
const translations = {
  en: {
    pageTitle: "Available Services",
    pageSubtitle: "Select a category below to find exactly what you need.",
    backBtn: "Back to Dashboard",
    categories: {
      travel: { title: "Travel", desc: "Explore destinations and book local transport." },
      market: { title: "Secondhand Market", desc: "Buy and sell used items, electronics, and more." },
      rent: { title: "Rent Anything", desc: "Find and book rental items for short or long-term stays." },
      mechanic: { title: "Vehicle Mechanics", desc: "Get your car or motorcycle repaired by trusted local experts." },
      pharmacy: { title: "Pharmacy", desc: "Find nearby pharmacies, medicines, and healthcare essentials." },
      electrician: { title: "Electric Mechanic", desc: "Hire professional electricians for home and office repairs." },
      technician: { title: "Technician", desc: "Expert technicians for appliances and general maintenance." },
    }
  },
  bn: {
    pageTitle: "উপলব্ধ পরিষেবা সমূহ",
    pageSubtitle: "আপনার যা প্রয়োজন ঠিক তা খুঁজে পেতে নিচের একটি বিভাগ নির্বাচন করুন।",
    backBtn: "ড্যাশবোর্ডে ফিরে যান",
    categories: {
      travel: { title: "ভ্রমণ", desc: "গন্তব্যগুলি অন্বেষণ করুন এবং স্থানীয় পরিবহন বুক করুন।" },
      market: { title: "সেকেন্ডহ্যান্ড মার্কেট", desc: "ব্যবহৃত জিনিসপত্র, ইলেকট্রনিক্স এবং আরও অনেক কিছু কিনুন ও বিক্রি করুন।" },
      rent: { title: "যেকোনো কিছু ভাড়া করুন", desc: "স্বল্প বা দীর্ঘমেয়াদী থাকার জন্য ভাড়ার জিনিসপত্র খুঁজুন।" },
      mechanic: { title: "যানবাহন মেকানিক্স", desc: "বিশ্বস্ত বিশেষজ্ঞদের দ্বারা আপনার গাড়ি বা মোটরসাইকেল মেরামত করুন।" },
      pharmacy: { title: "ফার্মেসী", desc: "কাছাকাছি ফার্মেসী, ওষুধ এবং স্বাস্থ্যসেবা খুঁজুন।" },
      electrician: { title: "বৈদ্যুতিক মেকানিক", desc: "বাড়ি এবং অফিস মেরামতির জন্য পেশাদার ইলেকট্রিশিয়ান নিয়োগ করুন।" },
      technician: { title: "টেকনিশিয়ান", desc: "যন্ত্রপাতি এবং সাধারণ রক্ষণাবেক্ষণের জন্য বিশেষজ্ঞ টেকনিশিয়ান।" },
    }
  }
};

// Base Category Data (Icons and IDs)
const baseCategories = [
  { id: "travel", icon: "✈️" },
  { id: "market", icon: "🛒" },
  { id: "rent", icon: "🤝🏻" },
  { id: "mechanic", icon: "🔧" },
  { id: "pharmacy", icon: "💊" },
  { id: "electrician", icon: "⚡" },
  { id: "technician", icon: "🛠️" },
];

export default function ServiceCategoryScreen() {
  const router = useRouter();
  
  // States for Theme and Language
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch on load
  useEffect(() => {
    // Set mounted state asynchronously to avoid cascading renders
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const t = translations[lang];

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out py-12 px-4 sm:px-6 lg:px-8 relative ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              {t.pageTitle}
            </h1>
            <p className={`text-lg font-medium transition-colors duration-500 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.pageSubtitle}
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 ${
              theme === 'dark' 
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700' 
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {t.backBtn}
          </button>
        </div>

        {/* Categories Grid (Buttery Smooth Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {baseCategories.map((cat) => {
            const catData = t.categories[cat.id];

            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (cat.id === "travel") router.push("/travel");
                  else if (cat.id === "rent") router.push("/rentanything");
                  else if (cat.id === "market") router.push("/secondhandmarket");
                  else console.log(`Clicked on ${catData.title}`);
                }}
                className={`group relative p-8 rounded-3xl cursor-pointer transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-2xl border ${
                  theme === 'dark'
                    ? 'bg-slate-800/80 border-slate-700 hover:border-indigo-500 hover:shadow-indigo-500/20'
                    : 'bg-white border-slate-100 hover:border-indigo-400 hover:shadow-indigo-500/15'
                }`}
              >
                {/* Decorative Glowing Gradient (Visible on hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:rotate-3 shadow-sm ${
                    theme === 'dark'
                      ? 'bg-slate-700 group-hover:bg-indigo-500 group-hover:text-white'
                      : 'bg-indigo-50/80 group-hover:bg-indigo-500 group-hover:text-white'
                  }`}>
                    {cat.icon}
                  </div>
                  
                  {/* Text Content */}
                  <h3 className={`text-2xl font-black mb-3 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-slate-100 group-hover:text-indigo-400' : 'text-slate-800 group-hover:text-indigo-600'
                  }`}>
                    {catData.title}
                  </h3>
                  <p className={`text-sm font-medium leading-relaxed transition-colors duration-300 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {catData.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Toggles (Bottom Right) */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        
        {/* Language Toggle */}
        <button 
          onClick={() => setLang(lang === "en" ? "bn" : "en")}
          className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-lg shadow-xl backdrop-blur-md transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
            theme === 'dark' 
              ? 'bg-slate-800/80 border border-slate-600 text-indigo-400 hover:bg-slate-700' 
              : 'bg-white/90 border border-slate-200 text-indigo-600 hover:bg-indigo-50'
          }`}
          title="Toggle Language"
        >
          {lang === "en" ? "BN" : "EN"}
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl backdrop-blur-md transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
            theme === 'dark' 
              ? 'bg-slate-800/80 border border-slate-600 text-yellow-400 hover:bg-slate-700' 
              : 'bg-white/90 border border-slate-200 text-indigo-900 hover:bg-slate-100'
          }`}
          title="Toggle Theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

      </div>
      
    </div>
  );
}