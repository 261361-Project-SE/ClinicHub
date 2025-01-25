"use client";

import AppointmentTable from "@/components/dashboard/AppointmentTable";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { FeedbackChart } from "@/components/dashboard/FeedbackChart";
import { PatientChart } from "@/components/dashboard/PatientChart";
import PatientInformation from "@/components/dashboard/PatientInformation";
import { patientsData } from "@/helper/SampleData";
import { useFetchAppointments } from "@/hooks/useFetchAppointments";
import { currentThaiMonth, currentThaiYear } from "@/lib/variables";
import { Calendar1Icon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const DashboardPage = () => {
  const { appointments, loading, error } = useFetchAppointments();
  const todayAppointments = useMemo(() => {
    return appointments
      ?.filter(
        (appointment) =>
          new Date(appointment.appointment_dateTime).toDateString() ===
          new Date().toDateString()
      )
      .map((appointment) => ({
        ...appointment,
        selectedFilter: "CONFIRMED",
      }));
  }, [appointments]);

  if (loading) {
    return (
      <div className="flex flex-col animate-pulse gap-y-6">
        <div className="flex gap-x-9 w-full min-h-[195px]">
          <div className="w-1/3 h-48 bg-white rounded-xl"></div>
          <div className="w-1/3 h-48 bg-white rounded-xl"></div>
          <div className="w-1/3 h-48 bg-white rounded-xl"></div>
        </div>
        <div className="bg-white p-4 flex gap-x-9 min-h-[400px] w-full rounded-xl">
          <div className="w-1/3 h-full bg-white rounded-xl"></div>
          <div className="w-1/3 h-full bg-white rounded-xl"></div>
          <div className="w-1/3 h-full bg-white rounded-xl"></div>
        </div>
        <div className="flex gap-x-9 w-full min-h-[201px]">
          <div className="w-1/3 h-48 bg-white rounded-xl"></div>
          <div className="w-1/3 h-48 bg-white rounded-xl"></div>
          <div className="w-1/3 h-48 bg-white rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-y-6">
      {/* Top section */}
      <div className="flex gap-x-9 w-full min-h-[195px]">
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
      <div className="bg-white dark:bg-gray-800 p-4 flex gap-x-9 min-h-[400px] w-full rounded-xl">
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
          <div className="font-bold text-pink-200 cursor-pointer hover:text-pink-300">
            <Link href={"/d/appointment"}>ดูทั้งหมด</Link>
          </div>
        </div>
        <div className="flex flex-col w-1/3 p-2 bg-pink-300/20 rounded-xl">
          <div className="font-medium text-pink-200">
            รายละเอียดคนไข้คนถัดไป
          </div>
          <PatientInformation patients={patientsData} />
        </div>
      </div>
      {/* Bottom section */}
      <div className="flex gap-x-9 w-full min-h-[201px]">
        <div className="flex flex-col w-1/3 p-4 bg-white dark:bg-gray-800 rounded-xl gap-y-2 shadow-shadow-bg dark:shadow-none">
          <div className="font-medium text-darkgray dark:text-gray-300">
            ความพึงพอใจการใช้งานระบบ
          </div>
          <FeedbackChart />
        </div>
        {/* Pending Appointment */}
        <div className="w-1/3 p-4 font-medium bg-white dark:bg-gray-800 rounded-xl shadow-shadow-bg dark:shadow-none text-darkgray dark:text-gray-300">
          การนัดหมายที่รอยืนยัน
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
