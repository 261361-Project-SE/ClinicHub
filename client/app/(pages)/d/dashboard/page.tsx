"use client";

import AppointmentTable from "@/components/dashboard/AppointmentTable";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { FeedbackChart } from "@/components/dashboard/FeedbackChart";
import { PatientChart } from "@/components/dashboard/PatientChart";
import PatientInformation from "@/components/dashboard/PatientInformation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { patientsData } from "@/helper/SampleData";
import { useFetchAppointments } from "@/hooks/useFetchAppointments";
import { currentThaiMonth, currentThaiYear } from "@/lib/variables";
import { Calendar1Icon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const DashboardPage = () => {
  const { appointments, loading, error } = useFetchAppointments();
  const [todayDate, setTodayDate] = useState<string | null>(null);

  useEffect(() => {
    setTodayDate(new Date().toDateString());
  }, []);

  const todayAppointments = useMemo(() => {
    if (!Array.isArray(appointments) || !todayDate) return [];
    return appointments.filter(
      (appointment) =>
        new Date(appointment.appointment_dateTime).toDateString() === todayDate
    );
  }, [appointments, todayDate]);

  const pendingAppointmentCount = appointments.filter(
    (appointment) => appointment.appointment_status === "toConfirm"
  ).length;

  const handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full animate-pulse gap-y-6">
        <div className="flex w-full gap-x-9 h-1/4">
          <Skeleton className="w-1/3 rounded-xl"></Skeleton>
          <Skeleton className="w-1/3 rounded-xl"></Skeleton>
          <Skeleton className="w-1/3 rounded-xl"></Skeleton>
        </div>
        <div className="flex w-full h-2/4">
          <Skeleton className="w-full h-full rounded-xl"></Skeleton>
        </div>
        <div className="flex w-full gap-x-9 h-1/4">
          <Skeleton className="w-1/3 rounded-xl"></Skeleton>
          <Skeleton className="w-1/3 rounded-xl"></Skeleton>
          <Skeleton className="w-1/3 rounded-xl"></Skeleton>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center text-center text-red-500 gap-y-2">
        <p>เกิดข้อผิดพลาด: {error}</p>
        <Button onClick={handleReload} variant="destructive">
          ลองใหม่อีกครั้ง
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full mx-auto gap-y-6">
      {/* Top section */}
      <div className="flex w-full gap-x-9 h-1/4">
        <DashboardCard
          title="การนัดหมายวันนี้"
          count={todayAppointments?.length || 0}
          date={`${currentThaiMonth} ${currentThaiYear}`}
        />
        <DashboardCard
          title="การนัดหมายที่รอยืนยัน"
          count={
            appointments?.filter(
              (appointment) => appointment.appointment_status === "PENDING"
            ).length || 0
          }
          date={`${currentThaiMonth} ${currentThaiYear}`}
        />
        <div className="w-1/3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-shadow-bg dark:shadow-none">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <div className="text-darkgray dark:text-gray-300">
                คนไข้ทั้งหมด
              </div>
              <div className="flex items-center gap-x-2">
                <UserIcon className="mt-1" color="#FB6F92" size={30} />
                <div className="text-3xl font-medium dark:text-white">200</div>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="text-darkgray dark:text-gray-300">
                แพทย์ทั้งหมด
              </div>
              <div className="flex items-center gap-x-2">
                <UserIcon className="mt-1" color="#FB6F92" size={30} />
                <div className="text-3xl font-medium dark:text-white">200</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Middle section */}
      <div className="flex w-full p-4 bg-white shadow-shadow-bg dark:bg-gray-800 gap-x-9 h-2/4 rounded-xl">
        <div className="flex flex-col items-center justify-between w-1/3">
          <PatientChart />
        </div>
        <div className="flex flex-col justify-between w-1/3 p-2 bg-pink-300/20 rounded-xl">
          <div className="flex flex-col gap-y-2">
            <div className="font-medium text-pink-200">การนัดหมายวันนี้</div>
            <div>
              <AppointmentTable appointments={todayAppointments || []} />
            </div>
          </div>
          <div className="font-bold text-pink-200 cursor-pointer hover:text-pink-200/90">
            <Link href={"/d/appointment"}>ดูทั้งหมด</Link>
          </div>
        </div>
        <div className="flex flex-col w-1/3 p-2 bg-pink-300/20 rounded-xl">
          รายละเอียดคนไข้คนถัดไป
          <PatientInformation patients={patientsData} />
        </div>
      </div>
      {/* Bottom section */}
      <div className="flex w-full gap-x-9 h-1/4">
        <div className="flex flex-col w-1/3 p-4 bg-white dark:bg-gray-800 rounded-xl gap-y-2 shadow-shadow-bg dark:shadow-none">
          <div className="font-medium text-darkgray dark:text-gray-300">
            ความพึงพอใจการใช้งานระบบ
          </div>
          <FeedbackChart />
        </div>
        {/* Pending Appointment */}
        <div className="w-1/3 p-4 font-medium bg-white dark:bg-gray-800 rounded-xl shadow-shadow-bg dark:shadow-none text-darkgray dark:text-gray-300">
          <div className="flex justify-between">
            <div>การนัดหมายที่รอยืนยัน</div>
            <Link href={`/d/appointment`} className="font-medium text-pink-200">
              {pendingAppointmentCount}
            </Link>
          </div>
          <div className="h-32 overflow-y-auto">
            <AppointmentTable
              appointments={appointments.filter(
                (appointment) => appointment.appointment_status === "toConfirm"
              )}
            />
          </div>
        </div>
        {/* Calendar */}
        <Link
          className="relative items-center w-1/3 p-4 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-shadow-bg dark:shadow-none hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          href="/d/calendar"
        >
          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between">
              <div className="font-medium text-pink-200">ปฏิทิน</div>
              <div className="font-medium text-pink-200">
                {currentThaiMonth} {currentThaiYear}
              </div>
            </div>
            <Calendar1Icon
              className="absolute w-full h-full inset-16 opacity-10"
              size={24}
              color="#FB6F92"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
