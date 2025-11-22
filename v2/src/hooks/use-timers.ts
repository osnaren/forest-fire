import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for managing multiple timers with automatic cleanup
 * Provides utilities for creating, tracking, and cleaning up timeouts and intervals
 */
export default function useTimers() {
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  }, []);

  // Clear all intervals
  const clearAllIntervals = useCallback(() => {
    intervalsRef.current.forEach((interval) => clearInterval(interval));
    intervalsRef.current = [];
  }, []);

  // Clear all timers
  const clearAll = useCallback(() => {
    clearAllTimeouts();
    clearAllIntervals();
  }, [clearAllTimeouts, clearAllIntervals]);

  // Add a timeout with automatic tracking
  const addTimeout = useCallback((callback: () => void, delay: number): NodeJS.Timeout => {
    const timeout = setTimeout(() => {
      // Remove from tracking array when it executes
      timeoutsRef.current = timeoutsRef.current.filter((t) => t !== timeout);
      callback();
    }, delay);

    // Add to tracking array
    timeoutsRef.current.push(timeout);
    return timeout;
  }, []);

  // Add an interval with automatic tracking
  const addInterval = useCallback((callback: () => void, delay: number): NodeJS.Timeout => {
    const interval = setInterval(callback, delay);
    intervalsRef.current.push(interval);
    return interval;
  }, []);

  // Remove a specific timeout
  const removeTimeout = useCallback((timeout: NodeJS.Timeout) => {
    clearTimeout(timeout);
    timeoutsRef.current = timeoutsRef.current.filter((t) => t !== timeout);
  }, []);

  // Remove a specific interval
  const removeInterval = useCallback((interval: NodeJS.Timeout) => {
    clearInterval(interval);
    intervalsRef.current = intervalsRef.current.filter((i) => i !== interval);
  }, []);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      clearAll();
    };
  }, [clearAll]);

  return {
    addTimeout,
    addInterval,
    removeTimeout,
    removeInterval,
    clearAllTimeouts,
    clearAllIntervals,
    clearAll,
  };
}
