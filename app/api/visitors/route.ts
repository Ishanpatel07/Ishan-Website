import { NextRequest, NextResponse } from "next/server";

const URL = process.env.UPSTASH_REDIS_REST_URL!;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function redis(command: string[]) {
  const res = await fetch(`${URL}/${command.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });
  const data = await res.json();
  return data.result;
}

export async function GET(req: NextRequest) {
  const alreadyVisited = req.cookies.get("visited")?.value === "1";

  let count: number;

  if (!alreadyVisited) {
    // Atomically increment and get new value
    count = await redis(["INCR", "visitor_count"]);
  } else {
    count = await redis(["GET", "visitor_count"]);
    count = parseInt(count) || 1;
  }

  const res = NextResponse.json({ count });

  if (!alreadyVisited) {
    res.cookies.set("visited", "1", {
      maxAge: 60 * 60 * 24 * 365 * 100,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return res;
}
