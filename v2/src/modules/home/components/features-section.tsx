'use client';

import { AnimatedGradientText, AnimatedGroup, FloatingElement } from '@/components/ui';
import { Card } from '@/components/ui/card';
import { homeConfig } from '@/config/pages';
import { cn } from '@/lib/utils';

import { ChevronRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden px-4 py-16 sm:py-24 lg:py-32"
      aria-labelledby="features-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="from-primary/10 absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] to-transparent opacity-20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="from-accent/10 absolute right-0 bottom-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/4 rounded-full bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] to-transparent opacity-20 blur-3xl"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimatedGroup preset="blur-slide" className="mb-16 space-y-6 text-center lg:mb-20">
          <header className="mb-8 flex justify-center">
            <AnimatedGradientText className="text-sm">
              <motion.span
                className="mr-1 text-base"
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  transition: { repeat: Infinity, repeatDelay: 5, duration: 1 },
                }}
              >
                🧠
              </motion.span>
              <hr className="bg-border mx-2 h-4 w-px shrink-0" />
              {homeConfig.features.title}
              <ChevronRight className="ml-1 inline-block size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </header>

          <motion.h2
            id="features-heading"
            className="font-display text-foreground text-3xl font-bold sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {homeConfig.features.subtitle}
          </motion.h2>

          <motion.p
            className="text-muted-foreground mx-auto max-w-3xl text-lg lg:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            From research prototype to production-ready system, this classifier delivers reliable wildfire detection
            with a personal touch.
          </motion.p>
        </AnimatedGroup>

        <AnimatedGroup preset="blur-slide" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {homeConfig.features.items.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: {
    emoji: string;
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const delay = index * 0.15;

  const cardContent = (
    <Card
      ref={cardRef}
      className={cn(
        'group border-border/50 bg-card relative h-full backdrop-blur-sm transition-all duration-500',
        'hover:border-primary/40 hover:bg-card/90',
        'hover:shadow-primary/20 hover:shadow-lg',
        'overflow-hidden'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect background */}
      <div
        className={cn(
          'from-primary/20 to-primary/10 absolute inset-0 bg-linear-to-r via-transparent opacity-0 transition-opacity duration-700',
          isHovered && 'opacity-100'
        )}
        aria-hidden="true"
      />

      <div className="relative z-10 p-6">
        <div className="mb-6">
          <div className="relative">
            <div className="from-primary to-primary/80 shadow-primary/25 group-hover:shadow-primary/40 flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br shadow-lg transition-all duration-500 group-hover:scale-110">
              {feature.icon}
            </div>
          </div>
        </div>

        <h3 className="text-foreground group-hover:text-primary mb-4 text-xl font-semibold transition-colors duration-300 lg:text-2xl">
          {feature.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed lg:text-base">{feature.description}</p>
      </div>
    </Card>
  );

  if (!isMounted) {
    return <div className="group cursor-pointer">{cardContent}</div>;
  }

  return (
    <FloatingElement duration={6 + index * 0.5} yOffset={8} intensity={0.3} delay={index * 0.15}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: delay,
          type: 'spring',
          stiffness: 70,
          damping: 15,
        }}
        whileHover={{
          scale: 1.03,
          y: -5,
          transition: { duration: 0.3 },
        }}
        className="gpu-accelerated h-full cursor-pointer will-change-transform"
      >
        {cardContent}
      </motion.div>
    </FloatingElement>
  );
}
