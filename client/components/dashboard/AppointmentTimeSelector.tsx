import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppointmentTimeSlots } from "@/lib/variables";

export function AppointmentTimeSelector({
  appointment_time,
  setValue,
}: {
  appointment_time: string;
  setValue: (value: string) => void;
}) {
  return (
    <Select onValueChange={(value) => setValue(value)}>
      <SelectTrigger>
        <SelectValue
          placeholder={appointment_time ? `${appointment_time}` : "เลือกเวลา"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>เวลา</SelectLabel>
          {AppointmentTimeSlots.map((time) => (
            <SelectItem key={time} value={time}>
              {`${time.slice(0, 2)}:${time.slice(2)}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
