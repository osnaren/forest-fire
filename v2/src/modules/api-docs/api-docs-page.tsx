import { AnimatedGroup } from '@/components/ui';

import { ApiHero, ApiOverview, ErrorCodes, InteractiveExample, RateLimits } from './components';

export function ApiDocsPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div
          className="absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 60%)' }}
        />
        <div
          className="absolute right-0 bottom-0 h-80 w-80 translate-x-1/3 blur-3xl"
          style={{ background: 'conic-gradient(from 180deg at 50% 50%, rgba(236,72,153,0.18), transparent)' }}
        />
      </div>

      <div className="relative container mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <ApiHero />

        <AnimatedGroup preset="blur-slide" className="mt-16 space-y-12">
          <ApiOverview />
          <InteractiveExample />
          <RateLimits />
          <ErrorCodes />
        </AnimatedGroup>
      </div>
    </div>
  );
}
