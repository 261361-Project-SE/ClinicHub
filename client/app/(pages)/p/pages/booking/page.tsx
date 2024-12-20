"use client";

import NavbarInPage from "@/app/(pages)/p/components/navbarinpage";
import { Button } from "@/app/(pages)/p/components/ui/Button";
import { Calendar as CalendarComponent } from "@/app/(pages)/p/components/ui/Calendar";
import React, { useState } from "react";

const BookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => setSelectedDate(date);

  const handleBooking = () => {
    if (selectedDate) {
      console.log("Booking for date:", selectedDate);
    } else {
      console.warn("No date selected for booking.");
    }
  };

  return (
    <div>
      <NavbarInPage />
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        จองการนัดหมาย
      </h1>
      <p className="mt-2 text-gray-600">เวลาทำการ:</p>
      <div className="flex flex-col items-center justify-center font-noto h-fit">
        <CalendarComponent onDayClick={handleDateSelect} />
        <div className="flex gap-4 mt-6">
          <Button
            label="กลับหน้าหลัก"
            className="bg-gray-300 text-black hover:bg-gray-400"
          />
          <Button
            label="จองการนัด"
            className="bg-pink-500 text-white hover:bg-pink-600"
            onClick={handleBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
