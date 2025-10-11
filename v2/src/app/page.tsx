import { homeConfig } from '@/config/pages';
import { generateSEOMetadata } from '@/lib/seo';
import { HomePage } from '@/modules/home';
import type { Metadata } from 'next';

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
