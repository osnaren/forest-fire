import { aboutConfig } from '@/config/pages';
import { generateSEOMetadata } from '@/lib/seo';
import { AboutPage } from '@/modules/about';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = generateSEOMetadata({
  title: 'About',
  description: aboutConfig.hero.description,
  pathname: '/about',
  type: 'article',
  keywords: [
    'forest fire project story',
    'wildfire detection research',
    'environmental technology case study',
    'about forest fire classifier',
    '6th semester project',
  ],
});

export default function Page() {
  return (
    <>
      <Script id="ld-json-about" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          mainEntity: {
            '@type': 'Person',
            name: 'Obuli Sai Naren',
            sameAs: ['https://github.com/osnaren', 'https://linkedin.com/in/osnaren', 'https://x.com/osnaren'],
          },
        })}
      </Script>
      <AboutPage />
    </>
  );
}
