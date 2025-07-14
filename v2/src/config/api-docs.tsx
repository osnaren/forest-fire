/**
 * API Documentation configuration for Forest Fire Classifier v2
 * Centralized configuration for API documentation content, examples, and metadata
 */

export const apiDocsConfig = {
  /* -------------------------------------------------- */
  /*  HERO SECTION                                      */
  /* -------------------------------------------------- */
  hero: {
    title: 'API Documentation',
    subtitle: 'Integrate wildfire detection capabilities into your applications with our RESTful API. Simple, fast, and reliable machine learning inference.',
    features: [
      { label: 'Real-time predictions', color: 'green-500' },
      { label: '4-class classification', color: 'blue-500' },
      { label: 'Rate limited', color: 'purple-500' },
      { label: '4MB max file size', color: 'orange-500' },
    ],
  },

  /* -------------------------------------------------- */
  /*  API ENDPOINT                                      */
  /* -------------------------------------------------- */
  endpoint: {
    method: 'POST',
    path: '/api/predict',
    title: 'Prediction Endpoint',
    description: 'Submit images for wildfire classification analysis',
    url: 'https://fire.osnaren.com/api/predict',
  },

  /* -------------------------------------------------- */
  /*  REQUEST SPECIFICATION                             */
  /* -------------------------------------------------- */
  request: {
    contentType: 'multipart/form-data',
    maxFileSize: 4, // MB
    supportedFormats: ['JPEG', 'PNG', 'WebP', 'GIF'],
    parameter: 'image',
    details: {
      'Content-Type': 'multipart/form-data',
      'File parameter': 'image',
      'Max size': '4MB',
      'Formats': 'JPEG, PNG, WebP, GIF',
      'Rate limit': '10 req / 30 sec',
    },
  },

  /* -------------------------------------------------- */
  /*  RESPONSE SPECIFICATION                            */
  /* -------------------------------------------------- */
  response: {
    format: 'JSON',
    sortOrder: 'By confidence (desc)',
    classes: ['Fire', 'No Fire', 'Smoke', 'SmokeFire'],
    confidenceRange: '0.0 to 1.0 (floating point)',
    timestampFormat: 'ISO 8601 format',
    details: {
      'Format': 'JSON',
      'Result order': 'By confidence (desc)',
      'Classes': 'Fire, No Fire, Smoke, SmokeFire',
      'Confidence': '0.0 to 1.0 (floating point)',
      'Timestamp': 'ISO 8601 format',
    },
    example: {
      results: [
        {
          className: 'Fire',
          probability: 0.8542,
        },
        {
          className: 'Smoke',
          probability: 0.1234,
        },
        {
          className: 'SmokeFire',
          probability: 0.0134,
        },
        {
          className: 'No Fire',
          probability: 0.0090,
        },
      ],
      processingTime: '2025-07-14T10:30:45.123Z',
    },
  },

  /* -------------------------------------------------- */
  /*  RATE LIMITING                                     */
  /* -------------------------------------------------- */
  rateLimits: {
    title: 'Rate Limits & Usage',
    description: 'API usage limits and response headers',
    limits: {
      requests: 10,
      window: '30 seconds',
      maxFileSize: '4 MB',
      algorithm: 'Sliding window',
    },
    headers: [
      {
        name: 'X-RateLimit-Limit',
        description: 'Total allowed requests',
      },
      {
        name: 'X-RateLimit-Remaining',
        description: 'Requests left in window',
      },
      {
        name: 'X-RateLimit-Reset',
        description: 'Reset timestamp',
      },
    ],
    bestPractices: [
      'Check X-RateLimit-Remaining before making requests',
      'Implement exponential backoff for 429 responses',
      'Cache predictions when possible to reduce API calls',
      'Use batch processing for multiple images when available',
    ],
  },

  /* -------------------------------------------------- */
  /*  PROGRAMMING LANGUAGES                             */
  /* -------------------------------------------------- */
  languages: [
    {
      id: 'javascript',
      name: 'JavaScript',
      fileExtension: 'js',
      syntaxHighlight: 'javascript',
    },
    {
      id: 'python',
      name: 'Python',
      fileExtension: 'py',
      syntaxHighlight: 'python',
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      fileExtension: 'js',
      syntaxHighlight: 'javascript',
    },
    {
      id: 'go',
      name: 'Go',
      fileExtension: 'go',
      syntaxHighlight: 'go',
    },
    {
      id: 'curl',
      name: 'cURL',
      fileExtension: 'sh',
      syntaxHighlight: 'bash',
    },
  ],

  /* -------------------------------------------------- */
  /*  ERROR CODES                                       */
  /* -------------------------------------------------- */
  errorCodes: [
    {
      code: '400',
      title: 'Bad Request',
      description: 'Invalid image format or missing file',
      color: 'destructive',
      examples: [
        'No image file provided',
        'Invalid form data format',
        'Unsupported file type',
        'Corrupted image file',
      ],
      handlingTips: [
        'Validate file type client-side before upload',
        'Check that you\'re sending proper multipart/form-data',
        'Ensure the file key is "image" in the form data',
      ],
      response: {
        error: 'Invalid file type. Please upload an image file.',
        code: 'INVALID_FILE_TYPE',
        timestamp: '2025-07-14T10:23:45.123Z',
      },
    },
    {
      code: '413',
      title: 'Payload Too Large',
      description: 'Image file exceeds 4MB limit',
      color: 'secondary',
      examples: [
        'File size > 4MB',
        'Uncompressed image data',
        'High resolution images',
      ],
      handlingTips: [
        'Compress images before uploading',
        'Check file size client-side (max 4MB)',
        'Resize large images to a reasonable dimension',
      ],
      response: {
        error: 'File size exceeds the limit of 4 MB',
        code: 'PAYLOAD_TOO_LARGE',
        timestamp: '2025-07-14T10:24:12.456Z',
      },
    },
    {
      code: '429',
      title: 'Too Many Requests',
      description: 'Rate limit exceeded',
      color: 'outline',
      examples: [
        'More than 10 requests in 30 seconds',
        'Sliding window rate limit hit',
        'Need to wait for reset',
      ],
      handlingTips: [
        'Implement exponential backoff retry logic',
        'Monitor X-RateLimit-Remaining header',
        'Cache results when possible',
        'Wait until X-RateLimit-Reset before retrying',
      ],
      response: {
        error: 'Rate limit exceeded. Please try again later.',
        code: 'TOO_MANY_REQUESTS',
        details: {
          limit: '10',
          remaining: '0',
          reset: '30',
        },
        timestamp: '2025-07-14T10:25:33.789Z',
      },
    },
    {
      code: '500',
      title: 'Internal Server Error',
      description: 'Model inference error',
      color: 'destructive',
      examples: [
        'Model loading failure',
        'Image preprocessing error',
        'TensorFlow inference error',
        'Server overload',
      ],
      handlingTips: [
        'Retry with exponential backoff',
        'Report the issue if persistent',
        'Check if image is valid and not corrupted',
        'Consider fallback options if service is down',
      ],
      response: {
        error: 'Model inference failed',
        code: 'INFERENCE_ERROR',
        timestamp: '2025-07-14T10:26:07.234Z',
      },
    },
  ],

  /* -------------------------------------------------- */
  /*  INTERACTIVE TESTING                               */
  /* -------------------------------------------------- */
  testing: {
    title: 'API Reference & Live Testing',
    description: 'Select a programming language to see implementation examples, then test the API directly.',
    tryItButton: 'Try It!',
    loadingText: 'Testing...',
    processingText: 'Processing request...',
    sampleImage: {
      title: 'Sample Test Image',
      description: '224x224 px test image used for API testing',
      colors: ['#ff6b35', '#2d3748', '#68d391', '#a0a0a0'], // fire, dark, green, smoke
    },
    emptyState: {
      title: 'Click "Try It!" to test the API with the sample image',
      subtitle: 'The request will send the test image to the API and show the real response',
    },
    troubleshooting: [
      'Check your network connection',
      'Verify API endpoint is running',
      'Try again in a few moments',
    ],
  },

  /* -------------------------------------------------- */
  /*  GENERAL TIPS                                      */
  /* -------------------------------------------------- */
  generalTips: {
    title: 'Error Handling Tips',
    items: [
      'Always check the response status code',
      'Parse error messages for detailed information',
      'Implement retry logic with exponential backoff for 429/500 errors',
      'Validate files client-side before uploading',
      'Monitor rate limit headers to prevent 429 errors',
    ],
  },
} as const;

export type ApiDocsConfig = typeof apiDocsConfig;
