# Forest Fire Intelligence Suite

[![Live Demo](https://img.shields.io/badge/Live-fire.osnaren.com-ef4444?style=for-the-badge&logo=vercel)](https://fire.osnaren.com)
[![Legacy Demo](https://img.shields.io/badge/Legacy-v1.fire.osnaren.com-f97316?style=for-the-badge&logo=html5)](https://v1.fire.osnaren.com)
[![Dataset](https://img.shields.io/badge/Dataset-Forest%20Fire%20C4-22c55e?style=for-the-badge&logo=kaggle)](https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4)
[![License](https://img.shields.io/badge/License-Proprietary-critical?style=for-the-badge&logo=adguard)](./LICENSE)

AI-powered wildfire detection across modern (v2) and legacy (v1) web experiences. Upload an image, receive instant predictions, or integrate the rate-limited API into your tools.

---

## Contents

1. [Project Overview](#project-overview)
2. [Model & Dataset](#model--dataset)
3. [Quick Start](#quick-start)
4. [Repository Structure](#repository-structure)
5. [Roadmap](#roadmap)
6. [Community](#community)
7. [License](#license)

---

## Project Overview

| Project | Description | Highlights |
| --- | --- | --- |
| [`v2/`](./v2/README.md) | Next.js 14 application with both client-side and server-side TensorFlow.js inference. | Modern UI, `/api/predict` + `/api/health`, rate limiting, content configs, Zustand state management. |
| [`v1/`](./v1/README.md) | Original Teachable Machine prototype preserved for posterity. Runs fully in the browser with TensorFlow.js. | No backend dependency, animated results dashboard, legacy design. |
| [`docs/`](./docs/plan.md) | Planning notes and research artifacts. | Project planning context and historical insights. |

---

## Model & Dataset

- **Dataset**: [Forest Fire C4 (Kaggle)](https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4)
  - Licensed under **CC BY-NC-SA 4.0**. You may reuse and remix the dataset for non-commercial research with attribution and share-alike terms.
  - Curated across Fire, Smoke, Smoke+Fire, and No Fire classes.
- **Model**: MobileNet variant distilled for 224×224 image inputs.
  - Preprocessing: resize, center-crop, normalize to [-1, 1].
  - Shared between the browser bundle (`@tensorflow/tfjs`) and the Node runtime (`@tensorflow/tfjs-node`).
- **Performance**: ~98% validation accuracy on the curated validation split.

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/osnaren/forest-fire.git
cd forest-fire/v2

# 2. Install dependencies
npm install

# 3. Configure environment
cp env.example .env.local
# supply KV_REST_API_URL and KV_REST_API_TOKEN from Upstash

# 4. Run locally
npm run dev

# 5. Visit the app
# Windows
start "" http://localhost:3000
# macOS
open http://localhost:3000
```

> Keep `public/model/` in sync if you retrain. Both the client UI and prediction API load the same TensorFlow.js artifacts.

---

## Repository Structure

```text
docs/                Project planning notes
tailwind.config.ts   Shared Tailwind setup for v2
v1/                  Legacy Teachable Machine demo (static site)
v2/                  Next.js 14 application (primary)
└── public/model/    MobileNet model.json + weights shared by app & API
```

---

## Roadmap

- ✅ Production-ready Next.js experience with API explorer and rate-limited inference
- ✅ Legacy v1 preserved for historical context
- 🔄 Expand automated testing around predictions and UI flows
- 🔄 Explore offline-first packaging and PWA capabilities

Share ideas by opening an issue or discussion.

---

## Community

- **Issues**: [github.com/osnaren/forest-fire/issues](https://github.com/osnaren/forest-fire/issues)
- **Live Updates**: [fire.osnaren.com](https://fire.osnaren.com)
- **Dataset Feedback**: Comment directly on the [Kaggle dataset](https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4)

Have a partnership or research question? Reach out:

[![Email](https://img.shields.io/badge/Email-66naren%40gmail.com-c14438?style=flat-square&logo=gmail&logoColor=white)](mailto:66naren@gmail.com)
[![Twitter](https://img.shields.io/badge/Twitter-@osnaren-1DA1F2?style=flat-square&logo=x&logoColor=white)](https://x.com/osnaren)
[![GitHub](https://img.shields.io/badge/GitHub-osnaren-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/osnaren)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-osnaren-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/osnaren)

---

## License

The codebase and bundled model assets are released under the **Forest Fire Proprietary License**. Redistribution, modification, or commercial use is not permitted without prior written approval. See [`LICENSE`](./LICENSE) for full terms.

The dataset reference, [Forest Fire C4](https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4), is available under **CC BY-NC-SA 4.0**. You may use it for non-commercial projects by providing attribution and sharing derivative work under the same license.

---

Built with care for first responders, researchers, and anyone monitoring our forests.
