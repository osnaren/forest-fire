import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import type { UploadMode } from '../types';

interface UploadAreaProps {
  mode: UploadMode;
  maxBulkFiles: number;
  maxFileSizeLabel: string;
  supportedFormats: string[];
  tips: string[];
  bulkLimitNotice?: string;
  totalFiles: number;
  disabled?: boolean;
  modeLocked: boolean;
  autoLocked?: boolean;
  lockReason?: string | null;
  onToggleLock: () => void;
  onModeChange: (mode: UploadMode) => void;
  onFilesAdded: (files: File[]) => void;
  onClear: () => void;
}

function extractFilesFromDataTransfer(dataTransfer: DataTransfer): File[] {
  const files: File[] = [];

  if (dataTransfer.items) {
    for (let i = 0; i < dataTransfer.items.length; i += 1) {
      const item = dataTransfer.items[i];
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }
  } else {
    for (let i = 0; i < dataTransfer.files.length; i += 1) {
      files.push(dataTransfer.files[i]);
    }
  }

  return files;
}

export function UploadArea({
  mode,
  maxBulkFiles,
  maxFileSizeLabel,
  supportedFormats,
  tips,
  bulkLimitNotice,
  totalFiles,
  disabled,
  modeLocked,
  autoLocked = false,
  lockReason,
  onToggleLock,
  onModeChange,
  onFilesAdded,
  onClear,
}: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleSelectFiles = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const files = Array.from(event.target.files ?? []);
      if (files.length) {
        onFilesAdded(files);
      }
      event.target.value = '';
    },
    [onFilesAdded]
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragActive(false);

      const items = extractFilesFromDataTransfer(event.dataTransfer);
      if (items.length) {
        onFilesAdded(items);
      }
    },
    [onFilesAdded]
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!isDragActive) {
        setIsDragActive(true);
      }
    },
    [isDragActive]
  );

  const handleDragLeave = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (isDragActive) {
        setIsDragActive(false);
      }
    },
    [isDragActive]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <Card className="border-border/60 bg-card/70 shadow-lg">
      <CardHeader className="border-border/60 flex flex-col gap-4 border-b pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-foreground/90 text-lg font-semibold">Upload images</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-xs text-emerald-300">
              Max {mode === 'bulk' ? `${maxBulkFiles} files` : '1 file'}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground text-xs">
              {maxFileSizeLabel} each
            </Badge>
            <TooltipProvider>
              <Tooltip delayDuration={80}>
                <TooltipTrigger asChild>
                  <Button
                    variant={modeLocked ? 'secondary' : 'outline'}
                    size="icon"
                    className={cn(
                      'border-border/60 h-8 w-8 rounded-full border transition-all',
                      modeLocked && 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
                    )}
                    onClick={onToggleLock}
                    disabled={autoLocked}
                    aria-pressed={modeLocked}
                    aria-label={modeLocked ? 'Unlock upload mode selection' : 'Lock upload mode selection'}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      {modeLocked ? (
                        <path
                          d="M17 11H7V9a5 5 0 0 1 10 0v2Zm-5 4v-2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      ) : (
                        <path
                          d="M12 17v-2m5-4H7V9a5 5 0 1 1 10 0v2Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={6} className="max-w-xs text-xs">
                  {lockReason ??
                    (modeLocked
                      ? 'Unlock to switch between single and batch modes.'
                      : 'Lock the current mode to avoid accidental switches.')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <Tabs value={mode} onValueChange={(value) => onModeChange(value as UploadMode)} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="single" disabled={modeLocked}>
              Single image
            </TabsTrigger>
            <TabsTrigger value="bulk" disabled={modeLocked}>
              Batch upload
            </TabsTrigger>
          </TabsList>
          <TabsContent value="single" />
          <TabsContent value="bulk" />
        </Tabs>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div
          role="presentation"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'border-border/70 bg-muted/10 relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-8 text-center transition-all',
            isDragActive && 'border-emerald-400 bg-emerald-400/10 shadow-inner',
            disabled && 'pointer-events-none opacity-60'
          )}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple={mode === 'bulk'}
            onChange={handleSelectFiles}
            disabled={disabled}
          />
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <div className="space-y-1">
            <p className="text-foreground/90 text-base font-semibold">
              {isDragActive ? 'Drop images to add them' : 'Click or drag & drop your images'}
            </p>
            <p className="text-muted-foreground text-sm">
              Supported: {supportedFormats.join(', ')} • {maxFileSizeLabel} limit
            </p>
            {mode === 'bulk' && bulkLimitNotice && (
              <p className="text-muted-foreground/80 text-xs">{bulkLimitNotice}</p>
            )}
            {totalFiles > 0 && (
              <p className="text-xs text-emerald-400">
                {totalFiles} image{totalFiles > 1 ? 's' : ''} selected
              </p>
            )}
          </div>
        </div>
        <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex flex-wrap gap-2">
            {tips.map((tip) => (
              <Badge key={tip} variant="outline" className="border-border/60 bg-transparent text-xs">
                {tip}
              </Badge>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={onClear} disabled={disabled || totalFiles === 0}>
            Clear selection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
