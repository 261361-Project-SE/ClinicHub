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
  defaultValue,
  setValue,
}: {
  appointment_time?: string;
  defaultValue: string;
  setValue: (newTime: string) => void;
}) {
  return (
    <Select onValueChange={(value) => setValue(value)}>
      <SelectTrigger>
        <SelectValue
          defaultValue={defaultValue}
          placeholder={appointment_time}
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
