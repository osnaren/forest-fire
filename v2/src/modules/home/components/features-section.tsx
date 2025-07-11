'use client';

import {
  AnimatedGradientText,
  AnimatedGroup,
  EnhancedCard,
  FloatingElement,
} from '@/components/ui';
import { homeConfig } from '@/config/pages';
import { ChevronRight } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section className="relative px-4 py-16 sm:py-24 lg:py-32" aria-labelledby="features-heading">
      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimatedGroup preset="blur-slide" className="mb-16 space-y-6 text-center lg:mb-20">
          <header className="mb-8 flex justify-center">
            <AnimatedGradientText>
              🧠 <hr className="mx-2 h-4 w-px shrink-0 bg-border" />{' '}
              <span className="inline bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
                {homeConfig.features.title}
              </span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </header>

          <h2 id="features-heading" className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {homeConfig.features.subtitle}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground lg:text-xl">
            From research prototype to production-ready system, this classifier delivers reliable wildfire detection
            with a personal touch.
          </p>
        </AnimatedGroup>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {homeConfig.features.items.map((feature, index) => (
            <FloatingElement 
              key={index} 
              duration={6 + index * 0.5} 
              yOffset={12} 
              intensity={0.3} 
              delay={index * 0.15}
            >
              <EnhancedCard className="h-full transition-all duration-300 hover:shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 transition-all duration-300 group-hover:shadow-primary/40 group-hover:scale-110">
                  <span className="text-2xl" role="img" aria-hidden="true">{feature.icon}</span>
                </div>
                <h3 className="mb-4 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary lg:text-2xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed lg:text-base">
                  {feature.description}
                </p>
              </EnhancedCard>
            </FloatingElement>
          ))}
        </div>
      </div>
    </section>
  );
}
