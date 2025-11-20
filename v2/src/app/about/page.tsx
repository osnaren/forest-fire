import { aboutConfig } from '@/config/pages';
import { generateSEOMetadata } from '@/lib/seo';
import { AboutPage } from '@/modules/about';
import type { Metadata } from 'next';

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
  return <AboutPage />;
}
