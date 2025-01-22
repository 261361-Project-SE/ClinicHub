"use client";

import {
  validateName,
  validatePhone,
  validateSymptom,
} from "../(utils)/validation";
import BookingDialog from "../components/BookingDialog";
import { getfilteredAppointment } from "../services/api-p";
import BookingLayout from "./BookingLayout";
import { Calendar } from "@/app/(pages)/p/components/ui/Calendar";
import { log } from "console";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const BookingPage: React.FC = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidLastname, setInvalidLastname] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [symptom, setSymptom] = useState("");
  const [invalidSymptom, setInvalidSymptom] = useState(false);

  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
    newDateTime.setDate(parseInt(selectedDate.split("-")[2]));
    newDateTime.setMonth(parseInt(selectedDate.split("-")[1]) - 1);
    newDateTime.setFullYear(parseInt(selectedDate.split("-")[0]));
    const hours = parseInt(time.split(":")[0]) + 7;
    const minutes = parseInt(time.split(":")[1]);
    newDateTime.setHours(hours);
    newDateTime.setMinutes(minutes);
    console.log(time.split(":")[0]);
    console.log(time.split(":")[1]);
    console.log(newDateTime);
    console.log(newDateTime.toISOString()); // todo
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

  const [filteredTimes, setFiltertime] = useState<string[]>([]);
  useEffect(() => {
    if (selectedDate) {
      getfilteredAppointment(selectedDate)
        .then((filteredTime: string[]) => {
          setFiltertime(filteredTime);
        })
        .catch((error) => {
          console.error("Error fetching filtered appointment times:", error);
        });
    }
  }, [selectedDate]);
  // useEffect(() => {
  //   console.log(filteredTimes); // จะทำงานเมื่อ filteredTimes ถูกอัปเดตแล้ว
  // }, [filteredTimes]);
  return (
    <BookingLayout>
      <div className="bg-gray-50 rounded-xl shadow-xl md:h-[800px] md:w-[1440px] md:mx-auto md:max-w-screen-xl p-6 md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 text-left md:text-left md:mt-4">
          จองการนัดหมาย
        </h1>
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-6">
          {/* ปฏิทิน */}
          <Calendar
            mode="single"
            selected={
              appointmentDateTime ? new Date(appointmentDateTime) : undefined
            }
            onSelect={(date) => {
              if (date) {
                date.setDate(date.getDate() + 1);
                setSelectedDate(date.toISOString().split("T")[0]);
              }
            }}
            className="rounded-md border shadow-lg"
          />

          {/* เลือกเวลา */}
          <div className="w-full md:w-1/2">
            <label className="block text-gray-600 font-medium text-lg md:pl-10">
              เลือกเวลาที่ต้องการจอง:
            </label>
            <div className="grid grid-cols-3 gap-4 mt-4 md:mt-6">
              {times.map((time) => {
                const isDisabled =
                  selectedDate === "" || filteredTimes.includes(time);
                return (
                  <button
                    key={time}
                    value={time}
                    className={`p-2 rounded-md shadow-xl border border-black min-w-[100px] flex-shrink-0 ${
                      isDisabled
                        ? "bg-gray-300 cursor-not-allowed"
                        : selectedTime === time
                        ? "bg-green-400"
                        : "hover:bg-green-200"
                    }`}
                    onClick={() => {
                      if (!isDisabled) {
                        setSelectedTime(time);
                        setAppointmentDate(time);
                      }
                    }}
                    disabled={isDisabled}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ปุ่มด้านล่าง */}
      <div className="mt-6 flex flex-col md:items-end items-center">
        <div className="flex gap-6">
          <Link href="/">
            <button className="bg-gray-300 text-black hover:opacity-80 shadow-md w-[140px] md:w-[173px] h-[50px] rounded-full">
              กลับหน้าหลัก
            </button>
          </Link>
          <button
            className="bg-pink-200 text-white hover:bg-pink-600 shadow-md w-[140px] md:w-[173px] h-[50px] rounded-full"
            onClick={handleBooking}
          >
            จองการนัด
          </button>
        </div>
      </div>

      {/* Booking Dialog */}
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
    </BookingLayout>
  );
};

export default BookingPage;
