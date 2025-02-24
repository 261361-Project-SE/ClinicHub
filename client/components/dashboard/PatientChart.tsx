"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useFetchAppointments } from "@/hooks/useFetchAppointments";
import { currentThaiMonth, currentThaiYear } from "@/lib/variables";
import { endOfMonth, startOfMonth } from "date-fns";
import { TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = {
  patient: {
    label: "คนไข้ทั้งหมด",
  },
  New: {
    label: "คนไข้ใหม่",
    color: "hsl(var(--chart-1))",
  },
  Old: {
    label: "คนไข้เก่า",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function PatientChart() {
  const { appointments, loading, error } = useFetchAppointments();

  const currentMonth = new Date();
  const lastMonth = new Date(currentMonth);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const getCurrentMonthPatients = () => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);

    return new Set(
      appointments
        .filter((apt) => {
          const aptDate = new Date(apt.appointment_dateTime);
          return aptDate >= startDate && aptDate <= endDate;
        })
        .map((apt) => apt.phone_number)
    );
  };

  const getLastMonthPatients = () => {
    const startDate = startOfMonth(lastMonth);
    const endDate = endOfMonth(lastMonth);

    return new Set(
      appointments
        .filter((apt) => {
          const aptDate = new Date(apt.appointment_dateTime);
          return aptDate >= startDate && aptDate <= endDate;
        })
        .map((apt) => apt.phone_number)
    );
  };

  const currentMonthPatients = getCurrentMonthPatients();
  const lastMonthPatients = getLastMonthPatients();

  const newPatients = Array.from(currentMonthPatients).filter(
    (phone) => !lastMonthPatients.has(phone)
  ).length;
  const returningPatients = currentMonthPatients.size - newPatients;

  const chartData = useMemo(
    () => [
      {
        patient: "คนไข้ใหม่",
        count: Number(newPatients),
        fill: "#FB6F93",
      },
      {
        patient: "คนไข้เก่า",
        count: Number(returningPatients),
        fill: "#FFBC41",
      },
    ],
    [newPatients, returningPatients]
  );

  const totalPatients = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <div className="flex flex-col items-center justify-between h-full p-0 border-none shadow-none">
      <div className="font-medium text-darkgray">
        สรุปจำนวนคนไข้ {currentThaiMonth} {currentThaiYear}
      </div>

      <div className="w-full">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="patient"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-medium text-darkgray fill-foreground"
                        >
                          {totalPatients.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          คนไข้ทั้งหมด
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      <div className="flex-col text-sm gap-2">
        <div className="flex items-center justify-center gap-1">
          <TrendingUp size={16} />
          <span className="text-[#98C99F]">+20%</span>
          <span className="text-darkgray">จากเดือนที่แล้ว</span>
        </div>
        <div className="text-darkgray">
          จำนวนคนไข้ทั้งหมด
          <span className="text-darkgray">
            {" "}
            {totalPatients.toLocaleString()} คน
          </span>
        </div>
      </div>

      <div className="flex text-sm gap-x-2">
        {chartData.map((data) => (
          <div key={data.patient} className="flex items-center">
            <div
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: data.fill }}
            />
            <span className="text-darkgray">{data.patient}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
