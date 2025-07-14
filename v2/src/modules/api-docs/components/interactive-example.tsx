'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import Image from 'next/image';
import { useState } from 'react';
import { BsArrowLeftRight, BsArrowsExpandVertical } from 'react-icons/bs';
import { PiWarningCircle } from 'react-icons/pi';

export function InteractiveExample() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const languages = [
    {
      id: 'javascript',
      name: 'JavaScript',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48">
          <path fill="#ffd600" d="M6,42V6h36v36H6z"></path>
          <path
            fill="#000001"
            d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"
          ></path>
        </svg>
      ),
    },
    {
      id: 'python',
      name: 'Python',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48">
          <path
            fill="#0277BD"
            d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"
          ></path>
          <path
            fill="#FFC107"
            d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"
          ></path>
        </svg>
      ),
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48">
          <path
            fill="#21a366"
            d="M24.007,45.419c-0.574,0-1.143-0.15-1.646-0.44l-5.24-3.103c-0.783-0.438-0.401-0.593-0.143-0.682	c1.044-0.365,1.255-0.448,2.369-1.081c0.117-0.067,0.27-0.043,0.39,0.028l4.026,2.389c0.145,0.079,0.352,0.079,0.486,0l15.697-9.061	c0.145-0.083,0.24-0.251,0.24-0.424V14.932c0-0.181-0.094-0.342-0.243-0.432L24.253,5.446c-0.145-0.086-0.338-0.086-0.483,0	L8.082,14.499c-0.152,0.086-0.249,0.255-0.249,0.428v18.114c0,0.173,0.094,0.338,0.244,0.42l4.299,2.483	c2.334,1.167,3.76-0.208,3.76-1.591V16.476c0-0.255,0.2-0.452,0.456-0.452h1.988c0.248,0,0.452,0.196,0.452,0.452v17.886	c0,3.112-1.697,4.9-4.648,4.9c-0.908,0-1.623,0-3.619-0.982l-4.118-2.373C5.629,35.317,5,34.216,5,33.042V14.928	c0-1.179,0.629-2.279,1.646-2.861L22.36,3.002c0.994-0.562,2.314-0.562,3.301,0l15.694,9.069C42.367,12.656,43,13.753,43,14.932	v18.114c0,1.175-0.633,2.271-1.646,2.861L25.66,44.971c-0.503,0.291-1.073,0.44-1.654,0.44"
          ></path>
          <path
            fill="#21a366"
            d="M28.856,32.937c-6.868,0-8.308-3.153-8.308-5.797c0-0.251,0.203-0.452,0.455-0.452h2.028	c0.224,0,0.413,0.163,0.448,0.384c0.306,2.066,1.218,3.108,5.371,3.108c3.308,0,4.715-0.747,4.715-2.502	c0-1.01-0.401-1.76-5.54-2.263c-4.299-0.424-6.955-1.371-6.955-4.809c0-3.167,2.672-5.053,7.147-5.053	c5.026,0,7.517,1.745,7.831,5.493c0.012,0.13-0.035,0.255-0.122,0.35c-0.086,0.09-0.208,0.145-0.334,0.145h-2.039	c-0.212,0-0.397-0.149-0.44-0.354c-0.491-2.173-1.678-2.868-4.904-2.868c-3.611,0-4.031,1.257-4.031,2.2	c0,1.143,0.495,1.477,5.367,2.122c4.825,0.64,7.116,1.544,7.116,4.935c0,3.418-2.853,5.379-7.827,5.379"
          ></path>
        </svg>
      ),
    },
    {
      id: 'go',
      name: 'Go',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48">
          <path
            fill="#ffcc80"
            d="M35.547 42.431l-3.182-3.182-2.121 2.121 3.182 3.182c.586.586 1.536.586 2.121 0S36.133 43.017 35.547 42.431zM38.547 24.431l-3.182-3.182-2.121 2.121 3.182 3.182c.586.586 1.536.586 2.121 0S39.133 25.017 38.547 24.431zM12.683 42.431l3.182-3.182 2.121 2.121-3.182 3.182c-.586.586-1.536.586-2.121 0S12.097 43.017 12.683 42.431zM9.433 24.431l3.182-3.182 2.121 2.121-3.182 3.182c-.586.586-1.536.586-2.121 0S8.847 25.017 9.433 24.431z"
          ></path>
          <path
            fill="#4dd0e1"
            d="M38 8c0-1.933-1.149-3-3.231-3S31 7.567 31 9.5c0 1 1.923 1.5 3 1.5C36.082 11 38 9.933 38 8zM10 8c0-1.933 1.149-3 3.231-3S17 7.567 17 9.5c0 1-1.923 1.5-3 1.5C11.918 11 10 9.933 10 8z"
          ></path>
          <path fill="#424242" d="M35 7A1 1 0 1 0 35 9 1 1 0 1 0 35 7zM13 7A1 1 0 1 0 13 9 1 1 0 1 0 13 7z"></path>
          <path
            fill="#4dd0e1"
            d="M37,34c0,4.774-3.219,10-13.31,10C15.568,44,11,38.774,11,34c0-5,1-5.806,1-10c0-4.688,0-7,0-10 c0-4.774,3.076-11,11.69-11S36,6.991,36,13c0,3-0.237,5.453,0,10C36.186,26.562,37,31,37,34z"
          ></path>
          <g>
            <path fill="#f5f5f5" d="M29 6A4 4 0 1 0 29 14 4 4 0 1 0 29 6zM19 6A4 4 0 1 0 19 14 4 4 0 1 0 19 6z"></path>
          </g>
          <g>
            <path
              fill="#eee"
              d="M24 20c0 .552.448 1 1 1s1-.448 1-1v-3h-2V20zM22 20c0 .552.448 1 1 1s1-.448 1-1v-3h-2V20z"
            ></path>
          </g>
          <path
            fill="#ffcc80"
            d="M26.5,18c-0.412,0-0.653-0.085-1.011-0.205c-0.975-0.328-2.021-0.326-2.996,0.002 C22.138,17.916,21.91,18,21.5,18c-1.334,0-1.5-1-1.5-1.5c0-1.5,1.5-2.5,3-2.5c0.835,0,1.165,0,2,0c1.5,0,3,1,3,2.5 C28,17,27.834,18,26.5,18z"
          ></path>
          <g>
            <path
              fill="#424242"
              d="M27 9A1 1 0 1 0 27 11 1 1 0 1 0 27 9zM17 9A1 1 0 1 0 17 11 1 1 0 1 0 17 9zM24 13A2 1 0 1 0 24 15 2 1 0 1 0 24 13z"
            ></path>
          </g>
        </svg>
      ),
    },
  ];
  const codeExamples = {
    javascript: `const formData = new FormData();
formData.append('image', file);

const response = await fetch('/api/predict', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log('Prediction:', result.results[0].className);`,

    python: `import requests

url = "https://fire.osnaren.com/api/predict"
files = {"image": open("forest.jpg", "rb")}

response = requests.post(url, files=files)
result = response.json()

print(f"Top prediction: {result['results'][0]['className']}")
print(f"Confidence: {result['results'][0]['probability']:.2%}")`,

    curl: `curl -X POST \\
  https://fire.osnaren.com/api/predict \\
  -F "image=@forest.jpg" \\
  -H "Content-Type: multipart/form-data"`,

    nodejs: `const axios = require('axios');
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

    go: `package main

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
  };

  const handleTryIt = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Fetch the test image from the public folder
      const imageResponse = await fetch('/test-image.jpg');
      if (!imageResponse.ok) {
        throw new Error('Failed to load test image.');
      }
      const imageBlob = await imageResponse.blob();

      const formData = new FormData();
      formData.append('image', imageBlob, 'test-image.jpg');

      const apiResponse = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      const result = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(result.error || `Request failed with status ${apiResponse.status}`);
      }

      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-primary/20 from-primary/5 to-accent/5 bg-gradient-to-br backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary">API Reference & Live Testing</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              POST
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              /api/predict
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground text-sm">
          Select a programming language to see implementation examples, then test the API directly.
        </p>

        {/* Language Selector */}
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-fit gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.id}
                variant={selectedLanguage === lang.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLanguage(lang.id)}
                className={`text-xs whitespace-nowrap hover:text-white ${
                  selectedLanguage === lang.id ? 'border-primary/30 bg-primary/10 text-primary' : 'hover:bg-muted/50'
                }`}
              >
                <span className="mr-2 h-4 w-4">{lang.icon}</span>
                {lang.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Code Example */}
          <div className="space-y-3">
            <h4 className="text-foreground text-sm font-semibold">Code Example</h4>
            <CodeBlock
              language={
                selectedLanguage === 'curl'
                  ? 'bash'
                  : selectedLanguage === 'nodejs'
                    ? 'javascript'
                    : selectedLanguage === 'go'
                      ? 'go'
                      : selectedLanguage
              }
              filename={`example.${
                selectedLanguage === 'python'
                  ? 'py'
                  : selectedLanguage === 'curl'
                    ? 'sh'
                    : selectedLanguage === 'go'
                      ? 'go'
                      : 'js'
              }`}
              code={codeExamples[selectedLanguage as keyof typeof codeExamples]}
            />
            <div className="border-border/50 bg-muted/20 mt-4 rounded-md border p-3">
              <h5 className="text-muted-foreground mb-2 text-xs font-medium">Sample Test Image</h5>
              <div className="flex items-center justify-center">
                <div className="border-border relative h-32 w-32 overflow-hidden rounded-md border">
                  <Image src="/test-image.jpg" alt="Sample Test Image" layout="fill" objectFit="cover" />
                </div>
              </div>
              <p className="text-muted-foreground mt-2 text-center text-xs">
                224x224 px test image used for API testing
              </p>
            </div>
          </div>

          {/* Try It Live */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-foreground text-sm font-semibold">Try It Live</h4>
              <Button
                onClick={handleTryIt}
                disabled={isLoading}
                size="sm"
                className="bg-primary/10 border-primary/20 hover:bg-primary/20"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Testing...
                  </>
                ) : (
                  'Try It!'
                )}
              </Button>
            </div>

            <div className="border-border/50 bg-card/30 min-h-[270px] rounded-lg border p-4">
              {!response && !error && !isLoading && (
                <div className="flex h-full flex-col items-center justify-center px-4 py-8 text-center">
                  <div className="bg-muted/30 mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                    <PiWarningCircle className="text-muted-foreground size-8" />
                  </div>
                  <p className="text-muted-foreground mb-2 text-sm">
                    Click "Try It!" to test the API with the sample image
                  </p>
                  <p className="text-muted-foreground text-xs">
                    The request will send the test image to the API and show the real response
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="flex h-full flex-col items-center justify-center px-4 py-12">
                  <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                    <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"></div>
                  </div>
                  <p className="text-primary text-sm font-medium">Processing request...</p>
                  <p className="text-muted-foreground mt-1 text-xs">Sending test image to API</p>
                </div>
              )}

              {error && (
                <div className="space-y-4">
                  <div className="border-destructive flex items-center gap-3 border-l-4 py-2 pl-3">
                    <Badge variant="destructive" className="text-xs">
                      ERROR
                    </Badge>
                    <span className="text-destructive text-sm font-medium">Request Failed</span>
                  </div>
                  <CodeBlock language="json" filename="error.json" code={JSON.stringify({ error }, null, 2)} />
                  <div className="bg-destructive/5 border-destructive/20 text-destructive/90 rounded-md border p-3 text-xs">
                    <p className="mb-1 font-medium">Troubleshooting tips:</p>
                    <ul className="list-disc space-y-1 pl-4">
                      <li>Check your network connection</li>
                      <li>Verify API endpoint is running</li>
                      <li>Try again in a few moments</li>
                    </ul>
                  </div>
                </div>
              )}

              {response && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 border-l-4 border-green-500 py-2 pl-3">
                    <Badge variant="default" className="bg-green-600 text-xs">
                      200
                    </Badge>
                    <span className="text-sm font-medium text-green-600">Success</span>
                    <span className="text-muted-foreground ml-auto text-xs">
                      {response.processingTime && new Date(response.processingTime).toLocaleTimeString()}
                    </span>
                  </div>
                  <CodeBlock language="json" filename="response.json" code={JSON.stringify(response, null, 2)} />

                  {response.results && response.results.length > 0 && (
                    <div className="bg-accent/10 border-accent/20 rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-accent font-medium">Top Prediction: </span>
                          <span className="font-mono">{response.results[0].className}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-muted h-2 w-16 overflow-hidden rounded-full">
                            <div
                              className="bg-accent h-full"
                              style={{ width: `${response.results[0].probability * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-muted-foreground text-xs">
                            {(response.results[0].probability * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="border-border/50 mt-2 border-t pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BsArrowLeftRight className="text-primary" />
                <h5 className="text-foreground text-sm font-medium">Request Details</h5>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="text-muted-foreground text-xs font-medium">Content-Type:</div>
                <div className="font-mono text-xs">multipart/form-data</div>

                <div className="text-muted-foreground text-xs font-medium">File parameter:</div>
                <div className="font-mono text-xs">image</div>

                <div className="text-muted-foreground text-xs font-medium">Max size:</div>
                <div className="text-xs">4MB</div>

                <div className="text-muted-foreground text-xs font-medium">Formats:</div>
                <div className="text-xs">JPEG, PNG, WebP, GIF</div>

                <div className="text-muted-foreground text-xs font-medium">Rate limit:</div>
                <div className="text-xs">10 req / 30 sec</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BsArrowsExpandVertical className="text-accent" />
                <h5 className="text-foreground text-sm font-medium">Response Format</h5>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="text-muted-foreground text-xs font-medium">Format:</div>
                <div className="font-mono text-xs">JSON</div>

                <div className="text-muted-foreground text-xs font-medium">Result order:</div>
                <div className="text-xs">By confidence (desc)</div>

                <div className="text-muted-foreground text-xs font-medium">Classes:</div>
                <div className="text-xs">Fire, No Fire, Smoke, SmokeFire</div>

                <div className="text-muted-foreground text-xs font-medium">Confidence:</div>
                <div className="text-xs">0.0 to 1.0 (floating point)</div>

                <div className="text-muted-foreground text-xs font-medium">Timestamp:</div>
                <div className="text-xs">ISO 8601 format</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
