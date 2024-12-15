import { CalendarDays, ClipboardCheck, MessageSquare } from "lucide-react";
import React from "react";

interface ButtonLabelProps {
  icon: React.ReactNode;
  label: string;
  isLarge: boolean;
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
  isLarge,
  hoverEffect = "hover:shadow-lg",
  scaleEffect = "hover:scale-[1.02]",
  width = "w-full",
  height = "h-[180px]",
  bgColor = "bg-gray-100",
  textColor = "text-gray-700",
}: ButtonLabelProps) =>
  isLarge ? (
    <div
      className={`
      flex items-center gap-4 
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
    `}
    >
      {icon}
      <span className="text-4xl">{label}</span>
    </div>
  ) : (
    <div
      className={`
      flex flex-col items-center gap-4 
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
    `}
    >
      {icon}
      <span>{label}</span>
    </div>
  );

const actionButtons = [
  {
    icon: <CalendarDays size={128} />,
    label: "จองการนัด",
    isLarge: true,
    hoverEffect: "hover:shadow-xl",
    scaleEffect: "hover:scale-[1.05]",
    width: "w-[480px]",
    height: "h-[255px]",
    bgColor: "bg-pink-400",
    textColor: "text-white",
  },
  {
    icon: <ClipboardCheck size={128} />,
    label: "ตรวจสอบนัดหมาย",
    isLarge: true,
    hoverEffect: "hover:shadow-xl",
    scaleEffect: "hover:scale-[1.05]",
    width: "w-[480px]",
    height: "h-[255px]",
    bgColor: "bg-amber-400",
    textColor: "text-white",
  },
  {
    icon: <MessageSquare size={128} />,
    label: "ประเมินความพึงพอใจ",
    isLarge: false,
    hoverEffect: "hover:shadow-xl",
    scaleEffect: "hover:scale-[1.05]",
    width: "w-[250px]",
    height: "h-[255px]",
    bgColor: "bg-green-400",
    textColor: "text-white",
  },
];

export default function BookingPage() {
  return (
    <div className="hidden lg:block container mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl p-8 mb-5 shadow-md h-[400px] w-full">
        <h2 className="text-gray-700 text-center text-2xl font-medium mb-4">
          คู่มือ รายละเอียดการจอง
        </h2>
        <p className="text-gray-500 text-center">
          กรุณาอ่านรายละเอียดและข้อกำหนดในการจอง
        </p>
      </div>

      <div className="flex items-start justify-between">
        {actionButtons.map((button, index) => (
          <ButtonLabel key={index} {...button} />
        ))}
      </div>
    </div>
  );
}
