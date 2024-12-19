"use client";

import Sidebar from "@/components/ui/SIdebar";
import { CalendarDaysIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/d/dashboard": "แดชบอร์ด",
  "/d/appointments": "การนัดหมาย",
  "/d/calendar": "ปฏิทิน",
  "/d/settings": "การตั้งค่า",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const pageTitle = PAGE_TITLES[pathname] || "";

  return (
    <html lang="en">
      <body>
        <main className="flex h-screen bg-whitegray-100">
          <aside className="w-64 h-full xl:w-72 2xl:w-80">
            <Sidebar />
          </aside>

          <section className="flex-1 h-full p-5">
            <header className="flex items-center justify-between h-[86px] px-6 bg-white shadow-shadow-bg rounded-xl">
              <h1 className="text-2xl text-darkgray font-medium md:text-3xl xl:text-4xl">
                {pageTitle}
              </h1>

              <div className="flex items-center gap-x-2">
                <div className="text-primary bg-lightgray-100 text-lightgray text-left rounded-xl px-8 py-2">
                  ค้นหาการนัดหมาย, ชื่อคนไข้, หมายเลขโทรศัพท์
                </div>
                <div className="p-2 bg-lightgray-100 text-lightgray rounded-xl">
                  <CalendarDaysIcon size={24} />
                </div>
              </div>
            </header>

            <div className="h-[calc(100vh-130px)] mt-5 overflow-auto">
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
