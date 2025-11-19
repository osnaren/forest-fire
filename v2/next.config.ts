import type { NextConfig } from 'next';
import path from 'path';

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

  // Turbopack configuration: mirrors critical webpack behavior for dev (Turbopack) and prevents server-only modules from being bundled into client code.
  turbopack: {
    // Ensure the project root is explicit and absolute (helps monorepos / nonstandard layouts).
    root: path.join(__dirname),

    // Prevent server-only native modules from being resolved into browser bundles.
    // - Map '@tensorflow/tfjs-node' to the browser-friendly '@tensorflow/tfjs'.
    // - Map 'sharp' and node built-ins to a small browser shim to avoid bundling native code into client builds.
    resolveAlias: {
      '@tensorflow/tfjs-node': { browser: '@tensorflow/tfjs' },
      sharp: { browser: './src/lib/shims/empty-browser-shim.ts' },
      fs: { browser: './src/lib/shims/empty-browser-shim.ts' },
      path: { browser: './src/lib/shims/empty-browser-shim.ts' },
      crypto: { browser: './src/lib/shims/empty-browser-shim.ts' },
    },

    // Add loader rules that you rely on in the codebase (SVGR is safe and commonly used).
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },

    // Make sure common extensions are resolved in the same order that the rest of the toolchain expects.
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
};

export default nextConfig;
