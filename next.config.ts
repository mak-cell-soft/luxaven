import type { NextConfig } from "next";
import path from "path";

// LUXAVÉN Next.js configuration
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
  // Redirect root path to default locale /fr
  async redirects() {
    return [
      {
        source: '/',
        destination: '/fr',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
