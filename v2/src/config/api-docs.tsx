/**
 * API Documentation configuration for Forest Fire Classifier v2
 * Centralized configuration for API documentation content, examples, and metadata
 */

export const apiDocsConfig = {
  /* -------------------------------------------------- */
  /*  HERO SECTION                                      */
  /* -------------------------------------------------- */
  hero: {
    eyebrow: 'Forest Fire ML API',
    title: 'API Documentation',
    subtitle:
      'Integrate wildfire detection capabilities into your applications with our RESTful API. Simple, fast, and reliable machine learning inference.',
    features: [
      { label: 'Real-time predictions', badgeClass: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/40' },
      { label: '4-class classification', badgeClass: 'bg-sky-500/15 text-sky-200 ring-sky-400/40' },
      { label: 'Rate limited', badgeClass: 'bg-purple-500/15 text-purple-200 ring-purple-400/40' },
      { label: '4MB max file size', badgeClass: 'bg-orange-500/15 text-orange-200 ring-orange-400/40' },
    ],
    metrics: [
      { label: 'Avg Latency', value: '~420 ms', helper: 'P95 across last 1k requests' },
      { label: 'Model Accuracy', value: '94.2%', helper: 'MobileNet v3 fine-tuned' },
      { label: 'Global Edge', value: 'Multi-region', helper: 'Auto-scaling & fallback' },
    ],
    status: {
      uptime: '99.98%',
      lastDeploy: '2 minutes ago',
    },
    cta: {
      primary: {
        label: 'Copy cURL request',
        value: `curl -X POST \\
  https://fire.osnaren.com/api/predict \\
  -F "image=@forest.jpg" \\
  -H "Content-Type: multipart/form-data"`,
      },
      secondary: {
        label: 'View health check',
        href: '/api/health',
      },
    },
  },

  /* -------------------------------------------------- */
  /*  OVERVIEW / FLOW                                   */
  /* -------------------------------------------------- */
  overview: {
    summary:
      'Send a single multipart/form-data request and receive a sorted probability array with timestamps and processing metadata.',
    steps: [
      {
        title: '1. Upload an image',
        description:
          'Attach your file under the "image" field. We validate MIME type, size, and basic EXIF metadata before queuing the job.',
      },
      {
        title: '2. Server-side preprocessing',
        description:
          'Images are resized to 224×224, normalized to [-1, 1], and passed through the shared MobileNet model cache.',
      },
      {
        title: '3. Receive structured output',
        description:
          'Probabilities are rounded to four decimals, sorted in descending order, and returned with processing metadata.',
      },
    ],
    guarantees: [
      {
        label: 'Deterministic ordering',
        description: 'Results are pre-sorted so the top prediction is always index 0.',
      },
      { label: 'Predictable limits', description: 'Hard 4 MB payload cap with descriptive 413 errors when exceeded.' },
      {
        label: 'Rate limit headers',
        description: 'Each response forwards X-RateLimit-* headers for proactive throttling.',
      },
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
      Formats: 'JPEG, PNG, WebP, GIF',
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
      Format: 'JSON',
      'Result order': 'By confidence (desc)',
      Classes: 'Fire, No Fire, Smoke, SmokeFire',
      Confidence: '0.0 to 1.0 (floating point)',
      Timestamp: 'ISO 8601 format',
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
          probability: 0.009,
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
    timeline: [
      {
        label: '0–6 requests',
        status: 'Safe zone',
        description: 'Responses are served at full speed with warm model weights.',
      },
      {
        label: '7–9 requests',
        status: 'Warning',
        description: 'We begin returning tighter rate headers—consider backing off slightly.',
      },
      {
        label: '10+ requests',
        status: 'Cooldown',
        description: 'Subsequent calls receive HTTP 429 until the 30s window resets.',
      },
    ],
    cooldownHint: 'Respect the X-RateLimit-Reset header before retrying to avoid cascading failures.',
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
      code: `const formData = new FormData();
formData.append('image', file);

const response = await fetch('/api/predict', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Prediction:', result.results[0].className);`,
    },
    {
      id: 'python',
      name: 'Python',
      fileExtension: 'py',
      syntaxHighlight: 'python',
      code: `import requests

url = "https://fire.osnaren.com/api/predict"
files = {"image": open("forest.jpg", "rb")}

response = requests.post(url, files=files)
result = response.json()

print(f"Top prediction: {result['results'][0]['className']}")
print(f"Confidence: {result['results'][0]['probability']:.2%}")`,
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      fileExtension: 'js',
      syntaxHighlight: 'javascript',
      code: `const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('image', fs.createReadStream('forest.jpg'));

const response = await axios.post(
  'https://fire.osnaren.com/api/predict',
  form,
  { headers: form.getHeaders() }
);

console.log('Results:', response.data.results);`,
    },
    {
      id: 'go',
      name: 'Go',
      fileExtension: 'go',
      syntaxHighlight: 'go',
      code: `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	url := "https://fire.osnaren.com/api/predict"
	
	// Open file
	file, err := os.Open("forest.jpg")
	if err != nil {
		panic(err)
	}
	defer file.Close()
	
	// Create form data
	var buf bytes.Buffer
	writer := multipart.NewWriter(&buf)
	
	// Add file to form
	part, err := writer.CreateFormFile("image", filepath.Base("forest.jpg"))
	if err != nil {
		panic(err)
	}
	io.Copy(part, file)
	writer.Close()
	
	// Create request
	req, err := http.NewRequest("POST", url, &buf)
	if err != nil {
		panic(err)
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())
	
	// Send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	
	// Parse response
	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)
	
	fmt.Println("Results:", result)
}`,
    },
    {
      id: 'curl',
      name: 'cURL',
      fileExtension: 'sh',
      syntaxHighlight: 'bash',
      code: `curl -X POST \\
  https://fire.osnaren.com/api/predict \\
  -F "image=@forest.jpg" \\
  -H "Content-Type: multipart/form-data"`,
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
      examples: ['No image file provided', 'Invalid form data format', 'Unsupported file type', 'Corrupted image file'],
      handlingTips: [
        'Validate file type client-side before upload',
        "Check that you're sending proper multipart/form-data",
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
      examples: ['File size > 4MB', 'Uncompressed image data', 'High resolution images'],
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
      examples: ['More than 10 requests in 30 seconds', 'Sliding window rate limit hit', 'Need to wait for reset'],
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
      examples: ['Model loading failure', 'Image preprocessing error', 'TensorFlow inference error', 'Server overload'],
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
    troubleshooting: ['Check your network connection', 'Verify API endpoint is running', 'Try again in a few moments'],
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
