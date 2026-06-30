"use client";

import { useRequestsByRegion, useRequestsByBrowser, useRequestsByOS } from "../queries";
import { PieChartCard } from "./browser-pie-chart";

function GroupTable({
  title,
  data,
  isLoading,
}: {
  title: string;
  data: { name: string; count: number }[];
  isLoading: boolean;
}) {
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-5 bg-muted rounded animate-pulse" />
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data</p>
      ) : (
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <span className="text-sm text-foreground font-medium w-32 truncate shrink-0">
                {item.name}
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(item.count / total) * 100}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground tabular-nums w-16 text-right shrink-0">
                {item.count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function GroupStats({ month }: { month: number }) {
  const { data: regionData = [], isLoading: regionLoading } = useRequestsByRegion(month);
  const { data: browserData = [], isLoading: browserLoading } = useRequestsByBrowser(month);
  const { data: osData = [], isLoading: osLoading } = useRequestsByOS(month);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GroupTable title="By Region" data={regionData} isLoading={regionLoading} />
      <PieChartCard title="By Browser" data={browserData} isLoading={browserLoading} />
      <PieChartCard title="By OS" data={osData} isLoading={osLoading} />
    </div>
  );
}
