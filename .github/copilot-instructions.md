# Forest Fire Classifier Development Guide

## Project Architecture

This is a **dual-version AI-powered wildfire detection system**:

- **v1/**: Legacy vanilla JS/HTML prototype with TeachableMachine.js
- **v2/**: Production Next.js 14 app with server-side TensorFlow.js inference

**Focus on v2** for all new development - it's the actively maintained codebase.

## Core ML Pipeline (v2)

The ML workflow follows a specific pattern:

1. **Model Loading**: Singleton pattern in `src/lib/server/predict.ts` - model loads once and caches
2. **Image Processing**: Sharp for server-side preprocessing (224x224 RGB normalization)
3. **Inference**: Dual-mode - browser WebGL (`@tensorflow/tfjs`) + Node.js backend (`@tensorflow/tfjs-node`)
4. **Output**: 4-class classification: `Fire`, `No Fire`, `Smoke`, `SmokeFire`

**Key Files**:

- `src/lib/server/predict.ts` - Core ML logic
- `src/app/api/predict/route.ts` - API endpoint with rate limiting
- `public/model/` - TensorFlow.js model artifacts

## API Architecture Patterns

### Error Handling

Use centralized error patterns from `src/lib/server/errors.ts`:

```typescript
// Always use CommonErrors, never raw NextResponse.json
return CommonErrors.badRequest("Invalid file type");
return CommonErrors.tooManyRequests("Rate limit exceeded");
```

### Rate Limiting

**Upstash Redis** integration is required:

```typescript
// In API routes, always check rate limits first
const { success, remaining } = await ratelimit.limit(ip);
if (!success) return CommonErrors.tooManyRequests();
```

### Validation

Use **Zod** for request validation and **Sharp** for image validation:

```typescript
// File size: 4MB max, image/* mime types only
if (file.size > MAX_FILE_SIZE) return CommonErrors.payloadTooLarge();
```

## UI Component System

### Component Architecture

- **Base UI**: `src/components/ui/` - Radix UI + custom variants
- **Animation Library**: `motion` (not framer-motion) for all animations
- **Styling**: Tailwind with custom CSS variables in `src/styles/`

### Animation Patterns

Use consistent animation presets from `AnimatedGroup`:

```tsx
<AnimatedGroup preset="blur-slide" className="space-y-8">
  <FloatingElement duration={4} yOffset={10} intensity={0.5}>
    // Content with subtle floating motion
  </FloatingElement>
</AnimatedGroup>
```

### Component Naming Convention

- **Enhanced**: `EnhancedCard`, `EnhancedButton` - Cards/buttons with motion
- **Interactive**: `GlowingButton`, `PulsingDot` - Elements with hover effects
- **Animated**: `AnimatedGradientText` - Text with built-in animations

## Configuration Management

Content is centralized in `src/config/pages.ts`:

```typescript
// Never hardcode copy - always use config
{homeConfig.hero.title.main}
{homeConfig.features.items.map(...)}
```

Page-specific configs follow the pattern: `homeConfig`, `aboutConfig`, etc.

## Development Workflows

### Local Development

```bash
cd v2/
npm run dev          # Next.js dev server
npm run type-check   # TypeScript validation
npm run lint:fix     # ESLint + Prettier
```

### Environment Setup

Copy `env.example` to `.env.local` and configure:

- `UPSTASH_REDIS_*` - Required for rate limiting
- Model files must exist in `public/model/`

### Testing ML Changes

1. Update model files in `public/model/`
2. Test locally via `/api/health` endpoint
3. Validate with `/api/predict` using form-data

## Code Quality Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **Linting**: ESLint with accessibility rules (`eslint-plugin-jsx-a11y`)
- **Formatting**: Prettier with consistent config
- **Git Hooks**: Husky + lint-staged for pre-commit validation

## Performance Considerations

- **Model Loading**: Lazy-loaded, cached singleton pattern
- **Image Processing**: Stream-based with Sharp (no memory buffering large files)
- **Rate Limiting**: Redis-backed with IP-based tracking
- **Bundle Size**: Dynamic imports for heavy ML dependencies

## Legacy v1 Context

The v1/ directory contains the original college prototype:

- Teachable Machine integration
- Client-side only inference
- Custom SCSS animations
- **Do not modify v1** - maintained for historical reference only

When migrating v1 patterns to v2, convert:

- Custom CSS animations → `motion` library
- Vanilla JS → React hooks
- Global styles → Tailwind utilities
