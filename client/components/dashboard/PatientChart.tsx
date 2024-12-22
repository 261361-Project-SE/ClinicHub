"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

const chartData = [
  {
    patient: "คนไข้ใหม่",
    count: 400,
    fill: "#FB6F93",
  },
  {
    patient: "คนไข้เก่า",
    count: 200,
    fill: "#FFBC41",
  },
];

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
  const totalPatients = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full p-0 border-none shadow-none">
      <div className="font-medium text-darkgray">
        สรุปจำนวนคนไข้ ธันวาคม 2567
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
