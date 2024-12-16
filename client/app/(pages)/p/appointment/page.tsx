import { CalendarDays, ClipboardCheck, MessagesSquare } from "lucide-react";
import React from "react";

interface ButtonLabelProps {
  icon: React.ReactNode;
  label: string;
  isLarge?: boolean;
  hoverEffect?: string;
  scaleEffect?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
}

const ButtonLabel = ({
  icon,
  label,
  isLarge = false,
  hoverEffect = "hover:shadow-lg",
  scaleEffect = "hover:scale-[1.02]",
  width = "w-full",
  height = "h-[180px]",
  bgColor = "bg-gray-100",
  textColor = "text-gray-700",
}: ButtonLabelProps) => {
  const baseClasses = `
    flex ${isLarge ? "items-center" : "flex-col items-center"}
    gap-4
    ${hoverEffect}
    ${scaleEffect}
    ${width}
    ${height}
    ${bgColor}
    ${textColor}
    p-6
    rounded-2xl
    shadow-md
    transition-all
    duration-300
  `;

  return (
    <div className={baseClasses}>
      {icon}
      <span className={`${isLarge ? "text-4xl" : "text-lg"} font-noto`}>
        {label}
      </span>
    </div>
  );
};

const actionButtons = [
  {
    icon: (
      <CalendarDays
        className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
        strokeWidth={2}
      />
    ),
    label: "จองการนัด",
    isLarge: true,
    hoverEffect: "hover:shadow-xl",
    scaleEffect: "hover:scale-[1.05]",
    width: "w-full md:w-[400px] lg:w-[480px]",
    height: "h-[200px] md:h-[225px] lg:h-[255px]",
    bgColor: "bg-pink-400",
    textColor: "text-white",
  },
  {
    icon: (
      <ClipboardCheck
        className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
        strokeWidth={2}
      />
    ),
    label: "ตรวจสอบนัดหมาย",
    isLarge: true,
    hoverEffect: "hover:shadow-xl",
    scaleEffect: "hover:scale-[1.05]",
    width: "w-full md:w-[400px] lg:w-[480px]",
    height: "h-[200px] md:h-[225px] lg:h-[255px]",
    bgColor: "bg-amber-400",
    textColor: "text-white",
  },
  {
    icon: (
      <MessagesSquare
        className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
        strokeWidth={2}
      />
    ),
    label: "ประเมินความพึงพอใจ",
    isLarge: false,
    hoverEffect: "hover:shadow-xl",
    scaleEffect: "hover:scale-[1.05]",
    width: "w-full md:w-[200px] lg:w-[250px]",
    height: "h-[200px] md:h-[225px] lg:h-[255px]",
    bgColor: "bg-green-1000",
    textColor: "text-white",
  },
];

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-6 hidden md:block">
      {/* Desktop Version */}
      <div className="hidden md:block">
        <div className="bg-white rounded-2xl p-6 lg:p-8 mb-5 shadow-md h-[300px] lg:h-[400px] w-full">
          <h2 className="text-gray-700 text-center text-2xl font-medium font-noto mb-4">
            คู่มือ รายละเอียดการจอง
          </h2>
          <p className="text-gray-500 text-center text-base font-noto">
            กรุณาอ่านรายละเอียดและข้อกำหนดในการจอง
          </p>
        </div>

        <div className="flex flex-row items-start justify-between gap-6">
          {actionButtons.map((button, index) => (
            <ButtonLabel key={index} {...button} />
          ))}
        </div>
      </div>

      {/* Mobile Version */}
      <div className="block md:hidden">
        <div>
          <h1 className="">ระบบจองนัดหมาย</h1>
          <p className="text-white text-center font-noto">
            เลือกบริการที่ต้องการจองนัดหมาย
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <CalendarDays />
            <span className="text-sm font-noto">จองการนัด</span>
          </div>
          <div className="">
            <ClipboardCheck />
            <span className="text-sm font-noto">ตรวจสอบนัด</span>
          </div>
          <div>
            <MessagesSquare />
            <span className="text-sm font-noto">ประเมินความพึงพอใจ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
