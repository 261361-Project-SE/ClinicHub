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
import Link from "next/link";
import React, { useState, useCallback } from "react";

const BookingPage: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentDateTime, setAppointmentDateTime] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidLastname, setInvalidLastname] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [symptom, setSymptom] = useState("");
  const [invalidSymptom, setInvalidSymptom] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const TIME_START = 9 * 60;
  const TIME_END = 17 * 60;
  const TIME_INTERVAL = 15;

  const generateTimes = (start: number, end: number, interval: number) =>
    Array.from({ length: (end - start) / interval + 1 }, (_, i) => {
      const time = start + i * interval;
      return `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
        time % 60
      ).padStart(2, "0")}`;
    });

  const times = generateTimes(TIME_START, TIME_END, TIME_INTERVAL);
  // console.log(appointmentDateTime);
  // console.log(getfilteredAppointment(appointmentDateTime));

  const handleValidation = () => {
    const isNameValid = validateName(name);
    const isLastNameValid = validateName(lastname);
    const isPhoneValid = validatePhone(phone);
    const isSymptomValid = validateSymptom(symptom);

    setInvalidName(!isNameValid);
    setInvalidLastname(!isLastNameValid);
    setInvalidPhone(!isPhoneValid);
    setInvalidSymptom(!isSymptomValid);

    return isNameValid && isLastNameValid && isPhoneValid && isSymptomValid;
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

  const [fillertime, setFillertime] = useState<string[]>([]);

  useEffect(() => {
    if (appointmentDateTime) {
      getfilteredAppointment(appointmentDateTime)
        .then((filteredTime: string[]) => {
          setFillertime(filteredTime);
        })
        .catch((error) => {
          console.error("Error fetching filtered appointment times:", error);
        });
    }
  }, [appointmentDateTime]);

  useEffect(() => {
    console.log(fillertime); // จะทำงานเมื่อ fillertime ถูกอัปเดตแล้ว
  }, [fillertime]);

  console.log(getfilteredAppointment(appointmentDateTime));


  const resetBookingState = () => {
    setSelectedTime(null);
    setAppointmentDateTime("");
    setName("");
    setLastname("");
    setPhone("");
    setSymptom("");
    setInvalidName(false);
    setInvalidLastname(false);
    setInvalidPhone(false);
    setInvalidSymptom(false);
    setShowBookingDialog(false);
  };

  return (
    <BookingLayout>
      <div className="bg-gray-50 rounded-xl shadow-xl md:h-[800px] md:w-[1440px] md:mx-auto md:max-w-screen-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center md:text-end md:mt-4 md:mr-20">
          จองการนัดหมาย
        </h1>

        <div className="flex justify-start flex-wrap max-w-7xl mx-auto">
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
              {times.map((time) => {
                // ตรวจสอบว่าเวลานั้นอยู่ใน fillertime หรือไม่
                const isDisabled = fillertime.includes(time);

                return (
                  <button
                    key={time}
                    value={time}
                    className={`p-2 rounded-md shadow-xl border border-black bg-white-200 hover:bg-green-200 min-w-[100px] flex-shrink-0 ${
                      selectedTime === time ? "bg-green-400 shadow-xl" : ""
                    } ${isDisabled ? "bg-gray-300 cursor-not-allowed" : ""}`}
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

          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          <div className="flex justify-center overflow-hidden gap-2 relative w-[400px] md:w-[1200px] pb-4 md:max-w-screen-xl md:pl-10">
            <Calendar
              mode="single"
              selected={
                appointmentDateTime ? new Date(appointmentDateTime) : undefined
              }
              onSelect={(date) => {
                if (date) {
                  const selectedDateTime = new Date(date);
                  if (selectedTime) {
                    selectedDateTime.setHours(
                      parseInt(selectedTime.split(":")[0]),
                      parseInt(selectedTime.split(":")[1])
                    );
                  }
                  setAppointmentDateTime(selectedDateTime.toISOString());
                }
              }}
              className="rounded-md border shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="md:mt-4">
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
              onClose={handleCloseDialog}
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
              onConfirm={handleConfirmBooking}
            />
          </div>
        </div>
      </div>
    </BookingLayout>
  );
};

export default BookingPage;
