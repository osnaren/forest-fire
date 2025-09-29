# Forest Fire Prediction (Legacy v1)

[![Static Site](https://img.shields.io/badge/Experience-Legacy%20Demo-0ea5e9?style=for-the-badge&logo=html5)](https://osnaren.github.io/ForestFire/)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JS%20%7C%20TensorFlow.js-6366f1?style=for-the-badge&logo=javascript)](#tech-stack)
[![Status](https://img.shields.io/badge/Status-Archived-orange?style=for-the-badge&logo=github)](#project-snapshot)

The original proof-of-concept web app that inspired the modern Forest Fire Classifier v2. This version runs entirely in the browser using TensorFlow.js and Teachable Machine exports, showcasing how lightweight models can deliver meaningful wildfire insights with no backend infrastructure.

---

## Table of Contents

1. [Project Snapshot](#project-snapshot)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [How It Works](#how-it-works)
5. [Usage](#usage)
6. [Performance & Results](#performance--results)
7. [Accessibility & UX Highlights](#accessibility--ux-highlights)
8. [Roadmap & Migration](#roadmap--migration)
9. [License](#license)

---

## Project Snapshot

- **Live Demo:** [osnaren.github.io/ForestFire](https://osnaren.github.io/ForestFire/)
- **Dataset:** [Forest Fire C4 (Kaggle)](https://www.kaggle.com/datasets/obulisainaren/forest-fire-c4) — licensed under CC BY-NC-SA 4.0
- **Model:** MobileNet (Teachable Machine export)
- **Accuracy:** ~98.5% on curated validation set
- **Supports:** Desktop & mobile browsers (Chrome, Firefox, Safari, Edge)

> ⚠️ **Legacy Notice:** v1 remains available for historical reference. New features and production support live in [Forest Fire Classifier v2](../v2/README.md).

---

## Key Features

### 🔥 AI-Powered Image Classification

- On-device predictions for "Fire" vs "No Fire"
- Lightweight MobileNet backbone with augmentation-driven training

### 🛡️ Safety & Reliability

- Client-side validation for file size (≤10 MB) and MIME type
- Graceful error states with clear guidance for users

### ⚡ Performance Boosts

- Lazy-loads the TensorFlow model and caches assets for faster repeat usage
- GPU-friendly animations with efficient memory cleanup to avoid leaks

### ♿ Accessible by Design

- Keyboard navigable interface with ARIA labels
- High-contrast and reduced-motion support for inclusive experiences

---

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| AI Runtime | TensorFlow.js, Teachable Machine export |
| Styling | Custom CSS modules (`css/*.css`) |
| Build & Deploy | Static hosting (GitHub Pages) |

---

## How It Works

1. **Preprocessing:** Dataset images are equalized, enhanced, and augmented to boost robustness.
2. **Model Training:** VGG16 and MobileNet variants were benchmarked; MobileNet via Teachable Machine delivered the best accuracy with learning rates ranging from 0.0001–0.001 over 20–200 epochs.
3. **Inference:** The exported model runs directly in the browser, delivering sub-2 s predictions without sending data to a server.

![CNN workflow](./images/CNN_Flow.png)

---

## Usage

### Quick Start

1. Open [the live demo](https://osnaren.github.io/ForestFire/) or launch `index.html` via a local static server.
2. Upload a JPEG/PNG/WebP image (≤10 MB).
3. Review the animated probability bars and textual verdict.

### Local Development

```bash
# from the v1/ directory
python -m http.server 8000
# or
npm install --global serve
serve .
```

> Tip: Running through a local server ensures model files load correctly across browsers.

---

## Performance & Results

- **Validation Accuracy:** 98.5% (MobileNet via Teachable Machine)
- **First Contentful Paint:** < 1.5 s (modern browsers)
- **Prediction Latency:** ≈1–2 s on mid-range hardware

Benchmarking informed the shift to v2, where we added server-side inference and richer analytics.

---

## Accessibility & UX Highlights

- Comprehensive ARIA roles and focus outlines for screen readers
- Reduced-motion mode detection to tone down animations automatically
- Toast notifications and inline guidance for upload errors or network issues
- Responsive layout tuned for touch gestures and small screens

---

## Roadmap & Migration

- ✅ Maintain v1 as a reference implementation
- 🔄 Encourage new contributions in [Forest Fire Classifier v2](../v2/README.md)
- 🚀 Future ideas include PWA support, batch inference, and WebAssembly optimizations—explored further in v2.

---

## License

This project is released under the **Forest Fire Proprietary License**. No copying, distribution, modification, or commercial use is permitted without prior written permission. See the [LICENSE](../LICENSE) file for the full terms.
