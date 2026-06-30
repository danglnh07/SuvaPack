"use client";

import { Activity } from "lucide-react";
import { StatsCard } from "@/features/analytics/components/stats-card";
import { RequestsChart } from "@/features/analytics/components/requests-chart";
import { GroupStats } from "@/features/analytics/components/group-stats";
import { useTotalRequestsThisMonth } from "@/features/analytics/queries";

export default function AnalyticsPage() {
  const { data: totalRequests = 0, isLoading } = useTotalRequestsThisMonth();

  return (
    <section className="py-xl px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="mb-xl">
        <h1 className="font-headline-xl text-headline-xl text-primary mb-base">Analytics</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Request statistics for the current month.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Requests"
          value={isLoading ? "..." : totalRequests}
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <div className="mb-6">
        <RequestsChart />
      </div>

      <GroupStats />
    </section>
  );
}
