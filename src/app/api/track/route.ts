import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function geoLookup(ip: string) {
  // Use ip-api.com as fallback (free, 45 req/min)
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return "";
    const data = await res.json();
    return data.country ?? "";
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const rawIp = forwarded?.split(",")[0]?.trim() || realIp || "127.0.0.1";

  // Vercel injects country directly via header — no external API needed
  const vercelCountry = req.headers.get("x-vercel-ip-country");
  const region = vercelCountry ?? await geoLookup(rawIp);

  const body = await req.json();
  const { os, browser } = body;

  const { error } = await supabase.from("requests").insert({
    ip: rawIp,
    os: os ?? "",
    browser: browser ?? "",
    region,
  });

  if (error) {
    console.error("Track insert error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
