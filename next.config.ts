import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint configuration options
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
