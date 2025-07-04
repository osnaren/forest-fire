# Forest Fire Classifier v2 Development Plan

## Overview

Forest Fire Classifier v2 is a professional-grade overhaul of the original college prototype. The new application delivers near-instant wildfire detection from images in the browser using a MobileNet TensorFlow.js model while also exposing a secure, rate-limited public API for server-side inference. Built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and GSAP, it features a dark-mode design system, engaging animations, a live wildfire map, and enterprise CI/CD on Vercel. The legacy v1 site remains available on a dedicated sub-domain for reference.

---

## 1. Project Setup

- [ ] **Safeguard v1 history**
  - Tag current main branch (`git tag v1.0 && git push --tags`) and/or create `legacy-v1` branch.
  - Push legacy branch to remote; keep read-only after launch.
- [ ] **Repository restructuring**
  - Create `v2-nextjs` (or `main`) working branch.
  - Add `/v2` folder if opting for mono-repo; otherwise convert repo root to Next.js project.
- [ ] **Bootstrap Next.js 14 project**
  - `npx create-next-app@latest forestfire-v2 --ts --tailwind --app`.
  - Remove boilerplate assets; commit initial scaffold.
- [ ] **Establish workspace conventions**
  - Configure ESLint, Prettier, Husky pre-commit hooks.
  - Add `.editorconfig` and updated `.gitignore`.
  - **Git commit style guide**: Keep subject lines under 50 chars; use imperative mood; add bullet-point body when needed.
- [ ] **Environment variable management**
  - Create `.env.local.example`; document `KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.
- [ ] **Continuous Integration (CI)**
  - GitHub Actions workflow: install, lint, test, build.
  - Fail builds on lint/test errors.
- [ ] **Initial Vercel project**
  - Connect GitHub repo; assign Production to `main`, Legacy to `legacy-v1`.
  - Add Preview deployments for feature branches.
- [ ] **Project licensing**
  - Add `LICENSE` file (MIT License) to the repository root.

## 2. Backend Foundation

- [ ] **Install core dependencies**
  - `@tensorflow/tfjs`, `@tensorflow/tfjs-backend-webgl`, `@tensorflow/tfjs-node`, `sharp`, `@upstash/ratelimit`, `@vercel/kv`, `zod` for validation.
- [ ] **API folder structure** (`src/app/api/...`)
  - `predict/route.ts` (placeholder)
  - `health/route.ts`
- [ ] **Prediction service module**
  - `src/lib/server/predict.ts` to load & cache model with tfjs-node.
  - Shared TypeScript types for predictions.
- [ ] **Rate-limiter utility**
  - Wrap serverless handlers with Upstash-backed sliding-window limiter (10 req / 30 s).
- [ ] **Global error-handling helpers**
  - Standardize JSON error shape; map common HTTP status codes.

## 3. Feature-specific Backend

- [ ] **/api/predict endpoint**
  - Accept image uploads via **`multipart/form-data` (preferred)** and support `{ image: base64 }` as a fallback; validate input (size ≤ 4 MB or return **413 Payload Too Large**).
  - Explicit preprocessing: resize → 224×224, normalize pixel values (-1 to 1) before `model.predict()`.
  - Decode/convert image → tensor → predict → return probabilities array.
- [ ] **Map data proxy (phase 2)**
  - Optional serverless route to fetch & cache NASA FIRMS GeoJSON for the Live Map page.
- [ ] **Metrics & logging**
  - Add simple logging to Vercel functions; consider Log Drains or Sentry.
- [ ] **Health endpoint**
  - Cheap model warm-up ping for uptime monitors.

## 4. Frontend Foundation

- [ ] **Tailwind configuration**
  - Extend theme with design-system colors (charcoal 900, gray 300, emerald 500, amber 500).
  - Add custom **`maxWModel: '560px'`** utility to prevent the uploader stretching on ultra-wide displays.
  - Enable dark-mode via `class` strategy.
- [ ] **Global fonts**
  - Add Inter & Satoshi via @next/font/google / local import.
- [ ] **Root layout** (`src/app/layout.tsx`)
  - Apply fonts, dark background, and `<Navbar/>` + `<Footer/>`.
- [ ] **Routing skeleton**
  - Pages: `/`, `/about`, `/research`, `/map`, `/api-docs`.
- [ ] **State management helpers**
  - Lightweight React Context or Zustand for global UI state.
- [ ] **Component organization & UI library**
  - Create `src/components/ui/` for generic, reusable atoms (Button, Card, Input, Dialog, Toast). Leverage **shadcn/ui** patterns and consult Magic MCP for inspiration.
  - Install `react-hot-toast` for global notifications.
- [ ] **Metadata & SEO**
  - Implement `generateMetadata()` (Next.js 14) per route for dynamic titles/descriptions.
  - Configure Open Graph & Twitter tags; generate social-share `og:image` via `/api/og` (optional).

## 5. Feature-specific Frontend

- [ ] **Prediction Tool** (`src/components/PredictionTool.tsx`)
  - Drag-and-drop uploader (react-dropzone) + preview.
  - **Default to client-side inference**. If `tfjs` WebGL backend fails *or* `navigator.hardwareConcurrency < 4`, gracefully **fallback to the `/api/predict` endpoint**.
  - Displays probabilities for Fire / No Fire / Smoke / SmokeFire.
- [ ] **Results Display**
  - Horizontal progress bars coloured by class; percentage counters.
  - Highlight top prediction.
- [ ] **GSAP results reveal animation**
  - Build timeline: container fade, stagger labels, bar fill, counter up, pulse.
- [ ] **Static content pages**
  - About: "From Research to Real-Time" narrative.
  - Research: links to paper & Kaggle dataset.
  - API Docs: spec table + code snippets (cURL, JS, Python).
- [ ] **Live wildfire map page (MVP)**
  - Embed NASA FIRMS or ArcGIS iframe; plan Leaflet heat-map upgrade.
- [ ] **Micro-interactions**
  - Framer Motion hover/tap on buttons; page transitions with `<AnimatePresence/>`.
- [ ] **Dark-mode toggle**
  - Switcher in Navbar; persist choice in localStorage.
- [ ] **Footer model version badge**
  - Add a subtle "Model v1.0" badge in footer that links to `/about#model`.

