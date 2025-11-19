'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loading } from '@/components/ui/loading';
import { toolConfig } from '@/config/pages';
import { predictFile } from '@/lib/client/predict';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';

import { PreviewGrid } from './components/preview-grid';
import { ResultsPanel } from './components/results-panel';
import { StepContainer } from './components/step-container';
import { ToolStepper } from './components/tool-stepper';
import { UploadArea } from './components/upload-area';
import type { UploadItem, UploadMode } from './types';

type ToolStep = 'upload' | 'review' | 'results';

const STEP_INDEX: Record<ToolStep, number> = {
  upload: 0,
  review: 1,
  results: 2,
};

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
    status: 'ready',
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

export function ToolPage() {
  const [mode, setMode] = useState<UploadMode>('single');
  const [step, setStep] = useState<ToolStep>('upload');
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [modeChangeTarget, setModeChangeTarget] = useState<UploadMode | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusBanner, setStatusBanner] = useState<{
    tone: 'info' | 'success' | 'warning' | 'error';
    message: string;
  } | null>(null);
  const previewRegistry = useRef(new Set<string>());
  const addMoreInputRef = useRef<HTMLInputElement | null>(null);
  const predictionToastRef = useRef<string | null>(null);

  const predictionMode = toolConfig.predictionMode ?? 'client';
  const inferenceLabel = predictionMode === 'client' ? 'On-device Analysis' : 'Server-side Analysis';
  const inferenceDescription =
    predictionMode === 'client'
      ? 'Runs entirely in your browser for maximum privacy.'
      : 'Uploads securely to the server for accelerated processing.';
  const inferenceBadgeClass =
    predictionMode === 'client' ? 'border-emerald-500/40 text-emerald-300' : 'border-sky-500/40 text-sky-300';

  const maxFiles = mode === 'single' ? 1 : (toolConfig.maxBulkFiles ?? 6);
  const readyCount = uploads.filter((item) => item.status === 'ready').length;
  const successCount = uploads.filter((item) => item.status === 'success').length;
  const errorCount = uploads.filter((item) => item.status === 'error').length;
  const activeStep = STEP_INDEX[step];
  const isModeLocked = isProcessing || uploads.length > 0;
  const lockReason = isProcessing
    ? 'Analysis in progress. Please wait until completion before switching modes.'
    : uploads.length > 0
      ? 'Changing modes will reset your current selection.'
      : null;

  const helperText = useMemo(() => {
    if (step === 'upload') {
      return 'Drop your forest imagery or browse files to begin analysis.';
    }

    if (step === 'review') {
      const inferenceHint = predictionMode === 'client' ? 'on-device analysis' : 'server-side analysis';
      return readyCount > 1
        ? `${readyCount} images queued. Remove any outliers before running ${inferenceHint}.`
        : `Review the selected image before running ${inferenceHint}.`;
    }

    if (isProcessing) {
      return predictionMode === 'client'
        ? 'Analyzing imagery with on-device model…'
        : 'Processing imagery via secure server analysis…';
    }

    if (successCount > 0 && errorCount > 0) {
      return `Some images failed (${errorCount}). Review results and retry if needed.`;
    }

    if (successCount > 0) {
      return 'Analysis complete. Detailed confidence scores are available below.';
    }

    return 'Analysis incomplete. Please try uploading clearer imagery.';
  }, [errorCount, isProcessing, predictionMode, readyCount, step, successCount]);

  const canSubmit = step === 'review' && uploads.length > 0 && !isProcessing;

  const revokePreview = (url: string) => {
    if (!url) {
      return;
    }

    if (previewRegistry.current.has(url)) {
      URL.revokeObjectURL(url);
      previewRegistry.current.delete(url);
    }
  };

  const clearUploads = () => {
    setUploads((prev) => {
      prev.forEach((item) => revokePreview(item.previewUrl));
      return [];
    });
    previewRegistry.current.clear();
  };

  const handleModeChange = (nextMode: UploadMode) => {
    if (nextMode === mode) {
      return;
    }
    setMode(nextMode);
    setStatusBanner(null);
    if (uploads.length === 0) {
      setStep('upload');
    }
  };

  const handleLockedModeChange = (nextMode: UploadMode) => {
    if (nextMode === mode) {
      return;
    }
    setModeChangeTarget(nextMode);
  };

  const handleConfirmModeSwitch = () => {
    if (!modeChangeTarget) {
      return;
    }
    clearUploads();
    setMode(modeChangeTarget);
    setStep('upload');
    setStatusBanner(null);
    setModeChangeTarget(null);
    setIsProcessing(false);
  };

  const handleCancelModeSwitch = () => {
    setModeChangeTarget(null);
  };

  const handleClear = () => {
    const hadUploads = uploads.length > 0;
    clearUploads();
    setStatusBanner(null);
    setIsProcessing(false);
    setStep('upload');
    if (hadUploads) {
      toast('Selection cleared', { icon: '🧹' });
    }
  };

  const handleRemove = (id: string) => {
    setUploads((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        revokePreview(target.previewUrl);
      }
      const next = prev.filter((item) => item.id !== id);
      if (next.length === 0) {
        setStep('upload');
        setStatusBanner(null);
      }
      return next;
    });
  };

  const handleFilesAdded = (files: File[]) => {
    if (!files.length) {
      return;
    }

    const errors: string[] = [];
    const accepted: UploadItem[] = [];

    const currentUploads = mode === 'single' ? [] : uploads;
    const existingKeys = new Set(
      currentUploads.map((item) => `${item.file.name}-${item.file.size}-${item.file.lastModified}`)
    );
    let remainingSlots = mode === 'single' ? 1 : Math.max(maxFiles - currentUploads.length, 0);

    if (remainingSlots <= 0) {
      setStatusBanner({
        tone: 'warning',
        message: `You already selected the maximum of ${maxFiles} image${maxFiles > 1 ? 's' : ''}. Remove an image before adding more.`,
      });
      toast.error('Upload limit reached. Remove an image before adding more.');
      return;
    }

    for (const file of files) {
      if (remainingSlots <= 0) {
        break;
      }

      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name} is not an image and was skipped.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        errors.push(`${file.name} exceeds the ${toolConfig.maxFileSize} limit.`);
        continue;
      }

      const key = `${file.name}-${file.size}-${file.lastModified}`;
      if (existingKeys.has(key)) {
        errors.push(`${file.name} is already in the queue.`);
        continue;
      }

      const previewUrl = URL.createObjectURL(file);
      previewRegistry.current.add(previewUrl);
      accepted.push(createUploadItem(file, previewUrl));
      existingKeys.add(key);
      remainingSlots -= 1;

      if (mode === 'single') {
        break;
      }
    }

    if (accepted.length === 0) {
      if (errors.length) {
        setStatusBanner({ tone: 'error', message: errors.join(' ') });
        toast.error(errors[0]);
      }
      return;
    }

    if (mode === 'single') {
      clearUploads();
      previewRegistry.current = new Set(accepted.map((item) => item.previewUrl));
      setUploads(accepted);
    } else {
      setUploads((prev) => [...prev, ...accepted]);
    }

    toast.success(`${accepted.length} image${accepted.length > 1 ? 's' : ''} added to the queue.`);

    setStep('review');

    if (errors.length) {
      setStatusBanner({ tone: 'warning', message: errors.join(' ') });
      toast.error(errors[0]);
    } else {
      setStatusBanner({
        tone: 'info',
        message: `${accepted.length} image${accepted.length > 1 ? 's' : ''} ready for analysis.`,
      });
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }

    if (predictionToastRef.current) {
      toast.dismiss(predictionToastRef.current);
      predictionToastRef.current = null;
    }

    const runningMessage =
      predictionMode === 'client' ? 'Running local analysis…' : 'Uploading for secure server analysis…';
    setStatusBanner({ tone: 'info', message: runningMessage });
    predictionToastRef.current = toast.loading(
      predictionMode === 'client' ? 'Running on-device analysis…' : 'Running server analysis…'
    );
    setIsProcessing(true);
    setStep('results');

    let success = 0;
    let failure = 0;

    for (const item of uploads) {
      const startTime = performance.now();

      setUploads((prev) =>
        prev.map((entry) =>
          entry.id === item.id
            ? {
                ...entry,
                status: 'uploading',
                error: undefined,
                results: undefined,
                durationMs: undefined,
                processedAt: undefined,
              }
            : entry
        )
      );

      try {
        const results = await predictFile(item.file, predictionMode as 'client' | 'server');
        const duration = performance.now() - startTime;
        const timestamp = new Date().toISOString();
        success += 1;

        setUploads((prev) =>
          prev.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  status: 'success',
                  results,
                  durationMs: duration,
                  processedAt: timestamp,
                }
              : entry
          )
        );
      } catch (error) {
        failure += 1;
        setUploads((prev) =>
          prev.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  status: 'error',
                  error: normalizeError(error),
                }
              : entry
          )
        );
      }
    }

    setIsProcessing(false);

    const settleToast = (variant: 'success' | 'error' | 'warning', message: string) => {
      if (predictionToastRef.current) {
        const toastId = predictionToastRef.current;
        if (variant === 'success') {
          toast.success(message, { id: toastId });
        } else if (variant === 'error') {
          toast.error(message, { id: toastId });
        } else {
          toast(message, { id: toastId, icon: '⚠️' });
        }
        predictionToastRef.current = null;
        return;
      }

      if (variant === 'success') {
        toast.success(message);
      } else if (variant === 'error') {
        toast.error(message);
      } else {
        toast(message, { icon: '⚠️' });
      }
    };

    if (failure && success) {
      setStatusBanner({
        tone: 'warning',
        message: `${success} analyses succeeded, ${failure} failed. Review the details below.`,
      });
      settleToast('warning', 'Some analyses failed. Review the results below.');
      return;
    }

    if (failure) {
      const failureMessage = 'All analyses failed. Try different imagery and run again.';
      setStatusBanner({ tone: 'error', message: failureMessage });
      settleToast('error', failureMessage);
      return;
    }

    const successMessage = 'Analysis complete! Confidence scores are ready below.';
    setStatusBanner({ tone: 'success', message: successMessage });
    settleToast('success', 'Analysis complete!');
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

          <StepContainer step={step}>
            {step === 'upload' ? (
              <UploadArea
                mode={mode}
                maxBulkFiles={toolConfig.maxBulkFiles}
                maxFileSizeLabel={toolConfig.maxFileSize}
                supportedFormats={toolConfig.supportedFormats}
                tips={toolConfig.tips}
                bulkLimitNotice={toolConfig.bulkLimitNotice}
                totalFiles={uploads.length}
                disabled={isProcessing}
                locked={isModeLocked}
                lockReason={lockReason}
                onModeChange={handleModeChange}
                onLockedModeChange={handleLockedModeChange}
                onFilesAdded={handleFilesAdded}
                onClear={handleClear}
              />
            ) : null}

            {step === 'review' ? (
              <PreviewGrid
                items={uploads}
                onRemove={handleRemove}
                disabled={isProcessing}
                onAddMore={handleFilesAdded}
                mode={mode}
                maxFiles={maxFiles}
              />
            ) : null}

            {step === 'results' ? (
              <div className="space-y-8">
                {isProcessing ? (
                  <Loading
                    className="py-12"
                    text={
                      predictionMode === 'client'
                        ? 'Running on-device model predictions'
                        : 'Processing images on the server'
                    }
                  />
                ) : (
                  <ResultsPanel mode={mode} items={uploads} />
                )}
              </div>
            ) : null}
          </StepContainer>

          {/* Hidden input to support the 'Add more' button in the workflow card */}
          <input
            ref={addMoreInputRef}
            type="file"
            accept="image/*"
            multiple={mode === 'bulk'}
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (files.length) handleFilesAdded(files);
              e.currentTarget.value = '';
            }}
            disabled={isProcessing || uploads.length >= maxFiles}
          />

          <AnimatePresence>
            {(uploads.length > 0 || step === 'results') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="sticky bottom-6 z-20"
              >
                <Card className="border-border/60 bg-card/95 shadow-xl backdrop-blur supports-backdrop-filter:bg-card/80">
                  <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-muted-foreground flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground/90 font-medium">Status</span>
                        <div className="flex items-center gap-2">
                          {readyCount > 0 && (
                            <Badge variant="outline" className="text-xs">
                              Ready: {readyCount}
                            </Badge>
                          )}
                          {successCount > 0 && (
                            <Badge variant="outline" className="text-xs text-emerald-300 border-emerald-500/30 bg-emerald-500/10">
                              Success: {successCount}
                            </Badge>
                          )}
                          {errorCount > 0 && (
                            <Badge variant="outline" className="text-xs text-red-300 border-red-500/30 bg-red-500/10">
                              Failed: {errorCount}
                            </Badge>
                          )}
                          <Badge variant="outline" className={cn('text-xs', inferenceBadgeClass)}>
                            {inferenceLabel}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs opacity-90">{helperText}</div>
                      {statusBanner ? (
                        <span
                          className={cn(
                            'text-xs font-medium mt-1',
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
                    <div className="flex flex-wrap items-center gap-3">
                      {mode === 'bulk' && step === 'review' && uploads.length < maxFiles ? (
                        <Button variant="ghost" size="sm" onClick={() => addMoreInputRef.current?.click()}>
                          Add more
                        </Button>
                      ) : null}
                      
                      {step === 'results' && !isProcessing ? (
                        <>
                          <Button variant="secondary" size="sm" onClick={() => setStep('review')} disabled={uploads.length === 0}>
                            Adjust selection
                          </Button>
                          <Button size="sm" onClick={handleClear}>
                            New analysis
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClear}
                            disabled={isProcessing || uploads.length === 0}
                          >
                            Reset
                          </Button>
                          <Button onClick={handleSubmit} disabled={!canSubmit} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            {mode === 'single' ? 'Analyze image' : 'Analyze batch'}
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Dialog open={modeChangeTarget !== null} onOpenChange={(open) => (!open ? handleCancelModeSwitch() : undefined)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Switch upload mode?</DialogTitle>
            <DialogDescription>
              Switching to the {modeChangeTarget === 'single' ? 'single image' : 'batch upload'} flow clears your
              current selection. Continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end gap-2 sm:flex-row">
            <Button variant="ghost" onClick={handleCancelModeSwitch}>
              Stay in {mode === 'single' ? 'single' : 'batch'} mode
            </Button>
            <Button variant="destructive" onClick={handleConfirmModeSwitch}>
              Switch mode
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
