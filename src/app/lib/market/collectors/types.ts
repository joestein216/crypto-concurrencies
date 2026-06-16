import type { MarketPair, MarketSnapshotInsert, Venue } from "../types";

export type CollectorResult = {
  venue: Venue;
  snapshots: MarketSnapshotInsert[];
};

export interface MarketCollector {
  venue: Venue;
  collect(pairs: MarketPair[]): Promise<CollectorResult>;
}
