import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConnectBD",
  description: "A Bangladesh community marketplace and directory.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-full bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
