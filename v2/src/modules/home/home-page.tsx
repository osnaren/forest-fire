'use client';

import { BackgroundEffect } from '@/components/ui';
import { CTASection, FeaturesSection, HeroSection, StatsSection } from './index';

export function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden scroll-smooth" style={{ willChange: 'scroll-position' }}>
      {/* Background Effect */}
      <BackgroundEffect />

      {/* Home Page Sections */}
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