## 6. Integration

- [ ] **Connect frontend to API route**
  - Use `fetch` or React Query; pass base64 image, handle JSON response.
- [ ] **Shared TypeScript models**
  - Re-use Prediction type across client & server.
- [ ] **Global loading & error UX**
  - Spinner overlay during prediction; toast notifications on 4xx/5xx or 429.

## 7. Testing

- [ ] **Unit tests** (Jest + ts-jest)
  - Utilities (image preprocessing, probability formatter).
- [ ] **API integration tests** (Supertest)
  - `/api/predict` happy path + error paths + rate-limit.
- [ ] **Component tests** (React Testing Library)
  - PredictionTool, ResultsDisplay.
- [ ] **End-to-end tests** (Playwright/Cypress)
  - Upload flow, API Docs page, dark-mode toggle.
- [ ] **Accessibility (A11y)**
  - Semantic HTML structure (`<main>`, `<nav>`, `<button>` etc.).
  - Full keyboard navigation and visible focus ring.
  - Appropriate ARIA roles/labels on custom components.
  - Verify color-contrast to meet WCAG AA.
  - Integrate `eslint-plugin-jsx-a11y` and run axe-core checks in CI.
- [ ] **Performance & security**
  - Lighthouse CI (including a11y scores); OWASP dependency check.

## 8. Documentation

- [ ] **README.md overhaul**
  - Project badges, live links, abstract, tech stack, features, local setup.
- [ ] **API documentation page**
  - Contract table, rate-limit notes, example requests.
- [ ] **Code comments & JSDoc/TSdoc**
  - Document Prediction service, API handlers.
- [ ] **Architecture diagram**
  - Sequence diagram of client-side vs server-side inference paths.

## 9. Deployment

- [ ] **Vercel environment configuration**
  - Domains: **`fire.osnaren.com`** (Production), **`v1.fire.osnaren.com`** (Legacy).
  - Environment variables: KV creds, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_FIRE_MODEL_PATH=/model/model.json`, optional `NASA_FIRMS_API`.
- [ ] **Preview deployments**
  - Automatic per PR; protect main with required checks.
- [ ] **CI/CD pipeline**
  - Require lint, test, build passes before merge.
- [ ] **Monitoring & analytics**
  - Enable Vercel Analytics; set up uptime monitor on `/api/health`.

## 10. Maintenance

- [ ] **Dependency management**
  - Enable Dependabot or Renovate; weekly PRs.
- [ ] **Bug-fix workflow**
  - Triage with GitHub Issues labels; hotfix branches; patch version tags.
- [ ] **Model update procedure**
  - Document retraining & re-export steps; version model files in `/public/model/vX/`.
- [ ] **Backup & recovery**
  - Schedule Vercel KV backups; document restore steps.
- [ ] **Performance monitoring**
  - Periodic Lighthouse audits; track API latency metrics.

## 11. Pre-Launch Checklist

- [ ] **SEO & Open Graph**
  - Verify all pages have appropriate meta tags.
  - Test social sharing cards on Twitter/LinkedIn/Facebook debuggers.
- [ ] **Accessibility audit**
  - Run axe DevTools on key pages.
  - Test keyboard navigation flow.
  - Verify screen reader compatibility.
- [ ] **Favicon & app icons**
  - Generate complete icon set (favicon.ico, apple-touch-icon, etc.).
  - Create manifest.json with theme colors matching design system.
- [ ] **Cross-browser testing**
  - Test on Chrome, Firefox, Safari, and Edge.
  - Verify responsive layouts on mobile devices.
- [ ] **Performance verification**
  - Run Lighthouse on production URLs.
  - Verify Core Web Vitals metrics.
- [ ] **Final content review**
  - Proofread all copy.
  - Check links to external resources.

---

Delivering on this checklist will evolve the Forest Fire Classifier into a showcase-quality portfolio project, demonstrating full-stack expertise, thoughtful UX, and production-ready engineering practices.
