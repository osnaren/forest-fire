'use client';

import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
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
      {children}
    </div>
  );
}
