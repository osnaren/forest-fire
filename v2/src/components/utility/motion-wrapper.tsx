'use client';

import { motion, MotionProps } from 'motion/react';
import { useEffect, useState } from 'react';

interface MotionWrapperProps extends MotionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  as?: keyof typeof motion;
}

/**
 * A wrapper for motion components that handles SSR hydration properly.
 * Prevents mismatches between server and client rendering.
 */
export function MotionWrapper({ children, fallback, as = 'div', ...motionProps }: MotionWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionComponent = motion[as] as any;

  if (!isMounted) {
    return fallback || <div>{children}</div>;
  }

  return <MotionComponent {...motionProps}>{children}</MotionComponent>;
}
