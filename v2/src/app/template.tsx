'use client';

import Lenis from 'lenis';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Loading } from '@/components/ui/loading';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRenderRef = useRef(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const INITIAL_LOADER_KEY = 'ff-initial-loader-shown';
    const hasSeenInitialLoader = sessionStorage.getItem(INITIAL_LOADER_KEY);

    if (!hasSeenInitialLoader) {
      setIsTransitioning(true);
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = setTimeout(() => {
        setIsTransitioning(false);
        sessionStorage.setItem(INITIAL_LOADER_KEY, 'true');
      }, 2000);
    }

    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
      });
    }

    let rafId: number;
    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const refreshTimeout = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    }, 200);

    const handleResize = () => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(refreshTimeout);
    };
  }, [pathname]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    setIsTransitioning(true);
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1100);

    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-surface-container min-h-screen w-full"
      style={{ position: 'relative', overflowX: 'hidden', overflowY: 'auto' }}
    >
      <motion.div
        className="scroll-progress-indicator"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(to right, #22c55e, #facc15)',
          zIndex: 9999,
          scaleX,
          transformOrigin: 'left center',
        }}
      />
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-9998 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <Loading size="sm" text="Plotting the next terrain..." />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
