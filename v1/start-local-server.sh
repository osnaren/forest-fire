#!/bin/bash
# A simple script to start a local HTTP server to avoid CORS issues with file:// protocol

echo "Starting a local HTTP server for ForestFire application..."
echo "This will help avoid CORS issues when loading model files."
echo "Press Ctrl+C to stop the server when done."
echo ""
echo "Once the server is running, open your browser and go to:"
echo "http://localhost:8000/"
echo ""

# Check if Python 3 is available
if command -v python3 &>/dev/null; then
    python3 -m http.server 8000
# Otherwise try Python 2
elif command -v python &>/dev/null; then
    python -m SimpleHTTPServer 8000
# If no Python, try node if available
elif command -v npx &>/dev/null; then
    npx http-server -p 8000
else
    echo "Error: Could not find Python or Node.js to run a local server."
    echo "Please install Python or Node.js and try again."
    exit 1
fi
