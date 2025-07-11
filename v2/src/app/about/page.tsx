import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button';
import { MetricCard, TechStackCard } from '@/components/ui/enhanced-cards';
import { BackgroundEffect, FloatingElement, PulsingDot } from '@/components/ui/interactive-elements';
import { ModernBadge } from '@/components/ui/modern-badge';
import { AnimatedGradientText } from '@/components/ui/modern-effects';
import { Timeline } from '@/components/ui/timeline';
import { aboutConfig, siteConfig } from '@/config/pages';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `About - ${siteConfig.name}`,
  description: aboutConfig.hero.description,
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
              <ModernBadge
                label="Personal Project"
                variant="emerald"
                appearance="subtle"
                icon={<PulsingDot size="sm" color="emerald" />}
                animated
              />
            </div>

            <div className="space-y-6">
              <FloatingElement duration={4} yOffset={10} intensity={0.5}>
                <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  <AnimatedGradientText className="text-center">{aboutConfig.hero.title}</AnimatedGradientText>
                </h1>
              </FloatingElement>

              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
                {aboutConfig.hero.description}
              </p>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-4xl">
          <AnimatedGroup preset="blur-slide" className="mb-16 space-y-4 text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{aboutConfig.story.title}</h2>
          </AnimatedGroup>

          <div className="space-y-8">
            {aboutConfig.story.content.map((paragraph, index) => (
              <FloatingElement key={index} duration={5 + index} yOffset={5} intensity={0.3}>
                <p className="text-center text-lg leading-relaxed text-gray-300">{paragraph}</p>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedGroup preset="blur-slide" className="mb-16 space-y-4 text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{aboutConfig.techStack.title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              The modern tools and technologies powering this project
            </p>
          </AnimatedGroup>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {aboutConfig.techStack.items.map((tech, index) => (
              <TechStackCard
                key={tech.name}
                icon={getStackIcon(tech.name)}
                title={tech.name}
                description={tech.description}
                features={[tech.category, 'Production Ready', 'Well Documented', 'Community Support']}
                delay={index * 0.1}
                accentColor={getAccentColor(tech.category)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedGroup preset="scale" className="mb-16 space-y-4 text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{aboutConfig.metrics.title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Key metrics that showcase the project's quality and performance
            </p>
          </AnimatedGroup>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {aboutConfig.metrics.items.map((metric, index) => (
              <MetricCard
                key={metric.label}
                value={metric.value + metric.unit}
                label={metric.label}
                icon={getMetricIcon(metric.label)}
                delay={index * 0.1}
                trend="up"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedGroup preset="scale" className="mb-16 space-y-4 text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{aboutConfig.journey.title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              The complete development journey from concept to deployment
            </p>
          </AnimatedGroup>

          <Timeline data={aboutConfig.journey.items} />
        </div>
      </section>

      {/* Connect Section */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <AnimatedGroup preset="scale" className="space-y-8">
            <div className="space-y-6">
              <FloatingElement duration={6} yOffset={8} intensity={0.3}>
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{aboutConfig.connect.title}</h2>
              </FloatingElement>

              <p className="mx-auto max-w-2xl text-lg text-gray-400">{aboutConfig.connect.description}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {aboutConfig.connect.links.map((link, index) => (
                <FloatingElement key={link.text} duration={4 + index * 0.5} yOffset={5} intensity={0.4}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="group border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
                  >
                    <Link href={link.href} target="_blank" rel="noopener noreferrer">
                      <span className="mr-2">{getSocialIcon(link.icon)}</span>
                      {link.text}
                    </Link>
                  </Button>
                </FloatingElement>
              ))}
            </div>
          </AnimatedGroup>
        </div>
      </section>
    </div>
  );
}

// Helper functions
function getStackIcon(name: string): string {
  const icons: Record<string, string> = {
    TensorFlow: '🧠',
    'Next.js': '⚛️',
    TypeScript: '📘',
    'Tailwind CSS': '🎨',
    'Framer Motion': '🌊',
    Vercel: '🚀',
  };
  return icons[name] || '⚙️';
}

function getAccentColor(category: string): 'primary' | 'secondary' | 'accent' | 'destructive' {
  const colors: Record<string, 'primary' | 'secondary' | 'accent' | 'destructive'> = {
    'Machine Learning': 'accent',
    Frontend: 'primary',
    Language: 'secondary',
    Styling: 'primary',
    Animation: 'secondary',
    Infrastructure: 'accent',
  };
  return colors[category] || 'primary';
}

function getMetricIcon(label: string): string {
  const icons: Record<string, string> = {
    'Training Time': '⏱️',
    'Code Quality': '✨',
    'Test Coverage': '🧪',
    Performance: '⚡',
  };
  return icons[label] || '📊';
}

function getSocialIcon(icon: string): string {
  const icons: Record<string, string> = {
    github: '💻',
    linkedin: '💼',
    twitter: '🐦',
  };
  return icons[icon] || '🔗';
}
