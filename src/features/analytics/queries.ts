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
  total: ["analytics", "total"] as const,
  timeline: ["analytics", "timeline"] as const,
  region: ["analytics", "region"] as const,
  browser: ["analytics", "browser"] as const,
  os: ["analytics", "os"] as const,
};

export function useTotalRequestsThisMonth() {
  return useQuery({
    queryKey: analyticsKeys.total,
    queryFn: getTotalRequestsThisMonth,
    refetchInterval: 60_000,
  });
}

export function useRequestsTimeline() {
  return useQuery({
    queryKey: analyticsKeys.timeline,
    queryFn: getRequestsTimeline,
    refetchInterval: 60_000,
  });
}

export function useRequestsByRegion() {
  return useQuery({
    queryKey: analyticsKeys.region,
    queryFn: getRequestsByRegion,
    refetchInterval: 60_000,
  });
}

export function useRequestsByBrowser() {
  return useQuery({
    queryKey: analyticsKeys.browser,
    queryFn: getRequestsByBrowser,
    refetchInterval: 60_000,
  });
}

export function useRequestsByOS() {
  return useQuery({
    queryKey: analyticsKeys.os,
    queryFn: getRequestsByOS,
    refetchInterval: 60_000,
  });
}
