import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import type { MarketSnapshotInsert } from "../types";

export async function insertSnapshots(snapshots: MarketSnapshotInsert[]) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const { data, error } = await supabase
    .from("market_snapshots")
    .insert(snapshots)
    .select("id, venue, pair, observed_price, collected_at");

  if (error) {
    throw error;
  }

  return data;
}
