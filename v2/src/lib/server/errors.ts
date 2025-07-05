import { NextResponse } from 'next/server';

/**
 * Standard error response shape for the API
 */
export interface ErrorResponse {
  error: string;
  code?: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

/**
 * HTTP status codes for common error scenarios
 */
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  PAYLOAD_TOO_LARGE: 413,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  message: string,
  status: number,
  code?: string,
  details?: Record<string, unknown>
): NextResponse<ErrorResponse> {
  const errorResponse: ErrorResponse = {
    error: message,
    timestamp: new Date().toISOString(),
    ...(code && { code }),
    ...(details && { details }),
  };

  return NextResponse.json(errorResponse, { status });
}

/**
 * Common error responses for reuse
 */
export const CommonErrors = {
  badRequest: (message = 'Bad Request') => createErrorResponse(message, HTTP_STATUS.BAD_REQUEST, 'BAD_REQUEST'),

  unauthorized: (message = 'Unauthorized') => createErrorResponse(message, HTTP_STATUS.UNAUTHORIZED, 'UNAUTHORIZED'),

  forbidden: (message = 'Forbidden') => createErrorResponse(message, HTTP_STATUS.FORBIDDEN, 'FORBIDDEN'),

  notFound: (message = 'Not Found') => createErrorResponse(message, HTTP_STATUS.NOT_FOUND, 'NOT_FOUND'),

  methodNotAllowed: (message = 'Method Not Allowed') =>
    createErrorResponse(message, HTTP_STATUS.METHOD_NOT_ALLOWED, 'METHOD_NOT_ALLOWED'),

  payloadTooLarge: (message = 'Payload Too Large') =>
    createErrorResponse(message, HTTP_STATUS.PAYLOAD_TOO_LARGE, 'PAYLOAD_TOO_LARGE'),

  tooManyRequests: (message = 'Too Many Requests') =>
    createErrorResponse(message, HTTP_STATUS.TOO_MANY_REQUESTS, 'TOO_MANY_REQUESTS'),

  internalServerError: (message = 'Internal Server Error') =>
    createErrorResponse(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR'),

  serviceUnavailable: (message = 'Service Unavailable') =>
    createErrorResponse(message, HTTP_STATUS.SERVICE_UNAVAILABLE, 'SERVICE_UNAVAILABLE'),
};

/**
 * Wraps an async API handler with error handling
 */
export function withErrorHandling<T extends unknown[]>(handler: (...args: T) => Promise<NextResponse>) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof Error) {
        // Check for specific error types
        if (error.message.includes('Model loading failed')) {
          return CommonErrors.serviceUnavailable('AI model is currently unavailable');
        }

        if (error.message.includes('Image processing failed')) {
          return CommonErrors.badRequest('Invalid image format or corrupted file');
        }

        if (error.message.includes('Prediction failed')) {
          return CommonErrors.internalServerError('Prediction service is temporarily unavailable');
        }
      }

      // Default to internal server error
      return CommonErrors.internalServerError();
    }
  };
}
