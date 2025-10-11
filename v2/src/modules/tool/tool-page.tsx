'use client';

import { useMemo, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { toolConfig } from '@/config/pages';
import type { PredictionResponse } from '@/lib/types';
import { cn } from '@/lib/utils';

import { PreviewGrid } from './components/preview-grid';
import { ResultsPanel } from './components/results-panel';
import { ToolStepper } from './components/tool-stepper';
import { UploadArea } from './components/upload-area';
import type { UploadItem, UploadMode } from './types';

const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createUploadItem(file: File, previewUrl: string): UploadItem {
  return {
    id: generateId(),
    file,
    previewUrl,
    status: 'idle',
  };
}

function normalizeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred. Please try again.';
}

function sanitizeResults(results: PredictionResponse['results']) {
  return results?.map((result) => ({
    ...result,
    probability: Math.min(Math.max(result.probability, 0), 1),
  }));
}

export function ToolPage() {
  const [mode, setMode] = useState<UploadMode>('single');
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusBanner, setStatusBanner] = useState<{
    tone: 'info' | 'success' | 'warning' | 'error';
    message: string;
  } | null>(null);
  const [modeLocked, setModeLocked] = useState(false);
  const previewRegistry = useRef(new Set<string>());

  const maxFiles = mode === 'single' ? 1 : (toolConfig.maxBulkFiles ?? 6);

  const hasResults = uploads.some((item) => item.status === 'success' || item.status === 'error');
  const activeStep = uploads.length === 0 ? 0 : hasResults ? 2 : 1;
  const completedCount = uploads.filter((item) => item.status === 'success').length;
  const uploadingCount = uploads.filter((item) => item.status === 'uploading').length;

  const canSubmit = uploads.length > 0 && uploads.every((item) => item.status !== 'uploading') && !isProcessing;
  const autoModeLock = isProcessing || uploadingCount > 0;
  const isModeLocked = autoModeLock || modeLocked;
  const lockReason = autoModeLock
    ? 'Uploads in progress — finish or reset to change modes.'
    : modeLocked
      ? 'Mode locked to prevent accidental switching.'
      : null;

  const helperText = useMemo(() => {
    if (isProcessing) {
      const total = uploads.length;
      const inProgress = uploadingCount;
      return `Processing ${completedCount}/${total} completed${inProgress ? ` · ${inProgress} in progress` : ''}`;
    }

    if (uploads.length && !hasResults) {
      return 'Ready to submit your selected images.';
    }

    if (hasResults) {
      return 'Review the predictions below or upload more images to run new checks.';
    }

    return 'Start by adding images of forested areas or wildfire scenes to analyze them.';
  }, [completedCount, hasResults, isProcessing, uploadingCount, uploads]);

  const revokePreview = (url: string) => {
    if (!url) {
      return;
    }

    if (previewRegistry.current.has(url)) {
      URL.revokeObjectURL(url);
      previewRegistry.current.delete(url);
    }
  };

  const resetStatuses = () => {
    setUploads((prev) => prev.map((item) => ({ ...item, status: 'idle', error: undefined, results: undefined })));
  };

  const handleModeChange = (nextMode: UploadMode) => {
    if (nextMode === mode || isModeLocked) {
      return;
    }

    setMode(nextMode);
    setStatusBanner(null);

    if (nextMode === 'single' && uploads.length > 1) {
      const [first, ...rest] = uploads;
      rest.forEach((item) => revokePreview(item.previewUrl));
      setUploads(first ? [first] : []);
    }
  };

  const handleClear = () => {
    uploads.forEach((item) => revokePreview(item.previewUrl));
    previewRegistry.current.clear();
    setUploads([]);
    setStatusBanner(null);
    setModeLocked(false);
  };

  const handleRemove = (id: string) => {
    setUploads((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        revokePreview(target.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleFilesAdded = (files: File[]) => {
    if (!files.length) {
      return;
    }

    const existingCount = uploads.length;
    const availableSlots = Math.max(maxFiles - existingCount, 0);

    if (availableSlots <= 0) {
      setStatusBanner({
        tone: 'warning',
        message: `You already selected the maximum of ${maxFiles} image${maxFiles > 1 ? 's' : ''}. Remove an image to add a new one.`,
      });
      return;
    }

    const accepted: UploadItem[] = [];
    const errors: string[] = [];

    const dedupeKey = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;
    const existingKeys = new Set(uploads.map((item) => dedupeKey(item.file)));

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name} is not an image and was skipped.`);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        errors.push(`${file.name} exceeds the ${toolConfig.maxFileSize} limit.`);
        return;
      }

      const key = dedupeKey(file);
      if (existingKeys.has(key)) {
        errors.push(`${file.name} is already in the queue.`);
        return;
      }

      if (accepted.length >= availableSlots) {
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      previewRegistry.current.add(previewUrl);
      accepted.push(createUploadItem(file, previewUrl));
    });

    if (accepted.length === availableSlots && files.length > accepted.length) {
      errors.push(
        `Only the first ${availableSlots} image${availableSlots > 1 ? 's were' : ' was'} added due to the batch limit.`
      );
    }

    if (accepted.length === 0) {
      setStatusBanner({ tone: 'error', message: errors.join(' ') });
      return;
    }

    if (mode === 'single') {
      uploads.forEach((item) => revokePreview(item.previewUrl));
      previewRegistry.current = new Set(accepted.map((item) => item.previewUrl));
      setUploads(accepted.slice(0, 1));
    } else {
      setUploads((prev) => [...prev, ...accepted]);
    }

    if (errors.length) {
      setStatusBanner({ tone: 'warning', message: errors.join(' ') });
    } else {
      setStatusBanner({
        tone: 'info',
        message: `${accepted.length} image${accepted.length > 1 ? 's' : ''} ready for analysis in ${mode} mode.`,
      });
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    setStatusBanner({ tone: 'info', message: 'Starting predictions… hang tight.' });
    setIsProcessing(true);
    resetStatuses();

    let successCount = 0;
    let errorCount = 0;

    for (const item of uploads) {
      const start = performance.now();

      setUploads((prev) =>
        prev.map((entry) => (entry.id === item.id ? { ...entry, status: 'uploading', error: undefined } : entry))
      );

      const formData = new FormData();
      formData.append('image', item.file);

      try {
        const response = await fetch('/api/predict', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          let message = response.statusText;
          try {
            const errorBody = await response.json();
            message = errorBody?.error ?? message;
          } catch (error) {
            const fallback = normalizeError(error);
            message = fallback;
          }
          throw new Error(message);
        }

        const data = (await response.json()) as PredictionResponse;
        const duration = performance.now() - start;
        successCount += 1;

        setUploads((prev) =>
          prev.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  status: 'success',
                  results: sanitizeResults(data.results),
                  durationMs: duration,
                  processedAt: data.processingTime,
                }
              : entry
          )
        );
      } catch (error) {
        const message = normalizeError(error);
        errorCount += 1;
        setUploads((prev) =>
          prev.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  status: 'error',
                  error: message,
                }
              : entry
          )
        );
      }
    }

    setIsProcessing(false);

    if (errorCount && successCount) {
      setStatusBanner({
        tone: 'warning',
        message: `${successCount} predictions succeeded, ${errorCount} failed. Review results below.`,
      });
      return;
    }

    if (errorCount) {
      setStatusBanner({ tone: 'error', message: 'All predictions failed. Please try again with different images.' });
      return;
    }

    setStatusBanner({ tone: 'success', message: 'Predictions complete! Explore the confidence breakdowns below.' });
  };

  const handleToggleModeLock = () => {
    if (autoModeLock) {
      return;
    }
    setModeLocked((prev) => !prev);
  };

  return (
    <main className="bg-background relative flex min-h-screen flex-col">
      <section className="relative z-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <header className="flex flex-col gap-4 text-center md:text-left">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Intelligent wildfire analysis
            </div>
            <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">{toolConfig.title}</h1>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">{toolConfig.description}</p>
          </header>

          <ToolStepper steps={toolConfig.steps} activeStep={activeStep} />

          <UploadArea
            mode={mode}
            maxBulkFiles={toolConfig.maxBulkFiles}
            maxFileSizeLabel={toolConfig.maxFileSize}
            supportedFormats={toolConfig.supportedFormats}
            tips={toolConfig.tips}
            bulkLimitNotice={toolConfig.bulkLimitNotice}
            totalFiles={uploads.length}
            disabled={isProcessing}
            modeLocked={isModeLocked}
            lockReason={lockReason}
            autoLocked={autoModeLock}
            onToggleLock={handleToggleModeLock}
            onModeChange={handleModeChange}
            onFilesAdded={handleFilesAdded}
            onClear={handleClear}
          />

          <PreviewGrid items={uploads} onRemove={handleRemove} disabled={isProcessing} />

          <Card className="border-border/60 bg-card/80">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-muted-foreground flex flex-col gap-1 text-sm">
                <span className="text-foreground/90 font-medium">Workflow status</span>
                <span>{helperText}</span>
                {statusBanner ? (
                  <span
                    className={cn(
                      'text-xs',
                      statusBanner.tone === 'error' && 'text-red-300',
                      statusBanner.tone === 'warning' && 'text-amber-300',
                      statusBanner.tone === 'success' && 'text-emerald-300',
                      statusBanner.tone === 'info' && 'text-sky-300'
                    )}
                  >
                    {statusBanner.message}
                  </span>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={handleClear} disabled={!uploads.length || isProcessing}>
                  Reset
                </Button>
                <Button onClick={handleSubmit} disabled={!canSubmit} size="sm">
                  {isProcessing ? 'Processing…' : mode === 'single' ? 'Analyze image' : 'Analyze batch'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {isProcessing ? <Loading className="py-6" text="Running model predictions" /> : null}

          <ResultsPanel mode={mode} items={uploads} />
        </div>
      </section>
    </main>
  );
}
