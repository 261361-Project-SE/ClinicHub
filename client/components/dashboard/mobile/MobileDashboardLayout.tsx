"use client";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileDashboardLayout({ children }: MobileLayoutProps) {
  return (
    <div className="relative flex flex-col w-full min-h-screen overflow-hidden bg-whitegray-100">
      {children}
    </div>
  );
}
