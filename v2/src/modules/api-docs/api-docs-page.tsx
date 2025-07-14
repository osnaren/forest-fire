import { ApiHero, ApiOverview, ErrorCodes, InteractiveExample, RateLimits } from './components';

export function ApiDocsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4">
      <ApiHero />

      <div className="space-y-16 pb-16">
        <ApiOverview />
        <RateLimits />
        <InteractiveExample />
        <ErrorCodes />
      </div>
    </div>
  );
}
