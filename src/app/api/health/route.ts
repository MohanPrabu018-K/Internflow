// ─── Health Check Endpoint ───────────────────────────────────────────────
// GET /api/health — returns 200 + basic status. DB check is async (best-effort).

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  let dbStatus = "unknown";

  try {
    // Dynamic import to avoid build-time database connection
    const { default: prisma } = await import("@/lib/prisma");
    await prisma.$queryRawUnsafe("SELECT 1");
    dbStatus = "connected";
  } catch {
    dbStatus = "disconnected";
  }

  return NextResponse.json(
    {
      status: dbStatus === "connected" ? "healthy" : "degraded",
      database: dbStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  );
}
