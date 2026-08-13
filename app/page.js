// app/page.js
"use client";

import { useState, useEffect } from "react";
import { auth, googleProvider } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect, // Changed to Redirect
  getRedirectResult,  // Added to catch redirect errors
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Prevents flickering during redirect

  const router = useRouter();

  // Listen for Auth State Changes & Handle Redirect Results
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Catch any errors that happen when returning from the Google redirect
    getRedirectResult(auth).catch((err) => {
      setError(err.message);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Safely redirect to dashboard if the user IS logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Email/Password Authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Google Authentication (Now using Redirect)
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true); // Show loading text before the page unloads
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Show a loading state while redirecting to avoid flashing the login screen
  if (user || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        Loading...
      </div>
    );
  }

  // UI if user is NOT logged in
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Log In" : "Sign Up"}
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <span className="text-gray-400">or</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 transition flex justify-center items-center gap-2"
        >
          Sign in with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}