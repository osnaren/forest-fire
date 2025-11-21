# Forest Fire Classifier v2

[![Production](https://img.shields.io/badge/Live-Demo-ef4444?style=for-the-badge&logo=vercel)](https://fire.osnaren.com)
[![API](https://img.shields.io/badge/API-Docs-0ea5e9?style=for-the-badge&logo=swagger)](https://fire.osnaren.com/api-docs)
[![Next.js](https://img.shields.io/badge/Built%20with-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Dataset](https://img.shields.io/badge/Dataset-Forest%20Fire%20C4-22c55e?style=for-the-badge&logo=kaggle)](https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4)

Modern wildfire intelligence for the web: instant image classification, public API access, and polished UX powered by Next.js 14 and TensorFlow.js.

---

## Contents

1. [Highlights](#highlights)
2. [Live Experience](#live-experience)
3. [Model & Data](#model--data)
4. [Architecture Overview](#architecture-overview)
5. [Quick Start](#quick-start)
6. [API Snapshot](#api-snapshot)
7. [User Experience](#user-experience)
8. [Roadmap](#roadmap)
9. [Contributing](#contributing)
10. [License](#license)

---

## Highlights

- 🔥 **Real-time inference** for Fire, Smoke, Smoke+Fire, and No Fire classes
- ☁️ **Client + server flexibility**: WebGL model in the browser plus secure Node.js inference
- 🛡️ **Production hardening**: Rate limiting, structured errors, health checks, and ML observability
- 🎨 **Immersive interface**: Tailwind-powered design with motion presets and accessibility baked in

---

## Live Experience

- **Classifier**: [fire.osnaren.com](https://fire.osnaren.com)
- **API Explorer**: [fire.osnaren.com/api-docs](https://fire.osnaren.com/api-docs)
- **Legacy Prototype (v1)**: [v1.fire.osnaren.com](https://v1.fire.osnaren.com)

Looking for the original Teachable Machine demo? See [`v1/README.md`](../v1/README.md).

---

## Model & Data

- **Dataset**: [Forest Fire C4 on Kaggle](https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4) — released under **CC BY-NC-SA 4.0**. You're free to explore or adapt the dataset for non-commercial research with attribution and share-alike terms.
- **Model**: MobileNet backbone distilled for 224×224 RGB inputs, exported for both browser and Node.js execution.
- **Classes**: `Fire`, `Smoke`, `SmokeFire`, `No Fire`.
- **Preprocessing**: Resize → Crop → Normalize to [-1, 1]. Server-side paths reuse Sharp for deterministic results.

---

## Architecture Overview

```text
App Router (Next.js 14)
├── src/app
│   ├── page.tsx, layout.tsx       # Landing experience
│   ├── api/predict/route.ts       # Multipart upload → TensorFlow scoring → JSON
│   └── api/health/route.ts        # Model availability heartbeat
├── src/lib
│   ├── server/predict.ts          # Cached model loader + preprocessing
│   ├── server/ratelimit.ts        # Upstash (Vercel KV) sliding window guard
│   └── prediction-utils.ts        # Formatting helpers for UI
├── src/modules/home               # Hero, stats, features, CTA sections
└── public/model                   # TensorFlow.js model.json + weights
```

Key characteristics:

- **Single model, shared runtime** between browser (`@tensorflow/tfjs`) and API (`@tensorflow/tfjs-node`).
- **Predict endpoint** enforces MIME type, size (≤4 MB), and rate limits (10 requests / 30 s per IP).
- **Health endpoint** verifies model artifacts before surfacing "ok" status.

---

## Quick Start

```bash
# 1. Clone & enter the Next.js app
git clone https://github.com/your-username/ForestFire.git
cd ForestFire/v2

# 2. Install dependencies
npm install

# 3. Configure environment
cp env.example .env.local
# → provide KV_REST_API_URL and KV_REST_API_TOKEN from Upstash

# 4. Run locally
npm run dev

# 5. Visit the app
open http://localhost:3000
```

> Tip: Keep `public/model/` in sync whenever you retrain. The API and client both load from this directory.

---

## API Snapshot

| Endpoint       | Method | Description                                                                                                                        |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `/api/predict` | POST   | Accepts `multipart/form-data` with an `image` field (≤4 MB). Returns sorted class probabilities and timestamps. Rate limits apply. |
| `/api/health`  | GET    | Confirms model files are present and returns current status timestamp.                                                             |

Example request:

```bash
curl -X POST https://fire.osnaren.com/api/predict \
  -H "Accept: application/json" \
  -F "image=@sample.jpg"
```

---

## User Experience

- **Animations** powered by reusable motion presets (`AnimatedGroup`, `GlowingButton`, `FloatingElement`).
- **State management** via Zustand stores with consistent devtools labels.
- **Accessibility** includes keyboard-friendly navigation, reduced-motion fallbacks, and high-contrast accents.
- **Sponsor CTA** and map integrations provide paths for community support and situational awareness.

---

## Roadmap

- ✅ Serverless inference with Upstash-backed rate limits
- ✅ Unified configuration layer in `src/config/pages.tsx`
- 🔄 Expand automated testing for API and UI flows
- 🔄 Explore PWA support and offline inference bundles

Have ideas? Open an issue or start a discussion!

---

## Contributing

We welcome insights, especially around model evaluation and wildfire datasets.

1. Fork the repo and create a topic branch.
2. Run `npm run lint` and `npm run typecheck` before pushing.
3. Share reproducible steps, screenshots, or sample inputs with your PR.

---

## License

Code and model assets are released under the **Forest Fire Proprietary License**. Redistribution, modification, or commercial usage is prohibited without prior written permission. See the [LICENSE](../LICENSE) file for complete terms.

The referenced dataset — [Forest Fire C4](https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4) — is available separately under **CC BY-NC-SA 4.0**; please respect its attribution and non-commercial requirements when using it.

---

Built with purpose for faster wildfire response. Stay safe out there. 🌲🔥
