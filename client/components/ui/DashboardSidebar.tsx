"use client";

import logo from "@/public/HDlogo.png";
import {
  CalendarClockIcon,
  CalendarDaysIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSideBar = () => {
  const pathname = usePathname();

  const menuList = [
    {
      name: "แดชบอร์ด",
      icon: LayoutDashboardIcon,
      href: "/dashboard/desktop",
    },
    {
      name: "การนัดหมาย",
      icon: CalendarClockIcon,
      href: "/dashboard/desktop/appointment",
    },
    {
      name: "ปฏิทิน",
      icon: CalendarDaysIcon,
      href: "/dashboard/desktop/calendar",
    },
    {
      name: "ตั้งค่า",
      icon: SettingsIcon,
      href: "/dashboard/desktop/settings",
    },
    {
      name: "ออกจากระบบ",
      icon: LogOutIcon,
      href: "#",
    },
  ];

  return (
    <div className="flex flex-col h-full p-4 ml-5 bg-white gap-y-12 shadow-shadow-bg">
      <Link href="/dashboard">
        <Image
          priority
          loading="eager"
          src={logo}
          alt="logo"
          className="flex mx-auto rounded-full shadow-lg hover:shadow-xl duration-300"
          width={150}
          height={150}
        />
      </Link>
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

export default DashboardSideBar;
