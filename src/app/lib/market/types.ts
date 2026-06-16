export type Venue = "robinhood" | "coinbase" | "gemini" | "bitstamp";

export type SourceType =
  | "execution_quote"
  | "order_book"
  | "ticker"
  | "spot"
  | "mock";

export type MarketPair = {
  baseAsset: string;
  quoteAsset: string;
  pair: string;        // BTC-USD
  venueSymbol: string; // BTCUSD, BTC-USD, etc.
};

export type MarketSnapshotInsert = {
  venue: Venue;
  source_type: SourceType;
  time_in_ms: number;

  base_asset: string;
  quote_asset: string;
  pair: string;
  venue_symbol?: string;

  reference_price?: number;
  bid_price?: number;
  bid_size?: number;
  ask_price?: number;
  ask_size?: number;
  mid_price?: number;
  last_trade_price?: number;

  spread_absolute?: number;
  spread_bps?: number;

  quoted_quantity?: number;
  estimated_buy_price?: number;
  estimated_sell_price?: number;
  estimated_buy_cost?: number;
  estimated_sell_credit?: number;
  estimated_fee_rate?: number;
  estimated_buy_fee?: number;
  estimated_sell_fee?: number;
  fee_included?: boolean;

  volume_24h?: number;
  vwap_24h?: number;
  high_24h?: number;
  low_24h?: number;
  open_24h?: number;

  source_observed_at?: string;
  latency_ms?: number;

  success?: boolean;
  error_message?: string;

  observed_price?: number;
  order_book_depth?: unknown;
  raw?: unknown;
};
