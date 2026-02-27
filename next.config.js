/**
 * Next.js Configuration
 * Optimized for production deployment
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output for containerized deployment
  output: 'standalone',

  // React optimization
  reactStrictMode: true,

  // Skip ESLint and TypeScript errors during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization
  images: {
    unoptimized: true,
  },

  // Bundle analysis (optional)
  webpack: (config, options) => {
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          enabled: process.env.ANALYZE === 'true',
        })
      );
    }
    return config;
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_CANVAS_DEBUG: process.env.NEXT_PUBLIC_CANVAS_DEBUG || 'false',
  },
};

module.exports = nextConfig;
