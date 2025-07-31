import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export for development
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.contentstack.io', 'eu-images.contentstack.com', 'assets.contentstack.io']
  },
  // Add experimental features for better development experience
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
