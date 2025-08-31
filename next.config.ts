import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ESLint configuration options
    ignoreDuringBuilds: true,
  },

   async headers() {
    return [
      {
        source: "/(.*)", // all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://nova-tech-psi.vercel.app https://*.e2b.dev;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
