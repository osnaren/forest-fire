# Forest Fire Copilot Guide

## Overview

- Primary app lives in `v2/` (Next.js 14 App Router, TypeScript, Tailwind, TensorFlow.js). `v1/` is read-only legacy.
- Server and client share a MobileNet TF.js model; keep `public/model/` artifacts in sync when swapping models.

## Server + ML workflow

- `src/lib/server/predict.ts` loads the model once (cached `model` + `modelLoadingPromise`) and exposes `runPrediction(Buffer)`, which resizes to 224px, normalizes to [-1, 1], and returns probabilities in the `CLASS_NAMES` order from `src/lib/types`.
- Wrap every handler with `withErrorHandling` from `src/lib/server/errors.ts` and respond via `CommonErrors.*` so rate-limit and model failures surface consistent JSON.
- Throttle early: `src/lib/server/ratelimit.ts` enforces 10 requests / 30 s using Upstash via `@vercel/kv`. Derive the IP from `x-forwarded-for` and forward `X-RateLimit-*` headers like the existing predict route.
- Follow `src/app/api/predict/route.ts` as the canonical upload flow—accept `multipart/form-data` with `image`, cap size at 4 MB, require `image/*`, round to four decimals, sort results descending, and include timestamp metadata.
- Health checks (`src/app/api/health/route.ts`) ensure `model.json` and `weights.bin` exist with `fs.access`; reuse this pattern for any diagnostics endpoints.

## Config & content

- Centralize copy and icon choices in `src/config/pages.tsx` (objects like `homeConfig`, `aboutConfig`). Extend those configs before hardcoding strings in UI modules.
- Page modules under `src/modules/**` stitch sections (e.g., `HeroSection`, `StatsSection`) and are expected to read from the config layer.

## UI patterns

- UI kit resides in `src/components/ui/` and is built on Tailwind + `motion/react` primitives (`AnimatedGroup`, `FloatingElement`, `AnimatedGradientText`, `GlowingButton`). Match new interactions to existing presets rather than importing alternative animation libs.
- Use the TS path aliases from `tsconfig.json` (`@/components`, `@/lib/utils`, etc.) and the `cn` helper (`src/lib/utils.ts`) for class merging.

## State & utilities

- Global prediction state is handled via Zustand in `src/store/index.ts` (`usePredictionStore`, `useUIStore`). Invoke the provided setters so devtools action labels stay meaningful.
- Formatting helpers in `src/lib/prediction-utils.ts` (probability labels, class colors/variants) should be reused when presenting model output.

## Workflows

- NPM scripts: `npm run dev`, `npm run build`, `npm run lint`, `npm run lint:fix`, `npm run typecheck`; Husky + lint-staged run these checks on commit.
- Environment prep: copy `v2/env.example` to `.env.local`, supply `KV_REST_API_URL` and `KV_REST_API_TOKEN`, and ship updated model binaries to `public/model/`.
- Validate ML changes via `GET /api/health` followed by `POST /api/predict` (multipart `image` field) to confirm preprocessing and rate-limits behave as expected.

## Legacy v1

- `v1/` holds the Teachable Machine prototype; leave untouched unless explicitly asked, and reimplement ideas in the v2 stack when needed.
