import { AnimatedGroup } from '@/components/ui/animated-group';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedCard, MetricCard, TechStackCard } from '@/components/ui/enhanced-cards';
import { BackgroundEffect, FloatingElement, PulsingDot } from '@/components/ui/interactive-elements';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Forest Fire Classifier v2',
  description: 'Learn about our journey from research to real-time wildfire detection technology.',
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effect */}
      <BackgroundEffect />

      {/* Hero Section */}
      <section className="relative px-4 py-24 sm:py-32">
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <AnimatedGroup preset="blur-slide" className="space-y-8">
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 backdrop-blur-sm">
                <PulsingDot size="sm" color="emerald" />
                <span className="text-sm font-medium text-emerald-400">From Research to Real-Time</span>
              </div>
            </div>

            <div className="space-y-6">
              <FloatingElement duration={4} yOffset={10} intensity={0.5}>
                <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  About Our
                  <span className="block bg-gradient-to-r from-emerald-400 via-emerald-500 to-amber-400 bg-clip-text text-transparent">
                    AI-Powered System
                  </span>
                </h1>
              </FloatingElement>

              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
                Transforming wildfire detection from a college research project into a professional-grade,
                production-ready system with cutting-edge machine learning capabilities.
              </p>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedGroup preset="blur-slide" className="mb-16 space-y-4 text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Technology Stack</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Built with modern technologies for performance, scalability, and reliability.
            </p>
          </AnimatedGroup>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TechStackCard
              icon="⚛️"
              title="Next.js 14"
              description="React framework for production"
              features={['Server-side rendering', 'API routes', 'Static generation', 'Automatic optimization']}
              delay={0}
              accentColor="blue"
            />

            <TechStackCard
              icon="🧠"
              title="TensorFlow.js"
              description="Machine learning in the browser"
              features={[
                'Client-side inference',
                'WebGL acceleration',
                'MobileNet architecture',
                'Real-time processing',
              ]}
              delay={0.2}
              accentColor="amber"
            />

            <TechStackCard
              icon="🎨"
              title="Tailwind CSS"
              description="Modern styling framework"
              features={['Utility-first design', 'Responsive layouts', 'Dark mode support', 'Custom animations']}
              delay={0.4}
              accentColor="emerald"
            />

            <TechStackCard
              icon="🌊"
              title="Framer Motion"
              description="Animation library for React"
              features={['Smooth transitions', 'Gesture animations', 'Layout animations', 'Spring physics']}
              delay={0.6}
              accentColor="purple"
            />

            <TechStackCard
              icon="📊"
              title="Upstash Redis"
              description="Serverless data platform"
              features={['Rate limiting', 'Caching layer', 'Session storage', 'Real-time data']}
              delay={0.8}
              accentColor="blue"
            />

            <TechStackCard
              icon="🚀"
              title="Vercel"
              description="Deployment platform"
              features={['Edge functions', 'Global CDN', 'Auto-scaling', 'Analytics']}
              delay={1.0}
              accentColor="emerald"
            />
          </div>
        </div>
      </section>

      {/* Model Performance Section */}
      <section className="relative px-4 py-16 sm:py-24" id="model">
        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedGroup preset="scale" className="mb-16 space-y-4 text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Model Performance</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Our MobileNet-based CNN delivers exceptional accuracy with lightning-fast inference times.
            </p>
          </AnimatedGroup>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard value="94.2%" label="Overall Accuracy" icon="🎯" delay={0} trend="up" />
            <MetricCard value="~500ms" label="Avg Processing Time" icon="⚡" delay={0.2} trend="down" />
            <MetricCard value="4 Classes" label="Detection Categories" icon="🏷️" delay={0.4} trend="stable" />
            <MetricCard value="224×224" label="Input Resolution" icon="📐" delay={0.6} trend="stable" />
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <AnimatedGroup preset="scale" className="space-y-8">
            <div className="relative">
              <FloatingElement duration={6} yOffset={8} intensity={0.3}>
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">From Prototype to Production</h2>
              </FloatingElement>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <EnhancedCard delay={0} glowColor="amber">
                <CardHeader>
                  <CardTitle className="text-amber-400">Research Phase</CardTitle>
                  <CardDescription>College project exploring wildfire detection using computer vision</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Initial dataset collection and preprocessing</li>
                    <li>• Model architecture experimentation</li>
                    <li>• Basic web interface development</li>
                    <li>• Proof of concept validation</li>
                  </ul>
                </CardContent>
              </EnhancedCard>

              <EnhancedCard delay={0.2} glowColor="emerald">
                <CardHeader>
                  <CardTitle className="text-emerald-400">Production Ready</CardTitle>
                  <CardDescription>Professional-grade system with enterprise features</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Optimized model for web deployment</li>
                    <li>• Scalable API with rate limiting</li>
                    <li>• Modern responsive UI/UX</li>
                    <li>• Comprehensive error handling</li>
                  </ul>
                </CardContent>
              </EnhancedCard>
            </div>
          </AnimatedGroup>
        </div>
      </section>
    </div>
  );
}
