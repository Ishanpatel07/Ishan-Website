import { NextRequest, NextResponse } from "next/server";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL!;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function redis<T = unknown>(command: string[]): Promise<T> {
  const res = await fetch(
    `${REDIS_URL}/${command.map(encodeURIComponent).join("/")}`,
    {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`Redis error: ${res.status}`);
  const data = await res.json();
  return data.result as T;
}

// Simple IP-based rate limit: max 5 requests per minute per IP
async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rl:${ip}`;
  const count = await redis<number>(["INCR", key]);
  if (count === 1) {
    // Set 60s expiry on first request
    await redis(["EXPIRE", key, "60"]);
  }
  return count > 5;
}

export async function GET(req: NextRequest) {
  // Get real IP (Vercel sets x-forwarded-for)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";

  if (await isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const alreadyVisited = req.cookies.get("visited")?.value === "1";

  let count: number;

  if (!alreadyVisited) {
    count = await redis<number>(["INCR", "visitor_count"]);
  } else {
    const raw = await redis<string>(["GET", "visitor_count"]);
    count = parseInt(String(raw)) || 1;
  }

  const res = NextResponse.json({ count });

  if (!alreadyVisited) {
    res.cookies.set("visited", "1", {
      maxAge: 60 * 60 * 24 * 365 * 100,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  return res;
}
