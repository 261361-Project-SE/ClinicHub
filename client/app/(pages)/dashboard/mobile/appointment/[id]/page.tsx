"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Phone, Edit2, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const appointment = {
  name: "สมหญิง ใจดี",
  age: 50,
  date: "3 ธันวาคม 2567",
  time: "10:30 น.",
  phone: "081-234-5678",
  status: "confirmed",
};

const history = [
  { date: "1 ธันวาคม 2567", time: "11:30 น." },
  { date: "2 ธันวาคม 2567", time: "10:30 น." },
];

const MobileAppointmentDescription = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white rounded-lg">
        <button onClick={() => router.back()} className="text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          รายละเอียดการนัดหมาย
        </h2>
        <div></div>
      </div>

      {/* Patient Info */}
      <Card className="p-4 mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{appointment.name}</h3>
          <Edit2 className="text-pink-500 cursor-pointer" size={20} />
        </div>
        <p className="text-gray-500">อายุ {appointment.age} ปี</p>

        {/* Appointment Date & Time */}
        <div className="flex items-center justify-between p-3 mt-2 bg-gray-100 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">วันที่และเวลานัด</p>
            <p className="text-gray-900">{appointment.date}</p>
            <p className="text-gray-900">{appointment.time}</p>
          </div>
          <Edit2 className="text-pink-500 cursor-pointer" size={20} />
        </div>

        {/* Phone Number */}
        <div className="flex items-center justify-between p-3 mt-2 bg-gray-100 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
            <p className="text-gray-900">{appointment.phone}</p>
          </div>
          <Phone className="text-pink-500 cursor-pointer" size={20} />
        </div>
      </Card>

      {/* Appointment Status */}
      <Card className="p-4 mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">สถานะการนัด</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <p className="text-green-600">ยืนยันแล้ว</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <p className="text-yellow-600">รอยืนยัน</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <p className="text-red-600">ยกเลิกโดยคนไข้</p>
            <span className="text-sm text-red-400">หมายเหตุ</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
            <p className="text-pink-600">ยกเลิกโดยแพทย์</p>
            <span className="text-sm text-pink-400">หมายเหตุ</span>
          </div>
        </div>
      </Card>

      {/* Appointment History */}
      <Card className="p-4 mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">ประวัติการนัด</h3>
          <button className="font-medium text-pink-500">ดูทั้งหมด</button>
        </div>
        {history.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
          >
            <div>
              <p className="text-gray-900">{item.date}</p>
              <p className="text-gray-500">{item.time}</p>
            </div>
            <Edit2 className="text-pink-500 cursor-pointer" size={20} />
          </div>
        ))}
      </Card>
    </div>
  );
};

export default MobileAppointmentDescription;
