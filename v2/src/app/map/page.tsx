import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Wildfire Map - Forest Fire Classifier v2',
  description: 'Real-time global wildfire monitoring and detection map powered by NASA FIRMS data.',
};

export default function MapPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Live Wildfire Map</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Real-time wildfire monitoring using NASA FIRMS satellite data. Track active fires and hotspots around the
            globe.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Interactive Map (Coming Soon)</CardTitle>
            <CardDescription>
              Real-time wildfire data from NASA Fire Information for Resource Management System (FIRMS)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-96 items-center justify-center rounded-lg bg-gray-800">
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600">
                  <span className="text-2xl">🗺️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Map Coming Soon</h3>
                  <p className="text-gray-400">
                    We're working on integrating NASA FIRMS data for real-time wildfire tracking.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Data Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-emerald-400">NASA FIRMS</h4>
                <p className="text-sm text-gray-300">
                  Fire Information for Resource Management System provides near real-time active fire data
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-emerald-400">MODIS & VIIRS</h4>
                <p className="text-sm text-gray-300">Satellite instruments providing thermal anomaly detection</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Frequency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-amber-400">Near Real-time</h4>
                <p className="text-sm text-gray-300">Data updated every 3-6 hours from satellite passes</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-amber-400">Global Coverage</h4>
                <p className="text-sm text-gray-300">Worldwide monitoring with detailed regional views</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
