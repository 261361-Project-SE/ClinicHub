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
import { AppointmentStatus } from "@/lib/variables";

export function AppointmentStatusSelector({
  appointment_status,
}: {
  readonly appointment_status: string;
}) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue
          defaultValue={appointment_status}
          placeholder={`${appointment_status}`}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>สถานะ</SelectLabel>
          {Object.entries(AppointmentStatus).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
