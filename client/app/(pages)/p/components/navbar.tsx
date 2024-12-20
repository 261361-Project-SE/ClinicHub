"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Bell as BellIcon, MessagesSquare } from "lucide-react";
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

const IconButton = memo(({ onClick, ariaLabel, icon }: ButtonProps) => (
  <button
    type="button"
    className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
    aria-label={ariaLabel}
    onClick={onClick}
  >
    {icon}
  </button>
));

IconButton.displayName = "IconButton";

const NotificationButton = memo(
  ({ onNotificationClick }: Pick<NavbarProps, "onNotificationClick">) => (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton
          ariaLabel="Notifications"
          icon={
            <BellIcon className="h-6 w-6 text-black transition-transform hover:scale-110" />
          }
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>Here are your notifications.</DialogDescription>
        </DialogHeader>
        {/* Add notification content here */}
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
    <div className="flex items-center gap-2">
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
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-500 to-pink-300 shadow-bg h-[220px] rounded-b-[12px]">
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full">
            <p className="text-white text-base font-bold font-noto md:text-lg lg:text-xl">
              จองการนัด และ ตรวจสอบนัดหมาย
            </p>
            <ActionButtons
              onMessageClick={onMessageClick}
              onNotificationClick={onNotificationClick}
            />
          </div>
          <div className="mt-6 flex items-center justify-start px-12 space-x-8">
            <Logo src={logoSrc} alt={logoAlt} />
            <div className="text-black">
              <div className="text-lg font-noto font-semibold">สวัสดี,</div>
              <div className="text-2xl font-bold font-noto">{greeting}</div>
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
    <div className="hidden md:block">
      <div className="flex w-full shadow-bg min-h-20">
        <div className="flex max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-center min-h-max w-full">
            <div className="flex items-center space-x-4">
              <Logo src={logoSrc} alt={logoAlt} />
              <h1 className="block text-white text-xl font-medium text-start font-noto rounded-lg">
                จองการนัด และ ตรวจสอบนัดหมาย
              </h1>
            </div>
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
    onNotificationClick,
    onMessageClick,
    logoSrc = "/logo.png",
    logoAlt = "Mongkhonsi",
  }: NavbarProps) => {
    const [greeting, setGreeting] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    let lastScrollY = 0;

    useEffect(() => {
      const hour = new Date().getHours();
      const getGreeting = () => {
        if (hour >= 5 && hour < 12) return "ตอนเช้า";
        if (hour >= 12 && hour < 17) return "ตอนบ่าย";
        return "ตอนเย็น";
      };
      setGreeting(getGreeting());
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        if (typeof window !== "undefined") {
          const currentScrollY = window.scrollY;
          setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
          lastScrollY = currentScrollY;
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <nav
        className={`top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <MobileNav
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
