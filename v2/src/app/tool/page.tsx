import { siteConfig, toolConfig } from '@/config/pages';
import { generateSEOMetadata } from '@/lib/seo';
import { ToolPage } from '@/modules/tool';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = generateSEOMetadata({
  title: toolConfig.title,
  description: toolConfig.description,
  pathname: '/tool',
  keywords: [
    'wildfire image classifier',
    'forest fire prediction tool',
    'upload fire detection',
    'ai wildfire assessment',
  ],
  type: 'article',
});

export default function Tool() {
  return (
    <>
      <Script id="ld-json-software" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: toolConfig.title,
          description: toolConfig.description,
          operatingSystem: 'Any modern browser',
          applicationCategory: 'WebApplication',
          url: `${siteConfig.url}/tool`,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        })}
      </Script>
      <ToolPage />
    </>
  );
}
