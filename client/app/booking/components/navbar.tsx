"use client";

import { Bell as BellIcon, AlignLeft } from "lucide-react";
import React from "react";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  logoSrc?: string;
  logoAlt?: string;
}

// Move NotificationButton outside of Navbar
const NotificationButton = ({
  onNotificationClick,
}: {
  onNotificationClick?: () => void;
}) => (
  <a
    href="/notifications"
    className="p-2 hover:bg-white/10 rounded-full transition-colors"
    aria-label="Notifications"
    onClick={(e) => {
      e.preventDefault();
      if (onNotificationClick) onNotificationClick();
    }}
  >
    <BellIcon className="h-6 w-6" />
  </a>
);

const Navbar: React.FC<NavbarProps> = ({
  onMenuClick,
  onNotificationClick,
  logoSrc = "/logo.png",
  logoAlt = "Mongkhonsi",
}) => {
  const MobileNav = () => (
    <div className="md:hidden">
      <div className="flex justify-between items-center p-4 bg-gradient-pink z-50 w-full shadow-bg h-[220px] rounded-b-[12px]">
        <button
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={onMenuClick}
          aria-label="Menu"
        >
          <AlignLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-4">
          <NotificationButton onNotificationClick={onNotificationClick} />
        </div>
      </div>
    </div>
  );

  const DesktopNav = () => (
    <div className="hidden md:block">
      <div className="bg-gradient-pink shadow-bg  h-[654px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="/" className="hover:opacity-80 transition-opacity">
                <img src={logoSrc} alt={logoAlt} className="h-8" />
              </a>
            </div>
            <div className="flex items-center space-x-8">
              <NotificationButton onNotificationClick={onNotificationClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0">
      <MobileNav />
      <DesktopNav />
    </nav>
  );
};

export default Navbar;
