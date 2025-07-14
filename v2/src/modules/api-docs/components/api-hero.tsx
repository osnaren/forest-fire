import { AnimatedGroup } from '@/components/ui';
import { apiDocsConfig } from '@/config/api-docs';

export function ApiHero() {
  return (
    <section className="relative px-4 py-16 text-center">
      <AnimatedGroup preset="blur-slide" className="space-y-6">
        <div className="space-y-4">
          <h1 className="font-display from-primary via-accent to-primary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            {apiDocsConfig.hero.title}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            {apiDocsConfig.hero.subtitle}
          </p>
        </div>

        <div className="text-muted-foreground flex flex-wrap justify-center gap-4 text-sm">
          {apiDocsConfig.hero.features.map((feature, index) => (
            <span key={index} className="flex items-center space-x-2">
              <span className={`h-2 w-2 rounded-full bg-${feature.color}`}></span>
              <span>{feature.label}</span>
            </span>
          ))}
        </div>
      </AnimatedGroup>
    </section>
  );
}
