# Implementation Plan - Omnia Construction Website

**Created:** 2025-10-26
**Status:** In Progress
**Estimated Total Effort:** 50-70 hours

---

## Overview

This plan covers security hardening, performance optimization, code quality improvements, and UI/UX enhancements based on the comprehensive codebase analysis.

---

## Tasks Breakdown

### 🔴 High Priority - Security & Reliability (18-24 hours)

#### 1. Rate Limiting on Contact Form
- **Effort:** 4-8 hours
- **Tool:** Upstash Redis
- **Implementation:**
  - Create Upstash Redis database
  - Add rate limiting middleware to `/api/contact`
  - IP-based limiting: 10 requests/hour
  - Return 429 status when exceeded
  - Add user-friendly error message
- **Dependencies:** Upstash account, `@upstash/redis` package
- **Files:** `api/contact.ts`, `package.json`

#### 2. Sentry Error Tracking
- **Effort:** 2-4 hours
- **Implementation:**
  - Create Sentry project
  - Install `@sentry/node` and `@sentry/react`
  - Add error boundary in React app
  - Instrument serverless function
  - Configure source maps
- **Dependencies:** Sentry account, `SENTRY_DSN` env var
- **Files:** `api/contact.ts`, `src/main.tsx`, `vite.config.ts`

#### 5. Correlation IDs in Logs
- **Effort:** 2 hours
- **Implementation:**
  - Generate UUID for each request
  - Add to all log statements
  - Return in response headers (X-Request-ID)
  - Include in Sentry context
- **Dependencies:** `uuid` package
- **Files:** `api/contact.ts`

#### 6. Security Headers
- **Effort:** 1-2 hours
- **Implementation:**
  - Add CSP, X-Frame-Options, X-Content-Type-Options
  - Configure CORS properly
  - Add Referrer-Policy
  - Set X-XSS-Protection
- **Files:** `api/contact.ts`, `vercel.json` (headers config)

#### 7. Email Retry Logic
- **Effort:** 2-3 hours
- **Implementation:**
  - Exponential backoff (1s, 2s, 4s)
  - 3 retry attempts
  - Log each attempt
  - Only retry on transient errors (network, timeout)
- **Files:** `api/contact.ts`

#### 10. Message Size Limit
- **Effort:** 30 minutes
- **Implementation:**
  - Validate message length ≤ 5000 chars
  - Return 400 with helpful error
  - Update frontend validation
- **Files:** `api/contact.ts`, `src/components/ContactForm.tsx`

---

### 🟠 Medium Priority - Performance & Code Quality (30-50 hours)

