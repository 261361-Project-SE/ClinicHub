import { buttonVariants } from "@/app/(pages)/p/components/ui/Button";
import { cn } from "@/app/(pages)/p/lib/utils";
import { th } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

interface CalendarProps {
  mode: "single" | "multiple" | "range";
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  mode,
  selected,
  onSelect,
  className,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);

    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  const handleDayClick = (day: Date) => {
    onSelect(day);
  };

  return (
    <>
      {mode === "single" && (
        <DayPicker
          locale={th}
          mode="single"
          selected={selected}
          onDayClick={handleDayClick}
          className={cn(
            "p-4 bg-white",
            {
              "md:w-[1080px] md:h-[600px] md:p-4 md:justify-center md:mx-auto":
                isDesktop,
            },
            className
          )}
          classNames={{
            months: cn(
              "flex flex-col sm:flex-row space-y-8 sm:space-x-6 sm:space-y-0",
              {
                "md:w-full md:justify-center md:max-w-7xl": isDesktop,
              }
            ),
            month: cn("space-y-6", {
              "md:w-full md:max-w-7xl": isDesktop,
            }),
            caption: cn("flex justify-center pt-2 relative items-center", {
              "md:py-4": isDesktop,
              "text-sm": !isDesktop,
            }),
            caption_label: cn("text-base font-medium", {
              "md:text-2xl": isDesktop,
            }),
            nav: "space-x-2 flex items-center",
            nav_button: cn(
              buttonVariants({ variant: "outline" }),
              "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100",
              {
                "md:h-12 md:w-12": isDesktop,
              }
            ),
            nav_button_previous: cn("absolute left-2", {
              "md:left-4": isDesktop,
            }),
            nav_button_next: cn("absolute right-2", {
              "md:right-4": isDesktop,
            }),
            table: cn("w-full border-collapse space-y-2", {
              "md:mt-4": isDesktop,
            }),
            head_row: "flex justify-center",
            head_cell: cn(
              "text-muted-foreground rounded-md w-12 font-normal text-[0.9rem]",
              {
                "md:w-[88px] md:text-sm md:font-medium": isDesktop,
                "text-xs": !isDesktop,
              }
            ),
            row: cn("flex w-full mt-3 justify-center", {
              "md:mt-4": isDesktop,
            }),
            cell: cn(
              "relative p-1 text-center text-sm focus-within:relative focus-within:z-20",
              mode === "single"
                ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md"
                : "[&:has([aria-selected])]:rounded-md",
              {
                "md:p-1": isDesktop,
              }
            ),
            day: cn(
              buttonVariants({ variant: "ghost" }),
              "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
              {
                "md:h-[50px] md:w-[80px] md:text-lg": isDesktop,
                "h-8 w-8 text-sm": !isDesktop,
              }
            ),
            day_selected:
              "bg-pink-200 text-primary-foreground hover:bg-pink-200 hover:text-primary-foreground focus:bg-pink-200 focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle:
              "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
          components={{
            IconLeft: ({ className, ...props }) => (
              <ChevronLeft
                className={cn(
                  "h-5 w-5",
                  {
                    "md:h-8 md:w-8": isDesktop,
                  },
                  className
                )}
                {...props}
              />
            ),
            IconRight: ({ className, ...props }) => (
              <ChevronRight
                className={cn(
                  "h-5 w-5",
                  {
                    "md:h-8 md:w-8": isDesktop,
                  },
                  className
                )}
                {...props}
              />
            ),
          }}
        />
      )}
      {/* Similar changes for "multiple" and "range" modes */}
    </>
  );
};

Calendar.displayName = "Calendar";

export { Calendar };
