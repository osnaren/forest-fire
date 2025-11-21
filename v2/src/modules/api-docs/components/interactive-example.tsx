'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { apiDocsConfig } from '@/config/api-docs';
import { PredictionResponse } from '@/lib/types';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { BsArrowLeftRight, BsArrowsExpandVertical, BsTerminal } from 'react-icons/bs';
import { PiWarningCircle } from 'react-icons/pi';
import { SiGo, SiJavascript, SiNodedotjs, SiPython } from 'react-icons/si';

export function InteractiveExample() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<PredictionResponse | { error: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'javascript':
        return <SiJavascript className="text-yellow-400" />;
      case 'python':
        return <SiPython className="text-blue-500" />;
      case 'nodejs':
        return <SiNodedotjs className="text-green-500" />;
      case 'go':
        return <SiGo className="text-cyan-500" />;
      case 'curl':
        return <BsTerminal className="text-gray-400" />;
      default:
        return null;
    }
  };

  const handleTryIt = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Fetch the test image from the public folder
      const imageResponse = await fetch('/test-image.jpg');
      if (!imageResponse.ok) {
        throw new Error('Failed to load test image.');
      }
      const imageBlob = await imageResponse.blob();

      const formData = new FormData();
      formData.append('image', imageBlob, 'test-image.jpg');

      const apiResponse = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      const result = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(result.error || `Request failed with status ${apiResponse.status}`);
      }

      // Simulate a slight delay for better UX if response is too fast
      await new Promise((resolve) => setTimeout(resolve, 500));

      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const currentLangConfig = apiDocsConfig.languages.find((l) => l.id === selectedLanguage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-primary/20 from-primary/5 to-accent/5 bg-linear-to-br backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-primary">{apiDocsConfig.testing.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {apiDocsConfig.endpoint.method}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                {apiDocsConfig.endpoint.path}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-sm">{apiDocsConfig.testing.description}</p>

          {/* Language Selector */}
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-fit gap-2">
              {apiDocsConfig.languages.map((lang) => (
                <Button
                  key={lang.id}
                  variant={selectedLanguage === lang.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`text-xs whitespace-nowrap transition-all duration-200 ${
                    selectedLanguage === lang.id
                      ? 'border-primary/30 bg-primary/10 text-primary shadow-sm'
                      : 'hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <span className="mr-2 h-4 w-4">{getIcon(lang.id)}</span>
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Code Example */}
            <div className="min-w-0 space-y-3">
              <h4 className="text-foreground text-sm font-semibold">Code Example</h4>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLanguage}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CodeBlock
                    language={currentLangConfig?.syntaxHighlight || 'text'}
                    filename={`example.${currentLangConfig?.fileExtension}`}
                    code={currentLangConfig?.code || ''}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="border-border/50 bg-muted/20 mt-4 rounded-md border p-3">
                <h5 className="text-muted-foreground mb-2 text-xs font-medium">
                  {apiDocsConfig.testing.sampleImage.title}
                </h5>
                <div className="flex items-center justify-center">
                  <div className="border-border relative h-32 w-32 overflow-hidden rounded-md border shadow-sm transition-transform hover:scale-105">
                    <Image src="/test-image.jpg" alt="Sample Test Image" fill className="object-cover" />
                  </div>
                </div>
                <p className="text-muted-foreground mt-2 text-center text-xs">
                  {apiDocsConfig.testing.sampleImage.description}
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  {apiDocsConfig.testing.sampleImage.colors.map((color) => (
                    <span
                      key={color}
                      role="img"
                      className="h-4 w-4 rounded-full border border-black/20"
                      style={{ backgroundColor: color }}
                      aria-label={`Palette color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Try It Live */}
            <div className="min-w-0 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-foreground text-sm font-semibold">Try It Live</h4>
                <Button
                  onClick={handleTryIt}
                  disabled={isLoading}
                  size="sm"
                  className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 border transition-colors"
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {apiDocsConfig.testing.loadingText}
                    </>
                  ) : (
                    apiDocsConfig.testing.tryItButton
                  )}
                </Button>
              </div>

              <div className="border-border/50 bg-card/30 min-h-[300px] overflow-hidden rounded-lg border p-4 shadow-inner">
                <AnimatePresence mode="wait">
                  {!response && !error && !isLoading && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full flex-col items-center justify-center px-4 py-8 text-center"
                    >
                      <div className="bg-muted/30 mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                        <PiWarningCircle className="text-muted-foreground size-8" />
                      </div>
                      <p className="text-muted-foreground mb-2 text-sm">{apiDocsConfig.testing.emptyState.title}</p>
                      <p className="text-muted-foreground text-xs">{apiDocsConfig.testing.emptyState.subtitle}</p>
                    </motion.div>
                  )}

                  {isLoading && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full flex-col items-center justify-center px-4 py-12"
                    >
                      <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                        <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
                      </div>
                      <p className="text-primary text-sm font-medium">{apiDocsConfig.testing.processingText}</p>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-4"
                    >
                      <div className="border-destructive flex items-center gap-3 border-l-4 py-2 pl-3">
                        <Badge variant="destructive" className="text-xs">
                          ERROR
                        </Badge>
                        <span className="text-destructive text-sm font-medium">Request Failed</span>
                      </div>
                      <CodeBlock language="json" filename="error.json" code={JSON.stringify({ error }, null, 2)} />
                      <div className="bg-destructive/5 border-destructive/20 text-destructive/90 rounded-md border p-3 text-xs">
                        <p className="mb-1 font-medium">Troubleshooting tips:</p>
                        <ul className="list-disc space-y-1 pl-4">
                          {apiDocsConfig.testing.troubleshooting.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {response && (
                    <motion.div
                      key="response"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-3 border-l-4 border-green-500 py-2 pl-3">
                        <Badge variant="default" className="bg-green-600 text-xs">
                          200
                        </Badge>
                        <span className="text-sm font-medium text-green-600">Success</span>
                        <span className="text-muted-foreground ml-auto text-xs">
                          {'processingTime' in response &&
                            response.processingTime &&
                            new Date(response.processingTime).toLocaleTimeString()}
                        </span>
                      </div>
                      <CodeBlock language="json" filename="response.json" code={JSON.stringify(response, null, 2)} />

                      {response && 'results' in response && response.results && response.results.length > 0 && (
                        <div className="bg-accent/10 border-accent/20 rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-accent font-medium">Top Prediction: </span>
                              <span className="font-mono">{response.results[0].className}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-muted h-2 w-16 overflow-hidden rounded-full">
                                <motion.div
                                  className="bg-accent h-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${response.results[0].probability * 100}%` }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                ></motion.div>
                              </div>
                              <span className="text-muted-foreground text-xs">
                                {(response.results[0].probability * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="border-border/50 mt-2 border-t pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="min-w-0 space-y-3">
                <div className="flex items-center gap-2">
                  <BsArrowLeftRight className="text-primary" />
                  <h5 className="text-foreground text-sm font-medium">Request Details</h5>
                </div>

                <dl className="space-y-2">
                  {Object.entries(apiDocsConfig.request.details).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col gap-1 text-xs sm:flex-row sm:items-start sm:justify-between"
                    >
                      <dt className="text-muted-foreground shrink-0 font-medium">{key}:</dt>
                      <dd className="font-mono wrap-break-word sm:text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="min-w-0 space-y-3">
                <div className="flex items-center gap-2">
                  <BsArrowsExpandVertical className="text-accent" />
                  <h5 className="text-foreground text-sm font-medium">Response Format</h5>
                </div>

                <dl className="space-y-2">
                  {Object.entries(apiDocsConfig.response.details).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col gap-1 text-xs sm:flex-row sm:items-start sm:justify-between"
                    >
                      <dt className="text-muted-foreground shrink-0 font-medium">{key}:</dt>
                      <dd className="wrap-break-word sm:text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
