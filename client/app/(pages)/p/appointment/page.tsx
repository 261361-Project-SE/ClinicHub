"use client";

import { validateName, validatePhone } from "../(utils)/validation";
import AppointmentDialog from "../components/AppointmentDialog";
import AppointmentDialogmobile from "../components/AppointmentDialogmobile";
import { CalendarDays, MessagesSquare } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const changeSlide = (direction: number) => {
    const slides = document.querySelectorAll(
      ".absolute img"
    ) as NodeListOf<HTMLElement>;
    slides[currentIndex].style.opacity = "0";
    const newIndex = (currentIndex + direction + slides.length) % slides.length;
    setCurrentIndex(newIndex);
    slides[newIndex].style.opacity = "1";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);
  return (
    <div className="mx-auto w-full max-w-6xl mb-24 font-noto font-medium text-lg text-center">
      <div className="flex items-center justify-center gap-10">
        <Link
          href="/p/booking"
          className="w-[150px] h-[50px] bg-pink-200 text-white rounded-full hover:scale-105 transition-transform flex items-center justify-center"
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
      <div className=" shadow-md p-6 mb-4 h-[600px]">
        <div className="relative h-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {["/1mobile.png", "/2mobile.png", "/3mobile.png"].map(
              (src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Mobile Slide ${index + 1}`}
                  className={`h-full w-full object-cover transition-opacity duration-100`}
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    position: "absolute",
                    transition: "opacity 1s ease-in-out",
                  }}
                />
              )
            )}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              onClick={() => changeSlide(-1)}
            >
              &lt;
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              onClick={() => changeSlide(1)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const BookingPage: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleValidation = () => {
    setInvalidName(!validateName(name));
    setInvalidPhone(!validatePhone(phone));
  };

  const buttonClasses =
    "flex items-center justify-center gap-4 hover:shadow-xl hover:scale-[1.05] transition-all duration-300";
  const commonButtonStyles = "rounded-2xl p-6";

  const changeSlide = (direction: number) => {
    const slides = document.querySelectorAll(
      ".absolute img"
    ) as NodeListOf<HTMLElement>;
    slides[currentIndex].style.opacity = "0";
    const newIndex = (currentIndex + direction + slides.length) % slides.length;
    setCurrentIndex(newIndex);
    slides[newIndex].style.opacity = "1";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

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

      {/* Tablet View */}
      <div className="hidden sm:block md:hidden container mx-auto justify-center items-center px-4 py-2">
        <div className="bg-white rounded-2xl p-6 lg:p-8 mb-5 shadow-md h-[300px] sm:h-[350px] w-full">
          <div className="relative h-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {["/1.png", "/2.png"].map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={`h-full w-full object-cover rounded-2xl transition-opacity duration-100`}
                  style={{
                    animation: `fade 2s ease-in-out ${index * 2}s infinite`,
                    opacity: index === 0 ? 1 : 0,
                  }}
                />
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes fade {
              0% {
                opacity: 0;
              }
              10% {
                opacity: 1;
              }
              90% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
          `}</style>
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
              <span className="text-3xl sm:text-3xl font-noto">จองการนัด</span>
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

          <button
            className={`${buttonClasses} flex flex-col items-center justify-center w-full sm:w-[300px] h-[200px] sm:h-[225px] bg-green-300 text-white rounded-2xl transition-transform duration-200`}
          >
            <MessagesSquare className="icon-size w-24 h-24" strokeWidth={2} />
            <span className="text-xl font-noto pt-4">ประเมินความพึงพอใจ</span>
          </button>
        </div>
      </div>

      {/* iPad View */}
      <div className="hidden md:block lg:hidden container mx-auto justify-center items-center px-4 py-2">
        <div className="bg-white rounded-2xl p-6 lg:p-8 mb-5 shadow-md h-[300px] sm:h-[350px] md:h-[350px] lg:h-[400px] w-full">
          <div className="relative h-full overflow-hidden">
            {["/1.png", "/2.png"].map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Slide ${index + 1}`}
                className={`h-full w-full object-cover absolute transition-opacity duration-1000`}
                style={{
                  opacity: index === 0 ? 1 : 0,
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-6">
          <Link href="/p/booking">
            <button
              className={`${buttonClasses} w-full sm:w-[350px] md:w-[400px] h-[200px] sm:h-[225px] md:h-[225px] bg-pink-400 text-white ${commonButtonStyles}`}
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
              <span className="text-xl font-noto pt-4">ประเมินความพึงพอใจ</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block container mx-auto justify-center items-center px-4 py-2">
        <div className="bg-white rounded-2xl p-6 lg:p-8 mb-5 shadow-md h-[300px] sm:h-[350px] md:h-[350px] lg:h-[400px] w-full">
          <div className="relative h-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {["/1.png", "/2.png"].map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={`h-full w-full object-cover transition-opacity duration-100`}
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    position: "absolute",
                    transition: "opacity 1s ease-in-out",
                  }}
                />
              ))}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                onClick={() => changeSlide(-1)}
              >
                &lt;
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                onClick={() => changeSlide(1)}
              >
                &gt;
              </button>
              <script>
                {`
                  let currentIndex = 0;
                  const slides = document.querySelectorAll('.absolute img');
                  const changeSlide = (direction) => {
                    slides[currentIndex].style.opacity = 0;
                    currentIndex = (currentIndex + direction + slides.length) % slides.length;
                    slides[currentIndex].style.opacity = 1;
                  };
                  setInterval(() => {
                    changeSlide(1);
                    if (currentIndex === slides.length - 1) {
                      setTimeout(() => changeSlide(-1), 3000);
                    }
                  }, 3000);
                `}
              </script>
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
              <span className="text-xl font-noto pt-4">ประเมินความพึงพอใจ</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
