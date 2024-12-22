"use client";

import AppointmentTable from "@/components/dashboard/AppointmentTable";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { FeedbackChart } from "@/components/dashboard/FeedbackChart";
import { PatientChart } from "@/components/dashboard/PatientChart";
import PatientInformation from "@/components/dashboard/PatientInformation";
// mock data
import { appointmentsData, patientsData } from "@/helper/SampleData";
import { UserIcon } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-y-6">
      {/* Top section */}
      <div className="flex gap-x-9 w-full h-[195px]">
        <DashboardCard
          title="การนัดหมายวันนี้"
          count="5"
          date="4 ธันวาคม 2567"
        />
        <DashboardCard
          title="การนัดหมายที่รอยืนยัน"
          count="5"
          date="4 ธันวาคม 2567"
        />
        <div className="w-1/3 p-4 bg-white rounded-xl shadow-shadow-bg">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <div className="text-darkgray">คนไข้ทั้งหมด</div>
              <div className="flex items-center gap-x-2">
                <UserIcon className="mt-1" color="#FB6F92" size={30} />
                <div className="text-3xl font-medium">200</div>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="text-darkgray">แพทย์ทั้งหมด</div>
              <div className="flex items-center gap-x-2">
                <UserIcon className="mt-1" color="#FB6F92" size={30} />
                <div className="text-3xl font-medium">200</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Middle section */}
      <div className="bg-white p-4 flex gap-x-9 h-[400px] w-full rounded-xl">
        <div className="flex flex-col items-center justify-between w-1/3">
          <PatientChart />
        </div>
        <div className="flex flex-col justify-between w-1/3 p-2 bg-pink-300/20 rounded-xl">
          <div className="flex flex-col gap-y-2">
            <div className="font-medium text-pink-200">การนัดหมายวันนี้</div>
            <div>
              <AppointmentTable appointments={appointmentsData} />
            </div>
          </div>
          <div className="font-bold text-pink-200 cursor-pointer">
            <Link href={"/d/appointment"}>ดูทั้งหมด</Link>
          </div>
        </div>
        <div className="flex flex-col justify-between w-1/3 p-2 bg-pink-300/20 rounded-xl">
          <div className="font-medium text-pink-200">
            รายละเอียดคนไข้คนถัดไป
          </div>
          <PatientInformation patients={patientsData} />
        </div>
      </div>
      {/* Bottom section */}
      <div className="flex gap-x-9 w-full h-[201px]">
        <div className="flex flex-col w-1/3 p-4 bg-white rounded-xl gap-y-2 shadow-shadow-bg">
          <div className="font-medium text-darkgray">
            ความพึงพอใจการใช้งานระบบ
          </div>
          <FeedbackChart />
        </div>
        {/* Pending Appointment */}
        <div className="w-1/3 p-4 font-medium bg-white rounded-xl shadow-shadow-bg text-darkgray">
          การนัดหมายที่รอยืนยัน
        </div>
        {/* Calendar */}
        <div className="items-center w-1/3 p-4 overflow-hidden bg-white rounded-xl shadow-shadow-bg">
          <Link href="/d/calendar">
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between">
                <div className="font-medium text-pink-200">ปฏิทิน</div>
                <div className="font-medium text-pink-200">ธันวาคม 2567</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
