"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { CalendarDays, ClipboardCheck, MessagesSquare } from "lucide-react";
import React, { useState } from "react";

const BookingPage: React.FC = () => {
  // Move useState hooks inside the component body
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);

  const handleValidation = () => {
    let isValid = true;

    // Validate name
    if (!/^[\u0E00-\u0E7F\s]+$/.test(name) || name.trim() === "") {
      setInvalidName(true);
      isValid = false;
    } else {
      setInvalidName(false);
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      setInvalidPhone(true);
      isValid = false;
    } else {
      setInvalidPhone(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 hidden md:block">
      <div className="bg-white rounded-2xl p-6 lg:p-8 mb-5 shadow-md h-[300px] lg:h-[400px] w-full">
        <h2 className="text-gray-700 text-center text-2xl font-medium font-noto mb-4">
          คู่มือ รายละเอียดการจอง
        </h2>
        <p className="text-gray-500 text-center text-base font-noto">
          กรุณาอ่านรายละเอียดและข้อกำหนดในการจอง
        </p>
      </div>
      <div className="flex flex-row items-start justify-between gap-6">
        <button
          className={`flex ${
            true ? "items-center" : "flex-col items-center"
          } gap-4 hover:shadow-xl hover:scale-[1.05] w-full md:w-[400px] lg:w-[480px] h-[200px] md:h-[225px] lg:h-[255px] bg-pink-400 text-white p-6 rounded-2xl shadow-md transition-all duration-300`}
        >
          <CalendarDays className="icon-size w-24 h-24" strokeWidth={2} />
          <span className="text-4xl font-noto">จองการนัด</span>
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center justify-center w-full md:w-[400px] lg:w-[480px] h-[200px] md:h-[225px] lg:h-[255px] bg-amber-400 text-white hover:shadow-xl hover:scale-[1.05] rounded-lg transition-transform duration-200">
              <div className="flex flex-row items-center">
                <ClipboardCheck
                  className="icon-size w-24 h-24"
                  strokeWidth={2}
                />
                <span className="mt-4 text-4xl font-medium">
                  ตรวจสอบนัดหมาย
                </span>
              </div>
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
                className={`border rounded-md p-2 ${
                  invalidName ? "border-red-500" : ""
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {invalidName && (
                <span className="text-red-500 text-sm">
                  กรุณากรอกเป็นภาษาไทย
                </span>
              )}
              <input
                type="tel"
                placeholder="เบอร์โทรศัพท์"
                className={`border rounded-md p-2 ${
                  invalidPhone ? "border-red-500" : ""
                }`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {invalidPhone && (
                <span className="text-red-500 text-sm">
                  กรุณากรอกเป็นตัวเลขเท่านั้น
                </span>
              )}
              <button
                className="bg-pink-200 text-xl text-white rounded-lg p-2 hover:bg-pink-600 transition duration-200 w-[100px] ml-auto font-noto text-center font-normal"
                onClick={handleValidation}
              >
                ตรวจสอบ
              </button>
            </div>
          </DialogContent>
        </Dialog>

        <button
          className={`flex items-center flex-col justify-center ${"w-full md:w-[200px] lg:w-[250px]"} ${"h-[200px] md:h-[225px] lg:h-[255px]"} ${"bg-green-1000 text-white"} hover:shadow-xl hover:scale-[1.05] rounded-lg transition-transform duration-200`}
        >
          <MessagesSquare className="icon-size w-24 h-24" strokeWidth={2} />
          <span className="text-xl font-noto pt-4">ประเมินความพึงพอใจ</span>
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
