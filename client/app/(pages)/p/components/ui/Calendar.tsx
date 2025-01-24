import { buttonVariants } from "@/app/(pages)/p/components/ui/Button";
import { cn } from "@/app/(pages)/p/lib/utils";
import { th } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar: React.FC<CalendarProps> = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [lockedDates, setLockedDates] = useState<Date[]>([]); // Array to hold locked dates

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);

    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  const handleDayClick = (date: Date) => {
    // Check if the date is already locked
    if (
      !lockedDates.some(
        (lockedDate) => lockedDate.toDateString() === date.toDateString()
      )
    ) {
      setLockedDates((prev) => [...prev, date]); // Lock the date
    }
  };

  const isDateLocked = (date: Date) => {
    return lockedDates.some(
      (lockedDate) => lockedDate.toDateString() === date.toDateString()
    );
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={th}
      className={cn(
        "p-3 bg-white",
        {
          "md:w-[922px] md:h-[600px] md:p-4 mx-auto md:mt-12": isDesktop,
          "w-full h-auto p-2": !isDesktop,
        },
        className
      )}
      classNames={{
        months: cn(
          "flex flex-col sm:flex-row space-y-6 sm:space-x-6 sm:space-y-0",
          {
            "md:w-full md:justify-center": isDesktop,
            "justify-center": !isDesktop,
          }
        ),
        month: cn("space-y-4", {
          "md:w-full md:max-w-[800px]": isDesktop,
          "w-full": !isDesktop,
        }),
        caption: cn("flex justify-center pt-1 relative items-center", {
          "md:py-4": isDesktop,
          "py-2": !isDesktop,
        }),
        caption_label: cn("text-sm font-medium", {
          "md:text-2xl": isDesktop,
          "text-lg": !isDesktop,
        }),
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          {
            "md:h-12 md:w-12": isDesktop,
            "h-7 w-7": !isDesktop,
          }
        ),
        nav_button_previous: cn("absolute left-1", {
          "md:left-4": isDesktop,
          "left-2": !isDesktop,
        }),
        nav_button_next: cn("absolute right-1", {
          "md:right-4": isDesktop,
          "right-2": !isDesktop,
        }),
        table: cn("w-full border-collapse space-y-1", {
          "md:mt-4": isDesktop,
          "mt-2": !isDesktop,
        }),
        head_row: "flex justify-center",
        head_cell: cn(
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          {
            "md:w-[88px] md:text-sm md:font-medium": isDesktop,
            "w-9 text-base": !isDesktop,
          }
        ),
        row: cn("flex w-full mt-2 justify-center", {
          "md:mt-4": isDesktop,
          "mt-2": !isDesktop,
        }),
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md"
            : "[&:has([aria-selected])]:rounded-md",
          {
            "md:p-1": isDesktop,
            "p-1": !isDesktop,
          }
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
          {
            "md:h-[50px] md:w-[80px] md:text-lg": isDesktop,
            "h-9 w-9 text-base": !isDesktop,
          }
        ),
        day_selected: cn(
          "bg-pink-200 text-white hover:bg-pink-200 hover:text-white focus:bg-pink-200 focus:text-white",
          {
            "bg-pink-200 text-white": lockedDates.length > 0,
          }
        ),
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn(
              "h-4 w-4",
              {
                "md:h-8 md:w-8": isDesktop,
                "h-6 w-6": !isDesktop,
              },
              className
            )}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn(
              "h-4 w-4",
              {
                "md:h-8 md:w-8": isDesktop,
                "h-6 w-6": !isDesktop,
              },
              className
            )}
            {...props}
          />
        ),
      }}
      onDayClick={handleDayClick}
      {...props}
    />
  );
};

Calendar.displayName = "Calendar";

export { Calendar };
