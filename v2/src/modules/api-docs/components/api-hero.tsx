'use client';

import { AnimatedGroup } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiDocsConfig } from '@/config/api-docs';
import { IconCheck, IconCopy, IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

export function ApiHero() {
  const { hero } = apiDocsConfig;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hero.cta.primary.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error('Failed to copy endpoint snippet', error);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-slate-950 via-slate-900/80 to-slate-900 px-4 py-10 text-center shadow-2xl md:px-6 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: 'radial-gradient(circle at top, rgba(59,130,246,0.35), transparent)' }}
      />

      <div className="relative z-10 space-y-10">
        <AnimatedGroup preset="blur-slide" className="space-y-6">
          <div className="space-y-4">
            {hero.eyebrow && (
              <Badge variant="outline" className="border-primary/30 bg-primary/5 text-xs tracking-wide uppercase">
                {hero.eyebrow}
              </Badge>
            )}
            <h1 className="font-display from-primary via-accent to-primary bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              {hero.title}
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">{hero.subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {hero.features.map((feature) => (
              <span
                key={feature.label}
                className={`flex items-center gap-2 rounded-full px-4 py-1 text-xs font-medium ring-1 ring-inset ${feature.badgeClass}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {feature.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleCopy}>
              {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              <span className="ml-2">{copied ? 'Copied snippet' : hero.cta.primary.label}</span>
            </Button>
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary" asChild>
              <Link href={hero.cta.secondary.href} target="_blank" rel="noreferrer">
                <IconExternalLink size={16} className="mr-2" />
                {hero.cta.secondary.label}
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {hero.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-border/50 rounded-2xl border bg-slate-900/60 px-4 py-5 text-left shadow-inner"
              >
                <p className="text-muted-foreground text-xs tracking-wide uppercase">{metric.label}</p>
                <p className="text-3xl font-semibold text-white">{metric.value}</p>
                <p className="text-muted-foreground text-xs">{metric.helper}</p>
              </div>
            ))}
          </div>

          <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="rounded-full border border-green-500/30 px-3 py-1 text-green-400">
              Uptime {hero.status.uptime}
            </span>
            <span className="rounded-full border border-slate-600/60 px-3 py-1">
              Last deploy {hero.status.lastDeploy}
            </span>
            <span className="rounded-full border border-slate-600/60 px-3 py-1">
              POST {apiDocsConfig.endpoint.path}
            </span>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
