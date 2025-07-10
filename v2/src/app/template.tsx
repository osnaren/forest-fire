'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    });

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

    const lenisScrollCallback = (e: Lenis) => {
      if (progressBarRef.current) {
        const scrollTop = e.animatedScroll || e.scroll || 0;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = height > 0 ? scrollTop / height : 0;
        const progress = Math.max(0, Math.min(1, scrollPercent));
        progressBarRef.current.style.width = `${progress * 100}%`;
      }
      ScrollTrigger.update();
    };
    lenisRef.current.on('scroll', lenisScrollCallback);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (lenisRef.current) {
          if (arguments.length && value !== undefined) {
            lenisRef.current.scrollTo(value, { immediate: true });
          }
          return lenisRef.current.scroll || 0;
        }
        return 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    });

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0%';
    }

    const refreshTimeout = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh(true);
      if (lenisRef.current) {
        lenisScrollCallback(lenisRef.current);
      }
    }, 200);

    const secondRefreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 1000);

    const handleResize = () => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh(true);
      if (lenisRef.current) {
        lenisScrollCallback(lenisRef.current);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (lenisRef.current) {
        lenisRef.current.off('scroll', lenisScrollCallback);
      }
      clearTimeout(refreshTimeout);
      clearTimeout(secondRefreshTimeout);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.scrollerProxy(document.body);
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (progressBarRef.current && progressBarRef.current.parentNode) {
        progressBarRef.current.parentNode.removeChild(progressBarRef.current);
        progressBarRef.current = null;
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-surface-container min-h-screen w-full"
      style={{ position: 'relative', overflowX: 'hidden', overflowY: 'auto' }}
    >
      <div
        ref={progressBarRef}
        className="scroll-progress-indicator"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '4px',
          background: 'linear-gradient(to right, #22c55e, #facc15)',
          zIndex: 9999,
          width: '0%',
          transformOrigin: 'left center',
        }}
      />
      {children}
    </div>
  );
}
