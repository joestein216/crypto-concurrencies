import { NextResponse } from "next/server";
import { collectors } from "../../lib/market/collectors";
import { getPairsForVenue } from "../../lib/market/pairs";
import { insertSnapshots } from "../../lib/market/persistence/insertSnapshots";
import type { Venue } from "../../lib/market/types";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const venue = (url.searchParams.get("venue") ?? "coinbase") as Venue;

  const collector = collectors[venue];

  if (!collector) {
    return NextResponse.json({ error: "Unknown venue" }, { status: 400 });
  }

  const pairs = getPairsForVenue(venue);
  const result = await collector.collect(pairs);
  const inserted = await insertSnapshots(result.snapshots);

  return NextResponse.json({
    ok: true,
    venue,
    insertedCount: inserted?.length ?? 0,
    inserted,
  });
}
