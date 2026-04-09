import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "visitors.json");

function readCount(): number {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw).count ?? 0;
  } catch {
    return 0;
  }
}

function writeCount(n: number) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify({ count: n }), "utf-8");
}

export async function GET(req: NextRequest) {
  const alreadyVisited = req.cookies.get("visited")?.value === "1";

  let count = readCount();

  if (!alreadyVisited) {
    count += 1;
    writeCount(count);
  }

  const res = NextResponse.json({ count });

  if (!alreadyVisited) {
    // 100 years in seconds
    res.cookies.set("visited", "1", {
      maxAge: 60 * 60 * 24 * 365 * 100,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return res;
}
