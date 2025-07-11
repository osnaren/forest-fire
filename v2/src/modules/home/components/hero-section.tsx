// 'use client';

import RotatingText from '@/blocks/TextAnimations/RotatingText/RotatingText';
import {
  AnimatedGradientText,
  AnimatedGroup,
  FloatingElement,
  GlowingButton,
} from '@/components/ui';
import { homeConfig } from '@/config/pages';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative px-4 py-24 sm:py-32 lg:py-40" role="banner">
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <AnimatedGroup preset="blur-slide" className="space-y-10">
          {/* Status Badge */}
          <header className="mb-8 flex justify-center">
            <AnimatedGradientText>
              🔥 <hr className="mx-2 h-4 w-px shrink-0 bg-border" />{' '}
              <span className="inline bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
                {homeConfig.hero.badge.text}
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </header>

          <div className="space-y-8">
            <div className="relative">
              <FloatingElement duration={6} yOffset={8} intensity={0.4} delay={0.2}>
                <h1 className="font-display relative flex flex-col items-center gap-2 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                  <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                    <span className="text-foreground">{homeConfig.hero.title.main}</span>
                    <RotatingText
                      texts={homeConfig.hero.title.classes}
                      mainClassName="px-2 sm:px-3 md:px-4 overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-lg bg-muted/50 backdrop-blur-sm"
                      staggerFrom={'last'}
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '-120%' }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                      rotationInterval={2500}
                    />
                  </span>
                  <span className="relative block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                    {homeConfig.hero.title.accent}
                    <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-50 blur-xl" />
                  </span>
                </h1>
              </FloatingElement>
            </div>

            <div className="relative">
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
                {homeConfig.hero.description}
              </p>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-30 blur-xl" />
            </div>
          </div>

          {/* Action Buttons */}
          <nav className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center sm:gap-6" role="navigation" aria-label="Primary actions">
            <Link href={homeConfig.hero.cta.primary.href} className="group">
              <GlowingButton size="lg" className="w-full px-8 py-4 text-lg font-semibold transition-all sm:w-auto">
                {homeConfig.hero.cta.primary.text}
                <div className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</div>
              </GlowingButton>
            </Link>
            <Link
              href={homeConfig.hero.cta.secondary.href}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-8 py-4 text-lg font-semibold text-foreground backdrop-blur-sm transition-all hover:border-border/60 hover:bg-card/70 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {homeConfig.hero.cta.secondary.text}
            </Link>
          </nav>
        </AnimatedGroup>
      </div>
    </section>
  );
}
