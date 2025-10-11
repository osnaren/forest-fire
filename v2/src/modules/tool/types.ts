import type { PredictionResponse } from '@/lib/types';

export type UploadMode = 'single' | 'bulk';

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface UploadItem {
  id: string;
  file: File;
  previewUrl: string;
  status: UploadStatus;
  error?: string;
  results?: PredictionResponse['results'];
  durationMs?: number;
  processedAt?: string;
}
