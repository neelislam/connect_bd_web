"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
// Change this:
// import { auth, db } from "@/firebase/config";

// To this:
import { auth, db } from "../../firebase/config";
// Define a type for your user data
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  division: string;
  district: string;
  role: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserProfile);
        } else {
          router.push("/login"); // Edge case: auth exists but no profile document
        }
      } else {
        router.push("/login"); // Not logged in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black text-xl font-semibold">Loading ConnectBD...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 font-semibold transition-colors">
            Logout
          </button>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-2xl font-semibold mb-4 text-blue-900">Welcome, {userData?.name}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><span className="font-semibold text-gray-900">Role:</span> <span className="uppercase text-blue-600 font-bold ml-1">{userData?.role}</span></p>
            <p><span className="font-semibold text-gray-900">Email:</span> {userData?.email}</p>
            <p><span className="font-semibold text-gray-900">Phone:</span> {userData?.phone}</p>
            <p><span className="font-semibold text-gray-900">Location:</span> {userData?.district}, {userData?.division}</p>
          </div>
        </div>
        
        {/* Admin Only Section */}
        {userData?.role === 'admin' && (
          <div className="mt-8 bg-purple-50 p-6 rounded-lg border border-purple-100">
            <h2 className="text-xl font-bold text-purple-900 mb-2">Admin Controls</h2>
            <p className="text-purple-700">You are seeing this because your role is set to <strong>'admin'</strong> in Firestore. You can build out user management features here.</p>
          </div>
        )}
      </div>
    </div>
  );
}