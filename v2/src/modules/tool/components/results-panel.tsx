import Image from 'next/image';
import { useMemo } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
      {sorted.map((result) => (
        <div key={result.className} className="space-y-2">
          <div className="text-foreground/90 flex items-center justify-between text-sm font-medium">
            <span>{CLASS_LABEL[result.className] ?? result.className}</span>
            <span>{formatProbability(result.probability)}</span>
          </div>
          <Progress value={result.probability * 100} variant={CLASS_VARIANT[result.className] ?? 'default'} />
          <p className="text-muted-foreground text-xs">
            {toolConfig.classes.find((cls) => cls.name === result.className)?.description}
          </p>
        </div>
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
        <Card className="border-red-500/40 bg-red-500/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-red-200">Prediction failed</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-red-200/90">{item.error ?? 'Unable to process the image.'}</CardContent>
        </Card>
      );
    }

    if (!item.results) {
      return null;
    }

    const top = getTopResult(item.results);

    return (
      <Card className="border-border/60 bg-card/80 shadow-lg">
        <CardHeader className="gap-2">
          <CardTitle className="text-foreground flex items-center gap-3 text-lg">
            <Badge variant="outline" className={cn('border-emerald-500/40 bg-emerald-500/10 text-emerald-300')}>
              {top ? (CLASS_LABEL[top.className] ?? top.className) : 'Prediction'}
            </Badge>
            {top ? (
              <span className="text-muted-foreground text-sm">Confidence {formatProbability(top.probability)}</span>
            ) : null}
          </CardTitle>
          {item.durationMs ? (
            <p className="text-muted-foreground text-xs">Processed in {item.durationMs.toFixed(0)}ms</p>
          ) : null}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={item.previewUrl}
                alt={item.file.name}
                width={64}
                height={64}
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-foreground/90">{item.file.name}</span>
              {item.durationMs ? (
                <span className="text-xs text-muted-foreground">Processed in {item.durationMs.toFixed(0)}ms</span>
              ) : null}
            </div>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="breakdown">
              <AccordionTrigger className="px-0">View confidence breakdown</AccordionTrigger>
              <AccordionContent>{renderBreakdown(item.results)}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {actionableItems.map((item) => {
        const top = getTopResult(item.results);

        if (item.status === 'error' || item.error) {
          return (
            <Card key={item.id} className="border-red-500/40 bg-red-500/10">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-red-200">{item.file.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-red-200/80">
                {item.error ?? 'Unable to process this image.'}
              </CardContent>
            </Card>
          );
        }

        if (!item.results || !top) {
          return null;
        }

        return (
          <Card key={item.id} className="border-border/60 bg-card/80 shadow-lg">
            <CardHeader className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
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
                    {item.durationMs ? (
                      <p className="text-muted-foreground/80 text-xs">Processed in {item.durationMs.toFixed(0)}ms</p>
                    ) : null}
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
            <CardContent className="flex flex-col gap-4">
              <Accordion type="single" collapsible>
                <AccordionItem value={`breakdown-${item.id}`}>
                  <AccordionTrigger className="px-0">View confidence breakdown</AccordionTrigger>
                  <AccordionContent>{renderBreakdown(item.results)}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
