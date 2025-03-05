import { GenerateAppointmentTimeSlots } from "@/app/utils/GenerateAppointmentTimeSlots";
import { format } from "date-fns";
import { th } from "date-fns/locale";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_BASE_URL_API || "http://localhost:5007";

export const AppointmentTimeSlots = GenerateAppointmentTimeSlots(
  "09:00",
  "18:00",
  15
);

export const AppointmentStatus = {
  PENDING: {
    value: "PENDING",
    label: "รอยืนยัน",
  },
  CONFIRMED: {
    value: "CONFIRMED",
    label: "ยืนยันแล้ว",
  },
  CANCELED: {
    value: "CANCELED",
    label: "ยกเลิก",
  },
  COMPLETED: {
    value: "COMPLETED",
    label: "สำเร็จ",
  },
};

export const currentThaiYear = format(new Date(), "yyyy", { locale: th });
export const currentThaiMonth = format(new Date(), "MMMM", { locale: th });
