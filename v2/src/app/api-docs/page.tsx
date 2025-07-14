import { ApiDocsPage } from '@/modules/api-docs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation - Forest Fire Classifier v2',
  description: 'Complete API documentation for integrating wildfire detection into your applications.',
};

export default function Page() {
  return <ApiDocsPage />;
}
