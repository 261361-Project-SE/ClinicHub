"use client";

import BookingLayout from "./BookingLayout";
import { Calendar } from "@/app/(pages)/p/components/ui/calendar";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const BookingPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const generateTimes = (start: number, end: number, interval: number) => {
    const times = [];
    for (let time = start; time <= end; time += interval) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      times.push(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`
      );
    }
    return times;
  };

  const times = generateTimes(9 * 60, 17 * 60, 15);

  return (
    <BookingLayout>
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        จองการนัดหมาย
      </h1>
      <p className="mt-2 text-gray-600">เวลาทำการ:</p>
      <div className="mt-4">
        <label className="block text-gray-600">เลือกเวลาที่ต้องการจอง:</label>
        <div className="mt-2 relative">
          <div className="flex overflow-hidden gap-2 relative w-[440px] pb-4">
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
                  className="p-2 border rounded-md hover:bg-gray-200 bg-white min-w-[100px] flex-shrink-0"
                  onClick={() => console.log(`Selected time: ${time}`)}
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
        className="rounded-md border"
      />
      <div className="flex flex-col items-center justify-center font-noto h-fit">
        <div className="flex gap-6 mt-6">
          <Link href="/">
            <button className="bg-gray-300 text-black hover:bg-gray-400 shadow-md w-[173px] h-[50px] rounded-xl">
              กลับหน้าหลัก
            </button>
          </Link>
          <button className="bg-pink-500 text-white hover:bg-pink-600 shadow-md w-[173px] rounded-xl">
            จองการนัด
          </button>
        </div>
      </div>
    </BookingLayout>
  );
};

export default BookingPage;
