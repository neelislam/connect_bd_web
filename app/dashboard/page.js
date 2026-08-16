// app/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Translation Dictionary (English & Bangla)
const translations = {
  en: {
    loading: "Loading...",
    welcome: "Welcome to your Dashboard!",
    loggedInAs: "Logged in as:",
    profileBtn: "Create / Edit Profile",
    profileDesc: "Manage your personal details.",
    servicesBtn: "Browse Services",
    servicesDesc: "Travel, mechanics, pharmacy, & more.",
    marketBtn: "Secondhand Market",
    marketDesc: "Buy and sell used items locally.",
    foodBtn: "Food & Meal",
    foodDesc: "Order food, groceries, and home meals.",
    logoutBtn: "Log Out",
  },
  bn: {
    loading: "লোড হচ্ছে...",
    welcome: "আপনার ড্যাশবোর্ডে স্বাগতম!",
    loggedInAs: "লগ ইন আছেন:",
    profileBtn: "প্রোফাইল তৈরি / সম্পাদনা করুন",
    profileDesc: "আপনার ব্যক্তিগত বিবরণ পরিচালনা করুন।",
    servicesBtn: "পরিষেবা ব্রাউজ করুন",
    servicesDesc: "ভ্রমণ, মেকানিক্স, ফার্মেসী এবং আরও অনেক কিছু।",
    marketBtn: "সেকেন্ডহ্যান্ড মার্কেট",
    marketDesc: "স্থানীয়ভাবে ব্যবহৃত জিনিসপত্র কিনুন এবং বিক্রি করুন।",
    foodBtn: "খাবার এবং আহার",
    foodDesc: "খাবার, মুদি এবং বাড়ির খাবার অর্ডার করুন।",
    logoutBtn: "লগ আউট",
  },
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch on load & check Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/"); // Redirect to login if not logged in
      } else {
        setUser(currentUser);
        setMounted(true);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  // Prevent rendering until client-side hydration and auth check are complete
  if (!mounted || !user) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ease-in-out ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const t = translations[lang];

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out py-12 px-4 sm:px-6 lg:px-8 relative ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      <div className="max-w-5xl mx-auto">
        
        {/* Welcome Header */}
        <div className={`p-8 rounded-3xl mb-8 shadow-sm transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-800/80 border border-slate-700' : 'bg-white border border-slate-100'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
                {t.welcome} 👋
              </h1>
              <p className={`text-sm sm:text-base font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                {t.loggedInAs} <span className={`font-bold ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>{user.email}</span>
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-sm flex items-center gap-2 transform hover:-translate-y-1 ${
                theme === 'dark' 
                  ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20' 
                  : 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100'
              }`}
            >
              🚪 {t.logoutBtn}
            </button>
          </div>
        </div>

        {/* Action Grid (Buttery Smooth Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Profile Card */}
          <Link href="/profilecreation" className={`group relative p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl border flex items-center gap-6 ${
            theme === 'dark' ? 'bg-slate-800/80 border-slate-700 hover:border-blue-500 hover:shadow-blue-500/20' : 'bg-white border-slate-100 hover:border-blue-400 hover:shadow-blue-500/15'
          }`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${theme === 'dark' ? 'bg-slate-700' : 'bg-blue-50'}`}>
              👤
            </div>
            <div>
              <h3 className={`text-xl font-black mb-1 transition-colors ${theme === 'dark' ? 'group-hover:text-blue-400' : 'group-hover:text-blue-600'}`}>{t.profileBtn}</h3>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t.profileDesc}</p>
            </div>
          </Link>

          {/* Services Card */}
          <Link href="/servicecategory" className={`group relative p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl border flex items-center gap-6 ${
            theme === 'dark' ? 'bg-slate-800/80 border-slate-700 hover:border-emerald-500 hover:shadow-emerald-500/20' : 'bg-white border-slate-100 hover:border-emerald-400 hover:shadow-emerald-500/15'
          }`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${theme === 'dark' ? 'bg-slate-700' : 'bg-emerald-50'}`}>
              🛠️
            </div>
            <div>
              <h3 className={`text-xl font-black mb-1 transition-colors ${theme === 'dark' ? 'group-hover:text-emerald-400' : 'group-hover:text-emerald-600'}`}>{t.servicesBtn}</h3>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t.servicesDesc}</p>
            </div>
          </Link>

          {/* Secondhand Market Card */}
          <Link href="/secondhandmarket" className={`group relative p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl border flex items-center gap-6 ${
            theme === 'dark' ? 'bg-slate-800/80 border-slate-700 hover:border-purple-500 hover:shadow-purple-500/20' : 'bg-white border-slate-100 hover:border-purple-400 hover:shadow-purple-500/15'
          }`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${theme === 'dark' ? 'bg-slate-700' : 'bg-purple-50'}`}>
              🛒
            </div>
            <div>
              <h3 className={`text-xl font-black mb-1 transition-colors ${theme === 'dark' ? 'group-hover:text-purple-400' : 'group-hover:text-purple-600'}`}>{t.marketBtn}</h3>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t.marketDesc}</p>
            </div>
          </Link>

          {/* Food and Meal Card (NEW!) */}
          <Link href="/foodandmeal" className={`group relative p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl border flex items-center gap-6 ${
            theme === 'dark' ? 'bg-slate-800/80 border-slate-700 hover:border-orange-500 hover:shadow-orange-500/20' : 'bg-white border-slate-100 hover:border-orange-400 hover:shadow-orange-500/15'
          }`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${theme === 'dark' ? 'bg-slate-700' : 'bg-orange-50'}`}>
              🍔
            </div>
            <div>
              <h3 className={`text-xl font-black mb-1 transition-colors ${theme === 'dark' ? 'group-hover:text-orange-400' : 'group-hover:text-orange-600'}`}>{t.foodBtn}</h3>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t.foodDesc}</p>
            </div>
          </Link>

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