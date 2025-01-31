import { Noto_Sans_Thai_Looped } from "next/font/google";
import React from "react";
import "../../../globals.css";
import Navbar from "../components/navbar";
import Navbarinpage from "../components/navbarinpage";

const notoSansThaiLooped = Noto_Sans_Thai_Looped({
  subsets: ["thai"],
  weight: ["400", "700"],
});

interface LayoutProps {
  children: React.ReactNode;
}

const GradientBackground: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-[650px] bg-gradient-to-r from-pink-200 to-pink-300 -z-10 hidden md:block" />
);

const feedbackLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={`${notoSansThaiLooped.className} min-h-screen antialiased overflow-x-hidden w-full`}
    >
      <GradientBackground />
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="block md:hidden">
        <Navbarinpage />
      </div>
      <main className="relative w-full">
        <div className="max-w-7xl mx-auto py-1">{children}</div>
      </main>
    </div>
  );
};

export default feedbackLayout;
