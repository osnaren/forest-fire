import { generateSEOMetadata } from '@/lib/seo';
import { ResearchPage } from '@/modules/research';
import type { Metadata } from 'next';
import Script from 'next/script';

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
  return (
    <>
      <Script id="ld-json-research" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ScholarlyArticle',
          headline: 'Forest fire and smoke detection using deep learning-based learning without forgetting',
          author: {
            '@type': 'Person',
            name: 'Obuli Sai Naren',
          },
          datePublished: '2023-01-01',
          image: '/og.png',
          publisher: {
            '@type': 'Organization',
            name: 'Fire Ecology',
            logo: {
              '@type': 'ImageObject',
              url: 'https://fireecology.springeropen.com/static/images/brand-logo-fire-ecology.svg',
            },
          },
        })}
      </Script>
      <ResearchPage />
    </>
  );
}
