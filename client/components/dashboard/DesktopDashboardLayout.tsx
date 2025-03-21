"use client";

// import Searchbar from "@/components/dashboard/Searchbar";
import Sidebar from "@/components/ui/DashboardSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "แดชบอร์ด",
  "/dashboard/appointment": "การนัดหมาย",
  "/dashboard/desktop/calendar": "ปฏิทิน",
  "/dashboard/desktop/settings": "การตั้งค่า",
  "/dashboard/feedback": "ความพึงพอใจ",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DesktopDashboardLayout({
  children,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    setPageTitle(PAGE_TITLES[pathname] || "");
  }, [pathname]);

  return (
    <main className="flex h-screen bg-whitegray-100">
      <aside className="w-64 h-full xl:w-72 2xl:w-80">
        <Sidebar />
      </aside>

      <section className="flex-1 h-full p-5">
        <header className="flex items-center justify-between h-[86px] px-6 bg-white shadow-shadow-bg rounded-2xl">
          <h1 className="text-2xl font-medium text-darkgray md:text-3xl xl:text-4xl">
            {pageTitle}
          </h1>
          <div className="min-w-[300px]">{/* <Searchbar /> */}</div>
        </header>

        <div className="h-[calc(100vh-130px)] mt-5 overflow-auto">
          {children}
        </div>
      </section>
    </main>
  );
}
