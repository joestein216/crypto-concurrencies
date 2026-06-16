import type { NextConfig } from "next";

export const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true, // Displays the exact URL and status code in your terminal
    },
  },
};
