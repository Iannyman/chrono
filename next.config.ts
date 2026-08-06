import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["172.23.10.20"],
};

export default nextConfig;
