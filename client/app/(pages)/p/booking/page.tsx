"use client";

import {
  validateName,
  validatePhone,
  validateSymptom,
} from "../(utils)/validation";
import BookingDialog from "../components/BookingDialog";
import BookingLayout from "./BookingLayout";
import { Calendar } from "@/app/(pages)/p/components/ui/Calendar";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const BookingPage: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidLastname, setInvalidLastname] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [symptom, setSymptom] = useState("");
  const [invalidSymptom, setInvalidSymptom] = useState(false);
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const TIME_START = 9 * 60; // 9 AM
  const TIME_END = 17 * 60; // 5 PM
  const TIME_INTERVAL = 15; // 15 minutes

  const generateTimes = (start: number, end: number, interval: number) =>
    Array.from({ length: (end - start) / interval + 1 }, (_, i) => {
      const time = start + i * interval;
      return `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
        time % 60
      ).padStart(2, "0")}`;
    });

  const times = generateTimes(TIME_START, TIME_END, TIME_INTERVAL);

  const handleValidation = () => {
    setInvalidName(!validateName(name));
    setInvalidLastname(!validateName(lastname));
    setInvalidPhone(!validatePhone(phone));
    setInvalidSymptom(!validateSymptom(symptom));
  };

  const setAppointmentDate = (time: string) => {
    const newDateTime = new Date(appointmentDateTime || new Date());
    newDateTime.setHours(
      parseInt(time.split(":")[0]),
      parseInt(time.split(":")[1])
    );
    setAppointmentDateTime(newDateTime.toISOString());
  };

  const handleBooking = () => {
    handleValidation();
    if (
      !invalidName &&
      !invalidLastname &&
      !invalidPhone &&
      !invalidSymptom &&
      selectedTime &&
      appointmentDateTime
    ) {
      const appointmentData = {
        appointmentDateTime,
        name,
        lastname,
        phone,
        symptom,
      };
      console.log("Booking initiated", appointmentData);
      setShowBookingDialog(true);
    }
  };

  useEffect(() => {
    // Client-side logic here
  }, []);

  return (
    <BookingLayout>
      <div className="bg-gray-50 rounded-xl shadow-xl md:h-[800px] md:w-[1440px] md:mx-auto md:max-w-screen-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center md:text-end md:mt-4 md:mr-20">
          จองการนัดหมาย
        </h1>

        <div className="mt-4 flex justify-start flex-wrap max-w-7xl mx-auto">
          <label className="block text-gray-600 font-noto font-medium text-lg md:pl-10">
            เลือกเวลาที่ต้องการจอง:
          </label>

          <div className="flex justify-center overflow-hidden gap-2 relative w-[400px] md:w-[1200px] pb-4 md:max-w-screen-xl md:pl-10">
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
                  className={`p-2 rounded-md shadow-xl border border-black bg-white-200 hover:bg-green-200 min-w-[100px] flex-shrink-0 ${
                    selectedTime === time ? "bg-green-400 shadow-xl" : ""
                  }`}
                  onClick={() => {
                    setSelectedTime(time);
                    setAppointmentDate(time);
                  }}
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

          <Calendar
            mode="single"
            selected={
              appointmentDateTime ? new Date(appointmentDateTime) : undefined
            }
            onSelect={(date) => {
              if (date && selectedTime) {
                const selectedDateTime = new Date(date);
                selectedDateTime.setHours(
                  parseInt(selectedTime.split(":")[0]),
                  parseInt(selectedTime.split(":")[1])
                );
                setAppointmentDateTime(selectedDateTime.toISOString());
              }
            }}
            className="rounded-md border shadow-lg"
          />
        </div>
      </div>
      <div className=" md:mt-4">
        <div className="flex flex-col md:items-end md:justify-end items-center justify-center font-noto h-fit">
          <div className="flex gap-6 mt-6 md:gap-6 md:mt-0">
            <Link href="/">
              <button className="bg-gray-300 text-black hover:opacity-80 shadow-md w-[140px] md:w-[173px] h-[50px] rounded-[100px] items-center text-center">
                กลับหน้าหลัก
              </button>
            </Link>
            <button
              className="bg-pink-200 text-white hover:bg-pink-600 shadow-md w-[140px] md:w-[173px] h-[50px] rounded-[100px] items-center text-center"
              onClick={handleBooking}
            >
              จองการนัด
            </button>
            <BookingDialog
              isOpen={showBookingDialog}
              onClose={() => setShowBookingDialog(false)}
              message="กรุณากรอกข้อมูลด้านล่างเพื่อยืนยันการจองการนัด"
              invalidSymptom={invalidSymptom}
              appointment_dateTime={appointmentDateTime}
              symptom={symptom}
              setSymptom={setSymptom}
              name={name}
              lastname={lastname}
              setName={setName}
              setLastname={setLastname}
              phone={phone}
              setPhone={setPhone}
              invalidName={invalidName}
              invalidLastname={invalidLastname}
              invalidPhone={invalidPhone}
            />
          </div>
        </div>
      </div>
    </BookingLayout>
  );
};

export default BookingPage;
