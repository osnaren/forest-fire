import { useEffect, useState } from 'react';

// Type definitions for extended Navigator APIs
interface NetworkInformation {
  effectiveType: '4g' | '3g' | '2g' | 'slow-2g';
  downlink: number;
  rtt: number;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  addEventListener(type: 'levelchange', listener: () => void): void;
}

interface NavigatorWithBattery extends Navigator {
  getBattery(): Promise<BatteryManager>;
}

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  supportsHaptics: boolean;
  supportsWebGL: boolean;
  reducedMotion: boolean;
  networkSpeed: 'slow' | 'fast' | 'unknown';
  deviceMemory: number;
  pixelRatio: number;
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  orientation: 'portrait' | 'landscape';
  batteryLevel?: number;
  isLowPowerMode: boolean;
}

export default function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(() => ({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasTouch: false,
    supportsHaptics: false,
    supportsWebGL: false,
    reducedMotion: false,
    networkSpeed: 'unknown',
    deviceMemory: 4,
    pixelRatio: 1,
    screenSize: 'lg',
    orientation: 'landscape',
    isLowPowerMode: false,
  }));

  useEffect(() => {
    const updateCapabilities = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
      const isDesktop = !isMobile && !isTablet;

      // Screen size detection
      const width = window.innerWidth;
      let screenSize: DeviceCapabilities['screenSize'] = 'lg';
      if (width < 640) screenSize = 'xs';
      else if (width < 768) screenSize = 'sm';
      else if (width < 1024) screenSize = 'md';
      else if (width < 1280) screenSize = 'lg';
      else if (width < 1536) screenSize = 'xl';
      else screenSize = '2xl';

      // Network speed detection
      const connection =
        (navigator as NavigatorWithConnection).connection ||
        (navigator as NavigatorWithConnection).mozConnection ||
        (navigator as NavigatorWithConnection).webkitConnection;
      let networkSpeed: DeviceCapabilities['networkSpeed'] = 'unknown';
      if (connection) {
        const effectiveType = connection.effectiveType;
        networkSpeed = ['slow-2g', '2g', '3g'].includes(effectiveType) ? 'slow' : 'fast';
      }

      // Memory detection
      const deviceMemory = (navigator as NavigatorWithMemory).deviceMemory || 4;

      // WebGL support
      const canvas = document.createElement('canvas');
      const supportsWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));

      // Reduced motion preference
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Low power mode detection (heuristic)
      const isLowPowerMode = deviceMemory < 2 || networkSpeed === 'slow' || reducedMotion;

      setCapabilities({
        isMobile,
        isTablet,
        isDesktop,
        hasTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        supportsHaptics: 'vibrate' in navigator,
        supportsWebGL,
        reducedMotion,
        networkSpeed,
        deviceMemory,
        pixelRatio: window.devicePixelRatio || 1,
        screenSize,
        orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape',
        isLowPowerMode,
      });
    };

    updateCapabilities();

    const handleResize = () => updateCapabilities();
    const handleOrientationChange = () => {
      setTimeout(updateCapabilities, 100); // Delay to ensure dimensions are updated
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => updateCapabilities();
    mediaQuery.addEventListener('change', handleMotionChange);

    // Battery API if available
    if ('getBattery' in navigator) {
      (navigator as NavigatorWithBattery).getBattery().then((battery: BatteryManager) => {
        const updateBattery = () => {
          setCapabilities((prev) => ({
            ...prev,
            batteryLevel: battery.level,
            isLowPowerMode: prev.isLowPowerMode || battery.level < 0.2,
          }));
        };

        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return capabilities;
}
