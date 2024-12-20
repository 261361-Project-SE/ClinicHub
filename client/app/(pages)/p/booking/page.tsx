"use client";

import BookingLayout from "./BookingLayout";
import { Calendar } from "@/app/(pages)/p/components/ui/Calendar";
import React, { useState } from "react";

const BookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onDateSelect = (date: Date) => setSelectedDate(date);

  const handleBooking = () => {
    if (selectedDate) {
      console.log("Booking for date:", selectedDate);
    } else {
      console.warn("No date selected for booking.");
    }
  };

  return (
    <BookingLayout>
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        จองการนัดหมาย
      </h1>
      <p className="mt-2 text-gray-600">เวลาทำการ:</p>
      <Calendar onDayClick={onDateSelect} />
      <div className="flex flex-col items-center justify-center font-noto h-fit">
        <div className="flex gap-6 mt-6 ">
          <button className="bg-gray-300 text-black hover:bg-gray-400 shadow-md w-[173px] h-[50px] rounded-lg">
            กลับหน้าหลัก
          </button>
          <button
            className="bg-pink-500 text-white hover:bg-pink-600 shadow-md w-[173px] rounded-lg"
            onClick={handleBooking}
          >
            จองการนัด
          </button>
        </div>
      </div>
    </BookingLayout>
  );
};

export default BookingPage;
