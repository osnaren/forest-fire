import { HealthResponse } from '@/lib/types';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(): Promise<NextResponse<HealthResponse>> {
  try {
    // Check if model files exist
    const modelPath = path.join(process.cwd(), 'public/model/model.json');
    const weightsPath = path.join(process.cwd(), 'public/model/weights.bin');

    await fs.access(modelPath);
    await fs.access(weightsPath);

    return NextResponse.json<HealthResponse>({
      status: 'ok',
      model: 'available',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json<HealthResponse>(
      {
        status: 'ok',
        model: 'unavailable',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
