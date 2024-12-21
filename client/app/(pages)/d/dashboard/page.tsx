"use client";

import AppointmentCard from "@/components/dashboard/AppointmentCard";
import AppointmentTable from "@/components/dashboard/AppointmentTable";
import PatientGraph from "@/components/dashboard/PatientGraph";
// mock data
import { appointmentsData } from "@/helper/SampleData";
import { FrownIcon, MehIcon, SmileIcon, UserIcon } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-y-6">
      {/* Top section */}
      <div className="flex gap-x-9 w-full h-[195px]">
        <AppointmentCard
          title="การนัดหมายวันนี้"
          count="5"
          date="4 ธันวาคม 2567"
        />
        <AppointmentCard
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
          <div className="font-medium text-darkgray">
            สรุปจำนวนคนไข้ ธันวาคม 2567
          </div>
          <div>
            <PatientGraph />
          </div>
          <div>label</div>
        </div>
        <div className="flex flex-col justify-between w-1/3 p-2 bg-pink-300/20 rounded-xl">
          <div className="flex flex-col gap-y-2">
            <div className="font-medium text-pink-200">การนัดหมายวันนี้</div>
            <div>
              <AppointmentTable appointments={appointmentsData} />
            </div>
          </div>
          <div className="font-bold text-pink-200 cursor-pointer">
            ดูทั้งหมด
          </div>
        </div>
        <div className="flex flex-col justify-between w-1/3 p-2 bg-pink-300/20 rounded-xl">
          <div className="flex flex-col gap-y-2">
            <div className="font-medium text-pink-200">
              รายละเอียดคนไข้คนถัดไป
            </div>
            <div>name</div>
            <div>dob</div>
            <div>appointment</div>
            <div>history</div>
            <div>tel</div>
          </div>
          <div className="font-bold text-pink-200 cursor-pointer">
            ประวัติการจ่ายยา
          </div>
        </div>
      </div>
      {/* Bottom section */}
      <div className="flex gap-x-9 w-full h-[201px]">
        <div className="w-1/3 p-4 bg-white rounded-xl gap-y-2 flex flex-col shadow-shadow-bg">
          <div className="text-darkgray font-medium">ความพึงพอใจการใช้งาน</div>
          <SmileIcon size={36} fill="#98C99F" />
          <MehIcon size={36} fill="#FFBC41" />
          <FrownIcon size={36} fill="#E57373" />
        </div>
        {/* Pending Appointment */}
        <div className="w-1/3 p-4 bg-white font-medium rounded-xl shadow-shadow-bg text-darkgray">
          การนัดหมายที่รอยืนยัน
        </div>
        {/* Calendar */}
        <div className="w-1/3 p-4 bg-white rounded-xl shadow-shadow-bg">
          <div className="flex justify-between">
            <div className="font-medium text-pink-200">ปฏิทิน</div>
            <div className="font-medium text-pink-200">ธันวาคม 2567</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
