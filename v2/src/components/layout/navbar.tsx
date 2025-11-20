'use client';

import { Button } from '@/components/ui/button';
import { PulsingDot } from '@/components/ui/interactive-elements';
import { navConfig } from '@/config/pages';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { Menu, MoonIcon, SunIcon, X } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Enhanced scroll detection with direction
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const direction = latest > lastScrollY ? 'down' : 'up';
    const threshold = 10;

    if (Math.abs(latest - lastScrollY) > threshold) {
      setScrollDirection(direction);
      setLastScrollY(latest);
    }

    setIsScrolled(latest > threshold);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Hide navbar on scroll down (except when menu is open)
  const shouldHideNavbar = scrollDirection === 'down' && isScrolled && !isMobileMenuOpen;

  return (
    <>
      <motion.nav
        className={cn(
          'sticky top-0 z-50 transition-all duration-300 ease-out',
          'border-border/40 border-b backdrop-blur-md',
          isScrolled ? 'bg-background/80 shadow-lg shadow-black/5' : 'bg-background/60'
        )}
        initial={{ y: 0 }}
        animate={{
          y: shouldHideNavbar ? -100 : 0,
          opacity: shouldHideNavbar ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Enhanced Logo */}
            <Link href={navConfig.brand.href} className="group flex items-center space-x-3">
              <motion.div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl',
                  'shadow-lg shadow-emerald-500/25',
                  'ring-offset-background ring-2 ring-emerald-500/20 ring-offset-2'
                )}
                whileHover={{
                  scale: 1.05,
                  rotate: 5,
                  boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {navConfig.brand.logo}
              </motion.div>

              <div className="hidden sm:block">
                <motion.span
                  className={cn(
                    'font-display text-xl font-bold',
                    'from-foreground to-foreground/80 bg-linear-to-r bg-clip-text text-transparent',
                    'transition-all duration-200 group-hover:from-emerald-500 group-hover:to-emerald-600'
                  )}
                  whileHover={{ x: 2 }}
                >
                  {navConfig.brand.name}
                </motion.span>
              </div>

              <div className="sm:hidden">
                <span className="font-display text-foreground text-lg font-bold">{navConfig.brand.shortName}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-1 md:flex">
              {navConfig.main.map((item, index) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.title}
                  description={item.description}
                  isActive={pathname === item.href}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* CTA Button - Desktop */}
              <div className="hidden md:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    asChild
                    size="sm"
                    className={cn(
                      'bg-linear-to-r from-emerald-500 to-emerald-600',
                      'hover:from-emerald-600 hover:to-emerald-700',
                      'text-white shadow-lg shadow-emerald-500/25',
                      'transition-all duration-200 hover:shadow-emerald-500/40',
                      'border-0'
                    )}
                  >
                    <Link href={navConfig.cta.primary.href}>{navConfig.cta.primary.text}</Link>
                  </Button>
                </motion.div>
              </div>

              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className={cn(
                    'h-9 w-9 p-0 transition-all duration-200',
                    'hover:bg-muted hover:text-emerald-500',
                    'focus-visible:ring-emerald-500'
                  )}
                >
                  <AnimatePresence mode="wait">
                    {theme === 'dark' ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SunIcon className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MoonIcon className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className={cn(
                  'h-9 w-9 p-0 transition-all duration-200 md:hidden',
                  'hover:bg-muted hover:text-emerald-500',
                  'focus-visible:ring-emerald-500'
                )}
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

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={toggleMobileMenu}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={cn(
                'absolute top-16 right-0 left-0 z-50 md:hidden',
                'border-border/50 mx-4 rounded-2xl border',
                'bg-background/95 shadow-2xl backdrop-blur-xl'
              )}
            >
              <div className="space-y-1 p-6">
                {navConfig.mobile.map((item, index) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    label={item.title}
                    description={item.description}
                    onClick={toggleMobileMenu}
                    isActive={pathname === item.href}
                    delay={index * 0.1}
                  />
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navConfig.mobile.length * 0.1 + 0.1 }}
                  className="border-border/50 border-t pt-4"
                >
                  <Button
                    asChild
                    className={cn(
                      'w-full bg-linear-to-r from-emerald-500 to-emerald-600',
                      'hover:from-emerald-600 hover:to-emerald-700',
                      'text-white shadow-lg shadow-emerald-500/25'
                    )}
                  >
                    <Link href={navConfig.cta.primary.href} onClick={toggleMobileMenu}>
                      {navConfig.cta.primary.text}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  label,
  description,
  isActive = false,
  delay = 0,
}: {
  href: string;
  label: string;
  description?: string;
  isActive?: boolean;
  delay?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.3 }}>
      <Link href={href} className="group relative block rounded-lg px-3 py-2 transition-all duration-200">
        <motion.span
          className={cn(
            'flex items-center gap-2 text-sm font-medium transition-colors',
            isActive ? 'text-emerald-500' : 'text-muted-foreground group-hover:text-emerald-500'
          )}
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {href === '/map' && <PulsingDot size="sm" color="emerald" />}
        </motion.span>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute right-3 -bottom-1 left-3 h-0.5 rounded-full bg-linear-to-r from-emerald-400 to-emerald-500"
            layoutId="navbar-active"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-emerald-500/10 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  );
}

function MobileNavLink({
  href,
  label,
  description,
  onClick,
  isActive = false,
  delay = 0,
}: {
  href: string;
  label: string;
  description?: string;
  onClick: () => void;
  isActive?: boolean;
  delay?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay }}>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          'group flex items-center justify-between rounded-xl p-3 transition-all duration-200',
          isActive
            ? 'bg-emerald-500/10 text-emerald-500'
            : 'text-muted-foreground hover:bg-muted hover:text-emerald-500'
        )}
      >
        <div className="flex flex-col">
          <span className="flex items-center gap-2 font-medium">
            {label}
            {href === '/map' && <PulsingDot size="sm" color="emerald" />}
          </span>
          {description && <span className="text-muted-foreground mt-1 text-xs">{description}</span>}
        </div>

        <motion.div
          className={cn(
            'h-2 w-2 rounded-full transition-all duration-200',
            isActive ? 'bg-emerald-500' : 'bg-transparent group-hover:bg-emerald-500'
          )}
          whileHover={{ scale: 1.5 }}
        />
      </Link>
    </motion.div>
  );
}
