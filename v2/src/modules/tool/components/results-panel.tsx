import Image from 'next/image';
import { useMemo } from 'react';
import { motion } from 'motion/react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatProbability } from '@/lib/prediction-utils';
import { cn } from '@/lib/utils';

import { toolConfig } from '@/config/pages';
import type { UploadItem, UploadMode } from '../types';

const CLASS_VARIANT: Record<string, 'fire' | 'smoke' | 'no-fire' | 'default'> = {
  Fire: 'fire',
  Smoke: 'smoke',
  SmokeFire: 'fire',
  'No Fire': 'no-fire',
};

const CLASS_LABEL: Record<string, string> = {
  Fire: 'Fire Detected',
  Smoke: 'Smoke Detected',
  SmokeFire: 'Smoke & Fire Detected',
  'No Fire': 'No Fire Detected',
};

interface ResultsPanelProps {
  mode: UploadMode;
  items: UploadItem[];
}

function sortResults(results: UploadItem['results']): UploadItem['results'] {
  if (!results) {
    return undefined;
  }

  return [...results].sort((a, b) => b.probability - a.probability);
}

function renderBreakdown(results: UploadItem['results']) {
  const sorted = sortResults(results);

  if (!sorted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {sorted.map((result, index) => (
        <motion.div 
          key={result.className} 
          className="space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="text-foreground/90 flex items-center justify-between text-sm font-medium">
            <span>{CLASS_LABEL[result.className] ?? result.className}</span>
            <span>{formatProbability(result.probability)}</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className={cn("h-full w-full flex-1 transition-all", 
                CLASS_VARIANT[result.className] === 'fire' && "bg-red-500",
                CLASS_VARIANT[result.className] === 'smoke' && "bg-orange-500",
                CLASS_VARIANT[result.className] === 'no-fire' && "bg-emerald-500",
                CLASS_VARIANT[result.className] === 'default' && "bg-primary"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${result.probability * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + index * 0.1 }}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            {toolConfig.classes.find((cls) => cls.name === result.className)?.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function getTopResult(results: UploadItem['results']) {
  const sorted = sortResults(results);
  return sorted?.[0];
}

export function ResultsPanel({ mode, items }: ResultsPanelProps) {
  const actionableItems = useMemo(() => items.filter((item) => item.status !== 'ready'), [items]);

  if (!actionableItems.length) {
    return null;
  }

  if (mode === 'single') {
    const item = actionableItems[0];

    if (!item) {
      return null;
    }

    if (item.status === 'error' || item.error) {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-red-500/40 bg-red-500/10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-red-200">Analysis failed</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-red-200/90">{item.error ?? 'Unable to process the image.'}</CardContent>
          </Card>
        </motion.div>
      );
    }

    if (!item.results) {
      return null;
    }

    const top = getTopResult(item.results);

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-border/60 bg-card/80 shadow-lg overflow-hidden">
          <CardHeader className="gap-2 bg-muted/5 border-b border-border/40">
            <CardTitle className="text-foreground flex items-center gap-3 text-lg">
              <Badge variant="outline" className={cn('border-emerald-500/40 bg-emerald-500/10 text-emerald-300')}>
                {top ? (CLASS_LABEL[top.className] ?? top.className) : 'Analysis'}
              </Badge>
              {top ? (
                <span className="text-muted-foreground text-sm">Confidence {formatProbability(top.probability)}</span>
              ) : null}
            </CardTitle>
            {item.durationMs ? (
              <p className="text-muted-foreground text-xs">Processed in {item.durationMs.toFixed(0)}ms</p>
            ) : null}
          </CardHeader>
          <CardContent className="flex flex-col gap-6 p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative h-48 w-full sm:w-48 shrink-0 overflow-hidden rounded-lg border border-border/50 shadow-sm">
                <Image
                  src={item.previewUrl}
                  alt={item.file.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-1">
                  <span className="text-foreground/90 text-lg font-medium">{item.file.name}</span>
                  <span className="text-muted-foreground text-sm">Analysis complete</span>
                </div>
                <div className="w-full">
                   {renderBreakdown(item.results)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {actionableItems.map((item, index) => {
        const top = getTopResult(item.results);

        if (item.status === 'error' || item.error) {
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-red-500/40 bg-red-500/10">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-red-200">{item.file.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-red-200/80">
                  {item.error ?? 'Unable to process this image.'}
                </CardContent>
              </Card>
            </motion.div>
          );
        }

        if (!item.results || !top) {
          return null;
        }

        return (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="border-border/60 bg-card/80 shadow-lg overflow-hidden">
              <CardHeader className="flex flex-col gap-2 p-4 bg-muted/5 border-b border-border/40">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border/50">
                      <Image
                        src={item.previewUrl}
                        alt={item.file.name}
                        width={48}
                        height={48}
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <CardTitle className="text-foreground/90 text-base">{item.file.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        Top result:{' '}
                        <span className="text-foreground font-semibold">
                          {CLASS_LABEL[top.className] ?? top.className}
                        </span>{' '}
                        ({formatProbability(top.probability)})
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      'border-border/50 self-start bg-transparent text-xs font-medium',
                      top ? `text-foreground` : 'text-muted-foreground'
                    )}
                  >
                    {top ? (CLASS_LABEL[top.className] ?? top.className) : 'Completed'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 p-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`breakdown-${item.id}`} className="border-none">
                    <AccordionTrigger className="px-4 py-3 text-sm hover:bg-muted/5 hover:no-underline">View confidence breakdown</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-0">
                      <div className="pt-2">
                        {renderBreakdown(item.results)}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
