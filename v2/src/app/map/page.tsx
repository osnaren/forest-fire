import { generateSEOMetadata } from '@/lib/seo';
import { MapWrapper } from '@/modules/map';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Live Wildfire Map',
  description: 'Real-time global wildfire monitoring and detection map powered by NASA FIRMS data.',
  pathname: '/map',
  keywords: ['live wildfire map', 'nasa firms integration', 'forest fire hotspots', 'global wildfire monitoring'],
});

export default function MapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MapWrapper />
    </div>
  );
}
