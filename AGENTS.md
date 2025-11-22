# Repository Guidelines

## Project Structure & Module Organization

The repository hosts two product lines. `v2/` is the active Next.js application; routes and API handlers live in `src/app`, shared UI in `src/components`, domain logic in `src/lib`, and client state in `src/store`. TensorFlow.js assets are versioned under `public/model/`. Legacy assets are retained in `v1/` for reference; run `./start-local-server.sh` there if you need to reproduce the original static demo. Additional planning material lives in `docs/`.

## Build, Test, and Development Commands

From `v2/`, use `npm run dev` for the Next.js dev server, `npm run build` for a production bundle, and `npm run start` to serve the compiled app. `npm run lint` and `npm run lint:fix` apply ESLint, while `npm run typecheck` runs `tsc --noEmit`. `npm run format` formats with Prettier. `npm test` currently exits successfully so that CI can pass until real tests or workflows are wired in.

## Coding Style & Naming Conventions

Prettier enforces semicolons, single quotes, two-space indentation, and a 120 character print width (`v2/.prettierrc`). Import order and Tailwind class sorting are handled automatically via the configured Prettier plugins. Stick to PascalCase for React components, camelCase for functions and variables, and uppercase snake case for env keys. ESLint extends `next/core-web-vitals` and `jsx-a11y`; fix all lint warnings before pushing. Keep Tailwind utility groupings meaningful (`py-4 px-6 text-sm font-medium`) so the formatter can sort them deterministically.

## Testing Guidelines

Automated testing is not in place yet. When contributing new logic, add unit or integration coverage under `src/__tests__/` or co-locate files as `*.test.ts(x)` and update `npm test` accordingly. Use realistic fixtures (for example sample uploads from `public/test-image.jpg`) and assert both prediction results and error paths. Always run `npm run lint` and `npm run typecheck` prior to submitting a PR; include manual verification notes for critical UI or API work.

## Commit & Pull Request Guidelines

Existing commits favour short, imperative subject lines without conventional prefixes (e.g., "Update test image handling"). Follow that style, limit subjects to 72 characters, and add focused bodies detailing motivation and validation. Each PR should describe scope, highlight any env or model changes, link related issues, and attach screenshots or logs for UI and API updates. Husky runs `lint-staged`, so stage only clean files before committing.
