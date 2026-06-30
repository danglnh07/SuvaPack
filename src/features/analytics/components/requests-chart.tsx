"use client";

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useRequestsTimeline } from "../queries";
import { Area, CartesianGrid, ComposedChart, Line, Tooltip, XAxis } from "recharts";

const chartConfig = {
  count: {
    label: "Requests",
    color: "#15803d",
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
        <ComposedChart accessibilityLayer data={data} margin={{ left: 10, right: 10 }}>
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
          <defs>
            <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-count)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--color-count)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="count"
            fill="url(#fillCount)"
            stroke="none"
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="var(--color-count)"
            strokeWidth={2.5}
            dot={false}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}
