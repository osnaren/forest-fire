import Image from 'next/image';
import { useCallback, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { UploadItem, UploadMode } from '../types';

interface PreviewGridProps {
  items: UploadItem[];
  disabled?: boolean;
  onRemove: (id: string) => void;
  onAddMore?: (files: File[]) => void;
  mode?: UploadMode;
  maxFiles?: number;
  compact?: boolean;
}

const statusMeta = {
  ready: {
    label: 'Ready',
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

export function PreviewGrid({ items, disabled, onRemove, onAddMore, mode, maxFiles, compact }: PreviewGridProps) {
  const addInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddMoreClick = useCallback(() => {
    addInputRef.current?.click();
  }, []);

  const handleMoreSelected = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? []);
      if (files.length) {
        // forward to parent, parent will enforce limits
        onAddMore?.(files);
      }
      event.target.value = '';
    },
    [onAddMore]
  );

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
    <motion.div layout className={cn('grid gap-4', columnClass)}>
      <AnimatePresence mode="popLayout">
        {items.map((item) => {
          const meta = statusMeta[item.status];
          if (compact) {
            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="group border-border/60 bg-card/80">
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.previewUrl}
                        alt={item.file.name}
                        width={48}
                        height={48}
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium" title={item.file.name}>
                        {item.file.name}
                      </p>
                      <p className="text-muted-foreground text-xs">{formatFileSize(item.file.size)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className={cn('text-[11px] font-medium', meta.badge)}>
                        {meta.label}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
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
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          }

          return (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="group border-border/60 bg-card/80 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/30"
              >
                <CardContent className="flex flex-col gap-4 p-0">
                  <div className="relative w-full overflow-hidden pt-[100%]">
                    <Image
                      fill
                      src={item.previewUrl}
                      alt={item.file.name}
                      unoptimized
                      className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                      <Badge variant="outline" className={cn('text-[11px] font-medium backdrop-blur-md shadow-sm', meta.badge)}>
                        {meta.label}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="border-border/60 bg-card/70 absolute top-3 right-3 h-8 w-8 rounded-full border opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 z-10 backdrop-blur-md"
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
                      <div className="bg-background/60 absolute inset-0 flex items-center justify-center backdrop-blur-sm z-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                      </div>
                    ) : null}
                    {item.status === 'success' ? (
                      <div className="absolute right-3 bottom-3 flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-medium text-emerald-200 backdrop-blur-md border border-emerald-500/20 shadow-sm z-10">
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
                  <div className="border-border/50 text-muted-foreground flex flex-col gap-1 border-t p-4 text-xs bg-card/40">
                    <p className="text-foreground/90 truncate font-medium" title={item.file.name}>
                      {item.file.name}
                    </p>
                    <div className="flex items-center justify-between opacity-80">
                      <span>{formatFileSize(item.file.size)}</span>
                      {item.durationMs ? <span>{`${item.durationMs.toFixed(0)}ms`}</span> : null}
                    </div>
                    {item.error ? <p className="text-red-400 font-medium mt-1">{item.error}</p> : null}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Add more placeholder for bulk mode when space remains */}
      {onAddMore && mode === 'bulk' && typeof maxFiles === 'number' && items.length < maxFiles ? (
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="group border-border/50 bg-card/30 flex h-full items-center justify-center border-dashed hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors cursor-pointer" onClick={handleAddMoreClick}>
            <CardContent className="flex w-full h-full items-center justify-center p-6">
              <div className="flex flex-col items-center gap-3">
                <div
                  className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/50 text-muted-foreground transition-colors group-hover:border-emerald-500/40 group-hover:text-emerald-400',
                    disabled ? 'pointer-events-none opacity-60' : ''
                  )}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground/80 group-hover:text-emerald-400 transition-colors">Add more</p>
                  <p className="text-muted-foreground text-xs mt-1">{maxFiles - items.length} slots remaining</p>
                </div>
              </div>
              <input
                ref={addInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleMoreSelected}
                disabled={disabled}
              />
            </CardContent>
          </Card>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