#### 4. Code Splitting
- **Effort:** 8 hours
- **Implementation:**
  - **Vendor Chunks:**
    - `vendor-react`: react, react-dom, react-router-dom
    - `vendor-ui`: @radix-ui/*, @mantine/*
    - `vendor-charts`: recharts
  - **Route Lazy Loading:**
    - Portfolio, Booking, Contact, About pages
    - Use React.lazy() + Suspense
  - **Bundle Analysis:**
    - Add rollup-plugin-visualizer
    - Set bundle size budgets
- **Expected Result:** 126 kB → 50-60 kB initial bundle (-50%)
- **Files:** `vite.config.ts`, `src/App.tsx`, `package.json`

#### 8. TypeScript Strict Mode
- **Effort:** 20-40 hours (incremental)
- **Approach:**
  - Week 1: Enable for new files only
  - Week 2: Fix utils/ and hooks/
  - Week 3: Fix components/
  - Week 4: Fix pages/
  - Week 5: Enable globally
- **Implementation:**
  - Enable strict in tsconfig.json
  - Fix type errors directory-by-directory
  - Add proper type definitions
  - Remove any types
- **Files:** `tsconfig.json`, all `.ts/.tsx` files

#### 11. Update Dependencies
- **Effort:** 1-2 hours
- **Tasks:**
  - Update browserslist database (13 months old)
  - Run `npm audit fix`
  - Update ESLint 9.13 → 9.38
  - Update Radix UI packages (minor versions)
  - Review Mantine 7.x → 8.x (major, optional)
  - Test after updates
- **Files:** `package.json`, `package-lock.json`

---

### 🎨 UI/UX Optimization (12-16 hours)

#### Image Optimization
- **Effort:** 4-6 hours
- **Tasks:**
  - Convert all images to WebP format
  - Create multiple sizes (320w, 640w, 1024w, 1920w)
  - Add responsive `<picture>` tags with srcset
  - Implement lazy loading
  - Add placeholder blur images
- **Expected Result:** 40-60% reduction in image payload
- **Files:** `public/`, all image-using components

#### Color Contrast Fixes (WCAG AA)
- **Effort:** 2-3 hours
- **Tasks:**
  - Audit all color combinations
  - Fix low-contrast text
  - Update design tokens in `globals.css`
  - Test with accessibility tools
- **Target:** 4.5:1 contrast ratio minimum
- **Files:** `src/index.css`, component styles

#### Keyboard Navigation for Slider
- **Effort:** 3-4 hours
- **Tasks:**
  - Add arrow key support to Before/After slider
  - Focus indicators
  - Tab navigation
  - ARIA labels
- **Files:** `src/components/GallerySection.tsx` or slider component

#### Mobile Menu Focus Trapping
- **Effort:** 2-3 hours
- **Tasks:**
  - Trap focus when mobile menu opens
  - Return focus to trigger on close
  - Escape key to close
  - Prevent background scroll
- **Files:** `src/components/Navbar.tsx`

---

## Execution Order (Recommended)

### Phase 1: Quick Wins (4-6 hours)
**Week 1, Days 1-2**
1. ✅ Message size limit (30 min)
2. ✅ Security headers (1-2 hours)
3. ✅ Correlation IDs (2 hours)
4. ✅ Update dependencies (1-2 hours)

### Phase 2: Critical Security (8-12 hours)
**Week 1, Days 3-5**
5. ✅ Sentry error tracking (2-4 hours)
6. ✅ Rate limiting with Upstash (4-8 hours)
7. ✅ Email retry logic (2-3 hours)

### Phase 3: Performance (8-10 hours)
**Week 2**
8. ✅ Code splitting implementation (8 hours)
9. ✅ Bundle analysis and optimization (2 hours)

### Phase 4: UI/UX (12-16 hours)
**Week 3**
10. ✅ Image optimization (4-6 hours)
11. ✅ Color contrast fixes (2-3 hours)
12. ✅ Keyboard navigation (3-4 hours)
13. ✅ Focus trapping (2-3 hours)

### Phase 5: Code Quality (20-40 hours)
**Week 4-8 (incremental)**
14. ✅ TypeScript strict mode (incremental, 4-8 hours/week)

---

## Environment Variables Needed

Add to Vercel dashboard:
```bash
# Sentry
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=xxx  # For source maps upload

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

---

## Dependencies to Install

```bash
# Security & Monitoring
npm install @sentry/node @sentry/react
npm install @upstash/redis
npm install uuid
npm install @types/uuid -D

# Build Optimization
npm install rollup-plugin-visualizer -D

# Image Optimization (if using sharp for local processing)
npm install sharp -D
```

---

## Success Metrics

### Before Implementation
- ❌ Rate limiting: None
- ❌ Error tracking: Vercel logs only
- ❌ Bundle size: 126 kB gzipped
- ❌ TypeScript strict: Disabled
- ⚠️ Accessibility: ~80% WCAG AA
- ❌ Image format: PNG/JPG
- ❌ Security headers: Basic only

### After Implementation
- ✅ Rate limiting: 10 req/hour/IP
- ✅ Error tracking: Sentry with alerts
- ✅ Bundle size: 50-60 kB gzipped (-50%)
- ✅ TypeScript strict: Enabled
- ✅ Accessibility: 95%+ WCAG AA
- ✅ Image format: WebP with fallbacks
- ✅ Security headers: Full suite

---

## Testing Checklist

After each phase, verify:
- [ ] Contact form still works
- [ ] Email delivery successful
- [ ] Rate limiting triggers at threshold
- [ ] Sentry captures errors
- [ ] Bundle loads correctly
- [ ] Images display on all devices
- [ ] Keyboard navigation works
- [ ] Mobile menu accessible
- [ ] TypeScript compiles without errors
- [ ] All pages render without errors

---

## Rollback Plan

Each change should be:
1. Committed separately with clear message
2. Tested locally before push
3. Deployed to Vercel preview first
4. Verified in production
5. Easy to revert via git if issues

---

## Documentation Updates

After completion, update:
- [ ] `README.md` - Add setup instructions
- [ ] `docs/progress.md` - Log all changes
- [ ] `docs/decisions.md` - Add ADRs for major decisions
- [ ] `docs/bugs.md` - Mark issues as resolved
- [ ] `.env.example` - Add new environment variables

---

**Next Step:** Choose which task to start with.
