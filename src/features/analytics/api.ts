import { supabase } from "@/lib/client";

function getMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
  return { start, end };
}

export async function getTotalRequestsThisMonth(): Promise<number> {
  const { start, end } = getMonthRange();

  const { count, error } = await supabase
    .from("requests")
    .select("*", { count: "exact", head: true })
    .gte("created_at", start)
    .lte("created_at", end);

  if (error) {
    console.error("Supabase count error:", error);
    return 0;
  }

  return count ?? 0;
}

export async function getRequestsTimeline(): Promise<{ date: string; count: number }[]> {
  const { start, end } = getMonthRange();

  const { data, error } = await supabase
    .from("requests")
    .select("created_at")
    .gte("created_at", start)
    .lte("created_at", end);

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }

  const daily: Record<string, number> = {};
  for (const r of data as { created_at: string }[]) {
    const day = r.created_at.slice(0, 10);
    daily[day] = (daily[day] || 0) + 1;
  }

  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const result: { date: string; count: number }[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = `${year}-${month}-${String(d).padStart(2, "0")}`;
    result.push({ date, count: daily[date] || 0 });
  }

  return result;
}

async function getGroupedCounts(
  column: "region" | "browser" | "os",
): Promise<{ name: string; count: number }[]> {
  const { start } = getMonthRange();

  const { data, error } = await supabase
    .from("requests")
    .select(column)
    .gte("created_at", start);

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }

  const counts: Record<string, number> = {};
  for (const r of data as Record<string, string>[]) {
    const key = r[column] || "Unknown";
    counts[key] = (counts[key] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export const getRequestsByRegion = () => getGroupedCounts("region");
export const getRequestsByBrowser = () => getGroupedCounts("browser");
export const getRequestsByOS = () => getGroupedCounts("os");
