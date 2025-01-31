import { CalendarClockIcon } from "lucide-react";
import React from "react";

const DashboardCard = ({
  title,
  count,
  date,
}: {
  title: string;
  count: number;
  date: string;
}) => (
  <div className="flex items-center justify-center w-1/3 p-4 bg-white rounded-xl shadow-shadow-bg gap-8">
    <CalendarClockIcon color="#FB6F92" size={84} />
    <div className="flex flex-col gap-y-2">
      <div className="text-xl xl:text-2xl text-darkgray">{title}</div>
      <div className="text-4xl">{count}</div>
      <div className="text-lightgray">{date}</div>
    </div>
  </div>
);

export default DashboardCard;
