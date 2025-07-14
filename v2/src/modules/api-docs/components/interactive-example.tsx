'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { apiDocsConfig } from '@/config/api-docs';
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
            fill="#388e3c"
            d="M17.204 19.122l-4.907 2.715C12.113 21.938 12 22.126 12 22.329v5.433c0 .203.113.39.297.492l4.908 2.717c.183.101.41.101.593 0l4.907-2.717C22.887 28.152 23 27.965 23 27.762v-5.433c0-.203-.113-.39-.297-.492l-4.906-2.715c-.092-.051-.195-.076-.297-.076-.103 0-.205.025-.297.076M42.451 24.013l-.818.452c-.031.017-.049.048-.049.082v.906c0 .034.019.065.049.082l.818.453c.031.017.068.017.099 0l.818-.453c.03-.017.049-.048.049-.082v-.906c0-.034-.019-.065-.05-.082l-.818-.452C42.534 24.004 42.517 24 42.5 24S42.466 24.004 42.451 24.013"
          ></path>
          <path
            fill="#37474f"
            d="M35.751,13.364l-2.389-1.333c-0.075-0.042-0.167-0.041-0.241,0.003 c-0.074,0.044-0.12,0.123-0.12,0.209L33,20.295l-2.203-1.219C30.705,19.025,30.602,19,30.5,19c-0.102,0-0.205,0.025-0.297,0.076 h0.001l-4.907,2.715C25.113,21.892,25,22.08,25,22.282v5.433c0,0.203,0.113,0.39,0.297,0.492l4.908,2.717 c0.183,0.101,0.41,0.101,0.593,0l4.907-2.717C35.887,28.106,36,27.918,36,27.715V13.788C36,13.612,35.904,13.45,35.751,13.364z M32.866,26.458l-2.23,1.235c-0.083,0.046-0.186,0.046-0.269,0l-2.231-1.235C28.051,26.412,28,26.326,28,26.234v-2.47 c0-0.092,0.051-0.177,0.135-0.224l2.231-1.234h-0.001c0.042-0.023,0.088-0.034,0.135-0.034c0.047,0,0.093,0.012,0.135,0.034 l2.23,1.234C32.949,23.587,33,23.673,33,23.765v2.47C33,26.326,32.949,26.412,32.866,26.458z"
          ></path>
          <path
            fill="#2e7d32"
            d="M17.204,19.122L12,27.762c0,0.203,0.113,0.39,0.297,0.492l4.908,2.717 c0.183,0.101,0.41,0.101,0.593,0L23,22.329c0-0.203-0.113-0.39-0.297-0.492l-4.906-2.715c-0.092-0.051-0.195-0.076-0.297-0.076 c-0.103,0-0.205,0.025-0.297,0.076"
          ></path>
          <path
            fill="#4caf50"
            d="M17.204,19.122l-4.907,2.715C12.113,21.938,12,22.126,12,22.329l5.204,8.642 c0.183,0.101,0.41,0.101,0.593,0l4.907-2.717C22.887,28.152,23,27.965,23,27.762l-5.203-8.64c-0.092-0.051-0.195-0.076-0.297-0.076 c-0.103,0-0.205,0.025-0.297,0.076"
          ></path>
          <path
            fill="#37474f"
            d="M47.703 21.791l-4.906-2.715C42.705 19.025 42.602 19 42.5 19c-.102 0-.205.025-.297.076h.001l-4.907 2.715C37.114 21.892 37 22.084 37 22.294v5.411c0 .209.114.402.297.503l4.908 2.717c.184.102.409.102.593 0l2.263-1.253c.207-.115.206-.412-.002-.526l-4.924-2.687C40.052 26.412 40 26.325 40 26.231v-2.466c0-.092.05-.177.13-.221l2.235-1.236h-.001c.042-.023.088-.034.135-.034.047 0 .093.012.135.034l2.235 1.237c.08.044.13.129.13.221v2.012c0 .086.046.166.121.209.075.042.167.042.242-.001l2.398-1.393c.148-.086.24-.245.24-.417v-1.88C48 22.085 47.886 21.892 47.703 21.791zM10.703 21.791l-4.906-2.715C5.705 19.025 5.602 19 5.5 19c-.102 0-.205.025-.297.076h.001l-4.907 2.715C.114 21.892 0 22.084 0 22.294v7.465c0 .086.046.166.121.209.075.042.167.042.242-.001l2.398-1.393C2.909 28.488 3 28.329 3 28.157v-4.393c0-.092.05-.177.13-.221l2.235-1.236H5.365c.042-.023.088-.034.135-.034.047 0 .093.012.135.034l2.235 1.237C7.95 23.588 8 23.673 8 23.765v4.393c0 .172.091.331.24.417l2.398 1.393c.075.043.167.043.242.001C10.954 29.925 11 29.845 11 29.759v-7.464C11 22.085 10.886 21.892 10.703 21.791z"
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
      // Create a sample image blob (1x1 pixel red image for testing)
      const canvas = document.createElement('canvas');
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Create a simple test pattern
        ctx.fillStyle = '#ff6b35'; // Orange/red color to simulate fire
        ctx.fillRect(0, 0, 112, 112);
        ctx.fillStyle = '#2d3748'; // Dark color
        ctx.fillRect(112, 0, 112, 112);
        ctx.fillStyle = '#68d391'; // Green color
        ctx.fillRect(0, 112, 112, 112);
        ctx.fillStyle = '#a0a0a0'; // Gray color for smoke
        ctx.fillRect(112, 112, 112, 112);
      }

      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            setError('Failed to create test image');
            setIsLoading(false);
            return;
          }

          const formData = new FormData();
          formData.append('image', blob, 'test-image.jpg');

          const response = await fetch('/api/predict', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP ${response.status}`);
          }

          const result = await response.json();
          setResponse(result);
        },
        'image/jpeg',
        0.8
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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
                className={`text-xs whitespace-nowrap ${
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
