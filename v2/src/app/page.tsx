import { homeConfig } from '@/config/pages';
import { generateSEOMetadata } from '@/lib/seo';
import { HomePage } from '@/modules/home';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Home',
  description: homeConfig.hero.description,
  pathname: '/',
  keywords: [
    'wildfire detection tool',
    'forest fire classifier',
    'tensorflow.js demo',
    'environmental ai',
    'disaster response technology',
  ],
  image: '/og.png',
});

export default function Home() {
  return (
    <>
      <Script id="ld-json-home" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Forest Fire Classifier',
          description: homeConfig.hero.description,
          url: 'https://forestfire.osnaren.com',
        })}
      </Script>
      <HomePage />
    </>
  );
}
