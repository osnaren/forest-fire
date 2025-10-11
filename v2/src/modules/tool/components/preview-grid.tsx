import Image from 'next/image';
import { useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { UploadItem } from '../types';

interface PreviewGridProps {
  items: UploadItem[];
  disabled?: boolean;
  onRemove: (id: string) => void;
}

const statusMeta = {
  idle: {
    label: 'Ready to submit',
    badge: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300',
  },
  uploading: {
    label: 'Processing...',
    badge: 'border-amber-400/60 bg-amber-500/10 text-amber-300',
  },
  success: {
    label: 'Completed',
    badge: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300',
  },
  error: {
    label: 'Failed',
    badge: 'border-red-500/60 bg-red-500/10 text-red-300',
  },
} satisfies Record<UploadItem['status'], { label: string; badge: string }>;

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${bytes} B`;
}

export function PreviewGrid({ items, disabled, onRemove }: PreviewGridProps) {
  const hasItems = items.length > 0;

  const columnClass = useMemo(() => {
    if (items.length <= 2) {
      return 'md:grid-cols-2';
    }
    if (items.length <= 4) {
      return 'md:grid-cols-3';
    }
    return 'md:grid-cols-3 xl:grid-cols-4';
  }, [items.length]);

  if (!hasItems) {
    return null;
  }

  return (
    <div className={cn('grid gap-4', columnClass)}>
      {items.map((item) => {
        const meta = statusMeta[item.status];

        return (
          <Card
            key={item.id}
            className="group border-border/60 bg-card/80 relative overflow-hidden transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <CardContent className="flex flex-col gap-4 p-0">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.previewUrl}
                  alt={item.file.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Badge variant="outline" className={cn('text-[11px] font-medium', meta.badge)}>
                    {meta.label}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border-border/60 bg-card/70 absolute top-3 right-3 h-8 w-8 rounded-full border opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => onRemove(item.id)}
                  disabled={disabled || item.status === 'uploading'}
                >
                  <span className="sr-only">Remove image</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </Button>
                {item.status === 'uploading' ? (
                  <div className="bg-background/60 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                  </div>
                ) : null}
                {item.status === 'success' ? (
                  <div className="absolute right-3 bottom-3 flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-medium text-emerald-200 backdrop-blur-sm">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        d="M5 12.5 9.5 17 19 7.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Ready
                  </div>
                ) : null}
              </div>
              <div className="border-border/50 text-muted-foreground flex flex-col gap-1 border-t p-4 text-xs">
                <p className="text-foreground/90 truncate font-medium" title={item.file.name}>
                  {item.file.name}
                </p>
                <div className="flex items-center justify-between">
                  <span>{formatFileSize(item.file.size)}</span>
                  {item.durationMs ? <span>{`${item.durationMs.toFixed(0)}ms`}</span> : null}
                </div>
                {item.error ? <p className="text-red-400">{item.error}</p> : null}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
