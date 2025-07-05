export type PredictionResult = {
  className: 'Fire' | 'No Fire' | 'Smoke' | 'SmokeFire';
  probability: number;
};

export const CLASS_NAMES: PredictionResult['className'][] = ['Fire', 'No Fire', 'Smoke', 'SmokeFire']; 