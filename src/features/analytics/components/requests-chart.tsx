"use client";

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useRequestsTimeline } from "../queries";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";

const chartConfig = {
  count: {
    label: "Requests",
    color: "hsl(var(--chart-1))",
  },
};

export function RequestsChart({ month }: { month: number }) {
  const { data = [], isLoading } = useRequestsTimeline(month);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="h-5 w-48 bg-muted rounded animate-pulse mb-4" />
        <div className="h-[200px] bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Requests This Month
      </h3>
      <ChartContainer config={chartConfig} className="w-full h-[250px]">
        <LineChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            tickFormatter={(v: string) => v.slice(8)}
          />
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" hideLabel />}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="var(--color-count)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
