'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { MoonIcon, SunIcon } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-charcoal-900/80 sticky top-0 z-50 border-b border-gray-800 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and home link */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
              <span className="text-sm font-bold text-white">🔥</span>
            </div>
            <span className="font-display text-xl font-bold text-white">Forest Fire Classifier</span>
          </Link>

          {/* Navigation links */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link href="/" className="text-gray-300 transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 transition-colors hover:text-white">
              About
            </Link>
            <Link href="/research" className="text-gray-300 transition-colors hover:text-white">
              Research
            </Link>
            <Link href="/map" className="text-gray-300 transition-colors hover:text-white">
              Live Map
            </Link>
            <Link href="/api-docs" className="text-gray-300 transition-colors hover:text-white">
              API Docs
            </Link>
          </div>

          {/* Dark mode toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-9 w-9 p-0">
            {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
