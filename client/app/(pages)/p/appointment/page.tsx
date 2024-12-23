"use client";

import { validateName, validatePhone } from "../(utils)/validation";
import AppointmentDialog from "../components/AppointmentDialog";
import AppointmentDialogMobile from "../components/AppointmentDialogmobile";
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
        className="w-[150px] h-[50px] bg-pink-200 text-white rounded-full hover:scale-105 transition-transform flex items-center justify-center"
      >
        จองการนัด
      </Link>
      <AppointmentDialogMobile
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        invalidName={invalidName}
        invalidPhone={invalidPhone}
        handleValidation={handleValidation}
      />
    </div>
    <div className="bg-white shadow-md p-6 mb-4 h-[600px] rounded-2xl overflow-hidden">
      <div className="relative h-full">
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500">
          {["/1mobile.png", "/2mobile.png", "/3mobile.png"].map(
            (src, index) => (
              <img
                key={src}
                src={src}
                alt={`Slide ${index + 1} mobile`}
                className={`h-full w-full object-cover rounded-2xl ${
                  index > 0
                    ? "absolute inset-0 opacity-0 transition-opacity duration-500 delay-[500ms]"
                    : ""
                }`}
              />
            )
          )}
        </div>
      </div>
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
          <div className="relative h-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {["/1.png", "/2.png"].map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={`h-full w-full object-cover rounded-2xl transition-opacity duration-100 ${
                    index > 0 ? "delay-[500ms]" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-6">
          <Link href="/p/booking">
            <button
              className={`${buttonClasses} w-full sm:w-[350px] md:w-[400px] lg:w-[480px] h-[200px] sm:h-[225px] md:h-[225px] lg:h-[255px] bg-pink-400 text-white ${commonButtonStyles}`}
            >
              <CalendarDays
                className="icon-size w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24"
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
