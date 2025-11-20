'use client';

import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/enhanced-cards';
import { BackgroundEffect, FloatingElement } from '@/components/ui/interactive-elements';
import { AnimatedGradientText } from '@/components/ui/modern-effects';
import { Timeline } from '@/components/ui/timeline';
import { aboutConfig } from '@/config/pages';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effect */}
      <BackgroundEffect />

      {/* Hero Section */}
      <section className="relative px-4 py-24 sm:py-32">
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <AnimatedGroup preset="blur-slide" className="space-y-8">
            <div className="space-y-6">
              <FloatingElement duration={4} yOffset={10} intensity={0.5}>
                <h1 className="font-display text-foreground text-4xl font-bold sm:text-6xl lg:text-7xl">
                  <AnimatedGradientText className="text-center">{aboutConfig.hero.title}</AnimatedGradientText>
                </h1>
              </FloatingElement>

              <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed sm:text-xl">
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
            <h2 className="font-display text-foreground text-3xl font-bold sm:text-4xl">{aboutConfig.story.title}</h2>
          </AnimatedGroup>

          <div className="space-y-8">
            {aboutConfig.story.content.map((paragraph, index) => (
              <FloatingElement key={index} duration={5 + index} yOffset={5} intensity={0.3}>
                <p className="text-muted-foreground text-center text-lg leading-relaxed">{paragraph}</p>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedGroup preset="blur-slide" className="mb-16 space-y-4 text-center">
            <h2 className="font-display text-foreground text-3xl font-bold sm:text-4xl">
              {aboutConfig.techStack.title}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              The modern tools and technologies powering this project
            </p>
          </AnimatedGroup>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aboutConfig.techStack.items.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group border-primary/10 bg-background/50 hover:border-primary/30 hover:shadow-primary/5 h-full overflow-hidden backdrop-blur-sm transition-all hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="bg-primary/10 group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform group-hover:scale-110">
                      {tech.icon ? (
                        <Image src={tech.icon} alt={tech.name} width={48} height={48} />
                      ) : (
                        getStackIcon(tech.name)
                      )}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold">{tech.name}</CardTitle>
                      <span className="text-primary text-xs font-medium">{tech.category}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{tech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedGroup preset="scale" className="mb-16 space-y-4 text-center">
            <h2 className="font-display text-foreground text-3xl font-bold sm:text-4xl">{aboutConfig.metrics.title}</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Key metrics that showcase the project's quality (and my caffeine addiction)
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
            <h2 className="font-display text-foreground text-3xl font-bold sm:text-4xl">{aboutConfig.journey.title}</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
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
                <h2 className="font-display text-foreground text-3xl font-bold sm:text-4xl">
                  {aboutConfig.connect.title}
                </h2>
              </FloatingElement>

              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{aboutConfig.connect.description}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {aboutConfig.connect.links.map((link, index) => (
                <FloatingElement key={link.text} duration={4 + index * 0.5} yOffset={5} intensity={0.4}>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="group border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    <Link href={link.href} target="_blank" rel="noopener noreferrer">
                      <span className="mr-2">{link.icon}</span>
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
    'TensorFlow.js': '🤖',
    'Next.js 14': '⚛️',
    TypeScript: '📘',
    'Tailwind CSS': '🎨',
    'Framer Motion': '🌊',
    Vercel: '🚀',
  };
  return icons[name] || '⚙️';
}

function getMetricIcon(label: string): string {
  const icons: Record<string, string> = {
    'Model Accuracy': '🎯',
    'Caffeine Intake': '☕',
    Semester: '🎓',
    'Stack Overflow': '🐛',
  };
  return icons[label] || '📊';
}
