// app/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/"); // Redirect to login if not logged in
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to your Dashboard!</h1>
        <p className="text-gray-600 mb-8">
          Logged in as: <strong>{user.email}</strong>
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/profilecreation"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            Create / Edit Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded shadow hover:bg-red-600 transition"
          >
            Log Out
          </button>


          {/* Add this inside the flex container with your other buttons */}
<Link
  href="/servicecategory"
  className="bg-green-600 text-white font-semibold px-6 py-2 rounded shadow hover:bg-green-700 transition"
>
  Browse Services
</Link>
        </div>
      </div>
    </div>
  );
}