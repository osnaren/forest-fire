'use client';

import { PulsingDot } from '@/components/ui/interactive-elements';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900/90 border-t border-gray-800/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and description */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="group flex items-center space-x-2">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25"
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm font-bold text-white">🔥</span>
              </motion.div>
              <span className="font-display text-lg font-bold text-white transition-colors group-hover:text-emerald-400">
                Forest Fire Classifier
              </span>
            </Link>
            <p className="max-w-sm text-sm text-gray-400">
              Real-time wildfire detection powered by advanced machine learning. From research to production.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <PulsingDot size="sm" color="emerald" />
              <span>Model v1.0</span>
              <span>•</span>
              <Link href="/about#model" className="transition-colors hover:text-emerald-400">
                Learn more
              </Link>
            </div>
          </motion.div>

          {/* Navigation links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-white">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <FooterLink href="/">Home</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">About</FooterLink>
              </li>
              <li>
                <FooterLink href="/research">Research</FooterLink>
              </li>
              <li>
                <FooterLink href="/map">Live Wildfire Map</FooterLink>
              </li>
              <li>
                <FooterLink href="/api-docs">API Documentation</FooterLink>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <ComingSoonLink>Research Paper</ComingSoonLink>
              </li>
              <li>
                <ComingSoonLink>Kaggle Dataset</ComingSoonLink>
              </li>
              <li>
                <ComingSoonLink>GitHub Repository</ComingSoonLink>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <PulsingDot size="sm" color="amber" />
                  <FooterLink href="/api-docs">API Documentation</FooterLink>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-between border-t border-gray-800/50 pt-8 sm:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-400">
            © 2025 Forest Fire Classifier. Built with Next.js, TensorFlow.js, and Tailwind CSS.
          </p>
          <div className="mt-4 flex items-center gap-2 sm:mt-0">
            <span className="text-xs text-gray-500">Made with</span>
            <motion.span
              className="text-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              ❤️
            </motion.span>
            <span className="text-xs text-gray-500">for wildfire prevention</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group flex items-center gap-1 text-gray-400 transition-colors hover:text-emerald-400">
      <span className="transition-transform duration-200 group-hover:translate-x-1">{children}</span>
    </Link>
  );
}

function ComingSoonLink({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="cursor-not-allowed text-gray-500">{children}</span>
      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-400">Coming Soon</span>
    </div>
  );
}
