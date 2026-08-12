"use client";
import { useState } from "react";
import { auth, db } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { bdLocations } from "@/data/locations";

export default function LoginPage() {
  const [user, setUser] = useState(null);
  const [needsProfile, setNeedsProfile] = useState(false);
  
  // Form States
  const [phone, setPhone] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      
      // Check if user exists in Firestore
      const userRef = doc(db, "users", loggedInUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        alert("Logged in successfully!");
        // Redirect to dashboard based on Role (Admin vs User)
      } else {
        setUser(loggedInUser);
        setNeedsProfile(true); // Show the extra info form
      }
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        phone: phone,
        division: division,
        district: district,
        role: "user" // Default role, you can manually change to 'admin' in Firestore
      });
      alert("Profile Created!");
      setNeedsProfile(false);
    } catch (error) {
      console.error("Error saving profile", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {!needsProfile ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">ConnectBD</h1>
          <button 
            onClick={handleGoogleLogin} 
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 w-full max-w-md bg-gray-100 p-6 rounded shadow">
          <h2 className="text-xl font-bold">Complete your profile</h2>
          
          <label>Phone Number</label>
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-2 rounded border" />

          <label>Division</label>
          <select required value={division} onChange={(e) => { setDivision(e.target.value); setDistrict(""); }} className="p-2 rounded border">
            <option value="">Select Division</option>
            {Object.keys(bdLocations).map((div) => (
              <option key={div} value={div}>{div}</option>
            ))}
          </select>

          <label>District</label>
          <select required value={district} onChange={(e) => setDistrict(e.target.value)} disabled={!division} className="p-2 rounded border">
            <option value="">Select District</option>
            {division && bdLocations[division].map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700">
            Complete Registration
          </button>
        </form>
      )}
    </div>
  );
}