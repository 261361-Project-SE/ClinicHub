"use client";

import Error from "@/app/error";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useFetchFeedback } from "@/hooks/useFetchFeedback";
import { useMemo } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartData = [
  { feedback: "พอใจมาก", count: 100, fill: "#98C99F" },
  { feedback: "ปานกลาง", count: 80, fill: "#FFBC41" },
  { feedback: "ไม่พอใจ", count: 50, fill: "#E57373" },
];

const chartConfig = {
  Positive: {
    label: "พอใจมาก",
    color: "#98C99F",
  },
  Neutral: {
    label: "ปานกลาง",
    color: "#FFBC41",
  },
  Negative: {
    label: "ไม่พอใจ",
    color: "#E57373",
  },
} satisfies ChartConfig;

export function FeedbackChart() {
  const { feedback, loading, error } = useFetchFeedback();
  const processedData = useMemo(() => {
    if (!feedback || loading) return chartData;

    const counts = {
      Positive: 0,
      Neutral: 0,
      Negative: 0,
    };

    feedback.forEach((item: any) => {
      if (item.rating === 3) counts.Positive++;
      else if (item.rating === 2) counts.Neutral++;
      else if (item.rating === 1) counts.Negative++;
    });

    return [
      {
        feedback: "พอใจมาก",
        count: counts.Positive,
        fill: chartConfig.Positive.color,
      },
      {
        feedback: "ปานกลาง",
        count: counts.Neutral,
        fill: chartConfig.Neutral.color,
      },
      {
        feedback: "ไม่พอใจ",
        count: counts.Negative,
        fill: chartConfig.Negative.color,
      },
    ];
  }, [feedback, loading]);
  if (error) return <Error />;

  return (
    <ChartContainer config={chartConfig} className="max-h-32">
      <BarChart
        data={processedData}
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
