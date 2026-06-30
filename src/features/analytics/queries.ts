import { useQuery } from "@tanstack/react-query";
import {
  getTotalRequestsThisMonth,
  getRequestsTimeline,
  getRequestsByRegion,
  getRequestsByBrowser,
  getRequestsByOS,
} from "./api";

export const analyticsKeys = {
  all: ["analytics"] as const,
  total: (month: number) => ["analytics", "total", month] as const,
  timeline: (month: number) => ["analytics", "timeline", month] as const,
  region: (month: number) => ["analytics", "region", month] as const,
  browser: (month: number) => ["analytics", "browser", month] as const,
  os: (month: number) => ["analytics", "os", month] as const,
};

export function useTotalRequestsThisMonth(month: number) {
  return useQuery({
    queryKey: analyticsKeys.total(month),
    queryFn: () => getTotalRequestsThisMonth(month),
    refetchInterval: 60_000,
  });
}

export function useRequestsTimeline(month: number) {
  return useQuery({
    queryKey: analyticsKeys.timeline(month),
    queryFn: () => getRequestsTimeline(month),
    refetchInterval: 60_000,
  });
}

export function useRequestsByRegion(month: number) {
  return useQuery({
    queryKey: analyticsKeys.region(month),
    queryFn: () => getRequestsByRegion(month),
    refetchInterval: 60_000,
  });
}

export function useRequestsByBrowser(month: number) {
  return useQuery({
    queryKey: analyticsKeys.browser(month),
    queryFn: () => getRequestsByBrowser(month),
    refetchInterval: 60_000,
  });
}

export function useRequestsByOS(month: number) {
  return useQuery({
    queryKey: analyticsKeys.os(month),
    queryFn: () => getRequestsByOS(month),
    refetchInterval: 60_000,
  });
}
