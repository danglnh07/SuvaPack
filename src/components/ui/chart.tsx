"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ReactElement;
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-layer]:outline-none [&_.recharts-surface]:outline-none [&_.recharts-sector]:outline-none [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          className,
        )}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    active?: boolean;
    payload?: { name?: string; value?: number; dataKey?: string; color?: string; fill?: string }[];
    label?: string;
    hideLabel?: boolean;
    indicator?: "line" | "dot" | "dashed";
  }
>(({ active, payload, label, className, hideLabel, indicator = "dot" }, ref) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border/50 bg-background px-3 py-2 text-sm shadow-xl",
        className,
      )}
    >
      {!hideLabel && label && (
        <p className="font-medium text-muted-foreground mb-1">{label}</p>
      )}
      <div className="grid gap-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={cn("shrink-0 rounded-full", {
                "h-2.5 w-2.5": indicator === "dot",
                "w-1 h-4": indicator === "line",
              })}
              style={{ backgroundColor: entry.color || entry.fill }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="font-mono font-medium tabular-nums text-foreground ml-auto">
              {entry.value?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

export { ChartContainer, ChartTooltipContent };
