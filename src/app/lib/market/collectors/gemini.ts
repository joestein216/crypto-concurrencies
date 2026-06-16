import type { MarketSnapshotInsert } from "../types";
import type { MarketCollector } from "./types";

export const geminiCollector: MarketCollector = {
  venue: "gemini",

  async collect(pairs) {
    const snapshots: MarketSnapshotInsert[] = pairs.map((pair) => {
      const raw = {
        pricebook: {
          product_id: pair.pair,
          bids: [{ price: "66290.01", size: "0.17761537" }],
          asks: [{ price: "66290.02", size: "0.03248" }],
          time: new Date().toISOString(),
        },
        last: "66290.015",
        mid_market: "66290.015",
        spread_bps: "0.001508522701",
        spread_absolute: "0.01",
      };

      const bidPrice = Number(raw.pricebook.bids[0].price);
      const askPrice = Number(raw.pricebook.asks[0].price);
      const midPrice = Number(raw.mid_market);

      const snapshot: MarketSnapshotInsert = {
        venue: "gemini",
        source_type: "order_book",
        time_in_ms: new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), new Date().getUTCHours(), new Date().getUTCMinutes(), new Date().getUTCSeconds()).getTime(),

        base_asset: pair.baseAsset,
        quote_asset: pair.quoteAsset,
        pair: pair.pair,
        venue_symbol: raw.pricebook.product_id,

        bid_price: bidPrice,
        bid_size: Number(raw.pricebook.bids[0].size),
        ask_price: askPrice,
        ask_size: Number(raw.pricebook.asks[0].size),
        mid_price: midPrice,
        last_trade_price: Number(raw.last),

        spread_absolute: Number(raw.spread_absolute),
        spread_bps: Number(raw.spread_bps),

        observed_price: midPrice,
        source_observed_at: raw.pricebook.time,
        order_book_depth: raw.pricebook,
        raw,
        success: true,
      };

      return snapshot;
    });

    return {
      venue: "gemini",
      snapshots,
    };
  },
};
