import '@/app/globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/layout/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gradient-to-br from-[#F4F7FD] to-[#E0EAFC] dark:from-brand-dark dark:to-[#1D1E33] transition-colors duration-500">
        <ThemeProvider>
          <Header />
          <main className="pt-20 pb-12">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}