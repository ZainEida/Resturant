import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "zerolounge.link" },
      { protocol: "https", hostname: "modo3.com" },
      { protocol: "https", hostname: "goldenmeal.jo" },
      { protocol: "https", hostname: "images.deliveryhero.io" },
    ],
  },
};

export default nextConfig;
