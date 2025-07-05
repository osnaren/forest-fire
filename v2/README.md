# Forest Fire Classifier v2

🔥 **Professional-grade forest fire detection using AI in the browser and server**

[![CI](https://github.com/your-username/ForestFire/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/ForestFire/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)

## 🌟 Overview

Forest Fire Classifier v2 is a complete overhaul of the original college prototype, delivering **near-instant wildfire detection** from images in the browser using a MobileNet TensorFlow.js model. It also exposes a secure, rate-limited public API for server-side inference.

### 🚀 Key Features

- **🔥 AI-Powered Detection**: MobileNet-based model classifying Fire, No Fire, Smoke, and SmokeFire
- **⚡ Dual Inference**: Client-side (WebGL) and server-side (Node.js) prediction capabilities
- **🛡️ Production Ready**: Rate limiting, error handling, monitoring, and security
- **🎨 Modern Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **📱 Responsive Design**: Mobile-first design with accessibility support
- **🔒 Secure API**: Rate-limited endpoints with proper error handling
- **📊 Live Monitoring**: Health checks and performance metrics

## 🏗️ Architecture

```txt
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/
│   │   │   ├── 📁 health/     # Health check endpoint
│   │   │   └── 📁 predict/    # ML prediction API
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Landing page
│   └── 📁 lib/
│       ├── 📁 server/
│       │   ├── predict.ts     # TensorFlow.js model server
│       │   ├── ratelimit.ts   # Upstash rate limiting
│       │   └── errors.ts      # Centralized error handling
│       └── types.ts          # Shared TypeScript types
├── 📁 public/
│   └── 📁 model/             # TensorFlow.js model files
└── 📋 Configuration files
```

## 🛠️ Tech Stack

### Core Technologies

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[TensorFlow.js](https://www.tensorflow.org/js)** - Machine learning in JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### AI & ML

- **[@tensorflow/tfjs](https://www.npmjs.com/package/@tensorflow/tfjs)** - Core TensorFlow.js
- **[@tensorflow/tfjs-node](https://www.npmjs.com/package/@tensorflow/tfjs-node)** - Node.js backend
- **[Sharp](https://sharp.pixelplumbing.com/)** - High-performance image processing

### Backend & Infrastructure

- **[@upstash/ratelimit](https://www.npmjs.com/package/@upstash/ratelimit)** - Serverless rate limiting
- **[@vercel/kv](https://www.npmjs.com/package/@vercel/kv)** - Key-value storage
- **[Zod](https://zod.dev/)** - Runtime type validation

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting with accessibility rules
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Pre-commit linting

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Upstash Redis** instance (for rate limiting)

### Installation

1. **Clone and navigate**

   ```bash
   git clone https://github.com/your-username/ForestFire.git
   cd ForestFire/v2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp env.example .env.local
   ```

4. **Configure environment variables**

   ```env
   # Vercel KV (Upstash Redis)
   KV_REST_API_URL=your_upstash_url
   KV_REST_API_TOKEN=your_upstash_token

   # Public variables
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_FIRE_MODEL_PATH=/model/model.json
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   ```url
   http://localhost:3000
   ```

## 📡 API Documentation

### `POST /api/predict`

Analyze an image for fire/smoke detection.

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `image` field (max 4MB)

**Response:**

```json
{
  "results": [
    {
      "className": "Fire",
      "probability": 0.8734
    },
    {
      "className": "Smoke",
      "probability": 0.1021
    },
    {
      "className": "SmokeFire",
      "probability": 0.0142
    },
    {
      "className": "No Fire",
      "probability": 0.0103
    }
  ],
  "processingTime": "2024-01-15T10:30:45.123Z"
}
```

**Rate Limits:**

- 10 requests per 30 seconds per IP

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/predict \
  -F "image=@/path/to/your/image.jpg"
```

### `GET /api/health`

Check API and model availability.

**Response:**

```json
{
  "status": "ok",
  "model": "available",
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier

# Testing
npm test            # Run tests (placeholder)
```

### Git Workflow

The project uses pre-commit hooks to ensure code quality:

```bash
git add .
git commit -m "feat: add new feature"
# Automatically runs: lint-staged → ESLint → Prettier
```

### Project Structure Guidelines

- **Components**: Reusable UI components in `src/components/`
- **Pages**: App Router pages in `src/app/`
- **API Routes**: Server endpoints in `src/app/api/`
- **Utilities**: Helper functions in `src/lib/`
- **Types**: TypeScript definitions in `src/lib/types.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**

2. **Set environment variables in Vercel dashboard:**
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `NEXT_PUBLIC_SITE_URL`

3. **Deploy automatically on push to main**

### Manual Deployment

```bash
npm run build
npm start
```

## 🔧 Configuration

### Rate Limiting

Configured in `src/lib/server/ratelimit.ts`:

- **Limit**: 10 requests per 30 seconds
- **Storage**: Upstash Redis via Vercel KV
- **Strategy**: Sliding window

### Model Configuration

- **Format**: TensorFlow.js LayersModel
- **Input**: 224x224 RGB images
- **Preprocessing**: Resize → Normalize [-1, 1]
- **Output**: 4-class probability distribution

### Security Features

- **Rate limiting** on all API endpoints
- **File type validation** for uploads
- **File size limits** (4MB max)
- **Error sanitization** to prevent information leakage
- **CORS protection** via Next.js defaults

## 📊 Monitoring & Analytics

### Health Checks

- `GET /api/health` - Service and model availability
- Automatic model file validation
- Timestamp tracking for debugging

### Performance Metrics

- Server-side prediction timing
- Memory management for TensorFlow.js tensors
- Request/response logging

### Error Tracking

- Centralized error handling in `src/lib/server/errors.ts`
- Structured error responses with codes and timestamps
- Console logging for debugging

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'feat: add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js + accessibility rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- **TensorFlow.js** team for the ML framework
- **Vercel** for the deployment platform
- **Upstash** for serverless Redis
- **Sharp** for image processing capabilities

---

**🔗 Links:**

- [Live Demo](https://fire.osnaren.com)
- [Legacy v1](https://v1.fire.osnaren.com)
- [Documentation](https://github.com/your-username/ForestFire/wiki)
- [Issues](https://github.com/your-username/ForestFire/issues)

---

Built with ❤️ for wildfire detection and prevention.
