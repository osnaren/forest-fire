'use client';

import CountUp from '@/blocks/TextAnimations/CountUp/CountUp';
import {
  AnimatedGradientText,
  AnimatedGroup,
  HighlightGroup,
  HighlighterItem,
  Particles,
} from '@/components/ui';
import { homeConfig } from '@/config/pages';
import { ChevronRight } from 'lucide-react';

export function StatsSection() {
  return (
    <section className="relative px-4 py-16 lg:py-20" aria-labelledby="stats-heading">
      <HighlightGroup className="mx-auto max-w-7xl">
        <HighlighterItem className="rounded-3xl p-1">
          <article className="relative z-20 overflow-hidden rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50">
            <Particles
              className="absolute inset-0 -z-10 opacity-5 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-20"
              quantity={80}
              color="hsl(var(--primary))"
              vy={-0.2}
            />
            <div className="p-8 lg:p-12">
              <AnimatedGroup preset="blur-slide" className="text-center">
                <header className="mb-8 flex justify-center">
                  <AnimatedGradientText>
                    📊 <hr className="mx-2 h-4 w-px shrink-0 bg-border" />{' '}
                    <span className="inline bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
                      {homeConfig.stats.badge.text}
                    </span>
                    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedGradientText>
                </header>
                
                <div className="grid gap-8 sm:grid-cols-3 lg:gap-12">
                  {homeConfig.stats.items.map((stat, index) => (
                    <div key={index} className="group relative">
                      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative rounded-2xl border border-border/30 bg-card/50 p-6 lg:p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-border/60 group-hover:bg-card/70">
                        <div className="mb-3 text-4xl font-bold text-primary sm:text-5xl lg:text-6xl">
                          <CountUp
                            to={stat.value}
                            className="inline-block"
                            direction="up"
                            duration={2.5}
                            startWhen={true}
                            separator=","
                          />
                          <span className="text-accent">{stat.suffix}</span>
                        </div>
                        <div className="mb-2 text-lg font-semibold text-foreground lg:text-xl">{stat.label}</div>
                        <div className="text-sm text-muted-foreground lg:text-base">{stat.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedGroup>
            </div>
          </article>
        </HighlighterItem>
      </HighlightGroup>
    </section>
  );
}
