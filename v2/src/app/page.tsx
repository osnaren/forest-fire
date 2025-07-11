import CountUp from '@/blocks/TextAnimations/CountUp/CountUp';
import RotatingText from '@/blocks/TextAnimations/RotatingText/RotatingText';
import {
  AnimatedGradientText,
  AnimatedGroup,
  BackgroundEffect,
  EnhancedCard,
  FloatingElement,
  GlowingButton,
  HighlightGroup,
  HighlighterItem,
  HoverBackground,
  Particles,
  PulsingDot,
} from '@/components/ui';
import { homeConfig } from '@/config/pages';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
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
            {/* Status Badge with New Animated Text */}
            <div className="mb-8 flex justify-center">
              <AnimatedGradientText>
                🔥 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{' '}
                <span
                  className={cn(
                    `animate-gradient inline bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  {homeConfig.hero.badge.text}
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <FloatingElement duration={4} yOffset={10} intensity={0.5}>
                  <h1 className="font-display relative flex flex-col items-center text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                    <span className="flex gap-4">
                      {homeConfig.hero.title.main}
                      <RotatingText
                        texts={homeConfig.hero.title.classes}
                        mainClassName="px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                        staggerFrom={'last'}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-120%' }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                      />
                    </span>
                    <span className="relative block bg-gradient-to-r from-emerald-400 via-emerald-500 to-amber-400 bg-clip-text text-transparent">
                      {homeConfig.hero.title.accent}
                      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-400/20 to-amber-400/20 opacity-50 blur-xl" />
                    </span>
                  </h1>
                </FloatingElement>
              </div>

              <div className="relative">
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl">
                  {homeConfig.hero.description}
                </p>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent opacity-30 blur-xl" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href={homeConfig.hero.cta.primary.href}>
                <GlowingButton size="lg" className="group px-8 py-4 text-lg font-semibold">
                  {homeConfig.hero.cta.primary.text}
                  <div className="ml-2 transition-transform group-hover:translate-x-1">→</div>
                </GlowingButton>
              </Link>
              <Link
                href={homeConfig.hero.cta.secondary.href}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
              >
                {homeConfig.hero.cta.secondary.text}
              </Link>
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* Performance Stats Section with New Highlighter */}
      <section className="relative px-4 py-16">
        <HighlightGroup className="mx-auto max-w-7xl">
          <HighlighterItem className="rounded-3xl p-6">
            <div className="relative z-20 overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm dark:bg-black/20">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                quantity={100}
                color="#10b981"
                vy={-0.2}
              />
              <div className="p-8">
                <AnimatedGroup preset="blur-slide" className="text-center">
                  <div className="mb-8 flex justify-center">
                    <AnimatedGradientText>
                      🔥 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{' '}
                      <span
                        className={cn(
                          `animate-gradient inline bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                        )}
                      >
                        {homeConfig.stats.badge.text}
                      </span>
                      <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedGradientText>
                  </div>
                  <div className="grid gap-8 sm:grid-cols-3">
                    {homeConfig.stats.items.map((stat, index) => (
                      <div key={index} className="group relative">
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-400/20 via-transparent to-amber-400/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                          <div className="mb-2 text-4xl font-bold text-emerald-400 sm:text-5xl">
                            <CountUp
                              to={stat.value}
                              className="inline-block"
                              direction="up"
                              duration={2}
                              startWhen={true}
                              separator=","
                            />
                            {stat.suffix}
                          </div>
                          <div className="text-lg font-semibold text-white">{stat.label}</div>
                          <div className="text-sm text-gray-400">{stat.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedGroup>
              </div>
            </div>
          </HighlighterItem>
        </HighlightGroup>
      </section>

      {/* Features Section with New Cards */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedGroup preset="blur-slide" className="mb-16 space-y-4 text-center">
            <div className="mb-6 flex justify-center">
              <AnimatedGradientText>
                🧠 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{' '}
                <span
                  className={cn(
                    `animate-gradient inline bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  {homeConfig.features.title}
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            </div>

            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{homeConfig.features.subtitle}</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              From research prototype to production-ready system, this classifier delivers reliable wildfire detection
              with a personal touch.
            </p>
          </AnimatedGroup>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {homeConfig.features.items.map((feature, index) => (
              <FloatingElement key={index} duration={5 + index * 0.5} yOffset={15} intensity={0.3} delay={index * 0.2}>
                <EnhancedCard className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25 transition-all duration-300 group-hover:shadow-emerald-500/40">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-emerald-400">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300">{feature.description}</p>
                </EnhancedCard>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with HoverBackground */}
      <section className="relative px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <HoverBackground
            className="rounded-3xl p-8"
            colors={{
              background: 'bg-gradient-to-br from-emerald-900/40 via-slate-900/40 to-amber-900/40',
              objects: ['bg-emerald-400/30', 'bg-amber-400/30', 'bg-orange-400/30'],
              glow: 'shadow-emerald-400/50',
            }}
          >
            <div className="text-center">
              <AnimatedGroup preset="scale" className="space-y-8">
                <div className="relative">
                  <FloatingElement duration={6} yOffset={8} intensity={0.3}>
                    <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{homeConfig.cta.title}</h2>
                  </FloatingElement>
                </div>

                <p className="mx-auto max-w-2xl text-lg text-gray-300">{homeConfig.cta.description}</p>

                <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                  <GlowingButton variant="fire" size="lg" className="px-8 py-4 text-lg shadow-2xl">
                    {homeConfig.cta.primary.text}
                  </GlowingButton>

                  <Link
                    href={homeConfig.cta.secondary.href}
                    className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20"
                  >
                    {homeConfig.cta.secondary.text}
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="pt-8">
                  <div className="flex flex-col items-center justify-center gap-6 text-sm text-gray-400 sm:flex-row">
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
                </div>
              </AnimatedGroup>
            </div>
          </HoverBackground>
        </div>
      </section>
    </div>
  );
}
