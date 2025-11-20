import * as tf from '@tensorflow/tfjs';

import { CLASS_NAMES, type ErrorResponse, type PredictionResponse, type PredictionResult } from '@/lib/types';

let model: tf.LayersModel | null = null;
let modelPromise: Promise<tf.LayersModel> | null = null;

const MODEL_PATH = '/model/model.json';
const IMAGE_SIZE = 224;

async function ensureBackend() {
  try {
    await tf.ready();
    if (tf.getBackend() !== 'webgl') {
      await tf.setBackend('webgl');
    }
  } catch (error) {
    console.warn('Failed to set WebGL backend, falling back to default backend.', error);
  }
}

async function loadModel(): Promise<tf.LayersModel> {
  if (model) {
    return model;
  }

  if (!modelPromise) {
    modelPromise = (async () => {
      await ensureBackend();
      const loaded = await tf.loadLayersModel(MODEL_PATH);
      model = loaded;
      return loaded;
    })();
  }

  return modelPromise;
}

function normalizeImage(tensor: tf.Tensor3D): tf.Tensor4D {
  return tf.tidy(() => {
    const resized = tf.image.resizeBilinear(tensor, [IMAGE_SIZE, IMAGE_SIZE]);
    const normalized = resized.div(127.5).sub(1);
    return normalized.expandDims(0);
  });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (event) => reject(event);
    reader.readAsDataURL(file);
  });
}

async function loadHtmlImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.crossOrigin = 'anonymous';
    image.src = src;
  });
}

async function predictViaClient(file: File): Promise<PredictionResult[]> {
  const loadedModel = await loadModel();
  const canUseImageBitmap = typeof createImageBitmap === 'function';
  const imageBitmap = canUseImageBitmap
    ? await createImageBitmap(file, {
        resizeWidth: IMAGE_SIZE,
        resizeHeight: IMAGE_SIZE,
        resizeQuality: 'high',
      })
    : null;

  let tensor: tf.Tensor | null = null;
  let batched: tf.Tensor | null = null;
  let prediction: tf.Tensor | null = null;

  try {
    if (imageBitmap) {
      tensor = tf.browser.fromPixels(imageBitmap);
    } else {
      const dataUrl = await fileToDataUrl(file);
      const image = await loadHtmlImage(dataUrl);
      tensor = tf.browser.fromPixels(image);
    }
    batched = normalizeImage(tensor as tf.Tensor3D);
    prediction = loadedModel.predict(batched) as tf.Tensor;

    const probabilities = Array.from(await prediction.data());

    const results: PredictionResult[] = CLASS_NAMES.map((className, index) => ({
      className,
      probability: Math.round(probabilities[index] * 10000) / 10000,
    }));

    results.sort((a, b) => b.probability - a.probability);
    return results;
  } finally {
    imageBitmap?.close();
    tensor?.dispose();
    batched?.dispose();
    prediction?.dispose();
  }
}

async function predictViaServer(file: File): Promise<PredictionResult[]> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/api/predict', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let message = 'Prediction request failed.';
    try {
      const errorData = (await response.json()) as Partial<ErrorResponse>;
      if (errorData?.error) {
        message = errorData.error;
      }
    } catch (error) {
      console.warn('Failed to parse prediction error response', error);
    }

    throw new Error(message);
  }

  const payload = (await response.json()) as PredictionResponse;
  const results = payload.results ?? [];
  return [...results].sort((a, b) => b.probability - a.probability);
}

export async function predictFile(file: File, mode: 'client' | 'server' = 'client'): Promise<PredictionResult[]> {
  if (mode === 'server') {
    return predictViaServer(file);
  }

  return predictViaClient(file);
}
