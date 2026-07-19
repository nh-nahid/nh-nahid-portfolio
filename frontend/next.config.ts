import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5050",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "nh-nahid.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;