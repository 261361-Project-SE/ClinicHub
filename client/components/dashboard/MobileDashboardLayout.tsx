"use client";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileDashboardLayout({ children }: MobileLayoutProps) {
  return (
    <div className="bg-whitegray-100 w-full min-h-screen overflow-x-hidden">
      {children}
    </div>
  );
}
