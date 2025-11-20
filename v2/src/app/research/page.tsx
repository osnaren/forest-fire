import { generateSEOMetadata } from '@/lib/seo';
import { ResearchPage } from '@/modules/research';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Research',
  description: 'Explore the research, datasets, and methodologies behind our wildfire detection system.',
  pathname: '/research',
  type: 'article',
  keywords: [
    'wildfire detection research',
    'forest fire datasets',
    'machine learning methodology',
    'convolutional neural networks wildfire',
    'learning without forgetting',
  ],
});

export default function Page() {
  return <ResearchPage />;
}
