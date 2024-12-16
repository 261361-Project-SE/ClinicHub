import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../globals.css";
import Navbar from "../appointment/components/navbar";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen antialiased overflow-x-hidden w-full`}
      >
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-pink -z-10 hidden lg:block" />
        <Navbar />
        <main className="relative mt-16 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
