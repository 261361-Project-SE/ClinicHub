"use client";

import {
  validateName,
  validatePhone,
  validateSymptom,
} from "../(utils)/validation";
import BookingDialog from "../components/BookingDialog";
import LineQRDialog from "../components/LineQRDialog";
import { getfilteredAppointment } from "../services/api-p";
import BookingLayout from "./BookingLayout";
import { Calendar } from "@/app/(pages)/p/components/ui/Calendar";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const TIME_START = 9 * 60; // 9 AM
const TIME_END = 16 * 60 + 45;
const TIME_INTERVAL = 15; // 15 minutes

const generateTimes = (start: number, end: number, interval: number) =>
  Array.from({ length: (end - start) / interval + 1 }, (_, i) => {
    const time = start + i * interval;
    return `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
      time % 60
    ).padStart(2, "0")}`;
  });

const BookingPage: React.FC = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [symptom, setSymptom] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [filteredTimes, setFilteredTimes] = useState<string[]>([]);
  const [invalidFields, setInvalidFields] = useState({
    name: false,
    lastname: false,
    phone: false,
    symptom: false,
  });

  const times = generateTimes(TIME_START, TIME_END, TIME_INTERVAL);

  const setAppointmentDate = (time: string) => {
    const newDateTime = new Date(appointmentDateTime || new Date());
    const [year, month, day] = selectedDate.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    newDateTime.setFullYear(year, month - 1, day);
    newDateTime.setHours(hours + 7, minutes);
    setAppointmentDateTime(newDateTime.toISOString());
  };

  useEffect(() => {}, [showBookingDialog]);

  const handleBooking = async () => {
    // ทำ validation และอัพเดตค่า invalidFields
    setInvalidFields((prev) => {
      const updatedFields = {
        name: !validateName(name),
        lastname: !validateName(lastname),
        phone: !validatePhone(phone),
        symptom: !validateSymptom(symptom),
      };

      //เลือกวัน-เวลาครบ ให้เปิด BookingDialog
      if (selectedTime && appointmentDateTime) {
        const appointmentData = {
          appointmentDateTime,
          name,
          lastname,
          phone,
          symptom,
        };
        setShowBookingDialog(true);
      } else {
        console.log("Booking failed due to validation errors.");
      }

      return updatedFields;
    });
  };

  const handleClick = (date: Date) => {
    if (date) {
      date.setDate(date.getDate() + 1);
      const selectedDateString = date.toISOString().split("T")[0];
      if (selectedDate !== selectedDateString) {
        setSelectedDate(selectedDateString);
      }
      date.setDate(date.getDate() - 1);
      setAppointmentDateTime(date.toISOString());
    }
  };

  useEffect(() => {
    if (selectedDate) {
      getfilteredAppointment(selectedDate)
        .then(setFilteredTimes)
        .catch((error) =>
          console.error("Error fetching filtered appointment times:", error)
        );
    }
  }, [selectedDate]);

  // Get today's date at the start of the day
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <BookingLayout>
      <div className="bg-gray-50 rounded-xl shadow-xl md:h-[760px] md:w-[1440px] md:mx-auto md:max-w-screen-xl md:p-6 ">
        <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left ">
          จองการนัดหมาย
        </h1>
        <div className="mt-2 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-6">
          <Calendar
            mode="single"
            selected={
              appointmentDateTime ? new Date(appointmentDateTime) : undefined
            }
            onSelect={(date) => {
              if (date) {
                handleClick(date);
              }
              console.log("Selected date:", date);
            }}
            disabled={(date) => {
              // Disable dates before today
              const checkDate = new Date(date);
              checkDate.setHours(0, 0, 0, 0);
              return checkDate < today;
            }}
            className="rounded-md border shadow-lg"
            modifiers={{
              disabled: (date) => {
                const checkDate = new Date(date);
                checkDate.setHours(0, 0, 0, 0);
                return checkDate < today;
              },
            }}
            modifiersClassNames={{
              disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
            }}
          />
          <div className="w-full md:w-1/2">
            <label className="block text-gray-600 font-medium text-lg md:pl-10">
              เลือกเวลาที่ต้องการจอง:
            </label>
            <div className="mt-4 md:mt-6 max-h-[600px] overflow-y-auto bg-gray-100 rounded-lg p-2 shadow-md">
              {times.map((time) => {
                const isDisabled =
                  selectedDate === "" || filteredTimes.includes(time);
                return (
                  <button
                    key={time}
                    value={time}
                    className={`block w-full text-left px-4 py-3 my-1 rounded-md transition-all 
            ${
              isDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : selectedTime === time
                ? "bg-success text-white shadow-lg"
                : "bg-white hover:bg-green-200 hover:shadow-md"
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
        <LineQRDialog />
      </div>
      <BookingDialog
        isOpen={showBookingDialog}
        onClose={() => {
          setShowBookingDialog(false);
          setSelectedTime(null); // รีเซ็ตเวลาให้เลือกใหม่ได้
        }}
        message="กรุณากรอกข้อมูลด้านล่างเพื่อยืนยันการจองการนัด"
        invalidSymptom={invalidFields.symptom}
        appointment_dateTime={appointmentDateTime}
        symptom={symptom}
        setSymptom={setSymptom}
        name={name}
        lastname={lastname}
        setName={setName}
        setLastname={setLastname}
        phone={phone}
        setPhone={setPhone}
        invalidName={invalidFields.name}
        invalidLastname={invalidFields.lastname}
        invalidPhone={invalidFields.phone}
      />
    </BookingLayout>
  );
};

export default BookingPage;
