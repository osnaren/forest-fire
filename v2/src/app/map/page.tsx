import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: 'Live Wildfire Map - Forest Fire Classifier v2',
  description: 'Real-time global wildfire monitoring and detection map powered by NASA FIRMS data.',
};

export default function MapPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display">
            Live Wildfire Map
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time wildfire monitoring using NASA FIRMS satellite data. 
            Track active fires and hotspots around the globe.
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
            <div className="h-96 bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
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

        <div className="grid md:grid-cols-2 gap-8">
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
                <p className="text-sm text-gray-300">
                  Satellite instruments providing thermal anomaly detection
                </p>
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
                <p className="text-sm text-gray-300">
                  Data updated every 3-6 hours from satellite passes
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-amber-400">Global Coverage</h4>
                <p className="text-sm text-gray-300">
                  Worldwide monitoring with detailed regional views
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
