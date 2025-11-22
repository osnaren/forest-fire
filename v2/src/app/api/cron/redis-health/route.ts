import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Initialize Redis client
let redis: Redis | null = null;
if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  try {
    redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
  } catch (error) {
    console.error('Failed to initialize Redis client:', error);
  }
}

/**
 * GET /api/cron/redis-health
 * Cron job endpoint to check Redis health and perform maintenance tasks
 *
 * This endpoint can be called by cron services like Vercel Cron, GitHub Actions,
 * or external cron job services to:
 * 1. Check Redis connectivity
 * 2. Clean up expired rate limit keys
 * 3. Perform other Redis maintenance tasks
 */
export async function GET(req: NextRequest) {
  try {
    // Verify cron job authentication
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if Redis is configured
    if (!redis) {
      return NextResponse.json(
        {
          error: 'Redis not configured',
          details: 'Missing KV_REST_API_URL or KV_REST_API_TOKEN',
        },
        { status: 503 }
      );
    }

    const startTime = Date.now();
    const results: Record<string, unknown> = {};

    // 1. Basic Redis health check
    try {
      const pingResult = await redis.ping();
      results.ping = {
        success: true,
        response: pingResult,
        latency: Date.now() - startTime,
      };
    } catch (error) {
      results.ping = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }

    // 2. Test basic Redis operations
    const testKey = `health-check:${Date.now()}`;
    try {
      // Set a test value
      await redis.set(testKey, 'test-value', { ex: 60 }); // Expires in 60 seconds

      // Get the test value
      const getValue = await redis.get(testKey);

      // Delete the test key
      await redis.del(testKey);

      results.operations = {
        success: true,
        set: true,
        get: getValue === 'test-value',
        delete: true,
      };
    } catch (error) {
      results.operations = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }

    // 3. Get basic Redis statistics
    try {
      const keys = await redis.keys('*');
      results.stats = {
        success: true,
        totalKeys: keys.length,
        note: 'Basic key count - use with caution in production',
      };
    } catch (error) {
      results.stats = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        note: 'KEYS command may be disabled in production Redis services',
      };
    }

    // 4. Clean up old rate limit keys (optional maintenance)
    try {
      const rateLimitPattern = 'ratelimit:*';
      const keys = await redis.keys(rateLimitPattern);

      if (keys.length > 1000) {
        // If there are too many rate limit keys, we might want to clean some up
        // This is just an example - be careful with bulk operations
        results.maintenance = {
          rateLimitKeys: keys.length,
          note: 'Consider cleaning up old rate limit keys if count is high',
        };
      } else {
        results.maintenance = {
          rateLimitKeys: keys.length,
          status: 'healthy',
        };
      }
    } catch (error) {
      results.maintenance = {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }

    // Calculate total execution time
    const totalTime = Date.now() - startTime;

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        executionTime: totalTime,
        redis: results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cron job error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Cron job execution failed',
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cron/redis-health
 * Alternative endpoint that can accept configuration or specific tasks
 */
export async function POST(req: NextRequest) {
  try {
    // Verify cron job authentication
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { tasks = ['health-check'] } = body;

    if (!redis) {
      return NextResponse.json(
        {
          error: 'Redis not configured',
          details: 'Missing KV_REST_API_URL or KV_REST_API_TOKEN',
        },
        { status: 503 }
      );
    }

    const startTime = Date.now();
    const results: Record<string, unknown> = {};

    // Execute requested tasks
    for (const task of tasks) {
      switch (task) {
        case 'health-check':
          try {
            const pingResult = await redis.ping();
            results['health-check'] = {
              success: true,
              response: pingResult,
            };
          } catch (error) {
            results['health-check'] = {
              success: false,
              error: error instanceof Error ? error.message : String(error),
            };
          }
          break;

        case 'cleanup-expired':
          try {
            // This is an example - implement your specific cleanup logic
            const keys = await redis.keys('ratelimit:*');
            results['cleanup-expired'] = {
              success: true,
              keysFound: keys.length,
              note: 'Keys with TTL will expire automatically',
            };
          } catch (error) {
            results['cleanup-expired'] = {
              success: false,
              error: error instanceof Error ? error.message : String(error),
            };
          }
          break;

        case 'stats':
          try {
            const keys = await redis.keys('*');
            results['stats'] = {
              success: true,
              totalKeys: keys.length,
            };
          } catch (error) {
            results['stats'] = {
              success: false,
              error: error instanceof Error ? error.message : String(error),
            };
          }
          break;

        default:
          results[task] = {
            success: false,
            error: `Unknown task: ${task}`,
          };
      }
    }

    const totalTime = Date.now() - startTime;

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        executionTime: totalTime,
        tasks: results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cron job POST error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Cron job execution failed',
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
