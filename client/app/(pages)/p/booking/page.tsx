"use client";

import { validateName, validatePhone } from "../(utils)/validation";
import BookingDialog from "../components/BookingDialog";
import BookingLayout from "./BookingLayout";
import { Calendar } from "@/app/(pages)/p/components/ui/Calendar";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const BookingPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidLastname, setInvalidLastname] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const generateTimes = (start: number, end: number, interval: number) => {
    return Array.from({ length: (end - start) / interval + 1 }, (_, i) => {
      const time = start + i * interval;
      const hours = String(Math.floor(time / 60)).padStart(2, "0");
      const minutes = String(time % 60).padStart(2, "0");
      return `${hours}:${minutes}`;
    });
  };

  const times = generateTimes(9 * 60, 17 * 60, 15);

  const handleValidation = () => {
    setInvalidName(!validateName(name));
    setInvalidLastname(!validateName(lastname));
    setInvalidPhone(!validatePhone(phone));
  };

  if (typeof window !== "undefined") {
    const currentTime = Date.now();
    console.log(currentTime);
  }

  return (
    <BookingLayout>
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        จองการนัดหมาย
      </h1>
      <p className="text-gray-600">เวลาทำการ:</p>
      <div className="mt-4 flex justify-start flex-wrap max-w-7xl mx-auto">
        <label className="block text-gray-600">เลือกเวลาที่ต้องการจอง:</label>
        <div className="mt-2 relative">
          <div className="flex overflow-hidden gap-2 relative w-[440px] md:w-[1280px] pb-4">
            <div
              className="flex gap-2 overflow-x-auto scroll-smooth no-scrollbar"
              style={{ scrollBehavior: "smooth" }}
              onWheel={(e) => {
                e.currentTarget.scrollLeft += e.deltaY > 0 ? 100 : -100;
              }}
            >
              {times.map((time) => (
                <button
                  key={time}
                  value={time}
                  className={`p-2 rounded-md hover:bg-gray-200 bg-white min-w-[100px] flex-shrink-0 ${
                    selectedTime === time ? "bg-yellow-400" : ""
                  }`}
                  onClick={() =>
                    setSelectedTime(selectedTime === time ? null : time)
                  }
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-lg"
      />
      <div className="flex flex-col md:items-end md:justify-end items-center justify-center font-noto h-fit mt-2">
        <div className="flex gap-6 mt-6 md:gap-6 md:mt-6">
          <Link href="/">
            <button className="bg-gray-300 text-black hover:opacity-80 shadow-md w-[140px] md:w-[173px] h-[50px] rounded-[100px] items-center text-center">
              กลับหน้าหลัก
            </button>
          </Link>
          <BookingDialog
            name={name}
            lastname={lastname}
            setName={setName}
            setLastname={setLastname}
            phone={phone}
            setPhone={setPhone}
            invalidName={invalidName}
            invalidLastname={invalidLastname}
            invalidPhone={invalidPhone}
            handleValidation={handleValidation}
          />
        </div>
      </div>
    </BookingLayout>
  );
};

export default BookingPage;
