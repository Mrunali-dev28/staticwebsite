import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.contentstack.io', 'eu-images.contentstack.com', 'assets.contentstack.io']
  },
  // Add turbopack configuration (replacing deprecated experimental.turbo)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
