import { Inter } from "next/font/google";
import "../../../globals.css";
import Navbar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

const AppointmentLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={`${inter.className} min-h-screen antialiased overflow-x-hidden w-full`}
    >
      <div className="absolute top-0 left-0 w-full h-[650px] bg-gradient-to-r from-pink-200 to-pink-300 -z-10 hidden md:block" />
      {/* <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-r from-pink-200 to-pink-300 -z-10 block md:hidden" /> */}
      <Navbar />
      <main className="relative mt-16 w-full">
        <div className="max-w-7xl mx-auto py-1 flex flex-col items-center justify-center">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppointmentLayout;
