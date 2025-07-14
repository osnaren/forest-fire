import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { apiDocsConfig } from '@/config/api-docs';

export function ErrorCodes() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-primary">Error Codes</CardTitle>
        <CardDescription>Common error responses and their meanings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="400" className="w-full">
          <TabsList className="mb-6 w-full justify-start">
            {apiDocsConfig.errorCodes.map((error) => (
              <TabsTrigger key={error.code} value={error.code} className="flex items-center gap-2">
                <Badge variant={error.color as any} className="font-mono text-[10px]">
                  {error.code}
                </Badge>
                <span>{error.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {apiDocsConfig.errorCodes.map((error) => (
            <TabsContent key={error.code} value={error.code} className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1 space-y-4">
                  <div className="border-border/50 bg-card/30 rounded-lg border p-4">
                    <h4 className="text-foreground mb-2 font-semibold">{error.title}</h4>
                    <p className="text-muted-foreground text-sm">{error.description}</p>

                    <div className="mt-4">
                      <h5 className="text-muted-foreground mb-2 text-sm font-medium">Common causes:</h5>
                      <ul className="text-muted-foreground space-y-1 text-sm">
                        {error.examples.map((example, idx) => (
                          <li key={idx}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`rounded-lg border p-4 ${
                      error.code === '429'
                        ? 'border-amber-500/20 bg-amber-500/5'
                        : error.code === '500'
                          ? 'border-red-500/20 bg-red-500/5'
                          : 'border-border/50 bg-card/20'
                    }`}
                  >
                    <h5 className="mb-2 text-sm font-medium">How to handle:</h5>
                    <ul className="text-muted-foreground space-y-1 text-xs">
                      {error.handlingTips.map((tip, tipIndex) => (
                        <li key={tipIndex}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 md:w-1/2">
                  <h4 className="text-sm font-semibold">Response Example</h4>
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

        <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <div className="flex items-start space-x-3">
            <div className="text-blue-500">💡</div>
            <div className="space-y-1">
              <h5 className="font-semibold text-blue-600 dark:text-blue-400">Error Handling Tips</h5>
              <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li>• Always check the response status code</li>
                <li>• Parse error messages for detailed information</li>
                <li>• Implement retry logic with exponential backoff for 429/500 errors</li>
                <li>• Validate files client-side before uploading</li>
                <li>• Monitor rate limit headers to prevent 429 errors</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
