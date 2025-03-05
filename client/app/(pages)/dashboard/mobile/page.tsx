"use client";

import Error from "@/app/error";
import PageLoader from "@/components/PageLoader";
import MobileAppointmentCard from "@/components/dashboard/mobile/MobileAppointmentCard";
import MobileDashboardLayout from "@/components/dashboard/mobile/MobileDashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getWeekDays } from "@/helper/getWeekDays";
import { useFetchAppointments } from "@/hooks/useFetchAppointments";
import { currentThaiMonth, currentThaiYear } from "@/lib/variables";
import { ChartArea, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MobileDashboard = () => {
  const { appointments, loading, error } = useFetchAppointments();

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <MobileDashboardLayout>
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 right-0 z-10 pb-6 bg-gradient-to-tr from-pink-200 to-pink-100 rounded-b-2xl">
        <div className="flex items-center justify-between px-4 py-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-0">
                <Menu className="text-black" size={24} />
              </Button>
            </SheetTrigger>
            <SheetTitle hidden />
            <SheetContent side="left" className="w-[300px]">
              <div className="mt-4">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/dashboard/mobile/appointment/create"
                    className="p-2 font-medium text-center text-white bg-pink-200 rounded-lg"
                  >
                    สร้างการนัดหมาย
                  </Link>
                  <Link
                    href="/dashboard/appointment"
                    className="flex items-center p-2 rounded-lg gap-2"
                  >
                    <div className="w-2 h-2 bg-pink-200" />
                    <span>การนัดหมายทั้งหมด</span>
                  </Link>
                  <Link
                    href="/dashboard/mobile/summary"
                    className="flex items-center p-2 rounded-lg gap-2"
                  >
                    <div className="w-2 h-2 bg-pink-200" />
                    <span>สรุปผลทั้งหมด</span>
                  </Link>
                  <Link
                    href="/dashboard/feedback"
                    className="flex items-center p-2 rounded-lg gap-2"
                  >
                    <div className="w-2 h-2 bg-pink-200" />
                    <span>ความพึงพอใจ</span>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard/mobile/summary">
            <ChartArea className="text-black" size={24} />
          </Link>
        </div>

        <div className="flex items-center px-4 mt-4 gap-4">
          <Image
            src="/logo.png"
            alt="Doctor Logo"
            width={80}
            height={80}
            className="rounded-full shadow-shadow-bg"
          />
          <div className="flex flex-col">
            <div className="text-lg font-medium">สวัสดี,</div>
            <div className="text-2xl font-semibold">Mongkol Clinic</div>
          </div>
        </div>

        {/* Search Bar */}
        {/* <div className="relative px-4 mt-4">
          <Search
            className="absolute text-gray-400 left-7 top-1/2 transform -translate-y-1/2"
            size={20}
          />
          <Input
            type="text"
            placeholder="ค้นหาการนัด, ชื่อคนไข้, เบอร์โทรศัพท์"
            className="w-full py-2 pl-10 pr-4 bg-white rounded-xl"
          />
        </div> */}
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 mt-[180px] pb-20 overflow-y-auto">
        {/* Tabs Section */}
        <div className="flex px-4 mt-4 gap-2">
          <Link
            href="/dashboard/mobile/appointment/create"
            className="w-full py-4 font-bold text-center text-white bg-pink-200 rounded-lg shadow-shadow-bg"
          >
            สร้างการนัดหมาย
          </Link>
          <Link
            href="/dashboard/appointment"
            className="w-full py-4 text-center bg-white rounded-lg shadow-shadow-bg"
          >
            การนัดหมายทั้งหมด
          </Link>
        </div>

        {/* Calendar Section */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">จำนวนการนัดหมาย</h3>
            <Link
              href={"/dashboard/appointment"}
              className="font-medium text-pink-200"
            >
              ดูทั้งหมด
            </Link>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {currentThaiMonth} {currentThaiYear}
          </div>
          <div className="flex w-full py-2 mt-2 overflow-x-auto gap-3 no-scrollbar">
            {getWeekDays(appointments).map((day, index) => (
              <div
                key={index}
                className="relative px-3 py-3 bg-white rounded-full shadow-shadow-bg min-w-[76px] text-center"
              >
                {day.count > 0 && (
                  <span className="absolute w-3 h-3 bg-red-500 rounded-full animate-pulse top-2 right-2" />
                )}
                <p className="text-gray-600">
                  {day.day},{day.date}
                </p>
                <span className="mt-1 text-xl font-bold text-pink-200">
                  {day.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments Section */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">การนัดหมายที่รอยืนยัน</h3>
            <Link
              href={"/dashboard/mobile/appointment"}
              className="font-medium text-pink-200"
            >
              ดูทั้งหมด
            </Link>
          </div>
          {appointments
            .slice(0, 6)
            .filter(
              (appointment) => appointment.appointment_status === "PENDING"
            )
            .map((appointment) => (
              <MobileAppointmentCard key={appointment.id} {...appointment} />
            ))}
          <Link
            href={"/dashboard/mobile/appointment"}
            className="flex justify-center mt-4"
          >
            <Button variant="outline" className="w-full font-medium rounded-lg">
              ดูทั้งหมด
            </Button>
          </Link>
        </div>
      </div>
    </MobileDashboardLayout>
  );
};

export default MobileDashboard;
