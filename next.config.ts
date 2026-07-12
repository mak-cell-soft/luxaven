import type { NextConfig } from "next";
import path from "path";

// Darilux Next.js configuration
const nextConfig: NextConfig = {
  // Silence workspace root Turbopack warning by setting the root explicitly
  turbopack: {
    root: path.join(__dirname),
  },
  // Allow loading images from Unsplash and other external sources
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
