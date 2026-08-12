"use client";
import { useState } from "react";
import { auth, db } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { bdLocations } from "@/data/locations";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const [phone, setPhone] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      
      const userRef = doc(db, "users", loggedInUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        router.push("/dashboard");
      } else {
        setUser(loggedInUser);
        setNeedsProfile(true);
      }
    } catch (error) {
      console.error("Login Failed", error);
      alert("Login failed. Make sure your domain is authorized in Firebase.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "Unknown",
        email: user.email,
        phone: phone,
        division: division,
        district: district,
        role: "user" // Default role. Change manually to 'admin' in Firestore DB.
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving profile", error);
      alert("Failed to save profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black p-4 w-full">
      {!needsProfile ? (
        <div className="text-center bg-white p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">ConnectBD Login</h1>
          <button 
            onClick={handleGoogleLogin} 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 disabled:bg-blue-300 font-semibold text-lg transition-colors flex justify-center items-center gap-2"
          >
            {isLoading ? "Loading..." : "Sign in with Google"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-1">Complete Profile</h2>
          <p className="text-gray-600 text-center mb-4 text-sm">We need a few details to finish setting up.</p>
          
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Email</label>
            <input type="email" value={user?.email || ""} readOnly className="p-3 rounded-lg border bg-gray-100 text-gray-500 outline-none" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Name</label>
            <input type="text" value={user?.displayName || ""} readOnly className="p-3 rounded-lg border bg-gray-100 text-gray-500 outline-none" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Phone Number</label>
            <input required type="tel" placeholder="017XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Division</label>
            <select required value={division} onChange={(e) => { setDivision(e.target.value); setDistrict(""); }} className="p-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">Select Division</option>
              {Object.keys(bdLocations).map((div) => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">District</label>
            <select required value={district} onChange={(e) => setDistrict(e.target.value)} disabled={!division} className="p-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 bg-white">
              <option value="">Select District</option>
              {division && bdLocations[division].map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={isLoading} className="bg-green-600 text-white px-4 py-3 rounded-lg mt-4 hover:bg-green-700 font-bold text-lg transition-colors disabled:bg-green-300">
            {isLoading ? "Saving..." : "Complete Registration"}
          </button>
        </form>
      )}
    </div>
  );
}