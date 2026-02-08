# Specification

## Summary
**Goal:** Stabilize the frontend by fixing regressions and calculation issues, and apply a consistent celestial sky-blue accent palette site-wide while keeping red accents unchanged.

**Planned changes:**
- Replace remaining green-themed accent styling (Tailwind classes, gradients, glow/neon utilities) with celestial sky-blue across all UI sections and widgets, preserving existing red accents.
- Fix math/logic edge cases to prevent negative countdown values, NaN/Infinity-driven rendering, and unstable derived metrics/strings in countdown, charts, projections, RSI, and signals.
- Repair launch hero static asset references so the background texture and code-horse render reliably from `frontend/public/assets/generated` with intended opacity/glow and no 404s.
- Ensure any user-facing text modified as part of these fixes is English and follows the existing translation approach, without changing files in the immutable paths.
- Run a regression pass to resolve remaining runtime errors, navigation/scroll issues, and responsive layout regressions; ensure build/lint succeeds.

**User-visible outcome:** The portal renders reliably with a unified sky-blue + red accent theme, correct and stable countdown/chart/metric displays (no NaN/Infinity/negative states), and a fully working launch hero with all intended visuals loading in production.
