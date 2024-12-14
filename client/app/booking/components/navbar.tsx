"use client";

import { Bell as BellIcon, AlignLeft, MessagesSquare } from "lucide-react";
import React from "react";

interface NavbarProps {
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  logoSrc?: string;
  logoAlt?: string;
  onMessageClick?: () => void;
}

const NotificationButton = ({
  onNotificationClick,
}: {
  onNotificationClick?: () => void;
}) => (
  <a
    href="/notifications"
    className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
    aria-label="Notifications"
    onClick={(e) => {
      e.preventDefault();
      if (onNotificationClick) onNotificationClick();
    }}
  >
    <BellIcon className="h-6 w-6 scale-120 text-black" />
  </a>
);

const MessageButton = ({ onMessageClick }: { onMessageClick?: () => void }) => (
  <a
    href="/messages"
    className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
    aria-label="Messages"
  >
    <MessagesSquare className="h-6 w-6 scale-120 text-black" />
  </a>
);

const Navbar: React.FC<NavbarProps> = ({
  onMenuClick,
  onNotificationClick,
  logoSrc = "/logo.png",
  logoAlt = "Mongkhonsi",
  onMessageClick,
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "ตอนเช้า";
    if (hour >= 12 && hour < 17) return "ตอนบ่าย";
    return "ตอนเย็น";
  };

  const Logo = () => (
    <div className="rounded-full overflow-hidden w-16 h-16">
      <img src={logoSrc} alt={logoAlt} className="w-full h-full object-cover" />
    </div>
  );

  const ActionButtons = () => (
    <div className="flex items-center space-x-4">
      <MessageButton onMessageClick={onMessageClick} />
      <NotificationButton onNotificationClick={onNotificationClick} />
    </div>
  );

  const MobileNav = () => (
    <div className="md:hidden">
      <div className="flex justify-between items-center p-4 bg-gradient-pink shadow-bg h-[220px] rounded-b-[12px]">
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full">
            <button
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={onMenuClick}
              aria-label="Menu"
            >
              <AlignLeft className="h-6 w-6 text-black" />
            </button>
            <ActionButtons />
          </div>

          <div className="mt-8 flex items-center justify-start px-12 space-x-8">
            <Logo />
            <div className="text-black">
              <div className="text-lg font-noto font-medium">สวัสดี,</div>
              <div className="text-2xl font-semibold font-noto">
                {getGreeting()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DesktopNav = () => (
    <div className="hidden md:block">
      <div className="bg-gradient-pink shadow-bg h-[654px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 pt-8">
            <div className="flex-shrink-0">
              <a
                href="/"
                className="hover:shadow-lg transition-opacity rounded-full z-50 overflow-hidden w-16 h-16"
              >
                <Logo />
              </a>
            </div>
            <ActionButtons />
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
