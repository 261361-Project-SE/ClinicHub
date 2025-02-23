"use client";

import Error from "@/app/error";
import PageLoader from "@/components/PageLoader";
import { AppointmentStatusSelector } from "@/components/dashboard/AppointmentStatusSelector";
import { getStatusColor } from "@/components/dashboard/mobile/MobileAppointmentCard";
import { Card } from "@/components/ui/card";
import {
  useFetchAppointmentById,
  useFetchAppointmentByPhone,
} from "@/hooks/useFetchAppointments";
import { cn } from "@/lib/utils";
import { SERVER_URL } from "@/lib/variables";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MobileAppointmentDescription = () => {
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/").pop();
  const { appointment, loading, error } = useFetchAppointmentById(Number(id));
  const {
    appointment: history,
    loading: historyLoading,
    error: historyErr,
  } = useFetchAppointmentByPhone(appointment?.[0]?.phone_number ?? "");
  const filteredHistory = history?.filter(
    (item) => item.id !== appointment?.[0]?.id
  );
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    if (appointment?.[0]?.appointment_status) {
      setStatus(appointment[0].appointment_status.toString());
    }
  }, [appointment]);

  if (loading || historyLoading) {
    return <PageLoader />;
  }

  if (error || historyErr) {
    return <Error />;
  }

  const handleStatusChange = async (status: string) => {
    await setStatus(status);
    await axios.patch(`${SERVER_URL}/doctor/appointment/update`, {
      id: appointment[0].id,
      status: status,
    });
  };

  return (
    <div className="min-h-screen bg-lightgray-100">
      {/* Header */}
      <div className="fixed top-0 z-50 w-full px-4 py-6 bg-white">
        {/* Header Section */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 text-gray-700"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-medium">รายละเอียดการนัดหมาย</h2>
        </div>
      </div>

      <div className="px-2 mt-[100px] py-4">
        {/* Patient Info */}
        {appointment?.map((item) => (
          <Card key={item.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {item.firstname} {item.lastname}
              </h3>
            </div>

            {/* Appointment Date & Time */}
            <div className="flex items-center justify-between p-3 mt-2 bg-gray-100 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">วันที่และเวลานัด</p>
                <p className="text-gray-900">
                  {format(
                    new Date(item.appointment_dateTime ?? new Date()),
                    "d MMMM yyyy, HH:mm น.",
                    { locale: th }
                  )}
                </p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-between p-3 mt-2 bg-gray-100 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
                <p className="text-gray-900">{item.phone_number}</p>
              </div>
            </div>
          </Card>
        ))}

        {/* Appointment Status */}
        <Card className="p-4 mt-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">สถานะการนัด</h3>
          <AppointmentStatusSelector
            defaultValue={status}
            setValue={handleStatusChange}
            className={cn(
              "w-full text-white mt-4 border-none rounded-lg",
              getStatusColor(status)
            )}
          />
        </Card>

        {/* Appointment History */}
        <Card className="p-4 mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              ประวัติการนัด
            </h3>
          </div>
          {filteredHistory?.map((appointment) => (
            <div
              key={appointment.id || ""}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
            >
              <div>
                <p className="text-gray-900">
                  {format(
                    new Date(appointment.appointment_dateTime ?? new Date()),
                    "d MMMM yyyy, HH:mm น.",
                    { locale: th }
                  )}
                </p>
              </div>
            </div>
          ))}
          {!filteredHistory?.length && (
            <p className="py-4 text-center text-gray-500">
              ไม่พบประวัติการนัดหมาย
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MobileAppointmentDescription;
