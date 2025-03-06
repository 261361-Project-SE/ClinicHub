"use client";

import { validateName, validatePhone } from "../(utils)/validation";
import AppointmentDialog from "../components/AppointmentDialog";
import ImageSlider from "../components/ImageSlider";
import LineQRDialog from "../components/LineQRDialog";
import MobileBookingPage from "../components/mobileBookingPage/MobileBookingPage";
import { CalendarDays, MessagesSquare } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const BookingPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);

  const handleValidation = () => {
    setInvalidName(!validateName(`${firstName} ${lastName}`));
    setInvalidPhone(!validatePhone(phone));
  };

  const buttonClasses =
    "flex items-center justify-center gap-4 hover:shadow-xl hover:scale-[1.05] transition-all duration-300";
  const commonButtonStyles = "rounded-2xl p-6";

  const images = ["/1.png", "/2.png"];

  return (
    <div>
      {/* Mobile View */}
      <div className="md:hidden w-full max-w-[600px] mx-auto">
        <MobileBookingPage
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phone={phone}
          setPhone={setPhone}
          handleValidation={handleValidation}
        />
      </div>

      {/* Tablet View */}
      <div className="hidden sm:block md:hidden container mx-auto justify-center items-center px-4 py-2">
        <div className="bg-white rounded-2xl p-6 lg:p-8 mb-5 shadow-md h-[300px] sm:h-[350px] w-full">
          <ImageSlider images={images} />
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <Link href="/p/booking">
            <button
              className={`${buttonClasses} w-full sm:w-[350px] h-[200px] sm:h-[225px] bg-pink-400 text-white ${commonButtonStyles}`}
            >
              <CalendarDays
                className="icon-size w-20 h-20 sm:w-24 sm:h-24"
                strokeWidth={2}
              />
              <span className=" text-4xl sm:text-3xl font-noto">จองการนัด</span>
            </button>
          </Link>

          <AppointmentDialog
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phone={phone}
            setPhone={setPhone}
            handleValidation={handleValidation}
          />

          <Link href="/p/feedback">
            <button
              className={`${buttonClasses} flex flex-col items-center justify-center w-full sm:w-[300px] h-[200px] sm:h-[225px] bg-green-300 text-white rounded-2xl transition-transform duration-200`}
            >
              <MessagesSquare className="icon-size w-24 h-24" strokeWidth={2} />
              <span className="text-xl font-noto pt-4">ประเมินความพึงพอใจ</span>
            </button>
          </Link>
        </div>
      </div>

      {/* iPad and Desktop Views */}
      <div className="hidden md:block container mx-auto justify-center items-center px-4 py-2">
        <div className="bg-white  mb-5 shadow-md  sm:h-[350px] md:h-[350px] lg:h-[400px] w-full h-full">
          <ImageSlider images={images} />
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
              <span className="mt-4 text-4xl font-medium">จองการนัด</span>
            </button>
          </Link>

          <AppointmentDialog
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            phone={phone}
            setPhone={setPhone}
            handleValidation={handleValidation}
          />

          <Link href="/p/feedback">
            <button
              className={`${buttonClasses} flex flex-col items-center justify-center w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[200px] sm:h-[225px] md:h-[225px] lg:h-[255px] bg-green-300 text-white rounded-2xl transition-transform duration-200`}
            >
              <MessagesSquare className="icon-size w-24 h-24" strokeWidth={2} />
              <span className="mt-4 text-4xl font-medium">
                ประเมินความพึงพอใจ
              </span>
            </button>
          </Link>
        </div>
      </div>
      <LineQRDialog />
    </div>
  );
};

export default BookingPage;
