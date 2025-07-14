import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { apiDocsConfig } from '@/config/api-docs';

export function ApiOverview() {
  const requestExample = `curl -X POST \\
  ${apiDocsConfig.endpoint.url} \\
  -F "image=@forest.jpg" \\
  -H "Content-Type: ${apiDocsConfig.request.contentType}"`;

  const responseExample = JSON.stringify(apiDocsConfig.response.example, null, 2);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-primary">{apiDocsConfig.endpoint.title}</CardTitle>
        <CardDescription>{apiDocsConfig.endpoint.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="mb-2 font-semibold text-accent">{apiDocsConfig.endpoint.method} {apiDocsConfig.endpoint.path}</h4>
          <p className="text-muted-foreground mb-4 text-sm">
            Upload an image to get fire, smoke, and no-fire probability predictions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h5 className="text-foreground mb-3 font-semibold">Request Format</h5>
            <CodeBlock language="bash" filename="Example Request" code={requestExample} />
            <div className="text-muted-foreground mt-3 text-sm">
              <p>• Content-Type: {apiDocsConfig.request.contentType}</p>
              <p>• Body: image file (max {apiDocsConfig.request.maxFileSize}MB)</p>
              <p>• Supported formats: {apiDocsConfig.request.supportedFormats.join(', ')}</p>
            </div>
          </div>

          <div>
            <h5 className="text-foreground mb-3 font-semibold">Response Format</h5>
            <CodeBlock language="json" filename="Example Response" code={responseExample} />
            <div className="text-muted-foreground mt-3 text-sm">
              <p>• Results sorted by probability (highest first)</p>
              <p>• Probabilities range from 0 to 1</p>
              <p>• Processing time in {apiDocsConfig.response.timestampFormat}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
