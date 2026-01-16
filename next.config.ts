import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
