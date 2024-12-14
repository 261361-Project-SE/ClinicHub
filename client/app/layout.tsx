import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./booking/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.className}
          min-h-screen
          bg-white
          antialiased
          overflow-x-hidden
          
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          mx-auto
          max-w-7xl
        `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
