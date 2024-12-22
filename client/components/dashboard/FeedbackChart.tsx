"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
// import { SmileIcon, MehIcon, FrownIcon } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartData = [
  { feedback: "Positive", count: 150, fill: "#98C99F" },
  { feedback: "Neutral", count: 80, fill: "#FFBC41" },
  { feedback: "Negative", count: 50, fill: "#E57373" },
];

const chartConfig = {
  Positive: {
    label: "Positive",
    color: "#98C99F",
  },
  Neutral: {
    label: "Neutral",
    color: "#FFBC41",
  },
  Negative: {
    label: "Negative",
    color: "#E57373",
  },
} satisfies ChartConfig;

export function FeedbackChart() {
  return (
    <ChartContainer config={chartConfig} className="max-h-32">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{
          left: 0,
        }}
      >
        {/* Y-Axis */}
        <YAxis
          dataKey="feedback"
          type="category"
          tickLine={false}
          tickMargin={5}
          axisLine={false}
        />
        {/* X-Axis */}
        <XAxis dataKey="count" type="number" hide />
        {/* Tooltip */}
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        {/* Bars */}
        <Bar dataKey="count" layout="vertical" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
