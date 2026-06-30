"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const COLORS = [
  "#15803d",
  "#16a34a",
  "#0d9488",
  "#2563eb",
  "#8b5cf6",
  "#d97706",
  "#dc2626",
  "#0891b2",
  "#4f46e5",
  "#be185d",
];

const chartConfig = {
  count: { label: "Requests" },
};

export function PieChartCard({
  title,
  data,
  isLoading,
}: {
  title: string;
  data: { name: string; count: number }[];
  isLoading: boolean;
}) {
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
      <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
      <ChartContainer config={chartConfig} className="w-full h-[250px]">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            paddingAngle={3}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent indicator="dot" />} />
        </PieChart>
      </ChartContainer>
      <div className="flex flex-wrap justify-center gap-3 mt-3">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            {item.name}: {item.count.toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
}
