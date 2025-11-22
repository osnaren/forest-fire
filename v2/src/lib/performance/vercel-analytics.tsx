'use client';

import { Analytics } from '@vercel/analytics/react';

/**
 * VercelAnalytics component provides anonymous usage analytics
 * for production environments using Vercel's Analytics.
 *
 * This works alongside Speed Insights to give a complete picture
 * of user behavior and application performance.
 */
export default function VercelAnalytics() {
  return <Analytics />;
}
