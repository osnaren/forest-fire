# Repository Guidelines

## Project Structure & Module Organization

- `v2/` houses the live Next.js app; feature routes and API handlers live under `src/app`.
- Shared UI primitives sit in `src/components`, domain helpers in `src/lib`, and client state (Zustand slices, selectors) in `src/store`.
- Versioned TensorFlow.js bundles live in `public/model/`; sample assets such as `public/test-image.jpg` support manual verification.
- Legacy static demo is preserved in `v1/`; run `./start-local-server.sh` there only when comparing historical behavior.
- Planning notes and specs are collected in `docs/`; treat them as the source of truth for product context.

## Build, Test, and Development Commands

- `npm run dev` spins up the Next.js dev server with hot reload.
- `npm run build` creates the production bundle; follow with `npm run start` when verifying optimized output.
- `npm run lint`, `npm run lint:fix`, and `npm run type-check` enforce ESLint and TypeScript standards.
- `npm run format` applies Prettier and is required before committing large UI changes.

## Coding Style & Naming Conventions

- Prettier enforces semicolons, single quotes, two-space indentation, and a 120-character print width.
- Import sorting and Tailwind class ordering are automated; keep utility groups readable (`py-4 px-6 text-sm font-medium`).
- Use PascalCase for React components, camelCase for functions and variables, and UPPER_SNAKE_CASE for env keys.
- Keep new files ASCII-only unless a dependency demands otherwise.

## Testing Guidelines

- Co-locate tests as `*.test.ts(x)` or place suites in `src/__tests__/`; mirror the source file structure.
- Use realistic fixtures (for example `public/test-image.jpg`) to exercise prediction flows and error paths.
- `npm test` currently returns success; add assertions alongside new logic to build real coverage.
- Run `npm run lint` and `npm run type-check` before pushing; document any manual QA for UI or model changes.

## Commit & Pull Request Guidelines

- Follow the repo pattern of short, imperative commit subjects <=72 characters with bodies that capture motivation and validation.
- Stage only clean files; husky with lint-staged will fail partial fixes.
- PRs should outline scope, mention env or model updates, link related issues, and include screenshots or logs for UI or API changes.
- Provide manual verification notes (browsers, devices, sample images) so reviewers can reproduce critical flows quickly.
