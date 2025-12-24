import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Placeholder images during development
    unoptimized: process.env.NODE_ENV === "development",
  },
  // Experimental features for performance
  experimental: {
    optimizePackageImports: ["@prisma/client"],
  },
};

export default nextConfig;
