import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 开发期：把 /api/* 代理到 3001 的 Fastify
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://localhost:3001/api/:path*" },
    ];
  },
};

export default nextConfig;
