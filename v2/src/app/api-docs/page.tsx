import { generateSEOMetadata } from '@/lib/seo';
import { ApiDocsPage } from '@/modules/api-docs';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = generateSEOMetadata({
  title: 'API Documentation',
  description: 'Complete API documentation for integrating wildfire detection into your applications.',
  pathname: '/api-docs',
  type: 'article',
  keywords: [
    'wildfire detection api',
    'forest fire api docs',
    'tensorflow prediction endpoint',
    'forest fire classification api',
  ],
});

export default function Page() {
  return (
    <>
      <Script id="ld-json-api-docs" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'Forest Fire Classifier API Documentation',
          description: 'Complete API documentation for integrating wildfire detection into your applications.',
          articleSection: 'API Reference',
          dependencies: 'REST API',
          proficiencyLevel: 'Beginner',
        })}
      </Script>
      <ApiDocsPage />
    </>
  );
}
