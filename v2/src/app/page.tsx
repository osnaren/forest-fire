import { AnimatedGroup } from '@/components/ui/animated-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BackgroundEffect,
  FloatingElement,
  GlowingButton,
  PulsingDot,
  StatCounter,
} from '@/components/ui/interactive-elements';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effect */}
      <BackgroundEffect />

      {/* Hero Section */}
      <section className="relative px-4 py-24 sm:py-32 lg:py-40">
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <AnimatedGroup preset="blur-slide" className="space-y-8">
            {/* Status Badge */}
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 backdrop-blur-sm">
                <PulsingDot size="sm" color="emerald" />
                <span className="text-sm font-medium text-emerald-400">Real-time Detection Available</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <FloatingElement duration={4} yOffset={10} intensity={0.5}>
                  <h1 className="font-display relative text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                    Forest Fire
                    <span className="relative block bg-gradient-to-r from-emerald-400 via-emerald-500 to-amber-400 bg-clip-text text-transparent">
                      Classifier v2
                      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-400/20 to-amber-400/20 opacity-50 blur-xl" />
                    </span>
                  </h1>
                </FloatingElement>
              </div>

              <div className="relative">
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
                  Professional-grade wildfire detection powered by advanced machine learning. Real-time forest fire
                  classification from images with near-instant results.
                </p>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent opacity-30 blur-xl" />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GlowingButton variant="fire" size="lg" className="px-8 py-4 text-lg shadow-2xl">
                🔥 Try Detection Tool
              </GlowingButton>
              <GlowingButton variant="secondary" size="lg" className="px-8 py-4 text-lg">
                <Link href="/api-docs" className="flex items-center gap-2">
                  📚 View API Docs
                </Link>
              </GlowingButton>
            </div>

            <div className="mx-auto max-w-4xl pt-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div className="relative">
                  <StatCounter value="~500ms" label="Average Processing Time" delay={0.2} />
                  <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50 blur-lg" />
                </div>
                <div className="relative">
                  <StatCounter value="94.2%" label="Classification Accuracy" delay={0.4} />
                  <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent opacity-50 blur-lg" />
                </div>
                <div className="relative">
                  <StatCounter value="4 Classes" label="Fire, Smoke, Smoke+Fire, No Fire" delay={0.6} />
                  <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50 blur-lg" />
                </div>
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedGroup preset="blur-slide" className="mb-16 space-y-4 text-center">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-2xl">🧠</span>
                <span className="text-sm font-medium text-amber-400">AI-Powered Detection</span>
              </div>
            </div>

            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Advanced Detection Capabilities</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              From research prototype to production-ready system, our classifier delivers reliable wildfire detection
              for any application.
            </p>
          </AnimatedGroup>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FloatingElement duration={5} yOffset={15} intensity={0.3}>
              <Card className="group h-full border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25 transition-all duration-300 group-hover:shadow-emerald-500/40">
                    <span className="text-xl">🔥</span>
                  </div>
                  <CardTitle className="text-white transition-colors group-hover:text-emerald-400">
                    Real-time Detection
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Instant wildfire classification with sub-second response times
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Process images in real-time with our optimized TensorFlow.js model, running directly in your browser
                    or via our API.
                  </p>
                </CardContent>
              </Card>
            </FloatingElement>

            <FloatingElement duration={5.5} yOffset={12} intensity={0.4} delay={0.2}>
              <Card className="group h-full border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-600/5 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/40">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/25 transition-all duration-300 group-hover:shadow-amber-500/40">
                    <span className="text-xl">🧠</span>
                  </div>
                  <CardTitle className="text-white transition-colors group-hover:text-amber-400">
                    Advanced ML Model
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    MobileNet-based CNN optimized for accuracy and speed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Our model distinguishes between fire, smoke, combined scenarios, and non-fire images with high
                    precision and recall.
                  </p>
                </CardContent>
              </Card>
            </FloatingElement>

            <FloatingElement duration={4.5} yOffset={18} intensity={0.5} delay={0.4}>
              <Card className="group h-full border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 transition-all duration-300 group-hover:shadow-blue-500/40">
                    <span className="text-xl">🌐</span>
                  </div>
                  <CardTitle className="text-white transition-colors group-hover:text-blue-400">
                    Flexible Deployment
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Client-side inference or server-side API - your choice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Run predictions directly in the browser for privacy, or use our rate-limited API for server-side
                    applications.
                  </p>
                </CardContent>
              </Card>
            </FloatingElement>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl" />
          <div className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-amber-500/20 blur-2xl" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <AnimatedGroup preset="scale" className="space-y-8">
            <div className="relative">
              <FloatingElement duration={6} yOffset={8} intensity={0.3}>
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Ready to Get Started?</h2>
              </FloatingElement>
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-emerald-500/20 opacity-30 blur-2xl" />
            </div>

            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Start detecting wildfires in your images today. No account required for the demo.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <div className="relative">
                <GlowingButton variant="fire" size="lg" className="px-8 py-4 text-lg shadow-2xl">
                  🚀 Launch Detection Tool
                </GlowingButton>
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-50 blur-xl" />
              </div>

              <div className="relative">
                <GlowingButton variant="secondary" size="lg" className="px-8 py-4 text-lg">
                  <Link href="/research" className="flex items-center gap-2">
                    📊 View Research
                  </Link>
                </GlowingButton>
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-gray-500/20 to-gray-600/20 opacity-50 blur-xl" />
              </div>
            </div>

            {/* Trust indicators */}
            <div className="pt-8">
              <div className="flex flex-col items-center justify-center gap-6 text-sm text-gray-500 sm:flex-row">
                <div className="flex items-center gap-2">
                  <PulsingDot size="sm" color="emerald" />
                  <span>Real-time Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <PulsingDot size="sm" color="amber" />
                  <span>High Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <PulsingDot size="sm" color="blue" />
                  <span>Privacy-First</span>
                </div>
              </div>
            </div>
          </AnimatedGroup>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-emerald-500/30 to-amber-500/30 blur-3xl" />
        </div>
      </section>
    </div>
  );
}
