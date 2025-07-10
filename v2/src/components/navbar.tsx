"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-charcoal-900/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and home link */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">🔥</span>
            </div>
            <span className="font-display text-xl font-bold text-white">
              Forest Fire Classifier
            </span>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link 
              href="/research" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Research
            </Link>
            <Link 
              href="/map" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Live Map
            </Link>
            <Link 
              href="/api-docs" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              API Docs
            </Link>
          </div>

          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-9 w-9 p-0"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
