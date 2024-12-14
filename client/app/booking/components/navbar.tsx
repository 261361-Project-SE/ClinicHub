"use client";

import {
  Bell as BellIcon,
  AlignLeft,
  MessagesSquare,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

interface NavbarProps {
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
  logoSrc?: string;
  logoAlt?: string;
}

interface ButtonProps {
  onClick?: () => void;
  ariaLabel: string;
  href: string;
  icon: React.ReactNode;
}

const IconButton = ({ onClick, ariaLabel, href, icon }: ButtonProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = () => {
    if (React.isValidElement(icon) && icon.type === AlignLeft) {
      setIsSidebarOpen(!isSidebarOpen);
    }
    onClick?.();
  };

  const renderSidebar = () => {
    if (
      !isSidebarOpen ||
      !React.isValidElement(icon) ||
      icon.type !== AlignLeft
    ) {
      return null;
    }

    return (
      <aside
        className="fixed inset-y-0 left-0 w-64 bg-whitegray-100 shadow-lg 
                transform transition-transform duration-300 ease-in-out z-50 
                rounded-r-2xl rounded-br-2xl"
        role="complementary"
        aria-label="Sidebar Menu"
      >
        <div className="p-4">
          <header className="flex justify-between items-center mt-8">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close menu"
            >
              <XIcon className="h-6 w-6 text-black transition-transform hover:scale-110" />
            </button>
          </header>
          <nav aria-label="Sidebar navigation">
            {/* Add your sidebar content here */}
          </nav>
        </div>
      </aside>
    );
  };

  return (
    <>
      <button
        type="button"
        className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        {icon}
      </button>
      {renderSidebar()}
    </>
  );
};

const NotificationButton = ({
  onNotificationClick,
}: Pick<NavbarProps, "onNotificationClick">) => (
  <IconButton
    href="/notifications"
    ariaLabel="Notifications"
    onClick={onNotificationClick}
    icon={
      <BellIcon className="h-6 w-6 text-black transition-transform hover:scale-110" />
    }
  />
);

const MessageButton = ({
  onMessageClick,
}: Pick<NavbarProps, "onMessageClick">) => (
  <IconButton
    href="/messages"
    ariaLabel="Messages"
    onClick={onMessageClick}
    icon={
      <MessagesSquare className="h-6 w-6 text-black transition-transform hover:scale-110" />
    }
  />
);

const Logo = ({ src, alt }: { src: string; alt: string }) => (
  <Link href="/">
    <div className="rounded-full overflow-hidden w-16 h-16 transition-transform hover:scale-105">
      <Image
        src={src}
        alt={alt}
        width={64}
        height={64}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  </Link>
);

const ActionButtons = ({
  onMessageClick,
  onNotificationClick,
}: Pick<NavbarProps, "onMessageClick" | "onNotificationClick">) => (
  <div className="flex items-center space-x-4">
    <MessageButton onMessageClick={onMessageClick} />
    <NotificationButton onNotificationClick={onNotificationClick} />
  </div>
);

const MobileNav = ({
  onMenuClick,
  onMessageClick,
  onNotificationClick,
  logoSrc = "/logo.png",
  logoAlt = "Mongkhonsi",
  greeting,
}: NavbarProps & { greeting: string }) => (
  <div className="md:hidden">
    <div className="flex justify-between items-center p-4 bg-gradient-pink shadow-bg h-[220px] rounded-b-[12px]">
      <div className="flex flex-col w-full">
        <div className="flex justify-between w-full">
          <IconButton
            href=""
            ariaLabel="Menu"
            onClick={onMenuClick}
            icon={
              <AlignLeft className="h-6 w-6 text-black transition-transform" />
            }
          />
          <ActionButtons
            onMessageClick={onMessageClick}
            onNotificationClick={onNotificationClick}
          />
        </div>
        <div className="mt-8 flex items-center justify-start px-12 space-x-8">
          <Logo src={logoSrc} alt={logoAlt} />
          <div className="text-black">
            <div className="text-lg font-noto font-medium">สวัสดี,</div>
            <div className="text-2xl font-semibold font-noto">{greeting}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DesktopNav = ({
  onMessageClick,
  onNotificationClick,
  logoSrc = "/logo.png",
  logoAlt = "Mongkhonsi",
}: Pick<
  NavbarProps,
  "onMessageClick" | "onNotificationClick" | "logoSrc" | "logoAlt"
>) => (
  <div className="hidden md:block">
    <div className="bg-gradient-pink shadow-bg h-[654px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 pt-8">
          <div className="flex-shrink-0">
            <div className="block transition-transform">
              <Logo src={logoSrc} alt={logoAlt} />
            </div>
          </div>
          <ActionButtons
            onMessageClick={onMessageClick}
            onNotificationClick={onNotificationClick}
          />
        </div>
      </div>
    </div>
  </div>
);

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "ตอนเช้า";
  if (hour >= 12 && hour < 17) return "ตอนบ่าย";
  return "ตอนเย็น";
};

const Navbar = ({
  onMenuClick,
  onNotificationClick,
  onMessageClick,
  logoSrc = "/logo.png",
  logoAlt = "Mongkhonsi",
}: NavbarProps) => {
  const greeting = useMemo(getGreeting, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <MobileNav
        onMenuClick={onMenuClick}
        onNotificationClick={onNotificationClick}
        onMessageClick={onMessageClick}
        logoSrc={logoSrc}
        logoAlt={logoAlt}
        greeting={greeting}
      />
      <DesktopNav
        onMessageClick={onMessageClick}
        onNotificationClick={onNotificationClick}
        logoSrc={logoSrc}
        logoAlt={logoAlt}
      />
    </nav>
  );
};

export default Navbar;
