export type PredictionResult = {
  className: 'Fire' | 'No Fire' | 'Smoke' | 'SmokeFire';
  probability: number;
};

export const CLASS_NAMES: PredictionResult['className'][] = ['Fire', 'No Fire', 'Smoke', 'SmokeFire'];

/**
 * API Response types
 */
export interface PredictionResponse {
  results: PredictionResult[];
  processingTime: string;
}

export interface HealthResponse {
  status: 'ok';
  model: 'available' | 'unavailable';
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  code?: string;
  details?: Record<string, unknown>;
  timestamp: string;
}
