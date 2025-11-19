import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { apiDocsConfig } from '@/config/api-docs';

export function RateLimits() {
  const sampleUsage = 6; // representative safe usage for visualization
  const percentUsed = Math.min(100, (sampleUsage / apiDocsConfig.rateLimits.limits.requests) * 100);

  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-primary">{apiDocsConfig.rateLimits.title}</CardTitle>
        <CardDescription>{apiDocsConfig.rateLimits.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Free tier snapshot</h4>
            <div className="space-y-3 rounded-2xl border border-border/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Requests / window</span>
                <Badge variant="secondary">{apiDocsConfig.rateLimits.limits.requests}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Time window</span>
                <Badge variant="secondary">{apiDocsConfig.rateLimits.limits.window}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Max file size</span>
                <Badge variant="secondary">{apiDocsConfig.rateLimits.limits.maxFileSize}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Algorithm</span>
                <Badge variant="outline">{apiDocsConfig.rateLimits.limits.algorithm}</Badge>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Illustrative usage</span>
                  <span>
                    {sampleUsage}/{apiDocsConfig.rateLimits.limits.requests} requests
                  </span>
                </div>
                <Progress value={percentUsed} aria-label="Sample usage of rate limit" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Response headers</h4>
            <div className="space-y-3">
              {apiDocsConfig.rateLimits.headers.map((header) => (
                <div key={header.name} className="bg-muted/40 rounded-2xl border border-border/50 p-4">
                  <p className="font-mono text-sm text-primary">{header.name}</p>
                  <p className="text-muted-foreground text-xs">{header.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {apiDocsConfig.rateLimits.timeline.map((phase) => (
            <div
              key={phase.label}
              className="bg-card/50 hover:bg-card/80 hover:border-primary/20 rounded-2xl border border-border/60 p-4 transition-all duration-300"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{phase.label}</p>
              <p className="text-lg font-semibold text-foreground">{phase.status}</p>
              <p className="text-muted-foreground text-sm">{phase.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h5 className="font-semibold text-amber-900 dark:text-amber-200">Rate limit best practices</h5>
              <p className="text-amber-900/80 text-xs dark:text-amber-200/80">{apiDocsConfig.rateLimits.cooldownHint}</p>
            </div>
            <ul className="space-y-1 text-sm text-amber-900 dark:text-amber-200">
              {apiDocsConfig.rateLimits.bestPractices.map((practice) => (
                <li key={practice}>• {practice}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
