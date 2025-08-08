import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Next.js build (no static export)
  trailingSlash: false,
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
  // Disable webpack caching to resolve caching errors
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
