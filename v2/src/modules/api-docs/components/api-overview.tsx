import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { apiDocsConfig } from '@/config/api-docs';
import { IconCheck } from '@tabler/icons-react';

export function ApiOverview() {
  const requestExample = `curl -X POST \\
  ${apiDocsConfig.endpoint.url} \\
  -F "image=@forest.jpg" \\
  -H "Content-Type: ${apiDocsConfig.request.contentType}"`;

  const responseExample = JSON.stringify(apiDocsConfig.response.example, null, 2);

  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur">
      <CardHeader className="flex flex-col gap-3 text-left">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="text-[11px] tracking-wide">
            {apiDocsConfig.endpoint.method}
          </Badge>
          <Badge variant="outline" className="font-mono text-[11px]">
            {apiDocsConfig.endpoint.path}
          </Badge>
          <span className="text-muted-foreground text-xs" aria-live="polite">
            {apiDocsConfig.hero.status.uptime} uptime · {apiDocsConfig.hero.status.lastDeploy}
          </span>
        </div>
        <h2 className="text-foreground text-2xl leading-none font-semibold tracking-tight">
          {apiDocsConfig.endpoint.title}
        </h2>
        <CardDescription className="max-w-3xl text-base">
          {apiDocsConfig.endpoint.description} {apiDocsConfig.overview.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-10 lg:grid-cols-[1.5fr_0.5fr]">
        <div className="min-w-0 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="min-w-0">
              <p className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">Request format</p>
              <CodeBlock language="bash" filename="example.sh" code={requestExample} />
              <dl className="text-muted-foreground mt-4 space-y-2 text-sm">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="shrink-0">Content-Type</dt>
                  <dd className="font-mono text-xs break-all sm:text-sm">{apiDocsConfig.request.contentType}</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="shrink-0">Body</dt>
                  <dd className="font-mono text-xs sm:text-sm">image ({apiDocsConfig.request.maxFileSize} MB max)</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="shrink-0">Formats</dt>
                  <dd className="text-right font-mono text-xs wrap-break-word sm:text-sm">
                    {apiDocsConfig.request.supportedFormats.join(', ')}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="min-w-0">
              <p className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">Response format</p>
              <CodeBlock language="json" filename="response.json" code={responseExample} />
              <ul className="text-muted-foreground mt-4 space-y-1 text-sm">
                <li>• Sorted by probability ({apiDocsConfig.response.sortOrder})</li>
                <li>• Confidence between {apiDocsConfig.response.confidenceRange}</li>
                <li>• Timestamp in {apiDocsConfig.response.timestampFormat}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">Request lifecycle</p>
            <ol className="space-y-4">
              {apiDocsConfig.overview.steps.map((step) => (
                <li
                  key={step.title}
                  className="bg-card/50 hover:bg-card/80 hover:border-primary/20 border-border/50 rounded-2xl border p-4 transition-all duration-300"
                >
                  <span className="text-foreground text-sm font-semibold">{step.title}</span>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-muted-foreground mb-3 text-xs tracking-wide uppercase">Guaranteed safeguards</p>
            <ul className="space-y-3">
              {apiDocsConfig.overview.guarantees.map((item) => (
                <li key={item.label} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500/15 text-green-400">
                    <IconCheck size={14} />
                  </span>
                  <div>
                    <p className="text-foreground font-medium">{item.label}</p>
                    <p className="text-muted-foreground text-xs">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
