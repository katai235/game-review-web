import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/app/components/Navbar"; 
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Games_Review",
  description: "Official 2025 Game Records Archive",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <Navbar />
        {/* The ONLY <main> tag should be here. It centers everything. */}
        <main className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}