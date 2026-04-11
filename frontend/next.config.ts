import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // Remove all console.* calls from production build automatically
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
