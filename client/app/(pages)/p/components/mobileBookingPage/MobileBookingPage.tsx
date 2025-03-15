import AppointmentDialogmobile from "../AppointmentDialogmobile";
import ImageSlider from "../ImageSlider";
import Link from "next/link";
import React from "react";

interface MobileBookingPageProps {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  handleValidation: () => void;
}

const MobileBookingPage: React.FC<MobileBookingPageProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  handleValidation,
}) => {
  const images = ["/1mobile.png", "/2mobile.png", "/3mobile.png"];

  return (
    <div className="mx-auto w-full max-w-6xl mb-24 font-noto font-medium text-lg text-center">
      <div className="flex items-center justify-center gap-10">
        <Link
          href="/p/booking"
          className="w-[150px] h-[100px] bg-pink-200 text-white rounded-xl hover:scale-105 transition-transform flex items-center justify-center"
        >
          <span className="font-noto font-medium text-xl">จองการนัด</span>
        </Link>
        <AppointmentDialogmobile
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phone={phone}
          setPhone={setPhone}
          handleValidation={handleValidation}
        />
      </div>
      <div className="shadow-md p-6 mb-4 h-[600px]">
        <ImageSlider images={images} />
      </div>
    </div>
  );
};

export default MobileBookingPage;
