// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Connect BD",
  description: "Connect BD Web Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}