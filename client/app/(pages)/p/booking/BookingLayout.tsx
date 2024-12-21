import { Inter } from "next/font/google";
import React from "react";
import "../../../globals.css";
import Navbar from "../components/navbar";
import Navbarinpage from "../components/navbarinpage";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

const BookingLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={`${inter.className} min-h-screen antialiased overflow-x-hidden w-full`}
    >
      <div className="absolute top-0 left-0 w-full h-[650px] bg-gradient-to-r from-pink-200 to-pink-300 -z-10 hidden md:block" />
      <div className="md:block hidden ">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <Navbarinpage />
      </div>
      <main className="relative mt-16 w-full">
        <div className="max-w-7xl mx-auto py-1 flex flex-col items-center justify-center">
          {children}
        </div>
      </main>
    </div>
  );
};

export default BookingLayout;
