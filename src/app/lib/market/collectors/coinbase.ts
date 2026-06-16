import type { MarketSnapshotInsert } from "../types";
import type { MarketCollector } from "./types";

export const coinbaseCollector: MarketCollector = {
  venue: "coinbase",

  async collect(pairs) {
   const snapshots = await Promise.all(pairs.map(async (pair): Promise<MarketSnapshotInsert> => {
      const raw = await fetch(`https://api.coinbase.com/api/v3/brokerage/market/product_book?product_id=${pair.pair}&limit=1`);
      const response = await raw.json();

      const bidPrice = Number(response.pricebook.bids[0].price);
      const askPrice = Number(response.pricebook.asks[0].price);
      const midPrice = Number(response.mid_market);

      const snapshot: MarketSnapshotInsert = {
        venue: "coinbase",
        source_type: "order_book",
        time_in_ms: new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), new Date().getUTCHours(), new Date().getUTCMinutes(), new Date().getUTCSeconds()).getTime(),

        base_asset: pair.baseAsset,
        quote_asset: pair.quoteAsset,
        pair: pair.pair,
        venue_symbol: response.pricebook.product_id,

        bid_price: bidPrice,
        bid_size: Number(response.pricebook.bids[0].size),
        ask_price: askPrice,
        ask_size: Number(response.pricebook.asks[0].size),
        mid_price: midPrice,
        last_trade_price: Number(response.last),

        spread_absolute: Number(response.spread_absolute),
        spread_bps: Number(response.spread_bps),

        observed_price: midPrice,
        source_observed_at: response.pricebook.time,
        order_book_depth: response.pricebook,
        raw,
        success: true,
      };

      return snapshot;
    }));

    return {
      venue: "coinbase",
      snapshots,
    };
  },
};
