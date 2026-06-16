import type { Venue } from "../types";
import type { MarketCollector } from "./types";
import { coinbaseCollector } from "./coinbase";
import { geminiCollector } from "./gemini";
import { bitstampCollector } from "./bitstamp";
import { robinhoodCollector } from "./robinhood";

export const collectors: Record<Venue, MarketCollector> = {
  coinbase: coinbaseCollector,
  gemini: geminiCollector,
  bitstamp: bitstampCollector,
  robinhood: robinhoodCollector,
};
