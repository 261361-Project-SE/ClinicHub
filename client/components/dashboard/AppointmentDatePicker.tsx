"use client";

import { Input } from "../ui/input";
import { format } from "date-fns";
import { useState } from "react";

export function AppointmentDatePicker({
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const [date, setDate] = useState<Date | null>(null);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate || null);
    if (selectedDate) {
      setValue(format(selectedDate, "yyyy-MM-dd"));
    }
  };

  return (
    <div className="relative w-fit">
      <Input
        type="date"
        value={format(date || new Date(), "yyyy-MM-dd")}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
      />
    </div>
  );
}
