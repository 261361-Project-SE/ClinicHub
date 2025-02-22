"use client";

import PageLoader from "@/components/PageLoader";
import MobileAppointmentCard from "@/components/dashboard/mobile/MobileAppointmentCard";
import MobileDashboardLayout from "@/components/dashboard/mobile/MobileDashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useFetchAppointments } from "@/hooks/useFetchAppointments";
import { AppointmentProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const filters = [
  { label: "รอยืนยัน", value: "PENDING" },
  { label: "ยืนยันแล้ว", value: "CONFIRMED" },
  { label: "คนไข้ยกเลิก", value: "CANCELED" },
];

const MobileAppointment = () => {
  const { appointments, loading } = useFetchAppointments();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [date, setDate] = useState<Date | undefined>();
  const router = useRouter();

  if (loading) {
    return <PageLoader />;
  }

  const filteredAppointments = appointments
    .filter((appt) =>
      selectedFilter === "all"
        ? true
        : appt.appointment_status === selectedFilter
    )
    .filter((appt) => {
      if (!date) return true;
      return (
        format(new Date(appt.appointment_dateTime), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd")
      );
    });

  return (
    <MobileDashboardLayout>
      <div className="fixed top-0 z-50 w-full px-4 py-6 bg-white">
        {/* Header Section */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 text-gray-700"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-medium">การนัดหมายทั้งหมด</h2>
        </div>
      </div>

      {/* Appointment List */}
      <div className="flex flex-col gap-y-4 px-2 py-4 mt-[80px]">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left border-none p-2 font-normal py-4 pl-10 pr-4 bg-white hover:bg-white rounded-full relative",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon
                className="absolute text-gray-400 left-3 top-1/2 transform -translate-y-1/2"
                size={20}
              />
              {date ? format(date, "PPP", { locale: th }) : "เลือกวันที่..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
              locale={th}
            />
          </PopoverContent>
        </Popover>

        {/* Filter Tabs */}
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center p-2 bg-white rounded-full gap-2">
            <div
              className={cn(
                "px-4 py-2 rounded-full text-sm hover:bg-pink-200 cursor-pointer",
                selectedFilter === "all" ? "bg-pink-200 text-white" : ""
              )}
              onClick={() => setSelectedFilter("all")}
            >
              ทั้งหมด
            </div>
            {filters.map((filter) => (
              <div
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm hover:bg-pink-200 cursor-pointer",
                  selectedFilter === filter.value
                    ? "bg-pink-200 text-white"
                    : ""
                )}
              >
                {filter.label}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {filteredAppointments.map((appointment: AppointmentProps) => (
          <MobileAppointmentCard key={appointment.id} {...appointment} />
        ))}
      </div>
    </MobileDashboardLayout>
  );
};

export default MobileAppointment;
