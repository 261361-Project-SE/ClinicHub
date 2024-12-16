import { Inter } from "next/font/google";
import "../../../globals.css";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

export default function AppointmentLayout({ children }: Readonly<LayoutProps>) {
  return (
    <div
      className={`
        ${inter.className}
        min-h-screen
        antialiased 
        overflow-x-hidden
        w-full
      `}
    >
      <div
        className="
          absolute 
          top-0 
          left-0 
          w-full 
          h-[650px] 
          bg-gradient-pink 
          -z-10 
          hidden 
          md:block
        "
      />
      <Navbar />
      <main className="relative mt-16 w-full">
        <div
          className="
          container 
          mx-auto 
          px-4 
          sm:px-6 
          md:px-4
          lg:px-8 
          xl:px-8 
          py-6
        "
        >
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
