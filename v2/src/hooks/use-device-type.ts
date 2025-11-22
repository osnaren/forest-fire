import { useMemo } from 'react';
import useMediaQuery from './use-media-query';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * Hook to determine the current device type based on screen size
 * @returns The current device type (mobile, tablet, or desktop)
 */
export default function useDeviceType(): DeviceType {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');

  return useMemo(() => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  }, [isMobile, isTablet]);
}
