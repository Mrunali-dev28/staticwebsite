import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Next.js build (supports API routes)
  trailingSlash: false,
  images: {
    unoptimized: true,
    domains: ['images.contentstack.io', 'eu-images.contentstack.com', 'assets.contentstack.io']
  },
  // Add experimental features for better caching
  experimental: {
    // Enable ISR with better caching
    workerThreads: false,
    cpus: 1
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
