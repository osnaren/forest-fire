import { siteConfig } from '@/config/pages';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api', '/api/*'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
