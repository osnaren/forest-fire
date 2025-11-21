import { toolConfig } from '@/config/pages';
import { generateSEOMetadata } from '@/lib/seo';
import { ToolPage } from '@/modules/tool';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Classifier Tool',
  description: toolConfig.description,
  pathname: '/tool',
  keywords: [
    'online fire detection',
    'upload forest image',
    'wildfire classifier tool',
    'ai fire detection',
    'browser based inference',
  ],
});

export default function Tool() {
  return <ToolPage />;
}
