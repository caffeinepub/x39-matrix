# Specification

## Summary
**Goal:** Make the top navigation header’s neon-red triangle code-rain effect feel more aggressive and elegant while keeping the header clean, readable, and performance-safe.

**Planned changes:**
- Refine `frontend/src/components/header/HeaderTriangleCodeRain.tsx` to increase perceived intensity (higher density/speed/variation) while keeping triangles crisp and stroke-forward with controlled glow.
- Add more dynamic, non-uniform motion (e.g., multiple speed bands plus subtle drift/jitter/rotation variance) and ensure stability across resize with proper cleanup on unmount.
- Update the header’s base background treatment to a true deep black with subtle supporting texture/lines, preserving safe-area padding and existing header layout/readability.

**User-visible outcome:** The header-only triangle rain looks noticeably more intense and refined, without obscuring the logo, brand text, or navigation items, and remains smooth and accessibility-friendly (including reduced-motion behavior).
