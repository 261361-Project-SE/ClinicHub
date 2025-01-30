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
import * as React from "react";

export function AppointmentStatusSelector({
  defaultValue,
  setValue,
}: {
  readonly defaultValue: string;
  setValue: (newStatus: string) => void;
}) {
  return (
    <Select onValueChange={(value) => setValue(value)}>
      <SelectTrigger>
        <SelectValue
          defaultValue={defaultValue}
          placeholder={`${defaultValue}`}
          onChange={(e) => setValue((e.target as HTMLInputElement).value)}
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
