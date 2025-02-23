import { AppointmentStatusSelector } from "@/components/dashboard/AppointmentStatusSelector";
import { Button } from "@/components/ui/button";
import { useFetchAppointments } from "@/hooks/useFetchAppointments";
import { AppointmentProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SERVER_URL } from "@/lib/variables";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Phone, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-[#FFBC41] hover:bg-yellow-500";
    case "CONFIRMED":
      return "bg-success hover:bg-green-600";
    case "CANCELED":
      return "bg-error hover:bg-red-600";
    case "COMPLETED":
      return "bg-blue-500 hover:bg-blue-600";
    default:
      return "bg-gray-400 hover:bg-gray-500";
  }
};

const MobileAppointmentCard = (appointment: AppointmentProps) => {
  const [status, setStatus] = useState(appointment.appointment_status);
  const { refetch } = useFetchAppointments();

  const handleStatusChange = async (status: string) => {
    await setStatus(status);
    await axios.patch(`${SERVER_URL}/doctor/appointment/update`, {
      id: appointment.id,
      status: status,
    });
    await refetch();
  };

  return (
    <>
      <div
        key={appointment.id}
        className="w-full p-4 mt-4 bg-white rounded-lg shadow-shadow-bg"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium">
            คนไข้ {appointment.firstname} {appointment.lastname}
          </h4>
          <Link href={`/dashboard/mobile/appointment/${appointment.id}`}>
            <Button variant="link" className="font-semibold text-pink-200">
              ดูรายละเอียด
            </Button>
          </Link>
        </div>
        <Link
          href={`tel:${appointment.phone_number}`}
          className="flex items-center mt-1 text-sm text-gray-500 underline gap-2"
        >
          <Phone size={16} />
          <span>{appointment.phone_number}</span>
        </Link>
        <div className="flex items-center mt-2 text-sm text-gray-600 gap-2">
          <Calendar size={16} />{" "}
          <span>
            {format(new Date(appointment.appointment_dateTime), "d MMMM yyyy", {
              locale: th,
            })}
          </span>
        </div>
        <div className="flex items-center mt-1 text-sm text-gray-600 gap-2">
          <Clock size={16} />
          <span>
            {format(new Date(appointment.appointment_dateTime), "HH:mm", {
              locale: th,
            })}{" "}
            น.
          </span>
        </div>
        <AppointmentStatusSelector
          defaultValue={status}
          setValue={handleStatusChange}
          className={cn(
            "w-full text-white mt-4 border-none rounded-lg",
            getStatusColor(status)
          )}
        />
      </div>
    </>
  );
};

export default MobileAppointmentCard;
