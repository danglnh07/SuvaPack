"use client";

import { useEffect } from "react";

async function detectOS(): Promise<string> {
  // Use the modern User-Agent Client Hints API (Chromium) for accurate Windows version
  try {
    const uaData = (navigator as unknown as { userAgentData?: { platform: string; getHighEntropyValues: (keys: string[]) => Promise<Record<string, string>> } }).userAgentData;
    if (uaData?.getHighEntropyValues) {
      const hints = await uaData.getHighEntropyValues(["platformVersion"]);
      const platform = uaData.platform;

      if (platform === "Windows") {
        const v = parseFloat(hints.platformVersion as string);
        return v >= 13 ? "Windows 11" : "Windows 10";
      }
      if (platform === "macOS") return "macOS";
      if (platform === "Linux") return "Linux";
      if (platform === "Android") return "Android";
      if (platform === "iOS" || platform === "iPhone" || platform === "iPad") return "iOS";
    }
  } catch {
    // fall through to UA parsing
  }

  const ua = navigator.userAgent;
  if (ua.includes("Windows NT 10")) return "Windows 10/11";
  if (ua.includes("Windows NT 11")) return "Windows 11";
  if (ua.includes("Mac OS X")) return "macOS";
  if (ua.includes("Linux") && !ua.includes("Android")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Unknown";
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox") && !ua.includes("Seamonkey")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome") && !ua.includes("Chromium")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
  return "Unknown";
}

async function trackVisit() {
  const [os, browser] = await Promise.all([detectOS(), Promise.resolve(detectBrowser())]);

  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ os, browser }),
    });
  } catch (err) {
    console.error("Failed to track visit:", err);
  }
}

export function VisitTracker() {
  useEffect(() => {
    trackVisit();
  }, []);

  return null;
}
