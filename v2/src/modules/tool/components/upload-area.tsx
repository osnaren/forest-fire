import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';
import { motion } from 'motion/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  locked: boolean;
  lockReason?: string | null;
  onModeChange: (mode: UploadMode) => void;
  onLockedModeChange?: (mode: UploadMode) => void;
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
  locked,
  lockReason,
  onModeChange,
  onLockedModeChange,
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

  const handleModeTabChange = useCallback(
    (value: string) => {
      const nextMode = value as UploadMode;
      if (nextMode === mode) {
        return;
      }

      if (locked) {
        onLockedModeChange?.(nextMode);
        return;
      }

      onModeChange(nextMode);
    },
    [locked, mode, onLockedModeChange, onModeChange]
  );

  return (
    <Card className="border-border/60 bg-card/70 shadow-lg overflow-hidden">
      <CardHeader className="border-border/60 flex flex-col gap-4 border-b pb-6 bg-muted/5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-foreground/90 text-lg font-semibold">Upload images</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-xs text-emerald-300">
              Max {mode === 'bulk' ? `${maxBulkFiles} files` : '1 file'}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground text-xs">
              {maxFileSizeLabel} each
            </Badge>
          </div>
        </div>
        <Tabs value={mode} onValueChange={handleModeTabChange} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="single">
              Single image
            </TabsTrigger>
            <TabsTrigger value="bulk">
              Batch upload
            </TabsTrigger>
          </TabsList>
          <TabsContent value="single" />
          <TabsContent value="bulk" />
        </Tabs>
        {locked && lockReason ? (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-muted-foreground/80 text-xs"
          >
            {lockReason}
            {onLockedModeChange ? ' You can still switch modes after confirming.' : ''}
          </motion.p>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-6 pt-6">
        <motion.div
          role="presentation"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          animate={{
            borderColor: isDragActive ? 'var(--color-emerald-400)' : 'var(--color-border)',
            backgroundColor: isDragActive ? 'rgba(52, 211, 153, 0.1)' : 'rgba(0, 0, 0, 0.02)',
            scale: isDragActive ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            'border-border/70 relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-all',
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
          <motion.div 
            animate={{ scale: isDragActive ? 1.1 : 1, rotate: isDragActive ? 10 : 0 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <div className="space-y-2">
            <p className="text-foreground/90 text-lg font-semibold">
              {isDragActive ? 'Drop images to add them' : 'Click or drag & drop your images'}
            </p>
            <p className="text-muted-foreground text-sm">
              Supported: {supportedFormats.join(', ')} • {maxFileSizeLabel} limit
            </p>
            {mode === 'bulk' && bulkLimitNotice && (
              <p className="text-muted-foreground/80 text-xs">{bulkLimitNotice}</p>
            )}
            {totalFiles > 0 && (
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-emerald-400"
              >
                {totalFiles} image{totalFiles > 1 ? 's' : ''} selected
              </motion.p>
            )}
          </div>
        </motion.div>
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
