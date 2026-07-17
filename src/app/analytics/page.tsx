"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { StatsCard } from "@/features/analytics/components/stats-card";
import { RequestsChart } from "@/features/analytics/components/requests-chart";
import { GroupStats } from "@/features/analytics/components/group-stats";
import { useTotalRequestsThisMonth } from "@/features/analytics/queries";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function AnalyticsPage() {
  const [month, setMonth] = useState<number | null>(null);
  const selectedMonth = month ?? 0;
  const { data: totalRequests = 0, isLoading } = useTotalRequestsThisMonth(selectedMonth);

  useEffect(() => {
    setMonth(new Date().getMonth());
  }, []);

  if (month === null) {
    return (
      <section className="py-xl px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        <div className="mb-xl flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-headline-xl text-headline-xl text-primary mb-base">Analytics</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Loading...</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="h-24 rounded-xl border border-border bg-card animate-pulse" />
          </div>
          <div className="h-76.5 rounded-xl border border-border bg-card animate-pulse" />
          <div className="h-76.5 rounded-xl border border-border bg-card animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-xl px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="mb-xl flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-primary mb-base">Analytics</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Request statistics for {new Date().getFullYear()}.
          </p>
        </div>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="h-9 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
        >
          {MONTHS.map((name, i) => (
            <option key={i} value={i}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Requests"
          value={isLoading ? "..." : totalRequests}
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <div className="mb-6">
        <RequestsChart month={month} />
      </div>

      <GroupStats month={month} />
    </section>
  );
}
