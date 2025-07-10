import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'API Documentation - Forest Fire Classifier v2',
  description: 'Complete API documentation for integrating wildfire detection into your applications.',
};

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display">
            API Documentation
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Integrate wildfire detection capabilities into your applications with our RESTful API.
            Simple, fast, and reliable.
          </p>
        </div>

        {/* API Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Prediction Endpoint</CardTitle>
            <CardDescription>
              Submit images for wildfire classification analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-emerald-400 mb-2">POST /api/predict</h4>
              <p className="text-gray-300 text-sm mb-4">
                Upload an image to get fire, smoke, and no-fire probability predictions.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-semibold mb-2">Request Format</h5>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <code className="text-sm text-gray-300">
                    Content-Type: multipart/form-data
                    <br />
                    Body: image file (max 4MB)
                  </code>
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Response Format</h5>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm text-gray-300">
{`{
  "predictions": {
    "fire": 0.85,
    "smoke": 0.12,
    "no_fire": 0.03
  },
  "top_prediction": "fire",
  "confidence": 0.85,
  "processing_time_ms": 342
}`}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rate Limits */}
        <Card>
          <CardHeader>
            <CardTitle>Rate Limits</CardTitle>
            <CardDescription>
              API usage limits and guidelines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-amber-400">Free Tier</h4>
                <p className="text-sm text-gray-300">10 requests per 30 seconds</p>
                <p className="text-sm text-gray-300">4MB max file size</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-emerald-400">Headers</h4>
                <p className="text-sm text-gray-300">X-RateLimit-Remaining</p>
                <p className="text-sm text-gray-300">X-RateLimit-Reset</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Examples */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold font-display text-center">Code Examples</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>cURL</CardTitle>
                <CardDescription>Command line example</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-300">
{`curl -X POST \\
  https://fire.osnaren.com/api/predict \\
  -F "image=@forest.jpg" \\
  -H "Content-Type: multipart/form-data"`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>JavaScript</CardTitle>
                <CardDescription>Fetch API example</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-300">
{`const formData = new FormData();
formData.append('image', file);

const response = await fetch('/api/predict', {
  method: 'POST',
  body: formData
});

const result = await response.json();`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Python</CardTitle>
                <CardDescription>Requests library example</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-300">
{`import requests

url = "https://fire.osnaren.com/api/predict"
files = {"image": open("forest.jpg", "rb")}

response = requests.post(url, files=files)
result = response.json()`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Node.js</CardTitle>
                <CardDescription>FormData with axios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-300">
{`const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('image', fs.createReadStream('forest.jpg'));

const response = await axios.post(
  'https://fire.osnaren.com/api/predict',
  form,
  { headers: form.getHeaders() }
);`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Error Codes */}
        <Card>
          <CardHeader>
            <CardTitle>Error Codes</CardTitle>
            <CardDescription>
              Common error responses and their meanings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-400">400 Bad Request</h4>
                  <p className="text-sm text-gray-300">Invalid image format or missing file</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-400">413 Payload Too Large</h4>
                  <p className="text-sm text-gray-300">Image file exceeds 4MB limit</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-400">429 Too Many Requests</h4>
                  <p className="text-sm text-gray-300">Rate limit exceeded</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-400">500 Internal Server Error</h4>
                  <p className="text-sm text-gray-300">Model inference error</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
