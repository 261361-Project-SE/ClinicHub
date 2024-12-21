"use client";

import BookingLayout from "./BookingLayout";
import { Calendar } from "@/app/(pages)/p/components/ui/calendar";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const BookingPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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

  const handleBooking = async () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }

    const name = prompt("Enter your name:");
    const phoneNumber = prompt("Enter your phone number:");

    if (!name || !phoneNumber) {
      alert("Name and phone number are required.");
      return;
    }

    const bookingDetails = {
      date,
      timeSlot: selectedTime,
      name,
      phoneNumber,
    };

    try {
      const response = await fetch("/patient/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        alert("Booking successful!");
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <BookingLayout>
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        จองการนัดหมาย
      </h1>
      <p className=" text-gray-600">เวลาทำการ:</p>
      <div className="mt-4 flex justify-start flex-wrap max-w-7xl mx-auto">
        <label className="block text-gray-600">เลือกเวลาที่ต้องการจอง:</label>
        <div className="mt-2 relative ">
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
                    selectedTime === time ? "bg-lightgray" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
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
            <button className="bg-gray-300 text-black hover:bg-gray-400 shadow-md w-[140px] md:w-[173px] h-[50px] rounded-[100px] items-center text-center">
              กลับหน้าหลัก
            </button>
          </Link>
          <button
            className="bg-pink-200 text-white hover:bg-pink-600 shadow-md w-[140px] md:w-[173px] h-[50px] rounded-[100px] items-center text-center"
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
