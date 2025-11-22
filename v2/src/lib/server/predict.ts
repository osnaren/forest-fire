import * as tf from '@tensorflow/tfjs';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { getModelPaths } from './model-loader';

// --- Constants ---
const IMAGE_SIZE = 224;

async function ensureBackend() {
  await tf.ready();
  if (tf.getBackend() !== 'cpu') {
    await tf.setBackend('cpu');
  }
}

// --- Model Loading ---
// Use a global variable to cache the model across hot reloads in development
const globalForModel = global as unknown as {
  tfModel: tf.LayersModel | null;
  tfModelLoadingPromise: Promise<tf.LayersModel> | null;
};

let model: tf.LayersModel | null = globalForModel.tfModel || null;
let modelLoadingPromise: Promise<tf.LayersModel> | null = globalForModel.tfModelLoadingPromise || null;

/**
 * Loads and caches the TensorFlow.js model.
 * Uses a singleton pattern to prevent multiple concurrent loadings.
 */
async function loadModel(): Promise<tf.LayersModel> {
  if (model) {
    return model;
  }

  // If model is already being loaded, wait for it
  if (modelLoadingPromise) {
    return modelLoadingPromise;
  }

  modelLoadingPromise = (async () => {
    try {
      // Get model paths (downloads if necessary)
      const { modelJsonPath, modelDir } = await getModelPaths();
      console.log('Loading model from:', modelJsonPath);

      await ensureBackend();

      // Clear existing variables to prevent "Variable already registered" errors during hot reload
      // This is a brute-force approach but necessary when the module is re-evaluated but tfjs state persists
      // If we are here, it means we are loading the model from scratch (or reloading it).
      // Any existing variables in the global tf state are likely from a previous (failed or stale) load.
      tf.disposeVariables();

      const modelJSONRaw = await fs.readFile(modelJsonPath, 'utf-8');
      const modelJSON = JSON.parse(modelJSONRaw) as {
        modelTopology: tf.io.ModelArtifacts['modelTopology'];
        weightsManifest: Array<{
          paths: string[];
          weights: tf.io.WeightsManifestEntry[];
        }>;
        format?: string;
        generatedBy?: string;
        convertedBy?: string;
        trainingConfig?: unknown;
        signature?: unknown;
        userDefinedMetadata?: unknown;
      };

      const shardBuffers: Buffer[] = [];
      for (const group of modelJSON.weightsManifest) {
        for (const relativePath of group.paths) {
          const shardPath = path.join(modelDir, relativePath);
          const buffer = await fs.readFile(shardPath);
          shardBuffers.push(buffer);
        }
      }

      const weightsBuffer = Buffer.concat(shardBuffers);

      const artifacts: tf.io.ModelArtifacts = {
        format: modelJSON.format,
        generatedBy: modelJSON.generatedBy,
        convertedBy: modelJSON.convertedBy,
        modelTopology: modelJSON.modelTopology,
        trainingConfig: modelJSON.trainingConfig as tf.io.ModelArtifacts['trainingConfig'],
        signature: modelJSON.signature as tf.io.ModelArtifacts['signature'],
        userDefinedMetadata: modelJSON.userDefinedMetadata as tf.io.ModelArtifacts['userDefinedMetadata'],
        weightSpecs: modelJSON.weightsManifest.flatMap((group) => group.weights),
        weightData: weightsBuffer.buffer.slice(
          weightsBuffer.byteOffset,
          weightsBuffer.byteOffset + weightsBuffer.byteLength
        ),
      };

      const handler = tf.io.fromMemory(artifacts);
      const loadedModel = await tf.loadLayersModel(handler);
      console.log('Model loaded successfully.');
      console.log('Model input shape:', loadedModel.inputs[0].shape);
      console.log('Model output shape:', loadedModel.outputs[0].shape);

      if (process.env.NODE_ENV !== 'production') {
        globalForModel.tfModel = loadedModel;
      }

      return loadedModel;
    } catch (error) {
      console.error('Failed to load model:', error);
      modelLoadingPromise = null; // Reset promise on failure
      if (process.env.NODE_ENV !== 'production') {
        globalForModel.tfModelLoadingPromise = null;
      }
      throw new Error(`Model loading failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  })();

  if (process.env.NODE_ENV !== 'production') {
    globalForModel.tfModelLoadingPromise = modelLoadingPromise;
  }

  model = await modelLoadingPromise;
  return model;
}

// --- Prediction Logic ---
/**
 * Preprocesses an image buffer and runs it through the loaded model.
 *
 * @param imageBuffer The raw image buffer from the request.
 * @returns An array of prediction probabilities.
 */
export async function runPrediction(imageBuffer: Buffer): Promise<number[]> {
  const startTime = Date.now();

  // Ensure the model is loaded
  const loadedModel = await loadModel();
  if (!loadedModel) {
    throw new Error('Model not loaded');
  }

  let tensor: tf.Tensor | null = null;
  let prediction: tf.Tensor | null = null;

  try {
    const { data } = await sharp(imageBuffer)
      .resize(IMAGE_SIZE, IMAGE_SIZE, { fit: 'cover' })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const floatData = Float32Array.from(data, (value) => value / 127.5 - 1);
    tensor = tf.tensor4d(floatData, [1, IMAGE_SIZE, IMAGE_SIZE, 3]);

    prediction = loadedModel.predict(tensor) as tf.Tensor;
    const probabilities = await prediction.data();

    const processingTime = Date.now() - startTime;
    console.log(`Prediction completed in ${processingTime}ms`);

    return Array.from(probabilities);
  } catch (error) {
    console.error('Prediction error:', error);
    throw new Error(`Prediction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    if (tensor) tensor.dispose();
    if (prediction) prediction.dispose();
  }
}

// Pre-load the model on server start to reduce latency on first request
loadModel().catch((error) => {
  console.error('Failed to pre-load model:', error);
});
