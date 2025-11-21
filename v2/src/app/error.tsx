'use client';

import { AnimatedGroup, GlowingButton } from '@/components/ui';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <AnimatedGroup preset="scale" className="space-y-8">
        <div className="relative">
          <h1 className="font-display text-9xl font-bold tracking-tighter text-red-500/20">500</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">⚠️</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Something went wrong!</h2>
          <p className="mx-auto max-w-md text-lg text-muted-foreground">
            We encountered an unexpected error. Our team has been notified.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <GlowingButton size="lg" onClick={() => reset()}>
            Try Again
          </GlowingButton>
        </div>
      </AnimatedGroup>
    </main>
  );
}
