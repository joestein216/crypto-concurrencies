import type { MarketPair, Venue } from "./types";

const assets = ["BTC", "ETH", "SOL", "DOGE", "XRP"];

export function getPairsForVenue(venue: Venue): MarketPair[] {
  return assets.map((asset) => ({
    baseAsset: asset,
    quoteAsset: "USD",
    pair: `${asset}-USD`,
    venueSymbol: toVenueSymbol(venue, asset),
  }));
}

function toVenueSymbol(venue: Venue, asset: string): string {
  switch (venue) {
    case "coinbase":
    case "robinhood":
      return `${asset}-USD`;
    case "gemini":
    case "bitstamp":
      return `${asset.toLowerCase()}usd`;
    default:
      return `${asset}-USD`;
  }
}
