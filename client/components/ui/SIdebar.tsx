"use client";

import logo from "@/public/HDlogo.png";
import {
  CalendarClockIcon,
  CalendarDaysIcon,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const menuList = [
    {
      name: "แดชบอร์ด",
      icon: LayoutDashboardIcon,
      href: "/d/dashboard",
    },
    {
      name: "การนัดหมาย",
      icon: CalendarClockIcon,
      href: "/d/appointment",
    },
    {
      name: "ปฏิทิน",
      icon: CalendarDaysIcon,
      href: "/d/calendar",
    },
    {
      name: "ออกจากระบบ",
      icon: LogOutIcon,
      href: "#",
    },
  ];

  return (
    <div className="flex flex-col h-full p-4 ml-5 bg-white gap-y-12 shadow-shadow-bg">
      <Image
        src={logo}
        alt="logo"
        className="flex mx-auto rounded-full shadow-shadow-bg"
        width={150}
        height={150}
      />
      <ul className="flex flex-col mt-8 gap-y-10">
        {menuList.map((menu) => {
          const isActive = pathname === menu.href;
          return (
            <li
              key={menu.name}
              className={`flex items-center gap-4 cursor-pointer ${
                isActive ? "text-pink-200 font-semibold" : "text-darkgray"
              }`}
            >
              <Link href={menu.href} className="flex items-center gap-4">
                <menu.icon
                  size={24}
                  className={`mt-0.5 ${
                    isActive ? "text-pink-200" : "text-darkgray"
                  }`}
                />
                <span>{menu.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
