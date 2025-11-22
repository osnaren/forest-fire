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

interface CronTask {
  name: string;
  operation: string;
  params?: Record<string, unknown>;
}

/**
 * POST /api/cron/redis-operations
 * Generic cron job endpoint for executing Redis operations
 *
 * Accepts a list of Redis operations to execute and returns results.
 * Can be used for various maintenance tasks, data cleanup, or health checks.
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
    const { operations = [] } = body as { operations: CronTask[] };

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

    // Execute each operation
    for (const operation of operations) {
      try {
        const operationResult = await executeRedisOperation(redis, operation);
        results[operation.name] = {
          success: true,
          operation: operation.operation,
          result: operationResult,
        };
      } catch (error) {
        results[operation.name] = {
          success: false,
          operation: operation.operation,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }

    const totalTime = Date.now() - startTime;

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        executionTime: totalTime,
        operationsExecuted: operations.length,
        results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Redis operations cron job error:', error);

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
 * Execute a Redis operation based on the operation type
 */
async function executeRedisOperation(redis: Redis, task: CronTask): Promise<unknown> {
  const { operation, params = {} } = task;

  switch (operation) {
    case 'ping':
      return await redis.ping();

    case 'set': {
      const { key, value, ttl } = params;
      if (!key || !value) {
        throw new Error('SET operation requires key and value parameters');
      }
      if (ttl && typeof ttl === 'number') {
        return await redis.set(key as string, value as string, { ex: ttl });
      }
      return await redis.set(key as string, value as string);
    }

    case 'get':
      if (!params.key) {
        throw new Error('GET operation requires key parameter');
      }
      return await redis.get(params.key as string);

    case 'del':
      if (!params.key) {
        throw new Error('DEL operation requires key parameter');
      }
      return await redis.del(params.key as string);

    case 'exists':
      if (!params.key) {
        throw new Error('EXISTS operation requires key parameter');
      }
      return await redis.exists(params.key as string);

    case 'expire': {
      const { key: expireKey, seconds } = params;
      if (!expireKey || !seconds) {
        throw new Error('EXPIRE operation requires key and seconds parameters');
      }
      return await redis.expire(expireKey as string, seconds as number);
    }

    case 'ttl':
      if (!params.key) {
        throw new Error('TTL operation requires key parameter');
      }
      return await redis.ttl(params.key as string);

    case 'keys': {
      const pattern = (params.pattern as string) || '*';
      return await redis.keys(pattern);
    }

    case 'incr':
      if (!params.key) {
        throw new Error('INCR operation requires key parameter');
      }
      return await redis.incr(params.key as string);

    case 'decr':
      if (!params.key) {
        throw new Error('DECR operation requires key parameter');
      }
      return await redis.decr(params.key as string);

    case 'hset': {
      const { key: hashKey, field, value: hashValue } = params;
      if (!hashKey || !field || !hashValue) {
        throw new Error('HSET operation requires key, field, and value parameters');
      }
      return await redis.hset(hashKey as string, { [field as string]: hashValue });
    }

    case 'hget': {
      const { key: hgetKey, field: hgetField } = params;
      if (!hgetKey || !hgetField) {
        throw new Error('HGET operation requires key and field parameters');
      }
      return await redis.hget(hgetKey as string, hgetField as string);
    }

    case 'hgetall':
      if (!params.key) {
        throw new Error('HGETALL operation requires key parameter');
      }
      return await redis.hgetall(params.key as string);

    case 'sadd': {
      const { key: setKey, member } = params;
      if (!setKey || !member) {
        throw new Error('SADD operation requires key and member parameters');
      }
      return await redis.sadd(setKey as string, member as string);
    }

    case 'smembers':
      if (!params.key) {
        throw new Error('SMEMBERS operation requires key parameter');
      }
      return await redis.smembers(params.key as string);

    case 'scard':
      if (!params.key) {
        throw new Error('SCARD operation requires key parameter');
      }
      return await redis.scard(params.key as string);

    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

/**
 * GET /api/cron/redis-operations
 * Get list of supported operations and their parameters
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supportedOperations = {
    ping: {
      description: 'Test Redis connectivity',
      parameters: {},
    },
    set: {
      description: 'Set a key-value pair',
      parameters: {
        key: 'string (required)',
        value: 'string (required)',
        ttl: 'number (optional) - TTL in seconds',
      },
    },
    get: {
      description: 'Get value by key',
      parameters: {
        key: 'string (required)',
      },
    },
    del: {
      description: 'Delete a key',
      parameters: {
        key: 'string (required)',
      },
    },
    exists: {
      description: 'Check if key exists',
      parameters: {
        key: 'string (required)',
      },
    },
    expire: {
      description: 'Set TTL for a key',
      parameters: {
        key: 'string (required)',
        seconds: 'number (required)',
      },
    },
    ttl: {
      description: 'Get TTL for a key',
      parameters: {
        key: 'string (required)',
      },
    },
    keys: {
      description: 'Get keys matching pattern',
      parameters: {
        pattern: 'string (optional, default: "*")',
      },
    },
    incr: {
      description: 'Increment a key',
      parameters: {
        key: 'string (required)',
      },
    },
    decr: {
      description: 'Decrement a key',
      parameters: {
        key: 'string (required)',
      },
    },
    hset: {
      description: 'Set hash field',
      parameters: {
        key: 'string (required)',
        field: 'string (required)',
        value: 'string (required)',
      },
    },
    hget: {
      description: 'Get hash field',
      parameters: {
        key: 'string (required)',
        field: 'string (required)',
      },
    },
    hgetall: {
      description: 'Get all hash fields',
      parameters: {
        key: 'string (required)',
      },
    },
    sadd: {
      description: 'Add member to set',
      parameters: {
        key: 'string (required)',
        member: 'string (required)',
      },
    },
    smembers: {
      description: 'Get set members',
      parameters: {
        key: 'string (required)',
      },
    },
    scard: {
      description: 'Get set cardinality',
      parameters: {
        key: 'string (required)',
      },
    },
  };

  return NextResponse.json(
    {
      success: true,
      redisConfigured: Boolean(redis),
      supportedOperations,
      example: {
        operations: [
          {
            name: 'health-check',
            operation: 'ping',
          },
          {
            name: 'set-test-key',
            operation: 'set',
            params: {
              key: 'test:cron-job',
              value: 'executed-at-' + Date.now(),
              ttl: 3600,
            },
          },
          {
            name: 'get-test-key',
            operation: 'get',
            params: {
              key: 'test:cron-job',
            },
          },
        ],
      },
    },
    { status: 200 }
  );
}
