import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiDocsConfig } from '@/config/api-docs';

export function RateLimits() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-primary">{apiDocsConfig.rateLimits.title}</CardTitle>
        <CardDescription>{apiDocsConfig.rateLimits.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-accent mb-2 font-semibold">Free Tier Limits</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Requests per window</span>
                  <Badge variant="secondary">{apiDocsConfig.rateLimits.limits.requests} requests</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Time window</span>
                  <Badge variant="secondary">{apiDocsConfig.rateLimits.limits.window}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Max file size</span>
                  <Badge variant="secondary">{apiDocsConfig.rateLimits.limits.maxFileSize}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Rate limiting</span>
                  <Badge variant="outline">{apiDocsConfig.rateLimits.limits.algorithm}</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-accent mb-2 font-semibold">Response Headers</h4>
              <div className="space-y-2">
                {apiDocsConfig.rateLimits.headers.map((header, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-3">
                    <code className="text-sm">
                      <div className="text-primary">{header.name}:</div>
                      <div className="text-muted-foreground ml-2">{header.description}</div>
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="flex items-start space-x-3">
            <div className="text-amber-500">⚠️</div>
            <div className="space-y-1">
              <h5 className="font-semibold text-amber-600 dark:text-amber-400">Rate Limit Best Practices</h5>
              <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                {apiDocsConfig.rateLimits.bestPractices.map((practice, index) => (
                  <li key={index}>• {practice}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
