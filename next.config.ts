import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/@:username",
        destination: "/profile/:username",
      },
      {
        source: "/@:username/:slug",
        destination: "/profile/:username/:slug",
      },
      {
        source: "/@:username/settings",
        destination: "/profile/:username/settings",
      },
    ];
  },
};

export default nextConfig;
