import { AnimatedGroup, GlowingButton } from '@/components/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <AnimatedGroup preset="scale" className="space-y-8">
        <div className="relative">
          <h1 className="font-display text-primary/20 text-9xl font-bold tracking-tighter">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🌲🔥</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Page Not Found</h2>
          <p className="text-muted-foreground mx-auto max-w-md text-lg">
            Looks like you've wandered off the trail. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/">
            <GlowingButton size="lg">Return Home</GlowingButton>
          </Link>
        </div>
      </AnimatedGroup>
    </main>
  );
}
