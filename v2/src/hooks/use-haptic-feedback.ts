import { useCallback, useEffect, useState } from 'react';

export type HapticPattern =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'selection'
  | 'impact'
  | 'notification'
  | 'success'
  | 'warning'
  | 'error'
  | 'heartbeat'
  | 'pulse'
  | 'countdown'
  | 'celebration';

interface HapticConfig {
  duration?: number;
  pattern?: number[];
  intensity?: number;
}

// Haptic patterns for different events
const HAPTIC_PATTERNS: Record<HapticPattern, HapticConfig> = {
  light: { duration: 50, intensity: 0.3 },
  medium: { duration: 100, intensity: 0.6 },
  heavy: { duration: 200, intensity: 1.0 },
  selection: { duration: 30, intensity: 0.2 },
  impact: { duration: 80, intensity: 0.8 },
  notification: { pattern: [50, 50, 100], intensity: 0.5 },
  success: { pattern: [100, 50, 100, 50, 200], intensity: 0.7 },
  warning: { pattern: [200, 100, 200], intensity: 0.8 },
  error: { pattern: [150, 75, 150, 75, 300], intensity: 0.9 },
  heartbeat: { pattern: [100, 100, 150, 200], intensity: 0.6 },
  pulse: { pattern: [80, 80, 80, 80], intensity: 0.4 },
  countdown: { pattern: [50, 150, 50, 150, 50, 150], intensity: 0.5 },
  celebration: { pattern: [100, 50, 100, 50, 100, 50, 200, 100, 200], intensity: 0.8 },
};

interface HapticCapabilities {
  hasVibration: boolean;
  hasVibrationAPI: boolean;
  hasGamepadHaptics: boolean;
  isMobile: boolean;
  canVibrate: boolean;
}

export default function useHapticFeedback() {
  const isHapticEnabled = true;
  const [capabilities, setCapabilities] = useState<HapticCapabilities>({
    hasVibration: false,
    hasVibrationAPI: false,
    hasGamepadHaptics: false,
    isMobile: false,
    canVibrate: false,
  });

  // Detect haptic capabilities on mount
  useEffect(() => {
    const detectCapabilities = (): HapticCapabilities => {
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hasVibrationAPI = 'vibrate' in navigator;
      const hasGamepadHaptics = 'getGamepads' in navigator;

      // Check if device can actually vibrate
      const canVibrate =
        hasVibrationAPI &&
        (isMobile ||
          // Some desktop browsers support vibration through connected controllers
          hasGamepadHaptics);

      return {
        hasVibration: canVibrate,
        hasVibrationAPI,
        hasGamepadHaptics,
        isMobile,
        canVibrate,
      };
    };

    setCapabilities(detectCapabilities());
  }, []);

  // Trigger haptic feedback
  const triggerHaptic = useCallback(
    async (
      pattern: HapticPattern,
      options?: {
        intensity?: number;
        delay?: number;
        repeat?: number;
      }
    ) => {
      if (!isHapticEnabled || !capabilities.canVibrate) return;

      const config = HAPTIC_PATTERNS[pattern];
      const intensity = options?.intensity ?? config.intensity ?? 0.5;
      const delay = options?.delay ?? 0;
      const repeat = options?.repeat ?? 1;

      const executeHaptic = async () => {
        try {
          // Use Web Vibration API if available
          if (capabilities.hasVibrationAPI && navigator.vibrate) {
            if (config.pattern) {
              // Use pattern-based vibration
              const scaledPattern = config.pattern.map((duration) => Math.round(duration * intensity));
              navigator.vibrate(scaledPattern);
            } else if (config.duration) {
              // Use duration-based vibration
              const scaledDuration = Math.round(config.duration * intensity);
              navigator.vibrate(scaledDuration);
            }
          }

          // Try gamepad haptics for supported devices
          if (capabilities.hasGamepadHaptics && 'getGamepads' in navigator) {
            const gamepads = navigator.getGamepads();
            for (const gamepad of gamepads) {
              if (gamepad?.vibrationActuator) {
                const duration = config.duration || 100;
                await gamepad.vibrationActuator.playEffect('dual-rumble', {
                  duration: duration * intensity,
                  strongMagnitude: intensity,
                  weakMagnitude: intensity * 0.7,
                });
              }
            }
          }
        } catch (error) {
          console.warn('Haptic feedback failed:', error);
        }
      };

      // Execute with delay if specified
      if (delay > 0) {
        setTimeout(executeHaptic, delay);
      } else {
        await executeHaptic();
      }

      // Handle repeats
      if (repeat > 1) {
        for (let i = 1; i < repeat; i++) {
          setTimeout(executeHaptic, delay + i * (config.duration || 100) * 1.5);
        }
      }
    },
    [isHapticEnabled, capabilities]
  );

  // Trigger haptic sequence
  const triggerHapticSequence = useCallback(
    async (
      sequence: Array<{
        pattern: HapticPattern;
        delay?: number;
        options?: Parameters<typeof triggerHaptic>[1];
      }>
    ) => {
      if (!isHapticEnabled || !capabilities.canVibrate) return;

      for (const { pattern, delay = 0, options } of sequence) {
        await new Promise((resolve) => {
          setTimeout(() => {
            triggerHaptic(pattern, options);
            resolve(void 0);
          }, delay);
        });
      }
    },
    [triggerHaptic, isHapticEnabled, capabilities]
  );

  // Convenience methods for common patterns
  const hapticFeedback = {
    // UI Interactions
    tap: () => triggerHaptic('light'),
    select: () => triggerHaptic('selection'),
    press: () => triggerHaptic('medium'),
    longPress: () => triggerHaptic('heavy'),

    // Game Events
    letterStrike: () => triggerHaptic('impact'),
    counting: () => triggerHaptic('pulse'),
    resultReveal: () => triggerHaptic('celebration'),
    badgeUnlock: () => triggerHaptic('success'),

    // Feedback States
    success: () => triggerHaptic('success'),
    error: () => triggerHaptic('error'),
    warning: () => triggerHaptic('warning'),
    notification: () => triggerHaptic('notification'),

    // Special Effects
    heartbeat: () => triggerHaptic('heartbeat'),
    countdown: () => triggerHaptic('countdown'),
    celebration: () => triggerHaptic('celebration'),
  };

  // Test haptic functionality
  const testHaptic = useCallback(async () => {
    if (!capabilities.canVibrate) {
      console.warn('Haptic feedback not available on this device');
      return false;
    }

    try {
      await triggerHaptic('medium');
      return true;
    } catch (error) {
      console.warn('Haptic test failed:', error);
      return false;
    }
  }, [capabilities, triggerHaptic]);

  return {
    triggerHaptic,
    triggerHapticSequence,
    hapticFeedback,
    testHaptic,
    capabilities,
    isEnabled: isHapticEnabled,
    isSupported: capabilities.canVibrate,
  };
}
