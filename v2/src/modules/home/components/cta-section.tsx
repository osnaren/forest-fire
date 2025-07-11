'use client';

import { AnimatedGroup, FloatingElement, GlowingButton, HoverBackground, PulsingDot } from '@/components/ui';
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
          <article className="border-border/50 relative rounded-3xl border p-8 backdrop-blur-sm lg:p-12">
            <div className="text-center">
              <AnimatedGroup preset="scale" className="space-y-8">
                <header className="relative">
                  <FloatingElement duration={8} yOffset={6} intensity={0.3}>
                    <h2
                      id="cta-heading"
                      className="font-display text-foreground text-3xl font-bold sm:text-4xl lg:text-5xl"
                    >
                      {homeConfig.cta.title}
                    </h2>
                  </FloatingElement>
                </header>

                <p className="text-muted-foreground mx-auto max-w-3xl text-lg lg:text-xl">
                  {homeConfig.cta.description}
                </p>

                <nav
                  className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row sm:gap-6"
                  role="navigation"
                  aria-label="Call to action"
                >
                  <Link href={homeConfig.cta.primary.href}>
                    <GlowingButton
                      variant="fire"
                      size="lg"
                      aria-label={homeConfig.cta.primary.text}
                      className="group w-full px-8 py-4 text-lg shadow-2xl transition-all sm:w-auto"
                    >
                      {homeConfig.cta.primary.text}
                      <span className="transition-transform group-hover:hidden">{homeConfig.cta.primary.icon}</span>
                      <span className="hidden transition-transform group-hover:inline">
                        {homeConfig.cta.primary.hoverIcon}
                      </span>
                    </GlowingButton>
                  </Link>

                  <Link
                    href={homeConfig.cta.secondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={homeConfig.cta.secondary.text}
                    className="group border-border bg-card/50 text-foreground hover:border-border/60 hover:bg-card/70 focus:ring-ring flex w-full items-center justify-center gap-2 rounded-xl border px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto"
                  >
                    {homeConfig.cta.secondary.text}
                    <span className="transition-transform group-hover:hidden">{homeConfig.cta.secondary.icon}</span>
                    <span className="hidden transition-transform group-hover:inline">
                      {homeConfig.cta.secondary.hoverIcon}
                    </span>
                  </Link>
                </nav>

                {/* Trust indicators */}
                <footer className="pt-8">
                  <div className="text-muted-foreground flex flex-col items-center justify-center gap-6 text-sm sm:flex-row lg:text-base">
                    {homeConfig.cta.indicators.map((indicator, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <PulsingDot size="sm" color={indicator.color as 'emerald' | 'amber' | 'red' | 'blue'} />
                        <span>{indicator.label}</span>
                      </div>
                    ))}
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
