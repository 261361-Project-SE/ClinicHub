"use client";

import { validateName, validatePhone } from "../(utils)/validation";
import AppointmentDialog from "../components/AppointmentDialog";
import AppointmentDialogmobile from "../components/AppointmentDialogmobile";
import { CalendarDays, MessagesSquare } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const MobileBookingPage: React.FC<{
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  invalidName: boolean;
  invalidPhone: boolean;
  handleValidation: () => void;
}> = ({
  name,
  setName,
  phone,
  setPhone,
  invalidName,
  invalidPhone,
  handleValidation,
}) => (
  <div className="mx-auto w-full max-w-6xl mb-24 font-noto font-medium text-lg text-center">
    <div className="flex items-center justify-center gap-10">
      <Link
        href="/p/booking"
        className="w-[150px] h-[50px] bg-pink-400 text-white rounded-lg hover:scale-105 transition-transform flex items-center justify-center"
      >
        จองการนัด
      </Link>

      <AppointmentDialogmobile
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        invalidName={invalidName}
        invalidPhone={invalidPhone}
        handleValidation={handleValidation}
      />
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 h-[600px]">
      <h2 className="text-gray-700 text-2xl font-medium mb-2">
        คู่มือ รายละเอียดการจอง
      </h2>
      <p className="text-gray-500 text-base">
        กรุณาอ่านรายละเอียดและข้อกำหนดในการจอง
      </p>
    </div>
  </div>
);

const BookingPage: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);

  const handleValidation = () => {
    setInvalidName(!validateName(name));
    setInvalidPhone(!validatePhone(phone));
  };

  const buttonClasses =
    "flex items-center justify-center gap-4 hover:shadow-xl hover:scale-[1.05] transition-all duration-300";
  const commonButtonStyles = "rounded-2xl p-6";

  return (
    <div>
      {/* Mobile View */}
      <div className="md:hidden w-full max-w-[600px] mx-auto">
        <MobileBookingPage
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          invalidName={invalidName}
          invalidPhone={invalidPhone}
          handleValidation={handleValidation}
        />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block container mx-auto justify-center items-center px-4 py-2">
        <div className="bg-white rounded-2xl p-6 lg:p-8 mb-5 shadow-md h-[300px] sm:h-[350px] md:h-[350px] lg:h-[400px] w-full">
          <h2 className="text-gray-700 text-center text-2xl font-medium font-noto mb-4">
            คู่มือ รายละเอียดการจอง
          </h2>
          <p className="text-gray-500 text-center text-base font-noto">
            กรุณาอ่านรายละเอียดและข้อกำหนดในการจอง
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-6">
          <Link href="/p/booking">
            <button
              className={`${buttonClasses} w-full sm:w-[350px] md:w-[400px] lg:w-[480px] h-[200px] sm:h-[225px] md:h-[225px] lg:h-[255px] bg-pink-400 text-white ${commonButtonStyles}  `}
            >
              <CalendarDays
                className="icon-size w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 "
                strokeWidth={2}
              />
              <span className="text-3xl sm:text-3xl md:text-4xl font-noto">
                จองการนัด
              </span>
            </button>
          </Link>

          <AppointmentDialog
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            invalidName={invalidName}
            invalidPhone={invalidPhone}
            handleValidation={handleValidation}
          />

          <button
            className={`${buttonClasses} flex flex-col items-center justify-center w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[200px] sm:h-[225px] md:h-[225px] lg:h-[255px] bg-green-300 text-white rounded-2xl transition-transform duration-200`}
          >
            <MessagesSquare className="icon-size w-24 h-24" strokeWidth={2} />
            <span className="text-xl font-noto pt-4">ประเมินความพึงพอใจ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
