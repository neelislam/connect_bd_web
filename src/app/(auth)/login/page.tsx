'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/');
      toast.success('Logged in!');
    } catch (err) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-purple-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-md w-full border border-white/30"
      >
        <h1 className="text-3xl font-bold text-white text-center">connect_bd</h1>
        <p className="text-white/80 text-center mb-8">Connecting people everywhere</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="w-full py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-opacity-90 transition"
          >
            LOG IN
          </button>
        </form>
        <div className="mt-4 flex items-center gap-4">
          <hr className="flex-1 border-white/30" />
          <span className="text-white/60 text-sm">OR</span>
          <hr className="flex-1 border-white/30" />
        </div>
        <button
          onClick={loginWithGoogle}
          className="w-full mt-4 py-3 border border-white/50 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition"
        >
          <span>G</span> CONTINUE WITH GOOGLE
        </button>
        <p className="text-white/80 text-center mt-6">
          New here?{' '}
          <Link href="/onboarding" className="font-bold underline">
            Become a Member
          </Link>
        </p>
      </motion.div>
    </div>
  );
}