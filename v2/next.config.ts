import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // External packages to be bundled natively (moved from experimental in Next.js 15)
  serverExternalPackages: ['@tensorflow/tfjs-node', 'sharp'],

  // Configure image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      {
        source: '/model/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Webpack configuration for TensorFlow.js
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Optimize TensorFlow.js for server-side
      config.externals = config.externals || [];
      config.externals.push('@tensorflow/tfjs-node');
    } else {
      // Optimize for client-side bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },

  // Output configuration for Vercel deployment
  output: 'standalone',

  // Enable compression
  compress: true,

  // Enable strict mode
  reactStrictMode: true,

  // TypeScript configuration
  typescript: {
    // Don't fail build on type errors in dev
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },

  // ESLint configuration
  eslint: {
    // Don't fail build on lint errors in dev
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
