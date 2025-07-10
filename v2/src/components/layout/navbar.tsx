'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { MoonIcon, SunIcon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PulsingDot } from '@/components/ui/interactive-elements';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-charcoal-900/80 backdrop-blur-md border-b border-gray-800/50' 
            : 'bg-charcoal-900/60 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and home link */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div 
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)"
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm font-bold text-white">🔥</span>
              </motion.div>
              <span className="font-display text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                Forest Fire Classifier
              </span>
            </Link>

            {/* Navigation links - Desktop */}
            <div className="hidden items-center space-x-8 md:flex">
              <NavLink href="/" label="Home" />
              <NavLink href="/about" label="About" />
              <NavLink href="/research" label="Research" />
              <NavLink href="/map" label="Live Map" hasIndicator />
              <NavLink href="/api-docs" label="API Docs" />
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              {/* Dark mode toggle */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleTheme} 
                  className="h-9 w-9 p-0 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {theme === 'dark' ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SunIcon className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MoonIcon className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </motion.div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="h-9 w-9 p-0 md:hidden hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-charcoal-900/95 backdrop-blur-md border-b border-gray-800/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <MobileNavLink href="/" label="Home" onClick={toggleMobileMenu} />
              <MobileNavLink href="/about" label="About" onClick={toggleMobileMenu} />
              <MobileNavLink href="/research" label="Research" onClick={toggleMobileMenu} />
              <MobileNavLink href="/map" label="Live Map" onClick={toggleMobileMenu} hasIndicator />
              <MobileNavLink href="/api-docs" label="API Docs" onClick={toggleMobileMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, label, hasIndicator = false }: { href: string; label: string; hasIndicator?: boolean }) {
  return (
    <Link href={href} className="relative group">
      <motion.span 
        className="text-gray-300 transition-colors group-hover:text-emerald-400 flex items-center gap-2"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {label}
        {hasIndicator && <PulsingDot size="sm" color="emerald" />}
      </motion.span>
      <motion.div
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}

function MobileNavLink({ 
  href, 
  label, 
  onClick, 
  hasIndicator = false 
}: { 
  href: string; 
  label: string; 
  onClick: () => void; 
  hasIndicator?: boolean 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        href={href} 
        onClick={onClick}
        className="flex items-center justify-between py-2 text-gray-300 hover:text-emerald-400 transition-colors"
      >
        <span className="flex items-center gap-2">
          {label}
          {hasIndicator && <PulsingDot size="sm" color="emerald" />}
        </span>
        <motion.div
          className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.5 }}
        />
      </Link>
    </motion.div>
  );
}
