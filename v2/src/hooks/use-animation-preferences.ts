import { useReducedMotion } from 'motion/react';
import { useMemo } from 'react';
import useMediaQuery from './use-media-query';

/**
 * Hook to centralize animation preference logic
 * Combines user preferences with system preferences
 */
export default function useAnimationPreferences() {
  const isReducedMotion = useReducedMotion();
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)') || isReducedMotion;

  // Should animations be enabled based on both user settings and system preferences
  const shouldAnimate = useMemo(() => {
    return !prefersReducedMotion;
  }, [prefersReducedMotion]);

  return {
    prefersReducedMotion,
    shouldAnimate,
  };
}
