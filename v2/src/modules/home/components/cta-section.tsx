'use client';

import {
  AnimatedGroup,
  FloatingElement,
  GlowingButton,
  HoverBackground,
  PulsingDot,
} from '@/components/ui';
import { homeConfig } from '@/config/pages';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="relative px-4 py-16 sm:py-24 lg:py-32" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-4xl">
        <HoverBackground
          className="rounded-3xl p-1"
          colors={{
            background: 'bg-gradient-to-br from-primary/20 via-card/40 to-accent/20',
            objects: ['bg-primary/20', 'bg-accent/20', 'bg-primary/10'],
            glow: 'shadow-primary/30',
          }}
        >
          <article className="relative rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 p-8 lg:p-12">
            <div className="text-center">
              <AnimatedGroup preset="scale" className="space-y-8">
                <header className="relative">
                  <FloatingElement duration={8} yOffset={6} intensity={0.3}>
                    <h2 id="cta-heading" className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                      {homeConfig.cta.title}
                    </h2>
                  </FloatingElement>
                </header>

                <p className="mx-auto max-w-3xl text-lg text-muted-foreground lg:text-xl">
                  {homeConfig.cta.description}
                </p>

                <nav className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row sm:gap-6" role="navigation" aria-label="Call to action">
                  <GlowingButton variant="fire" size="lg" className="w-full px-8 py-4 text-lg shadow-2xl transition-all sm:w-auto">
                    {homeConfig.cta.primary.text}
                  </GlowingButton>

                  <Link
                    href={homeConfig.cta.secondary.href}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-8 py-4 text-lg font-semibold text-foreground backdrop-blur-sm transition-all hover:border-border/60 hover:bg-card/70 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:w-auto"
                  >
                    {homeConfig.cta.secondary.text}
                  </Link>
                </nav>

                {/* Trust indicators */}
                <footer className="pt-8">
                  <div className="flex flex-col items-center justify-center gap-6 text-sm text-muted-foreground sm:flex-row lg:text-base">
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
                      <span>Open Source</span>
                    </div>
                  </div>
                </footer>
              </AnimatedGroup>
            </div>
          </article>
        </HoverBackground>
      </div>
    </section>
  );
}
