import { CommonErrors, withErrorHandling } from '@/lib/server/errors';
import { runPrediction } from '@/lib/server/predict';
import { ratelimit } from '@/lib/server/ratelimit';
import { CLASS_NAMES, PredictionResponse, PredictionResult } from '@/lib/types';
import { NextResponse } from 'next/server';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB

async function handlePrediction(request: Request) {
  // 1. Rate limit the request
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';

  let success = true;
  let limit = 10;
  let remaining = 10;
  let reset = Date.now() + 30000;

  try {
    const result = await ratelimit.limit(ip);
    success = result.success;
    limit = result.limit;
    remaining = result.remaining;
    reset = result.reset;
  } catch (error) {
    console.warn('Rate limiting failed, failing open:', error);
  }

  if (!success) {
    return CommonErrors.tooManyRequests('Rate limit exceeded. Please try again later.');
  }

  // 2. Parse and validate the form data
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return CommonErrors.badRequest('Invalid form data. Please ensure you are sending multipart/form-data.');
  }

  const file = formData.get('image');

  if (!file || !(file instanceof Blob)) {
    return CommonErrors.badRequest(
      'No image file found in the request. Please include an image file with the key "image".'
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return CommonErrors.payloadTooLarge(`File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024} MB`);
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    return CommonErrors.badRequest('Invalid file type. Please upload an image file.');
  }

  // 3. Run the prediction
  const imageBuffer = Buffer.from(await file.arrayBuffer());
  const probabilities = await runPrediction(imageBuffer);

  const results: PredictionResult[] = CLASS_NAMES.map((className: PredictionResult['className'], i: number) => ({
    className,
    probability: Math.round(probabilities[i] * 10000) / 10000, // Round to 4 decimal places
  }));

  // Sort results by probability (descending)
  results.sort((a, b) => b.probability - a.probability);

  return NextResponse.json<PredictionResponse>(
    {
      results,
      processingTime: new Date().toISOString(),
    },
    {
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    }
  );
}

export const POST = withErrorHandling(handlePrediction);
