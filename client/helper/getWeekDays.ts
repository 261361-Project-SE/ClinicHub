import { AppointmentProps } from "@/lib/types";
import { addDays, startOfWeek } from "date-fns";
import { format } from "date-fns";
import { th } from "date-fns/locale";

export const getWeekDays = (appointments: AppointmentProps[]) => {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 });

  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(start, index);
    const day = format(date, "EEE", { locale: th });
    const formattedDate = format(date, "d", { locale: th });

    const appointmentCount = appointments.filter((apt) => {
      const aptDate = new Date(apt.appointment_dateTime);
      return format(aptDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    }).length;

    return {
      date: formattedDate,
      day: day,
      count: appointmentCount,
    };
  });

  return weekDays;
};
