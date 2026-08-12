'use client'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-2xl"
      >
        <h1 className="text-4xl font-black text-center tracking-widest mb-8 dark:text-white">connect_bd</h1>
        <input 
          type="text" placeholder="Phone Number" 
          className="w-full bg-white/50 dark:bg-black/30 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 mb-4 focus:outline-none dark:text-white"
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full bg-white/50 dark:bg-black/30 border border-gray-300 dark:border-white/20 rounded-xl px-4 py-3 mb-8 focus:outline-none dark:text-white"
        />
        <button 
          onClick={() => router.push('/dashboard')}
          className="w-full bg-brand-blue text-white font-black tracking-widest py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform"
        >
          LOG IN
        </button>
      </motion.div>
    </div>
  );
}