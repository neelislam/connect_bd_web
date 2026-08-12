'use client'
import Link from 'next/link';
import { User, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 dark:bg-black/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-black tracking-widest text-brand-blue">
          connect_bd
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition">
            {isDark ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
          </button>
          <Link href="/profile" className="p-2 rounded-full hover:bg-white/10 transition">
            <User size={20} className="dark:text-white" />
          </Link>
        </div>
      </div>
    </nav>
  );
}