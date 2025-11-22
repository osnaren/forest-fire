import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiDocsConfig } from '@/config/api-docs';

export function ErrorCodes() {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-primary">Error Codes</CardTitle>
        <CardDescription>Common responses, failure modes, and mitigation strategies</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="400" className="w-full space-y-6">
          <div className="scrollbar-hide overflow-x-auto pb-2">
            <TabsList className="flex w-max gap-2 bg-transparent p-0">
              {apiDocsConfig.errorCodes.map((error) => (
                <TabsTrigger
                  key={error.code}
                  value={error.code}
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 hover:bg-muted/50 flex items-center gap-2 rounded-full border border-transparent px-4 py-2 transition-all duration-300"
                >
                  <Badge variant={error.color} className="font-mono text-[10px]">
                    {error.code}
                  </Badge>
                  <span className="text-sm font-medium">{error.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {apiDocsConfig.errorCodes.map((error) => (
            <TabsContent key={error.code} value={error.code} className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1 space-y-4">
                  <div className="border-border/60 bg-card/50 rounded-2xl border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-foreground text-lg font-semibold">{error.title}</h4>
                      <Badge variant="outline" className="font-mono text-[11px]">
                        HTTP {error.code}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{error.description}</p>

                    <div className="mt-4 space-y-2">
                      <h5 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                        Common causes
                      </h5>
                      <ul className="text-muted-foreground space-y-1 text-sm">
                        {error.examples.map((example) => (
                          <li key={example}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`rounded-2xl border p-4 ${
                      error.code === '429'
                        ? 'border-amber-500/30 bg-amber-500/10'
                        : error.code === '500'
                          ? 'border-red-500/30 bg-red-500/10'
                          : 'border-border/60 bg-card/40'
                    }`}
                  >
                    <h5 className="mb-2 text-sm font-medium">How to handle</h5>
                    <ul className="text-foreground/80 space-y-1 text-xs">
                      {error.handlingTips.map((tip) => (
                        <li key={tip}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 md:w-1/2">
                  <h4 className="text-sm font-semibold">Response example</h4>
                  <CodeBlock
                    language="json"
                    filename={`${error.code}_response.json`}
                    code={JSON.stringify(error.response, null, 2)}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h5 className="font-semibold text-blue-900 dark:text-blue-200">{apiDocsConfig.generalTips.title}</h5>
              <p className="text-xs text-blue-900/80 dark:text-blue-200/80">
                Build resilient clients by treating every non-200 response explicitly.
              </p>
            </div>
            <ul className="space-y-1 text-sm text-blue-900 dark:text-blue-100">
              {apiDocsConfig.generalTips.items.map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
