import { generateSEOMetadata } from '@/lib/seo';
import { ApiDocsPage } from '@/modules/api-docs';
import type { Metadata } from 'next';

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
  return <ApiDocsPage />;
}
