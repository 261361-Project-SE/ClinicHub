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
        <div className="absolute top-0 left-0 hidden w-full h-1/2 bg-gradient-pink -z-10 lg:block" />
        <Navbar />
        <main className="relative w-full mt-16">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
