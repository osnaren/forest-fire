import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl font-display">
                Forest Fire
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                  Classifier v2
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-gray-300 sm:text-xl">
                Professional-grade wildfire detection powered by advanced machine learning. 
                Real-time forest fire classification from images with near-instant results.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Try Detection Tool
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link href="/api-docs">View API Docs</Link>
              </Button>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-emerald-400">~500ms</div>
                  <div className="text-sm text-gray-400">Average Processing Time</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-emerald-400">94.2%</div>
                  <div className="text-sm text-gray-400">Classification Accuracy</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-emerald-400">4 Classes</div>
                  <div className="text-sm text-gray-400">Fire, Smoke, Smoke+Fire, No Fire</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl font-display">
              Advanced Detection Capabilities
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              From research prototype to production-ready system, our classifier 
              delivers reliable wildfire detection for any application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🔥</span>
                </div>
                <CardTitle>Real-time Detection</CardTitle>
                <CardDescription>
                  Instant wildfire classification with sub-second response times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Process images in real-time with our optimized TensorFlow.js model, 
                  running directly in your browser or via our API.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🧠</span>
                </div>
                <CardTitle>Advanced ML Model</CardTitle>
                <CardDescription>
                  MobileNet-based CNN optimized for accuracy and speed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Our model distinguishes between fire, smoke, combined scenarios, 
                  and non-fire images with high precision and recall.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🌐</span>
                </div>
                <CardTitle>Flexible Deployment</CardTitle>
                <CardDescription>
                  Client-side inference or server-side API - your choice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Run predictions directly in the browser for privacy, or use our 
                  rate-limited API for server-side applications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl font-display">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-400">
              Start detecting wildfires in your images today. No account required for the demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Launch Detection Tool
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link href="/research">View Research</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
