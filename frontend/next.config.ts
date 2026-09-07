import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5050",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5050",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "nh-nahid.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.nahidhossain.me",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;