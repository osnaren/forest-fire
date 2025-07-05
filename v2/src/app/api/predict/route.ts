import { runPrediction } from '@/lib/server/predict';
import { ratelimit } from '@/lib/server/ratelimit';
import { CLASS_NAMES, PredictionResult } from '@/lib/types';
import { NextResponse } from 'next/server';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB

const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

export async function POST(request: Request) {
  // 1. Rate limit the request
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    return errorResponse('Too many requests', 429);
  }

  // 2. Parse and validate the form data
  let formData;
  try {
    formData = await request.formData();
  } catch (error) {
    return errorResponse('Invalid form data', 400);
  }

  const file = formData.get('image');

  if (!file || !(file instanceof Blob)) {
    return errorResponse('No image file found in the request', 400);
  }

  if (file.size > MAX_FILE_SIZE) {
    return errorResponse(`File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024} MB`, 413);
  }

  // 3. Run the prediction
  try {
    const imageBuffer = Buffer.from(await file.arrayBuffer());
    const probabilities = await runPrediction(imageBuffer);

    const results: PredictionResult[] = CLASS_NAMES.map((className: PredictionResult['className'], i: number) => ({
      className,
      probability: probabilities[i],
    }));

    return NextResponse.json(
      { results },
      {
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Prediction failed:', error);
    return errorResponse('An error occurred during prediction.', 500);
  }
}
