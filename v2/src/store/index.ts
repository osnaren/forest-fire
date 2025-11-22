import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface PredictionResult {
  fire: number;
  smoke: number;
  no_fire: number;
  smoke_fire?: number;
}

export interface PredictionState {
  isLoading: boolean;
  result: PredictionResult | null;
  error: string | null;
  imagePreview: string | null;
  processingTime: number | null;
  setLoading: (loading: boolean) => void;
  setResult: (result: PredictionResult, processingTime?: number) => void;
  setError: (error: string) => void;
  setImagePreview: (preview: string | null) => void;
  reset: () => void;
}

export const usePredictionStore = create<PredictionState>()(
  devtools(
    (set) => ({
      isLoading: false,
      result: null,
      error: null,
      imagePreview: null,
      processingTime: null,
      setLoading: (loading) => set({ isLoading: loading, error: null }, false, 'setLoading'),
      setResult: (result, processingTime) =>
        set(
          {
            result,
            processingTime,
            isLoading: false,
            error: null,
          },
          false,
          'setResult'
        ),
      setError: (error) =>
        set(
          {
            error,
            isLoading: false,
            result: null,
          },
          false,
          'setError'
        ),
      setImagePreview: (preview) => set({ imagePreview: preview }, false, 'setImagePreview'),
      reset: () =>
        set(
          {
            isLoading: false,
            result: null,
            error: null,
            imagePreview: null,
            processingTime: null,
          },
          false,
          'reset'
        ),
    }),
    {
      name: 'prediction-store',
    }
  )
);

// UI state store for global app state
export interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      sidebarOpen: false,
      mobileMenuOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }, false, 'setSidebarOpen'),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }, false, 'setMobileMenuOpen'),
    }),
    {
      name: 'ui-store',
    }
  )
);
