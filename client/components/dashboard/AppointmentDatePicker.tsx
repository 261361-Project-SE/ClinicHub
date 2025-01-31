"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {date ? (
            format(date, "PPP", { locale: th })
          ) : (
            <span>เลือกวันที่</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {/* <Calendar
          locale={th}
          mode="single"
          className="z-10"
          selected={date || undefined}
          onSelect={(day) => handleDateChange(day)}
        /> */}
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={format(date || new Date(), "yyyy-MM-dd")}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        />
      </PopoverContent>
    </Popover>
  );
}
