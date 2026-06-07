import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", /* Testing here, must fix later */
        pathname: "/**"
      }
    ]
  },
  // experimental: {
  //   imgOptTimeoutInSeconds: 60, // Increase timeout (default is ~7s)
  //   imgOptConcurrency: 1,      // Reduce concurrency to save memory
  // },

  reactCompiler: true,
};

export default nextConfig;
