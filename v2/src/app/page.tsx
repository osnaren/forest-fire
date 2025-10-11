import { homeConfig } from '@/config/pages';
import { generateSEOMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { HomePage } from '@/modules/home';

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
  image: '/logo/logo.png',
});

export default function Home() {
  return <HomePage />;
}
