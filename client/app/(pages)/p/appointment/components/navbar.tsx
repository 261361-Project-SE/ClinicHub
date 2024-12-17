"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Bell as BellIcon,
  AlignLeft,
  MessagesSquare,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, memo, useEffect } from "react";

interface NavbarProps {
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
  logoSrc?: string;
  logoAlt?: string;
}

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
  icon: React.ReactNode;
}

const IconButton = memo(({ onClick, ariaLabel, icon }: ButtonProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (React.isValidElement(icon) && icon.type === AlignLeft) {
      setIsSidebarOpen((prev) => !prev);
    }
    event.preventDefault();
    onClick?.(event);
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
});

IconButton.displayName = "IconButton";

const NotificationButton = memo(
  ({ onNotificationClick }: Pick<NavbarProps, "onNotificationClick">) => (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center justify-center p-2 hover:bg-white/10 rounded-full transition-colors relative"
          aria-label="Notifications"
        >
          <BellIcon className="h-6 w-6 text-black transition-transform hover:scale-110" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ตรวจสอบนัดหมาย</DialogTitle>
          <DialogDescription>
            กรุณากรอกข้อมูลด้านล่างเพื่อยืนยันการตรวจสอบนัดหมาย
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col space-y-4">
          <input
            type="text"
            placeholder="ชื่อ - นามสกุล"
            className="border rounded-md p-2"
            required
            pattern="^[\p{L} ]+$"
            title="กรุณากรอกชื่อและนามสกุลที่ถูกต้อง"
          />
          <input
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            className="border rounded-md p-2"
            required
            pattern="^[0-9]{10}$"
            title="กรุณากรอกเบอร์โทรศัพท์ 10 หลัก"
          />
          <button className="bg-pink-200 text-xl text-white rounded-lg p-2 hover:bg-pink-600 transition duration-200 w-[100px] ml-auto font-noto text-center font-medium">
            ตรวจสอบ
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
);

NotificationButton.displayName = "NotificationButton";

const MessageButton = memo(
  ({ onMessageClick }: Pick<NavbarProps, "onMessageClick">) => (
    <IconButton
      ariaLabel="Messages"
      onClick={onMessageClick}
      icon={
        <MessagesSquare className="h-6 w-6 text-black transition-transform hover:scale-110" />
      }
    />
  )
);

MessageButton.displayName = "MessageButton";

const Logo = memo(({ src, alt }: { src: string; alt: string }) => (
  <Link href="/">
    <div className="rounded-full overflow-hidden w-16 h-16 transition-transform hover:scale-105">
      <Image
        src={src}
        alt={alt}
        width={192}
        height={192}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  </Link>
));

Logo.displayName = "Logo";

const ActionButtons = memo(
  ({
    onMessageClick,
    onNotificationClick,
  }: Pick<NavbarProps, "onMessageClick" | "onNotificationClick">) => (
    <div className="flex items-center gap-4">
      <MessageButton onMessageClick={onMessageClick} />
      <NotificationButton onNotificationClick={onNotificationClick} />
    </div>
  )
);

ActionButtons.displayName = "ActionButtons";

const MobileNav = memo(
  ({
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
  )
);

MobileNav.displayName = "MobileNav";

const DesktopNav = memo(
  ({
    onMessageClick,
    onNotificationClick,
    logoSrc = "/logo.png",
    logoAlt = "Mongkhonsi",
  }: Pick<
    NavbarProps,
    "onMessageClick" | "onNotificationClick" | "logoSrc" | "logoAlt"
  >) => (
    <div className="hidden md:flex">
      <div className="flex w-full shadow-bg min-h-20">
        <div className="flex max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-center min-h-max w-full">
            <Logo src={logoSrc} alt={logoAlt} />
            <ActionButtons
              onMessageClick={onMessageClick}
              onNotificationClick={onNotificationClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
);

DesktopNav.displayName = "DesktopNav";

const Navbar = memo(
  ({
    onMenuClick,
    onNotificationClick,
    onMessageClick,
    logoSrc = "/logo.png",
    logoAlt = "Mongkhonsi",
  }: NavbarProps) => {
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
      const hour = new Date().getHours();
      const getGreeting = () => {
        if (hour >= 5 && hour < 12) return "ตอนเช้า";
        if (hour >= 12 && hour < 17) return "ตอนบ่าย";
        return "ตอนเย็น";
      };
      setGreeting(getGreeting());
    }, []);

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
  }
);

Navbar.displayName = "Navbar";

export default Navbar;
