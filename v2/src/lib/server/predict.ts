import * as tf from '@tensorflow/tfjs-node';
import sharp from 'sharp';
import path from 'path';

// --- Constants ---
const MODEL_PATH = `file://${path.join(process.cwd(), 'public/model/model.json')}`;
const IMAGE_SIZE = 224;

// --- Model Loading ---
let model: tf.LayersModel | null = null;

/**
 * Loads and caches the TensorFlow.js model.
 */
async function loadModel() {
  if (model) {
    return model;
  }
  console.log('Loading model from:', MODEL_PATH);
  model = await tf.loadLayersModel(MODEL_PATH);
  console.log('Model loaded successfully.');
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
  // Ensure the model is loaded
  const loadedModel = await loadModel();
  if (!loadedModel) {
    throw new Error('Model not loaded');
  }

  // 1. Decode and resize the image using Sharp.
  // We use sharp here for robust image processing.
  const processedImageBuffer = await sharp(imageBuffer)
    .resize(IMAGE_SIZE, IMAGE_SIZE)
    .toFormat('jpeg') // Convert to a consistent format
    .toBuffer();

  const tensor = tf.tidy(() => {
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
  const prediction = loadedModel.predict(tensor) as tf.Tensor;
  const probabilities = await prediction.data();

  // 6. Clean up tensors
  tensor.dispose();
  prediction.dispose();

  return Array.from(probabilities);
}

// Pre-load the model on server start to reduce latency on first request
loadModel().catch(console.error); 