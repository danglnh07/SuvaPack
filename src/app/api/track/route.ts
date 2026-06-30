import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function geoLookup(ip: string) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { ip, region: "" };
    const data = await res.json();
    return { ip, region: data.country_name ?? data.region ?? "" };
  } catch {
    return { ip, region: "" };
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

  const body = await req.json();
  const { os, browser } = body;

  const { ip, region } = await geoLookup(rawIp);

  const { error } = await supabase.from("requests").insert({
    ip,
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
