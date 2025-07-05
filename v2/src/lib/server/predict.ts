import * as tf from '@tensorflow/tfjs-node';
import path from 'path';
import sharp from 'sharp';

// --- Constants ---
const MODEL_PATH = `file://${path.join(process.cwd(), 'public/model/model.json')}`;
const IMAGE_SIZE = 224;

// --- Model Loading ---
let model: tf.LayersModel | null = null;
let modelLoadingPromise: Promise<tf.LayersModel> | null = null;

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
    console.log('Loading model from:', MODEL_PATH);
    try {
      const loadedModel = await tf.loadLayersModel(MODEL_PATH);
      console.log('Model loaded successfully.');
      console.log('Model input shape:', loadedModel.inputs[0].shape);
      console.log('Model output shape:', loadedModel.outputs[0].shape);
      return loadedModel;
    } catch (error) {
      console.error('Failed to load model:', error);
      modelLoadingPromise = null; // Reset promise on failure
      throw new Error(`Model loading failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  })();

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

  // 1. Decode and resize the image using Sharp.
  let processedImageBuffer: Buffer;
  try {
    processedImageBuffer = await sharp(imageBuffer)
      .resize(IMAGE_SIZE, IMAGE_SIZE)
      .toFormat('jpeg') // Convert to a consistent format
      .toBuffer();
  } catch (error) {
    throw new Error(`Image processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  let tensor: tf.Tensor | null = null;
  let prediction: tf.Tensor | null = null;

  try {
    tensor = tf.tidy(() => {
      // 2. Decode the image buffer into a tensor
      const decodedImage = tf.node.decodeImage(processedImageBuffer, 3);
      const resizedImage = tf.image.resizeBilinear(decodedImage, [IMAGE_SIZE, IMAGE_SIZE]);

      // 3. Normalize the image from [0, 255] to [-1, 1]
      // This is a common requirement for MobileNet-based models.
      const normalized = resizedImage.toFloat().sub(127.5).div(127.5);

      // 4. Add a batch dimension
      return normalized.expandDims(0);
    });

    // 5. Run prediction
    prediction = loadedModel.predict(tensor) as tf.Tensor;
    const probabilities = await prediction.data();

    const processingTime = Date.now() - startTime;
    console.log(`Prediction completed in ${processingTime}ms`);

    return Array.from(probabilities);
  } catch (error) {
    console.error('Prediction error:', error);
    throw new Error(`Prediction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    // 6. Clean up tensors
    if (tensor) tensor.dispose();
    if (prediction) prediction.dispose();
  }
}

// Pre-load the model on server start to reduce latency on first request
loadModel().catch((error) => {
  console.error('Failed to pre-load model:', error);
});
