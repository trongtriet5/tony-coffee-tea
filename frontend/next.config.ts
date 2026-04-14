import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // Remove all console.* calls from production build automatically
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  async rewrites() {
    return [
      {
        source: '/_/backend/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
};

export default nextConfig;
